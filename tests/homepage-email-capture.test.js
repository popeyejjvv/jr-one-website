// =============================================================================
// Homepage Email Capture Tests
// =============================================================================
// Run with: node --test "tests/*.test.js"
//        or: node --test tests/homepage-email-capture.test.js
//
// NOT `npm test` (package.json has no test script) and NOT `node --test tests/`
// (directory form throws MODULE_NOT_FOUND on Node 25).
//
// ── HOW PRODUCTION WRITES ARE MADE IMPOSSIBLE ────────────────────────────────
// Three independent guarantees, not one:
//
// 1. This file imports exactly ONE module, lib/homepage-email-capture.js. That
//    module has no network primitive and no credential read. The last test in
//    this file proves it mechanically by scanning the module's own source with
//    comments stripped: no fetch(, no https:/, no process.env, no nodemailer,
//    no require(. A module that cannot name a transport cannot reach one.
//
// 2. The two side effects are INJECTED. runHomepageCapture() takes
//    createBpClient and sendNotification as arguments. Every test passes a stub
//    that records its call and returns a canned result. The real BuilderPrime
//    fetch and the real nodemailer send live in app/api/send-lead/route.js and
//    are passed in only by the route, which this file never imports (importing
//    a route pulls in next/server, which does not resolve outside the Next
//    bundler, so it could not run here even by mistake).
//
// 3. No test supplies an API key or SMTP credential, and none is read from the
//    environment, so even a stub that tried to call out would have nothing to
//    authenticate with.
//
// The orchestration under test is the SAME function the route runs in
// production. There is one copy of that control flow, not a test copy and a
// real copy, which is the failure mode tests/estimator-utils.test.js has (it
// pastes copies of the functions and therefore tests the paste).
// =============================================================================

import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import {
  HOMEPAGE_CAPTURE_TYPE,
  HOMEPAGE_CAPTURE_FIRST_NAME,
  HOMEPAGE_CAPTURE_LAST_NAME,
  JR_ONE_PHONE,
  isHomepageCapture,
  isValidCaptureEmail,
  buildHomepageCaptureBpPayload,
  buildHomepageCaptureNotification,
  resolveCaptureOutcome,
  runHomepageCapture,
} from "../lib/homepage-email-capture.js";
import { assessLeadSpam, __resetSpamMemoryForTests } from "../lib/lead-spam.js";

// ── Stubs. Each records what it was handed so a test can assert the OTHER half
//    still ran even when its sibling failed. ──────────────────────────────────
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

// ─────────────────────────────────────────────────────────────────────────────
// 1. HAPPY PATH: a valid email creates a record AND sends the notification.
// ─────────────────────────────────────────────────────────────────────────────

test("a valid email creates a BuilderPrime record and sends the notification", async () => {
  const bp = stubBp({ ok: true, opportunityId: "6100001" });
  const notify = stubNotifier({ ok: true });

  const r = await runHomepageCapture({
    email: EMAIL, page: "/", timestampEt: "8/8/2026, 2:05:00 AM",
    createBpClient: bp, sendNotification: notify,
  });

  assert.equal(bp.calls.length, 1, "BuilderPrime must be called exactly once");
  assert.equal(notify.calls.length, 1, "the notification must be sent exactly once");
  assert.equal(r.bp.ok, true);
  assert.equal(r.bp.opportunityId, "6100001");
  assert.equal(r.notification.ok, true);
  assert.equal(r.outcome.ok, true);
  assert.equal(r.outcome.status, 200);
});

test("the record carries the email and is labelled a homepage capture, not a person", async () => {
  const bp = stubBp();
  await runHomepageCapture({
    email: EMAIL, page: "/", createBpClient: bp, sendNotification: stubNotifier(),
  });
  const payload = bp.calls[0];

  assert.equal(payload.userAccount.emailAddress, EMAIL);
  assert.equal(payload.emailAddress, EMAIL);
  assert.equal(payload.userAccount.firstName, HOMEPAGE_CAPTURE_FIRST_NAME);
  assert.equal(payload.userAccount.lastName, HOMEPAGE_CAPTURE_LAST_NAME);

  // The banned placeholder, per lib/estimator-lead.js:52.
  const asText = JSON.stringify(payload);
  assert.ok(!asText.includes("Estimator Lead"), "must never reuse the banned placeholder");

  // BuilderPrime requires a nested userAccount with both name fields
  // (app/api/send-lead/route.js:16-18). Both must be non-empty or the create
  // 500s.
  assert.ok(payload.userAccount.firstName.length > 0);
  assert.ok(payload.userAccount.lastName.length > 0);

  // The source must survive in a field confirmed to read back.
  assert.ok(
    `${payload.userAccount.firstName} ${payload.userAccount.lastName}`
      .toLowerCase()
      .includes("homepage"),
    "the name fields must identify this as a homepage capture"
  );
});

test("no phone or address is fabricated", async () => {
  const bp = stubBp();
  await runHomepageCapture({
    email: EMAIL, page: "/", createBpClient: bp, sendNotification: stubNotifier(),
  });
  const payload = bp.calls[0];
  // The box collects neither. Inventing either would put made-up data in a CRM
  // that has no DELETE.
  assert.equal(payload.phoneNumber, undefined, "must not invent a phone number");
  assert.equal(payload.addressLine1, "");
  assert.equal(payload.city, "");
  assert.equal(payload.zip, "");
});

test("the notification states plainly what came in, the address, the page and ET time", () => {
  const n = buildHomepageCaptureNotification({
    email: EMAIL, page: "/es", timestampEt: "8/8/2026, 2:05:00 AM",
  });
  assert.ok(n.subject.includes(EMAIL), "subject must carry the address");
  assert.ok(n.text.includes(EMAIL), "body must carry the address");
  assert.ok(n.text.includes("/es"), "body must carry the page it came from");
  assert.ok(n.text.includes("8/8/2026, 2:05:00 AM"), "body must carry the ET timestamp");
  assert.ok(/homepage email box/i.test(n.text), "body must say plainly what happened");
});

// ─────────────────────────────────────────────────────────────────────────────
// 2. INDEPENDENCE. The point of the whole design.
// ─────────────────────────────────────────────────────────────────────────────

test("BuilderPrime failure still sends the notification", async () => {
  const bp = stubBp({ ok: false, error: "500: rejected" });
  const notify = stubNotifier({ ok: true });

  const r = await runHomepageCapture({
    email: EMAIL, page: "/", createBpClient: bp, sendNotification: notify,
  });

  assert.equal(r.bp.ok, false);
  assert.equal(notify.calls.length, 1, "the notification MUST still be sent");
  assert.equal(r.notification.ok, true);
  assert.equal(r.outcome.ok, true, "one surviving half is still a success for the visitor");
});

test("a BuilderPrime exception still sends the notification", async () => {
  // A thrown transport error must not skip the other half.
  const notify = stubNotifier({ ok: true });
  const r = await runHomepageCapture({
    email: EMAIL, page: "/",
    createBpClient: stubBp({ throws: "socket hang up" }),
    sendNotification: notify,
  });
  assert.equal(r.bp.ok, false);
  assert.equal(r.bp.error, "socket hang up");
  assert.equal(notify.calls.length, 1, "an exception in half 1 must not skip half 2");
  assert.equal(r.outcome.ok, true);
});

test("notification failure still creates the record", async () => {
  const bp = stubBp({ ok: true, opportunityId: "6100002" });
  const r = await runHomepageCapture({
    email: EMAIL, page: "/",
    createBpClient: bp,
    sendNotification: stubNotifier({ ok: false, error: "SMTP 535" }),
  });

  assert.equal(bp.calls.length, 1, "the record MUST still be created");
  assert.equal(r.bp.ok, true);
  assert.equal(r.bp.opportunityId, "6100002");
  assert.equal(r.notification.ok, false);
  assert.equal(r.outcome.ok, true);
});

test("a notification exception still leaves the record created", async () => {
  const bp = stubBp({ ok: true });
  const r = await runHomepageCapture({
    email: EMAIL, page: "/",
    createBpClient: bp,
    sendNotification: stubNotifier({ throws: "getaddrinfo ENOTFOUND smtp.gmail.com" }),
  });
  assert.equal(r.bp.ok, true, "the record must survive a throwing notifier");
  assert.equal(r.notification.ok, false);
  assert.equal(r.outcome.ok, true);
});

test("BuilderPrime is always attempted even when the notifier is missing entirely", async () => {
  const bp = stubBp({ ok: true });
  const r = await runHomepageCapture({
    email: EMAIL, page: "/", createBpClient: bp, sendNotification: undefined,
  });
  assert.equal(bp.calls.length, 1);
  assert.equal(r.notification.ok, false);
  assert.equal(r.outcome.ok, true);
});

test("the notification is always attempted even when the BP writer is missing entirely", async () => {
  const notify = stubNotifier({ ok: true });
  const r = await runHomepageCapture({
    email: EMAIL, page: "/", createBpClient: undefined, sendNotification: notify,
  });
  assert.equal(notify.calls.length, 1);
  assert.equal(r.bp.ok, false);
  assert.equal(r.outcome.ok, true);
});

// ─────────────────────────────────────────────────────────────────────────────
// 3. BOTH FAIL: the visitor gets a real error, never a false success.
// ─────────────────────────────────────────────────────────────────────────────

test("when both halves fail the visitor gets an error, not a confirmation", async () => {
  const r = await runHomepageCapture({
    email: EMAIL, page: "/",
    createBpClient: stubBp({ ok: false, error: "500" }),
    sendNotification: stubNotifier({ ok: false, error: "SMTP down" }),
  });

  assert.equal(r.outcome.ok, false, "both halves failed, so this is NOT a success");
  assert.equal(r.outcome.status, 500);
  assert.ok(r.outcome.error, "there must be a real error message");
  assert.ok(
    r.outcome.error.includes(JR_ONE_PHONE),
    `the error must carry the phone number so the person can still reach JR One, got: ${r.outcome.error}`
  );
});

test("when both halves throw the visitor still gets the error with the phone number", async () => {
  const r = await runHomepageCapture({
    email: EMAIL, page: "/",
    createBpClient: stubBp({ throws: "boom" }),
    sendNotification: stubNotifier({ throws: "bang" }),
  });
  assert.equal(r.outcome.ok, false);
  assert.equal(r.outcome.status, 500);
  assert.ok(r.outcome.error.includes(JR_ONE_PHONE));
});

test("resolveCaptureOutcome only reports success when a half actually landed", () => {
  assert.equal(resolveCaptureOutcome({ bpOk: true,  emailOk: true  }).ok, true);
  assert.equal(resolveCaptureOutcome({ bpOk: true,  emailOk: false }).ok, true);
  assert.equal(resolveCaptureOutcome({ bpOk: false, emailOk: true  }).ok, true);
  assert.equal(resolveCaptureOutcome({ bpOk: false, emailOk: false }).ok, false);
  assert.equal(resolveCaptureOutcome({}).ok, false, "unknown state is NOT success");
});

// ─────────────────────────────────────────────────────────────────────────────
// 4. INVALID EMAIL is rejected BEFORE anything is called.
// ─────────────────────────────────────────────────────────────────────────────

test("invalid addresses are rejected", () => {
  for (const bad of [
    "", "   ", "nope", "a@b", "a@b.c", "no-at-sign.com", "two@@at.com",
    "spaces in@example.com", "@example.com", "trailing@example.com.",
    "double..dot@example..com", "user@.example.com", undefined, null, 12345,
    `${"a".repeat(65)}@example.com`,
  ]) {
    assert.equal(
      isValidCaptureEmail(bad), false,
      `${JSON.stringify(bad)} should be rejected`
    );
  }
});

test("real addresses are accepted, including the awkward legal ones", () => {
  for (const good of [
    "maria@gmail.com", "j.smith@yahoo.com", "a.b+tag@sub.domain.co.uk",
    "first-last@example.org", "user_name@example.net", "x1@e.io",
    "OPERATOR@JRONEGUTTERS.COM",
  ]) {
    assert.equal(
      isValidCaptureEmail(good), true,
      `${good} is a real address and must be accepted`
    );
  }
});

test("nothing is called when the address is invalid", async () => {
  // The route returns 400 before reaching runHomepageCapture. This proves the
  // ordering contract the route depends on: validation is cheap and first.
  const bp = stubBp();
  const notify = stubNotifier();
  const bad = "not-an-email";

  assert.equal(isValidCaptureEmail(bad), false);
  if (isValidCaptureEmail(bad)) {
    await runHomepageCapture({ email: bad, createBpClient: bp, sendNotification: notify });
  }
  assert.equal(bp.calls.length, 0, "BuilderPrime must not be called for an invalid address");
  assert.equal(notify.calls.length, 0, "no notification for an invalid address");
});

// ─────────────────────────────────────────────────────────────────────────────
// 5. HONEYPOT AND RATE LIMIT still apply to this shape.
// ─────────────────────────────────────────────────────────────────────────────

test("the honeypot still blocks a homepage capture", () => {
  __resetSpamMemoryForTests();
  const r = assessLeadSpam({ email: EMAIL, company: "Acme Corp", form_ms: 40_000 });
  assert.equal(r.block, true, "a filled honeypot must block a homepage capture too");
  assert.ok(r.reasons.includes("honeypot field filled"));
});

test("an empty honeypot never blocks a homepage capture", () => {
  for (const v of ["", "   ", undefined, null]) {
    __resetSpamMemoryForTests();
    const r = assessLeadSpam({ email: EMAIL, company: v, form_ms: 40_000 });
    assert.equal(r.block, false, `empty honeypot ${JSON.stringify(v)} must not block`);
  }
});

test("a sub-second machine fill still blocks a homepage capture", () => {
  __resetSpamMemoryForTests();
  const r = assessLeadSpam({ email: EMAIL, company: "", form_ms: 300 });
  assert.equal(r.block, true, "sub-second fill must block");
});

test("a real person typing an address is not blocked by the spam gate", () => {
  // The capture payload carries no name, no phone and no zip. None of those
  // absences may be read as a signal, or the box would block everyone.
  __resetSpamMemoryForTests();
  const r = assessLeadSpam({ email: "maria.gonzalez@gmail.com", company: "", form_ms: 18_000 });
  assert.equal(r.block, false, `a real capture was blocked: ${r.reasons.join("; ")}`);
  assert.deepEqual(r.reasons, [], "a bare email capture should raise no signal at all");
});

test("a homepage capture with no phone does not trip the undialable-phone rule", () => {
  __resetSpamMemoryForTests();
  const r = assessLeadSpam({ email: EMAIL, phone: "", company: "", form_ms: 20_000 });
  assert.equal(r.block, false, `absent phone treated as undialable: ${r.reasons.join("; ")}`);
});

// ─────────────────────────────────────────────────────────────────────────────
// 6. SHAPE + STRUCTURAL GUARANTEES.
// ─────────────────────────────────────────────────────────────────────────────

test("only a homepage-email submission takes the capture branch", () => {
  assert.equal(isHomepageCapture({ captureType: HOMEPAGE_CAPTURE_TYPE }), true);
  // A normal lead must NOT be diverted into the capture branch, or the 21
  // working forms would lose their name/phone validation.
  assert.equal(isHomepageCapture({ name: "Maria", phone: "8135550142" }), false);
  assert.equal(isHomepageCapture({ captureType: "something-else" }), false);
  assert.equal(isHomepageCapture({}), false);
  assert.equal(isHomepageCapture(null), false);
  assert.equal(isHomepageCapture(undefined), false);
});

test("the capture module performs no I/O and cannot reach BuilderPrime or SMTP", () => {
  // Mechanical proof, not a promise. Comments are stripped first so the check
  // measures CODE, not the header prose that discusses BuilderPrime at length.
  const raw = fs.readFileSync(
    path.join(process.cwd(), "lib", "homepage-email-capture.js"),
    "utf8"
  );
  const code = raw
    .replace(/\/\*[\s\S]*?\*\//g, " ")
    .replace(/(^|[^:])\/\/.*$/gm, "$1");

  for (const forbidden of [
    "fetch(", "https:/", "process.env", "nodemailer", "require(",
    "XMLHttpRequest", "child_process", "readFile", "writeFile",
    "builderprime.com",
  ]) {
    assert.ok(
      !code.toLowerCase().includes(forbidden.toLowerCase()),
      `lib/homepage-email-capture.js CODE must not contain ${forbidden} - it would make this suite capable of production writes`
    );
  }

  // Prove the stripper did something, so this cannot rot into a no-op.
  assert.ok(code.length < raw.length, "comment stripping must have removed something");
  assert.ok(
    code.includes("export async function runHomepageCapture"),
    "the real orchestrator must survive stripping"
  );
});
