// enumerate_displayed.mjs
// Faithful standalone mirror of lib/companycam/by-city.js + app/api/companycam/route.js
// selection logic. Produces the exact set of photos that render on every public page,
// deduplicated, with the list of pages each photo appears on. Output: audit/displayed-photos.json
//
// Run from the website root: node audit/enumerate_displayed.mjs
// Reads COMPANYCAM_TOKEN from .env.local. Caches the live gallery to audit/live-gallery.json
// so re-runs don't re-hit the CompanyCam API.

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");

// ---- load .env.local ----
function loadEnv() {
  const p = path.join(ROOT, ".env.local");
  if (!fs.existsSync(p)) return {};
  const env = {};
  for (const line of fs.readFileSync(p, "utf8").split("\n")) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
    if (m) env[m[1]] = m[2].replace(/^["']|["']$/g, "");
  }
  return env;
}
const ENV = loadEnv();
const COMPANYCAM_TOKEN = ENV.COMPANYCAM_TOKEN;
const API = "https://api.companycam.com/v2";

// ---- mirror route.js TAGS ----
const TAGS = {
  commercial: "25122393", copper: "25122394", govee: "25123008", guards: "25122391",
  gutters: "25122389", siding: "25122618", soffit: "25122390", website: "25122395",
};

// ---- mirror by-city.js maps ----
const CITY_NORMALIZER = {
  "tampa": "tampa", "south tampa": "tampa", "carrollwood": "tampa", "westchase": "tampa",
  "town n country": "tampa", "town 'n' country": "tampa", "new tampa": "new-tampa",
  "brandon": "brandon", "riverview": "riverview", "ruskin": "ruskin",
  "sun city center": "sun-city-center", "sun city": "sun-city-center",
  "temple terrace": "temple-terrace", "plant city": "plant-city", "lutz": "lutz",
  "valrico": "valrico", "lithia": "lithia", "clearwater": "clearwater",
  "st petersburg": "st-petersburg", "st. petersburg": "st-petersburg",
  "saint petersburg": "st-petersburg", "st pete": "st-petersburg",
  "palm harbor": "palm-harbor", "largo": "largo", "tarpon springs": "tarpon-springs",
  "dunedin": "dunedin", "oldsmar": "oldsmar", "safety harbor": "safety-harbor",
  "seminole": "seminole", "pinellas park": "pinellas-park", "wesley chapel": "wesley-chapel",
  "land o' lakes": "land-o-lakes", "land o lakes": "land-o-lakes", "land-o-lakes": "land-o-lakes",
  "new port richey": "new-port-richey", "spring hill": "spring-hill",
  "bradenton": "bradenton", "lakeland": "lakeland", "sarasota": "sarasota",
};
const ALL_CITY_SLUGS = Array.from(new Set(Object.values(CITY_NORMALIZER)));
const CITY_COUNTY = {
  tampa: "Hillsborough", "new-tampa": "Hillsborough", brandon: "Hillsborough",
  riverview: "Hillsborough", ruskin: "Hillsborough", "sun-city-center": "Hillsborough",
  "temple-terrace": "Hillsborough", "plant-city": "Hillsborough", lutz: "Hillsborough",
  valrico: "Hillsborough", lithia: "Hillsborough",
  clearwater: "Pinellas", "st-petersburg": "Pinellas", "palm-harbor": "Pinellas",
  largo: "Pinellas", "tarpon-springs": "Pinellas", dunedin: "Pinellas",
  oldsmar: "Pinellas", "safety-harbor": "Pinellas", seminole: "Pinellas", "pinellas-park": "Pinellas",
  "wesley-chapel": "Pasco", "land-o-lakes": "Pasco", "new-port-richey": "Pasco",
  "spring-hill": "Hernando", bradenton: "Manatee", lakeland: "Polk", sarasota: "Sarasota",
};
const TAG_TO_SERVICE_SLUG = {
  commercial: "commercial-gutters", copper: "copper-gutters", govee: "govee-lights",
  guards: "gutter-guards", gutters: "seamless-aluminum-gutters", siding: "siding",
  soffit: "soffit-and-fascia",
};
const SERVICE_SLUG_TO_TAG = Object.entries(TAG_TO_SERVICE_SLUG).reduce(
  (a, [tag, slug]) => ({ ...a, [slug]: tag }), {});

// service slugs that have a top-level ServicePortfolio page
const SERVICE_PAGES = ["seamless-aluminum-gutters", "gutter-guards", "soffit-and-fascia",
  "copper-gutters", "siding", "commercial-gutters", "govee-lights"];

function normalizeCity(raw) {
  if (!raw) return null;
  const c = raw.toLowerCase().trim().replace(/[,.]+$/g, "");
  return CITY_NORMALIZER[c] || null;
}
function pickServiceTag(tags) {
  if (!tags || !tags.length) return "gutters";
  const ranked = ["copper", "commercial", "guards", "soffit", "siding", "govee", "gutters", "website"];
  for (const c of ranked) if (tags.includes(c)) return c;
  return "gutters";
}

// ---- live API fetch (mirror route.js) ----
async function ccFetch(p) {
  const res = await fetch(`${API}${p}`, { headers: { Authorization: `Bearer ${COMPANYCAM_TOKEN}` } });
  if (!res.ok) throw new Error(`CompanyCam ${res.status}: ${p}`);
  return res.json();
}
async function fetchPhotosForTag(tagId, tagName) {
  const photos = []; let page = 1;
  while (true) {
    const batch = await ccFetch(`/photos?tag_ids[]=${tagId}&per_page=50&page=${page}`);
    if (!batch.length) break;
    for (const p of batch) {
      photos.push({
        id: p.id, projectId: p.project_id, tag: tagName,
        web: (p.uris.find(u => u.type === "web") || {}).uri,
        original: (p.uris.find(u => u.type === "original") || {}).uri,
        thumbnail: (p.uris.find(u => u.type === "thumbnail") || {}).uri,
        capturedAt: p.captured_at,
      });
    }
    if (batch.length < 50) break;
    page++;
  }
  return photos;
}
async function fetchProjectDetails(projectIds) {
  const projects = {};
  const ids = [...projectIds];
  for (let i = 0; i < ids.length; i += 10) {
    const batch = ids.slice(i, i + 10);
    const results = await Promise.all(batch.map(id => ccFetch(`/projects/${id}`).catch(() => null)));
    for (const p of results) {
      if (!p) continue;
      projects[p.id] = {
        id: p.id, name: p.name, city: p.address?.city || "", state: p.address?.state || "",
        status: p.status || null, // capture status for audit (route.js currently drops it)
      };
    }
  }
  return projects;
}
async function buildLiveGallery() {
  const cachePath = path.join(__dirname, "live-gallery.json");
  if (fs.existsSync(cachePath)) {
    console.log("[live] using cached audit/live-gallery.json");
    return JSON.parse(fs.readFileSync(cachePath, "utf8"));
  }
  if (!COMPANYCAM_TOKEN) { console.warn("[live] no token — skipping live gallery"); return { photos: [] }; }
  const tagEntries = Object.entries(TAGS);
  const allArrays = await Promise.all(tagEntries.map(([n, id]) => fetchPhotosForTag(id, n)));
  const photoMap = new Map();
  for (const photos of allArrays) for (const p of photos) {
    if (photoMap.has(p.id)) { const e = photoMap.get(p.id); if (!e.tags.includes(p.tag)) e.tags.push(p.tag); }
    else photoMap.set(p.id, { ...p, tags: [p.tag] });
  }
  const allPhotos = [...photoMap.values()];
  const projectIds = new Set(allPhotos.map(p => p.projectId));
  const projects = await fetchProjectDetails(projectIds);
  for (const photo of allPhotos) {
    const proj = projects[photo.projectId];
    if (proj) { photo.projectName = proj.name; photo.city = proj.city; photo.state = proj.state; photo.projectStatus = proj.status; }
    delete photo.tag;
  }
  allPhotos.sort((a, b) => (b.capturedAt || 0) - (a.capturedAt || 0));
  const data = { photos: allPhotos, totalPhotos: allPhotos.length, projectsMeta: projects };
  fs.writeFileSync(cachePath, JSON.stringify(data, null, 1));
  console.log(`[live] fetched ${allPhotos.length} tagged photos`);
  return data;
}

// ---- inventory seed (mirror by-city.js) ----
const inventoryData = JSON.parse(fs.readFileSync(path.join(ROOT, "lib/companycam/inventory.json"), "utf8"));
function synthesizeInventoryPhoto(p) {
  const capturedSec = p.created_at ? Math.floor(new Date(p.created_at).getTime() / 1000) : 0;
  return {
    id: `inv-${p.project_id}`, projectId: p.project_id, projectName: p.name || "",
    city: p.city_official || "", web: p.first_photo_url, original: p.first_photo_url,
    thumbnail: p.first_photo_url, capturedAt: capturedSec || null, tags: ["gutters"],
    source: "inventory", photoCount: p.photo_count,
  };
}

async function loadGalleryByCity() {
  const byCity = {};
  for (const s of ALL_CITY_SLUGS) byCity[s] = { citySlug: s, photos: [], projectIds: new Set() };
  byCity["__out_of_area__"] = { citySlug: "__out_of_area__", photos: [], projectIds: new Set() };
  // seed inventory
  for (const p of inventoryData.projects) {
    if (!p.city_slug || !p.first_photo_url || !byCity[p.city_slug]) continue;
    byCity[p.city_slug].photos.push(synthesizeInventoryPhoto(p));
    byCity[p.city_slug].projectIds.add(p.project_id);
  }
  // stack live
  const live = await buildLiveGallery();
  for (const p of (live.photos || [])) {
    const slug = normalizeCity(p.city) || "__out_of_area__";
    if (!byCity[slug]) continue;
    byCity[slug].photos.push({ ...p, source: "live" });
    if (p.projectId) byCity[slug].projectIds.add(p.projectId);
  }
  for (const s of Object.keys(byCity)) {
    byCity[s].photos.sort((a, b) => (b.capturedAt || 0) - (a.capturedAt || 0));
    byCity[s].totalProjects = byCity[s].projectIds.size;
  }
  return byCity;
}

// ---- selection mirrors ----
function evidenceTier(count) {
  return count >= 10 ? "high" : count >= 5 ? "medium" : count >= 1 ? "low" : "none";
}

// ---- main ----
const byCity = await loadGalleryByCity();
const registry = new Map(); // photoId -> record

function note(photo, pageLabel) {
  let rec = registry.get(photo.id);
  if (!rec) {
    rec = {
      id: photo.id, projectId: photo.projectId, projectName: photo.projectName || "",
      source: photo.source, web: photo.web, original: photo.original,
      capturedAt: photo.capturedAt, tags: photo.tags, projectStatus: photo.projectStatus || null,
      photoCount: photo.photoCount || null, pages: [],
    };
    registry.set(photo.id, rec);
  }
  if (!rec.pages.includes(pageLabel)) rec.pages.push(pageLabel);
}

// 1. City pages (/areas/[slug]) — CityPortfolio limit 9
for (const slug of ALL_CITY_SLUGS) {
  const bucket = byCity[slug];
  const tier = evidenceTier(bucket.totalProjects);
  if (tier === "high" || tier === "medium") {
    for (const p of bucket.photos.slice(0, 9)) note(p, `/areas/${slug}`);
  } else {
    // county fallback — pull from same-county cities, newest 12
    const county = CITY_COUNTY[slug];
    const sameCounty = Object.entries(CITY_COUNTY).filter(([, c]) => c === county).map(([s]) => s);
    const pool = [];
    for (const cs of sameCounty) for (const p of (byCity[cs]?.photos || [])) pool.push(p);
    pool.sort((a, b) => (b.capturedAt || 0) - (a.capturedAt || 0));
    for (const p of pool.slice(0, 12)) note(p, `/areas/${slug} (county-fallback)`);
  }
}

// 2. Combo pages (/areas/[slug]/[service]) — CityPortfolio serviceFilter limit 9
for (const slug of ALL_CITY_SLUGS) {
  const bucket = byCity[slug];
  const tier = evidenceTier(bucket.totalProjects);
  for (const service of SERVICE_PAGES) {
    if (tier === "high" || tier === "medium") {
      const filtered = bucket.photos.filter(p => TAG_TO_SERVICE_SLUG[pickServiceTag(p.tags)] === service);
      const chosen = filtered.length ? filtered.slice(0, 9) : bucket.photos.slice(0, 9); // mixed fallback
      for (const p of chosen) note(p, `/areas/${slug}/${service}`);
    }
    // low/none combo → county fallback identical to city page, already captured
  }
}

// 3. Service pages (/[service]) — ServicePortfolio limit 12 (tag match across cities)
for (const service of SERVICE_PAGES) {
  const tag = SERVICE_SLUG_TO_TAG[service];
  const pool = [];
  for (const slug of ALL_CITY_SLUGS) for (const p of byCity[slug].photos)
    if (Array.isArray(p.tags) && p.tags.includes(tag)) pool.push(p);
  pool.sort((a, b) => (b.capturedAt || 0) - (a.capturedAt || 0));
  for (const p of pool.slice(0, 12)) note(p, `/${service}`);
}

// 4. /projects — entire live gallery
const live = await buildLiveGallery();
for (const p of (live.photos || [])) note({ ...p, source: "live" }, "/projects");

const out = [...registry.values()].sort((a, b) => (b.capturedAt || 0) - (a.capturedAt || 0));
const summary = {
  generatedAt: new Date().toISOString(),
  totalDisplayed: out.length,
  bySource: { inventory: out.filter(p => p.source === "inventory").length, live: out.filter(p => p.source === "live").length },
  liveProjectStatuses: live.projectsMeta ? [...new Set(Object.values(live.projectsMeta).map(p => p.status))] : [],
};
fs.writeFileSync(path.join(__dirname, "displayed-photos.json"), JSON.stringify({ summary, photos: out }, null, 1));
console.log(JSON.stringify(summary, null, 2));
console.log(`wrote audit/displayed-photos.json (${out.length} unique displayed photos)`);
