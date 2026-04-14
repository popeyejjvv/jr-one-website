"use client";

import { useState, useEffect } from "react";
import { useLanguage } from "../../lib/LanguageContext";
import SiteNav from "../../components/SiteNav";
import SiteFooter from "../../components/SiteFooter";
import MobileCTA from "../../components/MobileCTA";

const injectFonts = () => { if (typeof document==="undefined"||document.querySelector("#jr-fonts")) return; const l=document.createElement("link"); l.id="jr-fonts"; l.rel="stylesheet"; l.href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800&family=Source+Sans+3:wght@300;400;600&display=swap"; document.head.appendChild(l); };
const C = { bg:"#0B1628",navy:"#1B2A4A",navyMid:"#243556",navyLight:"#2C3E5A",navyFade:"#162033",gold:"#C8952E",goldLight:"#D4A843",goldPale:"rgba(200,149,46,0.12)",cream:"#F5F3EF",white:"#FFFFFF",offWhite:"#E8E4DC",muted:"#7A8FA8",charcoal:"#2D2D2D",success:"#2D8B4E",successDim:"rgba(45,139,78,0.15)",accent:"#0D9488",accentLight:"#14B8A6",accentPale:"rgba(13,148,136,0.12)" };
const f = { h:"'Montserrat', sans-serif", b:"'Source Sans 3', sans-serif" };
const Tag = ({children}) => <div style={{display:"inline-block",padding:"6px 16px",background:C.accentPale,borderRadius:"4px",marginBottom:"12px"}}><span style={{fontFamily:f.h,fontSize:"12px",fontWeight:700,color:C.accent,letterSpacing:"3px"}}>{children}</span></div>;
const GoldBar = () => <div style={{width:"60px",height:"3px",background:`linear-gradient(90deg,${C.accent},${C.accentLight})`,borderRadius:"2px",margin:"16px auto"}} />;
const Stars = () => <span style={{color:C.gold,fontSize:"14px",letterSpacing:"2px"}}>★★★★★</span>;
const inputStyle = {width:"100%",padding:"13px 16px",fontFamily:f.b,fontSize:"15px",border:"1.5px solid #D1D5DB",borderRadius:"8px",outline:"none",color:C.charcoal,marginBottom:"12px",background:"#FAFAFA",boxSizing:"border-box"};

const T = {
  en: {
    breadcrumb: ["Home","Services","Service Plans"],
    heroTag: "GUTTER MAINTENANCE PLANS",
    heroH1: "Keep Your Gutters",
    heroH1Accent: "Working Year-Round.",
    heroP: "Regular maintenance extends your gutter system's lifespan, prevents expensive damage, and keeps your home protected through Florida's toughest weather. Three service levels to fit every home and budget.",
    heroCta: "SCHEDULE MAINTENANCE",
    heroCall: "CALL (844) 444-3114",
    stats: [
      { value:"2,000+", label:"Gutter systems maintained" },
      { value:"30+", label:"Years of experience" },
      { value:"3", label:"Service tiers available" },
      { value:"0", label:"Subcontractors — ever" },
    ],
    problemTag: "THE PROBLEM",
    problemTitle: "WHAT HAPPENS WHEN YOU SKIP GUTTER MAINTENANCE",
    problems: [
      { icon:"🍂", title:"Clogged gutters overflow", desc:"Leaves, pine needles, and debris pile up fast in Florida. When gutters clog, water pours over the edges — straight down your walls, into your foundation, and behind your fascia boards." },
      { icon:"🦟", title:"Standing water breeds pests", desc:"Clogged gutters hold stagnant water — the perfect breeding ground for mosquitoes, mold, and algae. That standing water also accelerates rust and corrosion from the inside out." },
      { icon:"💧", title:"Leaking joints go unnoticed", desc:"Miters and seams separate over time. Small leaks turn into fascia rot, soffit staining, and foundation erosion. By the time you see damage, the repair bill has tripled." },
      { icon:"🏠", title:"Neglect kills your investment", desc:"A gutter system that cost thousands to install can fail in just a few years without maintenance. Regular cleaning and inspection is the cheapest insurance your home has." },
    ],
    planTag: "THE JR ONE DIFFERENCE",
    planTitle: "THREE PLANS. ZERO GUESSWORK.",
    planSub: "Every plan includes professional-grade cleaning by our own crews — no subcontractors, no shortcuts.",
    mostPopular: "MOST POPULAR",
    getStarted: "GET STARTED",
    learnMore: "LEARN MORE",
    bestFor: "BEST FOR: ",
    plans: [
      {
        name:"LEAF CLEANING",
        tag:"BASIC",
        price:"Call for Pricing",
        desc:"Essential debris removal — blow it out, clean it up, get it flowing.",
        features:["Blow off roof debris around gutter line","Blow out all gutters — remove leaves, needles, buildup","Blow out all downspouts to confirm clear flow","Full cleanup of all debris from property","Visual inspection for obvious damage or issues"],
        best:"Homeowners who maintain regularly and need a straightforward seasonal cleanout.",
        highlight:false,
      },
      {
        name:"PREMIUM CLEANING",
        tag:"RECOMMENDED",
        price:"Call for Pricing",
        desc:"Everything in Basic plus a full water flush, gunk removal, and leak sealing.",
        features:["Everything in Leaf Cleaning","Full water wash of all gutters — removes stuck-on gunk and sediment","Complete water flush of all downspouts","Seal any obvious leaking miters (corner joints)","System flow verification — confirm water moves correctly throughout","Written condition report with photos"],
        best:"Most homeowners. The thorough clean that catches problems before they get expensive.",
        highlight:true,
      },
      {
        name:"DELUXE GUARD PACKAGE",
        tag:"PREMIUM",
        price:"Call for Pricing",
        desc:"Complete system restoration — clean, realign, reseal, and protect with new guards.",
        features:["Everything in Premium Cleaning","Resecuring and realigning all gutters","Resecuring and realigning all downspouts","Functional flow testing — make sure everything drains correctly","Resealing ALL miters throughout the system","Professional installation of new leaf guards","Guard system sized and fitted to your specific gutters"],
        best:"Homeowners who want everything dialed in — cleaned, aligned, sealed, and protected.",
        highlight:false,
      },
    ],
    alaCarteTag: "ADDITIONAL SERVICES",
    alaCarteTitle: "A LA CARTE MAINTENANCE",
    alaCarte: [
      { title:"Downspout Repair", desc:"Repair of damaged or disconnected downspout sections, resecuring to structure, and sealing of leak points." },
      { title:"Gutter Guard Re-Installation", desc:"Resecure or reinstall existing gutter guards that have shifted, lifted, or been displaced by storms." },
      { title:"Wood Fascia Replacement", desc:"Repair or replacement of damaged exterior wood fascia, framing, or trim. Custom-cut, secured, and sealed." },
      { title:"General Gutter Repair", desc:"Leak sealing, hanger replacement, realignment, pitch correction — quoted based on scope after inspection." },
    ],
    peakAlertLabel: "FLORIDA INSURANCE ALERT",
    peakAlertTitle: "280% Increase in Non-Renewals — Roof Over 15 Years Old?",
    peakAlertDesc: "restores shingles from the inside out — adds 6–10 years of roof life and comes with the warranty docs Florida carriers need to see when evaluating your renewal.",
    peakBtn: "PEAK 301 INFO →",
    peakRightsBtn: "YOUR RIGHTS →",
    goldTag: "THE GOLD STANDARD",
    goldTitle: "OUR MAINTENANCE PROCESS",
    goldSub: "Every home. Every time. No exceptions.",
    goldSteps: [
      { num:"01", title:"INSPECT", desc:"We evaluate your entire gutter system — checking for clogs, leaks, loose hangers, misalignment, and fascia condition. Photos included." },
      { num:"02", title:"CLEAN", desc:"Debris removal, gutter blowout, downspout clearing, and full property cleanup. Your system flows again." },
      { num:"03", title:"REPAIR", desc:"Seal leaking miters, resecure loose sections, realign pitch, and fix any issues found during inspection." },
      { num:"04", title:"PROTECT", desc:"Optional leaf guard installation, condition report with photos, and scheduling for your next service visit." },
    ],
    stepLabel: "STEP",
    faqTag: "FAQ",
    faqTitle: "MAINTENANCE QUESTIONS",
    faqs: [
      { q:"How often should I have my gutters cleaned in Tampa?", a:"We recommend at least twice per year — once before hurricane season (May/June) and once after fall leaf drop (November/December). Homes with heavy tree coverage or pine trees may benefit from quarterly cleaning." },
      { q:"Can I just get a one-time cleaning without a plan?", a:"Yes. All of our cleaning services are available as one-time visits. Plans simply give you the convenience of scheduled service at consistent pricing — you're not locked into a contract." },
      { q:"What's the difference between Leaf Cleaning and Premium Cleaning?", a:"Leaf Cleaning removes debris from your gutters and clears downspouts. Premium Cleaning adds a full system flush to verify flow throughout the entire system, plus resealing of miters (corner joints) and resecuring of downspouts. Premium catches developing problems that basic cleaning misses." },
      { q:"Do you offer the Deluxe Guard Package for existing guard systems?", a:"The Deluxe Guard Package includes new guard installation. If you already have guards, we offer guard maintenance as part of our Premium Cleaning — clearing surface debris, checking attachment points, and ensuring proper function." },
      { q:"What does 'resealing miters' mean?", a:"Miters are the corner joints where two gutter runs meet. Over time, the sealant at these joints can crack or separate, causing leaks. Resealing miters during maintenance prevents these leaks before they damage your fascia or foundation." },
      { q:"Do you service gutters you didn't install?", a:"Yes. Our maintenance services are available for any gutter system, regardless of who installed it. We'll assess the condition and let you know if any repairs are needed beyond cleaning." },
    ],
    ctaTitle: "SCHEDULE YOUR GUTTER MAINTENANCE",
    ctaSub: "Tell us which plan interests you and we'll get you scheduled. No contracts, no pressure — just professional maintenance that protects your home.",
    formTitle: "Schedule Your Gutter Maintenance",
    formName: "Full Name",
    formPhone: "Phone Number",
    formEmail: "Email Address",
    formZip: "ZIP Code",
    formBtn: "SCHEDULE MY MAINTENANCE",
    formDisclaimer: "No spam. No pressure. Just professional maintenance.",
    successTitle: "Request Received!",
    successMsg: "We'll get back to you within hours.",
    preferTalk: "Prefer to talk?",
    planSelectOptions: ["Which plan interests you?","Leaf Cleaning (Basic)","Premium Cleaning (Recommended)","Deluxe Guard Package","Not sure — need advice","One-time cleaning only"],
  },
  es: {
    breadcrumb: ["Inicio","Servicios","Planes de Servicio"],
    heroTag: "PLANES DE MANTENIMIENTO DE CANALONES",
    heroH1: "Mantenga Sus Canalones",
    heroH1Accent: "Funcionando Todo el Ano.",
    heroP: "El mantenimiento regular extiende la vida de su sistema de canalones, previene danos costosos y mantiene su hogar protegido durante el clima mas severo de Florida. Tres niveles de servicio para cada casa y presupuesto.",
    heroCta: "PROGRAMAR MANTENIMIENTO",
    heroCall: "LLAME AL (844) 444-3114",
    stats: [
      { value:"2,000+", label:"Sistemas de canalones mantenidos" },
      { value:"30+", label:"Anos de experiencia" },
      { value:"3", label:"Niveles de servicio" },
      { value:"0", label:"Subcontratistas — nunca" },
    ],
    problemTag: "EL PROBLEMA",
    problemTitle: "QUE PASA CUANDO OMITE EL MANTENIMIENTO DE CANALONES",
    problems: [
      { icon:"🍂", title:"Los canalones tapados se desbordan", desc:"Hojas, agujas de pino y escombros se acumulan rapido en Florida. Cuando los canalones se tapan, el agua se desborda — directo por sus paredes, hacia sus cimientos y detras de las tablas de fascia." },
      { icon:"🦟", title:"El agua estancada cria plagas", desc:"Los canalones tapados retienen agua estancada — el caldo de cultivo perfecto para mosquitos, moho y algas. Esa agua estancada tambien acelera la oxidacion y corrosion desde adentro." },
      { icon:"💧", title:"Las juntas con fugas pasan desapercibidas", desc:"Las esquinas y uniones se separan con el tiempo. Las pequenas fugas se convierten en pudricion de fascia, manchas de sofito y erosion de cimientos. Para cuando ve el dano, la factura de reparacion se ha triplicado." },
      { icon:"🏠", title:"El descuido destruye su inversion", desc:"Un sistema de canalones que costo miles en instalar puede fallar en solo unos anos sin mantenimiento. La limpieza e inspeccion regular es el seguro mas barato que tiene su casa." },
    ],
    planTag: "LA DIFERENCIA JR ONE",
    planTitle: "TRES PLANES. CERO DUDAS.",
    planSub: "Cada plan incluye limpieza de grado profesional por nuestros propios equipos — sin subcontratistas, sin atajos.",
    mostPopular: "MAS POPULAR",
    getStarted: "COMENZAR",
    learnMore: "MAS INFO",
    bestFor: "IDEAL PARA: ",
    plans: [
      {
        name:"LIMPIEZA DE HOJAS",
        tag:"BASICO",
        price:"Llame para Precio",
        desc:"Remocion esencial de escombros — soplado, limpieza y restauracion del flujo.",
        features:["Soplar escombros del techo alrededor de la linea del canalon","Soplar todos los canalones — remover hojas, agujas, acumulacion","Soplar todos los bajantes para confirmar flujo libre","Limpieza completa de todos los escombros de la propiedad","Inspeccion visual por danos obvios o problemas"],
        best:"Propietarios que mantienen regularmente y necesitan una limpieza estacional directa.",
        highlight:false,
      },
      {
        name:"LIMPIEZA PREMIUM",
        tag:"RECOMENDADO",
        price:"Llame para Precio",
        desc:"Todo en Basico mas lavado completo con agua, remocion de suciedad y sellado de fugas.",
        features:["Todo en Limpieza de Hojas","Lavado completo con agua de todos los canalones — remueve suciedad y sedimento adherido","Lavado completo con agua de todos los bajantes","Sellar cualquier esquina con fuga obvia (juntas de esquina)","Verificacion de flujo del sistema — confirmar que el agua se mueve correctamente","Reporte de condicion escrito con fotos"],
        best:"La mayoria de propietarios. La limpieza exhaustiva que detecta problemas antes de que se vuelvan costosos.",
        highlight:true,
      },
      {
        name:"PAQUETE DELUXE CON GUARDAS",
        tag:"PREMIUM",
        price:"Llame para Precio",
        desc:"Restauracion completa del sistema — limpieza, realineacion, resellado y proteccion con guardas nuevas.",
        features:["Todo en Limpieza Premium","Reasegurar y realinear todos los canalones","Reasegurar y realinear todos los bajantes","Prueba de flujo funcional — asegurar que todo drena correctamente","Resellado de TODAS las esquinas en todo el sistema","Instalacion profesional de guardas de hojas nuevas","Sistema de guardas dimensionado y ajustado a sus canalones especificos"],
        best:"Propietarios que quieren todo en perfecto estado — limpio, alineado, sellado y protegido.",
        highlight:false,
      },
    ],
    alaCarteTag: "SERVICIOS ADICIONALES",
    alaCarteTitle: "MANTENIMIENTO A LA CARTA",
    alaCarte: [
      { title:"Reparacion de Bajantes", desc:"Reparacion de secciones de bajante danadas o desconectadas, reasegurar a la estructura y sellado de puntos de fuga." },
      { title:"Reinstalacion de Guardas", desc:"Reasegurar o reinstalar guardas de canalones existentes que se han movido, levantado o desplazado por tormentas." },
      { title:"Reemplazo de Fascia de Madera", desc:"Reparacion o reemplazo de fascia de madera exterior danada, marcos o molduras. Corte personalizado, asegurado y sellado." },
      { title:"Reparacion General de Canalones", desc:"Sellado de fugas, reemplazo de ganchos, realineacion, correccion de pendiente — presupuesto basado en alcance despues de inspeccion." },
    ],
    peakAlertLabel: "ALERTA DE SEGUROS DE FLORIDA",
    peakAlertTitle: "280% de Aumento en No Renovaciones — Techo de Mas de 15 Anos?",
    peakAlertDesc: "restaura las tejas desde adentro — agrega 6–10 anos de vida al techo y viene con los documentos de garantia que las aseguradoras de FL necesitan ver al evaluar su renovacion.",
    peakBtn: "INFO PEAK 301 →",
    peakRightsBtn: "SUS DERECHOS →",
    goldTag: "EL ESTANDAR DE ORO",
    goldTitle: "NUESTRO PROCESO DE MANTENIMIENTO",
    goldSub: "Cada casa. Cada vez. Sin excepciones.",
    goldSteps: [
      { num:"01", title:"INSPECCIONAR", desc:"Evaluamos todo su sistema de canalones — revisando obstrucciones, fugas, ganchos sueltos, desalineacion y condicion de la fascia. Fotos incluidas." },
      { num:"02", title:"LIMPIAR", desc:"Remocion de escombros, soplado de canalones, limpieza de bajantes y limpieza completa de la propiedad. Su sistema fluye de nuevo." },
      { num:"03", title:"REPARAR", desc:"Sellar esquinas con fugas, reasegurar secciones sueltas, realinear pendiente y reparar cualquier problema encontrado durante la inspeccion." },
      { num:"04", title:"PROTEGER", desc:"Instalacion opcional de guardas de hojas, reporte de condicion con fotos y programacion de su proxima visita de servicio." },
    ],
    stepLabel: "PASO",
    faqTag: "PREGUNTAS FRECUENTES",
    faqTitle: "PREGUNTAS DE MANTENIMIENTO",
    faqs: [
      { q:"Con que frecuencia debo limpiar mis canalones en Tampa?", a:"Recomendamos al menos dos veces al ano — una antes de la temporada de huracanes (mayo/junio) y otra despues de la caida de hojas de otono (noviembre/diciembre). Casas con mucha cobertura de arboles o pinos pueden beneficiarse de limpieza trimestral." },
      { q:"Puedo obtener solo una limpieza unica sin plan?", a:"Si. Todos nuestros servicios de limpieza estan disponibles como visitas unicas. Los planes simplemente le dan la conveniencia de servicio programado a precios consistentes — no esta atado a un contrato." },
      { q:"Cual es la diferencia entre Limpieza de Hojas y Limpieza Premium?", a:"La Limpieza de Hojas remueve escombros de sus canalones y limpia los bajantes. La Limpieza Premium agrega un lavado completo del sistema para verificar el flujo en todo el sistema, mas resellado de esquinas (juntas) y reasegurar bajantes. Premium detecta problemas en desarrollo que la limpieza basica no detecta." },
      { q:"Ofrecen el Paquete Deluxe para sistemas de guardas existentes?", a:"El Paquete Deluxe incluye instalacion de guardas nuevas. Si ya tiene guardas, ofrecemos mantenimiento de guardas como parte de nuestra Limpieza Premium — limpiando escombros de superficie, revisando puntos de anclaje y asegurando funcionamiento adecuado." },
      { q:"Que significa 'resellar esquinas'?", a:"Las esquinas son las juntas donde dos tramos de canalon se encuentran. Con el tiempo, el sellador en estas juntas puede agrietarse o separarse, causando fugas. Resellar esquinas durante el mantenimiento previene estas fugas antes de que danen su fascia o cimientos." },
      { q:"Dan servicio a canalones que no instalaron?", a:"Si. Nuestros servicios de mantenimiento estan disponibles para cualquier sistema de canalones, sin importar quien lo instalo. Evaluaremos la condicion y le informaremos si se necesitan reparaciones mas alla de la limpieza." },
    ],
    ctaTitle: "PROGRAME SU MANTENIMIENTO DE CANALONES",
    ctaSub: "Diganos que plan le interesa y lo programaremos. Sin contratos, sin presion — solo mantenimiento profesional que protege su hogar.",
    formTitle: "Programe Su Mantenimiento de Canalones",
    formName: "Nombre Completo",
    formPhone: "Numero de Telefono",
    formEmail: "Correo Electronico",
    formZip: "Codigo Postal",
    formBtn: "PROGRAMAR MI MANTENIMIENTO",
    formDisclaimer: "Sin spam. Sin presion. Solo mantenimiento profesional.",
    successTitle: "Solicitud Recibida!",
    successMsg: "Nos pondremos en contacto en horas.",
    preferTalk: "Prefiere hablar?",
    planSelectOptions: ["Que plan le interesa?","Limpieza de Hojas (Basico)","Limpieza Premium (Recomendado)","Paquete Deluxe con Guardas","No estoy seguro — necesito consejo","Solo limpieza unica"],
  },
};

export default function ServicePlansPage() {
  const { lang } = useLanguage();
  const t = T[lang];
  const [formData, setFormData] = useState({name:"",phone:"",email:"",zip:"",plan:""});
  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);
  useEffect(() => { injectFonts(); }, []);
  const sec = {padding:"80px 24px",maxWidth:"1200px",margin:"0 auto"};
  const secTitle = {fontFamily:f.h,fontSize:"clamp(24px,4vw,36px)",fontWeight:800,letterSpacing:"2px",textAlign:"center",marginBottom:"8px"};

  return (
    <div style={{background:C.bg,color:C.white,fontFamily:f.b,lineHeight:1.65,minHeight:"100vh"}}>
      <SiteNav />
      <div style={{padding:"16px 24px 0",maxWidth:"1200px",margin:"0 auto"}}><div style={{fontFamily:f.b,fontSize:"13px",color:C.muted}}>{t.breadcrumb.map((item,i) => <span key={i}>{i>0&&<span style={{margin:"0 8px",opacity:0.5}}>/</span>}<span style={{color:i===t.breadcrumb.length-1?C.accent:C.muted}}>{item}</span></span>)}</div></div>

      {/* HERO */}
      <section className="hero-stars" style={{padding:"60px 24px 80px",maxWidth:"1200px",margin:"0 auto",display:"flex",gap:"48px",alignItems:"center",flexWrap:"wrap"}}>
        <div style={{flex:"1 1 500px",minWidth:"300px"}}>
          <Tag>{t.heroTag}</Tag>
          <h1 style={{fontFamily:f.h,fontSize:"clamp(32px,5vw,48px)",fontWeight:800,lineHeight:1.1,marginBottom:"20px"}}>{t.heroH1}<br/><span style={{color:C.accent}}>{t.heroH1Accent}</span></h1>
          <p style={{fontFamily:f.b,fontSize:"18px",color:C.offWhite,lineHeight:1.7,marginBottom:"32px",maxWidth:"560px"}}>{t.heroP}</p>
          <div style={{display:"flex",gap:"16px",flexWrap:"wrap"}}><button onClick={()=>document.getElementById("quote-form")?.scrollIntoView({behavior:"smooth"})} style={{padding:"16px 36px",fontFamily:f.h,fontSize:"14px",fontWeight:700,letterSpacing:"1.5px",color:C.white,background:`linear-gradient(135deg,${C.accent},${C.accentLight})`,border:"none",borderRadius:"8px",cursor:"pointer",boxShadow:"0 4px 16px rgba(13,148,136,0.3)"}}>{t.heroCta}</button><a href="tel:8444443114" style={{display:"inline-flex",alignItems:"center",padding:"16px 36px",fontFamily:f.h,fontSize:"14px",fontWeight:700,letterSpacing:"1.5px",color:C.accent,border:`2px solid ${C.accent}`,borderRadius:"8px",textDecoration:"none"}}>📞 {t.heroCall}</a></div>
          <div style={{display:"flex",gap:"24px",marginTop:"32px",flexWrap:"wrap"}}>{t.stats.map((s,i) => <div key={i} style={{textAlign:"center"}}><div style={{fontFamily:f.h,fontSize:"28px",fontWeight:800,color:C.accent}}>{s.value}</div><div style={{fontFamily:f.b,fontSize:"12px",color:C.muted,maxWidth:"100px"}}>{s.label}</div></div>)}</div>
        </div>
      </section>

      {/* PROBLEM */}
      <section style={{background:C.navy,padding:"80px 24px"}}><div style={{maxWidth:"1200px",margin:"0 auto",textAlign:"center"}}><Tag>{t.problemTag}</Tag><h2 style={{...secTitle,color:C.white}}>{t.problemTitle}</h2><GoldBar /><div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(250px,1fr))",gap:"24px",marginTop:"48px",textAlign:"left"}}>{t.problems.map((p,i) => <div key={i} style={{background:C.navyFade,border:`1px solid ${C.navyLight}`,borderRadius:"12px",padding:"28px",borderLeft:`4px solid ${C.accent}`}}><div style={{fontSize:"28px",marginBottom:"12px"}}>{p.icon}</div><h3 style={{fontFamily:f.h,fontSize:"17px",fontWeight:700,color:C.white,marginBottom:"8px"}}>{p.title}</h3><p style={{fontFamily:f.b,fontSize:"15px",color:C.muted,lineHeight:1.55}}>{p.desc}</p></div>)}</div></div></section>

      {/* PLAN TIERS */}
      <section style={{background:C.bg,padding:"80px 24px"}}><div style={sec}><div style={{textAlign:"center"}}><Tag>{t.planTag}</Tag><h2 style={{...secTitle,color:C.white}}>{t.planTitle}</h2><GoldBar /><p style={{fontFamily:f.b,fontSize:"17px",color:C.muted,maxWidth:"600px",margin:"0 auto 48px"}}>{t.planSub}</p></div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(320px,1fr))",gap:"24px",alignItems:"start"}}>
          {t.plans.map((plan,i) => (
            <div key={i} style={{background:C.navyFade,border:plan.highlight?`2px solid ${C.accent}`:`1px solid ${C.navyLight}`,borderRadius:"16px",padding:"32px",position:"relative",transform:plan.highlight?"scale(1.03)":"none",transition:"border-color 0.3s"}} onMouseOver={e=>{if(!plan.highlight)e.currentTarget.style.borderColor=C.accent}} onMouseOut={e=>{if(!plan.highlight)e.currentTarget.style.borderColor=C.navyLight}}>
              {plan.highlight && <div style={{position:"absolute",top:"-14px",left:"50%",transform:"translateX(-50%)",background:`linear-gradient(135deg,${C.accent},${C.accentLight})`,color:C.white,fontFamily:f.h,fontSize:"11px",fontWeight:700,letterSpacing:"1.5px",padding:"4px 16px",borderRadius:"4px"}}>{t.mostPopular}</div>}
              <div style={{fontFamily:f.h,fontSize:"11px",fontWeight:700,color:plan.highlight?C.accent:C.muted,letterSpacing:"2px",marginBottom:"8px"}}>{plan.tag}</div>
              <h3 style={{fontFamily:f.h,fontSize:"22px",fontWeight:800,color:C.white,marginBottom:"8px"}}>{plan.name}</h3>
              <div style={{fontFamily:f.h,fontSize:"18px",fontWeight:700,color:C.accent,marginBottom:"12px"}}>{plan.price}</div>
              <p style={{fontFamily:f.b,fontSize:"15px",color:C.muted,marginBottom:"20px",lineHeight:1.55}}>{plan.desc}</p>
              <div style={{borderTop:`1px solid ${C.navyLight}`,paddingTop:"16px",marginBottom:"16px"}}>
                {plan.features.map((feat,j) => (
                  <div key={j} style={{display:"flex",gap:"10px",marginBottom:"10px",alignItems:"flex-start"}}>
                    <span style={{color:C.accent,fontSize:"14px",flexShrink:0,marginTop:"2px"}}>✓</span>
                    <span style={{fontFamily:f.b,fontSize:"14px",color:C.offWhite}}>{feat}</span>
                  </div>
                ))}
              </div>
              <div style={{background:C.accentPale,borderRadius:"8px",padding:"12px 14px",marginBottom:"20px"}}>
                <span style={{fontFamily:f.h,fontSize:"11px",fontWeight:700,color:C.accent,letterSpacing:"1px"}}>{t.bestFor}</span>
                <span style={{fontFamily:f.b,fontSize:"13px",color:C.offWhite}}>{plan.best}</span>
              </div>
              <button onClick={()=>document.getElementById("quote-form")?.scrollIntoView({behavior:"smooth"})} style={{width:"100%",padding:"14px",fontFamily:f.h,fontSize:"13px",fontWeight:700,letterSpacing:"1.5px",color:plan.highlight?C.white:C.accent,background:plan.highlight?`linear-gradient(135deg,${C.accent},${C.accentLight})`:"transparent",border:plan.highlight?"none":`2px solid ${C.accent}`,borderRadius:"8px",cursor:"pointer",boxShadow:plan.highlight?"0 4px 16px rgba(13,148,136,0.3)":"none"}}>
                {plan.highlight?t.getStarted:t.learnMore}
              </button>
            </div>
          ))}
        </div>

        {/* A LA CARTE */}
        <div style={{marginTop:"64px",textAlign:"center"}}><Tag>{t.alaCarteTag}</Tag><h2 style={{...secTitle,color:C.white}}>{t.alaCarteTitle}</h2><GoldBar /></div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(250px,1fr))",gap:"16px",marginTop:"40px"}}>
          {t.alaCarte.map((svc,i) =>
            <div key={i} style={{background:C.navyFade,border:`1px solid ${C.navyLight}`,borderRadius:"12px",padding:"20px",transition:"border-color 0.3s"}} onMouseOver={e=>e.currentTarget.style.borderColor=C.accent} onMouseOut={e=>e.currentTarget.style.borderColor=C.navyLight}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"8px"}}>
                <h3 style={{fontFamily:f.h,fontSize:"15px",fontWeight:700,color:C.white}}>{svc.title}</h3>
                <span style={{fontFamily:f.h,fontSize:"16px",color:C.accent}}>✓</span>
              </div>
              <p style={{fontFamily:f.b,fontSize:"14px",color:C.muted,lineHeight:1.5}}>{svc.desc}</p>
            </div>
          )}
        </div>
      </div></section>

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
      <section style={{background:C.navy,padding:"80px 24px"}}><div style={sec}><div style={{textAlign:"center"}}><Tag>{t.goldTag}</Tag><h2 style={{...secTitle,color:C.white}}>{t.goldTitle}</h2><GoldBar /><p style={{fontFamily:f.b,fontSize:"17px",color:C.offWhite,fontStyle:"italic",maxWidth:"500px",margin:"0 auto 48px"}}>{t.goldSub}</p></div><div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(250px,1fr))",gap:"24px"}}>{t.goldSteps.map((step,i) => <div key={i} style={{background:C.navyFade,border:`1px solid ${C.navyLight}`,borderRadius:"12px",padding:"28px",position:"relative"}}><div style={{fontFamily:f.h,fontSize:"36px",fontWeight:800,color:"rgba(13,148,136,0.08)",position:"absolute",top:"16px",right:"20px"}}>{step.num}</div><div style={{fontFamily:f.h,fontSize:"11px",fontWeight:700,color:C.accent,letterSpacing:"3px",marginBottom:"8px"}}>{t.stepLabel} {step.num}</div><h3 style={{fontFamily:f.h,fontSize:"22px",fontWeight:700,color:C.white,marginBottom:"12px"}}>{step.title}</h3><p style={{fontFamily:f.b,fontSize:"15px",color:C.muted,lineHeight:1.6}}>{step.desc}</p></div>)}</div></div></section>

      {/* FAQ */}
      <section style={{background:C.bg,padding:"80px 24px"}}><div style={{maxWidth:"800px",margin:"0 auto",textAlign:"center"}}><Tag>{t.faqTag}</Tag><h2 style={{...secTitle,color:C.white}}>{t.faqTitle}</h2><GoldBar /><div style={{marginTop:"40px",textAlign:"left"}}>{t.faqs.map((faq,i) => <div key={i} style={{borderBottom:`1px solid ${C.navyLight}`}}><button onClick={()=>setOpenFaq(openFaq===i?null:i)} style={{width:"100%",padding:"20px 0",background:"none",border:"none",cursor:"pointer",display:"flex",justifyContent:"space-between",alignItems:"center",gap:"16px"}}><span style={{fontFamily:f.h,fontSize:"15px",fontWeight:600,color:openFaq===i?C.accent:C.white,textAlign:"left",transition:"color 0.2s"}}>{faq.q}</span><span style={{fontFamily:f.h,fontSize:"20px",color:C.accent,transform:openFaq===i?"rotate(45deg)":"none",transition:"transform 0.3s",flexShrink:0}}>+</span></button>{openFaq===i&&<div style={{padding:"0 0 20px",fontFamily:f.b,fontSize:"15px",color:C.muted,lineHeight:1.65}}>{faq.a}</div>}</div>)}</div></div></section>

      {/* CTA FORM */}
      <section id="quote-form" style={{background:`linear-gradient(165deg,${C.navyMid},${C.navy})`,padding:"80px 24px"}}><div style={{maxWidth:"600px",margin:"0 auto",textAlign:"center"}}>
        <h2 style={{fontFamily:f.h,fontSize:"clamp(28px,5vw,40px)",fontWeight:800,color:C.white,marginBottom:"12px"}}>{t.ctaTitle}</h2>
        <p style={{fontFamily:f.b,fontSize:"17px",color:C.offWhite,marginBottom:"40px"}}>{t.ctaSub}</p>
        {submitted ? <div style={{background:C.successDim,border:`1px solid ${C.success}`,borderRadius:"12px",padding:"32px"}}><div style={{fontSize:"48px",marginBottom:"12px"}}>✓</div><h3 style={{fontFamily:f.h,fontSize:"20px",fontWeight:700,color:"#4ADE80"}}>{t.successTitle}</h3><p style={{fontFamily:f.b,fontSize:"15px",color:C.muted,marginTop:"8px"}}>{t.successMsg}</p></div> : <div style={{background:C.navyFade,border:`1px solid ${C.navyLight}`,borderRadius:"16px",padding:"32px",boxShadow:"0 24px 80px rgba(0,0,0,0.4)",textAlign:"left"}}>
          <h3 style={{fontFamily:f.h,fontSize:"18px",fontWeight:700,color:C.white,textAlign:"center",marginBottom:"4px"}}>{t.formTitle}</h3>
          <div style={{width:"40px",height:"3px",background:C.accent,borderRadius:"2px",margin:"10px auto 20px"}} />
          <input style={{...inputStyle,background:C.navy,border:`1.5px solid ${C.navyLight}`,color:C.white}} placeholder={t.formName} value={formData.name} onChange={e=>setFormData({...formData,name:e.target.value})} />
          <input style={{...inputStyle,background:C.navy,border:`1.5px solid ${C.navyLight}`,color:C.white}} placeholder={t.formPhone} type="tel" value={formData.phone} onChange={e=>setFormData({...formData,phone:e.target.value})} />
          <input style={{...inputStyle,background:C.navy,border:`1.5px solid ${C.navyLight}`,color:C.white}} placeholder={t.formEmail} type="email" value={formData.email} onChange={e=>setFormData({...formData,email:e.target.value})} />
          <input style={{...inputStyle,background:C.navy,border:`1.5px solid ${C.navyLight}`,color:C.white}} placeholder={t.formZip} value={formData.zip} onChange={e=>setFormData({...formData,zip:e.target.value})} maxLength={5} />
          <select style={{...inputStyle,background:C.navy,border:`1.5px solid ${C.navyLight}`,color:C.white,cursor:"pointer"}} value={formData.plan} onChange={e=>setFormData({...formData,plan:e.target.value})}>
            {t.planSelectOptions.map((o,i)=><option key={i} value={i===0?"":o}>{o}</option>)}
          </select>
          <button onClick={()=>setSubmitted(true)} style={{width:"100%",padding:"16px",fontFamily:f.h,fontSize:"14px",fontWeight:700,letterSpacing:"1.5px",color:C.white,background:`linear-gradient(135deg,${C.accent},${C.accentLight})`,border:"none",borderRadius:"8px",cursor:"pointer",boxShadow:"0 4px 16px rgba(13,148,136,0.3)"}}>{t.formBtn}</button>
          <p style={{fontFamily:f.b,fontSize:"12px",color:C.muted,textAlign:"center",marginTop:"12px"}}>{t.formDisclaimer}</p>
        </div>}
        <div style={{marginTop:"32px"}}><p style={{fontFamily:f.b,fontSize:"15px",color:C.muted,marginBottom:"8px"}}>{t.preferTalk}</p><a href="tel:8444443114" style={{fontFamily:f.h,fontSize:"18px",fontWeight:700,color:C.accent,textDecoration:"none"}}>📞 (844) 444-3114</a></div>
      </div></section>

      <SiteFooter />
      <MobileCTA scrollTarget="quote-form" />
      <style>{`*{box-sizing:border-box;margin:0;padding:0}::placeholder{color:${C.muted}}input:focus,select:focus{border-color:${C.accent}!important}`}</style>
    </div>
  );
}
