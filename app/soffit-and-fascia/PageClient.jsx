"use client";

/* ═══════════════════════════════════════════════════════════
   JR ONE ALUMINUM: SOFFIT & FASCIA
   Brand-brain compliant. Tokens via app/tokens.css.
   ═══════════════════════════════════════════════════════════ */

import { useState } from "react";
import { useLanguage } from "../../lib/LanguageContext";
import { useLeadGuard } from "../../lib/lead-guard";
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
import Peak301Alert from "../../components/ui/Peak301Alert";
import {
  CheckCircleIcon,
  PhoneIcon,
} from "../../lib/icons";

// Page-identity accent: soffit & fascia warm orange (roof-edge sun).
const ACCENT = "#E67E22";
const ACCENT_LIGHT = "#F39C12";

const T = {
  en: {
    breadcrumb: ["Home", "Services", "Soffit and Fascia Tampa"],
    heroTag: "TAMPA BAY SOFFIT AND FASCIA",
    heroH1a: "The Part of Your Home",
    heroH1b: "Nobody Thinks About",
    heroH1c: "Until It Fails.",
    heroH2Sub: "Soffit and Fascia Replacement in Tampa Bay",
    heroP: "Soffit and fascia protect the most vulnerable edges of your roof from water, pests, and rot. When they fail, the damage spreads fast and gets expensive. We replace and install aluminum and vinyl soffit and fascia systems built for Florida weather.",
    heroCta: "Get Your Free Inspection",
    heroCall: "Call (844) 444-3114",
    stats: [
      { value: "2,000+", label: "Soffit & fascia projects" },
      { value: "30+", label: "Years in the trade" },
      { value: "3", label: "In-house crews" },
      { value: "0", label: "Subcontractors used, ever" },
    ],
    problemEyebrow: "The Problem",
    problemTitle: "What Happens When Soffit and Fascia Fail",
    problems: [
      { emoji: "💧", title: "Rotting wood fascia", desc: "Florida's humidity and rain cycles destroy wood fascia boards from the inside out. By the time you see paint peeling, the rot has already spread behind your gutters and into your roof structure." },
      { emoji: "🛡️", title: "Pest entry points", desc: "Damaged or missing soffit panels are open invitations for wasps, birds, squirrels, bats, and rodents to nest in your attic. Once inside, they cause electrical damage, insulation contamination, and health hazards." },
      { emoji: "🌤️", title: "Ventilation failure", desc: "Soffit vents are your attic's primary air intake. When they're blocked, damaged, or missing, your attic traps heat. That drives up energy bills and accelerates shingle deterioration from underneath." },
      { emoji: "🏠", title: "Curb-appeal collapse", desc: "Stained, sagging, or mismatched soffit and fascia instantly age your home's appearance. It's the first thing people notice when they look up, and the last thing sellers want buyers to see." },
    ],
    solutionEyebrow: "The JR One Difference",
    solutionTitle: "Soffit & Fascia Done Right",
    solutionSub: "We fix the problem underneath before covering it up. Wrapping aluminum over rotten wood is not a solution.",
    solutions: [
      { title: "Aluminum soffit and fascia", desc: "Our primary recommendation for Florida homes. Aluminum won't rot, warp, crack, or attract termites. It handles UV exposure, salt air, and hurricane-force rain without deteriorating. One installation, decades of protection." },
      { title: "Vinyl soffit and fascia", desc: "A budget-friendly alternative that still outperforms wood in every way. Vinyl won't rot or need painting, and modern vinyl products resist fading and impact. We help you choose based on your budget and aesthetic goals." },
      { title: "Wood-rot repair underneath", desc: "Before installing new soffit or fascia, we inspect and replace any rotted wood substrate. Many companies wrap aluminum over rotten wood. We fix the problem first so your new material has a solid foundation." },
      { title: "Proper ventilation restoration", desc: "We make sure your soffit vents are correctly placed and unblocked for optimal attic airflow. That keeps your energy bills lower, extends shingle life, and prevents moisture buildup that causes mold." },
      { title: "Color matching and seamless finish", desc: "We carry a wide selection of colors and profiles to match your existing trim, gutters, and home style. The finished look should be seamless, not obviously replaced." },
      { title: "Storm-damage response", desc: "Florida hurricanes rip soffit panels off like paper. We respond quickly to storm damage, board up exposed areas to prevent further damage, and schedule permanent replacement as fast as possible." },
    ],
    peakAlertLabel: "Florida Insurance Alert",
    peakAlertTitle: "280% Increase in Non-Renewals. Roof Over 15 Years Old?",
    peakAlertDesc: "Peak 301 restores shingles from the inside out. Adds 6 to 10 years of roof life for up to 70% less than a new roof install, with warranty docs Florida carriers may consider when evaluating your renewal.",
    peakBtn: "Peak 301 Info",
    peakRights: "Your Rights",
    goldEyebrow: "The Gold Standard",
    goldTitle: "Our Soffit & Fascia Process",
    goldSub: "Every home. Every time. No exceptions.",
    goldSteps: [
      { num: "01", title: "Assess", desc: "Full inspection of your soffit, fascia, and underlying wood structure. We photograph everything and identify hidden rot or pest damage." },
      { num: "02", title: "Design", desc: "Material selection (aluminum or vinyl), color matching, ventilation planning, and a transparent estimate with no surprises." },
      { num: "03", title: "Install", desc: "Our crew removes old material, repairs any rotted wood, and installs new soffit and fascia. Most homes are completed in 1 to 3 days." },
      { num: "04", title: "Protect", desc: "Walkthrough inspection with you, cleanup, and our craftsmanship warranty. Your roof edge is sealed and protected." },
    ],
    reviewsEyebrow: "Reviews",
    reviewsTitle: "What Soffit & Fascia Customers Say",
    reviews: [
      { text: "I cannot express how grateful I am that JR One was referred to me. Chris was very communicative and supportive throughout the entire process. The crew arrived on time, were very nice and attentive. Talk about professionalism and integrity.", name: "Michelle D.", service: "Soffit & Fascia Install", stars: 5 },
      { text: "They removed the old wood soffit, replaced all the soffit and facia with aluminum, replaced all the wood that had termite damage with new wood, and the job was done in a matter of days. Six guys on site with a crew manager.", name: "Tampa Homeowner", service: "Full Soffit & Fascia Replacement", stars: 5 },
      { text: "After Milton I called a dozen different companies to help with our soffits that got blown out. Only one called back, JR ONE. The team showed up and did a perfect job. Do not call anyone else.", name: "Matt D.", service: "Storm Damage Soffit Repair", stars: 5 },
    ],
    faqEyebrow: "FAQ",
    faqTitle: "Soffit & Fascia Questions",
    faqs: [
      { q: "What's the difference between soffit and fascia?", a: "Soffit is the horizontal panel underneath your roof overhang, the surface you see when you look up at your eaves. Fascia is the vertical board that runs along the edge of your roof, where your gutters attach. Together they seal and protect the edges of your roof structure." },
      { q: "How much does soffit and fascia replacement cost?", a: "Full house soffit and fascia replacement in Tampa typically ranges from $5,000 to $15,000+ depending on home size, material (aluminum vs. vinyl), amount of wood-rot repair needed, and accessibility. We provide detailed estimates broken down by section so you can prioritize if needed." },
      { q: "Should I choose aluminum or vinyl soffit?", a: "For Florida, we generally recommend aluminum. It's more durable in extreme heat, handles impact better during storms, and lasts longer. Vinyl is a solid budget option that still outperforms wood. We'll assess your specific situation and give you an honest recommendation." },
      { q: "How do I know if my soffit or fascia needs replacing?", a: "Look for paint peeling or bubbling, visible staining, sagging panels, holes or cracks, soft spots when pressed, pest activity near your roofline, or pieces that have detached. If your soffit or fascia is original wood and your home is 15+ years old, it's worth an inspection." },
      { q: "Do you repair the wood underneath?", a: "Yes, and this is critical. We inspect and replace any rotted wood substrate before installing new aluminum or vinyl. Some companies skip this step and wrap new material over rotten wood, which just hides the problem. We fix it right." },
      { q: "How long does soffit and fascia installation take?", a: "Most full-house soffit and fascia replacements take 2 to 4 days depending on home size and the extent of wood repair needed. Partial replacements or repairs can often be completed in a single day." },
    ],
    ctaTitle: "Protect Your Roof's Most Vulnerable Edges",
    ctaSub: "Get your free soffit and fascia inspection. We'll document the condition of your entire roofline and give you a transparent, no-pressure estimate.",
    formTitle: "Get Your Free Soffit & Fascia Inspection",
    formName: "Full Name",
    formPhone: "Phone Number",
    formEmail: "Email Address",
    formZip: "ZIP Code",
    formBtn: "Request My Free Inspection",
    formNote: "No spam. No pressure. Just honest advice from the trade.",
    formSent: "Inspection Request Received",
    formSentSub: "We'll get back to you within hours.",
  },
  es: {
    breadcrumb: ["Inicio", "Servicios", "Sofito y Fascia Tampa"],
    heroTag: "SOFITO Y FASCIA TAMPA BAY",
    heroH1a: "La Parte de Su Hogar",
    heroH1b: "En la Que Nadie Piensa",
    heroH1c: "Hasta Que Falla.",
    heroH2Sub: "Reemplazo de Sofito y Fascia en Tampa Bay",
    heroP: "El sofito y la fascia protegen los bordes más vulnerables de su techo contra el agua, plagas y pudrición. Cuando fallan, el daño se propaga rápido y se vuelve costoso. Reemplazamos e instalamos sistemas de sofito y fascia de aluminio y vinilo diseñados para el clima de Florida.",
    heroCta: "Obtenga Su Inspección Gratis",
    heroCall: "Llame al (844) 444-3114",
    stats: [
      { value: "2,000+", label: "Proyectos de sofito y fascia" },
      { value: "30+", label: "Años en el oficio" },
      { value: "3", label: "Equipos propios" },
      { value: "0", label: "Subcontratistas, nunca" },
    ],
    problemEyebrow: "El Problema",
    problemTitle: "Qué Pasa Cuando el Sofito y la Fascia Fallan",
    problems: [
      { emoji: "💧", title: "Fascia de madera podrida", desc: "La humedad y los ciclos de lluvia de Florida destruyen las tablas de fascia de madera desde adentro. Para cuando ve la pintura descascarándose, la pudrición ya se extendió detrás de sus canaletas y hacia la estructura del techo." },
      { emoji: "🛡️", title: "Puntos de entrada de plagas", desc: "Los paneles de sofito dañados o faltantes son invitaciones abiertas para avispas, pájaros, ardillas, murciélagos y roedores que anidan en su ático. Una vez adentro, causan daños eléctricos, contaminación del aislamiento y riesgos de salud." },
      { emoji: "🌤️", title: "Falla de ventilación", desc: "Las rejillas del sofito son la entrada principal de aire de su ático. Cuando están bloqueadas, dañadas o faltantes, su ático atrapa calor. Eso aumenta las facturas de energía y acelera el deterioro de las tejas desde abajo." },
      { emoji: "🏠", title: "Pérdida de atractivo exterior", desc: "El sofito y fascia manchados, combados o que no combinan envejecen instantáneamente la apariencia de su hogar. Es lo primero que la gente nota al mirar hacia arriba, y lo último que los vendedores quieren que los compradores vean." },
    ],
    solutionEyebrow: "La Diferencia JR One",
    solutionTitle: "Sofito y Fascia Bien Hecho",
    solutionSub: "Arreglamos el problema debajo antes de cubrirlo. Envolver aluminio sobre madera podrida no es una solución.",
    solutions: [
      { title: "Sofito y fascia de aluminio", desc: "Nuestra recomendación principal para hogares en Florida. El aluminio no se pudre, deforma, agrieta ni atrae termitas. Maneja la exposición UV, el aire salado y la lluvia de fuerza huracanada sin deteriorarse. Una instalación, décadas de protección." },
      { title: "Sofito y fascia de vinilo", desc: "Una alternativa económica que aún supera a la madera en todo sentido. El vinilo no se pudre ni necesita pintura, y los productos modernos de vinilo resisten la decoloración y el impacto. Le ayudamos a elegir según su presupuesto y objetivos estéticos." },
      { title: "Reparación de madera podrida debajo", desc: "Antes de instalar nuevo sofito o fascia, inspeccionamos y reemplazamos cualquier sustrato de madera podrida. Muchas empresas envuelven aluminio sobre madera podrida. Nosotros arreglamos el problema primero para que su material nuevo tenga una base sólida." },
      { title: "Restauración de ventilación adecuada", desc: "Aseguramos que las rejillas de su sofito estén correctamente ubicadas y desbloqueadas para un flujo de aire óptimo del ático. Eso mantiene sus facturas de energía más bajas, extiende la vida de las tejas y previene la acumulación de humedad que causa moho." },
      { title: "Combinación de color y acabado continuo", desc: "Tenemos una amplia selección de colores y perfiles para combinar con su moldura, canaletas y estilo de hogar existente. El resultado final debe verse continuo, no como un reemplazo obvio." },
      { title: "Respuesta a daños por tormenta", desc: "Los huracanes de Florida arrancan los paneles de sofito como papel. Respondemos rápidamente a daños por tormenta, aseguramos las áreas expuestas para prevenir más daño y programamos el reemplazo permanente lo más rápido posible." },
    ],
    peakAlertLabel: "Alerta de Seguros de Florida",
    peakAlertTitle: "280% de Aumento en No Renovaciones. ¿Techo de Más de 15 Años?",
    peakAlertDesc: "Peak 301 restaura las tejas desde adentro. Agrega 6 a 10 años de vida al techo por hasta 70% menos que un techo nuevo, con documentos de garantía que las aseguradoras de FL pueden considerar al evaluar la renovación.",
    peakBtn: "Info Peak 301",
    peakRights: "Sus Derechos",
    goldEyebrow: "El Estándar de Oro",
    goldTitle: "Nuestro Proceso de Sofito y Fascia",
    goldSub: "Cada hogar. Cada vez. Sin excepciones.",
    goldSteps: [
      { num: "01", title: "Evaluar", desc: "Inspección completa de su sofito, fascia y estructura de madera subyacente. Fotografiamos todo e identificamos pudrición oculta o daños por plagas." },
      { num: "02", title: "Diseñar", desc: "Selección de material (aluminio o vinilo), combinación de color, planificación de ventilación y un estimado transparente sin sorpresas." },
      { num: "03", title: "Instalar", desc: "Nuestro equipo remueve el material viejo, repara cualquier madera podrida e instala sofito y fascia nuevos. La mayoría de los hogares se completan en 1 a 3 días." },
      { num: "04", title: "Proteger", desc: "Inspección de recorrido con usted, limpieza y nuestra garantía de mano de obra. El borde de su techo queda sellado y protegido." },
    ],
    reviewsEyebrow: "Reseñas",
    reviewsTitle: "Lo Que Dicen los Clientes de Sofito y Fascia",
    reviews: [
      { text: "No puedo expresar lo agradecida que estoy de que me refirieron a JR One. Chris fue muy comunicativo y me apoyó durante todo el proceso. El equipo llegó a tiempo, fueron muy amables y atentos. Eso es profesionalismo e integridad.", name: "Michelle D.", service: "Instalación de Sofito y Fascia", stars: 5 },
      { text: "Removieron el sofito viejo de madera, reemplazaron todo el sofito y fascia con aluminio, reemplazaron toda la madera dañada por termitas con madera nueva, y el trabajo se completó en cuestión de días. Seis personas en el sitio con un gerente de equipo.", name: "Propietario de Tampa", service: "Reemplazo Completo de Sofito y Fascia", stars: 5 },
      { text: "Después de Milton llamé a una docena de empresas diferentes para ayudar con nuestros sofitos que se volaron. Solo una devolvió la llamada, JR ONE. El equipo se presentó e hizo un trabajo perfecto. No llame a nadie más.", name: "Matt D.", service: "Reparación de Sofito por Tormenta", stars: 5 },
    ],
    faqEyebrow: "Preguntas Frecuentes",
    faqTitle: "Preguntas Sobre Sofito y Fascia",
    faqs: [
      { q: "¿Cuál es la diferencia entre sofito y fascia?", a: "El sofito es el panel horizontal debajo del alero de su techo, la superficie que ve cuando mira hacia arriba en los aleros. La fascia es la tabla vertical que corre a lo largo del borde de su techo, donde se fijan sus canaletas. Juntos sellan y protegen los bordes de la estructura de su techo." },
      { q: "¿Cuánto cuesta el reemplazo de sofito y fascia?", a: "El reemplazo completo de sofito y fascia en Tampa generalmente oscila entre $5,000 y $15,000+ dependiendo del tamaño de la casa, material (aluminio vs. vinilo), cantidad de reparación de madera podrida necesaria y accesibilidad. Proporcionamos estimados detallados desglosados por sección para que pueda priorizar si es necesario." },
      { q: "¿Debo elegir sofito de aluminio o vinilo?", a: "Para Florida, generalmente recomendamos aluminio. Es más duradero en calor extremo, maneja mejor los impactos durante tormentas y dura más. El vinilo es una buena opción económica que aún supera a la madera. Evaluaremos su situación específica y le daremos una recomendación honesta." },
      { q: "¿Cómo sé si mi sofito o fascia necesita reemplazo?", a: "Busque pintura descascarándose o burbujeando, manchas visibles, paneles combados, agujeros o grietas, puntos blandos al presionar, actividad de plagas cerca de su línea de techo, o piezas desprendidas. Si su sofito o fascia es madera original y su hogar tiene más de 15 años, vale la pena una inspección." },
      { q: "¿Reparan la madera debajo?", a: "Sí, y esto es crítico. Inspeccionamos y reemplazamos cualquier sustrato de madera podrida antes de instalar aluminio o vinilo nuevo. Algunas empresas se saltan este paso y envuelven material nuevo sobre madera podrida, lo que solo oculta el problema. Nosotros lo hacemos bien." },
      { q: "¿Cuánto tiempo toma la instalación de sofito y fascia?", a: "La mayoría de los reemplazos completos de sofito y fascia toman 2 a 4 días dependiendo del tamaño de la casa y la extensión de la reparación de madera necesaria. Reemplazos parciales o reparaciones a menudo se pueden completar en un solo día." },
    ],
    ctaTitle: "Proteja los Bordes Más Vulnerables de Su Techo",
    ctaSub: "Obtenga su inspección gratis de sofito y fascia. Documentaremos la condición de toda su línea de techo y le daremos un estimado transparente y sin presión.",
    formTitle: "Obtenga Su Inspección Gratis",
    formName: "Nombre Completo",
    formPhone: "Número de Teléfono",
    formEmail: "Correo Electrónico",
    formZip: "Código Postal",
    formBtn: "Solicitar Mi Inspección Gratis",
    formNote: "Sin spam. Sin presión. Solo consejo honesto del oficio.",
    formSent: "Solicitud de Inspección Recibida",
    formSentSub: "Nos comunicaremos con usted en pocas horas.",
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

export default function SoffitFasciaPage({ portfolio = null }) {
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
          service: "Soffit & Fascia",
          page: "soffit-and-fascia",
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

        <section className="jr-noise-bg jr-service-hero" style={{ position: "relative", padding: "var(--jr-space-12) var(--jr-space-6) var(--jr-space-20)", backgroundImage: "linear-gradient(165deg, rgba(11,22,51,0.84) 0%, rgba(17,32,67,0.88) 55%, rgba(22,42,80,0.92) 100%), url('/images/soffit-fascia-detail.webp')", backgroundSize: "cover", backgroundPosition: "center", overflow: "hidden" }}>
          <div aria-hidden style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, background: "radial-gradient(ellipse at 28% 22%, rgba(200,149,46,0.08) 0%, transparent 60%)", pointerEvents: "none" }} />
          <Container style={{ position: "relative", zIndex: 1 }}>
            <div style={{ maxWidth: "780px" }}>
              <div style={{ fontFamily: "var(--jr-font-heading)", fontSize: "var(--jr-text-xs)", fontWeight: 700, color: ACCENT_LIGHT, letterSpacing: "4px", marginBottom: "var(--jr-space-4)", textTransform: "uppercase" }}>{t.heroTag}</div>
              <h1 style={{ fontFamily: "var(--jr-font-heading)", fontSize: "var(--jr-text-4xl)", fontWeight: 800, lineHeight: 1.05, marginBottom: "var(--jr-space-4)", letterSpacing: "-0.5px" }}>
                {t.heroH1a}<br />{t.heroH1b}<br />
                <span style={{ color: ACCENT_LIGHT }}>{t.heroH1c}</span>
              </h1>
              <h2 style={{ fontFamily: "var(--jr-font-heading)", fontSize: "var(--jr-text-xl)", fontWeight: 600, lineHeight: 1.25, color: "var(--jr-cream-2)", marginBottom: "var(--jr-space-6)", maxWidth: "660px", letterSpacing: "-0.2px" }}>{t.heroH2Sub}</h2>
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
                    boxShadow: `0 4px 14px rgba(230, 126, 34, 0.32)`,
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
                  <div style={{ width: 52, height: 52, borderRadius: "var(--jr-radius-md)", background: "rgba(230, 126, 34, 0.10)", border: `1px solid ${ACCENT}`, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "var(--jr-space-4)" }}>
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
            <SectionHeading eyebrow={t.solutionEyebrow} title={t.solutionTitle} subtitle={t.solutionSub} theme="dark" accent={ACCENT} />
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

        {/* ── PEAK 301 ALERT (red, drives traffic to /peak-301) ── */}
        <Peak301Alert />

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
                      boxShadow: `0 4px 14px rgba(230, 126, 34, 0.32)`,
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
        service="soffit-and-fascia"
        serviceLabel={lang === "es" ? "Sofito y Fascia" : "Soffit and Fascia"}
        lang={lang}
      />


      <SiteFooter />
      <MobileCTA scrollTarget="quote-form" />
    </div>
  );
}
