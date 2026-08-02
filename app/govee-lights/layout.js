const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Govee Exterior LED Lighting Installation",
  serviceType: "Exterior LED Lighting",
  provider: {
    "@type": "HomeAndConstructionBusiness",
    name: "JR One Aluminum LLC",
    url: "https://www.jronegutters.com",
    telephone: "(844) 444-3114",
    address: { "@type": "PostalAddress", streetAddress: "3420 W Cherry St", addressLocality: "Tampa", addressRegion: "FL", postalCode: "33607", addressCountry: "US" },
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
    "Govee exterior LED lighting installation in Tampa Bay. App-controlled, 16M colors, year-round holiday and accent lighting. Install once, never take down. Integrates with Alexa, Google Home, Apple HomeKit.",
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://www.jronegutters.com" },
    { "@type": "ListItem", position: 2, name: "Govee Lights", item: "https://www.jronegutters.com/govee-lights" },
  ],
};

export const metadata = {
  title: "Govee LED Lights Tampa",
  description:
    "Govee exterior LED light installation in Tampa Bay. App-controlled, 16M colors, holiday and accent lighting year-round. Alexa + Google Home compatible. Free quote, (844) 444-3114.",
  alternates: {
    canonical: "https://www.jronegutters.com/govee-lights",
    languages: {
      "en-US": "https://www.jronegutters.com/govee-lights",
      "es-US": "https://www.jronegutters.com/es/luces-govee-tampa",
      "x-default": "https://www.jronegutters.com/govee-lights",
    },
  },
  openGraph: {
    title: "Govee Exterior LED Lighting Tampa FL, JR One Aluminum",
    description: "Professionally mounted smart LED lighting installed along your Tampa roofline. Holiday + team colors + security, all year.",
    url: "https://www.jronegutters.com/govee-lights",
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
