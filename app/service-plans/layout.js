// Server-side metadata + canonical + breadcrumb schema for /service-plans.
// Added 2026-05-23 to fix the broken-canonical bug.

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://www.jronegutters.com" },
    { "@type": "ListItem", position: 2, name: "Service Plans", item: "https://www.jronegutters.com/service-plans" },
  ],
};

export const metadata = {
  title: "Gutter & Exterior Maintenance Plans Tampa",
  description:
    "Annual gutter cleaning, soffit and fascia inspection, and exterior maintenance plans for Tampa Bay homeowners, HOAs, and property managers. Family-owned. (844) 444-3114.",
  alternates: { canonical: "https://www.jronegutters.com/service-plans" },
  openGraph: {
    title: "Gutter & Exterior Maintenance Plans - JR One Aluminum",
    description: "Annual gutter, soffit, and fascia maintenance plans for Tampa Bay homes, HOAs, and property managers.",
    url: "https://www.jronegutters.com/service-plans",
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
