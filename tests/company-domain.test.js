// =============================================================================
// Company-domain email rejection
// =============================================================================
// Run with: node --test "tests/*.test.js"
//        or: node --test tests/company-domain.test.js
//
// ── HOW REAL MAIL AND REAL BUILDERPRIME WRITES ARE MADE IMPOSSIBLE ───────────
// Same three guarantees tests/homepage-email-capture.test.js relies on:
//
// 1. This file imports only lib/company-domain.js, lib/homepage-email-capture.js
//    and lib/roi-capture.js. None of the three contains a network primitive or
//    reads a credential. The last test in this file proves that mechanically for
//    lib/company-domain.js by scanning its own source with comments stripped.
//
// 2. BOTH side effects are INJECTED. runHomepageCapture() and runRoiCapture()
//    take createBpClient and sendNotification as arguments. Every test here
//    passes a stub that RECORDS its calls and returns a canned result, so the
//    real BuilderPrime fetch and the real nodemailer send are never constructed.
//    The route file that owns the real implementations is never imported (it
//    pulls in next/server, which does not resolve outside the Next bundler).
//
// 3. No test supplies an API key or an SMTP credential and none is read from the
//    environment, so a stub that tried to reach the network would have nothing
//    to authenticate with.
//
// The strongest assertion in this file is a NEGATIVE one: for a company-domain
// address the BuilderPrime stub records ZERO calls. That is what "rejected
// before the API call" means, and counting stub calls is the only way to prove
// ordering rather than assume it.
// =============================================================================
import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

import {
  isCompanyDomainEmail,
  companyDomainRejection,
  logCompanyDomainRejection,
  COMPANY_DOMAIN_LOG_TAG,
} from "../lib/company-domain.js";
import { runHomepageCapture } from "../lib/homepage-email-capture.js";
import { runRoiCapture } from "../lib/roi-capture.js";

/** Records every call so a test can assert the count, including zero. */
function recordingStubs({ bpOk = true, emailOk = true } = {}) {
  const calls = { bp: [], email: [], logs: [] };
  return {
    calls,
    createBpClient: async (payload) => {
      calls.bp.push(payload);
      return { ok: bpOk, opportunityId: bpOk ? "STUB-OPP-1" : null };
    },
    sendNotification: async (msg) => {
      calls.email.push(msg);
      return { ok: emailOk };
    },
    logger: (line) => calls.logs.push(line),
  };
}

// ── The detector itself ──────────────────────────────────────────────────────

test("isCompanyDomainEmail() - the company domain is detected", () => {
  assert.equal(isCompanyDomainEmail("chris@jronegutters.com"), true);
  assert.equal(isCompanyDomainEmail("info@jronegutters.com"), true);
});

test("isCompanyDomainEmail() - case and whitespace do not evade it", () => {
  assert.equal(isCompanyDomainEmail("  Chris@JRONEGUTTERS.com  "), true);
});

test("isCompanyDomainEmail() - subdomains count", () => {
  assert.equal(isCompanyDomainEmail("bounce@mail.jronegutters.com"), true);
});

test("isCompanyDomainEmail() - ordinary customer addresses are untouched", () => {
  for (const e of [
    "someone@gmail.com",
    "someone@yahoo.com",
    "person@aol.com",
    "buyer@spacetech-i.com",
  ]) {
    assert.equal(isCompanyDomainEmail(e), false, `${e} must not be flagged`);
  }
});

test("isCompanyDomainEmail() - a lookalike domain is NOT the company domain", () => {
  // Substring matching would wrongly flag these. Only the domain and its
  // subdomains count.
  assert.equal(isCompanyDomainEmail("someone@notjronegutters.com"), false);
  assert.equal(isCompanyDomainEmail("someone@jronegutters.com.evil.net"), false);
});

test("isCompanyDomainEmail() - junk input does not throw and is not flagged", () => {
  for (const e of [null, undefined, "", "no-at-sign", "trailing@", "@leading"]) {
    assert.equal(isCompanyDomainEmail(e), false);
  }
});

// ── What the submitter is told ───────────────────────────────────────────────

test("companyDomainRejection() - 400 with an actionable message", () => {
  const r = companyDomainRejection();
  // 400, not 500: the request was understood and refused. A 500 is what made
  // this look like an outage in the first place.
  assert.equal(r.status, 400);
  assert.match(r.error, /cannot save it/i);
  assert.match(r.error, /different email address/i);
  assert.match(r.error, /\(844\) 444-3114/);
});

test("the message carries no banned punctuation", () => {
  const r = companyDomainRejection();
  for (const ch of ["—", "–", "’", "“", "”", "…"]) {
    assert.ok(!r.error.includes(ch), `message must not contain ${escape(ch)}`);
  }
});

// ── The distinct log line ────────────────────────────────────────────────────

test("logCompanyDomainRejection() - tagged and says it is NOT an outage", () => {
  const seen = [];
  const line = logCompanyDomainRejection({
    surface: "homepage-email-capture",
    email: "chris@jronegutters.com",
    logger: (l) => seen.push(l),
  });
  assert.equal(seen.length, 1);
  assert.ok(line.includes(`[${COMPANY_DOMAIN_LOG_TAG}]`), "must carry the grep tag");
  assert.ok(line.includes("homepage-email-capture"), "must name the surface");
  assert.match(line, /not an integration failure/i);
});

// ── Homepage box: rejected BEFORE the API call ───────────────────────────────

test("homepage capture - company domain never reaches BuilderPrime or the inbox", async () => {
  const s = recordingStubs();
  const res = await runHomepageCapture({
    email: "chris@jronegutters.com",
    page: "/",
    timestampEt: "9:00 AM",
    createBpClient: s.createBpClient,
    sendNotification: s.sendNotification,
    logger: s.logger,
  });

  // THE ASSERTION THAT MATTERS: zero calls. Not "the call failed" - never made.
  assert.equal(s.calls.bp.length, 0, "BuilderPrime must not be called at all");
  assert.equal(s.calls.email.length, 0, "no notification should be sent either");

  assert.equal(res.outcome.ok, false);
  assert.equal(res.outcome.status, 400);
  assert.equal(res.outcome.companyDomain, true);
  assert.match(res.outcome.error, /different email address/i);
  assert.equal(s.calls.logs.length, 1, "exactly one tagged log line");
  assert.ok(s.calls.logs[0].includes(COMPANY_DOMAIN_LOG_TAG));
});

test("homepage capture - a normal address still succeeds, unchanged", async () => {
  const s = recordingStubs();
  const res = await runHomepageCapture({
    email: "someone@gmail.com",
    page: "/",
    timestampEt: "9:00 AM",
    createBpClient: s.createBpClient,
    sendNotification: s.sendNotification,
    logger: s.logger,
  });

  assert.equal(s.calls.bp.length, 1, "BuilderPrime must still be called");
  assert.equal(s.calls.email.length, 1, "the notification must still be sent");
  assert.equal(res.outcome.ok, true);
  assert.equal(res.outcome.status, 200);
  assert.equal(res.bp.ok, true);
  assert.equal(res.bp.opportunityId, "STUB-OPP-1");
  assert.equal(s.calls.logs.length, 0, "no rejection should be logged");
});

test("homepage capture - the guard does not swallow ordinary failures", async () => {
  // A normal address whose BuilderPrime write fails must still behave the old
  // way: the notification carries the lead and the visitor gets a success.
  const s = recordingStubs({ bpOk: false, emailOk: true });
  const res = await runHomepageCapture({
    email: "someone@gmail.com",
    createBpClient: s.createBpClient,
    sendNotification: s.sendNotification,
    logger: s.logger,
  });
  assert.equal(s.calls.bp.length, 1);
  assert.equal(s.calls.email.length, 1);
  assert.equal(res.outcome.ok, true, "the email half still saves the lead");
  assert.notEqual(res.outcome.companyDomain, true);
});

// ── ROI calculator: same rule ────────────────────────────────────────────────

test("ROI capture - company domain never reaches BuilderPrime or the inbox", async () => {
  const s = recordingStubs();
  const res = await runRoiCapture({
    email: "chris@jronegutters.com",
    page: "/roi",
    createBpClient: s.createBpClient,
    sendNotification: s.sendNotification,
    logger: s.logger,
  });
  assert.equal(s.calls.bp.length, 0, "BuilderPrime must not be called at all");
  assert.equal(s.calls.email.length, 0);
  assert.equal(res.outcome.status, 400);
  assert.equal(res.outcome.companyDomain, true);
});

test("ROI capture - a normal address still succeeds, unchanged", async () => {
  const s = recordingStubs();
  const res = await runRoiCapture({
    email: "someone@gmail.com",
    page: "/roi",
    roi: {},
    createBpClient: s.createBpClient,
    sendNotification: s.sendNotification,
    logger: s.logger,
  });
  assert.equal(s.calls.bp.length, 1);
  assert.equal(s.calls.email.length, 1);
  assert.equal(res.outcome.ok, true);
  assert.equal(res.outcome.status, 200);
});

// ── Proof this suite cannot touch production ─────────────────────────────────

test("lib/company-domain.js contains no transport and no credential read", () => {
  const raw = fs.readFileSync(
    path.join(process.cwd(), "lib", "company-domain.js"),
    "utf8"
  );
  const code = raw
    .replace(/\/\*[\s\S]*?\*\//g, " ")
    .replace(/(^|[^:])\/\/.*$/gm, "$1");

  for (const forbidden of [
    "fetch(", "https:/", "process.env", "nodemailer", "require(",
    "XMLHttpRequest", "child_process", "readFile", "writeFile",
  ]) {
    assert.ok(
      !code.toLowerCase().includes(forbidden.toLowerCase()),
      `lib/company-domain.js CODE must not contain ${forbidden}`
    );
  }
  assert.ok(code.length < raw.length, "comment stripping must have removed something");
  assert.ok(
    code.includes("export function isCompanyDomainEmail"),
    "the real detector must survive stripping"
  );
});
