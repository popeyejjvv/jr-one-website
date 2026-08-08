// =============================================================================
// Star rating geometry
// =============================================================================
// The arithmetic behind the partial star in lib/icons.jsx StarRating.
//
// WHY THIS IS A SEPARATE .js FILE
// It is the one part of the star display that can be wrong in a way a human
// would not notice: a fill width that is close but not right still LOOKS like a
// rating. It therefore needs a test. Nothing in tests/ can import a .jsx file
// (Node does not transpile JSX, and every existing test that touches a .jsx
// reads it as TEXT, for example tests/review-stats.test.js:137-141). So the
// arithmetic lives here, in plain JavaScript, and both the component and
// tests/star-rating.test.js import THIS function.
//
// That is deliberate: a test that pasted a copy of the formula would keep
// passing after the component changed, which is the exact flaw recorded against
// tests/estimator-utils.test.js in tests/homepage-email-capture.test.js:31-33.
//
// WHY PIXELS AND NOT A PERCENTAGE
// A row of stars is not solid: it is `outOf` glyphs separated by `gap`. A width
// expressed as a percentage of the whole row would smear those gaps into the
// fill, so a 4.9 would not land nine tenths across the fifth star, it would
// land slightly past it. Stars sit at a pitch of (size + gap), so the first
// `full` glyphs end at exactly full * (size + gap), and the partial glyph adds
// frac * size on top. The gap AFTER the partial star is never included, because
// nothing is drawn in it.
// =============================================================================

/**
 * Width, in CSS pixels, that the filled layer must be clipped to so that a row
 * of `outOf` stars reads as `rating`.
 *
 * @param {object} args
 * @param {number} args.rating  the rating to draw, for example 4.9
 * @param {number} [args.outOf] the scale, normally 5
 * @param {number} [args.size]  the width of one star glyph in pixels
 * @param {number} [args.gap]   the gap between glyphs in pixels
 * @returns {number} clip width in pixels, always between 0 and the full row
 */
export function starFillWidthPx({ rating, outOf = 5, size = 14, gap = 2 } = {}) {
  const scale = Number(outOf);
  const glyph = Number(size);
  const space = Number(gap);

  // A nonsensical scale cannot produce a meaningful width. Return 0 rather than
  // NaN: NaN would serialise into the style attribute as "NaNpx", which
  // browsers ignore, and an ignored width means the filled layer covers
  // EVERYTHING, drawing a perfect score. Failing to empty is the safe direction
  // for a claim shown to customers.
  if (!Number.isFinite(scale) || scale <= 0) return 0;
  if (!Number.isFinite(glyph) || glyph <= 0) return 0;
  const g = Number.isFinite(space) && space > 0 ? space : 0;

  const raw = Number(rating);
  if (!Number.isFinite(raw)) return 0;

  const value = Math.max(0, Math.min(scale, raw));
  const full = Math.floor(value);
  const frac = value - full;

  const width = full * (glyph + g) + frac * glyph;

  // Cap at the real row width. A perfect score has `scale` full glyphs and
  // therefore `scale` pitches, but the LAST pitch includes a trailing gap that
  // no glyph occupies, so the raw formula overshoots by one gap at 5.0. Clipping
  // wider than the content is visually harmless, but it would make "a full
  // rating fills exactly the row" untestable, and an untestable invariant is one
  // that quietly stops holding.
  return Math.min(width, starRowWidthPx({ outOf: scale, size: glyph, gap: g }));
}

/**
 * Total width of the whole star row, for comparison in tests and for anyone
 * reasoning about whether a fill width is plausible.
 */
export function starRowWidthPx({ outOf = 5, size = 14, gap = 2 } = {}) {
  const scale = Number(outOf);
  const glyph = Number(size);
  const space = Number(gap);
  if (!Number.isFinite(scale) || scale <= 0) return 0;
  if (!Number.isFinite(glyph) || glyph <= 0) return 0;
  const g = Number.isFinite(space) && space > 0 ? space : 0;
  return scale * glyph + (scale - 1) * g;
}
