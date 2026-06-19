"use client";

/* ═══════════════════════════════════════════════════════════
   JR ONE , SHARED FOOTER
   4-col: company, services, areas, resources, contact (5 cols on wide).
   Brand-brain compliant: tagline rewritten, no puffery.
   ═══════════════════════════════════════════════════════════ */

import { useLanguage } from "../lib/LanguageContext";
import { PhoneIcon, MailIcon, MapPinIcon } from "../lib/icons";
import { localizeHref } from "../lib/locale";

const SERVICE_NAMES = {
  en: ["Copper Gutters", "Drainage Installation", "Govee Lights", "Gutter Guards", "Gutter Repair", "Peak 301", "SAGIPER", "Seamless Gutters", "Service Plans", "Siding", "Soffit & Fascia", "Specialty Gutters", "7-Inch Gutters"],
  es: ["Canaletas de Cobre", "Instalación de Drenaje", "Luces Govee", "Protectores de Canaletas", "Reparación de Canaletas", "Peak 301", "SAGIPER", "Canaletas Sin Costura", "Planes de Servicio", "Revestimiento", "Sofito y Fascia", "Canaletas Especiales", "Canaletas de 7 Pulgadas"],
};

const SERVICE_HREFS = [
  "/copper-gutters", "/drainage-assessment", "/govee-lights", "/gutter-guards",
  "/gutter-repair", "/peak-301", "/sagiper", "/seamless-aluminum-gutters",
  "/service-plans", "/siding", "/soffit-and-fascia", "/specialty-gutters",
  "/7-inch-gutters",
];

const T = {
  en: {
    tagline: "Family-Owned. Over 30 Years in the Trade.",
    description: "A Tampa Bay specialty trade contractor. Gutters, soffit, fascia, drainage, and Peak 301 roof rejuvenation. Fully insured.",
    services: "Services",
    serviceAreas: "Service Areas",
    contact: "Contact",
    resources: "Resources",
    resourceLinks: [
      { label: "Warranties", href: "/warranties" },
      { label: "License & Insurance", href: "/resources" },
      { label: "Care Guides", href: "/resources" },
      { label: "About Us", href: "/about" },
      { label: "FAQ", href: "/faq" },
      { label: "Financing", href: "/financing" },
      { label: "Insurance Resource Center", href: "/insurance-resource-center" },
      { label: "Blog", href: "/blog" },
      { label: "Image License", href: "/image-license" },
    ],
    address: "Serving Tampa Bay, FL and surrounding counties",
    copyright: "© 2026 JR One Aluminum LLC. All rights reserved.",
    privacy: "Privacy Policy",
    terms: "Terms of Service",
  },
  es: {
    tagline: "Empresa familiar. Más de 30 años en el oficio.",
    description: "Un contratista especialista de Tampa Bay. Canaletas, sofito, fascia, drenaje y rejuvenecimiento Peak 301. Totalmente asegurados.",
    services: "Servicios",
    serviceAreas: "Áreas de Servicio",
    contact: "Contacto",
    resources: "Recursos",
    resourceLinks: [
      { label: "Garantías", href: "/warranties" },
      { label: "Licencia y Seguro", href: "/resources" },
      { label: "Guías de Cuidado", href: "/resources" },
      { label: "Sobre Nosotros", href: "/about" },
      { label: "Preguntas Frecuentes", href: "/faq" },
      { label: "Financiamiento", href: "/financing" },
      { label: "Centro de Recursos de Seguros", href: "/insurance-resource-center" },
      { label: "Blog", href: "/blog" },
      { label: "Licencia de Imágenes", href: "/image-license" },
    ],
    address: "Sirviendo Tampa Bay, FL y áreas cercanas",
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

const linkStyle = {
  display: "block",
  fontFamily: "var(--jr-font-body)",
  fontSize: "14px",
  color: "var(--jr-muted-on-dark)",
  marginBottom: "8px",
  transition: "color var(--jr-dur-fast) var(--jr-ease-out)",
};

const headingStyle = {
  fontFamily: "var(--jr-font-heading)",
  fontSize: "12px",
  fontWeight: 700,
  color: "var(--jr-paper)",
  letterSpacing: "2px",
  marginBottom: "16px",
  textTransform: "uppercase",
};

function FooterLink({ href, children, target, rel }) {
  return (
    <a
      href={href}
      target={target}
      rel={rel}
      style={linkStyle}
      onMouseOver={(e) => (e.currentTarget.style.color = "var(--jr-gold)")}
      onMouseOut={(e) => (e.currentTarget.style.color = "var(--jr-muted-on-dark)")}
    >
      {children}
    </a>
  );
}

export default function SiteFooter() {
  const { lang } = useLanguage();
  const t = T[lang];
  const serviceNames = SERVICE_NAMES[lang];

  return (
    <footer
      style={{
        background: "var(--jr-navy-deep)",
        borderTop: "var(--jr-hair-darker)",
        padding: "60px 24px 100px",
        color: "var(--jr-muted-on-dark)",
      }}
    >
      <div
        style={{
          maxWidth: "var(--jr-container)",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "40px",
        }}
      >
        {/* Company */}
        <div>
          <div
            style={{
              fontFamily: "var(--jr-font-heading)",
              fontSize: "24px",
              fontWeight: 800,
              color: "var(--jr-paper)",
              marginBottom: "6px",
              letterSpacing: "1px",
            }}
          >
            JR <span style={{ color: "var(--jr-gold)" }}>ONE</span>
            <span aria-hidden style={{ color: "var(--jr-gold)", marginLeft: 6, fontSize: "18px" }}>★</span>
          </div>
          <p
            style={{
              fontFamily: "var(--jr-font-heading)",
              fontSize: "13px",
              fontWeight: 600,
              color: "var(--jr-gold)",
              marginBottom: "12px",
              letterSpacing: "0.5px",
            }}
          >
            {t.tagline}
          </p>
          <p
            style={{
              fontFamily: "var(--jr-font-body)",
              fontSize: "14px",
              color: "var(--jr-muted-on-dark)",
              lineHeight: 1.6,
            }}
          >
            {t.description}
          </p>
        </div>

        {/* Services */}
        <div>
          <h4 style={headingStyle}>{t.services}</h4>
          {serviceNames.map((name, i) => (
            <FooterLink key={i} href={localizeHref(SERVICE_HREFS[i], lang)}>{name}</FooterLink>
          ))}
        </div>

        {/* Areas */}
        <div>
          <h4 style={headingStyle}>{t.serviceAreas}</h4>
          {CITIES.map((city) => (
            <FooterLink key={city.slug} href={localizeHref(`/areas/${city.slug}`, lang)}>{city.name}</FooterLink>
          ))}
        </div>

        {/* Resources */}
        <div>
          <h4 style={headingStyle}>{t.resources}</h4>
          {t.resourceLinks.map((link, i) => (
            <FooterLink key={i} href={localizeHref(link.href, lang)}>{link.label}</FooterLink>
          ))}
        </div>

        {/* Contact */}
        <div>
          <h4 style={headingStyle}>{t.contact}</h4>
          <a
            href="tel:8444443114"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              fontFamily: "var(--jr-font-heading)",
              fontSize: "14px",
              color: "var(--jr-gold)",
              fontWeight: 700,
              marginBottom: "10px",
            }}
          >
            <PhoneIcon size={14} />
            (844) 444-3114
          </a>
          <a
            href="mailto:info@jronegutters.com"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              fontFamily: "var(--jr-font-body)",
              fontSize: "14px",
              color: "var(--jr-muted-on-dark)",
              marginBottom: "10px",
            }}
          >
            <MailIcon size={14} />
            info@jronegutters.com
          </a>
          <p
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              fontFamily: "var(--jr-font-body)",
              fontSize: "14px",
              color: "var(--jr-muted-on-dark)",
              marginBottom: "16px",
            }}
          >
            <MapPinIcon size={14} />
            {t.address}
          </p>
          <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
            {[
              { label: "Facebook", href: "https://www.facebook.com/people/Jr-One-Aluminum-LLC/61568068558954/" },
              { label: "Instagram", href: "https://www.instagram.com/jronegutters" },
              { label: "Google", href: "https://www.google.com/maps/place/JR+One+Aluminum+LLC+-+Gutter+Repair+%26+Installation/@27.9614157,-82.5032424,17z/data=!3m1!4b1!4m6!3m5!1s0x88c2c32cbbf79527:0xd4f66138eefca78e!8m2!3d27.961411!4d-82.5006675!16s%2Fg%2F11fcvc1w45" },
            ].map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="jr-press"
                style={{
                  fontFamily: "var(--jr-font-heading)",
                  fontSize: "11px",
                  fontWeight: 600,
                  color: "var(--jr-muted-on-dark)",
                  padding: "6px 10px",
                  border: "var(--jr-hair-darker)",
                  borderRadius: "var(--jr-radius-sm)",
                  letterSpacing: "0.4px",
                  textTransform: "uppercase",
                }}
              >
                {s.label}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div
        style={{
          maxWidth: "var(--jr-container)",
          margin: "40px auto 0",
          paddingTop: "24px",
          borderTop: "var(--jr-hair-darker)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "12px",
        }}
      >
        <p style={{ fontFamily: "var(--jr-font-body)", fontSize: "12px", color: "var(--jr-muted-on-dark)" }}>
          {t.copyright}
        </p>
        <div style={{ display: "flex", gap: "20px" }}>
          <a href={localizeHref("/privacy-policy", lang)} style={{ fontFamily: "var(--jr-font-body)", fontSize: "12px", color: "var(--jr-muted-on-dark)" }}>{t.privacy}</a>
          <a href={localizeHref("/terms-of-service", lang)} style={{ fontFamily: "var(--jr-font-body)", fontSize: "12px", color: "var(--jr-muted-on-dark)" }}>{t.terms}</a>
        </div>
      </div>
    </footer>
  );
}
