const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Siding Installation",
  serviceType: "Siding Installation",
  provider: {
    "@type": "HomeAndConstructionBusiness",
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
  ],
  description:
    "Siding installation in Tampa Bay, vinyl lap, Hardie board lap, Hardie batten and shaker, custom aluminum. Integrated with soffit, fascia, and gutters by one specialist crew. 30+ years experience.",
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://www.jronegutters.com" },
    { "@type": "ListItem", position: 2, name: "Siding", item: "https://www.jronegutters.com/siding" },
  ],
};

export const metadata = {
  title: { absolute: "Siding Installation in Tampa FL | Financing Available" },
  description:
    "Vinyl, Hardie fiber cement, aluminum, and Sagiper PVC siding in Tampa, installed by the crew that also does your soffit and gutters. Call (844) 444-3114.",
  alternates: {
    canonical: "https://www.jronegutters.com/siding",
    languages: {
      "en-US": "https://www.jronegutters.com/siding",
      "es-US": "https://www.jronegutters.com/es/revestimiento-tampa",
      "x-default": "https://www.jronegutters.com/siding",
    },
  },
  openGraph: {
    title: "Siding Installation Tampa FL, JR One Aluminum",
    description: "Tampa Bay siding specialist, Hardie, vinyl, custom aluminum. Integrated with soffit, fascia, and gutters.",
    url: "https://www.jronegutters.com/siding",
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
