// Spanish homepage at /es.
// /es/layout.js locks LanguageProvider to "es" so the EN homepage component's
// T.es block renders SSR. Metadata + JSON-LD live in /es/layout.js.

import JROneHomepage from "../page";

export default function EsHomePage() {
  return <JROneHomepage />;
}
