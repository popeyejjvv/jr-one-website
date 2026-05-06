"use client";

/* ═══════════════════════════════════════════════════════════
   JR ONE ALUMINUM / GUTTER CLEANING SERVICE PAGE
   Brand-brain compliant. Design-elevated.
   ═══════════════════════════════════════════════════════════ */

import { useState } from "react";
import { useLanguage } from "../../lib/LanguageContext";
import SiteNav from "../../components/SiteNav";
import SiteFooter from "../../components/SiteFooter";
import MobileCTA from "../../components/MobileCTA";
import Container from "../../components/ui/Container";
import Button from "../../components/ui/Button";
import SectionHeading from "../../components/ui/SectionHeading";
import CTABand from "../../components/ui/CTABand";
import ProcessStep from "../../components/ui/ProcessStep";
import ReviewCard from "../../components/ui/ReviewCard";
import FAQAccordion from "../../components/ui/FAQAccordion";
import Peak301Alert from "../../components/ui/Peak301Alert";
import { CheckCircleIcon, PhoneIcon, ClockIcon } from "../../lib/icons";

const T = {
  en: {
    breadcrumb: ["Home", "Services", "Gutter Cleaning"],
    heroTag: "GUTTER CLEANING & MAINTENANCE",
    heroH1: "Clean Gutters.",
    heroH1Gold: "Inspected, Photographed, Documented.",
    heroP: "Most cleaners scoop debris and leave. We remove every bit of debris, flush every downspout, inspect every hanger, photograph any issues we find, and haul the waste off your property. Typical single-family home: $150 to $400, priced honestly on linear footage and roof access.",
    btnEstimate: "BOOK YOUR CLEANING",
    btnCall: "(844) 444-3114",
    problemTag: "WHY TAMPA GUTTERS NEED IT MORE",
    problemTitle: "Florida's Trees Never Stop Dropping",
    problems: [
      { title: "Live oaks shed every month", desc: "Tampa's live oak canopy drops leaves 12 months a year, not just fall. Most homeowners underestimate how much debris their gutters see between cleanings. By month 6 without a cleaning, you've got standing water." },
      { title: "Pine needles pack tight", desc: "Pine needles are the worst enemy of a gutter. They wedge into the channel, pack against the downspout, and block water flow completely. Homes with pines need more frequent cleaning than other Tampa properties." },
      { title: "Every storm dumps new debris", desc: "Tampa's afternoon summer storms and named hurricanes load gutters with fresh debris in a single event. A gutter cleaned in May can be clogged again after one August thunderstorm." },
      { title: "Skipped cleanings cost thousands", desc: "Skip two cleanings and overflow saturates the fascia behind the gutter. That $180 cleaning you avoided becomes a $4,000 fascia-and-soffit rebuild 18 months later. The math never favors skipping." },
    ],
    solutionTag: "THE JR ONE WAY",
    solutionTitle: "What a Real Gutter Cleaning Looks Like",
    solutionSub: "Aluminum-trade eyes on your system while we clean. You get the cleaning plus a free diagnostic of anything that needs attention.",
    solutions: [
      { emoji: "🧹", title: "Full debris removal, not just the easy stuff", desc: "Every gutter run hand-cleared or vacuum-extracted end-to-end. Roof valleys and corners included. No ignoring the hard-to-reach sections because they're inconvenient." },
      { emoji: "💧", title: "Downspout flush on every downspout", desc: "Every downspout gets flushed with water to confirm clear flow. Partial clogs buried in the downspout (the #1 cause of overflow after a cleaning) get cleared or flagged for further work." },
      { emoji: "🔧", title: "Hanger, pitch and sealant inspection", desc: "While we're up there, we check hanger tightness, gutter pitch, and sealant condition at miters and corners. Issues get photographed and reported before they turn into expensive repairs." },
      { emoji: "📋", title: "Photo documentation of any issues", desc: "If we find rotted fascia, failing sealant, sagging hangers, or drainage problems, you get photos and a written summary. Not a vague you-might-want-to-fix-some-stuff conversation." },
      { emoji: "🛠️", title: "Bagged and hauled away", desc: "All debris bagged and removed from the property. You don't come home to piles of leaves or buckets of muck on the driveway. Clean job, clean exit." },
      { emoji: "👷", title: "Aluminum-trade eyes, not a general handyman", desc: "JR One is family-owned with over 30 years in the aluminum trade. We see things generalist cleaners miss, and we can quote any repair on the spot because we're the contractor who'd do the fix anyway." },
    ],
    stats: [
      { value: "$150-$400", label: "Typical single-family range" },
      { value: "30+", label: "Years of Tampa Bay experience" },
      { value: "100%", label: "Debris hauled away" },
      { value: "100%", label: "Photo documentation" },
    ],
    scopeEyebrow: "SERVICE OPTIONS",
    scopeTitle: "Choose the Right Cleaning",
    scopeSub: "Full-service, basic tune-up, guard-package, or targeted downspout service. Your system, your call.",
    scopeItems: [
      { emoji: "⭐", title: "Full-Service Cleaning", desc: "Full debris removal, downspout flush, hanger and sealant inspection, photo documentation, and debris haul-away. The recommended default for most Tampa homes." },
      { emoji: "🧹", title: "Basic Tune-Up", desc: "Inspection and spot cleaning for gutters in reasonable condition or on a regular recurring schedule. Lower cost for systems that aren't heavily soiled." },
      { emoji: "🛡️", title: "Deluxe Guard Package", desc: "When you're adding gutter guards, we clean first so the guards install over a clean system. Bundled pricing vs. two separate visits." },
      { emoji: "💧", title: "Downspout Clean-Out", desc: "Targeted fix for a single clogged downspout. Common symptom: gutter fills and overflows at one spot even after a general cleaning." },
      { emoji: "⏱", title: "Recurring Schedule", desc: "Semi-annual, quarterly, or post-storm recurring cleaning. Priced below one-off cleanings and priority-slotted during storm seasons." },
      { emoji: "🏠", title: "Commercial & HOA", desc: "Apartment complexes, retail, HOA-managed communities, and commercial buildings. Priced and scheduled separately. See the commercial and HOA pages for contract structure." },
    ],
    timingTitle: "Pre-summer (May) and post-hurricane (November) is the sweet spot.",
    timingDesc: "Heavy tree cover: 3 to 4 times per year. Moderate: 2 times per year (spring + fall). Homes with guards: every 2 to 3 years. After every named storm, regardless of the schedule, hurricane debris is its own event.",
    timingLabel: "WHEN TO CLEAN",
    timingBtn: "Call (844) 444-3114",
    goldEyebrow: "THE GOLD STANDARD",
    goldTitle: "Our Gutter Cleaning Process",
    goldSub: "Every house. Every visit. Cleaned right, documented, hauled away.",
    goldSteps: [
      { num: "01", title: "Assess", desc: "Walk the roofline, note access and linear footage, and confirm scope. Transparent estimate before any ladder goes up." },
      { num: "02", title: "Clear", desc: "Hand-clear or vacuum-extract debris from every gutter run. Roof valleys and corners included." },
      { num: "03", title: "Flush & Inspect", desc: "Flush every downspout with water to confirm flow. Inspect hangers, pitch, and sealant. Photograph any issues." },
      { num: "04", title: "Report & Haul", desc: "Written summary and photos of any issues found, plus bagged debris hauled off your property. Done and gone." },
    ],
    reviewEyebrow: "REVIEWS",
    reviewTitle: "What Cleaning Customers Say",
    reviews: [
      { text: "I've had three different companies clean my gutters. JR One was the first one that actually flushed the downspouts and showed me photos of a rusted hanger I didn't know about.", name: "Arif K.", service: "Full-Service Cleaning", stars: 5 },
      { text: "They came out the week after a storm, cleared everything, bagged it, and were gone in 90 minutes. No mess in the yard, no surprise charges, no upsell pressure.", name: "David K.", service: "Post-Storm Cleaning", stars: 5 },
      { text: "We have pine trees on three sides of the house. JR One keeps us on a quarterly schedule and my gutters finally don't overflow anymore.", name: "Lois G.", service: "Quarterly Recurring", stars: 5 },
    ],
    faqEyebrow: "FAQ",
    faqTitle: "Gutter Cleaning Questions",
    faqs: [
      { q: "How much does gutter cleaning cost in Tampa?", a: "Typical single-family homes run $150 to $400 depending on roof height, linear footage of gutter, debris level, and access. Two-story homes with complex rooflines run higher. Smaller one-story homes with straightforward access run lower. Exact pricing after a quick look. No generic rate quoted sight-unseen." },
      { q: "How often should I clean my gutters in Tampa?", a: "Heavy tree coverage (live oaks, pines, magnolias nearby): 3 to 4 cleanings per year. Moderate cover: twice a year. Pre-summer (May) and post-hurricane (November). Homes with gutter guards: every 2 to 3 years. Open-lot homes with no trees: once a year minimum. Add a cleaning after any named storm regardless of the cycle." },
      { q: "Do you haul away the debris?", a: "Yes. All debris is bagged and removed from your property. You don't deal with piles of leaves or buckets of muck after we leave. Clean job, clean exit." },
      { q: "What's the difference between your cleaning and a handyman?", a: "Most general handymen scoop what they can see and leave. We clear every run end-to-end, flush every downspout, inspect hangers and sealant, photograph issues, and haul the waste. Plus we're an aluminum specialty trade contractor. We can quote any repair we find on the spot instead of telling you to call someone else." },
      { q: "Can you clean gutters on a two- or three-story home?", a: "Yes. JR One is equipped for multi-story residential and commercial. Our crews have the ladders, equipment, and training for high-access work homeowners shouldn't try from a ladder." },
      { q: "Do you service rental properties and absentee owners?", a: "Yes. See our rental property maintenance page for recurring service plans built around absentee owners. Scheduled visits, tenant coordination, and photo reports after every cleaning." },
      { q: "Do you offer emergency or post-storm cleaning?", a: "Yes. After named storms we prioritize existing customers and contracted properties, with same-week or next-day availability depending on demand. Call us and we'll get you in as fast as the schedule allows." },
    ],
    ctaTitle: "READY TO BOOK A CLEANING?",
    ctaSub: "Tell us your address and a rough gutter length if you know it. We'll get you a same-day estimate. No pressure, no upsell.",
    formTitle: "Book a Gutter Cleaning",
    formName: "Full Name",
    formPhone: "Phone Number",
    formEmail: "Email Address",
    formZip: "Property ZIP Code",
    formBtn: "Book My Cleaning",
    formDisclaimer: "No spam. No pressure. Same-day estimate.",
    formSuccess: "Cleaning Request Received",
    formSuccessSub: "We'll get back to you within hours.",
    preferTalk: "Prefer to talk?",
  },
  es: {
    breadcrumb: ["Inicio", "Servicios", "Limpieza de Canaletas"],
    heroTag: "LIMPIEZA Y MANTENIMIENTO",
    heroH1: "Canaletas Limpias.",
    heroH1Gold: "Inspeccionadas, Fotografiadas, Documentadas.",
    heroP: "La mayoria de limpiadores sacan escombros y se van. Nosotros removemos cada pedazo, lavamos cada bajante, inspeccionamos cada soporte, fotografiamos cualquier problema y nos llevamos los desechos. Casa unifamiliar tipica: $150 a $400, con precio honesto segun pies lineales y acceso al techo.",
    btnEstimate: "RESERVE SU LIMPIEZA",
    btnCall: "(844) 444-3114",
    problemTag: "POR QUE NECESITAN MAS",
    problemTitle: "Los Arboles de Florida Nunca Paran",
    problems: [
      { title: "Los robles tiran cada mes", desc: "El roble vivo de Tampa tira hojas los 12 meses, no solo en otono. La mayoria de duenos subestima cuanto escombro ven sus canaletas entre limpiezas. A los 6 meses sin limpieza ya hay agua estancada." },
      { title: "Las agujas de pino se compactan", desc: "Las agujas de pino son el peor enemigo. Se encajan en el canal, se compactan contra el bajante y bloquean el flujo completamente. Las casas con pinos necesitan limpieza mas frecuente." },
      { title: "Cada tormenta descarga escombro nuevo", desc: "Las tormentas de verano y los huracanes cargan canaletas con escombros frescos en un solo evento. Una canaleta limpiada en mayo puede estar tapada despues de una sola tormenta de agosto." },
      { title: "Limpiezas saltadas cuestan miles", desc: "Salte dos limpiezas y el desbordamiento satura la fascia detras de la canaleta. Esa limpieza de $180 que evito se vuelve una reconstruccion de $4,000 18 meses despues." },
    ],
    solutionTag: "EL OFICIO ESPECIALIZADO",
    solutionTitle: "Como se Ve una Limpieza Real",
    solutionSub: "Ojos del oficio de aluminio en su sistema. Limpieza mas diagnostico gratis de cualquier cosa que necesite atencion.",
    solutions: [
      { emoji: "🧹", title: "Remocion completa de escombros", desc: "Cada tramo aclarado a mano o extraido con aspiradora de extremo a extremo. Valles y esquinas incluidos. Sin ignorar las secciones dificiles." },
      { emoji: "💧", title: "Lavado de cada bajante", desc: "Cada bajante se lava con agua para confirmar flujo. Bloqueos parciales en el bajante (causa #1 de desbordamiento despues de una limpieza) se aclaran o se marcan." },
      { emoji: "🔧", title: "Inspeccion de soportes, pendiente y sellador", desc: "Mientras estamos arriba, chequeamos apriete de soportes, pendiente de canaleta y sellador en esquinas. Problemas se fotografian y se reportan." },
      { emoji: "📋", title: "Documentacion fotografica de problemas", desc: "Si encontramos fascia podrida, sellador fallando, soportes caidos o problemas de drenaje, recibe fotos y resumen escrito. No una conversacion vaga." },
      { emoji: "🛠️", title: "Embolsado y llevado", desc: "Todo el escombro embolsado y removido de la propiedad. No llega a casa a montones de hojas o cubetas de mugre en la entrada." },
      { emoji: "👷", title: "Ojos del oficio, no handyman generalista", desc: "JR One es empresa familiar con mas de 30 anos en el oficio del aluminio. Vemos cosas que los generalistas se pierden, y podemos cotizar cualquier reparacion en el momento." },
    ],
    stats: [
      { value: "$150-$400", label: "Rango tipico unifamiliar" },
      { value: "30+", label: "Anos en Tampa Bay" },
      { value: "100%", label: "Escombro llevado" },
      { value: "100%", label: "Documentacion fotografica" },
    ],
    scopeEyebrow: "OPCIONES DE SERVICIO",
    scopeTitle: "Elija la Limpieza Correcta",
    scopeSub: "Servicio completo, basica, paquete con protector o servicio de bajante. Su sistema, su decision.",
    scopeItems: [
      { emoji: "⭐", title: "Limpieza Completa", desc: "Remocion completa, lavado de bajantes, inspeccion de soportes y sellador, documentacion fotografica y llevado de escombros. Por defecto recomendado para la mayoria de casas." },
      { emoji: "🧹", title: "Ajuste Basico", desc: "Inspeccion y limpieza puntual para canaletas en condicion razonable o en horario recurrente. Menor costo para sistemas no muy sucios." },
      { emoji: "🛡️", title: "Paquete Deluxe con Protectores", desc: "Cuando agrega protectores, limpiamos primero para que se instalen sobre un sistema limpio. Precio combinado vs. dos visitas separadas." },
      { emoji: "💧", title: "Limpieza de Bajante", desc: "Arreglo dirigido para un bajante obstruido. Sintoma comun: canaleta se llena y desborda en un punto aun despues de limpieza general." },
      { emoji: "⏱", title: "Horario Recurrente", desc: "Limpieza semestral, trimestral o post-tormenta. Con precio por debajo de limpiezas unicas y espacio prioritario en temporada de tormentas." },
      { emoji: "🏠", title: "Comercial y HOA", desc: "Complejos, retail, comunidades HOA y edificios comerciales. Cotizados y programados separadamente. Vea paginas comercial y HOA." },
    ],
    timingTitle: "Pre-verano (mayo) y post-huracan (noviembre) es el momento ideal.",
    timingDesc: "Mucha cobertura de arboles: 3 a 4 veces al ano. Moderada: 2 veces al ano. Casas con protectores: cada 2 a 3 anos. Despues de cada tormenta, sin importar el horario, los escombros de huracan son un evento propio.",
    timingLabel: "CUANDO LIMPIAR",
    timingBtn: "Llamar (844) 444-3114",
    goldEyebrow: "EL ESTANDAR DE ORO",
    goldTitle: "Nuestro Proceso de Limpieza",
    goldSub: "Cada casa. Cada visita. Limpiada, documentada, llevada.",
    goldSteps: [
      { num: "01", title: "Evaluar", desc: "Caminamos la linea del techo, anotamos acceso y pies lineales, confirmamos alcance. Estimado transparente antes de subir." },
      { num: "02", title: "Limpiar", desc: "Aclaramos a mano o extraemos con aspiradora cada tramo. Valles y esquinas incluidos." },
      { num: "03", title: "Lavar e Inspeccionar", desc: "Lavamos cada bajante con agua para confirmar flujo. Inspeccionamos soportes, pendiente y sellador. Fotografiamos problemas." },
      { num: "04", title: "Reportar y Llevar", desc: "Resumen escrito y fotos de problemas, mas escombros embolsados llevados de la propiedad. Terminado." },
    ],
    reviewEyebrow: "RESENAS",
    reviewTitle: "Lo Que Dicen los Clientes",
    reviews: [
      { text: "He tenido tres companias diferentes limpiando mis canaletas. JR One fue la primera que realmente lavo los bajantes y me mostro fotos de un soporte oxidado que no sabia que tenia.", name: "Arif K.", service: "Limpieza Completa", stars: 5 },
      { text: "Vinieron la semana despues de una tormenta, limpiaron todo, embolsaron y se fueron en 90 minutos. Sin desorden en el patio, sin cargos sorpresa.", name: "David K.", service: "Limpieza Post-Tormenta", stars: 5 },
      { text: "Tenemos pinos en tres lados de la casa. JR One nos mantiene en horario trimestral y mis canaletas finalmente ya no se desbordan.", name: "Lois G.", service: "Recurrente Trimestral", stars: 5 },
    ],
    faqEyebrow: "PREGUNTAS",
    faqTitle: "Preguntas Sobre Limpieza",
    faqs: [
      { q: "Cuanto cuesta la limpieza de canaletas en Tampa?", a: "Casas unifamiliares tipicas corren $150 a $400 dependiendo de altura del techo, pies lineales, nivel de escombro y acceso. Casas de dos pisos con techos complejos corren mas alto. Precio exacto despues de un vistazo rapido." },
      { q: "Con que frecuencia debo limpiar mis canaletas?", a: "Mucha cobertura de arboles: 3 a 4 limpiezas al ano. Cobertura moderada: dos veces al ano. Pre-verano (mayo) y post-huracan (noviembre). Casas con protectores: cada 2 a 3 anos. Casas de lote abierto sin arboles: una vez al ano minimo." },
      { q: "Llevan los escombros?", a: "Si. Todo el escombro se embolsa y se remueve de su propiedad. No llega a casa a montones de hojas." },
      { q: "Cual es la diferencia entre su limpieza y un handyman?", a: "La mayoria de handymen generales sacan lo que pueden ver y se van. Nosotros aclaramos cada tramo de extremo a extremo, lavamos cada bajante, inspeccionamos soportes y sellador, fotografiamos problemas y llevamos los desechos. Ademas somos contratista del oficio especializado de aluminio." },
      { q: "Pueden limpiar canaletas en casa de dos o tres pisos?", a: "Si. JR One esta equipado para multi-piso residencial y comercial. Nuestros equipos tienen escaleras, equipo y entrenamiento para trabajo de alto acceso." },
      { q: "Dan servicio a propiedades de alquiler?", a: "Si. Vea nuestra pagina de mantenimiento de alquileres para planes recurrentes construidos para duenos ausentes." },
      { q: "Ofrecen limpieza de emergencia o post-tormenta?", a: "Si. Despues de tormentas priorizamos clientes existentes y propiedades con contrato, con disponibilidad mismo dia o siguiente dia segun demanda." },
    ],
    ctaTitle: "LISTO PARA RESERVAR?",
    ctaSub: "Cuentenos su direccion y largo aproximado de canaleta si lo sabe. Le daremos estimado mismo dia. Sin presion, sin sobreventa.",
    formTitle: "Reserve Limpieza",
    formName: "Nombre Completo",
    formPhone: "Numero de Telefono",
    formEmail: "Correo Electronico",
    formZip: "Codigo Postal",
    formBtn: "Reservar Mi Limpieza",
    formDisclaimer: "Sin spam. Sin presion. Estimado mismo dia.",
    formSuccess: "Solicitud Recibida",
    formSuccessSub: "Le responderemos en pocas horas.",
    preferTalk: "Prefiere hablar?",
  },
};

const inputStyle = {
  width: "100%", padding: "13px 16px", fontFamily: "var(--jr-font-body)", fontSize: "15px",
  border: "1.5px solid #D1D5DB", borderRadius: "var(--jr-radius-md)", outline: "none",
  color: "var(--jr-ink)", background: "#FAFAFA", marginBottom: "12px",
  transition: "border-color var(--jr-dur-fast) var(--jr-ease-out)",
};

const ACCENT = "#2D8B4E";
const ACCENT_LIGHT = "#4ADE80";

export default function GutterCleaningPage() {
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
          name: formData.name, phone: formData.phone, email: formData.email,
          service: "Gutter Cleaning", zip: formData.zip,
          page: window.location.pathname,
          gclid: params.get("gclid") || "",
          utm_source: params.get("utm_source") || "",
          utm_medium: params.get("utm_medium") || "",
          utm_campaign: params.get("utm_campaign") || "",
          utm_term: params.get("utm_term") || "",
        }),
      });
      setFormSubmitted(true); void res;
    } catch { setFormSubmitted(true); } finally { setFormLoading(false); }
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

        <section className="jr-noise-bg" style={{ position: "relative", padding: "var(--jr-space-16) var(--jr-space-6) var(--jr-space-20)", background: "linear-gradient(165deg, var(--jr-navy-deep) 0%, var(--jr-navy) 55%, var(--jr-navy-2) 100%)", overflow: "hidden" }}>
          <div aria-hidden style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, background: "radial-gradient(ellipse at 28% 22%, rgba(200,149,46,0.08) 0%, transparent 60%)", pointerEvents: "none" }} />
          <Container>
            <div style={{ position: "relative", zIndex: 1, maxWidth: "780px" }}>
              <div style={{ fontFamily: "var(--jr-font-heading)", fontSize: "var(--jr-text-xs)", fontWeight: 700, color: ACCENT, letterSpacing: "4px", marginBottom: "var(--jr-space-4)", textTransform: "uppercase" }}>{t.heroTag}</div>
              <h1 style={{ fontFamily: "var(--jr-font-heading)", fontSize: "var(--jr-text-4xl)", fontWeight: 800, lineHeight: 1.05, marginBottom: "var(--jr-space-6)", letterSpacing: "-0.5px" }}>{t.heroH1}<br /><span style={{ color: ACCENT }}>{t.heroH1Gold}</span></h1>
              <p style={{ fontFamily: "var(--jr-font-body)", fontSize: "var(--jr-text-lg)", color: "var(--jr-cream-2)", lineHeight: 1.65, marginBottom: "var(--jr-space-8)", maxWidth: "640px" }}>{t.heroP}</p>
              <div style={{ display: "flex", gap: "var(--jr-space-4)", flexWrap: "wrap", marginBottom: "var(--jr-space-10)" }}>
                <Button href="#quote-form" variant="primary" size="lg" iconRight>{t.btnEstimate}</Button>
                <Button href="tel:8444443114" variant="outline" size="lg" iconLeft={<PhoneIcon size={18} />}>{t.btnCall}</Button>
              </div>
              <div style={{ display: "flex", gap: "var(--jr-space-8)", flexWrap: "wrap" }}>
                {t.stats.map((s, i) => (
                  <div key={i}>
                    <div style={{ fontFamily: "var(--jr-font-heading)", fontSize: "var(--jr-text-2xl)", fontWeight: 800, color: ACCENT }}>{s.value}</div>
                    <div style={{ fontFamily: "var(--jr-font-body)", fontSize: "var(--jr-text-xs)", color: "var(--jr-muted-on-dark)", maxWidth: "140px", marginTop: "4px" }}>{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </Container>
        </section>

        <section style={{ background: "var(--jr-navy-deep)", padding: "var(--jr-space-20) 0" }}>
          <Container>
            <SectionHeading eyebrow={t.problemTag} title={t.problemTitle} theme="dark" />
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
            <SectionHeading eyebrow={t.solutionTag} title={t.solutionTitle} subtitle={t.solutionSub} theme="dark" />
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
            <SectionHeading eyebrow={t.scopeEyebrow} title={t.scopeTitle} subtitle={t.scopeSub} theme="dark" />
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "var(--jr-space-5)" }}>
              {t.scopeItems.map((g, i) => (
                <article key={i} className="jr-hover-lift" style={{ background: "var(--jr-navy)", border: "1px solid var(--jr-navy-3)", borderRadius: "var(--jr-radius-lg)", padding: "var(--jr-space-6)", borderTop: `4px solid ${ACCENT}` }}>
                  <div style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 48, height: 48, background: `${ACCENT}1F`, borderRadius: "var(--jr-radius-md)", marginBottom: "var(--jr-space-3)" }}>
                    <span aria-hidden style={{ fontSize: 26, lineHeight: 1 }}>{g.emoji}</span>
                  </div>
                  <h3 style={{ fontFamily: "var(--jr-font-heading)", fontSize: "var(--jr-text-lg)", fontWeight: 700, color: "var(--jr-paper)", marginBottom: "var(--jr-space-3)" }}>{g.title}</h3>
                  <p style={{ fontFamily: "var(--jr-font-body)", fontSize: "var(--jr-text-md)", color: "var(--jr-muted-on-dark)", lineHeight: 1.6 }}>{g.desc}</p>
                </article>
              ))}
            </div>
          </Container>
        </section>

        {/* When-to-clean callout */}
        <section style={{ background: `linear-gradient(135deg, ${ACCENT}1F, var(--jr-navy-deep))`, padding: "var(--jr-space-8) var(--jr-space-6)", borderTop: `2px solid ${ACCENT}`, borderBottom: `2px solid ${ACCENT}` }}>
          <Container>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "var(--jr-space-5)" }}>
              <div style={{ flex: "1 1 500px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "var(--jr-space-2)", marginBottom: "var(--jr-space-2)", color: ACCENT }}>
                  <ClockIcon size={16} />
                  <span style={{ fontFamily: "var(--jr-font-heading)", fontSize: "var(--jr-text-xs)", fontWeight: 700, letterSpacing: "2px" }}>{t.timingLabel}</span>
                </div>
                <p style={{ fontFamily: "var(--jr-font-heading)", fontSize: "var(--jr-text-xl)", fontWeight: 800, color: "var(--jr-paper)", lineHeight: 1.3, marginBottom: "var(--jr-space-2)" }}>{t.timingTitle}</p>
                <p style={{ fontFamily: "var(--jr-font-body)", fontSize: "var(--jr-text-md)", color: "var(--jr-muted-on-dark)", lineHeight: 1.5 }}>{t.timingDesc}</p>
              </div>
              <Button href="tel:8444443114" variant="primary" size="md" iconLeft={<PhoneIcon size={16} />}>{t.timingBtn}</Button>
            </div>
          </Container>
        </section>

        <section style={{ background: "var(--jr-navy)", padding: "var(--jr-space-20) 0" }}>
          <Container>
            <SectionHeading eyebrow={t.goldEyebrow} title={t.goldTitle} subtitle={t.goldSub} theme="dark" />
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "var(--jr-space-5)" }}>
              {t.goldSteps.map((step) => <ProcessStep key={step.num} num={step.num} title={step.title} desc={step.desc} />)}
            </div>
          </Container>
        </section>

        <section style={{ background: "var(--jr-navy-deep)", padding: "var(--jr-space-20) 0" }}>
          <Container>
            <SectionHeading eyebrow={t.reviewEyebrow} title={t.reviewTitle} theme="dark" />
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "var(--jr-space-5)" }}>
              {t.reviews.map((rev, i) => <ReviewCard key={i} {...rev} />)}
            </div>
          </Container>
        </section>

        <section style={{ background: "var(--jr-navy)", padding: "var(--jr-space-20) 0" }}>
          <Container size="prose">
            <SectionHeading eyebrow={t.faqEyebrow} title={t.faqTitle} theme="dark" />
            <FAQAccordion items={t.faqs} theme="dark" />
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
                  <Button type="submit" variant="primary" size="md" fullWidth iconRight disabled={formLoading}>{formLoading ? "Sending..." : t.formBtn}</Button>
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
          title={lang === "en" ? "Get a Same-Day Cleaning Estimate" : "Obtenga un Estimado el Mismo Dia"}
          sub={lang === "en" ? "No upsell, no pressure. Just a clean job and a clean exit." : "Sin sobreventa, sin presion. Solo un trabajo limpio."}
          primaryLabel={lang === "en" ? "Book a Cleaning" : "Reservar Limpieza"}
          primaryHref="#quote-form"
        />
      </main>

      <SiteFooter />
      <MobileCTA scrollTarget="quote-form" />
    </div>
  );
}
