// Spanish metadata + JSON-LD for /es/canaletas-sin-costura-tampa.
// Mirrors /seamless-aluminum-gutters with hreflang alternates wired both ways.

const serviceSchemaEs = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Instalación de Canaletas Continuas de Aluminio",
  serviceType: "Instalación de Canaletas Sin Costura",
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
  description: "Canaletas continuas de aluminio fabricadas a medida en el sitio en Tampa Bay. Solo instalamos 6 y 7 pulgadas, en estilo K y media caña. Cobre y galvalume disponibles. Empresa familiar con más de 30 años de experiencia.",
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
  // title.absolute drops the global "| JR One Aluminum" template tail so the
  // city plus one approved offer survive SERP truncation (A1 pattern, wave 2 ES).
  title: { absolute: "Canaletas Continuas Tampa FL | Financiamiento Disponible" },
  description: "Canaletas continuas de aluminio formadas en el sitio para su casa en Tampa Bay. Solo 6 y 7 pulgadas, estilo K y media caña. Llame al (844) 444-3114.",
  alternates: {
    canonical: "https://www.jronegutters.com/es/canaletas-sin-costura-tampa",
    languages: {
      "en-US": "https://www.jronegutters.com/seamless-aluminum-gutters",
      "es-US": "https://www.jronegutters.com/es/canaletas-sin-costura-tampa",
      "x-default": "https://www.jronegutters.com/seamless-aluminum-gutters",
    },
  },
  openGraph: {
    title: "Canaletas Continuas de Aluminio Tampa - JR One Aluminum",
    description: "Formadas en el sitio. Solo 6 y 7 pulgadas. Más de 30 años en el oficio. (844) 444-3114.",
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
