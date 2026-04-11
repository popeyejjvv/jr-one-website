"use client";

import { useState, useEffect } from "react";
import { useLanguage } from "../../lib/LanguageContext";
import SiteNav from "../../components/SiteNav";
import SiteFooter from "../../components/SiteFooter";
import MobileCTA from "../../components/MobileCTA";

const injectFonts = () => { if (typeof document==="undefined"||document.querySelector("#jr-fonts")) return; const l=document.createElement("link"); l.id="jr-fonts"; l.rel="stylesheet"; l.href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800&family=Source+Sans+3:wght@300;400;600&display=swap"; document.head.appendChild(l); };
const C = { bg:"#0B1628",navy:"#1B2A4A",navyMid:"#243556",navyLight:"#2C3E5A",navyFade:"#162033",gold:"#C8952E",goldLight:"#D4A843",goldPale:"rgba(200,149,46,0.12)",cream:"#F5F3EF",white:"#FFFFFF",offWhite:"#E8E4DC",muted:"#7A8FA8",charcoal:"#2D2D2D",success:"#2D8B4E",successDim:"rgba(45,139,78,0.15)" };
const f = { h:"'Montserrat', sans-serif", b:"'Source Sans 3', sans-serif" };
const Tag = ({children}) => <div style={{display:"inline-block",padding:"6px 16px",background:C.goldPale,borderRadius:"4px",marginBottom:"12px"}}><span style={{fontFamily:f.h,fontSize:"12px",fontWeight:700,color:C.gold,letterSpacing:"3px"}}>{children}</span></div>;
const GoldBar = () => <div style={{width:"60px",height:"3px",background:`linear-gradient(90deg,${C.gold},${C.goldLight})`,borderRadius:"2px",margin:"16px auto"}} />;
const Stars = () => <span style={{color:C.gold,fontSize:"14px",letterSpacing:"2px"}}>★★★★★</span>;
const inputStyle = {width:"100%",padding:"13px 16px",fontFamily:f.b,fontSize:"15px",border:"1.5px solid #D1D5DB",borderRadius:"8px",outline:"none",color:C.charcoal,marginBottom:"12px",background:"#FAFAFA",boxSizing:"border-box"};

const T = {
  en: {
    breadcrumbHome: "Home",
    breadcrumbAbout: "About Us",
    heroTag: "OUR STORY",
    heroH1a: "One Family. Over Three Decades",
    heroH1b: "in the Tampa Gutter Trade.",
    heroP: "The story didn't start in a boardroom. It started on a rooftop in Tampa in 1990, with a man from Honduras, a gutter machine, and a belief that honest work builds an honest life. In 2006, his son Christopher formed JR One Aluminum LLC to carry the family trade forward. This is how we got here.",
    ch1Year: "1990",
    ch1Title: "From Honduras to Tampa Bay",
    ch1P1: "In 1990, Javier Rivera immigrated to Tampa from Honduras and started doing what he knew — working with his hands. He began installing gutters, learning the trade from the ground up, and building a reputation one house at a time.",
    ch1P2: "For the next decade, Javier installed gutters himself across Tampa Bay. He wasn't building a brand or running marketing campaigns. He was on rooftops, bending aluminum, teaching anyone willing to learn. Many of the gutter and soffit companies operating in the Tampa market today trace their knowledge back to Javier — people who worked for him, worked with him, or learned alongside him.",
    ch2Year: "2001",
    ch2Title: "What Shaped Us",
    ch2P1: "In 2001, Javier was injured in a fall while doing gutter work — the result of an incorrectly placed powerline on the job site. The accident left him paralyzed. He's been in a wheelchair ever since.",
    ch2P2: "It was a preventable accident. And it's the reason this company operates the way it does. When you've watched something like that happen to your own father over something that should have been caught, you don't take shortcuts. You don't rush. You check everything twice. That's not a philosophy we adopted — it's something we carry.",
    ch3Tag: "THE NEXT GENERATION",
    ch3Title: "Growing Up in the Trade",
    ch3P1: "Christopher Rivera had been doing estimates with his father since he was nine years old. While other kids were playing, he was learning how to read a roofline, measure a gutter run, and talk to homeowners about protecting their property.",
    ch3P2: "After Javier's accident, Christopher stepped up. Not because it was a career opportunity — because his family needed him and the work his father started needed to continue. The knowledge Javier spent a decade building couldn't end on that rooftop.",
    ch3P3: "Today, JR One Aluminum LLC — formed in 2006 — operates three in-house crews serving Tampa Bay and Florida's west coast. Some of the homes we work on are the same homes Javier installed gutters on decades ago. We've gone back and redone his original work — which is both humbling and a reminder that this trade is in our blood.",
    ch4Tag: "WHY THIS MATTERS TO YOU",
    ch4Title: "Why We're Thorough About Everything",
    ch4P1: "When people work with JR One, they sometimes notice that we're more detailed than other contractors. Our estimates are longer. Our inspections are more thorough. Our communication is more frequent. Our cleanup is more meticulous.",
    ch4P2: "That's not a sales tactic. That's what happens when you build a company on the belief that a mistake can cost someone everything.",
    ch4P3: "We don't cut corners because we've seen what cutting corners costs. We don't use subcontractors because we need to know that every person on your property meets our standard. We don't rush because speed without precision is how people get hurt and homes get damaged.",
    ch4P4: "Our price reflects all of this. When you hire JR One, you're paying for the peace of mind that comes from knowing the job was done right, done safely, and done by people who understand that the details aren't optional.",
    goldStandardTag: "THE GOLD STANDARD",
    goldStandardTitle: "HOW WE WORK",
    goldStandardP: "Every home. Every time. No exceptions. This isn't a marketing slogan — it's a promise born from knowing what happens when standards slip.",
    steps: [
      {num:"01",title:"ASSESS",desc:"Thorough inspection. No shortcuts."},
      {num:"02",title:"DESIGN",desc:"Transparent estimate. No surprises."},
      {num:"03",title:"INSTALL",desc:"Our crew. Precision work. No subs."},
      {num:"04",title:"PROTECT",desc:"Warranty. Follow-up. No excuses."},
    ],
    numbersTag: "JR ONE TODAY",
    numbersTitle: "BY THE NUMBERS",
    stats: [
      {value:"1990",label:"Javier in the trade"},
      {value:"2006",label:"JR One Aluminum LLC founded"},
      {value:"3",label:"In-house installation crews"},
      {value:"4.9★",label:"Google rating from 55+ reviews"},
      {value:"0",label:"Subcontractors used — ever"},
      {value:"20+",label:"Cities served across Florida's west coast"},
    ],
    servicesTag: "OUR SERVICES",
    servicesTitle: "WHAT WE SPECIALIZE IN",
    servicesP: "We do one thing and we do it exceptionally — aluminum exterior systems. Gutters, soffit, fascia, siding, gutter guards, and roof rejuvenation. No roofing. No painting. No general contracting. Just aluminum, done right.",
    services: [
      {title:"Seamless Aluminum Gutters",desc:"6\" and 7\" systems custom-fabricated on your property."},
      {title:"Gutter Guards",desc:"Multiple guard types to keep debris out and make maintenance easier."},
      {title:"Soffit & Fascia",desc:"Aluminum and vinyl installations that protect your roof edge."},
      {title:"Siding",desc:"Vinyl and aluminum siding for Florida weather protection."},
      {title:"Gutter Repair & Maintenance",desc:"Fix it right the first time. Seasonal programs available."},
      {title:"Peak 301 Roof Rejuvenation",desc:"Soy-based sealant that extends roof life 6-10 years."},
    ],
    bilingualTitle: "🇭🇳 Hablamos Español",
    bilingualP: "Our roots are Honduran. Our team is bilingual. Whether you're more comfortable in English or Spanish, we'll communicate clearly in the language you prefer — from the first estimate to the final walkthrough.",
    reviewsTag: "WHAT PEOPLE SAY",
    reviewsTitle: "OUR REPUTATION SPEAKS FOR ITSELF",
    reviews: [
      {text:"From the very beginning, they worked to ensure I received a fair quote. There was no high pressure selling. The workmanship was outstanding, and they took pictures of each step showing me what was transpiring.",name:"Lois G.",ctx:"Gutters & Soffits"},
      {text:"We referred a customer to JR One and they could not stop praising his workmanship and professionalism. They will be the go-to for all our gutter and soffit requests from customers.",name:"Adam E.",ctx:"Contractor Referral"},
      {text:"After Milton I called a dozen companies — only JR One called back. The team showed up and did a perfect job. Do not call anyone else.",name:"Matt D.",ctx:"Storm Damage"},
    ],
    ctaTitle: "READY TO WORK WITH US?",
    ctaP: "Get your free, no-pressure quote. We respond within hours — and we'll explain everything as thoroughly as you'd expect from us.",
    formTitle: "Get Your Free Quote",
    placeholderName: "Full Name",
    placeholderPhone: "Phone Number",
    placeholderEmail: "Email Address",
    placeholderZip: "ZIP Code",
    submitBtn: "REQUEST MY FREE QUOTE",
    formDisclaimer: "No spam. No pressure. Just honest expert advice.",
    successTitle: "Request Received!",
    successP: "We'll be in touch soon.",
    imgAlt: "Javier Rivera — Founder of the family trade, in Tampa Bay gutters since 1990",
  },
  es: {
    breadcrumbHome: "Inicio",
    breadcrumbAbout: "Sobre Nosotros",
    heroTag: "NUESTRA HISTORIA",
    heroH1a: "Una Familia. Mas de Tres Decadas",
    heroH1b: "en el Oficio de Canaletas de Tampa.",
    heroP: "La historia no nacio en una sala de juntas. Nacio en un techo en Tampa en 1990, con un hombre de Honduras, una maquina de canaletas y la conviccion de que el trabajo honesto construye una vida honesta. En 2006, su hijo Christopher formo JR One Aluminum LLC para llevar el oficio familiar hacia adelante. Asi llegamos hasta aqui.",
    ch1Year: "1990",
    ch1Title: "De Honduras a Tampa Bay",
    ch1P1: "En 1990, Javier Rivera inmigro a Tampa desde Honduras y comenzo a hacer lo que sabia — trabajar con sus manos. Empezo instalando canaletas, aprendiendo el oficio desde cero y construyendo una reputacion casa por casa.",
    ch1P2: "Durante la siguiente decada, Javier instalo canaletas el mismo por toda el area de Tampa Bay. No estaba construyendo una marca ni haciendo campanas de marketing. Estaba en los techos, doblando aluminio, ensenando a cualquiera dispuesto a aprender. Muchas de las empresas de canaletas y sofitos que operan hoy en el mercado de Tampa pueden rastrear su conocimiento hasta Javier — personas que trabajaron para el, con el, o aprendieron a su lado.",
    ch2Year: "2001",
    ch2Title: "Lo Que Nos Formo",
    ch2P1: "En 2001, Javier sufrio una caida mientras hacia trabajo de canaletas — resultado de una linea electrica mal colocada en el sitio de trabajo. El accidente lo dejo paralizado. Desde entonces esta en silla de ruedas.",
    ch2P2: "Fue un accidente prevenible. Y es la razon por la que esta empresa opera como lo hace. Cuando has visto algo asi pasarle a tu propio padre por algo que debio haberse detectado, no tomas atajos. No te apresuras. Revisas todo dos veces. Eso no es una filosofia que adoptamos — es algo que cargamos.",
    ch3Tag: "LA SIGUIENTE GENERACION",
    ch3Title: "Creciendo en el Oficio",
    ch3P1: "Christopher Rivera habia estado haciendo estimados con su padre desde los nueve anos. Mientras otros ninos jugaban, el estaba aprendiendo a leer una linea de techo, medir un tramo de canaleta y hablar con propietarios sobre la proteccion de sus hogares.",
    ch3P2: "Despues del accidente de Javier, Christopher dio el paso. No porque fuera una oportunidad de carrera — sino porque su familia lo necesitaba y el trabajo que su padre comenzo tenia que continuar. El conocimiento que Javier paso una decada construyendo no podia terminar en ese techo.",
    ch3P3: "Hoy, JR One Aluminum LLC — formada en 2006 — opera tres cuadrillas internas que sirven a Tampa Bay y la costa oeste de Florida. Algunas de las casas en las que trabajamos son las mismas casas donde Javier instalo canaletas hace decadas. Hemos regresado a rehacer su trabajo original — lo cual es humilde y un recordatorio de que este oficio lo llevamos en la sangre.",
    ch4Tag: "POR QUE ESTO TE IMPORTA",
    ch4Title: "Por Que Somos Tan Meticulosos en Todo",
    ch4P1: "Cuando la gente trabaja con JR One, a veces notan que somos mas detallistas que otros contratistas. Nuestros estimados son mas largos. Nuestras inspecciones son mas exhaustivas. Nuestra comunicacion es mas frecuente. Nuestra limpieza es mas meticulosa.",
    ch4P2: "Eso no es una tactica de ventas. Es lo que pasa cuando construyes una empresa con la conviccion de que un error puede costarle todo a alguien.",
    ch4P3: "No tomamos atajos porque hemos visto lo que cuestan los atajos. No usamos subcontratistas porque necesitamos saber que cada persona en tu propiedad cumple con nuestro estandar. No nos apuramos porque la velocidad sin precision es como la gente se lastima y los hogares se danan.",
    ch4P4: "Nuestro precio refleja todo esto. Cuando contratas a JR One, estas pagando por la tranquilidad de saber que el trabajo se hizo bien, de manera segura, y por personas que entienden que los detalles no son opcionales.",
    goldStandardTag: "EL ESTANDAR DE ORO",
    goldStandardTitle: "COMO TRABAJAMOS",
    goldStandardP: "Cada hogar. Cada vez. Sin excepciones. Esto no es un eslogan de marketing — es una promesa nacida de saber lo que pasa cuando los estandares bajan.",
    steps: [
      {num:"01",title:"EVALUAR",desc:"Inspeccion exhaustiva. Sin atajos."},
      {num:"02",title:"DISENAR",desc:"Estimado transparente. Sin sorpresas."},
      {num:"03",title:"INSTALAR",desc:"Nuestra cuadrilla. Trabajo de precision. Sin subcontratistas."},
      {num:"04",title:"PROTEGER",desc:"Garantia. Seguimiento. Sin excusas."},
    ],
    numbersTag: "JR ONE HOY",
    numbersTitle: "EN NUMEROS",
    stats: [
      {value:"1990",label:"Javier en el oficio"},
      {value:"2006",label:"JR One Aluminum LLC fundada"},
      {value:"3",label:"Cuadrillas de instalacion internas"},
      {value:"4.9★",label:"Calificacion en Google de 55+ resenas"},
      {value:"0",label:"Subcontratistas usados — jamas"},
      {value:"20+",label:"Ciudades atendidas en la costa oeste de Florida"},
    ],
    servicesTag: "NUESTROS SERVICIOS",
    servicesTitle: "EN QUE NOS ESPECIALIZAMOS",
    servicesP: "Hacemos una cosa y la hacemos excepcionalmente bien — sistemas exteriores de aluminio. Canaletas, sofitos, fascia, revestimiento, protectores de canaletas y rejuvenecimiento de techos. Sin techado. Sin pintura. Sin contratacion general. Solo aluminio, bien hecho.",
    services: [
      {title:"Canaletas de Aluminio Sin Costura",desc:"Sistemas de 6\" y 7\" fabricados a medida en tu propiedad."},
      {title:"Protectores de Canaletas",desc:"Multiples tipos de protectores para mantener los escombros fuera y facilitar el mantenimiento."},
      {title:"Sofito y Fascia",desc:"Instalaciones de aluminio y vinilo que protegen el borde de tu techo."},
      {title:"Revestimiento",desc:"Revestimiento de vinilo y aluminio para proteccion contra el clima de Florida."},
      {title:"Reparacion y Mantenimiento de Canaletas",desc:"Lo arreglamos bien la primera vez. Programas de temporada disponibles."},
      {title:"Peak 301 Rejuvenecimiento de Techo",desc:"Sellador a base de soya que extiende la vida del techo 6-10 anos."},
    ],
    bilingualTitle: "🇭🇳 Hablamos Espanol",
    bilingualP: "Nuestras raices son hondurenas. Nuestro equipo es bilingue. Ya sea que te sientas mas comodo en ingles o espanol, nos comunicaremos claramente en el idioma que prefieras — desde el primer estimado hasta la inspeccion final.",
    reviewsTag: "LO QUE DICEN",
    reviewsTitle: "NUESTRA REPUTACION HABLA POR SI MISMA",
    reviews: [
      {text:"Desde el principio, trabajaron para asegurarse de que recibiera una cotizacion justa. No hubo venta de alta presion. La calidad del trabajo fue sobresaliente, y tomaron fotos de cada paso mostrandome lo que estaba sucediendo.",name:"Lois G.",ctx:"Canaletas y Sofitos"},
      {text:"Referimos a un cliente a JR One y no dejaban de elogiar su calidad de trabajo y profesionalismo. Seran los preferidos para todas nuestras solicitudes de canaletas y sofitos de clientes.",name:"Adam E.",ctx:"Referencia de Contratista"},
      {text:"Despues de Milton llame a una docena de empresas — solo JR One devolvio la llamada. El equipo llego e hizo un trabajo perfecto. No llamen a nadie mas.",name:"Matt D.",ctx:"Dano por Tormenta"},
    ],
    ctaTitle: "LISTO PARA TRABAJAR CON NOSOTROS?",
    ctaP: "Obtene tu cotizacion gratuita sin presion. Respondemos en horas — y te explicamos todo tan detalladamente como esperarias de nosotros.",
    formTitle: "Obtene Tu Cotizacion Gratis",
    placeholderName: "Nombre Completo",
    placeholderPhone: "Numero de Telefono",
    placeholderEmail: "Correo Electronico",
    placeholderZip: "Codigo Postal",
    submitBtn: "SOLICITAR MI COTIZACION GRATIS",
    formDisclaimer: "Sin spam. Sin presion. Solo consejos honestos de expertos.",
    successTitle: "Solicitud Recibida!",
    successP: "Nos pondremos en contacto pronto.",
    imgAlt: "Javier Rivera — Fundador del oficio familiar, en canaletas de Tampa Bay desde 1990",
  },
};

export default function AboutUsPage() {
  const [formData, setFormData] = useState({name:"",phone:"",email:"",zip:""});
  const [submitted, setSubmitted] = useState(false);
  const { lang } = useLanguage();
  const t = T[lang];
  useEffect(() => { injectFonts(); }, []);
  const secTitle = {fontFamily:f.h,fontSize:"clamp(24px,4vw,36px)",fontWeight:800,letterSpacing:"2px",textAlign:"center",marginBottom:"8px"};

  return (
    <div style={{background:C.bg,color:C.white,fontFamily:f.b,lineHeight:1.65,minHeight:"100vh"}}>
      <SiteNav />
      <div style={{padding:"16px 24px 0",maxWidth:"1200px",margin:"0 auto"}}><div style={{fontFamily:f.b,fontSize:"13px",color:C.muted}}>
        <span style={{color:C.muted,cursor:"pointer"}}>{t.breadcrumbHome}</span><span style={{margin:"0 8px",opacity:0.5}}>/</span><span style={{color:C.gold}}>{t.breadcrumbAbout}</span>
      </div></div>

      {/* ══ JAVIER PHOTO ══ */}
      <section className="hero-stars" style={{padding:"60px 24px 20px",maxWidth:"900px",margin:"0 auto",textAlign:"center"}}>
        <div style={{maxWidth:"500px",margin:"0 auto",borderRadius:"16px",overflow:"hidden",border:`2px solid ${C.gold}`,boxShadow:"0 8px 32px rgba(200,149,46,0.15)"}}>
          <img src="/images/javier-rivera.jpg" alt={t.imgAlt} style={{width:"100%",height:"auto",display:"block"}} />
        </div>
      </section>

      {/* ══ HERO ══ */}
      <section style={{padding:"40px 24px 40px",maxWidth:"900px",margin:"0 auto",textAlign:"center"}}>
        <Tag>{t.heroTag}</Tag>
        <h1 style={{fontFamily:f.h,fontSize:"clamp(32px,5vw,48px)",fontWeight:800,lineHeight:1.1,marginBottom:"20px"}}>
          {t.heroH1a}<br/>
          <span style={{color:C.gold}}>{t.heroH1b}</span>
        </h1>
        <p style={{fontFamily:f.b,fontSize:"18px",color:C.muted,maxWidth:"700px",margin:"0 auto"}}>
          {t.heroP}
        </p>
      </section>

      {/* ══ THE STORY ══ */}
      <section style={{padding:"40px 24px 80px"}}>
        <div style={{maxWidth:"760px",margin:"0 auto"}}>

          {/* Chapter 1: Honduras to Tampa */}
          <div style={{marginBottom:"56px"}}>
            <div style={{fontFamily:f.h,fontSize:"12px",fontWeight:700,color:C.gold,letterSpacing:"3px",marginBottom:"12px"}}>{t.ch1Year}</div>
            <h2 style={{fontFamily:f.h,fontSize:"24px",fontWeight:700,color:C.white,marginBottom:"16px"}}>{t.ch1Title}</h2>
            <div style={{borderLeft:`3px solid ${C.gold}`,paddingLeft:"24px"}}>
              <p style={{fontFamily:f.b,fontSize:"17px",color:C.offWhite,lineHeight:1.75,marginBottom:"16px"}}>
                {t.ch1P1}
              </p>
              <p style={{fontFamily:f.b,fontSize:"17px",color:C.offWhite,lineHeight:1.75}}>
                {t.ch1P2}
              </p>
            </div>
          </div>

          {/* Chapter 2: The Accident */}
          <div style={{marginBottom:"56px"}}>
            <div style={{fontFamily:f.h,fontSize:"12px",fontWeight:700,color:C.gold,letterSpacing:"3px",marginBottom:"12px"}}>{t.ch2Year}</div>
            <h2 style={{fontFamily:f.h,fontSize:"24px",fontWeight:700,color:C.white,marginBottom:"16px"}}>{t.ch2Title}</h2>
            <div style={{borderLeft:`3px solid ${C.gold}`,paddingLeft:"24px"}}>
              <p style={{fontFamily:f.b,fontSize:"17px",color:C.offWhite,lineHeight:1.75,marginBottom:"16px"}}>
                {t.ch2P1}
              </p>
              <p style={{fontFamily:f.b,fontSize:"17px",color:C.offWhite,lineHeight:1.75}}>
                {t.ch2P2}
              </p>
            </div>
          </div>

          {/* Chapter 3: Christopher Takes Over */}
          <div style={{marginBottom:"56px"}}>
            <div style={{fontFamily:f.h,fontSize:"12px",fontWeight:700,color:C.gold,letterSpacing:"3px",marginBottom:"12px"}}>{t.ch3Tag}</div>
            <h2 style={{fontFamily:f.h,fontSize:"24px",fontWeight:700,color:C.white,marginBottom:"16px"}}>{t.ch3Title}</h2>
            <div style={{borderLeft:`3px solid ${C.gold}`,paddingLeft:"24px"}}>
              <p style={{fontFamily:f.b,fontSize:"17px",color:C.offWhite,lineHeight:1.75,marginBottom:"16px"}}>
                {t.ch3P1}
              </p>
              <p style={{fontFamily:f.b,fontSize:"17px",color:C.offWhite,lineHeight:1.75,marginBottom:"16px"}}>
                {t.ch3P2}
              </p>
              <p style={{fontFamily:f.b,fontSize:"17px",color:C.offWhite,lineHeight:1.75}}>
                {t.ch3P3}
              </p>
            </div>
          </div>

          {/* Chapter 4: Why It Matters */}
          <div style={{marginBottom:"56px"}}>
            <div style={{fontFamily:f.h,fontSize:"12px",fontWeight:700,color:C.gold,letterSpacing:"3px",marginBottom:"12px"}}>{t.ch4Tag}</div>
            <h2 style={{fontFamily:f.h,fontSize:"24px",fontWeight:700,color:C.white,marginBottom:"16px"}}>{t.ch4Title}</h2>
            <div style={{borderLeft:`3px solid ${C.gold}`,paddingLeft:"24px"}}>
              <p style={{fontFamily:f.b,fontSize:"17px",color:C.offWhite,lineHeight:1.75,marginBottom:"16px"}}>
                {t.ch4P1}
              </p>
              <p style={{fontFamily:f.b,fontSize:"17px",color:C.offWhite,lineHeight:1.75,marginBottom:"16px"}}>
                {t.ch4P2}
              </p>
              <p style={{fontFamily:f.b,fontSize:"17px",color:C.offWhite,lineHeight:1.75,marginBottom:"16px"}}>
                {t.ch4P3}
              </p>
              <p style={{fontFamily:f.b,fontSize:"17px",color:C.offWhite,lineHeight:1.75}}>
                {t.ch4P4}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ══ THE GOLD STANDARD (Condensed) ══ */}
      <section style={{background:C.navy,padding:"80px 24px"}}>
        <div style={{maxWidth:"900px",margin:"0 auto",textAlign:"center"}}>
          <Tag>{t.goldStandardTag}</Tag>
          <h2 style={{...secTitle,color:C.white}}>{t.goldStandardTitle}</h2>
          <GoldBar />
          <p style={{fontFamily:f.b,fontSize:"17px",color:C.offWhite,fontStyle:"italic",maxWidth:"600px",margin:"0 auto 48px"}}>
            {t.goldStandardP}
          </p>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))",gap:"20px",textAlign:"center"}}>
            {t.steps.map((step,i) => (
              <div key={i} style={{background:C.navyFade,border:`1px solid ${C.navyLight}`,borderRadius:"12px",padding:"24px"}}>
                <div style={{fontFamily:f.h,fontSize:"32px",fontWeight:800,color:C.gold,marginBottom:"8px"}}>{step.num}</div>
                <h3 style={{fontFamily:f.h,fontSize:"16px",fontWeight:700,color:C.white,marginBottom:"8px"}}>{step.title}</h3>
                <p style={{fontFamily:f.b,fontSize:"14px",color:C.muted}}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ BY THE NUMBERS ══ */}
      <section style={{background:C.bg,padding:"80px 24px"}}>
        <div style={{maxWidth:"900px",margin:"0 auto",textAlign:"center"}}>
          <Tag>{t.numbersTag}</Tag>
          <h2 style={{...secTitle,color:C.white}}>{t.numbersTitle}</h2>
          <GoldBar />
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))",gap:"24px",marginTop:"48px"}}>
            {t.stats.map((stat,i) => (
              <div key={i} style={{background:C.navyFade,border:`1px solid ${C.navyLight}`,borderRadius:"12px",padding:"24px",textAlign:"center"}}>
                <div style={{fontFamily:f.h,fontSize:"32px",fontWeight:800,color:C.gold}}>{stat.value}</div>
                <div style={{fontFamily:f.b,fontSize:"14px",color:C.muted,marginTop:"8px"}}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ WHAT WE DO ══ */}
      <section style={{background:C.navy,padding:"80px 24px"}}>
        <div style={{maxWidth:"900px",margin:"0 auto",textAlign:"center"}}>
          <Tag>{t.servicesTag}</Tag>
          <h2 style={{...secTitle,color:C.white}}>{t.servicesTitle}</h2>
          <GoldBar />
          <p style={{fontFamily:f.b,fontSize:"17px",color:C.muted,maxWidth:"600px",margin:"0 auto 48px"}}>
            {t.servicesP}
          </p>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(250px,1fr))",gap:"16px",textAlign:"left"}}>
            {t.services.map((svc,i) => (
              <div key={i} style={{background:C.navyFade,borderRadius:"8px",padding:"20px",borderLeft:`3px solid ${C.gold}`,border:`1px solid ${C.navyLight}`,cursor:"pointer"}}>
                <h3 style={{fontFamily:f.h,fontSize:"15px",fontWeight:700,color:C.white,marginBottom:"4px"}}>{svc.title}</h3>
                <p style={{fontFamily:f.b,fontSize:"14px",color:C.muted}}>{svc.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ BILINGUAL ══ */}
      <section style={{background:C.navy,padding:"60px 24px"}}>
        <div style={{maxWidth:"800px",margin:"0 auto",textAlign:"center"}}>
          <h2 style={{fontFamily:f.h,fontSize:"28px",fontWeight:800,color:C.white,marginBottom:"12px"}}>
            {t.bilingualTitle}
          </h2>
          <p style={{fontFamily:f.b,fontSize:"17px",color:C.offWhite,maxWidth:"600px",margin:"0 auto"}}>
            {t.bilingualP}
          </p>
        </div>
      </section>

      {/* ══ REVIEWS ══ */}
      <section style={{background:C.bg,padding:"80px 24px"}}>
        <div style={{maxWidth:"1000px",margin:"0 auto",textAlign:"center"}}>
          <Tag>{t.reviewsTag}</Tag>
          <h2 style={{...secTitle,color:C.white}}>{t.reviewsTitle}</h2>
          <GoldBar />
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(300px,1fr))",gap:"20px",marginTop:"48px",textAlign:"left"}}>
            {t.reviews.map((rev,i) => (
              <div key={i} style={{background:C.navyFade,border:`1px solid ${C.navyLight}`,borderRadius:"12px",padding:"28px"}}>
                <Stars />
                <p style={{fontFamily:f.b,fontSize:"15px",color:C.offWhite,lineHeight:1.65,margin:"16px 0",fontStyle:"italic"}}>"{rev.text}"</p>
                <div style={{borderTop:`1px solid ${C.navyLight}`,paddingTop:"12px",display:"flex",justifyContent:"space-between"}}>
                  <span style={{fontFamily:f.h,fontSize:"14px",fontWeight:600,color:C.white}}>{rev.name}</span>
                  <span style={{fontFamily:f.b,fontSize:"12px",color:C.muted}}>{rev.ctx}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ CTA ══ */}
      <section id="quote-form" style={{background:`linear-gradient(165deg,${C.navyMid},${C.navy})`,padding:"80px 24px"}}><div style={{maxWidth:"600px",margin:"0 auto",textAlign:"center"}}>
        <h2 style={{fontFamily:f.h,fontSize:"clamp(28px,5vw,40px)",fontWeight:800,color:C.white,marginBottom:"12px"}}>{t.ctaTitle}</h2>
        <p style={{fontFamily:f.b,fontSize:"17px",color:C.offWhite,marginBottom:"40px"}}>{t.ctaP}</p>
        {submitted ? <div style={{background:C.successDim,border:`1px solid ${C.success}`,borderRadius:"12px",padding:"32px"}}><div style={{fontSize:"48px",marginBottom:"12px"}}>✓</div><h3 style={{fontFamily:f.h,fontSize:"20px",fontWeight:700,color:"#4ADE80"}}>{t.successTitle}</h3><p style={{fontFamily:f.b,fontSize:"15px",color:C.muted,marginTop:"8px"}}>{t.successP}</p></div> : <div style={{background:C.white,borderRadius:"16px",padding:"32px",boxShadow:"0 24px 80px rgba(0,0,0,0.4)",textAlign:"left"}}>
          <h3 style={{fontFamily:f.h,fontSize:"18px",fontWeight:700,color:C.navy,textAlign:"center",marginBottom:"4px"}}>{t.formTitle}</h3>
          <div style={{width:"40px",height:"3px",background:C.gold,borderRadius:"2px",margin:"10px auto 20px"}} />
          <input style={inputStyle} placeholder={t.placeholderName} value={formData.name} onChange={e=>setFormData({...formData,name:e.target.value})} />
          <input style={inputStyle} placeholder={t.placeholderPhone} type="tel" value={formData.phone} onChange={e=>setFormData({...formData,phone:e.target.value})} />
          <input style={inputStyle} placeholder={t.placeholderEmail} type="email" value={formData.email} onChange={e=>setFormData({...formData,email:e.target.value})} />
          <input style={inputStyle} placeholder={t.placeholderZip} value={formData.zip} onChange={e=>setFormData({...formData,zip:e.target.value})} maxLength={5} />
          <button onClick={()=>setSubmitted(true)} style={{width:"100%",padding:"16px",fontFamily:f.h,fontSize:"14px",fontWeight:700,letterSpacing:"1.5px",color:C.white,background:`linear-gradient(135deg,${C.gold},${C.goldLight})`,border:"none",borderRadius:"8px",cursor:"pointer",boxShadow:"0 4px 16px rgba(200,149,46,0.3)"}}>{t.submitBtn}</button>
          <p style={{fontFamily:f.b,fontSize:"12px",color:"#9CA3AF",textAlign:"center",marginTop:"12px"}}>{t.formDisclaimer}</p>
        </div>}
        <div style={{marginTop:"32px"}}><a href="tel:8444443114" style={{fontFamily:f.h,fontSize:"18px",fontWeight:700,color:C.gold,textDecoration:"none"}}>📞 (844) 444-3114</a></div>
      </div></section>

      <SiteFooter />
      <MobileCTA scrollTarget="quote-form" />
      <style>{`*{box-sizing:border-box;margin:0;padding:0}::placeholder{color:#9CA3AF}input:focus{border-color:${C.gold}!important;}`}</style>
    </div>
  );
}
