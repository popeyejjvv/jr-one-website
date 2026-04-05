"use client";

import { useState, useEffect } from "react";
import { useLanguage } from "../../lib/LanguageContext";
import SiteNav from "../../components/SiteNav";
import SiteFooter from "../../components/SiteFooter";
import MobileCTA from "../../components/MobileCTA";

const injectFonts = () => { if (typeof document==="undefined"||document.querySelector("#jr-fonts")) return; const l=document.createElement("link"); l.id="jr-fonts"; l.rel="stylesheet"; l.href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800&family=Source+Sans+3:wght@300;400;600&display=swap"; document.head.appendChild(l); };
const C = { bg:"#0B1628",navy:"#1B2A4A",navyMid:"#243556",navyLight:"#2C3E5A",navyFade:"#162033",gold:"#C8952E",goldLight:"#D4A843",goldPale:"rgba(200,149,46,0.12)",cream:"#F5F3EF",white:"#FFFFFF",offWhite:"#E8E4DC",muted:"#7A8FA8",charcoal:"#2D2D2D",success:"#2D8B4E",successDim:"rgba(45,139,78,0.15)",accent:"#9333EA",accentLight:"#A855F7",accentPale:"rgba(147,51,234,0.12)" };
const f = { h:"'Montserrat', sans-serif", b:"'Source Sans 3', sans-serif" };
const Tag = ({children}) => <div style={{display:"inline-block",padding:"6px 16px",background:C.accentPale,borderRadius:"4px",marginBottom:"12px"}}><span style={{fontFamily:f.h,fontSize:"12px",fontWeight:700,color:C.accent,letterSpacing:"3px"}}>{children}</span></div>;
const GoldBar = () => <div style={{width:"60px",height:"3px",background:`linear-gradient(90deg,${C.accent},${C.accentLight})`,borderRadius:"2px",margin:"16px auto"}} />;
const Stars = () => <span style={{color:C.gold,fontSize:"14px",letterSpacing:"2px"}}>★★★★★</span>;
const inputStyle = {width:"100%",padding:"13px 16px",fontFamily:f.b,fontSize:"15px",border:"1.5px solid #D1D5DB",borderRadius:"8px",outline:"none",color:C.charcoal,marginBottom:"12px",background:"#FAFAFA",boxSizing:"border-box"};

const T = {
  en: {
    breadcrumb: ["Home","Services","Govee Lights"],
    heroTag: "SMART LED INSTALLATION",
    heroH1: "Govee Smart Lights,",
    heroH1Accent: "Professionally Installed.",
    heroP: "You buy the Govee LED strip lights. We mount them cleanly, securely, and discreetly along your roofline or exterior — with the same precision we bring to every aluminum installation. No DIY ladder risks. No sloppy mounting. Just clean, professional results.",
    heroCta: "GET YOUR FREE ESTIMATE",
    heroCall: "CALL (844) 444-3114",
    stats: [
      { value:"500+", label:"LED installations completed" },
      { value:"100%", label:"Mechanically secured" },
      { value:"1 DAY", label:"Most installs completed" },
      { value:"100%", label:"In-house installation" },
    ],
    problemTag: "THE PROBLEM",
    problemTitle: "WHY DIY LED INSTALLATION FAILS",
    problems: [
      { icon:"🔥", title:"Adhesive melts in Florida heat", desc:"Tampa's 95-degree summers soften adhesive-only LED mounting within months. Strips sag, peel, and fall off your roofline — leaving residue on your fascia and lights dangling from your house." },
      { icon:"📐", title:"Crooked, uneven lines", desc:"Without professional tools and a trained eye, DIY LED strips end up wavy, misaligned, and visually distracting. The whole point of accent lighting is a clean, seamless line — not a craft project gone wrong." },
      { icon:"⚠️", title:"Ladder safety risks", desc:"Roofline LED installation means working at height on ladders — the same height that sends thousands of homeowners to the ER every year. One wrong step on a wet Florida morning and you're a statistic." },
      { icon:"🔌", title:"Gaps and connectivity issues", desc:"DIY installations often leave visible gaps between strip segments, exposed wiring, and controllers mounted in awkward locations. Poor connections mean zones that don't respond and lights that flicker or fail." },
    ],
    solutionTag: "THE JR ONE DIFFERENCE",
    solutionTitle: "SMART LIGHT INSTALLATION DONE RIGHT",
    solutionSub: "Professional mounting built for Florida — not a DIY adhesive job that falls apart in the heat.",
    solutions: [
      { title:"Mechanically secured mounting", desc:"We don't rely on adhesive alone. Our crew mechanically fastens LED strips to your roofline so they stay put through 95-degree summers, thunderstorms, and hurricane-force winds. Built for Florida, not a living room." },
      { title:"Clean, invisible hardware", desc:"The whole point of accent lighting is the effect, not the hardware. We mount strips discreetly with hidden fasteners so you see the light, not the installation. No exposed wires. No visible clips." },
      { title:"Professional roofline expertise", desc:"We install gutters, soffit, and fascia every day. Running LED strips along a roofline is a natural extension of what we already do — with the equipment, safety gear, and expertise already on the truck." },
      { title:"Complete setup and connectivity", desc:"Basic setup and app connectivity included with every installation. We make sure the lights power on, connect to your app, and the zones are working before we leave your property." },
      { title:"Multi-story capability", desc:"Two-story and multi-level homes are no problem. We have the ladders, scaffolding, and safety equipment to reach every roofline safely — something most homeowners simply can't do on their own." },
      { title:"One crew, one visit, done right", desc:"No subcontractors. No return trips. Our trained team handles your entire installation in a single visit with the same craftsmanship standard we bring to every aluminum job." },
    ],
    peakAlertLabel: "FLORIDA INSURANCE ALERT",
    peakAlertTitle: "280% Increase in Non-Renewals — Roof Over 15 Years Old?",
    peakAlertDesc: "restores shingles from the inside out — adds 6–10 years at under 15% of replacement cost, with warranty docs your insurer must accept under FL law.",
    peakBtn: "PEAK 301 INFO →",
    peakRightsBtn: "YOUR RIGHTS →",
    goldTag: "THE GOLD STANDARD",
    goldTitle: "OUR INSTALLATION PROCESS",
    goldSub: "Every home. Every time. No exceptions.",
    goldSteps: [
      { num:"01", title:"CONSULT", desc:"Tell us about your home, your Govee lights, and where you want them mounted. We'll give you a quick quote based on your measurements and accessibility — most estimates take under 5 minutes." },
      { num:"02", title:"PLAN", desc:"We map your roofline, identify mounting points, plan wire routing, and determine the cleanest installation path. Every home is different — we plan for yours specifically." },
      { num:"03", title:"INSTALL", desc:"Our crew mounts your LED strips with professional hardware, routes wiring cleanly, and secures every connection point. Most homes completed in a single visit." },
      { num:"04", title:"ENJOY", desc:"Final walkthrough, app connectivity test, and zone check. We make sure everything works perfectly before we leave. Control your lights from your phone — holidays, parties, security, everyday ambiance." },
    ],
    stepLabel: "STEP",
    reviewsTag: "CUSTOMER REVIEWS",
    reviewsTitle: "WHAT OUR CUSTOMERS SAY",
    reviews: [
      { text:"Chris and his crew are amazing! Great customer service and even better craftsmanship! Chris took the time to explain and educate me on everything before the project commenced.", name:"JR One Customer", context:"Professional Install" },
      { text:"Great experience. They fixed and added a new gutter. I couldn't be more pleased with their work and dealing with their professional and friendly staff.", name:"Johnny C.", context:"Exterior Work" },
      { text:"Very satisfied with the quality. Professional team that showed up on time and got the job done right the first time. Would definitely recommend.", name:"David K.", context:"Roofline Installation" },
    ],
    faqTag: "FAQ",
    faqTitle: "GOVEE LIGHT INSTALLATION QUESTIONS",
    faqs: [
      { q:"Do I need to buy the Govee lights myself?", a:"Yes. You purchase the Govee smart LED strip lights, controller, and any accessories you want. You pick the exact product, color options, and features. We handle the professional mounting and installation only — this keeps your costs transparent and lets you choose exactly the system you want." },
      { q:"Why not just use the adhesive backing that comes with the lights?", a:"Tampa's heat softens adhesive-only mounting within months. Strips sag, peel, and fall off — especially on south-facing rooflines that get direct sun all day. We mechanically secure every strip so it stays put through Florida summers, storms, and hurricane-force winds." },
      { q:"How much does professional Govee light installation cost?", a:"Pricing is based on your home's specific measurements, roofline accessibility, and number of stories. Most estimates take under 5 minutes over the phone. Call us at (844) 444-3114 for a quick quote." },
      { q:"Can you install lights on a two-story home?", a:"Yes. Multi-story homes are no problem. We have the professional ladders, scaffolding, and safety equipment to reach every roofline safely — this is exactly the kind of work we do every day on gutter and soffit installations." },
      { q:"Do you set up the app and connectivity?", a:"Yes. Basic setup and app connectivity are included with every installation. We make sure the lights power on, connect to your phone, and the zones are working correctly before we leave." },
      { q:"What areas of the home can you install lights on?", a:"We install along rooflines, eaves, soffits, fascia boards, garage frames, and other exterior mounting surfaces. During your consultation, we'll discuss exactly where you want the lights and plan the cleanest installation path." },
      { q:"How long does installation take?", a:"Most residential Govee light installations are completed in a single visit — typically half a day depending on the size of your home and complexity of the roofline. We'll give you a time estimate during your consultation." },
    ],
    ctaTitle: "READY TO LIGHT UP YOUR HOME?",
    ctaSub: "Get your free installation quote. Tell us about your home and your Govee lights — we'll handle the rest with the same craftsmanship we bring to every job.",
    formTitle: "Get Your Free Installation Quote",
    formName: "Full Name",
    formPhone: "Phone Number",
    formEmail: "Email Address",
    formZip: "ZIP Code",
    formBtn: "REQUEST MY FREE INSTALLATION QUOTE",
    formDisclaimer: "No spam. No pressure. Just honest expert advice.",
    successTitle: "Quote Request Received!",
    successMsg: "We'll get back to you within hours.",
    preferTalk: "Prefer to talk?",
  },
  es: {
    breadcrumb: ["Inicio","Servicios","Luces Govee"],
    heroTag: "INSTALACION DE LED INTELIGENTES",
    heroH1: "Luces Inteligentes Govee,",
    heroH1Accent: "Instaladas Profesionalmente.",
    heroP: "Usted compra las tiras de luces LED Govee. Nosotros las montamos limpia, segura y discretamente a lo largo de su linea de techo o exterior — con la misma precision que llevamos a cada instalacion de aluminio. Sin riesgos de escaleras. Sin montaje descuidado. Solo resultados limpios y profesionales.",
    heroCta: "OBTENGA SU PRESUPUESTO GRATUITO",
    heroCall: "LLAME AL (844) 444-3114",
    stats: [
      { value:"500+", label:"Instalaciones LED completadas" },
      { value:"100%", label:"Asegurado mecanicamente" },
      { value:"1 DIA", label:"Mayoria de instalaciones" },
      { value:"100%", label:"Instalacion propia" },
    ],
    problemTag: "EL PROBLEMA",
    problemTitle: "POR QUE LA INSTALACION LED CASERA FALLA",
    problems: [
      { icon:"🔥", title:"El adhesivo se derrite con el calor de Florida", desc:"Los veranos de 95 grados en Tampa ablandan el montaje solo con adhesivo en meses. Las tiras se caen, se despegan y cuelgan de su techo — dejando residuos en su fascia y luces colgando de su casa." },
      { icon:"📐", title:"Lineas torcidas y desiguales", desc:"Sin herramientas profesionales y ojo entrenado, las tiras LED quedan onduladas, desalineadas y visualmente distractoras. El proposito de la iluminacion de acento es una linea limpia y continua — no un proyecto casero que salio mal." },
      { icon:"⚠️", title:"Riesgos de seguridad con escaleras", desc:"La instalacion LED en la linea del techo significa trabajar en altura sobre escaleras — la misma altura que envia a miles de propietarios a urgencias cada ano. Un paso en falso en una manana humeda de Florida y usted es una estadistica." },
      { icon:"🔌", title:"Espacios y problemas de conectividad", desc:"Las instalaciones caseras frecuentemente dejan espacios visibles entre segmentos de tiras, cableado expuesto y controladores montados en lugares incomodos. Las malas conexiones significan zonas que no responden y luces que parpadean o fallan." },
    ],
    solutionTag: "LA DIFERENCIA JR ONE",
    solutionTitle: "INSTALACION DE LUCES INTELIGENTES HECHA BIEN",
    solutionSub: "Montaje profesional construido para Florida — no un trabajo casero con adhesivo que se cae con el calor.",
    solutions: [
      { title:"Montaje asegurado mecanicamente", desc:"No dependemos solo del adhesivo. Nuestro equipo fija mecanicamente las tiras LED a su linea de techo para que permanezcan en su lugar durante veranos de 95 grados, tormentas y vientos de huracan. Construido para Florida, no para una sala de estar." },
      { title:"Hardware limpio e invisible", desc:"El proposito de la iluminacion de acento es el efecto, no el hardware. Montamos las tiras discretamente con sujetadores ocultos para que vea la luz, no la instalacion. Sin cables expuestos. Sin clips visibles." },
      { title:"Experiencia profesional en lineas de techo", desc:"Instalamos canalones, sofito y fascia todos los dias. Colocar tiras LED a lo largo de una linea de techo es una extension natural de lo que ya hacemos — con el equipo, el equipo de seguridad y la experiencia ya en el camion." },
      { title:"Configuracion completa y conectividad", desc:"La configuracion basica y conectividad de la app incluida con cada instalacion. Nos aseguramos de que las luces enciendan, se conecten a su app y las zonas funcionen antes de irnos de su propiedad." },
      { title:"Capacidad para multiples pisos", desc:"Casas de dos pisos y multinivel no son problema. Tenemos las escaleras, andamios y equipo de seguridad para alcanzar cada linea de techo de forma segura — algo que la mayoria de los propietarios simplemente no pueden hacer por su cuenta." },
      { title:"Un equipo, una visita, bien hecho", desc:"Sin subcontratistas. Sin visitas de retorno. Nuestro equipo capacitado maneja toda su instalacion en una sola visita con el mismo estandar de artesania que llevamos a cada trabajo de aluminio." },
    ],
    peakAlertLabel: "ALERTA DE SEGUROS DE FLORIDA",
    peakAlertTitle: "280% de Aumento en No Renovaciones — Techo de Mas de 15 Anos?",
    peakAlertDesc: "restaura las tejas desde adentro — agrega 6–10 anos a menos del 15% del costo de reemplazo, con documentos de garantia que su aseguradora debe aceptar bajo la ley de FL.",
    peakBtn: "INFO PEAK 301 →",
    peakRightsBtn: "SUS DERECHOS →",
    goldTag: "EL ESTANDAR DE ORO",
    goldTitle: "NUESTRO PROCESO DE INSTALACION",
    goldSub: "Cada casa. Cada vez. Sin excepciones.",
    goldSteps: [
      { num:"01", title:"CONSULTAR", desc:"Cuentenos sobre su casa, sus luces Govee y donde quiere montarlas. Le daremos un presupuesto rapido basado en sus medidas y accesibilidad — la mayoria de los presupuestos toman menos de 5 minutos." },
      { num:"02", title:"PLANIFICAR", desc:"Mapeamos su linea de techo, identificamos puntos de montaje, planificamos la ruta del cableado y determinamos la ruta de instalacion mas limpia. Cada casa es diferente — planificamos para la suya especificamente." },
      { num:"03", title:"INSTALAR", desc:"Nuestro equipo monta sus tiras LED con hardware profesional, enruta el cableado limpiamente y asegura cada punto de conexion. La mayoria de las casas se completan en una sola visita." },
      { num:"04", title:"DISFRUTAR", desc:"Recorrido final, prueba de conectividad de la app y verificacion de zonas. Nos aseguramos de que todo funcione perfectamente antes de irnos. Controle sus luces desde su telefono — fiestas, dias festivos, seguridad, ambiente diario." },
    ],
    stepLabel: "PASO",
    reviewsTag: "RESENAS DE CLIENTES",
    reviewsTitle: "LO QUE DICEN NUESTROS CLIENTES",
    reviews: [
      { text:"Chris y su equipo son increibles! Gran servicio al cliente y artesania aun mejor! Chris se tomo el tiempo de explicarme y educarme sobre todo antes de que comenzara el proyecto.", name:"Cliente de JR One", context:"Instalacion Profesional" },
      { text:"Gran experiencia. Arreglaron y agregaron un canalon nuevo. No podria estar mas satisfecho con su trabajo y trato con su personal profesional y amable.", name:"Johnny C.", context:"Trabajo Exterior" },
      { text:"Muy satisfecho con la calidad. Equipo profesional que llego a tiempo e hizo el trabajo bien la primera vez. Definitivamente los recomendaria.", name:"David K.", context:"Instalacion en Linea de Techo" },
    ],
    faqTag: "PREGUNTAS FRECUENTES",
    faqTitle: "PREGUNTAS SOBRE INSTALACION DE LUCES GOVEE",
    faqs: [
      { q:"Necesito comprar las luces Govee yo mismo?", a:"Si. Usted compra las tiras LED inteligentes Govee, el controlador y cualquier accesorio que desee. Usted elige el producto exacto, opciones de color y caracteristicas. Nosotros nos encargamos del montaje e instalacion profesional solamente — esto mantiene sus costos transparentes y le permite elegir exactamente el sistema que quiere." },
      { q:"Por que no usar el adhesivo que viene con las luces?", a:"El calor de Tampa ablanda el montaje solo con adhesivo en meses. Las tiras se caen y se despegan — especialmente en lineas de techo orientadas al sur que reciben sol directo todo el dia. Aseguramos mecanicamente cada tira para que permanezca en su lugar durante los veranos de Florida, tormentas y vientos de huracan." },
      { q:"Cuanto cuesta la instalacion profesional de luces Govee?", a:"El precio se basa en las medidas especificas de su casa, accesibilidad de la linea de techo y numero de pisos. La mayoria de los presupuestos toman menos de 5 minutos por telefono. Llamenos al (844) 444-3114 para un presupuesto rapido." },
      { q:"Pueden instalar luces en una casa de dos pisos?", a:"Si. Las casas de multiples pisos no son problema. Tenemos las escaleras profesionales, andamios y equipo de seguridad para alcanzar cada linea de techo de forma segura — este es exactamente el tipo de trabajo que hacemos todos los dias en instalaciones de canalones y sofito." },
      { q:"Configuran la app y la conectividad?", a:"Si. La configuracion basica y conectividad de la app estan incluidas con cada instalacion. Nos aseguramos de que las luces enciendan, se conecten a su telefono y las zonas funcionen correctamente antes de irnos." },
      { q:"En que areas de la casa pueden instalar luces?", a:"Instalamos a lo largo de lineas de techo, aleros, sofitos, tablas de fascia, marcos de garaje y otras superficies de montaje exteriores. Durante su consulta, discutiremos exactamente donde quiere las luces y planificaremos la ruta de instalacion mas limpia." },
      { q:"Cuanto tiempo toma la instalacion?", a:"La mayoria de las instalaciones residenciales de luces Govee se completan en una sola visita — generalmente medio dia dependiendo del tamano de su casa y la complejidad de la linea de techo. Le daremos un estimado de tiempo durante su consulta." },
    ],
    ctaTitle: "LISTO PARA ILUMINAR SU HOGAR?",
    ctaSub: "Obtenga su presupuesto de instalacion gratuito. Cuentenos sobre su casa y sus luces Govee — nosotros nos encargamos del resto con la misma artesania que llevamos a cada trabajo.",
    formTitle: "Obtenga Su Presupuesto de Instalacion Gratuito",
    formName: "Nombre Completo",
    formPhone: "Numero de Telefono",
    formEmail: "Correo Electronico",
    formZip: "Codigo Postal",
    formBtn: "SOLICITAR MI PRESUPUESTO DE INSTALACION",
    formDisclaimer: "Sin spam. Sin presion. Solo consejos honestos de expertos.",
    successTitle: "Solicitud de Presupuesto Recibida!",
    successMsg: "Nos pondremos en contacto en horas.",
    preferTalk: "Prefiere hablar?",
  },
};

export default function GoveeLightsPage() {
  const { lang } = useLanguage();
  const t = T[lang];
  const [formData, setFormData] = useState({name:"",phone:"",email:"",zip:""});
  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);
  useEffect(() => { injectFonts(); }, []);
  const sec = {padding:"80px 24px",maxWidth:"1200px",margin:"0 auto"};
  const secTitle = {fontFamily:f.h,fontSize:"clamp(24px,4vw,36px)",fontWeight:800,letterSpacing:"2px",textAlign:"center",marginBottom:"8px"};

  return (
    <div style={{background:C.bg,color:C.white,fontFamily:f.b,lineHeight:1.65,minHeight:"100vh"}}>
      <SiteNav />
      <div style={{padding:"16px 24px 0",maxWidth:"1200px",margin:"0 auto"}}>
        <div style={{fontFamily:f.b,fontSize:"13px",color:C.muted}}>{t.breadcrumb.map((item,i) => <span key={i}>{i>0&&<span style={{margin:"0 8px",opacity:0.5}}>/</span>}<span style={{color:i===t.breadcrumb.length-1?C.accent:C.muted}}>{item}</span></span>)}</div>
      </div>

      {/* HERO */}
      <section className="hero-stars" style={{padding:"60px 24px 80px",maxWidth:"1200px",margin:"0 auto",display:"flex",gap:"48px",alignItems:"center",flexWrap:"wrap"}}>
        <div style={{flex:"1 1 500px",minWidth:"300px"}}>
          <Tag>{t.heroTag}</Tag>
          <h1 style={{fontFamily:f.h,fontSize:"clamp(32px,5vw,48px)",fontWeight:800,lineHeight:1.1,marginBottom:"20px"}}>{t.heroH1}<br/><span style={{color:C.accent}}>{t.heroH1Accent}</span></h1>
          <p style={{fontFamily:f.b,fontSize:"18px",color:C.offWhite,lineHeight:1.7,marginBottom:"32px",maxWidth:"560px"}}>{t.heroP}</p>
          <div style={{display:"flex",gap:"16px",flexWrap:"wrap"}}>
            <button onClick={()=>document.getElementById("quote-form")?.scrollIntoView({behavior:"smooth"})} style={{padding:"16px 36px",fontFamily:f.h,fontSize:"14px",fontWeight:700,letterSpacing:"1.5px",color:C.white,background:`linear-gradient(135deg,${C.accent},${C.accentLight})`,border:"none",borderRadius:"8px",cursor:"pointer",boxShadow:"0 4px 16px rgba(147,51,234,0.3)"}}>{t.heroCta}</button>
            <a href="tel:8444443114" style={{display:"inline-flex",alignItems:"center",padding:"16px 36px",fontFamily:f.h,fontSize:"14px",fontWeight:700,letterSpacing:"1.5px",color:C.accent,background:"transparent",border:`2px solid ${C.accent}`,borderRadius:"8px",textDecoration:"none"}}>📞 {t.heroCall}</a>
          </div>
          <div style={{display:"flex",gap:"24px",marginTop:"32px",flexWrap:"wrap"}}>{t.stats.map((s,i) => <div key={i} style={{textAlign:"center"}}><div style={{fontFamily:f.h,fontSize:"28px",fontWeight:800,color:C.accent}}>{s.value}</div><div style={{fontFamily:f.b,fontSize:"12px",color:C.muted,maxWidth:"100px"}}>{s.label}</div></div>)}</div>
        </div>
      </section>

      {/* PROBLEM */}
      <section style={{background:C.navy,padding:"80px 24px"}}>
        <div style={{maxWidth:"1200px",margin:"0 auto",textAlign:"center"}}>
          <Tag>{t.problemTag}</Tag>
          <h2 style={{...secTitle,color:C.white}}>{t.problemTitle}</h2>
          <GoldBar />
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(250px,1fr))",gap:"24px",marginTop:"48px",textAlign:"left"}}>
            {t.problems.map((p,i) => <div key={i} style={{background:C.navyFade,border:`1px solid ${C.navyLight}`,borderRadius:"12px",padding:"28px",borderLeft:`4px solid ${C.accent}`}}><div style={{fontSize:"28px",marginBottom:"12px"}}>{p.icon}</div><h3 style={{fontFamily:f.h,fontSize:"17px",fontWeight:700,color:C.white,marginBottom:"8px"}}>{p.title}</h3><p style={{fontFamily:f.b,fontSize:"15px",color:C.muted,lineHeight:1.55}}>{p.desc}</p></div>)}
          </div>
        </div>
      </section>

      {/* SOLUTION */}
      <section style={{background:C.bg,padding:"80px 24px"}}>
        <div style={sec}>
          <div style={{textAlign:"center"}}><Tag>{t.solutionTag}</Tag><h2 style={{...secTitle,color:C.white}}>{t.solutionTitle}</h2><GoldBar /><p style={{fontFamily:f.b,fontSize:"17px",color:C.muted,maxWidth:"600px",margin:"0 auto 48px"}}>{t.solutionSub}</p></div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(340px,1fr))",gap:"20px"}}>
            {t.solutions.map((s,i) => <div key={i} style={{background:C.navyFade,border:`1px solid ${C.navyLight}`,borderRadius:"12px",padding:"28px",transition:"border-color 0.3s"}} onMouseOver={e=>e.currentTarget.style.borderColor=C.accent} onMouseOut={e=>e.currentTarget.style.borderColor=C.navyLight}><div style={{fontFamily:f.h,fontSize:"11px",fontWeight:700,color:C.accent,letterSpacing:"2px",marginBottom:"8px"}}>0{i+1}</div><h3 style={{fontFamily:f.h,fontSize:"17px",fontWeight:700,color:C.white,marginBottom:"10px"}}>{s.title}</h3><p style={{fontFamily:f.b,fontSize:"15px",color:C.muted,lineHeight:1.6}}>{s.desc}</p></div>)}
          </div>
        </div>
      </section>

      {/* PEAK 301 CALLOUT */}
      <section style={{background:"linear-gradient(135deg, rgba(177,26,33,0.08), rgba(15,30,54,0.97))",padding:"28px 24px",borderTop:"2px solid #B11A21",borderBottom:"2px solid #B11A21"}}>
        <div style={{maxWidth:"1000px",margin:"0 auto",display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:"20px"}}>
          <div style={{flex:"1 1 500px"}}>
            <div style={{display:"flex",alignItems:"center",gap:"8px",marginBottom:"8px"}}><span style={{fontSize:"16px"}}>⚠️</span><span style={{fontFamily:"'Montserrat', sans-serif",fontSize:"11px",fontWeight:700,color:"#B11A21",letterSpacing:"2px"}}>{t.peakAlertLabel}</span></div>
            <p style={{fontFamily:"'Montserrat', sans-serif",fontSize:"clamp(16px,2.5vw,20px)",fontWeight:800,color:"#FFFFFF",lineHeight:1.3,marginBottom:"6px"}}>{t.peakAlertTitle}</p>
            <p style={{fontFamily:"'Source Sans 3', sans-serif",fontSize:"14px",color:"#7A8FA8",lineHeight:1.5}}><strong style={{color:"#E8E4DC"}}>Peak 301</strong> {t.peakAlertDesc}</p>
          </div>
          <div style={{display:"flex",flexDirection:"column",gap:"8px",flexShrink:0}}>
            <a href="/peak-301" style={{padding:"12px 24px",fontFamily:"'Montserrat', sans-serif",fontSize:"12px",fontWeight:700,letterSpacing:"1px",color:"#FFFFFF",background:"linear-gradient(135deg, #B11A21, #D42A2A)",borderRadius:"6px",textDecoration:"none",textAlign:"center",boxShadow:"0 4px 12px rgba(177,26,33,0.3)"}}>{t.peakBtn}</a>
            <a href="/insurance-resource-center" style={{padding:"12px 24px",fontFamily:"'Montserrat', sans-serif",fontSize:"12px",fontWeight:700,letterSpacing:"1px",color:"#B11A21",border:"1.5px solid #B11A21",borderRadius:"6px",textDecoration:"none",textAlign:"center"}}>{t.peakRightsBtn}</a>
          </div>
        </div>
      </section>

      {/* GOLD STANDARD */}
      <section style={{background:C.navy,padding:"80px 24px"}}>
        <div style={sec}><div style={{textAlign:"center"}}><Tag>{t.goldTag}</Tag><h2 style={{...secTitle,color:C.white}}>{t.goldTitle}</h2><GoldBar /><p style={{fontFamily:f.b,fontSize:"17px",color:C.offWhite,fontStyle:"italic",maxWidth:"500px",margin:"0 auto 48px"}}>{t.goldSub}</p></div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(250px,1fr))",gap:"24px"}}>{t.goldSteps.map((step,i) => <div key={i} style={{background:C.navyFade,border:`1px solid ${C.navyLight}`,borderRadius:"12px",padding:"28px",position:"relative"}}><div style={{fontFamily:f.h,fontSize:"36px",fontWeight:800,color:"rgba(147,51,234,0.08)",position:"absolute",top:"16px",right:"20px"}}>{step.num}</div><div style={{fontFamily:f.h,fontSize:"11px",fontWeight:700,color:C.accent,letterSpacing:"3px",marginBottom:"8px"}}>{t.stepLabel} {step.num}</div><h3 style={{fontFamily:f.h,fontSize:"22px",fontWeight:700,color:C.white,marginBottom:"12px"}}>{step.title}</h3><p style={{fontFamily:f.b,fontSize:"15px",color:C.muted,lineHeight:1.6}}>{step.desc}</p></div>)}</div>
        </div>
      </section>

      {/* REVIEWS */}
      <section style={{background:C.bg,padding:"80px 24px"}}><div style={sec}><div style={{textAlign:"center"}}><Tag>{t.reviewsTag}</Tag><h2 style={{...secTitle,color:C.white}}>{t.reviewsTitle}</h2><GoldBar /></div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(300px,1fr))",gap:"20px",marginTop:"48px"}}>{t.reviews.map((rev,i) => <div key={i} style={{background:C.navyFade,border:`1px solid ${C.navyLight}`,borderRadius:"12px",padding:"28px"}}><Stars /><p style={{fontFamily:f.b,fontSize:"15px",color:C.offWhite,lineHeight:1.65,margin:"16px 0",fontStyle:"italic"}}>"{rev.text}"</p><div style={{borderTop:`1px solid ${C.navyLight}`,paddingTop:"12px",display:"flex",justifyContent:"space-between",alignItems:"center"}}><span style={{fontFamily:f.h,fontSize:"14px",fontWeight:600,color:C.white}}>{rev.name}</span><span style={{fontFamily:f.b,fontSize:"12px",color:C.muted}}>{rev.context}</span></div></div>)}</div></div></section>

      {/* FAQ */}
      <section style={{background:C.navy,padding:"80px 24px"}}><div style={{maxWidth:"800px",margin:"0 auto",textAlign:"center"}}><Tag>{t.faqTag}</Tag><h2 style={{...secTitle,color:C.white}}>{t.faqTitle}</h2><GoldBar />
        <div style={{marginTop:"40px",textAlign:"left"}}>{t.faqs.map((faq,i) => <div key={i} style={{borderBottom:`1px solid ${C.navyLight}`}}><button onClick={()=>setOpenFaq(openFaq===i?null:i)} style={{width:"100%",padding:"20px 0",background:"none",border:"none",cursor:"pointer",display:"flex",justifyContent:"space-between",alignItems:"center",gap:"16px"}}><span style={{fontFamily:f.h,fontSize:"15px",fontWeight:600,color:openFaq===i?C.accent:C.white,textAlign:"left",transition:"color 0.2s"}}>{faq.q}</span><span style={{fontFamily:f.h,fontSize:"20px",color:C.accent,transform:openFaq===i?"rotate(45deg)":"none",transition:"transform 0.3s",flexShrink:0}}>+</span></button>{openFaq===i&&<div style={{padding:"0 0 20px",fontFamily:f.b,fontSize:"15px",color:C.muted,lineHeight:1.65}}>{faq.a}</div>}</div>)}</div></div></section>

      {/* CTA FORM */}
      <section id="quote-form" style={{background:`linear-gradient(165deg,${C.navyMid},${C.navy})`,padding:"80px 24px"}}><div style={{maxWidth:"600px",margin:"0 auto",textAlign:"center"}}>
        <h2 style={{fontFamily:f.h,fontSize:"clamp(28px,5vw,40px)",fontWeight:800,color:C.white,marginBottom:"12px"}}>{t.ctaTitle}</h2>
        <p style={{fontFamily:f.b,fontSize:"17px",color:C.offWhite,marginBottom:"40px"}}>{t.ctaSub}</p>
        {submitted ? <div style={{background:C.successDim,border:`1px solid ${C.success}`,borderRadius:"12px",padding:"32px"}}><div style={{fontSize:"48px",marginBottom:"12px"}}>✓</div><h3 style={{fontFamily:f.h,fontSize:"20px",fontWeight:700,color:"#4ADE80"}}>{t.successTitle}</h3><p style={{fontFamily:f.b,fontSize:"15px",color:C.muted,marginTop:"8px"}}>{t.successMsg}</p></div> : <div style={{background:C.white,borderRadius:"16px",padding:"32px",boxShadow:"0 24px 80px rgba(0,0,0,0.4)",textAlign:"left"}}>
          <h3 style={{fontFamily:f.h,fontSize:"18px",fontWeight:700,color:C.navy,textAlign:"center",marginBottom:"4px"}}>{t.formTitle}</h3>
          <div style={{width:"40px",height:"3px",background:C.accent,borderRadius:"2px",margin:"10px auto 20px"}} />
          <input style={inputStyle} placeholder={t.formName} value={formData.name} onChange={e=>setFormData({...formData,name:e.target.value})} />
          <input style={inputStyle} placeholder={t.formPhone} type="tel" value={formData.phone} onChange={e=>setFormData({...formData,phone:e.target.value})} />
          <input style={inputStyle} placeholder={t.formEmail} type="email" value={formData.email} onChange={e=>setFormData({...formData,email:e.target.value})} />
          <input style={inputStyle} placeholder={t.formZip} value={formData.zip} onChange={e=>setFormData({...formData,zip:e.target.value})} maxLength={5} />
          <button onClick={()=>setSubmitted(true)} style={{width:"100%",padding:"16px",fontFamily:f.h,fontSize:"14px",fontWeight:700,letterSpacing:"1.5px",color:C.white,background:`linear-gradient(135deg,${C.accent},${C.accentLight})`,border:"none",borderRadius:"8px",cursor:"pointer",boxShadow:"0 4px 16px rgba(147,51,234,0.3)"}}>{t.formBtn}</button>
          <p style={{fontFamily:f.b,fontSize:"12px",color:"#9CA3AF",textAlign:"center",marginTop:"12px"}}>{t.formDisclaimer}</p>
        </div>}
        <div style={{marginTop:"32px"}}><p style={{fontFamily:f.b,fontSize:"15px",color:C.muted,marginBottom:"8px"}}>{t.preferTalk}</p><a href="tel:8444443114" style={{fontFamily:f.h,fontSize:"18px",fontWeight:700,color:C.accent,textDecoration:"none"}}>📞 (844) 444-3114</a></div>
      </div></section>

      <SiteFooter />
      <MobileCTA scrollTarget="quote-form" />
      <style>{`*{box-sizing:border-box;margin:0;padding:0}::placeholder{color:#9CA3AF}input:focus{border-color:${C.accent}!important}`}</style>
    </div>
  );
}
