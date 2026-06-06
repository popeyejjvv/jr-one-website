// CompanyCam moat — per-city data layer.
// Wraps the existing /api/companycam gallery route, regroups photos by canonical city slug,
// and exposes the public API consumed by CityPortfolio + ServicePortfolio.
// Caches at the Next.js fetch layer (revalidate: 3600s) so build + ISR stay fresh without bursting CompanyCam quota.
//
// Phase 1.6 (2026-05-30): merges the live tagged-photo API with the static project inventory
// pulled at audit time. The live API only surfaces photos that carry one of 8 service tag IDs
// (commercial, copper, govee, guards, gutters, siding, soffit, website). Most JR One CompanyCam
// projects are untagged in the field, so the live API undercounts by ~37x (128 photos / 71
// projects on prod vs. 2,615 projects with photos in the audit inventory). The inventory adds
// every untagged project as a single synthetic photo using the project's first_photo_url, so
// HIGH-density cities like Lakeland (24 inventory projects, 2 tagged photos) render real
// per-city evidence instead of collapsing to county fallback. Inventory refresh is a separate
// followup — current data pulled 2026-05-29.

import "server-only";
import inventoryData from "./inventory.json";
import { filterPhotos } from "./photo-filter";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "");
const GALLERY_URL = SITE_URL
  ? `${SITE_URL}/api/companycam`
  : process.env.NODE_ENV === "production"
    ? "https://www.jronegutters.com/api/companycam"
    : "http://localhost:3000/api/companycam";

// CompanyCam's address.city field comes back free-form ("Tampa", "St Petersburg", "South Tampa", etc.)
// Map every variant we've seen in audit/companycam-inventory.json to the canonical city slug used by
// app/areas/[slug]/page.jsx. Neighborhoods inside a parent city (South Tampa, Carrollwood, etc.) roll up.
const CITY_NORMALIZER = {
  // Hillsborough
  "tampa": "tampa",
  "south tampa": "tampa",
  "carrollwood": "tampa",
  "westchase": "tampa",
  "town n country": "tampa",
  "town 'n' country": "tampa",
  "new tampa": "new-tampa",
  "brandon": "brandon",
  "riverview": "riverview",
  "ruskin": "ruskin",
  "sun city center": "sun-city-center",
  "sun city": "sun-city-center",
  "temple terrace": "temple-terrace",
  "plant city": "plant-city",
  "lutz": "lutz",
  "valrico": "valrico",
  "lithia": "lithia",
  // Pinellas
  "clearwater": "clearwater",
  "st petersburg": "st-petersburg",
  "st. petersburg": "st-petersburg",
  "saint petersburg": "st-petersburg",
  "st pete": "st-petersburg",
  "palm harbor": "palm-harbor",
  "largo": "largo",
  "tarpon springs": "tarpon-springs",
  "dunedin": "dunedin",
  "oldsmar": "oldsmar",
  "safety harbor": "safety-harbor",
  "seminole": "seminole",
  "pinellas park": "pinellas-park",
  // Pasco
  "wesley chapel": "wesley-chapel",
  "land o' lakes": "land-o-lakes",
  "land o lakes": "land-o-lakes",
  "land-o-lakes": "land-o-lakes",
  "new port richey": "new-port-richey",
  // Hernando
  "spring hill": "spring-hill",
  // Manatee
  "bradenton": "bradenton",
  // Polk
  "lakeland": "lakeland",
  // Sarasota
  "sarasota": "sarasota",
};

const ALL_CITY_SLUGS = Array.from(new Set(Object.values(CITY_NORMALIZER)));

// City -> county for the regional-fallback path on low-evidence cities
const CITY_COUNTY = {
  tampa: "Hillsborough", "new-tampa": "Hillsborough", brandon: "Hillsborough",
  riverview: "Hillsborough", ruskin: "Hillsborough", "sun-city-center": "Hillsborough",
  "temple-terrace": "Hillsborough", "plant-city": "Hillsborough", lutz: "Hillsborough",
  valrico: "Hillsborough", lithia: "Hillsborough",
  clearwater: "Pinellas", "st-petersburg": "Pinellas", "palm-harbor": "Pinellas",
  largo: "Pinellas", "tarpon-springs": "Pinellas", dunedin: "Pinellas",
  oldsmar: "Pinellas", "safety-harbor": "Pinellas", seminole: "Pinellas",
  "pinellas-park": "Pinellas",
  "wesley-chapel": "Pasco", "land-o-lakes": "Pasco", "new-port-richey": "Pasco",
  "spring-hill": "Hernando",
  bradenton: "Manatee",
  lakeland: "Polk",
  sarasota: "Sarasota",
};

// CompanyCam tag IDs -> human-readable service labels. Mirrors the TAGS map in app/api/companycam/route.js.
// Used to derive a per-photo service_label for alt text + structured-data name.
const SERVICE_LABELS = {
  commercial: "Commercial gutter system",
  copper: "Copper gutter",
  govee: "Govee permanent LED lighting",
  guards: "Gutter guard",
  gutters: "Seamless aluminum gutter",
  siding: "Siding",
  soffit: "Soffit and fascia",
  website: "Featured project",
};

// Map: cleaned-up service tag -> the service slug used by /areas/{city}/{service} routes.
// Used to filter photos by service for combo pages.
const TAG_TO_SERVICE_SLUG = {
  commercial: "commercial-gutters",
  copper: "copper-gutters",
  govee: "govee-lights",
  guards: "gutter-guards",
  gutters: "seamless-aluminum-gutters",
  siding: "siding",
  soffit: "soffit-and-fascia",
};

function normalizeCity(rawCity) {
  if (!rawCity) return null;
  const cleaned = rawCity.toLowerCase().trim().replace(/[,.]+$/g, "");
  return CITY_NORMALIZER[cleaned] || null;
}

function pickServiceTag(tags) {
  if (!tags || tags.length === 0) return "gutters";
  // Prefer specific service tags over "website" (featured) tag for alt text accuracy
  const ranked = ["copper", "commercial", "guards", "soffit", "siding", "govee", "gutters", "website"];
  for (const candidate of ranked) {
    if (tags.includes(candidate)) return candidate;
  }
  return "gutters";
}

// CompanyCam v2 captured_at is Unix epoch seconds (integer). Convert to a JS Date
// by multiplying by 1000 when the value is numeric. ISO strings are passed through.
function toDate(raw) {
  if (raw == null) return null;
  if (typeof raw === "number") return new Date(raw * 1000);
  const d = new Date(raw);
  return Number.isNaN(d.getTime()) ? null : d;
}

function shortDate(raw) {
  const d = toDate(raw);
  if (!d) return "";
  return d.toLocaleDateString("en-US", { month: "short", year: "numeric" });
}

function isoDate(raw) {
  const d = toDate(raw);
  return d ? d.toISOString() : null;
}

// Pre-index the static inventory by canonical city slug at module load. The inventory's
// city_slug field already matches our 28-city taxonomy (out-of-area projects are filtered
// out at trim time), so no further normalization is needed here.
const INVENTORY_BY_CITY_SLUG = (() => {
  const idx = new Map();
  const projects = Array.isArray(inventoryData?.projects) ? inventoryData.projects : [];
  for (const p of projects) {
    if (!p.city_slug || !p.first_photo_url) continue;
    if (!idx.has(p.city_slug)) idx.set(p.city_slug, []);
    idx.get(p.city_slug).push(p);
  }
  return idx;
})();

// Convert an inventory project to a synthetic photo in the same shape loadGalleryByCity
// produces from the live API. capturedAt is normalized to unix epoch seconds (number) so
// the descending-sort comparator in finalizeByCity stays consistent across both sources.
function synthesizeInventoryPhoto(p) {
  const capturedSec = p.created_at
    ? Math.floor(new Date(p.created_at).getTime() / 1000)
    : 0;
  return {
    id: `inv-${p.project_id}`,
    projectId: p.project_id,
    projectName: p.name || "",
    city: p.city_official || "",
    web: p.first_photo_url,
    original: p.first_photo_url,
    thumbnail: p.first_photo_url,
    capturedAt: capturedSec || null,
    tags: ["gutters"], // default to seamless gutter service since inventory is untagged
  };
}

// Finalize the per-city buckets: run the quality gate (PII / unprofessional / internal
// photos are dropped here -- the single server-side chokepoint every render path funnels
// through), then sort by capturedAt desc and freeze totalProjects from the union.
// totalProjects is recomputed from the SURVIVING photos so evidence-density tiers + the
// "{count} JR One jobs" captions never count a photo that was filtered out.
function finalizeByCity(byCity) {
  for (const slug of Object.keys(byCity)) {
    byCity[slug].photos = filterPhotos(byCity[slug].photos, { page: `areas/${slug}` });
    const survivingProjectIds = new Set(
      byCity[slug].photos.map((p) => p.projectId).filter(Boolean),
    );
    byCity[slug].photos.sort((a, b) => (b.capturedAt || 0) - (a.capturedAt || 0));
    byCity[slug].totalProjects = survivingProjectIds.size;
    delete byCity[slug].projectIds;
  }
  return byCity;
}

// Build the per-city buckets seeded entirely from the static inventory. This is the floor —
// it works even when CompanyCam is unreachable, so 502/timeout no longer collapses the
// portfolio to empty. The live tagged-photo API stacks on top of this seed.
function seedByCityFromInventory() {
  const byCity = {};
  for (const slug of ALL_CITY_SLUGS) {
    byCity[slug] = { citySlug: slug, photos: [], projectIds: new Set() };
  }
  byCity["__out_of_area__"] = { citySlug: "__out_of_area__", photos: [], projectIds: new Set() };

  for (const [slug, projects] of INVENTORY_BY_CITY_SLUG) {
    if (!byCity[slug]) continue;
    for (const p of projects) {
      byCity[slug].photos.push(synthesizeInventoryPhoto(p));
      byCity[slug].projectIds.add(p.project_id);
    }
  }
  return byCity;
}

// Internal: build the full gallery as a merge of (a) the static project inventory seeded at
// module load and (b) the live tagged-photo /api/companycam pull. The live pull is cached at
// the Next.js fetch layer (revalidate 3600s). When the live pull fails (502/timeout/parse error)
// we fall through with the inventory base only — that's still ~2,400 photos vs the prior
// empty-gallery zero. companycam-presence (Phase 2 check) continues to gate downstream quality.
async function loadGalleryByCity() {
  const byCity = seedByCityFromInventory();

  let res;
  try {
    res = await fetch(GALLERY_URL, { next: { revalidate: 3600, tags: ["companycam-gallery"] } });
  } catch (err) {
    console.warn(`[companycam] fetch threw: ${err?.message || err} — using inventory-only gallery`);
    return finalizeByCity(byCity);
  }
  if (!res.ok) {
    console.warn(`[companycam] gallery fetch failed status=${res.status} — using inventory-only gallery`);
    return finalizeByCity(byCity);
  }
  let payload;
  try {
    payload = await res.json();
  } catch (err) {
    console.warn(`[companycam] gallery JSON parse failed: ${err?.message || err} — using inventory-only gallery`);
    return finalizeByCity(byCity);
  }
  const photos = Array.isArray(payload?.photos) ? payload.photos : [];

  for (const p of photos) {
    const slug = normalizeCity(p.city) || "__out_of_area__";
    if (!byCity[slug]) continue;
    byCity[slug].photos.push(p);
    if (p.projectId) byCity[slug].projectIds.add(p.projectId);
  }

  return finalizeByCity(byCity);
}

// PUBLIC API

/**
 * Get up to `limit` photos for a city, newest first, with derived fields:
 *   serviceTag, serviceLabel, serviceSlug, altText, captionDate
 * @param {string} citySlug — must match a slug in CITY_NORMALIZER values
 * @param {object} opts — { limit?: number, serviceFilter?: string }
 */
export async function getJobsByCity(citySlug, opts = {}) {
  const { limit = 12, serviceFilter } = opts;
  const byCity = await loadGalleryByCity();
  const cityBucket = byCity[citySlug];
  if (!cityBucket) return [];

  let pool = cityBucket.photos;
  if (serviceFilter) {
    pool = pool.filter((p) => {
      const tag = pickServiceTag(p.tags);
      return TAG_TO_SERVICE_SLUG[tag] === serviceFilter;
    });
  }

  const cityNameDisplay = citySlug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");

  return pool.slice(0, limit).map((p) => {
    const serviceTag = pickServiceTag(p.tags);
    const serviceLabel = SERVICE_LABELS[serviceTag] || "Gutter";
    const captionDate = shortDate(p.capturedAt);
    return {
      id: p.id,
      projectId: p.projectId,
      projectName: p.projectName,
      cityNameDisplay,
      web: p.web,
      thumbnail: p.thumbnail,
      original: p.original,
      capturedAt: isoDate(p.capturedAt),
      captionDate,
      serviceTag,
      serviceLabel,
      serviceSlug: TAG_TO_SERVICE_SLUG[serviceTag] || null,
      altText: `${serviceLabel} install in ${cityNameDisplay}, FL — ${captionDate}`.replace(/—\s*$/, "").trim(),
    };
  });
}

/**
 * Per-city evidence density tier for the build-queue + portfolio fallback decision.
 * Tiers match the audit:
 *   high   >= 10 projects (use real per-city portfolio)
 *   medium 5-9 projects   (use real portfolio but flag thin set in caption)
 *   low    1-4 projects   (regional fallback — county-level photo pool labeled honestly)
 *   none   0 projects     (regional fallback only; do not claim city-specific work)
 */
export async function getCityEvidenceDensity(citySlug) {
  const byCity = await loadGalleryByCity();
  const bucket = byCity[citySlug];
  const count = bucket?.totalProjects || 0;
  const photoCount = bucket?.photos.length || 0;
  let tier;
  if (count >= 10) tier = "high";
  else if (count >= 5) tier = "medium";
  else if (count >= 1) tier = "low";
  else tier = "none";
  return { count, photoCount, tier, county: CITY_COUNTY[citySlug] || null };
}

/**
 * Regional-fallback photos for LOW/NONE-density cities: pull from the county's other-city pool
 * (e.g., Tarpon Springs in Pinellas falls back to a curated set across Pinellas — Largo, Seminole,
 * Pinellas Park). Photos are labeled "Recent Pinellas County work" in the consuming component.
 */
export async function getCountyFallbackJobs(county, opts = {}) {
  const { limit = 12 } = opts;
  if (!county) return [];
  const byCity = await loadGalleryByCity();
  const sameCounty = Object.entries(CITY_COUNTY)
    .filter(([, c]) => c === county)
    .map(([slug]) => slug);

  const pool = [];
  for (const slug of sameCounty) {
    const bucket = byCity[slug];
    if (!bucket) continue;
    for (const p of bucket.photos) {
      const serviceTag = pickServiceTag(p.tags);
      pool.push({
        ...p,
        serviceTag,
        serviceLabel: SERVICE_LABELS[serviceTag] || "Gutter",
        captionDate: shortDate(p.capturedAt),
        countyDisplay: county,
        altText: `${SERVICE_LABELS[serviceTag] || "Gutter"} install in ${county} County, FL — ${shortDate(p.capturedAt)}`.replace(/—\s*$/, "").trim(),
      });
    }
  }

  pool.sort((a, b) => (b.capturedAt || 0) - (a.capturedAt || 0));
  return pool.slice(0, limit).map((p) => ({ ...p, capturedAt: isoDate(p.capturedAt) }));
}

/**
 * Convenience: returns the canonical 28-city slug list for static-params generation
 */
export function getAllCitySlugs() {
  return [...ALL_CITY_SLUGS];
}

/**
 * Cross-city service portfolio for the 11 top-level service pages
 * (/seamless-aluminum-gutters, /copper-gutters, /soffit-and-fascia, etc.).
 *
 * Returns up to `limit` photos for a given service, drawn from every city in the
 * service area, newest first. Skips the __out_of_area__ bucket. Each photo carries
 * cityNameDisplay so the consuming component can label location honestly.
 *
 * @param {string} serviceSlug — must match a value in TAG_TO_SERVICE_SLUG (e.g. "copper-gutters")
 * @param {object} opts — { limit?: number }
 */
// Reverse map: service-slug -> CompanyCam tag name. Built once at module load.
const SERVICE_SLUG_TO_TAG = Object.entries(TAG_TO_SERVICE_SLUG).reduce(
  (acc, [tag, slug]) => ({ ...acc, [slug]: tag }),
  {},
);

export async function getJobsByService(serviceSlug, opts = {}) {
  const { limit = 12 } = opts;
  if (!serviceSlug) return [];
  const serviceTag = SERVICE_SLUG_TO_TAG[serviceSlug];
  if (!serviceTag) return [];
  const byCity = await loadGalleryByCity();

  const pool = [];
  for (const slug of ALL_CITY_SLUGS) {
    const bucket = byCity[slug];
    if (!bucket) continue;
    const cityNameDisplay = slug
      .split("-")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ");
    for (const p of bucket.photos) {
      if (!Array.isArray(p.tags) || !p.tags.includes(serviceTag)) continue;
      const serviceLabel = SERVICE_LABELS[serviceTag] || "Gutter";
      const captionDate = shortDate(p.capturedAt);
      pool.push({
        id: p.id,
        projectId: p.projectId,
        projectName: p.projectName,
        cityNameDisplay,
        citySlug: slug,
        web: p.web,
        thumbnail: p.thumbnail,
        original: p.original,
        capturedAt: p.capturedAt,
        captionDate,
        serviceTag,
        serviceLabel,
        serviceSlug,
        altText: `${serviceLabel} install in ${cityNameDisplay}, FL — ${captionDate}`.replace(/—\s*$/, "").trim(),
      });
    }
  }

  pool.sort((a, b) => (b.capturedAt || 0) - (a.capturedAt || 0));
  return pool.slice(0, limit).map((p) => ({ ...p, capturedAt: isoDate(p.capturedAt) }));
}

/**
 * Service-level evidence count (used by ServicePortfolio to gate render and
 * compose the "X JR One {service} installs across Tampa Bay since 2022" caption).
 */
export async function getServiceEvidenceDensity(serviceSlug) {
  const serviceTag = SERVICE_SLUG_TO_TAG[serviceSlug];
  if (!serviceTag) return { count: 0, tier: "none" };
  const byCity = await loadGalleryByCity();
  let count = 0;
  for (const slug of ALL_CITY_SLUGS) {
    const bucket = byCity[slug];
    if (!bucket) continue;
    for (const p of bucket.photos) {
      if (Array.isArray(p.tags) && p.tags.includes(serviceTag)) count += 1;
    }
  }
  return { count, tier: count >= 25 ? "high" : count >= 10 ? "medium" : count >= 1 ? "low" : "none" };
}
