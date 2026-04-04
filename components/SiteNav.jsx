"use client";

import { useState, useEffect } from "react";

const C = {
  bg: "#0B1628", navy: "#1B2A4A", navyLight: "#2C3E5A", navyFade: "#162033",
  gold: "#C8952E", goldLight: "#D4A843", goldPale: "rgba(200,149,46,0.12)",
  white: "#FFFFFF", muted: "#7A8FA8",
};
const f = { h: "'Montserrat', sans-serif", b: "'Source Sans 3', sans-serif" };

const SERVICE_LINKS = [
  { label: "Copper Gutters", href: "/copper-gutters" },
  { label: "Drainage Installation", href: "/drainage-assessment" },
  { label: "Govee Lights", href: "/govee-lights" },
  { label: "Gutter Guards", href: "/gutter-guards" },
  { label: "Gutter Repair", href: "/gutter-repair" },
  { label: "Peak 301", href: "/peak-301" },
  { label: "SAGIPER", href: "/sagiper" },
  { label: "Seamless Gutters", href: "/seamless-aluminum-gutters" },
  { label: "Service Plans", href: "/service-plans" },
  { label: "Siding", href: "/siding" },
  { label: "Soffit & Fascia", href: "/soffit-and-fascia" },
  { label: "Specialty Gutters", href: "/specialty-gutters" },
];

const NAV_LINKS = [
  { label: "The Gold Standard", href: "/#gold-standard" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
  { label: "FAQ", href: "/faq" },
  { label: "Projects", href: "/projects" },
];

const FEATURE_TABS = [
  { label: "Estimator", href: "/#estimator", color: "#3B82F6", bg: "rgba(59,130,246,0.15)" },
  { label: "Financing", href: "/financing", color: "#22C55E", bg: "rgba(34,197,94,0.15)" },
  { label: "Referral", href: "/referral", color: "#E91E8C", bg: "rgba(233,30,140,0.15)" },
];

export default function SiteNav({ promoBanner = "🏠 FREE Gutter Guards with Full House Gutter Installation — Call (844) 444-3114" }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [lang, setLang] = useState("en");

  useEffect(() => {
    const saved = typeof window !== "undefined" && localStorage.getItem("jr-lang");
    if (saved === "es") setLang("es");
  }, []);

  const toggleLang = () => {
    const next = lang === "en" ? "es" : "en";
    setLang(next);
    if (typeof window !== "undefined") localStorage.setItem("jr-lang", next);
    window.location.href = next === "es" ? "/?lang=es" : "/";
  };

  return (
    <div style={{ position: "sticky", top: 0, zIndex: 1000 }}>
      {/* Promo Banner — sticks with nav */}
      <div style={{ background: `linear-gradient(90deg,${C.gold},${C.goldLight})`, padding: "8px 24px", textAlign: "center", fontFamily: f.h, fontSize: "13px", fontWeight: 600, color: C.navy, letterSpacing: "0.5px" }}>
        {promoBanner}
      </div>

      {/* Navigation */}
      <nav style={{ padding: "10px 24px", background: "rgba(11,22,40,0.98)", backdropFilter: "blur(12px)", borderBottom: `1px solid ${C.navyLight}` }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <a href="/" style={{ fontFamily: f.h, fontSize: "20px", fontWeight: 800, color: C.white, textDecoration: "none" }}>
            JR <span style={{ color: C.gold }}>ONE</span> <span style={{ color: C.white, fontSize: "16px" }}>★</span>
          </a>

          <div className="jr-nav-desktop" style={{ display: "flex", gap: "16px", alignItems: "center" }}>
            {/* Services Dropdown */}
            <div style={{ position: "relative" }} onMouseEnter={() => setServicesOpen(true)} onMouseLeave={() => setServicesOpen(false)}>
              <span style={{ fontFamily: f.h, fontSize: "11px", fontWeight: 600, color: C.muted, letterSpacing: "0.5px", cursor: "pointer", display: "flex", alignItems: "center", gap: "4px", paddingBottom: "12px", marginBottom: "-12px" }}>Services <span style={{ fontSize: "8px" }}>▼</span></span>
              {servicesOpen && (
                <div style={{ position: "absolute", top: "100%", left: "-12px", paddingTop: "4px" }}><div style={{ background: "rgba(11,22,40,0.98)", border: `1px solid ${C.navyLight}`, borderRadius: "8px", padding: "8px 0", minWidth: "220px", boxShadow: "0 8px 32px rgba(0,0,0,0.4)", backdropFilter: "blur(12px)" }}>
                  {SERVICE_LINKS.map((svc, i) => (
                    <a key={i} href={svc.href} style={{ display: "block", padding: "8px 20px", fontFamily: f.h, fontSize: "12px", fontWeight: 600, color: C.muted, textDecoration: "none" }}
                      onMouseOver={e => { e.target.style.color = C.gold; e.target.style.background = "rgba(200,149,46,0.08)"; }}
                      onMouseOut={e => { e.target.style.color = C.muted; e.target.style.background = "transparent"; }}>
                      {svc.label}
                    </a>
                  ))}
                </div></div>
              )}
            </div>
            {NAV_LINKS.map((link, i) => (
              <a key={i} href={link.href} style={{ fontFamily: f.h, fontSize: "11px", fontWeight: 600, color: C.muted, textDecoration: "none", letterSpacing: "0.5px" }}>{link.label}</a>
            ))}
            {FEATURE_TABS.map((tab, i) => (
              <a key={`ft-${i}`} href={tab.href} style={{ fontFamily: f.h, fontSize: "11px", fontWeight: 700, color: tab.color, background: tab.bg, padding: "5px 12px", borderRadius: "4px", textDecoration: "none", letterSpacing: "0.5px", border: `1px solid ${tab.color}30` }}>{tab.label}</a>
            ))}
            <a href="tel:8444443114" style={{ fontFamily: f.h, fontSize: "12px", fontWeight: 700, color: C.gold, textDecoration: "none" }}>(844) 444-3114</a>
            <button onClick={toggleLang} style={{ fontFamily: f.h, fontSize: "11px", fontWeight: 700, color: C.gold, background: C.goldPale, border: `1px solid ${C.gold}`, borderRadius: "4px", padding: "4px 10px", cursor: "pointer", letterSpacing: "1px" }}>
              {lang === "en" ? "ES" : "EN"}
            </button>
          </div>

          <button className="jr-nav-hamburger" onClick={() => setMenuOpen(!menuOpen)} style={{ display: "none", background: "none", border: "none", cursor: "pointer", padding: "8px", flexDirection: "column", gap: "5px" }}>
            <span style={{ display: "block", width: "22px", height: "2px", background: menuOpen ? C.gold : C.white, transition: "all 0.3s", transform: menuOpen ? "rotate(45deg) translateY(7px)" : "none" }} />
            <span style={{ display: "block", width: "22px", height: "2px", background: C.white, transition: "all 0.3s", opacity: menuOpen ? 0 : 1 }} />
            <span style={{ display: "block", width: "22px", height: "2px", background: menuOpen ? C.gold : C.white, transition: "all 0.3s", transform: menuOpen ? "rotate(-45deg) translateY(-7px)" : "none" }} />
          </button>
        </div>

        {menuOpen && (
          <div style={{ maxWidth: "1200px", margin: "12px auto 0", paddingTop: "12px", borderTop: `1px solid ${C.navyLight}`, display: "flex", flexDirection: "column", gap: "4px" }}>
            <div style={{ fontFamily: f.h, fontSize: "11px", fontWeight: 700, color: C.gold, letterSpacing: "2px", padding: "8px 0 4px" }}>SERVICES</div>
            {SERVICE_LINKS.map((link, i) => (
              <a key={i} href={link.href} style={{ fontFamily: f.h, fontSize: "14px", fontWeight: 600, color: C.muted, textDecoration: "none", padding: "8px 0", paddingLeft: "12px", borderBottom: `1px solid ${C.navyLight}20` }}>{link.label}</a>
            ))}
            <div style={{ height: "8px" }} />
            {NAV_LINKS.map((link, i) => (
              <a key={`n-${i}`} href={link.href} style={{ fontFamily: f.h, fontSize: "14px", fontWeight: 600, color: C.muted, textDecoration: "none", padding: "10px 0", borderBottom: `1px solid ${C.navyLight}20` }}>{link.label}</a>
            ))}
            {FEATURE_TABS.map((tab, i) => (
              <a key={`mft-${i}`} href={tab.href} style={{ fontFamily: f.h, fontSize: "14px", fontWeight: 700, color: tab.color, textDecoration: "none", padding: "10px 0", borderBottom: `1px solid ${C.navyLight}20` }}>{tab.label}</a>
            ))}
            <a href="tel:8444443114" style={{ fontFamily: f.h, fontSize: "16px", fontWeight: 700, color: C.gold, textDecoration: "none", padding: "12px 0", textAlign: "center" }}>📞 (844) 444-3114</a>
            <button onClick={toggleLang} style={{ fontFamily: f.h, fontSize: "13px", fontWeight: 700, color: C.gold, background: C.goldPale, border: `1px solid ${C.gold}`, borderRadius: "4px", padding: "10px", cursor: "pointer", letterSpacing: "1px", marginBottom: "8px" }}>
              {lang === "en" ? "ESPAÑOL" : "ENGLISH"}
            </button>
          </div>
        )}
      </nav>

      <style>{`
        @media (max-width: 900px) {
          .jr-nav-desktop { display: none !important; }
          .jr-nav-hamburger { display: flex !important; }
        }
        @media (min-width: 901px) {
          .jr-nav-hamburger { display: none !important; }
        }
      `}</style>
    </div>
  );
}
