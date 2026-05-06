"use client";

/* ═══════════════════════════════════════════════════════════
   JR ONE ALUMINUM | HOA MAINTENANCE CONTRACTS
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
import ReviewCard from "../../components/ui/ReviewCard";
import FAQAccordion from "../../components/ui/FAQAccordion";
import CTABand from "../../components/ui/CTABand";
import {
  CheckCircleIcon,
  PhoneIcon,
  MapPinIcon,
  HouseIcon,
  WaterDropIcon,
  ShieldIcon,
  WrenchIcon,
  RoofEdgeIcon,
  BroomIcon,
  HardHatIcon,
} from "../../lib/icons";

const PROBLEM_ICONS = [HouseIcon, WaterDropIcon, ShieldIcon, HardHatIcon];
const SCOPE_ICONS = [BroomIcon, ShieldIcon, WrenchIcon, RoofEdgeIcon, WaterDropIcon, HardHatIcon];

const T = {
  en: {
    breadcrumb: ["Home", "Services", "HOA Contracts"],
    heroTag: "HOA MAINTENANCE CONTRACTS",
    heroH1: "The Aluminum Contractor",
    heroH1Gold: "HOAs Keep on Speed Dial",
    heroP: "JR One handles gutter, soffit, fascia, and aluminum upkeep across Tampa Bay's managed communities. One contract, one crew, one point of contact for the property manager. Bilingual, insured, and reliable enough to put on the community calendar.",
    btnEstimate: "Request an HOA Walkthrough",
    btnCall: "Call (844) 444-3114",
    problemEyebrow: "WHY HOAs CALL US",
    problemTitle: "What Breaks Down in a Managed Community",
    problems: [
      { title: "Scattered single-home vendors", desc: "Most HOAs end up with 4 to 5 handymen covering 200 homes. Quality drifts, pricing drifts, and nobody can tell the property manager what's actually been done street by street." },
      { title: "Post-storm volume nobody can handle", desc: "After every named storm, HOAs get flooded with calls about sagging gutters, blown soffit panels, and detached fascia. A single handyman with a ladder can't process 40 units in a week." },
      { title: "Missed preventive cycles", desc: "Gutter cleaning, soffit inspection, and fascia checks skip a season. Rot spreads behind walls. Eighteen months later the HOA is looking at a special assessment nobody wanted." },
      { title: "Language friction with residents", desc: "Tampa's HOA resident population is heavily bilingual. Crews that only speak English miss half the conversation, and half the issues never get reported cleanly." },
    ],
    solutionEyebrow: "THE JR ONE HOA DIFFERENCE",
    solutionTitle: "How We Work With HOAs and Property Managers",
    solutionSub: "One contract, one vendor, one relationship, built for communities, not drive-by service calls.",
    solutions: [
      { title: "Community-wide scheduled maintenance", desc: "Semi-annual or quarterly gutter cleaning, soffit and fascia inspection, downspout flushing, and flow testing across every unit in the community, on a schedule the property manager can publish in the newsletter." },
      { title: "Single-point manager reporting", desc: "After every service cycle we deliver a unit-by-unit report: what was cleaned, what was flagged, photos of issues found, and recommended follow-ups. The property manager forwards it to the board, not a shoebox of invoices." },
      { title: "Community-wide pricing, not per-house retail", desc: "HOA contracts get volume pricing because we route crews community by community, not drive-out per house. The savings vs. individual homeowners booking us one at a time is real." },
      { title: "Bilingual crews end-to-end", desc: "Every JR One crew is fully bilingual EN and ES. Residents get clear answers in the language they speak. Property managers get one English contact who owns the account." },
      { title: "Storm-response priority for contracted HOAs", desc: "After a named storm we prioritize contracted HOAs ahead of the retail queue. Your community doesn't wait three weeks because we routed one-off jobs first." },
      { title: "Specialty trade, not a generalist", desc: "Gutters, soffit, fascia, aluminum trim, drainage. We do one thing and we do it across thousands of homes. No roofer-subcontracts-the-gutter-guy handoff, no quality drift." },
    ],
    stats: [
      { value: "25+", label: "HOA & managed communities served" },
      { value: "30+", label: "Years of Tampa Bay aluminum work" },
      { value: "48h", label: "Typical walkthrough turnaround" },
      { value: "100%", label: "In-house bilingual crews" },
    ],
    scopeEyebrow: "WHAT'S IN THE CONTRACT",
    scopeTitle: "Services Covered in an HOA Agreement",
    scopeSub: "Build your contract from any combination of these. Priced per unit, per LF, or per community based on your scope.",
    scopeItems: [
      { title: "Gutter cleaning & downspout flushing", desc: "Full debris removal and downspout clearing across every unit on a scheduled cadence (quarterly, semi-annual, or post-storm)." },
      { title: "Gutter, soffit & fascia inspection", desc: "Walkthrough inspection with photo documentation of sagging hangers, loose panels, rotted fascia, and failed seams. Flagged before they turn into community-wide issues." },
      { title: "Gutter repair & re-pitching", desc: "Resealing, hanger replacement, and pitch correction on gutters that are still serviceable but starting to fail." },
      { title: "Soffit & fascia panel replacement", desc: "Per-unit replacement of wind-damaged or rotted aluminum panels and fascia wraps, color-matched to community spec." },
      { title: "Downspout reroute & drainage fixes", desc: "Correcting drainage problems that erode landscaping, flood sidewalks, or pool water at foundations. A constant HOA complaint driver." },
      { title: "Post-storm rapid response", desc: "Within 72 hours of a named storm we walk the community, document damage, and coordinate the repair queue with the property manager." },
    ],
    coverageLabel: "TAMPA BAY COVERAGE",
    coverageTitle: "We serve HOAs across 5 counties and 21 cities.",
    coverageDesc: "Hillsborough, Pinellas, Pasco, Manatee, and Sarasota. Tampa, Clearwater, St. Pete, Sarasota, Bradenton, Lakeland, Brandon, Wesley Chapel, Riverview, Palm Harbor, Temple Terrace, and more.",
    coverageBtn: "Contact",
    goldEyebrow: "THE GOLD STANDARD",
    goldTitle: "How We Onboard an HOA",
    goldMotto: "One walkthrough. One contract. One vendor the board trusts.",
    goldSteps: [
      { num: "01", title: "Walkthrough", desc: "Free community-wide walkthrough with the property manager. We document unit count, gutter linear feet, soffit condition, and the current pain points the board is hearing about." },
      { num: "02", title: "Scope", desc: "Custom scope built from the service menu above. Quarterly cleaning, semi-annual inspection, post-storm response, whatever the community actually needs. No one-size contract." },
      { num: "03", title: "Agreement", desc: "Transparent contract with unit-level pricing, service cadence, reporting format, and escalation path. The board approves, and we lock it in." },
      { num: "04", title: "Execute & Report", desc: "We execute on schedule and deliver a unit-by-unit report after every cycle. The property manager forwards it to the board. No surprises, no unknowns." },
    ],
    reviewEyebrow: "PROPERTY MANAGER REVIEWS",
    reviewTitle: "What HOA Boards and PMs Say",
    reviews: [
      { text: "We had three different handymen covering 180 homes. Switched the whole aluminum side over to JR One and the number of resident complaints dropped in a month. One point of contact made it sustainable.", name: "Community Manager", service: "Hillsborough HOA", stars: 5 },
      { text: "After Hurricane Idalia we had panels blown off 40-plus units. JR One walked the community in 48 hours and had a prioritized repair queue we could share with the board. That kind of response is rare.", name: "HOA Board Member", service: "Pinellas Townhome Community", stars: 5 },
      { text: "The bilingual piece matters more than people realize. Our residents felt heard. That alone changed the dynamic on service days.", name: "Property Manager", service: "South Tampa Community", stars: 5 },
    ],
    faqEyebrow: "FAQ",
    faqTitle: "HOA Maintenance Contract Questions",
    faqs: [
      { q: "What size HOA do you take on?", a: "We work with communities from 12-unit townhome groups up to 400+ unit master-planned associations. Below 12 units we typically recommend individual service calls rather than a contract. Above 400 we split the community into service zones for efficient routing." },
      { q: "How is HOA pricing structured?", a: "Pricing is custom per community based on unit count, gutter linear footage, roof accessibility, and scope (cleaning only vs. full maintenance). Most HOAs land on a fixed monthly or quarterly retainer that covers the scheduled scope, with a transparent per-unit rate for out-of-scope repairs." },
      { q: "Do you require a multi-year contract?", a: "No. Most of our HOA contracts are annual with a renewal review. We'd rather earn the renewal every year than lock boards into a long-term deal they can't get out of." },
      { q: "Can you coordinate with our existing roofing vendor?", a: "Yes. We coordinate directly with roofing contractors, painters, and landscapers when scopes overlap, particularly on soffit and fascia work that touches the roofline. We've worked alongside most of Tampa's larger exterior trades." },
      { q: "What about post-storm emergency response?", a: "Contracted HOAs get priority ahead of our retail queue. Within 72 hours of a named storm we walk the community, document damage, and provide the property manager with a prioritized repair list ready for board review or insurance claim support." },
      { q: "Are your crews insured for HOA work?", a: "Yes. JR One Aluminum carries full general liability and workers' compensation coverage. We provide certificates of insurance directly to the property manager or management company on request, with the HOA named as additional insured where required." },
      { q: "Can you provide reporting the board will understand?", a: "Every service cycle ends with a unit-by-unit report: what was done, what was flagged, photos of any issues found, and recommended follow-ups. It's written for board-meeting consumption, not just billing." },
    ],
    ctaTitle: "Ready to Simplify Your HOA's Aluminum Maintenance?",
    ctaSub: "Request a free community walkthrough. We'll meet the property manager on-site, assess the scope, and put a transparent contract in front of the board, with no obligation.",
    formTitle: "Request an HOA Walkthrough",
    formName: "Property Manager Name",
    formPhone: "Phone Number",
    formEmail: "Email Address",
    formZip: "Community ZIP Code",
    formBtn: "Request Free Walkthrough",
    formDisclaimer: "No spam. No pressure. Direct conversation with the owner.",
    formSuccess: "Walkthrough Request Received",
    formSuccessSub: "We'll get back to you within one business day.",
    preferTalk: "Prefer to talk?",
  },
  es: {
    breadcrumb: ["Inicio", "Servicios", "Contratos HOA"],
    heroTag: "CONTRATOS DE MANTENIMIENTO HOA",
    heroH1: "El Contratista de Aluminio",
    heroH1Gold: "Que las HOAs Tienen en Marcado Rapido",
    heroP: "JR One maneja canaletas, sofito, fascia y mantenimiento de aluminio en las comunidades administradas de Tampa Bay. Un contrato, un equipo, un punto de contacto para el administrador. Bilingue, asegurado, y confiable para poner en el calendario comunitario.",
    btnEstimate: "Solicite un Recorrido HOA",
    btnCall: "Llame al (844) 444-3114",
    problemEyebrow: "POR QUE NOS LLAMAN LAS HOAs",
    problemTitle: "Lo Que Se Rompe en una Comunidad Administrada",
    problems: [
      { title: "Vendedores sueltos casa por casa", desc: "La mayoria de las HOAs terminan con 4 a 5 trabajadores cubriendo 200 casas. La calidad se dispersa, los precios se dispersan, y nadie puede decirle al administrador que se hizo exactamente en cada calle." },
      { title: "Volumen post-tormenta que nadie maneja", desc: "Despues de cada tormenta, las HOAs reciben llamadas sobre canaletas caidas, paneles de sofito volados y fascia despegada. Un solo trabajador con escalera no procesa 40 unidades en una semana." },
      { title: "Ciclos preventivos saltados", desc: "La limpieza de canaletas, la inspeccion de sofito y los chequeos de fascia se saltan una temporada. La pudricion se extiende detras de las paredes. Dieciocho meses despues la HOA enfrenta una evaluacion especial que nadie queria." },
      { title: "Friccion de idioma con residentes", desc: "La poblacion de residentes HOA de Tampa es muy bilingue. Los equipos que solo hablan ingles pierden la mitad de la conversacion, y la mitad de los problemas nunca se reportan bien." },
    ],
    solutionEyebrow: "LA DIFERENCIA HOA DE JR ONE",
    solutionTitle: "Como Trabajamos Con HOAs y Administradores",
    solutionSub: "Un contrato, un proveedor, una relacion. Construida para comunidades, no llamadas de servicio sueltas.",
    solutions: [
      { title: "Mantenimiento programado a nivel comunitario", desc: "Limpieza de canaletas semestral o trimestral, inspeccion de sofito y fascia, lavado de bajantes y prueba de flujo en cada unidad de la comunidad. En un horario que el administrador puede publicar." },
      { title: "Reporte de punto unico para el administrador", desc: "Despues de cada ciclo entregamos un reporte unidad por unidad: que se limpio, que se marco, fotos de problemas encontrados y seguimientos recomendados. El administrador lo reenvia a la junta, no una caja de facturas." },
      { title: "Precios comunitarios, no minoristas por casa", desc: "Los contratos HOA obtienen precios por volumen porque enrutamos equipos comunidad por comunidad. El ahorro vs reservarnos casa por casa es real." },
      { title: "Equipos bilingues de principio a fin", desc: "Cada equipo de JR One es completamente bilingue EN y ES. Los residentes obtienen respuestas claras en su idioma. Los administradores tienen un contacto en ingles que es dueno de la cuenta." },
      { title: "Prioridad de respuesta post-tormenta para HOAs con contrato", desc: "Despues de una tormenta priorizamos las HOAs con contrato antes de la cola minorista. Su comunidad no espera tres semanas." },
      { title: "Oficio especializado, no generalista", desc: "Canaletas, sofito, fascia, molduras de aluminio, drenaje. Hacemos una cosa y la hacemos en miles de casas. Sin entregas a subcontratistas, sin perdida de calidad." },
    ],
    stats: [
      { value: "25+", label: "HOAs y comunidades administradas atendidas" },
      { value: "30+", label: "Anos de trabajo de aluminio en Tampa Bay" },
      { value: "48h", label: "Tiempo tipico de recorrido" },
      { value: "100%", label: "Equipos propios bilingues" },
    ],
    scopeEyebrow: "LO QUE INCLUYE EL CONTRATO",
    scopeTitle: "Servicios Cubiertos en un Acuerdo HOA",
    scopeSub: "Construya su contrato con cualquier combinacion. Con precio por unidad, por pie lineal, o por comunidad segun alcance.",
    scopeItems: [
      { title: "Limpieza de canaletas y bajantes", desc: "Remocion completa de escombros y lavado de bajantes en cada unidad en un cronograma establecido (trimestral, semestral, o post-tormenta)." },
      { title: "Inspeccion de canaletas, sofito y fascia", desc: "Inspeccion con documentacion fotografica de soportes caidos, paneles sueltos, fascia podrida y costuras fallidas. Marcados antes de ser problemas comunitarios." },
      { title: "Reparacion de canaletas y re-inclinacion", desc: "Resellado, reemplazo de soportes y correccion de pendiente en canaletas que aun sirven pero empiezan a fallar." },
      { title: "Reemplazo de paneles de sofito y fascia", desc: "Reemplazo por unidad de paneles de aluminio danados por viento o podridos y envolturas de fascia, combinados al color de la comunidad." },
      { title: "Redireccion de bajantes y drenaje", desc: "Correccion de problemas de drenaje que erosionan paisajismo, inundan aceras o acumulan agua en fundaciones. Una queja constante en HOAs." },
      { title: "Respuesta rapida post-tormenta", desc: "Dentro de 72 horas de una tormenta caminamos la comunidad, documentamos dano y coordinamos la cola de reparacion con el administrador." },
    ],
    coverageLabel: "COBERTURA TAMPA BAY",
    coverageTitle: "Servimos HOAs en 5 condados y 21 ciudades.",
    coverageDesc: "Hillsborough, Pinellas, Pasco, Manatee y Sarasota. Tampa, Clearwater, St. Pete, Sarasota, Bradenton, Lakeland, Brandon, Wesley Chapel, Riverview, Palm Harbor, Temple Terrace y mas.",
    coverageBtn: "Contacto",
    goldEyebrow: "EL ESTANDAR DE ORO",
    goldTitle: "Como Integramos una HOA",
    goldMotto: "Un recorrido. Un contrato. Un proveedor en que la junta confia.",
    goldSteps: [
      { num: "01", title: "Recorrido", desc: "Recorrido comunitario gratis con el administrador. Documentamos unidades, pies lineales de canaleta, condicion de sofito y puntos de dolor actuales." },
      { num: "02", title: "Alcance", desc: "Alcance personalizado del menu de servicios. Limpieza trimestral, inspeccion semestral, respuesta post-tormenta, lo que necesite la comunidad." },
      { num: "03", title: "Acuerdo", desc: "Contrato transparente con precios por unidad, cadencia, formato de reporte y ruta de escalamiento. La junta aprueba y lo cerramos." },
      { num: "04", title: "Ejecucion y Reporte", desc: "Ejecutamos segun horario y entregamos reporte unidad por unidad despues de cada ciclo. Sin sorpresas." },
    ],
    reviewEyebrow: "RESENAS DE ADMINISTRADORES",
    reviewTitle: "Lo Que Dicen Juntas y Administradores",
    reviews: [
      { text: "Teniamos tres trabajadores cubriendo 180 casas. Cambiamos todo el lado de aluminio a JR One y las quejas bajaron en un mes. Un punto de contacto lo hizo sostenible.", name: "Administradora Comunitaria", service: "HOA de Hillsborough", stars: 5 },
      { text: "Despues del Huracan Idalia tuvimos paneles volados en 40+ unidades. JR One camino la comunidad en 48 horas y tuvo una cola de reparacion priorizada. Esa respuesta es rara.", name: "Miembro de Junta HOA", service: "Comunidad de Casas en Pinellas", stars: 5 },
      { text: "La parte bilingue importa mas de lo que la gente piensa. Nuestros residentes se sintieron escuchados.", name: "Administradora de Propiedad", service: "Comunidad Sur de Tampa", stars: 5 },
    ],
    faqEyebrow: "PREGUNTAS FRECUENTES",
    faqTitle: "Preguntas Sobre Contratos de Mantenimiento HOA",
    faqs: [
      { q: "Que tamano de HOA aceptan?", a: "Trabajamos con comunidades desde 12 unidades hasta 400+. Por debajo de 12 recomendamos llamadas individuales. Por encima de 400 dividimos en zonas de servicio." },
      { q: "Como se estructura el precio de una HOA?", a: "Es personalizado por comunidad segun unidades, pies lineales, accesibilidad de techo y alcance. La mayoria termina con un retenedor mensual o trimestral fijo con tarifa por unidad transparente para reparaciones fuera de alcance." },
      { q: "Requieren contrato de varios anos?", a: "No. La mayoria son anuales con revision de renovacion. Preferimos ganar la renovacion cada ano." },
      { q: "Pueden coordinar con nuestro techero actual?", a: "Si. Coordinamos directamente con techeros, pintores y jardineros cuando los alcances se traslapan, particularmente en sofito y fascia que toca la linea del techo." },
      { q: "Que hay de respuesta de emergencia post-tormenta?", a: "Las HOAs con contrato tienen prioridad antes de la cola minorista. Dentro de 72 horas caminamos la comunidad y damos una lista priorizada para revision de junta o reclamo de seguro." },
      { q: "Estan asegurados para trabajo en HOAs?", a: "Si. JR One Aluminum tiene cobertura completa de responsabilidad general y compensacion laboral. Entregamos certificados al administrador con la HOA nombrada como asegurado adicional si se requiere." },
      { q: "Pueden dar reportes que la junta entienda?", a: "Cada ciclo termina con un reporte unidad por unidad: que se hizo, que se marco, fotos y seguimientos. Escrito para reunion de junta, no solo facturacion." },
    ],
    ctaTitle: "Listo Para Simplificar el Mantenimiento de Aluminio de Su HOA?",
    ctaSub: "Solicite un recorrido comunitario gratis. Nos reunimos con el administrador en sitio, evaluamos el alcance y ponemos un contrato transparente frente a la junta. Sin obligacion.",
    formTitle: "Solicite un Recorrido HOA",
    formName: "Nombre del Administrador",
    formPhone: "Numero de Telefono",
    formEmail: "Correo Electronico",
    formZip: "Codigo Postal de la Comunidad",
    formBtn: "Solicitar Recorrido Gratis",
    formDisclaimer: "Sin spam. Sin presion. Conversacion directa con el dueno.",
    formSuccess: "Solicitud Recibida",
    formSuccessSub: "Le responderemos dentro de un dia habil.",
    preferTalk: "Prefiere hablar?",
  },
};

const inputLightStyle = {
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

export default function HOAContractsPage() {
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
      const params = new URLSearchParams(typeof window !== "undefined" ? window.location.search : "");
      await fetch("/api/send-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone,
          email: formData.email,
          zip: formData.zip,
          page: typeof window !== "undefined" ? window.location.pathname : "/hoa-contracts",
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
                <span style={{ color: "var(--jr-gold)" }}>{t.heroH1Gold}</span>
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
                  {t.btnEstimate}
                </Button>
                <Button href="tel:8444443114" variant="outline" size="lg" iconLeft={<PhoneIcon size={18} />}>
                  {t.btnCall}
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

        {/* SOLUTION */}
        <section style={{ background: "var(--jr-navy)", padding: "var(--jr-space-20) 0" }}>
          <Container>
            <SectionHeading
              eyebrow={t.solutionEyebrow}
              title={t.solutionTitle}
              subtitle={t.solutionSub}
              theme="dark"
            />
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "var(--jr-space-5)" }}>
              {t.solutions.map((s, i) => (
                <article
                  key={i}
                  className="jr-hover-lift"
                  style={{
                    background: "var(--jr-navy-deep)",
                    border: "1px solid var(--jr-navy-3)",
                    borderRadius: "var(--jr-radius-lg)",
                    padding: "var(--jr-space-6)",
                  }}
                >
                  <div style={{ fontFamily: "var(--jr-font-heading)", fontSize: "var(--jr-text-xs)", fontWeight: 700, color: "var(--jr-gold)", letterSpacing: "2px", marginBottom: "var(--jr-space-2)" }}>
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <h3 style={{ fontFamily: "var(--jr-font-heading)", fontSize: "var(--jr-text-lg)", fontWeight: 700, color: "var(--jr-paper)", marginBottom: "var(--jr-space-3)" }}>
                    {s.title}
                  </h3>
                  <p style={{ fontFamily: "var(--jr-font-body)", fontSize: "var(--jr-text-md)", color: "var(--jr-muted-on-dark)", lineHeight: 1.6 }}>
                    {s.desc}
                  </p>
                </article>
              ))}
            </div>
          </Container>
        </section>

        {/* SCOPE */}
        <section style={{ background: "var(--jr-navy-deep)", padding: "var(--jr-space-20) 0" }}>
          <Container>
            <SectionHeading
              eyebrow={t.scopeEyebrow}
              title={t.scopeTitle}
              subtitle={t.scopeSub}
              theme="dark"
            />
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "var(--jr-space-5)" }}>
              {t.scopeItems.map((g, i) => {
                const Icon = SCOPE_ICONS[i] || ShieldIcon;
                return (
                  <article
                    key={i}
                    style={{
                      background: "var(--jr-navy)",
                      border: "1px solid var(--jr-navy-3)",
                      borderTop: "4px solid var(--jr-gold)",
                      borderRadius: "var(--jr-radius-lg)",
                      padding: "var(--jr-space-6)",
                    }}
                  >
                    <div style={{ color: "var(--jr-gold)", marginBottom: "var(--jr-space-3)" }}>
                      <Icon size={28} />
                    </div>
                    <h3 style={{ fontFamily: "var(--jr-font-heading)", fontSize: "var(--jr-text-lg)", fontWeight: 700, color: "var(--jr-paper)", marginBottom: "var(--jr-space-3)" }}>
                      {g.title}
                    </h3>
                    <p style={{ fontFamily: "var(--jr-font-body)", fontSize: "var(--jr-text-md)", color: "var(--jr-muted-on-dark)", lineHeight: 1.6 }}>
                      {g.desc}
                    </p>
                  </article>
                );
              })}
            </div>
          </Container>
        </section>

        {/* COVERAGE CALLOUT */}
        <section
          style={{
            background: "linear-gradient(135deg, rgba(200,149,46,0.08), var(--jr-navy-deep))",
            padding: "var(--jr-space-8) var(--jr-space-6)",
            borderTop: "2px solid var(--jr-gold)",
            borderBottom: "2px solid var(--jr-gold)",
          }}
        >
          <Container>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "var(--jr-space-5)" }}>
              <div style={{ flex: "1 1 500px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "var(--jr-space-2)", color: "var(--jr-gold)", marginBottom: "var(--jr-space-2)" }}>
                  <MapPinIcon size={16} />
                  <span style={{ fontFamily: "var(--jr-font-heading)", fontSize: "var(--jr-text-xs)", fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase" }}>
                    {t.coverageLabel}
                  </span>
                </div>
                <p style={{ fontFamily: "var(--jr-font-heading)", fontSize: "var(--jr-text-xl)", fontWeight: 800, color: "var(--jr-paper)", lineHeight: 1.3, marginBottom: "var(--jr-space-2)" }}>
                  {t.coverageTitle}
                </p>
                <p style={{ fontFamily: "var(--jr-font-body)", fontSize: "var(--jr-text-sm)", color: "var(--jr-muted-on-dark)", lineHeight: 1.5 }}>
                  {t.coverageDesc}
                </p>
              </div>
              <Button href="/contact" variant="primary" size="md" iconRight>
                {t.coverageBtn}
              </Button>
            </div>
          </Container>
        </section>

        {/* GOLD STANDARD */}
        <section style={{ background: "var(--jr-navy)", padding: "var(--jr-space-20) 0" }}>
          <Container>
            <SectionHeading
              eyebrow={t.goldEyebrow}
              title={t.goldTitle}
              subtitle={t.goldMotto}
              theme="dark"
            />
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "var(--jr-space-5)" }}>
              {t.goldSteps.map((step) => (
                <ProcessStep key={step.num} num={step.num} title={step.title} desc={step.desc} />
              ))}
            </div>
          </Container>
        </section>

        {/* REVIEWS */}
        <section style={{ background: "var(--jr-navy-deep)", padding: "var(--jr-space-20) 0" }}>
          <Container>
            <SectionHeading
              eyebrow={t.reviewEyebrow}
              title={t.reviewTitle}
              theme="dark"
            />
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "var(--jr-space-5)" }}>
              {t.reviews.map((rev, i) => (
                <ReviewCard key={i} {...rev} />
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
                marginBottom: "var(--jr-space-10)",
                lineHeight: 1.65,
                maxWidth: 600,
                margin: "0 auto var(--jr-space-10)",
              }}
            >
              {t.ctaSub}
            </p>
            <div
              style={{
                background: "var(--jr-paper)",
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
                  <h3 style={{ fontFamily: "var(--jr-font-heading)", fontSize: "var(--jr-text-xl)", fontWeight: 700, color: "var(--jr-navy)" }}>
                    {t.formSuccess}
                  </h3>
                  <p style={{ fontFamily: "var(--jr-font-body)", fontSize: "var(--jr-text-md)", color: "var(--jr-muted-on-light)", marginTop: "var(--jr-space-2)" }}>
                    {t.formSuccessSub}
                  </p>
                </div>
              ) : (
                <form onSubmit={handleForm}>
                  <h3 style={{ fontFamily: "var(--jr-font-heading)", fontSize: "var(--jr-text-xl)", fontWeight: 700, color: "var(--jr-navy)", textAlign: "center", marginBottom: "var(--jr-space-1)" }}>
                    {t.formTitle}
                  </h3>
                  <div aria-hidden style={{ width: 40, height: 3, background: "var(--jr-gold)", borderRadius: 2, margin: "10px auto var(--jr-space-5)" }} />
                  <input aria-label={t.formName} style={inputLightStyle} placeholder={t.formName} value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required />
                  <input aria-label={t.formPhone} style={inputLightStyle} placeholder={t.formPhone} type="tel" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} required />
                  <input aria-label={t.formEmail} style={inputLightStyle} placeholder={t.formEmail} type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
                  <input aria-label={t.formZip} style={inputLightStyle} placeholder={t.formZip} value={formData.zip} onChange={(e) => setFormData({ ...formData, zip: e.target.value })} maxLength={5} />
                  <Button type="submit" variant="primary" size="md" fullWidth iconRight disabled={loading}>
                    {loading ? (lang === "en" ? "Sending..." : "Enviando...") : t.formBtn}
                  </Button>
                  <p style={{ fontFamily: "var(--jr-font-body)", fontSize: "var(--jr-text-xs)", color: "var(--jr-muted-on-light)", textAlign: "center", marginTop: "var(--jr-space-3)" }}>
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
          title={lang === "en" ? "One Vendor. Every Community." : "Un Proveedor. Cada Comunidad."}
          sub={lang === "en"
            ? "Bilingual crews, transparent reporting, post-storm priority. Schedule a free walkthrough today."
            : "Equipos bilingues, reportes transparentes, prioridad post-tormenta. Programe un recorrido gratis hoy."}
          primaryLabel={t.btnEstimate}
          primaryHref="#quote-form"
        />
      </main>
      <SiteFooter />
      <MobileCTA scrollTarget="quote-form" />
    </div>
  );
}
