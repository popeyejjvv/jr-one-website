// Spanish metadata + JSON-LD for /es/politica-privacidad.

const breadcrumbSchemaEs = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Inicio", item: "https://www.jronegutters.com/es" },
    { "@type": "ListItem", position: 2, name: "Política de Privacidad", item: "https://www.jronegutters.com/es/politica-privacidad" },
  ],
};

export const metadata = {
  title: "Política de Privacidad",
  description: "Cómo JR One Aluminum LLC recopila, usa y protege la información que usted comparte en jronegutters.com. Especialistas en canaletas en Tampa. (844) 444-3114.",
  alternates: {
    canonical: "https://www.jronegutters.com/es/politica-privacidad",
    languages: {
      "en-US": "https://www.jronegutters.com/privacy-policy",
      "es-US": "https://www.jronegutters.com/es/politica-privacidad",
      "x-default": "https://www.jronegutters.com/privacy-policy",
    },
  },
  openGraph: {
    title: "Política de Privacidad",
    description: "Cómo JR One Aluminum LLC recopila, usa y protege la información que usted comparte en jronegutters.com. Especialistas en canaletas en Tampa. (844) 444-3114.",
    url: "https://www.jronegutters.com/es/politica-privacidad",
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
