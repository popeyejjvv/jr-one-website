// Spanish metadata + JSON-LD for /es/canaletas-7-pulgadas-tampa.
// Mirrors /7-inch-gutters with hreflang alternates wired both ways.

const serviceSchemaEs = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Instalación de Canaletas de 7 Pulgadas",
  serviceType: "Canaletas Sobredimensionadas de 7 Pulgadas",
  inLanguage: "es-US",
  provider: {
    "@type": "HomeAndConstructionBusiness",
    name: "JR One Aluminum LLC",
    url: "https://www.jronegutters.com",
    telephone: "(844) 444-3114",
    address: { "@type": "PostalAddress", streetAddress: "3420 W Cherry St", addressLocality: "Tampa", addressRegion: "FL", postalCode: "33607", addressCountry: "US" },
    availableLanguage: ["en", "es"],
  },
  areaServed: ["Tampa", "South Tampa", "Davis Islands", "Hyde Park", "St. Petersburg", "Clearwater", "Sarasota", "Bradenton", "Brandon", "Riverview", "Wesley Chapel", "Lutz"].map((name) => ({ "@type": "City", name })),
  description: "Canaletas continuas de aluminio de 7 pulgadas para hogares grandes y de lujo en Tampa Bay. Capacidad de grado comercial para techos extensos, pendientes pronunciadas y lluvia tropical fuerte. JR One instala solamente canaletas de 6 y 7 pulgadas.",
};

const breadcrumbSchemaEs = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Inicio", item: "https://www.jronegutters.com/es" },
    { "@type": "ListItem", position: 2, name: "Canaletas de 7 Pulgadas", item: "https://www.jronegutters.com/es/canaletas-7-pulgadas-tampa" },
  ],
};

export const metadata = {
  // title.absolute drops the global "| JR One Aluminum" template tail plus the
  // hardcoded second "| JR One" that rendered twice (A1 pattern, wave 4 ES).
  title: { absolute: "Canaletas de 7 Pulgadas Tampa FL | Financiamiento Disponible" },
  description: "Canaletas continuas de 7 pulgadas para casas grandes de Tampa Bay, con capacidad de grado comercial para la lluvia tropical. Llame al (844) 444-3114.",
  alternates: {
    canonical: "https://www.jronegutters.com/es/canaletas-7-pulgadas-tampa",
    languages: {
      "en-US": "https://www.jronegutters.com/7-inch-gutters",
      "es-US": "https://www.jronegutters.com/es/canaletas-7-pulgadas-tampa",
      "x-default": "https://www.jronegutters.com/7-inch-gutters",
    },
  },
  openGraph: {
    title: "Canaletas de 7 Pulgadas Tampa Bay - JR One Aluminum",
    description: "Capacidad de grado comercial para techos extensos y lluvia tropical fuerte. Financiamiento disponible. (844) 444-3114.",
    url: "https://www.jronegutters.com/es/canaletas-7-pulgadas-tampa",
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
