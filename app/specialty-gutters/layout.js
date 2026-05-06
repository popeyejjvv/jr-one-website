const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Specialty Gutters, Half-Round, Commercial Box, D-Style",
  serviceType: "Specialty Gutter Installation",
  provider: {
    "@type": "HomeAndConstructionBusiness",
    name: "JR One Aluminum LLC",
    url: "https://jronegutters.com",
    telephone: "(844) 444-3114",
    address: { "@type": "PostalAddress", streetAddress: "3420 W Cherry St", addressLocality: "Tampa", addressRegion: "FL", postalCode: "33607", addressCountry: "US" },
  },
  areaServed: [
    { "@type": "City", name: "Tampa" },
    { "@type": "City", name: "St. Petersburg" },
    { "@type": "City", name: "Clearwater" },
    { "@type": "City", name: "Sarasota" },
    { "@type": "City", name: "Bradenton" },
  ],
  description:
    "Specialty gutter installation in Tampa Bay, 6\" and 8\" half-round aluminum, 7\" commercial box, 7\" commercial D-style, oversized K-style. For historic homes, architectural properties, and high-volume commercial applications.",
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://jronegutters.com" },
    { "@type": "ListItem", position: 2, name: "Specialty Gutters", item: "https://jronegutters.com/specialty-gutters" },
  ],
};

export const metadata = {
  title: "Specialty Gutters Tampa FL | Half-Round, Commercial Box, D-Style",
  description:
    "Half-round, commercial box, D-style, and oversized K-style aluminum gutters installed in Tampa Bay. Historic homes, architectural properties, commercial. (844) 444-3114.",
  alternates: { canonical: "https://jronegutters.com/specialty-gutters" },
  openGraph: {
    title: "Specialty Gutters Tampa FL, JR One Aluminum",
    description: "Half-round, box, D-style specialty gutter profiles for Tampa Bay homes and commercial.",
    url: "https://jronegutters.com/specialty-gutters",
    type: "website",
  },
};

export default function Layout({ children }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      {children}
    </>
  );
}
