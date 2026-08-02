// Spanish locale mirror of /areas/[slug]. The /es/ parent layout locks the
// LanguageProvider to "es" so CityLandingPage reads CITIES_ES and renders
// Spanish SSR. Hreflang alternates link this URL to its English counterpart.

import CityLandingPage from "@/components/CityLandingPage";

const VALID_SLUGS = [
  "tampa","clearwater","st-petersburg","sarasota","bradenton",
  "lakeland","brandon","wesley-chapel","palm-harbor","riverview",
  "new-port-richey","largo","spring-hill","tarpon-springs",
  "land-o-lakes","dunedin","ruskin","sun-city-center",
  "temple-terrace","plant-city","lutz","south-tampa",
  "new-tampa","valrico","lithia","oldsmar","safety-harbor",
  "seminole","pinellas-park",
];

const slugToCity = (slug) =>
  slug.split("-").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");

export async function generateStaticParams() {
  return VALID_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const cityName = slugToCity(slug);
  // Per-city overrides mirroring the EN /areas/[slug] A1 strike, in native
  // Spanish (not a word-for-word translation). title.absolute drops the global
  // "| JR One Aluminum" template tail so the city plus ONE approved offer fit
  // inside the 51-60 char SERP budget. Wave 2 ES, 2026-08-02.
  const TITLE_OVERRIDES_ES = {
    brandon: "Instalación de Canaletas Brandon FL | Equipos Propios",
    riverview: "Reparación de Canaletas Riverview FL | Equipos Propios",
    lutz: "Instalación de Canaletas Lutz FL | Financiamiento Disponible",
    largo: "Reparación de Fascia y Canaletas Largo FL | Equipos Propios",
    lakeland: "Canaletas Continuas y Sofito Lakeland FL | Equipos Propios",
    bradenton: "Reparación de Canaletas Bradenton FL | Equipos Propios",
    tampa: "Canaletas, Sofito y Fascia en Tampa FL | Equipos Propios",
    "plant-city": "Canaletas y Protectores Plant City FL | Equipos Propios",
    clearwater: "Canaletas, Sofito y Fascia Clearwater FL | Equipos Propios",
  };
  const DESC_OVERRIDES_ES = {
    brandon: "Canaletas continuas, protectores, sofito, fascia y revestimiento en Brandon, FL. Empresa familiar con equipos propios. Estimado gratis: (844) 444-3114.",
    riverview: "Reparación de canaletas, instalación continua de 6 y 7 pulgadas y protectores en Riverview, FL. Equipos propios, nunca subcontratistas. (844) 444-3114.",
    lutz: "Canaletas continuas de 6 y 7 pulgadas, protectores, reparación y limpieza en Lutz, FL. Empresa familiar con equipos propios. Llame al (844) 444-3114.",
    largo: "Fascia de madera a aluminio, sofito, canaletas continuas y protectores en Largo, FL. Empresa familiar especializada en Pinellas. Llame al (844) 444-3114.",
    lakeland: "Canaletas continuas de 6 y 7 pulgadas, protectores, sofito, fascia y revestimiento en Lakeland, FL. Equipos propios y asegurados. (844) 444-3114.",
    bradenton: "Reparación de canaletas, instalación continua, protectores, sofito y fascia en Bradenton, FL. Empresa familiar con equipos propios. (844) 444-3114.",
    tampa: "Canaletas continuas, protectores, sofito, fascia y revestimiento en Tampa, FL. Empresa familiar, más de 30 años en el oficio. Llame al (844) 444-3114.",
    "plant-city": "Canaletas continuas, protectores, sofito y fascia en Plant City, FL. Empresa familiar con equipos propios y asegurados. Estimado gratis: (844) 444-3114.",
    clearwater: "Sofito, fascia, canaletas continuas y protectores de micro malla en Clearwater, FL. Empresa familiar con equipos propios. Estimado gratis: (844) 444-3114.",
  };
  return {
    // Fallback is absolute too: the inherited "| JR One Aluminum" tail added 18
    // characters, pushing 13 of the 20 non-override cities past the 60-char SERP
    // budget and truncating the city name out of the rendered title.
    title: { absolute: TITLE_OVERRIDES_ES[slug] || `Canaletas, Sofito y Fascia en ${cityName}, FL` },
    description: DESC_OVERRIDES_ES[slug] || `Canaletas continuas, protectores, sofito, fascia y drenaje en ${cityName}, Florida. Empresa familiar, más de 30 años. Estimado gratis: (844) 444-3114.`,
    alternates: {
      canonical: `https://www.jronegutters.com/es/areas/${slug}`,
      languages: {
        "en-US": `https://www.jronegutters.com/areas/${slug}`,
        "es-US": `https://www.jronegutters.com/es/areas/${slug}`,
        "x-default": `https://www.jronegutters.com/areas/${slug}`,
      },
    },
    openGraph: {
      title: `${cityName}, FL - Canaletas, Sofito y Fascia | JR One Aluminum`,
      description: `Especialistas en aluminio en ${cityName}, FL. Canaletas continuas, sofito, fascia, protectores y drenaje. Estimado gratis: (844) 444-3114.`,
      url: `https://www.jronegutters.com/es/areas/${slug}`,
      type: "website",
      locale: "es_US",
    },
  };
}

export default async function CityPageEs({ params }) {
  const { slug } = await params;
  const cityName = slugToCity(slug);

  const serviceSchemaEs = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `Servicios de Canaletas, Sofito y Fascia en ${cityName}, FL`,
    serviceType: "Instalación de Canaletas, Sofito, Fascia y Drenaje",
    inLanguage: "es-US",
    provider: {
      "@type": "HomeAndConstructionBusiness",
      name: "JR One Aluminum LLC",
      url: "https://www.jronegutters.com",
      telephone: "(844) 444-3114",
      email: "info@jronegutters.com",
      address: {
        "@type": "PostalAddress",
        streetAddress: "3420 W Cherry St",
        addressLocality: "Tampa",
        addressRegion: "FL",
        postalCode: "33607",
        addressCountry: "US",
      },
      // aggregateRating removed 2026-05-26 per audit Tier 1.7 (self-serving rule).
      availableLanguage: ["en", "es"],
    },
    areaServed: {
      "@type": "City",
      name: cityName,
      address: { "@type": "PostalAddress", addressRegion: "FL", addressCountry: "US" },
    },
    description: `Canaletas continuas de aluminio (6 y 7 pulgadas), sofito, fascia, protectores y drenaje subterráneo en ${cityName}, Florida. Más de 30 años de experiencia familiar en el oficio de aluminio en Tampa Bay. Servicio bilingüe.`,
  };

  const breadcrumbSchemaEs = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Inicio", item: "https://www.jronegutters.com/es" },
      { "@type": "ListItem", position: 2, name: "Áreas de Servicio", item: "https://www.jronegutters.com/es/areas" },
      { "@type": "ListItem", position: 3, name: cityName, item: `https://www.jronegutters.com/es/areas/${slug}` },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchemaEs) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchemaEs) }} />
      <CityLandingPage citySlug={slug} lang="es" />
    </>
  );
}
