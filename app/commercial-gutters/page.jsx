"use client";

/* ═══════════════════════════════════════════════════════════
   JR ONE ALUMINUM: COMMERCIAL GUTTERS
   Brand-brain compliant. Tokens via app/tokens.css.
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
import {
  CheckCircleIcon,
  PhoneIcon,
  WaterDropIcon,
  RoofEdgeIcon,
  ShieldIcon,
  RulerIcon,
  HouseIcon,
  HardHatIcon,
  WrenchIcon,
} from "../../lib/icons";

const T = {
  en: {
    breadcrumb: ["Home", "Services", "Commercial Gutters"],
    heroTag: "COMMERCIAL GUTTER INSTALLATION",
    heroH1a: "Commercial-Grade Aluminum",
    heroH1b: "for Buildings That Can't Fail.",
    heroP: "Apartment complexes, multi-family buildings, retail centers, office parks, and warehouses need gutter systems engineered for real water volume, not residential spec. JR One installs 7-inch box gutters, D-style commercial profiles, and large-capacity drainage across Tampa Bay.",
    heroCta: "Request a Commercial Quote",
    heroCall: "Call (844) 444-3114",
    stats: [
      { value: "30+", label: "Years serving Tampa Bay commercial" },
      { value: "7\"", label: "Commercial box-gutter spec" },
      { value: "100%", label: "In-house bilingual crews" },
      { value: "COI", label: "Insurance cert on request" },
    ],
    problemEyebrow: "The Commercial Reality",
    problemTitle: "Why Residential Gutters Fail on Commercial Buildings",
    problems: [
      { icon: "water", title: "Undersized for the roof area", desc: "Apartment buildings and retail centers shed 3 to 10 times the water volume of a single-family home. Standard 5\" or 6\" residential gutters overflow within the first heavy storm, pouring water onto entries, parking, and walkways." },
      { icon: "edge", title: "Wrong profile for the load", desc: "Commercial roofs need box gutters, D-style profiles, or super gutters, not K-style residential. The wrong profile warps, pulls off the fascia, and creates liability the property insurer won't cover." },
      { icon: "shield", title: "Liability from water on tenant paths", desc: "Water pooling at retail entries, apartment walkways, or office park sidewalks is a slip-and-fall lawsuit waiting to happen. Inadequate gutters are the first thing a plaintiff's attorney points at." },
      { icon: "house", title: "Lost revenue during shutdown", desc: "A retail tenant closed for water damage is revenue gone. An apartment unit unrentable because of interior water intrusion is revenue gone. Gutter-system failure on commercial is expensive in ways homeowners don't see." },
    ],
    solutionEyebrow: "The JR One Commercial Difference",
    solutionTitle: "Built for the Job, Sized for the Building",
    solutionSub: "Commercial and multi-family aluminum done by a specialty trade contractor, not a residential installer working out of spec.",
    solutions: [
      { title: "7-inch box gutters for high-volume roofs", desc: "Heavy-duty, high-capacity box gutters engineered for large commercial roof areas. Maximum water throughput during Florida storms. The baseline spec for apartment complexes, warehouses, and industrial buildings." },
      { title: "7-inch commercial D-style", desc: "Commercial D-style profiles for buildings with wide overhangs, high rainfall collection, and custom bracket requirements. Suitable for hotels, hospitality, and large multi-family." },
      { title: "Large-capacity residential commercial", desc: "7-inch K-style seamless for mid-sized multi-family, townhome communities, and oversized custom residential that needs more capacity than standard 6-inch gutters deliver." },
      { title: "Commercial drainage integration", desc: "Commercial roofs demand real drainage, not just a splash block. We install Schedule 40 PVC underground drainage, corrugated pipe, catch basins, and trenching to move water where it belongs." },
      { title: "Specialty aluminum: soffit, fascia, trim", desc: "Full commercial aluminum scope: aluminum soffit (vented and non-vented), Hardie board soffit, custom-bent fascia in single, 2-tier, and 3-tier profiles. One contractor for the entire aluminum package." },
      { title: "GC-friendly scheduling and code compliance", desc: "We schedule within broader project timelines without creating delays. Every installation meets Florida building code. We know Tampa inspection requirements and what local building officials look for." },
    ],
    scopeEyebrow: "Building Types Served",
    scopeTitle: "Commercial Properties We Build For",
    scopeSub: "From 4-unit townhomes to 300-unit apartment complexes. Plus retail, office, and industrial.",
    scopeItems: [
      { icon: "house", title: "Apartment complexes", desc: "Multi-building apartment properties. Gutter, soffit, fascia, and drainage designed for high-density water shed and durability between scheduled maintenance cycles." },
      { icon: "house", title: "Multi-family and townhomes", desc: "Townhome communities, condominium buildings, and small multi-family. Color-matched to community spec, installed building-by-building without disrupting residents." },
      { icon: "ruler", title: "Retail strip centers", desc: "Strip centers and standalone retail. Entry-zone drainage is critical. We route water away from customer paths and storefronts, not into them." },
      { icon: "edge", title: "Office buildings and business parks", desc: "Single-building office and multi-building business parks. Coordinated with landscape and paving drainage to prevent tenant-space water intrusion." },
      { icon: "shield", title: "Industrial and warehouse", desc: "Warehouse and industrial facilities with large roof areas. Box-gutter systems and commercial downspout specifications engineered for the volume." },
      { icon: "hardhat", title: "Hotels, hospitality, institutional", desc: "Hotels, churches, schools, and institutional buildings. Scheduled around the facility's operational windows. No disruption to guests, congregations, or classes." },
    ],
    gcEyebrow: "For General Contractors & Roofers",
    gcTitle: "We Sub for Tampa Bay's Roofing Companies and GCs",
    gcDesc: "Show-up reliability, volume pricing, single-point accountability, bilingual job-site communication. The aluminum side of your project done without management overhead.",
    gcBtn: "Contact",
    goldEyebrow: "The Gold Standard",
    goldTitle: "Our Commercial Installation Process",
    goldSub: "Every building. Every time. Spec'd right, installed right.",
    goldSteps: [
      { num: "01", title: "Assess", desc: "We walk the building with the owner, GC, or property manager. We measure roof area, document existing conditions, and document drainage requirements." },
      { num: "02", title: "Spec", desc: "Commercial spec built for the building: profile, size, gauge, hanger spacing, downspout count, and drainage route. Transparent line-item quote." },
      { num: "03", title: "Install", desc: "Our crew fabricates on-site where possible and installs to Florida code. Sequenced with other trades on new construction or scheduled around tenants on existing buildings." },
      { num: "04", title: "Deliver", desc: "Final walkthrough, flow test, cleanup, and craftsmanship warranty. All documentation delivered to the owner or GC for close-out." },
    ],
    reviewsEyebrow: "Commercial Reviews",
    reviewsTitle: "What GCs and Owners Say",
    reviews: [
      { text: "JR One handles the aluminum package on our multi-family projects. On-schedule every time, and I never have to chase them down to finish. That's worth more than a low bid.", name: "General Contractor", service: "Tampa Multi-Family", stars: 5 },
      { text: "Our apartment complex went from constant water-intrusion calls to almost zero after JR One installed 7\" box gutters and fixed the drainage routing. Worth the investment.", name: "Property Owner", service: "Brandon Apartment Complex", stars: 5 },
      { text: "Bilingual crew, clean work, and the kind of reliability you rarely get from a sub. We use them across our retail portfolio.", name: "Commercial Property Manager", service: "Pinellas Retail Portfolio", stars: 5 },
    ],
    faqEyebrow: "FAQ",
    faqTitle: "Commercial Gutter Questions",
    faqs: [
      { q: "What size gutter do I need for a commercial building?", a: "It depends on roof area, pitch, and rainfall collection. Most commercial buildings in Tampa Bay spec into 7\" box gutters or 7\" D-style commercial profiles. We calculate the correct size during the walkthrough. The wrong call here is expensive, so we don't guess." },
      { q: "Do you work directly with general contractors?", a: "Yes. A meaningful share of our commercial volume is subcontracted work for general contractors and roofing companies on new construction and renovation projects. We sequence with other trades, hit schedule, and invoice on GC-friendly terms." },
      { q: "Can you provide certificates of insurance?", a: "Yes. JR One Aluminum carries full general liability and workers' compensation coverage. We provide certificates of insurance directly to the building owner, property management company, or general contractor on request, with additional-insured endorsements where required." },
      { q: "How is commercial pricing structured?", a: "Commercial pricing is custom per project, based on gutter linear footage, profile, gauge, downspout count, drainage integration, and scope. GCs and property portfolios with recurring volume can negotiate pricing for repeat work." },
      { q: "Do you handle drainage too, or just the gutter itself?", a: "Full scope. Commercial roofs demand real drainage. We install Schedule 40 PVC underground drainage, corrugated pipe, catch basins, and trenching alongside the gutter system. One contractor for the complete water-management package." },
      { q: "What about ongoing maintenance after install?", a: "We offer commercial maintenance agreements for apartment complexes, property management portfolios, and building owners who want scheduled gutter cleaning and inspection on a commercial cadence. Separate from installation." },
      { q: "How long does commercial installation take?", a: "Varies widely. A single retail pad can be a day, a 200-unit apartment complex is weeks. We commit to a specific schedule before work begins and communicate any changes in advance." },
    ],
    ctaTitle: "Ready to Spec a Commercial Gutter System?",
    ctaSub: "Tell us about your building, project, or portfolio. We'll walk the site, build a commercial-spec quote, and coordinate with your GC or team. Transparent pricing, no residential-grade spec on a commercial job.",
    formTitle: "Request a Commercial Quote",
    formName: "Full Name / Company",
    formPhone: "Phone Number",
    formEmail: "Email Address",
    formZip: "Property ZIP Code",
    formBtn: "Request My Commercial Quote",
    formNote: "No spam. No pressure. Direct conversation with the owner.",
    formSent: "Quote Request Received",
    formSentSub: "We'll get back to you within one business day.",
  },
  es: {
    breadcrumb: ["Inicio", "Servicios", "Canaletas Comerciales"],
    heroTag: "INSTALACIÓN DE CANALETAS COMERCIALES",
    heroH1a: "Aluminio de Grado Comercial",
    heroH1b: "para Edificios Que No Pueden Fallar.",
    heroP: "Complejos de apartamentos, edificios multifamiliares, centros comerciales, parques de oficinas y bodegas necesitan sistemas de canaletas diseñados para volumen real de agua, no especificación residencial. JR One instala canaletas de caja de 7\", perfiles D comerciales y drenaje de alta capacidad en Tampa Bay.",
    heroCta: "Solicite Cotización Comercial",
    heroCall: "Llame al (844) 444-3114",
    stats: [
      { value: "30+", label: "Años sirviendo Tampa Bay comercial" },
      { value: "7\"", label: "Especificación de canaleta de caja" },
      { value: "100%", label: "Equipos propios bilingües" },
      { value: "COI", label: "Certificado de seguro a petición" },
    ],
    problemEyebrow: "La Realidad Comercial",
    problemTitle: "Por Qué las Canaletas Residenciales Fallan en Edificios Comerciales",
    problems: [
      { icon: "water", title: "Pequeñas para el área del techo", desc: "Edificios de apartamentos y centros comerciales descargan 3 a 10 veces el volumen de agua de una casa. Las canaletas residenciales de 5\" o 6\" se desbordan en la primera tormenta fuerte, vertiendo agua en entradas, estacionamientos y caminos." },
      { icon: "edge", title: "Perfil incorrecto para la carga", desc: "Los techos comerciales necesitan canaletas de caja, perfiles D o súper canaletas, no K-style residencial. El perfil incorrecto se deforma, se despega y crea responsabilidad civil que la aseguradora no cubre." },
      { icon: "shield", title: "Responsabilidad por agua en pasillos", desc: "Agua acumulada en entradas minoristas, pasillos de apartamentos o aceras de oficinas es una demanda por caídas esperando. Las canaletas inadecuadas son lo primero que señala el abogado demandante." },
      { icon: "house", title: "Ingresos perdidos por cierre", desc: "Un inquilino minorista cerrado por daño de agua es ingreso perdido. Una unidad no rentable por intrusión de agua es ingreso perdido. La falla del sistema de canaletas en comercial es costosa de formas que los propietarios residenciales no ven." },
    ],
    solutionEyebrow: "La Diferencia Comercial de JR One",
    solutionTitle: "Hecho para el Trabajo, Dimensionado para el Edificio",
    solutionSub: "Aluminio comercial y multifamiliar hecho por un contratista de oficio especializado, no un instalador residencial fuera de especificación.",
    solutions: [
      { title: "Canaletas de caja de 7\" para techos de alto volumen", desc: "Canaletas de caja de alta capacidad para áreas de techo grandes. Máximo flujo durante tormentas de Florida. Especificación base para complejos de apartamentos, bodegas y edificios industriales." },
      { title: "Perfil D comercial de 7\"", desc: "Perfiles D comerciales para edificios con aleros anchos, alta recolección y requisitos de soportes personalizados. Adecuado para hoteles, hospitalidad y multifamiliar grande." },
      { title: "Residencial comercial de alta capacidad", desc: "K-style sin costuras de 7\" para multifamiliar mediano, comunidades de townhomes y residencial personalizado de gran tamaño que necesita más capacidad que las canaletas estándar de 6\"." },
      { title: "Integración de drenaje comercial", desc: "Los techos comerciales demandan drenaje real, no solo un bloque deflector. Instalamos PVC Schedule 40 subterráneo, tubería corrugada, sumideros y excavación para mover agua donde pertenece." },
      { title: "Aluminio de oficio: sofito, fascia, molduras", desc: "Alcance completo de aluminio comercial: sofito de aluminio (ventilado y no ventilado), sofito Hardie, fascia personalizada en perfiles de 1, 2 y 3 niveles. Un contratista para todo el paquete de aluminio." },
      { title: "Programación GC-amigable y cumplimiento de código", desc: "Programamos dentro de cronogramas de proyecto sin crear retrasos. Cada instalación cumple código de construcción de Florida. Conocemos los requisitos de inspección de Tampa." },
    ],
    scopeEyebrow: "Tipos de Edificio Servidos",
    scopeTitle: "Propiedades Comerciales para las Que Construimos",
    scopeSub: "Desde townhomes de 4 unidades hasta complejos de 300 apartamentos. Más retail, oficinas e industrial.",
    scopeItems: [
      { icon: "house", title: "Complejos de apartamentos", desc: "Propiedades multifamiliares de varios edificios. Canaletas, sofito, fascia y drenaje diseñados para alta densidad de descarga de agua y durabilidad entre ciclos de mantenimiento programados." },
      { icon: "house", title: "Multifamiliar y townhomes", desc: "Comunidades de townhomes, condominios y multifamiliar pequeño. Combinado al color de la comunidad, instalado edificio por edificio sin interrumpir residentes." },
      { icon: "ruler", title: "Centros comerciales", desc: "Strip centers y minoristas independientes. El drenaje de la zona de entrada es crítico. Dirigimos el agua lejos de caminos de clientes y fachadas." },
      { icon: "edge", title: "Edificios de oficinas y parques empresariales", desc: "Oficina de un edificio y parques empresariales de varios edificios. Coordinado con drenaje de jardinería y pavimento para prevenir intrusión de agua en espacios de inquilinos." },
      { icon: "shield", title: "Industrial y bodegas", desc: "Bodegas e instalaciones industriales con áreas de techo grandes. Sistemas de canaletas de caja y especificaciones de bajantes comerciales dimensionados para el volumen." },
      { icon: "hardhat", title: "Hoteles, hospitalidad, institucional", desc: "Hoteles, iglesias, escuelas y edificios institucionales. Programados alrededor de las ventanas operativas de la instalación. Sin interrupción a huéspedes, congregaciones o clases." },
    ],
    gcEyebrow: "Para GCs y Techeros",
    gcTitle: "Subcontratamos para Techeros y GCs de Tampa Bay",
    gcDesc: "Confiabilidad, precios por volumen, punto único de responsabilidad, comunicación bilingüe en sitio. El lado de aluminio de su proyecto hecho sin carga de gestión.",
    gcBtn: "Contacto",
    goldEyebrow: "El Estándar de Oro",
    goldTitle: "Nuestro Proceso de Instalación Comercial",
    goldSub: "Cada edificio. Cada vez. Bien especificado, bien instalado.",
    goldSteps: [
      { num: "01", title: "Evaluar", desc: "Caminamos el edificio con el dueño, GC o administrador. Medimos área de techo, documentamos condiciones existentes y requisitos de drenaje." },
      { num: "02", title: "Especificar", desc: "Especificación comercial para el edificio: perfil, tamaño, calibre, espaciado de soportes, cantidad de bajantes y ruta de drenaje. Cotización transparente." },
      { num: "03", title: "Instalar", desc: "Nuestro equipo fabrica en sitio cuando es posible e instala según código de Florida. Secuenciado con otros oficios en construcción nueva o programado alrededor de inquilinos en edificios existentes." },
      { num: "04", title: "Entregar", desc: "Recorrido final, prueba de flujo, limpieza y garantía de mano de obra. Toda la documentación entregada al dueño o GC para cierre." },
    ],
    reviewsEyebrow: "Reseñas Comerciales",
    reviewsTitle: "Lo Que Dicen GCs y Dueños",
    reviews: [
      { text: "JR One maneja el paquete de aluminio en nuestros proyectos multifamiliares. En horario cada vez, y nunca tengo que perseguirlos para terminar. Eso vale más que una oferta baja.", name: "Contratista General", service: "Multifamiliar Tampa", stars: 5 },
      { text: "Nuestro complejo de apartamentos pasó de llamadas constantes de intrusión de agua a casi cero después de que JR One instaló canaletas de caja de 7\" y arregló el drenaje.", name: "Dueño de Propiedad", service: "Complejo de Apartamentos Brandon", stars: 5 },
      { text: "Equipo bilingüe, trabajo limpio y el tipo de confiabilidad que raramente obtienes de un subcontratista. Los usamos en todo nuestro portafolio minorista.", name: "Administrador de Propiedad Comercial", service: "Portafolio Minorista Pinellas", stars: 5 },
    ],
    faqEyebrow: "Preguntas Frecuentes",
    faqTitle: "Preguntas Sobre Canaletas Comerciales",
    faqs: [
      { q: "¿Qué tamaño de canaleta necesito para un edificio comercial?", a: "Depende del área del techo, pendiente y recolección de lluvia. La mayoría de edificios comerciales en Tampa Bay especifican canaletas de caja de 7\" o perfil D comercial de 7\". Calculamos el tamaño correcto durante el recorrido. La decisión incorrecta aquí es costosa, así que no adivinamos." },
      { q: "¿Trabajan directamente con contratistas generales?", a: "Sí. Una parte significativa de nuestro volumen comercial es trabajo subcontratado para GCs y techeros en construcción nueva y renovación. Secuenciamos con otros oficios, cumplimos horarios y facturamos con términos GC-amigables." },
      { q: "¿Pueden proveer certificados de seguro?", a: "Sí. JR One Aluminum tiene cobertura completa de responsabilidad general y compensación laboral. Entregamos certificados directamente al dueño, administradora o GC con endosos de asegurado adicional donde se requiera." },
      { q: "¿Cómo se estructura el precio comercial?", a: "Precio personalizado por proyecto, basado en pies lineales, perfil, calibre, cantidad de bajantes, integración de drenaje y alcance. GCs y portafolios con volumen recurrente pueden negociar precios." },
      { q: "¿Manejan drenaje también, o solo la canaleta?", a: "Alcance completo. Los techos comerciales demandan drenaje real. Instalamos PVC subterráneo, tubería corrugada, sumideros y excavación junto con el sistema de canaletas. Un contratista para el paquete completo de manejo de agua." },
      { q: "¿Qué hay de mantenimiento continuo?", a: "Ofrecemos acuerdos de mantenimiento comercial para complejos de apartamentos, portafolios administrados y dueños que quieren limpieza e inspección programadas. Separado de la instalación." },
      { q: "¿Cuánto dura la instalación comercial?", a: "Varía ampliamente. Un pad minorista puede ser un día, un complejo de 200 apartamentos son semanas. Comprometemos un horario específico antes de comenzar y comunicamos cualquier cambio con anticipación." },
    ],
    ctaTitle: "¿Listo para Especificar un Sistema Comercial?",
    ctaSub: "Cuéntenos sobre su edificio, proyecto o portafolio. Caminaremos el sitio, construiremos una cotización de especificación comercial y coordinaremos con su GC o equipo. Precios transparentes.",
    formTitle: "Solicite Cotización Comercial",
    formName: "Nombre Completo / Empresa",
    formPhone: "Número de Teléfono",
    formEmail: "Correo Electrónico",
    formZip: "Código Postal de la Propiedad",
    formBtn: "Solicitar Mi Cotización Comercial",
    formNote: "Sin spam. Sin presión. Conversación directa con el dueño.",
    formSent: "Solicitud Recibida",
    formSentSub: "Le responderemos dentro de un día hábil.",
  },
};

const ICON_MAP = {
  water: WaterDropIcon,
  edge: RoofEdgeIcon,
  shield: ShieldIcon,
  ruler: RulerIcon,
  house: HouseIcon,
  hardhat: HardHatIcon,
  wrench: WrenchIcon,
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

export default function CommercialGuttersPage() {
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
          service: "Commercial Gutters",
          page: "commercial-gutters",
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
                <span style={{ color: i === t.breadcrumb.length - 1 ? "var(--jr-gold)" : "var(--jr-muted-on-dark)" }}>{item}</span>
              </span>
            ))}
          </nav>
        </Container>

        <section className="jr-noise-bg" style={{ position: "relative", padding: "var(--jr-space-12) var(--jr-space-6) var(--jr-space-20)", background: "linear-gradient(165deg, var(--jr-navy-deep) 0%, var(--jr-navy) 55%, var(--jr-navy-2) 100%)", overflow: "hidden" }}>
          <div aria-hidden style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, background: "radial-gradient(ellipse at 28% 22%, rgba(200,149,46,0.08) 0%, transparent 60%)", pointerEvents: "none" }} />
          <Container style={{ position: "relative", zIndex: 1 }}>
            <div style={{ maxWidth: "780px" }}>
              <div style={{ fontFamily: "var(--jr-font-heading)", fontSize: "var(--jr-text-xs)", fontWeight: 700, color: "var(--jr-gold)", letterSpacing: "4px", marginBottom: "var(--jr-space-4)", textTransform: "uppercase" }}>{t.heroTag}</div>
              <h1 style={{ fontFamily: "var(--jr-font-heading)", fontSize: "var(--jr-text-4xl)", fontWeight: 800, lineHeight: 1.05, marginBottom: "var(--jr-space-6)", letterSpacing: "-0.5px" }}>
                {t.heroH1a}<br />
                <span style={{ color: "var(--jr-gold)" }}>{t.heroH1b}</span>
              </h1>
              <p style={{ fontFamily: "var(--jr-font-body)", fontSize: "var(--jr-text-lg)", color: "var(--jr-cream-2)", lineHeight: 1.65, marginBottom: "var(--jr-space-8)", maxWidth: "660px" }}>{t.heroP}</p>
              <div style={{ display: "flex", gap: "var(--jr-space-4)", flexWrap: "wrap", marginBottom: "var(--jr-space-8)" }}>
                <Button href="#quote-form" variant="primary" size="lg" iconRight>{t.heroCta}</Button>
                <Button href="tel:8444443114" variant="outline" size="lg" iconLeft={<PhoneIcon size={18} />}>{t.heroCall}</Button>
              </div>
              <div style={{ display: "flex", gap: "var(--jr-space-8)", flexWrap: "wrap" }}>
                {t.stats.map((s, i) => (
                  <div key={i}>
                    <div style={{ fontFamily: "var(--jr-font-heading)", fontSize: "var(--jr-text-2xl)", fontWeight: 800, color: "var(--jr-gold)" }}>{s.value}</div>
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
            <SectionHeading eyebrow={t.problemEyebrow} title={t.problemTitle} theme="dark" />
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "var(--jr-space-5)" }}>
              {t.problems.map((p, i) => {
                const Icon = ICON_MAP[p.icon] || ShieldIcon;
                return (
                  <article key={i} className="jr-hover-lift" style={{ background: "var(--jr-navy)", border: "1px solid var(--jr-navy-3)", borderRadius: "var(--jr-radius-lg)", padding: "28px 24px", borderLeft: "4px solid var(--jr-gold)" }}>
                    <div style={{ width: 52, height: 52, borderRadius: "var(--jr-radius-md)", background: "var(--jr-gold-pale)", border: "1px solid rgba(200, 149, 46, 0.32)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "var(--jr-space-4)", color: "var(--jr-gold)" }}>
                      <Icon size={26} />
                    </div>
                    <h3 style={{ fontFamily: "var(--jr-font-heading)", fontSize: "var(--jr-text-lg)", fontWeight: 700, color: "var(--jr-paper)", marginBottom: "var(--jr-space-2)" }}>{p.title}</h3>
                    <p style={{ fontFamily: "var(--jr-font-body)", fontSize: "var(--jr-text-md)", color: "var(--jr-muted-on-dark)", lineHeight: 1.6 }}>{p.desc}</p>
                  </article>
                );
              })}
            </div>
          </Container>
        </section>

        {/* ── SOLUTION ── */}
        <section style={{ background: "var(--jr-navy)", padding: "var(--jr-space-20) 0" }}>
          <Container>
            <SectionHeading eyebrow={t.solutionEyebrow} title={t.solutionTitle} subtitle={t.solutionSub} theme="dark" />
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "var(--jr-space-5)" }}>
              {t.solutions.map((s, i) => (
                <article key={i} className="jr-hover-lift" style={{ background: "var(--jr-navy-deep)", border: "1px solid var(--jr-navy-3)", borderRadius: "var(--jr-radius-lg)", padding: "28px 24px" }}>
                  <div style={{ fontFamily: "var(--jr-font-heading)", fontSize: "var(--jr-text-xs)", fontWeight: 700, color: "var(--jr-gold)", letterSpacing: "2px", marginBottom: "var(--jr-space-2)" }}>0{i + 1}</div>
                  <h3 style={{ fontFamily: "var(--jr-font-heading)", fontSize: "var(--jr-text-lg)", fontWeight: 700, color: "var(--jr-paper)", marginBottom: "var(--jr-space-3)" }}>{s.title}</h3>
                  <p style={{ fontFamily: "var(--jr-font-body)", fontSize: "var(--jr-text-md)", color: "var(--jr-muted-on-dark)", lineHeight: 1.65 }}>{s.desc}</p>
                </article>
              ))}
            </div>
          </Container>
        </section>

        {/* ── BUILDING TYPES ── */}
        <section style={{ background: "var(--jr-navy-deep)", padding: "var(--jr-space-20) 0" }}>
          <Container>
            <SectionHeading eyebrow={t.scopeEyebrow} title={t.scopeTitle} subtitle={t.scopeSub} theme="dark" />
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "var(--jr-space-5)" }}>
              {t.scopeItems.map((g, i) => {
                const Icon = ICON_MAP[g.icon] || HouseIcon;
                return (
                  <article key={i} className="jr-hover-lift" style={{ background: "var(--jr-navy)", border: "1px solid var(--jr-navy-3)", borderRadius: "var(--jr-radius-lg)", padding: "28px 24px", borderTop: "4px solid var(--jr-gold)" }}>
                    <div style={{ width: 52, height: 52, borderRadius: "var(--jr-radius-md)", background: "var(--jr-gold-pale)", border: "1px solid rgba(200, 149, 46, 0.32)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "var(--jr-space-4)", color: "var(--jr-gold)" }}>
                      <Icon size={26} />
                    </div>
                    <h3 style={{ fontFamily: "var(--jr-font-heading)", fontSize: "var(--jr-text-lg)", fontWeight: 700, color: "var(--jr-paper)", marginBottom: "var(--jr-space-3)" }}>{g.title}</h3>
                    <p style={{ fontFamily: "var(--jr-font-body)", fontSize: "var(--jr-text-md)", color: "var(--jr-muted-on-dark)", lineHeight: 1.6 }}>{g.desc}</p>
                  </article>
                );
              })}
            </div>
          </Container>
        </section>

        {/* ── GC CALLOUT ── */}
        <section style={{ background: "var(--jr-navy)", padding: "var(--jr-space-12) 0", borderTop: "var(--jr-hair-darker)", borderBottom: "var(--jr-hair-darker)" }}>
          <Container>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "var(--jr-space-6)" }}>
              <div style={{ flex: "1 1 460px" }}>
                <div style={{ fontFamily: "var(--jr-font-heading)", fontSize: "var(--jr-text-xs)", fontWeight: 700, color: "var(--jr-gold)", letterSpacing: "2px", marginBottom: "var(--jr-space-2)", textTransform: "uppercase" }}>{t.gcEyebrow}</div>
                <h3 style={{ fontFamily: "var(--jr-font-heading)", fontSize: "var(--jr-text-xl)", fontWeight: 800, color: "var(--jr-paper)", lineHeight: 1.3, marginBottom: "var(--jr-space-2)" }}>{t.gcTitle}</h3>
                <p style={{ fontFamily: "var(--jr-font-body)", fontSize: "var(--jr-text-md)", color: "var(--jr-muted-on-dark)", lineHeight: 1.6 }}>{t.gcDesc}</p>
              </div>
              <div style={{ flexShrink: 0 }}>
                <Button href="/contact" variant="primary" size="md" iconRight>{t.gcBtn}</Button>
              </div>
            </div>
          </Container>
        </section>

        {/* ── GOLD STANDARD ── */}
        <section style={{ background: "var(--jr-navy-deep)", padding: "var(--jr-space-20) 0" }}>
          <Container>
            <SectionHeading eyebrow={t.goldEyebrow} title={t.goldTitle} subtitle={t.goldSub} theme="dark" />
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "var(--jr-space-5)" }}>
              {t.goldSteps.map((step) => (
                <ProcessStep key={step.num} num={step.num} title={step.title} desc={step.desc} />
              ))}
            </div>
          </Container>
        </section>

        {/* ── REVIEWS ── */}
        <section style={{ background: "var(--jr-navy)", padding: "var(--jr-space-20) 0" }}>
          <Container>
            <SectionHeading eyebrow={t.reviewsEyebrow} title={t.reviewsTitle} theme="dark" />
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "var(--jr-space-5)" }}>
              {t.reviews.map((rev, i) => (
                <ReviewCard key={i} {...rev} />
              ))}
            </div>
          </Container>
        </section>

        {/* ── FAQ ── */}
        <section style={{ background: "var(--jr-navy-deep)", padding: "var(--jr-space-20) 0" }}>
          <Container size="prose">
            <SectionHeading eyebrow={t.faqEyebrow} title={t.faqTitle} theme="dark" />
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
                  <div aria-hidden style={{ width: 40, height: 3, background: "var(--jr-gold)", borderRadius: 2, margin: "10px auto var(--jr-space-5)" }} />
                  <input aria-label={t.formName} style={inputStyle} placeholder={t.formName} value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required />
                  <input aria-label={t.formPhone} style={inputStyle} placeholder={t.formPhone} type="tel" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} required />
                  <input aria-label={t.formEmail} style={inputStyle} placeholder={t.formEmail} type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
                  <input aria-label={t.formZip} style={inputStyle} placeholder={t.formZip} value={formData.zip} onChange={(e) => setFormData({ ...formData, zip: e.target.value })} maxLength={5} />
                  <Button type="submit" variant="primary" size="md" fullWidth iconRight disabled={loading}>{loading ? "Sending..." : t.formBtn}</Button>
                  <p style={{ fontFamily: "var(--jr-font-body)", fontSize: "var(--jr-text-xs)", color: "var(--jr-muted-on-light)", textAlign: "center", marginTop: "var(--jr-space-3)" }}>{t.formNote}</p>
                </form>
              )}
            </div>
            <div style={{ marginTop: "var(--jr-space-8)" }}>
              <Button href="tel:8444443114" variant="ghost" size="md" iconLeft={<PhoneIcon size={16} />}>(844) 444-3114</Button>
            </div>
          </Container>
        </section>
      </main>

      <SiteFooter />
      <MobileCTA scrollTarget="quote-form" />
    </div>
  );
}
