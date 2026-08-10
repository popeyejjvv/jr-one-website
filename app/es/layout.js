// Locale-scoped layout for all /es/* routes.
// Wraps children in a LanguageProvider locked to Spanish so SSR renders
// Spanish content directly (no client-side toggle, no localStorage hop).
// Google indexes the SSR'd Spanish content; hreflang alternates pair each
// /es/* URL with its English counterpart for proper bilingual signaling.
//
// Metadata in this file applies to /es (the Spanish homepage). Sub-routes
// override metadata in their own layout.js files.

import { LanguageProvider } from "../../lib/LanguageContext";

// NOTE (2026-08-09): this file used to emit a second top-level JSON-LD node
// reusing RootLayout's @id ".../#business" with only inLanguage: "es-US" on it.
// A node that carries "@context" is an independent record, not a merge, so every
// /es/* URL published TWO records for one entity. Schema validation errors on
// 111 URLs and climbing traced back to exactly this. Removed; app/layout.js:22-112
// is the single source of truth for #business.
//
// Nothing was lost. inLanguage is a CreativeWork property and is not valid on an
// Organization subtype anyway, and the Spanish signal never came from here:
//   - knowsLanguage ["English","Spanish"] sits on the same #business node (app/layout.js:106)
//   - inLanguage ["en-US","es-US"] sits on the #website node (app/layout.js:155)
//   - <html lang="es"> is set in app/layout.js:230 from the middleware x-pathname header
//   - hreflang alternates + the Spanish canonical are declared below in `metadata`
// Do NOT re-add a business or organization record to this file.

export const metadata = {
  // absolute: the root layout template is "%s | JR One Aluminum". Without this the
  // Spanish homepage rendered its own brand name twice and ran 94 characters.
  // template must be re-declared here: an `absolute` in a segment nulls the inherited
  // template for every descendant, which would silently strip the brand tail from
  // every /es/* page that does not set its own `absolute`.
  title: {
    absolute: "Canaletas, Sofito y Fascia Tampa Bay | Hablamos Español",
    template: "%s | JR One Aluminum",
  },
  description: "Canaletas continuas de 6 y 7 pulgadas, sofito, fascia y drenaje en Tampa Bay. Empresa familiar con equipos propios. Estimado gratis: (844) 444-3114.",
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
    description: "Canaletas continuas de 6 y 7 pulgadas, sofito, fascia y drenaje. Empresa familiar con equipos propios. Hablamos español. (844) 444-3114.",
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
      {children}
    </LanguageProvider>
  );
}
