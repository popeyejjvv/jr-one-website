"use client";

/* ═══════════════════════════════════════════════════════════
   JR ONE — SHARED NAVIGATION COMPONENT
   Used on every page except the homepage (which has its own nav)
   ═══════════════════════════════════════════════════════════ */

const C = {
  bg: "#0B1628", navy: "#1B2A4A", navyLight: "#2C3E5A",
  gold: "#C8952E", goldLight: "#D4A843", goldPale: "rgba(200,149,46,0.12)",
  white: "#FFFFFF", muted: "#7A8FA8",
};
const f = { h: "'Montserrat', sans-serif", b: "'Source Sans 3', sans-serif" };

const NAV_LINKS = [
  { label: "Gutters", href: "/seamless-aluminum-gutters" },
  { label: "Guards", href: "/gutter-guards" },
  { label: "Soffit & Fascia", href: "/soffit-and-fascia" },
  { label: "Repair", href: "/gutter-repair" },
  { label: "Siding", href: "/siding" },
  { label: "Specialty", href: "/specialty-gutters" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export default function SiteNav({ promoBanner = "🏠 FREE Gutter Guards with Full House Gutter Installation — Call (844) 444-3114" }) {
  return (
    <>
      {/* Promo Banner */}
      <div style={{ background: `linear-gradient(90deg,${C.gold},${C.goldLight})`, padding: "10px 24px", textAlign: "center", fontFamily: f.h, fontSize: "13px", fontWeight: 600, color: C.navy, letterSpacing: "0.5px" }}>
        {promoBanner}
      </div>

      {/* Navigation */}
      <nav style={{ position: "sticky", top: 0, zIndex: 1000, padding: "12px 24px", background: "rgba(11,22,40,0.97)", backdropFilter: "blur(12px)", borderBottom: `1px solid ${C.navyLight}` }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          {/* Logo */}
          <a href="/" style={{ fontFamily: f.h, fontSize: "20px", fontWeight: 800, color: C.white, textDecoration: "none" }}>
            JR <span style={{ color: C.gold }}>ONE</span> <span style={{ color: C.white, fontSize: "16px" }}>★</span>
          </a>

          {/* Desktop Links */}
          <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
            {NAV_LINKS.map((link, i) => (
              <a key={i} href={link.href} style={{ fontFamily: f.h, fontSize: "12px", fontWeight: 600, color: C.muted, textDecoration: "none", letterSpacing: "0.5px", transition: "color 0.2s" }}
                onMouseOver={e => e.target.style.color = C.gold}
                onMouseOut={e => e.target.style.color = C.muted}>
                {link.label}
              </a>
            ))}
            <a href="tel:8444443114" style={{ fontFamily: f.h, fontSize: "13px", fontWeight: 700, color: C.gold, textDecoration: "none" }}>(844) 444-3114</a>
          </div>
        </div>
      </nav>

      {/* CSS to hide desktop links on mobile */}
      <style>{`
        @media (max-width: 768px) {
          nav > div > div:last-child > a:not(:last-child) { display: none !important; }
        }
      `}</style>
    </>
  );
}
