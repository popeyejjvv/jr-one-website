const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Gutter Cleaning Tampa",
  serviceType: "Gutter Cleaning",
  image: "https://jronegutters.com/images/gutter-cleaning-before.webp",
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
    "Professional gutter cleaning Tampa Bay, debris removal, downspout flushing, pitch and hanger inspection, haul-away. Typical single-family home $150-$400. Photo documentation of any issues found.",
  offers: {
    "@type": "Offer",
    priceCurrency: "USD",
    price: "150",
    priceSpecification: { "@type": "PriceSpecification", minPrice: "150", maxPrice: "400", priceCurrency: "USD" },
    description: "Professional gutter cleaning in Tampa Bay, typical single-family home price range",
    availability: "https://schema.org/InStock",
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://jronegutters.com" },
    { "@type": "ListItem", position: 2, name: "Services", item: "https://jronegutters.com" },
    { "@type": "ListItem", position: 3, name: "Gutter Cleaning Tampa", item: "https://jronegutters.com/gutter-cleaning" },
  ],
};

const imageObjectSchema = {
  "@context": "https://schema.org",
  "@type": "ImageObject",
  contentUrl: "https://jronegutters.com/images/gutter-cleaning-before.webp",
  url: "https://jronegutters.com/images/gutter-cleaning-before.webp",
  caption: "Clogged residential gutter overflowing during a Tampa Bay rainstorm before professional cleaning",
  description: "Top-down view of a residential rain gutter packed with wet leaves and pine debris causing overflow on a Tampa Bay home — the condition JR One Aluminum cleans on every routine service call.",
  creditText: "JR One Aluminum LLC",
  creator: { "@type": "Organization", "@id": "https://jronegutters.com/#organization" },
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How JR One Cleans Gutters in Tampa",
  description: "The 5-step process JR One Aluminum uses for professional gutter cleaning on Tampa Bay homes.",
  totalTime: "PT2H",
  estimatedCost: { "@type": "MonetaryAmount", currency: "USD", value: "275" },
  supply: [
    { "@type": "HowToSupply", name: "Drop cloth and debris collection tarps" },
    { "@type": "HowToSupply", name: "Water source for downspout flush" },
  ],
  tool: [
    { "@type": "HowToTool", name: "Extension ladder (rated for 2-story residential)" },
    { "@type": "HowToTool", name: "Gutter scoop and debris bags" },
    { "@type": "HowToTool", name: "Pressurized water flush wand" },
  ],
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "Protect the property",
      text: "Tarp landscape beds underneath gutter runs. Move outdoor furniture and decor away from drop zones. Pets brought inside if requested. Protect what is below before touching what is above.",
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "Clear every run end-to-end",
      text: "Scoop wet debris by hand from each gutter run, working from one corner to the next. No skipping middle sections — debris compacts most in the dead-flow middle of long runs, which is the part homeowners and handymen miss.",
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Flush every downspout",
      text: "Run water from the top of each gutter run and watch the downspout outlet at ground level. Any backup, snake the downspout immediately. Common Tampa clog points are inside elbows and at the underground tie-in.",
    },
    {
      "@type": "HowToStep",
      position: 4,
      name: "Inspect hangers and seams",
      text: "While on the ladder, check every hanger for pull-out, check end caps and inside corners for sealant failure, and document any issues with photos. Catch a sagging gutter in cleaning season before it pulls off in a storm.",
    },
    {
      "@type": "HowToStep",
      position: 5,
      name: "Bag and haul away",
      text: "All debris bagged and removed from the property. Cleanup includes pressure-rinse of downspout splash blocks and walkways under work areas. Clean exit, no piles left for the homeowner.",
    },
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
        text: "Typical single-family homes in Tampa Bay run $150 to $400 depending on roof height, linear footage of gutter, debris level, and access. Two-story homes with complex rooflines run higher. Smaller one-story homes with straightforward access run lower. Exact pricing after a quick look — no generic rate quoted sight-unseen.",
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
        text: "Yes. All debris is bagged and removed from your property. You do not deal with piles of leaves or buckets of muck after we leave. Clean job, clean exit.",
      },
    },
    {
      "@type": "Question",
      name: "What is the difference between your cleaning and a handyman?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Most general handymen scoop what they can see and leave. We clear every run end-to-end, flush every downspout, inspect hangers and sealant, photograph issues, and haul the waste. Plus we are an aluminum specialty contractor, we can quote any repair we find on the spot instead of telling you to call someone else.",
      },
    },
    {
      "@type": "Question",
      name: "Can you clean gutters on a two- or three-story home in Tampa?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. JR One is equipped for multi-story residential and commercial. Our crews have the ladders, equipment, and training for high-access work homeowners should not try from a ladder.",
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
      name: "Do you offer emergency or post-storm gutter cleaning?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. After named storms we prioritize existing customers and contracted properties, with same-week or next-day availability depending on demand. Call and we will get you in as fast as the schedule allows.",
      },
    },
    {
      "@type": "Question",
      name: "Should I install gutter guards instead of cleaning?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Gutter guards reduce cleaning frequency from quarterly to every 2-3 years for most Tampa Bay homes. Guards are not maintenance-free, but the math usually works out within 3-5 years for homes with heavy oak or pine cover. See our gutter guards page for the cost-benefit breakdown.",
      },
    },
  ],
};

export const metadata = {
  title: "Gutter Cleaning Tampa | $150-$400 Single-Family Photo Report | JR One",
  description:
    "Professional gutter cleaning Tampa Bay, full debris removal, downspout flushing, hanger inspection, haul-away. Typical single-family $150-$400. Same-day estimates (844) 444-3114.",
  keywords: "gutter cleaning tampa, gutter cleaning tampa fl, gutter cleaning cost tampa, downspout flushing, gutter maintenance tampa bay, professional gutter cleaner florida, gutter cleaning clearwater, gutter cleaning st petersburg",
  alternates: {
    canonical: "https://jronegutters.com/gutter-cleaning",
    languages: {
      "en-US": "https://jronegutters.com/gutter-cleaning",
      "es-US": "https://jronegutters.com/es/limpieza-canaletas-tampa",
      "x-default": "https://jronegutters.com/gutter-cleaning",
    },
  },
  openGraph: {
    title: "Gutter Cleaning Tampa | JR One Aluminum",
    description: "Full debris removal, downspout flushing, photo documentation. Typical single-family $150-$400.",
    url: "https://jronegutters.com/gutter-cleaning",
    type: "website",
    images: [
      {
        url: "https://jronegutters.com/images/gutter-cleaning-before.webp",
        width: 1920,
        height: 1080,
        alt: "Clogged residential gutter in Tampa Bay before JR One Aluminum cleaning service",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Gutter Cleaning Tampa | JR One Aluminum",
    description: "Full service cleaning, flushing, and inspection with photo documentation.",
    images: ["https://jronegutters.com/images/gutter-cleaning-before.webp"],
  },
};

export default function Layout({ children }) {
  return (
    <>
      <link rel="preload" as="image" href="/images/gutter-cleaning-before.webp" fetchPriority="high" />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(imageObjectSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      {children}
    </>
  );
}
