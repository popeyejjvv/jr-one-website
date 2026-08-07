// Spanish metadata + JSON-LD for /es/centro-recursos-seguros.

const breadcrumbSchemaEs = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Inicio", item: "https://www.jronegutters.com/es" },
    { "@type": "ListItem", position: 2, name: "Centro de Recursos de Seguros", item: "https://www.jronegutters.com/es/centro-recursos-seguros" },
  ],
};

export const metadata = {
  title: "Seguro de Techo Tampa - Centro de Recursos Peak 301",
  description: "La ley de Florida protege su seguro de techo por condición, no por edad. Plantillas gratis, guía de aseguradoras y Peak 301 para tejas asfálticas. (844) 444-3114.",
  alternates: {
    canonical: "https://www.jronegutters.com/es/centro-recursos-seguros",
    languages: {
      "en-US": "https://www.jronegutters.com/insurance-resource-center",
      "es-US": "https://www.jronegutters.com/es/centro-recursos-seguros",
      "x-default": "https://www.jronegutters.com/insurance-resource-center",
    },
  },
  openGraph: {
    title: "Seguro de Techo Tampa - Centro de Recursos Peak 301",
    description: "La ley de Florida protege su seguro de techo por condición, no por edad. Plantillas gratis, guía de aseguradoras y Peak 301 para tejas asfálticas. (844) 444-3114.",
    url: "https://www.jronegutters.com/es/centro-recursos-seguros",
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
