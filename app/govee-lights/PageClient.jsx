"use client";

/* ═══════════════════════════════════════════════════════════
   JR ONE ALUMINUM: GOVEE SMART LIGHT INSTALLATION
   Brand-brain compliant. Tokens via app/tokens.css.
   ═══════════════════════════════════════════════════════════ */

import { useState } from "react";
import { useLanguage } from "../../lib/LanguageContext";
import { useLeadGuard } from "../../lib/lead-guard";
import { submitLeadForm, SUBMIT_ERROR_STYLE } from "../../lib/lead-submit";
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

// Page-identity accent: govee smart-light purple (LED color spectrum).
const ACCENT = "#9333EA";
const ACCENT_LIGHT = "#A855F7";

const T = {
  en: {
    breadcrumb: ["Home", "Services", "Govee Lights"],
    heroTag: "SMART LED INSTALLATION",
    heroH1a: "Govee Smart Lights,",
    heroH1b: "Professionally Installed.",
    heroP: "You buy the Govee LED strip lights. We mount them cleanly, securely, and discreetly along your roofline or exterior, with the same precision we bring to every aluminum installation. No DIY ladder risks. No sloppy mounting. Just clean, professional results.",
    heroCta: "Get Your Free Estimate",
    heroCall: "Call (844) 444-3114",
    stats: [
      { value: "500+", label: "LED installations completed" },
      { value: "100%", label: "Mechanically secured" },
      { value: "1 day", label: "Most installs completed" },
      { value: "100%", label: "In-house installation" },
    ],
    problemEyebrow: "The Problem",
    problemTitle: "Why DIY LED Installation Fails",
    problems: [
      { emoji: "🔥", title: "Adhesive melts in Florida heat", desc: "Tampa's 95-degree summers soften adhesive-only LED mounting within months. Strips sag, peel, and fall off your roofline, leaving residue on your fascia and lights dangling from your house." },
      { emoji: "📐", title: "Crooked, uneven lines", desc: "Without professional tools and a trained eye, DIY LED strips end up wavy, misaligned, and visually distracting. The whole point of accent lighting is a clean, seamless line, not a craft project gone wrong." },
      { emoji: "🪜", title: "Ladder safety risks", desc: "Roofline LED installation means working at height on ladders, the same height that sends thousands of homeowners to the ER every year. One wrong step on a wet Florida morning and you're a statistic." },
      { emoji: "🔧", title: "Gaps and connectivity issues", desc: "DIY installations often leave visible gaps between strip segments, exposed wiring, and controllers mounted in awkward locations. Poor connections mean zones that don't respond and lights that flicker or fail." },
    ],
    solutionEyebrow: "The JR One Difference",
    solutionTitle: "Smart-Light Installation Done Right",
    solutionSub: "Professional mounting built for Florida, not a DIY adhesive job that falls apart in the heat.",
    solutions: [
      { title: "Mechanically secured mounting", desc: "We don't rely on adhesive alone. Our crew mechanically fastens LED strips to your roofline so they stay put through 95-degree summers, thunderstorms, and hurricane-force winds. Built for Florida, not a living room." },
      { title: "Clean, invisible hardware", desc: "The whole point of accent lighting is the effect, not the hardware. We mount strips discreetly with hidden fasteners so you see the light, not the installation. No exposed wires. No visible clips." },
      { title: "Roofline experience already on the truck", desc: "We install gutters, soffit, and fascia every day. Running LED strips along a roofline is a natural extension of what we already do, with the equipment, safety gear, and trade experience already on the truck." },
      { title: "Setup and connectivity included", desc: "Basic setup and app connectivity are included with every installation. We make sure the lights power on, connect to your app, and the zones are working before we leave your property." },
      { title: "Multi-story capability", desc: "Two-story and multi-level homes are no problem. We have the ladders, scaffolding, and safety equipment to reach every roofline safely. Something most homeowners simply can't do on their own." },
      { title: "One crew, one visit, done right", desc: "No subcontractors. No return trips. Our trained team handles your entire installation in a single visit with the same craftsmanship standard we bring to every aluminum job." },
    ],
    peakAlertLabel: "Florida Insurance Alert",
    peakAlertTitle: "280% Increase in Non-Renewals. Roof Over 15 Years Old?",
    peakAlertDesc: "Peak 301 restores shingles from the inside out. Adds 6 to 10 years of roof life for up to 70% less than a new roof install.",
    peakBtn: "Peak 301 Info",
    peakRights: "Your Rights",
    goldEyebrow: "The Gold Standard",
    goldTitle: "Our Installation Process",
    goldSub: "Every home. Every time. No exceptions.",
    goldSteps: [
      { num: "01", title: "Consult", desc: "Tell us about your home, your Govee lights, and where you want them mounted. We'll give you a quick quote based on your measurements and accessibility. Most estimates take under 5 minutes." },
      { num: "02", title: "Plan", desc: "We map your roofline, identify mounting points, plan wire routing, and determine the cleanest installation path. Every home is different. We plan for yours specifically." },
      { num: "03", title: "Install", desc: "Our crew mounts your LED strips with professional hardware, routes wiring cleanly, and secures every connection point. Most homes completed in a single visit." },
      { num: "04", title: "Enjoy", desc: "Final walkthrough, app connectivity test, and zone check. We make sure everything works perfectly before we leave. Control your lights from your phone for holidays, parties, security, and everyday ambiance." },
    ],
    reviewsEyebrow: "Reviews",
    reviewsTitle: "What Our Customers Say",
    reviews: [
      { text: "Chris and his crew are amazing. Great customer service and even better craftsmanship. Chris took the time to explain and educate me on everything before the project commenced.", name: "JR One Customer", service: "Professional Install", stars: 5 },
      { text: "Great experience. They fixed and added a new gutter. I couldn't be more pleased with their work and dealing with their professional and friendly staff.", name: "Johnny C.", service: "Exterior Work", stars: 5 },
      { text: "Very satisfied with the quality. Professional team that showed up on time and got the job done right the first time. Would definitely recommend.", name: "David K.", service: "Roofline Installation", stars: 5 },
    ],
    faqEyebrow: "FAQ",
    faqTitle: "Govee Light Installation Questions",
    faqs: [
      { q: "Do I need to buy the Govee lights myself?", a: "Yes. You purchase the Govee smart LED strip lights, controller, and any accessories you want. You pick the exact product, color options, and features. We handle the professional mounting and installation only. This keeps your costs transparent and lets you choose exactly the system you want." },
      { q: "Why not just use the adhesive backing that comes with the lights?", a: "Tampa's heat softens adhesive-only mounting within months. Strips sag, peel, and fall off, especially on south-facing rooflines that get direct sun all day. We mechanically secure every strip so it stays put through Florida summers, storms, and hurricane-force winds." },
      { q: "How much does professional Govee light installation cost?", a: "Pricing is based on your home's specific measurements, roofline accessibility, and number of stories. Most estimates take under 5 minutes over the phone. Call us at (844) 444-3114 for a quick quote." },
      { q: "Can you install lights on a two-story home?", a: "Yes. Multi-story homes are no problem. We have the ladders, scaffolding, and safety equipment to reach every roofline safely. This is exactly the kind of work we do every day on gutter and soffit installations." },
      { q: "Do you set up the app and connectivity?", a: "Yes. Basic setup and app connectivity are included with every installation. We make sure the lights power on, connect to your phone, and the zones are working correctly before we leave." },
      { q: "What areas of the home can you install lights on?", a: "We install along rooflines, eaves, soffits, fascia boards, garage frames, and other exterior mounting surfaces. During your consultation, we'll discuss exactly where you want the lights and plan the cleanest installation path." },
      { q: "How long does installation take?", a: "Most residential Govee light installations are completed in a single visit, typically half a day depending on the size of your home and complexity of the roofline. We'll give you a time estimate during your consultation." },
    ],
    ctaTitle: "Ready to Light Up Your Home?",
    ctaSub: "Get your free installation quote. Tell us about your home and your Govee lights. We'll handle the rest with the same craftsmanship we bring to every job.",
    formTitle: "Get Your Free Installation Quote",
    formName: "Full Name",
    formPhone: "Phone Number",
    formEmail: "Email Address",
    formZip: "ZIP Code",
    formBtn: "Request My Free Installation Quote",
    formNote: "No spam. No pressure. Just honest advice from the trade.",
    formSent: "Quote Request Received",
    formSentSub: "We'll get back to you within hours.",
  },
  es: {
    breadcrumb: ["Inicio", "Servicios", "Luces Govee"],
    heroTag: "INSTALACIÓN DE LED INTELIGENTES",
    heroH1a: "Luces Inteligentes Govee,",
    heroH1b: "Instaladas Profesionalmente.",
    heroP: "Usted compra las tiras de luces LED Govee. Nosotros las montamos limpia, segura y discretamente a lo largo de su línea de techo o exterior, con la misma precisión que llevamos a cada instalación de aluminio. Sin riesgos de escaleras. Sin montaje descuidado. Solo resultados limpios y profesionales.",
    heroCta: "Obtenga Su Presupuesto Gratuito",
    heroCall: "Llame al (844) 444-3114",
    stats: [
      { value: "500+", label: "Instalaciones LED completadas" },
      { value: "100%", label: "Asegurado mecánicamente" },
      { value: "1 día", label: "Mayoría de instalaciones" },
      { value: "100%", label: "Instalación propia" },
    ],
    problemEyebrow: "El Problema",
    problemTitle: "Por Qué la Instalación LED Casera Falla",
    problems: [
      { emoji: "🔥", title: "El adhesivo se derrite con el calor de Florida", desc: "Los veranos de 95 grados en Tampa ablandan el montaje solo con adhesivo en meses. Las tiras se caen, se despegan y cuelgan de su techo, dejando residuos en su fascia y luces colgando de su casa." },
      { emoji: "📐", title: "Líneas torcidas y desiguales", desc: "Sin herramientas profesionales y ojo entrenado, las tiras LED quedan onduladas, desalineadas y visualmente distractoras. El propósito de la iluminación de acento es una línea limpia y continua, no un proyecto casero que salió mal." },
      { emoji: "🪜", title: "Riesgos de seguridad con escaleras", desc: "La instalación LED en la línea del techo significa trabajar en altura sobre escaleras, la misma altura que envía a miles de propietarios a urgencias cada año. Un paso en falso en una mañana húmeda de Florida y usted es una estadística." },
      { emoji: "🔧", title: "Espacios y problemas de conectividad", desc: "Las instalaciones caseras frecuentemente dejan espacios visibles entre segmentos de tiras, cableado expuesto y controladores montados en lugares incómodos. Las malas conexiones significan zonas que no responden y luces que parpadean o fallan." },
    ],
    solutionEyebrow: "La Diferencia JR One",
    solutionTitle: "Instalación de Luces Inteligentes Hecha Bien",
    solutionSub: "Montaje profesional construido para Florida, no un trabajo casero con adhesivo que se cae con el calor.",
    solutions: [
      { title: "Montaje asegurado mecánicamente", desc: "No dependemos solo del adhesivo. Nuestro equipo fija mecánicamente las tiras LED a su línea de techo para que permanezcan en su lugar durante veranos de 95 grados, tormentas y vientos de huracán. Construido para Florida, no para una sala de estar." },
      { title: "Hardware limpio e invisible", desc: "El propósito de la iluminación de acento es el efecto, no el hardware. Montamos las tiras discretamente con sujetadores ocultos para que vea la luz, no la instalación. Sin cables expuestos. Sin clips visibles." },
      { title: "Experiencia en líneas de techo en el camión", desc: "Instalamos canaletas, sofito y fascia todos los días. Colocar tiras LED a lo largo de una línea de techo es una extensión natural de lo que ya hacemos, con el equipo, el equipo de seguridad y la experiencia del oficio ya en el camión." },
      { title: "Configuración y conectividad incluidas", desc: "La configuración básica y conectividad de la app están incluidas con cada instalación. Nos aseguramos de que las luces enciendan, se conecten a su app y las zonas funcionen antes de irnos de su propiedad." },
      { title: "Capacidad para múltiples pisos", desc: "Casas de dos pisos y multinivel no son problema. Tenemos las escaleras, andamios y equipo de seguridad para alcanzar cada línea de techo de forma segura. Algo que la mayoría de los propietarios simplemente no pueden hacer por su cuenta." },
      { title: "Un equipo, una visita, bien hecho", desc: "Sin subcontratistas. Sin visitas de retorno. Nuestro equipo capacitado maneja toda su instalación en una sola visita con el mismo estándar de artesanía que llevamos a cada trabajo de aluminio." },
    ],
    peakAlertLabel: "Alerta de Seguros de Florida",
    peakAlertTitle: "280% de Aumento en No Renovaciones. ¿Techo de Más de 15 Años?",
    peakAlertDesc: "Peak 301 restaura las tejas desde adentro. Agrega 6 a 10 años de vida al techo por hasta 70% menos que un techo nuevo.",
    peakBtn: "Info Peak 301",
    peakRights: "Sus Derechos",
    goldEyebrow: "El Estándar de Oro",
    goldTitle: "Nuestro Proceso de Instalación",
    goldSub: "Cada casa. Cada vez. Sin excepciones.",
    goldSteps: [
      { num: "01", title: "Consultar", desc: "Cuéntenos sobre su casa, sus luces Govee y dónde quiere montarlas. Le daremos un presupuesto rápido basado en sus medidas y accesibilidad. La mayoría de los presupuestos toman menos de 5 minutos." },
      { num: "02", title: "Planificar", desc: "Mapeamos su línea de techo, identificamos puntos de montaje, planificamos la ruta del cableado y determinamos la ruta de instalación más limpia. Cada casa es diferente. Planificamos para la suya específicamente." },
      { num: "03", title: "Instalar", desc: "Nuestro equipo monta sus tiras LED con hardware profesional, enruta el cableado limpiamente y asegura cada punto de conexión. La mayoría de las casas se completan en una sola visita." },
      { num: "04", title: "Disfrutar", desc: "Recorrido final, prueba de conectividad de la app y verificación de zonas. Nos aseguramos de que todo funcione perfectamente antes de irnos. Controle sus luces desde su teléfono para fiestas, días festivos, seguridad y ambiente diario." },
    ],
    reviewsEyebrow: "Reseñas",
    reviewsTitle: "Lo Que Dicen Nuestros Clientes",
    reviews: [
      { text: "Chris y su equipo son increíbles. Gran servicio al cliente y artesanía aún mejor. Chris se tomó el tiempo de explicarme y educarme sobre todo antes de que comenzara el proyecto.", name: "Cliente de JR One", service: "Instalación Profesional", stars: 5 },
      { text: "Gran experiencia. Arreglaron y agregaron un canalón nuevo. No podría estar más satisfecho con su trabajo y trato con su personal profesional y amable.", name: "Johnny C.", service: "Trabajo Exterior", stars: 5 },
      { text: "Muy satisfecho con la calidad. Equipo profesional que llegó a tiempo e hizo el trabajo bien la primera vez. Definitivamente los recomendaría.", name: "David K.", service: "Instalación en Línea de Techo", stars: 5 },
    ],
    faqEyebrow: "Preguntas Frecuentes",
    faqTitle: "Preguntas Sobre Instalación de Luces Govee",
    faqs: [
      { q: "¿Necesito comprar las luces Govee yo mismo?", a: "Sí. Usted compra las tiras LED inteligentes Govee, el controlador y cualquier accesorio que desee. Usted elige el producto exacto, opciones de color y características. Nosotros nos encargamos del montaje e instalación profesional solamente. Esto mantiene sus costos transparentes y le permite elegir exactamente el sistema que quiere." },
      { q: "¿Por qué no usar el adhesivo que viene con las luces?", a: "El calor de Tampa ablanda el montaje solo con adhesivo en meses. Las tiras se caen y se despegan, especialmente en líneas de techo orientadas al sur que reciben sol directo todo el día. Aseguramos mecánicamente cada tira para que permanezca en su lugar durante los veranos de Florida, tormentas y vientos de huracán." },
      { q: "¿Cuánto cuesta la instalación profesional de luces Govee?", a: "El precio se basa en las medidas específicas de su casa, accesibilidad de la línea de techo y número de pisos. La mayoría de los presupuestos toman menos de 5 minutos por teléfono. Llámenos al (844) 444-3114 para un presupuesto rápido." },
      { q: "¿Pueden instalar luces en una casa de dos pisos?", a: "Sí. Las casas de múltiples pisos no son problema. Tenemos las escaleras profesionales, andamios y equipo de seguridad para alcanzar cada línea de techo de forma segura. Este es exactamente el tipo de trabajo que hacemos todos los días en instalaciones de canaletas y sofito." },
      { q: "¿Configuran la app y la conectividad?", a: "Sí. La configuración básica y conectividad de la app están incluidas con cada instalación. Nos aseguramos de que las luces enciendan, se conecten a su teléfono y las zonas funcionen correctamente antes de irnos." },
      { q: "¿En qué áreas de la casa pueden instalar luces?", a: "Instalamos a lo largo de líneas de techo, aleros, sofitos, tablas de fascia, marcos de garaje y otras superficies de montaje exteriores. Durante su consulta, discutiremos exactamente dónde quiere las luces y planificaremos la ruta de instalación más limpia." },
      { q: "¿Cuánto tiempo toma la instalación?", a: "La mayoría de las instalaciones residenciales de luces Govee se completan en una sola visita, generalmente medio día dependiendo del tamaño de su casa y la complejidad de la línea de techo. Le daremos un estimado de tiempo durante su consulta." },
    ],
    ctaTitle: "¿Listo para Iluminar Su Hogar?",
    ctaSub: "Obtenga su presupuesto de instalación gratuito. Cuéntenos sobre su casa y sus luces Govee. Nosotros nos encargamos del resto con la misma artesanía que llevamos a cada trabajo.",
    formTitle: "Obtenga Su Presupuesto de Instalación",
    formName: "Nombre Completo",
    formPhone: "Número de Teléfono",
    formEmail: "Correo Electrónico",
    formZip: "Código Postal",
    formBtn: "Solicitar Mi Presupuesto",
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

export default function GoveeLightsPage({ portfolio = null }) {
  const { lang } = useLanguage();
  const t = T[lang];
  const [formData, setFormData] = useState({ name: "", phone: "", email: "", zip: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState("");
  const { guardFields, honeypot } = useLeadGuard();

  const handleForm = async (e) => {
    e?.preventDefault?.();
    if (!formData.name || !formData.phone) return;
    setFormError("");
    setLoading(true);
    try {
      const params = new URLSearchParams(window.location.search);
      const result = await submitLeadForm({
        formId: "govee-lights",
        lang,
        body: {
          ...guardFields(),
          name: formData.name,
          phone: formData.phone,
          email: formData.email,
          zip: formData.zip,
          service: "Govee Lights",
          page: "govee-lights",
          gclid: params.get("gclid") || "",
          utm_source: params.get("utm_source") || "",
          utm_medium: params.get("utm_medium") || "",
          utm_campaign: params.get("utm_campaign") || "",
          utm_term: params.get("utm_term") || "",
        },
      });
      if (result.ok) setSubmitted(true);
      else setFormError(result.message);
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

        <section className="jr-noise-bg jr-service-hero" style={{ position: "relative", padding: "var(--jr-space-12) var(--jr-space-6) var(--jr-space-20)", backgroundImage: "linear-gradient(165deg, rgba(11,22,51,0.84) 0%, rgba(17,32,67,0.88) 55%, rgba(22,42,80,0.92) 100%), url('/images/govee-lights-hero-v2.webp')", backgroundSize: "cover", backgroundPosition: "center", overflow: "hidden" }}>
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
                    boxShadow: `0 4px 14px rgba(147, 51, 234, 0.32)`,
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
                  <div style={{ width: 52, height: 52, borderRadius: "var(--jr-radius-md)", background: "rgba(147, 51, 234, 0.10)", border: `1px solid ${ACCENT}`, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "var(--jr-space-4)" }}>
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
                      boxShadow: `0 4px 14px rgba(147, 51, 234, 0.32)`,
                    }}
                  >
                    {loading ? "Sending..." : t.formBtn}
                  </Button>
                  {formError ? (
                    <p role="alert" style={SUBMIT_ERROR_STYLE}>{formError}</p>
                  ) : null}
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

      <SiteFooter />
      <MobileCTA scrollTarget="quote-form" />
    </div>
  );
}
