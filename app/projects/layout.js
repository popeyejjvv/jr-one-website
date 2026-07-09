// Server-side metadata + canonical + breadcrumb schema for /projects.
// Added 2026-05-23 to fix the broken-canonical bug.

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://www.jronegutters.com" },
    { "@type": "ListItem", position: 2, name: "Projects", item: "https://www.jronegutters.com/projects" },
  ],
};

export const metadata = {
  title: "Tampa Bay Gutter & Soffit Project Gallery",
  description:
    "Real Tampa Bay job site photos. Seamless gutters (6\" and 7\"), soffit and fascia, copper, drainage, Peak 301 roof rejuvenation. Family-owned, over 30 years in the trade.",
  alternates: {
    canonical: "https://www.jronegutters.com/projects",
    languages: {
      "en-US": "https://www.jronegutters.com/projects",
      "es-US": "https://www.jronegutters.com/es/proyectos",
      "x-default": "https://www.jronegutters.com/projects",
    },
  },
  openGraph: {
    title: "JR One Aluminum Project Gallery - Tampa Bay",
    description: "Real Tampa Bay project photos. Gutters, soffit, fascia, copper, drainage, Peak 301.",
    url: "https://www.jronegutters.com/projects",
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
