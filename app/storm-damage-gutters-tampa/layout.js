// Server-side metadata + JSON-LD for /storm-damage-gutters-tampa.
// Hurricane-season landing. Brand-brain compliant: 6"+7" only, no french drains,
// Peak 301 shingle-only, locked phone (844) 444-3114, hreflang to /es/ counterpart.

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Storm Damage Gutter Repair Tampa",
  serviceType: "Gutter Installation and Repair",
  image: "https://jronegutters.com/images/storm-damage-hero.webp",
  provider: {
    "@type": "HomeAndConstructionBusiness",
    "@id": "https://jronegutters.com/#business",
    name: "JR One Aluminum LLC",
    url: "https://www.jronegutters.com",
    telephone: "(844) 444-3114",
    address: { "@type": "PostalAddress", streetAddress: "3420 W Cherry St", addressLocality: "Tampa", addressRegion: "FL", postalCode: "33607", addressCountry: "US" },
  },
  areaServed: [
    "Tampa", "St. Petersburg", "Clearwater", "Brandon", "Riverview", "Wesley Chapel",
    "Lutz", "Land O' Lakes", "New Tampa", "Valrico", "Lithia", "Plant City",
    "Temple Terrace", "Oldsmar", "Safety Harbor", "Dunedin", "Palm Harbor",
    "Tarpon Springs", "Largo", "Seminole", "Pinellas Park"
  ].map((name) => ({ "@type": "City", name })),
  description:
    "Hurricane and named-storm damage repair for gutters, fascia, soffit, and downspouts across Tampa Bay. Same-week install. 6\" and 7\" seamless aluminum gutters only (no 5\" in Florida). Insurance claim documentation provided. Family-owned, over 30 years in the trade.",
  offers: {
    "@type": "Offer",
    priceCurrency: "USD",
    availability: "https://schema.org/InStock",
    description: "Same-week post-storm install scheduling during hurricane season.",
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://www.jronegutters.com" },
    { "@type": "ListItem", position: 2, name: "Storm Damage Gutter Repair", item: "https://www.jronegutters.com/storm-damage-gutters-tampa" },
  ],
};

export const metadata = {
  title: "Storm Damage Gutter Repair Tampa",
  description:
    "Hurricane-damaged gutters, fascia, soffit in Tampa Bay. Same-week install, insurance documentation, photos for adjuster. Family-owned, 30+ years. (844) 444-3114.",
  alternates: {
    canonical: "https://www.jronegutters.com/storm-damage-gutters-tampa",
    languages: {
      "en-US": "https://www.jronegutters.com/storm-damage-gutters-tampa",
      "es-US": "https://www.jronegutters.com/es/canaletas-dano-tormenta-tampa",
      "x-default": "https://www.jronegutters.com/storm-damage-gutters-tampa",
    },
  },
  openGraph: {
    title: "Storm Damage Gutter Repair Tampa Bay | JR One Aluminum",
    description: "Same-week install for hurricane-damaged gutters, fascia, soffit. Insurance claim documentation. (844) 444-3114.",
    url: "https://www.jronegutters.com/storm-damage-gutters-tampa",
    type: "website",
    locale: "en_US",
    images: [{ url: "https://www.jronegutters.com/images/storm-damage-hero.webp", width: 1920, height: 1080, alt: "Storm-damaged gutters and fascia on a Tampa Bay home before JR One Aluminum same-week repair" }],
  },
  twitter: { card: "summary_large_image", images: ["https://jronegutters.com/images/storm-damage-hero.webp"] },
};

export default function Layout({ children }) {
  return (
    <>
      <link rel="preload" as="image" href="/images/storm-damage-hero.webp" fetchPriority="high" />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      {children}
    </>
  );
}
