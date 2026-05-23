// Locale-scoped layout for all /es/* routes.
// Wraps children in a LanguageProvider locked to Spanish so SSR renders
// Spanish content directly (no client-side toggle, no localStorage hop).
// Google indexes the SSR'd Spanish content; hreflang alternates pair each
// /es/* URL with its English counterpart for proper bilingual signaling.

import { LanguageProvider } from "../../lib/LanguageContext";

export default function EsLayout({ children }) {
  return (
    <LanguageProvider initialLang="es" forceLang={true}>
      {children}
    </LanguageProvider>
  );
}
