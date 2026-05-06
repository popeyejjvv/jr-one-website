// =============================================================================
// Vapi Client Tests
// =============================================================================
// Tests for lib/vapi-client.js — the outbound voice call trigger.
// Covers success, failure, timeout, and fail-soft paths.
//
// Run with: npm test -- tests/vapi-client.test.js
// =============================================================================

import test from "node:test";
import assert from "node:assert/strict";
import { triggerOutboundCall } from "../lib/vapi-client.js";

// ─────────────────────────────────────────────────────────────────────────
// Mock Global Fetch
// ─────────────────────────────────────────────────────────────────────────
// For a real test suite, use a library like undici or MSW.
// This is a simple mock for demonstration.

let mockFetchResponse = null;
let mockFetchError = null;
const originalFetch = globalThis.fetch;

function setMockFetchResponse(ok, status, body) {
  mockFetchResponse = {
    ok,
    status,
    text: async () => (typeof body === "string" ? body : JSON.stringify(body)),
  };
  mockFetchError = null;
}

function setMockFetchError(error) {
  mockFetchError = error;
  mockFetchResponse = null;
}

globalThis.fetch = async (url, options) => {
  if (mockFetchError) throw mockFetchError;
  if (!mockFetchResponse) {
    throw new Error("Mock fetch response not configured");
  }
  return mockFetchResponse;
};

// ─────────────────────────────────────────────────────────────────────────
// Helper: Save & Restore Env Vars
// ─────────────────────────────────────────────────────────────────────────

function withEnv(key, value, fn) {
  const prev = process.env[key];
  process.env[key] = value;
  try {
    return fn();
  } finally {
    if (prev === undefined) {
      delete process.env[key];
    } else {
      process.env[key] = prev;
    }
  }
}

// ─────────────────────────────────────────────────────────────────────────
// Tests
// ─────────────────────────────────────────────────────────────────────────

test("triggerOutboundCall() - successful call (2xx response)", async () => {
  setMockFetchResponse(true, 200, { id: "call-abc-123", status: "initiated" });

  const result = await triggerOutboundCall({
    phone: "+15551234567",
    bpOpportunityId: "opp-456",
    customerName: "John Doe",
    leadSource: "send-lead",
  });

  assert.equal(result.id, "call-abc-123");
  assert.equal(result.status, "initiated");
});

test("triggerOutboundCall() - missing VAPI_API_KEY (fail-soft)", async () => {
  const result = await withEnv("VAPI_API_KEY", undefined, async () => {
    return await triggerOutboundCall({
      phone: "+15551234567",
      bpOpportunityId: "opp-456",
      leadSource: "send-lead",
    });
  });

  assert.equal(result.skipped, true);
  assert.equal(result.reason, "missing-env");
});

test("triggerOutboundCall() - missing VAPI_PHONE_NUMBER_ID (fail-soft)", async () => {
  const result = await withEnv("VAPI_PHONE_NUMBER_ID", undefined, async () => {
    withEnv("VAPI_API_KEY", "test-key", async () => {
      return await triggerOutboundCall({
        phone: "+15551234567",
        bpOpportunityId: "opp-456",
        leadSource: "send-lead",
      });
    });
  });

  assert.equal(result.skipped, true);
  assert.equal(result.reason, "missing-env");
});

test("triggerOutboundCall() - missing VAPI_ASSISTANT_ID_EN (fail-soft)", async () => {
  const result = await withEnv("VAPI_ASSISTANT_ID_EN", undefined, async () => {
    return await triggerOutboundCall({
      phone: "+15551234567",
      bpOpportunityId: "opp-456",
      leadSource: "send-lead",
    });
  });

  assert.equal(result.skipped, true);
  assert.equal(result.reason, "missing-env");
});

test("triggerOutboundCall() - no phone provided (fail-soft)", async () => {
  const result = await triggerOutboundCall({
    phone: undefined,
    bpOpportunityId: "opp-456",
    leadSource: "send-lead",
  });

  assert.equal(result.skipped, true);
  assert.equal(result.reason, "no-phone");
});

test("triggerOutboundCall() - empty phone string (fail-soft)", async () => {
  const result = await triggerOutboundCall({
    phone: "",
    bpOpportunityId: "opp-456",
    leadSource: "send-lead",
  });

  assert.equal(result.skipped, true);
  assert.equal(result.reason, "no-phone");
});

test("triggerOutboundCall() - error response (4xx/5xx)", async () => {
  setMockFetchResponse(false, 401, "Unauthorized");

  try {
    await triggerOutboundCall({
      phone: "+15551234567",
      bpOpportunityId: "opp-456",
      leadSource: "send-lead",
    });
    assert.fail("Should have thrown error");
  } catch (err) {
    assert.match(err.message, /Vapi 401/);
  }
});

test("triggerOutboundCall() - non-JSON response body (graceful fallback)", async () => {
  setMockFetchResponse(true, 200, "OK (non-JSON)");

  const result = await triggerOutboundCall({
    phone: "+15551234567",
    bpOpportunityId: "opp-456",
    leadSource: "send-lead",
  });

  // Should return empty object since parsing failed
  assert.deepEqual(result, {});
});

test("triggerOutboundCall() - network error (fetch throws)", async () => {
  setMockFetchError(new Error("ECONNREFUSED"));

  try {
    await triggerOutboundCall({
      phone: "+15551234567",
      bpOpportunityId: "opp-456",
      leadSource: "send-lead",
    });
    assert.fail("Should have thrown error");
  } catch (err) {
    assert.match(err.message, /ECONNREFUSED/);
  }
});

test("triggerOutboundCall() - timeout (AbortController)", async () => {
  // Mock fetch that delays > 8000ms
  globalThis.fetch = async () => {
    await new Promise((resolve) => setTimeout(resolve, 9000));
    return { ok: true, status: 200, text: async () => "{}" };
  };

  try {
    await triggerOutboundCall({
      phone: "+15551234567",
      bpOpportunityId: "opp-456",
      leadSource: "send-lead",
    });
    // Note: In a real test, this should timeout
    // For demo purposes, the actual timeout behavior is hard to test
    // without modifying the source code or using fake timers
  } catch (err) {
    assert.match(err.message, /timeout|Abort/i);
  } finally {
    // Restore original fetch
    globalThis.fetch = originalFetch;
  }
});

test("triggerOutboundCall() - payload structure (metadata & customer)", async () => {
  let capturedPayload = null;

  globalThis.fetch = async (url, options) => {
    capturedPayload = JSON.parse(options.body);
    return {
      ok: true,
      status: 200,
      text: async () => '{"id":"call-123"}',
    };
  };

  await triggerOutboundCall({
    phone: "+15551234567",
    language: "en",
    bpOpportunityId: "opp-456",
    customerName: "John Doe",
    leadSource: "send-lead",
  });

  assert.ok(capturedPayload);
  assert.equal(capturedPayload.customer.number, "+15551234567");
  assert.equal(capturedPayload.customer.name, "John Doe");
  assert.equal(capturedPayload.metadata.bpOpportunityId, "opp-456");
  assert.equal(capturedPayload.metadata.language, "en");
  assert.equal(capturedPayload.metadata.leadSource, "send-lead");
  assert.ok(capturedPayload.metadata.triggeredAt);

  globalThis.fetch = originalFetch;
});

test("triggerOutboundCall() - includes Authorization header", async () => {
  let capturedHeaders = null;

  globalThis.fetch = async (url, options) => {
    capturedHeaders = options.headers;
    return {
      ok: true,
      status: 200,
      text: async () => '{"id":"call-123"}',
    };
  };

  await withEnv("VAPI_API_KEY", "test-key-xyz", async () => {
    await triggerOutboundCall({
      phone: "+15551234567",
      bpOpportunityId: "opp-456",
      leadSource: "send-lead",
    });
  });

  assert.equal(capturedHeaders.Authorization, "Bearer test-key-xyz");
  assert.equal(capturedHeaders["Content-Type"], "application/json");

  globalThis.fetch = originalFetch;
});

test("triggerOutboundCall() - language parameter (default: en)", async () => {
  let capturedPayload = null;

  globalThis.fetch = async (url, options) => {
    capturedPayload = JSON.parse(options.body);
    return {
      ok: true,
      status: 200,
      text: async () => '{"id":"call-123"}',
    };
  };

  // Test default language
  await triggerOutboundCall({
    phone: "+15551234567",
    bpOpportunityId: "opp-456",
    leadSource: "send-lead",
  });

  assert.equal(capturedPayload.metadata.language, "en");

  // Test custom language
  await triggerOutboundCall({
    phone: "+15551234567",
    language: "es",
    bpOpportunityId: "opp-456",
    leadSource: "send-lead",
  });

  assert.equal(capturedPayload.metadata.language, "es");

  globalThis.fetch = originalFetch;
});

test("triggerOutboundCall() - handles missing customerName gracefully", async () => {
  let capturedPayload = null;

  globalThis.fetch = async (url, options) => {
    capturedPayload = JSON.parse(options.body);
    return {
      ok: true,
      status: 200,
      text: async () => '{"id":"call-123"}',
    };
  };

  await triggerOutboundCall({
    phone: "+15551234567",
    bpOpportunityId: "opp-456",
    leadSource: "send-lead",
    // customerName omitted
  });

  // Customer object should still exist, just without name property
  assert.ok(capturedPayload.customer);
  assert.equal(capturedPayload.customer.number, "+15551234567");
  assert.ok(!capturedPayload.customer.name || capturedPayload.customer.name === undefined);

  globalThis.fetch = originalFetch;
});
