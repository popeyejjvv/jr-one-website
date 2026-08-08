// =============================================================================
// ROI Calculator Capture Tests
// =============================================================================
// Run with: node --test "tests/*.test.js"
//        or: node --test tests/roi-capture.test.js
//
// NOT `npm test` (package.json has no test script) and NOT `node --test tests/`
// (directory form throws MODULE_NOT_FOUND on Node 25).
//
// ── WHAT IS BEING GUARDED ────────────────────────────────────────────────────
// public/roi-calculator.html had a call to action whose entire behaviour was
//     onclick="alert('Contact JRone Gutters for a free inspection and quote!')"
// It captured nothing. This is the third dead lead capture found on this site.
// These tests exist so it cannot silently become the fourth.
//
// ── HOW REAL MAIL AND REAL BUILDERPRIME WRITES ARE MADE IMPOSSIBLE ───────────
// Three independent guarantees, the same three that protect
// tests/homepage-email-capture.test.js:
//
// 1. This file imports lib/roi-capture.js and lib/lead-spam.js and nothing
//    else from the app. lib/roi-capture.js has no network primitive and no
//    credential read. The last test in this file proves that mechanically by
//    scanning the module's own source with comments stripped: no fetch(, no
//    https:/, no process.env, no nodemailer, no require(. A module that cannot
//    name a transport cannot reach one.
//
// 2. The two side effects are INJECTED. runRoiCapture() takes createBpClient
//    and sendNotification as arguments. Every test below passes a STUB that
//    records its call and returns a canned result. The real BuilderPrime fetch
//    (createBpClientRemote) and the real nodemailer send
//    (sendOperatorNotification) live in app/api/send-lead/route.js and are
//    passed in only by the route, which this file never imports (importing a
//    route pulls in next/server, which does not resolve outside the Next
//    bundler, so it could not run here even by mistake).
//
// 3. No test supplies an API key or an SMTP credential, and none is read from
//    the environment, so even a stub that tried to call out would have nothing
//    to authenticate with.
//
// The orchestration under test is the SAME function the route runs in
// production. There is one copy of that control flow, not a test copy and a
// real copy.
// =============================================================================

import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import {
  ROI_CAPTURE_TYPE,
  ROI_CAPTURE_FIRST_NAME,
  ROI_CAPTURE_LEAD_SOURCE,
  ROI_CAPTURE_FALLBACK_LAST_NAME,
  JR_ONE_PHONE,
  isRoiCapture,
  isValidCaptureEmail,
  normalizeRoiFigures,
  buildRoiSummary,
  buildRoiCaptureBpPayload,
  buildRoiCaptureNotification,
  buildRoiInputLines,
  resolveCaptureOutcome,
  runRoiCapture,
} from "../lib/roi-capture.js";
import { assessLeadSpam, __resetSpamMemoryForTests } from "../lib/lead-spam.js";

const REPO = process.cwd();
const read = (rel) => fs.readFileSync(path.join(REPO, rel), "utf8");

// -- Stubs. Each records what it was handed so a test can assert the OTHER half
//    still ran even when its sibling failed. ---------------------------------
function stubBp({ ok = true, opportunityId = "9999999", error = null, throws = null } = {}) {
  const calls = [];
  const fn = async (payload) => {
    calls.push(payload);
    if (throws) throw new Error(throws);
    return { ok, opportunityId, error };
  };
  fn.calls = calls;
  return fn;
}

function stubNotifier({ ok = true, error = null, throws = null } = {}) {
  const calls = [];
  const fn = async (message) => {
    calls.push(message);
    if (throws) throw new Error(throws);
    return { ok, error };
  };
  fn.calls = calls;
  return fn;
}

const EMAIL = "homeowner@example.com";

// The figures the calculator itself produces at its default slider positions.
const FIGURES = {
  investment: 9770,
  annualValue: 5420,
  tenYearValue: 54200,
  roiPct: 455,
  paybackYears: 1.8,
};

const INPUTS = {
  gutters: { linearFeet: 200, downspouts: 5, needsRepair: false },
  guards: { linearFeet: 200, type: "Micro-mesh Pro", cleaningsPerYear: 3, heavyTrees: false },
  soffit: { linearFeet: 200, monthlyBill: 158, rot: false, pests: false },
  roof: { squareFeet: 2200, ageYears: 12, insuranceAnnual: 3748 },
};

// =============================================================================
// 1. THE HAPPY PATH: A RECORD IS CREATED AND info@ IS TOLD.
// =============================================================================

test("a successful capture creates a BuilderPrime record AND notifies info@", async () => {
  const bp = stubBp({ opportunityId: "1234567" });
  const notify = stubNotifier();

  const result = await runRoiCapture({
    email: EMAIL,
    page: "/roi-calculator.html",
    timestampEt: "8/8/2026, 9:15:00 AM",
    roi: FIGURES,
    inputs: INPUTS,
    createBpClient: bp,
    sendNotification: notify,
  });

  assert.equal(bp.calls.length, 1, "BuilderPrime must be written exactly once");
  assert.equal(notify.calls.length, 1, "info@ must be notified exactly once");
  assert.equal(result.bp.ok, true);
  assert.equal(result.bp.opportunityId, "1234567");
  assert.equal(result.notification.ok, true);
  assert.equal(result.outcome.ok, true);
  assert.equal(result.outcome.status, 200);
});

test("the notification is addressed to the ROI calculator and carries the email", () => {
  const msg = buildRoiCaptureNotification({
    email: EMAIL,
    page: "/roi-calculator.html",
    timestampEt: "8/8/2026, 9:15:00 AM",
    roi: FIGURES,
    inputs: INPUTS,
  });
  assert.match(msg.subject, /ROI calculator lead/i);
  assert.ok(msg.subject.includes(EMAIL), "subject must name the address captured");
  assert.ok(msg.text.includes(EMAIL), "body must carry the address captured");
});

// =============================================================================
// 2. THE COMPUTED FIGURES MUST REACH THE RECORD, IN FIELDS THAT READ BACK.
// =============================================================================
// lib/estimator-lead.js:35-40 records what survives a BuilderPrime round trip.
// firstName and lastName are confirmed readable; customFields came back on 0 of
// 334 records. So the numbers go in the NAME, and these tests fail if a future
// edit moves them somewhere that silently disappears.

test("the computed figures are carried in lastName, which reads back", () => {
  const payload = buildRoiCaptureBpPayload({ email: EMAIL, roi: FIGURES });
  const lastName = payload.userAccount.lastName;
  assert.ok(lastName.includes("$9,770"), `investment missing from lastName: ${lastName}`);
  assert.ok(lastName.includes("$5,420"), `annual value missing from lastName: ${lastName}`);
  assert.ok(lastName.includes("455%"), `ROI missing from lastName: ${lastName}`);
});

test("the source is carried in firstName, not only in leadSourceDescription", () => {
  const payload = buildRoiCaptureBpPayload({ email: EMAIL, roi: FIGURES });
  assert.equal(payload.userAccount.firstName, ROI_CAPTURE_FIRST_NAME);
  // Also sent as a best effort. If BuilderPrime does keep it, a rep gets the
  // same answer twice; if it drops it, firstName above still carries it.
  assert.equal(payload.leadSourceDescription, ROI_CAPTURE_LEAD_SOURCE);
  assert.equal(payload.buildingTypeDescription, "Single Family");
  assert.equal(payload.projectTypeDescription, "Gutters");
});

test("no placeholder person name is invented", () => {
  const payload = buildRoiCaptureBpPayload({ email: EMAIL, roi: FIGURES });
  // The banned placeholder from lib/estimator-lead.js:52. It is indistinguishable
  // from the internal test rows that share it.
  assert.notEqual(payload.userAccount.firstName, "Estimator Lead");
  assert.notEqual(payload.userAccount.lastName, "Estimator Lead");
  // The tool collects an email address only, so a plausible human name would be
  // fabricated data in a CRM that has no DELETE.
  assert.equal(payload.userAccount.emailAddress, EMAIL);
  assert.equal(payload.addressLine1, "");
  assert.equal(payload.city, "");
  assert.equal(payload.zip, "");
  assert.ok(!("phoneNumber" in payload), "no phone may be fabricated");
});

test("BuilderPrime still gets a usable lastName when no figures arrive", () => {
  const payload = buildRoiCaptureBpPayload({ email: EMAIL, roi: {} });
  assert.equal(payload.userAccount.lastName, ROI_CAPTURE_FALLBACK_LAST_NAME);
  assert.notEqual(payload.userAccount.lastName, "", "BuilderPrime requires a lastName");
});

test("a hostile payload cannot write NaN or Infinity into a permanent record", () => {
  const junk = {
    investment: "not a number",
    annualValue: Number.NaN,
    tenYearValue: Number.POSITIVE_INFINITY,
    roiPct: null,
    paybackYears: undefined,
  };
  const figures = normalizeRoiFigures(junk);
  for (const [k, v] of Object.entries(figures)) {
    assert.ok(v === null || Number.isFinite(v), `${k} must be null or finite, got ${v}`);
  }
  const payload = buildRoiCaptureBpPayload({ email: EMAIL, roi: junk });
  const serialized = JSON.stringify(payload);
  assert.ok(!serialized.includes("NaN"), "NaN must never be written");
  assert.ok(!serialized.includes("Infinity"), "Infinity must never be written");
  assert.ok(!serialized.includes("undefined"), "undefined must never be written");
});

test("the slider inputs reach info@, since they have no readable CRM field", () => {
  const msg = buildRoiCaptureNotification({
    email: EMAIL,
    timestampEt: "8/8/2026, 9:15:00 AM",
    roi: FIGURES,
    inputs: INPUTS,
  });
  assert.ok(msg.text.includes("200 LF"), "gutter linear feet missing");
  assert.ok(msg.text.includes("5 downspouts"), "downspout count missing");
  assert.ok(msg.text.includes("Micro-mesh Pro"), "guard type missing");
  assert.ok(msg.text.includes("2,200 sq ft"), "roof size missing");
  assert.ok(msg.text.includes("12 years old"), "roof age missing");
});

test("the notification says plainly that the figures are not a quote", () => {
  const msg = buildRoiCaptureNotification({ email: EMAIL, roi: FIGURES, inputs: INPUTS });
  assert.match(
    msg.text,
    /NOT a quote/i,
    "a rep must not mistake a slider estimate for a priced quote"
  );
});

test("buildRoiInputLines omits sections the visitor never touched", () => {
  const lines = buildRoiInputLines({ gutters: { linearFeet: 150 } });
  assert.equal(lines.length, 1);
  assert.ok(lines[0].includes("150 LF"));
});

// =============================================================================
// 3. NEVER SHOW SUCCESS ON A FAILED REQUEST.
// =============================================================================
// This is the defect fixed across the other 23 surfaces in commit 5f7f333 and
// it must not be reintroduced here.

test("both halves failing is NOT reported as success", async () => {
  const result = await runRoiCapture({
    email: EMAIL,
    roi: FIGURES,
    createBpClient: stubBp({ ok: false, error: "500: boom" }),
    sendNotification: stubNotifier({ ok: false, error: "smtp refused" }),
  });
  assert.equal(result.outcome.ok, false, "a lost lead must never report success");
  assert.equal(result.outcome.status, 500);
});

test("the failure message tells the truth and carries the phone number", async () => {
  const result = await runRoiCapture({
    email: EMAIL,
    roi: FIGURES,
    createBpClient: stubBp({ ok: false, error: "500: boom" }),
    sendNotification: stubNotifier({ ok: false, error: "smtp refused" }),
  });
  assert.ok(result.outcome.error, "a failed capture must carry an error message");
  assert.ok(
    result.outcome.error.includes(JR_ONE_PHONE),
    `error must carry ${JR_ONE_PHONE}, got: ${result.outcome.error}`
  );
  assert.equal(JR_ONE_PHONE, "(844) 444-3114");
});

test("resolveCaptureOutcome never reports success when both halves failed", () => {
  assert.equal(resolveCaptureOutcome({ bpOk: false, emailOk: false }).ok, false);
  assert.equal(resolveCaptureOutcome({}).ok, false);
  assert.equal(resolveCaptureOutcome({ bpOk: true, emailOk: false }).ok, true);
  assert.equal(resolveCaptureOutcome({ bpOk: false, emailOk: true }).ok, true);
});

// =============================================================================
// 4. THE TWO HALVES ARE INDEPENDENT.
// =============================================================================
// If BuilderPrime rejects the write, a human must still be told, and the other
// way round. A lead must not be lost to one transport's outage.

test("info@ is still notified when BuilderPrime rejects the write", async () => {
  const notify = stubNotifier();
  const result = await runRoiCapture({
    email: EMAIL,
    roi: FIGURES,
    createBpClient: stubBp({ ok: false, error: "500: rejected" }),
    sendNotification: notify,
  });
  assert.equal(notify.calls.length, 1, "the notification must still be sent");
  assert.equal(result.bp.ok, false);
  assert.equal(result.notification.ok, true);
  assert.equal(result.outcome.ok, true, "one surviving half still saves the lead");
});

test("BuilderPrime is still written when the notification fails", async () => {
  const bp = stubBp();
  const result = await runRoiCapture({
    email: EMAIL,
    roi: FIGURES,
    createBpClient: bp,
    sendNotification: stubNotifier({ ok: false, error: "smtp refused" }),
  });
  assert.equal(bp.calls.length, 1, "the CRM write must still happen");
  assert.equal(result.bp.ok, true);
  assert.equal(result.notification.ok, false);
  assert.equal(result.outcome.ok, true);
});

test("a THROWN error in one half cannot skip the other", async () => {
  const notify = stubNotifier();
  const result = await runRoiCapture({
    email: EMAIL,
    roi: FIGURES,
    createBpClient: stubBp({ throws: "socket hang up" }),
    sendNotification: notify,
  });
  assert.equal(notify.calls.length, 1, "a throw must not short-circuit the notifier");
  assert.equal(result.bp.ok, false);
  assert.match(result.bp.error, /socket hang up/);
  assert.equal(result.outcome.ok, true);
});

test("a throw in the notifier cannot lose the BuilderPrime result", async () => {
  const bp = stubBp();
  const result = await runRoiCapture({
    email: EMAIL,
    roi: FIGURES,
    createBpClient: bp,
    sendNotification: stubNotifier({ throws: "connection reset" }),
  });
  assert.equal(bp.calls.length, 1);
  assert.equal(result.bp.ok, true);
  assert.equal(result.notification.ok, false);
  assert.match(result.notification.error, /connection reset/);
});

test("a missing writer or notifier is recorded, not thrown", async () => {
  const result = await runRoiCapture({ email: EMAIL, roi: FIGURES });
  assert.equal(result.bp.ok, false);
  assert.equal(result.notification.ok, false);
  assert.equal(result.outcome.ok, false);
  assert.ok(result.outcome.error.includes(JR_ONE_PHONE));
});

// =============================================================================
// 5. THE HONEYPOT AND THE RATE LIMIT APPLY.
// =============================================================================

test("the honeypot blocks a bot that filled the hidden company field", () => {
  __resetSpamMemoryForTests();
  // Exactly the three fields app/api/send-lead/route.js passes to
  // assessLeadSpam on the ROI branch.
  const verdict = assessLeadSpam({
    email: EMAIL,
    company: "Acme SEO Services",
    form_ms: 45000,
  });
  assert.equal(verdict.block, true, "a filled honeypot must block");
  assert.ok(verdict.reasons.length > 0, "a block must record why");
});

test("a real visitor who left the honeypot empty is NOT blocked", () => {
  __resetSpamMemoryForTests();
  const verdict = assessLeadSpam({ email: EMAIL, company: "", form_ms: 45000 });
  assert.equal(verdict.block, false, "a real visitor must not be blocked");
});

test("the ROI branch runs the honeypot on the same fields the other forms use", () => {
  const route = read("app/api/send-lead/route.js");
  const branch = route.slice(route.indexOf("if (isRoiCapture(body))"));
  const call = branch.slice(branch.indexOf("assessLeadSpam({"), branch.indexOf("});", branch.indexOf("assessLeadSpam({")));
  assert.ok(call.includes("company: body.company"), "honeypot field must be passed through");
  assert.ok(call.includes("form_ms: body.form_ms"), "fill timer must be passed through");
});

test("the shared origin check and rate limit run BEFORE the ROI branch", () => {
  // The rate limiter and the origin allow-list live in the route, which cannot
  // be imported here (it pulls in next/server, which does not resolve outside
  // the Next bundler). What CAN be proved from the source is the thing that
  // actually matters: that the ROI branch sits downstream of both gates, so it
  // is covered by them rather than bypassing them.
  const route = read("app/api/send-lead/route.js");
  const origin = route.indexOf("if (!isAllowedOrigin(request))");
  const rateLimit = route.indexOf("checkRateLimit(ip)");
  const roiBranch = route.indexOf("if (isRoiCapture(body))");
  assert.ok(origin > 0, "the origin check must exist");
  assert.ok(rateLimit > 0, "the rate limit must exist");
  assert.ok(roiBranch > 0, "the ROI branch must exist");
  assert.ok(origin < roiBranch, "origin check must run before the ROI branch");
  assert.ok(rateLimit < roiBranch, "rate limit must run before the ROI branch");
});

test("the ROI capture does NOT define a second origin allow-list or rate limiter", () => {
  // Duplicating the gates is how they drift. There must be exactly one of each
  // in the route, and none at all in the capture module.
  const route = read("app/api/send-lead/route.js");
  const mod = read("lib/roi-capture.js");
  assert.equal(
    (route.match(/const ALLOWED_ORIGINS = new Set/g) || []).length,
    1,
    "there must be exactly one origin allow-list"
  );
  assert.equal(
    (route.match(/function checkRateLimit/g) || []).length,
    1,
    "there must be exactly one rate limiter"
  );
  assert.ok(!/ALLOWED_ORIGINS/.test(mod), "the capture module must not restate the allow-list");
  assert.ok(!/RATE_LIMIT/.test(mod), "the capture module must not restate the rate limit");
});

test("the ROI capture reuses the shared email validator rather than restating it", () => {
  const mod = read("lib/roi-capture.js");
  assert.ok(
    /from "\.\/homepage-email-capture\.js"/.test(mod),
    "the validator and outcome resolver must be imported, not copied"
  );
  // And it must behave identically, because it IS the same function.
  assert.equal(isValidCaptureEmail("a@b.co"), true);
  assert.equal(isValidCaptureEmail("no-at-sign"), false);
  assert.equal(isValidCaptureEmail("two@@at.com"), false);
  assert.equal(isValidCaptureEmail(""), false);
  assert.equal(isValidCaptureEmail(null), false);
});

// =============================================================================
// 6. ROUTING: ONLY THE ROI SHAPE TAKES THE ROI BRANCH.
// =============================================================================

test("isRoiCapture recognises only the ROI calculator shape", () => {
  assert.equal(isRoiCapture({ captureType: ROI_CAPTURE_TYPE }), true);
  assert.equal(isRoiCapture({ captureType: "homepage-email" }), false);
  assert.equal(isRoiCapture({}), false);
  assert.equal(isRoiCapture(null), false);
  assert.equal(isRoiCapture(undefined), false);
});

test("the calculator posts the captureType the route branches on", () => {
  const html = read("public/roi-calculator.html");
  assert.ok(
    html.includes(`captureType:'${ROI_CAPTURE_TYPE}'`),
    "the page and the route must agree on the discriminator"
  );
  assert.ok(html.includes("'/api/send-lead'"), "the page must post to the existing route");
});

// =============================================================================
// 7. THE PAGE ITSELF MUST NOT REGRESS TO alert().
// =============================================================================

test("the ROI calculator no longer throws the lead away in an alert()", () => {
  const html = read("public/roi-calculator.html");
  assert.ok(
    !/onclick="alert\(/.test(html),
    "the call to action must not be an alert() that captures nothing"
  );
  assert.ok(html.includes("submitRoiLead"), "the call to action must submit the lead");
});

test("the calculator reads the server reply instead of assuming success", () => {
  const html = read("public/roi-calculator.html");
  assert.ok(html.includes("if(!resp.ok)"), "the response status must be checked");
  assert.ok(
    html.includes("data.success!==true"),
    "a 200 that does not confirm capture must still be treated as a failure"
  );
});

test("the calculator shows the phone number on every failure path, in both languages", () => {
  const html = read("public/roi-calculator.html");
  const script = html.slice(html.indexOf("var STRINGS="), html.indexOf("var lang="));
  for (const key of ["call_us", "network"]) {
    const hits = (script.match(new RegExp(`${key}:`, "g")) || []).length;
    assert.equal(hits, 2, `${key} must exist in BOTH en and es`);
  }
  // Both languages must carry the real number, not a placeholder.
  assert.equal(
    (script.match(/\(844\) 444-3114/g) || []).length,
    4,
    "call_us and network must carry the phone number in en and es"
  );
});

test("the Spanish capture strings are present and keep their real accents", () => {
  const html = read("public/roi-calculator.html");
  const es = html.slice(html.indexOf("  es:{"), html.indexOf("var lang="));
  assert.ok(es.includes("inspección"), "Spanish must keep real accents");
  assert.ok(es.includes("Déjenos"), "Spanish must keep real accents");
  assert.ok(es.includes("electrónico"), "Spanish must keep real accents");
  // Every key present in English must be present in Spanish, or a visitor on
  // the Spanish side silently falls back to an English sentence.
  const enBlock = html.slice(html.indexOf("  en:{"), html.indexOf("  es:{"));
  const enKeys = [...enBlock.matchAll(/^\s{4}([a-z_]+):/gm)].map((m) => m[1]);
  const esKeys = new Set([...es.matchAll(/^\s{4}([a-z_]+):/gm)].map((m) => m[1]));
  assert.ok(enKeys.length >= 10, `expected the full string table, found ${enKeys.length}`);
  for (const k of enKeys) {
    assert.ok(esKeys.has(k), `Spanish is missing the "${k}" string`);
  }
});

// =============================================================================
// 8. THE MODULE CANNOT REACH A NETWORK OR A CREDENTIAL.
// =============================================================================
// Mechanical, not a promise. If someone later adds a fetch or reads an API key
// into this module, this test fails and the "no real mail, no real BuilderPrime"
// guarantee above stops being true quietly.

test("lib/roi-capture.js names no transport and reads no credential", () => {
  const src = read("lib/roi-capture.js")
    // Strip comments first: the header discusses fetch and BuilderPrime in
    // prose, and prose is not a capability.
    .replace(/\/\*[\s\S]*?\*\//g, "")
    .replace(/^\s*\/\/.*$/gm, "");

  for (const forbidden of ["fetch(", "https:/", "process.env", "nodemailer", "require("]) {
    assert.ok(
      !src.includes(forbidden),
      `lib/roi-capture.js must not contain ${forbidden} outside comments`
    );
  }
});

test("this test file drives the same function the route calls", () => {
  const route = read("app/api/send-lead/route.js");
  assert.ok(
    route.includes("runRoiCapture({"),
    "the route must run the orchestration these tests drive"
  );
  assert.ok(
    route.includes('from "@/lib/roi-capture"'),
    "the route must import the module under test"
  );
});

test("the route hands the real transports in, and shares them with the homepage band", () => {
  const route = read("app/api/send-lead/route.js");
  // Hoisted so there is ONE copy of each transport. A second copy is how a fix
  // to one silently misses the other.
  assert.equal(
    (route.match(/async function createBpClientRemote/g) || []).length,
    1,
    "there must be exactly one BuilderPrime writer"
  );
  assert.equal(
    (route.match(/async function sendOperatorNotification/g) || []).length,
    1,
    "there must be exactly one operator notifier"
  );
  assert.equal(
    (route.match(/createBpClient: createBpClientRemote/g) || []).length,
    2,
    "both the homepage band and the ROI calculator must use the shared writer"
  );
  assert.equal(
    (route.match(/sendNotification: sendOperatorNotification/g) || []).length,
    2,
    "both the homepage band and the ROI calculator must use the shared notifier"
  );
  assert.ok(
    route.includes('to: "info@jronegutters.com"'),
    "the notification must go to the hand-monitored inbox"
  );
});
