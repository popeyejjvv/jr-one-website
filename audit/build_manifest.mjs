// build_manifest.mjs -- assemble lib/companycam/curated-gallery.json from the
// manifest-candidates enumeration + vision verdicts.
//
// Inputs:
//   audit/manifest-candidates.json  (candidates from all Complete projects, photo-select rules applied)
//   audit/manifest-verdicts.json    ({ verdicts: [{id, class}] } -- id-keyed, produced from the
//                                    review workflow's sheet-index join)
//   lib/companycam/photo-filter-config.json (blocked ids -- final guard)
// Output:
//   lib/companycam/curated-gallery.json  { generatedAt, totalPhotos, totalProjects, photos: [...] }
//
// Each manifest photo carries: id, projectId, projectName, city, state, tags[], web,
// thumbnail, original, capturedAt. Tags are fetched live per approved photo (one call each)
// and mapped through the site's 8 gallery tag ids; photos with no site tag default to "gutters".
// Run from the website root: node audit/build_manifest.mjs
import fs from "node:fs";

const env = {};
for (const line of fs.readFileSync(".env.local", "utf8").split("\n")) {
  const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
  if (m) env[m[1]] = m[2].replace(/^["']|["']$/g, "");
}
const cc = async (p) => {
  for (let attempt = 0; attempt < 3; attempt++) {
    const r = await fetch(`https://api.companycam.com/v2${p}`, { headers: { Authorization: `Bearer ${env.COMPANYCAM_TOKEN}` } });
    if (r.status === 429) { await new Promise((s) => setTimeout(s, 2000)); continue; }
    if (!r.ok) throw new Error(`${r.status} ${p}`);
    return r.json();
  }
  throw new Error(`rate-limited: ${p}`);
};

const TAG_ID_TO_NAME = {
  "25122393": "commercial", "25122394": "copper", "25123008": "govee", "25122391": "guards",
  "25122389": "gutters", "25122618": "siding", "25122390": "soffit", "25122395": "website",
};

const candidates = JSON.parse(fs.readFileSync("audit/manifest-candidates.json", "utf8")).candidates;
const verdicts = JSON.parse(fs.readFileSync("audit/manifest-verdicts.json", "utf8")).verdicts;
const blocked = new Set(JSON.parse(fs.readFileSync("lib/companycam/photo-filter-config.json", "utf8")).blocked_photo_ids.map(String));
const safeIds = new Set(verdicts.filter((v) => v.class === "SAFE").map((v) => String(v.id)));

// candidates marked alreadyReviewed passed a prior audit (they are displayed today and not blocked)
const approved = candidates.filter((c) =>
  !blocked.has(String(c.id)) && (safeIds.has(String(c.id)) || c.alreadyReviewed)
);
console.log(`approved for manifest: ${approved.length} of ${candidates.length} candidates`);

// fetch tags per approved photo, batches of 25
const photos = [];
for (let i = 0; i < approved.length; i += 25) {
  const batch = approved.slice(i, i + 25);
  const results = await Promise.all(batch.map(async (c) => {
    let tags = [];
    try {
      const ts = await cc(`/photos/${c.id}/tags`);
      tags = (ts || []).map((t) => TAG_ID_TO_NAME[String(t.id)]).filter(Boolean);
    } catch { /* tag fetch is best-effort */ }
    if (!tags.length) tags = ["gutters"];
    return {
      id: c.id, projectId: c.projectId, projectName: c.projectName || "",
      city: c.city || "", state: c.state || "",
      tags, web: c.web, thumbnail: c.thumbnail, original: c.original,
      capturedAt: c.capturedAt,
    };
  }));
  photos.push(...results);
  if (i % 250 < 25) console.error(`  ...tags ${i}/${approved.length}`);
}

photos.sort((a, b) => (b.capturedAt || 0) - (a.capturedAt || 0));
const out = {
  generatedAt: new Date().toISOString(),
  note: "Curated gallery manifest: every Complete-labeled project, photo-select rules (last-day window / 30-min gap / cap 4), every photo vision-reviewed. Rebuild: audit/build_manifest.mjs after a new review pass.",
  totalPhotos: photos.length,
  totalProjects: new Set(photos.map((p) => p.projectId)).size,
  photos,
};
fs.writeFileSync("lib/companycam/curated-gallery.json", JSON.stringify(out, null, 1));
console.log(`wrote lib/companycam/curated-gallery.json: ${out.totalPhotos} photos, ${out.totalProjects} projects`);
