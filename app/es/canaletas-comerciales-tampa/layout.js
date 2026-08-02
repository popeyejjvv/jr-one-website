// Spanish metadata + JSON-LD for /es/canaletas-comerciales-tampa.
// Mirrors /commercial-gutters with hreflang alternates wired both ways.

const serviceSchemaEs = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Canaletas Comerciales",
  serviceType: "Instalación de Canaletas Comerciales",
  inLanguage: "es-US",
  provider: {
    "@type": "HomeAndConstructionBusiness",
    name: "JR One Aluminum LLC",
    url: "https://www.jronegutters.com",
    telephone: "(844) 444-3114",
    address: { "@type": "PostalAddress", streetAddress: "3420 W Cherry St", addressLocality: "Tampa", addressRegion: "FL", postalCode: "33607", addressCountry: "US" },
    availableLanguage: ["en", "es"],
  },
  areaServed: ["Tampa", "St. Petersburg", "Clearwater", "Brandon", "Riverview", "Lakeland", "Sarasota", "Bradenton"].map((name) => ({ "@type": "City", name })),
  description: "Sistemas de canaletas comerciales para edificios de apartamentos, multifamiliares, locales comerciales y propiedades industriales en Tampa Bay. Canaletas estilo caja, super canaletas y sistemas de alta capacidad de 7 pulgadas.",
};

const breadcrumbSchemaEs = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Inicio", item: "https://www.jronegutters.com/es" },
    { "@type": "ListItem", position: 2, name: "Canaletas Comerciales", item: "https://www.jronegutters.com/es/canaletas-comerciales-tampa" },
  ],
};

export const metadata = {
  // title.absolute drops the global "| JR One Aluminum" template tail plus the
  // hardcoded second "| JR One" that rendered twice (A1 pattern, wave 4 ES).
  title: { absolute: "Canaletas Comerciales en Tampa FL | Equipos Propios" },
  description: "Canaletas comerciales para edificios de apartamentos, multifamiliares y locales comerciales en Tampa Bay. Estilo caja y 7 pulgadas: (844) 444-3114.",
  alternates: {
    canonical: "https://www.jronegutters.com/es/canaletas-comerciales-tampa",
    languages: {
      "en-US": "https://www.jronegutters.com/commercial-gutters",
      "es-US": "https://www.jronegutters.com/es/canaletas-comerciales-tampa",
      "x-default": "https://www.jronegutters.com/commercial-gutters",
    },
  },
  openGraph: {
    title: "Canaletas Comerciales Tampa Bay - JR One Aluminum",
    description: "Apartamentos, multifamiliares y locales comerciales. Sistemas estilo caja y super canaleta. Equipos propios. (844) 444-3114.",
    url: "https://www.jronegutters.com/es/canaletas-comerciales-tampa",
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
