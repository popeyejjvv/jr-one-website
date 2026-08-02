"use client";

/* ═══════════════════════════════════════════════════════════
   JR ONE ALUMINUM: DRAINAGE INSTALLATION
   Brand-brain compliant. Tokens via app/tokens.css.
   PER BRAND-BRAIN: drainage scope is EXACTLY underground PVC,
   catch basins, surface grates, pop-up emitters. NO french drains,
   NO channel drains, NO buried aluminum downspouts. Don't add
   scope the company doesn't deliver.
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
import FAQAccordion from "../../components/ui/FAQAccordion";
import Peak301Alert from "../../components/ui/Peak301Alert";
import {
  CheckCircleIcon,
  PhoneIcon,
} from "../../lib/icons";

// Page-identity accent: drainage water blue.
const ACCENT = "#2563EB";
const ACCENT_LIGHT = "#3B82F6";

const T = {
  en: {
    breadcrumb: ["Home", "Services", "Drainage Installation"],
    heroTag: "DRAINAGE INSTALLATION",
    heroH1a: "Stop the Flooding.",
    heroH1b: "We Install the Fix.",
    heroP: "Florida dumps over 50 inches of rain per year on your home. When your gutters and downspouts aren't enough, you need a real underground drainage system. We install Schedule 40 PVC underground drainage, catch basins, surface grates, and pop-up emitters to move water away from your foundation and keep your property dry.",
    heroCta: "Schedule Assessment",
    heroCall: "Call (844) 444-3114",
    stats: [
      { value: "50+", label: "Inches of rain per year in Tampa" },
      { value: "1 to 2", label: "Days, most residential installs" },
      { value: "Sched 40", label: "PVC underground spec" },
      { value: "100%", label: "In-house crews" },
    ],
    problemEyebrow: "The Problem",
    problemTitle: "What Happens When Water Has Nowhere to Go",
    problems: [
      { emoji: "💧", title: "Foundation pooling and damage", desc: "Water collecting around your foundation causes cracks, settling, and structural damage averaging $5,000 to $15,000 in repairs. A properly installed drainage system eliminates this." },
      { emoji: "🏠", title: "Yard flooding after every storm", desc: "If your yard turns into a swamp every time it rains, your property doesn't have adequate drainage. We install systems that move water underground and away from your home." },
      { emoji: "📐", title: "Landscape and hardscape erosion", desc: "Uncontrolled water flow destroys mulch beds, washes out plantings, undermines pavers and walkways, and creates permanent mud pits." },
      { emoji: "🛡️", title: "Standing water breeds pests", desc: "Pooling water that won't drain creates mosquito breeding grounds and attracts pests year-round. Proper drainage eliminates standing water entirely." },
    ],
    installEyebrow: "What We Install",
    installTitle: "Underground Drainage Done Right",
    installSub: "Four components, one system. Underground PVC moves the water, catch basins and grates collect it at the surface, pop-up emitters release it safely away from your home.",
    whatWeInstall: [
      { emoji: "🌧️", title: "Underground PVC drainage lines", desc: "Schedule 40 PVC pipe installed underground to carry water from your downspouts to a discharge point far from your home. The backbone of every system we build. Eliminates surface water from the gutter outlet all the way to release." },
      { emoji: "🏗️", title: "Catch basins", desc: "Subsurface collection boxes that capture water from low spots in your yard, downspout outlets, or driveway edges and feed it into the underground PVC. Sized to the volume your roof and yard actually shed." },
      { emoji: "📐", title: "Surface grates", desc: "The visible inlet that sits flush with your lawn or hardscape. Lets water enter the catch basin without exposing the pipe. Pedestrian-rated and traffic-rated options for walkways and driveways." },
      { emoji: "💧", title: "Pop-up emitters", desc: "Discharge points that open when water flows through the system and close when dry. Installed at the end of underground lines to release water away from your home without visible pipe ends in the yard." },
    ],
    peakAlertLabel: "Florida Insurance Alert",
    peakAlertTitle: "280% Increase in Non-Renewals. Roof Over 15 Years Old?",
    peakAlertDesc: "Peak 301 restores shingles from the inside out. Adds 6 to 10 years of roof life for up to 70% less than a new roof install, with warranty docs Florida carriers may consider when evaluating your renewal.",
    peakBtn: "Peak 301 Info",
    peakRights: "Your Rights",
    processEyebrow: "The Process",
    processTitle: "How We Solve Drainage Problems",
    processSub: "Inspect. Diagnose. Recommend. Fix.",
    goldSteps: [
      { num: "01", title: "Evaluate", desc: "We walk your property, identify where water is pooling and why, trace existing downspout paths, check grading, and determine exactly what underground drainage your property needs." },
      { num: "02", title: "Design", desc: "Custom drainage plan with PVC routing, catch basin placement, discharge points, and integration with your existing gutter system. You see the plan and pricing before any digging starts." },
      { num: "03", title: "Install", desc: "Our in-house crew handles all trenching, PVC installation, catch basin and grate placement, backfill, and landscape restoration. Most residential installs are completed in 1 to 2 days." },
      { num: "04", title: "Verify", desc: "We test the entire system with water flow to confirm it drains the way it should. You see it working before we leave. Backed by our craftsmanship warranty." },
    ],
    faqEyebrow: "FAQ",
    faqTitle: "Drainage Installation Questions",
    faqs: [
      { q: "How much does drainage installation cost?", a: "JR One Aluminum does not publish a flat drainage price for Tampa Bay, FL because a drainage system is built to the property rather than sold off a rate card. Price is driven by the linear footage of underground PVC, the number of catch basins and surface grates, the number of pop-up emitters, how many downspouts are being tied in, trench depth and length, and whether the run has to cross driveways, walkways, or mature root systems. We provide transparent line-item pricing before any work begins. For a real number on your own property, request a free on-site evaluation at jronegutters.com/drainage-assessment or call (844) 444-3114." },
      { q: "How long does installation take?", a: "Most residential drainage installations take 1 to 2 days. Larger properties with multiple catch basins and longer underground runs may take 2 to 3 days. We give you a specific timeline before work begins." },
      { q: "Do you install french drains or channel drains?", a: "No. Our drainage scope is underground PVC, catch basins, surface grates, and pop-up emitters. If your property genuinely needs a french drain or channel drain, we'll tell you so during the assessment and refer you to a contractor who specializes in that scope. We don't sell work we don't deliver." },
      { q: "Will you tear up my yard?", a: "We trench where needed and restore the surface afterward, including re-grading, re-sodding, or replacing mulch. We minimize disruption and clean up completely. Your yard will look better than before because the drainage problems will be solved." },
      { q: "Can you connect drainage to my existing gutter system?", a: "Yes. That's the most common project we do. We tie underground PVC lines into your existing downspout outlets so roof water is captured and routed away from your foundation entirely. Often the most impactful upgrade we make." },
      { q: "What if I also need new gutters?", a: "We bundle gutter installation with drainage work regularly. Doing both at the same time is more cost-effective and ensures the entire water-management system works together from roof to release point." },
    ],
    ctaTitle: "Get Your Drainage System Installed",
    ctaSub: "Stop fighting the water. We'll design and install the underground drainage your property needs, and you'll see the difference after the next rain.",
    formTitle: "Request Your Drainage Estimate",
    formName: "Full Name",
    formPhone: "Phone Number",
    formEmail: "Email Address",
    formZip: "ZIP Code",
    formBtn: "Request My Drainage Estimate",
    formNote: "No spam. No pressure. Just honest advice from the trade.",
    formSent: "Estimate Request Received",
    formSentSub: "We'll get back to you within hours.",
  },
  es: {
    breadcrumb: ["Inicio", "Servicios", "Instalación de Drenaje"],
    heroTag: "INSTALACIÓN DE DRENAJE",
    heroH1a: "Detenga las Inundaciones.",
    heroH1b: "Nosotros Instalamos la Solución.",
    heroP: "Florida descarga más de 50 pulgadas de lluvia al año sobre su casa. Cuando sus canaletas y bajantes no son suficientes, necesita un sistema de drenaje subterráneo real. Instalamos PVC Schedule 40 subterráneo, sumideros, rejillas de superficie y emisores emergentes para mover el agua lejos de sus cimientos y mantener su propiedad seca.",
    heroCta: "Programar Evaluación",
    heroCall: "Llame al (844) 444-3114",
    stats: [
      { value: "50+", label: "Pulgadas de lluvia al año en Tampa" },
      { value: "1 a 2", label: "Días, mayoría de instalaciones" },
      { value: "Sched 40", label: "Especificación de PVC subterráneo" },
      { value: "100%", label: "Equipos propios" },
    ],
    problemEyebrow: "El Problema",
    problemTitle: "Qué Pasa Cuando el Agua No Tiene a Dónde Ir",
    problems: [
      { emoji: "💧", title: "Acumulación de agua y daño a cimientos", desc: "El agua que se acumula alrededor de sus cimientos causa grietas, asentamiento y daño estructural que promedia $5,000 a $15,000 en reparaciones. Un sistema de drenaje correctamente instalado elimina esto." },
      { emoji: "🏠", title: "Inundación del patio después de cada tormenta", desc: "Si su patio se convierte en un pantano cada vez que llueve, su propiedad no tiene drenaje adecuado. Instalamos sistemas que mueven el agua bajo tierra y lejos de su casa." },
      { emoji: "📐", title: "Erosión del paisaje y superficies duras", desc: "El flujo de agua descontrolado destruye camas de mantillo, arrasa plantaciones, socava adoquines y caminos, y crea charcos de lodo permanentes." },
      { emoji: "🛡️", title: "El agua estancada cría plagas", desc: "El agua acumulada que no drena crea criaderos de mosquitos y atrae plagas todo el año. El drenaje adecuado elimina el agua estancada por completo." },
    ],
    installEyebrow: "Lo Que Instalamos",
    installTitle: "Drenaje Subterráneo Bien Hecho",
    installSub: "Cuatro componentes, un sistema. PVC subterráneo mueve el agua, sumideros y rejillas la capturan en la superficie, emisores emergentes la liberan de forma segura lejos de su casa.",
    whatWeInstall: [
      { emoji: "🌧️", title: "Líneas de drenaje PVC subterráneas", desc: "Tubería PVC Schedule 40 instalada bajo tierra para llevar agua desde sus bajantes a un punto de descarga lejos de su casa. La columna vertebral de cada sistema que construimos. Elimina el agua superficial desde la salida del canalón hasta la liberación." },
      { emoji: "🏗️", title: "Sumideros", desc: "Cajas de recolección subsuperficiales que capturan agua de puntos bajos en su patio, salidas de bajantes o bordes de entradas y la alimentan al PVC subterráneo. Dimensionados al volumen que su techo y patio realmente descargan." },
      { emoji: "📐", title: "Rejillas de superficie", desc: "La entrada visible que se asienta a ras con su césped o superficie dura. Permite que el agua entre al sumidero sin exponer la tubería. Opciones clasificadas para peatones y para tráfico en caminos y entradas." },
      { emoji: "💧", title: "Emisores emergentes", desc: "Puntos de descarga que se abren cuando el agua fluye por el sistema y se cierran cuando están secos. Instalados al final de las líneas subterráneas para liberar agua lejos de su casa sin extremos de tubería visibles en el patio." },
    ],
    peakAlertLabel: "Alerta de Seguros de Florida",
    peakAlertTitle: "280% de Aumento en No Renovaciones. ¿Techo de Más de 15 Años?",
    peakAlertDesc: "Peak 301 restaura las tejas desde adentro. Agrega 6 a 10 años de vida al techo por hasta 70% menos que un techo nuevo, con documentos de garantía que las aseguradoras de FL pueden considerar al evaluar la renovación.",
    peakBtn: "Info Peak 301",
    peakRights: "Sus Derechos",
    processEyebrow: "El Proceso",
    processTitle: "Cómo Resolvemos Problemas de Drenaje",
    processSub: "Inspeccionar. Diagnosticar. Recomendar. Reparar.",
    goldSteps: [
      { num: "01", title: "Evaluar", desc: "Caminamos su propiedad, identificamos dónde se acumula el agua y por qué, rastreamos los caminos existentes de bajantes, verificamos la nivelación y determinamos exactamente qué drenaje subterráneo necesita su propiedad." },
      { num: "02", title: "Diseñar", desc: "Plan de drenaje personalizado con ruta de PVC, ubicación de sumideros, puntos de descarga e integración con su sistema de canaletas existente. Usted ve el plan y los precios antes de que comience cualquier excavación." },
      { num: "03", title: "Instalar", desc: "Nuestro equipo propio maneja toda la excavación, instalación de PVC, colocación de sumideros y rejillas, relleno y restauración del paisaje. La mayoría de las instalaciones residenciales se completan en 1 a 2 días." },
      { num: "04", title: "Verificar", desc: "Probamos todo el sistema con flujo de agua para confirmar que drena como debe. Usted lo ve funcionando antes de que nos vayamos. Respaldado por nuestra garantía de mano de obra." },
    ],
    faqEyebrow: "Preguntas Frecuentes",
    faqTitle: "Preguntas Sobre Instalación de Drenaje",
    faqs: [
      { q: "¿Cuánto cuesta la instalación de drenaje?", a: "JR One Aluminum no publica un precio fijo de drenaje para Tampa Bay, FL porque un sistema de drenaje se construye según la propiedad, no según una lista de precios. El precio depende de los pies lineales de PVC subterráneo, el número de cajas de captación y rejillas de superficie, el número de emisores emergentes, cuántos bajantes se conectan, la profundidad y longitud de la zanja, y si el recorrido tiene que cruzar entradas de auto, aceras o raíces maduras. Damos precios transparentes por partida antes de que comience cualquier trabajo. Para un número real de su propiedad, solicite una evaluación gratuita en sitio en jronegutters.com/drainage-assessment o llame al (844) 444-3114." },
      { q: "¿Cuánto tiempo toma la instalación?", a: "La mayoría de las instalaciones residenciales toman 1 a 2 días. Propiedades más grandes con múltiples sumideros y tramos subterráneos más largos pueden tomar 2 a 3 días. Le damos un cronograma específico antes de que comience el trabajo." },
      { q: "¿Instalan drenajes franceses o drenajes de canal?", a: "No. Nuestro alcance de drenaje es PVC subterráneo, sumideros, rejillas de superficie y emisores emergentes. Si su propiedad realmente necesita un drenaje francés o un drenaje de canal, se lo diremos durante la evaluación y le referiremos a un contratista que se especializa en ese alcance. No vendemos trabajo que no entregamos." },
      { q: "¿Van a destruir mi patio?", a: "Excavamos donde se necesita y restauramos la superficie después, incluyendo renivelación, resiembra de césped o reemplazo de mantillo. Minimizamos la interrupción y limpiamos completamente. Su patio se verá mejor que antes porque los problemas de drenaje estarán resueltos." },
      { q: "¿Pueden conectar el drenaje a mi sistema de canaletas existente?", a: "Sí. Es el proyecto más común que hacemos. Conectamos las líneas de PVC subterráneas a las salidas de sus bajantes existentes para que el agua del techo sea capturada y dirigida lejos de sus cimientos por completo. Frecuentemente la mejora de mayor impacto que hacemos." },
      { q: "¿Qué pasa si también necesito canaletas nuevas?", a: "Combinamos la instalación de canaletas con trabajo de drenaje regularmente. Hacer ambos al mismo tiempo es más económico y asegura que todo el sistema de manejo de agua funcione junto desde el techo hasta el punto de liberación." },
    ],
    ctaTitle: "Instale Su Sistema de Drenaje",
    ctaSub: "Deje de luchar contra el agua. Diseñaremos e instalaremos el drenaje subterráneo que su propiedad necesita, y verá la diferencia después de la próxima lluvia.",
    formTitle: "Solicite Su Presupuesto de Drenaje",
    formName: "Nombre Completo",
    formPhone: "Número de Teléfono",
    formEmail: "Correo Electrónico",
    formZip: "Código Postal",
    formBtn: "Solicitar Mi Presupuesto de Drenaje",
    formNote: "Sin spam. Sin presión. Solo consejo honesto del oficio.",
    formSent: "Solicitud de Presupuesto Recibida",
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

export default function DrainageAssessmentPage() {
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
          service: "Drainage Installation",
          page: "drainage-assessment",
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

        <section className="jr-noise-bg jr-service-hero" style={{ position: "relative", padding: "var(--jr-space-12) var(--jr-space-6) var(--jr-space-20)", backgroundImage: "linear-gradient(165deg, rgba(11,22,51,0.84) 0%, rgba(17,32,67,0.88) 55%, rgba(22,42,80,0.92) 100%), url('/images/florida-rain-gutters.webp')", backgroundSize: "cover", backgroundPosition: "center", overflow: "hidden" }}>
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
                    boxShadow: `0 4px 14px rgba(37, 99, 235, 0.32)`,
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
                    <div style={{ fontFamily: "var(--jr-font-body)", fontSize: "var(--jr-text-xs)", color: "var(--jr-muted-on-dark)", maxWidth: "160px" }}>{s.label}</div>
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
                  <div style={{ width: 52, height: 52, borderRadius: "var(--jr-radius-md)", background: "rgba(37, 99, 235, 0.10)", border: `1px solid ${ACCENT}`, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "var(--jr-space-4)" }}>
                    <span aria-hidden style={{ fontSize: 28, lineHeight: 1 }}>{p.emoji}</span>
                  </div>
                  <h3 style={{ fontFamily: "var(--jr-font-heading)", fontSize: "var(--jr-text-lg)", fontWeight: 700, color: "var(--jr-paper)", marginBottom: "var(--jr-space-2)" }}>{p.title}</h3>
                  <p style={{ fontFamily: "var(--jr-font-body)", fontSize: "var(--jr-text-md)", color: "var(--jr-muted-on-dark)", lineHeight: 1.6 }}>{p.desc}</p>
                </article>
              ))}
            </div>
          </Container>
        </section>

        {/* ── WHAT WE INSTALL ── */}
        <section style={{ background: "var(--jr-navy)", padding: "var(--jr-space-20) 0" }}>
          <Container>
            <SectionHeading eyebrow={t.installEyebrow} title={t.installTitle} subtitle={t.installSub} theme="dark" accent={ACCENT} />
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "var(--jr-space-5)" }}>
              {t.whatWeInstall.map((s, i) => (
                <article key={i} className="jr-hover-lift" style={{ background: "var(--jr-navy-deep)", border: "1px solid var(--jr-navy-3)", borderRadius: "var(--jr-radius-lg)", padding: "28px 24px" }}>
                  <div style={{ width: 52, height: 52, borderRadius: "var(--jr-radius-md)", background: "rgba(37, 99, 235, 0.10)", border: `1px solid ${ACCENT}`, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "var(--jr-space-4)" }}>
                    <span aria-hidden style={{ fontSize: 28, lineHeight: 1 }}>{s.emoji}</span>
                  </div>
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
            <SectionHeading eyebrow={t.processEyebrow} title={t.processTitle} subtitle={t.processSub} theme="dark" accent={ACCENT} />
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "var(--jr-space-5)" }}>
              {t.goldSteps.map((step) => (
                <ProcessStep key={step.num} num={step.num} title={step.title} desc={step.desc} accent={ACCENT} />
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
                      boxShadow: `0 4px 14px rgba(37, 99, 235, 0.32)`,
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
      <ServiceAreaList
        service="drainage-assessment"
        serviceLabel={lang === "es" ? "Drenaje" : "Drainage"}
        lang={lang}
      />


      <SiteFooter />
      <MobileCTA scrollTarget="quote-form" />
    </div>
  );
}
