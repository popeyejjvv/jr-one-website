/* Spanish-default route for the storm-damage landing.
   Reuses the bilingual StormDamagePage component. The parent app/es/layout.js
   wraps this tree in <LanguageProvider initialLang="es" forceLang>, which means
   the SSR render emits the Spanish T.es content directly (Google indexes ES).
   The user cannot toggle out of Spanish on this URL; SiteNav's lang switch on
   locked routes should navigate to /storm-damage-gutters-tampa instead. */

import StormDamagePage from "../../storm-damage-gutters-tampa/page";

export default function CanaletasTormentaTampaPage() {
  return <StormDamagePage />;
}
