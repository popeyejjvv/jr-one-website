import CityLandingPage from "@/components/CityLandingPage";

const VALID_SLUGS = [
  "tampa","clearwater","st-petersburg","sarasota","bradenton",
  "lakeland","brandon","wesley-chapel","palm-harbor","riverview",
  "new-port-richey","largo","spring-hill","tarpon-springs",
  "land-o-lakes","dunedin","ruskin","sun-city-center",
  "temple-terrace","plant-city","lutz","south-tampa"
];

const slugToCity = (slug) =>
  slug.split("-").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");

export async function generateStaticParams() {
  return VALID_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const cityName = slugToCity(slug);
  return {
    title: `Gutters, Soffit, Fascia & Siding in ${cityName}, FL | JR One Aluminum`,
    description: `Seamless gutters, soffit repair, fascia replacement, gutter guards, and siding in ${cityName}, Florida. Family-owned Tampa Bay aluminum specialists. 30+ years experience. Free estimate (844) 444-3114.`,
    alternates: { canonical: `https://jronegutters.com/areas/${slug}` },
    keywords: [
      `gutters ${cityName} FL`,
      `gutter installation ${cityName}`,
      `soffit and fascia ${cityName} FL`,
      `gutter repair ${cityName}`,
      `gutter cleaning ${cityName}`,
      `siding ${cityName} FL`,
      `aluminum contractor ${cityName}`,
    ],
    openGraph: {
      title: `${cityName}, FL Gutters, Soffit & Fascia, JR One Aluminum`,
      description: `Aluminum specialists in ${cityName}, FL. Seamless gutters, soffit, fascia, gutter guards, siding. Free estimate, (844) 444-3114.`,
      url: `https://jronegutters.com/areas/${slug}`,
      type: "website",
    },
  };
}

export default async function CityPage({ params }) {
  const { slug } = await params;
  const cityName = slugToCity(slug);

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `Gutter, Soffit, Fascia & Siding Services in ${cityName}, FL`,
    serviceType: "Aluminum Gutter, Soffit, Fascia, and Siding Installation",
    provider: {
      "@type": "HomeAndConstructionBusiness",
      name: "JR One Aluminum LLC",
      url: "https://jronegutters.com",
      telephone: "(844) 444-3114",
      email: "info@jronegutters.com",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Tampa",
        addressRegion: "FL",
        addressCountry: "US",
      },
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "4.9",
        reviewCount: "55",
      },
    },
    areaServed: {
      "@type": "City",
      name: cityName,
      address: { "@type": "PostalAddress", addressRegion: "FL", addressCountry: "US" },
    },
    description: `Seamless aluminum gutters, soffit, fascia, gutter guards, siding, and drainage in ${cityName}, Florida. 30+ years of Tampa Bay aluminum specialist experience. Bilingual service (English/Spanish).`,
    offers: { "@type": "Offer", priceCurrency: "USD", availability: "https://schema.org/InStock" },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://jronegutters.com" },
      { "@type": "ListItem", position: 2, name: "Service Areas", item: "https://jronegutters.com/areas" },
      { "@type": "ListItem", position: 3, name: cityName, item: `https://jronegutters.com/areas/${slug}` },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <CityLandingPage citySlug={slug} />
    </>
  );
}
