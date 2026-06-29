// Server-side metadata + canonical + breadcrumb schema for /warranties.
// Added 2026-05-23 to fix the broken-canonical bug.

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://www.jronegutters.com" },
    { "@type": "ListItem", position: 2, name: "Warranties", item: "https://www.jronegutters.com/warranties" },
  ],
};

export const metadata = {
  title: "Gutter Warranties Tampa Bay",
  description:
    "Workmanship and product warranties on JR One Aluminum gutters, soffit, fascia, and drainage jobs. Locked in writing. (844) 444-3114.",
  alternates: {
    canonical: "https://www.jronegutters.com/warranties",
    languages: {
      "en-US": "https://www.jronegutters.com/warranties",
      "es-US": "https://www.jronegutters.com/es/garantias",
      "x-default": "https://www.jronegutters.com/warranties",
    },
  },
  openGraph: {
    title: "JR One Aluminum Warranties - Tampa Bay",
    description: "Workmanship and product warranties on Tampa Bay gutter, soffit, fascia, and drainage jobs.",
    url: "https://www.jronegutters.com/warranties",
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
