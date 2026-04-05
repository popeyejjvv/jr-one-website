"use client";

import { useState, useEffect } from "react";
import SiteNav from "../../components/SiteNav";
import SiteFooter from "../../components/SiteFooter";
import MobileCTA from "../../components/MobileCTA";

const injectFonts = () => { if (typeof document==="undefined"||document.querySelector("#jr-fonts")) return; const l=document.createElement("link"); l.id="jr-fonts"; l.rel="stylesheet"; l.href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800&family=Source+Sans+3:wght@300;400;600&display=swap"; document.head.appendChild(l); };
const C = { bg:"#0B1628",navy:"#1B2A4A",navyMid:"#243556",navyLight:"#2C3E5A",navyFade:"#162033",gold:"#C8952E",goldLight:"#D4A843",goldPale:"rgba(200,149,46,0.12)",cream:"#F5F3EF",white:"#FFFFFF",offWhite:"#E8E4DC",muted:"#7A8FA8",charcoal:"#2D2D2D",success:"#2D8B4E",successDim:"rgba(45,139,78,0.15)",accent:"#EAB308",accentLight:"#FACC15",accentPale:"rgba(234,179,8,0.12)" };
const f = { h:"'Montserrat', sans-serif", b:"'Source Sans 3', sans-serif" };
const Tag = ({children}) => <div style={{display:"inline-block",padding:"6px 16px",background:C.accentPale,borderRadius:"4px",marginBottom:"12px"}}><span style={{fontFamily:f.h,fontSize:"12px",fontWeight:700,color:C.accent,letterSpacing:"3px"}}>{children}</span></div>;
const GoldBar = () => <div style={{width:"60px",height:"3px",background:`linear-gradient(90deg,${C.accent},${C.accentLight})`,borderRadius:"2px",margin:"16px auto"}} />;
const Stars = () => <span style={{color:C.gold,fontSize:"14px",letterSpacing:"2px"}}>★★★★★</span>;
const inputStyle = {width:"100%",padding:"13px 16px",fontFamily:f.b,fontSize:"15px",border:"1.5px solid #D1D5DB",borderRadius:"8px",outline:"none",color:C.charcoal,marginBottom:"12px",background:"#FAFAFA",boxSizing:"border-box"};

const PAGE = {
  breadcrumb: ["Home","Services","Gutter Repair & Maintenance"],
  heroTag: "GUTTER REPAIR & MAINTENANCE",
  heroH1: "Leaking, Sagging, or Overflowing?",
  heroH1Gold: "We Fix It Right the First Time.",
  heroP: "Don't let small gutter problems become expensive home damage. Our repair specialists diagnose the real issue — not just the symptom — and fix it so you don't have to call again. Plus seasonal maintenance programs to prevent problems before they start.",

  problems: [
    { icon:"💧", title:"Leaking seams and joints", desc:"Water dripping between gutter sections, at corners, or around downspout connections. Left unrepaired, leaks stain your fascia, rot your wood, and erode your foundation soil." },
    { icon:"📐", title:"Sagging and pulling away", desc:"Gutters pulling away from the fascia board due to failed hangers, rotted wood, or ice/debris weight. Sagging gutters don't drain — they pool water and eventually collapse." },
    { icon:"🌊", title:"Overflowing in rain", desc:"Water pouring over the front edge during storms — usually caused by clogs, incorrect pitch, or undersized gutters. The water goes exactly where gutters are supposed to prevent it from going." },
    { icon:"🔩", title:"Damaged or missing downspouts", desc:"Crushed, disconnected, or missing downspouts mean water dumps directly at your foundation instead of being routed away. This is how foundation cracks, basement flooding, and soil erosion happen." },
  ],

  solutions: [
    { title:"Leak repair and sealing", desc:"We locate every leak point — seams, end caps, corners, downspout connections — and seal them with professional-grade sealant that flexes with temperature changes. No temporary fixes that fail in six months." },
    { title:"Hanger replacement and realignment", desc:"We replace failed spike-and-ferrule hangers with modern hidden bracket systems, refasten gutters to solid fascia, and re-pitch for proper water flow. Your gutters hang straight and drain completely." },
    { title:"Downspout repair and rerouting", desc:"We repair or replace damaged downspouts, add extensions to direct water away from your foundation, and reroute drainage when the original layout isn't working." },
    { title:"Gutter cleaning and debris removal", desc:"Full cleanout of leaves, pine needles, shingle grit, and standing water. We flush every downspout to confirm clear flow and inspect for damage while we're up there." },
    { title:"Storm damage emergency response", desc:"Tampa hurricane season doesn't wait and neither do we. We respond quickly to storm-damaged gutters — temporary stabilization first to prevent further damage, then permanent repair as soon as materials and scheduling allow." },
    { title:"Seasonal maintenance programs", desc:"Preventive maintenance twice a year keeps your gutters performing and extends their lifespan significantly. We clean, inspect, tighten, seal, and document the condition of your entire system." },
  ],

  stats: [
    { value:"Same Day", label:"Emergency response available" },
    { value:"500+", label:"Repairs completed annually" },
    { value:"1st", label:"Call — we fix it right" },
    { value:"30+", label:"Years diagnosing gutter issues" },
  ],

  goldSteps: [
    { num:"01", title:"ASSESS", desc:"We diagnose the root cause — not just the visible symptom. A sagging gutter might mean a failed hanger, rotted fascia, or both. We find the real problem." },
    { num:"02", title:"DESIGN", desc:"Clear explanation of what's wrong, what needs to happen, and what it costs. No vague 'we'll figure it out as we go' — you approve the plan before we start." },
    { num:"03", title:"INSTALL", desc:"Our crew performs the repair with the right materials and proper technique. We fix it to last, not to get us off the ladder faster." },
    { num:"04", title:"PROTECT", desc:"We test the repair with water flow, clean up, and give you maintenance tips to prevent recurrence. If the issue comes back, so do we." },
  ],

  reviews: [
    { text:"Had two long pieces of aluminum gable fascia replaced due to recent hurricanes. Very small job and I was worried about anyone interested in a job that small at a reasonable price. JR One was very responsive to quote and do the work timely, all at a very fair price.", name:"Steven M.", context:"Small Repair Job" },
    { text:"What a great experience post Milton. Ben came over two days after the storm to assess the damage. Got me added to the schedule quickly. They fixed and added a new gutter. I couldn't be more pleased.", name:"Johnny C.", context:"Post-Hurricane Repair" },
    { text:"Great experience — quick response with wonderful communication from Emily. The workers arrived with the proper equipment and materials — very professional job.", name:"Rich B.", context:"Gutter Repair" },
  ],

  faqs: [
    { q:"How much does gutter repair cost?", a:"Most gutter repairs range from $150–$500 depending on the type and extent of damage. Simple leak sealing or hanger replacement is on the lower end. Re-pitching an entire run, replacing sections, or addressing underlying fascia rot costs more. We provide an exact quote before any work begins." },
    { q:"Is it worth repairing old gutters or should I replace them?", a:"It depends on the overall condition. If your gutters are generally sound and the issue is localized (a few leaks, one sagging section), repair makes sense. If you're seeing widespread problems — multiple leaks, significant sagging, corrosion — replacement is usually more cost-effective long-term. We'll give you an honest assessment either way." },
    { q:"How quickly can you respond to storm damage?", a:"We prioritize storm damage calls and typically perform an initial assessment within 24-48 hours of your call. If immediate stabilization is needed to prevent further damage, we handle that first. Permanent repairs are scheduled as quickly as materials and crew availability allow." },
    { q:"Do you do small jobs?", a:"Yes. We don't turn away small repairs because they're 'not worth our time.' A single leaking joint or one loose section still deserves professional attention. Some of our best reviews come from small jobs where other companies wouldn't even return the call." },
    { q:"How often should I have my gutters cleaned?", a:"In Tampa Bay, we recommend professional cleaning at least twice a year — once before hurricane season (May/June) and once after fall leaf drop (November/December). Homes near pine trees or heavy tree coverage may need quarterly cleaning." },
    { q:"What does a maintenance program include?", a:"Our seasonal maintenance includes full gutter and downspout cleanout, leak inspection and sealing, hanger tightening, pitch verification, and a written condition report with photos. Think of it as a checkup that catches small problems before they become expensive ones." },
  ],

  ctaTitle: "GUTTERS ACTING UP?",
  ctaSub: "Get your free gutter inspection. We'll find the problem, explain it clearly, and give you a fair quote to fix it right — whether it's a $150 repair or a full replacement recommendation.",
};

export default function GutterRepairPage() {
  const [formData, setFormData] = useState({name:"",phone:"",email:"",zip:""});
  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);
  useEffect(() => { injectFonts(); }, []);
  const sec = {padding:"80px 24px",maxWidth:"1200px",margin:"0 auto"};
  const secTitle = {fontFamily:f.h,fontSize:"clamp(24px,4vw,36px)",fontWeight:800,letterSpacing:"2px",textAlign:"center",marginBottom:"8px"};

  return (
    <div style={{background:C.bg,color:C.white,fontFamily:f.b,lineHeight:1.65,minHeight:"100vh"}}>
      <SiteNav />
      <div style={{padding:"16px 24px 0",maxWidth:"1200px",margin:"0 auto"}}><div style={{fontFamily:f.b,fontSize:"13px",color:C.muted}}>{PAGE.breadcrumb.map((item,i) => <span key={i}>{i>0&&<span style={{margin:"0 8px",opacity:0.5}}>/</span>}<span style={{color:i===PAGE.breadcrumb.length-1?C.accent:C.muted}}>{item}</span></span>)}</div></div>

      <section className="hero-stars" style={{padding:"60px 24px 80px",maxWidth:"1200px",margin:"0 auto",display:"flex",gap:"48px",alignItems:"center",flexWrap:"wrap"}}><div style={{flex:"1 1 500px",minWidth:"300px"}}><Tag>{PAGE.heroTag}</Tag><h1 style={{fontFamily:f.h,fontSize:"clamp(32px,5vw,48px)",fontWeight:800,lineHeight:1.1,marginBottom:"20px"}}>{PAGE.heroH1}<br/><span style={{color:C.accent}}>{PAGE.heroH1Gold}</span></h1><p style={{fontFamily:f.b,fontSize:"18px",color:C.offWhite,lineHeight:1.7,marginBottom:"32px",maxWidth:"560px"}}>{PAGE.heroP}</p><div style={{display:"flex",gap:"16px",flexWrap:"wrap"}}><button onClick={()=>document.getElementById("quote-form")?.scrollIntoView({behavior:"smooth"})} style={{padding:"16px 36px",fontFamily:f.h,fontSize:"14px",fontWeight:700,letterSpacing:"1.5px",color:C.navy,background:`linear-gradient(135deg,${C.accent},${C.accentLight})`,border:"none",borderRadius:"8px",cursor:"pointer",boxShadow:"0 4px 16px rgba(234,179,8,0.3)"}}>GET YOUR FREE INSPECTION</button><a href="tel:8444443114" style={{display:"inline-flex",alignItems:"center",padding:"16px 36px",fontFamily:f.h,fontSize:"14px",fontWeight:700,letterSpacing:"1.5px",color:C.accent,border:`2px solid ${C.accent}`,borderRadius:"8px",textDecoration:"none"}}>📞 CALL (844) 444-3114</a></div><div style={{display:"flex",gap:"24px",marginTop:"32px",flexWrap:"wrap"}}>{PAGE.stats.map((s,i) => <div key={i} style={{textAlign:"center"}}><div style={{fontFamily:f.h,fontSize:"28px",fontWeight:800,color:C.accent}}>{s.value}</div><div style={{fontFamily:f.b,fontSize:"12px",color:C.muted,maxWidth:"100px"}}>{s.label}</div></div>)}</div></div>
</section>

      <section style={{background:C.navy,padding:"80px 24px"}}><div style={{maxWidth:"1200px",margin:"0 auto",textAlign:"center"}}><Tag>THE PROBLEM</Tag><h2 style={{...secTitle,color:C.white}}>GUTTER PROBLEMS THAT GET EXPENSIVE FAST</h2><GoldBar /><div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(250px,1fr))",gap:"24px",marginTop:"48px",textAlign:"left"}}>{PAGE.problems.map((p,i) => <div key={i} style={{background:C.navyFade,border:`1px solid ${C.navyLight}`,borderRadius:"12px",padding:"28px",borderLeft:`4px solid ${C.gold}`}}><div style={{fontSize:"28px",marginBottom:"12px"}}>{p.icon}</div><h3 style={{fontFamily:f.h,fontSize:"17px",fontWeight:700,color:C.white,marginBottom:"8px"}}>{p.title}</h3><p style={{fontFamily:f.b,fontSize:"15px",color:C.muted,lineHeight:1.55}}>{p.desc}</p></div>)}</div></div></section>

      <section style={{background:C.bg,padding:"80px 24px"}}><div style={sec}><div style={{textAlign:"center"}}><Tag>THE JR ONE DIFFERENCE</Tag><h2 style={{...secTitle,color:C.white}}>REPAIRS THAT ACTUALLY LAST</h2><GoldBar /><p style={{fontFamily:f.b,fontSize:"17px",color:C.muted,maxWidth:"600px",margin:"0 auto 48px"}}>We diagnose the root cause and fix it permanently — no band-aid solutions that fail next storm season.</p></div><div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(340px,1fr))",gap:"20px"}}>{PAGE.solutions.map((s,i) => <div key={i} style={{background:C.navyFade,border:`1px solid ${C.navyLight}`,borderRadius:"12px",padding:"28px",transition:"border-color 0.3s"}} onMouseOver={e=>e.currentTarget.style.borderColor=C.accent} onMouseOut={e=>e.currentTarget.style.borderColor=C.navyLight}><div style={{fontFamily:f.h,fontSize:"11px",fontWeight:700,color:C.accent,letterSpacing:"2px",marginBottom:"8px"}}>0{i+1}</div><h3 style={{fontFamily:f.h,fontSize:"17px",fontWeight:700,color:C.white,marginBottom:"10px"}}>{s.title}</h3><p style={{fontFamily:f.b,fontSize:"15px",color:C.muted,lineHeight:1.6}}>{s.desc}</p></div>)}</div></div></section>

      {/* ══ PEAK 301 CALLOUT ══ */}
      <section style={{background:"linear-gradient(135deg, rgba(177,26,33,0.08), rgba(15,30,54,0.97))",padding:"28px 24px",borderTop:"2px solid #B11A21",borderBottom:"2px solid #B11A21"}}>
        <div style={{maxWidth:"1000px",margin:"0 auto",display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:"20px"}}>
          <div style={{flex:"1 1 500px"}}>
            <div style={{display:"flex",alignItems:"center",gap:"8px",marginBottom:"8px"}}><span style={{fontSize:"16px"}}>⚠️</span><span style={{fontFamily:"'Montserrat', sans-serif",fontSize:"11px",fontWeight:700,color:"#B11A21",letterSpacing:"2px"}}>FLORIDA INSURANCE ALERT</span></div>
            <p style={{fontFamily:"'Montserrat', sans-serif",fontSize:"clamp(16px,2.5vw,20px)",fontWeight:800,color:"#FFFFFF",lineHeight:1.3,marginBottom:"6px"}}>280% Increase in Non-Renewals — Roof Over 15 Years Old?</p>
            <p style={{fontFamily:"'Source Sans 3', sans-serif",fontSize:"14px",color:"#7A8FA8",lineHeight:1.5}}><strong style={{color:"#E8E4DC"}}>Peak 301</strong> restores shingles from the inside out — adds 6–10 years at under 15% of replacement cost, with warranty docs your insurer must accept under FL law.</p>
          </div>
          <div style={{display:"flex",flexDirection:"column",gap:"8px",flexShrink:0}}>
            <a href="/peak-301" style={{padding:"12px 24px",fontFamily:"'Montserrat', sans-serif",fontSize:"12px",fontWeight:700,letterSpacing:"1px",color:"#FFFFFF",background:"linear-gradient(135deg, #B11A21, #D42A2A)",borderRadius:"6px",textDecoration:"none",textAlign:"center",boxShadow:"0 4px 12px rgba(177,26,33,0.3)"}}>PEAK 301 INFO →</a>
            <a href="/insurance-resource-center" style={{padding:"12px 24px",fontFamily:"'Montserrat', sans-serif",fontSize:"12px",fontWeight:700,letterSpacing:"1px",color:"#B11A21",border:"1.5px solid #B11A21",borderRadius:"6px",textDecoration:"none",textAlign:"center"}}>YOUR RIGHTS →</a>
          </div>
        </div>
      </section>

      <section style={{background:C.navy,padding:"80px 24px"}}><div style={sec}><div style={{textAlign:"center"}}><Tag>THE GOLD STANDARD</Tag><h2 style={{...secTitle,color:C.white}}>OUR REPAIR PROCESS</h2><GoldBar /><p style={{fontFamily:f.b,fontSize:"17px",color:C.offWhite,fontStyle:"italic",maxWidth:"500px",margin:"0 auto 48px"}}>Every home. Every time. No exceptions.</p></div><div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(250px,1fr))",gap:"24px"}}>{PAGE.goldSteps.map((step,i) => <div key={i} style={{background:C.navyFade,border:`1px solid ${C.navyLight}`,borderRadius:"12px",padding:"28px",position:"relative"}}><div style={{fontFamily:f.h,fontSize:"36px",fontWeight:800,color:"rgba(200,149,46,0.08)",position:"absolute",top:"16px",right:"20px"}}>{step.num}</div><div style={{fontFamily:f.h,fontSize:"11px",fontWeight:700,color:C.accent,letterSpacing:"3px",marginBottom:"8px"}}>STEP {step.num}</div><h3 style={{fontFamily:f.h,fontSize:"22px",fontWeight:700,color:C.white,marginBottom:"12px"}}>{step.title}</h3><p style={{fontFamily:f.b,fontSize:"15px",color:C.muted,lineHeight:1.6}}>{step.desc}</p></div>)}</div></div></section>

      <section style={{background:C.bg,padding:"80px 24px"}}><div style={sec}><div style={{textAlign:"center"}}><Tag>CUSTOMER REVIEWS</Tag><h2 style={{...secTitle,color:C.white}}>WHAT REPAIR CUSTOMERS SAY</h2><GoldBar /></div><div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(300px,1fr))",gap:"20px",marginTop:"48px"}}>{PAGE.reviews.map((rev,i) => <div key={i} style={{background:C.navyFade,border:`1px solid ${C.navyLight}`,borderRadius:"12px",padding:"28px"}}><Stars /><p style={{fontFamily:f.b,fontSize:"15px",color:C.offWhite,lineHeight:1.65,margin:"16px 0",fontStyle:"italic"}}>"{rev.text}"</p><div style={{borderTop:`1px solid ${C.navyLight}`,paddingTop:"12px",display:"flex",justifyContent:"space-between",alignItems:"center"}}><span style={{fontFamily:f.h,fontSize:"14px",fontWeight:600,color:C.white}}>{rev.name}</span><span style={{fontFamily:f.b,fontSize:"12px",color:C.muted}}>{rev.context}</span></div></div>)}</div></div></section>

      <section style={{background:C.navy,padding:"80px 24px"}}><div style={{maxWidth:"800px",margin:"0 auto",textAlign:"center"}}><Tag>FAQ</Tag><h2 style={{...secTitle,color:C.white}}>GUTTER REPAIR QUESTIONS</h2><GoldBar /><div style={{marginTop:"40px",textAlign:"left"}}>{PAGE.faqs.map((faq,i) => <div key={i} style={{borderBottom:`1px solid ${C.navyLight}`}}><button onClick={()=>setOpenFaq(openFaq===i?null:i)} style={{width:"100%",padding:"20px 0",background:"none",border:"none",cursor:"pointer",display:"flex",justifyContent:"space-between",alignItems:"center",gap:"16px"}}><span style={{fontFamily:f.h,fontSize:"15px",fontWeight:600,color:openFaq===i?C.accent:C.white,textAlign:"left",transition:"color 0.2s"}}>{faq.q}</span><span style={{fontFamily:f.h,fontSize:"20px",color:C.accent,transform:openFaq===i?"rotate(45deg)":"none",transition:"transform 0.3s",flexShrink:0}}>+</span></button>{openFaq===i&&<div style={{padding:"0 0 20px",fontFamily:f.b,fontSize:"15px",color:C.muted,lineHeight:1.65}}>{faq.a}</div>}</div>)}</div></div></section>

      <section id="quote-form" style={{background:`linear-gradient(165deg,${C.navyMid},${C.navy})`,padding:"80px 24px"}}><div style={{maxWidth:"600px",margin:"0 auto",textAlign:"center"}}><h2 style={{fontFamily:f.h,fontSize:"clamp(28px,5vw,40px)",fontWeight:800,color:C.white,marginBottom:"12px"}}>{PAGE.ctaTitle}</h2><p style={{fontFamily:f.b,fontSize:"17px",color:C.offWhite,marginBottom:"40px"}}>{PAGE.ctaSub}</p>
        {submitted ? <div style={{background:C.successDim,border:`1px solid ${C.success}`,borderRadius:"12px",padding:"32px"}}><div style={{fontSize:"48px",marginBottom:"12px"}}>✓</div><h3 style={{fontFamily:f.h,fontSize:"20px",fontWeight:700,color:"#4ADE80"}}>Inspection Request Received!</h3></div> : <div style={{background:C.white,borderRadius:"16px",padding:"32px",boxShadow:"0 24px 80px rgba(0,0,0,0.4)",textAlign:"left"}}><h3 style={{fontFamily:f.h,fontSize:"18px",fontWeight:700,color:C.navy,textAlign:"center",marginBottom:"4px"}}>Get Your Free Gutter Inspection</h3><div style={{width:"40px",height:"3px",background:C.accent,borderRadius:"2px",margin:"10px auto 20px"}} /><input style={inputStyle} placeholder="Full Name" value={formData.name} onChange={e=>setFormData({...formData,name:e.target.value})} /><input style={inputStyle} placeholder="Phone Number" type="tel" value={formData.phone} onChange={e=>setFormData({...formData,phone:e.target.value})} /><input style={inputStyle} placeholder="Email Address" type="email" value={formData.email} onChange={e=>setFormData({...formData,email:e.target.value})} /><input style={inputStyle} placeholder="ZIP Code" value={formData.zip} onChange={e=>setFormData({...formData,zip:e.target.value})} maxLength={5} /><button onClick={()=>setSubmitted(true)} style={{width:"100%",padding:"16px",fontFamily:f.h,fontSize:"14px",fontWeight:700,letterSpacing:"1.5px",color:C.navy,background:`linear-gradient(135deg,${C.accent},${C.accentLight})`,border:"none",borderRadius:"8px",cursor:"pointer"}}>REQUEST MY FREE GUTTER INSPECTION</button><p style={{fontFamily:f.b,fontSize:"12px",color:"#9CA3AF",textAlign:"center",marginTop:"12px"}}>No spam. No pressure.</p></div>}
        <div style={{marginTop:"32px"}}><a href="tel:8444443114" style={{fontFamily:f.h,fontSize:"18px",fontWeight:700,color:C.gold,textDecoration:"none"}}>📞 (844) 444-3114</a></div></div></section>

      <SiteFooter />
      <MobileCTA scrollTarget="quote-form" />
      <style>{`*{box-sizing:border-box;margin:0;padding:0}::placeholder{color:#9CA3AF}input:focus{border-color:${C.accent}!important}`}</style>
    </div>
  );
}
