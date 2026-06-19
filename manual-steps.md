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

3b. **Still EN-only (need real translation, not a wrapper):** `/estimator` and the blog (`/blog`, `/blog/[slug]`). `localizeHref` intentionally keeps Spanish visitors on the working English version of these until a Spanish version is written. Image-license stays EN (legal).

4. **Blog FAQ rendering + duplicate H1.** Blog posts render the post title AND the markdown "#" heading as two H1s, and the frontmatter FAQs are parsed but never rendered (the FAQPage block is a commented-out stub in page.jsx). A small BlogPost.jsx change fixes both and unlocks the FAQ content below.

5. **Thin city-service pages (192 of 232).** Do NOT mass-generate. Enrich the highest-demand: south-tampa/copper-gutters + south-tampa/seamless, new-tampa/seamless + new-tampa/gutter-guards, valrico + lithia/gutter-guards.

6. **306 schema validation warnings (Ahrefs).** Likely one template-level issue. The HowTo removal + ES entity merge this run should reduce the count; re-crawl in Ahrefs, then I can fix the template.

## READY-TO-PASTE FAQ CONTENT (Decision D depth layer)

**[DONE 2026-06-15]** The 5 service-page FAQ blocks below are now LIVE - added to each EN faqs array, built, deployed, and verified on production. The blog/city FAQs still need the FAQ-render wiring (item 4 above) before they display; kept here for when that lands.

**Minor scope-to-confirm:** specialty-gutters mentions 8-inch half-round ("6 to 8 inch"). The brand-brain "6 and 7 inch only" rule is about standard K-style; oversized half-round in 8-inch is plausibly a real specialty offering. Confirm whether JR One installs 8-inch half-round; if not, change the specialty page + serviceSchema.

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
- Q: What siding materials does JR One install in Tampa? A: Four: vinyl lap, James Hardie fiber-cement (board, batten, shaker), custom aluminum, and Sagiper PVC architectural cladding. Vinyl is the best value for most homes; Hardie gives fiber-cement durability; Sagiper carries a 50-year warranty and zero maintenance. We walk your home and give an honest recommendation.
- Q: Is fiber-cement Hardie siding worth it in Florida's humidity? A: For a lot of Tampa homes, yes. Hardie resists moisture, rot, and impact better than older wood or low-grade vinyl. The trade-off is higher install cost than vinyl. We install Hardie board, batten, and shaker and set the moisture barrier underneath correctly.

### /gutter-repair (app/gutter-repair/page.jsx faqs)
- Q: Do you do gutter repair near me in Tampa Bay? A: Most likely yes. We repair gutters across Tampa, Brandon, Riverview, Wesley Chapel, Clearwater, St. Petersburg, Sarasota, Bradenton, Lakeland, and Largo, plus surrounding towns. Give us your address or ZIP at (844) 444-3114 and we will confirm and set up a free inspection.
- Q: How fast can you come out for a gutter repair? A: For most repairs we schedule the free inspection within a few days and complete the work the same week once you approve the quote. Storm damage gets priority, usually an assessment within 24 to 48 hours.
- Q: What gutter repairs do you handle? A: Leaking seams and joints, sagging gutters and failed hangers, overflow from clogs or wrong pitch, and damaged or disconnected downspouts. We work on 6-inch and 7-inch aluminum, copper, and galvalume, and we repair the soffit and fascia behind them when water has gotten in.

(Largo / Lutz / Riverview city FAQs and the blog 6-vs-7 FAQs are drafted and stored in the workflow output; add them once the city template and blog post render an FAQ block.)
