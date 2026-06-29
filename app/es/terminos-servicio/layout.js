// Spanish metadata + JSON-LD for /es/terminos-servicio.

const breadcrumbSchemaEs = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Inicio", item: "https://www.jronegutters.com/es" },
    { "@type": "ListItem", position: 2, name: "Terminos de Servicio", item: "https://www.jronegutters.com/es/terminos-servicio" },
  ],
};

export const metadata = {
  title: "Terminos de Servicio",
  description: "Los terminos que rigen el uso de jronegutters.com y los estimados, propuestas y servicios de JR One Aluminum LLC en Tampa Bay. Canaletas, sofito, fascia y drenaje. (844) 444-3114.",
  alternates: {
    canonical: "https://www.jronegutters.com/es/terminos-servicio",
    languages: {
      "en-US": "https://www.jronegutters.com/terms-of-service",
      "es-US": "https://www.jronegutters.com/es/terminos-servicio",
      "x-default": "https://www.jronegutters.com/terms-of-service",
    },
  },
  openGraph: {
    title: "Terminos de Servicio",
    description: "Los terminos que rigen el uso de jronegutters.com y los estimados, propuestas y servicios de JR One Aluminum LLC en Tampa Bay. Canaletas, sofito, fascia y drenaje. (844) 444-3114.",
    url: "https://www.jronegutters.com/es/terminos-servicio",
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
