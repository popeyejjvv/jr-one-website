"use client";

/* ═══════════════════════════════════════════════════════════
   JR ONE — SHARED FOOTER COMPONENT
   Full 4-column footer + copyright + privacy/terms
   Used on every page for consistency
   ═══════════════════════════════════════════════════════════ */

import { useLanguage } from "../lib/LanguageContext";

const C = {
  bg: "#0B1628", navy: "#1B2A4A", navyLight: "#2C3E5A", navyFade: "#162033",
  gold: "#C8952E", goldLight: "#D4A843",
  white: "#FFFFFF", muted: "#7A8FA8",
};
const f = { h: "'Montserrat', sans-serif", b: "'Source Sans 3', sans-serif" };

const SERVICE_NAMES = {
  en: ["Copper Gutters", "Drainage Installation", "Govee Lights", "Gutter Guards", "Gutter Repair", "Peak 301", "SAGIPER", "Seamless Gutters", "Service Plans", "Siding", "Soffit & Fascia", "Specialty Gutters"],
  es: ["Canaletas de Cobre", "Instalación de Drenaje", "Luces Govee", "Protectores de Canaletas", "Reparación de Canaletas", "Peak 301", "SAGIPER", "Canaletas Sin Costura", "Planes de Servicio", "Revestimiento", "Sofito y Fascia", "Canaletas Especiales"],
};

const SERVICE_HREFS = [
  "/copper-gutters", "/drainage-assessment", "/govee-lights", "/gutter-guards",
  "/gutter-repair", "/peak-301", "/sagiper", "/seamless-aluminum-gutters",
  "/service-plans", "/siding", "/soffit-and-fascia", "/specialty-gutters",
];

const T = {
  en: {
    tagline: "The Superior Soffit & Gutter Experts",
    description: "Family-owned and operated for 30+ years. Tampa Bay's trusted aluminum specialists.",
    services: "SERVICES",
    serviceAreas: "SERVICE AREAS",
    contact: "CONTACT",
    resources: "RESOURCES",
    resourceLinks: [
      { label: "Warranties", href: "/warranties" },
      { label: "License & Insurance", href: "/resources" },
      { label: "Care Guides", href: "/resources" },
      { label: "About Us", href: "/about" },
      { label: "FAQ", href: "/faq" },
      { label: "Financing", href: "/financing" },
    ],
    copyright: "© 2026 JR One Aluminum LLC. All rights reserved.",
    privacy: "Privacy Policy",
    terms: "Terms of Service",
  },
  es: {
    tagline: "Los Expertos Superiores en Sofito y Canaletas",
    description: "Empresa familiar con más de 30 años de experiencia. Los especialistas en aluminio de confianza en Tampa Bay.",
    services: "SERVICIOS",
    serviceAreas: "ÁREAS DE SERVICIO",
    contact: "CONTACTO",
    resources: "RECURSOS",
    resourceLinks: [
      { label: "Garantías", href: "/warranties" },
      { label: "Licencia y Seguro", href: "/resources" },
      { label: "Guías de Cuidado", href: "/resources" },
      { label: "Sobre Nosotros", href: "/about" },
      { label: "Preguntas Frecuentes", href: "/faq" },
      { label: "Financiamiento", href: "/financing" },
    ],
    copyright: "© 2026 JR One Aluminum LLC. Todos los derechos reservados.",
    privacy: "Política de Privacidad",
    terms: "Términos de Servicio",
  },
};

const CITIES = [
  { name: "Bradenton", slug: "bradenton" },
  { name: "Brandon", slug: "brandon" },
  { name: "Clearwater", slug: "clearwater" },
  { name: "Dunedin", slug: "dunedin" },
  { name: "Lakeland", slug: "lakeland" },
  { name: "Land O' Lakes", slug: "land-o-lakes" },
  { name: "Largo", slug: "largo" },
  { name: "Lutz", slug: "lutz" },
  { name: "New Port Richey", slug: "new-port-richey" },
  { name: "Palm Harbor", slug: "palm-harbor" },
  { name: "Plant City", slug: "plant-city" },
  { name: "Riverview", slug: "riverview" },
  { name: "Ruskin", slug: "ruskin" },
  { name: "Sarasota", slug: "sarasota" },
  { name: "Spring Hill", slug: "spring-hill" },
  { name: "St. Petersburg", slug: "st-petersburg" },
  { name: "Sun City Center", slug: "sun-city-center" },
  { name: "Tampa", slug: "tampa" },
  { name: "Tarpon Springs", slug: "tarpon-springs" },
  { name: "Temple Terrace", slug: "temple-terrace" },
  { name: "Wesley Chapel", slug: "wesley-chapel" },
];

export default function SiteFooter() {
  const { lang } = useLanguage();
  const t = T[lang];
  const serviceNames = SERVICE_NAMES[lang];

  return (
    <>
      <footer style={{ background: C.navyFade, borderTop: `1px solid ${C.navyLight}`, padding: "60px 24px 100px" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "40px" }}>
          {/* Company */}
          <div>
            <div style={{ fontFamily: f.h, fontSize: "24px", fontWeight: 800, color: C.white, marginBottom: "4px" }}>
              JR <span style={{ color: C.gold }}>ONE</span> <span style={{ color: C.white, fontSize: "18px" }}>★</span>
            </div>
            <p style={{ fontFamily: f.h, fontSize: "14px", fontWeight: 600, color: C.gold, fontStyle: "italic", marginBottom: "12px" }}>{t.tagline}</p>
            <p style={{ fontFamily: f.b, fontSize: "14px", color: C.muted, lineHeight: 1.55 }}>{t.description}</p>
          </div>

          {/* Services */}
          <div>
            <h4 style={{ fontFamily: f.h, fontSize: "13px", fontWeight: 700, color: C.white, letterSpacing: "2px", marginBottom: "16px" }}>{t.services}</h4>
            {serviceNames.map((name, i) => (
              <a key={i} href={SERVICE_HREFS[i]} style={{ display: "block", fontFamily: f.b, fontSize: "14px", color: C.muted, marginBottom: "8px", textDecoration: "none" }}
                onMouseOver={e => e.target.style.color = C.gold}
                onMouseOut={e => e.target.style.color = C.muted}>
                {name}
              </a>
            ))}
          </div>

          {/* Service Areas */}
          <div>
            <h4 style={{ fontFamily: f.h, fontSize: "13px", fontWeight: 700, color: C.white, letterSpacing: "2px", marginBottom: "16px" }}>{t.serviceAreas}</h4>
            {CITIES.map((city, i) => (
              <a key={i} href={`/areas/${city.slug}`} style={{ display: "block", fontFamily: f.b, fontSize: "14px", color: C.muted, marginBottom: "8px", textDecoration: "none" }}
                onMouseOver={e => e.target.style.color = C.gold}
                onMouseOut={e => e.target.style.color = C.muted}>
                {city.name}
              </a>
            ))}
          </div>

          {/* Resources */}
          <div>
            <h4 style={{ fontFamily: f.h, fontSize: "13px", fontWeight: 700, color: C.white, letterSpacing: "2px", marginBottom: "16px" }}>{t.resources}</h4>
            {t.resourceLinks.map((link, i) => (
              <a key={i} href={link.href} style={{ display: "block", fontFamily: f.b, fontSize: "14px", color: C.muted, marginBottom: "8px", textDecoration: "none" }}
                onMouseOver={e => e.target.style.color = C.gold}
                onMouseOut={e => e.target.style.color = C.muted}>
                {link.label}
              </a>
            ))}
          </div>

          {/* Contact */}
          <div>
            <h4 style={{ fontFamily: f.h, fontSize: "13px", fontWeight: 700, color: C.white, letterSpacing: "2px", marginBottom: "16px" }}>{t.contact}</h4>
            <a href="tel:8444443114" style={{ display: "block", fontFamily: f.b, fontSize: "14px", color: C.gold, marginBottom: "8px", fontWeight: 600, textDecoration: "none" }}>(844) 444-3114</a>
            <a href="mailto:info@jronegutters.com" style={{ display: "block", fontFamily: f.b, fontSize: "14px", color: C.muted, marginBottom: "8px", textDecoration: "none" }}>info@jronegutters.com</a>
            <p style={{ fontFamily: f.b, fontSize: "14px", color: C.muted, marginBottom: "16px" }}>Tampa, FL</p>
            <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
              <a href="https://www.facebook.com/people/Jr-One-Aluminum-LLC/61568068558954/" target="_blank" rel="noopener noreferrer" style={{ fontFamily: f.h, fontSize: "11px", fontWeight: 600, color: C.muted, padding: "6px 10px", border: `1px solid ${C.navyLight}`, borderRadius: "4px", textDecoration: "none" }}>Facebook</a>
              <a href="https://www.instagram.com/jronegutters" target="_blank" rel="noopener noreferrer" style={{ fontFamily: f.h, fontSize: "11px", fontWeight: 600, color: C.muted, padding: "6px 10px", border: `1px solid ${C.navyLight}`, borderRadius: "4px", textDecoration: "none" }}>Instagram</a>
              <a href="https://www.google.com/maps/place/JR+One+Aluminum+LLC+-+Gutter+Repair+%26+Installation/@27.9614157,-82.5032424,17z/data=!3m1!4b1!4m6!3m5!1s0x88c2c32cbbf79527:0xd4f66138eefca78e!8m2!3d27.961411!4d-82.5006675!16s%2Fg%2F11fcvc1w45" target="_blank" rel="noopener noreferrer" style={{ fontFamily: f.h, fontSize: "11px", fontWeight: 600, color: C.muted, padding: "6px 10px", border: `1px solid ${C.navyLight}`, borderRadius: "4px", textDecoration: "none" }}>Google</a>
            </div>
          </div>
        </div>

        {/* Copyright + Legal */}
        <div style={{ maxWidth: "1200px", margin: "40px auto 0", paddingTop: "24px", borderTop: `1px solid ${C.navyLight}`, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "12px" }}>
          <p style={{ fontFamily: f.b, fontSize: "12px", color: C.muted }}>
            {t.copyright}
          </p>
          <div style={{ display: "flex", gap: "20px" }}>
            <a href="/privacy-policy" style={{ fontFamily: f.b, fontSize: "12px", color: C.muted, textDecoration: "none" }}>{t.privacy}</a>
            <a href="/terms-of-service" style={{ fontFamily: f.b, fontSize: "12px", color: C.muted, textDecoration: "none" }}>{t.terms}</a>
          </div>
        </div>
      </footer>
    </>
  );
}
