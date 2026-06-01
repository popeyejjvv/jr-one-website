// Spanish metadata + JSON-LD for /es/canaletas-sin-costura-tampa.
// Mirrors /seamless-aluminum-gutters with hreflang alternates wired both ways.

const serviceSchemaEs = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Instalacion de Canaletas Continuas de Aluminio",
  serviceType: "Instalacion de Canaletas Sin Costura",
  inLanguage: "es-US",
  provider: {
    "@type": "HomeAndConstructionBusiness",
    name: "JR One Aluminum LLC",
    url: "https://www.jronegutters.com",
    telephone: "(844) 444-3114",
    address: { "@type": "PostalAddress", streetAddress: "3420 W Cherry St", addressLocality: "Tampa", addressRegion: "FL", postalCode: "33607", addressCountry: "US" },
    availableLanguage: ["en", "es"],
  },
  areaServed: ["Tampa", "St. Petersburg", "Clearwater", "Brandon", "Riverview", "Wesley Chapel", "Lutz", "Land O' Lakes", "New Tampa", "Valrico", "Lithia", "Plant City"].map((name) => ({ "@type": "City", name })),
  description: "Canaletas continuas de aluminio fabricadas a medida en el sitio en Tampa Bay. Solo instalamos 6 y 7 pulgadas (no 5 pulgadas en Florida). Cobre y galvalume disponibles. Mas de 30 anos de experiencia familiar.",
};

const breadcrumbSchemaEs = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Inicio", item: "https://www.jronegutters.com/es" },
    { "@type": "ListItem", position: 2, name: "Canaletas Sin Costura", item: "https://www.jronegutters.com/es/canaletas-sin-costura-tampa" },
  ],
};

export const metadata = {
  title: "Canaletas Continuas de Aluminio Tampa FL | 6 y 7 Pulgadas",
  description: "Canaletas continuas de aluminio fabricadas a medida en Tampa Bay. Solo 6 y 7 pulgadas (no 5 pulgadas). Familia, mas de 30 anos en el oficio. Estimado gratis (844) 444-3114.",
  alternates: {
    canonical: "https://www.jronegutters.com/es/canaletas-sin-costura-tampa",
    languages: {
      "en-US": "https://www.jronegutters.com/seamless-aluminum-gutters",
      "es-US": "https://www.jronegutters.com/es/canaletas-sin-costura-tampa",
      "x-default": "https://www.jronegutters.com/seamless-aluminum-gutters",
    },
  },
  openGraph: {
    title: "Canaletas Continuas de Aluminio Tampa — JR One Aluminum",
    description: "Fabricadas en el sitio. Solo 6 y 7 pulgadas. Mas de 30 anos en el oficio. (844) 444-3114.",
    url: "https://www.jronegutters.com/es/canaletas-sin-costura-tampa",
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
