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
  return {
    title: `Canaletas, Sofito y Fascia en ${cityName}, FL`,
    description: `Canaletas continuas de aluminio (6 y 7 pulgadas), reparacion de sofito y fascia, protectores de canaleta, drenaje subterraneo en ${cityName}, Florida. Empresa familiar, mas de 30 anos en el oficio. Estimado gratis (844) 444-3114. Hablamos espanol.`,
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
      description: `Especialistas en aluminio en ${cityName}, FL. Canaletas continuas, sofito, fascia, protectores, drenaje. Estimado gratis (844) 444-3114.`,
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
    serviceType: "Instalacion de Canaletas, Sofito, Fascia y Drenaje",
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
    description: `Canaletas continuas de aluminio (6 y 7 pulgadas), sofito, fascia, protectores y drenaje subterraneo en ${cityName}, Florida. Mas de 30 anos de experiencia familiar en el oficio de aluminio en Tampa Bay. Servicio bilingue.`,
  };

  const breadcrumbSchemaEs = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Inicio", item: "https://www.jronegutters.com/es" },
      { "@type": "ListItem", position: 2, name: "Areas de Servicio", item: "https://www.jronegutters.com/es/areas" },
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
