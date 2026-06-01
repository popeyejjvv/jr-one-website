const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Rental Property Gutter & Aluminum Maintenance",
  serviceType: "Rental Property Maintenance",
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
    { "@type": "ListItem", position: 1, name: "Home", item: "https://www.jronegutters.com" },
    { "@type": "ListItem", position: 2, name: "Rental Property Maintenance", item: "https://www.jronegutters.com/rental-property-maintenance" },
  ],
};

export const metadata = {
  title: "Rental Property Gutters Tampa FL",
  description:
    "Gutter, soffit, and fascia service for Airbnb, long-term rentals, and investment properties in Tampa Bay. Built for absentee owners, scheduled visits, photo reports, tenant coordination. (844) 444-3114.",
  keywords: "rental property gutter maintenance Tampa, Airbnb exterior maintenance, absentee owner gutter service, investment property Tampa, VRBO property maintenance Florida",
  alternates: {
    canonical: "https://www.jronegutters.com/rental-property-maintenance",
    languages: {
      "en-US": "https://www.jronegutters.com/rental-property-maintenance",
      "es-US": "https://www.jronegutters.com/es/mantenimiento-propiedad-alquiler-tampa",
      "x-default": "https://www.jronegutters.com/rental-property-maintenance",
    },
  },
  openGraph: {
    title: "Rental Property Maintenance Tampa FL, JR One Aluminum",
    description: "Gutter, soffit, and fascia maintenance for Tampa Bay rentals. Absentee-owner-friendly with photo reporting.",
    url: "https://www.jronegutters.com/rental-property-maintenance",
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
      {children}
    </>
  );
}
