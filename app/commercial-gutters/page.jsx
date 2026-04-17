"use client";

import { useState, useEffect } from "react";
import SiteNav from "../../components/SiteNav";
import SiteFooter from "../../components/SiteFooter";
import MobileCTA from "../../components/MobileCTA";
import { useLanguage } from "../../lib/LanguageContext";

const injectFonts = () => { if (typeof document==="undefined"||document.querySelector("#jr-fonts")) return; const l=document.createElement("link"); l.id="jr-fonts"; l.rel="stylesheet"; l.href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800&family=Source+Sans+3:wght@300;400;600&display=swap"; document.head.appendChild(l); };
const C = { bg:"#0B1628",navy:"#1B2A4A",navyMid:"#243556",navyLight:"#2C3E5A",navyFade:"#162033",gold:"#C8952E",goldLight:"#D4A843",goldPale:"rgba(200,149,46,0.12)",cream:"#F5F3EF",white:"#FFFFFF",offWhite:"#E8E4DC",muted:"#7A8FA8",charcoal:"#2D2D2D",success:"#2D8B4E",successDim:"rgba(45,139,78,0.15)",accent:"#8B9DAF",accentLight:"#A3B5C8",accentPale:"rgba(139,157,175,0.12)" };
const f = { h:"'Montserrat', sans-serif", b:"'Source Sans 3', sans-serif" };
const Tag = ({children}) => <div style={{display:"inline-block",padding:"6px 16px",background:C.accentPale,borderRadius:"4px",marginBottom:"12px"}}><span style={{fontFamily:f.h,fontSize:"12px",fontWeight:700,color:C.accent,letterSpacing:"3px"}}>{children}</span></div>;
const GoldBar = () => <div style={{width:"60px",height:"3px",background:`linear-gradient(90deg,${C.accent},${C.accentLight})`,borderRadius:"2px",margin:"16px auto"}} />;
const Stars = () => <span style={{color:C.gold,fontSize:"14px",letterSpacing:"2px"}}>★★★★★</span>;
const inputStyle = {width:"100%",padding:"13px 16px",fontFamily:f.b,fontSize:"15px",border:"1.5px solid #D1D5DB",borderRadius:"8px",outline:"none",color:C.charcoal,marginBottom:"12px",background:"#FAFAFA",boxSizing:"border-box"};

const T = {
  en: {
    breadcrumb: ["Home","Services","Commercial Gutters"],
    heroTag: "COMMERCIAL GUTTER INSTALLATION",
    heroH1: "Commercial-Grade Aluminum",
    heroH1Gold: "For Buildings That Can't Fail",
    heroP: "Apartment complexes, multi-family buildings, retail centers, office parks, and warehouses need gutter systems engineered for real water volume — not residential spec. JR One installs 7-inch box gutters, D-style commercial profiles, and large-capacity drainage across Tampa Bay.",
    btnEstimate: "REQUEST A COMMERCIAL QUOTE",
    btnCall: "CALL (844) 444-3114",
    problemTag: "THE COMMERCIAL REALITY",
    problemTitle: "WHY RESIDENTIAL GUTTERS FAIL ON COMMERCIAL BUILDINGS",
    problems: [
      { icon:"💧", title:"Undersized for the roof area", desc:"Apartment buildings and retail centers shed 3-10x the water volume of a single-family home. Standard 5\" or 6\" residential gutters overflow within the first heavy storm, pouring water onto entries, parking, and walkways." },
      { icon:"🏗️", title:"Wrong profile for the load", desc:"Commercial roofs need box gutters, D-style profiles, or super gutters — not K-style residential. The wrong profile warps, pulls off the fascia, and creates liability the property insurer won't cover." },
      { icon:"⚠️", title:"Liability from water on tenant paths", desc:"Water pooling at retail entries, apartment walkways, or office park sidewalks is a slip-and-fall lawsuit waiting to happen. Inadequate gutters are the first thing a plaintiff's attorney points at." },
      { icon:"📅", title:"Lost revenue during shutdown", desc:"A retail tenant closed for water damage is revenue gone. An apartment unit unrentable because of interior water intrusion is revenue gone. Gutter system failure on commercial is expensive in ways homeowners don't see." },
    ],
    solutionTag: "THE JR ONE COMMERCIAL DIFFERENCE",
    solutionTitle: "BUILT FOR THE JOB, SIZED FOR THE BUILDING",
    solutionSub: "Commercial and multi-family aluminum done by a specialty contractor — not a residential installer working out of spec.",
    solutions: [
      { title:"7-inch box gutters for high-volume roofs", desc:"Heavy-duty, high-capacity box gutters engineered for large commercial roof areas. Maximum water throughput during Florida storms. The baseline spec for apartment complexes, warehouses, and industrial buildings." },
      { title:"7-inch commercial D-style", desc:"Commercial D-style profiles for buildings with wide overhangs, high rainfall collection, and custom bracket requirements. Suitable for hotels, hospitality, and large multi-family." },
      { title:"Large-capacity residential commercial", desc:"7-inch K-style seamless for mid-sized multi-family, townhome communities, and oversized custom residential that needs more capacity than standard 6-inch gutters deliver." },
      { title:"Commercial drainage integration", desc:"Commercial roofs demand real drainage — not just a splash block. We install Schedule 40 PVC underground drainage, corrugated pipe, catch basins, and trenching to move water where it belongs." },
      { title:"Specialty aluminum — soffit, fascia, trim", desc:"Full commercial aluminum scope: aluminum soffit (vented/non-vented), Hardie board soffit, custom-bent fascia in single, 2-tier, and 3-tier profiles. One contractor for the entire aluminum package." },
      { title:"GC-friendly scheduling & code compliance", desc:"We schedule within broader project timelines without creating delays. Every installation meets Florida building code. We know Tampa inspection requirements and what local building officials look for." },
    ],
    stats: [
      { value:"30+", label:"Years serving Tampa Bay commercial" },
      { value:"7\"", label:"Commercial box gutter spec" },
      { value:"100%", label:"In-house bilingual crews" },
      { value:"COI", label:"Insurance cert on request" },
    ],
    scopeTag: "BUILDING TYPES SERVED",
    scopeTitle: "COMMERCIAL PROPERTIES WE BUILD FOR",
    scopeSub: "From 4-unit townhomes to 300-unit apartment complexes — plus retail, office, and industrial.",
    scopeItems: [
      { icon:"🏢", title:"Apartment Complexes", desc:"Multi-building apartment properties — gutter, soffit, fascia, and drainage designed for high-density water shed and durability between scheduled maintenance cycles." },
      { icon:"🏘️", title:"Multi-Family & Townhomes", desc:"Townhome communities, condominium buildings, and small multi-family. Color-matched to community spec, installed building-by-building without disrupting residents." },
      { icon:"🛍️", title:"Retail Strip Centers", desc:"Strip centers and standalone retail. Entry-zone drainage is critical — we route water away from customer paths and storefronts, not into them." },
      { icon:"🏬", title:"Office Buildings & Business Parks", desc:"Single-building office and multi-building business parks. Coordinated with landscape and paving drainage to prevent tenant-space water intrusion." },
      { icon:"🏭", title:"Industrial & Warehouse", desc:"Warehouse and industrial facilities with large roof areas. Box gutter systems and commercial downspout specifications engineered for the volume." },
      { icon:"🏨", title:"Hotels, Hospitality, Institutional", desc:"Hotels, churches, schools, and institutional buildings. Scheduled around the facility's operational windows — no disruption to guests, congregations, or classes." },
    ],
    peakAlert: "FOR GENERAL CONTRACTORS & ROOFERS",
    peakTitle: "We sub for Tampa Bay's roofing companies and GCs — reliably, on schedule, code-compliant.",
    peakDesc: "Show-up reliability, volume pricing, single-point accountability, bilingual job-site communication. The aluminum side of your project done without management overhead.",
    peakBtn: "CONTACT →",
    peakRights: "SERVICE AREAS →",
    goldTag: "THE GOLD STANDARD",
    goldTitle: "OUR COMMERCIAL INSTALLATION PROCESS",
    goldMotto: "Every building. Every time. Spec'd right, installed right.",
    goldSteps: [
      { num:"01", title:"ASSESS", desc:"We walk the building with the owner, GC, or property manager. We measure roof area, document existing conditions, and document drainage requirements." },
      { num:"02", title:"SPEC", desc:"Commercial spec built for the building — profile, size, gauge, hanger spacing, downspout count, and drainage route. Transparent line-item quote." },
      { num:"03", title:"INSTALL", desc:"Our crew fabricates on-site where possible and installs to Florida code. Sequenced with other trades on new construction or scheduled around tenants on existing buildings." },
      { num:"04", title:"DELIVER", desc:"Final walkthrough, flow test, cleanup, and craftsmanship warranty. All documentation delivered to the owner or GC for close-out." },
    ],
    reviewTag: "COMMERCIAL REVIEWS",
    reviewTitle: "WHAT GCs AND OWNERS SAY",
    reviews: [
      { text:"JR One handles the aluminum package on our multi-family projects. On-schedule every time, and I never have to chase them down to finish. That's worth more than a low bid.", name:"General Contractor", context:"Tampa Multi-Family" },
      { text:"Our apartment complex went from constant water intrusion calls to almost zero after JR One installed 7\" box gutters and fixed the drainage routing. Worth the investment.", name:"Property Owner", context:"Brandon Apartment Complex" },
      { text:"Bilingual crew, clean work, and the kind of reliability you rarely get from a sub. We use them across our retail portfolio.", name:"Commercial Property Manager", context:"Pinellas Retail Portfolio" },
    ],
    faqTag: "FAQ",
    faqTitle: "COMMERCIAL GUTTER QUESTIONS",
    faqs: [
      { q:"What size gutter do I need for a commercial building?", a:"It depends on roof area, pitch, and rainfall collection. Most commercial buildings in Tampa Bay spec into 7\" box gutters or 7\" D-style commercial profiles. We calculate the correct size during the walkthrough — the wrong call here is expensive, so we don't guess." },
      { q:"Do you work directly with general contractors?", a:"Yes. A meaningful share of our commercial volume is subcontracted work for general contractors and roofing companies on new construction and renovation projects. We sequence with other trades, hit schedule, and invoice on GC-friendly terms." },
      { q:"Can you provide certificates of insurance?", a:"Yes. JR One Aluminum carries full general liability and workers' compensation coverage. We provide certificates of insurance directly to the building owner, property management company, or general contractor on request, with additional-insured endorsements where required." },
      { q:"How is commercial pricing structured?", a:"Commercial pricing is custom per project — based on gutter linear footage, profile, gauge, downspout count, drainage integration, and scope. GCs and property portfolios with recurring volume can negotiate pricing for repeat work." },
      { q:"Do you handle drainage too, or just the gutter itself?", a:"Full scope. Commercial roofs demand real drainage — we install Schedule 40 PVC underground drainage, corrugated pipe, catch basins, and trenching alongside the gutter system. One contractor for the complete water-management package." },
      { q:"What about ongoing maintenance after install?", a:"We offer commercial maintenance agreements for apartment complexes, property management portfolios, and building owners who want scheduled gutter cleaning and inspection on a commercial cadence. Separate from installation." },
      { q:"How long does commercial installation take?", a:"Varies widely — a single retail pad can be a day, a 200-unit apartment complex is weeks. We commit to a specific schedule before work begins and communicate any changes in advance." },
    ],
    ctaTitle: "READY TO SPEC A COMMERCIAL GUTTER SYSTEM?",
    ctaSub: "Tell us about your building, project, or portfolio. We'll walk the site, build a commercial-spec quote, and coordinate with your GC or team — transparent pricing, no residential-grade spec on a commercial job.",
    formTitle: "Request a Commercial Quote",
    formName: "Full Name / Company",
    formPhone: "Phone Number",
    formEmail: "Email Address",
    formZip: "Property ZIP Code",
    formBtn: "REQUEST MY COMMERCIAL QUOTE",
    formDisclaimer: "No spam. No pressure. Direct conversation with the owner.",
    formSuccess: "Quote Request Received!",
    formSuccessSub: "We'll get back to you within one business day.",
    preferTalk: "Prefer to talk?",
    stepLabel: "STEP",
  },
  es: {
    breadcrumb: ["Inicio","Servicios","Canaletas Comerciales"],
    heroTag: "INSTALACION DE CANALETAS COMERCIALES",
    heroH1: "Aluminio de Grado Comercial",
    heroH1Gold: "Para Edificios Que No Pueden Fallar",
    heroP: "Complejos de apartamentos, edificios multifamiliares, centros comerciales, parques de oficinas y bodegas necesitan sistemas de canaletas disenados para volumen real de agua — no especificacion residencial. JR One instala canaletas de caja de 7\", perfiles D comerciales y drenaje de alta capacidad en Tampa Bay.",
    btnEstimate: "SOLICITE COTIZACION COMERCIAL",
    btnCall: "LLAME AL (844) 444-3114",
    problemTag: "LA REALIDAD COMERCIAL",
    problemTitle: "POR QUE LAS CANALETAS RESIDENCIALES FALLAN EN EDIFICIOS COMERCIALES",
    problems: [
      { icon:"💧", title:"Pequenas para el area del techo", desc:"Edificios de apartamentos y centros comerciales descargan 3-10x el volumen de agua de una casa. Las canaletas residenciales de 5\" o 6\" se desbordan en la primera tormenta fuerte." },
      { icon:"🏗️", title:"Perfil incorrecto para la carga", desc:"Los techos comerciales necesitan canaletas de caja, perfiles D o super canaletas — no K-style residencial. El perfil incorrecto se deforma, se despega y crea responsabilidad civil." },
      { icon:"⚠️", title:"Responsabilidad por agua en pasillos", desc:"Agua acumulada en entradas minoristas, pasillos de apartamentos o aceras de oficinas es una demanda por caidas esperando. Las canaletas inadecuadas son lo primero que senala el abogado demandante." },
      { icon:"📅", title:"Ingresos perdidos por cierre", desc:"Un inquilino minorista cerrado por dano de agua es ingreso perdido. Una unidad no rentable por intrusion de agua es ingreso perdido." },
    ],
    solutionTag: "LA DIFERENCIA COMERCIAL DE JR ONE",
    solutionTitle: "HECHO PARA EL TRABAJO, DIMENSIONADO PARA EL EDIFICIO",
    solutionSub: "Aluminio comercial y multifamiliar hecho por contratista especialista — no instalador residencial fuera de especificacion.",
    solutions: [
      { title:"Canaletas de caja de 7\" para techos de alto volumen", desc:"Canaletas de caja de alta capacidad para areas de techo grandes. Maximo flujo durante tormentas de Florida. Especificacion base para complejos de apartamentos, bodegas y edificios industriales." },
      { title:"Perfil D comercial de 7\"", desc:"Perfiles D comerciales para edificios con aleros anchos, alta recoleccion y requisitos de soportes personalizados. Adecuado para hoteles, hospitalidad y multifamiliar grande." },
      { title:"Residencial comercial de alta capacidad", desc:"K-style sin costuras de 7\" para multifamiliar mediano, comunidades de townhomes y residencial personalizado de gran tamano que necesita mas capacidad que las canaletas estandar de 6\"." },
      { title:"Integracion de drenaje comercial", desc:"Los techos comerciales demandan drenaje real. Instalamos PVC Schedule 40 subterraneo, tuberia corrugada, cajas de registro y excavacion para mover agua donde pertenece." },
      { title:"Aluminio especialista — sofito, fascia, molduras", desc:"Alcance completo de aluminio comercial: sofito de aluminio (ventilado/no ventilado), sofito Hardie, fascia personalizada en perfiles de 1, 2 y 3 niveles. Un contratista para todo el paquete." },
      { title:"Programacion GC-amigable y cumplimiento de codigo", desc:"Programamos dentro de cronogramas de proyecto sin crear retrasos. Cada instalacion cumple codigo de construccion de Florida." },
    ],
    stats: [
      { value:"30+", label:"Anos sirviendo Tampa Bay comercial" },
      { value:"7\"", label:"Especificacion de canaleta de caja" },
      { value:"100%", label:"Equipos propios bilingues" },
      { value:"COI", label:"Certificado de seguro a peticion" },
    ],
    scopeTag: "TIPOS DE EDIFICIO SERVIDOS",
    scopeTitle: "PROPIEDADES COMERCIALES PARA LAS QUE CONSTRUIMOS",
    scopeSub: "Desde townhomes de 4 unidades hasta complejos de 300 apartamentos — mas retail, oficinas e industrial.",
    scopeItems: [
      { icon:"🏢", title:"Complejos de Apartamentos", desc:"Propiedades multifamiliares de varios edificios — canaletas, sofito, fascia y drenaje disenados para alta densidad de descarga de agua." },
      { icon:"🏘️", title:"Multifamiliar y Townhomes", desc:"Comunidades de townhomes, condominios y multifamiliar pequeno. Combinado al color de la comunidad, instalado edificio por edificio sin interrumpir residentes." },
      { icon:"🛍️", title:"Centros Comerciales", desc:"Strip centers y minoristas independientes. El drenaje de la zona de entrada es critico — dirigimos agua lejos de caminos de clientes." },
      { icon:"🏬", title:"Edificios de Oficinas y Parques Empresariales", desc:"Oficina de un edificio y parques empresariales de varios edificios. Coordinado con drenaje de jardineria y pavimento." },
      { icon:"🏭", title:"Industrial y Bodegas", desc:"Bodegas e instalaciones industriales con areas de techo grandes. Canaletas de caja y especificaciones de bajantes comerciales dimensionados para el volumen." },
      { icon:"🏨", title:"Hoteles, Hospitalidad, Institucional", desc:"Hoteles, iglesias, escuelas y edificios institucionales. Programados alrededor de ventanas operativas — sin interrupcion a huespedes o clases." },
    ],
    peakAlert: "PARA GCs Y TECHEROS",
    peakTitle: "Subcontratamos para techeros y GCs de Tampa Bay — confiables, en horario, cumpliendo codigo.",
    peakDesc: "Confiabilidad, precios por volumen, punto unico de responsabilidad, comunicacion bilingue en sitio. El lado de aluminio de su proyecto hecho sin carga de gestion.",
    peakBtn: "CONTACTO →",
    peakRights: "AREAS DE SERVICIO →",
    goldTag: "EL ESTANDAR DE ORO",
    goldTitle: "NUESTRO PROCESO DE INSTALACION COMERCIAL",
    goldMotto: "Cada edificio. Cada vez. Bien especificado, bien instalado.",
    goldSteps: [
      { num:"01", title:"EVALUAR", desc:"Caminamos el edificio con el dueno, GC o administrador. Medimos area de techo, documentamos condiciones existentes y requisitos de drenaje." },
      { num:"02", title:"ESPECIFICAR", desc:"Especificacion comercial para el edificio — perfil, tamano, calibre, espaciado de soportes, cantidad de bajantes y ruta de drenaje. Cotizacion transparente." },
      { num:"03", title:"INSTALAR", desc:"Nuestro equipo fabrica en sitio cuando es posible e instala segun codigo de Florida. Secuenciado con otros oficios en construccion nueva." },
      { num:"04", title:"ENTREGAR", desc:"Recorrido final, prueba de flujo, limpieza y garantia de mano de obra. Toda la documentacion entregada al dueno o GC para cierre." },
    ],
    reviewTag: "RESENAS COMERCIALES",
    reviewTitle: "LO QUE DICEN GCs Y DUENOS",
    reviews: [
      { text:"JR One maneja el paquete de aluminio en nuestros proyectos multifamiliares. En horario cada vez, y nunca tengo que perseguirlos para terminar. Eso vale mas que una oferta baja.", name:"Contratista General", context:"Multifamiliar Tampa" },
      { text:"Nuestro complejo de apartamentos paso de llamadas constantes de intrusion de agua a casi cero despues de que JR One instalo canaletas de caja de 7\" y arreglo el drenaje.", name:"Dueno de Propiedad", context:"Complejo de Apartamentos Brandon" },
      { text:"Equipo bilingue, trabajo limpio y el tipo de confiabilidad que raramente obtienes de un subcontratista. Los usamos en todo nuestro portafolio minorista.", name:"Administrador de Propiedad Comercial", context:"Portafolio Minorista Pinellas" },
    ],
    faqTag: "PREGUNTAS FRECUENTES",
    faqTitle: "PREGUNTAS SOBRE CANALETAS COMERCIALES",
    faqs: [
      { q:"Que tamano de canaleta necesito para un edificio comercial?", a:"Depende del area del techo, pendiente y recoleccion de lluvia. La mayoria de edificios comerciales en Tampa Bay especifican canaletas de caja de 7\" o perfil D comercial de 7\". Calculamos el tamano correcto durante el recorrido." },
      { q:"Trabajan directamente con contratistas generales?", a:"Si. Una parte significativa de nuestro volumen comercial es trabajo subcontratado para GCs y techeros en construccion nueva y renovacion." },
      { q:"Pueden proveer certificados de seguro?", a:"Si. JR One Aluminum tiene cobertura completa de responsabilidad general y compensacion laboral. Entregamos certificados directamente al dueno, administradora o GC con endosos de asegurado adicional donde se requiera." },
      { q:"Como se estructura el precio comercial?", a:"Precio personalizado por proyecto — basado en pies lineales, perfil, calibre, cantidad de bajantes, integracion de drenaje y alcance. GCs y portafolios con volumen recurrente pueden negociar precios." },
      { q:"Manejan drenaje tambien, o solo la canaleta?", a:"Alcance completo. Los techos comerciales demandan drenaje real — instalamos PVC subterraneo, tuberia corrugada, cajas de registro y excavacion junto con el sistema de canaletas." },
      { q:"Que hay de mantenimiento continuo?", a:"Ofrecemos acuerdos de mantenimiento comercial para complejos de apartamentos, portafolios administrados y duenos que quieren limpieza e inspeccion programadas. Separado de la instalacion." },
      { q:"Cuanto dura la instalacion comercial?", a:"Varia ampliamente — un pad minorista puede ser un dia, un complejo de 200 apartamentos son semanas. Comprometemos un horario especifico antes de comenzar y comunicamos cualquier cambio con anticipacion." },
    ],
    ctaTitle: "LISTO PARA ESPECIFICAR UN SISTEMA COMERCIAL DE CANALETAS?",
    ctaSub: "Cuentenos sobre su edificio, proyecto o portafolio. Caminaremos el sitio, construiremos una cotizacion de especificacion comercial y coordinaremos con su GC o equipo — precios transparentes.",
    formTitle: "Solicite Cotizacion Comercial",
    formName: "Nombre Completo / Empresa",
    formPhone: "Numero de Telefono",
    formEmail: "Correo Electronico",
    formZip: "Codigo Postal de la Propiedad",
    formBtn: "SOLICITAR MI COTIZACION COMERCIAL",
    formDisclaimer: "Sin spam. Sin presion. Conversacion directa con el dueno.",
    formSuccess: "Solicitud Recibida!",
    formSuccessSub: "Le responderemos dentro de un dia habil.",
    preferTalk: "Prefiere hablar?",
    stepLabel: "PASO",
  },
};

export default function CommercialGuttersPage() {
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
            <button onClick={()=>document.getElementById("quote-form")?.scrollIntoView({behavior:"smooth"})} style={{padding:"16px 36px",fontFamily:f.h,fontSize:"14px",fontWeight:700,letterSpacing:"1.5px",color:C.white,background:`linear-gradient(135deg,${C.accent},${C.accentLight})`,border:"none",borderRadius:"8px",cursor:"pointer",boxShadow:"0 4px 16px rgba(139,157,175,0.3)"}}>{t.btnEstimate}</button>
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

      <section style={{background:"linear-gradient(135deg, rgba(139,157,175,0.08), rgba(15,30,54,0.97))",padding:"28px 24px",borderTop:`2px solid ${C.accent}`,borderBottom:`2px solid ${C.accent}`}}>
        <div style={{maxWidth:"1000px",margin:"0 auto",display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:"20px"}}>
          <div style={{flex:"1 1 500px"}}>
            <div style={{display:"flex",alignItems:"center",gap:"8px",marginBottom:"8px"}}><span style={{fontSize:"16px"}}>🤝</span><span style={{fontFamily:f.h,fontSize:"11px",fontWeight:700,color:C.accent,letterSpacing:"2px"}}>{t.peakAlert}</span></div>
            <p style={{fontFamily:f.h,fontSize:"clamp(16px,2.5vw,20px)",fontWeight:800,color:C.white,lineHeight:1.3,marginBottom:"6px"}}>{t.peakTitle}</p>
            <p style={{fontFamily:f.b,fontSize:"14px",color:C.muted,lineHeight:1.5}}>{t.peakDesc}</p>
          </div>
          <div style={{display:"flex",flexDirection:"column",gap:"8px",flexShrink:0}}>
            <a href="/contact" style={{padding:"12px 24px",fontFamily:f.h,fontSize:"12px",fontWeight:700,letterSpacing:"1px",color:C.white,background:`linear-gradient(135deg, ${C.accent}, ${C.accentLight})`,borderRadius:"6px",textDecoration:"none",textAlign:"center",boxShadow:"0 4px 12px rgba(139,157,175,0.3)"}}>{t.peakBtn}</a>
          </div>
        </div>
      </section>

      <section style={{background:C.navy,padding:"80px 24px"}}>
        <div style={sec}><div style={{textAlign:"center"}}><Tag>{t.goldTag}</Tag><h2 style={{...secTitle,color:C.white}}>{t.goldTitle}</h2><GoldBar /><p style={{fontFamily:f.b,fontSize:"17px",color:C.offWhite,fontStyle:"italic",maxWidth:"500px",margin:"0 auto 48px"}}>{t.goldMotto}</p></div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(250px,1fr))",gap:"24px"}}>{t.goldSteps.map((step,i) => <div key={i} style={{background:C.navyFade,border:`1px solid ${C.navyLight}`,borderRadius:"12px",padding:"28px",position:"relative"}}><div style={{fontFamily:f.h,fontSize:"36px",fontWeight:800,color:"rgba(139,157,175,0.08)",position:"absolute",top:"16px",right:"20px"}}>{step.num}</div><div style={{fontFamily:f.h,fontSize:"11px",fontWeight:700,color:C.accent,letterSpacing:"3px",marginBottom:"8px"}}>{t.stepLabel} {step.num}</div><h3 style={{fontFamily:f.h,fontSize:"22px",fontWeight:700,color:C.white,marginBottom:"12px"}}>{step.title}</h3><p style={{fontFamily:f.b,fontSize:"15px",color:C.muted,lineHeight:1.6}}>{step.desc}</p></div>)}</div>
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
          <button onClick={()=>setSubmitted(true)} style={{width:"100%",padding:"16px",fontFamily:f.h,fontSize:"14px",fontWeight:700,letterSpacing:"1.5px",color:C.white,background:`linear-gradient(135deg,${C.accent},${C.accentLight})`,border:"none",borderRadius:"8px",cursor:"pointer",boxShadow:"0 4px 16px rgba(139,157,175,0.3)"}}>{t.formBtn}</button>
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
