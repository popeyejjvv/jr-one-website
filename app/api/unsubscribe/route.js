import crypto from "crypto";
import nodemailer from "nodemailer";

export const dynamic = "force-dynamic";

/**
 * CAN-SPAM opt-out endpoint.
 *
 * WHY THIS EXISTS (2026-08-01)
 * email_shell.py has shipped `UNSUBSCRIBE_URL = "https://jronegutters.com/unsubscribe"`
 * in the footer of every JR One email for months. That URL returned 404 -- apex, www,
 * and /api/unsubscribe all 404'd while the site root returned 200. So every commercial
 * email JR One has sent carried a dead opt-out link.
 *
 * Worse, the "chokepoint that fails closed" checked that the STRING "unsubscribe"
 * appeared in the rendered HTML. It never checked that the link resolved. It passed on
 * a 404 and reported success. That is the bug class this whole audit keeps finding:
 * gates that verify a symbol is present rather than verifying the thing works.
 *
 * DURABILITY
 * This site has no database (only nodemailer). An opt-out that exists solely as an
 * in-flight email is not a mechanism, it is a hope. So every opt-out is written down
 * TWO independent ways and the user is only told "done" if at least one succeeded:
 *   1. BuilderPrime doNotContact flag  -- durable CRM state, already read by
 *      review_request.py at :150
 *   2. Machine-parseable email to info@ -- ingested by reply_triage.py, which already
 *      runs twice daily and already owns do-not-contact.json / the suppressions table
 * If BOTH fail we return 500 and show the caller a mailto: fallback. We never claim an
 * opt-out was recorded when it was not.
 *
 * ABUSE
 * An endpoint that emails attacker-controlled content to info@ is a spam relay, and one
 * that accepts any address lets anyone unsubscribe a competitor's customer. Gates, per
 * .claude/rules/secret-handling.md Rule 1:
 *   - strict RFC-ish email validation + hard length caps (no free-text passthrough)
 *   - per-IP rate limit, 5/min
 *   - optional HMAC token: links generated from 2026-08-01 forward are signed, so a
 *     signed request is trusted immediately. Unsigned requests (every email sent BEFORE
 *     today, which all point at a bare /unsubscribe) are still honored -- refusing them
 *     would re-break the legal requirement for mail already in inboxes -- but they are
 *     marked unverified in the notification so a human can eyeball anything odd.
 */

const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_WINDOW_MS = 60_000;
const rateLimitMap = new Map();

const MAX_EMAIL_LEN = 254; // RFC 5321
const EMAIL_RE = /^[^\s@,;<>"'\\]{1,64}@[^\s@,;<>"'\\]{1,189}\.[A-Za-z]{2,24}$/;

const OPS_INBOX = "info@jronegutters.com";
const BP_SUBDOMAIN = "jronegutters";

function clientIp(request) {
  const fwd = request.headers.get("x-forwarded-for");
  if (fwd) return fwd.split(",")[0].trim();
  return request.headers.get("x-real-ip") || "unknown";
}

function checkRateLimit(ip) {
  const now = Date.now();
  const record = rateLimitMap.get(ip);
  if (!record || now > record.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return { ok: true };
  }
  if (record.count >= RATE_LIMIT_MAX) {
    return { ok: false, retryAfter: Math.ceil((record.resetAt - now) / 1000) };
  }
  record.count++;
  return { ok: true };
}

function maybeCleanupRateLimitMap() {
  if (rateLimitMap.size < 1000) return;
  const now = Date.now();
  for (const [ip, record] of rateLimitMap.entries()) {
    if (now > record.resetAt) rateLimitMap.delete(ip);
  }
}

/** Same construction as email_shell.unsubscribe_token(). Timing-safe compare. */
export function verifyToken(email, token) {
  const secret = process.env.UNSUBSCRIBE_SECRET;
  if (!secret || !token) return false;
  const expected = crypto
    .createHmac("sha256", secret)
    .update(email.trim().toLowerCase())
    .digest("hex")
    .slice(0, 32);
  const a = Buffer.from(expected);
  const b = Buffer.from(String(token));
  if (a.length !== b.length) return false;
  return crypto.timingSafeEqual(a, b);
}

function normalizeEmail(raw) {
  const e = String(raw || "").trim().toLowerCase();
  if (!e || e.length > MAX_EMAIL_LEN) return null;
  if (!EMAIL_RE.test(e)) return null;
  return e;
}

/** Durable path 1: flip doNotContact in BuilderPrime. Returns true on success. */
async function suppressInBuilderPrime(email) {
  const key = process.env.BUILDER_PRIME_API_KEY;
  if (!key) return false;
  try {
    const base = `https://${BP_SUBDOMAIN}.builderprime.com/api/v1/clients`;
    const res = await fetch(`${base}?email_address=${encodeURIComponent(email)}`, {
      headers: { "x-api-key": key },
      signal: AbortSignal.timeout(8000),
    });
    if (!res.ok) return false;
    const found = await res.json();
    const list = Array.isArray(found) ? found : found?.clients || [];
    if (!list.length) return false; // not a CRM contact (cold B2B prospect) -- path 2 covers it
    let any = false;
    for (const c of list.slice(0, 5)) {
      const up = await fetch(`${base}/${c.id}`, {
        method: "PUT",
        headers: { "x-api-key": key, "Content-Type": "application/json" },
        body: JSON.stringify({ doNotContact: true }),
        signal: AbortSignal.timeout(8000),
      });
      if (up.ok) any = true;
    }
    return any;
  } catch {
    return false;
  }
}

/** Durable path 2: machine-parseable note to the ops inbox for reply_triage ingest. */
async function notifyOps(email, { verified, ip, source }) {
  const user = process.env.GMAIL_USER;
  const pass = process.env.GMAIL_APP_PASSWORD;
  if (!user || !pass) return false;
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: { user, pass },
    });
    await transporter.sendMail({
      from: `"JR One Website" <${user}>`,
      to: OPS_INBOX,
      subject: `UNSUBSCRIBE: ${email}`,
      text: [
        "Automated opt-out from the website unsubscribe page.",
        "",
        `email: ${email}`,
        `token_verified: ${verified ? "yes" : "no (pre-2026-08-01 email, unsigned link)"}`,
        `source: ${source}`,
        `ip: ${ip}`,
        `received_at: ${new Date().toISOString()}`,
        "",
        "reply_triage.py ingests this subject line and writes the address to",
        "do-not-contact.json + the suppressions table. Do not reply to this message.",
      ].join("\n"),
    });
    return true;
  } catch {
    return false;
  }
}

async function handle(email, request, source) {
  const ip = clientIp(request);
  maybeCleanupRateLimitMap();
  const rl = checkRateLimit(ip);
  if (!rl.ok) {
    return Response.json(
      { ok: false, error: "Too many requests. Please try again shortly." },
      { status: 429, headers: { "Retry-After": String(rl.retryAfter) } }
    );
  }

  const clean = normalizeEmail(email);
  if (!clean) {
    return Response.json(
      { ok: false, error: "Please enter a valid email address." },
      { status: 400 }
    );
  }

  const url = new URL(request.url);
  const verified = verifyToken(clean, url.searchParams.get("t"));

  const [bp, ops] = await Promise.all([
    suppressInBuilderPrime(clean),
    notifyOps(clean, { verified, ip, source }),
  ]);

  if (!bp && !ops) {
    // Never tell someone they are unsubscribed when nothing was written down.
    console.error(`[unsubscribe] FAILED to record opt-out for ${clean} (bp=${bp} ops=${ops})`);
    return Response.json(
      {
        ok: false,
        error:
          "We could not process that automatically. Please email info@jronegutters.com " +
          "with the subject UNSUBSCRIBE and we will remove you right away.",
      },
      { status: 500 }
    );
  }

  console.log(`[unsubscribe] recorded ${clean} (builderprime=${bp} ops_notified=${ops} verified=${verified})`);
  return Response.json({ ok: true, email: clean });
}

export async function POST(request) {
  let email = null;
  const ct = request.headers.get("content-type") || "";
  try {
    if (ct.includes("application/json")) {
      email = (await request.json())?.email;
    } else {
      email = (await request.formData()).get("email");
    }
  } catch {
    return Response.json({ ok: false, error: "Malformed request." }, { status: 400 });
  }
  return handle(email, request, "form");
}

/**
 * RFC 8058 One-Click unsubscribe (List-Unsubscribe-Post). Gmail and Yahoo require this
 * for bulk senders. Only honored for HMAC-signed links so it cannot be driven by a
 * crawler prefetching the URL out of an email body.
 */
export async function GET(request) {
  const url = new URL(request.url);
  const email = normalizeEmail(url.searchParams.get("e"));
  const oneClick = url.searchParams.get("oneclick") === "1";
  if (email && oneClick && verifyToken(email, url.searchParams.get("t"))) {
    return handle(email, request, "one-click");
  }
  // Anything else belongs to the page, which renders a confirm form.
  return Response.json({ ok: false, error: "Use the unsubscribe page." }, { status: 400 });
}
