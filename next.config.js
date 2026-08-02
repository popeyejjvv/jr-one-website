/** @type {import('next').NextConfig} */
const nextConfig = {
  // ── 301 Redirects: Old URLs → New Routes ──
  async redirects() {
    return [
      // ── 7-Inch Gutters un-merged 2026-06-15 (SEO audit) ──
      // /7-inch-gutters is a live dedicated page again: "7 inch gutters tampa"
      // has its own search demand (ranked pos 13 even while redirected), so it
      // ranks on its own page instead of folding into seamless.

      // ── Old service pages (Google-indexed, still ranking) ──
      // 2026-04-15: /gutter-cleaning now has its own dedicated page + FAQPage schema —
      // removed the 301 that used to redirect it to /service-plans. The /:slug catch-all
      // further down still redirects /gutter-cleaning/* (city subpaths) to /service-plans.
      { source: "/home-maintenance", destination: "/service-plans", permanent: true },
      { source: "/home-maintenance/", destination: "/service-plans", permanent: true },
      { source: "/maintenance", destination: "/service-plans", permanent: true },
      { source: "/maintenance/", destination: "/service-plans", permanent: true },
      { source: "/about-us", destination: "/about", permanent: true },
      { source: "/about-us/", destination: "/about", permanent: true },

      // ── Old blog posts (backlinked, indexed) ──
      { source: "/seamless-vs-sectional-gutters-whats-better", destination: "/seamless-aluminum-gutters", permanent: true },
      { source: "/seamless-vs-sectional-gutters-whats-better/", destination: "/seamless-aluminum-gutters", permanent: true },
      { source: "/why-our-gutter-guard-installation-stands-out-as-the-best-choice-for-your-home", destination: "/gutter-guards", permanent: true },
      { source: "/why-our-gutter-guard-installation-stands-out-as-the-best-choice-for-your-home/", destination: "/gutter-guards", permanent: true },

      // ── 5-inch comparison post slug retired (2026-05-09) ──
      // JR One installs 6-inch and 7-inch only — the old 5-vs-6-vs-7 comparison
      // implied 5-inch was a JR One service. New slug is 6-inch-vs-7-inch only.
      { source: "/blog/5-inch-vs-6-inch-vs-7-inch-gutters", destination: "/blog/6-inch-vs-7-inch-gutters-tampa", permanent: true },
      { source: "/blog/5-inch-vs-6-inch-vs-7-inch-gutters/", destination: "/blog/6-inch-vs-7-inch-gutters-tampa", permanent: true },

      // ── Old /gutter-cleaning/{city}-fl → /areas/{city}/gutter-cleaning ──
      // 2026-04-17: Fixed — was pointing to generic /areas/{city}, now points to
      // the specific service page so Google preserves keyword relevance.
      { source: "/gutter-cleaning/tampa-fl", destination: "/areas/tampa/gutter-cleaning", permanent: true },
      { source: "/gutter-cleaning/tampa-fl/", destination: "/areas/tampa/gutter-cleaning", permanent: true },
      { source: "/gutter-cleaning/clearwater-fl", destination: "/areas/clearwater/gutter-cleaning", permanent: true },
      { source: "/gutter-cleaning/clearwater-fl/", destination: "/areas/clearwater/gutter-cleaning", permanent: true },
      { source: "/gutter-cleaning/st-petersburg-fl", destination: "/areas/st-petersburg/gutter-cleaning", permanent: true },
      { source: "/gutter-cleaning/st-petersburg-fl/", destination: "/areas/st-petersburg/gutter-cleaning", permanent: true },
      { source: "/gutter-cleaning/sarasota-fl", destination: "/areas/sarasota/gutter-cleaning", permanent: true },
      { source: "/gutter-cleaning/sarasota-fl/", destination: "/areas/sarasota/gutter-cleaning", permanent: true },
      { source: "/gutter-cleaning/bradenton-fl", destination: "/areas/bradenton/gutter-cleaning", permanent: true },
      { source: "/gutter-cleaning/bradenton-fl/", destination: "/areas/bradenton/gutter-cleaning", permanent: true },
      { source: "/gutter-cleaning/lakeland-fl", destination: "/areas/lakeland/gutter-cleaning", permanent: true },
      { source: "/gutter-cleaning/lakeland-fl/", destination: "/areas/lakeland/gutter-cleaning", permanent: true },
      { source: "/gutter-cleaning/brandon-fl", destination: "/areas/brandon/gutter-cleaning", permanent: true },
      { source: "/gutter-cleaning/brandon-fl/", destination: "/areas/brandon/gutter-cleaning", permanent: true },
      { source: "/gutter-cleaning/wesley-chapel-fl", destination: "/areas/wesley-chapel/gutter-cleaning", permanent: true },
      { source: "/gutter-cleaning/wesley-chapel-fl/", destination: "/areas/wesley-chapel/gutter-cleaning", permanent: true },
      { source: "/gutter-cleaning/palm-harbor-fl", destination: "/areas/palm-harbor/gutter-cleaning", permanent: true },
      { source: "/gutter-cleaning/palm-harbor-fl/", destination: "/areas/palm-harbor/gutter-cleaning", permanent: true },
      { source: "/gutter-cleaning/riverview-fl", destination: "/areas/riverview/gutter-cleaning", permanent: true },
      { source: "/gutter-cleaning/riverview-fl/", destination: "/areas/riverview/gutter-cleaning", permanent: true },
      { source: "/gutter-cleaning/new-port-richey-fl", destination: "/areas/new-port-richey/gutter-cleaning", permanent: true },
      { source: "/gutter-cleaning/new-port-richey-fl/", destination: "/areas/new-port-richey/gutter-cleaning", permanent: true },
      { source: "/gutter-cleaning/largo-fl", destination: "/areas/largo/gutter-cleaning", permanent: true },
      { source: "/gutter-cleaning/largo-fl/", destination: "/areas/largo/gutter-cleaning", permanent: true },
      { source: "/gutter-cleaning/spring-hill-fl", destination: "/areas/spring-hill/gutter-cleaning", permanent: true },
      { source: "/gutter-cleaning/spring-hill-fl/", destination: "/areas/spring-hill/gutter-cleaning", permanent: true },
      { source: "/gutter-cleaning/tarpon-springs-fl", destination: "/areas/tarpon-springs/gutter-cleaning", permanent: true },
      { source: "/gutter-cleaning/tarpon-springs-fl/", destination: "/areas/tarpon-springs/gutter-cleaning", permanent: true },
      { source: "/gutter-cleaning/land-o-lakes-fl", destination: "/areas/land-o-lakes/gutter-cleaning", permanent: true },
      { source: "/gutter-cleaning/land-o-lakes-fl/", destination: "/areas/land-o-lakes/gutter-cleaning", permanent: true },
      { source: "/gutter-cleaning/dunedin-fl", destination: "/areas/dunedin/gutter-cleaning", permanent: true },
      { source: "/gutter-cleaning/dunedin-fl/", destination: "/areas/dunedin/gutter-cleaning", permanent: true },
      { source: "/gutter-cleaning/ruskin-fl", destination: "/areas/ruskin/gutter-cleaning", permanent: true },
      { source: "/gutter-cleaning/ruskin-fl/", destination: "/areas/ruskin/gutter-cleaning", permanent: true },
      { source: "/gutter-cleaning/sun-city-center-fl", destination: "/areas/sun-city-center/gutter-cleaning", permanent: true },
      { source: "/gutter-cleaning/sun-city-center-fl/", destination: "/areas/sun-city-center/gutter-cleaning", permanent: true },
      { source: "/gutter-cleaning/temple-terrace-fl", destination: "/areas/temple-terrace/gutter-cleaning", permanent: true },
      { source: "/gutter-cleaning/temple-terrace-fl/", destination: "/areas/temple-terrace/gutter-cleaning", permanent: true },
      { source: "/gutter-cleaning/plant-city-fl", destination: "/areas/plant-city/gutter-cleaning", permanent: true },
      { source: "/gutter-cleaning/plant-city-fl/", destination: "/areas/plant-city/gutter-cleaning", permanent: true },
      { source: "/gutter-cleaning/lutz-fl", destination: "/areas/lutz/gutter-cleaning", permanent: true },
      { source: "/gutter-cleaning/lutz-fl/", destination: "/areas/lutz/gutter-cleaning", permanent: true },
      { source: "/gutter-cleaning/:slug", destination: "/gutter-cleaning", permanent: true },

      // ── Old /gutter-guards/{city}-fl → /areas/{city}/gutter-guards ──
      // 2026-04-17: Fixed — was pointing to generic /areas/{city}, now points to
      // the specific service page so Google preserves keyword relevance.
      { source: "/gutter-guards/tampa-fl", destination: "/areas/tampa/gutter-guards", permanent: true },
      { source: "/gutter-guards/tampa-fl/", destination: "/areas/tampa/gutter-guards", permanent: true },
      { source: "/gutter-guards/clearwater-fl", destination: "/areas/clearwater/gutter-guards", permanent: true },
      { source: "/gutter-guards/clearwater-fl/", destination: "/areas/clearwater/gutter-guards", permanent: true },
      { source: "/gutter-guards/st-petersburg-fl", destination: "/areas/st-petersburg/gutter-guards", permanent: true },
      { source: "/gutter-guards/st-petersburg-fl/", destination: "/areas/st-petersburg/gutter-guards", permanent: true },
      { source: "/gutter-guards/sarasota-fl", destination: "/areas/sarasota/gutter-guards", permanent: true },
      { source: "/gutter-guards/sarasota-fl/", destination: "/areas/sarasota/gutter-guards", permanent: true },
      { source: "/gutter-guards/bradenton-fl", destination: "/areas/bradenton/gutter-guards", permanent: true },
      { source: "/gutter-guards/bradenton-fl/", destination: "/areas/bradenton/gutter-guards", permanent: true },
      { source: "/gutter-guards/lakeland-fl", destination: "/areas/lakeland/gutter-guards", permanent: true },
      { source: "/gutter-guards/lakeland-fl/", destination: "/areas/lakeland/gutter-guards", permanent: true },
      { source: "/gutter-guards/brandon-fl", destination: "/areas/brandon/gutter-guards", permanent: true },
      { source: "/gutter-guards/brandon-fl/", destination: "/areas/brandon/gutter-guards", permanent: true },
      { source: "/gutter-guards/wesley-chapel-fl", destination: "/areas/wesley-chapel/gutter-guards", permanent: true },
      { source: "/gutter-guards/wesley-chapel-fl/", destination: "/areas/wesley-chapel/gutter-guards", permanent: true },
      { source: "/gutter-guards/palm-harbor-fl", destination: "/areas/palm-harbor/gutter-guards", permanent: true },
      { source: "/gutter-guards/palm-harbor-fl/", destination: "/areas/palm-harbor/gutter-guards", permanent: true },
      { source: "/gutter-guards/riverview-fl", destination: "/areas/riverview/gutter-guards", permanent: true },
      { source: "/gutter-guards/riverview-fl/", destination: "/areas/riverview/gutter-guards", permanent: true },
      { source: "/gutter-guards/new-port-richey-fl", destination: "/areas/new-port-richey/gutter-guards", permanent: true },
      { source: "/gutter-guards/new-port-richey-fl/", destination: "/areas/new-port-richey/gutter-guards", permanent: true },
      { source: "/gutter-guards/largo-fl", destination: "/areas/largo/gutter-guards", permanent: true },
      { source: "/gutter-guards/largo-fl/", destination: "/areas/largo/gutter-guards", permanent: true },
      { source: "/gutter-guards/spring-hill-fl", destination: "/areas/spring-hill/gutter-guards", permanent: true },
      { source: "/gutter-guards/spring-hill-fl/", destination: "/areas/spring-hill/gutter-guards", permanent: true },
      { source: "/gutter-guards/tarpon-springs-fl", destination: "/areas/tarpon-springs/gutter-guards", permanent: true },
      { source: "/gutter-guards/tarpon-springs-fl/", destination: "/areas/tarpon-springs/gutter-guards", permanent: true },
      { source: "/gutter-guards/land-o-lakes-fl", destination: "/areas/land-o-lakes/gutter-guards", permanent: true },
      { source: "/gutter-guards/land-o-lakes-fl/", destination: "/areas/land-o-lakes/gutter-guards", permanent: true },
      { source: "/gutter-guards/dunedin-fl", destination: "/areas/dunedin/gutter-guards", permanent: true },
      { source: "/gutter-guards/dunedin-fl/", destination: "/areas/dunedin/gutter-guards", permanent: true },
      { source: "/gutter-guards/ruskin-fl", destination: "/areas/ruskin/gutter-guards", permanent: true },
      { source: "/gutter-guards/ruskin-fl/", destination: "/areas/ruskin/gutter-guards", permanent: true },
      { source: "/gutter-guards/sun-city-center-fl", destination: "/areas/sun-city-center/gutter-guards", permanent: true },
      { source: "/gutter-guards/sun-city-center-fl/", destination: "/areas/sun-city-center/gutter-guards", permanent: true },
      { source: "/gutter-guards/temple-terrace-fl", destination: "/areas/temple-terrace/gutter-guards", permanent: true },
      { source: "/gutter-guards/temple-terrace-fl/", destination: "/areas/temple-terrace/gutter-guards", permanent: true },
      { source: "/gutter-guards/plant-city-fl", destination: "/areas/plant-city/gutter-guards", permanent: true },
      { source: "/gutter-guards/plant-city-fl/", destination: "/areas/plant-city/gutter-guards", permanent: true },
      { source: "/gutter-guards/lutz-fl", destination: "/areas/lutz/gutter-guards", permanent: true },
      { source: "/gutter-guards/lutz-fl/", destination: "/areas/lutz/gutter-guards", permanent: true },
      { source: "/gutter-guards/:slug", destination: "/gutter-guards", permanent: true },

      // ── Old /gutters-{city}-fl → /areas/{city} ──
      { source: "/gutters-tampa-fl", destination: "/areas/tampa", permanent: true },
      { source: "/gutters-clearwater-fl", destination: "/areas/clearwater", permanent: true },
      { source: "/gutters-st-petersburg-fl", destination: "/areas/st-petersburg", permanent: true },
      { source: "/gutters-sarasota-fl", destination: "/areas/sarasota", permanent: true },
      { source: "/gutters-bradenton-fl", destination: "/areas/bradenton", permanent: true },
      { source: "/gutters-lakeland-fl", destination: "/areas/lakeland", permanent: true },
      { source: "/gutters-brandon-fl", destination: "/areas/brandon", permanent: true },
      { source: "/gutters-wesley-chapel-fl", destination: "/areas/wesley-chapel", permanent: true },
      { source: "/gutters-palm-harbor-fl", destination: "/areas/palm-harbor", permanent: true },
      { source: "/gutters-riverview-fl", destination: "/areas/riverview", permanent: true },
      { source: "/gutters-new-port-richey-fl", destination: "/areas/new-port-richey", permanent: true },
      { source: "/gutters-largo-fl", destination: "/areas/largo", permanent: true },
      { source: "/gutters-spring-hill-fl", destination: "/areas/spring-hill", permanent: true },
      { source: "/gutters-tarpon-springs-fl", destination: "/areas/tarpon-springs", permanent: true },
      { source: "/gutters-land-o-lakes-fl", destination: "/areas/land-o-lakes", permanent: true },
      { source: "/gutters-dunedin-fl", destination: "/areas/dunedin", permanent: true },
      { source: "/gutters-ruskin-fl", destination: "/areas/ruskin", permanent: true },
      { source: "/gutters-sun-city-center-fl", destination: "/areas/sun-city-center", permanent: true },
      { source: "/gutters-temple-terrace-fl", destination: "/areas/temple-terrace", permanent: true },
      { source: "/gutters-plant-city-fl", destination: "/areas/plant-city", permanent: true },
      { source: "/gutters-lutz-fl", destination: "/areas/lutz", permanent: true },

      // ── Old service area pages ──
      // 2026-08-02: the old /service-area index now points at /areas (the live
      // areas hub) instead of the homepage. Sending an areas-index URL to "/"
      // threw away the topical match against a page that actually exists.
      { source: "/service-area", destination: "/areas", permanent: true },
      { source: "/service-area/", destination: "/areas", permanent: true },
      // 2026-08-02: DELETED the /service-area/south-tampa -> /areas/tampa rule.
      // /areas/south-tampa is a live page ("south-tampa" is in the app/areas/[slug]
      // slug list), so the old rule was short-circuiting a real route and its
      // schema. The /service-area/:slug catch-all below now resolves it correctly.
      { source: "/service-area/:slug", destination: "/areas/:slug", permanent: true },

      // ── Old gutter sub-pages ──
      { source: "/gutters/gutter-repair", destination: "/gutter-repair", permanent: true },
      { source: "/gutters/gutter-repair/", destination: "/gutter-repair", permanent: true },
      // 2026-08-02: repointed from /service-plans to /gutter-cleaning. Popeye ruled
      // /gutter-cleaning is the cleaning-search landing page; /service-plans is the
      // recurring-maintenance page. Sending cleaning intent to the plans page lost
      // the keyword match against a live page that has its own FAQPage schema.
      { source: "/gutters/gutter-cleaning", destination: "/gutter-cleaning", permanent: true },
      { source: "/gutters/gutter-cleaning/", destination: "/gutter-cleaning", permanent: true },

      // ── Old area pages → new city routes ──
      { source: "/areas-served/tampa", destination: "/areas/tampa", permanent: true },
      { source: "/areas-served/tampa/", destination: "/areas/tampa", permanent: true },
      { source: "/areas-served/clearwater", destination: "/areas/clearwater", permanent: true },
      { source: "/areas-served/st-petersburg", destination: "/areas/st-petersburg", permanent: true },
      { source: "/areas-served/sarasota", destination: "/areas/sarasota", permanent: true },
      { source: "/areas-served/bradenton", destination: "/areas/bradenton", permanent: true },
      { source: "/areas-served/lakeland", destination: "/areas/lakeland", permanent: true },
      { source: "/areas-served/brandon", destination: "/areas/brandon", permanent: true },
      { source: "/areas-served/:slug", destination: "/areas/:slug", permanent: true },

      // ── Common WordPress patterns ──
      { source: "/services/gutters", destination: "/seamless-aluminum-gutters", permanent: true },
      { source: "/services/soffit-fascia", destination: "/soffit-and-fascia", permanent: true },
      { source: "/services/siding", destination: "/siding", permanent: true },

      // ── Catch-all patterns (must be LAST) ──
      { source: "/gutters/:path*", destination: "/seamless-aluminum-gutters", permanent: true },
      { source: "/services/:path*", destination: "/", permanent: true },
    ];
  },

  // ── Rewrites ──
  // /estimator serves the static aerial-estimator app directly (HTTP 200) instead
  // of 307-redirecting to /estimator.html. Added 2026-08-02.
  //
  // Why: every internal link, the sitemap entry, the 404 page CTA, the nav feature
  // list, and both FAQ answers point at /estimator, but the app route at
  // app/estimator/page.jsx only called redirect("/estimator.html"). That made
  // /estimator.html the crawlable URL and split the page's equity across two URLs,
  // and the static file carries none of the site's JSON-LD because it never passes
  // through app/layout.js.
  //
  // beforeFiles runs ahead of the filesystem/app-route match, so this rewrite wins
  // over app/estimator/page.jsx. That page is intentionally LEFT IN PLACE as a
  // safe-fail: if this rewrite ever stops matching, /estimator falls back to the
  // old redirect instead of 404-ing on a linked lead-gen page.
  //
  // POST-DEPLOY VERIFY (required): curl -sI https://www.jronegutters.com/estimator
  // must return "HTTP/2 200", not a 307 with "location: /estimator.html".
  async rewrites() {
    return {
      beforeFiles: [
        { source: "/estimator", destination: "/estimator.html" },
      ],
      afterFiles: [],
      fallback: [],
    };
  },

  // ── Headers for security and caching ──
  async headers() {
    return [
      {
        source: "/((?!estimator\\.html).*)",
        headers: [
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "origin-when-cross-origin" },
        ],
      },
      {
        source: "/estimator.html",
        headers: [
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "origin-when-cross-origin" },
        ],
      },
      {
        source: "/images/(.*)",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
      {
        source: "/llms.txt",
        headers: [
          { key: "Content-Type", value: "text/plain; charset=utf-8" },
          { key: "Cache-Control", value: "public, max-age=60, s-maxage=60" },
        ],
      },
      {
        source: "/llms/:path*.md",
        headers: [
          { key: "Content-Type", value: "text/markdown; charset=utf-8" },
          { key: "Cache-Control", value: "public, max-age=3600" },
        ],
      },
    ];
  },

  // ── Image optimization ──
  images: {
    formats: ["image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "jronegutters.com",
      },
      {
        protocol: "https",
        hostname: "img.companycam.com",
      },
    ],
  },
};

module.exports = nextConfig;
