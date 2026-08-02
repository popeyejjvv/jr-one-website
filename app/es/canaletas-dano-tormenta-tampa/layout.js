// Spanish metadata + Spanish JSON-LD for /es/canaletas-dano-tormenta-tampa.
// Mirrors /storm-damage-gutters-tampa with Spanish content. Hreflang alternates
// pair this URL with its English counterpart for proper bilingual signaling.

const serviceSchemaEs = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Reparación de Canaletas Dañadas por Tormenta",
  serviceType: "Instalación y Reparación de Canaletas",
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
    "Reparación de canaletas, fascia, sofito y bajantes dañados por huracán o tormenta con nombre en Tampa Bay. Programación prioritaria después de la tormenta y evaluación en 24 a 48 horas. Canaletas continuas de 6 y 7 pulgadas solamente. Documentación para su reclamo de seguro. Empresa familiar, más de 30 años en la industria de canaletas de Tampa Bay.",
  availableLanguage: ["en", "es"],
};

const breadcrumbSchemaEs = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Inicio", item: "https://www.jronegutters.com/es" },
    { "@type": "ListItem", position: 2, name: "Reparación de Canaletas por Tormenta", item: "https://www.jronegutters.com/es/canaletas-dano-tormenta-tampa" },
  ],
};

export const metadata = {
  // title.absolute drops the global "| JR One Aluminum" template tail (A1 pattern,
  // wave 4 ES). The old title, meta, schema and OG all carried the banned Spanish
  // same-week promise. Storm work uses priority-scheduling wording instead, plus
  // the true 24 to 48 hour assessment window.
  title: { absolute: "Canaletas Dañadas por Tormenta Tampa | Equipos Propios" },
  description:
    "Reparación de canaletas, fascia y sofito dañados por huracán en Tampa Bay. Programación prioritaria y evaluación en 24 a 48 horas: (844) 444-3114.",
  alternates: {
    canonical: "https://www.jronegutters.com/es/canaletas-dano-tormenta-tampa",
    languages: {
      "en-US": "https://www.jronegutters.com/storm-damage-gutters-tampa",
      "es-US": "https://www.jronegutters.com/es/canaletas-dano-tormenta-tampa",
      "x-default": "https://www.jronegutters.com/storm-damage-gutters-tampa",
    },
  },
  openGraph: {
    title: "Reparación de Canaletas por Tormenta Tampa Bay - JR One Aluminum",
    description: "Programación prioritaria para canaletas, fascia y sofito dañados por huracán. Evaluación en 24 a 48 horas. (844) 444-3114.",
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
