// Single source of truth for EN <-> ES routing + link localization.
// PLAIN module (no "use client") so BOTH Server Components (CityLandingPage,
// app/areas/[slug], etc.) and Client Components (SiteNav, SiteFooter, app/page)
// import the identical logic. Every internal link in the app routes its href
// through localizeHref(href, lang) so a visitor never leaks out of their language.

export const EN_TO_ES = {
  "/": "/es",
  // Service pages (17) — ES routes exist
  "/seamless-aluminum-gutters": "/es/canaletas-sin-costura-tampa",
  "/gutter-cleaning": "/es/limpieza-canaletas-tampa",
  "/soffit-and-fascia": "/es/sofito-fascia-tampa",
  "/gutter-guards": "/es/protectores-canaletas-tampa",
  "/gutter-repair": "/es/reparacion-canaletas-tampa",
  "/storm-damage-gutters-tampa": "/es/canaletas-dano-tormenta-tampa",
  "/7-inch-gutters": "/es/canaletas-7-pulgadas-tampa",
  "/commercial-gutters": "/es/canaletas-comerciales-tampa",
  "/copper-gutters": "/es/canaletas-cobre-tampa",
  "/drainage-assessment": "/es/evaluacion-drenaje-tampa",
  "/govee-lights": "/es/luces-govee-tampa",
  "/hoa-contracts": "/es/contratos-hoa-tampa",
  "/rental-property-maintenance": "/es/mantenimiento-propiedad-alquiler-tampa",
  "/sagiper": "/es/sagiper-soffit-pvc-tampa",
  "/siding": "/es/revestimiento-tampa",
  "/specialty-gutters": "/es/canaletas-especiales-tampa",
  // Key pages (12) — thin ES wrappers added 2026-06-15 (Spanish content already existed)
  "/service-plans": "/es/planes-de-servicio-tampa",
  "/about": "/es/nosotros",
  "/contact": "/es/contacto",
  "/faq": "/es/preguntas-frecuentes",
  "/projects": "/es/proyectos",
  "/financing": "/es/financiamiento",
  "/referral": "/es/referidos",
  "/resources": "/es/recursos",
  "/warranties": "/es/garantias",
  "/privacy-policy": "/es/politica-privacidad",
  "/terms-of-service": "/es/terminos-servicio",
  // Blog: exact index maps here; /blog/<slug> posts use the prefix rule in localizeHref (ES blog added 2026-06-19).
  "/blog": "/es/blog",
};

export const ES_TO_EN = Object.fromEntries(
  Object.entries(EN_TO_ES).map(([en, es]) => [es, en])
);

// EN routes with NO Spanish build yet. localizeHref keeps the visitor on the
// working English page rather than prefixing /es/ and 404ing. When an ES page
// ships, move the route into EN_TO_ES above and the links upgrade automatically.
const NO_ES_PREFIX = ["/estimator", "/image-license"];

// localizeHref(href, lang): the URL the given language should navigate to.
// - tel:/mailto:/http(s)/#anchor are returned unchanged.
// - in-page #hash is preserved on whatever path resolves.
// - lang "es": map exact pages, prefix /areas (combo degrades to the ES city
//   page since no ES combo route exists), keep no-ES routes on English.
// - lang "en": map any /es path back to its English counterpart.
export function localizeHref(href, lang) {
  if (!href || typeof href !== "string") return href;
  if (/^(tel:|mailto:|https?:|#)/.test(href)) return href;
  const hashIdx = href.indexOf("#");
  const rawPath = hashIdx === -1 ? href : href.slice(0, hashIdx);
  const suffix = hashIdx === -1 ? "" : href.slice(hashIdx);
  const p = rawPath === "" ? "/" : rawPath;

  if (lang === "es") {
    if (p === "/es" || p.startsWith("/es/")) return p + suffix;     // already Spanish
    if (EN_TO_ES[p]) return EN_TO_ES[p] + suffix;                   // mapped page
    if (p.startsWith("/blog/")) return "/es" + p + suffix;          // ES blog post (same slug)
    if (p.startsWith("/areas/")) {                                  // city or combo
      const parts = p.split("/").filter(Boolean);                  // ["areas", city, service?]
      return "/es/areas/" + parts[1] + suffix;                     // combo -> ES city page
    }
    if (NO_ES_PREFIX.some((pre) => p === pre || p.startsWith(pre + "/"))) return p + suffix;
    return p + suffix;                                              // unknown -> stay on EN (safe)
  }

  // lang === "en": map anything Spanish back to English
  if (ES_TO_EN[p]) return ES_TO_EN[p] + suffix;
  if (p === "/es") return "/" + suffix;
  if (p.startsWith("/es/")) return p.replace(/^\/es/, "") + suffix;
  return p + suffix;
}

// pairedUrl(currentPath, currentLang): the OTHER-language URL, for the toggle.
export function pairedUrl(currentPath, currentLang) {
  return localizeHref(currentPath, currentLang === "en" ? "es" : "en");
}
