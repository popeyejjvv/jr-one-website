// certificate_expiry_monitor.mjs -- expiry watch for every certificate of insurance
// published on /resources and /es/recursos.
//
// WHY THIS EXISTS
//   Publishing an expired certificate is worse than publishing none. The three ACORD 25
//   certificates linked from /resources each print a carrier, a policy number and an
//   "in effect through" date directly in the page copy, and nothing was watching those
//   dates. The Workers' Compensation certificate expires 2026-10-08.
//
// WHAT IT DOES
//   1. Parses the expiry dates OUT OF THE PAGE ITSELF (app/resources/page.jsx), English
//      and Spanish. It does NOT carry its own copy of the dates. A hardcoded date list
//      would drift away from the page the moment a certificate is renewed, and then the
//      monitor would be watching a date nobody is publishing.
//   2. Alerts at 60, 30 and 7 days before each expiry, and screams once expired.
//   3. Cross-checks that the Spanish page publishes the SAME expiry as the English page.
//      A Spanish page quoting a different date is a published-wrong-date problem.
//   4. Confirms every published certificate's PDF is actually present in public/documents.
//
// THE _guard.py CONVENTION (projects/popeye-jarvis/fork/monitors/_guard.py)
//   That module exists because a monitor whose input path vanished used to return "nothing
//   to report", which is indistinguishable from healthy, so it went dark for a month while
//   logging ok=True. The same trap is live here: if this file's parse stops matching after
//   a page refactor, the natural failure is "0 certificates found, 0 expiring, all clear".
//   So every precondition below FAILS LOUD instead:
//     - resources page missing            -> exit 2
//     - zero certificates parsed          -> exit 2
//     - a certificate whose date will not parse -> exit 2
//     - EN and ES certificate counts differ     -> exit 2
//   A certificate this monitor cannot read is treated as an alert, never as an absence.
//
// DEPLOYED != SELF-HEALING
//   This monitor cannot renew a certificate. When it fires, a human requests the new ACORD
//   25 from the carrier, replaces the PDF in public/documents, and updates the carrier,
//   policy number and date in app/resources/page.jsx (EN and ES). It never edits page copy.
//
// Run: node audit/certificate_expiry_monitor.mjs
//      node audit/certificate_expiry_monitor.mjs --json    (report only, no console prose)
// Exit: 0 = clean, 2 = action needed.

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const HERE = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(HERE, "..");
const RESOURCES_PAGE = path.join(ROOT, "app/resources/page.jsx");
const DOCUMENTS_DIR = path.join(ROOT, "public/documents");
const REPORT_PATH = path.join(HERE, "certificate-expiry-report.json");

const ALERT_THRESHOLDS = [60, 30, 7]; // days before expiry
const JSON_ONLY = process.argv.includes("--json");

const EN_MONTHS = {
  january: 1, february: 2, march: 3, april: 4, may: 5, june: 6,
  july: 7, august: 8, september: 9, october: 10, november: 11, december: 12,
};
// Spanish month names as they appear in the page copy, accents included.
const ES_MONTHS = {
  enero: 1, febrero: 2, marzo: 3, abril: 4, mayo: 5, junio: 6,
  julio: 7, agosto: 8, septiembre: 9, octubre: 10, noviembre: 11, diciembre: 12,
};

const fail = (msg) => {
  // _guard.py convention: a missing precondition is audible, never silent.
  console.error(`certificate_expiry_monitor: DISABLED -- ${msg}`);
  const report = { ranAt: new Date().toISOString(), healthy: false, disabled: true, reason: msg, certificates: [] };
  try { fs.writeFileSync(REPORT_PATH, JSON.stringify(report, null, 1)); } catch (_) {}
  process.exit(2);
};

if (!fs.existsSync(RESOURCES_PAGE)) {
  fail(`required path missing: ${RESOURCES_PAGE}. This monitor is dead until fixed.`);
}
const source = fs.readFileSync(RESOURCES_PAGE, "utf8");

// Pull each legalDocs entry. Both the en and es blocks use the same object shape:
//   { icon: "...", title: "...", desc: "...", file: "..." }
function extractCertificates(text) {
  const out = [];
  const blockRe = /\{\s*icon:\s*"[^"]*",\s*title:\s*"((?:[^"\\]|\\.)*)",\s*desc:\s*"((?:[^"\\]|\\.)*)",\s*file:\s*"([^"]+)",?\s*\}/g;
  let m;
  while ((m = blockRe.exec(text)) !== null) {
    if (!/COI/.test(m[3])) continue; // certificates only, not the care guide
    out.push({ title: m[1], desc: m[2], file: m[3] });
  }
  return out;
}

// "in effect through June 21, 2027"  /  "vigente hasta el 21 de junio de 2027"
function parseExpiry(desc) {
  const en = desc.match(/in effect through\s+([A-Za-z]+)\s+(\d{1,2}),\s*(\d{4})/);
  if (en) {
    const mo = EN_MONTHS[en[1].toLowerCase()];
    if (mo) return { iso: isoOf(+en[3], mo, +en[2]), lang: "en" };
  }
  const es = desc.match(/vigente hasta el\s+(\d{1,2})\s+de\s+([A-Za-zaeiounNà-ÿ]+)\s+de\s+(\d{4})/);
  if (es) {
    const mo = ES_MONTHS[es[2].toLowerCase()];
    if (mo) return { iso: isoOf(+es[3], mo, +es[1]), lang: "es" };
  }
  return null;
}

const isoOf = (y, m, d) =>
  `${y}-${String(m).padStart(2, "0")}-${String(d).padStart(2, "0")}`;

// Date-only maths at UTC midnight so a timezone or DST shift can never move a
// threshold by a day.
const utc = (iso) => {
  const [y, m, d] = iso.split("-").map(Number);
  return Date.UTC(y, m - 1, d);
};
const DAY_MS = 86400000;
// --today=YYYY-MM-DD lets the alert path be reproduced on demand instead of taken on
// faith. A monitor that has only ever been observed saying "OK" has not been shown to
// alert at all; see audit/certificate_expiry_monitor.test.mjs.
const todayArg = process.argv.find((a) => a.startsWith("--today="));
const todayIso = todayArg ? todayArg.slice("--today=".length) : new Date().toISOString().slice(0, 10);
if (!/^\d{4}-\d{2}-\d{2}$/.test(todayIso)) fail(`--today must be YYYY-MM-DD, got "${todayIso}"`);
const daysUntil = (iso) => Math.round((utc(iso) - utc(todayIso)) / DAY_MS);
const minusDays = (iso, n) => new Date(utc(iso) - n * DAY_MS).toISOString().slice(0, 10);

const all = extractCertificates(source);
const enCerts = all.filter((c) => /in effect through/.test(c.desc));
const esCerts = all.filter((c) => /vigente hasta el/.test(c.desc));

if (enCerts.length === 0) {
  fail(
    "parsed ZERO certificates out of app/resources/page.jsx. Either the INSURANCE " +
    "section was removed or the legalDocs shape changed and this parser is now blind. " +
    "Refusing to report healthy on an empty read."
  );
}
if (esCerts.length !== enCerts.length) {
  fail(
    `EN publishes ${enCerts.length} certificates but ES publishes ${esCerts.length}. ` +
    "One language is showing a certificate the other is not."
  );
}

const esByFile = new Map(esCerts.map((c) => [c.file, c]));
const certificates = [];
const alerts = [];

for (const cert of enCerts) {
  const en = parseExpiry(cert.desc);
  if (!en) {
    fail(
      `could not parse an expiry date out of the EN copy for ${cert.file}. ` +
      "An unreadable certificate is an alert, never an absence."
    );
  }

  const esCert = esByFile.get(cert.file);
  let esIso = null;
  if (esCert) {
    const es = parseExpiry(esCert.desc);
    if (!es) fail(`could not parse an expiry date out of the ES copy for ${cert.file}.`);
    esIso = es.iso;
  }

  const left = daysUntil(en.iso);
  const pdfPresent = fs.existsSync(path.join(DOCUMENTS_DIR, cert.file));
  const nextAlertDates = ALERT_THRESHOLDS
    .map((t) => ({ threshold: t, on: minusDays(en.iso, t), passed: left <= t }));
  const nextAlert = nextAlertDates.find((a) => !a.passed) || null;

  const entry = {
    title: cert.title,
    file: cert.file,
    expires: en.iso,
    daysRemaining: left,
    spanishExpires: esIso,
    spanishMatchesEnglish: esIso === null ? null : esIso === en.iso,
    pdfPresent,
    alertDates: nextAlertDates,
    nextAlertOn: nextAlert ? nextAlert.on : null,
    nextAlertThreshold: nextAlert ? nextAlert.threshold : null,
  };
  certificates.push(entry);

  if (left < 0) {
    alerts.push(`EXPIRED ${-left} day(s) ago and still published: ${cert.title} (${cert.file}), expiry ${en.iso}. Unpublish or replace it now.`);
  } else if (left === 0) {
    alerts.push(`EXPIRES TODAY and still published: ${cert.title} (${cert.file}), expiry ${en.iso}.`);
  } else {
    const hit = ALERT_THRESHOLDS.filter((t) => left <= t).sort((a, b) => a - b)[0];
    if (hit !== undefined) {
      alerts.push(`${left} day(s) left on ${cert.title} (${cert.file}), expiry ${en.iso} -- crossed the ${hit}-day mark. Request the renewed ACORD 25 from the carrier.`);
    }
  }
  if (esIso !== null && esIso !== en.iso) {
    alerts.push(`EN and ES publish DIFFERENT expiry dates for ${cert.file}: EN ${en.iso} vs ES ${esIso}.`);
  }
  if (!pdfPresent) {
    alerts.push(`${cert.file} is published on /resources but is NOT in public/documents -- the download link is broken.`);
  }
}

certificates.sort((a, b) => a.daysRemaining - b.daysRemaining);

const report = {
  ranAt: new Date().toISOString(),
  today: todayIso,
  source: "app/resources/page.jsx",
  alertThresholdsDays: ALERT_THRESHOLDS,
  certificatesFound: certificates.length,
  healthy: alerts.length === 0,
  disabled: false,
  alerts,
  certificates,
};
fs.writeFileSync(REPORT_PATH, JSON.stringify(report, null, 1));

if (JSON_ONLY) {
  console.log(JSON.stringify(report, null, 1));
  process.exit(alerts.length ? 2 : 0);
}

console.log("\n=== JR One published certificate expiry monitor ===");
console.log(`today ${todayIso}, thresholds ${ALERT_THRESHOLDS.join("/")} days, source app/resources/page.jsx\n`);
for (const c of certificates) {
  const flag = c.daysRemaining < 0 ? "EXPIRED" : c.daysRemaining <= 60 ? "ALERT" : "ok";
  console.log(`  [${flag}] ${c.title}`);
  console.log(`         file    ${c.file}${c.pdfPresent ? "" : "  <-- MISSING FROM public/documents"}`);
  console.log(`         expires ${c.expires}  (${c.daysRemaining} days)`);
  console.log(`         es copy ${c.spanishExpires === null ? "not published" : c.spanishExpires + (c.spanishMatchesEnglish ? " (matches)" : " <-- DOES NOT MATCH EN")}`);
  console.log(`         next alert ${c.nextAlertOn ? `${c.nextAlertOn} (${c.nextAlertThreshold}-day)` : "none left, inside the final window"}`);
}
if (alerts.length) {
  console.log("\nALERT:");
  alerts.forEach((a) => console.log("  ! " + a));
  process.exit(2);
}
console.log(`\nOK: ${certificates.length} published certificates, none inside ${Math.max(...ALERT_THRESHOLDS)} days, EN and ES dates agree, all PDFs present.`);
