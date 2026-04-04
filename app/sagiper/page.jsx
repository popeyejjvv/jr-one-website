"use client";

import { useState, useEffect } from "react";
import SiteNav from "../../components/SiteNav";
import SiteFooter from "../../components/SiteFooter";
import MobileCTA from "../../components/MobileCTA";

const injectFonts = () => { if (typeof document==="undefined"||document.querySelector("#jr-fonts")) return; const l=document.createElement("link"); l.id="jr-fonts"; l.rel="stylesheet"; l.href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800&family=Source+Sans+3:wght@300;400;600&display=swap"; document.head.appendChild(l); };
const C = { bg:"#0B1628",navy:"#1B2A4A",navyMid:"#243556",navyLight:"#2C3E5A",navyFade:"#162033",gold:"#C8952E",goldLight:"#D4A843",goldPale:"rgba(200,149,46,0.12)",cream:"#F5F3EF",white:"#FFFFFF",offWhite:"#E8E4DC",muted:"#7A8FA8",charcoal:"#2D2D2D",accent:"#3D3D3D",accentLight:"#555555",accentPale:"rgba(61,61,61,0.12)" };
const f = { h:"'Montserrat', sans-serif", b:"'Source Sans 3', sans-serif" };
const Tag = ({children}) => <div style={{display:"inline-block",padding:"6px 16px",background:C.accentPale,borderRadius:"4px",marginBottom:"12px"}}><span style={{fontFamily:f.h,fontSize:"12px",fontWeight:700,color:C.accent,letterSpacing:"3px"}}>{children}</span></div>;
const GoldBar = () => <div style={{width:"60px",height:"3px",background:`linear-gradient(90deg,${C.accent},${C.accentLight})`,borderRadius:"2px",margin:"16px auto"}} />;
const Stars = () => <span style={{color:C.gold,fontSize:"14px",letterSpacing:"2px"}}>★★★★★</span>;
const inputStyle = {width:"100%",padding:"13px 16px",fontFamily:f.b,fontSize:"15px",border:"1.5px solid #D1D5DB",borderRadius:"8px",outline:"none",color:C.charcoal,marginBottom:"12px",background:"#FAFAFA",boxSizing:"border-box"};

const PAGE = {
  breadcrumb: ["Home","Services","SAGIPER"],
  heroTag: "PREMIUM ARCHITECTURAL CLADDING",
  heroH1: "The Future of",
  heroH1Gold: "Exterior Design.",
  heroP: "SAGIPER architectural cladding systems — engineered in Portugal, manufactured in Plant City, FL. Solar Shield Technology, 50-year warranty, zero maintenance. The premium choice for discerning homeowners and architects.",

  products: [
    { name:"SAGIWALL", subtitle:"Premium Exterior Siding & Cladding", desc:"Tongue-and-groove PVC with 5-layer Solar Shield Technology film. Channeled and V-groove profiles. 6\" width, lengths up to 35 ft (minimal seams). 30+ woodgrain, metallic, and RAL color finishes. ICC-ES ESR-4876 evaluated. NFPA 285 fire tested. ASTM E330 wind load tested. 50-year warranty, 15 years non-prorated.", icon:"🏠" },
    { name:"SAGIREV", subtitle:"Soffit & Ceiling System", desc:"Interior and exterior. 4\" V-groove, 6\" V-groove, and 8\" flat profiles. Same Solar Shield Technology. Perfect for soffits, covered decks, lanais, and interior ceilings. M1 fire-rated (non-flammable). 50-year warranty.", icon:"🏗️" },
    { name:"SAGIBOND", subtitle:"Aluminum Composite Material (ACM) Panels", desc:"Three constructions: FireGuard (fire-rated), HexaCore (honeycomb, superior rigidity), SlimShield (solid 3mm aluminum). Modern commercial facades with woodgrain warmth. 4ft x 16ft sheets. 50-year warranty.", icon:"🔩" },
    { name:"SAGIBATTEN", subtitle:"Aluminum Batten System", desc:"2mm wall thickness. 7 size options from 1\"x2\" to 2\"x8\". 24+ woodgrain finishes including Nordic series. For contemporary facades, pergolas, accent walls, baffle ceilings. 50-year warranty.", icon:"📐" },
  ],

  whySagiper: [
    { title:"Solar Shield Technology", desc:"5-layer heat-reflective film. Dark colors stay stable in Florida sun. No warping, no fading." },
    { title:"Custom Lengths Up to 35 Feet", desc:"Fewer seams = cleaner look + less water infiltration." },
    { title:"Architect-Grade", desc:"BIM/Revit files, CSI specs, AIA-accredited courses. Specified by architects, not just sold at lumber yards." },
    { title:"Code-Compliant", desc:"ICC-ES ESR-4876, NFPA 285, ASTM E330 tested. Serious certifications for Florida coastal construction." },
    { title:"Zero Maintenance Forever", desc:"No painting, staining, or sealing. Ever. 50-year warranty with 15 years non-prorated." },
    { title:"Made in Florida", desc:"Plant City, FL manufacturing. Local production, shorter lead times, Florida-market focus." },
  ],

  stats: [
    { value:"50 YR", label:"Warranty" },
    { value:"35 FT", label:"Max custom length" },
    { value:"30+", label:"Color finishes" },
    { value:"5-LAYER", label:"Solar Shield Technology" },
  ],

  problems: [
    { icon:"☀️", title:"Traditional siding fades and warps in Florida sun", desc:"Standard vinyl and wood siding can't handle relentless UV exposure. Colors fade, materials warp, and you're left with a home that looks tired after just a few years." },
    { icon:"🎨", title:"Paint and stain maintenance never ends", desc:"Wood siding demands repainting or restaining every 3–5 years. That's thousands of dollars and days of disruption — on repeat, forever." },
    { icon:"🚫", title:"Standard vinyl limits dark color choices", desc:"Want charcoal, walnut, or black? Standard vinyl absorbs heat and warps. Homeowners are stuck with light colors or accept inevitable damage." },
    { icon:"🏘️", title:"Generic siding looks like every other house on the block", desc:"Lumber-yard vinyl comes in limited profiles and colors. Your home deserves architect-grade materials, not builder-basic aesthetics." },
  ],

  goldSteps: [
    { num:"01", title:"ASSESS", desc:"We evaluate your home's exterior, discuss your design vision, and determine which SAGIPER products and finishes are the right fit for your project." },
    { num:"02", title:"DESIGN", desc:"We create a detailed plan using SAGIPER's full product line — matching SagiWall, SagiRev, SagiBond, and SagiBatten across your exterior for a cohesive architectural look." },
    { num:"03", title:"INSTALL", desc:"Our trained crew installs your SAGIPER system with precision. Tongue-and-groove connections, custom lengths, and clean transitions between product lines." },
    { num:"04", title:"PROTECT", desc:"Your home is covered by SAGIPER's 50-year warranty with 15 years non-prorated. Zero maintenance required — no painting, staining, or sealing. Ever." },
  ],

  faqs: [
    { q:"What is SAGIPER?", a:"SAGIPER is a Portuguese manufacturer (established 1994) of premium architectural PVC and aluminum cladding systems. Their North American headquarters includes manufacturing in Plant City, FL — making them a local Florida producer with European engineering standards." },
    { q:"How is SAGIPER different from regular vinyl siding?", a:"Solar Shield Technology prevents heat absorption — meaning dark colors won't warp like standard vinyl. Custom lengths up to 35 feet minimize seams. Architect-grade specs (BIM/Revit files, CSI specs) put it in a different category entirely. 50-year warranty vs. standard prorated warranties." },
    { q:"Can I use dark colors on my Florida home?", a:"Yes. That's SAGIPER's key advantage. The 5-layer Solar Shield film reflects heat before it enters the panel. Dark woodgrain finishes that would warp in standard vinyl stay stable — even in direct Florida sun." },
    { q:"Is SAGIPER hurricane-rated?", a:"ASTM E330 wind load tested and ICC-ES evaluated. Contact us for specific wind rating details for your location." },
    { q:"How much does SAGIPER cost vs. regular siding?", a:"SAGIPER is a premium product — higher upfront cost than standard vinyl. But the 50-year warranty, zero maintenance, and architect-grade aesthetics make it the best long-term value." },
    { q:"Do you install all SAGIPER products?", a:"Yes. We install SagiWall, SagiRev, SagiBond, and SagiBatten. Full exterior system with matching finishes across all products." },
  ],

  ctaTitle: "READY FOR PREMIUM THAT LASTS A LIFETIME?",
  ctaSub: "Get your free SAGIPER consultation. We'll assess your home, show you finishes, and provide a transparent estimate.",

  reviews: [
    { text:"JR One aluminum is nothing short of awesome. From Stefan as my sales person to Christian and the crew — they ALL deserve a big thank you.", author:"JR One Customer", type:"Exterior Renovation" },
    { text:"Great crew, all very nice and courteous gentlemen. Work was done exactly to the quote and mock-up images. Not one detail missed.", author:"Jaclyn G.", type:"Full Exterior Work" },
  ],
};

export default function SagiperPage() {
  const [formData, setFormData] = useState({name:"",phone:"",email:"",zip:""});
  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);
  useEffect(() => { injectFonts(); }, []);
  const sec = {padding:"80px 24px",maxWidth:"1200px",margin:"0 auto"};
  const secTitle = {fontFamily:f.h,fontSize:"clamp(24px,4vw,36px)",fontWeight:800,letterSpacing:"2px",textAlign:"center",marginBottom:"8px"};

  return (
    <div style={{background:C.bg,color:C.white,fontFamily:f.b,lineHeight:1.65,minHeight:"100vh"}}>
      <SiteNav promoBanner="SAGIPER Architectural Cladding — Engineered in Portugal, Made in Plant City, FL — Call (844) 444-3114" />
      <div style={{padding:"16px 24px 0",maxWidth:"1200px",margin:"0 auto"}}><div style={{fontFamily:f.b,fontSize:"13px",color:C.muted}}>{PAGE.breadcrumb.map((item,i) => <span key={i}>{i>0&&<span style={{margin:"0 8px",opacity:0.5}}>/</span>}<span style={{color:i===PAGE.breadcrumb.length-1?C.accent:C.muted}}>{item}</span></span>)}</div></div>

      {/* HERO */}
      <section style={{padding:"60px 24px 80px",maxWidth:"1200px",margin:"0 auto",display:"flex",gap:"48px",alignItems:"center",flexWrap:"wrap"}}>
        <div style={{flex:"1 1 500px",minWidth:"300px"}}>
          <Tag>{PAGE.heroTag}</Tag>
          <h1 style={{fontFamily:f.h,fontSize:"clamp(32px,5vw,48px)",fontWeight:800,lineHeight:1.1,marginBottom:"20px"}}>{PAGE.heroH1}<br/><span style={{color:C.accent}}>{PAGE.heroH1Gold}</span></h1>
          <p style={{fontFamily:f.b,fontSize:"18px",color:C.offWhite,lineHeight:1.7,marginBottom:"32px",maxWidth:"560px"}}>{PAGE.heroP}</p>
          <div style={{display:"flex",gap:"16px",flexWrap:"wrap"}}>
            <button onClick={()=>document.getElementById("quote-form")?.scrollIntoView({behavior:"smooth"})} style={{padding:"16px 36px",fontFamily:f.h,fontSize:"14px",fontWeight:700,letterSpacing:"1.5px",color:C.white,background:`linear-gradient(135deg,${C.accent},${C.accentLight})`,border:"none",borderRadius:"8px",cursor:"pointer",boxShadow:"0 4px 16px rgba(61,61,61,0.3)"}}>GET YOUR FREE CONSULTATION</button>
            <a href="tel:8444443114" style={{display:"inline-flex",alignItems:"center",padding:"16px 36px",fontFamily:f.h,fontSize:"14px",fontWeight:700,letterSpacing:"1.5px",color:C.accent,border:`2px solid ${C.accent}`,borderRadius:"8px",textDecoration:"none"}}>CALL (844) 444-3114</a>
          </div>
          <div style={{display:"flex",gap:"24px",marginTop:"32px",flexWrap:"wrap"}}>{PAGE.stats.map((s,i) => <div key={i} style={{textAlign:"center"}}><div style={{fontFamily:f.h,fontSize:"28px",fontWeight:800,color:C.accent}}>{s.value}</div><div style={{fontFamily:f.b,fontSize:"12px",color:C.muted,maxWidth:"120px"}}>{s.label}</div></div>)}</div>
        </div>
        <div style={{flex:"1 1 400px",minWidth:"300px",maxWidth:"500px",aspectRatio:"4/3",background:`linear-gradient(135deg,${C.navyFade},${C.navy})`,borderRadius:"16px",border:`1px solid ${C.navyLight}`,display:"flex",alignItems:"center",justifyContent:"center"}}><div style={{textAlign:"center",color:C.muted}}><div style={{fontSize:"48px",marginBottom:"12px"}}>📸</div><p style={{fontFamily:f.h,fontSize:"13px",letterSpacing:"1px"}}>SAGIPER CLADDING PHOTO</p></div></div>
      </section>

      {/* THE SAGIPER SYSTEM */}
      <section style={{background:`linear-gradient(135deg, #1a1a1a, ${C.navy})`,padding:"60px 24px",borderTop:`2px solid ${C.accent}`,borderBottom:`2px solid ${C.accent}`}}>
        <div style={{maxWidth:"1100px",margin:"0 auto",textAlign:"center"}}>
          <Tag>THE SAGIPER SYSTEM</Tag>
          <h2 style={{...secTitle,color:C.white}}>FOUR PRODUCTS. ONE COHESIVE EXTERIOR.</h2>
          <GoldBar />
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(260px,1fr))",gap:"24px",marginTop:"48px",textAlign:"left"}}>
            {PAGE.products.map((p,i) => (
              <div key={i} style={{background:"rgba(11,22,40,0.8)",border:`1px solid ${C.navyLight}`,borderRadius:"12px",padding:"28px",borderTop:`3px solid ${C.accent}`,transition:"border-color 0.3s"}} onMouseOver={e=>e.currentTarget.style.borderTopColor=C.accentLight} onMouseOut={e=>e.currentTarget.style.borderTopColor=C.accent}>
                <div style={{fontSize:"32px",marginBottom:"12px"}}>{p.icon}</div>
                <h3 style={{fontFamily:f.h,fontSize:"20px",fontWeight:800,color:C.white,marginBottom:"4px"}}>{p.name}</h3>
                <div style={{fontFamily:f.h,fontSize:"12px",fontWeight:600,color:C.accent,letterSpacing:"1px",marginBottom:"12px"}}>{p.subtitle}</div>
                <p style={{fontFamily:f.b,fontSize:"14px",color:C.muted,lineHeight:1.6}}>{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROBLEM */}
      <section style={{background:C.cream,padding:"80px 24px"}}><div style={{maxWidth:"1200px",margin:"0 auto",textAlign:"center"}}><Tag>THE PROBLEM</Tag><h2 style={{...secTitle,color:C.navy}}>WHY STANDARD SIDING FAILS IN FLORIDA</h2><GoldBar /><div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(250px,1fr))",gap:"24px",marginTop:"48px",textAlign:"left"}}>{PAGE.problems.map((p,i) => <div key={i} style={{background:C.white,borderRadius:"12px",padding:"28px",borderLeft:`4px solid ${C.accent}`}}><div style={{fontSize:"28px",marginBottom:"12px"}}>{p.icon}</div><h3 style={{fontFamily:f.h,fontSize:"17px",fontWeight:700,color:C.navy,marginBottom:"8px"}}>{p.title}</h3><p style={{fontFamily:f.b,fontSize:"15px",color:"#4B5563",lineHeight:1.55}}>{p.desc}</p></div>)}</div></div></section>

      {/* WHY SAGIPER */}
      <section style={{background:C.bg,padding:"80px 24px"}}><div style={sec}><div style={{textAlign:"center"}}><Tag>WHY SAGIPER</Tag><h2 style={{...secTitle,color:C.white}}>ENGINEERED FOR FLORIDA. DESIGNED FOR ARCHITECTS.</h2><GoldBar /><p style={{fontFamily:f.b,fontSize:"17px",color:C.muted,maxWidth:"650px",margin:"0 auto 48px"}}>Premium architectural cladding with Solar Shield Technology — the only siding system built to handle dark colors in direct Florida sun.</p></div><div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(340px,1fr))",gap:"20px"}}>{PAGE.whySagiper.map((s,i) => <div key={i} style={{background:C.navyFade,border:`1px solid ${C.navyLight}`,borderRadius:"12px",padding:"28px",transition:"border-color 0.3s"}} onMouseOver={e=>e.currentTarget.style.borderColor=C.accent} onMouseOut={e=>e.currentTarget.style.borderColor=C.navyLight}><div style={{fontFamily:f.h,fontSize:"11px",fontWeight:700,color:C.accent,letterSpacing:"2px",marginBottom:"8px"}}>0{i+1}</div><h3 style={{fontFamily:f.h,fontSize:"17px",fontWeight:700,color:C.white,marginBottom:"10px"}}>{s.title}</h3><p style={{fontFamily:f.b,fontSize:"15px",color:C.muted,lineHeight:1.6}}>{s.desc}</p></div>)}</div></div></section>

      {/* GOLD STANDARD */}
      <section style={{background:C.navy,padding:"80px 24px"}}><div style={sec}><div style={{textAlign:"center"}}><Tag>THE GOLD STANDARD</Tag><h2 style={{...secTitle,color:C.white}}>OUR SAGIPER INSTALLATION PROCESS</h2><GoldBar /><p style={{fontFamily:f.b,fontSize:"17px",color:C.offWhite,fontStyle:"italic",maxWidth:"500px",margin:"0 auto 48px"}}>Every home. Every time. No exceptions.</p></div><div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(250px,1fr))",gap:"24px"}}>{PAGE.goldSteps.map((step,i) => <div key={i} style={{background:C.navyFade,border:`1px solid ${C.navyLight}`,borderRadius:"12px",padding:"28px",position:"relative"}}><div style={{fontFamily:f.h,fontSize:"36px",fontWeight:800,color:"rgba(61,61,61,0.08)",position:"absolute",top:"16px",right:"20px"}}>{step.num}</div><div style={{fontFamily:f.h,fontSize:"11px",fontWeight:700,color:C.accent,letterSpacing:"3px",marginBottom:"8px"}}>STEP {step.num}</div><h3 style={{fontFamily:f.h,fontSize:"22px",fontWeight:700,color:C.white,marginBottom:"12px"}}>{step.title}</h3><p style={{fontFamily:f.b,fontSize:"15px",color:C.muted,lineHeight:1.6}}>{step.desc}</p></div>)}</div></div></section>

      {/* REVIEWS */}
      <section style={{background:C.bg,padding:"80px 24px"}}><div style={{maxWidth:"900px",margin:"0 auto",textAlign:"center"}}><Tag>REVIEWS</Tag><h2 style={{...secTitle,color:C.white}}>WHAT OUR CLIENTS SAY</h2><GoldBar /><div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(300px,1fr))",gap:"24px",marginTop:"48px"}}>{PAGE.reviews.map((r,i) => <div key={i} style={{background:C.navyFade,border:`1px solid ${C.navyLight}`,borderRadius:"12px",padding:"28px",textAlign:"left"}}><Stars /><p style={{fontFamily:f.b,fontSize:"16px",color:C.offWhite,lineHeight:1.7,margin:"16px 0 20px",fontStyle:"italic"}}>"{r.text}"</p><div style={{fontFamily:f.h,fontSize:"14px",fontWeight:700,color:C.white}}>{r.author}</div><div style={{fontFamily:f.b,fontSize:"13px",color:C.muted}}>{r.type}</div></div>)}</div></div></section>

      {/* FAQ */}
      <section style={{background:C.navy,padding:"80px 24px"}}><div style={{maxWidth:"800px",margin:"0 auto",textAlign:"center"}}><Tag>FAQ</Tag><h2 style={{...secTitle,color:C.white}}>SAGIPER QUESTIONS</h2><GoldBar /><div style={{marginTop:"40px",textAlign:"left"}}>{PAGE.faqs.map((faq,i) => <div key={i} style={{borderBottom:`1px solid ${C.navyLight}`}}><button onClick={()=>setOpenFaq(openFaq===i?null:i)} style={{width:"100%",padding:"20px 0",background:"none",border:"none",cursor:"pointer",display:"flex",justifyContent:"space-between",alignItems:"center",gap:"16px"}}><span style={{fontFamily:f.h,fontSize:"15px",fontWeight:600,color:openFaq===i?C.accent:C.white,textAlign:"left",transition:"color 0.2s"}}>{faq.q}</span><span style={{fontFamily:f.h,fontSize:"20px",color:C.accent,transform:openFaq===i?"rotate(45deg)":"none",transition:"transform 0.3s",flexShrink:0}}>+</span></button>{openFaq===i&&<div style={{padding:"0 0 20px",fontFamily:f.b,fontSize:"15px",color:C.muted,lineHeight:1.65}}>{faq.a}</div>}</div>)}</div></div></section>

      {/* CTA FORM */}
      <section id="quote-form" style={{background:`linear-gradient(165deg,${C.navyMid},${C.navy})`,padding:"80px 24px"}}><div style={{maxWidth:"600px",margin:"0 auto",textAlign:"center"}}>
        <h2 style={{fontFamily:f.h,fontSize:"clamp(28px,5vw,40px)",fontWeight:800,color:C.white,marginBottom:"12px"}}>{PAGE.ctaTitle}</h2>
        <p style={{fontFamily:f.b,fontSize:"17px",color:C.offWhite,marginBottom:"40px"}}>{PAGE.ctaSub}</p>
        {submitted ? <div style={{background:"rgba(45,139,78,0.15)",border:"1px solid #2D8B4E",borderRadius:"12px",padding:"32px"}}><div style={{fontSize:"48px",marginBottom:"12px"}}>✓</div><h3 style={{fontFamily:f.h,fontSize:"20px",fontWeight:700,color:"#4ADE80"}}>Consultation Request Received!</h3><p style={{fontFamily:f.b,fontSize:"15px",color:C.muted,marginTop:"8px"}}>We'll get back to you within hours to schedule your SAGIPER consultation.</p></div> : <div style={{background:C.white,borderRadius:"16px",padding:"32px",boxShadow:"0 24px 80px rgba(0,0,0,0.4)",textAlign:"left"}}>
          <h3 style={{fontFamily:f.h,fontSize:"18px",fontWeight:700,color:C.navy,textAlign:"center",marginBottom:"4px"}}>Get Your Free SAGIPER Consultation</h3>
          <div style={{width:"40px",height:"3px",background:C.accent,borderRadius:"2px",margin:"10px auto 20px"}} />
          <input style={inputStyle} placeholder="Full Name" value={formData.name} onChange={e=>setFormData({...formData,name:e.target.value})} />
          <input style={inputStyle} placeholder="Phone Number" type="tel" value={formData.phone} onChange={e=>setFormData({...formData,phone:e.target.value})} />
          <input style={inputStyle} placeholder="Email Address" type="email" value={formData.email} onChange={e=>setFormData({...formData,email:e.target.value})} />
          <input style={inputStyle} placeholder="ZIP Code" value={formData.zip} onChange={e=>setFormData({...formData,zip:e.target.value})} maxLength={5} />
          <button onClick={()=>setSubmitted(true)} style={{width:"100%",padding:"16px",fontFamily:f.h,fontSize:"14px",fontWeight:700,letterSpacing:"1.5px",color:C.white,background:`linear-gradient(135deg,${C.accent},${C.accentLight})`,border:"none",borderRadius:"8px",cursor:"pointer",boxShadow:"0 4px 16px rgba(61,61,61,0.3)"}}>REQUEST MY FREE CONSULTATION</button>
          <p style={{fontFamily:f.b,fontSize:"12px",color:"#9CA3AF",textAlign:"center",marginTop:"12px"}}>No spam. No pressure. Honest consultation on whether SAGIPER is right for your home.</p>
        </div>}
        <div style={{marginTop:"32px"}}><a href="tel:8444443114" style={{fontFamily:f.h,fontSize:"18px",fontWeight:700,color:C.gold,textDecoration:"none"}}>📞 (844) 444-3114</a></div>
      </div></section>

      <SiteFooter />
      <MobileCTA scrollTarget="quote-form" />
      <style>{`*{box-sizing:border-box;margin:0;padding:0}::placeholder{color:#9CA3AF}input:focus{border-color:${C.accent}!important}`}</style>
    </div>
  );
}
