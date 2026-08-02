// Spanish metadata + JSON-LD for /es/preguntas-frecuentes.

const breadcrumbSchemaEs = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Inicio", item: "https://www.jronegutters.com/es" },
    { "@type": "ListItem", position: 2, name: "Preguntas Frecuentes", item: "https://www.jronegutters.com/es/preguntas-frecuentes" },
  ],
};

export const metadata = {
  title: { absolute: "Preguntas Frecuentes | Canaletas, Sofito y Fascia Tampa" },
  description: "Qué servicios hacemos, por qué solo canaletas de 6 y 7 pulgadas, si usamos subcontratistas y qué cubre la garantía. Respuestas directas de Tampa Bay.",
  alternates: {
    canonical: "https://www.jronegutters.com/es/preguntas-frecuentes",
    languages: {
      "en-US": "https://www.jronegutters.com/faq",
      "es-US": "https://www.jronegutters.com/es/preguntas-frecuentes",
      "x-default": "https://www.jronegutters.com/faq",
    },
  },
  openGraph: {
    title: "Preguntas Frecuentes | JR One Aluminum Tampa Bay",
    description: "Qué servicios hacemos, por qué solo canaletas de 6 y 7 pulgadas, si usamos subcontratistas y qué cubre la garantía. Llame al (844) 444-3114.",
    url: "https://www.jronegutters.com/es/preguntas-frecuentes",
    type: "website",
    locale: "es_US",
  },
};

export default function Layout({ children }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchemaEs) }} />
      {children}
    </>
  );
}
