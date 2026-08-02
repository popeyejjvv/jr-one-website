// Spanish metadata + JSON-LD for /es/contacto.

const breadcrumbSchemaEs = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Inicio", item: "https://www.jronegutters.com/es" },
    { "@type": "ListItem", position: 2, name: "Contacto", item: "https://www.jronegutters.com/es/contacto" },
  ],
};

export const metadata = {
  title: { absolute: "Contacto y Teléfono | Canaletas y Sofito en Tampa Bay" },
  description: "Llame al (844) 444-3114 o escriba a info@jronegutters.com. 3420 W Cherry St, Tampa. Lunes a sábado de 7am a 6pm. Servimos Hillsborough, Pinellas y Pasco.",
  alternates: {
    canonical: "https://www.jronegutters.com/es/contacto",
    languages: {
      "en-US": "https://www.jronegutters.com/contact",
      "es-US": "https://www.jronegutters.com/es/contacto",
      "x-default": "https://www.jronegutters.com/contact",
    },
  },
  openGraph: {
    title: "Contacto y Teléfono | JR One Aluminum Tampa Bay",
    description: "Llame al (844) 444-3114 o escriba a info@jronegutters.com. 3420 W Cherry St, Tampa. Lunes a sábado de 7am a 6pm. Estimados gratis.",
    url: "https://www.jronegutters.com/es/contacto",
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
