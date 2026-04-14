"use client";

import { useState, useEffect } from "react";
import { useLanguage } from "../../lib/LanguageContext";
import SiteNav from "../../components/SiteNav";
import SiteFooter from "../../components/SiteFooter";
import MobileCTA from "../../components/MobileCTA";

const injectFonts = () => { if (typeof document==="undefined"||document.querySelector("#jr-fonts")) return; const l=document.createElement("link"); l.id="jr-fonts"; l.rel="stylesheet"; l.href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800&family=Source+Sans+3:wght@300;400;600&display=swap"; document.head.appendChild(l); };
const C = { bg:"#0B1628",navy:"#1B2A4A",navyMid:"#243556",navyLight:"#2C3E5A",navyFade:"#162033",gold:"#C8952E",goldLight:"#D4A843",goldPale:"rgba(200,149,46,0.12)",cream:"#F5F3EF",white:"#FFFFFF",offWhite:"#E8E4DC",muted:"#7A8FA8",charcoal:"#2D2D2D",success:"#2D8B4E",successDim:"rgba(45,139,78,0.15)",accent:"#2563EB",accentLight:"#3B82F6",accentPale:"rgba(37,99,235,0.12)" };
const f = { h:"'Montserrat', sans-serif", b:"'Source Sans 3', sans-serif" };
const Tag = ({children}) => <div style={{display:"inline-block",padding:"6px 16px",background:C.accentPale,borderRadius:"4px",marginBottom:"12px"}}><span style={{fontFamily:f.h,fontSize:"12px",fontWeight:700,color:C.accent,letterSpacing:"3px"}}>{children}</span></div>;
const GoldBar = () => <div style={{width:"60px",height:"3px",background:`linear-gradient(90deg,${C.accent},${C.accentLight})`,borderRadius:"2px",margin:"16px auto"}} />;
const inputStyle = {width:"100%",padding:"13px 16px",fontFamily:f.b,fontSize:"15px",border:"1.5px solid #D1D5DB",borderRadius:"8px",outline:"none",color:C.charcoal,marginBottom:"12px",background:"#FAFAFA",boxSizing:"border-box"};

const T = {
  en: {
    breadcrumbHome: "Home",
    breadcrumbServices: "Services",
    breadcrumbPage: "Drainage Installation",
    heroTag: "DRAINAGE INSTALLATION",
    heroH1: "Stop the Flooding.",
    heroH1Accent: "We Install the Fix.",
    heroP: "Florida dumps over 50 inches of rain per year on your home. When your gutters and downspouts aren't enough, you need a real drainage system. We install French drains, underground drainage lines, downspout extensions, catch basins, and channel drains — everything needed to move water away from your foundation and keep your property dry.",
    heroCta: "SCHEDULE ASSESSMENT",
    heroCall: "CALL (844) 444-3114",
    problemTag: "THE PROBLEM",
    problemTitle: "WHAT HAPPENS WHEN WATER HAS NOWHERE TO GO",
    problems: [
      { icon:"🌊", title:"Foundation pooling and damage", desc:"Water collecting around your foundation causes cracks, settling, and structural damage averaging $5,000–$15,000 in repairs. A properly installed drainage system eliminates this." },
      { icon:"🏚️", title:"Yard flooding after every storm", desc:"If your yard turns into a swamp every time it rains, your property doesn't have adequate drainage. We install systems that move water underground and away from your home." },
      { icon:"🌿", title:"Landscape and hardscape erosion", desc:"Uncontrolled water flow destroys mulch beds, washes out plantings, undermines pavers and walkways, and creates permanent mud pits." },
      { icon:"🦟", title:"Standing water breeds pests", desc:"Pooling water that won't drain creates mosquito breeding grounds and attracts pests year-round. Proper drainage eliminates standing water entirely." },
    ],
    installTag: "WHAT WE INSTALL",
    installTitle: "COMPLETE DRAINAGE SOLUTIONS",
    installSub: "Six drainage systems we install to solve your water problems permanently.",
    whatWeInstall: [
      { title:"French Drains", desc:"Perforated pipe installed in a gravel-filled trench that collects subsurface water and redirects it away from your foundation. The most effective solution for persistent yard flooding and foundation pooling." },
      { title:"Underground Drainage Lines", desc:"Solid PVC pipe installed underground to carry water from your downspouts to a discharge point far from your home. Eliminates surface water entirely — everything flows underground." },
      { title:"Downspout Extensions & Rerouting", desc:"When your downspouts dump water too close to your foundation, we extend and reroute them — above ground or underground — to discharge at a safe distance." },
      { title:"Catch Basins & Grates", desc:"Surface-level collection points that capture standing water from low spots in your yard and feed it into the underground drainage system." },
      { title:"Channel Drains", desc:"Linear drains installed across driveways, patios, and walkways to intercept surface water before it reaches your home. Essential for sloped driveways and patio areas." },
      { title:"Pop-Up Emitters", desc:"Discharge points that open when water flows through the system and close when dry. Installed at the end of underground lines to release water away from your home without visible pipes in the yard." },
    ],
    peakAlertLabel: "FLORIDA INSURANCE ALERT",
    peakAlertTitle: "280% Increase in Non-Renewals — Roof Over 15 Years Old?",
    peakAlertDesc: "restores shingles from the inside out — adds 6–10 years without the $15K–$25K+ replacement bill, with warranty docs your insurer must accept under FL law.",
    peakBtn: "PEAK 301 INFO →",
    peakRightsBtn: "YOUR RIGHTS →",
    processTag: "THE PROCESS",
    processTitle: "HOW WE SOLVE DRAINAGE PROBLEMS",
    processSub: "Inspect. Diagnose. Recommend. Fix.",
    goldSteps: [
      { num:"01", title:"EVALUATE", desc:"We inspect your property, identify where water is pooling and why, trace existing downspout paths, check grading, and determine exactly what drainage system your property needs." },
      { num:"02", title:"DESIGN", desc:"Custom drainage plan with pipe routing, catch basin placement, discharge points, and integration with your existing gutter system. You see the plan and pricing before any digging starts." },
      { num:"03", title:"INSTALL", desc:"Our in-house crew handles all trenching, pipe installation, catch basin placement, backfill, and landscape restoration. Most residential drainage installs are completed in 1–2 days." },
      { num:"04", title:"VERIFY", desc:"We test the entire system with water flow to confirm proper drainage. You see it working before we leave. Backed by our craftsmanship warranty." },
    ],
    stepLabel: "STEP",
    faqTag: "FAQ",
    faqTitle: "DRAINAGE INSTALLATION QUESTIONS",
    faqs: [
      { q:"How much does drainage installation cost?", a:"Drainage installation costs vary based on the type of system, property size, trenching requirements, and complexity. Contact us for a free on-site evaluation and detailed estimate. We provide transparent line-item pricing before any work begins." },
      { q:"How long does installation take?", a:"Most residential drainage installations take 1–2 days. Larger properties or complex systems with multiple French drains and catch basins may take 2–3 days. We give you a specific timeline before work begins." },
      { q:"Do you install French drains?", a:"Yes. French drains are one of our most commonly installed drainage solutions. We install them along foundations, across yards, and alongside driveways to collect and redirect subsurface water." },
      { q:"Will you tear up my yard?", a:"We trench where needed and restore the surface afterward — including re-grading, re-sodding, or replacing mulch. We minimize disruption and clean up completely. Your yard will look better than before because the drainage problems will be solved." },
      { q:"Can you connect drainage to my existing gutter system?", a:"Yes — that's one of our specialties. We integrate underground drainage lines with your existing downspouts so roof water is captured and routed away from your foundation entirely. This is often the most impactful upgrade we do." },
      { q:"What if I also need new gutters?", a:"We bundle gutter installation with drainage work regularly. Installing both at the same time is more cost-effective and ensures the entire water management system works together from roof to discharge point." },
    ],
    ctaTitle: "GET YOUR DRAINAGE SYSTEM INSTALLED",
    ctaSub: "Stop fighting the water. We'll design and install the drainage system your property needs — and you'll see the difference after the next rain.",
    formTitle: "Request Your Drainage Estimate",
    formName: "Full Name",
    formPhone: "Phone Number",
    formEmail: "Email Address",
    formZip: "ZIP Code",
    formBtn: "REQUEST MY DRAINAGE ESTIMATE",
    formDisclaimer: "No spam. No pressure. Just honest expert advice.",
    successTitle: "Estimate Request Received!",
    successMsg: "We'll get back to you within hours.",
    preferTalk: "Prefer to talk?",
  },
  es: {
    breadcrumbHome: "Inicio",
    breadcrumbServices: "Servicios",
    breadcrumbPage: "Instalacion de Drenaje",
    heroTag: "INSTALACION DE DRENAJE",
    heroH1: "Detenga las Inundaciones.",
    heroH1Accent: "Nosotros Instalamos la Solucion.",
    heroP: "Florida descarga mas de 50 pulgadas de lluvia al ano sobre su casa. Cuando sus canalones y bajantes no son suficientes, necesita un sistema de drenaje real. Instalamos drenajes franceses, lineas de drenaje subterraneas, extensiones de bajantes, sumideros y drenajes de canal — todo lo necesario para mover el agua lejos de sus cimientos y mantener su propiedad seca.",
    heroCta: "PROGRAMAR EVALUACION",
    heroCall: "LLAME AL (844) 444-3114",
    problemTag: "EL PROBLEMA",
    problemTitle: "QUE PASA CUANDO EL AGUA NO TIENE A DONDE IR",
    problems: [
      { icon:"🌊", title:"Acumulacion de agua y dano a cimientos", desc:"El agua que se acumula alrededor de sus cimientos causa grietas, asentamiento y dano estructural que promedia $5,000–$15,000 en reparaciones. Un sistema de drenaje correctamente instalado elimina esto." },
      { icon:"🏚️", title:"Inundacion del patio despues de cada tormenta", desc:"Si su patio se convierte en un pantano cada vez que llueve, su propiedad no tiene drenaje adecuado. Instalamos sistemas que mueven el agua bajo tierra y lejos de su casa." },
      { icon:"🌿", title:"Erosion del paisaje y superficies duras", desc:"El flujo de agua descontrolado destruye camas de mantillo, arrasa plantaciones, socava adoquines y caminos, y crea charcos de lodo permanentes." },
      { icon:"🦟", title:"El agua estancada cria plagas", desc:"El agua acumulada que no drena crea criaderos de mosquitos y atrae plagas todo el ano. El drenaje adecuado elimina el agua estancada por completo." },
    ],
    installTag: "LO QUE INSTALAMOS",
    installTitle: "SOLUCIONES DE DRENAJE COMPLETAS",
    installSub: "Seis sistemas de drenaje que instalamos para resolver sus problemas de agua permanentemente.",
    whatWeInstall: [
      { title:"Drenajes Franceses", desc:"Tuberia perforada instalada en una zanja llena de grava que recolecta agua subsuperficial y la redirige lejos de sus cimientos. La solucion mas efectiva para inundaciones persistentes del patio y acumulacion en cimientos." },
      { title:"Lineas de Drenaje Subterraneas", desc:"Tuberia PVC solida instalada bajo tierra para llevar agua desde sus bajantes a un punto de descarga lejos de su casa. Elimina el agua superficial por completo — todo fluye bajo tierra." },
      { title:"Extensiones y Redireccion de Bajantes", desc:"Cuando sus bajantes descargan agua demasiado cerca de sus cimientos, las extendemos y redirigimos — sobre o bajo tierra — para descargar a una distancia segura." },
      { title:"Sumideros y Rejillas", desc:"Puntos de recoleccion a nivel de superficie que capturan agua estancada de puntos bajos en su patio y la alimentan al sistema de drenaje subterraneo." },
      { title:"Drenajes de Canal", desc:"Drenajes lineales instalados a traves de entradas, patios y caminos para interceptar agua superficial antes de que llegue a su casa. Esenciales para entradas inclinadas y areas de patio." },
      { title:"Emisores Emergentes", desc:"Puntos de descarga que se abren cuando el agua fluye por el sistema y se cierran cuando estan secos. Instalados al final de las lineas subterraneas para liberar agua lejos de su casa sin tuberias visibles en el patio." },
    ],
    peakAlertLabel: "ALERTA DE SEGUROS DE FLORIDA",
    peakAlertTitle: "280% de Aumento en No Renovaciones — Techo de Mas de 15 Anos?",
    peakAlertDesc: "restaura las tejas desde adentro — agrega 6–10 anos sin la cuenta de $15K–$25K+ de un reemplazo, con documentos de garantia que su aseguradora debe aceptar bajo la ley de FL.",
    peakBtn: "INFO PEAK 301 →",
    peakRightsBtn: "SUS DERECHOS →",
    processTag: "EL PROCESO",
    processTitle: "COMO RESOLVEMOS PROBLEMAS DE DRENAJE",
    processSub: "Inspeccionar. Diagnosticar. Recomendar. Reparar.",
    goldSteps: [
      { num:"01", title:"EVALUAR", desc:"Inspeccionamos su propiedad, identificamos donde se acumula el agua y por que, rastreamos los caminos existentes de bajantes, verificamos la nivelacion y determinamos exactamente que sistema de drenaje necesita su propiedad." },
      { num:"02", title:"DISENAR", desc:"Plan de drenaje personalizado con ruta de tuberias, ubicacion de sumideros, puntos de descarga e integracion con su sistema de canalones existente. Usted ve el plan y los precios antes de que comience cualquier excavacion." },
      { num:"03", title:"INSTALAR", desc:"Nuestro equipo propio maneja toda la excavacion, instalacion de tuberias, colocacion de sumideros, relleno y restauracion del paisaje. La mayoria de las instalaciones residenciales se completan en 1–2 dias." },
      { num:"04", title:"VERIFICAR", desc:"Probamos todo el sistema con flujo de agua para confirmar el drenaje adecuado. Usted lo ve funcionando antes de que nos vayamos. Respaldado por nuestra garantia de mano de obra." },
    ],
    stepLabel: "PASO",
    faqTag: "PREGUNTAS FRECUENTES",
    faqTitle: "PREGUNTAS SOBRE INSTALACION DE DRENAJE",
    faqs: [
      { q:"Cuanto cuesta la instalacion de drenaje?", a:"Los costos de instalacion de drenaje varian segun el tipo de sistema, tamano de la propiedad, requisitos de excavacion y complejidad. Contactenos para una evaluacion gratuita en sitio y un presupuesto detallado. Proporcionamos precios transparentes por partida antes de que comience cualquier trabajo." },
      { q:"Cuanto tiempo toma la instalacion?", a:"La mayoria de las instalaciones residenciales de drenaje toman 1–2 dias. Propiedades mas grandes o sistemas complejos con multiples drenajes franceses y sumideros pueden tomar 2–3 dias. Le damos un cronograma especifico antes de que comience el trabajo." },
      { q:"Instalan drenajes franceses?", a:"Si. Los drenajes franceses son una de nuestras soluciones de drenaje mas comunmente instaladas. Los instalamos a lo largo de cimientos, a traves de patios y junto a entradas para recolectar y redirigir agua subsuperficial." },
      { q:"Van a destruir mi patio?", a:"Excavamos donde se necesita y restauramos la superficie despues — incluyendo renivelacion, resiembra de cesped o reemplazo de mantillo. Minimizamos la interrupcion y limpiamos completamente. Su patio se vera mejor que antes porque los problemas de drenaje estaran resueltos." },
      { q:"Pueden conectar el drenaje a mi sistema de canalones existente?", a:"Si — esa es una de nuestras especialidades. Integramos lineas de drenaje subterraneas con sus bajantes existentes para que el agua del techo sea capturada y dirigida lejos de sus cimientos por completo. Esta es frecuentemente la mejora de mayor impacto que hacemos." },
      { q:"Que pasa si tambien necesito canalones nuevos?", a:"Combinamos la instalacion de canalones con trabajo de drenaje regularmente. Instalar ambos al mismo tiempo es mas economico y asegura que todo el sistema de manejo de agua funcione junto desde el techo hasta el punto de descarga." },
    ],
    ctaTitle: "INSTALE SU SISTEMA DE DRENAJE",
    ctaSub: "Deje de luchar contra el agua. Disenaremos e instalaremos el sistema de drenaje que su propiedad necesita — y vera la diferencia despues de la proxima lluvia.",
    formTitle: "Solicite Su Presupuesto de Drenaje",
    formName: "Nombre Completo",
    formPhone: "Numero de Telefono",
    formEmail: "Correo Electronico",
    formZip: "Codigo Postal",
    formBtn: "SOLICITAR MI PRESUPUESTO DE DRENAJE",
    formDisclaimer: "Sin spam. Sin presion. Solo consejos honestos de expertos.",
    successTitle: "Solicitud de Presupuesto Recibida!",
    successMsg: "Nos pondremos en contacto en horas.",
    preferTalk: "Prefiere hablar?",
  },
};

export default function DrainageAssessmentPage() {
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
      <div style={{padding:"16px 24px 0",maxWidth:"1200px",margin:"0 auto"}}><div style={{fontFamily:f.b,fontSize:"13px",color:C.muted}}><a href="/" style={{color:C.muted,textDecoration:"none"}}>{t.breadcrumbHome}</a><span style={{margin:"0 8px",opacity:0.5}}>/</span><span style={{color:C.muted}}>{t.breadcrumbServices}</span><span style={{margin:"0 8px",opacity:0.5}}>/</span><span style={{color:C.accent}}>{t.breadcrumbPage}</span></div></div>

      {/* HERO */}
      <section className="hero-stars" style={{padding:"60px 24px 80px",maxWidth:"1200px",margin:"0 auto"}}>
        <div style={{maxWidth:"700px"}}>
          <Tag>{t.heroTag}</Tag>
          <h1 style={{fontFamily:f.h,fontSize:"clamp(32px,5vw,48px)",fontWeight:800,lineHeight:1.1,marginBottom:"20px"}}>{t.heroH1}<br/><span style={{color:C.accent}}>{t.heroH1Accent}</span></h1>
          <p style={{fontFamily:f.b,fontSize:"18px",color:C.offWhite,lineHeight:1.7,marginBottom:"32px",maxWidth:"600px"}}>{t.heroP}</p>
          <div style={{display:"flex",gap:"16px",flexWrap:"wrap"}}>
            <button onClick={()=>document.getElementById("quote-form")?.scrollIntoView({behavior:"smooth"})} style={{padding:"16px 36px",fontFamily:f.h,fontSize:"14px",fontWeight:700,letterSpacing:"1.5px",color:C.white,background:`linear-gradient(135deg,${C.accent},${C.accentLight})`,border:"none",borderRadius:"8px",cursor:"pointer",boxShadow:"0 4px 16px rgba(37,99,235,0.3)"}}>{t.heroCta}</button>
            <a href="tel:8444443114" style={{display:"inline-flex",alignItems:"center",padding:"16px 36px",fontFamily:f.h,fontSize:"14px",fontWeight:700,letterSpacing:"1.5px",color:C.accent,border:`2px solid ${C.accent}`,borderRadius:"8px",textDecoration:"none"}}>📞 {t.heroCall}</a>
          </div>
        </div>
      </section>

      {/* PROBLEM */}
      <section style={{background:C.navy,padding:"80px 24px"}}>
        <div style={{...sec,padding:0}}><div style={{textAlign:"center"}}><Tag>{t.problemTag}</Tag><h2 style={{...secTitle,color:C.white}}>{t.problemTitle}</h2><GoldBar /></div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(250px,1fr))",gap:"24px",marginTop:"48px"}}>
            {t.problems.map((p,i) => <div key={i} style={{background:C.navyFade,borderRadius:"12px",padding:"28px",borderLeft:`4px solid ${C.accent}`,border:`1px solid ${C.navyLight}`}}>
              <div style={{fontSize:"28px",marginBottom:"12px"}}>{p.icon}</div>
              <h3 style={{fontFamily:f.h,fontSize:"17px",fontWeight:700,color:C.white,marginBottom:"8px"}}>{p.title}</h3>
              <p style={{fontFamily:f.b,fontSize:"15px",color:C.muted,lineHeight:1.55}}>{p.desc}</p>
            </div>)}
          </div>
        </div>
      </section>

      {/* WHAT WE INSTALL */}
      <section style={{background:C.bg,padding:"80px 24px"}}>
        <div style={sec}><div style={{textAlign:"center"}}><Tag>{t.installTag}</Tag><h2 style={{...secTitle,color:C.white}}>{t.installTitle}</h2><GoldBar /><p style={{fontFamily:f.b,fontSize:"17px",color:C.muted,maxWidth:"600px",margin:"0 auto 48px"}}>{t.installSub}</p></div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(340px,1fr))",gap:"20px"}}>
            {t.whatWeInstall.map((s,i) => <div key={i} style={{background:C.navyFade,border:`1px solid ${C.navyLight}`,borderRadius:"12px",padding:"28px",transition:"border-color 0.3s"}} onMouseOver={e=>e.currentTarget.style.borderColor=C.accent} onMouseOut={e=>e.currentTarget.style.borderColor=C.navyLight}>
              <div style={{fontFamily:f.h,fontSize:"11px",fontWeight:700,color:C.accent,letterSpacing:"2px",marginBottom:"8px"}}>0{i+1}</div>
              <h3 style={{fontFamily:f.h,fontSize:"17px",fontWeight:700,color:C.white,marginBottom:"10px"}}>{s.title}</h3>
              <p style={{fontFamily:f.b,fontSize:"15px",color:C.muted,lineHeight:1.6}}>{s.desc}</p>
            </div>)}
          </div>
        </div>
      </section>

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
      <section style={{background:C.navy,padding:"80px 24px"}}>
        <div style={sec}><div style={{textAlign:"center"}}><Tag>{t.processTag}</Tag><h2 style={{...secTitle,color:C.white}}>{t.processTitle}</h2><GoldBar /><p style={{fontFamily:f.b,fontSize:"17px",color:C.offWhite,fontStyle:"italic",maxWidth:"500px",margin:"0 auto 48px"}}>{t.processSub}</p></div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(250px,1fr))",gap:"24px"}}>
            {t.goldSteps.map((step,i) => <div key={i} style={{background:C.navyFade,border:`1px solid ${C.navyLight}`,borderRadius:"12px",padding:"28px",position:"relative"}}>
              <div style={{fontFamily:f.h,fontSize:"36px",fontWeight:800,color:"rgba(37,99,235,0.08)",position:"absolute",top:"16px",right:"20px"}}>{step.num}</div>
              <div style={{fontFamily:f.h,fontSize:"11px",fontWeight:700,color:C.accent,letterSpacing:"3px",marginBottom:"8px"}}>{t.stepLabel} {step.num}</div>
              <h3 style={{fontFamily:f.h,fontSize:"22px",fontWeight:700,color:C.white,marginBottom:"12px"}}>{step.title}</h3>
              <p style={{fontFamily:f.b,fontSize:"15px",color:C.muted,lineHeight:1.6}}>{step.desc}</p>
            </div>)}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section style={{background:C.bg,padding:"80px 24px"}}>
        <div style={{maxWidth:"800px",margin:"0 auto",textAlign:"center"}}>
          <Tag>{t.faqTag}</Tag><h2 style={{...secTitle,color:C.white}}>{t.faqTitle}</h2><GoldBar />
          <div style={{marginTop:"40px",textAlign:"left"}}>
            {t.faqs.map((faq,i) => <div key={i} style={{borderBottom:`1px solid ${C.navyLight}`}}>
              <button onClick={()=>setOpenFaq(openFaq===i?null:i)} style={{width:"100%",padding:"20px 0",background:"none",border:"none",cursor:"pointer",display:"flex",justifyContent:"space-between",alignItems:"center",gap:"16px"}}>
                <span style={{fontFamily:f.h,fontSize:"15px",fontWeight:600,color:openFaq===i?C.accent:C.white,textAlign:"left",transition:"color 0.2s"}}>{faq.q}</span>
                <span style={{fontFamily:f.h,fontSize:"20px",color:C.accent,transform:openFaq===i?"rotate(45deg)":"none",transition:"transform 0.3s",flexShrink:0}}>+</span>
              </button>
              {openFaq===i&&<div style={{padding:"0 0 20px",fontFamily:f.b,fontSize:"15px",color:C.muted,lineHeight:1.65}}>{faq.a}</div>}
            </div>)}
          </div>
        </div>
      </section>

      {/* CTA FORM */}
      <section id="quote-form" style={{background:`linear-gradient(165deg,${C.navyMid},${C.navy})`,padding:"80px 24px"}}>
        <div style={{maxWidth:"600px",margin:"0 auto",textAlign:"center"}}>
          <h2 style={{fontFamily:f.h,fontSize:"clamp(28px,5vw,40px)",fontWeight:800,color:C.white,marginBottom:"12px"}}>{t.ctaTitle}</h2>
          <p style={{fontFamily:f.b,fontSize:"17px",color:C.offWhite,marginBottom:"40px"}}>{t.ctaSub}</p>
          {submitted ? <div style={{background:C.successDim,border:`1px solid ${C.success}`,borderRadius:"12px",padding:"32px"}}><div style={{fontSize:"48px",marginBottom:"12px"}}>✓</div><h3 style={{fontFamily:f.h,fontSize:"20px",fontWeight:700,color:"#4ADE80"}}>{t.successTitle}</h3><p style={{fontFamily:f.b,fontSize:"15px",color:C.muted,marginTop:"8px"}}>{t.successMsg}</p></div> : <div style={{background:C.white,borderRadius:"16px",padding:"32px",boxShadow:"0 24px 80px rgba(0,0,0,0.4)",textAlign:"left"}}>
            <h3 style={{fontFamily:f.h,fontSize:"18px",fontWeight:700,color:C.navy,textAlign:"center",marginBottom:"4px"}}>{t.formTitle}</h3>
            <div style={{width:"40px",height:"3px",background:C.accent,borderRadius:"2px",margin:"10px auto 20px"}} />
            <input style={inputStyle} placeholder={t.formName} value={formData.name} onChange={e=>setFormData({...formData,name:e.target.value})} />
            <input style={inputStyle} placeholder={t.formPhone} type="tel" value={formData.phone} onChange={e=>setFormData({...formData,phone:e.target.value})} />
            <input style={inputStyle} placeholder={t.formEmail} type="email" value={formData.email} onChange={e=>setFormData({...formData,email:e.target.value})} />
            <input style={inputStyle} placeholder={t.formZip} value={formData.zip} onChange={e=>setFormData({...formData,zip:e.target.value})} maxLength={5} />
            <button onClick={()=>setSubmitted(true)} style={{width:"100%",padding:"16px",fontFamily:f.h,fontSize:"14px",fontWeight:700,letterSpacing:"1.5px",color:C.white,background:`linear-gradient(135deg,${C.accent},${C.accentLight})`,border:"none",borderRadius:"8px",cursor:"pointer",boxShadow:"0 4px 16px rgba(37,99,235,0.3)"}}>{t.formBtn}</button>
            <p style={{fontFamily:f.b,fontSize:"12px",color:"#9CA3AF",textAlign:"center",marginTop:"12px"}}>{t.formDisclaimer}</p>
          </div>}
          <div style={{marginTop:"32px"}}><p style={{fontFamily:f.b,fontSize:"15px",color:C.muted,marginBottom:"8px"}}>{t.preferTalk}</p><a href="tel:8444443114" style={{fontFamily:f.h,fontSize:"18px",fontWeight:700,color:C.gold,textDecoration:"none"}}>📞 (844) 444-3114</a></div>
        </div>
      </section>

      <SiteFooter />
      <MobileCTA scrollTarget="quote-form" />
      <style>{`*{box-sizing:border-box;margin:0;padding:0}::placeholder{color:#9CA3AF}input:focus{border-color:${C.accent}!important}`}</style>
    </div>
  );
}
