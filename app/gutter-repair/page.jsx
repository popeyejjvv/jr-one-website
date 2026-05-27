"use client";

/* ═══════════════════════════════════════════════════════════
   JR ONE ALUMINUM / GUTTER REPAIR SERVICE PAGE
   Brand-brain compliant. Design-elevated.
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
import CTABand from "../../components/ui/CTABand";
import ProcessStep from "../../components/ui/ProcessStep";
import ReviewCard from "../../components/ui/ReviewCard";
import FAQAccordion from "../../components/ui/FAQAccordion";
import Peak301Alert from "../../components/ui/Peak301Alert";
import { CheckCircleIcon, PhoneIcon } from "../../lib/icons";

const T = {
  en: {
    breadcrumb: ["Home", "Services", "Gutter Repair & Maintenance"],
    heroTag: "GUTTER REPAIR & MAINTENANCE",
    heroH1: "Leaking, Sagging, or Overflowing?",
    heroH1Gold: "We Fix It Right the First Time.",
    heroP: "Don't let small gutter problems become expensive home damage. We diagnose the real issue, not just the symptom, and fix it so you don't have to call again. Plus seasonal maintenance programs to prevent problems before they start.",
    btnEstimate: "GET YOUR FREE INSPECTION",
    btnCall: "(844) 444-3114",
    problemTag: "WHY IT MATTERS",
    problemTitle: "Gutter Problems That Get Expensive Fast",
    problems: [
      { title: "Leaking seams and joints", desc: "Water dripping between gutter sections, at corners, or around downspout connections. Left unrepaired, leaks stain your fascia, rot your wood, and erode your foundation soil." },
      { title: "Sagging and pulling away", desc: "Gutters pulling away from the fascia board due to failed hangers, rotted wood, or ice/debris weight. Sagging gutters don't drain. They pool water and eventually collapse." },
      { title: "Overflowing in rain", desc: "Water pouring over the front edge during storms. Usually caused by clogs, incorrect pitch, or undersized gutters. The water goes exactly where gutters are supposed to prevent it from going." },
      { title: "Damaged or missing downspouts", desc: "Crushed, disconnected, or missing downspouts mean water dumps directly at your foundation instead of being routed away. This is how foundation cracks, basement flooding, and soil erosion happen." },
    ],
    solutionTag: "THE JR ONE WAY",
    solutionTitle: "Repairs That Actually Last",
    solutionSub: "We diagnose the root cause and fix it permanently. No band-aid solutions that fail next storm season.",
    solutions: [
      { emoji: "💧", title: "Leak repair and sealing", desc: "We locate every leak point (seams, end caps, corners, downspout connections) and seal them with professional-grade sealant that flexes with temperature changes. No temporary fixes that fail in six months." },
      { emoji: "🔧", title: "Hanger replacement and realignment", desc: "We replace failed spike-and-ferrule hangers with modern hidden bracket systems, refasten gutters to solid fascia, and re-pitch for proper water flow. Your gutters hang straight and drain completely." },
      { emoji: "🛠️", title: "Downspout repair and rerouting", desc: "We repair or replace damaged downspouts, add extensions to direct water away from your foundation, and reroute drainage when the original layout isn't working." },
      { emoji: "🧹", title: "Gutter cleaning and debris removal", desc: "Full cleanout of leaves, pine needles, shingle grit, and standing water. We flush every downspout to confirm clear flow and inspect for damage while we're up there." },
      { emoji: "⚠️", title: "Storm damage emergency response", desc: "Tampa hurricane season doesn't wait and neither do we. We respond quickly to storm-damaged gutters. Temporary stabilization first to prevent further damage, then permanent repair as soon as materials and scheduling allow." },
      { emoji: "📋", title: "Seasonal maintenance programs", desc: "Preventive maintenance twice a year keeps your gutters performing and extends their lifespan significantly. We clean, inspect, tighten, seal, and document the condition of your entire system." },
    ],
    stats: [
      { value: "Same Day", label: "Emergency response available" },
      { value: "500+", label: "Repairs completed annually" },
      { value: "1st", label: "Call. We fix it right" },
      { value: "30+", label: "Years diagnosing gutter issues" },
    ],
    goldEyebrow: "THE GOLD STANDARD",
    goldTitle: "Our Repair Process",
    goldSub: "Every home. Every time. No exceptions.",
    goldSteps: [
      { num: "01", title: "Assess", desc: "We diagnose the root cause, not just the visible symptom. A sagging gutter might mean a failed hanger, rotted fascia, or both. We find the real problem." },
      { num: "02", title: "Design", desc: "Clear explanation of what's wrong, what needs to happen, and what it costs. No vague figure-it-out-as-we-go. You approve the plan before we start." },
      { num: "03", title: "Install", desc: "Our crew performs the repair with the right materials and proper technique. We fix it to last, not to get us off the ladder faster." },
      { num: "04", title: "Protect", desc: "We test the repair with water flow, clean up, and give you maintenance tips to prevent recurrence. If the issue comes back, so do we." },
    ],
    reviewEyebrow: "REVIEWS",
    reviewTitle: "What Repair Customers Say",
    reviews: [
      { text: "Had two long pieces of aluminum gable fascia replaced due to recent hurricanes. Very small job and I was worried about anyone interested in a job that small at a reasonable price. JR One was very responsive to quote and do the work timely, all at a very fair price.", name: "Steven M.", service: "Small Repair Job", stars: 5 },
      { text: "What a great experience post Milton. Ben came over two days after the storm to assess the damage. Got me added to the schedule quickly. They fixed and added a new gutter. I couldn't be more pleased.", name: "Johnny C.", service: "Post-Hurricane Repair", stars: 5 },
      { text: "Great experience. Quick response with wonderful communication from Emily. The workers arrived with the proper equipment and materials. Very professional job.", name: "Rich B.", service: "Gutter Repair", stars: 5 },
    ],
    faqEyebrow: "FAQ",
    faqTitle: "Gutter Repair Questions",
    faqs: [
      { q: "How much does gutter repair cost?", a: "Most gutter repairs range from $150 to $500 depending on the type and extent of damage. Simple leak sealing or hanger replacement is on the lower end. Re-pitching an entire run, replacing sections, or addressing underlying fascia rot costs more. We provide an exact quote before any work begins." },
      { q: "Is it worth repairing old gutters or should I replace them?", a: "It depends on the overall condition. If your gutters are generally sound and the issue is localized (a few leaks, one sagging section), repair makes sense. If you're seeing widespread problems (multiple leaks, significant sagging, corrosion), replacement is usually more cost-effective long-term. We'll give you an honest assessment either way." },
      { q: "How quickly can you respond to storm damage?", a: "We prioritize storm damage calls and typically perform an initial assessment within 24 to 48 hours of your call. If immediate stabilization is needed to prevent further damage, we handle that first. Permanent repairs are scheduled as quickly as materials and crew availability allow." },
      { q: "Do you do small jobs?", a: "Yes. We don't turn away small repairs because they're not worth our time. A single leaking joint or one loose section still deserves professional attention. Some of our best reviews come from small jobs where other companies wouldn't even return the call." },
      { q: "How often should I have my gutters cleaned?", a: "In Tampa Bay, we recommend professional cleaning at least twice a year. Once before hurricane season (May/June) and once after fall leaf drop (November/December). Homes near pine trees or heavy tree coverage may need quarterly cleaning." },
      { q: "What does a maintenance program include?", a: "Our seasonal maintenance includes full gutter and downspout cleanout, leak inspection and sealing, hanger tightening, pitch verification, and a written condition report with photos. Think of it as a checkup that catches small problems before they become expensive ones." },
    ],
    ctaTitle: "GUTTERS ACTING UP?",
    ctaSub: "Get your free gutter inspection. We'll find the problem, explain it clearly, and give you a fair quote to fix it right.",
    formTitle: "Get Your Free Gutter Inspection",
    formName: "Full Name",
    formPhone: "Phone Number",
    formEmail: "Email Address",
    formZip: "ZIP Code",
    formBtn: "Request My Free Inspection",
    formDisclaimer: "No spam. No pressure.",
    formSuccess: "Inspection Request Received",
    formSuccessSub: "We'll get back to you within hours.",
    preferTalk: "Prefer to talk?",
  },
  es: {
    breadcrumb: ["Inicio", "Servicios", "Reparacion y Mantenimiento de Canaletas"],
    heroTag: "REPARACION Y MANTENIMIENTO",
    heroH1: "Filtrando, Combandose o Desbordandose?",
    heroH1Gold: "Lo Arreglamos Bien a la Primera.",
    heroP: "No deje que problemas pequenos de canaletas se conviertan en danos costosos para su hogar. Diagnosticamos el problema real, no solo el sintoma, y lo arreglamos para que no tenga que llamar de nuevo. Ademas, programas de mantenimiento estacional para prevenir problemas antes de que comiencen.",
    btnEstimate: "OBTENGA SU INSPECCION GRATIS",
    btnCall: "(844) 444-3114",
    problemTag: "POR QUE IMPORTA",
    problemTitle: "Problemas que se Vuelven Costosos Rapido",
    problems: [
      { title: "Costuras y uniones con filtraciones", desc: "Agua goteando entre secciones de canaleta, en esquinas o alrededor de conexiones de bajantes. Sin reparar, las filtraciones manchan su fascia, pudren la madera y erosionan el suelo de su fundacion." },
      { title: "Combandose y desprendiendose", desc: "Canaletas desprendiendose de la tabla de fascia debido a soportes fallidos, madera podrida o peso de escombros. Las canaletas combadas no drenan. Acumulan agua y eventualmente colapsan." },
      { title: "Desbordamiento durante la lluvia", desc: "Agua desbordandose por el borde delantero durante tormentas. Generalmente causado por obstrucciones, inclinacion incorrecta o canaletas de tamano insuficiente. El agua va exactamente donde las canaletas deberian evitar que vaya." },
      { title: "Bajantes danados o faltantes", desc: "Bajantes aplastados, desconectados o faltantes significan que el agua se descarga directamente en su fundacion en vez de ser dirigida lejos. Asi es como ocurren las grietas en la fundacion, inundaciones y erosion del suelo." },
    ],
    solutionTag: "EL OFICIO ESPECIALIZADO",
    solutionTitle: "Reparaciones que Realmente Duran",
    solutionSub: "Diagnosticamos la causa raiz y la arreglamos permanentemente. Sin soluciones temporales que fallan en la proxima temporada de tormentas.",
    solutions: [
      { emoji: "💧", title: "Reparacion y sellado de filtraciones", desc: "Localizamos cada punto de filtracion (costuras, tapas, esquinas, conexiones de bajantes) y los sellamos con sellador de grado profesional que se flexiona con los cambios de temperatura. Sin arreglos temporales que fallan en seis meses." },
      { emoji: "🔧", title: "Reemplazo y realineacion de soportes", desc: "Reemplazamos soportes de clavos y ferrulas fallidos con sistemas modernos de soportes ocultos, refijamos las canaletas a fascia solida y re-inclinamos para un flujo de agua adecuado. Sus canaletas quedan rectas y drenan completamente." },
      { emoji: "🛠️", title: "Reparacion y redireccion de bajantes", desc: "Reparamos o reemplazamos bajantes danados, agregamos extensiones para dirigir el agua lejos de su fundacion y redirigimos el drenaje cuando el diseno original no funciona." },
      { emoji: "🧹", title: "Limpieza de canaletas y remocion de escombros", desc: "Limpieza completa de hojas, agujas de pino, granulos de tejas y agua estancada. Lavamos cada bajante para confirmar flujo libre e inspeccionamos danos mientras estamos arriba." },
      { emoji: "⚠️", title: "Respuesta de emergencia por danos de tormenta", desc: "La temporada de huracanes de Tampa no espera y nosotros tampoco. Respondemos rapidamente a canaletas danadas por tormentas. Estabilizacion temporal primero para prevenir mas danos, luego reparacion permanente tan pronto como los materiales y la programacion lo permitan." },
      { emoji: "📋", title: "Programas de mantenimiento estacional", desc: "Mantenimiento preventivo dos veces al ano mantiene sus canaletas funcionando y extiende su vida util significativamente. Limpiamos, inspeccionamos, ajustamos, sellamos y documentamos la condicion de todo su sistema." },
    ],
    stats: [
      { value: "Mismo Dia", label: "Respuesta de emergencia" },
      { value: "500+", label: "Reparaciones anuales" },
      { value: "1ra", label: "Llamada. Lo arreglamos bien" },
      { value: "30+", label: "Anos diagnosticando problemas" },
    ],
    goldEyebrow: "EL ESTANDAR DE ORO",
    goldTitle: "Nuestro Proceso de Reparacion",
    goldSub: "Cada hogar. Cada vez. Sin excepciones.",
    goldSteps: [
      { num: "01", title: "Evaluar", desc: "Diagnosticamos la causa raiz, no solo el sintoma visible. Una canaleta combada puede significar un soporte fallido, fascia podrida o ambos. Encontramos el problema real." },
      { num: "02", title: "Disenar", desc: "Explicacion clara de que esta mal, que necesita hacerse y cuanto cuesta. Sin vagos lo iremos viendo. Usted aprueba el plan antes de que empecemos." },
      { num: "03", title: "Instalar", desc: "Nuestro equipo realiza la reparacion con los materiales correctos y la tecnica adecuada. Lo arreglamos para que dure, no para bajar de la escalera mas rapido." },
      { num: "04", title: "Proteger", desc: "Probamos la reparacion con flujo de agua, limpiamos y le damos consejos de mantenimiento para prevenir recurrencia. Si el problema regresa, nosotros tambien." },
    ],
    reviewEyebrow: "RESENAS",
    reviewTitle: "Lo Que Dicen los Clientes",
    reviews: [
      { text: "Reemplace dos piezas largas de fascia de aluminio debido a huracanes recientes. Un trabajo muy pequeno y me preocupaba que alguien estuviera interesado en un trabajo tan pequeno a un precio razonable. JR One fue muy receptivo para cotizar y hacer el trabajo a tiempo, todo a un precio muy justo.", name: "Steven M.", service: "Trabajo Pequeno", stars: 5 },
      { text: "Que gran experiencia despues de Milton. Ben vino dos dias despues de la tormenta para evaluar el dano. Me agrego al cronograma rapidamente. Arreglaron y agregaron una canaleta nueva. No podria estar mas satisfecho.", name: "Johnny C.", service: "Reparacion Post-Huracan", stars: 5 },
      { text: "Gran experiencia. Respuesta rapida con comunicacion maravillosa de Emily. Los trabajadores llegaron con el equipo y materiales adecuados. Un trabajo muy profesional.", name: "Rich B.", service: "Reparacion de Canaletas", stars: 5 },
    ],
    faqEyebrow: "PREGUNTAS",
    faqTitle: "Preguntas Sobre Reparacion",
    faqs: [
      { q: "Cuanto cuesta la reparacion de canaletas?", a: "La mayoria de las reparaciones de canaletas oscilan entre $150 y $500 dependiendo del tipo y extension del dano. El sellado simple de filtraciones o reemplazo de soportes esta en el extremo inferior. Re-inclinar un tramo completo, reemplazar secciones o reparar fascia podrida cuesta mas. Proporcionamos una cotizacion exacta antes de comenzar cualquier trabajo." },
      { q: "Vale la pena reparar canaletas viejas o debo reemplazarlas?", a: "Depende de la condicion general. Si sus canaletas estan en buen estado general y el problema es localizado (algunas filtraciones, una seccion combada), la reparacion tiene sentido. Si ve problemas generalizados (multiples filtraciones, combadura significativa, corrosion), el reemplazo generalmente es mas rentable a largo plazo." },
      { q: "Que tan rapido pueden responder a danos por tormenta?", a: "Priorizamos las llamadas por danos de tormenta y tipicamente realizamos una evaluacion inicial dentro de 24 a 48 horas de su llamada. Si se necesita estabilizacion inmediata para prevenir mas dano, lo manejamos primero. Las reparaciones permanentes se programan tan rapido como los materiales y disponibilidad del equipo lo permitan." },
      { q: "Hacen trabajos pequenos?", a: "Si. No rechazamos reparaciones pequenas porque no valen nuestro tiempo. Una sola union con filtracion o una seccion suelta aun merece atencion profesional. Algunas de nuestras mejores resenas vienen de trabajos pequenos donde otras empresas ni siquiera devolvieron la llamada." },
      { q: "Con que frecuencia debo limpiar mis canaletas?", a: "En Tampa Bay, recomendamos limpieza profesional al menos dos veces al ano. Una antes de la temporada de huracanes (mayo/junio) y otra despues de la caida de hojas en otono (noviembre/diciembre). Hogares cerca de pinos o con mucha cobertura de arboles pueden necesitar limpieza trimestral." },
      { q: "Que incluye un programa de mantenimiento?", a: "Nuestro mantenimiento estacional incluye limpieza completa de canaletas y bajantes, inspeccion y sellado de filtraciones, ajuste de soportes, verificacion de inclinacion y un informe escrito de condicion con fotos. Piense en ello como un chequeo que detecta problemas pequenos antes de que se vuelvan costosos." },
    ],
    ctaTitle: "PROBLEMAS CON SUS CANALETAS?",
    ctaSub: "Obtenga su inspeccion gratis. Encontraremos el problema, lo explicaremos claramente y le daremos una cotizacion justa.",
    formTitle: "Obtenga Su Inspeccion Gratis",
    formName: "Nombre Completo",
    formPhone: "Numero de Telefono",
    formEmail: "Correo Electronico",
    formZip: "Codigo Postal",
    formBtn: "Solicitar Mi Inspeccion Gratis",
    formDisclaimer: "Sin spam. Sin presion.",
    formSuccess: "Solicitud Recibida",
    formSuccessSub: "Le responderemos en pocas horas.",
    preferTalk: "Prefiere hablar?",
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

const ACCENT = "#EAB308";
const ACCENT_LIGHT = "#FACC15";

export default function GutterRepairPage() {
  const { lang } = useLanguage();
  const t = T[lang];
  const [formData, setFormData] = useState({ name: "", phone: "", email: "", zip: "" });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formLoading, setFormLoading] = useState(false);

  const handleForm = async (e) => {
    e?.preventDefault?.();
    if (!formData.name || !formData.phone) return;
    setFormLoading(true);
    try {
      const params = new URLSearchParams(window.location.search);
      const res = await fetch("/api/send-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone,
          email: formData.email,
          service: "Gutter Repair",
          zip: formData.zip,
          page: window.location.pathname,
          gclid: params.get("gclid") || "",
          utm_source: params.get("utm_source") || "",
          utm_medium: params.get("utm_medium") || "",
          utm_campaign: params.get("utm_campaign") || "",
          utm_term: params.get("utm_term") || "",
        }),
      });
      setFormSubmitted(true);
      void res;
    } catch {
      setFormSubmitted(true);
    } finally {
      setFormLoading(false);
    }
  };

  return (
    <div style={{ background: "var(--jr-navy)", color: "var(--jr-paper)", minHeight: "100vh" }}>
      <a href="#main" className="jr-skip-link">Skip to content</a>
      <SiteNav />

      <main id="main">
        <Container>
          <nav aria-label="Breadcrumb" style={{ paddingTop: "var(--jr-space-4)", fontFamily: "var(--jr-font-body)", fontSize: "var(--jr-text-sm)", color: "var(--jr-muted-on-dark)" }}>
            {t.breadcrumb.map((item, i) => (
              <span key={i}>
                {i > 0 && <span style={{ margin: "0 8px", opacity: 0.5 }}>/</span>}
                <span style={{ color: i === t.breadcrumb.length - 1 ? ACCENT : "var(--jr-muted-on-dark)" }}>{item}</span>
              </span>
            ))}
          </nav>
        </Container>

        <section className="jr-noise-bg jr-service-hero" style={{ position: "relative", padding: "var(--jr-space-16) var(--jr-space-6) var(--jr-space-20)", backgroundImage: "linear-gradient(165deg, rgba(11,22,51,0.84) 0%, rgba(17,32,67,0.88) 55%, rgba(22,42,80,0.92) 100%), url('/images/gutter-repair-hero-v2.webp')", backgroundSize: "cover", backgroundPosition: "center", overflow: "hidden" }}>
          <div aria-hidden style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, background: "radial-gradient(ellipse at 28% 22%, rgba(200,149,46,0.08) 0%, transparent 60%)", pointerEvents: "none" }} />
          <Container>
            <div style={{ position: "relative", zIndex: 1, maxWidth: "780px" }}>
              <div style={{ fontFamily: "var(--jr-font-heading)", fontSize: "var(--jr-text-xs)", fontWeight: 700, color: ACCENT, letterSpacing: "4px", marginBottom: "var(--jr-space-4)", textTransform: "uppercase" }}>{t.heroTag}</div>
              <h1 style={{ fontFamily: "var(--jr-font-heading)", fontSize: "var(--jr-text-4xl)", fontWeight: 800, lineHeight: 1.05, marginBottom: "var(--jr-space-6)", letterSpacing: "-0.5px" }}>
                {t.heroH1}<br /><span style={{ color: ACCENT }}>{t.heroH1Gold}</span>
              </h1>
              <p style={{ fontFamily: "var(--jr-font-body)", fontSize: "var(--jr-text-lg)", color: "var(--jr-cream-2)", lineHeight: 1.65, marginBottom: "var(--jr-space-8)", maxWidth: "640px" }}>{t.heroP}</p>
              <div style={{ display: "flex", gap: "var(--jr-space-4)", flexWrap: "wrap", marginBottom: "var(--jr-space-10)" }}>
                <Button href="#quote-form" variant="primary" size="lg" iconRight accent={ACCENT} accentLight={ACCENT_LIGHT}>{t.btnEstimate}</Button>
                <Button href="tel:8444443114" variant="outline" size="lg" iconLeft={<PhoneIcon size={18} />} accent={ACCENT}>{t.btnCall}</Button>
              </div>
              <div style={{ display: "flex", gap: "var(--jr-space-8)", flexWrap: "wrap" }}>
                {t.stats.map((s, i) => (
                  <div key={i}>
                    <div style={{ fontFamily: "var(--jr-font-heading)", fontSize: "var(--jr-text-2xl)", fontWeight: 800, color: ACCENT }}>{s.value}</div>
                    <div style={{ fontFamily: "var(--jr-font-body)", fontSize: "var(--jr-text-xs)", color: "var(--jr-muted-on-dark)", maxWidth: "120px", marginTop: "4px" }}>{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </Container>
        </section>

        <section style={{ background: "var(--jr-navy-deep)", padding: "var(--jr-space-20) 0" }}>
          <Container>
            <SectionHeading eyebrow={t.problemTag} title={t.problemTitle} theme="dark" accent={ACCENT} />
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "var(--jr-space-5)" }}>
              {t.problems.map((p, i) => (
                <article key={i} style={{ background: "var(--jr-navy)", border: "1px solid var(--jr-navy-3)", borderRadius: "var(--jr-radius-lg)", padding: "var(--jr-space-6)", borderLeft: `4px solid ${ACCENT}` }}>
                  <h3 style={{ fontFamily: "var(--jr-font-heading)", fontSize: "var(--jr-text-lg)", fontWeight: 700, color: "var(--jr-paper)", marginBottom: "var(--jr-space-2)" }}>{p.title}</h3>
                  <p style={{ fontFamily: "var(--jr-font-body)", fontSize: "var(--jr-text-md)", color: "var(--jr-muted-on-dark)", lineHeight: 1.6 }}>{p.desc}</p>
                </article>
              ))}
            </div>
          </Container>
        </section>

        <section style={{ background: "var(--jr-navy)", padding: "var(--jr-space-20) 0" }}>
          <Container>
            <SectionHeading eyebrow={t.solutionTag} title={t.solutionTitle} subtitle={t.solutionSub} theme="dark" accent={ACCENT} />
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "var(--jr-space-5)" }}>
              {t.solutions.map((s, i) => (
                <article key={i} className="jr-hover-lift" style={{ background: "var(--jr-navy-deep)", border: "1px solid var(--jr-navy-3)", borderRadius: "var(--jr-radius-lg)", padding: "var(--jr-space-6)", borderTop: `3px solid ${ACCENT}` }}>
                  <div style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 48, height: 48, background: `${ACCENT}1F`, borderRadius: "var(--jr-radius-md)", marginBottom: "var(--jr-space-3)" }}>
                    <span aria-hidden style={{ fontSize: 26, lineHeight: 1 }}>{s.emoji}</span>
                  </div>
                  <h3 style={{ fontFamily: "var(--jr-font-heading)", fontSize: "var(--jr-text-lg)", fontWeight: 700, color: "var(--jr-paper)", marginBottom: "var(--jr-space-3)" }}>{s.title}</h3>
                  <p style={{ fontFamily: "var(--jr-font-body)", fontSize: "var(--jr-text-md)", color: "var(--jr-muted-on-dark)", lineHeight: 1.6 }}>{s.desc}</p>
                </article>
              ))}
            </div>
          </Container>
        </section>

        <section style={{ background: "var(--jr-navy-deep)", padding: "var(--jr-space-20) 0" }}>
          <Container>
            <SectionHeading eyebrow={t.goldEyebrow} title={t.goldTitle} subtitle={t.goldSub} theme="dark" accent={ACCENT} />
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "var(--jr-space-5)" }}>
              {t.goldSteps.map((step) => <ProcessStep key={step.num} num={step.num} title={step.title} desc={step.desc} accent={ACCENT} />)}
            </div>
          </Container>
        </section>

        <section style={{ background: "var(--jr-navy)", padding: "var(--jr-space-20) 0" }}>
          <Container>
            <SectionHeading eyebrow={t.reviewEyebrow} title={t.reviewTitle} theme="dark" accent={ACCENT} />
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "var(--jr-space-5)" }}>
              {t.reviews.map((rev, i) => <ReviewCard key={i} {...rev} />)}
            </div>
          </Container>
        </section>

        <section style={{ background: "var(--jr-navy-deep)", padding: "var(--jr-space-20) 0" }}>
          <Container size="prose">
            <SectionHeading eyebrow={t.faqEyebrow} title={t.faqTitle} theme="dark" accent={ACCENT} />
            <FAQAccordion items={t.faqs} theme="dark" accent={ACCENT} />
          </Container>
        </section>

        <Peak301Alert />

        <section id="quote-form" style={{ background: "linear-gradient(165deg, var(--jr-navy), var(--jr-navy-2))", padding: "var(--jr-space-20) 0" }}>
          <Container size="narrow">
            <div style={{ textAlign: "center", marginBottom: "var(--jr-space-10)" }}>
              <h2 style={{ fontFamily: "var(--jr-font-heading)", fontSize: "var(--jr-text-3xl)", fontWeight: 800, color: "var(--jr-paper)", marginBottom: "var(--jr-space-3)", letterSpacing: "1px" }}>{t.ctaTitle}</h2>
              <p style={{ fontFamily: "var(--jr-font-body)", fontSize: "var(--jr-text-lg)", color: "var(--jr-cream-2)", lineHeight: 1.6 }}>{t.ctaSub}</p>
            </div>
            <div style={{ maxWidth: "560px", margin: "0 auto" }}>
              {formSubmitted ? (
                <div style={{ background: "var(--jr-success-soft)", border: "1px solid var(--jr-success)", borderRadius: "var(--jr-radius-xl)", padding: "var(--jr-space-8)", textAlign: "center" }}>
                  <div style={{ display: "inline-flex", color: "var(--jr-success)", marginBottom: "var(--jr-space-3)" }}><CheckCircleIcon size={48} /></div>
                  <h3 style={{ fontFamily: "var(--jr-font-heading)", fontSize: "var(--jr-text-xl)", fontWeight: 700, color: "var(--jr-paper)", marginBottom: "var(--jr-space-2)" }}>{t.formSuccess}</h3>
                  <p style={{ fontFamily: "var(--jr-font-body)", fontSize: "var(--jr-text-md)", color: "var(--jr-muted-on-dark)" }}>{t.formSuccessSub}</p>
                </div>
              ) : (
                <form onSubmit={handleForm} style={{ background: "var(--jr-paper)", borderRadius: "var(--jr-radius-xl)", padding: "var(--jr-space-8) var(--jr-space-6)", boxShadow: "var(--jr-shadow-form)" }}>
                  <h3 style={{ fontFamily: "var(--jr-font-heading)", fontSize: "var(--jr-text-xl)", fontWeight: 700, color: "var(--jr-navy)", textAlign: "center", marginBottom: "var(--jr-space-1)" }}>{t.formTitle}</h3>
                  <div aria-hidden style={{ width: 40, height: 3, background: ACCENT, borderRadius: 2, margin: "10px auto var(--jr-space-5)" }} />
                  <input aria-label={t.formName} style={inputStyle} placeholder={t.formName} value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required />
                  <input aria-label={t.formPhone} style={inputStyle} placeholder={t.formPhone} type="tel" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} required />
                  <input aria-label={t.formEmail} style={inputStyle} placeholder={t.formEmail} type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
                  <input aria-label={t.formZip} style={inputStyle} placeholder={t.formZip} value={formData.zip} onChange={(e) => setFormData({ ...formData, zip: e.target.value })} maxLength={5} />
                  <Button type="submit" variant="primary" size="md" fullWidth iconRight disabled={formLoading} accent={ACCENT} accentLight={ACCENT_LIGHT}>{formLoading ? "Sending..." : t.formBtn}</Button>
                  <p style={{ fontFamily: "var(--jr-font-body)", fontSize: "var(--jr-text-xs)", color: "var(--jr-muted-on-light)", textAlign: "center", marginTop: "var(--jr-space-3)" }}>{t.formDisclaimer}</p>
                </form>
              )}
              <div style={{ marginTop: "var(--jr-space-8)", textAlign: "center" }}>
                <p style={{ fontFamily: "var(--jr-font-body)", fontSize: "var(--jr-text-md)", color: "var(--jr-muted-on-dark)", marginBottom: "var(--jr-space-2)" }}>{t.preferTalk}</p>
                <a href="tel:8444443114" style={{ display: "inline-flex", alignItems: "center", gap: 8, fontFamily: "var(--jr-font-heading)", fontSize: "var(--jr-text-lg)", fontWeight: 700, color: ACCENT, textDecoration: "none" }}>
                  <PhoneIcon size={18} /> (844) 444-3114
                </a>
              </div>
            </div>
          </Container>
        </section>

        <CTABand
          title={lang === "en" ? "Storm Damage? Leak? We Respond Fast." : "Dano por Tormenta? Filtracion? Respondemos Rapido."}
          sub={lang === "en" ? "Get a free inspection today. We respond within hours." : "Obtenga una inspeccion gratis hoy. Respondemos en horas."}
          primaryLabel={lang === "en" ? "Request a Quote" : "Solicitar Cotizacion"}
          primaryHref="#quote-form"
          accent={ACCENT}
          accentLight={ACCENT_LIGHT}
        />
      </main>
      <ServiceAreaList
        service="gutter-repair"
        serviceLabel={lang === "es" ? "Reparacion de Canaletas" : "Gutter Repair"}
        lang={lang}
      />


      <SiteFooter />
      <MobileCTA scrollTarget="quote-form" />
    </div>
  );
}
