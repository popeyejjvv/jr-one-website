"use client";

import { useState } from "react";
import Link from "next/link";
import MobileCTA from "../../components/MobileCTA";

const C = {
  bg: "#0B1628", navy: "#1B2A4A", navyMid: "#243556", navyLight: "#2C3E5A",
  gold: "#C8952E", goldLight: "#D4A843", goldPale: "rgba(200,149,46,0.12)",
  cream: "#F5F3EF", white: "#FFFFFF", muted: "#7A8FA8", charcoal: "#2D2D2D",
};
const f = { h: "'Montserrat', sans-serif", b: "'Source Sans 3', sans-serif" };

export default function BlogIndex({ posts }) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const categories = ["All", ...new Set(posts.map((p) => p.category))];

  const filtered = posts.filter((p) => {
    const matchesSearch =
      !search ||
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.description.toLowerCase().includes(search.toLowerCase());
    const matchesCat = category === "All" || p.category === category;
    return matchesSearch && matchesCat;
  });

  return (
    <div style={{ background: C.bg, minHeight: "100vh", fontFamily: f.b }}>
      {/* Header */}
      <div style={{ background: C.navy, padding: "60px 20px 40px", textAlign: "center" }}>
        <div style={{ display: "inline-block", padding: "6px 16px", background: C.goldPale, borderRadius: "4px", marginBottom: "12px" }}>
          <span style={{ fontFamily: f.h, fontSize: "12px", fontWeight: 700, color: C.gold, letterSpacing: "3px" }}>
            EXPERT RESOURCES
          </span>
        </div>
        <h1 style={{ fontFamily: f.h, fontSize: "clamp(28px, 5vw, 44px)", fontWeight: 800, color: C.white, marginBottom: "12px" }}>
          JR One Aluminum <span style={{ color: C.gold }}>Blog</span>
        </h1>
        <p style={{ fontFamily: f.b, fontSize: "18px", color: C.muted, maxWidth: "600px", margin: "0 auto" }}>
          Expert tips on gutters, soffit, fascia, siding, and protecting your Tampa Bay home.
        </p>
      </div>

      {/* Search & Filter */}
      <div style={{ maxWidth: "900px", margin: "0 auto", padding: "30px 20px 0" }}>
        <input
          type="text"
          placeholder="Search articles..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            width: "100%", padding: "14px 18px", fontFamily: f.b, fontSize: "16px",
            border: `1.5px solid ${C.navyLight}`, borderRadius: "8px", background: C.navyMid,
            color: C.white, marginBottom: "16px", boxSizing: "border-box",
          }}
        />
        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "30px" }}>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              style={{
                padding: "8px 16px", fontFamily: f.h, fontSize: "13px", fontWeight: 600,
                border: "none", borderRadius: "6px", cursor: "pointer",
                background: category === cat ? C.gold : C.navyLight,
                color: category === cat ? C.white : C.muted,
                transition: "all 0.2s",
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Post Grid */}
      <div style={{ maxWidth: "900px", margin: "0 auto", padding: "0 20px 60px" }}>
        {filtered.length === 0 ? (
          <p style={{ color: C.muted, textAlign: "center", padding: "40px 0", fontFamily: f.b, fontSize: "16px" }}>
            No articles found. Try a different search term.
          </p>
        ) : (
          <div style={{ display: "grid", gap: "20px" }}>
            {filtered.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                style={{
                  display: "block", padding: "24px", background: C.navyMid,
                  borderRadius: "12px", border: `1px solid ${C.navyLight}`,
                  transition: "border-color 0.2s, transform 0.2s",
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
                  <span style={{
                    fontFamily: f.h, fontSize: "11px", fontWeight: 700, color: C.gold,
                    letterSpacing: "2px", textTransform: "uppercase",
                  }}>
                    {post.category}
                  </span>
                  <span style={{ fontFamily: f.b, fontSize: "13px", color: C.muted }}>
                    {post.readingTime} min read
                  </span>
                </div>
                <h2 style={{
                  fontFamily: f.h, fontSize: "20px", fontWeight: 700, color: C.white,
                  marginBottom: "8px", lineHeight: 1.3,
                }}>
                  {post.title}
                </h2>
                <p style={{ fontFamily: f.b, fontSize: "15px", color: C.muted, lineHeight: 1.5 }}>
                  {post.description}
                </p>
              </Link>
            ))}
          </div>
        )}
      </div>
      <MobileCTA />
    </div>
  );
}
