import Script from "next/script";
import "./globals.css";
import { Providers } from "./providers";

// ── LocalBusiness + HomeAndConstructionBusiness Schema ──
const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "HomeAndConstructionBusiness",
  name: "JR One Aluminum LLC",
  url: "https://jronegutters.com",
  telephone: "(844) 444-3114",
  email: "info@jronegutters.com",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Tampa",
    addressRegion: "FL",
    addressCountry: "US",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: "27.9506",
    longitude: "-82.4572",
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.9",
    reviewCount: "55",
  },
  priceRange: "$$",
  areaServed: [
    "Tampa","Clearwater","St. Petersburg","Sarasota","Bradenton",
    "Lakeland","Brandon","Wesley Chapel","Palm Harbor","Riverview",
    "New Port Richey","Largo","Spring Hill","Tarpon Springs",
    "Land O' Lakes","Dunedin","Ruskin","Sun City Center",
    "Temple Terrace","Plant City","Lutz",
  ],
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

        {/* ── Google Analytics 4 ──
            Replace G-XXXXXXXXXX with actual GA4 measurement ID */}
        {/* <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"
          strategy="afterInteractive"
        />
        <Script id="ga4-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-XXXXXXXXXX');
          `}
        </Script> */}
      </body>
    </html>
  );
}
