"use client";

import { useEffect } from "react";
import SiteNav from "../../components/SiteNav";
import SiteFooter from "../../components/SiteFooter";
import MobileCTA from "../../components/MobileCTA";
import { useLanguage } from "../../lib/LanguageContext";

const injectFonts = () => { if (typeof document==="undefined"||document.querySelector("#jr-fonts")) return; const l=document.createElement("link"); l.id="jr-fonts"; l.rel="stylesheet"; l.href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800&family=Source+Sans+3:wght@300;400;600&display=swap"; document.head.appendChild(l); };
const C = { bg:"#0B1628",navy:"#1B2A4A",navyLight:"#2C3E5A",gold:"#C8952E",goldLight:"#D4A843",goldPale:"rgba(200,149,46,0.12)",cream:"#F5F3EF",white:"#FFFFFF",offWhite:"#E8E4DC",muted:"#7A8FA8" };
const f = { h:"'Montserrat', sans-serif", b:"'Source Sans 3', sans-serif" };

const T = {
  en: {
    tag: "LEGAL",
    title: "Terms of Service",
    updated: "Last updated: April 2026",
    intro: "Welcome to jronegutters.com, operated by JR One Aluminum LLC. By using our website, you agree to these Terms of Service.",
    h2Use: "Use of Website",
    pUse: "This website is provided for informational purposes and to facilitate communication about our services. You agree to use the site lawfully and not to interfere with its operation or security.",
    h2Quotes: "Quote Requests",
    pQuotes: "Submitting a quote request through our website does not create a contractual obligation. All quotes are estimates and subject to final assessment upon on-site inspection. Pricing may vary based on actual conditions, materials, and scope of work.",
    h2Agreements: "Service Agreements",
    pAgreements: "Actual service agreements are established through separate written contracts between you and JR One Aluminum LLC. Work does not begin until a written agreement is signed by both parties.",
    h2IP: "Intellectual Property",
    pIP: "All content on this website — including text, images, logos, and design — is the property of JR One Aluminum LLC and is protected by applicable intellectual property laws. You may not reproduce, distribute, or use our content without written permission.",
    h2Liability: "Limitation of Liability",
    pLiability: 'JR One Aluminum LLC provides this website "as is" and makes no warranties about the accuracy or completeness of its content. We are not liable for any damages arising from your use of this website.',
    h2Warranties: "Warranties and Guarantees",
    pWarranties: "Product and service warranties are governed by your individual service agreement, not by information on this website. For warranty details, visit our",
    warrantiesLink: "Warranties page",
    pWarrantiesSuffix: "or contact us directly.",
    h2Law: "Governing Law",
    pLaw: "These terms are governed by the laws of the State of Florida. Any disputes will be resolved in the courts of Hillsborough County, Florida.",
    h2Changes: "Changes to Terms",
    pChanges: "We may update these terms at any time. Continued use of the website after changes constitutes acceptance of the updated terms.",
    h2Contact: "Contact Us",
    pContact: "Questions about these terms? Contact us at:",
  },
  es: {
    tag: "LEGAL",
    title: "Términos de Servicio",
    updated: "Última actualización: abril 2026",
    intro: "Bienvenido a jronegutters.com, operado por JR One Aluminum LLC. Al usar nuestro sitio web, usted acepta estos Términos de Servicio.",
    h2Use: "Uso del Sitio Web",
    pUse: "Este sitio web se proporciona con fines informativos y para facilitar la comunicación sobre nuestros servicios. Usted acepta usar el sitio de manera legal y no interferir con su operación o seguridad.",
    h2Quotes: "Solicitudes de Presupuesto",
    pQuotes: "Enviar una solicitud de presupuesto a través de nuestro sitio web no crea una obligación contractual. Todos los presupuestos son estimados y están sujetos a una evaluación final tras la inspección en sitio. Los precios pueden variar según las condiciones reales, materiales y alcance del trabajo.",
    h2Agreements: "Acuerdos de Servicio",
    pAgreements: "Los acuerdos de servicio reales se establecen mediante contratos escritos separados entre usted y JR One Aluminum LLC. El trabajo no comienza hasta que ambas partes firmen un acuerdo por escrito.",
    h2IP: "Propiedad Intelectual",
    pIP: "Todo el contenido de este sitio web — incluyendo texto, imágenes, logotipos y diseño — es propiedad de JR One Aluminum LLC y está protegido por las leyes de propiedad intelectual aplicables. No puede reproducir, distribuir ni usar nuestro contenido sin permiso por escrito.",
    h2Liability: "Limitación de Responsabilidad",
    pLiability: 'JR One Aluminum LLC proporciona este sitio web "tal cual" y no ofrece garantías sobre la precisión o integridad de su contenido. No somos responsables por ningún daño que surja del uso de este sitio web.',
    h2Warranties: "Garantías",
    pWarranties: "Las garantías de productos y servicios se rigen por su acuerdo de servicio individual, no por la información de este sitio web. Para detalles de garantía, visite nuestra",
    warrantiesLink: "página de Garantías",
    pWarrantiesSuffix: "o contáctenos directamente.",
    h2Law: "Ley Aplicable",
    pLaw: "Estos términos se rigen por las leyes del Estado de Florida. Cualquier disputa se resolverá en los tribunales del Condado de Hillsborough, Florida.",
    h2Changes: "Cambios en los Términos",
    pChanges: "Podemos actualizar estos términos en cualquier momento. El uso continuado del sitio web después de los cambios constituye la aceptación de los términos actualizados.",
    h2Contact: "Contáctenos",
    pContact: "¿Tiene preguntas sobre estos términos? Contáctenos en:",
  },
};

export default function TermsOfServicePage() {
  const { lang } = useLanguage();
  const t = T[lang];
  useEffect(() => { injectFonts(); }, []);

  const h2 = { fontFamily:f.h, fontSize:"20px", fontWeight:700, color:C.white, marginTop:"40px", marginBottom:"12px" };
  const p = { fontFamily:f.b, fontSize:"15px", color:C.offWhite, lineHeight:1.7, marginBottom:"16px" };

  return (
    <div style={{background:C.bg,color:C.white,fontFamily:f.b,lineHeight:1.65,minHeight:"100vh"}}>
      <SiteNav />

      <section className="hero-stars" style={{padding:"60px 24px 80px",maxWidth:"800px",margin:"0 auto"}}>
        <div style={{display:"inline-block",padding:"6px 16px",background:C.goldPale,borderRadius:"4px",marginBottom:"12px"}}>
          <span style={{fontFamily:f.h,fontSize:"12px",fontWeight:700,color:C.gold,letterSpacing:"3px"}}>{t.tag}</span>
        </div>
        <h1 style={{fontFamily:f.h,fontSize:"clamp(28px,4vw,40px)",fontWeight:800,marginBottom:"8px"}}>{t.title}</h1>
        <p style={{fontFamily:f.b,fontSize:"14px",color:C.muted,marginBottom:"32px"}}>{t.updated}</p>

        <p style={p}>{t.intro}</p>

        <h2 style={h2}>{t.h2Use}</h2>
        <p style={p}>{t.pUse}</p>

        <h2 style={h2}>{t.h2Quotes}</h2>
        <p style={p}>{t.pQuotes}</p>

        <h2 style={h2}>{t.h2Agreements}</h2>
        <p style={p}>{t.pAgreements}</p>

        <h2 style={h2}>{t.h2IP}</h2>
        <p style={p}>{t.pIP}</p>

        <h2 style={h2}>{t.h2Liability}</h2>
        <p style={p}>{t.pLiability}</p>

        <h2 style={h2}>{t.h2Warranties}</h2>
        <p style={p}>{t.pWarranties} <a href="/warranties" style={{color:C.gold,textDecoration:"none"}}>{t.warrantiesLink}</a> {t.pWarrantiesSuffix}</p>

        <h2 style={h2}>{t.h2Law}</h2>
        <p style={p}>{t.pLaw}</p>

        <h2 style={h2}>{t.h2Changes}</h2>
        <p style={p}>{t.pChanges}</p>

        <h2 style={h2}>{t.h2Contact}</h2>
        <p style={p}>{t.pContact}</p>
        <p style={p}>JR One Aluminum LLC<br/>Tampa, FL<br/>Phone: <a href="tel:8444443114" style={{color:C.gold,textDecoration:"none"}}>(844) 444-3114</a><br/>Email: <a href="mailto:info@jronegutters.com" style={{color:C.gold,textDecoration:"none"}}>info@jronegutters.com</a></p>
      </section>

      <SiteFooter />
      <MobileCTA />
      <style>{`*{box-sizing:border-box;margin:0;padding:0}`}</style>
    </div>
  );
}
