# JR One Aluminum — Website (Next.js 16)

**46 pages** • **21 city landing pages** • **Blog engine** • **API routes** • **SEO-optimized**

Built: April 2026 | Framework: Next.js 16.2 | Deploy target: Vercel

---

## Quick Deploy to Vercel

### 1. Push to GitHub

```bash
cd jr-one-website
git init
git add .
git commit -m "JR One Aluminum website - initial deploy"
git remote add origin https://github.com/YOUR_USERNAME/jr-one-website.git
git push -u origin main
```

### 2. Connect to Vercel

1. Go to [vercel.com](https://vercel.com) → Import Project → Select the GitHub repo
2. Framework preset: **Next.js** (auto-detected)
3. Add environment variables (see below)
4. Click **Deploy**

### 3. Environment Variables (add in Vercel dashboard)

| Variable | Value | Notes |
|----------|-------|-------|
| `GMAIL_USER` | jrone.business@gmail.com | For lead email notifications |
| `GMAIL_APP_PASSWORD` | (your app password) | Gmail app password, NOT regular password |
| `BUILDER_PRIME_API_KEY` | (from BP support) | Contact Builder Prime for API access |
| `ANTHROPIC_API_KEY` | (your key) | For estimator chatbot |

### 4. Point Domain

In your domain registrar (GoDaddy, Namecheap, etc.):
- Add a **CNAME record**: `www` → `cname.vercel-dns.com`
- Or add an **A record**: `@` → `76.76.21.21`
- In Vercel dashboard → Settings → Domains → Add `jronegutters.com`

---

## Site Structure (46 pages)

### Service Pages (8)
| Route | Page |
|-------|------|
| `/` | Homepage |
| `/seamless-aluminum-gutters` | Seamless Gutters |
| `/gutter-guards` | Gutter Guards |
| `/soffit-and-fascia` | Soffit & Fascia |
| `/siding` | Siding |
| `/gutter-repair` | Gutter Repair |
| `/peak-301` | Peak 301 Roof Rejuvenation |
| `/copper-gutters` | Copper Gutters |

### Business Pages (7)
| Route | Page |
|-------|------|
| `/about` | About Us |
| `/contact` | Contact |
| `/projects` | Projects/Gallery |
| `/warranties` | Warranties |
| `/financing` | Financing |
| `/service-plans` | Service Plans |
| `/govee-lights` | Govee Lights |
| `/faq` | FAQ |

### City Landing Pages (21)
All under `/areas/[city-slug]`:
tampa, clearwater, st-petersburg, sarasota, bradenton, lakeland, brandon,
wesley-chapel, palm-harbor, riverview, new-port-richey, largo, spring-hill,
tarpon-springs, land-o-lakes, dunedin, ruskin, sun-city-center,
temple-terrace, plant-city, lutz

### Blog
| Route | Page |
|-------|------|
| `/blog` | Blog index with search + category filter |
| `/blog/[slug]` | Individual blog post |

### API Routes
| Route | Purpose |
|-------|---------|
| `/api/send-lead` | Form submissions → Email + Builder Prime |

### Auto-generated
- `/sitemap.xml` — Dynamic sitemap with all pages
- `/robots.txt` — Search engine directives

---

## Publishing Blog Posts

Blog posts are Markdown files in `/content/blog/`. Each file needs frontmatter:

```markdown
---
title: "Your Post Title"
description: "Meta description for SEO"
date: "2026-04-01"
category: "Gutters"
keyword: "primary seo keyword"
faqs:
  - question: "Question text?"
    answer: "Answer text."
---

# Post content here in Markdown
```

### Publishing schedule (from CLAUDE.md):
- **Week 1-2:** Posts 1, 26, 46, 29, 47 (cost/pricing — highest intent)
- **Week 3-4:** Posts 42, 2, 48, 12, 31 (problem/solution)
- **Week 5-6:** Posts 81-86 (city landing pages)
- Continue per schedule...

The 100 blog posts are in `Blog_Posts_01_10.docx` through `Blog_Posts_91_100.docx`.
Convert each to `.md`, add frontmatter, drop in `/content/blog/`.

---

## Post-Deploy Checklist

1. ☐ Verify all 17 pages load correctly
2. ☐ Test form submission (check email arrives at jrone.business@gmail.com)
3. ☐ Add BuildMyAgent chatbot embed ID in `app/layout.js`
4. ☐ Add GA4 measurement ID in `app/layout.js`
5. ☐ Set up Google Search Console (verify ownership)
6. ☐ Submit sitemap: `https://jronegutters.com/sitemap.xml`
7. ☐ Migrate photos from current site → `/public/images/projects/`
8. ☐ Replace all 📸 placeholder divs with actual `<img>` tags
9. ☐ Confirm 301 redirects work for old URLs
10. ☐ Connect Builder Prime API (contact their support for endpoint docs)
11. ☐ Begin publishing blog posts (2-3/week)
12. ☐ Start Spanish translations (homepage toggle already built in)

---

## Local Development

```bash
npm install
cp .env.example .env.local   # Fill in your keys
npm run dev                   # http://localhost:3000
```

---

## Tech Stack

- **Framework:** Next.js 16.2 (App Router)
- **Styling:** Inline styles (brand tokens built into each component)
- **Fonts:** Montserrat + Source Sans 3 (Google Fonts, injected client-side)
- **Email:** Nodemailer + Gmail
- **Blog:** Markdown + gray-matter + remark
- **Deploy:** Vercel (recommended)
- **Schema:** LocalBusiness, FAQ, Service (JSON-LD)
