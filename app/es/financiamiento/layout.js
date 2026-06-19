// Spanish metadata + JSON-LD for /es/financiamiento.

const breadcrumbSchemaEs = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Inicio", item: "https://www.jronegutters.com/es" },
    { "@type": "ListItem", position: 2, name: "Financiamiento", item: "https://www.jronegutters.com/es/financiamiento" },
  ],
};

export const metadata = {
  title: "Financiamiento de Canaletas y Techo Tampa FL",
  description: "Financiamiento para canaletas, sofito, fascia, revestimiento y Peak 301 en Tampa Bay. Aprobacion rapida, pagos mensuales. JR One Aluminum, (844) 444-3114.",
  alternates: {
    canonical: "https://www.jronegutters.com/es/financiamiento",
    languages: {
      "en-US": "https://www.jronegutters.com/financing",
      "es-US": "https://www.jronegutters.com/es/financiamiento",
      "x-default": "https://www.jronegutters.com/financing",
    },
  },
  openGraph: {
    title: "Financiamiento de Canaletas y Techo Tampa FL",
    description: "Financiamiento para canaletas, sofito, fascia, revestimiento y Peak 301 en Tampa Bay. Aprobacion rapida, pagos mensuales. JR One Aluminum, (844) 444-3114.",
    url: "https://www.jronegutters.com/es/financiamiento",
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
