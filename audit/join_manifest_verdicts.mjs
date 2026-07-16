// join_manifest_verdicts.mjs -- join per-sheet vision verdicts (tile index keyed)
// to photo ids via sheet-index.json, producing audit/manifest-verdicts.json in the
// shape build_manifest.mjs expects: { verdicts: [{id, class, reason, confidence}] }.
// Fail-closed: tiles with no verdict are reported and NOT marked SAFE.
// Run from website root: node audit/join_manifest_verdicts.mjs
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
const HERE = path.dirname(fileURLToPath(import.meta.url));

const idx = JSON.parse(fs.readFileSync(path.join(HERE, "sheet-index.json"), "utf8"));
const byIndex = {};
const dir = path.join(HERE, "verdicts");
for (const f of fs.readdirSync(dir).filter((f) => f.startsWith("manifest-sheet-") && f.endsWith(".json"))) {
  const j = JSON.parse(fs.readFileSync(path.join(dir, f), "utf8"));
  for (const v of j.verdicts || []) byIndex[v.index] = v;
}

const verdicts = [];
const missing = [];
for (const [gi, meta] of Object.entries(idx)) {
  const v = byIndex[gi];
  if (!v) { missing.push(gi); continue; }
  verdicts.push({ id: String(meta.id), index: Number(gi), class: v.class, reason: v.reason, confidence: v.confidence });
}

const counts = {};
for (const v of verdicts) counts[v.class] = (counts[v.class] || 0) + 1;

fs.writeFileSync(path.join(HERE, "manifest-verdicts.json"), JSON.stringify({
  generatedAt: new Date().toISOString(),
  totalTiles: Object.keys(idx).length,
  reviewed: verdicts.length,
  missing: missing.length,
  counts,
  verdicts,
}, null, 1));

console.log(JSON.stringify({ totalTiles: Object.keys(idx).length, reviewed: verdicts.length, missing: missing.length, counts }, null, 2));
if (missing.length) console.log("MISSING tile indexes (rerun vision_review_manifest.mjs):", missing.slice(0, 40).join(","), missing.length > 40 ? "..." : "");
