// =============================================================================
// Google review statistics, single source of truth
// =============================================================================
// WHY THIS FILE EXISTS
// The rating and review count used to be typed by hand into ten different
// files. They rendered on roughly 296 pages plus one served text file, and
// nothing recorded where the numbers came from or when anyone last looked. The
// rating was right and the count was stale: every page said 55 reviews while
// the live profile said 59. decisions-log.md:283 had already flagged the claim
// as "carried but NOT verified" on 2026-08-07 without resolving it.
//
// Every page and every generated file now reads these constants. Changing the
// number is a one-line edit here, and tests/review-stats.test.js fails if any
// page or the llms-full.txt asset drifts away from them.
//
// ── THE SOURCE ───────────────────────────────────────────────────────────────
// Google Business Profile for JR One Aluminum LLC - Gutter Repair &
// Installation, 3420 W Cherry St, Tampa, FL 33607.
//
//   place_id: ChIJJ5X3uyzDwogRjqf87jhh9tQ   (same id as app/layout.js:48)
//   URL:      https://www.google.com/maps/place/?q=place_id:ChIJJ5X3uyzDwogRjqf87jhh9tQ
//
// CHECKED 2026-08-07. Three independent reads, all agreeing on 4.9 and 59:
//
//   1. The live Google Maps listing, rendered in a browser and read off the
//      page text: "JR One Aluminum LLC - Gutter Repair & Installation / 4.9 /
//      (59)" and, in the review summary block, "4.9 / 59 reviews".
//   2. Local Falcon, which stores the GBP location record:
//      GET https://api.localfalcon.com/v1/locations/list/
//      returned "rating":"4.900", "reviews":"59" for this place_id.
//   3. SerpAPI google_maps engine, a scrape run from third-party infrastructure
//      rather than this machine: rating 4.9, reviews 59.
//
// Source 3 also returned the per-star histogram, which is the strongest single
// piece of evidence because it reconciles arithmetically rather than merely
// agreeing:
//      5 stars: 57,  4 stars: 1,  3 stars: 1,  2 stars: 0,  1 star: 0
//      sum = 59, weighted mean = 4.9492, displayed as 4.9
// REVIEW_STAR_HISTOGRAM below preserves it, and the test re-derives both
// numbers from it. That is what makes this a recorded source rather than a
// number somebody typed.
//
// The Google Places API was tried first and is NOT usable here: the legacy
// endpoint returns REQUEST_DENIED and Places API (New) returns 403
// PERMISSION_DENIED for the only Google key on this machine
// (GOOGLE_PAGESPEED_API_KEY). Re-checking uses source 2 or 3.
//
// ── HOW TO REFRESH ───────────────────────────────────────────────────────────
// Re-read the profile, then update REVIEW_RATING, REVIEW_COUNT,
// REVIEW_STAR_HISTOGRAM and REVIEW_STATS_CHECKED_ON together, and run
//   node --test tests/review-stats.test.js
// The test refuses a histogram that does not reconcile to the published pair,
// so a number cannot be changed without its evidence being changed with it.
//
// ── WHAT MUST NOT HAPPEN ─────────────────────────────────────────────────────
// These values must NOT be put back into JSON-LD. aggregateRating was removed
// site-wide on 2026-05-26 in commit 6b2a974 because Google's self-serving
// review policy makes a business's own LocalBusiness/Organization markup
// ineligible for the star rich result. Stars in search results come from the
// Google Business Profile itself. Re-adding it earns nothing and risks a
// structured-data penalty. See app/layout.js:63.
// =============================================================================

/** The rating as Google displays it. */
export const REVIEW_RATING = "4.9";

/** The scale Google rates on. Used wherever the rating is shown as X / Y. */
export const REVIEW_RATING_SCALE = "5.0";

/** Total published reviews on the profile. */
export const REVIEW_COUNT = 59;

/** The place this describes. Matches app/layout.js:48. */
export const REVIEW_PLACE_ID = "ChIJJ5X3uyzDwogRjqf87jhh9tQ";

/** Where the numbers above were read from. */
export const REVIEW_SOURCE_URL =
  "https://www.google.com/maps/place/?q=place_id:ChIJJ5X3uyzDwogRjqf87jhh9tQ";

/** The day a human last confirmed these against the live profile. */
export const REVIEW_STATS_CHECKED_ON = "2026-08-07";

/**
 * The per-star breakdown behind the two numbers, kept so the claim carries its
 * own proof. The test re-derives REVIEW_COUNT and REVIEW_RATING from this.
 */
export const REVIEW_STAR_HISTOGRAM = { 1: 0, 2: 0, 3: 1, 4: 1, 5: 57 };

/** The public profile link the site sends visitors to. */
export const REVIEW_PROFILE_URL =
  "https://www.google.com/maps/place/?q=place_id:ChIJJ5X3uyzDwogRjqf87jhh9tQ";

// ── Preformatted strings, so no page reinvents the phrasing ─────────────────

/** "4.9" */
export const ratingText = () => REVIEW_RATING;

/** "4.9 / 5.0 from 59 reviews" */
export const ratingWithScaleAndCount = (lang) =>
  lang === "es"
    ? `${REVIEW_RATING} / ${REVIEW_RATING_SCALE} de ${REVIEW_COUNT} reseñas`
    : `${REVIEW_RATING} / ${REVIEW_RATING_SCALE} from ${REVIEW_COUNT} reviews`;

/** "4.9 on Google" / "4.9 en Google" */
export const ratingOnGoogle = (lang) =>
  lang === "es" ? `${REVIEW_RATING} en Google` : `${REVIEW_RATING} on Google`;

/** "Read all 59 reviews on Google" / "Lea las 59 reseñas en Google" */
export const readAllReviewsCta = (lang) =>
  lang === "es"
    ? `Lea las ${REVIEW_COUNT} reseñas en Google`
    : `Read all ${REVIEW_COUNT} reviews on Google`;

/** "Google rating from 59 reviews" / "Calificación en Google de 59 reseñas" */
export const googleRatingFromCount = (lang) =>
  lang === "es"
    ? `Calificación en Google de ${REVIEW_COUNT} reseñas`
    : `Google rating from ${REVIEW_COUNT} reviews`;
