const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "HOA Gutter & Aluminum Maintenance Contracts",
  serviceType: "HOA Maintenance Contract",
  provider: {
    "@type": "HomeAndConstructionBusiness",
    name: "JR One Aluminum LLC",
    url: "https://jronegutters.com",
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
    "HOA maintenance contracts for gutter cleaning, soffit, fascia, and aluminum upkeep across Tampa Bay HOA-managed neighborhoods. Community-wide pricing, bilingual crews, single-point accountability for property managers.",
  offers: { "@type": "Offer", priceCurrency: "USD", availability: "https://schema.org/InStock" },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://jronegutters.com" },
    { "@type": "ListItem", position: 2, name: "HOA Contracts", item: "https://jronegutters.com/hoa-contracts" },
  ],
};

export const metadata = {
  title: "HOA Gutter Maintenance Tampa FL",
  description:
    "HOA maintenance contracts for gutter, soffit, and fascia upkeep across Tampa Bay managed communities. Bilingual crews, community-wide pricing, single-point property-manager accountability. (844) 444-3114.",
  keywords: "HOA gutter maintenance Tampa, HOA contract gutter cleaning, property management aluminum services, HOA soffit fascia Tampa, community gutter contract Florida",
  alternates: {
    canonical: "https://jronegutters.com/hoa-contracts",
    languages: {
      "en-US": "https://jronegutters.com/hoa-contracts",
      "es-US": "https://jronegutters.com/es/contratos-hoa-tampa",
      "x-default": "https://jronegutters.com/hoa-contracts",
    },
  },
  openGraph: {
    title: "HOA Maintenance Contracts Tampa FL, JR One Aluminum",
    description: "Gutter, soffit, and fascia maintenance contracts for Tampa Bay HOAs. Community-wide pricing. Free walkthrough.",
    url: "https://jronegutters.com/hoa-contracts",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "HOA Maintenance Contracts Tampa FL, JR One Aluminum",
    description: "Gutter, soffit, and fascia contracts for Tampa Bay HOAs. Bilingual crews, single-point accountability.",
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
