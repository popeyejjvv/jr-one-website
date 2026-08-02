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
  title: { absolute: "Galería de Proyectos | Canaletas y Sofito en Tampa Bay" },
  description: "Fotos reales de trabajos terminados en Tampa Bay: canaletas continuas, protectores, sofito, fascia, cobre y revestimiento. Sin imágenes de archivo.",
  alternates: {
    canonical: "https://www.jronegutters.com/es/proyectos",
    languages: {
      "en-US": "https://www.jronegutters.com/projects",
      "es-US": "https://www.jronegutters.com/es/proyectos",
      "x-default": "https://www.jronegutters.com/projects",
    },
  },
  openGraph: {
    title: "Galería de Proyectos de JR One Aluminum en Tampa Bay",
    description: "Fotos reales de trabajos terminados en Tampa Bay: canaletas continuas, protectores, sofito, fascia, cobre y revestimiento. Sin imágenes de archivo.",
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
