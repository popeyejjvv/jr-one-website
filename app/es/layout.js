// Locale-scoped layout for all /es/* routes.
// Wraps children in a LanguageProvider locked to Spanish so SSR renders
// Spanish content directly (no client-side toggle, no localStorage hop).
// Google indexes the SSR'd Spanish content; hreflang alternates pair each
// /es/* URL with its English counterpart for proper bilingual signaling.
//
// Metadata in this file applies to /es (the Spanish homepage). Sub-routes
// override metadata in their own layout.js files.

import { LanguageProvider } from "../../lib/LanguageContext";

// Spanish-locale signal that MERGES into the canonical #business entity
// (same @id) rendered by RootLayout. Stripped to @id + inLanguage so the ES
// pages do not emit a second, conflicting LocalBusiness (the old copy carried
// wrong hours/geo that contradicted #business and the contact page).
const organizationSchemaEs = {
  "@context": "https://schema.org",
  "@type": "HomeAndConstructionBusiness",
  "@id": "https://jronegutters.com/#business",
  inLanguage: "es-US",
};

export const metadata = {
  title: "Canaletas, Sofito y Fascia en Tampa Bay | JR One Aluminum - Hablamos Español",
  description: "Empresa familiar de canaletas, sofito y fascia en Tampa Bay. Solo 6 y 7 pulgadas de aluminio sin costura. Más de 30 años en el oficio. Estimado gratis (844) 444-3114.",
  alternates: {
    canonical: "https://www.jronegutters.com/es",
    languages: {
      "en-US": "https://www.jronegutters.com",
      "es-US": "https://www.jronegutters.com/es",
      "x-default": "https://www.jronegutters.com",
    },
  },
  openGraph: {
    title: "Canaletas, Sofito y Fascia Tampa Bay | JR One Aluminum",
    description: "Más de 30 años en el oficio. Solo 6 y 7 pulgadas. Empresa familiar. Hablamos español. (844) 444-3114.",
    url: "https://www.jronegutters.com/es",
    siteName: "JR One Aluminum",
    type: "website",
    locale: "es_US",
    images: [{ url: "https://www.jronegutters.com/images/spanish-hero-familia.webp", width: 1920, height: 1080, alt: "Familia hispana frente a su hogar en Tampa Bay con canaletas y sofito instalados por JR One Aluminum" }],
  },
  twitter: { card: "summary_large_image", images: ["https://www.jronegutters.com/images/spanish-hero-familia.webp"] },
  robots: { index: true, follow: true },
};

export default function EsLayout({ children }) {
  return (
    <LanguageProvider initialLang="es" forceLang={true}>
      <link rel="preload" as="image" href="/images/spanish-hero-familia.webp" fetchPriority="high" />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchemaEs) }} />
      {children}
    </LanguageProvider>
  );
}
