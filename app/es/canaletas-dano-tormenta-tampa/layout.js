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
    url: "https://jronegutters.com",
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
    { "@type": "ListItem", position: 1, name: "Inicio", item: "https://jronegutters.com/es" },
    { "@type": "ListItem", position: 2, name: "Reparacion de Canaletas por Tormenta", item: "https://jronegutters.com/es/canaletas-dano-tormenta-tampa" },
  ],
};

const faqSchemaEs = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "@id": "https://jronegutters.com/es/canaletas-dano-tormenta-tampa#faq",
  mainEntityOfPage: "https://jronegutters.com/es/canaletas-dano-tormenta-tampa",
  inLanguage: "es-US",
  mainEntity: [
    { "@type": "Question", name: "Mi seguro de hogar cubre canaletas danadas por tormenta?", acceptedAnswer: { "@type": "Answer", text: "La mayoria de polizas de hogar en Florida cubren dano de tormenta a canaletas, fascia, sofito y bajantes cuando el dano viene de una tormenta con nombre o un evento de clima severo documentado. La cobertura depende de su poliza, su deducible y la causa del dano. JR One Aluminum documenta el dano para que su ajustador tenga lo que necesita." } },
    { "@type": "Question", name: "Que tan rapido pueden reemplazar las canaletas despues de un huracan?", acceptedAnswer: { "@type": "Answer", text: "JR One Aluminum reserva instalaciones misma semana durante la temporada de tormentas. Hay material en stock en el taller de Tampa. La mayoria de instalaciones residenciales se hacen en un dia. Despues de una tormenta con nombre priorizamos por severidad." } },
    { "@type": "Question", name: "Instalan ganchos resistentes a huracan?", acceptedAnswer: { "@type": "Answer", text: "Si. Toda instalacion de JR One usa ganchos ocultos atornillados espaciados para carga de viento de huracan. No usamos ganchos de clavo porque se zafan bajo fuerza ascendente." } },
    { "@type": "Question", name: "Pueden envolver el fascia en aluminio para evitar la proxima pudricion?", acceptedAnswer: { "@type": "Answer", text: "Si. JR One Aluminum reemplaza el tablero de fascia podrido, lo imprime, lo envuelve en aluminio con acabado de fabrica del color de las canaletas nuevas, y re-instala. El envoltorio de aluminio detiene el ciclo de pudricion permanentemente." } },
    { "@type": "Question", name: "Tambien hacen trabajo de techo por dano de tormenta?", acceptedAnswer: { "@type": "Answer", text: "No. JR One Aluminum es oficio especializado en canaletas, sofito, fascia y drenaje. Para techos danados por tormenta referimos a techadores confiables. JR One si instala rejuvenecimiento de techo Peak 301 en techos de tejas que no estan danados pero estan envejecidos." } },
    { "@type": "Question", name: "Cuanto cuesta una instalacion post-tormenta?", acceptedAnswer: { "@type": "Answer", text: "El precio depende de pies lineales, conteo de bajantes, extension del dano a fascia y sofito, tamano de canaleta (6 o 7 pulgadas), color y acceso. JR One Aluminum mide en sitio, fotografia el dano y da el precio en persona. El estimado es gratis." } },
  ],
};

export const metadata = {
  title: "Reparacion de Canaletas por Tormenta Tampa FL — Misma Semana",
  description:
    "Canaletas, fascia, sofito danados por huracan en Tampa Bay. Instalacion misma semana, documentacion para seguro. Familia, mas de 30 anos. (844) 444-3114.",
  alternates: {
    canonical: "https://jronegutters.com/es/canaletas-dano-tormenta-tampa",
    languages: {
      "en-US": "https://jronegutters.com/storm-damage-gutters-tampa",
      "es-US": "https://jronegutters.com/es/canaletas-dano-tormenta-tampa",
      "x-default": "https://jronegutters.com/storm-damage-gutters-tampa",
    },
  },
  openGraph: {
    title: "Reparacion de Canaletas por Tormenta Tampa Bay — JR One Aluminum",
    description: "Instalacion misma semana para canaletas, fascia y sofito danados por huracan. Documentacion para seguro. (844) 444-3114.",
    url: "https://jronegutters.com/es/canaletas-dano-tormenta-tampa",
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
