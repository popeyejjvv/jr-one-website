import { NextResponse } from "next/server";

// Inject the request pathname as a header so the root Server Component layout can
// read the current URL and emit the correct <html lang>. App Router layouts have
// no direct pathname access; header injection is the supported pattern.
// TEMPORARY HOLD (2026-07-09): the Insurance Resource Center is restored in the
// repo but held from going live pending Herman & Wells review of its Florida
// insurance-statute claims (SB2D/HB1611/SB808/HB815). 307 (temporary) redirect
// its two URLs to the Peak 301 page so existing inbound links stay functional.
// Remove this block to publish the page once legal clears it.
const HELD_REDIRECTS = {
  "/insurance-resource-center": "/peak-301",
  "/es/centro-recursos-seguros": "/es/peak-301-rejuvenecimiento-techo-tampa",
};

export function middleware(request) {
  const held = HELD_REDIRECTS[request.nextUrl.pathname];
  if (held) {
    return NextResponse.redirect(new URL(held, request.url), 307);
  }
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-pathname", request.nextUrl.pathname);
  return NextResponse.next({ request: { headers: requestHeaders } });
}

export const config = {
  // Page routes only. Exclude framework internals, the API, the IndexNow key file,
  // llms files, and static assets so middleware never touches non-HTML responses.
  matcher: [
    "/((?!_next/static|_next/image|api|favicon.ico|robots.txt|sitemap.xml|manifest.json|estimator.html|roi-calculator.html|llms.txt|llms-full.txt|llms/|10705cc24faf98deedd312e024e43e53.txt|images/|og/|documents/).*)",
  ],
};
