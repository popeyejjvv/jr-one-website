import { NextResponse, after } from "next/server";
import nodemailer from "nodemailer";
import { isAfterHours, isVoiceAgentEnabled } from "@/lib/business-hours";
import { triggerOutboundCall } from "@/lib/vapi-client";
import { assessLeadSpam } from "@/lib/lead-spam";
import { spoolNotice } from "@/lib/notify-spool";
import {
  buildBpPayload,
  buildJobSummary,
  isInternalTestSubmission,
  normalizePhone,
  planBpWrite,
} from "@/lib/estimator-lead";
import {
  OPS_INBOX,
  SEND_STATUS,
  runEstimateEmail,
} from "@/lib/estimate-email";
import {
  resolveIntakeTarget,
  returnVisitPrefix,
  RETURN_VISIT_MESSAGES,
} from "@/lib/bp-lookup";

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

// splitName / normalizePhone / inferProjectType moved to @/lib/estimator-lead
// so the tests import the SAME code this route runs. They are re-exported
// through the import above; do not re-declare them here.

/**
 * Attach a client-activity note to an existing opportunity.
 * POST is the only verb BuilderPrime allows on this endpoint
 * (OPTIONS -> "Allow: POST,OPTIONS", verified 2026-08-07), and GET returns
 * 405, so a note is write-only: a rep sees it in the BuilderPrime UI but no
 * script can read it back. Never put data here that something needs to read.
 */
async function attachActivityNote(opportunityId, description) {
  // AUTH SHAPE (verified 2026-08-08 against test record 6308800): this
  // endpoint authenticates on `secretKey` in the BODY plus a valid
  // `activityType`. The x-api-key header alone returns 401 "Authentication
  // Failed", which is what every note POST from this site was silently
  // getting before this fix. Working shape taken from
  // jrone-outreach/scripts/run_outreach.py:205-218.
  const res = await fetch(`${BP_BASE_URL}/client-activities/v1`, {
    method: "POST",
    headers: {
      "x-api-key": process.env.BUILDER_PRIME_API_KEY,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      opportunityId: parseInt(opportunityId, 10),
      activityType: "NOTE",
      description,
      secretKey: process.env.BUILDER_PRIME_API_KEY,
    }),
  });
  if (!res.ok) {
    const text = await res.text();
    console.error(`✗ Activity note POST ${res.status}: ${text.slice(0, 200)}`);
  }
  return res.ok;
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
      // Set by public/estimator.html on the SECOND call, after the record
      // already exists. Its presence means "do not create another client".
      bpOpportunityId,
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

    // ── Spam assessment (2026-07-29, gibberish-name bot campaign) ──
    // Blocked submissions never reach BuilderPrime or Vapi. The bot still gets
    // a normal success response so it learns nothing. See lib/lead-spam.js.
    const spamCheck = assessLeadSpam({
      name: customerName,
      email: customerEmail,
      phone,
      zip: addressZip,
      company: body.company,
      form_ms: body.form_ms,
    });
    if (spamCheck.block) {
      console.warn(`⚠ SPAM BLOCKED (estimator) from ${ip}: ${spamCheck.reasons.join("; ")}`);
      // Rescue path: this route has no normal email fallback, so a blocked
      // false positive would otherwise vanish silently. It stays rescuable -
      // but as a line in the daily operator digest rather than its own email.
      // CHANGED 2026-08-04 alongside send-lead, same reasoning: keep the
      // record, drop the interrupt. Console logging is the second copy so the
      // payload survives in Vercel logs even if the spool is unreachable.
      console.warn("⚠ SPAM BLOCKED (estimator) — payload for manual recovery:",
        JSON.stringify({ customerName, customerEmail, phone, addressZip, reasons: spamCheck.reasons }));

      // One appended line each, same as send-lead: the digest carries a count
      // plus a scannable list so a false positive is still findable.
      const t = new Date().toLocaleTimeString("en-US", {
        timeZone: "America/New_York", hour: "numeric", minute: "2-digit",
      });
      after(async () => {
        const res = await spoolNotice({
          source: "website",
          tag: "spam-blocked-estimator",
          subject: "Spam-blocked estimator submissions (kept out of BuilderPrime)",
          severity: "info",
          append: true,
          body:
            `${t}  ${customerName || "no name"} | ${phone || "no phone"} | ` +
            `${customerEmail || "no email"} | ${addressZip || "no zip"} | ` +
            `${spamCheck.reasons.join(", ")}`,
        });
        if (!res.ok) {
          console.error("✗ spam-blocked estimator lead could not be spooled:", res.error);
        }
      });
      return NextResponse.json({
        success: true,
        captured_in_bp: true,
        bp_opportunity_id: String(6000000 + (Date.now() % 1000000)),
      });
    }

    // ─────────────────────────────────────────────────────────────────────────
    // SEND THE CUSTOMER THEIR ESTIMATE (2026-08-07)
    //
    // The estimator told the visitor "Estimate sent to {email}" and nothing was
    // ever sent by anything. This is where the estimate is actually sent.
    //
    // WHY IT RUNS HERE, above the BuilderPrime branch, and not inside after():
    //
    //  - ABOVE THE BRANCH, because planBpWrite() returns "attach" and this route
    //    returns early whenever bpOpportunityId is present, and
    //    public/estimator.html:1129 ALWAYS sends bpOpportunityId on the customer
    //    call. Anything placed below that branch is unreachable for every real
    //    customer. The email does not depend on BuilderPrime at all, so it does
    //    not belong inside either arm of that decision.
    //
    //  - NOT IN after(), because after() runs once the response has already been
    //    sent, so the route could not report whether the mail actually went and
    //    the browser would be back to guessing. Telling the browser the truth
    //    costs one SMTP round trip, on a button that already reads "SENDING...".
    //
    // Only type "customer" sends. That is the submission where the visitor typed
    // an address and pressed SEND MY ESTIMATE. The earlier phone-only call is
    // type "lead" and carries no address to send to.
    // ─────────────────────────────────────────────────────────────────────────
    let estimateEmail = {
      attempted: false,
      emailed: false,
      messageId: null,
      status: SEND_STATUS.NO_ADDRESS,
      error: null,
      ops: { attempted: false, ok: false, error: null },
    };

    if (type === "customer") {
      const mailUser = process.env.GMAIL_USER;
      const mailPass = process.env.GMAIL_APP_PASSWORD;

      estimateEmail = await runEstimateEmail({
        customerName,
        customerEmail,
        phone,
        address,
        lang,
        estimateLow,
        estimateHigh,
        measurements,
        downspouts,
        gutterSize,
        discountCode,
        expDate,
        submittedAt: timestamp,
        bpOpportunityId,

        // Customer-facing. Branded HTML only. lib/estimate-email.js runs
        // assertBrandedChrome() before this function is ever called and throws
        // rather than let an unbranded or false-claiming email out the door.
        sendCustomerEmail: async ({ to, subject, html, text }) => {
          if (!mailUser || !mailPass) {
            return { ok: false, error: "GMAIL_USER or GMAIL_APP_PASSWORD not set" };
          }
          const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: { user: mailUser, pass: mailPass },
          });
          const info = await transporter.sendMail({
            from: `"JR One Aluminum" <${mailUser}>`,
            to,
            replyTo: OPS_INBOX,
            subject,
            html,
            text,
          });
          return { ok: true, messageId: info && info.messageId };
        },

        // Internal operator notice to the monitored inbox. Same transport and
        // same plain-text shape the homepage capture already uses for that inbox
        // (app/api/send-lead/route.js sendNotification). Not customer-facing, so
        // it deliberately does not carry brand chrome.
        sendOpsNotification: async ({ subject, text }) => {
          if (!mailUser || !mailPass) {
            return { ok: false, error: "GMAIL_USER or GMAIL_APP_PASSWORD not set" };
          }
          const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: { user: mailUser, pass: mailPass },
          });
          await transporter.sendMail({
            from: `"JR One Website" <${mailUser}>`,
            to: OPS_INBOX,
            subject,
            text,
          });
          return { ok: true };
        },
      });

      console.log(
        "Estimate email result:",
        JSON.stringify({
          to: customerEmail || null,
          status: estimateEmail.status,
          emailed: estimateEmail.emailed,
          messageId: estimateEmail.messageId || null,
          error: estimateEmail.error,
          ops: estimateEmail.ops,
        })
      );

      // A failure is written down where a human will actually see it, not only
      // in a Vercel log nobody opens. The visitor is separately told on screen
      // that it did not go through, so this is the follow-up trail.
      if (
        estimateEmail.status === SEND_STATUS.FAILED ||
        (estimateEmail.attempted && !estimateEmail.ops.ok)
      ) {
        after(async () => {
          const res = await spoolNotice({
            source: "website",
            tag: "estimate-email-failed",
            subject: "Instant Estimator could not email a customer their estimate",
            severity: "warn",
            append: true,
            body:
              `${timestamp || "(no timestamp)"}  ${customerEmail || "no email"} | ` +
              `${customerName || "no name"} | ${normalizePhone(phone)} | ` +
              `customer_copy=${estimateEmail.emailed ? "ok" : `FAILED ${estimateEmail.error}`} | ` +
              `ops_notice=${estimateEmail.ops.ok ? "ok" : `FAILED ${estimateEmail.ops.error}`}`,
          });
          if (!res.ok) {
            console.error("estimate email failure could not be spooled:", res.error);
          }
        });
      }
    }

    let bpResult = { attempted: false, ok: false, error: null, opportunity_id: null };

    // BP custom fields for UTM attribution.
    // TODO: confirm exact BP custom field names with Popeye before relying
    // on these in reports. Same field names as send-lead/route.js.
    const utmCustomFields = {};
    if (utm_source)   utmCustomFields.lead_source   = utm_source;
    if (utm_medium)   utmCustomFields.lead_medium   = utm_medium;
    if (utm_campaign) utmCustomFields.lead_campaign = utm_campaign;
    if (utm_term)     utmCustomFields.lead_term     = utm_term;
    if (utm_content)  utmCustomFields.lead_content  = utm_content;

    const notes = buildJobSummary(body);

    // ── SECOND CALL: the record already exists, so DO NOT create another ──
    // public/estimator.html keeps the opportunity id returned by the first
    // call and sends it back when the visitor supplies a name. Creating a
    // second client here is what put duplicate records in this CRM (see
    // opportunities 5651220 / 5651222, same phone, 86 seconds apart).
    //
    // BuilderPrime has NO PUT and NO PATCH on any resource (verified by
    // OPTIONS on 14 paths, 2026-08-07), so the name CANNOT be written onto
    // the existing record. It goes into an activity note, which the rep sees
    // in the BuilderPrime UI. This is a BuilderPrime limitation, not a
    // shortcut: there is no API that would do better.
    const writePlan = planBpWrite({
      bpOpportunityId,
      hasApiKey: Boolean(process.env.BUILDER_PRIME_API_KEY),
    });

    if (writePlan.action === "attach") {
      let noteOk = false;
      try {
        noteOk = await attachActivityNote(bpOpportunityId, notes);
      } catch (err) {
        console.error(`✗ Estimator follow-up note failed: ${err.message}`);
      }
      if (!noteOk) {
        console.error(
          `✗ Estimator follow-up note NOT attached to opportunity ${bpOpportunityId}`
        );
      }
      // The name can never reach the record's own field, so surface it where
      // a human will act on it instead of letting it evaporate.
      after(async () => {
        await spoolNotice({
          source: "website",
          tag: "estimator-name-supplied",
          subject: "Estimator visitor gave a name after the record was created",
          severity: "info",
          append: true,
          body:
            `opportunity ${bpOpportunityId} | ${customerName || "no name"} | ` +
            `${customerEmail || "no email"} | ${normalizePhone(phone)} | ` +
            "BuilderPrime has no update endpoint, so the record name still " +
            "reads as the anonymous label. Rename it by hand if you want it fixed.",
        });
      });
      return NextResponse.json({
        success: true,
        captured_in_bp: true,
        bp_opportunity_id: String(bpOpportunityId),
        created_new_record: false,
        note_attached: noteOk,
        // The browser shows "Estimate sent to {address}" ONLY when this is true.
        // This is the branch every real customer takes, which is exactly why the
        // send runs above the branch rather than inside one arm of it.
        estimate_emailed: estimateEmail.emailed,
        estimate_email_status: estimateEmail.status,
        estimate_email_error: estimateEmail.emailed ? null : estimateEmail.customerMessage || null,
      });
    }

    if (writePlan.action === "create") {
      bpResult.attempted = true;
      try {
        // RETURN-VISIT LOOKUP (2026-08-08): never mint a second record for a
        // phone or email BuilderPrime already knows. What the API supports and
        // why email matching is client-side lives in lib/bp-lookup.js. A
        // lookup failure falls through to create below - a duplicate is
        // recoverable, a lost lead is not.
        const intake = await resolveIntakeTarget({
          fetchImpl: fetch,
          baseUrl: BP_BASE_URL,
          apiKey: process.env.BUILDER_PRIME_API_KEY,
          phone,
          email: customerEmail,
        });
        if (intake.action === "attach-existing") {
          bpResult.ok = true;
          bpResult.opportunity_id = intake.opportunityId;
          bpResult.return_visit = true;
          console.log(`✓ Return visit (${intake.matchedOn}) matched existing BP record ${intake.opportunityId} - no new record created`);
          const rvOk = await attachActivityNote(
            intake.opportunityId,
            `${returnVisitPrefix()}: ${notes}`
          );
          if (rvOk) {
            console.log(`✓ Return-visit note attached to opportunity ${intake.opportunityId}`);
          } else {
            console.error(`✗ Return-visit note NOT attached to opportunity ${intake.opportunityId}`);
          }
        } else {
          if (intake.lookupError) {
            console.error(`✗ BP lookup failed, creating anyway (a duplicate is recoverable, a lost lead is not): ${intake.lookupError}`);
          }
          const bpPayload = buildBpPayload({ ...body, utmCustomFields });

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
            // when they open the lead in BP. Non-blocking, failure is OK - but it
            // is LOGGED now: the pre-fix version checked nothing and the endpoint
            // was 401-ing every one of these silently (see attachActivityNote).
            if (bpResult.opportunity_id) {
              try {
                const noteOk = await attachActivityNote(bpResult.opportunity_id, notes);
                if (noteOk) {
                  console.log(`✓ Job-data note attached to opportunity ${bpResult.opportunity_id}`);
                } else {
                  console.error(`✗ Job-data note NOT attached to opportunity ${bpResult.opportunity_id}`);
                }
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
                  await attachActivityNote(
                    bpResult.opportunity_id,
                    `[AD ATTRIBUTION] ${attrParts.join(" | ")}`
                  );
                } catch (attrErr) {
                  console.error(`✗ Estimator attribution activity log failed (non-fatal): ${attrErr.message}`);
                }
              }
            }
          } else {
            bpResult.error = `${bpResponse.status}: ${bpText.slice(0, 500)}`;
            console.error(`✗ Builder Prime error: ${bpResult.error}`);
          }
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
    if (bpResult.ok && bpResult.opportunity_id && isAfterHours() && isVoiceAgentEnabled()
        && !isInternalTestSubmission({ phone, customerEmail, address, name: customerName })) {
      after(async () => {
        try {
          await triggerOutboundCall({
            phone: normalizePhone(phone),
            language: lang === "es" ? "es" : "en",
            bpOpportunityId: bpResult.opportunity_id,
            // Only pass a REAL name. vapi-client.js:61 omits the field when
            // this is falsy, which is what we want: the agent should not
            // greet a customer by a placeholder it read off a CRM record.
            customerName: customerName || undefined,
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
      // Return visit: the record already existed, this submission was noted on
      // it instead of minting a duplicate. Message ships EN + ES; the success
      // screen the visitor sees is unchanged either way.
      return_visit: Boolean(bpResult.return_visit),
      return_visit_message: bpResult.return_visit
        ? RETURN_VISIT_MESSAGES[lang === "es" ? "es" : "en"]
        : null,
      // Same contract as the attach branch above. A lead can be captured while
      // the estimate email fails; those two outcomes are reported separately so
      // the browser never infers one from the other.
      estimate_emailed: estimateEmail.emailed,
      estimate_email_status: estimateEmail.status,
      estimate_email_error: estimateEmail.emailed ? null : estimateEmail.customerMessage || null,
    });
  } catch (err) {
    console.error("Estimator lead error:", err);
    return NextResponse.json(
      { error: "Failed to process estimator lead" },
      { status: 500 }
    );
  }
}
