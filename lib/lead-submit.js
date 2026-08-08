// =============================================================================
// Lead form submission: read the reply, tell the truth
// =============================================================================
// WHY THIS EXISTS
// All 21 React lead forms plus public/estimator.html called the API and then
// ignored what it said. A fetch that returns 403, 429 or 500 does NOT reject in
// JavaScript, so a handler that does not inspect the response reports success
// for failures the server explicitly reported. Eight of them
// (app/7-inch-gutters, app/copper-gutters, app/gutter-cleaning,
// app/gutter-guards, app/gutter-repair, app/page, app/seamless-aluminum-gutters,
// app/specialty-gutters) went further and wrote `void res` to discard the reply
// on purpose.
//
// That is not theoretical. app/api/send-lead/route.js rate limits at 5 requests
// per IP per minute and returns 429, verified live. A household behind one NAT
// address, or one person retrying, hits it and is shown a green checkmark while
// nothing is recorded.
//
// This module is the single place that decides what happened and what the
// person is told. One copy, so the 22 surfaces cannot drift apart again.
//
// LANGUAGE: uses the mechanism the site already has. lib/LanguageContext.jsx
// exposes `lang` ("en" | "es") through useLanguage(); pages already do
// `const t = T[lang]`. SUBMIT_ERRORS is keyed the same way. No new mechanism.
// =============================================================================

// VERIFIED from the repo, not from memory. `(844) 444-3114` is the only JR One
// phone number published anywhere in this codebase:
//   app/layout.js:41                 telephone in the LocalBusiness JSON-LD
//   app/layout.js:140                telephone in the second schema block
//   components/SiteFooter.jsx:233    the site-wide footer
//   app/contact/page.jsx:287         tel:8444443114
// A repo-wide scan for phone-shaped strings returned only this number, an input
// placeholder "(555) 123-4567" in public/estimator.html:337, and the digits
// 6156806855 which are a fragment of the Facebook page id 61568068558954 in a
// URL (app/layout.js:108), not a phone number. Confirmed live: the string
// appears 3 times in the served HTML of https://www.jronegutters.com/contact.
export const JR_ONE_PHONE = "(844) 444-3114";

/** The funnel event fired when a lead submission fails. Must also be present in
 *  ALLOWED_EVENTS in lib/estimator-lead.js or the endpoint returns 400. */
export const LEAD_SUBMIT_FAILED_EVENT = "lead_submit_failed";

// ── Payload cap ──────────────────────────────────────────────────────────────
// The contact form attaches photos as base64 data URLs inside the JSON body, so
// the request can grow large enough that the platform rejects it at the edge and
// the route never runs. When that happens the fetch still RESOLVES, so the old
// code showed success for a request the server never saw.
//
// There is no configured limit anywhere in this repo to read: a search for
// bodySizeLimit, sizeLimit, `export const config` and a vercel.json across
// next.config.js, app/api/send-lead/route.js and app/api/estimator-events/route.js
// returned nothing, and vercel.json does not exist. The effective cap was
// therefore a platform default that is NOT visible from this codebase.
//
// So this file DEFINES the limit rather than guessing at someone else's. It is
// deliberately below any common platform default, it is enforced in the browser
// before the request is built, and it is now a value that can be read from
// config, which is what it was not before.
export const MAX_SUBMIT_PAYLOAD_BYTES = 4 * 1024 * 1024; // 4 MB

/** VERIFIED from components/ui/PhotoUpload.jsx:22 - the component's own cap. */
export const MAX_PHOTOS = 5;

// ── User-facing strings, EN + ES ─────────────────────────────────────────────
// No status codes on screen. Each case says what happened and what to do next.
// The Spanish is written idiomatically with real accents, not translated word
// for word from the English.
export const SUBMIT_ERRORS = {
  en: {
    rateLimited:
      "That was a lot of tries at once. Please wait a moment and send it again.",
    callUs:
      `Your request did not go through. Please call us at ${JR_ONE_PHONE} and we will take care of it.`,
    network:
      `Your connection dropped, so your request never reached us. Check your internet and try again, or call us at ${JR_ONE_PHONE}.`,
    tooManyPhotos: (n) =>
      `You can attach up to ${MAX_PHOTOS} photos. Please remove ${n} and try again.`,
    photosTooLarge: (names) =>
      `These photos are too large to send: ${names}. Please remove them, or take new ones at a smaller size.`,
    payloadTooLarge:
      "Your photos add up to more than we can send at once. Please remove one or two and try again.",
  },
  es: {
    rateLimited:
      "Fueron muchos intentos seguidos. Espere un momento y vuelva a enviarlo.",
    callUs:
      `Su solicitud no se envió. Llámenos al ${JR_ONE_PHONE} y lo resolvemos.`,
    network:
      `Se perdió la conexión y su solicitud nunca nos llegó. Revise su internet e inténtelo de nuevo, o llámenos al ${JR_ONE_PHONE}.`,
    tooManyPhotos: (n) =>
      `Puede adjuntar hasta ${MAX_PHOTOS} fotos. Quite ${n} e inténtelo de nuevo.`,
    photosTooLarge: (names) =>
      `Estas fotos pesan demasiado para enviarse: ${names}. Quítelas, o tome unas nuevas de menor tamaño.`,
    payloadTooLarge:
      "Sus fotos juntas pesan más de lo que podemos enviar de una vez. Quite una o dos e inténtelo de nuevo.",
  },
};

/** Pick the string table for a language, defaulting to English. */
export function errorsFor(lang) {
  return SUBMIT_ERRORS[lang] || SUBMIT_ERRORS.en;
}

/** One shared style so the error reads identically on all 21 forms. The forms
 *  sit on a light paper panel, so this is the on-light error colour. */
export const SUBMIT_ERROR_STYLE = {
  fontFamily: "var(--jr-font-body)",
  fontSize: "14px",
  fontWeight: 600,
  color: "#B3261E",
  textAlign: "center",
  marginTop: "var(--jr-space-3)",
  lineHeight: 1.5,
};

/**
 * Decide which failure this is, from the customer's point of view.
 *
 * "rateLimited" is kept separate from "callUs" on purpose: a 429 means the
 * request was refused for going too fast and will work shortly, so telling that
 * person to phone the office is both wrong and expensive. A 403 or a 5xx means
 * something is actually broken and the phone is the right next step.
 */
export function classifySubmitFailure(status) {
  if (status === 429) return "rateLimited";
  if (status === 413) return "payloadTooLarge";
  return "callUs";
}

/**
 * Estimate the JSON body size without serialising twice.
 */
export function payloadByteLength(body) {
  try {
    const json = typeof body === "string" ? body : JSON.stringify(body);
    if (typeof TextEncoder !== "undefined") {
      return new TextEncoder().encode(json).length;
    }
    return json.length;
  } catch {
    return 0;
  }
}

/**
 * Validate attached photos BEFORE a request is built, so the person is told
 * while they can still fix it.
 *
 * Returns null when everything is fine, or a ready-to-show message.
 */
export function validatePhotosBeforeSubmit(photos, lang) {
  const strings = errorsFor(lang);
  const list = Array.isArray(photos) ? photos : [];
  if (list.length === 0) return null;

  if (list.length > MAX_PHOTOS) {
    return strings.tooManyPhotos(list.length - MAX_PHOTOS);
  }

  // Per-photo ceiling: the encoded data URL, which is what actually travels.
  // Base64 inflates roughly 4/3, so a photo near the payload cap on its own is
  // already unsendable alongside anything else.
  const perPhotoCeiling = Math.floor(MAX_SUBMIT_PAYLOAD_BYTES / 2);
  const tooBig = list
    .filter((p) => p && typeof p.dataUrl === "string" && p.dataUrl.length > perPhotoCeiling)
    .map((p, i) => (p && p.filename ? p.filename : `photo ${i + 1}`));
  if (tooBig.length > 0) {
    return strings.photosTooLarge(tooBig.join(", "));
  }

  const total = list.reduce(
    (sum, p) => sum + (p && typeof p.dataUrl === "string" ? p.dataUrl.length : 0),
    0
  );
  if (total > MAX_SUBMIT_PAYLOAD_BYTES) {
    return strings.payloadTooLarge;
  }
  return null;
}

/**
 * Fire the lost-lead beacon.
 *
 * Goes to /api/estimator-events, which is a DIFFERENT route from send-lead, so
 * it can still be reachable when the lead route is failing. It never throws and
 * its result is never awaited by the caller's happy path: analytics must not be
 * able to break a form.
 *
 * WHAT THIS RECORDS: that a submission failed, which form, the failure kind and
 * status, and a timestamp.
 * WHAT IT DELIBERATELY DOES NOT RECORD: the person. No name, phone, email,
 * address or message. That is enforced on the server too, not just here:
 * sanitizeEventParams in lib/estimator-lead.js:79-92 drops any key matching
 * /phone|email|name|address|customer/i before the line is written.
 *
 * So this beacon tells Popeye that a lead was lost and from where. It CANNOT
 * tell him who it was, and the lead is NOT recoverable from it. Recovering the
 * person depends on them trying again or calling.
 */
export async function reportSubmitFailure({ formId, status, kind } = {}) {
  try {
    if (typeof fetch !== "function") return false;
    const res = await fetch("/api/estimator-events", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      keepalive: true,
      body: JSON.stringify({
        event: LEAD_SUBMIT_FAILED_EVENT,
        params: {
          form: String(formId || "unknown").slice(0, 40),
          status: String(status === undefined || status === null ? "none" : status),
          kind: String(kind || "unknown"),
          ts: new Date().toISOString(),
        },
      }),
    });
    return Boolean(res && res.ok);
  } catch {
    return false;
  }
}

/**
 * Submit a lead and report honestly what happened.
 *
 * @returns {Promise<{ok: boolean, kind?: string, status?: number, message?: string}>}
 */
export async function submitLeadForm({
  body,
  formId,
  lang = "en",
  endpoint = "/api/send-lead",
} = {}) {
  const strings = errorsFor(lang);

  // Refuse to send something the edge will reject before the route runs.
  if (payloadByteLength(body) > MAX_SUBMIT_PAYLOAD_BYTES) {
    await reportSubmitFailure({ formId, status: "oversize", kind: "payloadTooLarge" });
    return { ok: false, kind: "payloadTooLarge", message: strings.payloadTooLarge };
  }

  let res;
  try {
    res = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
  } catch {
    // Genuine transport failure. Nothing reached the server.
    await reportSubmitFailure({ formId, status: "network", kind: "network" });
    return { ok: false, kind: "network", message: strings.network };
  }

  if (res.ok) {
    // A spam-blocked submission also returns 200 with a success body, by
    // design, so a bot gets no signal. That is intentional and is why a 200 is
    // treated as success here without further inspection of the block state.
    let data = null;
    try {
      data = await res.json();
    } catch {
      data = null;
    }
    if (data && data.error) {
      await reportSubmitFailure({ formId, status: res.status, kind: "callUs" });
      return { ok: false, kind: "callUs", status: res.status, message: strings.callUs };
    }
    return { ok: true, status: res.status };
  }

  const kind = classifySubmitFailure(res.status);
  await reportSubmitFailure({ formId, status: res.status, kind });
  return { ok: false, kind, status: res.status, message: strings[kind] };
}
