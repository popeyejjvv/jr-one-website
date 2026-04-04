"use client";

import { useEffect } from "react";
import SiteNav from "../../components/SiteNav";
import SiteFooter from "../../components/SiteFooter";
import MobileCTA from "../../components/MobileCTA";

const injectFonts = () => { if (typeof document==="undefined"||document.querySelector("#jr-fonts")) return; const l=document.createElement("link"); l.id="jr-fonts"; l.rel="stylesheet"; l.href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800&family=Source+Sans+3:wght@300;400;600&display=swap"; document.head.appendChild(l); };
const C = { bg:"#0B1628",navy:"#1B2A4A",navyLight:"#2C3E5A",gold:"#C8952E",goldLight:"#D4A843",goldPale:"rgba(200,149,46,0.12)",cream:"#F5F3EF",white:"#FFFFFF",offWhite:"#E8E4DC",muted:"#7A8FA8" };
const f = { h:"'Montserrat', sans-serif", b:"'Source Sans 3', sans-serif" };

export default function PrivacyPolicyPage() {
  useEffect(() => { injectFonts(); }, []);

  const h2 = { fontFamily:f.h, fontSize:"20px", fontWeight:700, color:C.white, marginTop:"40px", marginBottom:"12px" };
  const p = { fontFamily:f.b, fontSize:"15px", color:C.offWhite, lineHeight:1.7, marginBottom:"16px" };

  return (
    <div style={{background:C.bg,color:C.white,fontFamily:f.b,lineHeight:1.65,minHeight:"100vh"}}>
      <SiteNav />

      <section style={{padding:"60px 24px 80px",maxWidth:"800px",margin:"0 auto"}}>
        <div style={{display:"inline-block",padding:"6px 16px",background:C.goldPale,borderRadius:"4px",marginBottom:"12px"}}>
          <span style={{fontFamily:f.h,fontSize:"12px",fontWeight:700,color:C.gold,letterSpacing:"3px"}}>LEGAL</span>
        </div>
        <h1 style={{fontFamily:f.h,fontSize:"clamp(28px,4vw,40px)",fontWeight:800,marginBottom:"8px"}}>Privacy Policy</h1>
        <p style={{fontFamily:f.b,fontSize:"14px",color:C.muted,marginBottom:"32px"}}>Last updated: April 2026</p>

        <p style={p}>JR One Aluminum LLC ("we," "us," or "our") respects your privacy. This Privacy Policy explains how we collect, use, and protect information when you visit jronegutters.com or interact with our services.</p>

        <h2 style={h2}>Information We Collect</h2>
        <p style={p}>When you request a quote or contact us, we may collect your name, phone number, email address, ZIP code, and details about the service you need. We also collect standard website usage data through cookies and analytics tools, including your IP address, browser type, and pages visited.</p>

        <h2 style={h2}>How We Use Your Information</h2>
        <p style={p}>We use your information to respond to quote requests, provide our services, communicate about your project, send relevant updates or promotions (with your consent), and improve our website and customer experience.</p>

        <h2 style={h2}>Information Sharing</h2>
        <p style={p}>We do not sell or rent your personal information. We may share information with trusted service providers who help us operate our business (such as email platforms and CRM tools), but only as necessary to serve you. We may also disclose information if required by law.</p>

        <h2 style={h2}>Data Security</h2>
        <p style={p}>We implement reasonable security measures to protect your information. However, no internet transmission is completely secure, and we cannot guarantee absolute security.</p>

        <h2 style={h2}>Cookies</h2>
        <p style={p}>Our website uses cookies and similar technologies to analyze traffic and improve your experience. You can control cookie preferences through your browser settings.</p>

        <h2 style={h2}>Your Rights</h2>
        <p style={p}>You may request access to, correction of, or deletion of your personal information at any time by contacting us. Florida residents may have additional rights under applicable state privacy laws.</p>

        <h2 style={h2}>Contact Us</h2>
        <p style={p}>If you have questions about this Privacy Policy, contact us at:</p>
        <p style={p}>JR One Aluminum LLC<br/>Tampa, FL<br/>Phone: <a href="tel:8444443114" style={{color:C.gold,textDecoration:"none"}}>(844) 444-3114</a><br/>Email: <a href="mailto:info@jronegutters.com" style={{color:C.gold,textDecoration:"none"}}>info@jronegutters.com</a></p>
      </section>

      <SiteFooter />
      <MobileCTA />
      <style>{`*{box-sizing:border-box;margin:0;padding:0}`}</style>
    </div>
  );
}
