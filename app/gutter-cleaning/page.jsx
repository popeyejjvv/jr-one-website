"use client";

import { useState, useEffect } from "react";
import SiteNav from "../../components/SiteNav";
import SiteFooter from "../../components/SiteFooter";
import MobileCTA from "../../components/MobileCTA";
import { useLanguage } from "../../lib/LanguageContext";

const injectFonts = () => { if (typeof document==="undefined"||document.querySelector("#jr-fonts")) return; const l=document.createElement("link"); l.id="jr-fonts"; l.rel="stylesheet"; l.href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800&family=Source+Sans+3:wght@300;400;600&display=swap"; document.head.appendChild(l); };
const C = { bg:"#0B1628",navy:"#1B2A4A",navyMid:"#243556",navyLight:"#2C3E5A",navyFade:"#162033",gold:"#C8952E",goldLight:"#D4A843",goldPale:"rgba(200,149,46,0.12)",cream:"#F5F3EF",white:"#FFFFFF",offWhite:"#E8E4DC",muted:"#7A8FA8",charcoal:"#2D2D2D",success:"#2D8B4E",successDim:"rgba(45,139,78,0.15)",accent:"#2D8B4E",accentLight:"#4ADE80",accentPale:"rgba(45,139,78,0.12)" };
const f = { h:"'Montserrat', sans-serif", b:"'Source Sans 3', sans-serif" };
const Tag = ({children}) => <div style={{display:"inline-block",padding:"6px 16px",background:C.accentPale,borderRadius:"4px",marginBottom:"12px"}}><span style={{fontFamily:f.h,fontSize:"12px",fontWeight:700,color:C.accent,letterSpacing:"3px"}}>{children}</span></div>;
const GoldBar = () => <div style={{width:"60px",height:"3px",background:`linear-gradient(90deg,${C.accent},${C.accentLight})`,borderRadius:"2px",margin:"16px auto"}} />;
const Stars = () => <span style={{color:C.gold,fontSize:"14px",letterSpacing:"2px"}}>★★★★★</span>;
const inputStyle = {width:"100%",padding:"13px 16px",fontFamily:f.b,fontSize:"15px",border:"1.5px solid #D1D5DB",borderRadius:"8px",outline:"none",color:C.charcoal,marginBottom:"12px",background:"#FAFAFA",boxSizing:"border-box"};

const T = {
  en: {
    breadcrumb: ["Home","Services","Gutter Cleaning"],
    heroTag: "GUTTER CLEANING & MAINTENANCE",
    heroH1: "Clean Gutters.",
    heroH1Gold: "Inspected, Photographed, Documented.",
    heroP: "Most cleaners scoop debris and leave. We remove every bit of debris, flush every downspout, inspect every hanger, photograph any issues we find — and haul the waste off your property. Typical single-family home: $150-$400, priced honestly on linear footage and roof access.",
    btnEstimate: "BOOK YOUR CLEANING",
    btnCall: "CALL (844) 444-3114",
    problemTag: "WHY TAMPA GUTTERS NEED IT MORE",
    problemTitle: "FLORIDA'S TREES NEVER STOP DROPPING",
    problems: [
      { icon:"🌳", title:"Live oaks shed every month", desc:"Tampa's live oak canopy drops leaves 12 months a year — not just fall. Most homeowners underestimate how much debris their gutters see between cleanings. By month 6 without a cleaning, you've got standing water." },
      { icon:"🌲", title:"Pine needles pack tight", desc:"Pine needles are the worst enemy of a gutter — they wedge into the channel, pack against the downspout, and block water flow completely. Homes with pines need more frequent cleaning than other Tampa properties." },
      { icon:"⛈️", title:"Every storm dumps new debris", desc:"Tampa's afternoon summer storms and named hurricanes load gutters with fresh debris in a single event. A gutter cleaned in May can be clogged again after one August thunderstorm." },
      { icon:"🏚️", title:"Skipped cleanings cost thousands", desc:"Skip two cleanings and overflow saturates the fascia behind the gutter. That $180 cleaning you avoided becomes a $4,000 fascia-and-soffit rebuild 18 months later. The math never favors skipping." },
    ],
    solutionTag: "THE JR ONE CLEANING DIFFERENCE",
    solutionTitle: "WHAT A REAL GUTTER CLEANING LOOKS LIKE",
    solutionSub: "Aluminum-specialist eyes on your system while we clean — you get the cleaning plus a free diagnostic of anything that needs attention.",
    solutions: [
      { title:"Full debris removal, not just the easy stuff", desc:"Every gutter run hand-cleared or vacuum-extracted end-to-end. Roof valleys and corners included. No ignoring the hard-to-reach sections because they're inconvenient." },
      { title:"Downspout flush on every downspout", desc:"Every downspout gets flushed with water to confirm clear flow. Partial clogs buried in the downspout — the #1 cause of overflow after a 'cleaning' — get cleared or flagged for further work." },
      { title:"Hanger, pitch & sealant inspection", desc:"While we're up there, we check hanger tightness, gutter pitch, and sealant condition at miters and corners. Issues get photographed and reported before they turn into expensive repairs." },
      { title:"Photo documentation of any issues", desc:"If we find rotted fascia, failing sealant, sagging hangers, or drainage problems, you get photos and a written summary — not a vague 'you might want to fix some stuff' conversation." },
      { title:"Bagged and hauled away", desc:"All debris bagged and removed from the property. You don't come home to piles of leaves or buckets of muck on the driveway. Clean job, clean exit." },
      { title:"Specialist eyes, not a general handyman", desc:"JR One is a 30+ year aluminum specialist. We see things generalist cleaners miss — and we can quote any repair on the spot because we're the contractor who'd do the fix anyway." },
    ],
    stats: [
      { value:"$150-$400", label:"Typical single-family range" },
      { value:"30+", label:"Years of Tampa Bay experience" },
      { value:"100%", label:"Debris hauled away" },
      { value:"100%", label:"Photo documentation of issues" },
    ],
    scopeTag: "SERVICE OPTIONS",
    scopeTitle: "CHOOSE THE RIGHT CLEANING",
    scopeSub: "Premium, basic, guard-package, or targeted downspout service — your system, your call.",
    scopeItems: [
      { icon:"✨", title:"Premium Cleaning", desc:"Full debris removal, downspout flush, hanger and sealant inspection, photo documentation, and debris haul-away. The recommended default for most Tampa homes." },
      { icon:"🔎", title:"Basic Tune-Up", desc:"Inspection and spot cleaning for gutters in reasonable condition or on a regular recurring schedule. Lower cost for systems that aren't heavily soiled." },
      { icon:"🛡️", title:"Deluxe Guard Package", desc:"When you're adding gutter guards, we clean first so the guards install over a clean system. Bundled pricing vs. two separate visits." },
      { icon:"🔧", title:"Downspout Clean-Out", desc:"Targeted fix for a single clogged downspout. Common symptom: gutter fills and overflows at one spot even after a general cleaning." },
      { icon:"📅", title:"Recurring Schedule", desc:"Semi-annual, quarterly, or post-storm recurring cleaning. Priced below one-off cleanings and priority-slotted during storm seasons." },
      { icon:"🏢", title:"Commercial & HOA", desc:"Apartment complexes, retail, HOA-managed communities, and commercial buildings. Priced and scheduled separately — see the commercial and HOA pages for contract structure." },
    ],
    peakAlert: "WHEN TO CLEAN",
    peakTitle: "Pre-summer (May) and post-hurricane (November) is the sweet spot.",
    peakDesc: "Heavy tree cover: 3-4x/year. Moderate: 2x/year (spring + fall). Homes with guards: every 2-3 years. After every named storm — regardless of the schedule — hurricane debris is its own event.",
    peakBtn: "BOOK CLEANING →",
    peakRights: "CALL (844) 444-3114 →",
    goldTag: "THE GOLD STANDARD",
    goldTitle: "OUR GUTTER CLEANING PROCESS",
    goldMotto: "Every house. Every visit. Cleaned right, documented, hauled away.",
    goldSteps: [
      { num:"01", title:"ASSESS", desc:"Walk the roofline, note access and linear footage, and confirm scope. Transparent estimate before any ladder goes up." },
      { num:"02", title:"CLEAR", desc:"Hand-clear or vacuum-extract debris from every gutter run. Roof valleys and corners included." },
      { num:"03", title:"FLUSH & INSPECT", desc:"Flush every downspout with water to confirm flow. Inspect hangers, pitch, and sealant. Photograph any issues." },
      { num:"04", title:"REPORT & HAUL", desc:"Written summary and photos of any issues found, plus bagged debris hauled off your property. Done and gone." },
    ],
    reviewTag: "CUSTOMER REVIEWS",
    reviewTitle: "WHAT CLEANING CUSTOMERS SAY",
    reviews: [
      { text:"I've had three different companies clean my gutters. JR One was the first one that actually flushed the downspouts and showed me photos of a rusted hanger I didn't know about.", name:"Arif K.", context:"Premium Cleaning" },
      { text:"They came out the week after a storm, cleared everything, bagged it, and were gone in 90 minutes. No mess in the yard, no surprise charges, no upsell pressure.", name:"David K.", context:"Post-Storm Cleaning" },
      { text:"We have pine trees on three sides of the house. JR One keeps us on a quarterly schedule and my gutters finally don't overflow anymore.", name:"Lois G.", context:"Quarterly Recurring" },
    ],
    faqTag: "FAQ",
    faqTitle: "GUTTER CLEANING QUESTIONS",
    faqs: [
      { q:"How much does gutter cleaning cost in Tampa?", a:"Typical single-family homes run $150-$400 depending on roof height, linear footage of gutter, debris level, and access. Two-story homes with complex rooflines run higher. Smaller one-story homes with straightforward access run lower. Exact pricing after a quick look — no generic rate quoted sight-unseen." },
      { q:"How often should I clean my gutters in Tampa?", a:"Heavy tree coverage (live oaks, pines, magnolias nearby): 3-4 cleanings per year. Moderate cover: twice a year — pre-summer (May) and post-hurricane (November). Homes with gutter guards: every 2-3 years. Open-lot homes with no trees: once a year minimum. Add a cleaning after any named storm regardless of the cycle." },
      { q:"Do you haul away the debris?", a:"Yes. All debris is bagged and removed from your property. You don't deal with piles of leaves or buckets of muck after we leave. Clean job, clean exit." },
      { q:"What's the difference between your cleaning and a handyman?", a:"Most general handymen scoop what they can see and leave. We clear every run end-to-end, flush every downspout, inspect hangers and sealant, photograph issues, and haul the waste. Plus we're an aluminum specialty contractor — we can quote any repair we find on the spot instead of telling you to call someone else." },
      { q:"Can you clean gutters on a two- or three-story home?", a:"Yes. JR One is equipped for multi-story residential and commercial. Our crews have the ladders, equipment, and training for high-access work homeowners shouldn't try from a ladder." },
      { q:"Do you service rental properties and absentee owners?", a:"Yes. See our rental property maintenance page for recurring service plans built around absentee owners — scheduled visits, tenant coordination, and photo reports after every cleaning." },
      { q:"Do you offer emergency or post-storm cleaning?", a:"Yes. After named storms we prioritize existing customers and contracted properties, with same-week or next-day availability depending on demand. Call us and we'll get you in as fast as the schedule allows." },
    ],
    ctaTitle: "READY TO BOOK A CLEANING?",
    ctaSub: "Tell us your address and a rough gutter length if you know it. We'll get you a same-day estimate — no pressure, no upsell.",
    formTitle: "Book a Gutter Cleaning",
    formName: "Full Name",
    formPhone: "Phone Number",
    formEmail: "Email Address",
    formZip: "Property ZIP Code",
    formBtn: "BOOK MY CLEANING",
    formDisclaimer: "No spam. No pressure. Same-day estimate.",
    formSuccess: "Cleaning Request Received!",
    formSuccessSub: "We'll get back to you within hours.",
    preferTalk: "Prefer to talk?",
    stepLabel: "STEP",
  },
  es: {
    breadcrumb: ["Inicio","Servicios","Limpieza de Canaletas"],
    heroTag: "LIMPIEZA Y MANTENIMIENTO DE CANALETAS",
    heroH1: "Canaletas Limpias.",
    heroH1Gold: "Inspeccionadas, Fotografiadas, Documentadas.",
    heroP: "La mayoria de limpiadores sacan escombros y se van. Nosotros removemos cada pedazo, lavamos cada bajante, inspeccionamos cada soporte, fotografiamos cualquier problema — y nos llevamos los desechos. Casa unifamiliar tipica: $150-$400, con precio honesto segun pies lineales y acceso al techo.",
    btnEstimate: "RESERVE SU LIMPIEZA",
    btnCall: "LLAME AL (844) 444-3114",
    problemTag: "POR QUE LAS CANALETAS DE TAMPA NECESITAN MAS",
    problemTitle: "LOS ARBOLES DE FLORIDA NUNCA PARAN DE TIRAR",
    problems: [
      { icon:"🌳", title:"Los robles tiran cada mes", desc:"El roble vivo de Tampa tira hojas los 12 meses — no solo en otono. La mayoria de duenos subestima cuanto escombro ven sus canaletas entre limpiezas. A los 6 meses sin limpieza ya hay agua estancada." },
      { icon:"🌲", title:"Las agujas de pino se compactan", desc:"Las agujas de pino son el peor enemigo — se encajan en el canal, se compactan contra el bajante y bloquean el flujo completamente. Las casas con pinos necesitan limpieza mas frecuente." },
      { icon:"⛈️", title:"Cada tormenta descarga escombro nuevo", desc:"Las tormentas de verano y los huracanes cargan canaletas con escombros frescos en un solo evento. Una canaleta limpiada en mayo puede estar tapada despues de una sola tormenta de agosto." },
      { icon:"🏚️", title:"Limpiezas saltadas cuestan miles", desc:"Salte dos limpiezas y el desbordamiento satura la fascia detras de la canaleta. Esa limpieza de $180 que evito se vuelve una reconstruccion de $4,000 18 meses despues." },
    ],
    solutionTag: "LA DIFERENCIA DE LIMPIEZA JR ONE",
    solutionTitle: "COMO SE VE UNA LIMPIEZA REAL",
    solutionSub: "Ojos de especialista de aluminio en su sistema — limpieza plus diagnostico gratis de cualquier cosa que necesite atencion.",
    solutions: [
      { title:"Remocion completa de escombros", desc:"Cada tramo aclarado a mano o extraido con aspiradora de extremo a extremo. Valles y esquinas incluidos. Sin ignorar las secciones dificiles." },
      { title:"Lavado de cada bajante", desc:"Cada bajante se lava con agua para confirmar flujo. Bloqueos parciales en el bajante — causa #1 de desbordamiento despues de una 'limpieza' — se aclaran o se marcan." },
      { title:"Inspeccion de soportes, pendiente y sellador", desc:"Mientras estamos arriba, chequeamos apriete de soportes, pendiente de canaleta y sellador en esquinas. Problemas se fotografian y se reportan." },
      { title:"Documentacion fotografica de problemas", desc:"Si encontramos fascia podrida, sellador fallando, soportes caidos o problemas de drenaje, recibe fotos y resumen escrito — no una conversacion vaga." },
      { title:"Embolsado y llevado", desc:"Todo el escombro embolsado y removido de la propiedad. No llega a casa a montones de hojas o cubetas de mugre en la entrada." },
      { title:"Ojos de especialista, no handyman generalista", desc:"JR One es especialista de aluminio con 30+ anos. Vemos cosas que los generalistas se pierden — y podemos cotizar cualquier reparacion en el momento." },
    ],
    stats: [
      { value:"$150-$400", label:"Rango tipico unifamiliar" },
      { value:"30+", label:"Anos de experiencia en Tampa Bay" },
      { value:"100%", label:"Escombro llevado" },
      { value:"100%", label:"Documentacion fotografica" },
    ],
    scopeTag: "OPCIONES DE SERVICIO",
    scopeTitle: "ELIJA LA LIMPIEZA CORRECTA",
    scopeSub: "Premium, basica, paquete con protector o servicio de bajante — su sistema, su decision.",
    scopeItems: [
      { icon:"✨", title:"Limpieza Premium", desc:"Remocion completa, lavado de bajantes, inspeccion de soportes y sellador, documentacion fotografica y llevado de escombros. Por defecto recomendado para la mayoria de casas." },
      { icon:"🔎", title:"Ajuste Basico", desc:"Inspeccion y limpieza puntual para canaletas en condicion razonable o en horario recurrente. Menor costo para sistemas no muy sucios." },
      { icon:"🛡️", title:"Paquete Deluxe con Protectores", desc:"Cuando agrega protectores, limpiamos primero para que se instalen sobre un sistema limpio. Precio combinado vs. dos visitas separadas." },
      { icon:"🔧", title:"Limpieza de Bajante", desc:"Arreglo dirigido para un bajante obstruido. Sintoma comun: canaleta se llena y desborda en un punto aun despues de limpieza general." },
      { icon:"📅", title:"Horario Recurrente", desc:"Limpieza semestral, trimestral o post-tormenta. Con precio por debajo de limpiezas unicas y espacio prioritario en temporada de tormentas." },
      { icon:"🏢", title:"Comercial y HOA", desc:"Complejos, retail, comunidades HOA y edificios comerciales. Cotizados y programados separadamente — vea paginas comercial y HOA." },
    ],
    peakAlert: "CUANDO LIMPIAR",
    peakTitle: "Pre-verano (mayo) y post-huracan (noviembre) es el momento ideal.",
    peakDesc: "Mucha cobertura de arboles: 3-4 veces/ano. Moderada: 2 veces/ano. Casas con protectores: cada 2-3 anos. Despues de cada tormenta — sin importar el horario — los escombros de huracan son un evento propio.",
    peakBtn: "RESERVAR LIMPIEZA →",
    peakRights: "LLAMAR (844) 444-3114 →",
    goldTag: "EL ESTANDAR DE ORO",
    goldTitle: "NUESTRO PROCESO DE LIMPIEZA",
    goldMotto: "Cada casa. Cada visita. Limpiada, documentada, llevada.",
    goldSteps: [
      { num:"01", title:"EVALUAR", desc:"Caminamos la linea del techo, anotamos acceso y pies lineales, confirmamos alcance. Estimado transparente antes de subir." },
      { num:"02", title:"LIMPIAR", desc:"Aclaramos a mano o extraemos con aspiradora cada tramo. Valles y esquinas incluidos." },
      { num:"03", title:"LAVAR E INSPECCIONAR", desc:"Lavamos cada bajante con agua para confirmar flujo. Inspeccionamos soportes, pendiente y sellador. Fotografiamos problemas." },
      { num:"04", title:"REPORTAR Y LLEVAR", desc:"Resumen escrito y fotos de problemas, mas escombros embolsados llevados de la propiedad. Terminado." },
    ],
    reviewTag: "RESENAS DE CLIENTES",
    reviewTitle: "LO QUE DICEN LOS CLIENTES DE LIMPIEZA",
    reviews: [
      { text:"He tenido tres companias diferentes limpiando mis canaletas. JR One fue la primera que realmente lavo los bajantes y me mostro fotos de un soporte oxidado que no sabia que tenia.", name:"Arif K.", context:"Limpieza Premium" },
      { text:"Vinieron la semana despues de una tormenta, limpiaron todo, embolsaron y se fueron en 90 minutos. Sin desorden en el patio, sin cargos sorpresa.", name:"David K.", context:"Limpieza Post-Tormenta" },
      { text:"Tenemos pinos en tres lados de la casa. JR One nos mantiene en horario trimestral y mis canaletas finalmente ya no se desbordan.", name:"Lois G.", context:"Recurrente Trimestral" },
    ],
    faqTag: "PREGUNTAS FRECUENTES",
    faqTitle: "PREGUNTAS SOBRE LIMPIEZA DE CANALETAS",
    faqs: [
      { q:"Cuanto cuesta la limpieza de canaletas en Tampa?", a:"Casas unifamiliares tipicas corren $150-$400 dependiendo de altura del techo, pies lineales, nivel de escombro y acceso. Casas de dos pisos con techos complejos corren mas alto. Precio exacto despues de un vistazo rapido." },
      { q:"Con que frecuencia debo limpiar mis canaletas en Tampa?", a:"Mucha cobertura de arboles: 3-4 limpiezas al ano. Cobertura moderada: dos veces al ano — pre-verano (mayo) y post-huracan (noviembre). Casas con protectores: cada 2-3 anos. Casas de lote abierto sin arboles: una vez al ano minimo." },
      { q:"Llevan los escombros?", a:"Si. Todo el escombro se embolsa y se remueve de su propiedad. No llega a casa a montones de hojas." },
      { q:"Cual es la diferencia entre su limpieza y un handyman?", a:"La mayoria de handymen generales sacan lo que pueden ver y se van. Nosotros aclaramos cada tramo de extremo a extremo, lavamos cada bajante, inspeccionamos soportes y sellador, fotografiamos problemas y llevamos los desechos. Ademas somos contratista especialista de aluminio." },
      { q:"Pueden limpiar canaletas en casa de dos o tres pisos?", a:"Si. JR One esta equipado para multi-piso residencial y comercial. Nuestros equipos tienen escaleras, equipo y entrenamiento para trabajo de alto acceso." },
      { q:"Dan servicio a propiedades de alquiler y duenos ausentes?", a:"Si. Vea nuestra pagina de mantenimiento de alquileres para planes recurrentes construidos para duenos ausentes." },
      { q:"Ofrecen limpieza de emergencia o post-tormenta?", a:"Si. Despues de tormentas priorizamos clientes existentes y propiedades con contrato, con disponibilidad mismo dia o siguiente dia segun demanda." },
    ],
    ctaTitle: "LISTO PARA RESERVAR UNA LIMPIEZA?",
    ctaSub: "Cuentenos su direccion y largo aproximado de canaleta si lo sabe. Le daremos estimado mismo dia — sin presion, sin sobreventa.",
    formTitle: "Reserve Limpieza de Canaletas",
    formName: "Nombre Completo",
    formPhone: "Numero de Telefono",
    formEmail: "Correo Electronico",
    formZip: "Codigo Postal",
    formBtn: "RESERVAR MI LIMPIEZA",
    formDisclaimer: "Sin spam. Sin presion. Estimado mismo dia.",
    formSuccess: "Solicitud Recibida!",
    formSuccessSub: "Le responderemos en pocas horas.",
    preferTalk: "Prefiere hablar?",
    stepLabel: "PASO",
  },
};

export default function GutterCleaningPage() {
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

      <section style={{padding:"60px 24px 80px",maxWidth:"1200px",margin:"0 auto",display:"flex",gap:"48px",alignItems:"center",flexWrap:"wrap"}}>
        <div style={{flex:"1 1 500px",minWidth:"300px"}}>
          <Tag>{t.heroTag}</Tag>
          <h1 style={{fontFamily:f.h,fontSize:"clamp(32px,5vw,48px)",fontWeight:800,lineHeight:1.1,marginBottom:"20px"}}>{t.heroH1}<br/><span style={{color:C.accent}}>{t.heroH1Gold}</span></h1>
          <p style={{fontFamily:f.b,fontSize:"18px",color:C.offWhite,lineHeight:1.7,marginBottom:"32px",maxWidth:"560px"}}>{t.heroP}</p>
          <div style={{display:"flex",gap:"16px",flexWrap:"wrap"}}>
            <button onClick={()=>document.getElementById("quote-form")?.scrollIntoView({behavior:"smooth"})} style={{padding:"16px 36px",fontFamily:f.h,fontSize:"14px",fontWeight:700,letterSpacing:"1.5px",color:C.white,background:`linear-gradient(135deg,${C.accent},${C.accentLight})`,border:"none",borderRadius:"8px",cursor:"pointer",boxShadow:"0 4px 16px rgba(45,139,78,0.3)"}}>{t.btnEstimate}</button>
            <a href="tel:8444443114" style={{display:"inline-flex",alignItems:"center",padding:"16px 36px",fontFamily:f.h,fontSize:"14px",fontWeight:700,letterSpacing:"1.5px",color:C.accent,background:"transparent",border:`2px solid ${C.accent}`,borderRadius:"8px",textDecoration:"none"}}>📞 {t.btnCall}</a>
          </div>
          <div style={{display:"flex",gap:"24px",marginTop:"32px",flexWrap:"wrap"}}>{t.stats.map((s,i) => <div key={i} style={{textAlign:"center"}}><div style={{fontFamily:f.h,fontSize:"28px",fontWeight:800,color:C.accent}}>{s.value}</div><div style={{fontFamily:f.b,fontSize:"12px",color:C.muted,maxWidth:"110px"}}>{s.label}</div></div>)}</div>
        </div>
      </section>

      <section style={{background:C.navy,padding:"80px 24px"}}>
        <div style={{maxWidth:"1200px",margin:"0 auto",textAlign:"center"}}>
          <Tag>{t.problemTag}</Tag>
          <h2 style={{...secTitle,color:C.white}}>{t.problemTitle}</h2>
          <GoldBar />
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(250px,1fr))",gap:"24px",marginTop:"48px",textAlign:"left"}}>
            {t.problems.map((p,i) => <div key={i} style={{background:C.navyFade,border:`1px solid ${C.navyLight}`,borderRadius:"12px",padding:"28px",borderLeft:`4px solid ${C.gold}`}}><div style={{fontSize:"28px",marginBottom:"12px"}}>{p.icon}</div><h3 style={{fontFamily:f.h,fontSize:"17px",fontWeight:700,color:C.white,marginBottom:"8px"}}>{p.title}</h3><p style={{fontFamily:f.b,fontSize:"15px",color:C.muted,lineHeight:1.55}}>{p.desc}</p></div>)}
          </div>
        </div>
      </section>

      <section style={{background:C.bg,padding:"80px 24px"}}>
        <div style={sec}>
          <div style={{textAlign:"center"}}><Tag>{t.solutionTag}</Tag><h2 style={{...secTitle,color:C.white}}>{t.solutionTitle}</h2><GoldBar /><p style={{fontFamily:f.b,fontSize:"17px",color:C.muted,maxWidth:"600px",margin:"0 auto 48px"}}>{t.solutionSub}</p></div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(340px,1fr))",gap:"20px"}}>
            {t.solutions.map((s,i) => <div key={i} style={{background:C.navyFade,border:`1px solid ${C.navyLight}`,borderRadius:"12px",padding:"28px",transition:"border-color 0.3s"}} onMouseOver={e=>e.currentTarget.style.borderColor=C.accent} onMouseOut={e=>e.currentTarget.style.borderColor=C.navyLight}><div style={{fontFamily:f.h,fontSize:"11px",fontWeight:700,color:C.accent,letterSpacing:"2px",marginBottom:"8px"}}>0{i+1}</div><h3 style={{fontFamily:f.h,fontSize:"17px",fontWeight:700,color:C.white,marginBottom:"10px"}}>{s.title}</h3><p style={{fontFamily:f.b,fontSize:"15px",color:C.muted,lineHeight:1.6}}>{s.desc}</p></div>)}
          </div>
        </div>
      </section>

      <section style={{background:C.navy,padding:"80px 24px"}}>
        <div style={{maxWidth:"1200px",margin:"0 auto"}}>
          <div style={{textAlign:"center"}}><Tag>{t.scopeTag}</Tag><h2 style={{...secTitle,color:C.white}}>{t.scopeTitle}</h2><GoldBar /><p style={{fontFamily:f.b,fontSize:"17px",color:C.muted,maxWidth:"600px",margin:"0 auto 48px"}}>{t.scopeSub}</p></div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))",gap:"20px"}}>
            {t.scopeItems.map((g,i) => <div key={i} style={{background:C.navyFade,border:`1px solid ${C.navyLight}`,borderRadius:"12px",padding:"28px",borderTop:`4px solid ${C.gold}`}}><div style={{fontSize:"28px",marginBottom:"12px"}}>{g.icon}</div><h3 style={{fontFamily:f.h,fontSize:"17px",fontWeight:700,color:C.white,marginBottom:"10px"}}>{g.title}</h3><p style={{fontFamily:f.b,fontSize:"15px",color:C.muted,lineHeight:1.6}}>{g.desc}</p></div>)}
          </div>
        </div>
      </section>

      <section style={{background:"linear-gradient(135deg, rgba(45,139,78,0.08), rgba(15,30,54,0.97))",padding:"28px 24px",borderTop:`2px solid ${C.accent}`,borderBottom:`2px solid ${C.accent}`}}>
        <div style={{maxWidth:"1000px",margin:"0 auto",display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:"20px"}}>
          <div style={{flex:"1 1 500px"}}>
            <div style={{display:"flex",alignItems:"center",gap:"8px",marginBottom:"8px"}}><span style={{fontSize:"16px"}}>📅</span><span style={{fontFamily:f.h,fontSize:"11px",fontWeight:700,color:C.accent,letterSpacing:"2px"}}>{t.peakAlert}</span></div>
            <p style={{fontFamily:f.h,fontSize:"clamp(16px,2.5vw,20px)",fontWeight:800,color:C.white,lineHeight:1.3,marginBottom:"6px"}}>{t.peakTitle}</p>
            <p style={{fontFamily:f.b,fontSize:"14px",color:C.muted,lineHeight:1.5}}>{t.peakDesc}</p>
          </div>
          <div style={{display:"flex",flexDirection:"column",gap:"8px",flexShrink:0}}>
            <a href="tel:8444443114" style={{padding:"12px 24px",fontFamily:f.h,fontSize:"12px",fontWeight:700,letterSpacing:"1px",color:C.white,background:`linear-gradient(135deg, ${C.accent}, ${C.accentLight})`,borderRadius:"6px",textDecoration:"none",textAlign:"center",boxShadow:"0 4px 12px rgba(45,139,78,0.3)"}}>{t.peakRights}</a>
          </div>
        </div>
      </section>

      <section style={{background:C.navy,padding:"80px 24px"}}>
        <div style={sec}><div style={{textAlign:"center"}}><Tag>{t.goldTag}</Tag><h2 style={{...secTitle,color:C.white}}>{t.goldTitle}</h2><GoldBar /><p style={{fontFamily:f.b,fontSize:"17px",color:C.offWhite,fontStyle:"italic",maxWidth:"500px",margin:"0 auto 48px"}}>{t.goldMotto}</p></div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(250px,1fr))",gap:"24px"}}>{t.goldSteps.map((step,i) => <div key={i} style={{background:C.navyFade,border:`1px solid ${C.navyLight}`,borderRadius:"12px",padding:"28px",position:"relative"}}><div style={{fontFamily:f.h,fontSize:"36px",fontWeight:800,color:"rgba(45,139,78,0.08)",position:"absolute",top:"16px",right:"20px"}}>{step.num}</div><div style={{fontFamily:f.h,fontSize:"11px",fontWeight:700,color:C.accent,letterSpacing:"3px",marginBottom:"8px"}}>{t.stepLabel} {step.num}</div><h3 style={{fontFamily:f.h,fontSize:"22px",fontWeight:700,color:C.white,marginBottom:"12px"}}>{step.title}</h3><p style={{fontFamily:f.b,fontSize:"15px",color:C.muted,lineHeight:1.6}}>{step.desc}</p></div>)}</div>
        </div>
      </section>

      <section style={{background:C.bg,padding:"80px 24px"}}><div style={sec}><div style={{textAlign:"center"}}><Tag>{t.reviewTag}</Tag><h2 style={{...secTitle,color:C.white}}>{t.reviewTitle}</h2><GoldBar /></div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(300px,1fr))",gap:"20px",marginTop:"48px"}}>{t.reviews.map((rev,i) => <div key={i} style={{background:C.navyFade,border:`1px solid ${C.navyLight}`,borderRadius:"12px",padding:"28px"}}><Stars /><p style={{fontFamily:f.b,fontSize:"15px",color:C.offWhite,lineHeight:1.65,margin:"16px 0",fontStyle:"italic"}}>"{rev.text}"</p><div style={{borderTop:`1px solid ${C.navyLight}`,paddingTop:"12px",display:"flex",justifyContent:"space-between",alignItems:"center"}}><span style={{fontFamily:f.h,fontSize:"14px",fontWeight:600,color:C.white}}>{rev.name}</span><span style={{fontFamily:f.b,fontSize:"12px",color:C.muted}}>{rev.context}</span></div></div>)}</div></div></section>

      <section style={{background:C.navy,padding:"80px 24px"}}><div style={{maxWidth:"800px",margin:"0 auto",textAlign:"center"}}><Tag>{t.faqTag}</Tag><h2 style={{...secTitle,color:C.white}}>{t.faqTitle}</h2><GoldBar />
        <div style={{marginTop:"40px",textAlign:"left"}}>{t.faqs.map((faq,i) => <div key={i} style={{borderBottom:`1px solid ${C.navyLight}`}}><button onClick={()=>setOpenFaq(openFaq===i?null:i)} style={{width:"100%",padding:"20px 0",background:"none",border:"none",cursor:"pointer",display:"flex",justifyContent:"space-between",alignItems:"center",gap:"16px"}}><span style={{fontFamily:f.h,fontSize:"15px",fontWeight:600,color:openFaq===i?C.accent:C.white,textAlign:"left",transition:"color 0.2s"}}>{faq.q}</span><span style={{fontFamily:f.h,fontSize:"20px",color:C.accent,transform:openFaq===i?"rotate(45deg)":"none",transition:"transform 0.3s",flexShrink:0}}>+</span></button>{openFaq===i&&<div style={{padding:"0 0 20px",fontFamily:f.b,fontSize:"15px",color:C.muted,lineHeight:1.65}}>{faq.a}</div>}</div>)}</div></div></section>

      <section id="quote-form" style={{background:`linear-gradient(165deg,${C.navyMid},${C.navy})`,padding:"80px 24px"}}><div style={{maxWidth:"600px",margin:"0 auto",textAlign:"center"}}>
        <h2 style={{fontFamily:f.h,fontSize:"clamp(28px,5vw,40px)",fontWeight:800,color:C.white,marginBottom:"12px"}}>{t.ctaTitle}</h2>
        <p style={{fontFamily:f.b,fontSize:"17px",color:C.offWhite,marginBottom:"40px"}}>{t.ctaSub}</p>
        {submitted ? <div style={{background:C.successDim,border:`1px solid ${C.success}`,borderRadius:"12px",padding:"32px"}}><div style={{fontSize:"48px",marginBottom:"12px"}}>✓</div><h3 style={{fontFamily:f.h,fontSize:"20px",fontWeight:700,color:"#4ADE80"}}>{t.formSuccess}</h3><p style={{fontFamily:f.b,fontSize:"15px",color:C.muted,marginTop:"8px"}}>{t.formSuccessSub}</p></div> : <div style={{background:C.white,borderRadius:"16px",padding:"32px",boxShadow:"0 24px 80px rgba(0,0,0,0.4)",textAlign:"left"}}>
          <h3 style={{fontFamily:f.h,fontSize:"18px",fontWeight:700,color:C.navy,textAlign:"center",marginBottom:"4px"}}>{t.formTitle}</h3>
          <div style={{width:"40px",height:"3px",background:C.accent,borderRadius:"2px",margin:"10px auto 20px"}} />
          <input style={inputStyle} placeholder={t.formName} value={formData.name} onChange={e=>setFormData({...formData,name:e.target.value})} />
          <input style={inputStyle} placeholder={t.formPhone} type="tel" value={formData.phone} onChange={e=>setFormData({...formData,phone:e.target.value})} />
          <input style={inputStyle} placeholder={t.formEmail} type="email" value={formData.email} onChange={e=>setFormData({...formData,email:e.target.value})} />
          <input style={inputStyle} placeholder={t.formZip} value={formData.zip} onChange={e=>setFormData({...formData,zip:e.target.value})} maxLength={5} />
          <button onClick={()=>setSubmitted(true)} style={{width:"100%",padding:"16px",fontFamily:f.h,fontSize:"14px",fontWeight:700,letterSpacing:"1.5px",color:C.white,background:`linear-gradient(135deg,${C.accent},${C.accentLight})`,border:"none",borderRadius:"8px",cursor:"pointer",boxShadow:"0 4px 16px rgba(45,139,78,0.3)"}}>{t.formBtn}</button>
          <p style={{fontFamily:f.b,fontSize:"12px",color:"#9CA3AF",textAlign:"center",marginTop:"12px"}}>{t.formDisclaimer}</p>
        </div>}
        <div style={{marginTop:"32px"}}><p style={{fontFamily:f.b,fontSize:"15px",color:C.muted,marginBottom:"8px"}}>{t.preferTalk}</p><a href="tel:8444443114" style={{fontFamily:f.h,fontSize:"18px",fontWeight:700,color:C.gold,textDecoration:"none"}}>📞 (844) 444-3114</a></div>
      </div></section>

      <SiteFooter />
      <MobileCTA scrollTarget="quote-form" />
      <style>{`*{box-sizing:border-box;margin:0;padding:0}::placeholder{color:#9CA3AF}input:focus{border-color:${C.accent}!important}`}</style>
    </div>
  );
}
