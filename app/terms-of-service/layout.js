// Server-side metadata + canonical + breadcrumb for /terms-of-service.
// The page itself is a client component, so without this layout it inherited
// the root homepage canonical (the broken-canonical bug fixed elsewhere on
// 2026-05-23). Self-canonical + sitemap entry added 2026-06-15 SEO audit.

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://www.jronegutters.com" },
    { "@type": "ListItem", position: 2, name: "Terms of Service", item: "https://www.jronegutters.com/terms-of-service" },
  ],
};

export const metadata = {
  title: "Terms of Service",
  description:
    "The terms that govern use of jronegutters.com and JR One Aluminum LLC estimates, proposals, and services across Tampa Bay. Gutters, soffit, fascia, drainage, and Peak 301.",
  alternates: {
    canonical: "https://www.jronegutters.com/terms-of-service",
    languages: {
      "en-US": "https://www.jronegutters.com/terms-of-service",
      "es-US": "https://www.jronegutters.com/es/terminos-servicio",
      "x-default": "https://www.jronegutters.com/terms-of-service",
    },
  },
  robots: { index: true, follow: true },
};

export default function Layout({ children }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      {children}
    </>
  );
}
