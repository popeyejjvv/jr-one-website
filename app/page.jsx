"use client";

import { useState, useEffect, useRef } from "react";

/* ═══════════════════════════════════════════════════════════
   JR ONE ALUMINUM — HOMEPAGE
   Navy / Gold / Cream • Montserrat + Source Sans 3
   Conversion-optimized • The Gold Standard
   ═══════════════════════════════════════════════════════════ */

// ── Font injection ────────────────────────────────────────
const injectFonts = () => {
  if (typeof document === "undefined" || document.querySelector("#jr-fonts")) return;
  const l = document.createElement("link");
  l.id = "jr-fonts";
  l.rel = "stylesheet";
  l.href = "https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800&family=Source+Sans+3:wght@300;400;600&display=swap";
  document.head.appendChild(l);
};

// ── Brand tokens ──────────────────────────────────────────
const C = {
  bg: "#0B1628",
  navy: "#1B2A4A",
  navyMid: "#243556",
  navyLight: "#2C3E5A",
  navyFade: "#162033",
  gold: "#C8952E",
  goldLight: "#D4A843",
  goldPale: "rgba(200,149,46,0.12)",
  cream: "#F5F3EF",
  white: "#FFFFFF",
  offWhite: "#E8E4DC",
  muted: "#7A8FA8",
  charcoal: "#2D2D2D",
  success: "#2D8B4E",
  successDim: "rgba(45,139,78,0.15)",
  alert: "#B11A21",
  trustBlue: "#3B82F6",
  trustBlueDim: "rgba(59,130,246,0.15)",
  trustGold: "#D4A843",
  trustGoldDim: "rgba(212,168,67,0.15)",
  trustCoral: "#EF6351",
  trustCoralDim: "rgba(239,99,81,0.15)",
};

const font = {
  heading: "'Montserrat', sans-serif",
  body: "'Source Sans 3', sans-serif",
};

// ── Translations ──────────────────────────────────────────
const T = {
  en: {
    lang: "EN",
    langFull: "English",
    otherLang: "ES",
    heroTag: "TAMPA BAY'S ALUMINUM SPECIALISTS",
    heroH1a: "Done Right.",
    heroH1b: "Done Once.",
    heroH1c: "Guaranteed.",
    heroSub: "Precision gutters, soffit & fascia installed by our own crews — never subcontractors. 30+ years protecting Tampa Bay homes.",
    formTitle: "Get Your Free Quote",
    formName: "Full Name",
    formPhone: "Phone Number",
    formEmail: "Email Address",
    formService: "What do you need?",
    formZip: "ZIP Code",
    formBtn: "REQUEST MY FREE QUOTE",
    formNote: "No spam. No pressure. Just honest expert advice.",
    serviceOpt: ["Select a service...", "Gutter Installation", "Gutter Repair", "Gutter Guards", "Soffit & Fascia", "Siding", "Gutter Cleaning", "Other / Not Sure"],
    trustYears: "30+ Years",
    trustRating: "4.9★ Rating",
    trustReviews: "55+ Reviews",
    trustCrew: "In-House Crews Only",
    trustInsured: "Fully Insured",
    goldTitle: "THE GOLD STANDARD",
    goldSub: "Every home. Every time. No exceptions.",
    goldSteps: [
      { num: "01", title: "ASSESS", desc: "Free on-site inspection by an aluminum expert. We listen, document everything with photos, and give you an honest evaluation — no pressure, no gimmicks." },
      { num: "02", title: "DESIGN", desc: "A custom solution built for your home with a detailed, transparent estimate. You see exactly what you're getting, what materials we're using, and why." },
      { num: "03", title: "INSTALL", desc: "Our trained in-house crew performs precision installation. We protect your property, communicate every step, and clean up like we were never there." },
      { num: "04", title: "PROTECT", desc: "We walk through the finished work with you, back everything with our craftsmanship warranty, and follow up to make sure you're satisfied long after we leave." },
    ],
    servicesTitle: "WHAT WE DO",
    servicesSub: "Tampa Bay's most trusted aluminum specialists",
    serviceCards: [
      { icon: "💧", title: "Seamless Gutters", desc: "Custom-fabricated on-site for a perfect fit. 6\" and 7\" systems in your choice of color.", link: "/seamless-aluminum-gutters" },
      { icon: "🛡️", title: "Gutter Guards", desc: "Stop climbing ladders. Our guard systems keep debris out and water flowing — guaranteed.", link: "/gutter-guards" },
      { icon: "🏗️", title: "Soffit & Fascia", desc: "Aluminum and vinyl installations that protect your roof edge and improve your home's curb appeal.", link: "/soffit-and-fascia" },
      { icon: "🔧", title: "Gutter Repair", desc: "Sagging, leaking, or damaged? We fix it right so you don't have to call again.", link: "/gutter-repair" },
      { icon: "📐", title: "Siding", desc: "Vinyl siding installation and repair. Weather-tough protection for Florida homes.", link: "/siding" },
      { icon: "🧹", title: "Maintenance", desc: "Gutter cleaning, pressure washing, window cleaning, and seasonal maintenance programs.", link: "/maintenance" },
    ],
    whyTitle: "WHY HOMEOWNERS CHOOSE JR ONE",
    whyItems: [
      { title: "We specialize. Period.", desc: "Your roofer does roofs. Your painter does paint. We do gutters, soffit, and fascia — and we do them right. Singular focus means every installation benefits from thousands of hours of specialized experience." },
      { title: "Our crew. Not subcontractors.", desc: "Every person on your property is a trained JR One team member. No random subs, no surprise faces, no finger-pointing if something goes wrong." },
      { title: "Done right the first time.", desc: "We don't cut corners. We don't want callbacks. Our price reflects that you won't have to call us back — and if you do, we keep coming back until everything meets your standards." },
      { title: "Your neighbors trust us.", desc: "4.9 stars on Google. 30+ years in Tampa Bay. We live here, we work here, and our reputation is built one home at a time." },
    ],
    reviewsTitle: "WHAT OUR CUSTOMERS SAY",
    reviews: [
      { text: "From the very beginning, they worked to ensure I received a fair quote. There was no high pressure selling. The workmanship was outstanding, and they took pictures of each step showing me what was transpiring.", name: "Lois G.", service: "Gutters & Soffits", stars: 5 },
      { text: "We referred a customer to JR One and they could not stop praising his workmanship and professionalism. They will be the go-to for all our gutter and soffit requests from customers.", name: "Adam E.", service: "Contractor Referral", stars: 5 },
      { text: "After Milton I called a dozen companies — only JR One called back. The team showed up and did a perfect job. Do not call anyone else.", name: "Matt D.", service: "Storm Damage Repair", stars: 5 },
      { text: "Six guys on site with a crew manager. They removed old wood soffit, replaced everything with aluminum, fixed all termite damage — done in days. Best company for the money.", name: "Tampa Homeowner", service: "Full Soffit & Fascia", stars: 5 },
    ],
    estimatorTitle: "SEE YOUR PRICE RANGE IN 60 SECONDS",
    estimatorSub: "Use our instant estimator to explore pricing for your project. Enter your info below to get started.",
    estimatorBtn: "UNLOCK THE ESTIMATOR",
    emailTitle: "STAY PROTECTED",
    emailSub: "Get seasonal maintenance tips, storm prep guides, and exclusive offers delivered to your inbox.",
    emailPlaceholder: "Enter your email",
    emailBtn: "SUBSCRIBE",
    emailNote: "We respect your inbox. Unsubscribe anytime.",
    promoLine: "🏠 FREE Gutter Guards with Full House Gutter Installation — Call for Details",
    faqTitle: "FREQUENTLY ASKED QUESTIONS",
    faqs: [
      { q: "How much do new gutters cost in Tampa?", a: "Gutter installation in Tampa typically ranges from $11–$20 per linear foot depending on size, material, and complexity. We provide free, detailed estimates so you know exactly what you're paying for — no hidden fees." },
      { q: "Do you use subcontractors?", a: "Never. Every person on your property is a trained, full-time JR One crew member. This is how we maintain quality control and accountability on every single job." },
      { q: "How long does gutter installation take?", a: "Most residential gutter installations are completed in a single day. Larger projects involving soffit, fascia, and gutters together typically take 2–3 days." },
      { q: "Do you offer financing?", a: "Yes. We offer flexible financing options to make quality gutter and aluminum services accessible. Ask about our current programs when you request your free quote." },
      { q: "What areas do you serve?", a: "We serve Tampa, Clearwater, St. Petersburg, Sarasota, Bradenton, Lakeland, Brandon, Wesley Chapel, Palm Harbor, Riverview, and 20+ cities across Florida's west coast." },
      { q: "Why should I hire a gutter specialist instead of my roofer?", a: "Roofing companies handle gutters as an afterthought — often subcontracting the work. We specialize exclusively in aluminum systems, which means better materials, better installation techniques, and better results. Your home deserves a specialist." },
    ],
    ctaTitle: "READY TO PROTECT YOUR HOME?",
    ctaSub: "Get your free, no-pressure quote today. Call us or fill out the form — we respond within hours, not days.",
    ctaPhone: "CALL (844) 444-3114",
    ctaForm: "REQUEST A QUOTE",
    footerTagline: "The Superior Soffit & Gutter Experts",
    footerAbout: "Family-owned and operated for 30+ years. Tampa Bay's trusted aluminum specialists.",
    footerServices: "Services",
    footerAreas: "Service Areas",
    footerCompany: "Company",
    footerContact: "Contact",
    phone: "(844) 444-3114",
    email: "info@jronegutters.com",
    navItems: ["Services", "The Gold Standard", "Reviews", "Estimator", "FAQ", "Contact"],
    hablamos: "¡Hablamos Español!",
  },
  es: {
    lang: "ES",
    langFull: "Español",
    otherLang: "EN",
    heroTag: "ESPECIALISTAS EN ALUMINIO DE TAMPA BAY",
    heroH1a: "Bien Hecho.",
    heroH1b: "Una Sola Vez.",
    heroH1c: "Garantizado.",
    heroSub: "Canaletas, sofito y fascia de precisión, instalados por nuestro propio equipo — nunca subcontratistas. Más de 30 años protegiendo hogares en Tampa Bay.",
    formTitle: "Obtenga Su Cotización Gratis",
    formName: "Nombre Completo",
    formPhone: "Número de Teléfono",
    formEmail: "Correo Electrónico",
    formService: "¿Qué necesita?",
    formZip: "Código Postal",
    formBtn: "SOLICITAR MI COTIZACIÓN GRATIS",
    formNote: "Sin spam. Sin presión. Solo asesoría experta y honesta.",
    serviceOpt: ["Seleccione un servicio...", "Instalación de Canaletas", "Reparación de Canaletas", "Protectores de Canaletas", "Sofito y Fascia", "Revestimiento", "Limpieza de Canaletas", "Otro / No Estoy Seguro"],
    trustYears: "30+ Años",
    trustRating: "4.9★ Calificación",
    trustReviews: "55+ Reseñas",
    trustCrew: "Equipo Propio Exclusivo",
    trustInsured: "Totalmente Asegurados",
    goldTitle: "EL ESTÁNDAR DE ORO",
    goldSub: "Cada hogar. Cada vez. Sin excepciones.",
    goldSteps: [
      { num: "01", title: "EVALUAR", desc: "Inspección gratuita en su hogar por un experto en aluminio. Escuchamos, documentamos todo con fotos y le damos una evaluación honesta — sin presión." },
      { num: "02", title: "DISEÑAR", desc: "Una solución personalizada para su hogar con un presupuesto detallado y transparente. Usted ve exactamente lo que recibirá y por qué." },
      { num: "03", title: "INSTALAR", desc: "Nuestro equipo capacitado realiza la instalación con precisión. Protegemos su propiedad, comunicamos cada paso y limpiamos como si nunca hubiéramos estado ahí." },
      { num: "04", title: "PROTEGER", desc: "Revisamos el trabajo terminado con usted, respaldamos todo con nuestra garantía de calidad y hacemos seguimiento para asegurar su satisfacción." },
    ],
    servicesTitle: "LO QUE HACEMOS",
    servicesSub: "Los especialistas en aluminio más confiables de Tampa Bay",
    serviceCards: [
      { icon: "💧", title: "Canaletas Sin Costura", desc: "Fabricadas a medida en el sitio para un ajuste perfecto. Sistemas de 6\" y 7\" en el color de su elección.", link: "/seamless-aluminum-gutters" },
      { icon: "🛡️", title: "Protectores de Canaletas", desc: "Deje de subir escaleras. Nuestros protectores mantienen los escombros afuera y el agua fluyendo.", link: "/gutter-guards" },
      { icon: "🏗️", title: "Sofito y Fascia", desc: "Instalaciones de aluminio y vinilo que protegen el borde de su techo y mejoran la apariencia de su hogar.", link: "/soffit-and-fascia" },
      { icon: "🔧", title: "Reparación de Canaletas", desc: "¿Hundidas, con fugas o dañadas? Lo arreglamos bien para que no tenga que llamar de nuevo.", link: "/gutter-repair" },
      { icon: "📐", title: "Revestimiento", desc: "Instalación y reparación de revestimiento de vinilo. Protección resistente al clima para hogares de Florida.", link: "/siding" },
      { icon: "🧹", title: "Mantenimiento", desc: "Limpieza de canaletas, lavado a presión, limpieza de ventanas y programas de mantenimiento.", link: "/maintenance" },
    ],
    whyTitle: "POR QUÉ LOS PROPIETARIOS ELIGEN JR ONE",
    whyItems: [
      { title: "Nos especializamos. Punto.", desc: "Su techador hace techos. Su pintor pinta. Nosotros hacemos canaletas, sofito y fascia — y lo hacemos bien." },
      { title: "Nuestro equipo. No subcontratistas.", desc: "Cada persona en su propiedad es un miembro capacitado del equipo JR One. Sin sorpresas." },
      { title: "Bien hecho a la primera.", desc: "No cortamos esquinas. No queremos que nos vuelvan a llamar. Nuestro precio refleja que no tendrá que llamarnos de nuevo." },
      { title: "Sus vecinos confían en nosotros.", desc: "4.9 estrellas en Google. Más de 30 años en Tampa Bay. Vivimos aquí y nuestra reputación se construye hogar por hogar." },
    ],
    reviewsTitle: "LO QUE DICEN NUESTROS CLIENTES",
    reviews: [
      { text: "Desde el principio, trabajaron para asegurar que recibiera una cotización justa. No hubo presión de venta. El trabajo fue excepcional y tomaron fotos de cada paso.", name: "Lois G.", service: "Canaletas y Sofito", stars: 5 },
      { text: "Referimos a un cliente a JR One y no podían dejar de elogiar su profesionalismo. Serán nuestra referencia para todos los trabajos de canaletas y sofito.", name: "Adam E.", service: "Referencia de Contratista", stars: 5 },
      { text: "Después de Milton llamé a una docena de empresas — solo JR One devolvió la llamada. Hicieron un trabajo perfecto. No llame a nadie más.", name: "Matt D.", service: "Reparación por Tormenta", stars: 5 },
      { text: "Seis personas en el sitio con un gerente de equipo. Removieron el sofito viejo de madera, reemplazaron todo con aluminio, arreglaron todo el daño de termitas — hecho en días.", name: "Propietario de Tampa", service: "Sofito y Fascia Completo", stars: 5 },
    ],
    estimatorTitle: "VEA SU RANGO DE PRECIO EN 60 SEGUNDOS",
    estimatorSub: "Use nuestro estimador instantáneo para explorar precios para su proyecto. Ingrese su información para comenzar.",
    estimatorBtn: "DESBLOQUEAR EL ESTIMADOR",
    emailTitle: "MANTÉNGASE PROTEGIDO",
    emailSub: "Reciba consejos de mantenimiento, guías de preparación para tormentas y ofertas exclusivas.",
    emailPlaceholder: "Ingrese su correo",
    emailBtn: "SUSCRIBIRSE",
    emailNote: "Respetamos su bandeja de entrada. Cancele cuando quiera.",
    promoLine: "🏠 Protectores de Canaletas GRATIS con Instalación Completa — Llame para Detalles",
    faqTitle: "PREGUNTAS FRECUENTES",
    faqs: [
      { q: "¿Cuánto cuestan canaletas nuevas en Tampa?", a: "La instalación de canaletas en Tampa típicamente varía de $11–$20 por pie lineal dependiendo del tamaño, material y complejidad. Proporcionamos presupuestos gratuitos y detallados." },
      { q: "¿Usan subcontratistas?", a: "Nunca. Cada persona en su propiedad es un miembro capacitado y de tiempo completo del equipo JR One." },
      { q: "¿Cuánto tarda la instalación de canaletas?", a: "La mayoría de las instalaciones residenciales se completan en un solo día. Proyectos más grandes con sofito y fascia toman 2–3 días." },
      { q: "¿Ofrecen financiamiento?", a: "Sí. Ofrecemos opciones de financiamiento flexibles para hacer accesibles nuestros servicios de calidad." },
      { q: "¿Qué áreas atienden?", a: "Servimos Tampa, Clearwater, St. Petersburg, Sarasota, Bradenton, Lakeland, Brandon, Wesley Chapel y más de 20 ciudades en la costa oeste de Florida." },
      { q: "¿Por qué contratar un especialista en canaletas en vez de mi techador?", a: "Las empresas de techos manejan las canaletas como algo secundario — frecuentemente subcontratando el trabajo. Nosotros nos especializamos exclusivamente en sistemas de aluminio." },
    ],
    ctaTitle: "¿LISTO PARA PROTEGER SU HOGAR?",
    ctaSub: "Obtenga su cotización gratuita hoy. Llámenos o complete el formulario — respondemos en horas, no días.",
    ctaPhone: "LLAMAR (844) 444-3114",
    ctaForm: "SOLICITAR COTIZACIÓN",
    footerTagline: "Los Expertos Superiores en Sofito y Canaletas",
    footerAbout: "Empresa familiar con más de 30 años. Los especialistas en aluminio de confianza de Tampa Bay.",
    footerServices: "Servicios",
    footerAreas: "Áreas de Servicio",
    footerCompany: "Empresa",
    footerContact: "Contacto",
    phone: "(844) 444-3114",
    email: "info@jronegutters.com",
    navItems: ["Servicios", "Estándar de Oro", "Reseñas", "Estimador", "Preguntas", "Contacto"],
    hablamos: "We Speak English!",
  },
};

// ── Components ────────────────────────────────────────────

const Stars = ({ count = 5 }) => (
  <span style={{ color: C.gold, fontSize: "14px", letterSpacing: "2px" }}>
    {"★".repeat(count)}
  </span>
);

const SectionTag = ({ children }) => (
  <div style={{ display: "inline-block", padding: "6px 16px", background: C.goldPale, borderRadius: "4px", marginBottom: "12px" }}>
    <span style={{ fontFamily: font.heading, fontSize: "12px", fontWeight: 700, color: C.gold, letterSpacing: "3px" }}>{children}</span>
  </div>
);

const GoldDivider = () => (
  <div style={{ width: "60px", height: "3px", background: `linear-gradient(90deg, ${C.gold}, ${C.goldLight})`, borderRadius: "2px", margin: "16px auto" }} />
);

export default function JROneHomepage() {
  const [lang, setLang] = useState("en");
  const [formData, setFormData] = useState({ name: "", phone: "", email: "", service: "", zip: "" });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [emailInput, setEmailInput] = useState("");
  const [emailSubmitted, setEmailSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);
  const [estEmail, setEstEmail] = useState("");
  const [estName, setEstName] = useState("");
  const [estPhone, setEstPhone] = useState("");
  const [estUnlocked, setEstUnlocked] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const t = T[lang];

  useEffect(() => { injectFonts(); }, []);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleForm = (e) => {
    e?.preventDefault?.();
    setFormSubmitted(true);
  };
  const handleEmail = (e) => {
    e?.preventDefault?.();
    if (emailInput.trim()) setEmailSubmitted(true);
  };
  const handleEstUnlock = (e) => {
    e?.preventDefault?.();
    if (estEmail.trim() && estName.trim() && estPhone.trim()) setEstUnlocked(true);
  };

  // ── Styles ────────────────────────────────────────────
  const s = {
    page: { background: C.bg, color: C.white, fontFamily: font.body, minHeight: "100vh", overflowX: "hidden", lineHeight: 1.65 },
    nav: { position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000, padding: scrolled ? "10px 24px" : "16px 24px", background: scrolled ? "rgba(11,22,40,0.97)" : "transparent", backdropFilter: scrolled ? "blur(12px)" : "none", transition: "all 0.3s ease", borderBottom: scrolled ? `1px solid ${C.navyLight}` : "1px solid transparent" },
    navInner: { maxWidth: "1200px", margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center" },
    logo: { fontFamily: font.heading, fontSize: "20px", fontWeight: 800, color: C.white, letterSpacing: "1px" },
    logoGold: { color: C.gold },
    navLinks: { display: "flex", gap: "28px", alignItems: "center" },
    navLink: { fontFamily: font.heading, fontSize: "13px", fontWeight: 500, color: C.muted, textDecoration: "none", letterSpacing: "0.5px", cursor: "pointer", transition: "color 0.2s" },
    langBtn: { fontFamily: font.heading, fontSize: "11px", fontWeight: 700, color: C.gold, background: C.goldPale, border: `1px solid ${C.gold}`, borderRadius: "4px", padding: "4px 10px", cursor: "pointer", letterSpacing: "1px" },

    // Hero
    hero: { position: "relative", minHeight: "100vh", display: "flex", alignItems: "center", padding: "120px 24px 80px", background: `linear-gradient(165deg, ${C.bg} 0%, ${C.navy} 50%, ${C.navyMid} 100%)` },
    heroOverlay: { position: "absolute", top: 0, left: 0, right: 0, bottom: 0, background: "radial-gradient(ellipse at 30% 20%, rgba(200,149,46,0.06) 0%, transparent 60%)", pointerEvents: "none" },
    heroInner: { maxWidth: "1200px", margin: "0 auto", width: "100%", display: "flex", gap: "48px", alignItems: "center", flexWrap: "wrap", position: "relative", zIndex: 1 },
    heroLeft: { flex: "1 1 520px", minWidth: "300px" },
    heroRight: { flex: "1 1 380px", minWidth: "320px", maxWidth: "440px" },
    heroTag: { fontFamily: font.heading, fontSize: "12px", fontWeight: 700, color: C.gold, letterSpacing: "4px", marginBottom: "16px" },
    heroH1: { fontFamily: font.heading, fontSize: "clamp(36px, 6vw, 56px)", fontWeight: 800, lineHeight: 1.08, marginBottom: "24px", color: C.white },
    heroGold: { color: C.gold, display: "block" },
    heroP: { fontFamily: font.body, fontSize: "18px", color: C.offWhite, lineHeight: 1.7, marginBottom: "32px", maxWidth: "520px" },
    trustRow: { display: "flex", flexWrap: "wrap", gap: "16px", marginBottom: "24px" },
    trustBadge: { display: "flex", alignItems: "center", gap: "8px", padding: "8px 14px", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "8px" },
    trustIcon: { fontSize: "16px" },
    trustText: { fontFamily: font.heading, fontSize: "13px", fontWeight: 600, color: C.white },

    // Form card
    formCard: { background: C.white, borderRadius: "16px", padding: "32px 28px", boxShadow: "0 24px 80px rgba(0,0,0,0.4)" },
    formTitle: { fontFamily: font.heading, fontSize: "20px", fontWeight: 700, color: C.navy, textAlign: "center", marginBottom: "4px" },
    formDivider: { width: "40px", height: "3px", background: C.gold, borderRadius: "2px", margin: "10px auto 20px" },
    input: { width: "100%", padding: "13px 16px", fontFamily: font.body, fontSize: "15px", border: `1.5px solid #D1D5DB`, borderRadius: "8px", outline: "none", color: C.charcoal, transition: "border-color 0.2s", boxSizing: "border-box", marginBottom: "12px", background: "#FAFAFA" },
    select: { width: "100%", padding: "13px 16px", fontFamily: font.body, fontSize: "15px", border: `1.5px solid #D1D5DB`, borderRadius: "8px", outline: "none", color: C.charcoal, marginBottom: "12px", background: "#FAFAFA", boxSizing: "border-box", cursor: "pointer" },
    submitBtn: { width: "100%", padding: "16px", fontFamily: font.heading, fontSize: "14px", fontWeight: 700, letterSpacing: "1.5px", color: C.white, background: `linear-gradient(135deg, ${C.gold}, ${C.goldLight})`, border: "none", borderRadius: "8px", cursor: "pointer", transition: "transform 0.15s, box-shadow 0.15s", boxShadow: `0 4px 16px rgba(200,149,46,0.3)` },
    formNote: { fontFamily: font.body, fontSize: "12px", color: "#9CA3AF", textAlign: "center", marginTop: "12px" },

    // Sections
    section: { padding: "80px 24px", maxWidth: "1200px", margin: "0 auto" },
    sectionDark: { background: C.bg },
    sectionNavy: { background: C.navy },
    sectionCream: { background: C.cream },
    sectionTitle: { fontFamily: font.heading, fontSize: "clamp(24px, 4vw, 36px)", fontWeight: 800, letterSpacing: "2px", textAlign: "center", marginBottom: "8px" },
    sectionSub: { fontFamily: font.body, fontSize: "17px", textAlign: "center", marginBottom: "48px", maxWidth: "600px", margin: "0 auto 48px" },
  };

  return (
    <div style={s.page}>
      {/* ══ PROMO BANNER ══ */}
      <div style={{ background: `linear-gradient(90deg, ${C.gold}, ${C.goldLight})`, padding: "10px 24px", textAlign: "center", fontFamily: font.heading, fontSize: "13px", fontWeight: 600, color: C.navy, letterSpacing: "0.5px" }}>
        {t.promoLine}
      </div>

      {/* ══ NAVIGATION ══ */}
      <nav style={s.nav}>
        <div style={s.navInner}>
          <div style={s.logo}>JR <span style={s.logoGold}>ONE</span> <span style={{ color: C.white, fontSize: "16px" }}>★</span></div>
          <div style={{ ...s.navLinks, "@media(maxWidth:768px)": { display: "none" } }}>
            {t.navItems.map((item, i) => (
              <span key={i} style={s.navLink}>{item}</span>
            ))}
            <a href="tel:8444443114" style={{ ...s.navLink, color: C.gold, fontWeight: 700 }}>{t.phone}</a>
            <button onClick={() => setLang(lang === "en" ? "es" : "en")} style={s.langBtn}>
              {t.otherLang}
            </button>
          </div>
        </div>
      </nav>

      {/* ══ HERO ══ */}
      <section style={s.hero} className="hero-stars">
        <div style={s.heroOverlay} />
        <div style={s.heroInner}>
          <div style={s.heroLeft}>
            <div style={s.heroTag}>{t.heroTag}</div>
            <h1 style={s.heroH1}>
              {t.heroH1a}<br />
              {t.heroH1b}<br />
              <span style={s.heroGold}>{t.heroH1c}</span>
            </h1>
            <p style={s.heroP}>{t.heroSub}</p>
            <div style={s.trustRow}>
              <div style={{ ...s.trustBadge, background: C.trustBlueDim, borderColor: `${C.trustBlue}40` }}>
                <span style={s.trustIcon}>⏱</span>
                <span style={{ ...s.trustText, color: "#60A5FA" }}>{t.trustYears}</span>
              </div>
              <div style={{ ...s.trustBadge, background: C.trustGoldDim, borderColor: `${C.trustGold}40` }}>
                <span style={s.trustIcon}>⭐</span>
                <span style={{ ...s.trustText, color: C.trustGold }}>{t.trustRating}</span>
              </div>
              <div style={{ ...s.trustBadge, background: C.trustCoralDim, borderColor: `${C.trustCoral}40` }}>
                <span style={s.trustIcon}>💬</span>
                <span style={{ ...s.trustText, color: "#F87171" }}>{t.trustReviews}</span>
              </div>
              <div style={{ ...s.trustBadge, background: C.goldPale, borderColor: `${C.gold}40` }}>
                <span style={s.trustIcon}>👷</span>
                <span style={{ ...s.trustText, color: C.goldLight }}>{t.trustCrew}</span>
              </div>
              <div style={{ ...s.trustBadge, background: C.successDim, borderColor: C.success }}>
                <span style={s.trustIcon}>✓</span>
                <span style={{ ...s.trustText, color: "#4ADE80" }}>{t.trustInsured}</span>
              </div>
            </div>
            <div style={{ fontFamily: font.heading, fontSize: "13px", fontWeight: 600, color: C.gold, cursor: "pointer" }}>
              {t.hablamos}
            </div>
          </div>

          {/* QUOTE FORM */}
          <div style={s.heroRight}>
            <div style={s.formCard}>
              {formSubmitted ? (
                <div style={{ textAlign: "center", padding: "24px 0" }}>
                  <div style={{ fontSize: "48px", marginBottom: "12px" }}>✓</div>
                  <h3 style={{ fontFamily: font.heading, fontSize: "20px", fontWeight: 700, color: C.navy, marginBottom: "8px" }}>
                    {lang === "en" ? "Quote Request Received!" : "¡Solicitud Recibida!"}
                  </h3>
                  <p style={{ fontFamily: font.body, fontSize: "15px", color: "#6B7280" }}>
                    {lang === "en" ? "We'll get back to you within hours. In the meantime, try our instant estimator below." : "Le responderemos en horas. Mientras tanto, pruebe nuestro estimador instantáneo."}
                  </p>
                </div>
              ) : (
                <>
                  <h2 style={s.formTitle}>{t.formTitle}</h2>
                  <div style={s.formDivider} />
                  <input style={s.input} placeholder={t.formName} value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
                  <input style={s.input} placeholder={t.formPhone} type="tel" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} />
                  <input style={s.input} placeholder={t.formEmail} type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
                  <select style={s.select} value={formData.service} onChange={(e) => setFormData({ ...formData, service: e.target.value })}>
                    {t.serviceOpt.map((opt, i) => <option key={i} value={i === 0 ? "" : opt}>{opt}</option>)}
                  </select>
                  <input style={s.input} placeholder={t.formZip} value={formData.zip} onChange={(e) => setFormData({ ...formData, zip: e.target.value })} maxLength={5} />
                  <button style={s.submitBtn} onClick={handleForm} onMouseOver={(e) => { e.target.style.transform = "translateY(-2px)"; e.target.style.boxShadow = "0 8px 24px rgba(200,149,46,0.4)"; }} onMouseOut={(e) => { e.target.style.transform = "none"; e.target.style.boxShadow = "0 4px 16px rgba(200,149,46,0.3)"; }}>
                    {t.formBtn}
                  </button>
                  <p style={s.formNote}>{t.formNote}</p>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ══ THE GOLD STANDARD ══ */}
      <section style={{ background: C.navy, padding: "80px 24px" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", textAlign: "center" }}>
          <SectionTag>{t.goldTitle}</SectionTag>
          <h2 style={{ ...s.sectionTitle, color: C.white }}>{t.goldTitle}</h2>
          <GoldDivider />
          <p style={{ ...s.sectionSub, color: C.offWhite, fontStyle: "italic" }}>{t.goldSub}</p>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "24px", textAlign: "left" }}>
            {t.goldSteps.map((step, i) => (
              <div key={i} style={{ background: C.navyFade, border: `1px solid ${C.navyLight}`, borderRadius: "12px", padding: "28px 24px", position: "relative", transition: "border-color 0.3s, transform 0.3s" }}
                onMouseOver={(e) => { e.currentTarget.style.borderColor = C.gold; e.currentTarget.style.transform = "translateY(-4px)"; }}
                onMouseOut={(e) => { e.currentTarget.style.borderColor = C.navyLight; e.currentTarget.style.transform = "none"; }}>
                <div style={{ fontFamily: font.heading, fontSize: "36px", fontWeight: 800, color: C.goldPale.replace("0.12", "0.2"), position: "absolute", top: "16px", right: "20px" }}>{step.num}</div>
                <div style={{ fontFamily: font.heading, fontSize: "11px", fontWeight: 700, color: C.gold, letterSpacing: "3px", marginBottom: "8px" }}>STEP {step.num}</div>
                <h3 style={{ fontFamily: font.heading, fontSize: "22px", fontWeight: 700, color: C.white, marginBottom: "12px" }}>{step.title}</h3>
                <p style={{ fontFamily: font.body, fontSize: "15px", color: C.muted, lineHeight: 1.6 }}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ SERVICES ══ */}
      <section style={{ background: C.bg, padding: "80px 24px" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", textAlign: "center" }}>
          <SectionTag>{t.servicesTitle}</SectionTag>
          <h2 style={{ ...s.sectionTitle, color: C.white }}>{t.servicesTitle}</h2>
          <GoldDivider />
          <p style={{ ...s.sectionSub, color: C.muted }}>{t.servicesSub}</p>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "20px", textAlign: "left" }}>
            {t.serviceCards.map((svc, i) => (
              <div key={i} style={{ background: C.navyFade, border: `1px solid ${C.navyLight}`, borderRadius: "12px", padding: "28px", cursor: "pointer", transition: "all 0.3s" }}
                onMouseOver={(e) => { e.currentTarget.style.borderColor = C.gold; e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = `0 8px 32px rgba(200,149,46,0.1)`; }}
                onMouseOut={(e) => { e.currentTarget.style.borderColor = C.navyLight; e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "none"; }}>
                <div style={{ fontSize: "28px", marginBottom: "12px" }}>{svc.icon}</div>
                <h3 style={{ fontFamily: font.heading, fontSize: "18px", fontWeight: 700, color: C.white, marginBottom: "8px" }}>{svc.title}</h3>
                <p style={{ fontFamily: font.body, fontSize: "15px", color: C.muted, lineHeight: 1.55 }}>{svc.desc}</p>
                <div style={{ marginTop: "16px", fontFamily: font.heading, fontSize: "12px", fontWeight: 700, color: C.gold, letterSpacing: "1px" }}>
                  {lang === "en" ? "LEARN MORE →" : "MÁS INFO →"}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ WHY JR ONE ══ */}
      <section style={{ background: C.cream, padding: "80px 24px" }}>
        <div style={{ maxWidth: "1000px", margin: "0 auto", textAlign: "center" }}>
          <SectionTag>{lang === "en" ? "WHY US" : "POR QUÉ"}</SectionTag>
          <h2 style={{ ...s.sectionTitle, color: C.navy }}>{t.whyTitle}</h2>
          <GoldDivider />
          <div style={{ marginTop: "48px", textAlign: "left" }}>
            {t.whyItems.map((item, i) => (
              <div key={i} style={{ display: "flex", gap: "20px", marginBottom: "32px", alignItems: "flex-start" }}>
                <div style={{ width: "48px", height: "48px", borderRadius: "12px", background: C.goldPale, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, border: `1px solid ${C.gold}30` }}>
                  <span style={{ fontFamily: font.heading, fontSize: "18px", fontWeight: 800, color: C.gold }}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <div>
                  <h3 style={{ fontFamily: font.heading, fontSize: "18px", fontWeight: 700, color: C.navy, marginBottom: "6px" }}>{item.title}</h3>
                  <p style={{ fontFamily: font.body, fontSize: "16px", color: "#4B5563", lineHeight: 1.6 }}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ REVIEWS ══ */}
      <section style={{ background: C.navy, padding: "80px 24px" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", textAlign: "center" }}>
          <SectionTag>{t.reviewsTitle}</SectionTag>
          <h2 style={{ ...s.sectionTitle, color: C.white }}>{t.reviewsTitle}</h2>
          <GoldDivider />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "20px", marginTop: "48px", textAlign: "left" }}>
            {t.reviews.map((rev, i) => (
              <div key={i} style={{ background: C.navyFade, border: `1px solid ${C.navyLight}`, borderRadius: "12px", padding: "28px" }}>
                <Stars count={rev.stars} />
                <p style={{ fontFamily: font.body, fontSize: "15px", color: C.offWhite, lineHeight: 1.65, margin: "16px 0", fontStyle: "italic" }}>"{rev.text}"</p>
                <div style={{ borderTop: `1px solid ${C.navyLight}`, paddingTop: "12px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontFamily: font.heading, fontSize: "14px", fontWeight: 600, color: C.white }}>{rev.name}</span>
                  <span style={{ fontFamily: font.body, fontSize: "12px", color: C.muted }}>{rev.service}</span>
                </div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: "32px" }}>
            <span style={{ fontFamily: font.heading, fontSize: "13px", fontWeight: 600, color: C.gold, cursor: "pointer", letterSpacing: "1px" }}>
              {lang === "en" ? "READ ALL 55+ REVIEWS ON GOOGLE →" : "LEER LAS 55+ RESEÑAS EN GOOGLE →"}
            </span>
          </div>
        </div>
      </section>

      {/* ══ ESTIMATOR GATE ══ */}
      <section style={{ background: C.bg, padding: "80px 24px" }}>
        <div style={{ maxWidth: "680px", margin: "0 auto", textAlign: "center" }}>
          <SectionTag>{lang === "en" ? "INSTANT ESTIMATOR" : "ESTIMADOR INSTANTÁNEO"}</SectionTag>
          <h2 style={{ ...s.sectionTitle, color: C.white }}>{t.estimatorTitle}</h2>
          <GoldDivider />
          <p style={{ ...s.sectionSub, color: C.muted }}>{t.estimatorSub}</p>

          {estUnlocked ? (
            <div style={{ background: C.navyFade, border: `1px solid ${C.gold}`, borderRadius: "16px", padding: "40px 32px" }}>
              <div style={{ fontSize: "48px", marginBottom: "16px" }}>🔓</div>
              <h3 style={{ fontFamily: font.heading, fontSize: "20px", fontWeight: 700, color: C.gold, marginBottom: "8px" }}>
                {lang === "en" ? "Estimator Unlocked!" : "¡Estimador Desbloqueado!"}
              </h3>
              <p style={{ fontFamily: font.body, fontSize: "15px", color: C.muted, marginBottom: "24px" }}>
                {lang === "en" ? "The full estimator app loads here — select your services, enter measurements, and see your price range instantly." : "La aplicación completa del estimador carga aquí — seleccione sus servicios, ingrese medidas y vea su rango de precio."}
              </p>
              <div style={{ padding: "20px", background: C.navy, borderRadius: "8px", border: `1px dashed ${C.navyLight}` }}>
                <p style={{ fontFamily: font.heading, fontSize: "13px", color: C.muted, letterSpacing: "1px" }}>
                  [ ESTIMATOR APP COMPONENT RENDERS HERE ]
                </p>
              </div>
            </div>
          ) : (
            <div style={{ background: C.navyFade, border: `1px solid ${C.navyLight}`, borderRadius: "16px", padding: "40px 32px" }}>
              <div style={{ fontSize: "48px", marginBottom: "16px" }}>🔒</div>
              <p style={{ fontFamily: font.body, fontSize: "15px", color: C.muted, marginBottom: "24px" }}>
                {lang === "en" ? "Enter your contact info to access our instant pricing tool." : "Ingrese su información de contacto para acceder a nuestra herramienta de precios."}
              </p>
              <div style={{ maxWidth: "380px", margin: "0 auto" }}>
                <input style={{ ...s.input, background: C.navy, color: C.white, borderColor: C.navyLight }} placeholder={t.formName} value={estName} onChange={(e) => setEstName(e.target.value)} />
                <input style={{ ...s.input, background: C.navy, color: C.white, borderColor: C.navyLight }} placeholder={t.formPhone} type="tel" value={estPhone} onChange={(e) => setEstPhone(e.target.value)} />
                <input style={{ ...s.input, background: C.navy, color: C.white, borderColor: C.navyLight }} placeholder={t.formEmail} type="email" value={estEmail} onChange={(e) => setEstEmail(e.target.value)} />
                <button style={{ ...s.submitBtn, marginTop: "4px" }} onClick={handleEstUnlock}>{t.estimatorBtn}</button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ══ EMAIL CAPTURE ══ */}
      <section style={{ background: `linear-gradient(135deg, ${C.gold}, ${C.goldLight})`, padding: "60px 24px" }}>
        <div style={{ maxWidth: "700px", margin: "0 auto", textAlign: "center" }}>
          <h2 style={{ fontFamily: font.heading, fontSize: "28px", fontWeight: 800, color: C.navy, marginBottom: "8px" }}>{t.emailTitle}</h2>
          <p style={{ fontFamily: font.body, fontSize: "16px", color: C.navyMid, marginBottom: "24px" }}>{t.emailSub}</p>
          {emailSubmitted ? (
            <p style={{ fontFamily: font.heading, fontSize: "16px", fontWeight: 600, color: C.navy }}>
              ✓ {lang === "en" ? "You're in! Check your inbox soon." : "¡Listo! Revise su correo pronto."}
            </p>
          ) : (
            <div style={{ display: "flex", gap: "12px", maxWidth: "500px", margin: "0 auto", flexWrap: "wrap", justifyContent: "center" }}>
              <input style={{ flex: "1 1 280px", padding: "14px 18px", fontFamily: font.body, fontSize: "15px", border: "2px solid rgba(27,42,74,0.2)", borderRadius: "8px", outline: "none", color: C.navy, background: "rgba(255,255,255,0.9)" }} placeholder={t.emailPlaceholder} value={emailInput} onChange={(e) => setEmailInput(e.target.value)} />
              <button onClick={handleEmail} style={{ padding: "14px 28px", fontFamily: font.heading, fontSize: "13px", fontWeight: 700, letterSpacing: "1.5px", color: C.white, background: C.navy, border: "none", borderRadius: "8px", cursor: "pointer", whiteSpace: "nowrap" }}>{t.emailBtn}</button>
            </div>
          )}
          <p style={{ fontFamily: font.body, fontSize: "12px", color: C.navyMid, marginTop: "12px", opacity: 0.7 }}>{t.emailNote}</p>
        </div>
      </section>

      {/* ══ FAQ ══ */}
      <section style={{ background: C.bg, padding: "80px 24px" }}>
        <div style={{ maxWidth: "800px", margin: "0 auto", textAlign: "center" }}>
          <SectionTag>{t.faqTitle}</SectionTag>
          <h2 style={{ ...s.sectionTitle, color: C.white }}>{t.faqTitle}</h2>
          <GoldDivider />
          <div style={{ marginTop: "40px", textAlign: "left" }}>
            {t.faqs.map((faq, i) => (
              <div key={i} style={{ borderBottom: `1px solid ${C.navyLight}`, marginBottom: "4px" }}>
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)} style={{ width: "100%", padding: "20px 0", background: "none", border: "none", cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center", gap: "16px" }}>
                  <span style={{ fontFamily: font.heading, fontSize: "16px", fontWeight: 600, color: openFaq === i ? C.gold : C.white, textAlign: "left", transition: "color 0.2s" }}>{faq.q}</span>
                  <span style={{ fontFamily: font.heading, fontSize: "20px", color: C.gold, transform: openFaq === i ? "rotate(45deg)" : "none", transition: "transform 0.3s", flexShrink: 0 }}>+</span>
                </button>
                {openFaq === i && (
                  <div style={{ padding: "0 0 20px", fontFamily: font.body, fontSize: "15px", color: C.muted, lineHeight: 1.65, animation: "fadeIn 0.3s ease" }}>
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ FINAL CTA ══ */}
      <section style={{ background: `linear-gradient(165deg, ${C.navy} 0%, ${C.navyMid} 100%)`, padding: "80px 24px", textAlign: "center" }}>
        <div style={{ maxWidth: "700px", margin: "0 auto" }}>
          <h2 style={{ fontFamily: font.heading, fontSize: "clamp(28px, 5vw, 40px)", fontWeight: 800, color: C.white, marginBottom: "16px" }}>{t.ctaTitle}</h2>
          <p style={{ fontFamily: font.body, fontSize: "17px", color: C.offWhite, marginBottom: "36px" }}>{t.ctaSub}</p>
          <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}>
            <a href="tel:8444443114" style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "16px 32px", fontFamily: font.heading, fontSize: "14px", fontWeight: 700, letterSpacing: "1.5px", color: C.navy, background: `linear-gradient(135deg, ${C.gold}, ${C.goldLight})`, borderRadius: "8px", textDecoration: "none", cursor: "pointer", boxShadow: `0 4px 16px rgba(200,149,46,0.3)` }}>
              📞 {t.ctaPhone}
            </a>
            <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} style={{ padding: "16px 32px", fontFamily: font.heading, fontSize: "14px", fontWeight: 700, letterSpacing: "1.5px", color: C.gold, background: "transparent", border: `2px solid ${C.gold}`, borderRadius: "8px", cursor: "pointer" }}>
              {t.ctaForm}
            </button>
          </div>
        </div>
      </section>

      {/* ══ FOOTER ══ */}
      <footer style={{ background: C.navyFade, borderTop: `1px solid ${C.navyLight}`, padding: "60px 24px 32px" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "40px" }}>
          <div>
            <div style={{ fontFamily: font.heading, fontSize: "24px", fontWeight: 800, color: C.white, marginBottom: "4px" }}>
              JR <span style={{ color: C.gold }}>ONE</span> <span style={{ color: C.white, fontSize: "18px" }}>★</span>
            </div>
            <p style={{ fontFamily: font.heading, fontSize: "14px", fontWeight: 600, color: C.gold, fontStyle: "italic", marginBottom: "12px" }}>{t.footerTagline}</p>
            <p style={{ fontFamily: font.body, fontSize: "14px", color: C.muted, lineHeight: 1.55 }}>{t.footerAbout}</p>
          </div>
          <div>
            <h4 style={{ fontFamily: font.heading, fontSize: "13px", fontWeight: 700, color: C.white, letterSpacing: "2px", marginBottom: "16px" }}>{t.footerServices}</h4>
            {(lang === "en" ? ["Seamless Gutters", "Gutter Guards", "Soffit & Fascia", "Gutter Repair", "Siding", "Specialty Gutters", "SAGIPER", "Maintenance"] : ["Canaletas", "Protectores", "Sofito y Fascia", "Reparación", "Revestimiento", "Canaletas Especiales", "SAGIPER", "Mantenimiento"]).map((item, i) => (
              <p key={i} style={{ fontFamily: font.body, fontSize: "14px", color: C.muted, marginBottom: "8px", cursor: "pointer" }}>{item}</p>
            ))}
          </div>
          <div>
            <h4 style={{ fontFamily: font.heading, fontSize: "13px", fontWeight: 700, color: C.white, letterSpacing: "2px", marginBottom: "16px" }}>{t.footerAreas}</h4>
            {[
              { name: "Tampa", slug: "tampa" }, { name: "Clearwater", slug: "clearwater" }, { name: "St. Petersburg", slug: "st-petersburg" },
              { name: "Sarasota", slug: "sarasota" }, { name: "Bradenton", slug: "bradenton" }, { name: "Lakeland", slug: "lakeland" },
              { name: "Brandon", slug: "brandon" }, { name: "Wesley Chapel", slug: "wesley-chapel" }, { name: "Palm Harbor", slug: "palm-harbor" },
              { name: "Riverview", slug: "riverview" }, { name: "New Port Richey", slug: "new-port-richey" }, { name: "Largo", slug: "largo" },
              { name: "Spring Hill", slug: "spring-hill" }, { name: "Tarpon Springs", slug: "tarpon-springs" }, { name: "Land O' Lakes", slug: "land-o-lakes" },
              { name: "Dunedin", slug: "dunedin" }, { name: "Ruskin", slug: "ruskin" }, { name: "Sun City Center", slug: "sun-city-center" },
              { name: "Temple Terrace", slug: "temple-terrace" }, { name: "Plant City", slug: "plant-city" }, { name: "Lutz", slug: "lutz" },
            ].map((city, i) => (
              <a key={i} href={`/areas/${city.slug}`} style={{ display: "block", fontFamily: font.body, fontSize: "14px", color: C.muted, marginBottom: "8px", textDecoration: "none", cursor: "pointer" }}>{city.name}</a>
            ))}
          </div>
          <div>
            <h4 style={{ fontFamily: font.heading, fontSize: "13px", fontWeight: 700, color: C.white, letterSpacing: "2px", marginBottom: "16px" }}>{t.footerContact}</h4>
            <p style={{ fontFamily: font.body, fontSize: "14px", color: C.gold, marginBottom: "8px", fontWeight: 600 }}>{t.phone}</p>
            <p style={{ fontFamily: font.body, fontSize: "14px", color: C.muted, marginBottom: "8px" }}>{t.email}</p>
            <p style={{ fontFamily: font.body, fontSize: "14px", color: C.muted, marginBottom: "8px" }}>Tampa, FL</p>
            <div style={{ display: "flex", gap: "12px", marginTop: "16px" }}>
              {["Facebook", "Instagram", "Google"].map((social, i) => (
                <span key={i} style={{ fontFamily: font.heading, fontSize: "11px", fontWeight: 600, color: C.muted, padding: "6px 10px", border: `1px solid ${C.navyLight}`, borderRadius: "4px", cursor: "pointer" }}>{social}</span>
              ))}
            </div>
          </div>
        </div>
        <div style={{ maxWidth: "1200px", margin: "40px auto 0", paddingTop: "24px", borderTop: `1px solid ${C.navyLight}`, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "12px" }}>
          <p style={{ fontFamily: font.body, fontSize: "12px", color: C.muted }}>
            © 2026 JR One Aluminum LLC. {lang === "en" ? "All rights reserved." : "Todos los derechos reservados."}
          </p>
          <div style={{ display: "flex", gap: "20px" }}>
            <span style={{ fontFamily: font.body, fontSize: "12px", color: C.muted, cursor: "pointer" }}>{lang === "en" ? "Privacy Policy" : "Política de Privacidad"}</span>
            <span style={{ fontFamily: font.body, fontSize: "12px", color: C.muted, cursor: "pointer" }}>{lang === "en" ? "Terms of Service" : "Términos de Servicio"}</span>
          </div>
        </div>
      </footer>

      {/* ══ STICKY MOBILE CTA ══ */}
      <div style={{ position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 999, background: "rgba(11,22,40,0.97)", backdropFilter: "blur(12px)", borderTop: `1px solid ${C.navyLight}`, padding: "12px 16px", display: "flex", gap: "10px" }}>
        <a href="tel:8444443114" style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: "6px", padding: "14px", fontFamily: font.heading, fontSize: "13px", fontWeight: 700, color: C.navy, background: `linear-gradient(135deg, ${C.gold}, ${C.goldLight})`, borderRadius: "8px", textDecoration: "none", letterSpacing: "0.5px" }}>
          📞 {lang === "en" ? "CALL NOW" : "LLAMAR"}
        </a>
        <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} style={{ flex: 1, padding: "14px", fontFamily: font.heading, fontSize: "13px", fontWeight: 700, color: C.gold, background: "transparent", border: `2px solid ${C.gold}`, borderRadius: "8px", cursor: "pointer", letterSpacing: "0.5px" }}>
          {lang === "en" ? "GET QUOTE" : "COTIZACIÓN"}
        </button>
      </div>

      <style>{`
        @keyframes fadeIn { from { opacity: 0; transform: translateY(-8px); } to { opacity: 1; transform: none; } }
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::placeholder { color: #9CA3AF; }
        input:focus, select:focus { border-color: ${C.gold} !important; }
        @media (max-width: 768px) {
          nav div:last-child { display: none !important; }
        }
        .hero-stars::before {
          content: "★ ★ ★ ★ ★ ★ ★ ★ ★ ★ ★ ★ ★ ★ ★ ★ ★ ★ ★ ★ ★ ★ ★ ★ ★ ★ ★ ★ ★ ★ ★ ★ ★ ★ ★ ★ ★ ★ ★ ★ ★ ★ ★ ★ ★ ★ ★ ★ ★ ★ ★ ★ ★ ★ ★ ★ ★ ★ ★ ★ ★ ★ ★ ★ ★ ★ ★ ★ ★ ★ ★ ★ ★ ★ ★ ★ ★ ★ ★ ★ ★ ★ ★ ★ ★ ★ ★ ★ ★ ★ ★ ★ ★ ★ ★ ★ ★ ★ ★ ★";
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          font-size: 14px;
          letter-spacing: 28px;
          line-height: 42px;
          color: rgba(255,255,255,0.03);
          pointer-events: none;
          z-index: 0;
          overflow: hidden;
          word-break: break-all;
          padding: 20px;
        }
      `}</style>
    </div>
  );
}
