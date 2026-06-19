"use client";

import Link from "next/link";
import { useLanguage } from "../../../lib/LanguageContext";
import MobileCTA from "../../../components/MobileCTA";
import { localizeHref } from "../../../lib/locale";

const C = {
  bg: "#0B1628", navy: "#1B2A4A", navyMid: "#243556", navyLight: "#2C3E5A",
  gold: "#D4AF37", goldLight: "#F2CD69", goldPale: "rgba(200,149,46,0.12)",
  cream: "#F5F3EF", white: "#FFFFFF", muted: "#7A8FA8", charcoal: "#2D2D2D",
};
const f = { h: "'Montserrat', sans-serif", b: "'Source Sans 3', sans-serif" };

const T = {
  en: {
    backToBlog: "← Back to Blog",
    byAuthor: "By JR One Aluminum",
    minRead: " min read",
    readyEstimate: "Ready for a Free Estimate?",
    ctaDesc: "Tampa Bay's aluminum specialists. Family-owned. Over 30 years in the Tampa Bay gutter industry. In-house crews.",
    callCta: "Call (844) 444-3114",
    getQuote: "Get Free Quote",
    relatedArticles: "Related Articles",
    faqHeading: "Frequently Asked Questions",
    dateLocale: "en-US",
  },
  es: {
    backToBlog: "← Volver al Blog",
    byAuthor: "Por JR One Aluminum",
    minRead: " min de lectura",
    readyEstimate: "Listo para una Cotizacion Gratis?",
    ctaDesc: "Especialistas en aluminio de Tampa Bay. Empresa familiar. Mas de 30 anos en la industria de canaletas de Tampa Bay. Equipos propios.",
    callCta: "Llamar al (844) 444-3114",
    getQuote: "Cotizacion Gratis",
    relatedArticles: "Articulos Relacionados",
    faqHeading: "Preguntas Frecuentes",
    dateLocale: "es-US",
  },
};

export default function BlogPost({ post, related }) {
  const { lang } = useLanguage();
  const t = T[lang];
  return (
    <div style={{ background: C.bg, minHeight: "100vh", fontFamily: f.b }}>
      {/* Back link */}
      <div style={{ maxWidth: "780px", margin: "0 auto", padding: "20px 20px 0" }}>
        <Link href={localizeHref("/blog", lang)} style={{ fontFamily: f.h, fontSize: "13px", color: C.gold, textDecoration: "none" }}>
          {t.backToBlog}
        </Link>
      </div>

      {/* Article header */}
      <article style={{ maxWidth: "780px", margin: "0 auto", padding: "30px 20px 60px" }}>
        <div style={{ marginBottom: "24px" }}>
          <span style={{
            display: "inline-block", padding: "6px 14px", background: C.goldPale, borderRadius: "4px",
            fontFamily: f.h, fontSize: "11px", fontWeight: 700, color: C.gold, letterSpacing: "2px",
            textTransform: "uppercase", marginBottom: "16px",
          }}>
            {post.category}
          </span>
          <h1 style={{
            fontFamily: f.h, fontSize: "clamp(26px, 5vw, 40px)", fontWeight: 800,
            color: C.white, lineHeight: 1.2, marginBottom: "16px",
          }}>
            {post.title}
          </h1>
          <div style={{ display: "flex", gap: "20px", alignItems: "center", color: C.muted, fontSize: "14px" }}>
            <span>{t.byAuthor}</span>
            <span>•</span>
            <span>{new Date(post.date).toLocaleDateString(t.dateLocale, { year: "numeric", month: "long", day: "numeric" })}</span>
            <span>•</span>
            <span>{post.readingTime}{t.minRead}</span>
          </div>
        </div>

        {/* Article body */}
        <div
          className="blog-content"
          dangerouslySetInnerHTML={{ __html: post.contentHtml }}
          style={{
            fontFamily: f.b, fontSize: "17px", lineHeight: 1.75, color: "#D1D5DB",
          }}
        />

        {/* FAQs — rendered from frontmatter as visible Q&A (AEO + readers).
            FAQPage JSON-LD intentionally omitted: Google retired the rich result June 2026. */}
        {post.faqs && post.faqs.length > 0 && (
          <section style={{ marginTop: "50px" }} aria-labelledby="post-faq-heading">
            <h2
              id="post-faq-heading"
              style={{ fontFamily: f.h, fontSize: "26px", fontWeight: 700, color: C.white, marginBottom: "20px" }}
            >
              {t.faqHeading}
            </h2>
            <div style={{ display: "grid", gap: "14px" }}>
              {post.faqs.map((faq, i) => (
                <div
                  key={i}
                  style={{
                    padding: "20px", background: C.navyMid, borderRadius: "10px",
                    border: `1px solid ${C.navyLight}`,
                  }}
                >
                  <h3 style={{ fontFamily: f.h, fontSize: "17px", fontWeight: 700, color: C.gold, marginBottom: "8px" }}>
                    {faq.question}
                  </h3>
                  <p style={{ fontFamily: f.b, fontSize: "16px", lineHeight: 1.7, color: "#D1D5DB", margin: 0 }}>
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* CTA */}
        <div style={{
          marginTop: "50px", padding: "32px", background: C.navyMid, borderRadius: "12px",
          border: `2px solid ${C.gold}`, textAlign: "center",
        }}>
          <h3 style={{ fontFamily: f.h, fontSize: "22px", fontWeight: 700, color: C.white, marginBottom: "10px" }}>
            {t.readyEstimate}
          </h3>
          <p style={{ fontFamily: f.b, fontSize: "16px", color: C.muted, marginBottom: "20px" }}>
            {t.ctaDesc}
          </p>
          <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
            <a
              href="tel:8444443114"
              style={{
                display: "inline-block", padding: "14px 28px", background: C.gold, color: C.white,
                fontFamily: f.h, fontSize: "15px", fontWeight: 700, borderRadius: "8px",
                textDecoration: "none", letterSpacing: "0.5px",
              }}
            >
              {t.callCta}
            </a>
            <Link
              href={localizeHref("/contact", lang)}
              style={{
                display: "inline-block", padding: "14px 28px", background: "transparent",
                color: C.gold, fontFamily: f.h, fontSize: "15px", fontWeight: 700,
                borderRadius: "8px", border: `2px solid ${C.gold}`, textDecoration: "none",
              }}
            >
              {t.getQuote}
            </Link>
          </div>
        </div>

        {/* Related posts */}
        {related.length > 0 && (
          <div style={{ marginTop: "50px" }}>
            <h3 style={{ fontFamily: f.h, fontSize: "20px", fontWeight: 700, color: C.white, marginBottom: "20px" }}>
              {t.relatedArticles}
            </h3>
            <div style={{ display: "grid", gap: "16px" }}>
              {related.map((r) => (
                <Link
                  key={r.slug}
                  href={localizeHref(`/blog/${r.slug}`, lang)}
                  style={{
                    display: "block", padding: "18px", background: C.navyMid, borderRadius: "10px",
                    border: `1px solid ${C.navyLight}`, textDecoration: "none",
                  }}
                >
                  <h4 style={{ fontFamily: f.h, fontSize: "16px", fontWeight: 600, color: C.white, marginBottom: "4px" }}>
                    {r.title}
                  </h4>
                  <span style={{ fontFamily: f.b, fontSize: "13px", color: C.muted }}>
                    {r.readingTime}{t.minRead}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        )}
      </article>

      <MobileCTA />

      {/* Blog content styles */}
      <style>{`
        .blog-content h2 {
          font-family: ${f.h};
          font-size: 26px;
          font-weight: 700;
          color: ${C.white};
          margin: 40px 0 16px;
        }
        .blog-content h3 {
          font-family: ${f.h};
          font-size: 21px;
          font-weight: 600;
          color: ${C.white};
          margin: 32px 0 12px;
        }
        .blog-content p {
          margin-bottom: 18px;
        }
        .blog-content a {
          color: ${C.gold};
          text-decoration: underline;
        }
        .blog-content ul, .blog-content ol {
          margin: 16px 0;
          padding-left: 24px;
        }
        .blog-content li {
          margin-bottom: 8px;
        }
        .blog-content strong {
          color: ${C.white};
          font-weight: 600;
        }
        .blog-content blockquote {
          border-left: 3px solid ${C.gold};
          padding: 12px 20px;
          margin: 20px 0;
          background: ${C.navyMid};
          border-radius: 0 8px 8px 0;
          font-style: italic;
        }
        .blog-content table {
          width: 100%;
          border-collapse: collapse;
          margin: 20px 0;
        }
        .blog-content th, .blog-content td {
          padding: 10px 14px;
          border: 1px solid ${C.navyLight};
          text-align: left;
        }
        .blog-content th {
          background: ${C.navyMid};
          color: ${C.gold};
          font-family: ${f.h};
          font-weight: 600;
        }
      `}</style>
    </div>
  );
}
