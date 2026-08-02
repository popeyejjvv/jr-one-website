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
  title: { absolute: "Gane $80 por Referido | Programa JR One en Tampa Bay" },
  description: "Refiera a un vecino de Tampa Bay y gane una tarjeta de regalo de $80 cuando firme un proyecto de $880 o más. Su vecino recibe 10% de descuento. Sin límite.",
  alternates: {
    canonical: "https://www.jronegutters.com/es/referidos",
    languages: {
      "en-US": "https://www.jronegutters.com/referral",
      "es-US": "https://www.jronegutters.com/es/referidos",
      "x-default": "https://www.jronegutters.com/referral",
    },
  },
  openGraph: {
    title: "Programa de Referidos JR One | Gane $80 en Tampa Bay",
    description: "Refiera a un vecino de Tampa Bay y gane una tarjeta de regalo de $80 cuando firme un proyecto de $880 o más. Sin límite. (844) 444-3114.",
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
