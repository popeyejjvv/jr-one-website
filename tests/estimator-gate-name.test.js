// =============================================================================
// Estimator phone-gate name field: markup + bilingual strings
// =============================================================================
// Run: node --test tests/estimator-gate-name.test.js
//
// The estimator is customer-facing and bilingual. Every visitor-visible string
// added for the gate name field must exist in BOTH language dictionaries in
// public/estimator.html, and the input must sit in the soft gate so the name
// rides the FIRST /api/estimator-lead call (the one that creates the record).

import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const html = readFileSync(join(ROOT, "public/estimator.html"), "utf8");

test("gate name input exists inside the soft gate, before the phone input", () => {
  const gate = html.indexOf('id="softGate"');
  const nameInput = html.indexOf('id="gateNameInput"');
  const phoneInput = html.indexOf('id="phoneInput"');
  assert.ok(gate > 0);
  assert.ok(nameInput > gate, "name input must be inside the soft gate");
  assert.ok(phoneInput > nameInput, "name comes before the phone field");
});

test("gate name placeholder ships in English AND Spanish", () => {
  assert.ok(html.includes("gate_name:'Your Name (optional)'"), "EN string missing");
  assert.ok(html.includes("gate_name:'Tu Nombre (opcional)'"), "ES string missing");
});

test("the create-call payload carries the gate name", () => {
  // sendToJROne is the call that creates the BuilderPrime record. The gate
  // name must be in ITS payload; the late custName field on the email form is
  // a separate, unchanged path.
  const fn = html.slice(html.indexOf("async function sendToJROne"), html.indexOf("function reportSubmitFailure"));
  assert.ok(fn.includes("customerName:customerGateName"));
});

test("unlock still fires with the name left blank", () => {
  // The gate button's enabled state is driven ONLY by phone length
  // (formatPhone). A blank name must not gate the unlock.
  const fmt = html.slice(html.indexOf("function formatPhone"), html.indexOf("async function unlockEstimate"));
  assert.ok(fmt.includes("disabled=v.replace(/\\D/g,'').length<10"));
  assert.ok(!fmt.includes("gateNameInput"), "phone formatting must not read the name field");
});
