// Spanish metadata + JSON-LD for /es/mantenimiento-propiedad-alquiler-tampa.
// Mirrors /rental-property-maintenance with hreflang alternates wired both ways.

const serviceSchemaEs = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Mantenimiento de Canaletas para Propiedades de Alquiler",
  serviceType: "Servicio de Mantenimiento de Propiedades de Alquiler",
  inLanguage: "es-US",
  provider: {
    "@type": "HomeAndConstructionBusiness",
    name: "JR One Aluminum LLC",
    url: "https://www.jronegutters.com",
    telephone: "(844) 444-3114",
    address: { "@type": "PostalAddress", streetAddress: "3420 W Cherry St", addressLocality: "Tampa", addressRegion: "FL", postalCode: "33607", addressCountry: "US" },
    availableLanguage: ["en", "es"],
  },
  areaServed: ["Tampa", "St. Petersburg", "Clearwater", "Brandon", "Riverview", "Wesley Chapel", "Lutz", "Sarasota", "Bradenton"].map((name) => ({ "@type": "City", name })),
  description: "Mantenimiento programado de canaletas para propiedades de alquiler en Tampa Bay: Airbnb, VRBO, alquileres de largo plazo y carteras de inversion. Limpieza, inspección y reparaciones para inversionistas.",
};

const breadcrumbSchemaEs = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Inicio", item: "https://www.jronegutters.com/es" },
    { "@type": "ListItem", position: 2, name: "Mantenimiento Propiedad Alquiler", item: "https://www.jronegutters.com/es/mantenimiento-propiedad-alquiler-tampa" },
  ],
};

export const metadata = {
  title: "Mantenimiento de Canaletas para Alquileres Tampa FL | Airbnb, LTR, Inversionista | JR One",
  description: "Mantenimiento de canaletas para propiedades de alquiler en Tampa Bay. Airbnb, alquiler a largo plazo, carteras de inversion. Limpieza programada. (844) 444-3114.",
  alternates: {
    canonical: "https://www.jronegutters.com/es/mantenimiento-propiedad-alquiler-tampa",
    languages: {
      "en-US": "https://www.jronegutters.com/rental-property-maintenance",
      "es-US": "https://www.jronegutters.com/es/mantenimiento-propiedad-alquiler-tampa",
      "x-default": "https://www.jronegutters.com/rental-property-maintenance",
    },
  },
  openGraph: {
    title: "Mantenimiento Propiedades de Alquiler Tampa Bay - JR One Aluminum",
    description: "Airbnb, LTR, inversionista. Mantenimiento programado de canaletas. (844) 444-3114.",
    url: "https://www.jronegutters.com/es/mantenimiento-propiedad-alquiler-tampa",
    type: "website",
    locale: "es_US",
  },
};

export default function Layout({ children }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchemaEs) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchemaEs) }} />
      {children}
    </>
  );
}
