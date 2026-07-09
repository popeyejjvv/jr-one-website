import Script from "next/script";
import { headers } from "next/headers";
import { Montserrat, Source_Sans_3 } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-montserrat",
  display: "swap",
});

const sourceSans = Source_Sans_3({
  subsets: ["latin"],
  weight: ["300", "400", "600"],
  variable: "--font-source-sans",
  display: "swap",
});

// ── LocalBusiness + HomeAndConstructionBusiness Schema ──
const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "HomeAndConstructionBusiness",
  "@id": "https://jronegutters.com/#business",
  name: "JR One Aluminum LLC",
  alternateName: [
    "JR One Gutters",
    "JR Gutters",
    "JR Aluminum",
    "JR-One Aluminum",
    "JR1 Aluminum",
    "Jr One Aluminum",
  ],
  url: "https://www.jronegutters.com",
  image: [
    "https://www.jronegutters.com/images/seamless-gutter-install.webp",
    "https://www.jronegutters.com/images/soffit-fascia-detail.webp",
    "https://www.jronegutters.com/images/gutter-guard-installed.webp",
  ],
  telephone: "(844) 444-3114",
  email: "info@jronegutters.com",
  hasMap:
    "https://www.google.com/maps/place/JR+One+Aluminum+LLC+-+Gutter+Repair+%26+Installation/@27.961411,-82.5006675,17z/data=!3m1!4b1!4m6!3m5!1s0x88c2c32cbbf79527:0xd4f66138eefca78e!8m2!3d27.961411!4d-82.5006675",
  identifier: {
    "@type": "PropertyValue",
    propertyID: "Google Place ID",
    value: "ChIJJ5X3uyzDwogRjqf87jhh9tQ",
  },
  address: {
    "@type": "PostalAddress",
    streetAddress: "3420 W Cherry St",
    addressLocality: "Tampa",
    addressRegion: "FL",
    postalCode: "33607",
    addressCountry: "US",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: "27.961411",
    longitude: "-82.5006675",
  },
  // aggregateRating removed 2026-05-26 per audit Tier 1.7. Google's self-serving
  // review policy: a business's own LocalBusiness/Organization markup is INELIGIBLE
  // for the star rich result regardless of source. Stars in SERPs come from GBP.
  // Source: https://developers.google.com/search/docs/appearance/structured-data/review-snippet
  priceRange: "$$",
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],
      opens: "07:00",
      closes: "18:00",
    },
  ],
  areaServed: [
    "Tampa","Clearwater","St. Petersburg","Sarasota","Bradenton",
    "Lakeland","Brandon","Wesley Chapel","Palm Harbor","Riverview",
    "New Port Richey","Largo","Spring Hill","Tarpon Springs",
    "Land O' Lakes","Dunedin","Ruskin","Sun City Center",
    "Temple Terrace","Plant City","Lutz",
    "South Tampa","New Tampa","Valrico","Lithia","Oldsmar",
    "Safety Harbor","Seminole","Pinellas Park",
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "JR One Aluminum Services",
    itemListElement: [
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Seamless Aluminum Gutter Installation", url: "https://www.jronegutters.com/seamless-aluminum-gutters" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Gutter Guards", url: "https://www.jronegutters.com/gutter-guards" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Soffit and Fascia Replacement", url: "https://www.jronegutters.com/soffit-and-fascia" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Gutter Repair", url: "https://www.jronegutters.com/gutter-repair" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Siding Installation", url: "https://www.jronegutters.com/siding" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Copper Gutters", url: "https://www.jronegutters.com/copper-gutters" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Drainage Installation", url: "https://www.jronegutters.com/drainage-assessment" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Peak 301 Roof Rejuvenation", url: "https://www.jronegutters.com/peak-301" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Sagiper Premium Cladding", url: "https://www.jronegutters.com/sagiper" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Govee Permanent Exterior Lighting", url: "https://www.jronegutters.com/govee-lights" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Gutter Cleaning & Maintenance", url: "https://www.jronegutters.com/gutter-cleaning" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "HOA Gutter & Soffit Maintenance Contracts", url: "https://www.jronegutters.com/hoa-contracts" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Rental & Airbnb Property Maintenance", url: "https://www.jronegutters.com/rental-property-maintenance" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Commercial Gutter & Aluminum Services", url: "https://www.jronegutters.com/commercial-gutters" } },
    ],
  },
  numberOfEmployees: "15-20",
  knowsLanguage: ["English", "Spanish"],
  sameAs: [
    "https://www.facebook.com/people/Jr-One-Aluminum-LLC/61568068558954/",
    "https://www.instagram.com/jronegutters",
    "https://www.google.com/maps/place/JR+One+Aluminum+LLC+-+Gutter+Repair+%26+Installation/@27.9614157,-82.5032424,17z/data=!3m1!4b1!4m6!3m5!1s0x88c2c32cbbf79527:0xd4f66138eefca78e!8m2!3d27.961411!4d-82.5006675!16s%2Fg%2F11fcvc1w45",
  ],
};

// Brand-recognition Organization entity (paired with LocalBusiness via @id reference).
// Helps Google bind branded queries ("jr aluminum", "jr gutters") to this exact entity.
const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": "https://jronegutters.com/#organization",
  name: "JR One Aluminum LLC",
  alternateName: [
    "JR One Gutters",
    "JR Gutters",
    "JR Aluminum",
    "JR-One Aluminum",
    "JR1 Aluminum",
  ],
  legalName: "JR One Aluminum LLC",
  url: "https://www.jronegutters.com",
  logo: "https://www.jronegutters.com/images/seamless-gutter-install.webp",
  description: "Family-owned Tampa Bay aluminum specialty contractor. Seamless gutters (6 inch and 7 inch only), soffit, fascia, drainage, and Peak 301 roof rejuvenation. Over 30 years in the trade.",
  foundingDate: "2006",
  founders: [{ "@type": "Person", name: "Christopher J Rivera" }],
  sameAs: [
    "https://www.facebook.com/people/Jr-One-Aluminum-LLC/61568068558954/",
    "https://www.instagram.com/jronegutters",
    "https://www.google.com/maps/place/JR+One+Aluminum+LLC+-+Gutter+Repair+%26+Installation/@27.9614157,-82.5032424,17z/data=!3m1!4b1!4m6!3m5!1s0x88c2c32cbbf79527:0xd4f66138eefca78e!8m2!3d27.961411!4d-82.5006675!16s%2Fg%2F11fcvc1w45",
  ],
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "(844) 444-3114",
    contactType: "customer service",
    availableLanguage: ["English", "Spanish"],
    areaServed: "US",
  },
};

// WebSite brand entity. Binds branded queries ("jr aluminum", "jr gutters") to this site.
const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": "https://jronegutters.com/#website",
  url: "https://www.jronegutters.com",
  name: "JR One Aluminum",
  alternateName: ["JR One Gutters", "JR Aluminum", "JR Gutters"],
  inLanguage: ["en-US", "es-US"],
  publisher: { "@id": "https://jronegutters.com/#organization" },
};

export const metadata = {
  metadataBase: new URL("https://www.jronegutters.com"),
  title: {
    default: "JR One Aluminum LLC | Tampa Bay Gutters, Soffit, Fascia, Drainage",
    template: "%s | JR One Aluminum",
  },
  description:
    "Family-owned, over 30 years in the trade. Seamless gutters, soffit, fascia, drainage, Peak 301 roof rejuvenation. In-house crews, fully insured. Tampa Bay specialty trade contractor. Free estimates. (844) 444-3114.",
  applicationName: "JR One Aluminum",
  authors: [{ name: "JR One Aluminum LLC", url: "https://www.jronegutters.com" }],
  creator: "JR One Aluminum LLC",
  publisher: "JR One Aluminum LLC",
  keywords: [
    "gutter installation Tampa",
    "seamless gutters Tampa",
    "soffit and fascia Tampa",
    "gutter repair Tampa",
    "aluminum gutters Florida",
    "gutter guards Tampa",
    "siding Tampa FL",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.jronegutters.com",
    siteName: "JR One Aluminum LLC",
    title: "JR One Aluminum LLC | Tampa Bay Specialty Trade",
    description:
      "Family-owned. Over 30 years in the Tampa Bay gutter industry. In-house crews. Free estimates. (844) 444-3114.",
    images: [
      {
        url: "https://www.jronegutters.com/og/og-card.png",
        width: 1200,
        height: 630,
        alt: "JR One Aluminum LLC. Tampa Bay seamless gutters, soffit, fascia, drainage, Peak 301. Family-owned, 30+ years.",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "JR One Aluminum LLC | Tampa Bay Specialty Trade",
    description:
      "Family-owned. Over 30 years in the Tampa Bay gutter industry. In-house crews. Free estimates.",
    images: ["https://www.jronegutters.com/og/og-card.png"],
  },
  manifest: "/manifest.json",
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  alternates: {
    canonical: "https://www.jronegutters.com",
    languages: {
      "en-US": "https://www.jronegutters.com",
      "es-US": "https://www.jronegutters.com/es",
      "x-default": "https://www.jronegutters.com",
    },
  },
};

export const viewport = {
  themeColor: "#1B2A4A",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export default async function RootLayout({ children }) {
  const pathname = (await headers()).get("x-pathname") || "";
  const lang = pathname === "/es" || pathname.startsWith("/es/") ? "es" : "en";
  return (
    <html lang={lang} className={`${montserrat.variable} ${sourceSans.variable}`}>
      <head>
        {/* Fonts now self-hosted via next/font/google (above) — eliminates render-blocking
            external CSS request, cut LCP by ~1-2s on mobile per Lighthouse 2026-05-08. */}
        {/* AEO discovery, link AI crawlers to llms.txt + llms-full.txt (53-page AI content index) */}
        <link rel="llm" href="/llms.txt" />
        <link rel="llm-full" href="/llms-full.txt" />
        {/* LocalBusiness Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
        {/* Organization Schema (brand entity for "jr aluminum" / "jr gutters" branded queries) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        {/* WebSite Schema (brand entity for branded queries) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        {/* Ahrefs Site Audit, HTML tag verification (added 2026-04-09) */}
        <meta
          name="ahrefs-site-verification"
          content="19a129f813202b159a550ff53c4ed7764b9664f901a134c96e3dae30520dae28"
        />
        {/* Google Search Console, HTML tag verification (re-verified 2026-05-04 after prior method dropped) */}
        <meta
          name="google-site-verification"
          content="Kpcj-1KGIae9QG5XpTgV_Yf6utDcTVfRku0KA4WdZGo"
        />
      </head>
      <body>
        <Providers>
        <main>{children}</main>
        </Providers>

        {/* ── Ahrefs Web Analytics ──
            Privacy-first, cookie-less analytics included with Ahrefs Lite.
            Installed 2026-04-09 during Phase 1 SEO activation.
            See ~/Desktop/JRONE/seo/ahrefs-baseline-2026-04-09.md */}
        <Script
          id="ahrefs-analytics"
          src="https://analytics.ahrefs.com/analytics.js"
          data-key="ZRxzzMEe3FBle/3vIs9F0Q"
          strategy="lazyOnload"
        />

        {/* ── BuildMyAgent Chatbot ──
            Replace CHATBOT_EMBED_ID with actual embed ID from BuildMyAgent dashboard.
            z-index 998 so it sits below sticky mobile CTA (999). */}
        {/* <Script
          id="buildmyagent-chatbot"
          strategy="lazyOnload"
          src={`https://app.buildmyagent.com/widget/CHATBOT_EMBED_ID`}
        /> */}

        {/* ── Google Analytics 4 ── */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-HY6GK76P44"
          strategy="afterInteractive"
        />
        <Script id="ga4-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-HY6GK76P44');
          `}
        </Script>

        {/* ── Microsoft Clarity ── installed 2026-05-04, project wlqlwuzdj3. Deferred to lazyOnload (2026-05-24) per Lighthouse — session-replay tooling doesn't need to block LCP. */}
        <Script id="ms-clarity" strategy="lazyOnload">
          {`
            (function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
              y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "wlqlwuzdj3");
          `}
        </Script>

        {/* ── Meta Pixel ── added 2026-05-26 per audit Tier 1.4 fix. */}
        {/* Env-gated: renders nothing if NEXT_PUBLIC_META_PIXEL_ID is not set on */}
        {/* Vercel. Set the env var with the Pixel ID from Meta Business Manager */}
        {/* (Events Manager > Data Sources > the Pixel for jronegutters.com). */}
        {process.env.NEXT_PUBLIC_META_PIXEL_ID && (
          <>
            <Script id="meta-pixel" strategy="afterInteractive">
              {`
                !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
                n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
                t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,
                document,'script','https://connect.facebook.net/en_US/fbevents.js');
                fbq('init', '${process.env.NEXT_PUBLIC_META_PIXEL_ID}');
                fbq('track', 'PageView');
              `}
            </Script>
            <noscript>
              <img
                height="1"
                width="1"
                style={{ display: "none" }}
                alt=""
                src={`https://www.facebook.com/tr?id=${process.env.NEXT_PUBLIC_META_PIXEL_ID}&ev=PageView&noscript=1`}
              />
            </noscript>
          </>
        )}
      </body>
    </html>
  );
}
