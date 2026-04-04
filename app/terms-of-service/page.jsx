"use client";

import { useEffect } from "react";
import SiteNav from "../../components/SiteNav";
import SiteFooter from "../../components/SiteFooter";
import MobileCTA from "../../components/MobileCTA";

const injectFonts = () => { if (typeof document==="undefined"||document.querySelector("#jr-fonts")) return; const l=document.createElement("link"); l.id="jr-fonts"; l.rel="stylesheet"; l.href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800&family=Source+Sans+3:wght@300;400;600&display=swap"; document.head.appendChild(l); };
const C = { bg:"#0B1628",navy:"#1B2A4A",navyLight:"#2C3E5A",gold:"#C8952E",goldLight:"#D4A843",goldPale:"rgba(200,149,46,0.12)",cream:"#F5F3EF",white:"#FFFFFF",offWhite:"#E8E4DC",muted:"#7A8FA8" };
const f = { h:"'Montserrat', sans-serif", b:"'Source Sans 3', sans-serif" };

export default function TermsOfServicePage() {
  useEffect(() => { injectFonts(); }, []);

  const h2 = { fontFamily:f.h, fontSize:"20px", fontWeight:700, color:C.white, marginTop:"40px", marginBottom:"12px" };
  const p = { fontFamily:f.b, fontSize:"15px", color:C.offWhite, lineHeight:1.7, marginBottom:"16px" };

  return (
    <div style={{background:C.bg,color:C.white,fontFamily:f.b,lineHeight:1.65,minHeight:"100vh"}}>
      <SiteNav />

      <section className="hero-stars" style={{padding:"60px 24px 80px",maxWidth:"800px",margin:"0 auto"}}>
        <div style={{display:"inline-block",padding:"6px 16px",background:C.goldPale,borderRadius:"4px",marginBottom:"12px"}}>
          <span style={{fontFamily:f.h,fontSize:"12px",fontWeight:700,color:C.gold,letterSpacing:"3px"}}>LEGAL</span>
        </div>
        <h1 style={{fontFamily:f.h,fontSize:"clamp(28px,4vw,40px)",fontWeight:800,marginBottom:"8px"}}>Terms of Service</h1>
        <p style={{fontFamily:f.b,fontSize:"14px",color:C.muted,marginBottom:"32px"}}>Last updated: April 2026</p>

        <p style={p}>Welcome to jronegutters.com, operated by JR One Aluminum LLC. By using our website, you agree to these Terms of Service.</p>

        <h2 style={h2}>Use of Website</h2>
        <p style={p}>This website is provided for informational purposes and to facilitate communication about our services. You agree to use the site lawfully and not to interfere with its operation or security.</p>

        <h2 style={h2}>Quote Requests</h2>
        <p style={p}>Submitting a quote request through our website does not create a contractual obligation. All quotes are estimates and subject to final assessment upon on-site inspection. Pricing may vary based on actual conditions, materials, and scope of work.</p>

        <h2 style={h2}>Service Agreements</h2>
        <p style={p}>Actual service agreements are established through separate written contracts between you and JR One Aluminum LLC. Work does not begin until a written agreement is signed by both parties.</p>

        <h2 style={h2}>Intellectual Property</h2>
        <p style={p}>All content on this website — including text, images, logos, and design — is the property of JR One Aluminum LLC and is protected by applicable intellectual property laws. You may not reproduce, distribute, or use our content without written permission.</p>

        <h2 style={h2}>Limitation of Liability</h2>
        <p style={p}>JR One Aluminum LLC provides this website "as is" and makes no warranties about the accuracy or completeness of its content. We are not liable for any damages arising from your use of this website.</p>

        <h2 style={h2}>Warranties and Guarantees</h2>
        <p style={p}>Product and service warranties are governed by your individual service agreement, not by information on this website. For warranty details, visit our <a href="/warranties" style={{color:C.gold,textDecoration:"none"}}>Warranties page</a> or contact us directly.</p>

        <h2 style={h2}>Governing Law</h2>
        <p style={p}>These terms are governed by the laws of the State of Florida. Any disputes will be resolved in the courts of Hillsborough County, Florida.</p>

        <h2 style={h2}>Changes to Terms</h2>
        <p style={p}>We may update these terms at any time. Continued use of the website after changes constitutes acceptance of the updated terms.</p>

        <h2 style={h2}>Contact Us</h2>
        <p style={p}>Questions about these terms? Contact us at:</p>
        <p style={p}>JR One Aluminum LLC<br/>Tampa, FL<br/>Phone: <a href="tel:8444443114" style={{color:C.gold,textDecoration:"none"}}>(844) 444-3114</a><br/>Email: <a href="mailto:info@jronegutters.com" style={{color:C.gold,textDecoration:"none"}}>info@jronegutters.com</a></p>
      </section>

      <SiteFooter />
      <MobileCTA />
      <style>{`*{box-sizing:border-box;margin:0;padding:0}`}</style>
    </div>
  );
}
