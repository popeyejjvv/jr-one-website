// =============================================================================
// Climate statistics drift tests
// =============================================================================
// Run with: node --test "tests/*.test.js"
//        or: node --test tests/climate-stats.test.js
//
// WHAT THESE GUARD
// The site publishes climate figures to customers as facts. Two were wrong:
//
//   1. public/roi-calculator.html said "10-month hurricane season". The
//      official Atlantic season is June 1 to November 30, which is SIX months.
//   2. Two surfaces said Tampa gets "50+" inches of rain a year. The NOAA/NCEI
//      1991-2020 annual precipitation normal for Tampa Intl is 49.48 inches,
//      which is under fifty.
//
// Both are now corrected, and both the value and the source it was read from
// live in lib/climate-stats.js. These tests fail if any published surface
// drifts away from that constant, which is what makes the recorded source real
// rather than a comment nobody re-reads. Same pattern as
// tests/review-stats.test.js.
//
// public/roi-calculator.html cannot import the constant: it is a static asset,
// deliberately unlinked, allow-listed in middleware.js:30, and NOT processed by
// `npm run build` (manual-steps.md:111). So the enforcement is textual, exactly
// as tests/review-stats.test.js enforces the rating across page sources.
//
// No network call is made here. The sources are NOT re-fetched: a test that hit
// NOAA would be flaky and would turn a NOAA outage into a red build. Re-reading
// the source is a documented human refresh step in lib/climate-stats.js.
// =============================================================================

import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import {
  CLIMATE_STATS_CHECKED_ON,
  HURRICANE_SEASON_MONTHS,
  HURRICANE_SEASON_LABEL,
  HURRICANE_SEASON_START,
  HURRICANE_SEASON_END,
  HURRICANE_SEASON_SOURCE_URL,
  TAMPA_ANNUAL_RAINFALL_INCHES,
  TAMPA_ANNUAL_RAINFALL_LABEL,
  TAMPA_RAINFALL_STATION_ID,
  TAMPA_RAINFALL_SOURCE_URL,
  FLORIDA_STATEWIDE_ANNUAL_RAINFALL_INCHES,
  TAMPA_BAY_RAINFALL_STATIONS,
} from "../lib/climate-stats.js";

const REPO = process.cwd();
const read = (rel) => fs.readFileSync(path.join(REPO, rel), "utf8");

// Every surface that publishes one of these figures to a customer.
const ROI = "public/roi-calculator.html";
const SEVEN_INCH = "app/7-inch-gutters/page.jsx";
const DRAINAGE = "app/drainage-assessment/page.jsx";

// =============================================================================
// 1. THE CONSTANTS MUST AGREE WITH THEIR OWN RECORDED EVIDENCE.
// =============================================================================

test("the hurricane season length matches its own start and end dates", () => {
  // June 1 to November 30 inclusive is June, July, August, September, October,
  // November. Six. Re-derived here rather than trusted, so the constant cannot
  // be edited to a different number while keeping the same dates beside it.
  const MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"];
  const startMonth = MONTHS.indexOf(HURRICANE_SEASON_START.split(" ")[0]);
  const endMonth = MONTHS.indexOf(HURRICANE_SEASON_END.split(" ")[0]);
  assert.ok(startMonth >= 0 && endMonth >= 0, "the dates must name real months");
  assert.equal(endMonth - startMonth + 1, HURRICANE_SEASON_MONTHS);
  assert.equal(HURRICANE_SEASON_MONTHS, 6);
});

test("the hurricane season label states the recorded number of months", () => {
  assert.ok(
    HURRICANE_SEASON_LABEL.startsWith(`${HURRICANE_SEASON_MONTHS}-month`),
    `label "${HURRICANE_SEASON_LABEL}" must state ${HURRICANE_SEASON_MONTHS} months`
  );
});

test("the Tampa rainfall label does not overstate the recorded figure", () => {
  // The whole defect was a plus sign on a number under fifty. A label carrying
  // "+" must never be paired with a figure below the number it follows.
  assert.ok(TAMPA_ANNUAL_RAINFALL_INCHES < 50, "the recorded normal is under 50");
  assert.ok(
    !TAMPA_ANNUAL_RAINFALL_LABEL.includes("+"),
    `"${TAMPA_ANNUAL_RAINFALL_LABEL}" claims a floor the 49.48 in normal does not clear`
  );

  // The label rounds the figure for readability, so it is allowed to differ,
  // but only slightly. Anything further than a whole inch from the recorded
  // normal stops being a rounding and starts being a different claim.
  // (49.48 rounds DOWN to 49; "about 50" is within tolerance, "50+" was not
  // because of the plus, not because of the rounding.)
  const stated = Number(TAMPA_ANNUAL_RAINFALL_LABEL.match(/\d+(\.\d+)?/)[0]);
  assert.ok(
    Math.abs(stated - TAMPA_ANNUAL_RAINFALL_INCHES) <= 1,
    `label says ${stated} but the recorded normal is ${TAMPA_ANNUAL_RAINFALL_INCHES}`
  );
});

test("the Tampa figure matches the station table it was read from", () => {
  const station = TAMPA_BAY_RAINFALL_STATIONS[TAMPA_RAINFALL_STATION_ID];
  assert.ok(station, "the cited station must appear in the recorded evidence");
  assert.equal(station.inches, TAMPA_ANNUAL_RAINFALL_INCHES);
  assert.equal(station.name, "TAMPA INTL AP");
});

test("the statewide figure is kept separate from the Tampa figure", () => {
  // They are different claims about different places. Conflating them is how a
  // true statewide sentence gets deleted because a Tampa sentence was wrong.
  assert.notEqual(
    FLORIDA_STATEWIDE_ANNUAL_RAINFALL_INCHES,
    TAMPA_ANNUAL_RAINFALL_INCHES
  );
  assert.ok(
    FLORIDA_STATEWIDE_ANNUAL_RAINFALL_INCHES > 50,
    "the statewide figure is what makes the drainage page's 'over 50 inches' true"
  );
});

test("every recorded value carries a source and a check date", () => {
  assert.match(CLIMATE_STATS_CHECKED_ON, /^\d{4}-\d{2}-\d{2}$/);
  for (const url of [HURRICANE_SEASON_SOURCE_URL, TAMPA_RAINFALL_SOURCE_URL]) {
    assert.ok(url.startsWith("https://"), `source must be a real URL: ${url}`);
    assert.ok(url.includes("noaa.gov"), `source must be NOAA: ${url}`);
  }
});

// =============================================================================
// 2. THE PUBLISHED SURFACES MUST NOT DRIFT FROM THE CONSTANTS.
// =============================================================================

test("the ROI calculator publishes the corrected hurricane season", () => {
  const html = read(ROI);
  assert.ok(
    html.includes(`${HURRICANE_SEASON_LABEL}`),
    `roi-calculator.html must carry "${HURRICANE_SEASON_LABEL}"`
  );
});

test("the ROI calculator no longer claims a 10-month hurricane season", () => {
  const html = read(ROI);
  // Strip the HTML comment that documents the old value, so the record of what
  // it WAS does not itself trip the check.
  const live = html.replace(/<!--[\s\S]*?-->/g, "").replace(/^\s*\/\/.*$/gm, "");
  assert.ok(
    !/10-month hurricane season/.test(live),
    "the 10-month claim must not be live anywhere on the page"
  );
});

test("no surface claims a hurricane season longer than the real one", () => {
  // Anything from 7 to 12 months is a longer-than-real claim. Catching the whole
  // class means a future edit cannot swap 10 for 9 and pass.
  for (const rel of [ROI, SEVEN_INCH, DRAINAGE, "public/llms-full.txt"]) {
    const src = read(rel).replace(/<!--[\s\S]*?-->/g, "").replace(/^\s*\/\/.*$/gm, "");
    const bad = src.match(/\b(7|8|9|10|11|12)[- ]month hurricane season/gi);
    assert.equal(bad, null, `${rel} claims an overlong hurricane season: ${bad}`);
  }
});

test("the ROI calculator publishes the corrected Tampa rainfall", () => {
  const html = read(ROI);
  assert.ok(
    html.includes(`${TAMPA_ANNUAL_RAINFALL_LABEL} of annual rainfall`),
    `roi-calculator.html must carry "${TAMPA_ANNUAL_RAINFALL_LABEL} of annual rainfall"`
  );
});

test("no surface claims Tampa gets 50 PLUS inches of rain", () => {
  // The statewide claim on the drainage page is deliberately excluded: Florida
  // really does average 54.42 inches. Only claims that name Tampa are wrong.
  for (const rel of [ROI, SEVEN_INCH]) {
    const src = read(rel).replace(/<!--[\s\S]*?-->/g, "").replace(/^\s*\/\/.*$/gm, "");
    assert.ok(
      !/50\+ inches/.test(src),
      `${rel} still claims "50+ inches", which 49.48 does not support`
    );
    assert.ok(
      !/50\+ pulgadas/.test(src),
      `${rel} still claims "50+ pulgadas" on the Spanish side`
    );
  }
});

test("the 7-inch page says about 50 inches in BOTH languages", () => {
  const src = read(SEVEN_INCH);
  assert.ok(
    src.includes("Tampa averages about 50 inches of rain a year"),
    "the English copy must carry the corrected figure"
  );
  assert.ok(
    src.includes("Tampa promedia unas 50 pulgadas al año"),
    "the Spanish copy must carry the corrected figure, with real accents"
  );
});

test("NO surface anywhere still says Tampa gets 51 inches of rain", () => {
  // This was the widest single defect found: 30 lines across 20 files, both
  // languages, said Tampa or Tampa Bay averages 51 inches. NOAA says 49.48.
  // Walk the whole content tree rather than a hand-listed set, so a new page
  // that copies the old sentence is caught too.
  const roots = ["app", "public", "content", "components", "lib"];
  const exts = [".js", ".jsx", ".md", ".txt", ".html"];
  const offenders = [];

  const walk = (dir) => {
    for (const entry of fs.readdirSync(path.join(REPO, dir), { withFileTypes: true })) {
      const rel = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        if (entry.name === "node_modules" || entry.name === ".next") continue;
        walk(rel);
        continue;
      }
      if (!exts.includes(path.extname(entry.name))) continue;
      const src = read(rel);
      for (const [i, line] of src.split("\n").entries()) {
        if (!/51 inches|51 pulgadas/.test(line)) continue;
        // The FLORIDA STATEWIDE claim is true (54.42 in) and is allowed.
        if (/Florida gets 51\+ inches/.test(line)) continue;
        if (/En Florida caen m.s de 51/.test(line)) continue;
        // A comment recording what the value USED to be is not a live claim.
        if (/^\s*(\/\/|\*|<!--)/.test(line)) continue;
        offenders.push(`${rel}:${i + 1}`);
      }
    }
  };
  for (const r of roots) walk(r);

  assert.deepEqual(offenders, [], `Tampa 51-inch rainfall claim still live at:\n${offenders.join("\n")}`);
});

test("the drainage stat tiles no longer publish a 50+ floor for Tampa", () => {
  const src = read(DRAINAGE);
  const live = src.replace(/^\s*\/\/.*$/gm, "");
  assert.ok(
    live.includes('{ value: "~50", label: "Inches of rain per year in Tampa" }'),
    "the English tile must read ~50"
  );
  assert.ok(
    live.includes('{ value: "~50", label: "Pulgadas de lluvia al año en Tampa" }'),
    "the Spanish tile must read ~50, with real accents"
  );
  assert.ok(
    !/value: "50\+", label: "(Inches of rain|Pulgadas de lluvia)/.test(live),
    "no Tampa rainfall tile may claim a 50+ floor"
  );
});

test("the true statewide rainfall claim was NOT deleted", () => {
  // Over-correction check. A true sentence must survive a sweep aimed at a
  // different, false one.
  const src = read(DRAINAGE);
  assert.ok(
    src.includes("over 50 inches of rain per year"),
    "the English statewide claim is true and must stay"
  );
  assert.ok(
    src.includes("más de 50 pulgadas de lluvia al año"),
    "the Spanish statewide claim is true and must stay"
  );
});

// =============================================================================
// 3. THE HUMIDITY FIGURE WAS DELIBERATELY LEFT ALONE.
// =============================================================================
// It is published but unsourced. Leaving it is the instruction ("do not delete
// a claim that may well be true"), and these tests pin that decision so a later
// pass does not quietly invent a source for it or silently drop it.

test("the published humidity figure is still present and still unsourced", () => {
  const html = read(ROI);
  assert.ok(html.includes("74% average humidity"), "the claim must not be deleted");
  assert.ok(
    html.includes("Average humidity 74%"),
    "the soffit-tab humidity claim must not be deleted either"
  );
});

test("no humidity constant has been added without a source", () => {
  const mod = read("lib/climate-stats.js");
  const live = mod.replace(/\/\*[\s\S]*?\*\//g, "").replace(/^\s*\/\/.*$/gm, "");
  assert.ok(
    !/export const .*HUMIDITY/i.test(live),
    "do not publish a humidity constant until it has a real source and a date"
  );
});
