// =============================================================================
// Lead form contract tests
// =============================================================================
// Run with: node --test "tests/*.test.js"
//        or: node --test tests/lead-form-contract.test.js
//
// WHY THIS FILE EXISTS
// 2026-08-10: an accessibility fix added an aria-label to the spam honeypot in
// lib/lead-guard.jsx. That input is the single most dangerous thing on the site
// to touch: its VALUE is what lib/lead-spam.js:334 uses to decide a submission
// is a bot, so renaming the field, changing what it is bound to, or breaking the
// guardFields() -> body mapping would either silently drop every real lead or
// silently accept every spam one. Neither failure is visible from the outside.
//
// These tests freeze the wire contract so a future edit to the markup cannot
// move the payload. They assert three things and nothing else:
//   1. the honeypot input's identity and wiring (name, value, onChange, and the
//      properties that keep it unreachable: aria-hidden ancestor, tabIndex -1)
//   2. guardFields() emits exactly { company, form_ms } and company is the trap
//   3. the representative lead form posts the same key set to the same endpoint,
//      and the server route still reads the two guard keys off the body
//
// SAFETY: this file performs NO network I/O and imports NO route. It reads
// source files off disk as text. lib/lead-guard.jsx cannot be imported here at
// all - it is JSX, which node --test does not parse - so source scanning is the
// available technique, and it is the same one tests/lead-submit.test.js already
// uses for its "no absolute URL in the module" assertion.
// =============================================================================

import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

const ROOT = path.resolve(import.meta.dirname, "..");
const read = (rel) => fs.readFileSync(path.join(ROOT, rel), "utf8");

/** Strip block and line comments so an assertion cannot be satisfied, or broken,
 *  by prose. tests/lead-submit.test.js uses the same technique for the same
 *  reason: this file's own explanatory comments mention the very tokens the
 *  assertions search for. */
const stripComments = (src) =>
  src.replace(/\/\*[\s\S]*?\*\//g, "").replace(/^\s*\/\/.*$/gm, "");

const GUARD = read("lib/lead-guard.jsx");
const GUARD_CODE = stripComments(GUARD);
const SUBMIT = read("lib/lead-submit.js");
const HOMEPAGE = read("app/page.jsx");
const SEND_LEAD_ROUTE = read("app/api/send-lead/route.js");
const SPAM = read("lib/lead-spam.js");

// ── 1. Honeypot identity and wiring ─────────────────────────────────────────

test("honeypot input name is still jr1_ref_x9", () => {
  assert.match(GUARD, /name="jr1_ref_x9"/);
});

test("honeypot is bound to trapValue, not to a renamed piece of state", () => {
  assert.match(GUARD, /value=\{trapValue\}/);
  assert.match(GUARD, /onChange=\{\(e\)\s*=>\s*setTrapValue\(e\.target\.value\)\}/);
});

test("honeypot stays out of the accessibility tree and out of the tab order", () => {
  // The wrapper carries aria-hidden. If that ever disappears, an aria-label on
  // the input would start being announced and a screen reader user would fill
  // the trap, which blocks a real lead. Assert both halves together.
  assert.match(GUARD, /aria-hidden="true"/);
  assert.match(GUARD, /tabIndex=\{-1\}/);
  assert.match(GUARD, /autoComplete="off"/);
});

test("honeypot is positioned off-screen rather than display:none", () => {
  // Some bots skip display:none / visibility:hidden inputs. The off-screen
  // technique is what makes this trap work; it is part of the contract.
  assert.match(GUARD, /left:\s*"-9999px"/);
  assert.ok(
    !/display:\s*"none"/.test(GUARD),
    "honeypot must not be display:none - bots skip those fields",
  );
});

test("the aria-label added for accessibility is never a visible label", () => {
  // A visible <label> here would be catastrophic: real people would fill the
  // trap and every genuine lead would score as spam. Assert no label element
  // was introduced into the guard markup.
  assert.ok(
    !/<label/.test(GUARD_CODE),
    "lead-guard must not render a label element for the honeypot",
  );
  assert.match(GUARD_CODE, /aria-label=/);
});

// ── 2. guardFields() wire shape ─────────────────────────────────────────────

test("guardFields() emits exactly company and form_ms", () => {
  const body = GUARD.slice(GUARD.indexOf("const guardFields"));
  const block = body.slice(0, body.indexOf("const honeypot"));
  const keys = [...block.matchAll(/^\s*(\w+):/gm)].map((m) => m[1]);
  assert.deepEqual(
    keys.sort(),
    ["company", "form_ms"],
    "the guard body must stay exactly { company, form_ms }",
  );
});

test("company is the trap value and form_ms is the fill time", () => {
  assert.match(GUARD, /company:\s*trapValue/);
  assert.match(GUARD, /form_ms:\s*Date\.now\(\)\s*-\s*mountedAt\.current/);
});

// ── 3. Endpoint and payload key set ─────────────────────────────────────────

test("submitLeadForm still defaults to the /api/send-lead endpoint", () => {
  assert.match(SUBMIT, /endpoint\s*=\s*"\/api\/send-lead"/);
});

test("submitLeadForm still POSTs JSON", () => {
  assert.match(SUBMIT, /method:\s*"POST"/);
  assert.match(SUBMIT, /"Content-Type":\s*"application\/json"/);
  assert.match(SUBMIT, /body:\s*JSON\.stringify\(body\)/);
});

test("the homepage lead form posts the same key set it posted before", () => {
  const start = HOMEPAGE.indexOf('formId: "homepage-main"');
  assert.ok(start > -1, "homepage-main lead form not found in app/page.jsx");
  const block = HOMEPAGE.slice(start, HOMEPAGE.indexOf("});", start));
  const bodyBlock = block.slice(block.indexOf("body: {"));
  // Matches both `name: value` and the ES6 shorthand `photos,` that this body uses.
  const keys = [...bodyBlock.matchAll(/^\s{10}(\w+)\s*[:,]/gm)].map((m) => m[1]);
  assert.ok(
    bodyBlock.includes("...guardFields()"),
    "homepage body must still spread guardFields()",
  );
  assert.deepEqual(
    keys.sort(),
    [
      "email",
      "gclid",
      "name",
      "page",
      "phone",
      "photos",
      "service",
      "utm_campaign",
      "utm_medium",
      "utm_source",
      "utm_term",
      "zip",
    ],
    "homepage lead payload keys changed",
  );
});

test("every lead form still spreads guardFields() into its body", () => {
  // 22 files call useLeadGuard(). Each must also spread the guard fields, or
  // that form's submissions arrive with no honeypot value and no fill time and
  // are scored on incomplete input.
  const files = [];
  const walk = (dir) => {
    for (const entry of fs.readdirSync(path.join(ROOT, dir))) {
      const rel = path.join(dir, entry);
      const stat = fs.statSync(path.join(ROOT, rel));
      if (stat.isDirectory()) walk(rel);
      else if (/\.jsx?$/.test(entry)) files.push(rel);
    }
  };
  walk("app");
  walk("components");

  const consumers = files.filter(
    (f) => f !== "lib/lead-guard.jsx" && read(f).includes("useLeadGuard"),
  );
  assert.ok(consumers.length >= 21, `expected 21+ lead forms, found ${consumers.length}`);
  for (const f of consumers) {
    assert.ok(
      read(f).includes("...guardFields()"),
      `${f} calls useLeadGuard() but never spreads guardFields() into a body`,
    );
  }
});

// ── 4. Server side still reads what the client sends ────────────────────────

test("the send-lead route still reads body.company and body.form_ms", () => {
  assert.match(SEND_LEAD_ROUTE, /company:\s*body\.company/);
  assert.match(SEND_LEAD_ROUTE, /form_ms:\s*body\.form_ms/);
});

test("the spam scorer still treats a non-empty company as a bot", () => {
  assert.match(SPAM, /lead\.company/);
  assert.match(SPAM, /lead\.form_ms/);
});

// ── 5. Visible NAP in the footer matches the structured data exactly ────────
// FIX 1 shipped the street address as readable text. If the footer string and
// the PostalAddress node ever drift apart, Google sees two different businesses.

test("footer street, city, state and ZIP match the PostalAddress node character for character", () => {
  const footer = read("components/SiteFooter.jsx");
  const layout = read("app/layout.js");

  const street = layout.match(/streetAddress:\s*"([^"]+)"/)[1];
  const city = layout.match(/addressLocality:\s*"([^"]+)"/)[1];
  const region = layout.match(/addressRegion:\s*"([^"]+)"/)[1];
  const zip = layout.match(/postalCode:\s*"([^"]+)"/)[1];
  const phone = layout.match(/telephone:\s*"([^"]+)"/)[1];

  assert.ok(footer.includes(street), `footer is missing the street "${street}"`);
  assert.ok(
    footer.includes(`${city}, ${region} ${zip}`),
    `footer is missing "${city}, ${region} ${zip}"`,
  );
  assert.ok(footer.includes(phone), `footer is missing the phone "${phone}"`);
  assert.ok(
    footer.includes("JR One Aluminum LLC"),
    "footer is missing the legal business name",
  );
});

test("the footer address is a semantic <address> element and is not hidden", () => {
  const footer = read("components/SiteFooter.jsx");
  assert.match(footer, /<address/);
  const block = footer.slice(footer.indexOf("<address"), footer.indexOf("</address>"));
  for (const hidden of ["display: \"none\"", "visibility: \"hidden\"", "opacity: 0", "-9999px"]) {
    assert.ok(!block.includes(hidden), `footer address must not be hidden by ${hidden}`);
  }
});
