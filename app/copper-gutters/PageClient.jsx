"use client";

/* ═══════════════════════════════════════════════════════════
   JR ONE ALUMINUM / COPPER GUTTERS SERVICE PAGE
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
import FAQAccordion from "../../components/ui/FAQAccordion";
import Peak301Alert from "../../components/ui/Peak301Alert";
import { CheckCircleIcon, PhoneIcon } from "../../lib/icons";

const T = {
  en: {
    breadcrumb: ["Home", "Services", "Copper Gutters"],
    heroTag: "COPPER GUTTER SYSTEMS",
    heroH1: "The Last Gutter System",
    heroH1Gold: "Your Home Will Ever Need.",
    heroP: "Copper gutters are the top of residential gutter systems. A lifetime investment that gets more beautiful with age. Custom-fabricated half-round and K-style copper systems with matching copper downspouts, leader heads, and rain chains. Installed by our crew.",
    btnEstimate: "GET YOUR COPPER CONSULTATION",
    btnEstimator: "MEASURE YOUR GUTTER FOOTAGE",
    btnCall: "(844) 444-3114",
    solutionsEyebrow: "COPPER SYSTEMS",
    solutionsTitle: "Our Copper Gutter Offerings",
    solutions: [
      { emoji: "🏛️", title: "6\" copper half-round gutters", desc: "Our signature copper offering. Half-round profiles create a classic, elegant look that complements historic homes, Mediterranean architecture, and high-end new construction. Custom-fabricated with a hanger system for lasting durability." },
      { emoji: "💧", title: "Full copper downspout systems", desc: "Matching 3x4 and 4-inch round copper downspouts with soldered or sealed connections. Copper straps and brackets maintain the look from roofline to ground level. Available in 4x5 oversized for high-volume applications." },
      { emoji: "🛡️", title: "Copper gutter guards", desc: "6\" and 7\" copper leaf guards that protect your investment while maintaining the seamless copper look. No mismatched aluminum guards on a copper system. Everything matches." },
      { emoji: "🎨", title: "Leader heads and rain chains", desc: "Decorative copper leader heads at downspout transitions and copper rain chains as alternatives to traditional downspouts. These custom touches elevate the entire exterior." },
      { emoji: "⭐", title: "50+ year lifespan", desc: "Copper doesn't rust, because there is no iron in it to oxidize. It holds up in salt air, UV, and humidity far better than aluminum. Over time, it develops a natural green patina that protects the underlying material. Many copper gutter systems outlast the homes they're installed on." },
      { emoji: "✨", title: "The patina effect", desc: "New copper starts with a brilliant warm tone and gradually develops a green patina over years of exposure. This natural aging process is considered one of copper's most desirable features. It's why historic buildings, churches, and monuments use copper." },
    ],
    stats: [
      { value: "50+", label: "Year lifespan (often 100+)" },
      { value: "$0", label: "Rust. Ever." },
      { value: "6\"-8\"", label: "Half-round sizes available" },
      { value: "100%", label: "Handcrafted installation" },
    ],
    comparisonEyebrow: "COMPARISON",
    comparisonTitle: "Copper vs. Aluminum",
    comparisonHeaders: { feature: "Feature", aluminum: "Aluminum", copper: "Copper" },
    comparison: [
      { feature: "Lifespan in Florida", aluminum: "20 to 30 years", copper: "50 to 100+ years" },
      { feature: "Salt air resistance", aluminum: "Good", copper: "Excellent" },
      { feature: "Maintenance required", aluminum: "Moderate", copper: "Minimal" },
      { feature: "Appearance over time", aluminum: "Fades slightly", copper: "Develops patina, improves" },
      { feature: "Curb appeal impact", aluminum: "Clean, modern", copper: "Distinguished" },
      { feature: "Home value impact", aluminum: "Functional", copper: "Adds measurable value" },
      { feature: "Replacement frequency", aluminum: "Once every 20 to 25 years", copper: "Likely never" },
    ],
    idealEyebrow: "BEST FIT",
    idealTitle: "Who Copper Gutters Are For",
    idealFor: [
      { emoji: "🏛️", title: "Historic and Mediterranean homes", desc: "Copper's classic look complements Spanish tile, barrel tile, and historic architectural styles found throughout Tampa Bay's older neighborhoods." },
      { emoji: "🌊", title: "Coastal and waterfront properties", desc: "Salt air destroys aluminum faster. Copper is essentially immune to corrosion, making it the material of choice for homes on the water." },
      { emoji: "🏠", title: "High-end new construction", desc: "Builders and architects spec copper when the home's exterior needs to make a statement. Copper gutters signal that no detail was overlooked." },
      { emoji: "⭐", title: "Forever homes", desc: "If you're staying in your home for 20+ years, copper's higher upfront cost is worth weighing against replacing an aluminum system inside that window. Most owners never end up replacing a copper system, and it adds curb appeal every year." },
    ],
    goldEyebrow: "THE GOLD STANDARD",
    goldTitle: "Our Copper Installation Process",
    goldSub: "Every home. Every time. No exceptions.",
    goldSteps: [
      { num: "01", title: "Assess", desc: "We evaluate your roofline, architectural style, and drainage needs. Not every home benefits from copper. We'll be honest about whether it's the right investment for yours." },
      { num: "02", title: "Design", desc: "Custom copper system design including gutter profile, downspout placement, leader heads, and color/patina expectations. Detailed estimate with material and labor breakdown." },
      { num: "03", title: "Install", desc: "Our crew fabricates and installs your copper system with soldered joints and precise bracket placement. Copper installation is specialty trade work. This is not a standard gutter crew job." },
      { num: "04", title: "Protect", desc: "Final inspection, water flow test, and care instructions for your new copper system. The investment is protected by our craftsmanship warranty." },
    ],
    faqEyebrow: "FAQ",
    faqTitle: "Copper Gutter Questions",
    faqs: [
      { q: "How much do copper gutters cost?", a: "Half-round copper gutters from JR One Aluminum in Tampa Bay, FL start around $65 per linear foot installed, with copper downspouts at approximately $50 per linear foot. Price is driven by linear footage, roofline complexity and the number of corners and miters that have to be hand-soldered, roof height and ladder access, one-story versus two-story, gutter profile, and number of downspouts. A complete copper system for a typical home runs significantly more than aluminum, but it also lasts 3 to 5 times longer. We provide detailed quotes so you can evaluate the investment. To size the run on your own home, start with the JR One estimator at jronegutters.com/estimator to get your gutter footage measured, then call (844) 444-3114 for a copper quote." },
      { q: "Are copper gutters worth the investment?", a: "Over a 50-year period, copper gutters from JR One Aluminum in Tampa Bay, FL often cost less than aluminum because a properly installed copper system typically outlasts several aluminum replacements. A $1,800 aluminum system replaced twice over 50 years costs $3,600 or more. A $5,000 copper system installed once costs $5,000, and it's still working at year 50. What moves the math is how long you plan to keep the home, linear footage, and whether the property is coastal, where salt air corrodes aluminum faster. For homes you plan to keep long-term, or for coastal properties, copper is the smarter long-term investment. To size the run on your own home, start with the JR One estimator at jronegutters.com/estimator to get your gutter footage measured, then call (844) 444-3114 for a copper quote." },
      { q: "Will copper gutters turn green?", a: "Yes, and that's a feature, not a flaw. Copper develops a natural green patina over several years of exposure to weather. This patina is actually a protective layer that prevents further oxidation. Many homeowners specifically choose copper for this aging effect. If you prefer the original copper tone, periodic cleaning maintains the warm color." },
      { q: "Do you solder copper gutter joints?", a: "Yes. Copper gutter joints should be soldered for a watertight, permanent seal. Not just caulked like aluminum. Our crew is trained in copper soldering techniques to ensure every joint is secure and leak-free for decades." },
      { q: "Can you install copper gutters on any home?", a: "Technically yes, but copper isn't the best choice for every home. It looks best on homes with architectural character. Historic styles, Mediterranean, craftsman, colonial, or high-end contemporary. On a standard suburban ranch, the higher cost may not deliver proportional visual impact. We'll give you an honest recommendation." },
      { q: "How long does copper gutter installation take?", a: "Copper installation takes longer than aluminum because of the soldering, custom bracket placement, and precise work required. Most residential copper gutter installations take 2 to 4 days depending on complexity." },
      { q: "Do you offer copper gutter guards?", a: "Yes. We install copper leaf guards in 6\" and 7\" sizes that match your copper gutter system seamlessly. No mismatched aluminum guards sitting on top of a copper system." },
    ],
    ctaTitle: "INTERESTED IN COPPER?",
    ctaSub: "Copper isn't for every home or every budget. For the right property, nothing else compares. Get a free assessment to find out if copper is the right investment for yours.",
    formTitle: "Request Your Copper Consultation",
    formName: "Full Name",
    formPhone: "Phone Number",
    formEmail: "Email Address",
    formZip: "ZIP Code",
    formBtn: "Request My Copper Consultation",
    formDisclaimer: "No spam. No pressure. Honest assessment.",
    formSuccess: "Consultation Request Received",
    formSuccessSub: "We'll be in touch to schedule your copper assessment.",
    preferTalk: "Prefer to talk?",
  },
  es: {
    breadcrumb: ["Inicio", "Servicios", "Canalones de Cobre"],
    heroTag: "SISTEMAS DE CANALONES DE COBRE",
    heroH1: "El Último Sistema de Canalones",
    heroH1Gold: "Que Su Hogar Necesitará.",
    heroP: "Los canalones de cobre son lo mejor en sistemas residenciales. Una inversión de por vida que se vuelve más hermosa con el tiempo. Sistemas de cobre half-round y K-style fabricados a medida con bajantes, cabezales decorativos y cadenas de lluvia de cobre. Instalados por nuestro equipo.",
    btnEstimate: "OBTENGA SU CONSULTA",
    btnEstimator: "MIDA SUS PIES LINEALES",
    btnCall: "(844) 444-3114",
    solutionsEyebrow: "SISTEMAS DE COBRE",
    solutionsTitle: "Nuestras Ofertas de Canalones de Cobre",
    solutions: [
      { emoji: "🏛️", title: "Canalones half-round de cobre de 6\"", desc: "Nuestra oferta insignia en cobre. Los perfiles half-round crean un aspecto clásico y elegante que complementa casas históricas, arquitectura mediterránea y construcciones nuevas de alta gama. Fabricados a medida con un sistema de ganchos para durabilidad." },
      { emoji: "💧", title: "Sistemas completos de bajantes de cobre", desc: "Bajantes de cobre de 3x4 y 4 pulgadas redondos con conexiones soldadas o selladas. Correas y soportes de cobre mantienen el aspecto desde la línea del techo hasta el suelo. Disponible en 4x5 para aplicaciones de alto volumen." },
      { emoji: "🛡️", title: "Guardas de canalones de cobre", desc: "Guardas de hojas de cobre de 6\" y 7\" que protegen su inversión manteniendo la estética continua del cobre. Sin guardas de aluminio que no combinen. Todo hace juego." },
      { emoji: "🎨", title: "Cabezales decorativos y cadenas de lluvia", desc: "Cabezales decorativos de cobre en las transiciones de bajantes y cadenas de lluvia de cobre como alternativa a los bajantes tradicionales. Estos toques personalizados elevan todo el exterior." },
      { emoji: "⭐", title: "Vida útil de 50+ años, prácticamente para siempre", desc: "El cobre no se oxida. No se corroe. No se degrada con el aire salado, los rayos UV ni la humedad. Con el tiempo, desarrolla una pátina verde natural que protege el material. Muchos sistemas de canalones de cobre duran más que las casas donde se instalan." },
      { emoji: "✨", title: "El efecto de la pátina", desc: "El cobre nuevo comienza con un tono cálido brillante y gradualmente desarrolla una pátina verde con los años de exposición. Este proceso natural es una de las características más deseadas del cobre. Por eso los edificios históricos, iglesias y monumentos usan cobre." },
    ],
    stats: [
      { value: "50+", label: "Años de vida útil" },
      { value: "$0", label: "Corrosión. Nunca." },
      { value: "6\"-8\"", label: "Tamaños half-round" },
      { value: "100%", label: "Instalación artesanal" },
    ],
    comparisonEyebrow: "COMPARACIÓN",
    comparisonTitle: "Cobre vs. Aluminio",
    comparisonHeaders: { feature: "Característica", aluminum: "Aluminio", copper: "Cobre" },
    comparison: [
      { feature: "Vida útil en Florida", aluminum: "20 a 30 años", copper: "50 a 100+ años" },
      { feature: "Resistencia al aire salado", aluminum: "Buena", copper: "Excelente" },
      { feature: "Mantenimiento requerido", aluminum: "Moderado", copper: "Mínimo" },
      { feature: "Apariencia con el tiempo", aluminum: "Se desvanece un poco", copper: "Desarrolla pátina, mejora" },
      { feature: "Impacto visual", aluminum: "Limpio, moderno", copper: "Distinguido" },
      { feature: "Impacto en valor", aluminum: "Funcional", copper: "Agrega valor medible" },
      { feature: "Frecuencia de reemplazo", aluminum: "Cada 20 a 25 años", copper: "Probablemente nunca" },
    ],
    idealEyebrow: "IDEAL PARA",
    idealTitle: "Para Quién Son los Canalones de Cobre",
    idealFor: [
      { emoji: "🏛️", title: "Casas históricas y mediterráneas", desc: "La estética clásica del cobre complementa la teja española, la teja barril y los estilos arquitectónicos históricos que se encuentran en los vecindarios más antiguos de Tampa Bay." },
      { emoji: "🌊", title: "Propiedades costeras y frente al agua", desc: "El aire salado destruye el aluminio más rápido. El cobre es prácticamente inmune a la corrosión, lo que lo convierte en el material preferido para casas junto al agua." },
      { emoji: "🏠", title: "Construcción nueva de alta gama", desc: "Constructores y arquitectos especifican cobre cuando el exterior de la casa necesita hacer una declaración. Los canalones de cobre demuestran que ningún detalle fue pasado por alto." },
      { emoji: "⭐", title: "Casas para siempre", desc: "Si planea quedarse en su casa por 20+ años, el costo inicial más alto del cobre bien vale compararlo con reemplazar un sistema de aluminio dentro de ese plazo. La mayoría de los dueños nunca termina reemplazando un sistema de cobre, y le suma atractivo a la casa cada año." },
    ],
    goldEyebrow: "EL ESTÁNDAR DE ORO",
    goldTitle: "Nuestro Proceso de Instalación",
    goldSub: "Cada casa. Cada vez. Sin excepciones.",
    goldSteps: [
      { num: "01", title: "Evaluar", desc: "Evaluamos su línea de techo, estilo arquitectónico y necesidades de drenaje. No toda casa se beneficia del cobre. Seremos honestos sobre si es la inversión correcta para la suya." },
      { num: "02", title: "Diseñar", desc: "Diseño personalizado del sistema de cobre incluyendo perfil del canalón, ubicación de bajantes, cabezales decorativos y expectativas de color/pátina. Presupuesto detallado." },
      { num: "03", title: "Instalar", desc: "Nuestro equipo fabrica e instala su sistema de cobre con juntas soldadas y soportes colocados con precisión. La instalación de cobre es trabajo del oficio especializado." },
      { num: "04", title: "Proteger", desc: "Inspección final, prueba de flujo de agua e instrucciones de cuidado para su nuevo sistema de cobre. La inversión está protegida por nuestra garantía de mano de obra." },
    ],
    faqEyebrow: "PREGUNTAS",
    faqTitle: "Preguntas Sobre Canalones de Cobre",
    faqs: [
      { q: "Cuánto cuestan los canalones de cobre?", a: "Los canalones half-round de cobre de JR One Aluminum en Tampa Bay, FL comienzan alrededor de $65 por pie lineal instalado, con bajantes de cobre a aproximadamente $50 por pie lineal. El precio depende de los pies lineales, la complejidad de la línea de techo y el número de esquinas y uniones que se sueldan a mano, la altura del techo y el acceso con escalera, si la casa es de uno o dos pisos, el perfil del canalón y el número de bajantes. Un sistema completo de cobre para una casa típica cuesta significativamente más que el aluminio, pero también dura 3 a 5 veces más. Para medir el tramo de su propia casa, empiece con el estimador de JR One en jronegutters.com/estimator y luego llame al (844) 444-3114 para una cotización de cobre." },
      { q: "Vale la pena la inversión en canalones de cobre?", a: "En un periodo de 50 años, el cobre frecuentemente cuesta menos que el aluminio porque nunca lo reemplaza. Un sistema de aluminio de $1,800 reemplazado dos veces en 50 años cuesta $3,600+. Un sistema de cobre de $5,000 instalado una vez cuesta $5,000, y sigue funcionando en el año 50." },
      { q: "Los canalones de cobre se ponen verdes?", a: "Sí, y eso es una ventaja, no un defecto. El cobre desarrolla una pátina verde natural con varios años de exposición al clima. Esta pátina es en realidad una capa protectora que previene mayor oxidación. Muchos propietarios eligen cobre específicamente por este efecto." },
      { q: "Sueldan las juntas de los canalones?", a: "Sí. Las juntas de canalones de cobre deben soldarse para un sello permanente e impermeable. No solo sellarse con silicona como el aluminio. Nuestro equipo está entrenado en técnicas de soldadura de cobre." },
      { q: "Pueden instalar canalones de cobre en cualquier casa?", a: "Técnicamente sí, pero el cobre no es la mejor opción para toda casa. Se ve mejor en casas con carácter arquitectónico. Estilos históricos, mediterráneo, artesanal, colonial o contemporáneo de alta gama. En un rancho suburbano estándar, el costo elevado puede no entregar un impacto visual proporcional." },
      { q: "Cuánto tiempo toma la instalación?", a: "La instalación de cobre toma más tiempo que el aluminio por la soldadura, colocación de soportes personalizados y el trabajo de precisión requerido. La mayoría de las instalaciones residenciales de canalones de cobre toman 2 a 4 días dependiendo de la complejidad." },
      { q: "Ofrecen guardas de canalones de cobre?", a: "Sí. Instalamos guardas de hojas de cobre en tamaños de 6\" y 7\" que combinan perfectamente con su sistema de canalones de cobre. Sin guardas de aluminio que no combinen encima de un sistema de cobre." },
    ],
    ctaTitle: "INTERESADO EN COBRE?",
    ctaSub: "El cobre no es para toda casa ni todo presupuesto. Para la propiedad correcta, nada se compara. Obtenga una evaluación gratuita para saber si el cobre es la inversión correcta para la suya.",
    formTitle: "Solicite Su Consulta de Cobre",
    formName: "Nombre Completo",
    formPhone: "Número de Teléfono",
    formEmail: "Correo Electrónico",
    formZip: "Código Postal",
    formBtn: "Solicitar Mi Consulta",
    formDisclaimer: "Sin spam. Sin presión. Evaluación honesta.",
    formSuccess: "Solicitud Recibida",
    formSuccessSub: "Nos pondremos en contacto para programar su evaluación.",
    preferTalk: "Prefiere hablar?",
  },
};

const inputStyle = {
  width: "100%", padding: "13px 16px", fontFamily: "var(--jr-font-body)", fontSize: "15px",
  border: "1.5px solid #D1D5DB", borderRadius: "var(--jr-radius-md)", outline: "none",
  color: "var(--jr-ink)", background: "#FAFAFA", marginBottom: "12px",
  transition: "border-color var(--jr-dur-fast) var(--jr-ease-out)",
};

const ACCENT = "#B87333";
const ACCENT_LIGHT = "#CD8E47";

export default function CopperGuttersPage({ portfolio = null }) {
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
          name: formData.name, phone: formData.phone, email: formData.email,
          service: "Copper Gutters", zip: formData.zip,
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

        <section className="jr-noise-bg jr-service-hero" style={{ position: "relative", padding: "var(--jr-space-16) var(--jr-space-6) var(--jr-space-20)", backgroundImage: "linear-gradient(165deg, rgba(11,22,51,0.84) 0%, rgba(17,32,67,0.88) 55%, rgba(22,42,80,0.92) 100%), url('/images/copper-gutters-hero-v2.webp')", backgroundSize: "cover", backgroundPosition: "center", overflow: "hidden" }}>
          <div aria-hidden style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, background: "radial-gradient(ellipse at 28% 22%, rgba(200,149,46,0.08) 0%, transparent 60%)", pointerEvents: "none" }} />
          <Container>
            <div style={{ position: "relative", zIndex: 1, maxWidth: "780px" }}>
              <div style={{ fontFamily: "var(--jr-font-heading)", fontSize: "var(--jr-text-xs)", fontWeight: 700, color: ACCENT, letterSpacing: "4px", marginBottom: "var(--jr-space-4)", textTransform: "uppercase" }}>{t.heroTag}</div>
              <h1 style={{ fontFamily: "var(--jr-font-heading)", fontSize: "var(--jr-text-4xl)", fontWeight: 800, lineHeight: 1.05, marginBottom: "var(--jr-space-6)", letterSpacing: "-0.5px" }}>{t.heroH1}<br /><span style={{ color: ACCENT }}>{t.heroH1Gold}</span></h1>
              <p style={{ fontFamily: "var(--jr-font-body)", fontSize: "var(--jr-text-lg)", color: "var(--jr-cream-2)", lineHeight: 1.65, marginBottom: "var(--jr-space-8)", maxWidth: "640px" }}>{t.heroP}</p>
              <div style={{ display: "flex", gap: "var(--jr-space-4)", flexWrap: "wrap", marginBottom: "var(--jr-space-10)" }}>
                <Button href="#quote-form" variant="primary" size="lg" iconRight accent={ACCENT} accentLight={ACCENT_LIGHT}>{t.btnEstimate}</Button>
                <Button href="/estimator" variant="outline" size="lg" iconRight accent={ACCENT}>{t.btnEstimator}</Button>
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
            <SectionHeading eyebrow={t.solutionsEyebrow} title={t.solutionsTitle} theme="dark" accent={ACCENT} />
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "var(--jr-space-5)" }}>
              {t.solutions.map((s, i) => (
                <article key={i} className="jr-hover-lift" style={{ background: "var(--jr-navy)", border: "1px solid var(--jr-navy-3)", borderRadius: "var(--jr-radius-lg)", padding: "var(--jr-space-6)", borderTop: `3px solid ${ACCENT}` }}>
                  <div style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 48, height: 48, background: `${ACCENT}1F`, borderRadius: "var(--jr-radius-md)", marginBottom: "var(--jr-space-3)" }}>
                    <span aria-hidden style={{ fontSize: 26, lineHeight: 1 }}>{s.emoji}</span>
                  </div>
                  <h3 style={{ fontFamily: "var(--jr-font-heading)", fontSize: "var(--jr-text-lg)", fontWeight: 700, color: "var(--jr-paper)", marginBottom: "var(--jr-space-3)" }}>{s.title}</h3>
                  <p style={{ fontFamily: "var(--jr-font-body)", fontSize: "var(--jr-text-md)", color: "var(--jr-muted-on-dark)", lineHeight: 1.6 }}>{s.desc}</p>
                </article>
              ))}
            </div>
          </Container>
        </section>

        {/* COMPARISON TABLE */}
        <section style={{ background: "var(--jr-navy)", padding: "var(--jr-space-20) 0" }}>
          <Container size="narrow">
            <SectionHeading eyebrow={t.comparisonEyebrow} title={t.comparisonTitle} theme="dark" accent={ACCENT} />
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontFamily: "var(--jr-font-body)", fontSize: "var(--jr-text-md)" }}>
                <thead>
                  <tr style={{ borderBottom: `2px solid ${ACCENT}` }}>
                    <th style={{ padding: "var(--jr-space-3) var(--jr-space-4)", textAlign: "left", fontFamily: "var(--jr-font-heading)", fontSize: "var(--jr-text-sm)", fontWeight: 700, color: "var(--jr-paper)" }}>{t.comparisonHeaders.feature}</th>
                    <th style={{ padding: "var(--jr-space-3) var(--jr-space-4)", textAlign: "center", fontFamily: "var(--jr-font-heading)", fontSize: "var(--jr-text-sm)", fontWeight: 700, color: "var(--jr-muted-on-dark)" }}>{t.comparisonHeaders.aluminum}</th>
                    <th style={{ padding: "var(--jr-space-3) var(--jr-space-4)", textAlign: "center", fontFamily: "var(--jr-font-heading)", fontSize: "var(--jr-text-sm)", fontWeight: 700, color: ACCENT }}>{t.comparisonHeaders.copper}</th>
                  </tr>
                </thead>
                <tbody>
                  {t.comparison.map((row, i) => (
                    <tr key={i} style={{ borderBottom: "1px solid var(--jr-navy-3)", background: i % 2 === 0 ? "var(--jr-navy-deep)" : "transparent" }}>
                      <td style={{ padding: "var(--jr-space-3) var(--jr-space-4)", color: "var(--jr-paper)", fontWeight: 600 }}>{row.feature}</td>
                      <td style={{ padding: "var(--jr-space-3) var(--jr-space-4)", textAlign: "center", color: "var(--jr-muted-on-dark)" }}>{row.aluminum}</td>
                      <td style={{ padding: "var(--jr-space-3) var(--jr-space-4)", textAlign: "center", color: ACCENT, fontWeight: 600 }}>{row.copper}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Container>
        </section>

        <section style={{ background: "var(--jr-navy-deep)", padding: "var(--jr-space-20) 0" }}>
          <Container>
            <SectionHeading eyebrow={t.idealEyebrow} title={t.idealTitle} theme="dark" accent={ACCENT} />
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "var(--jr-space-5)" }}>
              {t.idealFor.map((item, i) => (
                <article key={i} className="jr-hover-lift" style={{ background: "var(--jr-navy)", border: "1px solid var(--jr-navy-3)", borderRadius: "var(--jr-radius-lg)", padding: "var(--jr-space-6)", borderTop: `3px solid ${ACCENT}` }}>
                  <span aria-hidden style={{ display: "inline-block", fontSize: 28, lineHeight: 1, marginBottom: "var(--jr-space-2)" }}>{item.emoji}</span>
                  <h3 style={{ fontFamily: "var(--jr-font-heading)", fontSize: "var(--jr-text-md)", fontWeight: 700, color: "var(--jr-paper)", marginBottom: "var(--jr-space-2)" }}>{item.title}</h3>
                  <p style={{ fontFamily: "var(--jr-font-body)", fontSize: "var(--jr-text-md)", color: "var(--jr-muted-on-dark)", lineHeight: 1.55 }}>{item.desc}</p>
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
                  {honeypot}
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
          title={lang === "en" ? "Free Copper Assessment" : "Evaluación de Cobre Gratis"}
          sub={lang === "en" ? "Find out if copper is right for your home." : "Descubra si el cobre es lo correcto para su hogar."}
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
        service="copper-gutters"
        serviceLabel={lang === "es" ? "Canaletas de Cobre" : "Copper Gutters"}
        lang={lang}
      />


      <SiteFooter />
      <MobileCTA scrollTarget="quote-form" />
    </div>
  );
}
