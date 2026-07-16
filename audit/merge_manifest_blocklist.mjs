// merge_manifest_blocklist.mjs -- after the full-catalog vision review:
//   1. merge every UNSAFE-* photo id into lib/companycam/photo-filter-config.json
//      (blocked_photo_ids + _blocked_reasons) so the live top-up fetch can never
//      re-introduce a photo the audit rejected (blocked-before-select law)
//   2. refresh audit/reviewed-ids.json with every id this audit reviewed
//   3. refresh audit/monitor-baseline.json blockCount
// Run from website root AFTER join_manifest_verdicts.mjs: node audit/merge_manifest_blocklist.mjs
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
const HERE = path.dirname(fileURLToPath(import.meta.url));
const CONFIG = path.join(HERE, "..", "lib", "companycam", "photo-filter-config.json");

const mv = JSON.parse(fs.readFileSync(path.join(HERE, "manifest-verdicts.json"), "utf8"));
if (mv.missing > 0) {
  console.error(`REFUSING: ${mv.missing} tiles still unreviewed. Finish vision_review_manifest.mjs first.`);
  process.exit(1);
}
const idx = JSON.parse(fs.readFileSync(path.join(HERE, "sheet-index.json"), "utf8"));
const projectByIndex = {};
for (const [gi, meta] of Object.entries(idx)) projectByIndex[gi] = meta.projectName || "";

const config = JSON.parse(fs.readFileSync(CONFIG, "utf8"));
const blocked = new Set((config.blocked_photo_ids || []).map(String));
const before = blocked.size;
config._blocked_reasons = config._blocked_reasons || {};

// Reasons for the manifest-audit blocks live in a side file, NOT the runtime config:
// ~3.3K reason objects would bloat the serverless bundle for zero runtime value.
const sideReasons = {};
let newBlocks = 0;
for (const v of mv.verdicts) {
  if (v.class === "SAFE") continue;
  const id = String(v.id);
  if (!blocked.has(id)) { blocked.add(id); newBlocks++; }
  if (!config._blocked_reasons[id] && !sideReasons[id]) {
    sideReasons[id] = {
      class: v.class,
      reason: v.reason,
      project: projectByIndex[String(v.index)] || "",
    };
  }
}
fs.writeFileSync(path.join(HERE, "blocked-reasons-manifest-2026-07-16.json"),
  JSON.stringify({ note: "reasons for blocked_photo_ids added by the 2026-07-16 full-catalog manifest audit; runtime config carries ids only", reasons: sideReasons }, null, 1));
config._comment_manifest_audit = "2026-07-16 full-catalog audit block reasons: audit/blocked-reasons-manifest-2026-07-16.json";
config.blocked_photo_ids = [...blocked];
fs.writeFileSync(CONFIG, JSON.stringify(config, null, 1));

// reviewed-ids: union of prior reviewed + everything in this audit (SAFE or not)
const reviewedPath = path.join(HERE, "reviewed-ids.json");
const prior = JSON.parse(fs.readFileSync(reviewedPath, "utf8"));
const ids = new Set((prior.ids || []).map(String));
const priorCount = ids.size;
for (const v of mv.verdicts) ids.add(String(v.id));
fs.writeFileSync(reviewedPath, JSON.stringify({
  ids: [...ids],
  updatedAt: new Date().toISOString(),
  note: "prior displayed-set audit + 2026-07-16 full-catalog manifest audit (3,755 candidates)",
}, null, 1));

// monitor baseline: new block count
const baselinePath = path.join(HERE, "monitor-baseline.json");
fs.writeFileSync(baselinePath, JSON.stringify({
  blockCount: blocked.size,
  setAt: new Date().toISOString(),
  note: "2026-07-16 full-catalog manifest audit: blocklist grew by manifest-review UNSAFE ids",
}, null, 1));

console.log(JSON.stringify({
  blockedBefore: before,
  newBlocks,
  blockedAfter: blocked.size,
  reviewedBefore: priorCount,
  reviewedAfter: ids.size,
}, null, 2));
