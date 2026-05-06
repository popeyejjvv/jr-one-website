"use client";

/* ═══════════════════════════════════════════════════════════
   JR ONE ALUMINUM: PEAK 301 ROOF REJUVENATION
   Brand-brain compliant. Tokens via app/tokens.css.
   Components via components/ui/. Icons via lib/icons.
   Per-business memory: Peak 301 fits SHINGLE roofs only.
   "Up to 70% less than a new roof install" + "need to see" warranty.
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
import FAQAccordion from "../../components/ui/FAQAccordion";
import {
  CheckCircleIcon,
  PhoneIcon,
} from "../../lib/icons";

// Page-identity accent: storm-alert red. Peak 301 IS the alert page.
const ACCENT = "#B11A21";
const ACCENT_LIGHT = "#D42A2A";

const T = {
  en: {
    breadcrumb: ["Home", "Services", "Peak 301 Roof Rejuvenation"],
    heroTag: "ROOF REJUVENATION",
    heroH1a: "Your Roof Has",
    heroH1b: "Years Left.",
    heroH1c: "Peak 301 Proves It.",
    heroP: "Peak 301 is an all-natural, soy-based sealant that penetrates your shingles and restores them from the inside out. Adds 6 to 10 years of life to your existing shingle roof for up to 70% less than a new roof install. Comes with the warranty documentation Florida carriers need to see when evaluating whether to renew your policy.",
    heroCta: "Get Your Free Roof Assessment",
    heroCall: "Call (844) 444-3114",
    stats: [
      { value: "6 to 10", label: "Years added to roof life" },
      { value: "Up to 70%", label: "Less than a new roof install" },
      { value: "280%", label: "Florida non-renewal increase" },
      { value: "100%", label: "Soy-based formula" },
    ],
    insuranceLabel: "Is Your Insurance at Risk?",
    insuranceStat1: "280%",
    insuranceStat1Label: "increase in Florida homeowner non-renewals since 2018",
    insuranceStat2: "15 Years",
    insuranceStat2Label: "the roof age at which most Florida insurers start dropping coverage",
    insuranceDesc: "Florida insurance companies are canceling homeowner policies at record rates based on roof age alone, even if your roof isn't leaking. If your shingle roof is 15+ years old, you may already be on borrowed time. Peak 301 helps your roof meet the useful-life threshold insurers want to see when evaluating whether to renew.",
    insuranceCta: "Insurance Resource Center",
    insuranceSub: "Florida law protects homeowners from losing insurance solely due to roof age. Read the laws, the carrier types, and grab free document templates.",
    problemEyebrow: "The Problem",
    problemTitle: "Why Tampa Homeowners Are Losing Coverage",
    problems: [
      { emoji: "🛡️", title: "Insurance non-renewal notices", desc: "Florida insurers are dropping homeowners with roofs over 15 years old, regardless of condition. A non-renewal letter means scrambling for expensive surplus coverage or facing a gap in protection." },
      { emoji: "💳", title: "Full replacement costs $15K to $25K+", desc: "A new roof is one of the most expensive home repairs. Many homeowners can't afford it on short notice, and shouldn't have to if their existing shingle roof still has structural life left." },
      { emoji: "💧", title: "Shingle deterioration from inside", desc: "Florida's UV exposure and heat cycles dry out the oils in your shingles over time. They become brittle, crack, curl, and lose granules. Not because they're worn out, but because they're dried out." },
      { emoji: "🌪️", title: "Storm vulnerability rises with age", desc: "Dried, brittle shingles are far more likely to lift, crack, or fly off during hurricane-force winds. Restored flexibility means better storm performance." },
    ],
    solutionEyebrow: "The Solution",
    solutionTitle: "How Peak 301 Saves Your Roof and Your Insurance",
    solutionSub: "A soy-based sealant that restores your shingles from the inside out. Not a coating. Not a paint. A genuine rejuvenation treatment for shingle roofs.",
    solutions: [
      { title: "Soy-based sealant, not a coating", desc: "Peak 301 is not a paint, spray, or surface coating. It's a soy-based sealant that penetrates into your shingle material and restores the oils that UV and heat have depleted. It rejuvenates from the inside out, restoring flexibility and waterproofing at the molecular level." },
      { title: "Adds 6 to 10 years of roof life", desc: "By restoring the oils that keep shingles pliable and water-resistant, Peak 301 extends your roof's functional lifespan by 6 to 10 years. That's 6 to 10 more years before you face the $15K to $25K+ replacement conversation." },
      { title: "Up to 70% less than a new roof install", desc: "A full roof replacement runs $15,000 to $25,000+ in Tampa and takes weeks of tear-off. Peak 301 treatment is a single-day application at up to 70% less. You save on labor, disruption, and the five-figure check." },
      { title: "Warranty documentation for insurers", desc: "Peak 301 comes with official warranty documentation that demonstrates your roof has been professionally treated and has verified useful life remaining. This is the documentation Florida insurers need to see when evaluating your policy renewal." },
      { title: "Soy-based and eco-friendly", desc: "The soy-based formula is non-toxic, biodegradable, and safe for your landscaping, pets, and family. No harsh chemicals, no toxic fumes, no environmental concerns." },
      { title: "Applied by our trained crew", desc: "Like everything we do, Peak 301 application is performed by our own trained team, not subcontracted. We inspect your roof's condition, apply the sealant properly, and document the treatment for your records." },
    ],
    mathEyebrow: "The Math",
    mathTitle: "Rejuvenation vs. Replacement",
    mathReplacementLabel: "Full Replacement",
    mathReplacementPrice: "$15K to $25K+",
    mathReplacementDesc: "Weeks of tear-off, dumpsters, and a five-figure check. Your carrier may still not be happy.",
    mathPeakLabel: "Peak 301 Treatment",
    mathPeakPrice: "Up to 70% Less",
    mathPeakDesc: "Than a new roof install. One-day application. 6 to 10 years of added life. 6-year warranty. Documentation your insurer needs to see when evaluating your policy. Exact pricing after your free assessment.",
    mathSub: "Most homeowners who call us didn't know roof rejuvenation was an option. Book a free assessment. We'll tell you exactly what your shingle roof needs, with real pricing for your home.",
    goldEyebrow: "The Gold Standard",
    goldTitle: "Our Peak 301 Process",
    goldSub: "Every home. Every time. No exceptions.",
    goldSteps: [
      { num: "01", title: "Assess", desc: "We inspect your roof's current condition, age, and shingle type to determine if Peak 301 is the right solution. Not every roof is a candidate. We'll be honest if yours isn't." },
      { num: "02", title: "Design", desc: "Treatment plan based on your roof's specific needs, transparent pricing, and a clear explanation of what to expect, including the warranty documentation you'll receive." },
      { num: "03", title: "Install", desc: "Our crew applies the Peak 301 sealant across your entire shingle roof. The soy-based formula penetrates and begins restoring your shingles from the inside immediately." },
      { num: "04", title: "Protect", desc: "You receive official warranty documentation showing your roof has been professionally treated. This is the documentation you provide to your insurance company to demonstrate roof viability." },
    ],
    faqEyebrow: "FAQ",
    faqTitle: "Peak 301 Questions",
    faqs: [
      { q: "What exactly is Peak 301?", a: "Peak 301 is an all-natural, soy-based roof rejuvenation sealant. It penetrates into your shingle material and restores the oils that UV exposure and heat have depleted over time. It is not a coating, paint, or spray. It works from the inside of the shingle out, restoring flexibility, waterproofing, and structural integrity." },
      { q: "How much does Peak 301 treatment cost?", a: "Every roof is different. Size, shingle type, condition, and access all affect the price. For most Tampa homes, Peak 301 treatment runs around 60 to 75% less than a full replacement ($15,000 to $25,000+). We provide exact pricing only after we inspect your specific roof. The free assessment is the fastest way to get a real number for your home." },
      { q: "Will Peak 301 help me keep my homeowner's insurance?", a: "That's one of its biggest benefits. Florida insurers are increasingly dropping coverage on roofs over 15 years old. Peak 301 treatment comes with warranty documentation that demonstrates your roof has been professionally rejuvenated and has verified useful life remaining. This is documentation Florida carriers need to see when evaluating your renewal." },
      { q: "How long does the treatment last?", a: "Peak 301 adds 6 to 10 years of life to your existing shingle roof. The exact duration depends on your roof's current condition, age, and shingle type, which we assess before recommending treatment." },
      { q: "Does Peak 301 work on metal, tile, or flat roofs?", a: "No. Peak 301 is engineered specifically for asphalt shingle roofs. We don't apply it to metal, tile, or flat roofs. If you have a non-shingle roof, we'll tell you that during the assessment instead of selling you the wrong product." },
      { q: "Is my roof a good candidate for Peak 301?", a: "Most asphalt shingle roofs between 8 and 20 years old are good candidates. Roofs with significant structural damage, missing shingles, or active leaks may need repairs first or may be beyond rejuvenation. We inspect your roof honestly and tell you whether Peak 301 makes sense or whether replacement is the better path." },
      { q: "Is the sealant safe for my home and landscaping?", a: "Yes. Peak 301 is an all-natural soy-based formula. It's non-toxic, biodegradable, and completely safe for your landscaping, pets, and family. No harsh chemicals or toxic fumes." },
      { q: "How long does the application take?", a: "Most residential Peak 301 applications are completed in a single day. The sealant begins penetrating and working immediately after application." },
      { q: "Can I see proof that Peak 301 works?", a: "Yes. We can show you documentation on the sealant's testing, performance data, and warranty terms. We can also connect you with homeowners in Tampa who have had the treatment and kept their insurance coverage as a result." },
    ],
    ctaTitle: "Don't Replace Your Roof Until You Call Us",
    ctaSub: "Peak 301 could save you $15,000+ and keep your insurance intact. Get a free roof assessment to find out if your shingle roof is a candidate for rejuvenation instead of replacement.",
    formTitle: "Get Your Free Roof Assessment",
    formName: "Full Name",
    formPhone: "Phone Number",
    formEmail: "Email Address",
    formZip: "ZIP Code",
    formBtn: "Request My Free Roof Assessment",
    formNote: "No spam. No pressure. Honest assessment of whether Peak 301 is right for your shingle roof.",
    formSent: "Assessment Request Received",
    formSentSub: "We'll get back to you within hours to schedule your roof inspection.",
  },
  es: {
    breadcrumb: ["Inicio", "Servicios", "Rejuvenecimiento de Techo Peak 301"],
    heroTag: "REJUVENECIMIENTO DE TECHO",
    heroH1a: "Su Techo Tiene",
    heroH1b: "Años de Vida.",
    heroH1c: "Peak 301 Lo Demuestra.",
    heroP: "Peak 301 es un sellador natural a base de soya que penetra en sus tejas y las restaura desde adentro. Agrega 6 a 10 años de vida a su techo de tejas asfálticas existente por hasta 70% menos que una instalación de techo nuevo. Viene con la documentación de garantía que las aseguradoras de Florida necesitan ver al evaluar si renovar su póliza.",
    heroCta: "Obtenga Su Evaluación Gratuita",
    heroCall: "Llame al (844) 444-3114",
    stats: [
      { value: "6 a 10", label: "Años agregados al techo" },
      { value: "Hasta 70%", label: "Menos que un techo nuevo" },
      { value: "280%", label: "Aumento de no renovación en FL" },
      { value: "100%", label: "Fórmula a base de soya" },
    ],
    insuranceLabel: "¿Su Seguro Está en Riesgo?",
    insuranceStat1: "280%",
    insuranceStat1Label: "aumento en no renovaciones de pólizas en Florida desde 2018",
    insuranceStat2: "15 Años",
    insuranceStat2Label: "la edad del techo en la que la mayoría de aseguradoras de Florida cancelan cobertura",
    insuranceDesc: "Las compañías de seguros de Florida están cancelando pólizas a tasas récord basándose solo en la edad del techo, incluso si su techo no tiene goteras. Si su techo de tejas tiene 15+ años, puede que ya esté en tiempo prestado. Peak 301 ayuda a que su techo cumpla el umbral de vida útil que las aseguradoras quieren ver al evaluar la renovación.",
    insuranceCta: "Centro de Recursos de Seguros",
    insuranceSub: "La ley de Florida protege a los propietarios de perder su seguro solo por la edad del techo. Lea las leyes, los tipos de aseguradoras y consiga plantillas de documentos gratis.",
    problemEyebrow: "El Problema",
    problemTitle: "Por Qué Tampa Está Perdiendo Cobertura",
    problems: [
      { emoji: "🛡️", title: "Avisos de no renovación de seguros", desc: "Las aseguradoras de Florida están cancelando propietarios con techos de más de 15 años, sin importar la condición. Una carta de no renovación significa buscar cobertura costosa o enfrentar un vacío en la protección." },
      { emoji: "💳", title: "El reemplazo total cuesta $15K a $25K+", desc: "Un techo nuevo es una de las reparaciones más costosas. Muchos propietarios no pueden pagarlo con poco aviso, y no deberían tener que hacerlo si su techo de tejas existente aún tiene vida estructural." },
      { emoji: "💧", title: "Deterioro de tejas desde adentro", desc: "La exposición UV y los ciclos de calor de Florida secan los aceites de sus tejas con el tiempo. Se vuelven frágiles, se agrietan, se curvan y pierden gránulos. No porque estén gastadas, sino porque están secas." },
      { emoji: "🌪️", title: "La vulnerabilidad a tormentas crece con la edad", desc: "Las tejas secas y frágiles tienen mucha más probabilidad de levantarse, agrietarse o salir volando durante vientos de huracán. La flexibilidad restaurada significa mejor rendimiento ante tormentas." },
    ],
    solutionEyebrow: "La Solución",
    solutionTitle: "Cómo Peak 301 Salva Su Techo y Su Seguro",
    solutionSub: "Un sellador a base de soya que restaura sus tejas desde adentro. No es un recubrimiento. No es una pintura. Es un tratamiento genuino de rejuvenecimiento para techos de tejas.",
    solutions: [
      { title: "Sellador a base de soya, no recubrimiento", desc: "Peak 301 no es una pintura, spray o recubrimiento superficial. Es un sellador a base de soya que penetra en el material de sus tejas y restaura los aceites que los rayos UV y el calor han agotado. Rejuvenece desde adentro hacia afuera, restaurando flexibilidad e impermeabilización a nivel molecular." },
      { title: "Agrega 6 a 10 años de vida al techo", desc: "Al restaurar los aceites que mantienen las tejas flexibles y resistentes al agua, Peak 301 extiende la vida funcional de su techo de 6 a 10 años. Son 6 a 10 años más antes de enfrentar la conversación de reemplazo de $15K a $25K+." },
      { title: "Hasta 70% menos que un techo nuevo", desc: "Un reemplazo total cuesta $15,000 a $25,000+ en Tampa y toma semanas de arrancar el techo. El tratamiento Peak 301 es una aplicación de un solo día a hasta 70% menos. Ahorra en mano de obra, interrupciones y el cheque de cinco cifras." },
      { title: "Documentación de garantía para aseguradoras", desc: "Peak 301 viene con documentación oficial de garantía que demuestra que su techo ha sido tratado profesionalmente y tiene vida útil verificada. Esta es la documentación que las aseguradoras de Florida necesitan ver al evaluar la renovación de su póliza." },
      { title: "A base de soya y ecológico", desc: "La fórmula a base de soya es no tóxica, biodegradable y segura para su jardín, mascotas y familia. Sin químicos agresivos, sin vapores tóxicos, sin preocupaciones ambientales." },
      { title: "Aplicado por nuestro equipo capacitado", desc: "Como todo lo que hacemos, la aplicación de Peak 301 la hace nuestro propio equipo capacitado, no subcontratado. Inspeccionamos la condición de su techo, aplicamos el sellador correctamente y documentamos el tratamiento para sus registros." },
    ],
    mathEyebrow: "Las Cuentas",
    mathTitle: "Rejuvenecimiento vs. Reemplazo",
    mathReplacementLabel: "Reemplazo Total",
    mathReplacementPrice: "$15K a $25K+",
    mathReplacementDesc: "Semanas de arrancar el techo, contenedores y un cheque de cinco cifras. Puede que su aseguradora aún no quede contenta.",
    mathPeakLabel: "Tratamiento Peak 301",
    mathPeakPrice: "Hasta 70% Menos",
    mathPeakDesc: "Que una instalación de techo nuevo. Aplicación de un solo día. 6 a 10 años de vida añadida. Garantía de 6 años. Documentación que su aseguradora necesita ver al evaluar su póliza. Precio exacto después de su evaluación gratuita.",
    mathSub: "La mayoría de los propietarios que nos llaman no sabían que el rejuvenecimiento era una opción. Reserve una evaluación gratuita. Le diremos exactamente lo que necesita su techo de tejas, con precios reales para su hogar.",
    goldEyebrow: "El Estándar de Oro",
    goldTitle: "Nuestro Proceso Peak 301",
    goldSub: "Cada hogar. Cada vez. Sin excepciones.",
    goldSteps: [
      { num: "01", title: "Evaluar", desc: "Inspeccionamos la condición actual de su techo, edad y tipo de tejas para determinar si Peak 301 es la solución correcta. No todo techo es candidato. Seremos honestos si el suyo no lo es." },
      { num: "02", title: "Diseñar", desc: "Plan de tratamiento basado en las necesidades específicas de su techo, precios transparentes y una explicación clara de qué esperar, incluyendo la documentación de garantía que recibirá." },
      { num: "03", title: "Instalar", desc: "Nuestro equipo aplica el sellador Peak 301 en todo su techo de tejas. La fórmula a base de soya penetra y comienza a restaurar sus tejas desde adentro inmediatamente." },
      { num: "04", title: "Proteger", desc: "Usted recibe documentación oficial de garantía que muestra que su techo ha sido tratado profesionalmente. Esta es la documentación que proporciona a su compañía de seguros para demostrar la viabilidad del techo." },
    ],
    faqEyebrow: "Preguntas Frecuentes",
    faqTitle: "Preguntas Sobre Peak 301",
    faqs: [
      { q: "¿Qué es exactamente Peak 301?", a: "Peak 301 es un sellador natural de rejuvenecimiento a base de soya. Penetra en el material de sus tejas y restaura los aceites que la exposición UV y el calor han agotado con el tiempo. No es un recubrimiento, pintura o spray. Trabaja desde el interior de la teja hacia afuera, restaurando flexibilidad, impermeabilización e integridad estructural." },
      { q: "¿Cuánto cuesta el tratamiento Peak 301?", a: "Cada techo es diferente. Tamaño, tipo de teja, condición y acceso afectan el precio. Para la mayoría de las casas en Tampa, el tratamiento Peak 301 cuesta alrededor de 60 a 75% menos que un reemplazo total ($15,000 a $25,000+). Damos precio exacto solo después de inspeccionar su techo específico. La evaluación gratuita es la forma más rápida de obtener un número real." },
      { q: "¿Peak 301 me ayudará a mantener mi seguro?", a: "Es uno de sus mayores beneficios. Las aseguradoras de Florida están cancelando cada vez más la cobertura en techos de más de 15 años. El tratamiento Peak 301 viene con documentación de garantía que demuestra que su techo ha sido rejuvenecido profesionalmente y tiene vida útil verificada. Esta es la documentación que las aseguradoras necesitan ver al evaluar la renovación." },
      { q: "¿Cuánto dura el tratamiento?", a: "Peak 301 agrega 6 a 10 años de vida a su techo de tejas existente. La duración exacta depende de la condición actual, edad y tipo de tejas, lo cual evaluamos antes de recomendar el tratamiento." },
      { q: "¿Funciona en techos de metal, teja de barro o techos planos?", a: "No. Peak 301 está diseñado específicamente para techos de tejas asfálticas. No lo aplicamos en techos de metal, teja de barro o techos planos. Si tiene un techo distinto, se lo diremos durante la evaluación en lugar de venderle el producto equivocado." },
      { q: "¿Mi techo es buen candidato para Peak 301?", a: "La mayoría de los techos de tejas asfálticas entre 8 y 20 años son buenos candidatos. Techos con daño estructural significativo, tejas faltantes o goteras activas pueden necesitar reparaciones primero o estar más allá del rejuvenecimiento. Inspeccionamos su techo honestamente y le decimos si Peak 301 tiene sentido o si el reemplazo es mejor." },
      { q: "¿El sellador es seguro para mi casa y jardín?", a: "Sí. Peak 301 es una fórmula natural a base de soya. Es no tóxica, biodegradable y completamente segura para su jardín, mascotas y familia. Sin químicos agresivos ni vapores tóxicos." },
      { q: "¿Cuánto tiempo toma la aplicación?", a: "La mayoría de las aplicaciones residenciales se completan en un solo día. El sellador comienza a penetrar y trabajar inmediatamente después de la aplicación." },
      { q: "¿Puedo ver pruebas de que Peak 301 funciona?", a: "Sí. Podemos mostrarle documentación sobre las pruebas del sellador, datos de rendimiento y términos de garantía. También podemos conectarlo con propietarios en Tampa que han recibido el tratamiento y han mantenido su cobertura de seguro como resultado." },
    ],
    ctaTitle: "No Reemplace Su Techo Hasta Que Nos Llame",
    ctaSub: "Peak 301 podría ahorrarle $15,000+ y mantener su seguro intacto. Obtenga una evaluación gratuita para saber si su techo de tejas es candidato para rejuvenecimiento en lugar de reemplazo.",
    formTitle: "Obtenga Su Evaluación Gratuita",
    formName: "Nombre Completo",
    formPhone: "Número de Teléfono",
    formEmail: "Correo Electrónico",
    formZip: "Código Postal",
    formBtn: "Solicitar Mi Evaluación Gratuita",
    formNote: "Sin spam. Sin presión. Evaluación honesta de si Peak 301 es adecuado para su techo de tejas.",
    formSent: "Solicitud Recibida",
    formSentSub: "Nos pondremos en contacto en horas para programar su inspección de techo.",
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

export default function Peak301Page() {
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
          service: "Peak 301 Roof Rejuvenation",
          page: "peak-301",
          message: "Free roof assessment request",
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
        {/* ── BREADCRUMB ── */}
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

        {/* ── HERO ── */}
        <section
          className="jr-noise-bg"
          style={{
            position: "relative",
            padding: "var(--jr-space-12) var(--jr-space-6) var(--jr-space-20)",
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
          <Container style={{ position: "relative", zIndex: 1 }}>
            <div style={{ maxWidth: "780px" }}>
              <div style={{ fontFamily: "var(--jr-font-heading)", fontSize: "var(--jr-text-xs)", fontWeight: 700, color: ACCENT_LIGHT, letterSpacing: "4px", marginBottom: "var(--jr-space-4)", textTransform: "uppercase", display: "inline-flex", alignItems: "center", gap: 8 }}>
                <span aria-hidden style={{ fontSize: 14 }}>⚠️</span> {t.heroTag}
              </div>
              <h1 style={{ fontFamily: "var(--jr-font-heading)", fontSize: "var(--jr-text-4xl)", fontWeight: 800, lineHeight: 1.05, marginBottom: "var(--jr-space-6)", letterSpacing: "-0.5px" }}>
                {t.heroH1a} {t.heroH1b}<br />
                <span style={{ color: ACCENT_LIGHT }}>{t.heroH1c}</span>
              </h1>
              <p style={{ fontFamily: "var(--jr-font-body)", fontSize: "var(--jr-text-lg)", color: "var(--jr-cream-2)", lineHeight: 1.65, marginBottom: "var(--jr-space-8)", maxWidth: "660px" }}>
                {t.heroP}
              </p>
              <div style={{ display: "flex", gap: "var(--jr-space-4)", flexWrap: "wrap", marginBottom: "var(--jr-space-8)" }}>
                <Button
                  href="#quote-form"
                  variant="primary"
                  size="lg"
                  iconRight
                  style={{
                    background: `linear-gradient(135deg, ${ACCENT}, ${ACCENT_LIGHT})`,
                    color: "#FFFFFF",
                    border: `2px solid ${ACCENT}`,
                    boxShadow: `0 4px 14px rgba(177, 26, 33, 0.32)`,
                  }}
                >
                  {t.heroCta}
                </Button>
                <Button href="tel:8444443114" variant="outline" size="lg" iconLeft={<PhoneIcon size={18} />}>{t.heroCall}</Button>
              </div>
              <div style={{ display: "flex", gap: "var(--jr-space-8)", flexWrap: "wrap" }}>
                {t.stats.map((s, i) => (
                  <div key={i}>
                    <div style={{ fontFamily: "var(--jr-font-heading)", fontSize: "var(--jr-text-2xl)", fontWeight: 800, color: ACCENT_LIGHT }}>{s.value}</div>
                    <div style={{ fontFamily: "var(--jr-font-body)", fontSize: "var(--jr-text-xs)", color: "var(--jr-muted-on-dark)", maxWidth: "140px" }}>{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </Container>
        </section>

        {/* ── INSURANCE ALERT ── */}
        <section style={{ background: "var(--jr-navy-deep)", padding: "var(--jr-space-16) 0", borderTop: "var(--jr-hair-darker)", borderBottom: "var(--jr-hair-darker)" }}>
          <Container size="narrow" style={{ textAlign: "center" }}>
            <div style={{ display: "inline-block", padding: "6px 14px", background: "rgba(177, 26, 33, 0.10)", border: `1px solid ${ACCENT}`, borderRadius: "var(--jr-radius-sm)", marginBottom: "var(--jr-space-3)" }}>
              <span style={{ fontFamily: "var(--jr-font-heading)", fontSize: "var(--jr-text-xs)", fontWeight: 700, color: ACCENT_LIGHT, letterSpacing: "3px", textTransform: "uppercase" }}>
                <span aria-hidden style={{ marginRight: 6 }}>⚠️</span>{t.insuranceLabel}
              </span>
            </div>
            <div style={{ display: "flex", justifyContent: "center", gap: "var(--jr-space-12)", flexWrap: "wrap", margin: "var(--jr-space-8) 0" }}>
              <div>
                <div style={{ fontFamily: "var(--jr-font-heading)", fontSize: "var(--jr-text-4xl)", fontWeight: 800, color: ACCENT_LIGHT }}>{t.insuranceStat1}</div>
                <div style={{ fontFamily: "var(--jr-font-body)", fontSize: "var(--jr-text-sm)", color: "var(--jr-muted-on-dark)", maxWidth: "220px" }}>{t.insuranceStat1Label}</div>
              </div>
              <div>
                <div style={{ fontFamily: "var(--jr-font-heading)", fontSize: "var(--jr-text-4xl)", fontWeight: 800, color: ACCENT_LIGHT }}>{t.insuranceStat2}</div>
                <div style={{ fontFamily: "var(--jr-font-body)", fontSize: "var(--jr-text-sm)", color: "var(--jr-muted-on-dark)", maxWidth: "220px" }}>{t.insuranceStat2Label}</div>
              </div>
            </div>
            <p style={{ fontFamily: "var(--jr-font-body)", fontSize: "var(--jr-text-lg)", color: "var(--jr-cream-2)", lineHeight: 1.7, maxWidth: "720px", margin: "0 auto var(--jr-space-8)" }}>
              {t.insuranceDesc}
            </p>
            <Button
              href="/insurance-resource-center"
              variant="primary"
              size="lg"
              iconRight
              style={{
                background: `linear-gradient(135deg, ${ACCENT}, ${ACCENT_LIGHT})`,
                color: "#FFFFFF",
                border: `2px solid ${ACCENT}`,
                boxShadow: `0 4px 14px rgba(177, 26, 33, 0.32)`,
              }}
            >
              {t.insuranceCta}
            </Button>
            <p style={{ fontFamily: "var(--jr-font-body)", fontSize: "var(--jr-text-sm)", color: "var(--jr-muted-on-dark)", marginTop: "var(--jr-space-4)" }}>{t.insuranceSub}</p>
          </Container>
        </section>

        {/* ── PROBLEM ── */}
        <section style={{ background: "var(--jr-navy)", padding: "var(--jr-space-20) 0" }}>
          <Container>
            <SectionHeading eyebrow={t.problemEyebrow} title={t.problemTitle} theme="dark" />
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "var(--jr-space-5)" }}>
              {t.problems.map((p, i) => (
                <article key={i} className="jr-hover-lift" style={{ background: "var(--jr-navy-deep)", border: "1px solid var(--jr-navy-3)", borderRadius: "var(--jr-radius-lg)", padding: "28px 24px", borderLeft: `4px solid ${ACCENT}` }}>
                  <div style={{ width: 52, height: 52, borderRadius: "var(--jr-radius-md)", background: "rgba(177, 26, 33, 0.10)", border: `1px solid ${ACCENT}`, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "var(--jr-space-4)" }}>
                    <span aria-hidden style={{ fontSize: 28, lineHeight: 1 }}>{p.emoji}</span>
                  </div>
                  <h3 style={{ fontFamily: "var(--jr-font-heading)", fontSize: "var(--jr-text-lg)", fontWeight: 700, color: "var(--jr-paper)", marginBottom: "var(--jr-space-2)" }}>{p.title}</h3>
                  <p style={{ fontFamily: "var(--jr-font-body)", fontSize: "var(--jr-text-md)", color: "var(--jr-muted-on-dark)", lineHeight: 1.6 }}>{p.desc}</p>
                </article>
              ))}
            </div>
          </Container>
        </section>

        {/* ── SOLUTION ── */}
        <section style={{ background: "var(--jr-navy-deep)", padding: "var(--jr-space-20) 0" }}>
          <Container>
            <SectionHeading eyebrow={t.solutionEyebrow} title={t.solutionTitle} subtitle={t.solutionSub} theme="dark" />
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "var(--jr-space-5)" }}>
              {t.solutions.map((s, i) => (
                <article key={i} className="jr-hover-lift" style={{ background: "var(--jr-navy)", border: "1px solid var(--jr-navy-3)", borderRadius: "var(--jr-radius-lg)", padding: "28px 24px" }}>
                  <div style={{ fontFamily: "var(--jr-font-heading)", fontSize: "var(--jr-text-xs)", fontWeight: 700, color: ACCENT_LIGHT, letterSpacing: "2px", marginBottom: "var(--jr-space-2)" }}>0{i + 1}</div>
                  <h3 style={{ fontFamily: "var(--jr-font-heading)", fontSize: "var(--jr-text-lg)", fontWeight: 700, color: "var(--jr-paper)", marginBottom: "var(--jr-space-3)" }}>{s.title}</h3>
                  <p style={{ fontFamily: "var(--jr-font-body)", fontSize: "var(--jr-text-md)", color: "var(--jr-muted-on-dark)", lineHeight: 1.65 }}>{s.desc}</p>
                </article>
              ))}
            </div>
          </Container>
        </section>

        {/* ── COST COMPARISON ── */}
        <section style={{ background: "var(--jr-navy)", padding: "var(--jr-space-20) 0" }}>
          <Container size="narrow">
            <SectionHeading eyebrow={t.mathEyebrow} title={t.mathTitle} theme="dark" />
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "var(--jr-space-5)" }}>
              <div style={{ background: "var(--jr-navy-deep)", border: "1px solid var(--jr-navy-3)", borderRadius: "var(--jr-radius-lg)", padding: "28px 24px", textAlign: "center" }}>
                <div style={{ fontFamily: "var(--jr-font-heading)", fontSize: "var(--jr-text-xs)", fontWeight: 700, color: "var(--jr-muted-on-dark)", letterSpacing: "2px", marginBottom: "var(--jr-space-3)", textTransform: "uppercase" }}>{t.mathReplacementLabel}</div>
                <div style={{ fontFamily: "var(--jr-font-heading)", fontSize: "var(--jr-text-3xl)", fontWeight: 800, color: "var(--jr-paper)" }}>{t.mathReplacementPrice}</div>
                <div style={{ fontFamily: "var(--jr-font-body)", fontSize: "var(--jr-text-sm)", color: "var(--jr-muted-on-dark)", marginTop: "var(--jr-space-3)", lineHeight: 1.6 }}>{t.mathReplacementDesc}</div>
              </div>
              <div style={{ background: "var(--jr-navy-deep)", border: `1px solid ${ACCENT}`, borderRadius: "var(--jr-radius-lg)", padding: "28px 24px", textAlign: "center", boxShadow: `0 6px 20px rgba(177, 26, 33, 0.22)` }}>
                <div style={{ fontFamily: "var(--jr-font-heading)", fontSize: "var(--jr-text-xs)", fontWeight: 700, color: ACCENT_LIGHT, letterSpacing: "2px", marginBottom: "var(--jr-space-3)", textTransform: "uppercase" }}>{t.mathPeakLabel}</div>
                <div style={{ fontFamily: "var(--jr-font-heading)", fontSize: "var(--jr-text-3xl)", fontWeight: 800, color: ACCENT_LIGHT }}>{t.mathPeakPrice}</div>
                <div style={{ fontFamily: "var(--jr-font-body)", fontSize: "var(--jr-text-sm)", color: "var(--jr-muted-on-dark)", marginTop: "var(--jr-space-3)", lineHeight: 1.6 }}>{t.mathPeakDesc}</div>
              </div>
            </div>
            <p style={{ fontFamily: "var(--jr-font-body)", fontSize: "var(--jr-text-md)", color: "var(--jr-muted-on-dark)", marginTop: "var(--jr-space-6)", textAlign: "center", fontStyle: "italic" }}>{t.mathSub}</p>
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

        {/* ── FAQ ── */}
        <section style={{ background: "var(--jr-navy)", padding: "var(--jr-space-20) 0" }}>
          <Container size="prose">
            <SectionHeading eyebrow={t.faqEyebrow} title={t.faqTitle} theme="dark" />
            <FAQAccordion items={t.faqs} theme="dark" />
          </Container>
        </section>

        {/* ── CTA FORM ── */}
        <section id="quote-form" style={{ background: "linear-gradient(165deg, var(--jr-navy-2), var(--jr-navy))", padding: "var(--jr-space-20) 0", borderTop: "var(--jr-hair-darker)" }}>
          <Container size="narrow" style={{ textAlign: "center" }}>
            <h2 style={{ fontFamily: "var(--jr-font-heading)", fontSize: "var(--jr-text-3xl)", fontWeight: 700, color: "var(--jr-paper)", letterSpacing: "1px", marginBottom: "var(--jr-space-3)", textTransform: "uppercase" }}>
              {t.ctaTitle}
            </h2>
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
                  <div aria-hidden style={{ width: 40, height: 3, background: ACCENT, borderRadius: 2, margin: "10px auto var(--jr-space-5)" }} />
                  <input aria-label={t.formName} style={inputStyle} placeholder={t.formName} value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required />
                  <input aria-label={t.formPhone} style={inputStyle} placeholder={t.formPhone} type="tel" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} required />
                  <input aria-label={t.formEmail} style={inputStyle} placeholder={t.formEmail} type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
                  <input aria-label={t.formZip} style={inputStyle} placeholder={t.formZip} value={formData.zip} onChange={(e) => setFormData({ ...formData, zip: e.target.value })} maxLength={5} />
                  <Button
                    type="submit"
                    variant="primary"
                    size="md"
                    fullWidth
                    iconRight
                    disabled={loading}
                    style={{
                      background: `linear-gradient(135deg, ${ACCENT}, ${ACCENT_LIGHT})`,
                      color: "#FFFFFF",
                      border: `2px solid ${ACCENT}`,
                      boxShadow: `0 4px 14px rgba(177, 26, 33, 0.32)`,
                    }}
                  >
                    {loading ? "Sending..." : t.formBtn}
                  </Button>
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
