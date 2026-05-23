// Spanish metadata + JSON-LD for /es/peak-301-rejuvenecimiento-techo-tampa.
// Peak 301: shingle roofs ONLY per brand-brain Pillar 03.

const serviceSchemaEs = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Rejuvenecimiento de Techo Peak 301",
  serviceType: "Rejuvenecimiento de Techo de Tejas Asfalticas",
  inLanguage: "es-US",
  provider: {
    "@type": "HomeAndConstructionBusiness",
    name: "JR One Aluminum LLC",
    url: "https://jronegutters.com",
    telephone: "(844) 444-3114",
    address: { "@type": "PostalAddress", streetAddress: "3420 W Cherry St", addressLocality: "Tampa", addressRegion: "FL", postalCode: "33607", addressCountry: "US" },
    availableLanguage: ["en", "es"],
  },
  areaServed: ["Tampa", "St. Petersburg", "Clearwater", "Brandon", "Riverview", "Wesley Chapel"].map((name) => ({ "@type": "City", name })),
  description: "Rejuvenecimiento de techo Peak 301 a base de soya, solo techos de tejas asfalticas. Extiende la vida del techo 6 a 10 anos. Hasta 70% menos que un techo nuevo. No funciona en techos planos, metal o teja. Garantia de producto 6 anos.",
};

const breadcrumbSchemaEs = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Inicio", item: "https://jronegutters.com/es" },
    { "@type": "ListItem", position: 2, name: "Peak 301 Rejuvenecimiento de Techo", item: "https://jronegutters.com/es/peak-301-rejuvenecimiento-techo-tampa" },
  ],
};

const faqSchemaEs = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  inLanguage: "es-US",
  mainEntityOfPage: "https://jronegutters.com/es/peak-301-rejuvenecimiento-techo-tampa",
  mainEntity: [
    { "@type": "Question", name: "Que es Peak 301?", acceptedAnswer: { "@type": "Answer", text: "Peak 301 es un producto de rejuvenecimiento a base de soya aplicado solo a techos de tejas asfalticas. Restaura flexibilidad a las tejas envejecidas y extiende la vida del techo de 6 a 10 anos a hasta 70% menos que una instalacion de techo nuevo. Penetra la teja, restaura los aceites que el UV ha horneado, y sella micro-grietas." } },
    { "@type": "Question", name: "Peak 301 funciona en techos planos, metal o teja?", acceptedAnswer: { "@type": "Answer", text: "No. Peak 301 es un producto solo para techos de tejas asfalticas. JR One Aluminum le dira si su techo no califica y nunca cotiza Peak 301 en techos planos, de metal o de teja. Fotografiamos la condicion de las tejas antes de cotizar para confirmar elegibilidad." } },
    { "@type": "Question", name: "Cuanto cuesta Peak 301 vs un techo nuevo?", acceptedAnswer: { "@type": "Answer", text: "Peak 301 cuesta hasta 70% menos que una instalacion de techo de tejas nuevo. El precio depende de los pies cuadrados del techo, la pendiente y la condicion de las tejas. JR One Aluminum mide el techo, fotografia las tejas y cotiza el trabajo en persona despues de confirmar elegibilidad." } },
  ],
};

export const metadata = {
  title: "Peak 301 Rejuvenecimiento de Techo Tampa FL | Solo Tejas",
  description: "Peak 301 a base de soya, solo techos de tejas asfalticas en Tampa Bay. Extiende vida 6-10 anos. Hasta 70% menos que techo nuevo. (844) 444-3114.",
  alternates: {
    canonical: "https://jronegutters.com/es/peak-301-rejuvenecimiento-techo-tampa",
    languages: {
      "en-US": "https://jronegutters.com/peak-301",
      "es-US": "https://jronegutters.com/es/peak-301-rejuvenecimiento-techo-tampa",
      "x-default": "https://jronegutters.com/peak-301",
    },
  },
  openGraph: {
    title: "Peak 301 Rejuvenecimiento de Techo Tampa — JR One Aluminum",
    description: "Peak 301 solo en techos de tejas asfalticas. Extiende vida 6-10 anos. 70% menos que techo nuevo. (844) 444-3114.",
    url: "https://jronegutters.com/es/peak-301-rejuvenecimiento-techo-tampa",
    type: "website",
    locale: "es_US",
  },
};

export default function Layout({ children }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchemaEs) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchemaEs) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchemaEs) }} />
      {children}
    </>
  );
}
