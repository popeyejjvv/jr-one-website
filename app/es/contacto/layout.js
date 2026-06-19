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
  title: "Contacta a un Especialista en Canaletas Tampa Bay",
  description: "Llama al (844) 444-3114 o escribe a info@jronegutters.com. 3420 W Cherry St, Tampa. Lun-Sab 7am-6pm. Estimados gratis en Hillsborough, Pinellas y Pasco.",
  alternates: {
    canonical: "https://www.jronegutters.com/es/contacto",
    languages: {
      "en-US": "https://www.jronegutters.com/contact",
      "es-US": "https://www.jronegutters.com/es/contacto",
      "x-default": "https://www.jronegutters.com/contact",
    },
  },
  openGraph: {
    title: "Contacta a un Especialista en Canaletas Tampa Bay",
    description: "Llama al (844) 444-3114 o escribe a info@jronegutters.com. 3420 W Cherry St, Tampa. Lun-Sab 7am-6pm. Estimados gratis en Hillsborough, Pinellas y Pasco.",
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
