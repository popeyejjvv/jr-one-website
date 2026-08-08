// =============================================================================
// Tampa Bay climate statistics, single source of truth
// =============================================================================
// WHY THIS FILE EXISTS
// The site publishes climate figures to customers as facts: annual rainfall,
// average humidity, and the length of hurricane season. They were typed by hand
// into page copy and into public/roi-calculator.html, with no record of where
// any of them came from or when anyone last checked. Two were wrong.
//
// The pattern is deliberately the same as lib/review-stats.js: the value, the
// source it was read from, and the date a human confirmed it, all in one place,
// with a test that fails if any published surface drifts away from it.
//
// ── HOW THIS IS ENFORCED ─────────────────────────────────────────────────────
// public/roi-calculator.html is a STATIC asset. It is allow-listed in
// middleware.js:30, is deliberately unlinked, and is NOT processed by
// `npm run build` (manual-steps.md:111), so it cannot import this module.
// Enforcement therefore works the way lib/review-stats.js already enforces the
// rating: tests/climate-stats.test.js reads the published surfaces as text and
// fails if the string does not match the constant below. Changing a number here
// without changing the page, or the page without changing here, is a red build.
//
// ── WHAT WAS WRONG, AND WHAT IT IS NOW ───────────────────────────────────────
//
// 1. HURRICANE SEASON. public/roi-calculator.html said "10-month hurricane
//    season". The official Atlantic hurricane season is June 1 to November 30,
//    which is SIX months. Not a rounding difference: the published figure was
//    two thirds longer than the real season, in a box arguing urgency to a
//    homeowner. CHECKED 2026-08-08 against NOAA's National Hurricane Center,
//    which states: "The Atlantic hurricane season runs from June 1 to
//    November 30."
//      https://www.nhc.noaa.gov/climo/
//
// 2. TAMPA RAINFALL. Two surfaces said Tampa gets "50+" inches of rain a year.
//    The NOAA/NCEI 1991-2020 annual precipitation normal for TAMPA INTL AP
//    (station USW00012842) is 49.48 inches, which is under 50, so "50+" was not
//    supported. CHECKED 2026-08-08 by reading the NCEI normals service
//    directly:
//      curl "https://www.ncei.noaa.gov/access/services/data/v1?dataset=normals-annualseasonal-1991-2020&stations=USW00012842&format=json&dataTypes=ANN-PRCP-NORMAL"
//      -> [{"STATION":"USW00012842","ANN-PRCP-NORMAL":"   49.48"}]
//    Neighbouring first-order stations, same service, same period, for context:
//      ST PETERSBURG AP        USW00092806   46.65 in
//      SARASOTA BRADENTON AP   USW00012871   49.05 in
//      ST PETERSBURG INTL AP   USW00012873   53.62 in
//
// ── WHAT WAS DELIBERATELY NOT CHANGED ────────────────────────────────────────
//
// FLORIDA STATEWIDE RAINFALL stays as it is. app/drainage-assessment/page.jsx
// says Florida gets "over 50 inches of rain per year", and that is TRUE: the
// NOAA NCEI Climate at a Glance statewide series for Florida, January-December,
// 1991-2020, averages 54.42 inches across all 30 years. CHECKED 2026-08-08:
//   https://www.ncei.noaa.gov/access/monitoring/climate-at-a-glance/statewide/time-series/8/pcp/12/12/1991-2020/data.json
// A statewide claim and a Tampa claim are DIFFERENT claims. Only the two that
// named Tampa were corrected. Deleting a true statewide figure because a
// different figure about a different place was wrong would be over-correction.
//
// AVERAGE HUMIDITY is NOT recorded here, on purpose. The site publishes "74%
// average humidity" and "mornings peak at 88%". No authoritative NOAA figure
// for Tampa mean relative humidity could be reached on 2026-08-08 (the NWS
// Tampa Bay climate pages do not publish it in text, and the NCEI Comparative
// Climatic Data relative-humidity table returned 404). The distinction that
// decides the claim is whether 74% is an ANNUAL MEAN, a MORNING MAXIMUM, or an
// AFTERNOON MINIMUM, and those differ substantially. So the number was left
// exactly as published rather than guessed at, and it is on the list of items
// only Popeye or a fresh source can settle. Do NOT add it here until it has a
// real source and a date.
//
// ── HOW TO REFRESH ───────────────────────────────────────────────────────────
// Re-read the source named beside a value, update the value and
// CLIMATE_STATS_CHECKED_ON together, then run
//   node --test tests/climate-stats.test.js
// =============================================================================

/** The day a human last confirmed every value in this file against its source. */
export const CLIMATE_STATS_CHECKED_ON = "2026-08-08";

// -- Hurricane season ---------------------------------------------------------

/** Length of the official Atlantic hurricane season, in months. */
export const HURRICANE_SEASON_MONTHS = 6;

/** How the season is written in customer-facing copy. */
export const HURRICANE_SEASON_LABEL = "6-month hurricane season";

/** The official dates, for copy that wants to spell them out. */
export const HURRICANE_SEASON_START = "June 1";
export const HURRICANE_SEASON_END = "November 30";

/** Where the dates above were read from. */
export const HURRICANE_SEASON_SOURCE_URL = "https://www.nhc.noaa.gov/climo/";
export const HURRICANE_SEASON_SOURCE_NAME =
  "NOAA National Hurricane Center, Tropical Cyclone Climatology";

// -- Rainfall -----------------------------------------------------------------

/** NOAA/NCEI 1991-2020 annual precipitation normal for Tampa Intl, in inches. */
export const TAMPA_ANNUAL_RAINFALL_INCHES = 49.48;

/** NOAA/NCEI station the figure above belongs to. */
export const TAMPA_RAINFALL_STATION_ID = "USW00012842";
export const TAMPA_RAINFALL_STATION_NAME = "TAMPA INTL AP";
export const TAMPA_RAINFALL_NORMALS_PERIOD = "1991-2020";

/**
 * How Tampa rainfall is written in customer-facing copy.
 *
 * "about 50 inches" rather than "50+ inches": 49.48 is under fifty, so the plus
 * sign was the whole defect. Rounding to "about 50" keeps the point the copy is
 * making, which is that Tampa gets a lot of rain, without publishing a floor the
 * data does not clear.
 */
export const TAMPA_ANNUAL_RAINFALL_LABEL = "about 50 inches";

export const TAMPA_RAINFALL_SOURCE_URL =
  "https://www.ncei.noaa.gov/access/services/data/v1?dataset=normals-annualseasonal-1991-2020&stations=USW00012842&format=json&dataTypes=ANN-PRCP-NORMAL";
export const TAMPA_RAINFALL_SOURCE_NAME =
  "NOAA NCEI U.S. Climate Normals 1991-2020, annual precipitation normal";

/**
 * Florida STATEWIDE mean annual precipitation, inches, 1991-2020.
 *
 * A different claim from the Tampa figure above, with a different source, kept
 * separate so nobody conflates them. This one supports the existing
 * "Florida dumps over 50 inches of rain per year" copy on the drainage page,
 * which is why that copy was left alone.
 */
export const FLORIDA_STATEWIDE_ANNUAL_RAINFALL_INCHES = 54.42;
export const FLORIDA_STATEWIDE_RAINFALL_SOURCE_URL =
  "https://www.ncei.noaa.gov/access/monitoring/climate-at-a-glance/statewide/time-series/8/pcp/12/12/1991-2020/data.json";
export const FLORIDA_STATEWIDE_RAINFALL_SOURCE_NAME =
  "NOAA NCEI Climate at a Glance, Florida statewide January-December precipitation, 1991-2020";

/**
 * Neighbouring stations, same service and period. Recorded as evidence rather
 * than published: they are what makes the Tampa figure a read rather than a
 * number somebody typed, and they show the spread across the service area.
 */
export const TAMPA_BAY_RAINFALL_STATIONS = Object.freeze({
  USW00012842: { name: "TAMPA INTL AP", inches: 49.48 },
  USW00092806: { name: "ST PETERSBURG AP", inches: 46.65 },
  USW00012871: { name: "SARASOTA BRADENTON AP", inches: 49.05 },
  USW00012873: { name: "ST PETERSBURG INTL AP", inches: 53.62 },
});
