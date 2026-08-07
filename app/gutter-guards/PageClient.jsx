"use client";

/* ═══════════════════════════════════════════════════════════
   JR ONE ALUMINUM / GUTTER GUARDS SERVICE PAGE
   Brand-brain compliant. Design-elevated.
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
import CTABand from "../../components/ui/CTABand";
import ProcessStep from "../../components/ui/ProcessStep";
import ReviewCard from "../../components/ui/ReviewCard";
import FAQAccordion from "../../components/ui/FAQAccordion";
import Peak301Alert from "../../components/ui/Peak301Alert";
import { CheckCircleIcon, PhoneIcon } from "../../lib/icons";

const T = {
  en: {
    breadcrumb: ["Home", "Services", "Gutter Guards"],
    heroTag: "GUTTER GUARD INSTALLATION",
    heroH1: "Mesh Gutter Guards in Tampa,",
    heroH1Gold: "Installed by Our Crew",
    heroP: "Gutter guards prevent leaves, pine needles, and debris from clogging your gutters and downspouts. The #1 cause of gutter failure and water damage. Guards make maintenance easier, extend your system's lifespan, and keep drainage working when Florida storms hit hardest.",
    btnEstimate: "GET YOUR FREE ESTIMATE",
    btnCall: "(844) 444-3114",
    problemTag: "WHY GUARDS MATTER",
    problemTitle: "The Real Cost of Unprotected Gutters",
    problems: [
      { title: "Debris clogs downspouts", desc: "Without guards, leaves and debris pack inside your gutters, block downspouts, and stop water flow completely. When it rains, water overflows exactly where it shouldn't. Against your fascia, walls, and foundation." },
      { title: "Standing water causes damage", desc: "Clogged gutters hold water like a trough. That weight pulls gutters away from the fascia, rots the wood behind them, and creates breeding grounds for mosquitoes and pests." },
      { title: "Constant cleaning cycle", desc: "Without guards, you're cleaning gutters 2 to 4 times per year. Climbing ladders, scooping muck, flushing downspouts. Guards dramatically reduce how often you need to clean and make the cleanings faster when you do." },
      { title: "Storm season overwhelm", desc: "Tampa's hurricane season dumps massive water volume in short bursts. Gutters packed with debris can't handle it. Guards keep the channel clear so water flows when it matters most." },
    ],
    solutionTag: "THE JR ONE WAY",
    solutionTitle: "Gutter Protection Done Right",
    solutionSub: "The right guard for the right situation. Not a one-size-fits-all sales pitch.",
    solutions: [
      { title: "Two guard tiers, matched to your trees", desc: "We install a standard aluminum gutter guard and a micromesh gutter guard. We assess your tree coverage, roof pitch, and debris type and tell you which one your home actually needs. Not just the more expensive one." },
      { title: "Micromesh is what stops pine needles", desc: "The standard aluminum guard handles leaves and larger debris. Pine needles are the test a coarser guard fails, because needles slide straight through. The micromesh tier has a finer mesh that stops them, and that is exactly why it costs more." },
      { title: "Guards plus maintenance equals complete protection", desc: "Guards keep debris out of your gutters, but surface buildup still happens over time. We offer ongoing maintenance programs to keep your guards clear and your entire system performing." },
      { title: "Retrofit to your existing gutters", desc: "Most guard systems install directly onto your current gutters without replacement. If your gutters are in good shape, we protect them. We don't force you to buy new ones." },
      { title: "New gutter and guard packages", desc: "Need new gutters too? We bundle seamless gutter installation with guard systems for maximum savings and a single-crew, single-day installation." },
      { title: "Installed by our crew, not a franchise", desc: "National gutter guard companies send salespeople to your door, then subcontract the install. We do both, the consultation and the installation, with our own trained team." },
    ],
    stats: [
      { value: "1,000+", label: "Guard installations completed" },
      { value: "80%", label: "Less cleaning with guards" },
      { value: "15-20+", label: "Year guard lifespan" },
      { value: "100%", label: "In-house installation" },
    ],
    guardEyebrow: "OUR GUARD OPTIONS",
    guardTitle: "Choose the Right Protection",
    guardSub: "Two guard systems. The only difference between them is how fine the mesh is.",
    guardTypes: [
      { icon: "🛡️", title: "Aluminum Gutter Guard", desc: "Our standard tier. Aluminum, fitted to your existing gutters, built to handle Florida's intense UV, heavy rain, and high winds without warping or rusting. It keeps leaves and larger debris out of the channel and is the right call on most homes that do not have pine.", spec: "Standard tier" },
      { icon: "✨", title: "Micromesh Gutter Guard", desc: "The upgrade tier. Same guard, finer mesh, and that finer mesh is what stops pine needles. It costs more for exactly that reason. If you have pine anywhere near the roofline, this is the one worth paying for.", spec: "Finer mesh, stops pine needles" },
    ],
    goldEyebrow: "THE GOLD STANDARD",
    goldTitle: "Our Guard Installation Process",
    goldSub: "Every home. Every time. No exceptions.",
    goldSteps: [
      { num: "01", title: "Assess", desc: "We evaluate your tree coverage, debris type, roof pitch, and existing gutter condition to recommend the right guard system for your situation." },
      { num: "02", title: "Design", desc: "Custom guard plan with the right product for each gutter run. The front of your house may need different protection than the back." },
      { num: "03", title: "Install", desc: "Our crew installs guards securely onto your gutters, ensuring proper water flow and debris shedding. Most homes done in half a day." },
      { num: "04", title: "Protect", desc: "Final inspection, flow test, and our craftsmanship warranty. We'll also set you up with a maintenance schedule to keep everything performing long-term." },
    ],
    reviewEyebrow: "REVIEWS",
    reviewTitle: "What Guard Customers Say",
    reviews: [
      { text: "Chris and his team replaced the gutters on my home with 7\" gutters, changed downspouts to address standing water issues, then installed leaf guards on them to keep them flowing well. Very satisfied with the quality.", name: "David K.", service: "Gutters + Leaf Guards", stars: 5 },
      { text: "Great experience. They fixed and added a new gutter. I couldn't be more pleased with their work and dealing with their professional and friendly staff.", name: "Johnny C.", service: "Post-Storm + Guards", stars: 5 },
      { text: "Chris and his crew are amazing! Great customer service and even better craftsmanship! Chris took the time to explain and educate me on everything before the project commenced.", name: "JR One Customer", service: "Gutter Guard Install", stars: 5 },
    ],
    faqEyebrow: "FAQ",
    faqTitle: "Gutter Guard Questions",
    faqs: [
      { q: "Do gutter guards really work?", a: "Yes. Guards are highly effective at keeping debris out of your gutters and preventing clogs in your downspouts and drainage system. That said, they're not set-and-forget. Surface debris can still accumulate on top of guards over time and needs periodic clearing. The difference is cleaning off the top of a guard is much faster and easier than scooping packed debris out of a clogged gutter by hand." },
      { q: "Do I still need to clean my gutters after guards are installed?", a: "Yes, but much less often and much more easily. Guards keep debris from getting inside your gutters and clogging your downspouts. That's the real damage-causing problem they solve. Surface buildup on top of guards still needs occasional clearing. We offer maintenance programs to handle this for you." },
      { q: "How much do gutter guards cost in Tampa?", a: "Gutter guard installation typically ranges from $7 to $18 per linear foot depending on the guard type, gutter accessibility, and whether your existing gutters need repair first. Fine-filter micro mesh systems are at the higher end. We provide detailed estimates with no hidden costs." },
      { q: "Can gutter guards be installed on my existing gutters?", a: "In most cases, yes. If your current gutters are in good condition with proper pitch and no structural damage, guards install directly on top. During our assessment, we inspect your gutters and let you know if any repairs are needed first." },
      { q: "What's the best gutter guard for pine needles?", a: "The micromesh guard is the one that stops pine needles. The standard aluminum guard has openings large enough for needles to slide through. If you have pine trees near your roofline, we will recommend the micromesh tier, which is the finer mesh." },
      { q: "What's the difference between your guards and LeafFilter?", a: "National companies like LeafFilter use high-pressure sales tactics, charge higher prices, and subcontract the actual installation to local crews. We're the local crew. You deal directly with us, get honest pricing without the franchise markup, and our team does both the consultation and the install." },
      { q: "Do you offer maintenance for gutter guards?", a: "Yes. We offer seasonal maintenance programs that include clearing any surface debris from your guards, inspecting the guard attachment points, flushing downspouts, and checking your gutter system's overall condition." },
      { q: "Are mesh gutter guards better than other types?", a: "For most Tampa homes, yes. Mesh and micro mesh guards filter the fine debris screen guards let through (pine needles, shingle grit, seed pods) while still handling Florida's heaviest downpours. Screen guards cost less and work for large leaves, but with pine or oak near the roofline mesh is the better long-term choice. We install both and recommend the right one after we look at your tree coverage and roof pitch." },
      { q: "Do you install mesh gutter guards in Wimauma and the rest of south Hillsborough?", a: "Yes. We install mesh and micro mesh guards across Tampa Bay, including Wimauma, Riverview, Sun City Center, Brandon, and the rest of south Hillsborough. Local crew based in Tampa, same team for the assessment and the install. Call (844) 444-3114." },
      { q: "How do I find a good gutter guard installer near me in Tampa?", a: "Look for an installer who does the work with their own crew instead of subcontracting it out. We are a family-owned specialty trade, over 30 years in gutters, fully insured, our own trained team on every install. No franchise markup, no high-pressure pitch." },
    ],
    ctaTitle: "READY TO PROTECT YOUR GUTTERS?",
    ctaSub: "Get your free gutter guard assessment. We'll inspect your gutters, evaluate your tree coverage, and recommend the right protection.",
    formTitle: "Get Your Free Guard Estimate",
    formName: "Full Name",
    formPhone: "Phone Number",
    formEmail: "Email Address",
    formZip: "ZIP Code",
    formBtn: "Request My Free Guard Estimate",
    formDisclaimer: "No spam. No pressure. Just honest advice.",
    formSuccess: "Quote Request Received",
    formSuccessSub: "We'll get back to you within hours.",
    preferTalk: "Prefer to talk?",
  },
  es: {
    breadcrumb: ["Inicio", "Servicios", "Protectores de Canaletas"],
    heroTag: "INSTALACIÓN DE PROTECTORES DE CANALETAS",
    heroH1: "Mantenga los Escombros Afuera.",
    heroH1Gold: "Mantenga Sus Canaletas Fluyendo.",
    heroP: "Los protectores de canaletas evitan que hojas, agujas de pino y escombros obstruyan sus canaletas y bajantes. La causa #1 de fallas en canaletas y daños por agua. Los protectores facilitan el mantenimiento, extienden la vida útil de su sistema y mantienen el drenaje funcionando cuando las tormentas de Florida golpean más fuerte.",
    btnEstimate: "OBTENGA SU ESTIMADO GRATIS",
    btnCall: "(844) 444-3114",
    problemTag: "POR QUÉ IMPORTAN",
    problemTitle: "El Costo Real de Canaletas Sin Protección",
    problems: [
      { title: "Los escombros obstruyen los bajantes", desc: "Sin protectores, las hojas y escombros se acumulan dentro de sus canaletas, bloquean los bajantes y detienen el flujo de agua completamente. Cuando llueve, el agua se desborda exactamente donde no debería. Contra su fascia, paredes y fundación." },
      { title: "El agua estancada causa daños", desc: "Las canaletas obstruidas retienen agua como un comedero. Ese peso desprende las canaletas de la fascia, pudre la madera detrás de ellas y crea criaderos de mosquitos y plagas." },
      { title: "Ciclo constante de limpieza", desc: "Sin protectores, usted limpia las canaletas 2 a 4 veces al año. Subiendo escaleras, sacando mugre, lavando bajantes. Los protectores reducen dramáticamente la frecuencia de limpieza y la hacen más rápida cuando es necesaria." },
      { title: "Temporada de tormentas desbordante", desc: "La temporada de huracanes de Tampa descarga volúmenes masivos de agua en ráfagas cortas. Las canaletas llenas de escombros no pueden manejarlo. Los protectores mantienen el canal libre para que el agua fluya cuando más importa." },
    ],
    solutionTag: "EL OFICIO ESPECIALIZADO",
    solutionTitle: "Protección de Canaletas Bien Hecha",
    solutionSub: "El protector correcto para la situación correcta. No una solución única para todos.",
    solutions: [
      { title: "Dos niveles de protector, según sus árboles", desc: "Instalamos un protector estándar de aluminio y un protector de micromalla. Evaluamos su cobertura de árboles, la inclinación del techo y el tipo de escombros, y le decimos cuál necesita su casa de verdad. No simplemente el más caro." },
      { title: "La micromalla es la que detiene las agujas de pino", desc: "El protector estándar de aluminio maneja las hojas y los escombros grandes. Las agujas de pino son la prueba que un protector más abierto no pasa, porque las agujas se cuelan directo. La micromalla tiene una malla más fina que sí las detiene, y por eso mismo cuesta más." },
      { title: "Protectores más mantenimiento es protección completa", desc: "Los protectores mantienen los escombros fuera de sus canaletas, pero la acumulación superficial ocurre con el tiempo. Ofrecemos programas de mantenimiento continuo para mantener sus protectores limpios y todo su sistema funcionando." },
      { title: "Adaptación a sus canaletas existentes", desc: "La mayoría de los sistemas de protectores se instalan directamente sobre sus canaletas actuales sin reemplazo. Si sus canaletas están en buenas condiciones, las protegemos. No lo obligamos a comprar nuevas." },
      { title: "Paquetes de canaleta nueva y protector", desc: "Necesita canaletas nuevas también? Combinamos la instalación de canaletas sin costuras con sistemas de protectores para máximo ahorro y una instalación de un solo equipo en un solo día." },
      { title: "Instalado por nuestro equipo, no una franquicia", desc: "Las empresas nacionales de protectores envían vendedores a su puerta y luego subcontratan la instalación. Nosotros hacemos ambos. La consulta y la instalación. Con nuestro propio equipo capacitado." },
    ],
    stats: [
      { value: "1,000+", label: "Instalaciones completadas" },
      { value: "80%", label: "Menos limpieza con protectores" },
      { value: "15-20+", label: "Años de vida útil" },
      { value: "100%", label: "Equipo propio" },
    ],
    guardEyebrow: "NUESTRAS OPCIONES",
    guardTitle: "Elija la Protección Correcta",
    guardSub: "Dos sistemas de protectores. Lo único que los diferencia es qué tan fina es la malla.",
    guardTypes: [
      { icon: "🛡️", title: "Protector de Aluminio", desc: "Nuestro nivel estándar. De aluminio, ajustado a sus canaletas existentes, hecho para aguantar los rayos UV intensos, las lluvias fuertes y los vientos altos de Florida sin deformarse ni oxidarse. Mantiene las hojas y los escombros grandes fuera del canal, y es la opción indicada en la mayoría de las casas que no tienen pinos.", spec: "Nivel estándar" },
      { icon: "✨", title: "Protector de Micromalla", desc: "El nivel superior. El mismo protector, con una malla más fina, y esa malla más fina es la que detiene las agujas de pino. Cuesta más por esa razón exacta. Si tiene pinos cerca de la línea del techo, este es el que vale la pena pagar.", spec: "Malla más fina, detiene agujas de pino" },
    ],
    goldEyebrow: "EL ESTÁNDAR DE ORO",
    goldTitle: "Nuestro Proceso de Instalación",
    goldSub: "Cada hogar. Cada vez. Sin excepciones.",
    goldSteps: [
      { num: "01", title: "Evaluar", desc: "Evaluamos su cobertura de árboles, tipo de escombros, inclinación del techo y condición de canaletas existentes para recomendar el sistema de protección correcto para su situación." },
      { num: "02", title: "Diseñar", desc: "Plan de protectores personalizado con el producto correcto para cada tramo de canaleta. El frente de su casa puede necesitar diferente protección que la parte trasera." },
      { num: "03", title: "Instalar", desc: "Nuestro equipo instala los protectores de forma segura sobre sus canaletas, asegurando el flujo de agua adecuado y la eliminación de escombros. La mayoría de los hogares se completan en medio día." },
      { num: "04", title: "Proteger", desc: "Inspección final, prueba de flujo y nuestra garantía de mano de obra. También lo configuraremos con un programa de mantenimiento para mantener todo funcionando a largo plazo." },
    ],
    reviewEyebrow: "RESEÑAS",
    reviewTitle: "Lo Que Dicen los Clientes",
    reviews: [
      { text: "Chris y su equipo reemplazaron las canaletas de mi casa con canaletas de 7\", cambiaron los bajantes para solucionar problemas de agua estancada y luego instalaron protectores de hojas para mantenerlas fluyendo bien. Muy satisfecho con la calidad.", name: "David K.", service: "Canaletas + Protectores de Hojas", stars: 5 },
      { text: "Gran experiencia. Arreglaron y agregaron una canaleta nueva. No podría estar más satisfecho con su trabajo y el trato de su personal profesional y amable.", name: "Johnny C.", service: "Post-Tormenta + Protectores", stars: 5 },
      { text: "Chris y su equipo son increíbles! Gran servicio al cliente y mejor calidad de trabajo aún! Chris se tomó el tiempo de explicarme y educarme sobre todo antes de que comenzara el proyecto.", name: "JR One Customer", service: "Instalación de Protectores", stars: 5 },
    ],
    faqEyebrow: "PREGUNTAS",
    faqTitle: "Preguntas Sobre Protectores",
    faqs: [
      { q: "Los protectores de canaletas realmente funcionan?", a: "Sí. Los protectores son altamente efectivos para mantener los escombros fuera de sus canaletas y prevenir obstrucciones en sus bajantes y sistema de drenaje. Dicho esto, no son instalar y olvidar. Los escombros superficiales aún pueden acumularse sobre los protectores con el tiempo y necesitan limpieza periódica." },
      { q: "Aún necesito limpiar mis canaletas después de instalar protectores?", a: "Sí, pero con mucha menos frecuencia y mucho más fácilmente. Los protectores evitan que los escombros entren en sus canaletas y obstruyan sus bajantes. Ese es el verdadero problema que causan daños y que resuelven. La acumulación superficial sobre los protectores aún necesita limpieza ocasional." },
      { q: "Cuánto cuestan los protectores en Tampa?", a: "La instalación de protectores generalmente oscila entre $7 y $18 por pie lineal dependiendo del tipo de protector, accesibilidad de la canaleta y si sus canaletas existentes necesitan reparación primero. Los sistemas de micromalla están en el extremo superior. Proporcionamos estimados detallados sin costos ocultos." },
      { q: "Se pueden instalar protectores en mis canaletas existentes?", a: "En la mayoría de los casos, sí. Si sus canaletas actuales están en buenas condiciones con la inclinación correcta y sin daño estructural, los protectores se instalan directamente encima. Durante nuestra evaluación, inspeccionamos sus canaletas y le informamos si se necesitan reparaciones primero." },
      { q: "Cuál es el mejor protector para agujas de pino?", a: "El protector de micromalla es el que detiene las agujas de pino. El protector estándar de aluminio tiene aberturas lo bastante grandes para que las agujas se cuelen. Si tiene pinos cerca de la línea del techo, le recomendaremos el nivel de micromalla, que es la malla más fina." },
      { q: "Cuál es la diferencia entre sus protectores y LeafFilter?", a: "Empresas nacionales como LeafFilter usan tácticas de venta de alta presión, cobran precios elevados y subcontratan la instalación real a equipos locales. Nosotros somos el equipo local. Usted trata directamente con nosotros, obtiene precios honestos sin el sobrecargo de franquicia." },
      { q: "Ofrecen mantenimiento para protectores?", a: "Sí. Ofrecemos programas de mantenimiento estacional que incluyen limpiar cualquier escombro superficial de sus protectores, inspeccionar los puntos de fijación, lavar los bajantes y verificar la condición general de su sistema." },
    ],
    ctaTitle: "LISTO PARA PROTEGER SUS CANALETAS?",
    ctaSub: "Obtenga su evaluación gratuita de protectores. Inspeccionaremos sus canaletas, evaluaremos su cobertura de árboles y recomendaremos la protección adecuada.",
    formTitle: "Obtenga Su Estimado Gratis",
    formName: "Nombre Completo",
    formPhone: "Número de Teléfono",
    formEmail: "Correo Electrónico",
    formZip: "Código Postal",
    formBtn: "Solicitar Mi Estimado Gratis",
    formDisclaimer: "Sin spam. Sin presión. Solo consejo honesto.",
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

const ACCENT = "#8B9DAF";
const ACCENT_LIGHT = "#A3B5C8";

export default function GutterGuardsPage({ portfolio = null }) {
  const { lang } = useLanguage();
  const t = T[lang];
  const [formData, setFormData] = useState({ name: "", phone: "", email: "", zip: "" });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formLoading, setFormLoading] = useState(false);
  const { guardFields, honeypot } = useLeadGuard();

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
          ...guardFields(),
          name: formData.name,
          phone: formData.phone,
          email: formData.email,
          service: "Gutter Guards",
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
        {/* ── BREADCRUMB ── */}
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

        {/* ── HERO ── */}
        <section
          className="jr-noise-bg jr-service-hero"
          style={{
            position: "relative",
            padding: "var(--jr-space-16) var(--jr-space-6) var(--jr-space-20)",
            backgroundImage: "linear-gradient(165deg, rgba(11,22,51,0.84) 0%, rgba(17,32,67,0.88) 55%, rgba(22,42,80,0.92) 100%), url('/images/gutter-guard-installed.webp')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            overflow: "hidden",
          }}
        >
          <div aria-hidden style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, background: "radial-gradient(ellipse at 28% 22%, rgba(200,149,46,0.08) 0%, transparent 60%)", pointerEvents: "none" }} />
          <Container>
            <div style={{ position: "relative", zIndex: 1, maxWidth: "780px" }}>
              <div style={{ fontFamily: "var(--jr-font-heading)", fontSize: "var(--jr-text-xs)", fontWeight: 700, color: ACCENT, letterSpacing: "4px", marginBottom: "var(--jr-space-4)", textTransform: "uppercase" }}>
                {t.heroTag}
              </div>
              <h1 style={{ fontFamily: "var(--jr-font-heading)", fontSize: "var(--jr-text-4xl)", fontWeight: 800, lineHeight: 1.05, marginBottom: "var(--jr-space-6)", letterSpacing: "-0.5px" }}>
                {t.heroH1}<br />
                <span style={{ color: ACCENT }}>{t.heroH1Gold}</span>
              </h1>
              <p style={{ fontFamily: "var(--jr-font-body)", fontSize: "var(--jr-text-lg)", color: "var(--jr-cream-2)", lineHeight: 1.65, marginBottom: "var(--jr-space-8)", maxWidth: "640px" }}>
                {t.heroP}
              </p>
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

        {/* ── PROBLEM ── */}
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

        {/* ── SOLUTION ── */}
        <section style={{ background: "var(--jr-navy)", padding: "var(--jr-space-20) 0" }}>
          <Container>
            <SectionHeading eyebrow={t.solutionTag} title={t.solutionTitle} subtitle={t.solutionSub} theme="dark" accent={ACCENT} />
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "var(--jr-space-5)" }}>
              {t.solutions.map((s, i) => (
                <article key={i} className="jr-hover-lift" style={{ background: "var(--jr-navy-deep)", border: "1px solid var(--jr-navy-3)", borderRadius: "var(--jr-radius-lg)", padding: "var(--jr-space-6)" }}>
                  <div style={{ fontFamily: "var(--jr-font-heading)", fontSize: "var(--jr-text-xs)", fontWeight: 700, color: ACCENT, letterSpacing: "2px", marginBottom: "var(--jr-space-2)" }}>0{i + 1}</div>
                  <h3 style={{ fontFamily: "var(--jr-font-heading)", fontSize: "var(--jr-text-lg)", fontWeight: 700, color: "var(--jr-paper)", marginBottom: "var(--jr-space-3)" }}>{s.title}</h3>
                  <p style={{ fontFamily: "var(--jr-font-body)", fontSize: "var(--jr-text-md)", color: "var(--jr-muted-on-dark)", lineHeight: 1.6 }}>{s.desc}</p>
                </article>
              ))}
            </div>
          </Container>
        </section>

        {/* ── GUARD TYPES ── */}
        <section style={{ background: "var(--jr-navy-deep)", padding: "var(--jr-space-20) 0" }}>
          <Container>
            <SectionHeading eyebrow={t.guardEyebrow} title={t.guardTitle} subtitle={t.guardSub} theme="dark" accent={ACCENT} />
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "var(--jr-space-5)" }}>
              {t.guardTypes.map((g, i) => (
                <article key={i} className="jr-hover-lift" style={{ background: "var(--jr-navy)", border: "1px solid var(--jr-navy-3)", borderRadius: "var(--jr-radius-lg)", padding: "var(--jr-space-6)", borderTop: `4px solid ${ACCENT}` }}>
                  <div style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 48, height: 48, background: `${ACCENT}1F`, borderRadius: "var(--jr-radius-md)", marginBottom: "var(--jr-space-3)" }}>
                    <span aria-hidden style={{ fontSize: 26, lineHeight: 1 }}>{g.icon}</span>
                  </div>
                  <h3 style={{ fontFamily: "var(--jr-font-heading)", fontSize: "var(--jr-text-lg)", fontWeight: 700, color: "var(--jr-paper)", marginBottom: "var(--jr-space-3)" }}>{g.title}</h3>
                  <p style={{ fontFamily: "var(--jr-font-body)", fontSize: "var(--jr-text-md)", color: "var(--jr-muted-on-dark)", lineHeight: 1.6, marginBottom: "var(--jr-space-3)" }}>{g.desc}</p>
                  <div style={{ fontFamily: "var(--jr-font-heading)", fontSize: "var(--jr-text-xs)", fontWeight: 600, color: ACCENT, letterSpacing: "1px", padding: "6px 12px", background: `${ACCENT}1F`, borderRadius: "var(--jr-radius-sm)", display: "inline-block" }}>{g.spec}</div>
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
            <SectionHeading eyebrow={t.reviewEyebrow} title={t.reviewTitle} theme="dark" accent={ACCENT} />
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "var(--jr-space-5)" }}>
              {t.reviews.map((rev, i) => <ReviewCard key={i} {...rev} />)}
            </div>
          </Container>
        </section>

        {/* ── FAQ ── */}
        <section style={{ background: "var(--jr-navy)", padding: "var(--jr-space-20) 0" }}>
          <Container size="prose">
            <SectionHeading eyebrow={t.faqEyebrow} title={t.faqTitle} theme="dark" accent={ACCENT} />
            <FAQAccordion items={t.faqs} theme="dark" accent={ACCENT} />
          </Container>
        </section>

        {/* ── PEAK 301 ALERT ── */}
        <Peak301Alert />

        {/* ── QUOTE FORM ── */}
        <section id="quote-form" style={{ background: "linear-gradient(165deg, var(--jr-navy), var(--jr-navy-2))", padding: "var(--jr-space-20) 0" }}>
          <Container size="narrow">
            <div style={{ textAlign: "center", marginBottom: "var(--jr-space-10)" }}>
              <h2 style={{ fontFamily: "var(--jr-font-heading)", fontSize: "var(--jr-text-3xl)", fontWeight: 800, color: "var(--jr-paper)", marginBottom: "var(--jr-space-3)", letterSpacing: "1px" }}>{t.ctaTitle}</h2>
              <p style={{ fontFamily: "var(--jr-font-body)", fontSize: "var(--jr-text-lg)", color: "var(--jr-cream-2)", lineHeight: 1.6 }}>{t.ctaSub}</p>
            </div>
            <div style={{ maxWidth: "560px", margin: "0 auto" }}>
              {formSubmitted ? (
                <div style={{ background: "var(--jr-success-soft)", border: "1px solid var(--jr-success)", borderRadius: "var(--jr-radius-xl)", padding: "var(--jr-space-8)", textAlign: "center" }}>
                  <div style={{ display: "inline-flex", color: "var(--jr-success)", marginBottom: "var(--jr-space-3)" }}>
                    <CheckCircleIcon size={48} />
                  </div>
                  <h3 style={{ fontFamily: "var(--jr-font-heading)", fontSize: "var(--jr-text-xl)", fontWeight: 700, color: "var(--jr-paper)", marginBottom: "var(--jr-space-2)" }}>{t.formSuccess}</h3>
                  <p style={{ fontFamily: "var(--jr-font-body)", fontSize: "var(--jr-text-md)", color: "var(--jr-muted-on-dark)" }}>{t.formSuccessSub}</p>
                </div>
              ) : (
                <form onSubmit={handleForm} style={{ background: "var(--jr-paper)", borderRadius: "var(--jr-radius-xl)", padding: "var(--jr-space-8) var(--jr-space-6)", boxShadow: "var(--jr-shadow-form)" }}>
                  {honeypot}
                  <h3 style={{ fontFamily: "var(--jr-font-heading)", fontSize: "var(--jr-text-xl)", fontWeight: 700, color: "var(--jr-navy)", textAlign: "center", marginBottom: "var(--jr-space-1)" }}>{t.formTitle}</h3>
                  <div aria-hidden style={{ width: 40, height: 3, background: ACCENT, borderRadius: 2, margin: "10px auto var(--jr-space-5)" }} />
                  <input aria-label={t.formName} style={inputStyle} placeholder={t.formName} value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required />
                  <input aria-label={t.formPhone} style={inputStyle} placeholder={t.formPhone} type="tel" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} required />
                  <input aria-label={t.formEmail} style={inputStyle} placeholder={t.formEmail} type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
                  <input aria-label={t.formZip} style={inputStyle} placeholder={t.formZip} value={formData.zip} onChange={(e) => setFormData({ ...formData, zip: e.target.value })} maxLength={5} />
                  <Button type="submit" variant="primary" size="md" fullWidth iconRight disabled={formLoading} accent={ACCENT} accentLight={ACCENT_LIGHT}>
                    {formLoading ? "Sending..." : t.formBtn}
                  </Button>
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

        {/* ── FINAL CTA BAND ── */}
        <CTABand
          title={lang === "en" ? "Ready to Stop Climbing Ladders?" : "Listo Para Dejar de Subir Escaleras?"}
          sub={lang === "en" ? "Get your free guard assessment today. We respond within hours." : "Obtenga su evaluación gratuita hoy. Respondemos en horas."}
          primaryLabel={lang === "en" ? "Request a Quote" : "Solicitar Cotización"}
          primaryHref="#quote-form"
          accent={ACCENT}
          accentLight={ACCENT_LIGHT}
        />
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
        service="gutter-guards"
        serviceLabel={lang === "es" ? "Protectores de Canaletas" : "Gutter Guards"}
        lang={lang}
      />


      <SiteFooter />
      <MobileCTA scrollTarget="quote-form" />
    </div>
  );
}
