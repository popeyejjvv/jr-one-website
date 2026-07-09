import { NextResponse } from "next/server";

// Inject the request pathname as a header so the root Server Component layout can
// read the current URL and emit the correct <html lang>. App Router layouts have
// no direct pathname access; header injection is the supported pattern.
export function middleware(request) {
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
