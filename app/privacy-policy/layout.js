// Server-side metadata + canonical + breadcrumb for /privacy-policy.
// The page itself is a client component, so without this layout it inherited
// the root homepage canonical (the broken-canonical bug fixed elsewhere on
// 2026-05-23). Self-canonical + sitemap entry added 2026-06-15 SEO audit.

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://www.jronegutters.com" },
    { "@type": "ListItem", position: 2, name: "Privacy Policy", item: "https://www.jronegutters.com/privacy-policy" },
  ],
};

export const metadata = {
  title: "Privacy Policy",
  description:
    "How JR One Aluminum LLC collects, uses, and protects the information you share through jronegutters.com and our estimate forms. Tampa Bay gutter, soffit, and fascia specialty trade.",
  alternates: { canonical: "https://www.jronegutters.com/privacy-policy" },
  robots: { index: true, follow: true },
};

export default function Layout({ children }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      {children}
    </>
  );
}
