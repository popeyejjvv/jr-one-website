// Spanish metadata + JSON-LD for /es/protectores-canaletas-tampa.

const serviceSchemaEs = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Instalacion de Protectores de Canaleta",
  serviceType: "Protectores de Canaleta Micro-Malla",
  inLanguage: "es-US",
  provider: {
    "@type": "HomeAndConstructionBusiness",
    name: "JR One Aluminum LLC",
    url: "https://jronegutters.com",
    telephone: "(844) 444-3114",
    address: { "@type": "PostalAddress", streetAddress: "3420 W Cherry St", addressLocality: "Tampa", addressRegion: "FL", postalCode: "33607", addressCountry: "US" },
    availableLanguage: ["en", "es"],
  },
  areaServed: ["Tampa", "St. Petersburg", "Clearwater", "Brandon", "Riverview", "Wesley Chapel", "Lutz"].map((name) => ({ "@type": "City", name })),
  description: "Protectores de canaleta de malla fina y acero inoxidable en Tampa Bay. Bloquean hasta agujas de pino y arena de techo. Reducen limpieza de trimestral a anual. Familia, mas de 30 anos en el oficio.",
};

const breadcrumbSchemaEs = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Inicio", item: "https://jronegutters.com/es" },
    { "@type": "ListItem", position: 2, name: "Protectores de Canaleta", item: "https://jronegutters.com/es/protectores-canaletas-tampa" },
  ],
};

const faqSchemaEs = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  inLanguage: "es-US",
  mainEntityOfPage: "https://jronegutters.com/es/protectores-canaletas-tampa",
  mainEntity: [
    { "@type": "Question", name: "Funcionan los protectores con pinos y robles?", acceptedAnswer: { "@type": "Answer", text: "Los protectores correctos si. JR One instala protectores de canaleta de malla fina de acero inoxidable que bloquean agujas de pino, arena de techo, y escombros de palma. Los protectores baratos de aluminio perforado NO funcionan contra agujas de pino, por eso no los vendemos." } },
    { "@type": "Question", name: "Valen la pena los protectores de canaleta en Florida?", acceptedAnswer: { "@type": "Answer", text: "Para la mayoria de hogares de Tampa Bay con dosel maduro de arboles, si. Los protectores de canaleta reducen la frecuencia de limpieza de trimestral a anual en la mayoria de los casos y previenen el ciclo de pudricion de fascia que sigue al desbordamiento de canaletas tapadas. El retorno usualmente es de 2 a 4 anos." } },
    { "@type": "Question", name: "Puedo instalar protectores en mis canaletas existentes?", acceptedAnswer: { "@type": "Answer", text: "Si, si las canaletas existentes todavia estan en buen estado. Evaluamos la condicion de la canaleta durante el estimado gratis y cotizamos protectores retrofit en canaletas existentes o canaletas nuevas con protectores integrados si el sistema existente esta fallando." } },
  ],
};

export const metadata = {
  title: "Protectores de Canaleta Tampa FL | Malla Fina Anti-Pino",
  description: "Protectores de canaleta micro-malla en Tampa Bay. Bloquean agujas de pino y arena. Reducen limpieza a anual. (844) 444-3114. Hablamos espanol.",
  alternates: {
    canonical: "https://jronegutters.com/es/protectores-canaletas-tampa",
    languages: {
      "en-US": "https://jronegutters.com/gutter-guards",
      "es-US": "https://jronegutters.com/es/protectores-canaletas-tampa",
      "x-default": "https://jronegutters.com/gutter-guards",
    },
  },
  openGraph: {
    title: "Protectores de Canaleta Tampa — JR One Aluminum",
    description: "Micro-malla anti-pino. Reduce limpieza a anual. Familia, mas de 30 anos. (844) 444-3114.",
    url: "https://jronegutters.com/es/protectores-canaletas-tampa",
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
