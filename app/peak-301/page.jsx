"use client";

import { useState, useEffect } from "react";
import SiteNav from "../../components/SiteNav";
import SiteFooter from "../../components/SiteFooter";
import MobileCTA from "../../components/MobileCTA";

const injectFonts = () => { if (typeof document==="undefined"||document.querySelector("#jr-fonts")) return; const l=document.createElement("link"); l.id="jr-fonts"; l.rel="stylesheet"; l.href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800&family=Source+Sans+3:wght@300;400;600&display=swap"; document.head.appendChild(l); };
const C = { bg:"#0B1628",navy:"#1B2A4A",navyMid:"#243556",navyLight:"#2C3E5A",navyFade:"#162033",gold:"#C8952E",goldLight:"#D4A843",goldPale:"rgba(200,149,46,0.12)",cream:"#F5F3EF",white:"#FFFFFF",offWhite:"#E8E4DC",muted:"#7A8FA8",charcoal:"#2D2D2D",success:"#2D8B4E",successDim:"rgba(45,139,78,0.15)",alert:"#B11A21",alertDim:"rgba(177,26,33,0.12)",accent:"#B11A21",accentLight:"#D42A2A",accentPale:"rgba(177,26,33,0.12)" };
const f = { h:"'Montserrat', sans-serif", b:"'Source Sans 3', sans-serif" };
const Tag = ({children}) => <div style={{display:"inline-block",padding:"6px 16px",background:C.accentPale,borderRadius:"4px",marginBottom:"12px"}}><span style={{fontFamily:f.h,fontSize:"12px",fontWeight:700,color:C.accent,letterSpacing:"3px"}}>{children}</span></div>;
const AlertTag = ({children}) => <div style={{display:"inline-block",padding:"6px 16px",background:C.alertDim,borderRadius:"4px",marginBottom:"12px"}}><span style={{fontFamily:f.h,fontSize:"12px",fontWeight:700,color:C.alert,letterSpacing:"3px"}}>{children}</span></div>;
const GoldBar = () => <div style={{width:"60px",height:"3px",background:`linear-gradient(90deg,${C.accent},${C.accentLight})`,borderRadius:"2px",margin:"16px auto"}} />;
const Stars = () => <span style={{color:C.accent,fontSize:"14px",letterSpacing:"2px"}}>★★★★★</span>;
const inputStyle = {width:"100%",padding:"13px 16px",fontFamily:f.b,fontSize:"15px",border:"1.5px solid #D1D5DB",borderRadius:"8px",outline:"none",color:C.charcoal,marginBottom:"12px",background:"#FAFAFA",boxSizing:"border-box"};

const PAGE = {
  breadcrumb: ["Home","Services","Peak 301 Roof Rejuvenation"],
  heroTag: "ROOF REJUVENATION",
  heroH1: "Your Roof Has Years Left.",
  heroH1Gold: "Peak 301 Proves It.",
  heroP: "Peak 301 is an all-natural, soy-based sealant that penetrates your shingles and restores them from the inside out — adding 6 to 10 years of life to your existing roof at a fraction of replacement cost. Plus, it comes with warranty documentation your insurance company needs to see.",

  insuranceAlert: {
    title: "⚠️ IS YOUR INSURANCE AT RISK?",
    stat1: "280%",
    stat1Label: "increase in Florida homeowner policy non-renewals since 2018",
    stat2: "15 Years",
    stat2Label: "— the roof age at which most Florida insurers start dropping coverage",
    desc: "Florida insurance companies are canceling homeowner policies at record rates based on roof age alone — even if your roof isn't leaking. If your roof is 15+ years old, you may already be on borrowed time. Peak 301 helps your roof meet the 5-year useful life threshold insurers require to maintain your coverage.",
  },

  problems: [
    { icon:"📋", title:"Insurance non-renewal notices", desc:"Florida insurers are dropping homeowners with roofs over 15 years old — regardless of condition. A non-renewal letter means scrambling for expensive surplus coverage or facing a gap in protection." },
    { icon:"💰", title:"Full replacement costs $15K–$25K+", desc:"A new roof is one of the most expensive home repairs. Many homeowners can't afford it on short notice — and shouldn't have to if their existing roof still has structural life left." },
    { icon:"🔄", title:"Shingle deterioration from inside", desc:"Florida's UV exposure and heat cycles dry out the oils in your shingles over time. They become brittle, crack, curl, and lose granules — not because they're worn out, but because they're dried out." },
    { icon:"🌪️", title:"Storm vulnerability increases with age", desc:"Dried, brittle shingles are far more likely to lift, crack, or fly off during hurricane-force winds. Restored flexibility means better storm performance." },
  ],

  solutions: [
    { title:"Soy-based sealant — not a coating", desc:"Peak 301 is not a paint, spray, or surface coating. It's a soy-based sealant that penetrates into your shingle material and restores the oils that UV and heat have depleted. It rejuvenates from the inside out, restoring flexibility and waterproofing at the molecular level." },
    { title:"Adds 6–10 years of roof life", desc:"By restoring the oils that keep shingles pliable and water-resistant, Peak 301 extends your roof's functional lifespan by 6 to 10 years. That's 6 to 10 more years before you need to think about the $15K–$25K+ replacement conversation." },
    { title:"Under 15% of replacement cost", desc:"A full roof replacement runs $15,000–$25,000+ in Tampa. Peak 301 treatment costs a fraction of that — giving you years of additional protection at a price point that makes financial sense." },
    { title:"Warranty documentation for insurers", desc:"Peak 301 comes with official warranty documentation that demonstrates your roof has been professionally treated and has verified useful life remaining. This is exactly the documentation Florida insurers need to see when evaluating your policy." },
    { title:"All-natural and eco-friendly", desc:"The soy-based formula is non-toxic, biodegradable, and safe for your landscaping, pets, and family. No harsh chemicals, no toxic fumes, no environmental concerns." },
    { title:"Applied by our trained crew", desc:"Like everything we do, Peak 301 application is performed by our own trained team — not subcontracted. We inspect your roof's condition, apply the sealant properly, and document the treatment for your records." },
  ],

  stats: [
    { value:"6–10", label:"Years added to roof life" },
    { value:"<15%", label:"Cost vs. full replacement" },
    { value:"280%", label:"FL insurance non-renewal increase" },
    { value:"100%", label:"Natural soy-based formula" },
  ],

  goldSteps: [
    { num:"01", title:"ASSESS", desc:"We inspect your roof's current condition, age, and shingle type to determine if Peak 301 is the right solution. Not every roof is a candidate — we'll be honest if yours isn't." },
    { num:"02", title:"DESIGN", desc:"Treatment plan based on your roof's specific needs, transparent pricing, and a clear explanation of what to expect — including the warranty documentation you'll receive." },
    { num:"03", title:"INSTALL", desc:"Our crew applies the Peak 301 sealant across your entire roof surface. The soy-based formula penetrates and begins restoring your shingles from the inside immediately." },
    { num:"04", title:"PROTECT", desc:"You receive official warranty documentation showing your roof has been professionally treated. This is the documentation you provide to your insurance company to demonstrate roof viability." },
  ],

  faqs: [
    { q:"What exactly is Peak 301?", a:"Peak 301 is an all-natural, soy-based roof rejuvenation sealant. It penetrates into your shingle material and restores the oils that UV exposure and heat have depleted over time. It is not a coating, paint, or spray — it works from the inside of the shingle out, restoring flexibility, waterproofing, and structural integrity." },
    { q:"How much does Peak 301 treatment cost?", a:"Peak 301 treatment costs under 15% of what a full roof replacement would cost. For most Tampa homes, that means thousands of dollars instead of $15,000–$25,000+. We provide exact pricing after inspecting your specific roof." },
    { q:"Will Peak 301 help me keep my homeowner's insurance?", a:"That's one of its biggest benefits. Florida insurers are increasingly dropping coverage on roofs over 15 years old. Peak 301 treatment comes with warranty documentation that demonstrates your roof has been professionally rejuvenated and has verified useful life remaining — typically meeting the 5-year threshold insurers require." },
    { q:"How long does the treatment last?", a:"Peak 301 adds 6 to 10 years of life to your existing roof. The exact duration depends on your roof's current condition, age, and shingle type — which we assess before recommending treatment." },
    { q:"Is my roof a good candidate for Peak 301?", a:"Most asphalt shingle roofs between 8 and 20 years old are good candidates. Roofs with significant structural damage, missing shingles, or active leaks may need repairs first or may be beyond rejuvenation. We inspect your roof honestly and tell you whether Peak 301 makes sense or whether replacement is the better path." },
    { q:"Is the sealant safe for my home and landscaping?", a:"Yes. Peak 301 is an all-natural soy-based formula. It's non-toxic, biodegradable, and completely safe for your landscaping, pets, and family. No harsh chemicals or toxic fumes." },
    { q:"How long does the application take?", a:"Most residential Peak 301 applications are completed in a single day. The sealant begins penetrating and working immediately after application." },
    { q:"Can I see proof that Peak 301 works?", a:"Yes. We can show you documentation on the sealant's testing, performance data, and warranty terms. We can also connect you with homeowners in Tampa who have had the treatment and kept their insurance coverage as a result." },
  ],

  ctaTitle: "DON'T REPLACE YOUR ROOF UNTIL YOU CALL US",
  ctaSub: "Peak 301 could save you $15,000+ and keep your insurance intact. Get a free roof assessment to find out if your roof is a candidate for rejuvenation instead of replacement.",
};

export default function Peak301Page() {
  const [formData, setFormData] = useState({name:"",phone:"",email:"",zip:""});
  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);
  useEffect(() => { injectFonts(); }, []);
  const sec = {padding:"80px 24px",maxWidth:"1200px",margin:"0 auto"};
  const secTitle = {fontFamily:f.h,fontSize:"clamp(24px,4vw,36px)",fontWeight:800,letterSpacing:"2px",textAlign:"center",marginBottom:"8px"};

  return (
    <div style={{background:C.bg,color:C.white,fontFamily:f.b,lineHeight:1.65,minHeight:"100vh"}}>
      <SiteNav promoBanner="⚠️ Florida Roof Insurance Under Threat — Peak 301 Can Help — Call (844) 444-3114" />
      <div style={{padding:"16px 24px 0",maxWidth:"1200px",margin:"0 auto"}}><div style={{fontFamily:f.b,fontSize:"13px",color:C.muted}}>{PAGE.breadcrumb.map((item,i) => <span key={i}>{i>0&&<span style={{margin:"0 8px",opacity:0.5}}>/</span>}<span style={{color:i===PAGE.breadcrumb.length-1?C.accent:C.muted}}>{item}</span></span>)}</div></div>

      {/* HERO */}
      <section style={{padding:"60px 24px 80px",maxWidth:"1200px",margin:"0 auto",display:"flex",gap:"48px",alignItems:"center",flexWrap:"wrap"}}>
        <div style={{flex:"1 1 500px",minWidth:"300px"}}>
          <Tag>{PAGE.heroTag}</Tag>
          <h1 style={{fontFamily:f.h,fontSize:"clamp(32px,5vw,48px)",fontWeight:800,lineHeight:1.1,marginBottom:"20px"}}>{PAGE.heroH1}<br/><span style={{color:C.accent}}>{PAGE.heroH1Gold}</span></h1>
          <p style={{fontFamily:f.b,fontSize:"18px",color:C.offWhite,lineHeight:1.7,marginBottom:"32px",maxWidth:"560px"}}>{PAGE.heroP}</p>
          <div style={{display:"flex",gap:"16px",flexWrap:"wrap"}}>
            <button onClick={()=>document.getElementById("quote-form")?.scrollIntoView({behavior:"smooth"})} style={{padding:"16px 36px",fontFamily:f.h,fontSize:"14px",fontWeight:700,letterSpacing:"1.5px",color:C.white,background:`linear-gradient(135deg,${C.accent},${C.accentLight})`,border:"none",borderRadius:"8px",cursor:"pointer",boxShadow:"0 4px 16px rgba(177,26,33,0.3)"}}>GET YOUR FREE ROOF ASSESSMENT</button>
            <a href="tel:8444443114" style={{display:"inline-flex",alignItems:"center",padding:"16px 36px",fontFamily:f.h,fontSize:"14px",fontWeight:700,letterSpacing:"1.5px",color:C.gold,border:`2px solid ${C.gold}`,borderRadius:"8px",textDecoration:"none"}}>📞 CALL (844) 444-3114</a>
          </div>
          <div style={{display:"flex",gap:"24px",marginTop:"32px",flexWrap:"wrap"}}>{PAGE.stats.map((s,i) => <div key={i} style={{textAlign:"center"}}><div style={{fontFamily:f.h,fontSize:"28px",fontWeight:800,color:C.accent}}>{s.value}</div><div style={{fontFamily:f.b,fontSize:"12px",color:C.muted,maxWidth:"120px"}}>{s.label}</div></div>)}</div>
        </div>
      </section>

      {/* INSURANCE ALERT */}
      <section style={{background:`linear-gradient(135deg, #1a0a0a, ${C.navy})`,padding:"60px 24px",borderTop:`2px solid ${C.alert}`,borderBottom:`2px solid ${C.alert}`}}>
        <div style={{maxWidth:"900px",margin:"0 auto",textAlign:"center"}}>
          <AlertTag>{PAGE.insuranceAlert.title}</AlertTag>
          <div style={{display:"flex",justifyContent:"center",gap:"48px",flexWrap:"wrap",margin:"32px 0"}}>
            <div style={{textAlign:"center"}}>
              <div style={{fontFamily:f.h,fontSize:"48px",fontWeight:800,color:C.alert}}>{PAGE.insuranceAlert.stat1}</div>
              <div style={{fontFamily:f.b,fontSize:"14px",color:C.muted,maxWidth:"200px"}}>{PAGE.insuranceAlert.stat1Label}</div>
            </div>
            <div style={{textAlign:"center"}}>
              <div style={{fontFamily:f.h,fontSize:"48px",fontWeight:800,color:C.alert}}>{PAGE.insuranceAlert.stat2}</div>
              <div style={{fontFamily:f.b,fontSize:"14px",color:C.muted,maxWidth:"200px"}}>{PAGE.insuranceAlert.stat2Label}</div>
            </div>
          </div>
          <p style={{fontFamily:f.b,fontSize:"17px",color:C.offWhite,lineHeight:1.7,maxWidth:"700px",margin:"0 auto 32px"}}>{PAGE.insuranceAlert.desc}</p>
          <a href="/insurance-resource-center" style={{display:"inline-flex",alignItems:"center",gap:"10px",padding:"16px 32px",fontFamily:f.h,fontSize:"14px",fontWeight:700,letterSpacing:"1px",color:C.white,background:`linear-gradient(135deg,${C.alert},#D42A2A)`,borderRadius:"8px",textDecoration:"none",boxShadow:"0 4px 16px rgba(177,26,33,0.4)"}}>⚖️ INSURANCE RESOURCE CENTER — KNOW YOUR RIGHTS →</a>
          <p style={{fontFamily:f.b,fontSize:"13px",color:C.muted,marginTop:"16px"}}>Florida law protects homeowners from losing insurance solely due to roof age. Learn the laws, the carrier types, and get free document templates.</p>
        </div>
      </section>

      {/* PROBLEM */}
      <section style={{background:C.navy,padding:"80px 24px"}}><div style={{maxWidth:"1200px",margin:"0 auto",textAlign:"center"}}><Tag>THE PROBLEM</Tag><h2 style={{...secTitle,color:C.white}}>WHY TAMPA HOMEOWNERS ARE LOSING COVERAGE</h2><GoldBar /><div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(250px,1fr))",gap:"24px",marginTop:"48px",textAlign:"left"}}>{PAGE.problems.map((p,i) => <div key={i} style={{background:C.navyFade,border:`1px solid ${C.navyLight}`,borderRadius:"12px",padding:"28px",borderLeft:`4px solid ${C.accent}`}}><div style={{fontSize:"28px",marginBottom:"12px"}}>{p.icon}</div><h3 style={{fontFamily:f.h,fontSize:"17px",fontWeight:700,color:C.white,marginBottom:"8px"}}>{p.title}</h3><p style={{fontFamily:f.b,fontSize:"15px",color:C.muted,lineHeight:1.55}}>{p.desc}</p></div>)}</div></div></section>

      {/* SOLUTION */}
      <section style={{background:C.bg,padding:"80px 24px"}}><div style={sec}><div style={{textAlign:"center"}}><Tag>THE SOLUTION</Tag><h2 style={{...secTitle,color:C.white}}>HOW PEAK 301 SAVES YOUR ROOF — AND YOUR INSURANCE</h2><GoldBar /><p style={{fontFamily:f.b,fontSize:"17px",color:C.muted,maxWidth:"650px",margin:"0 auto 48px"}}>A soy-based sealant that restores your shingles from the inside out. Not a coating. Not a paint. A genuine rejuvenation treatment.</p></div><div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(340px,1fr))",gap:"20px"}}>{PAGE.solutions.map((s,i) => <div key={i} style={{background:C.navyFade,border:`1px solid ${C.navyLight}`,borderRadius:"12px",padding:"28px",transition:"border-color 0.3s"}} onMouseOver={e=>e.currentTarget.style.borderColor=C.accent} onMouseOut={e=>e.currentTarget.style.borderColor=C.navyLight}><div style={{fontFamily:f.h,fontSize:"11px",fontWeight:700,color:C.accent,letterSpacing:"2px",marginBottom:"8px"}}>0{i+1}</div><h3 style={{fontFamily:f.h,fontSize:"17px",fontWeight:700,color:C.white,marginBottom:"10px"}}>{s.title}</h3><p style={{fontFamily:f.b,fontSize:"15px",color:C.muted,lineHeight:1.6}}>{s.desc}</p></div>)}</div></div></section>

      {/* COST COMPARISON */}
      <section style={{background:C.navy,padding:"80px 24px"}}>
        <div style={{maxWidth:"800px",margin:"0 auto",textAlign:"center"}}>
          <Tag>THE MATH</Tag>
          <h2 style={{...secTitle,color:C.white}}>REJUVENATION VS. REPLACEMENT</h2>
          <GoldBar />
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"24px",marginTop:"48px"}}>
            <div style={{background:C.alertDim,border:`1px solid ${C.alert}`,borderRadius:"12px",padding:"28px",textAlign:"center"}}>
              <div style={{fontFamily:f.h,fontSize:"13px",fontWeight:700,color:C.alert,letterSpacing:"2px",marginBottom:"12px"}}>FULL REPLACEMENT</div>
              <div style={{fontFamily:f.h,fontSize:"36px",fontWeight:800,color:C.white}}>$15K–$25K+</div>
              <div style={{fontFamily:f.b,fontSize:"14px",color:C.muted,marginTop:"8px"}}>Major disruption, weeks of scheduling, significant financial stress</div>
            </div>
            <div style={{background:C.accentPale,border:`1px solid ${C.accent}`,borderRadius:"12px",padding:"28px",textAlign:"center"}}>
              <div style={{fontFamily:f.h,fontSize:"13px",fontWeight:700,color:C.accent,letterSpacing:"2px",marginBottom:"12px"}}>PEAK 301 TREATMENT</div>
              <div style={{fontFamily:f.h,fontSize:"36px",fontWeight:800,color:C.accent}}>Under 15%</div>
              <div style={{fontFamily:f.b,fontSize:"14px",color:C.muted,marginTop:"8px"}}>of replacement cost. One day. Warranty documentation included.</div>
            </div>
          </div>
          <p style={{fontFamily:f.b,fontSize:"15px",color:C.muted,marginTop:"24px",fontStyle:"italic"}}>Why spend $20,000 on a new roof when your existing roof can be restored for a fraction of that?</p>
        </div>
      </section>

      {/* GOLD STANDARD */}
      <section style={{background:C.bg,padding:"80px 24px"}}><div style={sec}><div style={{textAlign:"center"}}><Tag>THE GOLD STANDARD</Tag><h2 style={{...secTitle,color:C.white}}>OUR PEAK 301 PROCESS</h2><GoldBar /><p style={{fontFamily:f.b,fontSize:"17px",color:C.offWhite,fontStyle:"italic",maxWidth:"500px",margin:"0 auto 48px"}}>Every home. Every time. No exceptions.</p></div><div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(250px,1fr))",gap:"24px"}}>{PAGE.goldSteps.map((step,i) => <div key={i} style={{background:C.navyFade,border:`1px solid ${C.navyLight}`,borderRadius:"12px",padding:"28px",position:"relative"}}><div style={{fontFamily:f.h,fontSize:"36px",fontWeight:800,color:"rgba(177,26,33,0.08)",position:"absolute",top:"16px",right:"20px"}}>{step.num}</div><div style={{fontFamily:f.h,fontSize:"11px",fontWeight:700,color:C.accent,letterSpacing:"3px",marginBottom:"8px"}}>STEP {step.num}</div><h3 style={{fontFamily:f.h,fontSize:"22px",fontWeight:700,color:C.white,marginBottom:"12px"}}>{step.title}</h3><p style={{fontFamily:f.b,fontSize:"15px",color:C.muted,lineHeight:1.6}}>{step.desc}</p></div>)}</div></div></section>

      {/* FAQ */}
      <section style={{background:C.navy,padding:"80px 24px"}}><div style={{maxWidth:"800px",margin:"0 auto",textAlign:"center"}}><Tag>FAQ</Tag><h2 style={{...secTitle,color:C.white}}>PEAK 301 QUESTIONS</h2><GoldBar /><div style={{marginTop:"40px",textAlign:"left"}}>{PAGE.faqs.map((faq,i) => <div key={i} style={{borderBottom:`1px solid ${C.navyLight}`}}><button onClick={()=>setOpenFaq(openFaq===i?null:i)} style={{width:"100%",padding:"20px 0",background:"none",border:"none",cursor:"pointer",display:"flex",justifyContent:"space-between",alignItems:"center",gap:"16px"}}><span style={{fontFamily:f.h,fontSize:"15px",fontWeight:600,color:openFaq===i?C.accent:C.white,textAlign:"left",transition:"color 0.2s"}}>{faq.q}</span><span style={{fontFamily:f.h,fontSize:"20px",color:C.accent,transform:openFaq===i?"rotate(45deg)":"none",transition:"transform 0.3s",flexShrink:0}}>+</span></button>{openFaq===i&&<div style={{padding:"0 0 20px",fontFamily:f.b,fontSize:"15px",color:C.muted,lineHeight:1.65}}>{faq.a}</div>}</div>)}</div></div></section>

      {/* CTA FORM */}
      <section id="quote-form" style={{background:`linear-gradient(165deg,${C.navyMid},${C.navy})`,padding:"80px 24px"}}><div style={{maxWidth:"600px",margin:"0 auto",textAlign:"center"}}>
        <h2 style={{fontFamily:f.h,fontSize:"clamp(28px,5vw,40px)",fontWeight:800,color:C.white,marginBottom:"12px"}}>{PAGE.ctaTitle}</h2>
        <p style={{fontFamily:f.b,fontSize:"17px",color:C.offWhite,marginBottom:"40px"}}>{PAGE.ctaSub}</p>
        {submitted ? <div style={{background:C.successDim,border:`1px solid ${C.success}`,borderRadius:"12px",padding:"32px"}}><div style={{fontSize:"48px",marginBottom:"12px"}}>✓</div><h3 style={{fontFamily:f.h,fontSize:"20px",fontWeight:700,color:"#4ADE80"}}>Assessment Request Received!</h3><p style={{fontFamily:f.b,fontSize:"15px",color:C.muted,marginTop:"8px"}}>We'll get back to you within hours to schedule your roof inspection.</p></div> : <div style={{background:C.white,borderRadius:"16px",padding:"32px",boxShadow:"0 24px 80px rgba(0,0,0,0.4)",textAlign:"left"}}>
          <h3 style={{fontFamily:f.h,fontSize:"18px",fontWeight:700,color:C.navy,textAlign:"center",marginBottom:"4px"}}>Get Your Free Roof Assessment</h3>
          <div style={{width:"40px",height:"3px",background:C.accent,borderRadius:"2px",margin:"10px auto 20px"}} />
          <input style={inputStyle} placeholder="Full Name" value={formData.name} onChange={e=>setFormData({...formData,name:e.target.value})} />
          <input style={inputStyle} placeholder="Phone Number" type="tel" value={formData.phone} onChange={e=>setFormData({...formData,phone:e.target.value})} />
          <input style={inputStyle} placeholder="Email Address" type="email" value={formData.email} onChange={e=>setFormData({...formData,email:e.target.value})} />
          <input style={inputStyle} placeholder="ZIP Code" value={formData.zip} onChange={e=>setFormData({...formData,zip:e.target.value})} maxLength={5} />
          <button onClick={()=>setSubmitted(true)} style={{width:"100%",padding:"16px",fontFamily:f.h,fontSize:"14px",fontWeight:700,letterSpacing:"1.5px",color:C.white,background:`linear-gradient(135deg,${C.accent},${C.accentLight})`,border:"none",borderRadius:"8px",cursor:"pointer",boxShadow:"0 4px 16px rgba(177,26,33,0.3)"}}>REQUEST MY FREE ROOF ASSESSMENT</button>
          <p style={{fontFamily:f.b,fontSize:"12px",color:"#9CA3AF",textAlign:"center",marginTop:"12px"}}>No spam. No pressure. Honest assessment of whether Peak 301 is right for your roof.</p>
        </div>}
        <div style={{marginTop:"32px"}}><a href="tel:8444443114" style={{fontFamily:f.h,fontSize:"18px",fontWeight:700,color:C.gold,textDecoration:"none"}}>📞 (844) 444-3114</a></div>
      </div></section>

      <SiteFooter />
      <MobileCTA />
      <style>{`*{box-sizing:border-box;margin:0;padding:0}::placeholder{color:#9CA3AF}input:focus{border-color:${C.accent}!important}`}</style>
    </div>
  );
}
