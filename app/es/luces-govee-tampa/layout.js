// Spanish metadata + JSON-LD for /es/luces-govee-tampa.
// Mirrors /govee-lights with hreflang alternates wired both ways.

const serviceSchemaEs = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Instalación de Luces Govee Exteriores",
  serviceType: "Luces LED Exteriores",
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
  description: "Instalación de luces LED Goveees en el exterior de casas de Tampa Bay. Iluminación inteligente todo el año: Navidad, Halloween, 4 de julio y días normales. Control desde una aplicación móvil, compatible con Alexa y Google Home.",
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
  // title.absolute drops the global "| JR One Aluminum" template tail plus the
  // hardcoded second "| JR One" that rendered twice (A1 pattern, wave 4 ES).
  // The old title wrote año without its tilde, which is a different word entirely.
  title: { absolute: "Luces LED Govee Exteriores Tampa FL | Financiamiento" },
  description: "Instalación de luces LED Goveees en el alero de su casa en Tampa Bay, controladas desde el celular todo el año. Llame al (844) 444-3114.",
  alternates: {
    canonical: "https://www.jronegutters.com/es/luces-govee-tampa",
    languages: {
      "en-US": "https://www.jronegutters.com/govee-lights",
      "es-US": "https://www.jronegutters.com/es/luces-govee-tampa",
      "x-default": "https://www.jronegutters.com/govee-lights",
    },
  },
  openGraph: {
    title: "Luces Govee Tampa Bay - JR One Aluminum",
    description: "Luces LED inteligentes instaladas en el alero. Todo el año, controladas desde el celular. (844) 444-3114.",
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
