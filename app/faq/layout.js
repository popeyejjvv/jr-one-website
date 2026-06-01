// Metadata for /faq. FAQPage JSON-LD was removed 2026-05-26 per audit Tier 1.6
// (Google deprecated FAQPage rich results for general sites effective 2026-05-07;
// full API removal Aug 2026). Visible Q-and-A content lives in app/faq/page.jsx.

export const metadata = {
  title: "Tampa Gutter, Soffit, Siding FAQ",
  description:
    "Straight answers to every gutter, soffit, fascia, gutter guard, siding, and Peak 301 question Tampa Bay homeowners ask. Still stuck? Call (844) 444-3114.",
  alternates: { canonical: "https://www.jronegutters.com/faq" },
  openGraph: {
    title: "JR One Aluminum FAQ, Tampa Gutter & Soffit Questions Answered",
    description: "60+ honest answers on gutters, soffit, fascia, guards, siding, Peak 301, and insurance claims.",
    url: "https://www.jronegutters.com/faq",
    type: "website",
  },
};

// BreadcrumbList JSON-LD added 2026-05-26 per audit Tier 2.11 — still produces a
// rich result in Google SERPs per https://developers.google.com/search/docs/appearance/structured-data/breadcrumb
const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://www.jronegutters.com" },
    { "@type": "ListItem", position: 2, name: "FAQ", item: "https://www.jronegutters.com/faq" },
  ],
};

export default function Layout({ children }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      {children}
    </>
  );
}
