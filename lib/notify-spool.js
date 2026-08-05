// File an operator notice into the JR One notification spool.
//
// WHY: this site used to email info@jronegutters.com on every spam-blocked form
// submission, tagged [SPAM BLOCKED], so a false positive stayed rescuable. The
// rescue is worth keeping; the interrupt is not. Popeye named those messages
// specifically when he said the automated volume had become unreadable.
//
// So blocked leads now spool. They arrive in the once-daily operator digest as
// a counted line, same day, reviewable - just not as their own email.
//
// REAL leads are untouched and still email instantly. A customer asking for a
// quote is the one thing on this site that can cost money by waiting.
//
// Deliberately does NOT hold the Supabase service key: it posts to the
// platform's guarded /api/notify/ingest route with a narrow bearer token that
// can do nothing except append a notification.

const INGEST_TIMEOUT_MS = 5000;

/**
 * @returns {Promise<{ok: boolean, error?: string}>} never throws
 */
export async function spoolNotice({
  source,
  tag,
  subject,
  body = "",
  severity = "info",
  url,
  // append: true means each call adds a line to the same digest entry instead
  // of overwriting it. Use for lists of distinct events (blocked leads); leave
  // false for a recurring condition, where only the latest state matters.
  append = false,
}) {
  const base = process.env.PLATFORM_URL;
  const token = process.env.NOTIFY_INGEST_TOKEN;
  if (!base || !token) {
    return { ok: false, error: "PLATFORM_URL / NOTIFY_INGEST_TOKEN not configured" };
  }

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), INGEST_TIMEOUT_MS);
  try {
    const res = await fetch(`${base.replace(/\/$/, "")}/api/notify/ingest`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ source, tag, subject, body, severity, url, append }),
      signal: controller.signal,
    });
    if (!res.ok) return { ok: false, error: `ingest returned ${res.status}` };
    return { ok: true };
  } catch (err) {
    // A spool failure must never change what the visitor sees, and must never
    // turn into a 500 on a lead form.
    return { ok: false, error: String(err?.message || err) };
  } finally {
    clearTimeout(timer);
  }
}
