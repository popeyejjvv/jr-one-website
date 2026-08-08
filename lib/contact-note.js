// =============================================================================
// Contact-form message -> BuilderPrime client-activity note
// =============================================================================
// The contact form collects a message (app/contact/page.jsx, formData.message)
// that used to reach ONLY the ops notification email in
// app/api/send-lead/route.js. A rep working the CRM never saw what the person
// asked for. This module builds and posts the note that puts the message on
// the opportunity timeline, where a caller actually looks.
//
// Pure builder plus an injected-fetch poster, no next/server import, so
// tests/contact-note.test.js runs the SAME code the route runs.
//
// The note is deliberately best-effort: postContactNote never throws, and the
// route calls it only after the client record already exists, so no note
// outcome can affect lead creation.

// Longest note body POST /api/client-activities/v1 accepts. PROBED 2026-08-08
// against self-created test record 6308800: 8000 -> 200, 10000 -> 200
// (activity 8806008), 12000/16000/32000 -> 400 "Description length is too
// long - must be less than 10,000 characters." Notes are write-only through
// the API (GET returns 405), so acceptance-at-POST is the only testable bound.
export const NOTE_MAX_CHARS = 10000;

/** The rep-visible note text. Null when there is nothing to post. */
export function buildContactMessageNote({ message, page } = {}) {
  const msg = String(message || "").trim();
  if (!msg) return null;
  const header = `Message from website contact form${page ? ` (${page})` : ""}:\n`;
  return (header + msg).slice(0, NOTE_MAX_CHARS);
}

/**
 * POST the note. Never throws; returns {ok, status, body} so the route can
 * log the outcome without wrapping this in its own try/catch.
 *
 * AUTH SHAPE, verified 2026-08-08 against record 6308800: this endpoint
 * authenticates on a `secretKey` field in the BODY and requires a valid
 * `activityType`. x-api-key header alone -> 401 "Authentication Failed";
 * secretKey without activityType -> 500; secretKey + "NOTE" -> 200
 * (activity 8806002). The pre-existing note POSTs in both API routes sent
 * header-only and were failing 401 silently; run_outreach.py:205-218 always
 * carried secretKey, which is how the working shape was found.
 */
export async function postContactNote({
  fetchImpl,
  baseUrl,
  apiKey,
  opportunityId,
  description,
}) {
  try {
    const res = await fetchImpl(`${baseUrl}/client-activities/v1`, {
      method: "POST",
      headers: {
        "x-api-key": apiKey,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        opportunityId: parseInt(opportunityId, 10),
        activityType: "NOTE",
        description,
        secretKey: apiKey,
      }),
    });
    const text = await res.text();
    return { ok: res.ok, status: res.status, body: String(text).slice(0, 200) };
  } catch (err) {
    return { ok: false, status: 0, body: String((err && err.message) || err) };
  }
}
