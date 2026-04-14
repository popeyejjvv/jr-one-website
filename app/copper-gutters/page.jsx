"use client";

import { useState, useEffect } from "react";
import { useLanguage } from "../../lib/LanguageContext";
import SiteNav from "../../components/SiteNav";
import SiteFooter from "../../components/SiteFooter";
import MobileCTA from "../../components/MobileCTA";

const injectFonts = () => { if (typeof document==="undefined"||document.querySelector("#jr-fonts")) return; const l=document.createElement("link"); l.id="jr-fonts"; l.rel="stylesheet"; l.href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800&family=Source+Sans+3:wght@300;400;600&display=swap"; document.head.appendChild(l); };
const C = { bg:"#0B1628",navy:"#1B2A4A",navyMid:"#243556",navyLight:"#2C3E5A",navyFade:"#162033",gold:"#C8952E",goldLight:"#D4A843",goldPale:"rgba(200,149,46,0.12)",cream:"#F5F3EF",white:"#FFFFFF",offWhite:"#E8E4DC",muted:"#7A8FA8",charcoal:"#2D2D2D",copper:"#B87333",copperLight:"#D4956B",copperPale:"rgba(184,115,51,0.12)" };
const f = { h:"'Montserrat', sans-serif", b:"'Source Sans 3', sans-serif" };
const Tag = ({children}) => <div style={{display:"inline-block",padding:"6px 16px",background:C.copperPale,borderRadius:"4px",marginBottom:"12px"}}><span style={{fontFamily:f.h,fontSize:"12px",fontWeight:700,color:C.copper,letterSpacing:"3px"}}>{children}</span></div>;
const GoldBar = () => <div style={{width:"60px",height:"3px",background:`linear-gradient(90deg,${C.copper},${C.copperLight})`,borderRadius:"2px",margin:"16px auto"}} />;
const Stars = () => <span style={{color:C.gold,fontSize:"14px",letterSpacing:"2px"}}>★★★★★</span>;
const inputStyle = {width:"100%",padding:"13px 16px",fontFamily:f.b,fontSize:"15px",border:"1.5px solid #D1D5DB",borderRadius:"8px",outline:"none",color:C.charcoal,marginBottom:"12px",background:"#FAFAFA",boxSizing:"border-box"};

const T = {
  en: {
    breadcrumb: ["Home","Services","Copper Gutters"],
    heroTag: "PREMIUM COPPER GUTTER SYSTEMS",
    heroH1: "The Last Gutter System",
    heroH1Gold: "Your Home Will Ever Need.",
    heroP: "Copper gutters are the pinnacle of residential gutter systems — a lifetime investment that gets more beautiful with age. Custom-fabricated half-round and K-style copper systems with matching copper downspouts, leader heads, and rain chains. Installed by our specialized crew.",
    heroCta: "GET YOUR COPPER CONSULTATION",
    solutions: [
      { title:"6\" copper half-round gutters", desc:"Our signature copper offering. Half-round profiles create a classic, elegant look that complements historic homes, Mediterranean architecture, and high-end new construction. Custom-fabricated with a precision hanger system for lasting durability." },
      { title:"Full copper downspout systems", desc:"Matching 3x4 and 4-inch round copper downspouts with soldered or sealed connections. Copper straps and brackets maintain the premium look from roofline to ground level. Available in 4x5 oversized for high-volume applications." },
      { title:"Copper gutter guards", desc:"6\" and 7\" copper leaf guards that protect your investment while maintaining the seamless copper aesthetic. No mismatched aluminum guards on a copper system — everything matches." },
      { title:"Leader heads and rain chains", desc:"Decorative copper leader heads at downspout transitions and copper rain chains as alternatives to traditional downspouts. These custom touches elevate the entire exterior." },
      { title:"50+ year lifespan — realistically forever", desc:"Copper doesn't rust. It doesn't corrode. It doesn't degrade in salt air, UV, or humidity. Over time, it develops a natural green patina that actually protects the underlying material. Many copper gutter systems outlast the homes they're installed on." },
      { title:"The patina effect", desc:"New copper starts with a brilliant warm tone and gradually develops a distinguished green patina over years of exposure. This natural aging process is considered one of copper's most desirable features — it's why historic buildings, churches, and monuments use copper." },
    ],
    solutionsTag: "COPPER SYSTEMS",
    solutionsTitle: "OUR COPPER GUTTER OFFERINGS",
    stats: [
      { value:"50+", label:"Year lifespan (often 100+)" },
      { value:"$0", label:"Corrosion — ever" },
      { value:"6\"–8\"", label:"Half-round sizes available" },
      { value:"100%", label:"Handcrafted installation" },
    ],
    comparisonTag: "COMPARISON",
    comparisonTitle: "COPPER VS. ALUMINUM",
    comparisonHeaders: { feature:"Feature", aluminum:"Aluminum", copper:"Copper" },
    comparison: [
      { feature:"Lifespan in Florida", aluminum:"20-30 years", copper:"50-100+ years" },
      { feature:"Salt air resistance", aluminum:"Good", copper:"Immune" },
      { feature:"Maintenance required", aluminum:"Moderate", copper:"Minimal" },
      { feature:"Appearance over time", aluminum:"Fades slightly", copper:"Develops patina — improves" },
      { feature:"Curb appeal impact", aluminum:"Clean, modern", copper:"Premium, distinguished" },
      { feature:"Home value impact", aluminum:"Functional", copper:"Adds measurable value" },
      { feature:"Replacement frequency", aluminum:"Once every 20-25 years", copper:"Likely never" },
    ],
    idealTag: "BEST FIT",
    idealTitle: "WHO COPPER GUTTERS ARE FOR",
    idealFor: [
      { title:"Historic and Mediterranean homes", desc:"Copper's classic aesthetic complements Spanish tile, barrel tile, and historic architectural styles found throughout Tampa Bay's older neighborhoods." },
      { title:"Coastal and waterfront properties", desc:"Salt air destroys aluminum faster. Copper is essentially immune to corrosion, making it the material of choice for homes on the water." },
      { title:"High-end new construction", desc:"Builders and architects spec copper when the home's exterior needs to make a statement. Copper gutters signal that no detail was overlooked." },
      { title:"Forever homes", desc:"If you're staying in your home for 20+ years, copper's higher upfront cost pays for itself — you'll never replace them, and they add value every year." },
    ],
    peakAlertLabel: "FLORIDA INSURANCE ALERT",
    peakAlertTitle: "280% Increase in Non-Renewals — Roof Over 15 Years Old?",
    peakAlertDesc: "restores shingles from the inside out — adds 6–10 years of roof life for up to 70% less than a new roof install, with warranty docs Florida carriers need to see when evaluating your renewal.",
    peakBtn: "PEAK 301 INFO →",
    peakRightsBtn: "YOUR RIGHTS →",
    goldTag: "THE GOLD STANDARD",
    goldTitle: "OUR COPPER INSTALLATION PROCESS",
    goldSub: "Every home. Every time. No exceptions.",
    goldSteps: [
      { num:"01", title:"ASSESS", desc:"We evaluate your roofline, architectural style, and drainage needs. Not every home benefits from copper — we'll be honest about whether it's the right investment for yours." },
      { num:"02", title:"DESIGN", desc:"Custom copper system design including gutter profile, downspout placement, leader heads, and color/patina expectations. Detailed estimate with material and labor breakdown." },
      { num:"03", title:"INSTALL", desc:"Our crew fabricates and installs your copper system with soldered joints and precision-placed brackets. Copper installation is specialized work — this is not a standard gutter crew job." },
      { num:"04", title:"PROTECT", desc:"Final inspection, water flow test, and care instructions for your new copper system. The investment is protected by our craftsmanship warranty." },
    ],
    faqTag: "FAQ",
    faqTitle: "COPPER GUTTER QUESTIONS",
    faqs: [
      { q:"How much do copper gutters cost?", a:"Copper gutter systems are a premium investment. Half-round copper gutters start around $65 per linear foot installed, with copper downspouts at approximately $50 per linear foot. A complete copper system for a typical home runs significantly more than aluminum — but it also lasts 3-5 times longer. We provide detailed quotes so you can evaluate the investment." },
      { q:"Are copper gutters worth the investment?", a:"Over a 50-year period, copper often costs less than aluminum because you never replace it. A $1,800 aluminum system replaced twice over 50 years costs $3,600+. A $5,000 copper system installed once costs $5,000 — and it's still working at year 50. For homes you plan to keep long-term, or for coastal properties where aluminum corrodes faster, copper is the smarter long-term investment." },
      { q:"Will copper gutters turn green?", a:"Yes — and that's a feature, not a flaw. Copper develops a natural green patina over several years of exposure to weather. This patina is actually a protective layer that prevents further oxidation. Many homeowners specifically choose copper for this aging effect. If you prefer the original copper tone, periodic cleaning maintains the warm color." },
      { q:"Do you solder copper gutter joints?", a:"Yes. Copper gutter joints should be soldered for a watertight, permanent seal — not just caulked like aluminum. Our crew is trained in copper soldering techniques to ensure every joint is secure and leak-free for decades." },
      { q:"Can you install copper gutters on any home?", a:"Technically yes, but copper isn't the best choice for every home. It looks best on homes with architectural character — historic styles, Mediterranean, craftsman, colonial, or high-end contemporary. On a standard suburban ranch, the premium cost may not deliver proportional visual impact. We'll give you an honest recommendation." },
      { q:"How long does copper gutter installation take?", a:"Copper installation takes longer than aluminum because of the soldering, custom bracket placement, and precision work required. Most residential copper gutter installations take 2-4 days depending on complexity." },
      { q:"Do you offer copper gutter guards?", a:"Yes. We install copper leaf guards in 6\" and 7\" sizes that match your copper gutter system seamlessly. No mismatched aluminum guards sitting on top of a premium copper system." },
    ],
    ctaTitle: "INTERESTED IN COPPER?",
    ctaSub: "Copper isn't for every home or every budget — but for the right property, nothing else compares. Get a free assessment to find out if copper is the right investment for yours.",
    formTitle: "Request Your Copper Consultation",
    formName: "Full Name",
    formPhone: "Phone Number",
    formEmail: "Email Address",
    formZip: "ZIP Code",
    formBtn: "REQUEST MY COPPER CONSULTATION",
    formDisclaimer: "No spam. No pressure. Honest assessment of whether copper is right for your home.",
    successTitle: "Consultation Request Received!",
    successMsg: "We'll be in touch to schedule your copper assessment.",
    stepLabel: "STEP",
  },
  es: {
    breadcrumb: ["Inicio","Servicios","Canalones de Cobre"],
    heroTag: "SISTEMAS PREMIUM DE CANALONES DE COBRE",
    heroH1: "El Ultimo Sistema de Canalones",
    heroH1Gold: "Que Su Hogar Necesitara.",
    heroP: "Los canalones de cobre son lo mejor en sistemas residenciales — una inversion de por vida que se vuelve mas hermosa con el tiempo. Sistemas de cobre half-round y K-style fabricados a medida con bajantes, cabezales decorativos y cadenas de lluvia de cobre. Instalados por nuestro equipo especializado.",
    heroCta: "OBTENGA SU CONSULTA DE COBRE",
    solutions: [
      { title:"Canalones half-round de cobre de 6\"", desc:"Nuestra oferta insignia en cobre. Los perfiles half-round crean un aspecto clasico y elegante que complementa casas historicas, arquitectura mediterranea y construcciones nuevas de alta gama. Fabricados a medida con un sistema de ganchos de precision para durabilidad." },
      { title:"Sistemas completos de bajantes de cobre", desc:"Bajantes de cobre de 3x4 y 4 pulgadas redondos con conexiones soldadas o selladas. Correas y soportes de cobre mantienen el aspecto premium desde la linea del techo hasta el suelo. Disponible en 4x5 para aplicaciones de alto volumen." },
      { title:"Guardas de canalones de cobre", desc:"Guardas de hojas de cobre de 6\" y 7\" que protegen su inversion manteniendo la estetica continua del cobre. Sin guardas de aluminio que no combinen — todo hace juego." },
      { title:"Cabezales decorativos y cadenas de lluvia", desc:"Cabezales decorativos de cobre en las transiciones de bajantes y cadenas de lluvia de cobre como alternativa a los bajantes tradicionales. Estos toques personalizados elevan todo el exterior." },
      { title:"Vida util de 50+ anos — practicamente para siempre", desc:"El cobre no se oxida. No se corroe. No se degrada con el aire salado, los rayos UV ni la humedad. Con el tiempo, desarrolla una patina verde natural que protege el material. Muchos sistemas de canalones de cobre duran mas que las casas donde se instalan." },
      { title:"El efecto de la patina", desc:"El cobre nuevo comienza con un tono calido brillante y gradualmente desarrolla una patina verde distinguida con los anos de exposicion. Este proceso natural es una de las caracteristicas mas deseadas del cobre — por eso los edificios historicos, iglesias y monumentos usan cobre." },
    ],
    solutionsTag: "SISTEMAS DE COBRE",
    solutionsTitle: "NUESTRAS OFERTAS DE CANALONES DE COBRE",
    stats: [
      { value:"50+", label:"Anos de vida util (frecuentemente 100+)" },
      { value:"$0", label:"Corrosion — nunca" },
      { value:"6\"–8\"", label:"Tamanos half-round disponibles" },
      { value:"100%", label:"Instalacion artesanal" },
    ],
    comparisonTag: "COMPARACION",
    comparisonTitle: "COBRE VS. ALUMINIO",
    comparisonHeaders: { feature:"Caracteristica", aluminum:"Aluminio", copper:"Cobre" },
    comparison: [
      { feature:"Vida util en Florida", aluminum:"20-30 anos", copper:"50-100+ anos" },
      { feature:"Resistencia al aire salado", aluminum:"Buena", copper:"Inmune" },
      { feature:"Mantenimiento requerido", aluminum:"Moderado", copper:"Minimo" },
      { feature:"Apariencia con el tiempo", aluminum:"Se desvanece un poco", copper:"Desarrolla patina — mejora" },
      { feature:"Impacto visual", aluminum:"Limpio, moderno", copper:"Premium, distinguido" },
      { feature:"Impacto en valor de la casa", aluminum:"Funcional", copper:"Agrega valor medible" },
      { feature:"Frecuencia de reemplazo", aluminum:"Cada 20-25 anos", copper:"Probablemente nunca" },
    ],
    idealTag: "IDEAL PARA",
    idealTitle: "PARA QUIEN SON LOS CANALONES DE COBRE",
    idealFor: [
      { title:"Casas historicas y mediterraneas", desc:"La estetica clasica del cobre complementa la teja espanola, la teja barril y los estilos arquitectonicos historicos que se encuentran en los vecindarios mas antiguos de Tampa Bay." },
      { title:"Propiedades costeras y frente al agua", desc:"El aire salado destruye el aluminio mas rapido. El cobre es practicamente inmune a la corrosion, lo que lo convierte en el material preferido para casas junto al agua." },
      { title:"Construccion nueva de alta gama", desc:"Constructores y arquitectos especifican cobre cuando el exterior de la casa necesita hacer una declaracion. Los canalones de cobre demuestran que ningun detalle fue pasado por alto." },
      { title:"Casas para siempre", desc:"Si planea quedarse en su casa por 20+ anos, el costo inicial mas alto del cobre se paga solo — nunca los reemplazara, y agregan valor cada ano." },
    ],
    peakAlertLabel: "ALERTA DE SEGUROS DE FLORIDA",
    peakAlertTitle: "280% de Aumento en No Renovaciones — Techo de Mas de 15 Anos?",
    peakAlertDesc: "restaura las tejas desde adentro — agrega 6–10 anos de vida al techo por hasta 70% menos que una instalacion de techo nuevo, con documentos de garantia que las aseguradoras de FL necesitan ver al evaluar su renovacion.",
    peakBtn: "INFO PEAK 301 →",
    peakRightsBtn: "SUS DERECHOS →",
    goldTag: "EL ESTANDAR DE ORO",
    goldTitle: "NUESTRO PROCESO DE INSTALACION DE COBRE",
    goldSub: "Cada casa. Cada vez. Sin excepciones.",
    goldSteps: [
      { num:"01", title:"EVALUAR", desc:"Evaluamos su linea de techo, estilo arquitectonico y necesidades de drenaje. No toda casa se beneficia del cobre — seremos honestos sobre si es la inversion correcta para la suya." },
      { num:"02", title:"DISENAR", desc:"Diseno personalizado del sistema de cobre incluyendo perfil del canalon, ubicacion de bajantes, cabezales decorativos y expectativas de color/patina. Presupuesto detallado con desglose de material y mano de obra." },
      { num:"03", title:"INSTALAR", desc:"Nuestro equipo fabrica e instala su sistema de cobre con juntas soldadas y soportes colocados con precision. La instalacion de cobre es trabajo especializado — no es un trabajo de equipo de canalones estandar." },
      { num:"04", title:"PROTEGER", desc:"Inspeccion final, prueba de flujo de agua e instrucciones de cuidado para su nuevo sistema de cobre. La inversion esta protegida por nuestra garantia de mano de obra." },
    ],
    faqTag: "PREGUNTAS FRECUENTES",
    faqTitle: "PREGUNTAS SOBRE CANALONES DE COBRE",
    faqs: [
      { q:"Cuanto cuestan los canalones de cobre?", a:"Los sistemas de canalones de cobre son una inversion premium. Los canalones half-round de cobre comienzan alrededor de $65 por pie lineal instalado, con bajantes de cobre a aproximadamente $50 por pie lineal. Un sistema completo de cobre para una casa tipica cuesta significativamente mas que el aluminio — pero tambien dura 3-5 veces mas. Proporcionamos presupuestos detallados para que pueda evaluar la inversion." },
      { q:"Vale la pena la inversion en canalones de cobre?", a:"En un periodo de 50 anos, el cobre frecuentemente cuesta menos que el aluminio porque nunca lo reemplaza. Un sistema de aluminio de $1,800 reemplazado dos veces en 50 anos cuesta $3,600+. Un sistema de cobre de $5,000 instalado una vez cuesta $5,000 — y sigue funcionando en el ano 50. Para casas que planea mantener a largo plazo, o para propiedades costeras donde el aluminio se corroe mas rapido, el cobre es la inversion mas inteligente." },
      { q:"Los canalones de cobre se ponen verdes?", a:"Si — y eso es una ventaja, no un defecto. El cobre desarrolla una patina verde natural con varios anos de exposicion al clima. Esta patina es en realidad una capa protectora que previene mayor oxidacion. Muchos propietarios eligen cobre especificamente por este efecto. Si prefiere el tono original del cobre, la limpieza periodica mantiene el color calido." },
      { q:"Sueldan las juntas de los canalones de cobre?", a:"Si. Las juntas de canalones de cobre deben soldarse para un sello permanente e impermeable — no solo sellarse con silicona como el aluminio. Nuestro equipo esta entrenado en tecnicas de soldadura de cobre para asegurar que cada junta sea segura y libre de fugas por decadas." },
      { q:"Pueden instalar canalones de cobre en cualquier casa?", a:"Tecnicamente si, pero el cobre no es la mejor opcion para toda casa. Se ve mejor en casas con caracter arquitectonico — estilos historicos, mediterraneo, artesanal, colonial o contemporaneo de alta gama. En un rancho suburbano estandar, el costo premium puede no entregar un impacto visual proporcional. Le daremos una recomendacion honesta." },
      { q:"Cuanto tiempo toma la instalacion de canalones de cobre?", a:"La instalacion de cobre toma mas tiempo que el aluminio por la soldadura, colocacion de soportes personalizados y el trabajo de precision requerido. La mayoria de las instalaciones residenciales de canalones de cobre toman 2-4 dias dependiendo de la complejidad." },
      { q:"Ofrecen guardas de canalones de cobre?", a:"Si. Instalamos guardas de hojas de cobre en tamanos de 6\" y 7\" que combinan perfectamente con su sistema de canalones de cobre. Sin guardas de aluminio que no combinen encima de un sistema premium de cobre." },
    ],
    ctaTitle: "INTERESADO EN COBRE?",
    ctaSub: "El cobre no es para toda casa ni todo presupuesto — pero para la propiedad correcta, nada se compara. Obtenga una evaluacion gratuita para saber si el cobre es la inversion correcta para la suya.",
    formTitle: "Solicite Su Consulta de Cobre",
    formName: "Nombre Completo",
    formPhone: "Numero de Telefono",
    formEmail: "Correo Electronico",
    formZip: "Codigo Postal",
    formBtn: "SOLICITAR MI CONSULTA DE COBRE",
    formDisclaimer: "Sin spam. Sin presion. Evaluacion honesta de si el cobre es adecuado para su casa.",
    successTitle: "Solicitud de Consulta Recibida!",
    successMsg: "Nos pondremos en contacto para programar su evaluacion de cobre.",
    stepLabel: "PASO",
  },
};

export default function CopperGuttersPage() {
  const { lang } = useLanguage();
  const t = T[lang];
  const [formData, setFormData] = useState({name:"",phone:"",email:"",zip:""});
  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);
  useEffect(() => { injectFonts(); }, []);
  const secTitle = {fontFamily:f.h,fontSize:"clamp(24px,4vw,36px)",fontWeight:800,letterSpacing:"2px",textAlign:"center",marginBottom:"8px"};

  return (
    <div style={{background:C.bg,color:C.white,fontFamily:f.b,lineHeight:1.65,minHeight:"100vh"}}>
      <SiteNav />
      <div style={{padding:"16px 24px 0",maxWidth:"1200px",margin:"0 auto"}}><div style={{fontFamily:f.b,fontSize:"13px",color:C.muted}}>{t.breadcrumb.map((item,i) => <span key={i}>{i>0&&<span style={{margin:"0 8px",opacity:0.5}}>/</span>}<span style={{color:i===t.breadcrumb.length-1?C.copper:C.muted}}>{item}</span></span>)}</div></div>

      {/* HERO */}
      <section className="hero-stars" style={{padding:"60px 24px 80px",maxWidth:"1200px",margin:"0 auto",display:"flex",gap:"48px",alignItems:"center",flexWrap:"wrap"}}>
        <div style={{flex:"1 1 500px",minWidth:"300px"}}>
          <Tag>{t.heroTag}</Tag>
          <h1 style={{fontFamily:f.h,fontSize:"clamp(32px,5vw,48px)",fontWeight:800,lineHeight:1.1,marginBottom:"20px"}}>{t.heroH1}<br/><span style={{color:C.copper}}>{t.heroH1Gold}</span></h1>
          <p style={{fontFamily:f.b,fontSize:"18px",color:C.offWhite,lineHeight:1.7,marginBottom:"32px",maxWidth:"560px"}}>{t.heroP}</p>
          <div style={{display:"flex",gap:"16px",flexWrap:"wrap"}}>
            <button onClick={()=>document.getElementById("quote-form")?.scrollIntoView({behavior:"smooth"})} style={{padding:"16px 36px",fontFamily:f.h,fontSize:"14px",fontWeight:700,letterSpacing:"1.5px",color:C.white,background:`linear-gradient(135deg,${C.copper},${C.copperLight})`,border:"none",borderRadius:"8px",cursor:"pointer",boxShadow:"0 4px 16px rgba(184,115,51,0.3)"}}>{t.heroCta}</button>
            <a href="tel:8444443114" style={{display:"inline-flex",alignItems:"center",padding:"16px 36px",fontFamily:f.h,fontSize:"14px",fontWeight:700,letterSpacing:"1.5px",color:C.copper,border:`2px solid ${C.copper}`,borderRadius:"8px",textDecoration:"none"}}>📞 (844) 444-3114</a>
          </div>
          <div style={{display:"flex",gap:"24px",marginTop:"32px",flexWrap:"wrap"}}>{t.stats.map((s,i) => <div key={i} style={{textAlign:"center"}}><div style={{fontFamily:f.h,fontSize:"28px",fontWeight:800,color:C.copper}}>{s.value}</div><div style={{fontFamily:f.b,fontSize:"12px",color:C.muted,maxWidth:"120px"}}>{s.label}</div></div>)}</div>
        </div>
      </section>

      {/* WHAT WE OFFER */}
      <section style={{background:C.navy,padding:"80px 24px"}}><div style={{maxWidth:"1200px",margin:"0 auto"}}><div style={{textAlign:"center"}}><Tag>{t.solutionsTag}</Tag><h2 style={{...secTitle,color:C.white}}>{t.solutionsTitle}</h2><GoldBar /></div><div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(340px,1fr))",gap:"20px",marginTop:"48px"}}>{t.solutions.map((s,i) => <div key={i} style={{background:C.navyFade,border:`1px solid ${C.navyLight}`,borderRadius:"12px",padding:"28px",transition:"border-color 0.3s"}} onMouseOver={e=>e.currentTarget.style.borderColor=C.copper} onMouseOut={e=>e.currentTarget.style.borderColor=C.navyLight}><div style={{fontFamily:f.h,fontSize:"11px",fontWeight:700,color:C.copper,letterSpacing:"2px",marginBottom:"8px"}}>0{i+1}</div><h3 style={{fontFamily:f.h,fontSize:"17px",fontWeight:700,color:C.white,marginBottom:"10px"}}>{s.title}</h3><p style={{fontFamily:f.b,fontSize:"15px",color:C.muted,lineHeight:1.6}}>{s.desc}</p></div>)}</div></div></section>

      {/* COPPER VS ALUMINUM */}
      <section style={{background:C.navy,padding:"80px 24px"}}><div style={{maxWidth:"900px",margin:"0 auto",textAlign:"center"}}>
        <Tag>{t.comparisonTag}</Tag><h2 style={{...secTitle,color:C.white}}>{t.comparisonTitle}</h2><GoldBar />
        <div style={{marginTop:"48px",overflowX:"auto"}}>
          <table style={{width:"100%",borderCollapse:"collapse",fontFamily:f.b,fontSize:"14px"}}>
            <thead><tr style={{borderBottom:`2px solid ${C.copper}`}}>
              <th style={{padding:"12px 16px",textAlign:"left",fontFamily:f.h,fontSize:"13px",fontWeight:700,color:C.white}}>{t.comparisonHeaders.feature}</th>
              <th style={{padding:"12px 16px",textAlign:"center",fontFamily:f.h,fontSize:"13px",fontWeight:700,color:C.muted}}>{t.comparisonHeaders.aluminum}</th>
              <th style={{padding:"12px 16px",textAlign:"center",fontFamily:f.h,fontSize:"13px",fontWeight:700,color:C.copper}}>{t.comparisonHeaders.copper}</th>
            </tr></thead>
            <tbody>{t.comparison.map((row,i) => (
              <tr key={i} style={{borderBottom:`1px solid ${C.navyLight}`,background:i%2===0?C.navyFade:"transparent"}}>
                <td style={{padding:"12px 16px",color:C.white,fontWeight:600}}>{row.feature}</td>
                <td style={{padding:"12px 16px",textAlign:"center",color:C.muted}}>{row.aluminum}</td>
                <td style={{padding:"12px 16px",textAlign:"center",color:C.copper,fontWeight:600}}>{row.copper}</td>
              </tr>
            ))}</tbody>
          </table>
        </div>
      </div></section>

      {/* IDEAL FOR */}
      <section style={{background:C.bg,padding:"80px 24px"}}><div style={{maxWidth:"1000px",margin:"0 auto"}}><div style={{textAlign:"center"}}><Tag>{t.idealTag}</Tag><h2 style={{...secTitle,color:C.white}}>{t.idealTitle}</h2><GoldBar /></div><div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(250px,1fr))",gap:"20px",marginTop:"48px"}}>{t.idealFor.map((item,i) => <div key={i} style={{background:C.navyFade,border:`1px solid ${C.navyLight}`,borderRadius:"12px",padding:"28px",borderTop:`3px solid ${C.copper}`}}><h3 style={{fontFamily:f.h,fontSize:"16px",fontWeight:700,color:C.white,marginBottom:"8px"}}>{item.title}</h3><p style={{fontFamily:f.b,fontSize:"15px",color:C.muted,lineHeight:1.55}}>{item.desc}</p></div>)}</div></div></section>

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
      <section style={{background:C.navy,padding:"80px 24px"}}><div style={{maxWidth:"1200px",margin:"0 auto"}}><div style={{textAlign:"center"}}><Tag>{t.goldTag}</Tag><h2 style={{...secTitle,color:C.white}}>{t.goldTitle}</h2><GoldBar /><p style={{fontFamily:f.b,fontSize:"17px",color:C.offWhite,fontStyle:"italic",maxWidth:"500px",margin:"0 auto 48px"}}>{t.goldSub}</p></div><div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(250px,1fr))",gap:"24px"}}>{t.goldSteps.map((step,i) => <div key={i} style={{background:C.navyFade,border:`1px solid ${C.navyLight}`,borderRadius:"12px",padding:"28px",position:"relative"}}><div style={{fontFamily:f.h,fontSize:"36px",fontWeight:800,color:"rgba(184,115,51,0.1)",position:"absolute",top:"16px",right:"20px"}}>{step.num}</div><div style={{fontFamily:f.h,fontSize:"11px",fontWeight:700,color:C.copper,letterSpacing:"3px",marginBottom:"8px"}}>{t.stepLabel} {step.num}</div><h3 style={{fontFamily:f.h,fontSize:"22px",fontWeight:700,color:C.white,marginBottom:"12px"}}>{step.title}</h3><p style={{fontFamily:f.b,fontSize:"15px",color:C.muted,lineHeight:1.6}}>{step.desc}</p></div>)}</div></div></section>

      {/* FAQ */}
      <section style={{background:C.bg,padding:"80px 24px"}}><div style={{maxWidth:"800px",margin:"0 auto",textAlign:"center"}}><Tag>{t.faqTag}</Tag><h2 style={{...secTitle,color:C.white}}>{t.faqTitle}</h2><GoldBar /><div style={{marginTop:"40px",textAlign:"left"}}>{t.faqs.map((faq,i) => <div key={i} style={{borderBottom:`1px solid ${C.navyLight}`}}><button onClick={()=>setOpenFaq(openFaq===i?null:i)} style={{width:"100%",padding:"20px 0",background:"none",border:"none",cursor:"pointer",display:"flex",justifyContent:"space-between",alignItems:"center",gap:"16px"}}><span style={{fontFamily:f.h,fontSize:"15px",fontWeight:600,color:openFaq===i?C.copper:C.white,textAlign:"left",transition:"color 0.2s"}}>{faq.q}</span><span style={{fontFamily:f.h,fontSize:"20px",color:C.copper,transform:openFaq===i?"rotate(45deg)":"none",transition:"transform 0.3s",flexShrink:0}}>+</span></button>{openFaq===i&&<div style={{padding:"0 0 20px",fontFamily:f.b,fontSize:"15px",color:C.muted,lineHeight:1.65}}>{faq.a}</div>}</div>)}</div></div></section>

      {/* CTA */}
      <section id="quote-form" style={{background:`linear-gradient(165deg,${C.navyMid},${C.navy})`,padding:"80px 24px"}}><div style={{maxWidth:"600px",margin:"0 auto",textAlign:"center"}}>
        <h2 style={{fontFamily:f.h,fontSize:"clamp(28px,5vw,40px)",fontWeight:800,color:C.white,marginBottom:"12px"}}>{t.ctaTitle}</h2>
        <p style={{fontFamily:f.b,fontSize:"17px",color:C.offWhite,marginBottom:"40px"}}>{t.ctaSub}</p>
        {submitted ? <div style={{background:"rgba(184,115,51,0.1)",border:`1px solid ${C.copper}`,borderRadius:"12px",padding:"32px"}}><div style={{fontSize:"48px",marginBottom:"12px"}}>✓</div><h3 style={{fontFamily:f.h,fontSize:"20px",fontWeight:700,color:C.copper}}>{t.successTitle}</h3><p style={{fontFamily:f.b,fontSize:"15px",color:C.muted,marginTop:"8px"}}>{t.successMsg}</p></div> : <div style={{background:C.white,borderRadius:"16px",padding:"32px",boxShadow:"0 24px 80px rgba(0,0,0,0.4)",textAlign:"left"}}>
          <h3 style={{fontFamily:f.h,fontSize:"18px",fontWeight:700,color:C.navy,textAlign:"center",marginBottom:"4px"}}>{t.formTitle}</h3>
          <div style={{width:"40px",height:"3px",background:C.copper,borderRadius:"2px",margin:"10px auto 20px"}} />
          <input style={inputStyle} placeholder={t.formName} value={formData.name} onChange={e=>setFormData({...formData,name:e.target.value})} />
          <input style={inputStyle} placeholder={t.formPhone} type="tel" value={formData.phone} onChange={e=>setFormData({...formData,phone:e.target.value})} />
          <input style={inputStyle} placeholder={t.formEmail} type="email" value={formData.email} onChange={e=>setFormData({...formData,email:e.target.value})} />
          <input style={inputStyle} placeholder={t.formZip} value={formData.zip} onChange={e=>setFormData({...formData,zip:e.target.value})} maxLength={5} />
          <button onClick={()=>setSubmitted(true)} style={{width:"100%",padding:"16px",fontFamily:f.h,fontSize:"14px",fontWeight:700,letterSpacing:"1.5px",color:C.white,background:`linear-gradient(135deg,${C.copper},${C.copperLight})`,border:"none",borderRadius:"8px",cursor:"pointer"}}>{t.formBtn}</button>
          <p style={{fontFamily:f.b,fontSize:"12px",color:"#9CA3AF",textAlign:"center",marginTop:"12px"}}>{t.formDisclaimer}</p>
        </div>}
        <div style={{marginTop:"32px"}}><a href="tel:8444443114" style={{fontFamily:f.h,fontSize:"18px",fontWeight:700,color:C.copper,textDecoration:"none"}}>📞 (844) 444-3114</a></div>
      </div></section>

      <SiteFooter />
      <MobileCTA />
      <style>{`*{box-sizing:border-box;margin:0;padding:0}::placeholder{color:#9CA3AF}input:focus{border-color:${C.copper}!important}`}</style>
    </div>
  );
}
