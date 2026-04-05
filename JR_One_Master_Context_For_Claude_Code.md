# JR ONE ALUMINUM LLC — MASTER CONTEXT FOR CLAUDE CODE
## Complete Project Intelligence Document
### Use this file as context when working on the JR One website or any related tools

---

## SECTION 1: BUSINESS OVERVIEW

**Legal Name:** JR One Aluminum LLC
**Website:** jronegutters.com
**Phone:** (844) 444-3114
**Email:** jrone.business@gmail.com / info@jronegutters.com
**Location:** Tampa, FL
**Owner:** Christopher (goes by "Chris" or "Popeye")
**Years in Business:** 30+
**Google Rating:** 4.9 stars, 55+ reviews
**CRM:** Builder Prime (subdomain: jronegutters)
**Bilingual:** All content and tooling runs in English AND Spanish

### Services Offered
1. Gutter Installation — Seamless aluminum gutters (5", 6", 7"), custom colors
2. Gutter Repair — Leaks, sagging, reattachment, downspout fixes
3. Gutter Replacement — Full system replacement
4. Gutter Guards / Leaf Guards — Micro mesh, screens, multiple types
5. Soffit Installation & Repair — Aluminum and vinyl soffit, ventilation
6. Fascia Installation & Repair — Fascia board replacement, aluminum fascia wrap
7. Siding — Vinyl siding, aluminum siding, Hardie board
8. Gutter Cleaning — Maintenance service
9. **Peak 301 Roof Rejuvenation** — Soy-based shingle restoration treatment (detailed below)
10. Govee Lights — Exterior permanent LED lighting
11. Copper Gutters — Premium copper gutter systems
12. Drainage Systems — PVC drainage, dry wells, catch basins, sump pumps

### Service Area (28 cities)
Tampa, Clearwater, St. Petersburg, Sarasota, Bradenton, Lakeland, Brandon, Wesley Chapel, Palm Harbor, Riverview, New Port Richey, Largo, Spring Hill, Tarpon Springs, Land O' Lakes, Dunedin, Ruskin, Sun City Center, Temple Terrace, Plant City, Lutz, Odessa, Oldsmar, Safety Harbor, Seminole, Pinellas Park, Indian Rocks Beach, Treasure Island

### Unique Selling Points
- 30+ years of experience (founded ~1990)
- Family-owned and operated
- 3 in-house crews (no subcontractors — key differentiator)
- Licensed and insured
- 4.9-star Google rating
- Free estimates
- Financing available
- Senior and military discounts
- Storm damage emergency service
- Bilingual service (English/Spanish)

---

## SECTION 2: BRAND IDENTITY

### Color Palette (Brand Tokens — exact hex values used in all JSX files)
```javascript
const C = {
  bg: "#0B1628",           // Deepest background
  navy: "#1B2A4A",         // Primary navy
  navyMid: "#243556",      // Mid navy
  navyLight: "#2C3E5A",    // Light navy (borders, cards)
  navyFade: "#162033",     // Dark overlay sections
  gold: "#C8952E",         // Primary gold — CTAs, accents
  goldLight: "#D4A843",    // Hover/gradient gold
  goldPale: "rgba(200,149,46,0.12)",  // Gold background tint
  cream: "#F5F3EF",        // Off-white light backgrounds
  white: "#FFFFFF",        // Primary text on dark
  offWhite: "#E8E4DC",     // Secondary text on dark
  muted: "#7A8FA8",        // Body text / descriptions on dark
  charcoal: "#2D2D2D",     // Text on light backgrounds
  success: "#2D8B4E",      // Green for trust badges
  successDim: "rgba(45,139,78,0.15)",
  alert: "#B11A21",        // Red for urgency
  alertDim: "rgba(177,26,33,0.12)",
}
```

### Typography
- **Headings:** Montserrat (Google Font) — weights 400, 500, 600, 700, 800
- **Body:** Source Sans 3 (Google Font) — weights 300, 400, 600
- **Font import URL:** `https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800&family=Source+Sans+3:wght@300;400;600&display=swap`

### Typography Hierarchy
- H1 (hero): Montserrat Bold 700, 42–56px, ALL CAPS, 2–4px letter-spacing
- H2 (section headers): Montserrat SemiBold 600, 32–40px
- H3 (subsections): Montserrat Medium 500, 24–28px
- Body: Source Sans 3 Regular 400, 16–18px, line-height 1.6–1.7
- Buttons/CTAs: Montserrat SemiBold 600, 14–16px, ALL CAPS, 1–2px letter-spacing
- Tags/badges: Montserrat Bold 700, 11–12px, ALL CAPS, 3px letter-spacing

### Brand Voice
- Confident but not arrogant
- Professional but not corporate — local Tampa business
- Empathy-first (acknowledge homeowner anxiety before selling)
- Detail-oriented (specificity builds trust)
- Protective — educate about risks without fear-mongering

### Tagline Options (approved)
- Primary: "Soffit So Good." or "Born in the Bay. Built to Stay."
- Campaign: "We're Obsessed with Your Overhangs." / "Tampa Bay's #1 in Aluminum. (Get It? JR One.)"

---

## SECTION 3: WEBSITE ARCHITECTURE

### Technology Stack
- **Framework:** Next.js (React)
- **Deployment:** Vercel
- **Domain:** jronegutters.com → point to Vercel (A record or CNAME)
- **Styling:** Inline styles using brand token object (no Tailwind, no CSS modules)
- **Routing:** App Router (/app directory)

### All 17+ Pages Built (JSX files)

| Page | File | Route |
|------|------|-------|
| Homepage | jr-one-homepage.jsx | / |
| Seamless Gutters | jr-one-gutters-page.jsx | /seamless-aluminum-gutters |
| Gutter Guards | jr-one-guards-page.jsx | /gutter-guards |
| Soffit & Fascia | jr-one-soffit-fascia-page.jsx | /soffit-and-fascia |
| Siding | jr-one-siding-page.jsx | /siding |
| Gutter Repair & Maintenance | jr-one-repair-page.jsx | /gutter-repair |
| **Peak 301 Roof Rejuvenation** | jr-one-peak301-page.jsx | /peak-301 |
| Copper Gutters | jr-one-copper-page.jsx | /copper-gutters |
| About Us | jr-one-about-page.jsx | /about |
| Contact | jr-one-contact-page.jsx | /contact |
| Projects/Gallery | jr-one-projects-page.jsx | /projects |
| City Landing Pages (21 cities) | jr-one-city-pages.jsx | /areas/[city-slug] |
| Warranties | jr-one-warranty-page.jsx | /warranties |
| Financing | jr-one-financing-page.jsx | /financing |
| Service Plans | jr-one-service-plans-page.jsx | /service-plans |
| Govee Lights | jr-one-govee-lights-page.jsx | /govee-lights |
| FAQ | jr-one-faq-page.jsx | /faq |
| **Referral Program** | jr-one-referral-page.jsx | /referral |
| **Insurance Resource Center** | jr-one-insurance-resource-center.jsx | /insurance-resource-center |

### Next.js Deployment Setup
```bash
npx create-next-app@latest jr-one-website
# Place each .jsx file in /app/[route]/page.jsx per the routes above
# City pages: /app/areas/[slug]/page.jsx (dynamic route, accepts citySlug prop)
# Push to GitHub → connect to Vercel → point jronegutters.com DNS
```

### Environment Variables Required
```
BUILDER_PRIME_API_KEY=WLlWXh9.nUVGOY6WO3UtoUwxFho0
ANTHROPIC_API_KEY=sk-ant-api03-[see config.json]
GMAIL_USER=info@jronegutters.com
GMAIL_APP_PASSWORD=[from credentials.json]
```

---

## SECTION 4: PEAK 301 — COMPLETE PRODUCT CONTEXT

Peak 301 is a core product and one of the highest-margin offerings JR One carries.

### What Peak 301 Is
- An all-natural, soy-based sealant that penetrates shingles and restores them from the inside out
- NOT a paint, coating, or surface spray — it works at the molecular level
- Adds 6–10 years of life to an existing roof
- Costs under 15% of a full roof replacement ($15K–$25K+)
- Comes with official warranty documentation that Florida insurance companies require
- Eco-friendly: non-toxic, biodegradable, safe for landscaping, pets, family
- Applied by JR One's in-house trained crew (not subcontracted)

### Why It Matters in Florida
- 280% increase in Florida homeowner policy non-renewals since 2018
- Insurers are canceling policies based on roof AGE alone — not condition
- Roofs 15+ years old are at risk of non-renewal
- Florida law (SB 2D 2022, HB 1611 2024) requires that if an inspection shows 5+ years of remaining useful life, insurers cannot deny coverage based on age alone
- Peak 301 provides the warranty documentation that proves 5+ years remaining life

### Florida Insurance Laws (Key for the Peak 301 and Insurance Resource Center pages)

**Senate Bill 2D (2022):**
- Insurers cannot refuse to issue/renew a policy solely because of roof age if roof is under 15 years old
- For roofs 15+ years old, homeowner gets an inspection before replacement is required
- If inspection shows 5+ years of remaining useful life → insurer cannot deny/non-renew based on age alone
- Roof age calculated from last date 100% of roof surface was replaced per building code

**House Bill 1611 (2024):**
- Expands inspector access rights
- Homeowner can use licensed inspector (not just insurer-appointed)

### Peak 301 Process (4 Steps)
1. **ASSESS** — Inspect roof condition, age, shingle type; determine candidacy (honest about non-candidates)
2. **DESIGN** — Treatment plan, transparent pricing, explanation of warranty documentation
3. **TREAT** — Apply soy-based sealant; trained crew ensures even penetration across all shingle surfaces
4. **CERTIFY** — Provide official warranty documentation + treatment certificate for homeowner's records and insurer

### Peak 301 FAQs (from the page)
- Is this a paint or coating? No — it penetrates INTO the shingle material
- What roofs qualify? Most asphalt shingles in decent structural condition; JR One assesses honestly
- How much does it cost? Under 15% of full replacement — specific pricing from assessment
- Does my insurer accept it? The warranty documentation aligns with what FL insurers need; consult insurer directly
- Is it safe? Yes — soy-based, non-toxic, biodegradable
- How long does application take? Typically one day
- What's the warranty? Comes with official treatment certificate and warranty documentation
- Is it covered by insurance? Typically not — but it preserves existing insurance coverage

### Peak 301 Downloadable Documents (PDFs available in project)
- `JR_One_Peak301_Treatment_Certificate.pdf` — Template for completed treatment documentation
- `JR_One_Peak301_What_To_Expect.pdf` — Customer-facing guide to the treatment process
- `JR_One_FL_Roof_Insurance_Rights.pdf` — Florida homeowner insurance rights guide
- `JR_One_Insurance_Letter_Template.pdf` — Template letter for homeowners to send to insurers
- Spanish versions: `esJR_One_Peak301_Treatment_Certificate.pdf`, `esJR_One_FL_Roof_Insurance_Rights.pdf`, `esJR_One_Peak301_What_To_Expect.pdf`, `esJR_One_Insurance_Letter_Template.pdf`

### Insurance Resource Center Page
- Route: `/insurance-resource-center`
- File: `jr-one-insurance-resource-center.jsx`
- Companion page to Peak 301 — deeper dive into FL insurance laws, documentation, and rights
- Stats displayed: 280% non-renewal increase, $3,285–$5,100 average Tampa Bay premium, 90,000 policies dropped (Citizens alone), 5-year remaining useful life threshold
- Breadcrumb: Home → Peak 301 → Insurance Resource Center

---

## SECTION 5: TOOLS BUILT

### Tool 1: Aerial Estimator (`jr-one-aerial-measure-tool.html`)
A standalone HTML tool (no framework — pure HTML/CSS/JS) that allows:
- Customer or salesperson to search an address on a satellite map
- Measure roof edges/linear footage directly on the aerial image
- Generate an instant estimate range based on measurements
- Gate the estimate behind a phone number capture
- Auto-email lead notification to jrone.business@gmail.com AND info@jronegutters.com (via Google Apps Script)
- Optional: customer can email themselves the estimate (captures name + email = full contact)
- Generates unique discount code format: `JR1-AE-XXXXX` (expires 30 days)

**Backend:** Google Apps Script (not a server — uses GAS web app deployment)
**Setup file:** `AERIAL-ESTIMATOR-SETUP-GUIDE.md`
**GAS script file:** `google-apps-script.js`
**Configuration line to update:** `const SCRIPT_URL = 'YOUR_GOOGLE_APPS_SCRIPT_URL_HERE';`

**Lead flow:**
1. Customer measures on map
2. Clicks "SEE MY ESTIMATE"
3. Enters phone → auto-send to both emails (PDF with aerial screenshot, measurements, estimate, discount code)
4. (Optional) "Email Me My Estimate" → enters name + email → gets branded PDF, you get full contact

### Tool 2: ROI Calculator (`jrone_gutters_roi_blue.html`)
- Standalone HTML file
- Demonstrates the ROI of proper gutter installation vs. water damage costs
- Used as a sales/marketing asset

### Tool 3: Email Outreach System
**Files:** `run_outreach.py`, `generate_email.py`, `run_agency_outreach.py`
**Config:** `config.json`
**Credentials:** `credentials.json`, `token.json`

**What it does:**
- Python scripts that pull from a CRM-like structure
- Segments contacts into: MAINTENANCE (past customers) and LOST_QUOTE (unconverted leads)
- Generates personalized emails using Anthropic API (Claude)
- Sends via Gmail API (OAuth2 — credentials.json + token.json)
- Enforces 14-day minimum between contacts, max 2 emails/month per contact
- Sends in batches of 10 with 3-minute stagger between sends
- Logs all sends to `outreach-send-log.json`
- Generates a synopsis report after each batch

**Config settings:**
```json
{
  "anthropic": { "api_key": "..." },
  "builder_prime": { "subdomain": "jronegutters", "api_key": "..." },
  "gmail": { "sending_email": "info@jronegutters.com" },
  "outreach_settings": {
    "batch_size": 10,
    "min_days_between_emails": 14,
    "max_emails_per_month": 2,
    "stagger_send_minutes": 3
  }
}
```

**Email templates used:** Personalized per contact (name, city, service type, lead status)
- Past customer templates: maintenance reminders, seasonal prep
- Lost quote templates: re-engagement, new promotions

### Tool 4: PDF Generator (`generate_pdfs.py`, `generate_pdfs_es.py`)
- Python scripts that generate the Peak 301 / insurance PDFs
- English and Spanish versions
- Output: the PDF files in the project directory

### Tool 5: Insurance Agency Outreach (`run_agency_outreach.py`)
- Separate outreach system targeting insurance agencies (not homeowners)
- Source: `insurance_agency_repository.csv` (38 agencies, 7 fields: Agency Name, Type, City, Area, Phone, Website, Notes)
- Template: `insurance_agency_outreach_email.html`
- Positions JR One as a resource for agents whose clients have aging roofs

---

## SECTION 6: INTEGRATIONS & APIS

### Builder Prime CRM
- **Subdomain:** jronegutters.buildertrend.net (or similar)
- **API Key:** WLlWXh9.nUVGOY6WO3UtoUwxFho0
- **Form submission mapping:** name → contact name, phone → phone, email → email, service → lead type, zip → address zip
- **Lead status:** Set to "New" or "Web Lead" on submission
- **API endpoint:** Contact Builder Prime support for full API docs

### Gmail / Google Workspace
- **Sending email:** info@jronegutters.com
- **Notification email:** jrone.business@gmail.com
- **Auth:** OAuth2 via credentials.json + token.json (Google Workspace account)
- **Scopes:** `https://www.googleapis.com/auth/gmail.send`
- **Nodemailer** used for form notification emails

### Anthropic API (Claude)
- Used in: email generation scripts, homepage estimator chatbot
- Model for scripts: claude-sonnet-4 (latest available)
- API key in config.json

### BuildMyAgent Chatbot
- Floating widget — bottom-right corner of every page
- Add embed script to `app/layout.jsx`
- Z-index: 998 (below sticky mobile CTA bar at 999)

### Google Apps Script (Aerial Estimator backend)
- Deployed as web app at: `https://script.google.com/macros/s/[ID]/exec`
- Handles email sending from the HTML tool (no server needed)
- Execute as: info@jronegutters.com
- Access: Anyone (anonymous, no auth)

### Google Analytics 4 + Search Console
- Track: form submissions, phone clicks, estimator unlocks, email signups, FAQ interactions
- Conversion goals: form submit, phone click, estimator gate unlock

---

## SECTION 7: FORM SUBMISSIONS — LEAD CAPTURE FLOW

Every page form → `/api/send-lead` endpoint → TWO actions simultaneously:
1. Creates lead in Builder Prime via API
2. Sends email notification to jrone.business@gmail.com

**Email notification format:**
- Subject: `New Web Lead: [Name] — [Service] — [ZIP]`
- Body: All form fields + timestamp + which page they submitted from

**Standard form fields across all pages:**
- Full Name
- Phone Number
- Email Address
- Service (dropdown or auto-populated from page)
- ZIP Code
- (Some pages): Message / Notes

---

## SECTION 8: SCHEMA MARKUP

### LocalBusiness Schema (in app/layout.jsx — site-wide)
```json
{
  "@context": "https://schema.org",
  "@type": "HomeAndConstructionBusiness",
  "name": "JR One Aluminum LLC",
  "url": "https://jronegutters.com",
  "telephone": "(844) 444-3114",
  "email": "jrone.business@gmail.com",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Tampa",
    "addressRegion": "FL",
    "addressCountry": "US"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": "27.9506",
    "longitude": "-82.4572"
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.9",
    "reviewCount": "55"
  },
  "priceRange": "$$",
  "areaServed": ["Tampa","Clearwater","St. Petersburg","Sarasota","Bradenton","Lakeland","Brandon","Wesley Chapel","Palm Harbor","Riverview"],
  "foundingDate": "1990",
  "numberOfEmployees": "15-20",
  "knowsLanguage": ["English","Spanish"]
}
```

### FAQ Schema (on every page with FAQs)
Generate JSON-LD dynamically from the FAQ arrays in each component.

### Service Schema (on each service page)
```json
{
  "@context": "https://schema.org",
  "@type": "Service",
  "serviceType": "Gutter Installation",
  "provider": { "@type": "HomeAndConstructionBusiness", "name": "JR One Aluminum LLC" },
  "areaServed": { "@type": "City", "name": "Tampa" }
}
```

---

## SECTION 9: SEO STRATEGY

### Current SEO Status (March 2026)
- Domain Rating: 4.4 / 100
- Organic Keywords: 8
- Organic Traffic: 17 visits/month
- Status: Virtually invisible in organic search

### Competitor Benchmarks
| Competitor | Keywords | Monthly Traffic | Domain Rating |
|------------|----------|-----------------|---------------|
| Brothers Gutters | 2,476 | 36,374 | 42 |
| LeafFilter | 4,527 | 82,686 | 71 |
| Absolute Aluminum | 312 | 1,840 | 18 |
| JR One Aluminum | 8 | 17 | 4.4 |

### Priority Keywords (Top Quick Wins — KD 0-5)
- gutter installation (18,000/mo, KD 7)
- gutter repair (14,800/mo, KD 5)
- seamless gutters (12,100/mo, KD 8)
- soffit and fascia (11,000/mo, KD 1)
- gutter installation cost (6,600/mo, KD 3)
- gutter replacement cost (2,900/mo, KD 4)
- gutter installation tampa (320/mo, KD 2) — LOCAL PRIORITY
- gutter repair tampa (200/mo, KD 1) — LOCAL PRIORITY
- seamless gutters tampa (170/mo, KD 1) — LOCAL PRIORITY

### City Pages (21 cities built, route: /areas/[city-slug])
Tampa, Clearwater, St Petersburg, Sarasota, Bradenton, Lakeland, Brandon, Wesley Chapel, Palm Harbor, Riverview, New Port Richey, Largo, Spring Hill, Tarpon Springs, Land O' Lakes, Dunedin, Ruskin, Sun City Center, Temple Terrace, Plant City, Lutz

### Blog Posts
- 100 posts written and stored in Blog_Posts_01_10.docx through Blog_Posts_91_100.docx
- 124,000+ words total
- Topics: gutter services (posts 1-25), soffit & fascia (26-45), gutter guards (46-65), siding (66-80), city-specific (81-100)
- Blog route: /blog (index) and /blog/[slug] (individual posts)
- Store as .md files in /content/blog/
- Use gray-matter + remark for Markdown → HTML rendering

---

## SECTION 10: PRICING CATALOG

### Gutter Products (price per linear foot)
| Product | Price |
|---------|-------|
| 5" Seamless Aluminum Gutter | $25.00/ft |
| 6" Seamless Gutters | $10.00/ft |
| 7" Seamless Gutters | $16.00/ft |
| 6" Seamless Half Round Gutters | $30.00/ft |
| 7" Commercial Box Gutter | $30.00/ft |
| 7" Commercial D Style Gutter | $30.00/ft |
| 8" Half Round Gutter | $52.34/ft |
| 6" Seamless Copper Gutters | $60.00/ft |
| 7" Seamless Copper Gutters | $60.00/ft |
| 6" Copper Half Round Gutter | $65.00/ft |
| Roll Form Gutters | $30.00/ft |
| Remove/Re-install Existing Gutters | $8.00/ft |

### Downspouts
| Product | Price |
|---------|-------|
| 3x4 Downspout/Elbows | $10.00/ft |
| 4" Round Downspouts | $16.00/ft |
| 4x5 Downspouts/Elbows | $16.00/ft |
| Smooth 3x4 Downspouts | $16.00/ft |
| 4" Round Copper Downspouts | $50.00/ft |
| 3x4 Copper Downspouts/Elbows | $50.00/ft |

### Gutter Guards
| Product | Price |
|---------|-------|
| 6" Gutter Guard / Leaf Guard | $8.00/ft |
| 7" Gutter Guard / Leaf Guard | $8.50/ft |
| 6" Micro Mesh Guard | $12.00/ft |
| Deluxe Guard Package | $11.00/ft |
| Custom Gutter Guards | $10.00/ft |
| 6" Copper Gutter Guard | $25.00/ft |
| 7" Copper Gutter Guard | $35.00/ft |
| Remove/Re-install Existing Guards | $3.50/ft |

### Soffit
| Product | Price |
|---------|-------|
| Aluminum Soffit Vented/Nonvented | $16.50/ft |
| Vinyl Soffit Vented/Nonvented | $16.50/ft |
| ISPAN .044 Vinyl | $35.00/ft |
| Hardie Board Soffit | $45.00/ft |

### Fascia
| Product | Price |
|---------|-------|
| Custom Bent Fascia | $10.00/ft |
| Custom Bent 2-Tier Fascia | $11.00/ft |
| Custom Bent 3-Tier Fascia | $13.00/ft |
| Pre-Fabricated Fascia Only | $8.50/ft |
| Aluminum Fascia Trim (included in soffit installs) | varies |
| Wood Fascia Replacement | $15.00/ft |

### Siding
| Product | Price |
|---------|-------|
| Vinyl Lap Siding | $1,800.00/square |
| Aluminum Siding | Custom |
| Hardie Board Lap Siding | $2,300.00/square |
| Hardie Board & Batten | $2,300.00/square |
| Hardie Board Shaker | $2,700.00/square |

### Drainage (flat-rate items)
| Product | Price |
|---------|-------|
| Catch Basin | $680.00/each |
| Mini Dry Well | $250.00/each |
| 4x5 Reducer | $20.00/each |
| 3x4 Adapters | $20.00/each |
| Schedule 40 PVC Drainage | $50.00/ft |
| 4" Corrugated Solid Pipe | $10.00/ft |
| Trencher | $320.00/day |

### Service Items
| Product | Price |
|---------|-------|
| Govee Lights | $7.50/ft |
| Premium Gutter Cleaning | $6.00/ft |
| Basic Tune-Up | $4.00/ft |
| Downspout Repair | $400.00/each |
| Downspout Clean Out | $130.00/each |
| Rain Chains | $220.00/each |
| Conductor Heads | $340.00/each |
| Copper Conductor Head | $600.00/each |
| Rain Barrel | $320.00/each |
| Concrete Splash Guards | $25.00/each |
| Patio Screen Door | $480.00/each |
| Patio Screening w/ Framing | $18.00/sq |
| Wood Work | $16.00/ft |

---

## SECTION 11: REFERRAL PROGRAM

- **Reward:** $80 gift card for referrer on every qualifying job
- **Discount for referred customer:** 10% off their next service
- **Minimum project value to qualify:** $880
- **All services qualify** — gutters, soffit, fascia, Peak 301
- **Process:** Refer → JR One serves → they sign + deposit → reward triggered
- **Who can refer:** Past customers, insurance agents, roofers, real estate agents, general contractors
- **Route:** /referral
- **File:** jr-one-referral-page.jsx

---

## SECTION 12: REDIRECTS (Critical for SEO on Launch)

When new site goes live, implement these 301 redirects in next.config.js:
- /service-area/ → / (was already broken)
- /gutters/gutter-repair/ → /gutter-repair
- /gutters/gutter-cleaning/ → /service-plans
- /areas-served/tampa/ → /areas/tampa
- /service-area/south-tampa/ → /areas/tampa
- All old city pages → /areas/[city]
- Duplicate blog post URLs → canonical version

---

## SECTION 13: EN/ES BILINGUAL IMPLEMENTATION

- Homepage (`jr-one-homepage.jsx`) has full EN/ES translation toggle built in
- Language toggle is visible in the nav bar
- All other pages need /es/ route prefix: /es/seamless-aluminum-gutters, etc.
- Use Next.js i18n routing or a simple language context provider
- Priority for Spanish translation: homepage (done), then top 5 service pages, then top 20 blog posts
- All PDF documents exist in both English and Spanish (es prefix)

---

## SECTION 14: PHOTO / MEDIA SOURCES

- **Current live site:** jronegutters.com/projects/ — 27 pages × ~3 projects = ~80 project photos
- **CompanyCam API:** 300+ projects, thousands of photos (highest quality source)
- **Instagram:** @jronegutters — 56 posts
- **Format on new site:** WebP, max 1200px wide, quality 80%
- **Alt text:** Human-written, descriptive (NOT AI-generated — this was flagged as an SEO issue)
- **Priority photos needed:** Hero images for each service page (1 per page = 17), gallery (40-60), about us (2), city pages (shared rotating set)

---

## SECTION 15: CHATBOT / ESTIMATOR APP

### BuildMyAgent Chatbot
- Floating widget, bottom-right
- Embed script goes in `app/layout.jsx`
- Z-index: 998 (below sticky mobile CTA bar at 999)

### Gated Estimator (Homepage)
- After user fills in name/email/phone on homepage → estimator component loads
- State variable: `estUnlocked === true` → render `<Estimator />` component
- Component file: `/components/Estimator.jsx` (imported directly into homepage)
- Claude API calls route through: `/api/claude.js` server route
- This is the "Anthropic API in Claude" integration — uses claude-sonnet-4

### Contractor Portal
- Separate deployment at contractors.jronegutters.com or /contractors
- Password-protected route
- Not linked from main navigation

---

## SECTION 16: SERVER / INFRASTRUCTURE

### Production Server (OpenClaw)
- **Server:** srv1419643
- **Tailscale IP:** 100.86.255.92
- **Username:** popeye
- **SSH command:** `ssh popeye@100.86.255.92`
- **Mac Mini Tailscale IP:** 100.77.111.95 (hostname: johns-mac-mini)

### Key Rule for Server Work
For any OpenClaw work, always SSH into the server and interact directly with the terminal. Never ask Christopher to paste output — SSH in and read it directly.

---

## SECTION 17: KNOWN WEBSITE ISSUES (To Fix)

From SEO audit (March 2026):
1. /service-area/ page redirects to homepage instead of actual service area content
2. Duplicate blog posts (need canonical tags or removal)
3. AI-generated alt text on images (needs human rewrite)
4. Missing city-specific landing pages (only 1 exists — need 20+)
5. Products page has thin content
6. No FAQ schema markup
7. No local business schema
8. No Google Analytics 4 tracking
9. No Search Console verification
10. No 301 redirects from old URL structure

---

## SECTION 18: LAUNCH PRIORITY ORDER

1. Deploy all pages to Vercel with domain pointed
2. Set up form → email notifications (immediate lead capture)
3. Add BuildMyAgent chatbot embed
4. Migrate photos from current site (WebP, optimized)
5. Set up 301 redirects from old URLs
6. Add schema markup (LocalBusiness, FAQ, Service)
7. Connect Builder Prime API
8. Integrate estimator app
9. Begin publishing blog posts (2-3/week per schedule below)
10. Set up GA4 + Search Console
11. Create Spanish page translations

### Blog Publishing Schedule
- **Week 1-2:** Posts 1, 26, 46, 29, 47 (cost/pricing — highest commercial intent)
- **Week 3-4:** Posts 42, 2, 48, 12, 31 (problem/solution)
- **Week 5-6:** Posts 81-86 (city pages: Tampa, Clearwater, St Pete, Sarasota)
- **Week 7-8:** Posts 3, 7, 14, 28, 54 (comprehensive guides)
- **Week 9-10:** Posts 87-92 (more city pages)
- **Week 11-12:** Posts 66-70 (siding content)
- **Week 13-16:** Posts 93-100 (remaining city pages)
- **Ongoing:** 2 new posts/week minimum

---

## SECTION 19: GOOGLE BUSINESS PROFILE DATA

- **Place ID:** ChIJJ5X3uyzDwogRjqf87jhh9tQ
- **GBP Calls (2025):** 193 total
- **GBP Interactions (2025):** 493 total
- **Average Map Rank:** 8.68 (goal: top 5)
- **Share of Local Voice:** Low — needs more reviews and local content
- **Current SEO Provider:** Scott & Tania Amity — $2,700/month
  - GBP work: decent
  - Organic SEO: failing (keywords collapsed from 104 to 12 mid-2025)

---

## SECTION 20: COMPETITIVE INTELLIGENCE

### Main Competitor: Westfall Roofing
- Founded 1989, 4 FL offices, ~51 employees
- Tagline: "The Roofer You Can Count On"
- 4.7★ Google with ~2,000 reviews
- Owens Corning Platinum Preferred (top 1% nationally)
- **Weakness:** Gutters, soffit, fascia are subcontracted — generates complaints about sagging gutters, incorrect pitch, soffit falling down
- **JR One's counter-positioning:** "Your roofer does roofs. We do gutters, soffit, and fascia — and we do them right."

### What to Mirror from Westfall
- Branded customer experience process (e.g., "The JR One Standard")
- Empathy-first copy — lead with homeowner anxiety before selling
- Review volume as a competitive moat
- City-specific landing pages (already done — 21 cities)
- Educational blog content (100 posts written)
- Downloadable license/insurance docs for transparency

---

## SECTION 21: EMAIL SEQUENCES (Written — Ready to Deploy)

1. **Quote Follow-Up** — 5 emails over 14 days for unconverted leads
2. **Post-Job Nurture** — 5 emails over 12 months for completed customers (referrals, reviews, maintenance)
3. **Seasonal Storm Prep** — 3 emails for hurricane season outreach (May-June timing)

All sequences stored in: `JR_One_Email_Sequences.pdf` / `JR_One_Email_Sequences.docx`

---

## SECTION 22: COMPLETE FILE INVENTORY

### JSX Website Pages
```
jr-one-homepage.jsx          → /
jr-one-gutters-page.jsx      → /seamless-aluminum-gutters
jr-one-guards-page.jsx       → /gutter-guards
jr-one-soffit-fascia-page.jsx → /soffit-and-fascia
jr-one-siding-page.jsx       → /siding
jr-one-repair-page.jsx       → /gutter-repair
jr-one-peak301-page.jsx      → /peak-301
jr-one-copper-page.jsx       → /copper-gutters
jr-one-about-page.jsx        → /about
jr-one-contact-page.jsx      → /contact
jr-one-projects-page.jsx     → /projects
jr-one-city-pages.jsx        → /areas/[city-slug]
jr-one-warranty-page.jsx     → /warranties
jr-one-financing-page.jsx    → /financing
jr-one-service-plans-page.jsx → /service-plans
jr-one-govee-lights-page.jsx → /govee-lights
jr-one-faq-page.jsx          → /faq
jr-one-referral-page.jsx     → /referral
jr-one-insurance-resource-center.jsx → /insurance-resource-center
```

### HTML Tools (Standalone — No Framework)
```
jr-one-aerial-measure-tool.html  → Aerial estimator / lead capture
jrone_gutters_roi_blue.html      → ROI calculator (sales tool)
insurance_agent_outreach_email.html → Insurance agency email template
```

### Python Scripts (Email Automation)
```
run_outreach.py             → Main outreach runner (homeowners)
generate_email.py           → Email content generator using Claude API
run_agency_outreach.py      → Insurance agency outreach runner
generate_pdfs.py            → PDF generator (English)
generate_pdfs_es.py         → PDF generator (Spanish)
```

### Google Apps Script
```
google-apps-script.js       → Backend for aerial estimator email sending
```

### Config & Auth
```
config.json                 → API keys, outreach settings
credentials.json            → Gmail OAuth2 credentials
token.json                  → Gmail OAuth2 token
outreach-send-log.json      → Log of all emails sent
```

### PDFs (Downloadable Assets)
```
JR_One_Lead_Generation_Strategy.pdf
JR_One_Competitive_Brief.pdf
JR_One_SEO_Landing_Pages.pdf
JR_One_SEO_Blog_Posts.pdf
JR_One_Email_Sequences.pdf
JR_One_90Day_Campaign_Plan.pdf
JR_One_Peak301_Treatment_Certificate.pdf
JR_One_Peak301_What_To_Expect.pdf
JR_One_FL_Roof_Insurance_Rights.pdf
JR_One_Insurance_Letter_Template.pdf
esJR_One_Peak301_Treatment_Certificate.pdf
esJR_One_FL_Roof_Insurance_Rights.pdf
esJR_One_Peak301_What_To_Expect.pdf
esJR_One_Insurance_Letter_Template.pdf
```

### DOCX Files (Blog Posts, Sequences, Strategy)
```
Blog_Posts_01_10.docx through Blog_Posts_91_100.docx  (100 posts, 124,000+ words)
JR_One_90Day_Campaign_Plan.docx
JR_One_Competitive_Brief.docx
JR_One_Email_Sequences.docx
JR_One_SEO_Blog_Posts.docx
JR_One_SEO_Landing_Pages.docx
JR_One_Terms_and_Conditions.docx
JR_One_Peak301_Insurance_Blog_Posts.docx
```

### Data Files
```
insurance_agency_repository.csv   → 38 insurance agencies (Name, Type, City, Area, Phone, Website, Notes)
JR_One_Product_Pricing_Catalog.txt → Full Builder Prime catalog (81 items, 19 categories)
```

### HTML Email Templates (Outreach)
```
carol-oglevie.html
kevin-camara.html
stronghold-roofing.html
sabrina-hill.html
valerie-harris.html
teresa-rorer.html
nick-mylo.html
robert-mosel.html
joe-hughes.html
pattie-blankenship.html
```

### Documentation
```
CLAUDE.md                          → Master project context (for Claude AI sessions)
JR_One_Website_Deployment_Guide.md → Complete deployment + integration instructions
AERIAL-ESTIMATOR-SETUP-GUIDE.md    → Step-by-step setup for aerial tool
synopsis.txt                       → Last outreach batch report (batch #6, March 24 2026)
```

---

## SECTION 23: QUICK REFERENCE — CONTACTS & KEYS

| Item | Value |
|------|-------|
| Website | jronegutters.com |
| Phone | (844) 444-3114 |
| Primary email | jrone.business@gmail.com |
| Sending email | info@jronegutters.com |
| Builder Prime subdomain | jronegutters |
| Google Place ID | ChIJJ5X3uyzDwogRjqf87jhh9tQ |
| Server SSH | ssh popeye@100.86.255.92 |
| Tailscale IP | 100.86.255.92 |
| Mac Mini IP | 100.77.111.95 |

---

*Generated: April 3, 2026 | JR One Aluminum LLC | Tampa, FL*
*Use this document as full context when working on any JR One Aluminum project, website, or automation.*
