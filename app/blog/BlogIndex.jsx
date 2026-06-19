"use client";

import { useState } from "react";
import Link from "next/link";
import MobileCTA from "../../components/MobileCTA";
import SiteNav from "../../components/SiteNav";
import SiteFooter from "../../components/SiteFooter";
import { useLanguage } from "../../lib/LanguageContext";
import { localizeHref } from "../../lib/locale";

const C = {
  bg: "#0B1628", navy: "#1B2A4A", navyMid: "#243556", navyLight: "#2C3E5A",
  gold: "#D4AF37", goldLight: "#F2CD69", goldPale: "rgba(200,149,46,0.12)",
  cream: "#F5F3EF", white: "#FFFFFF", muted: "#7A8FA8", charcoal: "#2D2D2D",
};
const f = { h: "'Montserrat', sans-serif", b: "'Source Sans 3', sans-serif" };

const T = {
  en: {
    tag: "EXPERT RESOURCES",
    title: "JR One Aluminum",
    titleGold: "Blog",
    subtitle: "Expert tips on gutters, soffit, fascia, siding, and protecting your Tampa Bay home.",
    searchPlaceholder: "Search articles...",
    all: "All",
    noResults: "No articles found. Try a different search term.",
    minRead: "min read",
  },
  es: {
    tag: "RECURSOS EXPERTOS",
    title: "JR One Aluminum",
    titleGold: "Blog",
    subtitle: "Consejos expertos sobre canaletas, sofitos, fascias, revestimientos y cómo proteger su hogar en Tampa Bay.",
    searchPlaceholder: "Buscar artículos...",
    all: "Todos",
    noResults: "No se encontraron artículos. Intente con otro término de búsqueda.",
    minRead: "min de lectura",
  },
};

export default function BlogIndex({ posts }) {
  const { lang } = useLanguage();
  const t = T[lang];
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
      <SiteNav />
      {/* Header */}
      <div style={{ background: C.navy, padding: "60px 20px 40px", textAlign: "center" }}>
        <div style={{ display: "inline-block", padding: "6px 16px", background: C.goldPale, borderRadius: "4px", marginBottom: "12px" }}>
          <span style={{ fontFamily: f.h, fontSize: "12px", fontWeight: 700, color: C.gold, letterSpacing: "3px" }}>
            {t.tag}
          </span>
        </div>
        <h1 style={{ fontFamily: f.h, fontSize: "clamp(28px, 5vw, 44px)", fontWeight: 800, color: C.white, marginBottom: "12px" }}>
          {t.title} <span style={{ color: C.gold }}>{t.titleGold}</span>
        </h1>
        <p style={{ fontFamily: f.b, fontSize: "18px", color: C.muted, maxWidth: "600px", margin: "0 auto" }}>
          {t.subtitle}
        </p>
      </div>

      {/* Search & Filter */}
      <div style={{ maxWidth: "900px", margin: "0 auto", padding: "30px 20px 0" }}>
        <input
          type="text"
          placeholder={t.searchPlaceholder}
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
              {cat === "All" ? t.all : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Post Grid */}
      <div style={{ maxWidth: "900px", margin: "0 auto", padding: "0 20px 60px" }}>
        {filtered.length === 0 ? (
          <p style={{ color: C.muted, textAlign: "center", padding: "40px 0", fontFamily: f.b, fontSize: "16px" }}>
            {t.noResults}
          </p>
        ) : (
          <div style={{ display: "grid", gap: "20px" }}>
            {filtered.map((post) => (
              <Link
                key={post.slug}
                href={localizeHref(`/blog/${post.slug}`, lang)}
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
                    {post.readingTime} {t.minRead}
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
      <SiteFooter />
      <MobileCTA />
    </div>
  );
}
