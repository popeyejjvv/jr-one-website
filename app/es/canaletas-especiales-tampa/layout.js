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
    url: "https://jronegutters.com",
    telephone: "(844) 444-3114",
    address: { "@type": "PostalAddress", streetAddress: "3420 W Cherry St", addressLocality: "Tampa", addressRegion: "FL", postalCode: "33607", addressCountry: "US" },
    availableLanguage: ["en", "es"],
  },
  areaServed: ["Tampa", "South Tampa", "St. Petersburg", "Clearwater", "Sarasota", "Bradenton"].map((name) => ({ "@type": "City", name })),
  description: "Sistemas de canaletas especiales en Tampa Bay: media cana, estilo D, caja comercial y super canaletas. Para hogares arquitectonicos, comerciales y proyectos personalizados.",
};

const breadcrumbSchemaEs = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Inicio", item: "https://jronegutters.com/es" },
    { "@type": "ListItem", position: 2, name: "Canaletas Especiales", item: "https://jronegutters.com/es/canaletas-especiales-tampa" },
  ],
};

export const metadata = {
  title: "Canaletas Especiales Tampa FL | Media Cana, Caja Comercial, Estilo D | JR One",
  description: "Sistemas de canaletas especiales en Tampa Bay. Media cana, estilo D, caja comercial, super canaleta. Para arquitectura y comercial. (844) 444-3114.",
  alternates: {
    canonical: "https://jronegutters.com/es/canaletas-especiales-tampa",
    languages: {
      "en-US": "https://jronegutters.com/specialty-gutters",
      "es-US": "https://jronegutters.com/es/canaletas-especiales-tampa",
      "x-default": "https://jronegutters.com/specialty-gutters",
    },
  },
  openGraph: {
    title: "Canaletas Especiales Tampa Bay — JR One Aluminum",
    description: "Media cana, estilo D, caja comercial, super canaleta. Para arquitectura y comercial. (844) 444-3114.",
    url: "https://jronegutters.com/es/canaletas-especiales-tampa",
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
