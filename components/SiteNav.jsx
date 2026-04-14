"use client";

import { useState, useEffect } from "react";
import { useLanguage } from "../lib/LanguageContext";

const C = {
  bg: "#0B1628", navy: "#1B2A4A", navyLight: "#2C3E5A", navyFade: "#162033",
  gold: "#C8952E", goldLight: "#D4A843", goldPale: "rgba(200,149,46,0.12)",
  white: "#FFFFFF", muted: "#7A8FA8",
};
const f = { h: "'Montserrat', sans-serif", b: "'Source Sans 3', sans-serif" };

const SERVICE_HREFS = [
  "/copper-gutters", "/drainage-assessment", "/govee-lights", "/gutter-guards",
  "/gutter-repair", "/peak-301", "/sagiper", "/seamless-aluminum-gutters",
  "/service-plans", "/siding", "/soffit-and-fascia", "/specialty-gutters",
];

const FEATURE_META = [
  { href: "/estimator", color: "#3B82F6", bg: "rgba(59,130,246,0.15)" },
  { href: "/financing", color: "#22C55E", bg: "rgba(34,197,94,0.15)" },
  { href: "/referral", color: "#E91E8C", bg: "rgba(233,30,140,0.15)" },
];

const NAV_HREFS = ["/#gold-standard", "/about", "/contact", "/faq", "/projects"];

const T = {
  en: {
    services: "Services",
    servicesMobile: "SERVICES",
    serviceLabels: ["Copper Gutters", "Drainage Installation", "Govee Lights", "Gutter Guards", "Gutter Repair", "Peak 301", "SAGIPER", "Seamless Gutters", "Service Plans", "Siding", "Soffit & Fascia", "Specialty Gutters"],
    navLabels: ["The Gold Standard", "About", "Contact", "FAQ", "Projects"],
    featureLabels: ["Estimator", "Financing", "Referral"],
    promoBanner: [
      "📐 Use Our Instant Aerial Estimator — Get 5% Off Your Project",
      "💳 Financing Available — Flexible Payment Plans to Fit Your Budget",
      "🎁 Referral Program — Earn $80 Gift Cards + Friends Get 10% Off",
    ],
  },
  es: {
    services: "Servicios",
    servicesMobile: "SERVICIOS",
    serviceLabels: ["Canaletas de Cobre", "Instalación de Drenaje", "Luces Govee", "Protectores de Canaletas", "Reparación de Canaletas", "Peak 301", "SAGIPER", "Canaletas Sin Costura", "Planes de Servicio", "Revestimiento", "Sofito y Fascia", "Canaletas Especiales"],
    navLabels: ["El Estándar de Oro", "Nosotros", "Contacto", "Preguntas Frecuentes", "Proyectos"],
    featureLabels: ["Estimador", "Financiamiento", "Referidos"],
    promoBanner: [
      "📐 Usa Nuestro Estimador Aéreo — Obtén 5% de Descuento en tu Proyecto",
      "💳 Financiamiento Disponible — Planes de Pago Flexibles",
      "🎁 Programa de Referidos — Gana Tarjetas de $80 + 10% de Descuento para Referidos",
    ],
  },
};

export default function SiteNav({ promoBanner }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const { lang, toggleLang } = useLanguage();
  const t = T[lang];
  const bannerMessages = promoBanner ? (Array.isArray(promoBanner) ? promoBanner : [promoBanner]) : t.promoBanner;
  const tickerText = bannerMessages.join("     ★     ");

  return (
    <div style={{ position: "sticky", top: 0, zIndex: 1000 }}>
      {/* Promo Banner — sticks with nav */}
      <div style={{ background: "#22C55E", padding: "8px 0", overflow: "hidden", whiteSpace: "nowrap", fontFamily: f.h, fontSize: "13px", fontWeight: 600, color: C.white, letterSpacing: "0.5px" }}>
        <div style={{ display: "inline-block", animation: "ticker 25s linear infinite" }}>
          <span style={{ paddingRight: "60px" }}>{tickerText}</span>
          <span style={{ paddingRight: "60px" }}>{tickerText}</span>
        </div>
        <style>{`@keyframes ticker{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}`}</style>
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
              <span style={{ fontFamily: f.h, fontSize: "11px", fontWeight: 600, color: C.muted, letterSpacing: "0.5px", cursor: "pointer", display: "flex", alignItems: "center", gap: "4px", paddingBottom: "12px", marginBottom: "-12px" }}>{t.services} <span style={{ fontSize: "8px" }}>▼</span></span>
              {servicesOpen && (
                <div style={{ position: "absolute", top: "100%", left: "-12px", paddingTop: "4px" }}><div style={{ background: "rgba(11,22,40,0.98)", border: `1px solid ${C.navyLight}`, borderRadius: "8px", padding: "8px 0", minWidth: "220px", boxShadow: "0 8px 32px rgba(0,0,0,0.4)", backdropFilter: "blur(12px)" }}>
                  {t.serviceLabels.map((label, i) => (
                    <a key={i} href={SERVICE_HREFS[i]} style={{ display: "block", padding: "8px 20px", fontFamily: f.h, fontSize: "12px", fontWeight: 600, color: C.muted, textDecoration: "none" }}
                      onMouseOver={e => { e.target.style.color = C.gold; e.target.style.background = "rgba(200,149,46,0.08)"; }}
                      onMouseOut={e => { e.target.style.color = C.muted; e.target.style.background = "transparent"; }}>
                      {label}
                    </a>
                  ))}
                </div></div>
              )}
            </div>
            {t.navLabels.map((label, i) => (
              <a key={i} href={NAV_HREFS[i]} style={{ fontFamily: f.h, fontSize: "11px", fontWeight: 600, color: C.muted, textDecoration: "none", letterSpacing: "0.5px" }}>{label}</a>
            ))}
            {t.featureLabels.map((label, i) => (
              <a key={`ft-${i}`} href={FEATURE_META[i].href} style={{ fontFamily: f.h, fontSize: "11px", fontWeight: 700, color: FEATURE_META[i].color, background: FEATURE_META[i].bg, padding: "5px 12px", borderRadius: "4px", textDecoration: "none", letterSpacing: "0.5px", border: `1px solid ${FEATURE_META[i].color}30` }}>{label}</a>
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
          <div style={{ maxWidth: "1200px", margin: "12px auto 0", paddingTop: "12px", borderTop: `1px solid ${C.navyLight}`, display: "flex", flexDirection: "column", gap: "4px", maxHeight: "calc(100vh - 140px)", overflowY: "auto", overscrollBehavior: "contain", WebkitOverflowScrolling: "touch" }}>
            <button onClick={() => setMobileServicesOpen(!mobileServicesOpen)} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%", background: "none", border: "none", cursor: "pointer", padding: "10px 0", borderBottom: `1px solid ${C.navyLight}20` }}>
              <span style={{ fontFamily: f.h, fontSize: "14px", fontWeight: 700, color: C.gold, letterSpacing: "2px" }}>{t.servicesMobile}</span>
              <span style={{ fontFamily: f.h, fontSize: "14px", color: C.gold, transform: mobileServicesOpen ? "rotate(180deg)" : "none", transition: "transform 0.2s" }}>▼</span>
            </button>
            {mobileServicesOpen && t.serviceLabels.map((label, i) => (
              <a key={i} href={SERVICE_HREFS[i]} style={{ fontFamily: f.h, fontSize: "14px", fontWeight: 600, color: C.muted, textDecoration: "none", padding: "8px 0", paddingLeft: "16px", borderBottom: `1px solid ${C.navyLight}20` }}>{label}</a>
            ))}
            <div style={{ height: "8px" }} />
            {t.navLabels.map((label, i) => (
              <a key={`n-${i}`} href={NAV_HREFS[i]} style={{ fontFamily: f.h, fontSize: "14px", fontWeight: 600, color: C.muted, textDecoration: "none", padding: "10px 0", borderBottom: `1px solid ${C.navyLight}20` }}>{label}</a>
            ))}
            {t.featureLabels.map((label, i) => (
              <a key={`mft-${i}`} href={FEATURE_META[i].href} style={{ fontFamily: f.h, fontSize: "14px", fontWeight: 700, color: FEATURE_META[i].color, textDecoration: "none", padding: "10px 0", borderBottom: `1px solid ${C.navyLight}20` }}>{label}</a>
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
