# Brandon and Lutz buildout: measurement first, then the plan

Branch `feat/brandon-lutz-buildout`, cut from `main` at `10ad6d4`.
Written 2026-08-07. Bradenton was ruled out of scope (Manatee County, across the bay);
this is where that effort goes instead. Both cities here are Hillsborough.

Every figure below is labelled VERIFIED (I ran the query or read the file) or
INFERRED (my arithmetic on top of verified rows). Nothing is assumed.

---

## STEP 1 - what is actually there right now

### The premise needed adjusting

The ask was "build out Brandon and Lutz." Both city pages **already exist** and are
**not thin**. Measured against the page the rank-lift plan called thinnest:

| Page | Words (VERIFIED, live SSR incl. chrome) |
|---|---:|
| `/areas/bradenton` (the plan's "thinnest of the three") | 1,006 |
| `/areas/brandon` | 1,005 |
| `/areas/lutz` | 1,013 |

Method note: this count includes nav and footer chrome, so it is not comparable to the
rank-lift plan's 862-word prose-only figure for Bradenton. It **is** comparable
across the three rows above, which is what matters: the three city landing pages are
the same template at the same length. The city pages are not the defect.

**The thin pages are the CHILDREN.** Same measurement method:

| Page | Words (VERIFIED) | Enriched? |
|---|---:|---|
| `/areas/brandon/gutter-guards` | 1,405 | yes |
| `/areas/brandon/gutter-repair` | 1,404 | yes |
| `/areas/lutz/gutter-guards` | 635 | **no** |
| `/areas/lutz/gutter-repair` | 627 | **no** |

That ~630 vs ~1,405 split is the whole story. VERIFIED in
`app/areas/[slug]/[service]/page.jsx`: `generateStaticParams` emits all 29 cities x 8
services = 232 pages, but only 40 city/service pairs have an `ENRICHMENT` entry.
Everything else renders the generic `SERVICES` template.

- **Brandon has 3 of 8 enriched:** `gutter-repair`, `gutter-guards`, `gutter-cleaning`.
- **Lutz has 0 of 8 enriched.**

### Demand data (VERIFIED, GSC via Ahrefs project 9674315, 2026-05-07 to 2026-08-06)

Page level:

| Page | Keywords | Impressions | Clicks | Avg position |
|---|---:|---:|---:|---:|
| `/areas/brandon` | 333 | 4,143 | 2 | 14.9 |
| `/areas/brandon/gutter-cleaning` | 115 | 251 | 0 | 53.3 |
| `/areas/brandon/gutter-guards` | 8 | 51 | 0 | 10.6 |
| `/areas/brandon/siding` | 11 | 16 | 0 | 8.3 |
| `/areas/lutz` | 222 | 2,453 | **0** | 14.0 |

Neither city has essentially-no-demand. Both have real, substantial demand. Lutz has
2,453 impressions across 222 queries and has never been clicked once.

**Diagnosis (INFERRED):** average position 14-15 is page two. At page two you get
almost no clicks regardless of how good the title is. So this is a *position* problem,
not the CTR problem the earlier dead-CTR strike addressed. The lever that moves page
two to page one here is depth on the page that matches the query, plus internal links
that pass authority to it. That is exactly what the enriched children have and the
thin ones do not.

### Top queries by cluster

Brandon, highest-impression individual queries (VERIFIED):

| Query | Impressions | Position | Currently lands on |
|---|---:|---:|---|
| siding contractor brandon fl | 171 | 16.3 | `/areas/brandon` |
| gutter installers brandon fl | 104 | 12.9 | `/areas/brandon` |
| gutter guard brandon fl | 94 | 7.4 | `/areas/brandon/gutter-guards` (enriched, working) |
| gutter installation brandon fl | 90 | 15.8 | `/areas/brandon/gutter-cleaning` (wrong child) |
| seamless gutters brandon fl | 85 | 11.3 | `/seamless-aluminum-gutters` (generic, not the city) |

Lutz, highest-impression individual queries (VERIFIED):

| Query | Impressions | Position | Currently lands on |
|---|---:|---:|---|
| gutter leaf guard lutz fl | 105 | 13.5 | `/gutter-guards` (generic, not the city) |
| gutter installation lutz fl | 98 | 14.5 | `/areas/lutz` |
| rain gutter cleaning lutz fl | 87 | 21.7 | `/areas/lutz` |
| gutter cleaning lutz fl | 57 | 24.6 | `/gutter-cleaning` (generic) |
| gutter guard installation lutz fl | 55 | 21.8 | `/areas/lutz` |
| gutter repair lutz fl | 51 | 10.7 | `/areas/lutz` |

Cluster totals (INFERRED - my sum of the VERIFIED per-query impressions in the top-100
pull for each city; the real totals are higher because the pull was capped at 100 rows):

| City | Cluster | Impressions | Child page enriched? |
|---|---|---:|---|
| Brandon | **siding** | ~721 | **no** |
| Brandon | **seamless-aluminum-gutters** | ~493 | **no** |
| Lutz | **gutter-repair** | ~404 | **no** |
| Lutz | **gutter-guards** | ~385 | **no** |
| Lutz | **seamless-aluminum-gutters** | ~379 | **no** |
| Lutz | **gutter-cleaning** | ~213 | **no** |

Brandon siding is the single largest unserved cluster on either city: ~721 impressions
across 24 queries, and `/areas/brandon/siding` is a thin template page holding 11
keywords and 16 impressions. The demand is landing on the city page at position 16
instead.

### Internal links (VERIFIED, whole-repo grep, not line-scoped)

| Target | Prose inbound links | Other inbound |
|---|---:|---|
| `/areas/brandon` | **0** | 4 markdown **table cells** (2 EN, 2 ES), plus the `/areas` index grid |
| `/areas/lutz` | **0** | **nothing at all** except the `/areas` index grid |

Correction to my own first pass: I initially reported "zero inbound" for Brandon from a
grep that excluded `content/`. Re-run across the whole repo, Brandon does have four
inbound links, but every one of them is a city name inside a pricing-table row
(`content/blog/gutter-cleaning-cost-guide.md:76`,
`content/blog/gutter-installation-cost-tampa-2026.md:89`, and the two ES twins). None
is a link inside a sentence. Lutz genuinely has zero.

Supporting facts, all VERIFIED:

- Brandon is named in prose in **8 blog posts**. Lutz is named in prose in **0**. Every
  Lutz mention in the repo is inside a comma-separated service-area list, a schema
  `City` array, or a metadata keyword array - never a sentence.
- `public/llms/` carries 4 Brandon files and **0** Lutz files. One of the Brandon
  files, `jrone-brandon-seamless-aluminum-gutters.md`, describes a page that has no
  `ENRICHMENT` entry, so the LLM layer already claims depth the page does not have.
- The city page links to 5 of its 8 children (via `comboSlug` in
  `components/CityLandingPage.jsx:299`). `gutter-cleaning`, `copper-gutters`, and
  `drainage-assessment` get no link from their own city page.
- Each city/service page links to the same service in its `nearby` cities
  (`app/areas/[slug]/[service]/page.jsx:1379`). Lutz is in the `nearby` array of
  `wesley-chapel`, `land-o-lakes`, `new-tampa`, and `temple-terrace`, so its children
  do receive that templated cross-link.

### Spanish (VERIFIED)

- `/es/areas/[slug]` exists for both cities with real per-city Spanish copy
  (`CITIES_ES` in `components/CityLandingPage.jsx:312`), not machine translation.
- **`/es/areas/[slug]/[service]` does not exist at all.** The EN route says so in a
  comment at `app/areas/[slug]/[service]/page.jsx:1063`: hreflang declares
  `x-default` only, with a note to add `es-US` "when the ES combo route ships."

This is the one genuine scope decision in the job, and it is flagged to Popeye rather
than silently resolved. See "Open question" below.

---

## STEP 2 - the proposed build

### Pages to enrich (6 total)

Not new routes. Each is an `ENRICHMENT` entry that replaces the generic template on a
page that already exists and already renders.

| # | Page | Why | Covers these queries |
|---|---|---|---|
| 1 | `/areas/brandon/siding` | largest unserved cluster, ~721 impressions | siding contractor / installation / repair / replacement / storm and hurricane damaged siding, all + brandon fl |
| 2 | `/areas/brandon/seamless-aluminum-gutters` | ~493 impressions going to the generic service page | seamless gutters / seamless gutter company / contractors / installation / aluminum gutters + brandon fl |
| 3 | `/areas/lutz/gutter-repair` | ~404 impressions, largest Lutz cluster | gutter repair / repair experts / best gutter repair company / emergency / downspout repair + lutz fl |
| 4 | `/areas/lutz/gutter-guards` | ~385 impressions, top Lutz query at 105 | gutter leaf guard / guard installation / gutter cover / gutter screen / reverse curve + lutz fl |
| 5 | `/areas/lutz/seamless-aluminum-gutters` | ~379 impressions | seamless gutter company / services / contractors / installation + lutz fl |
| 6 | `/areas/lutz/gutter-cleaning` | ~213 impressions, and the page gets no link from its own city page | rain gutter cleaning / gutter cleaning service / gutter cleaner + lutz fl |

Each enrichment follows the existing `ENRICHMENT` shape already used by the 40 live
entries: `introOverride`, `propsOverride`, `faqs`, `neighborhoodsOfNote`,
`trustNumbers`. Target ~1,400 words to match the enriched Brandon pages, which is the
proven-shape comparison, not an invented target.

**Vocabulary rule carried over from the rank-lift plan's `/gutter-guards` diagnosis:**
write the words buyers type, not the words installers say. For the guard pages that
means "gutter cover", "gutter screen", and "leaf guard" appear as real prose, because
those carry impressions and the generic page currently ranks for them by accident.

### Content constraints

Every number, lifespan, warranty term, material, origin, percentage, and count comes
from `compliance-sweep-closed-2026-08.md`. Specifically in scope for these six pages:

- Seamless aluminum lifespan **20 to 30 years**. Guard lifespan **15 to 20+ years**.
- Guards give **80% less cleaning**. They REDUCE cleaning, never eliminate it.
- Six-inch and seven-inch only, plus copper and galvalume. **No roofing.**
- Seven-inch carries roughly **40%** more water than six-inch. That comparison exists
  only against six-inch.
- Workmanship warranty **3 years**, plus the 20-year manufacturer paint warranty.
- Gauge .027 standard, .032 Florida/coastal. Hidden hangers at **24 inches**.
- Downspouts **about every 30 to 35 feet**, and the sentence must keep the caveat that
  real spacing depends on the roof and roofline.
- **No color count, in any language.** **No founding year.** "Over 30 years" only.
- Vinyl siding: JR One installs it, but **no brand, no warranty term, no lifespan**.
  This binds the Brandon siding page hard - it is a siding page that may not publish a
  siding lifespan.

Anything a page wants that is not in canon gets left out and flagged, not invented.

### Internal linking plan

Mirrors commit `9aa3865` ("Add 16 prose internal links from the guard cluster into
/gutter-guards"): links go **inside sentences that already discuss the topic**, anchors
vary, nothing is appended as a block, and no new claim is introduced by a link.

**Brandon** - seven prose links, all into copy that already names Brandon:

| # | Source (existing sentence) | Target | Anchor |
|---|---|---|---|
| 1 | `content/blog/gutter-installation-cost-tampa-2026.md:51` city list in prose | `/areas/brandon` | Brandon |
| 2 | `content/blog/gutter-installation-cost-tampa-2026.md:97` "Inland cities (Brandon, Lakeland, Riverview)" | `/areas/brandon/seamless-aluminum-gutters` | seamless gutter work in Brandon |
| 3 | `content/blog/gutter-installation-cost-tampa-2026.md:149` Brandon worked example | `/areas/brandon` | Brandon, single-story |
| 4 | `content/blog/best-gutter-guards-florida-homes.md:184` Brandon worked example | `/areas/brandon/gutter-guards` | guard installs around Brandon |
| 5 | `content/blog/diy-gutter-cleaning-vs-hiring-pro-tampa.md:257` Brandon example | `/areas/brandon/gutter-cleaning` | Brandon crews |
| 6 | `content/blog/hurricane-prep-gutter-checklist-tampa-2026.md:298` Brandon example | `/areas/brandon` | homes in Brandon |
| 7 | `content/blog/gutter-cleaning-cost-guide.md:54` prose city list | `/areas/brandon/gutter-cleaning` | Brandon |

Plus the ES twins where the ES post carries the same sentence, pointed at
`/es/areas/brandon` through `localizeHref`, per the pattern in commit `9aa3865`.

**Lutz** - this is the honest constraint. Lutz appears in **zero** blog sentences, so
there is no existing body copy to place a link inside. Inventing a Lutz mention purely
to hang a link on is the appended-link-block failure in disguise. So Lutz links come
from the two places where naming Lutz is genuinely correct in context:

| # | Source | Target | Anchor | Why it belongs there |
|---|---|---|---|---|
| 8 | `/areas/land-o-lakes` localP, existing sentence about the Pasco county-line corridor | `/areas/lutz` | the Lutz side of the county line | Lutz already sits in `land-o-lakes.nearby`; the corridor is the sentence's actual subject |
| 9 | `/areas/wesley-chapel` localP | `/areas/lutz` | neighboring Lutz | already in `wesley-chapel.nearby` |
| 10 | `/areas/new-tampa` localP, existing canopy sentence | `/areas/lutz/gutter-guards` | heavy-canopy homes toward Lutz | New Tampa's copy already discusses oak and pine canopy, which is the guard argument |
| 11 | `/areas/temple-terrace` localP | `/areas/lutz` | Lutz | already in `temple-terrace.nearby` |

Each of those four is a real editorial addition to a sentence that is already about the
adjacent-area corridor, in both EN and ES. That is four genuine prose inbound links to
a page that has zero today.

### What this does NOT do

- No new routes, no new slugs, no sitemap growth on the EN side. All six target pages
  already render today.
- No `llms/` files for Lutz in this pass. The llms layer is a separate surface and
  adding four Lutz files is a different job with its own review; flagged, not silently
  bundled.
- No deploy. Popeye reads the copy first.

---

## Open question for Popeye - the Spanish city/service route

This is the one thing that changes the shape of the work and cannot be defaulted safely.

`/es/areas/[slug]/[service]` does not exist. The Spanish city landing pages
(`/es/areas/brandon`, `/es/areas/lutz`) do exist and already carry real Spanish copy.

Three options:

**A. Ship the six Spanish twins only (RECOMMENDED).** Create the ES combo route with
`dynamicParams = false` and `generateStaticParams` limited to exactly the six enriched
pairs. Adds 6 Spanish pages, all deep. Adds the `es-US` hreflang the EN route already
has a TODO for. No thin pages created.

**B. Ship the full ES route, all 29 x 8.** Adds 232 Spanish pages, of which 226 would
be the ~630-word generic template. That mass-produces the exact defect this whole job
exists to fix, on a tree that currently has no thin-page problem.

**C. English only this pass.** Spanish stays at the existing city landing pages. Least
work, but leaves "English and Spanish" only half-honored for the new depth.

My recommendation is **A**. It honors the bilingual requirement, it matches the note
the EN route already carries, and it creates depth without creating thinness.
