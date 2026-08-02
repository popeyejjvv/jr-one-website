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
  // title.absolute drops the global "| JR One Aluminum" template tail so the city
  // plus one approved offer survive SERP truncation (A1 pattern, wave 4 ES).
  title: { absolute: "Planes de Mantenimiento de Canaletas Tampa | Equipos Propios" },
  description: "Planes de limpieza y mantenimiento de canaletas en Tampa Bay para casas, HOA y administradores de propiedades. Tres niveles, sin contrato: (844) 444-3114.",
  alternates: {
    canonical: "https://www.jronegutters.com/es/planes-de-servicio-tampa",
    languages: {
      "en-US": "https://www.jronegutters.com/service-plans",
      "es-US": "https://www.jronegutters.com/es/planes-de-servicio-tampa",
      "x-default": "https://www.jronegutters.com/service-plans",
    },
  },
  openGraph: {
    title: "Planes de Mantenimiento de Canaletas Tampa - JR One Aluminum",
    description: "Tres niveles de limpieza y mantenimiento de canaletas, sin contrato. Empresa familiar, más de 30 años. (844) 444-3114.",
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
