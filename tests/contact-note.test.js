// =============================================================================
// Contact-form message -> BuilderPrime activity note (lib/contact-note.js)
// =============================================================================
// Run: node --test tests/contact-note.test.js
//
// These tests import the SAME module app/api/send-lead/route.js runs; nothing
// here is a pasted copy. No test touches the network: postContactNote takes an
// injected fetchImpl, and every fetch below is a local stub. No outbound email
// exists on any path in this file - lib/contact-note.js never imports
// nodemailer, and no transport is constructed anywhere in these tests.

import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

import {
  NOTE_MAX_CHARS,
  buildContactMessageNote,
  postContactNote,
} from "../lib/contact-note.js";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");

// ---------------------------------------------------------------------------
// buildContactMessageNote
// ---------------------------------------------------------------------------

test("note carries the message and the page it came from", () => {
  const note = buildContactMessageNote({ message: "Need 7 inch gutters on the back", page: "/contact" });
  assert.ok(note.includes("Need 7 inch gutters on the back"));
  assert.ok(note.includes("(/contact)"));
});

test("empty or whitespace message produces no note at all", () => {
  assert.equal(buildContactMessageNote({ message: "" }), null);
  assert.equal(buildContactMessageNote({ message: "   " }), null);
  assert.equal(buildContactMessageNote({}), null);
  assert.equal(buildContactMessageNote(), null);
});

test("note truncates at the probed endpoint limit", () => {
  // The limit is the one the live endpoint stated on 2026-08-08:
  // "Description length is too long - must be less than 10,000 characters."
  // 10000 exactly was accepted (activity 8806008 on test record 6308800).
  assert.equal(NOTE_MAX_CHARS, 10000);
  const note = buildContactMessageNote({ message: "x".repeat(NOTE_MAX_CHARS * 2) });
  assert.equal(note.length, NOTE_MAX_CHARS);
});

// ---------------------------------------------------------------------------
// postContactNote - best-effort by construction
// ---------------------------------------------------------------------------

test("posts the verified auth shape: secretKey in body plus activityType NOTE", async () => {
  let captured;
  const res = await postContactNote({
    fetchImpl: async (url, opts) => {
      captured = { url, body: JSON.parse(opts.body) };
      return { ok: true, status: 200, text: async () => "Client Activity Successfully Created: 1" };
    },
    baseUrl: "https://example.builderprime.com/api",
    apiKey: "test-key-not-real",
    opportunityId: "12345",
    description: "hello",
  });
  assert.equal(res.ok, true);
  assert.equal(captured.url, "https://example.builderprime.com/api/client-activities/v1");
  assert.equal(captured.body.opportunityId, 12345);
  assert.equal(captured.body.activityType, "NOTE");
  assert.equal(captured.body.secretKey, "test-key-not-real");
  assert.equal(captured.body.description, "hello");
});

test("a throwing fetch resolves false, never throws", async () => {
  const res = await postContactNote({
    fetchImpl: async () => { throw new Error("network down"); },
    baseUrl: "https://example.builderprime.com/api",
    apiKey: "k",
    opportunityId: 1,
    description: "x",
  });
  assert.equal(res.ok, false);
  assert.equal(res.status, 0);
});

test("a non-2xx response resolves false, never throws", async () => {
  const res = await postContactNote({
    fetchImpl: async () => ({ ok: false, status: 401, text: async () => "Authentication Failed" }),
    baseUrl: "https://example.builderprime.com/api",
    apiKey: "k",
    opportunityId: 1,
    description: "x",
  });
  assert.equal(res.ok, false);
  assert.equal(res.status, 401);
});

// ---------------------------------------------------------------------------
// Route wiring: the note happens after creation and cannot fail the lead
// ---------------------------------------------------------------------------

test("send-lead route posts the note only after the record exists", () => {
  const src = readFileSync(join(ROOT, "app/api/send-lead/route.js"), "utf8");
  const created = src.indexOf("Builder Prime lead created");
  const noted = src.indexOf("postContactNote({");
  assert.ok(created > 0, "create log line missing");
  assert.ok(noted > created, "note post must come after the create succeeds");
  // The guard that ties the note to an existing record and a real message.
  assert.ok(src.includes("if (bpResult.opportunity_id && contactNote)"));
});
