const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Commercial Gutter & Aluminum Installation",
  serviceType: "Commercial Gutter Installation",
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
    "Commercial gutter, soffit, fascia, and drainage systems for apartment complexes, multi-family buildings, retail centers, office parks, and warehouses across Tampa Bay. 7-inch box gutters, D-style commercial profiles, and large-capacity drainage.",
  offers: { "@type": "Offer", priceCurrency: "USD", availability: "https://schema.org/InStock" },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://jronegutters.com" },
    { "@type": "ListItem", position: 2, name: "Commercial Gutters", item: "https://jronegutters.com/commercial-gutters" },
  ],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "@id": "https://jronegutters.com/commercial-gutters#faq",
  mainEntityOfPage: "https://jronegutters.com/commercial-gutters",
  mainEntity: [
    {
      "@type": "Question",
      name: "What size gutter do I need for a commercial building?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "It depends on roof area, pitch, and rainfall collection. Most commercial buildings in Tampa Bay spec into 7-inch box gutters or 7-inch D-style commercial profiles. We calculate the correct size during the walkthrough, the wrong call here is expensive, so we don't guess.",
      },
    },
    {
      "@type": "Question",
      name: "Do you work directly with general contractors?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. A meaningful share of our commercial volume is subcontracted work for general contractors and roofing companies on new construction and renovation projects. We sequence with other trades, hit schedule, and invoice on GC-friendly terms.",
      },
    },
    {
      "@type": "Question",
      name: "Can you provide certificates of insurance?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. JR One Aluminum carries full general liability and workers' compensation coverage. We provide certificates of insurance directly to the building owner, property management company, or general contractor on request, with additional-insured endorsements where required.",
      },
    },
    {
      "@type": "Question",
      name: "How is commercial pricing structured?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Commercial pricing is custom per project, based on gutter linear footage, profile, gauge, downspout count, drainage integration, and scope. GCs and property portfolios with recurring volume can negotiate pricing for repeat work.",
      },
    },
    {
      "@type": "Question",
      name: "Do you handle drainage too, or just the gutter itself?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Full scope. Commercial roofs demand real drainage, we install Schedule 40 PVC underground drainage, corrugated pipe, catch basins, and trenching alongside the gutter system. One contractor for the complete water-management package.",
      },
    },
    {
      "@type": "Question",
      name: "What about ongoing maintenance after install?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "We offer commercial maintenance agreements for apartment complexes, property management portfolios, and building owners who want scheduled gutter cleaning and inspection on a commercial cadence. Separate from installation.",
      },
    },
    {
      "@type": "Question",
      name: "How long does commercial installation take?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Varies widely, a single retail pad can be a day, a 200-unit apartment complex is weeks. We commit to a specific schedule before work begins and communicate any changes in advance.",
      },
    },
  ],
};

export const metadata = {
  title: "Commercial Gutters Tampa FL | Apartment, Multi-Family, Retail",
  description:
    "Commercial gutter, soffit, fascia, and drainage for apartment complexes, multi-family, retail centers, and office buildings in Tampa Bay. 7-inch box & D-style systems. GC and building-owner trusted. (844) 444-3114.",
  keywords: "commercial gutters Tampa, apartment complex gutter installation, multi-family gutters Florida, retail center gutter contractor, commercial aluminum Tampa Bay, 7 inch box gutter commercial",
  alternates: {
    canonical: "https://jronegutters.com/commercial-gutters",
    languages: {
      "en-US": "https://jronegutters.com/commercial-gutters",
      "es-US": "https://jronegutters.com/es/canaletas-comerciales-tampa",
      "x-default": "https://jronegutters.com/commercial-gutters",
    },
  },
  openGraph: {
    title: "Commercial Gutters Tampa FL, JR One Aluminum",
    description: "Commercial aluminum gutter, soffit, and drainage for apartment complexes, retail, and multi-family in Tampa Bay.",
    url: "https://jronegutters.com/commercial-gutters",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Commercial Gutters Tampa FL, JR One Aluminum",
    description: "7-inch box, D-style, and large-capacity commercial gutter systems. Tampa Bay-wide.",
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
