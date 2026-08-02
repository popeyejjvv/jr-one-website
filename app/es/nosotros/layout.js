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
  title: { absolute: "Empresa Familiar de Canaletas en Tampa | Sobre JR One" },
  description: "La historia de JR One Aluminum: una familia hondureña, más de 30 años doblando aluminio en Tampa Bay y tres cuadrillas propias, nunca subcontratistas.",
  alternates: {
    canonical: "https://www.jronegutters.com/es/nosotros",
    languages: {
      "en-US": "https://www.jronegutters.com/about",
      "es-US": "https://www.jronegutters.com/es/nosotros",
      "x-default": "https://www.jronegutters.com/about",
    },
  },
  openGraph: {
    title: "Sobre JR One Aluminum | Empresa Familiar de Canaletas en Tampa",
    description: "Una familia hondureña, más de 30 años doblando aluminio en Tampa Bay y tres cuadrillas propias, nunca subcontratistas. (844) 444-3114.",
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
