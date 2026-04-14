const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Drainage Assessment and Installation",
  serviceType: "Drainage Installation",
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
    "Underground drainage installation in Tampa Bay — Schedule 40 PVC, corrugated pipe, catch basins, dry wells, French drains, pop-up emitters. Move downspout water away from foundations.",
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://jronegutters.com" },
    { "@type": "ListItem", position: 2, name: "Drainage", item: "https://jronegutters.com/drainage-assessment" },
  ],
};

export const metadata = {
  title: "Drainage Installation Tampa FL | French Drains, Catch Basins, Dry Wells",
  description:
    "Underground drainage systems in Tampa Bay. Schedule 40 PVC, catch basins, dry wells, French drains. Protect foundation from Florida rainfall. Free assessment — (844) 444-3114.",
  alternates: { canonical: "https://jronegutters.com/drainage-assessment" },
  openGraph: {
    title: "Drainage Installation Tampa FL — JR One Aluminum",
    description: "Tampa Bay drainage specialists — PVC, catch basins, dry wells. Move water away from foundations.",
    url: "https://jronegutters.com/drainage-assessment",
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
