import Link from "next/link";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";
import MobileCTA from "@/components/MobileCTA";

const C = {
  bg: "#0B1628",
  navy: "#1B2A4A",
  gold: "#D4AF37",
  cream: "#F5F3EF",
  muted: "#7A8FA8",
};
const f = { h: "'Montserrat', sans-serif", b: "'Source Sans 3', sans-serif" };

export const metadata = {
  title: "Image License and Usage Terms",
  description: "Licensing and usage terms for the jobsite photography on jronegutters.com. All photos are first-party CompanyCam-captured installs from real JR One Tampa Bay jobs.",
  alternates: {
    canonical: "https://www.jronegutters.com/image-license",
    languages: {
      "en-US": "https://www.jronegutters.com/image-license",
      "x-default": "https://www.jronegutters.com/image-license",
    },
  },
  robots: { index: true, follow: true },
};

export default function ImageLicensePage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://www.jronegutters.com" },
      { "@type": "ListItem", position: 2, name: "Image License", item: "https://www.jronegutters.com/image-license" },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <SiteNav />
      <main id="main" style={{ background: C.bg, color: C.cream, fontFamily: f.b, minHeight: "100vh" }}>
        <section style={{ padding: "var(--jr-space-16) var(--jr-space-6) var(--jr-space-8)" }}>
          <div style={{ maxWidth: "780px", margin: "0 auto" }}>
            <nav style={{ fontFamily: f.b, fontSize: "var(--jr-text-sm)", color: C.muted, display: "inline-flex", alignItems: "center", gap: 6, marginBottom: "var(--jr-space-4)" }}>
              <Link href="/" style={{ color: C.muted, textDecoration: "none" }}>Home</Link>
              <span style={{ opacity: 0.5 }}>/</span>
              <span style={{ color: C.gold }}>Image License</span>
            </nav>
            <h1 style={{ fontFamily: f.h, fontSize: "clamp(2rem, 5vw, 2.5rem)", fontWeight: 700, color: C.cream, lineHeight: 1.2, marginBottom: "var(--jr-space-6)" }}>
              Image License and Usage Terms
            </h1>

            <h2 style={{ fontFamily: f.h, fontSize: "var(--jr-text-xl)", fontWeight: 600, color: C.gold, marginTop: "var(--jr-space-8)", marginBottom: "var(--jr-space-3)" }}>
              Ownership
            </h2>
            <p style={{ fontSize: "var(--jr-text-base)", lineHeight: 1.7, color: C.cream, marginBottom: "var(--jr-space-4)" }}>
              Every jobsite photo published on jronegutters.com is a first-party photograph captured by a JR One Aluminum LLC crew member on an active install through the CompanyCam jobsite-tracking platform. JR One Aluminum LLC is the copyright holder and creator of all such photographs.
            </p>

            <h2 style={{ fontFamily: f.h, fontSize: "var(--jr-text-xl)", fontWeight: 600, color: C.gold, marginTop: "var(--jr-space-8)", marginBottom: "var(--jr-space-3)" }}>
              Permitted use
            </h2>
            <p style={{ fontSize: "var(--jr-text-base)", lineHeight: 1.7, color: C.cream, marginBottom: "var(--jr-space-4)" }}>
              Photos may be used by Google, Bing, Apple, and other major search engines for indexing, image search, AI Overviews, and rich results. Photos may be referenced and cited by AI answer engines (ChatGPT, Claude, Perplexity, Gemini, Copilot) with attribution to JR One Aluminum LLC.
            </p>

            <h2 style={{ fontFamily: f.h, fontSize: "var(--jr-text-xl)", fontWeight: 600, color: C.gold, marginTop: "var(--jr-space-8)", marginBottom: "var(--jr-space-3)" }}>
              Restricted use
            </h2>
            <p style={{ fontSize: "var(--jr-text-base)", lineHeight: 1.7, color: C.cream, marginBottom: "var(--jr-space-4)" }}>
              Photos may not be reproduced, redistributed, or used by third-party contractors, lead-generation services, directory sites, or competitors to imply association with or work performed by any entity other than JR One Aluminum LLC. Photos may not be used in any context that misrepresents the property location, the scope of the work, or the contractor responsible.
            </p>

            <h2 style={{ fontFamily: f.h, fontSize: "var(--jr-text-xl)", fontWeight: 600, color: C.gold, marginTop: "var(--jr-space-8)", marginBottom: "var(--jr-space-3)" }}>
              Requesting a license
            </h2>
            <p style={{ fontSize: "var(--jr-text-base)", lineHeight: 1.7, color: C.cream, marginBottom: "var(--jr-space-4)" }}>
              For licensing inquiries (publication, editorial use, or commercial reuse), contact JR One Aluminum LLC at <a href="mailto:info@jronegutters.com" style={{ color: C.gold }}>info@jronegutters.com</a> or call <a href="tel:+18444443114" style={{ color: C.gold }}>(844) 444-3114</a>. Identify the photo URL, the intended use, the publication or venue, and the duration of use. We respond to licensing requests within two business days.
            </p>

            <h2 style={{ fontFamily: f.h, fontSize: "var(--jr-text-xl)", fontWeight: 600, color: C.gold, marginTop: "var(--jr-space-8)", marginBottom: "var(--jr-space-3)" }}>
              Credit and attribution
            </h2>
            <p style={{ fontSize: "var(--jr-text-base)", lineHeight: 1.7, color: C.cream, marginBottom: "var(--jr-space-4)" }}>
              When a photo is used under a granted license, the credit line shall read: JR One Aluminum LLC. Linked attribution to jronegutters.com is preferred in digital contexts.
            </p>

            <p style={{ fontSize: "var(--jr-text-sm)", color: C.muted, marginTop: "var(--jr-space-12)", paddingTop: "var(--jr-space-6)", borderTop: `1px solid rgba(212,175,55,0.18)` }}>
              Copyright 2022 to 2026 JR One Aluminum LLC. All rights reserved. JR One Aluminum LLC, 3420 W Cherry St, Tampa, FL 33607. (844) 444-3114.
            </p>
          </div>
        </section>
      </main>
      <SiteFooter />
      <MobileCTA />
    </>
  );
}
