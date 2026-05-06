const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Soffit and Fascia Installation",
  serviceType: "Soffit and Fascia Installation",
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
    "Aluminum and vinyl soffit installation, vented and non-vented panels. Custom-bent aluminum fascia wrapping in single, 2-tier, and 3-tier profiles. Wood fascia replacement when needed. Tampa Bay specialist, 30+ years experience.",
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://jronegutters.com" },
    { "@type": "ListItem", position: 2, name: "Soffit and Fascia", item: "https://jronegutters.com/soffit-and-fascia" },
  ],
};

export const metadata = {
  title: "Soffit and Fascia Replacement Tampa FL | Rotted Wood + Aluminum Install",
  description:
    "Soffit and fascia replacement in Tampa, rotted wood replaced, aluminum installed. Vented panels, custom-bent fascia wraps, pest-seal, repaint eliminated. Free estimate, (844) 444-3114.",
  alternates: { canonical: "https://jronegutters.com/soffit-and-fascia" },
  keywords: [
    "soffit and fascia replacement tampa",
    "soffit and fascia repair tampa",
    "soffit repair tampa",
    "soffit and fascia tampa",
    "fascia replacement tampa",
    "aluminum soffit tampa",
  ],
  openGraph: {
    title: "Soffit and Fascia Replacement Tampa FL, JR One Aluminum",
    description: "Rotted wood out, aluminum in. Soffit and fascia replacement specialists in Tampa Bay for over 30 years. Free estimates.",
    url: "https://jronegutters.com/soffit-and-fascia",
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
