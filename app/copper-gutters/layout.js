const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Copper Gutter Installation",
  serviceType: "Copper Gutter Installation",
  provider: {
    "@type": "HomeAndConstructionBusiness",
    name: "JR One Aluminum LLC",
    url: "https://jronegutters.com",
    telephone: "(844) 444-3114",
    address: { "@type": "PostalAddress", addressLocality: "Tampa", addressRegion: "FL", addressCountry: "US" },
  },
  areaServed: [
    { "@type": "City", name: "Tampa" },
    { "@type": "City", name: "St. Petersburg" },
    { "@type": "City", name: "Clearwater" },
    { "@type": "City", name: "Sarasota" },
    { "@type": "City", name: "Bradenton" },
  ],
  description:
    "Custom copper gutter installation for architectural and historic Tampa Bay homes. Seamless K-style and half-round copper, custom copper conductor heads, copper downspouts, and copper gutter guards. 50+ year lifespan.",
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://jronegutters.com" },
    { "@type": "ListItem", position: 2, name: "Copper Gutters", item: "https://jronegutters.com/copper-gutters" },
  ],
};

export const metadata = {
  title: "Copper Gutters Tampa FL",
  description:
    "Premium copper gutter systems for Tampa Bay architectural homes. Seamless K-style and half-round copper, conductor heads, downspouts. 50+ year lifespan. (844) 444-3114.",
  alternates: {
    canonical: "https://jronegutters.com/copper-gutters",
    languages: {
      "en-US": "https://jronegutters.com/copper-gutters",
      "es-US": "https://jronegutters.com/es/canaletas-cobre-tampa",
      "x-default": "https://jronegutters.com/copper-gutters",
    },
  },
  openGraph: {
    title: "Copper Gutters Tampa FL, JR One Aluminum",
    description: "Custom copper gutter installation in Tampa Bay. Seamless K-style and half-round. For architectural and historic homes.",
    url: "https://jronegutters.com/copper-gutters",
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
