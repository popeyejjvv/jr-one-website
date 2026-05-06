const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Gutter Cleaning & Maintenance",
  serviceType: "Gutter Cleaning",
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
    "Professional gutter cleaning and maintenance in Tampa Bay, debris removal, downspout flushing, pitch and hanger inspection, haul-away. Typical single-family home $150-$400. Photo documentation of any issues found.",
  offers: { "@type": "Offer", priceCurrency: "USD", availability: "https://schema.org/InStock" },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://jronegutters.com" },
    { "@type": "ListItem", position: 2, name: "Gutter Cleaning", item: "https://jronegutters.com/gutter-cleaning" },
  ],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "@id": "https://jronegutters.com/gutter-cleaning#faq",
  mainEntityOfPage: "https://jronegutters.com/gutter-cleaning",
  mainEntity: [
    {
      "@type": "Question",
      name: "How much does gutter cleaning cost in Tampa?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Typical single-family homes run $150-$400 depending on roof height, linear footage of gutter, debris level, and access. Two-story homes with complex rooflines run higher. Smaller one-story homes with straightforward access run lower. Exact pricing after a quick look, no generic rate quoted sight-unseen.",
      },
    },
    {
      "@type": "Question",
      name: "How often should I clean my gutters in Tampa?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Heavy tree coverage (live oaks, pines, magnolias nearby): 3-4 cleanings per year. Moderate cover: twice a year, pre-summer (May) and post-hurricane (November). Homes with gutter guards: every 2-3 years. Open-lot homes with no trees: once a year minimum. Add a cleaning after any named storm regardless of the cycle.",
      },
    },
    {
      "@type": "Question",
      name: "Do you haul away the debris?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. All debris is bagged and removed from your property. You don't deal with piles of leaves or buckets of muck after we leave. Clean job, clean exit.",
      },
    },
    {
      "@type": "Question",
      name: "What's the difference between your cleaning and a handyman?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Most general handymen scoop what they can see and leave. We clear every run end-to-end, flush every downspout, inspect hangers and sealant, photograph issues, and haul the waste. Plus we're an aluminum specialty contractor, we can quote any repair we find on the spot instead of telling you to call someone else.",
      },
    },
    {
      "@type": "Question",
      name: "Can you clean gutters on a two- or three-story home?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. JR One is equipped for multi-story residential and commercial. Our crews have the ladders, equipment, and training for high-access work homeowners shouldn't try from a ladder.",
      },
    },
    {
      "@type": "Question",
      name: "Do you service rental properties and absentee owners?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. See our rental property maintenance page for recurring service plans built around absentee owners, scheduled visits, tenant coordination, and photo reports after every cleaning.",
      },
    },
    {
      "@type": "Question",
      name: "Do you offer emergency or post-storm cleaning?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. After named storms we prioritize existing customers and contracted properties, with same-week or next-day availability depending on demand. Call us and we'll get you in as fast as the schedule allows.",
      },
    },
  ],
};

export const metadata = {
  title: "Gutter Cleaning Tampa FL | $150-$400 Single-Family | JR One",
  description:
    "Professional gutter cleaning in Tampa Bay, full debris removal, downspout flushing, hanger inspection, haul-away. Typical single-family $150-$400. Same-day estimates at (844) 444-3114.",
  keywords: "gutter cleaning Tampa, gutter cleaning cost Tampa FL, downspout flushing, gutter maintenance Tampa Bay, professional gutter cleaner Florida, gutter cleaning Clearwater St Petersburg",
  alternates: { canonical: "https://jronegutters.com/gutter-cleaning" },
  openGraph: {
    title: "Gutter Cleaning Tampa FL, JR One Aluminum",
    description: "Full debris removal, downspout flushing, photo documentation. Typical single-family $150-$400.",
    url: "https://jronegutters.com/gutter-cleaning",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Gutter Cleaning Tampa FL, JR One Aluminum",
    description: "Full service cleaning, flushing, and inspection with photo documentation.",
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
