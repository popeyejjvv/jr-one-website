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
  // Per-city overrides for the dead-CTR pages: lead the title with the top local
  // GSC query instead of the generic service-list template, cap the rendered title
  // at 50-60 chars (title.absolute drops the "| JR One Aluminum" template tail so
  // the offer survives SERP truncation), and carry ONE approved offer.
  // 2026-06-15 audit; expanded to 9 cities by the A1 dead-CTR strike 2026-08-02.
  const TITLE_OVERRIDES = {
    brandon: "Gutter Installation Brandon FL | Financing Available",
    riverview: "Gutter Repair & Installation Riverview FL | In-House Crews",
    lutz: "Seamless Gutter Installation Lutz FL | Financing Available",
    largo: "Fascia Repair and Gutters in Largo FL | In-House Crews",
    lakeland: "Seamless Gutters and Soffit in Lakeland FL | In-House Crews",
    bradenton: "Gutter Repair and Installation Bradenton FL | In-House Crews",
    tampa: "Gutters, Soffit and Fascia in Tampa FL | In-House Crews",
    "plant-city": "Gutters and Guards in Plant City FL | Financing Available",
    clearwater: "Gutters, Soffit and Fascia in Clearwater FL | In-House Crews",
  };
  const DESC_OVERRIDES = {
    brandon: "Seamless gutters, gutter guards, soffit, fascia, and siding in Brandon, FL. Family-owned with in-house crews, fully insured. Free estimate: (844) 444-3114.",
    riverview: "Gutter repair, seamless 6 inch and 7 inch installation, and gutter guards in Riverview, FL. Our own crews, never subcontractors. Call (844) 444-3114.",
    lutz: "Seamless 6 inch and 7 inch aluminum gutters, leaf guards, repair, and cleaning in Lutz, FL. Family-owned, in-house crews. Call (844) 444-3114.",
    largo: "Wood to aluminum fascia, soffit, seamless gutters, and gutter guards in Largo, FL. Family-owned Pinellas specialty trade. Call (844) 444-3114.",
    lakeland: "Seamless 6 inch and 7 inch gutters, gutter guards, soffit, fascia, and siding in Lakeland, FL. Fully insured, in-house crews. Call (844) 444-3114.",
    bradenton: "Gutter repair, seamless installation, guards, soffit, and fascia in Bradenton, FL. Family-owned, our own crews, fully insured. Call (844) 444-3114.",
    tampa: "Seamless gutters, gutter guards, soffit, fascia, and siding in Tampa, FL. Family-owned, over 30 years in the trade. Free estimate: (844) 444-3114.",
    "plant-city": "Seamless gutters, gutter guards, soffit, and fascia in Plant City, FL. Family-owned with in-house crews, fully insured. Free estimate: (844) 444-3114.",
    clearwater: "Soffit, fascia, seamless gutters, and micro mesh gutter guards in Clearwater, FL. Family-owned, in-house crews. Free estimate: (844) 444-3114.",
  };
  return {
    title: TITLE_OVERRIDES[slug]
      ? { absolute: TITLE_OVERRIDES[slug] }
      : `Gutters, Soffit, Fascia & Siding in ${cityName}, FL`,
    description: DESC_OVERRIDES[slug] || `Gutters, soffit, fascia, gutter guards, and siding in ${cityName}, FL. Family-owned Tampa Bay specialists, 30+ years. Free estimate (844) 444-3114.`,
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
    offers: { "@type": "Offer", availability: "https://schema.org/InStock" },
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
