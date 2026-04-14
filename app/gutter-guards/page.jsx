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
    breadcrumb: ["Home","Services","Gutter Guards"],
    heroTag: "GUTTER GUARD INSTALLATION & REPAIR",
    heroH1: "Keep Debris Out.",
    heroH1Gold: "Keep Your Gutters Flowing.",
    heroP: "Gutter guards prevent leaves, pine needles, and debris from clogging your gutters and downspouts — the #1 cause of gutter failure and water damage. Guards make maintenance easier, extend your system's lifespan, and keep drainage working when Florida storms hit hardest.",
    btnEstimate: "GET YOUR FREE ESTIMATE",
    btnCall: "CALL (844) 444-3114",
    problemTag: "THE PROBLEM",
    problemTitle: "THE REAL COST OF UNPROTECTED GUTTERS",
    problems: [
      { icon:"🍂", title:"Debris clogs downspouts", desc:"Without guards, leaves and debris pack inside your gutters, block downspouts, and stop water flow completely. When it rains, water overflows exactly where it shouldn't — against your fascia, walls, and foundation." },
      { icon:"🌊", title:"Standing water causes damage", desc:"Clogged gutters hold water like a trough. That weight pulls gutters away from the fascia, rots the wood behind them, and creates breeding grounds for mosquitoes and pests." },
      { icon:"🔄", title:"Constant cleaning cycle", desc:"Without guards, you're cleaning gutters 2-4 times per year — climbing ladders, scooping muck, flushing downspouts. Guards dramatically reduce how often you need to clean and make the cleanings faster when you do." },
      { icon:"⚡", title:"Storm season overwhelm", desc:"Tampa's hurricane season dumps massive water volume in short bursts. Gutters packed with debris can't handle it. Guards keep the channel clear so water flows when it matters most." },
    ],
    solutionTag: "THE JR ONE DIFFERENCE",
    solutionTitle: "GUTTER PROTECTION DONE RIGHT",
    solutionSub: "The right guard for the right situation — not a one-size-fits-all sales pitch.",
    solutions: [
      { title:"Four guard options for every situation", desc:"We install aluminum gutter guards, standard gutter guards, micro mesh gutter guards, and EZ Mesh gutter guards. We assess your tree coverage, roof pitch, and debris type to recommend the right system — not just the most expensive one." },
      { title:"Premium micro mesh option", desc:"For maximum debris blocking, micro mesh guards filter out pine needles, shingle grit, and seed pods while still handling Florida's heaviest downpours. We recommend micro mesh for homes with heavy tree coverage or fine debris problems." },
      { title:"Guards + maintenance = complete protection", desc:"Guards keep debris out of your gutters, but surface buildup still happens over time. We offer ongoing maintenance programs to keep your guards clear and your entire system performing — so you get the full benefit of your investment." },
      { title:"Retrofit to your existing gutters", desc:"Most guard systems install directly onto your current gutters without replacement. If your gutters are in good shape, we protect them — we don't force you to buy new ones." },
      { title:"New gutter + guard packages", desc:"Need new gutters too? We bundle seamless gutter installation with guard systems for maximum savings and a single-crew, single-day installation." },
      { title:"Installed by our crew — not a franchise", desc:"National gutter guard companies send salespeople to your door, then subcontract the install. We do both — the consultation and the installation — with our own trained team." },
    ],
    stats: [
      { value:"1,000+", label:"Guard installations completed" },
      { value:"80%", label:"Less cleaning with guards" },
      { value:"20+", label:"Year guard lifespan" },
      { value:"100%", label:"In-house installation" },
    ],
    guardTag: "OUR GUARD OPTIONS",
    guardTitle: "CHOOSE THE RIGHT PROTECTION",
    guardSub: "Four guard systems — each designed for a specific level of protection and budget.",
    guardTypes: [
      { icon:"🛡️", title:"Aluminum Gutter Guards", desc:"Heavy-duty aluminum guards that snap onto your existing gutters. Built to handle Florida's intense UV, heavy rain, and high winds without warping, rusting, or deteriorating. The strongest, longest-lasting guard option we offer — ideal for homes that need maximum durability.", spec:"Material: Aluminum" },
      { icon:"📐", title:"Standard Gutter Guards", desc:"A reliable, cost-effective guard that keeps leaves and large debris out of your gutters while maintaining solid water flow. A practical choice for homes with moderate tree coverage that want gutter protection without the premium price point.", spec:"Type: Standard screen" },
      { icon:"🔬", title:"Micro Mesh Gutter Guards", desc:"The finest filtration available. Micro mesh screens block pine needles, shingle grit, seed pods, and even roof sand granules while still handling Florida's heaviest downpours. Our top recommendation for homes surrounded by trees or dealing with fine debris problems.", spec:"Filtration: Ultra-fine mesh" },
      { icon:"⚡", title:"EZ Mesh Gutter Guards", desc:"Quick-install mesh guards that provide excellent debris protection with minimal installation time. A smart balance between performance and value — effective against leaves and medium debris while keeping your gutter system flowing during Tampa's storm season.", spec:"Install: Quick-fit design" },
    ],
    peakAlert: "FLORIDA INSURANCE ALERT",
    peakTitle: "280% Increase in Non-Renewals — Roof Over 15 Years Old?",
    peakDesc: "restores shingles from the inside out — adds 6–10 years of roof life and comes with the warranty docs Florida law requires your insurer to accept.",
    peakBtn: "PEAK 301 INFO →",
    peakRights: "YOUR RIGHTS →",
    goldTag: "THE GOLD STANDARD",
    goldTitle: "OUR GUARD INSTALLATION PROCESS",
    goldMotto: "Every home. Every time. No exceptions.",
    goldSteps: [
      { num:"01", title:"ASSESS", desc:"We evaluate your tree coverage, debris type, roof pitch, and existing gutter condition to recommend the right guard system for your situation." },
      { num:"02", title:"DESIGN", desc:"Custom guard plan with the right product for each gutter run — because the front of your house may need different protection than the back." },
      { num:"03", title:"INSTALL", desc:"Our crew installs guards securely onto your gutters, ensuring proper water flow and debris shedding. Most homes done in half a day." },
      { num:"04", title:"PROTECT", desc:"Final inspection, flow test, and our craftsmanship warranty. We'll also set you up with a maintenance schedule to keep everything performing long-term." },
    ],
    reviewTag: "CUSTOMER REVIEWS",
    reviewTitle: "WHAT GUARD CUSTOMERS SAY",
    reviews: [
      { text:"Chris and his team replaced the gutters on my home with 7\" gutters, changed downspouts to address standing water issues, then installed leaf guards on them to keep them flowing well. Very satisfied with the quality.", name:"David K.", context:"Gutters + Leaf Guards" },
      { text:"Great experience. They fixed and added a new gutter. I couldn't be more pleased with their work and dealing with their professional and friendly staff.", name:"Johnny C.", context:"Post-Storm + Guards" },
      { text:"Chris and his crew are amazing! Great customer service and even better craftsmanship! Chris took the time to explain and educate me on everything before the project commenced.", name:"JR One Customer", context:"Gutter Guard Install" },
    ],
    faqTag: "FAQ",
    faqTitle: "GUTTER GUARD QUESTIONS",
    faqs: [
      { q:"Do gutter guards really work?", a:"Yes — guards are highly effective at keeping debris out of your gutters and preventing clogs in your downspouts and drainage system. That said, they're not set-and-forget. Surface debris can still accumulate on top of guards over time and needs periodic clearing. The difference is cleaning off the top of a guard is much faster and easier than scooping packed debris out of a clogged gutter by hand." },
      { q:"Do I still need to clean my gutters after guards are installed?", a:"Yes, but much less often and much more easily. Guards keep debris from getting inside your gutters and clogging your downspouts — that's the real damage-causing problem they solve. Surface buildup on top of guards still needs occasional clearing. We offer maintenance programs to handle this for you, so your guards and gutters stay performing year-round." },
      { q:"How much do gutter guards cost in Tampa?", a:"Gutter guard installation typically ranges from $7–$18 per linear foot depending on the guard type, gutter accessibility, and whether your existing gutters need repair first. Premium micro mesh systems are at the higher end. We provide detailed estimates with no hidden costs." },
      { q:"Can gutter guards be installed on my existing gutters?", a:"In most cases, yes. If your current gutters are in good condition with proper pitch and no structural damage, guards install directly on top. During our assessment, we inspect your gutters and let you know if any repairs are needed first." },
      { q:"What's the best gutter guard for pine needles?", a:"Micro mesh guards are the most effective option for pine needles. Standard screen guards have openings large enough for needles to pass through. If you have pine trees near your roofline, we'll specifically recommend a micro mesh system rated for fine debris." },
      { q:"What's the difference between your guards and LeafFilter?", a:"National companies like LeafFilter use high-pressure sales tactics, charge premium prices, and subcontract the actual installation to local crews. We're the local crew — you deal directly with us, get honest pricing without the franchise markup, and our team does both the consultation and the install." },
      { q:"Do you offer maintenance for gutter guards?", a:"Yes. We offer seasonal maintenance programs that include clearing any surface debris from your guards, inspecting the guard attachment points, flushing downspouts, and checking your gutter system's overall condition. It's the best way to protect your guard investment and keep everything working." },
    ],
    ctaTitle: "READY TO PROTECT YOUR GUTTERS?",
    ctaSub: "Get your free gutter guard assessment. We'll inspect your gutters, evaluate your tree coverage, and recommend the right protection — plus maintenance options to keep everything performing long-term.",
    formTitle: "Get Your Free Guard Estimate",
    formName: "Full Name",
    formPhone: "Phone Number",
    formEmail: "Email Address",
    formZip: "ZIP Code",
    formBtn: "REQUEST MY FREE GUARD ESTIMATE",
    formDisclaimer: "No spam. No pressure. Just honest expert advice.",
    formSuccess: "Quote Request Received!",
    formSuccessSub: "We'll get back to you within hours.",
    preferTalk: "Prefer to talk?",
    stepLabel: "STEP",
  },
  es: {
    breadcrumb: ["Inicio","Servicios","Protectores de Canaletas"],
    heroTag: "INSTALACION Y REPARACION DE PROTECTORES DE CANALETAS",
    heroH1: "Mantenga los Escombros Afuera.",
    heroH1Gold: "Mantenga Sus Canaletas Fluyendo.",
    heroP: "Los protectores de canaletas evitan que hojas, agujas de pino y escombros obstruyan sus canaletas y bajantes — la causa #1 de fallas en canaletas y danos por agua. Los protectores facilitan el mantenimiento, extienden la vida util de su sistema y mantienen el drenaje funcionando cuando las tormentas de Florida golpean mas fuerte.",
    btnEstimate: "OBTENGA SU ESTIMADO GRATIS",
    btnCall: "LLAME AL (844) 444-3114",
    problemTag: "EL PROBLEMA",
    problemTitle: "EL COSTO REAL DE CANALETAS SIN PROTECCION",
    problems: [
      { icon:"🍂", title:"Los escombros obstruyen los bajantes", desc:"Sin protectores, las hojas y escombros se acumulan dentro de sus canaletas, bloquean los bajantes y detienen el flujo de agua completamente. Cuando llueve, el agua se desborda exactamente donde no deberia — contra su fascia, paredes y fundacion." },
      { icon:"🌊", title:"El agua estancada causa danos", desc:"Las canaletas obstruidas retienen agua como un comedero. Ese peso desprende las canaletas de la fascia, pudre la madera detras de ellas y crea criaderos de mosquitos y plagas." },
      { icon:"🔄", title:"Ciclo constante de limpieza", desc:"Sin protectores, usted limpia las canaletas 2-4 veces al ano — subiendo escaleras, sacando mugre, lavando bajantes. Los protectores reducen dramaticamente la frecuencia de limpieza y la hacen mas rapida cuando es necesaria." },
      { icon:"⚡", title:"Temporada de tormentas desbordante", desc:"La temporada de huracanes de Tampa descarga volumenes masivos de agua en rafagas cortas. Las canaletas llenas de escombros no pueden manejarlo. Los protectores mantienen el canal libre para que el agua fluya cuando mas importa." },
    ],
    solutionTag: "LA DIFERENCIA JR ONE",
    solutionTitle: "PROTECCION DE CANALETAS BIEN HECHA",
    solutionSub: "El protector correcto para la situacion correcta — no una solucion unica para todos.",
    solutions: [
      { title:"Cuatro opciones de protectores para cada situacion", desc:"Instalamos protectores de canaletas de aluminio, protectores estandar, protectores de micro malla y protectores EZ Mesh. Evaluamos su cobertura de arboles, inclinacion del techo y tipo de escombros para recomendar el sistema correcto — no solo el mas caro." },
      { title:"Opcion premium de micro malla", desc:"Para maximo bloqueo de escombros, los protectores de micro malla filtran agujas de pino, granulos de tejas y vainas de semillas mientras manejan los aguaceros mas fuertes de Florida. Recomendamos micro malla para hogares con mucha cobertura de arboles o problemas de escombros finos." },
      { title:"Protectores + mantenimiento = proteccion completa", desc:"Los protectores mantienen los escombros fuera de sus canaletas, pero la acumulacion superficial ocurre con el tiempo. Ofrecemos programas de mantenimiento continuo para mantener sus protectores limpios y todo su sistema funcionando — para que obtenga el beneficio completo de su inversion." },
      { title:"Adaptacion a sus canaletas existentes", desc:"La mayoria de los sistemas de protectores se instalan directamente sobre sus canaletas actuales sin reemplazo. Si sus canaletas estan en buenas condiciones, las protegemos — no lo obligamos a comprar nuevas." },
      { title:"Paquetes de canaleta nueva + protector", desc:"Necesita canaletas nuevas tambien? Combinamos la instalacion de canaletas sin costuras con sistemas de protectores para maximo ahorro y una instalacion de un solo equipo en un solo dia." },
      { title:"Instalado por nuestro equipo — no una franquicia", desc:"Las empresas nacionales de protectores envian vendedores a su puerta y luego subcontratan la instalacion. Nosotros hacemos ambos — la consulta y la instalacion — con nuestro propio equipo capacitado." },
    ],
    stats: [
      { value:"1,000+", label:"Instalaciones de protectores completadas" },
      { value:"80%", label:"Menos limpieza con protectores" },
      { value:"20+", label:"Anos de vida util del protector" },
      { value:"100%", label:"Instalacion con equipo propio" },
    ],
    guardTag: "NUESTRAS OPCIONES DE PROTECTORES",
    guardTitle: "ELIJA LA PROTECCION CORRECTA",
    guardSub: "Cuatro sistemas de protectores — cada uno disenado para un nivel especifico de proteccion y presupuesto.",
    guardTypes: [
      { icon:"🛡️", title:"Protectores de Aluminio", desc:"Protectores de aluminio de alta resistencia que se ajustan a sus canaletas existentes. Disenados para manejar los rayos UV intensos, lluvias fuertes y vientos altos de Florida sin deformarse, oxidarse o deteriorarse. La opcion mas fuerte y duradera que ofrecemos — ideal para hogares que necesitan maxima durabilidad.", spec:"Material: Aluminio" },
      { icon:"📐", title:"Protectores Estandar", desc:"Un protector confiable y economico que mantiene las hojas y escombros grandes fuera de sus canaletas mientras mantiene un buen flujo de agua. Una opcion practica para hogares con cobertura moderada de arboles que desean proteccion sin el precio premium.", spec:"Tipo: Malla estandar" },
      { icon:"🔬", title:"Protectores de Micro Malla", desc:"La filtracion mas fina disponible. Las mallas micro filtran agujas de pino, granulos de tejas, vainas de semillas e incluso granulos de arena del techo mientras manejan los aguaceros mas fuertes de Florida. Nuestra principal recomendacion para hogares rodeados de arboles o con problemas de escombros finos.", spec:"Filtracion: Malla ultra fina" },
      { icon:"⚡", title:"Protectores EZ Mesh", desc:"Protectores de malla de instalacion rapida que brindan excelente proteccion contra escombros con tiempo minimo de instalacion. Un balance inteligente entre rendimiento y valor — efectivos contra hojas y escombros medianos mientras mantienen su sistema fluyendo durante la temporada de tormentas de Tampa.", spec:"Instalacion: Diseno de ajuste rapido" },
    ],
    peakAlert: "ALERTA DE SEGUROS DE FLORIDA",
    peakTitle: "Aumento del 280% en No-Renovaciones — Techo de mas de 15 anos?",
    peakDesc: "restaura las tejas desde adentro — agrega 6–10 anos de vida al techo y viene con los documentos de garantia que la ley de FL requiere que su aseguradora acepte.",
    peakBtn: "INFO PEAK 301 →",
    peakRights: "SUS DERECHOS →",
    goldTag: "EL ESTANDAR DE ORO",
    goldTitle: "NUESTRO PROCESO DE INSTALACION DE PROTECTORES",
    goldMotto: "Cada hogar. Cada vez. Sin excepciones.",
    goldSteps: [
      { num:"01", title:"EVALUAR", desc:"Evaluamos su cobertura de arboles, tipo de escombros, inclinacion del techo y condicion de canaletas existentes para recomendar el sistema de proteccion correcto para su situacion." },
      { num:"02", title:"DISENAR", desc:"Plan de protectores personalizado con el producto correcto para cada tramo de canaleta — porque el frente de su casa puede necesitar diferente proteccion que la parte trasera." },
      { num:"03", title:"INSTALAR", desc:"Nuestro equipo instala los protectores de forma segura sobre sus canaletas, asegurando el flujo de agua adecuado y la eliminacion de escombros. La mayoria de los hogares se completan en medio dia." },
      { num:"04", title:"PROTEGER", desc:"Inspeccion final, prueba de flujo y nuestra garantia de mano de obra. Tambien lo configuraremos con un programa de mantenimiento para mantener todo funcionando a largo plazo." },
    ],
    reviewTag: "RESENAS DE CLIENTES",
    reviewTitle: "LO QUE DICEN LOS CLIENTES DE PROTECTORES",
    reviews: [
      { text:"Chris y su equipo reemplazaron las canaletas de mi casa con canaletas de 7\", cambiaron los bajantes para solucionar problemas de agua estancada y luego instalaron protectores de hojas para mantenerlas fluyendo bien. Muy satisfecho con la calidad.", name:"David K.", context:"Canaletas + Protectores de Hojas" },
      { text:"Gran experiencia. Arreglaron y agregaron una canaleta nueva. No podria estar mas satisfecho con su trabajo y el trato de su personal profesional y amable.", name:"Johnny C.", context:"Post-Tormenta + Protectores" },
      { text:"Chris y su equipo son increibles! Gran servicio al cliente y mejor calidad de trabajo aun! Chris se tomo el tiempo de explicarme y educarme sobre todo antes de que comenzara el proyecto.", name:"JR One Customer", context:"Instalacion de Protectores" },
    ],
    faqTag: "PREGUNTAS FRECUENTES",
    faqTitle: "PREGUNTAS SOBRE PROTECTORES DE CANALETAS",
    faqs: [
      { q:"Los protectores de canaletas realmente funcionan?", a:"Si — los protectores son altamente efectivos para mantener los escombros fuera de sus canaletas y prevenir obstrucciones en sus bajantes y sistema de drenaje. Dicho esto, no son instalar y olvidar. Los escombros superficiales aun pueden acumularse sobre los protectores con el tiempo y necesitan limpieza periodica. La diferencia es que limpiar la parte superior de un protector es mucho mas rapido y facil que sacar escombros compactados de una canaleta obstruida a mano." },
      { q:"Aun necesito limpiar mis canaletas despues de instalar protectores?", a:"Si, pero con mucha menos frecuencia y mucho mas facilmente. Los protectores evitan que los escombros entren en sus canaletas y obstruyan sus bajantes — ese es el verdadero problema que causan danos y que resuelven. La acumulacion superficial sobre los protectores aun necesita limpieza ocasional. Ofrecemos programas de mantenimiento para manejar esto por usted, para que sus protectores y canaletas sigan funcionando todo el ano." },
      { q:"Cuanto cuestan los protectores de canaletas en Tampa?", a:"La instalacion de protectores generalmente oscila entre $7–$18 por pie lineal dependiendo del tipo de protector, accesibilidad de la canaleta y si sus canaletas existentes necesitan reparacion primero. Los sistemas premium de micro malla estan en el extremo superior. Proporcionamos estimados detallados sin costos ocultos." },
      { q:"Se pueden instalar protectores en mis canaletas existentes?", a:"En la mayoria de los casos, si. Si sus canaletas actuales estan en buenas condiciones con la inclinacion correcta y sin dano estructural, los protectores se instalan directamente encima. Durante nuestra evaluacion, inspeccionamos sus canaletas y le informamos si se necesitan reparaciones primero." },
      { q:"Cual es el mejor protector para agujas de pino?", a:"Los protectores de micro malla son la opcion mas efectiva para agujas de pino. Los protectores de malla estandar tienen aberturas lo suficientemente grandes para que las agujas pasen. Si tiene pinos cerca de su linea de techo, recomendaremos especificamente un sistema de micro malla clasificado para escombros finos." },
      { q:"Cual es la diferencia entre sus protectores y LeafFilter?", a:"Empresas nacionales como LeafFilter usan tacticas de venta de alta presion, cobran precios premium y subcontratan la instalacion real a equipos locales. Nosotros somos el equipo local — usted trata directamente con nosotros, obtiene precios honestos sin el sobrecargo de franquicia, y nuestro equipo hace tanto la consulta como la instalacion." },
      { q:"Ofrecen mantenimiento para protectores de canaletas?", a:"Si. Ofrecemos programas de mantenimiento estacional que incluyen limpiar cualquier escombro superficial de sus protectores, inspeccionar los puntos de fijacion, lavar los bajantes y verificar la condicion general de su sistema de canaletas. Es la mejor manera de proteger su inversion en protectores y mantener todo funcionando." },
    ],
    ctaTitle: "LISTO PARA PROTEGER SUS CANALETAS?",
    ctaSub: "Obtenga su evaluacion gratuita de protectores de canaletas. Inspeccionaremos sus canaletas, evaluaremos su cobertura de arboles y recomendaremos la proteccion adecuada — mas opciones de mantenimiento para mantener todo funcionando a largo plazo.",
    formTitle: "Obtenga Su Estimado Gratis de Protectores",
    formName: "Nombre Completo",
    formPhone: "Numero de Telefono",
    formEmail: "Correo Electronico",
    formZip: "Codigo Postal",
    formBtn: "SOLICITAR MI ESTIMADO GRATIS DE PROTECTORES",
    formDisclaimer: "Sin spam. Sin presion. Solo consejo honesto de expertos.",
    formSuccess: "Solicitud de Cotizacion Recibida!",
    formSuccessSub: "Nos comunicaremos con usted en pocas horas.",
    preferTalk: "Prefiere hablar?",
    stepLabel: "PASO",
  },
};

export default function GutterGuardsPage() {
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
      <section className="hero-stars" style={{padding:"60px 24px 80px",maxWidth:"1200px",margin:"0 auto",display:"flex",gap:"48px",alignItems:"center",flexWrap:"wrap"}}>
        <div style={{flex:"1 1 500px",minWidth:"300px"}}>
          <Tag>{t.heroTag}</Tag>
          <h1 style={{fontFamily:f.h,fontSize:"clamp(32px,5vw,48px)",fontWeight:800,lineHeight:1.1,marginBottom:"20px"}}>{t.heroH1}<br/><span style={{color:C.accent}}>{t.heroH1Gold}</span></h1>
          <p style={{fontFamily:f.b,fontSize:"18px",color:C.offWhite,lineHeight:1.7,marginBottom:"32px",maxWidth:"560px"}}>{t.heroP}</p>
          <div style={{display:"flex",gap:"16px",flexWrap:"wrap"}}>
            <button onClick={()=>document.getElementById("quote-form")?.scrollIntoView({behavior:"smooth"})} style={{padding:"16px 36px",fontFamily:f.h,fontSize:"14px",fontWeight:700,letterSpacing:"1.5px",color:C.white,background:`linear-gradient(135deg,${C.accent},${C.accentLight})`,border:"none",borderRadius:"8px",cursor:"pointer",boxShadow:"0 4px 16px rgba(139,157,175,0.3)"}}>{t.btnEstimate}</button>
            <a href="tel:8444443114" style={{display:"inline-flex",alignItems:"center",padding:"16px 36px",fontFamily:f.h,fontSize:"14px",fontWeight:700,letterSpacing:"1.5px",color:C.accent,background:"transparent",border:`2px solid ${C.accent}`,borderRadius:"8px",textDecoration:"none"}}>📞 {t.btnCall}</a>
          </div>
          <div style={{display:"flex",gap:"24px",marginTop:"32px",flexWrap:"wrap"}}>{t.stats.map((s,i) => <div key={i} style={{textAlign:"center"}}><div style={{fontFamily:f.h,fontSize:"28px",fontWeight:800,color:C.accent}}>{s.value}</div><div style={{fontFamily:f.b,fontSize:"12px",color:C.muted,maxWidth:"100px"}}>{s.label}</div></div>)}</div>
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

      {/* GUARD TYPES */}
      <section style={{ background: C.navy, padding: "80px 24px" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div style={{ textAlign: "center" }}>
            <Tag>{t.guardTag}</Tag>
            <h2 style={{ fontFamily: f.h, fontSize: "clamp(24px,4vw,36px)", fontWeight: 800, letterSpacing: "2px", textAlign: "center", marginBottom: "8px", color: C.white }}>{t.guardTitle}</h2>
            <GoldBar />
            <p style={{ fontFamily: f.b, fontSize: "17px", color: C.muted, maxWidth: "600px", margin: "0 auto 48px" }}>
              {t.guardSub}
            </p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: "20px" }}>
            {t.guardTypes.map((g, i) => (
              <div key={i} style={{ background: C.navyFade, border: `1px solid ${C.navyLight}`, borderRadius: "12px", padding: "28px", borderTop: `4px solid ${C.gold}` }}>
                <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "12px" }}>
                  <span style={{ fontSize: "28px" }}>{g.icon}</span>
                </div>
                <h3 style={{ fontFamily: f.h, fontSize: "17px", fontWeight: 700, color: C.white, marginBottom: "10px" }}>{g.title}</h3>
                <p style={{ fontFamily: f.b, fontSize: "15px", color: C.muted, lineHeight: 1.6, marginBottom: "12px" }}>{g.desc}</p>
                <div style={{ fontFamily: f.h, fontSize: "12px", fontWeight: 600, color: C.gold, letterSpacing: "1px", padding: "6px 12px", background: C.goldPale, borderRadius: "4px", display: "inline-block" }}>{g.spec}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

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
