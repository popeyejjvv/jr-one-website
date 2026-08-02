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
  // Roof wording removed from the title: JR One is a specialty exterior trade.
  title: { absolute: "Financiamiento de Canaletas y Sofito | Pagos Mensuales" },
  description: "Pague su proyecto de canaletas, sofito, fascia o revestimiento en pagos mensuales. Aprobación rápida y el mismo precio que al contado. (844) 444-3114.",
  alternates: {
    canonical: "https://www.jronegutters.com/es/financiamiento",
    languages: {
      "en-US": "https://www.jronegutters.com/financing",
      "es-US": "https://www.jronegutters.com/es/financiamiento",
      "x-default": "https://www.jronegutters.com/financing",
    },
  },
  openGraph: {
    title: "Financiamiento de JR One Aluminum | Canaletas y Sofito Tampa",
    description: "Pague su proyecto de canaletas, sofito, fascia o revestimiento en pagos mensuales. Aprobación rápida y el mismo precio que al contado. (844) 444-3114.",
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
