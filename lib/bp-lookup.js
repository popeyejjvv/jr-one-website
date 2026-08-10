// =============================================================================
// Lookup-before-create against BuilderPrime /clients
// =============================================================================
// Intake never checked whether a submitter already exists, so every repeat
// visitor minted a new opportunity row (Michael Perry x4, Jennifer Obrien x7,
// the 2026-08-08 duplicate sweep). This module answers ONE question before a
// route creates a client: does a record with this phone or email already exist?
//
// What the API actually supports, probed live 2026-08-08 against
// jronegutters.builderprime.com with GET only:
//   - `?phone=` filters SERVER-SIDE and normalizes formatting itself:
//     (813) 555-0111, +18135550111, 18135550111, 813-555-0111 all returned the
//     same single record. A 7-digit fragment returns nothing.
//   - There is NO email filter under any probed name (emailAddress, email,
//     emailaddress, e-mail, q, search all returned the full unfiltered list),
//     so email matching pulls the full client list and matches here. Cost:
//     one extra GET of ~350 records (~250 KB) on submissions that reach the
//     create path without a server-side phone hit.
//
// Pure builder plus injected-fetch, same pattern as lib/contact-note.js, so
// tests drive the exact code the routes run. findExistingClient never throws:
// a lookup failure must never cost a lead - a duplicate is recoverable, a
// lost lead is not. The routes fall through to create on {error}.

/** Digits only; an 11-digit number with a leading 1 drops the 1. */
export function normalizePhoneDigits(s) {
  let d = String(s || "").replace(/\D/g, "");
  if (d.length === 11 && d.startsWith("1")) d = d.slice(1);
  return d;
}

/** Lowercased, trimmed. Empty stays empty and never matches anything. */
export function normalizeEmail(s) {
  return String(s || "").trim().toLowerCase();
}

/** RETURN VISIT 2026-08-08 style note prefix, date in UTC. */
export function returnVisitPrefix(now = new Date()) {
  return `RETURN VISIT ${now.toISOString().slice(0, 10)}`;
}

// Visitor-facing copy for a matched return visit. The success screen itself
// does not change; this ships in the JSON response so any surface that wants
// to show it has both languages. Spanish is idiomatic, accents intact.
export const RETURN_VISIT_MESSAGES = {
  en: "We already have your earlier request on file. This visit was added to the same record and our team will follow up with you.",
  es: "Ya tenemos registrada su solicitud anterior. Esta visita se agregó al mismo expediente y nuestro equipo le dará seguimiento.",
};

function unwrapClients(data) {
  if (Array.isArray(data)) return data;
  return (data && (data.data || data.clients)) || [];
}

function phoneFieldsMatch(client, digits) {
  if (!digits) return false;
  for (const f of ["phoneNumber", "homePhoneNumber", "officePhoneNumber"]) {
    const d = normalizePhoneDigits(client && client[f]);
    if (d && d === digits) return true;
  }
  return false;
}

/** Newest createdDate wins when several rows match (BP mints one row per
 * submission, so the newest is the row a rep most recently saw). */
export function pickNewest(matches) {
  return matches.reduce((best, c) =>
    (c.createdDate || 0) > (best.createdDate || 0) ? c : best);
}

/**
 * Find an existing client by normalized phone OR email. Blanks never match.
 * Returns { match, matchedOn, error }:
 *   match     - {id, clientId, fullName} of the newest matching row, or null
 *   matchedOn - "phone" | "email" | "both" | null
 *   error     - message when the lookup itself failed (route creates anyway)
 */
export async function findExistingClient({ fetchImpl, baseUrl, apiKey, phone, email }) {
  const digits = normalizePhoneDigits(phone);
  const em = normalizeEmail(email);
  if (!digits && !em) return { match: null, matchedOn: null, error: null };

  const headers = { "x-api-key": apiKey, Accept: "application/json" };
  try {
    let matches = [];

    if (digits) {
      const res = await fetchImpl(`${baseUrl}/clients?phone=${digits}`, { headers });
      if (!res.ok) throw new Error(`GET /clients?phone= -> ${res.status}`);
      matches = unwrapClients(await res.json()).filter(Boolean);
    }

    // Server-side phone filter missed (or no phone given): pull the list once
    // and match here - covers email (no server filter exists) and the two
    // secondary phone fields the ?phone= filter may not search.
    if (matches.length === 0) {
      const res = await fetchImpl(`${baseUrl}/clients`, { headers });
      if (!res.ok) throw new Error(`GET /clients -> ${res.status}`);
      matches = unwrapClients(await res.json()).filter((c) => {
        if (!c) return false;
        const ce = normalizeEmail(c.emailAddress);
        if (em && ce && ce === em) return true;
        return phoneFieldsMatch(c, digits);
      });
    }

    if (matches.length === 0) return { match: null, matchedOn: null, error: null };

    const newest = pickNewest(matches);
    const phoneHit = phoneFieldsMatch(newest, digits);
    const ne = normalizeEmail(newest.emailAddress);
    const emailHit = Boolean(em && ne && ne === em);
    return {
      match: {
        id: newest.id,
        clientId: newest.clientId,
        fullName: newest.fullName || "",
      },
      // The ?phone= server filter can match a row on a field this module
      // cannot see; a phone-filter hit that neither local check explains is
      // still a phone match.
      matchedOn: phoneHit && emailHit ? "both" : emailHit ? "email" : "phone",
      error: null,
    };
  } catch (err) {
    return { match: null, matchedOn: null, error: String((err && err.message) || err) };
  }
}

/**
 * The one decision both intake routes act on.
 *   { action: "attach-existing", opportunityId, matchedOn }  - note the visit
 *     on the existing record, create NOTHING.
 *   { action: "create", lookupError }                        - no match, or
 *     the lookup failed (lookupError says why); create as before.
 */
export async function resolveIntakeTarget(opts) {
  const { match, matchedOn, error } = await findExistingClient(opts);
  if (match) {
    return { action: "attach-existing", opportunityId: String(match.id), matchedOn };
  }
  return { action: "create", lookupError: error };
}
