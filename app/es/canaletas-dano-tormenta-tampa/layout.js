// Spanish metadata + Spanish JSON-LD for /es/canaletas-dano-tormenta-tampa.
// Mirrors /storm-damage-gutters-tampa with Spanish content. Hreflang alternates
// pair this URL with its English counterpart for proper bilingual signaling.

const serviceSchemaEs = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Reparacion de Canaletas Danadas por Tormenta",
  serviceType: "Instalacion y Reparacion de Canaletas",
  inLanguage: "es-US",
  provider: {
    "@type": "HomeAndConstructionBusiness",
    name: "JR One Aluminum LLC",
    url: "https://www.jronegutters.com",
    telephone: "(844) 444-3114",
    address: { "@type": "PostalAddress", streetAddress: "3420 W Cherry St", addressLocality: "Tampa", addressRegion: "FL", postalCode: "33607", addressCountry: "US" },
  },
  areaServed: [
    "Tampa", "St. Petersburg", "Clearwater", "Brandon", "Riverview", "Wesley Chapel",
    "Lutz", "Land O' Lakes", "New Tampa", "Valrico", "Lithia", "Plant City",
    "Temple Terrace", "Oldsmar", "Safety Harbor", "Dunedin", "Palm Harbor",
    "Tarpon Springs", "Largo", "Seminole", "Pinellas Park"
  ].map((name) => ({ "@type": "City", name })),
  description:
    "Reparacion de canaletas, fascia, sofito y bajantes danados por huracan o tormenta con nombre en Tampa Bay. Instalacion misma semana. Canaletas continuas de 6 y 7 pulgadas solamente (no 5 pulgadas en Florida). Documentacion para reclamo de seguro. Familia, mas de 30 anos en el oficio.",
  availableLanguage: ["en", "es"],
};

const breadcrumbSchemaEs = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Inicio", item: "https://www.jronegutters.com/es" },
    { "@type": "ListItem", position: 2, name: "Reparacion de Canaletas por Tormenta", item: "https://www.jronegutters.com/es/canaletas-dano-tormenta-tampa" },
  ],
};

export const metadata = {
  title: "Reparacion de Canaletas por Tormenta Tampa FL - Misma Semana",
  description:
    "Canaletas, fascia, sofito danados por huracan en Tampa Bay. Instalacion misma semana, documentacion para seguro. Familia, mas de 30 anos. (844) 444-3114.",
  alternates: {
    canonical: "https://www.jronegutters.com/es/canaletas-dano-tormenta-tampa",
    languages: {
      "en-US": "https://www.jronegutters.com/storm-damage-gutters-tampa",
      "es-US": "https://www.jronegutters.com/es/canaletas-dano-tormenta-tampa",
      "x-default": "https://www.jronegutters.com/storm-damage-gutters-tampa",
    },
  },
  openGraph: {
    title: "Reparacion de Canaletas por Tormenta Tampa Bay - JR One Aluminum",
    description: "Instalacion misma semana para canaletas, fascia y sofito danados por huracan. Documentacion para seguro. (844) 444-3114.",
    url: "https://www.jronegutters.com/es/canaletas-dano-tormenta-tampa",
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
