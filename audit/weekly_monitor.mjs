// weekly_monitor.mjs -- Phase 5 prevention check for the CompanyCam photo gate.
//
// What it does (one live-gallery refresh, no other API spend):
//   1. Refreshes the live gallery + re-enumerates every photo that WOULD display on each page.
//   2. NEW-PHOTO CHECK: compares the displayed set against audit/reviewed-ids.json (everything
//      vision-reviewed at audit time). Displayed photos never reviewed AND not already blocked
//      have NOT been vision-checked for PII -> flagged for a review pass.
//   3. SPARSE/LEAK CHECK: runs audit/verify_filter.mjs (the accurate model of the component
//      render logic, including mixed-service fallback + the >=3 hide gate) and fails if any
//      blocked photo can still reach a page or any page renders 1-2 photos.
//   4. BLOCK-GROWTH CHECK: compares the configured block count to audit/monitor-baseline.json
//      and alerts if it grew by more than 10 since the baseline (possible CompanyCam misconfig
//      dumping screenshots/work-orders into the feed).
//
// IMPORTANT (deployed != self-healing): this monitor CANNOT vision-classify on its own. When it
// flags new unreviewed photos it tells you to run the audit vision pipeline; it does not
// silently pass. Exit code 2 = action needed, 0 = clean.
//
// Run: node audit/weekly_monitor.mjs           (reuses cached live gallery)
//      node audit/weekly_monitor.mjs --refresh  (forces a fresh CompanyCam pull)

import { execSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
const HERE = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(HERE, "..");

const REFRESH = process.argv.includes("--refresh");
const BLOCK_GROWTH_ALERT = 10;

if (REFRESH) { try { fs.unlinkSync(path.join(HERE, "live-gallery.json")); } catch (_) {} }
execSync("node audit/enumerate_displayed.mjs", { cwd: ROOT, stdio: "inherit" });

const displayed = JSON.parse(fs.readFileSync(path.join(HERE, "displayed-photos.json"), "utf8")).photos;
const reviewed = new Set(JSON.parse(fs.readFileSync(path.join(HERE, "reviewed-ids.json"), "utf8")).ids.map(String));
const cfg = JSON.parse(fs.readFileSync(path.join(ROOT, "lib/companycam/photo-filter-config.json"), "utf8"));
const blocked = new Set((cfg.blocked_photo_ids || []).map(String));

// 2. new-photo check
const newUnreviewed = displayed.filter((p) => !reviewed.has(String(p.id)) && !blocked.has(String(p.id)));

// 3. sparse/leak check via verify_filter.mjs exit code
let verifyOk = true, verifyOut = "";
try {
  verifyOut = execSync("node audit/verify_filter.mjs", { cwd: ROOT }).toString();
} catch (e) {
  verifyOk = false;
  verifyOut = (e.stdout ? e.stdout.toString() : "") + (e.stderr ? e.stderr.toString() : "");
}

// 4. block-growth check vs baseline
const baselinePath = path.join(HERE, "monitor-baseline.json");
let baseline = null;
if (fs.existsSync(baselinePath)) baseline = JSON.parse(fs.readFileSync(baselinePath, "utf8"));
else { baseline = { blockCount: blocked.size, setAt: new Date().toISOString() };
       fs.writeFileSync(baselinePath, JSON.stringify(baseline, null, 1)); }
const blockGrowth = blocked.size - baseline.blockCount;

const report = {
  ranAt: new Date().toISOString(),
  totalDisplayedCandidates: displayed.length,
  blockedIdsConfigured: blocked.size,
  baselineBlockCount: baseline.blockCount,
  blockGrowthSinceBaseline: blockGrowth,
  newUnreviewedCount: newUnreviewed.length,
  newUnreviewed: newUnreviewed.map((p) => ({ id: p.id, source: p.source, projectName: p.projectName, pages: p.pages })),
  verifyFilterPassed: verifyOk,
};
fs.writeFileSync(path.join(HERE, "monitor-report.json"), JSON.stringify(report, null, 1));

const alerts = [];
if (newUnreviewed.length > 0) alerts.push(`${newUnreviewed.length} NEW displayed photos never vision-reviewed -> run the audit vision pass (audit/analyze_photos.py + build_sheets.py + classify the sheets) and add any unsafe ids to blocked_photo_ids`);
if (!verifyOk) alerts.push(`verify_filter FAILED (blocked photo on a page, or a page below 3 photos):\n${verifyOut.split("\n").filter(Boolean).slice(-6).join("\n")}`);
if (blockGrowth > BLOCK_GROWTH_ALERT) alerts.push(`block count grew by ${blockGrowth} since baseline (${baseline.blockCount} -> ${blocked.size}) -- likely CompanyCam project hygiene issue`);

console.log("\n=== CompanyCam photo monitor ===");
console.log(JSON.stringify(report, null, 1));
if (alerts.length) { console.log("\nALERT:"); alerts.forEach((a) => console.log("  ! " + a)); process.exit(2); }
console.log("\nOK: no new unreviewed photos, filter verify passed, block count nominal.");
