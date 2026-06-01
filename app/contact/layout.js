// Server-side metadata + canonical + breadcrumb schema for /contact.
// Added 2026-05-23 to fix the broken-canonical bug.

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://www.jronegutters.com" },
    { "@type": "ListItem", position: 2, name: "Contact", item: "https://www.jronegutters.com/contact" },
  ],
};

export const metadata = {
  title: "Contact JR One Aluminum — Tampa Bay Gutter & Aluminum Specialist",
  description:
    "Call (844) 444-3114 or email info@jronegutters.com. 3420 W Cherry St Tampa, Mon-Sat 7am-6pm. Free estimates across Hillsborough, Pinellas, Pasco.",
  alternates: { canonical: "https://www.jronegutters.com/contact" },
  openGraph: {
    title: "Contact JR One Aluminum — Tampa Bay Specialty Trade",
    description: "Free estimates, (844) 444-3114. Mon-Sat 7am-6pm. 3420 W Cherry St, Tampa.",
    url: "https://www.jronegutters.com/contact",
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
