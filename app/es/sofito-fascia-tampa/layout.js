// Spanish metadata + JSON-LD for /es/sofito-fascia-tampa.

const serviceSchemaEs = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Reemplazo de Sofito y Fascia",
  serviceType: "Sofito y Fascia de Aluminio",
  inLanguage: "es-US",
  provider: {
    "@type": "HomeAndConstructionBusiness",
    name: "JR One Aluminum LLC",
    url: "https://www.jronegutters.com",
    telephone: "(844) 444-3114",
    address: { "@type": "PostalAddress", streetAddress: "3420 W Cherry St", addressLocality: "Tampa", addressRegion: "FL", postalCode: "33607", addressCountry: "US" },
    availableLanguage: ["en", "es"],
  },
  areaServed: ["Tampa", "St. Petersburg", "Clearwater", "Brandon", "Riverview", "Wesley Chapel"].map((name) => ({ "@type": "City", name })),
  description: "Reemplazo de sofito y fascia en Tampa Bay. Conversión completa de madera a aluminio que detiene el ciclo de pudrición. Sofito de aluminio ventilado del color de las canaletas. Empresa familiar, más de 30 años en el oficio.",
};

const breadcrumbSchemaEs = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Inicio", item: "https://www.jronegutters.com/es" },
    { "@type": "ListItem", position: 2, name: "Sofito y Fascia", item: "https://www.jronegutters.com/es/sofito-fascia-tampa" },
  ],
};

export const metadata = {
  // title.absolute drops the global "| JR One Aluminum" template tail so the
  // city plus one approved offer survive SERP truncation (A1 pattern, wave 2 ES).
  title: { absolute: "Reemplazo de Sofito y Fascia Tampa FL | Equipos Propios" },
  description: "Sacamos la madera podrida e instalamos sofito de aluminio o vinilo con fascia doblada a medida. Especialistas de Tampa Bay. Llame al (844) 444-3114.",
  alternates: {
    canonical: "https://www.jronegutters.com/es/sofito-fascia-tampa",
    languages: {
      "en-US": "https://www.jronegutters.com/soffit-and-fascia",
      "es-US": "https://www.jronegutters.com/es/sofito-fascia-tampa",
      "x-default": "https://www.jronegutters.com/soffit-and-fascia",
    },
  },
  openGraph: {
    title: "Sofito y Fascia Tampa - JR One Aluminum",
    description: "Reemplazo de sofito y fascia en aluminio. Detiene el ciclo de pudrición. (844) 444-3114.",
    url: "https://www.jronegutters.com/es/sofito-fascia-tampa",
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
