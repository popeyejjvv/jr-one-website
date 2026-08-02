// Spanish metadata + JSON-LD for /es/canaletas-cobre-tampa.
// Mirrors /copper-gutters with hreflang alternates wired both ways.

const serviceSchemaEs = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Instalación de Canaletas de Cobre",
  serviceType: "Canaletas de Cobre Sin Costura",
  inLanguage: "es-US",
  provider: {
    "@type": "HomeAndConstructionBusiness",
    name: "JR One Aluminum LLC",
    url: "https://www.jronegutters.com",
    telephone: "(844) 444-3114",
    address: { "@type": "PostalAddress", streetAddress: "3420 W Cherry St", addressLocality: "Tampa", addressRegion: "FL", postalCode: "33607", addressCountry: "US" },
    availableLanguage: ["en", "es"],
  },
  areaServed: ["Tampa", "St. Petersburg", "Clearwater", "Sarasota", "Bradenton"].map((name) => ({ "@type": "City", name })),
  description: "Instalación de canaletas de cobre a medida para hogares arquitectónicos e históricos de Tampa Bay. Cobre estilo K sin costura y media caña, cabezales conductores de cobre, bajantes de cobre y protectores de cobre. Vida útil de más de 50 años.",
};

const breadcrumbSchemaEs = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Inicio", item: "https://www.jronegutters.com/es" },
    { "@type": "ListItem", position: 2, name: "Canaletas de Cobre", item: "https://www.jronegutters.com/es/canaletas-cobre-tampa" },
  ],
};

export const metadata = {
  // title.absolute drops the global "| JR One Aluminum" template tail so the
  // city plus one approved offer survive SERP truncation (A1 pattern, wave 2 ES).
  // Also removes the duplicated "| JR One" that rendered twice before.
  title: { absolute: "Canaletas de Cobre en Tampa FL | Financiamiento Disponible" },
  description: "Canaletas de cobre sin costura, estilo K y media caña, con bajantes y protectores de cobre, para casas históricas de Tampa Bay. Llame al (844) 444-3114.",
  alternates: {
    canonical: "https://www.jronegutters.com/es/canaletas-cobre-tampa",
    languages: {
      "en-US": "https://www.jronegutters.com/copper-gutters",
      "es-US": "https://www.jronegutters.com/es/canaletas-cobre-tampa",
      "x-default": "https://www.jronegutters.com/copper-gutters",
    },
  },
  openGraph: {
    title: "Canaletas de Cobre Tampa FL - JR One Aluminum",
    description: "Estilo K y media caña sin costura. Para hogares arquitectónicos e históricos. (844) 444-3114.",
    url: "https://www.jronegutters.com/es/canaletas-cobre-tampa",
    type: "website",
    locale: "es_US",
  },
};

export default function Layout({ children }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchemaEs) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchemaEs) }} />
      {children}
    </>
  );
}
