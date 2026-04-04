"use client";

import { useState, useEffect } from "react";
import SiteNav from "../../components/SiteNav";
import SiteFooter from "../../components/SiteFooter";
import MobileCTA from "../../components/MobileCTA";

const injectFonts = () => { if (typeof document==="undefined"||document.querySelector("#jr-fonts")) return; const l=document.createElement("link"); l.id="jr-fonts"; l.rel="stylesheet"; l.href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800&family=Source+Sans+3:wght@300;400;600&display=swap"; document.head.appendChild(l); };
const C = { bg:"#0B1628",navy:"#1B2A4A",navyMid:"#243556",navyLight:"#2C3E5A",navyFade:"#162033",gold:"#C8952E",goldLight:"#D4A843",goldPale:"rgba(200,149,46,0.12)",cream:"#F5F3EF",white:"#FFFFFF",offWhite:"#E8E4DC",muted:"#7A8FA8",charcoal:"#2D2D2D",success:"#2D8B4E",successDim:"rgba(45,139,78,0.15)",accent:"#9333EA",accentLight:"#A855F7",accentPale:"rgba(147,51,234,0.12)" };
const f = { h:"'Montserrat', sans-serif", b:"'Source Sans 3', sans-serif" };
const Tag = ({children}) => <div style={{display:"inline-block",padding:"6px 16px",background:C.accentPale,borderRadius:"4px",marginBottom:"12px"}}><span style={{fontFamily:f.h,fontSize:"12px",fontWeight:700,color:C.accent,letterSpacing:"3px"}}>{children}</span></div>;
const GoldBar = () => <div style={{width:"60px",height:"3px",background:`linear-gradient(90deg,${C.accent},${C.accentLight})`,borderRadius:"2px",margin:"16px auto"}} />;
const Stars = () => <span style={{color:C.gold,fontSize:"14px",letterSpacing:"2px"}}>★★★★★</span>;
const inputStyle = {width:"100%",padding:"13px 16px",fontFamily:f.b,fontSize:"15px",border:"1.5px solid #D1D5DB",borderRadius:"8px",outline:"none",color:C.charcoal,marginBottom:"12px",background:"#FAFAFA",boxSizing:"border-box"};

const PAGE = {
  breadcrumb: ["Home","Services","Govee Lights"],
  heroTag: "SMART LED INSTALLATION",
  heroH1: "Govee Smart Lights,",
  heroH1Accent: "Professionally Installed.",
  heroP: "You buy the Govee LED strip lights. We mount them cleanly, securely, and discreetly along your roofline or exterior — with the same precision we bring to every aluminum installation. No DIY ladder risks. No sloppy mounting. Just clean, professional results.",

  problems: [
    { icon:"🔥", title:"Adhesive melts in Florida heat", desc:"Tampa's 95-degree summers soften adhesive-only LED mounting within months. Strips sag, peel, and fall off your roofline — leaving residue on your fascia and lights dangling from your house." },
    { icon:"📐", title:"Crooked, uneven lines", desc:"Without professional tools and a trained eye, DIY LED strips end up wavy, misaligned, and visually distracting. The whole point of accent lighting is a clean, seamless line — not a craft project gone wrong." },
    { icon:"⚠️", title:"Ladder safety risks", desc:"Roofline LED installation means working at height on ladders — the same height that sends thousands of homeowners to the ER every year. One wrong step on a wet Florida morning and you're a statistic." },
    { icon:"🔌", title:"Gaps and connectivity issues", desc:"DIY installations often leave visible gaps between strip segments, exposed wiring, and controllers mounted in awkward locations. Poor connections mean zones that don't respond and lights that flicker or fail." },
  ],

  solutions: [
    { title:"Mechanically secured mounting", desc:"We don't rely on adhesive alone. Our crew mechanically fastens LED strips to your roofline so they stay put through 95-degree summers, thunderstorms, and hurricane-force winds. Built for Florida, not a living room." },
    { title:"Clean, invisible hardware", desc:"The whole point of accent lighting is the effect, not the hardware. We mount strips discreetly with hidden fasteners so you see the light, not the installation. No exposed wires. No visible clips." },
    { title:"Professional roofline expertise", desc:"We install gutters, soffit, and fascia every day. Running LED strips along a roofline is a natural extension of what we already do — with the equipment, safety gear, and expertise already on the truck." },
    { title:"Complete setup and connectivity", desc:"Basic setup and app connectivity included with every installation. We make sure the lights power on, connect to your app, and the zones are working before we leave your property." },
    { title:"Multi-story capability", desc:"Two-story and multi-level homes are no problem. We have the ladders, scaffolding, and safety equipment to reach every roofline safely — something most homeowners simply can't do on their own." },
    { title:"One crew, one visit, done right", desc:"No subcontractors. No return trips. Our trained team handles your entire installation in a single visit with the same craftsmanship standard we bring to every aluminum job." },
  ],

  stats: [
    { value:"500+", label:"LED installations completed" },
    { value:"100%", label:"Mechanically secured" },
    { value:"1 DAY", label:"Most installs completed" },
    { value:"100%", label:"In-house installation" },
  ],

  goldSteps: [
    { num:"01", title:"CONSULT", desc:"Tell us about your home, your Govee lights, and where you want them mounted. We'll give you a quick quote based on your measurements and accessibility — most estimates take under 5 minutes." },
    { num:"02", title:"PLAN", desc:"We map your roofline, identify mounting points, plan wire routing, and determine the cleanest installation path. Every home is different — we plan for yours specifically." },
    { num:"03", title:"INSTALL", desc:"Our crew mounts your LED strips with professional hardware, routes wiring cleanly, and secures every connection point. Most homes completed in a single visit." },
    { num:"04", title:"ENJOY", desc:"Final walkthrough, app connectivity test, and zone check. We make sure everything works perfectly before we leave. Control your lights from your phone — holidays, parties, security, everyday ambiance." },
  ],

  reviews: [
    { text:"Chris and his crew are amazing! Great customer service and even better craftsmanship! Chris took the time to explain and educate me on everything before the project commenced.", name:"JR One Customer", context:"Professional Install" },
    { text:"Great experience. They fixed and added a new gutter. I couldn't be more pleased with their work and dealing with their professional and friendly staff.", name:"Johnny C.", context:"Exterior Work" },
    { text:"Very satisfied with the quality. Professional team that showed up on time and got the job done right the first time. Would definitely recommend.", name:"David K.", context:"Roofline Installation" },
  ],

  faqs: [
    { q:"Do I need to buy the Govee lights myself?", a:"Yes. You purchase the Govee smart LED strip lights, controller, and any accessories you want. You pick the exact product, color options, and features. We handle the professional mounting and installation only — this keeps your costs transparent and lets you choose exactly the system you want." },
    { q:"Why not just use the adhesive backing that comes with the lights?", a:"Tampa's heat softens adhesive-only mounting within months. Strips sag, peel, and fall off — especially on south-facing rooflines that get direct sun all day. We mechanically secure every strip so it stays put through Florida summers, storms, and hurricane-force winds." },
    { q:"How much does professional Govee light installation cost?", a:"Pricing is based on your home's specific measurements, roofline accessibility, and number of stories. Most estimates take under 5 minutes over the phone. Call us at (844) 444-3114 for a quick quote." },
    { q:"Can you install lights on a two-story home?", a:"Yes. Multi-story homes are no problem. We have the professional ladders, scaffolding, and safety equipment to reach every roofline safely — this is exactly the kind of work we do every day on gutter and soffit installations." },
    { q:"Do you set up the app and connectivity?", a:"Yes. Basic setup and app connectivity are included with every installation. We make sure the lights power on, connect to your phone, and the zones are working correctly before we leave." },
    { q:"What areas of the home can you install lights on?", a:"We install along rooflines, eaves, soffits, fascia boards, garage frames, and other exterior mounting surfaces. During your consultation, we'll discuss exactly where you want the lights and plan the cleanest installation path." },
    { q:"How long does installation take?", a:"Most residential Govee light installations are completed in a single visit — typically half a day depending on the size of your home and complexity of the roofline. We'll give you a time estimate during your consultation." },
  ],

  ctaTitle: "READY TO LIGHT UP YOUR HOME?",
  ctaSub: "Get your free installation quote. Tell us about your home and your Govee lights — we'll handle the rest with the same craftsmanship we bring to every job.",
};

export default function GoveeLightsPage() {
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
        <div style={{fontFamily:f.b,fontSize:"13px",color:C.muted}}>{PAGE.breadcrumb.map((item,i) => <span key={i}>{i>0&&<span style={{margin:"0 8px",opacity:0.5}}>/</span>}<span style={{color:i===PAGE.breadcrumb.length-1?C.accent:C.muted}}>{item}</span></span>)}</div>
      </div>

      {/* HERO */}
      <section style={{padding:"60px 24px 80px",maxWidth:"1200px",margin:"0 auto",display:"flex",gap:"48px",alignItems:"center",flexWrap:"wrap"}}>
        <div style={{flex:"1 1 500px",minWidth:"300px"}}>
          <Tag>{PAGE.heroTag}</Tag>
          <h1 style={{fontFamily:f.h,fontSize:"clamp(32px,5vw,48px)",fontWeight:800,lineHeight:1.1,marginBottom:"20px"}}>{PAGE.heroH1}<br/><span style={{color:C.accent}}>{PAGE.heroH1Accent}</span></h1>
          <p style={{fontFamily:f.b,fontSize:"18px",color:C.offWhite,lineHeight:1.7,marginBottom:"32px",maxWidth:"560px"}}>{PAGE.heroP}</p>
          <div style={{display:"flex",gap:"16px",flexWrap:"wrap"}}>
            <button onClick={()=>document.getElementById("quote-form")?.scrollIntoView({behavior:"smooth"})} style={{padding:"16px 36px",fontFamily:f.h,fontSize:"14px",fontWeight:700,letterSpacing:"1.5px",color:C.white,background:`linear-gradient(135deg,${C.accent},${C.accentLight})`,border:"none",borderRadius:"8px",cursor:"pointer",boxShadow:"0 4px 16px rgba(147,51,234,0.3)"}}>GET YOUR FREE ESTIMATE</button>
            <a href="tel:8444443114" style={{display:"inline-flex",alignItems:"center",padding:"16px 36px",fontFamily:f.h,fontSize:"14px",fontWeight:700,letterSpacing:"1.5px",color:C.accent,background:"transparent",border:`2px solid ${C.accent}`,borderRadius:"8px",textDecoration:"none"}}>📞 CALL (844) 444-3114</a>
          </div>
          <div style={{display:"flex",gap:"24px",marginTop:"32px",flexWrap:"wrap"}}>{PAGE.stats.map((s,i) => <div key={i} style={{textAlign:"center"}}><div style={{fontFamily:f.h,fontSize:"28px",fontWeight:800,color:C.accent}}>{s.value}</div><div style={{fontFamily:f.b,fontSize:"12px",color:C.muted,maxWidth:"100px"}}>{s.label}</div></div>)}</div>
        </div>
      </section>

      {/* PROBLEM */}
      <section style={{background:C.navy,padding:"80px 24px"}}>
        <div style={{maxWidth:"1200px",margin:"0 auto",textAlign:"center"}}>
          <Tag>THE PROBLEM</Tag>
          <h2 style={{...secTitle,color:C.white}}>WHY DIY LED INSTALLATION FAILS</h2>
          <GoldBar />
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(250px,1fr))",gap:"24px",marginTop:"48px",textAlign:"left"}}>
            {PAGE.problems.map((p,i) => <div key={i} style={{background:C.navyFade,border:`1px solid ${C.navyLight}`,borderRadius:"12px",padding:"28px",borderLeft:`4px solid ${C.accent}`}}><div style={{fontSize:"28px",marginBottom:"12px"}}>{p.icon}</div><h3 style={{fontFamily:f.h,fontSize:"17px",fontWeight:700,color:C.white,marginBottom:"8px"}}>{p.title}</h3><p style={{fontFamily:f.b,fontSize:"15px",color:C.muted,lineHeight:1.55}}>{p.desc}</p></div>)}
          </div>
        </div>
      </section>

      {/* SOLUTION */}
      <section style={{background:C.bg,padding:"80px 24px"}}>
        <div style={sec}>
          <div style={{textAlign:"center"}}><Tag>THE JR ONE DIFFERENCE</Tag><h2 style={{...secTitle,color:C.white}}>SMART LIGHT INSTALLATION DONE RIGHT</h2><GoldBar /><p style={{fontFamily:f.b,fontSize:"17px",color:C.muted,maxWidth:"600px",margin:"0 auto 48px"}}>Professional mounting built for Florida — not a DIY adhesive job that falls apart in the heat.</p></div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(340px,1fr))",gap:"20px"}}>
            {PAGE.solutions.map((s,i) => <div key={i} style={{background:C.navyFade,border:`1px solid ${C.navyLight}`,borderRadius:"12px",padding:"28px",transition:"border-color 0.3s"}} onMouseOver={e=>e.currentTarget.style.borderColor=C.accent} onMouseOut={e=>e.currentTarget.style.borderColor=C.navyLight}><div style={{fontFamily:f.h,fontSize:"11px",fontWeight:700,color:C.accent,letterSpacing:"2px",marginBottom:"8px"}}>0{i+1}</div><h3 style={{fontFamily:f.h,fontSize:"17px",fontWeight:700,color:C.white,marginBottom:"10px"}}>{s.title}</h3><p style={{fontFamily:f.b,fontSize:"15px",color:C.muted,lineHeight:1.6}}>{s.desc}</p></div>)}
          </div>
        </div>
      </section>

      {/* PEAK 301 CALLOUT */}
      <section style={{ background: "rgba(177,26,33,0.08)", padding: "32px 24px", borderTop: "2px solid #B11A21", borderBottom: "2px solid #B11A21" }}>
        <div style={{ maxWidth: "900px", margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "20px" }}>
          <div style={{ flex: "1 1 400px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "8px" }}>
              <span style={{ fontSize: "20px" }}>⚠️</span>
              <span style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "14px", fontWeight: 700, color: "#B11A21", letterSpacing: "1px" }}>ROOF AGING?</span>
            </div>
            <p style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: "16px", color: "#E8E4DC", lineHeight: 1.6 }}>Peak 301 Roof Rejuvenation extends your roof's life 6–10 years for under 15% the cost of replacement. Save your roof. Save your insurance.</p>
          </div>
          <a href="/peak-301" style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "14px 28px", fontFamily: "'Montserrat', sans-serif", fontSize: "13px", fontWeight: 700, letterSpacing: "1px", color: "#FFFFFF", background: "linear-gradient(135deg, #B11A21, #D42A2A)", borderRadius: "8px", textDecoration: "none", whiteSpace: "nowrap", boxShadow: "0 4px 12px rgba(177,26,33,0.3)" }}>LEARN ABOUT PEAK 301 →</a>
        </div>
      </section>

      {/* GOLD STANDARD */}
      <section style={{background:C.navy,padding:"80px 24px"}}>
        <div style={sec}><div style={{textAlign:"center"}}><Tag>THE GOLD STANDARD</Tag><h2 style={{...secTitle,color:C.white}}>OUR INSTALLATION PROCESS</h2><GoldBar /><p style={{fontFamily:f.b,fontSize:"17px",color:C.offWhite,fontStyle:"italic",maxWidth:"500px",margin:"0 auto 48px"}}>Every home. Every time. No exceptions.</p></div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(250px,1fr))",gap:"24px"}}>{PAGE.goldSteps.map((step,i) => <div key={i} style={{background:C.navyFade,border:`1px solid ${C.navyLight}`,borderRadius:"12px",padding:"28px",position:"relative"}}><div style={{fontFamily:f.h,fontSize:"36px",fontWeight:800,color:"rgba(147,51,234,0.08)",position:"absolute",top:"16px",right:"20px"}}>{step.num}</div><div style={{fontFamily:f.h,fontSize:"11px",fontWeight:700,color:C.accent,letterSpacing:"3px",marginBottom:"8px"}}>STEP {step.num}</div><h3 style={{fontFamily:f.h,fontSize:"22px",fontWeight:700,color:C.white,marginBottom:"12px"}}>{step.title}</h3><p style={{fontFamily:f.b,fontSize:"15px",color:C.muted,lineHeight:1.6}}>{step.desc}</p></div>)}</div>
        </div>
      </section>

      {/* REVIEWS */}
      <section style={{background:C.bg,padding:"80px 24px"}}><div style={sec}><div style={{textAlign:"center"}}><Tag>CUSTOMER REVIEWS</Tag><h2 style={{...secTitle,color:C.white}}>WHAT OUR CUSTOMERS SAY</h2><GoldBar /></div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(300px,1fr))",gap:"20px",marginTop:"48px"}}>{PAGE.reviews.map((rev,i) => <div key={i} style={{background:C.navyFade,border:`1px solid ${C.navyLight}`,borderRadius:"12px",padding:"28px"}}><Stars /><p style={{fontFamily:f.b,fontSize:"15px",color:C.offWhite,lineHeight:1.65,margin:"16px 0",fontStyle:"italic"}}>"{rev.text}"</p><div style={{borderTop:`1px solid ${C.navyLight}`,paddingTop:"12px",display:"flex",justifyContent:"space-between",alignItems:"center"}}><span style={{fontFamily:f.h,fontSize:"14px",fontWeight:600,color:C.white}}>{rev.name}</span><span style={{fontFamily:f.b,fontSize:"12px",color:C.muted}}>{rev.context}</span></div></div>)}</div></div></section>

      {/* FAQ */}
      <section style={{background:C.navy,padding:"80px 24px"}}><div style={{maxWidth:"800px",margin:"0 auto",textAlign:"center"}}><Tag>FAQ</Tag><h2 style={{...secTitle,color:C.white}}>GOVEE LIGHT INSTALLATION QUESTIONS</h2><GoldBar />
        <div style={{marginTop:"40px",textAlign:"left"}}>{PAGE.faqs.map((faq,i) => <div key={i} style={{borderBottom:`1px solid ${C.navyLight}`}}><button onClick={()=>setOpenFaq(openFaq===i?null:i)} style={{width:"100%",padding:"20px 0",background:"none",border:"none",cursor:"pointer",display:"flex",justifyContent:"space-between",alignItems:"center",gap:"16px"}}><span style={{fontFamily:f.h,fontSize:"15px",fontWeight:600,color:openFaq===i?C.accent:C.white,textAlign:"left",transition:"color 0.2s"}}>{faq.q}</span><span style={{fontFamily:f.h,fontSize:"20px",color:C.accent,transform:openFaq===i?"rotate(45deg)":"none",transition:"transform 0.3s",flexShrink:0}}>+</span></button>{openFaq===i&&<div style={{padding:"0 0 20px",fontFamily:f.b,fontSize:"15px",color:C.muted,lineHeight:1.65}}>{faq.a}</div>}</div>)}</div></div></section>

      {/* CTA FORM */}
      <section id="quote-form" style={{background:`linear-gradient(165deg,${C.navyMid},${C.navy})`,padding:"80px 24px"}}><div style={{maxWidth:"600px",margin:"0 auto",textAlign:"center"}}>
        <h2 style={{fontFamily:f.h,fontSize:"clamp(28px,5vw,40px)",fontWeight:800,color:C.white,marginBottom:"12px"}}>{PAGE.ctaTitle}</h2>
        <p style={{fontFamily:f.b,fontSize:"17px",color:C.offWhite,marginBottom:"40px"}}>{PAGE.ctaSub}</p>
        {submitted ? <div style={{background:C.successDim,border:`1px solid ${C.success}`,borderRadius:"12px",padding:"32px"}}><div style={{fontSize:"48px",marginBottom:"12px"}}>✓</div><h3 style={{fontFamily:f.h,fontSize:"20px",fontWeight:700,color:"#4ADE80"}}>Quote Request Received!</h3><p style={{fontFamily:f.b,fontSize:"15px",color:C.muted,marginTop:"8px"}}>We'll get back to you within hours.</p></div> : <div style={{background:C.white,borderRadius:"16px",padding:"32px",boxShadow:"0 24px 80px rgba(0,0,0,0.4)",textAlign:"left"}}>
          <h3 style={{fontFamily:f.h,fontSize:"18px",fontWeight:700,color:C.navy,textAlign:"center",marginBottom:"4px"}}>Get Your Free Installation Quote</h3>
          <div style={{width:"40px",height:"3px",background:C.accent,borderRadius:"2px",margin:"10px auto 20px"}} />
          <input style={inputStyle} placeholder="Full Name" value={formData.name} onChange={e=>setFormData({...formData,name:e.target.value})} />
          <input style={inputStyle} placeholder="Phone Number" type="tel" value={formData.phone} onChange={e=>setFormData({...formData,phone:e.target.value})} />
          <input style={inputStyle} placeholder="Email Address" type="email" value={formData.email} onChange={e=>setFormData({...formData,email:e.target.value})} />
          <input style={inputStyle} placeholder="ZIP Code" value={formData.zip} onChange={e=>setFormData({...formData,zip:e.target.value})} maxLength={5} />
          <button onClick={()=>setSubmitted(true)} style={{width:"100%",padding:"16px",fontFamily:f.h,fontSize:"14px",fontWeight:700,letterSpacing:"1.5px",color:C.white,background:`linear-gradient(135deg,${C.accent},${C.accentLight})`,border:"none",borderRadius:"8px",cursor:"pointer",boxShadow:"0 4px 16px rgba(147,51,234,0.3)"}}>REQUEST MY FREE INSTALLATION QUOTE</button>
          <p style={{fontFamily:f.b,fontSize:"12px",color:"#9CA3AF",textAlign:"center",marginTop:"12px"}}>No spam. No pressure. Just honest expert advice.</p>
        </div>}
        <div style={{marginTop:"32px"}}><p style={{fontFamily:f.b,fontSize:"15px",color:C.muted,marginBottom:"8px"}}>Prefer to talk?</p><a href="tel:8444443114" style={{fontFamily:f.h,fontSize:"18px",fontWeight:700,color:C.accent,textDecoration:"none"}}>📞 (844) 444-3114</a></div>
      </div></section>

      <SiteFooter />
      <MobileCTA scrollTarget="quote-form" />
      <style>{`*{box-sizing:border-box;margin:0;padding:0}::placeholder{color:#9CA3AF}input:focus{border-color:${C.accent}!important}`}</style>
    </div>
  );
}
