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
