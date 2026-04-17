"use client";

import { useState, useEffect } from "react";
import SiteNav from "../../components/SiteNav";
import SiteFooter from "../../components/SiteFooter";
import MobileCTA from "../../components/MobileCTA";
import { useLanguage } from "../../lib/LanguageContext";

const injectFonts = () => { if (typeof document==="undefined"||document.querySelector("#jr-fonts")) return; const l=document.createElement("link"); l.id="jr-fonts"; l.rel="stylesheet"; l.href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800&family=Source+Sans+3:wght@300;400;600&display=swap"; document.head.appendChild(l); };
const C = { bg:"#0B1628",navy:"#1B2A4A",navyMid:"#243556",navyLight:"#2C3E5A",navyFade:"#162033",gold:"#C8952E",goldLight:"#D4A843",goldPale:"rgba(200,149,46,0.12)",cream:"#F5F3EF",white:"#FFFFFF",offWhite:"#E8E4DC",muted:"#7A8FA8",charcoal:"#2D2D2D",success:"#2D8B4E",successDim:"rgba(45,139,78,0.15)",accent:"#4A90D9",accentLight:"#6BA3E3",accentPale:"rgba(74,144,217,0.12)" };
const f = { h:"'Montserrat', sans-serif", b:"'Source Sans 3', sans-serif" };
const Tag = ({children}) => <div style={{display:"inline-block",padding:"6px 16px",background:C.accentPale,borderRadius:"4px",marginBottom:"12px"}}><span style={{fontFamily:f.h,fontSize:"12px",fontWeight:700,color:C.accent,letterSpacing:"3px"}}>{children}</span></div>;
const GoldBar = () => <div style={{width:"60px",height:"3px",background:`linear-gradient(90deg,${C.accent},${C.accentLight})`,borderRadius:"2px",margin:"16px auto"}} />;
const Stars = () => <span style={{color:C.gold,fontSize:"14px",letterSpacing:"2px"}}>★★★★★</span>;
const inputStyle = {width:"100%",padding:"13px 16px",fontFamily:f.b,fontSize:"15px",border:"1.5px solid #D1D5DB",borderRadius:"8px",outline:"none",color:C.charcoal,marginBottom:"12px",background:"#FAFAFA",boxSizing:"border-box"};

const T = {
  en: {
    breadcrumb: ["Home","Services","Rental Property Maintenance"],
    heroTag: "RENTAL & INVESTMENT PROPERTY MAINTENANCE",
    heroH1: "Gutter & Aluminum Service",
    heroH1Gold: "Built for Absentee Owners",
    heroP: "Your rental, Airbnb, or investment property needs the same gutter, soffit, and fascia care a primary residence gets — without you having to fly in. JR One schedules, executes, photographs, and reports. You approve from anywhere.",
    btnEstimate: "REQUEST A RENTAL SERVICE PLAN",
    btnCall: "CALL (844) 444-3114",
    problemTag: "THE ABSENTEE OWNER PROBLEM",
    problemTitle: "WHAT GOES WRONG WHEN YOU'RE NOT THERE",
    problems: [
      { icon:"🏚️", title:"Small issues turn into big damage", desc:"A partially clogged downspout tenants don't notice overflows for 6 months. Water saturates the fascia. By the time you see it on a visit, you're looking at a $4,000 fascia-and-soffit rebuild instead of a $180 cleaning." },
      { icon:"⭐", title:"Bad reviews from water problems", desc:"Airbnb guests blame the host for water running down windows, soaking patios, and flooding entryways — even when the root cause is a gutter problem nobody's been maintaining. One-star reviews hit your occupancy." },
      { icon:"📸", title:"No visibility into the property", desc:"You live in New York, Chicago, or Miami. You can't drive by after a storm to check. Most vendors won't send photos unprompted. You're flying blind until the next cleaning or cleaner flags something." },
      { icon:"🔄", title:"Tenant coordination friction", desc:"Long-term tenants don't want strangers showing up unannounced. Short-term rentals have back-to-back turnovers. Generic handymen don't coordinate either one well — and the work skips a quarter." },
    ],
    solutionTag: "THE JR ONE RENTAL DIFFERENCE",
    solutionTitle: "A VENDOR BUILT FOR THE WAY YOU ACTUALLY OWN THE PROPERTY",
    solutionSub: "Scheduled, documented, tenant-coordinated — designed for people who own from a different zip code.",
    solutions: [
      { title:"Scheduled service on your calendar", desc:"Semi-annual or quarterly gutter cleaning, soffit/fascia inspection, and downspout testing on a locked schedule. You approve once, we execute forever. No calling every 6 months." },
      { title:"Photo reports to your phone or email", desc:"After every service visit we send a photo report: before/after shots, any issues found, and recommended fixes. You get the same visibility you'd have if you'd walked the property yourself." },
      { title:"Tenant coordination included", desc:"We coordinate directly with long-term tenants, short-term cleaning crews, or your property manager. You don't become the middleman. For STRs we work around turnover windows." },
      { title:"Emergency response for water problems", desc:"If a tenant or guest reports water intrusion, we can be on-site within 48 hours (faster for active leaks). You get a diagnostic call and a repair plan before the damage spreads." },
      { title:"Pricing that makes sense for rentals", desc:"Rental service plans are priced for the economics of a rental — not luxury-homeowner retail. Clean, flat, bundled rates per visit. No surprise charges." },
      { title:"One vendor across your portfolio", desc:"Own 3 rentals? 10? 40? One point of contact, one invoice format, one reporting standard across every property. Saves you the vendor-juggling headache." },
    ],
    stats: [
      { value:"500+", label:"Rental & investment properties maintained" },
      { value:"30+", label:"Years of Tampa Bay aluminum work" },
      { value:"48h", label:"Typical response to water-intrusion calls" },
      { value:"100%", label:"Photo documentation on every visit" },
    ],
    scopeTag: "SERVICE PLAN OPTIONS",
    scopeTitle: "CHOOSE THE RIGHT PLAN FOR YOUR RENTAL",
    scopeSub: "Three common plan types — or build a custom plan around your property mix.",
    scopeItems: [
      { icon:"🏠", title:"Single-Rental Plan", desc:"Semi-annual gutter cleaning + inspection on one LTR or STR property. Photo report after every visit. Ideal for the first-time out-of-state owner." },
      { icon:"🏘️", title:"Portfolio Plan (2-10 units)", desc:"Bundled pricing across multiple rental properties with one point of contact, one invoice format, and coordinated scheduling to minimize trips. Common for local and regional investors." },
      { icon:"🏢", title:"Scale Plan (10+ units)", desc:"Custom-priced for larger rental portfolios, short-term-rental operators, and mid-scale investors. Includes prioritized emergency response and a dedicated account manager." },
      { icon:"🛏️", title:"STR Turnover Coordination", desc:"For Airbnb/VRBO properties we coordinate service around your turnover window and work with your cleaning company directly. Zero guest-facing disruption." },
      { icon:"📝", title:"Pre-Season Inspection", desc:"Before the June hurricane season we walk the roofline, document the condition, and flag anything that won't survive the summer — giving you time to fix before a storm hits." },
      { icon:"🆘", title:"Post-Storm Damage Call", desc:"After a named storm we can be on-site within 72 hours for contracted properties, documenting damage with photos suitable for insurance claims." },
    ],
    peakAlert: "ALSO SERVING",
    peakTitle: "Short-term rental, long-term rental, and investor property owners — Tampa Bay-wide.",
    peakDesc: "Covering Hillsborough, Pinellas, Pasco, Manatee, and Sarasota counties — 21 cities including Tampa, Clearwater, St. Pete, Sarasota, Bradenton, Wesley Chapel, Palm Harbor, and more.",
    peakBtn: "CONTACT →",
    peakRights: "SERVICE AREAS →",
    goldTag: "THE GOLD STANDARD",
    goldTitle: "HOW WE ONBOARD A RENTAL PROPERTY",
    goldMotto: "One setup call. Service on schedule. Photo reports forever.",
    goldSteps: [
      { num:"01", title:"ASSESS", desc:"Free initial walkthrough (you don't need to be present — we can coordinate with the tenant or cleaner). We document condition, flag immediate issues, and recommend a service cadence." },
      { num:"02", title:"DESIGN", desc:"Custom service plan fit to the property — visit frequency, scope per visit, and reporting format. Transparent pricing with no hidden per-visit charges." },
      { num:"03", title:"EXECUTE", desc:"We execute on schedule, coordinating with tenants or turnover crews directly. You stay out of the middle." },
      { num:"04", title:"REPORT", desc:"Photo report to your email or phone after every visit. Any issues flagged for approval before we proceed — you're never surprised by a line item." },
    ],
    reviewTag: "INVESTOR REVIEWS",
    reviewTitle: "WHAT RENTAL PROPERTY OWNERS SAY",
    reviews: [
      { text:"I own six rentals in Tampa and live in New Jersey. JR One was the first vendor who actually sent photos without me asking. I know what's happening at every property now.", name:"Out-of-State Owner", context:"6-Property Tampa Portfolio" },
      { text:"My Airbnb was getting one-star reviews about water pooling on the patio. JR One fixed the downspout routing in one visit. Reviews turned around within a month.", name:"Airbnb Host", context:"St. Pete Beach STR" },
      { text:"As a property manager with 40+ units across Pinellas, having one aluminum vendor with clean reporting saved me from an endless back-and-forth email chain with owners.", name:"Property Manager", context:"40-Unit Portfolio" },
    ],
    faqTag: "FAQ",
    faqTitle: "RENTAL PROPERTY SERVICE QUESTIONS",
    faqs: [
      { q:"How much does a rental service plan cost?", a:"Single-rental plans typically run $300-$800 annually for semi-annual gutter cleaning + inspection on a standard single-family rental, depending on linear footage and access. Portfolio plans get bundled pricing that drops per-property cost materially. Exact pricing after a walkthrough — no generic rate quoted over the phone." },
      { q:"Do I need to be present for the service?", a:"No. That's the entire point of the plan. We coordinate with your tenant, your short-term-rental cleaner, or your property manager directly. You get a photo report after every visit." },
      { q:"How do you handle access to the property?", a:"For LTRs we schedule with the tenant directly and give at least 48 hours notice. For STRs we work within your turnover window. If access is gated we coordinate the code or entry method with you or your cleaner once and file it for future visits." },
      { q:"What if the tenant or guest reports a water problem between scheduled visits?", a:"Call or text us. We can typically be on-site within 48 hours for a diagnostic on contracted properties, faster for active leaks. You'll get a plan and a quote before any repair work begins." },
      { q:"Do you work with property managers?", a:"Yes. Many of our rental accounts come through property managers who want a single aluminum vendor across their managed portfolio. We invoice the manager, report to the manager, and coordinate through the manager — not the owner directly unless requested." },
      { q:"Can you handle soffit or fascia damage, not just cleaning?", a:"Yes. We're a specialty aluminum contractor — gutters, soffit, fascia, aluminum trim, and drainage. If a scheduled visit turns up rotted fascia or blown soffit panels, we flag it for owner approval and execute the repair in the same property visit." },
      { q:"Do you carry insurance suitable for rental work?", a:"Yes. JR One Aluminum carries full general liability and workers' compensation coverage. We can provide certificates of insurance to owners or property management companies on request." },
    ],
    ctaTitle: "READY TO PUT YOUR RENTAL ON AUTOPILOT?",
    ctaSub: "Tell us about your property or portfolio. We'll build a custom service plan, coordinate with the tenant or cleaner, and send photo reports after every visit — no flights required.",
    formTitle: "Request a Rental Service Plan",
    formName: "Full Name",
    formPhone: "Phone Number",
    formEmail: "Email Address",
    formZip: "Property ZIP Code",
    formBtn: "REQUEST MY RENTAL PLAN",
    formDisclaimer: "No spam. No pressure. Just honest expert advice.",
    formSuccess: "Plan Request Received!",
    formSuccessSub: "We'll get back to you within one business day.",
    preferTalk: "Prefer to talk?",
    stepLabel: "STEP",
  },
  es: {
    breadcrumb: ["Inicio","Servicios","Mantenimiento de Propiedades de Alquiler"],
    heroTag: "MANTENIMIENTO DE PROPIEDADES DE ALQUILER E INVERSION",
    heroH1: "Servicio de Canaletas y Aluminio",
    heroH1Gold: "Hecho para Duenos Ausentes",
    heroP: "Su propiedad de alquiler, Airbnb o de inversion necesita el mismo cuidado de canaletas, sofito y fascia que una residencia principal — sin que usted tenga que viajar. JR One programa, ejecuta, fotografia y reporta. Usted aprueba desde cualquier lugar.",
    btnEstimate: "SOLICITE UN PLAN DE ALQUILER",
    btnCall: "LLAME AL (844) 444-3114",
    problemTag: "EL PROBLEMA DEL DUENO AUSENTE",
    problemTitle: "LO QUE SALE MAL CUANDO NO ESTA AHI",
    problems: [
      { icon:"🏚️", title:"Pequenos problemas se vuelven grandes danos", desc:"Un bajante parcialmente obstruido que el inquilino no nota se desborda por 6 meses. El agua satura la fascia. Cuando lo ve en una visita, esta mirando una reconstruccion de $4,000 en vez de una limpieza de $180." },
      { icon:"⭐", title:"Malas resenas por problemas de agua", desc:"Los huespedes de Airbnb culpan al anfitrion por agua corriendo por ventanas, empapando patios e inundando entradas — aun cuando la causa raiz es una canaleta sin mantenimiento. Las resenas de una estrella afectan su ocupacion." },
      { icon:"📸", title:"Sin visibilidad de la propiedad", desc:"Usted vive en NY, Chicago o Miami. No puede pasar por ahi despues de una tormenta. La mayoria de vendedores no envia fotos. Esta volando a ciegas hasta la proxima limpieza." },
      { icon:"🔄", title:"Friccion con inquilinos", desc:"Los inquilinos a largo plazo no quieren extranos llegando sin aviso. Los alquileres cortos tienen rotaciones consecutivas. Los handymen genericos no coordinan bien ninguno." },
    ],
    solutionTag: "LA DIFERENCIA JR ONE PARA ALQUILERES",
    solutionTitle: "UN PROVEEDOR HECHO PARA COMO USTED REALMENTE POSEE LA PROPIEDAD",
    solutionSub: "Programado, documentado, coordinado con inquilinos — disenado para duenos en otro codigo postal.",
    solutions: [
      { title:"Servicio programado en su calendario", desc:"Limpieza de canaletas semestral o trimestral, inspeccion de sofito/fascia y pruebas de bajantes en horario fijo. Aprueba una vez, ejecutamos para siempre." },
      { title:"Reportes con fotos a su telefono o email", desc:"Despues de cada visita enviamos un reporte con fotos: antes/despues, problemas encontrados y arreglos recomendados. Obtiene la misma visibilidad que si caminara la propiedad." },
      { title:"Coordinacion con inquilinos incluida", desc:"Coordinamos directamente con inquilinos a largo plazo, equipos de limpieza de alquileres cortos, o su administrador. Usted no es el intermediario." },
      { title:"Respuesta de emergencia para problemas de agua", desc:"Si un inquilino o huesped reporta intrusion de agua, podemos estar en sitio en 48 horas (mas rapido para fugas activas). Recibe un diagnostico y plan antes de que el dano se extienda." },
      { title:"Precios que tienen sentido para alquileres", desc:"Los planes se cotizan para la economia de un alquiler — no precios minoristas de casa de lujo. Tarifas limpias, planas y agrupadas por visita." },
      { title:"Un proveedor para todo su portafolio", desc:"Tiene 3 alquileres? 10? 40? Un punto de contacto, un formato de factura y un estandar de reporte en cada propiedad." },
    ],
    stats: [
      { value:"500+", label:"Propiedades de alquiler mantenidas" },
      { value:"30+", label:"Anos de trabajo en Tampa Bay" },
      { value:"48h", label:"Respuesta tipica a problemas de agua" },
      { value:"100%", label:"Documentacion fotografica por visita" },
    ],
    scopeTag: "OPCIONES DE PLAN DE SERVICIO",
    scopeTitle: "ELIJA EL PLAN CORRECTO PARA SU ALQUILER",
    scopeSub: "Tres tipos comunes — o construya un plan personalizado.",
    scopeItems: [
      { icon:"🏠", title:"Plan de Un Solo Alquiler", desc:"Limpieza e inspeccion semestral en una propiedad LTR o STR. Reporte fotografico despues de cada visita. Ideal para el primer dueno fuera del estado." },
      { icon:"🏘️", title:"Plan de Portafolio (2-10 unidades)", desc:"Precios agrupados a traves de multiples propiedades con un punto de contacto, formato de factura unico y programacion coordinada." },
      { icon:"🏢", title:"Plan Escala (10+ unidades)", desc:"Precios personalizados para portafolios grandes, operadores STR y inversores medianos. Incluye respuesta de emergencia priorizada y gerente de cuenta dedicado." },
      { icon:"🛏️", title:"Coordinacion STR", desc:"Para Airbnb/VRBO coordinamos el servicio alrededor de su ventana de rotacion y trabajamos con su equipo de limpieza directamente. Cero interrupcion al huesped." },
      { icon:"📝", title:"Inspeccion Pre-Temporada", desc:"Antes de junio caminamos la linea del techo, documentamos la condicion y marcamos lo que no sobrevivira el verano — dandole tiempo para arreglar antes de una tormenta." },
      { icon:"🆘", title:"Llamada de Dano Post-Tormenta", desc:"Despues de una tormenta podemos estar en sitio en 72 horas en propiedades con contrato, documentando dano con fotos aptas para reclamos de seguro." },
    ],
    peakAlert: "TAMBIEN SERVIMOS",
    peakTitle: "Duenos de alquileres cortos, largos y propiedades de inversion — en toda Tampa Bay.",
    peakDesc: "Cubriendo Hillsborough, Pinellas, Pasco, Manatee y Sarasota — 21 ciudades incluyendo Tampa, Clearwater, St. Pete, Sarasota, Bradenton, Wesley Chapel, Palm Harbor y mas.",
    peakBtn: "CONTACTO →",
    peakRights: "AREAS DE SERVICIO →",
    goldTag: "EL ESTANDAR DE ORO",
    goldTitle: "COMO INTEGRAMOS UNA PROPIEDAD DE ALQUILER",
    goldMotto: "Una llamada de configuracion. Servicio programado. Reportes fotograficos siempre.",
    goldSteps: [
      { num:"01", title:"EVALUAR", desc:"Recorrido inicial gratis (no necesita estar presente — coordinamos con el inquilino o limpiador). Documentamos condicion, marcamos problemas inmediatos y recomendamos una cadencia." },
      { num:"02", title:"DISENAR", desc:"Plan personalizado — frecuencia de visita, alcance por visita y formato de reporte. Precio transparente sin cargos ocultos." },
      { num:"03", title:"EJECUTAR", desc:"Ejecutamos segun horario, coordinando con inquilinos o equipos de rotacion directamente. Usted se queda fuera del medio." },
      { num:"04", title:"REPORTAR", desc:"Reporte fotografico a su email o telefono despues de cada visita. Cualquier problema marcado para aprobacion antes de proceder." },
    ],
    reviewTag: "RESENAS DE INVERSORES",
    reviewTitle: "LO QUE DICEN LOS DUENOS DE ALQUILERES",
    reviews: [
      { text:"Tengo seis alquileres en Tampa y vivo en New Jersey. JR One fue el primer vendedor que realmente envio fotos sin que las pidiera. Ahora se que pasa en cada propiedad.", name:"Dueno Fuera del Estado", context:"Portafolio Tampa de 6 Propiedades" },
      { text:"Mi Airbnb recibia resenas de una estrella por agua acumulandose en el patio. JR One arreglo el direccionamiento del bajante en una visita. Las resenas mejoraron en un mes.", name:"Anfitrion de Airbnb", context:"STR en St. Pete Beach" },
      { text:"Como administradora con 40+ unidades en Pinellas, tener un vendedor de aluminio con reportes limpios me salvo de una cadena interminable de emails.", name:"Administradora de Propiedad", context:"Portafolio de 40 Unidades" },
    ],
    faqTag: "PREGUNTAS FRECUENTES",
    faqTitle: "PREGUNTAS SOBRE SERVICIO DE ALQUILERES",
    faqs: [
      { q:"Cuanto cuesta un plan de servicio de alquiler?", a:"Planes de un solo alquiler tipicamente corren $300-$800 al ano para limpieza + inspeccion semestral en un alquiler unifamiliar estandar. Planes de portafolio obtienen precios agrupados que bajan el costo por propiedad materialmente. Precio exacto despues de un recorrido." },
      { q:"Necesito estar presente para el servicio?", a:"No. Ese es el punto del plan. Coordinamos con su inquilino, su limpiador STR o su administrador. Usted obtiene un reporte fotografico despues de cada visita." },
      { q:"Como manejan el acceso a la propiedad?", a:"Para LTR programamos con el inquilino directamente con al menos 48 horas de aviso. Para STR trabajamos en su ventana de rotacion. Si esta con porton, coordinamos codigo una vez y lo archivamos." },
      { q:"Que pasa si el inquilino reporta un problema de agua entre visitas?", a:"Llame o escriba. Tipicamente podemos estar en sitio en 48 horas en propiedades con contrato. Recibira un plan y cotizacion antes de cualquier reparacion." },
      { q:"Trabajan con administradores de propiedad?", a:"Si. Muchas cuentas de alquiler vienen por administradores que quieren un vendedor unico de aluminio. Facturamos al administrador, reportamos al administrador y coordinamos por el administrador." },
      { q:"Pueden manejar dano de sofito o fascia, no solo limpieza?", a:"Si. Somos contratista especialista de aluminio. Si una visita programada encuentra fascia podrida o paneles volados, lo marcamos para aprobacion y ejecutamos la reparacion en la misma visita." },
      { q:"Tienen seguro apto para trabajo en alquileres?", a:"Si. JR One tiene cobertura completa de responsabilidad general y compensacion laboral. Podemos proveer certificados a duenos o administradores a peticion." },
    ],
    ctaTitle: "LISTO PARA PONER SU ALQUILER EN PILOTO AUTOMATICO?",
    ctaSub: "Cuentenos sobre su propiedad o portafolio. Construiremos un plan personalizado, coordinaremos con el inquilino o limpiador y enviaremos reportes fotograficos despues de cada visita — sin vuelos.",
    formTitle: "Solicite un Plan de Alquiler",
    formName: "Nombre Completo",
    formPhone: "Numero de Telefono",
    formEmail: "Correo Electronico",
    formZip: "Codigo Postal de la Propiedad",
    formBtn: "SOLICITAR MI PLAN DE ALQUILER",
    formDisclaimer: "Sin spam. Sin presion. Solo consejo honesto.",
    formSuccess: "Solicitud Recibida!",
    formSuccessSub: "Le responderemos dentro de un dia habil.",
    preferTalk: "Prefiere hablar?",
    stepLabel: "PASO",
  },
};

export default function RentalPropertyMaintenancePage() {
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
            <button onClick={()=>document.getElementById("quote-form")?.scrollIntoView({behavior:"smooth"})} style={{padding:"16px 36px",fontFamily:f.h,fontSize:"14px",fontWeight:700,letterSpacing:"1.5px",color:C.white,background:`linear-gradient(135deg,${C.accent},${C.accentLight})`,border:"none",borderRadius:"8px",cursor:"pointer",boxShadow:"0 4px 16px rgba(74,144,217,0.3)"}}>{t.btnEstimate}</button>
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

      <section style={{background:"linear-gradient(135deg, rgba(74,144,217,0.08), rgba(15,30,54,0.97))",padding:"28px 24px",borderTop:`2px solid ${C.accent}`,borderBottom:`2px solid ${C.accent}`}}>
        <div style={{maxWidth:"1000px",margin:"0 auto",display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:"20px"}}>
          <div style={{flex:"1 1 500px"}}>
            <div style={{display:"flex",alignItems:"center",gap:"8px",marginBottom:"8px"}}><span style={{fontSize:"16px"}}>📍</span><span style={{fontFamily:f.h,fontSize:"11px",fontWeight:700,color:C.accent,letterSpacing:"2px"}}>{t.peakAlert}</span></div>
            <p style={{fontFamily:f.h,fontSize:"clamp(16px,2.5vw,20px)",fontWeight:800,color:C.white,lineHeight:1.3,marginBottom:"6px"}}>{t.peakTitle}</p>
            <p style={{fontFamily:f.b,fontSize:"14px",color:C.muted,lineHeight:1.5}}>{t.peakDesc}</p>
          </div>
          <div style={{display:"flex",flexDirection:"column",gap:"8px",flexShrink:0}}>
            <a href="/contact" style={{padding:"12px 24px",fontFamily:f.h,fontSize:"12px",fontWeight:700,letterSpacing:"1px",color:C.white,background:`linear-gradient(135deg, ${C.accent}, ${C.accentLight})`,borderRadius:"6px",textDecoration:"none",textAlign:"center",boxShadow:"0 4px 12px rgba(74,144,217,0.3)"}}>{t.peakBtn}</a>
          </div>
        </div>
      </section>

      <section style={{background:C.navy,padding:"80px 24px"}}>
        <div style={sec}><div style={{textAlign:"center"}}><Tag>{t.goldTag}</Tag><h2 style={{...secTitle,color:C.white}}>{t.goldTitle}</h2><GoldBar /><p style={{fontFamily:f.b,fontSize:"17px",color:C.offWhite,fontStyle:"italic",maxWidth:"500px",margin:"0 auto 48px"}}>{t.goldMotto}</p></div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(250px,1fr))",gap:"24px"}}>{t.goldSteps.map((step,i) => <div key={i} style={{background:C.navyFade,border:`1px solid ${C.navyLight}`,borderRadius:"12px",padding:"28px",position:"relative"}}><div style={{fontFamily:f.h,fontSize:"36px",fontWeight:800,color:"rgba(74,144,217,0.08)",position:"absolute",top:"16px",right:"20px"}}>{step.num}</div><div style={{fontFamily:f.h,fontSize:"11px",fontWeight:700,color:C.accent,letterSpacing:"3px",marginBottom:"8px"}}>{t.stepLabel} {step.num}</div><h3 style={{fontFamily:f.h,fontSize:"22px",fontWeight:700,color:C.white,marginBottom:"12px"}}>{step.title}</h3><p style={{fontFamily:f.b,fontSize:"15px",color:C.muted,lineHeight:1.6}}>{step.desc}</p></div>)}</div>
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
          <button onClick={()=>setSubmitted(true)} style={{width:"100%",padding:"16px",fontFamily:f.h,fontSize:"14px",fontWeight:700,letterSpacing:"1.5px",color:C.white,background:`linear-gradient(135deg,${C.accent},${C.accentLight})`,border:"none",borderRadius:"8px",cursor:"pointer",boxShadow:"0 4px 16px rgba(74,144,217,0.3)"}}>{t.formBtn}</button>
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
