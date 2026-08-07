// Spanish metadata + JSON-LD for /es/peak-301-rejuvenecimiento-techo-tampa.
// Peak 301: shingle roofs ONLY per brand-brain Pillar 03.

const serviceSchemaEs = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Sellador de Rejuvenecimiento de Tejas Peak 301",
  serviceType: "Sellador de Rejuvenecimiento para Tejas Asfálticas",
  inLanguage: "es-US",
  provider: {
    "@type": "HomeAndConstructionBusiness",
    name: "JR One Aluminum LLC",
    url: "https://www.jronegutters.com",
    telephone: "(844) 444-3114",
    address: { "@type": "PostalAddress", streetAddress: "3420 W Cherry St", addressLocality: "Tampa", addressRegion: "FL", postalCode: "33607", addressCountry: "US" },
    availableLanguage: ["en", "es"],
  },
  areaServed: ["Tampa", "St. Petersburg", "Clearwater", "Brandon", "Riverview", "Wesley Chapel"].map((name) => ({ "@type": "City", name })),
  description: "Sellador de rejuvenecimiento Peak 301 a base de soya, aplicado sobre las tejas asfálticas que ya tiene su casa en Tampa Bay. Suma de 6 a 10 años de vida útil a las tejas por hasta 70% menos que un techo nuevo. Solo tejas asfálticas: no se aplica en techos planos, de metal ni de teja de barro. No es un reemplazo ni una reparación de techo.",
};

const breadcrumbSchemaEs = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Inicio", item: "https://www.jronegutters.com/es" },
    { "@type": "ListItem", position: 2, name: "Peak 301 Rejuvenecimiento de Tejas", item: "https://www.jronegutters.com/es/peak-301-rejuvenecimiento-techo-tampa" },
  ],
};

export const metadata = {
  // title.absolute drops the global "| JR One Aluminum" template tail (A1 pattern,
  // wave 4 ES). Wording is deliberately "tejas", not "techo": Peak 301 is a sealant
  // applied to existing shingles, never a roof repair or replacement, and the
  // 6-year warranty TERM was removed to match the English page.
  title: { absolute: "Peak 301 Rejuvenecimiento de Tejas Tampa | Equipos Propios" },
  description: "Sellador Peak 301 a base de soya para tejas asfálticas de Tampa Bay. Suma 6 a 10 años de vida por hasta 70% menos que un techo nuevo: (844) 444-3114.",
  alternates: {
    canonical: "https://www.jronegutters.com/es/peak-301-rejuvenecimiento-techo-tampa",
    languages: {
      "en-US": "https://www.jronegutters.com/peak-301",
      "es-US": "https://www.jronegutters.com/es/peak-301-rejuvenecimiento-techo-tampa",
      "x-default": "https://www.jronegutters.com/peak-301",
    },
  },
  openGraph: {
    title: "Peak 301 Rejuvenecimiento de Tejas Tampa - JR One Aluminum",
    description: "Sellador a base de soya sobre las tejas asfálticas que ya tiene. Suma 6 a 10 años de vida útil. (844) 444-3114.",
    url: "https://www.jronegutters.com/es/peak-301-rejuvenecimiento-techo-tampa",
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
