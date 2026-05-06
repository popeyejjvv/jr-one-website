import { NextResponse } from "next/server";
import crypto from "crypto";

// =============================================================================
// JR One, Vapi Call-Complete Webhook
// =============================================================================
// Receives end-of-call events from Vapi and posts a client-activity note onto
// the originating BuilderPrime opportunity. Used by the after-hours voice
// callback layer (Phase 1).
//
// Security: HMAC-SHA256 over the raw request body using VAPI_WEBHOOK_SECRET.
// Fail-closed, any signature mismatch (or missing secret) returns 401.
//
// Activity-note shape mirrors estimator-lead/route.js:154-171 (same headers,
// same /client-activities/v1 endpoint, same opportunityId/description body).
// =============================================================================

export const dynamic = "force-dynamic";

const BP_SUBDOMAIN = "jronegutters";
const BP_BASE_URL = `https://${BP_SUBDOMAIN}.builderprime.com/api`;

// ── Spanish-handoff detection ────────────────────────────────────────────────
// We chose substring matching against the assistant's verbatim handoff line
// because (a) it survives Vapi schema changes better than relying on a
// structured field that may or may not exist, and (b) the handoff line is
// distinctive enough to never collide with normal conversation. If Vapi later
// exposes a clean structured field (e.g. analysis.structuredOutput.spanishDetected
// or endedReason: "spanish-handoff"), prefer that and keep these substrings as
// a fallback. Detection is best-effort, false negatives just mean the morning
// team won't see the [NEEDS SPANISH CALLBACK] flag, not data loss.
const HANDOFF_PHRASE = "i'm only able to help in english right now";
const SPANISH_SIGNAL_FALLBACKS = [
  "hablo espa",
  "habla espa",
  "do you speak spanish",
  "habla espanol",
];

function detectSpanishHandoff(payload) {
  // Search the most likely fields. Vapi's webhook shape varies by event type
  // (call-end, end-of-call-report, etc.) so we cast a wide net.
  const candidates = [
    payload?.message?.transcript,
    payload?.message?.summary,
    payload?.message?.analysis?.summary,
    payload?.transcript,
    payload?.summary,
    payload?.analysis?.summary,
  ];

  // Also flatten messages[] if present (segmented transcripts).
  const messages = payload?.message?.messages || payload?.messages || [];
  if (Array.isArray(messages)) {
    for (const m of messages) {
      if (typeof m?.content === "string") candidates.push(m.content);
      if (typeof m?.message === "string") candidates.push(m.message);
    }
  }

  const haystack = candidates
    .filter((s) => typeof s === "string")
    .join("\n")
    .toLowerCase();

  if (!haystack) return false;
  if (haystack.includes(HANDOFF_PHRASE)) return true;
  return SPANISH_SIGNAL_FALLBACKS.some((needle) => haystack.includes(needle));
}

function safeTimingEqual(a, b) {
  try {
    const aBuf = Buffer.from(a, "hex");
    const bBuf = Buffer.from(b, "hex");
    if (aBuf.length !== bBuf.length) return false;
    return crypto.timingSafeEqual(aBuf, bBuf);
  } catch {
    return false;
  }
}

export async function POST(request) {
  // ── HMAC validation (fail-closed) ──────────────────────────────────────────
  const secret = process.env.VAPI_WEBHOOK_SECRET;
  if (!secret) {
    console.error("✗ VAPI_WEBHOOK_SECRET not set, rejecting webhook");
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const rawBody = await request.text();
  // Vapi's documented header is x-vapi-signature; we also accept x-vapi-secret
  // and x-webhook-signature defensively.
  const signature =
    request.headers.get("x-vapi-signature") ||
    request.headers.get("x-vapi-secret") ||
    request.headers.get("x-webhook-signature") ||
    "";

  if (!signature) {
    console.error("✗ Vapi webhook missing signature header");
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const expected = crypto
    .createHmac("sha256", secret)
    .update(rawBody)
    .digest("hex");

  // Strip a possible "sha256=" prefix some webhook senders use.
  const provided = signature.replace(/^sha256=/, "").trim();

  if (!safeTimingEqual(expected, provided)) {
    console.error("✗ Vapi webhook signature mismatch");
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  // ── Parse payload ──────────────────────────────────────────────────────────
  let payload;
  try {
    payload = JSON.parse(rawBody);
  } catch (err) {
    console.error("✗ Vapi webhook body not JSON:", err.message);
    return NextResponse.json({ error: "bad-request" }, { status: 400 });
  }

  // Vapi wraps events in { message: {...} } in newer schemas.
  const msg = payload?.message || payload;
  const metadata = msg?.call?.metadata || msg?.metadata || payload?.metadata || {};
  const bpOpportunityId = metadata.bpOpportunityId;

  if (!bpOpportunityId) {
    console.warn("⚠ Vapi webhook missing bpOpportunityId in metadata, nothing to attach");
    return NextResponse.json({ ok: true, skipped: "no-opportunity-id" });
  }

  // ── Extract call details ───────────────────────────────────────────────────
  const endedReason = msg?.endedReason || msg?.call?.endedReason || "unknown";
  const durationSec =
    msg?.durationSeconds ||
    msg?.call?.durationSeconds ||
    msg?.duration ||
    "?";
  const recordingUrl =
    msg?.recordingUrl || msg?.call?.recordingUrl || msg?.artifact?.recordingUrl || "";
  const transcript =
    msg?.transcript ||
    msg?.artifact?.transcript ||
    msg?.analysis?.summary ||
    msg?.summary ||
    "(no transcript provided)";
  const isVoicemail =
    /voicemail/i.test(endedReason) ||
    msg?.endedReason === "voicemail" ||
    msg?.call?.voicemailDetected === true;

  const needsSpanishCallback = detectSpanishHandoff(payload);

  // ── Build the activity note ────────────────────────────────────────────────
  const truncatedTranscript = String(transcript).slice(0, 2000);
  const headline = needsSpanishCallback
    ? "[NEEDS SPANISH CALLBACK] AFTER-HOURS VOICE CALLBACK, Vapi"
    : "AFTER-HOURS VOICE CALLBACK, Vapi";

  const description = [
    headline,
    `Ended: ${endedReason} | Duration: ${durationSec}s | Voicemail: ${isVoicemail ? "yes" : "no"}`,
    recordingUrl ? `Recording: ${recordingUrl}` : "",
    "---",
    truncatedTranscript,
  ]
    .filter(Boolean)
    .join("\n");

  // ── Attach to BP opportunity (mirrors estimator-lead/route.js:154-171) ─────
  if (process.env.BUILDER_PRIME_API_KEY) {
    try {
      const bpResponse = await fetch(`${BP_BASE_URL}/client-activities/v1`, {
        method: "POST",
        headers: {
          "x-api-key": process.env.BUILDER_PRIME_API_KEY,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          opportunityId: parseInt(bpOpportunityId, 10),
          description,
        }),
      });

      if (bpResponse.ok) {
        console.log(
          `✓ Vapi call note attached to BP opp ${bpOpportunityId} (spanish=${needsSpanishCallback}, voicemail=${isVoicemail})`
        );
      } else {
        const bpText = await bpResponse.text();
        console.error(
          `✗ Could not attach Vapi note to BP opp ${bpOpportunityId}: ${bpResponse.status}: ${bpText.slice(0, 300)}`
        );
      }
    } catch (bpErr) {
      console.error(`✗ BP activity-note exception: ${bpErr.message}`);
    }
  } else {
    console.warn("⚠ BUILDER_PRIME_API_KEY not set, Vapi note not attached");
  }

  // Always 200 so Vapi doesn't retry the webhook forever.
  return NextResponse.json({ ok: true });
}
