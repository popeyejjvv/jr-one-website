import Script from "next/script";
import "./globals.css";
import { Providers } from "./providers";

// ── LocalBusiness + HomeAndConstructionBusiness Schema ──
const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "HomeAndConstructionBusiness",
  "@id": "https://jronegutters.com/#business",
  name: "JR One Aluminum LLC",
  alternateName: "JR One Gutters",
  url: "https://jronegutters.com",
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
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.9",
    reviewCount: "55",
  },
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
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "JR One Aluminum Services",
    itemListElement: [
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Seamless Aluminum Gutter Installation", url: "https://jronegutters.com/seamless-aluminum-gutters" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Gutter Guards", url: "https://jronegutters.com/gutter-guards" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Soffit and Fascia Replacement", url: "https://jronegutters.com/soffit-and-fascia" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Gutter Repair", url: "https://jronegutters.com/gutter-repair" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Siding Installation", url: "https://jronegutters.com/siding" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Copper Gutters", url: "https://jronegutters.com/copper-gutters" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Drainage Installation", url: "https://jronegutters.com/drainage-assessment" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Peak 301 Roof Rejuvenation", url: "https://jronegutters.com/peak-301" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Sagiper Premium Cladding", url: "https://jronegutters.com/sagiper" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Govee Permanent Exterior Lighting", url: "https://jronegutters.com/govee-lights" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Gutter Cleaning & Maintenance", url: "https://jronegutters.com/gutter-cleaning" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "HOA Gutter & Soffit Maintenance Contracts", url: "https://jronegutters.com/hoa-contracts" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Rental & Airbnb Property Maintenance", url: "https://jronegutters.com/rental-property-maintenance" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Commercial Gutter & Aluminum Services", url: "https://jronegutters.com/commercial-gutters" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "7-Inch Oversized Seamless Gutters", url: "https://jronegutters.com/7-inch-gutters" } },
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

export const metadata = {
  metadataBase: new URL("https://jronegutters.com"),
  title: {
    default: "JR One Aluminum LLC | The Superior Soffit & Gutter Experts — Tampa Bay",
    template: "%s | JR One Aluminum",
  },
  description:
    "The Superior Soffit & Gutter Experts. Family-owned, over 30 years in the Tampa Bay gutter industry. Seamless gutters, soffit, fascia, siding, gutter guards. In-house crews. Free estimates. (844) 444-3114.",
  applicationName: "JR One Aluminum",
  authors: [{ name: "JR One Aluminum LLC", url: "https://jronegutters.com" }],
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
    url: "https://jronegutters.com",
    siteName: "JR One Aluminum LLC",
    title: "JR One Aluminum LLC — The Superior Soffit & Gutter Experts",
    description:
      "Family-owned. Over 30 years in the Tampa Bay gutter industry. In-house crews. Free estimates. (844) 444-3114.",
  },
  twitter: {
    card: "summary_large_image",
    title: "JR One Aluminum LLC — The Superior Soffit & Gutter Experts",
    description:
      "Family-owned. Over 30 years in the Tampa Bay gutter industry. In-house crews. Free estimates.",
  },
  manifest: "/manifest.json",
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  alternates: {
    canonical: "https://jronegutters.com",
  },
};

export const viewport = {
  themeColor: "#0B1628",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Google Fonts */}
        <link
          rel="preconnect"
          href="https://fonts.googleapis.com"
        />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800&family=Source+Sans+3:wght@300;400;600&display=swap"
          rel="stylesheet"
        />
        {/* LocalBusiness Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
        {/* Ahrefs Site Audit — HTML tag verification (added 2026-04-09) */}
        <meta
          name="ahrefs-site-verification"
          content="19a129f813202b159a550ff53c4ed7764b9664f901a134c96e3dae30520dae28"
        />
      </head>
      <body>
        <Providers>
        {children}
        </Providers>

        {/* ── Ahrefs Web Analytics ──
            Privacy-first, cookie-less analytics included with Ahrefs Lite.
            Installed 2026-04-09 during Phase 1 SEO activation.
            See ~/Desktop/JRONE/seo/ahrefs-baseline-2026-04-09.md */}
        <Script
          id="ahrefs-analytics"
          src="https://analytics.ahrefs.com/analytics.js"
          data-key="ZRxzzMEe3FBle/3vIs9F0Q"
          strategy="afterInteractive"
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
      </body>
    </html>
  );
}
