// Spanish metadata + JSON-LD for /es/proyectos.

const breadcrumbSchemaEs = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Inicio", item: "https://www.jronegutters.com/es" },
    { "@type": "ListItem", position: 2, name: "Proyectos", item: "https://www.jronegutters.com/es/proyectos" },
  ],
};

export const metadata = {
  title: "Proyectos en Tampa Bay - Galeria JR One",
  description: "Fotos reales de trabajos de JR One en Tampa Bay. Canaletas sin costura de 6 y 7 pulgadas, sofito, fascia y cobre. Familiar, mas de 30 anos. (844) 444-3114.",
  alternates: {
    canonical: "https://www.jronegutters.com/es/proyectos",
    languages: {
      "en-US": "https://www.jronegutters.com/projects",
      "es-US": "https://www.jronegutters.com/es/proyectos",
      "x-default": "https://www.jronegutters.com/projects",
    },
  },
  openGraph: {
    title: "Proyectos en Tampa Bay - Galeria JR One",
    description: "Fotos reales de trabajos de JR One en Tampa Bay. Canaletas sin costura de 6 y 7 pulgadas, sofito, fascia y cobre. Familiar, mas de 30 anos. (844) 444-3114.",
    url: "https://www.jronegutters.com/es/proyectos",
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
