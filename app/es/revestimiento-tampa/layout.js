// Spanish metadata + JSON-LD for /es/revestimiento-tampa.
// Mirrors /siding with hreflang alternates wired both ways.

const serviceSchemaEs = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Instalación de Revestimiento",
  serviceType: "Instalación y Reparación de Revestimiento",
  inLanguage: "es-US",
  provider: {
    "@type": "HomeAndConstructionBusiness",
    name: "JR One Aluminum LLC",
    url: "https://www.jronegutters.com",
    telephone: "(844) 444-3114",
    address: { "@type": "PostalAddress", streetAddress: "3420 W Cherry St", addressLocality: "Tampa", addressRegion: "FL", postalCode: "33607", addressCountry: "US" },
    availableLanguage: ["en", "es"],
  },
  areaServed: ["Tampa", "St. Petersburg", "Clearwater", "Brandon", "Riverview", "Sarasota", "Bradenton"].map((name) => ({ "@type": "City", name })),
  description: "Instalación y reparación de revestimiento en Tampa Bay. James Hardie (fibrocemento), vinilo, aluminio y PVC Sagiper. Protección resistente al clima para hogares de Florida.",
};

const breadcrumbSchemaEs = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Inicio", item: "https://www.jronegutters.com/es" },
    { "@type": "ListItem", position: 2, name: "Revestimiento", item: "https://www.jronegutters.com/es/revestimiento-tampa" },
  ],
};

export const metadata = {
  // title.absolute drops the global "| JR One Aluminum" template tail so the
  // city plus one approved offer survive SERP truncation (A1 pattern, wave 2 ES).
  // Also removes the duplicated "| JR One" that rendered twice before.
  title: { absolute: "Revestimiento Tampa Bay FL | Financiamiento Disponible" },
  description: "Revestimiento de vinilo, fibrocemento Hardie, aluminio y PVC Sagiper en Tampa, instalado por el mismo equipo de su sofito y canaletas. (844) 444-3114.",
  alternates: {
    canonical: "https://www.jronegutters.com/es/revestimiento-tampa",
    languages: {
      "en-US": "https://www.jronegutters.com/siding",
      "es-US": "https://www.jronegutters.com/es/revestimiento-tampa",
      "x-default": "https://www.jronegutters.com/siding",
    },
  },
  openGraph: {
    title: "Revestimiento Tampa Bay - JR One Aluminum",
    description: "Hardie Board, vinilo, aluminio y PVC Sagiper. Protección resistente al clima. (844) 444-3114.",
    url: "https://www.jronegutters.com/es/revestimiento-tampa",
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
