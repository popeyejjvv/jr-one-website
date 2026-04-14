"use client";

import { useState, useEffect } from "react";
import { useLanguage } from "../../lib/LanguageContext";
import SiteNav from "../../components/SiteNav";
import SiteFooter from "../../components/SiteFooter";
import MobileCTA from "../../components/MobileCTA";

const injectFonts = () => { if (typeof document==="undefined"||document.querySelector("#jr-fonts")) return; const l=document.createElement("link"); l.id="jr-fonts"; l.rel="stylesheet"; l.href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800&family=Source+Sans+3:wght@300;400;600&display=swap"; document.head.appendChild(l); };
const C = { bg:"#0B1628",navy:"#1B2A4A",navyMid:"#243556",navyLight:"#2C3E5A",navyFade:"#162033",gold:"#C8952E",goldLight:"#D4A843",goldPale:"rgba(200,149,46,0.12)",cream:"#F5F3EF",white:"#FFFFFF",offWhite:"#E8E4DC",muted:"#7A8FA8",charcoal:"#2D2D2D",success:"#2D8B4E",successDim:"rgba(45,139,78,0.15)",alert:"#B11A21",alertDim:"rgba(177,26,33,0.12)",accent:"#B11A21",accentLight:"#D42A2A",accentPale:"rgba(177,26,33,0.12)" };
const f = { h:"'Montserrat', sans-serif", b:"'Source Sans 3', sans-serif" };
const Tag = ({children}) => <div style={{display:"inline-block",padding:"6px 16px",background:C.accentPale,borderRadius:"4px",marginBottom:"12px"}}><span style={{fontFamily:f.h,fontSize:"12px",fontWeight:700,color:C.accent,letterSpacing:"3px"}}>{children}</span></div>;
const AlertTag = ({children}) => <div style={{display:"inline-block",padding:"6px 16px",background:C.alertDim,borderRadius:"4px",marginBottom:"12px"}}><span style={{fontFamily:f.h,fontSize:"12px",fontWeight:700,color:C.alert,letterSpacing:"3px"}}>{children}</span></div>;
const GoldBar = () => <div style={{width:"60px",height:"3px",background:`linear-gradient(90deg,${C.accent},${C.accentLight})`,borderRadius:"2px",margin:"16px auto"}} />;
const Stars = () => <span style={{color:C.accent,fontSize:"14px",letterSpacing:"2px"}}>★★★★★</span>;
const inputStyle = {width:"100%",padding:"13px 16px",fontFamily:f.b,fontSize:"15px",border:"1.5px solid #D1D5DB",borderRadius:"8px",outline:"none",color:C.charcoal,marginBottom:"12px",background:"#FAFAFA",boxSizing:"border-box"};

const T = {
  en: {
    breadcrumb: ["Home","Services","Peak 301 Roof Rejuvenation"],
    promoBanner: "Florida Roof Insurance Under Threat — Peak 301 Can Help — Call (844) 444-3114",
    heroTag: "ROOF REJUVENATION",
    heroH1: "Your Roof Has Years Left.",
    heroH1Gold: "Peak 301 Proves It.",
    heroP: "Peak 301 is an all-natural, soy-based sealant that penetrates your shingles and restores them from the inside out — adding 6 to 10 years of life to your existing roof and skipping the $15,000–$25,000+ replacement bill. Plus, it comes with warranty documentation your insurance company needs to see.",
    heroCta: "GET YOUR FREE ROOF ASSESSMENT",
    heroCall: "CALL (844) 444-3114",
    stats: [
      { value:"6–10", label:"Years added to roof life" },
      { value:"$1,000s", label:"vs. $15K–$25K+ replacement" },
      { value:"280%", label:"FL insurance non-renewal increase" },
      { value:"100%", label:"Natural soy-based formula" },
    ],
    insuranceAlert: {
      title: "IS YOUR INSURANCE AT RISK?",
      stat1: "280%",
      stat1Label: "increase in Florida homeowner policy non-renewals since 2018",
      stat2: "15 Years",
      stat2Label: "— the roof age at which most Florida insurers start dropping coverage",
      desc: "Florida insurance companies are canceling homeowner policies at record rates based on roof age alone — even if your roof isn't leaking. If your roof is 15+ years old, you may already be on borrowed time. Peak 301 helps your roof meet the 5-year useful life threshold insurers require to maintain your coverage.",
      cta: "INSURANCE RESOURCE CENTER — KNOW YOUR RIGHTS →",
      sub: "Florida law protects homeowners from losing insurance solely due to roof age. Learn the laws, the carrier types, and get free document templates.",
    },
    problemTag: "THE PROBLEM",
    problemTitle: "WHY TAMPA HOMEOWNERS ARE LOSING COVERAGE",
    problems: [
      { icon:"📋", title:"Insurance non-renewal notices", desc:"Florida insurers are dropping homeowners with roofs over 15 years old — regardless of condition. A non-renewal letter means scrambling for expensive surplus coverage or facing a gap in protection." },
      { icon:"💰", title:"Full replacement costs $15K–$25K+", desc:"A new roof is one of the most expensive home repairs. Many homeowners can't afford it on short notice — and shouldn't have to if their existing roof still has structural life left." },
      { icon:"🔄", title:"Shingle deterioration from inside", desc:"Florida's UV exposure and heat cycles dry out the oils in your shingles over time. They become brittle, crack, curl, and lose granules — not because they're worn out, but because they're dried out." },
      { icon:"🌪️", title:"Storm vulnerability increases with age", desc:"Dried, brittle shingles are far more likely to lift, crack, or fly off during hurricane-force winds. Restored flexibility means better storm performance." },
    ],
    solutionTag: "THE SOLUTION",
    solutionTitle: "HOW PEAK 301 SAVES YOUR ROOF — AND YOUR INSURANCE",
    solutionSub: "A soy-based sealant that restores your shingles from the inside out. Not a coating. Not a paint. A genuine rejuvenation treatment.",
    solutions: [
      { title:"Soy-based sealant — not a coating", desc:"Peak 301 is not a paint, spray, or surface coating. It's a soy-based sealant that penetrates into your shingle material and restores the oils that UV and heat have depleted. It rejuvenates from the inside out, restoring flexibility and waterproofing at the molecular level." },
      { title:"Adds 6–10 years of roof life", desc:"By restoring the oils that keep shingles pliable and water-resistant, Peak 301 extends your roof's functional lifespan by 6 to 10 years. That's 6 to 10 more years before you need to think about the $15K–$25K+ replacement conversation." },
      { title:"Thousands — not tens of thousands", desc:"A full roof replacement runs $15,000–$25,000+ in Tampa. Peak 301 treatment is measured in thousands — giving you years of additional protection at a price point that makes financial sense." },
      { title:"Warranty documentation for insurers", desc:"Peak 301 comes with official warranty documentation that demonstrates your roof has been professionally treated and has verified useful life remaining. This is exactly the documentation Florida insurers need to see when evaluating your policy." },
      { title:"All-natural and eco-friendly", desc:"The soy-based formula is non-toxic, biodegradable, and safe for your landscaping, pets, and family. No harsh chemicals, no toxic fumes, no environmental concerns." },
      { title:"Applied by our trained crew", desc:"Like everything we do, Peak 301 application is performed by our own trained team — not subcontracted. We inspect your roof's condition, apply the sealant properly, and document the treatment for your records." },
    ],
    mathTag: "THE MATH",
    mathTitle: "REJUVENATION VS. REPLACEMENT",
    mathReplacementLabel: "FULL REPLACEMENT",
    mathReplacementPrice: "$15K–$25K+",
    mathReplacementDesc: "Major disruption, weeks of scheduling, significant financial stress",
    mathPeakLabel: "PEAK 301 TREATMENT",
    mathPeakPrice: "$1,000s",
    mathPeakDesc: "One day. Warranty documentation included. No tens-of-thousands check to cut.",
    mathSub: "Why spend $20,000 on a new roof when your existing roof can be restored for a few thousand dollars?",
    goldTag: "THE GOLD STANDARD",
    goldTitle: "OUR PEAK 301 PROCESS",
    goldSub: "Every home. Every time. No exceptions.",
    goldSteps: [
      { num:"01", title:"ASSESS", desc:"We inspect your roof's current condition, age, and shingle type to determine if Peak 301 is the right solution. Not every roof is a candidate — we'll be honest if yours isn't." },
      { num:"02", title:"DESIGN", desc:"Treatment plan based on your roof's specific needs, transparent pricing, and a clear explanation of what to expect — including the warranty documentation you'll receive." },
      { num:"03", title:"INSTALL", desc:"Our crew applies the Peak 301 sealant across your entire roof surface. The soy-based formula penetrates and begins restoring your shingles from the inside immediately." },
      { num:"04", title:"PROTECT", desc:"You receive official warranty documentation showing your roof has been professionally treated. This is the documentation you provide to your insurance company to demonstrate roof viability." },
    ],
    stepLabel: "STEP",
    faqTag: "FAQ",
    faqTitle: "PEAK 301 QUESTIONS",
    faqs: [
      { q:"What exactly is Peak 301?", a:"Peak 301 is an all-natural, soy-based roof rejuvenation sealant. It penetrates into your shingle material and restores the oils that UV exposure and heat have depleted over time. It is not a coating, paint, or spray — it works from the inside of the shingle out, restoring flexibility, waterproofing, and structural integrity." },
      { q:"How much does Peak 301 treatment cost?", a:"Peak 301 treatment runs a few thousand dollars for most Tampa homes — a far smaller check than the $15,000–$25,000+ of a full roof replacement. We provide exact pricing after inspecting your specific roof." },
      { q:"Will Peak 301 help me keep my homeowner's insurance?", a:"That's one of its biggest benefits. Florida insurers are increasingly dropping coverage on roofs over 15 years old. Peak 301 treatment comes with warranty documentation that demonstrates your roof has been professionally rejuvenated and has verified useful life remaining — typically meeting the 5-year threshold insurers require." },
      { q:"How long does the treatment last?", a:"Peak 301 adds 6 to 10 years of life to your existing roof. The exact duration depends on your roof's current condition, age, and shingle type — which we assess before recommending treatment." },
      { q:"Is my roof a good candidate for Peak 301?", a:"Most asphalt shingle roofs between 8 and 20 years old are good candidates. Roofs with significant structural damage, missing shingles, or active leaks may need repairs first or may be beyond rejuvenation. We inspect your roof honestly and tell you whether Peak 301 makes sense or whether replacement is the better path." },
      { q:"Is the sealant safe for my home and landscaping?", a:"Yes. Peak 301 is an all-natural soy-based formula. It's non-toxic, biodegradable, and completely safe for your landscaping, pets, and family. No harsh chemicals or toxic fumes." },
      { q:"How long does the application take?", a:"Most residential Peak 301 applications are completed in a single day. The sealant begins penetrating and working immediately after application." },
      { q:"Can I see proof that Peak 301 works?", a:"Yes. We can show you documentation on the sealant's testing, performance data, and warranty terms. We can also connect you with homeowners in Tampa who have had the treatment and kept their insurance coverage as a result." },
    ],
    ctaTitle: "DON'T REPLACE YOUR ROOF UNTIL YOU CALL US",
    ctaSub: "Peak 301 could save you $15,000+ and keep your insurance intact. Get a free roof assessment to find out if your roof is a candidate for rejuvenation instead of replacement.",
    formTitle: "Get Your Free Roof Assessment",
    formName: "Full Name",
    formPhone: "Phone Number",
    formEmail: "Email Address",
    formZip: "ZIP Code",
    formBtn: "REQUEST MY FREE ROOF ASSESSMENT",
    formDisclaimer: "No spam. No pressure. Honest assessment of whether Peak 301 is right for your roof.",
    successTitle: "Assessment Request Received!",
    successMsg: "We'll get back to you within hours to schedule your roof inspection.",
  },
  es: {
    breadcrumb: ["Inicio","Servicios","Rejuvenecimiento de Techo Peak 301"],
    promoBanner: "Seguro de Techo en Florida Bajo Amenaza — Peak 301 Puede Ayudar — Llame al (844) 444-3114",
    heroTag: "REJUVENECIMIENTO DE TECHO",
    heroH1: "Su Techo Tiene Anos de Vida.",
    heroH1Gold: "Peak 301 Lo Demuestra.",
    heroP: "Peak 301 es un sellador natural a base de soya que penetra sus tejas y las restaura desde adentro — agregando 6 a 10 anos de vida a su techo existente y evitando la cuenta de $15,000–$25,000+ de un reemplazo. Ademas, viene con documentacion de garantia que su compania de seguros necesita ver.",
    heroCta: "OBTENGA SU EVALUACION GRATUITA",
    heroCall: "LLAME AL (844) 444-3114",
    stats: [
      { value:"6–10", label:"Anos agregados al techo" },
      { value:"$1,000s", label:"vs. reemplazo de $15K–$25K+" },
      { value:"280%", label:"Aumento de no renovacion en FL" },
      { value:"100%", label:"Formula natural a base de soya" },
    ],
    insuranceAlert: {
      title: "SU SEGURO ESTA EN RIESGO?",
      stat1: "280%",
      stat1Label: "aumento en no renovaciones de polizas de propietarios en Florida desde 2018",
      stat2: "15 Anos",
      stat2Label: "— la edad del techo en la que la mayoria de aseguradoras de Florida comienzan a cancelar cobertura",
      desc: "Las companias de seguros de Florida estan cancelando polizas de propietarios a tasas record basandose solo en la edad del techo — incluso si su techo no tiene goteras. Si su techo tiene 15+ anos, puede que ya este en tiempo prestado. Peak 301 ayuda a que su techo cumpla el umbral de 5 anos de vida util que las aseguradoras requieren para mantener su cobertura.",
      cta: "CENTRO DE RECURSOS DE SEGUROS — CONOZCA SUS DERECHOS →",
      sub: "La ley de Florida protege a los propietarios de perder su seguro solo por la edad del techo. Conozca las leyes, los tipos de aseguradoras y obtenga plantillas de documentos gratis.",
    },
    problemTag: "EL PROBLEMA",
    problemTitle: "POR QUE LOS PROPIETARIOS DE TAMPA ESTAN PERDIENDO COBERTURA",
    problems: [
      { icon:"📋", title:"Avisos de no renovacion de seguros", desc:"Las aseguradoras de Florida estan cancelando propietarios con techos de mas de 15 anos — sin importar la condicion. Una carta de no renovacion significa buscar desesperadamente cobertura costosa o enfrentar un vacio en la proteccion." },
      { icon:"💰", title:"El reemplazo total cuesta $15K–$25K+", desc:"Un techo nuevo es una de las reparaciones mas costosas. Muchos propietarios no pueden pagarlo con poco aviso — y no deberian tener que hacerlo si su techo existente aun tiene vida estructural." },
      { icon:"🔄", title:"Deterioro de tejas desde adentro", desc:"La exposicion UV y los ciclos de calor de Florida secan los aceites de sus tejas con el tiempo. Se vuelven fragiles, se agrietan, se curvan y pierden granulos — no porque esten gastadas, sino porque estan secas." },
      { icon:"🌪️", title:"La vulnerabilidad a tormentas aumenta con la edad", desc:"Las tejas secas y fragiles tienen mucha mas probabilidad de levantarse, agrietarse o salir volando durante vientos de huracan. La flexibilidad restaurada significa mejor rendimiento ante tormentas." },
    ],
    solutionTag: "LA SOLUCION",
    solutionTitle: "COMO PEAK 301 SALVA SU TECHO — Y SU SEGURO",
    solutionSub: "Un sellador a base de soya que restaura sus tejas desde adentro. No es un recubrimiento. No es una pintura. Es un tratamiento genuino de rejuvenecimiento.",
    solutions: [
      { title:"Sellador a base de soya — no un recubrimiento", desc:"Peak 301 no es una pintura, spray o recubrimiento superficial. Es un sellador a base de soya que penetra en el material de sus tejas y restaura los aceites que los rayos UV y el calor han agotado. Rejuvenece desde adentro hacia afuera, restaurando flexibilidad e impermeabilizacion a nivel molecular." },
      { title:"Agrega 6–10 anos de vida al techo", desc:"Al restaurar los aceites que mantienen las tejas flexibles y resistentes al agua, Peak 301 extiende la vida funcional de su techo de 6 a 10 anos. Son 6 a 10 anos mas antes de pensar en la conversacion de reemplazo de $15K–$25K+." },
      { title:"Miles — no decenas de miles", desc:"Un reemplazo total de techo cuesta $15,000–$25,000+ en Tampa. El tratamiento Peak 301 se mide en miles — dandole anos de proteccion adicional a un precio que tiene sentido financiero." },
      { title:"Documentacion de garantia para aseguradoras", desc:"Peak 301 viene con documentacion oficial de garantia que demuestra que su techo ha sido tratado profesionalmente y tiene vida util verificada. Esta es exactamente la documentacion que las aseguradoras de Florida necesitan ver al evaluar su poliza." },
      { title:"100% natural y ecologico", desc:"La formula a base de soya es no toxica, biodegradable y segura para su jardin, mascotas y familia. Sin quimicos agresivos, sin vapores toxicos, sin preocupaciones ambientales." },
      { title:"Aplicado por nuestro equipo capacitado", desc:"Como todo lo que hacemos, la aplicacion de Peak 301 es realizada por nuestro propio equipo capacitado — no subcontratado. Inspeccionamos la condicion de su techo, aplicamos el sellador correctamente y documentamos el tratamiento para sus registros." },
    ],
    mathTag: "LAS CUENTAS",
    mathTitle: "REJUVENECIMIENTO VS. REEMPLAZO",
    mathReplacementLabel: "REEMPLAZO TOTAL",
    mathReplacementPrice: "$15K–$25K+",
    mathReplacementDesc: "Gran interrupcion, semanas de programacion, estres financiero significativo",
    mathPeakLabel: "TRATAMIENTO PEAK 301",
    mathPeakPrice: "$1,000s",
    mathPeakDesc: "Un dia. Documentacion de garantia incluida. Sin cuenta de decenas de miles.",
    mathSub: "Por que gastar $20,000 en un techo nuevo cuando su techo existente puede restaurarse por unos pocos miles?",
    goldTag: "EL ESTANDAR DE ORO",
    goldTitle: "NUESTRO PROCESO PEAK 301",
    goldSub: "Cada casa. Cada vez. Sin excepciones.",
    goldSteps: [
      { num:"01", title:"EVALUAR", desc:"Inspeccionamos la condicion actual de su techo, edad y tipo de tejas para determinar si Peak 301 es la solucion correcta. No todo techo es candidato — seremos honestos si el suyo no lo es." },
      { num:"02", title:"DISENAR", desc:"Plan de tratamiento basado en las necesidades especificas de su techo, precios transparentes y una explicacion clara de que esperar — incluyendo la documentacion de garantia que recibira." },
      { num:"03", title:"INSTALAR", desc:"Nuestro equipo aplica el sellador Peak 301 en toda la superficie de su techo. La formula a base de soya penetra y comienza a restaurar sus tejas desde adentro inmediatamente." },
      { num:"04", title:"PROTEGER", desc:"Usted recibe documentacion oficial de garantia que muestra que su techo ha sido tratado profesionalmente. Esta es la documentacion que proporciona a su compania de seguros para demostrar la viabilidad del techo." },
    ],
    stepLabel: "PASO",
    faqTag: "PREGUNTAS FRECUENTES",
    faqTitle: "PREGUNTAS SOBRE PEAK 301",
    faqs: [
      { q:"Que es exactamente Peak 301?", a:"Peak 301 es un sellador natural de rejuvenecimiento de techo a base de soya. Penetra en el material de sus tejas y restaura los aceites que la exposicion UV y el calor han agotado con el tiempo. No es un recubrimiento, pintura o spray — trabaja desde el interior de la teja hacia afuera, restaurando flexibilidad, impermeabilizacion e integridad estructural." },
      { q:"Cuanto cuesta el tratamiento Peak 301?", a:"El tratamiento Peak 301 cuesta unos pocos miles de dolares para la mayoria de las casas en Tampa — una cuenta mucho mas pequena que los $15,000–$25,000+ de un reemplazo total. Proporcionamos precios exactos despues de inspeccionar su techo especifico." },
      { q:"Peak 301 me ayudara a mantener mi seguro de propietario?", a:"Ese es uno de sus mayores beneficios. Las aseguradoras de Florida estan cancelando cada vez mas la cobertura en techos de mas de 15 anos. El tratamiento Peak 301 viene con documentacion de garantia que demuestra que su techo ha sido rejuvenecido profesionalmente y tiene vida util verificada — generalmente cumpliendo el umbral de 5 anos que requieren las aseguradoras." },
      { q:"Cuanto dura el tratamiento?", a:"Peak 301 agrega 6 a 10 anos de vida a su techo existente. La duracion exacta depende de la condicion actual de su techo, edad y tipo de tejas — lo cual evaluamos antes de recomendar el tratamiento." },
      { q:"Mi techo es buen candidato para Peak 301?", a:"La mayoria de los techos de tejas asfalticas entre 8 y 20 anos son buenos candidatos. Techos con dano estructural significativo, tejas faltantes o goteras activas pueden necesitar reparaciones primero o estar mas alla del rejuvenecimiento. Inspeccionamos su techo honestamente y le decimos si Peak 301 tiene sentido o si el reemplazo es mejor." },
      { q:"El sellador es seguro para mi casa y jardin?", a:"Si. Peak 301 es una formula natural a base de soya. Es no toxica, biodegradable y completamente segura para su jardin, mascotas y familia. Sin quimicos agresivos ni vapores toxicos." },
      { q:"Cuanto tiempo toma la aplicacion?", a:"La mayoria de las aplicaciones residenciales de Peak 301 se completan en un solo dia. El sellador comienza a penetrar y trabajar inmediatamente despues de la aplicacion." },
      { q:"Puedo ver pruebas de que Peak 301 funciona?", a:"Si. Podemos mostrarle documentacion sobre las pruebas del sellador, datos de rendimiento y terminos de garantia. Tambien podemos conectarlo con propietarios en Tampa que han recibido el tratamiento y han mantenido su cobertura de seguro como resultado." },
    ],
    ctaTitle: "NO REEMPLACE SU TECHO HASTA QUE NOS LLAME",
    ctaSub: "Peak 301 podria ahorrarle $15,000+ y mantener su seguro intacto. Obtenga una evaluacion gratuita para saber si su techo es candidato para rejuvenecimiento en lugar de reemplazo.",
    formTitle: "Obtenga Su Evaluacion Gratuita de Techo",
    formName: "Nombre Completo",
    formPhone: "Numero de Telefono",
    formEmail: "Correo Electronico",
    formZip: "Codigo Postal",
    formBtn: "SOLICITAR MI EVALUACION GRATUITA",
    formDisclaimer: "Sin spam. Sin presion. Evaluacion honesta de si Peak 301 es adecuado para su techo.",
    successTitle: "Solicitud de Evaluacion Recibida!",
    successMsg: "Nos pondremos en contacto en horas para programar su inspeccion de techo.",
  },
};

export default function Peak301Page() {
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
            <button onClick={()=>document.getElementById("quote-form")?.scrollIntoView({behavior:"smooth"})} style={{padding:"16px 36px",fontFamily:f.h,fontSize:"14px",fontWeight:700,letterSpacing:"1.5px",color:C.white,background:`linear-gradient(135deg,${C.accent},${C.accentLight})`,border:"none",borderRadius:"8px",cursor:"pointer",boxShadow:"0 4px 16px rgba(177,26,33,0.3)"}}>{t.heroCta}</button>
            <a href="tel:8444443114" style={{display:"inline-flex",alignItems:"center",padding:"16px 36px",fontFamily:f.h,fontSize:"14px",fontWeight:700,letterSpacing:"1.5px",color:C.accent,border:`2px solid ${C.accent}`,borderRadius:"8px",textDecoration:"none"}}>📞 {t.heroCall}</a>
          </div>
          <div style={{display:"flex",gap:"24px",marginTop:"32px",flexWrap:"wrap"}}>{t.stats.map((s,i) => <div key={i} style={{textAlign:"center"}}><div style={{fontFamily:f.h,fontSize:"28px",fontWeight:800,color:C.accent}}>{s.value}</div><div style={{fontFamily:f.b,fontSize:"12px",color:C.muted,maxWidth:"120px"}}>{s.label}</div></div>)}</div>
        </div>
      </section>

      {/* INSURANCE ALERT */}
      <section style={{background:`linear-gradient(135deg, #1a0a0a, ${C.navy})`,padding:"60px 24px",borderTop:`2px solid ${C.alert}`,borderBottom:`2px solid ${C.alert}`}}>
        <div style={{maxWidth:"900px",margin:"0 auto",textAlign:"center"}}>
          <AlertTag>⚠️ {t.insuranceAlert.title}</AlertTag>
          <div style={{display:"flex",justifyContent:"center",gap:"48px",flexWrap:"wrap",margin:"32px 0"}}>
            <div style={{textAlign:"center"}}>
              <div style={{fontFamily:f.h,fontSize:"48px",fontWeight:800,color:C.alert}}>{t.insuranceAlert.stat1}</div>
              <div style={{fontFamily:f.b,fontSize:"14px",color:C.muted,maxWidth:"200px"}}>{t.insuranceAlert.stat1Label}</div>
            </div>
            <div style={{textAlign:"center"}}>
              <div style={{fontFamily:f.h,fontSize:"48px",fontWeight:800,color:C.alert}}>{t.insuranceAlert.stat2}</div>
              <div style={{fontFamily:f.b,fontSize:"14px",color:C.muted,maxWidth:"200px"}}>{t.insuranceAlert.stat2Label}</div>
            </div>
          </div>
          <p style={{fontFamily:f.b,fontSize:"17px",color:C.offWhite,lineHeight:1.7,maxWidth:"700px",margin:"0 auto 32px"}}>{t.insuranceAlert.desc}</p>
          <a href="/insurance-resource-center" style={{display:"inline-flex",alignItems:"center",gap:"10px",padding:"16px 32px",fontFamily:f.h,fontSize:"14px",fontWeight:700,letterSpacing:"1px",color:C.white,background:`linear-gradient(135deg,${C.alert},#D42A2A)`,borderRadius:"8px",textDecoration:"none",boxShadow:"0 4px 16px rgba(177,26,33,0.4)"}}>⚖️ {t.insuranceAlert.cta}</a>
          <p style={{fontFamily:f.b,fontSize:"13px",color:C.muted,marginTop:"16px"}}>{t.insuranceAlert.sub}</p>
        </div>
      </section>

      {/* PROBLEM */}
      <section style={{background:C.navy,padding:"80px 24px"}}><div style={{maxWidth:"1200px",margin:"0 auto",textAlign:"center"}}><Tag>{t.problemTag}</Tag><h2 style={{...secTitle,color:C.white}}>{t.problemTitle}</h2><GoldBar /><div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(250px,1fr))",gap:"24px",marginTop:"48px",textAlign:"left"}}>{t.problems.map((p,i) => <div key={i} style={{background:C.navyFade,border:`1px solid ${C.navyLight}`,borderRadius:"12px",padding:"28px",borderLeft:`4px solid ${C.accent}`}}><div style={{fontSize:"28px",marginBottom:"12px"}}>{p.icon}</div><h3 style={{fontFamily:f.h,fontSize:"17px",fontWeight:700,color:C.white,marginBottom:"8px"}}>{p.title}</h3><p style={{fontFamily:f.b,fontSize:"15px",color:C.muted,lineHeight:1.55}}>{p.desc}</p></div>)}</div></div></section>

      {/* SOLUTION */}
      <section style={{background:C.bg,padding:"80px 24px"}}><div style={sec}><div style={{textAlign:"center"}}><Tag>{t.solutionTag}</Tag><h2 style={{...secTitle,color:C.white}}>{t.solutionTitle}</h2><GoldBar /><p style={{fontFamily:f.b,fontSize:"17px",color:C.muted,maxWidth:"650px",margin:"0 auto 48px"}}>{t.solutionSub}</p></div><div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(340px,1fr))",gap:"20px"}}>{t.solutions.map((s,i) => <div key={i} style={{background:C.navyFade,border:`1px solid ${C.navyLight}`,borderRadius:"12px",padding:"28px",transition:"border-color 0.3s"}} onMouseOver={e=>e.currentTarget.style.borderColor=C.accent} onMouseOut={e=>e.currentTarget.style.borderColor=C.navyLight}><div style={{fontFamily:f.h,fontSize:"11px",fontWeight:700,color:C.accent,letterSpacing:"2px",marginBottom:"8px"}}>0{i+1}</div><h3 style={{fontFamily:f.h,fontSize:"17px",fontWeight:700,color:C.white,marginBottom:"10px"}}>{s.title}</h3><p style={{fontFamily:f.b,fontSize:"15px",color:C.muted,lineHeight:1.6}}>{s.desc}</p></div>)}</div></div></section>

      {/* COST COMPARISON */}
      <section style={{background:C.navy,padding:"80px 24px"}}>
        <div style={{maxWidth:"800px",margin:"0 auto",textAlign:"center"}}>
          <Tag>{t.mathTag}</Tag>
          <h2 style={{...secTitle,color:C.white}}>{t.mathTitle}</h2>
          <GoldBar />
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"24px",marginTop:"48px"}}>
            <div style={{background:C.alertDim,border:`1px solid ${C.alert}`,borderRadius:"12px",padding:"28px",textAlign:"center"}}>
              <div style={{fontFamily:f.h,fontSize:"13px",fontWeight:700,color:C.alert,letterSpacing:"2px",marginBottom:"12px"}}>{t.mathReplacementLabel}</div>
              <div style={{fontFamily:f.h,fontSize:"36px",fontWeight:800,color:C.white}}>{t.mathReplacementPrice}</div>
              <div style={{fontFamily:f.b,fontSize:"14px",color:C.muted,marginTop:"8px"}}>{t.mathReplacementDesc}</div>
            </div>
            <div style={{background:C.accentPale,border:`1px solid ${C.accent}`,borderRadius:"12px",padding:"28px",textAlign:"center"}}>
              <div style={{fontFamily:f.h,fontSize:"13px",fontWeight:700,color:C.accent,letterSpacing:"2px",marginBottom:"12px"}}>{t.mathPeakLabel}</div>
              <div style={{fontFamily:f.h,fontSize:"36px",fontWeight:800,color:C.accent}}>{t.mathPeakPrice}</div>
              <div style={{fontFamily:f.b,fontSize:"14px",color:C.muted,marginTop:"8px"}}>{t.mathPeakDesc}</div>
            </div>
          </div>
          <p style={{fontFamily:f.b,fontSize:"15px",color:C.muted,marginTop:"24px",fontStyle:"italic"}}>{t.mathSub}</p>
        </div>
      </section>

      {/* GOLD STANDARD */}
      <section style={{background:C.bg,padding:"80px 24px"}}><div style={sec}><div style={{textAlign:"center"}}><Tag>{t.goldTag}</Tag><h2 style={{...secTitle,color:C.white}}>{t.goldTitle}</h2><GoldBar /><p style={{fontFamily:f.b,fontSize:"17px",color:C.offWhite,fontStyle:"italic",maxWidth:"500px",margin:"0 auto 48px"}}>{t.goldSub}</p></div><div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(250px,1fr))",gap:"24px"}}>{t.goldSteps.map((step,i) => <div key={i} style={{background:C.navyFade,border:`1px solid ${C.navyLight}`,borderRadius:"12px",padding:"28px",position:"relative"}}><div style={{fontFamily:f.h,fontSize:"36px",fontWeight:800,color:"rgba(177,26,33,0.08)",position:"absolute",top:"16px",right:"20px"}}>{step.num}</div><div style={{fontFamily:f.h,fontSize:"11px",fontWeight:700,color:C.accent,letterSpacing:"3px",marginBottom:"8px"}}>{t.stepLabel} {step.num}</div><h3 style={{fontFamily:f.h,fontSize:"22px",fontWeight:700,color:C.white,marginBottom:"12px"}}>{step.title}</h3><p style={{fontFamily:f.b,fontSize:"15px",color:C.muted,lineHeight:1.6}}>{step.desc}</p></div>)}</div></div></section>

      {/* FAQ */}
      <section style={{background:C.navy,padding:"80px 24px"}}><div style={{maxWidth:"800px",margin:"0 auto",textAlign:"center"}}><Tag>{t.faqTag}</Tag><h2 style={{...secTitle,color:C.white}}>{t.faqTitle}</h2><GoldBar /><div style={{marginTop:"40px",textAlign:"left"}}>{t.faqs.map((faq,i) => <div key={i} style={{borderBottom:`1px solid ${C.navyLight}`}}><button onClick={()=>setOpenFaq(openFaq===i?null:i)} style={{width:"100%",padding:"20px 0",background:"none",border:"none",cursor:"pointer",display:"flex",justifyContent:"space-between",alignItems:"center",gap:"16px"}}><span style={{fontFamily:f.h,fontSize:"15px",fontWeight:600,color:openFaq===i?C.accent:C.white,textAlign:"left",transition:"color 0.2s"}}>{faq.q}</span><span style={{fontFamily:f.h,fontSize:"20px",color:C.accent,transform:openFaq===i?"rotate(45deg)":"none",transition:"transform 0.3s",flexShrink:0}}>+</span></button>{openFaq===i&&<div style={{padding:"0 0 20px",fontFamily:f.b,fontSize:"15px",color:C.muted,lineHeight:1.65}}>{faq.a}</div>}</div>)}</div></div></section>

      {/* CTA FORM */}
      <section id="quote-form" style={{background:`linear-gradient(165deg,${C.navyMid},${C.navy})`,padding:"80px 24px"}}><div style={{maxWidth:"600px",margin:"0 auto",textAlign:"center"}}>
        <h2 style={{fontFamily:f.h,fontSize:"clamp(28px,5vw,40px)",fontWeight:800,color:C.white,marginBottom:"12px"}}>{t.ctaTitle}</h2>
        <p style={{fontFamily:f.b,fontSize:"17px",color:C.offWhite,marginBottom:"40px"}}>{t.ctaSub}</p>
        {submitted ? <div style={{background:C.successDim,border:`1px solid ${C.success}`,borderRadius:"12px",padding:"32px"}}><div style={{fontSize:"48px",marginBottom:"12px"}}>✓</div><h3 style={{fontFamily:f.h,fontSize:"20px",fontWeight:700,color:"#4ADE80"}}>{t.successTitle}</h3><p style={{fontFamily:f.b,fontSize:"15px",color:C.muted,marginTop:"8px"}}>{t.successMsg}</p></div> : <div style={{background:C.white,borderRadius:"16px",padding:"32px",boxShadow:"0 24px 80px rgba(0,0,0,0.4)",textAlign:"left"}}>
          <h3 style={{fontFamily:f.h,fontSize:"18px",fontWeight:700,color:C.navy,textAlign:"center",marginBottom:"4px"}}>{t.formTitle}</h3>
          <div style={{width:"40px",height:"3px",background:C.accent,borderRadius:"2px",margin:"10px auto 20px"}} />
          <input style={inputStyle} placeholder={t.formName} value={formData.name} onChange={e=>setFormData({...formData,name:e.target.value})} />
          <input style={inputStyle} placeholder={t.formPhone} type="tel" value={formData.phone} onChange={e=>setFormData({...formData,phone:e.target.value})} />
          <input style={inputStyle} placeholder={t.formEmail} type="email" value={formData.email} onChange={e=>setFormData({...formData,email:e.target.value})} />
          <input style={inputStyle} placeholder={t.formZip} value={formData.zip} onChange={e=>setFormData({...formData,zip:e.target.value})} maxLength={5} />
          <button onClick={()=>{fetch("/api/send-lead",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({name:formData.name,phone:formData.phone,email:formData.email,zip:formData.zip,service:"Peak 301 Roof Rejuvenation",page:"peak-301",message:"Free roof assessment request"})}).catch(()=>{});setSubmitted(true);}} style={{width:"100%",padding:"16px",fontFamily:f.h,fontSize:"14px",fontWeight:700,letterSpacing:"1.5px",color:C.white,background:`linear-gradient(135deg,${C.accent},${C.accentLight})`,border:"none",borderRadius:"8px",cursor:"pointer",boxShadow:"0 4px 16px rgba(177,26,33,0.3)"}}>{t.formBtn}</button>
          <p style={{fontFamily:f.b,fontSize:"12px",color:"#9CA3AF",textAlign:"center",marginTop:"12px"}}>{t.formDisclaimer}</p>
        </div>}
        <div style={{marginTop:"32px"}}><a href="tel:8444443114" style={{fontFamily:f.h,fontSize:"18px",fontWeight:700,color:C.accent,textDecoration:"none"}}>📞 (844) 444-3114</a></div>
      </div></section>

      <SiteFooter />
      <MobileCTA />
      <style>{`*{box-sizing:border-box;margin:0;padding:0}::placeholder{color:#9CA3AF}input:focus{border-color:${C.accent}!important}`}</style>
    </div>
  );
}
