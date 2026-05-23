const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Gutter Repair",
  serviceType: "Gutter Repair",
  provider: {
    "@type": "HomeAndConstructionBusiness",
    name: "JR One Aluminum LLC",
    url: "https://jronegutters.com",
    telephone: "(844) 444-3114",
    address: { "@type": "PostalAddress", addressLocality: "Tampa", addressRegion: "FL", addressCountry: "US" },
  },
  areaServed: [
    { "@type": "City", name: "Tampa" },
    { "@type": "City", name: "Brandon" },
    { "@type": "City", name: "Riverview" },
    { "@type": "City", name: "Wesley Chapel" },
    { "@type": "City", name: "Clearwater" },
    { "@type": "City", name: "St. Petersburg" },
  ],
  description:
    "Gutter repair in Tampa Bay, fix sagging gutters, leaking seams, pulled hangers, clogged downspouts, pitch correction, and combined fascia repair. 30+ years of aluminum specialist experience.",
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://jronegutters.com" },
    { "@type": "ListItem", position: 2, name: "Gutter Repair", item: "https://jronegutters.com/gutter-repair" },
  ],
};

export const metadata = {
  title: "Gutter Repair Tampa FL | Sagging, Leaks, Overflow Fixed Fast",
  description:
    "Gutter repair in Tampa Bay, sagging gutters, leaking seams, clogged downspouts, pitch correction, fascia repair. Same-week scheduling. Free assessment, (844) 444-3114.",
  alternates: {
    canonical: "https://jronegutters.com/gutter-repair",
    languages: {
      "en-US": "https://jronegutters.com/gutter-repair",
      "es-US": "https://jronegutters.com/es/reparacion-canaletas-tampa",
      "x-default": "https://jronegutters.com/gutter-repair",
    },
  },
  openGraph: {
    title: "Gutter Repair Tampa FL, JR One Aluminum",
    description: "Tampa Bay gutter repair specialists. Sagging, leaks, overflow, fascia, fixed by aluminum experts with 30+ years experience.",
    url: "https://jronegutters.com/gutter-repair",
    type: "website",
  },
};

export default function Layout({ children }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      {children}
    </>
  );
}
