// Server-side metadata + canonical + breadcrumb schema for /insurance-resource-center.
// Added 2026-05-23 to fix the broken-canonical bug.

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://www.jronegutters.com" },
    { "@type": "ListItem", position: 2, name: "Insurance Resource Center", item: "https://www.jronegutters.com/insurance-resource-center" },
  ],
};

export const metadata = {
  title: "Peak 301 Roof Rejuvenation & Florida Insurance Guide | Tampa",
  description:
    "Florida law protects homeowners from losing insurance over roof age. Learn how Peak 301 soy-based roof rejuvenation restores your shingles to support the certification that may help document your roof's remaining useful life for your insurer's review. (844) 444-3114.",
  alternates: {
    canonical: "https://www.jronegutters.com/insurance-resource-center",
    languages: {
      "en-US": "https://www.jronegutters.com/insurance-resource-center",
      "es-US": "https://www.jronegutters.com/es/centro-recursos-seguros",
      "x-default": "https://www.jronegutters.com/insurance-resource-center",
    },
  },
  openGraph: {
    title: "Peak 301 Roof Rejuvenation & Florida Insurance Guide - JR One Aluminum",
    description: "Learn how Florida law protects homeowners from losing insurance over roof age, and how Peak 301 soy-based roof rejuvenation supports the certification that may help document your roof's remaining useful life for your insurer's review.",
    url: "https://www.jronegutters.com/insurance-resource-center",
    type: "website",
  },
};

export default function Layout({ children }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      {children}
    </>
  );
}
