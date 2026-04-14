"use client";

import { useState, useEffect } from "react";
import SiteNav from "../../components/SiteNav";
import SiteFooter from "../../components/SiteFooter";
import MobileCTA from "../../components/MobileCTA";
import { useLanguage } from "../../lib/LanguageContext";

const injectFonts = () => { if (typeof document==="undefined"||document.querySelector("#jr-fonts")) return; const l=document.createElement("link"); l.id="jr-fonts"; l.rel="stylesheet"; l.href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800&family=Source+Sans+3:wght@300;400;600&display=swap"; document.head.appendChild(l); };
const C = { bg:"#0B1628",navy:"#1B2A4A",navyMid:"#243556",navyLight:"#2C3E5A",navyFade:"#162033",gold:"#C8952E",goldLight:"#D4A843",goldPale:"rgba(200,149,46,0.12)",cream:"#F5F3EF",white:"#FFFFFF",offWhite:"#E8E4DC",muted:"#7A8FA8",charcoal:"#2D2D2D",success:"#2D8B4E",successDim:"rgba(45,139,78,0.15)",accent:"#CC6B49",accentLight:"#E07D5A",accentPale:"rgba(204,107,73,0.12)" };
const f = { h:"'Montserrat', sans-serif", b:"'Source Sans 3', sans-serif" };
const Tag = ({children}) => <div style={{display:"inline-block",padding:"6px 16px",background:C.accentPale,borderRadius:"4px",marginBottom:"12px"}}><span style={{fontFamily:f.h,fontSize:"12px",fontWeight:700,color:C.accent,letterSpacing:"3px"}}>{children}</span></div>;
const GoldBar = () => <div style={{width:"60px",height:"3px",background:`linear-gradient(90deg,${C.accent},${C.accentLight})`,borderRadius:"2px",margin:"16px auto"}} />;
const Stars = () => <span style={{color:C.accent,fontSize:"14px",letterSpacing:"2px"}}>★★★★★</span>;
const inputStyle = {width:"100%",padding:"13px 16px",fontFamily:f.b,fontSize:"15px",border:"1.5px solid #D1D5DB",borderRadius:"8px",outline:"none",color:C.charcoal,marginBottom:"12px",background:"#FAFAFA",boxSizing:"border-box"};

const T = {
  en: {
    breadcrumb: ["Home","Services","Siding"],
    heroTag: "SIDING INSTALLATION & REPAIR",
    heroH1: "Your Home's First Line",
    heroH1Gold: "of Defense Against Florida Weather.",
    heroP: "Vinyl siding installation and repair built to handle Tampa Bay's sun, rain, humidity, and hurricanes. We install it right so your home stays protected and looking sharp for years.",
    btnEstimate: "GET YOUR FREE ESTIMATE",
    btnCall: "CALL (844) 444-3114",
    problemTag: "THE PROBLEM",
    problemTitle: "WHAT FAILING SIDING COSTS YOU",
    problems: [
      { icon:"🌪️", title:"Storm damage exposure", desc:"Florida's hurricane season puts enormous stress on siding. Impact from debris, sustained wind loads, and driving rain find every weakness in aging or poorly installed siding." },
      { icon:"☀️", title:"UV and heat degradation", desc:"Tampa's intense sun warps, fades, and brittles low-quality siding within years. What looked great at installation starts cracking and yellowing faster than you'd expect." },
      { icon:"💧", title:"Moisture infiltration", desc:"Damaged or improperly installed siding lets moisture behind your walls. In Florida's humidity, that moisture breeds mold, rots framing, and creates air quality problems inside your home." },
      { icon:"📉", title:"Declining home value", desc:"Damaged siding is one of the first things buyers and appraisers notice. It signals neglected maintenance and can reduce your home's appraised value by 5-10%." },
    ],
    solutionTag: "THE JR ONE DIFFERENCE",
    solutionTitle: "SIDING THAT HANDLES FLORIDA",
    solutions: [
      { title:"Vinyl siding installation", desc:"Modern vinyl siding is engineered for Florida conditions — UV-resistant, impact-rated, and maintenance-free. No painting, no scraping, no staining. We install panels with proper overlap and fastening for hurricane-rated wind resistance." },
      { title:"SAGIPER premium cladding", desc:"For the ultimate in exterior protection and aesthetics, we install SAGIPER architectural cladding systems — SagiWall, SagiRev, and more. Miami-Dade tested, 50-year warranty, zero maintenance. The premium tier." },
      { title:"Storm damage repair", desc:"Cracked panels, dented sections, torn pieces — we match your existing siding color and profile to replace damaged sections seamlessly. No need to reside your entire home for localized storm damage." },
      { title:"Hardie Board siding maintenance", desc:"Already have fiber cement siding? We maintain, repair, and repaint Hardie Board to keep it performing and looking its best through Florida's demanding climate cycles." },
      { title:"Proper moisture barrier installation", desc:"Every siding installation includes inspection and repair of the moisture barrier underneath. Siding over a compromised barrier is just a pretty cover over a rotting wall." },
      { title:"Color and style consultation", desc:"Wide selection of colors, profiles, and textures. We help you choose siding that complements your roof, trim, and neighborhood aesthetic — not just what's cheapest on the truck." },
    ],
    stats: [
      { value:"500+", label:"Siding projects completed" },
      { value:"20+", label:"Year material warranties" },
      { value:"30+", label:"Color options available" },
      { value:"100%", label:"In-house crews" },
    ],
    peakAlert: "FLORIDA INSURANCE ALERT",
    peakTitle: "280% Increase in Non-Renewals — Roof Over 15 Years Old?",
    peakDesc: "restores shingles from the inside out — adds 6–10 years of roof life and comes with the warranty docs Florida law requires your insurer to accept.",
    peakBtn: "PEAK 301 INFO →",
    peakRights: "YOUR RIGHTS →",
    goldTag: "THE GOLD STANDARD",
    goldTitle: "OUR SIDING INSTALLATION PROCESS",
    goldMotto: "Every home. Every time. No exceptions.",
    goldSteps: [
      { num:"01", title:"ASSESS", desc:"Full exterior inspection — current siding condition, moisture barrier integrity, structural issues, and your aesthetic goals." },
      { num:"02", title:"DESIGN", desc:"Material selection, color matching, cost breakdown, and a detailed project timeline. You know exactly what's happening and when." },
      { num:"03", title:"INSTALL", desc:"Our crew removes old siding, repairs any substrate damage, installs moisture barrier, and mounts new siding with hurricane-rated fastening." },
      { num:"04", title:"PROTECT", desc:"Final walkthrough, cleanup, and our craftsmanship warranty. Your home looks brand new and is protected against whatever Florida sends." },
    ],
    reviewTag: "CUSTOMER REVIEWS",
    reviewTitle: "WHAT SIDING CUSTOMERS SAY",
    reviews: [
      { text:"JR One aluminum is nothing short of awesome. From Stefan as my sales person to Christian and the crew — they ALL deserve a big thank you. They replaced my fascia and soffit, did a beautiful job. Extremely professional, clean, courteous.", name:"JR One Customer", context:"Exterior Renovation" },
      { text:"Great crew, all very nice and courteous gentlemen. Work was done exactly to the quote and mock-up images. Not one detail missed. I will have them back as needed.", name:"Jaclyn G.", context:"Full Exterior Work" },
      { text:"Amazing work and so respectful. They moved everything out of the way and even put it all back. They even re-hung our security cameras. Swept up the mess too. Their work was beautiful.", name:"Jessica L.", context:"Siding + Soffit + Gutters" },
    ],
    faqTag: "FAQ",
    faqTitle: "SIDING QUESTIONS",
    faqs: [
      { q:"How much does siding installation cost in Tampa?", a:"Siding costs vary significantly based on material (vinyl vs fiber cement vs premium cladding), home size, and the amount of prep work needed. Vinyl siding typically runs $4–$9 per square foot installed. Premium options like SAGIPER cladding are higher but come with 50-year warranties. We provide detailed, itemized estimates so you can compare apples to apples." },
      { q:"Which siding is best for Florida homes?", a:"For most Tampa Bay homes, vinyl siding offers the best balance of durability, appearance, and value. For homeowners wanting premium aesthetics and maximum durability, we install SAGIPER architectural cladding — wind-load tested, UV-resistant, and backed by a 50-year warranty. We assess your specific situation — location, exposure, budget — and give you an honest recommendation." },
      { q:"How long does siding installation take?", a:"A full house re-side typically takes 5-10 days depending on home size and complexity. Partial repairs or section replacements can often be completed in 1-2 days." },
      { q:"Can you match my existing siding for repairs?", a:"In most cases, yes. We maintain a wide inventory of profiles and colors, and we can special-order specific matches when needed. For older siding where exact matches are unavailable, we work with you to find the closest option or suggest replacing full sections for a consistent appearance." },
      { q:"Does new siding increase home value?", a:"Yes — siding replacement consistently ranks among the top home improvements for return on investment. Industry data typically shows 70-80% cost recovery at resale, plus the curb appeal improvement can help your home sell faster." },
      { q:"Do you handle the permit process?", a:"We guide you through any permitting requirements for your area. Tampa and surrounding municipalities have different rules about exterior renovations, and we make sure your project is compliant." },
    ],
    ctaTitle: "READY TO TRANSFORM YOUR HOME'S EXTERIOR?",
    ctaSub: "Get your free siding consultation. We'll inspect your current siding, discuss your options, and give you a transparent estimate — no pressure.",
    formTitle: "Get Your Free Siding Estimate",
    formName: "Full Name",
    formPhone: "Phone Number",
    formEmail: "Email Address",
    formZip: "ZIP Code",
    formBtn: "REQUEST MY FREE SIDING ESTIMATE",
    formDisclaimer: "No spam. No pressure.",
    formSuccess: "Quote Request Received!",
    stepLabel: "STEP",
  },
  es: {
    breadcrumb: ["Inicio","Servicios","Revestimiento"],
    heroTag: "INSTALACION Y REPARACION DE REVESTIMIENTO",
    heroH1: "La Primera Linea de Defensa",
    heroH1Gold: "de Su Hogar Contra el Clima de Florida.",
    heroP: "Instalacion y reparacion de revestimiento de vinilo disenado para manejar el sol, la lluvia, la humedad y los huracanes de Tampa Bay. Lo instalamos correctamente para que su hogar se mantenga protegido y con buena apariencia por anos.",
    btnEstimate: "OBTENGA SU ESTIMADO GRATIS",
    btnCall: "LLAME AL (844) 444-3114",
    problemTag: "EL PROBLEMA",
    problemTitle: "LO QUE LE CUESTA UN REVESTIMIENTO DANADO",
    problems: [
      { icon:"🌪️", title:"Exposicion a danos por tormenta", desc:"La temporada de huracanes de Florida somete al revestimiento a un estres enorme. El impacto de escombros, cargas de viento sostenidas y lluvia torrencial encuentran cada debilidad en el revestimiento viejo o mal instalado." },
      { icon:"☀️", title:"Degradacion por UV y calor", desc:"El sol intenso de Tampa deforma, descolora y hace fragil el revestimiento de baja calidad en pocos anos. Lo que se veia bien al instalarse comienza a agrietarse y amarillarse mas rapido de lo esperado." },
      { icon:"💧", title:"Infiltracion de humedad", desc:"El revestimiento danado o mal instalado deja pasar la humedad detras de sus paredes. Con la humedad de Florida, esa humedad cria moho, pudre la estructura y crea problemas de calidad de aire dentro de su hogar." },
      { icon:"📉", title:"Disminucion del valor de la propiedad", desc:"El revestimiento danado es una de las primeras cosas que notan los compradores y tasadores. Senala mantenimiento descuidado y puede reducir el valor tasado de su hogar entre 5-10%." },
    ],
    solutionTag: "LA DIFERENCIA JR ONE",
    solutionTitle: "REVESTIMIENTO QUE RESISTE FLORIDA",
    solutions: [
      { title:"Instalacion de revestimiento de vinilo", desc:"El revestimiento de vinilo moderno esta disenado para las condiciones de Florida — resistente a UV, clasificado contra impactos y libre de mantenimiento. Sin pintar, sin raspar, sin manchar. Instalamos los paneles con el traslape y fijacion adecuados para resistencia a vientos de huracan." },
      { title:"Revestimiento premium SAGIPER", desc:"Para la maxima proteccion exterior y estetica, instalamos sistemas de revestimiento arquitectonico SAGIPER — SagiWall, SagiRev y mas. Probado en Miami-Dade, garantia de 50 anos, cero mantenimiento. El nivel premium." },
      { title:"Reparacion de danos por tormenta", desc:"Paneles agrietados, secciones abolladas, piezas rotas — combinamos el color y perfil de su revestimiento existente para reemplazar las secciones danadas sin problemas. No necesita re-revestir toda su casa por dano localizado de tormenta." },
      { title:"Mantenimiento de revestimiento Hardie Board", desc:"Ya tiene revestimiento de fibrocemento? Mantenemos, reparamos y repintamos Hardie Board para que siga funcionando y luciendo lo mejor posible a traves de los ciclos climaticos exigentes de Florida." },
      { title:"Instalacion adecuada de barrera de humedad", desc:"Cada instalacion de revestimiento incluye inspeccion y reparacion de la barrera de humedad debajo. Revestimiento sobre una barrera comprometida es solo una cubierta bonita sobre una pared pudriendose." },
      { title:"Consulta de color y estilo", desc:"Amplia seleccion de colores, perfiles y texturas. Le ayudamos a elegir el revestimiento que complemente su techo, molduras y estetica del vecindario — no solo lo mas barato en el camion." },
    ],
    stats: [
      { value:"500+", label:"Proyectos de revestimiento completados" },
      { value:"20+", label:"Anos de garantia de materiales" },
      { value:"30+", label:"Opciones de color disponibles" },
      { value:"100%", label:"Equipos propios" },
    ],
    peakAlert: "ALERTA DE SEGUROS DE FLORIDA",
    peakTitle: "Aumento del 280% en No-Renovaciones — Techo de mas de 15 anos?",
    peakDesc: "restaura las tejas desde adentro — agrega 6–10 anos de vida al techo y viene con los documentos de garantia que la ley de FL requiere que su aseguradora acepte.",
    peakBtn: "INFO PEAK 301 →",
    peakRights: "SUS DERECHOS →",
    goldTag: "EL ESTANDAR DE ORO",
    goldTitle: "NUESTRO PROCESO DE INSTALACION DE REVESTIMIENTO",
    goldMotto: "Cada hogar. Cada vez. Sin excepciones.",
    goldSteps: [
      { num:"01", title:"EVALUAR", desc:"Inspeccion exterior completa — condicion actual del revestimiento, integridad de la barrera de humedad, problemas estructurales y sus objetivos esteticos." },
      { num:"02", title:"DISENAR", desc:"Seleccion de material, combinacion de color, desglose de costos y un cronograma detallado del proyecto. Usted sabe exactamente que va a pasar y cuando." },
      { num:"03", title:"INSTALAR", desc:"Nuestro equipo remueve el revestimiento viejo, repara cualquier dano en el sustrato, instala la barrera de humedad y monta el revestimiento nuevo con fijacion clasificada para huracanes." },
      { num:"04", title:"PROTEGER", desc:"Recorrido final, limpieza y nuestra garantia de mano de obra. Su hogar se ve como nuevo y esta protegido contra lo que Florida le envie." },
    ],
    reviewTag: "RESENAS DE CLIENTES",
    reviewTitle: "LO QUE DICEN LOS CLIENTES DE REVESTIMIENTO",
    reviews: [
      { text:"JR One aluminum es simplemente increible. Desde Stefan como mi vendedor hasta Christian y el equipo — TODOS merecen un gran agradecimiento. Reemplazaron mi fascia y sofito, hicieron un trabajo hermoso. Extremadamente profesionales, limpios, corteses.", name:"JR One Customer", context:"Renovacion Exterior" },
      { text:"Gran equipo, todos caballeros muy amables y corteses. El trabajo se hizo exactamente segun la cotizacion e imagenes de muestra. No se perdio ni un detalle. Los tendre de vuelta cuando sea necesario.", name:"Jaclyn G.", context:"Trabajo Exterior Completo" },
      { text:"Trabajo increible y muy respetuosos. Movieron todo fuera del camino e incluso lo pusieron de vuelta. Hasta volvieron a colgar nuestras camaras de seguridad. Barrieron el desorden tambien. Su trabajo fue hermoso.", name:"Jessica L.", context:"Revestimiento + Sofito + Canaletas" },
    ],
    faqTag: "PREGUNTAS FRECUENTES",
    faqTitle: "PREGUNTAS SOBRE REVESTIMIENTO",
    faqs: [
      { q:"Cuanto cuesta la instalacion de revestimiento en Tampa?", a:"Los costos de revestimiento varian significativamente segun el material (vinilo vs fibrocemento vs revestimiento premium), tamano de la casa y la cantidad de trabajo de preparacion necesario. El revestimiento de vinilo tipicamente cuesta $4–$9 por pie cuadrado instalado. Las opciones premium como el revestimiento SAGIPER son mas altas pero vienen con garantias de 50 anos. Proporcionamos estimados detallados y desglosados para que pueda comparar correctamente." },
      { q:"Cual es el mejor revestimiento para hogares en Florida?", a:"Para la mayoria de los hogares de Tampa Bay, el revestimiento de vinilo ofrece el mejor balance de durabilidad, apariencia y valor. Para propietarios que desean estetica premium y maxima durabilidad, instalamos revestimiento arquitectonico SAGIPER — probado contra cargas de viento, resistente a UV y respaldado por una garantia de 50 anos. Evaluamos su situacion especifica — ubicacion, exposicion, presupuesto — y le damos una recomendacion honesta." },
      { q:"Cuanto tiempo toma la instalacion de revestimiento?", a:"Un re-revestimiento completo de casa tipicamente toma 5-10 dias dependiendo del tamano y complejidad de la casa. Reparaciones parciales o reemplazos de secciones a menudo se pueden completar en 1-2 dias." },
      { q:"Pueden igualar mi revestimiento existente para reparaciones?", a:"En la mayoria de los casos, si. Mantenemos un amplio inventario de perfiles y colores, y podemos hacer pedidos especiales de combinaciones especificas cuando es necesario. Para revestimiento viejo donde las combinaciones exactas no estan disponibles, trabajamos con usted para encontrar la opcion mas cercana o sugerimos reemplazar secciones completas para una apariencia consistente." },
      { q:"El revestimiento nuevo aumenta el valor de la propiedad?", a:"Si — el reemplazo de revestimiento consistentemente se clasifica entre las mejores mejoras del hogar por retorno de inversion. Los datos de la industria tipicamente muestran 70-80% de recuperacion de costos en la reventa, ademas de que la mejora en apariencia puede ayudar a que su casa se venda mas rapido." },
      { q:"Manejan el proceso de permisos?", a:"Lo guiamos a traves de cualquier requisito de permisos para su area. Tampa y los municipios circundantes tienen diferentes reglas sobre renovaciones exteriores, y nos aseguramos de que su proyecto cumpla con las normas." },
    ],
    ctaTitle: "LISTO PARA TRANSFORMAR EL EXTERIOR DE SU HOGAR?",
    ctaSub: "Obtenga su consulta gratis de revestimiento. Inspeccionaremos su revestimiento actual, discutiremos sus opciones y le daremos un estimado transparente — sin presion.",
    formTitle: "Obtenga Su Estimado Gratis de Revestimiento",
    formName: "Nombre Completo",
    formPhone: "Numero de Telefono",
    formEmail: "Correo Electronico",
    formZip: "Codigo Postal",
    formBtn: "SOLICITAR MI ESTIMADO GRATIS DE REVESTIMIENTO",
    formDisclaimer: "Sin spam. Sin presion.",
    formSuccess: "Solicitud de Cotizacion Recibida!",
    stepLabel: "PASO",
  },
};

export default function SidingPage() {
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

      <section className="hero-stars" style={{padding:"60px 24px 80px",maxWidth:"1200px",margin:"0 auto",display:"flex",gap:"48px",alignItems:"center",flexWrap:"wrap"}}><div style={{flex:"1 1 500px",minWidth:"300px"}}><Tag>{t.heroTag}</Tag><h1 style={{fontFamily:f.h,fontSize:"clamp(32px,5vw,48px)",fontWeight:800,lineHeight:1.1,marginBottom:"20px"}}>{t.heroH1}<br/><span style={{color:C.accent}}>{t.heroH1Gold}</span></h1><p style={{fontFamily:f.b,fontSize:"18px",color:C.offWhite,lineHeight:1.7,marginBottom:"32px",maxWidth:"560px"}}>{t.heroP}</p><div style={{display:"flex",gap:"16px",flexWrap:"wrap"}}><button onClick={()=>document.getElementById("quote-form")?.scrollIntoView({behavior:"smooth"})} style={{padding:"16px 36px",fontFamily:f.h,fontSize:"14px",fontWeight:700,letterSpacing:"1.5px",color:C.white,background:`linear-gradient(135deg,${C.accent},${C.accentLight})`,border:"none",borderRadius:"8px",cursor:"pointer",boxShadow:"0 4px 16px rgba(204,107,73,0.3)"}}>{t.btnEstimate}</button><a href="tel:8444443114" style={{display:"inline-flex",alignItems:"center",padding:"16px 36px",fontFamily:f.h,fontSize:"14px",fontWeight:700,letterSpacing:"1.5px",color:C.accent,border:`2px solid ${C.accent}`,borderRadius:"8px",textDecoration:"none"}}>📞 {t.btnCall}</a></div><div style={{display:"flex",gap:"24px",marginTop:"32px",flexWrap:"wrap"}}>{t.stats.map((s,i) => <div key={i} style={{textAlign:"center"}}><div style={{fontFamily:f.h,fontSize:"28px",fontWeight:800,color:C.accent}}>{s.value}</div><div style={{fontFamily:f.b,fontSize:"12px",color:C.muted,maxWidth:"100px"}}>{s.label}</div></div>)}</div></div>
</section>

      <section style={{background:C.navy,padding:"80px 24px"}}><div style={{maxWidth:"1200px",margin:"0 auto",textAlign:"center"}}><Tag>{t.problemTag}</Tag><h2 style={{...secTitle,color:C.white}}>{t.problemTitle}</h2><GoldBar /><div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(250px,1fr))",gap:"24px",marginTop:"48px",textAlign:"left"}}>{t.problems.map((p,i) => <div key={i} style={{background:C.navyFade,border:`1px solid ${C.navyLight}`,borderRadius:"12px",padding:"28px",borderLeft:`4px solid ${C.accent}`}}><div style={{fontSize:"28px",marginBottom:"12px"}}>{p.icon}</div><h3 style={{fontFamily:f.h,fontSize:"17px",fontWeight:700,color:C.white,marginBottom:"8px"}}>{p.title}</h3><p style={{fontFamily:f.b,fontSize:"15px",color:C.muted,lineHeight:1.55}}>{p.desc}</p></div>)}</div></div></section>

      <section style={{background:C.bg,padding:"80px 24px"}}><div style={sec}><div style={{textAlign:"center"}}><Tag>{t.solutionTag}</Tag><h2 style={{...secTitle,color:C.white}}>{t.solutionTitle}</h2><GoldBar /></div><div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(340px,1fr))",gap:"20px",marginTop:"48px"}}>{t.solutions.map((s,i) => <div key={i} style={{background:C.navyFade,border:`1px solid ${C.navyLight}`,borderRadius:"12px",padding:"28px",transition:"border-color 0.3s"}} onMouseOver={e=>e.currentTarget.style.borderColor=C.accent} onMouseOut={e=>e.currentTarget.style.borderColor=C.navyLight}><div style={{fontFamily:f.h,fontSize:"11px",fontWeight:700,color:C.accent,letterSpacing:"2px",marginBottom:"8px"}}>0{i+1}</div><h3 style={{fontFamily:f.h,fontSize:"17px",fontWeight:700,color:C.white,marginBottom:"10px"}}>{s.title}</h3><p style={{fontFamily:f.b,fontSize:"15px",color:C.muted,lineHeight:1.6}}>{s.desc}</p></div>)}</div></div></section>

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

      <section style={{background:C.navy,padding:"80px 24px"}}><div style={sec}><div style={{textAlign:"center"}}><Tag>{t.goldTag}</Tag><h2 style={{...secTitle,color:C.white}}>{t.goldTitle}</h2><GoldBar /><p style={{fontFamily:f.b,fontSize:"17px",color:C.offWhite,fontStyle:"italic",maxWidth:"500px",margin:"0 auto 48px"}}>{t.goldMotto}</p></div><div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(250px,1fr))",gap:"24px"}}>{t.goldSteps.map((step,i) => <div key={i} style={{background:C.navyFade,border:`1px solid ${C.navyLight}`,borderRadius:"12px",padding:"28px",position:"relative"}}><div style={{fontFamily:f.h,fontSize:"36px",fontWeight:800,color:"rgba(204,107,73,0.08)",position:"absolute",top:"16px",right:"20px"}}>{step.num}</div><div style={{fontFamily:f.h,fontSize:"11px",fontWeight:700,color:C.accent,letterSpacing:"3px",marginBottom:"8px"}}>{t.stepLabel} {step.num}</div><h3 style={{fontFamily:f.h,fontSize:"22px",fontWeight:700,color:C.white,marginBottom:"12px"}}>{step.title}</h3><p style={{fontFamily:f.b,fontSize:"15px",color:C.muted,lineHeight:1.6}}>{step.desc}</p></div>)}</div></div></section>

      <section style={{background:C.bg,padding:"80px 24px"}}><div style={sec}><div style={{textAlign:"center"}}><Tag>{t.reviewTag}</Tag><h2 style={{...secTitle,color:C.white}}>{t.reviewTitle}</h2><GoldBar /></div><div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(300px,1fr))",gap:"20px",marginTop:"48px"}}>{t.reviews.map((rev,i) => <div key={i} style={{background:C.navyFade,border:`1px solid ${C.navyLight}`,borderRadius:"12px",padding:"28px"}}><Stars /><p style={{fontFamily:f.b,fontSize:"15px",color:C.offWhite,lineHeight:1.65,margin:"16px 0",fontStyle:"italic"}}>"{rev.text}"</p><div style={{borderTop:`1px solid ${C.navyLight}`,paddingTop:"12px",display:"flex",justifyContent:"space-between",alignItems:"center"}}><span style={{fontFamily:f.h,fontSize:"14px",fontWeight:600,color:C.white}}>{rev.name}</span><span style={{fontFamily:f.b,fontSize:"12px",color:C.muted}}>{rev.context}</span></div></div>)}</div></div></section>

      <section style={{background:C.navy,padding:"80px 24px"}}><div style={{maxWidth:"800px",margin:"0 auto",textAlign:"center"}}><Tag>{t.faqTag}</Tag><h2 style={{...secTitle,color:C.white}}>{t.faqTitle}</h2><GoldBar /><div style={{marginTop:"40px",textAlign:"left"}}>{t.faqs.map((faq,i) => <div key={i} style={{borderBottom:`1px solid ${C.navyLight}`}}><button onClick={()=>setOpenFaq(openFaq===i?null:i)} style={{width:"100%",padding:"20px 0",background:"none",border:"none",cursor:"pointer",display:"flex",justifyContent:"space-between",alignItems:"center",gap:"16px"}}><span style={{fontFamily:f.h,fontSize:"15px",fontWeight:600,color:openFaq===i?C.accent:C.white,textAlign:"left",transition:"color 0.2s"}}>{faq.q}</span><span style={{fontFamily:f.h,fontSize:"20px",color:C.accent,transform:openFaq===i?"rotate(45deg)":"none",transition:"transform 0.3s",flexShrink:0}}>+</span></button>{openFaq===i&&<div style={{padding:"0 0 20px",fontFamily:f.b,fontSize:"15px",color:C.muted,lineHeight:1.65}}>{faq.a}</div>}</div>)}</div></div></section>

      <section id="quote-form" style={{background:`linear-gradient(165deg,${C.navyMid},${C.navy})`,padding:"80px 24px"}}><div style={{maxWidth:"600px",margin:"0 auto",textAlign:"center"}}><h2 style={{fontFamily:f.h,fontSize:"clamp(28px,5vw,40px)",fontWeight:800,color:C.white,marginBottom:"12px"}}>{t.ctaTitle}</h2><p style={{fontFamily:f.b,fontSize:"17px",color:C.offWhite,marginBottom:"40px"}}>{t.ctaSub}</p>
        {submitted ? <div style={{background:C.successDim,border:`1px solid ${C.success}`,borderRadius:"12px",padding:"32px"}}><div style={{fontSize:"48px",marginBottom:"12px"}}>✓</div><h3 style={{fontFamily:f.h,fontSize:"20px",fontWeight:700,color:"#4ADE80"}}>{t.formSuccess}</h3></div> : <div style={{background:C.white,borderRadius:"16px",padding:"32px",boxShadow:"0 24px 80px rgba(0,0,0,0.4)",textAlign:"left"}}><h3 style={{fontFamily:f.h,fontSize:"18px",fontWeight:700,color:C.navy,textAlign:"center",marginBottom:"4px"}}>{t.formTitle}</h3><div style={{width:"40px",height:"3px",background:C.accent,borderRadius:"2px",margin:"10px auto 20px"}} /><input style={inputStyle} placeholder={t.formName} value={formData.name} onChange={e=>setFormData({...formData,name:e.target.value})} /><input style={inputStyle} placeholder={t.formPhone} type="tel" value={formData.phone} onChange={e=>setFormData({...formData,phone:e.target.value})} /><input style={inputStyle} placeholder={t.formEmail} type="email" value={formData.email} onChange={e=>setFormData({...formData,email:e.target.value})} /><input style={inputStyle} placeholder={t.formZip} value={formData.zip} onChange={e=>setFormData({...formData,zip:e.target.value})} maxLength={5} /><button onClick={()=>setSubmitted(true)} style={{width:"100%",padding:"16px",fontFamily:f.h,fontSize:"14px",fontWeight:700,letterSpacing:"1.5px",color:C.white,background:`linear-gradient(135deg,${C.accent},${C.accentLight})`,border:"none",borderRadius:"8px",cursor:"pointer"}}>{t.formBtn}</button><p style={{fontFamily:f.b,fontSize:"12px",color:"#9CA3AF",textAlign:"center",marginTop:"12px"}}>{t.formDisclaimer}</p></div>}
        <div style={{marginTop:"32px"}}><a href="tel:8444443114" style={{fontFamily:f.h,fontSize:"18px",fontWeight:700,color:"#C8952E",textDecoration:"none"}}>📞 (844) 444-3114</a></div></div></section>

      <SiteFooter />
      <MobileCTA />
      <style>{`*{box-sizing:border-box;margin:0;padding:0}::placeholder{color:#9CA3AF}input:focus{border-color:${C.accent}!important}`}</style>
    </div>
  );
}
