// Spanish metadata + JSON-LD for /es/canaletas-cobre-tampa.
// Mirrors /copper-gutters with hreflang alternates wired both ways.

const serviceSchemaEs = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Instalacion de Canaletas de Cobre",
  serviceType: "Canaletas de Cobre Sin Costura",
  inLanguage: "es-US",
  provider: {
    "@type": "HomeAndConstructionBusiness",
    name: "JR One Aluminum LLC",
    url: "https://jronegutters.com",
    telephone: "(844) 444-3114",
    address: { "@type": "PostalAddress", streetAddress: "3420 W Cherry St", addressLocality: "Tampa", addressRegion: "FL", postalCode: "33607", addressCountry: "US" },
    availableLanguage: ["en", "es"],
  },
  areaServed: ["Tampa", "St. Petersburg", "Clearwater", "Sarasota", "Bradenton"].map((name) => ({ "@type": "City", name })),
  description: "Instalacion de canaletas de cobre a medida para hogares arquitectonicos e historicos de Tampa Bay. Cobre estilo K sin costura y media cana, cabezales conductores de cobre, bajantes de cobre y protectores de cobre. Vida util de mas de 50 anos.",
};

const breadcrumbSchemaEs = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Inicio", item: "https://jronegutters.com/es" },
    { "@type": "ListItem", position: 2, name: "Canaletas de Cobre", item: "https://jronegutters.com/es/canaletas-cobre-tampa" },
  ],
};

export const metadata = {
  title: "Canaletas de Cobre Tampa FL | Sin Costura y Media Cana | JR One",
  description: "Sistemas premium de canaletas de cobre para hogares arquitectonicos de Tampa Bay. Estilo K y media cana sin costura. Vida util de mas de 50 anos. (844) 444-3114.",
  alternates: {
    canonical: "https://jronegutters.com/es/canaletas-cobre-tampa",
    languages: {
      "en-US": "https://jronegutters.com/copper-gutters",
      "es-US": "https://jronegutters.com/es/canaletas-cobre-tampa",
      "x-default": "https://jronegutters.com/copper-gutters",
    },
  },
  openGraph: {
    title: "Canaletas de Cobre Tampa FL — JR One Aluminum",
    description: "Estilo K y media cana sin costura. Para hogares arquitectonicos e historicos. (844) 444-3114.",
    url: "https://jronegutters.com/es/canaletas-cobre-tampa",
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
