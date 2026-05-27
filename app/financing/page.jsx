"use client";

/* ═══════════════════════════════════════════════════════════
   JR ONE ALUMINUM: FINANCING
   Brand-brain compliant. Tokens via app/tokens.css.
   ═══════════════════════════════════════════════════════════ */

import { useLanguage } from "../../lib/LanguageContext";
import SiteNav from "../../components/SiteNav";
import SiteFooter from "../../components/SiteFooter";
import MobileCTA from "../../components/MobileCTA";
import Container from "../../components/ui/Container";
import SectionHeading from "../../components/ui/SectionHeading";
import ProcessStep from "../../components/ui/ProcessStep";
import FAQAccordion from "../../components/ui/FAQAccordion";
import CTABand from "../../components/ui/CTABand";

const T = {
  en: {
    heroTag: "FINANCING",
    heroH1a: "Quality Work Shouldn't",
    heroH1b: "Break the ",
    heroH1bAccent: "Bank.",
    heroP: "We partner with third-party financing providers so you can protect your home now and pay over time. Flexible terms, quick approval, and no impact on your project pricing.",
    howEyebrow: "How It Works",
    howTitle: "How Financing Works",
    howSub: "Four steps. Same price either way.",
    steps: [
      { num: "01", title: "Get your estimate", desc: "We provide a detailed, transparent estimate for your project. Same price whether you pay upfront or finance. No markup." },
      { num: "02", title: "Choose your plan", desc: "We walk you through available financing options including monthly payment amounts, terms, and any promotional rates currently available." },
      { num: "03", title: "Quick approval", desc: "Apply through our financing partner. Most decisions come back in minutes. The initial check is typically a soft credit pull." },
      { num: "04", title: "Work begins", desc: "Once financing is confirmed, we schedule your project. You get professional installation now and manageable payments that fit your budget." },
    ],
    whyTag: "Why Finance",
    whyTitle: "Protecting Your Home Is an Investment",
    whyItems: [
      { title: "Prevent expensive damage now", desc: "Waiting on gutter or soffit repairs because of budget concerns lets water damage compound. A $3,000 installation financed today prevents a $10,000+ foundation repair next year." },
      { title: "Manageable monthly payments", desc: "Spread the cost of your project over months instead of paying everything upfront. Keep your savings intact for emergencies while your home gets the protection it needs." },
      { title: "No price difference", desc: "Your estimate is your estimate. Financing doesn't add to the project cost. It's simply a payment method. You get the same materials, the same crew, the same Gold Standard service." },
      { title: "Senior and military discounts available", desc: "We offer additional discounts for seniors and military families. Combine with financing for the most affordable path to protecting your home." },
    ],
    faqTag: "FAQ",
    faqTitle: "Financing Questions",
    faqs: [
      { q: "Do I need perfect credit to qualify?", a: "No. Our financing partners work with a range of credit profiles. The best way to find out what you qualify for is to apply. The initial check is typically a soft pull that doesn't affect your credit score." },
      { q: "How long does approval take?", a: "Most financing decisions come back within minutes. You'll know before your estimate appointment is over whether you're approved and what your terms are." },
      { q: "Are there 0% interest options?", a: "Promotional 0% APR periods are sometimes available depending on the financing partner and current offers. Ask us about current promotions when you schedule your estimate." },
      { q: "Can I pay off early without penalties?", a: "Most of our financing options allow early payoff without prepayment penalties. We'll confirm the specific terms for your plan before you sign." },
      { q: "What's the minimum project size for financing?", a: "Financing is available for most project sizes. Whether it's a gutter repair or a full house soffit and fascia replacement, we can discuss payment options that work for your budget." },
      { q: "Does financing affect my estimate price?", a: "No. The price of your project is the same whether you pay upfront or finance. Financing is a payment method. It doesn't change the scope or cost of the work." },
    ],
    ctaTitle: "Ready to Discuss Financing?",
    ctaP: "Call us and we'll walk you through your options. No obligation, no pressure.",
  },
  es: {
    heroTag: "FINANCIAMIENTO",
    heroH1a: "Un Trabajo de Calidad No Deberia",
    heroH1b: "Vaciar Tu ",
    heroH1bAccent: "Bolsillo.",
    heroP: "Nos asociamos con proveedores de financiamiento terceros para que puedas proteger tu hogar ahora y pagar con el tiempo. Terminos flexibles, aprobacion rapida y sin impacto en el precio de tu proyecto.",
    howEyebrow: "Como Funciona",
    howTitle: "Como Funciona el Financiamiento",
    howSub: "Cuatro pasos. Mismo precio en ambos casos.",
    steps: [
      { num: "01", title: "Obtene tu estimado", desc: "Proporcionamos un estimado detallado y transparente para tu proyecto. Mismo precio ya sea que pagues por adelantado o financies. Sin recargo." },
      { num: "02", title: "Elige tu plan", desc: "Te guiamos por las opciones de financiamiento disponibles incluyendo montos de pagos mensuales, terminos y cualquier tarifa promocional actualmente disponible." },
      { num: "03", title: "Aprobacion rapida", desc: "Aplica a traves de nuestro socio de financiamiento. La mayoria de las decisiones regresan en minutos. La verificacion inicial es tipicamente una consulta suave de credito." },
      { num: "04", title: "El trabajo comienza", desc: "Una vez confirmado el financiamiento, programamos tu proyecto. Obtenes instalacion profesional ahora y pagos manejables que se ajustan a tu presupuesto." },
    ],
    whyTag: "Por Que Financiar",
    whyTitle: "Proteger Tu Hogar Es una Inversion",
    whyItems: [
      { title: "Preveni danos costosos ahora", desc: "Esperar en reparaciones de canaletas o sofito por preocupaciones de presupuesto deja que el dano por agua se acumule. Una instalacion de $3,000 financiada hoy previene una reparacion de cimientos de $10,000+ el proximo ano." },
      { title: "Pagos mensuales manejables", desc: "Distribuye el costo de tu proyecto en meses en lugar de pagar todo por adelantado. Manten tus ahorros intactos para emergencias mientras tu hogar obtiene la proteccion que necesita." },
      { title: "Sin diferencia de precio", desc: "Tu estimado es tu estimado. El financiamiento no agrega al costo del proyecto. Es simplemente un metodo de pago. Obtenes los mismos materiales, la misma cuadrilla, el mismo servicio Estandar de Oro." },
      { title: "Descuentos para personas mayores y militares disponibles", desc: "Ofrecemos descuentos adicionales para personas mayores y familias militares. Combina con financiamiento para el camino mas accesible para proteger tu hogar." },
    ],
    faqTag: "Preguntas Frecuentes",
    faqTitle: "Preguntas sobre Financiamiento",
    faqs: [
      { q: "Necesito credito perfecto para calificar?", a: "No. Nuestros socios de financiamiento trabajan con una variedad de perfiles crediticios. La mejor forma de saber para que calificas es aplicar. La verificacion inicial es tipicamente una consulta suave que no afecta tu puntaje de credito." },
      { q: "Cuanto tiempo toma la aprobacion?", a: "La mayoria de las decisiones de financiamiento regresan en minutos. Sabras antes de que termine tu cita de estimado si fuiste aprobado y cuales son tus terminos." },
      { q: "Hay opciones de 0% de interes?", a: "Periodos promocionales de 0% APR a veces estan disponibles dependiendo del socio de financiamiento y las ofertas actuales. Preguntanos sobre las promociones actuales cuando programes tu estimado." },
      { q: "Puedo pagar anticipadamente sin penalidades?", a: "La mayoria de nuestras opciones de financiamiento permiten pago anticipado sin penalidades por prepago. Confirmaremos los terminos especificos de tu plan antes de que firmes." },
      { q: "Cual es el tamano minimo de proyecto para financiamiento?", a: "El financiamiento esta disponible para la mayoria de los tamanos de proyecto. Ya sea una reparacion de canaletas o un reemplazo completo de sofito y fascia de toda la casa, podemos discutir opciones de pago que funcionen para tu presupuesto." },
      { q: "El financiamiento afecta el precio de mi estimado?", a: "No. El precio de tu proyecto es el mismo ya sea que pagues por adelantado o financies. El financiamiento es un metodo de pago. No cambia el alcance ni el costo del trabajo." },
    ],
    ctaTitle: "Listo Para Hablar de Financiamiento?",
    ctaP: "Llamanos y te guiamos por tus opciones. Sin obligacion, sin presion.",
  },
};

export default function FinancingPage() {
  const { lang } = useLanguage();
  const t = T[lang];

  return (
    <div style={{ background: "var(--jr-navy)", color: "var(--jr-paper)", minHeight: "100vh" }}>
      <a href="#main" className="jr-skip-link">Skip to content</a>
      <SiteNav />

      <main id="main">
        {/* HERO */}
        <section
          style={{
            padding: "var(--jr-space-16) var(--jr-space-6) var(--jr-space-10)",
            background: "linear-gradient(165deg, var(--jr-navy-deep) 0%, var(--jr-navy) 60%, var(--jr-navy-2) 100%)",
          }}
        >
          <Container size="narrow" style={{ textAlign: "center" }}>
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
                marginBottom: "var(--jr-space-4)",
                letterSpacing: "-0.5px",
              }}
            >
              {t.heroH1a}<br />
              {t.heroH1b}<span style={{ color: "#22C55E" }}>{t.heroH1bAccent}</span>
            </h1>
            <p
              style={{
                fontFamily: "var(--jr-font-body)",
                fontSize: "var(--jr-text-lg)",
                color: "var(--jr-cream-2)",
                lineHeight: 1.65,
                maxWidth: "640px",
                margin: "0 auto",
              }}
            >
              {t.heroP}
            </p>
          </Container>
        </section>

        {/* HOW IT WORKS */}
        <section style={{ background: "var(--jr-navy-deep)", padding: "var(--jr-space-20) 0" }}>
          <Container>
            <SectionHeading
              eyebrow={t.howEyebrow}
              title={t.howTitle}
              subtitle={t.howSub}
              theme="dark"
            />
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
                gap: "var(--jr-space-5)",
              }}
            >
              {t.steps.map((step) => (
                <ProcessStep key={step.num} num={step.num} title={step.title} desc={step.desc} />
              ))}
            </div>
          </Container>
        </section>

        {/* WHY FINANCE */}
        <section style={{ background: "var(--jr-navy)", padding: "var(--jr-space-20) 0" }}>
          <Container size="narrow">
            <SectionHeading
              eyebrow={t.whyTag}
              title={t.whyTitle}
              theme="dark"
            />
            <div>
              {t.whyItems.map((item, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    gap: "var(--jr-space-5)",
                    marginBottom: "var(--jr-space-8)",
                    alignItems: "flex-start",
                  }}
                >
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
                    <h3
                      style={{
                        fontFamily: "var(--jr-font-heading)",
                        fontSize: "var(--jr-text-lg)",
                        fontWeight: 700,
                        color: "var(--jr-paper)",
                        marginBottom: "var(--jr-space-2)",
                      }}
                    >
                      {item.title}
                    </h3>
                    <p
                      style={{
                        fontFamily: "var(--jr-font-body)",
                        fontSize: "var(--jr-text-md)",
                        color: "var(--jr-muted-on-dark)",
                        lineHeight: 1.65,
                      }}
                    >
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Container>
        </section>

        {/* FAQ */}
        <section style={{ background: "var(--jr-navy-deep)", padding: "var(--jr-space-20) 0" }}>
          <Container size="prose">
            <SectionHeading
              eyebrow={t.faqTag}
              title={t.faqTitle}
              theme="dark"
            />
            <FAQAccordion items={t.faqs} theme="dark" />
          </Container>
        </section>

        {/* CTA */}
        <CTABand title={t.ctaTitle} sub={t.ctaP} primaryHref="/contact" />
      </main>

      <SiteFooter />
      <MobileCTA />
    </div>
  );
}
