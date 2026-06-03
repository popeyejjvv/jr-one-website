const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "7-Inch Seamless Aluminum Gutters Tampa",
  serviceType: "Oversized Gutter Installation",
  image: "https://www.jronegutters.com/images/7inch-gutter-comparison.webp",
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
  ],
  description:
    "Oversized 7-inch seamless aluminum gutters, commercial-grade water capacity for South Tampa luxury homes, large roof areas, and steep-pitched homes that overwhelm standard 6-inch systems. Premium upcharge vs. 6-inch; lifetime protection.",
  offers: { "@type": "Offer", priceCurrency: "USD", availability: "https://schema.org/InStock" },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://www.jronegutters.com" },
    { "@type": "ListItem", position: 2, name: "7-Inch Gutters", item: "https://www.jronegutters.com/7-inch-gutters" },
  ],
};

export const metadata = {
  title: "7-Inch Oversized Gutters Tampa",
  description:
    "Oversized 7\" seamless aluminum gutters for Tampa Bay luxury homes, large roof areas, and steep-pitch properties. Commercial-grade water capacity. Premium upcharge vs 6\", lifetime protection. (844) 444-3114.",
  keywords: "7 inch gutters Tampa, oversized gutters Florida, South Tampa luxury gutters, commercial grade residential gutters, 7 inch seamless aluminum Tampa Bay, upgrade from 6 inch gutter",
  alternates: {
    canonical: "https://www.jronegutters.com/7-inch-gutters",
    languages: {
      "en-US": "https://www.jronegutters.com/7-inch-gutters",
      "es-US": "https://www.jronegutters.com/es/canaletas-7-pulgadas-tampa",
      "x-default": "https://www.jronegutters.com/7-inch-gutters",
    },
  },
  openGraph: {
    title: "7-Inch Gutters Tampa FL, JR One Aluminum",
    description: "Oversized 7-inch seamless gutters for Tampa luxury homes and high-volume roofs. Commercial-grade capacity.",
    url: "https://www.jronegutters.com/7-inch-gutters",
    type: "website",
    images: [{ url: "https://www.jronegutters.com/images/7inch-gutter-comparison.webp", width: 1920, height: 1080, alt: "Side-by-side 5-inch vs 7-inch gutter comparison by JR One Aluminum Tampa" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "7-Inch Gutters Tampa FL, JR One Aluminum",
    description: "Commercial-grade water capacity for South Tampa luxury homes and large-roof properties.",
    images: ["https://www.jronegutters.com/images/7inch-gutter-comparison.webp"],
  },
};

export default function Layout({ children }) {
  return (
    <>
      <link rel="preload" as="image" href="/images/7inch-gutter-comparison.webp" fetchPriority="high" />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      {children}
    </>
  );
}
