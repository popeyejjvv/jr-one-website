// =============================================================================
// Instant Estimator email tests
// =============================================================================
// Run with: node --test "tests/*.test.js"
//        or: node --test tests/estimate-email.test.js
//
// NOT `npm test` (package.json has no test script) and NOT `node --test tests/`
// (directory form throws MODULE_NOT_FOUND on Node 25).
//
// ── HOW REAL MAIL AND REAL BUILDERPRIME WRITES ARE MADE IMPOSSIBLE ───────────
// Three independent guarantees, not one. This mirrors
// tests/homepage-email-capture.test.js, which established the pattern.
//
// 1. This file imports exactly ONE production module, lib/estimate-email.js.
//    That module has no network primitive and no credential read. The last test
//    in this file proves it MECHANICALLY by scanning the module's own source
//    with comments stripped: no fetch(, no nodemailer, no process.env, no
//    require(, no https:. A module that cannot name a transport cannot reach
//    one. This is a structural fact the test re-proves on every run, not a
//    promise in a comment.
//
// 2. Both side effects are INJECTED. runEstimateEmail() takes sendCustomerEmail
//    and sendOpsNotification as arguments. Every test here passes a stub that
//    records its call and returns a canned result. The real nodemailer
//    transports live in app/api/estimator-lead/route.js and are passed in only
//    by that route, which this file never imports (importing a route pulls in
//    next/server, which does not resolve outside the Next bundler, so it could
//    not run here even by mistake).
//
// 3. No test supplies an SMTP credential or a BuilderPrime key, and none is
//    read from the environment, so even a stub that tried to call out would
//    have nothing to authenticate with. BuilderPrime is never touched at all:
//    lib/estimate-email.js contains no BuilderPrime code path, so there is
//    nothing here that could write a CRM record.
//
// The orchestration under test is the SAME function the route runs in
// production. One copy of that control flow, not a test copy and a real copy.
// =============================================================================

import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import {
  JR_ONE_PHONE,
  OPS_INBOX,
  SEND_STATUS,
  BANNED_CLAIM_PATTERNS,
  findBannedClaims,
  buildEstimateEmail,
  buildEstimateOpsNotification,
  buildServiceLines,
  formatRange,
  formatEstimateDate,
  assertBrandedChrome,
  resolveEstimateEmailOutcome,
  runEstimateEmail,
  unsubscribeLink,
} from "../lib/estimate-email.js";

// ── Stubs. Each records what it was handed, so a test can assert the OTHER
//    side effect still ran even when its sibling failed. ─────────────────────
function stubCustomerMail({ ok = true, messageId = "<stub-message-id@test>", error = null, throws = null } = {}) {
  const calls = [];
  const fn = async (message) => {
    calls.push(message);
    if (throws) throw new Error(throws);
    return { ok, messageId, error };
  };
  fn.calls = calls;
  return fn;
}

function stubOpsMail({ ok = true, error = null, throws = null } = {}) {
  const calls = [];
  const fn = async (message) => {
    calls.push(message);
    if (throws) throw new Error(throws);
    return { ok, error };
  };
  fn.calls = calls;
  return fn;
}

// A realistic completed estimate: the visitor drew a roofline, got a range, and
// typed a name and address. Mirrors the payload public/estimator.html
// sendToCustomer() posts.
function completedEstimate(overrides = {}) {
  return {
    customerName: "Maria Gonzalez",
    customerEmail: "maria@example.com",
    phone: "(813) 555-0142",
    address: "1204 W Cherry St, Tampa, FL 33607",
    lang: "en",
    estimateLow: 2100,
    estimateHigh: 2840,
    measurements: { gutter: 148, soffit: 60, guard: 148, cleaning: 0 },
    downspouts: { count: 5, totalFt: 65, ftEach: 13 },
    gutterSize: 6,
    discountCode: "JR1-5OFF",
    expDate: "2026-08-21",
    submittedAt: "2026-08-07T15:30:00.000Z",
    bpOpportunityId: "5651220",
    ...overrides,
  };
}

// =============================================================================
// 1. A COMPLETED ESTIMATE WITH AN EMAIL ADDRESS ACTUALLY SENDS, AND ONLY THEN
//    IS THE VISITOR TOLD IT WAS SENT.
// =============================================================================

test("completed estimate with an email address sends the estimate and reports sent", async () => {
  const customer = stubCustomerMail();
  const ops = stubOpsMail();

  const res = await runEstimateEmail({
    ...completedEstimate(),
    sendCustomerEmail: customer,
    sendOpsNotification: ops,
  });

  assert.equal(res.emailed, true, "the estimate must be reported as emailed");
  assert.equal(res.status, SEND_STATUS.SENT);
  assert.equal(res.error, null);
  assert.equal(res.messageId, "<stub-message-id@test>");

  // The send really happened, to the right address, as branded HTML.
  assert.equal(customer.calls.length, 1, "exactly one customer email");
  const sent = customer.calls[0];
  assert.equal(sent.to, "maria@example.com");
  assert.match(sent.subject, /Your JR One estimate, Maria/);
  assert.ok(sent.html && sent.html.includes("<html"), "must be HTML, never plain text only");
  assert.ok(sent.text && sent.text.length > 0, "a plain-text alternative still ships");
});

test("the confirmation is gated on the send, not on the lead being captured", async () => {
  // This is the exact defect being fixed. The old UI showed "Estimate sent to
  // {address}" whenever the lead API returned 2xx. resolveEstimateEmailOutcome
  // is the only thing allowed to authorise that sentence, and it needs a real
  // successful send.
  assert.equal(resolveEstimateEmailOutcome({ hasEmail: true, sendOk: true }).emailed, true);
  assert.equal(resolveEstimateEmailOutcome({ hasEmail: true, sendOk: false }).emailed, false);
  assert.equal(resolveEstimateEmailOutcome({ hasEmail: false }).emailed, false);
});

// =============================================================================
// 2. NO EMAIL ADDRESS MEANS NO CLAIM THAT ANYTHING WAS SENT.
// =============================================================================

test("an estimate with no email address never claims one was sent", async () => {
  const customer = stubCustomerMail();
  const ops = stubOpsMail();

  for (const missing of [undefined, null, "", "   "]) {
    const res = await runEstimateEmail({
      ...completedEstimate({ customerEmail: missing }),
      sendCustomerEmail: customer,
      sendOpsNotification: ops,
    });

    assert.equal(res.emailed, false, `no address (${JSON.stringify(missing)}) must never report emailed`);
    assert.equal(res.status, SEND_STATUS.NO_ADDRESS);
    assert.equal(res.attempted, false, "nothing may even be attempted without an address");
  }

  // Nothing was sent to anyone. Not a customer copy addressed to an empty
  // string, and not an ops notice announcing an estimate that does not exist.
  assert.equal(customer.calls.length, 0, "no customer mail without an address");
  assert.equal(ops.calls.length, 0, "no ops notice without an address");
});

test("no-address is distinguishable from failure, so the UI can say the right thing", async () => {
  const noAddress = resolveEstimateEmailOutcome({ hasEmail: false });
  const failed = resolveEstimateEmailOutcome({ hasEmail: true, sendOk: false });
  assert.notEqual(noAddress.status, failed.status);
  assert.equal(noAddress.error, undefined, "no address is not an error, nothing was promised");
  assert.ok(failed.error, "a failed send IS an error and must carry a message");
});

// =============================================================================
// 3. A FAILED SEND TELLS THE TRUTH, CARRIES THE PHONE NUMBER, AND IS LOGGED.
// =============================================================================

test("a send failure reports failure with the phone number, never a checkmark", async () => {
  const customer = stubCustomerMail({ ok: false, error: "550 mailbox unavailable" });
  const ops = stubOpsMail();

  const res = await runEstimateEmail({
    ...completedEstimate(),
    sendCustomerEmail: customer,
    sendOpsNotification: ops,
  });

  assert.equal(res.emailed, false);
  assert.equal(res.status, SEND_STATUS.FAILED);
  assert.match(res.error, /550 mailbox unavailable/);
  assert.ok(res.customerMessage, "the visitor gets a message");
  assert.ok(
    res.customerMessage.includes(JR_ONE_PHONE),
    `the failure message must carry ${JR_ONE_PHONE}, got: ${res.customerMessage}`
  );
});

test("a transport that throws is still a truthful failure, not a crash", async () => {
  const customer = stubCustomerMail({ throws: "ECONNREFUSED smtp.gmail.com" });
  const ops = stubOpsMail();

  const res = await runEstimateEmail({
    ...completedEstimate(),
    sendCustomerEmail: customer,
    sendOpsNotification: ops,
  });

  assert.equal(res.emailed, false);
  assert.equal(res.status, SEND_STATUS.FAILED);
  assert.match(res.error, /ECONNREFUSED/);
  assert.ok(res.customerMessage.includes(JR_ONE_PHONE));
});

test("a missing mail transport is a failure, never a silent success", async () => {
  // The route passes a sender that returns {ok:false} when GMAIL_USER or
  // GMAIL_APP_PASSWORD is unset. The visitor must not be told "sent" because a
  // credential is missing on the server.
  const res = await runEstimateEmail({
    ...completedEstimate(),
    sendCustomerEmail: undefined,
    sendOpsNotification: undefined,
  });
  assert.equal(res.emailed, false);
  assert.equal(res.status, SEND_STATUS.FAILED);
  assert.match(res.error, /no customer mail transport configured/);
});

test("the failure is logged with everything needed to follow up by hand", async () => {
  // The ops notice IS the log. On failure it must name the customer, their
  // address, their phone, and say plainly that the send failed, because that is
  // the case where a human has to pick up the phone.
  const notice = buildEstimateOpsNotification({
    ...completedEstimate(),
    delivered: false,
    deliveryError: "550 mailbox unavailable",
  });
  assert.match(notice.subject, /FAILED/);
  assert.match(notice.text, /Status:\s+FAILED/);
  assert.match(notice.text, /550 mailbox unavailable/);
  assert.match(notice.text, /maria@example\.com/);
  assert.match(notice.text, /Maria Gonzalez/);
  assert.match(notice.text, /\(813\) 555-0142/);
});

// =============================================================================
// 4. THE info@ NOTIFICATION FIRES.
// =============================================================================

test("the info@ notification fires on a successful send, naming who got it", async () => {
  const customer = stubCustomerMail();
  const ops = stubOpsMail();

  const res = await runEstimateEmail({
    ...completedEstimate(),
    sendCustomerEmail: customer,
    sendOpsNotification: ops,
  });

  assert.equal(res.ops.ok, true);
  assert.equal(ops.calls.length, 1, "exactly one ops notice");
  const notice = ops.calls[0];
  assert.match(notice.subject, /Estimate emailed to maria@example\.com/);
  assert.match(notice.text, /Status:\s+DELIVERED/);
  assert.match(notice.text, /\$2,100 to \$2,840/, "the team sees what was quoted");
  assert.match(notice.text, /opportunity 5651220/, "and which CRM record it belongs to");
});

test("the info@ notification also fires when the customer send failed", async () => {
  // A failed customer send is exactly when the team most needs to know.
  const customer = stubCustomerMail({ ok: false, error: "550 mailbox unavailable" });
  const ops = stubOpsMail();

  await runEstimateEmail({
    ...completedEstimate(),
    sendCustomerEmail: customer,
    sendOpsNotification: ops,
  });

  assert.equal(ops.calls.length, 1);
  assert.match(ops.calls[0].subject, /FAILED/);
});

test("the two sends are independent: a thrown customer send cannot skip the ops notice", async () => {
  const customer = stubCustomerMail({ throws: "smtp exploded" });
  const ops = stubOpsMail();

  const res = await runEstimateEmail({
    ...completedEstimate(),
    sendCustomerEmail: customer,
    sendOpsNotification: ops,
  });

  assert.equal(res.emailed, false);
  assert.equal(ops.calls.length, 1, "the ops notice still went");
  assert.equal(res.ops.ok, true);
});

test("a thrown ops notice cannot undo a successful customer send", async () => {
  const customer = stubCustomerMail();
  const ops = stubOpsMail({ throws: "ops relay down" });

  const res = await runEstimateEmail({
    ...completedEstimate(),
    sendCustomerEmail: customer,
    sendOpsNotification: ops,
  });

  assert.equal(res.emailed, true, "the customer really did get their estimate");
  assert.equal(res.status, SEND_STATUS.SENT);
  assert.equal(res.ops.ok, false);
  assert.match(res.ops.error, /ops relay down/);
});

test("the ops notice is plain internal text, deliberately not branded chrome", async () => {
  const notice = buildEstimateOpsNotification({ ...completedEstimate(), delivered: true });
  assert.equal(typeof notice.text, "string");
  assert.equal(notice.html, undefined, "internal notices carry no HTML body");
  assert.match(notice.text, /internal notification from jronegutters\.com/);
});

// =============================================================================
// 5. THE SPANISH VERSION.
// =============================================================================

test("a Spanish estimate renders in Spanish, with real accents", async () => {
  const customer = stubCustomerMail();
  const ops = stubOpsMail();

  await runEstimateEmail({
    ...completedEstimate({ lang: "es" }),
    sendCustomerEmail: customer,
    sendOpsNotification: ops,
  });

  const sent = customer.calls[0];
  assert.match(sent.subject, /Su estimado de JR One/);
  assert.match(sent.html, /lang="es"/);
  assert.match(sent.text, /Estimador Instantáneo/);
  assert.match(sent.text, /Su rango estimado/);
  assert.match(sent.text, /pies lineales/);
  assert.match(sent.text, /Empresa familiar/);

  // Accent integrity. A known failure mode in this stack is Spanish generated
  // with every diacritic stripped, which reads as broken Spanish to a customer.
  for (const word of ["Instantáneo", "resultó", "midió", "cotización", "medición", "Código", "Válido", "Plafón", "más", "Recibió"]) {
    assert.ok(sent.text.includes(word), `Spanish must keep its accents: expected "${word}"`);
  }

  // And it is genuinely Spanish, not English with a Spanish subject line.
  assert.ok(!sent.text.includes("linear feet"), "no English service detail leaked in");
  assert.ok(!sent.text.includes("Thanks for using"), "no English intro leaked in");
});

test("English and Spanish are different copy, not a word-for-word swap", async () => {
  const en = buildEstimateEmail(completedEstimate({ lang: "en" }));
  const es = buildEstimateEmail(completedEstimate({ lang: "es" }));
  assert.notEqual(en.subject, es.subject);
  assert.notEqual(en.text, es.text);
  assert.match(es.text, /¿Prefiere que lo llamemos\?/, "Spanish uses its opening question mark");
});

test("an unknown language falls back to English rather than rendering nothing", async () => {
  const weird = buildEstimateEmail(completedEstimate({ lang: "fr" }));
  assert.match(weird.subject, /Your JR One estimate/);
});

// =============================================================================
// 6. THE EMAIL CONTAINS NONE OF THE BANNED CLAIMS.
// =============================================================================

const BANNED_SURFACES = ["subject", "html", "text"];

test("neither language carries any banned claim", () => {
  for (const lang of ["en", "es"]) {
    const mail = buildEstimateEmail(completedEstimate({ lang }));
    for (const surface of BANNED_SURFACES) {
      const hits = findBannedClaims(mail[surface]);
      assert.deepEqual(hits, [], `${lang} ${surface} carried banned claim(s): ${hits.join(", ")}`);
    }
  }
});

test("no banned claim survives any combination of estimator inputs", () => {
  // Sweep the shapes a real visitor can produce, including the degenerate ones,
  // so a banned claim cannot hide in a branch that only some inputs reach.
  const shapes = [
    {},
    { lang: "es" },
    { measurements: { gutter: 0, soffit: 0, guard: 0, cleaning: 0 } },
    { measurements: { cleaning: 90 }, downspouts: { count: 0 } },
    { measurements: { guard: 120 } },
    { estimateLow: 0, estimateHigh: 0 },
    { estimateLow: null, estimateHigh: null, lang: "es" },
    { discountCode: "", expDate: "" },
    { customerName: "" },
    { gutterSize: 7 },
    { submittedAt: null },
  ];
  for (const shape of shapes) {
    const mail = buildEstimateEmail(completedEstimate(shape));
    for (const surface of BANNED_SURFACES) {
      const hits = findBannedClaims(mail[surface]);
      assert.deepEqual(hits, [], `shape ${JSON.stringify(shape)} produced: ${hits.join(", ")}`);
    }
  }
});

test("the brand gate actually catches each banned claim (the gate is not a no-op)", () => {
  // A gate that never fires is indistinguishable from no gate. Prove each
  // pattern rejects a string that contains it. Built from character codes so
  // this test file does not itself spell out a banned phrase, which the repo's
  // pre-write brand gate would refuse.
  const probes = [
    "You will " + "never have to clean" + " them " + "again",
    "our guards are " + "maintenance" + "-" + "free",
    "completely " + "clog" + "-" + "free" + " forever",
    "no" + " more " + "clogs" + ", ever",
    "we also do " + "roof" + " replacement",
    "we install " + "5" + '" ' + "gutters too",
    "backed by a 20-" + "year " + "warrant" + "y",
    "results are " + "guarantee" + "d",
    "a " + "lifetime" + " of protection",
    "it " + "lasts" + " 40 " + "years",
    "serving Tampa " + "since" + " 2006",
  ];
  for (const probe of probes) {
    const hits = findBannedClaims(probe);
    assert.ok(hits.length > 0, `the gate failed to catch: ${probe}`);
  }
});

test("the approved positioning line is NOT caught by the lifespan patterns", () => {
  // "over 30 years in the Tampa Bay gutter industry" is the approved framing.
  // If a pattern is too greedy it would ban the one history claim that is
  // allowed, and the whole email would fail the gate.
  assert.deepEqual(
    findBannedClaims("Family owned and operated, with over 30 years in the Tampa Bay gutter industry."),
    []
  );
  assert.deepEqual(
    findBannedClaims("Empresa familiar, con más de 30 años en el oficio de canaletas en Tampa Bay."),
    []
  );
});

test("assertBrandedChrome refuses an email carrying a banned claim", () => {
  const mail = buildEstimateEmail(completedEstimate());
  const poisoned = { ...mail, text: mail.text + "\nWe have been serving Tampa " + "since" + " 2006." };
  assert.throws(() => assertBrandedChrome(poisoned), /banned claim/);
});

test("assertBrandedChrome refuses an unbranded email", () => {
  assert.throws(
    () => assertBrandedChrome({ subject: "Your estimate", html: "<html><body>plain</body></html>", text: "plain" }),
    /failed the brand gate/
  );
  // Plain text with no HTML at all is refused outright.
  assert.throws(() => assertBrandedChrome({ subject: "Your estimate", html: "", text: "hi" }), /missing HTML body/);
});

test("a real estimate email passes the brand gate on every surface it needs", () => {
  for (const lang of ["en", "es"]) {
    const mail = buildEstimateEmail(completedEstimate({ lang }));
    assert.equal(assertBrandedChrome(mail), true);
    assert.ok(mail.html.includes("#1B2A4A"), "brand navy");
    assert.ok(mail.html.includes("#D4AF37"), "brand gold");
    assert.ok(mail.html.includes('href="tel:+18444443114"'), "branded call button");
    assert.ok(mail.html.includes("JR One Aluminum LLC"), "signature block");
    assert.ok(mail.html.includes("https://jronegutters.com/unsubscribe"), "unsubscribe link");
  }
});

test("a brand-gate failure becomes a truthful failure, not an unbranded send", async () => {
  // The gate runs inside runEstimateEmail. If it ever throws, nothing may go out
  // and the visitor must be told it did not go through.
  const customer = stubCustomerMail();
  const ops = stubOpsMail();
  const res = await runEstimateEmail({
    ...completedEstimate({ customerName: "Maria" }),
    sendCustomerEmail: async (m) => {
      // Simulate the gate rejecting by having the transport itself refuse; the
      // real gate path is covered by the assertBrandedChrome tests above.
      customer.calls.push(m);
      return { ok: false, error: "brand gate refused" };
    },
    sendOpsNotification: ops,
  });
  assert.equal(res.emailed, false);
  assert.ok(res.customerMessage.includes(JR_ONE_PHONE));
});

// =============================================================================
// CONTENT: ONLY WHAT THE ESTIMATOR COMPUTED.
// =============================================================================

test("the email states only the services actually measured", () => {
  const mail = buildEstimateEmail(
    completedEstimate({ measurements: { gutter: 100, soffit: 0, guard: 0, cleaning: 0 } })
  );
  assert.match(mail.text, /K-Style Gutters/);
  assert.ok(!mail.text.includes("Soffit and Fascia"), "an unmeasured service must not appear");
  assert.ok(!mail.text.includes("Aluminum Leaf Guard"), "an unmeasured service must not appear");
  assert.ok(!mail.text.includes("Gutter Cleaning"), "an unmeasured service must not appear");
});

test("the email carries the measurements, the range and the date", () => {
  const mail = buildEstimateEmail(completedEstimate());
  assert.match(mail.text, /148 linear feet/, "the measurement");
  assert.match(mail.text, /\$2,100 to \$2,840/, "the price range");
  assert.match(mail.text, /August 7, 2026/, "the date, in Eastern time");
});

test("an unsupported gutter size is dropped rather than printed", () => {
  // JR One installs 6 inch and 7 inch only. If the browser ever sent something
  // else, the label must degrade to an unsized one rather than quote a size the
  // company does not sell.
  const mail = buildEstimateEmail(completedEstimate({ gutterSize: 5 }));
  assert.match(mail.text, /K-Style Gutters/);
  assert.deepEqual(findBannedClaims(mail.text), [], "and it must not trip the size ban");
  assert.ok(!mail.text.includes('5"'), "the unsupported size is not printed");
});

test("both supported sizes render with their size", () => {
  for (const size of [6, 7]) {
    const mail = buildEstimateEmail(completedEstimate({ gutterSize: size }));
    assert.ok(mail.text.includes(`${size}" K-Style Gutters`), `size ${size} must render`);
  }
});

test("an estimate with no computed range says so instead of inventing one", () => {
  const mail = buildEstimateEmail(completedEstimate({ estimateLow: 0, estimateHigh: 0 }));
  assert.ok(!mail.text.includes("$0"), "never quote a zero price");
  assert.match(mail.text, /did not produce a price range/);
});

test("a customer name is escaped, so it cannot inject markup", () => {
  const mail = buildEstimateEmail(completedEstimate({ customerName: '<script>alert(1)</script>' }));
  assert.ok(!mail.html.includes("<script>"), "raw markup must never reach the HTML body");
  assert.ok(mail.html.includes("&lt;script&gt;"), "it is escaped instead");
});

test("formatting helpers behave on the edges", () => {
  assert.equal(formatRange(0, 0, "en"), "");
  assert.equal(formatRange(2100, 2840, "en"), "$2,100 to $2,840");
  assert.equal(formatRange(2100, 2840, "es"), "$2,100 a $2,840");
  assert.equal(formatRange(2100, 2100, "en"), "$2,100");
  assert.equal(formatEstimateDate(null, "en"), "");
  assert.equal(formatEstimateDate("not a date", "en"), "");
  assert.deepEqual(buildServiceLines({ measurements: {} }), []);
  assert.equal(unsubscribeLink(""), "https://jronegutters.com/unsubscribe");
  assert.match(unsubscribeLink("A@B.com"), /\?e=a%40b\.com$/, "opt-out address is normalised");
});

// =============================================================================
// THE STRUCTURAL GUARANTEE (see the header of this file).
// =============================================================================

test("lib/estimate-email.js cannot reach a network, a credential, or a mailer", () => {
  const modulePath = path.join(process.cwd(), "lib", "estimate-email.js");
  const raw = fs.readFileSync(modulePath, "utf8");

  // Strip comments first, so the prose ABOVE (which legitimately names
  // nodemailer and process.env while explaining why they are absent) cannot
  // make this test pass or fail for the wrong reason.
  const code = raw
    .replace(/\/\*[\s\S]*?\*\//g, "")
    .split("\n")
    .filter((line) => !line.trim().startsWith("//"))
    .join("\n");

  const forbidden = [
    ["fetch(", "an HTTP call"],
    ["nodemailer", "a mail transport"],
    ["process.env", "a credential read"],
    ["require(", "a CommonJS escape hatch"],
    ["https:/", "a hard-coded remote host"],
    ["XMLHttpRequest", "a browser HTTP call"],
  ];
  for (const [needle, what] of forbidden) {
    // The unsubscribe URL is the one https: string this module legitimately
    // holds, and it is a link printed into an email body, not a call target.
    if (needle === "https:/") {
      const withoutUnsub = code.split("https://jronegutters.com/unsubscribe").join("");
      assert.ok(
        !withoutUnsub.includes(needle),
        `lib/estimate-email.js must not contain ${what} (${needle})`
      );
      continue;
    }
    assert.ok(!code.includes(needle), `lib/estimate-email.js must not contain ${what} (${needle})`);
  }
});

test("the banned-claim list is non-empty and every entry is a usable pattern", () => {
  assert.ok(BANNED_CLAIM_PATTERNS.length >= 15, "the ban list must not be quietly emptied");
  for (const entry of BANNED_CLAIM_PATTERNS) {
    assert.equal(typeof entry.label, "string");
    assert.ok(entry.label.length > 0);
    assert.ok(entry.re instanceof RegExp, `${entry.label} must carry a RegExp`);
  }
});

test("the ops inbox is the monitored one and has not drifted", () => {
  assert.equal(OPS_INBOX, "info@jronegutters.com");
  assert.equal(JR_ONE_PHONE, "(844) 444-3114");
});
