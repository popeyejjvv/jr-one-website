"use client";

import { useState, useEffect } from "react";
import SiteNav from "../../components/SiteNav";
import SiteFooter from "../../components/SiteFooter";
import MobileCTA from "../../components/MobileCTA";
import { useLanguage } from "../../lib/LanguageContext";

const injectFonts = () => { if (typeof document==="undefined"||document.querySelector("#jr-fonts")) return; const l=document.createElement("link"); l.id="jr-fonts"; l.rel="stylesheet"; l.href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800&family=Source+Sans+3:wght@300;400;600&display=swap"; document.head.appendChild(l); };
const C = { bg:"#0B1628",navy:"#1B2A4A",navyMid:"#243556",navyLight:"#2C3E5A",navyFade:"#162033",gold:"#C8952E",goldLight:"#D4A843",goldPale:"rgba(200,149,46,0.12)",cream:"#F5F3EF",white:"#FFFFFF",offWhite:"#E8E4DC",muted:"#7A8FA8",charcoal:"#2D2D2D",success:"#2D8B4E",successDim:"rgba(45,139,78,0.15)",accent:"#EAB308",accentLight:"#FACC15",accentPale:"rgba(234,179,8,0.12)" };
const f = { h:"'Montserrat', sans-serif", b:"'Source Sans 3', sans-serif" };
const Tag = ({children}) => <div style={{display:"inline-block",padding:"6px 16px",background:C.accentPale,borderRadius:"4px",marginBottom:"12px"}}><span style={{fontFamily:f.h,fontSize:"12px",fontWeight:700,color:C.accent,letterSpacing:"3px"}}>{children}</span></div>;
const GoldBar = () => <div style={{width:"60px",height:"3px",background:`linear-gradient(90deg,${C.accent},${C.accentLight})`,borderRadius:"2px",margin:"16px auto"}} />;
const Stars = () => <span style={{color:C.gold,fontSize:"14px",letterSpacing:"2px"}}>★★★★★</span>;
const inputStyle = {width:"100%",padding:"13px 16px",fontFamily:f.b,fontSize:"15px",border:"1.5px solid #D1D5DB",borderRadius:"8px",outline:"none",color:C.charcoal,marginBottom:"12px",background:"#FAFAFA",boxSizing:"border-box"};

const T = {
  en: {
    breadcrumb: ["Home","Services","Gutter Repair & Maintenance"],
    heroTag: "GUTTER REPAIR & MAINTENANCE",
    heroH1: "Leaking, Sagging, or Overflowing?",
    heroH1Gold: "We Fix It Right the First Time.",
    heroP: "Don't let small gutter problems become expensive home damage. Our repair specialists diagnose the real issue — not just the symptom — and fix it so you don't have to call again. Plus seasonal maintenance programs to prevent problems before they start.",
    btnInspection: "GET YOUR FREE INSPECTION",
    btnCall: "CALL (844) 444-3114",
    problemTag: "THE PROBLEM",
    problemTitle: "GUTTER PROBLEMS THAT GET EXPENSIVE FAST",
    problems: [
      { icon:"💧", title:"Leaking seams and joints", desc:"Water dripping between gutter sections, at corners, or around downspout connections. Left unrepaired, leaks stain your fascia, rot your wood, and erode your foundation soil." },
      { icon:"📐", title:"Sagging and pulling away", desc:"Gutters pulling away from the fascia board due to failed hangers, rotted wood, or ice/debris weight. Sagging gutters don't drain — they pool water and eventually collapse." },
      { icon:"🌊", title:"Overflowing in rain", desc:"Water pouring over the front edge during storms — usually caused by clogs, incorrect pitch, or undersized gutters. The water goes exactly where gutters are supposed to prevent it from going." },
      { icon:"🔩", title:"Damaged or missing downspouts", desc:"Crushed, disconnected, or missing downspouts mean water dumps directly at your foundation instead of being routed away. This is how foundation cracks, basement flooding, and soil erosion happen." },
    ],
    solutionTag: "THE JR ONE DIFFERENCE",
    solutionTitle: "REPAIRS THAT ACTUALLY LAST",
    solutionSub: "We diagnose the root cause and fix it permanently — no band-aid solutions that fail next storm season.",
    solutions: [
      { title:"Leak repair and sealing", desc:"We locate every leak point — seams, end caps, corners, downspout connections — and seal them with professional-grade sealant that flexes with temperature changes. No temporary fixes that fail in six months." },
      { title:"Hanger replacement and realignment", desc:"We replace failed spike-and-ferrule hangers with modern hidden bracket systems, refasten gutters to solid fascia, and re-pitch for proper water flow. Your gutters hang straight and drain completely." },
      { title:"Downspout repair and rerouting", desc:"We repair or replace damaged downspouts, add extensions to direct water away from your foundation, and reroute drainage when the original layout isn't working." },
      { title:"Gutter cleaning and debris removal", desc:"Full cleanout of leaves, pine needles, shingle grit, and standing water. We flush every downspout to confirm clear flow and inspect for damage while we're up there." },
      { title:"Storm damage emergency response", desc:"Tampa hurricane season doesn't wait and neither do we. We respond quickly to storm-damaged gutters — temporary stabilization first to prevent further damage, then permanent repair as soon as materials and scheduling allow." },
      { title:"Seasonal maintenance programs", desc:"Preventive maintenance twice a year keeps your gutters performing and extends their lifespan significantly. We clean, inspect, tighten, seal, and document the condition of your entire system." },
    ],
    stats: [
      { value:"Same Day", label:"Emergency response available" },
      { value:"500+", label:"Repairs completed annually" },
      { value:"1st", label:"Call — we fix it right" },
      { value:"30+", label:"Years diagnosing gutter issues" },
    ],
    peakAlert: "FLORIDA INSURANCE ALERT",
    peakTitle: "280% Increase in Non-Renewals — Roof Over 15 Years Old?",
    peakDesc: "restores shingles from the inside out — adds 6–10 years at a fraction of replacement cost, with warranty docs your insurer must accept under FL law.",
    peakBtn: "PEAK 301 INFO →",
    peakRights: "YOUR RIGHTS →",
    goldTag: "THE GOLD STANDARD",
    goldTitle: "OUR REPAIR PROCESS",
    goldMotto: "Every home. Every time. No exceptions.",
    goldSteps: [
      { num:"01", title:"ASSESS", desc:"We diagnose the root cause — not just the visible symptom. A sagging gutter might mean a failed hanger, rotted fascia, or both. We find the real problem." },
      { num:"02", title:"DESIGN", desc:"Clear explanation of what's wrong, what needs to happen, and what it costs. No vague 'we'll figure it out as we go' — you approve the plan before we start." },
      { num:"03", title:"INSTALL", desc:"Our crew performs the repair with the right materials and proper technique. We fix it to last, not to get us off the ladder faster." },
      { num:"04", title:"PROTECT", desc:"We test the repair with water flow, clean up, and give you maintenance tips to prevent recurrence. If the issue comes back, so do we." },
    ],
    reviewTag: "CUSTOMER REVIEWS",
    reviewTitle: "WHAT REPAIR CUSTOMERS SAY",
    reviews: [
      { text:"Had two long pieces of aluminum gable fascia replaced due to recent hurricanes. Very small job and I was worried about anyone interested in a job that small at a reasonable price. JR One was very responsive to quote and do the work timely, all at a very fair price.", name:"Steven M.", context:"Small Repair Job" },
      { text:"What a great experience post Milton. Ben came over two days after the storm to assess the damage. Got me added to the schedule quickly. They fixed and added a new gutter. I couldn't be more pleased.", name:"Johnny C.", context:"Post-Hurricane Repair" },
      { text:"Great experience — quick response with wonderful communication from Emily. The workers arrived with the proper equipment and materials — very professional job.", name:"Rich B.", context:"Gutter Repair" },
    ],
    faqTag: "FAQ",
    faqTitle: "GUTTER REPAIR QUESTIONS",
    faqs: [
      { q:"How much does gutter repair cost?", a:"Most gutter repairs range from $150–$500 depending on the type and extent of damage. Simple leak sealing or hanger replacement is on the lower end. Re-pitching an entire run, replacing sections, or addressing underlying fascia rot costs more. We provide an exact quote before any work begins." },
      { q:"Is it worth repairing old gutters or should I replace them?", a:"It depends on the overall condition. If your gutters are generally sound and the issue is localized (a few leaks, one sagging section), repair makes sense. If you're seeing widespread problems — multiple leaks, significant sagging, corrosion — replacement is usually more cost-effective long-term. We'll give you an honest assessment either way." },
      { q:"How quickly can you respond to storm damage?", a:"We prioritize storm damage calls and typically perform an initial assessment within 24-48 hours of your call. If immediate stabilization is needed to prevent further damage, we handle that first. Permanent repairs are scheduled as quickly as materials and crew availability allow." },
      { q:"Do you do small jobs?", a:"Yes. We don't turn away small repairs because they're 'not worth our time.' A single leaking joint or one loose section still deserves professional attention. Some of our best reviews come from small jobs where other companies wouldn't even return the call." },
      { q:"How often should I have my gutters cleaned?", a:"In Tampa Bay, we recommend professional cleaning at least twice a year — once before hurricane season (May/June) and once after fall leaf drop (November/December). Homes near pine trees or heavy tree coverage may need quarterly cleaning." },
      { q:"What does a maintenance program include?", a:"Our seasonal maintenance includes full gutter and downspout cleanout, leak inspection and sealing, hanger tightening, pitch verification, and a written condition report with photos. Think of it as a checkup that catches small problems before they become expensive ones." },
    ],
    ctaTitle: "GUTTERS ACTING UP?",
    ctaSub: "Get your free gutter inspection. We'll find the problem, explain it clearly, and give you a fair quote to fix it right — whether it's a $150 repair or a full replacement recommendation.",
    formTitle: "Get Your Free Gutter Inspection",
    formName: "Full Name",
    formPhone: "Phone Number",
    formEmail: "Email Address",
    formZip: "ZIP Code",
    formBtn: "REQUEST MY FREE GUTTER INSPECTION",
    formDisclaimer: "No spam. No pressure.",
    formSuccess: "Inspection Request Received!",
    stepLabel: "STEP",
  },
  es: {
    breadcrumb: ["Inicio","Servicios","Reparacion y Mantenimiento de Canaletas"],
    heroTag: "REPARACION Y MANTENIMIENTO DE CANALETAS",
    heroH1: "Filtrando, Combandose o Desbordandose?",
    heroH1Gold: "Lo Arreglamos Bien a la Primera.",
    heroP: "No deje que problemas pequenos de canaletas se conviertan en danos costosos para su hogar. Nuestros especialistas en reparacion diagnostican el problema real — no solo el sintoma — y lo arreglan para que no tenga que llamar de nuevo. Ademas, programas de mantenimiento estacional para prevenir problemas antes de que comiencen.",
    btnInspection: "OBTENGA SU INSPECCION GRATIS",
    btnCall: "LLAME AL (844) 444-3114",
    problemTag: "EL PROBLEMA",
    problemTitle: "PROBLEMAS DE CANALETAS QUE SE VUELVEN COSTOSOS RAPIDO",
    problems: [
      { icon:"💧", title:"Costuras y uniones con filtraciones", desc:"Agua goteando entre secciones de canaleta, en esquinas o alrededor de conexiones de bajantes. Sin reparar, las filtraciones manchan su fascia, pudren la madera y erosionan el suelo de su fundacion." },
      { icon:"📐", title:"Combandose y desprendiendose", desc:"Canaletas desprendiendose de la tabla de fascia debido a soportes fallidos, madera podrida o peso de escombros. Las canaletas combadas no drenan — acumulan agua y eventualmente colapsan." },
      { icon:"🌊", title:"Desbordamiento durante la lluvia", desc:"Agua desbordandose por el borde delantero durante tormentas — generalmente causado por obstrucciones, inclinacion incorrecta o canaletas de tamano insuficiente. El agua va exactamente donde las canaletas deberian evitar que vaya." },
      { icon:"🔩", title:"Bajantes danados o faltantes", desc:"Bajantes aplastados, desconectados o faltantes significan que el agua se descarga directamente en su fundacion en vez de ser dirigida lejos. Asi es como ocurren las grietas en la fundacion, inundaciones y erosion del suelo." },
    ],
    solutionTag: "LA DIFERENCIA JR ONE",
    solutionTitle: "REPARACIONES QUE REALMENTE DURAN",
    solutionSub: "Diagnosticamos la causa raiz y la arreglamos permanentemente — sin soluciones temporales que fallan en la proxima temporada de tormentas.",
    solutions: [
      { title:"Reparacion y sellado de filtraciones", desc:"Localizamos cada punto de filtracion — costuras, tapas, esquinas, conexiones de bajantes — y los sellamos con sellador de grado profesional que se flexiona con los cambios de temperatura. Sin arreglos temporales que fallan en seis meses." },
      { title:"Reemplazo y realineacion de soportes", desc:"Reemplazamos soportes de clavos y ferrulas fallidos con sistemas modernos de soportes ocultos, refijamos las canaletas a fascia solida y re-inclinamos para un flujo de agua adecuado. Sus canaletas quedan rectas y drenan completamente." },
      { title:"Reparacion y redireccion de bajantes", desc:"Reparamos o reemplazamos bajantes danados, agregamos extensiones para dirigir el agua lejos de su fundacion y redirigimos el drenaje cuando el diseno original no funciona." },
      { title:"Limpieza de canaletas y remocion de escombros", desc:"Limpieza completa de hojas, agujas de pino, granulos de tejas y agua estancada. Lavamos cada bajante para confirmar flujo libre e inspeccionamos danos mientras estamos arriba." },
      { title:"Respuesta de emergencia por danos de tormenta", desc:"La temporada de huracanes de Tampa no espera y nosotros tampoco. Respondemos rapidamente a canaletas danadas por tormentas — estabilizacion temporal primero para prevenir mas danos, luego reparacion permanente tan pronto como los materiales y la programacion lo permitan." },
      { title:"Programas de mantenimiento estacional", desc:"Mantenimiento preventivo dos veces al ano mantiene sus canaletas funcionando y extiende su vida util significativamente. Limpiamos, inspeccionamos, ajustamos, sellamos y documentamos la condicion de todo su sistema." },
    ],
    stats: [
      { value:"Mismo Dia", label:"Respuesta de emergencia disponible" },
      { value:"500+", label:"Reparaciones completadas anualmente" },
      { value:"1ra", label:"Llamada — lo arreglamos bien" },
      { value:"30+", label:"Anos diagnosticando problemas de canaletas" },
    ],
    peakAlert: "ALERTA DE SEGUROS DE FLORIDA",
    peakTitle: "Aumento del 280% en No-Renovaciones — Techo de mas de 15 anos?",
    peakDesc: "restaura las tejas desde adentro — agrega 6–10 anos a una fraccion del costo de reemplazo, con documentos de garantia que su aseguradora debe aceptar bajo la ley de FL.",
    peakBtn: "INFO PEAK 301 →",
    peakRights: "SUS DERECHOS →",
    goldTag: "EL ESTANDAR DE ORO",
    goldTitle: "NUESTRO PROCESO DE REPARACION",
    goldMotto: "Cada hogar. Cada vez. Sin excepciones.",
    goldSteps: [
      { num:"01", title:"EVALUAR", desc:"Diagnosticamos la causa raiz — no solo el sintoma visible. Una canaleta combada puede significar un soporte fallido, fascia podrida o ambos. Encontramos el problema real." },
      { num:"02", title:"DISENAR", desc:"Explicacion clara de que esta mal, que necesita hacerse y cuanto cuesta. Sin vagos 'lo iremos viendo' — usted aprueba el plan antes de que empecemos." },
      { num:"03", title:"INSTALAR", desc:"Nuestro equipo realiza la reparacion con los materiales correctos y la tecnica adecuada. Lo arreglamos para que dure, no para bajar de la escalera mas rapido." },
      { num:"04", title:"PROTEGER", desc:"Probamos la reparacion con flujo de agua, limpiamos y le damos consejos de mantenimiento para prevenir recurrencia. Si el problema regresa, nosotros tambien." },
    ],
    reviewTag: "RESENAS DE CLIENTES",
    reviewTitle: "LO QUE DICEN LOS CLIENTES DE REPARACIONES",
    reviews: [
      { text:"Reemplace dos piezas largas de fascia de aluminio debido a huracanes recientes. Un trabajo muy pequeno y me preocupaba que alguien estuviera interesado en un trabajo tan pequeno a un precio razonable. JR One fue muy receptivo para cotizar y hacer el trabajo a tiempo, todo a un precio muy justo.", name:"Steven M.", context:"Trabajo Pequeno de Reparacion" },
      { text:"Que gran experiencia despues de Milton. Ben vino dos dias despues de la tormenta para evaluar el dano. Me agrego al cronograma rapidamente. Arreglaron y agregaron una canaleta nueva. No podria estar mas satisfecho.", name:"Johnny C.", context:"Reparacion Post-Huracan" },
      { text:"Gran experiencia — respuesta rapida con comunicacion maravillosa de Emily. Los trabajadores llegaron con el equipo y materiales adecuados — un trabajo muy profesional.", name:"Rich B.", context:"Reparacion de Canaletas" },
    ],
    faqTag: "PREGUNTAS FRECUENTES",
    faqTitle: "PREGUNTAS SOBRE REPARACION DE CANALETAS",
    faqs: [
      { q:"Cuanto cuesta la reparacion de canaletas?", a:"La mayoria de las reparaciones de canaletas oscilan entre $150–$500 dependiendo del tipo y extension del dano. El sellado simple de filtraciones o reemplazo de soportes esta en el extremo inferior. Re-inclinar un tramo completo, reemplazar secciones o reparar fascia podrida cuesta mas. Proporcionamos una cotizacion exacta antes de comenzar cualquier trabajo." },
      { q:"Vale la pena reparar canaletas viejas o debo reemplazarlas?", a:"Depende de la condicion general. Si sus canaletas estan en buen estado general y el problema es localizado (algunas filtraciones, una seccion combada), la reparacion tiene sentido. Si ve problemas generalizados — multiples filtraciones, combadura significativa, corrosion — el reemplazo generalmente es mas rentable a largo plazo. Le daremos una evaluacion honesta de cualquier manera." },
      { q:"Que tan rapido pueden responder a danos por tormenta?", a:"Priorizamos las llamadas por danos de tormenta y tipicamente realizamos una evaluacion inicial dentro de 24-48 horas de su llamada. Si se necesita estabilizacion inmediata para prevenir mas dano, lo manejamos primero. Las reparaciones permanentes se programan tan rapido como los materiales y disponibilidad del equipo lo permitan." },
      { q:"Hacen trabajos pequenos?", a:"Si. No rechazamos reparaciones pequenas porque 'no valen nuestro tiempo.' Una sola union con filtracion o una seccion suelta aun merece atencion profesional. Algunas de nuestras mejores resenas vienen de trabajos pequenos donde otras empresas ni siquiera devolvieron la llamada." },
      { q:"Con que frecuencia debo limpiar mis canaletas?", a:"En Tampa Bay, recomendamos limpieza profesional al menos dos veces al ano — una antes de la temporada de huracanes (mayo/junio) y otra despues de la caida de hojas en otono (noviembre/diciembre). Hogares cerca de pinos o con mucha cobertura de arboles pueden necesitar limpieza trimestral." },
      { q:"Que incluye un programa de mantenimiento?", a:"Nuestro mantenimiento estacional incluye limpieza completa de canaletas y bajantes, inspeccion y sellado de filtraciones, ajuste de soportes, verificacion de inclinacion y un informe escrito de condicion con fotos. Piense en ello como un chequeo que detecta problemas pequenos antes de que se vuelvan costosos." },
    ],
    ctaTitle: "PROBLEMAS CON SUS CANALETAS?",
    ctaSub: "Obtenga su inspeccion gratis de canaletas. Encontraremos el problema, se lo explicaremos claramente y le daremos una cotizacion justa para arreglarlo bien — ya sea una reparacion de $150 o una recomendacion de reemplazo completo.",
    formTitle: "Obtenga Su Inspeccion Gratis de Canaletas",
    formName: "Nombre Completo",
    formPhone: "Numero de Telefono",
    formEmail: "Correo Electronico",
    formZip: "Codigo Postal",
    formBtn: "SOLICITAR MI INSPECCION GRATIS DE CANALETAS",
    formDisclaimer: "Sin spam. Sin presion.",
    formSuccess: "Solicitud de Inspeccion Recibida!",
    stepLabel: "PASO",
  },
};

export default function GutterRepairPage() {
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
      <div style={{padding:"16px 24px 0",maxWidth:"1200px",margin:"0 auto"}}><div style={{fontFamily:f.b,fontSize:"13px",color:C.muted}}>{t.breadcrumb.map((item,i) => <span key={i}>{i>0&&<span style={{margin:"0 8px",opacity:0.5}}>/</span>}<span style={{color:i===t.breadcrumb.length-1?C.accent:C.muted}}>{item}</span></span>)}</div></div>

      <section className="hero-stars" style={{padding:"60px 24px 80px",maxWidth:"1200px",margin:"0 auto",display:"flex",gap:"48px",alignItems:"center",flexWrap:"wrap"}}><div style={{flex:"1 1 500px",minWidth:"300px"}}><Tag>{t.heroTag}</Tag><h1 style={{fontFamily:f.h,fontSize:"clamp(32px,5vw,48px)",fontWeight:800,lineHeight:1.1,marginBottom:"20px"}}>{t.heroH1}<br/><span style={{color:C.accent}}>{t.heroH1Gold}</span></h1><p style={{fontFamily:f.b,fontSize:"18px",color:C.offWhite,lineHeight:1.7,marginBottom:"32px",maxWidth:"560px"}}>{t.heroP}</p><div style={{display:"flex",gap:"16px",flexWrap:"wrap"}}><button onClick={()=>document.getElementById("quote-form")?.scrollIntoView({behavior:"smooth"})} style={{padding:"16px 36px",fontFamily:f.h,fontSize:"14px",fontWeight:700,letterSpacing:"1.5px",color:C.navy,background:`linear-gradient(135deg,${C.accent},${C.accentLight})`,border:"none",borderRadius:"8px",cursor:"pointer",boxShadow:"0 4px 16px rgba(234,179,8,0.3)"}}>{t.btnInspection}</button><a href="tel:8444443114" style={{display:"inline-flex",alignItems:"center",padding:"16px 36px",fontFamily:f.h,fontSize:"14px",fontWeight:700,letterSpacing:"1.5px",color:C.accent,border:`2px solid ${C.accent}`,borderRadius:"8px",textDecoration:"none"}}>📞 {t.btnCall}</a></div><div style={{display:"flex",gap:"24px",marginTop:"32px",flexWrap:"wrap"}}>{t.stats.map((s,i) => <div key={i} style={{textAlign:"center"}}><div style={{fontFamily:f.h,fontSize:"28px",fontWeight:800,color:C.accent}}>{s.value}</div><div style={{fontFamily:f.b,fontSize:"12px",color:C.muted,maxWidth:"100px"}}>{s.label}</div></div>)}</div></div>
</section>

      <section style={{background:C.navy,padding:"80px 24px"}}><div style={{maxWidth:"1200px",margin:"0 auto",textAlign:"center"}}><Tag>{t.problemTag}</Tag><h2 style={{...secTitle,color:C.white}}>{t.problemTitle}</h2><GoldBar /><div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(250px,1fr))",gap:"24px",marginTop:"48px",textAlign:"left"}}>{t.problems.map((p,i) => <div key={i} style={{background:C.navyFade,border:`1px solid ${C.navyLight}`,borderRadius:"12px",padding:"28px",borderLeft:`4px solid ${C.gold}`}}><div style={{fontSize:"28px",marginBottom:"12px"}}>{p.icon}</div><h3 style={{fontFamily:f.h,fontSize:"17px",fontWeight:700,color:C.white,marginBottom:"8px"}}>{p.title}</h3><p style={{fontFamily:f.b,fontSize:"15px",color:C.muted,lineHeight:1.55}}>{p.desc}</p></div>)}</div></div></section>

      <section style={{background:C.bg,padding:"80px 24px"}}><div style={sec}><div style={{textAlign:"center"}}><Tag>{t.solutionTag}</Tag><h2 style={{...secTitle,color:C.white}}>{t.solutionTitle}</h2><GoldBar /><p style={{fontFamily:f.b,fontSize:"17px",color:C.muted,maxWidth:"600px",margin:"0 auto 48px"}}>{t.solutionSub}</p></div><div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(340px,1fr))",gap:"20px"}}>{t.solutions.map((s,i) => <div key={i} style={{background:C.navyFade,border:`1px solid ${C.navyLight}`,borderRadius:"12px",padding:"28px",transition:"border-color 0.3s"}} onMouseOver={e=>e.currentTarget.style.borderColor=C.accent} onMouseOut={e=>e.currentTarget.style.borderColor=C.navyLight}><div style={{fontFamily:f.h,fontSize:"11px",fontWeight:700,color:C.accent,letterSpacing:"2px",marginBottom:"8px"}}>0{i+1}</div><h3 style={{fontFamily:f.h,fontSize:"17px",fontWeight:700,color:C.white,marginBottom:"10px"}}>{s.title}</h3><p style={{fontFamily:f.b,fontSize:"15px",color:C.muted,lineHeight:1.6}}>{s.desc}</p></div>)}</div></div></section>

      {/* ══ PEAK 301 CALLOUT ══ */}
      <section style={{background:"linear-gradient(135deg, rgba(177,26,33,0.08), rgba(15,30,54,0.97))",padding:"28px 24px",borderTop:"2px solid #B11A21",borderBottom:"2px solid #B11A21"}}>
        <div style={{maxWidth:"1000px",margin:"0 auto",display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:"20px"}}>
          <div style={{flex:"1 1 500px"}}>
            <div style={{display:"flex",alignItems:"center",gap:"8px",marginBottom:"8px"}}><span style={{fontSize:"16px"}}>⚠️</span><span style={{fontFamily:"'Montserrat', sans-serif",fontSize:"11px",fontWeight:700,color:"#B11A21",letterSpacing:"2px"}}>{t.peakAlert}</span></div>
            <p style={{fontFamily:"'Montserrat', sans-serif",fontSize:"clamp(16px,2.5vw,20px)",fontWeight:800,color:"#FFFFFF",lineHeight:1.3,marginBottom:"6px"}}>{t.peakTitle}</p>
            <p style={{fontFamily:"'Source Sans 3', sans-serif",fontSize:"14px",color:"#7A8FA8",lineHeight:1.5}}><strong style={{color:"#E8E4DC"}}>Peak 301</strong> {t.peakDesc}</p>
          </div>
          <div style={{display:"flex",flexDirection:"column",gap:"8px",flexShrink:0}}>
            <a href="/peak-301" style={{padding:"12px 24px",fontFamily:"'Montserrat', sans-serif",fontSize:"12px",fontWeight:700,letterSpacing:"1px",color:"#FFFFFF",background:"linear-gradient(135deg, #B11A21, #D42A2A)",borderRadius:"6px",textDecoration:"none",textAlign:"center",boxShadow:"0 4px 12px rgba(177,26,33,0.3)"}}>{t.peakBtn}</a>
            <a href="/insurance-resource-center" style={{padding:"12px 24px",fontFamily:"'Montserrat', sans-serif",fontSize:"12px",fontWeight:700,letterSpacing:"1px",color:"#B11A21",border:"1.5px solid #B11A21",borderRadius:"6px",textDecoration:"none",textAlign:"center"}}>{t.peakRights}</a>
          </div>
        </div>
      </section>

      <section style={{background:C.navy,padding:"80px 24px"}}><div style={sec}><div style={{textAlign:"center"}}><Tag>{t.goldTag}</Tag><h2 style={{...secTitle,color:C.white}}>{t.goldTitle}</h2><GoldBar /><p style={{fontFamily:f.b,fontSize:"17px",color:C.offWhite,fontStyle:"italic",maxWidth:"500px",margin:"0 auto 48px"}}>{t.goldMotto}</p></div><div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(250px,1fr))",gap:"24px"}}>{t.goldSteps.map((step,i) => <div key={i} style={{background:C.navyFade,border:`1px solid ${C.navyLight}`,borderRadius:"12px",padding:"28px",position:"relative"}}><div style={{fontFamily:f.h,fontSize:"36px",fontWeight:800,color:"rgba(200,149,46,0.08)",position:"absolute",top:"16px",right:"20px"}}>{step.num}</div><div style={{fontFamily:f.h,fontSize:"11px",fontWeight:700,color:C.accent,letterSpacing:"3px",marginBottom:"8px"}}>{t.stepLabel} {step.num}</div><h3 style={{fontFamily:f.h,fontSize:"22px",fontWeight:700,color:C.white,marginBottom:"12px"}}>{step.title}</h3><p style={{fontFamily:f.b,fontSize:"15px",color:C.muted,lineHeight:1.6}}>{step.desc}</p></div>)}</div></div></section>

      <section style={{background:C.bg,padding:"80px 24px"}}><div style={sec}><div style={{textAlign:"center"}}><Tag>{t.reviewTag}</Tag><h2 style={{...secTitle,color:C.white}}>{t.reviewTitle}</h2><GoldBar /></div><div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(300px,1fr))",gap:"20px",marginTop:"48px"}}>{t.reviews.map((rev,i) => <div key={i} style={{background:C.navyFade,border:`1px solid ${C.navyLight}`,borderRadius:"12px",padding:"28px"}}><Stars /><p style={{fontFamily:f.b,fontSize:"15px",color:C.offWhite,lineHeight:1.65,margin:"16px 0",fontStyle:"italic"}}>"{rev.text}"</p><div style={{borderTop:`1px solid ${C.navyLight}`,paddingTop:"12px",display:"flex",justifyContent:"space-between",alignItems:"center"}}><span style={{fontFamily:f.h,fontSize:"14px",fontWeight:600,color:C.white}}>{rev.name}</span><span style={{fontFamily:f.b,fontSize:"12px",color:C.muted}}>{rev.context}</span></div></div>)}</div></div></section>

      <section style={{background:C.navy,padding:"80px 24px"}}><div style={{maxWidth:"800px",margin:"0 auto",textAlign:"center"}}><Tag>{t.faqTag}</Tag><h2 style={{...secTitle,color:C.white}}>{t.faqTitle}</h2><GoldBar /><div style={{marginTop:"40px",textAlign:"left"}}>{t.faqs.map((faq,i) => <div key={i} style={{borderBottom:`1px solid ${C.navyLight}`}}><button onClick={()=>setOpenFaq(openFaq===i?null:i)} style={{width:"100%",padding:"20px 0",background:"none",border:"none",cursor:"pointer",display:"flex",justifyContent:"space-between",alignItems:"center",gap:"16px"}}><span style={{fontFamily:f.h,fontSize:"15px",fontWeight:600,color:openFaq===i?C.accent:C.white,textAlign:"left",transition:"color 0.2s"}}>{faq.q}</span><span style={{fontFamily:f.h,fontSize:"20px",color:C.accent,transform:openFaq===i?"rotate(45deg)":"none",transition:"transform 0.3s",flexShrink:0}}>+</span></button>{openFaq===i&&<div style={{padding:"0 0 20px",fontFamily:f.b,fontSize:"15px",color:C.muted,lineHeight:1.65}}>{faq.a}</div>}</div>)}</div></div></section>

      <section id="quote-form" style={{background:`linear-gradient(165deg,${C.navyMid},${C.navy})`,padding:"80px 24px"}}><div style={{maxWidth:"600px",margin:"0 auto",textAlign:"center"}}><h2 style={{fontFamily:f.h,fontSize:"clamp(28px,5vw,40px)",fontWeight:800,color:C.white,marginBottom:"12px"}}>{t.ctaTitle}</h2><p style={{fontFamily:f.b,fontSize:"17px",color:C.offWhite,marginBottom:"40px"}}>{t.ctaSub}</p>
        {submitted ? <div style={{background:C.successDim,border:`1px solid ${C.success}`,borderRadius:"12px",padding:"32px"}}><div style={{fontSize:"48px",marginBottom:"12px"}}>✓</div><h3 style={{fontFamily:f.h,fontSize:"20px",fontWeight:700,color:"#4ADE80"}}>{t.formSuccess}</h3></div> : <div style={{background:C.white,borderRadius:"16px",padding:"32px",boxShadow:"0 24px 80px rgba(0,0,0,0.4)",textAlign:"left"}}><h3 style={{fontFamily:f.h,fontSize:"18px",fontWeight:700,color:C.navy,textAlign:"center",marginBottom:"4px"}}>{t.formTitle}</h3><div style={{width:"40px",height:"3px",background:C.accent,borderRadius:"2px",margin:"10px auto 20px"}} /><input style={inputStyle} placeholder={t.formName} value={formData.name} onChange={e=>setFormData({...formData,name:e.target.value})} /><input style={inputStyle} placeholder={t.formPhone} type="tel" value={formData.phone} onChange={e=>setFormData({...formData,phone:e.target.value})} /><input style={inputStyle} placeholder={t.formEmail} type="email" value={formData.email} onChange={e=>setFormData({...formData,email:e.target.value})} /><input style={inputStyle} placeholder={t.formZip} value={formData.zip} onChange={e=>setFormData({...formData,zip:e.target.value})} maxLength={5} /><button onClick={()=>setSubmitted(true)} style={{width:"100%",padding:"16px",fontFamily:f.h,fontSize:"14px",fontWeight:700,letterSpacing:"1.5px",color:C.navy,background:`linear-gradient(135deg,${C.accent},${C.accentLight})`,border:"none",borderRadius:"8px",cursor:"pointer"}}>{t.formBtn}</button><p style={{fontFamily:f.b,fontSize:"12px",color:"#9CA3AF",textAlign:"center",marginTop:"12px"}}>{t.formDisclaimer}</p></div>}
        <div style={{marginTop:"32px"}}><a href="tel:8444443114" style={{fontFamily:f.h,fontSize:"18px",fontWeight:700,color:C.gold,textDecoration:"none"}}>📞 (844) 444-3114</a></div></div></section>

      <SiteFooter />
      <MobileCTA scrollTarget="quote-form" />
      <style>{`*{box-sizing:border-box;margin:0;padding:0}::placeholder{color:#9CA3AF}input:focus{border-color:${C.accent}!important}`}</style>
    </div>
  );
}
