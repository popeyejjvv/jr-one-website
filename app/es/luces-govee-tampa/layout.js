// Spanish metadata + JSON-LD for /es/luces-govee-tampa.
// Mirrors /govee-lights with hreflang alternates wired both ways.

const serviceSchemaEs = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Instalacion de Luces Govee Permanentes",
  serviceType: "Luces LED Exteriores Permanentes",
  inLanguage: "es-US",
  provider: {
    "@type": "HomeAndConstructionBusiness",
    name: "JR One Aluminum LLC",
    url: "https://www.jronegutters.com",
    telephone: "(844) 444-3114",
    address: { "@type": "PostalAddress", streetAddress: "3420 W Cherry St", addressLocality: "Tampa", addressRegion: "FL", postalCode: "33607", addressCountry: "US" },
    availableLanguage: ["en", "es"],
  },
  areaServed: ["Tampa", "St. Petersburg", "Clearwater", "Brandon", "Riverview", "Wesley Chapel", "Lutz"].map((name) => ({ "@type": "City", name })),
  description: "Instalacion de luces LED Govee permanentes en el exterior de hogares de Tampa Bay. Iluminacion inteligente todo el ano: Navidad, Halloween, 4 de julio, dias normales. Control por aplicacion movil.",
};

const breadcrumbSchemaEs = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Inicio", item: "https://www.jronegutters.com/es" },
    { "@type": "ListItem", position: 2, name: "Luces Govee", item: "https://www.jronegutters.com/es/luces-govee-tampa" },
  ],
};

export const metadata = {
  title: "Luces Govee Permanentes Tampa FL | LED Inteligentes Todo el Ano | JR One",
  description: "Instalacion de luces LED Govee permanentes en Tampa Bay. Iluminacion inteligente todo el ano controlada por app. Navidad, Halloween, dias normales. (844) 444-3114.",
  alternates: {
    canonical: "https://www.jronegutters.com/es/luces-govee-tampa",
    languages: {
      "en-US": "https://www.jronegutters.com/govee-lights",
      "es-US": "https://www.jronegutters.com/es/luces-govee-tampa",
      "x-default": "https://www.jronegutters.com/govee-lights",
    },
  },
  openGraph: {
    title: "Luces Govee Tampa Bay — JR One Aluminum",
    description: "Luces LED permanentes inteligentes. Todo el ano, control por app. (844) 444-3114.",
    url: "https://www.jronegutters.com/es/luces-govee-tampa",
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
