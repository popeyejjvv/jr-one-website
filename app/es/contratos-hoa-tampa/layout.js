// Spanish metadata + JSON-LD for /es/contratos-hoa-tampa.
// Mirrors /hoa-contracts with hreflang alternates wired both ways.

const serviceSchemaEs = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Contratos de Mantenimiento HOA",
  serviceType: "Contrato de Mantenimiento de Canaletas y Aluminio para HOA",
  inLanguage: "es-US",
  provider: {
    "@type": "HomeAndConstructionBusiness",
    name: "JR One Aluminum LLC",
    url: "https://www.jronegutters.com",
    telephone: "(844) 444-3114",
    address: { "@type": "PostalAddress", streetAddress: "3420 W Cherry St", addressLocality: "Tampa", addressRegion: "FL", postalCode: "33607", addressCountry: "US" },
    availableLanguage: ["en", "es"],
  },
  areaServed: ["Tampa", "St. Petersburg", "Clearwater", "Brandon", "Riverview", "Wesley Chapel", "Lutz", "Land O' Lakes"].map((name) => ({ "@type": "City", name })),
  description: "Contratos de mantenimiento de canaletas, sofito y fascia para asociaciones de propietarios (HOA) y administradores de propiedades en Tampa Bay. Limpieza programada, inspecciones, reparaciones y informes anuales.",
};

const breadcrumbSchemaEs = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Inicio", item: "https://www.jronegutters.com/es" },
    { "@type": "ListItem", position: 2, name: "Contratos HOA", item: "https://www.jronegutters.com/es/contratos-hoa-tampa" },
  ],
};

export const metadata = {
  title: "Contratos HOA de Canaletas y Aluminio Tampa FL | JR One",
  description: "Contratos de mantenimiento de canaletas, sofito y fascia para HOA y administradores de propiedades en Tampa Bay. Limpieza programada e inspecciones. (844) 444-3114.",
  alternates: {
    canonical: "https://www.jronegutters.com/es/contratos-hoa-tampa",
    languages: {
      "en-US": "https://www.jronegutters.com/hoa-contracts",
      "es-US": "https://www.jronegutters.com/es/contratos-hoa-tampa",
      "x-default": "https://www.jronegutters.com/hoa-contracts",
    },
  },
  openGraph: {
    title: "Contratos HOA Tampa Bay - JR One Aluminum",
    description: "Contratos de mantenimiento para asociaciones de propietarios. Limpieza, inspeccion, informes. (844) 444-3114.",
    url: "https://www.jronegutters.com/es/contratos-hoa-tampa",
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
