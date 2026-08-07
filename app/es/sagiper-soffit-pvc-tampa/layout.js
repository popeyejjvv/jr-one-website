// Spanish metadata + JSON-LD for /es/sagiper-soffit-pvc-tampa.
// Mirrors /sagiper with hreflang alternates wired both ways.

const serviceSchemaEs = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Instalación de Sofito Sagiper de PVC Premium",
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
  description: "Instalación de sofito y revestimiento Sagiper de PVC celular en Tampa Bay. Textura de veta de madera natural que no se pudre y no necesita pintura, solo un lavado periódico. Hecho para el clima húmedo de Florida.",
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
  // title.absolute drops the global "| JR One Aluminum" template tail plus the
  // hardcoded second "| JR One" (A1 pattern, wave 4 ES).
  // Maintenance claims: "cero mantenimiento" is banned in every form, including
  // the "prácticamente" hedge that used to live here. Superseded 2026-08-07 -
  // no exterior product on this site is zero maintenance. Say what the product
  // actually resists (rot, repainting) and what it still needs (periodic washing).
  title: { absolute: "Sofito Sagiper de PVC Tampa FL | Financiamiento Disponible" },
  description: "Sofito y revestimiento Sagiper de PVC celular con textura de veta de madera natural en Tampa Bay. No se pudre y no necesita pintura: (844) 444-3114.",
  alternates: {
    canonical: "https://www.jronegutters.com/es/sagiper-soffit-pvc-tampa",
    languages: {
      "en-US": "https://www.jronegutters.com/sagiper",
      "es-US": "https://www.jronegutters.com/es/sagiper-soffit-pvc-tampa",
      "x-default": "https://www.jronegutters.com/sagiper",
    },
  },
  openGraph: {
    title: "Sofito Sagiper de PVC Tampa Bay - JR One Aluminum",
    description: "Textura de veta de madera natural. Sin repintado ni sellado. No se pudre. (844) 444-3114.",
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
