// Spanish metadata + JSON-LD for /es/evaluacion-drenaje-tampa.
// Mirrors /drainage-assessment with hreflang alternates wired both ways.

const serviceSchemaEs = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Evaluación de Drenaje y Drenaje Subterráneo",
  serviceType: "Instalación de Drenaje Subterráneo",
  inLanguage: "es-US",
  provider: {
    "@type": "HomeAndConstructionBusiness",
    name: "JR One Aluminum LLC",
    url: "https://www.jronegutters.com",
    telephone: "(844) 444-3114",
    address: { "@type": "PostalAddress", streetAddress: "3420 W Cherry St", addressLocality: "Tampa", addressRegion: "FL", postalCode: "33607", addressCountry: "US" },
    availableLanguage: ["en", "es"],
  },
  areaServed: ["Tampa", "St. Petersburg", "Clearwater", "Brandon", "Riverview", "Wesley Chapel", "Lutz", "Land O' Lakes", "Sarasota", "Bradenton"].map((name) => ({ "@type": "City", name })),
  description: "Instalación de drenaje subterráneo en Tampa Bay: tubería de PVC subterránea, cajas colectoras, rejillas de superficie, emisores emergentes y conexión de bajante. Para casas con agua estancada, erosión del jardín y agua acumulada junto a los cimientos. Esos cinco componentes son el alcance completo del servicio de drenaje de JR One.",
};

const breadcrumbSchemaEs = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Inicio", item: "https://www.jronegutters.com/es" },
    { "@type": "ListItem", position: 2, name: "Evaluación de Drenaje", item: "https://www.jronegutters.com/es/evaluacion-drenaje-tampa" },
  ],
};

export const metadata = {
  // title.absolute drops the global "| JR One Aluminum" template tail plus the
  // hardcoded second "| JR One" (A1 pattern, wave 4 ES). Scope wording is locked to
  // the verified five items only; french drains and channel drains are out of scope.
  title: { absolute: "Drenaje Subterráneo en Tampa FL | Financiamiento Disponible" },
  description: "Drenaje subterráneo de PVC, cajas colectoras, rejillas y emisores emergentes conectados a sus bajantes en Tampa Bay. Evaluación gratis: (844) 444-3114.",
  alternates: {
    canonical: "https://www.jronegutters.com/es/evaluacion-drenaje-tampa",
    languages: {
      "en-US": "https://www.jronegutters.com/drainage-assessment",
      "es-US": "https://www.jronegutters.com/es/evaluacion-drenaje-tampa",
      "x-default": "https://www.jronegutters.com/drainage-assessment",
    },
  },
  openGraph: {
    title: "Evaluación de Drenaje Tampa Bay - JR One Aluminum",
    description: "Tubería de PVC, cajas colectoras, rejillas de superficie y emisores emergentes para el agua estancada de su jardín. (844) 444-3114.",
    url: "https://www.jronegutters.com/es/evaluacion-drenaje-tampa",
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
