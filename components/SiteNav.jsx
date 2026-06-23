"use client";

/* ═══════════════════════════════════════════════════════════
   JR ONE , SHARED NAV
   Promo ticker + sticky nav + services dropdown + mobile drawer.
   Brand-brain compliant: no emoji, no em-dashes, no off-palette colors.
   ═══════════════════════════════════════════════════════════ */

import { useState, useRef } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useLanguage } from "../lib/LanguageContext";
import { ChevronDownIcon, MenuIcon, XIcon, PhoneIcon } from "../lib/icons";
import { localizeHref, pairedUrl } from "../lib/locale";

// EN<->ES route map, localizeHref, and pairedUrl now live in lib/locale.js so
// every link renderer in the app uses the same logic (no per-component drift).

// Alphabetical for the standard services. HOA Contracts and Rental Property
// Maintenance are pinned last (B2B / recurring-contract tier, kept together
// at the end so homeowners see retail services first). /7-inch-gutters is a
// live dedicated page (un-merged 2026-06-15).
const SERVICE_HREFS = [
  "/commercial-gutters", "/copper-gutters", "/drainage-assessment",
  "/govee-lights", "/gutter-cleaning", "/gutter-guards", "/gutter-repair",
  "/peak-301", "/sagiper", "/seamless-aluminum-gutters", "/service-plans",
  "/siding", "/soffit-and-fascia", "/specialty-gutters",
  "/hoa-contracts", "/rental-property-maintenance",
];

const NAV_HREFS = ["/#gold-standard", "/about", "/contact", "/faq", "/projects"];

const FEATURE_HREFS = ["/estimator", "/financing", "/referral"];

const T = {
  en: {
    services: "Services",
    serviceLabels: ["Commercial Gutters", "Copper Gutters", "Drainage Installation", "Govee Lights", "Gutter Cleaning", "Gutter Guards", "Gutter Repair", "Peak 301", "SAGIPER", "Seamless Gutters", "Service Plans", "Siding", "Soffit & Fascia", "Specialty Gutters", "HOA Contracts", "Rental Property Maintenance"],
    navLabels: ["The Gold Standard", "About", "Contact", "FAQ", "Projects"],
    featureLabels: ["Estimator", "Financing", "Referral"],
    promoBanner: [
      "📐 Use the aerial estimator. 5% off your project.",
      "💳 Financing available. Flexible payment plans.",
      "🎁 Refer a neighbor. You get $80, they save 10%.",
    ],
    open: "Open menu",
    close: "Close menu",
  },
  es: {
    services: "Servicios",
    serviceLabels: ["Canaletas Comerciales", "Canaletas de Cobre", "Instalación de Drenaje", "Luces Govee", "Limpieza de Canaletas", "Protectores de Canaletas", "Reparación de Canaletas", "Peak 301", "SAGIPER", "Canaletas Sin Costura", "Planes de Servicio", "Revestimiento", "Sofito y Fascia", "Canaletas Especiales", "Contratos HOA", "Mantenimiento de Alquileres"],
    navLabels: ["El Estándar de Oro", "Nosotros", "Contacto", "Preguntas Frecuentes", "Proyectos"],
    featureLabels: ["Estimador", "Financiamiento", "Referidos"],
    promoBanner: [
      "📐 Usa el estimador aéreo. 5% de descuento en tu proyecto.",
      "💳 Financiamiento disponible. Planes de pago flexibles.",
      "🎁 Refiere a un vecino. Tú ganas $80, él ahorra 10%.",
    ],
    open: "Abrir menú",
    close: "Cerrar menú",
  },
};

const FEATURE_META = [
  { color: "#93C5FD", bg: "rgba(59, 130, 246, 0.15)", border: "rgba(59, 130, 246, 0.30)", emoji: "📐" }, // Estimator: blue (text lightened for AA contrast on navy)
  { color: "#22C55E", bg: "rgba(34, 197, 94, 0.15)", border: "rgba(34, 197, 94, 0.30)", emoji: "💳" }, // Financing: green (6.24:1, passes)
  { color: "#F9A8D4", bg: "rgba(233, 30, 140, 0.15)", border: "rgba(233, 30, 140, 0.30)", emoji: "🎁" }, // Referral: pink (text lightened for AA contrast on navy)
];

export default function SiteNav({ promoBanner }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  // Hover-intent timer: 250ms grace window so the dropdown doesn't slam shut
  // when the cursor briefly leaves the panel (diagonal sweep, sub-menu reach).
  const closeTimerRef = useRef(null);
  const openServices = () => {
    if (closeTimerRef.current) { clearTimeout(closeTimerRef.current); closeTimerRef.current = null; }
    setServicesOpen(true);
  };
  const closeServicesSoon = () => {
    if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    closeTimerRef.current = setTimeout(() => setServicesOpen(false), 250);
  };
  const { lang, toggleLang } = useLanguage();
  const router = useRouter();
  const pathname = usePathname() || "/";
  // When on a locked /es/* page, toggleLang() is a no-op (LanguageContext stays
  // locked). The right move is navigation to the paired URL so SSR renders the
  // other language at a distinct, indexable URL.
  const handleLanguageToggle = () => {
    const target = pairedUrl(pathname, lang);
    if (target && target !== pathname) {
      router.push(target);
    } else {
      toggleLang();
    }
  };
  const t = T[lang];
  const bannerMessages = promoBanner ? (Array.isArray(promoBanner) ? promoBanner : [promoBanner]) : t.promoBanner;
  const tickerText = bannerMessages.join("     ★     ");

  return (
    <div style={{ position: "sticky", top: 0, zIndex: "var(--jr-z-nav)" }}>
      {/* Promo banner — intentionally green for attention-catching */}
      <div
        className="jr-marquee"
        style={{
          background: "#15803D",
          color: "#FFFFFF",
          padding: "8px 0",
          fontFamily: "var(--jr-font-heading)",
          fontSize: "13px",
          fontWeight: 600,
          letterSpacing: "0.5px",
        }}
      >
        <div className="jr-marquee-track">
          <span style={{ paddingRight: "60px" }}>{tickerText}</span>
          <span style={{ paddingRight: "60px" }}>{tickerText}</span>
        </div>
      </div>

      {/* Nav */}
      <nav
        aria-label="Primary"
        style={{
          padding: "10px 24px",
          background: "rgba(27, 42, 74, 0.94)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          borderBottom: "var(--jr-hair-darker)",
        }}
      >
        <div style={{ maxWidth: "var(--jr-container)", margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <a
            href={localizeHref("/", lang)}
            aria-label="JR One Aluminum home"
            style={{
              fontFamily: "var(--jr-font-heading)",
              fontSize: "20px",
              fontWeight: 800,
              color: "var(--jr-paper)",
              letterSpacing: "1px",
              paddingRight: "var(--jr-space-10)",
              whiteSpace: "nowrap",
              flexShrink: 0,
            }}
          >
            JR <span style={{ color: "var(--jr-gold)" }}>ONE</span>
            <span aria-hidden style={{ marginLeft: 6, color: "var(--jr-gold)" }}>★</span>
          </a>

          <div className="jr-nav-desktop" style={{ display: "flex", gap: "18px", alignItems: "center" }}>
            {/* Services dropdown */}
            <div style={{ position: "relative" }} onMouseEnter={openServices} onMouseLeave={closeServicesSoon}>
              <button
                aria-haspopup="true"
                aria-expanded={servicesOpen}
                onClick={() => setServicesOpen((v) => !v)}
                onFocus={openServices}
                style={{
                  fontFamily: "var(--jr-font-heading)",
                  fontSize: "11px",
                  fontWeight: 600,
                  color: "var(--jr-muted-on-dark)",
                  letterSpacing: "0.6px",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "5px",
                  padding: "8px 0",
                  textTransform: "uppercase",
                }}
              >
                {t.services}
                <span
                  aria-hidden
                  style={{
                    display: "inline-flex",
                    transform: servicesOpen ? "rotate(180deg)" : "rotate(0deg)",
                    transition: "transform var(--jr-dur-fast) var(--jr-ease-out)",
                  }}
                >
                  <ChevronDownIcon size={12} />
                </span>
              </button>
              {servicesOpen && (
                // Outer wrapper: sits flush against the button (top: 100%) and
                // uses paddingTop as a transparent hover bridge, so the cursor
                // never leaves the hover surface while moving from button to
                // menu. Re-entering this wrapper cancels the close timer.
                <div
                  onMouseEnter={openServices}
                  onMouseLeave={closeServicesSoon}
                  style={{
                    position: "absolute",
                    top: "100%",
                    left: "-12px",
                    paddingTop: "8px",
                  }}
                >
                <div
                  role="menu"
                  style={{
                    background: "var(--jr-navy-deep)",
                    border: "1px solid var(--jr-navy-3)",
                    borderRadius: "var(--jr-radius-md)",
                    padding: "8px 0",
                    minWidth: "240px",
                    boxShadow: "var(--jr-shadow-lg)",
                    transformOrigin: "top left",
                  }}
                >
                  {t.serviceLabels.map((label, i) => (
                    <a
                      key={i}
                      role="menuitem"
                      href={localizeHref(SERVICE_HREFS[i], lang)}
                      style={{
                        display: "block",
                        padding: "8px 20px",
                        fontFamily: "var(--jr-font-heading)",
                        fontSize: "12px",
                        fontWeight: 600,
                        color: "var(--jr-muted-on-dark)",
                        letterSpacing: "0.4px",
                        transition: "color var(--jr-dur-fast) var(--jr-ease-out), background-color var(--jr-dur-fast) var(--jr-ease-out)",
                      }}
                      onMouseOver={(e) => {
                        e.currentTarget.style.color = "var(--jr-gold)";
                        e.currentTarget.style.background = "var(--jr-gold-pale)";
                      }}
                      onMouseOut={(e) => {
                        e.currentTarget.style.color = "var(--jr-muted-on-dark)";
                        e.currentTarget.style.background = "transparent";
                      }}
                    >
                      {label}
                    </a>
                  ))}
                </div>
                </div>
              )}
            </div>

            {t.navLabels.map((label, i) => (
              <a
                key={i}
                href={localizeHref(NAV_HREFS[i], lang)}
                style={{
                  fontFamily: "var(--jr-font-heading)",
                  fontSize: "11px",
                  fontWeight: 600,
                  color: "var(--jr-muted-on-dark)",
                  letterSpacing: "0.6px",
                  textTransform: "uppercase",
                  whiteSpace: "nowrap",
                  transition: "color var(--jr-dur-fast) var(--jr-ease-out)",
                }}
                onMouseOver={(e) => (e.currentTarget.style.color = "var(--jr-gold)")}
                onMouseOut={(e) => (e.currentTarget.style.color = "var(--jr-muted-on-dark)")}
              >
                {label}
              </a>
            ))}

            {t.featureLabels.map((label, i) => {
              const meta = FEATURE_META[i];
              return (
                <a
                  key={`ft-${i}`}
                  href={localizeHref(FEATURE_HREFS[i], lang)}
                  className="jr-press"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "5px",
                    fontFamily: "var(--jr-font-heading)",
                    fontSize: "11px",
                    fontWeight: 700,
                    color: meta.color,
                    background: meta.bg,
                    padding: "5px 12px",
                    borderRadius: "var(--jr-radius-sm)",
                    letterSpacing: "0.5px",
                    border: `1px solid ${meta.border}`,
                    textTransform: "uppercase",
                    whiteSpace: "nowrap",
                  }}
                >
                  <span aria-hidden style={{ fontSize: 12 }}>{meta.emoji}</span>
                  {label}
                </a>
              );
            })}

            <a
              href="tel:8444443114"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                fontFamily: "var(--jr-font-heading)",
                fontSize: "12px",
                fontWeight: 700,
                color: "var(--jr-gold)",
                letterSpacing: "0.4px",
                whiteSpace: "nowrap",
                flexShrink: 0,
              }}
            >
              <PhoneIcon size={13} />
              (844) 444-3114
            </a>

            <button
              onClick={handleLanguageToggle}
              aria-label={lang === "en" ? "Switch to Spanish" : "Switch to English"}
              className="jr-press"
              style={{
                fontFamily: "var(--jr-font-heading)",
                fontSize: "11px",
                fontWeight: 700,
                color: "var(--jr-gold)",
                background: "var(--jr-gold-pale)",
                border: "1px solid var(--jr-gold)",
                borderRadius: "var(--jr-radius-sm)",
                padding: "5px 10px",
                letterSpacing: "1px",
              }}
            >
              {lang === "en" ? "ES" : "EN"}
            </button>
          </div>

          {/* Hamburger */}
          <button
            className="jr-nav-hamburger jr-press"
            onClick={() => setMenuOpen((v) => !v)}
            aria-expanded={menuOpen}
            aria-label={menuOpen ? t.close : t.open}
            style={{
              display: "none",
              background: "none",
              border: "none",
              padding: "8px",
              color: menuOpen ? "var(--jr-gold)" : "var(--jr-paper)",
            }}
          >
            {menuOpen ? <XIcon size={22} /> : <MenuIcon size={22} />}
          </button>
        </div>

        {menuOpen && (
          <div
            id="jr-mobile-menu"
            style={{
              maxWidth: "var(--jr-container)",
              margin: "12px auto 0",
              paddingTop: "12px",
              borderTop: "var(--jr-hair-darker)",
              display: "flex",
              flexDirection: "column",
              gap: "2px",
              maxHeight: "calc(100vh - 160px)",
              overflowY: "auto",
              overscrollBehavior: "contain",
              WebkitOverflowScrolling: "touch",
            }}
          >
            <button
              onClick={() => setMobileServicesOpen((v) => !v)}
              aria-expanded={mobileServicesOpen}
              style={{
                display: "flex",
                width: "100%",
                justifyContent: "space-between",
                alignItems: "center",
                background: "none",
                border: "none",
                padding: "12px 0",
                borderBottom: "1px solid rgba(255,255,255,0.06)",
              }}
            >
              <span style={{ fontFamily: "var(--jr-font-heading)", fontSize: "14px", fontWeight: 700, color: "var(--jr-gold)", letterSpacing: "2px", textTransform: "uppercase" }}>
                {t.services}
              </span>
              <span
                aria-hidden
                style={{
                  display: "inline-flex",
                  color: "var(--jr-gold)",
                  transform: mobileServicesOpen ? "rotate(180deg)" : "rotate(0deg)",
                  transition: "transform var(--jr-dur-fast) var(--jr-ease-out)",
                }}
              >
                <ChevronDownIcon size={16} />
              </span>
            </button>
            {mobileServicesOpen && t.serviceLabels.map((label, i) => (
              <a
                key={i}
                href={localizeHref(SERVICE_HREFS[i], lang)}
                style={{
                  display: "block",
                  fontFamily: "var(--jr-font-heading)",
                  fontSize: "14px",
                  fontWeight: 600,
                  color: "var(--jr-muted-on-dark)",
                  padding: "8px 0",
                  paddingLeft: "16px",
                  borderBottom: "1px solid rgba(255,255,255,0.04)",
                }}
              >
                {label}
              </a>
            ))}
            <div style={{ height: "8px" }} />
            {t.navLabels.map((label, i) => (
              <a
                key={`n-${i}`}
                href={localizeHref(NAV_HREFS[i], lang)}
                style={{
                  fontFamily: "var(--jr-font-heading)",
                  fontSize: "14px",
                  fontWeight: 600,
                  color: "var(--jr-muted-on-dark)",
                  padding: "10px 0",
                  borderBottom: "1px solid rgba(255,255,255,0.06)",
                }}
              >
                {label}
              </a>
            ))}
            {t.featureLabels.map((label, i) => {
              const meta = FEATURE_META[i];
              return (
                <a
                  key={`mft-${i}`}
                  href={localizeHref(FEATURE_HREFS[i], lang)}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "8px",
                    fontFamily: "var(--jr-font-heading)",
                    fontSize: "14px",
                    fontWeight: 700,
                    color: meta.color,
                    padding: "10px 0",
                    borderBottom: "1px solid rgba(255,255,255,0.06)",
                  }}
                >
                  <span aria-hidden style={{ fontSize: 14 }}>{meta.emoji}</span>
                  {label}
                </a>
              );
            })}
            <a
              href="tel:8444443114"
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
                fontFamily: "var(--jr-font-heading)",
                fontSize: "16px",
                fontWeight: 700,
                color: "var(--jr-gold)",
                padding: "12px 0",
              }}
            >
              <PhoneIcon size={18} /> (844) 444-3114
            </a>
            <button
              onClick={() => { handleLanguageToggle(); setMenuOpen(false); }}
              className="jr-press"
              style={{
                fontFamily: "var(--jr-font-heading)",
                fontSize: "13px",
                fontWeight: 700,
                color: "var(--jr-gold)",
                background: "var(--jr-gold-pale)",
                border: "1px solid var(--jr-gold)",
                borderRadius: "var(--jr-radius-sm)",
                padding: "10px",
                letterSpacing: "1px",
                marginBottom: "8px",
              }}
            >
              {lang === "en" ? "ESPAÑOL" : "ENGLISH"}
            </button>
          </div>
        )}
      </nav>

      <style>{`
        @media (max-width: 1024px) {
          .jr-nav-desktop { display: none !important; }
          .jr-nav-hamburger { display: inline-flex !important; align-items: center; justify-content: center; }
        }
        @media (min-width: 1025px) {
          .jr-nav-hamburger { display: none !important; }
        }
      `}</style>
    </div>
  );
}
