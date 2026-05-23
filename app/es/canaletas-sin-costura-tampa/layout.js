// Spanish metadata + JSON-LD for /es/canaletas-sin-costura-tampa.
// Mirrors /seamless-aluminum-gutters with hreflang alternates wired both ways.

const serviceSchemaEs = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Instalacion de Canaletas Continuas de Aluminio",
  serviceType: "Instalacion de Canaletas Sin Costura",
  inLanguage: "es-US",
  provider: {
    "@type": "HomeAndConstructionBusiness",
    name: "JR One Aluminum LLC",
    url: "https://jronegutters.com",
    telephone: "(844) 444-3114",
    address: { "@type": "PostalAddress", streetAddress: "3420 W Cherry St", addressLocality: "Tampa", addressRegion: "FL", postalCode: "33607", addressCountry: "US" },
    availableLanguage: ["en", "es"],
  },
  areaServed: ["Tampa", "St. Petersburg", "Clearwater", "Brandon", "Riverview", "Wesley Chapel", "Lutz", "Land O' Lakes", "New Tampa", "Valrico", "Lithia", "Plant City"].map((name) => ({ "@type": "City", name })),
  description: "Canaletas continuas de aluminio fabricadas a medida en el sitio en Tampa Bay. Solo instalamos 6 y 7 pulgadas (no 5 pulgadas en Florida). Cobre y galvalume disponibles. Mas de 30 anos de experiencia familiar.",
};

const breadcrumbSchemaEs = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Inicio", item: "https://jronegutters.com/es" },
    { "@type": "ListItem", position: 2, name: "Canaletas Sin Costura", item: "https://jronegutters.com/es/canaletas-sin-costura-tampa" },
  ],
};

const faqSchemaEs = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  inLanguage: "es-US",
  mainEntityOfPage: "https://jronegutters.com/es/canaletas-sin-costura-tampa",
  mainEntity: [
    { "@type": "Question", name: "Que tamano de canaleta instalan?", acceptedAnswer: { "@type": "Answer", text: "JR One Aluminum solo instala canaletas continuas de 6 pulgadas y 7 pulgadas, mas cobre y galvalume del mismo tamano. No instalamos 5 pulgadas en Florida porque el volumen de lluvia anual (51 pulgadas) requiere mayor capacidad. 6 pulgadas es la base para la mayoria de los hogares de Tampa; 7 pulgadas es la mejora para techos mas grandes." } },
    { "@type": "Question", name: "Cuanto dura una canaleta de aluminio en Florida?", acceptedAnswer: { "@type": "Answer", text: "Una canaleta continua de aluminio correctamente instalada dura 20 anos o mas en el clima de Tampa. El acabado de fabrica esta clasificado para mantener el color a traves del sol de Florida sin descolorirse." } },
    { "@type": "Question", name: "Fabrican las canaletas en el sitio?", acceptedAnswer: { "@type": "Answer", text: "Si. Cada tramo de canaleta de JR One Aluminum se corta en el sitio de un solo rollo continuo para coincidir exactamente con la longitud del techo. Esto elimina las juntas de costura entre esquinas y bajantes, que es donde las canaletas seccionales siempre comienzan a filtrarse primero." } },
  ],
};

export const metadata = {
  title: "Canaletas Continuas de Aluminio Tampa FL | 6 y 7 Pulgadas",
  description: "Canaletas continuas de aluminio fabricadas a medida en Tampa Bay. Solo 6 y 7 pulgadas (no 5 pulgadas). Familia, mas de 30 anos en el oficio. Estimado gratis (844) 444-3114.",
  alternates: {
    canonical: "https://jronegutters.com/es/canaletas-sin-costura-tampa",
    languages: {
      "en-US": "https://jronegutters.com/seamless-aluminum-gutters",
      "es-US": "https://jronegutters.com/es/canaletas-sin-costura-tampa",
      "x-default": "https://jronegutters.com/seamless-aluminum-gutters",
    },
  },
  openGraph: {
    title: "Canaletas Continuas de Aluminio Tampa — JR One Aluminum",
    description: "Fabricadas en el sitio. Solo 6 y 7 pulgadas. Mas de 30 anos en el oficio. (844) 444-3114.",
    url: "https://jronegutters.com/es/canaletas-sin-costura-tampa",
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
