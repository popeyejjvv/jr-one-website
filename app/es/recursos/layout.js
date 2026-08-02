// Spanish metadata + JSON-LD for /es/recursos.

const breadcrumbSchemaEs = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Inicio", item: "https://www.jronegutters.com/es" },
    { "@type": "ListItem", position: 2, name: "Recursos", item: "https://www.jronegutters.com/es/recursos" },
  ],
};

export const metadata = {
  title: { absolute: "Guías de Cuidado, Licencia y Seguro | JR One Tampa Bay" },
  description: "Descargue la guía de mantenimiento de canaletas, sofito y fascia, el certificado de LLC activa de Florida y el seguro de JR One. En inglés y español.",
  alternates: {
    canonical: "https://www.jronegutters.com/es/recursos",
    languages: {
      "en-US": "https://www.jronegutters.com/resources",
      "es-US": "https://www.jronegutters.com/es/recursos",
      "x-default": "https://www.jronegutters.com/resources",
    },
  },
  openGraph: {
    title: "Recursos de JR One Aluminum | Guías, Licencia y Seguro",
    description: "Guía de mantenimiento de canaletas, sofito y fascia, certificado de LLC activa de Florida y seguro de JR One. En inglés y español.",
    url: "https://www.jronegutters.com/es/recursos",
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
