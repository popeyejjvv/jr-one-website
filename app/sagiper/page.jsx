"use client";

/* ═══════════════════════════════════════════════════════════
   JR ONE ALUMINUM: SAGIPER ARCHITECTURAL CLADDING
   Brand-brain compliant. Tokens via app/tokens.css.
   No "premium/luxury" puffery in body copy. Specs speak.
   ═══════════════════════════════════════════════════════════ */

import { useState } from "react";
import { useLanguage } from "../../lib/LanguageContext";
import { useLeadGuard } from "../../lib/lead-guard";
import SiteNav from "../../components/SiteNav";
import SiteFooter from "../../components/SiteFooter";
import MobileCTA from "../../components/MobileCTA";
import Container from "../../components/ui/Container";
import Button from "../../components/ui/Button";
import SectionHeading from "../../components/ui/SectionHeading";
import ProcessStep from "../../components/ui/ProcessStep";
import ReviewCard from "../../components/ui/ReviewCard";
import FAQAccordion from "../../components/ui/FAQAccordion";
import Peak301Alert from "../../components/ui/Peak301Alert";
import {
  CheckCircleIcon,
  PhoneIcon,
} from "../../lib/icons";

// Page-identity accent: SAGIPER burgundy (architectural cladding).
const ACCENT = "#722F37";
const ACCENT_LIGHT = "#8B3A44";

const T = {
  en: {
    breadcrumb: ["Home", "Services", "SAGIPER"],
    heroTag: "ARCHITECTURAL CLADDING",
    heroH1a: "The Future of",
    heroH1b: "Exterior Design.",
    heroP: "SAGIPER architectural cladding systems, made in Portugal. Solar Shield Technology, 50-year limited warranty on the PVC cladding, siding, and soffit lines, no repainting or sealing cycle. Built for Florida sun and the homeowners and architects who want dark colors that hold their finish.",
    heroCta: "Get Your Free Consultation",
    heroCall: "Call (844) 444-3114",
    stats: [
      { value: "50 yr", label: "Warranty" },
      { value: "35 ft", label: "Max custom length" },
      { value: "30+", label: "Color finishes" },
      { value: "5-layer", label: "Solar Shield Technology" },
    ],
    systemEyebrow: "The SAGIPER System",
    systemTitle: "Four Products. One Cohesive Exterior.",
    products: [
      { emoji: "🏠", name: "SAGIWALL", subtitle: "Exterior Siding & Cladding", desc: "Tongue-and-groove PVC with 5-layer Solar Shield Technology film. Channeled and V-groove profiles. 6\" width, lengths up to 35 ft (minimal seams). 30+ woodgrain, metallic, and RAL color finishes. ICC-ES ESR-4876 evaluated. NFPA 285 fire tested. ASTM E330 wind load tested. 50-year limited warranty, 15 years non-prorated." },
      { emoji: "🏗️", name: "SAGIREV", subtitle: "Soffit & Ceiling System", desc: "Exterior soffit and ceiling. 4\" V-groove, 6\" V-groove, and 8\" flat profiles. Same Solar Shield Technology. Built for soffits, covered decks, and lanais. M1 fire-rated (non-flammable). 50-year limited warranty, 15 years non-prorated." },
      { emoji: "🛡️", name: "SAGIBOND", subtitle: "Aluminum Composite Material Panels", desc: "Three constructions: FireGuard (fire-rated), HexaCore (honeycomb, superior rigidity), SlimShield (solid 3mm aluminum). Modern commercial facades with woodgrain warmth. 4ft x 16ft sheets. 50-year limited warranty, 15 years non-prorated." },
      { emoji: "📐", name: "SAGIBATTEN", subtitle: "Aluminum Batten System", desc: "2mm wall thickness. 7 size options from 1\"x2\" to 2\"x8\". 24+ woodgrain finishes including Nordic series. For contemporary facades, pergolas, accent walls, and baffle ceilings. 50-year limited warranty, 15 years non-prorated." },
    ],
    problemEyebrow: "The Problem",
    problemTitle: "Why Standard Siding Fails in Florida",
    problems: [
      { emoji: "🔥", title: "Vinyl fades and warps in Florida sun", desc: "Standard vinyl and wood siding can't handle relentless UV exposure. Colors fade, materials warp, and you're left with a home that looks tired after just a few years." },
      { emoji: "🎨", title: "Paint and stain maintenance never ends", desc: "Wood siding wants repainting or restaining every 3 to 5 years. That's thousands of dollars and days of disruption, on repeat, forever." },
      { emoji: "☔", title: "Vinyl limits dark-color choices", desc: "Want charcoal, walnut, or black? Standard vinyl absorbs heat and warps. Homeowners get stuck with light colors or accept inevitable damage." },
      { emoji: "🏠", title: "Generic siding looks like every house on the block", desc: "Lumber-yard vinyl comes in limited profiles and colors. Your home deserves architect-grade materials, not builder-basic aesthetics." },
    ],
    whyEyebrow: "Why SAGIPER",
    whyTitle: "Engineered for Florida. Designed for Architects.",
    whySub: "Architectural cladding with Solar Shield Technology. The siding system built to handle dark colors in direct Florida sun.",
    whyItems: [
      { title: "Solar Shield Technology", desc: "5-layer heat-reflective film reflects heat before it reaches the panel, so dark colors hold their finish far better than standard vinyl in Florida sun." },
      { title: "Custom lengths up to 35 feet", desc: "Fewer seams equals a cleaner look and less water infiltration." },
      { title: "Architect-grade specs", desc: "BIM/Revit files, CSI specs, AIA-accredited courses. Specified by architects, not just sold at lumber yards." },
      { title: "Code-compliant", desc: "ICC-ES ESR-4876, NFPA 285, ASTM E330 tested. Real certifications for Florida coastal construction." },
      { title: "No repainting or sealing", desc: "No painting, staining, or sealing in normal service. Periodic washing keeps the finish clean. 50-year limited warranty with 15 years non-prorated on the PVC cladding, siding, and soffit lines." },
      { title: "Made in Portugal", desc: "European production standards on every panel, with the finish and tolerances architects specify for." },
    ],
    peakAlertLabel: "Florida Insurance Alert",
    peakAlertTitle: "280% Increase in Non-Renewals. Roof Over 15 Years Old?",
    peakAlertDesc: "Peak 301 restores shingles from the inside out. Adds 6 to 10 years of roof life for up to 70% less than a new roof install.",
    peakBtn: "Peak 301 Info",
    peakRights: "Your Rights",
    goldEyebrow: "The Gold Standard",
    goldTitle: "Our SAGIPER Installation Process",
    goldSub: "Every home. Every time. No exceptions.",
    goldSteps: [
      { num: "01", title: "Assess", desc: "We evaluate your home's exterior, discuss your design vision, and determine which SAGIPER products and finishes fit your project." },
      { num: "02", title: "Design", desc: "We build a detailed plan using SAGIPER's full product line, matching SagiWall, SagiRev, SagiBond, and SagiBatten across your exterior for a cohesive architectural look." },
      { num: "03", title: "Install", desc: "Our trained crew installs your SAGIPER system. Tongue-and-groove connections, custom lengths, and clean transitions between product lines." },
      { num: "04", title: "Protect", desc: "Your PVC cladding, siding, and soffit are covered by SAGIPER's 50-year limited warranty, which includes 15 years non-prorated. No painting, staining, or sealing in normal service. Periodic washing is the upkeep it asks for." },
    ],
    reviewsEyebrow: "Reviews",
    reviewsTitle: "What Our Clients Say",
    reviews: [
      { text: "JR One aluminum is nothing short of awesome. From Stefan as my sales person to Christian and the crew, they ALL deserve a big thank you.", name: "JR One Customer", service: "Exterior Renovation", stars: 5 },
      { text: "Great crew, all very nice and courteous gentlemen. Work was done exactly to the quote and mock-up images. Not one detail missed.", name: "Jaclyn G.", service: "Full Exterior Work", stars: 5 },
    ],
    faqEyebrow: "FAQ",
    faqTitle: "SAGIPER Questions",
    faqs: [
      { q: "What is SAGIPER?", a: "SAGIPER is a Portuguese manufacturer of architectural PVC and aluminum cladding systems, made in Portugal to European engineering standards and distributed in North America. JR One installs the exterior application." },
      { q: "How is SAGIPER different from regular vinyl siding?", a: "Solar Shield Technology prevents heat absorption, so dark colors won't warp like standard vinyl. Custom lengths up to 35 feet minimize seams. Architect-grade specs (BIM/Revit files, CSI specs) put it in a different category. A 50-year limited warranty with a 15-year non-prorated period, versus the fully prorated warranties standard vinyl carries." },
      { q: "Can I use dark colors on my Florida home?", a: "Yes. That's SAGIPER's key advantage. The 5-layer Solar Shield film reflects heat before it enters the panel. Dark woodgrain finishes that would warp in standard vinyl stay stable, even in direct Florida sun." },
      { q: "Is SAGIPER hurricane-rated?", a: "ASTM E330 wind load tested and ICC-ES evaluated. Contact us for specific wind rating details for your location." },
      { q: "How much does SAGIPER cost vs. regular siding?", a: "SAGIPER costs more upfront than standard vinyl. The 50-year limited warranty, the absence of a repainting cycle, and architect-grade aesthetics make it the strongest long-term value on the right home." },
      { q: "Do you install all SAGIPER products?", a: "Yes. We install SagiWall, SagiRev, SagiBond, and SagiBatten. Full exterior system with matching finishes across all products." },
    ],
    ctaTitle: "Ready for Cladding Built for the Florida Sun?",
    ctaSub: "Get your free SAGIPER consultation. We'll walk your home, show you finishes, and provide a transparent estimate.",
    formTitle: "Get Your Free SAGIPER Consultation",
    formName: "Full Name",
    formPhone: "Phone Number",
    formEmail: "Email Address",
    formZip: "ZIP Code",
    formBtn: "Request My Free Consultation",
    formNote: "No spam. No pressure. Honest consultation on whether SAGIPER fits your home.",
    formSent: "Consultation Request Received",
    formSentSub: "We'll get back to you within hours to schedule your SAGIPER consultation.",
  },
  es: {
    breadcrumb: ["Inicio", "Servicios", "SAGIPER"],
    heroTag: "REVESTIMIENTO ARQUITECTÓNICO",
    heroH1a: "El Futuro del",
    heroH1b: "Diseño Exterior.",
    heroP: "Sistemas de revestimiento arquitectónico SAGIPER, hechos en Portugal. Tecnología Solar Shield, garantía limitada de 50 años en las líneas de revestimiento, fachada y sofito de PVC, sin ciclo de repintado ni sellado. Hecho para el sol de Florida y para los propietarios y arquitectos que quieren colores oscuros que conserven su acabado.",
    heroCta: "Obtenga Su Consulta Gratuita",
    heroCall: "Llame al (844) 444-3114",
    stats: [
      { value: "50 años", label: "Garantía" },
      { value: "35 ft", label: "Longitud máxima personalizada" },
      { value: "30+", label: "Acabados de color" },
      { value: "5 capas", label: "Tecnología Solar Shield" },
    ],
    systemEyebrow: "El Sistema SAGIPER",
    systemTitle: "Cuatro Productos. Un Exterior Cohesivo.",
    products: [
      { emoji: "🏠", name: "SAGIWALL", subtitle: "Revestimiento Exterior", desc: "PVC machihembrado con película Solar Shield Technology de 5 capas. Perfiles acanalados y V-groove. Ancho de 6\", longitudes hasta 35 ft (uniones mínimas). 30+ acabados de madera, metálicos y colores RAL. Evaluado ICC-ES ESR-4876. Probado NFPA 285 contra incendios. Probado ASTM E330 carga de viento. Garantía limitada de 50 años, 15 años sin prorrateo." },
      { emoji: "🏗️", name: "SAGIREV", subtitle: "Sistema de Sofito y Techo", desc: "Para exteriores. Perfiles V-groove de 4\", V-groove de 6\" y plano de 8\". Misma Tecnología Solar Shield. Hecho para sofitos, terrazas cubiertas y lanais. Clasificación M1 contra incendios (no inflamable). Garantía limitada de 50 años, 15 años sin prorrateo." },
      { emoji: "🛡️", name: "SAGIBOND", subtitle: "Paneles de Material Compuesto de Aluminio", desc: "Tres construcciones: FireGuard (clasificado contra incendios), HexaCore (panal, rigidez superior), SlimShield (aluminio sólido de 3mm). Fachadas comerciales modernas con calidez de madera. Láminas de 4ft x 16ft. Garantía limitada de 50 años, 15 años sin prorrateo." },
      { emoji: "📐", name: "SAGIBATTEN", subtitle: "Sistema de Listones de Aluminio", desc: "Espesor de pared de 2mm. 7 opciones de tamaño desde 1\"x2\" hasta 2\"x8\". 24+ acabados de madera incluyendo serie Nordic. Para fachadas contemporáneas, pérgolas, paredes de acento y techos de deflectores. Garantía limitada de 50 años, 15 años sin prorrateo." },
    ],
    problemEyebrow: "El Problema",
    problemTitle: "Por Qué el Revestimiento Estándar Falla en Florida",
    problems: [
      { emoji: "🔥", title: "El vinilo se desvanece y deforma con el sol de Florida", desc: "El vinilo y la madera estándar no pueden con la exposición UV constante. Los colores se desvanecen, los materiales se deforman y su casa se ve deteriorada en pocos años." },
      { emoji: "🎨", title: "El mantenimiento de pintura y tinte nunca termina", desc: "El revestimiento de madera necesita repintado o retintado cada 3 a 5 años. Son miles de dólares y días de interrupción, repetidamente, para siempre." },
      { emoji: "☔", title: "El vinilo limita las opciones de colores oscuros", desc: "¿Quiere carbón, nogal o negro? El vinilo estándar absorbe calor y se deforma. Los propietarios se limitan a colores claros o aceptan el daño inevitable." },
      { emoji: "🏠", title: "El revestimiento genérico se ve igual que todas las casas", desc: "El vinilo de ferretería viene en perfiles y colores limitados. Su casa merece materiales de grado arquitectónico, no estética básica de constructor." },
    ],
    whyEyebrow: "Por Qué SAGIPER",
    whyTitle: "Ingeniería para Florida. Diseñado para Arquitectos.",
    whySub: "Revestimiento arquitectónico con Tecnología Solar Shield. El sistema construido para manejar colores oscuros bajo el sol directo de Florida.",
    whyItems: [
      { title: "Tecnología Solar Shield", desc: "Película reflectante de calor de 5 capas que refleja el calor antes de que llegue al panel, así los colores oscuros conservan su acabado mucho mejor que el vinilo estándar bajo el sol de Florida." },
      { title: "Longitudes personalizadas hasta 35 pies", desc: "Menos uniones equivale a aspecto más limpio y menos infiltración de agua." },
      { title: "Especificaciones arquitectónicas", desc: "Archivos BIM/Revit, especificaciones CSI, cursos acreditados AIA. Especificado por arquitectos, no solo vendido en ferreterías." },
      { title: "Cumple con códigos", desc: "ICC-ES ESR-4876, NFPA 285, ASTM E330 probado. Certificaciones reales para construcción costera en Florida." },
      { title: "Sin repintado ni sellado", desc: "Sin pintura, sin tinte, sin sellado en servicio normal. Un lavado periódico mantiene limpio el acabado. Garantía limitada de 50 años con 15 años sin prorrateo en las líneas de revestimiento, fachada y sofito de PVC." },
      { title: "Hecho en Portugal", desc: "Estándares de producción europeos en cada panel, con el acabado y las tolerancias que los arquitectos exigen." },
    ],
    peakAlertLabel: "Alerta de Seguros de Florida",
    peakAlertTitle: "280% de Aumento en No Renovaciones. ¿Techo de Más de 15 Años?",
    peakAlertDesc: "Peak 301 restaura las tejas desde adentro. Agrega 6 a 10 años de vida al techo por hasta 70% menos que un techo nuevo.",
    peakBtn: "Info Peak 301",
    peakRights: "Sus Derechos",
    goldEyebrow: "El Estándar de Oro",
    goldTitle: "Nuestro Proceso de Instalación SAGIPER",
    goldSub: "Cada casa. Cada vez. Sin excepciones.",
    goldSteps: [
      { num: "01", title: "Evaluar", desc: "Evaluamos el exterior de su casa, discutimos su visión de diseño y determinamos qué productos y acabados SAGIPER son los adecuados para su proyecto." },
      { num: "02", title: "Diseñar", desc: "Creamos un plan detallado usando toda la línea de productos SAGIPER, combinando SagiWall, SagiRev, SagiBond y SagiBatten en todo su exterior para un aspecto arquitectónico cohesivo." },
      { num: "03", title: "Instalar", desc: "Nuestro equipo capacitado instala su sistema SAGIPER. Conexiones machihembradas, longitudes personalizadas y transiciones limpias entre líneas de producto." },
      { num: "04", title: "Proteger", desc: "Su revestimiento, fachada y sofito de PVC quedan cubiertos por la garantía limitada de 50 años de SAGIPER, que incluye 15 años sin prorrateo. Sin pintura, sin tinte, sin sellado en servicio normal. Un lavado periódico es todo el cuidado que pide." },
    ],
    reviewsEyebrow: "Reseñas",
    reviewsTitle: "Lo Que Dicen Nuestros Clientes",
    reviews: [
      { text: "JR One aluminum es simplemente increíble. Desde Stefan como mi vendedor hasta Christian y el equipo, TODOS merecen un gran agradecimiento.", name: "Cliente de JR One", service: "Renovación Exterior", stars: 5 },
      { text: "Gran equipo, todos muy amables y corteses. El trabajo se hizo exactamente según el presupuesto y las imágenes de muestra. Ni un detalle se pasó por alto.", name: "Jaclyn G.", service: "Trabajo Exterior Completo", stars: 5 },
    ],
    faqEyebrow: "Preguntas Frecuentes",
    faqTitle: "Preguntas Sobre SAGIPER",
    faqs: [
      { q: "¿Qué es SAGIPER?", a: "SAGIPER es un fabricante portugués de sistemas de revestimiento arquitectónico en PVC y aluminio, hechos en Portugal bajo estándares de ingeniería europea y distribuidos en Norteamérica. JR One instala la aplicación exterior." },
      { q: "¿En qué se diferencia SAGIPER del revestimiento de vinilo común?", a: "La Tecnología Solar Shield previene la absorción de calor, lo que significa que los colores oscuros no se deformarán como el vinilo estándar. Longitudes personalizadas hasta 35 pies minimizan las uniones. Especificaciones de grado arquitectónico (archivos BIM/Revit, especificaciones CSI) lo ponen en una categoría diferente. Una garantía limitada de 50 años con 15 años sin prorrateo, frente a las garantías totalmente prorrateadas del vinilo común." },
      { q: "¿Puedo usar colores oscuros en mi casa de Florida?", a: "Sí. Esa es la ventaja clave de SAGIPER. La película Solar Shield de 5 capas refleja el calor antes de que entre al panel. Los acabados oscuros de madera que se deformarían en vinilo estándar se mantienen estables, incluso bajo el sol directo de Florida." },
      { q: "¿SAGIPER tiene clasificación para huracanes?", a: "Probado con carga de viento ASTM E330 y evaluado por ICC-ES. Contáctenos para detalles específicos de clasificación de viento para su ubicación." },
      { q: "¿Cuánto cuesta SAGIPER vs. el revestimiento regular?", a: "SAGIPER cuesta más al inicio que el vinilo estándar. La garantía limitada de 50 años, la ausencia de un ciclo de repintado y la estética de grado arquitectónico lo convierten en el valor a largo plazo más fuerte en la casa indicada." },
      { q: "¿Instalan todos los productos SAGIPER?", a: "Sí. Instalamos SagiWall, SagiRev, SagiBond y SagiBatten. Sistema exterior completo con acabados combinados en todos los productos." },
    ],
    ctaTitle: "¿Listo para un Revestimiento Hecho para el Sol de Florida?",
    ctaSub: "Obtenga su consulta gratuita de SAGIPER. Caminaremos su casa, le mostraremos acabados y proporcionaremos un presupuesto transparente.",
    formTitle: "Obtenga Su Consulta Gratuita de SAGIPER",
    formName: "Nombre Completo",
    formPhone: "Número de Teléfono",
    formEmail: "Correo Electrónico",
    formZip: "Código Postal",
    formBtn: "Solicitar Mi Consulta Gratuita",
    formNote: "Sin spam. Sin presión. Consulta honesta sobre si SAGIPER es adecuado para su casa.",
    formSent: "Solicitud de Consulta Recibida",
    formSentSub: "Nos pondremos en contacto en horas para programar su consulta SAGIPER.",
  },
};

const inputStyle = {
  width: "100%",
  padding: "13px 16px",
  fontFamily: "var(--jr-font-body)",
  fontSize: "15px",
  border: "1.5px solid #D1D5DB",
  borderRadius: "var(--jr-radius-md)",
  outline: "none",
  color: "var(--jr-ink)",
  background: "#FAFAFA",
  marginBottom: "12px",
  transition: "border-color var(--jr-dur-fast) var(--jr-ease-out)",
};

export default function SagiperPage() {
  const { lang } = useLanguage();
  const t = T[lang];
  const [formData, setFormData] = useState({ name: "", phone: "", email: "", zip: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const { guardFields, honeypot } = useLeadGuard();

  const handleForm = async (e) => {
    e?.preventDefault?.();
    if (!formData.name || !formData.phone) return;
    setLoading(true);
    try {
      const params = new URLSearchParams(window.location.search);
      await fetch("/api/send-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...guardFields(),
          name: formData.name,
          phone: formData.phone,
          email: formData.email,
          zip: formData.zip,
          service: "SAGIPER Cladding",
          page: "sagiper",
          message: "Free SAGIPER consultation request",
          gclid: params.get("gclid") || "",
          utm_source: params.get("utm_source") || "",
          utm_medium: params.get("utm_medium") || "",
          utm_campaign: params.get("utm_campaign") || "",
          utm_term: params.get("utm_term") || "",
        }),
      });
      setSubmitted(true);
    } catch {
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ background: "var(--jr-navy)", color: "var(--jr-paper)", minHeight: "100vh" }}>
      <a href="#main" className="jr-skip-link">Skip to content</a>
      <SiteNav />

      <main id="main">
        <Container style={{ paddingTop: "var(--jr-space-4)" }}>
          <nav aria-label="Breadcrumb" style={{ fontFamily: "var(--jr-font-body)", fontSize: "var(--jr-text-sm)", color: "var(--jr-muted-on-dark)" }}>
            {t.breadcrumb.map((item, i) => (
              <span key={i}>
                {i > 0 && <span style={{ margin: "0 8px", opacity: 0.5 }}>/</span>}
                <span style={{ color: i === t.breadcrumb.length - 1 ? ACCENT : "var(--jr-muted-on-dark)" }}>{item}</span>
              </span>
            ))}
          </nav>
        </Container>

        <section className="jr-noise-bg jr-service-hero" style={{ position: "relative", padding: "var(--jr-space-12) var(--jr-space-6) var(--jr-space-20)", backgroundImage: "linear-gradient(165deg, rgba(11,22,51,0.84) 0%, rgba(17,32,67,0.88) 55%, rgba(22,42,80,0.92) 100%), url('/images/sagiper-hero-v2.webp')", backgroundSize: "cover", backgroundPosition: "center", overflow: "hidden" }}>
          <div aria-hidden style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, background: "radial-gradient(ellipse at 28% 22%, rgba(200,149,46,0.08) 0%, transparent 60%)", pointerEvents: "none" }} />
          <Container style={{ position: "relative", zIndex: 1 }}>
            <div style={{ maxWidth: "780px" }}>
              <div style={{ fontFamily: "var(--jr-font-heading)", fontSize: "var(--jr-text-xs)", fontWeight: 700, color: ACCENT_LIGHT, letterSpacing: "4px", marginBottom: "var(--jr-space-4)", textTransform: "uppercase" }}>{t.heroTag}</div>
              <h1 style={{ fontFamily: "var(--jr-font-heading)", fontSize: "var(--jr-text-4xl)", fontWeight: 800, lineHeight: 1.05, marginBottom: "var(--jr-space-6)", letterSpacing: "-0.5px" }}>
                {t.heroH1a}<br />
                <span style={{ color: ACCENT_LIGHT }}>{t.heroH1b}</span>
              </h1>
              <p style={{ fontFamily: "var(--jr-font-body)", fontSize: "var(--jr-text-lg)", color: "var(--jr-cream-2)", lineHeight: 1.65, marginBottom: "var(--jr-space-8)", maxWidth: "660px" }}>{t.heroP}</p>
              <div style={{ display: "flex", gap: "var(--jr-space-4)", flexWrap: "wrap", marginBottom: "var(--jr-space-8)" }}>
                <Button
                  href="#quote-form"
                  variant="primary"
                  size="lg"
                  iconRight
                  accent={ACCENT}
                  accentLight={ACCENT_LIGHT}
                  style={{
                    background: `linear-gradient(135deg, ${ACCENT}, ${ACCENT_LIGHT})`,
                    color: "#FFFFFF",
                    border: `2px solid ${ACCENT}`,
                    boxShadow: `0 4px 14px rgba(114, 47, 55, 0.32)`,
                  }}
                >
                  {t.heroCta}
                </Button>
                <Button href="tel:8444443114" variant="outline" size="lg" iconLeft={<PhoneIcon size={18} />} accent={ACCENT} accentLight={ACCENT_LIGHT}>{t.heroCall}</Button>
              </div>
              <div style={{ display: "flex", gap: "var(--jr-space-8)", flexWrap: "wrap" }}>
                {t.stats.map((s, i) => (
                  <div key={i}>
                    <div style={{ fontFamily: "var(--jr-font-heading)", fontSize: "var(--jr-text-2xl)", fontWeight: 800, color: ACCENT_LIGHT }}>{s.value}</div>
                    <div style={{ fontFamily: "var(--jr-font-body)", fontSize: "var(--jr-text-xs)", color: "var(--jr-muted-on-dark)", maxWidth: "140px" }}>{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </Container>
        </section>

        {/* ── PRODUCT SYSTEM ── */}
        <section style={{ background: "var(--jr-navy-deep)", padding: "var(--jr-space-20) 0" }}>
          <Container>
            <SectionHeading eyebrow={t.systemEyebrow} title={t.systemTitle} theme="dark" accent={ACCENT} />
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "var(--jr-space-5)" }}>
              {t.products.map((p, i) => (
                <article key={i} className="jr-hover-lift" style={{ background: "var(--jr-navy)", border: "1px solid var(--jr-navy-3)", borderRadius: "var(--jr-radius-lg)", padding: "28px 24px", borderTop: `3px solid ${ACCENT}` }}>
                  <div style={{ width: 52, height: 52, borderRadius: "var(--jr-radius-md)", background: "rgba(114, 47, 55, 0.10)", border: `1px solid ${ACCENT}`, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "var(--jr-space-4)" }}>
                    <span aria-hidden style={{ fontSize: 28, lineHeight: 1 }}>{p.emoji}</span>
                  </div>
                  <h3 style={{ fontFamily: "var(--jr-font-heading)", fontSize: "var(--jr-text-xl)", fontWeight: 800, color: "var(--jr-paper)", marginBottom: "var(--jr-space-1)" }}>{p.name}</h3>
                  <div style={{ fontFamily: "var(--jr-font-heading)", fontSize: "var(--jr-text-xs)", fontWeight: 600, color: ACCENT_LIGHT, letterSpacing: "1px", marginBottom: "var(--jr-space-3)", textTransform: "uppercase" }}>{p.subtitle}</div>
                  <p style={{ fontFamily: "var(--jr-font-body)", fontSize: "var(--jr-text-sm)", color: "var(--jr-muted-on-dark)", lineHeight: 1.65 }}>{p.desc}</p>
                </article>
              ))}
            </div>
          </Container>
        </section>

        {/* ── PROBLEM ── */}
        <section style={{ background: "var(--jr-navy)", padding: "var(--jr-space-20) 0" }}>
          <Container>
            <SectionHeading eyebrow={t.problemEyebrow} title={t.problemTitle} theme="dark" accent={ACCENT} />
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "var(--jr-space-5)" }}>
              {t.problems.map((p, i) => (
                <article key={i} className="jr-hover-lift" style={{ background: "var(--jr-navy-deep)", border: "1px solid var(--jr-navy-3)", borderRadius: "var(--jr-radius-lg)", padding: "28px 24px", borderLeft: `4px solid ${ACCENT}` }}>
                  <div style={{ width: 52, height: 52, borderRadius: "var(--jr-radius-md)", background: "rgba(114, 47, 55, 0.10)", border: `1px solid ${ACCENT}`, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "var(--jr-space-4)" }}>
                    <span aria-hidden style={{ fontSize: 28, lineHeight: 1 }}>{p.emoji}</span>
                  </div>
                  <h3 style={{ fontFamily: "var(--jr-font-heading)", fontSize: "var(--jr-text-lg)", fontWeight: 700, color: "var(--jr-paper)", marginBottom: "var(--jr-space-2)" }}>{p.title}</h3>
                  <p style={{ fontFamily: "var(--jr-font-body)", fontSize: "var(--jr-text-md)", color: "var(--jr-muted-on-dark)", lineHeight: 1.6 }}>{p.desc}</p>
                </article>
              ))}
            </div>
          </Container>
        </section>

        {/* ── WHY SAGIPER ── */}
        <section style={{ background: "var(--jr-navy-deep)", padding: "var(--jr-space-20) 0" }}>
          <Container>
            <SectionHeading eyebrow={t.whyEyebrow} title={t.whyTitle} subtitle={t.whySub} theme="dark" accent={ACCENT} />
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "var(--jr-space-5)" }}>
              {t.whyItems.map((s, i) => (
                <article key={i} className="jr-hover-lift" style={{ background: "var(--jr-navy)", border: "1px solid var(--jr-navy-3)", borderRadius: "var(--jr-radius-lg)", padding: "28px 24px" }}>
                  <div style={{ fontFamily: "var(--jr-font-heading)", fontSize: "var(--jr-text-xs)", fontWeight: 700, color: ACCENT_LIGHT, letterSpacing: "2px", marginBottom: "var(--jr-space-2)" }}>0{i + 1}</div>
                  <h3 style={{ fontFamily: "var(--jr-font-heading)", fontSize: "var(--jr-text-lg)", fontWeight: 700, color: "var(--jr-paper)", marginBottom: "var(--jr-space-3)" }}>{s.title}</h3>
                  <p style={{ fontFamily: "var(--jr-font-body)", fontSize: "var(--jr-text-md)", color: "var(--jr-muted-on-dark)", lineHeight: 1.65 }}>{s.desc}</p>
                </article>
              ))}
            </div>
          </Container>
        </section>

        {/* ── PEAK 301 ALERT (red, drives traffic to /peak-301) ── */}
        <Peak301Alert />

        {/* ── GOLD STANDARD ── */}
        <section style={{ background: "var(--jr-navy-deep)", padding: "var(--jr-space-20) 0" }}>
          <Container>
            <SectionHeading eyebrow={t.goldEyebrow} title={t.goldTitle} subtitle={t.goldSub} theme="dark" accent={ACCENT} />
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "var(--jr-space-5)" }}>
              {t.goldSteps.map((step) => (
                <ProcessStep key={step.num} num={step.num} title={step.title} desc={step.desc} accent={ACCENT} />
              ))}
            </div>
          </Container>
        </section>

        {/* ── REVIEWS ── */}
        <section style={{ background: "var(--jr-navy)", padding: "var(--jr-space-20) 0" }}>
          <Container>
            <SectionHeading eyebrow={t.reviewsEyebrow} title={t.reviewsTitle} theme="dark" accent={ACCENT} />
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "var(--jr-space-5)" }}>
              {t.reviews.map((rev, i) => (
                <ReviewCard key={i} {...rev} />
              ))}
            </div>
          </Container>
        </section>

        {/* ── FAQ ── */}
        <section style={{ background: "var(--jr-navy-deep)", padding: "var(--jr-space-20) 0" }}>
          <Container size="prose">
            <SectionHeading eyebrow={t.faqEyebrow} title={t.faqTitle} theme="dark" accent={ACCENT} />
            <FAQAccordion items={t.faqs} theme="dark" />
          </Container>
        </section>

        {/* ── CTA FORM ── */}
        <section id="quote-form" style={{ background: "linear-gradient(165deg, var(--jr-navy-2), var(--jr-navy))", padding: "var(--jr-space-20) 0", borderTop: "var(--jr-hair-darker)" }}>
          <Container size="narrow" style={{ textAlign: "center" }}>
            <h2 style={{ fontFamily: "var(--jr-font-heading)", fontSize: "var(--jr-text-3xl)", fontWeight: 700, color: "var(--jr-paper)", letterSpacing: "1px", marginBottom: "var(--jr-space-3)", textTransform: "uppercase" }}>{t.ctaTitle}</h2>
            <p style={{ fontFamily: "var(--jr-font-body)", fontSize: "var(--jr-text-lg)", color: "var(--jr-muted-on-dark)", lineHeight: 1.65, maxWidth: "560px", margin: "0 auto var(--jr-space-8)" }}>{t.ctaSub}</p>
            <div style={{ maxWidth: "560px", margin: "0 auto" }}>
              {submitted ? (
                <div style={{ background: "var(--jr-paper)", borderRadius: "var(--jr-radius-xl)", padding: "var(--jr-space-8)", boxShadow: "var(--jr-shadow-form)", textAlign: "center" }}>
                  <div style={{ display: "inline-flex", color: "var(--jr-success)", marginBottom: "var(--jr-space-3)" }}>
                    <CheckCircleIcon size={48} />
                  </div>
                  <h3 style={{ fontFamily: "var(--jr-font-heading)", fontSize: "var(--jr-text-xl)", fontWeight: 700, color: "var(--jr-navy)", marginBottom: "var(--jr-space-2)" }}>{t.formSent}</h3>
                  <p style={{ fontFamily: "var(--jr-font-body)", fontSize: "var(--jr-text-md)", color: "var(--jr-muted-on-light)" }}>{t.formSentSub}</p>
                </div>
              ) : (
                <form onSubmit={handleForm} style={{ background: "var(--jr-paper)", borderRadius: "var(--jr-radius-xl)", padding: "var(--jr-space-8) var(--jr-space-6)", boxShadow: "var(--jr-shadow-form)", textAlign: "left" }}>
                  {honeypot}
                  <h3 style={{ fontFamily: "var(--jr-font-heading)", fontSize: "var(--jr-text-xl)", fontWeight: 700, color: "var(--jr-navy)", textAlign: "center", marginBottom: "var(--jr-space-1)" }}>{t.formTitle}</h3>
                  <div aria-hidden style={{ width: 40, height: 3, background: ACCENT, borderRadius: 2, margin: "10px auto var(--jr-space-5)" }} />
                  <input aria-label={t.formName} style={inputStyle} placeholder={t.formName} value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required />
                  <input aria-label={t.formPhone} style={inputStyle} placeholder={t.formPhone} type="tel" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} required />
                  <input aria-label={t.formEmail} style={inputStyle} placeholder={t.formEmail} type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
                  <input aria-label={t.formZip} style={inputStyle} placeholder={t.formZip} value={formData.zip} onChange={(e) => setFormData({ ...formData, zip: e.target.value })} maxLength={5} />
                  <Button
                    type="submit"
                    variant="primary"
                    size="md"
                    fullWidth
                    iconRight
                    disabled={loading}
                    accent={ACCENT}
                    accentLight={ACCENT_LIGHT}
                    style={{
                      background: `linear-gradient(135deg, ${ACCENT}, ${ACCENT_LIGHT})`,
                      color: "#FFFFFF",
                      border: `2px solid ${ACCENT}`,
                      boxShadow: `0 4px 14px rgba(114, 47, 55, 0.32)`,
                    }}
                  >
                    {loading ? "Sending..." : t.formBtn}
                  </Button>
                  <p style={{ fontFamily: "var(--jr-font-body)", fontSize: "var(--jr-text-xs)", color: "var(--jr-muted-on-light)", textAlign: "center", marginTop: "var(--jr-space-3)" }}>{t.formNote}</p>
                </form>
              )}
            </div>
            <div style={{ marginTop: "var(--jr-space-8)" }}>
              <Button href="tel:8444443114" variant="ghost" size="md" iconLeft={<PhoneIcon size={16} />} accent={ACCENT} accentLight={ACCENT_LIGHT}>(844) 444-3114</Button>
            </div>
          </Container>
        </section>
      </main>

      <SiteFooter />
      <MobileCTA scrollTarget="quote-form" />
    </div>
  );
}
