"use client";

/* ═══════════════════════════════════════════════════════════
   JR ONE , STICKY MOBILE CTA
   Fixed bottom bar: Call + Free Estimate.
   Brand-brain compliant: SVG icons, no emoji, custom easing.
   ═══════════════════════════════════════════════════════════ */

import { useLanguage } from "../lib/LanguageContext";
import { PhoneIcon } from "../lib/icons";

const T = {
  en: { callNow: "Call Now", freeEstimate: "Free Estimate" },
  es: { callNow: "Llamar Ahora", freeEstimate: "Cotización Gratis" },
};

export default function MobileCTA({ scrollTarget = "quote-form" }) {
  const { lang } = useLanguage();
  const t = T[lang];

  const handleEstimate = () => {
    const el = document.getElementById(scrollTarget);
    if (el) el.scrollIntoView({ behavior: "smooth" });
    else window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div
      role="region"
      aria-label="Quick contact actions"
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: "var(--jr-z-mobile-cta)",
        background: "rgba(22, 32, 51, 0.97)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        borderTop: "var(--jr-hair-darker)",
        padding: "12px 16px",
        display: "flex",
        gap: "10px",
      }}
    >
      <a
        href="tel:8444443114"
        className="jr-press"
        style={{
          flex: 1,
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "8px",
          padding: "14px",
          fontFamily: "var(--jr-font-heading)",
          fontSize: "13px",
          fontWeight: 700,
          color: "var(--jr-navy)",
          background: "linear-gradient(135deg, var(--jr-gold), var(--jr-gold-2))",
          borderRadius: "var(--jr-radius-md)",
          letterSpacing: "0.6px",
          textTransform: "uppercase",
        }}
      >
        <PhoneIcon size={16} />
        {t.callNow}
      </a>
      <button
        onClick={handleEstimate}
        className="jr-press"
        style={{
          flex: 1,
          padding: "14px",
          fontFamily: "var(--jr-font-heading)",
          fontSize: "13px",
          fontWeight: 700,
          color: "var(--jr-gold)",
          background: "transparent",
          border: "2px solid var(--jr-gold)",
          borderRadius: "var(--jr-radius-md)",
          letterSpacing: "0.6px",
          textTransform: "uppercase",
        }}
      >
        {t.freeEstimate}
      </button>
    </div>
  );
}
