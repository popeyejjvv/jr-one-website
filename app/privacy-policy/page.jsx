"use client";

/* ═══════════════════════════════════════════════════════════
   JR ONE ALUMINUM: PRIVACY POLICY
   Brand-brain compliant. Tokens via app/tokens.css.
   ═══════════════════════════════════════════════════════════ */

import SiteNav from "../../components/SiteNav";
import SiteFooter from "../../components/SiteFooter";
import MobileCTA from "../../components/MobileCTA";
import Container from "../../components/ui/Container";
import { useLanguage } from "../../lib/LanguageContext";

const T = {
  en: {
    tag: "LEGAL",
    title: "Privacy Policy",
    updated: "Last updated: April 2026",
    intro: 'JR One Aluminum LLC ("we," "us," or "our") respects your privacy. This Privacy Policy explains how we collect, use, and protect information when you visit jronegutters.com or interact with our services.',
    h2Collect: "Information We Collect",
    pCollect: "When you request a quote or contact us, we may collect your name, phone number, email address, ZIP code, and details about the service you need. We also collect standard website usage data through cookies and analytics tools, including your IP address, browser type, and pages visited.",
    h2Use: "How We Use Your Information",
    pUse: "We use your information to respond to quote requests, provide our services, communicate about your project, send relevant updates or promotions (with your consent), and improve our website and customer experience.",
    h2Share: "Information Sharing",
    pShare: "We do not sell or rent your personal information. We may share information with service providers who help us operate our business (such as email platforms and CRM tools), but only as necessary to serve you. We may also disclose information if required by law.",
    h2Security: "Data Security",
    pSecurity: "We implement reasonable security measures to protect your information. However, no internet transmission is completely secure, and we cannot guarantee absolute security.",
    h2Cookies: "Cookies",
    pCookies: "Our website uses cookies and similar technologies to analyze traffic and improve your experience. You can control cookie preferences through your browser settings.",
    h2Rights: "Your Rights",
    pRights: "You may request access to, correction of, or deletion of your personal information at any time by contacting us. Florida residents may have additional rights under applicable state privacy laws.",
    h2Contact: "Contact Us",
    pContact: "If you have questions about this Privacy Policy, contact us at:",
  },
  es: {
    tag: "LEGAL",
    title: "Política de Privacidad",
    updated: "Última actualización: abril 2026",
    intro: 'JR One Aluminum LLC ("nosotros" o "nuestro") respeta su privacidad. Esta Política de Privacidad explica cómo recopilamos, usamos y protegemos la información cuando visita jronegutters.com o interactúa con nuestros servicios.',
    h2Collect: "Información que Recopilamos",
    pCollect: "Cuando solicita un presupuesto o se comunica con nosotros, podemos recopilar su nombre, número de teléfono, dirección de correo electrónico, código postal y detalles sobre el servicio que necesita. También recopilamos datos estándar de uso del sitio web a través de cookies y herramientas de análisis, incluyendo su dirección IP, tipo de navegador y páginas visitadas.",
    h2Use: "Cómo Usamos Su Información",
    pUse: "Usamos su información para responder a solicitudes de presupuesto, proporcionar nuestros servicios, comunicarnos sobre su proyecto, enviar actualizaciones o promociones relevantes (con su consentimiento) y mejorar nuestro sitio web y la experiencia del cliente.",
    h2Share: "Compartir Información",
    pShare: "No vendemos ni alquilamos su información personal. Podemos compartir información con proveedores de servicios que nos ayudan a operar nuestro negocio (como plataformas de correo electrónico y herramientas CRM), pero solo según sea necesario para atenderle. También podemos divulgar información si lo requiere la ley.",
    h2Security: "Seguridad de Datos",
    pSecurity: "Implementamos medidas de seguridad razonables para proteger su información. Sin embargo, ninguna transmisión por Internet es completamente segura, y no podemos garantizar seguridad absoluta.",
    h2Cookies: "Cookies",
    pCookies: "Nuestro sitio web utiliza cookies y tecnologías similares para analizar el tráfico y mejorar su experiencia. Puede controlar las preferencias de cookies a través de la configuración de su navegador.",
    h2Rights: "Sus Derechos",
    pRights: "Puede solicitar acceso, corrección o eliminación de su información personal en cualquier momento comunicándose con nosotros. Los residentes de Florida pueden tener derechos adicionales bajo las leyes de privacidad estatales aplicables.",
    h2Contact: "Contáctenos",
    pContact: "Si tiene preguntas sobre esta Política de Privacidad, contáctenos en:",
  },
};

export default function PrivacyPolicyPage() {
  const { lang } = useLanguage();
  const t = T[lang];

  const h2Style = {
    fontFamily: "var(--jr-font-heading)",
    fontSize: "var(--jr-text-xl)",
    fontWeight: 700,
    color: "var(--jr-paper)",
    marginTop: "var(--jr-space-10)",
    marginBottom: "var(--jr-space-3)",
    letterSpacing: "0.3px",
  };
  const pStyle = {
    fontFamily: "var(--jr-font-body)",
    fontSize: "var(--jr-text-md)",
    color: "var(--jr-cream-2)",
    lineHeight: 1.75,
    marginBottom: "var(--jr-space-4)",
  };
  const linkStyle = { color: "var(--jr-gold)", textDecoration: "none" };

  return (
    <div style={{ background: "var(--jr-navy)", color: "var(--jr-paper)", minHeight: "100vh" }}>
      <a href="#main" className="jr-skip-link">Skip to content</a>
      <SiteNav />

      <main id="main">
        <section style={{ padding: "var(--jr-space-16) 0 var(--jr-space-20)" }}>
          <Container size="prose">
            <div
              style={{
                display: "inline-block",
                padding: "6px 14px",
                background: "var(--jr-gold-pale)",
                border: "1px solid rgba(200, 149, 46, 0.28)",
                borderRadius: "var(--jr-radius-sm)",
                marginBottom: "var(--jr-space-3)",
              }}
            >
              <span
                style={{
                  fontFamily: "var(--jr-font-heading)",
                  fontSize: "var(--jr-text-xs)",
                  fontWeight: 700,
                  color: "var(--jr-gold)",
                  letterSpacing: "3px",
                  textTransform: "uppercase",
                }}
              >
                {t.tag}
              </span>
            </div>
            <h1
              style={{
                fontFamily: "var(--jr-font-heading)",
                fontSize: "var(--jr-text-3xl)",
                fontWeight: 800,
                color: "var(--jr-paper)",
                marginBottom: "var(--jr-space-2)",
                letterSpacing: "-0.3px",
                lineHeight: 1.1,
              }}
            >
              {t.title}
            </h1>
            <p
              style={{
                fontFamily: "var(--jr-font-body)",
                fontSize: "var(--jr-text-sm)",
                color: "var(--jr-muted-on-dark)",
                marginBottom: "var(--jr-space-8)",
              }}
            >
              {t.updated}
            </p>

            <p style={pStyle}>{t.intro}</p>

            <h2 style={h2Style}>{t.h2Collect}</h2>
            <p style={pStyle}>{t.pCollect}</p>

            <h2 style={h2Style}>{t.h2Use}</h2>
            <p style={pStyle}>{t.pUse}</p>

            <h2 style={h2Style}>{t.h2Share}</h2>
            <p style={pStyle}>{t.pShare}</p>

            <h2 style={h2Style}>{t.h2Security}</h2>
            <p style={pStyle}>{t.pSecurity}</p>

            <h2 style={h2Style}>{t.h2Cookies}</h2>
            <p style={pStyle}>{t.pCookies}</p>

            <h2 style={h2Style}>{t.h2Rights}</h2>
            <p style={pStyle}>{t.pRights}</p>

            <h2 style={h2Style}>{t.h2Contact}</h2>
            <p style={pStyle}>{t.pContact}</p>
            <p style={pStyle}>
              JR One Aluminum LLC<br />
              Tampa, FL<br />
              Phone: <a href="tel:8444443114" style={linkStyle}>(844) 444-3114</a><br />
              Email: <a href="mailto:info@jronegutters.com" style={linkStyle}>info@jronegutters.com</a>
            </p>
          </Container>
        </section>
      </main>

      <SiteFooter />
      <MobileCTA />
    </div>
  );
}
