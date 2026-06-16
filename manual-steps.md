# JR One Website SEO Audit - Manual Steps for Christopher

Items the autonomous run could NOT complete alone (need a decision, credentials, or content judgment). Everything mechanical and safe was already fixed and deployed. This is the action list.

---

## CREDENTIALS
None blocked. Vercel CLI is authed and linked (project jrone-gutters-website). Google Search Console is wired and returning data through Ahrefs project 9674315.

## API KEYS
None blocked. IndexNow key file is present (public/10705cc24faf98deedd312e024e43e53.txt) and was pinged after deploy.

## SPEND
None. No paid step was required.

## PHYSICAL
None.

---

## SCOPE TO CONFIRM (one decision each)

1. **Hardie / fiber-cement siding** - The siding page schema + commercial page claim "Hardie board lap, Hardie batten and shaker" siding and "Hardie board soffit." The brand brain lists siding scope as aluminum / vinyl / Sagiper PVC cladding ONLY (fiber-cement is not in it). Files: app/siding/layout.js (lines 21-22), app/commercial-gutters/PageClient.jsx (line 60).
   - If JR One does NOT install Hardie: tell me and I will strip the Hardie references.
   - If JR One DOES install Hardie: I will add it to the brand brain so it stops flagging.

2. **7-inch gutters page** - A complete, brand-compliant /7-inch-gutters page exists but next.config.js hard-redirects it (301) to /seamless-aluminum-gutters, so it is unreachable. Meanwhile "7 inch gutters tampa" already ranks pos 13 on a blog post. See the A/B/C in the final report. Recommended: un-redirect and let the dedicated page rank.

3. **South Tampa as a marketed city** - I surfaced south-tampa (it was live + already ranking but hidden from the sitemap and internal links). If South Tampa should NOT be a standalone service area, tell me and I will pull it back out. Recommended: keep it (it is the highest-value affluent market and already earning impressions).

4. **Contact page street address** - The footer and schema show the full street address (3420 W Cherry St) site-wide, but the contact page itself only shows "Tampa, Florida." Decide: show the full address on the contact page too (consistent NAP, recommended), or hide it everywhere for a true service-area-business posture.

## GBP EDITS (you do these in the Google Business Profile dashboard)

1. **Fix the website link UTM tag.** Google is indexing your homepage as `https://www.jronegutters.com/?utm_source=google&utm_medium=organic&utm_campaign=local` instead of the clean URL, because your GBP website link points to the tagged version. This splits ranking signals.
   - Step 1: Go to business.google.com and sign in.
   - Step 2: Open the JR One Aluminum profile.
   - Step 3: Click "Edit profile" then the "Contact" tab.
   - Step 4: Find the Website field. If it ends in `/?utm_source=google...`, delete everything from the `?` onward so it reads exactly `https://www.jronegutters.com`.
   - Step 5: Save. This lets the clean URL consolidate as canonical over the next few weeks.

## BUILD LIST (ranked by real GSC impression data - highest ROI first)

The site went from 843 to 10,000+ monthly impressions but clicks stayed flat because pages rank in the "page 2-3 no-click" band (position 13-22). The single biggest lever now is LIFTING existing high-impression pages into the top 5, NOT adding new pages.

1. **Striking-distance optimization (do this first - it is where the revenue is).** These pages already get impressions and rank just below page 1. Each needs a title/H1/intro rewrite toward its top query + a localized FAQ block. I held off auto-rewriting these because they are already ranking and a bad title change could hurt - they need your eyes on the angle:
   - /areas/largo (pos 13.5, 800 impressions) - target "roof fascia repair largo fl", "gutters largo fl"
   - /gutter-guards (3,809 impressions, pos 30 - biggest untapped page) - target "mesh gutter guards tampa fl" (pos 12.9)
   - /specialty-gutters (pos 22, 303 impressions) - target "specialty gutters", "commercial gutter replacement tampa fl"
   - /commercial-gutters (pos 20, 386 impressions) - target "commercial gutter installation tampa fl"
   - /siding (pos 10 on "siding replacement") - tighten title to win the click
   - /areas/lutz (pos 18.7, 450 impr) and /areas/riverview (pos 19, 511 impr)
   - /blog/6-inch-vs-7-inch-gutters-tampa (pos 8-19 on the brand's core differentiator)
2. **Reassign "gutter repair near me"** (335 impressions, pos 21, the #1 non-branded query) - it currently lands on the weak /areas/tampa; point it at /gutter-repair via internal linking + title.
3. **Spanish pages for already-translated content.** about, contact, faq, projects, financing, referral, service-plans already have hand-written Spanish (T.es blocks) but no /es/ URL, so the Spanish is invisible to Google. Highest value: /es/sobre-nosotros, /es/contacto, /es/preguntas-frecuentes. I can build these as thin wrapper routes when you greenlight.
4. **Spanish html lang tag.** Every /es page is served with `<html lang="en">` because the root layout hardcodes it. Fixing this needs a locale-aware root layout (a small architecture change), so I left it out of the safe pass. Worth doing - it affects the whole Spanish locale's SEO + accessibility.
5. **Spanish navigation locale leak.** The main nav and homepage service cards link Spanish visitors to the English pages (the EN-to-ES map exists but is not used by the links). Fix: route nav/card hrefs through the EN_TO_ES map when language is Spanish. Contained change, improves the ES experience.
6. **7-inch ES hreflang** - /es/canaletas-7-pulgadas-tampa points its English alternate at the redirecting /7-inch-gutters. Fix this together with the 7-inch decision above.
7. **Thin city-service pages (192 of 232).** Do NOT mass-generate. Enrich the highest-demand ones: south-tampa/copper-gutters + south-tampa/seamless (affluent market), new-tampa/seamless + new-tampa/gutter-guards (big-roof 7-inch demand), valrico + lithia/gutter-guards (FishHawk oak debris).
8. **306 schema validation warnings** in the Ahrefs crawl - likely one template-level issue repeated across pages. The HowTo removal + ES entity merge done this pass should reduce the count; re-crawl in Ahrefs to see what remains, then I can fix the template.
