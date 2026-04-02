"use client";

import { useState, useEffect } from "react";

const injectFonts = () => { if (typeof document==="undefined"||document.querySelector("#jr-fonts")) return; const l=document.createElement("link"); l.id="jr-fonts"; l.rel="stylesheet"; l.href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800&family=Source+Sans+3:wght@300;400;600&display=swap"; document.head.appendChild(l); };
const C = { bg:"#0B1628",navy:"#1B2A4A",navyMid:"#243556",navyLight:"#2C3E5A",navyFade:"#162033",gold:"#C8952E",goldLight:"#D4A843",goldPale:"rgba(200,149,46,0.12)",cream:"#F5F3EF",white:"#FFFFFF",offWhite:"#E8E4DC",muted:"#7A8FA8",charcoal:"#2D2D2D",success:"#2D8B4E",successDim:"rgba(45,139,78,0.15)" };
const f = { h:"'Montserrat', sans-serif", b:"'Source Sans 3', sans-serif" };
const Tag = ({children}) => <div style={{display:"inline-block",padding:"6px 16px",background:C.goldPale,borderRadius:"4px",marginBottom:"12px"}}><span style={{fontFamily:f.h,fontSize:"12px",fontWeight:700,color:C.gold,letterSpacing:"3px"}}>{children}</span></div>;
const GoldBar = () => <div style={{width:"60px",height:"3px",background:`linear-gradient(90deg,${C.gold},${C.goldLight})`,borderRadius:"2px",margin:"16px auto"}} />;
const Stars = () => <span style={{color:C.gold,fontSize:"14px",letterSpacing:"2px"}}>★★★★★</span>;
const inputStyle = {width:"100%",padding:"13px 16px",fontFamily:f.b,fontSize:"15px",border:"1.5px solid #D1D5DB",borderRadius:"8px",outline:"none",color:C.charcoal,marginBottom:"12px",background:"#FAFAFA",boxSizing:"border-box"};

const PAGE = {
  breadcrumb: ["Home","Services","Soffit & Fascia"],
  heroTag: "SOFFIT & FASCIA INSTALLATION",
  heroH1: "The Part of Your Home",
  heroH1Gold: "Nobody Thinks About — Until It Fails.",
  heroP: "Soffit and fascia protect the most vulnerable edges of your roof from water, pests, and rot. When they fail, the damage spreads fast and gets expensive. We replace and install aluminum and vinyl soffit and fascia systems built for Florida weather.",

  problems: [
    { icon:"🪵", title:"Rotting wood fascia", desc:"Florida's humidity and rain cycles destroy wood fascia boards from the inside out. By the time you see paint peeling, the rot has already spread behind your gutters and into your roof structure." },
    { icon:"🐝", title:"Pest entry points", desc:"Damaged or missing soffit panels are open invitations for wasps, birds, squirrels, bats, and rodents to nest in your attic. Once inside, they cause electrical damage, insulation contamination, and health hazards." },
    { icon:"🌡️", title:"Ventilation failure", desc:"Soffit vents are your attic's primary air intake. When they're blocked, damaged, or missing, your attic traps heat — driving up energy bills and accelerating shingle deterioration from underneath." },
    { icon:"🏚️", title:"Curb appeal collapse", desc:"Stained, sagging, or mismatched soffit and fascia instantly age your home's appearance. It's the first thing people notice when they look up — and the last thing sellers want buyers to see." },
  ],

  solutions: [
    { title:"Aluminum soffit and fascia", desc:"Our primary recommendation for Florida homes. Aluminum won't rot, warp, crack, or attract termites. It handles UV exposure, salt air, and hurricane-force rain without deteriorating. One installation, decades of protection." },
    { title:"Vinyl soffit and fascia", desc:"A budget-friendly alternative that still outperforms wood in every way. Vinyl won't rot or need painting, and modern vinyl products resist fading and impact. We help you choose based on your budget and aesthetic goals." },
    { title:"Wood rot repair underneath", desc:"Before installing new soffit or fascia, we inspect and replace any rotted wood substrate. Many companies wrap aluminum over rotten wood — we fix the problem first so your new material has a solid foundation." },
    { title:"Proper ventilation restoration", desc:"We ensure your soffit vents are correctly placed and unblocked for optimal attic airflow. This keeps your energy bills lower, extends shingle life, and prevents moisture buildup that causes mold." },
    { title:"Color matching and seamless finish", desc:"We carry a wide selection of colors and profiles to match your existing trim, gutters, and home style. The finished look should be seamless — not obviously replaced." },
    { title:"Storm damage specialists", desc:"Florida hurricanes rip soffit panels off like paper. We respond quickly to storm damage, board up exposed areas to prevent further damage, and schedule permanent replacement as fast as possible." },
  ],

  stats: [
    { value:"2,000+", label:"Soffit & fascia projects completed" },
    { value:"30+", label:"Years of experience" },
    { value:"3", label:"In-house installation crews" },
    { value:"0", label:"Subcontractors used — ever" },
  ],

  goldSteps: [
    { num:"01", title:"ASSESS", desc:"Full inspection of your soffit, fascia, and underlying wood structure. We photograph everything and identify hidden rot or pest damage." },
    { num:"02", title:"DESIGN", desc:"Material selection (aluminum or vinyl), color matching, ventilation planning, and a transparent estimate with no surprises." },
    { num:"03", title:"INSTALL", desc:"Our crew removes old material, repairs any rotted wood, and installs new soffit and fascia — typically completing most homes in 1-3 days." },
    { num:"04", title:"PROTECT", desc:"Walkthrough inspection with you, cleanup, and our craftsmanship warranty. Your roof edge is sealed and protected." },
  ],

  reviews: [
    { text:"I cannot express how grateful I am that JR One was referred to me. Chris was very communicative and supportive throughout the entire process. The crew arrived on time, were very nice and attentive. Talk about professionalism and integrity.", name:"Michelle D.", context:"Soffit & Fascia Install" },
    { text:"They removed the old wood soffit, replaced all the soffit and facia with aluminum, replaced all the wood that had termite damage with new wood, and the job was done in a matter of days! Six guys on site with a crew manager.", name:"Tampa Homeowner", context:"Full Soffit & Fascia Replacement" },
    { text:"After Milton I called a dozen different companies to help with our soffits that got blown out. Only one called back — JR ONE. The team showed up and did a perfect job. Do not call anyone else.", name:"Matt D.", context:"Storm Damage Soffit Repair" },
  ],

  faqs: [
    { q:"What's the difference between soffit and fascia?", a:"Soffit is the horizontal panel underneath your roof overhang — the surface you see when you look up at your eaves. Fascia is the vertical board that runs along the edge of your roof, where your gutters attach. Together they seal and protect the edges of your roof structure." },
    { q:"How much does soffit and fascia replacement cost?", a:"Full house soffit and fascia replacement in Tampa typically ranges from $5,000–$15,000+ depending on home size, material (aluminum vs vinyl), amount of wood rot repair needed, and accessibility. We provide detailed estimates broken down by section so you can prioritize if needed." },
    { q:"Should I choose aluminum or vinyl soffit?", a:"For Florida, we generally recommend aluminum. It's more durable in extreme heat, handles impact better during storms, and lasts longer. Vinyl is a solid budget option that still outperforms wood. We'll assess your specific situation and give you an honest recommendation." },
    { q:"How do I know if my soffit or fascia needs replacing?", a:"Look for paint peeling or bubbling, visible staining, sagging panels, holes or cracks, soft spots when pressed, pest activity near your roofline, or pieces that have detached. If your soffit or fascia is original wood and your home is 15+ years old, it's worth an inspection." },
    { q:"Do you repair the wood underneath?", a:"Yes — and this is critical. We inspect and replace any rotted wood substrate before installing new aluminum or vinyl. Some companies skip this step and wrap new material over rotten wood, which just hides the problem. We fix it right." },
    { q:"How long does soffit and fascia installation take?", a:"Most full-house soffit and fascia replacements take 2-4 days depending on home size and the extent of wood repair needed. Partial replacements or repairs can often be completed in a single day." },
  ],

  ctaTitle: "PROTECT YOUR ROOF'S MOST VULNERABLE EDGES",
  ctaSub: "Get your free soffit and fascia inspection. We'll document the condition of your entire roofline and give you a transparent, no-pressure estimate.",
};

export default function SoffitFasciaPage() {
  const [formData, setFormData] = useState({name:"",phone:"",email:"",zip:""});
  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);
  useEffect(() => { injectFonts(); }, []);
  const sec = {padding:"80px 24px",maxWidth:"1200px",margin:"0 auto"};
  const secTitle = {fontFamily:f.h,fontSize:"clamp(24px,4vw,36px)",fontWeight:800,letterSpacing:"2px",textAlign:"center",marginBottom:"8px"};

  return (
    <div style={{background:C.bg,color:C.white,fontFamily:f.b,lineHeight:1.65,minHeight:"100vh"}}>
      <div style={{background:`linear-gradient(90deg,${C.gold},${C.goldLight})`,padding:"10px 24px",textAlign:"center",fontFamily:f.h,fontSize:"13px",fontWeight:600,color:C.navy}}>🏠 Book Full Soffit & Fascia Replacement — Get FREE Gutters + Guards Installed! Call (844) 444-3114</div>
      <nav style={{position:"sticky",top:0,zIndex:1000,padding:"12px 24px",background:"rgba(11,22,40,0.97)",backdropFilter:"blur(12px)",borderBottom:`1px solid ${C.navyLight}`}}><div style={{maxWidth:"1200px",margin:"0 auto",display:"flex",justifyContent:"space-between",alignItems:"center"}}><a href="/" style={{fontFamily:f.h,fontSize:"20px",fontWeight:800,color:C.white,textDecoration:"none"}}>JR <span style={{color:C.gold}}>ONE</span></a><a href="tel:8444443114" style={{fontFamily:f.h,fontSize:"13px",fontWeight:700,color:C.gold,textDecoration:"none"}}>(844) 444-3114</a></div></nav>
      <div style={{padding:"16px 24px 0",maxWidth:"1200px",margin:"0 auto"}}><div style={{fontFamily:f.b,fontSize:"13px",color:C.muted}}>{PAGE.breadcrumb.map((item,i) => <span key={i}>{i>0&&<span style={{margin:"0 8px",opacity:0.5}}>/</span>}<span style={{color:i===PAGE.breadcrumb.length-1?C.gold:C.muted}}>{item}</span></span>)}</div></div>

      <section style={{padding:"60px 24px 80px",maxWidth:"1200px",margin:"0 auto",display:"flex",gap:"48px",alignItems:"center",flexWrap:"wrap"}}>
        <div style={{flex:"1 1 500px",minWidth:"300px"}}>
          <Tag>{PAGE.heroTag}</Tag>
          <h1 style={{fontFamily:f.h,fontSize:"clamp(32px,5vw,48px)",fontWeight:800,lineHeight:1.1,marginBottom:"20px"}}>{PAGE.heroH1}<br/><span style={{color:C.gold}}>{PAGE.heroH1Gold}</span></h1>
          <p style={{fontFamily:f.b,fontSize:"18px",color:C.offWhite,lineHeight:1.7,marginBottom:"32px",maxWidth:"560px"}}>{PAGE.heroP}</p>
          <div style={{display:"flex",gap:"16px",flexWrap:"wrap"}}><button onClick={()=>document.getElementById("quote-form")?.scrollIntoView({behavior:"smooth"})} style={{padding:"16px 36px",fontFamily:f.h,fontSize:"14px",fontWeight:700,letterSpacing:"1.5px",color:C.white,background:`linear-gradient(135deg,${C.gold},${C.goldLight})`,border:"none",borderRadius:"8px",cursor:"pointer",boxShadow:"0 4px 16px rgba(200,149,46,0.3)"}}>GET YOUR FREE INSPECTION</button><a href="tel:8444443114" style={{display:"inline-flex",alignItems:"center",padding:"16px 36px",fontFamily:f.h,fontSize:"14px",fontWeight:700,letterSpacing:"1.5px",color:C.gold,border:`2px solid ${C.gold}`,borderRadius:"8px",textDecoration:"none"}}>📞 CALL (844) 444-3114</a></div>
          <div style={{display:"flex",gap:"24px",marginTop:"32px",flexWrap:"wrap"}}>{PAGE.stats.map((s,i) => <div key={i} style={{textAlign:"center"}}><div style={{fontFamily:f.h,fontSize:"28px",fontWeight:800,color:C.gold}}>{s.value}</div><div style={{fontFamily:f.b,fontSize:"12px",color:C.muted,maxWidth:"100px"}}>{s.label}</div></div>)}</div>
        </div>
        <div style={{flex:"1 1 400px",minWidth:"300px",maxWidth:"500px",aspectRatio:"4/3",background:`linear-gradient(135deg,${C.navyFade},${C.navy})`,borderRadius:"16px",border:`1px solid ${C.navyLight}`,display:"flex",alignItems:"center",justifyContent:"center"}}><div style={{textAlign:"center",color:C.muted}}><div style={{fontSize:"48px",marginBottom:"12px"}}>📸</div><p style={{fontFamily:f.h,fontSize:"13px",letterSpacing:"1px"}}>HERO PROJECT PHOTO</p><p style={{fontFamily:f.b,fontSize:"12px",marginTop:"4px"}}>Best soffit & fascia project from CompanyCam</p></div></div>
      </section>

      <section style={{background:C.cream,padding:"80px 24px"}}><div style={{maxWidth:"1200px",margin:"0 auto",textAlign:"center"}}><Tag>THE PROBLEM</Tag><h2 style={{...secTitle,color:C.navy}}>WHAT HAPPENS WHEN SOFFIT AND FASCIA FAIL</h2><GoldBar /><div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(250px,1fr))",gap:"24px",marginTop:"48px",textAlign:"left"}}>{PAGE.problems.map((p,i) => <div key={i} style={{background:C.white,borderRadius:"12px",padding:"28px",borderLeft:`4px solid ${C.gold}`}}><div style={{fontSize:"28px",marginBottom:"12px"}}>{p.icon}</div><h3 style={{fontFamily:f.h,fontSize:"17px",fontWeight:700,color:C.navy,marginBottom:"8px"}}>{p.title}</h3><p style={{fontFamily:f.b,fontSize:"15px",color:"#4B5563",lineHeight:1.55}}>{p.desc}</p></div>)}</div></div></section>

      <section style={{background:C.bg,padding:"80px 24px"}}><div style={sec}><div style={{textAlign:"center"}}><Tag>THE JR ONE DIFFERENCE</Tag><h2 style={{...secTitle,color:C.white}}>SOFFIT & FASCIA DONE RIGHT</h2><GoldBar /><p style={{fontFamily:f.b,fontSize:"17px",color:C.muted,maxWidth:"600px",margin:"0 auto 48px"}}>We fix the problem underneath before covering it up — because wrapping aluminum over rotten wood is not a solution.</p></div><div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(340px,1fr))",gap:"20px"}}>{PAGE.solutions.map((s,i) => <div key={i} style={{background:C.navyFade,border:`1px solid ${C.navyLight}`,borderRadius:"12px",padding:"28px",transition:"border-color 0.3s"}} onMouseOver={e=>e.currentTarget.style.borderColor=C.gold} onMouseOut={e=>e.currentTarget.style.borderColor=C.navyLight}><div style={{fontFamily:f.h,fontSize:"11px",fontWeight:700,color:C.gold,letterSpacing:"2px",marginBottom:"8px"}}>0{i+1}</div><h3 style={{fontFamily:f.h,fontSize:"17px",fontWeight:700,color:C.white,marginBottom:"10px"}}>{s.title}</h3><p style={{fontFamily:f.b,fontSize:"15px",color:C.muted,lineHeight:1.6}}>{s.desc}</p></div>)}</div></div></section>

      <section style={{background:C.navy,padding:"80px 24px"}}><div style={sec}><div style={{textAlign:"center"}}><Tag>THE GOLD STANDARD</Tag><h2 style={{...secTitle,color:C.white}}>OUR SOFFIT & FASCIA PROCESS</h2><GoldBar /><p style={{fontFamily:f.b,fontSize:"17px",color:C.offWhite,fontStyle:"italic",maxWidth:"500px",margin:"0 auto 48px"}}>Every home. Every time. No exceptions.</p></div><div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(250px,1fr))",gap:"24px"}}>{PAGE.goldSteps.map((step,i) => <div key={i} style={{background:C.navyFade,border:`1px solid ${C.navyLight}`,borderRadius:"12px",padding:"28px",position:"relative"}}><div style={{fontFamily:f.h,fontSize:"36px",fontWeight:800,color:"rgba(200,149,46,0.08)",position:"absolute",top:"16px",right:"20px"}}>{step.num}</div><div style={{fontFamily:f.h,fontSize:"11px",fontWeight:700,color:C.gold,letterSpacing:"3px",marginBottom:"8px"}}>STEP {step.num}</div><h3 style={{fontFamily:f.h,fontSize:"22px",fontWeight:700,color:C.white,marginBottom:"12px"}}>{step.title}</h3><p style={{fontFamily:f.b,fontSize:"15px",color:C.muted,lineHeight:1.6}}>{step.desc}</p></div>)}</div></div></section>

      <section style={{background:C.bg,padding:"80px 24px"}}><div style={sec}><div style={{textAlign:"center"}}><Tag>CUSTOMER REVIEWS</Tag><h2 style={{...secTitle,color:C.white}}>WHAT SOFFIT & FASCIA CUSTOMERS SAY</h2><GoldBar /></div><div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(300px,1fr))",gap:"20px",marginTop:"48px"}}>{PAGE.reviews.map((rev,i) => <div key={i} style={{background:C.navyFade,border:`1px solid ${C.navyLight}`,borderRadius:"12px",padding:"28px"}}><Stars /><p style={{fontFamily:f.b,fontSize:"15px",color:C.offWhite,lineHeight:1.65,margin:"16px 0",fontStyle:"italic"}}>"{rev.text}"</p><div style={{borderTop:`1px solid ${C.navyLight}`,paddingTop:"12px",display:"flex",justifyContent:"space-between",alignItems:"center"}}><span style={{fontFamily:f.h,fontSize:"14px",fontWeight:600,color:C.white}}>{rev.name}</span><span style={{fontFamily:f.b,fontSize:"12px",color:C.muted}}>{rev.context}</span></div></div>)}</div></div></section>

      <section style={{background:C.navy,padding:"80px 24px"}}><div style={{maxWidth:"800px",margin:"0 auto",textAlign:"center"}}><Tag>FAQ</Tag><h2 style={{...secTitle,color:C.white}}>SOFFIT & FASCIA QUESTIONS</h2><GoldBar /><div style={{marginTop:"40px",textAlign:"left"}}>{PAGE.faqs.map((faq,i) => <div key={i} style={{borderBottom:`1px solid ${C.navyLight}`}}><button onClick={()=>setOpenFaq(openFaq===i?null:i)} style={{width:"100%",padding:"20px 0",background:"none",border:"none",cursor:"pointer",display:"flex",justifyContent:"space-between",alignItems:"center",gap:"16px"}}><span style={{fontFamily:f.h,fontSize:"15px",fontWeight:600,color:openFaq===i?C.gold:C.white,textAlign:"left",transition:"color 0.2s"}}>{faq.q}</span><span style={{fontFamily:f.h,fontSize:"20px",color:C.gold,transform:openFaq===i?"rotate(45deg)":"none",transition:"transform 0.3s",flexShrink:0}}>+</span></button>{openFaq===i&&<div style={{padding:"0 0 20px",fontFamily:f.b,fontSize:"15px",color:C.muted,lineHeight:1.65}}>{faq.a}</div>}</div>)}</div></div></section>

      <section id="quote-form" style={{background:`linear-gradient(165deg,${C.navyMid},${C.navy})`,padding:"80px 24px"}}><div style={{maxWidth:"600px",margin:"0 auto",textAlign:"center"}}>
        <h2 style={{fontFamily:f.h,fontSize:"clamp(28px,5vw,40px)",fontWeight:800,color:C.white,marginBottom:"12px"}}>{PAGE.ctaTitle}</h2>
        <p style={{fontFamily:f.b,fontSize:"17px",color:C.offWhite,marginBottom:"40px"}}>{PAGE.ctaSub}</p>
        {submitted ? <div style={{background:C.successDim,border:`1px solid ${C.success}`,borderRadius:"12px",padding:"32px"}}><div style={{fontSize:"48px",marginBottom:"12px"}}>✓</div><h3 style={{fontFamily:f.h,fontSize:"20px",fontWeight:700,color:"#4ADE80"}}>Inspection Request Received!</h3><p style={{fontFamily:f.b,fontSize:"15px",color:C.muted,marginTop:"8px"}}>We'll get back to you within hours.</p></div> : <div style={{background:C.white,borderRadius:"16px",padding:"32px",boxShadow:"0 24px 80px rgba(0,0,0,0.4)",textAlign:"left"}}>
          <h3 style={{fontFamily:f.h,fontSize:"18px",fontWeight:700,color:C.navy,textAlign:"center",marginBottom:"4px"}}>Get Your Free Soffit & Fascia Inspection</h3>
          <div style={{width:"40px",height:"3px",background:C.gold,borderRadius:"2px",margin:"10px auto 20px"}} />
          <input style={inputStyle} placeholder="Full Name" value={formData.name} onChange={e=>setFormData({...formData,name:e.target.value})} />
          <input style={inputStyle} placeholder="Phone Number" type="tel" value={formData.phone} onChange={e=>setFormData({...formData,phone:e.target.value})} />
          <input style={inputStyle} placeholder="Email Address" type="email" value={formData.email} onChange={e=>setFormData({...formData,email:e.target.value})} />
          <input style={inputStyle} placeholder="ZIP Code" value={formData.zip} onChange={e=>setFormData({...formData,zip:e.target.value})} maxLength={5} />
          <button onClick={()=>setSubmitted(true)} style={{width:"100%",padding:"16px",fontFamily:f.h,fontSize:"14px",fontWeight:700,letterSpacing:"1.5px",color:C.white,background:`linear-gradient(135deg,${C.gold},${C.goldLight})`,border:"none",borderRadius:"8px",cursor:"pointer",boxShadow:"0 4px 16px rgba(200,149,46,0.3)"}}>REQUEST MY FREE INSPECTION</button>
          <p style={{fontFamily:f.b,fontSize:"12px",color:"#9CA3AF",textAlign:"center",marginTop:"12px"}}>No spam. No pressure. Just honest expert advice.</p>
        </div>}
        <div style={{marginTop:"32px"}}><p style={{fontFamily:f.b,fontSize:"15px",color:C.muted,marginBottom:"8px"}}>Prefer to talk?</p><a href="tel:8444443114" style={{fontFamily:f.h,fontSize:"18px",fontWeight:700,color:C.gold,textDecoration:"none"}}>📞 (844) 444-3114</a></div>
      </div></section>

      <footer style={{background:C.navyFade,borderTop:`1px solid ${C.navyLight}`,padding:"32px 24px"}}><div style={{maxWidth:"1200px",margin:"0 auto",display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:"12px"}}><div style={{fontFamily:f.h,fontSize:"16px",fontWeight:800,color:C.white}}>JR <span style={{color:C.gold}}>ONE</span> <span style={{fontWeight:400,fontSize:"13px",color:C.muted,marginLeft:"8px"}}>The Superior Soffit & Gutter Experts</span></div><p style={{fontFamily:f.b,fontSize:"12px",color:C.muted}}>© 2026 JR One Aluminum LLC.</p></div></footer>
      <div style={{position:"fixed",bottom:0,left:0,right:0,zIndex:999,background:"rgba(11,22,40,0.97)",backdropFilter:"blur(12px)",borderTop:`1px solid ${C.navyLight}`,padding:"12px 16px",display:"flex",gap:"10px"}}><a href="tel:8444443114" style={{flex:1,display:"flex",alignItems:"center",justifyContent:"center",gap:"6px",padding:"14px",fontFamily:f.h,fontSize:"13px",fontWeight:700,color:C.navy,background:`linear-gradient(135deg,${C.gold},${C.goldLight})`,borderRadius:"8px",textDecoration:"none"}}>📞 CALL NOW</a><button onClick={()=>document.getElementById("quote-form")?.scrollIntoView({behavior:"smooth"})} style={{flex:1,padding:"14px",fontFamily:f.h,fontSize:"13px",fontWeight:700,color:C.gold,background:"transparent",border:`2px solid ${C.gold}`,borderRadius:"8px",cursor:"pointer"}}>FREE INSPECTION</button></div>
      <style>{`*{box-sizing:border-box;margin:0;padding:0}::placeholder{color:#9CA3AF}input:focus{border-color:${C.gold}!important}`}</style>
    </div>
  );
}
