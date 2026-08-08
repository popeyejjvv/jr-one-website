// =============================================================================
// Company-domain email addresses
// =============================================================================
// BuilderPrime REFUSES to save a client whose email address is on the account's
// own company domain. VERIFIED 2026-08-08 by POSTing the homepage-capture
// payload shape to https://jronegutters.builderprime.com/api/clients with
// jr1-internal-domaintest-2026-08-08@jronegutters.com. The response:
//
//   HTTP 500
//   This email address uses your company's email domain and cannot be saved as
//   a client. Please use a different email address, or leave it blank.
//
// Two things made that failure expensive to diagnose:
//   1. It is a 500, which reads as "the integration is broken" rather than
//      "this input is not allowed".
//   2. The body is PLAIN TEXT, not the JSON error shape every other BuilderPrime
//      failure returns, so a caller that parses the body as JSON learns nothing.
//
// Twice, a capture test was run with an @jronegutters.com address, and twice the
// resulting 500 was read as a broken integration. It cost a full diagnostic run
// to establish that the integration was fine and the ADDRESS was the problem.
//
// This is not only a testing concern. An employee, a crew member, or anyone
// using a JR One address on the site hits exactly the same wall, and before this
// module they were told "We could not save your email" with no way to act on it.
//
// So the address is now detected BEFORE the network call, the submitter is told
// plainly what to do, and the event is logged under its own tag so it can never
// again be mistaken for an outage.
// =============================================================================

/** Domains BuilderPrime will refuse. Subdomains count (mail.jronegutters.com). */
export const COMPANY_EMAIL_DOMAINS = ["jronegutters.com"];

/** Distinct log tag. Grep this to separate "not allowed" from "integration down". */
export const COMPANY_DOMAIN_LOG_TAG = "COMPANY-DOMAIN-REJECTED";

export const JR_ONE_PHONE = "(844) 444-3114";

/**
 * What the submitter is told. Plain, actionable, and it does not blame them or
 * imply the site is broken. No em dashes or curly quotes, per the brand rules.
 */
export const COMPANY_DOMAIN_MESSAGE =
  `This address is on the JR One company domain, so our system cannot save it. ` +
  `Please use a different email address, or call us at ${JR_ONE_PHONE}.`;

/**
 * True when the address sits on a JR One company domain.
 *
 * Matches the domain itself and any subdomain of it, so mail.jronegutters.com
 * is caught too. Case and surrounding whitespace are ignored. A malformed
 * address returns false: judging validity is isValidCaptureEmail's job, and
 * that check runs first.
 */
export function isCompanyDomainEmail(email) {
  const e = String(email || "").trim().toLowerCase();
  const at = e.lastIndexOf("@");
  if (at < 1 || at === e.length - 1) return false;
  const domain = e.slice(at + 1);
  return COMPANY_EMAIL_DOMAINS.some(
    (d) => domain === d || domain.endsWith("." + d)
  );
}

/**
 * The rejection a caller returns to the browser. 400, not 500: the request was
 * understood and refused, and nothing is wrong with the server.
 */
export function companyDomainRejection() {
  return { status: 400, error: COMPANY_DOMAIN_MESSAGE };
}

/**
 * Log the refusal under its own tag.
 *
 * Deliberately says "not an integration failure" in the line itself, because
 * the person reading it at 2am is the one who otherwise starts debugging
 * BuilderPrime. Injectable logger so tests can assert the line without a spy on
 * the console.
 */
export function logCompanyDomainRejection({ surface, email, logger } = {}) {
  const log = typeof logger === "function" ? logger : console.warn;
  const line =
    `[${COMPANY_DOMAIN_LOG_TAG}] ${surface || "unknown-surface"}: ` +
    `${email || "(no address)"} is on a JR One company domain. ` +
    `BuilderPrime refuses these with a 500. Rejected before the API call. ` +
    `This is EXPECTED input validation, not an integration failure.`;
  log(line);
  return line;
}
