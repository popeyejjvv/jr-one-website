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
  title: "Recursos: Guias, Licencia y Seguro Tampa",
  description: "Guias de cuidado para canaletas, sofito y fascia, más certificado de LLC de Florida y seguro de JR One Aluminum. Para propietarios y constructores en Tampa Bay. (844) 444-3114.",
  alternates: {
    canonical: "https://www.jronegutters.com/es/recursos",
    languages: {
      "en-US": "https://www.jronegutters.com/resources",
      "es-US": "https://www.jronegutters.com/es/recursos",
      "x-default": "https://www.jronegutters.com/resources",
    },
  },
  openGraph: {
    title: "Recursos: Guias, Licencia y Seguro Tampa",
    description: "Guias de cuidado para canaletas, sofito y fascia, más certificado de LLC de Florida y seguro de JR One Aluminum. Para propietarios y constructores en Tampa Bay. (844) 444-3114.",
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
