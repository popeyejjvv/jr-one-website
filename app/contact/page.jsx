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
const inputStyle = {width:"100%",padding:"14px 16px",fontFamily:f.b,fontSize:"15px",border:`1.5px solid ${C.navyLight}`,borderRadius:"8px",outline:"none",color:C.white,marginBottom:"14px",background:C.navyFade,boxSizing:"border-box"};

const CITIES = ["Tampa","Clearwater","St. Petersburg","Sarasota","Bradenton","Lakeland","Brandon","Wesley Chapel","Palm Harbor","Riverview","New Port Richey","Largo","Spring Hill","Tarpon Springs","Land O' Lakes","Dunedin","Ruskin","Sun City Center","Temple Terrace","Plant City","Lutz","Odessa","Oldsmar","Safety Harbor","Seminole","Pinellas Park"];

const T = {
  en: {
    heroTag: "CONTACT US",
    heroH1a: "Let's Talk About",
    heroH1b: "Your Project.",
    heroP: "Call us, fill out the form, or just tell us what you need. We respond within hours — not days.",
    formTitle: "Send Us a Message",
    placeholderName: "Full Name *",
    placeholderPhone: "Phone Number *",
    placeholderEmail: "Email Address *",
    placeholderZip: "ZIP Code",
    serviceDefault: "What do you need?",
    serviceOptions: ["Gutter Installation","Gutter Repair","Gutter Guards","Soffit & Fascia","Siding","Gutter Cleaning","Peak 301 Roof Rejuvenation","Other / Not Sure"],
    placeholderMessage: "Tell us about your project (optional)",
    submitBtn: "SEND MESSAGE",
    formDisclaimer: "No spam. No pressure. We just want to help.",
    successTitle: "Message Received!",
    successP1: "We'll get back to you within hours. If it's urgent, call us directly at ",
    callUsLabel: "CALL US",
    callUsHours: "Monday – Saturday, 7:00 AM – 6:00 PM",
    callUsBilingual: "🇭🇳 Hablamos Español",
    emailUsLabel: "EMAIL US",
    emailUsP: "We respond to emails within the same business day.",
    locationLabel: "LOCATION",
    locationCity: "Tampa, Florida",
    locationP: "Serving Tampa Bay and Florida's west coast — from Spring Hill to Sarasota and everywhere in between.",
    financingLabel: "FINANCING AVAILABLE",
    financingP: "We offer flexible financing options to make quality aluminum services accessible. Ask about current programs when you contact us.",
    serviceAreaTag: "SERVICE AREA",
    serviceAreaTitle: "WHERE WE WORK",
    serviceAreaP: "We serve 20+ cities across Tampa Bay and Florida's west coast. If you're in the area, we can help.",
    mapLabel: "GOOGLE MAP EMBED",
    mapSub: "Service area map with all 20+ cities",
    whatNextTag: "WHAT HAPPENS NEXT",
    whatNextTitle: "AFTER YOU REACH OUT",
    whatNextSteps: [
      {num:"1",title:"We respond",desc:"Within hours of your call or form submission, you'll hear from us. Not a call center — our actual team."},
      {num:"2",title:"We schedule",desc:"We set up a time for your free on-site assessment at your convenience. No surprise visits."},
      {num:"3",title:"We assess",desc:"We inspect your home, listen to your concerns, take photos, and explain what we find — honestly."},
      {num:"4",title:"We estimate",desc:"You receive a detailed, transparent estimate with line items. No vague numbers, no hidden fees."},
    ],
  },
  es: {
    heroTag: "CONTACTENOS",
    heroH1a: "Hablemos Sobre",
    heroH1b: "Tu Proyecto.",
    heroP: "Llamanos, llena el formulario, o simplemente dinos lo que necesitas. Respondemos en horas — no en dias.",
    formTitle: "Envianos un Mensaje",
    placeholderName: "Nombre Completo *",
    placeholderPhone: "Numero de Telefono *",
    placeholderEmail: "Correo Electronico *",
    placeholderZip: "Codigo Postal",
    serviceDefault: "Que necesitas?",
    serviceOptions: ["Instalacion de Canaletas","Reparacion de Canaletas","Protectores de Canaletas","Sofito y Fascia","Revestimiento","Limpieza de Canaletas","Peak 301 Rejuvenecimiento de Techo","Otro / No Estoy Seguro"],
    placeholderMessage: "Cuentanos sobre tu proyecto (opcional)",
    submitBtn: "ENVIAR MENSAJE",
    formDisclaimer: "Sin spam. Sin presion. Solo queremos ayudar.",
    successTitle: "Mensaje Recibido!",
    successP1: "Te responderemos en horas. Si es urgente, llamanos directamente al ",
    callUsLabel: "LLAMANOS",
    callUsHours: "Lunes – Sabado, 7:00 AM – 6:00 PM",
    callUsBilingual: "🇭🇳 Hablamos Espanol",
    emailUsLabel: "CORREO ELECTRONICO",
    emailUsP: "Respondemos correos electronicos el mismo dia habil.",
    locationLabel: "UBICACION",
    locationCity: "Tampa, Florida",
    locationP: "Sirviendo a Tampa Bay y la costa oeste de Florida — desde Spring Hill hasta Sarasota y todo lo que hay en medio.",
    financingLabel: "FINANCIAMIENTO DISPONIBLE",
    financingP: "Ofrecemos opciones de financiamiento flexibles para hacer accesibles nuestros servicios de aluminio de calidad. Pregunta sobre los programas actuales cuando nos contactes.",
    serviceAreaTag: "AREA DE SERVICIO",
    serviceAreaTitle: "DONDE TRABAJAMOS",
    serviceAreaP: "Servimos a mas de 20 ciudades en Tampa Bay y la costa oeste de Florida. Si estas en el area, podemos ayudarte.",
    mapLabel: "MAPA DE GOOGLE",
    mapSub: "Mapa del area de servicio con mas de 20 ciudades",
    whatNextTag: "QUE PASA DESPUES",
    whatNextTitle: "DESPUES DE QUE NOS CONTACTES",
    whatNextSteps: [
      {num:"1",title:"Respondemos",desc:"Dentro de las primeras horas de tu llamada o formulario, te contactaremos. No es un centro de llamadas — es nuestro equipo real."},
      {num:"2",title:"Programamos",desc:"Agendamos una cita para tu evaluacion gratuita en el sitio a tu conveniencia. Sin visitas sorpresa."},
      {num:"3",title:"Evaluamos",desc:"Inspeccionamos tu hogar, escuchamos tus inquietudes, tomamos fotos y te explicamos lo que encontramos — honestamente."},
      {num:"4",title:"Cotizamos",desc:"Recibes un estimado detallado y transparente con cada item desglosado. Sin numeros vagos, sin cargos ocultos."},
    ],
  },
};

export default function ContactPage() {
  const [formData, setFormData] = useState({name:"",phone:"",email:"",zip:"",service:"",message:""});
  const [submitted, setSubmitted] = useState(false);
  const { lang } = useLanguage();
  const t = T[lang];
  useEffect(() => { injectFonts(); }, []);
  const secTitle = {fontFamily:f.h,fontSize:"clamp(24px,4vw,36px)",fontWeight:800,letterSpacing:"2px",textAlign:"center",marginBottom:"8px"};

  const serviceDropdown = [t.serviceDefault, ...t.serviceOptions];

  return (
    <div style={{background:C.bg,color:C.white,fontFamily:f.b,lineHeight:1.65,minHeight:"100vh"}}>
      <SiteNav />

      {/* ══ HERO ══ */}
      <section className="hero-stars" style={{padding:"60px 24px 40px",maxWidth:"900px",margin:"0 auto",textAlign:"center"}}>
        <Tag>{t.heroTag}</Tag>
        <h1 style={{fontFamily:f.h,fontSize:"clamp(32px,5vw,48px)",fontWeight:800,lineHeight:1.1,marginBottom:"16px"}}>
          {t.heroH1a}<br/><span style={{color:C.gold}}>{t.heroH1b}</span>
        </h1>
        <p style={{fontFamily:f.b,fontSize:"18px",color:C.muted,maxWidth:"600px",margin:"0 auto"}}>
          {t.heroP}
        </p>
      </section>

      {/* ══ CONTACT GRID ══ */}
      <section style={{padding:"20px 24px 80px",maxWidth:"1100px",margin:"0 auto",display:"flex",gap:"40px",flexWrap:"wrap"}}>

        {/* LEFT: Form */}
        <div style={{flex:"1 1 480px",minWidth:"320px"}}>
          {submitted ? (
            <div style={{background:C.navyFade,border:`1px solid ${C.success}`,borderRadius:"16px",padding:"48px 32px",textAlign:"center"}}>
              <div style={{fontSize:"48px",marginBottom:"16px"}}>✓</div>
              <h3 style={{fontFamily:f.h,fontSize:"22px",fontWeight:700,color:"#4ADE80",marginBottom:"8px"}}>{t.successTitle}</h3>
              <p style={{fontFamily:f.b,fontSize:"16px",color:C.muted}}>{t.successP1}<a href="tel:8444443114" style={{color:C.gold,textDecoration:"none",fontWeight:600}}>(844) 444-3114</a>.</p>
            </div>
          ) : (
            <div style={{background:C.navyFade,border:`1px solid ${C.navyLight}`,borderRadius:"16px",padding:"32px"}}>
              <h2 style={{fontFamily:f.h,fontSize:"20px",fontWeight:700,color:C.white,marginBottom:"4px"}}>{t.formTitle}</h2>
              <div style={{width:"40px",height:"3px",background:C.gold,borderRadius:"2px",margin:"10px 0 24px"}} />

              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"14px"}}>
                <input style={inputStyle} placeholder={t.placeholderName} value={formData.name} onChange={e=>setFormData({...formData,name:e.target.value})} />
                <input style={inputStyle} placeholder={t.placeholderPhone} type="tel" value={formData.phone} onChange={e=>setFormData({...formData,phone:e.target.value})} />
              </div>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"14px"}}>
                <input style={inputStyle} placeholder={t.placeholderEmail} type="email" value={formData.email} onChange={e=>setFormData({...formData,email:e.target.value})} />
                <input style={inputStyle} placeholder={t.placeholderZip} value={formData.zip} onChange={e=>setFormData({...formData,zip:e.target.value})} maxLength={5} />
              </div>
              <select style={{...inputStyle,cursor:"pointer",color:formData.service?C.white:C.muted}} value={formData.service} onChange={e=>setFormData({...formData,service:e.target.value})}>
                {serviceDropdown.map((opt,i) => <option key={i} value={i===0?"":opt} style={{color:C.charcoal}}>{opt}</option>)}
              </select>
              <textarea style={{...inputStyle,height:"120px",resize:"vertical"}} placeholder={t.placeholderMessage} value={formData.message} onChange={e=>setFormData({...formData,message:e.target.value})} />

              <button onClick={()=>setSubmitted(true)} style={{width:"100%",padding:"16px",fontFamily:f.h,fontSize:"14px",fontWeight:700,letterSpacing:"1.5px",color:C.white,background:`linear-gradient(135deg,${C.gold},${C.goldLight})`,border:"none",borderRadius:"8px",cursor:"pointer",boxShadow:"0 4px 16px rgba(200,149,46,0.3)",transition:"transform 0.15s"}}
                onMouseOver={e=>e.target.style.transform="translateY(-2px)"}
                onMouseOut={e=>e.target.style.transform="none"}>
                {t.submitBtn}
              </button>
              <p style={{fontFamily:f.b,fontSize:"12px",color:C.muted,textAlign:"center",marginTop:"12px"}}>{t.formDisclaimer}</p>
            </div>
          )}
        </div>

        {/* RIGHT: Contact info */}
        <div style={{flex:"1 1 300px",minWidth:"280px"}}>

          {/* Phone */}
          <div style={{background:C.navyFade,border:`1px solid ${C.navyLight}`,borderRadius:"12px",padding:"24px",marginBottom:"16px"}}>
            <div style={{fontFamily:f.h,fontSize:"11px",fontWeight:700,color:C.gold,letterSpacing:"2px",marginBottom:"8px"}}>{t.callUsLabel}</div>
            <a href="tel:8444443114" style={{fontFamily:f.h,fontSize:"24px",fontWeight:700,color:C.white,textDecoration:"none"}}>(844) 444-3114</a>
            <p style={{fontFamily:f.b,fontSize:"14px",color:C.muted,marginTop:"8px"}}>{t.callUsHours}</p>
            <p style={{fontFamily:f.b,fontSize:"14px",color:C.gold,marginTop:"4px"}}>{t.callUsBilingual}</p>
          </div>

          {/* Email */}
          <div style={{background:C.navyFade,border:`1px solid ${C.navyLight}`,borderRadius:"12px",padding:"24px",marginBottom:"16px"}}>
            <div style={{fontFamily:f.h,fontSize:"11px",fontWeight:700,color:C.gold,letterSpacing:"2px",marginBottom:"8px"}}>{t.emailUsLabel}</div>
            <a href="mailto:info@jronegutters.com" style={{fontFamily:f.b,fontSize:"16px",color:C.white,textDecoration:"none"}}>info@jronegutters.com</a>
            <p style={{fontFamily:f.b,fontSize:"14px",color:C.muted,marginTop:"8px"}}>{t.emailUsP}</p>
          </div>

          {/* Location */}
          <div style={{background:C.navyFade,border:`1px solid ${C.navyLight}`,borderRadius:"12px",padding:"24px",marginBottom:"16px"}}>
            <div style={{fontFamily:f.h,fontSize:"11px",fontWeight:700,color:C.gold,letterSpacing:"2px",marginBottom:"8px"}}>{t.locationLabel}</div>
            <p style={{fontFamily:f.b,fontSize:"16px",color:C.white}}>{t.locationCity}</p>
            <p style={{fontFamily:f.b,fontSize:"14px",color:C.muted,marginTop:"8px"}}>{t.locationP}</p>
          </div>

          {/* Financing */}
          <div style={{background:C.goldPale,border:`1px solid ${C.gold}40`,borderRadius:"12px",padding:"24px"}}>
            <div style={{fontFamily:f.h,fontSize:"11px",fontWeight:700,color:C.gold,letterSpacing:"2px",marginBottom:"8px"}}>{t.financingLabel}</div>
            <p style={{fontFamily:f.b,fontSize:"14px",color:C.offWhite,lineHeight:1.55}}>{t.financingP}</p>
          </div>
        </div>
      </section>

      {/* ══ SERVICE AREA MAP ══ */}
      <section style={{background:C.navy,padding:"80px 24px"}}>
        <div style={{maxWidth:"1000px",margin:"0 auto",textAlign:"center"}}>
          <Tag>{t.serviceAreaTag}</Tag>
          <h2 style={{...secTitle,color:C.white}}>{t.serviceAreaTitle}</h2>
          <GoldBar />
          <p style={{fontFamily:f.b,fontSize:"17px",color:C.muted,maxWidth:"600px",margin:"0 auto 40px"}}>
            {t.serviceAreaP}
          </p>

          {/* Map placeholder */}
          <div style={{borderRadius:"16px",overflow:"hidden",border:`1px solid ${C.navyLight}`,background:C.navyFade,aspectRatio:"16/9",display:"flex",alignItems:"center",justifyContent:"center",marginBottom:"40px"}}>
            <div style={{textAlign:"center",color:C.muted}}><div style={{fontSize:"48px",marginBottom:"8px"}}>🗺️</div><p style={{fontFamily:f.h,fontSize:"12px",letterSpacing:"1px"}}>{t.mapLabel}</p><p style={{fontFamily:f.b,fontSize:"12px",marginTop:"4px"}}>{t.mapSub}</p></div>
          </div>

          {/* City grid */}
          <div style={{display:"flex",flexWrap:"wrap",justifyContent:"center",gap:"8px"}}>
            {CITIES.map((city,i) => (
              <span key={i} style={{padding:"8px 16px",background:C.navyFade,border:`1px solid ${C.navyLight}`,borderRadius:"6px",fontFamily:f.h,fontSize:"13px",fontWeight:500,color:C.offWhite,cursor:"pointer",transition:"all 0.2s"}}
                onMouseOver={e=>{e.target.style.borderColor=C.gold;e.target.style.color=C.gold;}}
                onMouseOut={e=>{e.target.style.borderColor=C.navyLight;e.target.style.color=C.offWhite;}}>
                {city}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ══ WHAT TO EXPECT ══ */}
      <section style={{background:C.bg,padding:"80px 24px"}}>
        <div style={{maxWidth:"800px",margin:"0 auto",textAlign:"center"}}>
          <Tag>{t.whatNextTag}</Tag>
          <h2 style={{...secTitle,color:C.white}}>{t.whatNextTitle}</h2>
          <GoldBar />
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))",gap:"24px",marginTop:"48px"}}>
            {t.whatNextSteps.map((step,i) => (
              <div key={i} style={{background:C.navyFade,border:`1px solid ${C.navyLight}`,borderRadius:"12px",padding:"24px",textAlign:"center"}}>
                <div style={{fontFamily:f.h,fontSize:"32px",fontWeight:800,color:C.gold,marginBottom:"8px"}}>{step.num}</div>
                <h3 style={{fontFamily:f.h,fontSize:"16px",fontWeight:700,color:C.white,marginBottom:"8px"}}>{step.title}</h3>
                <p style={{fontFamily:f.b,fontSize:"14px",color:C.muted,lineHeight:1.55}}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <SiteFooter />
      <MobileCTA />
      <style>{`*{box-sizing:border-box;margin:0;padding:0}::placeholder{color:${C.muted}}input:focus,select:focus,textarea:focus{border-color:${C.gold}!important}`}</style>
    </div>
  );
}
