import Script from "next/script";
import "./globals.css";

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
  foundingDate: "1990",
  numberOfEmployees: "15-20",
  knowsLanguage: ["English", "Spanish"],
  sameAs: [
    "https://www.facebook.com/jronealuminum",
    "https://www.instagram.com/jronegutters",
  ],
};

export const metadata = {
  metadataBase: new URL("https://jronegutters.com"),
  title: {
    default: "JR One Aluminum LLC | Tampa Bay Gutters, Soffit & Fascia Specialists",
    template: "%s | JR One Aluminum",
  },
  description:
    "Tampa Bay's trusted aluminum specialists. Seamless gutter installation, soffit, fascia, siding, and gutter guards. 30+ years experience. In-house crews. Free estimates. (844) 444-3114.",
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
    title: "JR One Aluminum LLC | Tampa Bay Gutters, Soffit & Fascia Specialists",
    description:
      "Tampa Bay's trusted aluminum specialists. 30+ years experience. In-house crews. Free estimates.",
  },
  twitter: {
    card: "summary_large_image",
    title: "JR One Aluminum LLC",
    description: "Tampa Bay's trusted aluminum specialists. 30+ years. Free estimates.",
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  alternates: {
    canonical: "https://jronegutters.com",
  },
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
      </head>
      <body>
        {children}

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
