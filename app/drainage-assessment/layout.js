const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Drainage Assessment and Installation Tampa",
  serviceType: "Drainage Installation",
  image: "https://jronegutters.com/images/florida-rain-gutters.webp",
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
  ],
  description:
    "Underground drainage installation in Tampa Bay. Our drainage scope is underground PVC, catch basins, surface grates, and pop-up emitters. We do not install french drains or channel drains. Move downspout water away from foundations.",
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://www.jronegutters.com" },
    { "@type": "ListItem", position: 2, name: "Drainage", item: "https://www.jronegutters.com/drainage-assessment" },
  ],
};

export const metadata = {
  title: "Underground Drainage Tampa FL",
  description:
    "Tampa Bay underground drainage. PVC, catch basins, surface grates, pop-up emitters. We do not install french drains or channel drains. Free assessment, (844) 444-3114.",
  alternates: {
    canonical: "https://www.jronegutters.com/drainage-assessment",
    languages: {
      "en-US": "https://www.jronegutters.com/drainage-assessment",
      "es-US": "https://www.jronegutters.com/es/evaluacion-drenaje-tampa",
      "x-default": "https://www.jronegutters.com/drainage-assessment",
    },
  },
  openGraph: {
    title: "Drainage Installation Tampa FL, JR One Aluminum",
    description: "Tampa Bay drainage specialists, PVC, catch basins, dry wells. Move water away from foundations.",
    url: "https://www.jronegutters.com/drainage-assessment",
    type: "website",
    images: [{ url: "https://www.jronegutters.com/images/florida-rain-gutters.webp", width: 1920, height: 1080, alt: "Heavy tropical rain flowing through JR One Aluminum gutter and downspout system on a Tampa Bay home" }],
  },
  twitter: { card: "summary_large_image", images: ["https://jronegutters.com/images/florida-rain-gutters.webp"] },
};

export default function Layout({ children }) {
  return (
    <>
      <link rel="preload" as="image" href="/images/florida-rain-gutters.webp" fetchPriority="high" />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      {children}
    </>
  );
}
