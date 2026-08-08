import { NextResponse, after } from "next/server";
import nodemailer from "nodemailer";
import { isAfterHours, isVoiceAgentEnabled } from "@/lib/business-hours";
import { triggerOutboundCall } from "@/lib/vapi-client";
import { assessLeadSpam } from "@/lib/lead-spam";
import { spoolNotice } from "@/lib/notify-spool";
import {
  isHomepageCapture,
  isValidCaptureEmail,
  runHomepageCapture,
} from "@/lib/homepage-email-capture";
import { isRoiCapture, runRoiCapture } from "@/lib/roi-capture";
import {
  isCompanyDomainEmail,
  companyDomainRejection,
  logCompanyDomainRejection,
} from "@/lib/company-domain";

// =============================================================================
// JR One, Lead Submission API
// =============================================================================
// Receives form submissions from the website and:
//   1. Creates a client record in BuilderPrime (PRIMARY, verified working)
//   2. Sends an email notification to info@jronegutters.com (FALLBACK)
//   3. Logs to console for debugging
//
// VERIFIED 2026-04-06: BP create-client schema requires nested userAccount
// object with firstName/lastName. Top-level firstName/lastName returns 500.
// =============================================================================

const BP_SUBDOMAIN = "jronegutters";
const BP_BASE_URL = `https://${BP_SUBDOMAIN}.builderprime.com/api`;

// =============================================================================
// Per-IP rate limiter + origin check. Mirrors estimator-lead/route.js — caps
// abuse at 5 submissions/min/IP and rejects requests that don't originate from
// jronegutters.com. Goal: stop bots from flooding BuilderPrime with fake leads,
// blowing the Gmail send quota, or burning Vapi minutes after hours.
// Added 2026-05-07 after the /api/claude proxy incident.
// =============================================================================
const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_WINDOW_MS = 60_000;
const rateLimitMap = new Map();
const ALLOWED_ORIGINS = new Set([
  "https://jronegutters.com",
  "https://www.jronegutters.com",
]);

function checkRateLimit(ip) {
  const now = Date.now();
  const record = rateLimitMap.get(ip);
  if (!record || now > record.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return { ok: true };
  }
  if (record.count >= RATE_LIMIT_MAX) {
    return { ok: false, retryAfter: Math.ceil((record.resetAt - now) / 1000) };
  }
  record.count++;
  return { ok: true };
}

function maybeCleanupRateLimitMap() {
  if (rateLimitMap.size < 1000) return;
  const now = Date.now();
  for (const [ip, record] of rateLimitMap.entries()) {
    if (now > record.resetAt) rateLimitMap.delete(ip);
  }
}

function getClientIp(request) {
  const xff = request.headers.get("x-forwarded-for");
  if (xff) return xff.split(",")[0].trim();
  const real = request.headers.get("x-real-ip");
  if (real) return real;
  return "unknown";
}

function isAllowedOrigin(request) {
  const origin = request.headers.get("origin");
  const referer = request.headers.get("referer") || "";
  if (origin && ALLOWED_ORIGINS.has(origin)) return true;
  for (const allowed of ALLOWED_ORIGINS) {
    if (referer.startsWith(allowed)) return true;
  }
  return false;
}

// =============================================================================
// Shared transport adapters for the lightweight capture branches
// =============================================================================
// The homepage email band and the ROI calculator both need exactly two side
// effects: create a BuilderPrime client, and send one plain-text notice to
// info@. These used to be written inline inside the homepage branch. They were
// hoisted here on 2026-08-08 when the ROI calculator gained a capture, because
// the alternative was a second verbatim copy of both, and a copy of a transport
// is a copy that drifts (a fix to one would silently miss the other).
//
// They are the REAL implementations. Both capture modules take their side
// effects as injected parameters, so tests drive the same orchestration with
// stubs and never reach this code, no network, and no mail.
// =============================================================================

/** Create a BuilderPrime client. Returns {ok, opportunityId?, error?}. */
async function createBpClientRemote(payload) {
  if (!process.env.BUILDER_PRIME_API_KEY) {
    return { ok: false, error: "BUILDER_PRIME_API_KEY not set" };
  }
  const res = await fetch(`${BP_BASE_URL}/clients`, {
    method: "POST",
    headers: {
      "x-api-key": process.env.BUILDER_PRIME_API_KEY,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(payload),
  });
  const text = await res.text();
  if (!res.ok) return { ok: false, error: `${res.status}: ${text.slice(0, 500)}` };
  const m = text.match(/Opportunity:\s*(\d+)/);
  return { ok: true, opportunityId: m ? m[1] : null };
}

/**
 * Send one plain-text operator notice to info@jronegutters.com.
 *
 * Internal operator mail, NOT customer-facing, so it deliberately does not use
 * the branded customer chokepoint. Returns {ok, error?}.
 */
async function sendOperatorNotification({ subject, text }) {
  if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD) {
    return { ok: false, error: "GMAIL_USER or GMAIL_APP_PASSWORD not set" };
  }
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: { user: process.env.GMAIL_USER, pass: process.env.GMAIL_APP_PASSWORD },
  });
  await transporter.sendMail({
    from: `"JR One Website" <${process.env.GMAIL_USER}>`,
    to: "info@jronegutters.com",
    subject,
    text,
  });
  return { ok: true };
}

// Map website form service strings to BuilderPrime project type descriptions
function mapServiceToProjectType(service) {
  if (!service) return "";
  const s = service.toLowerCase();
  if (s.includes("gutter") && s.includes("install")) return "Gutter Installation";
  if (s.includes("gutter") && s.includes("repair")) return "Repair";
  if (s.includes("gutter") && s.includes("clean")) return "Gutter Cleaning";
  if (s.includes("gutter") && s.includes("guard")) return "Gutter Guards";
  if (s.includes("gutter") && s.includes("replace")) return "Gutter Replacement";
  if (s.includes("commercial")) return "Commercial Gutters";
  if (s.includes("hoa") || s.includes("contrato")) return "Gutter Maintenance";
  if (s.includes("rental") || s.includes("alquiler")) return "Gutter Maintenance";
  if (s.includes("seamless") || s.includes("sin costura")) return "Gutter Installation";
  if (s.includes("copper") || s.includes("cobre")) return "Copper Gutters";
  if (s.includes("specialty") || s.includes("especial")) return "Specialty Gutters";
  if (s.includes("soffit") || s.includes("fascia") || s.includes("sofito")) return "Soffit and Fascia";
  if (s.includes("siding") || s.includes("revestimiento")) return "Siding";
  if (s.includes("sagiper")) return "Siding";
  if (s.includes("peak") || s.includes("301") || s.includes("rejuven")) return "Peak 301";
  if (s.includes("govee") || s.includes("light") || s.includes("luces")) return "Govee Lights";
  if (s.includes("drainage") || s.includes("drain") || s.includes("drenaje")) return "Drainage";
  if (s.includes("service plan") || s.includes("plan de servicio") || s.includes("planes de servicio") || s.includes("maintenance")) return "Gutter Maintenance";
  return "Gutters"; // safe default
}

// Split a full name string into firstName + lastName
function splitName(fullName) {
  if (!fullName) return { firstName: "", lastName: "" };
  const parts = fullName.trim().split(/\s+/);
  if (parts.length === 1) return { firstName: parts[0], lastName: "" };
  return {
    firstName: parts[0],
    lastName: parts.slice(1).join(" "),
  };
}

// Validate + decode customer-attached photos from the contact form.
// Input shape: [{ filename, dataUrl: "data:image/jpeg;base64,...", mimeType }, ...]
// Returns: [{ filename, content: Buffer, contentType }] for nodemailer.attachments.
// Hard caps mirror the client: max 5 files, max ~5MB decoded each, jpeg/png/webp only.
function buildPhotoAttachments(photos) {
  if (!Array.isArray(photos) || photos.length === 0) return [];
  const ALLOWED = new Set(["image/jpeg", "image/png", "image/webp"]);
  const MAX_DECODED_BYTES = 5 * 1024 * 1024;
  const out = [];
  for (const p of photos.slice(0, 5)) {
    if (!p || typeof p.dataUrl !== "string") continue;
    const m = p.dataUrl.match(/^data:([^;]+);base64,(.+)$/);
    if (!m) continue;
    const contentType = m[1].toLowerCase();
    if (!ALLOWED.has(contentType)) continue;
    let content;
    try { content = Buffer.from(m[2], "base64"); } catch { continue; }
    if (content.length === 0 || content.length > MAX_DECODED_BYTES) continue;
    // Sanitize filename: strip path separators, cap length
    const safeName = String(p.filename || "photo.jpg")
      .replace(/[^\w.\-]/g, "_")
      .slice(0, 80) || "photo.jpg";
    out.push({ filename: safeName, content, contentType });
  }
  return out;
}

// Normalize phone to E.164 format that BuilderPrime expects (+1XXXXXXXXXX)
function normalizePhone(phone) {
  if (!phone) return "";
  const digits = String(phone).replace(/\D/g, "");
  if (digits.length === 10) return `+1${digits}`;
  if (digits.length === 11 && digits.startsWith("1")) return `+${digits}`;
  return phone; // return as-is if format unexpected, let BP handle it
}

// =============================================================================
// UTM helpers — parse from query string OR request body.
// Query string takes precedence (e.g. Google Ads auto-tagging appends to URL).
// Falls back to body fields if the form posts them in the payload.
// =============================================================================

/**
 * Extract a named UTM parameter from query string first, then body.
 * Returns the raw string value or undefined.
 */
function pickUtm(searchParams, body, key) {
  const fromQs = searchParams.get(key);
  if (fromQs) return fromQs;
  const fromBody = body[key];
  if (fromBody && String(fromBody).length <= 256) return String(fromBody);
  return undefined;
}

export async function POST(request) {
  try {
    // ── Origin check (block off-site bots) ──
    if (!isAllowedOrigin(request)) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    // ── Rate limit (5/min/IP) ──
    maybeCleanupRateLimitMap();
    const ip = getClientIp(request);
    const rl = checkRateLimit(ip);
    if (!rl.ok) {
      return NextResponse.json(
        { error: "Too many requests" },
        { status: 429, headers: { "Retry-After": String(rl.retryAfter || 60) } }
      );
    }

    const body = await request.json();
    const searchParams = new URL(request.url).searchParams;

    const { name, phone, email, service, zip, message, page, address, city, state,
            gclid, photos } = body;

    // UTM attribution: query string takes precedence over body (Google Ads appends
    // params to the landing-page URL; the form may also pass them in the body).
    const utm_source   = pickUtm(searchParams, body, "utm_source");
    const utm_medium   = pickUtm(searchParams, body, "utm_medium");
    const utm_campaign = pickUtm(searchParams, body, "utm_campaign");
    const utm_term     = pickUtm(searchParams, body, "utm_term");
    const utm_content  = pickUtm(searchParams, body, "utm_content");

    const timestamp = new Date().toLocaleString("en-US", {
      timeZone: "America/New_York",
    });

    // ─────────────────────────────────────────────────────────────────────────
    // HOMEPAGE EMAIL CAPTURE (2026-08-08)
    // The homepage gold band collects an address and nothing else. It used to
    // call no API at all and simply told the visitor "sent" (app/page.jsx
    // handleEmail, shipped broken in a5621f3 on 2026-04-02).
    //
    // It is handled HERE, inside this route, rather than in a route of its own,
    // because this route already carries the origin allow-list, the per-IP rate
    // limit, the honeypot and the input validation. A second route would mean a
    // second copy of all four, and copies drift.
    //
    // It is a self-contained branch rather than a set of conditionals threaded
    // through the main lead path below, so that the 21 forms that already work
    // are not touched at all.
    //
    // Everything above this point has already run: origin check, rate limit,
    // body parse. The honeypot runs immediately below.
    // ─────────────────────────────────────────────────────────────────────────
    if (isHomepageCapture(body)) {
      // Reject junk before ANY network call is made.
      if (!isValidCaptureEmail(email)) {
        return NextResponse.json(
          { error: "Please enter a valid email address." },
          { status: 400 }
        );
      }

      // A JR One address cannot be saved: BuilderPrime refuses its own company
      // domain with a plain-text 500 that reads like an outage. Caught here so
      // the submitter gets a clear, actionable message instead of a generic
      // failure, and logged under its own tag so it is never again mistaken for
      // a broken integration. VERIFIED against the live API 2026-08-08; see
      // lib/company-domain.js. runHomepageCapture guards this again internally.
      if (isCompanyDomainEmail(email)) {
        logCompanyDomainRejection({ surface: "homepage-email-capture (route)", email });
        const rejection = companyDomainRejection();
        return NextResponse.json(
          { error: rejection.error },
          { status: rejection.status }
        );
      }

      // Same honeypot + fill-timer gate the other forms get. A blocked bot is
      // told nothing useful and never reaches BuilderPrime or the inbox.
      const captureSpam = assessLeadSpam({
        email,
        company: body.company,
        form_ms: body.form_ms,
      });
      if (captureSpam.block) {
        console.warn(
          `SPAM BLOCKED (homepage capture) from ${ip}: ${captureSpam.reasons.join("; ")}`
        );
        console.warn(
          "SPAM BLOCKED (homepage capture) - payload for manual recovery:",
          JSON.stringify({ email, page, reasons: captureSpam.reasons })
        );
        const tBlocked = new Date().toLocaleTimeString("en-US", {
          timeZone: "America/New_York", hour: "numeric", minute: "2-digit",
        });
        after(async () => {
          const res = await spoolNotice({
            source: "website",
            tag: "spam-blocked-homepage-capture",
            subject: "Spam-blocked homepage email captures (kept out of BuilderPrime)",
            severity: "info",
            append: true,
            body: `${tBlocked}  ${email || "no email"} | ${page || "/"} | ${captureSpam.reasons.join(", ")}`,
          });
          if (!res.ok) {
            console.error("spam-blocked homepage capture could not be spooled:", res.error);
          }
        });
        // Same fabricated-success shape the other blocked paths use, so a bot
        // gets no oracle telling it which field tripped the filter.
        return NextResponse.json({ success: true, captured: true });
      }

      // Both halves run through lib/homepage-email-capture.js runHomepageCapture,
      // which owns the independence guarantee. The two side effects below are
      // injected into it, so the tests exercise this exact control flow with
      // stubs instead of a second copy of it.
      const captureResult = await runHomepageCapture({
        email,
        page,
        timestampEt: timestamp,

        // ── Half 1: BuilderPrime ──
        createBpClient: createBpClientRemote,

        // ── Half 2: the info@ notification ──
        sendNotification: sendOperatorNotification,
      });

      const captureBpOk = captureResult.bp.ok;
      const captureBpOppId = captureResult.bp.opportunityId;
      const captureBpError = captureResult.bp.error;
      const captureEmailOk = captureResult.notification.ok;
      const captureEmailError = captureResult.notification.error;

      // Both outcomes go somewhere Popeye can inspect, whichever way they went.
      console.log(
        "Homepage email capture result:",
        JSON.stringify({
          email, page,
          bp: { ok: captureBpOk, opportunity_id: captureBpOppId, error: captureBpError },
          notification: { ok: captureEmailOk, error: captureEmailError },
        })
      );
      if (!captureBpOk || !captureEmailOk) {
        after(async () => {
          await spoolNotice({
            source: "website",
            tag: "homepage-capture-partial-failure",
            subject: "Homepage email capture did not complete both halves",
            severity: captureBpOk || captureEmailOk ? "info" : "warn",
            append: true,
            body:
              `${timestamp}  ${email} | ${page || "/"} | ` +
              `builderprime=${captureBpOk ? `ok ${captureBpOppId || "?"}` : `FAILED ${captureBpError}`} | ` +
              `notification=${captureEmailOk ? "ok" : `FAILED ${captureEmailError}`}`,
          });
        });
      }

      // Only claim success if at least one half actually landed.
      const outcome = captureResult.outcome;
      if (!outcome.ok) {
        console.error("CRITICAL: homepage email capture lost on BOTH paths", { email, page });
        return NextResponse.json({ error: outcome.error, captured: false }, { status: outcome.status });
      }
      return NextResponse.json({
        success: true,
        captured: true,
        captured_in_bp: captureBpOk,
        notified: captureEmailOk,
        bp_opportunity_id: captureBpOppId,
      });
    }

    // ─────────────────────────────────────────────────────────────────────────
    // ROI CALCULATOR CAPTURE (2026-08-08)
    // public/roi-calculator.html had a call to action whose entire behaviour
    // was alert('Contact JRone Gutters for a free inspection and quote!'). It
    // captured nothing and told nobody. Third dead lead capture found on this
    // site, after the homepage email band and the 21 always-checkmark forms.
    //
    // Handled HERE, in this route, for the same reason the homepage capture is:
    // the origin allow-list, the per-IP rate limit, the input validation and
    // the honeypot all already live above this line and are shared. A second
    // route would mean a second copy of all four, and copies drift.
    //
    // Self-contained branch, so the 21 forms that already work and the homepage
    // band above are not touched at all. Everything before this point has run:
    // origin check, rate limit, body parse.
    // ─────────────────────────────────────────────────────────────────────────
    if (isRoiCapture(body)) {
      // Reject junk before ANY network call is made. Same validator the
      // homepage band uses, imported, not restated.
      if (!isValidCaptureEmail(email)) {
        return NextResponse.json(
          { error: "Please enter a valid email address." },
          { status: 400 }
        );
      }

      // Same company-domain rule as the homepage band above, for the same
      // verified reason. An employee running their own numbers through the ROI
      // calculator would otherwise get a bare failure with nothing to act on.
      if (isCompanyDomainEmail(email)) {
        logCompanyDomainRejection({ surface: "roi-calculator-capture (route)", email });
        const rejection = companyDomainRejection();
        return NextResponse.json(
          { error: rejection.error },
          { status: rejection.status }
        );
      }

      // Same honeypot + fill-timer gate every other form gets. A blocked bot is
      // told nothing useful and never reaches BuilderPrime or the inbox.
      const roiSpam = assessLeadSpam({
        email,
        company: body.company,
        form_ms: body.form_ms,
      });
      if (roiSpam.block) {
        console.warn(
          `SPAM BLOCKED (roi calculator) from ${ip}: ${roiSpam.reasons.join("; ")}`
        );
        console.warn(
          "SPAM BLOCKED (roi calculator) - payload for manual recovery:",
          JSON.stringify({ email, page, reasons: roiSpam.reasons })
        );
        const tBlocked = new Date().toLocaleTimeString("en-US", {
          timeZone: "America/New_York", hour: "numeric", minute: "2-digit",
        });
        after(async () => {
          const res = await spoolNotice({
            source: "website",
            tag: "spam-blocked-roi-calculator",
            subject: "Spam-blocked ROI calculator captures (kept out of BuilderPrime)",
            severity: "info",
            append: true,
            body: `${tBlocked}  ${email || "no email"} | ${page || "/roi-calculator.html"} | ${roiSpam.reasons.join(", ")}`,
          });
          if (!res.ok) {
            console.error("spam-blocked roi capture could not be spooled:", res.error);
          }
        });
        // Same fabricated-success shape the other blocked paths use, so a bot
        // gets no oracle telling it which field tripped the filter.
        return NextResponse.json({ success: true, captured: true });
      }

      // Both halves run through lib/roi-capture.js runRoiCapture, which owns
      // the independence guarantee. The two side effects are injected, so the
      // tests exercise this exact control flow with stubs instead of a second
      // copy of it.
      const roiResult = await runRoiCapture({
        email,
        page,
        timestampEt: timestamp,
        lang: body.lang,
        roi: body.roi,
        inputs: body.inputs,
        createBpClient: createBpClientRemote,
        sendNotification: sendOperatorNotification,
      });

      const roiBpOk = roiResult.bp.ok;
      const roiBpOppId = roiResult.bp.opportunityId;
      const roiBpError = roiResult.bp.error;
      const roiEmailOk = roiResult.notification.ok;
      const roiEmailError = roiResult.notification.error;

      // Both outcomes go somewhere Popeye can inspect, whichever way they went.
      console.log(
        "ROI calculator capture result:",
        JSON.stringify({
          email, page,
          bp: { ok: roiBpOk, opportunity_id: roiBpOppId, error: roiBpError },
          notification: { ok: roiEmailOk, error: roiEmailError },
        })
      );
      if (!roiBpOk || !roiEmailOk) {
        after(async () => {
          await spoolNotice({
            source: "website",
            tag: "roi-capture-partial-failure",
            subject: "ROI calculator capture did not complete both halves",
            severity: roiBpOk || roiEmailOk ? "info" : "warn",
            append: true,
            body:
              `${timestamp}  ${email} | ${page || "/roi-calculator.html"} | ` +
              `builderprime=${roiBpOk ? `ok ${roiBpOppId || "?"}` : `FAILED ${roiBpError}`} | ` +
              `notification=${roiEmailOk ? "ok" : `FAILED ${roiEmailError}`}`,
          });
        });
      }

      // Only claim success if at least one half actually landed.
      const roiOutcome = roiResult.outcome;
      if (!roiOutcome.ok) {
        console.error("CRITICAL: ROI calculator capture lost on BOTH paths", { email, page });
        return NextResponse.json(
          { error: roiOutcome.error, captured: false },
          { status: roiOutcome.status }
        );
      }
      return NextResponse.json({
        success: true,
        captured: true,
        captured_in_bp: roiBpOk,
        notified: roiEmailOk,
        bp_opportunity_id: roiBpOppId,
      });
    }

    // ── Validate required fields ──
    if (!name || !phone) {
      return NextResponse.json(
        { error: "Name and phone are required" },
        { status: 400 }
      );
    }

    // ── Spam assessment (2026-07-29, gibberish-name bot campaign) ──
    // Blocked submissions NEVER reach BuilderPrime (which also keeps them out
    // of the Vapi callback and the nurture drip), but the notification email
    // still goes out tagged [SPAM BLOCKED] so a false positive is rescuable.
    // The bot gets a normal success response — never tip it off.
    const spamCheck = assessLeadSpam({
      name, email, phone, zip, message,
      company: body.company,
      form_ms: body.form_ms,
    });
    if (spamCheck.block) {
      console.warn(`⚠ SPAM BLOCKED from ${ip}: ${spamCheck.reasons.join("; ")}`);
    }

    const { firstName, lastName } = splitName(name);
    const normalizedPhone = normalizePhone(phone);
    const projectType = mapServiceToProjectType(service);

    // Track results so we can return useful diagnostics + log them
    let bpResult = { attempted: false, ok: false, error: null, opportunity_id: null };
    let emailResult = { attempted: false, ok: false, error: null };

    // ─────────────────────────────────────────────────────────────────────────
    // 1. PRIMARY: Create client in BuilderPrime
    //    Verified working schema as of 2026-04-06.
    //    Required: userAccount nested object with firstName + lastName.
    // ─────────────────────────────────────────────────────────────────────────
    if (process.env.BUILDER_PRIME_API_KEY && !spamCheck.block) {
      bpResult.attempted = true;
      try {
        // BP custom fields for UTM attribution.
        // TODO: confirm exact BP custom field names with Popeye before relying
        // on these in reports. Field names below match the standard naming
        // convention in builderprime-lead-to-close-config.md Section 4 (UTM gap).
        // If BP rejects unknown fields, remove the customFields block and rely
        // solely on the activity-note fallback below.
        const utmCustomFields = {};
        if (utm_source)   utmCustomFields.lead_source   = utm_source;
        if (utm_medium)   utmCustomFields.lead_medium   = utm_medium;
        if (utm_campaign) utmCustomFields.lead_campaign = utm_campaign;
        if (utm_term)     utmCustomFields.lead_term     = utm_term;
        if (utm_content)  utmCustomFields.lead_content  = utm_content;

        const bpPayload = {
          userAccount: {
            firstName: firstName,
            lastName: lastName || "(no last name provided)",
            emailAddress: email || "",
          },
          emailAddress: email || "",
          phoneNumber: normalizedPhone,
          addressLine1: address || "",
          city: city || "",
          state: state || "FL",
          zip: zip || "",
          leadSourceDescription: "Form Inquiry",
          projectTypeDescription: projectType,
          buildingTypeDescription: "Single Family",
          // UTM attribution as BP custom fields (see TODO above)
          ...(Object.keys(utmCustomFields).length > 0 && { customFields: utmCustomFields }),
        };

        const bpResponse = await fetch(`${BP_BASE_URL}/clients`, {
          method: "POST",
          headers: {
            "x-api-key": process.env.BUILDER_PRIME_API_KEY,
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(bpPayload),
        });

        const bpText = await bpResponse.text();
        if (bpResponse.ok) {
          bpResult.ok = true;
          // Response format: "Client Successfully Created. Opportunity: 5367029"
          const oppMatch = bpText.match(/Opportunity:\s*(\d+)/);
          if (oppMatch) bpResult.opportunity_id = oppMatch[1];
          console.log(`✓ Builder Prime lead created (opportunity ${bpResult.opportunity_id || "?"})`);

          // Log UTM + gclid attribution as a BP activity note.
          // Serves as a human-readable fallback if the BP custom fields above are
          // rejected. The activity note is always visible on the opportunity timeline.
          if (bpResult.opportunity_id && (gclid || utm_source || utm_campaign || utm_medium || utm_term || utm_content)) {
            const attrParts = [];
            if (gclid)        attrParts.push(`gclid: ${gclid}`);
            if (utm_source)   attrParts.push(`source: ${utm_source}`);
            if (utm_medium)   attrParts.push(`medium: ${utm_medium}`);
            if (utm_campaign) attrParts.push(`campaign: ${utm_campaign}`);
            if (utm_term)     attrParts.push(`term: ${utm_term}`);
            if (utm_content)  attrParts.push(`content: ${utm_content}`);
            if (page) attrParts.push(`page: ${page}`);
            try {
              await fetch(`${BP_BASE_URL}/client-activities/v1`, {
                method: "POST",
                headers: {
                  "x-api-key": process.env.BUILDER_PRIME_API_KEY,
                  "Content-Type": "application/json",
                  Accept: "application/json",
                },
                body: JSON.stringify({
                  opportunityId: parseInt(bpResult.opportunity_id, 10),
                  description: `[AD ATTRIBUTION] ${attrParts.join(" | ")}`,
                }),
              });
            } catch (attrErr) {
              console.error(`✗ Attribution activity log failed (non-fatal): ${attrErr.message}`);
            }
          }
        } else {
          bpResult.error = `${bpResponse.status}: ${bpText.slice(0, 500)}`;
          console.error(`✗ Builder Prime error: ${bpResult.error}`);
        }
      } catch (bpErr) {
        bpResult.error = bpErr.message;
        console.error(`✗ Builder Prime exception: ${bpErr.message}`);
      }
    } else if (spamCheck.block) {
      console.warn("⚠ Skipping BuilderPrime create: spam-blocked submission");
    } else {
      console.warn("⚠ BUILDER_PRIME_API_KEY not set in environment, skipping BP create");
    }

    // ─────────────────────────────────────────────────────────────────────────
    // 1b. ADDITIVE: After-hours voice callback via Vapi (fire-and-forget)
    //     Only fires if BP create succeeded AND it's currently after hours
    //     AND the kill switch is off. Uses next/server `after()` so it runs
    //     post-response, never blocks, slows, or fails the BP creation path.
    // ─────────────────────────────────────────────────────────────────────────
    if (bpResult.ok && bpResult.opportunity_id && isAfterHours() && isVoiceAgentEnabled()) {
      after(async () => {
        try {
          await triggerOutboundCall({
            phone: normalizedPhone,
            language: "en",
            bpOpportunityId: bpResult.opportunity_id,
            customerName: name,
            leadSource: "send-lead",
          });
          console.log(`✓ Vapi after-hours callback triggered for opp ${bpResult.opportunity_id}`);
        } catch (vapiErr) {
          console.error(`✗ Vapi trigger failed (non-fatal) for opp ${bpResult.opportunity_id}: ${vapiErr.message}`);
        }
      });
    }

    // ─────────────────────────────────────────────────────────────────────────
    // 2. FALLBACK: Email notification to info@jronegutters.com
    //    Used as a backup so a human still sees the lead even if BP fails.
    //
    //    CHANGED 2026-08-04: only REAL leads email. A spam-blocked submission
    //    used to send its own [SPAM BLOCKED] copy so a false positive stayed
    //    rescuable - good instinct, wrong channel. Those now spool into the
    //    daily operator digest (see the spam-blocked branch below): still
    //    reviewable the same day, no longer an interrupt.
    //
    //    A genuine lead keeps its instant email on purpose. It is the one event
    //    on this site where a few hours of delay can lose a job, and JR One
    //    cashflow is the guardrail everything else bends around.
    // ─────────────────────────────────────────────────────────────────────────
    if (process.env.GMAIL_USER && process.env.GMAIL_APP_PASSWORD && !spamCheck.block) {
      emailResult.attempted = true;
      try {
        const transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: process.env.GMAIL_USER,
            pass: process.env.GMAIL_APP_PASSWORD,
          },
        });

        const escapeHtml = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
        const bpStatusBadge = spamCheck.block
          ? `<span style="background:#6B7280;color:#fff;padding:4px 10px;border-radius:4px;font-size:12px;">🚫 SPAM BLOCKED, not in BuilderPrime (${escapeHtml(spamCheck.reasons.join("; "))})</span>`
          : bpResult.ok
          ? `<span style="background:#10B981;color:#fff;padding:4px 10px;border-radius:4px;font-size:12px;">✓ In BuilderPrime (Opp ${bpResult.opportunity_id || "?"})</span>`
          : `<span style="background:#EF4444;color:#fff;padding:4px 10px;border-radius:4px;font-size:12px;">⚠ NOT in BuilderPrime, manual entry required</span>`;

        const photoAttachments = buildPhotoAttachments(photos);
        const photoRowHtml = photoAttachments.length > 0
          ? `<tr><td style="padding: 8px; font-weight: bold; color: #1B2A4A;">Photos:</td><td style="padding: 8px;">📎 ${photoAttachments.length} attached (see attachments)</td></tr>`
          : "";

        await transporter.sendMail({
          from: `"JR One Website" <${process.env.GMAIL_USER}>`,
          to: "info@jronegutters.com",
          subject: `${spamCheck.block ? "[SPAM BLOCKED] " : ""}New Web Lead: ${name}, ${service || "General"}, ${zip || "N/A"}${photoAttachments.length > 0 ? ` (📎 ${photoAttachments.length})` : ""}`,
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px;">
              <h2 style="color: #1B2A4A; border-bottom: 3px solid #D4AF37; padding-bottom: 10px;">
                New Lead from jronegutters.com
              </h2>
              <div style="margin: 12px 0;">${bpStatusBadge}</div>
              <table style="width: 100%; border-collapse: collapse; margin-top: 16px;">
                <tr><td style="padding: 8px; font-weight: bold; color: #1B2A4A;">Name:</td><td style="padding: 8px;">${name}</td></tr>
                <tr style="background: #f9f9f9;"><td style="padding: 8px; font-weight: bold; color: #1B2A4A;">Phone:</td><td style="padding: 8px;"><a href="tel:${phone}">${phone}</a></td></tr>
                <tr><td style="padding: 8px; font-weight: bold; color: #1B2A4A;">Email:</td><td style="padding: 8px;"><a href="mailto:${email}">${email || "Not provided"}</a></td></tr>
                <tr style="background: #f9f9f9;"><td style="padding: 8px; font-weight: bold; color: #1B2A4A;">Service:</td><td style="padding: 8px;">${service || "Not specified"}</td></tr>
                <tr><td style="padding: 8px; font-weight: bold; color: #1B2A4A;">Address:</td><td style="padding: 8px;">${address || "Not provided"}, ${city || ""} ${zip || ""}</td></tr>
                <tr style="background: #f9f9f9;"><td style="padding: 8px; font-weight: bold; color: #1B2A4A;">Message:</td><td style="padding: 8px;">${message || "None"}</td></tr>
                ${photoRowHtml}
                <tr><td style="padding: 8px; font-weight: bold; color: #1B2A4A;">Page:</td><td style="padding: 8px;">${page || "Unknown"}</td></tr>
                <tr style="background: #f9f9f9;"><td style="padding: 8px; font-weight: bold; color: #1B2A4A;">Time:</td><td style="padding: 8px;">${timestamp}</td></tr>
              </table>
              <p style="margin-top: 20px; color: #6B7280; font-size: 13px;">
                This lead was submitted via jronegutters.com. Respond within 5 minutes for best conversion.
              </p>
            </div>
          `,
          attachments: photoAttachments,
        });
        emailResult.ok = true;
        console.log("✓ Email notification sent to info@jronegutters.com");
      } catch (emailErr) {
        emailResult.error = emailErr.message;
        console.error("✗ Email notification failed:", emailErr.message);
      }
    } else {
      console.warn("⚠ GMAIL_USER or GMAIL_APP_PASSWORD not set, skipping email notification");
    }

    // ─────────────────────────────────────────────────────────────────────────
    // Spam-blocked: ALWAYS return the exact shape of a fully-captured lead so
    // the bot can't A/B-test the filter (captured_in_bp:false would be a
    // perfect adaptation oracle). Fabricated opportunity id, plausible range.
    // Even if the [SPAM BLOCKED] email failed, never fall through to the 500 —
    // log the payload instead so it's recoverable from Vercel logs.
    // ─────────────────────────────────────────────────────────────────────────
    if (spamCheck.block) {
      // The rescue path. Everything the old [SPAM BLOCKED] email carried is
      // filed here instead, so a wrongly-blocked customer is still recoverable
      // from the morning digest. Console logging stays as the second copy: if
      // the spool is unreachable the payload is still in the Vercel logs.
      const blockedPayload = { name, phone, email, service, zip, message, page,
        reasons: spamCheck.reasons };
      console.warn("⚠ SPAM BLOCKED — payload for manual recovery:", JSON.stringify(blockedPayload));

      // Fire-and-forget: a lead response must never wait on, or fail because
      // of, a notification write.
      // ONE LINE per blocked lead, appended. The daily digest then shows a
      // count plus a scannable list, which is what makes a false positive
      // spottable - a bare "12 blocked" would hide a real customer inside it,
      // and 12 separate emails is the clutter we are removing.
      const t = new Date().toLocaleTimeString("en-US", {
        timeZone: "America/New_York", hour: "numeric", minute: "2-digit",
      });
      after(async () => {
        const res = await spoolNotice({
          source: "website",
          tag: "spam-blocked-lead",
          subject: "Spam-blocked web leads (kept out of BuilderPrime)",
          severity: "info",
          append: true,
          body:
            `${t}  ${name || "no name"} | ${phone || "no phone"} | ` +
            `${email || "no email"} | ${service || "no service"} | ${zip || "no zip"} | ` +
            `${spamCheck.reasons.join(", ")}`,
        });
        if (!res.ok) {
          console.error("✗ spam-blocked lead could not be spooled:", res.error);
        }
      });

      return NextResponse.json({
        success: true,
        message: "Lead received",
        captured_in_bp: true,
        bp_opportunity_id: String(6000000 + (Date.now() % 1000000)),
      });
    }

    // ─────────────────────────────────────────────────────────────────────────
    // Return success only if at least one capture path worked.
    // If both failed, return 500 so the user knows their lead may be lost.
    // ─────────────────────────────────────────────────────────────────────────
    const captured = bpResult.ok || emailResult.ok;
    if (!captured) {
      console.error("✗ CRITICAL: Lead capture failed on all paths", { bpResult, emailResult });
      return NextResponse.json(
        {
          error: "We had trouble saving your request. Please call us directly at (844) 444-3114.",
          captured: false,
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Lead received",
      captured_in_bp: bpResult.ok,
      bp_opportunity_id: bpResult.opportunity_id,
    });
  } catch (err) {
    console.error("Lead submission error:", err);
    return NextResponse.json(
      { error: "Failed to process lead. Please call (844) 444-3114." },
      { status: 500 }
    );
  }
}
