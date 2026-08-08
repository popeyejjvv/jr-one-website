// =============================================================================
// Star rating display tests
// =============================================================================
// Run with: node --test "tests/*.test.js"
//        or: node --test tests/star-rating.test.js
//
// WHAT THIS GUARDS
// app/areas/[slug]/[service]/page.jsx rendered five SOLID gold stars beside the
// text "4.9 / 5.0 from 59 reviews", on all 232 pages that route generates
// (29 city slugs x 8 services). Five solid stars is how a 5.0 is drawn, so the
// picture claimed a perfect score while the number beside it did not. Google
// draws 4.9 as four full stars plus a fifth that is mostly filled.
//
// The arithmetic is imported from lib/star-geometry.js, which is the SAME
// function lib/icons.jsx StarRating calls. Nothing in tests/ can import a .jsx
// file (Node does not transpile JSX; every existing test that touches a .jsx
// reads it as text, see tests/review-stats.test.js:137-141), so the geometry was
// deliberately extracted into plain JavaScript rather than duplicated into a
// test. A test that pasted a copy of the formula would keep passing after the
// component changed.
//
// No network call is made here.
// =============================================================================

import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { starFillWidthPx, starRowWidthPx } from "../lib/star-geometry.js";
import { REVIEW_RATING } from "../lib/review-stats.js";

const REPO = process.cwd();
const read = (rel) => fs.readFileSync(path.join(REPO, rel), "utf8");

// The size and gap the service page actually passes. If those change, this
// constant must change with them, and the render-site test below checks it.
const SIZE = 18;
const GAP = 2;

// =============================================================================
// 1. 4.9 MUST DRAW AS FOUR FULL STARS PLUS A PARTIAL, NOT FIVE FULL.
// =============================================================================

test("the published rating really is 4.9, so a partial star is required", () => {
  assert.equal(REVIEW_RATING, "4.9");
  const value = Number(REVIEW_RATING);
  assert.ok(value < 5, "a rating below 5 must not be drawn as five full stars");
  assert.ok(value > 4, "4.9 must be drawn as four full stars plus a partial");
});

test("4.9 fills four whole stars plus nine tenths of the fifth", () => {
  const fill = starFillWidthPx({ rating: 4.9, outOf: 5, size: SIZE, gap: GAP });
  // Four glyphs at a pitch of (18 + 2), then 0.9 of an 18px glyph.
  const expected = 4 * (SIZE + GAP) + 0.9 * SIZE;
  assert.equal(Number(fill.toFixed(4)), Number(expected.toFixed(4)));
  assert.equal(Number(fill.toFixed(2)), 96.2);
});

test("4.9 does NOT fill the whole row, which is the bug being fixed", () => {
  const fill = starFillWidthPx({ rating: 4.9, outOf: 5, size: SIZE, gap: GAP });
  const row = starRowWidthPx({ outOf: 5, size: SIZE, gap: GAP });
  assert.ok(fill < row, `4.9 must leave the fifth star short of full: ${fill} vs ${row}`);
  // And it must be visibly short, not short by a rounding error a viewer could
  // never see. A tenth of a star at 18px is 1.8px of visible difference.
  assert.ok(row - fill >= 1.5, `the shortfall must be visible, got ${row - fill}px`);
});

test("the partial star lands INSIDE the fifth star, not before or past it", () => {
  const fill = starFillWidthPx({ rating: 4.9, outOf: 5, size: SIZE, gap: GAP });
  const fifthStarStarts = 4 * (SIZE + GAP);
  const fifthStarEnds = fifthStarStarts + SIZE;
  assert.ok(fill > fifthStarStarts, "the fill must reach into the fifth star");
  assert.ok(fill < fifthStarEnds, "the fill must stop short of the fifth star's end");
});

// =============================================================================
// 2. THE SCALE MUST BEHAVE AT ITS ENDS.
// =============================================================================

test("a perfect rating fills exactly the row, no more", () => {
  const fill = starFillWidthPx({ rating: 5, outOf: 5, size: SIZE, gap: GAP });
  const row = starRowWidthPx({ outOf: 5, size: SIZE, gap: GAP });
  assert.equal(fill, row, "5.0 must fill the row exactly");
});

test("a zero rating fills nothing", () => {
  assert.equal(starFillWidthPx({ rating: 0, outOf: 5, size: SIZE, gap: GAP }), 0);
});

test("a rating above the scale is clamped, never overflowing", () => {
  const row = starRowWidthPx({ outOf: 5, size: SIZE, gap: GAP });
  assert.equal(starFillWidthPx({ rating: 9, outOf: 5, size: SIZE, gap: GAP }), row);
});

test("a negative rating is clamped to empty", () => {
  assert.equal(starFillWidthPx({ rating: -3, outOf: 5, size: SIZE, gap: GAP }), 0);
});

test("whole ratings land exactly on a star boundary", () => {
  for (const n of [1, 2, 3, 4]) {
    const fill = starFillWidthPx({ rating: n, outOf: 5, size: SIZE, gap: GAP });
    assert.equal(fill, n * (SIZE + GAP), `${n} stars must end on a boundary`);
  }
});

test("a fill width is monotonic in the rating", () => {
  let previous = -1;
  for (let r = 0; r <= 5; r += 0.1) {
    const fill = starFillWidthPx({ rating: r, outOf: 5, size: SIZE, gap: GAP });
    assert.ok(fill >= previous, `fill went backwards at ${r}`);
    previous = fill;
  }
});

// =============================================================================
// 3. BAD INPUT MUST FAIL TO EMPTY, NEVER TO A PERFECT SCORE.
// =============================================================================
// This is the direction that matters. A NaN width serialises into a style
// attribute as "NaNpx", which browsers ignore; an ignored width means the
// filled layer is unclipped and covers everything, drawing five full stars. So
// the failure mode of naive arithmetic here is "claim a perfect rating", which
// is precisely the defect being fixed.

test("an unparseable rating draws nothing rather than a perfect score", () => {
  for (const bad of [undefined, null, "", "abc", Number.NaN, {}, []]) {
    const fill = starFillWidthPx({ rating: bad, outOf: 5, size: SIZE, gap: GAP });
    assert.ok(Number.isFinite(fill), `fill must be a number for input ${String(bad)}`);
    assert.equal(fill, 0, `bad rating ${String(bad)} must draw empty, not full`);
  }
});

test("an infinite rating draws EMPTY, not a perfect score", () => {
  // Deliberately not clamped up to a full row. Infinity is nonsense input, and
  // the whole point of this component is that a bad number must never render as
  // five full stars. Clamping it upward would turn a corrupt payload into the
  // exact false claim being fixed, so it fails to empty like every other
  // unusable input. (This assertion originally expected a clamp-to-full and was
  // corrected: the code was right and the test was wrong.)
  assert.equal(starFillWidthPx({ rating: Infinity, outOf: 5, size: SIZE, gap: GAP }), 0);
  assert.equal(starFillWidthPx({ rating: -Infinity, outOf: 5, size: SIZE, gap: GAP }), 0);
});

test("a nonsensical size or scale never yields NaN", () => {
  const cases = [
    { rating: 4.9, outOf: 0, size: SIZE, gap: GAP },
    { rating: 4.9, outOf: -5, size: SIZE, gap: GAP },
    { rating: 4.9, outOf: 5, size: 0, gap: GAP },
    { rating: 4.9, outOf: 5, size: Number.NaN, gap: GAP },
    { rating: 4.9, outOf: 5, size: SIZE, gap: Number.NaN },
  ];
  for (const c of cases) {
    const fill = starFillWidthPx(c);
    assert.ok(Number.isFinite(fill), `NaN width for ${JSON.stringify(c)}`);
    assert.ok(fill >= 0, `negative width for ${JSON.stringify(c)}`);
  }
});

test("starFillWidthPx tolerates being called with no arguments", () => {
  assert.equal(starFillWidthPx(), 0);
});

// =============================================================================
// 4. THE RENDER SITE MUST ACTUALLY USE IT.
// =============================================================================
// The arithmetic being right is worthless if the page still prints five solid
// star characters. These read the real sources.

test("the service page no longer prints five solid star characters", () => {
  const page = read("app/areas/[slug]/[service]/page.jsx");
  assert.ok(
    !page.includes("★★★★★"),
    "five solid stars must not be hard-coded beside a 4.9 rating"
  );
});

test("the service page renders StarRating driven by the review-stats constant", () => {
  const page = read("app/areas/[slug]/[service]/page.jsx");
  assert.ok(page.includes("<StarRating"), "the trust strip must use StarRating");
  assert.ok(
    /rating=\{Number\(REVIEW_RATING\)\}/.test(page),
    "the rating must come from lib/review-stats.js, never be re-typed"
  );
  assert.ok(
    /import \{ StarRating \} from "@\/lib\/icons"/.test(page),
    "StarRating must be imported from the shared icon library"
  );
});

test("the service page passes the size and gap these tests assert against", () => {
  const page = read("app/areas/[slug]/[service]/page.jsx");
  const tag = page.slice(page.indexOf("<StarRating"), page.indexOf("/>", page.indexOf("<StarRating")));
  assert.ok(tag.includes(`size={${SIZE}}`), `expected size={${SIZE}} in: ${tag}`);
  assert.ok(tag.includes(`gap={${GAP}}`), `expected gap={${GAP}} in: ${tag}`);
});

test("StarRating uses the shared geometry rather than inlining the formula", () => {
  const icons = read("lib/icons.jsx");
  assert.ok(
    icons.includes('from "./star-geometry.js"'),
    "the component must import the tested arithmetic"
  );
  assert.ok(icons.includes("starFillWidthPx({"), "the component must call it");
});

test("StarRating labels the real rating for screen readers", () => {
  const icons = read("lib/icons.jsx");
  const start = icons.indexOf("export const StarRating");
  const block = icons.slice(start, icons.indexOf("\n};", start));
  assert.ok(block.includes('role="img"'), "the row must expose a role");
  assert.ok(
    block.includes("out of") && block.includes("aria-label"),
    "the row must announce the rating, not just draw it"
  );
});

test("StarRow is left alone, because a testimonial count is a different question", () => {
  // StarRow takes an integer COUNT and is used by components/ui/ReviewCard.jsx,
  // where a reviewer who left five stars really did leave five. Conflating it
  // with an aggregate rating is how this bug would come back.
  const icons = read("lib/icons.jsx");
  assert.ok(icons.includes("export const StarRow"), "StarRow must still exist");
  const start = icons.indexOf("export const StarRow");
  const block = icons.slice(start, icons.indexOf("\n);", start));
  assert.ok(block.includes("count = 5"), "StarRow must remain a count-based row");
});
