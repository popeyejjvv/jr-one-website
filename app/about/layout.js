// Server-side metadata + canonical + breadcrumb schema for /about.
// Added 2026-05-23 to fix the broken-canonical bug where /about inherited
// the root canonical https://www.jronegutters.com and was at risk of being merged
// into the homepage by Google.

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://www.jronegutters.com" },
    { "@type": "ListItem", position: 2, name: "About", item: "https://www.jronegutters.com/about" },
  ],
};

export const metadata = {
  title: "About JR One Aluminum - Family-Owned Tampa Bay Specialty Trade",
  description:
    "Christopher Rivera and crew, 3420 W Cherry St Tampa. Over 30 years in the gutter, soffit, fascia, and drainage trade. Family-owned, fully insured. (844) 444-3114.",
  alternates: { canonical: "https://www.jronegutters.com/about" },
  openGraph: {
    title: "About JR One Aluminum - Tampa Bay Specialty Trade Contractor",
    description: "Family-owned. Over 30 years in the Tampa Bay gutter industry. In-house crews. Free estimates.",
    url: "https://www.jronegutters.com/about",
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
