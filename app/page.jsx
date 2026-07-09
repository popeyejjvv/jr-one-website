"use client";

/* ═══════════════════════════════════════════════════════════
   JR ONE ALUMINUM, HOMEPAGE
   Brand-brain compliant. Design-elevated.
   Tokens via app/tokens.css. Components via components/ui/.
   ═══════════════════════════════════════════════════════════ */

import { useState } from "react";
import { useLanguage } from "../lib/LanguageContext";
import SiteNav from "../components/SiteNav";
import SiteFooter from "../components/SiteFooter";
import MobileCTA from "../components/MobileCTA";
import Container from "../components/ui/Container";
import Button from "../components/ui/Button";
import SectionHeading from "../components/ui/SectionHeading";
import ServiceCard from "../components/ui/ServiceCard";
import PhotoUpload from "../components/ui/PhotoUpload";
import ReviewCard from "../components/ui/ReviewCard";
import FAQAccordion from "../components/ui/FAQAccordion";
import ProcessStep from "../components/ui/ProcessStep";
import CTABand from "../components/ui/CTABand";
import { CheckCircleIcon, ArrowRightIcon, PhoneIcon } from "../lib/icons";

const T = {
  en: {
    heroTag: "TAMPA BAY SPECIALTY TRADE",
    heroH1a: "Done Right.",
    heroH1b: "Done Once.",
    heroH1c: "Guaranteed.",
    heroSub:
      "Gutters, soffit, fascia, drainage, and Peak 301 roof rejuvenation. Installed by our own crews, never subcontractors. Family-owned, over 30 years in the trade.",
    formTitle: "Get Your Free Quote",
    formName: "Full Name",
    formPhone: "Phone Number",
    formEmail: "Email Address",
    formService: "What do you need?",
    formZip: "ZIP Code",
    formBtn: "Request My Free Quote",
    formNote: "No spam. No pressure.",
    formSent: "Quote Request Received",
    formSentSub: "We'll get back to you within hours. In the meantime, try our instant estimator below.",
    serviceOpt: ["Select a service...", "Commercial Gutters", "Copper Gutters", "Drainage Installation", "Govee Lights", "Gutter Cleaning", "Gutter Guards", "Gutter Repair", "Peak 301", "SAGIPER", "Seamless Gutters", "Service Plans", "Siding", "Soffit & Fascia", "Specialty Gutters", "HOA Contracts", "Rental Property Maintenance", "Other / Not Sure"],
    trustBadges: [
      { emoji: "⏱", label: "Family-Owned", color: "#60A5FA", bg: "rgba(59, 130, 246, 0.15)", border: "rgba(59, 130, 246, 0.32)" },
      { emoji: "⭐", label: "4.9★ Rating", color: "#F2CD69", bg: "rgba(212, 168, 67, 0.15)", border: "rgba(212, 168, 67, 0.32)" },
      { emoji: "👷", label: "In-House Crews", color: "#F97316", bg: "rgba(249, 115, 22, 0.15)", border: "rgba(249, 115, 22, 0.28)" },
      { emoji: "✓", label: "Fully Insured", color: "#4ADE80", bg: "rgba(45, 139, 78, 0.18)", border: "rgba(45, 139, 78, 0.42)" },
    ],
    hablamos: "Hablamos Español",
    goldEyebrow: "The Gold Standard",
    goldTitle: "The Gold Standard",
    goldSub: "Every home. Every time. No exceptions.",
    goldSteps: [
      { num: "01", title: "Assess", desc: "A free on-site inspection. We listen, document everything with photos, and give you an honest evaluation. No pressure." },
      { num: "02", title: "Design", desc: "A custom solution built for your home with a detailed, transparent estimate. You see exactly what you're getting and why." },
      { num: "03", title: "Install", desc: "Our trained in-house crew handles the installation. We protect your property, communicate every step, and clean up like we were never there." },
      { num: "04", title: "Protect", desc: "We walk through the finished work with you, back it with our craftsmanship warranty, and follow up to make sure you're satisfied." },
    ],
    servicesEyebrow: "What We Do",
    servicesTitle: "What We Do",
    servicesSub: "Gutters, soffit, fascia, drainage, and Peak 301. Tampa Bay specialty trade.",
    serviceCards: [
      { icon: "💧", title: "Seamless Gutters", desc: "Custom-fabricated on-site for a perfect fit. 6\" and 7\" systems in your choice of color.", link: "/seamless-aluminum-gutters" },
      { icon: "🛡️", title: "Gutter Guards", desc: "Stop climbing ladders. Our guard systems keep debris out and water flowing.", link: "/gutter-guards" },
      { icon: "🏗️", title: "Soffit & Fascia", desc: "Aluminum and vinyl installations that protect your roof edge and clean up the trim line.", link: "/soffit-and-fascia" },
      { icon: "🔧", title: "Gutter Repair", desc: "Sagging, leaking, or damaged. We fix it right so you don't have to call again.", link: "/gutter-repair" },
      { icon: "📐", title: "Siding", desc: "Vinyl siding installation and repair. Weather-tough protection for Florida homes.", link: "/siding" },
      { icon: "🧽", title: "Gutter Cleaning", desc: "One-time deep cleans across Tampa Bay. Removes leaves, palm fronds, and pine needles before they back up the system.", link: "/gutter-cleaning" },
      { icon: "🧹", title: "Maintenance Plans", desc: "Recurring gutter cleaning, pressure washing, window cleaning, and seasonal maintenance plans.", link: "/service-plans" },
    ],
    whyEyebrow: "Why Us",
    whyTitle: "Why Homeowners Choose JR One",
    whyItems: [
      { title: "We specialize. Period.", desc: "Your roofer does roofs. Your painter does paint. We do gutters, soffit, and fascia, and we do them right. Singular focus means every installation benefits from thousands of hours of specialized experience." },
      { title: "Our crew. Not subcontractors.", desc: "Every person on your property is a trained JR One team member. No random subs, no surprise faces, no finger-pointing if something goes wrong." },
      { title: "Done right the first time.", desc: "We don't cut corners. We don't want callbacks. Our price reflects that you won't have to call us back. If you do, we keep coming back until everything meets your standards." },
      { title: "Your neighbors trust us.", desc: "4.9 stars on Google. Family-owned and family-operated. Over 30 years in the Tampa Bay trade. We live here, we work here, and our reputation is built one home at a time." },
    ],
    reviewsEyebrow: "Reviews",
    reviewsTitle: "What Our Customers Say",
    reviews: [
      { text: "From the very beginning, they worked to ensure I received a fair quote. There was no high pressure selling. The workmanship was outstanding, and they took pictures of each step showing me what was transpiring.", name: "Lois G.", service: "Gutters & Soffits", stars: 5 },
      { text: "We referred a customer to JR One and they could not stop praising his workmanship and professionalism. They will be the go-to for all our gutter and soffit requests from customers.", name: "Adam E.", service: "Contractor Referral", stars: 5 },
      { text: "After Milton I called a dozen companies. Only JR One called back. The team showed up and did a perfect job. Do not call anyone else.", name: "Matt D.", service: "Storm Damage Repair", stars: 5 },
      { text: "Six guys on site with a crew manager. They removed old wood soffit, replaced everything with aluminum, fixed all termite damage. Done in days. Best company for the money.", name: "Tampa Homeowner", service: "Full Soffit & Fascia", stars: 5 },
    ],
    reviewsCta: "Read all 55+ reviews on Google",
    estimatorEyebrow: "Instant Estimator",
    estimatorTitle: "See Your Price Range in 60 Seconds",
    estimatorSub: "Use the instant estimator to explore pricing for your project. Measure your roof from satellite imagery and get a price range, fast.",
    estimatorBtn: "Open the Estimator",
    estimatorNote: "Real numbers from your actual roof. No spam, no pressure.",
    emailTitle: "Stay Protected",
    emailSub: "Seasonal maintenance tips, storm prep guides, and exclusive offers.",
    emailPlaceholder: "Enter your email",
    emailBtn: "Subscribe",
    emailNote: "Unsubscribe anytime.",
    emailSent: "You're in. Check your inbox soon.",
    faqEyebrow: "FAQ",
    faqTitle: "Frequently Asked Questions",
    faqs: [
      { q: "How much do new gutters cost in Tampa?", a: "Gutter installation in Tampa typically ranges from $11 to $20 per linear foot depending on size, material, and complexity. We provide free, detailed estimates so you know exactly what you're paying for. No hidden fees." },
      { q: "Do you use subcontractors?", a: "Never. Every person on your property is a trained, full-time JR One crew member. That's how we maintain quality control and accountability on every job." },
      { q: "How long does gutter installation take?", a: "Most residential gutter installations are completed in a single day. Larger projects involving soffit, fascia, and gutters together typically take 2 to 3 days." },
      { q: "Do you offer financing?", a: "Yes. We offer flexible financing options to make quality gutter and aluminum services accessible. Ask about our current programs when you request your free quote." },
      { q: "What areas do you serve?", a: "We serve Tampa, Clearwater, St. Petersburg, Sarasota, Bradenton, Lakeland, Brandon, Wesley Chapel, Palm Harbor, Riverview, and 20 more cities across Florida's west coast." },
      { q: "Why hire a gutter specialist instead of my roofer?", a: "Roofing companies handle gutters as an afterthought, often subcontracting the work. We focus exclusively on aluminum systems. Better materials, better installation techniques, better results." },
    ],
    ctaTitle: "Ready to Protect Your Home?",
    ctaSub: "Get your free, no-pressure quote today. Call us or fill out the form. We respond within hours, not days.",
    ctaForm: "Request a Quote",
  },
  es: {
    heroTag: "OFICIO ESPECIALIZADO DE TAMPA BAY",
    heroH1a: "Bien Hecho.",
    heroH1b: "Una Sola Vez.",
    heroH1c: "Garantizado.",
    heroSub:
      "Canaletas, sofito, fascia, drenaje y rejuvenecimiento Peak 301. Instalado por nuestro propio equipo, nunca subcontratistas. Empresa familiar, más de 30 años en el oficio.",
    formTitle: "Obtenga Su Cotización Gratis",
    formName: "Nombre Completo",
    formPhone: "Número de Teléfono",
    formEmail: "Correo Electrónico",
    formService: "¿Qué necesita?",
    formZip: "Código Postal",
    formBtn: "Solicitar Mi Cotización Gratis",
    formNote: "Sin spam. Sin presión.",
    formSent: "Solicitud Recibida",
    formSentSub: "Le responderemos en horas. Mientras tanto, pruebe nuestro estimador instantáneo.",
    serviceOpt: ["Seleccione un servicio...", "Canaletas Comerciales", "Canaletas de Cobre", "Instalación de Drenaje", "Luces Govee", "Limpieza de Canaletas", "Protectores de Canaletas", "Reparación de Canaletas", "Peak 301", "SAGIPER", "Canaletas Sin Costura", "Planes de Servicio", "Revestimiento", "Sofito y Fascia", "Canaletas Especiales", "Contratos HOA", "Mantenimiento de Alquileres", "Otro / No Estoy Seguro"],
    trustBadges: [
      { emoji: "⏱", label: "Empresa Familiar", color: "#60A5FA", bg: "rgba(59, 130, 246, 0.15)", border: "rgba(59, 130, 246, 0.32)" },
      { emoji: "⭐", label: "4.9★ Calificación", color: "#F2CD69", bg: "rgba(212, 168, 67, 0.15)", border: "rgba(212, 168, 67, 0.32)" },
      { emoji: "👷", label: "Equipo Propio", color: "#F97316", bg: "rgba(249, 115, 22, 0.15)", border: "rgba(249, 115, 22, 0.28)" },
      { emoji: "✓", label: "Totalmente Asegurados", color: "#4ADE80", bg: "rgba(45, 139, 78, 0.18)", border: "rgba(45, 139, 78, 0.42)" },
    ],
    hablamos: "We Speak English",
    goldEyebrow: "El Estándar de Oro",
    goldTitle: "El Estándar de Oro",
    goldSub: "Cada hogar. Cada vez. Sin excepciones.",
    goldSteps: [
      { num: "01", title: "Evaluar", desc: "Inspección gratuita en su hogar. Escuchamos, documentamos todo con fotos y le damos una evaluación honesta. Sin presión." },
      { num: "02", title: "Diseñar", desc: "Una solución personalizada con un presupuesto detallado y transparente. Usted ve exactamente lo que recibirá y por qué." },
      { num: "03", title: "Instalar", desc: "Nuestro equipo capacitado realiza la instalación. Protegemos su propiedad, comunicamos cada paso y limpiamos como si nunca hubiéramos estado ahí." },
      { num: "04", title: "Proteger", desc: "Revisamos el trabajo terminado con usted, lo respaldamos con nuestra garantía de calidad y hacemos seguimiento para asegurar su satisfacción." },
    ],
    servicesEyebrow: "Lo Que Hacemos",
    servicesTitle: "Lo Que Hacemos",
    servicesSub: "Canaletas, sofito, fascia, drenaje y Peak 301. Oficio especializado en Tampa Bay.",
    serviceCards: [
      { icon: "💧", title: "Canaletas Sin Costura", desc: "Fabricadas a medida en el sitio. Sistemas de 6\" y 7\" en el color de su elección.", link: "/seamless-aluminum-gutters" },
      { icon: "🛡️", title: "Protectores de Canaletas", desc: "Deje de subir escaleras. Nuestros protectores mantienen los escombros afuera y el agua fluyendo.", link: "/gutter-guards" },
      { icon: "🏗️", title: "Sofito y Fascia", desc: "Instalaciones de aluminio y vinilo que protegen el borde de su techo y mejoran la línea de acabado.", link: "/soffit-and-fascia" },
      { icon: "🔧", title: "Reparación de Canaletas", desc: "Hundidas, con fugas o dañadas. Lo arreglamos bien para que no tenga que llamar de nuevo.", link: "/gutter-repair" },
      { icon: "📐", title: "Revestimiento", desc: "Instalación y reparación de revestimiento de vinilo. Protección resistente al clima para hogares de Florida.", link: "/siding" },
      { icon: "🧽", title: "Limpieza de Canaletas", desc: "Limpiezas profundas de una sola vez en Tampa Bay. Remueve hojas, hojas de palma y agujas de pino antes que tapen el sistema.", link: "/gutter-cleaning" },
      { icon: "🧹", title: "Planes de Mantenimiento", desc: "Limpieza de canaletas recurrente, lavado a presión, limpieza de ventanas y planes de mantenimiento estacional.", link: "/service-plans" },
    ],
    whyEyebrow: "Por Qué",
    whyTitle: "Por Qué los Propietarios Eligen JR One",
    whyItems: [
      { title: "Nos especializamos. Punto.", desc: "Su techador hace techos. Su pintor pinta. Nosotros hacemos canaletas, sofito y fascia, y lo hacemos bien. Enfoque singular significa miles de horas de experiencia especializada en cada instalación." },
      { title: "Nuestro equipo. No subcontratistas.", desc: "Cada persona en su propiedad es un miembro capacitado del equipo JR One. Sin sorpresas, sin caras desconocidas." },
      { title: "Bien hecho a la primera.", desc: "No cortamos esquinas. No queremos que nos vuelvan a llamar. Si lo hacen, regresamos hasta que todo cumpla con sus estándares." },
      { title: "Sus vecinos confían en nosotros.", desc: "4.9 estrellas en Google. Empresa familiar, operada por la familia. Más de 30 años en el oficio. Vivimos aquí, trabajamos aquí, y nuestra reputación se construye hogar por hogar." },
    ],
    reviewsEyebrow: "Reseñas",
    reviewsTitle: "Lo Que Dicen Nuestros Clientes",
    reviews: [
      { text: "Desde el principio, trabajaron para asegurar que recibiera una cotización justa. No hubo presión de venta. El trabajo fue excepcional y tomaron fotos de cada paso.", name: "Lois G.", service: "Canaletas y Sofito", stars: 5 },
      { text: "Referimos a un cliente a JR One y no podían dejar de elogiar su profesionalismo. Serán nuestra referencia para todos los trabajos de canaletas y sofito.", name: "Adam E.", service: "Referencia de Contratista", stars: 5 },
      { text: "Después de Milton llamé a una docena de empresas. Solo JR One devolvió la llamada. Hicieron un trabajo perfecto. No llame a nadie más.", name: "Matt D.", service: "Reparación por Tormenta", stars: 5 },
      { text: "Seis personas en el sitio con un gerente de equipo. Removieron el sofito viejo de madera, reemplazaron todo con aluminio, arreglaron todo el daño de termitas. Hecho en días.", name: "Propietario de Tampa", service: "Sofito y Fascia Completo", stars: 5 },
    ],
    reviewsCta: "Lea las 55+ reseñas en Google",
    estimatorEyebrow: "Estimador Instantáneo",
    estimatorTitle: "Vea Su Rango de Precio en 60 Segundos",
    estimatorSub: "Use el estimador instantáneo para explorar precios. Mida su techo desde imágenes satelitales y obtenga un rango de precio al instante.",
    estimatorBtn: "Abrir el Estimador",
    estimatorNote: "Números reales de su techo. Sin spam, sin presión.",
    emailTitle: "Manténgase Protegido",
    emailSub: "Consejos de mantenimiento, guías de preparación para tormentas y ofertas exclusivas.",
    emailPlaceholder: "Ingrese su correo",
    emailBtn: "Suscribirse",
    emailNote: "Cancele cuando quiera.",
    emailSent: "¡Listo! Revise su correo pronto.",
    faqEyebrow: "Preguntas",
    faqTitle: "Preguntas Frecuentes",
    faqs: [
      { q: "¿Cuánto cuestan canaletas nuevas en Tampa?", a: "La instalación de canaletas en Tampa típicamente varía de $11 a $20 por pie lineal dependiendo del tamaño, material y complejidad. Proporcionamos presupuestos gratuitos y detallados. Sin tarifas ocultas." },
      { q: "¿Usan subcontratistas?", a: "Nunca. Cada persona en su propiedad es un miembro capacitado y de tiempo completo del equipo JR One." },
      { q: "¿Cuánto tarda la instalación de canaletas?", a: "La mayoría de las instalaciones residenciales se completan en un solo día. Proyectos más grandes con sofito y fascia toman 2 a 3 días." },
      { q: "¿Ofrecen financiamiento?", a: "Sí. Ofrecemos opciones de financiamiento flexibles para hacer accesibles nuestros servicios de calidad." },
      { q: "¿Qué áreas atienden?", a: "Servimos Tampa, Clearwater, St. Petersburg, Sarasota, Bradenton, Lakeland, Brandon, Wesley Chapel y más de 20 ciudades en la costa oeste de Florida." },
      { q: "¿Por qué contratar un especialista en canaletas en vez de mi techador?", a: "Las empresas de techos manejan las canaletas como algo secundario, frecuentemente subcontratando el trabajo. Nosotros nos especializamos exclusivamente en sistemas de aluminio." },
    ],
    ctaTitle: "¿Listo Para Proteger Su Hogar?",
    ctaSub: "Obtenga su cotización gratuita hoy. Llámenos o complete el formulario. Respondemos en horas, no días.",
    ctaForm: "Solicitar Cotización",
    esBannerEyebrow: "HABLAMOS ESPAÑOL",
    esBannerH2: "Servicio Bilingüe Para Familias de Tampa Bay",
    esBannerSub: "Sirviendo a la comunidad hispana de Tampa Bay por más de 30 años. Familia que entiende familia. Llámenos al (844) 444-3114 para un estimado gratis sin presión.",
    esBannerCallCta: "Llamar (844) 444-3114",
    esBannerFormCta: "Estimado Gratis",
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

export default function JROneHomepage() {
  const { lang } = useLanguage();
  const t = T[lang];
  const [formData, setFormData] = useState({ name: "", phone: "", email: "", service: "", zip: "" });
  const [photos, setPhotos] = useState([]);
  const [photoProcessing, setPhotoProcessing] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formLoading, setFormLoading] = useState(false);
  const [emailInput, setEmailInput] = useState("");
  const [emailSubmitted, setEmailSubmitted] = useState(false);

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
          service: formData.service,
          zip: formData.zip,
          photos,
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

  const handleEmail = (e) => {
    e?.preventDefault?.();
    if (emailInput.trim()) setEmailSubmitted(true);
  };

  return (
    <div style={{ background: "var(--jr-navy)", color: "var(--jr-paper)", minHeight: "100vh" }}>
      <a href="#main" className="jr-skip-link">Skip to content</a>
      <SiteNav />

      <main id="main">
        {/* ── HERO ── */}
        <section
          className="jr-noise-bg"
          style={{
            position: "relative",
            minHeight: "calc(100dvh - 88px)",
            display: "flex",
            alignItems: "center",
            padding: "var(--jr-space-20) var(--jr-space-6) var(--jr-space-16)",
            background: "linear-gradient(165deg, var(--jr-navy-deep) 0%, var(--jr-navy) 55%, var(--jr-navy-2) 100%)",
            overflow: "hidden",
          }}
        >
          <div
            aria-hidden
            style={{
              position: "absolute",
              top: 0, left: 0, right: 0, bottom: 0,
              background: "radial-gradient(ellipse at 28% 22%, rgba(200,149,46,0.08) 0%, transparent 60%)",
              pointerEvents: "none",
            }}
          />
          <Container>
            <div style={{ display: "grid", gridTemplateColumns: "minmax(0, 1.15fr) minmax(0, 0.85fr)", gap: "var(--jr-space-12)", alignItems: "center", position: "relative", zIndex: 1 }} className="jr-hero-grid">
              <div>
                <div style={{ fontFamily: "var(--jr-font-heading)", fontSize: "var(--jr-text-xs)", fontWeight: 700, color: "var(--jr-gold)", letterSpacing: "4px", marginBottom: "var(--jr-space-4)", textTransform: "uppercase" }}>
                  {t.heroTag}
                </div>
                <h1 style={{ fontFamily: "var(--jr-font-heading)", fontSize: "var(--jr-text-4xl)", fontWeight: 800, lineHeight: 1.05, marginBottom: "var(--jr-space-6)", letterSpacing: "-0.5px" }}>
                  {t.heroH1a}<br />
                  {t.heroH1b}<br />
                  <span style={{ color: "var(--jr-gold)" }}>{t.heroH1c}</span>
                </h1>
                <p style={{ fontFamily: "var(--jr-font-body)", fontSize: "var(--jr-text-lg)", color: "var(--jr-cream-2)", lineHeight: 1.65, marginBottom: "var(--jr-space-6)", maxWidth: "540px" }}>
                  {t.heroSub}
                </p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", marginBottom: "var(--jr-space-6)" }}>
                  {t.trustBadges.map((b, i) => (
                    <div
                      key={i}
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "8px",
                        padding: "8px 14px",
                        background: b.bg,
                        border: `1px solid ${b.border}`,
                        borderRadius: "var(--jr-radius-md)",
                      }}
                    >
                      <span aria-hidden style={{ fontSize: 16 }}>{b.emoji}</span>
                      <span
                        style={{
                          fontFamily: "var(--jr-font-heading)",
                          fontSize: "13px",
                          fontWeight: 600,
                          color: b.color,
                          letterSpacing: "0.3px",
                        }}
                      >
                        {b.label}
                      </span>
                    </div>
                  ))}
                </div>
                <div style={{ display: "inline-flex", alignItems: "center", gap: "var(--jr-space-2)", fontFamily: "var(--jr-font-heading)", fontSize: "13px", fontWeight: 600, color: "var(--jr-gold)", letterSpacing: "1px", textTransform: "uppercase" }}>
                  {t.hablamos}
                </div>
              </div>

              {/* Quote form */}
              <div id="quote-form">
                <div
                  style={{
                    background: "var(--jr-paper)",
                    borderRadius: "var(--jr-radius-xl)",
                    padding: "var(--jr-space-8) var(--jr-space-6)",
                    boxShadow: "var(--jr-shadow-form)",
                  }}
                >
                  {formSubmitted ? (
                    <div style={{ textAlign: "center", padding: "var(--jr-space-6) 0" }}>
                      <div style={{ display: "inline-flex", color: "var(--jr-success)", marginBottom: "var(--jr-space-3)" }}>
                        <CheckCircleIcon size={48} />
                      </div>
                      <h2 style={{ fontFamily: "var(--jr-font-heading)", fontSize: "var(--jr-text-xl)", fontWeight: 700, color: "var(--jr-navy)", marginBottom: "var(--jr-space-2)" }}>
                        {t.formSent}
                      </h2>
                      <p style={{ fontFamily: "var(--jr-font-body)", fontSize: "var(--jr-text-md)", color: "var(--jr-muted-on-light)" }}>
                        {t.formSentSub}
                      </p>
                    </div>
                  ) : (
                    <form onSubmit={handleForm}>
                      <h2 style={{ fontFamily: "var(--jr-font-heading)", fontSize: "var(--jr-text-xl)", fontWeight: 700, color: "var(--jr-navy)", textAlign: "center", marginBottom: "var(--jr-space-1)" }}>
                        {t.formTitle}
                      </h2>
                      <div aria-hidden style={{ width: 40, height: 3, background: "var(--jr-gold)", borderRadius: 2, margin: "10px auto var(--jr-space-5)" }} />
                      <input aria-label={t.formName} style={inputStyle} placeholder={t.formName} value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required />
                      <input aria-label={t.formPhone} style={inputStyle} placeholder={t.formPhone} type="tel" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} required />
                      <input aria-label={t.formEmail} style={inputStyle} placeholder={t.formEmail} type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
                      <select aria-label={t.formService} style={{ ...inputStyle, cursor: "pointer" }} value={formData.service} onChange={(e) => setFormData({ ...formData, service: e.target.value })}>
                        {t.serviceOpt.map((opt, i) => (
                          <option key={i} value={i === 0 ? "" : opt}>{opt}</option>
                        ))}
                      </select>
                      <input aria-label={t.formZip} style={inputStyle} placeholder={t.formZip} value={formData.zip} onChange={(e) => setFormData({ ...formData, zip: e.target.value })} maxLength={5} />
                      <PhotoUpload
                        photos={photos}
                        onChange={setPhotos}
                        onProcessingChange={setPhotoProcessing}
                        theme="light"
                        idPrefix="hero-photo"
                      />
                      <Button type="submit" variant="primary" size="md" fullWidth iconRight disabled={formLoading || photoProcessing}>
                        {formLoading ? "Sending..." : t.formBtn}
                      </Button>
                      <p style={{ fontFamily: "var(--jr-font-body)", fontSize: "var(--jr-text-xs)", color: "var(--jr-muted-on-light)", textAlign: "center", marginTop: "var(--jr-space-3)" }}>
                        {t.formNote}
                      </p>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* ── THE GOLD STANDARD ── */}
        <section id="gold-standard" style={{ background: "var(--jr-navy)", padding: "var(--jr-space-20) 0" }}>
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

        {/* ── HABLAMOS ESPAÑOL TRUST BANNER (only renders on /es) ── */}
        {lang === "es" && (
          <section
            aria-label="Hablamos Español"
            style={{
              position: "relative",
              backgroundImage:
                "linear-gradient(135deg, rgba(11,22,51,0.78) 0%, rgba(17,32,67,0.82) 60%, rgba(22,42,80,0.86) 100%), url('/images/spanish-hero-familia.webp')",
              backgroundSize: "cover",
              backgroundPosition: "center",
              padding: "var(--jr-space-20) 0",
              borderTop: "1px solid var(--jr-navy-3)",
              borderBottom: "1px solid var(--jr-navy-3)",
            }}
          >
            <Container>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "minmax(0, 1fr)",
                  maxWidth: 760,
                  margin: "0 auto",
                  textAlign: "center",
                  position: "relative",
                  zIndex: 1,
                }}
              >
                <div
                  style={{
                    fontFamily: "var(--jr-font-heading)",
                    fontSize: "var(--jr-text-xs)",
                    fontWeight: 700,
                    color: "var(--jr-gold)",
                    letterSpacing: "4px",
                    marginBottom: "var(--jr-space-3)",
                    textTransform: "uppercase",
                  }}
                >
                  {t.esBannerEyebrow}
                </div>
                <h2
                  style={{
                    fontFamily: "var(--jr-font-heading)",
                    fontSize: "var(--jr-text-3xl)",
                    fontWeight: 800,
                    lineHeight: 1.1,
                    color: "var(--jr-paper)",
                    marginBottom: "var(--jr-space-4)",
                    textShadow: "0 2px 8px rgba(0,0,0,0.45)",
                  }}
                >
                  {t.esBannerH2}
                </h2>
                <p
                  style={{
                    fontFamily: "var(--jr-font-body)",
                    fontSize: "var(--jr-text-lg)",
                    color: "var(--jr-cream-2)",
                    lineHeight: 1.65,
                    marginBottom: "var(--jr-space-8)",
                  }}
                >
                  {t.esBannerSub}
                </p>
                <div
                  style={{
                    display: "flex",
                    gap: "var(--jr-space-4)",
                    justifyContent: "center",
                    flexWrap: "wrap",
                  }}
                >
                  <Button
                    href="tel:8444443114"
                    variant="primary"
                    size="lg"
                    iconLeft={<PhoneIcon size={18} />}
                  >
                    {t.esBannerCallCta}
                  </Button>
                  <Button href="#quote-form" variant="outline" size="lg" iconRight>
                    {t.esBannerFormCta}
                  </Button>
                </div>
              </div>
            </Container>
          </section>
        )}

        {/* ── SERVICES ── */}
        <section style={{ background: "var(--jr-navy-deep)", padding: "var(--jr-space-20) 0" }}>
          <Container>
            <SectionHeading
              eyebrow={t.servicesEyebrow}
              title={t.servicesTitle}
              subtitle={t.servicesSub}
              theme="dark"
            />
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "var(--jr-space-5)" }}>
              {t.serviceCards.map((svc, i) => (
                <ServiceCard
                  key={i}
                  icon={svc.icon}
                  title={svc.title}
                  desc={svc.desc}
                  href={svc.link}
                  cta={lang === "en" ? "Learn more" : "Más info"}
                />
              ))}
            </div>
          </Container>
        </section>

        {/* ── WHY JR ONE ── */}
        <section style={{ background: "var(--jr-navy)", padding: "var(--jr-space-20) 0" }}>
          <Container size="narrow">
            <SectionHeading
              eyebrow={t.whyEyebrow}
              title={t.whyTitle}
              theme="dark"
            />
            <div>
              {t.whyItems.map((item, i) => (
                <div key={i} style={{ display: "flex", gap: "var(--jr-space-5)", marginBottom: "var(--jr-space-8)", alignItems: "flex-start" }}>
                  <div
                    aria-hidden
                    style={{
                      flexShrink: 0,
                      width: 56,
                      height: 56,
                      borderRadius: "var(--jr-radius-md)",
                      background: "var(--jr-gold-pale)",
                      border: "1px solid rgba(212, 175, 55, 0.32)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontFamily: "var(--jr-font-heading)",
                      fontSize: "20px",
                      fontWeight: 800,
                      color: "var(--jr-gold)",
                    }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <div>
                    <h3 style={{ fontFamily: "var(--jr-font-heading)", fontSize: "var(--jr-text-lg)", fontWeight: 700, color: "var(--jr-paper)", marginBottom: "var(--jr-space-2)" }}>
                      {item.title}
                    </h3>
                    <p style={{ fontFamily: "var(--jr-font-body)", fontSize: "var(--jr-text-md)", color: "var(--jr-muted-on-dark)", lineHeight: 1.65 }}>
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Container>
        </section>

        {/* ── REVIEWS ── */}
        <section id="reviews" style={{ background: "var(--jr-navy)", padding: "var(--jr-space-20) 0", borderTop: "var(--jr-hair-darker)" }}>
          <Container>
            <SectionHeading
              eyebrow={t.reviewsEyebrow}
              title={t.reviewsTitle}
              theme="dark"
            />
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "var(--jr-space-5)" }}>
              {t.reviews.map((rev, i) => (
                <ReviewCard key={i} {...rev} />
              ))}
            </div>
            <div style={{ marginTop: "var(--jr-space-8)", textAlign: "center" }}>
              <Button
                href="https://www.google.com/maps/place/JR+One+Aluminum+LLC+-+Gutter+Repair+%26+Installation/@27.961411,-82.5006675,17z?utm_source=jronegutters&utm_medium=website&utm_campaign=homepage-reviews"
                variant="ghost"
                size="md"
                iconRight
              >
                {t.reviewsCta}
              </Button>
            </div>
          </Container>
        </section>

        {/* ── ESTIMATOR ── */}
        <section id="estimator" style={{ background: "var(--jr-navy-deep)", padding: "var(--jr-space-20) 0" }}>
          <Container size="narrow">
            <SectionHeading
              eyebrow={t.estimatorEyebrow}
              title={t.estimatorTitle}
              subtitle={t.estimatorSub}
              theme="dark"
            />
            <div style={{ textAlign: "center" }}>
              <Button href="/estimator" variant="primary" size="lg" iconRight>
                {t.estimatorBtn}
              </Button>
              <p style={{ fontFamily: "var(--jr-font-body)", fontSize: "var(--jr-text-sm)", color: "var(--jr-muted-on-dark)", marginTop: "var(--jr-space-4)" }}>
                {t.estimatorNote}
              </p>
            </div>
          </Container>
        </section>

        {/* ── EMAIL CAPTURE ── */}
        <section style={{ background: "var(--jr-gold)", padding: "var(--jr-space-16) 0" }}>
          <Container size="narrow" style={{ textAlign: "center" }}>
            <h2 style={{ fontFamily: "var(--jr-font-heading)", fontSize: "var(--jr-text-2xl)", fontWeight: 800, color: "var(--jr-navy)", marginBottom: "var(--jr-space-2)", letterSpacing: "0.5px", textTransform: "uppercase" }}>
              {t.emailTitle}
            </h2>
            <p style={{ fontFamily: "var(--jr-font-body)", fontSize: "var(--jr-text-md)", color: "var(--jr-navy-deep)", marginBottom: "var(--jr-space-6)", opacity: 0.85 }}>
              {t.emailSub}
            </p>
            {emailSubmitted ? (
              <p style={{ display: "inline-flex", alignItems: "center", gap: 8, fontFamily: "var(--jr-font-heading)", fontSize: "var(--jr-text-md)", fontWeight: 600, color: "var(--jr-navy)" }}>
                <CheckCircleIcon size={18} /> {t.emailSent}
              </p>
            ) : (
              <form
                onSubmit={handleEmail}
                style={{ display: "flex", gap: "var(--jr-space-3)", maxWidth: 520, margin: "0 auto", flexWrap: "wrap", justifyContent: "center" }}
              >
                <input
                  aria-label={t.emailPlaceholder}
                  placeholder={t.emailPlaceholder}
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  type="email"
                  style={{
                    flex: "1 1 280px",
                    padding: "14px 18px",
                    fontFamily: "var(--jr-font-body)",
                    fontSize: "15px",
                    border: "2px solid rgba(27, 42, 74, 0.18)",
                    borderRadius: "var(--jr-radius-md)",
                    outline: "none",
                    color: "var(--jr-navy)",
                    background: "rgba(255, 255, 255, 0.92)",
                  }}
                />
                <Button type="submit" variant="navy" size="md">{t.emailBtn}</Button>
              </form>
            )}
            <p style={{ fontFamily: "var(--jr-font-body)", fontSize: "12px", color: "var(--jr-navy-deep)", marginTop: "var(--jr-space-3)", opacity: 0.65 }}>
              {t.emailNote}
            </p>
          </Container>
        </section>

        {/* ── FAQ ── */}
        <section id="faq" style={{ background: "var(--jr-navy)", padding: "var(--jr-space-20) 0" }}>
          <Container size="prose">
            <SectionHeading
              eyebrow={t.faqEyebrow}
              title={t.faqTitle}
              theme="dark"
            />
            <FAQAccordion items={t.faqs} theme="dark" />
          </Container>
        </section>

        {/* ── FINAL CTA ── */}
        <CTABand
          title={t.ctaTitle}
          sub={t.ctaSub}
          primaryLabel={t.ctaForm}
          primaryHref="#quote-form"
        />
      </main>

      <SiteFooter />
      <MobileCTA scrollTarget="quote-form" />

      <style>{`
        @media (max-width: 900px) {
          .jr-hero-grid {
            grid-template-columns: 1fr !important;
            gap: var(--jr-space-8) !important;
          }
        }
      `}</style>
    </div>
  );
}
