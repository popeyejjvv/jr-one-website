"use client";

import { useState, useEffect } from "react";
import { useLanguage } from "../../lib/LanguageContext";
import SiteNav from "../../components/SiteNav";
import SiteFooter from "../../components/SiteFooter";
import MobileCTA from "../../components/MobileCTA";

const injectFonts = () => { if (typeof document==="undefined"||document.querySelector("#jr-fonts")) return; const l=document.createElement("link"); l.id="jr-fonts"; l.rel="stylesheet"; l.href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800&family=Source+Sans+3:wght@300;400;600&display=swap"; document.head.appendChild(l); };
const C = { bg:"#0B1628",navy:"#1B2A4A",navyMid:"#243556",navyLight:"#2C3E5A",navyFade:"#162033",gold:"#C8952E",goldLight:"#D4A843",goldPale:"rgba(200,149,46,0.12)",cream:"#F5F3EF",white:"#FFFFFF",offWhite:"#E8E4DC",muted:"#7A8FA8",charcoal:"#2D2D2D",accent:"#722F37",accentLight:"#8B3A44",accentPale:"rgba(114,47,55,0.12)" };
const f = { h:"'Montserrat', sans-serif", b:"'Source Sans 3', sans-serif" };
const Tag = ({children}) => <div style={{display:"inline-block",padding:"6px 16px",background:C.accentPale,borderRadius:"4px",marginBottom:"12px"}}><span style={{fontFamily:f.h,fontSize:"12px",fontWeight:700,color:C.accent,letterSpacing:"3px"}}>{children}</span></div>;
const GoldBar = () => <div style={{width:"60px",height:"3px",background:`linear-gradient(90deg,${C.accent},${C.accentLight})`,borderRadius:"2px",margin:"16px auto"}} />;
const Stars = () => <span style={{color:C.gold,fontSize:"14px",letterSpacing:"2px"}}>★★★★★</span>;
const inputStyle = {width:"100%",padding:"13px 16px",fontFamily:f.b,fontSize:"15px",border:"1.5px solid #D1D5DB",borderRadius:"8px",outline:"none",color:C.charcoal,marginBottom:"12px",background:"#FAFAFA",boxSizing:"border-box"};

const T = {
  en: {
    breadcrumb: ["Home","Services","SAGIPER"],
    promoBanner: "SAGIPER Architectural Cladding — Engineered in Portugal, Made in Plant City, FL — Call (844) 444-3114",
    heroTag: "PREMIUM ARCHITECTURAL CLADDING",
    heroH1: "The Future of",
    heroH1Gold: "Exterior Design.",
    heroP: "SAGIPER architectural cladding systems — engineered in Portugal, manufactured in Plant City, FL. Solar Shield Technology, 50-year warranty, zero maintenance. The premium choice for discerning homeowners and architects.",
    heroCta: "GET YOUR FREE CONSULTATION",
    heroCall: "CALL (844) 444-3114",
    stats: [
      { value:"50 YR", label:"Warranty" },
      { value:"35 FT", label:"Max custom length" },
      { value:"30+", label:"Color finishes" },
      { value:"5-LAYER", label:"Solar Shield Technology" },
    ],
    systemTag: "THE SAGIPER SYSTEM",
    systemTitle: "FOUR PRODUCTS. ONE COHESIVE EXTERIOR.",
    products: [
      { name:"SAGIWALL", subtitle:"Premium Exterior Siding & Cladding", desc:"Tongue-and-groove PVC with 5-layer Solar Shield Technology film. Channeled and V-groove profiles. 6\" width, lengths up to 35 ft (minimal seams). 30+ woodgrain, metallic, and RAL color finishes. ICC-ES ESR-4876 evaluated. NFPA 285 fire tested. ASTM E330 wind load tested. 50-year warranty, 15 years non-prorated.", icon:"🏠" },
      { name:"SAGIREV", subtitle:"Soffit & Ceiling System", desc:"Interior and exterior. 4\" V-groove, 6\" V-groove, and 8\" flat profiles. Same Solar Shield Technology. Perfect for soffits, covered decks, lanais, and interior ceilings. M1 fire-rated (non-flammable). 50-year warranty.", icon:"🏗️" },
      { name:"SAGIBOND", subtitle:"Aluminum Composite Material (ACM) Panels", desc:"Three constructions: FireGuard (fire-rated), HexaCore (honeycomb, superior rigidity), SlimShield (solid 3mm aluminum). Modern commercial facades with woodgrain warmth. 4ft x 16ft sheets. 50-year warranty.", icon:"🔩" },
      { name:"SAGIBATTEN", subtitle:"Aluminum Batten System", desc:"2mm wall thickness. 7 size options from 1\"x2\" to 2\"x8\". 24+ woodgrain finishes including Nordic series. For contemporary facades, pergolas, accent walls, baffle ceilings. 50-year warranty.", icon:"📐" },
    ],
    problemTag: "THE PROBLEM",
    problemTitle: "WHY STANDARD SIDING FAILS IN FLORIDA",
    problems: [
      { icon:"☀️", title:"Traditional siding fades and warps in Florida sun", desc:"Standard vinyl and wood siding can't handle relentless UV exposure. Colors fade, materials warp, and you're left with a home that looks tired after just a few years." },
      { icon:"🎨", title:"Paint and stain maintenance never ends", desc:"Wood siding demands repainting or restaining every 3–5 years. That's thousands of dollars and days of disruption — on repeat, forever." },
      { icon:"🚫", title:"Standard vinyl limits dark color choices", desc:"Want charcoal, walnut, or black? Standard vinyl absorbs heat and warps. Homeowners are stuck with light colors or accept inevitable damage." },
      { icon:"🏘️", title:"Generic siding looks like every other house on the block", desc:"Lumber-yard vinyl comes in limited profiles and colors. Your home deserves architect-grade materials, not builder-basic aesthetics." },
    ],
    whyTag: "WHY SAGIPER",
    whyTitle: "ENGINEERED FOR FLORIDA. DESIGNED FOR ARCHITECTS.",
    whySub: "Premium architectural cladding with Solar Shield Technology — the only siding system built to handle dark colors in direct Florida sun.",
    whySagiper: [
      { title:"Solar Shield Technology", desc:"5-layer heat-reflective film. Dark colors stay stable in Florida sun. No warping, no fading." },
      { title:"Custom Lengths Up to 35 Feet", desc:"Fewer seams = cleaner look + less water infiltration." },
      { title:"Architect-Grade", desc:"BIM/Revit files, CSI specs, AIA-accredited courses. Specified by architects, not just sold at lumber yards." },
      { title:"Code-Compliant", desc:"ICC-ES ESR-4876, NFPA 285, ASTM E330 tested. Serious certifications for Florida coastal construction." },
      { title:"Zero Maintenance Forever", desc:"No painting, staining, or sealing. Ever. 50-year warranty with 15 years non-prorated." },
      { title:"Made in Florida", desc:"Plant City, FL manufacturing. Local production, shorter lead times, Florida-market focus." },
    ],
    peakAlertLabel: "FLORIDA INSURANCE ALERT",
    peakAlertTitle: "280% Increase in Non-Renewals — Roof Over 15 Years Old?",
    peakAlertDesc: "restores shingles from the inside out — adds 6–10 years at a fraction of replacement cost, with warranty docs your insurer must accept under FL law.",
    peakBtn: "PEAK 301 INFO →",
    peakRightsBtn: "YOUR RIGHTS →",
    goldTag: "THE GOLD STANDARD",
    goldTitle: "OUR SAGIPER INSTALLATION PROCESS",
    goldSub: "Every home. Every time. No exceptions.",
    goldSteps: [
      { num:"01", title:"ASSESS", desc:"We evaluate your home's exterior, discuss your design vision, and determine which SAGIPER products and finishes are the right fit for your project." },
      { num:"02", title:"DESIGN", desc:"We create a detailed plan using SAGIPER's full product line — matching SagiWall, SagiRev, SagiBond, and SagiBatten across your exterior for a cohesive architectural look." },
      { num:"03", title:"INSTALL", desc:"Our trained crew installs your SAGIPER system with precision. Tongue-and-groove connections, custom lengths, and clean transitions between product lines." },
      { num:"04", title:"PROTECT", desc:"Your home is covered by SAGIPER's 50-year warranty with 15 years non-prorated. Zero maintenance required — no painting, staining, or sealing. Ever." },
    ],
    stepLabel: "STEP",
    reviewsTag: "REVIEWS",
    reviewsTitle: "WHAT OUR CLIENTS SAY",
    reviews: [
      { text:"JR One aluminum is nothing short of awesome. From Stefan as my sales person to Christian and the crew — they ALL deserve a big thank you.", author:"JR One Customer", type:"Exterior Renovation" },
      { text:"Great crew, all very nice and courteous gentlemen. Work was done exactly to the quote and mock-up images. Not one detail missed.", author:"Jaclyn G.", type:"Full Exterior Work" },
    ],
    faqTag: "FAQ",
    faqTitle: "SAGIPER QUESTIONS",
    faqs: [
      { q:"What is SAGIPER?", a:"SAGIPER is a Portuguese manufacturer (established 1994) of premium architectural PVC and aluminum cladding systems. Their North American headquarters includes manufacturing in Plant City, FL — making them a local Florida producer with European engineering standards." },
      { q:"How is SAGIPER different from regular vinyl siding?", a:"Solar Shield Technology prevents heat absorption — meaning dark colors won't warp like standard vinyl. Custom lengths up to 35 feet minimize seams. Architect-grade specs (BIM/Revit files, CSI specs) put it in a different category entirely. 50-year warranty vs. standard prorated warranties." },
      { q:"Can I use dark colors on my Florida home?", a:"Yes. That's SAGIPER's key advantage. The 5-layer Solar Shield film reflects heat before it enters the panel. Dark woodgrain finishes that would warp in standard vinyl stay stable — even in direct Florida sun." },
      { q:"Is SAGIPER hurricane-rated?", a:"ASTM E330 wind load tested and ICC-ES evaluated. Contact us for specific wind rating details for your location." },
      { q:"How much does SAGIPER cost vs. regular siding?", a:"SAGIPER is a premium product — higher upfront cost than standard vinyl. But the 50-year warranty, zero maintenance, and architect-grade aesthetics make it the best long-term value." },
      { q:"Do you install all SAGIPER products?", a:"Yes. We install SagiWall, SagiRev, SagiBond, and SagiBatten. Full exterior system with matching finishes across all products." },
    ],
    ctaTitle: "READY FOR PREMIUM THAT LASTS A LIFETIME?",
    ctaSub: "Get your free SAGIPER consultation. We'll assess your home, show you finishes, and provide a transparent estimate.",
    formTitle: "Get Your Free SAGIPER Consultation",
    formName: "Full Name",
    formPhone: "Phone Number",
    formEmail: "Email Address",
    formZip: "ZIP Code",
    formBtn: "REQUEST MY FREE CONSULTATION",
    formDisclaimer: "No spam. No pressure. Honest consultation on whether SAGIPER is right for your home.",
    successTitle: "Consultation Request Received!",
    successMsg: "We'll get back to you within hours to schedule your SAGIPER consultation.",
  },
  es: {
    breadcrumb: ["Inicio","Servicios","SAGIPER"],
    promoBanner: "Revestimiento Arquitectonico SAGIPER — Ingenieria Portuguesa, Fabricado en Plant City, FL — Llame al (844) 444-3114",
    heroTag: "REVESTIMIENTO ARQUITECTONICO PREMIUM",
    heroH1: "El Futuro del",
    heroH1Gold: "Diseno Exterior.",
    heroP: "Sistemas de revestimiento arquitectonico SAGIPER — ingenieria portuguesa, fabricados en Plant City, FL. Tecnologia Solar Shield, garantia de 50 anos, cero mantenimiento. La opcion premium para propietarios y arquitectos exigentes.",
    heroCta: "OBTENGA SU CONSULTA GRATUITA",
    heroCall: "LLAME AL (844) 444-3114",
    stats: [
      { value:"50 ANOS", label:"Garantia" },
      { value:"35 FT", label:"Longitud maxima personalizada" },
      { value:"30+", label:"Acabados de color" },
      { value:"5 CAPAS", label:"Tecnologia Solar Shield" },
    ],
    systemTag: "EL SISTEMA SAGIPER",
    systemTitle: "CUATRO PRODUCTOS. UN EXTERIOR COHESIVO.",
    products: [
      { name:"SAGIWALL", subtitle:"Revestimiento Exterior Premium", desc:"PVC machihembrado con pelicula Solar Shield Technology de 5 capas. Perfiles acanalados y V-groove. Ancho de 6\", longitudes hasta 35 ft (minimas uniones). 30+ acabados de madera, metalicos y colores RAL. Evaluado ICC-ES ESR-4876. Probado NFPA 285 contra incendios. Probado ASTM E330 carga de viento. Garantia de 50 anos, 15 anos sin prorrateo.", icon:"🏠" },
      { name:"SAGIREV", subtitle:"Sistema de Sofito y Techo", desc:"Interior y exterior. Perfiles V-groove de 4\", V-groove de 6\" y plano de 8\". Misma Tecnologia Solar Shield. Perfecto para sofitos, terrazas cubiertas, lanais y techos interiores. Clasificacion M1 contra incendios (no inflamable). Garantia de 50 anos.", icon:"🏗️" },
      { name:"SAGIBOND", subtitle:"Paneles de Material Compuesto de Aluminio (ACM)", desc:"Tres construcciones: FireGuard (clasificado contra incendios), HexaCore (panal, rigidez superior), SlimShield (aluminio solido de 3mm). Fachadas comerciales modernas con calidez de madera. Laminas de 4ft x 16ft. Garantia de 50 anos.", icon:"🔩" },
      { name:"SAGIBATTEN", subtitle:"Sistema de Listones de Aluminio", desc:"Espesor de pared de 2mm. 7 opciones de tamano desde 1\"x2\" hasta 2\"x8\". 24+ acabados de madera incluyendo serie Nordic. Para fachadas contemporaneas, pergolas, paredes de acento, techos de deflectores. Garantia de 50 anos.", icon:"📐" },
    ],
    problemTag: "EL PROBLEMA",
    problemTitle: "POR QUE EL REVESTIMIENTO ESTANDAR FALLA EN FLORIDA",
    problems: [
      { icon:"☀️", title:"El revestimiento tradicional se desvanece y deforma con el sol de Florida", desc:"El vinilo y la madera estandar no pueden con la exposicion UV constante. Los colores se desvanecen, los materiales se deforman, y su casa se ve deteriorada en solo unos anos." },
      { icon:"🎨", title:"El mantenimiento de pintura y tinte nunca termina", desc:"El revestimiento de madera exige repintado o retintado cada 3–5 anos. Son miles de dolares y dias de interrupcion — repetidamente, para siempre." },
      { icon:"🚫", title:"El vinilo estandar limita las opciones de colores oscuros", desc:"Quiere carbon, nogal o negro? El vinilo estandar absorbe calor y se deforma. Los propietarios se limitan a colores claros o aceptan el dano inevitable." },
      { icon:"🏘️", title:"El revestimiento generico se ve igual que todas las casas del vecindario", desc:"El vinilo de ferreteria viene en perfiles y colores limitados. Su casa merece materiales de grado arquitectonico, no estetica basica de constructor." },
    ],
    whyTag: "POR QUE SAGIPER",
    whyTitle: "INGENIERIA PARA FLORIDA. DISENADO PARA ARQUITECTOS.",
    whySub: "Revestimiento arquitectonico premium con Tecnologia Solar Shield — el unico sistema de revestimiento disenado para manejar colores oscuros bajo el sol directo de Florida.",
    whySagiper: [
      { title:"Tecnologia Solar Shield", desc:"Pelicula reflectante de calor de 5 capas. Los colores oscuros se mantienen estables bajo el sol de Florida. Sin deformacion, sin desvanecimiento." },
      { title:"Longitudes Personalizadas Hasta 35 Pies", desc:"Menos uniones = aspecto mas limpio + menos infiltracion de agua." },
      { title:"Grado Arquitectonico", desc:"Archivos BIM/Revit, especificaciones CSI, cursos acreditados AIA. Especificado por arquitectos, no solo vendido en ferreterias." },
      { title:"Cumple con Codigos", desc:"ICC-ES ESR-4876, NFPA 285, ASTM E330 probado. Certificaciones serias para construccion costera en Florida." },
      { title:"Cero Mantenimiento Para Siempre", desc:"Sin pintura, sin tinte, sin sellado. Nunca. Garantia de 50 anos con 15 anos sin prorrateo." },
      { title:"Hecho en Florida", desc:"Manufactura en Plant City, FL. Produccion local, tiempos de entrega mas cortos, enfoque en el mercado de Florida." },
    ],
    peakAlertLabel: "ALERTA DE SEGUROS DE FLORIDA",
    peakAlertTitle: "280% de Aumento en No Renovaciones — Techo de Mas de 15 Anos?",
    peakAlertDesc: "restaura las tejas desde adentro — agrega 6–10 anos a una fraccion del costo de reemplazo, con documentos de garantia que su aseguradora debe aceptar bajo la ley de FL.",
    peakBtn: "INFO PEAK 301 →",
    peakRightsBtn: "SUS DERECHOS →",
    goldTag: "EL ESTANDAR DE ORO",
    goldTitle: "NUESTRO PROCESO DE INSTALACION SAGIPER",
    goldSub: "Cada casa. Cada vez. Sin excepciones.",
    goldSteps: [
      { num:"01", title:"EVALUAR", desc:"Evaluamos el exterior de su casa, discutimos su vision de diseno y determinamos que productos y acabados SAGIPER son los adecuados para su proyecto." },
      { num:"02", title:"DISENAR", desc:"Creamos un plan detallado usando toda la linea de productos SAGIPER — combinando SagiWall, SagiRev, SagiBond y SagiBatten en todo su exterior para un aspecto arquitectonico cohesivo." },
      { num:"03", title:"INSTALAR", desc:"Nuestro equipo capacitado instala su sistema SAGIPER con precision. Conexiones machihembradas, longitudes personalizadas y transiciones limpias entre lineas de producto." },
      { num:"04", title:"PROTEGER", desc:"Su casa esta cubierta por la garantia de 50 anos de SAGIPER con 15 anos sin prorrateo. Cero mantenimiento requerido — sin pintura, sin tinte, sin sellado. Nunca." },
    ],
    stepLabel: "PASO",
    reviewsTag: "RESENAS",
    reviewsTitle: "LO QUE DICEN NUESTROS CLIENTES",
    reviews: [
      { text:"JR One aluminum es simplemente increible. Desde Stefan como mi vendedor hasta Christian y el equipo — TODOS merecen un gran agradecimiento.", author:"Cliente de JR One", type:"Renovacion Exterior" },
      { text:"Gran equipo, todos muy amables y corteses. El trabajo se hizo exactamente segun el presupuesto y las imagenes de muestra. Ni un detalle se paso por alto.", author:"Jaclyn G.", type:"Trabajo Exterior Completo" },
    ],
    faqTag: "PREGUNTAS FRECUENTES",
    faqTitle: "PREGUNTAS SOBRE SAGIPER",
    faqs: [
      { q:"Que es SAGIPER?", a:"SAGIPER es un fabricante portugues (establecido en 1994) de sistemas premium de revestimiento arquitectonico en PVC y aluminio. Su sede norteamericana incluye manufactura en Plant City, FL — lo que los convierte en un productor local de Florida con estandares de ingenieria europea." },
      { q:"En que se diferencia SAGIPER del revestimiento de vinilo comun?", a:"La Tecnologia Solar Shield previene la absorcion de calor — lo que significa que los colores oscuros no se deformaran como el vinilo estandar. Longitudes personalizadas hasta 35 pies minimizan las uniones. Especificaciones de grado arquitectonico (archivos BIM/Revit, especificaciones CSI) lo ponen en una categoria completamente diferente. Garantia de 50 anos vs. garantias estandar prorrateadas." },
      { q:"Puedo usar colores oscuros en mi casa de Florida?", a:"Si. Esa es la ventaja clave de SAGIPER. La pelicula Solar Shield de 5 capas refleja el calor antes de que entre al panel. Los acabados oscuros de madera que se deformarian en vinilo estandar se mantienen estables — incluso bajo el sol directo de Florida." },
      { q:"SAGIPER tiene clasificacion para huracanes?", a:"Probado con carga de viento ASTM E330 y evaluado por ICC-ES. Contactenos para detalles especificos de clasificacion de viento para su ubicacion." },
      { q:"Cuanto cuesta SAGIPER vs. el revestimiento regular?", a:"SAGIPER es un producto premium — mayor costo inicial que el vinilo estandar. Pero la garantia de 50 anos, cero mantenimiento y la estetica de grado arquitectonico lo convierten en el mejor valor a largo plazo." },
      { q:"Instalan todos los productos SAGIPER?", a:"Si. Instalamos SagiWall, SagiRev, SagiBond y SagiBatten. Sistema exterior completo con acabados combinados en todos los productos." },
    ],
    ctaTitle: "LISTO PARA UN PREMIUM QUE DURA TODA LA VIDA?",
    ctaSub: "Obtenga su consulta gratuita de SAGIPER. Evaluaremos su casa, le mostraremos acabados y proporcionaremos un presupuesto transparente.",
    formTitle: "Obtenga Su Consulta Gratuita de SAGIPER",
    formName: "Nombre Completo",
    formPhone: "Numero de Telefono",
    formEmail: "Correo Electronico",
    formZip: "Codigo Postal",
    formBtn: "SOLICITAR MI CONSULTA GRATUITA",
    formDisclaimer: "Sin spam. Sin presion. Consulta honesta sobre si SAGIPER es adecuado para su casa.",
    successTitle: "Solicitud de Consulta Recibida!",
    successMsg: "Nos pondremos en contacto en horas para programar su consulta SAGIPER.",
  },
};

export default function SagiperPage() {
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
      <SiteNav promoBanner={t.promoBanner} />
      <div style={{padding:"16px 24px 0",maxWidth:"1200px",margin:"0 auto"}}><div style={{fontFamily:f.b,fontSize:"13px",color:C.muted}}>{t.breadcrumb.map((item,i) => <span key={i}>{i>0&&<span style={{margin:"0 8px",opacity:0.5}}>/</span>}<span style={{color:i===t.breadcrumb.length-1?C.accent:C.muted}}>{item}</span></span>)}</div></div>

      {/* HERO */}
      <section className="hero-stars" style={{padding:"60px 24px 80px",maxWidth:"1200px",margin:"0 auto",display:"flex",gap:"48px",alignItems:"center",flexWrap:"wrap"}}>
        <div style={{flex:"1 1 500px",minWidth:"300px"}}>
          <Tag>{t.heroTag}</Tag>
          <h1 style={{fontFamily:f.h,fontSize:"clamp(32px,5vw,48px)",fontWeight:800,lineHeight:1.1,marginBottom:"20px"}}>{t.heroH1}<br/><span style={{color:C.accent}}>{t.heroH1Gold}</span></h1>
          <p style={{fontFamily:f.b,fontSize:"18px",color:C.offWhite,lineHeight:1.7,marginBottom:"32px",maxWidth:"560px"}}>{t.heroP}</p>
          <div style={{display:"flex",gap:"16px",flexWrap:"wrap"}}>
            <button onClick={()=>document.getElementById("quote-form")?.scrollIntoView({behavior:"smooth"})} style={{padding:"16px 36px",fontFamily:f.h,fontSize:"14px",fontWeight:700,letterSpacing:"1.5px",color:C.white,background:`linear-gradient(135deg,${C.accent},${C.accentLight})`,border:"none",borderRadius:"8px",cursor:"pointer",boxShadow:"0 4px 16px rgba(114,47,55,0.3)"}}>{t.heroCta}</button>
            <a href="tel:8444443114" style={{display:"inline-flex",alignItems:"center",padding:"16px 36px",fontFamily:f.h,fontSize:"14px",fontWeight:700,letterSpacing:"1.5px",color:C.accent,border:`2px solid ${C.accent}`,borderRadius:"8px",textDecoration:"none"}}>📞 {t.heroCall}</a>
          </div>
          <div style={{display:"flex",gap:"24px",marginTop:"32px",flexWrap:"wrap"}}>{t.stats.map((s,i) => <div key={i} style={{textAlign:"center"}}><div style={{fontFamily:f.h,fontSize:"28px",fontWeight:800,color:C.accent}}>{s.value}</div><div style={{fontFamily:f.b,fontSize:"12px",color:C.muted,maxWidth:"120px"}}>{s.label}</div></div>)}</div>
        </div>
      </section>

      {/* THE SAGIPER SYSTEM */}
      <section style={{background:`linear-gradient(135deg, #1a1a1a, ${C.navy})`,padding:"60px 24px",borderTop:`2px solid ${C.accent}`,borderBottom:`2px solid ${C.accent}`}}>
        <div style={{maxWidth:"1100px",margin:"0 auto",textAlign:"center"}}>
          <Tag>{t.systemTag}</Tag>
          <h2 style={{...secTitle,color:C.white}}>{t.systemTitle}</h2>
          <GoldBar />
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(260px,1fr))",gap:"24px",marginTop:"48px",textAlign:"left"}}>
            {t.products.map((p,i) => (
              <div key={i} style={{background:"rgba(11,22,40,0.8)",border:`1px solid ${C.navyLight}`,borderRadius:"12px",padding:"28px",borderTop:`3px solid ${C.accent}`,transition:"border-color 0.3s"}} onMouseOver={e=>e.currentTarget.style.borderTopColor=C.accentLight} onMouseOut={e=>e.currentTarget.style.borderTopColor=C.accent}>
                <div style={{fontSize:"32px",marginBottom:"12px"}}>{p.icon}</div>
                <h3 style={{fontFamily:f.h,fontSize:"20px",fontWeight:800,color:C.white,marginBottom:"4px"}}>{p.name}</h3>
                <div style={{fontFamily:f.h,fontSize:"12px",fontWeight:600,color:C.accent,letterSpacing:"1px",marginBottom:"12px"}}>{p.subtitle}</div>
                <p style={{fontFamily:f.b,fontSize:"14px",color:C.muted,lineHeight:1.6}}>{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROBLEM */}
      <section style={{background:C.navy,padding:"80px 24px"}}><div style={{maxWidth:"1200px",margin:"0 auto",textAlign:"center"}}><Tag>{t.problemTag}</Tag><h2 style={{...secTitle,color:C.white}}>{t.problemTitle}</h2><GoldBar /><div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(250px,1fr))",gap:"24px",marginTop:"48px",textAlign:"left"}}>{t.problems.map((p,i) => <div key={i} style={{background:C.navyFade,borderRadius:"12px",padding:"28px",borderLeft:`4px solid ${C.accent}`,border:`1px solid ${C.navyLight}`}}><div style={{fontSize:"28px",marginBottom:"12px"}}>{p.icon}</div><h3 style={{fontFamily:f.h,fontSize:"17px",fontWeight:700,color:C.white,marginBottom:"8px"}}>{p.title}</h3><p style={{fontFamily:f.b,fontSize:"15px",color:C.muted,lineHeight:1.55}}>{p.desc}</p></div>)}</div></div></section>

      {/* WHY SAGIPER */}
      <section style={{background:C.bg,padding:"80px 24px"}}><div style={sec}><div style={{textAlign:"center"}}><Tag>{t.whyTag}</Tag><h2 style={{...secTitle,color:C.white}}>{t.whyTitle}</h2><GoldBar /><p style={{fontFamily:f.b,fontSize:"17px",color:C.muted,maxWidth:"650px",margin:"0 auto 48px"}}>{t.whySub}</p></div><div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(340px,1fr))",gap:"20px"}}>{t.whySagiper.map((s,i) => <div key={i} style={{background:C.navyFade,border:`1px solid ${C.navyLight}`,borderRadius:"12px",padding:"28px",transition:"border-color 0.3s"}} onMouseOver={e=>e.currentTarget.style.borderColor=C.accent} onMouseOut={e=>e.currentTarget.style.borderColor=C.navyLight}><div style={{fontFamily:f.h,fontSize:"11px",fontWeight:700,color:C.accent,letterSpacing:"2px",marginBottom:"8px"}}>0{i+1}</div><h3 style={{fontFamily:f.h,fontSize:"17px",fontWeight:700,color:C.white,marginBottom:"10px"}}>{s.title}</h3><p style={{fontFamily:f.b,fontSize:"15px",color:C.muted,lineHeight:1.6}}>{s.desc}</p></div>)}</div></div></section>

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
      <section style={{background:C.navy,padding:"80px 24px"}}><div style={sec}><div style={{textAlign:"center"}}><Tag>{t.goldTag}</Tag><h2 style={{...secTitle,color:C.white}}>{t.goldTitle}</h2><GoldBar /><p style={{fontFamily:f.b,fontSize:"17px",color:C.offWhite,fontStyle:"italic",maxWidth:"500px",margin:"0 auto 48px"}}>{t.goldSub}</p></div><div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(250px,1fr))",gap:"24px"}}>{t.goldSteps.map((step,i) => <div key={i} style={{background:C.navyFade,border:`1px solid ${C.navyLight}`,borderRadius:"12px",padding:"28px",position:"relative"}}><div style={{fontFamily:f.h,fontSize:"36px",fontWeight:800,color:"rgba(114,47,55,0.08)",position:"absolute",top:"16px",right:"20px"}}>{step.num}</div><div style={{fontFamily:f.h,fontSize:"11px",fontWeight:700,color:C.accent,letterSpacing:"3px",marginBottom:"8px"}}>{t.stepLabel} {step.num}</div><h3 style={{fontFamily:f.h,fontSize:"22px",fontWeight:700,color:C.white,marginBottom:"12px"}}>{step.title}</h3><p style={{fontFamily:f.b,fontSize:"15px",color:C.muted,lineHeight:1.6}}>{step.desc}</p></div>)}</div></div></section>

      {/* REVIEWS */}
      <section style={{background:C.bg,padding:"80px 24px"}}><div style={{maxWidth:"900px",margin:"0 auto",textAlign:"center"}}><Tag>{t.reviewsTag}</Tag><h2 style={{...secTitle,color:C.white}}>{t.reviewsTitle}</h2><GoldBar /><div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(300px,1fr))",gap:"24px",marginTop:"48px"}}>{t.reviews.map((r,i) => <div key={i} style={{background:C.navyFade,border:`1px solid ${C.navyLight}`,borderRadius:"12px",padding:"28px",textAlign:"left"}}><Stars /><p style={{fontFamily:f.b,fontSize:"16px",color:C.offWhite,lineHeight:1.7,margin:"16px 0 20px",fontStyle:"italic"}}>"{r.text}"</p><div style={{fontFamily:f.h,fontSize:"14px",fontWeight:700,color:C.white}}>{r.author}</div><div style={{fontFamily:f.b,fontSize:"13px",color:C.muted}}>{r.type}</div></div>)}</div></div></section>

      {/* FAQ */}
      <section style={{background:C.navy,padding:"80px 24px"}}><div style={{maxWidth:"800px",margin:"0 auto",textAlign:"center"}}><Tag>{t.faqTag}</Tag><h2 style={{...secTitle,color:C.white}}>{t.faqTitle}</h2><GoldBar /><div style={{marginTop:"40px",textAlign:"left"}}>{t.faqs.map((faq,i) => <div key={i} style={{borderBottom:`1px solid ${C.navyLight}`}}><button onClick={()=>setOpenFaq(openFaq===i?null:i)} style={{width:"100%",padding:"20px 0",background:"none",border:"none",cursor:"pointer",display:"flex",justifyContent:"space-between",alignItems:"center",gap:"16px"}}><span style={{fontFamily:f.h,fontSize:"15px",fontWeight:600,color:openFaq===i?C.accent:C.white,textAlign:"left",transition:"color 0.2s"}}>{faq.q}</span><span style={{fontFamily:f.h,fontSize:"20px",color:C.accent,transform:openFaq===i?"rotate(45deg)":"none",transition:"transform 0.3s",flexShrink:0}}>+</span></button>{openFaq===i&&<div style={{padding:"0 0 20px",fontFamily:f.b,fontSize:"15px",color:C.muted,lineHeight:1.65}}>{faq.a}</div>}</div>)}</div></div></section>

      {/* CTA FORM */}
      <section id="quote-form" style={{background:`linear-gradient(165deg,${C.navyMid},${C.navy})`,padding:"80px 24px"}}><div style={{maxWidth:"600px",margin:"0 auto",textAlign:"center"}}>
        <h2 style={{fontFamily:f.h,fontSize:"clamp(28px,5vw,40px)",fontWeight:800,color:C.white,marginBottom:"12px"}}>{t.ctaTitle}</h2>
        <p style={{fontFamily:f.b,fontSize:"17px",color:C.offWhite,marginBottom:"40px"}}>{t.ctaSub}</p>
        {submitted ? <div style={{background:"rgba(45,139,78,0.15)",border:"1px solid #2D8B4E",borderRadius:"12px",padding:"32px"}}><div style={{fontSize:"48px",marginBottom:"12px"}}>✓</div><h3 style={{fontFamily:f.h,fontSize:"20px",fontWeight:700,color:"#4ADE80"}}>{t.successTitle}</h3><p style={{fontFamily:f.b,fontSize:"15px",color:C.muted,marginTop:"8px"}}>{t.successMsg}</p></div> : <div style={{background:C.white,borderRadius:"16px",padding:"32px",boxShadow:"0 24px 80px rgba(0,0,0,0.4)",textAlign:"left"}}>
          <h3 style={{fontFamily:f.h,fontSize:"18px",fontWeight:700,color:C.navy,textAlign:"center",marginBottom:"4px"}}>{t.formTitle}</h3>
          <div style={{width:"40px",height:"3px",background:C.accent,borderRadius:"2px",margin:"10px auto 20px"}} />
          <input style={inputStyle} placeholder={t.formName} value={formData.name} onChange={e=>setFormData({...formData,name:e.target.value})} />
          <input style={inputStyle} placeholder={t.formPhone} type="tel" value={formData.phone} onChange={e=>setFormData({...formData,phone:e.target.value})} />
          <input style={inputStyle} placeholder={t.formEmail} type="email" value={formData.email} onChange={e=>setFormData({...formData,email:e.target.value})} />
          <input style={inputStyle} placeholder={t.formZip} value={formData.zip} onChange={e=>setFormData({...formData,zip:e.target.value})} maxLength={5} />
          <button onClick={()=>setSubmitted(true)} style={{width:"100%",padding:"16px",fontFamily:f.h,fontSize:"14px",fontWeight:700,letterSpacing:"1.5px",color:C.white,background:`linear-gradient(135deg,${C.accent},${C.accentLight})`,border:"none",borderRadius:"8px",cursor:"pointer",boxShadow:"0 4px 16px rgba(114,47,55,0.3)"}}>{t.formBtn}</button>
          <p style={{fontFamily:f.b,fontSize:"12px",color:"#9CA3AF",textAlign:"center",marginTop:"12px"}}>{t.formDisclaimer}</p>
        </div>}
        <div style={{marginTop:"32px"}}><a href="tel:8444443114" style={{fontFamily:f.h,fontSize:"18px",fontWeight:700,color:C.gold,textDecoration:"none"}}>📞 (844) 444-3114</a></div>
      </div></section>

      <SiteFooter />
      <MobileCTA scrollTarget="quote-form" />
      <style>{`*{box-sizing:border-box;margin:0;padding:0}::placeholder{color:#9CA3AF}input:focus{border-color:${C.accent}!important}`}</style>
    </div>
  );
}
