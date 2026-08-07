"use client";

/* ═══════════════════════════════════════════════════════════
   JR ONE ALUMINUM: RESOURCES
   Brand-brain compliant. Tokens via app/tokens.css.
   ═══════════════════════════════════════════════════════════ */

import SiteNav from "../../components/SiteNav";
import SiteFooter from "../../components/SiteFooter";
import MobileCTA from "../../components/MobileCTA";
import Container from "../../components/ui/Container";
import Button from "../../components/ui/Button";
import SectionHeading from "../../components/ui/SectionHeading";
import CTABand from "../../components/ui/CTABand";
import { useLanguage } from "../../lib/LanguageContext";
import { WrenchIcon, ShieldIcon, HardHatIcon, RoofEdgeIcon } from "../../lib/icons";

const T = {
  en: {
    tag: "RESOURCES",
    heroTitle1: "Everything You Need.",
    heroTitle2: "All In One Place.",
    heroP: "Care guides, license verification, and insurance documentation. Whether you're a homeowner protecting your install for the long run, or a builder vetting us for your next project, it's all here.",

    careTag: "MAINTENANCE",
    careTitle: "Care & Maintenance",
    careIntro: "Your aluminum exterior is built to last decades, but it still needs occasional attention. This plain-English guide walks you through the few simple things that will keep your gutters, soffit, and fascia working for the long run. Available in English and Spanish.",
    careDoc: {
      icon: "wrench",
      title: "Maintenance & Care Guide",
      desc: "A 2-page homeowner guide covering gutter cleaning, soffit and fascia care, what to do twice a year, what to never do, and exactly when to call us instead of DIY. Written in plain language. No jargon, no contractor-speak.",
      en: "JR_One_Maintenance_Care_Guide.pdf",
      es: "es-JR_One_Maintenance_Care_Guide.pdf",
    },

    legalTag: "LICENSE & INSURANCE",
    legalTitle: "Verification Documents",
    legalIntro: "We don't expect you to take our word for it. Below are our official documents, straight from the State of Florida and our insurance carriers. Download whichever you need.",
    legalDocs: [
      {
        icon: "edge",
        title: "Florida LLC Certificate of Active Status",
        desc: "Certificate of Status from the Florida Department of State confirming JR One Aluminum LLC is an active limited liability company in good standing, with its annual report current. Document number L10000115561.",
        file: "JR_One_Sunbiz_Active_Status_2026.pdf",
      },
      {
        icon: "shield",
        title: "Certificate of Insurance: General Liability",
        desc: "ACORD 25 Certificate of Liability Insurance. $1M each occurrence, $2M general aggregate, $1M products/completed operations aggregate. Carrier: Ascendant Commercial Insurance Co. Policy GL-60282-8, in effect through June 21, 2027. Coverage for gutters installation, sheet metal work, and non-structural metal erection.",
        file: "JR_One_COI_General_Liability_2026.pdf",
      },
      {
        icon: "hardhat",
        title: "Certificate of Insurance: Workers' Compensation",
        desc: "ACORD 25 Certificate of Workers' Compensation coverage: $1M each accident, $1M disease per employee, $1M disease policy limit. Carrier: PIE Insurance Company. Policy WC PI 3042545-000, in effect through October 8, 2026. Blanket waiver of subrogation included when required by written contract.",
        file: "JR_One_COI_Workers_Comp_2026.pdf",
      },
      {
        icon: "shield",
        title: "Certificate of Insurance: Commercial Auto",
        desc: "ACORD 25 Certificate of Commercial Auto Liability via Security National Insurance Company. Policy M00012975600, in effect through April 27, 2027. Bodily injury and property damage coverage for scheduled business vehicles.",
        file: "JR_One_COI_Auto_2026.pdf",
      },
    ],

    downloadBtn: "DOWNLOAD PDF",
    englishPdf: "ENGLISH PDF",
    spanishPdf: "ESPAÑOL PDF",

    trustTag: "TRANSPARENCY",
    trustTitle: "Why We Put This Here",
    trustBody: "Most contractors hide their license and insurance documents, or make you call and ask for them. We don't. Our LLC is active and in good standing in Florida, our insurance is current, and our work is backed by a 3-year workmanship warranty. If you want to verify any of it before signing a contract, you should be able to do that on your own time.",

    ctaTitle: "Questions About Any of This?",
    ctaSub: "Call us. We answer the phone, and we'll send anything you need by email if you can't find it here.",
  },
  es: {
    tag: "RECURSOS",
    heroTitle1: "Todo Lo Que Necesita.",
    heroTitle2: "En Un Solo Lugar.",
    heroP: "Guías de cuidado, verificación de licencia y documentación de seguro. Ya sea que sea un propietario protegiendo su instalación a largo plazo, o un constructor evaluándonos para su próximo proyecto, todo está aquí.",

    careTag: "MANTENIMIENTO",
    careTitle: "Cuidado y Mantenimiento",
    careIntro: "Su exterior de aluminio está construido para durar décadas, pero aún necesita atención ocasional. Esta guía en lenguaje sencillo le explica las pocas cosas simples que mantendrán sus canaletas, sofito y fascia funcionando a largo plazo. Disponible en inglés y español.",
    careDoc: {
      icon: "wrench",
      title: "Guía de Mantenimiento y Cuidado",
      desc: "Una guía de 2 páginas para propietarios que cubre la limpieza de canaletas, el cuidado del sofito y la fascia, qué hacer dos veces al año, qué nunca hacer y exactamente cuándo llamarnos en lugar de hacerlo usted mismo. Escrita en lenguaje sencillo. Sin jerga, sin tecnicismos.",
      en: "JR_One_Maintenance_Care_Guide.pdf",
      es: "es-JR_One_Maintenance_Care_Guide.pdf",
    },

    legalTag: "LICENCIA Y SEGURO",
    legalTitle: "Documentos de Verificación",
    legalIntro: "No esperamos que solo crea en nuestra palabra. A continuación están nuestros documentos oficiales, directamente del Estado de Florida y nuestras compañías de seguros. Descargue lo que necesite.",
    legalDocs: [
      {
        icon: "edge",
        title: "Certificado de Estado Activo: Florida LLC",
        desc: "Certificado de Estado del Departamento de Estado de Florida que confirma que JR One Aluminum LLC es una compañía de responsabilidad limitada activa y en buen estado, con su reporte anual al día. Número de documento L10000115561.",
        file: "JR_One_Sunbiz_Active_Status_2026.pdf",
      },
      {
        icon: "shield",
        title: "Certificado de Seguro: Responsabilidad General",
        desc: "Certificado ACORD 25 de Seguro de Responsabilidad. $1M por ocurrencia, $2M agregado general, $1M agregado de productos/operaciones completadas. Aseguradora: Ascendant Commercial Insurance Co. Póliza GL-60282-8, vigente hasta el 21 de junio de 2027. Cobertura para instalación de canaletas, trabajo de chapa metálica y montaje de metal no estructural.",
        file: "JR_One_COI_General_Liability_2026.pdf",
      },
      {
        icon: "hardhat",
        title: "Certificado de Seguro: Compensación al Trabajador",
        desc: "Certificado ACORD 25 de Compensación al Trabajador: $1M por accidente, $1M por enfermedad por empleado, $1M límite de póliza por enfermedad. Aseguradora: PIE Insurance Company. Póliza WC PI 3042545-000, vigente hasta el 8 de octubre de 2026. Incluye exención general de subrogación cuando sea requerida por contrato escrito.",
        file: "JR_One_COI_Workers_Comp_2026.pdf",
      },
      {
        icon: "shield",
        title: "Certificado de Seguro: Auto Comercial",
        desc: "Certificado ACORD 25 de Responsabilidad de Auto Comercial a través de Security National Insurance Company. Póliza M00012975600, vigente hasta el 27 de abril de 2027. Cobertura de lesiones corporales y daños a la propiedad para vehículos comerciales programados.",
        file: "JR_One_COI_Auto_2026.pdf",
      },
    ],

    downloadBtn: "DESCARGAR PDF",
    englishPdf: "ENGLISH PDF",
    spanishPdf: "ESPAÑOL PDF",

    trustTag: "TRANSPARENCIA",
    trustTitle: "Por Qué Publicamos Esto",
    trustBody: "La mayoría de los contratistas esconden sus documentos de licencia y seguro, o hacen que llame y los pida. Nosotros no. Nuestra LLC está activa y en regla en Florida, nuestro seguro está vigente, y nuestro trabajo está respaldado por una garantía de mano de obra de 3 años. Si quiere verificar cualquiera de esto antes de firmar un contrato, debería poder hacerlo en su propio tiempo.",

    ctaTitle: "¿Preguntas Sobre Algo de Esto?",
    ctaSub: "Llámenos. Contestamos el teléfono, y le enviaremos cualquier cosa que necesite por correo si no la encuentra aquí.",
  },
};

const ICON_MAP = {
  wrench: WrenchIcon,
  shield: ShieldIcon,
  hardhat: HardHatIcon,
  edge: RoofEdgeIcon,
};

function PageEyebrow({ children }) {
  return (
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
        {children}
      </span>
    </div>
  );
}

export default function ResourcesPage() {
  const { lang } = useLanguage();
  const t = T[lang];
  const CareIcon = ICON_MAP[t.careDoc.icon] || WrenchIcon;

  return (
    <div style={{ background: "var(--jr-navy)", color: "var(--jr-paper)", minHeight: "100vh" }}>
      <a href="#main" className="jr-skip-link">Skip to content</a>
      <SiteNav />

      <main id="main">
        {/* HERO */}
        <section
          style={{
            padding: "var(--jr-space-16) var(--jr-space-6) var(--jr-space-10)",
            background: "linear-gradient(165deg, var(--jr-navy-deep) 0%, var(--jr-navy) 60%, var(--jr-navy-2) 100%)",
          }}
        >
          <Container size="narrow" style={{ textAlign: "center" }}>
            <PageEyebrow>{t.tag}</PageEyebrow>
            <h1
              style={{
                fontFamily: "var(--jr-font-heading)",
                fontSize: "var(--jr-text-4xl)",
                fontWeight: 800,
                lineHeight: 1.1,
                marginBottom: "var(--jr-space-4)",
                letterSpacing: "-0.5px",
              }}
            >
              {t.heroTitle1}<br />
              <span style={{ color: "var(--jr-gold)" }}>{t.heroTitle2}</span>
            </h1>
            <p
              style={{
                fontFamily: "var(--jr-font-body)",
                fontSize: "var(--jr-text-lg)",
                color: "var(--jr-cream-2)",
                lineHeight: 1.65,
                maxWidth: "640px",
                margin: "0 auto",
              }}
            >
              {t.heroP}
            </p>
          </Container>
        </section>

        {/* CARE GUIDE */}
        <section style={{ padding: "var(--jr-space-12) 0 var(--jr-space-16)" }}>
          <Container size="narrow">
            <SectionHeading
              eyebrow={t.careTag}
              title={t.careTitle}
              subtitle={t.careIntro}
              theme="dark"
            />
            <div
              style={{
                maxWidth: 600,
                margin: "0 auto",
                background: "var(--jr-navy-deep)",
                border: "2px solid var(--jr-gold)",
                borderRadius: "var(--jr-radius-xl)",
                padding: "var(--jr-space-8)",
              }}
            >
              <div
                style={{
                  width: 60,
                  height: 60,
                  borderRadius: "var(--jr-radius-md)",
                  background: "var(--jr-gold-pale)",
                  border: "1px solid rgba(212, 175, 55, 0.32)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "var(--jr-gold)",
                  margin: "0 auto var(--jr-space-3)",
                }}
              >
                <CareIcon size={30} />
              </div>
              <h3
                style={{
                  fontFamily: "var(--jr-font-heading)",
                  fontSize: "var(--jr-text-lg)",
                  fontWeight: 700,
                  color: "var(--jr-gold)",
                  marginBottom: "var(--jr-space-3)",
                  letterSpacing: "0.5px",
                  textAlign: "center",
                }}
              >
                {t.careDoc.title}
              </h3>
              <p
                style={{
                  fontFamily: "var(--jr-font-body)",
                  fontSize: "var(--jr-text-md)",
                  color: "var(--jr-cream-2)",
                  lineHeight: 1.7,
                  marginBottom: "var(--jr-space-5)",
                }}
              >
                {t.careDoc.desc}
              </p>
              <div
                style={{
                  display: "flex",
                  gap: "var(--jr-space-3)",
                  flexWrap: "wrap",
                  justifyContent: "center",
                }}
              >
                <Button
                  href={`/documents/${t.careDoc.en}`}
                  variant="primary"
                  size="sm"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {t.englishPdf}
                </Button>
                <Button
                  href={`/documents/${t.careDoc.es}`}
                  variant="outline"
                  size="sm"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {t.spanishPdf}
                </Button>
              </div>
            </div>
          </Container>
        </section>

        {/* LEGAL DOCS */}
        <section style={{ background: "var(--jr-navy-deep)", padding: "var(--jr-space-20) 0" }}>
          <Container size="narrow">
            <SectionHeading
              eyebrow={t.legalTag}
              title={t.legalTitle}
              subtitle={t.legalIntro}
              theme="dark"
            />
            <div style={{ display: "grid", gap: "var(--jr-space-4)" }}>
              {t.legalDocs.map((doc, i) => {
                const Icon = ICON_MAP[doc.icon] || ShieldIcon;
                return (
                  <div
                    key={i}
                    style={{
                      background: "var(--jr-navy)",
                      border: "1px solid var(--jr-navy-3)",
                      borderRadius: "var(--jr-radius-lg)",
                      padding: "var(--jr-space-6)",
                      display: "flex",
                      gap: "var(--jr-space-5)",
                      alignItems: "flex-start",
                      flexWrap: "wrap",
                    }}
                  >
                    <div
                      style={{
                        flexShrink: 0,
                        width: 56,
                        height: 56,
                        borderRadius: "var(--jr-radius-md)",
                        background: "var(--jr-gold-pale)",
                        border: "1px solid rgba(212, 175, 55, 0.32)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "var(--jr-gold)",
                      }}
                    >
                      <Icon size={28} />
                    </div>
                    <div style={{ flex: "1 1 280px" }}>
                      <h3
                        style={{
                          fontFamily: "var(--jr-font-heading)",
                          fontSize: "var(--jr-text-md)",
                          fontWeight: 700,
                          color: "var(--jr-gold)",
                          marginBottom: "var(--jr-space-3)",
                          letterSpacing: "0.5px",
                        }}
                      >
                        {doc.title}
                      </h3>
                      <p
                        style={{
                          fontFamily: "var(--jr-font-body)",
                          fontSize: "var(--jr-text-sm)",
                          color: "var(--jr-muted-on-dark)",
                          lineHeight: 1.65,
                          marginBottom: "var(--jr-space-4)",
                        }}
                      >
                        {doc.desc}
                      </p>
                      <Button
                        href={`/documents/${doc.file}`}
                        variant="primary"
                        size="sm"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {t.downloadBtn}
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          </Container>
        </section>

        {/* TRANSPARENCY */}
        <section style={{ background: "var(--jr-navy)", padding: "var(--jr-space-20) 0" }}>
          <Container size="prose" style={{ textAlign: "center" }}>
            <PageEyebrow>{t.trustTag}</PageEyebrow>
            <h2
              style={{
                fontFamily: "var(--jr-font-heading)",
                fontSize: "var(--jr-text-3xl)",
                fontWeight: 700,
                color: "var(--jr-paper)",
                letterSpacing: "0.3px",
                lineHeight: 1.2,
                marginBottom: "var(--jr-space-3)",
              }}
            >
              {t.trustTitle}
            </h2>
            <div
              aria-hidden
              style={{
                width: 60,
                height: 3,
                background: "var(--jr-gold)",
                borderRadius: 2,
                margin: "var(--jr-space-3) auto var(--jr-space-5)",
              }}
            />
            <p
              style={{
                fontFamily: "var(--jr-font-body)",
                fontSize: "var(--jr-text-md)",
                color: "var(--jr-cream-2)",
                lineHeight: 1.75,
              }}
            >
              {t.trustBody}
            </p>
          </Container>
        </section>

        {/* CTA */}
        <CTABand title={t.ctaTitle} sub={t.ctaSub} primaryHref="/contact" />
      </main>

      <SiteFooter />
      <MobileCTA />
    </div>
  );
}
