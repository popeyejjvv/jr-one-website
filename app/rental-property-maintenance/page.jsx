"use client";

/* ═══════════════════════════════════════════════════════════
   JR ONE ALUMINUM | RENTAL PROPERTY MAINTENANCE
   Brand-brain compliant. Migrated to design tokens + UI components.
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
import CTABand from "../../components/ui/CTABand";
import Peak301Alert from "../../components/ui/Peak301Alert";
import {
  CheckCircleIcon,
  PhoneIcon,
  MapPinIcon,
} from "../../lib/icons";

// Page-identity accent: magenta (recurring revenue, turnover urgency).
const ACCENT = "#BE185D";
const ACCENT_LIGHT = "#DB2777";

const PROBLEM_EMOJIS = ["🏠", "⭐", "📐", "🔧"];
const SCOPE_EMOJIS = ["🏠", "📋", "🛠️", "🏘️", "🌧️", "👷"];

const T = {
  en: {
    breadcrumb: ["Home", "Services", "Rental Property Maintenance"],
    heroTag: "RENTAL & INVESTMENT PROPERTY MAINTENANCE",
    heroH1: "Gutter & Aluminum Service",
    heroH1Gold: "Built for Absentee Owners",
    heroP: "Your rental, Airbnb, or investment property needs the same gutter, soffit, and fascia care a primary residence gets, without you having to fly in. JR One schedules, executes, photographs, and reports. You approve from anywhere.",
    btnEstimate: "Request a Rental Service Plan",
    btnCall: "Call (844) 444-3114",
    problemEyebrow: "THE ABSENTEE OWNER PROBLEM",
    problemTitle: "What Goes Wrong When You're Not There",
    problems: [
      { title: "Small issues turn into big damage", desc: "A partially clogged downspout tenants don't notice overflows for 6 months. Water saturates the fascia. By the time you see it on a visit, you're looking at a $4,000 fascia-and-soffit rebuild instead of a $180 cleaning." },
      { title: "Bad reviews from water problems", desc: "Airbnb guests blame the host for water running down windows, soaking patios, and flooding entryways, even when the root cause is a gutter problem nobody's been maintaining. One-star reviews hit your occupancy." },
      { title: "No visibility into the property", desc: "You live in New York, Chicago, or Miami. You can't drive by after a storm to check. Most vendors won't send photos unprompted. You're flying blind until the next cleaning or cleaner flags something." },
      { title: "Tenant coordination friction", desc: "Long-term tenants don't want strangers showing up unannounced. Short-term rentals have back-to-back turnovers. Generic handymen don't coordinate either one well, and the work skips a quarter." },
    ],
    solutionEyebrow: "THE JR ONE RENTAL DIFFERENCE",
    solutionTitle: "A Vendor Built for the Way You Actually Own the Property",
    solutionSub: "Scheduled, documented, tenant-coordinated. Designed for people who own from a different zip code.",
    solutions: [
      { title: "Scheduled service on your calendar", desc: "Semi-annual or quarterly gutter cleaning, soffit and fascia inspection, and downspout testing on a locked schedule. You approve once, we execute forever. No calling every 6 months." },
      { title: "Photo reports to your phone or email", desc: "After every service visit we send a photo report: before and after shots, any issues found, and recommended fixes. You get the same visibility you'd have if you'd walked the property yourself." },
      { title: "Tenant coordination included", desc: "We coordinate directly with long-term tenants, short-term cleaning crews, or your property manager. You don't become the middleman. For STRs we work around turnover windows." },
      { title: "Emergency response for water problems", desc: "If a tenant or guest reports water intrusion, we can be on-site within 48 hours (faster for active leaks). You get a diagnostic call and a repair plan before the damage spreads." },
      { title: "Pricing that makes sense for rentals", desc: "Rental service plans are priced for the economics of a rental, not luxury-homeowner retail. Clean, flat, bundled rates per visit. No surprise charges." },
      { title: "One vendor across your portfolio", desc: "Own 3 rentals? 10? 40? One point of contact, one invoice format, one reporting standard across every property. Saves you the vendor-juggling headache." },
    ],
    stats: [
      { value: "500+", label: "Rental & investment properties maintained" },
      { value: "30+", label: "Years of Tampa Bay aluminum work" },
      { value: "48h", label: "Typical response to water-intrusion calls" },
      { value: "100%", label: "Photo documentation on every visit" },
    ],
    scopeEyebrow: "SERVICE PLAN OPTIONS",
    scopeTitle: "Choose the Right Plan for Your Rental",
    scopeSub: "Three common plan types, or build a custom plan around your property mix.",
    scopeItems: [
      { title: "Single-Rental Plan", desc: "Semi-annual gutter cleaning plus inspection on one LTR or STR property. Photo report after every visit. Ideal for the first-time out-of-state owner." },
      { title: "Portfolio Plan (2 to 10 units)", desc: "Bundled pricing across multiple rental properties with one point of contact, one invoice format, and coordinated scheduling to minimize trips. Common for local and regional investors." },
      { title: "Scale Plan (10+ units)", desc: "Custom-priced for larger rental portfolios, short-term-rental operators, and mid-scale investors. Includes prioritized emergency response and a dedicated account manager." },
      { title: "STR Turnover Coordination", desc: "For Airbnb and VRBO properties we coordinate service around your turnover window and work with your cleaning company directly. Zero guest-facing disruption." },
      { title: "Pre-Season Inspection", desc: "Before the June hurricane season we walk the roofline, document the condition, and flag anything that won't survive the summer. Giving you time to fix before a storm hits." },
      { title: "Post-Storm Damage Call", desc: "After a named storm we can be on-site within 72 hours for contracted properties, documenting damage with photos suitable for insurance claims." },
    ],
    coverageLabel: "ALSO SERVING",
    coverageTitle: "Short-term rental, long-term rental, and investor property owners. Tampa Bay-wide.",
    coverageDesc: "Covering Hillsborough, Pinellas, Pasco, Manatee, and Sarasota counties. 21 cities including Tampa, Clearwater, St. Pete, Sarasota, Bradenton, Wesley Chapel, Palm Harbor, and more.",
    coverageBtn: "Contact",
    goldEyebrow: "THE GOLD STANDARD",
    goldTitle: "How We Onboard a Rental Property",
    goldMotto: "One setup call. Service on schedule. Photo reports forever.",
    goldSteps: [
      { num: "01", title: "Assess", desc: "Free initial walkthrough (you don't need to be present, we can coordinate with the tenant or cleaner). We document condition, flag immediate issues, and recommend a service cadence." },
      { num: "02", title: "Design", desc: "Custom service plan fit to the property: visit frequency, scope per visit, and reporting format. Transparent pricing with no hidden per-visit charges." },
      { num: "03", title: "Execute", desc: "We execute on schedule, coordinating with tenants or turnover crews directly. You stay out of the middle." },
      { num: "04", title: "Report", desc: "Photo report to your email or phone after every visit. Any issues flagged for approval before we proceed. You're never surprised by a line item." },
    ],
    reviewEyebrow: "INVESTOR REVIEWS",
    reviewTitle: "What Rental Property Owners Say",
    reviews: [
      { text: "I own six rentals in Tampa and live in New Jersey. JR One was the first vendor who actually sent photos without me asking. I know what's happening at every property now.", name: "Out-of-State Owner", service: "6-Property Tampa Portfolio", stars: 5 },
      { text: "My Airbnb was getting one-star reviews about water pooling on the patio. JR One fixed the downspout routing in one visit. Reviews turned around within a month.", name: "Airbnb Host", service: "St. Pete Beach STR", stars: 5 },
      { text: "As a property manager with 40+ units across Pinellas, having one aluminum vendor with clean reporting saved me from an endless back-and-forth email chain with owners.", name: "Property Manager", service: "40-Unit Portfolio", stars: 5 },
    ],
    faqEyebrow: "FAQ",
    faqTitle: "Rental Property Service Questions",
    faqs: [
      { q: "How much does a rental service plan cost?", a: "Single-rental plans typically run $300 to $800 annually for semi-annual gutter cleaning plus inspection on a standard single-family rental, depending on linear footage and access. Portfolio plans get bundled pricing that drops per-property cost materially. Exact pricing after a walkthrough. No generic rate quoted over the phone." },
      { q: "Do I need to be present for the service?", a: "No. That's the entire point of the plan. We coordinate with your tenant, your short-term-rental cleaner, or your property manager directly. You get a photo report after every visit." },
      { q: "How do you handle access to the property?", a: "For LTRs we schedule with the tenant directly and give at least 48 hours notice. For STRs we work within your turnover window. If access is gated we coordinate the code or entry method with you or your cleaner once and file it for future visits." },
      { q: "What if the tenant or guest reports a water problem between scheduled visits?", a: "Call or text us. We can typically be on-site within 48 hours for a diagnostic on contracted properties, faster for active leaks. You'll get a plan and a quote before any repair work begins." },
      { q: "Do you work with property managers?", a: "Yes. Many of our rental accounts come through property managers who want a single aluminum vendor across their managed portfolio. We invoice the manager, report to the manager, and coordinate through the manager, not the owner directly unless requested." },
      { q: "Can you handle soffit or fascia damage, not just cleaning?", a: "Yes. We're a specialty trade for aluminum: gutters, soffit, fascia, aluminum trim, and drainage. If a scheduled visit turns up rotted fascia or blown soffit panels, we flag it for owner approval and execute the repair in the same property visit." },
      { q: "Do you carry insurance suitable for rental work?", a: "Yes. JR One Aluminum carries full general liability and workers' compensation coverage. We can provide certificates of insurance to owners or property management companies on request." },
    ],
    ctaTitle: "Ready to Put Your Rental on Autopilot?",
    ctaSub: "Tell us about your property or portfolio. We'll build a custom service plan, coordinate with the tenant or cleaner, and send photo reports after every visit. No flights required.",
    formTitle: "Request a Rental Service Plan",
    formName: "Full Name",
    formPhone: "Phone Number",
    formEmail: "Email Address",
    formZip: "Property ZIP Code",
    formBtn: "Request My Rental Plan",
    formDisclaimer: "No spam. No pressure. Just honest advice.",
    formSuccess: "Plan Request Received",
    formSuccessSub: "We'll get back to you within one business day.",
    preferTalk: "Prefer to talk?",
  },
  es: {
    breadcrumb: ["Inicio", "Servicios", "Mantenimiento de Propiedades de Alquiler"],
    heroTag: "MANTENIMIENTO DE PROPIEDADES DE ALQUILER E INVERSION",
    heroH1: "Servicio de Canaletas y Aluminio",
    heroH1Gold: "Hecho para Duenos Ausentes",
    heroP: "Su propiedad de alquiler, Airbnb o de inversion necesita el mismo cuidado de canaletas, sofito y fascia que una residencia principal, sin que usted tenga que viajar. JR One programa, ejecuta, fotografia y reporta. Usted aprueba desde cualquier lugar.",
    btnEstimate: "Solicite un Plan de Alquiler",
    btnCall: "Llame al (844) 444-3114",
    problemEyebrow: "EL PROBLEMA DEL DUENO AUSENTE",
    problemTitle: "Lo Que Sale Mal Cuando No Esta Ahi",
    problems: [
      { title: "Pequenos problemas se vuelven grandes danos", desc: "Un bajante parcialmente obstruido que el inquilino no nota se desborda por 6 meses. El agua satura la fascia. Cuando lo ve en una visita, esta mirando una reconstruccion de $4,000 en vez de una limpieza de $180." },
      { title: "Malas resenas por problemas de agua", desc: "Los huespedes de Airbnb culpan al anfitrion por agua corriendo por ventanas, empapando patios e inundando entradas, aun cuando la causa raiz es una canaleta sin mantenimiento. Las resenas de una estrella afectan su ocupacion." },
      { title: "Sin visibilidad de la propiedad", desc: "Usted vive en NY, Chicago o Miami. No puede pasar por ahi despues de una tormenta. La mayoria de vendedores no envia fotos. Esta volando a ciegas hasta la proxima limpieza." },
      { title: "Friccion con inquilinos", desc: "Los inquilinos a largo plazo no quieren extranos llegando sin aviso. Los alquileres cortos tienen rotaciones consecutivas. Los handymen genericos no coordinan bien ninguno." },
    ],
    solutionEyebrow: "LA DIFERENCIA JR ONE PARA ALQUILERES",
    solutionTitle: "Un Proveedor Hecho Para Como Usted Realmente Posee la Propiedad",
    solutionSub: "Programado, documentado, coordinado con inquilinos. Disenado para duenos en otro codigo postal.",
    solutions: [
      { title: "Servicio programado en su calendario", desc: "Limpieza de canaletas semestral o trimestral, inspeccion de sofito y fascia y pruebas de bajantes en horario fijo. Aprueba una vez, ejecutamos para siempre." },
      { title: "Reportes con fotos a su telefono o email", desc: "Despues de cada visita enviamos un reporte con fotos: antes y despues, problemas encontrados y arreglos recomendados. Obtiene la misma visibilidad que si caminara la propiedad." },
      { title: "Coordinacion con inquilinos incluida", desc: "Coordinamos directamente con inquilinos a largo plazo, equipos de limpieza de alquileres cortos, o su administrador. Usted no es el intermediario." },
      { title: "Respuesta de emergencia para problemas de agua", desc: "Si un inquilino o huesped reporta intrusion de agua, podemos estar en sitio en 48 horas (mas rapido para fugas activas). Recibe un diagnostico y plan antes de que el dano se extienda." },
      { title: "Precios que tienen sentido para alquileres", desc: "Los planes se cotizan para la economia de un alquiler, no precios minoristas de casa de lujo. Tarifas limpias, planas y agrupadas por visita." },
      { title: "Un proveedor para todo su portafolio", desc: "Tiene 3 alquileres? 10? 40? Un punto de contacto, un formato de factura y un estandar de reporte en cada propiedad." },
    ],
    stats: [
      { value: "500+", label: "Propiedades de alquiler mantenidas" },
      { value: "30+", label: "Anos de trabajo en Tampa Bay" },
      { value: "48h", label: "Respuesta tipica a problemas de agua" },
      { value: "100%", label: "Documentacion fotografica por visita" },
    ],
    scopeEyebrow: "OPCIONES DE PLAN DE SERVICIO",
    scopeTitle: "Elija el Plan Correcto Para Su Alquiler",
    scopeSub: "Tres tipos comunes, o construya un plan personalizado.",
    scopeItems: [
      { title: "Plan de Un Solo Alquiler", desc: "Limpieza e inspeccion semestral en una propiedad LTR o STR. Reporte fotografico despues de cada visita. Ideal para el primer dueno fuera del estado." },
      { title: "Plan de Portafolio (2 a 10 unidades)", desc: "Precios agrupados a traves de multiples propiedades con un punto de contacto, formato de factura unico y programacion coordinada." },
      { title: "Plan Escala (10+ unidades)", desc: "Precios personalizados para portafolios grandes, operadores STR e inversores medianos. Incluye respuesta de emergencia priorizada y gerente de cuenta dedicado." },
      { title: "Coordinacion STR", desc: "Para Airbnb y VRBO coordinamos el servicio alrededor de su ventana de rotacion y trabajamos con su equipo de limpieza directamente. Cero interrupcion al huesped." },
      { title: "Inspeccion Pre-Temporada", desc: "Antes de junio caminamos la linea del techo, documentamos la condicion y marcamos lo que no sobrevivira el verano. Dandole tiempo para arreglar antes de una tormenta." },
      { title: "Llamada de Dano Post-Tormenta", desc: "Despues de una tormenta podemos estar en sitio en 72 horas en propiedades con contrato, documentando dano con fotos aptas para reclamos de seguro." },
    ],
    coverageLabel: "TAMBIEN SERVIMOS",
    coverageTitle: "Duenos de alquileres cortos, largos y propiedades de inversion. En toda Tampa Bay.",
    coverageDesc: "Cubriendo Hillsborough, Pinellas, Pasco, Manatee y Sarasota. 21 ciudades incluyendo Tampa, Clearwater, St. Pete, Sarasota, Bradenton, Wesley Chapel, Palm Harbor y mas.",
    coverageBtn: "Contacto",
    goldEyebrow: "EL ESTANDAR DE ORO",
    goldTitle: "Como Integramos una Propiedad de Alquiler",
    goldMotto: "Una llamada de configuracion. Servicio programado. Reportes fotograficos siempre.",
    goldSteps: [
      { num: "01", title: "Evaluar", desc: "Recorrido inicial gratis (no necesita estar presente, coordinamos con el inquilino o limpiador). Documentamos condicion, marcamos problemas inmediatos y recomendamos una cadencia." },
      { num: "02", title: "Disenar", desc: "Plan personalizado: frecuencia de visita, alcance por visita y formato de reporte. Precio transparente sin cargos ocultos." },
      { num: "03", title: "Ejecutar", desc: "Ejecutamos segun horario, coordinando con inquilinos o equipos de rotacion directamente. Usted se queda fuera del medio." },
      { num: "04", title: "Reportar", desc: "Reporte fotografico a su email o telefono despues de cada visita. Cualquier problema marcado para aprobacion antes de proceder." },
    ],
    reviewEyebrow: "RESENAS DE INVERSORES",
    reviewTitle: "Lo Que Dicen los Duenos de Alquileres",
    reviews: [
      { text: "Tengo seis alquileres en Tampa y vivo en New Jersey. JR One fue el primer vendedor que realmente envio fotos sin que las pidiera. Ahora se que pasa en cada propiedad.", name: "Dueno Fuera del Estado", service: "Portafolio Tampa de 6 Propiedades", stars: 5 },
      { text: "Mi Airbnb recibia resenas de una estrella por agua acumulandose en el patio. JR One arreglo el direccionamiento del bajante en una visita. Las resenas mejoraron en un mes.", name: "Anfitrion de Airbnb", service: "STR en St. Pete Beach", stars: 5 },
      { text: "Como administradora con 40+ unidades en Pinellas, tener un vendedor de aluminio con reportes limpios me salvo de una cadena interminable de emails.", name: "Administradora de Propiedad", service: "Portafolio de 40 Unidades", stars: 5 },
    ],
    faqEyebrow: "PREGUNTAS FRECUENTES",
    faqTitle: "Preguntas Sobre Servicio de Alquileres",
    faqs: [
      { q: "Cuanto cuesta un plan de servicio de alquiler?", a: "Planes de un solo alquiler tipicamente corren $300 a $800 al ano para limpieza mas inspeccion semestral en un alquiler unifamiliar estandar. Planes de portafolio obtienen precios agrupados que bajan el costo por propiedad materialmente. Precio exacto despues de un recorrido." },
      { q: "Necesito estar presente para el servicio?", a: "No. Ese es el punto del plan. Coordinamos con su inquilino, su limpiador STR o su administrador. Usted obtiene un reporte fotografico despues de cada visita." },
      { q: "Como manejan el acceso a la propiedad?", a: "Para LTR programamos con el inquilino directamente con al menos 48 horas de aviso. Para STR trabajamos en su ventana de rotacion. Si esta con porton, coordinamos codigo una vez y lo archivamos." },
      { q: "Que pasa si el inquilino reporta un problema de agua entre visitas?", a: "Llame o escriba. Tipicamente podemos estar en sitio en 48 horas en propiedades con contrato. Recibira un plan y cotizacion antes de cualquier reparacion." },
      { q: "Trabajan con administradores de propiedad?", a: "Si. Muchas cuentas de alquiler vienen por administradores que quieren un vendedor unico de aluminio. Facturamos al administrador, reportamos al administrador y coordinamos por el administrador." },
      { q: "Pueden manejar dano de sofito o fascia, no solo limpieza?", a: "Si. Somos un oficio especializado en aluminio. Si una visita programada encuentra fascia podrida o paneles volados, lo marcamos para aprobacion y ejecutamos la reparacion en la misma visita." },
      { q: "Tienen seguro apto para trabajo en alquileres?", a: "Si. JR One tiene cobertura completa de responsabilidad general y compensacion laboral. Podemos proveer certificados a duenos o administradores a peticion." },
    ],
    ctaTitle: "Listo Para Poner Su Alquiler en Piloto Automatico?",
    ctaSub: "Cuentenos sobre su propiedad o portafolio. Construiremos un plan personalizado, coordinaremos con el inquilino o limpiador y enviaremos reportes fotograficos despues de cada visita. Sin vuelos.",
    formTitle: "Solicite un Plan de Alquiler",
    formName: "Nombre Completo",
    formPhone: "Numero de Telefono",
    formEmail: "Correo Electronico",
    formZip: "Codigo Postal de la Propiedad",
    formBtn: "Solicitar Mi Plan de Alquiler",
    formDisclaimer: "Sin spam. Sin presion. Solo consejo honesto.",
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

export default function RentalPropertyMaintenancePage() {
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
      const params = new URLSearchParams(typeof window !== "undefined" ? window.location.search : "");
      await fetch("/api/send-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...guardFields(),
          name: formData.name,
          phone: formData.phone,
          email: formData.email,
          zip: formData.zip,
          page: typeof window !== "undefined" ? window.location.pathname : "/rental-property-maintenance",
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
                <span style={{ color: i === t.breadcrumb.length - 1 ? ACCENT : "var(--jr-muted-on-dark)" }}>{item}</span>
              </span>
            ))}
          </div>
        </Container>

        {/* HERO */}
        <section className="jr-noise-bg jr-service-hero" style={{ position: "relative", padding: "var(--jr-space-12) var(--jr-space-6) var(--jr-space-20)", backgroundImage: "linear-gradient(165deg, rgba(11,22,51,0.84) 0%, rgba(17,32,67,0.88) 55%, rgba(22,42,80,0.92) 100%), url('/images/rental-property-maintenance-hero-v2.webp')", backgroundSize: "cover", backgroundPosition: "center", overflow: "hidden" }}>
          <Container style={{ position: "relative", zIndex: 1 }}>
            <div style={{ maxWidth: "780px" }}>
              <div
                style={{
                  display: "inline-block",
                  padding: "6px 14px",
                  background: "rgba(74, 144, 217, 0.12)",
                  border: `1px solid ${ACCENT}`,
                  borderRadius: "var(--jr-radius-sm)",
                  marginBottom: "var(--jr-space-3)",
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--jr-font-heading)",
                    fontSize: "var(--jr-text-xs)",
                    fontWeight: 700,
                    color: ACCENT_LIGHT,
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
                <span style={{ color: ACCENT_LIGHT }}>{t.heroH1Gold}</span>
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
                    boxShadow: `0 4px 14px rgba(74, 144, 217, 0.32)`,
                  }}
                >
                  {t.btnEstimate}
                </Button>
                <Button href="tel:8444443114" variant="outline" size="lg" iconLeft={<PhoneIcon size={18} />} accent={ACCENT} accentLight={ACCENT_LIGHT}>
                  {t.btnCall}
                </Button>
              </div>
              <div style={{ display: "flex", gap: "var(--jr-space-8)", marginTop: "var(--jr-space-10)", flexWrap: "wrap" }}>
                {t.stats.map((s, i) => (
                  <div key={i}>
                    <div style={{ fontFamily: "var(--jr-font-heading)", fontSize: "28px", fontWeight: 800, color: ACCENT_LIGHT }}>{s.value}</div>
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
              accent={ACCENT}
            />
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "var(--jr-space-5)" }}>
              {t.problems.map((p, i) => (
                <article
                  key={i}
                  style={{
                    background: "var(--jr-navy)",
                    border: "1px solid var(--jr-navy-3)",
                    borderLeft: `4px solid ${ACCENT}`,
                    borderRadius: "var(--jr-radius-lg)",
                    padding: "var(--jr-space-6)",
                  }}
                >
                  <div style={{ marginBottom: "var(--jr-space-3)" }}>
                    <span aria-hidden style={{ fontSize: 32, lineHeight: 1 }}>{PROBLEM_EMOJIS[i] || "🏠"}</span>
                  </div>
                  <h3 style={{ fontFamily: "var(--jr-font-heading)", fontSize: "var(--jr-text-lg)", fontWeight: 700, color: "var(--jr-paper)", marginBottom: "var(--jr-space-2)" }}>
                    {p.title}
                  </h3>
                  <p style={{ fontFamily: "var(--jr-font-body)", fontSize: "var(--jr-text-md)", color: "var(--jr-muted-on-dark)", lineHeight: 1.55 }}>
                    {p.desc}
                  </p>
                </article>
              ))}
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
              accent={ACCENT}
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
                  <div style={{ fontFamily: "var(--jr-font-heading)", fontSize: "var(--jr-text-xs)", fontWeight: 700, color: ACCENT_LIGHT, letterSpacing: "2px", marginBottom: "var(--jr-space-2)" }}>
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
              accent={ACCENT}
            />
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "var(--jr-space-5)" }}>
              {t.scopeItems.map((g, i) => (
                <article
                  key={i}
                  style={{
                    background: "var(--jr-navy)",
                    border: "1px solid var(--jr-navy-3)",
                    borderTop: `4px solid ${ACCENT}`,
                    borderRadius: "var(--jr-radius-lg)",
                    padding: "var(--jr-space-6)",
                  }}
                >
                  <div style={{ marginBottom: "var(--jr-space-3)" }}>
                    <span aria-hidden style={{ fontSize: 32, lineHeight: 1 }}>{SCOPE_EMOJIS[i] || "🏠"}</span>
                  </div>
                  <h3 style={{ fontFamily: "var(--jr-font-heading)", fontSize: "var(--jr-text-lg)", fontWeight: 700, color: "var(--jr-paper)", marginBottom: "var(--jr-space-3)" }}>
                    {g.title}
                  </h3>
                  <p style={{ fontFamily: "var(--jr-font-body)", fontSize: "var(--jr-text-md)", color: "var(--jr-muted-on-dark)", lineHeight: 1.6 }}>
                    {g.desc}
                  </p>
                </article>
              ))}
            </div>
          </Container>
        </section>

        {/* COVERAGE CALLOUT */}
        <section
          style={{
            background: `linear-gradient(135deg, rgba(74, 144, 217, 0.10), var(--jr-navy-deep))`,
            padding: "var(--jr-space-8) var(--jr-space-6)",
            borderTop: `2px solid ${ACCENT}`,
            borderBottom: `2px solid ${ACCENT}`,
          }}
        >
          <Container>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "var(--jr-space-5)" }}>
              <div style={{ flex: "1 1 500px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "var(--jr-space-2)", color: ACCENT_LIGHT, marginBottom: "var(--jr-space-2)" }}>
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
              <Button
                href="/contact"
                variant="primary"
                size="md"
                iconRight
                accent={ACCENT}
                accentLight={ACCENT_LIGHT}
                style={{
                  background: `linear-gradient(135deg, ${ACCENT}, ${ACCENT_LIGHT})`,
                  color: "#FFFFFF",
                  border: `2px solid ${ACCENT}`,
                  boxShadow: `0 4px 14px rgba(74, 144, 217, 0.32)`,
                }}
              >
                {t.coverageBtn}
              </Button>
            </div>
          </Container>
        </section>

        {/* ── PEAK 301 ALERT (red, drives traffic to /peak-301) ── */}
        <Peak301Alert />

        {/* GOLD STANDARD */}
        <section style={{ background: "var(--jr-navy)", padding: "var(--jr-space-20) 0" }}>
          <Container>
            <SectionHeading
              eyebrow={t.goldEyebrow}
              title={t.goldTitle}
              subtitle={t.goldMotto}
              theme="dark"
              accent={ACCENT}
            />
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "var(--jr-space-5)" }}>
              {t.goldSteps.map((step) => (
                <ProcessStep key={step.num} num={step.num} title={step.title} desc={step.desc} accent={ACCENT} />
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
              accent={ACCENT}
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
              accent={ACCENT}
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
                  {honeypot}
                  <h3 style={{ fontFamily: "var(--jr-font-heading)", fontSize: "var(--jr-text-xl)", fontWeight: 700, color: "var(--jr-navy)", textAlign: "center", marginBottom: "var(--jr-space-1)" }}>
                    {t.formTitle}
                  </h3>
                  <div aria-hidden style={{ width: 40, height: 3, background: ACCENT, borderRadius: 2, margin: "10px auto var(--jr-space-5)" }} />
                  <input aria-label={t.formName} style={inputLightStyle} placeholder={t.formName} value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required />
                  <input aria-label={t.formPhone} style={inputLightStyle} placeholder={t.formPhone} type="tel" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} required />
                  <input aria-label={t.formEmail} style={inputLightStyle} placeholder={t.formEmail} type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
                  <input aria-label={t.formZip} style={inputLightStyle} placeholder={t.formZip} value={formData.zip} onChange={(e) => setFormData({ ...formData, zip: e.target.value })} maxLength={5} />
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
                      boxShadow: `0 4px 14px rgba(74, 144, 217, 0.32)`,
                    }}
                  >
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
              <Button href="tel:8444443114" variant="ghost" size="md" iconLeft={<PhoneIcon size={18} />} accent={ACCENT} accentLight={ACCENT_LIGHT}>
                (844) 444-3114
              </Button>
            </div>
          </Container>
        </section>

        <CTABand
          title={lang === "en" ? "One Vendor. Every Property." : "Un Proveedor. Cada Propiedad."}
          sub={lang === "en"
            ? "Photo reports, scheduled service, tenant coordination. Get your custom rental plan."
            : "Reportes con fotos, servicio programado, coordinacion con inquilinos. Obtene tu plan personalizado."}
          primaryLabel={t.btnEstimate}
          primaryHref="#quote-form"
          accent={ACCENT}
          accentLight={ACCENT_LIGHT}
        />
      </main>
      <SiteFooter />
      <MobileCTA scrollTarget="quote-form" />
    </div>
  );
}
