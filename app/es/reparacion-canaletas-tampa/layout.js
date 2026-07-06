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
  description: "Reparación de canaletas en Tampa Bay: hundimientos, fugas, desbordamiento, reemplazo de bajantes, dano de tormenta. Servicio misma semana. Familia, más de 30 años en el oficio.",
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
  title: "Reparación de Canaletas Tampa FL | Hundimientos y Fugas",
  description: "Reparación de canaletas en Tampa Bay: hundimientos, fugas, desbordamiento, dano de tormenta. Servicio misma semana. (844) 444-3114. Hablamos español.",
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
    description: "Hundimientos, fugas, desbordamiento, dano de tormenta. Servicio misma semana. (844) 444-3114.",
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
