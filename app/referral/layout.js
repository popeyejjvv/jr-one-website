// Server-side metadata + canonical + breadcrumb schema for /referral.
// Added 2026-05-23 to fix the broken-canonical bug.

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://www.jronegutters.com" },
    { "@type": "ListItem", position: 2, name: "Referral Program", item: "https://www.jronegutters.com/referral" },
  ],
};

export const metadata = {
  title: "JR One Aluminum Referral Program - Tampa Bay Gutter Specialists",
  description:
    "Refer a Tampa Bay neighbor for gutter, soffit, fascia, or Peak 301 work and earn a gift card when they book. Family-owned, over 30 years. (844) 444-3114.",
  alternates: { canonical: "https://www.jronegutters.com/referral" },
  openGraph: {
    title: "JR One Aluminum Referral Program - Tampa Bay",
    description: "Refer a Tampa Bay neighbor and earn a gift card when they book.",
    url: "https://www.jronegutters.com/referral",
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
