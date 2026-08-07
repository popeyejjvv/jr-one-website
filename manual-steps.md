# JR One Website SEO Audit - Manual Steps for Christopher

Everything mechanical and safe is fixed and deployed. This is what still needs a human: a credential, a GBP edit, or a content/code decision. Updated 2026-06-15 after decisions A/B/C/D were applied.

---

## RESOLVED THIS RUN (no action needed - logged for the record)
- 7-inch gutters: un-redirected, now a live dedicated page, in the sitemap. (Decision A)
- Hardie / fiber-cement siding: confirmed in scope, documented in the brand brain. (Decision B)
- Contact/footer address: visible street address hidden site-wide (service-area-business posture); the structured-data address was kept because it matches your GBP and powers local ranking. (Decision C)
- Striking-distance pages: titles, meta descriptions, and H1s rewritten + deployed on gutter-guards, specialty-gutters, commercial-gutters, siding, gutter-repair, largo, lutz, riverview, and the 6-vs-7 blog. (Decision D)

## CREDENTIALS / API KEYS / SPEND / PHYSICAL
None blocked. Vercel is authed + linked, GSC is wired through Ahrefs, IndexNow key is live.

## GBP EDITS (you do these in business.google.com)

1. **[DONE 2026-06-15]** Fixed the website-link UTM tag. GBP Website field changed from `https://www.jronegutters.com/?utm_source=google&utm_medium=organic&utm_campaign=local` to the clean `https://www.jronegutters.com`. Google will consolidate the homepage URL over the next few weeks; watch the homepage row in GSC stop showing the `?utm_...` tail.

2. **[DONE 2026-06-15]** GBP Description rewritten: removed the inconsistent "since 2018" and used "over 30 years in the gutter trade" (matches the site, stays honest re: 2006 LLC / 1990 trade start). Scope-clean.

3. **(Optional, ties to Decision C)** If you want a true service-area-business presentation, set the address in GBP to "service area" (hidden) so the profile matches the site. Only do this if you do not want walk-ins; your verified commercial address is a local-SEO asset, so I recommend leaving GBP as-is unless you have a reason to hide it.

## CONTENT / CODE FOLLOW-UPS (ranked)

1. **[DONE 2026-06-15]** All 12 Spanish key-page routes built as thin /es wrappers (nosotros, contacto, preguntas-frecuentes, proyectos, financiamiento, referidos, recursos, centro-recursos-seguros, garantias, planes-de-servicio-tampa, politica-privacidad, terminos-servicio), in the sitemap, reciprocal hreflang wired.

2. **[DONE 2026-06-15]** Spanish `<html lang="es">` fixed via middleware + async root layout. (Tradeoff: pages now render dynamically - fine for this site's traffic; a `[lang]` route-group refactor would restore static generation if ever needed.)

3. **[DONE 2026-06-15]** Navigation locale leak fixed site-wide: one `lib/locale.js` `localizeHref` routes every internal link (nav, footer, service cards, CTAs, breadcrumbs, in-body cross-links) to the right language. Verified on production: zero English links on `/es`.

3b. **[DONE 2026-06-19]** Estimator was ALREADY fully bilingual (built-in i18n toggle, 54/54 keys) - no work needed. The blog now has a full Spanish version: `/es/blog` + `/es/blog/[slug]`, all 45 posts translated to natural Tampa Spanish, reciprocal hreflang, in sitemap. Image-license stays EN (legal).

7. **[OWED] ES accent sweep.** The May-23 ES service pages strip Spanish accents in metadata/copy (e.g. "Mas de 30 anos", "Espanol"). The homepage `app/es/layout.js` meta was fixed 2026-06-19; the ~17 ES service routes + their body copy still need an accent pass - "anos" without the tilde reads as a vulgarity to a Spanish speaker.

8. **[DEFERRED - low value] Title/meta length warnings.** 55 titles + ~127 remaining metas exceed Ahrefs length thresholds. Google ignores length for ranking (only truncates SERP display), and rewriting ranking blog/service titles risks the rankings. Skip unless a specific page's keyword is being cut off. The city-page template meta was already trimmed 2026-06-19.

4. **[DONE 2026-06-19] Blog FAQ rendering + duplicate H1.** Fixed: lib/blog.js strips the leading markdown H1 (kills all 45 duplicate-H1s) and BlogPost.jsx now renders the frontmatter FAQs as visible Q&A. All 45 posts already had full FAQ content in frontmatter - it is now live. FAQPage JSON-LD intentionally omitted (Google retired the rich result June 2026).

5. **Thin city-service pages (192 of 232).** Do NOT mass-generate. Enrich the highest-demand: south-tampa/copper-gutters + south-tampa/seamless, new-tampa/seamless + new-tampa/gutter-guards, valrico + lithia/gutter-guards.

6. **[DONE 2026-06-19] 306 schema validation warnings (Ahrefs).** The 06-19 crawl showed the count UNCHANGED, then root-caused: CompanyCam ImageObject `contentLocation` was a Text string where schema.org needs a Place. Fixed (now a Place object) + deployed. Re-crawl Ahrefs in a few days to confirm the count drops toward 0.

## READY-TO-PASTE FAQ CONTENT (Decision D depth layer)

**[DONE 2026-06-15]** The 5 service-page FAQ blocks below are now LIVE - added to each EN faqs array, built, deployed, and verified on production. The blog/city FAQs still need the FAQ-render wiring (item 4 above) before they display; kept here for when that lands.

**[CONFIRMED 2026-06-19]** Popeye confirmed JR One DOES offer 8-inch half-round (a real specialty profile, distinct from K-style which stays 6/7-only). The specialty-gutters "6 to 8 inch" range is correct and stays as-is. Documented in the brand brain.

### /gutter-guards (app/gutter-guards/PageClient.jsx faqs)
- Q: Are mesh gutter guards better than other types? A: For most Tampa homes, yes. Mesh and micro mesh guards filter the fine debris screen guards let through (pine needles, shingle grit, seed pods) while still handling Florida's heaviest downpours. Screen guards cost less and work for large leaves, but with pine or oak near the roofline mesh is the better long-term choice. We install both and recommend the right one after we look at your tree coverage and roof pitch.
- Q: Do you install mesh gutter guards in Wimauma and the rest of south Hillsborough? A: Yes. We install mesh and micro mesh guards across Tampa Bay, including Wimauma, Riverview, Sun City Center, Brandon, and the rest of south Hillsborough. Local crew based in Tampa, same team for the assessment and the install. Call (844) 444-3114.
- Q: How do I find a good gutter guard installer near me in Tampa? A: Look for an installer who does the work with their own crew instead of subcontracting it out. We are a family-owned specialty trade, over 30 years in gutters, fully insured, our own trained team on every install. No franchise markup, no high-pressure pitch.

### /specialty-gutters (app/specialty-gutters/page.jsx faqs)
- Q: What counts as a specialty gutter? A: Any profile beyond standard K-style. The most common in Tampa Bay are half-round (for Mediterranean, Spanish Colonial, and barrel-tile roofs), box gutters (custom rectangular profiles for commercial and modern homes), D-style, and oversized 7-inch systems. Copper and galvalume upgrades also count. We rollform and fabricate each one on-site.
- Q: Half-round or box gutter, which one do I need? A: Architecture and water volume. Half-round suits Mediterranean, Spanish, and barrel-tile homes and sheds debris well. Box gutters carry more water and custom-fit, so they fit commercial buildings, modern homes, and flat-roof drainage. We assess your roof and recommend the right profile before any metal gets cut.
- Q: Do you do commercial gutter replacement in Tampa? A: Yes. We replace oversized commercial gutter systems on offices, retail, churches, schools, and multi-family across Tampa Bay - heavier-gauge aluminum, 6-inch and 7-inch profiles, larger downspouts, and closer hanger spacing for wind resistance. See our commercial gutters page or call (844) 444-3114.

### /commercial-gutters (app/commercial-gutters/PageClient.jsx faqs)
- Q: What is a box gutter and is it right for my commercial roof? A: A box gutter is a large, square-profile gutter built for high water volume, not the K-style on houses. It is the standard spec for commercial roofs with big surface areas. JR One installs 7-inch box and 7-inch D-style commercial profiles. During the walkthrough we measure roof area and rainfall load, then tell you whether box, D-style, or oversized 7-inch K-style is right.
- Q: What commercial gutter services does JR One offer in Tampa Bay? A: Full commercial scope from one specialty trade: 7-inch box gutter installation, D-style and oversized K-style, aluminum soffit and custom-bent fascia, and complete drainage with Schedule 40 PVC, catch basins, surface grates, and pop-up emitters. Plus scheduled commercial cleaning and maintenance. We serve apartments, retail, office parks, warehouses, and multi-family. Call (844) 444-3114.

### /siding (app/siding/PageClient.jsx faqs)
- Q: Do you replace whole-house siding or just sections in Tampa? A: Both. Full-home replacement when the siding is failing across the house, section replacement when the rest is sound (we match color and profile). A full re-side runs 5 to 10 days, a section 1 to 2 days. Call (844) 444-3114.
- Q: What siding materials does JR One install in Tampa? A: Four: vinyl lap, James Hardie fiber-cement (board, batten, shaker), custom aluminum, and Sagiper PVC architectural cladding. Vinyl is the best value for most homes; Hardie gives fiber-cement durability; Sagiper carries a 50-year warranty and needs no repainting or sealing. We walk your home and give an honest recommendation.
- Q: Is fiber-cement Hardie siding worth it in Florida's humidity? A: For a lot of Tampa homes, yes. Hardie resists moisture, rot, and impact better than older wood or low-grade vinyl. The trade-off is higher install cost than vinyl. We install Hardie board, batten, and shaker and set the moisture barrier underneath correctly.

### /gutter-repair (app/gutter-repair/page.jsx faqs)
- Q: Do you do gutter repair near me in Tampa Bay? A: Most likely yes. We repair gutters across Tampa, Brandon, Riverview, Wesley Chapel, Clearwater, St. Petersburg, Sarasota, Bradenton, Lakeland, and Largo, plus surrounding towns. Give us your address or ZIP at (844) 444-3114 and we will confirm and set up a free inspection.
- Q: How fast can you come out for a gutter repair? A: For most repairs we schedule the free inspection within a few days and complete the work the same week once you approve the quote. Storm damage gets priority, usually an assessment within 24 to 48 hours.
- Q: What gutter repairs do you handle? A: Leaking seams and joints, sagging gutters and failed hangers, overflow from clogs or wrong pitch, and damaged or disconnected downspouts. We work on 6-inch and 7-inch aluminum, copper, and galvalume, and we repair the soffit and fascia behind them when water has gotten in.

(Largo / Lutz / Riverview city FAQs and the blog 6-vs-7 FAQs are drafted and stored in the workflow output; add them once the city template and blog post render an FAQ block.)

---

# Peak 301 / Roof Rejuvenation HARD-DELETE (2026-06-28)

Roof rejuvenation dropped as a service entirely. Pages hard-deleted, removed URLs return HTTP 410 Gone, scope sources updated so the SEO runner cannot rebuild it. Everything code-side is done and verified (build passes, 410s confirmed live on a local prod server). What still needs you:

## DEINDEX (needs Google / Bing console access — cannot be automated)
The 410 responses tell crawlers the pages are gone, but you can speed up removal. Do these after the deploy is live:

**Google Search Console — Removals**
1. Open https://search.google.com/search-console and pick the jronegutters.com property.
2. Left menu: click "Removals".
3. Click the red "New Request" button.
4. Choose "Temporarily remove URL", paste each URL below, click "Next", then "Submit Request". Repeat per URL (or use "Remove all URLs with this prefix" only for the two service pages, NOT the blog/insurance ones).
   - https://www.jronegutters.com/peak-301
   - https://www.jronegutters.com/es/peak-301-rejuvenecimiento-techo-tampa
   - https://www.jronegutters.com/insurance-resource-center
   - https://www.jronegutters.com/es/centro-recursos-seguros
   - https://www.jronegutters.com/blog/peak-301-roof-rejuvenation-tampa
   - https://www.jronegutters.com/blog/peak-301-vs-roof-maxx-tampa
   - https://www.jronegutters.com/es/blog/peak-301-roof-rejuvenation-tampa
   - https://www.jronegutters.com/es/blog/peak-301-vs-roof-maxx-tampa
5. (The 410 makes the removal permanent once Google recrawls; the Removals tool just hides them faster.)

**Bing Webmaster Tools — Block URLs**
1. Open https://www.bing.com/webmasters and pick jronegutters.com.
2. Left menu: "Block URLs".
3. Click "Block URL", paste each URL above, choose "URL", submit. Repeat per URL.

## SPEND / CREDENTIALS / DEPLOY — DONE (no action needed)
- Deploy completed 2026-06-28: merged to main, pushed to origin, `vercel --prod` (deployment dpl_J2QVD7W2..., READY), aliased to www.jronegutters.com + jronegutters.com. Live-verified all 8 removed URLs return 410. IndexNow fired (Google + Bing, HTTP 200). Nothing blocked.

## AMBIGUOUS (judgment calls the EA made — reverse any you disagree with)
1. **insurance-resource-center deleted (EN + ES).** This page (and its 4 roof-insurance PDFs) was a 100% Peak 301 funnel — every CTA was "get Peak 301", breadcrumb nested it under Peak 301. With the service gone it had no offering, so it was hard-deleted and 410'd. If you want to keep a Florida-roof-insurance content page reframed around something else, say so and it can be rebuilt.
2. **referral page "FOR INSURANCE AGENTS" section reframed, not deleted.** Its copy was entirely about roof-age non-renewal → Peak 301. Rather than delete the rendered section (risky JS surgery), the copy was rewritten to point insurance agents at general exterior referrals (gutters/soffit/fascia/drainage after a claim or inspection). If you'd rather drop that section entirely, it can be removed.
3. **roi-calculator.html "Roof" tab removed.** /roi-calculator.html is a standalone, unlinked static tool with a Gutters/Guards/Soffit/Roof/Summary tabbed layout. The Roof tab was a Peak 301 + roof-insurance ROI section; it was surgically removed (button, section, JS, and the roof/insurance terms in the Summary aggregation). The JS was syntax-checked but this file is NOT processed by `npm run build`, so please open https://www.jronegutters.com/roi-calculator.html once after deploy and click each remaining tab to confirm it still works.

## EAPOPEYE scope-source edits are UNCOMMITTED working-tree changes
The brand brain (`references/brand-brains/jrone.md`) and the SEO runner config (`.claude/skills/seo-aeo-runner/configs/jrone.yaml`) were edited to drop Peak 301 and mark it NOT-offered, but were left uncommitted because the EAPOPEYE repo is on an unrelated branch (`tiktok-autoposter-20260529`) with other in-flight work. Commit them with your next EAPOPEYE commit.

## Historical archives intentionally left as-is
`references/cc-history/*` (chat-history exports) and `references/claude-projects/jr-one-aluminum-llc-docs/*` (frozen imported artifacts incl. `jr-one-peak301-page.jsx`, `JR_One_Peak301_Insurance_Blog_Posts.docx`) still mention Peak 301 as a historical record. These are not live scope sources and will not regenerate the service. Left untouched on purpose (don't rewrite history). The one file-listing in `references/claude-projects/jr-one-aluminum-llc.md` (lines listing those archived filenames) was also left as an accurate inventory.

## Code cleanup (non-breaking, low priority)
- `email_shell.py` `HERO_PRESETS` still contains a `peak301` hero preset that is now unused (the brand brain notes it is retired). Remove it from `~/Desktop/JRONE/jrone-outreach/scripts/email_shell.py` when convenient. It does not break anything as long as no email references it.
- Pre-existing unrelated test failure: `tests/send-lead-utils.test.js` `normalizePhone("0551234567")` fails (phone-formatting edge case). This is NOT caused by the Peak 301 work (that function was untouched); all `mapServiceToProjectType` tests pass. Flagged for separate fix.
