// aggregate_verdicts.mjs -- join vision verdicts (by tile index) to photo records,
// produce audit/classification-final.json + the blocked id list + summary.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
const HERE = path.dirname(fileURLToPath(import.meta.url));

const idx = JSON.parse(fs.readFileSync(path.join(HERE, "sheet-index.json"), "utf8"));
const displayed = JSON.parse(fs.readFileSync(path.join(HERE, "displayed-photos.json"), "utf8")).photos;
const byId = new Map(displayed.map(p => [String(p.id), p]));

// load all verdict files
const verdicts = {};
for (const f of fs.readdirSync(path.join(HERE, "verdicts")).filter(f => f.endsWith(".json"))) {
  const d = JSON.parse(fs.readFileSync(path.join(HERE, "verdicts", f), "utf8"));
  for (const v of (d.verdicts || [])) verdicts[v.index] = v;
}

const final = [];
let missing = 0;
for (const [gi, meta] of Object.entries(idx)) {
  const v = verdicts[gi];
  const rec = byId.get(String(meta.id)) || {};
  if (!v) { missing++; }
  final.push({
    id: meta.id,
    projectId: rec.projectId || null,
    projectName: meta.projectName || "",
    source: meta.source,
    class: v ? v.class : "UNREVIEWED",
    reason: v ? v.reason : "no verdict produced",
    confidence: v ? v.confidence : null,
    pages: rec.pages || [],
  });
}

const counts = {};
for (const r of final) counts[r.class] = (counts[r.class] || 0) + 1;
const unsafe = final.filter(r => r.class !== "SAFE");
const blocked_photo_ids = unsafe.map(r => String(r.id));

const summary = {
  generatedAt: new Date().toISOString(),
  totalReviewed: final.length,
  missingVerdicts: missing,
  counts,
  unsafeCount: unsafe.length,
  unsafeBySource: {
    inventory: unsafe.filter(r => r.source === "inventory").length,
    live: unsafe.filter(r => r.source === "live").length,
  },
};

fs.writeFileSync(path.join(HERE, "classification-final.json"),
  JSON.stringify({ summary, unsafe, all: final }, null, 1));
fs.writeFileSync(path.join(HERE, "blocked-ids.json"),
  JSON.stringify(blocked_photo_ids, null, 1));
console.log(JSON.stringify(summary, null, 2));
console.log(`\nblocked ids written: ${blocked_photo_ids.length}`);
