"use client";

/* ═══════════════════════════════════════════════════════════
   JR ONE — SHARED STICKY MOBILE CTA
   Fixed bottom bar with Call + Quote buttons
   ═══════════════════════════════════════════════════════════ */

import { useLanguage } from "../lib/LanguageContext";

const C = { gold: "#C8952E", goldLight: "#D4A843", navy: "#0B1628", navyLight: "#2C3E5A" };
const f = { h: "'Montserrat', sans-serif" };

const T = {
  en: { callNow: "CALL NOW", freeEstimate: "FREE ESTIMATE" },
  es: { callNow: "LLAMAR AHORA", freeEstimate: "COTIZACIÓN GRATIS" },
};

export default function MobileCTA({ scrollTarget = "quote-form" }) {
  const { lang } = useLanguage();
  const t = T[lang];

  return (
    <div style={{ position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 999, background: "rgba(11,22,40,0.97)", backdropFilter: "blur(12px)", borderTop: `1px solid ${C.navyLight}`, padding: "12px 16px", display: "flex", gap: "10px" }}>
      <a href="tel:8444443114" style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: "6px", padding: "14px", fontFamily: f.h, fontSize: "13px", fontWeight: 700, color: C.navy, background: `linear-gradient(135deg,${C.gold},${C.goldLight})`, borderRadius: "8px", textDecoration: "none", letterSpacing: "0.5px" }}>
        📞 {t.callNow}
      </a>
      <button onClick={() => document.getElementById(scrollTarget)?.scrollIntoView({ behavior: "smooth" }) || window.scrollTo({ top: 0, behavior: "smooth" })} style={{ flex: 1, padding: "14px", fontFamily: f.h, fontSize: "13px", fontWeight: 700, color: C.gold, background: "transparent", border: `2px solid ${C.gold}`, borderRadius: "8px", cursor: "pointer", letterSpacing: "0.5px" }}>
        {t.freeEstimate}
      </button>
    </div>
  );
}
