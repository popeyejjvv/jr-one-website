// =============================================================================
// Google review statistics tests
// =============================================================================
// Run with: node --test "tests/*.test.js"
//        or: node --test tests/review-stats.test.js
//
// WHAT THESE TESTS ARE FOR
// The rating and review count used to be typed by hand into ten files across
// roughly 296 pages, with no record of where they came from. The count sat at
// 55 while the live Google profile said 59, and decisions-log.md:283 had
// already flagged the claim as "carried but NOT verified" without resolving it.
//
// Two failure modes are guarded here, and they are different:
//
//   1. DRIFT FROM THE SOURCE. lib/review-stats.js publishes a rating and a
//      count AND the per-star histogram they were read from. If someone edits
//      one number without the other, the histogram stops reconciling and these
//      tests fail. A number cannot be changed without its evidence changing
//      with it, which is what makes the recorded source real rather than a
//      comment nobody re-reads.
//
//   2. DRIFT ACROSS PAGES. Every render site must read the constant rather than
//      re-type the value. These tests scan the actual page sources and fail if
//      any of them hard-codes a rating or a review count again.
//
// No network call is made here. The live profile is not re-fetched: that is a
// human refresh step documented in lib/review-stats.js, not something a unit
// test should do (a test that hits Google would be flaky, rate-limited, and
// would turn a Google outage into a red build).
// =============================================================================

import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import {
  REVIEW_RATING,
  REVIEW_RATING_SCALE,
  REVIEW_COUNT,
  REVIEW_PLACE_ID,
  REVIEW_SOURCE_URL,
  REVIEW_STATS_CHECKED_ON,
  REVIEW_STAR_HISTOGRAM,
  ratingText,
  ratingOnGoogle,
  ratingWithScaleAndCount,
  readAllReviewsCta,
  googleRatingFromCount,
} from "../lib/review-stats.js";

const REPO = process.cwd();
const read = (rel) => fs.readFileSync(path.join(REPO, rel), "utf8");

// =============================================================================
// 1. THE CONSTANT MUST RECONCILE WITH ITS RECORDED SOURCE.
// =============================================================================

test("the review count equals the sum of the recorded star histogram", () => {
  const sum = Object.values(REVIEW_STAR_HISTOGRAM).reduce((a, b) => a + b, 0);
  assert.equal(
    sum,
    REVIEW_COUNT,
    `REVIEW_COUNT is ${REVIEW_COUNT} but the recorded histogram sums to ${sum}. ` +
      "One of them was edited without the other. Re-read the profile and update both."
  );
});

test("the rating equals the weighted mean of the recorded star histogram", () => {
  let total = 0;
  let n = 0;
  for (const [stars, amount] of Object.entries(REVIEW_STAR_HISTOGRAM)) {
    total += Number(stars) * amount;
    n += amount;
  }
  const mean = total / n;
  const displayed = mean.toFixed(1);
  assert.equal(
    displayed,
    REVIEW_RATING,
    `REVIEW_RATING is ${REVIEW_RATING} but the recorded histogram averages to ${displayed} ` +
      `(raw ${mean}). The published rating and its evidence disagree.`
  );
});

test("the histogram is a plausible five-bucket breakdown, not a placeholder", () => {
  assert.deepEqual(
    Object.keys(REVIEW_STAR_HISTOGRAM).map(Number).sort((a, b) => a - b),
    [1, 2, 3, 4, 5],
    "the histogram must carry all five buckets"
  );
  for (const [stars, amount] of Object.entries(REVIEW_STAR_HISTOGRAM)) {
    assert.ok(Number.isInteger(amount) && amount >= 0, `bucket ${stars} must be a non-negative integer`);
  }
  assert.ok(REVIEW_COUNT > 0, "a zero review count would mean the claim should be removed, not published");
});

test("the source is actually recorded: a URL, a place id, and a date", () => {
  assert.match(REVIEW_SOURCE_URL, /^https:\/\/www\.google\.com\/maps\/place\//, "the source must be the Google profile");
  assert.ok(
    REVIEW_SOURCE_URL.includes(REVIEW_PLACE_ID),
    "the recorded source URL must point at the recorded place id, or it documents a different business"
  );
  assert.match(REVIEW_STATS_CHECKED_ON, /^\d{4}-\d{2}-\d{2}$/, "the checked-on date must be a real ISO date");
  assert.ok(
    !Number.isNaN(new Date(REVIEW_STATS_CHECKED_ON).getTime()),
    "the checked-on date must parse"
  );
});

test("the place id matches the one the site publishes in its own schema", () => {
  // If these ever diverge, the rating on the page describes a different Google
  // listing than the one the site tells Google it is.
  const layout = read("app/layout.js");
  assert.ok(
    layout.includes(REVIEW_PLACE_ID),
    `app/layout.js must contain the same place id (${REVIEW_PLACE_ID}) the review stats were read from`
  );
});

test("the recorded source and evidence are present in the module's own prose", () => {
  // The comment block IS the record. If someone strips it, the numbers become
  // unsourced again and this test says so.
  const src = read("lib/review-stats.js");
  assert.ok(src.includes(REVIEW_PLACE_ID), "the place id must appear in the source record");
  assert.ok(src.includes(REVIEW_STATS_CHECKED_ON), "the checked-on date must appear in the source record");
  assert.ok(/localfalcon/i.test(src), "the corroborating source must stay named");
  assert.ok(/serpapi/i.test(src), "the second corroborating source must stay named");
});

// =============================================================================
// 2. EVERY PAGE READS THE CONSTANT. NOTHING RE-TYPES IT.
// =============================================================================

// Every file that renders the rating or the count. If a new page starts showing
// it, add it here.
const RENDER_SITES = [
  "app/page.jsx",
  "app/about/page.jsx",
  "app/projects/page.jsx",
  "components/CityLandingPage.jsx",
  "app/areas/[slug]/[service]/page.jsx",
];

test("every render site imports the shared constant", () => {
  for (const rel of RENDER_SITES) {
    const src = read(rel);
    assert.match(
      src,
      /from ["'][^"']*lib\/review-stats["']/,
      `${rel} renders the Google rating and must import it from lib/review-stats.js`
    );
  }
});

test("no page hard-codes the rating value", () => {
  // Scan the whole customer-facing tree, not only the known render sites, so a
  // NEW page that types the number is caught too.
  const offenders = [];
  for (const rel of walk(["app", "components"], [".js", ".jsx"])) {
    if (rel.endsWith("lib/review-stats.js")) continue;
    const src = read(rel);
    src.split("\n").forEach((line, i) => {
      // The literal rating in a quoted string or JSX text.
      if (/(["'`>])\s*4\.9\s*[★*/ a-zA-Z]/.test(line) && !line.trim().startsWith("//")) {
        offenders.push(`${rel}:${i + 1}  ${line.trim().slice(0, 120)}`);
      }
    });
  }
  assert.deepEqual(
    offenders,
    [],
    "these lines hard-code the rating instead of importing REVIEW_RATING:\n" + offenders.join("\n")
  );
});

test("no page hard-codes a review count", () => {
  const offenders = [];
  for (const rel of walk(["app", "components"], [".js", ".jsx"])) {
    if (rel.endsWith("lib/review-stats.js")) continue;
    const src = read(rel);
    src.split("\n").forEach((line, i) => {
      if (line.trim().startsWith("//")) return;
      // A bare number sitting next to the word reviews / reseñas.
      if (/\d+\+?\s*(reviews|rese(ñ|n)as)/i.test(line)) {
        offenders.push(`${rel}:${i + 1}  ${line.trim().slice(0, 120)}`);
      }
    });
  }
  assert.deepEqual(
    offenders,
    [],
    "these lines hard-code a review count instead of importing REVIEW_COUNT:\n" + offenders.join("\n")
  );
});

test("the served llms-full.txt asset agrees with the constant", () => {
  // public/llms-full.txt is a static file and cannot import a JS constant, so
  // it is the one place the number is duplicated by necessity. This test is
  // what keeps that duplicate honest.
  const src = read("public/llms-full.txt");
  const m = src.match(/Aggregate review rating:\s*([\d.]+)\s*\/\s*(\d+)\s*reviews/);
  assert.ok(m, "public/llms-full.txt must still publish the aggregate review line");
  assert.equal(m[1], REVIEW_RATING, "llms-full.txt rating drifted from lib/review-stats.js");
  assert.equal(Number(m[2]), REVIEW_COUNT, "llms-full.txt review count drifted from lib/review-stats.js");
  assert.ok(
    src.includes(REVIEW_STATS_CHECKED_ON),
    "llms-full.txt must carry the checked-on date so the served claim is sourced too"
  );
});

// =============================================================================
// 3. THE VALUES MUST NOT GO BACK INTO STRUCTURED DATA.
// =============================================================================

test("no rating ships in JSON-LD anywhere", () => {
  // aggregateRating was removed site-wide on 2026-05-26 (commit 6b2a974)
  // because Google's self-serving review policy makes a business's own
  // LocalBusiness/Organization markup ineligible for the star rich result.
  // Re-adding it earns nothing and risks a structured-data penalty, and a
  // structured value that disagreed with the visible one would be a policy
  // problem on top of that.
  const offenders = [];
  for (const rel of walk(["app", "components", "public"], [".js", ".jsx", ".html", ".txt"])) {
    const src = read(rel);
    src.split("\n").forEach((line, i) => {
      const t = line.trim();
      if (t.startsWith("//") || t.startsWith("*")) return;
      if (/(aggregateRating|ratingValue|reviewCount|bestRating)\s*[:=]/.test(line)) {
        offenders.push(`${rel}:${i + 1}  ${t.slice(0, 120)}`);
      }
    });
  }
  assert.deepEqual(
    offenders,
    [],
    "structured-data rating markup is back, which is against the 2026-05-26 decision:\n" + offenders.join("\n")
  );
});

// =============================================================================
// 4. THE FORMATTERS.
// =============================================================================

test("the formatters render the constant, in both languages", () => {
  assert.equal(ratingText(), REVIEW_RATING);
  assert.equal(ratingOnGoogle("en"), `${REVIEW_RATING} on Google`);
  assert.equal(ratingOnGoogle("es"), `${REVIEW_RATING} en Google`);
  assert.equal(
    ratingWithScaleAndCount("en"),
    `${REVIEW_RATING} / ${REVIEW_RATING_SCALE} from ${REVIEW_COUNT} reviews`
  );
  assert.equal(readAllReviewsCta("en"), `Read all ${REVIEW_COUNT} reviews on Google`);
  assert.equal(googleRatingFromCount("en"), `Google rating from ${REVIEW_COUNT} reviews`);
});

test("the Spanish formatters keep their accents", () => {
  assert.ok(ratingWithScaleAndCount("es").includes("reseñas"));
  assert.ok(readAllReviewsCta("es").includes("reseñas"));
  assert.ok(googleRatingFromCount("es").includes("Calificación"));
  assert.ok(googleRatingFromCount("es").includes("reseñas"));
});

test("every formatter carries the real numbers, never a placeholder", () => {
  for (const fn of [ratingOnGoogle, ratingWithScaleAndCount, readAllReviewsCta, googleRatingFromCount]) {
    for (const lang of ["en", "es"]) {
      const out = fn(lang);
      assert.ok(out.includes(REVIEW_RATING) || out.includes(String(REVIEW_COUNT)), `${fn.name}(${lang}) rendered neither number`);
      assert.ok(!/undefined|NaN|null/.test(out), `${fn.name}(${lang}) rendered a broken value: ${out}`);
    }
  }
});

// ── helper ──────────────────────────────────────────────────────────────────
function walk(roots, exts) {
  const out = [];
  const visit = (dir) => {
    for (const entry of fs.readdirSync(path.join(REPO, dir), { withFileTypes: true })) {
      if (entry.name === "node_modules" || entry.name === ".next" || entry.name === ".git") continue;
      const rel = path.join(dir, entry.name);
      if (entry.isDirectory()) visit(rel);
      else if (exts.some((e) => entry.name.endsWith(e))) out.push(rel);
    }
  };
  for (const root of roots) visit(root);
  return out;
}
