const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Commercial Gutter & Aluminum Installation",
  serviceType: "Commercial Gutter Installation",
  provider: {
    "@type": "HomeAndConstructionBusiness",
    name: "JR One Aluminum LLC",
    url: "https://www.jronegutters.com",
    telephone: "(844) 444-3114",
    address: { "@type": "PostalAddress", addressLocality: "Tampa", addressRegion: "FL", addressCountry: "US" },
  },
  areaServed: [
    { "@type": "City", name: "Tampa" },
    { "@type": "City", name: "Brandon" },
    { "@type": "City", name: "Riverview" },
    { "@type": "City", name: "Wesley Chapel" },
    { "@type": "City", name: "Clearwater" },
    { "@type": "City", name: "St. Petersburg" },
    { "@type": "City", name: "Sarasota" },
    { "@type": "City", name: "Bradenton" },
  ],
  description:
    "Commercial gutter, soffit, fascia, and drainage systems for apartment complexes, multi-family buildings, retail centers, office parks, and warehouses across Tampa Bay. 7-inch box gutters, D-style commercial profiles, and large-capacity drainage.",
  offers: { "@type": "Offer", priceCurrency: "USD", availability: "https://schema.org/InStock" },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://www.jronegutters.com" },
    { "@type": "ListItem", position: 2, name: "Commercial Gutters", item: "https://www.jronegutters.com/commercial-gutters" },
  ],
};

export const metadata = {
  title: "Commercial Gutter Installation Tampa",
  description:
    "Commercial gutter installation and services in Tampa FL: 7-inch box gutters, D-style, soffit, fascia, drainage for apartments, retail, office. Call (844) 444-3114.",
  keywords: "commercial gutters Tampa, apartment complex gutter installation, multi-family gutters Florida, retail center gutter contractor, commercial aluminum Tampa Bay, 7 inch box gutter commercial",
  alternates: {
    canonical: "https://www.jronegutters.com/commercial-gutters",
    languages: {
      "en-US": "https://www.jronegutters.com/commercial-gutters",
      "es-US": "https://www.jronegutters.com/es/canaletas-comerciales-tampa",
      "x-default": "https://www.jronegutters.com/commercial-gutters",
    },
  },
  openGraph: {
    title: "Commercial Gutters Tampa FL, JR One Aluminum",
    description: "Commercial aluminum gutter, soffit, and drainage for apartment complexes, retail, and multi-family in Tampa Bay.",
    url: "https://www.jronegutters.com/commercial-gutters",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Commercial Gutters Tampa FL, JR One Aluminum",
    description: "7-inch box, D-style, and large-capacity commercial gutter systems. Tampa Bay-wide.",
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
