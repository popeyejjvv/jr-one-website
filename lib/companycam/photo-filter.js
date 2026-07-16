// photo-filter.js -- the permanent CompanyCam photo quality gate.
//
// WHY THIS EXISTS:
// The JR One site pulls real jobsite photos from CompanyCam for every city/service page.
// CompanyCam stores EVERYTHING a crew shoots: finished work, but also work orders with
// customer names/phones/addresses, aerial measurement screenshots with drawn markup, bid
// photos, pre-work damage, and accidental captures. None of that belongs on a public site.
// This module is the single server-side gate every photo passes through before it can be
// displayed. It is imported by BOTH consumers:
//   - lib/companycam/by-city.js  (SSG/ISR city + service pages, inventory + live merge)
//   - app/api/companycam/route.js (the /projects gallery, live tagged photos)
//
// THREE LAYERS, checked in order:
//   1. Manual override (photo-filter-config.json): blocked_photo_ids win over everything;
//      approved_photo_ids bypass the automated heuristics (still subject to the block list).
//   2. Project-status gate: only "active"/"completed" CompanyCam projects (defensive --
//      JR One's account currently reports every project as "active", but if a bid/lost/
//      cancelled status ever appears it is dropped).
//   3. Name heuristic: drop projects whose name signals non-customer-facing content
//      (bid/estimate/measure/inspection/screenshot/internal/test/sample/template).
//      NOTE: a GC or roofing-company name (Neal Roofing, Classic Construction, "X GC") is
//      NOT a block signal -- JR One does real subcontract work for those builders and the
//      GC name is never shown to site visitors (alt text is generated from service + city).
//
// The image-content checks (PII text, drawn markup, accidental shots) CANNOT be done from
// metadata -- they require a human/vision review. Those verdicts live in blocked_photo_ids
// in photo-filter-config.json, populated by the audit pipeline in audit/. The heuristics
// here are the always-on net that catches future mis-tagged projects between audits.
//
// Plain ASCII only.

import fs from "node:fs";
import path from "node:path";
import config from "./photo-filter-config.json";

const BLOCKED = new Set((config.blocked_photo_ids || []).map(String));
const APPROVED = new Set((config.approved_photo_ids || []).map(String));

// JR One's own CompanyCam company id. Photos created by ANY other company (a collaborator on a
// shared project) are never JR One's own work and must not appear on the site (operator directive
// 2026-06-19). Configurable via photo-filter-config.json "owner_company_id".
const OWNER_COMPANY_ID = String(config.owner_company_id || "834482");

// Project statuses CompanyCam may report. Only these render. Anything else (bid, estimate,
// pending, lost, cancelled, archived) is dropped. null/undefined status passes (the inventory
// source carries no status; it is gated by name heuristic + the blocked list instead).
const ALLOWED_STATUSES = new Set(["active", "completed", "complete"]);

// Project-name tokens that mark non-customer-facing content. Whole-word, case-insensitive.
const NAME_BLOCK = /\b(bid|estimate|quote|inspection|measure|measurements?|markup|screenshot|internal|office\s*use|do\s*not\s*use|test|testing|sample|samples|template|example|examples|demo|warranty\s*claim|punch\s*list|punchlist)\b/i;

// best-effort dedup so the same blocked photo is not logged repeatedly within one process
const _loggedThisProcess = new Set();
// Append-only newline-delimited JSON log. Append (not read-modify-write) is safe under the
// Next build's PARALLEL render workers -- a shared .json object file gets corrupted by
// concurrent writes; independent appended lines do not. Each line is one block event.
// Read it with: cat data/photo-filter-log.jsonl | jq -s 'unique_by(.photo_id)'
const LOG_PATH = path.join(process.cwd(), "data", "photo-filter-log.jsonl");

function recordBlock(photo, reason, page) {
  const id = String(photo.id);
  if (_loggedThisProcess.has(id)) return;
  _loggedThisProcess.add(id);
  // Best-effort. Fails silently on read-only runtimes (Vercel serverless); the build-time
  // SSG pass is where this log is actually written and committed.
  try {
    fs.mkdirSync(path.dirname(LOG_PATH), { recursive: true });
    const entry = {
      photo_id: id,
      source_project: photo.projectName || photo.projectId || null,
      project_id: photo.projectId || null,
      block_reason: reason,
      page_it_would_have_appeared_on: page || null,
      timestamp: new Date().toISOString(),
    };
    fs.appendFileSync(LOG_PATH, JSON.stringify(entry) + "\n");
  } catch (_e) {
    // no-op: logging is best-effort, never block rendering on a log failure
  }
}

/**
 * Decide whether a single photo is safe to display.
 * @param {object} photo  -- { id, projectId, projectName, projectStatus?, tags? }
 * @returns {{safe:boolean, reason:string}}
 */
export function classifyPhoto(photo) {
  const id = String(photo.id);

  // Layer 1: manual block always wins
  if (BLOCKED.has(id)) return { safe: false, reason: "manual-block (audited unsafe)" };
  // Layer 1: manual approve bypasses heuristics (but not the block list above)
  if (APPROVED.has(id)) return { safe: true, reason: "manual-approve" };

  // Layer 1.5: collaboration gate. A photo whose company_id differs from JR One's belongs to a
  // collaborating company on a shared project and is never shown as JR One's work. No-op when
  // companyId is absent (the inventory source carries none; other layers gate those photos).
  if (photo.companyId && String(photo.companyId) !== OWNER_COMPANY_ID) {
    return { safe: false, reason: `collaboration: other-company photo (company ${photo.companyId})` };
  }

  // Layer 2: project status gate (only when a status is present)
  const status = (photo.projectStatus || "").toString().toLowerCase().trim();
  if (status && !ALLOWED_STATUSES.has(status)) {
    return { safe: false, reason: `non-display status: ${status}` };
  }

  // Layer 3: name heuristic
  const name = (photo.projectName || "").toString();
  if (name && NAME_BLOCK.test(name)) {
    return { safe: false, reason: `name signals non-customer-facing: "${name}"` };
  }

  return { safe: true, reason: "passed" };
}

/**
 * Filter an array of photos, logging every block. Returns only the safe photos.
 * @param {Array} photos
 * @param {object} opts -- { page?:string, log?:boolean (default true) }
 */
export function filterPhotos(photos, opts = {}) {
  const { page = null, log = true } = opts;
  const kept = [];
  for (const p of photos || []) {
    const v = classifyPhoto(p);
    if (v.safe) {
      kept.push(p);
    } else if (log) {
      recordBlock(p, v.reason, page);
    }
  }
  return kept;
}

/**
 * Drop manually-blocked photo ids BEFORE per-project selection (photo-select.js), so a
 * blocked photo never consumes a selection slot -- its project's next-best same-day photo
 * is chosen instead. Needs no project metadata, so it can run before the details fetch.
 * The full filterPhotos gate still runs after selection.
 */
export function dropBlockedIds(photos) {
  return (photos || []).filter((p) => !BLOCKED.has(String(p.id)));
}

export const _internal = { BLOCKED, APPROVED, NAME_BLOCK, ALLOWED_STATUSES };
