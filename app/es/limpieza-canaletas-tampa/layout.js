// Spanish metadata + JSON-LD for /es/limpieza-canaletas-tampa.

const serviceSchemaEs = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Limpieza y Mantenimiento de Canaletas",
  serviceType: "Limpieza de Canaletas",
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
  description: "Limpieza profesional de canaletas en Tampa Bay. Remocion completa de escombros, lavado de bajantes, prueba de flujo, fotografias de inspeccion. Casa unifamiliar tipica $150-$400. Familia, mas de 30 anos en el oficio.",
  offers: { "@type": "Offer", priceCurrency: "USD", availability: "https://schema.org/InStock" },
};

const breadcrumbSchemaEs = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Inicio", item: "https://www.jronegutters.com/es" },
    { "@type": "ListItem", position: 2, name: "Limpieza de Canaletas", item: "https://www.jronegutters.com/es/limpieza-canaletas-tampa" },
  ],
};

export const metadata = {
  title: "Limpieza de Canaletas Tampa FL | $150-$400 Casa Unifamiliar",
  description: "Limpieza profesional de canaletas en Tampa Bay. Remocion completa, lavado de bajantes, fotografias. Casa unifamiliar $150-$400. (844) 444-3114. Hablamos espanol.",
  alternates: {
    canonical: "https://www.jronegutters.com/es/limpieza-canaletas-tampa",
    languages: {
      "en-US": "https://www.jronegutters.com/gutter-cleaning",
      "es-US": "https://www.jronegutters.com/es/limpieza-canaletas-tampa",
      "x-default": "https://www.jronegutters.com/gutter-cleaning",
    },
  },
  openGraph: {
    title: "Limpieza de Canaletas Tampa - JR One Aluminum",
    description: "Limpieza completa, lavado de bajantes, fotografias. $150-$400 casa unifamiliar. (844) 444-3114.",
    url: "https://www.jronegutters.com/es/limpieza-canaletas-tampa",
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
