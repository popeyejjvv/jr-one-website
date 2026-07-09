"use client";

/**
 * Peak301Alert — the red insurance-alert callout that lives on every service page.
 *
 * Drives traffic from any service page over to /peak-301 (and /insurance-resource-center
 * for storm/insurance prospects). Red is intentional, attention-catching by design.
 *
 * Pattern locked from `git show main:app/seamless-aluminum-gutters/page.jsx`.
 * Bilingual via lang prop.
 */
import { useLanguage } from "../../lib/LanguageContext";
import { localizeHref } from "../../lib/locale";

const T = {
  en: {
    eyebrow: "STORM SEASON ALERT",
    title: "Roof damage from a storm? Don't replace it. Restore it.",
    desc: "is a soy-based shingle rejuvenation that extends roof life up to 6 years for up to 70% less than a new install. We help homeowners use their insurance properly, not get steamrolled.",
    primary: "Learn About Peak 301",
    secondary: "Insurance Resource Center",
  },
  es: {
    eyebrow: "ALERTA TEMPORADA DE TORMENTAS",
    title: "¿Daños en el techo por una tormenta? No lo reemplace. Restáurelo.",
    desc: "es un rejuvenecedor de tejas a base de soya que extiende la vida del techo hasta 6 años por hasta 70% menos que una instalación nueva. Ayudamos a los propietarios a usar su seguro correctamente.",
    primary: "Conozca Peak 301",
    secondary: "Centro de Recursos de Seguros",
  },
};

export default function Peak301Alert() {
  const { lang } = useLanguage();
  const t = T[lang] || T.en;

  return (
    <section
      style={{
        background:
          "linear-gradient(135deg, rgba(177, 26, 33, 0.10), rgba(15, 30, 54, 0.97))",
        padding: "28px 24px",
        borderTop: "2px solid #B11A21",
        borderBottom: "2px solid #B11A21",
      }}
    >
      <div
        style={{
          maxWidth: "1000px",
          margin: "0 auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "20px",
        }}
      >
        <div style={{ flex: "1 1 360px", minWidth: 280 }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
            <span style={{ fontSize: "16px" }} aria-hidden>⚠️</span>
            <span
              style={{
                fontFamily: "var(--jr-font-heading)",
                fontSize: "11px",
                fontWeight: 700,
                color: "#B11A21",
                letterSpacing: "2px",
              }}
            >
              {t.eyebrow}
            </span>
          </div>
          <p
            style={{
              fontFamily: "var(--jr-font-heading)",
              fontSize: "clamp(16px, 2.5vw, 20px)",
              fontWeight: 800,
              color: "var(--jr-paper)",
              lineHeight: 1.3,
              marginBottom: "6px",
            }}
          >
            {t.title}
          </p>
          <p
            style={{
              fontFamily: "var(--jr-font-body)",
              fontSize: "14px",
              color: "var(--jr-muted-on-dark)",
              lineHeight: 1.5,
            }}
          >
            <strong style={{ color: "var(--jr-cream-2)" }}>Peak 301</strong> {t.desc}
          </p>
        </div>

        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
          <a
            href={localizeHref("/peak-301", lang)}
            className="jr-press"
            style={{
              padding: "12px 24px",
              fontFamily: "var(--jr-font-heading)",
              fontSize: "12px",
              fontWeight: 700,
              letterSpacing: "1px",
              color: "#FFFFFF",
              background: "linear-gradient(135deg, #B11A21, #D42A2A)",
              borderRadius: "6px",
              textAlign: "center",
              boxShadow: "0 4px 12px rgba(177, 26, 33, 0.32)",
              textTransform: "uppercase",
            }}
          >
            {t.primary}
          </a>
          <a
            href={localizeHref("/insurance-resource-center", lang)}
            className="jr-press"
            style={{
              padding: "12px 24px",
              fontFamily: "var(--jr-font-heading)",
              fontSize: "12px",
              fontWeight: 700,
              letterSpacing: "1px",
              color: "#B11A21",
              border: "1.5px solid #B11A21",
              borderRadius: "6px",
              textAlign: "center",
              textTransform: "uppercase",
            }}
          >
            {t.secondary}
          </a>
        </div>
      </div>
    </section>
  );
}
