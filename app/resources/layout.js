// Server-side metadata + canonical + breadcrumb schema for /resources.
// Added 2026-05-23 to fix the broken-canonical bug.

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://www.jronegutters.com" },
    { "@type": "ListItem", position: 2, name: "Resources", item: "https://www.jronegutters.com/resources" },
  ],
};

export const metadata = {
  title: "Gutter, Soffit & Fascia Resources, Tampa",
  description:
    "Tampa Bay homeowner guides on gutter sizes (we install 6\" and 7\" only), cleaning frequency, fascia repair, Peak 301 roof rejuvenation, and hurricane prep.",
  alternates: {
    canonical: "https://www.jronegutters.com/resources",
    languages: {
      "en-US": "https://www.jronegutters.com/resources",
      "es-US": "https://www.jronegutters.com/es/recursos",
      "x-default": "https://www.jronegutters.com/resources",
    },
  },
  openGraph: {
    title: "Gutter, Soffit, Fascia Resources - JR One Aluminum",
    description: "Tampa Bay homeowner guides on gutters, soffit, fascia, drainage, and Peak 301.",
    url: "https://www.jronegutters.com/resources",
    type: "website",
  },
};

export default function Layout({ children }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      {children}
    </>
  );
}
