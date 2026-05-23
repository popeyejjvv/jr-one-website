// Server-side metadata + JSON-LD for /storm-damage-gutters-tampa.
// Hurricane-season landing. Brand-brain compliant: 6"+7" only, no french drains,
// Peak 301 shingle-only, locked phone (844) 444-3114, hreflang to /es/ counterpart.

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Storm Damage Gutter Repair & Replacement",
  serviceType: "Gutter Installation & Repair",
  provider: {
    "@type": "HomeAndConstructionBusiness",
    name: "JR One Aluminum LLC",
    url: "https://jronegutters.com",
    telephone: "(844) 444-3114",
    address: { "@type": "PostalAddress", streetAddress: "3420 W Cherry St", addressLocality: "Tampa", addressRegion: "FL", postalCode: "33607", addressCountry: "US" },
  },
  areaServed: [
    "Tampa", "St. Petersburg", "Clearwater", "Brandon", "Riverview", "Wesley Chapel",
    "Lutz", "Land O' Lakes", "New Tampa", "Valrico", "Lithia", "Plant City",
    "Temple Terrace", "Oldsmar", "Safety Harbor", "Dunedin", "Palm Harbor",
    "Tarpon Springs", "Largo", "Seminole", "Pinellas Park"
  ].map((name) => ({ "@type": "City", name })),
  description:
    "Hurricane and named-storm damage repair for gutters, fascia, soffit, and downspouts across Tampa Bay. Same-week install. 6\" and 7\" seamless aluminum gutters only (no 5\" in Florida). Insurance claim documentation provided. Family-owned, over 30 years in the trade.",
  offers: {
    "@type": "Offer",
    priceCurrency: "USD",
    availability: "https://schema.org/InStock",
    description: "Same-week post-storm install scheduling during hurricane season.",
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://jronegutters.com" },
    { "@type": "ListItem", position: 2, name: "Storm Damage Gutter Repair", item: "https://jronegutters.com/storm-damage-gutters-tampa" },
  ],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "@id": "https://jronegutters.com/storm-damage-gutters-tampa#faq",
  mainEntityOfPage: "https://jronegutters.com/storm-damage-gutters-tampa",
  mainEntity: [
    { "@type": "Question", name: "Will my homeowner's insurance cover storm-damaged gutters?", acceptedAnswer: { "@type": "Answer", text: "Most Florida homeowner policies cover storm damage to gutters, fascia, soffit, and downspouts when the damage is from a named storm or a documented severe weather event. Coverage depends on your specific policy, your deductible, and the cause of damage. JR One Aluminum documents the damage so your adjuster has what they need to evaluate the claim." } },
    { "@type": "Question", name: "How fast can you replace the gutters after a hurricane?", acceptedAnswer: { "@type": "Answer", text: "JR One Aluminum books same-week installs during storm season. Material is in stock at the Tampa shop. Most single-family installs are done in one day. After a major named storm we triage by severity, homes with active water intrusion at the foundation jump the line." } },
    { "@type": "Question", name: "Do you install hurricane-rated fasteners?", acceptedAnswer: { "@type": "Answer", text: "Yes. All JR One installs use hidden screw-in hangers spaced for hurricane wind load. We do not use nail-in hangers because they pull out under uplift." } },
    { "@type": "Question", name: "Can you wrap the fascia in aluminum to prevent the next round of rot?", acceptedAnswer: { "@type": "Answer", text: "Yes. JR One Aluminum replaces the rotted fascia board, primes it, wraps it in factory-finished aluminum that matches the new gutters, and re-hangs. The aluminum wrap stops the rot cycle permanently because there is no wood exposed to the weather." } },
    { "@type": "Question", name: "Do you do storm-damage roof work too?", acceptedAnswer: { "@type": "Answer", text: "No. JR One Aluminum is a specialty gutter, soffit, fascia, and drainage trade. For storm-damaged roofs we refer to vetted Tampa Bay roofers. JR One does install Peak 301 roof rejuvenation on shingle roofs that are not storm-damaged but are showing age." } },
    { "@type": "Question", name: "What does post-storm install cost?", acceptedAnswer: { "@type": "Answer", text: "Pricing depends on linear footage, downspout count, fascia and soffit damage extent, gutter size (6\" or 7\"), color, and access. JR One Aluminum measures on-site, photographs the damage, and quotes in person. The estimate is free." } },
  ],
};

export const metadata = {
  title: "Storm Damage Gutter Repair Tampa FL — Same-Week Install",
  description:
    "Hurricane-damaged gutters, fascia, soffit in Tampa Bay. Same-week install, insurance documentation, photos for adjuster. Family-owned, 30+ years. (844) 444-3114.",
  alternates: {
    canonical: "https://jronegutters.com/storm-damage-gutters-tampa",
    languages: {
      "en-US": "https://jronegutters.com/storm-damage-gutters-tampa",
      "es-US": "https://jronegutters.com/es/canaletas-dano-tormenta-tampa",
      "x-default": "https://jronegutters.com/storm-damage-gutters-tampa",
    },
  },
  openGraph: {
    title: "Storm Damage Gutter Repair Tampa Bay — JR One Aluminum",
    description: "Same-week install for hurricane-damaged gutters, fascia, soffit. Insurance claim documentation. (844) 444-3114.",
    url: "https://jronegutters.com/storm-damage-gutters-tampa",
    type: "website",
    locale: "en_US",
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
