"use client";

/* ═══════════════════════════════════════════════════════════
   JR ONE ALUMINUM | ABOUT US
   Brand-brain compliant. Migrated to design tokens + UI components.
   ═══════════════════════════════════════════════════════════ */

import { useState } from "react";
import { useLanguage } from "../../lib/LanguageContext";
import { useLeadGuard } from "../../lib/lead-guard";
// Google rating and review count. Single source of truth; lib/review-stats.js
// records the profile URL and the date the numbers were last checked.
import { REVIEW_RATING, googleRatingFromCount } from "../../lib/review-stats";
import { submitLeadForm, SUBMIT_ERROR_STYLE } from "../../lib/lead-submit";
import { localizeHref } from "../../lib/locale";
import SiteNav from "../../components/SiteNav";
import SiteFooter from "../../components/SiteFooter";
import MobileCTA from "../../components/MobileCTA";
import Container from "../../components/ui/Container";
import Button from "../../components/ui/Button";
import SectionHeading from "../../components/ui/SectionHeading";
import ProcessStep from "../../components/ui/ProcessStep";
import ReviewCard from "../../components/ui/ReviewCard";
import CTABand from "../../components/ui/CTABand";
import { CheckCircleIcon, PhoneIcon } from "../../lib/icons";

const T = {
  en: {
    breadcrumbHome: "Home",
    breadcrumbAbout: "About Us",
    heroTag: "OUR STORY",
    heroH1a: "One Family. Over Three Decades",
    heroH1b: "in the Tampa Gutter Trade.",
    heroP: "The story didn't start in a boardroom. It started on a rooftop in Tampa, with a man from Honduras, a gutter machine, and a belief that honest work builds an honest life. His son Christopher went on to form JR One Aluminum LLC and carry the family trade forward. Over 30 years in the Tampa Bay gutter industry, family-owned. This is how we got here.",
    ch1Year: "THE BEGINNING",
    ch1Title: "From Honduras to Tampa Bay",
    ch1P1: "Javier Rivera immigrated to Tampa from Honduras and started doing what he knew, working with his hands. He began installing gutters, learning the trade from the ground up, and building a reputation one house at a time.",
    ch1P2: "For the next decade, Javier installed gutters himself across Tampa Bay. He wasn't building a brand or running marketing campaigns. He was on rooftops, bending aluminum, teaching anyone willing to learn. Many of the gutter and soffit companies operating in the Tampa market today trace their knowledge back to Javier. People who worked for him, worked with him, or learned alongside him.",
    ch2Year: "2001",
    ch2Title: "What Shaped Us",
    ch2P1: "In 2001, Javier was injured in a fall while doing gutter work. The result of an incorrectly placed powerline on the job site. The accident left him paralyzed. He's been in a wheelchair ever since.",
    ch2P2: "It was a preventable accident. And it's the reason this company operates the way it does. When you've watched something like that happen to your own father over something that should have been caught, you don't take shortcuts. You don't rush. You check everything twice. That's not a philosophy we adopted. It's something we carry.",
    ch3Tag: "THE NEXT GENERATION",
    ch3Title: "Growing Up in the Trade",
    ch3P1: "Christopher Rivera had been doing estimates with his father since he was nine years old. While other kids were playing, he was learning how to read a roofline, measure a gutter run, and talk to homeowners about protecting their property.",
    ch3P2: "After Javier's accident, Christopher stepped up. Not because it was a career opportunity. Because his family needed him and the work his father started needed to continue. The knowledge Javier spent a decade building couldn't end on that rooftop.",
    ch3P3: "Today, JR One Aluminum LLC operates three in-house crews serving Tampa Bay and Florida's west coast. Some of the homes we work on are the same homes Javier installed gutters on decades ago. We've gone back and redone his original work, which is humbling and a reminder that this trade is in our blood.",
    ch4Tag: "WHY THIS MATTERS TO YOU",
    ch4Title: "Why We're Thorough About Everything",
    ch4P1: "When people work with JR One, they sometimes notice that we're more detailed than other contractors. Our estimates are longer. Our inspections are more thorough. Our communication is more frequent. Our cleanup is more meticulous.",
    ch4P2: "That's not a sales tactic. That's what happens when you build a company on the belief that a mistake can cost someone everything.",
    ch4P3: "We don't cut corners because we've seen what cutting corners costs. We don't use subcontractors because we need to know that every person on your property meets our standard. We don't rush because speed without care is how people get hurt and homes get damaged.",
    ch4P4: "Our price reflects all of this. When you hire JR One, you're paying for the peace of mind that comes from knowing the job was done right, done safely, and done by people who understand that the details aren't optional.",
    goldStandardEyebrow: "THE GOLD STANDARD",
    goldStandardTitle: "How We Work",
    goldStandardSub: "Every home. Every time. No exceptions. This isn't a marketing slogan. It's a promise born from knowing what happens when standards slip.",
    steps: [
      { num: "01", title: "Assess", desc: "Thorough inspection. No shortcuts." },
      { num: "02", title: "Design", desc: "Transparent estimate. No surprises." },
      { num: "03", title: "Install", desc: "Our crew. Careful work. No subs." },
      { num: "04", title: "Protect", desc: "Warranty. Follow-up. No excuses." },
    ],
    numbersEyebrow: "JR ONE TODAY",
    numbersTitle: "By the Numbers",
    stats: [
      { value: "2", label: "Generations in the trade" },
      { value: "30+", label: "Years of family experience in the trade" },
      { value: "3", label: "In-house installation crews" },
      { value: REVIEW_RATING, label: googleRatingFromCount("en") },
      { value: "0", label: "Subcontractors used, ever" },
      { value: "20+", label: "Cities served across Florida's west coast" },
    ],
    servicesEyebrow: "WHAT WE DO",
    servicesTitle: "Our Specialty Trade",
    servicesP: "We do one thing and we do it well. Aluminum exterior systems. Gutters, soffit, fascia, siding, gutter guards, and roof rejuvenation. No roofing. No painting. No general contracting. Just aluminum, done right.",
    services: [
      { title: "Seamless Aluminum Gutters", desc: "6\" and 7\" systems custom-fabricated on your property." },
      { title: "Gutter Guards", desc: "Multiple guard types to keep debris out and make maintenance easier." },
      { title: "Soffit & Fascia", desc: "Aluminum and vinyl installations that protect your roof edge." },
      { title: "Siding", desc: "Vinyl and aluminum siding for Florida weather protection." },
      { title: "Gutter Repair & Maintenance", desc: "Fix it right the first time. Seasonal programs available." },
      { title: "Peak 301 Roof Rejuvenation", desc: "Soy-based sealant that extends roof life 6 to 10 years." },
    ],
    bilingualTitle: "Hablamos Español",
    bilingualP: "Our roots are Honduran. Our team is bilingual. Whether you're more comfortable in English or Spanish, we'll communicate clearly in the language you prefer, from the first estimate to the final walkthrough.",
    reviewsEyebrow: "WHAT PEOPLE SAY",
    reviewsTitle: "Our Reputation Speaks for Itself",
    reviews: [
      { text: "From the very beginning, they worked to ensure I received a fair quote. There was no high pressure selling. The workmanship was outstanding, and they took pictures of each step showing me what was transpiring.", name: "Lois G.", service: "Gutters & Soffits", stars: 5 },
      { text: "We referred a customer to JR One and they could not stop praising his workmanship and professionalism. They will be the go-to for all our gutter and soffit requests from customers.", name: "Adam E.", service: "Contractor Referral", stars: 5 },
      { text: "After Milton I called a dozen companies. Only JR One called back. The team showed up and did a perfect job. Do not call anyone else.", name: "Matt D.", service: "Storm Damage", stars: 5 },
    ],
    ctaTitle: "Ready to Work With Us?",
    ctaSub: "Get your free, no-pressure quote. We respond within hours and we'll explain everything as thoroughly as you'd expect from us.",
    ctaForm: "Request a Quote",
    imgAlt: "Javier Rivera, founder of the family trade, with over 30 years in the Tampa Bay gutter industry",
  },
  es: {
    breadcrumbHome: "Inicio",
    breadcrumbAbout: "Sobre Nosotros",
    heroTag: "NUESTRA HISTORIA",
    heroH1a: "Una Familia. Más de Tres Décadas",
    heroH1b: "en el Oficio de Canaletas de Tampa.",
    heroP: "La historia no nació en una sala de juntas. Nació en un techo en Tampa, con un hombre de Honduras, una máquina de canaletas y la convicción de que el trabajo honesto construye una vida honesta. Su hijo Christopher formó después JR One Aluminum LLC para llevar el oficio familiar hacia adelante. Más de 30 años en la industria de canaletas de Tampa Bay, empresa familiar. Así llegamos hasta aquí.",
    ch1Year: "EL COMIENZO",
    ch1Title: "De Honduras a Tampa Bay",
    ch1P1: "Javier Rivera inmigró a Tampa desde Honduras y comenzó a hacer lo que sabía. Trabajar con sus manos. Empezó instalando canaletas, aprendiendo el oficio desde cero y construyendo una reputación casa por casa.",
    ch1P2: "Durante la siguiente década, Javier instaló canaletas él mismo por toda el área de Tampa Bay. No estaba construyendo una marca ni haciendo campañas de marketing. Estaba en los techos, doblando aluminio, enseñando a cualquiera dispuesto a aprender. Muchas de las empresas de canaletas y sofitos que operan hoy en el mercado de Tampa pueden rastrear su conocimiento hasta Javier. Personas que trabajaron para él, con él, o aprendieron a su lado.",
    ch2Year: "2001",
    ch2Title: "Lo Que Nos Formó",
    ch2P1: "En 2001, Javier sufrió una caída mientras hacía trabajo de canaletas. Resultado de una línea eléctrica mal colocada en el sitio de trabajo. El accidente lo dejó paralizado. Desde entonces está en silla de ruedas.",
    ch2P2: "Fue un accidente prevenible. Y es la razón por la que esta empresa opera como lo hace. Cuando has visto algo así pasarle a tu propio padre por algo que debió haberse detectado, no tomas atajos. No te apresuras. Revisas todo dos veces. Eso no es una filosofía que adoptamos. Es algo que cargamos.",
    ch3Tag: "LA SIGUIENTE GENERACIÓN",
    ch3Title: "Creciendo en el Oficio",
    ch3P1: "Christopher Rivera había estado haciendo estimados con su padre desde los nueve años. Mientras otros niños jugaban, el estaba aprendiendo a leer una línea de techo, medir un tramo de canaleta y hablar con propietarios sobre la protección de sus hogares.",
    ch3P2: "Después del accidente de Javier, Christopher dio el paso. No porque fuera una oportunidad de carrera. Sino porque su familia lo necesitaba y el trabajo que su padre comenzó tenía que continuar. El conocimiento que Javier pasó una década construyendo no podía terminar en ese techo.",
    ch3P3: "Hoy, JR One Aluminum LLC opera tres cuadrillas internas que sirven a Tampa Bay y la costa oeste de Florida. Algunas de las casas en las que trabajamos son las mismas casas donde Javier instaló canaletas hace décadas. Hemos regresado a rehacer su trabajo original, lo cual es humilde y un recordatorio de que este oficio lo llevamos en la sangre.",
    ch4Tag: "POR QUÉ ESTO TE IMPORTA",
    ch4Title: "Por Qué Somos Tan Meticulosos en Todo",
    ch4P1: "Cuando la gente trabaja con JR One, a veces notan que somos más detallistas que otros contratistas. Nuestros estimados son más largos. Nuestras inspecciones son más exhaustivas. Nuestra comunicación es más frecuente. Nuestra limpieza es más meticulosa.",
    ch4P2: "Eso no es una táctica de ventas. Es lo que pasa cuando construyes una empresa con la convicción de que un error puede costarle todo a alguien.",
    ch4P3: "No tomamos atajos porque hemos visto lo que cuestan los atajos. No usamos subcontratistas porque necesitamos saber que cada persona en tu propiedad cumple con nuestro estándar. No nos apuramos porque la velocidad sin cuidado es como la gente se lastima y los hogares se dañan.",
    ch4P4: "Nuestro precio refleja todo esto. Cuando contratas a JR One, estás pagando por la tranquilidad de saber que el trabajo se hizo bien, de manera segura, y por personas que entienden que los detalles no son opcionales.",
    goldStandardEyebrow: "EL ESTÁNDAR DE ORO",
    goldStandardTitle: "Cómo Trabajamos",
    goldStandardSub: "Cada hogar. Cada vez. Sin excepciones. Esto no es un eslogan de marketing. Es una promesa nacida de saber lo que pasa cuando los estándares bajan.",
    steps: [
      { num: "01", title: "Evaluar", desc: "Inspección exhaustiva. Sin atajos." },
      { num: "02", title: "Diseñar", desc: "Estimado transparente. Sin sorpresas." },
      { num: "03", title: "Instalar", desc: "Nuestra cuadrilla. Trabajo cuidadoso. Sin subcontratistas." },
      { num: "04", title: "Proteger", desc: "Garantía. Seguimiento. Sin excusas." },
    ],
    numbersEyebrow: "JR ONE HOY",
    numbersTitle: "En Números",
    stats: [
      { value: "2", label: "Generaciones en el oficio" },
      { value: "30+", label: "Años de experiencia familiar en el oficio" },
      { value: "3", label: "Cuadrillas de instalación internas" },
      { value: REVIEW_RATING, label: googleRatingFromCount("es") },
      { value: "0", label: "Subcontratistas usados, jamás" },
      { value: "20+", label: "Ciudades atendidas en la costa oeste de Florida" },
    ],
    servicesEyebrow: "LO QUE HACEMOS",
    servicesTitle: "Nuestro Oficio Especializado",
    servicesP: "Hacemos una cosa y la hacemos bien. Sistemas exteriores de aluminio. Canaletas, sofitos, fascia, revestimiento, protectores de canaletas y rejuvenecimiento de techos. Sin techado. Sin pintura. Sin contratación general. Solo aluminio, bien hecho.",
    services: [
      { title: "Canaletas de Aluminio Sin Costura", desc: "Sistemas de 6\" y 7\" fabricados a medida en tu propiedad." },
      { title: "Protectores de Canaletas", desc: "Múltiples tipos de protectores para mantener los escombros fuera y facilitar el mantenimiento." },
      { title: "Sofito y Fascia", desc: "Instalaciones de aluminio y vinilo que protegen el borde de tu techo." },
      { title: "Revestimiento", desc: "Revestimiento de vinilo y aluminio para protección contra el clima de Florida." },
      { title: "Reparación y Mantenimiento de Canaletas", desc: "Lo arreglamos bien la primera vez. Programas de temporada disponibles." },
      { title: "Peak 301 Rejuvenecimiento de Techo", desc: "Sellador a base de soya que extiende la vida del techo 6 a 10 años." },
    ],
    bilingualTitle: "Hablamos Español",
    bilingualP: "Nuestras raíces son hondureñas. Nuestro equipo es bilingüe. Ya sea que te sientas más cómodo en inglés o español, nos comunicaremos claramente en el idioma que prefieras, desde el primer estimado hasta la inspección final.",
    reviewsEyebrow: "LO QUE DICEN",
    reviewsTitle: "Nuestra Reputación Habla por Sí Misma",
    reviews: [
      { text: "Desde el principio, trabajaron para asegurarse de que recibiera una cotización justa. No hubo venta de alta presión. La calidad del trabajo fue sobresaliente, y tomaron fotos de cada paso mostrándome lo que estaba sucediendo.", name: "Lois G.", service: "Canaletas y Sofitos", stars: 5 },
      { text: "Referimos a un cliente a JR One y no dejaban de elogiar su calidad de trabajo y profesionalismo. Serán los preferidos para todas nuestras solicitudes de canaletas y sofitos de clientes.", name: "Adam E.", service: "Referencia de Contratista", stars: 5 },
      { text: "Después de Milton llamé a una docena de empresas. Solo JR One devolvió la llamada. El equipo llegó e hizo un trabajo perfecto. No llamen a nadie más.", name: "Matt D.", service: "Daño por Tormenta", stars: 5 },
    ],
    ctaTitle: "Listo Para Trabajar Con Nosotros?",
    ctaSub: "Obtene tu cotización gratuita sin presión. Respondemos en horas y te explicamos todo tan detalladamente como esperarías de nosotros.",
    ctaForm: "Solicitar Cotización",
    imgAlt: "Javier Rivera, fundador del oficio familiar, con más de 30 años en la industria de canaletas de Tampa Bay",
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

export default function AboutUsPage() {
  const { lang } = useLanguage();
  const t = T[lang];
  const [formData, setFormData] = useState({ name: "", phone: "", email: "", zip: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState("");
  const { guardFields, honeypot } = useLeadGuard();

  const handleForm = async (e) => {
    e?.preventDefault?.();
    if (!formData.name || !formData.phone) return;
    setFormError("");
    setLoading(true);
    try {
      const params = new URLSearchParams(typeof window !== "undefined" ? window.location.search : "");
      const result = await submitLeadForm({
        formId: "about",
        lang,
        body: {
          ...guardFields(),
          name: formData.name,
          phone: formData.phone,
          email: formData.email,
          zip: formData.zip,
          page: typeof window !== "undefined" ? window.location.pathname : "/about",
          gclid: params.get("gclid") || "",
          utm_source: params.get("utm_source") || "",
          utm_medium: params.get("utm_medium") || "",
          utm_campaign: params.get("utm_campaign") || "",
          utm_term: params.get("utm_term") || "",
        },
      });
      if (result.ok) setSubmitted(true);
      else setFormError(result.message);
    } finally {
      setLoading(false);
    }
  };

  const chapterStyle = { marginBottom: "var(--jr-space-12)" };
  const chapterEyebrowStyle = {
    fontFamily: "var(--jr-font-heading)",
    fontSize: "var(--jr-text-xs)",
    fontWeight: 700,
    color: "var(--jr-gold)",
    letterSpacing: "3px",
    marginBottom: "var(--jr-space-3)",
    textTransform: "uppercase",
  };
  const chapterTitleStyle = {
    fontFamily: "var(--jr-font-heading)",
    fontSize: "var(--jr-text-2xl)",
    fontWeight: 700,
    color: "var(--jr-paper)",
    marginBottom: "var(--jr-space-4)",
  };
  const chapterBodyStyle = {
    borderLeft: "3px solid var(--jr-gold)",
    paddingLeft: "var(--jr-space-6)",
  };
  const chapterPStyle = {
    fontFamily: "var(--jr-font-body)",
    fontSize: "17px",
    color: "var(--jr-cream-2)",
    lineHeight: 1.75,
    marginBottom: "var(--jr-space-4)",
  };

  return (
    <div style={{ background: "var(--jr-navy)", color: "var(--jr-paper)", minHeight: "100vh" }}>
      <a href="#main" className="jr-skip-link">Skip to content</a>
      <SiteNav />
      <main id="main">
        {/* Breadcrumb */}
        <Container style={{ paddingTop: "var(--jr-space-4)" }}>
          <div style={{ fontFamily: "var(--jr-font-body)", fontSize: "var(--jr-text-sm)", color: "var(--jr-muted-on-dark)" }}>
            <a href={localizeHref("/", lang)} style={{ color: "var(--jr-muted-on-dark)", textDecoration: "none" }}>{t.breadcrumbHome}</a>
            <span style={{ margin: "0 var(--jr-space-2)", opacity: 0.5 }}>/</span>
            <span style={{ color: "var(--jr-gold)" }}>{t.breadcrumbAbout}</span>
          </div>
        </Container>

        {/* JAVIER PHOTO */}
        <section style={{ padding: "var(--jr-space-12) var(--jr-space-6) var(--jr-space-5)" }}>
          <Container size="prose" style={{ textAlign: "center" }}>
            <div
              style={{
                maxWidth: "500px",
                margin: "0 auto",
                borderRadius: "var(--jr-radius-xl)",
                overflow: "hidden",
                border: "2px solid var(--jr-gold)",
                boxShadow: "var(--jr-shadow-lg)",
              }}
            >
              <img src="/images/javier-rivera.jpg" alt={t.imgAlt} style={{ width: "100%", height: "auto", display: "block" }} />
            </div>
          </Container>
        </section>

        {/* HERO */}
        <section style={{ padding: "var(--jr-space-8) var(--jr-space-6) var(--jr-space-10)" }}>
          <Container size="prose" style={{ textAlign: "center" }}>
            <div
              style={{
                display: "inline-block",
                padding: "6px 14px",
                background: "var(--jr-gold-pale)",
                border: "1px solid rgba(212, 175, 55, 0.28)",
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
              {t.heroH1a}<br />
              <span style={{ color: "var(--jr-gold)" }}>{t.heroH1b}</span>
            </h1>
            <p
              style={{
                fontFamily: "var(--jr-font-body)",
                fontSize: "var(--jr-text-lg)",
                color: "var(--jr-muted-on-dark)",
                maxWidth: "700px",
                margin: "0 auto",
                lineHeight: 1.65,
              }}
            >
              {t.heroP}
            </p>
          </Container>
        </section>

        {/* THE STORY */}
        <section style={{ padding: "var(--jr-space-10) var(--jr-space-6) var(--jr-space-20)" }}>
          <Container size="prose">
            <div style={chapterStyle}>
              <div style={chapterEyebrowStyle}>{t.ch1Year}</div>
              <h2 style={chapterTitleStyle}>{t.ch1Title}</h2>
              <div style={chapterBodyStyle}>
                <p style={chapterPStyle}>{t.ch1P1}</p>
                <p style={{ ...chapterPStyle, marginBottom: 0 }}>{t.ch1P2}</p>
              </div>
            </div>

            <div style={chapterStyle}>
              <div style={chapterEyebrowStyle}>{t.ch2Year}</div>
              <h2 style={chapterTitleStyle}>{t.ch2Title}</h2>
              <div style={chapterBodyStyle}>
                <p style={chapterPStyle}>{t.ch2P1}</p>
                <p style={{ ...chapterPStyle, marginBottom: 0 }}>{t.ch2P2}</p>
              </div>
            </div>

            <div style={chapterStyle}>
              <div style={chapterEyebrowStyle}>{t.ch3Tag}</div>
              <h2 style={chapterTitleStyle}>{t.ch3Title}</h2>
              <div style={chapterBodyStyle}>
                <p style={chapterPStyle}>{t.ch3P1}</p>
                <p style={chapterPStyle}>{t.ch3P2}</p>
                <p style={{ ...chapterPStyle, marginBottom: 0 }}>{t.ch3P3}</p>
              </div>
            </div>

            <div style={chapterStyle}>
              <div style={chapterEyebrowStyle}>{t.ch4Tag}</div>
              <h2 style={chapterTitleStyle}>{t.ch4Title}</h2>
              <div style={chapterBodyStyle}>
                <p style={chapterPStyle}>{t.ch4P1}</p>
                <p style={chapterPStyle}>{t.ch4P2}</p>
                <p style={chapterPStyle}>{t.ch4P3}</p>
                <p style={{ ...chapterPStyle, marginBottom: 0 }}>{t.ch4P4}</p>
              </div>
            </div>
          </Container>
        </section>

        {/* GOLD STANDARD */}
        <section style={{ background: "var(--jr-navy-deep)", padding: "var(--jr-space-20) 0" }}>
          <Container>
            <SectionHeading
              eyebrow={t.goldStandardEyebrow}
              title={t.goldStandardTitle}
              subtitle={t.goldStandardSub}
              theme="dark"
            />
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "var(--jr-space-5)" }}>
              {t.steps.map((step) => (
                <ProcessStep key={step.num} num={step.num} title={step.title} desc={step.desc} />
              ))}
            </div>
          </Container>
        </section>

        {/* BY THE NUMBERS */}
        <section style={{ background: "var(--jr-navy)", padding: "var(--jr-space-20) 0" }}>
          <Container size="narrow">
            <SectionHeading
              eyebrow={t.numbersEyebrow}
              title={t.numbersTitle}
              theme="dark"
            />
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "var(--jr-space-5)" }}>
              {t.stats.map((stat, i) => (
                <div
                  key={i}
                  style={{
                    background: "var(--jr-navy-deep)",
                    border: "1px solid var(--jr-navy-3)",
                    borderRadius: "var(--jr-radius-lg)",
                    padding: "var(--jr-space-6)",
                    textAlign: "center",
                  }}
                >
                  <div
                    style={{
                      fontFamily: "var(--jr-font-heading)",
                      fontSize: "32px",
                      fontWeight: 800,
                      color: "var(--jr-gold)",
                    }}
                  >
                    {stat.value}
                  </div>
                  <div
                    style={{
                      fontFamily: "var(--jr-font-body)",
                      fontSize: "var(--jr-text-sm)",
                      color: "var(--jr-muted-on-dark)",
                      marginTop: "var(--jr-space-2)",
                    }}
                  >
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </Container>
        </section>

        {/* SERVICES */}
        <section style={{ background: "var(--jr-navy-deep)", padding: "var(--jr-space-20) 0" }}>
          <Container size="narrow">
            <SectionHeading
              eyebrow={t.servicesEyebrow}
              title={t.servicesTitle}
              subtitle={t.servicesP}
              theme="dark"
            />
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "var(--jr-space-4)" }}>
              {t.services.map((svc, i) => (
                <div
                  key={i}
                  style={{
                    background: "var(--jr-navy)",
                    border: "1px solid var(--jr-navy-3)",
                    borderLeft: "3px solid var(--jr-gold)",
                    borderRadius: "var(--jr-radius-md)",
                    padding: "var(--jr-space-5)",
                  }}
                >
                  <h3
                    style={{
                      fontFamily: "var(--jr-font-heading)",
                      fontSize: "var(--jr-text-base)",
                      fontWeight: 700,
                      color: "var(--jr-paper)",
                      marginBottom: "var(--jr-space-1)",
                    }}
                  >
                    {svc.title}
                  </h3>
                  <p
                    style={{
                      fontFamily: "var(--jr-font-body)",
                      fontSize: "var(--jr-text-sm)",
                      color: "var(--jr-muted-on-dark)",
                      lineHeight: 1.6,
                    }}
                  >
                    {svc.desc}
                  </p>
                </div>
              ))}
            </div>
          </Container>
        </section>

        {/* BILINGUAL */}
        <section style={{ background: "var(--jr-navy)", padding: "var(--jr-space-16) 0" }}>
          <Container size="narrow" style={{ textAlign: "center" }}>
            <h2
              style={{
                fontFamily: "var(--jr-font-heading)",
                fontSize: "var(--jr-text-2xl)",
                fontWeight: 800,
                color: "var(--jr-paper)",
                marginBottom: "var(--jr-space-3)",
              }}
            >
              {t.bilingualTitle}
            </h2>
            <p
              style={{
                fontFamily: "var(--jr-font-body)",
                fontSize: "var(--jr-text-lg)",
                color: "var(--jr-cream-2)",
                maxWidth: "600px",
                margin: "0 auto",
                lineHeight: 1.65,
              }}
            >
              {t.bilingualP}
            </p>
          </Container>
        </section>

        {/* REVIEWS */}
        <section style={{ background: "var(--jr-navy-deep)", padding: "var(--jr-space-20) 0" }}>
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
          </Container>
        </section>

        {/* QUOTE FORM */}
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
                  <h3
                    style={{
                      fontFamily: "var(--jr-font-heading)",
                      fontSize: "var(--jr-text-xl)",
                      fontWeight: 700,
                      color: "var(--jr-navy)",
                      marginBottom: "var(--jr-space-2)",
                    }}
                  >
                    {lang === "en" ? "Request Received" : "Solicitud Recibida"}
                  </h3>
                  <p
                    style={{
                      fontFamily: "var(--jr-font-body)",
                      fontSize: "var(--jr-text-md)",
                      color: "var(--jr-muted-on-light)",
                    }}
                  >
                    {lang === "en"
                      ? "We'll be in touch soon."
                      : "Nos pondremos en contacto pronto."}
                  </p>
                </div>
              ) : (
                <form onSubmit={handleForm}>
                  {honeypot}
                  <h3
                    style={{
                      fontFamily: "var(--jr-font-heading)",
                      fontSize: "var(--jr-text-xl)",
                      fontWeight: 700,
                      color: "var(--jr-navy)",
                      textAlign: "center",
                      marginBottom: "var(--jr-space-1)",
                    }}
                  >
                    {lang === "en" ? "Get Your Free Quote" : "Obtene Tu Cotización Gratis"}
                  </h3>
                  <div aria-hidden style={{ width: 40, height: 3, background: "var(--jr-gold)", borderRadius: 2, margin: "10px auto var(--jr-space-5)" }} />
                  <input
                    aria-label={lang === "en" ? "Full Name" : "Nombre Completo"}
                    style={inputStyle}
                    placeholder={lang === "en" ? "Full Name" : "Nombre Completo"}
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                  <input
                    aria-label={lang === "en" ? "Phone Number" : "Número de Teléfono"}
                    style={inputStyle}
                    placeholder={lang === "en" ? "Phone Number" : "Número de Teléfono"}
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    required
                  />
                  <input
                    aria-label={lang === "en" ? "Email Address" : "Correo Electrónico"}
                    style={inputStyle}
                    placeholder={lang === "en" ? "Email Address" : "Correo Electrónico"}
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                  <input
                    aria-label={lang === "en" ? "ZIP Code" : "Código Postal"}
                    style={inputStyle}
                    placeholder={lang === "en" ? "ZIP Code" : "Código Postal"}
                    value={formData.zip}
                    onChange={(e) => setFormData({ ...formData, zip: e.target.value })}
                    maxLength={5}
                  />
                  <Button type="submit" variant="primary" size="md" fullWidth iconRight disabled={loading}>
                    {loading ? (lang === "en" ? "Sending..." : "Enviando...") : t.ctaForm}
                  </Button>
                  {formError ? (
                    <p role="alert" style={SUBMIT_ERROR_STYLE}>{formError}</p>
                  ) : null}
                  <p
                    style={{
                      fontFamily: "var(--jr-font-body)",
                      fontSize: "var(--jr-text-xs)",
                      color: "var(--jr-muted-on-light)",
                      textAlign: "center",
                      marginTop: "var(--jr-space-3)",
                    }}
                  >
                    {lang === "en"
                      ? "No spam. No pressure. Just honest advice."
                      : "Sin spam. Sin presión. Solo consejos honestos."}
                  </p>
                </form>
              )}
            </div>
            <div style={{ marginTop: "var(--jr-space-8)" }}>
              <Button href="tel:8444443114" variant="ghost" size="md" iconLeft={<PhoneIcon size={18} />}>
                (844) 444-3114
              </Button>
            </div>
          </Container>
        </section>

        <CTABand
          title={lang === "en" ? "One Family. One Standard." : "Una Familia. Un Estándar."}
          sub={lang === "en"
            ? "Family-owned, over 30 years in the trade. Get your free quote today."
            : "Empresa familiar, más de 30 años en el oficio. Obtene tu cotización gratis hoy."}
          primaryLabel={t.ctaForm}
          primaryHref="#quote-form"
        />
      </main>
      <SiteFooter />
      <MobileCTA scrollTarget="quote-form" />
    </div>
  );
}
