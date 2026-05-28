import { NextResponse, after } from "next/server";
import nodemailer from "nodemailer";
import { isAfterHours, isVoiceAgentEnabled } from "@/lib/business-hours";
import { triggerOutboundCall } from "@/lib/vapi-client";

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
            gclid } = body;

    // UTM attribution: query string takes precedence over body (Google Ads appends
    // params to the landing-page URL; the form may also pass them in the body).
    const utm_source   = pickUtm(searchParams, body, "utm_source");
    const utm_medium   = pickUtm(searchParams, body, "utm_medium");
    const utm_campaign = pickUtm(searchParams, body, "utm_campaign");
    const utm_term     = pickUtm(searchParams, body, "utm_term");
    const utm_content  = pickUtm(searchParams, body, "utm_content");

    // ── Validate required fields ──
    if (!name || !phone) {
      return NextResponse.json(
        { error: "Name and phone are required" },
        { status: 400 }
      );
    }

    const timestamp = new Date().toLocaleString("en-US", {
      timeZone: "America/New_York",
    });

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
    if (process.env.BUILDER_PRIME_API_KEY) {
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
    // ─────────────────────────────────────────────────────────────────────────
    if (process.env.GMAIL_USER && process.env.GMAIL_APP_PASSWORD) {
      emailResult.attempted = true;
      try {
        const transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: process.env.GMAIL_USER,
            pass: process.env.GMAIL_APP_PASSWORD,
          },
        });

        const bpStatusBadge = bpResult.ok
          ? `<span style="background:#10B981;color:#fff;padding:4px 10px;border-radius:4px;font-size:12px;">✓ In BuilderPrime (Opp ${bpResult.opportunity_id || "?"})</span>`
          : `<span style="background:#EF4444;color:#fff;padding:4px 10px;border-radius:4px;font-size:12px;">⚠ NOT in BuilderPrime, manual entry required</span>`;

        await transporter.sendMail({
          from: `"JR One Website" <${process.env.GMAIL_USER}>`,
          to: "info@jronegutters.com",
          subject: `New Web Lead: ${name}, ${service || "General"}, ${zip || "N/A"}`,
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
                <tr><td style="padding: 8px; font-weight: bold; color: #1B2A4A;">Page:</td><td style="padding: 8px;">${page || "Unknown"}</td></tr>
                <tr style="background: #f9f9f9;"><td style="padding: 8px; font-weight: bold; color: #1B2A4A;">Time:</td><td style="padding: 8px;">${timestamp}</td></tr>
              </table>
              <p style="margin-top: 20px; color: #6B7280; font-size: 13px;">
                This lead was submitted via jronegutters.com. Respond within 5 minutes for best conversion.
              </p>
            </div>
          `,
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
