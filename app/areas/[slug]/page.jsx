import CityLandingPage from "@/components/CityLandingPage";
import CityPortfolio from "@/components/CityPortfolio";

const VALID_SLUGS = [
  "tampa","clearwater","st-petersburg","sarasota","bradenton",
  "lakeland","brandon","wesley-chapel","palm-harbor","riverview",
  "new-port-richey","largo","spring-hill","tarpon-springs",
  "land-o-lakes","dunedin","ruskin","sun-city-center",
  "temple-terrace","plant-city","lutz","south-tampa",
  // ── 7 mission cities added 2026-05-23 (Play 4) ──
  "new-tampa","valrico","lithia","oldsmar","safety-harbor",
  "seminole","pinellas-park"
];

const slugToCity = (slug) =>
  slug.split("-").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");

export async function generateStaticParams() {
  return VALID_SLUGS.map((slug) => ({ slug }));
}

// Only the enumerated VALID_SLUGS resolve; any other slug returns a real 404
// instead of a soft-404 city page (kills unlimited junk indexable URLs). 2026-06-15 audit.
export const dynamicParams = false;

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const cityName = slugToCity(slug);
  // Per-city overrides for striking-distance pages: lead the title with the top
  // local GSC query instead of the generic service-list template. 2026-06-15 audit.
  const TITLE_OVERRIDES = {
    largo: "Fascia Repair & Gutters Largo, FL",
    lutz: "Seamless Gutter Installation Lutz FL",
    riverview: "Gutter Repair & Guards in Riverview FL",
  };
  const DESC_OVERRIDES = {
    largo: "Roof fascia repair and seamless gutters in Largo, FL. Wood-to-aluminum fascia, soffit, gutter guards, and cleaning by a family-owned Pinellas specialty trade. Free estimate (844) 444-3114.",
    lutz: "Gutter installation in Lutz, FL. Seamless 6-inch and 7-inch aluminum gutters, gutter guards, repair, soffit and fascia. Family-owned, 30+ years. Call (844) 444-3114.",
    riverview: "Gutter repair and gutter guards in Riverview, FL. 6-inch and 7-inch seamless aluminum, fascia repair, and cleaning. Free estimate (844) 444-3114.",
  };
  return {
    title: TITLE_OVERRIDES[slug] || `Gutters, Soffit, Fascia & Siding in ${cityName}, FL`,
    description: DESC_OVERRIDES[slug] || `Seamless gutters, soffit repair, fascia replacement, gutter guards, and siding in ${cityName}, Florida. Family-owned Tampa Bay aluminum specialists. 30+ years experience. Free estimate (844) 444-3114.`,
    alternates: {
      canonical: `https://www.jronegutters.com/areas/${slug}`,
      languages: {
        "en-US": `https://www.jronegutters.com/areas/${slug}`,
        "es-US": `https://www.jronegutters.com/es/areas/${slug}`,
        "x-default": `https://www.jronegutters.com/areas/${slug}`,
      },
    },
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
      url: `https://www.jronegutters.com/areas/${slug}`,
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
      url: "https://www.jronegutters.com",
      telephone: "(844) 444-3114",
      email: "info@jronegutters.com",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Tampa",
        addressRegion: "FL",
        addressCountry: "US",
      },
      // aggregateRating removed 2026-05-26 per audit Tier 1.7 (self-serving rule).
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
      { "@type": "ListItem", position: 1, name: "Home", item: "https://www.jronegutters.com" },
      { "@type": "ListItem", position: 2, name: "Service Areas", item: "https://www.jronegutters.com/areas" },
      { "@type": "ListItem", position: 3, name: cityName, item: `https://www.jronegutters.com/areas/${slug}` },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <CityLandingPage
        citySlug={slug}
        lang="en"
        portfolio={<CityPortfolio citySlug={slug} cityName={cityName} limit={9} />}
      />
    </>
  );
}
