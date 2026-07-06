// Spanish metadata + JSON-LD for /es/evaluacion-drenaje-tampa.
// Mirrors /drainage-assessment with hreflang alternates wired both ways.

const serviceSchemaEs = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Evaluacion de Drenaje y Drenaje Subterraneo",
  serviceType: "Instalación de Drenaje Subterraneo",
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
  description: "Instalación de drenaje subterraneo en Tampa Bay: tuberia PVC, cuencas de captacion, rejillas de superficie y emisores pop-up. Soluciones para hogares con problemas de agua estancada, erosion del jardin y inundacion de cimientos.",
};

const breadcrumbSchemaEs = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Inicio", item: "https://www.jronegutters.com/es" },
    { "@type": "ListItem", position: 2, name: "Evaluacion de Drenaje", item: "https://www.jronegutters.com/es/evaluacion-drenaje-tampa" },
  ],
};

export const metadata = {
  title: "Evaluacion de Drenaje Tampa FL | PVC, Cuencas de Captacion, Emisores Pop-Up | JR One",
  description: "Instalación de drenaje subterraneo en Tampa Bay. Tuberia PVC, cuencas de captacion, rejillas, emisores pop-up. Soluciones para agua estancada y erosion. (844) 444-3114.",
  alternates: {
    canonical: "https://www.jronegutters.com/es/evaluacion-drenaje-tampa",
    languages: {
      "en-US": "https://www.jronegutters.com/drainage-assessment",
      "es-US": "https://www.jronegutters.com/es/evaluacion-drenaje-tampa",
      "x-default": "https://www.jronegutters.com/drainage-assessment",
    },
  },
  openGraph: {
    title: "Evaluacion de Drenaje Tampa Bay - JR One Aluminum",
    description: "Tuberia PVC + cuencas de captacion + rejillas + emisores pop-up. Soluciones reales para agua estancada. (844) 444-3114.",
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
