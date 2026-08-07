const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Sagiper Premium PVC Soffit and Cladding",
  serviceType: "Premium Soffit and Cladding Installation",
  provider: {
    "@type": "HomeAndConstructionBusiness",
    name: "JR One Aluminum LLC",
    url: "https://www.jronegutters.com",
    telephone: "(844) 444-3114",
    address: { "@type": "PostalAddress", streetAddress: "3420 W Cherry St", addressLocality: "Tampa", addressRegion: "FL", postalCode: "33607", addressCountry: "US" },
  },
  areaServed: [
    { "@type": "City", name: "Tampa" },
    { "@type": "City", name: "St. Petersburg" },
    { "@type": "City", name: "Clearwater" },
    { "@type": "City", name: "Sarasota" },
  ],
  description:
    "Sagiper premium cellular PVC soffit and cladding installation in Tampa Bay, wood-grain aesthetic, no rot, no repainting cycle. 50-year limited manufacturer warranty. Common on lanais, patios, and architectural homes.",
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://www.jronegutters.com" },
    { "@type": "ListItem", position: 2, name: "Sagiper", item: "https://www.jronegutters.com/sagiper" },
  ],
};

export const metadata = {
  title: "Sagiper PVC Soffit Tampa FL",
  description:
    "Sagiper cellular PVC soffit and cladding in Tampa Bay. Wood-grain texture, no rot, no repainting. 50-year limited warranty. Free estimate, (844) 444-3114.",
  alternates: {
    canonical: "https://www.jronegutters.com/sagiper",
    languages: {
      "en-US": "https://www.jronegutters.com/sagiper",
      "es-US": "https://www.jronegutters.com/es/sagiper-soffit-pvc-tampa",
      "x-default": "https://www.jronegutters.com/sagiper",
    },
  },
  openGraph: {
    title: "Sagiper Premium Cladding Tampa FL, JR One Aluminum",
    description: "PVC cladding with wood-grain texture, made in Portugal. Architectural soffit for Tampa Bay homes.",
    url: "https://www.jronegutters.com/sagiper",
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
