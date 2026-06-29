import { NextResponse } from "next/server";

// Permanently removed routes. Peak 301 / roof rejuvenation was dropped as a service
// on 2026-06-28. These return HTTP 410 Gone (a status, not a redirect) so Google and
// Bing recrawl and deindex them. Hard delete by operator decision, no 301 redirects.
const GONE_PATHS = new Set([
  "/peak-301",
  "/es/peak-301-rejuvenecimiento-techo-tampa",
  "/insurance-resource-center",
  "/es/centro-recursos-seguros",
  "/blog/peak-301-roof-rejuvenation-tampa",
  "/blog/peak-301-vs-roof-maxx-tampa",
  "/es/blog/peak-301-roof-rejuvenation-tampa",
  "/es/blog/peak-301-vs-roof-maxx-tampa",
]);

// Inject the request pathname as a header so the root Server Component layout can
// read the current URL and emit the correct <html lang>. App Router layouts have
// no direct pathname access; header injection is the supported pattern.
export function middleware(request) {
  const pathname = request.nextUrl.pathname;
  const normalized =
    pathname.length > 1 && pathname.endsWith("/") ? pathname.slice(0, -1) : pathname;
  if (GONE_PATHS.has(normalized)) {
    return new NextResponse("410 Gone. This page has been permanently removed.", {
      status: 410,
      headers: { "Content-Type": "text/plain; charset=utf-8" },
    });
  }

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-pathname", pathname);
  return NextResponse.next({ request: { headers: requestHeaders } });
}

export const config = {
  // Page routes only. Exclude framework internals, the API, the IndexNow key file,
  // llms files, and static assets so middleware never touches non-HTML responses.
  matcher: [
    "/((?!_next/static|_next/image|api|favicon.ico|robots.txt|sitemap.xml|manifest.json|estimator.html|roi-calculator.html|llms.txt|llms-full.txt|llms/|10705cc24faf98deedd312e024e43e53.txt|images/|og/|documents/).*)",
  ],
};
