"use client";

/* ═══════════════════════════════════════════════════════════
   JR ONE ALUMINUM / SEAMLESS GUTTERS SERVICE PAGE
   Brand-brain compliant. Design-elevated.
   Tokens via app/tokens.css. Components via components/ui/.
   ═══════════════════════════════════════════════════════════ */

import { useState } from "react";
import { useLanguage } from "../../lib/LanguageContext";
import { useLeadGuard } from "../../lib/lead-guard";
import { submitLeadForm, SUBMIT_ERROR_STYLE } from "../../lib/lead-submit";
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
    breadcrumb: ["Home", "Services", "Seamless Aluminum Gutters"],
    heroTag: "SEAMLESS GUTTER INSTALLATION",
    heroH1: "Tampa Bay's",
    heroH1Gold: "Seamless Gutter Systems",
    heroP: "Custom-fabricated on-site for a watertight, perfect fit. Our in-house crews install 6\" and 7\" seamless aluminum gutters that protect your home from Florida's relentless rain. Family-owned, over 30 years in the trade.",
    btnEstimate: "GET YOUR FREE ESTIMATE",
    btnEstimator: "SEE YOUR PRICE RANGE",
    btnCall: "(844) 444-3114",
    problemTag: "WHY GUTTERS MATTER",
    problemTitle: "Gutters Matter More Than You Think",
    problems: [
      { title: "Foundation damage", desc: "Without gutters, rainwater pools around your foundation causing cracks, settling, and costly structural repairs averaging $4,000 to $12,000." },
      { title: "Fascia and soffit rot", desc: "Uncontrolled water flow saturates your fascia boards and soffit panels, creating rot that spreads behind your walls." },
      { title: "Landscape erosion", desc: "Florida's heavy downpours carve trenches through mulch beds, wash away soil, and damage plantings you've invested in." },
      { title: "Mosquito breeding", desc: "Standing water from failed or missing gutters creates the perfect breeding ground for mosquitoes. A year-round Florida problem." },
    ],
    solutionTag: "THE JR ONE WAY",
    solutionTitle: "How We Do Gutters",
    solutionSub: "Six things we do that most gutter companies don't.",
    solutions: [
      { emoji: "🏗️", title: "Custom-fabricated on your property", desc: "We bring our gutter machine to your home and fabricate each run on-site to the exact measurements. No factory pre-cuts, no splices, no seams that leak. Every piece fits your roofline perfectly." },
      { emoji: "📐", title: "Two sizes for every situation", desc: "6\" high-capacity systems for homes with standard to large roof areas. 7\" commercial-grade gutters for maximum water handling during Florida storms. We recommend 6\" as the baseline for every Florida home. Undersized gutters overflow during summer storms." },
      { emoji: "💪", title: "Multiple gauge options to fit your needs", desc: "We carry a range of aluminum gauges from standard .027 up to heavy-duty .032, and we help you choose the right one for your home, budget, and weather exposure. Thicker gauges resist denting and last longer. We will never upsell you on what you don't need." },
      { emoji: "🔧", title: "Hidden hanger system", desc: "Internal hangers every 24 inches for maximum strength. No spike-and-ferrule showing on the face of your gutters. Cleaner look, stronger hold, longer lifespan." },
      { emoji: "💧", title: "Pitched right for Florida rain", desc: "Every gutter run is pitched at the correct slope for proper water flow. Incorrect pitch is the #1 cause of gutter overflow and standing water, and it's the mistake subcontracted gutter installers make most often." },
      { emoji: "🎨", title: "Wide color selection", desc: "Match your gutters to your trim, fascia, roof, or siding. We carry the full aluminum coil color spectrum so your gutters look intentional, not afterthought. The exact palette varies by product and by supplier, so we bring samples to the estimate." },
    ],
    stats: [
      { value: "3,000+", label: "Lifetime gutter installations" },
      { value: "20-30", label: "Year lifespan on our systems" },
      { value: "Custom", label: "Color matched to your home" },
      { value: "24\"", label: "Hidden hanger spacing" },
    ],
    downspoutTitle: "Your Downspouts, Your Style",
    downspoutIntro: "Most homeowners don't realize they have options beyond the standard rectangular downspout. We install multiple downspout styles to match your home's look and drainage needs:",
    downspouts: [
      { name: "Standard Rectangular", desc: "The classic. Reliable and cost-effective." },
      { name: "Smooth Rectangular", desc: "Sleek, modern look with a flat finish." },
      { name: "Round Downspouts", desc: "Available in 2 sizes. Elegant and distinctive." },
      { name: "4x5 Rectangular", desc: "Oversized for maximum water volume." },
      { name: "Box Style Commercial", desc: "Heavy-duty for high-capacity systems." },
      { name: "Rain Chains", desc: "Decorative alternative. Visible water flow as a design feature." },
    ],
    downspoutNote: "Ask us about downspout options during your free estimate. The right choice can transform your home's curb appeal.",
    specialtyTitle: "Looking for Something Beyond Standard?",
    specialtyDesc: "We also install half-round, D-style, box, super gutter, and commercial specialty systems. If your home's architecture or water volume demands more than standard seamless gutters, we've got you covered.",
    specialtyBtn: "View Specialty Gutters",
    goldEyebrow: "THE GOLD STANDARD",
    goldTitle: "Our Gutter Installation Process",
    goldSub: "Every home. Every time. No exceptions.",
    goldSteps: [
      { num: "01", title: "Assess", desc: "We inspect your roofline, measure every run, check your fascia condition, and evaluate your drainage needs." },
      { num: "02", title: "Design", desc: "Custom gutter plan with sizes, downspout placement, color selection, and a transparent line-item estimate." },
      { num: "03", title: "Install", desc: "Our crew fabricates and installs your gutters on-site. Typically completed in a single day for most homes." },
      { num: "04", title: "Protect", desc: "Final walkthrough, water flow test, cleanup, and our craftsmanship warranty for lasting peace of mind." },
    ],
    reviewEyebrow: "REVIEWS",
    reviewTitle: "What Gutter Customers Say",
    reviews: [
      { text: "Chris and his team replaced the gutters on my home with 7\" gutters, changed downspouts to address standing water issues, then installed leaf guards. Very satisfied with the quality of work done and the entire team was very easy to work with.", name: "David K.", service: "7\" Gutter Upgrade + Guards", stars: 5 },
      { text: "Within just a couple of hours, the new gutters were in place. Their attention to detail was impressive. Chris also provided valuable tips on drainage and maintenance around the downspouts.", name: "Arif K.", service: "Full Gutter Installation", stars: 5 },
      { text: "From the very beginning, they worked to ensure I received a fair quote. There was no high pressure selling. They told me exactly what could be salvaged. The workmanship was outstanding.", name: "Lois G.", service: "Gutters & Soffits", stars: 5 },
    ],
    faqEyebrow: "FAQ",
    faqTitle: "Seamless Gutter Questions",
    faqs: [
      { q: "How much do seamless gutters cost in Tampa?", a: "Seamless aluminum gutter installation from JR One Aluminum in Tampa, FL typically ranges from $11 to $20 per linear foot. Price is driven by linear footage, gutter size (6\" or 7\"), roof height and ladder access, one-story versus two-story, roofline complexity and number of corners, and downspout configuration. Our estimates are detailed and transparent. You see every line item before any work begins. For a number on your own Tampa home, use the JR One estimator at jronegutters.com/estimator or call (844) 444-3114." },
      { q: "What's the difference between 6\" and 7\" gutters?", a: "The number refers to the width of the gutter opening. 6\" is our standard recommendation for Florida homes. It handles typical residential water flow plus the extra capacity needed for our heavy rain. 7\" is commercial-grade capacity for maximum water handling during intense storms, large roof areas, or steep pitches. We assess your home and recommend the right size." },
      { q: "How long does gutter installation take?", a: "Most residential gutter installations are completed in a single day. Homes with complex rooflines, multiple stories, or combined gutter and soffit/fascia projects may take 2 to 3 days. We give you a specific timeline before work begins." },
      { q: "Do seamless gutters really not leak?", a: "Seamless gutters eliminate the horizontal seams where sectional gutters typically fail. The only joints in a seamless system are at corners and downspout connections, and those are sealed with professional-grade sealant. The result is dramatically fewer leak points compared to pre-formed sectional gutters." },
      { q: "What colors are available for seamless gutters?", a: "We carry a wide selection in our aluminum coil inventory, and the exact palette varies by product and by supplier. The most popular choices in Tampa Bay are white, almond, clay, bronze, dark bronze, and black. We can match virtually any trim or fascia color on your home, and we bring samples to the estimate." },
      { q: "Why not just have my roofer install gutters?", a: "Roofing companies typically subcontract gutter work to the lowest bidder. The result is often incorrect pitch angles, thin-gauge aluminum, visible spike hangers, and poor corner work. We focus on aluminum systems (gutters, soffit, fascia), and every installation is performed by our trained in-house crew." },
      { q: "Do you remove old gutters?", a: "Yes. Our installation includes removal of your existing gutter system, inspection of the fascia board underneath, and cleanup of all old materials. If we find damaged fascia during removal, we'll discuss repair options with you before proceeding." },
    ],
    ctaTitle: "READY FOR GUTTERS THAT LAST?",
    ctaSub: "Get your free, no-pressure gutter assessment. We'll inspect your home, recommend the right system, and give you a transparent estimate. Typically within 48 hours.",
    formTitle: "Get Your Free Gutter Estimate",
    formName: "Full Name",
    formPhone: "Phone Number",
    formEmail: "Email Address",
    formZip: "ZIP Code",
    formBtn: "Request My Free Gutter Estimate",
    formDisclaimer: "No spam. No pressure. Just honest advice.",
    formSuccess: "Quote Request Received",
    formSuccessSub: "We'll get back to you within hours.",
    preferTalk: "Prefer to talk?",
  },
  es: {
    breadcrumb: ["Inicio", "Servicios", "Canaletas de Aluminio Sin Costuras"],
    heroTag: "INSTALACIÓN DE CANALETAS SIN COSTURAS",
    heroH1: "Sistemas de",
    heroH1Gold: "Canaletas Sin Costuras",
    heroP: "Fabricadas a medida en su propiedad para un ajuste perfecto y sin filtraciones. Nuestros equipos propios instalan canaletas de aluminio sin costuras de 6\" y 7\" que protegen su hogar de las lluvias de Florida. Empresa familiar, más de 30 años en el oficio.",
    btnEstimate: "OBTENGA SU ESTIMADO GRATIS",
    btnEstimator: "VEA SU RANGO DE PRECIO",
    btnCall: "(844) 444-3114",
    problemTag: "POR QUÉ IMPORTAN",
    problemTitle: "Las Canaletas Importan Más de lo que Cree",
    problems: [
      { title: "Daño a la fundación", desc: "Sin canaletas, el agua de lluvia se acumula alrededor de su fundación causando grietas, asentamiento y reparaciones estructurales costosas de $4,000 a $12,000 en promedio." },
      { title: "Pudrición de fascia y sofito", desc: "El flujo de agua sin control satura las tablas de fascia y los paneles de sofito, creando pudrición que se extiende detrás de sus paredes." },
      { title: "Erosión del jardín", desc: "Los aguaceros fuertes de Florida cavan zanjas en los lechos de mulch, arrastran el suelo y dañan las plantas en las que ha invertido." },
      { title: "Criadero de mosquitos", desc: "El agua estancada por canaletas dañadas o faltantes crea el caldo de cultivo perfecto para mosquitos. Un problema en Florida todo el año." },
    ],
    solutionTag: "EL OFICIO ESPECIALIZADO",
    solutionTitle: "Cómo Hacemos las Canaletas",
    solutionSub: "Seis cosas que hacemos que la mayoría de las empresas de canaletas no hacen.",
    solutions: [
      { emoji: "🏗️", title: "Fabricadas a medida en su propiedad", desc: "Llevamos nuestra máquina de canaletas a su hogar y fabricamos cada tramo en el sitio con las medidas exactas. Sin cortes prefabricados, sin empalmes, sin costuras que filtren. Cada pieza se ajusta perfectamente a su línea de techo." },
      { emoji: "📐", title: "Dos tamaños para cada situación", desc: "Sistemas de 6\" de alta capacidad para hogares con áreas de techo estándar a grandes. Canaletas de 7\" de grado comercial para máximo manejo de agua durante tormentas de Florida. Recomendamos 6\" como mínimo para cada hogar en Florida. Las canaletas pequeñas se desbordan durante las tormentas de verano." },
      { emoji: "💪", title: "Múltiples opciones de calibre", desc: "Manejamos una variedad de calibres de aluminio desde el estándar .027 hasta el de alta resistencia .032, y le ayudamos a elegir el adecuado para su hogar, presupuesto y exposición al clima. Los calibres más gruesos resisten abolladuras y duran más. Nunca le venderemos lo que no necesita." },
      { emoji: "🔧", title: "Sistema de soportes ocultos", desc: "Soportes internos cada 24 pulgadas para máxima resistencia. Sin clavos ni ferrulas visibles en la cara de sus canaletas. Mejor apariencia, mayor agarre, mayor vida útil." },
      { emoji: "💧", title: "Inclinación correcta para la lluvia de Florida", desc: "Cada tramo de canaleta tiene la inclinación correcta para un flujo de agua óptimo. La inclinación incorrecta es la causa #1 de desbordamiento y agua estancada, y es el error que los instaladores subcontratados cometen con más frecuencia." },
      { emoji: "🎨", title: "Amplia selección de colores", desc: "Combine sus canaletas con su moldura, fascia, techo o revestimiento. Tenemos el espectro completo de colores de aluminio para que sus canaletas se vean intencionales, no improvisadas. La paleta exacta varía según el producto y el proveedor, por eso llevamos muestras a la cita." },
    ],
    stats: [
      { value: "3,000+", label: "Instalaciones de canaletas acumuladas" },
      { value: "20-30", label: "Años de vida útil en nuestros sistemas" },
      { value: "A medida", label: "Color combinado con su casa" },
      { value: "24\"", label: "Espaciado de soportes ocultos" },
    ],
    downspoutTitle: "Sus Bajantes, Su Estilo",
    downspoutIntro: "La mayoría de los propietarios no saben que tienen opciones más allá del bajante rectangular estándar. Instalamos múltiples estilos de bajantes para combinar con la apariencia y necesidades de drenaje de su hogar:",
    downspouts: [
      { name: "Rectangular Estándar", desc: "El clásico. Confiable y económico." },
      { name: "Rectangular Liso", desc: "Aspecto elegante y moderno con acabado plano." },
      { name: "Bajantes Redondos", desc: "Disponibles en 2 tamaños. Elegantes y distintivos." },
      { name: "Rectangular 4x5", desc: "Sobredimensionado para máximo volumen de agua." },
      { name: "Estilo Caja Comercial", desc: "Alta resistencia para sistemas de alta capacidad." },
      { name: "Cadenas de Lluvia", desc: "Alternativa decorativa. Flujo de agua visible como elemento de diseño." },
    ],
    downspoutNote: "Pregúntenos sobre opciones de bajantes durante su estimado gratis. La elección correcta puede transformar la apariencia de su hogar.",
    specialtyTitle: "Buscando algo más allá de lo estándar?",
    specialtyDesc: "También instalamos sistemas de canaletas especiales: media caña, estilo D, caja, super canaleta y sistemas comerciales. Si la arquitectura o el volumen de agua de su hogar exige más que canaletas estándar, lo tenemos cubierto.",
    specialtyBtn: "Ver Canaletas Especiales",
    goldEyebrow: "EL ESTÁNDAR DE ORO",
    goldTitle: "Nuestro Proceso de Instalación",
    goldSub: "Cada hogar. Cada vez. Sin excepciones.",
    goldSteps: [
      { num: "01", title: "Evaluar", desc: "Inspeccionamos su línea de techo, medimos cada tramo, verificamos la condición de su fascia y evaluamos sus necesidades de drenaje." },
      { num: "02", title: "Diseñar", desc: "Plan de canaletas personalizado con tamaños, ubicación de bajantes, selección de color y un estimado detallado y transparente." },
      { num: "03", title: "Instalar", desc: "Nuestro equipo fabrica e instala sus canaletas en el sitio. Generalmente completado en un solo día para la mayoría de los hogares." },
      { num: "04", title: "Proteger", desc: "Recorrido final, prueba de flujo de agua, limpieza y nuestra garantía de mano de obra para su tranquilidad duradera." },
    ],
    reviewEyebrow: "RESEÑAS",
    reviewTitle: "Lo Que Dicen Nuestros Clientes",
    reviews: [
      { text: "Chris y su equipo reemplazaron las canaletas de mi casa con canaletas de 7\", cambiaron los bajantes para solucionar problemas de agua estancada y luego instalaron protectores de hojas. Muy satisfecho con la calidad del trabajo y todo el equipo fue muy fácil de trabajar.", name: "David K.", service: "Mejora de Canaleta 7\" + Protectores", stars: 5 },
      { text: "En solo un par de horas, las nuevas canaletas estaban instaladas. Su atención al detalle fue impresionante. Chris también me dio consejos valiosos sobre drenaje y mantenimiento alrededor de los bajantes.", name: "Arif K.", service: "Instalación Completa de Canaletas", stars: 5 },
      { text: "Desde el principio, se esforzaron para asegurar que recibiera una cotización justa. No hubo presión de venta. Me dijeron exactamente qué se podía salvar. La calidad del trabajo fue excepcional.", name: "Lois G.", service: "Canaletas y Sofitos", stars: 5 },
    ],
    faqEyebrow: "PREGUNTAS",
    faqTitle: "Preguntas Sobre Canaletas Sin Costuras",
    faqs: [
      { q: "Cuánto cuestan las canaletas sin costuras en Tampa?", a: "La instalación de canaletas de aluminio sin costuras de JR One Aluminum en Tampa, FL generalmente oscila entre $11 y $20 por pie lineal. El precio depende de los pies lineales, el tamaño de la canaleta (6\" o 7\"), la altura del techo y el acceso con escalera, si la casa es de uno o dos pisos, la complejidad de la línea de techo y número de esquinas, y la configuración de bajantes. Nuestros estimados son detallados y transparentes. Usted ve cada ítem antes de que comience cualquier trabajo. Para un número de su propia casa en Tampa, use el estimador de JR One en jronegutters.com/estimator o llame al (844) 444-3114." },
      { q: "Cuál es la diferencia entre canaletas de 6\" y 7\"?", a: "El número se refiere al ancho de la abertura de la canaleta. 6\" es nuestra recomendación estándar para hogares en Florida. Maneja el flujo de agua residencial típico más la capacidad extra necesaria para nuestras lluvias fuertes. 7\" es capacidad de grado comercial para máximo manejo de agua durante tormentas intensas, áreas de techo grandes o pendientes pronunciadas. Evaluamos su hogar y recomendamos el tamaño correcto." },
      { q: "Cuánto tiempo toma la instalación de canaletas?", a: "La mayoría de las instalaciones residenciales se completan en un solo día. Hogares con líneas de techo complejas, múltiples pisos o proyectos combinados de canaletas y sofito/fascia pueden tomar 2 a 3 días. Le damos un plazo específico antes de comenzar el trabajo." },
      { q: "Las canaletas sin costuras realmente no filtran?", a: "Las canaletas sin costuras eliminan las costuras horizontales donde las canaletas seccionales típicamente fallan. Las únicas uniones en un sistema sin costuras están en las esquinas y conexiones de bajantes, y esas se sellan con sellador de grado profesional. El resultado es dramáticamente menos puntos de filtración comparado con canaletas seccionales prefabricadas." },
      { q: "Qué colores están disponibles para canaletas sin costuras?", a: "Tenemos una amplia selección en nuestro inventario de bobinas de aluminio, y la paleta exacta varía según el producto y el proveedor. Las opciones más populares en Tampa Bay son blanco, almendra, arcilla, bronce, bronce oscuro y negro. Podemos igualar virtualmente cualquier color de moldura o fascia en su hogar, y llevamos muestras a la cita." },
      { q: "Por qué no dejar que mi techador instale las canaletas?", a: "Las empresas de techado típicamente subcontratan el trabajo de canaletas al mejor postor. El resultado a menudo es ángulos de inclinación incorrectos, aluminio de calibre delgado, clavos visibles y trabajo deficiente en las esquinas. Nos enfocamos en sistemas de aluminio (canaletas, sofito, fascia), y cada instalación la realiza nuestro equipo interno capacitado." },
      { q: "Remueven las canaletas viejas?", a: "Sí. Nuestra instalación incluye la remoción de su sistema de canaletas existente, inspección de la tabla de fascia debajo y limpieza de todos los materiales viejos. Si encontramos fascia dañada durante la remoción, discutiremos opciones de reparación con usted antes de continuar." },
    ],
    ctaTitle: "LISTO PARA CANALETAS QUE DUREN?",
    ctaSub: "Obtenga su evaluación de canaletas gratis y sin presión. Inspeccionaremos su hogar, recomendaremos el sistema correcto y le daremos un estimado transparente. Generalmente dentro de 48 horas.",
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

const ACCENT = "#4A90D9";
const ACCENT_LIGHT = "#6BA3E3";

export default function SeamlessGuttersPage({ portfolio = null }) {
  const { lang } = useLanguage();
  const t = T[lang];
  const [formData, setFormData] = useState({ name: "", phone: "", email: "", zip: "" });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formLoading, setFormLoading] = useState(false);
  const [formError, setFormError] = useState("");
  const { guardFields, honeypot } = useLeadGuard();

  const handleForm = async (e) => {
    e?.preventDefault?.();
    if (!formData.name || !formData.phone) return;
    setFormError("");
    setFormLoading(true);
    try {
      const params = new URLSearchParams(window.location.search);
      const result = await submitLeadForm({
        formId: "seamless-aluminum-gutters",
        lang,
        body: {
          ...guardFields(),
          name: formData.name,
          phone: formData.phone,
          email: formData.email,
          service: "Seamless Aluminum Gutters",
          zip: formData.zip,
          page: window.location.pathname,
          gclid: params.get("gclid") || "",
          utm_source: params.get("utm_source") || "",
          utm_medium: params.get("utm_medium") || "",
          utm_campaign: params.get("utm_campaign") || "",
          utm_term: params.get("utm_term") || "",
        },
      });
      if (result.ok) setFormSubmitted(true);
      else setFormError(result.message);
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
            backgroundImage: "linear-gradient(165deg, rgba(11,22,51,0.84) 0%, rgba(17,32,67,0.88) 55%, rgba(22,42,80,0.92) 100%), url('/images/seamless-gutter-install.webp')",
            backgroundSize: "cover",
            backgroundPosition: "center",
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
                <Button href="#quote-form" variant="primary" size="lg" iconRight accent={ACCENT} accentLight={ACCENT_LIGHT}>
                  {t.btnEstimate}
                </Button>
                <Button href="/estimator" variant="outline" size="lg" iconRight accent={ACCENT}>
                  {t.btnEstimator}
                </Button>
                <Button href="tel:8444443114" variant="outline" size="lg" iconLeft={<PhoneIcon size={18} />} accent={ACCENT}>
                  {t.btnCall}
                </Button>
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
                <article key={i} className="jr-hover-lift" style={{ background: "var(--jr-navy-deep)", border: "1px solid var(--jr-navy-3)", borderRadius: "var(--jr-radius-lg)", padding: "var(--jr-space-6)", borderTop: `3px solid ${ACCENT}` }}>
                  <div style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 48, height: 48, background: `${ACCENT}1F`, borderRadius: "var(--jr-radius-md)", marginBottom: "var(--jr-space-3)" }}>
                    <span aria-hidden style={{ fontSize: 26, lineHeight: 1 }}>{s.emoji}</span>
                  </div>
                  <h3 style={{ fontFamily: "var(--jr-font-heading)", fontSize: "var(--jr-text-lg)", fontWeight: 700, color: "var(--jr-paper)", marginBottom: "var(--jr-space-3)" }}>{s.title}</h3>
                  <p style={{ fontFamily: "var(--jr-font-body)", fontSize: "var(--jr-text-md)", color: "var(--jr-muted-on-dark)", lineHeight: 1.6 }}>{s.desc}</p>
                </article>
              ))}
            </div>

            {/* Downspout Styles Callout */}
            <div style={{ marginTop: "var(--jr-space-12)", background: "linear-gradient(135deg, var(--jr-navy-deep), var(--jr-navy-2))", border: `1px solid ${ACCENT}`, borderRadius: "var(--jr-radius-xl)", padding: "var(--jr-space-8)" }}>
              <div style={{ marginBottom: "var(--jr-space-5)" }}>
                <h3 style={{ fontFamily: "var(--jr-font-heading)", fontSize: "var(--jr-text-xl)", fontWeight: 700, color: ACCENT, marginBottom: "var(--jr-space-2)" }}>{t.downspoutTitle}</h3>
                <p style={{ fontFamily: "var(--jr-font-body)", fontSize: "var(--jr-text-md)", color: "var(--jr-cream-2)", lineHeight: 1.6 }}>{t.downspoutIntro}</p>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "var(--jr-space-3)" }}>
                {t.downspouts.map((ds, i) => (
                  <div key={i} style={{ background: `${ACCENT}1F`, borderRadius: "var(--jr-radius-md)", padding: "var(--jr-space-4)" }}>
                    <div style={{ fontFamily: "var(--jr-font-heading)", fontSize: "var(--jr-text-sm)", fontWeight: 700, color: ACCENT, marginBottom: "4px" }}>{ds.name}</div>
                    <div style={{ fontFamily: "var(--jr-font-body)", fontSize: "var(--jr-text-sm)", color: "var(--jr-muted-on-dark)" }}>{ds.desc}</div>
                  </div>
                ))}
              </div>
              <p style={{ fontFamily: "var(--jr-font-body)", fontSize: "var(--jr-text-sm)", color: "var(--jr-muted-on-dark)", fontStyle: "italic", marginTop: "var(--jr-space-5)" }}>{t.downspoutNote}</p>
            </div>
          </Container>
        </section>

        {/* ── SPECIALTY GUTTERS LINK ── */}
        <section style={{ background: "var(--jr-navy-deep)", padding: "var(--jr-space-12) 0", borderTop: "var(--jr-hair-darker)", borderBottom: "var(--jr-hair-darker)" }}>
          <Container>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "var(--jr-space-6)" }}>
              <div style={{ flex: "1 1 400px" }}>
                <h3 style={{ fontFamily: "var(--jr-font-heading)", fontSize: "var(--jr-text-xl)", fontWeight: 700, color: "var(--jr-paper)", marginBottom: "var(--jr-space-2)" }}>{t.specialtyTitle}</h3>
                <p style={{ fontFamily: "var(--jr-font-body)", fontSize: "var(--jr-text-md)", color: "var(--jr-muted-on-dark)", lineHeight: 1.6 }}>{t.specialtyDesc}</p>
              </div>
              <Button href="/specialty-gutters" variant="outline" size="md" iconRight>
                {t.specialtyBtn}
              </Button>
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
                  {formError ? (
                    <p role="alert" style={SUBMIT_ERROR_STYLE}>{formError}</p>
                  ) : null}
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
          title={lang === "en" ? "Ready to Protect Your Home?" : "Listo Para Proteger Su Hogar?"}
          sub={lang === "en" ? "Get your free quote today. We respond within hours, not days." : "Obtenga su cotización gratuita hoy. Respondemos en horas, no días."}
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
        service="seamless-aluminum-gutters"
        serviceLabel={lang === "es" ? "Canaletas Sin Costura" : "Seamless Gutters"}
        lang={lang}
      />


      <SiteFooter />
      <MobileCTA scrollTarget="quote-form" />
    </div>
  );
}
