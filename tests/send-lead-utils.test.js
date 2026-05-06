// =============================================================================
// Send-Lead Utility Functions Tests
// =============================================================================
// Tests for utility functions in app/api/send-lead/route.js
// Covers:
//   - mapServiceToProjectType()
//   - splitName()
//   - normalizePhone()
//
// Run with: npm test -- tests/send-lead-utils.test.js
// =============================================================================

import test from "node:test";
import assert from "node:assert/strict";

// Note: In a real setup, these would be exported from the route.js file.
// For now, we'll define them here for testing (or extract to a shared utils file).

// ─────────────────────────────────────────────────────────────────────────
// Utility Functions (copy from app/api/send-lead/route.js)
// ─────────────────────────────────────────────────────────────────────────

function mapServiceToProjectType(service) {
  if (!service) return "";
  const s = service.toLowerCase();
  if (s.includes("gutter") && s.includes("install")) return "Gutter Installation";
  if (s.includes("gutter") && s.includes("repair")) return "Repair";
  if (s.includes("gutter") && s.includes("clean")) return "Gutter Cleaning";
  if (s.includes("gutter") && s.includes("guard")) return "Gutter Guards";
  if (s.includes("gutter") && s.includes("replace")) return "Gutter Replacement";
  if (s.includes("seamless")) return "Gutter Installation";
  if (s.includes("copper")) return "Copper Gutters";
  if (s.includes("specialty")) return "Specialty Gutters";
  if (s.includes("soffit") || s.includes("fascia")) return "Soffit and Fascia";
  if (s.includes("siding")) return "Siding";
  if (s.includes("sagiper")) return "Siding";
  if (s.includes("peak") || s.includes("301") || s.includes("rejuven"))
    return "Peak 301";
  if (s.includes("govee") || s.includes("light")) return "Govee Lights";
  if (s.includes("drainage") || s.includes("drain")) return "Drainage";
  if (s.includes("service plan") || s.includes("maintenance"))
    return "Gutter Maintenance";
  return "Gutters"; // safe default
}

function splitName(fullName) {
  if (!fullName) return { firstName: "", lastName: "" };
  const parts = fullName.trim().split(/\s+/);
  if (parts.length === 1) return { firstName: parts[0], lastName: "" };
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
  return phone; // return as-is if format unexpected — let BP handle it
}

// ─────────────────────────────────────────────────────────────────────────
// Tests: mapServiceToProjectType()
// ─────────────────────────────────────────────────────────────────────────

test("mapServiceToProjectType() - 'Gutter Installation'", () => {
  const result = mapServiceToProjectType("Gutter Installation");
  assert.equal(result, "Gutter Installation");
});

test("mapServiceToProjectType() - case insensitive (lowercase)", () => {
  const result = mapServiceToProjectType("gutter installation");
  assert.equal(result, "Gutter Installation");
});

test("mapServiceToProjectType() - case insensitive (UPPERCASE)", () => {
  const result = mapServiceToProjectType("GUTTER INSTALLATION");
  assert.equal(result, "Gutter Installation");
});

test("mapServiceToProjectType() - 'Gutter Repair'", () => {
  const result = mapServiceToProjectType("gutter repair");
  assert.equal(result, "Repair");
});

test("mapServiceToProjectType() - 'Gutter Cleaning'", () => {
  const result = mapServiceToProjectType("Gutter Cleaning");
  assert.equal(result, "Gutter Cleaning");
});

test("mapServiceToProjectType() - 'Gutter Guards'", () => {
  const result = mapServiceToProjectType("Gutter Guards");
  assert.equal(result, "Gutter Guards");
});

test("mapServiceToProjectType() - 'Gutter Replacement'", () => {
  const result = mapServiceToProjectType("gutter replace");
  assert.equal(result, "Gutter Replacement");
});

test("mapServiceToProjectType() - 'Seamless Gutters'", () => {
  const result = mapServiceToProjectType("Seamless Aluminum Gutters");
  assert.equal(result, "Gutter Installation");
});

test("mapServiceToProjectType() - 'Copper Gutters'", () => {
  const result = mapServiceToProjectType("copper gutters");
  assert.equal(result, "Copper Gutters");
});

test("mapServiceToProjectType() - 'Specialty Gutters'", () => {
  const result = mapServiceToProjectType("specialty gutters");
  assert.equal(result, "Specialty Gutters");
});

test("mapServiceToProjectType() - 'Soffit and Fascia'", () => {
  const result = mapServiceToProjectType("soffit and fascia");
  assert.equal(result, "Soffit and Fascia");
});

test("mapServiceToProjectType() - 'Siding'", () => {
  const result = mapServiceToProjectType("siding");
  assert.equal(result, "Siding");
});

test("mapServiceToProjectType() - 'Peak 301'", () => {
  const result = mapServiceToProjectType("Peak 301 Rejuvenation");
  assert.equal(result, "Peak 301");
});

test("mapServiceToProjectType() - 'Govee Lights'", () => {
  const result = mapServiceToProjectType("Govee lights");
  assert.equal(result, "Govee Lights");
});

test("mapServiceToProjectType() - 'Drainage'", () => {
  const result = mapServiceToProjectType("drainage assessment");
  assert.equal(result, "Drainage");
});

test("mapServiceToProjectType() - 'Gutter Maintenance'", () => {
  const result = mapServiceToProjectType("service plan maintenance");
  assert.equal(result, "Gutter Maintenance");
});

test("mapServiceToProjectType() - empty string → default", () => {
  const result = mapServiceToProjectType("");
  assert.equal(result, "");
});

test("mapServiceToProjectType() - null → default", () => {
  const result = mapServiceToProjectType(null);
  assert.equal(result, "");
});

test("mapServiceToProjectType() - undefined → default", () => {
  const result = mapServiceToProjectType(undefined);
  assert.equal(result, "");
});

test("mapServiceToProjectType() - unrecognized service → 'Gutters'", () => {
  const result = mapServiceToProjectType("some random service");
  assert.equal(result, "Gutters");
});

test("mapServiceToProjectType() - multiple keywords (priority test)", () => {
  // 'gutter' + 'install' takes precedence
  const result = mapServiceToProjectType("gutter installation and repair");
  assert.equal(result, "Gutter Installation");
});

// ─────────────────────────────────────────────────────────────────────────
// Tests: splitName()
// ─────────────────────────────────────────────────────────────────────────

test("splitName() - 'John Doe' → {firstName: 'John', lastName: 'Doe'}", () => {
  const result = splitName("John Doe");
  assert.deepEqual(result, { firstName: "John", lastName: "Doe" });
});

test("splitName() - 'John Q Doe' → {firstName: 'John', lastName: 'Q Doe'}", () => {
  const result = splitName("John Q Doe");
  assert.deepEqual(result, { firstName: "John", lastName: "Q Doe" });
});

test("splitName() - 'John' (single word) → {firstName: 'John', lastName: ''}", () => {
  const result = splitName("John");
  assert.deepEqual(result, { firstName: "John", lastName: "" });
});

test("splitName() - empty string → {firstName: '', lastName: ''}", () => {
  const result = splitName("");
  assert.deepEqual(result, { firstName: "", lastName: "" });
});

test("splitName() - null → {firstName: '', lastName: ''}", () => {
  const result = splitName(null);
  assert.deepEqual(result, { firstName: "", lastName: "" });
});

test("splitName() - undefined → {firstName: '', lastName: ''}", () => {
  const result = splitName(undefined);
  assert.deepEqual(result, { firstName: "", lastName: "" });
});

test("splitName() - handles extra whitespace: '  John  Doe  '", () => {
  const result = splitName("  John  Doe  ");
  assert.deepEqual(result, { firstName: "John", lastName: "Doe" });
});

test("splitName() - handles multiple spaces between names", () => {
  const result = splitName("John    Q    Doe");
  assert.deepEqual(result, { firstName: "John", lastName: "Q Doe" });
});

test("splitName() - 'José García' (special characters)", () => {
  const result = splitName("José García");
  assert.deepEqual(result, { firstName: "José", lastName: "García" });
});

test("splitName() - 'Mary-Jane Watson' (hyphenated last name)", () => {
  const result = splitName("Mary-Jane Watson");
  assert.deepEqual(result, { firstName: "Mary-Jane", lastName: "Watson" });
});

// ─────────────────────────────────────────────────────────────────────────
// Tests: normalizePhone()
// ─────────────────────────────────────────────────────────────────────────

test("normalizePhone() - 10 digits → '+1XXXXXXXXXX'", () => {
  const result = normalizePhone("5551234567");
  assert.equal(result, "+15551234567");
});

test("normalizePhone() - 11 digits starting with 1 → '+1XXXXXXXXXX'", () => {
  const result = normalizePhone("15551234567");
  assert.equal(result, "+15551234567");
});

test("normalizePhone() - formatted: '(555) 123-4567'", () => {
  const result = normalizePhone("(555) 123-4567");
  assert.equal(result, "+15551234567");
});

test("normalizePhone() - formatted: '555-123-4567'", () => {
  const result = normalizePhone("555-123-4567");
  assert.equal(result, "+15551234567");
});

test("normalizePhone() - formatted: '555.123.4567'", () => {
  const result = normalizePhone("555.123.4567");
  assert.equal(result, "+15551234567");
});

test("normalizePhone() - formatted: '+1 555-123-4567'", () => {
  const result = normalizePhone("+1 555-123-4567");
  assert.equal(result, "+15551234567");
});

test("normalizePhone() - already E.164: '+15551234567'", () => {
  const result = normalizePhone("+15551234567");
  assert.equal(result, "+15551234567");
});

test("normalizePhone() - empty string → ''", () => {
  const result = normalizePhone("");
  assert.equal(result, "");
});

test("normalizePhone() - null → ''", () => {
  const result = normalizePhone(null);
  assert.equal(result, "");
});

test("normalizePhone() - undefined → ''", () => {
  const result = normalizePhone(undefined);
  assert.equal(result, "");
});

test("normalizePhone() - too few digits → pass-through", () => {
  const result = normalizePhone("1234");
  assert.equal(result, "1234");
});

test("normalizePhone() - too many digits → pass-through", () => {
  const result = normalizePhone("15551234567890");
  assert.equal(result, "15551234567890");
});

test("normalizePhone() - non-numeric characters → pass-through after stripping", () => {
  const result = normalizePhone("abc");
  assert.equal(result, "abc");
});

test("normalizePhone() - international format (not normalized, pass-through)", () => {
  const result = normalizePhone("+44 20 7123 4567");
  // After stripping non-digits: 442071234567 (12 digits, not 10 or 11)
  // Should pass through as-is
  assert.equal(result, "+44 20 7123 4567");
});

test("normalizePhone() - leading zeros (9-digit number)", () => {
  const result = normalizePhone("0551234567");
  // After stripping: 551234567 (9 digits, not 10/11)
  // Should pass through
  assert.equal(result, "0551234567");
});

// ─────────────────────────────────────────────────────────────────────────
// Integration Tests (multiple functions)
// ─────────────────────────────────────────────────────────────────────────

test("Integration: Form data normalization", () => {
  const formData = {
    name: "  John   Q   Doe  ",
    phone: "(555) 123-4567",
    service: "GUTTER INSTALLATION WITH GUARD",
  };

  const firstName = splitName(formData.name).firstName;
  const lastName = splitName(formData.name).lastName;
  const normalizedPhone = normalizePhone(formData.phone);
  const projectType = mapServiceToProjectType(formData.service);

  assert.equal(firstName, "John");
  assert.equal(lastName, "Q Doe");
  assert.equal(normalizedPhone, "+15551234567");
  assert.equal(projectType, "Gutter Installation");
});
