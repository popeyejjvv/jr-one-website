"use client";

/* ═══════════════════════════════════════════════════════════
   JR ONE ALUMINUM: TERMS OF SERVICE
   Brand-brain compliant. Tokens via app/tokens.css.
   ═══════════════════════════════════════════════════════════ */

import SiteNav from "../../components/SiteNav";
import SiteFooter from "../../components/SiteFooter";
import MobileCTA from "../../components/MobileCTA";
import Container from "../../components/ui/Container";
import { useLanguage } from "../../lib/LanguageContext";
import { localizeHref } from "../../lib/locale";

const T = {
  en: {
    tag: "LEGAL",
    title: "Terms of Service",
    updated: "Last updated: April 2026",
    intro: "Welcome to jronegutters.com, operated by JR One Aluminum LLC. By using our website, you agree to these Terms of Service.",
    h2Use: "Use of Website",
    pUse: "This website is provided for informational purposes and to facilitate communication about our services. You agree to use the site lawfully and not to interfere with its operation or security.",
    h2Quotes: "Quote Requests",
    pQuotes: "Submitting a quote request through our website does not create a contractual obligation. All quotes are estimates and subject to final assessment upon on-site inspection. Pricing may vary based on actual conditions, materials, and scope of work.",
    h2Agreements: "Service Agreements",
    pAgreements: "Actual service agreements are established through separate written contracts between you and JR One Aluminum LLC. Work does not begin until a written agreement is signed by both parties.",
    h2IP: "Intellectual Property",
    pIP: "All content on this website (including text, images, logos, and design) is the property of JR One Aluminum LLC and is protected by applicable intellectual property laws. You may not reproduce, distribute, or use our content without written permission.",
    h2Liability: "Limitation of Liability",
    pLiability: 'JR One Aluminum LLC provides this website "as is" and makes no warranties about the accuracy or completeness of its content. We are not liable for any damages arising from your use of this website.',
    h2Warranties: "Warranties and Guarantees",
    pWarranties: "Product and service warranties are governed by your individual service agreement, not by information on this website. For warranty details, visit our",
    warrantiesLink: "Warranties page",
    pWarrantiesSuffix: "or contact us directly.",
    h2Law: "Governing Law",
    pLaw: "These terms are governed by the laws of the State of Florida. Any disputes will be resolved in the courts of Hillsborough County, Florida.",
    h2Changes: "Changes to Terms",
    pChanges: "We may update these terms at any time. Continued use of the website after changes constitutes acceptance of the updated terms.",
    h2Contact: "Contact Us",
    pContact: "Questions about these terms? Contact us at:",
  },
  es: {
    tag: "LEGAL",
    title: "Términos de Servicio",
    updated: "Última actualización: abril 2026",
    intro: "Bienvenido a jronegutters.com, operado por JR One Aluminum LLC. Al usar nuestro sitio web, usted acepta estos Términos de Servicio.",
    h2Use: "Uso del Sitio Web",
    pUse: "Este sitio web se proporciona con fines informativos y para facilitar la comunicación sobre nuestros servicios. Usted acepta usar el sitio de manera legal y no interferir con su operación o seguridad.",
    h2Quotes: "Solicitudes de Presupuesto",
    pQuotes: "Enviar una solicitud de presupuesto a través de nuestro sitio web no crea una obligación contractual. Todos los presupuestos son estimados y están sujetos a una evaluación final tras la inspección en sitio. Los precios pueden variar según las condiciones reales, materiales y alcance del trabajo.",
    h2Agreements: "Acuerdos de Servicio",
    pAgreements: "Los acuerdos de servicio reales se establecen mediante contratos escritos separados entre usted y JR One Aluminum LLC. El trabajo no comienza hasta que ambas partes firmen un acuerdo por escrito.",
    h2IP: "Propiedad Intelectual",
    pIP: "Todo el contenido de este sitio web (incluyendo texto, imágenes, logotipos y diseño) es propiedad de JR One Aluminum LLC y está protegido por las leyes de propiedad intelectual aplicables. No puede reproducir, distribuir ni usar nuestro contenido sin permiso por escrito.",
    h2Liability: "Limitación de Responsabilidad",
    pLiability: 'JR One Aluminum LLC proporciona este sitio web "tal cual" y no ofrece garantías sobre la precisión o integridad de su contenido. No somos responsables por ningún daño que surja del uso de este sitio web.',
    h2Warranties: "Garantías",
    pWarranties: "Las garantías de productos y servicios se rigen por su acuerdo de servicio individual, no por la información de este sitio web. Para detalles de garantía, visite nuestra",
    warrantiesLink: "página de Garantías",
    pWarrantiesSuffix: "o contáctenos directamente.",
    h2Law: "Ley Aplicable",
    pLaw: "Estos términos se rigen por las leyes del Estado de Florida. Cualquier disputa se resolverá en los tribunales del Condado de Hillsborough, Florida.",
    h2Changes: "Cambios en los Términos",
    pChanges: "Podemos actualizar estos términos en cualquier momento. El uso continuado del sitio web después de los cambios constituye la aceptación de los términos actualizados.",
    h2Contact: "Contáctenos",
    pContact: "¿Tiene preguntas sobre estos términos? Contáctenos en:",
  },
};

export default function TermsOfServicePage() {
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
                border: "1px solid rgba(212, 175, 55, 0.28)",
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

            <h2 style={h2Style}>{t.h2Use}</h2>
            <p style={pStyle}>{t.pUse}</p>

            <h2 style={h2Style}>{t.h2Quotes}</h2>
            <p style={pStyle}>{t.pQuotes}</p>

            <h2 style={h2Style}>{t.h2Agreements}</h2>
            <p style={pStyle}>{t.pAgreements}</p>

            <h2 style={h2Style}>{t.h2IP}</h2>
            <p style={pStyle}>{t.pIP}</p>

            <h2 style={h2Style}>{t.h2Liability}</h2>
            <p style={pStyle}>{t.pLiability}</p>

            <h2 style={h2Style}>{t.h2Warranties}</h2>
            <p style={pStyle}>
              {t.pWarranties} <a href={localizeHref("/warranties", lang)} style={linkStyle}>{t.warrantiesLink}</a> {t.pWarrantiesSuffix}
            </p>

            <h2 style={h2Style}>{t.h2Law}</h2>
            <p style={pStyle}>{t.pLaw}</p>

            <h2 style={h2Style}>{t.h2Changes}</h2>
            <p style={pStyle}>{t.pChanges}</p>

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
