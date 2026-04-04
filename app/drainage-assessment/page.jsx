"use client";

import { useState, useEffect } from "react";
import SiteNav from "../../components/SiteNav";
import SiteFooter from "../../components/SiteFooter";
import MobileCTA from "../../components/MobileCTA";

const injectFonts = () => { if (typeof document==="undefined"||document.querySelector("#jr-fonts")) return; const l=document.createElement("link"); l.id="jr-fonts"; l.rel="stylesheet"; l.href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800&family=Source+Sans+3:wght@300;400;600&display=swap"; document.head.appendChild(l); };
const C = { bg:"#0B1628",navy:"#1B2A4A",navyMid:"#243556",navyLight:"#2C3E5A",navyFade:"#162033",gold:"#C8952E",goldLight:"#D4A843",goldPale:"rgba(200,149,46,0.12)",cream:"#F5F3EF",white:"#FFFFFF",offWhite:"#E8E4DC",muted:"#7A8FA8",charcoal:"#2D2D2D",success:"#2D8B4E",successDim:"rgba(45,139,78,0.15)",accent:"#2563EB",accentLight:"#3B82F6",accentPale:"rgba(37,99,235,0.12)" };
const f = { h:"'Montserrat', sans-serif", b:"'Source Sans 3', sans-serif" };
const Tag = ({children}) => <div style={{display:"inline-block",padding:"6px 16px",background:C.accentPale,borderRadius:"4px",marginBottom:"12px"}}><span style={{fontFamily:f.h,fontSize:"12px",fontWeight:700,color:C.accent,letterSpacing:"3px"}}>{children}</span></div>;
const GoldBar = () => <div style={{width:"60px",height:"3px",background:`linear-gradient(90deg,${C.accent},${C.accentLight})`,borderRadius:"2px",margin:"16px auto"}} />;
const inputStyle = {width:"100%",padding:"13px 16px",fontFamily:f.b,fontSize:"15px",border:"1.5px solid #D1D5DB",borderRadius:"8px",outline:"none",color:C.charcoal,marginBottom:"12px",background:"#FAFAFA",boxSizing:"border-box"};

const PAGE = {
  breadcrumb: ["Home","Services","Drainage Assessment"],
  heroTag: "DRAINAGE ASSESSMENT",
  heroH1: "Where Is Your Water Going?",
  heroH1Accent: "We'll Find Out.",
  heroP: "Florida dumps over 50 inches of rain per year on your home. If your gutters, downspouts, and grading aren't managing that water correctly, it's going somewhere you don't want it — your foundation, your walls, your landscaping. Our drainage assessment identifies exactly where your water is going and what needs to change.",

  problems: [
    { icon:"🌊", title:"Foundation pooling", desc:"Water collecting around your foundation causes cracks, settling, and structural damage. Most homeowners don't notice until the repair bill is $5,000–$15,000." },
    { icon:"🏚️", title:"Fascia and soffit saturation", desc:"Overflowing gutters soak your fascia boards and soffit panels. Wood rots from the inside out — by the time you see paint peeling, the damage is already behind your walls." },
    { icon:"🌿", title:"Landscape erosion", desc:"Uncontrolled water flow carves trenches through mulch beds, washes out plantings, and creates mud pits where you used to have a yard." },
    { icon:"🦟", title:"Standing water and pests", desc:"Poorly drained areas create mosquito breeding grounds and attract pests. In Florida, standing water is a year-round health concern." },
  ],

  whatWeAssess: [
    { title:"Gutter system capacity", desc:"Are your gutters the right size for your roof area? We measure water volume against gutter capacity to identify overflow points." },
    { title:"Downspout placement and routing", desc:"Where your downspouts discharge matters as much as the gutters themselves. We trace every downspout's path and evaluate whether water is being directed away from your foundation." },
    { title:"Pitch and slope analysis", desc:"Gutters need precise pitch to move water effectively. We check every run for correct slope and identify low spots where water sits instead of flows." },
    { title:"Ground grading around foundation", desc:"Even perfect gutters fail if the ground slopes toward your house. We evaluate the grade around your foundation perimeter." },
    { title:"Downspout extensions and underground drainage", desc:"If your downspouts just dump water next to your foundation, that's a problem. We assess whether extensions, splash blocks, or underground drainage lines are needed." },
    { title:"Overflow and saturation zones", desc:"We identify exactly where water is overflowing, pooling, or saturating areas it shouldn't — and map out the fix." },
  ],

  goldSteps: [
    { num:"01", title:"INSPECT", desc:"We walk your entire property, examine your gutter system, trace downspout discharge paths, check ground grading, and document every drainage issue with photos." },
    { num:"02", title:"DIAGNOSE", desc:"We analyze water flow patterns, identify capacity problems, locate overflow and pooling zones, and determine root causes — not just symptoms." },
    { num:"03", title:"RECOMMEND", desc:"You receive a clear, prioritized list of fixes with transparent pricing. We tell you what's urgent, what can wait, and what the cost of doing nothing is." },
    { num:"04", title:"FIX", desc:"Our in-house crew handles everything — gutter resizing, downspout rerouting, extension installation, pitch correction, and drainage solutions." },
  ],

  faqs: [
    { q:"How much does a drainage assessment cost?", a:"Drainage assessments are a paid service. The cost depends on property size and complexity. Contact us for specific pricing. Unlike our standard gutter estimates, drainage assessments involve detailed analysis of water flow patterns, grading evaluation, and a comprehensive report with recommendations." },
    { q:"How long does a drainage assessment take?", a:"Most residential drainage assessments take 1–2 hours on-site, depending on the size of your property and the complexity of your gutter and drainage system. You'll receive your findings and recommendations within 48 hours." },
    { q:"Do I need a drainage assessment or just a gutter estimate?", a:"If you're getting new gutters installed, our standard free estimate covers basic drainage considerations like downspout placement and pitch. A dedicated drainage assessment is for homeowners with specific water management problems — pooling around the foundation, erosion, overflow issues, or recurring water damage — that need a more thorough evaluation." },
    { q:"Can you fix the drainage problems you find?", a:"Yes. We handle everything from gutter resizing and downspout rerouting to French drain installation and grading corrections. Many drainage problems are gutter problems in disguise — undersized gutters, incorrect pitch, or poorly placed downspouts." },
    { q:"What if my drainage problem isn't gutter-related?", a:"We'll tell you. If your drainage issue requires work outside our scope — like major regrading, sump pumps, or civil engineering — we'll identify the problem clearly and recommend the right type of contractor. We don't upsell you on services that won't solve your actual problem." },
  ],

  ctaTitle: "SCHEDULE YOUR DRAINAGE ASSESSMENT",
  ctaSub: "Stop guessing where the water is going. Our team will trace every drop and give you the plan to fix it.",
};

export default function DrainageAssessmentPage() {
  const [formData, setFormData] = useState({name:"",phone:"",email:"",zip:""});
  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);
  useEffect(() => { injectFonts(); }, []);
  const sec = {padding:"80px 24px",maxWidth:"1200px",margin:"0 auto"};
  const secTitle = {fontFamily:f.h,fontSize:"clamp(24px,4vw,36px)",fontWeight:800,letterSpacing:"2px",textAlign:"center",marginBottom:"8px"};

  return (
    <div style={{background:C.bg,color:C.white,fontFamily:f.b,lineHeight:1.65,minHeight:"100vh"}}>
      <SiteNav />
      <div style={{padding:"16px 24px 0",maxWidth:"1200px",margin:"0 auto"}}><div style={{fontFamily:f.b,fontSize:"13px",color:C.muted}}><a href="/" style={{color:C.muted,textDecoration:"none"}}>Home</a><span style={{margin:"0 8px",opacity:0.5}}>/</span><span style={{color:C.muted}}>Services</span><span style={{margin:"0 8px",opacity:0.5}}>/</span><span style={{color:C.accent}}>Drainage Assessment</span></div></div>

      {/* HERO */}
      <section style={{padding:"60px 24px 80px",maxWidth:"1200px",margin:"0 auto"}}>
        <div style={{maxWidth:"700px"}}>
          <Tag>{PAGE.heroTag}</Tag>
          <h1 style={{fontFamily:f.h,fontSize:"clamp(32px,5vw,48px)",fontWeight:800,lineHeight:1.1,marginBottom:"20px"}}>{PAGE.heroH1}<br/><span style={{color:C.accent}}>{PAGE.heroH1Accent}</span></h1>
          <p style={{fontFamily:f.b,fontSize:"18px",color:C.offWhite,lineHeight:1.7,marginBottom:"32px",maxWidth:"600px"}}>{PAGE.heroP}</p>
          <div style={{display:"flex",gap:"16px",flexWrap:"wrap"}}>
            <button onClick={()=>document.getElementById("quote-form")?.scrollIntoView({behavior:"smooth"})} style={{padding:"16px 36px",fontFamily:f.h,fontSize:"14px",fontWeight:700,letterSpacing:"1.5px",color:C.white,background:`linear-gradient(135deg,${C.accent},${C.accentLight})`,border:"none",borderRadius:"8px",cursor:"pointer",boxShadow:"0 4px 16px rgba(37,99,235,0.3)"}}>SCHEDULE ASSESSMENT</button>
            <a href="tel:8444443114" style={{display:"inline-flex",alignItems:"center",padding:"16px 36px",fontFamily:f.h,fontSize:"14px",fontWeight:700,letterSpacing:"1.5px",color:C.accent,border:`2px solid ${C.accent}`,borderRadius:"8px",textDecoration:"none"}}>📞 CALL (844) 444-3114</a>
          </div>
        </div>
      </section>

      {/* PROBLEM */}
      <section style={{background:C.navy,padding:"80px 24px"}}>
        <div style={{...sec,padding:0}}><div style={{textAlign:"center"}}><Tag>THE PROBLEM</Tag><h2 style={{...secTitle,color:C.white}}>WHAT HAPPENS WHEN WATER HAS NOWHERE TO GO</h2><GoldBar /></div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(250px,1fr))",gap:"24px",marginTop:"48px"}}>
            {PAGE.problems.map((p,i) => <div key={i} style={{background:C.navyFade,borderRadius:"12px",padding:"28px",borderLeft:`4px solid ${C.accent}`,border:`1px solid ${C.navyLight}`}}>
              <div style={{fontSize:"28px",marginBottom:"12px"}}>{p.icon}</div>
              <h3 style={{fontFamily:f.h,fontSize:"17px",fontWeight:700,color:C.white,marginBottom:"8px"}}>{p.title}</h3>
              <p style={{fontFamily:f.b,fontSize:"15px",color:C.muted,lineHeight:1.55}}>{p.desc}</p>
            </div>)}
          </div>
        </div>
      </section>

      {/* WHAT WE ASSESS */}
      <section style={{background:C.bg,padding:"80px 24px"}}>
        <div style={sec}><div style={{textAlign:"center"}}><Tag>WHAT WE EVALUATE</Tag><h2 style={{...secTitle,color:C.white}}>COMPREHENSIVE DRAINAGE ANALYSIS</h2><GoldBar /><p style={{fontFamily:f.b,fontSize:"17px",color:C.muted,maxWidth:"600px",margin:"0 auto 48px"}}>Six areas we evaluate to find exactly where your water management is failing.</p></div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(340px,1fr))",gap:"20px"}}>
            {PAGE.whatWeAssess.map((s,i) => <div key={i} style={{background:C.navyFade,border:`1px solid ${C.navyLight}`,borderRadius:"12px",padding:"28px",transition:"border-color 0.3s"}} onMouseOver={e=>e.currentTarget.style.borderColor=C.accent} onMouseOut={e=>e.currentTarget.style.borderColor=C.navyLight}>
              <div style={{fontFamily:f.h,fontSize:"11px",fontWeight:700,color:C.accent,letterSpacing:"2px",marginBottom:"8px"}}>0{i+1}</div>
              <h3 style={{fontFamily:f.h,fontSize:"17px",fontWeight:700,color:C.white,marginBottom:"10px"}}>{s.title}</h3>
              <p style={{fontFamily:f.b,fontSize:"15px",color:C.muted,lineHeight:1.6}}>{s.desc}</p>
            </div>)}
          </div>
        </div>
      </section>

      {/* GOLD STANDARD */}
      <section style={{background:C.navy,padding:"80px 24px"}}>
        <div style={sec}><div style={{textAlign:"center"}}><Tag>THE PROCESS</Tag><h2 style={{...secTitle,color:C.white}}>HOW WE SOLVE DRAINAGE PROBLEMS</h2><GoldBar /><p style={{fontFamily:f.b,fontSize:"17px",color:C.offWhite,fontStyle:"italic",maxWidth:"500px",margin:"0 auto 48px"}}>Inspect. Diagnose. Recommend. Fix.</p></div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(250px,1fr))",gap:"24px"}}>
            {PAGE.goldSteps.map((step,i) => <div key={i} style={{background:C.navyFade,border:`1px solid ${C.navyLight}`,borderRadius:"12px",padding:"28px",position:"relative"}}>
              <div style={{fontFamily:f.h,fontSize:"36px",fontWeight:800,color:"rgba(37,99,235,0.08)",position:"absolute",top:"16px",right:"20px"}}>{step.num}</div>
              <div style={{fontFamily:f.h,fontSize:"11px",fontWeight:700,color:C.accent,letterSpacing:"3px",marginBottom:"8px"}}>STEP {step.num}</div>
              <h3 style={{fontFamily:f.h,fontSize:"22px",fontWeight:700,color:C.white,marginBottom:"12px"}}>{step.title}</h3>
              <p style={{fontFamily:f.b,fontSize:"15px",color:C.muted,lineHeight:1.6}}>{step.desc}</p>
            </div>)}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section style={{background:C.bg,padding:"80px 24px"}}>
        <div style={{maxWidth:"800px",margin:"0 auto",textAlign:"center"}}>
          <Tag>FAQ</Tag><h2 style={{...secTitle,color:C.white}}>DRAINAGE ASSESSMENT QUESTIONS</h2><GoldBar />
          <div style={{marginTop:"40px",textAlign:"left"}}>
            {PAGE.faqs.map((faq,i) => <div key={i} style={{borderBottom:`1px solid ${C.navyLight}`}}>
              <button onClick={()=>setOpenFaq(openFaq===i?null:i)} style={{width:"100%",padding:"20px 0",background:"none",border:"none",cursor:"pointer",display:"flex",justifyContent:"space-between",alignItems:"center",gap:"16px"}}>
                <span style={{fontFamily:f.h,fontSize:"15px",fontWeight:600,color:openFaq===i?C.accent:C.white,textAlign:"left",transition:"color 0.2s"}}>{faq.q}</span>
                <span style={{fontFamily:f.h,fontSize:"20px",color:C.accent,transform:openFaq===i?"rotate(45deg)":"none",transition:"transform 0.3s",flexShrink:0}}>+</span>
              </button>
              {openFaq===i&&<div style={{padding:"0 0 20px",fontFamily:f.b,fontSize:"15px",color:C.muted,lineHeight:1.65}}>{faq.a}</div>}
            </div>)}
          </div>
        </div>
      </section>

      {/* CTA FORM */}
      <section id="quote-form" style={{background:`linear-gradient(165deg,${C.navyMid},${C.navy})`,padding:"80px 24px"}}>
        <div style={{maxWidth:"600px",margin:"0 auto",textAlign:"center"}}>
          <h2 style={{fontFamily:f.h,fontSize:"clamp(28px,5vw,40px)",fontWeight:800,color:C.white,marginBottom:"12px"}}>{PAGE.ctaTitle}</h2>
          <p style={{fontFamily:f.b,fontSize:"17px",color:C.offWhite,marginBottom:"40px"}}>{PAGE.ctaSub}</p>
          {submitted ? <div style={{background:C.successDim,border:`1px solid ${C.success}`,borderRadius:"12px",padding:"32px"}}><div style={{fontSize:"48px",marginBottom:"12px"}}>✓</div><h3 style={{fontFamily:f.h,fontSize:"20px",fontWeight:700,color:"#4ADE80"}}>Assessment Request Received!</h3><p style={{fontFamily:f.b,fontSize:"15px",color:C.muted,marginTop:"8px"}}>We'll get back to you within hours.</p></div> : <div style={{background:C.white,borderRadius:"16px",padding:"32px",boxShadow:"0 24px 80px rgba(0,0,0,0.4)",textAlign:"left"}}>
            <h3 style={{fontFamily:f.h,fontSize:"18px",fontWeight:700,color:C.navy,textAlign:"center",marginBottom:"4px"}}>Request Your Drainage Assessment</h3>
            <div style={{width:"40px",height:"3px",background:C.accent,borderRadius:"2px",margin:"10px auto 20px"}} />
            <input style={inputStyle} placeholder="Full Name" value={formData.name} onChange={e=>setFormData({...formData,name:e.target.value})} />
            <input style={inputStyle} placeholder="Phone Number" type="tel" value={formData.phone} onChange={e=>setFormData({...formData,phone:e.target.value})} />
            <input style={inputStyle} placeholder="Email Address" type="email" value={formData.email} onChange={e=>setFormData({...formData,email:e.target.value})} />
            <input style={inputStyle} placeholder="ZIP Code" value={formData.zip} onChange={e=>setFormData({...formData,zip:e.target.value})} maxLength={5} />
            <button onClick={()=>setSubmitted(true)} style={{width:"100%",padding:"16px",fontFamily:f.h,fontSize:"14px",fontWeight:700,letterSpacing:"1.5px",color:C.white,background:`linear-gradient(135deg,${C.accent},${C.accentLight})`,border:"none",borderRadius:"8px",cursor:"pointer",boxShadow:"0 4px 16px rgba(37,99,235,0.3)"}}>REQUEST MY DRAINAGE ASSESSMENT</button>
            <p style={{fontFamily:f.b,fontSize:"12px",color:"#9CA3AF",textAlign:"center",marginTop:"12px"}}>No spam. No pressure. Just honest expert advice.</p>
          </div>}
          <div style={{marginTop:"32px"}}><p style={{fontFamily:f.b,fontSize:"15px",color:C.muted,marginBottom:"8px"}}>Prefer to talk?</p><a href="tel:8444443114" style={{fontFamily:f.h,fontSize:"18px",fontWeight:700,color:C.gold,textDecoration:"none"}}>📞 (844) 444-3114</a></div>
        </div>
      </section>

      <SiteFooter />
      <MobileCTA scrollTarget="quote-form" />
      <style>{`*{box-sizing:border-box;margin:0;padding:0}::placeholder{color:#9CA3AF}input:focus{border-color:${C.accent}!important}`}</style>
    </div>
  );
}
