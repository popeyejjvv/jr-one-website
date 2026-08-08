// =============================================================================
// Estimator lead payload tests
// =============================================================================
// These IMPORT lib/estimator-lead.js, the same module app/api/estimator-lead/
// route.js imports. The older tests/estimator-utils.test.js pastes copies of
// the helpers into the test file, so it passes even when the route changes.
// This file cannot.
//
// HOW REAL BUILDERPRIME IS KEPT OUT
// Structurally, not by discipline. Nothing in this file performs a network
// call and nothing here can: lib/estimator-lead.js contains no fetch, no
// import beyond itself, and no environment read, so importing it cannot reach
// BuilderPrime even if a test tried. The two route files are NOT imported
// (see below), so their fetch calls never execute either. There is also an
// explicit guard test asserting the library source is network-free.
//
// WHY THE ROUTE FILES ARE NOT IMPORTED
// `node --test` cannot resolve `next/server`, which both routes import, so
// importing them throws ERR_MODULE_NOT_FOUND before any test body runs. That
// is exactly why the pre-existing tests/estimator-utils.test.js pastes copies
// of the helpers into itself. Pasted copies keep passing after the route
// changes, so this file does the opposite: every decision the route makes is
// implemented in lib/estimator-lead.js and imported here, and the tests at the
// bottom read the route SOURCE to prove the route actually delegates to that
// library rather than keeping its own copy.
//
// Run with: node --test "tests/*.test.js"
// =============================================================================

import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

import {
  ALLOWED_EVENTS,
  ANON_FIRST_NAME,
  LEGACY_PLACEHOLDER_NAME,
  TEST_FIRST_NAME,
  buildBpPayload,
  buildJobSummary,
  buildLeadName,
  formatRange,
  inferProjectType,
  isInternalTestSubmission,
  normalizePhone,
  planBpWrite,
  sanitizeEventParams,
  splitName,
} from "../lib/estimator-lead.js";

const ROUTE_URL = new URL("../app/api/estimator-lead/route.js", import.meta.url);
const EVENTS_ROUTE_URL = new URL("../app/api/estimator-events/route.js", import.meta.url);
const HTML_URL = new URL("../public/estimator.html", import.meta.url);
const LIB_URL = new URL("../lib/estimator-lead.js", import.meta.url);

// A visitor who drew a real job, typed a phone, and then closed the tab.
// This is the exact shape public/estimator.html sendToJROne() posts.
const ABANDONED = {
  type: "lead",
  phone: "(423) 715-4242",
  address: "11397, 122nd Avenue North, Largo, Pinellas County, Florida, 33778, United States",
  addressCity: "Largo",
  addressState: "FL",
  addressZip: "33778",
  stories: 1,
  gutterSize: 6,
  lang: "en",
  measurements: { gutter: 148, soffit: 60, fascia: 0, guard: 0, cleaning: 0 },
  downspouts: { count: 5, totalFt: 65, ftEach: 13 },
  estimateLow: 2100,
  estimateHigh: 2800,
  discountCode: "JR1-AE-XK4P2",
  expDate: "September 6, 2026",
  timestamp: "2026-08-07T15:19:59.000Z",
};

// ---------------------------------------------------------------------------
// The core requirement: abandoning after the phone still leaves a useful lead.
// ---------------------------------------------------------------------------

test("abandoned visitor still produces a record carrying service, price and location", () => {
  const p = buildBpPayload(ABANDONED);

  // Service type, in a field VERIFIED to read back from GET /api/clients.
  assert.equal(p.projectTypeDescription, "Gutter Installation");

  // Location, in fields VERIFIED to read back.
  assert.equal(p.city, "Largo");
  assert.equal(p.zip, "33778");
  assert.equal(p.state, "FL");
  assert.match(p.addressLine1, /122nd Avenue North/);

  // Price. estimatedValue is NOT a confirmed-writable field (0 of 334 records
  // carry one), so the range is ALSO encoded into lastName, which is
  // confirmed readable. Assert the readable copy, not just the hopeful one.
  assert.equal(p.estimatedValue, 2450);
  assert.match(p.userAccount.lastName, /\$2,100-\$2,800/);
  assert.match(p.userAccount.lastName, /Largo/);

  assert.equal(p.phoneNumber, "+14237154242");
  assert.equal(p.leadSourceDescription, "Form Inquiry");
});

test("measurements survive into the note, which is the only place they fit", () => {
  const note = buildJobSummary(ABANDONED);
  assert.match(note, /gutter=148ft/);
  assert.match(note, /soffit=60ft/);
  assert.match(note, /Downspouts: 65ft total/);
  assert.match(note, /Estimate range: \$2,100 - \$2,800/);
  assert.match(note, /Gutter size: 6"/);
});

test("a job with no price still yields a usable name rather than an empty one", () => {
  const p = buildBpPayload({ ...ABANDONED, estimateLow: 0, estimateHigh: 0 });
  assert.equal(p.userAccount.firstName, ANON_FIRST_NAME);
  assert.equal(p.userAccount.lastName, "Largo 33778");
  assert.ok(!("estimatedValue" in p), "no bogus zero value should be sent");
});

test("a visitor with no address at all still gets a non-empty last name", () => {
  // 813-215-8554: a real Tampa number shape, deliberately NOT one that trips
  // the internal-test detector (no 555 exchange, area code != exchange).
  const p = buildBpPayload({ phone: "8132158554" });
  assert.equal(p.userAccount.firstName, ANON_FIRST_NAME);
  assert.ok(p.userAccount.lastName.length > 0, "BuilderPrime requires a lastName");
});

// ---------------------------------------------------------------------------
// The placeholder is gone for good.
// ---------------------------------------------------------------------------

test("the literal placeholder name is never written, on any input shape", () => {
  const shapes = [
    ABANDONED,
    {},
    { phone: "8137154242" },
    { ...ABANDONED, customerName: "" },
    { ...ABANDONED, customerName: "   " },
    { ...ABANDONED, addressCity: "", addressZip: "" },
    { ...ABANDONED, estimateLow: null, estimateHigh: null },
  ];
  for (const s of shapes) {
    const p = buildBpPayload(s);
    const full = `${p.userAccount.firstName} ${p.userAccount.lastName}`;
    assert.notEqual(full, LEGACY_PLACEHOLDER_NAME, `leaked on ${JSON.stringify(s).slice(0, 60)}`);
    assert.ok(
      !/^Estimator\b/.test(p.userAccount.firstName),
      `firstName still starts with the old placeholder: ${p.userAccount.firstName}`
    );
  }
});

test("a supplied real name always wins over the anonymous label", () => {
  const p = buildBpPayload({ ...ABANDONED, customerName: "Vanessa Uselman" });
  assert.equal(p.userAccount.firstName, "Vanessa");
  assert.equal(p.userAccount.lastName, "Uselman");
});

test("a single-word real name does not become the placeholder", () => {
  assert.deepEqual(splitName("Tyson"), {
    firstName: "Tyson",
    lastName: "(no last name provided)",
  });
  assert.equal(splitName(""), null);
  assert.equal(splitName("   "), null);
});

// ---------------------------------------------------------------------------
// Internal test submissions stay distinguishable from real ones.
// ---------------------------------------------------------------------------

test("internal test submissions are labelled differently from real estimates", () => {
  // Every pattern below matched a record already sitting in BuilderPrime.
  const testers = [
    { phone: "+18135550100" },        // 6097291, reserved 555 exchange
    { phone: "+11234567890" },        // 5467104, sequential dialpad
    { phone: "+18188182145" },        // 5420529, area code repeated as exchange
    { phone: "+18138137777" },        // 5424875, same pattern
    { phone: "+18137154242", customerEmail: "chris@jronegutters.com" },
    { phone: "+18137154242", address: "TEST - estimator email verification" },
  ];
  for (const t of testers) {
    assert.equal(isInternalTestSubmission(t), true, `missed: ${JSON.stringify(t)}`);
    const p = buildBpPayload({ ...ABANDONED, ...t });
    assert.equal(p.userAccount.firstName, TEST_FIRST_NAME);
  }
});

test("real out-of-area customers are NOT mislabelled as internal tests", () => {
  // 6168102 is a Tennessee number on a real Largo property. 5651222 is a
  // North Carolina number on a real Temple Terrace property whose owner is a
  // confirmed customer. Neither may be called a test.
  assert.equal(isInternalTestSubmission({ phone: "+14237154242" }), false);
  assert.equal(isInternalTestSubmission({ phone: "+19197403934" }), false);
  assert.equal(isInternalTestSubmission({ phone: "+18132158554" }), false);
  assert.equal(buildLeadName(ABANDONED).firstName, ANON_FIRST_NAME);
});

// ---------------------------------------------------------------------------
// Project type must be a value BuilderPrime actually has configured.
// ---------------------------------------------------------------------------

test("inferred project types are all values that exist in the account", () => {
  // Verified against GET /api/clients on 2026-08-07: these four strings all
  // appear as existing projectTypeDescription values.
  const CONFIGURED = new Set([
    "Gutters",
    "Gutter Installation",
    "Soffit and Fascia",
    "Gutter Guards",
  ]);
  const cases = [
    undefined,
    {},
    { gutter: 100 },
    { gutter: 100, guard: 50 },
    { gutter: 100, soffit: 40, guard: 20 },
    { soffit: 40 },
    { fascia: 40 },
    { guard: 20 },
  ];
  for (const m of cases) {
    assert.ok(CONFIGURED.has(inferProjectType(m)), `unconfigured type from ${JSON.stringify(m)}`);
  }
});

test("phone normalization handles the shapes the estimator actually sends", () => {
  assert.equal(normalizePhone("(423) 715-4242"), "+14237154242");
  assert.equal(normalizePhone("14237154242"), "+14237154242");
  assert.equal(normalizePhone("+14237154242"), "+14237154242");
  assert.equal(normalizePhone(""), "");
});

test("price range formatting is readable and skips empty values", () => {
  assert.equal(formatRange(2100, 2800), "$2,100-$2,800");
  assert.equal(formatRange(0, 0), "");
  assert.equal(formatRange(null, undefined), "");
});

// ---------------------------------------------------------------------------
// Analytics payloads must not carry personal data into a log line.
// ---------------------------------------------------------------------------

test("event params drop anything resembling personal data", () => {
  const cleaned = sanitizeEventParams({
    gutter_ft: 148,
    stories: 1,
    phone: "+14237154242",
    customerEmail: "someone@example.com",
    customer_name: "Real Person",
    addressZip: "33778",
    nested: { a: 1 },
  });
  assert.deepEqual(cleaned, { gutter_ft: "148", stories: "1" });
});

// ---------------------------------------------------------------------------
// No duplicate record on the second submit. Drives the real route branch.
// ---------------------------------------------------------------------------

test("second submit with a name attaches to the SAME record, never creates one", () => {
  const plan = planBpWrite({ bpOpportunityId: "6168102", hasApiKey: true });
  assert.equal(plan.action, "attach");
  assert.equal(plan.opportunityId, "6168102");
  assert.notEqual(plan.action, "create", "a second create is the duplicate bug");
});

test("first submit with no opportunity id creates exactly one record", () => {
  assert.equal(planBpWrite({ hasApiKey: true }).action, "create");
  assert.equal(planBpWrite({ bpOpportunityId: null, hasApiKey: true }).action, "create");
  assert.equal(planBpWrite({ bpOpportunityId: "", hasApiKey: true }).action, "create");
  assert.equal(planBpWrite({ bpOpportunityId: "   ", hasApiKey: true }).action, "create");
});

test("no BuilderPrime key means no write attempt at all", () => {
  assert.equal(planBpWrite({ hasApiKey: false }).action, "skip");
  assert.equal(planBpWrite({ bpOpportunityId: "6168102", hasApiKey: false }).action, "skip");
});

test("the follow-up note carries the name the visitor supplied", () => {
  const note = buildJobSummary({
    ...ABANDONED,
    type: "customer",
    customerName: "Vanessa Uselman",
    customerEmail: "vanessauselman@yahoo.com",
  });
  assert.match(note, /Name given: Vanessa Uselman/);
  assert.match(note, /Email given: vanessauselman@yahoo\.com/);
});

// ---------------------------------------------------------------------------
// Source guards. These are what stop the library from drifting away from the
// route, which is the failure mode of the copy-paste test file next door.
// ---------------------------------------------------------------------------

test("the route delegates to the shared library instead of keeping its own copy", async () => {
  const src = await readFile(ROUTE_URL, "utf8");

  for (const fn of ["planBpWrite", "buildBpPayload", "buildJobSummary"]) {
    assert.ok(
      new RegExp(`\\b${fn}\\b`).test(src),
      `route no longer uses ${fn}; the tests would stop covering it`
    );
  }
  // No local redefinition of the helpers that moved to the library.
  for (const fn of ["splitName", "normalizePhone", "inferProjectType"]) {
    assert.ok(
      !new RegExp(`function\\s+${fn}\\s*\\(`).test(src),
      `route re-declared ${fn}; it must import the shared one`
    );
  }
  // The old placeholder must not survive anywhere in the route.
  assert.ok(
    !src.includes(`"${LEGACY_PLACEHOLDER_NAME}"`),
    "route still writes the literal placeholder name"
  );
});

test("the route creates a client in exactly one place, behind the create branch", async () => {
  const src = await readFile(ROUTE_URL, "utf8");
  const creates = src.match(/fetch\(\s*`\$\{BP_BASE_URL\}\/clients`/g) || [];
  assert.equal(
    creates.length,
    1,
    `found ${creates.length} POST /clients call sites; a second one is a duplicate bug`
  );
  assert.ok(
    /writePlan\.action === "create"/.test(src),
    "the create call is not guarded by the shared decision"
  );
  assert.ok(
    /writePlan\.action === "attach"/.test(src),
    "the attach branch is missing; the second submit would duplicate"
  );
});

test("the library cannot reach the network, so no test can touch real BuilderPrime", async () => {
  const src = await readFile(LIB_URL, "utf8");
  const code = src.replace(/\/\/[^\n]*/g, "").replace(/\/\*[\s\S]*?\*\//g, "");
  for (const bad of ["fetch(", "XMLHttpRequest", "require(", "process.env"]) {
    assert.ok(!code.includes(bad), `lib/estimator-lead.js contains ${bad}`);
  }
});

test("the events endpoint shares one allow-list with the page and the tests", async () => {
  const routeSrc = await readFile(EVENTS_ROUTE_URL, "utf8");
  assert.ok(
    /ALLOWED_EVENTS/.test(routeSrc) && /@\/lib\/estimator-lead/.test(routeSrc),
    "events route must import the shared allow-list, not redeclare it"
  );
  assert.ok(ALLOWED_EVENTS.has("estimator_record_created"));
});

// ---------------------------------------------------------------------------
// The funnel events exist in the page and are on the endpoint's allow-list.
// ---------------------------------------------------------------------------

test("every funnel step fires an event, and the endpoint accepts every one", async () => {
  const html = await readFile(HTML_URL, "utf8");

  // One event per step the brief asked for.
  const REQUIRED = [
    "estimator_view",             // started
    "estimator_measure_start",    // measurements entered
    "estimator_price_shown",      // price shown
    "estimator_phone_entered",    // phone entered
    "estimator_record_created",   // record created
    "estimator_name_given",       // name given
  ];
  for (const ev of REQUIRED) {
    assert.ok(html.includes(`'${ev}'`), `estimator.html never fires ${ev}`);
    assert.ok(ALLOWED_EVENTS.has(ev), `endpoint would reject ${ev} with a 400`);
  }
});

test("tracking is no longer a dead dataLayer push", async () => {
  const html = await readFile(HTML_URL, "utf8");
  // The original bug: only dataLayer.push, with gtag.js loaded and no GTM
  // container to consume it, so every event went nowhere.
  assert.ok(html.includes("gtag('event'"), "no real GA4 event call in the page");
  assert.ok(
    html.includes("/api/estimator-events"),
    "no server-side beacon; the denominator would still not exist"
  );
  assert.ok(!html.includes("GTM-"), "a GTM container appeared; revisit trackEvent");
});

test("the page hands the opportunity id back so the second call cannot duplicate", async () => {
  const html = await readFile(HTML_URL, "utf8");
  assert.ok(/bpOpportunityId\s*=\s*data\.bp_opportunity_id/.test(html),
    "page never stores the id returned by the first call");
  assert.ok(/bpOpportunityId:bpOpportunityId/.test(html),
    "page never sends the id back on the second call");
});
