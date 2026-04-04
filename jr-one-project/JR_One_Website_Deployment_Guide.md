# JR ONE ALUMINUM — WEBSITE DEPLOYMENT & INTEGRATION GUIDE
## Complete Handoff Document

---

## SITE INVENTORY (17 Pages Built)

| # | Page | File | Route |
|---|------|------|-------|
| 1 | Homepage | jr-one-homepage.jsx | / |
| 2 | Seamless Gutters | jr-one-gutters-page.jsx | /seamless-aluminum-gutters |
| 3 | Gutter Guards | jr-one-guards-page.jsx | /gutter-guards |
| 4 | Soffit & Fascia | jr-one-soffit-fascia-page.jsx | /soffit-and-fascia |
| 5 | Siding | jr-one-siding-page.jsx | /siding |
| 6 | Gutter Repair & Maintenance | jr-one-repair-page.jsx | /gutter-repair |
| 7 | Peak 301 Roof Rejuvenation | jr-one-peak301-page.jsx | /peak-301 |
| 8 | Copper Gutters | jr-one-copper-page.jsx | /copper-gutters |
| 9 | About Us | jr-one-about-page.jsx | /about |
| 10 | Contact | jr-one-contact-page.jsx | /contact |
| 11 | Projects/Gallery | jr-one-projects-page.jsx | /projects |
| 12 | City Landing Pages (21 cities) | jr-one-city-pages.jsx | /areas/[city-slug] |
| 13 | Warranties | jr-one-warranty-page.jsx | /warranties |
| 14 | Financing | jr-one-financing-page.jsx | /financing |
| 15 | Service Plans | jr-one-service-plans-page.jsx | /service-plans |
| 16 | Govee Lights | jr-one-govee-lights-page.jsx | /govee-lights |
| 17 | FAQ | jr-one-faq-page.jsx | /faq |

---

## 1. DEPLOYMENT (Next.js on Vercel)

### Setup Steps:
1. Create a new Next.js project: `npx create-next-app@latest jr-one-website`
2. Place each .jsx file in `/app/[route]/page.jsx` following the routes above
3. The city pages component accepts a `citySlug` prop — use Next.js dynamic routes: `/app/areas/[slug]/page.jsx`
4. Push to GitHub and connect to Vercel for automatic deployments
5. Point jronegutters.com DNS to Vercel (A record or CNAME)

### Environment Variables Needed:
- BUILDER_PRIME_API_KEY (for form submissions)
- ANTHROPIC_API_KEY (for estimator app chatbot)
- GMAIL_USER + GMAIL_APP_PASSWORD (for email notifications)

---

## 2. FORM SUBMISSIONS → Builder Prime + Email

Every page has a quote/contact form. On submit, the form should:
1. Send POST to /api/send-lead endpoint
2. That endpoint does TWO things:
   a. Creates a lead in Builder Prime via their API
   b. Sends email notification to jrone.business@gmail.com

### Builder Prime Integration:
- Contact Builder Prime support for API documentation
- Map form fields: name → contact name, phone → phone, email → email, service → lead source/type, zip → address zip
- Set lead status to "New" or "Web Lead"

### Email Notification:
- Use Nodemailer with Gmail app password (already set up in the outreach system)
- Send to: jrone.business@gmail.com
- Subject: "New Web Lead: [Name] — [Service] — [ZIP]"
- Include all form fields + timestamp + which page they submitted from

---

## 3. BUILDMYAGENT CHATBOT

### Integration:
1. Log into BuildMyAgent dashboard
2. Get the embed script/snippet for the JR One chatbot
3. Add the script tag to the site's root layout (app/layout.jsx)
4. It will appear as a floating widget on every page

### Placement:
- Bottom-right corner (standard)
- Ensure it doesn't overlap with the sticky mobile CTA bar
- Add z-index management: chatbot z-index should be 998 (below the sticky CTA at 999)

---

## 4. ESTIMATOR APP INTEGRATION

### The gated estimator on the homepage:
1. The estimator app (jr-one-quote-app.jsx from previous build) needs to be deployed
2. On the homepage, after a user fills in name/email/phone, the estimator component loads
3. Two options for integration:
   a. Import the estimator component directly into the homepage (same codebase)
   b. Embed via iframe from a separate deployment

### Recommended: Option A (direct import)
- Place the estimator app component in /components/Estimator.jsx
- On the homepage, when estUnlocked === true, render <Estimator /> instead of the placeholder
- The estimator's Claude API calls go through /api/claude.js server route

### Contractor Portal:
- Deploy separately at contractors.jronegutters.com or /contractors (password-protected route)
- Not linked from main navigation

---

## 5. PHOTOS FROM CURRENT SITE

### Current photo sources:
- jronegutters.com/projects/ — 27 pages × 3 projects = ~80 projects with photos
- CompanyCam API — 300+ projects with thousands of photos
- Instagram @jronegutters — 56 posts

### Photo Migration Steps:
1. Crawl jronegutters.com/wp-content/gallery/ for all project images
2. Download and optimize (WebP format, max 1200px wide, quality 80%)
3. Organize into folders: /public/images/projects/[project-type]/
4. Replace all 📸 placeholder divs with actual <img> tags
5. Write descriptive alt text for every image (NOT AI-generated)

### Priority Photos Needed:
- Hero images for each service page (1 per page = 8 photos)
- Gallery/Projects page (3-5 photos per project card = 40-60 photos)
- About Us page (2 photos: early days/family, crew at work)
- City pages can share a rotating set of Tampa Bay project photos

---

## 6. BLOG PUBLISHING (100 Posts)

### Blog posts are written and stored in:
- Blog_Posts_01_10.docx through Blog_Posts_91_100.docx (project files)
- 100 total posts, 124,000+ words

### Publishing Approach:
1. Create /app/blog/page.jsx (blog index with search/filter)
2. Create /app/blog/[slug]/page.jsx (individual post template)
3. Convert each .docx post to Markdown
4. Store as .md files in /content/blog/
5. Use gray-matter + remark for Markdown → HTML rendering

### Post Template Should Include:
- Meta title and description (provided in each post)
- H1 headline
- Author: JR One Aluminum
- Published date
- Reading time estimate
- Body content with proper heading hierarchy
- Internal links to service pages
- CTA at bottom: quote form or phone number
- FAQ schema markup for posts with FAQ sections
- Related posts sidebar

### Publishing Schedule (from CLAUDE.md):
- 2-3 posts per week
- Week 1-2: Posts 1, 26, 46, 29, 47 (cost/pricing — highest intent)
- Week 3-4: Posts 42, 2, 48, 12, 31 (problem/solution)
- Week 5-6: Posts 81-86 (city landing pages)
- Continue per the schedule in CLAUDE.md

---

## 7. SCHEMA MARKUP (Add to Every Page)

### LocalBusiness Schema (site-wide, in layout.jsx):
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

### FAQ Schema (on every page with FAQs):
Generate JSON-LD from the FAQ arrays in each component. Example:
```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How much do new gutters cost in Tampa?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Seamless aluminum gutter installation..."
      }
    }
  ]
}
```

### Service Schema (on each service page):
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

## 8. EN/ES LANGUAGE TOGGLE

### Implementation:
- Homepage already has full EN/ES translations built in
- For all other pages, create a /es/ route prefix: /es/seamless-aluminum-gutters, /es/soffit-and-fascia, etc.
- Use Next.js i18n routing or a simple language context provider
- Start with homepage toggle, then translate service pages in priority order
- Blog posts: translate top 20 posts to Spanish first (per CLAUDE.md plan)

---

## 9. REDIRECTS (Critical for SEO)

### When the new site goes live, set up 301 redirects from old URLs:
- /service-area/ → / (was already broken/redirecting)
- /gutters/gutter-repair/ → /gutter-repair
- /gutters/gutter-cleaning/ → /service-plans
- /areas-served/tampa/ → /areas/tampa
- /service-area/south-tampa/ → /areas/tampa
- All old city pages → new /areas/[city] routes
- Any duplicate blog post URLs → canonical version

---

## 10. ANALYTICS & TRACKING

### Set up:
- Google Analytics 4 (GA4) on all pages
- Google Search Console (verify ownership)
- Google Tag Manager for event tracking
- Track: form submissions, phone clicks, estimator unlocks, email signups, FAQ interactions
- Set up conversion goals: form submit, phone click, estimator gate unlock

---

## PRIORITY ORDER FOR LAUNCH

1. Deploy pages to Vercel with domain pointed
2. Set up form → email notifications (immediate lead capture)
3. Add BuildMyAgent chatbot embed
4. Migrate photos from current site
5. Set up 301 redirects from old URLs
6. Add schema markup
7. Connect Builder Prime API
8. Integrate estimator app
9. Begin publishing blog posts (2-3/week)
10. Set up GA4 + Search Console
11. Create Spanish page translations
