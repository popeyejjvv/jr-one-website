import { NextResponse, after } from "next/server";
import { isAfterHours, isVoiceAgentEnabled } from "@/lib/business-hours";
import { triggerOutboundCall } from "@/lib/vapi-client";

// =============================================================================
// JR One, Estimator Lead API
// =============================================================================
// Receives lead submissions from the Instant Estimator tool (public/estimator.html)
// and creates a corresponding client record in BuilderPrime.
//
// This route was added 2026-04-06 because the original estimator only sent leads
// to a Google Apps Script (Google Sheet) and bypassed BuilderPrime entirely ,
// every lead generated through the estimator was invisible to the CRM and the
// outreach automation.
//
// VERIFIED 2026-04-06: BP create-client schema requires nested userAccount
// object with firstName/lastName.
// =============================================================================

const BP_SUBDOMAIN = "jronegutters";
const BP_BASE_URL = `https://${BP_SUBDOMAIN}.builderprime.com/api`;

// =============================================================================
// Simple in-memory rate limiter. Prevents a bot from flooding BuilderPrime
// with fake leads or exhausting Vapi minutes. Not distributed across Vercel
// instances, that's fine; the goal is to make abuse cost-prohibitive, not
// perfect. Each IP gets RATE_LIMIT_MAX requests per RATE_LIMIT_WINDOW_MS.
// =============================================================================
const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_WINDOW_MS = 60_000;
const rateLimitMap = new Map();

// Origin allow-list. Block off-site bot abuse — 2026-05-07.
const ALLOWED_ORIGINS = new Set([
  "https://jronegutters.com",
  "https://www.jronegutters.com",
]);

function isAllowedOrigin(request) {
  const origin = request.headers.get("origin");
  const referer = request.headers.get("referer") || "";
  if (origin && ALLOWED_ORIGINS.has(origin)) return true;
  for (const allowed of ALLOWED_ORIGINS) {
    if (referer.startsWith(allowed)) return true;
  }
  return false;
}

function checkRateLimit(ip) {
  const now = Date.now();
  const record = rateLimitMap.get(ip);
  if (!record || now > record.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return { ok: true, remaining: RATE_LIMIT_MAX - 1 };
  }
  if (record.count >= RATE_LIMIT_MAX) {
    return { ok: false, retryAfter: Math.ceil((record.resetAt - now) / 1000) };
  }
  record.count++;
  return { ok: true, remaining: RATE_LIMIT_MAX - record.count };
}

// Opportunistic cleanup of expired entries, keeps the map from growing
// unbounded across a long-lived serverless instance. Cheap: runs at most
// once per request when the map has more than 1000 entries.
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

// =============================================================================
// UTM helpers (mirrored from send-lead/route.js).
// Estimator page builds a URL with UTM params when ad traffic lands on it;
// those params need to travel through to BP so ad spend is attributable.
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

function splitName(fullName) {
  if (!fullName) return { firstName: "Estimator", lastName: "Lead" };
  const parts = String(fullName).trim().split(/\s+/);
  if (parts.length === 1) return { firstName: parts[0], lastName: "(no last name)" };
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
  return phone;
}

// Map estimator measurement totals to a meaningful project type
function inferProjectType(measurements) {
  if (!measurements) return "Gutters";
  const m = measurements;
  const hasGutter = (m.gutter || 0) > 0;
  const hasSoffit = (m.soffit || 0) > 0;
  const hasFascia = (m.fascia || 0) > 0;
  const hasGuard = (m.guard || 0) > 0;
  // Multi-service bundle = full house wrap = highest value
  if (hasGutter && (hasSoffit || hasFascia) && hasGuard) return "Gutters";
  if (hasGutter && hasGuard) return "Gutter Installation";
  if (hasGutter) return "Gutter Installation";
  if (hasSoffit || hasFascia) return "Soffit and Fascia";
  if (hasGuard) return "Gutter Guards";
  return "Gutters";
}

export async function POST(request) {
  try {
    // Origin check (block off-site bots before any other work)
    if (!isAllowedOrigin(request)) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    // Rate limit by client IP before parsing the body
    const ip = getClientIp(request);
    maybeCleanupRateLimitMap();
    const rl = checkRateLimit(ip);
    if (!rl.ok) {
      console.warn(`⚠ Rate limit hit for ${ip}, retry in ${rl.retryAfter}s`);
      return NextResponse.json(
        { error: "Too many requests, please try again in a moment." },
        { status: 429, headers: { "Retry-After": String(rl.retryAfter) } }
      );
    }

    const body = await request.json();
    const searchParams = new URL(request.url).searchParams;

    // Estimator payload shape (from public/estimator.html sendToJROne / sendToCustomer):
    //   type: 'lead' | 'customer'
    //   phone, address, addressCity/State/Zip, stories, gutterSize, lang,
    //   measurements, downspouts, estimate (single worst-case number),
    //   discountCode, expDate, timestamp
    //   customerName, customerEmail (only on type='customer')
    //   Legacy: estimateLow/estimateHigh (range format, pre-2026-04-12)
    const {
      type,
      phone,
      address,
      addressCity,
      addressState,
      addressZip,
      stories,
      gutterSize,
      lang,
      measurements,
      downspouts,
      estimate,
      estimateLow,
      estimateHigh,
      discountCode,
      expDate,
      timestamp,
      customerName,
      customerEmail,
    } = body;

    // UTM attribution: query string takes precedence over body.
    // The estimator page URL may carry UTM params from Google/Meta ads.
    const utm_source   = pickUtm(searchParams, body, "utm_source");
    const utm_medium   = pickUtm(searchParams, body, "utm_medium");
    const utm_campaign = pickUtm(searchParams, body, "utm_campaign");
    const utm_term     = pickUtm(searchParams, body, "utm_term");
    const utm_content  = pickUtm(searchParams, body, "utm_content");
    const gclid        = pickUtm(searchParams, body, "gclid");

    // Phone is the minimum required to capture a lead
    if (!phone) {
      return NextResponse.json(
        { error: "Phone number is required" },
        { status: 400 }
      );
    }

    let bpResult = { attempted: false, ok: false, error: null, opportunity_id: null };

    if (process.env.BUILDER_PRIME_API_KEY) {
      bpResult.attempted = true;
      try {
        // Use customer name if provided, otherwise placeholder
        const nameToUse = customerName || "Estimator Lead";
        const { firstName, lastName } = splitName(nameToUse);

        // Build a detailed notes string with all the estimator context
        const notes = [
          `Lead from Instant Estimator tool (jronegutters.com/estimator)`,
          `Type: ${type || "lead"}`,
          `Language: ${lang || "en"}`,
          `Stories: ${stories || "?"}`,
          gutterSize ? `Gutter size: ${gutterSize}"` : "",
          measurements
            ? `Measurements: gutter=${measurements.gutter || 0}ft, soffit=${measurements.soffit || 0}ft, fascia=${measurements.fascia || 0}ft, guard=${measurements.guard || 0}ft`
            : "",
          downspouts ? `Downspouts: ${downspouts.totalFt || 0}ft total` : "",
          estimateLow && estimateHigh
            ? `Estimate range: $${estimateLow.toLocaleString()} - $${estimateHigh.toLocaleString()}`
            : estimate
              ? `Estimate: $${estimate.toLocaleString()}`
              : "",
          discountCode ? `Discount code: ${discountCode} (expires ${expDate || "?"})` : "",
          timestamp ? `Submitted: ${timestamp}` : "",
        ]
          .filter(Boolean)
          .join("\n");

        // BP custom fields for UTM attribution.
        // TODO: confirm exact BP custom field names with Popeye before relying
        // on these in reports. Same field names as send-lead/route.js.
        const utmCustomFields = {};
        if (utm_source)   utmCustomFields.lead_source   = utm_source;
        if (utm_medium)   utmCustomFields.lead_medium   = utm_medium;
        if (utm_campaign) utmCustomFields.lead_campaign = utm_campaign;
        if (utm_term)     utmCustomFields.lead_term     = utm_term;
        if (utm_content)  utmCustomFields.lead_content  = utm_content;

        const bpPayload = {
          userAccount: {
            firstName: firstName,
            lastName: lastName,
            emailAddress: customerEmail || "",
          },
          emailAddress: customerEmail || "",
          phoneNumber: normalizePhone(phone),
          addressLine1: address || "",
          city: addressCity || "",
          state: addressState || "FL",
          zip: addressZip || "",
          leadSourceDescription: "Form Inquiry",
          projectTypeDescription: inferProjectType(measurements),
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
          const oppMatch = bpText.match(/Opportunity:\s*(\d+)/);
          if (oppMatch) bpResult.opportunity_id = oppMatch[1];
          console.log(`✓ Estimator lead created in Builder Prime (opportunity ${bpResult.opportunity_id || "?"})`);

          // Best-effort: append a client activity note with the full estimator details
          // This way the sales rep sees the measurements + estimate range + discount code
          // when they open the lead in BP. Non-blocking, failure is OK.
          if (bpResult.opportunity_id) {
            try {
              await fetch(`${BP_BASE_URL}/client-activities/v1`, {
                method: "POST",
                headers: {
                  "x-api-key": process.env.BUILDER_PRIME_API_KEY,
                  "Content-Type": "application/json",
                  Accept: "application/json",
                },
                body: JSON.stringify({
                  opportunityId: parseInt(bpResult.opportunity_id),
                  description: notes,
                }),
              });
            } catch (actErr) {
              console.warn("⚠ Could not attach activity note:", actErr.message);
            }

            // Best-effort: log UTM attribution as a separate activity note.
            // Fallback in case BP custom fields (customFields above) are rejected.
            if (gclid || utm_source || utm_campaign || utm_medium || utm_term || utm_content) {
              const attrParts = [];
              if (gclid)        attrParts.push(`gclid: ${gclid}`);
              if (utm_source)   attrParts.push(`source: ${utm_source}`);
              if (utm_medium)   attrParts.push(`medium: ${utm_medium}`);
              if (utm_campaign) attrParts.push(`campaign: ${utm_campaign}`);
              if (utm_term)     attrParts.push(`term: ${utm_term}`);
              if (utm_content)  attrParts.push(`content: ${utm_content}`);
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
                console.error(`✗ Estimator attribution activity log failed (non-fatal): ${attrErr.message}`);
              }
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
    // After-hours voice callback (fire-and-forget), see send-lead/route.js
    // for rationale. Runs post-response via next/server `after()` so the BP
    // path is never blocked or affected by Vapi latency / errors.
    // ─────────────────────────────────────────────────────────────────────────
    if (bpResult.ok && bpResult.opportunity_id && isAfterHours() && isVoiceAgentEnabled()) {
      after(async () => {
        try {
          await triggerOutboundCall({
            phone: normalizePhone(phone),
            language: lang === "es" ? "es" : "en",
            bpOpportunityId: bpResult.opportunity_id,
            customerName: customerName || "Estimator Lead",
            leadSource: "estimator-lead",
          });
          console.log(`✓ Vapi after-hours callback triggered for estimator opp ${bpResult.opportunity_id}`);
        } catch (vapiErr) {
          console.error(`✗ Vapi trigger failed (non-fatal): ${vapiErr.message}`);
        }
      });
    }

    return NextResponse.json({
      success: true,
      captured_in_bp: bpResult.ok,
      bp_opportunity_id: bpResult.opportunity_id,
    });
  } catch (err) {
    console.error("Estimator lead error:", err);
    return NextResponse.json(
      { error: "Failed to process estimator lead" },
      { status: 500 }
    );
  }
}
