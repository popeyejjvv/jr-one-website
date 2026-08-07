const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Peak 301 Roof Rejuvenation",
  serviceType: "Roof Rejuvenation Treatment",
  provider: {
    "@type": "HomeAndConstructionBusiness",
    name: "JR One Aluminum LLC",
    url: "https://www.jronegutters.com",
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
    "Peak 301 soy-based roof rejuvenation treatment in Tampa Bay. Penetrates asphalt shingles to restore oils lost to UV and heat. Adds 6-10 years of roof life. May help homeowners document remaining roof useful life for their insurer's review.",
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://www.jronegutters.com" },
    { "@type": "ListItem", position: 2, name: "Peak 301 Roof Rejuvenation", item: "https://www.jronegutters.com/peak-301" },
  ],
};

export const metadata = {
  title: "Peak 301 Roof Rejuvenation Tampa",
  description:
    "Peak 301 soy-based roof rejuvenation in Tampa Bay. Adds 6-10 years of life. May help document remaining roof life for your insurer's renewal review. Free inspection, (844) 444-3114.",
  alternates: {
    canonical: "https://www.jronegutters.com/peak-301",
    languages: {
      "en-US": "https://www.jronegutters.com/peak-301",
      "es-US": "https://www.jronegutters.com/es/peak-301-rejuvenecimiento-techo-tampa",
      "x-default": "https://www.jronegutters.com/peak-301",
    },
  },
  openGraph: {
    title: "Peak 301 Roof Rejuvenation Tampa FL, JR One Aluminum",
    description: "Extend roof life 6-10 years at a fraction of replacement cost. May help document remaining roof life for insurer review.",
    url: "https://www.jronegutters.com/peak-301",
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
