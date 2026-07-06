// Spanish metadata + JSON-LD for /es/planes-de-servicio-tampa.

const breadcrumbSchemaEs = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Inicio", item: "https://www.jronegutters.com/es" },
    { "@type": "ListItem", position: 2, name: "Planes de Servicio", item: "https://www.jronegutters.com/es/planes-de-servicio-tampa" },
  ],
};

export const metadata = {
  title: "Planes de Mantenimiento de Canaletas Tampa",
  description: "Planes de limpieza y mantenimiento de canaletas en Tampa Bay para casas, HOA y administradores de propiedades. Tres niveles, sin contratos. Familia, más de 30 años. (844) 444-3114.",
  alternates: {
    canonical: "https://www.jronegutters.com/es/planes-de-servicio-tampa",
    languages: {
      "en-US": "https://www.jronegutters.com/service-plans",
      "es-US": "https://www.jronegutters.com/es/planes-de-servicio-tampa",
      "x-default": "https://www.jronegutters.com/service-plans",
    },
  },
  openGraph: {
    title: "Planes de Mantenimiento de Canaletas Tampa",
    description: "Planes de limpieza y mantenimiento de canaletas en Tampa Bay para casas, HOA y administradores de propiedades. Tres niveles, sin contratos. Familia, más de 30 años. (844) 444-3114.",
    url: "https://www.jronegutters.com/es/planes-de-servicio-tampa",
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
