const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Gutter Repair Tampa",
  serviceType: "Gutter Repair",
  image: "https://www.jronegutters.com/images/seamless-gutter-install.webp",
  provider: {
    "@type": "HomeAndConstructionBusiness",
    "@id": "https://jronegutters.com/#business",
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
    { "@type": "City", name: "Sarasota" },
    { "@type": "City", name: "Bradenton" },
    { "@type": "City", name: "Lakeland" },
    { "@type": "City", name: "Largo" },
  ],
  description:
    "Gutter repair Tampa Bay, fix sagging gutters, leaking seams, pulled hangers, clogged downspouts, pitch correction, and combined fascia repair. Same-week scheduling. 30+ years of aluminum specialist experience.",
  offers: {
    "@type": "Offer",
    priceCurrency: "USD",
    price: "0",
    description: "Free on-site gutter repair assessment in Tampa Bay",
    availability: "https://schema.org/InStock",
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://www.jronegutters.com" },
    { "@type": "ListItem", position: 2, name: "Services", item: "https://www.jronegutters.com" },
    { "@type": "ListItem", position: 3, name: "Gutter Repair Tampa", item: "https://www.jronegutters.com/gutter-repair" },
  ],
};

const imageObjectSchema = {
  "@context": "https://schema.org",
  "@type": "ImageObject",
  contentUrl: "https://www.jronegutters.com/images/seamless-gutter-install.webp",
  url: "https://www.jronegutters.com/images/seamless-gutter-install.webp",
  caption: "JR One Aluminum crew installing seamless aluminum gutter on a Tampa Bay home",
  description: "Professional gutter installer mounting a 6-inch white seamless aluminum gutter on a Florida home, gutter machine visible in the driveway.",
  creditText: "JR One Aluminum LLC",
  creator: { "@type": "Organization", "@id": "https://jronegutters.com/#organization" },
};

export const metadata = {
  title: "Gutter Repair Tampa Bay FL",
  description:
    "Gutter repair near you in Tampa FL. We fix sagging gutters, leaking seams, overflow and downspouts, often same week. Free inspection, call (844) 444-3114.",
  alternates: {
    canonical: "https://www.jronegutters.com/gutter-repair",
    languages: {
      "en-US": "https://www.jronegutters.com/gutter-repair",
      "es-US": "https://www.jronegutters.com/es/reparacion-canaletas-tampa",
      "x-default": "https://www.jronegutters.com/gutter-repair",
    },
  },
  keywords: [
    "gutter repair tampa",
    "gutter repair tampa fl",
    "sagging gutter repair tampa",
    "leaking gutter repair tampa",
    "gutter pitch correction tampa",
    "downspout repair tampa",
    "fascia gutter repair tampa",
  ],
  openGraph: {
    title: "Gutter Repair Tampa | JR One Aluminum",
    description: "Tampa Bay gutter repair specialists. Sagging, leaks, overflow, fascia. Fixed same week by aluminum experts with 30+ years experience. (844) 444-3114.",
    url: "https://www.jronegutters.com/gutter-repair",
    type: "website",
    images: [
      {
        url: "https://www.jronegutters.com/images/seamless-gutter-install.webp",
        width: 1920,
        height: 1080,
        alt: "JR One Aluminum installer repairing a seamless gutter on a Tampa Bay home",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Gutter Repair Tampa | JR One Aluminum",
    description: "Same-week scheduling. Sagging, leaks, overflow, fascia. (844) 444-3114.",
    images: ["https://www.jronegutters.com/images/seamless-gutter-install.webp"],
  },
};

export default function Layout({ children }) {
  return (
    <>
      <link rel="preload" as="image" href="/images/seamless-gutter-install.webp" fetchPriority="high" />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(imageObjectSchema) }} />
      {children}
    </>
  );
}
