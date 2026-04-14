"use client";

import { useState, useEffect } from "react";
import { useLanguage } from "../../lib/LanguageContext";
import SiteNav from "../../components/SiteNav";
import SiteFooter from "../../components/SiteFooter";
import MobileCTA from "../../components/MobileCTA";

const injectFonts = () => { if (typeof document==="undefined"||document.querySelector("#jr-fonts")) return; const l=document.createElement("link"); l.id="jr-fonts"; l.rel="stylesheet"; l.href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800&family=Source+Sans+3:wght@300;400;600&display=swap"; document.head.appendChild(l); };
const C = { bg:"#0B1628",navy:"#1B2A4A",navyMid:"#243556",navyLight:"#2C3E5A",navyFade:"#162033",gold:"#C8952E",goldLight:"#D4A843",goldPale:"rgba(200,149,46,0.12)",cream:"#F5F3EF",white:"#FFFFFF",offWhite:"#E8E4DC",muted:"#7A8FA8",charcoal:"#2D2D2D",success:"#2D8B4E",successDim:"rgba(45,139,78,0.15)",alert:"#B11A21",alertDim:"rgba(177,26,33,0.12)",accent:"#E91E8C",accentLight:"#F472B6",accentPale:"rgba(233,30,140,0.12)" };
const f = { h:"'Montserrat', sans-serif", b:"'Source Sans 3', sans-serif" };
const Tag = ({children}) => <div style={{display:"inline-block",padding:"6px 16px",background:C.accentPale,borderRadius:"4px",marginBottom:"12px"}}><span style={{fontFamily:f.h,fontSize:"12px",fontWeight:700,color:C.accent,letterSpacing:"3px"}}>{children}</span></div>;
const GoldBar = () => <div style={{width:"60px",height:"3px",background:`linear-gradient(90deg,${C.accent},${C.accentLight})`,borderRadius:"2px",margin:"16px auto"}} />;

const T = {
  en: {
    breadcrumbHome: "Home",
    breadcrumbReferral: "Referral Program",
    heroTag: "REFERRAL PROGRAM",
    heroH1: "Send Us a Customer.",
    heroH1Gold: "Earn a Reward.",
    heroP: "Whether you're a homeowner who loved our work, an insurance agent helping clients with aging roofs, a roofer who needs a trusted aluminum partner, or a real estate agent preparing homes for sale — when your referral becomes a customer, you get paid. Simple.",
    referNowBtn: "REFER SOMEONE NOW",
    emailReferralBtn: "EMAIL A REFERRAL",
    stats: [
      { value:"$80", label:"Gift card for every qualifying referral" },
      { value:"10%", label:"Off next service for referred customers" },
      { value:"$880", label:"Minimum project value to qualify" },
      { value:"ALL", label:"Services qualify — gutters, soffit, fascia, Peak 301" },
    ],
    howTag: "HOW IT WORKS",
    howTitle: "4 STEPS. THAT'S IT.",
    howSteps: [
      { num:"01", title:"REFER", desc:"Send us a customer — by phone, email, or through our website. Give us their name and contact info, and let them know you're referring them to JR One. That's it." },
      { num:"02", title:"WE SERVE", desc:"We handle everything from there. Your referral gets a professional consultation, transparent pricing, and the same quality service that earned your trust in the first place." },
      { num:"03", title:"THEY SIGN", desc:"When your referral signs a contract and provides a deposit on a qualifying project ($880 minimum), your reward is triggered. No fine print, no waiting months." },
      { num:"04", title:"YOU EARN", desc:"You receive an $80 gift card. Your referral receives 10% off their next service with us — creating a built-in reason for them to come back, which means another potential referral for you." },
    ],
    whoTag: "WHO CAN REFER",
    whoTitle: "EVERYONE EARNS",
    whoCards: [
      { icon:"🏠", title:"Homeowners", desc:"Had work done with us? Love the results? Tell your neighbors, friends, and family. Every qualifying referral earns you an $80 gift card — and they get 10% off their next service with us." },
      { icon:"📋", title:"Insurance Agents", desc:"Have clients facing non-renewal notices over roof age? Peak 301 roof rejuvenation is a legitimate, legally-backed alternative to full replacement. Refer your client to us, help them keep their coverage, and earn $80 per qualifying referral. We handle the treatment and inspector certification coordination — your client gets the documentation their carrier needs." },
      { icon:"🔨", title:"Roofers & General Contractors", desc:"You do roofs — we do gutters, soffit, fascia, and Peak 301. Instead of subcontracting aluminum work to someone you can't vouch for, refer your clients to a specialist. We make you look good, and you earn $80 per qualifying job." },
      { icon:"🏡", title:"Real Estate Agents", desc:"Preparing a home for sale? Curb appeal matters. Aging gutters, damaged soffit, worn fascia — these are the details buyers notice. Refer your sellers to us for the exterior work that closes deals, and earn $80 per qualifying project." },
      { icon:"🏢", title:"Property Managers", desc:"Managing multiple properties with ongoing exterior maintenance needs? One referral per property, every time there's qualifying work. The $80 adds up fast when you're managing a portfolio." },
      { icon:"🤝", title:"Anyone", desc:"You don't need a title or a business to refer. If you know someone who needs gutters, soffit, fascia, or roof rejuvenation in Tampa Bay, send them our way. If the project qualifies, you earn." },
    ],
    insTag: "FOR INSURANCE AGENTS",
    insTitle: "YOUR CLIENTS ARE PANICKING ABOUT ROOF AGE.",
    insTitleGold: "GIVE THEM A REAL OPTION.",
    insDesc: "When your client gets a non-renewal notice because their roof is 15+ years old, they have two choices: spend $15,000–$25,000 on a full replacement, or explore roof rejuvenation. Peak 301 treatment is a far smaller check than a $15,000–$25,000 replacement, restores shingle flexibility, and comes with warranty documentation and a Remaining Useful Life certification that Florida law requires carriers to accept.",
    insBenefits: [
      "Your client keeps their coverage without a $20K roof replacement",
      "You retain the client instead of losing them to a carrier that won't write older roofs",
      "You earn $80 per qualifying referral — with no cap",
      "We handle everything: assessment, treatment, inspector coordination, documentation",
      "We provide your client with a complete insurance toolkit including letter templates and rights summaries",
      "Bilingual service — we serve English and Spanish speaking homeowners"
    ],
    insBtn: "BECOME A REFERRAL PARTNER",
    svcTag: "QUALIFYING SERVICES",
    svcTitle: "WHAT COUNTS",
    svcP: "Any of these services with a minimum project value of $880 qualifies for the referral program.",
    qualifiesLabel: "QUALIFIES",
    services: [
      { name:"Seamless Gutters", desc:"6\" and 7\" seamless aluminum gutter installation" },
      { name:"Gutter Guards", desc:"Micro mesh and screen gutter protection systems" },
      { name:"Gutter Repair", desc:"Realignment, resealing, downspout repair, and replacement" },
      { name:"Soffit Replacement", desc:"Aluminum soffit panel installation and wood repair" },
      { name:"Fascia Replacement", desc:"Aluminum fascia wrap and wood substrate repair" },
      { name:"Peak 301 Roof Rejuvenation", desc:"Soy-based shingle rejuvenation with warranty documentation" },
      { name:"Siding", desc:"Aluminum siding installation and replacement" },
      { name:"Copper Work", desc:"Custom copper gutter and accent installations" },
      { name:"Govee Lights", desc:"Professional LED lighting installation" },
      { name:"Maintenance Plans", desc:"Recurring gutter cleaning and maintenance" },
    ],
    faqTag: "FAQ",
    faqTitle: "REFERRAL PROGRAM QUESTIONS",
    faqs: [
      { q:"How do I submit a referral?", a:"Call us at (844) 444-3114 and let us know you're referring someone, or email info@jronegutters.com with the referral's name and contact info. You can also have your referral mention your name when they contact us. We track every referral by name." },
      { q:"When do I get paid?", a:"Your $80 gift card is issued once your referral signs a contract and provides a deposit or first payment on a qualifying project. We don't make you wait until the project is completed — once the commitment is made, your reward is earned." },
      { q:"What counts as a qualifying project?", a:"Any JR One service with a minimum project value of $880. This includes gutters, guards, soffit, fascia, siding, copper work, Peak 301 roof rejuvenation, Govee lights, and maintenance plans that meet the minimum." },
      { q:"Is there a limit to how many referrals I can send?", a:"No cap. Send one, send fifty. Every qualifying referral earns an $80 gift card. If you're an insurance agent or contractor sending multiple referrals per month, contact us to discuss a partnership tier." },
      { q:"What does the referred customer get?", a:"The person you refer receives 10% off their next service with us. This discount applies to any future qualifying project — not the initial one. It's designed to bring them back as a repeat customer." },
      { q:"Can I refer someone for Peak 301 specifically?", a:"Yes — Peak 301 roof rejuvenation is one of our qualifying services. If you're an insurance agent, this is the most common referral scenario: a homeowner facing insurance pressure over roof age who needs an alternative to full replacement." },
      { q:"Do both parties need to be in your service area?", a:"The referred customer needs to be in our service area (Ruskin north through Tampa, St. Pete, Clearwater, and New Port Richey). You can be located anywhere." },
      { q:"Is the program available in Spanish?", a:"Yes. Our referral program works the same in Spanish. Call us at (844) 444-3114 or email info@jronegutters.com. We are a bilingual company — we serve clients in English and Spanish." },
    ],
    ctaTitle: "START REFERRING TODAY",
    ctaSub: "One phone call. One name. That's all it takes to earn $80 and help someone protect their home.",
    ctaCallBtn: "CALL (844) 444-3114",
    ctaEmailBtn: "EMAIL US",
    ctaFootnote: "Programa disponible en español. Llámenos — somos bilingües.",
  },
  es: {
    breadcrumbHome: "Inicio",
    breadcrumbReferral: "Programa de Referidos",
    heroTag: "PROGRAMA DE REFERIDOS",
    heroH1: "Envianos un Cliente.",
    heroH1Gold: "Gana una Recompensa.",
    heroP: "Ya seas un propietario que le encanto nuestro trabajo, un agente de seguros ayudando a clientes con techos viejos, un techador que necesita un socio de aluminio confiable, o un agente de bienes raices preparando casas para la venta — cuando tu referido se convierte en cliente, te pagamos. Asi de simple.",
    referNowBtn: "REFIERE A ALGUIEN AHORA",
    emailReferralBtn: "ENVIA UN REFERIDO POR CORREO",
    stats: [
      { value:"$80", label:"Tarjeta de regalo por cada referido que califique" },
      { value:"10%", label:"De descuento en el proximo servicio para clientes referidos" },
      { value:"$880", label:"Valor minimo del proyecto para calificar" },
      { value:"TODOS", label:"Los servicios califican — canaletas, sofito, fascia, Peak 301" },
    ],
    howTag: "COMO FUNCIONA",
    howTitle: "4 PASOS. ESO ES TODO.",
    howSteps: [
      { num:"01", title:"REFIERE", desc:"Envianos un cliente — por telefono, correo electronico o a traves de nuestro sitio web. Danos su nombre e informacion de contacto, y hazle saber que nos los estas refiriendo. Eso es todo." },
      { num:"02", title:"SERVIMOS", desc:"Nos encargamos de todo desde ahi. Tu referido recibe una consulta profesional, precios transparentes y el mismo servicio de calidad que gano tu confianza." },
      { num:"03", title:"FIRMAN", desc:"Cuando tu referido firma un contrato y proporciona un deposito en un proyecto que califique ($880 minimo), tu recompensa se activa. Sin letra pequena, sin esperar meses." },
      { num:"04", title:"GANAS", desc:"Recibes una tarjeta de regalo de $80. Tu referido recibe 10% de descuento en su proximo servicio con nosotros — creando una razon para que regresen, lo que significa otro referido potencial para ti." },
    ],
    whoTag: "QUIEN PUEDE REFERIR",
    whoTitle: "TODOS GANAN",
    whoCards: [
      { icon:"🏠", title:"Propietarios", desc:"Te hicimos un trabajo? Te encantaron los resultados? Cuentale a tus vecinos, amigos y familia. Cada referido que califique te gana una tarjeta de regalo de $80 — y ellos obtienen 10% de descuento en su proximo servicio." },
      { icon:"📋", title:"Agentes de Seguros", desc:"Tienes clientes enfrentando avisos de no-renovacion por la edad del techo? El rejuvenecimiento de techo Peak 301 es una alternativa legitima y respaldada legalmente al reemplazo completo. Refiere a tu cliente, ayudale a mantener su cobertura y gana $80 por cada referido que califique. Nosotros manejamos el tratamiento y la coordinacion de certificacion del inspector — tu cliente obtiene la documentacion que su aseguradora necesita." },
      { icon:"🔨", title:"Techadores y Contratistas Generales", desc:"Tu haces techos — nosotros hacemos canaletas, sofito, fascia y Peak 301. En vez de subcontratar trabajo de aluminio a alguien que no puedes garantizar, refiere a tus clientes a un especialista. Te hacemos ver bien, y ganas $80 por cada trabajo que califique." },
      { icon:"🏡", title:"Agentes de Bienes Raices", desc:"Preparando una casa para la venta? La apariencia exterior importa. Canaletas viejas, sofito danado, fascia desgastada — estos son los detalles que los compradores notan. Refiere a tus vendedores para el trabajo exterior que cierra tratos, y gana $80 por cada proyecto que califique." },
      { icon:"🏢", title:"Administradores de Propiedades", desc:"Administrando multiples propiedades con necesidades de mantenimiento exterior continuas? Un referido por propiedad, cada vez que haya trabajo que califique. Los $80 se acumulan rapido cuando administras un portafolio." },
      { icon:"🤝", title:"Cualquier Persona", desc:"No necesitas un titulo o un negocio para referir. Si conoces a alguien que necesite canaletas, sofito, fascia o rejuvenecimiento de techo en Tampa Bay, envialos con nosotros. Si el proyecto califica, ganas." },
    ],
    insTag: "PARA AGENTES DE SEGUROS",
    insTitle: "TUS CLIENTES ESTAN EN PANICO POR LA EDAD DEL TECHO.",
    insTitleGold: "DALES UNA OPCION REAL.",
    insDesc: "Cuando tu cliente recibe un aviso de no-renovacion porque su techo tiene mas de 15 anos, tiene dos opciones: gastar $15,000–$25,000 en un reemplazo completo, o explorar el rejuvenecimiento de techo. El tratamiento Peak 301 es una cuenta mucho mas pequena que un reemplazo de $15,000–$25,000, restaura la flexibilidad de las tejas y viene con documentacion de garantia y una certificacion de Vida Util Remanente que la ley de Florida requiere que las aseguradoras acepten.",
    insBenefits: [
      "Tu cliente mantiene su cobertura sin un reemplazo de techo de $20K",
      "Retienes al cliente en vez de perderlo ante una aseguradora que no asegura techos viejos",
      "Ganas $80 por cada referido que califique — sin limite",
      "Nosotros manejamos todo: evaluacion, tratamiento, coordinacion con inspector, documentacion",
      "Proporcionamos a tu cliente un kit completo de seguros incluyendo plantillas de cartas y resumen de derechos",
      "Servicio bilingue — atendemos a propietarios que hablan ingles y espanol"
    ],
    insBtn: "CONVIERTETE EN SOCIO DE REFERIDOS",
    svcTag: "SERVICIOS QUE CALIFICAN",
    svcTitle: "QUE CUENTA",
    svcP: "Cualquiera de estos servicios con un valor minimo de proyecto de $880 califica para el programa de referidos.",
    qualifiesLabel: "CALIFICA",
    services: [
      { name:"Canaletas Sin Costura", desc:"Instalacion de canaletas de aluminio sin costura de 6\" y 7\"" },
      { name:"Protectores de Canaletas", desc:"Sistemas de proteccion de canaletas de micro malla y malla" },
      { name:"Reparacion de Canaletas", desc:"Realineacion, resellado, reparacion de bajantes y reemplazo" },
      { name:"Reemplazo de Sofito", desc:"Instalacion de paneles de sofito de aluminio y reparacion de madera" },
      { name:"Reemplazo de Fascia", desc:"Envoltura de fascia de aluminio y reparacion de sustrato de madera" },
      { name:"Peak 301 Rejuvenecimiento de Techo", desc:"Rejuvenecimiento de tejas a base de soya con documentacion de garantia" },
      { name:"Revestimiento", desc:"Instalacion y reemplazo de revestimiento de aluminio" },
      { name:"Trabajo en Cobre", desc:"Instalaciones personalizadas de canaletas y acentos de cobre" },
      { name:"Luces Govee", desc:"Instalacion profesional de iluminacion LED" },
      { name:"Planes de Mantenimiento", desc:"Limpieza y mantenimiento recurrente de canaletas" },
    ],
    faqTag: "PREGUNTAS FRECUENTES",
    faqTitle: "PREGUNTAS DEL PROGRAMA DE REFERIDOS",
    faqs: [
      { q:"Como envio un referido?", a:"Llamanos al (844) 444-3114 y dinos que estas refiriendo a alguien, o envia un correo a info@jronegutters.com con el nombre y la informacion de contacto del referido. Tambien puedes hacer que tu referido mencione tu nombre cuando nos contacte. Rastreamos cada referido por nombre." },
      { q:"Cuando me pagan?", a:"Tu tarjeta de regalo de $80 se emite una vez que tu referido firma un contrato y proporciona un deposito o primer pago en un proyecto que califique. No te hacemos esperar hasta que el proyecto se complete — una vez que se hace el compromiso, tu recompensa esta ganada." },
      { q:"Que cuenta como proyecto que califica?", a:"Cualquier servicio de JR One con un valor minimo de proyecto de $880. Esto incluye canaletas, protectores, sofito, fascia, revestimiento, trabajo en cobre, rejuvenecimiento de techo Peak 301, luces Govee y planes de mantenimiento que cumplan el minimo." },
      { q:"Hay un limite de cuantos referidos puedo enviar?", a:"Sin limite. Envia uno, envia cincuenta. Cada referido que califique gana una tarjeta de regalo de $80. Si eres un agente de seguros o contratista enviando multiples referidos por mes, contactanos para discutir un nivel de asociacion." },
      { q:"Que recibe el cliente referido?", a:"La persona que refieres recibe 10% de descuento en su proximo servicio con nosotros. Este descuento aplica a cualquier proyecto futuro que califique — no al inicial. Esta disenado para traerlos de vuelta como cliente recurrente." },
      { q:"Puedo referir a alguien especificamente para Peak 301?", a:"Si — el rejuvenecimiento de techo Peak 301 es uno de nuestros servicios que califican. Si eres un agente de seguros, este es el escenario de referido mas comun: un propietario enfrentando presion de su seguro por la edad del techo que necesita una alternativa al reemplazo completo." },
      { q:"Ambas partes necesitan estar en su area de servicio?", a:"El cliente referido necesita estar en nuestra area de servicio (desde Ruskin al norte a traves de Tampa, St. Pete, Clearwater y New Port Richey). Tu puedes estar ubicado en cualquier lugar." },
      { q:"El programa esta disponible en espanol?", a:"Si. Nuestro programa de referidos funciona igual en espanol. Llamanos al (844) 444-3114 o envia un correo electronico a info@jronegutters.com. Somos una empresa bilingue — atendemos a clientes en ingles y espanol." },
    ],
    ctaTitle: "EMPIEZA A REFERIR HOY",
    ctaSub: "Una llamada. Un nombre. Eso es todo lo que toma para ganar $80 y ayudar a alguien a proteger su hogar.",
    ctaCallBtn: "LLAMA AL (844) 444-3114",
    ctaEmailBtn: "ENVIANOS UN CORREO",
    ctaFootnote: "Program available in English. Call us — we're bilingual.",
  },
};

export default function ReferralPage() {
  const [openFaq, setOpenFaq] = useState(null);
  const { lang } = useLanguage();
  const t = T[lang];
  useEffect(() => { injectFonts(); }, []);
  const sec = {padding:"80px 24px",maxWidth:"1200px",margin:"0 auto"};
  const secTitle = {fontFamily:f.h,fontSize:"clamp(24px,4vw,36px)",fontWeight:800,letterSpacing:"2px",textAlign:"center",marginBottom:"8px"};

  return (
    <div style={{background:C.bg,color:C.white,fontFamily:f.b,lineHeight:1.65,minHeight:"100vh"}}>
      <SiteNav />

      {/* BREADCRUMB */}
      <div style={{padding:"16px 24px 0",maxWidth:"1200px",margin:"0 auto"}}><div style={{fontFamily:f.b,fontSize:"13px",color:C.muted}}><a href="/" style={{color:C.muted,textDecoration:"none"}}>{t.breadcrumbHome}</a><span style={{margin:"0 8px",opacity:0.5}}>/</span><span style={{color:C.accent}}>{t.breadcrumbReferral}</span></div></div>

      {/* HERO */}
      <section className="hero-stars" style={{padding:"60px 24px 80px",maxWidth:"1200px",margin:"0 auto"}}>
        <div style={{maxWidth:"800px"}}>
          <Tag>{t.heroTag}</Tag>
          <h1 style={{fontFamily:f.h,fontSize:"clamp(32px,5vw,48px)",fontWeight:800,lineHeight:1.1,marginBottom:"20px"}}>{t.heroH1}<br/><span style={{color:C.accent}}>{t.heroH1Gold}</span></h1>
          <p style={{fontFamily:f.b,fontSize:"18px",color:C.offWhite,lineHeight:1.7,marginBottom:"32px",maxWidth:"680px"}}>{t.heroP}</p>
          <div style={{display:"flex",gap:"16px",flexWrap:"wrap"}}>
            <a href="tel:8444443114" style={{padding:"16px 36px",fontFamily:f.h,fontSize:"14px",fontWeight:700,letterSpacing:"1.5px",color:C.white,background:`linear-gradient(135deg,${C.accent},${C.accentLight})`,border:"none",borderRadius:"8px",textDecoration:"none",boxShadow:"0 4px 16px rgba(233,30,140,0.3)"}}>{t.referNowBtn}</a>
            <a href="mailto:info@jronegutters.com?subject=Referral" style={{display:"inline-flex",alignItems:"center",padding:"16px 36px",fontFamily:f.h,fontSize:"14px",fontWeight:700,letterSpacing:"1.5px",color:C.accent,border:`2px solid ${C.accent}`,borderRadius:"8px",textDecoration:"none"}}>{t.emailReferralBtn}</a>
          </div>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))",gap:"20px",marginTop:"56px"}}>
          {t.stats.map((s,i) => <div key={i} style={{background:C.navyFade,border:`1px solid ${C.navyLight}`,borderRadius:"12px",padding:"24px",textAlign:"center"}}>
            <div style={{fontFamily:f.h,fontSize:"clamp(22px,3vw,32px)",fontWeight:800,color:C.accent,marginBottom:"6px"}}>{s.value}</div>
            <div style={{fontFamily:f.b,fontSize:"13px",color:C.muted,lineHeight:1.4}}>{s.label}</div>
          </div>)}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section style={{background:C.navy,padding:"80px 24px"}}>
        <div style={sec}><div style={{textAlign:"center"}}><Tag>{t.howTag}</Tag><h2 style={{...secTitle,color:C.white}}>{t.howTitle}</h2><GoldBar /></div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(250px,1fr))",gap:"24px",marginTop:"48px"}}>
            {t.howSteps.map((step,i) => <div key={i} style={{background:C.navyFade,border:`1px solid ${C.navyLight}`,borderRadius:"12px",padding:"28px",position:"relative"}}>
              <div style={{fontFamily:f.h,fontSize:"36px",fontWeight:800,color:"rgba(233,30,140,0.08)",position:"absolute",top:"16px",right:"20px"}}>{step.num}</div>
              <div style={{fontFamily:f.h,fontSize:"11px",fontWeight:700,color:C.accent,letterSpacing:"3px",marginBottom:"8px"}}>STEP {step.num}</div>
              <h3 style={{fontFamily:f.h,fontSize:"22px",fontWeight:700,color:C.white,marginBottom:"12px"}}>{step.title}</h3>
              <p style={{fontFamily:f.b,fontSize:"15px",color:C.muted,lineHeight:1.6}}>{step.desc}</p>
            </div>)}
          </div>
        </div>
      </section>

      {/* WHO CAN REFER */}
      <section style={{background:C.bg,padding:"80px 24px"}}>
        <div style={sec}><div style={{textAlign:"center"}}><Tag>{t.whoTag}</Tag><h2 style={{...secTitle,color:C.white}}>{t.whoTitle}</h2><GoldBar /></div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(340px,1fr))",gap:"20px",marginTop:"48px"}}>
            {t.whoCards.map((item,i) => <div key={i} style={{background:C.navyFade,border:`1px solid ${C.navyLight}`,borderRadius:"12px",padding:"28px",transition:"border-color 0.3s"}} onMouseOver={e=>e.currentTarget.style.borderColor=C.accent} onMouseOut={e=>e.currentTarget.style.borderColor=C.navyLight}>
              <div style={{fontSize:"32px",marginBottom:"12px"}}>{item.icon}</div>
              <h3 style={{fontFamily:f.h,fontSize:"17px",fontWeight:700,color:C.white,marginBottom:"10px"}}>{item.title}</h3>
              <p style={{fontFamily:f.b,fontSize:"15px",color:C.muted,lineHeight:1.6}}>{item.desc}</p>
            </div>)}
          </div>
        </div>
      </section>

      {/* INSURANCE AGENT SPOTLIGHT */}
      <section style={{background:`linear-gradient(135deg, #1a1a0a, ${C.navy})`,padding:"80px 24px",borderTop:`2px solid ${C.accent}`,borderBottom:`2px solid ${C.accent}`}}>
        <div style={{maxWidth:"900px",margin:"0 auto"}}>
          <div style={{textAlign:"center"}}>
            <Tag>{t.insTag}</Tag>
            <h2 style={{fontFamily:f.h,fontSize:"clamp(22px,3.5vw,32px)",fontWeight:800,color:C.white,marginBottom:"4px"}}>{t.insTitle}</h2>
            <h2 style={{fontFamily:f.h,fontSize:"clamp(22px,3.5vw,32px)",fontWeight:800,color:C.accent,marginBottom:"16px"}}>{t.insTitleGold}</h2>
            <GoldBar />
            <p style={{fontFamily:f.b,fontSize:"16px",color:C.offWhite,lineHeight:1.7,maxWidth:"700px",margin:"0 auto 40px"}}>{t.insDesc}</p>
          </div>
          <div style={{display:"grid",gap:"12px"}}>
            {t.insBenefits.map((b,i) => <div key={i} style={{display:"flex",gap:"12px",alignItems:"center",background:C.accentPale,borderRadius:"8px",padding:"16px 20px"}}>
              <span style={{fontFamily:f.h,fontSize:"16px",color:C.accent,flexShrink:0}}>✓</span>
              <p style={{fontFamily:f.b,fontSize:"15px",color:C.white}}>{b}</p>
            </div>)}
          </div>
          <div style={{textAlign:"center",marginTop:"40px"}}>
            <a href="tel:8444443114" style={{padding:"16px 36px",fontFamily:f.h,fontSize:"14px",fontWeight:700,letterSpacing:"1.5px",color:C.white,background:`linear-gradient(135deg,${C.accent},${C.accentLight})`,borderRadius:"8px",textDecoration:"none",boxShadow:"0 4px 16px rgba(233,30,140,0.3)"}}>{t.insBtn}</a>
          </div>
        </div>
      </section>

      {/* QUALIFYING SERVICES */}
      <section style={{background:C.navy,padding:"80px 24px"}}>
        <div style={{maxWidth:"800px",margin:"0 auto"}}>
          <div style={{textAlign:"center"}}><Tag>{t.svcTag}</Tag><h2 style={{...secTitle,color:C.white}}>{t.svcTitle}</h2><GoldBar /><p style={{fontFamily:f.b,fontSize:"15px",color:C.muted,marginBottom:"40px"}}>{t.svcP}</p></div>
          <div style={{display:"grid",gap:"8px"}}>
            {t.services.map((svc,i) => <div key={i} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"16px 20px",background:C.navyFade,borderRadius:"8px",border:`1px solid ${C.navyLight}`}}>
              <div><span style={{fontFamily:f.h,fontSize:"14px",fontWeight:700,color:C.white}}>{svc.name}</span><span style={{fontFamily:f.b,fontSize:"13px",color:C.muted,marginLeft:"12px"}}>{svc.desc}</span></div>
              <span style={{fontFamily:f.h,fontSize:"12px",fontWeight:700,color:C.success,letterSpacing:"1px",flexShrink:0}}>✓ {t.qualifiesLabel}</span>
            </div>)}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section style={{background:C.bg,padding:"80px 24px"}}>
        <div style={{maxWidth:"800px",margin:"0 auto",textAlign:"center"}}>
          <Tag>{t.faqTag}</Tag><h2 style={{...secTitle,color:C.white}}>{t.faqTitle}</h2><GoldBar />
          <div style={{marginTop:"40px",textAlign:"left"}}>
            {t.faqs.map((faq,i) => <div key={i} style={{borderBottom:`1px solid ${C.navyLight}`}}>
              <button onClick={()=>setOpenFaq(openFaq===i?null:i)} style={{width:"100%",padding:"20px 0",background:"none",border:"none",cursor:"pointer",display:"flex",justifyContent:"space-between",alignItems:"center",gap:"16px"}}>
                <span style={{fontFamily:f.h,fontSize:"15px",fontWeight:600,color:openFaq===i?C.accent:C.white,textAlign:"left",transition:"color 0.2s"}}>{faq.q}</span>
                <span style={{fontFamily:f.h,fontSize:"20px",color:C.accent,transform:openFaq===i?"rotate(45deg)":"none",transition:"transform 0.3s",flexShrink:0}}>+</span>
              </button>
              {openFaq===i&&<div style={{padding:"0 0 20px",fontFamily:f.b,fontSize:"15px",color:C.muted,lineHeight:1.65}}>{faq.a}</div>}
            </div>)}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{background:`linear-gradient(165deg,${C.navyMid},${C.navy})`,padding:"80px 24px"}}>
        <div style={{maxWidth:"700px",margin:"0 auto",textAlign:"center"}}>
          <h2 style={{fontFamily:f.h,fontSize:"clamp(28px,5vw,40px)",fontWeight:800,color:C.white,marginBottom:"12px"}}>{t.ctaTitle}</h2>
          <p style={{fontFamily:f.b,fontSize:"17px",color:C.offWhite,marginBottom:"40px"}}>{t.ctaSub}</p>
          <div style={{display:"flex",gap:"16px",justifyContent:"center",flexWrap:"wrap"}}>
            <a href="tel:8444443114" style={{padding:"16px 36px",fontFamily:f.h,fontSize:"14px",fontWeight:700,letterSpacing:"1.5px",color:C.white,background:`linear-gradient(135deg,${C.accent},${C.accentLight})`,borderRadius:"8px",textDecoration:"none",boxShadow:"0 4px 16px rgba(233,30,140,0.3)"}}>📞 {t.ctaCallBtn}</a>
            <a href="mailto:info@jronegutters.com?subject=Referral%20Program" style={{display:"inline-flex",alignItems:"center",padding:"16px 36px",fontFamily:f.h,fontSize:"14px",fontWeight:700,letterSpacing:"1.5px",color:C.accent,border:`2px solid ${C.accent}`,borderRadius:"8px",textDecoration:"none"}}>✉️ {t.ctaEmailBtn}</a>
          </div>
          <p style={{fontFamily:f.b,fontSize:"14px",color:C.muted,marginTop:"24px"}}>{t.ctaFootnote}</p>
        </div>
      </section>

      <SiteFooter />
      <MobileCTA />
      <style>{`*{box-sizing:border-box;margin:0;padding:0}`}</style>
    </div>
  );
}
