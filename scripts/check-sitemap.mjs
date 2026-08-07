#!/usr/bin/env node
//
// check-sitemap: every live route is in the sitemap, every sitemap entry resolves.
//
// WHY THIS EXISTS (receipt, 2026-08-07)
//
// The six /es/areas/<city>/<service> pages shipped to production live and
// hreflang-linked from their English twins, and were ABSENT from the sitemap.
// Nothing failed. The build passed, the deploy passed, the pages served 200.
// It was caught only because someone hand-diffed the deployed routes against
// the deployed sitemap after the fact. That diff is now this file.
//
// The failure class is drift between two code paths that must agree: the route
// module decides what renders, app/sitemap.js decides what is announced, and
// nothing forced them to match. A page that renders but is not in the sitemap
// is not broken, which is exactly why it stays broken.
//
// FAIL-CLOSED, in the monitors/_guard.py sense
//
// A check whose input vanished must never read as "nothing to report". If the
// sitemap cannot be fetched, parses to zero URLs, or falls under FLOOR, this
// exits non-zero and says so. "0 problems found" printed against an empty input
// is the failure mode being prevented -- the same shape as the line-scoped grep
// and the `2>/dev/null` swallow recorded in compliance-sweep-closed-2026-08.md.
//
// TWO MODES
//
//   --build                    offline structural invariants, wired to postbuild
//                              so a broken sitemap cannot even finish a build
//   --origin <url>             the real diff, against a deployed origin
//
// Live mode, in full:
//   1. every sitemap URL must resolve 200 (no announced 404s)
//   2. every same-origin hreflang alternate and canonical found on those pages
//      must itself be in the sitemap  <- this is the check that catches the
//      exact six-page defect: they were emitted as es-US alternates by the EN
//      route while app/sitemap.js listed only /es/areas/<city>
//
// Usage:
//   node scripts/check-sitemap.mjs --build
//   node scripts/check-sitemap.mjs --origin https://www.jronegutters.com
//   node scripts/check-sitemap.mjs --origin http://localhost:3000 --concurrency 12

import fs from "node:fs";
import path from "node:path";
import process from "node:process";

const BUILT_SITEMAP = ".next/server/app/sitemap.xml.body";
const ES_SOURCE = "lib/city-service-es.js";

// A sitemap that suddenly collapses is a defect, not a small sitemap. The live
// site has served 400+ URLs since the May city expansion; this floor exists so
// a generator that silently returns [] fails loudly instead of passing clean.
const FLOOR = 300;

function fail(msg) {
  console.error(`FAIL: ${msg}`);
  process.exitCode = 1;
}

function die(msg) {
  console.error(`FAIL: ${msg}`);
  process.exit(1);
}

function parseArgs(argv) {
  const out = { build: false, origin: null, concurrency: 8, sitemapFile: null };
  for (let i = 0; i < argv.length; i++) {
    if (argv[i] === "--build") out.build = true;
    else if (argv[i] === "--origin") out.origin = argv[++i];
    else if (argv[i] === "--concurrency") out.concurrency = Number(argv[++i]);
    // Verification seam: substitute the sitemap while still fetching pages from
    // the live origin. This is how the check itself is proven -- take the real
    // deployed sitemap, delete the six ES combo URLs, and confirm the orphan
    // detector reports exactly those six from real production hreflang tags.
    // A check nobody has watched fail is not a check.
    else if (argv[i] === "--sitemap-file") out.sitemapFile = argv[++i];
    else die(`unknown argument ${JSON.stringify(argv[i])}`);
  }
  if (!out.build && !out.origin) out.build = true;
  if (!Number.isInteger(out.concurrency) || out.concurrency < 1) {
    die(`--concurrency must be a positive integer`);
  }
  if (out.sitemapFile && !out.origin) die(`--sitemap-file requires --origin`);
  return out;
}

function locsFrom(xml, where) {
  const locs = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) =>
    m[1].trim().replace(/&amp;/g, "&")
  );
  if (locs.length === 0) die(`${where} parsed to ZERO <loc> entries -- gate is blind`);
  if (locs.length < FLOOR) {
    die(`${where} has only ${locs.length} URLs, under the floor of ${FLOOR}`);
  }
  return locs;
}

// ── shared structural invariants ─────────────────────────────────────────────

function checkStructure(locs, where) {
  console.log(`${where}: ${locs.length} URLs`);

  const seen = new Set();
  const dupes = new Set();
  for (const u of locs) {
    if (seen.has(u)) dupes.add(u);
    seen.add(u);
  }
  if (dupes.size) {
    fail(`${dupes.size} duplicate sitemap entries, e.g. ${[...dupes][0]}`);
  } else {
    console.log("ok   no duplicate entries");
  }

  const origins = new Set();
  for (const u of locs) {
    let parsed;
    try {
      parsed = new URL(u);
    } catch {
      fail(`sitemap entry is not a valid URL: ${JSON.stringify(u)}`);
      continue;
    }
    origins.add(parsed.origin);
  }
  if (origins.size !== 1) {
    fail(`sitemap mixes ${origins.size} origins: ${[...origins].join(", ")}`);
  } else {
    console.log(`ok   single origin ${[...origins][0]}`);
  }

  return seen;
}

// The ES combo route generates from ES_COMBO_PAIRS with dynamicParams=false, so
// that literal is the route's own statement of what exists. Re-asserting it here
// is a tripwire: if app/sitemap.js is ever changed back to a hardcoded list, the
// six pages go missing again and this line fails instead of shipping quietly.
function esComboPairs(root) {
  const file = path.join(root, ES_SOURCE);
  let src;
  try {
    src = fs.readFileSync(file, "utf8");
  } catch (e) {
    die(`cannot read ${ES_SOURCE}, so the ES combo routes cannot be checked: ${e.message}`);
  }
  const m = src.match(/ES_COMBO_PAIRS\s*=\s*new Set\(\[([\s\S]*?)\]\)/);
  if (!m) die(`ES_COMBO_PAIRS not found in ${ES_SOURCE} -- cannot verify ES combo routes`);
  const pairs = [...m[1].matchAll(/["']([^"']+)["']/g)].map((x) => x[1]);
  if (pairs.length === 0) die(`ES_COMBO_PAIRS in ${ES_SOURCE} parsed to zero pairs`);
  return pairs;
}

function checkEsCombos(urlSet, root) {
  const pairs = esComboPairs(root);
  const missing = pairs.filter(
    (p) => ![...urlSet].some((u) => u.endsWith(`/es/areas/${p}`))
  );
  if (missing.length) {
    fail(
      `${missing.length} ES combo route(s) generated but absent from sitemap: ` +
        missing.map((p) => `/es/areas/${p}`).join(", ")
    );
  } else {
    console.log(`ok   all ${pairs.length} ES combo routes present in sitemap`);
  }
}

// ── build mode ───────────────────────────────────────────────────────────────

function runBuild(root) {
  const file = path.join(root, BUILT_SITEMAP);
  if (!fs.existsSync(file)) {
    die(
      `${BUILT_SITEMAP} does not exist. Run \`npm run build\` first. ` +
        `Refusing to report a clean sitemap without reading one.`
    );
  }
  const locs = locsFrom(fs.readFileSync(file, "utf8"), BUILT_SITEMAP);
  const urlSet = checkStructure(locs, "built sitemap");
  checkEsCombos(urlSet, root);
}

// ── live mode ────────────────────────────────────────────────────────────────

async function mapLimit(items, limit, fn) {
  const out = new Array(items.length);
  let i = 0;
  const workers = Array.from({ length: Math.min(limit, items.length) }, async () => {
    while (true) {
      const idx = i++;
      if (idx >= items.length) return;
      out[idx] = await fn(items[idx], idx);
    }
  });
  await Promise.all(workers);
  return out;
}

async function get(url) {
  try {
    const res = await fetch(url, { redirect: "follow" });
    const body = res.headers.get("content-type")?.includes("html")
      ? await res.text()
      : "";
    return { status: res.status, finalUrl: res.url, body };
  } catch (e) {
    return { status: 0, finalUrl: url, body: "", error: e.message };
  }
}

// Same-origin URLs this page ASSERTS exist: its hreflang alternates and its
// canonical. These come from the route modules, not from app/sitemap.js, which
// is what makes the comparison a real diff rather than a tautology.
function assertedUrls(html, origin) {
  const urls = new Set();
  const push = (u) => {
    if (!u) return;
    let abs;
    try {
      abs = new URL(u, origin);
    } catch {
      return;
    }
    if (abs.origin !== origin) return;
    urls.add(abs.origin + abs.pathname.replace(/\/$/, "") || abs.href);
  };
  for (const m of html.matchAll(/<link[^>]+rel=["']alternate["'][^>]*>/gi)) {
    const tag = m[0];
    if (!/hreflang=/i.test(tag)) continue;
    const href = tag.match(/href=["']([^"']+)["']/i);
    if (href) push(href[1]);
  }
  for (const m of html.matchAll(/<link[^>]+rel=["']canonical["'][^>]*>/gi)) {
    const href = m[0].match(/href=["']([^"']+)["']/i);
    if (href) push(href[1]);
  }
  return urls;
}

function normalize(u) {
  try {
    const p = new URL(u);
    return p.origin + (p.pathname === "/" ? "/" : p.pathname.replace(/\/$/, ""));
  } catch {
    return u;
  }
}

async function runLive(origin, concurrency, root, sitemapFile) {
  const base = origin.replace(/\/$/, "");
  const sitemapUrl = `${base}/sitemap.xml`;
  let xml;
  let where = sitemapUrl;
  if (sitemapFile) {
    where = `${sitemapFile} (substituted for ${sitemapUrl})`;
    console.log(`!!   sitemap substituted from ${sitemapFile} -- verification run`);
    try {
      xml = fs.readFileSync(sitemapFile, "utf8");
    } catch (e) {
      die(`cannot read --sitemap-file ${sitemapFile}: ${e.message}`);
    }
  } else {
    const res = await fetch(sitemapUrl).catch((e) => ({ ok: false, status: 0, e }));
    if (!res.ok) {
      die(`${sitemapUrl} returned ${res.status || "network error"} -- cannot check anything`);
    }
    xml = await res.text();
  }
  const locs = locsFrom(xml, where);
  const urlSet = checkStructure(locs, "live sitemap");
  checkEsCombos(urlSet, root);

  const normalized = new Set(locs.map(normalize));

  console.log(`\nfetching ${locs.length} sitemap URLs at concurrency ${concurrency} ...`);
  const results = await mapLimit(locs, concurrency, (u) => get(u));

  // 1. every sitemap entry resolves
  const broken = [];
  results.forEach((r, i) => {
    if (r.status !== 200) broken.push(`${locs[i]} -> ${r.status || r.error}`);
  });
  if (broken.length) {
    fail(`${broken.length} sitemap entries do not resolve:`);
    for (const b of broken.slice(0, 25)) console.error(`       ${b}`);
    if (broken.length > 25) console.error(`       ... and ${broken.length - 25} more`);
  } else {
    console.log(`ok   all ${locs.length} sitemap entries return 200`);
  }

  // 2. every live route asserted by a page is in the sitemap
  const orphans = new Map();
  results.forEach((r, i) => {
    if (!r.body) return;
    for (const u of assertedUrls(r.body, base)) {
      const n = normalize(u);
      if (!normalized.has(n)) {
        if (!orphans.has(n)) orphans.set(n, locs[i]);
      }
    }
  });
  if (orphans.size) {
    fail(`${orphans.size} live route(s) linked but ABSENT from the sitemap:`);
    for (const [u, from] of [...orphans].slice(0, 25)) {
      console.error(`       ${u}   (asserted by ${from})`);
    }
    if (orphans.size > 25) console.error(`       ... and ${orphans.size - 25} more`);
  } else {
    console.log("ok   every hreflang alternate and canonical is in the sitemap");
  }
}

// ── main ─────────────────────────────────────────────────────────────────────

const args = parseArgs(process.argv.slice(2));
const root = process.cwd();

if (args.build) {
  console.log("check-sitemap: build mode (offline structural invariants)");
  runBuild(root);
}
if (args.origin) {
  console.log(`check-sitemap: live mode against ${args.origin}`);
  await runLive(args.origin, args.concurrency, root, args.sitemapFile);
}

if (process.exitCode) {
  console.error("\ncheck-sitemap: FAILED");
} else {
  console.log("\ncheck-sitemap: OK");
}
