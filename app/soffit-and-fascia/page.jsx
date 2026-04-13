"use client";

import { useState, useEffect } from "react";
import SiteNav from "../../components/SiteNav";
import SiteFooter from "../../components/SiteFooter";
import MobileCTA from "../../components/MobileCTA";
import { useLanguage } from "../../lib/LanguageContext";

const injectFonts = () => { if (typeof document==="undefined"||document.querySelector("#jr-fonts")) return; const l=document.createElement("link"); l.id="jr-fonts"; l.rel="stylesheet"; l.href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800&family=Source+Sans+3:wght@300;400;600&display=swap"; document.head.appendChild(l); };
const C = { bg:"#0B1628",navy:"#1B2A4A",navyMid:"#243556",navyLight:"#2C3E5A",navyFade:"#162033",gold:"#C8952E",goldLight:"#D4A843",goldPale:"rgba(200,149,46,0.12)",cream:"#F5F3EF",white:"#FFFFFF",offWhite:"#E8E4DC",muted:"#7A8FA8",charcoal:"#2D2D2D",success:"#2D8B4E",successDim:"rgba(45,139,78,0.15)",accent:"#E67E22",accentLight:"#F39C12",accentPale:"rgba(230,126,34,0.12)" };
const f = { h:"'Montserrat', sans-serif", b:"'Source Sans 3', sans-serif" };
const Tag = ({children}) => <div style={{display:"inline-block",padding:"6px 16px",background:C.accentPale,borderRadius:"4px",marginBottom:"12px"}}><span style={{fontFamily:f.h,fontSize:"12px",fontWeight:700,color:C.accent,letterSpacing:"3px"}}>{children}</span></div>;
const GoldBar = () => <div style={{width:"60px",height:"3px",background:`linear-gradient(90deg,${C.accent},${C.accentLight})`,borderRadius:"2px",margin:"16px auto"}} />;
const Stars = () => <span style={{color:C.gold,fontSize:"14px",letterSpacing:"2px"}}>★★★★★</span>;
const inputStyle = {width:"100%",padding:"13px 16px",fontFamily:f.b,fontSize:"15px",border:"1.5px solid #D1D5DB",borderRadius:"8px",outline:"none",color:C.charcoal,marginBottom:"12px",background:"#FAFAFA",boxSizing:"border-box"};

const T = {
  en: {
    breadcrumb: ["Home","Services","Soffit & Fascia"],
    heroTag: "SOFFIT & FASCIA INSTALLATION",
    heroH1: "The Part of Your Home",
    heroH1Gold: "Nobody Thinks About — Until It Fails.",
    heroP: "Soffit and fascia protect the most vulnerable edges of your roof from water, pests, and rot. When they fail, the damage spreads fast and gets expensive. We replace and install aluminum and vinyl soffit and fascia systems built for Florida weather.",
    btnInspection: "GET YOUR FREE INSPECTION",
    btnCall: "CALL (844) 444-3114",
    problemTag: "THE PROBLEM",
    problemTitle: "WHAT HAPPENS WHEN SOFFIT AND FASCIA FAIL",
    problems: [
      { icon:"🪵", title:"Rotting wood fascia", desc:"Florida's humidity and rain cycles destroy wood fascia boards from the inside out. By the time you see paint peeling, the rot has already spread behind your gutters and into your roof structure." },
      { icon:"🐝", title:"Pest entry points", desc:"Damaged or missing soffit panels are open invitations for wasps, birds, squirrels, bats, and rodents to nest in your attic. Once inside, they cause electrical damage, insulation contamination, and health hazards." },
      { icon:"🌡️", title:"Ventilation failure", desc:"Soffit vents are your attic's primary air intake. When they're blocked, damaged, or missing, your attic traps heat — driving up energy bills and accelerating shingle deterioration from underneath." },
      { icon:"🏚️", title:"Curb appeal collapse", desc:"Stained, sagging, or mismatched soffit and fascia instantly age your home's appearance. It's the first thing people notice when they look up — and the last thing sellers want buyers to see." },
    ],
    solutionTag: "THE JR ONE DIFFERENCE",
    solutionTitle: "SOFFIT & FASCIA DONE RIGHT",
    solutionSub: "We fix the problem underneath before covering it up — because wrapping aluminum over rotten wood is not a solution.",
    solutions: [
      { title:"Aluminum soffit and fascia", desc:"Our primary recommendation for Florida homes. Aluminum won't rot, warp, crack, or attract termites. It handles UV exposure, salt air, and hurricane-force rain without deteriorating. One installation, decades of protection." },
      { title:"Vinyl soffit and fascia", desc:"A budget-friendly alternative that still outperforms wood in every way. Vinyl won't rot or need painting, and modern vinyl products resist fading and impact. We help you choose based on your budget and aesthetic goals." },
      { title:"Wood rot repair underneath", desc:"Before installing new soffit or fascia, we inspect and replace any rotted wood substrate. Many companies wrap aluminum over rotten wood — we fix the problem first so your new material has a solid foundation." },
      { title:"Proper ventilation restoration", desc:"We ensure your soffit vents are correctly placed and unblocked for optimal attic airflow. This keeps your energy bills lower, extends shingle life, and prevents moisture buildup that causes mold." },
      { title:"Color matching and seamless finish", desc:"We carry a wide selection of colors and profiles to match your existing trim, gutters, and home style. The finished look should be seamless — not obviously replaced." },
      { title:"Storm damage specialists", desc:"Florida hurricanes rip soffit panels off like paper. We respond quickly to storm damage, board up exposed areas to prevent further damage, and schedule permanent replacement as fast as possible." },
    ],
    stats: [
      { value:"2,000+", label:"Soffit & fascia projects completed" },
      { value:"30+", label:"Years of experience" },
      { value:"3", label:"In-house installation crews" },
      { value:"0", label:"Subcontractors used — ever" },
    ],
    peakAlert: "FLORIDA INSURANCE ALERT",
    peakTitle: "280% Increase in Non-Renewals — Roof Over 15 Years Old?",
    peakDesc: "restores shingles from the inside out — adds 6–10 years at a fraction of replacement cost, with warranty docs your insurer must accept under FL law.",
    peakBtn: "PEAK 301 INFO →",
    peakRights: "YOUR RIGHTS →",
    goldTag: "THE GOLD STANDARD",
    goldTitle: "OUR SOFFIT & FASCIA PROCESS",
    goldMotto: "Every home. Every time. No exceptions.",
    goldSteps: [
      { num:"01", title:"ASSESS", desc:"Full inspection of your soffit, fascia, and underlying wood structure. We photograph everything and identify hidden rot or pest damage." },
      { num:"02", title:"DESIGN", desc:"Material selection (aluminum or vinyl), color matching, ventilation planning, and a transparent estimate with no surprises." },
      { num:"03", title:"INSTALL", desc:"Our crew removes old material, repairs any rotted wood, and installs new soffit and fascia — typically completing most homes in 1-3 days." },
      { num:"04", title:"PROTECT", desc:"Walkthrough inspection with you, cleanup, and our craftsmanship warranty. Your roof edge is sealed and protected." },
    ],
    reviewTag: "CUSTOMER REVIEWS",
    reviewTitle: "WHAT SOFFIT & FASCIA CUSTOMERS SAY",
    reviews: [
      { text:"I cannot express how grateful I am that JR One was referred to me. Chris was very communicative and supportive throughout the entire process. The crew arrived on time, were very nice and attentive. Talk about professionalism and integrity.", name:"Michelle D.", context:"Soffit & Fascia Install" },
      { text:"They removed the old wood soffit, replaced all the soffit and facia with aluminum, replaced all the wood that had termite damage with new wood, and the job was done in a matter of days! Six guys on site with a crew manager.", name:"Tampa Homeowner", context:"Full Soffit & Fascia Replacement" },
      { text:"After Milton I called a dozen different companies to help with our soffits that got blown out. Only one called back — JR ONE. The team showed up and did a perfect job. Do not call anyone else.", name:"Matt D.", context:"Storm Damage Soffit Repair" },
    ],
    faqTag: "FAQ",
    faqTitle: "SOFFIT & FASCIA QUESTIONS",
    faqs: [
      { q:"What's the difference between soffit and fascia?", a:"Soffit is the horizontal panel underneath your roof overhang — the surface you see when you look up at your eaves. Fascia is the vertical board that runs along the edge of your roof, where your gutters attach. Together they seal and protect the edges of your roof structure." },
      { q:"How much does soffit and fascia replacement cost?", a:"Full house soffit and fascia replacement in Tampa typically ranges from $5,000–$15,000+ depending on home size, material (aluminum vs vinyl), amount of wood rot repair needed, and accessibility. We provide detailed estimates broken down by section so you can prioritize if needed." },
      { q:"Should I choose aluminum or vinyl soffit?", a:"For Florida, we generally recommend aluminum. It's more durable in extreme heat, handles impact better during storms, and lasts longer. Vinyl is a solid budget option that still outperforms wood. We'll assess your specific situation and give you an honest recommendation." },
      { q:"How do I know if my soffit or fascia needs replacing?", a:"Look for paint peeling or bubbling, visible staining, sagging panels, holes or cracks, soft spots when pressed, pest activity near your roofline, or pieces that have detached. If your soffit or fascia is original wood and your home is 15+ years old, it's worth an inspection." },
      { q:"Do you repair the wood underneath?", a:"Yes — and this is critical. We inspect and replace any rotted wood substrate before installing new aluminum or vinyl. Some companies skip this step and wrap new material over rotten wood, which just hides the problem. We fix it right." },
      { q:"How long does soffit and fascia installation take?", a:"Most full-house soffit and fascia replacements take 2-4 days depending on home size and the extent of wood repair needed. Partial replacements or repairs can often be completed in a single day." },
    ],
    ctaTitle: "PROTECT YOUR ROOF'S MOST VULNERABLE EDGES",
    ctaSub: "Get your free soffit and fascia inspection. We'll document the condition of your entire roofline and give you a transparent, no-pressure estimate.",
    formTitle: "Get Your Free Soffit & Fascia Inspection",
    formName: "Full Name",
    formPhone: "Phone Number",
    formEmail: "Email Address",
    formZip: "ZIP Code",
    formBtn: "REQUEST MY FREE INSPECTION",
    formDisclaimer: "No spam. No pressure. Just honest expert advice.",
    formSuccess: "Inspection Request Received!",
    formSuccessSub: "We'll get back to you within hours.",
    preferTalk: "Prefer to talk?",
    stepLabel: "STEP",
  },
  es: {
    breadcrumb: ["Inicio","Servicios","Sofito y Fascia"],
    heroTag: "INSTALACION DE SOFITO Y FASCIA",
    heroH1: "La Parte de Su Hogar",
    heroH1Gold: "En la Que Nadie Piensa — Hasta Que Falla.",
    heroP: "El sofito y la fascia protegen los bordes mas vulnerables de su techo contra el agua, plagas y pudricion. Cuando fallan, el dano se propaga rapido y se vuelve costoso. Reemplazamos e instalamos sistemas de sofito y fascia de aluminio y vinilo disenados para el clima de Florida.",
    btnInspection: "OBTENGA SU INSPECCION GRATIS",
    btnCall: "LLAME AL (844) 444-3114",
    problemTag: "EL PROBLEMA",
    problemTitle: "QUE PASA CUANDO EL SOFITO Y LA FASCIA FALLAN",
    problems: [
      { icon:"🪵", title:"Fascia de madera podrida", desc:"La humedad y los ciclos de lluvia de Florida destruyen las tablas de fascia de madera desde adentro. Para cuando ve la pintura descascarandose, la pudricion ya se extendio detras de sus canaletas y hacia la estructura del techo." },
      { icon:"🐝", title:"Puntos de entrada de plagas", desc:"Los paneles de sofito danados o faltantes son invitaciones abiertas para avispas, pajaros, ardillas, murcielagos y roedores que anidan en su atico. Una vez adentro, causan danos electricos, contaminacion del aislamiento y riesgos de salud." },
      { icon:"🌡️", title:"Falla de ventilacion", desc:"Las rejillas del sofito son la entrada principal de aire de su atico. Cuando estan bloqueadas, danadas o faltantes, su atico atrapa calor — aumentando las facturas de energia y acelerando el deterioro de las tejas desde abajo." },
      { icon:"🏚️", title:"Perdida de atractivo exterior", desc:"El sofito y fascia manchados, combados o que no combinan envejecen instantaneamente la apariencia de su hogar. Es lo primero que la gente nota al mirar hacia arriba — y lo ultimo que los vendedores quieren que los compradores vean." },
    ],
    solutionTag: "LA DIFERENCIA JR ONE",
    solutionTitle: "SOFITO Y FASCIA BIEN HECHO",
    solutionSub: "Arreglamos el problema debajo antes de cubrirlo — porque envolver aluminio sobre madera podrida no es una solucion.",
    solutions: [
      { title:"Sofito y fascia de aluminio", desc:"Nuestra recomendacion principal para hogares en Florida. El aluminio no se pudre, deforma, agrieta ni atrae termitas. Maneja la exposicion UV, el aire salado y la lluvia de fuerza huracanada sin deteriorarse. Una instalacion, decadas de proteccion." },
      { title:"Sofito y fascia de vinilo", desc:"Una alternativa economica que aun supera a la madera en todo sentido. El vinilo no se pudre ni necesita pintura, y los productos modernos de vinilo resisten la decoloracion y el impacto. Le ayudamos a elegir segun su presupuesto y objetivos esteticos." },
      { title:"Reparacion de madera podrida debajo", desc:"Antes de instalar nuevo sofito o fascia, inspeccionamos y reemplazamos cualquier sustrato de madera podrida. Muchas empresas envuelven aluminio sobre madera podrida — nosotros arreglamos el problema primero para que su material nuevo tenga una base solida." },
      { title:"Restauracion de ventilacion adecuada", desc:"Aseguramos que las rejillas de su sofito esten correctamente ubicadas y desbloqueadas para un flujo de aire optimo del atico. Esto mantiene sus facturas de energia mas bajas, extiende la vida de las tejas y previene la acumulacion de humedad que causa moho." },
      { title:"Combinacion de color y acabado continuo", desc:"Tenemos una amplia seleccion de colores y perfiles para combinar con su moldura, canaletas y estilo de hogar existente. El resultado final debe verse continuo — no como un reemplazo obvio." },
      { title:"Especialistas en danos por tormenta", desc:"Los huracanes de Florida arrancan los paneles de sofito como papel. Respondemos rapidamente a danos por tormenta, aseguramos las areas expuestas para prevenir mas dano y programamos el reemplazo permanente lo mas rapido posible." },
    ],
    stats: [
      { value:"2,000+", label:"Proyectos de sofito y fascia completados" },
      { value:"30+", label:"Anos de experiencia" },
      { value:"3", label:"Equipos de instalacion propios" },
      { value:"0", label:"Subcontratistas usados — nunca" },
    ],
    peakAlert: "ALERTA DE SEGUROS DE FLORIDA",
    peakTitle: "Aumento del 280% en No-Renovaciones — Techo de mas de 15 anos?",
    peakDesc: "restaura las tejas desde adentro — agrega 6–10 anos a una fraccion del costo de reemplazo, con documentos de garantia que su aseguradora debe aceptar bajo la ley de FL.",
    peakBtn: "INFO PEAK 301 →",
    peakRights: "SUS DERECHOS →",
    goldTag: "EL ESTANDAR DE ORO",
    goldTitle: "NUESTRO PROCESO DE SOFITO Y FASCIA",
    goldMotto: "Cada hogar. Cada vez. Sin excepciones.",
    goldSteps: [
      { num:"01", title:"EVALUAR", desc:"Inspeccion completa de su sofito, fascia y estructura de madera subyacente. Fotografiamos todo e identificamos pudricion oculta o danos por plagas." },
      { num:"02", title:"DISENAR", desc:"Seleccion de material (aluminio o vinilo), combinacion de color, planificacion de ventilacion y un estimado transparente sin sorpresas." },
      { num:"03", title:"INSTALAR", desc:"Nuestro equipo remueve el material viejo, repara cualquier madera podrida e instala sofito y fascia nuevos — generalmente completando la mayoria de los hogares en 1-3 dias." },
      { num:"04", title:"PROTEGER", desc:"Inspeccion de recorrido con usted, limpieza y nuestra garantia de mano de obra. El borde de su techo queda sellado y protegido." },
    ],
    reviewTag: "RESENAS DE CLIENTES",
    reviewTitle: "LO QUE DICEN LOS CLIENTES DE SOFITO Y FASCIA",
    reviews: [
      { text:"No puedo expresar lo agradecida que estoy de que me refirieron a JR One. Chris fue muy comunicativo y me apoyo durante todo el proceso. El equipo llego a tiempo, fueron muy amables y atentos. Eso es profesionalismo e integridad.", name:"Michelle D.", context:"Instalacion de Sofito y Fascia" },
      { text:"Removieron el sofito viejo de madera, reemplazaron todo el sofito y fascia con aluminio, reemplazaron toda la madera danada por termitas con madera nueva, y el trabajo se completo en cuestion de dias! Seis personas en el sitio con un gerente de equipo.", name:"Tampa Homeowner", context:"Reemplazo Completo de Sofito y Fascia" },
      { text:"Despues de Milton llame a una docena de empresas diferentes para ayudar con nuestros sofitos que se volaron. Solo una devolvio la llamada — JR ONE. El equipo se presento e hizo un trabajo perfecto. No llame a nadie mas.", name:"Matt D.", context:"Reparacion de Sofito por Tormenta" },
    ],
    faqTag: "PREGUNTAS FRECUENTES",
    faqTitle: "PREGUNTAS SOBRE SOFITO Y FASCIA",
    faqs: [
      { q:"Cual es la diferencia entre sofito y fascia?", a:"El sofito es el panel horizontal debajo del alero de su techo — la superficie que ve cuando mira hacia arriba en los aleros. La fascia es la tabla vertical que corre a lo largo del borde de su techo, donde se fijan sus canaletas. Juntos sellan y protegen los bordes de la estructura de su techo." },
      { q:"Cuanto cuesta el reemplazo de sofito y fascia?", a:"El reemplazo completo de sofito y fascia en Tampa generalmente oscila entre $5,000–$15,000+ dependiendo del tamano de la casa, material (aluminio vs vinilo), cantidad de reparacion de madera podrida necesaria y accesibilidad. Proporcionamos estimados detallados desglosados por seccion para que pueda priorizar si es necesario." },
      { q:"Debo elegir sofito de aluminio o vinilo?", a:"Para Florida, generalmente recomendamos aluminio. Es mas duradero en calor extremo, maneja mejor los impactos durante tormentas y dura mas. El vinilo es una buena opcion economica que aun supera a la madera. Evaluaremos su situacion especifica y le daremos una recomendacion honesta." },
      { q:"Como se si mi sofito o fascia necesita reemplazo?", a:"Busque pintura descascarandose o burbujeando, manchas visibles, paneles combados, agujeros o grietas, puntos blandos al presionar, actividad de plagas cerca de su linea de techo, o piezas desprendidas. Si su sofito o fascia es madera original y su hogar tiene mas de 15 anos, vale la pena una inspeccion." },
      { q:"Reparan la madera debajo?", a:"Si — y esto es critico. Inspeccionamos y reemplazamos cualquier sustrato de madera podrida antes de instalar aluminio o vinilo nuevo. Algunas empresas se saltan este paso y envuelven material nuevo sobre madera podrida, lo que solo oculta el problema. Nosotros lo hacemos bien." },
      { q:"Cuanto tiempo toma la instalacion de sofito y fascia?", a:"La mayoria de los reemplazos completos de sofito y fascia toman 2-4 dias dependiendo del tamano de la casa y la extension de la reparacion de madera necesaria. Reemplazos parciales o reparaciones a menudo se pueden completar en un solo dia." },
    ],
    ctaTitle: "PROTEJA LOS BORDES MAS VULNERABLES DE SU TECHO",
    ctaSub: "Obtenga su inspeccion gratis de sofito y fascia. Documentaremos la condicion de toda su linea de techo y le daremos un estimado transparente y sin presion.",
    formTitle: "Obtenga Su Inspeccion Gratis de Sofito y Fascia",
    formName: "Nombre Completo",
    formPhone: "Numero de Telefono",
    formEmail: "Correo Electronico",
    formZip: "Codigo Postal",
    formBtn: "SOLICITAR MI INSPECCION GRATIS",
    formDisclaimer: "Sin spam. Sin presion. Solo consejo honesto de expertos.",
    formSuccess: "Solicitud de Inspeccion Recibida!",
    formSuccessSub: "Nos comunicaremos con usted en pocas horas.",
    preferTalk: "Prefiere hablar?",
    stepLabel: "PASO",
  },
};

export default function SoffitFasciaPage() {
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

      <section className="hero-stars" style={{padding:"60px 24px 80px",maxWidth:"1200px",margin:"0 auto",display:"flex",gap:"48px",alignItems:"center",flexWrap:"wrap"}}>
        <div style={{flex:"1 1 500px",minWidth:"300px"}}>
          <Tag>{t.heroTag}</Tag>
          <h1 style={{fontFamily:f.h,fontSize:"clamp(32px,5vw,48px)",fontWeight:800,lineHeight:1.1,marginBottom:"20px"}}>{t.heroH1}<br/><span style={{color:C.accent}}>{t.heroH1Gold}</span></h1>
          <p style={{fontFamily:f.b,fontSize:"18px",color:C.offWhite,lineHeight:1.7,marginBottom:"32px",maxWidth:"560px"}}>{t.heroP}</p>
          <div style={{display:"flex",gap:"16px",flexWrap:"wrap"}}><button onClick={()=>document.getElementById("quote-form")?.scrollIntoView({behavior:"smooth"})} style={{padding:"16px 36px",fontFamily:f.h,fontSize:"14px",fontWeight:700,letterSpacing:"1.5px",color:C.white,background:`linear-gradient(135deg,${C.accent},${C.accentLight})`,border:"none",borderRadius:"8px",cursor:"pointer",boxShadow:"0 4px 16px rgba(230,126,34,0.3)"}}>{t.btnInspection}</button><a href="tel:8444443114" style={{display:"inline-flex",alignItems:"center",padding:"16px 36px",fontFamily:f.h,fontSize:"14px",fontWeight:700,letterSpacing:"1.5px",color:C.accent,border:`2px solid ${C.accent}`,borderRadius:"8px",textDecoration:"none"}}>📞 {t.btnCall}</a></div>
          <div style={{display:"flex",gap:"24px",marginTop:"32px",flexWrap:"wrap"}}>{t.stats.map((s,i) => <div key={i} style={{textAlign:"center"}}><div style={{fontFamily:f.h,fontSize:"28px",fontWeight:800,color:C.accent}}>{s.value}</div><div style={{fontFamily:f.b,fontSize:"12px",color:C.muted,maxWidth:"100px"}}>{s.label}</div></div>)}</div>
        </div>
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
          <button onClick={()=>setSubmitted(true)} style={{width:"100%",padding:"16px",fontFamily:f.h,fontSize:"14px",fontWeight:700,letterSpacing:"1.5px",color:C.white,background:`linear-gradient(135deg,${C.accent},${C.accentLight})`,border:"none",borderRadius:"8px",cursor:"pointer",boxShadow:"0 4px 16px rgba(230,126,34,0.3)"}}>{t.formBtn}</button>
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
