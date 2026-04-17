"use client";

import { useState, useEffect } from "react";
import SiteNav from "../../components/SiteNav";
import SiteFooter from "../../components/SiteFooter";
import MobileCTA from "../../components/MobileCTA";
import { useLanguage } from "../../lib/LanguageContext";

const injectFonts = () => { if (typeof document==="undefined"||document.querySelector("#jr-fonts")) return; const l=document.createElement("link"); l.id="jr-fonts"; l.rel="stylesheet"; l.href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800&family=Source+Sans+3:wght@300;400;600&display=swap"; document.head.appendChild(l); };
const C = { bg:"#0B1628",navy:"#1B2A4A",navyMid:"#243556",navyLight:"#2C3E5A",navyFade:"#162033",gold:"#C8952E",goldLight:"#D4A843",goldPale:"rgba(200,149,46,0.12)",cream:"#F5F3EF",white:"#FFFFFF",offWhite:"#E8E4DC",muted:"#7A8FA8",charcoal:"#2D2D2D",success:"#2D8B4E",successDim:"rgba(45,139,78,0.15)",accent:"#C8952E",accentLight:"#D4A843",accentPale:"rgba(200,149,46,0.12)" };
const f = { h:"'Montserrat', sans-serif", b:"'Source Sans 3', sans-serif" };
const Tag = ({children}) => <div style={{display:"inline-block",padding:"6px 16px",background:C.accentPale,borderRadius:"4px",marginBottom:"12px"}}><span style={{fontFamily:f.h,fontSize:"12px",fontWeight:700,color:C.accent,letterSpacing:"3px"}}>{children}</span></div>;
const GoldBar = () => <div style={{width:"60px",height:"3px",background:`linear-gradient(90deg,${C.accent},${C.accentLight})`,borderRadius:"2px",margin:"16px auto"}} />;
const Stars = () => <span style={{color:C.gold,fontSize:"14px",letterSpacing:"2px"}}>★★★★★</span>;
const inputStyle = {width:"100%",padding:"13px 16px",fontFamily:f.b,fontSize:"15px",border:"1.5px solid #D1D5DB",borderRadius:"8px",outline:"none",color:C.charcoal,marginBottom:"12px",background:"#FAFAFA",boxSizing:"border-box"};

const T = {
  en: {
    breadcrumb: ["Home","Services","HOA Contracts"],
    heroTag: "HOA MAINTENANCE CONTRACTS",
    heroH1: "The Aluminum Contractor",
    heroH1Gold: "HOAs Keep on Speed Dial",
    heroP: "JR One handles gutter, soffit, fascia, and aluminum upkeep across Tampa Bay's managed communities. One contract, one crew, one point of contact for the property manager — bilingual, insured, and reliable enough to put on the community calendar.",
    btnEstimate: "REQUEST AN HOA WALKTHROUGH",
    btnCall: "CALL (844) 444-3114",
    problemTag: "WHY HOAs CALL US",
    problemTitle: "WHAT BREAKS DOWN IN A MANAGED COMMUNITY",
    problems: [
      { icon:"🏘️", title:"Scattered single-home vendors", desc:"Most HOAs end up with 4-5 handymen covering 200 homes. Quality drifts, pricing drifts, and nobody can tell the property manager what's actually been done street-by-street." },
      { icon:"🌧️", title:"Post-storm volume nobody can handle", desc:"After every named storm, HOAs get flooded with calls about sagging gutters, blown soffit panels, and detached fascia. A single handyman with a ladder can't process 40 units in a week." },
      { icon:"📋", title:"Missed preventive cycles", desc:"Gutter cleaning, soffit inspection, and fascia checks skip a season. Rot spreads behind walls. Eighteen months later the HOA is looking at a special assessment nobody wanted." },
      { icon:"🗣️", title:"Language friction with residents", desc:"Tampa's HOA resident population is heavily bilingual. Crews that only speak English miss half the conversation — and half the issues never get reported cleanly." },
    ],
    solutionTag: "THE JR ONE HOA DIFFERENCE",
    solutionTitle: "HOW WE WORK WITH HOAs AND PROPERTY MANAGERS",
    solutionSub: "One contract, one vendor, one relationship — built for communities, not drive-by service calls.",
    solutions: [
      { title:"Community-wide scheduled maintenance", desc:"Semi-annual or quarterly gutter cleaning, soffit and fascia inspection, downspout flushing, and flow testing across every unit in the community — on a schedule the property manager can publish in the newsletter." },
      { title:"Single-point manager reporting", desc:"After every service cycle we deliver a unit-by-unit report: what was cleaned, what was flagged, photos of issues found, and recommended follow-ups. The property manager forwards it to the board, not a shoebox of invoices." },
      { title:"Community-wide pricing, not per-house retail", desc:"HOA contracts get volume pricing because we route crews community-by-community, not drive-out-per-house. The savings vs. individual homeowners booking us one at a time is real." },
      { title:"Bilingual crews end-to-end", desc:"Every JR One crew is fully bilingual EN/ES. Residents get clear answers in the language they speak. Property managers get one English contact who owns the account." },
      { title:"Storm-response priority for contracted HOAs", desc:"After a named storm we prioritize contracted HOAs ahead of the retail queue. Your community doesn't wait three weeks because we routed one-off jobs first." },
      { title:"Specialty aluminum contractor — not a generalist", desc:"Gutters, soffit, fascia, aluminum trim, drainage — we do one thing and we do it across thousands of homes. No roofer-subcontracts-the-gutter-guy handoff, no quality drift." },
    ],
    stats: [
      { value:"25+", label:"HOA & managed communities served" },
      { value:"30+", label:"Years of Tampa Bay aluminum work" },
      { value:"48h", label:"Typical walkthrough turnaround" },
      { value:"100%", label:"In-house bilingual crews" },
    ],
    scopeTag: "WHAT'S IN THE CONTRACT",
    scopeTitle: "SERVICES COVERED IN AN HOA AGREEMENT",
    scopeSub: "Build your contract from any combination of these — priced per unit, per LF, or per community based on your scope.",
    scopeItems: [
      { icon:"🧹", title:"Gutter cleaning & downspout flushing", desc:"Full debris removal and downspout clearing across every unit on a scheduled cadence (quarterly, semi-annual, or post-storm)." },
      { icon:"🔍", title:"Gutter, soffit & fascia inspection", desc:"Walkthrough inspection with photo documentation of sagging hangers, loose panels, rotted fascia, and failed seams — flagged before they turn into community-wide issues." },
      { icon:"🔧", title:"Gutter repair & re-pitching", desc:"Resealing, hanger replacement, and pitch correction on gutters that are still serviceable but starting to fail." },
      { icon:"🏠", title:"Soffit & fascia panel replacement", desc:"Per-unit replacement of wind-damaged or rotted aluminum panels and fascia wraps, color-matched to community spec." },
      { icon:"💧", title:"Downspout reroute & drainage fixes", desc:"Correcting drainage problems that erode landscaping, flood sidewalks, or pool water at foundations — a constant HOA complaint driver." },
      { icon:"⛈️", title:"Post-storm rapid response", desc:"Within 72 hours of a named storm we walk the community, document damage, and coordinate the repair queue with the property manager." },
    ],
    peakAlert: "TAMPA BAY COVERAGE",
    peakTitle: "We serve HOAs across 5 counties and 21 cities.",
    peakDesc: "Hillsborough, Pinellas, Pasco, Manatee, and Sarasota — Tampa, Clearwater, St. Pete, Sarasota, Bradenton, Lakeland, Brandon, Wesley Chapel, Riverview, Palm Harbor, Temple Terrace, and more.",
    peakBtn: "SERVICE AREAS →",
    peakRights: "CONTACT →",
    goldTag: "THE GOLD STANDARD",
    goldTitle: "HOW WE ONBOARD AN HOA",
    goldMotto: "One walkthrough. One contract. One vendor the board trusts.",
    goldSteps: [
      { num:"01", title:"WALKTHROUGH", desc:"Free community-wide walkthrough with the property manager. We document unit count, gutter linear feet, soffit condition, and the current pain points the board is hearing about." },
      { num:"02", title:"SCOPE", desc:"Custom scope built from the service menu above — quarterly cleaning, semi-annual inspection, post-storm response, whatever the community actually needs. No one-size contract." },
      { num:"03", title:"AGREEMENT", desc:"Transparent contract with unit-level pricing, service cadence, reporting format, and escalation path. The board approves, and we lock it in." },
      { num:"04", title:"EXECUTE & REPORT", desc:"We execute on schedule and deliver a unit-by-unit report after every cycle. The property manager forwards it to the board. No surprises, no unknowns." },
    ],
    reviewTag: "PROPERTY MANAGER REVIEWS",
    reviewTitle: "WHAT HOA BOARDS AND PMs SAY",
    reviews: [
      { text:"We had three different handymen covering 180 homes. Switched the whole aluminum side over to JR One and the number of resident complaints dropped in a month. One point of contact made it sustainable.", name:"Community Manager", context:"Hillsborough HOA" },
      { text:"After Hurricane Idalia we had panels blown off 40-plus units. JR One walked the community in 48 hours and had a prioritized repair queue we could share with the board. That kind of response is rare.", name:"HOA Board Member", context:"Pinellas Townhome Community" },
      { text:"The bilingual piece matters more than people realize. Our residents felt heard. That alone changed the dynamic on service days.", name:"Property Manager", context:"South Tampa Community" },
    ],
    faqTag: "FAQ",
    faqTitle: "HOA MAINTENANCE CONTRACT QUESTIONS",
    faqs: [
      { q:"What size HOA do you take on?", a:"We work with communities from 12-unit townhome groups up to 400+ unit master-planned associations. Below 12 units we typically recommend individual service calls rather than a contract. Above 400 we split the community into service zones for efficient routing." },
      { q:"How is HOA pricing structured?", a:"Pricing is custom per community based on unit count, gutter linear footage, roof accessibility, and scope (cleaning only vs. full maintenance). Most HOAs land on a fixed monthly or quarterly retainer that covers the scheduled scope, with a transparent per-unit rate for out-of-scope repairs." },
      { q:"Do you require a multi-year contract?", a:"No. Most of our HOA contracts are annual with a renewal review. We'd rather earn the renewal every year than lock boards into a long-term deal they can't get out of." },
      { q:"Can you coordinate with our existing roofing vendor?", a:"Yes. We coordinate directly with roofing contractors, painters, and landscapers when scopes overlap — particularly on soffit/fascia work that touches the roofline. We've worked alongside most of Tampa's larger exterior trades." },
      { q:"What about post-storm emergency response?", a:"Contracted HOAs get priority ahead of our retail queue. Within 72 hours of a named storm we walk the community, document damage, and provide the property manager with a prioritized repair list ready for board review or insurance claim support." },
      { q:"Are your crews insured for HOA work?", a:"Yes. JR One Aluminum carries full general liability and workers' compensation coverage. We provide certificates of insurance directly to the property manager or management company on request, with the HOA named as additional insured where required." },
      { q:"Can you provide reporting the board will understand?", a:"Every service cycle ends with a unit-by-unit report: what was done, what was flagged, photos of any issues found, and recommended follow-ups. It's written for board-meeting consumption, not just billing." },
    ],
    ctaTitle: "READY TO SIMPLIFY YOUR HOA'S ALUMINUM MAINTENANCE?",
    ctaSub: "Request a free community walkthrough. We'll meet the property manager on-site, assess the scope, and put a transparent contract in front of the board — with no obligation.",
    formTitle: "Request an HOA Walkthrough",
    formName: "Property Manager Name",
    formPhone: "Phone Number",
    formEmail: "Email Address",
    formZip: "Community ZIP Code",
    formBtn: "REQUEST FREE HOA WALKTHROUGH",
    formDisclaimer: "No spam. No pressure. Direct conversation with the owner.",
    formSuccess: "Walkthrough Request Received!",
    formSuccessSub: "We'll get back to you within one business day.",
    preferTalk: "Prefer to talk?",
    stepLabel: "STEP",
  },
  es: {
    breadcrumb: ["Inicio","Servicios","Contratos HOA"],
    heroTag: "CONTRATOS DE MANTENIMIENTO HOA",
    heroH1: "El Contratista de Aluminio",
    heroH1Gold: "Que las HOAs Tienen en Marcado Rapido",
    heroP: "JR One maneja canaletas, sofito, fascia y mantenimiento de aluminio en las comunidades administradas de Tampa Bay. Un contrato, un equipo, un punto de contacto para el administrador — bilingue, asegurado, y confiable para poner en el calendario comunitario.",
    btnEstimate: "SOLICITE UN RECORRIDO HOA",
    btnCall: "LLAME AL (844) 444-3114",
    problemTag: "POR QUE NOS LLAMAN LAS HOAs",
    problemTitle: "LO QUE SE ROMPE EN UNA COMUNIDAD ADMINISTRADA",
    problems: [
      { icon:"🏘️", title:"Vendedores sueltos casa por casa", desc:"La mayoria de las HOAs terminan con 4-5 trabajadores cubriendo 200 casas. La calidad se dispersa, los precios se dispersan, y nadie puede decirle al administrador que se hizo exactamente en cada calle." },
      { icon:"🌧️", title:"Volumen post-tormenta que nadie maneja", desc:"Despues de cada tormenta, las HOAs reciben llamadas sobre canaletas caidas, paneles de sofito volados y fascia despegada. Un solo trabajador con escalera no procesa 40 unidades en una semana." },
      { icon:"📋", title:"Ciclos preventivos saltados", desc:"La limpieza de canaletas, la inspeccion de sofito y los chequeos de fascia se saltan una temporada. La pudricion se extiende detras de las paredes. Dieciocho meses despues la HOA enfrenta una evaluacion especial que nadie queria." },
      { icon:"🗣️", title:"Friccion de idioma con residentes", desc:"La poblacion de residentes HOA de Tampa es muy bilingue. Los equipos que solo hablan ingles pierden la mitad de la conversacion — y la mitad de los problemas nunca se reportan bien." },
    ],
    solutionTag: "LA DIFERENCIA HOA DE JR ONE",
    solutionTitle: "COMO TRABAJAMOS CON HOAs Y ADMINISTRADORES",
    solutionSub: "Un contrato, un proveedor, una relacion — construida para comunidades, no llamadas de servicio sueltas.",
    solutions: [
      { title:"Mantenimiento programado a nivel comunitario", desc:"Limpieza de canaletas semestral o trimestral, inspeccion de sofito y fascia, lavado de bajantes y prueba de flujo en cada unidad de la comunidad — en un horario que el administrador puede publicar." },
      { title:"Reporte de punto unico para el administrador", desc:"Despues de cada ciclo entregamos un reporte unidad por unidad: que se limpio, que se marco, fotos de problemas encontrados y seguimientos recomendados. El administrador lo reenvia a la junta, no una caja de facturas." },
      { title:"Precios comunitarios, no minoristas por casa", desc:"Los contratos HOA obtienen precios por volumen porque enrutamos equipos comunidad por comunidad. El ahorro vs reservarnos casa por casa es real." },
      { title:"Equipos bilingues de principio a fin", desc:"Cada equipo de JR One es completamente bilingue EN/ES. Los residentes obtienen respuestas claras en su idioma. Los administradores tienen un contacto en ingles que es dueno de la cuenta." },
      { title:"Prioridad de respuesta post-tormenta para HOAs con contrato", desc:"Despues de una tormenta priorizamos las HOAs con contrato antes de la cola minorista. Su comunidad no espera tres semanas." },
      { title:"Contratista especialista de aluminio — no generalista", desc:"Canaletas, sofito, fascia, molduras de aluminio, drenaje — hacemos una cosa y la hacemos en miles de casas. Sin entregas a subcontratistas, sin perdida de calidad." },
    ],
    stats: [
      { value:"25+", label:"HOAs y comunidades administradas atendidas" },
      { value:"30+", label:"Anos de trabajo de aluminio en Tampa Bay" },
      { value:"48h", label:"Tiempo tipico de recorrido" },
      { value:"100%", label:"Equipos propios bilingues" },
    ],
    scopeTag: "LO QUE INCLUYE EL CONTRATO",
    scopeTitle: "SERVICIOS CUBIERTOS EN UN ACUERDO HOA",
    scopeSub: "Construya su contrato con cualquier combinacion — con precio por unidad, por pie lineal, o por comunidad segun alcance.",
    scopeItems: [
      { icon:"🧹", title:"Limpieza de canaletas y bajantes", desc:"Remocion completa de escombros y lavado de bajantes en cada unidad en un cronograma establecido (trimestral, semestral, o post-tormenta)." },
      { icon:"🔍", title:"Inspeccion de canaletas, sofito y fascia", desc:"Inspeccion con documentacion fotografica de soportes caidos, paneles sueltos, fascia podrida y costuras fallidas — marcados antes de ser problemas comunitarios." },
      { icon:"🔧", title:"Reparacion de canaletas y re-inclinacion", desc:"Resellado, reemplazo de soportes y correccion de pendiente en canaletas que aun sirven pero empiezan a fallar." },
      { icon:"🏠", title:"Reemplazo de paneles de sofito y fascia", desc:"Reemplazo por unidad de paneles de aluminio danados por viento o podridos y envolturas de fascia, combinados al color de la comunidad." },
      { icon:"💧", title:"Redireccion de bajantes y drenaje", desc:"Correccion de problemas de drenaje que erosionan paisajismo, inundan aceras o acumulan agua en fundaciones — una queja constante en HOAs." },
      { icon:"⛈️", title:"Respuesta rapida post-tormenta", desc:"Dentro de 72 horas de una tormenta caminamos la comunidad, documentamos dano y coordinamos la cola de reparacion con el administrador." },
    ],
    peakAlert: "COBERTURA TAMPA BAY",
    peakTitle: "Servimos HOAs en 5 condados y 21 ciudades.",
    peakDesc: "Hillsborough, Pinellas, Pasco, Manatee y Sarasota — Tampa, Clearwater, St. Pete, Sarasota, Bradenton, Lakeland, Brandon, Wesley Chapel, Riverview, Palm Harbor, Temple Terrace y mas.",
    peakBtn: "AREAS DE SERVICIO →",
    peakRights: "CONTACTO →",
    goldTag: "EL ESTANDAR DE ORO",
    goldTitle: "COMO INTEGRAMOS UNA HOA",
    goldMotto: "Un recorrido. Un contrato. Un proveedor en que la junta confia.",
    goldSteps: [
      { num:"01", title:"RECORRIDO", desc:"Recorrido comunitario gratis con el administrador. Documentamos unidades, pies lineales de canaleta, condicion de sofito y puntos de dolor actuales." },
      { num:"02", title:"ALCANCE", desc:"Alcance personalizado del menu de servicios — limpieza trimestral, inspeccion semestral, respuesta post-tormenta, lo que necesite la comunidad." },
      { num:"03", title:"ACUERDO", desc:"Contrato transparente con precios por unidad, cadencia, formato de reporte y ruta de escalamiento. La junta aprueba y lo cerramos." },
      { num:"04", title:"EJECUCION Y REPORTE", desc:"Ejecutamos segun horario y entregamos reporte unidad por unidad despues de cada ciclo. Sin sorpresas." },
    ],
    reviewTag: "RESENAS DE ADMINISTRADORES",
    reviewTitle: "LO QUE DICEN JUNTAS Y ADMINISTRADORES",
    reviews: [
      { text:"Teniamos tres trabajadores cubriendo 180 casas. Cambiamos todo el lado de aluminio a JR One y las quejas bajaron en un mes. Un punto de contacto lo hizo sostenible.", name:"Administradora Comunitaria", context:"HOA de Hillsborough" },
      { text:"Despues del Huracan Idalia tuvimos paneles volados en 40+ unidades. JR One camino la comunidad en 48 horas y tuvo una cola de reparacion priorizada. Esa respuesta es rara.", name:"Miembro de Junta HOA", context:"Comunidad de Casas en Pinellas" },
      { text:"La parte bilingue importa mas de lo que la gente piensa. Nuestros residentes se sintieron escuchados.", name:"Administradora de Propiedad", context:"Comunidad Sur de Tampa" },
    ],
    faqTag: "PREGUNTAS FRECUENTES",
    faqTitle: "PREGUNTAS SOBRE CONTRATOS DE MANTENIMIENTO HOA",
    faqs: [
      { q:"Que tamano de HOA aceptan?", a:"Trabajamos con comunidades desde 12 unidades hasta 400+. Por debajo de 12 recomendamos llamadas individuales. Por encima de 400 dividimos en zonas de servicio." },
      { q:"Como se estructura el precio de una HOA?", a:"Es personalizado por comunidad segun unidades, pies lineales, accesibilidad de techo y alcance. La mayoria termina con un retenedor mensual o trimestral fijo con tarifa por unidad transparente para reparaciones fuera de alcance." },
      { q:"Requieren contrato de varios anos?", a:"No. La mayoria son anuales con revision de renovacion. Preferimos ganar la renovacion cada ano." },
      { q:"Pueden coordinar con nuestro techero actual?", a:"Si. Coordinamos directamente con techeros, pintores y jardineros cuando los alcances se traslapan — particularmente en sofito/fascia que toca la linea del techo." },
      { q:"Que hay de respuesta de emergencia post-tormenta?", a:"Las HOAs con contrato tienen prioridad antes de la cola minorista. Dentro de 72 horas caminamos la comunidad y damos una lista priorizada para revision de junta o reclamo de seguro." },
      { q:"Estan asegurados para trabajo en HOAs?", a:"Si. JR One Aluminum tiene cobertura completa de responsabilidad general y compensacion laboral. Entregamos certificados al administrador con la HOA nombrada como asegurado adicional si se requiere." },
      { q:"Pueden dar reportes que la junta entienda?", a:"Cada ciclo termina con un reporte unidad por unidad: que se hizo, que se marco, fotos y seguimientos. Escrito para reunion de junta, no solo facturacion." },
    ],
    ctaTitle: "LISTO PARA SIMPLIFICAR EL MANTENIMIENTO DE ALUMINIO DE SU HOA?",
    ctaSub: "Solicite un recorrido comunitario gratis. Nos reunimos con el administrador en sitio, evaluamos el alcance y ponemos un contrato transparente frente a la junta — sin obligacion.",
    formTitle: "Solicite un Recorrido HOA",
    formName: "Nombre del Administrador",
    formPhone: "Numero de Telefono",
    formEmail: "Correo Electronico",
    formZip: "Codigo Postal de la Comunidad",
    formBtn: "SOLICITAR RECORRIDO HOA GRATIS",
    formDisclaimer: "Sin spam. Sin presion. Conversacion directa con el dueno.",
    formSuccess: "Solicitud Recibida!",
    formSuccessSub: "Le responderemos dentro de un dia habil.",
    preferTalk: "Prefiere hablar?",
    stepLabel: "PASO",
  },
};

export default function HOAContractsPage() {
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
      <section style={{padding:"60px 24px 80px",maxWidth:"1200px",margin:"0 auto",display:"flex",gap:"48px",alignItems:"center",flexWrap:"wrap"}}>
        <div style={{flex:"1 1 500px",minWidth:"300px"}}>
          <Tag>{t.heroTag}</Tag>
          <h1 style={{fontFamily:f.h,fontSize:"clamp(32px,5vw,48px)",fontWeight:800,lineHeight:1.1,marginBottom:"20px"}}>{t.heroH1}<br/><span style={{color:C.accent}}>{t.heroH1Gold}</span></h1>
          <p style={{fontFamily:f.b,fontSize:"18px",color:C.offWhite,lineHeight:1.7,marginBottom:"32px",maxWidth:"560px"}}>{t.heroP}</p>
          <div style={{display:"flex",gap:"16px",flexWrap:"wrap"}}>
            <button onClick={()=>document.getElementById("quote-form")?.scrollIntoView({behavior:"smooth"})} style={{padding:"16px 36px",fontFamily:f.h,fontSize:"14px",fontWeight:700,letterSpacing:"1.5px",color:C.white,background:`linear-gradient(135deg,${C.accent},${C.accentLight})`,border:"none",borderRadius:"8px",cursor:"pointer",boxShadow:"0 4px 16px rgba(200,149,46,0.3)"}}>{t.btnEstimate}</button>
            <a href="tel:8444443114" style={{display:"inline-flex",alignItems:"center",padding:"16px 36px",fontFamily:f.h,fontSize:"14px",fontWeight:700,letterSpacing:"1.5px",color:C.accent,background:"transparent",border:`2px solid ${C.accent}`,borderRadius:"8px",textDecoration:"none"}}>📞 {t.btnCall}</a>
          </div>
          <div style={{display:"flex",gap:"24px",marginTop:"32px",flexWrap:"wrap"}}>{t.stats.map((s,i) => <div key={i} style={{textAlign:"center"}}><div style={{fontFamily:f.h,fontSize:"28px",fontWeight:800,color:C.accent}}>{s.value}</div><div style={{fontFamily:f.b,fontSize:"12px",color:C.muted,maxWidth:"110px"}}>{s.label}</div></div>)}</div>
        </div>
      </section>

      {/* PROBLEM */}
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

      {/* SOLUTION */}
      <section style={{background:C.bg,padding:"80px 24px"}}>
        <div style={sec}>
          <div style={{textAlign:"center"}}><Tag>{t.solutionTag}</Tag><h2 style={{...secTitle,color:C.white}}>{t.solutionTitle}</h2><GoldBar /><p style={{fontFamily:f.b,fontSize:"17px",color:C.muted,maxWidth:"600px",margin:"0 auto 48px"}}>{t.solutionSub}</p></div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(340px,1fr))",gap:"20px"}}>
            {t.solutions.map((s,i) => <div key={i} style={{background:C.navyFade,border:`1px solid ${C.navyLight}`,borderRadius:"12px",padding:"28px",transition:"border-color 0.3s"}} onMouseOver={e=>e.currentTarget.style.borderColor=C.accent} onMouseOut={e=>e.currentTarget.style.borderColor=C.navyLight}><div style={{fontFamily:f.h,fontSize:"11px",fontWeight:700,color:C.accent,letterSpacing:"2px",marginBottom:"8px"}}>0{i+1}</div><h3 style={{fontFamily:f.h,fontSize:"17px",fontWeight:700,color:C.white,marginBottom:"10px"}}>{s.title}</h3><p style={{fontFamily:f.b,fontSize:"15px",color:C.muted,lineHeight:1.6}}>{s.desc}</p></div>)}
          </div>
        </div>
      </section>

      {/* SCOPE ITEMS */}
      <section style={{background:C.navy,padding:"80px 24px"}}>
        <div style={{maxWidth:"1200px",margin:"0 auto"}}>
          <div style={{textAlign:"center"}}><Tag>{t.scopeTag}</Tag><h2 style={{...secTitle,color:C.white}}>{t.scopeTitle}</h2><GoldBar /><p style={{fontFamily:f.b,fontSize:"17px",color:C.muted,maxWidth:"600px",margin:"0 auto 48px"}}>{t.scopeSub}</p></div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))",gap:"20px"}}>
            {t.scopeItems.map((g,i) => <div key={i} style={{background:C.navyFade,border:`1px solid ${C.navyLight}`,borderRadius:"12px",padding:"28px",borderTop:`4px solid ${C.gold}`}}><div style={{fontSize:"28px",marginBottom:"12px"}}>{g.icon}</div><h3 style={{fontFamily:f.h,fontSize:"17px",fontWeight:700,color:C.white,marginBottom:"10px"}}>{g.title}</h3><p style={{fontFamily:f.b,fontSize:"15px",color:C.muted,lineHeight:1.6}}>{g.desc}</p></div>)}
          </div>
        </div>
      </section>

      {/* COVERAGE CALLOUT */}
      <section style={{background:"linear-gradient(135deg, rgba(200,149,46,0.08), rgba(15,30,54,0.97))",padding:"28px 24px",borderTop:`2px solid ${C.gold}`,borderBottom:`2px solid ${C.gold}`}}>
        <div style={{maxWidth:"1000px",margin:"0 auto",display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:"20px"}}>
          <div style={{flex:"1 1 500px"}}>
            <div style={{display:"flex",alignItems:"center",gap:"8px",marginBottom:"8px"}}><span style={{fontSize:"16px"}}>📍</span><span style={{fontFamily:f.h,fontSize:"11px",fontWeight:700,color:C.gold,letterSpacing:"2px"}}>{t.peakAlert}</span></div>
            <p style={{fontFamily:f.h,fontSize:"clamp(16px,2.5vw,20px)",fontWeight:800,color:C.white,lineHeight:1.3,marginBottom:"6px"}}>{t.peakTitle}</p>
            <p style={{fontFamily:f.b,fontSize:"14px",color:C.muted,lineHeight:1.5}}>{t.peakDesc}</p>
          </div>
          <div style={{display:"flex",flexDirection:"column",gap:"8px",flexShrink:0}}>
            <a href="/contact" style={{padding:"12px 24px",fontFamily:f.h,fontSize:"12px",fontWeight:700,letterSpacing:"1px",color:C.white,background:`linear-gradient(135deg, ${C.gold}, ${C.goldLight})`,borderRadius:"6px",textDecoration:"none",textAlign:"center",boxShadow:"0 4px 12px rgba(200,149,46,0.3)"}}>{t.peakRights}</a>
          </div>
        </div>
      </section>

      {/* GOLD STANDARD */}
      <section style={{background:C.navy,padding:"80px 24px"}}>
        <div style={sec}><div style={{textAlign:"center"}}><Tag>{t.goldTag}</Tag><h2 style={{...secTitle,color:C.white}}>{t.goldTitle}</h2><GoldBar /><p style={{fontFamily:f.b,fontSize:"17px",color:C.offWhite,fontStyle:"italic",maxWidth:"500px",margin:"0 auto 48px"}}>{t.goldMotto}</p></div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(250px,1fr))",gap:"24px"}}>{t.goldSteps.map((step,i) => <div key={i} style={{background:C.navyFade,border:`1px solid ${C.navyLight}`,borderRadius:"12px",padding:"28px",position:"relative"}}><div style={{fontFamily:f.h,fontSize:"36px",fontWeight:800,color:"rgba(200,149,46,0.08)",position:"absolute",top:"16px",right:"20px"}}>{step.num}</div><div style={{fontFamily:f.h,fontSize:"11px",fontWeight:700,color:C.accent,letterSpacing:"3px",marginBottom:"8px"}}>{t.stepLabel} {step.num}</div><h3 style={{fontFamily:f.h,fontSize:"22px",fontWeight:700,color:C.white,marginBottom:"12px"}}>{step.title}</h3><p style={{fontFamily:f.b,fontSize:"15px",color:C.muted,lineHeight:1.6}}>{step.desc}</p></div>)}</div>
        </div>
      </section>

      {/* REVIEWS */}
      <section style={{background:C.bg,padding:"80px 24px"}}><div style={sec}><div style={{textAlign:"center"}}><Tag>{t.reviewTag}</Tag><h2 style={{...secTitle,color:C.white}}>{t.reviewTitle}</h2><GoldBar /></div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(300px,1fr))",gap:"20px",marginTop:"48px"}}>{t.reviews.map((rev,i) => <div key={i} style={{background:C.navyFade,border:`1px solid ${C.navyLight}`,borderRadius:"12px",padding:"28px"}}><Stars /><p style={{fontFamily:f.b,fontSize:"15px",color:C.offWhite,lineHeight:1.65,margin:"16px 0",fontStyle:"italic"}}>"{rev.text}"</p><div style={{borderTop:`1px solid ${C.navyLight}`,paddingTop:"12px",display:"flex",justifyContent:"space-between",alignItems:"center"}}><span style={{fontFamily:f.h,fontSize:"14px",fontWeight:600,color:C.white}}>{rev.name}</span><span style={{fontFamily:f.b,fontSize:"12px",color:C.muted}}>{rev.context}</span></div></div>)}</div></div></section>

      {/* FAQ */}
      <section style={{background:C.navy,padding:"80px 24px"}}><div style={{maxWidth:"800px",margin:"0 auto",textAlign:"center"}}><Tag>{t.faqTag}</Tag><h2 style={{...secTitle,color:C.white}}>{t.faqTitle}</h2><GoldBar />
        <div style={{marginTop:"40px",textAlign:"left"}}>{t.faqs.map((faq,i) => <div key={i} style={{borderBottom:`1px solid ${C.navyLight}`}}><button onClick={()=>setOpenFaq(openFaq===i?null:i)} style={{width:"100%",padding:"20px 0",background:"none",border:"none",cursor:"pointer",display:"flex",justifyContent:"space-between",alignItems:"center",gap:"16px"}}><span style={{fontFamily:f.h,fontSize:"15px",fontWeight:600,color:openFaq===i?C.accent:C.white,textAlign:"left",transition:"color 0.2s"}}>{faq.q}</span><span style={{fontFamily:f.h,fontSize:"20px",color:C.accent,transform:openFaq===i?"rotate(45deg)":"none",transition:"transform 0.3s",flexShrink:0}}>+</span></button>{openFaq===i&&<div style={{padding:"0 0 20px",fontFamily:f.b,fontSize:"15px",color:C.muted,lineHeight:1.65}}>{faq.a}</div>}</div>)}</div></div></section>

      {/* CTA FORM */}
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
          <button onClick={()=>setSubmitted(true)} style={{width:"100%",padding:"16px",fontFamily:f.h,fontSize:"14px",fontWeight:700,letterSpacing:"1.5px",color:C.white,background:`linear-gradient(135deg,${C.accent},${C.accentLight})`,border:"none",borderRadius:"8px",cursor:"pointer",boxShadow:"0 4px 16px rgba(200,149,46,0.3)"}}>{t.formBtn}</button>
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
