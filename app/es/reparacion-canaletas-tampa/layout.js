// Spanish metadata + JSON-LD for /es/reparacion-canaletas-tampa.

const serviceSchemaEs = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Reparacion de Canaletas",
  serviceType: "Reparacion de Canaletas",
  inLanguage: "es-US",
  provider: {
    "@type": "HomeAndConstructionBusiness",
    name: "JR One Aluminum LLC",
    url: "https://jronegutters.com",
    telephone: "(844) 444-3114",
    address: { "@type": "PostalAddress", streetAddress: "3420 W Cherry St", addressLocality: "Tampa", addressRegion: "FL", postalCode: "33607", addressCountry: "US" },
    availableLanguage: ["en", "es"],
  },
  areaServed: ["Tampa", "St. Petersburg", "Clearwater", "Brandon", "Riverview", "Wesley Chapel"].map((name) => ({ "@type": "City", name })),
  description: "Reparacion de canaletas en Tampa Bay: hundimientos, fugas, desbordamiento, reemplazo de bajantes, dano de tormenta. Servicio misma semana. Familia, mas de 30 anos en el oficio.",
};

const breadcrumbSchemaEs = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Inicio", item: "https://jronegutters.com/es" },
    { "@type": "ListItem", position: 2, name: "Reparacion de Canaletas", item: "https://jronegutters.com/es/reparacion-canaletas-tampa" },
  ],
};

const faqSchemaEs = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  inLanguage: "es-US",
  mainEntityOfPage: "https://jronegutters.com/es/reparacion-canaletas-tampa",
  mainEntity: [
    { "@type": "Question", name: "Por que se desbordan mis canaletas con lluvia fuerte?", acceptedAnswer: { "@type": "Answer", text: "Tres causas comunes en Tampa Bay: (1) las canaletas son demasiado pequenas (5 pulgadas en un techo que necesita 6 o 7 pulgadas; nosotros solo instalamos 6 y 7), (2) la pendiente esta incorrecta y el agua se acumula en lugar de correr al bajante, o (3) los bajantes son muy pequenos para el area del techo. JR One Aluminum diagnostica cual es durante el estimado gratis." } },
    { "@type": "Question", name: "Las canaletas hundidas se pueden re-instalar en lugar de reemplazar?", acceptedAnswer: { "@type": "Answer", text: "Usualmente si. La mayoria del hundimiento se arregla con ganchos ocultos correctos espaciados para carga de viento de huracan, no con canaletas nuevas. Re-ajustamos la pendiente del tramo, instalamos nuevos sujetadores, y re-sellamos las esquinas. El reemplazo completo solo se necesita cuando el aluminio en si esta corroido o el tramo se dimensiono mal." } },
    { "@type": "Question", name: "Hacen reparacion de canaletas danadas por tormenta?", acceptedAnswer: { "@type": "Answer", text: "Si. El dano por huracan y tormenta con nombre a canaletas, fascia, sofito y bajantes es una oferta principal de JR One. Despachamos misma semana durante la temporada de tormentas y proveemos fotografias listas para seguro y estimados de contratista para su ajustador." } },
  ],
};

export const metadata = {
  title: "Reparacion de Canaletas Tampa FL | Hundimientos y Fugas",
  description: "Reparacion de canaletas en Tampa Bay: hundimientos, fugas, desbordamiento, dano de tormenta. Servicio misma semana. (844) 444-3114. Hablamos espanol.",
  alternates: {
    canonical: "https://jronegutters.com/es/reparacion-canaletas-tampa",
    languages: {
      "en-US": "https://jronegutters.com/gutter-repair",
      "es-US": "https://jronegutters.com/es/reparacion-canaletas-tampa",
      "x-default": "https://jronegutters.com/gutter-repair",
    },
  },
  openGraph: {
    title: "Reparacion de Canaletas Tampa — JR One Aluminum",
    description: "Hundimientos, fugas, desbordamiento, dano de tormenta. Servicio misma semana. (844) 444-3114.",
    url: "https://jronegutters.com/es/reparacion-canaletas-tampa",
    type: "website",
    locale: "es_US",
  },
};

export default function Layout({ children }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchemaEs) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchemaEs) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchemaEs) }} />
      {children}
    </>
  );
}
