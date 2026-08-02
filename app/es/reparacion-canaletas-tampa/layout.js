// Spanish metadata + JSON-LD for /es/reparacion-canaletas-tampa.

const serviceSchemaEs = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Reparación de Canaletas",
  serviceType: "Reparación de Canaletas",
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
  description: "Reparación de canaletas en Tampa Bay: hundimientos, fugas, desbordamiento, reemplazo de bajantes, daño de tormenta. Servicio en 14 días. Empresa familiar, más de 30 años en el oficio.",
};

const breadcrumbSchemaEs = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Inicio", item: "https://www.jronegutters.com/es" },
    { "@type": "ListItem", position: 2, name: "Reparación de Canaletas", item: "https://www.jronegutters.com/es/reparacion-canaletas-tampa" },
  ],
};

export const metadata = {
  // title.absolute drops the global "| JR One Aluminum" template tail so the
  // city plus one approved offer survive SERP truncation (A1 pattern, wave 2 ES).
  // "Servicio misma semana" removed 2026-08-02 (banned same-week claim).
  title: { absolute: "Reparación de Canaletas Tampa FL | Servicio en 14 Días" },
  description: "Arreglamos canaletas hundidas, fugas en uniones, desbordamiento y bajantes tapadas en Tampa Bay. Equipos propios. Inspección gratis: (844) 444-3114.",
  alternates: {
    canonical: "https://www.jronegutters.com/es/reparacion-canaletas-tampa",
    languages: {
      "en-US": "https://www.jronegutters.com/gutter-repair",
      "es-US": "https://www.jronegutters.com/es/reparacion-canaletas-tampa",
      "x-default": "https://www.jronegutters.com/gutter-repair",
    },
  },
  openGraph: {
    title: "Reparación de Canaletas Tampa - JR One Aluminum",
    description: "Hundimientos, fugas, desbordamiento, daño de tormenta. Servicio en 14 días. (844) 444-3114.",
    url: "https://www.jronegutters.com/es/reparacion-canaletas-tampa",
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
