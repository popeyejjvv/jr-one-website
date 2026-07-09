import { getAllPostSlugs } from "@/lib/blog";
import fs from "fs";
import path from "path";

// Apex host per Tier 2.13 audit fix 2026-05-26. Reconciles with app/layout.js
// metadataBase + canonicals which use apex. Previously emitted www URLs which
// caused a www/apex split in declared hosts.
const BASE_URL = "https://www.jronegutters.com";

// AI-citation knowledge markdown files, auto-discovered from public/llms/
// so new MDs get crawled without a sitemap edit. These are the dense factual
// docs ChatGPT / Claude / Perplexity / Gemini fetch when citing JR One.
function getKnowledgeMdPaths() {
  try {
    const llmsDir = path.join(process.cwd(), "public", "llms");
    return fs.readdirSync(llmsDir)
      .filter((f) => f.endsWith(".md"))
      .map((f) => `/llms/${f}`);
  } catch {
    return [];
  }
}

const CITY_SLUGS = [
  "tampa","clearwater","st-petersburg","sarasota","bradenton",
  "lakeland","brandon","wesley-chapel","palm-harbor","riverview",
  "new-port-richey","largo","spring-hill","tarpon-springs",
  "land-o-lakes","dunedin","ruskin","sun-city-center",
  "temple-terrace","plant-city","lutz",
  // ── 7 mission cities added 2026-05-23 (Play 4) ──
  "new-tampa","valrico","lithia","oldsmar","safety-harbor",
  "seminole","pinellas-park",
  // south-tampa surfaced 2026-06-15 SEO audit (was orphaned: live + already ranking, missing from sitemap)
  "south-tampa",
];

const CITY_SERVICE_SLUGS = [
  "seamless-aluminum-gutters","gutter-guards","gutter-cleaning","gutter-repair",
  "soffit-and-fascia","siding","copper-gutters","drainage-assessment",
];

const STATIC_PAGES = [
  { path: "/", priority: 1.0, changeFrequency: "weekly" },
  { path: "/seamless-aluminum-gutters", priority: 0.9, changeFrequency: "monthly" },
  { path: "/7-inch-gutters", priority: 0.8, changeFrequency: "monthly" },
  { path: "/gutter-guards", priority: 0.9, changeFrequency: "monthly" },
  { path: "/soffit-and-fascia", priority: 0.9, changeFrequency: "monthly" },
  { path: "/siding", priority: 0.8, changeFrequency: "monthly" },
  { path: "/gutter-repair", priority: 0.9, changeFrequency: "monthly" },
  { path: "/peak-301", priority: 0.7, changeFrequency: "monthly" },
  { path: "/copper-gutters", priority: 0.7, changeFrequency: "monthly" },
  { path: "/about", priority: 0.6, changeFrequency: "monthly" },
  { path: "/contact", priority: 0.8, changeFrequency: "monthly" },
  { path: "/projects", priority: 0.7, changeFrequency: "weekly" },
  { path: "/warranties", priority: 0.5, changeFrequency: "yearly" },
  { path: "/image-license", priority: 0.3, changeFrequency: "yearly" },
  { path: "/privacy-policy", priority: 0.2, changeFrequency: "yearly" },
  { path: "/terms-of-service", priority: 0.2, changeFrequency: "yearly" },
  { path: "/areas", priority: 0.7, changeFrequency: "weekly" },
  { path: "/financing", priority: 0.7, changeFrequency: "monthly" },
  { path: "/service-plans", priority: 0.7, changeFrequency: "monthly" },
  { path: "/govee-lights", priority: 0.6, changeFrequency: "monthly" },
  { path: "/faq", priority: 0.7, changeFrequency: "monthly" },
  { path: "/blog", priority: 0.8, changeFrequency: "daily" },
  { path: "/insurance-resource-center", priority: 0.6, changeFrequency: "monthly" },
  { path: "/referral", priority: 0.6, changeFrequency: "monthly" },
  { path: "/resources", priority: 0.5, changeFrequency: "monthly" },
  { path: "/estimator", priority: 0.7, changeFrequency: "monthly" },
  { path: "/drainage-assessment", priority: 0.8, changeFrequency: "monthly" },
  { path: "/specialty-gutters", priority: 0.7, changeFrequency: "monthly" },
  { path: "/sagiper", priority: 0.7, changeFrequency: "monthly" },
  { path: "/hoa-contracts", priority: 0.8, changeFrequency: "monthly" },
  { path: "/rental-property-maintenance", priority: 0.8, changeFrequency: "monthly" },
  { path: "/commercial-gutters", priority: 0.8, changeFrequency: "monthly" },
  { path: "/gutter-cleaning", priority: 0.8, changeFrequency: "monthly" },
  // ── Hurricane-season landing added 2026-05-23 (Play 1) ──
  { path: "/storm-damage-gutters-tampa", priority: 0.9, changeFrequency: "monthly" },
];

// Spanish-locale routes (Play 5 + Play 1 + Play 4 + Spanish market expansion 2026-05-23).
// Each entry maps the EN path the Spanish page mirrors so hreflang pairing is implicit.
const ES_STATIC_PAGES = [
  // Spanish homepage
  { path: "/es", priority: 1.0, changeFrequency: "weekly" },
  // Spanish service-area index (was missing from sitemap; EN /areas was present) - 2026-06-15 audit
  { path: "/es/areas", priority: 0.7, changeFrequency: "weekly" },
  // Spanish blog index (ES blog added 2026-06-19)
  { path: "/es/blog", priority: 0.8, changeFrequency: "daily" },
  // Phase 1 service routes (May 23 mission)
  { path: "/es/canaletas-dano-tormenta-tampa", priority: 0.9, changeFrequency: "monthly" },
  { path: "/es/canaletas-sin-costura-tampa", priority: 0.9, changeFrequency: "monthly" },
  { path: "/es/limpieza-canaletas-tampa", priority: 0.8, changeFrequency: "monthly" },
  { path: "/es/sofito-fascia-tampa", priority: 0.9, changeFrequency: "monthly" },
  { path: "/es/protectores-canaletas-tampa", priority: 0.9, changeFrequency: "monthly" },
  { path: "/es/reparacion-canaletas-tampa", priority: 0.9, changeFrequency: "monthly" },
  { path: "/es/peak-301-rejuvenecimiento-techo-tampa", priority: 0.7, changeFrequency: "monthly" },
  // Spanish market expansion 2026-05-23: 10 new service routes
  { path: "/es/canaletas-7-pulgadas-tampa", priority: 0.8, changeFrequency: "monthly" },
  { path: "/es/canaletas-comerciales-tampa", priority: 0.8, changeFrequency: "monthly" },
  { path: "/es/canaletas-cobre-tampa", priority: 0.7, changeFrequency: "monthly" },
  { path: "/es/evaluacion-drenaje-tampa", priority: 0.8, changeFrequency: "monthly" },
  { path: "/es/luces-govee-tampa", priority: 0.6, changeFrequency: "monthly" },
  { path: "/es/contratos-hoa-tampa", priority: 0.8, changeFrequency: "monthly" },
  { path: "/es/mantenimiento-propiedad-alquiler-tampa", priority: 0.8, changeFrequency: "monthly" },
  { path: "/es/sagiper-soffit-pvc-tampa", priority: 0.7, changeFrequency: "monthly" },
  { path: "/es/revestimiento-tampa", priority: 0.8, changeFrequency: "monthly" },
  { path: "/es/canaletas-especiales-tampa", priority: 0.7, changeFrequency: "monthly" },
  // Key-page ES wrappers added 2026-06-15 (leak-free Spanish unlock; content already existed)
  { path: "/es/nosotros", priority: 0.6, changeFrequency: "monthly" },
  { path: "/es/contacto", priority: 0.8, changeFrequency: "monthly" },
  { path: "/es/preguntas-frecuentes", priority: 0.7, changeFrequency: "monthly" },
  { path: "/es/proyectos", priority: 0.7, changeFrequency: "weekly" },
  { path: "/es/financiamiento", priority: 0.7, changeFrequency: "monthly" },
  { path: "/es/referidos", priority: 0.6, changeFrequency: "monthly" },
  { path: "/es/recursos", priority: 0.5, changeFrequency: "monthly" },
  { path: "/es/centro-recursos-seguros", priority: 0.6, changeFrequency: "monthly" },
  { path: "/es/garantias", priority: 0.5, changeFrequency: "yearly" },
  { path: "/es/planes-de-servicio-tampa", priority: 0.7, changeFrequency: "monthly" },
  { path: "/es/politica-privacidad", priority: 0.2, changeFrequency: "yearly" },
  { path: "/es/terminos-servicio", priority: 0.2, changeFrequency: "yearly" },
];

export default function sitemap() {
  const staticEntries = STATIC_PAGES.map((page) => ({
    url: `${BASE_URL}${page.path}`,
    lastModified: new Date(),
    changeFrequency: page.changeFrequency,
    priority: page.priority,
  }));

  const cityEntries = CITY_SLUGS.map((slug) => ({
    url: `${BASE_URL}/areas/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const cityServiceEntries = CITY_SLUGS.flatMap((slug) =>
    CITY_SERVICE_SLUGS.map((service) => ({
      url: `${BASE_URL}/areas/${slug}/${service}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    }))
  );

  const blogSlugs = getAllPostSlugs();
  const blogEntries = blogSlugs.map((slug) => ({
    url: `${BASE_URL}/blog/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  // Knowledge markdown files for AI citation (ChatGPT/Claude/Perplexity/Gemini).
  // Listed at priority 0.5, lower than HTML pages because these are reference
  // material, not primary landing pages, but must be in sitemap for discovery.
  const knowledgeMdEntries = getKnowledgeMdPaths().map((p) => ({
    url: `${BASE_URL}${p}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.5,
  }));

  // Top-level llms index files for AI crawlers.
  const aiIndexEntries = [
    { url: `${BASE_URL}/llms.txt`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.6 },
    { url: `${BASE_URL}/llms-full.txt`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.6 },
  ];

  // Spanish-locale entries (added 2026-05-23 for Plays 1, 4, 5).
  const esStaticEntries = ES_STATIC_PAGES.map((page) => ({
    url: `${BASE_URL}${page.path}`,
    lastModified: new Date(),
    changeFrequency: page.changeFrequency,
    priority: page.priority,
  }));

  const esCityEntries = CITY_SLUGS.map((slug) => ({
    url: `${BASE_URL}/es/areas/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.75,
  }));

  // Spanish blog posts (only translated slugs are listed; ES blog added 2026-06-19)
  const esBlogEntries = getAllPostSlugs("es").map((slug) => ({
    url: `${BASE_URL}/es/blog/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [
    ...staticEntries,
    ...cityEntries,
    ...cityServiceEntries,
    ...blogEntries,
    ...knowledgeMdEntries,
    ...aiIndexEntries,
    ...esStaticEntries,
    ...esCityEntries,
    ...esBlogEntries,
  ];
}
