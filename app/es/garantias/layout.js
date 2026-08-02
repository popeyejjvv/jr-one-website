// Spanish metadata + JSON-LD for /es/garantias.

const breadcrumbSchemaEs = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Inicio", item: "https://www.jronegutters.com/es" },
    { "@type": "ListItem", position: 2, name: "Garantías", item: "https://www.jronegutters.com/es/garantias" },
  ],
};

export const metadata = {
  // Peak 301 deliberately NOT listed here: the 3-year workmanship warranty covers
  // gutters, soffit, fascia and siding only. No warranty term is ever stated for Peak 301.
  title: { absolute: "Garantía de Mano de Obra de 3 Años | Canaletas Tampa" },
  description: "Garantía de mano de obra de 3 años en canaletas, sofito, fascia y revestimiento, más las garantías del fabricante. Documentos por escrito: (844) 444-3114.",
  alternates: {
    canonical: "https://www.jronegutters.com/es/garantias",
    languages: {
      "en-US": "https://www.jronegutters.com/warranties",
      "es-US": "https://www.jronegutters.com/es/garantias",
      "x-default": "https://www.jronegutters.com/warranties",
    },
  },
  openGraph: {
    title: "Garantías de JR One Aluminum | Canaletas y Sofito Tampa Bay",
    description: "Garantía de mano de obra de 3 años en canaletas, sofito, fascia y revestimiento, más las garantías del fabricante. Por escrito: (844) 444-3114.",
    url: "https://www.jronegutters.com/es/garantias",
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
