// Server-side metadata + canonical + breadcrumb schema for /financing.
// Added 2026-05-23 to fix the broken-canonical bug.

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://www.jronegutters.com" },
    { "@type": "ListItem", position: 2, name: "Financing", item: "https://www.jronegutters.com/financing" },
  ],
};

export const metadata = {
  title: "Gutter & Roof Financing Tampa FL — Pay Over Time, Quick Approval",
  description:
    "Financing options for Tampa Bay gutter, soffit, fascia, siding, and Peak 301 roof rejuvenation jobs. Quick approval, monthly payments. JR One Aluminum, (844) 444-3114.",
  alternates: { canonical: "https://www.jronegutters.com/financing" },
  openGraph: {
    title: "Gutter & Roof Financing — Tampa Bay JR One Aluminum",
    description: "Quick approval, monthly payments on Tampa Bay gutter and roof rejuvenation jobs.",
    url: "https://www.jronegutters.com/financing",
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
