// Spanish metadata + JSON-LD for /es/sagiper-soffit-pvc-tampa.
// Mirrors /sagiper with hreflang alternates wired both ways.

const serviceSchemaEs = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Instalacion de Sofito Sagiper PVC Premium",
  serviceType: "Sofito de PVC con Veta de Madera",
  inLanguage: "es-US",
  provider: {
    "@type": "HomeAndConstructionBusiness",
    name: "JR One Aluminum LLC",
    url: "https://www.jronegutters.com",
    telephone: "(844) 444-3114",
    address: { "@type": "PostalAddress", streetAddress: "3420 W Cherry St", addressLocality: "Tampa", addressRegion: "FL", postalCode: "33607", addressCountry: "US" },
    availableLanguage: ["en", "es"],
  },
  areaServed: ["Tampa", "St. Petersburg", "Clearwater", "Sarasota", "Bradenton"].map((name) => ({ "@type": "City", name })),
  description: "Instalacion de sofito Sagiper PVC premium en Tampa Bay. Apariencia de veta de madera real con cero mantenimiento. No se pudre, no se descolora, ideal para el clima humedo de Florida.",
};

const breadcrumbSchemaEs = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Inicio", item: "https://www.jronegutters.com/es" },
    { "@type": "ListItem", position: 2, name: "Sofito Sagiper PVC", item: "https://www.jronegutters.com/es/sagiper-soffit-pvc-tampa" },
  ],
};

export const metadata = {
  title: "Sofito Sagiper PVC Premium Tampa FL | Veta de Madera, Cero Mantenimiento | JR One",
  description: "Sofito Sagiper PVC premium con apariencia de veta de madera en Tampa Bay. Cero mantenimiento, no se pudre. Ideal para clima humedo de Florida. (844) 444-3114.",
  alternates: {
    canonical: "https://www.jronegutters.com/es/sagiper-soffit-pvc-tampa",
    languages: {
      "en-US": "https://www.jronegutters.com/sagiper",
      "es-US": "https://www.jronegutters.com/es/sagiper-soffit-pvc-tampa",
      "x-default": "https://www.jronegutters.com/sagiper",
    },
  },
  openGraph: {
    title: "Sofito Sagiper PVC Tampa Bay — JR One Aluminum",
    description: "Veta de madera real. Cero mantenimiento. No se pudre. (844) 444-3114.",
    url: "https://www.jronegutters.com/es/sagiper-soffit-pvc-tampa",
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
