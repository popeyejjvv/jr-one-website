import { filterPhotos } from "../../../lib/companycam/photo-filter";

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

async function fetchPhotosForTag(tagId, tagName) {
  const photos = [];
  let page = 1;
  while (true) {
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
  // Fetch in parallel, batches of 10
  const ids = [...projectIds];
  for (let i = 0; i < ids.length; i += 10) {
    const batch = ids.slice(i, i + 10);
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

  const allPhotos = [...photoMap.values()];

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

  // Quality gate: drop PII / unprofessional / internal photos before they ever leave the
  // server. Same shared filter the SSG pages use (lib/companycam/photo-filter.js).
  const safePhotos = filterPhotos(allPhotos, { page: "projects-gallery" });

  // Sort by most recent first
  safePhotos.sort((a, b) => (b.capturedAt || 0) - (a.capturedAt || 0));

  const safeProjectIds = new Set(safePhotos.map((p) => p.projectId).filter(Boolean));

  return {
    photos: safePhotos,
    tagLabels: TAG_LABELS,
    totalPhotos: safePhotos.length,
    totalProjects: safeProjectIds.size,
    fetchedAt: new Date().toISOString(),
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
    return Response.json({ error: "Failed to fetch from CompanyCam" }, { status: 502 });
  }
}
