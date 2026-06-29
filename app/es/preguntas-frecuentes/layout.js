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
  title: "Preguntas Frecuentes - Canaletas y Sofito Tampa",
  description: "Respuestas honestas sobre canaletas de 6 y 7 pulgadas, sofito, fascia, protectores y revestimiento en Tampa Bay. Llama al (844) 444-3114. Hablamos espanol.",
  alternates: {
    canonical: "https://www.jronegutters.com/es/preguntas-frecuentes",
    languages: {
      "en-US": "https://www.jronegutters.com/faq",
      "es-US": "https://www.jronegutters.com/es/preguntas-frecuentes",
      "x-default": "https://www.jronegutters.com/faq",
    },
  },
  openGraph: {
    title: "Preguntas Frecuentes - Canaletas y Sofito Tampa",
    description: "Respuestas honestas sobre canaletas de 6 y 7 pulgadas, sofito, fascia, protectores y revestimiento en Tampa Bay. Llama al (844) 444-3114. Hablamos espanol.",
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
