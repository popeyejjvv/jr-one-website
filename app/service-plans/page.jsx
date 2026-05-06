"use client";

/* ═══════════════════════════════════════════════════════════
   JR ONE ALUMINUM | SERVICE PLANS
   Brand-brain compliant. Migrated to design tokens + UI components.
   ═══════════════════════════════════════════════════════════ */

import { useState } from "react";
import { useLanguage } from "../../lib/LanguageContext";
import SiteNav from "../../components/SiteNav";
import SiteFooter from "../../components/SiteFooter";
import MobileCTA from "../../components/MobileCTA";
import Container from "../../components/ui/Container";
import Button from "../../components/ui/Button";
import SectionHeading from "../../components/ui/SectionHeading";
import ProcessStep from "../../components/ui/ProcessStep";
import FAQAccordion from "../../components/ui/FAQAccordion";
import CTABand from "../../components/ui/CTABand";
import {
  CheckCircleIcon,
  CheckIcon,
  PhoneIcon,
  HouseIcon,
  WaterDropIcon,
  BroomIcon,
  ShieldIcon,
} from "../../lib/icons";

const PROBLEM_ICONS = [BroomIcon, WaterDropIcon, ShieldIcon, HouseIcon];

const T = {
  en: {
    breadcrumb: ["Home", "Services", "Service Plans"],
    heroTag: "GUTTER MAINTENANCE PLANS",
    heroH1: "Keep Your Gutters",
    heroH1Accent: "Working Year-Round.",
    heroP: "Regular maintenance extends your gutter system's lifespan, prevents costly damage, and keeps your home protected through Florida's toughest weather. Three service levels to fit every home and budget.",
    heroCta: "Schedule Maintenance",
    heroCall: "Call (844) 444-3114",
    stats: [
      { value: "2,000+", label: "Gutter systems maintained" },
      { value: "30+", label: "Years of experience" },
      { value: "3", label: "Service tiers available" },
      { value: "0", label: "Subcontractors, ever" },
    ],
    problemEyebrow: "THE PROBLEM",
    problemTitle: "What Happens When You Skip Gutter Maintenance",
    problems: [
      { title: "Clogged gutters overflow", desc: "Leaves, pine needles, and debris pile up fast in Florida. When gutters clog, water pours over the edges, straight down your walls, into your foundation, and behind your fascia boards." },
      { title: "Standing water breeds pests", desc: "Clogged gutters hold stagnant water, the perfect breeding ground for mosquitoes, mold, and algae. That standing water also accelerates rust and corrosion from the inside out." },
      { title: "Leaking joints go unnoticed", desc: "Miters and seams separate over time. Small leaks turn into fascia rot, soffit staining, and foundation erosion. By the time you see damage, the repair bill has tripled." },
      { title: "Neglect kills your investment", desc: "A gutter system that cost thousands to install can fail in just a few years without maintenance. Regular cleaning and inspection is the cheapest insurance your home has." },
    ],
    planEyebrow: "THE JR ONE DIFFERENCE",
    planTitle: "Three Plans. Zero Guesswork.",
    planSub: "Every plan includes professional-grade cleaning by our own crews. No subcontractors, no shortcuts.",
    mostPopular: "MOST POPULAR",
    getStarted: "Get Started",
    learnMore: "Learn More",
    bestFor: "BEST FOR:",
    plans: [
      {
        name: "LEAF CLEANING",
        tag: "BASIC",
        price: "Call for Pricing",
        desc: "Essential debris removal. Blow it out, clean it up, get it flowing.",
        features: ["Blow off roof debris around gutter line", "Blow out all gutters: remove leaves, needles, buildup", "Blow out all downspouts to confirm clear flow", "Full cleanup of all debris from property", "Visual inspection for obvious damage or issues"],
        best: "Homeowners who maintain regularly and need a straightforward seasonal cleanout.",
        highlight: false,
      },
      {
        name: "PREMIUM CLEANING",
        tag: "RECOMMENDED",
        price: "Call for Pricing",
        desc: "Everything in Basic plus a full water flush, gunk removal, and leak sealing.",
        features: ["Everything in Leaf Cleaning", "Full water wash of all gutters: removes stuck-on gunk and sediment", "Complete water flush of all downspouts", "Seal any obvious leaking miters (corner joints)", "System flow verification: confirm water moves correctly throughout", "Written condition report with photos"],
        best: "Most homeowners. The thorough clean that catches problems before they get expensive.",
        highlight: true,
      },
      {
        name: "DELUXE GUARD PACKAGE",
        tag: "PREMIUM",
        price: "Call for Pricing",
        desc: "Complete system restoration. Clean, realign, reseal, and protect with new guards.",
        features: ["Everything in Premium Cleaning", "Resecuring and realigning all gutters", "Resecuring and realigning all downspouts", "Functional flow testing: make sure everything drains correctly", "Resealing ALL miters throughout the system", "Professional installation of new leaf guards", "Guard system sized and fitted to your specific gutters"],
        best: "Homeowners who want everything dialed in: cleaned, aligned, sealed, and protected.",
        highlight: false,
      },
    ],
    alaCarteEyebrow: "ADDITIONAL SERVICES",
    alaCarteTitle: "A La Carte Maintenance",
    alaCarte: [
      { title: "Downspout Repair", desc: "Repair of damaged or disconnected downspout sections, resecuring to structure, and sealing of leak points." },
      { title: "Gutter Guard Re-Installation", desc: "Resecure or reinstall existing gutter guards that have shifted, lifted, or been displaced by storms." },
      { title: "Wood Fascia Replacement", desc: "Repair or replacement of damaged exterior wood fascia, framing, or trim. Custom-cut, secured, and sealed." },
      { title: "General Gutter Repair", desc: "Leak sealing, hanger replacement, realignment, pitch correction. Quoted based on scope after inspection." },
    ],
    peakAlertLabel: "FLORIDA INSURANCE ALERT",
    peakAlertTitle: "280% Increase in Non-Renewals. Roof Over 15 Years Old?",
    peakAlertDesc: "restores shingles from the inside out. Adds 6 to 10 years of roof life for up to 70% less than a new roof install, with warranty docs Florida carriers need to see when evaluating your renewal.",
    peakBtn: "Peak 301 Info",
    peakRightsBtn: "Your Rights",
    goldEyebrow: "THE GOLD STANDARD",
    goldTitle: "Our Maintenance Process",
    goldSub: "Every home. Every time. No exceptions.",
    goldSteps: [
      { num: "01", title: "Inspect", desc: "We evaluate your entire gutter system, checking for clogs, leaks, loose hangers, misalignment, and fascia condition. Photos included." },
      { num: "02", title: "Clean", desc: "Debris removal, gutter blowout, downspout clearing, and full property cleanup. Your system flows again." },
      { num: "03", title: "Repair", desc: "Seal leaking miters, resecure loose sections, realign pitch, and fix any issues found during inspection." },
      { num: "04", title: "Protect", desc: "Optional leaf guard installation, condition report with photos, and scheduling for your next service visit." },
    ],
    faqEyebrow: "FAQ",
    faqTitle: "Maintenance Questions",
    faqs: [
      { q: "How often should I have my gutters cleaned in Tampa?", a: "We recommend at least twice per year. Once before hurricane season (May or June) and once after fall leaf drop (November or December). Homes with heavy tree coverage or pine trees may benefit from quarterly cleaning." },
      { q: "Can I just get a one-time cleaning without a plan?", a: "Yes. All of our cleaning services are available as one-time visits. Plans simply give you the convenience of scheduled service at consistent pricing. You're not locked into a contract." },
      { q: "What's the difference between Leaf Cleaning and Premium Cleaning?", a: "Leaf Cleaning removes debris from your gutters and clears downspouts. Premium Cleaning adds a full system flush to verify flow throughout the entire system, plus resealing of miters (corner joints) and resecuring of downspouts. Premium catches developing problems that basic cleaning misses." },
      { q: "Do you offer the Deluxe Guard Package for existing guard systems?", a: "The Deluxe Guard Package includes new guard installation. If you already have guards, we offer guard maintenance as part of our Premium Cleaning. Clearing surface debris, checking attachment points, and ensuring proper function." },
      { q: "What does 'resealing miters' mean?", a: "Miters are the corner joints where two gutter runs meet. Over time, the sealant at these joints can crack or separate, causing leaks. Resealing miters during maintenance prevents these leaks before they damage your fascia or foundation." },
      { q: "Do you service gutters you didn't install?", a: "Yes. Our maintenance services are available for any gutter system, regardless of who installed it. We'll assess the condition and let you know if any repairs are needed beyond cleaning." },
    ],
    ctaTitle: "Schedule Your Gutter Maintenance",
    ctaSub: "Tell us which plan interests you and we'll get you scheduled. No contracts, no pressure. Just professional maintenance that protects your home.",
    formTitle: "Schedule Your Gutter Maintenance",
    formName: "Full Name",
    formPhone: "Phone Number",
    formEmail: "Email Address",
    formZip: "ZIP Code",
    formBtn: "Schedule My Maintenance",
    formDisclaimer: "No spam. No pressure. Just professional maintenance.",
    successTitle: "Request Received",
    successMsg: "We'll get back to you within hours.",
    preferTalk: "Prefer to talk?",
    planSelectOptions: ["Which plan interests you?", "Leaf Cleaning (Basic)", "Premium Cleaning (Recommended)", "Deluxe Guard Package", "Not sure, need advice", "One-time cleaning only"],
  },
  es: {
    breadcrumb: ["Inicio", "Servicios", "Planes de Servicio"],
    heroTag: "PLANES DE MANTENIMIENTO DE CANALONES",
    heroH1: "Mantenga Sus Canalones",
    heroH1Accent: "Funcionando Todo el Ano.",
    heroP: "El mantenimiento regular extiende la vida de su sistema de canalones, previene danos costosos y mantiene su hogar protegido durante el clima mas severo de Florida. Tres niveles de servicio para cada casa y presupuesto.",
    heroCta: "Programar Mantenimiento",
    heroCall: "Llame al (844) 444-3114",
    stats: [
      { value: "2,000+", label: "Sistemas de canalones mantenidos" },
      { value: "30+", label: "Anos de experiencia" },
      { value: "3", label: "Niveles de servicio" },
      { value: "0", label: "Subcontratistas, nunca" },
    ],
    problemEyebrow: "EL PROBLEMA",
    problemTitle: "Que Pasa Cuando Omite el Mantenimiento de Canalones",
    problems: [
      { title: "Los canalones tapados se desbordan", desc: "Hojas, agujas de pino y escombros se acumulan rapido en Florida. Cuando los canalones se tapan, el agua se desborda, directo por sus paredes, hacia sus cimientos y detras de las tablas de fascia." },
      { title: "El agua estancada cria plagas", desc: "Los canalones tapados retienen agua estancada, el caldo de cultivo perfecto para mosquitos, moho y algas. Esa agua estancada tambien acelera la oxidacion y corrosion desde adentro." },
      { title: "Las juntas con fugas pasan desapercibidas", desc: "Las esquinas y uniones se separan con el tiempo. Las pequenas fugas se convierten en pudricion de fascia, manchas de sofito y erosion de cimientos. Para cuando ve el dano, la factura de reparacion se ha triplicado." },
      { title: "El descuido destruye su inversion", desc: "Un sistema de canalones que costo miles en instalar puede fallar en solo unos anos sin mantenimiento. La limpieza e inspeccion regular es el seguro mas barato que tiene su casa." },
    ],
    planEyebrow: "LA DIFERENCIA JR ONE",
    planTitle: "Tres Planes. Cero Dudas.",
    planSub: "Cada plan incluye limpieza de grado profesional por nuestros propios equipos. Sin subcontratistas, sin atajos.",
    mostPopular: "MAS POPULAR",
    getStarted: "Comenzar",
    learnMore: "Mas Info",
    bestFor: "IDEAL PARA:",
    plans: [
      {
        name: "LIMPIEZA DE HOJAS",
        tag: "BASICO",
        price: "Llame para Precio",
        desc: "Remocion esencial de escombros. Soplado, limpieza y restauracion del flujo.",
        features: ["Soplar escombros del techo alrededor de la linea del canalon", "Soplar todos los canalones: remover hojas, agujas, acumulacion", "Soplar todos los bajantes para confirmar flujo libre", "Limpieza completa de todos los escombros de la propiedad", "Inspeccion visual por danos obvios o problemas"],
        best: "Propietarios que mantienen regularmente y necesitan una limpieza estacional directa.",
        highlight: false,
      },
      {
        name: "LIMPIEZA PREMIUM",
        tag: "RECOMENDADO",
        price: "Llame para Precio",
        desc: "Todo en Basico mas lavado completo con agua, remocion de suciedad y sellado de fugas.",
        features: ["Todo en Limpieza de Hojas", "Lavado completo con agua de todos los canalones: remueve suciedad y sedimento adherido", "Lavado completo con agua de todos los bajantes", "Sellar cualquier esquina con fuga obvia (juntas de esquina)", "Verificacion de flujo del sistema: confirmar que el agua se mueve correctamente", "Reporte de condicion escrito con fotos"],
        best: "La mayoria de propietarios. La limpieza exhaustiva que detecta problemas antes de que se vuelvan costosos.",
        highlight: true,
      },
      {
        name: "PAQUETE DELUXE CON GUARDAS",
        tag: "PREMIUM",
        price: "Llame para Precio",
        desc: "Restauracion completa del sistema. Limpieza, realineacion, resellado y proteccion con guardas nuevas.",
        features: ["Todo en Limpieza Premium", "Reasegurar y realinear todos los canalones", "Reasegurar y realinear todos los bajantes", "Prueba de flujo funcional: asegurar que todo drena correctamente", "Resellado de TODAS las esquinas en todo el sistema", "Instalacion profesional de guardas de hojas nuevas", "Sistema de guardas dimensionado y ajustado a sus canalones especificos"],
        best: "Propietarios que quieren todo en perfecto estado: limpio, alineado, sellado y protegido.",
        highlight: false,
      },
    ],
    alaCarteEyebrow: "SERVICIOS ADICIONALES",
    alaCarteTitle: "Mantenimiento a la Carta",
    alaCarte: [
      { title: "Reparacion de Bajantes", desc: "Reparacion de secciones de bajante danadas o desconectadas, reasegurar a la estructura y sellado de puntos de fuga." },
      { title: "Reinstalacion de Guardas", desc: "Reasegurar o reinstalar guardas de canalones existentes que se han movido, levantado o desplazado por tormentas." },
      { title: "Reemplazo de Fascia de Madera", desc: "Reparacion o reemplazo de fascia de madera exterior danada, marcos o molduras. Corte personalizado, asegurado y sellado." },
      { title: "Reparacion General de Canalones", desc: "Sellado de fugas, reemplazo de ganchos, realineacion, correccion de pendiente. Presupuesto basado en alcance despues de inspeccion." },
    ],
    peakAlertLabel: "ALERTA DE SEGUROS DE FLORIDA",
    peakAlertTitle: "280% de Aumento en No Renovaciones. Techo de Mas de 15 Anos?",
    peakAlertDesc: "restaura las tejas desde adentro. Agrega 6 a 10 anos de vida al techo por hasta 70% menos que una instalacion de techo nuevo, con documentos de garantia que las aseguradoras de FL necesitan ver al evaluar su renovacion.",
    peakBtn: "Info Peak 301",
    peakRightsBtn: "Sus Derechos",
    goldEyebrow: "EL ESTANDAR DE ORO",
    goldTitle: "Nuestro Proceso de Mantenimiento",
    goldSub: "Cada casa. Cada vez. Sin excepciones.",
    goldSteps: [
      { num: "01", title: "Inspeccionar", desc: "Evaluamos todo su sistema de canalones, revisando obstrucciones, fugas, ganchos sueltos, desalineacion y condicion de la fascia. Fotos incluidas." },
      { num: "02", title: "Limpiar", desc: "Remocion de escombros, soplado de canalones, limpieza de bajantes y limpieza completa de la propiedad. Su sistema fluye de nuevo." },
      { num: "03", title: "Reparar", desc: "Sellar esquinas con fugas, reasegurar secciones sueltas, realinear pendiente y reparar cualquier problema encontrado durante la inspeccion." },
      { num: "04", title: "Proteger", desc: "Instalacion opcional de guardas de hojas, reporte de condicion con fotos y programacion de su proxima visita de servicio." },
    ],
    faqEyebrow: "PREGUNTAS FRECUENTES",
    faqTitle: "Preguntas de Mantenimiento",
    faqs: [
      { q: "Con que frecuencia debo limpiar mis canalones en Tampa?", a: "Recomendamos al menos dos veces al ano. Una antes de la temporada de huracanes (mayo o junio) y otra despues de la caida de hojas de otono (noviembre o diciembre). Casas con mucha cobertura de arboles o pinos pueden beneficiarse de limpieza trimestral." },
      { q: "Puedo obtener solo una limpieza unica sin plan?", a: "Si. Todos nuestros servicios de limpieza estan disponibles como visitas unicas. Los planes simplemente le dan la conveniencia de servicio programado a precios consistentes. No esta atado a un contrato." },
      { q: "Cual es la diferencia entre Limpieza de Hojas y Limpieza Premium?", a: "La Limpieza de Hojas remueve escombros de sus canalones y limpia los bajantes. La Limpieza Premium agrega un lavado completo del sistema para verificar el flujo en todo el sistema, mas resellado de esquinas (juntas) y reasegurar bajantes. Premium detecta problemas en desarrollo que la limpieza basica no detecta." },
      { q: "Ofrecen el Paquete Deluxe para sistemas de guardas existentes?", a: "El Paquete Deluxe incluye instalacion de guardas nuevas. Si ya tiene guardas, ofrecemos mantenimiento de guardas como parte de nuestra Limpieza Premium. Limpiando escombros de superficie, revisando puntos de anclaje y asegurando funcionamiento adecuado." },
      { q: "Que significa 'resellar esquinas'?", a: "Las esquinas son las juntas donde dos tramos de canalon se encuentran. Con el tiempo, el sellador en estas juntas puede agrietarse o separarse, causando fugas. Resellar esquinas durante el mantenimiento previene estas fugas antes de que danen su fascia o cimientos." },
      { q: "Dan servicio a canalones que no instalaron?", a: "Si. Nuestros servicios de mantenimiento estan disponibles para cualquier sistema de canalones, sin importar quien lo instalo. Evaluaremos la condicion y le informaremos si se necesitan reparaciones mas alla de la limpieza." },
    ],
    ctaTitle: "Programe Su Mantenimiento de Canalones",
    ctaSub: "Diganos que plan le interesa y lo programaremos. Sin contratos, sin presion. Solo mantenimiento profesional que protege su hogar.",
    formTitle: "Programe Su Mantenimiento de Canalones",
    formName: "Nombre Completo",
    formPhone: "Numero de Telefono",
    formEmail: "Correo Electronico",
    formZip: "Codigo Postal",
    formBtn: "Programar Mi Mantenimiento",
    formDisclaimer: "Sin spam. Sin presion. Solo mantenimiento profesional.",
    successTitle: "Solicitud Recibida",
    successMsg: "Nos pondremos en contacto en horas.",
    preferTalk: "Prefiere hablar?",
    planSelectOptions: ["Que plan le interesa?", "Limpieza de Hojas (Basico)", "Limpieza Premium (Recomendado)", "Paquete Deluxe con Guardas", "No estoy seguro, necesito consejo", "Solo limpieza unica"],
  },
};

const inputDarkStyle = {
  width: "100%",
  padding: "13px 16px",
  fontFamily: "var(--jr-font-body)",
  fontSize: "15px",
  border: "1.5px solid var(--jr-navy-3)",
  borderRadius: "var(--jr-radius-md)",
  outline: "none",
  color: "var(--jr-paper)",
  background: "var(--jr-navy)",
  marginBottom: "12px",
  transition: "border-color var(--jr-dur-fast) var(--jr-ease-out)",
};

export default function ServicePlansPage() {
  const { lang } = useLanguage();
  const t = T[lang];
  const [formData, setFormData] = useState({ name: "", phone: "", email: "", zip: "", plan: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleForm = async (e) => {
    e?.preventDefault?.();
    if (!formData.name || !formData.phone) return;
    setLoading(true);
    try {
      const params = new URLSearchParams(typeof window !== "undefined" ? window.location.search : "");
      await fetch("/api/send-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone,
          email: formData.email,
          zip: formData.zip,
          service: formData.plan,
          page: typeof window !== "undefined" ? window.location.pathname : "/service-plans",
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
        {/* Breadcrumb */}
        <Container style={{ paddingTop: "var(--jr-space-4)" }}>
          <div style={{ fontFamily: "var(--jr-font-body)", fontSize: "var(--jr-text-sm)", color: "var(--jr-muted-on-dark)" }}>
            {t.breadcrumb.map((item, i) => (
              <span key={i}>
                {i > 0 && <span style={{ margin: "0 var(--jr-space-2)", opacity: 0.5 }}>/</span>}
                <span style={{ color: i === t.breadcrumb.length - 1 ? "var(--jr-gold)" : "var(--jr-muted-on-dark)" }}>{item}</span>
              </span>
            ))}
          </div>
        </Container>

        {/* HERO */}
        <section style={{ padding: "var(--jr-space-12) var(--jr-space-6) var(--jr-space-20)" }}>
          <Container>
            <div style={{ maxWidth: "780px" }}>
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
                  {t.heroTag}
                </span>
              </div>
              <h1
                style={{
                  fontFamily: "var(--jr-font-heading)",
                  fontSize: "var(--jr-text-4xl)",
                  fontWeight: 800,
                  lineHeight: 1.1,
                  marginBottom: "var(--jr-space-5)",
                }}
              >
                {t.heroH1}<br />
                <span style={{ color: "var(--jr-gold)" }}>{t.heroH1Accent}</span>
              </h1>
              <p
                style={{
                  fontFamily: "var(--jr-font-body)",
                  fontSize: "var(--jr-text-lg)",
                  color: "var(--jr-cream-2)",
                  lineHeight: 1.7,
                  marginBottom: "var(--jr-space-8)",
                  maxWidth: "640px",
                }}
              >
                {t.heroP}
              </p>
              <div style={{ display: "flex", gap: "var(--jr-space-4)", flexWrap: "wrap" }}>
                <Button href="#quote-form" variant="primary" size="lg" iconRight>
                  {t.heroCta}
                </Button>
                <Button href="tel:8444443114" variant="outline" size="lg" iconLeft={<PhoneIcon size={18} />}>
                  {t.heroCall}
                </Button>
              </div>
              <div style={{ display: "flex", gap: "var(--jr-space-8)", marginTop: "var(--jr-space-10)", flexWrap: "wrap" }}>
                {t.stats.map((s, i) => (
                  <div key={i}>
                    <div style={{ fontFamily: "var(--jr-font-heading)", fontSize: "28px", fontWeight: 800, color: "var(--jr-gold)" }}>{s.value}</div>
                    <div style={{ fontFamily: "var(--jr-font-body)", fontSize: "var(--jr-text-xs)", color: "var(--jr-muted-on-dark)", maxWidth: "140px", marginTop: "var(--jr-space-1)" }}>
                      {s.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Container>
        </section>

        {/* PROBLEM */}
        <section style={{ background: "var(--jr-navy-deep)", padding: "var(--jr-space-20) 0" }}>
          <Container>
            <SectionHeading
              eyebrow={t.problemEyebrow}
              title={t.problemTitle}
              theme="dark"
            />
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "var(--jr-space-5)" }}>
              {t.problems.map((p, i) => {
                const Icon = PROBLEM_ICONS[i] || HouseIcon;
                return (
                  <article
                    key={i}
                    style={{
                      background: "var(--jr-navy)",
                      border: "1px solid var(--jr-navy-3)",
                      borderLeft: "4px solid var(--jr-gold)",
                      borderRadius: "var(--jr-radius-lg)",
                      padding: "var(--jr-space-6)",
                    }}
                  >
                    <div style={{ color: "var(--jr-gold)", marginBottom: "var(--jr-space-3)" }}>
                      <Icon size={28} />
                    </div>
                    <h3 style={{ fontFamily: "var(--jr-font-heading)", fontSize: "var(--jr-text-lg)", fontWeight: 700, color: "var(--jr-paper)", marginBottom: "var(--jr-space-2)" }}>
                      {p.title}
                    </h3>
                    <p style={{ fontFamily: "var(--jr-font-body)", fontSize: "var(--jr-text-md)", color: "var(--jr-muted-on-dark)", lineHeight: 1.55 }}>
                      {p.desc}
                    </p>
                  </article>
                );
              })}
            </div>
          </Container>
        </section>

        {/* PLAN TIERS */}
        <section style={{ background: "var(--jr-navy)", padding: "var(--jr-space-20) 0" }}>
          <Container>
            <SectionHeading
              eyebrow={t.planEyebrow}
              title={t.planTitle}
              subtitle={t.planSub}
              theme="dark"
            />
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "var(--jr-space-6)", alignItems: "start" }}>
              {t.plans.map((plan, i) => (
                <article
                  key={i}
                  className="jr-hover-lift"
                  style={{
                    background: "var(--jr-navy-deep)",
                    border: plan.highlight ? "2px solid var(--jr-gold)" : "1px solid var(--jr-navy-3)",
                    borderRadius: "var(--jr-radius-xl)",
                    padding: "var(--jr-space-8)",
                    position: "relative",
                  }}
                >
                  {plan.highlight && (
                    <div
                      style={{
                        position: "absolute",
                        top: "-14px",
                        left: "50%",
                        transform: "translateX(-50%)",
                        background: "var(--jr-gold)",
                        color: "var(--jr-navy)",
                        fontFamily: "var(--jr-font-heading)",
                        fontSize: "var(--jr-text-xs)",
                        fontWeight: 700,
                        letterSpacing: "1.5px",
                        padding: "4px 16px",
                        borderRadius: "var(--jr-radius-sm)",
                      }}
                    >
                      {t.mostPopular}
                    </div>
                  )}
                  <div style={{ fontFamily: "var(--jr-font-heading)", fontSize: "var(--jr-text-xs)", fontWeight: 700, color: plan.highlight ? "var(--jr-gold)" : "var(--jr-muted-on-dark)", letterSpacing: "2px", marginBottom: "var(--jr-space-2)", textTransform: "uppercase" }}>
                    {plan.tag}
                  </div>
                  <h3 style={{ fontFamily: "var(--jr-font-heading)", fontSize: "var(--jr-text-xl)", fontWeight: 800, color: "var(--jr-paper)", marginBottom: "var(--jr-space-2)" }}>
                    {plan.name}
                  </h3>
                  <div style={{ fontFamily: "var(--jr-font-heading)", fontSize: "var(--jr-text-md)", fontWeight: 700, color: "var(--jr-gold)", marginBottom: "var(--jr-space-3)" }}>
                    {plan.price}
                  </div>
                  <p style={{ fontFamily: "var(--jr-font-body)", fontSize: "var(--jr-text-md)", color: "var(--jr-muted-on-dark)", marginBottom: "var(--jr-space-5)", lineHeight: 1.55 }}>
                    {plan.desc}
                  </p>
                  <div style={{ borderTop: "var(--jr-hair-darker)", paddingTop: "var(--jr-space-4)", marginBottom: "var(--jr-space-4)" }}>
                    {plan.features.map((feat, j) => (
                      <div key={j} style={{ display: "flex", gap: "10px", marginBottom: "10px", alignItems: "flex-start" }}>
                        <span style={{ color: "var(--jr-gold)", flexShrink: 0, marginTop: "2px" }} aria-hidden>
                          <CheckIcon size={16} />
                        </span>
                        <span style={{ fontFamily: "var(--jr-font-body)", fontSize: "var(--jr-text-sm)", color: "var(--jr-cream-2)", lineHeight: 1.5 }}>{feat}</span>
                      </div>
                    ))}
                  </div>
                  <div
                    style={{
                      background: "var(--jr-gold-pale)",
                      borderRadius: "var(--jr-radius-md)",
                      padding: "12px 14px",
                      marginBottom: "var(--jr-space-5)",
                    }}
                  >
                    <span style={{ fontFamily: "var(--jr-font-heading)", fontSize: "var(--jr-text-xs)", fontWeight: 700, color: "var(--jr-gold)", letterSpacing: "1px", marginRight: "var(--jr-space-2)" }}>
                      {t.bestFor}
                    </span>
                    <span style={{ fontFamily: "var(--jr-font-body)", fontSize: "var(--jr-text-sm)", color: "var(--jr-cream-2)" }}>{plan.best}</span>
                  </div>
                  <Button
                    href="#quote-form"
                    variant={plan.highlight ? "primary" : "outline"}
                    size="md"
                    fullWidth
                    iconRight
                  >
                    {plan.highlight ? t.getStarted : t.learnMore}
                  </Button>
                </article>
              ))}
            </div>

            {/* A LA CARTE */}
            <div style={{ marginTop: "var(--jr-space-20)" }}>
              <SectionHeading
                eyebrow={t.alaCarteEyebrow}
                title={t.alaCarteTitle}
                theme="dark"
              />
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "var(--jr-space-4)" }}>
                {t.alaCarte.map((svc, i) => (
                  <div
                    key={i}
                    className="jr-hover-lift"
                    style={{
                      background: "var(--jr-navy-deep)",
                      border: "1px solid var(--jr-navy-3)",
                      borderRadius: "var(--jr-radius-lg)",
                      padding: "var(--jr-space-5)",
                    }}
                  >
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "var(--jr-space-2)" }}>
                      <h3 style={{ fontFamily: "var(--jr-font-heading)", fontSize: "var(--jr-text-md)", fontWeight: 700, color: "var(--jr-paper)" }}>
                        {svc.title}
                      </h3>
                      <span style={{ color: "var(--jr-gold)" }} aria-hidden>
                        <CheckIcon size={18} />
                      </span>
                    </div>
                    <p style={{ fontFamily: "var(--jr-font-body)", fontSize: "var(--jr-text-sm)", color: "var(--jr-muted-on-dark)", lineHeight: 1.55 }}>
                      {svc.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </Container>
        </section>

        {/* PEAK 301 ALERT */}
        <section
          style={{
            background: "linear-gradient(135deg, rgba(177,26,33,0.10), var(--jr-navy-deep))",
            padding: "var(--jr-space-8) var(--jr-space-6)",
            borderTop: "2px solid var(--jr-alert)",
            borderBottom: "2px solid var(--jr-alert)",
          }}
        >
          <Container>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "var(--jr-space-5)" }}>
              <div style={{ flex: "1 1 500px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "var(--jr-space-2)", marginBottom: "var(--jr-space-2)" }}>
                  <span style={{ fontFamily: "var(--jr-font-heading)", fontSize: "var(--jr-text-xs)", fontWeight: 700, color: "var(--jr-alert)", letterSpacing: "2px", textTransform: "uppercase" }}>
                    {t.peakAlertLabel}
                  </span>
                </div>
                <p style={{ fontFamily: "var(--jr-font-heading)", fontSize: "var(--jr-text-xl)", fontWeight: 800, color: "var(--jr-paper)", lineHeight: 1.3, marginBottom: "var(--jr-space-2)" }}>
                  {t.peakAlertTitle}
                </p>
                <p style={{ fontFamily: "var(--jr-font-body)", fontSize: "var(--jr-text-sm)", color: "var(--jr-muted-on-dark)", lineHeight: 1.5 }}>
                  <strong style={{ color: "var(--jr-cream-2)" }}>Peak 301</strong> {t.peakAlertDesc}
                </p>
              </div>
              <div style={{ display: "flex", gap: "var(--jr-space-3)", flexWrap: "wrap" }}>
                <Button href="/peak-301" variant="primary" size="md" iconRight>
                  {t.peakBtn}
                </Button>
                <Button href="/insurance-resource-center" variant="outline" size="md" iconRight>
                  {t.peakRightsBtn}
                </Button>
              </div>
            </div>
          </Container>
        </section>

        {/* GOLD STANDARD */}
        <section style={{ background: "var(--jr-navy-deep)", padding: "var(--jr-space-20) 0" }}>
          <Container>
            <SectionHeading
              eyebrow={t.goldEyebrow}
              title={t.goldTitle}
              subtitle={t.goldSub}
              theme="dark"
            />
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "var(--jr-space-5)" }}>
              {t.goldSteps.map((step) => (
                <ProcessStep key={step.num} num={step.num} title={step.title} desc={step.desc} />
              ))}
            </div>
          </Container>
        </section>

        {/* FAQ */}
        <section style={{ background: "var(--jr-navy)", padding: "var(--jr-space-20) 0" }}>
          <Container size="prose">
            <SectionHeading
              eyebrow={t.faqEyebrow}
              title={t.faqTitle}
              theme="dark"
            />
            <FAQAccordion items={t.faqs} theme="dark" />
          </Container>
        </section>

        {/* CTA FORM */}
        <section
          id="quote-form"
          style={{
            background: "linear-gradient(165deg, var(--jr-navy-2) 0%, var(--jr-navy) 100%)",
            padding: "var(--jr-space-20) var(--jr-space-6)",
          }}
        >
          <Container size="narrow" style={{ textAlign: "center" }}>
            <h2
              style={{
                fontFamily: "var(--jr-font-heading)",
                fontSize: "var(--jr-text-3xl)",
                fontWeight: 800,
                color: "var(--jr-paper)",
                marginBottom: "var(--jr-space-3)",
                textTransform: "uppercase",
                letterSpacing: "1px",
              }}
            >
              {t.ctaTitle}
            </h2>
            <p
              style={{
                fontFamily: "var(--jr-font-body)",
                fontSize: "var(--jr-text-lg)",
                color: "var(--jr-cream-2)",
                lineHeight: 1.65,
                maxWidth: 600,
                margin: "0 auto var(--jr-space-10)",
              }}
            >
              {t.ctaSub}
            </p>
            <div
              style={{
                background: "var(--jr-navy-deep)",
                border: "1px solid var(--jr-navy-3)",
                borderRadius: "var(--jr-radius-xl)",
                padding: "var(--jr-space-8)",
                boxShadow: "var(--jr-shadow-form)",
                textAlign: "left",
                maxWidth: 500,
                margin: "0 auto",
              }}
            >
              {submitted ? (
                <div style={{ textAlign: "center", padding: "var(--jr-space-6) 0" }}>
                  <div style={{ display: "inline-flex", color: "var(--jr-success)", marginBottom: "var(--jr-space-3)" }}>
                    <CheckCircleIcon size={48} />
                  </div>
                  <h3 style={{ fontFamily: "var(--jr-font-heading)", fontSize: "var(--jr-text-xl)", fontWeight: 700, color: "var(--jr-paper)" }}>
                    {t.successTitle}
                  </h3>
                  <p style={{ fontFamily: "var(--jr-font-body)", fontSize: "var(--jr-text-md)", color: "var(--jr-muted-on-dark)", marginTop: "var(--jr-space-2)" }}>
                    {t.successMsg}
                  </p>
                </div>
              ) : (
                <form onSubmit={handleForm}>
                  <h3 style={{ fontFamily: "var(--jr-font-heading)", fontSize: "var(--jr-text-xl)", fontWeight: 700, color: "var(--jr-paper)", textAlign: "center", marginBottom: "var(--jr-space-1)" }}>
                    {t.formTitle}
                  </h3>
                  <div aria-hidden style={{ width: 40, height: 3, background: "var(--jr-gold)", borderRadius: 2, margin: "10px auto var(--jr-space-5)" }} />
                  <input aria-label={t.formName} style={inputDarkStyle} placeholder={t.formName} value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required />
                  <input aria-label={t.formPhone} style={inputDarkStyle} placeholder={t.formPhone} type="tel" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} required />
                  <input aria-label={t.formEmail} style={inputDarkStyle} placeholder={t.formEmail} type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
                  <input aria-label={t.formZip} style={inputDarkStyle} placeholder={t.formZip} value={formData.zip} onChange={(e) => setFormData({ ...formData, zip: e.target.value })} maxLength={5} />
                  <select
                    aria-label={t.planSelectOptions[0]}
                    style={{ ...inputDarkStyle, cursor: "pointer" }}
                    value={formData.plan}
                    onChange={(e) => setFormData({ ...formData, plan: e.target.value })}
                  >
                    {t.planSelectOptions.map((o, i) => (
                      <option key={i} value={i === 0 ? "" : o} style={{ color: "var(--jr-ink)" }}>{o}</option>
                    ))}
                  </select>
                  <Button type="submit" variant="primary" size="md" fullWidth iconRight disabled={loading}>
                    {loading ? (lang === "en" ? "Sending..." : "Enviando...") : t.formBtn}
                  </Button>
                  <p style={{ fontFamily: "var(--jr-font-body)", fontSize: "var(--jr-text-xs)", color: "var(--jr-muted-on-dark)", textAlign: "center", marginTop: "var(--jr-space-3)" }}>
                    {t.formDisclaimer}
                  </p>
                </form>
              )}
            </div>
            <div style={{ marginTop: "var(--jr-space-8)" }}>
              <p style={{ fontFamily: "var(--jr-font-body)", fontSize: "var(--jr-text-md)", color: "var(--jr-muted-on-dark)", marginBottom: "var(--jr-space-2)" }}>
                {t.preferTalk}
              </p>
              <Button href="tel:8444443114" variant="ghost" size="md" iconLeft={<PhoneIcon size={18} />}>
                (844) 444-3114
              </Button>
            </div>
          </Container>
        </section>

        <CTABand
          title={lang === "en" ? "Three Plans. One Standard." : "Tres Planes. Un Estandar."}
          sub={lang === "en"
            ? "Family-owned, over 30 years in the trade. Schedule the right plan for your home."
            : "Empresa familiar, mas de 30 anos en el oficio. Programa el plan correcto para tu hogar."}
          primaryLabel={t.heroCta}
          primaryHref="#quote-form"
        />
      </main>
      <SiteFooter />
      <MobileCTA scrollTarget="quote-form" />
    </div>
  );
}
