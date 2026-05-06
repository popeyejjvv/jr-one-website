// =============================================================================
// JR One , Business Hours Gate (used by after-hours voice callback layer)
// =============================================================================
// Pure utility , no I/O. Determines whether a given moment falls outside
// JR One's standard business hours in America/New_York (DST-aware via
// Date.toLocaleString with the IANA timeZone).
//
// Business hours: Monday-Friday 7:00am-5:59pm ET.
// After-hours:    Monday-Friday before 7am OR 6pm or later, plus all of
//                 Saturday and all of Sunday.
//
// Used by:
//   app/api/send-lead/route.js
//   app/api/estimator-lead/route.js
// =============================================================================

/**
 * Returns true if the given Date falls outside JR One's business hours.
 * Pass a Date for unit testing; defaults to "now".
 *
 * @param {Date} [date]
 * @returns {boolean}
 */
export function isAfterHours(date = new Date()) {
  // toLocaleString with timeZone is DST-aware: it returns the wall-clock
  // weekday/hour as it actually appears in Eastern Time on the given instant.
  // We use "en-US" to guarantee a stable token format ("Mon", "Tue", etc.).
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/New_York",
    weekday: "short",
    hour: "2-digit",
    hour12: false,
  }).formatToParts(date);

  const weekday = parts.find((p) => p.type === "weekday")?.value || "";
  const hourStr = parts.find((p) => p.type === "hour")?.value || "0";
  // Intl can render midnight as "24" in some locales; normalize to 0.
  let hour = parseInt(hourStr, 10);
  if (hour === 24) hour = 0;

  // Saturday and Sunday: after hours all day
  if (weekday === "Sat" || weekday === "Sun") return true;

  // Weekdays: after hours before 7am or at 6pm and later
  if (hour < 7 || hour >= 18) return true;

  return false;
}

/**
 * Returns true unless the kill switch is engaged.
 * Read at call time so an env-var flip in Vercel takes effect without redeploy.
 *
 * VOICE_AGENT_KILL_SWITCH=1  -> voice disabled
 * any other value (or unset) -> voice enabled
 *
 * @returns {boolean}
 */
export function isVoiceAgentEnabled() {
  return process.env.VOICE_AGENT_KILL_SWITCH !== "1";
}
