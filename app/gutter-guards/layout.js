const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Gutter Guard Installation Tampa",
  serviceType: "Gutter Guard Installation",
  image: "https://jronegutters.com/images/gutter-guard-installed.webp",
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
  ],
  description:
    "Micro mesh, leaf guard, and copper gutter guards professionally installed in Tampa Bay. Local specialist pricing, typically $1,000-$1,500 less than national brands like LeafFilter and Gutter Helmet.",
  offers: {
    "@type": "Offer",
    priceCurrency: "USD",
    availability: "https://schema.org/InStock",
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://www.jronegutters.com" },
    { "@type": "ListItem", position: 2, name: "Gutter Guards", item: "https://www.jronegutters.com/gutter-guards" },
  ],
};

export const metadata = {
  title: "Gutter Guards Tampa FL",
  description:
    "Professional gutter guard installation in Tampa Bay. Micro mesh for pine needles and fine debris. 30+ years specialist experience. Local pricing, free estimate at (844) 444-3114.",
  alternates: {
    canonical: "https://www.jronegutters.com/gutter-guards",
    languages: {
      "en-US": "https://www.jronegutters.com/gutter-guards",
      "es-US": "https://www.jronegutters.com/es/protectores-canaletas-tampa",
      "x-default": "https://www.jronegutters.com/gutter-guards",
    },
  },
  openGraph: {
    title: "Gutter Guards Tampa FL, JR One Aluminum",
    description: "Micro mesh and standard gutter guards professionally installed in Tampa Bay. Free estimates.",
    url: "https://www.jronegutters.com/gutter-guards",
    type: "website",
    images: [{ url: "https://www.jronegutters.com/images/gutter-guard-installed.webp", width: 1920, height: 1080, alt: "Micro-mesh gutter guard installed on a JR One Aluminum seamless gutter in Tampa Bay" }],
  },
  twitter: { card: "summary_large_image", images: ["https://jronegutters.com/images/gutter-guard-installed.webp"] },
};

export default function Layout({ children }) {
  return (
    <>
      <link rel="preload" as="image" href="/images/gutter-guard-installed.webp" fetchPriority="high" />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      {children}
    </>
  );
}
