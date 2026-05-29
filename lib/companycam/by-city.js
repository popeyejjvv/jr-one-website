// CompanyCam moat — per-city data layer.
// Wraps the existing /api/companycam gallery route, regroups photos by canonical city slug,
// and exposes the public API consumed by CityPortfolio + ServicePortfolio.
// Caches at the Next.js fetch layer (revalidate: 3600s) so build + ISR stay fresh without bursting CompanyCam quota.

import "server-only";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "");
const GALLERY_URL = SITE_URL
  ? `${SITE_URL}/api/companycam`
  : process.env.NODE_ENV === "production"
    ? "https://jronegutters.com/api/companycam"
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

function shortDate(iso) {
  if (!iso) return "";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  return d.toLocaleDateString("en-US", { month: "short", year: "numeric" });
}

// Internal: fetch the full gallery from /api/companycam, group by city slug, cache for ISR
async function loadGalleryByCity() {
  // Next.js fetch with revalidate gives us build-time ISR + hourly refresh on production
  const res = await fetch(GALLERY_URL, { next: { revalidate: 3600, tags: ["companycam-gallery"] } });
  if (!res.ok) throw new Error(`CompanyCam gallery fetch failed: ${res.status}`);
  const payload = await res.json();
  const photos = Array.isArray(payload?.photos) ? payload.photos : [];

  const byCity = {};
  for (const slug of ALL_CITY_SLUGS) {
    byCity[slug] = { citySlug: slug, photos: [], projectIds: new Set() };
  }
  byCity["__out_of_area__"] = { citySlug: "__out_of_area__", photos: [], projectIds: new Set() };

  for (const p of photos) {
    const slug = normalizeCity(p.city) || "__out_of_area__";
    byCity[slug].photos.push(p);
    if (p.projectId) byCity[slug].projectIds.add(p.projectId);
  }

  // Sort each city's photos by capturedAt desc + freeze project counts
  for (const slug of Object.keys(byCity)) {
    byCity[slug].photos.sort((a, b) => (b.capturedAt || "").localeCompare(a.capturedAt || ""));
    byCity[slug].totalProjects = byCity[slug].projectIds.size;
    delete byCity[slug].projectIds;
  }

  return byCity;
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
      capturedAt: p.capturedAt,
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

  pool.sort((a, b) => (b.capturedAt || "").localeCompare(a.capturedAt || ""));
  return pool.slice(0, limit);
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

  pool.sort((a, b) => (b.capturedAt || "").localeCompare(a.capturedAt || ""));
  return pool.slice(0, limit);
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
