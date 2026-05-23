// Spanish metadata + JSON-LD for /es/sofito-fascia-tampa.

const serviceSchemaEs = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Reemplazo de Sofito y Fascia",
  serviceType: "Sofito y Fascia de Aluminio",
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
  description: "Reemplazo de sofito y fascia en Tampa Bay. Conversion completa de madera a aluminio que detiene el ciclo de pudricion permanentemente. Sofito de aluminio ventilado del color de las canaletas. Familia, mas de 30 anos en el oficio.",
};

const breadcrumbSchemaEs = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Inicio", item: "https://jronegutters.com/es" },
    { "@type": "ListItem", position: 2, name: "Sofito y Fascia", item: "https://jronegutters.com/es/sofito-fascia-tampa" },
  ],
};

const faqSchemaEs = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  inLanguage: "es-US",
  mainEntityOfPage: "https://jronegutters.com/es/sofito-fascia-tampa",
  mainEntity: [
    { "@type": "Question", name: "Como se si mi fascia esta podrido?", acceptedAnswer: { "@type": "Answer", text: "Senales de pudricion de fascia: madera suave o esponjosa al presionar un destornillador, pintura que se descascara y no se queda, canaleta separandose de la casa, manchas oscuras en la linea del techo, y pajaros o avispas entrando por huecos. La humedad de Florida acelera la pudricion de fascia, especialmente detras de canaletas que se desbordan." } },
    { "@type": "Question", name: "Sofito y fascia se deben reemplazar juntos?", acceptedAnswer: { "@type": "Answer", text: "Usualmente si. La pudricion de fascia casi siempre significa que la humedad tambien ha estado entrando detras del sofito. JR One Aluminum remueve ambos, reemplaza el tablero de fascia, lo envuelve en aluminio con acabado de fabrica que combina con la canaleta, e instala sofito de aluminio ventilado. El envoltorio de aluminio detiene el ciclo de pudricion permanentemente." } },
    { "@type": "Question", name: "Cual es la diferencia entre sofito ventilado y solido?", acceptedAnswer: { "@type": "Answer", text: "El sofito ventilado tiene perforaciones que dejan circular el aire del atico, lo cual mantiene el atico mas fresco y reduce las facturas de AC. El sofito solido se usa en areas seleccionadas como techos de porches o donde el atico esta climatizado. La mayoria del sofito en una casa de Tampa Bay debe ser ventilado." } },
  ],
};

export const metadata = {
  title: "Reemplazo de Sofito y Fascia Tampa FL | Aluminio Ventilado",
  description: "Sofito y fascia de aluminio en Tampa Bay. Conversion de madera a aluminio que detiene el ciclo de pudricion. Del color de las canaletas. (844) 444-3114. Hablamos espanol.",
  alternates: {
    canonical: "https://jronegutters.com/es/sofito-fascia-tampa",
    languages: {
      "en-US": "https://jronegutters.com/soffit-and-fascia",
      "es-US": "https://jronegutters.com/es/sofito-fascia-tampa",
      "x-default": "https://jronegutters.com/soffit-and-fascia",
    },
  },
  openGraph: {
    title: "Sofito y Fascia Tampa — JR One Aluminum",
    description: "Reemplazo de sofito y fascia en aluminio. Detiene el ciclo de pudricion permanentemente. (844) 444-3114.",
    url: "https://jronegutters.com/es/sofito-fascia-tampa",
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
