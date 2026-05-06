// Server-side metadata + JSON-LD schema for /seamless-aluminum-gutters
// Wraps the client-component page to give Google and AI crawlers proper
// Service + Breadcrumb schema + SEO-tuned title/description.

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Seamless Aluminum Gutter Installation",
  serviceType: "Seamless Aluminum Gutter Installation",
  provider: {
    "@type": "HomeAndConstructionBusiness",
    name: "JR One Aluminum LLC",
    url: "https://jronegutters.com",
    telephone: "(844) 444-3114",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Tampa",
      addressRegion: "FL",
      addressCountry: "US",
    },
  },
  areaServed: [
    { "@type": "City", name: "Tampa" },
    { "@type": "City", name: "Brandon" },
    { "@type": "City", name: "Riverview" },
    { "@type": "City", name: "Wesley Chapel" },
    { "@type": "City", name: "Clearwater" },
    { "@type": "City", name: "St. Petersburg" },
    { "@type": "City", name: "Lutz" },
    { "@type": "City", name: "Land O' Lakes" },
    { "@type": "City", name: "Sun City Center" },
    { "@type": "City", name: "Apollo Beach" },
  ],
  description:
    "Custom-fabricated on-site seamless aluminum gutters in 5\", 6\", and 7\" K-style and half-round profiles. Tampa Bay residential and commercial installation by JR One Aluminum specialist crews. 30+ years of experience.",
  offers: {
    "@type": "Offer",
    priceCurrency: "USD",
    priceSpecification: {
      "@type": "PriceSpecification",
      priceCurrency: "USD",
      eligibleQuantity: { "@type": "QuantitativeValue", unitText: "linear foot" },
    },
    availability: "https://schema.org/InStock",
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://jronegutters.com" },
    { "@type": "ListItem", position: 2, name: "Seamless Aluminum Gutters", item: "https://jronegutters.com/seamless-aluminum-gutters" },
  ],
};

export const metadata = {
  title: "Seamless Aluminum Gutter Installation Tampa FL | 30+ Years Experience",
  description:
    "Custom-fabricated seamless aluminum gutters installed on-site in Tampa Bay. 5\", 6\", 7\" K-style and half-round profiles. Licensed, insured, bilingual. Free estimate, (844) 444-3114.",
  alternates: { canonical: "https://jronegutters.com/seamless-aluminum-gutters" },
  openGraph: {
    title: "Seamless Aluminum Gutter Installation Tampa FL, JR One Aluminum",
    description:
      "Custom-fabricated seamless aluminum gutters in Tampa Bay. Over 30 years installing gutters, soffit, fascia. Free estimates.",
    url: "https://jronegutters.com/seamless-aluminum-gutters",
    type: "website",
  },
};

export default function Layout({ children }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {children}
    </>
  );
}
