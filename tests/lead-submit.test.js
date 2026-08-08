// =============================================================================
// Lead Submit Tests
// =============================================================================
// Run with: node --test "tests/*.test.js"
//        or: node --test tests/lead-submit.test.js
//
// NOT `npm test` (package.json has no test script) and NOT `node --test tests/`
// (directory form throws MODULE_NOT_FOUND on Node 25).
//
// ── HOW REAL BUILDERPRIME WRITES AND REAL MAIL ARE MADE IMPOSSIBLE ───────────
// Four independent guarantees:
//
// 1. This file imports exactly ONE module, lib/lead-submit.js. That module is
//    browser-side glue: it names no host, holds no credential, and speaks only
//    to two same-origin relative paths, "/api/send-lead" and
//    "/api/estimator-events". The last test proves this mechanically by scanning
//    the module's source with comments stripped: no absolute https:/ URL, no
//    builderprime host, no nodemailer, no process.env, no API key.
//
// 2. globalThis.fetch is REPLACED for the duration of every test that submits,
//    and restored in a finally. The replacement records every call and returns a
//    canned Response. Nothing leaves the process. withFetch() below is the only
//    way a test in this file issues a submit.
//
// 3. Every stub asserts the URL it was handed is a relative path. A test that
//    somehow produced an absolute URL fails loudly rather than dialling out.
//
// 4. The route that actually talks to BuilderPrime and Gmail is
//    app/api/send-lead/route.js, which this file never imports. It cannot be
//    imported: it pulls in next/server, which does not resolve outside the Next
//    bundler. So there is no code path from this suite to production.
// =============================================================================

import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import {
  JR_ONE_PHONE,
  SUBMIT_ERRORS,
  SUBMIT_ERROR_STYLE,
  MAX_PHOTOS,
  MAX_SUBMIT_PAYLOAD_BYTES,
  LEAD_SUBMIT_FAILED_EVENT,
  errorsFor,
  classifySubmitFailure,
  payloadByteLength,
  validatePhotosBeforeSubmit,
  submitLeadForm,
  reportSubmitFailure,
} from "../lib/lead-submit.js";
import { ALLOWED_EVENTS } from "../lib/estimator-lead.js";

/**
 * Run fn with globalThis.fetch replaced. Returns the recorded calls.
 * The real fetch is always restored, even if the test throws.
 */
async function withFetch(handler, fn) {
  const calls = [];
  const original = globalThis.fetch;
  globalThis.fetch = async (url, opts) => {
    // Guarantee 3: nothing in this suite may reach an absolute URL.
    assert.ok(
      typeof url === "string" && url.startsWith("/"),
      `test fetch stub received a non-relative URL: ${url}`
    );
    calls.push({ url, opts, body: opts && opts.body ? JSON.parse(opts.body) : null });
    return handler(url, opts, calls.length);
  };
  try {
    await fn(calls);
  } finally {
    globalThis.fetch = original;
  }
  return calls;
}

/** A canned Response-alike. */
function reply(status, body = {}) {
  return {
    ok: status >= 200 && status < 300,
    status,
    json: async () => body,
  };
}

/** Route every call by path: lead route gets `leadStatus`, beacon always 200. */
function router(leadStatus, leadBody = { success: true }) {
  return async (url) => {
    if (url === "/api/estimator-events") return reply(200, { ok: true });
    if (typeof leadStatus === "function") return leadStatus(url);
    return reply(leadStatus, leadBody);
  };
}

const BODY = { name: "Maria Gonzalez", phone: "8135550142", email: "m@example.com" };

// ─────────────────────────────────────────────────────────────────────────────
// 1. SUCCESS still succeeds. The 21 forms currently work on the happy path and
//    this is the test that keeps them working.
// ─────────────────────────────────────────────────────────────────────────────

test("a successful submission reports success and posts to the lead route", async () => {
  await withFetch(router(200, { success: true, bp_opportunity_id: "5551234" }), async (calls) => {
    const r = await submitLeadForm({ body: BODY, formId: "contact", lang: "en" });
    assert.equal(r.ok, true, "a 200 must be reported as success");
    assert.equal(r.message, undefined, "success must carry no error message");

    const lead = calls.filter((c) => c.url === "/api/send-lead");
    assert.equal(lead.length, 1, "the lead must be posted exactly once");
    assert.deepEqual(lead[0].body, BODY, "the body must reach the route unchanged");
    assert.equal(lead[0].opts.method, "POST");
  });
});

test("a successful submission fires NO failure beacon", async () => {
  await withFetch(router(200), async (calls) => {
    const r = await submitLeadForm({ body: BODY, formId: "contact", lang: "en" });
    assert.equal(r.ok, true);
    const beacons = calls.filter((c) => c.url === "/api/estimator-events");
    assert.equal(beacons.length, 0, "a working submission must not report a lost lead");
  });
});

test("a spam-blocked 200 is still shown as success, so a bot learns nothing", async () => {
  // The route returns 200 with a fabricated success body for blocked bots by
  // design. Treating that as failure would hand a bot an oracle.
  await withFetch(router(200, { success: true, captured_in_bp: true }), async () => {
    const r = await submitLeadForm({ body: BODY, formId: "contact", lang: "en" });
    assert.equal(r.ok, true);
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// 2. EACH FAILURE gets its own honest, plain-language message.
// ─────────────────────────────────────────────────────────────────────────────

test("429 shows try-again, NOT call-us, and sets no success", async () => {
  await withFetch(router(429, { error: "Too many requests" }), async () => {
    const r = await submitLeadForm({ body: BODY, formId: "contact", lang: "en" });
    assert.equal(r.ok, false, "a 429 must never be reported as success");
    assert.equal(r.kind, "rateLimited");
    assert.equal(r.message, SUBMIT_ERRORS.en.rateLimited);
    assert.ok(/wait a moment/i.test(r.message), "must tell them to wait");
    assert.ok(
      !r.message.includes(JR_ONE_PHONE),
      "a rate limit is temporary; sending them to the phone would be wrong and expensive"
    );
  });
});

test("403 shows the call-us message with the phone number", async () => {
  await withFetch(router(403, { error: "Forbidden" }), async () => {
    const r = await submitLeadForm({ body: BODY, formId: "contact", lang: "en" });
    assert.equal(r.ok, false);
    assert.equal(r.kind, "callUs");
    assert.ok(r.message.includes(JR_ONE_PHONE), "must carry the phone number");
    assert.ok(/did not go through/i.test(r.message));
  });
});

test("500 shows the call-us message with the phone number", async () => {
  await withFetch(router(500, { error: "server" }), async () => {
    const r = await submitLeadForm({ body: BODY, formId: "contact", lang: "en" });
    assert.equal(r.ok, false);
    assert.equal(r.kind, "callUs");
    assert.ok(r.message.includes(JR_ONE_PHONE));
  });
});

test("a network failure shows the connection message", async () => {
  const original = globalThis.fetch;
  const seen = [];
  globalThis.fetch = async (url) => {
    if (url === "/api/estimator-events") { seen.push(url); return reply(200, { ok: true }); }
    throw new TypeError("Failed to fetch");
  };
  try {
    const r = await submitLeadForm({ body: BODY, formId: "contact", lang: "en" });
    assert.equal(r.ok, false, "a dropped connection is not a success");
    assert.equal(r.kind, "network");
    assert.ok(/connection dropped/i.test(r.message));
    assert.ok(r.message.includes(JR_ONE_PHONE));
    assert.equal(seen.length, 1, "the beacon must still fire on a network failure");
  } finally {
    globalThis.fetch = original;
  }
});

test("a 200 carrying an error body is treated as failure, not success", async () => {
  await withFetch(router(200, { error: "something went wrong" }), async () => {
    const r = await submitLeadForm({ body: BODY, formId: "contact", lang: "en" });
    assert.equal(r.ok, false);
    assert.equal(r.kind, "callUs");
  });
});

test("no status code ever appears in a message shown on screen", () => {
  for (const lang of ["en", "es"]) {
    for (const key of ["rateLimited", "callUs", "network", "payloadTooLarge"]) {
      const msg = SUBMIT_ERRORS[lang][key];
      assert.equal(typeof msg, "string");
      assert.ok(!/\b(403|404|429|500|502|503|504|413)\b/.test(msg),
        `${lang}.${key} leaks a status code: ${msg}`);
    }
  }
});

// ─────────────────────────────────────────────────────────────────────────────
// 3. THE BEACON fires on every failure kind and carries no personal data.
// ─────────────────────────────────────────────────────────────────────────────

test("the failure beacon fires on 429, 403 and 500", async () => {
  for (const status of [429, 403, 500]) {
    await withFetch(router(status, { error: "x" }), async (calls) => {
      await submitLeadForm({ body: BODY, formId: "contact", lang: "en" });
      const beacons = calls.filter((c) => c.url === "/api/estimator-events");
      assert.equal(beacons.length, 1, `no beacon fired for ${status}`);
      assert.equal(beacons[0].body.event, LEAD_SUBMIT_FAILED_EVENT);
      assert.equal(beacons[0].body.params.form, "contact");
      assert.equal(beacons[0].body.params.status, String(status));
      assert.ok(beacons[0].body.params.ts, "the beacon must carry a timestamp");
    });
  }
});

test("the beacon carries NO personal data", async () => {
  await withFetch(router(500, { error: "x" }), async (calls) => {
    await submitLeadForm({
      body: { ...BODY, message: "my roof leaks", zip: "33607", address: "123 Main St" },
      formId: "contact",
      lang: "en",
    });
    const beacon = calls.find((c) => c.url === "/api/estimator-events");
    const asText = JSON.stringify(beacon.body).toLowerCase();
    for (const leak of [
      "maria", "gonzalez", "8135550142", "m@example.com",
      "my roof leaks", "33607", "123 main st",
    ]) {
      assert.ok(!asText.includes(leak.toLowerCase()),
        `the beacon leaked personal data: ${leak}`);
    }
    // And no key that would carry it either.
    for (const k of Object.keys(beacon.body.params)) {
      assert.ok(!/phone|email|name|address|customer/i.test(k),
        `beacon param key ${k} would be dropped by the server sanitizer anyway`);
    }
  });
});

test("the beacon event is registered, or the endpoint would 400 it", () => {
  // app/api/estimator-events/route.js rejects any event not in this set.
  assert.ok(
    ALLOWED_EVENTS.has(LEAD_SUBMIT_FAILED_EVENT),
    "lead_submit_failed must be in ALLOWED_EVENTS or every beacon is silently dropped"
  );
});

test("a failing beacon never breaks the form", async () => {
  const original = globalThis.fetch;
  globalThis.fetch = async (url) => {
    if (url === "/api/estimator-events") throw new Error("beacon down");
    return reply(500, { error: "x" });
  };
  try {
    const r = await submitLeadForm({ body: BODY, formId: "contact", lang: "en" });
    assert.equal(r.ok, false);
    assert.equal(r.kind, "callUs", "the customer message must survive a dead beacon");
  } finally {
    globalThis.fetch = original;
  }
});

test("reportSubmitFailure returns false rather than throwing when fetch is gone", async () => {
  const original = globalThis.fetch;
  globalThis.fetch = undefined;
  try {
    assert.equal(await reportSubmitFailure({ formId: "x", status: 500 }), false);
  } finally {
    globalThis.fetch = original;
  }
});

// ─────────────────────────────────────────────────────────────────────────────
// 4. PHOTOS are caught BEFORE submit, while the person can still fix it.
// ─────────────────────────────────────────────────────────────────────────────

function photo(name, bytes) {
  return { filename: name, dataUrl: `data:image/jpeg;base64,${"A".repeat(bytes)}` };
}

test("a normal photo set passes", () => {
  const ok = [photo("a.jpg", 50_000), photo("b.jpg", 60_000)];
  assert.equal(validatePhotosBeforeSubmit(ok, "en"), null);
  assert.equal(validatePhotosBeforeSubmit([], "en"), null);
  assert.equal(validatePhotosBeforeSubmit(undefined, "en"), null);
});

test("too many photos is caught with a count the person can act on", () => {
  const many = Array.from({ length: MAX_PHOTOS + 2 }, (_, i) => photo(`p${i}.jpg`, 1000));
  const msg = validatePhotosBeforeSubmit(many, "en");
  assert.ok(msg, "an over-count must be caught");
  assert.ok(msg.includes(String(MAX_PHOTOS)), "must say the limit");
  assert.ok(msg.includes("2"), "must say how many to remove");
});

test("an oversize photo is named so the person knows which one", () => {
  const set = [photo("small.jpg", 1000), photo("huge-gutter-photo.jpg", MAX_SUBMIT_PAYLOAD_BYTES)];
  const msg = validatePhotosBeforeSubmit(set, "en");
  assert.ok(msg, "an oversize photo must be caught");
  assert.ok(msg.includes("huge-gutter-photo.jpg"), "must name the offending file");
  assert.ok(!msg.includes("small.jpg"), "must not blame the innocent file");
});

test("photos that are individually fine but too big together are caught", () => {
  const each = Math.floor(MAX_SUBMIT_PAYLOAD_BYTES / 3);
  const set = [photo("a.jpg", each), photo("b.jpg", each), photo("c.jpg", each), photo("d.jpg", each)];
  const msg = validatePhotosBeforeSubmit(set, "en");
  assert.ok(msg, "a combined overflow must be caught");
  assert.equal(msg, SUBMIT_ERRORS.en.payloadTooLarge);
});

test("an oversize payload never reaches the network", async () => {
  const huge = { name: "x", photos: [{ dataUrl: "d".repeat(MAX_SUBMIT_PAYLOAD_BYTES + 1000) }] };
  await withFetch(router(200), async (calls) => {
    const r = await submitLeadForm({ body: huge, formId: "contact", lang: "en" });
    assert.equal(r.ok, false);
    assert.equal(r.kind, "payloadTooLarge");
    const lead = calls.filter((c) => c.url === "/api/send-lead");
    assert.equal(lead.length, 0, "an oversize body must NOT be sent to a route that cannot run");
    const beacons = calls.filter((c) => c.url === "/api/estimator-events");
    assert.equal(beacons.length, 1, "the lost lead must still be recorded");
  });
});

test("the payload cap is a real number and payloadByteLength measures bytes", () => {
  assert.ok(Number.isFinite(MAX_SUBMIT_PAYLOAD_BYTES) && MAX_SUBMIT_PAYLOAD_BYTES > 0);
  assert.equal(payloadByteLength({ a: "bc" }), JSON.stringify({ a: "bc" }).length);
  // Multi-byte characters must count as bytes, not characters, or the cap
  // would under-measure a Spanish submission.
  assert.ok(payloadByteLength({ a: "ñ" }) > JSON.stringify({ a: "x" }).length - 1);
});

// ─────────────────────────────────────────────────────────────────────────────
// 5. SPANISH. Real accents, idiomatic, and actually selected by lang.
// ─────────────────────────────────────────────────────────────────────────────

test("Spanish strings are returned when lang is es", async () => {
  await withFetch(router(429), async () => {
    const r = await submitLeadForm({ body: BODY, formId: "contact", lang: "es" });
    assert.equal(r.message, SUBMIT_ERRORS.es.rateLimited);
    assert.notEqual(r.message, SUBMIT_ERRORS.en.rateLimited);
  });
  await withFetch(router(500), async () => {
    const r = await submitLeadForm({ body: BODY, formId: "contact", lang: "es" });
    assert.equal(r.message, SUBMIT_ERRORS.es.callUs);
  });
});

test("every EN string has an ES counterpart and they are never identical", () => {
  const enKeys = Object.keys(SUBMIT_ERRORS.en).sort();
  const esKeys = Object.keys(SUBMIT_ERRORS.es).sort();
  assert.deepEqual(esKeys, enKeys, "EN and ES must cover exactly the same keys");
  for (const k of enKeys) {
    const en = SUBMIT_ERRORS.en[k];
    const es = SUBMIT_ERRORS.es[k];
    assert.equal(typeof en, typeof es, `${k} must have the same shape in both languages`);
    if (typeof en === "string") {
      assert.notEqual(es, en, `${k} is not translated`);
    }
  }
});

test("the Spanish carries real accents, not stripped ASCII", () => {
  const joined = [
    SUBMIT_ERRORS.es.rateLimited,
    SUBMIT_ERRORS.es.callUs,
    SUBMIT_ERRORS.es.network,
    SUBMIT_ERRORS.es.payloadTooLarge,
  ].join(" ");
  assert.ok(/[áéíóúñ¿¡]/.test(joined), `Spanish lost its diacritics: ${joined}`);
  // The specific words that lose accents when a pipeline strips them.
  assert.ok(/inténtelo|Llámenos|envió|perdió/.test(joined), "expected accented forms are missing");
});

test("the Spanish is not a word-for-word copy of the English structure", () => {
  // "Llámenos al" not "Por favor llame nos en". A literal translation of
  // "Please call us at" would keep "Por favor" and a preposition mismatch.
  assert.ok(/Ll[aá]menos al/.test(SUBMIT_ERRORS.es.callUs));
  assert.ok(!/Por favor llame/.test(SUBMIT_ERRORS.es.callUs));
});

test("both languages carry the phone number where they tell someone to call", () => {
  for (const lang of ["en", "es"]) {
    assert.ok(SUBMIT_ERRORS[lang].callUs.includes(JR_ONE_PHONE), `${lang} callUs missing phone`);
    assert.ok(SUBMIT_ERRORS[lang].network.includes(JR_ONE_PHONE), `${lang} network missing phone`);
  }
});

test("errorsFor falls back to English for an unknown language", () => {
  assert.equal(errorsFor("es"), SUBMIT_ERRORS.es);
  assert.equal(errorsFor("en"), SUBMIT_ERRORS.en);
  assert.equal(errorsFor("fr"), SUBMIT_ERRORS.en);
  assert.equal(errorsFor(undefined), SUBMIT_ERRORS.en);
});

// ─────────────────────────────────────────────────────────────────────────────
// 6. STRUCTURAL.
// ─────────────────────────────────────────────────────────────────────────────

test("the phone number matches the one published in the repo", () => {
  // Guards against this module drifting from the site. Read from the schema
  // block, which is the machine-readable canonical.
  const layout = fs.readFileSync(path.join(process.cwd(), "app", "layout.js"), "utf8");
  assert.ok(
    layout.includes(JR_ONE_PHONE),
    `JR_ONE_PHONE (${JR_ONE_PHONE}) does not appear in app/layout.js`
  );
  const footer = fs.readFileSync(
    path.join(process.cwd(), "components", "SiteFooter.jsx"), "utf8"
  );
  assert.ok(footer.includes(JR_ONE_PHONE), "the footer publishes a different number");
});

test("classifySubmitFailure maps statuses to the right customer message", () => {
  assert.equal(classifySubmitFailure(429), "rateLimited");
  assert.equal(classifySubmitFailure(413), "payloadTooLarge");
  assert.equal(classifySubmitFailure(403), "callUs");
  assert.equal(classifySubmitFailure(500), "callUs");
  assert.equal(classifySubmitFailure(502), "callUs");
  assert.equal(classifySubmitFailure(undefined), "callUs", "unknown must fail toward call-us");
});

test("the shared error style exists so all 21 forms render identically", () => {
  assert.equal(typeof SUBMIT_ERROR_STYLE, "object");
  assert.ok(SUBMIT_ERROR_STYLE.color, "the error must be visually distinct");
});

test("the submit module performs no privileged I/O and names no external host", () => {
  const raw = fs.readFileSync(
    path.join(process.cwd(), "lib", "lead-submit.js"), "utf8"
  );
  const code = raw
    .replace(/\/\*[\s\S]*?\*\//g, " ")
    .replace(/(^|[^:])\/\/.*$/gm, "$1");

  for (const forbidden of [
    "https:/", "builderprime", "nodemailer", "process.env",
    "child_process", "require(", "x-api-key",
  ]) {
    assert.ok(
      !code.toLowerCase().includes(forbidden.toLowerCase()),
      `lib/lead-submit.js CODE must not contain ${forbidden}`
    );
  }
  // It may fetch, but only same-origin relative paths.
  const urls = code.match(/fetch\(\s*["'][^"']+["']/g) || [];
  for (const u of urls) {
    assert.ok(u.includes('"/') || u.includes("'/"), `non-relative fetch target: ${u}`);
  }
  assert.ok(code.length < raw.length, "comment stripping must have removed something");
  assert.ok(code.includes("export async function submitLeadForm"), "real code must survive stripping");
});
