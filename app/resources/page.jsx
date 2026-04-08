"use client";

import { useEffect } from "react";
import SiteNav from "../../components/SiteNav";
import SiteFooter from "../../components/SiteFooter";
import MobileCTA from "../../components/MobileCTA";
import { useLanguage } from "../../lib/LanguageContext";

const injectFonts = () => { if (typeof document==="undefined"||document.querySelector("#jr-fonts")) return; const l=document.createElement("link"); l.id="jr-fonts"; l.rel="stylesheet"; l.href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800&family=Source+Sans+3:wght@300;400;600&display=swap"; document.head.appendChild(l); };
const C = { bg:"#0B1628",navy:"#1B2A4A",navyMid:"#243556",navyLight:"#2C3E5A",navyFade:"#162033",gold:"#C8952E",goldLight:"#D4A843",goldPale:"rgba(200,149,46,0.12)",cream:"#F5F3EF",white:"#FFFFFF",offWhite:"#E8E4DC",muted:"#7A8FA8",charcoal:"#2D2D2D",success:"#2D8B4E",successDim:"rgba(45,139,78,0.15)" };
const f = { h:"'Montserrat', sans-serif", b:"'Source Sans 3', sans-serif" };
const Tag = ({children}) => <div style={{display:"inline-block",padding:"6px 16px",background:C.goldPale,borderRadius:"4px",marginBottom:"12px"}}><span style={{fontFamily:f.h,fontSize:"12px",fontWeight:700,color:C.gold,letterSpacing:"3px"}}>{children}</span></div>;
const GoldBar = () => <div style={{width:"60px",height:"3px",background:`linear-gradient(90deg,${C.gold},${C.goldLight})`,borderRadius:"2px",margin:"16px auto"}} />;

const T = {
  en: {
    tag: "RESOURCES",
    heroTitle1: "Everything You Need.",
    heroTitle2: "All In One Place.",
    heroP: "Care guides, license verification, and insurance documentation. Whether you're a homeowner protecting your install for the long run, or a builder vetting us for your next project — it's all here.",

    careTag: "MAINTENANCE",
    careTitle: "CARE & MAINTENANCE",
    careIntro: "Your aluminum exterior is built to last decades — but it still needs occasional attention. This plain-English guide walks you through the few simple things that will keep your gutters, soffit, and fascia working for the long run. Available in English and Spanish.",
    careDoc: {
      icon: "🧰",
      title: "Maintenance & Care Guide",
      desc: "A 2-page homeowner guide covering gutter cleaning, soffit and fascia care, what to do twice a year, what to never do, and exactly when to call us instead of DIY. Written in plain language — no jargon, no contractor-speak.",
      en: "JR_One_Maintenance_Care_Guide.pdf",
      es: "es-JR_One_Maintenance_Care_Guide.pdf",
    },

    legalTag: "LICENSE & INSURANCE",
    legalTitle: "VERIFICATION DOCUMENTS",
    legalIntro: "We don't expect you to take our word for it. Below are our official documents — straight from the State of Florida and our insurance carriers. Download whichever you need.",
    legalDocs: [
      {
        icon: "🏛️",
        title: "Florida LLC Certificate of Active Status",
        desc: "Certificate of Status from the Florida Department of State confirming JR One Aluminum LLC is an active limited liability company in good standing. Filed November 5, 2010. Document number L10000115561. Most recent annual report filed April 7, 2026.",
        file: "JR_One_Sunbiz_Active_Status_2026.pdf",
      },
      {
        icon: "🛡️",
        title: "Certificate of Insurance — General Liability",
        desc: "ACORD 25 Certificate of Liability Insurance. $1M each occurrence, $2M general aggregate, $2M products/completed operations aggregate. Carrier: Ascendant Commercial Insurance Co. Policy GL-60282-7. Coverage for gutters installation work.",
        file: "JR_One_COI_General_Liability_2026.pdf",
      },
      {
        icon: "👷",
        title: "Certificate of Insurance — Workers' Comp + Auto",
        desc: "ACORD 25 Certificate covering Workers' Compensation ($1M each accident / $1M disease) via PIE Insurance Company, plus Commercial Auto Liability via Berkshire Hathaway Homestate. Includes blanket waiver of subrogation when required by written contract.",
        file: "JR_One_COI_Workers_Comp_Auto_2026.pdf",
      },
    ],

    downloadBtn: "DOWNLOAD PDF",
    englishPdf: "ENGLISH PDF",
    spanishPdf: "ESPAÑOL PDF",

    trustTag: "TRANSPARENCY",
    trustTitle: "WHY WE PUT THIS HERE",
    trustBody: "Most contractors hide their license and insurance documents — or make you call and ask for them. We don't. Our LLC has been active in Florida since 2010, our insurance is current, and our work is backed by a 3-year workmanship warranty. If you want to verify any of it before signing a contract — you should be able to do that on your own time.",

    ctaTitle: "QUESTIONS ABOUT ANY OF THIS?",
    ctaSub: "Call us. We answer the phone — and we'll send anything you need by email if you can't find it here.",
  },
  es: {
    tag: "RECURSOS",
    heroTitle1: "Todo Lo Que Necesita.",
    heroTitle2: "En Un Solo Lugar.",
    heroP: "Guías de cuidado, verificación de licencia y documentación de seguro. Ya sea que sea un propietario protegiendo su instalación a largo plazo, o un constructor evaluándonos para su próximo proyecto — todo está aquí.",

    careTag: "MANTENIMIENTO",
    careTitle: "CUIDADO Y MANTENIMIENTO",
    careIntro: "Su exterior de aluminio está construido para durar décadas — pero aún necesita atención ocasional. Esta guía en lenguaje sencillo le explica las pocas cosas simples que mantendrán sus canaletas, sofito y fascia funcionando a largo plazo. Disponible en inglés y español.",
    careDoc: {
      icon: "🧰",
      title: "Guía de Mantenimiento y Cuidado",
      desc: "Una guía de 2 páginas para propietarios que cubre la limpieza de canaletas, el cuidado del sofito y la fascia, qué hacer dos veces al año, qué nunca hacer y exactamente cuándo llamarnos en lugar de hacerlo usted mismo. Escrita en lenguaje sencillo — sin jerga, sin tecnicismos.",
      en: "JR_One_Maintenance_Care_Guide.pdf",
      es: "es-JR_One_Maintenance_Care_Guide.pdf",
    },

    legalTag: "LICENCIA Y SEGURO",
    legalTitle: "DOCUMENTOS DE VERIFICACIÓN",
    legalIntro: "No esperamos que solo crea en nuestra palabra. A continuación están nuestros documentos oficiales — directamente del Estado de Florida y nuestras compañías de seguros. Descargue lo que necesite.",
    legalDocs: [
      {
        icon: "🏛️",
        title: "Certificado de Estado Activo — Florida LLC",
        desc: "Certificado de Estado del Departamento de Estado de Florida que confirma que JR One Aluminum LLC es una compañía de responsabilidad limitada activa y en buen estado. Registrada el 5 de noviembre de 2010. Número de documento L10000115561. Reporte anual más reciente presentado el 7 de abril de 2026.",
        file: "JR_One_Sunbiz_Active_Status_2026.pdf",
      },
      {
        icon: "🛡️",
        title: "Certificado de Seguro — Responsabilidad General",
        desc: "Certificado ACORD 25 de Seguro de Responsabilidad. $1M por ocurrencia, $2M agregado general, $2M agregado de productos/operaciones completadas. Aseguradora: Ascendant Commercial Insurance Co. Póliza GL-60282-7. Cobertura para trabajo de instalación de canaletas.",
        file: "JR_One_COI_General_Liability_2026.pdf",
      },
      {
        icon: "👷",
        title: "Certificado de Seguro — Compensación al Trabajador + Auto",
        desc: "Certificado ACORD 25 que cubre Compensación al Trabajador ($1M por accidente / $1M por enfermedad) a través de PIE Insurance Company, más Responsabilidad de Auto Comercial a través de Berkshire Hathaway Homestate. Incluye exención general de subrogación cuando sea requerida por contrato escrito.",
        file: "JR_One_COI_Workers_Comp_Auto_2026.pdf",
      },
    ],

    downloadBtn: "DESCARGAR PDF",
    englishPdf: "ENGLISH PDF",
    spanishPdf: "ESPAÑOL PDF",

    trustTag: "TRANSPARENCIA",
    trustTitle: "POR QUÉ PUBLICAMOS ESTO",
    trustBody: "La mayoría de los contratistas esconden sus documentos de licencia y seguro — o hacen que llame y los pida. Nosotros no. Nuestra LLC ha estado activa en Florida desde 2010, nuestro seguro está vigente, y nuestro trabajo está respaldado por una garantía de mano de obra de 3 años. Si quiere verificar cualquiera de esto antes de firmar un contrato — debería poder hacerlo en su propio tiempo.",

    ctaTitle: "¿PREGUNTAS SOBRE ALGO DE ESTO?",
    ctaSub: "Llámenos. Contestamos el teléfono — y le enviaremos cualquier cosa que necesite por correo si no la encuentra aquí.",
  },
};

export default function ResourcesPage() {
  const { lang } = useLanguage();
  const t = T[lang];
  useEffect(() => { injectFonts(); }, []);
  const secTitle = {fontFamily:f.h,fontSize:"clamp(24px,4vw,36px)",fontWeight:800,letterSpacing:"2px",textAlign:"center",marginBottom:"8px"};

  return (
    <div style={{background:C.bg,color:C.white,fontFamily:f.b,lineHeight:1.65,minHeight:"100vh"}}>
      <SiteNav />

      {/* HERO */}
      <section className="hero-stars" style={{padding:"60px 24px 40px",maxWidth:"900px",margin:"0 auto",textAlign:"center"}}>
        <Tag>{t.tag}</Tag>
        <h1 style={{fontFamily:f.h,fontSize:"clamp(32px,5vw,44px)",fontWeight:800,lineHeight:1.1,marginBottom:"16px"}}>{t.heroTitle1}<br/><span style={{color:C.gold}}>{t.heroTitle2}</span></h1>
        <p style={{fontFamily:f.b,fontSize:"18px",color:C.muted,maxWidth:"650px",margin:"0 auto"}}>{t.heroP}</p>
      </section>

      {/* CARE GUIDE */}
      <section style={{padding:"40px 24px 60px"}}>
        <div style={{maxWidth:"900px",margin:"0 auto",textAlign:"center"}}>
          <Tag>{t.careTag}</Tag>
          <h2 style={{...secTitle,color:C.white}}>{t.careTitle}</h2>
          <GoldBar />
          <p style={{fontFamily:f.b,fontSize:"16px",color:C.muted,maxWidth:"650px",margin:"0 auto 32px"}}>{t.careIntro}</p>

          <div style={{maxWidth:"600px",margin:"0 auto",background:C.navyFade,border:`2px solid ${C.gold}`,borderRadius:"16px",padding:"32px",textAlign:"left"}}>
            <div style={{fontSize:"36px",marginBottom:"12px",textAlign:"center"}}>{t.careDoc.icon}</div>
            <h3 style={{fontFamily:f.h,fontSize:"18px",fontWeight:700,color:C.gold,marginBottom:"12px",letterSpacing:"1px",textAlign:"center"}}>{t.careDoc.title}</h3>
            <p style={{fontFamily:f.b,fontSize:"14px",color:C.muted,lineHeight:1.65,marginBottom:"22px"}}>{t.careDoc.desc}</p>
            <div style={{display:"flex",gap:"12px",flexWrap:"wrap",justifyContent:"center"}}>
              <a href={`/documents/${t.careDoc.en}`} target="_blank" rel="noopener noreferrer" style={{display:"inline-flex",alignItems:"center",gap:"6px",padding:"12px 20px",fontFamily:f.h,fontSize:"12px",fontWeight:700,letterSpacing:"1.5px",color:C.navy,background:`linear-gradient(135deg,${C.gold},${C.goldLight})`,borderRadius:"6px",textDecoration:"none"}}>↓ {t.englishPdf}</a>
              <a href={`/documents/${t.careDoc.es}`} target="_blank" rel="noopener noreferrer" style={{display:"inline-flex",alignItems:"center",gap:"6px",padding:"12px 20px",fontFamily:f.h,fontSize:"12px",fontWeight:700,letterSpacing:"1.5px",color:C.gold,background:"transparent",border:`1.5px solid ${C.gold}`,borderRadius:"6px",textDecoration:"none"}}>↓ {t.spanishPdf}</a>
            </div>
          </div>
        </div>
      </section>

      {/* LEGAL / VERIFICATION DOCS */}
      <section style={{background:C.navy,padding:"80px 24px"}}>
        <div style={{maxWidth:"900px",margin:"0 auto",textAlign:"center"}}>
          <Tag>{t.legalTag}</Tag>
          <h2 style={{...secTitle,color:C.white}}>{t.legalTitle}</h2>
          <GoldBar />
          <p style={{fontFamily:f.b,fontSize:"16px",color:C.muted,maxWidth:"650px",margin:"0 auto 40px"}}>{t.legalIntro}</p>

          <div style={{display:"grid",gridTemplateColumns:"1fr",gap:"16px",textAlign:"left"}}>
            {t.legalDocs.map((doc,i) =>
              <div key={i} style={{background:C.navyFade,border:`1px solid ${C.navyLight}`,borderRadius:"12px",padding:"24px",display:"flex",gap:"20px",alignItems:"flex-start",flexWrap:"wrap"}}>
                <div style={{fontSize:"36px",flexShrink:0}}>{doc.icon}</div>
                <div style={{flex:"1 1 300px"}}>
                  <h3 style={{fontFamily:f.h,fontSize:"15px",fontWeight:700,color:C.gold,marginBottom:"10px",letterSpacing:"1px"}}>{doc.title}</h3>
                  <p style={{fontFamily:f.b,fontSize:"14px",color:C.muted,lineHeight:1.6,marginBottom:"16px"}}>{doc.desc}</p>
                  <a href={`/documents/${doc.file}`} target="_blank" rel="noopener noreferrer" style={{display:"inline-flex",alignItems:"center",gap:"6px",padding:"10px 18px",fontFamily:f.h,fontSize:"11px",fontWeight:700,letterSpacing:"1.5px",color:C.navy,background:`linear-gradient(135deg,${C.gold},${C.goldLight})`,borderRadius:"6px",textDecoration:"none"}}>↓ {t.downloadBtn}</a>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* TRANSPARENCY BLURB */}
      <section style={{background:C.bg,padding:"80px 24px"}}>
        <div style={{maxWidth:"720px",margin:"0 auto",textAlign:"center"}}>
          <Tag>{t.trustTag}</Tag>
          <h2 style={{...secTitle,color:C.white}}>{t.trustTitle}</h2>
          <GoldBar />
          <p style={{fontFamily:f.b,fontSize:"16px",color:C.muted,lineHeight:1.7,marginTop:"24px"}}>{t.trustBody}</p>
        </div>
      </section>

      {/* CTA */}
      <section style={{background:C.navy,padding:"60px 24px",textAlign:"center"}}>
        <h2 style={{fontFamily:f.h,fontSize:"28px",fontWeight:800,color:C.white,marginBottom:"12px"}}>{t.ctaTitle}</h2>
        <p style={{fontFamily:f.b,fontSize:"16px",color:C.muted,marginBottom:"24px",maxWidth:"600px",margin:"0 auto 24px"}}>{t.ctaSub}</p>
        <a href="tel:8444443114" style={{display:"inline-flex",alignItems:"center",gap:"8px",padding:"16px 32px",fontFamily:f.h,fontSize:"14px",fontWeight:700,letterSpacing:"1.5px",color:C.navy,background:`linear-gradient(135deg,${C.gold},${C.goldLight})`,borderRadius:"8px",textDecoration:"none"}}>📞 (844) 444-3114</a>
      </section>

      <SiteFooter />
      <MobileCTA />
      <style>{`*{box-sizing:border-box;margin:0;padding:0}`}</style>
    </div>
  );
}
