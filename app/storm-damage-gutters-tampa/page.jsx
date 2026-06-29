"use client";

/* ═══════════════════════════════════════════════════════════
   JR ONE ALUMINUM / STORM DAMAGE GUTTER REPAIR
   Bilingual EN+ES via useLanguage(). Hurricane-season landing.
   Brand-brain compliant: 6" + 7" only (no 5"), drainage scope
   locked to PVC + catch basins + grates + pop-up emitters,
   no em-dashes, no banned phrases.
   ═══════════════════════════════════════════════════════════ */

import { useLanguage } from "../../lib/LanguageContext";
import SiteNav from "../../components/SiteNav";
import SiteFooter from "../../components/SiteFooter";
import MobileCTA from "../../components/MobileCTA";
import Container from "../../components/ui/Container";
import Button from "../../components/ui/Button";
import SectionHeading from "../../components/ui/SectionHeading";
import CTABand from "../../components/ui/CTABand";
import FAQAccordion from "../../components/ui/FAQAccordion";
import { CheckCircleIcon, PhoneIcon } from "../../lib/icons";

const T = {
  en: {
    breadcrumb: "Home / Storm Damage Gutter Repair",
    heroTag: "HURRICANE SEASON SERVICE",
    heroH1: "Storm Damage Gutter Repair in Tampa,",
    heroH1Gold: "Fixed This Week.",
    heroP: "When a named storm or a routine summer thunderstorm rips your gutters off the fascia or buckles a downspout against the house, you do not have time to wait two weeks for a quote. JR One Aluminum is family-owned with over 30 years in the Tampa Bay gutter, soffit, and fascia trade. We dispatch at 7 AM out of 3420 W Cherry St in Tampa and book same-week post-storm replacements across Hillsborough, Pinellas, and Pasco counties.",
    btnCall: "(844) 444-3114",
    btnEstimate: "REQUEST SAME-WEEK ESTIMATE",
    statsEyebrow: "STORM SEASON BY THE NUMBERS",
    statsTitle: "What You Need to Know",
    stats: [
      { value: "51\"", label: "Annual rainfall in Tampa Bay" },
      { value: "Jun 1", label: "Hurricane season opens" },
      { value: "Same-week", label: "Post-storm install scheduling" },
      { value: "30+", label: "Years in the trade" },
    ],
    damageEyebrow: "WHAT WE REPLACE",
    damageTitle: "Five Patterns We Fix Every Storm Season",
    damages: [
      { title: "Gutters pulled off the fascia", desc: "Wind-driven rain and uplift pop hidden hangers or rip aluminum free of the fascia board. We re-pitch, re-hang on new hurricane-rated screw-in hangers, and seal every miter." },
      { title: "Buckled or detached downspouts", desc: "Falling palm fronds and wind-borne debris dent or detach downspouts. We replace the run with 3 x 4 rectangular downspout and re-secure the elbow to the gutter." },
      { title: "Fascia rot exposed by torn-off gutters", desc: "Once the gutter goes, the wood fascia behind it sees direct rain. We strip the rotted wood, install fresh fascia board, wrap it in factory-finished aluminum that matches the new gutters, and re-hang in one visit." },
      { title: "Soffit damage from wind-driven debris", desc: "Holes in vinyl or aluminum soffit let birds, bats, wasps, and water into the attic. We patch or fully replace soffit panels in color-matched vented aluminum." },
      { title: "Standing water at the foundation", desc: "Storm runoff that has nowhere to go pools at the slab. We pair gutter replacement with underground PVC drainage, catch basins, surface grates, and pop-up emitters. We do not install french drains or channel drains." },
    ],
    insuranceEyebrow: "INSURANCE CLAIM DOCUMENTATION",
    insuranceTitle: "What We Provide for Your Adjuster",
    insuranceP: "JR One Aluminum documents storm damage so your homeowner's claim approves cleanly. After the on-site walk-through we provide:",
    insuranceItems: [
      "Photographs of every damaged run, downspout, and section of fascia or soffit",
      "A written contractor estimate with line-item LF counts and material specs",
      "A condition report noting which sections are storm-related vs pre-existing wear",
      "Direct adjuster coordination when your carrier asks for a follow-up",
    ],
    insuranceFooter: "We do not handle the claim filing itself, that stays between you and your carrier, but we give the adjuster everything they ask for.",
    scopeEyebrow: "WHAT WE INSTALL",
    scopeTitle: "Locked Scope, No Surprises",
    scopeItems: [
      { title: "6\" and 7\" seamless aluminum gutters", desc: "We do not install 5\" in Florida. The 51 inches of annual rainfall needs the larger capacity. Copper and galvalume available in the same sizes." },
      { title: "3 x 4 rectangular downspouts", desc: "Default sizing for residential. Larger on demand when roof volume calls for it." },
      { title: "Hidden hangers, screw-in", desc: "Hurricane-rated fastening. No nails that pull out under wind load." },
      { title: "Underground PVC drainage", desc: "Schedule 40 PVC with catch basins, surface grates, pop-up emitters. No french drains, no channel drains, no buried aluminum downspouts." },
      { title: "Aluminum-wrapped fascia replacement", desc: "Kills the rot cycle permanently because there is no wood exposed to the weather." },
      { title: "Vented aluminum soffit", desc: "Color-matched so the entire roof edge reads as one finished system." },
    ],
    areaEyebrow: "WHERE WE RESPOND",
    areaTitle: "Storm Response Across Tampa Bay",
    areaP: "Same-week post-storm scheduling across Hillsborough, Pinellas, and Pasco counties. Cities served: Tampa, St. Petersburg, Clearwater, Brandon, Riverview, Wesley Chapel, Lutz, Land O' Lakes, New Tampa, Valrico, Lithia, Plant City, Temple Terrace, Oldsmar, Safety Harbor, Dunedin, Palm Harbor, Tarpon Springs, Largo, Seminole, Pinellas Park. Mon-Sat 7 AM to 6 PM.",
    midCTATitle: "STORM SEASON RUNS JUNE THROUGH NOVEMBER",
    midCTASub: "Book the post-storm estimate now. Same-week install when material is in stock.",
    faqEyebrow: "STORM DAMAGE FAQ",
    faqTitle: "Frequently Asked Questions",
    faqs: [
      { q: "Will my homeowner's insurance cover storm-damaged gutters?", a: "Most Florida homeowner policies cover storm damage to gutters, fascia, soffit, and downspouts when the damage is from a named storm or a documented severe weather event. Coverage depends on your specific policy, your deductible, and the cause of damage. We document the damage so your adjuster has what they need to evaluate the claim." },
      { q: "How fast can you replace the gutters after a hurricane?", a: "We book same-week installs during storm season. Material is in stock at the Tampa shop. Most single-family installs are done in one day. After a major named storm we triage by severity, homes with active water intrusion at the foundation jump the line." },
      { q: "Do you install hurricane-rated fasteners?", a: "Yes. All JR One installs use hidden screw-in hangers spaced for hurricane wind load. We do not use nail-in hangers because they pull out under uplift." },
      { q: "Can you wrap the fascia in aluminum to prevent the next round of rot?", a: "Yes. We replace the rotted fascia board, prime it, wrap it in factory-finished aluminum that matches the new gutters, and re-hang. The aluminum wrap stops the rot cycle permanently because there is no wood exposed to the weather." },
      { q: "Do you do storm-damage roof work too?", a: "No. JR One Aluminum is a specialty gutter, soffit, fascia, and drainage trade. For storm-damaged roofs we refer to vetted Tampa Bay roofers." },
      { q: "What does post-storm install cost?", a: "Pricing depends on linear footage, downspout count, fascia and soffit damage extent, gutter size (6\" or 7\"), color, and access. We measure on-site, photograph the damage, and quote in person. The estimate is free." },
    ],
    relatedEyebrow: "RELATED SERVICES",
    relatedTitle: "More From JR One Aluminum",
    related: [
      { title: "Seamless aluminum gutters (6\" and 7\")", href: "/seamless-aluminum-gutters" },
      { title: "Soffit and fascia replacement", href: "/soffit-and-fascia" },
      { title: "Underground PVC drainage", href: "/drainage-assessment" },
      { title: "Gutter repair (non-storm)", href: "/gutter-repair" },
    ],
    finalCTATitle: "SAME-WEEK POST-STORM ESTIMATE",
    finalCTASub: "Call (844) 444-3114 or fill out the contact form. Christopher Rivera or a JR One field estimator answers. On-property within 48 hours, photos taken, bid written in person, material scheduled same day.",
  },
  es: {
    breadcrumb: "Inicio / Reparacion de Canaletas por Tormenta",
    heroTag: "SERVICIO DE TEMPORADA DE HURACANES",
    heroH1: "Reparacion de Canaletas Danadas por Tormenta en Tampa,",
    heroH1Gold: "Misma Semana.",
    heroP: "Cuando una tormenta con nombre o una tormenta de verano arranca sus canaletas del fascia o dobla un bajante contra la casa, usted no tiene tiempo para esperar dos semanas por un estimado. JR One Aluminum es familia, mas de 30 anos en el oficio de canaletas, sofito y fascia en Tampa Bay. Despachamos a las 7 AM desde 3420 W Cherry St en Tampa y reservamos reemplazos post-tormenta misma semana en Hillsborough, Pinellas y Pasco.",
    btnCall: "(844) 444-3114",
    btnEstimate: "PEDIR ESTIMADO MISMA SEMANA",
    statsEyebrow: "LA TEMPORADA EN NUMEROS",
    statsTitle: "Lo Que Necesita Saber",
    stats: [
      { value: "51\"", label: "Lluvia anual en Tampa Bay" },
      { value: "1 Jun", label: "Inicia la temporada de huracanes" },
      { value: "Misma semana", label: "Programacion post-tormenta" },
      { value: "Mas de 30", label: "Anos en el oficio" },
    ],
    damageEyebrow: "LO QUE REEMPLAZAMOS",
    damageTitle: "Cinco Patrones Que Reparamos Cada Temporada",
    damages: [
      { title: "Canaletas arrancadas del fascia", desc: "La lluvia con viento y la fuerza ascendente revientan los ganchos ocultos o arrancan el aluminio del fascia. Reajustamos la pendiente, re-instalamos con ganchos atornillados resistentes a huracan, y sellamos cada esquina." },
      { title: "Bajantes doblados o desprendidos", desc: "Las ramas de palma que caen y los escombros con viento abollan o desprenden los bajantes. Reemplazamos el tramo con bajante rectangular 3 x 4 y re-aseguramos el codo." },
      { title: "Fascia podrida por canaleta arrancada", desc: "Cuando se va la canaleta, la madera del fascia recibe lluvia directa. Removemos la madera podrida, instalamos tablero nuevo, lo envolvemos en aluminio con acabado de fabrica del color de la canaleta nueva, y re-instalamos en una sola visita." },
      { title: "Sofito danado por escombros con viento", desc: "Huecos en el sofito de vinilo o aluminio dejan entrar pajaros, murcielagos, avispas y agua al atico. Parchamos o reemplazamos paneles de sofito en aluminio ventilado del color." },
      { title: "Agua estancada en los cimientos", desc: "El agua que no tiene a donde ir se estanca en la losa. Combinamos el reemplazo de canaletas con drenaje subterraneo en PVC, cajas de captacion, rejillas y emisores pop-up. No instalamos drenes franceses ni drenes de canal." },
    ],
    insuranceEyebrow: "DOCUMENTACION PARA SU SEGURO",
    insuranceTitle: "Lo Que Damos para su Ajustador",
    insuranceP: "JR One Aluminum documenta el dano de tormenta para que su reclamo de seguro se apruebe limpiamente. Despues del recorrido entregamos:",
    insuranceItems: [
      "Fotografias de cada tramo danado, bajante y seccion de fascia o sofito",
      "Un estimado escrito con conteos de pies lineales y especificaciones de material",
      "Un reporte de condicion notando que secciones son de la tormenta vs desgaste previo",
      "Coordinacion directa con el ajustador cuando la aseguradora pide seguimiento",
    ],
    insuranceFooter: "No manejamos el reclamo en si, eso queda entre usted y su aseguradora, pero le damos al ajustador todo lo que pide.",
    scopeEyebrow: "LO QUE INSTALAMOS",
    scopeTitle: "Alcance Definido, Sin Sorpresas",
    scopeItems: [
      { title: "Canaletas continuas de 6\" y 7\" en aluminio", desc: "No instalamos 5\" en Florida. Las 51 pulgadas de lluvia anual necesitan mayor capacidad. Cobre y galvalume disponibles en los mismos tamanos." },
      { title: "Bajantes rectangulares 3 x 4", desc: "Tamano por defecto residencial. Mas grandes a pedido cuando el volumen del techo lo requiere." },
      { title: "Ganchos ocultos, atornillados", desc: "Sujecion resistente a huracan. No usamos clavos que se zafan bajo presion de viento." },
      { title: "Drenaje subterraneo en PVC", desc: "PVC cedula 40 con cajas de captacion, rejillas y emisores pop-up. No drenes franceses, no drenes de canal." },
      { title: "Fascia reemplazado y envuelto en aluminio", desc: "Detiene el ciclo de pudricion permanentemente porque no hay madera expuesta al clima." },
      { title: "Sofito de aluminio ventilado", desc: "Del mismo color que canaletas y fascia, para que el borde del techo se vea como un solo sistema terminado." },
    ],
    areaEyebrow: "DONDE RESPONDEMOS",
    areaTitle: "Respuesta Post-Tormenta en Todo Tampa Bay",
    areaP: "Programacion misma semana post-tormenta en Hillsborough, Pinellas y Pasco. Ciudades: Tampa, St. Petersburg, Clearwater, Brandon, Riverview, Wesley Chapel, Lutz, Land O' Lakes, New Tampa, Valrico, Lithia, Plant City, Temple Terrace, Oldsmar, Safety Harbor, Dunedin, Palm Harbor, Tarpon Springs, Largo, Seminole, Pinellas Park. Lunes a sabado, 7 AM a 6 PM.",
    midCTATitle: "LA TEMPORADA ES JUNIO A NOVIEMBRE",
    midCTASub: "Reserve el estimado post-tormenta ahora. Instalacion misma semana cuando hay material en stock.",
    faqEyebrow: "PREGUNTAS FRECUENTES",
    faqTitle: "Dano de Tormenta",
    faqs: [
      { q: "Mi seguro de hogar cubre canaletas danadas por tormenta?", a: "La mayoria de polizas de hogar en Florida cubren dano de tormenta a canaletas, fascia, sofito y bajantes cuando el dano viene de una tormenta con nombre o un evento de clima severo documentado. La cobertura depende de su poliza, su deducible y la causa del dano. Documentamos el dano para que su ajustador tenga lo que necesita." },
      { q: "Que tan rapido pueden reemplazar las canaletas despues de un huracan?", a: "Reservamos instalaciones misma semana durante la temporada de tormentas. Hay material en stock en el taller de Tampa. La mayoria de instalaciones residenciales se hacen en un dia. Despues de una tormenta con nombre priorizamos por severidad." },
      { q: "Instalan ganchos resistentes a huracan?", a: "Si. Toda instalacion de JR One usa ganchos ocultos atornillados espaciados para carga de viento de huracan. No usamos ganchos de clavo porque se zafan bajo fuerza ascendente." },
      { q: "Pueden envolver el fascia en aluminio para evitar la proxima pudricion?", a: "Si. Reemplazamos el tablero de fascia podrido, lo imprimamos, lo envolvemos en aluminio con acabado de fabrica del color de las canaletas nuevas, y re-instalamos. El envoltorio de aluminio detiene el ciclo de pudricion permanentemente." },
      { q: "Tambien hacen trabajo de techo por dano de tormenta?", a: "No. JR One Aluminum es oficio especializado en canaletas, sofito, fascia y drenaje. Para techos danados por tormenta referimos a techadores confiables." },
      { q: "Cuanto cuesta una instalacion post-tormenta?", a: "El precio depende de pies lineales, conteo de bajantes, extension del dano a fascia y sofito, tamano de canaleta (6 o 7 pulgadas), color y acceso. Medimos en sitio, fotografiamos el dano y damos el precio en persona. El estimado es gratis." },
    ],
    relatedEyebrow: "SERVICIOS RELACIONADOS",
    relatedTitle: "Mas de JR One Aluminum",
    related: [
      { title: "Canaletas continuas (6\" y 7\")", href: "/es/canaletas-sin-costura-tampa" },
      { title: "Sofito y fascia", href: "/es/sofito-fascia-tampa" },
      { title: "Drenaje subterraneo en PVC", href: "/drainage-assessment" },
      { title: "Reparacion de canaletas (no-tormenta)", href: "/es/reparacion-canaletas-tampa" },
    ],
    finalCTATitle: "ESTIMADO MISMA SEMANA POST-TORMENTA",
    finalCTASub: "Llame al (844) 444-3114 o llene el formulario. Christopher Rivera o un estimador de JR One contesta. En su propiedad dentro de 48 horas, fotos tomadas, cotizacion en persona, material programado el mismo dia. Hablamos espanol.",
  },
};

export default function StormDamagePage() {
  const { lang } = useLanguage();
  const t = T[lang === "es" ? "es" : "en"];

  return (
    <>
      <SiteNav />

      {/* Hero — LCP-optimized 2026-05-26 per audit Tier 1.5 fix.
          Was: CSS background-image with gradient overlay. The CSS image was not */}
      {/* an explicit LCP candidate so browser preload + fetchPriority hints had */}
      {/* limited effect (LCP 7.2s on Lighthouse 2026-05-24). Replaced with an */}
      {/* explicit <img> element so the browser elects it as the LCP candidate */}
      {/* immediately, plus a separate absolute-positioned gradient overlay div. */}
      <section style={{
        position: "relative",
        overflow: "hidden",
        color: "var(--jr-paper)",
        padding: "var(--jr-space-20) 0 var(--jr-space-12)",
      }}>
        <img
          src="/images/storm-damage-hero.webp"
          alt=""
          width={1920}
          height={1080}
          fetchPriority="high"
          decoding="async"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            zIndex: 0,
          }}
        />
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(rgba(11, 22, 51, 0.78), rgba(11, 22, 51, 0.88))",
            zIndex: 1,
          }}
        />
        <Container style={{ position: "relative", zIndex: 2 }}>
          <nav style={{ fontFamily: "var(--jr-font-heading)", fontSize: 12, opacity: 0.7, letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 16 }}>
            {t.breadcrumb}
          </nav>
          <div style={{ fontFamily: "var(--jr-font-heading)", fontSize: 12, color: "var(--jr-gold)", letterSpacing: 3, fontWeight: 700, textTransform: "uppercase", marginBottom: 20 }}>
            {t.heroTag}
          </div>
          <h1 style={{ fontFamily: "var(--jr-font-heading)", fontSize: "clamp(36px, 6vw, 56px)", lineHeight: 1.1, fontWeight: 700, marginBottom: 16 }}>
            {t.heroH1} <span style={{ color: "var(--jr-gold)" }}>{t.heroH1Gold}</span>
          </h1>
          <p style={{ fontFamily: "var(--jr-font-body)", fontSize: 18, lineHeight: 1.65, maxWidth: 720, marginBottom: 32, color: "var(--jr-muted-on-dark)" }}>{t.heroP}</p>
          <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
            <Button href="tel:8444443114" variant="primary" size="lg" iconLeft={<PhoneIcon size={18} />}>Call {t.btnCall}</Button>
            <Button href="/contact" variant="outline" size="lg" iconRight>{t.btnEstimate}</Button>
          </div>
        </Container>
      </section>

      {/* Stats */}
      <section style={{ background: "var(--jr-navy)", color: "var(--jr-paper)", padding: "var(--jr-space-12) 0", borderTop: "var(--jr-hair-darker)" }}>
        <Container>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 32, textAlign: "center" }}>
            {t.stats.map((s, i) => (
              <div key={i}>
                <div style={{ fontFamily: "var(--jr-font-heading)", fontSize: 40, fontWeight: 700, color: "var(--jr-gold)" }}>{s.value}</div>
                <div style={{ fontFamily: "var(--jr-font-heading)", fontSize: 12, letterSpacing: 1.5, textTransform: "uppercase", color: "var(--jr-muted-on-dark)", marginTop: 8 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Damage patterns */}
      <section style={{ background: "var(--jr-paper)", padding: "var(--jr-space-20) 0" }}>
        <Container>
          <SectionHeading eyebrow={t.damageEyebrow} title={t.damageTitle} theme="light" />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 24 }}>
            {t.damages.map((d, i) => (
              <div key={i} style={{ background: "#FFFFFF", padding: 28, border: "1px solid rgba(27,42,74,0.08)", borderTop: "3px solid var(--jr-gold)", borderRadius: "var(--jr-radius-md)" }}>
                <h3 style={{ fontFamily: "var(--jr-font-heading)", fontSize: 18, fontWeight: 700, color: "var(--jr-navy)", marginBottom: 12 }}>{d.title}</h3>
                <p style={{ fontFamily: "var(--jr-font-body)", fontSize: 15, lineHeight: 1.6, color: "var(--jr-ink)" }}>{d.desc}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Mid-page CTA band */}
      <CTABand title={t.midCTATitle} sub={t.midCTASub} />

      {/* Insurance docs */}
      <section style={{ background: "#FFFFFF", padding: "var(--jr-space-20) 0" }}>
        <Container size="narrow">
          <SectionHeading eyebrow={t.insuranceEyebrow} title={t.insuranceTitle} theme="light" align="left" />
          <p style={{ fontFamily: "var(--jr-font-body)", fontSize: 17, lineHeight: 1.65, color: "var(--jr-ink)", marginBottom: 24 }}>{t.insuranceP}</p>
          <ul style={{ listStyle: "none", padding: 0, marginBottom: 24 }}>
            {t.insuranceItems.map((item, i) => (
              <li key={i} style={{ display: "flex", gap: 12, padding: "12px 0", borderBottom: "1px solid rgba(27,42,74,0.08)", fontFamily: "var(--jr-font-body)", fontSize: 16, color: "var(--jr-ink)" }}>
                <CheckCircleIcon size={20} style={{ flexShrink: 0, color: "var(--jr-gold)" }} /> {item}
              </li>
            ))}
          </ul>
          <p style={{ fontFamily: "var(--jr-font-body)", fontSize: 15, lineHeight: 1.6, color: "var(--jr-muted-on-light)", fontStyle: "italic" }}>{t.insuranceFooter}</p>
        </Container>
      </section>

      {/* Scope */}
      <section style={{ background: "var(--jr-paper)", padding: "var(--jr-space-20) 0" }}>
        <Container>
          <SectionHeading eyebrow={t.scopeEyebrow} title={t.scopeTitle} theme="light" />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 20 }}>
            {t.scopeItems.map((s, i) => (
              <div key={i} style={{ background: "#FFFFFF", padding: 24, borderRadius: "var(--jr-radius-md)" }}>
                <h4 style={{ fontFamily: "var(--jr-font-heading)", fontSize: 16, fontWeight: 700, color: "var(--jr-navy)", marginBottom: 10 }}>{s.title}</h4>
                <p style={{ fontFamily: "var(--jr-font-body)", fontSize: 14, lineHeight: 1.55, color: "var(--jr-ink)" }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Area served */}
      <section style={{ background: "var(--jr-navy)", color: "var(--jr-paper)", padding: "var(--jr-space-16) 0" }}>
        <Container size="narrow">
          <SectionHeading eyebrow={t.areaEyebrow} title={t.areaTitle} theme="dark" align="left" />
          <p style={{ fontFamily: "var(--jr-font-body)", fontSize: 17, lineHeight: 1.7, color: "var(--jr-muted-on-dark)" }}>{t.areaP}</p>
        </Container>
      </section>

      {/* FAQ */}
      <section style={{ background: "#FFFFFF", padding: "var(--jr-space-20) 0" }}>
        <Container size="narrow">
          <SectionHeading eyebrow={t.faqEyebrow} title={t.faqTitle} theme="light" />
          <FAQAccordion items={t.faqs} theme="light" />
        </Container>
      </section>

      {/* Related */}
      <section style={{ background: "var(--jr-paper)", padding: "var(--jr-space-16) 0" }}>
        <Container>
          <SectionHeading eyebrow={t.relatedEyebrow} title={t.relatedTitle} theme="light" />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 16 }}>
            {t.related.map((r, i) => (
              <a key={i} href={r.href} style={{ background: "#FFFFFF", padding: 20, border: "1px solid rgba(27,42,74,0.08)", borderRadius: "var(--jr-radius-md)", textDecoration: "none", color: "var(--jr-navy)", fontFamily: "var(--jr-font-heading)", fontWeight: 600, fontSize: 15 }}>
                {r.title} →
              </a>
            ))}
          </div>
        </Container>
      </section>

      {/* Final CTA */}
      <CTABand title={t.finalCTATitle} sub={t.finalCTASub} primaryLabel={t.btnEstimate} />

      <SiteFooter />
      <MobileCTA />
    </>
  );
}
