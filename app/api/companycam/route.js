import { filterPhotos, dropBlockedIds } from "../../../lib/companycam/photo-filter";
import { selectPerProject, interleaveByProject } from "../../../lib/companycam/photo-select";
// Curated manifest: every Complete-labeled project in CompanyCam, photo-select rules
// applied, every photo vision-reviewed (2026-07-16 full-catalog audit). This is the
// gallery's BASE layer -- the live fetch below only tops it up with photos newer than
// the manifest. Rebuild with: node audit/build_manifest.mjs (see audit/ pipeline).
import curated from "../../../lib/companycam/curated-gallery.json";

const COMPANYCAM_TOKEN = process.env.COMPANYCAM_TOKEN;
const API = "https://api.companycam.com/v2";

const TAGS = {
  commercial: "25122393",
  copper:     "25122394",
  govee:      "25123008",
  guards:     "25122391",
  gutters:    "25122389",
  siding:     "25122618",
  soffit:     "25122390",
  website:    "25122395",
};

// Display-friendly labels for filter tabs
const TAG_LABELS = {
  commercial: "Commercial",
  copper:     "Copper Gutters",
  govee:      "Govee Lights",
  guards:     "Gutter Guards",
  gutters:    "Gutters",
  siding:     "Siding",
  soffit:     "Soffit & Fascia",
  website:    "Featured",
};

// In-memory cache: { data, timestamp }
let cache = null;
const CACHE_TTL = 60 * 60 * 1000; // 1 hour

async function ccFetch(path) {
  const res = await fetch(`${API}${path}`, {
    headers: { Authorization: `Bearer ${COMPANYCAM_TOKEN}` },
  });
  if (!res.ok) throw new Error(`CompanyCam ${res.status}: ${path}`);
  return res.json();
}

// CompanyCam returns photos newest-first. The gallery only ever displays a curated
// subset, so cap pagination at the newest few pages per tag. Without this cap the
// route walks EVERY tagged photo; after the 2026-07-15 tag backfill (46K tagged
// photos vs ~150 before) the unbounded walk blew past serverless timeouts and killed
// site builds via the by-city build-time fetch.
const MAX_PAGES_PER_TAG = 3;

async function fetchPhotosForTag(tagId, tagName) {
  const photos = [];
  let page = 1;
  while (page <= MAX_PAGES_PER_TAG) {
    const batch = await ccFetch(`/photos?tag_ids[]=${tagId}&per_page=50&page=${page}`);
    if (!batch.length) break;
    for (const p of batch) {
      photos.push({
        id: p.id,
        projectId: p.project_id,
        companyId: p.company_id,
        tag: tagName,
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
  // Fetch in parallel, batches of 30. With the tag backfill the gallery now
  // spans ~350+ unique projects; sequential batches of 10 took ~35s cold
  // (measured 39.7s total endpoint time on 2026-07-15). Batches of 30 keep
  // the endpoint under ~10s cold without tripping CompanyCam rate limits.
  const ids = [...projectIds];
  for (let i = 0; i < ids.length; i += 30) {
    const batch = ids.slice(i, i + 30);
    const results = await Promise.all(
      batch.map(id => ccFetch(`/projects/${id}`).catch(() => null))
    );
    for (const p of results) {
      if (!p) continue;
      projects[p.id] = {
        id: p.id,
        name: p.name,
        city: p.address?.city || "",
        state: p.address?.state || "",
      };
    }
  }
  return projects;
}

// PUBLISHING LAW (Popeye, 2026-07-15): the website may ONLY show photos from projects
// labeled Complete. Bid / In Progress / Active / etc. are estimates or unfinished work -
// houses we may never have worked on. Fail closed: a project whose labels cannot be
// fetched is treated as NOT complete and its photos are dropped.
const REQUIRED_PROJECT_LABEL = "complete";
// Per-project SELECTION (which of a Complete project's photos qualify) lives in
// lib/companycam/photo-select.js: last-day window + 30-min min gap + cap 8.

async function fetchProjectLabels(projectIds) {
  const labels = {};
  const ids = [...projectIds];
  for (let i = 0; i < ids.length; i += 30) {
    const batch = ids.slice(i, i + 30);
    const results = await Promise.all(
      batch.map(id =>
        ccFetch(`/projects/${id}/labels`)
          .then(ls => ({ id, values: (ls || []).map(l => (l.value || "").toLowerCase()) }))
          .catch(() => ({ id, values: null })) // null = unknown = fail closed
      )
    );
    for (const r of results) labels[r.id] = r.values;
  }
  return labels;
}

async function buildGallery() {
  // Fetch photos for all tags in parallel
  const tagEntries = Object.entries(TAGS);
  const allPhotoArrays = await Promise.all(
    tagEntries.map(([name, id]) => fetchPhotosForTag(id, name))
  );

  // Deduplicate by photo ID, keep all tags per photo
  const photoMap = new Map();
  for (const photos of allPhotoArrays) {
    for (const p of photos) {
      if (photoMap.has(p.id)) {
        const existing = photoMap.get(p.id);
        if (!existing.tags.includes(p.tag)) existing.tags.push(p.tag);
      } else {
        photoMap.set(p.id, { ...p, tags: [p.tag] });
      }
    }
  }

  let allPhotos = [...photoMap.values()];

  // Complete-label gate (fail closed).
  const allProjectIds = new Set(allPhotos.map(p => p.projectId));
  const projectLabels = await fetchProjectLabels(allProjectIds);
  allPhotos = allPhotos.filter(p => {
    const values = projectLabels[p.projectId];
    return Array.isArray(values) && values.includes(REQUIRED_PROJECT_LABEL);
  });
  // Drop vision-audit-blocked ids BEFORE selection so a blocked photo never
  // consumes a slot -- the project's next-best same-day photo is chosen instead.
  allPhotos = dropBlockedIds(allPhotos);
  // Per-project selection: last-day window (drop quote/before-visit photos),
  // 30-min minimum gap (drop near-duplicate bursts of the same area), cap 8.
  allPhotos = selectPerProject(allPhotos);

  // Fetch project details for all unique project IDs
  const projectIds = new Set(allPhotos.map(p => p.projectId));
  const projects = await fetchProjectDetails(projectIds);

  // Attach project info to each photo
  for (const photo of allPhotos) {
    const proj = projects[photo.projectId];
    if (proj) {
      photo.projectName = proj.name;
      photo.city = proj.city;
      photo.state = proj.state;
    }
    delete photo.tag; // we use tags[] now
  }

  // Merge: curated manifest is the base, live photos top it up (live wins on id clash
  // so freshly re-fetched URLs/details take precedence).
  const byId = new Map();
  for (const p of curated.photos || []) byId.set(String(p.id), p);
  for (const p of allPhotos) byId.set(String(p.id), p);

  // Quality gate: drop PII / unprofessional / internal photos before they ever leave the
  // server. Same shared filter the SSG pages use (lib/companycam/photo-filter.js).
  const safePhotos = filterPhotos([...byId.values()], { page: "projects-gallery" });

  // Display order: round-robin across projects (each ranked by newest photo) so one
  // job never renders as a wall of consecutive near-identical tiles.
  const displayPhotos = interleaveByProject(safePhotos);

  const safeProjectIds = new Set(displayPhotos.map((p) => p.projectId).filter(Boolean));

  return {
    photos: displayPhotos,
    tagLabels: TAG_LABELS,
    totalPhotos: displayPhotos.length,
    totalProjects: safeProjectIds.size,
    fetchedAt: new Date().toISOString(),
  };
}

// Manifest-only gallery: served when the live CompanyCam fetch fails. The manifest is
// pre-vetted, so this degrades to a full (slightly stale) gallery instead of a 502.
function manifestOnlyGallery() {
  const safePhotos = filterPhotos(curated.photos || [], { page: "projects-gallery", log: false });
  const displayPhotos = interleaveByProject(safePhotos);
  return {
    photos: displayPhotos,
    tagLabels: TAG_LABELS,
    totalPhotos: displayPhotos.length,
    totalProjects: new Set(displayPhotos.map((p) => p.projectId).filter(Boolean)).size,
    fetchedAt: new Date().toISOString(),
    degraded: "manifest-only (live CompanyCam fetch unavailable)",
  };
}

export async function GET() {
  if (!COMPANYCAM_TOKEN) {
    return Response.json({ error: "COMPANYCAM_TOKEN not configured" }, { status: 500 });
  }

  // Return cached if fresh
  if (cache && Date.now() - cache.timestamp < CACHE_TTL) {
    return Response.json(cache.data, {
      headers: { "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=600" },
    });
  }

  try {
    const data = await buildGallery();
    cache = { data, timestamp: Date.now() };
    return Response.json(data, {
      headers: { "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=600" },
    });
  } catch (err) {
    console.error("CompanyCam API error:", err);
    // Return stale cache if available
    if (cache) {
      return Response.json(cache.data, {
        headers: { "Cache-Control": "public, s-maxage=60" },
      });
    }
    // No cache -> degrade to the pre-vetted manifest instead of a 502.
    return Response.json(manifestOnlyGallery(), {
      headers: { "Cache-Control": "public, s-maxage=300" },
    });
  }
}
