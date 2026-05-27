"use client";

/* ═══════════════════════════════════════════════════════════
   JR ONE ALUMINUM: WARRANTIES
   Brand-brain compliant. Tokens via app/tokens.css.
   ═══════════════════════════════════════════════════════════ */

import SiteNav from "../../components/SiteNav";
import SiteFooter from "../../components/SiteFooter";
import MobileCTA from "../../components/MobileCTA";
import Container from "../../components/ui/Container";
import Button from "../../components/ui/Button";
import SectionHeading from "../../components/ui/SectionHeading";
import FAQAccordion from "../../components/ui/FAQAccordion";
import CTABand from "../../components/ui/CTABand";
import { useLanguage } from "../../lib/LanguageContext";
import { CheckIcon, XIcon, ShieldIcon, RoofEdgeIcon } from "../../lib/icons";

const T = {
  en: {
    tag: "WARRANTIES",
    heroTitle1: "We Stand Behind",
    heroTitle2: "Every Installation.",
    heroP: "Our 3-year workmanship warranty isn't fine print designed to protect us. It's a commitment designed to protect you. If our work fails, we fix it. Period.",
    warrantyYears: "3",
    warrantyLabel: "YEAR WORKMANSHIP WARRANTY",
    warrantyDesc: "Covers defects in our labor that materially affect how your system performs under normal residential use. From the date of substantial completion, if something we installed isn't working because of how we installed it, we come back and make it right.",
    coveredTitle: "What's Covered",
    covered: [
      "Gutter seam or joint failures due to installation",
      "Soffit or fascia panels detaching from improper fastening",
      "Gutter pitch errors causing improper drainage",
      "Hanger failures from incorrect installation",
      "Downspout connection failures",
      "Any defect in our labor that affects system performance",
    ],
    notCoveredTitle: "What's Not Covered",
    notCovered: [
      "Normal wear and tear over time",
      "Hurricane, tornado, or severe storm damage",
      "Damage caused by third parties (roofers, painters, etc.)",
      "Alterations made by anyone other than JR One",
      "Failure to maintain the system (e.g., never cleaning gutters)",
      "Cosmetic changes (oxidation, color fading from UV)",
    ],
    materialsTag: "MATERIALS",
    materialsTitle: "Manufacturer Warranties",
    materialsDesc: "In addition to our workmanship warranty, the materials we install carry their own manufacturer warranties. We provide all relevant documentation at project completion.",
    materials: [
      { title: "Aluminum Coil", desc: "Manufacturer paint finish warranties vary by brand and color. Typically 20-40 years on finish." },
      { title: "Copper", desc: "Copper carries no traditional warranty because it doesn't fail. The material itself outlasts any warranty period." },
      { title: "Vinyl Soffit/Siding", desc: "Manufacturer warranties vary by brand. Typically limited lifetime warranties covering defects in material." },
      { title: "Gutter Guards", desc: "Guard manufacturer warranties vary by product type. Documentation provided at installation." },
    ],
    downloadTag: "DOWNLOAD CENTER",
    downloadTitle: "Your Warranty Documents",
    downloadIntro: "Save these to your records. Both available in English and Spanish.",
    englishPdf: "ENGLISH PDF",
    spanishPdf: "ESPAÑOL PDF",
    downloadDocs: [
      {
        icon: "shield",
        title: "Consumer Warranty",
        desc: "For residential installations. Covers our 3-year workmanship warranty plus the 20-year manufacturer paint warranty on painted aluminum products. Includes coverage details, conditions, and how to file a claim.",
        en: "JR_One_Consumer_Warranty.pdf",
        es: "es-JR_One_Consumer_Warranty.pdf",
      },
      {
        icon: "edge",
        title: "Commercial Warranty",
        desc: "For commercial projects. Same 3-year workmanship + 20-year paint coverage, written for commercial clients with direct line access to ownership for any warranty claim.",
        en: "JR_One_Commercial_Warranty.pdf",
        es: "es-JR_One_Commercial_Warranty.pdf",
      },
    ],
    faqTag: "FAQ",
    faqTitle: "Warranty Questions",
    faqs: [
      { q: "What does the 3-year workmanship warranty cover?", a: "Our warranty covers defects in our labor that materially affect how your gutter, soffit, fascia, or siding system performs under normal residential use. If something we installed fails because of how we installed it (not because of weather damage, impact, or wear), we come back and fix it at no cost." },
      { q: "When does the warranty period start?", a: "The 3-year warranty begins on the date of Substantial Completion: the day your system is fully installed and functioning as intended, even if minor punch-list items remain." },
      { q: "What's NOT covered by the warranty?", a: "Normal wear and tear, damage from severe weather events (hurricanes, tornadoes, hail), damage caused by third parties (painters, roofers, tree trimmers), alterations made by anyone other than JR One, and damage resulting from failure to maintain the system (e.g., never cleaning gutters that don't have guards)." },
      { q: "What about material warranties?", a: "Material warranties are provided by the material manufacturers, not JR One. Aluminum coil, copper, vinyl, and guard products each carry their own manufacturer warranties. We'll provide you with all relevant manufacturer warranty documentation at project completion." },
      { q: "How do I make a warranty claim?", a: "Call us at (844) 444-3114 or email info@jronegutters.com. Describe the issue, and we'll schedule an inspection. If the issue falls within warranty coverage, we schedule the repair. No charge, no hassle. We don't make warranty claims difficult because we'd rather fix a problem fast than argue about it." },
      { q: "Is the warranty transferable if I sell my home?", a: "Contact us to discuss transferability for your specific project. We handle these on a case-by-case basis." },
      { q: "Do you offer extended warranties?", a: "Our standard warranty is 3 years for workmanship. For extended coverage beyond that, ask about our maintenance plans. Regular professional maintenance extends the life of your system and catches issues before they become problems." },
    ],
    ctaTitle: "Questions About Your Warranty?",
    ctaSub: "Call us. We don't make warranty claims difficult.",
  },
  es: {
    tag: "GARANTÍAS",
    heroTitle1: "Respaldamos",
    heroTitle2: "Cada Instalación.",
    heroP: "Nuestra garantía de mano de obra de 3 años no es letra pequeña diseñada para protegernos a nosotros. Es un compromiso diseñado para protegerle a usted. Si nuestro trabajo falla, lo arreglamos. Punto.",
    warrantyYears: "3",
    warrantyLabel: "AÑOS DE GARANTÍA DE MANO DE OBRA",
    warrantyDesc: "Cubre defectos en nuestra mano de obra que afecten materialmente el rendimiento de su sistema bajo uso residencial normal. Desde la fecha de finalización sustancial, si algo que instalamos no funciona por cómo lo instalamos, volvemos y lo corregimos.",
    coveredTitle: "Qué Está Cubierto",
    covered: [
      "Fallas en juntas o uniones de canaletas por la instalación",
      "Paneles de sofito o fascia que se desprendan por fijación inadecuada",
      "Errores de inclinación de canaletas que causen drenaje inadecuado",
      "Fallas de soportes por instalación incorrecta",
      "Fallas en conexiones de bajantes",
      "Cualquier defecto en nuestra mano de obra que afecte el rendimiento del sistema",
    ],
    notCoveredTitle: "Qué No Está Cubierto",
    notCovered: [
      "Desgaste normal con el tiempo",
      "Daños por huracanes, tornados o tormentas severas",
      "Daños causados por terceros (techadores, pintores, etc.)",
      "Modificaciones hechas por alguien que no sea JR One",
      "Falta de mantenimiento del sistema (ej., nunca limpiar las canaletas)",
      "Cambios cosméticos (oxidación, decoloración por rayos UV)",
    ],
    materialsTag: "MATERIALES",
    materialsTitle: "Garantías del Fabricante",
    materialsDesc: "Además de nuestra garantía de mano de obra, los materiales que instalamos tienen sus propias garantías del fabricante. Proporcionamos toda la documentación relevante al completar el proyecto.",
    materials: [
      { title: "Bobina de Aluminio", desc: "Las garantías de acabado de pintura del fabricante varían según la marca y el color. Típicamente 20-40 años en acabado." },
      { title: "Cobre", desc: "El cobre no tiene garantía tradicional porque no falla. El material en sí dura más que cualquier período de garantía." },
      { title: "Sofito/Revestimiento de Vinilo", desc: "Las garantías del fabricante varían según la marca. Típicamente garantías limitadas de por vida que cubren defectos en el material." },
      { title: "Protectores de Canaletas", desc: "Las garantías del fabricante de protectores varían según el tipo de producto. Documentación proporcionada en la instalación." },
    ],
    downloadTag: "CENTRO DE DESCARGAS",
    downloadTitle: "Sus Documentos de Garantía",
    downloadIntro: "Guárdelos para sus registros. Ambos disponibles en inglés y español.",
    englishPdf: "ENGLISH PDF",
    spanishPdf: "ESPAÑOL PDF",
    downloadDocs: [
      {
        icon: "shield",
        title: "Garantía del Consumidor",
        desc: "Para instalaciones residenciales. Cubre nuestra garantía de mano de obra de 3 años más la garantía de pintura del fabricante de 20 años en productos de aluminio pintado. Incluye detalles de cobertura, condiciones y cómo presentar un reclamo.",
        en: "JR_One_Consumer_Warranty.pdf",
        es: "es-JR_One_Consumer_Warranty.pdf",
      },
      {
        icon: "edge",
        title: "Garantía Comercial",
        desc: "Para proyectos comerciales. La misma cobertura de mano de obra de 3 años más pintura de 20 años, redactada para clientes comerciales con línea directa con la dirección para cualquier reclamo de garantía.",
        en: "JR_One_Commercial_Warranty.pdf",
        es: "es-JR_One_Commercial_Warranty.pdf",
      },
    ],
    faqTag: "Preguntas Frecuentes",
    faqTitle: "Preguntas sobre Garantías",
    faqs: [
      { q: "¿Qué cubre la garantía de mano de obra de 3 años?", a: "Nuestra garantía cubre defectos en nuestra mano de obra que afecten materialmente el rendimiento de su sistema de canaletas, sofito, fascia o revestimiento bajo uso residencial normal. Si algo que instalamos falla por cómo lo instalamos (no por daños climáticos, impacto o desgaste), volvemos y lo arreglamos sin costo." },
      { q: "¿Cuándo comienza el período de garantía?", a: "La garantía de 3 años comienza en la fecha de Finalización Sustancial: el día en que su sistema está completamente instalado y funcionando como se esperaba, incluso si quedan detalles menores pendientes." },
      { q: "¿Qué NO está cubierto por la garantía?", a: "Desgaste normal, daños por eventos climáticos severos (huracanes, tornados, granizo), daños causados por terceros (pintores, techadores, podadores de árboles), modificaciones hechas por alguien que no sea JR One, y daños resultantes de la falta de mantenimiento del sistema (ej., nunca limpiar canaletas que no tienen protectores)." },
      { q: "¿Qué pasa con las garantías de materiales?", a: "Las garantías de materiales son proporcionadas por los fabricantes de los materiales, no por JR One. Los productos de bobina de aluminio, cobre, vinilo y protectores tienen cada uno sus propias garantías del fabricante. Le proporcionaremos toda la documentación relevante de garantía del fabricante al completar el proyecto." },
      { q: "¿Cómo hago un reclamo de garantía?", a: "Llámenos al (844) 444-3114 o envíe un correo a info@jronegutters.com. Describa el problema y programaremos una inspección. Si el problema está dentro de la cobertura de garantía, programamos la reparación. Sin cargo, sin complicaciones. No hacemos difíciles los reclamos de garantía porque preferimos arreglar un problema rápido que discutir sobre él." },
      { q: "¿Es transferible la garantía si vendo mi casa?", a: "Contáctenos para discutir la transferibilidad de su proyecto específico. Manejamos estos casos individualmente." },
      { q: "¿Ofrecen garantías extendidas?", a: "Nuestra garantía estándar es de 3 años para mano de obra. Para cobertura extendida más allá de eso, pregunte sobre nuestros planes de mantenimiento. El mantenimiento profesional regular extiende la vida de su sistema y detecta problemas antes de que se conviertan en problemas mayores." },
    ],
    ctaTitle: "¿Preguntas Sobre Su Garantía?",
    ctaSub: "Llámenos. No hacemos difíciles los reclamos de garantía.",
  },
};

const ICON_MAP = { shield: ShieldIcon, edge: RoofEdgeIcon };

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

export default function WarrantyPage() {
  const { lang } = useLanguage();
  const t = T[lang];

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

        {/* WARRANTY CARD */}
        <section style={{ padding: "var(--jr-space-10) 0 var(--jr-space-16)" }}>
          <Container size="narrow">
            <div
              style={{
                background: "var(--jr-navy-deep)",
                border: "2px solid var(--jr-gold)",
                borderRadius: "var(--jr-radius-xl)",
                padding: "var(--jr-space-10) var(--jr-space-8)",
                textAlign: "center",
              }}
            >
              <div
                style={{
                  fontFamily: "var(--jr-font-heading)",
                  fontSize: "64px",
                  fontWeight: 800,
                  color: "var(--jr-gold)",
                  lineHeight: 1,
                }}
              >
                {t.warrantyYears}
              </div>
              <div
                style={{
                  fontFamily: "var(--jr-font-heading)",
                  fontSize: "var(--jr-text-lg)",
                  fontWeight: 700,
                  color: "var(--jr-gold)",
                  letterSpacing: "3px",
                  marginTop: "var(--jr-space-2)",
                }}
              >
                {t.warrantyLabel}
              </div>
              <div
                aria-hidden
                style={{
                  width: 60,
                  height: 2,
                  background: "var(--jr-gold)",
                  margin: "var(--jr-space-5) auto",
                }}
              />
              <p
                style={{
                  fontFamily: "var(--jr-font-body)",
                  fontSize: "var(--jr-text-md)",
                  color: "var(--jr-cream-2)",
                  maxWidth: "560px",
                  margin: "0 auto",
                  lineHeight: 1.7,
                }}
              >
                {t.warrantyDesc}
              </p>
            </div>
          </Container>
        </section>

        {/* COVERED / NOT COVERED */}
        <section style={{ background: "var(--jr-navy-deep)", padding: "var(--jr-space-20) 0" }}>
          <Container>
            <div
              className="jr-cover-grid"
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "var(--jr-space-10)",
              }}
            >
              <div>
                <h2
                  style={{
                    fontFamily: "var(--jr-font-heading)",
                    fontSize: "var(--jr-text-xl)",
                    fontWeight: 700,
                    color: "var(--jr-gold)",
                    marginBottom: "var(--jr-space-5)",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "var(--jr-space-2)",
                  }}
                >
                  <CheckIcon size={22} /> {t.coveredTitle}
                </h2>
                {t.covered.map((item, i) => (
                  <div
                    key={i}
                    style={{
                      display: "flex",
                      gap: "var(--jr-space-3)",
                      marginBottom: "var(--jr-space-3)",
                      alignItems: "flex-start",
                    }}
                  >
                    <span style={{ color: "var(--jr-success)", flexShrink: 0, marginTop: 2 }}>
                      <CheckIcon size={16} />
                    </span>
                    <p
                      style={{
                        fontFamily: "var(--jr-font-body)",
                        fontSize: "var(--jr-text-md)",
                        color: "var(--jr-cream-2)",
                        lineHeight: 1.6,
                      }}
                    >
                      {item}
                    </p>
                  </div>
                ))}
              </div>
              <div>
                <h2
                  style={{
                    fontFamily: "var(--jr-font-heading)",
                    fontSize: "var(--jr-text-xl)",
                    fontWeight: 700,
                    color: "var(--jr-muted-on-dark)",
                    marginBottom: "var(--jr-space-5)",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "var(--jr-space-2)",
                  }}
                >
                  <XIcon size={22} /> {t.notCoveredTitle}
                </h2>
                {t.notCovered.map((item, i) => (
                  <div
                    key={i}
                    style={{
                      display: "flex",
                      gap: "var(--jr-space-3)",
                      marginBottom: "var(--jr-space-3)",
                      alignItems: "flex-start",
                    }}
                  >
                    <span style={{ color: "var(--jr-muted-on-dark)", flexShrink: 0, marginTop: 2 }}>
                      <XIcon size={16} />
                    </span>
                    <p
                      style={{
                        fontFamily: "var(--jr-font-body)",
                        fontSize: "var(--jr-text-md)",
                        color: "var(--jr-muted-on-dark)",
                        lineHeight: 1.6,
                      }}
                    >
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </Container>
        </section>

        {/* MATERIALS */}
        <section style={{ background: "var(--jr-navy)", padding: "var(--jr-space-20) 0" }}>
          <Container size="narrow">
            <SectionHeading
              eyebrow={t.materialsTag}
              title={t.materialsTitle}
              subtitle={t.materialsDesc}
              theme="dark"
            />
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
                gap: "var(--jr-space-4)",
              }}
            >
              {t.materials.map((item, i) => (
                <div
                  key={i}
                  style={{
                    background: "var(--jr-navy-deep)",
                    border: "1px solid var(--jr-navy-3)",
                    borderRadius: "var(--jr-radius-lg)",
                    padding: "var(--jr-space-5)",
                  }}
                >
                  <h3
                    style={{
                      fontFamily: "var(--jr-font-heading)",
                      fontSize: "var(--jr-text-md)",
                      fontWeight: 700,
                      color: "var(--jr-gold)",
                      marginBottom: "var(--jr-space-2)",
                    }}
                  >
                    {item.title}
                  </h3>
                  <p
                    style={{
                      fontFamily: "var(--jr-font-body)",
                      fontSize: "var(--jr-text-sm)",
                      color: "var(--jr-muted-on-dark)",
                      lineHeight: 1.6,
                    }}
                  >
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </Container>
        </section>

        {/* DOWNLOAD CENTER */}
        <section style={{ background: "var(--jr-navy-deep)", padding: "var(--jr-space-20) 0" }}>
          <Container>
            <SectionHeading
              eyebrow={t.downloadTag}
              title={t.downloadTitle}
              subtitle={t.downloadIntro}
              theme="dark"
            />
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
                gap: "var(--jr-space-5)",
              }}
            >
              {t.downloadDocs.map((doc, i) => {
                const Icon = ICON_MAP[doc.icon] || ShieldIcon;
                return (
                  <div
                    key={i}
                    style={{
                      background: "var(--jr-navy)",
                      border: "1px solid var(--jr-navy-3)",
                      borderRadius: "var(--jr-radius-lg)",
                      padding: "var(--jr-space-6)",
                    }}
                  >
                    <div
                      style={{
                        width: 52,
                        height: 52,
                        borderRadius: "var(--jr-radius-md)",
                        background: "var(--jr-gold-pale)",
                        border: "1px solid rgba(212, 175, 55, 0.32)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "var(--jr-gold)",
                        marginBottom: "var(--jr-space-4)",
                      }}
                    >
                      <Icon size={26} />
                    </div>
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
                        lineHeight: 1.6,
                        marginBottom: "var(--jr-space-5)",
                      }}
                    >
                      {doc.desc}
                    </p>
                    <div style={{ display: "flex", gap: "var(--jr-space-2)", flexWrap: "wrap" }}>
                      <Button
                        href={`/documents/${doc.en}`}
                        variant="primary"
                        size="sm"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {t.englishPdf}
                      </Button>
                      <Button
                        href={`/documents/${doc.es}`}
                        variant="outline"
                        size="sm"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {t.spanishPdf}
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          </Container>
        </section>

        {/* FAQ */}
        <section style={{ background: "var(--jr-navy)", padding: "var(--jr-space-20) 0" }}>
          <Container size="prose">
            <SectionHeading
              eyebrow={t.faqTag}
              title={t.faqTitle}
              theme="dark"
            />
            <FAQAccordion items={t.faqs} theme="dark" />
          </Container>
        </section>

        {/* CTA */}
        <CTABand title={t.ctaTitle} sub={t.ctaSub} primaryHref="/contact" />
      </main>

      <SiteFooter />
      <MobileCTA />

      <style>{`
        @media (max-width: 720px) {
          .jr-cover-grid {
            grid-template-columns: 1fr !important;
            gap: var(--jr-space-8) !important;
          }
        }
      `}</style>
    </div>
  );
}
