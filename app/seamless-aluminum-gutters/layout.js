// Server-side metadata + JSON-LD schema for /seamless-aluminum-gutters
// Wraps the client-component page to give Google and AI crawlers proper
// Service + Breadcrumb schema + SEO-tuned title/description.

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Seamless Aluminum Gutter Installation Tampa",
  serviceType: "Seamless Aluminum Gutter Installation",
  image: "https://jronegutters.com/images/seamless-gutter-install.webp",
  provider: {
    "@type": "HomeAndConstructionBusiness",
    "@id": "https://jronegutters.com/#business",
    name: "JR One Aluminum LLC",
    url: "https://www.jronegutters.com",
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
    "Custom-fabricated on-site seamless aluminum gutters in 6\" and 7\" K-style and half-round profiles. Tampa Bay residential and commercial installation by JR One Aluminum specialist crews. Over 30 years in the trade. We install 6\" and 7\" only (not 5\") because Florida rain volume needs the larger capacity.",
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
    { "@type": "ListItem", position: 1, name: "Home", item: "https://www.jronegutters.com" },
    { "@type": "ListItem", position: 2, name: "Seamless Aluminum Gutters", item: "https://www.jronegutters.com/seamless-aluminum-gutters" },
  ],
};

export const metadata = {
  title: "Seamless Aluminum Gutters Tampa",
  description:
    "Custom-fabricated seamless aluminum gutters installed on-site in Tampa Bay. 6\" and 7\" K-style and half-round profiles (no 5\" in Florida). Licensed, insured, bilingual. Free estimate, (844) 444-3114.",
  alternates: {
    canonical: "https://www.jronegutters.com/seamless-aluminum-gutters",
    languages: {
      "en-US": "https://www.jronegutters.com/seamless-aluminum-gutters",
      "es-US": "https://www.jronegutters.com/es/canaletas-sin-costura-tampa",
      "x-default": "https://www.jronegutters.com/seamless-aluminum-gutters",
    },
  },
  openGraph: {
    title: "Seamless Aluminum Gutter Installation Tampa FL, JR One Aluminum",
    description:
      "Custom-fabricated seamless aluminum gutters in Tampa Bay. Over 30 years installing gutters, soffit, fascia. Free estimates.",
    url: "https://www.jronegutters.com/seamless-aluminum-gutters",
    type: "website",
    images: [{ url: "https://www.jronegutters.com/images/seamless-gutter-install.webp", width: 1920, height: 1080, alt: "JR One Aluminum installer mounting a 6-inch seamless aluminum gutter on a Tampa Bay home" }],
  },
  twitter: { card: "summary_large_image", images: ["https://jronegutters.com/images/seamless-gutter-install.webp"] },
};

export default function Layout({ children }) {
  return (
    <>
      <link rel="preload" as="image" href="/images/seamless-gutter-install.webp" fetchPriority="high" />
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
