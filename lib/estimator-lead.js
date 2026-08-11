// =============================================================================
// Estimator lead payload builder
// =============================================================================
// Pure functions, no next/server imports, so app/api/estimator-lead/route.js
// and tests/estimator-lead-payload.test.js run the SAME code. The older
// tests/estimator-utils.test.js pasted copies of these helpers into the test
// file, which tests the copy rather than the route.
//
// WHAT THE BUILDERPRIME API ACTUALLY ALLOWS (probed 2026-08-07 with OPTIONS,
// a read-only verb; no record was written):
//
//   OPTIONS /api/clients               -> Allow: GET,HEAD,POST,OPTIONS
//   OPTIONS /api/clients/v1            -> Allow: POST,OPTIONS
//   OPTIONS /api/clients/6090933       -> 404
//   OPTIONS /api/opportunities         -> 404
//   OPTIONS /api/projects/v1           -> Allow: GET,HEAD,POST,OPTIONS
//   OPTIONS /api/projects/v1/1785324   -> Allow: POST,GET,HEAD,OPTIONS
//   OPTIONS /api/client-activities/v1  -> Allow: POST,OPTIONS
//   OPTIONS /api/meetings/v1           -> Allow: GET,HEAD,POST,OPTIONS
//   OPTIONS /api/employees/v1          -> Allow: GET,HEAD,OPTIONS
//
// There is NO PUT and NO PATCH on any BuilderPrime resource. A client record
// therefore CANNOT be edited through the API after it is created. That single
// fact drives two decisions below:
//
//   1. Everything the estimator knows must go in at CREATE time, because there
//      is no second chance to add it.
//   2. When the visitor later supplies a name, the route must NOT create a
//        second client (that is how duplicates got into this CRM). It attaches
//        the name as a client-activity note on the SAME opportunity instead.
//
// WHICH FIELDS ARE CONFIRMED TO READ BACK
// Confirmed by reading GET /api/clients (334 records) and comparing against
// what the two write paths send:
//   VERIFIED writable + readable: firstName, lastName, emailAddress,
//     phoneNumber, addressLine1, city, state, zip, companyName,
//     leadSourceDescription, projectTypeDescription, buildingTypeDescription.
//   NOT CONFIRMED: estimatedValue (0 of 334 records carry a value),
//     externalId (0 of 334), customFields (no custom key came back on any
//     record), closeProbability (1 of 334).
//
// So the dollar range has no confirmed readable home. It is sent in
// estimatedValue as a best effort AND encoded into lastName, which is
// confirmed readable. The measurements likewise have no readable field; they
// go in the activity note, which is visible to a rep in the BuilderPrime web
// UI but is NOT readable through the API (GET on client-activities is 405).
// That limitation is BuilderPrime's, not this code's.
// =============================================================================

// The old placeholder. Never write this again; it is indistinguishable from
// the internal test records that share it.
export const LEGACY_PLACEHOLDER_NAME = "Estimator Lead";

/**
 * Decide whether this submission creates a client or attaches to an existing
 * one. Lives here rather than inline in the route so a test can drive the real
 * decision: `node --test` cannot import the route (it pulls in next/server,
 * which does not resolve outside the Next bundler), and a test that pasted a
 * copy of this logic would keep passing after the route changed.
 *
 * "attach" exists because BuilderPrime has no PUT or PATCH on any resource,
 * so the ONLY way to keep one visitor to one record is to not create a second.
 */
export function planBpWrite({ bpOpportunityId, hasApiKey } = {}) {
  if (!hasApiKey) return { action: "skip", reason: "no BUILDER_PRIME_API_KEY" };
  const id = String(bpOpportunityId || "").trim();
  if (id) {
    return {
      action: "attach",
      opportunityId: id,
      reason: "record already exists; creating another would duplicate it",
    };
  }
  return { action: "create", reason: "first submission for this visitor" };
}

/** Params allowed out of the browser into a server log line. Rejects anything
 * that looks like personal data, caps size, scalars only. */
export function sanitizeEventParams(params) {
  const out = {};
  if (!params || typeof params !== "object") return out;
  const BANNED = /phone|email|name|address|customer/i;
  for (const [k, v] of Object.entries(params)) {
    if (Object.keys(out).length >= 12) break;
    if (BANNED.test(k)) continue;
    if (v === null || v === undefined) continue;
    if (typeof v === "object") continue;
    out[String(k).slice(0, 40)] = String(v).slice(0, 120);
  }
  return out;
}

/** The closed set of funnel events the server endpoint accepts. Exported so
 * the endpoint and the tests cannot drift apart. */
export const ALLOWED_EVENTS = new Set([
  "estimator_view",
  "estimator_address_selected",
  "estimator_measure_start",
  "estimator_see_estimate",
  "estimator_price_shown",
  "estimator_phone_entered",
  "estimator_unlocked",
  "estimator_record_created",
  "estimator_name_given",
  "estimator_email_sent",
  "estimator_call_click",
  "estimator_lang_change",
  "estimator_gutter_size_change",
  // Fired by lib/lead-submit.js when a lead submission fails on any of the 21
  // React forms or the estimator. Without this entry the endpoint returns 400
  // and the lost-lead beacon is silently dropped.
  "lead_submit_failed",
]);

// What an anonymous but REAL website estimate is called instead.
export const ANON_FIRST_NAME = "Website Estimate";
// What an obvious internal/QA submission is called, so the two never blur.
export const TEST_FIRST_NAME = "Internal Test";

/**
 * True for submissions that are plainly internal QA rather than a customer.
 * Deliberately narrow: only patterns with no plausible real-world reading.
 * Every rule here matched at least one record already in BuilderPrime.
 */
export function isInternalTestSubmission({ phone, customerEmail, address, name: customerName } = {}) {
  const digits = String(phone || "").replace(/\D/g, "");
  const ten = digits.length === 11 && digits.startsWith("1") ? digits.slice(1) : digits;

  // --- Phone-shape gates (empty, too short, non-numeric, all-same-digit) ---
  if (digits.length === 0) return true;
  if (ten.length < 10) return true;
  if (ten.length === 10 && /^(\d)\1{9}$/.test(ten)) return true;

  if (ten.length === 10) {
    const area = ten.slice(0, 3);
    const exchange = ten.slice(3, 6);
    // 555 is the reserved fiction/test exchange (record 6097291, +18135550100).
    if (exchange === "555") return true;
    // Sequential dialpad (record 5467104, +11234567890).
    if (ten === "1234567890") return true;
    // Area code repeated as the exchange (records 5420529 818-818, 5424875 813-813).
    if (area === exchange) return true;
    // JR One main line (844) 444-3114 in any formatting.
    if (ten === "8444443114") return true;
  }

  const email = String(customerEmail || "").trim().toLowerCase();
  // A submission from the company's own domain is staff, not a customer.
  if (email.endsWith("@jronegutters.com")) return true;
  const addr = String(address || "").trim().toLowerCase();
  if (addr.includes("test")) return true;

  // --- Literal QA markers in any text field ---
  const textFields = [
    String(customerName || ""),
    email,
    addr,
  ].join(" ").toLowerCase();
  if (textFields.includes("zzz") || textFields.includes("internal-test")) return true;

  return false;
}

/** Split a supplied full name. Never returns the legacy placeholder. */
export function splitName(fullName) {
  const parts = String(fullName || "").trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return null;
  if (parts.length === 1) return { firstName: parts[0], lastName: "(no last name provided)" };
  return { firstName: parts[0], lastName: parts.slice(1).join(" ") };
}

export function normalizePhone(phone) {
  if (!phone) return "";
  const digits = String(phone).replace(/\D/g, "");
  if (digits.length === 10) return `+1${digits}`;
  if (digits.length === 11 && digits.startsWith("1")) return `+${digits}`;
  return phone;
}

/** Map estimator measurement totals to a BuilderPrime project type.
 * Every string returned here is a project type that already exists in the
 * account (verified against GET /api/clients: "Gutters" 56, "Soffit and
 * Fascia" 28, "Gutter Installation" 7, "Gutter Guards" 6). */
export function inferProjectType(measurements) {
  if (!measurements) return "Gutters";
  const m = measurements;
  const hasGutter = (m.gutter || 0) > 0;
  const hasSoffit = (m.soffit || 0) > 0;
  const hasFascia = (m.fascia || 0) > 0;
  const hasGuard = (m.guard || 0) > 0;
  if (hasGutter && (hasSoffit || hasFascia) && hasGuard) return "Gutters";
  if (hasGutter && hasGuard) return "Gutter Installation";
  if (hasGutter) return "Gutter Installation";
  if (hasSoffit || hasFascia) return "Soffit and Fascia";
  if (hasGuard) return "Gutter Guards";
  return "Gutters";
}

function money(n) {
  const v = Number(n);
  if (!Number.isFinite(v) || v <= 0) return "";
  return `$${Math.round(v).toLocaleString("en-US")}`;
}

/** Compact price range for display inside the name. "" when unpriced. */
export function formatRange(low, high) {
  const lo = money(low);
  const hi = money(high);
  if (lo && hi) return `${lo}-${hi}`;
  return lo || hi || "";
}

/**
 * The name written onto the BuilderPrime record.
 *
 * Because there is no update verb, this is permanent, so it carries the job
 * summary rather than a bare placeholder. A rep scanning the CRM list sees
 * "Website Estimate / Largo 33778 $2,100-$2,800" and knows what it is, where
 * it is, and how big it is without opening anything.
 *
 * A real supplied name always wins, and it carries the price range with it
 * ("Maria Gonzalez $2,100-$2,800") so the rep sees the number the visitor was
 * shown without opening the record. Unpriced submissions keep the bare name.
 */
export function buildLeadName({
  customerName,
  addressCity,
  addressZip,
  estimateLow,
  estimateHigh,
  phone,
  customerEmail,
  address,
} = {}) {
  const supplied = splitName(customerName);
  if (supplied) {
    const suppliedRange = formatRange(estimateLow, estimateHigh);
    if (suppliedRange) {
      const last =
        supplied.lastName === "(no last name provided)" ? "" : supplied.lastName;
      supplied.lastName = [last, suppliedRange].filter(Boolean).join(" ");
    }
    return supplied;
  }

  const isTest = isInternalTestSubmission({ phone, customerEmail, address });
  const where = String(addressCity || "").trim() || String(addressZip || "").trim();
  const zipSuffix =
    addressCity && addressZip && String(addressZip).trim()
      ? ` ${String(addressZip).trim()}`
      : "";
  const range = formatRange(estimateLow, estimateHigh);
  const lastName = [`${where}${zipSuffix}`.trim(), range].filter(Boolean).join(" ");

  return {
    firstName: isTest ? TEST_FIRST_NAME : ANON_FIRST_NAME,
    // BuilderPrime requires a lastName. Fall back to a stable label rather
    // than an empty string when the visitor gave no address and no price.
    lastName: lastName || "Tampa Bay",
  };
}

/** The human-readable job summary. Goes in the activity note (rep-visible in
 * the BuilderPrime UI) because no readable field can hold it. */
export function buildJobSummary({
  type,
  lang,
  stories,
  gutterSize,
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
} = {}) {
  return [
    "Lead from Instant Estimator tool (jronegutters.com/estimator)",
    `Type: ${type || "lead"}`,
    `Language: ${lang || "en"}`,
    `Stories: ${stories || "?"}`,
    gutterSize ? `Gutter size: ${gutterSize}"` : "",
    measurements
      ? `Measurements: gutter=${measurements.gutter || 0}ft, soffit=${measurements.soffit || 0}ft, fascia=${measurements.fascia || 0}ft, guard=${measurements.guard || 0}ft`
      : "",
    downspouts ? `Downspouts: ${downspouts.totalFt || 0}ft total` : "",
    estimateLow && estimateHigh
      ? `Estimate range: ${money(estimateLow)} - ${money(estimateHigh)}`
      : estimate
        ? `Estimate: ${money(estimate)}`
        : "",
    discountCode ? `Discount code: ${discountCode} (expires ${expDate || "?"})` : "",
    customerName ? `Name given: ${customerName}` : "",
    customerEmail ? `Email given: ${customerEmail}` : "",
    timestamp ? `Submitted: ${timestamp}` : "",
  ]
    .filter(Boolean)
    .join("\n");
}

/**
 * The POST body for BuilderPrime create-client.
 *
 * Everything the estimator knows goes in HERE, at create time, because there
 * is no PUT to add it later.
 */
export function buildBpPayload(body = {}) {
  const {
    phone,
    address,
    addressCity,
    addressState,
    addressZip,
    measurements,
    estimateLow,
    estimateHigh,
    customerEmail,
    utmCustomFields,
  } = body;

  const { firstName, lastName } = buildLeadName(body);

  const payload = {
    userAccount: { firstName, lastName, emailAddress: customerEmail || "" },
    emailAddress: customerEmail || "",
    phoneNumber: normalizePhone(phone),
    addressLine1: address || "",
    city: addressCity || "",
    state: addressState || "FL",
    zip: addressZip || "",
    // All three are VERIFIED writable and readable: the contact-form path
    // (app/api/send-lead/route.js) sends the same keys and 47 records read
    // them back.
    leadSourceDescription: "Form Inquiry",
    projectTypeDescription: inferProjectType(measurements),
    buildingTypeDescription: "Single Family",
  };

  // NOT CONFIRMED writable: no record in the account carries estimatedValue.
  // Sent as a best effort only. The price is ALSO encoded into lastName above,
  // which is confirmed readable, so nothing depends on this landing.
  const mid = Number(estimateLow) > 0 && Number(estimateHigh) > 0
    ? Math.round((Number(estimateLow) + Number(estimateHigh)) / 2)
    : null;
  if (mid) payload.estimatedValue = mid;

  if (utmCustomFields && Object.keys(utmCustomFields).length > 0) {
    payload.customFields = utmCustomFields;
  }
  return payload;
}
