// Spanish metadata + JSON-LD for /es/revestimiento-tampa.
// Mirrors /siding with hreflang alternates wired both ways.

const serviceSchemaEs = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Instalacion de Revestimiento",
  serviceType: "Instalacion y Reparacion de Revestimiento",
  inLanguage: "es-US",
  provider: {
    "@type": "HomeAndConstructionBusiness",
    name: "JR One Aluminum LLC",
    url: "https://jronegutters.com",
    telephone: "(844) 444-3114",
    address: { "@type": "PostalAddress", streetAddress: "3420 W Cherry St", addressLocality: "Tampa", addressRegion: "FL", postalCode: "33607", addressCountry: "US" },
    availableLanguage: ["en", "es"],
  },
  areaServed: ["Tampa", "St. Petersburg", "Clearwater", "Brandon", "Riverview", "Sarasota", "Bradenton"].map((name) => ({ "@type": "City", name })),
  description: "Instalacion y reparacion de revestimiento en Tampa Bay. James Hardie (fibrocemento), vinilo y aluminio. Proteccion resistente al clima para hogares de Florida.",
};

const breadcrumbSchemaEs = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Inicio", item: "https://jronegutters.com/es" },
    { "@type": "ListItem", position: 2, name: "Revestimiento", item: "https://jronegutters.com/es/revestimiento-tampa" },
  ],
};

export const metadata = {
  title: "Revestimiento Tampa FL | Hardie Board, Vinilo, Aluminio | JR One",
  description: "Instalacion de revestimiento en Tampa Bay. James Hardie, vinilo y aluminio. Proteccion resistente al clima. Mas de 30 anos en el oficio. (844) 444-3114.",
  alternates: {
    canonical: "https://jronegutters.com/es/revestimiento-tampa",
    languages: {
      "en-US": "https://jronegutters.com/siding",
      "es-US": "https://jronegutters.com/es/revestimiento-tampa",
      "x-default": "https://jronegutters.com/siding",
    },
  },
  openGraph: {
    title: "Revestimiento Tampa Bay — JR One Aluminum",
    description: "Hardie Board, vinilo, aluminio. Proteccion resistente al clima. (844) 444-3114.",
    url: "https://jronegutters.com/es/revestimiento-tampa",
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
