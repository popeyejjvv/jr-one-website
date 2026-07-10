// Spanish metadata + JSON-LD for /es/nosotros.

const breadcrumbSchemaEs = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Inicio", item: "https://www.jronegutters.com/es" },
    { "@type": "ListItem", position: 2, name: "Sobre Nosotros", item: "https://www.jronegutters.com/es/nosotros" },
  ],
};

export const metadata = {
  title: "Sobre Nosotros - Especialistas en Canaletas Tampa",
  description: "Empresa familiar, más de 30 años en el oficio de canaletas, sofito, fascia y revestimiento en Tampa Bay. Christopher Rivera y cuadrillas internas, sin subcontratistas. (844) 444-3114.",
  alternates: {
    canonical: "https://www.jronegutters.com/es/nosotros",
    languages: {
      "en-US": "https://www.jronegutters.com/about",
      "es-US": "https://www.jronegutters.com/es/nosotros",
      "x-default": "https://www.jronegutters.com/about",
    },
  },
  openGraph: {
    title: "Sobre Nosotros - Especialistas en Canaletas Tampa",
    description: "Empresa familiar, más de 30 años en el oficio de canaletas, sofito, fascia y revestimiento en Tampa Bay. Christopher Rivera y cuadrillas internas, sin subcontratistas. (844) 444-3114.",
    url: "https://www.jronegutters.com/es/nosotros",
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
