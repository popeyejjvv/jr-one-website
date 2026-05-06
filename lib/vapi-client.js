// =============================================================================
// JR One , Vapi Outbound Call Client
// =============================================================================
// Single responsibility: trigger a Vapi outbound call. Used by the after-hours
// voice callback layer in /api/send-lead and /api/estimator-lead.
//
// Design rules:
//   - Read env vars at call time (so kill switch / key rotation are instant).
//   - 8-second AbortController timeout , never hang the serverless function.
//   - Throw on non-2xx so the caller's try/catch can log it (still non-fatal).
//   - No-op (do not throw) when required env vars are missing , log instead,
//     so a partially-configured environment never breaks the BP create path.
//
// Phase 1: English assistant only. Phase 2 will branch on language.
// =============================================================================

const VAPI_BASE_URL = "https://api.vapi.ai/call";
const VAPI_TIMEOUT_MS = 8000;

/**
 * Trigger an outbound voice call via Vapi.
 *
 * @param {Object}  args
 * @param {string}  args.phone             - Customer phone, E.164 preferred ("+1XXXXXXXXXX")
 * @param {string}  [args.language="en"]   - Phase 1 only honors "en"
 * @param {string}  args.bpOpportunityId   - BuilderPrime opportunity id (passed back via webhook metadata)
 * @param {string}  [args.customerName]    - Display name for the call object
 * @param {string}  args.leadSource        - "send-lead" | "estimator-lead"
 * @returns {Promise<{id?: string}>}       - Vapi call object on success
 */
export async function triggerOutboundCall({
  phone,
  language = "en",
  bpOpportunityId,
  customerName,
  leadSource,
}) {
  const apiKey = process.env.VAPI_API_KEY;
  const phoneNumberId = process.env.VAPI_PHONE_NUMBER_ID;
  // Phase 1: always EN. Phase 2 will branch on language to VAPI_ASSISTANT_ID_ES.
  const assistantId = process.env.VAPI_ASSISTANT_ID_EN;

  // Fail-soft when env is incomplete: log and no-op so the BP path is never affected.
  if (!apiKey || !phoneNumberId || !assistantId) {
    console.warn(
      `⚠ Vapi env vars missing (apiKey=${!!apiKey}, phoneNumberId=${!!phoneNumberId}, assistantId=${!!assistantId}) , skipping outbound call`
    );
    return { skipped: true, reason: "missing-env" };
  }

  if (!phone) {
    console.warn("⚠ Vapi triggerOutboundCall called with no phone , skipping");
    return { skipped: true, reason: "no-phone" };
  }

  const payload = {
    assistantId,
    phoneNumberId,
    customer: {
      number: phone,
      ...(customerName ? { name: customerName } : {}),
    },
    metadata: {
      bpOpportunityId: String(bpOpportunityId || ""),
      language,
      leadSource: leadSource || "unknown",
      triggeredAt: new Date().toISOString(),
    },
  };

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), VAPI_TIMEOUT_MS);

  try {
    const response = await fetch(VAPI_BASE_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });

    const text = await response.text();
    if (!response.ok) {
      throw new Error(`Vapi ${response.status}: ${text.slice(0, 500)}`);
    }

    let parsed = {};
    try {
      parsed = JSON.parse(text);
    } catch {
      // Non-JSON response is unusual but not fatal , caller just gets {}.
    }
    return parsed;
  } catch (err) {
    if (err.name === "AbortError") {
      throw new Error(`Vapi timeout after ${VAPI_TIMEOUT_MS}ms`);
    }
    throw err;
  } finally {
    clearTimeout(timeout);
  }
}
