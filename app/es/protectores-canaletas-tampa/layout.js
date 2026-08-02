// Spanish metadata + JSON-LD for /es/protectores-canaletas-tampa.

const serviceSchemaEs = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Instalación de Protectores de Canaletas",
  serviceType: "Protectores de Canaletas de Micro Malla",
  inLanguage: "es-US",
  provider: {
    "@type": "HomeAndConstructionBusiness",
    name: "JR One Aluminum LLC",
    url: "https://www.jronegutters.com",
    telephone: "(844) 444-3114",
    address: { "@type": "PostalAddress", streetAddress: "3420 W Cherry St", addressLocality: "Tampa", addressRegion: "FL", postalCode: "33607", addressCountry: "US" },
    availableLanguage: ["en", "es"],
  },
  areaServed: ["Tampa", "St. Petersburg", "Clearwater", "Brandon", "Riverview", "Wesley Chapel", "Lutz"].map((name) => ({ "@type": "City", name })),
  description: "Protectores de canaletas de micro malla de acero inoxidable en Tampa Bay. Bloquean agujas de pino y arena de techo. Reducen la frecuencia de limpieza sin eliminarla. Empresa familiar, más de 30 años en el oficio.",
};

const breadcrumbSchemaEs = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Inicio", item: "https://www.jronegutters.com/es" },
    { "@type": "ListItem", position: 2, name: "Protectores de Canaletas", item: "https://www.jronegutters.com/es/protectores-canaletas-tampa" },
  ],
};

export const metadata = {
  // title.absolute drops the global "| JR One Aluminum" template tail so the
  // city plus one approved offer survive SERP truncation (A1 pattern, wave 2 ES).
  title: { absolute: "Protectores de Canaletas Tampa FL | Equipos Propios" },
  description: "Protectores de canaletas de micro malla que bloquean agujas de pino en Tampa Bay. Reducen la frecuencia de limpieza. Estimado gratis: (844) 444-3114.",
  alternates: {
    canonical: "https://www.jronegutters.com/es/protectores-canaletas-tampa",
    languages: {
      "en-US": "https://www.jronegutters.com/gutter-guards",
      "es-US": "https://www.jronegutters.com/es/protectores-canaletas-tampa",
      "x-default": "https://www.jronegutters.com/gutter-guards",
    },
  },
  openGraph: {
    title: "Protectores de Canaletas Tampa - JR One Aluminum",
    description: "Micro malla que bloquea agujas de pino. Reduce la frecuencia de limpieza. Empresa familiar, más de 30 años. (844) 444-3114.",
    url: "https://www.jronegutters.com/es/protectores-canaletas-tampa",
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
