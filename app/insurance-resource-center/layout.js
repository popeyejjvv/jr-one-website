// Server-side metadata + canonical + breadcrumb schema for /insurance-resource-center.
// Added 2026-05-23 to fix the broken-canonical bug.

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://jronegutters.com" },
    { "@type": "ListItem", position: 2, name: "Insurance Resource Center", item: "https://jronegutters.com/insurance-resource-center" },
  ],
};

export const metadata = {
  title: "Tampa Bay Storm Damage & Insurance Claims — Gutter, Soffit, Fascia",
  description:
    "Insurance claim help for storm-damaged gutters, soffit, fascia, and roofs in Tampa Bay. We document damage and provide contractor estimates for your adjuster. (844) 444-3114.",
  alternates: { canonical: "https://jronegutters.com/insurance-resource-center" },
  openGraph: {
    title: "Tampa Bay Storm Damage & Insurance Claims — JR One Aluminum",
    description: "We document storm damage and provide contractor estimates for your insurance adjuster.",
    url: "https://jronegutters.com/insurance-resource-center",
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
