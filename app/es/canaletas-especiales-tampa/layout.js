// Spanish metadata + JSON-LD for /es/canaletas-especiales-tampa.
// Mirrors /specialty-gutters with hreflang alternates wired both ways.

const serviceSchemaEs = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Canaletas Especiales",
  serviceType: "Sistemas de Canaletas Especiales",
  inLanguage: "es-US",
  provider: {
    "@type": "HomeAndConstructionBusiness",
    name: "JR One Aluminum LLC",
    url: "https://www.jronegutters.com",
    telephone: "(844) 444-3114",
    address: { "@type": "PostalAddress", streetAddress: "3420 W Cherry St", addressLocality: "Tampa", addressRegion: "FL", postalCode: "33607", addressCountry: "US" },
    availableLanguage: ["en", "es"],
  },
  areaServed: ["Tampa", "South Tampa", "St. Petersburg", "Clearwater", "Sarasota", "Bradenton"].map((name) => ({ "@type": "City", name })),
  description: "Sistemas de canaletas especiales en Tampa Bay: media caña, estilo D, caja comercial y super canaletas. Para hogares arquitectónicos, comerciales y proyectos personalizados.",
};

const breadcrumbSchemaEs = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Inicio", item: "https://www.jronegutters.com/es" },
    { "@type": "ListItem", position: 2, name: "Canaletas Especiales", item: "https://www.jronegutters.com/es/canaletas-especiales-tampa" },
  ],
};

export const metadata = {
  // title.absolute drops the global "| JR One Aluminum" template tail plus the
  // hardcoded second "| JR One" that rendered twice (A1 pattern, wave 4 ES).
  // The old title spelled media caña without its tilde, which reads as a
  // completely different word (half grey hair, not half round). Tilde restored.
  title: { absolute: "Canaletas Especiales Tampa FL | Financiamiento Disponible" },
  description: "Canaletas de media caña, estilo D, caja comercial y super canaleta para casas arquitectónicas y proyectos a medida de Tampa Bay. Llame al (844) 444-3114.",
  alternates: {
    canonical: "https://www.jronegutters.com/es/canaletas-especiales-tampa",
    languages: {
      "en-US": "https://www.jronegutters.com/specialty-gutters",
      "es-US": "https://www.jronegutters.com/es/canaletas-especiales-tampa",
      "x-default": "https://www.jronegutters.com/specialty-gutters",
    },
  },
  openGraph: {
    title: "Canaletas Especiales Tampa Bay - JR One Aluminum",
    description: "Media caña, estilo D, caja comercial y super canaleta. Para casas arquitectónicas y proyectos comerciales. (844) 444-3114.",
    url: "https://www.jronegutters.com/es/canaletas-especiales-tampa",
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
