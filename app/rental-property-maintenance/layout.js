const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Rental Property Gutter & Aluminum Maintenance",
  serviceType: "Rental Property Maintenance",
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
  ],
  description:
    "Gutter, soffit, and fascia maintenance for Airbnb, VRBO, long-term rental, and investment properties across Tampa Bay. Built for absentee owners, scheduled service, photo reports, and tenant coordination without the owner showing up.",
  offers: { "@type": "Offer", priceCurrency: "USD", availability: "https://schema.org/InStock" },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://jronegutters.com" },
    { "@type": "ListItem", position: 2, name: "Rental Property Maintenance", item: "https://jronegutters.com/rental-property-maintenance" },
  ],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "@id": "https://jronegutters.com/rental-property-maintenance#faq",
  mainEntityOfPage: "https://jronegutters.com/rental-property-maintenance",
  mainEntity: [
    {
      "@type": "Question",
      name: "How much does a rental service plan cost?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Single-rental plans typically run $300-$800 annually for semi-annual gutter cleaning + inspection on a standard single-family rental, depending on linear footage and access. Portfolio plans get bundled pricing that drops per-property cost materially. Exact pricing after a walkthrough, no generic rate quoted over the phone.",
      },
    },
    {
      "@type": "Question",
      name: "Do I need to be present for the service?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. That's the entire point of the plan. We coordinate with your tenant, your short-term-rental cleaner, or your property manager directly. You get a photo report after every visit.",
      },
    },
    {
      "@type": "Question",
      name: "How do you handle access to the property?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "For LTRs we schedule with the tenant directly and give at least 48 hours notice. For STRs we work within your turnover window. If access is gated we coordinate the code or entry method with you or your cleaner once and file it for future visits.",
      },
    },
    {
      "@type": "Question",
      name: "What if the tenant or guest reports a water problem between scheduled visits?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Call or text us. We can typically be on-site within 48 hours for a diagnostic on contracted properties, faster for active leaks. You'll get a plan and a quote before any repair work begins.",
      },
    },
    {
      "@type": "Question",
      name: "Do you work with property managers?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Many of our rental accounts come through property managers who want a single aluminum vendor across their managed portfolio. We invoice the manager, report to the manager, and coordinate through the manager, not the owner directly unless requested.",
      },
    },
    {
      "@type": "Question",
      name: "Can you handle soffit or fascia damage, not just cleaning?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. We're a specialty aluminum contractor, gutters, soffit, fascia, aluminum trim, and drainage. If a scheduled visit turns up rotted fascia or blown soffit panels, we flag it for owner approval and execute the repair in the same property visit.",
      },
    },
    {
      "@type": "Question",
      name: "Do you carry insurance suitable for rental work?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. JR One Aluminum carries full general liability and workers' compensation coverage. We can provide certificates of insurance to owners or property management companies on request.",
      },
    },
  ],
};

export const metadata = {
  title: "Rental Property Gutter Maintenance Tampa FL | Airbnb, LTR, Investor",
  description:
    "Gutter, soffit, and fascia service for Airbnb, long-term rentals, and investment properties in Tampa Bay. Built for absentee owners, scheduled visits, photo reports, tenant coordination. (844) 444-3114.",
  keywords: "rental property gutter maintenance Tampa, Airbnb exterior maintenance, absentee owner gutter service, investment property Tampa, VRBO property maintenance Florida",
  alternates: {
    canonical: "https://jronegutters.com/rental-property-maintenance",
    languages: {
      "en-US": "https://jronegutters.com/rental-property-maintenance",
      "es-US": "https://jronegutters.com/es/mantenimiento-propiedad-alquiler-tampa",
      "x-default": "https://jronegutters.com/rental-property-maintenance",
    },
  },
  openGraph: {
    title: "Rental Property Maintenance Tampa FL, JR One Aluminum",
    description: "Gutter, soffit, and fascia maintenance for Tampa Bay rentals. Absentee-owner-friendly with photo reporting.",
    url: "https://jronegutters.com/rental-property-maintenance",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Rental Property Maintenance Tampa FL, JR One Aluminum",
    description: "Gutter, soffit, fascia service for Airbnb, LTR, and investor properties in Tampa Bay.",
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
