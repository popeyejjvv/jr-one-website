"use client";

/* ═══════════════════════════════════════════════════════════
   JR ONE ALUMINUM / SPECIALTY GUTTERS SERVICE PAGE
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
import { CheckCircleIcon, PhoneIcon } from "../../lib/icons";

const T = {
  en: {
    breadcrumb: ["Home", "Services", "Specialty Gutters"],
    heroTag: "CUSTOM & SPECIALTY GUTTER SYSTEMS",
    heroH1: "Beyond Standard.",
    heroH1Gold: "Built for Your Home.",
    heroP: "Half-round, box, D-style, super gutter, commercial, and more. When standard gutters won't do, our specialty systems deliver the precision, capacity, and look your home demands.",
    btnEstimate: "GET YOUR FREE ESTIMATE",
    btnCall: "(844) 444-3114",
    stats: [
      { value: "6+", label: "Specialty profiles" },
      { value: "8\"", label: "Max half-round size" },
      { value: "100+", label: "Ft seamless runs" },
      { value: ".050", label: "Gauge max thickness" },
    ],
    problemTag: "WHY IT MATTERS",
    problemTitle: "Why Standard Gutters Fall Short in Florida",
    problems: [
      { title: "Standard gutters overflow in Florida storms", desc: "Undersized gutters can't handle 2 to 4 inches of rain per hour. Your foundation, landscaping, and fascia pay the price every summer." },
      { title: "Wrong gutter style ruins architectural look", desc: "K-style on a Mediterranean home. Half-round on a modern build. The wrong profile cheapens your entire exterior." },
      { title: "Light-gauge gutters fail in hurricane winds", desc: "Cheap .019 gauge aluminum bends, pulls away from fascia, and rips off in high winds. Florida demands heavier materials." },
    ],
    typesTag: "THE JR ONE WAY",
    typesTitle: "Specialty Gutter Systems",
    typesSub: "Six profiles. Each engineered for a specific purpose, architecture, and performance requirement.",
    gutterTypes: [
      { emoji: "🏛️", title: "Half-Round Gutters", desc: "The classic semicircular profile. Elegant, smooth interior reduces debris buildup. Available in multiple sizes for different applications. Pairs perfectly with Mediterranean, Spanish Colonial, and barrel tile roofs. Tampa Bay's most popular architectural styles.", spec: "Profile: Classic semicircular" },
      { emoji: "💧", title: "Super Gutter", desc: "The maximum-capacity residential gutter system. Oversized profile engineered to handle Florida's most extreme rainfall without overflow. When standard gutters can't keep up with your roof's water volume, the Super Gutter delivers the performance you need.", spec: "Grade: Maximum capacity" },
      { emoji: "📐", title: "D-Style Gutters", desc: "A smooth, single-curve profile that sits flush against the fascia for a clean, streamlined appearance. Popular across Florida residential homes for its simple look and reliable water handling. A versatile option that works with virtually any architectural style.", spec: "Profile: Smooth single-curve" },
      { emoji: "🏗️", title: "Box Style Gutters", desc: "Rectangular profile with maximum water capacity. Built into roof structures or hung externally. Custom-fabricated on a brake for exact dimensions. Ideal for commercial buildings, modern homes, and flat-roof drainage.", spec: "Profile: Rectangular / custom" },
      { emoji: "🏠", title: "Commercial Gutters", desc: "Oversized, heavy-duty systems in .032 to .050 gauge aluminum. 6\" to 8\" K-style or box profile with 3x4 or 4x5 downspouts. Closer hanger spacing for hurricane-grade wind resistance. Built for large roof areas.", spec: "Grade: Heavy-duty commercial" },
      { emoji: "🔧", title: "Rollform / Seamless", desc: "Every gutter we install is rollformed on-site from continuous aluminum coil. Custom-cut to the exact length your home needs. No seams means no leaks. Up to 100+ feet in a single piece.", spec: "Method: On-site fabrication" },
    ],
    whyEyebrow: "WHY SPECIALTY",
    whyTitle: "Why the Right Gutter Matters",
    whySpecialty: [
      { emoji: "🏠", title: "Right gutter for the right home", desc: "Cookie-cutter doesn't cut it. Your architecture, roof style, and water volume determine the right system." },
      { emoji: "💧", title: "Florida rainfall demands capacity", desc: "46 to 52 inches per year, 2 to 4 inches per hour in storms. Undersized gutters overflow. We size every system for Florida's demands." },
      { emoji: "🎨", title: "Architectural integrity", desc: "Half-round on a barrel tile roof. Box on a modern build. The right gutter completes the design." },
      { emoji: "💪", title: "Hurricane-grade construction", desc: "Heavier gauge, closer hanger spacing, and proper sizing for Florida's demanding conditions." },
    ],
    goldEyebrow: "THE GOLD STANDARD",
    goldTitle: "Our Specialty Gutter Process",
    goldSub: "Every home. Every time. No exceptions.",
    goldSteps: [
      { num: "01", title: "Assess", desc: "We inspect your roofline, measure water concentration points, evaluate architectural style, and recommend the right specialty system." },
      { num: "02", title: "Design", desc: "Material selection, size calculation, color matching, and downspout placement. You see the plan before we cut metal." },
      { num: "03", title: "Install", desc: "On-site fabrication and precise installation by our trained in-house crew. No subcontractors, no shortcuts." },
      { num: "04", title: "Protect", desc: "Final walkthrough, gutter performance testing, and our craftsmanship warranty." },
    ],
    reviewEyebrow: "REVIEWS",
    reviewTitle: "What Our Customers Say",
    reviews: [
      { text: "After Milton I called a dozen companies. Only JR One called back. The team showed up and did a perfect job. Do not call anyone else.", name: "Matt D.", service: "Storm Damage Repair", stars: 5 },
      { text: "Six guys on site with a crew manager. They removed old wood soffit, replaced everything with aluminum, fixed all termite damage. Done in days. Best company for the money.", name: "Tampa Homeowner", service: "Full Soffit & Fascia", stars: 5 },
      { text: "From the very beginning, they worked to ensure I received a fair quote. There was no high pressure selling. The workmanship was outstanding.", name: "Lois G.", service: "Gutters & Soffits", stars: 5 },
    ],
    faqEyebrow: "FAQ",
    faqTitle: "Specialty Gutter Questions",
    faqs: [
      { q: "What size gutters do I need in Tampa?", a: "For most Florida homes, 6\" gutters with 3x4 downspouts should be the baseline, and we recommend 7\" for larger roof areas or heavy tree coverage. We size every system based on your roof area, pitch, and local rainfall intensity." },
      { q: "Are half-round gutters more expensive?", a: "Yes, typically 20 to 30% more than K-style due to the profile and specialty mounting brackets. But on Mediterranean, Spanish, and barrel-tile homes, they're the architecturally correct choice." },
      { q: "Do you install copper specialty gutters?", a: "Yes. Copper half-round, European half-round, and copper box gutters. See our dedicated copper gutters page for details." },
      { q: "What gauge aluminum do you use?", a: ".027 minimum for residential, .032 recommended for Florida conditions, up to .050 for commercial and high-wind applications. We never use cheap .019 gauge." },
      { q: "Do you do commercial gutter work?", a: "Yes. We install 6\" to 8\" commercial gutter systems with oversized downspouts on offices, retail, churches, schools, and multi-family buildings throughout Tampa Bay." },
    ],
    ctaTitle: "NEED A SYSTEM THAT GOES BEYOND STANDARD?",
    ctaSub: "Get your free specialty gutter consultation. We'll assess your home, recommend the right system, and give you a transparent estimate.",
    formTitle: "Get Your Free Estimate",
    formName: "Full Name",
    formPhone: "Phone Number",
    formEmail: "Email Address",
    formZip: "ZIP Code",
    formBtn: "Request My Free Estimate",
    formDisclaimer: "No spam. No pressure. Just honest advice.",
    formSuccess: "Quote Request Received",
    formSuccessSub: "We'll get back to you within hours.",
    preferTalk: "Prefer to talk?",
  },
  es: {
    breadcrumb: ["Inicio", "Servicios", "Canaletas Especiales"],
    heroTag: "SISTEMAS DE CANALETAS PERSONALIZADOS",
    heroH1: "Mas Alla del Estandar.",
    heroH1Gold: "Construido para Su Hogar.",
    heroP: "Media cana, caja, estilo D, super canaleta, comercial y mas. Cuando las canaletas estandar no son suficientes, nuestros sistemas especiales ofrecen la precision, capacidad y estetica que su hogar exige.",
    btnEstimate: "OBTENGA SU ESTIMADO GRATIS",
    btnCall: "(844) 444-3114",
    stats: [
      { value: "6+", label: "Perfiles especiales" },
      { value: "8\"", label: "Tamano max media cana" },
      { value: "100+", label: "Pies de tramos sin costuras" },
      { value: ".050", label: "Calibre max de espesor" },
    ],
    problemTag: "POR QUE IMPORTA",
    problemTitle: "Por Que las Canaletas Estandar se Quedan Cortas",
    problems: [
      { title: "Las canaletas estandar se desbordan en tormentas de Florida", desc: "Las canaletas de tamano insuficiente no pueden manejar 2 a 4 pulgadas de lluvia por hora. Su fundacion, jardin y fascia pagan el precio cada verano." },
      { title: "El estilo equivocado arruina la arquitectura", desc: "Estilo K en una casa mediterranea. Media cana en una construccion moderna. El perfil equivocado abarata todo su exterior." },
      { title: "Las canaletas de calibre ligero fallan en huracanes", desc: "El aluminio barato de calibre .019 se dobla, se desprende de la fascia y se arranca con vientos fuertes. Florida exige materiales mas pesados." },
    ],
    typesTag: "EL OFICIO ESPECIALIZADO",
    typesTitle: "Sistemas de Canaletas Especiales",
    typesSub: "Seis perfiles. Cada uno disenado para un proposito, arquitectura y requisito de rendimiento especifico.",
    gutterTypes: [
      { emoji: "🏛️", title: "Canaletas Media Cana", desc: "El perfil semicircular clasico. Elegante, su interior liso reduce la acumulacion de escombros. Disponible en multiples tamanos. Combina perfectamente con techos mediterraneos, coloniales espanoles y de teja barril. Los estilos arquitectonicos mas populares de Tampa Bay.", spec: "Perfil: Semicircular clasico" },
      { emoji: "💧", title: "Super Canaleta", desc: "El sistema de canaletas residencial de maxima capacidad. Perfil sobredimensionado disenado para manejar las lluvias mas extremas de Florida sin desbordamiento. Cuando las canaletas estandar no pueden con el volumen de agua de su techo, la Super Canaleta entrega el rendimiento que necesita.", spec: "Grado: Capacidad maxima" },
      { emoji: "📐", title: "Canaletas Estilo D", desc: "Un perfil liso de curva unica que se asienta al ras contra la fascia para una apariencia limpia y aerodinamica. Popular en hogares residenciales de Florida por su estetica simple y manejo confiable de agua. Una opcion versatil que funciona con practicamente cualquier estilo arquitectonico.", spec: "Perfil: Curva unica lisa" },
      { emoji: "🏗️", title: "Canaletas Estilo Caja", desc: "Perfil rectangular con capacidad maxima de agua. Integradas en estructuras de techo o montadas externamente. Fabricadas a medida en una dobladora para dimensiones exactas. Ideal para edificios comerciales, hogares modernos y drenaje de techos planos.", spec: "Perfil: Rectangular / personalizado" },
      { emoji: "🏠", title: "Canaletas Comerciales", desc: "Sistemas sobredimensionados de alta resistencia en aluminio de calibre .032 a .050. Perfil K o caja de 6\" a 8\" con bajantes de 3x4 o 4x5. Espaciado de soportes mas cercano para resistencia a vientos de huracan. Disenados para grandes areas de techo.", spec: "Grado: Comercial de alta resistencia" },
      { emoji: "🔧", title: "Rollform / Sin Costuras", desc: "Cada canaleta que instalamos se forma en el sitio a partir de bobina continua de aluminio. Cortada a medida exacta para su hogar. Sin costuras significa sin filtraciones. Hasta 100+ pies en una sola pieza.", spec: "Metodo: Fabricacion en sitio" },
    ],
    whyEyebrow: "POR QUE ESPECIALES",
    whyTitle: "Por Que Importa la Canaleta Correcta",
    whySpecialty: [
      { emoji: "🏠", title: "La canaleta correcta para el hogar correcto", desc: "Lo generico no funciona. Su arquitectura, estilo de techo y volumen de agua determinan el sistema correcto." },
      { emoji: "💧", title: "La lluvia de Florida exige capacidad", desc: "46 a 52 pulgadas por ano, 2 a 4 pulgadas por hora en tormentas. Las canaletas de tamano insuficiente se desbordan. Dimensionamos cada sistema para las exigencias de Florida." },
      { emoji: "🎨", title: "Integridad arquitectonica", desc: "Media cana en un techo de teja barril. Caja en una construccion moderna. La canaleta correcta completa el diseno." },
      { emoji: "💪", title: "Construccion de grado huracan", desc: "Calibre mas pesado, espaciado de soportes mas cercano y dimensionamiento adecuado para las condiciones exigentes de Florida." },
    ],
    goldEyebrow: "EL ESTANDAR DE ORO",
    goldTitle: "Nuestro Proceso",
    goldSub: "Cada hogar. Cada vez. Sin excepciones.",
    goldSteps: [
      { num: "01", title: "Evaluar", desc: "Inspeccionamos su linea de techo, medimos puntos de concentracion de agua, evaluamos el estilo arquitectonico y recomendamos el sistema especial adecuado." },
      { num: "02", title: "Disenar", desc: "Seleccion de material, calculo de tamano, combinacion de color y ubicacion de bajantes. Usted ve el plan antes de que cortemos metal." },
      { num: "03", title: "Instalar", desc: "Fabricacion en sitio e instalacion de precision por nuestro equipo interno capacitado. Sin subcontratistas, sin atajos." },
      { num: "04", title: "Proteger", desc: "Recorrido final, prueba de rendimiento de canaletas y nuestra garantia de mano de obra." },
    ],
    reviewEyebrow: "RESENAS",
    reviewTitle: "Lo Que Dicen los Clientes",
    reviews: [
      { text: "Despues de Milton llame a una docena de empresas. Solo JR One devolvio la llamada. El equipo se presento e hizo un trabajo perfecto. No llame a nadie mas.", name: "Matt D.", service: "Reparacion por Tormenta", stars: 5 },
      { text: "Seis personas en el sitio con un gerente de equipo. Removieron el sofito viejo de madera, reemplazaron todo con aluminio, arreglaron todo el dano por termitas. Listo en dias. La mejor empresa por el dinero.", name: "Tampa Homeowner", service: "Sofito y Fascia Completo", stars: 5 },
      { text: "Desde el principio, se esforzaron para asegurar que recibiera una cotizacion justa. No hubo presion de venta. La calidad del trabajo fue excepcional.", name: "Lois G.", service: "Canaletas y Sofitos", stars: 5 },
    ],
    faqEyebrow: "PREGUNTAS",
    faqTitle: "Preguntas Sobre Canaletas Especiales",
    faqs: [
      { q: "Que tamano de canaletas necesito en Tampa?", a: "Para la mayoria de los hogares en Florida, canaletas de 6\" con bajantes de 3x4 deben ser el minimo, y recomendamos 7\" para areas de techo mas grandes o mucha cobertura de arboles. Dimensionamos cada sistema segun el area de su techo, inclinacion e intensidad de lluvia local." },
      { q: "Son mas caras las canaletas de media cana?", a: "Si, tipicamente 20 a 30% mas que el estilo K debido al perfil y los soportes de montaje del oficio especializado. Pero en hogares mediterraneos, espanoles y de teja barril, son la eleccion arquitectonicamente correcta." },
      { q: "Instalan canaletas especiales de cobre?", a: "Si. Media cana de cobre, media cana europea y canaletas de caja de cobre. Vea nuestra pagina dedicada de canaletas de cobre para detalles." },
      { q: "Que calibre de aluminio usan?", a: ".027 minimo para residencial, .032 recomendado para condiciones de Florida, hasta .050 para aplicaciones comerciales y de alto viento. Nunca usamos el calibre barato .019." },
      { q: "Hacen trabajo comercial de canaletas?", a: "Si. Instalamos sistemas de canaletas comerciales de 6\" a 8\" con bajantes sobredimensionados en oficinas, locales comerciales, iglesias, escuelas y edificios multifamiliares en todo Tampa Bay." },
    ],
    ctaTitle: "NECESITA UN SISTEMA MAS ALLA DEL ESTANDAR?",
    ctaSub: "Obtenga su consulta gratuita de canaletas especiales. Evaluaremos su hogar, recomendaremos el sistema correcto y le daremos un estimado transparente.",
    formTitle: "Obtenga Su Estimado Gratis",
    formName: "Nombre Completo",
    formPhone: "Numero de Telefono",
    formEmail: "Correo Electronico",
    formZip: "Codigo Postal",
    formBtn: "Solicitar Mi Estimado Gratis",
    formDisclaimer: "Sin spam. Sin presion. Solo consejo honesto.",
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

// Page-identity accent: violet (custom-craft, premium specialty profiles).
const ACCENT = "#8B5CF6";
const ACCENT_LIGHT = "#A78BFA";

export default function SpecialtyGuttersPage() {
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
          service: "Specialty Gutters", zip: formData.zip,
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
                <Button href="#quote-form" variant="primary" size="lg" iconRight accent={ACCENT} accentLight={ACCENT_LIGHT}>{t.btnEstimate}</Button>
                <Button href="tel:8444443114" variant="outline" size="lg" iconLeft={<PhoneIcon size={18} />} accent={ACCENT}>{t.btnCall}</Button>
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
            <SectionHeading eyebrow={t.problemTag} title={t.problemTitle} theme="dark" accent={ACCENT} />
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "var(--jr-space-5)" }}>
              {t.problems.map((p, i) => (
                <article key={i} style={{ background: "var(--jr-navy)", border: "1px solid var(--jr-navy-3)", borderRadius: "var(--jr-radius-lg)", padding: "var(--jr-space-6)", borderLeft: `4px solid ${ACCENT_LIGHT}` }}>
                  <h3 style={{ fontFamily: "var(--jr-font-heading)", fontSize: "var(--jr-text-lg)", fontWeight: 700, color: "var(--jr-paper)", marginBottom: "var(--jr-space-2)" }}>{p.title}</h3>
                  <p style={{ fontFamily: "var(--jr-font-body)", fontSize: "var(--jr-text-md)", color: "var(--jr-muted-on-dark)", lineHeight: 1.6 }}>{p.desc}</p>
                </article>
              ))}
            </div>
          </Container>
        </section>

        <section style={{ background: "var(--jr-navy)", padding: "var(--jr-space-20) 0" }}>
          <Container>
            <SectionHeading eyebrow={t.typesTag} title={t.typesTitle} subtitle={t.typesSub} theme="dark" accent={ACCENT} />
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "var(--jr-space-5)" }}>
              {t.gutterTypes.map((g, i) => (
                <article key={i} className="jr-hover-lift" style={{ background: "var(--jr-navy-deep)", border: "1px solid var(--jr-navy-3)", borderRadius: "var(--jr-radius-lg)", padding: "var(--jr-space-6)", borderTop: `3px solid ${ACCENT_LIGHT}` }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "var(--jr-space-3)", marginBottom: "var(--jr-space-3)" }}>
                    <div style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 44, height: 44, background: "rgba(255, 255, 255, 0.06)", border: `1px solid ${ACCENT_LIGHT}`, borderRadius: "var(--jr-radius-md)" }}>
                      <span aria-hidden style={{ fontSize: 22, lineHeight: 1 }}>{g.emoji}</span>
                    </div>
                    <div style={{ fontFamily: "var(--jr-font-heading)", fontSize: "var(--jr-text-xs)", fontWeight: 700, color: "var(--jr-cream-2)", letterSpacing: "2px" }}>0{i + 1}</div>
                  </div>
                  <h3 style={{ fontFamily: "var(--jr-font-heading)", fontSize: "var(--jr-text-lg)", fontWeight: 700, color: "var(--jr-paper)", marginBottom: "var(--jr-space-3)" }}>{g.title}</h3>
                  <p style={{ fontFamily: "var(--jr-font-body)", fontSize: "var(--jr-text-md)", color: "var(--jr-muted-on-dark)", lineHeight: 1.6, marginBottom: "var(--jr-space-3)" }}>{g.desc}</p>
                  <div style={{ fontFamily: "var(--jr-font-heading)", fontSize: "var(--jr-text-xs)", fontWeight: 600, color: "var(--jr-cream-2)", letterSpacing: "1px", padding: "6px 12px", background: "rgba(255, 255, 255, 0.06)", border: `1px solid ${ACCENT_LIGHT}`, borderRadius: "var(--jr-radius-sm)", display: "inline-block" }}>{g.spec}</div>
                </article>
              ))}
            </div>
          </Container>
        </section>

        <section style={{ background: "var(--jr-navy-deep)", padding: "var(--jr-space-20) 0" }}>
          <Container>
            <SectionHeading eyebrow={t.whyEyebrow} title={t.whyTitle} theme="dark" accent={ACCENT} />
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "var(--jr-space-5)" }}>
              {t.whySpecialty.map((w, i) => (
                <article key={i} style={{ background: "var(--jr-navy)", border: "1px solid var(--jr-navy-3)", borderRadius: "var(--jr-radius-lg)", padding: "var(--jr-space-6)", borderLeft: `4px solid ${ACCENT_LIGHT}` }}>
                  <span aria-hidden style={{ display: "inline-block", fontSize: 22, lineHeight: 1, marginBottom: "var(--jr-space-2)" }}>{w.emoji}</span>
                  <h3 style={{ fontFamily: "var(--jr-font-heading)", fontSize: "var(--jr-text-md)", fontWeight: 700, color: "var(--jr-paper)", marginBottom: "var(--jr-space-2)" }}>{w.title}</h3>
                  <p style={{ fontFamily: "var(--jr-font-body)", fontSize: "var(--jr-text-md)", color: "var(--jr-muted-on-dark)", lineHeight: 1.55 }}>{w.desc}</p>
                </article>
              ))}
            </div>
          </Container>
        </section>

        <section style={{ background: "var(--jr-navy)", padding: "var(--jr-space-20) 0" }}>
          <Container>
            <SectionHeading eyebrow={t.goldEyebrow} title={t.goldTitle} subtitle={t.goldSub} theme="dark" accent={ACCENT} />
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "var(--jr-space-5)" }}>
              {t.goldSteps.map((step) => <ProcessStep key={step.num} num={step.num} title={step.title} desc={step.desc} accent={ACCENT} />)}
            </div>
          </Container>
        </section>

        <section style={{ background: "var(--jr-navy-deep)", padding: "var(--jr-space-20) 0" }}>
          <Container>
            <SectionHeading eyebrow={t.reviewEyebrow} title={t.reviewTitle} theme="dark" accent={ACCENT} />
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "var(--jr-space-5)" }}>
              {t.reviews.map((rev, i) => <ReviewCard key={i} {...rev} />)}
            </div>
          </Container>
        </section>

        <section style={{ background: "var(--jr-navy)", padding: "var(--jr-space-20) 0" }}>
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
          title={lang === "en" ? "Right Gutter, Right Home." : "Canaleta Correcta, Hogar Correcto."}
          sub={lang === "en" ? "Get your free specialty consultation today." : "Obtenga su consulta especializada gratis hoy."}
          primaryLabel={lang === "en" ? "Request a Quote" : "Solicitar Cotizacion"}
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
