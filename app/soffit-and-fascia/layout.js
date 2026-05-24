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
    { "@type": "ListItem", position: 1, name: "Home", item: "https://jronegutters.com" },
    { "@type": "ListItem", position: 2, name: "Services", item: "https://jronegutters.com" },
    { "@type": "ListItem", position: 3, name: "Soffit and Fascia Tampa", item: "https://jronegutters.com/soffit-and-fascia" },
  ],
};

const imageObjectSchema = {
  "@context": "https://schema.org",
  "@type": "ImageObject",
  contentUrl: "https://jronegutters.com/images/soffit-fascia-detail.webp",
  url: "https://jronegutters.com/images/soffit-fascia-detail.webp",
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

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "@id": "https://jronegutters.com/soffit-and-fascia#faq",
  mainEntityOfPage: "https://jronegutters.com/soffit-and-fascia",
  mainEntity: [
    {
      "@type": "Question",
      name: "How much does soffit and fascia replacement cost in Tampa?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Soffit and fascia replacement in Tampa Bay typically runs $1,800 to $6,500 depending on linear footage, single vs multi-tier fascia profile, aluminum vs vinyl material, and whether wood substrate needs replacement underneath. Estimates are detailed line-item so you see exactly where the money goes.",
      },
    },
    {
      "@type": "Question",
      name: "Aluminum or vinyl soffit, which is better for Tampa homes?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Aluminum is the primary recommendation for Florida homes. It will not rot, warp, crack, or attract termites. It handles UV exposure, salt air, and hurricane-force rain without deteriorating. Vinyl is a budget-friendly alternative that still outperforms wood in every way but is less impact-resistant in storms.",
      },
    },
    {
      "@type": "Question",
      name: "Do I need to replace fascia and soffit at the same time?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Usually yes. Fascia and soffit work as a system, the fascia caps the roof edge and the soffit forms the underside of the overhang. If one has failed there is almost always damage to the other behind it. Replacing both together is the right answer 90 percent of the time in Tampa Bay.",
      },
    },
    {
      "@type": "Question",
      name: "Will you wrap aluminum over my rotten wood fascia?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. Wrapping aluminum over rotten wood hides the problem and forces another tear-out within 5 years. We replace the rotted substrate first, then wrap. It is the difference between fixing the problem and covering it up.",
      },
    },
    {
      "@type": "Question",
      name: "How long does soffit and fascia replacement take?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Most Tampa Bay single-family homes are completed in 1 to 3 days. Larger homes with complex rooflines or significant wood-rot replacement underneath take longer. We give you a specific timeline before work starts.",
      },
    },
    {
      "@type": "Question",
      name: "Do you replace soffit and fascia after storm damage?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. After named storms our crews prioritize storm-damage repairs. We board exposed areas first to prevent further damage and schedule permanent soffit and fascia replacement as fast as the schedule allows.",
      },
    },
    {
      "@type": "Question",
      name: "Do you match my existing soffit and fascia colors?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. We carry the full aluminum coil color spectrum and most popular vinyl soffit profiles. We match your existing trim, gutters, or roof so the finished look is seamless, not obviously a replacement.",
      },
    },
    {
      "@type": "Question",
      name: "Are you fully insured for soffit and fascia work in Tampa Bay?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. JR One Aluminum LLC carries full liability and workers' compensation insurance. Certificate of insurance provided on request before any work begins.",
      },
    },
  ],
};

export const metadata = {
  title: "Soffit and Fascia Tampa | Aluminum + Vinyl Replacement | JR One",
  description:
    "Soffit and fascia Tampa Bay specialists. Aluminum and vinyl soffit, custom-bent fascia wraps, rotted wood replaced underneath. Free estimate (844) 444-3114. 30+ years in the trade.",
  alternates: {
    canonical: "https://jronegutters.com/soffit-and-fascia",
    languages: {
      "en-US": "https://jronegutters.com/soffit-and-fascia",
      "es-US": "https://jronegutters.com/es/sofito-fascia-tampa",
      "x-default": "https://jronegutters.com/soffit-and-fascia",
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
    url: "https://jronegutters.com/soffit-and-fascia",
    type: "website",
    images: [
      {
        url: "https://jronegutters.com/images/soffit-fascia-detail.webp",
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
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      {children}
    </>
  );
}
