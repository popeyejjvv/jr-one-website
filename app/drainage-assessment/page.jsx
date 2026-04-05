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
  breadcrumb: ["Home","Services","Drainage Installation"],
  heroTag: "DRAINAGE INSTALLATION",
  heroH1: "Stop the Flooding.",
  heroH1Accent: "We Install the Fix.",
  heroP: "Florida dumps over 50 inches of rain per year on your home. When your gutters and downspouts aren't enough, you need a real drainage system. We install French drains, underground drainage lines, downspout extensions, catch basins, and channel drains — everything needed to move water away from your foundation and keep your property dry.",

  problems: [
    { icon:"🌊", title:"Foundation pooling and damage", desc:"Water collecting around your foundation causes cracks, settling, and structural damage averaging $5,000–$15,000 in repairs. A properly installed drainage system eliminates this." },
    { icon:"🏚️", title:"Yard flooding after every storm", desc:"If your yard turns into a swamp every time it rains, your property doesn't have adequate drainage. We install systems that move water underground and away from your home." },
    { icon:"🌿", title:"Landscape and hardscape erosion", desc:"Uncontrolled water flow destroys mulch beds, washes out plantings, undermines pavers and walkways, and creates permanent mud pits." },
    { icon:"🦟", title:"Standing water breeds pests", desc:"Pooling water that won't drain creates mosquito breeding grounds and attracts pests year-round. Proper drainage eliminates standing water entirely." },
  ],

  whatWeInstall: [
    { title:"French Drains", desc:"Perforated pipe installed in a gravel-filled trench that collects subsurface water and redirects it away from your foundation. The most effective solution for persistent yard flooding and foundation pooling." },
    { title:"Underground Drainage Lines", desc:"Solid PVC pipe installed underground to carry water from your downspouts to a discharge point far from your home. Eliminates surface water entirely — everything flows underground." },
    { title:"Downspout Extensions & Rerouting", desc:"When your downspouts dump water too close to your foundation, we extend and reroute them — above ground or underground — to discharge at a safe distance." },
    { title:"Catch Basins & Grates", desc:"Surface-level collection points that capture standing water from low spots in your yard and feed it into the underground drainage system." },
    { title:"Channel Drains", desc:"Linear drains installed across driveways, patios, and walkways to intercept surface water before it reaches your home. Essential for sloped driveways and patio areas." },
    { title:"Pop-Up Emitters", desc:"Discharge points that open when water flows through the system and close when dry. Installed at the end of underground lines to release water away from your home without visible pipes in the yard." },
  ],

  goldSteps: [
    { num:"01", title:"EVALUATE", desc:"We inspect your property, identify where water is pooling and why, trace existing downspout paths, check grading, and determine exactly what drainage system your property needs." },
    { num:"02", title:"DESIGN", desc:"Custom drainage plan with pipe routing, catch basin placement, discharge points, and integration with your existing gutter system. You see the plan and pricing before any digging starts." },
    { num:"03", title:"INSTALL", desc:"Our in-house crew handles all trenching, pipe installation, catch basin placement, backfill, and landscape restoration. Most residential drainage installs are completed in 1–2 days." },
    { num:"04", title:"VERIFY", desc:"We test the entire system with water flow to confirm proper drainage. You see it working before we leave. Backed by our craftsmanship warranty." },
  ],

  faqs: [
    { q:"How much does drainage installation cost?", a:"Drainage installation costs vary based on the type of system, property size, trenching requirements, and complexity. Contact us for a free on-site evaluation and detailed estimate. We provide transparent line-item pricing before any work begins." },
    { q:"How long does installation take?", a:"Most residential drainage installations take 1–2 days. Larger properties or complex systems with multiple French drains and catch basins may take 2–3 days. We give you a specific timeline before work begins." },
    { q:"Do you install French drains?", a:"Yes. French drains are one of our most commonly installed drainage solutions. We install them along foundations, across yards, and alongside driveways to collect and redirect subsurface water." },
    { q:"Will you tear up my yard?", a:"We trench where needed and restore the surface afterward — including re-grading, re-sodding, or replacing mulch. We minimize disruption and clean up completely. Your yard will look better than before because the drainage problems will be solved." },
    { q:"Can you connect drainage to my existing gutter system?", a:"Yes — that's one of our specialties. We integrate underground drainage lines with your existing downspouts so roof water is captured and routed away from your foundation entirely. This is often the most impactful upgrade we do." },
    { q:"What if I also need new gutters?", a:"We bundle gutter installation with drainage work regularly. Installing both at the same time is more cost-effective and ensures the entire water management system works together from roof to discharge point." },
  ],

  ctaTitle: "GET YOUR DRAINAGE SYSTEM INSTALLED",
  ctaSub: "Stop fighting the water. We'll design and install the drainage system your property needs — and you'll see the difference after the next rain.",
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
      <div style={{padding:"16px 24px 0",maxWidth:"1200px",margin:"0 auto"}}><div style={{fontFamily:f.b,fontSize:"13px",color:C.muted}}><a href="/" style={{color:C.muted,textDecoration:"none"}}>Home</a><span style={{margin:"0 8px",opacity:0.5}}>/</span><span style={{color:C.muted}}>Services</span><span style={{margin:"0 8px",opacity:0.5}}>/</span><span style={{color:C.accent}}>Drainage Installation</span></div></div>

      {/* HERO */}
      <section className="hero-stars" style={{padding:"60px 24px 80px",maxWidth:"1200px",margin:"0 auto"}}>
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
        <div style={sec}><div style={{textAlign:"center"}}><Tag>WHAT WE INSTALL</Tag><h2 style={{...secTitle,color:C.white}}>COMPLETE DRAINAGE SOLUTIONS</h2><GoldBar /><p style={{fontFamily:f.b,fontSize:"17px",color:C.muted,maxWidth:"600px",margin:"0 auto 48px"}}>Six drainage systems we install to solve your water problems permanently.</p></div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(340px,1fr))",gap:"20px"}}>
            {PAGE.whatWeInstall.map((s,i) => <div key={i} style={{background:C.navyFade,border:`1px solid ${C.navyLight}`,borderRadius:"12px",padding:"28px",transition:"border-color 0.3s"}} onMouseOver={e=>e.currentTarget.style.borderColor=C.accent} onMouseOut={e=>e.currentTarget.style.borderColor=C.navyLight}>
              <div style={{fontFamily:f.h,fontSize:"11px",fontWeight:700,color:C.accent,letterSpacing:"2px",marginBottom:"8px"}}>0{i+1}</div>
              <h3 style={{fontFamily:f.h,fontSize:"17px",fontWeight:700,color:C.white,marginBottom:"10px"}}>{s.title}</h3>
              <p style={{fontFamily:f.b,fontSize:"15px",color:C.muted,lineHeight:1.6}}>{s.desc}</p>
            </div>)}
          </div>
        </div>
      </section>

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
          <Tag>FAQ</Tag><h2 style={{...secTitle,color:C.white}}>DRAINAGE INSTALLATION QUESTIONS</h2><GoldBar />
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
          {submitted ? <div style={{background:C.successDim,border:`1px solid ${C.success}`,borderRadius:"12px",padding:"32px"}}><div style={{fontSize:"48px",marginBottom:"12px"}}>✓</div><h3 style={{fontFamily:f.h,fontSize:"20px",fontWeight:700,color:"#4ADE80"}}>Estimate Request Received!</h3><p style={{fontFamily:f.b,fontSize:"15px",color:C.muted,marginTop:"8px"}}>We'll get back to you within hours.</p></div> : <div style={{background:C.white,borderRadius:"16px",padding:"32px",boxShadow:"0 24px 80px rgba(0,0,0,0.4)",textAlign:"left"}}>
            <h3 style={{fontFamily:f.h,fontSize:"18px",fontWeight:700,color:C.navy,textAlign:"center",marginBottom:"4px"}}>Request Your Drainage Estimate</h3>
            <div style={{width:"40px",height:"3px",background:C.accent,borderRadius:"2px",margin:"10px auto 20px"}} />
            <input style={inputStyle} placeholder="Full Name" value={formData.name} onChange={e=>setFormData({...formData,name:e.target.value})} />
            <input style={inputStyle} placeholder="Phone Number" type="tel" value={formData.phone} onChange={e=>setFormData({...formData,phone:e.target.value})} />
            <input style={inputStyle} placeholder="Email Address" type="email" value={formData.email} onChange={e=>setFormData({...formData,email:e.target.value})} />
            <input style={inputStyle} placeholder="ZIP Code" value={formData.zip} onChange={e=>setFormData({...formData,zip:e.target.value})} maxLength={5} />
            <button onClick={()=>setSubmitted(true)} style={{width:"100%",padding:"16px",fontFamily:f.h,fontSize:"14px",fontWeight:700,letterSpacing:"1.5px",color:C.white,background:`linear-gradient(135deg,${C.accent},${C.accentLight})`,border:"none",borderRadius:"8px",cursor:"pointer",boxShadow:"0 4px 16px rgba(37,99,235,0.3)"}}>REQUEST MY DRAINAGE ESTIMATE</button>
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
