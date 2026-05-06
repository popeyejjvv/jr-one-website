const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Gutter Guard Installation",
  serviceType: "Gutter Guard Installation",
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
  ],
  description:
    "Micro mesh, leaf guard, and copper gutter guards professionally installed in Tampa Bay. Local specialist pricing, typically $1,000-$1,500 less than national brands like LeafFilter and Gutter Helmet.",
  offers: {
    "@type": "Offer",
    priceCurrency: "USD",
    availability: "https://schema.org/InStock",
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://jronegutters.com" },
    { "@type": "ListItem", position: 2, name: "Gutter Guards", item: "https://jronegutters.com/gutter-guards" },
  ],
};

export const metadata = {
  title: "Gutter Guard Installation Tampa FL | Micro Mesh, Leaf Guard, Copper",
  description:
    "Professional gutter guard installation in Tampa Bay. Micro mesh for pine needles and fine debris. 30+ years specialist experience. Local pricing, free estimate at (844) 444-3114.",
  alternates: { canonical: "https://jronegutters.com/gutter-guards" },
  openGraph: {
    title: "Gutter Guards Tampa FL, JR One Aluminum",
    description: "Micro mesh and standard gutter guards professionally installed in Tampa Bay. Free estimates.",
    url: "https://jronegutters.com/gutter-guards",
    type: "website",
  },
};

export default function Layout({ children }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      {children}
    </>
  );
}
