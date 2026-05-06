const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "HOA Gutter & Aluminum Maintenance Contracts",
  serviceType: "HOA Maintenance Contract",
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
    { "@type": "City", name: "Sarasota" },
    { "@type": "City", name: "Bradenton" },
  ],
  description:
    "HOA maintenance contracts for gutter cleaning, soffit, fascia, and aluminum upkeep across Tampa Bay HOA-managed neighborhoods. Community-wide pricing, bilingual crews, single-point accountability for property managers.",
  offers: { "@type": "Offer", priceCurrency: "USD", availability: "https://schema.org/InStock" },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://jronegutters.com" },
    { "@type": "ListItem", position: 2, name: "HOA Contracts", item: "https://jronegutters.com/hoa-contracts" },
  ],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "@id": "https://jronegutters.com/hoa-contracts#faq",
  mainEntityOfPage: "https://jronegutters.com/hoa-contracts",
  mainEntity: [
    {
      "@type": "Question",
      name: "What size HOA do you take on?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "We work with communities from 12-unit townhome groups up to 400+ unit master-planned associations. Below 12 units we typically recommend individual service calls rather than a contract. Above 400 we split the community into service zones for efficient routing.",
      },
    },
    {
      "@type": "Question",
      name: "How is HOA pricing structured?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Pricing is custom per community based on unit count, gutter linear footage, roof accessibility, and scope (cleaning only vs. full maintenance). Most HOAs land on a fixed monthly or quarterly retainer that covers the scheduled scope, with a transparent per-unit rate for out-of-scope repairs.",
      },
    },
    {
      "@type": "Question",
      name: "Do you require a multi-year contract?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. Most of our HOA contracts are annual with a renewal review. We'd rather earn the renewal every year than lock boards into a long-term deal they can't get out of.",
      },
    },
    {
      "@type": "Question",
      name: "Can you coordinate with our existing roofing vendor?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. We coordinate directly with roofing contractors, painters, and landscapers when scopes overlap, particularly on soffit/fascia work that touches the roofline. We've worked alongside most of Tampa's larger exterior trades.",
      },
    },
    {
      "@type": "Question",
      name: "What about post-storm emergency response?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Contracted HOAs get priority ahead of our retail queue. Within 72 hours of a named storm we walk the community, document damage, and provide the property manager with a prioritized repair list ready for board review or insurance claim support.",
      },
    },
    {
      "@type": "Question",
      name: "Are your crews insured for HOA work?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. JR One Aluminum carries full general liability and workers' compensation coverage. We provide certificates of insurance directly to the property manager or management company on request, with the HOA named as additional insured where required.",
      },
    },
    {
      "@type": "Question",
      name: "Can you provide reporting the board will understand?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Every service cycle ends with a unit-by-unit report: what was done, what was flagged, photos of any issues found, and recommended follow-ups. It's written for board-meeting consumption, not just billing.",
      },
    },
  ],
};

export const metadata = {
  title: "HOA Gutter & Aluminum Maintenance Contracts Tampa FL | JR One",
  description:
    "HOA maintenance contracts for gutter, soffit, and fascia upkeep across Tampa Bay managed communities. Bilingual crews, community-wide pricing, single-point property-manager accountability. (844) 444-3114.",
  keywords: "HOA gutter maintenance Tampa, HOA contract gutter cleaning, property management aluminum services, HOA soffit fascia Tampa, community gutter contract Florida",
  alternates: { canonical: "https://jronegutters.com/hoa-contracts" },
  openGraph: {
    title: "HOA Maintenance Contracts Tampa FL, JR One Aluminum",
    description: "Gutter, soffit, and fascia maintenance contracts for Tampa Bay HOAs. Community-wide pricing. Free walkthrough.",
    url: "https://jronegutters.com/hoa-contracts",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "HOA Maintenance Contracts Tampa FL, JR One Aluminum",
    description: "Gutter, soffit, and fascia contracts for Tampa Bay HOAs. Bilingual crews, single-point accountability.",
  },
};

export default function Layout({ children }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      {children}
    </>
  );
}
