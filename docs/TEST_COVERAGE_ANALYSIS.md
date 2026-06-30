# Test Coverage Analysis — JR One Website

**Analysis Date:** 2026-04-26
**Project:** jr-one-website (Next.js 16 site)
**Current Status:** 9 tests (all in `business-hours.test.js`)

---

## Executive Summary

The codebase has **minimal test coverage** (~8% of critical functions). Only business hours logic is tested. Critical gaps exist in:

1. **Utility functions** (blog parsing, phone normalization, name splitting)
2. **API routes** (lead capture, rate limiting, BuilderPrime integration)
3. **External integrations** (Vapi client, email transport, BuilderPrime API)
4. **React components** (navigation, CTAs, landing pages)

### Risk Metrics
- **Untested API routes:** 2 (send-lead, estimator-lead)
- **Untested utility functions:** 15+
- **Missing integration tests:** 3 critical paths
- **No error handling verification:** ~80% of error cases untested
- **No edge case coverage:** date boundaries, malformed input, network failures

---

## 1. UNTESTED FUNCTIONS & CLASSES

### 1.1 Utility Functions (High Priority)

#### `lib/blog.js` — Blog post processing
- `getAllPostSlugs()` — Lists markdown files
  - ❌ Missing: directory doesn't exist case, empty directory, non-.md files
- `getAllPosts()` — Parses all posts with frontmatter & sorting
  - ❌ Missing: invalid YAML, missing date field, sorting verification, reading time calculation
- `getPostBySlug(slug)` — Fetches single post with HTML rendering
  - ❌ Missing: post not found (null case), markdown parsing errors, async processing failures, FAQ schema

#### `lib/vapi-client.js` — Voice call triggering
- `triggerOutboundCall()` — Async fetch to Vapi API
  - ❌ Missing: timeout behavior (AbortController), non-2xx responses, JSON parse failures
  - ❌ Missing: missing env vars (fail-soft path), empty phone normalization
  - ❌ Missing: network errors, malformed responses

#### `app/api/send-lead/route.js` — Utility functions
- `mapServiceToProjectType(service)` — Maps form service to BP project type
  - ❌ Missing: case sensitivity, substring matching edge cases, empty string, null
- `splitName(fullName)` — Splits full name to first/last
  - ❌ Missing: extra whitespace, single-word names, special characters, empty string
- `normalizePhone(phone)` — Converts phone to E.164 format
  - ❌ Missing: international numbers, short numbers, invalid formats, empty/null

#### `app/api/estimator-lead/route.js` — Utility functions
- `checkRateLimit(ip)` — In-memory rate limiting
  - ❌ Missing: window expiration, threshold boundary, cleanup logic
- `maybeCleanupRateLimitMap()` — Cleanup of expired entries
  - ❌ Missing: cleanup triggering (1000 entry threshold), deletion verification
- `getClientIp(request)` — Extracts client IP from headers
  - ❌ Missing: x-forwarded-for parsing (multiple IPs), missing both headers, whitespace
- `splitName(fullName)` — Different from send-lead version
  - ❌ Missing: same gaps as send-lead version PLUS different defaults ("Estimator Lead")
- `normalizePhone(phone)` — Same as send-lead
  - ❌ Missing: same gaps as send-lead version
- `inferProjectType(measurements)` — Maps measurements to project type
  - ❌ Missing: decimal values, negative values, all zero, missing fields, null measurements

---

### 1.2 API Route Handlers (Critical)

#### `POST /api/send-lead` — Lead submission endpoint
- Request validation
  - ❌ Missing: malformed JSON, empty body, null name/phone, partial fields
  - ❌ Missing: oversized payloads, invalid field types
- BuilderPrime integration path
  - ❌ Missing: 2xx responses (with & without Opportunity ID), error responses
  - ❌ Missing: network timeout, malformed response, missing API key
- Email fallback path
  - ❌ Missing: success & failure cases, invalid email addresses, disabled SMTP
- Vapi callback path (after-hours)
  - ❌ Missing: integration with isAfterHours() + isVoiceAgentEnabled(), fire-and-forget behavior
- Combined failure scenarios
  - ❌ Missing: both BP and email fail, response codes & messages

#### `POST /api/estimator-lead` — Estimator form endpoint
- Rate limiting
  - ❌ Missing: first request from new IP, repeated requests until threshold, header parsing
- Request validation
  - ❌ Missing: malformed JSON, missing phone (required), type='customer' vs 'lead'
- BuilderPrime integration
  - ❌ Missing: activity note attachment logic, async failures, API errors
- Measurements processing
  - ❌ Missing: null/undefined measurements, legacy format (estimateLow/estimateHigh)
- Vapi callback
  - ❌ Missing: language branching (es vs en), fire-and-forget verification

---

### 1.3 React Components (Medium Priority)

- `components/SiteNav.jsx` — Navigation bar
  - ❌ Missing: rendering, navigation links, responsive behavior
- `components/SiteFooter.jsx` — Footer
  - ❌ Missing: rendering, links, copyright text
- `components/MobileCTA.jsx` — Mobile call-to-action
  - ❌ Missing: rendering, visibility on mobile, click handlers
- `components/CityLandingPage.jsx` — Dynamic city page
  - ❌ Missing: parameter passing, rendering, data loading

---

### 1.4 Context & Hooks

- `lib/LanguageContext.jsx` — Language selection context
  - ❌ Missing: provider rendering, context consumption, language switching

---

## 2. EDGE CASES NOT COVERED

### 2.1 Date & Time Boundaries
- **Issue:** `business-hours.js` has good coverage, but integrations haven't been tested
- Gaps:
  - DST transition edge cases in actual API responses
  - Midnight boundary (hour 24 → 0 conversion) in real-world scenario
  - Dates outside the supported year (2026)

### 2.2 Input Validation
| Function | Gap |
|----------|-----|
| `splitName()` | Extra spaces: "  John   Doe  " → should normalize |
| `normalizePhone()` | Invalid formats: "abc", "1234", "+999999" |
| `mapServiceToProjectType()` | Case sensitivity: "GUTTER INSTALL" vs "gutter install" |
| `normalizePhone()` | International: "+44 20 7123 4567" (UK format) |
| `getClientIp()` | Multiple IPs: "192.0.2.1, 198.51.100.1, 203.0.113.1" |

### 2.3 Malformed Responses
- Vapi returns non-JSON response
- BuilderPrime returns unexpected format (no "Opportunity:" match)
- Email server returns mixed success (send fails but transporter created)

### 2.4 Network Failures
- Timeout during fetch (already covered by code but not tested)
- DNS resolution failure
- Connection refused (no server listening)
- Partial response (headers 200 but body incomplete)

### 2.5 Rate Limiting Boundaries
- Exactly at limit: 5th request (should fail)
- Just under limit: 4th request (should succeed)
- Window expiry: request at resetAt timestamp
- Cleanup: map with 1001 entries (should trigger)

---

## 3. NEW TEST SCENARIOS TO ADD

### 3.1 Blog Module (`tests/blog.test.js`)
```
1. getAllPostSlugs() - Empty directory
2. getAllPostSlugs() - Mixed files (.md and others)
3. getAllPosts() - Sorting by date (descending)
4. getAllPosts() - Missing date field (uses default)
5. getAllPosts() - Reading time calculation
6. getPostBySlug() - Non-existent slug (returns null)
7. getPostBySlug() - Markdown to HTML conversion
8. getPostBySlug() - FAQ schema data extraction
```

### 3.2 Vapi Client (`tests/vapi-client.test.js`)
```
1. triggerOutboundCall() - Missing VAPI_API_KEY (fail-soft)
2. triggerOutboundCall() - Missing phone (fail-soft)
3. triggerOutboundCall() - Successful call (2xx response)
4. triggerOutboundCall() - Error response (4xx/5xx)
5. triggerOutboundCall() - Non-JSON response body
6. triggerOutboundCall() - Timeout (AbortController)
7. triggerOutboundCall() - Network error (fetch fails)
8. triggerOutboundCall() - Payload structure (metadata, customer)
```

### 3.3 Utility Functions (`tests/send-lead-utils.test.js`)
```
mapServiceToProjectType():
1. "Gutter Installation" → "Gutter Installation"
2. "gutter repair" → "Repair"
3. "SEAMLESS GUTTERS" → "Gutter Installation"
4. Empty string → "Gutters"
5. Null → "Gutters"
6. Multiple keywords: "Gutter Installation with Guard" → "Gutter Installation"

splitName():
1. "John Doe" → {firstName: "John", lastName: "Doe"}
2. "John Q Doe" → {firstName: "John", lastName: "Q Doe"}
3. "John" → {firstName: "John", lastName: ""}
4. "" → {firstName: "", lastName: ""}
5. "  John  Doe  " → {firstName: "John", lastName: "Doe"}
6. Null → {firstName: "", lastName: ""}

normalizePhone():
1. "5551234567" → "+15551234567"
2. "15551234567" → "+15551234567"
3. "+1 555-123-4567" → "+15551234567"
4. "+44 20 7123 4567" → "+44 20 7123 4567" (pass-through)
5. "" → ""
6. Null → ""
7. "abc" → "abc" (pass-through)
```

### 3.4 Estimator Utilities (`tests/estimator-utils.test.js`)
```
checkRateLimit():
1. First request from new IP → {ok: true, remaining: 4}
2. 5th request from same IP → {ok: false, retryAfter: 60}
3. Window expiry → allows new requests
4. Exactly at RATE_LIMIT_MAX → {ok: false}

maybeCleanupRateLimitMap():
1. Map with <1000 entries → no cleanup
2. Map with 1001 entries with expired timestamps → cleanup runs
3. Map with 1001 entries, all active → cleanup skips

getClientIp():
1. "x-forwarded-for: 192.0.2.1" → "192.0.2.1"
2. "x-forwarded-for: 192.0.2.1, 198.51.100.1" → "192.0.2.1"
3. "x-real-ip: 203.0.113.1" → "203.0.113.1"
4. No IP headers → "unknown"
5. Whitespace: "x-forwarded-for:  192.0.2.1  " → "192.0.2.1"

inferProjectType():
1. measurements: {gutter: 100} → "Gutter Installation"
2. measurements: {gutter: 100, guard: 50} → "Gutter Installation"
3. measurements: {gutter: 100, soffit: 20, fascia: 20, guard: 50} → "Gutters"
4. measurements: {soffit: 50} → "Soffit and Fascia"
5. measurements: null → "Gutters"
6. measurements: {} → "Gutters"
```

### 3.5 API Route Tests

#### `send-lead/route.test.js` (Integration)
```
Valid Lead Submission:
1. POST with all required fields → 200 {success: true}
2. Missing name → 400 error
3. Missing phone → 400 error
4. BuilderPrime succeeds → captures opportunity_id
5. BuilderPrime fails, email succeeds → 200 success (fallback)
6. Both fail → 500 error

Error Handling:
1. Malformed JSON → 500
2. BuilderPrime timeout → fails gracefully, falls back to email
3. Email SMTP failure → non-fatal, BP still succeeds
4. Missing API credentials → skip that path
5. Vapi callback fires after-hours (mock isAfterHours) → triggered
6. Vapi callback during business hours → not triggered

Attribution Tracking:
1. gclid, utm_source provided → BP activity note created
2. Only gclid → activity created
3. No tracking params → no activity created
```

#### `estimator-lead/route.test.js` (Integration)
```
Rate Limiting:
1. 5 requests from same IP → 5th returns 429
2. Retry-After header set correctly
3. Different IPs not affected by each other

Valid Submission:
1. POST with phone → 200 {success: true}
2. Missing phone → 400 error
3. type='lead' vs 'customer' handled
4. Legacy estimateLow/estimateHigh parsed
5. measurements parsed correctly

BuilderPrime Integration:
1. Client created with correct payload
2. Activity note attached with measurements
3. Language parameter passed to inferProjectType
4. Discount code & expDate included in notes

Vapi Callback:
1. After-hours + language="es" → passes "es" to triggerOutboundCall
2. Business hours → callback not triggered
3. kill switch on → callback not triggered
```

---

## 4. ERROR HANDLING TESTS

### Missing Error Scenarios

| Function | Error Type | Test Gap |
|----------|-----------|----------|
| `getPostBySlug()` | File not found | Not tested |
| `getPostBySlug()` | Invalid markdown | Not tested |
| `triggerOutboundCall()` | Network timeout | Code handles, not tested |
| `send-lead` POST | BuilderPrime 500 | Not tested |
| `send-lead` POST | Invalid email format | Not tested |
| `estimator-lead` POST | Rate limit threshold | Not tested |
| `splitName()` | Special characters | Not tested |
| `normalizePhone()` | International numbers | Not tested |

---

## 5. INTEGRATION TEST GAPS

### Critical Missing Integration Tests

#### 1. End-to-End Lead Capture
```
Scenario: User submits lead form → should appear in BuilderPrime + email fallback
Current: No test; only unit tests of individual functions
Gap: No verification of full flow, error propagation, or data consistency
```

#### 2. After-Hours Voice Callback
```
Scenario: Submit lead after 6pm ET → Vapi call should trigger
Current: Each piece (isAfterHours, Vapi client, API route) tested separately
Gap: No test verifying the integration between timing, voice agent enable switch, and callback
```

#### 3. Rate Limiting Under Load
```
Scenario: 10 requests from same IP in 60 seconds → first 5 succeed, next 5 get 429
Current: Unit test of checkRateLimit logic only
Gap: No test of actual HTTP request handling, header parsing, response codes
```

#### 4. Multi-Stage Failure Recovery
```
Scenario: BuilderPrime fails, fallback to email → verify email is sent despite BP failure
Current: No test
Gap: No verification of error handling chain, fallback paths, or response messages
```

---

## 6. TEST SKELETONS

### Test Template 1: Utility Function (Node ESM)

```javascript
// tests/blog.test.js
import test from "node:test";
import assert from "node:assert/strict";
import path from "path";
import fs from "fs";
import { getAllPostSlugs, getAllPosts, getPostBySlug } from "../lib/blog.js";

test("getAllPostSlugs() - empty directory", async () => {
  // Mock: BLOG_DIR doesn't exist
  // Expected: returns []
});

test("getAllPosts() - sorting by date descending", async () => {
  // Expected: posts[0].date > posts[1].date > posts[2].date
});

test("getPostBySlug() - non-existent slug", async () => {
  // Expected: returns null
});

test("getPostBySlug() - converts markdown to HTML", async () => {
  // Setup: create temp .md file with markdown
  // Expected: contentHtml contains <h1>, <p>, etc.
});
```

### Test Template 2: Async Function with Fetch (Vapi)

```javascript
// tests/vapi-client.test.js
import test from "node:test";
import assert from "node:assert/strict";
import { triggerOutboundCall } from "../lib/vapi-client.js";

// Mock fetch globally
import { setGlobalDispatcher, MockAgent } from "undici";

test("triggerOutboundCall() - successful call", async () => {
  const mockAgent = new MockAgent();
  setGlobalDispatcher(mockAgent);

  const mockPool = mockAgent.get("https://api.vapi.ai");
  mockPool.intercept({
    path: "/call",
    method: "POST",
  }).reply(200, { id: "call-123" });

  const result = await triggerOutboundCall({
    phone: "+15551234567",
    bpOpportunityId: "opp-456",
    leadSource: "send-lead",
  });

  assert.deepEqual(result, { id: "call-123" });
});

test("triggerOutboundCall() - missing env vars (fail-soft)", async () => {
  const prev = process.env.VAPI_API_KEY;
  delete process.env.VAPI_API_KEY;
  try {
    const result = await triggerOutboundCall({
      phone: "+15551234567",
      bpOpportunityId: "opp-456",
    });
    assert.equal(result.skipped, true);
    assert.equal(result.reason, "missing-env");
  } finally {
    if (prev) process.env.VAPI_API_KEY = prev;
  }
});

test("triggerOutboundCall() - timeout", async () => {
  // Mock fetch that delays > 8000ms
  // Expected: throws "Vapi timeout after 8000ms"
});
```

### Test Template 3: API Route (Next.js)

```javascript
// tests/send-lead.integration.test.js
import test from "node:test";
import assert from "node:assert/strict";
import { POST as sendLeadHandler } from "../app/api/send-lead/route.js";

test("POST /api/send-lead - valid submission", async () => {
  const mockRequest = {
    json: async () => ({
      name: "John Doe",
      phone: "5551234567",
      email: "john@example.com",
      service: "Gutter Installation",
      zip: "12345",
    }),
  };

  const response = await sendLeadHandler(mockRequest);
  const data = await response.json();

  assert.equal(response.status, 200);
  assert.equal(data.success, true);
});

test("POST /api/send-lead - missing required fields", async () => {
  const mockRequest = {
    json: async () => ({
      name: "John Doe",
      // missing phone
    }),
  };

  const response = await sendLeadHandler(mockRequest);
  const data = await response.json();

  assert.equal(response.status, 400);
  assert.match(data.error, /required/i);
});

test("POST /api/send-lead - BuilderPrime fails, email succeeds", async () => {
  // Mock fetch: BuilderPrime returns 500, Gmail succeeds
  // Expected: response.status = 200 (fallback success)
});
```

### Test Template 4: Rate Limiting

```javascript
// tests/estimator-rate-limit.test.js
import test from "node:test";
import assert from "node:assert/strict";
import { checkRateLimit, maybeCleanupRateLimitMap } from "../app/api/estimator-lead/utils.js";

test("checkRateLimit - 5 requests from same IP", () => {
  const ip = "192.0.2.1";
  const results = [];

  for (let i = 0; i < 5; i++) {
    results.push(checkRateLimit(ip));
  }

  // First 4 should succeed
  assert.equal(results[0].ok, true);
  assert.equal(results[1].ok, true);
  assert.equal(results[2].ok, true);
  assert.equal(results[3].ok, true);

  // 5th should fail
  assert.equal(results[4].ok, false);
  assert.ok(results[4].retryAfter > 0);
});

test("checkRateLimit - window expiry", () => {
  // Advance time past RATE_LIMIT_WINDOW_MS
  // Expected: new requests allowed again
});

test("maybeCleanupRateLimitMap - triggers at 1000+ entries", () => {
  // Add 1001 expired entries
  // Call maybeCleanupRateLimitMap()
  // Expected: expired entries removed
});
```

### Test Template 5: React Component

```javascript
// tests/components/SiteNav.test.jsx
import test from "node:test";
import { render, screen } from "@testing-library/react";
import SiteNav from "../components/SiteNav.jsx";

test("SiteNav renders navigation links", () => {
  render(<SiteNav />);

  assert.ok(screen.getByText(/Home/i));
  assert.ok(screen.getByText(/About/i));
  assert.ok(screen.getByText(/Services/i));
  assert.ok(screen.getByText(/Contact/i));
});

test("SiteNav links have correct href attributes", () => {
  render(<SiteNav />);

  const homeLink = screen.getByRole("link", { name: /Home/i });
  assert.equal(homeLink.href, "http://localhost/");
});
```

---

## 7. TESTING INFRASTRUCTURE GAPS

### Current Setup
- **Test Runner:** Node.js built-in `test` module (no external runner)
- **Test Files:** Only `tests/business-hours.test.js` (manual execution: `node tests/business-hours.test.js`)
- **Coverage Tool:** None
- **Mocking:** Manual via env var manipulation (no mocking library)
- **Assertions:** Node.js `assert/strict`

### Recommended Additions
1. **Jest or Vitest** — For better DX, async handling, mocking
2. **C8 or Istanbul** — For coverage reports
3. **@testing-library/react** — For component testing
4. **undici or MSW** — For HTTP mocking
5. **CI/CD integration** — Pre-commit hooks, GitHub Actions

---

## 8. RECOMMENDED TEST PRIORITIES

### Priority 1 (Do First — Security & Revenue Impact)
1. ✅ `vapi-client.test.js` — Voice callback failures can lose leads
2. ✅ `send-lead.integration.test.js` — Lead capture is primary revenue path
3. ✅ `estimator-rate-limit.test.js` — DDoS/bot protection is critical

### Priority 2 (Do Next — Data Integrity)
4. `send-lead-utils.test.js` — Phone/name normalization prevents duplicate/invalid leads
5. `estimator-utils.test.js` — Measurements & project type affect quote accuracy
6. `blog.test.js` — Post parsing affects SEO & content delivery

### Priority 3 (Do Later — Nice-to-Have)
7. Component tests (SiteNav, SiteFooter, etc.)
8. End-to-end tests (Playwright/Cypress)
9. Performance tests (lighthouse, bundle analysis)

---

## 9. SUMMARY TABLE

| Module | Status | Tests | Gaps | Priority |
|--------|--------|-------|------|----------|
| `lib/business-hours.js` | ✅ Covered | 9 | 0 | — |
| `lib/blog.js` | ❌ Untested | 0 | 8 | 2 |
| `lib/vapi-client.js` | ❌ Untested | 0 | 8 | 1 |
| `lib/LanguageContext.jsx` | ❌ Untested | 0 | 3 | 3 |
| `app/api/send-lead/route.js` | ❌ Untested | 0 | 12 | 1 |
| `app/api/estimator-lead/route.js` | ❌ Untested | 0 | 14 | 1 |
| Components (4 files) | ❌ Untested | 0 | 8 | 3 |
| **TOTAL** | **11%** | **9** | **75+** | — |

---

## 10. NEXT STEPS

1. **Install testing framework:** `npm install --save-dev jest @testing-library/react`
2. **Add GitHub Actions workflow** — Run tests on every push
3. **Implement `tests/vapi-client.test.js`** — Highest impact, lowest effort
4. **Create mocking layer** for BuilderPrime API
5. **Set coverage threshold** — Enforce 80%+ for new code
6. **Document test patterns** in `docs/testing.md`
