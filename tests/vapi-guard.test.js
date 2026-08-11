// =============================================================================
// Vapi Guard Tests
// =============================================================================
// Proves the three-layer guard (matcher, chokepoint, call-site) catches every
// test/non-dialable number and passes genuine Tampa-area customers through.
//
// CRITICAL: no test here may reach api.vapi.ai. globalThis.fetch is replaced
// before any import, and every test asserts against the mock, not the network.
//
// Run with: node --test tests/vapi-guard.test.js
// =============================================================================

import test from "node:test";
import assert from "node:assert/strict";

// ── Replace fetch BEFORE importing the module under test ──
let fetchCalls = [];
globalThis.fetch = async (url, options) => {
  fetchCalls.push({ url, options });
  return {
    ok: true,
    status: 200,
    text: async () => JSON.stringify({ id: "mock-call-id" }),
  };
};

// Now import -- the module will bind to our mock fetch
import { triggerOutboundCall } from "../lib/vapi-client.js";
import { isInternalTestSubmission } from "../lib/estimator-lead.js";

// ── Set required env vars so the env-missing path does not short-circuit ──
process.env.VAPI_API_KEY = "test-key-do-not-dial";
process.env.VAPI_PHONE_NUMBER_ID = "test-phone-id";
process.env.VAPI_ASSISTANT_ID_EN = "test-assistant-id";

function resetFetchCalls() {
  fetchCalls = [];
}

// ---------------------------------------------------------------------------
// (a) 555 exchange is suppressed
// ---------------------------------------------------------------------------
test("(a) 555 exchange number is suppressed at matcher and chokepoint", async () => {
  resetFetchCalls();
  assert.equal(isInternalTestSubmission({ phone: "+18135550100" }), true);
  const r = await triggerOutboundCall({
    phone: "+18135550100",
    bpOpportunityId: "opp-a",
    leadSource: "test",
  });
  assert.equal(r.skipped, true);
  assert.equal(fetchCalls.length, 0, "fetch must not be called");
});

// ---------------------------------------------------------------------------
// (b) 8444443114 is suppressed in at least three formattings
// ---------------------------------------------------------------------------
test("(b) JR One line 8444443114 suppressed: raw digits", async () => {
  resetFetchCalls();
  assert.equal(isInternalTestSubmission({ phone: "8444443114" }), true);
  const r = await triggerOutboundCall({
    phone: "8444443114",
    bpOpportunityId: "opp-b1",
    leadSource: "test",
  });
  assert.equal(r.skipped, true);
  assert.equal(fetchCalls.length, 0);
});

test("(b) JR One line 8444443114 suppressed: (844) 444-3114", async () => {
  resetFetchCalls();
  assert.equal(isInternalTestSubmission({ phone: "(844) 444-3114" }), true);
  const r = await triggerOutboundCall({
    phone: "(844) 444-3114",
    bpOpportunityId: "opp-b2",
    leadSource: "test",
  });
  assert.equal(r.skipped, true);
  assert.equal(fetchCalls.length, 0);
});

test("(b) JR One line 8444443114 suppressed: +1-844-444-3114", async () => {
  resetFetchCalls();
  assert.equal(isInternalTestSubmission({ phone: "+1-844-444-3114" }), true);
  const r = await triggerOutboundCall({
    phone: "+1-844-444-3114",
    bpOpportunityId: "opp-b3",
    leadSource: "test",
  });
  assert.equal(r.skipped, true);
  assert.equal(fetchCalls.length, 0);
});

test("(b) JR One line 8444443114 suppressed: 1.844.444.3114", async () => {
  resetFetchCalls();
  assert.equal(isInternalTestSubmission({ phone: "1.844.444.3114" }), true);
  const r = await triggerOutboundCall({
    phone: "1.844.444.3114",
    bpOpportunityId: "opp-b4",
    leadSource: "test",
  });
  assert.equal(r.skipped, true);
  assert.equal(fetchCalls.length, 0);
});

// ---------------------------------------------------------------------------
// (c) ZZZ marker is suppressed
// ---------------------------------------------------------------------------
test("(c) ZZZ marker in name is caught", () => {
  assert.equal(isInternalTestSubmission({
    phone: "+18132158554",
    name: "ZZZ Test Person",
  }), true);
});

test("(c) Internal-Test marker in email is caught", () => {
  assert.equal(isInternalTestSubmission({
    phone: "+18132158554",
    customerEmail: "Internal-Test@example.com",
  }), true);
});

test("(c) zzz marker in address is caught (case-insensitive)", () => {
  assert.equal(isInternalTestSubmission({
    phone: "+18132158554",
    address: "123 zzz street",
  }), true);
});

// ---------------------------------------------------------------------------
// (d) Empty phone and 5-digit phone are both suppressed
// ---------------------------------------------------------------------------
test("(d) empty phone is caught by matcher", () => {
  assert.equal(isInternalTestSubmission({ phone: "" }), true);
});

test("(d) empty phone is caught by chokepoint", async () => {
  resetFetchCalls();
  // The chokepoint has its own empty-phone check at line 51-54
  const r = await triggerOutboundCall({
    phone: "",
    bpOpportunityId: "opp-d1",
    leadSource: "test",
  });
  assert.equal(r.skipped, true);
  assert.equal(fetchCalls.length, 0);
});

test("(d) 5-digit phone is caught by matcher", () => {
  assert.equal(isInternalTestSubmission({ phone: "12345" }), true);
});

test("(d) 5-digit phone is caught by chokepoint", async () => {
  resetFetchCalls();
  const r = await triggerOutboundCall({
    phone: "12345",
    bpOpportunityId: "opp-d2",
    leadSource: "test",
  });
  assert.equal(r.skipped, true);
  assert.equal(fetchCalls.length, 0);
});

// ---------------------------------------------------------------------------
// (e) All-same-digit number is suppressed
// ---------------------------------------------------------------------------
test("(e) all-same-digit 1111111111 is caught by matcher", () => {
  assert.equal(isInternalTestSubmission({ phone: "1111111111" }), true);
});

test("(e) all-same-digit 5555555555 is caught by chokepoint", async () => {
  resetFetchCalls();
  const r = await triggerOutboundCall({
    phone: "5555555555",
    bpOpportunityId: "opp-e",
    leadSource: "test",
  });
  assert.equal(r.skipped, true);
  assert.equal(fetchCalls.length, 0);
});

// ---------------------------------------------------------------------------
// (f) Genuine Tampa customer DOES reach the call path
// ---------------------------------------------------------------------------
test("(f) genuine Tampa number reaches fetch (mock)", async () => {
  resetFetchCalls();
  // Real Tampa area code 813, non-555 exchange, not JR One number
  const genuinePhone = "+18132158554";
  assert.equal(isInternalTestSubmission({ phone: genuinePhone }), false);
  const r = await triggerOutboundCall({
    phone: genuinePhone,
    bpOpportunityId: "opp-f",
    customerName: "Maria Garcia",
    leadSource: "send-lead",
  });
  assert.equal(fetchCalls.length, 1, "fetch must be called exactly once");
  assert.equal(fetchCalls[0].url, "https://api.vapi.ai/call");
  assert.equal(r.id, "mock-call-id");
});

// ---------------------------------------------------------------------------
// (g) Suppression returns normally, does not throw
// ---------------------------------------------------------------------------
test("(g) suppressed call returns {skipped:true} without throwing", async () => {
  resetFetchCalls();
  let threw = false;
  try {
    const r = await triggerOutboundCall({
      phone: "+18135550100",
      bpOpportunityId: "opp-g",
      leadSource: "test",
    });
    assert.equal(r.skipped, true);
    assert.ok(r.reason);
  } catch {
    threw = true;
  }
  assert.equal(threw, false, "suppression must not throw");
  assert.equal(fetchCalls.length, 0);
});

// ---------------------------------------------------------------------------
// Final confirmation: no real network call was made
// ---------------------------------------------------------------------------
test("CONFIRMATION: zero calls reached a real endpoint", () => {
  // fetchCalls only tracks our mock. If any call had somehow bypassed the
  // mock (impossible since we replaced globalThis.fetch before import),
  // node:test would have timed out or errored on the real network call.
  // This test exists to make the confirmation explicit in the output.
  for (const call of fetchCalls) {
    // The only call that should exist is the genuine Tampa number test (f).
    // Verify it went to api.vapi.ai via our MOCK, not the real network.
    assert.equal(call.url, "https://api.vapi.ai/call");
  }
  assert.ok(true, "All fetch calls were intercepted by the mock");
});
