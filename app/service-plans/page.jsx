"use client";

import { useState, useEffect } from "react";
import SiteNav from "../../components/SiteNav";
import SiteFooter from "../../components/SiteFooter";
import MobileCTA from "../../components/MobileCTA";

const injectFonts = () => { if (typeof document==="undefined"||document.querySelector("#jr-fonts")) return; const l=document.createElement("link"); l.id="jr-fonts"; l.rel="stylesheet"; l.href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800&family=Source+Sans+3:wght@300;400;600&display=swap"; document.head.appendChild(l); };
const C = { bg:"#0B1628",navy:"#1B2A4A",navyMid:"#243556",navyLight:"#2C3E5A",navyFade:"#162033",gold:"#C8952E",goldLight:"#D4A843",goldPale:"rgba(200,149,46,0.12)",cream:"#F5F3EF",white:"#FFFFFF",offWhite:"#E8E4DC",muted:"#7A8FA8",charcoal:"#2D2D2D",success:"#2D8B4E",successDim:"rgba(45,139,78,0.15)",accent:"#0D9488",accentLight:"#14B8A6",accentPale:"rgba(13,148,136,0.12)" };
const f = { h:"'Montserrat', sans-serif", b:"'Source Sans 3', sans-serif" };
const Tag = ({children}) => <div style={{display:"inline-block",padding:"6px 16px",background:C.accentPale,borderRadius:"4px",marginBottom:"12px"}}><span style={{fontFamily:f.h,fontSize:"12px",fontWeight:700,color:C.accent,letterSpacing:"3px"}}>{children}</span></div>;
const GoldBar = () => <div style={{width:"60px",height:"3px",background:`linear-gradient(90deg,${C.accent},${C.accentLight})`,borderRadius:"2px",margin:"16px auto"}} />;
const Stars = () => <span style={{color:C.gold,fontSize:"14px",letterSpacing:"2px"}}>★★★★★</span>;
const inputStyle = {width:"100%",padding:"13px 16px",fontFamily:f.b,fontSize:"15px",border:"1.5px solid #D1D5DB",borderRadius:"8px",outline:"none",color:C.charcoal,marginBottom:"12px",background:"#FAFAFA",boxSizing:"border-box"};

const PAGE = {
  breadcrumb: ["Home","Services","Service Plans"],
  heroTag: "GUTTER MAINTENANCE PLANS",
  heroH1: "Keep Your Gutters",
  heroH1Accent: "Working Year-Round.",
  heroP: "Regular maintenance extends your gutter system's lifespan, prevents expensive damage, and keeps your home protected through Florida's toughest weather. Three service levels to fit every home and budget.",

  problems: [
    { icon:"🍂", title:"Clogged gutters overflow", desc:"Leaves, pine needles, and debris pile up fast in Florida. When gutters clog, water pours over the edges — straight down your walls, into your foundation, and behind your fascia boards." },
    { icon:"🦟", title:"Standing water breeds pests", desc:"Clogged gutters hold stagnant water — the perfect breeding ground for mosquitoes, mold, and algae. That standing water also accelerates rust and corrosion from the inside out." },
    { icon:"💧", title:"Leaking joints go unnoticed", desc:"Miters and seams separate over time. Small leaks turn into fascia rot, soffit staining, and foundation erosion. By the time you see damage, the repair bill has tripled." },
    { icon:"🏠", title:"Neglect kills your investment", desc:"A gutter system that cost thousands to install can fail in just a few years without maintenance. Regular cleaning and inspection is the cheapest insurance your home has." },
  ],

  plans: [
    {
      name:"LEAF CLEANING",
      tag:"BASIC",
      price:"Call for Pricing",
      desc:"Essential debris removal — blow it out, clean it up, get it flowing.",
      features:["Blow off roof debris around gutter line","Blow out all gutters — remove leaves, needles, buildup","Blow out all downspouts to confirm clear flow","Full cleanup of all debris from property","Visual inspection for obvious damage or issues"],
      best:"Homeowners who maintain regularly and need a straightforward seasonal cleanout.",
      highlight:false,
    },
    {
      name:"PREMIUM CLEANING",
      tag:"RECOMMENDED",
      price:"Call for Pricing",
      desc:"Everything in Basic plus a full water flush, gunk removal, and leak sealing.",
      features:["Everything in Leaf Cleaning","Full water wash of all gutters — removes stuck-on gunk and sediment","Complete water flush of all downspouts","Seal any obvious leaking miters (corner joints)","System flow verification — confirm water moves correctly throughout","Written condition report with photos"],
      best:"Most homeowners. The thorough clean that catches problems before they get expensive.",
      highlight:true,
    },
    {
      name:"DELUXE GUARD PACKAGE",
      tag:"PREMIUM",
      price:"Call for Pricing",
      desc:"Complete system restoration — clean, realign, reseal, and protect with new guards.",
      features:["Everything in Premium Cleaning","Resecuring and realigning all gutters","Resecuring and realigning all downspouts","Functional flow testing — make sure everything drains correctly","Resealing ALL miters throughout the system","Professional installation of new leaf guards","Guard system sized and fitted to your specific gutters"],
      best:"Homeowners who want everything dialed in — cleaned, aligned, sealed, and protected.",
      highlight:false,
    },
  ],

  alaCarte: [
    { title:"Downspout Repair", desc:"Repair of damaged or disconnected downspout sections, resecuring to structure, and sealing of leak points." },
    { title:"Gutter Guard Re-Installation", desc:"Resecure or reinstall existing gutter guards that have shifted, lifted, or been displaced by storms." },
    { title:"Wood Fascia Replacement", desc:"Repair or replacement of damaged exterior wood fascia, framing, or trim. Custom-cut, secured, and sealed." },
    { title:"General Gutter Repair", desc:"Leak sealing, hanger replacement, realignment, pitch correction — quoted based on scope after inspection." },
  ],

  stats: [
    { value:"2,000+", label:"Gutter systems maintained" },
    { value:"30+", label:"Years of experience" },
    { value:"3", label:"Service tiers available" },
    { value:"0", label:"Subcontractors — ever" },
  ],

  goldSteps: [
    { num:"01", title:"INSPECT", desc:"We evaluate your entire gutter system — checking for clogs, leaks, loose hangers, misalignment, and fascia condition. Photos included." },
    { num:"02", title:"CLEAN", desc:"Debris removal, gutter blowout, downspout clearing, and full property cleanup. Your system flows again." },
    { num:"03", title:"REPAIR", desc:"Seal leaking miters, resecure loose sections, realign pitch, and fix any issues found during inspection." },
    { num:"04", title:"PROTECT", desc:"Optional leaf guard installation, condition report with photos, and scheduling for your next service visit." },
  ],

  faqs: [
    { q:"How often should I have my gutters cleaned in Tampa?", a:"We recommend at least twice per year — once before hurricane season (May/June) and once after fall leaf drop (November/December). Homes with heavy tree coverage or pine trees may benefit from quarterly cleaning." },
    { q:"Can I just get a one-time cleaning without a plan?", a:"Yes. All of our cleaning services are available as one-time visits. Plans simply give you the convenience of scheduled service at consistent pricing — you're not locked into a contract." },
    { q:"What's the difference between Leaf Cleaning and Premium Cleaning?", a:"Leaf Cleaning removes debris from your gutters and clears downspouts. Premium Cleaning adds a full system flush to verify flow throughout the entire system, plus resealing of miters (corner joints) and resecuring of downspouts. Premium catches developing problems that basic cleaning misses." },
    { q:"Do you offer the Deluxe Guard Package for existing guard systems?", a:"The Deluxe Guard Package includes new guard installation. If you already have guards, we offer guard maintenance as part of our Premium Cleaning — clearing surface debris, checking attachment points, and ensuring proper function." },
    { q:"What does 'resealing miters' mean?", a:"Miters are the corner joints where two gutter runs meet. Over time, the sealant at these joints can crack or separate, causing leaks. Resealing miters during maintenance prevents these leaks before they damage your fascia or foundation." },
    { q:"Do you service gutters you didn't install?", a:"Yes. Our maintenance services are available for any gutter system, regardless of who installed it. We'll assess the condition and let you know if any repairs are needed beyond cleaning." },
  ],

  ctaTitle: "SCHEDULE YOUR GUTTER MAINTENANCE",
  ctaSub: "Tell us which plan interests you and we'll get you scheduled. No contracts, no pressure — just professional maintenance that protects your home.",
};

export default function ServicePlansPage() {
  const [formData, setFormData] = useState({name:"",phone:"",email:"",zip:"",plan:""});
  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);
  useEffect(() => { injectFonts(); }, []);
  const sec = {padding:"80px 24px",maxWidth:"1200px",margin:"0 auto"};
  const secTitle = {fontFamily:f.h,fontSize:"clamp(24px,4vw,36px)",fontWeight:800,letterSpacing:"2px",textAlign:"center",marginBottom:"8px"};

  return (
    <div style={{background:C.bg,color:C.white,fontFamily:f.b,lineHeight:1.65,minHeight:"100vh"}}>
      <SiteNav />
      <div style={{padding:"16px 24px 0",maxWidth:"1200px",margin:"0 auto"}}><div style={{fontFamily:f.b,fontSize:"13px",color:C.muted}}>{PAGE.breadcrumb.map((item,i) => <span key={i}>{i>0&&<span style={{margin:"0 8px",opacity:0.5}}>/</span>}<span style={{color:i===PAGE.breadcrumb.length-1?C.accent:C.muted}}>{item}</span></span>)}</div></div>

      {/* ══ HERO ══ */}
      <section className="hero-stars" style={{padding:"60px 24px 80px",maxWidth:"1200px",margin:"0 auto",display:"flex",gap:"48px",alignItems:"center",flexWrap:"wrap"}}>
        <div style={{flex:"1 1 500px",minWidth:"300px"}}>
          <Tag>{PAGE.heroTag}</Tag>
          <h1 style={{fontFamily:f.h,fontSize:"clamp(32px,5vw,48px)",fontWeight:800,lineHeight:1.1,marginBottom:"20px"}}>{PAGE.heroH1}<br/><span style={{color:C.accent}}>{PAGE.heroH1Accent}</span></h1>
          <p style={{fontFamily:f.b,fontSize:"18px",color:C.offWhite,lineHeight:1.7,marginBottom:"32px",maxWidth:"560px"}}>{PAGE.heroP}</p>
          <div style={{display:"flex",gap:"16px",flexWrap:"wrap"}}><button onClick={()=>document.getElementById("quote-form")?.scrollIntoView({behavior:"smooth"})} style={{padding:"16px 36px",fontFamily:f.h,fontSize:"14px",fontWeight:700,letterSpacing:"1.5px",color:C.white,background:`linear-gradient(135deg,${C.accent},${C.accentLight})`,border:"none",borderRadius:"8px",cursor:"pointer",boxShadow:"0 4px 16px rgba(13,148,136,0.3)"}}>SCHEDULE MAINTENANCE</button><a href="tel:8444443114" style={{display:"inline-flex",alignItems:"center",padding:"16px 36px",fontFamily:f.h,fontSize:"14px",fontWeight:700,letterSpacing:"1.5px",color:C.accent,border:`2px solid ${C.accent}`,borderRadius:"8px",textDecoration:"none"}}>CALL (844) 444-3114</a></div>
          <div style={{display:"flex",gap:"24px",marginTop:"32px",flexWrap:"wrap"}}>{PAGE.stats.map((s,i) => <div key={i} style={{textAlign:"center"}}><div style={{fontFamily:f.h,fontSize:"28px",fontWeight:800,color:C.accent}}>{s.value}</div><div style={{fontFamily:f.b,fontSize:"12px",color:C.muted,maxWidth:"100px"}}>{s.label}</div></div>)}</div>
        </div>
      </section>

      {/* ══ PROBLEM ══ */}
      <section style={{background:C.navy,padding:"80px 24px"}}><div style={{maxWidth:"1200px",margin:"0 auto",textAlign:"center"}}><Tag>THE PROBLEM</Tag><h2 style={{...secTitle,color:C.white}}>WHAT HAPPENS WHEN YOU SKIP GUTTER MAINTENANCE</h2><GoldBar /><div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(250px,1fr))",gap:"24px",marginTop:"48px",textAlign:"left"}}>{PAGE.problems.map((p,i) => <div key={i} style={{background:C.navyFade,border:`1px solid ${C.navyLight}`,borderRadius:"12px",padding:"28px",borderLeft:`4px solid ${C.accent}`}}><div style={{fontSize:"28px",marginBottom:"12px"}}>{p.icon}</div><h3 style={{fontFamily:f.h,fontSize:"17px",fontWeight:700,color:C.white,marginBottom:"8px"}}>{p.title}</h3><p style={{fontFamily:f.b,fontSize:"15px",color:C.muted,lineHeight:1.55}}>{p.desc}</p></div>)}</div></div></section>

      {/* ══ SOLUTION — PLAN TIERS ══ */}
      <section style={{background:C.bg,padding:"80px 24px"}}><div style={sec}><div style={{textAlign:"center"}}><Tag>THE JR ONE DIFFERENCE</Tag><h2 style={{...secTitle,color:C.white}}>THREE PLANS. ZERO GUESSWORK.</h2><GoldBar /><p style={{fontFamily:f.b,fontSize:"17px",color:C.muted,maxWidth:"600px",margin:"0 auto 48px"}}>Every plan includes professional-grade cleaning by our own crews — no subcontractors, no shortcuts.</p></div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(320px,1fr))",gap:"24px",alignItems:"start"}}>
          {PAGE.plans.map((plan,i) => (
            <div key={i} style={{background:C.navyFade,border:plan.highlight?`2px solid ${C.accent}`:`1px solid ${C.navyLight}`,borderRadius:"16px",padding:"32px",position:"relative",transform:plan.highlight?"scale(1.03)":"none",transition:"border-color 0.3s"}} onMouseOver={e=>{if(!plan.highlight)e.currentTarget.style.borderColor=C.accent}} onMouseOut={e=>{if(!plan.highlight)e.currentTarget.style.borderColor=C.navyLight}}>
              {plan.highlight && <div style={{position:"absolute",top:"-14px",left:"50%",transform:"translateX(-50%)",background:`linear-gradient(135deg,${C.accent},${C.accentLight})`,color:C.white,fontFamily:f.h,fontSize:"11px",fontWeight:700,letterSpacing:"1.5px",padding:"4px 16px",borderRadius:"4px"}}>MOST POPULAR</div>}
              <div style={{fontFamily:f.h,fontSize:"11px",fontWeight:700,color:plan.highlight?C.accent:C.muted,letterSpacing:"2px",marginBottom:"8px"}}>{plan.tag}</div>
              <h3 style={{fontFamily:f.h,fontSize:"22px",fontWeight:800,color:C.white,marginBottom:"8px"}}>{plan.name}</h3>
              <div style={{fontFamily:f.h,fontSize:"18px",fontWeight:700,color:C.accent,marginBottom:"12px"}}>{plan.price}</div>
              <p style={{fontFamily:f.b,fontSize:"15px",color:C.muted,marginBottom:"20px",lineHeight:1.55}}>{plan.desc}</p>
              <div style={{borderTop:`1px solid ${C.navyLight}`,paddingTop:"16px",marginBottom:"16px"}}>
                {plan.features.map((feat,j) => (
                  <div key={j} style={{display:"flex",gap:"10px",marginBottom:"10px",alignItems:"flex-start"}}>
                    <span style={{color:C.accent,fontSize:"14px",flexShrink:0,marginTop:"2px"}}>✓</span>
                    <span style={{fontFamily:f.b,fontSize:"14px",color:C.offWhite}}>{feat}</span>
                  </div>
                ))}
              </div>
              <div style={{background:C.accentPale,borderRadius:"8px",padding:"12px 14px",marginBottom:"20px"}}>
                <span style={{fontFamily:f.h,fontSize:"11px",fontWeight:700,color:C.accent,letterSpacing:"1px"}}>BEST FOR: </span>
                <span style={{fontFamily:f.b,fontSize:"13px",color:C.offWhite}}>{plan.best}</span>
              </div>
              <button onClick={()=>document.getElementById("quote-form")?.scrollIntoView({behavior:"smooth"})} style={{width:"100%",padding:"14px",fontFamily:f.h,fontSize:"13px",fontWeight:700,letterSpacing:"1.5px",color:plan.highlight?C.white:C.accent,background:plan.highlight?`linear-gradient(135deg,${C.accent},${C.accentLight})`:"transparent",border:plan.highlight?"none":`2px solid ${C.accent}`,borderRadius:"8px",cursor:"pointer",boxShadow:plan.highlight?"0 4px 16px rgba(13,148,136,0.3)":"none"}}>
                {plan.highlight?"GET STARTED":"LEARN MORE"}
              </button>
            </div>
          ))}
        </div>

        {/* A LA CARTE */}
        <div style={{marginTop:"64px",textAlign:"center"}}><Tag>ADDITIONAL SERVICES</Tag><h2 style={{...secTitle,color:C.white}}>A LA CARTE MAINTENANCE</h2><GoldBar /></div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(250px,1fr))",gap:"16px",marginTop:"40px"}}>
          {PAGE.alaCarte.map((svc,i) =>
            <div key={i} style={{background:C.navyFade,border:`1px solid ${C.navyLight}`,borderRadius:"12px",padding:"20px",transition:"border-color 0.3s"}} onMouseOver={e=>e.currentTarget.style.borderColor=C.accent} onMouseOut={e=>e.currentTarget.style.borderColor=C.navyLight}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"8px"}}>
                <h3 style={{fontFamily:f.h,fontSize:"15px",fontWeight:700,color:C.white}}>{svc.title}</h3>
                <span style={{fontFamily:f.h,fontSize:"16px",color:C.accent}}>✓</span>
              </div>
              <p style={{fontFamily:f.b,fontSize:"14px",color:C.muted,lineHeight:1.5}}>{svc.desc}</p>
            </div>
          )}
        </div>
      </div></section>

      {/* ══ PEAK 301 CALLOUT ══ */}
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

      {/* ══ GOLD STANDARD ══ */}
      <section style={{background:C.navy,padding:"80px 24px"}}><div style={sec}><div style={{textAlign:"center"}}><Tag>THE GOLD STANDARD</Tag><h2 style={{...secTitle,color:C.white}}>OUR MAINTENANCE PROCESS</h2><GoldBar /><p style={{fontFamily:f.b,fontSize:"17px",color:C.offWhite,fontStyle:"italic",maxWidth:"500px",margin:"0 auto 48px"}}>Every home. Every time. No exceptions.</p></div><div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(250px,1fr))",gap:"24px"}}>{PAGE.goldSteps.map((step,i) => <div key={i} style={{background:C.navyFade,border:`1px solid ${C.navyLight}`,borderRadius:"12px",padding:"28px",position:"relative"}}><div style={{fontFamily:f.h,fontSize:"36px",fontWeight:800,color:"rgba(13,148,136,0.08)",position:"absolute",top:"16px",right:"20px"}}>{step.num}</div><div style={{fontFamily:f.h,fontSize:"11px",fontWeight:700,color:C.accent,letterSpacing:"3px",marginBottom:"8px"}}>STEP {step.num}</div><h3 style={{fontFamily:f.h,fontSize:"22px",fontWeight:700,color:C.white,marginBottom:"12px"}}>{step.title}</h3><p style={{fontFamily:f.b,fontSize:"15px",color:C.muted,lineHeight:1.6}}>{step.desc}</p></div>)}</div></div></section>

      {/* ══ FAQ ══ */}
      <section style={{background:C.bg,padding:"80px 24px"}}><div style={{maxWidth:"800px",margin:"0 auto",textAlign:"center"}}><Tag>FAQ</Tag><h2 style={{...secTitle,color:C.white}}>MAINTENANCE QUESTIONS</h2><GoldBar /><div style={{marginTop:"40px",textAlign:"left"}}>{PAGE.faqs.map((faq,i) => <div key={i} style={{borderBottom:`1px solid ${C.navyLight}`}}><button onClick={()=>setOpenFaq(openFaq===i?null:i)} style={{width:"100%",padding:"20px 0",background:"none",border:"none",cursor:"pointer",display:"flex",justifyContent:"space-between",alignItems:"center",gap:"16px"}}><span style={{fontFamily:f.h,fontSize:"15px",fontWeight:600,color:openFaq===i?C.accent:C.white,textAlign:"left",transition:"color 0.2s"}}>{faq.q}</span><span style={{fontFamily:f.h,fontSize:"20px",color:C.accent,transform:openFaq===i?"rotate(45deg)":"none",transition:"transform 0.3s",flexShrink:0}}>+</span></button>{openFaq===i&&<div style={{padding:"0 0 20px",fontFamily:f.b,fontSize:"15px",color:C.muted,lineHeight:1.65}}>{faq.a}</div>}</div>)}</div></div></section>

      {/* ══ CTA FORM ══ */}
      <section id="quote-form" style={{background:`linear-gradient(165deg,${C.navyMid},${C.navy})`,padding:"80px 24px"}}><div style={{maxWidth:"600px",margin:"0 auto",textAlign:"center"}}>
        <h2 style={{fontFamily:f.h,fontSize:"clamp(28px,5vw,40px)",fontWeight:800,color:C.white,marginBottom:"12px"}}>{PAGE.ctaTitle}</h2>
        <p style={{fontFamily:f.b,fontSize:"17px",color:C.offWhite,marginBottom:"40px"}}>{PAGE.ctaSub}</p>
        {submitted ? <div style={{background:C.successDim,border:`1px solid ${C.success}`,borderRadius:"12px",padding:"32px"}}><div style={{fontSize:"48px",marginBottom:"12px"}}>✓</div><h3 style={{fontFamily:f.h,fontSize:"20px",fontWeight:700,color:"#4ADE80"}}>Request Received!</h3><p style={{fontFamily:f.b,fontSize:"15px",color:C.muted,marginTop:"8px"}}>We'll get back to you within hours.</p></div> : <div style={{background:C.navyFade,border:`1px solid ${C.navyLight}`,borderRadius:"16px",padding:"32px",boxShadow:"0 24px 80px rgba(0,0,0,0.4)",textAlign:"left"}}>
          <h3 style={{fontFamily:f.h,fontSize:"18px",fontWeight:700,color:C.white,textAlign:"center",marginBottom:"4px"}}>Schedule Your Gutter Maintenance</h3>
          <div style={{width:"40px",height:"3px",background:C.accent,borderRadius:"2px",margin:"10px auto 20px"}} />
          <input style={{...inputStyle,background:C.navy,border:`1.5px solid ${C.navyLight}`,color:C.white}} placeholder="Full Name" value={formData.name} onChange={e=>setFormData({...formData,name:e.target.value})} />
          <input style={{...inputStyle,background:C.navy,border:`1.5px solid ${C.navyLight}`,color:C.white}} placeholder="Phone Number" type="tel" value={formData.phone} onChange={e=>setFormData({...formData,phone:e.target.value})} />
          <input style={{...inputStyle,background:C.navy,border:`1.5px solid ${C.navyLight}`,color:C.white}} placeholder="Email Address" type="email" value={formData.email} onChange={e=>setFormData({...formData,email:e.target.value})} />
          <input style={{...inputStyle,background:C.navy,border:`1.5px solid ${C.navyLight}`,color:C.white}} placeholder="ZIP Code" value={formData.zip} onChange={e=>setFormData({...formData,zip:e.target.value})} maxLength={5} />
          <select style={{...inputStyle,background:C.navy,border:`1.5px solid ${C.navyLight}`,color:C.white,cursor:"pointer"}} value={formData.plan} onChange={e=>setFormData({...formData,plan:e.target.value})}>
            {["Which plan interests you?","Leaf Cleaning (Basic)","Premium Cleaning (Recommended)","Deluxe Guard Package","Not sure — need advice","One-time cleaning only"].map((o,i)=><option key={i} value={i===0?"":o}>{o}</option>)}
          </select>
          <button onClick={()=>setSubmitted(true)} style={{width:"100%",padding:"16px",fontFamily:f.h,fontSize:"14px",fontWeight:700,letterSpacing:"1.5px",color:C.white,background:`linear-gradient(135deg,${C.accent},${C.accentLight})`,border:"none",borderRadius:"8px",cursor:"pointer",boxShadow:"0 4px 16px rgba(13,148,136,0.3)"}}>SCHEDULE MY MAINTENANCE</button>
          <p style={{fontFamily:f.b,fontSize:"12px",color:C.muted,textAlign:"center",marginTop:"12px"}}>No spam. No pressure. Just professional maintenance.</p>
        </div>}
        <div style={{marginTop:"32px"}}><p style={{fontFamily:f.b,fontSize:"15px",color:C.muted,marginBottom:"8px"}}>Prefer to talk?</p><a href="tel:8444443114" style={{fontFamily:f.h,fontSize:"18px",fontWeight:700,color:C.accent,textDecoration:"none"}}>📞 (844) 444-3114</a></div>
      </div></section>

      <SiteFooter />
      <MobileCTA scrollTarget="quote-form" />
      <style>{`*{box-sizing:border-box;margin:0;padding:0}::placeholder{color:${C.muted}}input:focus,select:focus{border-color:${C.accent}!important}`}</style>
    </div>
  );
}
