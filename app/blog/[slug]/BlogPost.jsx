"use client";

import Link from "next/link";
import MobileCTA from "../../../components/MobileCTA";

const C = {
  bg: "#0B1628", navy: "#1B2A4A", navyMid: "#243556", navyLight: "#2C3E5A",
  gold: "#C8952E", goldLight: "#D4A843", goldPale: "rgba(200,149,46,0.12)",
  cream: "#F5F3EF", white: "#FFFFFF", muted: "#7A8FA8", charcoal: "#2D2D2D",
};
const f = { h: "'Montserrat', sans-serif", b: "'Source Sans 3', sans-serif" };

export default function BlogPost({ post, related }) {
  return (
    <div style={{ background: C.bg, minHeight: "100vh", fontFamily: f.b }}>
      {/* Back link */}
      <div style={{ maxWidth: "780px", margin: "0 auto", padding: "20px 20px 0" }}>
        <Link href="/blog" style={{ fontFamily: f.h, fontSize: "13px", color: C.gold, textDecoration: "none" }}>
          ← Back to Blog
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
            <span>By JR One Aluminum</span>
            <span>•</span>
            <span>{new Date(post.date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</span>
            <span>•</span>
            <span>{post.readingTime} min read</span>
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

        {/* CTA */}
        <div style={{
          marginTop: "50px", padding: "32px", background: C.navyMid, borderRadius: "12px",
          border: `2px solid ${C.gold}`, textAlign: "center",
        }}>
          <h3 style={{ fontFamily: f.h, fontSize: "22px", fontWeight: 700, color: C.white, marginBottom: "10px" }}>
            Ready for a Free Estimate?
          </h3>
          <p style={{ fontFamily: f.b, fontSize: "16px", color: C.muted, marginBottom: "20px" }}>
            Tampa Bay's aluminum specialists. 30+ years experience. In-house crews.
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
              Call (844) 444-3114
            </a>
            <Link
              href="/contact"
              style={{
                display: "inline-block", padding: "14px 28px", background: "transparent",
                color: C.gold, fontFamily: f.h, fontSize: "15px", fontWeight: 700,
                borderRadius: "8px", border: `2px solid ${C.gold}`, textDecoration: "none",
              }}
            >
              Get Free Quote
            </Link>
          </div>
        </div>

        {/* Related posts */}
        {related.length > 0 && (
          <div style={{ marginTop: "50px" }}>
            <h3 style={{ fontFamily: f.h, fontSize: "20px", fontWeight: 700, color: C.white, marginBottom: "20px" }}>
              Related Articles
            </h3>
            <div style={{ display: "grid", gap: "16px" }}>
              {related.map((r) => (
                <Link
                  key={r.slug}
                  href={`/blog/${r.slug}`}
                  style={{
                    display: "block", padding: "18px", background: C.navyMid, borderRadius: "10px",
                    border: `1px solid ${C.navyLight}`, textDecoration: "none",
                  }}
                >
                  <h4 style={{ fontFamily: f.h, fontSize: "16px", fontWeight: 600, color: C.white, marginBottom: "4px" }}>
                    {r.title}
                  </h4>
                  <span style={{ fontFamily: f.b, fontSize: "13px", color: C.muted }}>
                    {r.readingTime} min read
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
