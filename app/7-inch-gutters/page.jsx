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
    breadcrumb: ["Home","Services","7-Inch Gutters"],
    heroTag: "OVERSIZED 7-INCH SEAMLESS GUTTERS",
    heroH1: "When 6 Inches Isn't Enough —",
    heroH1Gold: "Go Commercial-Grade on Your Home",
    heroP: "7-inch seamless aluminum gutters deliver roughly 40% more water capacity than standard 6-inch systems. The right spec for South Tampa luxury homes, steep-pitch roofs, large roof areas, and any home where 6-inch gutters already overflow during Florida storms.",
    btnEstimate: "GET YOUR 7-INCH ESTIMATE",
    btnCall: "CALL (844) 444-3114",
    problemTag: "WHY 6 INCHES OVERFLOWS",
    problemTitle: "WHEN STANDARD GUTTERS CAN'T KEEP UP",
    problems: [
      { icon:"🌧️", title:"Florida rain is not average rain", desc:"Tampa averages 50+ inches of rain a year and drops a disproportionate share of it in violent afternoon bursts. A standard 6-inch K-style gutter is spec'd for normal rainfall — not summer storms that dump 2 inches in 30 minutes." },
      { icon:"🏠", title:"Steep roofs accelerate water", desc:"The steeper your roof pitch, the faster water hits the gutter — and the more capacity you need to keep it in the channel instead of pouring over the front edge. South Tampa's higher-pitch luxury roofs overrun 6-inch gutters regularly." },
      { icon:"📐", title:"Large roof areas = large water volume", desc:"A 4,000 sqft home sheds nearly double the water of a 2,000 sqft home during the same storm. Using the same gutter size on both is guaranteed overflow on the larger house." },
      { icon:"💸", title:"Overflow damage is expensive", desc:"A gutter that can't keep up pours water exactly where you don't want it — at the foundation, against the fascia, into the soffit, through the landscape. Fixing water damage dwarfs the upcharge for the right-sized gutter." },
    ],
    solutionTag: "THE 7-INCH ADVANTAGE",
    solutionTitle: "WHAT YOU GET WITH A 7-INCH UPGRADE",
    solutionSub: "Commercial-grade water capacity on a residential installation — same aesthetic, dramatically more performance.",
    solutions: [
      { title:"~40% more water capacity", desc:"A 7-inch K-style gutter moves roughly 40% more water than a standard 6-inch — not a small gain. That headroom is the difference between a gutter that flows during a storm and a gutter that pours water over the front edge." },
      { title:"Fewer downspouts, cleaner look", desc:"Because each run handles more water, a 7-inch system often needs fewer downspouts than a 6-inch system on the same home. The front of the house looks cleaner with fewer downspouts breaking up the facade." },
      { title:"Matches larger downspout options", desc:"7-inch gutters pair with 4x5 rectangular or oversized round downspouts — moving far more water than the standard 3x4 downspout on a 6-inch system. End-to-end capacity, not just a bigger opening." },
      { title:"Still seamless, still on-site fabricated", desc:"We bring the gutter machine to your home and fabricate 7-inch runs on-site — same seamless, no-splice construction as our 6-inch installations. No factory joints, no horizontal seams." },
      { title:"Hidden hangers every 24 inches", desc:"A heavier gutter with more water volume needs stronger support. 7-inch installs get our standard hidden-hanger system every 24 inches — no exposed spikes on the face, better hold on the fascia." },
      { title:"40+ color options, no visual hit", desc:"Same aluminum coil color spectrum as 6-inch gutters. The 7-inch profile is slightly larger but still residential-appropriate — most homeowners can't tell at a glance. The performance difference is what you notice." },
    ],
    stats: [
      { value:"~40%", label:"More capacity vs 6-inch" },
      { value:"20+", label:"Year system lifespan" },
      { value:"40+", label:"Color options available" },
      { value:"24\"", label:"Hidden hanger spacing" },
    ],
    scopeTag: "WHEN 7-INCH IS THE RIGHT CALL",
    scopeTitle: "HOMES THAT ACTUALLY NEED OVERSIZED GUTTERS",
    scopeSub: "7-inch isn't for every home — but for these it's the right spec. We'll tell you honestly during the walkthrough.",
    scopeItems: [
      { icon:"🏛️", title:"South Tampa Luxury Homes", desc:"Large roof areas, steep pitches, and expensive landscaping that can't tolerate overflow. The home's scale and the cost of water damage both argue for commercial-grade capacity." },
      { icon:"📐", title:"Steep-Pitch Roofs", desc:"Steep pitches move water to the gutter fast. If your home has a high-pitch roof and you see overflow during summer storms, 7-inch is the fix — not more downspouts on the same 6-inch system." },
      { icon:"🏰", title:"Large Roof Areas (3,500+ sqft)", desc:"Homes above roughly 3,500 sqft of roof area shed enough water in a Florida storm that 6-inch gutters are at or past their capacity limit. 7-inch gives real headroom." },
      { icon:"🌊", title:"Homes with Existing Overflow Issues", desc:"If your current 6-inch gutters overflow during storms even when clean, you don't need more cleaning — you need more capacity. 7-inch solves what no amount of maintenance can." },
      { icon:"🏡", title:"Custom & Architectural Homes", desc:"Custom builds with complex rooflines, multi-plane roofs, or unusual geometry often concentrate water at specific gutter runs. 7-inch handles those concentration zones without overflow." },
      { icon:"🛠️", title:"Replacement Upgrades", desc:"Replacing aging 5-inch or 6-inch gutters is the perfect moment to upgrade to 7-inch — installation cost is already in play, marginal upcharge is modest, and you get 20+ years of headroom capacity." },
    ],
    peakAlert: "7-INCH VS 6-INCH",
    peakTitle: "Most Tampa homes do fine with 6-inch. When they don't, it's obvious.",
    peakDesc: "If your home is under 3,000 sqft of roof area with a moderate pitch and no current overflow, 6-inch is the right call. If you're above that — or you already see overflow — 7-inch pays for itself in avoided water damage. We'll tell you which you are during the free walkthrough.",
    peakBtn: "GET WALKTHROUGH →",
    peakRights: "CALL (844) 444-3114 →",
    goldTag: "THE GOLD STANDARD",
    goldTitle: "OUR 7-INCH INSTALLATION PROCESS",
    goldMotto: "The right size. The right install. Every home, every time.",
    goldSteps: [
      { num:"01", title:"ASSESS", desc:"Free walkthrough. We measure roof area, check pitch, count downspouts, and evaluate any overflow evidence. We'll give you an honest 6 vs 7 recommendation — we don't upsell for its own sake." },
      { num:"02", title:"DESIGN", desc:"Custom 7-inch plan: gutter runs, downspout placement and sizing (4x5 rectangular or oversized round), color selection, and transparent line-item estimate." },
      { num:"03", title:"INSTALL", desc:"Crew brings the gutter machine to your home and fabricates 7-inch seamless runs on-site. Hidden hangers every 24 inches. Pitch calibrated for optimal flow. Typically done in a single day." },
      { num:"04", title:"TEST & PROTECT", desc:"Final walkthrough, water flow test to confirm capacity, cleanup of the install, and craftsmanship warranty. You see the capacity difference on the first real storm." },
    ],
    reviewTag: "CUSTOMER REVIEWS",
    reviewTitle: "WHAT 7-INCH CUSTOMERS SAY",
    reviews: [
      { text:"Chris and his team replaced the gutters on my home with 7-inch gutters, changed downspouts to address standing water issues, then installed leaf guards. Very satisfied with the quality of work and the entire team was very easy to work with.", name:"David K.", context:"7-Inch Upgrade + Guards" },
      { text:"Our 6-inch gutters were overflowing during every summer storm. JR One recommended 7-inch after walking the roof — the upcharge was reasonable and we haven't had a single overflow since.", name:"South Tampa Owner", context:"6-to-7 Inch Upgrade" },
      { text:"Big home, steep roof, expensive landscape. The 7-inch system keeps water off my beds during the worst downpours. Money well spent.", name:"Homeowner", context:"Custom 4,500 sqft Home" },
    ],
    faqTag: "FAQ",
    faqTitle: "7-INCH GUTTER QUESTIONS",
    faqs: [
      { q:"How much more do 7-inch gutters cost than 6-inch?", a:"The per-linear-foot premium is modest — typically 20-35% more than 6-inch, depending on gauge, color, and downspout spec. On a typical home the total project upcharge is a few hundred dollars, not thousands. Exact numbers in the estimate." },
      { q:"Will 7-inch gutters look oversized on my house?", a:"On most homes, no. The profile is slightly taller than a 6-inch gutter but the difference is subtle from the ground — most homeowners can't tell at a glance. On very small cottage-scale homes the proportion can look heavy; we'll flag that during the walkthrough if it applies to your home." },
      { q:"Do 7-inch gutters need special downspouts?", a:"They pair best with 4x5 rectangular downspouts or oversized round downspouts — not the standard 3x4. Using a 3x4 downspout on a 7-inch gutter defeats the point of the upgrade. The full system matters, not just the channel size." },
      { q:"Can you upgrade my existing 6-inch gutters to 7-inch?", a:"Yes. The existing 6-inch gutters are removed and new 7-inch seamless runs are fabricated on-site. The fascia is inspected during removal — if anything needs repair we'll flag it before install. Typical upgrade is completed in a single day." },
      { q:"When is 7-inch the wrong call?", a:"For smaller single-story homes with moderate roof area, moderate pitch, and no current overflow, 6-inch is already the right spec — upgrading to 7-inch is an unnecessary cost. We'll tell you honestly during the walkthrough if 6-inch is what you actually need." },
      { q:"Does 7-inch handle hurricane-level rain?", a:"Better than 6-inch — but no gutter fully 'handles' a hurricane's worst rain bursts. 7-inch gives you significant headroom over 6-inch, meaning overflow happens less often and water damage risk is materially lower. No gutter is a substitute for proper drainage, guards on tree-covered homes, or post-storm cleaning." },
      { q:"What colors are available in 7-inch?", a:"Same 40+ color options as 6-inch — we run the same aluminum coil inventory. White, almond, clay, bronze, dark bronze, black, and custom matches for trim or fascia." },
    ],
    ctaTitle: "READY TO UPGRADE TO 7-INCH?",
    ctaSub: "Get a free walkthrough. We'll measure your roof, check for overflow evidence, and give you an honest 6 vs 7 recommendation — plus a transparent estimate if 7-inch is the right call.",
    formTitle: "Get Your 7-Inch Estimate",
    formName: "Full Name",
    formPhone: "Phone Number",
    formEmail: "Email Address",
    formZip: "Property ZIP Code",
    formBtn: "REQUEST MY 7-INCH ESTIMATE",
    formDisclaimer: "No spam. No pressure. Honest 6 vs 7 assessment.",
    formSuccess: "Estimate Request Received!",
    formSuccessSub: "We'll get back to you within hours.",
    preferTalk: "Prefer to talk?",
    stepLabel: "STEP",
  },
  es: {
    breadcrumb: ["Inicio","Servicios","Canaletas de 7 Pulgadas"],
    heroTag: "CANALETAS SIN COSTURAS DE 7 PULGADAS",
    heroH1: "Cuando 6 Pulgadas No Es Suficiente —",
    heroH1Gold: "Vaya Grado Comercial en su Hogar",
    heroP: "Las canaletas de aluminio sin costura de 7 pulgadas entregan aproximadamente 40% mas capacidad de agua que los sistemas estandar de 6 pulgadas. La especificacion correcta para casas de lujo de South Tampa, techos de pendiente fuerte, areas de techo grandes y cualquier casa donde las canaletas de 6\" ya se desbordan.",
    btnEstimate: "OBTENGA SU ESTIMADO DE 7\"",
    btnCall: "LLAME AL (844) 444-3114",
    problemTag: "POR QUE 6 PULGADAS SE DESBORDA",
    problemTitle: "CUANDO LAS CANALETAS ESTANDAR NO AGUANTAN",
    problems: [
      { icon:"🌧️", title:"La lluvia de Florida no es lluvia promedio", desc:"Tampa promedia 50+ pulgadas al ano y deja una parte desproporcionada en rafagas violentas de la tarde. Una canaleta estandar de 6\" K-style esta especificada para lluvia normal — no tormentas que caen 2 pulgadas en 30 minutos." },
      { icon:"🏠", title:"Techos empinados aceleran el agua", desc:"Mientras mas empinado el techo, mas rapido llega el agua a la canaleta — y mas capacidad necesita. Los techos de lujo de mayor pendiente en South Tampa sobrecargan canaletas de 6\" regularmente." },
      { icon:"📐", title:"Areas de techo grandes = gran volumen", desc:"Una casa de 4,000 sqft descarga casi el doble que una de 2,000 sqft en la misma tormenta. Usar el mismo tamano de canaleta en ambas garantiza desbordamiento en la casa grande." },
      { icon:"💸", title:"Dano por desbordamiento es caro", desc:"Una canaleta que no aguanta vierte agua exactamente donde no la quiere — en la fundacion, contra la fascia, al sofito. Arreglar el dano empequeneeece el sobrecosto de la canaleta correcta." },
    ],
    solutionTag: "LA VENTAJA DE 7 PULGADAS",
    solutionTitle: "LO QUE OBTIENE CON UN UPGRADE A 7\"",
    solutionSub: "Capacidad grado comercial en instalacion residencial — misma estetica, rendimiento dramaticamente superior.",
    solutions: [
      { title:"~40% mas capacidad de agua", desc:"Una canaleta K-style de 7\" mueve aproximadamente 40% mas agua que una estandar de 6\" — no una ganancia pequena. Ese margen es la diferencia entre una canaleta que fluye durante una tormenta y una que vierte agua sobre el borde." },
      { title:"Menos bajantes, apariencia mas limpia", desc:"Porque cada tramo maneja mas agua, un sistema de 7\" a menudo necesita menos bajantes que uno de 6\" en la misma casa. El frente de la casa se ve mas limpio." },
      { title:"Combina con bajantes mas grandes", desc:"Las canaletas de 7\" se emparejan con bajantes rectangulares de 4x5 o redondos de tamano mayor — moviendo mucho mas agua que el bajante 3x4 estandar. Capacidad de extremo a extremo." },
      { title:"Aun sin costuras, aun fabricadas en sitio", desc:"Llevamos la maquina de canaletas a su casa y fabricamos los tramos de 7\" en sitio — misma construccion sin empalmes. Sin juntas de fabrica, sin costuras horizontales." },
      { title:"Soportes ocultos cada 24 pulgadas", desc:"Una canaleta mas pesada con mas volumen necesita mayor soporte. Las instalaciones de 7\" usan nuestro sistema estandar de soportes ocultos cada 24\"." },
      { title:"Mas de 40 opciones de color, sin impacto visual", desc:"Mismo espectro de colores de aluminio que 6\". El perfil de 7\" es ligeramente mayor pero aun residencial — la mayoria de duenos no lo nota a simple vista." },
    ],
    stats: [
      { value:"~40%", label:"Mas capacidad vs 6\"" },
      { value:"20+", label:"Anos de vida util" },
      { value:"40+", label:"Opciones de color" },
      { value:"24\"", label:"Espaciado de soportes" },
    ],
    scopeTag: "CUANDO 7\" ES LA DECISION CORRECTA",
    scopeTitle: "CASAS QUE REALMENTE NECESITAN CANALETAS DE 7\"",
    scopeSub: "7\" no es para cada casa — pero para estas es la especificacion correcta. Le diremos honestamente durante el recorrido.",
    scopeItems: [
      { icon:"🏛️", title:"Casas de Lujo en South Tampa", desc:"Areas de techo grandes, pendientes fuertes y paisajismo costoso que no tolera desbordamiento. La escala de la casa y el costo del dano por agua ambos argumentan por capacidad grado comercial." },
      { icon:"📐", title:"Techos de Pendiente Fuerte", desc:"Las pendientes fuertes mueven el agua rapido. Si su casa tiene techo empinado y ve desbordamiento en tormentas, 7\" es el arreglo — no mas bajantes en el mismo sistema de 6\"." },
      { icon:"🏰", title:"Areas de Techo Grandes (3,500+ sqft)", desc:"Casas sobre 3,500 sqft de techo descargan suficiente agua en una tormenta de Florida que 6\" esta en o pasado su limite. 7\" da margen real." },
      { icon:"🌊", title:"Casas con Desbordamiento Existente", desc:"Si sus canaletas actuales de 6\" se desbordan en tormentas aun limpias, no necesita mas limpieza — necesita mas capacidad. 7\" resuelve lo que ninguna cantidad de mantenimiento puede." },
      { icon:"🏡", title:"Casas Personalizadas y Arquitectonicas", desc:"Construcciones personalizadas con lineas de techo complejas, techos multi-plano o geometria inusual concentran agua en tramos especificos. 7\" maneja esas zonas sin desbordamiento." },
      { icon:"🛠️", title:"Upgrades de Reemplazo", desc:"Reemplazar canaletas viejas de 5\" o 6\" es el momento perfecto para subir a 7\" — el costo de instalacion ya esta en juego, el sobrecosto marginal es modesto, y obtiene 20+ anos de margen." },
    ],
    peakAlert: "7\" VS 6\"",
    peakTitle: "La mayoria de casas de Tampa estan bien con 6\". Cuando no, es obvio.",
    peakDesc: "Si su casa es menos de 3,000 sqft de techo con pendiente moderada y sin desbordamiento actual, 6\" es la decision correcta. Si esta arriba de eso — o ya ve desbordamiento — 7\" se paga sola en dano evitado. Le diremos cual es usted durante el recorrido gratis.",
    peakBtn: "OBTENER RECORRIDO →",
    peakRights: "LLAMAR (844) 444-3114 →",
    goldTag: "EL ESTANDAR DE ORO",
    goldTitle: "NUESTRO PROCESO DE INSTALACION DE 7\"",
    goldMotto: "El tamano correcto. La instalacion correcta. Cada casa, cada vez.",
    goldSteps: [
      { num:"01", title:"EVALUAR", desc:"Recorrido gratis. Medimos area de techo, chequeamos pendiente, contamos bajantes y evaluamos evidencia de desbordamiento. Le daremos una recomendacion honesta 6 vs 7." },
      { num:"02", title:"DISENAR", desc:"Plan personalizado de 7\": tramos, ubicacion y tamano de bajantes (4x5 rectangular o redondo grande), seleccion de color y estimado transparente." },
      { num:"03", title:"INSTALAR", desc:"El equipo lleva la maquina a su casa y fabrica tramos sin costura de 7\" en sitio. Soportes ocultos cada 24\". Pendiente calibrada. Tipicamente en un dia." },
      { num:"04", title:"PROBAR Y PROTEGER", desc:"Recorrido final, prueba de flujo de agua para confirmar capacidad, limpieza y garantia. Ve la diferencia de capacidad en la primera tormenta real." },
    ],
    reviewTag: "RESENAS DE CLIENTES",
    reviewTitle: "LO QUE DICEN LOS CLIENTES DE 7\"",
    reviews: [
      { text:"Chris y su equipo reemplazaron las canaletas de mi casa con 7\", cambiaron los bajantes para solucionar agua estancada, luego instalaron protectores. Muy satisfecho con la calidad.", name:"David K.", context:"Upgrade de 7\" + Protectores" },
      { text:"Nuestras canaletas de 6\" se desbordaban en cada tormenta. JR One recomendo 7\" despues de caminar el techo — el sobrecosto fue razonable y no hemos tenido un desbordamiento desde entonces.", name:"Dueno de South Tampa", context:"Upgrade de 6\" a 7\"" },
      { text:"Casa grande, techo empinado, paisajismo caro. El sistema de 7\" mantiene el agua fuera de mis jardines en los peores aguaceros.", name:"Dueno de Casa", context:"Casa Personalizada 4,500 sqft" },
    ],
    faqTag: "PREGUNTAS FRECUENTES",
    faqTitle: "PREGUNTAS SOBRE CANALETAS DE 7\"",
    faqs: [
      { q:"Cuanto mas cuestan las canaletas de 7\" que las de 6\"?", a:"La prima por pie lineal es modesta — tipicamente 20-35% mas que 6\", dependiendo de calibre, color y especificacion de bajante. En una casa tipica el sobrecosto del proyecto total son unos cientos de dolares, no miles." },
      { q:"Las canaletas de 7\" se veran sobredimensionadas en mi casa?", a:"En la mayoria de casas, no. El perfil es ligeramente mas alto que 6\" pero la diferencia es sutil desde el suelo. En casas muy pequenas tipo cabana la proporcion puede verse pesada; lo marcaremos en el recorrido si aplica." },
      { q:"Las canaletas de 7\" necesitan bajantes especiales?", a:"Se emparejan mejor con bajantes rectangulares 4x5 o redondos grandes — no el estandar 3x4. Usar un 3x4 en una canaleta de 7\" derrota el proposito del upgrade." },
      { q:"Pueden convertir mis canaletas de 6\" a 7\"?", a:"Si. Las canaletas existentes de 6\" se remueven y se fabrican tramos nuevos de 7\" sin costura en sitio. La fascia se inspecciona durante remocion — si algo necesita reparacion lo marcamos antes de instalar." },
      { q:"Cuando 7\" es la decision incorrecta?", a:"Para casas pequenas de un piso con area moderada, pendiente moderada y sin desbordamiento actual, 6\" ya es la especificacion correcta — subir a 7\" es costo innecesario. Le diremos honestamente en el recorrido." },
      { q:"7\" maneja lluvia nivel huracan?", a:"Mejor que 6\" — pero ninguna canaleta 'maneja' completamente las peores rafagas de un huracan. 7\" le da margen significativo sobre 6\", lo que significa que el desbordamiento ocurre menos y el riesgo de dano es materialmente menor." },
      { q:"Que colores hay en 7\"?", a:"Mismas 40+ opciones que 6\" — corremos el mismo inventario de aluminio. Blanco, almendra, arcilla, bronce, bronce oscuro, negro y combinaciones personalizadas." },
    ],
    ctaTitle: "LISTO PARA SUBIR A 7 PULGADAS?",
    ctaSub: "Obtenga un recorrido gratis. Mediremos su techo, chequearemos evidencia de desbordamiento y daremos una recomendacion honesta 6 vs 7 — mas estimado transparente si 7\" es la decision correcta.",
    formTitle: "Obtenga Su Estimado de 7\"",
    formName: "Nombre Completo",
    formPhone: "Numero de Telefono",
    formEmail: "Correo Electronico",
    formZip: "Codigo Postal",
    formBtn: "SOLICITAR MI ESTIMADO DE 7\"",
    formDisclaimer: "Sin spam. Sin presion. Evaluacion honesta 6 vs 7.",
    formSuccess: "Solicitud Recibida!",
    formSuccessSub: "Le responderemos en pocas horas.",
    preferTalk: "Prefiere hablar?",
    stepLabel: "PASO",
  },
};

export default function SevenInchGuttersPage() {
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
            <button onClick={()=>document.getElementById("quote-form")?.scrollIntoView({behavior:"smooth"})} style={{padding:"16px 36px",fontFamily:f.h,fontSize:"14px",fontWeight:700,letterSpacing:"1.5px",color:C.white,background:`linear-gradient(135deg,${C.accent},${C.accentLight})`,border:"none",borderRadius:"8px",cursor:"pointer",boxShadow:"0 4px 16px rgba(200,149,46,0.3)"}}>{t.btnEstimate}</button>
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

      <section style={{background:"linear-gradient(135deg, rgba(200,149,46,0.08), rgba(15,30,54,0.97))",padding:"28px 24px",borderTop:`2px solid ${C.gold}`,borderBottom:`2px solid ${C.gold}`}}>
        <div style={{maxWidth:"1000px",margin:"0 auto",display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:"20px"}}>
          <div style={{flex:"1 1 500px"}}>
            <div style={{display:"flex",alignItems:"center",gap:"8px",marginBottom:"8px"}}><span style={{fontSize:"16px"}}>⚖️</span><span style={{fontFamily:f.h,fontSize:"11px",fontWeight:700,color:C.gold,letterSpacing:"2px"}}>{t.peakAlert}</span></div>
            <p style={{fontFamily:f.h,fontSize:"clamp(16px,2.5vw,20px)",fontWeight:800,color:C.white,lineHeight:1.3,marginBottom:"6px"}}>{t.peakTitle}</p>
            <p style={{fontFamily:f.b,fontSize:"14px",color:C.muted,lineHeight:1.5}}>{t.peakDesc}</p>
          </div>
          <div style={{display:"flex",flexDirection:"column",gap:"8px",flexShrink:0}}>
            <a href="tel:8444443114" style={{padding:"12px 24px",fontFamily:f.h,fontSize:"12px",fontWeight:700,letterSpacing:"1px",color:C.white,background:`linear-gradient(135deg, ${C.gold}, ${C.goldLight})`,borderRadius:"6px",textDecoration:"none",textAlign:"center",boxShadow:"0 4px 12px rgba(200,149,46,0.3)"}}>{t.peakRights}</a>
          </div>
        </div>
      </section>

      <section style={{background:C.navy,padding:"80px 24px"}}>
        <div style={sec}><div style={{textAlign:"center"}}><Tag>{t.goldTag}</Tag><h2 style={{...secTitle,color:C.white}}>{t.goldTitle}</h2><GoldBar /><p style={{fontFamily:f.b,fontSize:"17px",color:C.offWhite,fontStyle:"italic",maxWidth:"500px",margin:"0 auto 48px"}}>{t.goldMotto}</p></div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(250px,1fr))",gap:"24px"}}>{t.goldSteps.map((step,i) => <div key={i} style={{background:C.navyFade,border:`1px solid ${C.navyLight}`,borderRadius:"12px",padding:"28px",position:"relative"}}><div style={{fontFamily:f.h,fontSize:"36px",fontWeight:800,color:"rgba(200,149,46,0.08)",position:"absolute",top:"16px",right:"20px"}}>{step.num}</div><div style={{fontFamily:f.h,fontSize:"11px",fontWeight:700,color:C.accent,letterSpacing:"3px",marginBottom:"8px"}}>{t.stepLabel} {step.num}</div><h3 style={{fontFamily:f.h,fontSize:"22px",fontWeight:700,color:C.white,marginBottom:"12px"}}>{step.title}</h3><p style={{fontFamily:f.b,fontSize:"15px",color:C.muted,lineHeight:1.6}}>{step.desc}</p></div>)}</div>
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
