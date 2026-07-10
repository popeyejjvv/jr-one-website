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
  title: "Garantías de Canaletas y Peak 301 Tampa Bay",
  description: "Garantía de mano de obra de 3 años más garantías del fabricante en canaletas, sofito, fascia y Peak 301 de JR One Aluminum. Por escrito. Llame al (844) 444-3114.",
  alternates: {
    canonical: "https://www.jronegutters.com/es/garantias",
    languages: {
      "en-US": "https://www.jronegutters.com/warranties",
      "es-US": "https://www.jronegutters.com/es/garantias",
      "x-default": "https://www.jronegutters.com/warranties",
    },
  },
  openGraph: {
    title: "Garantías de Canaletas y Peak 301 Tampa Bay",
    description: "Garantía de mano de obra de 3 años más garantías del fabricante en canaletas, sofito, fascia y Peak 301 de JR One Aluminum. Por escrito. Llame al (844) 444-3114.",
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
