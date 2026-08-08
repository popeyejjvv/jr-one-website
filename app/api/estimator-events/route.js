import { NextResponse } from "next/server";

// =============================================================================
// JR One, Estimator funnel events
// =============================================================================
// WHY THIS EXISTS
// public/estimator.html has fired funnel events since it was built, through a
// trackEvent() helper that does `window.dataLayer.push({event: name, ...})`.
// That is the Google Tag MANAGER convention. This site does not load a GTM
// container; it loads gtag.js directly (estimator.html line 34,
// googletagmanager.com/gtag/js?id=G-HY6GK76P44). gtag.js only consumes
// `arguments` objects pushed by the gtag() function, so a plain object with an
// `event` key is ignored. Verified 2026-08-07: grep for "GTM-" across app/,
// public/ and components/ returns nothing, and there is no gtag("event", ...)
// call anywhere in the repo.
//
// Net effect: every estimator funnel event ever fired went into a JavaScript
// array and stopped there. There is no denominator for "how many people used
// the estimator", which is why 12 BuilderPrime records could not be compared
// against anything.
//
// estimator.html now calls gtag("event", ...) properly AND posts here. This
// endpoint is the copy this repo controls, so the denominator exists even if
// the GA4 property behind G-HY6GK76P44 turns out to be inactive. Whether that
// property is live is [FIELD - UNVERIFIED, ask Popeye]: the measurement id is
// present in the page source, but no GA4 or Search Console credential exists
// anywhere on this machine (checked every .env under ~/Desktop and ~/.jrone,
// plus ~/.jarvis/keys.json, which holds only jarvis_auth_token).
//
// STORAGE: console.log only. Vercel retains function logs, which is enough to
// count a funnel. Deliberately no database and no file write, because this
// runs on serverless where a local file does not persist and would give a
// false sense of durability. If a permanent counter is wanted, that is a
// Supabase table and a separate decision.
// =============================================================================

// ALLOWED_EVENTS and sanitizeEventParams live in @/lib/estimator-lead so the
// tests can import them; this route cannot be imported by node --test because
// next/server does not resolve outside the Next bundler.
import { ALLOWED_EVENTS, sanitizeEventParams } from "@/lib/estimator-lead";

const ALLOWED_ORIGINS = new Set([
  "https://jronegutters.com",
  "https://www.jronegutters.com",
]);

const RATE_LIMIT_MAX = 40; // a full funnel is ~10 events; 40 allows retries
const RATE_LIMIT_WINDOW_MS = 60_000;
const rateLimitMap = new Map();

function isAllowedOrigin(request) {
  const origin = request.headers.get("origin");
  const referer = request.headers.get("referer") || "";
  if (origin && ALLOWED_ORIGINS.has(origin)) return true;
  for (const allowed of ALLOWED_ORIGINS) {
    if (referer.startsWith(allowed)) return true;
  }
  return false;
}

function getClientIp(request) {
  const xff = request.headers.get("x-forwarded-for");
  if (xff) return xff.split(",")[0].trim();
  return request.headers.get("x-real-ip") || "unknown";
}

function checkRateLimit(ip) {
  const now = Date.now();
  const record = rateLimitMap.get(ip);
  if (!record || now > record.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return true;
  }
  if (record.count >= RATE_LIMIT_MAX) return false;
  record.count++;
  return true;
}

function maybeCleanupRateLimitMap() {
  if (rateLimitMap.size < 1000) return;
  const now = Date.now();
  for (const [ip, record] of rateLimitMap.entries()) {
    if (now > record.resetAt) rateLimitMap.delete(ip);
  }
}

export async function POST(request) {
  try {
    if (!isAllowedOrigin(request)) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }
    maybeCleanupRateLimitMap();
    if (!checkRateLimit(getClientIp(request))) {
      return NextResponse.json({ error: "Too many requests" }, { status: 429 });
    }

    const body = await request.json();
    const event = String(body?.event || "").slice(0, 64);
    if (!ALLOWED_EVENTS.has(event)) {
      return NextResponse.json({ error: "Unknown event" }, { status: 400 });
    }

    const params = sanitizeEventParams(body?.params);
    // One line per event, machine-greppable. Counting the funnel is
    // `grep ESTIMATOR_EVENT` over the Vercel function logs.
    console.log(
      `ESTIMATOR_EVENT ${event} ${JSON.stringify({
        sid: String(body?.sid || "").slice(0, 40),
        ts: new Date().toISOString(),
        ...params,
      })}`
    );
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Estimator event error:", err);
    // Never fail the caller. Analytics must not be able to break the page.
    return NextResponse.json({ ok: false }, { status: 200 });
  }
}
