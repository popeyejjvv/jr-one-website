// =============================================================================
// Lead Spam Gate Tests
// =============================================================================
// Tests lib/lead-spam.js, the server-side scorer that decides whether a website
// lead reaches BuilderPrime.
//
// Run with: node --test "tests/*.test.js"
//        or: node --test tests/lead-spam.test.js
//
// NOT `npm test` (package.json has no test script) and NOT `node --test tests/`
// (directory form throws MODULE_NOT_FOUND on Node 25).
//
// ── WHY THIS FILE IS WEIGHTED TOWARD FALSE POSITIVES ─────────────────────────
// JR One leads are the only cashflow in the business. A blocked real customer
// costs more than a hundred junk CRM rows, so the "must pass" block below is
// the load-bearing half of this suite. If a change makes a bot test fail, the
// gate got looser. If a change makes a "must pass" test fail, STOP: the gate is
// eating customers.
//
// ── NO PRODUCTION WRITES ─────────────────────────────────────────────────────
// This suite imports lib/lead-spam.js and nothing else. That module is pure:
// it takes an object, returns {block, reasons}, and performs NO I/O. Guaranteed
// mechanically by the last test in this file, which asserts the module source
// contains no fetch(, no BuilderPrime host, no process.env, and no https URL,
// so it cannot reach BuilderPrime, Vapi, Gmail, or the notification spool even
// by accident. The route files that DO call BuilderPrime are never imported
// here (importing app/api/* pulls next/server and throws anyway).
// =============================================================================

import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { assessLeadSpam, __resetSpamMemoryForTests } from "../lib/lead-spam.js";

// The duplicate-email and repeated-name traps are module-level Maps that live
// for the process lifetime. Without a reset between cases the suite would be
// order-dependent, so every test that touches them clears first.
function fresh() {
  __resetSpamMemoryForTests();
}

// A submission shaped like a real one, so each test varies ONE thing.
function legitLead(over = {}) {
  return {
    name: "Maria Gonzalez",
    email: "maria.gonzalez@gmail.com",
    phone: "(813) 555-0142",
    zip: "33607",
    message: "Need a quote for gutter cleaning on a two story house.",
    form_ms: 42_000,
    ...over,
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// 1. MUST PASS - real customers. Highest-value tests in the file.
// ─────────────────────────────────────────────────────────────────────────────

test("legitimate Tampa Bay submission passes cleanly", () => {
  fresh();
  const r = assessLeadSpam(legitLead());
  assert.equal(r.block, false);
  assert.deepEqual(r.reasons, [], "a clean Tampa lead must raise zero signals");
});

test("legitimate Tampa submission passes with city filled and a local zip", () => {
  fresh();
  // The real payload shape from components/CityLeadForm.jsx, which sends a
  // hardcoded city plus state "FL".
  const r = assessLeadSpam(
    legitLead({ name: "John Smith", zip: "33629", city: "Tampa", state: "FL" })
  );
  assert.equal(r.block, false, `blocked a real Tampa lead: ${r.reasons.join("; ")}`);
});

test("every Tampa Bay area code passes with a local zip", () => {
  // The counties JR One actually serves: Hillsborough, Pinellas, Pasco,
  // Manatee, Sarasota, Polk.
  for (const ac of ["813", "727", "941", "863", "352", "689"]) {
    fresh();
    const r = assessLeadSpam(legitLead({ phone: `(${ac}) 555-0142` }));
    assert.equal(r.block, false, `area code ${ac} blocked: ${r.reasons.join("; ")}`);
  }
});

test("blank city with state FL is NOT a block signal", () => {
  fresh();
  // This is the shape of an ordinary contact-form lead. `city` is not a field
  // on app/contact/page.jsx:148 or app/page.jsx:227, and `state` is hardcoded
  // "FL" everywhere it exists. If a "blank city + populated state" rule were
  // ever added, this test is what would catch it eating every real customer.
  const r = assessLeadSpam(legitLead({ city: "", state: "FL" }));
  assert.equal(r.block, false, `blank city blocked a real lead: ${r.reasons.join("; ")}`);
});

test("a name that trips the mechanical gibberish tests still passes with a real first name", () => {
  // The documented false-positive class: consonant-heavy real surnames.
  for (const name of [
    "Kim Armstrong", "Neil Armstrong", "Jan Ernst",
    "Bob Schmidt", "Krzysztof Strzelecki", "Mary Goldsmith",
  ]) {
    fresh();
    const r = assessLeadSpam(legitLead({ name }));
    assert.equal(r.block, false, `real name "${name}" blocked: ${r.reasons.join("; ")}`);
  }
});

test("commercial submission with a business name passes", () => {
  fresh();
  const r = assessLeadSpam(
    legitLead({ name: "JLL Mgmt Group", email: "ops@jllmgmt.com" })
  );
  assert.equal(r.block, false, `B2B lead blocked: ${r.reasons.join("; ")}`);
});

test("customer whose message is their own callback number passes", () => {
  fresh();
  const r = assessLeadSpam(legitLead({ message: "813-555-0142" }));
  assert.equal(r.block, false, `callback-number message blocked: ${r.reasons.join("; ")}`);
});

test("slow careful form fill passes, and a missing form_ms is neutral", () => {
  fresh();
  assert.equal(assessLeadSpam(legitLead({ form_ms: 600_000 })).block, false);
  fresh();
  // Direct POST or a cached page reports no timer. Absence must not penalize.
  const noTimer = legitLead();
  delete noTimer.form_ms;
  assert.equal(assessLeadSpam(noTimer).block, false);
});

// ─────────────────────────────────────────────────────────────────────────────
// 2. THE SNOWBIRD. Explicitly required: out-of-state phone, Florida property.
//    This exact pattern is already in the CRM as real business.
// ─────────────────────────────────────────────────────────────────────────────

test("snowbird with an out-of-state phone on a Florida property is NOT blocked", () => {
  fresh();
  const r = assessLeadSpam({
    name: "Kim Armstrong",
    email: "kim.armstrong@aol.com",
    phone: "(612) 555-0199",          // Minnesota
    zip: "33606",                      // South Tampa, the property
    message: "I own a rental in South Tampa and need the gutters looked at.",
    form_ms: 55_000,
  });
  assert.equal(r.block, false, `snowbird blocked: ${r.reasons.join("; ")}`);
});

test("out-of-state owner with BOTH an out-of-state phone and mailing zip is NOT blocked", () => {
  fresh();
  // The hardest legitimate case: every geography signal points away from
  // Florida. It must stay ONE medium, because two mediums block.
  const r = assessLeadSpam({
    name: "Robert Miller",
    email: "rmiller@outlook.com",
    phone: "(312) 555-0134",          // Illinois
    zip: "60614",                      // Illinois mailing address
    message: "I own an investment property in Brandon. Need a maintenance quote.",
    form_ms: 70_000,
  });
  assert.equal(r.block, false, `out-of-state owner blocked: ${r.reasons.join("; ")}`);
  assert.ok(
    r.reasons.length <= 1,
    `geography must collapse to at most ONE signal, got: ${r.reasons.join("; ")}`
  );
});

test("several out-of-state snowbirds in a row all pass", () => {
  fresh();
  // No shared-state trap may accumulate across unrelated legitimate leads.
  const people = [
    { name: "Susan Clark", phone: "(216) 555-0111", email: "sclark@aol.com" },
    { name: "David Nolan", phone: "(614) 555-0122", email: "dnolan@yahoo.com" },
    { name: "Nancy Reed",  phone: "(517) 555-0133", email: "nreed@comcast.net" },
  ];
  for (const p of people) {
    const r = assessLeadSpam(legitLead({ ...p, zip: "33607" }));
    assert.equal(r.block, false, `${p.name} blocked: ${r.reasons.join("; ")}`);
  }
});

// ─────────────────────────────────────────────────────────────────────────────
// 3. THE 12 KNOWN BOT SHAPES.
//    Sourced from the incident record: lib/lead-spam.js header, and the
//    2026-07-30 entry in EAPOPEYE decisions/log.md. Gibberish names, scraped
//    third-party emails, dot-trick gmails, out-of-state phones and zips.
//    Every one of these must block.
// ─────────────────────────────────────────────────────────────────────────────

const BOT_SHAPES = [
  { label: "01 gibberish name + TX zip + dot-trick gmail + fast fill",
    lead: { name: "Xmhwd lubgdbbvg", email: "w.u.d.ab.ugog.i0.7@gmail.com",
            phone: "(214) 555-0100", zip: "75001", state: "FL", form_ms: 800 } },
  { label: "02 gibberish name + MO zip + scraped corporate email",
    lead: { name: "Hghwut Mfhmffk", email: "jsmith@verisk.com",
            phone: "(816) 555-0111", zip: "63101", state: "FL", form_ms: 900 } },
  { label: "03 gibberish name + scraped domain + out-of-state",
    lead: { name: "Bmieoqku Exjyltrk", email: "contact@spacetech-i.com",
            phone: "(303) 555-0122", zip: "80202", state: "FL", form_ms: 1500 } },
  { label: "04 fully gibberish name alone (strong)",
    lead: { name: "Qrtzmn Vbxxcvv", email: "someone@yahoo.com",
            phone: "(813) 555-0143", zip: "33607", form_ms: 40_000 } },
  { label: "05 honeypot field filled",
    lead: { name: "John Smith", email: "john@example.com", phone: "(813) 555-0144",
            zip: "33607", company: "Acme Corp", form_ms: 40_000 } },
  { label: "06 sub-second machine fill",
    lead: { name: "John Smith", email: "john2@example.com", phone: "(813) 555-0145",
            zip: "33607", form_ms: 300 } },
  { label: "07 dot-trick gmail + non-FL geography",
    lead: { name: "Alan Prescott", email: "a.l.a.n.p.r.e.s@gmail.com",
            phone: "(212) 555-0166", zip: "10001", state: "FL", form_ms: 40_000 } },
  { label: "08 digits-only message + out-of-state geography",
    lead: { name: "Paul Hardy", email: "paulhardy@aol.com", phone: "(702) 555-0177",
            zip: "89101", state: "FL", message: "8005551212", form_ms: 40_000 } },
  { label: "09 partly gibberish name + fast fill",
    lead: { name: "Zzxkq Anderson", email: "z@yahoo.com", phone: "(813) 555-0188",
            zip: "33607", form_ms: 1800 } },
  { label: "10 absurd field length + non-FL geography",
    lead: { name: "K".repeat(140), email: "k@yahoo.com", phone: "(415) 555-0199",
            zip: "94102", state: "FL", form_ms: 40_000 } },
  { label: "11 impossible area code (undialable)",
    lead: { name: "Greg Palmer", email: "greg@example.com", phone: "(183) 555-0100",
            zip: "33607", form_ms: 40_000 } },
  { label: "12 N11 reserved service code as area code",
    lead: { name: "Greg Palmer", email: "greg2@example.com", phone: "(411) 555-0100",
            zip: "33607", form_ms: 40_000 } },
];

for (const { label, lead } of BOT_SHAPES) {
  test(`bot shape ${label} is blocked`, () => {
    fresh();
    const r = assessLeadSpam(lead);
    assert.equal(r.block, true, `bot shape "${label}" was NOT blocked`);
    assert.ok(r.reasons.length > 0, "a block must always carry a reason for the digest");
  });
}

test("all 12 known bot shapes block, none silently", () => {
  let blocked = 0;
  for (const { lead } of BOT_SHAPES) {
    fresh();
    const r = assessLeadSpam(lead);
    if (r.block && r.reasons.length > 0) blocked++;
  }
  assert.equal(blocked, 12, "all 12 recorded bot shapes must block with a reason");
});

// ─────────────────────────────────────────────────────────────────────────────
// 4. HONEYPOT. Fails closed when filled, never fires when empty.
// ─────────────────────────────────────────────────────────────────────────────

test("honeypot blocks any filled hidden field, on its own", () => {
  for (const v of ["x", "Acme Corp", "   text   ", "https://spam.example"]) {
    fresh();
    const r = assessLeadSpam(legitLead({ company: v }));
    assert.equal(r.block, true, `honeypot value ${JSON.stringify(v)} did not block`);
    assert.ok(r.reasons.includes("honeypot field filled"));
  }
});

test("honeypot NEVER blocks when empty, absent, or whitespace", () => {
  // Whitespace matters: a browser or proxy that injects a space into the hidden
  // input would otherwise block every real customer on the site at once.
  for (const v of ["", "   ", "\t", "\n", undefined, null]) {
    fresh();
    const r = assessLeadSpam(legitLead({ company: v }));
    assert.equal(r.block, false,
      `empty honeypot ${JSON.stringify(v)} blocked a real lead: ${r.reasons.join("; ")}`);
    assert.ok(!r.reasons.includes("honeypot field filled"));
  }
});

// ─────────────────────────────────────────────────────────────────────────────
// 5. REPEAT SUBMISSIONS. A person correcting a typo must get through; an
//    automated repeat must not.
// ─────────────────────────────────────────────────────────────────────────────

test("a real person who submits twice after a correction is NOT blocked", () => {
  fresh();
  const first = assessLeadSpam(legitLead({ name: "James Carter", phone: "(813) 555-0101" }));
  assert.equal(first.block, false, `first submission blocked: ${first.reasons.join("; ")}`);

  // Same person, same name, fixes a typo'd phone number and resubmits.
  const second = assessLeadSpam(legitLead({ name: "James Carter", phone: "(813) 555-0102" }));
  assert.equal(second.block, false,
    `the correction resubmit was blocked: ${second.reasons.join("; ")}`);
});

test("identical resubmission (same name, same phone) is never blocked", () => {
  fresh();
  for (let i = 0; i < 4; i++) {
    const r = assessLeadSpam(legitLead({ name: "James Carter", phone: "(813) 555-0101" }));
    assert.equal(r.block, false, `resubmit #${i + 1} blocked: ${r.reasons.join("; ")}`);
  }
});

test("same name across 3+ DIFFERENT phone numbers is blocked as automated repetition", () => {
  fresh();
  assert.equal(assessLeadSpam(legitLead({ name: "Alan Brooks", phone: "(813) 555-0201" })).block, false);
  assert.equal(assessLeadSpam(legitLead({ name: "Alan Brooks", phone: "(813) 555-0202" })).block, false);
  const third = assessLeadSpam(legitLead({ name: "Alan Brooks", phone: "(813) 555-0203" }));
  assert.equal(third.block, true, "3rd distinct phone under one identical name should block");
  assert.ok(third.reasons.some((x) => x.includes("reused across")));
});

test("a spouse reusing the household email under a related name is NOT blocked", () => {
  fresh();
  assert.equal(assessLeadSpam(legitLead({ name: "John Smith", email: "smiths@gmail.com" })).block, false);
  const spouse = assessLeadSpam(
    legitLead({ name: "Mary Smith", email: "smiths@gmail.com", phone: "(813) 555-0150" })
  );
  assert.equal(spouse.block, false, `household email reuse blocked: ${spouse.reasons.join("; ")}`);
});

test("one email reused under a completely unrelated name is a signal", () => {
  fresh();
  assessLeadSpam(legitLead({ name: "John Smith", email: "shared@gmail.com" }));
  const r = assessLeadSpam(
    legitLead({ name: "Bmieoqku Exjyltrk", email: "shared@gmail.com", phone: "(214) 555-0161", zip: "75001" })
  );
  assert.equal(r.block, true, "scraped-email reuse under a disjoint gibberish name should block");
});

// ─────────────────────────────────────────────────────────────────────────────
// 6. UNDIALABLE PHONES vs REAL ONES.
// ─────────────────────────────────────────────────────────────────────────────

test("undialable phone numbers are blocked", () => {
  for (const phone of [
    "(183) 555-0100",   // area code starts with 1
    "(083) 555-0100",   // area code starts with 0
    "(411) 555-0100",   // N11 service code
    "(911) 555-0100",   // N11 service code
    "(813) 155-0100",   // exchange starts with 1
    "(813) 055-0100",   // exchange starts with 0
  ]) {
    fresh();
    const r = assessLeadSpam(legitLead({ phone }));
    assert.equal(r.block, true, `undialable ${phone} was not blocked`);
  }
});

test("real dialable numbers in every accepted format pass", () => {
  for (const phone of [
    "8135550142", "813-555-0142", "(813) 555-0142",
    "+1 813 555 0142", "1-813-555-0142", "813.555.0142",
  ]) {
    fresh();
    const r = assessLeadSpam(legitLead({ phone }));
    assert.equal(r.block, false, `real phone ${phone} blocked: ${r.reasons.join("; ")}`);
  }
});

test("a partial or missing phone is not treated as undialable", () => {
  // Length problems are the route's required-field job, not a spam signal.
  for (const phone of ["", undefined, "813", "555-0142"]) {
    fresh();
    const r = assessLeadSpam(legitLead({ phone }));
    assert.equal(r.block, false,
      `partial phone ${JSON.stringify(phone)} blocked: ${r.reasons.join("; ")}`);
  }
});

// ─────────────────────────────────────────────────────────────────────────────
// 7. ZIP / STATE CONSISTENCY.
// ─────────────────────────────────────────────────────────────────────────────

test("a non-Florida zip names the state it actually belongs to", () => {
  fresh();
  const r = assessLeadSpam(legitLead({ zip: "75001", state: "FL", phone: "(813) 555-0142" }));
  const joined = r.reasons.join(" ");
  assert.ok(joined.includes("75001"), "the reason must carry the zip");
  assert.ok(joined.includes("Texas"), `the reason must name the state, got: ${joined}`);
  // One geography signal alone must never block - that is the snowbird rule.
  assert.equal(r.block, false);
});

test("Florida zips across the service area are never a geography signal", () => {
  for (const zip of ["33607", "33701", "34236", "33810", "34655", "33511"]) {
    fresh();
    const r = assessLeadSpam(legitLead({ zip }));
    assert.equal(r.block, false, `FL zip ${zip} blocked: ${r.reasons.join("; ")}`);
    assert.deepEqual(r.reasons, [], `FL zip ${zip} should raise no signal`);
  }
});

test("a malformed zip is neutral, not a block", () => {
  for (const zip of ["", "3360", "ABCDE", undefined, "33607-1234"]) {
    fresh();
    const r = assessLeadSpam(legitLead({ zip }));
    assert.equal(r.block, false,
      `malformed zip ${JSON.stringify(zip)} blocked: ${r.reasons.join("; ")}`);
  }
});

// ─────────────────────────────────────────────────────────────────────────────
// 8. STRUCTURAL GUARANTEES.
// ─────────────────────────────────────────────────────────────────────────────

test("a blocked lead ALWAYS carries at least one reason so it stays recoverable", () => {
  // The route writes reasons into the operator digest. A block with no reason
  // would be an unrecoverable silent discard.
  for (const { lead } of BOT_SHAPES) {
    fresh();
    const r = assessLeadSpam(lead);
    assert.ok(r.reasons.length > 0, "blocked lead with no reason is unrecoverable");
  }
});

test("an entirely empty submission does not block", () => {
  fresh();
  // The route rejects missing name/phone with a 400 before scoring. The scorer
  // must not independently decide emptiness is spam.
  const r = assessLeadSpam({});
  assert.equal(r.block, false, `empty payload blocked: ${r.reasons.join("; ")}`);
});

test("one medium signal never blocks, two mediums do", () => {
  fresh();
  const oneMedium = assessLeadSpam(legitLead({ zip: "75001", phone: "(813) 555-0142" }));
  assert.equal(oneMedium.block, false, "a single medium signal must not block");

  fresh();
  const twoMediums = assessLeadSpam(
    legitLead({ zip: "75001", phone: "(214) 555-0142", email: "a.b.c.d.e.f@gmail.com" })
  );
  assert.equal(twoMediums.block, true, "two independent mediums must block");
});

test("the scorer performs no I/O and cannot reach BuilderPrime", () => {
  // Mechanical proof, not a promise: the module cannot write to production
  // because its CODE contains no network primitive and no credential read.
  //
  // Comments are stripped first, deliberately. The file's header prose
  // discusses BuilderPrime at length, and matching that would be a check that
  // fails for the wrong reason - the mirror image of a check that passes for
  // the wrong reason. What matters is that no executable statement can do I/O.
  const raw = fs.readFileSync(
    path.join(process.cwd(), "lib", "lead-spam.js"),
    "utf8"
  );
  const code = raw
    .replace(/\/\*[\s\S]*?\*\//g, " ")   // block comments
    .replace(/(^|[^:])\/\/.*$/gm, "$1"); // line comments, keeping "https://" safe

  for (const forbidden of [
    "fetch(", "builderprime", "process.env", "https:/",
    "XMLHttpRequest", "child_process", "require(",
    "import(", "readFile", "writeFile", "appendFile",
  ]) {
    assert.ok(
      !code.toLowerCase().includes(forbidden.toLowerCase()),
      `lib/lead-spam.js CODE must not contain ${forbidden} - it would make this suite capable of production writes`
    );
  }

  // And prove the stripper actually stripped something, so this test cannot
  // silently degrade into a no-op if the file is ever reformatted.
  assert.ok(code.length < raw.length, "comment stripping must have removed something");
  assert.ok(code.includes("export function assessLeadSpam"), "the real code must survive stripping");
});
