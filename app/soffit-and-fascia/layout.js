const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Soffit and Fascia Tampa",
  serviceType: "Soffit and Fascia Installation",
  image: "https://www.jronegutters.com/images/soffit-fascia-detail.webp",
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
    "Soffit and fascia Tampa Bay specialists. Aluminum and vinyl soffit installation, vented and non-vented panels. Custom-bent aluminum fascia wrapping in single, 2-tier, and 3-tier profiles. Wood fascia replacement when needed. 30+ years experience.",
  offers: {
    "@type": "Offer",
    priceCurrency: "USD",
    price: "0",
    description: "Free on-site soffit and fascia inspection and estimate in Tampa Bay",
    availability: "https://schema.org/InStock",
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://www.jronegutters.com" },
    { "@type": "ListItem", position: 2, name: "Services", item: "https://www.jronegutters.com" },
    { "@type": "ListItem", position: 3, name: "Soffit and Fascia Tampa", item: "https://www.jronegutters.com/soffit-and-fascia" },
  ],
};

const imageObjectSchema = {
  "@context": "https://schema.org",
  "@type": "ImageObject",
  contentUrl: "https://www.jronegutters.com/images/soffit-fascia-detail.webp",
  url: "https://www.jronegutters.com/images/soffit-fascia-detail.webp",
  caption: "Freshly installed aluminum soffit and fascia on a Tampa Bay home",
  description: "Close-up of white aluminum soffit panels and fascia wrap with clean mitered corner installation by JR One Aluminum in Tampa, Florida.",
  creditText: "JR One Aluminum LLC",
  creator: { "@type": "Organization", "@id": "https://jronegutters.com/#organization" },
};

export const metadata = {
  title: { absolute: "Soffit and Fascia Replacement in Tampa FL | In-House Crews" },
  description:
    "Rotted wood out, aluminum or vinyl soffit in, with custom bent fascia wraps. Tampa Bay soffit and fascia specialists. Free estimate: (844) 444-3114.",
  alternates: {
    canonical: "https://www.jronegutters.com/soffit-and-fascia",
    languages: {
      "en-US": "https://www.jronegutters.com/soffit-and-fascia",
      "es-US": "https://www.jronegutters.com/es/sofito-fascia-tampa",
      "x-default": "https://www.jronegutters.com/soffit-and-fascia",
    },
  },
  keywords: [
    "soffit and fascia tampa",
    "soffit and fascia replacement tampa",
    "soffit and fascia repair tampa",
    "soffit repair tampa",
    "fascia replacement tampa",
    "aluminum soffit tampa",
    "vinyl soffit tampa",
    "soffit and fascia clearwater",
    "soffit and fascia st petersburg",
  ],
  openGraph: {
    title: "Soffit and Fascia Tampa | JR One Aluminum",
    description: "Soffit and fascia Tampa Bay specialists. Rotted wood out, aluminum in. Over 30 years in the trade. (844) 444-3114.",
    url: "https://www.jronegutters.com/soffit-and-fascia",
    type: "website",
    images: [
      {
        url: "https://www.jronegutters.com/images/soffit-fascia-detail.webp",
        width: 1920,
        height: 1080,
        alt: "Freshly installed aluminum soffit and fascia on a Tampa Bay home by JR One Aluminum",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Soffit and Fascia Tampa | JR One Aluminum",
    description: "Tampa Bay soffit and fascia specialists. Aluminum + vinyl. Over 30 years.",
    images: ["https://www.jronegutters.com/images/soffit-fascia-detail.webp"],
  },
};

export default function Layout({ children }) {
  return (
    <>
      <link rel="preload" as="image" href="/images/soffit-fascia-detail.webp" fetchPriority="high" />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(imageObjectSchema) }} />
      {children}
    </>
  );
}
