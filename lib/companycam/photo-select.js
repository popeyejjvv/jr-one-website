// photo-select.js -- deterministic per-project photo SELECTION rules for every
// customer-facing CompanyCam surface (the /projects gallery and the by-city SSG pages).
//
// WHY THIS EXISTS (operator directive, 2026-07-16):
// After the 2026-07-15 tag backfill the gallery started showing bursts of near-identical
// photos: crews shoot the same corner 3-6 times in a row, and "newest 8 per project"
// happily selects all of them. Popeye's structure for a CompanyCam project timeline:
//   first photos  = initial quote/estimate visit
//   middle photos = morning arrival, before any work
//   last photos   = the finished work
// So selection encodes three rules, applied per project AFTER the Complete-label gate:
//   1. LAST-DAY WINDOW: only photos captured within LAST_DAY_WINDOW_HRS of that
//      project's newest photo qualify. Everything earlier is quote/before material.
//   2. MIN TIME GAP: walking newest-first, a photo is skipped if it was captured
//      within MIN_GAP_MINUTES of an already-selected photo. Photos seconds/minutes
//      apart are near-duplicates of the same area.
//   3. CAP: at most MAX_PER_PROJECT photos per project (publishing law, 2026-07-15:
//      Complete-labeled projects, newest <= 8).
// Plus a display rule:
//   4. INTERLEAVE: the final gallery order round-robins across projects (each ordered
//      by its newest photo) so one job never renders as a wall of consecutive tiles.
//
// This module is selection/ordering only. Safety filtering (PII, markup, blocked ids)
// stays in photo-filter.js; image-CONTENT quality (upside-down, damage shots, junk)
// is the vision audit's job via blocked_photo_ids in photo-filter-config.json.
// Plain ASCII only.

export const SELECT_DEFAULTS = {
  lastDayWindowHrs: 24,
  minGapMinutes: 30,
  maxPerProject: 8,
};

function toEpochSeconds(v) {
  if (v == null) return 0;
  if (typeof v === "number") return v;
  const t = Date.parse(v);
  return Number.isFinite(t) ? Math.floor(t / 1000) : 0;
}

/**
 * Select display-worthy photos from ONE project's photos.
 * Returns a newest-first array obeying last-day window, min gap, and cap.
 */
export function selectProjectPhotos(photos, opts = {}) {
  const { lastDayWindowHrs, minGapMinutes, maxPerProject } = { ...SELECT_DEFAULTS, ...opts };
  const sorted = [...(photos || [])].sort(
    (a, b) => toEpochSeconds(b.capturedAt) - toEpochSeconds(a.capturedAt)
  );
  if (!sorted.length) return [];

  const newest = toEpochSeconds(sorted[0].capturedAt);
  const windowFloor = newest - lastDayWindowHrs * 3600;
  const minGapSec = minGapMinutes * 60;

  const selected = [];
  for (const p of sorted) {
    if (selected.length >= maxPerProject) break;
    const t = toEpochSeconds(p.capturedAt);
    // Photos with no timestamp can't be placed in the timeline -- skip them rather
    // than risk selecting a quote-visit shot (fail closed, matches the label gate).
    if (!t) continue;
    if (t < windowFloor) break; // sorted desc: everything after is older still
    const tooClose = selected.some((s) => Math.abs(toEpochSeconds(s.capturedAt) - t) < minGapSec);
    if (tooClose) continue;
    selected.push(p);
  }
  return selected;
}

/**
 * Group photos by projectId, run selectProjectPhotos on each group.
 * Photos without a projectId pass through untouched (inventory-source photos are
 * already curated one-offs). Returns a flat array (no particular order).
 */
export function selectPerProject(photos, opts = {}) {
  const byProject = new Map();
  const noProject = [];
  for (const p of photos || []) {
    if (!p.projectId) { noProject.push(p); continue; }
    if (!byProject.has(p.projectId)) byProject.set(p.projectId, []);
    byProject.get(p.projectId).push(p);
  }
  const out = [...noProject];
  for (const group of byProject.values()) out.push(...selectProjectPhotos(group, opts));
  return out;
}

/**
 * Order photos for display: projects ranked by their newest photo, then round-robin
 * one photo per project so consecutive tiles never come from the same job.
 * Photos without a projectId are treated as single-photo projects.
 */
export function interleaveByProject(photos) {
  const byProject = new Map();
  for (const p of photos || []) {
    const key = p.projectId || `solo-${p.id}`;
    if (!byProject.has(key)) byProject.set(key, []);
    byProject.get(key).push(p);
  }
  const groups = [...byProject.values()].map((g) =>
    g.sort((a, b) => toEpochSeconds(b.capturedAt) - toEpochSeconds(a.capturedAt))
  );
  // Rank projects by recency of their newest photo.
  groups.sort((a, b) => toEpochSeconds(b[0].capturedAt) - toEpochSeconds(a[0].capturedAt));

  const out = [];
  let added = true;
  for (let round = 0; added; round++) {
    added = false;
    for (const g of groups) {
      if (round < g.length) {
        out.push(g[round]);
        added = true;
      }
    }
  }
  return out;
}
