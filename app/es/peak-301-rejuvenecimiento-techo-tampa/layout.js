// Spanish metadata + JSON-LD for /es/peak-301-rejuvenecimiento-techo-tampa.
// Peak 301: shingle roofs ONLY per brand-brain Pillar 03.

const serviceSchemaEs = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Rejuvenecimiento de Techo Peak 301",
  serviceType: "Rejuvenecimiento de Techo de Tejas Asfálticas",
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
  description: "Rejuvenecimiento de techo Peak 301 a base de soya, solo techos de tejas asfálticas. Extiende la vida del techo 6 a 10 años. Hasta 70% menos que un techo nuevo. No funciona en techos planos, metal o teja. Garantía de producto (términos confirmados en la evaluación).",
};

const breadcrumbSchemaEs = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Inicio", item: "https://www.jronegutters.com/es" },
    { "@type": "ListItem", position: 2, name: "Peak 301 Rejuvenecimiento de Techo", item: "https://www.jronegutters.com/es/peak-301-rejuvenecimiento-techo-tampa" },
  ],
};

export const metadata = {
  title: "Peak 301 Rejuvenecimiento de Techo Tampa FL | Solo Tejas",
  description: "Peak 301 a base de soya, solo techos de tejas asfálticas en Tampa Bay. Extiende vida 6-10 años. Hasta 70% menos que techo nuevo. (844) 444-3114.",
  alternates: {
    canonical: "https://www.jronegutters.com/es/peak-301-rejuvenecimiento-techo-tampa",
    languages: {
      "en-US": "https://www.jronegutters.com/peak-301",
      "es-US": "https://www.jronegutters.com/es/peak-301-rejuvenecimiento-techo-tampa",
      "x-default": "https://www.jronegutters.com/peak-301",
    },
  },
  openGraph: {
    title: "Peak 301 Rejuvenecimiento de Techo Tampa - JR One Aluminum",
    description: "Peak 301 solo en techos de tejas asfálticas. Extiende vida 6-10 años. 70% menos que techo nuevo. (844) 444-3114.",
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
