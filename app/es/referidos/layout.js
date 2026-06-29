// Spanish metadata + JSON-LD for /es/referidos.

const breadcrumbSchemaEs = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Inicio", item: "https://www.jronegutters.com/es" },
    { "@type": "ListItem", position: 2, name: "Referidos", item: "https://www.jronegutters.com/es/referidos" },
  ],
};

export const metadata = {
  title: "Programa de Referidos Tampa - Gana $80",
  description: "Refiere a un vecino de Tampa Bay para canaletas, sofito o fascia y gana una tarjeta de regalo de $80 cuando contrate. Empresa familiar, mas de 30 anos. (844) 444-3114.",
  alternates: {
    canonical: "https://www.jronegutters.com/es/referidos",
    languages: {
      "en-US": "https://www.jronegutters.com/referral",
      "es-US": "https://www.jronegutters.com/es/referidos",
      "x-default": "https://www.jronegutters.com/referral",
    },
  },
  openGraph: {
    title: "Programa de Referidos Tampa - Gana $80",
    description: "Refiere a un vecino de Tampa Bay para canaletas, sofito o fascia y gana una tarjeta de regalo de $80 cuando contrate. Empresa familiar, mas de 30 anos. (844) 444-3114.",
    url: "https://www.jronegutters.com/es/referidos",
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
