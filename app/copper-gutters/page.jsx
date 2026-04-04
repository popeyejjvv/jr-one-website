"use client";

import { useState, useEffect } from "react";
import SiteNav from "../../components/SiteNav";
import SiteFooter from "../../components/SiteFooter";
import MobileCTA from "../../components/MobileCTA";

const injectFonts = () => { if (typeof document==="undefined"||document.querySelector("#jr-fonts")) return; const l=document.createElement("link"); l.id="jr-fonts"; l.rel="stylesheet"; l.href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800&family=Source+Sans+3:wght@300;400;600&display=swap"; document.head.appendChild(l); };
const C = { bg:"#0B1628",navy:"#1B2A4A",navyMid:"#243556",navyLight:"#2C3E5A",navyFade:"#162033",gold:"#C8952E",goldLight:"#D4A843",goldPale:"rgba(200,149,46,0.12)",cream:"#F5F3EF",white:"#FFFFFF",offWhite:"#E8E4DC",muted:"#7A8FA8",charcoal:"#2D2D2D",copper:"#B87333",copperLight:"#D4956B",copperPale:"rgba(184,115,51,0.12)" };
const f = { h:"'Montserrat', sans-serif", b:"'Source Sans 3', sans-serif" };
const Tag = ({children}) => <div style={{display:"inline-block",padding:"6px 16px",background:C.copperPale,borderRadius:"4px",marginBottom:"12px"}}><span style={{fontFamily:f.h,fontSize:"12px",fontWeight:700,color:C.copper,letterSpacing:"3px"}}>{children}</span></div>;
const GoldBar = () => <div style={{width:"60px",height:"3px",background:`linear-gradient(90deg,${C.copper},${C.copperLight})`,borderRadius:"2px",margin:"16px auto"}} />;
const Stars = () => <span style={{color:C.gold,fontSize:"14px",letterSpacing:"2px"}}>★★★★★</span>;
const inputStyle = {width:"100%",padding:"13px 16px",fontFamily:f.b,fontSize:"15px",border:"1.5px solid #D1D5DB",borderRadius:"8px",outline:"none",color:C.charcoal,marginBottom:"12px",background:"#FAFAFA",boxSizing:"border-box"};

const PAGE = {
  breadcrumb: ["Home","Services","Copper Gutters"],
  heroTag: "PREMIUM COPPER GUTTER SYSTEMS",
  heroH1: "The Last Gutter System",
  heroH1Gold: "Your Home Will Ever Need.",
  heroP: "Copper gutters are the pinnacle of residential gutter systems — a lifetime investment that gets more beautiful with age. Custom-fabricated half-round and K-style copper systems with matching copper downspouts, leader heads, and rain chains. Installed by our specialized crew.",

  solutions: [
    { title:"6\" copper half-round gutters", desc:"Our signature copper offering. Half-round profiles create a classic, elegant look that complements historic homes, Mediterranean architecture, and high-end new construction. Custom-fabricated with a precision hanger system for lasting durability." },
    { title:"Full copper downspout systems", desc:"Matching 3x4 and 4-inch round copper downspouts with soldered or sealed connections. Copper straps and brackets maintain the premium look from roofline to ground level. Available in 4x5 oversized for high-volume applications." },
    { title:"Copper gutter guards", desc:"6\" and 7\" copper leaf guards that protect your investment while maintaining the seamless copper aesthetic. No mismatched aluminum guards on a copper system — everything matches." },
    { title:"Leader heads and rain chains", desc:"Decorative copper leader heads at downspout transitions and copper rain chains as alternatives to traditional downspouts. These custom touches elevate the entire exterior." },
    { title:"50+ year lifespan — realistically forever", desc:"Copper doesn't rust. It doesn't corrode. It doesn't degrade in salt air, UV, or humidity. Over time, it develops a natural green patina that actually protects the underlying material. Many copper gutter systems outlast the homes they're installed on." },
    { title:"The patina effect", desc:"New copper starts with a brilliant warm tone and gradually develops a distinguished green patina over years of exposure. This natural aging process is considered one of copper's most desirable features — it's why historic buildings, churches, and monuments use copper." },
  ],

  stats: [
    { value:"50+", label:"Year lifespan (often 100+)" },
    { value:"$0", label:"Corrosion — ever" },
    { value:"6\"–8\"", label:"Half-round sizes available" },
    { value:"100%", label:"Handcrafted installation" },
  ],

  comparison: [
    { feature:"Lifespan in Florida", aluminum:"20-30 years", copper:"50-100+ years" },
    { feature:"Salt air resistance", aluminum:"Good", copper:"Immune" },
    { feature:"Maintenance required", aluminum:"Moderate", copper:"Minimal" },
    { feature:"Appearance over time", aluminum:"Fades slightly", copper:"Develops patina — improves" },
    { feature:"Curb appeal impact", aluminum:"Clean, modern", copper:"Premium, distinguished" },
    { feature:"Home value impact", aluminum:"Functional", copper:"Adds measurable value" },
    { feature:"Replacement frequency", aluminum:"Once every 20-25 years", copper:"Likely never" },
  ],

  idealFor: [
    { title:"Historic and Mediterranean homes", desc:"Copper's classic aesthetic complements Spanish tile, barrel tile, and historic architectural styles found throughout Tampa Bay's older neighborhoods." },
    { title:"Coastal and waterfront properties", desc:"Salt air destroys aluminum faster. Copper is essentially immune to corrosion, making it the material of choice for homes on the water." },
    { title:"High-end new construction", desc:"Builders and architects spec copper when the home's exterior needs to make a statement. Copper gutters signal that no detail was overlooked." },
    { title:"Forever homes", desc:"If you're staying in your home for 20+ years, copper's higher upfront cost pays for itself — you'll never replace them, and they add value every year." },
  ],

  goldSteps: [
    { num:"01", title:"ASSESS", desc:"We evaluate your roofline, architectural style, and drainage needs. Not every home benefits from copper — we'll be honest about whether it's the right investment for yours." },
    { num:"02", title:"DESIGN", desc:"Custom copper system design including gutter profile, downspout placement, leader heads, and color/patina expectations. Detailed estimate with material and labor breakdown." },
    { num:"03", title:"INSTALL", desc:"Our crew fabricates and installs your copper system with soldered joints and precision-placed brackets. Copper installation is specialized work — this is not a standard gutter crew job." },
    { num:"04", title:"PROTECT", desc:"Final inspection, water flow test, and care instructions for your new copper system. The investment is protected by our craftsmanship warranty." },
  ],

  faqs: [
    { q:"How much do copper gutters cost?", a:"Copper gutter systems are a premium investment. Half-round copper gutters start around $65 per linear foot installed, with copper downspouts at approximately $50 per linear foot. A complete copper system for a typical home runs significantly more than aluminum — but it also lasts 3-5 times longer. We provide detailed quotes so you can evaluate the investment." },
    { q:"Are copper gutters worth the investment?", a:"Over a 50-year period, copper often costs less than aluminum because you never replace it. A $1,800 aluminum system replaced twice over 50 years costs $3,600+. A $5,000 copper system installed once costs $5,000 — and it's still working at year 50. For homes you plan to keep long-term, or for coastal properties where aluminum corrodes faster, copper is the smarter long-term investment." },
    { q:"Will copper gutters turn green?", a:"Yes — and that's a feature, not a flaw. Copper develops a natural green patina over several years of exposure to weather. This patina is actually a protective layer that prevents further oxidation. Many homeowners specifically choose copper for this aging effect. If you prefer the original copper tone, periodic cleaning maintains the warm color." },
    { q:"Do you solder copper gutter joints?", a:"Yes. Copper gutter joints should be soldered for a watertight, permanent seal — not just caulked like aluminum. Our crew is trained in copper soldering techniques to ensure every joint is secure and leak-free for decades." },
    { q:"Can you install copper gutters on any home?", a:"Technically yes, but copper isn't the best choice for every home. It looks best on homes with architectural character — historic styles, Mediterranean, craftsman, colonial, or high-end contemporary. On a standard suburban ranch, the premium cost may not deliver proportional visual impact. We'll give you an honest recommendation." },
    { q:"How long does copper gutter installation take?", a:"Copper installation takes longer than aluminum because of the soldering, custom bracket placement, and precision work required. Most residential copper gutter installations take 2-4 days depending on complexity." },
    { q:"Do you offer copper gutter guards?", a:"Yes. We install copper leaf guards in 6\" and 7\" sizes that match your copper gutter system seamlessly. No mismatched aluminum guards sitting on top of a premium copper system." },
  ],

  ctaTitle: "INTERESTED IN COPPER?",
  ctaSub: "Copper isn't for every home or every budget — but for the right property, nothing else compares. Get a free assessment to find out if copper is the right investment for yours.",
};

export default function CopperGuttersPage() {
  const [formData, setFormData] = useState({name:"",phone:"",email:"",zip:""});
  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);
  useEffect(() => { injectFonts(); }, []);
  const secTitle = {fontFamily:f.h,fontSize:"clamp(24px,4vw,36px)",fontWeight:800,letterSpacing:"2px",textAlign:"center",marginBottom:"8px"};

  return (
    <div style={{background:C.bg,color:C.white,fontFamily:f.b,lineHeight:1.65,minHeight:"100vh"}}>
      <SiteNav />
      <div style={{padding:"16px 24px 0",maxWidth:"1200px",margin:"0 auto"}}><div style={{fontFamily:f.b,fontSize:"13px",color:C.muted}}>{PAGE.breadcrumb.map((item,i) => <span key={i}>{i>0&&<span style={{margin:"0 8px",opacity:0.5}}>/</span>}<span style={{color:i===PAGE.breadcrumb.length-1?C.copper:C.muted}}>{item}</span></span>)}</div></div>

      {/* HERO */}
      <section style={{padding:"60px 24px 80px",maxWidth:"1200px",margin:"0 auto",display:"flex",gap:"48px",alignItems:"center",flexWrap:"wrap"}}>
        <div style={{flex:"1 1 500px",minWidth:"300px"}}>
          <Tag>{PAGE.heroTag}</Tag>
          <h1 style={{fontFamily:f.h,fontSize:"clamp(32px,5vw,48px)",fontWeight:800,lineHeight:1.1,marginBottom:"20px"}}>{PAGE.heroH1}<br/><span style={{color:C.copper}}>{PAGE.heroH1Gold}</span></h1>
          <p style={{fontFamily:f.b,fontSize:"18px",color:C.offWhite,lineHeight:1.7,marginBottom:"32px",maxWidth:"560px"}}>{PAGE.heroP}</p>
          <div style={{display:"flex",gap:"16px",flexWrap:"wrap"}}>
            <button onClick={()=>document.getElementById("quote-form")?.scrollIntoView({behavior:"smooth"})} style={{padding:"16px 36px",fontFamily:f.h,fontSize:"14px",fontWeight:700,letterSpacing:"1.5px",color:C.white,background:`linear-gradient(135deg,${C.copper},${C.copperLight})`,border:"none",borderRadius:"8px",cursor:"pointer",boxShadow:"0 4px 16px rgba(184,115,51,0.3)"}}>GET YOUR COPPER CONSULTATION</button>
            <a href="tel:8444443114" style={{display:"inline-flex",alignItems:"center",padding:"16px 36px",fontFamily:f.h,fontSize:"14px",fontWeight:700,letterSpacing:"1.5px",color:C.copper,border:`2px solid ${C.copper}`,borderRadius:"8px",textDecoration:"none"}}>📞 (844) 444-3114</a>
          </div>
          <div style={{display:"flex",gap:"24px",marginTop:"32px",flexWrap:"wrap"}}>{PAGE.stats.map((s,i) => <div key={i} style={{textAlign:"center"}}><div style={{fontFamily:f.h,fontSize:"28px",fontWeight:800,color:C.copper}}>{s.value}</div><div style={{fontFamily:f.b,fontSize:"12px",color:C.muted,maxWidth:"120px"}}>{s.label}</div></div>)}</div>
        </div>
        <div style={{flex:"1 1 400px",minWidth:"300px",maxWidth:"500px",aspectRatio:"4/3",background:`linear-gradient(135deg,${C.navyFade},${C.navy})`,borderRadius:"16px",border:`1px solid ${C.copper}40`,display:"flex",alignItems:"center",justifyContent:"center"}}><div style={{textAlign:"center",color:C.muted}}><div style={{fontSize:"48px",marginBottom:"12px"}}>📸</div><p style={{fontFamily:f.h,fontSize:"13px",letterSpacing:"1px",color:C.copper}}>COPPER GUTTER PROJECT PHOTO</p></div></div>
      </section>

      {/* WHAT WE OFFER */}
      <section style={{background:C.navy,padding:"80px 24px"}}><div style={{maxWidth:"1200px",margin:"0 auto"}}><div style={{textAlign:"center"}}><Tag>COPPER SYSTEMS</Tag><h2 style={{...secTitle,color:C.white}}>OUR COPPER GUTTER OFFERINGS</h2><GoldBar /></div><div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(340px,1fr))",gap:"20px",marginTop:"48px"}}>{PAGE.solutions.map((s,i) => <div key={i} style={{background:C.navyFade,border:`1px solid ${C.navyLight}`,borderRadius:"12px",padding:"28px",transition:"border-color 0.3s"}} onMouseOver={e=>e.currentTarget.style.borderColor=C.copper} onMouseOut={e=>e.currentTarget.style.borderColor=C.navyLight}><div style={{fontFamily:f.h,fontSize:"11px",fontWeight:700,color:C.copper,letterSpacing:"2px",marginBottom:"8px"}}>0{i+1}</div><h3 style={{fontFamily:f.h,fontSize:"17px",fontWeight:700,color:C.white,marginBottom:"10px"}}>{s.title}</h3><p style={{fontFamily:f.b,fontSize:"15px",color:C.muted,lineHeight:1.6}}>{s.desc}</p></div>)}</div></div></section>

      {/* COPPER VS ALUMINUM */}
      <section style={{background:C.navy,padding:"80px 24px"}}><div style={{maxWidth:"900px",margin:"0 auto",textAlign:"center"}}>
        <Tag>COMPARISON</Tag><h2 style={{...secTitle,color:C.white}}>COPPER VS. ALUMINUM</h2><GoldBar />
        <div style={{marginTop:"48px",overflowX:"auto"}}>
          <table style={{width:"100%",borderCollapse:"collapse",fontFamily:f.b,fontSize:"14px"}}>
            <thead><tr style={{borderBottom:`2px solid ${C.copper}`}}>
              <th style={{padding:"12px 16px",textAlign:"left",fontFamily:f.h,fontSize:"13px",fontWeight:700,color:C.white}}>Feature</th>
              <th style={{padding:"12px 16px",textAlign:"center",fontFamily:f.h,fontSize:"13px",fontWeight:700,color:C.muted}}>Aluminum</th>
              <th style={{padding:"12px 16px",textAlign:"center",fontFamily:f.h,fontSize:"13px",fontWeight:700,color:C.copper}}>Copper</th>
            </tr></thead>
            <tbody>{PAGE.comparison.map((row,i) => (
              <tr key={i} style={{borderBottom:`1px solid ${C.navyLight}`,background:i%2===0?C.navyFade:"transparent"}}>
                <td style={{padding:"12px 16px",color:C.white,fontWeight:600}}>{row.feature}</td>
                <td style={{padding:"12px 16px",textAlign:"center",color:C.muted}}>{row.aluminum}</td>
                <td style={{padding:"12px 16px",textAlign:"center",color:C.copper,fontWeight:600}}>{row.copper}</td>
              </tr>
            ))}</tbody>
          </table>
        </div>
      </div></section>

      {/* IDEAL FOR */}
      <section style={{background:C.bg,padding:"80px 24px"}}><div style={{maxWidth:"1000px",margin:"0 auto"}}><div style={{textAlign:"center"}}><Tag>BEST FIT</Tag><h2 style={{...secTitle,color:C.white}}>WHO COPPER GUTTERS ARE FOR</h2><GoldBar /></div><div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(250px,1fr))",gap:"20px",marginTop:"48px"}}>{PAGE.idealFor.map((item,i) => <div key={i} style={{background:C.navyFade,border:`1px solid ${C.navyLight}`,borderRadius:"12px",padding:"28px",borderTop:`3px solid ${C.copper}`}}><h3 style={{fontFamily:f.h,fontSize:"16px",fontWeight:700,color:C.white,marginBottom:"8px"}}>{item.title}</h3><p style={{fontFamily:f.b,fontSize:"15px",color:C.muted,lineHeight:1.55}}>{item.desc}</p></div>)}</div></div></section>

      {/* GOLD STANDARD */}
      <section style={{background:C.navy,padding:"80px 24px"}}><div style={{maxWidth:"1200px",margin:"0 auto"}}><div style={{textAlign:"center"}}><Tag>THE GOLD STANDARD</Tag><h2 style={{...secTitle,color:C.white}}>OUR COPPER INSTALLATION PROCESS</h2><GoldBar /><p style={{fontFamily:f.b,fontSize:"17px",color:C.offWhite,fontStyle:"italic",maxWidth:"500px",margin:"0 auto 48px"}}>Every home. Every time. No exceptions.</p></div><div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(250px,1fr))",gap:"24px"}}>{PAGE.goldSteps.map((step,i) => <div key={i} style={{background:C.navyFade,border:`1px solid ${C.navyLight}`,borderRadius:"12px",padding:"28px",position:"relative"}}><div style={{fontFamily:f.h,fontSize:"36px",fontWeight:800,color:"rgba(184,115,51,0.1)",position:"absolute",top:"16px",right:"20px"}}>{step.num}</div><div style={{fontFamily:f.h,fontSize:"11px",fontWeight:700,color:C.copper,letterSpacing:"3px",marginBottom:"8px"}}>STEP {step.num}</div><h3 style={{fontFamily:f.h,fontSize:"22px",fontWeight:700,color:C.white,marginBottom:"12px"}}>{step.title}</h3><p style={{fontFamily:f.b,fontSize:"15px",color:C.muted,lineHeight:1.6}}>{step.desc}</p></div>)}</div></div></section>

      {/* FAQ */}
      <section style={{background:C.bg,padding:"80px 24px"}}><div style={{maxWidth:"800px",margin:"0 auto",textAlign:"center"}}><Tag>FAQ</Tag><h2 style={{...secTitle,color:C.white}}>COPPER GUTTER QUESTIONS</h2><GoldBar /><div style={{marginTop:"40px",textAlign:"left"}}>{PAGE.faqs.map((faq,i) => <div key={i} style={{borderBottom:`1px solid ${C.navyLight}`}}><button onClick={()=>setOpenFaq(openFaq===i?null:i)} style={{width:"100%",padding:"20px 0",background:"none",border:"none",cursor:"pointer",display:"flex",justifyContent:"space-between",alignItems:"center",gap:"16px"}}><span style={{fontFamily:f.h,fontSize:"15px",fontWeight:600,color:openFaq===i?C.copper:C.white,textAlign:"left",transition:"color 0.2s"}}>{faq.q}</span><span style={{fontFamily:f.h,fontSize:"20px",color:C.copper,transform:openFaq===i?"rotate(45deg)":"none",transition:"transform 0.3s",flexShrink:0}}>+</span></button>{openFaq===i&&<div style={{padding:"0 0 20px",fontFamily:f.b,fontSize:"15px",color:C.muted,lineHeight:1.65}}>{faq.a}</div>}</div>)}</div></div></section>

      {/* CTA */}
      <section id="quote-form" style={{background:`linear-gradient(165deg,${C.navyMid},${C.navy})`,padding:"80px 24px"}}><div style={{maxWidth:"600px",margin:"0 auto",textAlign:"center"}}>
        <h2 style={{fontFamily:f.h,fontSize:"clamp(28px,5vw,40px)",fontWeight:800,color:C.white,marginBottom:"12px"}}>{PAGE.ctaTitle}</h2>
        <p style={{fontFamily:f.b,fontSize:"17px",color:C.offWhite,marginBottom:"40px"}}>{PAGE.ctaSub}</p>
        {submitted ? <div style={{background:"rgba(184,115,51,0.1)",border:`1px solid ${C.copper}`,borderRadius:"12px",padding:"32px"}}><div style={{fontSize:"48px",marginBottom:"12px"}}>✓</div><h3 style={{fontFamily:f.h,fontSize:"20px",fontWeight:700,color:C.copper}}>Consultation Request Received!</h3><p style={{fontFamily:f.b,fontSize:"15px",color:C.muted,marginTop:"8px"}}>We'll be in touch to schedule your copper assessment.</p></div> : <div style={{background:C.white,borderRadius:"16px",padding:"32px",boxShadow:"0 24px 80px rgba(0,0,0,0.4)",textAlign:"left"}}>
          <h3 style={{fontFamily:f.h,fontSize:"18px",fontWeight:700,color:C.navy,textAlign:"center",marginBottom:"4px"}}>Request Your Copper Consultation</h3>
          <div style={{width:"40px",height:"3px",background:C.copper,borderRadius:"2px",margin:"10px auto 20px"}} />
          <input style={inputStyle} placeholder="Full Name" value={formData.name} onChange={e=>setFormData({...formData,name:e.target.value})} />
          <input style={inputStyle} placeholder="Phone Number" type="tel" value={formData.phone} onChange={e=>setFormData({...formData,phone:e.target.value})} />
          <input style={inputStyle} placeholder="Email Address" type="email" value={formData.email} onChange={e=>setFormData({...formData,email:e.target.value})} />
          <input style={inputStyle} placeholder="ZIP Code" value={formData.zip} onChange={e=>setFormData({...formData,zip:e.target.value})} maxLength={5} />
          <button onClick={()=>setSubmitted(true)} style={{width:"100%",padding:"16px",fontFamily:f.h,fontSize:"14px",fontWeight:700,letterSpacing:"1.5px",color:C.white,background:`linear-gradient(135deg,${C.copper},${C.copperLight})`,border:"none",borderRadius:"8px",cursor:"pointer"}}>REQUEST MY COPPER CONSULTATION</button>
          <p style={{fontFamily:f.b,fontSize:"12px",color:"#9CA3AF",textAlign:"center",marginTop:"12px"}}>No spam. No pressure. Honest assessment of whether copper is right for your home.</p>
        </div>}
        <div style={{marginTop:"32px"}}><a href="tel:8444443114" style={{fontFamily:f.h,fontSize:"18px",fontWeight:700,color:C.copper,textDecoration:"none"}}>📞 (844) 444-3114</a></div>
      </div></section>

      <SiteFooter />
      <MobileCTA />
      <style>{`*{box-sizing:border-box;margin:0;padding:0}::placeholder{color:#9CA3AF}input:focus{border-color:${C.copper}!important}`}</style>
    </div>
  );
}
