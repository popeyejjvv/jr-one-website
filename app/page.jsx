"use client";

import { useState, useEffect, useRef } from "react";
import MobileCTA from "../components/MobileCTA";
import { useLanguage } from "../lib/LanguageContext";

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
    heroSub: "Precision gutters, soffit & fascia installed by our own crews — never subcontractors. Family-owned, serving Tampa Bay since 1990.",
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
    trustCrew: "In-House Crews",
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
      { icon: "🧹", title: "Maintenance", desc: "Gutter cleaning, pressure washing, window cleaning, and seasonal maintenance programs.", link: "/service-plans" },
    ],
    whyTitle: "WHY HOMEOWNERS CHOOSE JR ONE",
    whyItems: [
      { title: "We specialize. Period.", desc: "Your roofer does roofs. Your painter does paint. We do gutters, soffit, and fascia — and we do them right. Singular focus means every installation benefits from thousands of hours of specialized experience." },
      { title: "Our crew. Not subcontractors.", desc: "Every person on your property is a trained JR One team member. No random subs, no surprise faces, no finger-pointing if something goes wrong." },
      { title: "Done right the first time.", desc: "We don't cut corners. We don't want callbacks. Our price reflects that you won't have to call us back — and if you do, we keep coming back until everything meets your standards." },
      { title: "Your neighbors trust us.", desc: "4.9 stars on Google. Family-owned, serving Tampa Bay since 1990. We live here, we work here, and our reputation is built one home at a time." },
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
    footerAbout: "Family-owned and operated since 1990. Tampa Bay's trusted aluminum specialists.",
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
    heroSub: "Canaletas, sofito y fascia de precisión, instalados por nuestro propio equipo — nunca subcontratistas. Empresa familiar, sirviendo a Tampa Bay desde 1990.",
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
    trustCrew: "Equipo Propio",
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
      { icon: "🧹", title: "Mantenimiento", desc: "Limpieza de canaletas, lavado a presión, limpieza de ventanas y programas de mantenimiento.", link: "/service-plans" },
    ],
    whyTitle: "POR QUÉ LOS PROPIETARIOS ELIGEN JR ONE",
    whyItems: [
      { title: "Nos especializamos. Punto.", desc: "Su techador hace techos. Su pintor pinta. Nosotros hacemos canaletas, sofito y fascia — y lo hacemos bien." },
      { title: "Nuestro equipo. No subcontratistas.", desc: "Cada persona en su propiedad es un miembro capacitado del equipo JR One. Sin sorpresas." },
      { title: "Bien hecho a la primera.", desc: "No cortamos esquinas. No queremos que nos vuelvan a llamar. Nuestro precio refleja que no tendrá que llamarnos de nuevo." },
      { title: "Sus vecinos confían en nosotros.", desc: "4.9 estrellas en Google. Empresa familiar, sirviendo a Tampa Bay desde 1990. Vivimos aquí y nuestra reputación se construye hogar por hogar." },
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
    footerAbout: "Empresa familiar sirviendo a Tampa Bay desde 1990. Los especialistas en aluminio de confianza.",
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
  const { lang, toggleLang } = useLanguage();
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
  const [servicesOpen, setServicesOpen] = useState(false);

  const t = T[lang];

  useEffect(() => { injectFonts(); }, []);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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
          name: formData.name,
          phone: formData.phone,
          email: formData.email,
          service: formData.service,
          zip: formData.zip,
          page: window.location.pathname,
          gclid: params.get("gclid") || "",
          utm_source: params.get("utm_source") || "",
          utm_medium: params.get("utm_medium") || "",
          utm_campaign: params.get("utm_campaign") || "",
          utm_term: params.get("utm_term") || "",
        }),
      });
      if (res.ok) setFormSubmitted(true);
      else setFormSubmitted(true);
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
  const handleEstUnlock = (e) => {
    e?.preventDefault?.();
    if (estEmail.trim() && estName.trim() && estPhone.trim()) setEstUnlocked(true);
  };

  // ── Styles ────────────────────────────────────────────
  const s = {
    page: { background: C.bg, color: C.white, fontFamily: font.body, minHeight: "100vh", lineHeight: 1.65 },
    nav: { position: "sticky", top: 0, zIndex: 1000, padding: "10px 24px", background: "rgba(11,22,40,0.98)", backdropFilter: "blur(12px)", transition: "all 0.3s ease", borderBottom: `1px solid ${C.navyLight}` },
    navInner: { maxWidth: "1200px", margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center" },
    logo: { fontFamily: font.heading, fontSize: "20px", fontWeight: 800, color: C.white },
    logoGold: { color: C.gold },
    navLinks: { display: "flex", gap: "16px", alignItems: "center" },
    navLink: { fontFamily: font.heading, fontSize: "11px", fontWeight: 600, color: C.muted, textDecoration: "none", letterSpacing: "0.5px", cursor: "pointer" },
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
    sectionCream: { background: C.navy },
    sectionTitle: { fontFamily: font.heading, fontSize: "clamp(24px, 4vw, 36px)", fontWeight: 800, letterSpacing: "2px", textAlign: "center", marginBottom: "8px" },
    sectionSub: { fontFamily: font.body, fontSize: "17px", textAlign: "center", marginBottom: "48px", maxWidth: "600px", margin: "0 auto 48px" },
  };

  return (
    <div style={s.page}>
      {/* ══ PROMO BANNER + NAVIGATION (sticky together) ══ */}
      <div style={{ position: "sticky", top: 0, zIndex: 1000 }}>
      <div style={{ background: `linear-gradient(90deg, ${C.gold}, ${C.goldLight})`, padding: "8px 24px", textAlign: "center", fontFamily: font.heading, fontSize: "13px", fontWeight: 600, color: C.navy, letterSpacing: "0.5px" }}>
        {t.promoLine}
      </div>
      <nav style={{ ...s.nav, position: "relative" }}>
        <div style={s.navInner}>
          <a href="/" style={{...s.logo, textDecoration: "none"}}>JR <span style={s.logoGold}>ONE</span> <span style={{ color: C.white, fontSize: "16px" }}>★</span></a>
          <div className="jr-hp-nav-desktop" style={s.navLinks}>
            {/* Services Dropdown */}
            <div style={{ position: "relative" }} onMouseEnter={() => setServicesOpen(true)} onMouseLeave={() => setServicesOpen(false)}>
              <span style={{ ...s.navLink, cursor: "pointer", display: "flex", alignItems: "center", gap: "4px", paddingBottom: "12px", marginBottom: "-12px" }}>{t.navItems[0]} <span style={{ fontSize: "8px" }}>▼</span></span>
              {servicesOpen && (
                <div style={{ position: "absolute", top: "100%", left: "-12px", paddingTop: "4px" }}><div style={{ background: "rgba(11,22,40,0.98)", border: `1px solid ${C.navyLight}`, borderRadius: "8px", padding: "8px 0", minWidth: "220px", boxShadow: "0 8px 32px rgba(0,0,0,0.4)", backdropFilter: "blur(12px)" }}>
                  {[
                    { label: lang === "en" ? "Copper Gutters" : "Cobre", href: "/copper-gutters" },
                    { label: lang === "en" ? "Drainage Installation" : "Instalación de Drenaje", href: "/drainage-assessment" },
                    { label: lang === "en" ? "Govee Lights" : "Luces Govee", href: "/govee-lights" },
                    { label: lang === "en" ? "Gutter Guards" : "Protectores", href: "/gutter-guards" },
                    { label: lang === "en" ? "Gutter Repair" : "Reparación", href: "/gutter-repair" },
                    { label: "Peak 301", href: "/peak-301" },
                    { label: "SAGIPER", href: "/sagiper" },
                    { label: lang === "en" ? "Seamless Gutters" : "Canaletas", href: "/seamless-aluminum-gutters" },
                    { label: lang === "en" ? "Service Plans" : "Planes de Servicio", href: "/service-plans" },
                    { label: lang === "en" ? "Siding" : "Revestimiento", href: "/siding" },
                    { label: lang === "en" ? "Soffit & Fascia" : "Sofito y Fascia", href: "/soffit-and-fascia" },
                    { label: lang === "en" ? "Specialty Gutters" : "Especiales", href: "/specialty-gutters" },
                  ].map((svc, i) => (
                    <a key={i} href={svc.href} style={{ display: "block", padding: "8px 20px", fontFamily: font.heading, fontSize: "12px", fontWeight: 600, color: C.muted, textDecoration: "none", transition: "color 0.15s" }}
                      onMouseOver={e => { e.target.style.color = C.gold; e.target.style.background = "rgba(200,149,46,0.08)"; }}
                      onMouseOut={e => { e.target.style.color = C.muted; e.target.style.background = "transparent"; }}>
                      {svc.label}
                    </a>
                  ))}
                </div></div>
              )}
            </div>
            {[
              { label: lang === "en" ? "The Gold Standard" : "Estándar de Oro", href: "#gold-standard" },
              { label: lang === "en" ? "About" : "Nosotros", href: "/about" },
              { label: lang === "en" ? "Contact" : "Contacto", href: "/contact" },
              { label: "FAQ", href: "/faq" },
              { label: lang === "en" ? "Projects" : "Proyectos", href: "/projects" },
            ].map((item, i) => (
              <a key={i} href={item.href} style={{...s.navLink, textDecoration: "none"}}>{item.label}</a>
            ))}
            {/* Color-coded feature tabs */}
            <a href="/estimator" style={{ fontFamily: font.heading, fontSize: "11px", fontWeight: 700, color: "#3B82F6", background: "rgba(59,130,246,0.15)", padding: "5px 12px", borderRadius: "4px", textDecoration: "none", letterSpacing: "0.5px", border: "1px solid rgba(59,130,246,0.3)" }}>{lang === "en" ? "Estimator" : "Estimador"}</a>
            <a href="/financing" style={{ fontFamily: font.heading, fontSize: "11px", fontWeight: 700, color: "#22C55E", background: "rgba(34,197,94,0.15)", padding: "5px 12px", borderRadius: "4px", textDecoration: "none", letterSpacing: "0.5px", border: "1px solid rgba(34,197,94,0.3)" }}>{lang === "en" ? "Financing" : "Financiamiento"}</a>
            <a href="/referral" style={{ fontFamily: font.heading, fontSize: "11px", fontWeight: 700, color: "#E91E8C", background: "rgba(233,30,140,0.15)", padding: "5px 12px", borderRadius: "4px", textDecoration: "none", letterSpacing: "0.5px", border: "1px solid rgba(233,30,140,0.3)" }}>{lang === "en" ? "Referral" : "Referidos"}</a>
            <a href="tel:8444443114" style={{ ...s.navLink, color: C.gold, fontWeight: 700, textDecoration: "none" }}>{t.phone}</a>
            <button onClick={toggleLang} style={s.langBtn}>
              {t.otherLang}
            </button>
          </div>
          {/* Mobile Hamburger */}
          <button className="jr-hp-nav-hamburger" onClick={() => setMobileMenu(!mobileMenu)} style={{ display: "none", background: "none", border: "none", cursor: "pointer", padding: "8px", flexDirection: "column", gap: "5px" }}>
            <span style={{ display: "block", width: "22px", height: "2px", background: mobileMenu ? C.gold : C.white, transition: "all 0.3s", transform: mobileMenu ? "rotate(45deg) translateY(7px)" : "none" }} />
            <span style={{ display: "block", width: "22px", height: "2px", background: C.white, transition: "all 0.3s", opacity: mobileMenu ? 0 : 1 }} />
            <span style={{ display: "block", width: "22px", height: "2px", background: mobileMenu ? C.gold : C.white, transition: "all 0.3s", transform: mobileMenu ? "rotate(-45deg) translateY(-7px)" : "none" }} />
          </button>
        </div>
        {/* Mobile Menu Dropdown */}
        {mobileMenu && (
          <div style={{ maxWidth: "1200px", margin: "12px auto 0", paddingTop: "12px", borderTop: `1px solid ${C.navyLight}`, display: "flex", flexDirection: "column", gap: "4px" }}>
            <div style={{ fontFamily: font.heading, fontSize: "11px", fontWeight: 700, color: C.gold, letterSpacing: "2px", padding: "8px 0 4px" }}>{lang === "en" ? "SERVICES" : "SERVICIOS"}</div>
            {[
              { label: lang === "en" ? "Copper Gutters" : "Canaletas de Cobre", href: "/copper-gutters" },
              { label: lang === "en" ? "Drainage Installation" : "Instalación de Drenaje", href: "/drainage-assessment" },
              { label: lang === "en" ? "Govee Lights" : "Luces Govee", href: "/govee-lights" },
              { label: lang === "en" ? "Gutter Guards" : "Protectores", href: "/gutter-guards" },
              { label: lang === "en" ? "Gutter Repair" : "Reparación", href: "/gutter-repair" },
              { label: "Peak 301", href: "/peak-301" },
              { label: "SAGIPER", href: "/sagiper" },
              { label: lang === "en" ? "Seamless Gutters" : "Canaletas", href: "/seamless-aluminum-gutters" },
              { label: lang === "en" ? "Service Plans" : "Planes de Servicio", href: "/service-plans" },
              { label: lang === "en" ? "Siding" : "Revestimiento", href: "/siding" },
              { label: lang === "en" ? "Soffit & Fascia" : "Sofito y Fascia", href: "/soffit-and-fascia" },
              { label: lang === "en" ? "Specialty Gutters" : "Especiales", href: "/specialty-gutters" },
            ].map((svc, i) => (
              <a key={`svc-${i}`} href={svc.href} style={{ fontFamily: font.heading, fontSize: "14px", fontWeight: 600, color: C.muted, textDecoration: "none", padding: "8px 0", paddingLeft: "12px", borderBottom: `1px solid ${C.navyLight}20` }}>{svc.label}</a>
            ))}
            <div style={{ height: "8px" }} />
            {[
              { label: lang === "en" ? "The Gold Standard" : "Estándar de Oro", href: "#gold-standard" },
              { label: lang === "en" ? "About" : "Nosotros", href: "/about" },
              { label: lang === "en" ? "Contact" : "Contacto", href: "/contact" },
              { label: "FAQ", href: "/faq" },
              { label: lang === "en" ? "Projects" : "Proyectos", href: "/projects" },
            ].map((item, i) => (
              <a key={i} href={item.href} style={{ fontFamily: font.heading, fontSize: "14px", fontWeight: 600, color: C.muted, textDecoration: "none", padding: "10px 0", borderBottom: `1px solid ${C.navyLight}20` }}>{item.label}</a>
            ))}
            <a href="/estimator" style={{ fontFamily: font.heading, fontSize: "14px", fontWeight: 700, color: "#3B82F6", textDecoration: "none", padding: "10px 0", borderBottom: `1px solid ${C.navyLight}20` }}>{lang === "en" ? "Estimator" : "Estimador"}</a>
            <a href="/financing" style={{ fontFamily: font.heading, fontSize: "14px", fontWeight: 700, color: "#22C55E", textDecoration: "none", padding: "10px 0", borderBottom: `1px solid ${C.navyLight}20` }}>{lang === "en" ? "Financing" : "Financiamiento"}</a>
            <a href="/referral" style={{ fontFamily: font.heading, fontSize: "14px", fontWeight: 700, color: "#E91E8C", textDecoration: "none", padding: "10px 0", borderBottom: `1px solid ${C.navyLight}20` }}>{lang === "en" ? "Referral" : "Referidos"}</a>
            <a href="tel:8444443114" style={{ fontFamily: font.heading, fontSize: "16px", fontWeight: 700, color: C.gold, textDecoration: "none", padding: "12px 0", textAlign: "center" }}>📞 {t.phone}</a>
            <button onClick={() => { toggleLang(); setMobileMenu(false); }} style={{ ...s.langBtn, padding: "10px", marginBottom: "8px" }}>{t.otherLang}</button>
          </div>
        )}
      </nav>
      </div>{/* close sticky wrapper */}

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
              <div style={{ ...s.trustBadge, background: "rgba(249,115,22,0.15)", borderColor: "rgba(249,115,22,0.25)" }}>
                <span style={s.trustIcon}>👷</span>
                <span style={{ ...s.trustText, color: "#F97316" }}>{t.trustCrew}</span>
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
      <section id="gold-standard" style={{ background: C.navy, padding: "80px 24px" }}>
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
      <section style={{ background: C.navy, padding: "80px 24px" }}>
        <div style={{ maxWidth: "1000px", margin: "0 auto", textAlign: "center" }}>
          <SectionTag>{lang === "en" ? "WHY US" : "POR QUÉ"}</SectionTag>
          <h2 style={{ ...s.sectionTitle, color: C.white }}>{t.whyTitle}</h2>
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
                  <h3 style={{ fontFamily: font.heading, fontSize: "18px", fontWeight: 700, color: C.white, marginBottom: "6px" }}>{item.title}</h3>
                  <p style={{ fontFamily: font.body, fontSize: "16px", color: C.muted, lineHeight: 1.6 }}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ REVIEWS ══ */}
      <section id="reviews" style={{ background: C.navy, padding: "80px 24px" }}>
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

      {/* ══ ESTIMATOR CTA ══ */}
      <section id="estimator" style={{ background: C.bg, padding: "80px 24px" }}>
        <div style={{ maxWidth: "680px", margin: "0 auto", textAlign: "center" }}>
          <SectionTag>{lang === "en" ? "INSTANT ESTIMATOR" : "ESTIMADOR INSTANTÁNEO"}</SectionTag>
          <h2 style={{ ...s.sectionTitle, color: C.white }}>{t.estimatorTitle}</h2>
          <GoldDivider />
          <p style={{ ...s.sectionSub, color: C.muted, marginBottom: "32px" }}>{t.estimatorSub}</p>
          <a href="/estimator" style={{
            display: "inline-block", padding: "18px 48px",
            fontFamily: font.heading, fontSize: "15px", fontWeight: 700, letterSpacing: "1.5px",
            color: C.navy, background: `linear-gradient(135deg, ${C.gold}, ${C.goldLight})`,
            borderRadius: "10px", textDecoration: "none", transition: "filter 0.2s"
          }}>
            {lang === "en" ? "OPEN THE ESTIMATOR" : "ABRIR EL ESTIMADOR"}
          </a>
          <p style={{ fontFamily: font.body, fontSize: "13px", color: C.muted, marginTop: "16px" }}>
            {lang === "en"
              ? "Measure your roof from satellite imagery and get an instant price range."
              : "Mida su techo desde imágenes satelitales y obtenga un rango de precio al instante."}
          </p>
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
      <section id="faq" style={{ background: C.bg, padding: "80px 24px" }}>
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
      <footer style={{ background: C.navyFade, borderTop: `1px solid ${C.navyLight}`, padding: "60px 24px 100px" }}>
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
            {[
              { en: "Copper Gutters", es: "Canaletas de Cobre", href: "/copper-gutters" },
              { en: "Drainage Installation", es: "Instalación de Drenaje", href: "/drainage-assessment" },
              { en: "Govee Lights", es: "Luces Govee", href: "/govee-lights" },
              { en: "Gutter Guards", es: "Protectores", href: "/gutter-guards" },
              { en: "Gutter Repair", es: "Reparación", href: "/gutter-repair" },
              { en: "Peak 301", es: "Peak 301", href: "/peak-301" },
              { en: "SAGIPER", es: "SAGIPER", href: "/sagiper" },
              { en: "Seamless Gutters", es: "Canaletas", href: "/seamless-aluminum-gutters" },
              { en: "Service Plans", es: "Planes de Servicio", href: "/service-plans" },
              { en: "Siding", es: "Revestimiento", href: "/siding" },
              { en: "Soffit & Fascia", es: "Sofito y Fascia", href: "/soffit-and-fascia" },
              { en: "Specialty Gutters", es: "Canaletas Especiales", href: "/specialty-gutters" },
            ].map((svc, i) => (
              <a key={i} href={svc.href} style={{ display: "block", fontFamily: font.body, fontSize: "14px", color: C.muted, marginBottom: "8px", textDecoration: "none" }}>{lang === "en" ? svc.en : svc.es}</a>
            ))}
          </div>
          <div>
            <h4 style={{ fontFamily: font.heading, fontSize: "13px", fontWeight: 700, color: C.white, letterSpacing: "2px", marginBottom: "16px" }}>{t.footerAreas}</h4>
            {[
              { name: "Bradenton", slug: "bradenton" },
              { name: "Brandon", slug: "brandon" },
              { name: "Clearwater", slug: "clearwater" },
              { name: "Dunedin", slug: "dunedin" },
              { name: "Lakeland", slug: "lakeland" },
              { name: "Land O' Lakes", slug: "land-o-lakes" },
              { name: "Largo", slug: "largo" },
              { name: "Lutz", slug: "lutz" },
              { name: "New Port Richey", slug: "new-port-richey" },
              { name: "Palm Harbor", slug: "palm-harbor" },
              { name: "Plant City", slug: "plant-city" },
              { name: "Riverview", slug: "riverview" },
              { name: "Ruskin", slug: "ruskin" },
              { name: "Sarasota", slug: "sarasota" },
              { name: "Spring Hill", slug: "spring-hill" },
              { name: "St. Petersburg", slug: "st-petersburg" },
              { name: "Sun City Center", slug: "sun-city-center" },
              { name: "Tampa", slug: "tampa" },
              { name: "Tarpon Springs", slug: "tarpon-springs" },
              { name: "Temple Terrace", slug: "temple-terrace" },
              { name: "Wesley Chapel", slug: "wesley-chapel" },
            ].map((city, i) => (
              <a key={i} href={`/areas/${city.slug}`} style={{ display: "block", fontFamily: font.body, fontSize: "14px", color: C.muted, marginBottom: "8px", textDecoration: "none", cursor: "pointer" }}>{city.name}</a>
            ))}
          </div>
          <div>
            <h4 style={{ fontFamily: font.heading, fontSize: "13px", fontWeight: 700, color: C.white, letterSpacing: "2px", marginBottom: "16px" }}>{lang === "en" ? "RESOURCES" : "RECURSOS"}</h4>
            {[
              { en: "Warranties", es: "Garantías", href: "/warranties" },
              { en: "License & Insurance", es: "Licencia y Seguro", href: "/resources" },
              { en: "Care Guides", es: "Guías de Cuidado", href: "/resources" },
              { en: "About Us", es: "Sobre Nosotros", href: "/about" },
              { en: "FAQ", es: "Preguntas Frecuentes", href: "/faq" },
              { en: "Financing", es: "Financiamiento", href: "/financing" },
            ].map((item, i) => (
              <a key={i} href={item.href} style={{ display: "block", fontFamily: font.body, fontSize: "14px", color: C.muted, marginBottom: "8px", textDecoration: "none" }}>{lang === "en" ? item.en : item.es}</a>
            ))}
          </div>
          <div>
            <h4 style={{ fontFamily: font.heading, fontSize: "13px", fontWeight: 700, color: C.white, letterSpacing: "2px", marginBottom: "16px" }}>{t.footerContact}</h4>
            <a href="tel:8444443114" style={{ display: "block", fontFamily: font.body, fontSize: "14px", color: C.gold, marginBottom: "8px", fontWeight: 600, textDecoration: "none" }}>{t.phone}</a>
            <a href="mailto:info@jronegutters.com" style={{ display: "block", fontFamily: font.body, fontSize: "14px", color: C.muted, marginBottom: "8px", textDecoration: "none" }}>{t.email}</a>
            <p style={{ fontFamily: font.body, fontSize: "14px", color: C.muted, marginBottom: "8px" }}>Tampa, FL</p>
            <div style={{ display: "flex", gap: "12px", marginTop: "16px" }}>
              {[
                { name: "Facebook", href: "https://www.facebook.com/people/Jr-One-Aluminum-LLC/61568068558954/" },
                { name: "Instagram", href: "https://www.instagram.com/jronegutters" },
                { name: "Google", href: "https://www.google.com/maps/place/JR+One+Aluminum+LLC+-+Gutter+Repair+%26+Installation/@27.9614157,-82.5032424,17z/data=!3m1!4b1!4m6!3m5!1s0x88c2c32cbbf79527:0xd4f66138eefca78e!8m2!3d27.961411!4d-82.5006675!16s%2Fg%2F11fcvc1w45" },
              ].map((social, i) => (
                <a key={i} href={social.href} target="_blank" rel="noopener noreferrer" style={{ fontFamily: font.heading, fontSize: "11px", fontWeight: 600, color: C.muted, padding: "6px 10px", border: `1px solid ${C.navyLight}`, borderRadius: "4px", textDecoration: "none" }}>{social.name}</a>
              ))}
            </div>
          </div>
        </div>
        <div style={{ maxWidth: "1200px", margin: "40px auto 0", paddingTop: "24px", borderTop: `1px solid ${C.navyLight}`, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "12px" }}>
          <p style={{ fontFamily: font.body, fontSize: "12px", color: C.muted }}>
            © 2026 JR One Aluminum LLC. {lang === "en" ? "All rights reserved." : "Todos los derechos reservados."}
          </p>
          <div style={{ display: "flex", gap: "20px" }}>
            <a href="/privacy-policy" style={{ fontFamily: font.body, fontSize: "12px", color: C.muted, textDecoration: "none" }}>{lang === "en" ? "Privacy Policy" : "Política de Privacidad"}</a>
            <a href="/terms-of-service" style={{ fontFamily: font.body, fontSize: "12px", color: C.muted, textDecoration: "none" }}>{lang === "en" ? "Terms of Service" : "Términos de Servicio"}</a>
          </div>
        </div>
      </footer>

      <MobileCTA />

      <style>{`
        @keyframes fadeIn { from { opacity: 0; transform: translateY(-8px); } to { opacity: 1; transform: none; } }
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::placeholder { color: #9CA3AF; }
        input:focus, select:focus { border-color: ${C.gold} !important; }
        @media (max-width: 900px) {
          .jr-hp-nav-desktop { display: none !important; }
          .jr-hp-nav-hamburger { display: flex !important; }
        }
        @media (min-width: 901px) {
          .jr-hp-nav-hamburger { display: none !important; }
        }
        /* hero-stars now in globals.css */
      `}</style>
    </div>
  );
}
