"use client";

import { useState, useEffect } from "react";
import SiteNav from "../../components/SiteNav";
import SiteFooter from "../../components/SiteFooter";
import MobileCTA from "../../components/MobileCTA";

const injectFonts = () => { if (typeof document==="undefined"||document.querySelector("#jr-fonts")) return; const l=document.createElement("link"); l.id="jr-fonts"; l.rel="stylesheet"; l.href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800&family=Source+Sans+3:wght@300;400;600&display=swap"; document.head.appendChild(l); };
const C = { bg:"#0B1628",navy:"#1B2A4A",navyMid:"#243556",navyLight:"#2C3E5A",navyFade:"#162033",gold:"#C8952E",goldLight:"#D4A843",goldPale:"rgba(200,149,46,0.12)",cream:"#F5F3EF",white:"#FFFFFF",offWhite:"#E8E4DC",muted:"#7A8FA8",charcoal:"#2D2D2D",success:"#2D8B4E",successDim:"rgba(45,139,78,0.15)",accent:"#8B9DAF",accentLight:"#A3B5C8",accentPale:"rgba(139,157,175,0.12)" };
const f = { h:"'Montserrat', sans-serif", b:"'Source Sans 3', sans-serif" };
const Tag = ({children}) => <div style={{display:"inline-block",padding:"6px 16px",background:C.accentPale,borderRadius:"4px",marginBottom:"12px"}}><span style={{fontFamily:f.h,fontSize:"12px",fontWeight:700,color:C.accent,letterSpacing:"3px"}}>{children}</span></div>;
const GoldBar = () => <div style={{width:"60px",height:"3px",background:`linear-gradient(90deg,${C.accent},${C.accentLight})`,borderRadius:"2px",margin:"16px auto"}} />;
const Stars = () => <span style={{color:C.gold,fontSize:"14px",letterSpacing:"2px"}}>★★★★★</span>;
const inputStyle = {width:"100%",padding:"13px 16px",fontFamily:f.b,fontSize:"15px",border:"1.5px solid #D1D5DB",borderRadius:"8px",outline:"none",color:C.charcoal,marginBottom:"12px",background:"#FAFAFA",boxSizing:"border-box"};

const PAGE = {
  breadcrumb: ["Home","Services","Gutter Guards"],
  heroTag: "GUTTER GUARD INSTALLATION & REPAIR",
  heroH1: "Keep Debris Out.",
  heroH1Gold: "Keep Your Gutters Flowing.",
  heroP: "Gutter guards prevent leaves, pine needles, and debris from clogging your gutters and downspouts — the #1 cause of gutter failure and water damage. Guards make maintenance easier, extend your system's lifespan, and keep drainage working when Florida storms hit hardest.",

  problems: [
    { icon:"🍂", title:"Debris clogs downspouts", desc:"Without guards, leaves and debris pack inside your gutters, block downspouts, and stop water flow completely. When it rains, water overflows exactly where it shouldn't — against your fascia, walls, and foundation." },
    { icon:"🌊", title:"Standing water causes damage", desc:"Clogged gutters hold water like a trough. That weight pulls gutters away from the fascia, rots the wood behind them, and creates breeding grounds for mosquitoes and pests." },
    { icon:"🔄", title:"Constant cleaning cycle", desc:"Without guards, you're cleaning gutters 2-4 times per year — climbing ladders, scooping muck, flushing downspouts. Guards dramatically reduce how often you need to clean and make the cleanings faster when you do." },
    { icon:"⚡", title:"Storm season overwhelm", desc:"Tampa's hurricane season dumps massive water volume in short bursts. Gutters packed with debris can't handle it. Guards keep the channel clear so water flows when it matters most." },
  ],

  solutions: [
    { title:"Four guard options for every situation", desc:"We install aluminum gutter guards, standard gutter guards, micro mesh gutter guards, and EZ Mesh gutter guards. We assess your tree coverage, roof pitch, and debris type to recommend the right system — not just the most expensive one." },
    { title:"Premium micro mesh option", desc:"For maximum debris blocking, micro mesh guards filter out pine needles, shingle grit, and seed pods while still handling Florida's heaviest downpours. We recommend micro mesh for homes with heavy tree coverage or fine debris problems." },
    { title:"Guards + maintenance = complete protection", desc:"Guards keep debris out of your gutters, but surface buildup still happens over time. We offer ongoing maintenance programs to keep your guards clear and your entire system performing — so you get the full benefit of your investment." },
    { title:"Retrofit to your existing gutters", desc:"Most guard systems install directly onto your current gutters without replacement. If your gutters are in good shape, we protect them — we don't force you to buy new ones." },
    { title:"New gutter + guard packages", desc:"Need new gutters too? We bundle seamless gutter installation with guard systems for maximum savings and a single-crew, single-day installation." },
    { title:"Installed by our crew — not a franchise", desc:"National gutter guard companies send salespeople to your door, then subcontract the install. We do both — the consultation and the installation — with our own trained team." },
  ],

  stats: [
    { value:"1,000+", label:"Guard installations completed" },
    { value:"80%", label:"Less cleaning with guards" },
    { value:"20+", label:"Year guard lifespan" },
    { value:"100%", label:"In-house installation" },
  ],

  goldSteps: [
    { num:"01", title:"ASSESS", desc:"We evaluate your tree coverage, debris type, roof pitch, and existing gutter condition to recommend the right guard system for your situation." },
    { num:"02", title:"DESIGN", desc:"Custom guard plan with the right product for each gutter run — because the front of your house may need different protection than the back." },
    { num:"03", title:"INSTALL", desc:"Our crew installs guards securely onto your gutters, ensuring proper water flow and debris shedding. Most homes done in half a day." },
    { num:"04", title:"PROTECT", desc:"Final inspection, flow test, and our craftsmanship warranty. We'll also set you up with a maintenance schedule to keep everything performing long-term." },
  ],

  reviews: [
    { text:"Chris and his team replaced the gutters on my home with 7\" gutters, changed downspouts to address standing water issues, then installed leaf guards on them to keep them flowing well. Very satisfied with the quality.", name:"David K.", context:"Gutters + Leaf Guards" },
    { text:"Great experience. They fixed and added a new gutter. I couldn't be more pleased with their work and dealing with their professional and friendly staff.", name:"Johnny C.", context:"Post-Storm + Guards" },
    { text:"Chris and his crew are amazing! Great customer service and even better craftsmanship! Chris took the time to explain and educate me on everything before the project commenced.", name:"JR One Customer", context:"Gutter Guard Install" },
  ],

  faqs: [
    { q:"Do gutter guards really work?", a:"Yes — guards are highly effective at keeping debris out of your gutters and preventing clogs in your downspouts and drainage system. That said, they're not set-and-forget. Surface debris can still accumulate on top of guards over time and needs periodic clearing. The difference is cleaning off the top of a guard is much faster and easier than scooping packed debris out of a clogged gutter by hand." },
    { q:"Do I still need to clean my gutters after guards are installed?", a:"Yes, but much less often and much more easily. Guards keep debris from getting inside your gutters and clogging your downspouts — that's the real damage-causing problem they solve. Surface buildup on top of guards still needs occasional clearing. We offer maintenance programs to handle this for you, so your guards and gutters stay performing year-round." },
    { q:"How much do gutter guards cost in Tampa?", a:"Gutter guard installation typically ranges from $7–$18 per linear foot depending on the guard type, gutter accessibility, and whether your existing gutters need repair first. Premium micro mesh systems are at the higher end. We provide detailed estimates with no hidden costs." },
    { q:"Can gutter guards be installed on my existing gutters?", a:"In most cases, yes. If your current gutters are in good condition with proper pitch and no structural damage, guards install directly on top. During our assessment, we inspect your gutters and let you know if any repairs are needed first." },
    { q:"What's the best gutter guard for pine needles?", a:"Micro mesh guards are the most effective option for pine needles. Standard screen guards have openings large enough for needles to pass through. If you have pine trees near your roofline, we'll specifically recommend a micro mesh system rated for fine debris." },
    { q:"What's the difference between your guards and LeafFilter?", a:"National companies like LeafFilter use high-pressure sales tactics, charge premium prices, and subcontract the actual installation to local crews. We're the local crew — you deal directly with us, get honest pricing without the franchise markup, and our team does both the consultation and the install." },
    { q:"Do you offer maintenance for gutter guards?", a:"Yes. We offer seasonal maintenance programs that include clearing any surface debris from your guards, inspecting the guard attachment points, flushing downspouts, and checking your gutter system's overall condition. It's the best way to protect your guard investment and keep everything working." },
  ],

  ctaTitle: "READY TO PROTECT YOUR GUTTERS?",
  ctaSub: "Get your free gutter guard assessment. We'll inspect your gutters, evaluate your tree coverage, and recommend the right protection — plus maintenance options to keep everything performing long-term.",
};

export default function GutterGuardsPage() {
  const [formData, setFormData] = useState({name:"",phone:"",email:"",zip:""});
  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);
  useEffect(() => { injectFonts(); }, []);
  const sec = {padding:"80px 24px",maxWidth:"1200px",margin:"0 auto"};
  const secTitle = {fontFamily:f.h,fontSize:"clamp(24px,4vw,36px)",fontWeight:800,letterSpacing:"2px",textAlign:"center",marginBottom:"8px"};
  const guardTypes = [
    { icon:"🛡️", title:"Aluminum Gutter Guards", desc:"Heavy-duty aluminum guards that snap onto your existing gutters. Built to handle Florida's intense UV, heavy rain, and high winds without warping, rusting, or deteriorating. The strongest, longest-lasting guard option we offer — ideal for homes that need maximum durability.", spec:"Material: Aluminum" },
    { icon:"📐", title:"Standard Gutter Guards", desc:"A reliable, cost-effective guard that keeps leaves and large debris out of your gutters while maintaining solid water flow. A practical choice for homes with moderate tree coverage that want gutter protection without the premium price point.", spec:"Type: Standard screen" },
    { icon:"🔬", title:"Micro Mesh Gutter Guards", desc:"The finest filtration available. Micro mesh screens block pine needles, shingle grit, seed pods, and even roof sand granules while still handling Florida's heaviest downpours. Our top recommendation for homes surrounded by trees or dealing with fine debris problems.", spec:"Filtration: Ultra-fine mesh" },
    { icon:"⚡", title:"EZ Mesh Gutter Guards", desc:"Quick-install mesh guards that provide excellent debris protection with minimal installation time. A smart balance between performance and value — effective against leaves and medium debris while keeping your gutter system flowing during Tampa's storm season.", spec:"Install: Quick-fit design" },
  ];

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
          <h1 style={{fontFamily:f.h,fontSize:"clamp(32px,5vw,48px)",fontWeight:800,lineHeight:1.1,marginBottom:"20px"}}>{PAGE.heroH1}<br/><span style={{color:C.accent}}>{PAGE.heroH1Gold}</span></h1>
          <p style={{fontFamily:f.b,fontSize:"18px",color:C.offWhite,lineHeight:1.7,marginBottom:"32px",maxWidth:"560px"}}>{PAGE.heroP}</p>
          <div style={{display:"flex",gap:"16px",flexWrap:"wrap"}}>
            <button onClick={()=>document.getElementById("quote-form")?.scrollIntoView({behavior:"smooth"})} style={{padding:"16px 36px",fontFamily:f.h,fontSize:"14px",fontWeight:700,letterSpacing:"1.5px",color:C.white,background:`linear-gradient(135deg,${C.accent},${C.accentLight})`,border:"none",borderRadius:"8px",cursor:"pointer",boxShadow:"0 4px 16px rgba(139,157,175,0.3)"}}>GET YOUR FREE ESTIMATE</button>
            <a href="tel:8444443114" style={{display:"inline-flex",alignItems:"center",padding:"16px 36px",fontFamily:f.h,fontSize:"14px",fontWeight:700,letterSpacing:"1.5px",color:C.accent,background:"transparent",border:`2px solid ${C.accent}`,borderRadius:"8px",textDecoration:"none"}}>📞 CALL (844) 444-3114</a>
          </div>
          <div style={{display:"flex",gap:"24px",marginTop:"32px",flexWrap:"wrap"}}>{PAGE.stats.map((s,i) => <div key={i} style={{textAlign:"center"}}><div style={{fontFamily:f.h,fontSize:"28px",fontWeight:800,color:C.accent}}>{s.value}</div><div style={{fontFamily:f.b,fontSize:"12px",color:C.muted,maxWidth:"100px"}}>{s.label}</div></div>)}</div>
        </div>
      </section>

      {/* PROBLEM */}
      <section style={{background:C.navy,padding:"80px 24px"}}>
        <div style={{maxWidth:"1200px",margin:"0 auto",textAlign:"center"}}>
          <Tag>THE PROBLEM</Tag>
          <h2 style={{...secTitle,color:C.white}}>THE REAL COST OF UNPROTECTED GUTTERS</h2>
          <GoldBar />
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(250px,1fr))",gap:"24px",marginTop:"48px",textAlign:"left"}}>
            {PAGE.problems.map((p,i) => <div key={i} style={{background:C.navyFade,border:`1px solid ${C.navyLight}`,borderRadius:"12px",padding:"28px",borderLeft:`4px solid ${C.gold}`}}><div style={{fontSize:"28px",marginBottom:"12px"}}>{p.icon}</div><h3 style={{fontFamily:f.h,fontSize:"17px",fontWeight:700,color:C.white,marginBottom:"8px"}}>{p.title}</h3><p style={{fontFamily:f.b,fontSize:"15px",color:C.muted,lineHeight:1.55}}>{p.desc}</p></div>)}
          </div>
        </div>
      </section>

      {/* SOLUTION */}
      <section style={{background:C.bg,padding:"80px 24px"}}>
        <div style={sec}>
          <div style={{textAlign:"center"}}><Tag>THE JR ONE DIFFERENCE</Tag><h2 style={{...secTitle,color:C.white}}>GUTTER PROTECTION DONE RIGHT</h2><GoldBar /><p style={{fontFamily:f.b,fontSize:"17px",color:C.muted,maxWidth:"600px",margin:"0 auto 48px"}}>The right guard for the right situation — not a one-size-fits-all sales pitch.</p></div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(340px,1fr))",gap:"20px"}}>
            {PAGE.solutions.map((s,i) => <div key={i} style={{background:C.navyFade,border:`1px solid ${C.navyLight}`,borderRadius:"12px",padding:"28px",transition:"border-color 0.3s"}} onMouseOver={e=>e.currentTarget.style.borderColor=C.accent} onMouseOut={e=>e.currentTarget.style.borderColor=C.navyLight}><div style={{fontFamily:f.h,fontSize:"11px",fontWeight:700,color:C.accent,letterSpacing:"2px",marginBottom:"8px"}}>0{i+1}</div><h3 style={{fontFamily:f.h,fontSize:"17px",fontWeight:700,color:C.white,marginBottom:"10px"}}>{s.title}</h3><p style={{fontFamily:f.b,fontSize:"15px",color:C.muted,lineHeight:1.6}}>{s.desc}</p></div>)}
          </div>
        </div>
      </section>

      {/* GUARD TYPES */}
      <section style={{ background: C.navy, padding: "80px 24px" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div style={{ textAlign: "center" }}>
            <Tag>OUR GUARD OPTIONS</Tag>
            <h2 style={{ fontFamily: f.h, fontSize: "clamp(24px,4vw,36px)", fontWeight: 800, letterSpacing: "2px", textAlign: "center", marginBottom: "8px", color: C.white }}>CHOOSE THE RIGHT PROTECTION</h2>
            <GoldBar />
            <p style={{ fontFamily: f.b, fontSize: "17px", color: C.muted, maxWidth: "600px", margin: "0 auto 48px" }}>
              Four guard systems — each designed for a specific level of protection and budget.
            </p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: "20px" }}>
            {guardTypes.map((g, i) => (
              <div key={i} style={{ background: C.navyFade, border: `1px solid ${C.navyLight}`, borderRadius: "12px", padding: "28px", borderTop: `4px solid ${C.gold}` }}>
                <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "12px" }}>
                  <span style={{ fontSize: "28px" }}>{g.icon}</span>
                </div>
                <h3 style={{ fontFamily: f.h, fontSize: "17px", fontWeight: 700, color: C.white, marginBottom: "10px" }}>{g.title}</h3>
                <p style={{ fontFamily: f.b, fontSize: "15px", color: C.muted, lineHeight: 1.6, marginBottom: "12px" }}>{g.desc}</p>
                <div style={{ fontFamily: f.h, fontSize: "12px", fontWeight: 600, color: C.gold, letterSpacing: "1px", padding: "6px 12px", background: C.goldPale, borderRadius: "4px", display: "inline-block" }}>{g.spec}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

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

      {/* GOLD STANDARD */}
      <section style={{background:C.navy,padding:"80px 24px"}}>
        <div style={sec}><div style={{textAlign:"center"}}><Tag>THE GOLD STANDARD</Tag><h2 style={{...secTitle,color:C.white}}>OUR GUARD INSTALLATION PROCESS</h2><GoldBar /><p style={{fontFamily:f.b,fontSize:"17px",color:C.offWhite,fontStyle:"italic",maxWidth:"500px",margin:"0 auto 48px"}}>Every home. Every time. No exceptions.</p></div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(250px,1fr))",gap:"24px"}}>{PAGE.goldSteps.map((step,i) => <div key={i} style={{background:C.navyFade,border:`1px solid ${C.navyLight}`,borderRadius:"12px",padding:"28px",position:"relative"}}><div style={{fontFamily:f.h,fontSize:"36px",fontWeight:800,color:"rgba(200,149,46,0.08)",position:"absolute",top:"16px",right:"20px"}}>{step.num}</div><div style={{fontFamily:f.h,fontSize:"11px",fontWeight:700,color:C.accent,letterSpacing:"3px",marginBottom:"8px"}}>STEP {step.num}</div><h3 style={{fontFamily:f.h,fontSize:"22px",fontWeight:700,color:C.white,marginBottom:"12px"}}>{step.title}</h3><p style={{fontFamily:f.b,fontSize:"15px",color:C.muted,lineHeight:1.6}}>{step.desc}</p></div>)}</div>
        </div>
      </section>

      {/* REVIEWS */}
      <section style={{background:C.bg,padding:"80px 24px"}}><div style={sec}><div style={{textAlign:"center"}}><Tag>CUSTOMER REVIEWS</Tag><h2 style={{...secTitle,color:C.white}}>WHAT GUARD CUSTOMERS SAY</h2><GoldBar /></div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(300px,1fr))",gap:"20px",marginTop:"48px"}}>{PAGE.reviews.map((rev,i) => <div key={i} style={{background:C.navyFade,border:`1px solid ${C.navyLight}`,borderRadius:"12px",padding:"28px"}}><Stars /><p style={{fontFamily:f.b,fontSize:"15px",color:C.offWhite,lineHeight:1.65,margin:"16px 0",fontStyle:"italic"}}>"{rev.text}"</p><div style={{borderTop:`1px solid ${C.navyLight}`,paddingTop:"12px",display:"flex",justifyContent:"space-between",alignItems:"center"}}><span style={{fontFamily:f.h,fontSize:"14px",fontWeight:600,color:C.white}}>{rev.name}</span><span style={{fontFamily:f.b,fontSize:"12px",color:C.muted}}>{rev.context}</span></div></div>)}</div></div></section>

      {/* FAQ */}
      <section style={{background:C.navy,padding:"80px 24px"}}><div style={{maxWidth:"800px",margin:"0 auto",textAlign:"center"}}><Tag>FAQ</Tag><h2 style={{...secTitle,color:C.white}}>GUTTER GUARD QUESTIONS</h2><GoldBar />
        <div style={{marginTop:"40px",textAlign:"left"}}>{PAGE.faqs.map((faq,i) => <div key={i} style={{borderBottom:`1px solid ${C.navyLight}`}}><button onClick={()=>setOpenFaq(openFaq===i?null:i)} style={{width:"100%",padding:"20px 0",background:"none",border:"none",cursor:"pointer",display:"flex",justifyContent:"space-between",alignItems:"center",gap:"16px"}}><span style={{fontFamily:f.h,fontSize:"15px",fontWeight:600,color:openFaq===i?C.accent:C.white,textAlign:"left",transition:"color 0.2s"}}>{faq.q}</span><span style={{fontFamily:f.h,fontSize:"20px",color:C.accent,transform:openFaq===i?"rotate(45deg)":"none",transition:"transform 0.3s",flexShrink:0}}>+</span></button>{openFaq===i&&<div style={{padding:"0 0 20px",fontFamily:f.b,fontSize:"15px",color:C.muted,lineHeight:1.65}}>{faq.a}</div>}</div>)}</div></div></section>

      {/* CTA FORM */}
      <section id="quote-form" style={{background:`linear-gradient(165deg,${C.navyMid},${C.navy})`,padding:"80px 24px"}}><div style={{maxWidth:"600px",margin:"0 auto",textAlign:"center"}}>
        <h2 style={{fontFamily:f.h,fontSize:"clamp(28px,5vw,40px)",fontWeight:800,color:C.white,marginBottom:"12px"}}>{PAGE.ctaTitle}</h2>
        <p style={{fontFamily:f.b,fontSize:"17px",color:C.offWhite,marginBottom:"40px"}}>{PAGE.ctaSub}</p>
        {submitted ? <div style={{background:C.successDim,border:`1px solid ${C.success}`,borderRadius:"12px",padding:"32px"}}><div style={{fontSize:"48px",marginBottom:"12px"}}>✓</div><h3 style={{fontFamily:f.h,fontSize:"20px",fontWeight:700,color:"#4ADE80"}}>Quote Request Received!</h3><p style={{fontFamily:f.b,fontSize:"15px",color:C.muted,marginTop:"8px"}}>We'll get back to you within hours.</p></div> : <div style={{background:C.white,borderRadius:"16px",padding:"32px",boxShadow:"0 24px 80px rgba(0,0,0,0.4)",textAlign:"left"}}>
          <h3 style={{fontFamily:f.h,fontSize:"18px",fontWeight:700,color:C.navy,textAlign:"center",marginBottom:"4px"}}>Get Your Free Guard Estimate</h3>
          <div style={{width:"40px",height:"3px",background:C.accent,borderRadius:"2px",margin:"10px auto 20px"}} />
          <input style={inputStyle} placeholder="Full Name" value={formData.name} onChange={e=>setFormData({...formData,name:e.target.value})} />
          <input style={inputStyle} placeholder="Phone Number" type="tel" value={formData.phone} onChange={e=>setFormData({...formData,phone:e.target.value})} />
          <input style={inputStyle} placeholder="Email Address" type="email" value={formData.email} onChange={e=>setFormData({...formData,email:e.target.value})} />
          <input style={inputStyle} placeholder="ZIP Code" value={formData.zip} onChange={e=>setFormData({...formData,zip:e.target.value})} maxLength={5} />
          <button onClick={()=>setSubmitted(true)} style={{width:"100%",padding:"16px",fontFamily:f.h,fontSize:"14px",fontWeight:700,letterSpacing:"1.5px",color:C.white,background:`linear-gradient(135deg,${C.accent},${C.accentLight})`,border:"none",borderRadius:"8px",cursor:"pointer",boxShadow:"0 4px 16px rgba(139,157,175,0.3)"}}>REQUEST MY FREE GUARD ESTIMATE</button>
          <p style={{fontFamily:f.b,fontSize:"12px",color:"#9CA3AF",textAlign:"center",marginTop:"12px"}}>No spam. No pressure. Just honest expert advice.</p>
        </div>}
        <div style={{marginTop:"32px"}}><p style={{fontFamily:f.b,fontSize:"15px",color:C.muted,marginBottom:"8px"}}>Prefer to talk?</p><a href="tel:8444443114" style={{fontFamily:f.h,fontSize:"18px",fontWeight:700,color:C.gold,textDecoration:"none"}}>📞 (844) 444-3114</a></div>
      </div></section>

      <SiteFooter />
      <MobileCTA scrollTarget="quote-form" />
      <style>{`*{box-sizing:border-box;margin:0;padding:0}::placeholder{color:#9CA3AF}input:focus{border-color:${C.accent}!important}`}</style>
    </div>
  );
}
