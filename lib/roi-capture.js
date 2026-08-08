// =============================================================================
// ROI calculator lead capture
// =============================================================================
// public/roi-calculator.html is a standalone, deliberately unlinked tool
// (allow-listed in middleware.js:30, documented in manual-steps.md:111). Its
// only call to action was:
//
//     <button class="cta" onclick="alert('Contact JRone Gutters for a free
//                                         inspection and quote!')">
//
// An alert() captures nothing. The visitor moved four sets of sliders, watched
// the tool compute an investment figure, an annual value, a ten year value, a
// ROI percentage and a payback period, pressed the button, got a browser dialog
// and left. Nothing was recorded and nobody was told. This is the third dead
// lead capture found on this site, after the homepage email band
// (lib/homepage-email-capture.js) and the 21 React forms that always drew a
// checkmark (commit 5f7f333).
//
// ── WHY THIS IS NOT A NEW ROUTE ──────────────────────────────────────────────
// The capture posts to the EXISTING /api/send-lead route. That route already
// carries the origin allow-list (app/api/send-lead/route.js:38), the per-IP
// rate limit (route.js:43, 5/min), the input validation and the honeypot via
// assessLeadSpam. A second route would mean a second copy of all four, and
// copies drift. This module holds only the parts unique to the ROI tool, and
// deliberately imports the shared email validator and the shared outcome
// resolver from lib/homepage-email-capture.js rather than restating them.
//
// Like lib/homepage-email-capture.js and lib/estimator-lead.js, this module has
// NO imports from next/server and performs NO I/O, because `node --test` cannot
// import a route file: it pulls in next/server, which does not resolve outside
// the Next bundler. Anything a test needs to drive lives here, and the route
// calls it. There is exactly one copy of the control flow and both the route
// and the tests run it.
//
// ── CARRYING THE NUMBERS ONTO THE RECORD ─────────────────────────────────────
// lib/estimator-lead.js:35-40 records what was learned by reading
// GET /api/clients across 334 records:
//
//   VERIFIED writable + readable: firstName, lastName, emailAddress,
//     phoneNumber, addressLine1, city, state, zip, companyName,
//     leadSourceDescription, projectTypeDescription, buildingTypeDescription.
//   NOT CONFIRMED: estimatedValue (0 of 334 records carry a value),
//     externalId (0 of 334), customFields (no custom key came back on any
//     record), closeProbability (1 of 334).
//
// UNKNOWN, and deliberately left unresolved here: the instruction that produced
// this file states that BuilderPrime silently drops lead source, service type
// and building type. The on-disk note quoted above lists those same three as
// verified readable. Both cannot be true, and this session has no BuilderPrime
// API key to re-read the 334 records and settle it. Rather than pick a side,
// this module is written so that it does not matter: the computed numbers go
// into firstName and lastName, which are confirmed readable under BOTH
// readings, AND leadSourceDescription / projectTypeDescription /
// buildingTypeDescription are sent as a best effort. If the three fields do
// read back the rep gets the same answer twice. If they are dropped, nothing is
// lost. That is the same belt-and-braces the estimator already uses for
// estimatedValue (lib/estimator-lead.js:315-321).
//
// The full slider-by-slider breakdown has no readable BuilderPrime home at all,
// so it goes in the info@jronegutters.com notification, which is monitored by
// hand. That limitation is BuilderPrime's, not this code's.
//
// ── WHY THE NAME IS WHAT IT IS ───────────────────────────────────────────────
// BuilderPrime requires a lastName, so something must go in the name fields,
// and there is no update verb so whatever goes in is permanent. The convention
// established at lib/estimator-lead.js:112 and followed by
// lib/homepage-email-capture.js:55 puts the SOURCE in firstName and the job
// summary in lastName. This module follows that same convention rather than
// inventing a third one. A rep scanning the CRM list reads
//
//     ROI Calculator / $9,770 in, $5,420/yr, 455% 10-yr
//
// and knows what it is and how big it is without opening anything.
//
// The banned placeholder "Estimator Lead" (lib/estimator-lead.js:52) is not
// used here, and no person's name is invented: the tool collects an email
// address only, so writing a plausible human name would be fabricating data
// into a CRM that has no DELETE.
// =============================================================================

import {
  JR_ONE_PHONE,
  isValidCaptureEmail,
  resolveCaptureOutcome,
} from "./homepage-email-capture.js";

// Re-exported so the route and the tests have one import site for the whole
// capture vocabulary, and so nothing is tempted to restate the validator.
export { JR_ONE_PHONE, isValidCaptureEmail, resolveCaptureOutcome };

/** Marks a submission as coming from the ROI calculator. The route uses this
 *  to relax the name+phone requirement for THIS shape only. */
export const ROI_CAPTURE_TYPE = "roi-calculator";

/** Source goes in firstName because firstName is confirmed to read back.
 *  Never "Estimator Lead". */
export const ROI_CAPTURE_FIRST_NAME = "ROI Calculator";

/** Second home for the source, sent as a best effort. See the header note. */
export const ROI_CAPTURE_LEAD_SOURCE = "Website ROI Calculator";

/** Used when the visitor moved no sliders we could read. BuilderPrime requires
 *  a non-empty lastName, and a stable label beats an empty string. */
export const ROI_CAPTURE_FALLBACK_LAST_NAME = "Tampa Bay";

/** Longest lastName this will write. BuilderPrime's real limit is UNKNOWN, so
 *  this is a conservative self-imposed cap rather than a measured one. */
export const ROI_LAST_NAME_MAX = 80;

/**
 * Is this submission the ROI calculator?
 */
export function isRoiCapture(body) {
  return Boolean(body) && body.captureType === ROI_CAPTURE_TYPE;
}

/** Whole dollars with thousands separators, or "" when there is no number. */
function money(n) {
  const v = Number(n);
  if (!Number.isFinite(v) || v <= 0) return "";
  return `$${Math.round(v).toLocaleString("en-US")}`;
}

/**
 * A finite number, or null.
 *
 * Guards against NaN and Infinity arriving from a hand-edited request body, and
 * against the JavaScript coercions that quietly turn "absent" into zero:
 * Number(null) is 0, Number("") is 0, Number([]) is 0 and Number(false) is 0.
 * Without the first guard a payload that simply omitted roiPct produced the
 * summary "0% 10-yr", which is not a missing value, it is a claim that the
 * customer's return is zero, written permanently into a CRM with no DELETE.
 * Caught by tests/roi-capture.test.js "BuilderPrime still gets a usable
 * lastName when no figures arrive".
 */
function num(n) {
  if (n === null || n === undefined || n === "" || typeof n === "boolean") return null;
  const v = Number(n);
  if (!Number.isFinite(v)) return null;
  return v;
}

/** A finite positive integer percentage, or "". */
function pct(n) {
  const v = num(n);
  if (v === null) return "";
  return `${Math.round(v)}%`;
}

/**
 * Normalise the calculator's computed figures into a flat, trusted shape.
 *
 * Everything arriving here came from the browser and is therefore untrusted:
 * a hand-crafted POST could carry strings, nulls, NaN or Infinity. Each field
 * is coerced independently and a bad field becomes null rather than poisoning
 * the whole record. This is what stops "$NaN" from being written permanently
 * into a CRM with no DELETE.
 */
export function normalizeRoiFigures(roi = {}) {
  const r = roi && typeof roi === "object" ? roi : {};
  return {
    investment: num(r.investment),
    annualValue: num(r.annualValue),
    tenYearValue: num(r.tenYearValue),
    roiPct: num(r.roiPct),
    paybackYears: num(r.paybackYears),
  };
}

/**
 * The one-line summary written into lastName.
 *
 * Confirmed readable, permanent, and the only place the numbers are guaranteed
 * to survive. Built from whichever figures actually arrived, so a partial
 * payload still produces something useful instead of a row of placeholders.
 */
export function buildRoiSummary(roi = {}) {
  const f = normalizeRoiFigures(roi);
  const parts = [];
  const invest = money(f.investment);
  const annual = money(f.annualValue);
  const roiPct = pct(f.roiPct);
  if (invest) parts.push(`${invest} in`);
  if (annual) parts.push(`${annual}/yr`);
  if (roiPct) parts.push(`${roiPct} 10-yr`);
  const summary = parts.join(", ");
  if (!summary) return "";
  return summary.length > ROI_LAST_NAME_MAX
    ? summary.slice(0, ROI_LAST_NAME_MAX).trimEnd()
    : summary;
}

/**
 * Build the BuilderPrime create-client payload for an ROI calculator capture.
 *
 * No phone and no address: the tool collects neither, and fabricating either
 * would put invented data in a CRM that has no DELETE. An empty phone is also
 * neutral to the spam scorer (lib/lead-spam.js only judges a 10-digit number),
 * so this shape cannot trip the undialable-phone rule.
 */
export function buildRoiCaptureBpPayload({ email, roi } = {}) {
  const summary = buildRoiSummary(roi);
  const lastName = summary || ROI_CAPTURE_FALLBACK_LAST_NAME;
  const figures = normalizeRoiFigures(roi);

  const payload = {
    userAccount: {
      firstName: ROI_CAPTURE_FIRST_NAME,
      lastName,
      emailAddress: email || "",
    },
    emailAddress: email || "",
    leadSourceDescription: ROI_CAPTURE_LEAD_SOURCE,
    buildingTypeDescription: "Single Family",
    // "Gutters" is the account's existing catch-all project type (56 records
    // per lib/estimator-lead.js:168-170). The ROI tool spans gutters, guards,
    // soffit and roof at once and never asks which one the visitor actually
    // wants, so naming a narrower type would be inventing an intent a rep
    // would then act on.
    projectTypeDescription: "Gutters",
    addressLine1: "",
    city: "",
    state: "FL",
    zip: "",
  };

  // Best effort only. NOT CONFIRMED writable: no record in the account carries
  // estimatedValue (lib/estimator-lead.js:38). The figure is ALSO encoded into
  // lastName above, which is the copy that is actually relied on.
  if (figures.investment && figures.investment > 0) {
    payload.estimatedValue = Math.round(figures.investment);
  }

  return payload;
  // NOTE: the origin page and the slider detail are deliberately NOT sent to
  // BuilderPrime. There is no confirmed-readable field for either (customFields
  // came back on 0 of 334 records per lib/estimator-lead.js:38-40), and an
  // unrecognised key risks a 500 on the create. Both go in the info@
  // notification instead, which a human reads.
}

/** One "Label: value" line, or null when there is nothing to say. */
function line(label, value) {
  if (value === null || value === undefined || value === "") return null;
  return `${label.padEnd(24)} ${value}`;
}

/**
 * Render the slider inputs the visitor actually chose.
 *
 * This is the detail that has no readable BuilderPrime home, so the info@
 * notification is the only place it survives. A rep can see that the quote is
 * for 200 linear feet with 5 downspouts before picking up the phone.
 */
export function buildRoiInputLines(inputs = {}) {
  const i = inputs && typeof inputs === "object" ? inputs : {};
  const out = [];

  const g = i.gutters && typeof i.gutters === "object" ? i.gutters : null;
  if (g) {
    const bits = [];
    if (num(g.linearFeet) !== null) bits.push(`${num(g.linearFeet)} LF`);
    if (num(g.downspouts) !== null) bits.push(`${num(g.downspouts)} downspouts`);
    if (g.needsRepair) bits.push("existing damage noted");
    if (bits.length) out.push(line("Gutters:", bits.join(", ")));
  }

  const gd = i.guards && typeof i.guards === "object" ? i.guards : null;
  if (gd) {
    const bits = [];
    if (num(gd.linearFeet) !== null) bits.push(`${num(gd.linearFeet)} LF`);
    if (gd.type) bits.push(String(gd.type).slice(0, 40));
    if (num(gd.cleaningsPerYear) !== null) {
      bits.push(`${num(gd.cleaningsPerYear)} cleanings/yr`);
    }
    if (gd.heavyTrees) bits.push("heavy tree cover");
    if (bits.length) out.push(line("Gutter guards:", bits.join(", ")));
  }

  const sf = i.soffit && typeof i.soffit === "object" ? i.soffit : null;
  if (sf) {
    const bits = [];
    if (num(sf.linearFeet) !== null) bits.push(`${num(sf.linearFeet)} LF`);
    if (num(sf.monthlyBill) !== null) {
      bits.push(`$${Math.round(num(sf.monthlyBill))}/mo power bill`);
    }
    if (sf.rot) bits.push("rot noted");
    if (sf.pests) bits.push("pests noted");
    if (bits.length) out.push(line("Soffit and fascia:", bits.join(", ")));
  }

  const rf = i.roof && typeof i.roof === "object" ? i.roof : null;
  if (rf) {
    const bits = [];
    if (num(rf.squareFeet) !== null) {
      bits.push(`${Math.round(num(rf.squareFeet)).toLocaleString("en-US")} sq ft`);
    }
    if (num(rf.ageYears) !== null) bits.push(`${num(rf.ageYears)} years old`);
    if (num(rf.insuranceAnnual) !== null) {
      bits.push(`$${Math.round(num(rf.insuranceAnnual)).toLocaleString("en-US")}/yr insurance`);
    }
    if (bits.length) out.push(line("Roof:", bits.join(", ")));
  }

  return out.filter(Boolean);
}

/**
 * Build the internal notification for info@jronegutters.com.
 *
 * INTERNAL, not customer-facing, so it deliberately does NOT go through the
 * branded customer chokepoint (that gate is for mail a customer receives). It
 * is a plain-text operator notice carrying everything the tool knew: the
 * address, every computed figure, every slider the visitor moved, the page and
 * the time in Eastern.
 */
export function buildRoiCaptureNotification({
  email,
  page,
  timestampEt,
  lang,
  roi,
  inputs,
} = {}) {
  const addr = String(email || "").trim() || "(no address captured)";
  const where = String(page || "/roi-calculator.html").trim() || "/roi-calculator.html";
  const when = String(timestampEt || "").trim() || "(no timestamp)";
  const language = String(lang || "").trim().toLowerCase() === "es" ? "Spanish" : "English";
  const f = normalizeRoiFigures(roi);

  const figureLines = [
    line("Combined investment:", money(f.investment)),
    line("Annual value:", f.annualValue ? `${money(f.annualValue)}/yr` : ""),
    line("10-year value:", money(f.tenYearValue)),
    line("10-year ROI:", pct(f.roiPct)),
    line(
      "Payback:",
      f.paybackYears !== null ? `${Number(f.paybackYears).toFixed(1)} yrs` : ""
    ),
  ].filter(Boolean);

  const inputLines = buildRoiInputLines(inputs);

  const body = [
    "Someone finished the ROI calculator and asked for a free inspection.",
    "",
    `Email address: ${addr}`,
    `Page:          ${where}`,
    `Language:      ${language}`,
    `Time (ET):     ${when}`,
    "",
    "WHAT THE CALCULATOR SHOWED THEM",
  ];

  if (figureLines.length) {
    body.push(...figureLines);
  } else {
    body.push("(no figures were submitted with this capture)");
  }

  if (inputLines.length) {
    body.push("", "WHAT THEY ENTERED", ...inputLines);
  }

  body.push(
    "",
    "These figures are the calculator's own estimate from the sliders this",
    "visitor moved. They are NOT a quote and were never priced by a human.",
    "",
    "The tool collects an email address only. There is no name, no phone",
    "number and no property address, because the calculator does not ask for",
    "them. Reply to the address above to book the inspection.",
    "",
    "This is an internal notification from jronegutters.com."
  );

  return {
    subject: `ROI calculator lead: ${addr}`,
    text: body.join("\n"),
  };
}

/**
 * Run both halves of an ROI capture, independently.
 *
 * The two side effects are INJECTED rather than called directly. That is what
 * makes the independence guarantee testable instead of merely asserted: a test
 * passes stubs and can therefore drive the real orchestration through
 * BuilderPrime-fails, email-fails and both-fail without a network stack, an API
 * key, or any possibility of touching production or sending real mail. The
 * route passes the real implementations.
 *
 * The independence is structural, not a matter of ordering: each half is
 * awaited inside its own try/catch, so a throw or a rejection in one cannot
 * skip the other. A thrown error is captured as a failed half, never
 * propagated, because a lead must not be lost to an exception in the other
 * half's transport.
 *
 * @param {object}   args
 * @param {string}   args.email
 * @param {string}   [args.page]
 * @param {string}   [args.timestampEt]
 * @param {string}   [args.lang]
 * @param {object}   [args.roi]     computed figures
 * @param {object}   [args.inputs]  slider values
 * @param {Function} args.createBpClient   async (payload) => {ok, opportunityId?, error?}
 * @param {Function} args.sendNotification async ({subject,text}) => {ok, error?}
 * @returns {Promise<{bp:object, notification:object, outcome:object}>}
 */
export async function runRoiCapture({
  email,
  page,
  timestampEt,
  lang,
  roi,
  inputs,
  createBpClient,
  sendNotification,
} = {}) {
  const bp = { ok: false, opportunityId: null, error: null };
  const notification = { ok: false, error: null };

  // -- Half 1 --
  try {
    if (typeof createBpClient !== "function") {
      bp.error = "no BuilderPrime writer configured";
    } else {
      const res = await createBpClient(buildRoiCaptureBpPayload({ email, roi }));
      bp.ok = Boolean(res && res.ok);
      bp.opportunityId = (res && res.opportunityId) || null;
      bp.error = bp.ok ? null : (res && res.error) || "BuilderPrime create failed";
    }
  } catch (err) {
    bp.ok = false;
    bp.error = err && err.message ? err.message : String(err);
  }

  // -- Half 2. Runs regardless of what Half 1 did. --
  try {
    if (typeof sendNotification !== "function") {
      notification.error = "no notifier configured";
    } else {
      const res = await sendNotification(
        buildRoiCaptureNotification({ email, page, timestampEt, lang, roi, inputs })
      );
      notification.ok = Boolean(res && res.ok);
      notification.error = notification.ok
        ? null
        : (res && res.error) || "notification failed";
    }
  } catch (err) {
    notification.ok = false;
    notification.error = err && err.message ? err.message : String(err);
  }

  return {
    bp,
    notification,
    // Reused, not restated: the "only say sent after something actually
    // succeeded" rule lives in exactly one place.
    outcome: resolveCaptureOutcome({ bpOk: bp.ok, emailOk: notification.ok }),
  };
}
