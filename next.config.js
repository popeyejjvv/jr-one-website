/** @type {import('next').NextConfig} */
const nextConfig = {
  // ── 301 Redirects: Old URLs → New Routes ──
  async redirects() {
    return [
      // Old service area pages
      { source: "/service-area", destination: "/", permanent: true },
      { source: "/service-area/", destination: "/", permanent: true },
      { source: "/service-area/:slug", destination: "/areas/:slug", permanent: true },

      // Old gutter sub-pages
      { source: "/gutters/gutter-repair", destination: "/gutter-repair", permanent: true },
      { source: "/gutters/gutter-repair/", destination: "/gutter-repair", permanent: true },
      { source: "/gutters/gutter-cleaning", destination: "/service-plans", permanent: true },
      { source: "/gutters/gutter-cleaning/", destination: "/service-plans", permanent: true },

      // Old area pages → new city routes
      { source: "/areas-served/tampa", destination: "/areas/tampa", permanent: true },
      { source: "/areas-served/tampa/", destination: "/areas/tampa", permanent: true },
      { source: "/areas-served/clearwater", destination: "/areas/clearwater", permanent: true },
      { source: "/areas-served/st-petersburg", destination: "/areas/st-petersburg", permanent: true },
      { source: "/areas-served/sarasota", destination: "/areas/sarasota", permanent: true },
      { source: "/areas-served/bradenton", destination: "/areas/bradenton", permanent: true },
      { source: "/areas-served/lakeland", destination: "/areas/lakeland", permanent: true },
      { source: "/areas-served/brandon", destination: "/areas/brandon", permanent: true },
      { source: "/areas-served/:slug", destination: "/areas/:slug", permanent: true },

      // Old South Tampa specific redirect
      { source: "/service-area/south-tampa", destination: "/areas/tampa", permanent: true },
      { source: "/service-area/south-tampa/", destination: "/areas/tampa", permanent: true },

      // Common WordPress patterns
      { source: "/services/gutters", destination: "/seamless-aluminum-gutters", permanent: true },
      { source: "/services/soffit-fascia", destination: "/soffit-and-fascia", permanent: true },
      { source: "/services/siding", destination: "/siding", permanent: true },
    ];
  },

  // ── Headers for security and caching ──
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Frame-Options", value: "DENY" },
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
    ],
  },
};

module.exports = nextConfig;
