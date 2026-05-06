const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "7-Inch Seamless Aluminum Gutters",
  serviceType: "Oversized Gutter Installation",
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
    "Oversized 7-inch seamless aluminum gutters, commercial-grade water capacity for South Tampa luxury homes, large roof areas, and steep-pitched homes that overwhelm standard 6-inch systems. Premium upcharge vs. 6-inch; lifetime protection.",
  offers: { "@type": "Offer", priceCurrency: "USD", availability: "https://schema.org/InStock" },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://jronegutters.com" },
    { "@type": "ListItem", position: 2, name: "7-Inch Gutters", item: "https://jronegutters.com/7-inch-gutters" },
  ],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "@id": "https://jronegutters.com/7-inch-gutters#faq",
  mainEntityOfPage: "https://jronegutters.com/7-inch-gutters",
  mainEntity: [
    {
      "@type": "Question",
      name: "How much more do 7-inch gutters cost than 6-inch?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The per-linear-foot premium is modest, typically 20-35% more than 6-inch, depending on gauge, color, and downspout spec. On a typical home the total project upcharge is a few hundred dollars, not thousands. Exact numbers in the estimate.",
      },
    },
    {
      "@type": "Question",
      name: "Will 7-inch gutters look oversized on my house?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "On most homes, no. The profile is slightly taller than a 6-inch gutter but the difference is subtle from the ground, most homeowners can't tell at a glance. On very small cottage-scale homes the proportion can look heavy; we'll flag that during the walkthrough if it applies to your home.",
      },
    },
    {
      "@type": "Question",
      name: "Do 7-inch gutters need special downspouts?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "They pair best with 4x5 rectangular downspouts or oversized round downspouts, not the standard 3x4. Using a 3x4 downspout on a 7-inch gutter defeats the point of the upgrade. The full system matters, not just the channel size.",
      },
    },
    {
      "@type": "Question",
      name: "Can you upgrade my existing 6-inch gutters to 7-inch?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. The existing 6-inch gutters are removed and new 7-inch seamless runs are fabricated on-site. The fascia is inspected during removal, if anything needs repair we'll flag it before install. Typical upgrade is completed in a single day.",
      },
    },
    {
      "@type": "Question",
      name: "When is 7-inch the wrong call?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "For smaller single-story homes with moderate roof area, moderate pitch, and no current overflow, 6-inch is already the right spec, upgrading to 7-inch is an unnecessary cost. We'll tell you honestly during the walkthrough if 6-inch is what you actually need.",
      },
    },
    {
      "@type": "Question",
      name: "Does 7-inch handle hurricane-level rain?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Better than 6-inch, but no gutter fully handles a hurricane's worst rain bursts. 7-inch gives you significant headroom over 6-inch, meaning overflow happens less often and water damage risk is materially lower. No gutter is a substitute for proper drainage, guards on tree-covered homes, or post-storm cleaning.",
      },
    },
    {
      "@type": "Question",
      name: "What colors are available in 7-inch?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Same 40+ color options as 6-inch, we run the same aluminum coil inventory. White, almond, clay, bronze, dark bronze, black, and custom matches for trim or fascia.",
      },
    },
  ],
};

export const metadata = {
  title: "7-Inch Oversized Gutters Tampa FL | South Tampa Luxury | JR One",
  description:
    "Oversized 7\" seamless aluminum gutters for Tampa Bay luxury homes, large roof areas, and steep-pitch properties. Commercial-grade water capacity. Premium upcharge vs 6\", lifetime protection. (844) 444-3114.",
  keywords: "7 inch gutters Tampa, oversized gutters Florida, South Tampa luxury gutters, commercial grade residential gutters, 7 inch seamless aluminum Tampa Bay, upgrade from 6 inch gutter",
  alternates: { canonical: "https://jronegutters.com/7-inch-gutters" },
  openGraph: {
    title: "7-Inch Gutters Tampa FL, JR One Aluminum",
    description: "Oversized 7-inch seamless gutters for Tampa luxury homes and high-volume roofs. Commercial-grade capacity.",
    url: "https://jronegutters.com/7-inch-gutters",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "7-Inch Gutters Tampa FL, JR One Aluminum",
    description: "Commercial-grade water capacity for South Tampa luxury homes and large-roof properties.",
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
