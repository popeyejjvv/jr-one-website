const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Soffit and Fascia Tampa",
  serviceType: "Soffit and Fascia Installation",
  image: "https://jronegutters.com/images/soffit-fascia-detail.webp",
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
  contentUrl: "https://jronegutters.com/images/soffit-fascia-detail.webp",
  url: "https://www.jronegutters.com/images/soffit-fascia-detail.webp",
  caption: "Freshly installed aluminum soffit and fascia on a Tampa Bay home",
  description: "Close-up of white aluminum soffit panels and fascia wrap with clean mitered corner installation by JR One Aluminum in Tampa, Florida.",
  creditText: "JR One Aluminum LLC",
  creator: { "@type": "Organization", "@id": "https://jronegutters.com/#organization" },
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How JR One installs Soffit and Fascia in Tampa",
  description: "The 4-step process JR One Aluminum uses to install soffit and fascia on Tampa Bay homes.",
  totalTime: "P1D",
  estimatedCost: { "@type": "MonetaryAmount", currency: "USD", value: "1800" },
  supply: [
    { "@type": "HowToSupply", name: "Aluminum or vinyl soffit panels" },
    { "@type": "HowToSupply", name: "Aluminum fascia coil (custom-bent on-site)" },
    { "@type": "HowToSupply", name: "Pressure-treated wood fascia substrate replacement" },
  ],
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "Inspect roof edge and wood substrate",
      text: "Walk the perimeter, document existing soffit and fascia condition with photos, and probe for hidden wood rot behind the existing fascia board. Identify pest entry points and ventilation issues.",
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "Replace rotted wood substrate",
      text: "Remove rotted fascia boards down to solid framing. Install pressure-treated wood substrate. Never wrap aluminum over rotten wood — that hides the problem and forces a redo within 5 years.",
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Install aluminum or vinyl soffit panels",
      text: "Fit vented or non-vented panels with proper attic ventilation. Cut to length with shears. Lock panels into J-channel along the eave. Continuous airflow restored to keep shingle temperature down.",
    },
    {
      "@type": "HowToStep",
      position: 4,
      name: "Wrap fascia with custom-bent aluminum",
      text: "Bend aluminum coil on-site with a brake to match exact fascia depth. Cap the wood substrate in single, 2-tier, or 3-tier profile depending on home style. Caulk seams and color-match to gutters and trim.",
    },
  ],
};

export const metadata = {
  title: "Soffit and Fascia Tampa FL",
  description:
    "Soffit and fascia Tampa Bay specialists. Aluminum and vinyl soffit, custom-bent fascia wraps, rotted wood replaced underneath. Free estimate (844) 444-3114. 30+ years in the trade.",
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
    images: ["https://jronegutters.com/images/soffit-fascia-detail.webp"],
  },
};

export default function Layout({ children }) {
  return (
    <>
      <link rel="preload" as="image" href="/images/soffit-fascia-detail.webp" fetchPriority="high" />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(imageObjectSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      {children}
    </>
  );
}
