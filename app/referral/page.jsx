"use client";

/* ═══════════════════════════════════════════════════════════
   JR ONE ALUMINUM: REFERRAL PROGRAM
   Brand-brain compliant. Tokens via app/tokens.css.
   ═══════════════════════════════════════════════════════════ */

import SiteNav from "../../components/SiteNav";
import SiteFooter from "../../components/SiteFooter";
import MobileCTA from "../../components/MobileCTA";
import Container from "../../components/ui/Container";
import Button from "../../components/ui/Button";
import SectionHeading from "../../components/ui/SectionHeading";
import ProcessStep from "../../components/ui/ProcessStep";
import FAQAccordion from "../../components/ui/FAQAccordion";
import CTABand from "../../components/ui/CTABand";
import { useLanguage } from "../../lib/LanguageContext";
import {
  HouseIcon,
  ShieldIcon,
  WrenchIcon,
  HardHatIcon,
  RoofEdgeIcon,
  FamilyIcon,
  CheckIcon,
  GiftIcon,
  PercentIcon,
  CardIcon,
  MailIcon,
  PhoneIcon,
} from "../../lib/icons";

const T = {
  en: {
    breadcrumbHome: "Home",
    breadcrumbReferral: "Referral Program",
    heroTag: "REFERRAL PROGRAM",
    heroH1: "Send Us a Customer.",
    heroH1Gold: "Earn a Reward.",
    heroP: "Whether you're a homeowner who loved our work, an insurance agent helping clients with aging roofs, a roofer who needs an aluminum partner, or a real estate agent preparing homes for sale: when your referral becomes a customer, you get paid. Simple.",
    referNowBtn: "REFER SOMEONE NOW",
    emailReferralBtn: "EMAIL A REFERRAL",
    stats: [
      { icon: "gift", value: "$80", label: "Gift card for every qualifying referral" },
      { icon: "percent", value: "10%", label: "Off next service for referred customers" },
      { icon: "card", value: "$880", label: "Minimum project value to qualify" },
      { icon: "check", value: "ALL", label: "Services qualify, gutters, soffit, fascia, Peak 301" },
    ],
    howTag: "HOW IT WORKS",
    howTitle: "4 Steps. That's It.",
    howSteps: [
      { num: "01", title: "Refer", desc: "Send us a customer by phone, email, or through our website. Give us their name and contact info, and let them know you're referring them to JR One. That's it." },
      { num: "02", title: "We Serve", desc: "We handle everything from there. Your referral gets a professional consultation, transparent pricing, and the same quality service that earned your trust in the first place." },
      { num: "03", title: "They Sign", desc: "When your referral signs a contract and provides a deposit on a qualifying project ($880 minimum), your reward is triggered. No fine print, no waiting months." },
      { num: "04", title: "You Earn", desc: "You receive an $80 gift card. Your referral receives 10% off their next service with us, creating a built-in reason for them to come back." },
    ],
    whoTag: "WHO CAN REFER",
    whoTitle: "Everyone Earns",
    whoCards: [
      { icon: "house", title: "Homeowners", desc: "Had work done with us? Love the results? Tell your neighbors, friends, and family. Every qualifying referral earns you an $80 gift card, and they get 10% off their next service with us." },
      { icon: "shield", title: "Insurance Agents", desc: "Have clients facing non-renewal notices over roof age? Peak 301 roof rejuvenation is a legitimate, legally-backed alternative to full replacement. Refer your client to us, help them keep their coverage, and earn $80 per qualifying referral. We handle the treatment and inspector certification coordination, your client gets the documentation their carrier needs." },
      { icon: "wrench", title: "Roofers & General Contractors", desc: "You do roofs, we do gutters, soffit, fascia, and Peak 301. Instead of subcontracting aluminum work to someone you can't vouch for, refer your clients to a specialty trade. We make you look good, and you earn $80 per qualifying job." },
      { icon: "edge", title: "Real Estate Agents", desc: "Preparing a home for sale? Curb appeal matters. Aging gutters, damaged soffit, worn fascia: these are the details buyers notice. Refer your sellers to us for the exterior work that closes deals, and earn $80 per qualifying project." },
      { icon: "hardhat", title: "Property Managers", desc: "Managing multiple properties with ongoing exterior maintenance needs? One referral per property, every time there's qualifying work. The $80 adds up fast when you're managing a portfolio." },
      { icon: "family", title: "Anyone", desc: "You don't need a title or a business to refer. If you know someone who needs gutters, soffit, fascia, or roof rejuvenation in Tampa Bay, send them our way. If the project qualifies, you earn." },
    ],
    insTag: "FOR INSURANCE AGENTS",
    insTitle: "Your Clients Are Panicking About Roof Age.",
    insTitleGold: "Give Them a Real Option.",
    insDesc: "When your client gets a non-renewal notice because their roof is 15+ years old, they have two choices: spend $15,000 to $25,000 on a full replacement, or explore roof rejuvenation. Peak 301 treatment is a single-day application that runs up to 70% less than a $15,000 to $25,000 replacement, restores shingle flexibility, and comes with warranty documentation and a Remaining Useful Life certification that Florida law requires carriers to accept.",
    insBenefits: [
      "Your client keeps their coverage without a $20K roof replacement",
      "You retain the client instead of losing them to a carrier that won't write older roofs",
      "You earn $80 per qualifying referral, with no cap",
      "We handle everything: assessment, treatment, inspector coordination, documentation",
      "We provide your client with a complete insurance toolkit including letter templates and rights summaries",
      "Bilingual service. We serve English and Spanish speaking homeowners",
    ],
    insBtn: "BECOME A REFERRAL PARTNER",
    svcTag: "QUALIFYING SERVICES",
    svcTitle: "What Counts",
    svcP: "Any of these services with a minimum project value of $880 qualifies for the referral program.",
    qualifiesLabel: "QUALIFIES",
    services: [
      { name: "Seamless Gutters", desc: '6" and 7" seamless aluminum gutter installation' },
      { name: "Gutter Guards", desc: "Micro mesh and screen gutter protection systems" },
      { name: "Gutter Repair", desc: "Realignment, resealing, downspout repair, and replacement" },
      { name: "Soffit Replacement", desc: "Aluminum soffit panel installation and wood repair" },
      { name: "Fascia Replacement", desc: "Aluminum fascia wrap and wood substrate repair" },
      { name: "Peak 301 Roof Rejuvenation", desc: "Soy-based shingle rejuvenation with warranty documentation" },
      { name: "Siding", desc: "Aluminum siding installation and replacement" },
      { name: "Copper Work", desc: "Custom copper gutter and accent installations" },
      { name: "Govee Lights", desc: "Professional LED lighting installation" },
      { name: "Maintenance Plans", desc: "Recurring gutter cleaning and maintenance" },
    ],
    faqTag: "FAQ",
    faqTitle: "Referral Program Questions",
    faqs: [
      { q: "How do I submit a referral?", a: "Call us at (844) 444-3114 and let us know you're referring someone, or email info@jronegutters.com with the referral's name and contact info. You can also have your referral mention your name when they contact us. We track every referral by name." },
      { q: "When do I get paid?", a: "Your $80 gift card is issued once your referral signs a contract and provides a deposit or first payment on a qualifying project. We don't make you wait until the project is completed. Once the commitment is made, your reward is earned." },
      { q: "What counts as a qualifying project?", a: "Any JR One service with a minimum project value of $880. This includes gutters, guards, soffit, fascia, siding, copper work, Peak 301 roof rejuvenation, Govee lights, and maintenance plans that meet the minimum." },
      { q: "Is there a limit to how many referrals I can send?", a: "No cap. Send one, send fifty. Every qualifying referral earns an $80 gift card. If you're an insurance agent or contractor sending multiple referrals per month, contact us to discuss a partnership tier." },
      { q: "What does the referred customer get?", a: "The person you refer receives 10% off their next service with us. This discount applies to any future qualifying project, not the initial one. It's designed to bring them back as a repeat customer." },
      { q: "Can I refer someone for Peak 301 specifically?", a: "Yes. Peak 301 roof rejuvenation is one of our qualifying services. If you're an insurance agent, this is the most common referral scenario: a homeowner facing insurance pressure over roof age who needs an alternative to full replacement." },
      { q: "Do both parties need to be in your service area?", a: "The referred customer needs to be in our service area (Ruskin north through Tampa, St. Pete, Clearwater, and New Port Richey). You can be located anywhere." },
      { q: "Is the program available in Spanish?", a: "Yes. Our referral program works the same in Spanish. Call us at (844) 444-3114 or email info@jronegutters.com. We are a bilingual company. We serve clients in English and Spanish." },
    ],
    ctaTitle: "Start Referring Today",
    ctaSub: "One phone call. One name. That's all it takes to earn $80 and help someone protect their home.",
    ctaCallBtn: "CALL (844) 444-3114",
    ctaEmailBtn: "EMAIL US",
    ctaFootnote: "Programa disponible en español. Llámenos, somos bilingües.",
  },
  es: {
    breadcrumbHome: "Inicio",
    breadcrumbReferral: "Programa de Referidos",
    heroTag: "PROGRAMA DE REFERIDOS",
    heroH1: "Envianos un Cliente.",
    heroH1Gold: "Gana una Recompensa.",
    heroP: "Ya seas un propietario que le encanto nuestro trabajo, un agente de seguros ayudando a clientes con techos viejos, un techador que necesita un socio de aluminio, o un agente de bienes raices preparando casas para la venta: cuando tu referido se convierte en cliente, te pagamos. Asi de simple.",
    referNowBtn: "REFIERE A ALGUIEN AHORA",
    emailReferralBtn: "ENVIA UN REFERIDO POR CORREO",
    stats: [
      { icon: "gift", value: "$80", label: "Tarjeta de regalo por cada referido que califique" },
      { icon: "percent", value: "10%", label: "De descuento en el proximo servicio para clientes referidos" },
      { icon: "card", value: "$880", label: "Valor minimo del proyecto para calificar" },
      { icon: "check", value: "TODOS", label: "Los servicios califican: canaletas, sofito, fascia, Peak 301" },
    ],
    howTag: "COMO FUNCIONA",
    howTitle: "4 Pasos. Eso Es Todo.",
    howSteps: [
      { num: "01", title: "Refiere", desc: "Envianos un cliente por telefono, correo electronico o a traves de nuestro sitio web. Danos su nombre e informacion de contacto, y hazle saber que nos los estas refiriendo. Eso es todo." },
      { num: "02", title: "Servimos", desc: "Nos encargamos de todo desde ahi. Tu referido recibe una consulta profesional, precios transparentes y el mismo servicio de calidad que gano tu confianza." },
      { num: "03", title: "Firman", desc: "Cuando tu referido firma un contrato y proporciona un deposito en un proyecto que califique ($880 minimo), tu recompensa se activa. Sin letra pequena, sin esperar meses." },
      { num: "04", title: "Ganas", desc: "Recibes una tarjeta de regalo de $80. Tu referido recibe 10% de descuento en su proximo servicio con nosotros, creando una razon para que regresen." },
    ],
    whoTag: "QUIEN PUEDE REFERIR",
    whoTitle: "Todos Ganan",
    whoCards: [
      { icon: "house", title: "Propietarios", desc: "Te hicimos un trabajo? Te encantaron los resultados? Cuentale a tus vecinos, amigos y familia. Cada referido que califique te gana una tarjeta de regalo de $80, y ellos obtienen 10% de descuento en su proximo servicio." },
      { icon: "shield", title: "Agentes de Seguros", desc: "Tienes clientes enfrentando avisos de no-renovacion por la edad del techo? El rejuvenecimiento de techo Peak 301 es una alternativa legitima y respaldada legalmente al reemplazo completo. Refiere a tu cliente, ayudale a mantener su cobertura y gana $80 por cada referido que califique. Nosotros manejamos el tratamiento y la coordinacion de certificacion del inspector." },
      { icon: "wrench", title: "Techadores y Contratistas Generales", desc: "Tu haces techos, nosotros hacemos canaletas, sofito, fascia y Peak 301. En vez de subcontratar trabajo de aluminio a alguien que no puedes garantizar, refiere a tus clientes a un oficio especializado. Te hacemos ver bien, y ganas $80 por cada trabajo que califique." },
      { icon: "edge", title: "Agentes de Bienes Raices", desc: "Preparando una casa para la venta? La apariencia exterior importa. Canaletas viejas, sofito danado, fascia desgastada: estos son los detalles que los compradores notan. Refiere a tus vendedores para el trabajo exterior que cierra tratos, y gana $80 por cada proyecto que califique." },
      { icon: "hardhat", title: "Administradores de Propiedades", desc: "Administrando multiples propiedades con necesidades de mantenimiento exterior continuas? Un referido por propiedad, cada vez que haya trabajo que califique. Los $80 se acumulan rapido cuando administras un portafolio." },
      { icon: "family", title: "Cualquier Persona", desc: "No necesitas un titulo o un negocio para referir. Si conoces a alguien que necesite canaletas, sofito, fascia o rejuvenecimiento de techo en Tampa Bay, envialos con nosotros. Si el proyecto califica, ganas." },
    ],
    insTag: "PARA AGENTES DE SEGUROS",
    insTitle: "Tus Clientes Estan en Panico por la Edad del Techo.",
    insTitleGold: "Dales una Opcion Real.",
    insDesc: "Cuando tu cliente recibe un aviso de no-renovacion porque su techo tiene mas de 15 anos, tiene dos opciones: gastar $15,000 a $25,000 en un reemplazo completo, o explorar el rejuvenecimiento de techo. El tratamiento Peak 301 es una aplicacion de un solo dia que cuesta hasta 70% menos que un reemplazo de $15,000 a $25,000, restaura la flexibilidad de las tejas y viene con documentacion de garantia y una certificacion de Vida Util Remanente que la ley de Florida requiere que las aseguradoras acepten.",
    insBenefits: [
      "Tu cliente mantiene su cobertura sin un reemplazo de techo de $20K",
      "Retienes al cliente en vez de perderlo ante una aseguradora que no asegura techos viejos",
      "Ganas $80 por cada referido que califique, sin limite",
      "Nosotros manejamos todo: evaluacion, tratamiento, coordinacion con inspector, documentacion",
      "Proporcionamos a tu cliente un kit completo de seguros incluyendo plantillas de cartas y resumen de derechos",
      "Servicio bilingue. Atendemos a propietarios que hablan ingles y espanol",
    ],
    insBtn: "CONVIERTETE EN SOCIO DE REFERIDOS",
    svcTag: "SERVICIOS QUE CALIFICAN",
    svcTitle: "Que Cuenta",
    svcP: "Cualquiera de estos servicios con un valor minimo de proyecto de $880 califica para el programa de referidos.",
    qualifiesLabel: "CALIFICA",
    services: [
      { name: "Canaletas Sin Costura", desc: 'Instalacion de canaletas de aluminio sin costura de 6" y 7"' },
      { name: "Protectores de Canaletas", desc: "Sistemas de proteccion de canaletas de micro malla y malla" },
      { name: "Reparacion de Canaletas", desc: "Realineacion, resellado, reparacion de bajantes y reemplazo" },
      { name: "Reemplazo de Sofito", desc: "Instalacion de paneles de sofito de aluminio y reparacion de madera" },
      { name: "Reemplazo de Fascia", desc: "Envoltura de fascia de aluminio y reparacion de sustrato de madera" },
      { name: "Peak 301 Rejuvenecimiento de Techo", desc: "Rejuvenecimiento de tejas a base de soya con documentacion de garantia" },
      { name: "Revestimiento", desc: "Instalacion y reemplazo de revestimiento de aluminio" },
      { name: "Trabajo en Cobre", desc: "Instalaciones personalizadas de canaletas y acentos de cobre" },
      { name: "Luces Govee", desc: "Instalacion profesional de iluminacion LED" },
      { name: "Planes de Mantenimiento", desc: "Limpieza y mantenimiento recurrente de canaletas" },
    ],
    faqTag: "PREGUNTAS FRECUENTES",
    faqTitle: "Preguntas del Programa de Referidos",
    faqs: [
      { q: "Como envio un referido?", a: "Llamanos al (844) 444-3114 y dinos que estas refiriendo a alguien, o envia un correo a info@jronegutters.com con el nombre y la informacion de contacto del referido. Tambien puedes hacer que tu referido mencione tu nombre cuando nos contacte. Rastreamos cada referido por nombre." },
      { q: "Cuando me pagan?", a: "Tu tarjeta de regalo de $80 se emite una vez que tu referido firma un contrato y proporciona un deposito o primer pago en un proyecto que califique. No te hacemos esperar hasta que el proyecto se complete. Una vez que se hace el compromiso, tu recompensa esta ganada." },
      { q: "Que cuenta como proyecto que califica?", a: "Cualquier servicio de JR One con un valor minimo de proyecto de $880. Esto incluye canaletas, protectores, sofito, fascia, revestimiento, trabajo en cobre, rejuvenecimiento de techo Peak 301, luces Govee y planes de mantenimiento que cumplan el minimo." },
      { q: "Hay un limite de cuantos referidos puedo enviar?", a: "Sin limite. Envia uno, envia cincuenta. Cada referido que califique gana una tarjeta de regalo de $80. Si eres un agente de seguros o contratista enviando multiples referidos por mes, contactanos para discutir un nivel de asociacion." },
      { q: "Que recibe el cliente referido?", a: "La persona que refieres recibe 10% de descuento en su proximo servicio con nosotros. Este descuento aplica a cualquier proyecto futuro que califique, no al inicial. Esta disenado para traerlos de vuelta como cliente recurrente." },
      { q: "Puedo referir a alguien especificamente para Peak 301?", a: "Si. El rejuvenecimiento de techo Peak 301 es uno de nuestros servicios que califican. Si eres un agente de seguros, este es el escenario de referido mas comun: un propietario enfrentando presion de su seguro por la edad del techo que necesita una alternativa al reemplazo completo." },
      { q: "Ambas partes necesitan estar en su area de servicio?", a: "El cliente referido necesita estar en nuestra area de servicio (desde Ruskin al norte a traves de Tampa, St. Pete, Clearwater y New Port Richey). Tu puedes estar ubicado en cualquier lugar." },
      { q: "El programa esta disponible en espanol?", a: "Si. Nuestro programa de referidos funciona igual en espanol. Llamanos al (844) 444-3114 o envia un correo electronico a info@jronegutters.com. Somos una empresa bilingue. Atendemos a clientes en ingles y espanol." },
    ],
    ctaTitle: "Empieza a Referir Hoy",
    ctaSub: "Una llamada. Un nombre. Eso es todo lo que toma para ganar $80 y ayudar a alguien a proteger su hogar.",
    ctaCallBtn: "LLAMA AL (844) 444-3114",
    ctaEmailBtn: "ENVIANOS UN CORREO",
    ctaFootnote: "Program available in English. Call us, we are bilingual.",
  },
};

const ICON_MAP = {
  house: HouseIcon,
  shield: ShieldIcon,
  wrench: WrenchIcon,
  hardhat: HardHatIcon,
  edge: RoofEdgeIcon,
  family: FamilyIcon,
  gift: GiftIcon,
  percent: PercentIcon,
  card: CardIcon,
  check: CheckIcon,
};

function PageEyebrow({ children }) {
  return (
    <div
      style={{
        display: "inline-block",
        padding: "6px 14px",
        background: "var(--jr-gold-pale)",
        border: "1px solid rgba(200, 149, 46, 0.28)",
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
        {children}
      </span>
    </div>
  );
}

export default function ReferralPage() {
  const { lang } = useLanguage();
  const t = T[lang];

  return (
    <div style={{ background: "var(--jr-navy)", color: "var(--jr-paper)", minHeight: "100vh" }}>
      <a href="#main" className="jr-skip-link">Skip to content</a>
      <SiteNav />

      <main id="main">
        {/* BREADCRUMB */}
        <div style={{ padding: "var(--jr-space-4) 0 0" }}>
          <Container>
            <nav
              style={{
                fontFamily: "var(--jr-font-body)",
                fontSize: "var(--jr-text-sm)",
                color: "var(--jr-muted-on-dark)",
              }}
            >
              <a href="/" style={{ color: "var(--jr-muted-on-dark)", textDecoration: "none" }}>
                {t.breadcrumbHome}
              </a>
              <span style={{ margin: "0 8px", opacity: 0.5 }}>/</span>
              <span style={{ color: "var(--jr-gold)" }}>{t.breadcrumbReferral}</span>
            </nav>
          </Container>
        </div>

        {/* HERO */}
        <section
          style={{
            padding: "var(--jr-space-12) var(--jr-space-6) var(--jr-space-16)",
            background: "linear-gradient(165deg, var(--jr-navy-deep) 0%, var(--jr-navy) 60%, var(--jr-navy-2) 100%)",
          }}
        >
          <Container>
            <div style={{ maxWidth: 800 }}>
              <PageEyebrow>{t.heroTag}</PageEyebrow>
              <h1
                style={{
                  fontFamily: "var(--jr-font-heading)",
                  fontSize: "var(--jr-text-4xl)",
                  fontWeight: 800,
                  lineHeight: 1.05,
                  marginBottom: "var(--jr-space-5)",
                  letterSpacing: "-0.5px",
                }}
              >
                {t.heroH1}<br />
                <span style={{ color: "var(--jr-gold)" }}>{t.heroH1Gold}</span>
              </h1>
              <p
                style={{
                  fontFamily: "var(--jr-font-body)",
                  fontSize: "var(--jr-text-lg)",
                  color: "var(--jr-cream-2)",
                  lineHeight: 1.7,
                  marginBottom: "var(--jr-space-8)",
                  maxWidth: 720,
                }}
              >
                {t.heroP}
              </p>
              <div style={{ display: "flex", gap: "var(--jr-space-4)", flexWrap: "wrap" }}>
                <Button href="tel:8444443114" variant="primary" size="lg" iconLeft={<PhoneIcon size={18} />}>
                  {t.referNowBtn}
                </Button>
                <Button
                  href="mailto:info@jronegutters.com?subject=Referral"
                  variant="outline"
                  size="lg"
                  iconLeft={<MailIcon size={18} />}
                >
                  {t.emailReferralBtn}
                </Button>
              </div>
            </div>

            {/* STATS */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                gap: "var(--jr-space-5)",
                marginTop: "var(--jr-space-12)",
              }}
            >
              {t.stats.map((s, i) => {
                const Icon = ICON_MAP[s.icon] || GiftIcon;
                return (
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
                        width: 48,
                        height: 48,
                        borderRadius: "var(--jr-radius-md)",
                        background: "var(--jr-gold-pale)",
                        border: "1px solid rgba(200, 149, 46, 0.32)",
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "var(--jr-gold)",
                        marginBottom: "var(--jr-space-3)",
                      }}
                    >
                      <Icon size={24} />
                    </div>
                    <div
                      style={{
                        fontFamily: "var(--jr-font-heading)",
                        fontSize: "var(--jr-text-2xl)",
                        fontWeight: 800,
                        color: "var(--jr-gold)",
                        marginBottom: "var(--jr-space-2)",
                      }}
                    >
                      {s.value}
                    </div>
                    <div
                      style={{
                        fontFamily: "var(--jr-font-body)",
                        fontSize: "var(--jr-text-sm)",
                        color: "var(--jr-muted-on-dark)",
                        lineHeight: 1.5,
                      }}
                    >
                      {s.label}
                    </div>
                  </div>
                );
              })}
            </div>
          </Container>
        </section>

        {/* HOW IT WORKS */}
        <section style={{ background: "var(--jr-navy)", padding: "var(--jr-space-20) 0" }}>
          <Container>
            <SectionHeading eyebrow={t.howTag} title={t.howTitle} theme="dark" />
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
                gap: "var(--jr-space-5)",
              }}
            >
              {t.howSteps.map((step) => (
                <ProcessStep key={step.num} num={step.num} title={step.title} desc={step.desc} />
              ))}
            </div>
          </Container>
        </section>

        {/* WHO CAN REFER */}
        <section style={{ background: "var(--jr-navy-deep)", padding: "var(--jr-space-20) 0" }}>
          <Container>
            <SectionHeading eyebrow={t.whoTag} title={t.whoTitle} theme="dark" />
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
                gap: "var(--jr-space-5)",
              }}
            >
              {t.whoCards.map((item, i) => {
                const Icon = ICON_MAP[item.icon] || HouseIcon;
                return (
                  <div
                    key={i}
                    className="jr-hover-lift"
                    style={{
                      background: "var(--jr-navy)",
                      border: "1px solid var(--jr-navy-3)",
                      borderRadius: "var(--jr-radius-lg)",
                      padding: "var(--jr-space-6)",
                    }}
                  >
                    <div
                      style={{
                        width: 52,
                        height: 52,
                        borderRadius: "var(--jr-radius-md)",
                        background: "var(--jr-gold-pale)",
                        border: "1px solid rgba(200, 149, 46, 0.32)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "var(--jr-gold)",
                        marginBottom: "var(--jr-space-4)",
                      }}
                    >
                      <Icon size={26} />
                    </div>
                    <h3
                      style={{
                        fontFamily: "var(--jr-font-heading)",
                        fontSize: "var(--jr-text-lg)",
                        fontWeight: 700,
                        color: "var(--jr-paper)",
                        marginBottom: "var(--jr-space-3)",
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
                );
              })}
            </div>
          </Container>
        </section>

        {/* INSURANCE AGENT SPOTLIGHT */}
        <section
          style={{
            background: "linear-gradient(135deg, var(--jr-navy-deep) 0%, var(--jr-navy) 100%)",
            padding: "var(--jr-space-20) 0",
            borderTop: "1px solid var(--jr-gold)",
            borderBottom: "1px solid var(--jr-gold)",
          }}
        >
          <Container size="narrow">
            <div style={{ textAlign: "center" }}>
              <PageEyebrow>{t.insTag}</PageEyebrow>
              <h2
                style={{
                  fontFamily: "var(--jr-font-heading)",
                  fontSize: "var(--jr-text-3xl)",
                  fontWeight: 700,
                  color: "var(--jr-paper)",
                  letterSpacing: "0.3px",
                  lineHeight: 1.2,
                  marginBottom: "var(--jr-space-2)",
                }}
              >
                {t.insTitle}
              </h2>
              <h2
                style={{
                  fontFamily: "var(--jr-font-heading)",
                  fontSize: "var(--jr-text-3xl)",
                  fontWeight: 700,
                  color: "var(--jr-gold)",
                  letterSpacing: "0.3px",
                  lineHeight: 1.2,
                  marginBottom: "var(--jr-space-4)",
                }}
              >
                {t.insTitleGold}
              </h2>
              <div
                aria-hidden
                style={{
                  width: 60,
                  height: 3,
                  background: "var(--jr-gold)",
                  borderRadius: 2,
                  margin: "0 auto var(--jr-space-6)",
                }}
              />
              <p
                style={{
                  fontFamily: "var(--jr-font-body)",
                  fontSize: "var(--jr-text-md)",
                  color: "var(--jr-cream-2)",
                  lineHeight: 1.7,
                  maxWidth: 720,
                  margin: "0 auto var(--jr-space-10)",
                }}
              >
                {t.insDesc}
              </p>
            </div>
            <div style={{ display: "grid", gap: "var(--jr-space-3)" }}>
              {t.insBenefits.map((b, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    gap: "var(--jr-space-3)",
                    alignItems: "center",
                    background: "var(--jr-gold-pale)",
                    border: "1px solid rgba(200, 149, 46, 0.32)",
                    borderRadius: "var(--jr-radius-md)",
                    padding: "var(--jr-space-4) var(--jr-space-5)",
                  }}
                >
                  <span style={{ color: "var(--jr-gold)", flexShrink: 0 }}>
                    <CheckIcon size={20} />
                  </span>
                  <p
                    style={{
                      fontFamily: "var(--jr-font-body)",
                      fontSize: "var(--jr-text-md)",
                      color: "var(--jr-paper)",
                    }}
                  >
                    {b}
                  </p>
                </div>
              ))}
            </div>
            <div style={{ textAlign: "center", marginTop: "var(--jr-space-10)" }}>
              <Button href="tel:8444443114" variant="primary" size="lg" iconLeft={<PhoneIcon size={18} />}>
                {t.insBtn}
              </Button>
            </div>
          </Container>
        </section>

        {/* QUALIFYING SERVICES */}
        <section style={{ background: "var(--jr-navy)", padding: "var(--jr-space-20) 0" }}>
          <Container size="narrow">
            <SectionHeading eyebrow={t.svcTag} title={t.svcTitle} subtitle={t.svcP} theme="dark" />
            <div style={{ display: "grid", gap: "var(--jr-space-2)" }}>
              {t.services.map((svc, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: "var(--jr-space-4)",
                    padding: "var(--jr-space-4) var(--jr-space-5)",
                    background: "var(--jr-navy-deep)",
                    borderRadius: "var(--jr-radius-md)",
                    border: "1px solid var(--jr-navy-3)",
                    flexWrap: "wrap",
                  }}
                >
                  <div style={{ minWidth: 0, flex: "1 1 320px" }}>
                    <span
                      style={{
                        fontFamily: "var(--jr-font-heading)",
                        fontSize: "var(--jr-text-md)",
                        fontWeight: 700,
                        color: "var(--jr-paper)",
                      }}
                    >
                      {svc.name}
                    </span>
                    <span
                      style={{
                        fontFamily: "var(--jr-font-body)",
                        fontSize: "var(--jr-text-sm)",
                        color: "var(--jr-muted-on-dark)",
                        marginLeft: "var(--jr-space-3)",
                      }}
                    >
                      {svc.desc}
                    </span>
                  </div>
                  <span
                    style={{
                      fontFamily: "var(--jr-font-heading)",
                      fontSize: "var(--jr-text-xs)",
                      fontWeight: 700,
                      color: "var(--jr-success)",
                      letterSpacing: "1.5px",
                      flexShrink: 0,
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 6,
                    }}
                  >
                    <CheckIcon size={14} /> {t.qualifiesLabel}
                  </span>
                </div>
              ))}
            </div>
          </Container>
        </section>

        {/* FAQ */}
        <section style={{ background: "var(--jr-navy-deep)", padding: "var(--jr-space-20) 0" }}>
          <Container size="prose">
            <SectionHeading eyebrow={t.faqTag} title={t.faqTitle} theme="dark" />
            <FAQAccordion items={t.faqs} theme="dark" />
          </Container>
        </section>

        {/* CTA */}
        <section style={{ background: "linear-gradient(180deg, var(--jr-navy) 0%, var(--jr-navy-deep) 100%)", padding: "var(--jr-space-20) 0", borderTop: "var(--jr-hair-darker)" }}>
          <Container size="narrow" style={{ textAlign: "center" }}>
            <h2
              style={{
                fontFamily: "var(--jr-font-heading)",
                fontSize: "var(--jr-text-3xl)",
                fontWeight: 700,
                color: "var(--jr-paper)",
                letterSpacing: "0.5px",
                marginBottom: "var(--jr-space-3)",
                textTransform: "uppercase",
              }}
            >
              {t.ctaTitle}
            </h2>
            <p
              style={{
                fontFamily: "var(--jr-font-body)",
                fontSize: "var(--jr-text-lg)",
                lineHeight: 1.65,
                color: "var(--jr-muted-on-dark)",
                maxWidth: 560,
                margin: "0 auto var(--jr-space-8)",
              }}
            >
              {t.ctaSub}
            </p>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "var(--jr-space-4)",
                justifyContent: "center",
              }}
            >
              <Button
                href="tel:8444443114"
                variant="primary"
                size="lg"
                iconLeft={<PhoneIcon size={18} />}
              >
                {t.ctaCallBtn}
              </Button>
              <Button
                href="mailto:info@jronegutters.com?subject=Referral%20Program"
                variant="outline"
                size="lg"
                iconLeft={<MailIcon size={18} />}
              >
                {t.ctaEmailBtn}
              </Button>
            </div>
            <p
              style={{
                fontFamily: "var(--jr-font-body)",
                fontSize: "var(--jr-text-sm)",
                color: "var(--jr-muted-on-dark)",
                marginTop: "var(--jr-space-6)",
              }}
            >
              {t.ctaFootnote}
            </p>
          </Container>
        </section>
      </main>

      <SiteFooter />
      <MobileCTA />
    </div>
  );
}
