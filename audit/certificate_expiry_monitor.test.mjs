// Proves the certificate expiry monitor actually ALERTS, rather than only ever having
// been observed saying OK. Drives real runs at synthetic dates via --today and asserts
// on the exit code and the emitted report.
//
// Anchored on the Workers' Compensation certificate published on /resources, expiry
// 2026-10-08. If that date changes on the page, the expected dates below change with it;
// the test reads the expiry back out of the report rather than restating it.
//
// Run: node audit/certificate_expiry_monitor.test.mjs

import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const HERE = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(HERE, "..");
const MON = "audit/certificate_expiry_monitor.mjs";
const REPORT = path.join(HERE, "certificate-expiry-report.json");

const DAY_MS = 86400000;
const utc = (iso) => { const [y, m, d] = iso.split("-").map(Number); return Date.UTC(y, m - 1, d); };
const minus = (iso, n) => new Date(utc(iso) - n * DAY_MS).toISOString().slice(0, 10);
const plus = (iso, n) => new Date(utc(iso) + n * DAY_MS).toISOString().slice(0, 10);

function run(today) {
  let code = 0, out = "";
  try {
    out = execFileSync(process.execPath, [MON, `--today=${today}`], { cwd: ROOT }).toString();
  } catch (e) {
    code = e.status;
    out = (e.stdout ? e.stdout.toString() : "") + (e.stderr ? e.stderr.toString() : "");
  }
  return { code, out, report: JSON.parse(fs.readFileSync(REPORT, "utf8")) };
}

let failures = 0;
const check = (name, cond, detail) => {
  if (cond) { console.log(`  PASS  ${name}`); }
  else { console.log(`  FAIL  ${name}${detail ? "\n          " + detail : ""}`); failures++; }
};

// Establish the soonest expiry from a live run, so the test never restates a date.
const base = run(new Date().toISOString().slice(0, 10));
const soonest = base.report.certificates[0];
const EXP = soonest.expires;
console.log(`\ncertificate expiry monitor -- alert-path tests`);
console.log(`anchor: ${soonest.title} (${soonest.file}), expiry ${EXP}\n`);

// 1. Comfortably clear -> healthy, exit 0.
{
  const r = run(minus(EXP, 200));
  check("200 days out is healthy and exits 0", r.code === 0 && r.report.healthy === true, `exit ${r.code}, healthy ${r.report.healthy}`);
}

// 2. One day BEFORE the 60-day mark -> still healthy. Guards against an off-by-one
//    that would make every threshold fire a day early.
{
  const r = run(minus(EXP, 61));
  check("61 days out is still healthy (no off-by-one)", r.code === 0 && r.report.healthy === true, `exit ${r.code}`);
}

// 3. Each threshold fires exactly on its day.
for (const t of [60, 30, 7]) {
  const r = run(minus(EXP, t));
  const alerted = r.report.alerts.some((a) => a.includes(`crossed the ${t}-day mark`));
  check(`${t}-day threshold fires on ${minus(EXP, t)} and exits 2`, r.code === 2 && alerted, `exit ${r.code}, alerts ${JSON.stringify(r.report.alerts)}`);
}

// 4. Inside a window it keeps alerting on the tightest threshold crossed, not the loosest.
{
  const r = run(minus(EXP, 20));
  check("20 days out reports the 30-day mark, not the 60", r.code === 2 && r.report.alerts.some((a) => a.includes("crossed the 30-day mark")), JSON.stringify(r.report.alerts));
}

// 5. Expiry day itself.
{
  const r = run(EXP);
  check("expiry day itself alerts and exits 2", r.code === 2 && r.report.alerts.some((a) => a.includes("EXPIRES TODAY")), `exit ${r.code}`);
}

// 6. Past expiry -> the loud case. This is the one that matters: a published expired
//    certificate must never come back exit 0.
{
  const r = run(plus(EXP, 5));
  check("5 days past expiry screams EXPIRED and exits 2", r.code === 2 && r.report.alerts.some((a) => a.includes("EXPIRED 5 day(s) ago")), `exit ${r.code}, alerts ${JSON.stringify(r.report.alerts)}`);
}

// 7. _guard.py convention: a broken read must be an alert, never a healthy empty result.
{
  const page = path.join(ROOT, "app/resources/page.jsx");
  const original = fs.readFileSync(page, "utf8");
  const stripped = original.replace(/in effect through/g, "in force until");
  try {
    fs.writeFileSync(page, stripped);
    const r = run(new Date().toISOString().slice(0, 10));
    check("an unparseable page DISABLES the monitor loudly (exit 2), never 'healthy, 0 found'",
      r.code === 2 && r.report.disabled === true && r.report.healthy === false,
      `exit ${r.code}, disabled ${r.report.disabled}, healthy ${r.report.healthy}`);
  } finally {
    fs.writeFileSync(page, original); // always restore, even if the assert throws
  }
  check("resources page restored byte-for-byte after the guard test",
    fs.readFileSync(page, "utf8") === original);
}

// Leave a truthful report on disk rather than the last synthetic one.
run(new Date().toISOString().slice(0, 10));

console.log(`\n${failures === 0 ? "ALL PASS" : failures + " FAILED"}\n`);
process.exit(failures === 0 ? 0 : 1);
