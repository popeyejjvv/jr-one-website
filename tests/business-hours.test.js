// =============================================================================
// JR One — Business Hours Gate Tests
// =============================================================================
// Run with: node tests/business-hours.test.js
//
// Uses Node's built-in test runner (node:test) — no Jest, no Vitest, no
// extra dev dependencies. Mocks the time gate by passing explicit Date
// objects to isAfterHours().
//
// All Date instants below are constructed from explicit ET wall-clock times
// using a UTC offset that matches the date's actual DST status. We pin the
// offset rather than relying on the local clock so the tests pass regardless
// of where they run (laptop in PT, CI runner in UTC, Vercel build, etc.).
// =============================================================================

import test from "node:test";
import assert from "node:assert/strict";
import { isAfterHours, isVoiceAgentEnabled } from "../lib/business-hours.js";

// Helper: build a Date for a given Eastern wall-clock moment.
// During EDT (Mar 9 2026 02:00 -> Nov 1 2026 02:00) ET = UTC-4
// During EST (rest of year)                              ET = UTC-5
function etDate(yyyy, mm, dd, hh, mi = 0) {
  // Determine if the date falls in 2026 EDT window.
  // 2026 EDT: Mar 8 02:00 EST -> Mar 8 03:00 EDT, ends Nov 1 02:00 EDT -> 01:00 EST.
  // For test simplicity we treat: Mar 8 onward through Oct 31 = EDT.
  const isEDT =
    (mm > 3 || (mm === 3 && dd >= 8)) && (mm < 11 || (mm === 11 && dd === 0));
  const offsetHours = isEDT ? 4 : 5;
  // Construct the equivalent UTC instant.
  return new Date(Date.UTC(yyyy, mm - 1, dd, hh + offsetHours, mi, 0));
}

test("Tuesday 10am ET → false (business hours)", () => {
  // Tuesday April 7 2026 10:00 ET (EDT)
  assert.equal(isAfterHours(etDate(2026, 4, 7, 10)), false);
});

test("Tuesday 6:59am ET → true (before open)", () => {
  assert.equal(isAfterHours(etDate(2026, 4, 7, 6, 59)), true);
});

test("Tuesday 7:00am ET → false (just opened)", () => {
  assert.equal(isAfterHours(etDate(2026, 4, 7, 7, 0)), false);
});

test("Tuesday 5:59pm ET → false (still open)", () => {
  assert.equal(isAfterHours(etDate(2026, 4, 7, 17, 59)), false);
});

test("Tuesday 6:00pm ET → true (closed)", () => {
  assert.equal(isAfterHours(etDate(2026, 4, 7, 18, 0)), true);
});

test("Saturday noon ET → true (weekend)", () => {
  // Saturday April 11 2026 12:00 ET
  assert.equal(isAfterHours(etDate(2026, 4, 11, 12)), true);
});

test("Sunday 9am ET → true (weekend)", () => {
  // Sunday April 12 2026 09:00 ET
  assert.equal(isAfterHours(etDate(2026, 4, 12, 9)), true);
});

test("DST boundary (Sun Mar 8 2026 02:30 ET) → true (Sunday)", () => {
  // Sunday March 8 2026 — DST start in 2026 is technically the second Sunday
  // of March (March 8 2026). Regardless of the exact wall clock during the
  // skipped hour, the day is Sunday and should be after-hours.
  assert.equal(isAfterHours(etDate(2026, 3, 8, 2, 30)), true);
});

test("isVoiceAgentEnabled() with VOICE_AGENT_KILL_SWITCH=1 → false", () => {
  const prev = process.env.VOICE_AGENT_KILL_SWITCH;
  process.env.VOICE_AGENT_KILL_SWITCH = "1";
  try {
    assert.equal(isVoiceAgentEnabled(), false);
  } finally {
    if (prev === undefined) delete process.env.VOICE_AGENT_KILL_SWITCH;
    else process.env.VOICE_AGENT_KILL_SWITCH = prev;
  }
});

test("isVoiceAgentEnabled() unset → true", () => {
  const prev = process.env.VOICE_AGENT_KILL_SWITCH;
  delete process.env.VOICE_AGENT_KILL_SWITCH;
  try {
    assert.equal(isVoiceAgentEnabled(), true);
  } finally {
    if (prev !== undefined) process.env.VOICE_AGENT_KILL_SWITCH = prev;
  }
});

test("isVoiceAgentEnabled() with VOICE_AGENT_KILL_SWITCH=0 → true", () => {
  const prev = process.env.VOICE_AGENT_KILL_SWITCH;
  process.env.VOICE_AGENT_KILL_SWITCH = "0";
  try {
    assert.equal(isVoiceAgentEnabled(), true);
  } finally {
    if (prev === undefined) delete process.env.VOICE_AGENT_KILL_SWITCH;
    else process.env.VOICE_AGENT_KILL_SWITCH = prev;
  }
});
