// =============================================================================
// Lookup-before-create against BuilderPrime (lib/bp-lookup.js)
// =============================================================================
// Run: node --test tests/bp-lookup.test.js
//
// These tests import the SAME module both intake routes run. No test touches
// the network: findExistingClient / resolveIntakeTarget take an injected
// fetchImpl and every fetch below is a local stub that records its calls. No
// BuilderPrime write can occur from this file - the module only ever issues
// GET lookups, and the stubs assert no POST was attempted. No outbound email
// exists on any path here: lib/bp-lookup.js never imports nodemailer.

import { test } from "node:test";
import assert from "node:assert/strict";

import {
  normalizePhoneDigits,
  normalizeEmail,
  returnVisitPrefix,
  RETURN_VISIT_MESSAGES,
  pickNewest,
  findExistingClient,
  resolveIntakeTarget,
} from "../lib/bp-lookup.js";

const BASE = "https://example.builderprime.com/api";

/** fetch stub: routes ?phone= to `filtered`, bare /clients to `full`.
 * Records every call so a test can assert what was and was not attempted. */
function makeFetchStub({ filtered = [], full = [] } = {}) {
  const calls = [];
  const impl = async (url, opts = {}) => {
    calls.push({ url, method: (opts.method || "GET").toUpperCase() });
    const body = url.includes("?phone=") ? filtered : full;
    return { ok: true, status: 200, json: async () => body };
  };
  impl.calls = calls;
  return impl;
}

// ---------------------------------------------------------------------------
// Normalizers
// ---------------------------------------------------------------------------

test("phone normalizes to digits and drops a leading 1", () => {
  assert.equal(normalizePhoneDigits("+1 (813) 555-0111"), "8135550111");
  assert.equal(normalizePhoneDigits("813-555-0111"), "8135550111");
  assert.equal(normalizePhoneDigits("18135550111"), "8135550111");
  assert.equal(normalizePhoneDigits(""), "");
  assert.equal(normalizePhoneDigits(null), "");
});

test("email normalizes lowercase and trimmed", () => {
  assert.equal(normalizeEmail("  ChAd@Example.COM "), "chad@example.com");
  assert.equal(normalizeEmail(""), "");
  assert.equal(normalizeEmail(null), "");
});

// ---------------------------------------------------------------------------
// Matching
// ---------------------------------------------------------------------------

test("match on normalized phone found via the server-side ?phone= filter", async () => {
  const fetchImpl = makeFetchStub({
    filtered: [{ id: 6309026, clientId: 5900001, fullName: "ZZZ NOTEPROOF DELETE",
                 phoneNumber: "(813) 555-0111", createdDate: 1000 }],
  });
  const r = await findExistingClient({
    fetchImpl, baseUrl: BASE, apiKey: "k",
    phone: "+1 813 555 0111", email: "",
  });
  assert.equal(r.error, null);
  assert.equal(r.match.id, 6309026);
  assert.equal(r.matchedOn, "phone");
  assert.equal(fetchImpl.calls.length, 1);
  assert.ok(fetchImpl.calls[0].url.includes("?phone=8135550111"));
});

test("match on normalized email found client-side (no server email filter exists)", async () => {
  const fetchImpl = makeFetchStub({
    full: [
      { id: 1, clientId: 10, fullName: "Someone Else", emailAddress: "other@x.com", createdDate: 1 },
      { id: 2, clientId: 11, fullName: "Jane Return", emailAddress: "jane@x.com", createdDate: 2 },
    ],
  });
  const r = await findExistingClient({
    fetchImpl, baseUrl: BASE, apiKey: "k",
    phone: "", email: "  JANE@X.com ",
  });
  assert.equal(r.error, null);
  assert.equal(r.match.id, 2);
  assert.equal(r.matchedOn, "email");
});

test("both blank never matches and never fetches", async () => {
  const fetchImpl = makeFetchStub({ full: [{ id: 9, emailAddress: "", phoneNumber: "" }] });
  const r = await findExistingClient({
    fetchImpl, baseUrl: BASE, apiKey: "k", phone: "", email: "",
  });
  assert.equal(r.match, null);
  assert.equal(fetchImpl.calls.length, 0);
});

test("blank fields on the record side never match blank-ish input", async () => {
  const fetchImpl = makeFetchStub({
    full: [{ id: 3, emailAddress: "", phoneNumber: "", homePhoneNumber: "" }],
  });
  const r = await findExistingClient({
    fetchImpl, baseUrl: BASE, apiKey: "k", phone: "()- ", email: "   ",
  });
  assert.equal(r.match, null);
});

test("several rows match -> newest createdDate wins", () => {
  const newest = pickNewest([
    { id: 1, createdDate: 100 },
    { id: 2, createdDate: 300 },
    { id: 3, createdDate: 200 },
  ]);
  assert.equal(newest.id, 2);
});

// ---------------------------------------------------------------------------
// The decision the routes act on
// ---------------------------------------------------------------------------

test("match -> attach-existing with the existing id, and nothing was POSTed", async () => {
  const fetchImpl = makeFetchStub({
    filtered: [{ id: 4146482, clientId: 3954080, fullName: "Robert Miltner",
                 phoneNumber: "8135550144", createdDate: 5 }],
  });
  const r = await resolveIntakeTarget({
    fetchImpl, baseUrl: BASE, apiKey: "k", phone: "8135550144", email: "",
  });
  assert.equal(r.action, "attach-existing");
  assert.equal(r.opportunityId, "4146482");
  assert.ok(fetchImpl.calls.every((c) => c.method === "GET"),
    "lookup must never write");
});

test("no match -> create", async () => {
  const fetchImpl = makeFetchStub({ filtered: [], full: [] });
  const r = await resolveIntakeTarget({
    fetchImpl, baseUrl: BASE, apiKey: "k", phone: "8135550199", email: "new@x.com",
  });
  assert.equal(r.action, "create");
  assert.equal(r.lookupError, null);
});

test("lookup error falls through to create, error captured", async () => {
  const boom = async () => { throw new Error("socket hang up"); };
  const r = await resolveIntakeTarget({
    fetchImpl: boom, baseUrl: BASE, apiKey: "k", phone: "8135550199", email: "",
  });
  assert.equal(r.action, "create");
  assert.match(r.lookupError, /socket hang up/);
});

test("non-200 lookup response falls through to create", async () => {
  const fetchImpl = async () => ({ ok: false, status: 503, json: async () => ({}) });
  const r = await resolveIntakeTarget({
    fetchImpl, baseUrl: BASE, apiKey: "k", phone: "8135550199", email: "",
  });
  assert.equal(r.action, "create");
  assert.match(r.lookupError, /503/);
});

// ---------------------------------------------------------------------------
// Visitor-facing strings + note prefix
// ---------------------------------------------------------------------------

test("EN and ES return-visit strings are present, ES is real Spanish with accents", () => {
  assert.ok(RETURN_VISIT_MESSAGES.en.length > 20);
  assert.ok(RETURN_VISIT_MESSAGES.es.length > 20);
  assert.notEqual(RETURN_VISIT_MESSAGES.en, RETURN_VISIT_MESSAGES.es);
  assert.match(RETURN_VISIT_MESSAGES.es, /[áéíóúñ]/,
    "Spanish copy must keep its accents");
});

test("note prefix is RETURN VISIT YYYY-MM-DD", () => {
  assert.equal(
    returnVisitPrefix(new Date("2026-08-08T22:00:00Z")),
    "RETURN VISIT 2026-08-08"
  );
  assert.match(returnVisitPrefix(), /^RETURN VISIT \d{4}-\d{2}-\d{2}$/);
});
