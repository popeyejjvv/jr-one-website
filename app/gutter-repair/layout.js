const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Gutter Repair Tampa",
  serviceType: "Gutter Repair",
  image: "https://jronegutters.com/images/seamless-gutter-install.webp",
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
    { "@type": "ListItem", position: 1, name: "Home", item: "https://jronegutters.com" },
    { "@type": "ListItem", position: 2, name: "Services", item: "https://jronegutters.com" },
    { "@type": "ListItem", position: 3, name: "Gutter Repair Tampa", item: "https://jronegutters.com/gutter-repair" },
  ],
};

const imageObjectSchema = {
  "@context": "https://schema.org",
  "@type": "ImageObject",
  contentUrl: "https://jronegutters.com/images/seamless-gutter-install.webp",
  url: "https://jronegutters.com/images/seamless-gutter-install.webp",
  caption: "JR One Aluminum crew installing seamless aluminum gutter on a Tampa Bay home",
  description: "Professional gutter installer mounting a 6-inch white seamless aluminum gutter on a Florida home, gutter machine visible in the driveway.",
  creditText: "JR One Aluminum LLC",
  creator: { "@type": "Organization", "@id": "https://jronegutters.com/#organization" },
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How JR One Repairs Gutters in Tampa",
  description: "The diagnostic + repair process JR One Aluminum uses for sagging, leaking, or overflowing gutters in Tampa Bay.",
  totalTime: "PT4H",
  estimatedCost: { "@type": "MonetaryAmount", currency: "USD", value: "350" },
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "Diagnose the failure mode",
      text: "Walk the gutter line, check pitch with a level, inspect every hanger, identify seam leaks with a moisture meter, and confirm downspout flow. A sagging gutter and a leaking gutter look the same from the ground but require different fixes.",
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "Correct the pitch",
      text: "Most gutter overflow in Tampa is an incorrect-pitch problem, not a clog. We re-pitch each run to a quarter inch of fall per 10 feet of gutter so water actually moves toward the downspouts.",
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Replace failed hangers and seal seams",
      text: "Pulled spike-and-ferrule hangers get replaced with hidden hangers every 24 inches. Leaking seams at corners and end caps get cleaned and re-sealed with professional-grade gutter sealant rated for Florida UV.",
    },
    {
      "@type": "HowToStep",
      position: 4,
      name: "Clear and flush downspouts",
      text: "Remove all debris from the gutter run, snake out clogged downspouts, and flush the system with water until every downspout has clean flow. Repair any damaged downspout elbows or extensions.",
    },
    {
      "@type": "HowToStep",
      position: 5,
      name: "Inspect underlying fascia",
      text: "Gutter failure often masks fascia rot behind the gutter. We probe the fascia board and recommend replacement before reinstalling so the repair lasts.",
    },
  ],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "@id": "https://jronegutters.com/gutter-repair#faq",
  mainEntityOfPage: "https://jronegutters.com/gutter-repair",
  mainEntity: [
    {
      "@type": "Question",
      name: "How much does gutter repair cost in Tampa?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Typical gutter repair calls in Tampa Bay run $150 to $750 depending on what is wrong. A simple resealing job is under $250. A re-pitching with hanger replacement and downspout work runs $400 to $750. Major fascia rot underneath the gutter pushes the job into the $1,500+ range.",
      },
    },
    {
      "@type": "Question",
      name: "My gutters overflow during heavy rain, do I need new gutters or repair?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Usually repair. Most overflow in Tampa is incorrect pitch or undersized 5-inch gutters that cannot handle Florida rain volume. We re-pitch the existing 6-inch system in most cases. If you still have 5-inch gutters, we recommend a full upgrade to 6-inch or 7-inch since 5-inch will overflow no matter what we do to it.",
      },
    },
    {
      "@type": "Question",
      name: "Can you repair gutters that are pulling away from the fascia?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, but we have to check why first. Pulled hangers usually mean the fascia board behind the gutter has rotted out from years of overflow. We probe the fascia, replace any rotted wood, then reinstall with hidden hangers every 24 inches.",
      },
    },
    {
      "@type": "Question",
      name: "How fast can you schedule a gutter repair in Tampa Bay?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Most non-emergency gutter repairs in Tampa get scheduled within the same week. After named storms we prioritize storm-damage calls and existing customers but still hit same-week or next-day availability depending on demand.",
      },
    },
    {
      "@type": "Question",
      name: "Do you repair gutters on two-story homes?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. JR One is equipped for multi-story residential and commercial gutter work. Our crews carry the ladders, equipment, and training for high-access work homeowners should not attempt themselves.",
      },
    },
    {
      "@type": "Question",
      name: "Will you fix the underlying fascia at the same time?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. We are a soffit-and-fascia specialty contractor, not a gutter-only company. If the fascia behind the gutter has rotted, we replace it as part of the same job so you do not have to bring in a second contractor.",
      },
    },
    {
      "@type": "Question",
      name: "Do you warranty gutter repairs in Tampa?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Our craftsmanship warranty covers the repair work itself. Original-factory gutter material is covered under the manufacturer warranty separately. Both warranty documents are provided in writing.",
      },
    },
  ],
};

export const metadata = {
  title: "Gutter Repair Tampa | Sagging, Leaks, Overflow Fixed Same Week | JR One",
  description:
    "Gutter repair Tampa Bay, sagging gutters, leaking seams, clogged downspouts, pitch correction, fascia repair. Same-week scheduling. Free assessment (844) 444-3114.",
  alternates: {
    canonical: "https://jronegutters.com/gutter-repair",
    languages: {
      "en-US": "https://jronegutters.com/gutter-repair",
      "es-US": "https://jronegutters.com/es/reparacion-canaletas-tampa",
      "x-default": "https://jronegutters.com/gutter-repair",
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
    url: "https://jronegutters.com/gutter-repair",
    type: "website",
    images: [
      {
        url: "https://jronegutters.com/images/seamless-gutter-install.webp",
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
    images: ["https://jronegutters.com/images/seamless-gutter-install.webp"],
  },
};

export default function Layout({ children }) {
  return (
    <>
      <link rel="preload" as="image" href="/images/seamless-gutter-install.webp" fetchPriority="high" />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(imageObjectSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      {children}
    </>
  );
}
