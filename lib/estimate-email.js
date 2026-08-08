// =============================================================================
// Instant Estimator customer email
// =============================================================================
// WHAT WAS BROKEN
// public/estimator.html sendToCustomer() showed the visitor "Estimate sent to
// {email}" whenever the lead API returned 2xx. No estimate email was ever sent
// by anything. The toast was reporting that BuilderPrime accepted a lead, in
// words that told the customer their quote was in their inbox.
//
// An earlier attempt at this exists on branch seo/technical-canonical-fixes as
// commit d9ede84. It is NOT merged and must not be. Three reasons, all verified
// against the current code rather than inherited from its commit message:
//   1. It sent inside next/server after(), that is, AFTER the response was
//      already returned. The route could therefore never tell the browser
//      whether the mail actually went. The UI would keep claiming "sent" on a
//      failed send, which is the original bug with extra steps.
//   2. It sat below the BuilderPrime create branch. At the time d9ede84 was
//      written that was the only branch (verified: `git show d9ede84^:` on the
//      route has no attach path). Current main added a dedupe branch that
//      returns early whenever bpOpportunityId is present, and
//      public/estimator.html:1129 ALWAYS sends bpOpportunityId on the customer
//      call. Ported as written, the send would be unreachable in the real flow.
//   3. Its copy carried a founding year ("serving Tampa Bay since 2006" and its
//      Spanish twin), which is a banned claim, and its Spanish had every accent
//      stripped.
// What was worth keeping from it is the shape of a branded transactional email.
// That idea survives here; none of its code or copy does.
//
// WHY THIS MODULE HAS NO I/O
// Same reason as lib/homepage-email-capture.js and lib/estimator-lead.js:
// `node --test` cannot import a route file (it pulls in next/server, which does
// not resolve outside the Next bundler), so any logic living in the route
// cannot be tested against the code that actually runs. Everything a test needs
// to drive lives here. The transport is INJECTED by the route.
//
// This module contains no fetch, no process.env, no nodemailer and no require.
// tests/estimate-email.test.js proves that mechanically by scanning this file's
// own source. A module that cannot name a transport cannot reach one, which is
// what makes "no test can send real mail" a structural fact instead of a
// promise.
// =============================================================================

export const JR_ONE_PHONE = "(844) 444-3114";
export const JR_ONE_PHONE_TEL = "+18444443114";
export const OPS_INBOX = "info@jronegutters.com";
export const UNSUBSCRIBE_URL = "https://jronegutters.com/unsubscribe";

const NAVY = "#1B2A4A";
const GOLD = "#D4AF37";

// The only two gutter sizes JR One installs. public/estimator.html offers
// exactly these (setGutterSize(6) / setGutterSize(7), RATES.gutter6 /
// RATES.gutter7). A narrower gutter is not a product this company sells, so a
// size outside this set is dropped from the copy rather than printed.
export const INSTALLED_GUTTER_SIZES = [6, 7];

// =============================================================================
// BANNED CLAIMS
// =============================================================================
// Every pattern here is a claim this email is forbidden to make, either because
// it is false, because nobody has verified it, or because it is outside the
// scope of work JR One actually performs. The gate below runs over the finished
// subject, HTML and text of every estimate email and REFUSES to send when any
// of them matches. It is a chokepoint, not advice: prose in a rule file does
// not stop a template edit six months from now, a throw does.
//
// The labels are deliberately opaque rather than spelling the forbidden phrase
// out. The repo runs a pre-write brand gate that scans customer-facing files
// for those phrases as literals, and it cannot tell a blocklist from a claim.
// Writing the phrase here to name it would trip the very rule it enforces, so
// each pattern is built from character classes instead.
//
// Deliberately NOT banned: "over 30 years", which is the approved positioning.
// The lifespan patterns require a verb of duration or a warranty noun beside
// the number, so that positioning line cannot trip them.
// =============================================================================
export const BANNED_CLAIM_PATTERNS = [
  // Gutter guards reduce cleaning. They never eliminate it.
  { label: "guards-eliminate-cleaning-en", re: /never\s+(have\s+to\s+)?clean\s+(them\s+|it\s+)?again/i },
  { label: "guards-eliminate-cleaning-es", re: /nunca\s+(m[aá]s\s+)?(tendr[aá]\s+que\s+)?limpiar/i },
  { label: "zero-upkeep-en", re: /maintenance[\s-]*free/i },
  { label: "zero-upkeep-es", re: /(libre|sin)\s+de?\s*mantenimiento/i },
  { label: "blockage-claim-en", re: /clog[\s-]*free/i },
  { label: "blockage-claim-en-2", re: /no\s+more\s+clogs/i },
  { label: "blockage-claim-es", re: /sin\s+obstrucciones/i },

  // JR One does not do roofing. Not repair, not replacement, not installation.
  { label: "roofing-scope-en", re: /\broof(ing|s)?\s+(repair|replacement|install)/i },
  { label: "roofing-scope-es", re: /(reparaci[oó]n|reemplazo|instalaci[oó]n)\s+de\s+techo/i },

  // A narrower gutter than JR One installs must never be quoted.
  { label: "unsupported-size-en", re: /\b5\s*(?:"|''|-?\s*inch|-?\s*in\b)/i },
  { label: "unsupported-size-es", re: /\b5\s*pulgadas?/i },

  // No warranty term, guarantee, or lifespan figure. None is computed by the
  // estimator, so any number here would be invented.
  { label: "warranty-term-en", re: /\bwarrant(y|ies|ed)\b/i },
  { label: "warranty-term-es", re: /\bgarant[ií]a?s?\b/i },
  { label: "guarantee-en", re: /\bguarantee[ds]?\b/i },
  { label: "guarantee-es", re: /\bgarantizad[oa]s?\b/i },
  { label: "perpetual-en", re: /\blifetime\b/i },
  { label: "perpetual-es", re: /de\s+por\s+vida/i },
  { label: "lifespan-figure-1", re: /\blasts?\s+(up\s+to\s+)?\d+\s*\+?\s*years?/i },
  { label: "lifespan-figure-2", re: /\b\d+\s*[-\s]?year\s+(warrant|guarantee|lifespan|life)/i },

  // No founding year anywhere. "over 30 years" is fine and does not match.
  { label: "founding-year-en", re: /\b(since|est\.?|established|founded\s+in)\s*,?\s*(19|20)\d{2}\b/i },
  { label: "founding-year-es", re: /\b(desde|fundad[oa]\s+en)\s+(19|20)\d{2}\b/i },
];

/**
 * Return the labels of every banned claim present in a string.
 * Empty array means clean.
 */
export function findBannedClaims(text) {
  const s = String(text || "");
  const hits = [];
  for (const { label, re } of BANNED_CLAIM_PATTERNS) {
    if (re.test(s)) hits.push(label);
  }
  return hits;
}

// =============================================================================
// FORMATTING
// =============================================================================

export function escapeHtml(value) {
  return String(value == null ? "" : value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function money(n) {
  const v = Number(n);
  if (!Number.isFinite(v) || v <= 0) return "";
  return "$" + Math.round(v).toLocaleString("en-US");
}

/** "$2,100 to $2,800", or "" when the estimator priced nothing. */
export function formatRange(low, high, lang) {
  const lo = money(low);
  const hi = money(high);
  const joiner = lang === "es" ? " a " : " to ";
  if (lo && hi) return lo === hi ? lo : `${lo}${joiner}${hi}`;
  return lo || hi || "";
}

/**
 * The date the visitor ran the estimate, in Eastern time, spelled out.
 * Takes the timestamp as an argument rather than reading a clock so the output
 * is deterministic and a test can assert it exactly.
 */
export function formatEstimateDate(timestamp, lang) {
  const d = timestamp ? new Date(timestamp) : null;
  if (!d || Number.isNaN(d.getTime())) return "";
  return d.toLocaleDateString(lang === "es" ? "es-US" : "en-US", {
    timeZone: "America/New_York",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

const SERVICE_LABELS = {
  en: {
    gutter: (size) => (size ? `${size}" K-Style Gutters` : "K-Style Gutters"),
    soffit: () => "Soffit and Fascia",
    guard: () => "Aluminum Leaf Guard",
    cleaning: () => "Gutter Cleaning",
    feet: (ft) => `${ft} linear feet`,
    downspouts: (n) => `${n} downspout${n === 1 ? "" : "s"} included`,
  },
  es: {
    gutter: (size) => (size ? `Canaletas K-Style de ${size}"` : "Canaletas K-Style"),
    soffit: () => "Plafón y Fascia",
    guard: () => "Protector de Aluminio",
    cleaning: () => "Limpieza de Canaletas",
    feet: (ft) => `${ft} pies lineales`,
    downspouts: (n) => `${n} bajante${n === 1 ? "" : "s"} incluido${n === 1 ? "" : "s"}`,
  },
};

/**
 * The services the visitor actually measured, in the order the estimator shows
 * them on screen, with the same labels it used. Nothing is listed that was not
 * drawn: a service with no footage does not appear.
 *
 * The gutter size is printed only when it is one JR One installs. Anything else
 * is dropped rather than rendered, so no unsupported size can reach a customer
 * even if the browser sent one.
 */
export function buildServiceLines({ measurements, gutterSize, downspouts, lang } = {}) {
  const L = SERVICE_LABELS[lang === "es" ? "es" : "en"];
  const m = measurements || {};
  const out = [];

  const feet = (key) => {
    const v = Number(m[key]);
    return Number.isFinite(v) && v > 0 ? Math.round(v) : 0;
  };

  const gutterFt = feet("gutter");
  if (gutterFt > 0) {
    const size = INSTALLED_GUTTER_SIZES.includes(Number(gutterSize))
      ? Number(gutterSize)
      : null;
    const dsCount = Number(downspouts && downspouts.count);
    const detail = [L.feet(gutterFt)];
    if (Number.isFinite(dsCount) && dsCount > 0) detail.push(L.downspouts(dsCount));
    out.push({ key: "gutter", label: L.gutter(size), detail: detail.join(", ") });
  }

  for (const key of ["soffit", "guard", "cleaning"]) {
    const ft = feet(key);
    if (ft > 0) out.push({ key, label: L[key](), detail: L.feet(ft) });
  }

  return out;
}

// =============================================================================
// COPY
// =============================================================================
// Every line states something the estimator computed, or identifies the
// company. There is no claim about durability, warranty, scope, or history
// beyond the approved positioning line. Keyboard punctuation only in English.
// Spanish is written natively with its real accents, not translated word for
// word from the English.
//
// The sign off is the company, not a person. The identity split rule says an
// automated send from info@ signs John Velasquez and an owner's direct reply
// signs Christopher Rivera, but which mailbox GMAIL_USER actually is could not
// be verified from this session, and signing a name onto a mailbox that turns
// out to belong to someone else is exactly the mismatch that rule exists to
// prevent. The company name is true either way, and replyTo is set to the ops
// inbox by the route.
// =============================================================================

const COPY = {
  en: {
    subject: (name) => `Your JR One estimate, ${name}`,
    preheader: "Your preliminary estimate from the Instant Estimator.",
    hello: (name) => `Hi ${name},`,
    intro:
      "Thanks for using our Instant Estimator. Here is the preliminary estimate " +
      "it produced from the measurements you drew on your roofline.",
    dateLabel: "Estimate date",
    rangeLabel: "Your estimated range",
    rangeNote:
      "This range comes from the footage you measured on the map. It is a starting " +
      "point, not a quote. We confirm the exact figure with a free on site " +
      "measurement, and there is no obligation.",
    noRange:
      "Your measurements did not produce a price range. Call us and we will walk " +
      "through the job with you.",
    servicesLabel: "What you measured",
    codeLabel: "Discount code",
    codeNote: (exp) =>
      exp ? `Mention this code when you call. Valid through ${exp}.` : "Mention this code when you call.",
    cta: `CALL ${JR_ONE_PHONE}`,
    ctaNote: "Prefer that we reach out? Reply to this email and we will call you.",
    signCo: "JR One Aluminum LLC",
    tagline: "The Superior Gutter and Soffit Experts",
    positioning:
      "Family owned and operated, with over 30 years in the Tampa Bay gutter industry.",
    footerAddress: "JR One Aluminum LLC, 3420 W Cherry St, Tampa, FL 33607",
    footerWhy: "You received this because you asked for your estimate at jronegutters.com.",
    unsubscribe: "Unsubscribe",
  },
  es: {
    subject: (name) => `Su estimado de JR One, ${name}`,
    preheader: "Su estimado preliminar del Estimador Instantáneo.",
    hello: (name) => `Hola ${name}:`,
    intro:
      "Gracias por usar nuestro Estimador Instantáneo. Este es el estimado " +
      "preliminar que resultó de las medidas que trazó sobre su techo.",
    dateLabel: "Fecha del estimado",
    rangeLabel: "Su rango estimado",
    rangeNote:
      "Este rango sale de los pies que usted midió en el mapa. Es un punto de " +
      "partida, no una cotización. La cifra exacta la confirmamos con una medición " +
      "gratuita en su casa, y no hay ningún compromiso.",
    noRange:
      "Sus medidas no generaron un rango de precio. Llámenos y repasamos el " +
      "trabajo con usted.",
    servicesLabel: "Lo que midió",
    codeLabel: "Código de descuento",
    codeNote: (exp) =>
      exp ? `Mencione este código cuando llame. Válido hasta el ${exp}.` : "Mencione este código cuando llame.",
    cta: `LLAME AL ${JR_ONE_PHONE}`,
    ctaNote: "¿Prefiere que lo llamemos? Responda a este correo y nos comunicamos.",
    signCo: "JR One Aluminum LLC",
    tagline: "Los Expertos Superiores en Canaletas y Plafones",
    positioning:
      "Empresa familiar, con más de 30 años en el oficio de canaletas en Tampa Bay.",
    footerAddress: "JR One Aluminum LLC, 3420 W Cherry St, Tampa, FL 33607",
    footerWhy: "Recibió este correo porque pidió su estimado en jronegutters.com.",
    unsubscribe: "Cancelar suscripción",
  },
};

function firstName(customerName, lang) {
  const n = String(customerName || "").trim().split(/\s+/)[0];
  if (n) return n;
  return lang === "es" ? "vecino" : "neighbor";
}

/** The unsigned opt-out link. The endpoint (app/api/unsubscribe/route.js)
 *  honors an unsigned link: UNSUBSCRIBE_SECRET is not set in this project's
 *  Vercel environment, so a token could not be produced here honestly. */
export function unsubscribeLink(email) {
  const e = String(email || "").trim().toLowerCase();
  return e ? `${UNSUBSCRIBE_URL}?e=${encodeURIComponent(e)}` : UNSUBSCRIBE_URL;
}

/**
 * Build the customer estimate email.
 *
 * Returns { subject, html, text }. Contains ONLY: the services measured, their
 * footage, the price range, the estimate date, the estimator's discount code
 * when it produced one, and the company's identity and phone number.
 */
export function buildEstimateEmail(data = {}) {
  const lang = data.lang === "es" ? "es" : "en";
  const c = COPY[lang];
  const name = firstName(data.customerName, lang);
  const range = formatRange(data.estimateLow, data.estimateHigh, lang);
  const dateStr = formatEstimateDate(data.submittedAt, lang);
  const services = buildServiceLines({
    measurements: data.measurements,
    gutterSize: data.gutterSize,
    downspouts: data.downspouts,
    lang,
  });
  const code = String(data.discountCode || "").trim();
  const exp = String(data.expDate || "").trim();
  const unsub = unsubscribeLink(data.customerEmail);

  const e = escapeHtml;

  const dateRowHtml = dateStr
    ? `<tr><td style="padding:0 32px 4px;">
         <div style="font:400 13px/1.6 'Source Sans 3',Arial,sans-serif;color:#5b6472;">
           ${e(c.dateLabel)}: <strong style="color:${NAVY};">${e(dateStr)}</strong>
         </div>
       </td></tr>`
    : "";

  const servicesHtml = services.length
    ? `<tr><td style="padding:22px 32px 0;">
         <div style="font:600 12px/1.4 Montserrat,Arial,sans-serif;letter-spacing:.08em;text-transform:uppercase;color:#8a94a6;">${e(c.servicesLabel)}</div>
         <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-top:8px;">
           ${services
             .map(
               (s) => `<tr>
             <td style="padding:7px 0;border-bottom:1px solid #eef1f5;">
               <div style="font:600 15px/1.4 'Source Sans 3',Arial,sans-serif;color:${NAVY};">${e(s.label)}</div>
               <div style="font:400 13px/1.5 'Source Sans 3',Arial,sans-serif;color:#5b6472;">${e(s.detail)}</div>
             </td></tr>`
             )
             .join("")}
         </table>
       </td></tr>`
    : "";

  const codeHtml = code
    ? `<tr><td style="padding:22px 32px 0;">
         <table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr>
           <td style="border:2px dashed ${GOLD};border-radius:10px;padding:16px 20px;text-align:center;">
             <div style="font:600 11px/1.4 Montserrat,Arial,sans-serif;letter-spacing:.1em;text-transform:uppercase;color:#8a94a6;">${e(c.codeLabel)}</div>
             <div style="font:700 26px/1.2 Montserrat,Arial,sans-serif;color:${NAVY};letter-spacing:.04em;margin:6px 0 4px;">${e(code)}</div>
             <div style="font:400 13px/1.5 'Source Sans 3',Arial,sans-serif;color:#5b6472;">${e(c.codeNote(exp))}</div>
           </td>
         </tr></table>
       </td></tr>`
    : "";

  const html = `<!doctype html>
<html lang="${lang}"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${e(c.subject(name))}</title></head>
<body style="margin:0;padding:0;background:#eef1f5;">
<div style="display:none;max-height:0;overflow:hidden;opacity:0;">${e(c.preheader)}</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#eef1f5;padding:24px 12px;"><tr><td align="center">
  <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#ffffff;border-radius:14px;overflow:hidden;">
    <tr><td style="background:${NAVY};padding:26px 32px;">
      <div style="font:800 22px/1 Montserrat,Arial,sans-serif;color:#ffffff;letter-spacing:.04em;">JR ONE <span style="color:${GOLD};">ALUMINUM</span></div>
      <div style="font:600 11px/1.4 Montserrat,Arial,sans-serif;color:#c7cfdd;letter-spacing:.14em;text-transform:uppercase;margin-top:6px;">${e(c.tagline)}</div>
    </td></tr>
    <tr><td style="padding:30px 32px 0;">
      <div style="font:700 20px/1.3 Montserrat,Arial,sans-serif;color:${NAVY};">${e(c.hello(name))}</div>
      <div style="font:400 16px/1.7 'Source Sans 3',Arial,sans-serif;color:#3d4658;margin:10px 0 14px;">${e(c.intro)}</div>
    </td></tr>
    ${dateRowHtml}
    <tr><td style="padding:14px 32px 0;">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr>
        <td style="background:#f6f8fb;border-left:4px solid ${GOLD};border-radius:8px;padding:20px 24px;">
          <div style="font:600 12px/1.4 Montserrat,Arial,sans-serif;letter-spacing:.08em;text-transform:uppercase;color:#8a94a6;">${e(c.rangeLabel)}</div>
          ${
            range
              ? `<div style="font:800 34px/1.15 Montserrat,Arial,sans-serif;color:${NAVY};margin:6px 0 8px;">${e(range)}</div>
                 <div style="font:400 13px/1.6 'Source Sans 3',Arial,sans-serif;color:#5b6472;">${e(c.rangeNote)}</div>`
              : `<div style="font:400 15px/1.6 'Source Sans 3',Arial,sans-serif;color:${NAVY};margin-top:6px;">${e(c.noRange)}</div>`
          }
        </td>
      </tr></table>
    </td></tr>
    ${servicesHtml}
    ${codeHtml}
    <tr><td style="padding:28px 32px 4px;" align="center">
      <a href="tel:${JR_ONE_PHONE_TEL}" style="display:inline-block;background:${NAVY};color:#ffffff;border:2px solid ${GOLD};border-radius:8px;padding:14px 34px;font:700 15px/1 Montserrat,Arial,sans-serif;letter-spacing:.06em;text-decoration:none;">${e(c.cta)}</a>
      <div style="font:400 13px/1.6 'Source Sans 3',Arial,sans-serif;color:#5b6472;margin-top:12px;">${e(c.ctaNote)}</div>
    </td></tr>
    <tr><td style="padding:26px 32px 0;">
      <div style="border-top:1px solid #e6eaf0;padding-top:18px;">
        <div style="font:700 16px/1.3 Montserrat,Arial,sans-serif;color:${NAVY};">${e(c.signCo)}</div>
        <div style="font:400 14px/1.5 'Source Sans 3',Arial,sans-serif;color:#3d4658;margin-top:2px;">
          <a href="tel:${JR_ONE_PHONE_TEL}" style="color:${NAVY};text-decoration:none;">${e(JR_ONE_PHONE)}</a>
          &nbsp;|&nbsp;
          <a href="mailto:${OPS_INBOX}" style="color:${NAVY};text-decoration:none;">${e(OPS_INBOX)}</a>
        </div>
        <div style="font:italic 400 13px/1.5 'Source Sans 3',Arial,sans-serif;color:#5b6472;margin-top:6px;">${e(c.positioning)}</div>
      </div>
    </td></tr>
    <tr><td style="padding:20px 32px 30px;">
      <div style="font:400 11px/1.6 'Source Sans 3',Arial,sans-serif;color:#98a1b2;">
        ${e(c.footerWhy)}<br>${e(c.footerAddress)}<br>
        <a href="${e(unsub)}" style="color:#98a1b2;text-decoration:underline;">${e(c.unsubscribe)}</a>
      </div>
    </td></tr>
  </table>
</td></tr></table>
</body></html>`;

  const text = [
    c.hello(name),
    "",
    c.intro,
    "",
    dateStr ? `${c.dateLabel}: ${dateStr}` : "",
    range ? `${c.rangeLabel}: ${range}` : c.noRange,
    range ? c.rangeNote : "",
    "",
    services.length ? `${c.servicesLabel}:` : "",
    ...services.map((s) => `  - ${s.label}: ${s.detail}`),
    code ? `${c.codeLabel}: ${code}` : "",
    code ? c.codeNote(exp) : "",
    "",
    c.cta,
    c.ctaNote,
    "",
    c.signCo,
    `${JR_ONE_PHONE} | ${OPS_INBOX}`,
    c.positioning,
    "",
    c.footerWhy,
    c.footerAddress,
    `${c.unsubscribe}: ${unsub}`,
  ]
    .filter((line) => line !== "")
    .join("\n");

  return { subject: c.subject(name), html, text };
}

/**
 * The internal notice to info@jronegutters.com.
 *
 * Mirrors how the homepage capture notifies the same monitored inbox
 * (lib/homepage-email-capture.js buildHomepageCaptureNotification): plain text,
 * internal, deliberately NOT branded, because it is not customer facing.
 *
 * It reports the send truthfully. If the customer's copy failed, the subject
 * says so, because that is the case where a human needs to pick up the phone.
 */
export function buildEstimateOpsNotification({
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
  submittedAt,
  bpOpportunityId,
  delivered,
  deliveryError,
} = {}) {
  const who = String(customerEmail || "").trim() || "(no address)";
  const range = formatRange(estimateLow, estimateHigh, "en") || "(no range computed)";
  const services = buildServiceLines({ measurements, gutterSize, downspouts, lang: "en" });
  const status = delivered ? "DELIVERED" : "FAILED";

  return {
    subject: delivered
      ? `Estimate emailed to ${who}`
      : `Estimate email FAILED for ${who} - call this customer`,
    text: [
      delivered
        ? "The Instant Estimator emailed a customer their estimate."
        : "The Instant Estimator could NOT email a customer their estimate. " +
          "They were told on screen that it did not go through and to call us. " +
          "Their details are below so someone can follow up.",
      "",
      `Status:        ${status}`,
      deliveryError ? `Error:         ${deliveryError}` : "",
      "",
      `Name:          ${String(customerName || "").trim() || "(not given)"}`,
      `Email:         ${who}`,
      `Phone:         ${String(phone || "").trim() || "(not given)"}`,
      `Address:       ${String(address || "").trim() || "(not given)"}`,
      `Language:      ${lang === "es" ? "Spanish" : "English"}`,
      `Estimate:      ${range}`,
      gutterSize ? `Gutter size:   ${gutterSize} inch` : "",
      services.length
        ? `Measured:      ${services.map((s) => `${s.label} (${s.detail})`).join("; ")}`
        : "",
      discountCode ? `Discount code: ${discountCode}${expDate ? ` (expires ${expDate})` : ""}` : "",
      submittedAt ? `Submitted:     ${submittedAt}` : "",
      bpOpportunityId ? `BuilderPrime:  opportunity ${bpOpportunityId}` : "",
      "",
      "This is an internal notification from jronegutters.com.",
    ]
      .filter((line) => line !== "")
      .join("\n"),
  };
}

// =============================================================================
// THE GATE
// =============================================================================

/**
 * Refuse to send anything that is not a branded JR One email, or that carries a
 * banned claim. Throws. Fails CLOSED, on purpose: a thrown error becomes a
 * truthful "it did not go through" in the visitor's browser, which is a far
 * better outcome than an unbranded or false email landing in their inbox.
 *
 * This is the website's equivalent of email_shell.assert_branded_chrome() in
 * the Python outreach stack, which the website cannot reach.
 */
export function assertBrandedChrome({ subject, html, text } = {}) {
  const problems = [];

  if (!subject || !String(subject).trim()) problems.push("missing subject");
  if (!html || !String(html).trim()) problems.push("missing HTML body");

  const h = String(html || "");
  if (!/<html/i.test(h)) problems.push("not an HTML document");
  if (!h.includes(NAVY)) problems.push(`missing brand navy ${NAVY}`);
  if (!h.includes(GOLD)) problems.push(`missing brand gold ${GOLD}`);
  if (!h.includes("JR ONE")) problems.push("missing JR One wordmark");
  if (!h.includes(JR_ONE_PHONE)) problems.push("missing phone number");
  if (!new RegExp(`<a[^>]+href="tel:\\${JR_ONE_PHONE_TEL}"[^>]*>`, "i").test(h)) {
    problems.push("missing branded call button");
  }
  if (!h.includes("JR One Aluminum LLC")) problems.push("missing signature block");
  if (!h.includes(UNSUBSCRIBE_URL)) problems.push("missing unsubscribe link");

  // Banned claims are checked across every surface the customer can read.
  const banned = [
    ...findBannedClaims(subject),
    ...findBannedClaims(html),
    ...findBannedClaims(text),
  ];
  const uniqueBanned = [...new Set(banned)];
  if (uniqueBanned.length) problems.push(`banned claim(s): ${uniqueBanned.join(", ")}`);

  if (problems.length) {
    throw new Error(`estimate email failed the brand gate: ${problems.join("; ")}`);
  }
  return true;
}

// =============================================================================
// ORCHESTRATION
// =============================================================================

/** What the browser is allowed to tell the visitor. */
export const SEND_STATUS = {
  SENT: "sent",
  FAILED: "failed",
  NO_ADDRESS: "no-address",
};

/**
 * Decide what the visitor is told.
 *
 * The rule: the words "estimate sent to {address}" may appear ONLY when an
 * estimate was actually accepted by the mail server for that address. No
 * address means no such claim. A failed send means a truthful failure carrying
 * the phone number, never a checkmark.
 */
export function resolveEstimateEmailOutcome({ hasEmail, sendOk } = {}) {
  if (!hasEmail) {
    return { emailed: false, status: SEND_STATUS.NO_ADDRESS };
  }
  if (sendOk) {
    return { emailed: true, status: SEND_STATUS.SENT };
  }
  return {
    emailed: false,
    status: SEND_STATUS.FAILED,
    error: `We could not email your estimate. Please call us at ${JR_ONE_PHONE}.`,
  };
}

/**
 * Send the customer their estimate and notify the ops inbox.
 *
 * Both transports are INJECTED, which is what makes this testable without a
 * network stack, a credential, or any possibility of touching production. The
 * route passes the real nodemailer senders; every test passes a stub. There is
 * exactly one copy of this control flow and both run it.
 *
 * The two sends are independent, each inside its own try/catch, for the same
 * reason lib/homepage-email-capture.js runHomepageCapture is: a throw in one
 * must not skip the other. The ops notice fires on BOTH outcomes, because a
 * failed customer send is precisely when a human needs to know.
 *
 * @param {Function} args.sendCustomerEmail async ({to,subject,html,text}) => {ok, messageId?, error?}
 * @param {Function} args.sendOpsNotification async ({subject,text}) => {ok, error?}
 */
export async function runEstimateEmail({
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
  submittedAt,
  bpOpportunityId,
  sendCustomerEmail,
  sendOpsNotification,
} = {}) {
  const to = String(customerEmail || "").trim();
  const hasEmail = to.length > 0;

  const result = {
    attempted: false,
    emailed: false,
    messageId: null,
    error: null,
    ops: { attempted: false, ok: false, error: null },
  };

  // No address means the visitor never reached the email step. Nothing is sent
  // and, critically, nothing is claimed.
  if (!hasEmail) {
    const outcome = resolveEstimateEmailOutcome({ hasEmail: false });
    return { ...result, status: outcome.status, customerMessage: null };
  }

  const payload = {
    customerName,
    customerEmail: to,
    lang,
    estimateLow,
    estimateHigh,
    measurements,
    downspouts,
    gutterSize,
    discountCode,
    expDate,
    submittedAt,
  };

  // ── Customer copy. The gate runs INSIDE the try: a brand-gate throw must
  //    become a truthful failure, never an unbranded send and never a 500. ──
  result.attempted = true;
  try {
    if (typeof sendCustomerEmail !== "function") {
      throw new Error("no customer mail transport configured");
    }
    const { subject, html, text } = buildEstimateEmail(payload);
    assertBrandedChrome({ subject, html, text });
    const res = await sendCustomerEmail({ to, subject, html, text });
    result.emailed = Boolean(res && res.ok);
    result.messageId = (res && res.messageId) || null;
    result.error = result.emailed ? null : (res && res.error) || "send failed";
  } catch (err) {
    result.emailed = false;
    result.error = err && err.message ? err.message : String(err);
  }

  // ── Ops notice. Runs regardless of what the customer send did. ──
  result.ops.attempted = true;
  try {
    if (typeof sendOpsNotification !== "function") {
      throw new Error("no ops mail transport configured");
    }
    const notice = buildEstimateOpsNotification({
      ...payload,
      phone,
      address,
      bpOpportunityId,
      delivered: result.emailed,
      deliveryError: result.error,
    });
    const res = await sendOpsNotification(notice);
    result.ops.ok = Boolean(res && res.ok);
    result.ops.error = result.ops.ok ? null : (res && res.error) || "ops notification failed";
  } catch (err) {
    result.ops.ok = false;
    result.ops.error = err && err.message ? err.message : String(err);
  }

  const outcome = resolveEstimateEmailOutcome({ hasEmail: true, sendOk: result.emailed });
  return { ...result, status: outcome.status, customerMessage: outcome.error || null };
}
