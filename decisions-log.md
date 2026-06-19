# JR One Website SEO Audit - Decisions Log

Autonomous SEO audit + fix pass. Format: [date] PHASE | change | why | files | VERIFIED/INFERRED

## 2026-06-15 audit run

[2026-06-15] PHASE 0 | Ran exhaustive read-only audit (10 auditors + best-practice docs + live GSC/Ahrefs) | ground every fix in current 2026 Google rules + real search data | n/a | VERIFIED
[2026-06-15] PHASE 0 | Best-practice baseline locked: FAQPage rich result REMOVED by Google June 2026; self-serving review markup ineligible; changefreq/priority ignored; no fixed title/desc char limit (uniqueness matters); INP replaced FID; HowTo dead | grade fixes against today's rules, not 2023 | n/a | VERIFIED

### Scope corrections (brand-brain hard-exclusion violations)
[2026-06-15] PHASE 3 | Removed "dry wells" from drainage OG description | dry wells are a hard scope exclusion; only field on page that leaked it | app/drainage-assessment/layout.js | VERIFIED
[2026-06-15] PHASE 3 | Removed "corrugated pipe" + "trenching" claims, replaced with approved 4-item drainage scope | corrugated pipe is a hard exclusion; matched canonical drainage-assessment language | app/commercial-gutters/PageClient.jsx (2 spots) | VERIFIED
[2026-06-15] PHASE 3 | Fixed llms.txt index line claiming the drainage doc covers "dry wells" | AEO surface (AI engines fetch llms.txt first) wrongly implied an excluded service | public/llms.txt | VERIFIED
[2026-06-15] PHASE 3 | Added "JR One installs 6 and 7 inch only" disclaimer to New Tampa 5-inch line | brand brain requires the disclaimer next to any 5-inch mention; only city missing it | app/areas/[slug]/[service]/page.jsx | VERIFIED

### Structured data
[2026-06-15] PHASE 3 | Added 8 missing cities to LocalBusiness areaServed (South Tampa + 7 mission cities) | schema served 21 cities while sitemap serves 28+; under-declared service area | app/layout.js | VERIFIED
[2026-06-15] PHASE 1 | Merged duplicate ES business entity into canonical #business (@id) and dropped conflicting hours (Mon-Fri 7-19), geo, and areaServed | ES pages emitted a second LocalBusiness with WRONG hours contradicting #business + contact page | app/es/layout.js | VERIFIED
[2026-06-15] PHASE 1 | Removed single-item ES breadcrumb (Inicio only) | a 1-node BreadcrumbList conveys no hierarchy and can be flagged low-value | app/es/layout.js | VERIFIED
[2026-06-15] PHASE 1 | Removed deprecated HowTo JSON-LD from 3 service layouts | Google retired HowTo rich results (2023); dead parse weight | app/gutter-cleaning/layout.js, app/soffit-and-fascia/layout.js, app/gutter-repair/layout.js | VERIFIED
[2026-06-15] PHASE 1 | Corrected misleading "SearchAction/sitelinks searchbox" code comments on WebSite schema | feature retired by Google late 2024; object never had a SearchAction | app/layout.js | VERIFIED

### Technical
[2026-06-15] PHASE 1 | Fixed undefined C.navyFade (palette had no such key) -> defined navy gradient | value-props section rendered transparent on all 232 city-service pages | app/areas/[slug]/[service]/page.jsx | VERIFIED
[2026-06-15] PHASE 1 | Added dynamicParams=false to /areas/[slug] | route was a soft-404 generator (any slug returned HTTP 200 city page); generateStaticParams enumerates all 29 valid slugs so safe | app/areas/[slug]/page.jsx | VERIFIED
[2026-06-15] PHASE 1 | Created self-canonical layout.js for privacy-policy + terms-of-service | both were "use client" with no metadata, inheriting the homepage canonical (broken-canonical bug) | app/privacy-policy/layout.js, app/terms-of-service/layout.js | VERIFIED
[2026-06-15] PHASE 1 | Replaced rendered middle-dot in OG image with pipe | banned punctuation rendered into the social share image | app/_opengraph-image.jsx.jsx | VERIFIED
[2026-06-15] PHASE 1 | Deleted 0-byte public/images/service-plans-hero.webp | orphan zero-byte asset (live hero is -v2; zero references) | public/images/service-plans-hero.webp | VERIFIED

### Coverage / sitemap
[2026-06-15] PHASE 5 | Surfaced south-tampa: added to sitemap CITY_SLUGS, EN + ES /areas index, schema areaServed | page set was live + already ranking (e.g. pos 18 for "soffit and fascia tampa") but orphaned from sitemap and internal links | app/sitemap.js, app/areas/page.jsx, app/es/areas/page.jsx, app/layout.js | VERIFIED
[2026-06-15] PHASE 4 | Added /es/areas to sitemap | ES service-area index existed + indexable but missing from sitemap (EN /areas was present) | app/sitemap.js | VERIFIED
[2026-06-15] PHASE 1 | Added /privacy-policy + /terms-of-service to sitemap | indexable legal pages absent from sitemap (after canonical fix landed) | app/sitemap.js | VERIFIED

### On-page metadata
[2026-06-15] PHASE 2 | De-duplicated brand + tightened 11 over-length titles | titles repeated "JR One Aluminum" twice (base + template suffix) and truncated in SERP; Ahrefs flagged 64 "title too long" | about, contact, projects, referral, warranties, resources, financing, service-plans, insurance-resource-center, image-license, estimator | VERIFIED
[2026-06-15] PHASE 2 | Trimmed 196-char resources meta description | tail truncated in SERP | app/resources/layout.js | VERIFIED

### Punctuation (ASCII-only rule)
[2026-06-15] PHASE 2 | ASCII sweep removed 1,651 banned chars (em-dash/en-dash/middle-dot/curly) -> 0 across 57 customer-facing files | brand brain bans non-keyboard punctuation on all customer surfaces; llms.txt/llms-full.txt/53 llms MDs are AEO-cited, roi-calculator + estimator are live tools, manifest is PWA install text | public/llms.txt, public/llms-full.txt, public/llms/*.md, public/roi-calculator.html, public/estimator.html, public/manifest.json | VERIFIED

### Verify / deploy
[2026-06-15] PHASE 7 | npm run build PASSED clean (exit 0); verified built output: corrugated pipe=0, dry wells=0, drainage OG fixed, privacy self-canonical present, navyFade gradient rendering, south-tampa generating | gate before commit/deploy | n/a | VERIFIED
[2026-06-15] PHASE 7 | Deployed to production (vercel --prod) + aliased www.jronegutters.com (push alone does not flip the alias for this project); IndexNow ping accepted 27 URLs | publish + index | n/a | VERIFIED

### Round 2 - operator decisions A/B/C/D applied (2026-06-15)
[2026-06-15] DEC-A | Un-redirected /7-inch-gutters into a live dedicated page + added to sitemap + fixed the OG-image 5-inch alt framing | "7 inch gutters tampa" has its own demand (ranked pos 13 while redirected); the page was already written | next.config.js, app/sitemap.js, app/7-inch-gutters/layout.js | VERIFIED
[2026-06-15] DEC-B | Documented siding scope (aluminum / vinyl / Hardie fiber-cement / Sagiper PVC) in the brand brain | Popeye confirmed Hardie IS in scope; the brand brain had no siding scope line, which caused the audit flag | EAPOPEYE references/brand-brains/jrone.md | VERIFIED
[2026-06-15] DEC-C | Hid the visible street address in the footer (SAB posture) but KEPT the structured-data PostalAddress | Popeye chose SAB; schema address retained because it matches GBP and powers the local pack - removing it would weaken ranking | components/SiteFooter.jsx | VERIFIED
[2026-06-15] DEC-D | Striking-distance optimization: rewrote title + meta + H1 on gutter-guards, specialty-gutters, commercial-gutters, siding, gutter-repair; added per-slug title/desc overrides + keyword-led H1 on largo, lutz, riverview; shortened blog 6-vs-7 title + meta | GSC: these pages rank pos 8-30 with impressions but 0 clicks; lead each with its top query | 10 files | VERIFIED
[2026-06-15] PHASE 3 | Fixed the Spanish drainage scope violation (tuberia corrugada + excavacion) on the commercial page that the English-only fix missed | scope integrity in both languages | app/commercial-gutters/PageClient.jsx | VERIFIED
[2026-06-15] PHASE 2 | ASCII sweep of content/*.md (45 blog files, 484 banned chars -> 0) | blog renders customer-facing and was missed in the public-only first sweep | content/blog/*.md | VERIFIED
[2026-06-15] PHASE 7 | npm run build PASSED clean round 2 (396 static pages incl live /7-inch-gutters + south-tampa) | gate before round-2 deploy | n/a | VERIFIED

### Round 3 - FAQ depth (2026-06-15)
[2026-06-15] DEC-D (cont.) | Added FAQ depth to 5 striking-distance service pages (gutter-guards +3, specialty-gutters +3, commercial-gutters +2, siding +3, gutter-repair +3 Q&A) via a parallel format workflow, then applied + built + deployed + verified live | compounds the title/H1 work with AEO + featured-snippet surface for the long-tail questions behind the impressions | app/gutter-guards/PageClient.jsx, app/specialty-gutters/page.jsx, app/commercial-gutters/PageClient.jsx, app/siding/PageClient.jsx, app/gutter-repair/page.jsx | VERIFIED
[2026-06-15] OPS | GBP cleaned: website link de-tagged to clean URL + description "since 2018" replaced with "over 30 years in the gutter trade" (operator did the GBP edits, guided) | NAP/canonical consistency + trust accuracy | Google Business Profile | VERIFIED

### Round 4 - leak-free Spanish locale (2026-06-15)
[2026-06-15] i18n | Root cause: ES routes re-export the EN component tree, so every hardcoded EN href bounced Spanish visitors back to English on every /es page (systemic, not just nav) | full link audit (4 agents) | n/a | VERIFIED
[2026-06-15] i18n | Built lib/locale.js: one EN<->ES map + pure localizeHref(href, lang) + pairedUrl. Routed EVERY internal link through it - SiteNav, SiteFooter, ui/Button, ui/ServiceCard, CTABand (via Button), Peak301Alert, CityLandingPage, ServiceAreaList, and 6 page breadcrumb/cross-links. Primitives self-localize via context so the re-exported ES pages localize automatically. Combo links degrade to the ES city page; untranslated routes stay on a working EN page | one logic everywhere, no per-component drift | lib/locale.js + ~12 components | VERIFIED (prod: 0 EN service links on /es, ES links present, in-body cross-links ES, EN unaffected)
[2026-06-15] i18n | middleware.js + async root layout emit <html lang=es> for /es/* (SSR-correct for hreflang + screen readers). Tradeoff: reading headers() opts pages into dynamic rendering - acceptable for this low-traffic local site; a [lang] route-group refactor would restore static generation if perf ever needs it | a11y + bilingual SEO | middleware.js, app/layout.js | VERIFIED (prod: /es + /es/areas/* lang=es, / lang=en)
[2026-06-15] i18n | Built 12 thin /es wrapper routes (Spanish content already existed in T.es blocks): nosotros, contacto, preguntas-frecuentes, proyectos, financiamiento, referidos, recursos, centro-recursos-seguros, garantias, planes-de-servicio-tampa, politica-privacidad, terminos-servicio. Reciprocal hreflang on the 12 EN counterparts. Added all 12 to sitemap (455 URLs) + IndexNow | strand: translated content had no /es URL | app/es/* (24 files), 12 EN layouts, app/sitemap.js | VERIFIED (12 routes 200, in sitemap, indexnow 200)

## 2026-06-19 audit run (Round 5 - schema fix + blog FAQs + ES blog)

### Deploy 1 - safe technical batch (commit 884717f, deployed h49wo1uxn, live + verified)
[2026-06-19] PHASE 0 | Fresh Ahrefs auto-crawl (08:48 UTC) showed the 306 "schema.org validation error" count UNCHANGED (the Round-1 HowTo/ES-entity work never touched it) | re-crawl-confirm before re-fixing | n/a | VERIFIED
[2026-06-19] SCHEMA | Root cause of the 306: CompanyCam ImageObject blocks emitted contentLocation as a Text string ("City, FL") where schema.org requires a Place. Google ignored it (rich-results errors=0) but the Ahrefs strict validator flagged all ~306 pages (the one block shared by homepage + service + city + city-service). Fixed: contentLocation is now a Place object (name + PostalAddress) | components/CityPortfolio.jsx, components/ServicePortfolio.jsx | VERIFIED (prod: contentLocation @type Place)
[2026-06-19] SCHEMA | Removed bare Offer priceCurrency (no price) on 5 templates (strict validators flag priceCurrency-without-price) | app/areas/[slug]/page.jsx, app/areas/[slug]/[service]/page.jsx, app/7-inch-gutters/layout.js, app/rental-property-maintenance/layout.js, app/storm-damage-gutters-tampa/layout.js | VERIFIED
[2026-06-19] CONTENT | Blog render fix: strip leading markdown H1 in lib/blog.js (kills 45 duplicate-H1 pages) + render frontmatter faqs as visible Q&A in BlogPost.jsx (unlocked the already-drafted FAQ content on all 45 posts; FAQPage JSON-LD intentionally omitted per Google June-2026 retirement) | lib/blog.js, app/blog/[slug]/BlogPost.jsx | VERIFIED (prod: blog H1 count 1, FAQ Q&A render)
[2026-06-19] LINKS | Orphan fixes: footer links for /image-license + /7-inch-gutters (the latter fixes the /es/canaletas-7-pulgadas-tampa orphan via localizeHref). Canonical fix: estimator.html canonical + og:url -> /estimator.html (the 200 URL; /estimator 307-redirects to it) | components/SiteFooter.jsx, public/estimator.html | VERIFIED (prod)
[2026-06-19] META | Trimmed the city-page template default meta from ~192 to ~132 chars (protects keyword head + click-to-call phone tail), fixing ~19 of the 146 over-long metas. DEFERRED as low-value/ranking-risk: per-page service-layout metas + individual ranking blog titles (Google ignores length, only truncates display) | app/areas/[slug]/page.jsx | VERIFIED
[2026-06-19] OPS | IndexNow pinged 47 URLs (45 blog + homepage + estimator); build clean (409 static pages); deployed prod + aliased www + apex | n/a | VERIFIED

### Deploy 2 - Spanish blog + estimator finding
[2026-06-19] i18n | Estimator (/estimator.html) confirmed ALREADY fully bilingual: 54 EN i18n keys = 54 ES keys, real Spanish values, built-in lang toggle. No translation work needed (Popeye's "translate estimator" greenlight was already satisfied) | public/estimator.html | VERIFIED
[2026-06-19] i18n | Built ES blog architecture: lib/blog.js lang param (strict per-language read, no EN-under-ES leakage) + content/blog-es/ + /es/blog index + /es/blog/[slug] route (dynamicParams=false, ES-only slugs) + localizeHref /blog mapping + lang-aware links in BlogIndex/BlogPost + reciprocal hreflang on EN blog routes + ES sitemap entries | lib/blog.js, app/es/blog/*, lib/locale.js, app/blog/*, app/sitemap.js | VERIFIED (arch build clean)
[2026-06-19] i18n | Translated all 45 EN blog posts to natural Tampa-market Spanish. NEEDED 2 workflow passes: pass 1 (45 agents) translated well but stripped accents/ñ on 44/45 (a strong subagent default despite an explicit accent rule); pass 2 (45 agents) restored diacritics only. Verified ñ + accents across all 45 | content/blog-es/*.md, commit a2b379b | VERIFIED (deployed petfw5tkr; prod: /es/blog 200, lang=es, accents render, FAQ Q&A render, 0 /blog link leaks, reciprocal hreflang both directions + self-canonical)
[2026-06-19] FIX | Corrected real Spanish accent errors on the ES homepage metadata (the May-23 ES batch strips accents site-wide): "Espanol"->"Español", "Mas de 30 anos"->"Más de 30 años" (anos without the tilde reads as a vulgarity). Broader accent sweep of the ~17 May-23 ES service pages still OWED | app/es/layout.js | VERIFIED (deployed petfw5tkr; prod /es meta now shows años)
[2026-06-19] SCOPE | 8-inch HALF-ROUND confirmed by Popeye as a real specialty offering (distinct from K-style, which stays 6/7-only). Documented in brand brain; specialty-gutters "6 to 8 inch" left as-is | EAPOPEYE references/brand-brains/jrone.md | VERIFIED

### Projects page - real CompanyCam count + collaboration-photo filter (commit 9d7e9ac, deployed ih3zalg3s)
[2026-06-19] DATA | Read live CompanyCam (company 834482): 2,768 total JR One projects, 2,122 documented WITH photos (646 no-photo entries excluded as not "completed"). Replaced the projects-page "Projects completed" stat (was gallery-photo-derived, falling back to "300+") with a stable "2,100+" floor of the real documented count | app/projects/page.jsx | VERIFIED (prod shows 2,100+, no 300+)
[2026-06-19] DATA | Collaboration-photo gate: the shared photo-filter now drops any photo whose company_id is not JR One's 834482. Removed 17 gallery photos from collaborator company 1339492 (creators Tony Salaiz / Kenneth Walker, one shared project) that were rendering as JR One work. Applies site-wide via the shared filter + the live /api/companycam feed that the city/service portfolios also consume | lib/companycam/photo-filter.js, app/api/companycam/route.js | VERIFIED (prod gallery: 125 photos, 100% company 834482, 0 collaboration)
