"use client";

/* ═══════════════════════════════════════════════════════════
   JR ONE ALUMINUM: SIDING
   Brand-brain compliant. Tokens via app/tokens.css.
   ═══════════════════════════════════════════════════════════ */

import { useState } from "react";
import { useLanguage } from "../../lib/LanguageContext";
import SiteNav from "../../components/SiteNav";
import SiteFooter from "../../components/SiteFooter";
import ServiceAreaList from "../../components/ServiceAreaList";
import MobileCTA from "../../components/MobileCTA";
import Container from "../../components/ui/Container";
import Button from "../../components/ui/Button";
import SectionHeading from "../../components/ui/SectionHeading";
import ProcessStep from "../../components/ui/ProcessStep";
import ReviewCard from "../../components/ui/ReviewCard";
import FAQAccordion from "../../components/ui/FAQAccordion";
import {
  CheckCircleIcon,
  PhoneIcon,
} from "../../lib/icons";

// Page-identity accent: siding terracotta (warm exterior cladding).
const ACCENT = "#CC6B49";
const ACCENT_LIGHT = "#E07D5A";

const T = {
  en: {
    breadcrumb: ["Home", "Services", "Siding"],
    heroTag: "SIDING INSTALLATION & REPAIR",
    heroH1a: "Siding Replacement in Tampa Bay,",
    heroH1b: "Built for",
    heroH1c: "Florida Weather.",
    heroP: "Vinyl siding installation and repair built to handle Tampa Bay's sun, rain, humidity, and hurricanes. We install it right so your home stays protected and looking sharp for years.",
    heroCta: "Get Your Free Estimate",
    heroCall: "Call (844) 444-3114",
    stats: [
      { value: "500+", label: "Siding projects completed" },
      { value: "20+", label: "Year material warranties" },
      { value: "30+", label: "Color options available" },
      { value: "100%", label: "In-house crews" },
    ],
    problemEyebrow: "The Problem",
    problemTitle: "What Failing Siding Costs You",
    problems: [
      { emoji: "🌪️", title: "Storm-damage exposure", desc: "Florida's hurricane season puts enormous stress on siding. Impact from debris, sustained wind loads, and driving rain find every weakness in aging or poorly installed siding." },
      { emoji: "🔥", title: "UV and heat degradation", desc: "Tampa's intense sun warps, fades, and embrittles low-quality siding within years. What looked great at installation starts cracking and yellowing faster than you'd expect." },
      { emoji: "💧", title: "Moisture infiltration", desc: "Damaged or improperly installed siding lets moisture behind your walls. In Florida's humidity, that moisture breeds mold, rots framing, and creates air-quality problems inside your home." },
      { emoji: "🏠", title: "Declining home value", desc: "Damaged siding is one of the first things buyers and appraisers notice. It signals neglected maintenance and can reduce your home's appraised value by 5 to 10%." },
    ],
    solutionEyebrow: "The JR One Difference",
    solutionTitle: "Siding That Handles Florida",
    solutions: [
      { title: "Vinyl siding installation", desc: "Modern vinyl siding is engineered for Florida conditions: UV-resistant, impact-rated, and maintenance-free. No painting, no scraping, no staining. We install panels with proper overlap and fastening for hurricane-rated wind resistance." },
      { title: "SAGIPER architectural cladding", desc: "For maximum exterior protection and aesthetics, we install SAGIPER architectural cladding systems (SagiWall, SagiRev, and more). Wind-load tested, 50-year warranty, zero maintenance." },
      { title: "Storm-damage repair", desc: "Cracked panels, dented sections, torn pieces. We match your existing siding color and profile to replace damaged sections seamlessly. No need to reside your entire home for localized storm damage." },
      { title: "Hardie Board maintenance", desc: "Already have fiber-cement siding? We maintain, repair, and repaint Hardie Board to keep it performing and looking its best through Florida's demanding climate cycles." },
      { title: "Proper moisture-barrier installation", desc: "Every siding installation includes inspection and repair of the moisture barrier underneath. Siding over a compromised barrier is just a pretty cover over a rotting wall." },
      { title: "Color and style consultation", desc: "Wide selection of colors, profiles, and textures. We help you choose siding that complements your roof, trim, and neighborhood aesthetic, not just what's cheapest on the truck." },
    ],
    peakAlertLabel: "Florida Insurance Alert",
    peakAlertTitle: "280% Increase in Non-Renewals. Roof Over 15 Years Old?",
    peakAlertDesc: "Peak 301 restores shingles from the inside out. Adds 6 to 10 years of roof life for up to 70% less than a new roof install, with warranty docs Florida carriers need to see when evaluating your renewal.",
    peakBtn: "Peak 301 Info",
    peakRights: "Your Rights",
    goldEyebrow: "The Gold Standard",
    goldTitle: "Our Siding Installation Process",
    goldSub: "Every home. Every time. No exceptions.",
    goldSteps: [
      { num: "01", title: "Assess", desc: "Full exterior inspection. Current siding condition, moisture-barrier integrity, structural issues, and your aesthetic goals." },
      { num: "02", title: "Design", desc: "Material selection, color matching, cost breakdown, and a detailed project timeline. You know exactly what's happening and when." },
      { num: "03", title: "Install", desc: "Our crew removes old siding, repairs any substrate damage, installs moisture barrier, and mounts new siding with hurricane-rated fastening." },
      { num: "04", title: "Protect", desc: "Final walkthrough, cleanup, and our craftsmanship warranty. Your home looks brand new and is protected against whatever Florida sends." },
    ],
    reviewsEyebrow: "Reviews",
    reviewsTitle: "What Siding Customers Say",
    reviews: [
      { text: "JR One aluminum is nothing short of awesome. From Stefan as my sales person to Christian and the crew, they ALL deserve a big thank you. They replaced my fascia and soffit, did a beautiful job. Extremely professional, clean, courteous.", name: "JR One Customer", service: "Exterior Renovation", stars: 5 },
      { text: "Great crew, all very nice and courteous gentlemen. Work was done exactly to the quote and mock-up images. Not one detail missed. I will have them back as needed.", name: "Jaclyn G.", service: "Full Exterior Work", stars: 5 },
      { text: "Amazing work and so respectful. They moved everything out of the way and even put it all back. They even re-hung our security cameras. Swept up the mess too. Their work was beautiful.", name: "Jessica L.", service: "Siding + Soffit + Gutters", stars: 5 },
    ],
    faqEyebrow: "FAQ",
    faqTitle: "Siding Questions",
    faqs: [
      { q: "How much does siding installation cost in Tampa?", a: "Siding costs vary significantly based on material (vinyl vs. fiber cement vs. architectural cladding), home size, and the amount of prep work needed. Vinyl siding typically runs $4 to $9 per square foot installed. SAGIPER cladding is higher but comes with a 50-year warranty. We provide detailed, itemized estimates so you can compare apples to apples." },
      { q: "Which siding is best for Florida homes?", a: "For most Tampa Bay homes, vinyl siding offers the best balance of durability, appearance, and value. For homeowners wanting architectural aesthetics and maximum durability, we install SAGIPER architectural cladding (wind-load tested, UV-resistant, backed by a 50-year warranty). We assess your specific situation (location, exposure, budget) and give you an honest recommendation." },
      { q: "How long does siding installation take?", a: "A full house re-side typically takes 5 to 10 days depending on home size and complexity. Partial repairs or section replacements can often be completed in 1 to 2 days." },
      { q: "Can you match my existing siding for repairs?", a: "In most cases, yes. We maintain a wide inventory of profiles and colors, and we can special-order specific matches when needed. For older siding where exact matches are unavailable, we work with you to find the closest option or suggest replacing full sections for a consistent appearance." },
      { q: "Does new siding increase home value?", a: "Yes. Siding replacement consistently ranks among the top home improvements for return on investment. Industry data typically shows 70 to 80% cost recovery at resale, plus the curb-appeal improvement can help your home sell faster." },
      { q: "Do you handle the permit process?", a: "We guide you through any permitting requirements for your area. Tampa and surrounding municipalities have different rules about exterior renovations, and we make sure your project is compliant." },
      { q: "Do you replace whole-house siding or just sections in Tampa?", a: "Both. Full-home replacement when the siding is failing across the house, section replacement when the rest is sound (we match color and profile). A full re-side runs 5 to 10 days, a section 1 to 2 days. Call (844) 444-3114." },
      { q: "What siding materials does JR One install in Tampa?", a: "Four: vinyl lap, James Hardie fiber-cement (board, batten, shaker), custom aluminum, and Sagiper PVC architectural cladding. Vinyl is the best value for most homes; Hardie gives fiber-cement durability; Sagiper carries a 50-year warranty and zero maintenance. We walk your home and give an honest recommendation." },
      { q: "Is fiber-cement Hardie siding worth it in Florida's humidity?", a: "For a lot of Tampa homes, yes. Hardie resists moisture, rot, and impact better than older wood or low-grade vinyl. The trade-off is higher install cost than vinyl. We install Hardie board, batten, and shaker and set the moisture barrier underneath correctly." },
    ],
    ctaTitle: "Ready to Transform Your Home's Exterior?",
    ctaSub: "Get your free siding consultation. We'll inspect your current siding, discuss your options, and give you a transparent estimate. No pressure.",
    formTitle: "Get Your Free Siding Estimate",
    formName: "Full Name",
    formPhone: "Phone Number",
    formEmail: "Email Address",
    formZip: "ZIP Code",
    formBtn: "Request My Free Siding Estimate",
    formNote: "No spam. No pressure.",
    formSent: "Quote Request Received",
    formSentSub: "We'll get back to you within hours.",
  },
  es: {
    breadcrumb: ["Inicio", "Servicios", "Revestimiento"],
    heroTag: "INSTALACIÓN Y REPARACIÓN DE REVESTIMIENTO",
    heroH1a: "La Primera Línea de Defensa",
    heroH1b: "de Su Hogar Contra",
    heroH1c: "el Clima de Florida.",
    heroP: "Instalación y reparación de revestimiento de vinilo diseñado para manejar el sol, la lluvia, la humedad y los huracanes de Tampa Bay. Lo instalamos correctamente para que su hogar se mantenga protegido y con buena apariencia por años.",
    heroCta: "Obtenga Su Estimado Gratis",
    heroCall: "Llame al (844) 444-3114",
    stats: [
      { value: "500+", label: "Proyectos de revestimiento" },
      { value: "20+", label: "Años de garantía de materiales" },
      { value: "30+", label: "Opciones de color" },
      { value: "100%", label: "Equipos propios" },
    ],
    problemEyebrow: "El Problema",
    problemTitle: "Lo Que Le Cuesta un Revestimiento Dañado",
    problems: [
      { emoji: "🌪️", title: "Exposición a daños por tormenta", desc: "La temporada de huracanes de Florida somete al revestimiento a un estrés enorme. El impacto de escombros, cargas de viento sostenidas y lluvia torrencial encuentran cada debilidad en el revestimiento viejo o mal instalado." },
      { emoji: "🔥", title: "Degradación por UV y calor", desc: "El sol intenso de Tampa deforma, descolora y hace frágil el revestimiento de baja calidad en pocos años. Lo que se veía bien al instalarse comienza a agrietarse y amarillarse más rápido de lo esperado." },
      { emoji: "💧", title: "Infiltración de humedad", desc: "El revestimiento dañado o mal instalado deja pasar la humedad detrás de sus paredes. Con la humedad de Florida, esa humedad cría moho, pudre la estructura y crea problemas de calidad de aire dentro de su hogar." },
      { emoji: "🏠", title: "Disminución del valor de la propiedad", desc: "El revestimiento dañado es una de las primeras cosas que notan los compradores y tasadores. Señala mantenimiento descuidado y puede reducir el valor tasado de su hogar entre 5 y 10%." },
    ],
    solutionEyebrow: "La Diferencia JR One",
    solutionTitle: "Revestimiento Que Resiste Florida",
    solutions: [
      { title: "Instalación de revestimiento de vinilo", desc: "El revestimiento de vinilo moderno está diseñado para las condiciones de Florida: resistente a UV, clasificado contra impactos y libre de mantenimiento. Sin pintar, sin raspar, sin manchar. Instalamos los paneles con el traslape y fijación adecuados para resistencia a vientos de huracán." },
      { title: "Revestimiento arquitectónico SAGIPER", desc: "Para máxima protección exterior y estética, instalamos sistemas de revestimiento arquitectónico SAGIPER (SagiWall, SagiRev y más). Probado contra cargas de viento, garantía de 50 años, cero mantenimiento." },
      { title: "Reparación de daños por tormenta", desc: "Paneles agrietados, secciones abolladas, piezas rotas. Combinamos el color y perfil de su revestimiento existente para reemplazar las secciones dañadas sin problemas. No necesita re-revestir toda su casa por daño localizado de tormenta." },
      { title: "Mantenimiento de Hardie Board", desc: "¿Ya tiene revestimiento de fibrocemento? Mantenemos, reparamos y repintamos Hardie Board para que siga funcionando y luciendo lo mejor posible a través de los ciclos climáticos exigentes de Florida." },
      { title: "Instalación adecuada de barrera de humedad", desc: "Cada instalación de revestimiento incluye inspección y reparación de la barrera de humedad debajo. Revestimiento sobre una barrera comprometida es solo una cubierta bonita sobre una pared pudriéndose." },
      { title: "Consulta de color y estilo", desc: "Amplia selección de colores, perfiles y texturas. Le ayudamos a elegir el revestimiento que complemente su techo, molduras y estética del vecindario, no solo lo más barato en el camión." },
    ],
    peakAlertLabel: "Alerta de Seguros de Florida",
    peakAlertTitle: "280% de Aumento en No Renovaciones. ¿Techo de Más de 15 Años?",
    peakAlertDesc: "Peak 301 restaura las tejas desde adentro. Agrega 6 a 10 años de vida al techo por hasta 70% menos que un techo nuevo, con documentos de garantía que las aseguradoras de FL necesitan ver al evaluar la renovación.",
    peakBtn: "Info Peak 301",
    peakRights: "Sus Derechos",
    goldEyebrow: "El Estándar de Oro",
    goldTitle: "Nuestro Proceso de Instalación de Revestimiento",
    goldSub: "Cada hogar. Cada vez. Sin excepciones.",
    goldSteps: [
      { num: "01", title: "Evaluar", desc: "Inspección exterior completa. Condición actual del revestimiento, integridad de la barrera de humedad, problemas estructurales y sus objetivos estéticos." },
      { num: "02", title: "Diseñar", desc: "Selección de material, combinación de color, desglose de costos y un cronograma detallado del proyecto. Usted sabe exactamente qué va a pasar y cuándo." },
      { num: "03", title: "Instalar", desc: "Nuestro equipo remueve el revestimiento viejo, repara cualquier daño en el sustrato, instala la barrera de humedad y monta el revestimiento nuevo con fijación clasificada para huracanes." },
      { num: "04", title: "Proteger", desc: "Recorrido final, limpieza y nuestra garantía de mano de obra. Su hogar se ve como nuevo y está protegido contra lo que Florida le envíe." },
    ],
    reviewsEyebrow: "Reseñas",
    reviewsTitle: "Lo Que Dicen los Clientes de Revestimiento",
    reviews: [
      { text: "JR One aluminum es simplemente increíble. Desde Stefan como mi vendedor hasta Christian y el equipo, TODOS merecen un gran agradecimiento. Reemplazaron mi fascia y sofito, hicieron un trabajo hermoso. Extremadamente profesionales, limpios, corteses.", name: "Cliente de JR One", service: "Renovación Exterior", stars: 5 },
      { text: "Gran equipo, todos caballeros muy amables y corteses. El trabajo se hizo exactamente según la cotización e imágenes de muestra. No se perdió ni un detalle. Los tendré de vuelta cuando sea necesario.", name: "Jaclyn G.", service: "Trabajo Exterior Completo", stars: 5 },
      { text: "Trabajo increíble y muy respetuosos. Movieron todo fuera del camino e incluso lo pusieron de vuelta. Hasta volvieron a colgar nuestras cámaras de seguridad. Barrieron el desorden también. Su trabajo fue hermoso.", name: "Jessica L.", service: "Revestimiento, Sofito y Canaletas", stars: 5 },
    ],
    faqEyebrow: "Preguntas Frecuentes",
    faqTitle: "Preguntas Sobre Revestimiento",
    faqs: [
      { q: "¿Cuánto cuesta la instalación de revestimiento en Tampa?", a: "Los costos de revestimiento varían significativamente según el material (vinilo vs. fibrocemento vs. revestimiento arquitectónico), tamaño de la casa y la cantidad de trabajo de preparación necesario. El revestimiento de vinilo típicamente cuesta $4 a $9 por pie cuadrado instalado. El revestimiento SAGIPER es más alto pero viene con garantía de 50 años. Damos estimados detallados y desglosados para que pueda comparar correctamente." },
      { q: "¿Cuál es el mejor revestimiento para hogares en Florida?", a: "Para la mayoría de los hogares de Tampa Bay, el revestimiento de vinilo ofrece el mejor balance de durabilidad, apariencia y valor. Para propietarios que desean estética arquitectónica y máxima durabilidad, instalamos revestimiento arquitectónico SAGIPER (probado contra cargas de viento, resistente a UV y respaldado por una garantía de 50 años). Evaluamos su situación específica (ubicación, exposición, presupuesto) y le damos una recomendación honesta." },
      { q: "¿Cuánto tiempo toma la instalación?", a: "Un re-revestimiento completo de casa típicamente toma 5 a 10 días dependiendo del tamaño y complejidad. Reparaciones parciales o reemplazos de secciones a menudo se pueden completar en 1 a 2 días." },
      { q: "¿Pueden igualar mi revestimiento existente para reparaciones?", a: "En la mayoría de los casos, sí. Mantenemos un amplio inventario de perfiles y colores, y podemos hacer pedidos especiales de combinaciones específicas cuando es necesario. Para revestimiento viejo donde las combinaciones exactas no están disponibles, trabajamos con usted para encontrar la opción más cercana o sugerimos reemplazar secciones completas para una apariencia consistente." },
      { q: "¿El revestimiento nuevo aumenta el valor de la propiedad?", a: "Sí. El reemplazo de revestimiento consistentemente se clasifica entre las mejores mejoras del hogar por retorno de inversión. Los datos de la industria típicamente muestran 70 a 80% de recuperación de costos en la reventa, además de que la mejora en apariencia puede ayudar a que su casa se venda más rápido." },
      { q: "¿Manejan el proceso de permisos?", a: "Lo guiamos a través de cualquier requisito de permisos para su área. Tampa y los municipios circundantes tienen diferentes reglas sobre renovaciones exteriores, y nos aseguramos de que su proyecto cumpla con las normas." },
    ],
    ctaTitle: "¿Listo para Transformar el Exterior de Su Hogar?",
    ctaSub: "Obtenga su consulta gratis de revestimiento. Inspeccionaremos su revestimiento actual, discutiremos sus opciones y le daremos un estimado transparente. Sin presión.",
    formTitle: "Obtenga Su Estimado Gratis de Revestimiento",
    formName: "Nombre Completo",
    formPhone: "Número de Teléfono",
    formEmail: "Correo Electrónico",
    formZip: "Código Postal",
    formBtn: "Solicitar Mi Estimado Gratis",
    formNote: "Sin spam. Sin presión.",
    formSent: "Solicitud de Cotización Recibida",
    formSentSub: "Nos pondremos en contacto en horas.",
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

export default function SidingPage({ portfolio = null }) {
  const { lang } = useLanguage();
  const t = T[lang];
  const [formData, setFormData] = useState({ name: "", phone: "", email: "", zip: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

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
          name: formData.name,
          phone: formData.phone,
          email: formData.email,
          zip: formData.zip,
          service: "Siding",
          page: "siding",
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

        <section className="jr-noise-bg jr-service-hero" style={{ position: "relative", padding: "var(--jr-space-12) var(--jr-space-6) var(--jr-space-20)", backgroundImage: "linear-gradient(165deg, rgba(11,22,51,0.84) 0%, rgba(17,32,67,0.88) 55%, rgba(22,42,80,0.92) 100%), url('/images/siding-hero.webp')", backgroundSize: "cover", backgroundPosition: "center", overflow: "hidden" }}>
          <div aria-hidden style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, background: "radial-gradient(ellipse at 28% 22%, rgba(200,149,46,0.08) 0%, transparent 60%)", pointerEvents: "none" }} />
          <Container style={{ position: "relative", zIndex: 1 }}>
            <div style={{ maxWidth: "780px" }}>
              <div style={{ fontFamily: "var(--jr-font-heading)", fontSize: "var(--jr-text-xs)", fontWeight: 700, color: ACCENT_LIGHT, letterSpacing: "4px", marginBottom: "var(--jr-space-4)", textTransform: "uppercase" }}>{t.heroTag}</div>
              <h1 style={{ fontFamily: "var(--jr-font-heading)", fontSize: "var(--jr-text-4xl)", fontWeight: 800, lineHeight: 1.05, marginBottom: "var(--jr-space-6)", letterSpacing: "-0.5px" }}>
                {t.heroH1a}<br />{t.heroH1b}<br />
                <span style={{ color: ACCENT_LIGHT }}>{t.heroH1c}</span>
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
                    boxShadow: `0 4px 14px rgba(204, 107, 73, 0.32)`,
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

        {/* ── PROBLEM ── */}
        <section style={{ background: "var(--jr-navy-deep)", padding: "var(--jr-space-20) 0" }}>
          <Container>
            <SectionHeading eyebrow={t.problemEyebrow} title={t.problemTitle} theme="dark" accent={ACCENT} />
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "var(--jr-space-5)" }}>
              {t.problems.map((p, i) => (
                <article key={i} className="jr-hover-lift" style={{ background: "var(--jr-navy)", border: "1px solid var(--jr-navy-3)", borderRadius: "var(--jr-radius-lg)", padding: "28px 24px", borderLeft: `4px solid ${ACCENT}` }}>
                  <div style={{ width: 52, height: 52, borderRadius: "var(--jr-radius-md)", background: "rgba(204, 107, 73, 0.10)", border: `1px solid ${ACCENT}`, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "var(--jr-space-4)" }}>
                    <span aria-hidden style={{ fontSize: 28, lineHeight: 1 }}>{p.emoji}</span>
                  </div>
                  <h3 style={{ fontFamily: "var(--jr-font-heading)", fontSize: "var(--jr-text-lg)", fontWeight: 700, color: "var(--jr-paper)", marginBottom: "var(--jr-space-2)" }}>{p.title}</h3>
                  <p style={{ fontFamily: "var(--jr-font-body)", fontSize: "var(--jr-text-md)", color: "var(--jr-muted-on-dark)", lineHeight: 1.6 }}>{p.desc}</p>
                </article>
              ))}
            </div>
          </Container>
        </section>

        {/* ── SOLUTION ── */}
        <section style={{ background: "var(--jr-navy)", padding: "var(--jr-space-20) 0" }}>
          <Container>
            <SectionHeading eyebrow={t.solutionEyebrow} title={t.solutionTitle} theme="dark" accent={ACCENT} />
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "var(--jr-space-5)" }}>
              {t.solutions.map((s, i) => (
                <article key={i} className="jr-hover-lift" style={{ background: "var(--jr-navy-deep)", border: "1px solid var(--jr-navy-3)", borderRadius: "var(--jr-radius-lg)", padding: "28px 24px" }}>
                  <div style={{ fontFamily: "var(--jr-font-heading)", fontSize: "var(--jr-text-xs)", fontWeight: 700, color: ACCENT_LIGHT, letterSpacing: "2px", marginBottom: "var(--jr-space-2)" }}>0{i + 1}</div>
                  <h3 style={{ fontFamily: "var(--jr-font-heading)", fontSize: "var(--jr-text-lg)", fontWeight: 700, color: "var(--jr-paper)", marginBottom: "var(--jr-space-3)" }}>{s.title}</h3>
                  <p style={{ fontFamily: "var(--jr-font-body)", fontSize: "var(--jr-text-md)", color: "var(--jr-muted-on-dark)", lineHeight: 1.65 }}>{s.desc}</p>
                </article>
              ))}
            </div>
          </Container>
        </section>


        {/* ── GOLD STANDARD ── */}
        <section style={{ background: "var(--jr-navy)", padding: "var(--jr-space-20) 0" }}>
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
        <section style={{ background: "var(--jr-navy-deep)", padding: "var(--jr-space-20) 0" }}>
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
        <section style={{ background: "var(--jr-navy)", padding: "var(--jr-space-20) 0" }}>
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
                      boxShadow: `0 4px 14px rgba(204, 107, 73, 0.32)`,
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
        {portfolio ? (
          <section
            className="city-portfolio-section"
            style={{
              background: "var(--jr-paper)",
              padding: "var(--jr-space-16) 0",
              borderTop: "var(--jr-hair)",
            }}
          >
            <Container>{portfolio}</Container>
          </section>
        ) : null}
      </main>
      <ServiceAreaList
        service="siding"
        serviceLabel={lang === "es" ? "Revestimiento" : "Siding"}
        lang={lang}
      />


      <SiteFooter />
      <MobileCTA scrollTarget="quote-form" />
    </div>
  );
}
