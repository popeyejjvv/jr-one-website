// =============================================================================
// Homepage email capture
// =============================================================================
// The gold "email capture" band on the homepage (app/page.jsx) collected an
// address, showed the visitor a confirmation, and threw the address away. The
// handler set a success flag and called no API at all. It shipped in the very
// first commit, a5621f3 on 2026-04-02, and was never touched after that, so
// every address typed into that box between 2026-04-02 and 2026-08-08 is gone.
// There is no log to recover them from, because nothing was ever sent.
//
// This module holds the pure parts of the fix. It deliberately has NO imports
// from next/server and performs NO I/O, for the same reason lib/estimator-lead.js
// does not: `node --test` cannot import a route file (it pulls in next/server,
// which does not resolve outside the Next bundler), so logic that lives in the
// route cannot be tested against the real code. Anything a test needs to drive
// lives here and the route calls it.
//
// ── WHAT BUILDERPRIME REQUIRES ───────────────────────────────────────────────
// VERIFIED, from app/api/send-lead/route.js:16-18: the create-client schema
// requires a nested `userAccount` object carrying firstName and lastName.
// Top-level firstName/lastName returns 500.
//
// VERIFIED, from lib/estimator-lead.js:35-37, established by reading
// GET /api/clients across 334 records: firstName, lastName, emailAddress,
// phoneNumber, addressLine1, city, state, zip, companyName,
// leadSourceDescription, projectTypeDescription and buildingTypeDescription all
// write AND read back. customFields did NOT come back on any of the 334
// records, so nothing that matters may be stored there.
//
// UNKNOWN: whether BuilderPrime accepts a client with NO phone number. Every
// existing write path on this site sends one, so there is no evidence either
// way, and the API key is not readable from this session to probe it. This is
// precisely why the route runs the CRM write and the info@ notification
// independently: if BuilderPrime rejects a phoneless create, the address still
// reaches a monitored human inbox and the lead is not lost.
//
// ── WHY THE NAME IS WHAT IT IS ───────────────────────────────────────────────
// BuilderPrime requires a lastName, so something must go in the name fields.
// lib/estimator-lead.js:52 records the rule learned the hard way: the old
// "Estimator Lead" placeholder is banned because it is indistinguishable from
// internal test rows and reads like a person. The convention that replaced it
// (lib/estimator-lead.js:112) puts the SOURCE in firstName, which is confirmed
// readable. This module follows that same convention rather than inventing a
// second one, so a rep scanning the CRM list reads "Homepage Email Capture" and
// knows exactly what it is without opening anything, and no automation can
// mistake it for a human's name.
// =============================================================================

import {
  isCompanyDomainEmail,
  companyDomainRejection,
  logCompanyDomainRejection,
} from "./company-domain.js";

/** Marks a submission as coming from the homepage email band. The route uses
 *  this to relax the name+phone requirement for THIS shape only. */
export const HOMEPAGE_CAPTURE_TYPE = "homepage-email";

/** Source goes in firstName because firstName is confirmed to read back and
 *  leadSourceDescription is not trusted to. Never "Estimator Lead". */
export const HOMEPAGE_CAPTURE_FIRST_NAME = "Homepage Email";
export const HOMEPAGE_CAPTURE_LAST_NAME = "Capture";

/** Also sent, as a second home for the source. Cheap, and if this field does
 *  read back the rep gets the same answer from two places. */
export const HOMEPAGE_CAPTURE_LEAD_SOURCE = "Website Homepage Email Capture";

export const JR_ONE_PHONE = "(844) 444-3114";

/**
 * Is this submission the homepage email band?
 */
export function isHomepageCapture(body) {
  return Boolean(body) && body.captureType === HOMEPAGE_CAPTURE_TYPE;
}

/**
 * Validate an email address well enough to refuse obvious junk before ANY
 * network call is made.
 *
 * Deliberately permissive about the local part and the TLD: the job here is to
 * reject things that cannot be an address at all, not to adjudicate exotic but
 * legal addresses. Over-tight email regexes reject real customers, and on this
 * site a rejected real customer is the expensive failure.
 */
export function isValidCaptureEmail(email) {
  if (typeof email !== "string") return false;
  const e = email.trim();
  if (e.length < 6 || e.length > 254) return false;
  if (/\s/.test(e)) return false;
  const parts = e.split("@");
  if (parts.length !== 2) return false;
  const [local, domain] = parts;
  if (!local || local.length > 64) return false;
  if (!domain || domain.length > 253) return false;
  if (!domain.includes(".")) return false;
  if (domain.startsWith(".") || domain.endsWith(".")) return false;
  if (domain.includes("..")) return false;
  const tld = domain.slice(domain.lastIndexOf(".") + 1);
  if (tld.length < 2 || !/^[a-zA-Z]+$/.test(tld)) return false;
  return /^[^@]+@[A-Za-z0-9.-]+$/.test(e);
}

/**
 * Build the BuilderPrime create-client payload for a homepage email capture.
 *
 * No phone, no address: the box collects neither, and fabricating either would
 * put invented data in a CRM that has no DELETE. An empty phone is also neutral
 * to the spam scorer (lib/lead-spam.js only judges a 10-digit number), so this
 * shape cannot trip the undialable-phone rule.
 */
export function buildHomepageCaptureBpPayload({ email, page } = {}) {
  return {
    userAccount: {
      firstName: HOMEPAGE_CAPTURE_FIRST_NAME,
      lastName: HOMEPAGE_CAPTURE_LAST_NAME,
      emailAddress: email || "",
    },
    emailAddress: email || "",
    leadSourceDescription: HOMEPAGE_CAPTURE_LEAD_SOURCE,
    buildingTypeDescription: "Single Family",
    // Left empty on purpose. The visitor told us nothing about the job, and
    // guessing a project type would be inventing data a rep would then act on.
    projectTypeDescription: "",
    addressLine1: "",
    city: "",
    state: "FL",
    zip: "",
  };
  // NOTE: the origin page is deliberately NOT sent to BuilderPrime. There is no
  // confirmed-readable field for it (customFields came back on 0 of 334 records
  // per lib/estimator-lead.js:38-40), and an unrecognised key risks a 500 on the
  // create. It goes in the info@ notification instead, which a human reads.
}

/**
 * Build the internal notification for info@jronegutters.com.
 *
 * INTERNAL, not customer-facing, so it deliberately does NOT go through the
 * branded customer chokepoint. It is a plain-text operator notice: what came
 * in, the address, the page, and the time in Eastern.
 */
export function buildHomepageCaptureNotification({ email, page, timestampEt } = {}) {
  const addr = String(email || "").trim() || "(no address captured)";
  const where = String(page || "/").trim() || "/";
  const when = String(timestampEt || "").trim() || "(no timestamp)";
  return {
    subject: `Homepage email capture: ${addr}`,
    text: [
      "Someone entered their email address in the homepage email box.",
      "",
      `Email address: ${addr}`,
      `Page:          ${where}`,
      `Time (ET):     ${when}`,
      "",
      "This box collects an email address only. There is no name, no phone",
      "number and no job details, because the homepage box does not ask for",
      "them. Reply to the address above to find out what they need.",
      "",
      "This is an internal notification from jronegutters.com.",
    ].join("\n"),
  };
}

/**
 * Decide what the visitor is told, from the two independent outcomes.
 *
 * The rule Popeye set: only say "sent" after something actually succeeded. If
 * both halves failed the address is genuinely gone, so the visitor must get a
 * real error carrying the phone number rather than a confirmation.
 */
export function resolveCaptureOutcome({ bpOk, emailOk } = {}) {
  if (bpOk || emailOk) {
    return { ok: true, status: 200 };
  }
  return {
    ok: false,
    status: 500,
    error: `We could not save your email. Please call us at ${JR_ONE_PHONE}.`,
  };
}

/**
 * Run both halves of a homepage capture, independently.
 *
 * The two side effects are INJECTED rather than called directly. That is what
 * makes the independence guarantee testable instead of merely asserted: a test
 * passes stubs and can therefore drive the real orchestration through
 * BuilderPrime-fails, email-fails and both-fail without a network stack, an API
 * key, or any possibility of touching production. The route passes the real
 * implementations. There is exactly one copy of this control flow and both the
 * route and the tests run it.
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
 * @param {Function} args.createBpClient   async (payload) => {ok, opportunityId?, error?}
 * @param {Function} args.sendNotification async ({subject,text}) => {ok, error?}
 * @returns {Promise<{bp:object, notification:object, outcome:object}>}
 */
export async function runHomepageCapture({
  email,
  page,
  timestampEt,
  createBpClient,
  sendNotification,
  logger,
} = {}) {
  const bp = { ok: false, opportunityId: null, error: null };
  const notification = { ok: false, error: null };

  // ── Company-domain guard, BEFORE either half ──
  // BuilderPrime refuses its own company domain with a plain-text 500, which
  // reads as an outage rather than as rejected input. The route also checks
  // this, but the guard lives HERE too so the check cannot be skipped by a
  // caller that forgets it. See lib/company-domain.js for the verified proof.
  if (isCompanyDomainEmail(email)) {
    logCompanyDomainRejection({ surface: "homepage-email-capture", email, logger });
    const rejection = companyDomainRejection();
    return {
      bp: { ok: false, opportunityId: null, error: "company domain, not attempted" },
      notification: { ok: false, error: "company domain, not attempted" },
      outcome: { ok: false, status: rejection.status, error: rejection.error,
                 companyDomain: true },
    };
  }

  // ── Half 1 ──
  try {
    if (typeof createBpClient !== "function") {
      bp.error = "no BuilderPrime writer configured";
    } else {
      const res = await createBpClient(buildHomepageCaptureBpPayload({ email, page }));
      bp.ok = Boolean(res && res.ok);
      bp.opportunityId = (res && res.opportunityId) || null;
      bp.error = bp.ok ? null : (res && res.error) || "BuilderPrime create failed";
    }
  } catch (err) {
    bp.ok = false;
    bp.error = err && err.message ? err.message : String(err);
  }

  // ── Half 2. Runs regardless of what Half 1 did. ──
  try {
    if (typeof sendNotification !== "function") {
      notification.error = "no notifier configured";
    } else {
      const res = await sendNotification(
        buildHomepageCaptureNotification({ email, page, timestampEt })
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
    outcome: resolveCaptureOutcome({ bpOk: bp.ok, emailOk: notification.ok }),
  };
}
