// Locale-scoped layout for all /es/* routes.
// Wraps children in a LanguageProvider locked to Spanish so SSR renders
// Spanish content directly (no client-side toggle, no localStorage hop).
// Google indexes the SSR'd Spanish content; hreflang alternates pair each
// /es/* URL with its English counterpart for proper bilingual signaling.
//
// Metadata in this file applies to /es (the Spanish homepage). Sub-routes
// override metadata in their own layout.js files.

import { LanguageProvider } from "../../lib/LanguageContext";

const organizationSchemaEs = {
  "@context": "https://schema.org",
  "@type": "HomeAndConstructionBusiness",
  name: "JR One Aluminum LLC",
  url: "https://jronegutters.com/es",
  telephone: "(844) 444-3114",
  email: "info@jronegutters.com",
  inLanguage: "es-US",
  address: {
    "@type": "PostalAddress",
    streetAddress: "3420 W Cherry St",
    addressLocality: "Tampa",
    addressRegion: "FL",
    postalCode: "33607",
    addressCountry: "US",
  },
  geo: { "@type": "GeoCoordinates", latitude: 27.9596, longitude: -82.4858 },
  description: "Empresa familiar de canaletas, sofito y fascia en Tampa Bay. Mas de 30 anos en el oficio. Solo instalamos canaletas de 6 y 7 pulgadas. Hablamos espanol.",
  areaServed: ["Tampa", "St. Petersburg", "Clearwater", "Brandon", "Riverview", "Wesley Chapel", "Lutz", "Land O' Lakes", "Sarasota", "Bradenton", "Lakeland", "Palm Harbor", "New Port Richey", "Largo", "Spring Hill", "Tarpon Springs", "Dunedin", "Ruskin", "Sun City Center", "Temple Terrace", "Plant City", "South Tampa", "New Tampa", "Valrico", "Lithia", "Oldsmar", "Safety Harbor", "Seminole", "Pinellas Park"].map((name) => ({ "@type": "City", name })),
  priceRange: "$$",
  availableLanguage: ["en", "es"],
  paymentAccepted: ["Cash", "Check", "Credit Card", "Financing"],
  openingHoursSpecification: [
    { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], opens: "07:00", closes: "19:00" },
    { "@type": "OpeningHoursSpecification", dayOfWeek: "Saturday", opens: "08:00", closes: "16:00" },
  ],
};

const breadcrumbSchemaEs = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Inicio", item: "https://jronegutters.com/es" },
  ],
};

export const metadata = {
  title: "Canaletas, Sofito y Fascia en Tampa Bay | JR One Aluminum - Hablamos Espanol",
  description: "Empresa familiar de canaletas, sofito y fascia en Tampa Bay. Solo 6 y 7 pulgadas de aluminio sin costura. Mas de 30 anos en el oficio. Estimado gratis (844) 444-3114.",
  alternates: {
    canonical: "https://jronegutters.com/es",
    languages: {
      "en-US": "https://jronegutters.com",
      "es-US": "https://jronegutters.com/es",
      "x-default": "https://jronegutters.com",
    },
  },
  openGraph: {
    title: "Canaletas, Sofito y Fascia Tampa Bay | JR One Aluminum",
    description: "Mas de 30 anos en el oficio. Solo 6 y 7 pulgadas. Empresa familiar. Hablamos espanol. (844) 444-3114.",
    url: "https://jronegutters.com/es",
    siteName: "JR One Aluminum",
    type: "website",
    locale: "es_US",
    images: [{ url: "https://jronegutters.com/images/spanish-hero-familia.webp", width: 1920, height: 1080, alt: "Familia hispana frente a su hogar en Tampa Bay con canaletas y sofito instalados por JR One Aluminum" }],
  },
  twitter: { card: "summary_large_image", images: ["https://jronegutters.com/images/spanish-hero-familia.webp"] },
  robots: { index: true, follow: true },
};

export default function EsLayout({ children }) {
  return (
    <LanguageProvider initialLang="es" forceLang={true}>
      <link rel="preload" as="image" href="/images/spanish-hero-familia.webp" fetchPriority="high" />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchemaEs) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchemaEs) }} />
      {children}
    </LanguageProvider>
  );
}
