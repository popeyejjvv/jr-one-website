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
    { "@type": "ListItem", position: 1, name: "Home", item: "https://www.jronegutters.com" },
    { "@type": "ListItem", position: 2, name: "Services", item: "https://www.jronegutters.com" },
    { "@type": "ListItem", position: 3, name: "Gutter Cleaning Tampa", item: "https://www.jronegutters.com/gutter-cleaning" },
  ],
};

const imageObjectSchema = {
  "@context": "https://schema.org",
  "@type": "ImageObject",
  contentUrl: "https://jronegutters.com/images/gutter-cleaning-before.webp",
  url: "https://www.jronegutters.com/images/gutter-cleaning-before.webp",
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

export const metadata = {
  title: "Gutter Cleaning Tampa FL",
  description:
    "Professional gutter cleaning Tampa Bay, full debris removal, downspout flushing, hanger inspection, haul-away. Typical single-family $150-$400. Same-day estimates (844) 444-3114.",
  keywords: "gutter cleaning tampa, gutter cleaning tampa fl, gutter cleaning cost tampa, downspout flushing, gutter maintenance tampa bay, professional gutter cleaner florida, gutter cleaning clearwater, gutter cleaning st petersburg",
  alternates: {
    canonical: "https://www.jronegutters.com/gutter-cleaning",
    languages: {
      "en-US": "https://www.jronegutters.com/gutter-cleaning",
      "es-US": "https://www.jronegutters.com/es/limpieza-canaletas-tampa",
      "x-default": "https://www.jronegutters.com/gutter-cleaning",
    },
  },
  openGraph: {
    title: "Gutter Cleaning Tampa | JR One Aluminum",
    description: "Full debris removal, downspout flushing, photo documentation. Typical single-family $150-$400.",
    url: "https://www.jronegutters.com/gutter-cleaning",
    type: "website",
    images: [
      {
        url: "https://www.jronegutters.com/images/gutter-cleaning-before.webp",
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
      {children}
    </>
  );
}
