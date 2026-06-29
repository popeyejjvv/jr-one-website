// Spanish metadata + JSON-LD for /es/garantias.

const breadcrumbSchemaEs = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Inicio", item: "https://www.jronegutters.com/es" },
    { "@type": "ListItem", position: 2, name: "Garantias", item: "https://www.jronegutters.com/es/garantias" },
  ],
};

export const metadata = {
  title: "Garantias de Canaletas Tampa Bay",
  description: "Garantia de mano de obra de 3 anos mas garantias del fabricante en canaletas, sofito y fascia de JR One Aluminum. Por escrito. Llame al (844) 444-3114.",
  alternates: {
    canonical: "https://www.jronegutters.com/es/garantias",
    languages: {
      "en-US": "https://www.jronegutters.com/warranties",
      "es-US": "https://www.jronegutters.com/es/garantias",
      "x-default": "https://www.jronegutters.com/warranties",
    },
  },
  openGraph: {
    title: "Garantias de Canaletas Tampa Bay",
    description: "Garantia de mano de obra de 3 anos mas garantias del fabricante en canaletas, sofito y fascia de JR One Aluminum. Por escrito. Llame al (844) 444-3114.",
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
