/**
 * JR One , Motion utilities.
 * Mirrors CSS easing variables from app/tokens.css.
 * Per Emil Kowalski: built-in CSS easings are too weak; use strong custom curves.
 */

// Easing curves (Emil-strong)
export const EASE = {
  out: "cubic-bezier(0.23, 1, 0.32, 1)",
  inOut: "cubic-bezier(0.77, 0, 0.175, 1)",
  drawer: "cubic-bezier(0.32, 0.72, 0, 1)",
};

// Durations (Emil rule: UI under 300ms)
export const DUR = {
  press: 120,
  fast: 160,
  base: 200,
  slow: 260,
  modal: 320,
};

// Common tactile-press style helper for buttons.
// Emil rule: "Buttons must feel responsive. Add transform: scale(0.97) on :active."
export const tactilePress = {
  transition: `transform ${DUR.press}ms ${EASE.out}`,
};

// Stagger delay calculator. Keep delays short (30-80ms between items) per Emil.
export const stagger = (i, delay = 50) => `${i * delay}ms`;

// useReducedMotion-aware helper (read inside a component).
export const reducedMotionQuery = "(prefers-reduced-motion: reduce)";
