const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Gutter Guard Installation Tampa",
  serviceType: "Gutter Guard Installation",
  image: "https://www.jronegutters.com/images/gutter-guard-installed.webp",
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
    "Standard aluminum and micromesh gutter guards professionally installed in Tampa Bay by in-house crews. Guards reduce how often gutters need cleaning.",
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
  title: { absolute: "Gutter Guards Tampa FL | Micro Mesh, In-House Crews" },
  description:
    "Micro mesh gutter guards installed across Tampa Bay by our own crews. Guards cut how often gutters need cleaning. Free estimate: (844) 444-3114.",
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
    description: "Standard aluminum and micromesh gutter guards professionally installed in Tampa Bay. Free estimates.",
    url: "https://www.jronegutters.com/gutter-guards",
    type: "website",
    images: [{ url: "https://www.jronegutters.com/images/gutter-guard-installed.webp", width: 1920, height: 1080, alt: "Micro-mesh gutter guard installed on a JR One Aluminum seamless gutter in Tampa Bay" }],
  },
  twitter: { card: "summary_large_image", images: ["https://www.jronegutters.com/images/gutter-guard-installed.webp"] },
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
