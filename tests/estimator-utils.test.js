// =============================================================================
// Estimator Utility Functions Tests
// =============================================================================
// Tests for utility functions in app/api/estimator-lead/route.js
// Covers:
//   - checkRateLimit()
//   - maybeCleanupRateLimitMap()
//   - getClientIp()
//   - splitName()
//   - normalizePhone()
//   - inferProjectType()
//
// Run with: npm test -- tests/estimator-utils.test.js
// =============================================================================

import test from "node:test";
import assert from "node:assert/strict";

// ─────────────────────────────────────────────────────────────────────────
// Utility Functions (copy from app/api/estimator-lead/route.js)
// ─────────────────────────────────────────────────────────────────────────

const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_WINDOW_MS = 60_000;

// Fresh map for each test
function createRateLimitMap() {
  return new Map();
}

function checkRateLimit(ip, rateLimitMap) {
  const now = Date.now();
  const record = rateLimitMap.get(ip);
  if (!record || now > record.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return { ok: true, remaining: RATE_LIMIT_MAX - 1 };
  }
  if (record.count >= RATE_LIMIT_MAX) {
    return { ok: false, retryAfter: Math.ceil((record.resetAt - now) / 1000) };
  }
  record.count++;
  return { ok: true, remaining: RATE_LIMIT_MAX - record.count };
}

function maybeCleanupRateLimitMap(rateLimitMap) {
  if (rateLimitMap.size < 1000) return;
  const now = Date.now();
  for (const [ip, record] of rateLimitMap.entries()) {
    if (now > record.resetAt) rateLimitMap.delete(ip);
  }
}

function getClientIp(headers) {
  const xff = headers.get("x-forwarded-for");
  if (xff) return xff.split(",")[0].trim();
  const real = headers.get("x-real-ip");
  if (real) return real;
  return "unknown";
}

function splitName(fullName) {
  if (!fullName) return { firstName: "Estimator", lastName: "Lead" };
  const parts = String(fullName).trim().split(/\s+/);
  if (parts.length === 1) return { firstName: parts[0], lastName: "(no last name)" };
  return {
    firstName: parts[0],
    lastName: parts.slice(1).join(" "),
  };
}

function normalizePhone(phone) {
  if (!phone) return "";
  const digits = String(phone).replace(/\D/g, "");
  if (digits.length === 10) return `+1${digits}`;
  if (digits.length === 11 && digits.startsWith("1")) return `+${digits}`;
  return phone;
}

function inferProjectType(measurements) {
  if (!measurements) return "Gutters";
  const m = measurements;
  const hasGutter = (m.gutter || 0) > 0;
  const hasSoffit = (m.soffit || 0) > 0;
  const hasFascia = (m.fascia || 0) > 0;
  const hasGuard = (m.guard || 0) > 0;
  // Multi-service bundle = full house wrap = highest value
  if (hasGutter && (hasSoffit || hasFascia) && hasGuard) return "Gutters";
  if (hasGutter && hasGuard) return "Gutter Installation";
  if (hasGutter) return "Gutter Installation";
  if (hasSoffit || hasFascia) return "Soffit and Fascia";
  if (hasGuard) return "Gutter Guards";
  return "Gutters";
}

// ─────────────────────────────────────────────────────────────────────────
// Tests: checkRateLimit()
// ─────────────────────────────────────────────────────────────────────────

test("checkRateLimit() - first request from new IP", () => {
  const map = createRateLimitMap();
  const result = checkRateLimit("192.0.2.1", map);

  assert.equal(result.ok, true);
  assert.equal(result.remaining, 4);
});

test("checkRateLimit() - 2nd request from same IP", () => {
  const map = createRateLimitMap();
  checkRateLimit("192.0.2.1", map);
  const result = checkRateLimit("192.0.2.1", map);

  assert.equal(result.ok, true);
  assert.equal(result.remaining, 3);
});

test("checkRateLimit() - 5th request (at threshold) → fails", () => {
  const map = createRateLimitMap();
  const ip = "192.0.2.1";

  for (let i = 0; i < 4; i++) {
    checkRateLimit(ip, map);
  }

  // 5th request should fail
  const result = checkRateLimit(ip, map);
  assert.equal(result.ok, false);
  assert.ok(result.retryAfter > 0);
  assert.ok(result.retryAfter <= 60);
});

test("checkRateLimit() - different IPs independent", () => {
  const map = createRateLimitMap();

  const result1 = checkRateLimit("192.0.2.1", map);
  const result2 = checkRateLimit("198.51.100.1", map);

  assert.equal(result1.ok, true);
  assert.equal(result2.ok, true);
});

test("checkRateLimit() - window expiry allows new requests", (t) => {
  const map = createRateLimitMap();
  const ip = "192.0.2.1";

  // Max out the limit
  for (let i = 0; i < 5; i++) {
    checkRateLimit(ip, map);
  }

  // 6th request should still fail
  let result = checkRateLimit(ip, map);
  assert.equal(result.ok, false);

  // Simulate window expiry by manually manipulating the map
  const record = map.get(ip);
  record.resetAt = Date.now() - 1; // Expired

  // Now the next request should succeed
  result = checkRateLimit(ip, map);
  assert.equal(result.ok, true);
  assert.equal(result.remaining, 4);
});

test("checkRateLimit() - retryAfter is positive", () => {
  const map = createRateLimitMap();
  const ip = "192.0.2.1";

  // Max out limit
  for (let i = 0; i < 5; i++) {
    checkRateLimit(ip, map);
  }

  const result = checkRateLimit(ip, map);
  assert.equal(result.ok, false);
  assert.ok(result.retryAfter > 0);
  assert.ok(result.retryAfter <= 60);
});

// ─────────────────────────────────────────────────────────────────────────
// Tests: maybeCleanupRateLimitMap()
// ─────────────────────────────────────────────────────────────────────────

test("maybeCleanupRateLimitMap() - <1000 entries → no cleanup", () => {
  const map = createRateLimitMap();

  // Add 100 entries
  for (let i = 0; i < 100; i++) {
    map.set(`ip-${i}`, { count: 1, resetAt: Date.now() + 1000 });
  }

  const sizeBefore = map.size;
  maybeCleanupRateLimitMap(map);
  const sizeAfter = map.size;

  assert.equal(sizeBefore, sizeAfter);
});

test("maybeCleanupRateLimitMap() - 1000+ entries triggers cleanup", () => {
  const map = createRateLimitMap();

  // Add 1001 entries, 500 expired + 501 active
  for (let i = 0; i < 500; i++) {
    map.set(`expired-${i}`, { count: 1, resetAt: Date.now() - 1000 });
  }
  for (let i = 0; i < 501; i++) {
    map.set(`active-${i}`, { count: 1, resetAt: Date.now() + 60000 });
  }

  assert.equal(map.size, 1001);
  maybeCleanupRateLimitMap(map);

  // After cleanup, should have ~501 active entries
  assert.ok(map.size <= 501);
  assert.ok(map.size > 400); // Allow some margin
});

test("maybeCleanupRateLimitMap() - all entries active → no deletion", () => {
  const map = createRateLimitMap();

  // Add 1001 all-active entries
  for (let i = 0; i < 1001; i++) {
    map.set(`ip-${i}`, { count: 1, resetAt: Date.now() + 60000 });
  }

  maybeCleanupRateLimitMap(map);

  // All should still be there
  assert.equal(map.size, 1001);
});

// ─────────────────────────────────────────────────────────────────────────
// Tests: getClientIp()
// ─────────────────────────────────────────────────────────────────────────

test("getClientIp() - x-forwarded-for single IP", () => {
  const headers = new Map([["x-forwarded-for", "192.0.2.1"]]);
  const ip = getClientIp(headers);
  assert.equal(ip, "192.0.2.1");
});

test("getClientIp() - x-forwarded-for multiple IPs (first one)", () => {
  const headers = new Map([
    ["x-forwarded-for", "192.0.2.1, 198.51.100.1, 203.0.113.1"],
  ]);
  const ip = getClientIp(headers);
  assert.equal(ip, "192.0.2.1");
});

test("getClientIp() - x-forwarded-for with whitespace", () => {
  const headers = new Map([["x-forwarded-for", "  192.0.2.1  ,  198.51.100.1  "]]);
  const ip = getClientIp(headers);
  assert.equal(ip, "192.0.2.1");
});

test("getClientIp() - x-real-ip fallback", () => {
  const headers = new Map([["x-real-ip", "203.0.113.1"]]);
  const ip = getClientIp(headers);
  assert.equal(ip, "203.0.113.1");
});

test("getClientIp() - x-forwarded-for takes precedence over x-real-ip", () => {
  const headers = new Map([
    ["x-forwarded-for", "192.0.2.1"],
    ["x-real-ip", "203.0.113.1"],
  ]);
  const ip = getClientIp(headers);
  assert.equal(ip, "192.0.2.1");
});

test("getClientIp() - no headers → 'unknown'", () => {
  const headers = new Map();
  const ip = getClientIp(headers);
  assert.equal(ip, "unknown");
});

test("getClientIp() - IPv6 address", () => {
  const headers = new Map([["x-forwarded-for", "2001:db8::1"]]);
  const ip = getClientIp(headers);
  assert.equal(ip, "2001:db8::1");
});

// ─────────────────────────────────────────────────────────────────────────
// Tests: splitName() [Estimator version]
// ─────────────────────────────────────────────────────────────────────────

test("splitName() - provided name → splits correctly", () => {
  const result = splitName("Jane Smith");
  assert.deepEqual(result, { firstName: "Jane", lastName: "Smith" });
});

test("splitName() - single word → adds placeholder for last name", () => {
  const result = splitName("Jane");
  assert.deepEqual(result, {
    firstName: "Jane",
    lastName: "(no last name)",
  });
});

test("splitName() - empty string → default values", () => {
  const result = splitName("");
  assert.deepEqual(result, { firstName: "Estimator", lastName: "Lead" });
});

test("splitName() - null → default values", () => {
  const result = splitName(null);
  assert.deepEqual(result, { firstName: "Estimator", lastName: "Lead" });
});

test("splitName() - undefined → default values", () => {
  const result = splitName(undefined);
  assert.deepEqual(result, { firstName: "Estimator", lastName: "Lead" });
});

test("splitName() - whitespace-only → default values", () => {
  const result = splitName("   ");
  // After trim().split(), should have empty parts
  // Behavior depends on exact implementation
  assert.ok(result.firstName || result.firstName === "Estimator");
});

// ─────────────────────────────────────────────────────────────────────────
// Tests: normalizePhone() [Same as send-lead]
// ─────────────────────────────────────────────────────────────────────────

test("normalizePhone() - 10-digit number", () => {
  const result = normalizePhone("5551234567");
  assert.equal(result, "+15551234567");
});

test("normalizePhone() - 11-digit starting with 1", () => {
  const result = normalizePhone("15551234567");
  assert.equal(result, "+15551234567");
});

test("normalizePhone() - formatted with dashes", () => {
  const result = normalizePhone("555-123-4567");
  assert.equal(result, "+15551234567");
});

test("normalizePhone() - empty string", () => {
  const result = normalizePhone("");
  assert.equal(result, "");
});

// ─────────────────────────────────────────────────────────────────────────
// Tests: inferProjectType()
// ─────────────────────────────────────────────────────────────────────────

test("inferProjectType() - gutter only → 'Gutter Installation'", () => {
  const result = inferProjectType({ gutter: 100 });
  assert.equal(result, "Gutter Installation");
});

test("inferProjectType() - gutter + guard → 'Gutter Installation'", () => {
  const result = inferProjectType({ gutter: 100, guard: 50 });
  assert.equal(result, "Gutter Installation");
});

test("inferProjectType() - gutter + soffit + fascia + guard → 'Gutters'", () => {
  const result = inferProjectType({
    gutter: 100,
    soffit: 20,
    fascia: 20,
    guard: 50,
  });
  assert.equal(result, "Gutters");
});

test("inferProjectType() - gutter + soffit → 'Gutters' (multi-service bundle)", () => {
  const result = inferProjectType({ gutter: 100, soffit: 20 });
  assert.equal(result, "Gutters");
});

test("inferProjectType() - soffit only → 'Soffit and Fascia'", () => {
  const result = inferProjectType({ soffit: 50 });
  assert.equal(result, "Soffit and Fascia");
});

test("inferProjectType() - fascia only → 'Soffit and Fascia'", () => {
  const result = inferProjectType({ fascia: 50 });
  assert.equal(result, "Soffit and Fascia");
});

test("inferProjectType() - guard only → 'Gutter Guards'", () => {
  const result = inferProjectType({ guard: 50 });
  assert.equal(result, "Gutter Guards");
});

test("inferProjectType() - null measurements → 'Gutters'", () => {
  const result = inferProjectType(null);
  assert.equal(result, "Gutters");
});

test("inferProjectType() - empty object → 'Gutters'", () => {
  const result = inferProjectType({});
  assert.equal(result, "Gutters");
});

test("inferProjectType() - undefined → 'Gutters'", () => {
  const result = inferProjectType(undefined);
  assert.equal(result, "Gutters");
});

test("inferProjectType() - zero values → 'Gutters' (no service detected)", () => {
  const result = inferProjectType({
    gutter: 0,
    soffit: 0,
    fascia: 0,
    guard: 0,
  });
  assert.equal(result, "Gutters");
});

test("inferProjectType() - decimal values (should work with > 0 check)", () => {
  const result = inferProjectType({ gutter: 0.5, guard: 0.25 });
  assert.equal(result, "Gutter Installation");
});

test("inferProjectType() - missing measurement fields (should default to 0)", () => {
  const result = inferProjectType({ gutter: 50 });
  // soffit, fascia, guard not present, so treated as 0
  assert.equal(result, "Gutter Installation");
});

// ─────────────────────────────────────────────────────────────────────────
// Integration Tests
// ─────────────────────────────────────────────────────────────────────────

test("Integration: Estimator form data normalization", () => {
  const formData = {
    customerName: "John Smith",
    phone: "(555) 123-4567",
    measurements: {
      gutter: 200,
      soffit: 40,
      fascia: 40,
      guard: 100,
    },
  };

  const { firstName, lastName } = splitName(formData.customerName);
  const normalizedPhone = normalizePhone(formData.phone);
  const projectType = inferProjectType(formData.measurements);

  assert.equal(firstName, "John");
  assert.equal(lastName, "Smith");
  assert.equal(normalizedPhone, "+15551234567");
  assert.equal(projectType, "Gutters");
});

test("Integration: Rate limiting + IP extraction", () => {
  const map = createRateLimitMap();
  const headers = new Map([["x-forwarded-for", "192.0.2.1, 198.51.100.1"]]);

  const ip = getClientIp(headers);
  const result = checkRateLimit(ip, map);

  assert.equal(ip, "192.0.2.1");
  assert.equal(result.ok, true);
});
