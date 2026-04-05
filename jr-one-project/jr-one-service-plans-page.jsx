import { useState, useEffect } from "react";

const injectFonts = () => { if (typeof document==="undefined"||document.querySelector("#jr-fonts")) return; const l=document.createElement("link"); l.id="jr-fonts"; l.rel="stylesheet"; l.href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800&family=Source+Sans+3:wght@300;400;600&display=swap"; document.head.appendChild(l); };
const C = { bg:"#0B1628",navy:"#1B2A4A",navyMid:"#243556",navyLight:"#2C3E5A",navyFade:"#162033",gold:"#C8952E",goldLight:"#D4A843",goldPale:"rgba(200,149,46,0.12)",cream:"#F5F3EF",white:"#FFFFFF",offWhite:"#E8E4DC",muted:"#7A8FA8",charcoal:"#2D2D2D",success:"#2D8B4E" };
const f = { h:"'Montserrat', sans-serif", b:"'Source Sans 3', sans-serif" };
const Tag = ({children}) => <div style={{display:"inline-block",padding:"6px 16px",background:C.goldPale,borderRadius:"4px",marginBottom:"12px"}}><span style={{fontFamily:f.h,fontSize:"12px",fontWeight:700,color:C.gold,letterSpacing:"3px"}}>{children}</span></div>;
const GoldBar = () => <div style={{width:"60px",height:"3px",background:`linear-gradient(90deg,${C.gold},${C.goldLight})`,borderRadius:"2px",margin:"16px auto"}} />;
const inputStyle = {width:"100%",padding:"13px 16px",fontFamily:f.b,fontSize:"15px",border:"1.5px solid #D1D5DB",borderRadius:"8px",outline:"none",color:C.charcoal,marginBottom:"12px",background:"#FAFAFA",boxSizing:"border-box"};

const PLANS = [
  {
    name:"LEAF CLEANING",
    tag:"BASIC",
    price:"Call for Pricing",
    desc:"Essential debris removal — blow it out, clean it up, get it flowing.",
    features:["Blow off roof debris around gutter line","Blow out all gutters — remove leaves, needles, buildup","Blow out all downspouts to confirm clear flow","Full cleanup of all debris from property","Visual inspection for obvious damage or issues"],
    best:"Homeowners who maintain regularly and need a straightforward seasonal cleanout.",
    border:C.navyLight,
  },
  {
    name:"PREMIUM CLEANING",
    tag:"RECOMMENDED",
    price:"Call for Pricing",
    desc:"Everything in Basic plus a full water flush, gunk removal, and leak sealing.",
    features:["Everything in Leaf Cleaning","Full water wash of all gutters — removes stuck-on gunk and sediment","Complete water flush of all downspouts","Seal any obvious leaking miters (corner joints)","System flow verification — confirm water moves correctly throughout","Written condition report with photos"],
    best:"Most homeowners. The thorough clean that catches problems before they get expensive.",
    border:C.gold,
    highlight:true,
  },
  {
    name:"DELUXE GUARD PACKAGE",
    tag:"PREMIUM",
    price:"Call for Pricing",
    desc:"Complete system restoration — clean, realign, reseal, and protect with new guards.",
    features:["Everything in Premium Cleaning","Resecuring and realigning all gutters","Resecuring and realigning all downspouts","Functional flow testing — make sure everything drains correctly","Resealing ALL miters throughout the system","Professional installation of new leaf guards","Guard system sized and fitted to your specific gutters"],
    best:"Homeowners who want everything dialed in — cleaned, aligned, sealed, and protected.",
    border:C.gold,
  },
];

export default function ServicePlansPage() {
  const [formData, setFormData] = useState({name:"",phone:"",email:"",plan:""});
  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);
  useEffect(() => { injectFonts(); }, []);
  const secTitle = {fontFamily:f.h,fontSize:"clamp(24px,4vw,36px)",fontWeight:800,letterSpacing:"2px",textAlign:"center",marginBottom:"8px"};

  const faqs = [
    { q:"How often should I have my gutters cleaned in Tampa?", a:"We recommend at least twice per year — once before hurricane season (May/June) and once after fall leaf drop (November/December). Homes with heavy tree coverage or pine trees may benefit from quarterly cleaning." },
    { q:"Can I just get a one-time cleaning without a plan?", a:"Yes. All of our cleaning services are available as one-time visits. Plans simply give you the convenience of scheduled service at consistent pricing — you're not locked into a contract." },
    { q:"What's the difference between Leaf Cleaning and Premium Cleaning?", a:"Leaf Cleaning removes debris from your gutters and clears downspouts. Premium Cleaning adds a full system flush to verify flow throughout the entire system, plus resealing of miters (corner joints) and resecuring of downspouts. Premium catches developing problems that basic cleaning misses." },
    { q:"Do you offer the Deluxe Guard Package for existing guard systems?", a:"The Deluxe Guard Package includes new guard installation. If you already have guards, we offer guard maintenance as part of our Premium Cleaning — clearing surface debris, checking attachment points, and ensuring proper function." },
    { q:"What does 'resealing miters' mean?", a:"Miters are the corner joints where two gutter runs meet. Over time, the sealant at these joints can crack or separate, causing leaks. Resealing miters during maintenance prevents these leaks before they damage your fascia or foundation." },
    { q:"Do you service gutters you didn't install?", a:"Yes. Our maintenance services are available for any gutter system, regardless of who installed it. We'll assess the condition and let you know if any repairs are needed beyond cleaning." },
  ];

  return (
    <div style={{background:C.bg,color:C.white,fontFamily:f.b,lineHeight:1.65,minHeight:"100vh"}}>
      <div style={{background:`linear-gradient(90deg,${C.gold},${C.goldLight})`,padding:"10px 24px",textAlign:"center",fontFamily:f.h,fontSize:"13px",fontWeight:600,color:C.navy}}>🧹 Gutter Maintenance Plans Available — Call (844) 444-3114 to Get Started</div>
      <nav style={{position:"sticky",top:0,zIndex:1000,padding:"12px 24px",background:"rgba(11,22,40,0.97)",backdropFilter:"blur(12px)",borderBottom:`1px solid ${C.navyLight}`}}><div style={{maxWidth:"1200px",margin:"0 auto",display:"flex",justifyContent:"space-between",alignItems:"center"}}><a href="/" style={{fontFamily:f.h,fontSize:"20px",fontWeight:800,color:C.white,textDecoration:"none"}}>JR <span style={{color:C.gold}}>ONE</span></a><a href="tel:8444443114" style={{fontFamily:f.h,fontSize:"13px",fontWeight:700,color:C.gold,textDecoration:"none"}}>(844) 444-3114</a></div></nav>

      <section style={{padding:"60px 24px 40px",maxWidth:"900px",margin:"0 auto",textAlign:"center"}}>
        <Tag>SERVICE PLANS</Tag>
        <h1 style={{fontFamily:f.h,fontSize:"clamp(32px,5vw,44px)",fontWeight:800,lineHeight:1.1,marginBottom:"16px"}}>Keep Your Gutters<br/><span style={{color:C.gold}}>Working Year-Round.</span></h1>
        <p style={{fontFamily:f.b,fontSize:"18px",color:C.muted,maxWidth:"650px",margin:"0 auto"}}>Regular maintenance extends your gutter system's lifespan, prevents expensive damage, and keeps your home protected through Florida's toughest weather. Three service levels to fit every home and budget.</p>
      </section>

      {/* PLAN CARDS */}
      <section style={{padding:"20px 24px 80px"}}>
        <div style={{maxWidth:"1100px",margin:"0 auto",display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(300px,1fr))",gap:"24px",alignItems:"start"}}>
          {PLANS.map((plan,i) => (
            <div key={i} style={{background:plan.highlight?C.navyFade:C.navyFade,border:`2px solid ${plan.border}`,borderRadius:"16px",padding:"32px",position:"relative",transform:plan.highlight?"scale(1.03)":"none"}}>
              {plan.highlight && <div style={{position:"absolute",top:"-14px",left:"50%",transform:"translateX(-50%)",background:C.gold,color:C.navy,fontFamily:f.h,fontSize:"11px",fontWeight:700,letterSpacing:"1.5px",padding:"4px 16px",borderRadius:"4px"}}>MOST POPULAR</div>}
              <div style={{fontFamily:f.h,fontSize:"11px",fontWeight:700,color:plan.highlight?C.gold:C.muted,letterSpacing:"2px",marginBottom:"8px"}}>{plan.tag}</div>
              <h3 style={{fontFamily:f.h,fontSize:"22px",fontWeight:800,color:C.white,marginBottom:"8px"}}>{plan.name}</h3>
              <div style={{fontFamily:f.h,fontSize:"18px",fontWeight:700,color:C.gold,marginBottom:"12px"}}>{plan.price}</div>
              <p style={{fontFamily:f.b,fontSize:"15px",color:C.muted,marginBottom:"20px",lineHeight:1.55}}>{plan.desc}</p>
              <div style={{borderTop:`1px solid ${C.navyLight}`,paddingTop:"16px",marginBottom:"16px"}}>
                {plan.features.map((feat,j) => (
                  <div key={j} style={{display:"flex",gap:"10px",marginBottom:"10px",alignItems:"flex-start"}}>
                    <span style={{color:C.gold,fontSize:"14px",flexShrink:0,marginTop:"2px"}}>✓</span>
                    <span style={{fontFamily:f.b,fontSize:"14px",color:C.offWhite}}>{feat}</span>
                  </div>
                ))}
              </div>
              <div style={{background:C.goldPale,borderRadius:"8px",padding:"12px 14px",marginBottom:"20px"}}>
                <span style={{fontFamily:f.h,fontSize:"11px",fontWeight:700,color:C.gold,letterSpacing:"1px"}}>BEST FOR: </span>
                <span style={{fontFamily:f.b,fontSize:"13px",color:C.offWhite}}>{plan.best}</span>
              </div>
              <button onClick={()=>document.getElementById("plan-form")?.scrollIntoView({behavior:"smooth"})} style={{width:"100%",padding:"14px",fontFamily:f.h,fontSize:"13px",fontWeight:700,letterSpacing:"1.5px",color:plan.highlight?C.navy:C.gold,background:plan.highlight?`linear-gradient(135deg,${C.gold},${C.goldLight})`:"transparent",border:plan.highlight?"none":`2px solid ${C.gold}`,borderRadius:"8px",cursor:"pointer"}}>
                {plan.highlight?"GET STARTED":"LEARN MORE"}
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* ADDITIONAL SERVICES */}
      <section style={{background:C.navy,padding:"80px 24px"}}>
        <div style={{maxWidth:"900px",margin:"0 auto",textAlign:"center"}}>
          <Tag>ADDITIONAL SERVICES</Tag>
          <h2 style={{...secTitle,color:C.white}}>À LA CARTE MAINTENANCE</h2>
          <GoldBar />
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(250px,1fr))",gap:"16px",marginTop:"40px",textAlign:"left"}}>
            {[
              {title:"Downspout Repair",price:"✓",desc:"Repair of damaged or disconnected downspout sections, resecuring to structure, and sealing of leak points."},
              {title:"Gutter Guard Re-Installation",price:"✓",desc:"Resecure or reinstall existing gutter guards that have shifted, lifted, or been displaced by storms."},
              {title:"Wood Fascia Replacement",price:"✓",desc:"Repair or replacement of damaged exterior wood fascia, framing, or trim. Custom-cut, secured, and sealed."},
              {title:"General Gutter Repair",price:"✓",desc:"Leak sealing, hanger replacement, realignment, pitch correction — quoted based on scope after inspection."},
            ].map((svc,i) =>
              <div key={i} style={{background:C.navyFade,border:`1px solid ${C.navyLight}`,borderRadius:"12px",padding:"20px"}}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"8px"}}>
                  <h3 style={{fontFamily:f.h,fontSize:"15px",fontWeight:700,color:C.white}}>{svc.title}</h3>
                  <span style={{fontFamily:f.h,fontSize:"16px",color:C.gold}}>{svc.price}</span>
                </div>
                <p style={{fontFamily:f.b,fontSize:"14px",color:C.muted,lineHeight:1.5}}>{svc.desc}</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* WHY MAINTAIN */}
      <section style={{background:C.cream,padding:"80px 24px"}}>
        <div style={{maxWidth:"800px",margin:"0 auto",textAlign:"center"}}>
          <Tag>THE MATH</Tag>
          <h2 style={{...secTitle,color:C.navy}}>MAINTENANCE PAYS FOR ITSELF</h2>
          <GoldBar />
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"24px",marginTop:"40px"}}>
            <div style={{background:C.white,borderRadius:"12px",padding:"28px",borderTop:`3px solid #EF4444`,textAlign:"center"}}>
              <div style={{fontFamily:f.h,fontSize:"13px",fontWeight:700,color:"#EF4444",letterSpacing:"2px",marginBottom:"12px"}}>WITHOUT MAINTENANCE</div>
              <div style={{fontFamily:f.h,fontSize:"28px",fontWeight:800,color:C.navy}}>$4,000–$12,000</div>
              <p style={{fontFamily:f.b,fontSize:"14px",color:"#6B7280",marginTop:"8px"}}>Foundation repair from water damage caused by failed gutters</p>
            </div>
            <div style={{background:C.white,borderRadius:"12px",padding:"28px",borderTop:`3px solid ${C.success}`,textAlign:"center"}}>
              <div style={{fontFamily:f.h,fontSize:"13px",fontWeight:700,color:C.success,letterSpacing:"2px",marginBottom:"12px"}}>WITH MAINTENANCE</div>
              <div style={{fontFamily:f.h,fontSize:"28px",fontWeight:800,color:C.navy}}>$190–$400/year</div>
              <p style={{fontFamily:f.b,fontSize:"14px",color:"#6B7280",marginTop:"8px"}}>Professional cleaning and inspection that catches problems early</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section style={{background:C.bg,padding:"80px 24px"}}>
        <div style={{maxWidth:"800px",margin:"0 auto",textAlign:"center"}}>
          <Tag>FAQ</Tag><h2 style={{...secTitle,color:C.white}}>MAINTENANCE QUESTIONS</h2><GoldBar />
          <div style={{marginTop:"40px",textAlign:"left"}}>{faqs.map((faq,i) => <div key={i} style={{borderBottom:`1px solid ${C.navyLight}`}}><button onClick={()=>setOpenFaq(openFaq===i?null:i)} style={{width:"100%",padding:"20px 0",background:"none",border:"none",cursor:"pointer",display:"flex",justifyContent:"space-between",alignItems:"center",gap:"16px"}}><span style={{fontFamily:f.h,fontSize:"15px",fontWeight:600,color:openFaq===i?C.gold:C.white,textAlign:"left"}}>{faq.q}</span><span style={{fontFamily:f.h,fontSize:"20px",color:C.gold,transform:openFaq===i?"rotate(45deg)":"none",transition:"transform 0.3s",flexShrink:0}}>+</span></button>{openFaq===i&&<div style={{padding:"0 0 20px",fontFamily:f.b,fontSize:"15px",color:C.muted,lineHeight:1.65}}>{faq.a}</div>}</div>)}</div>
        </div>
      </section>

      {/* CTA FORM */}
      <section id="plan-form" style={{background:C.navy,padding:"80px 24px"}}><div style={{maxWidth:"500px",margin:"0 auto",textAlign:"center"}}>
        <h2 style={{fontFamily:f.h,fontSize:"28px",fontWeight:800,color:C.white,marginBottom:"12px"}}>SCHEDULE YOUR MAINTENANCE</h2>
        <p style={{fontFamily:f.b,fontSize:"16px",color:C.offWhite,marginBottom:"32px"}}>Tell us which plan interests you and we'll get you scheduled.</p>
        {submitted ? <div style={{background:"rgba(45,139,78,0.15)",border:`1px solid ${C.success}`,borderRadius:"12px",padding:"32px"}}><div style={{fontSize:"40px",marginBottom:"8px"}}>✓</div><h3 style={{fontFamily:f.h,fontSize:"18px",fontWeight:700,color:"#4ADE80"}}>Request Received!</h3></div> : <div style={{background:C.white,borderRadius:"16px",padding:"28px",textAlign:"left"}}>
          <input style={inputStyle} placeholder="Full Name" value={formData.name} onChange={e=>setFormData({...formData,name:e.target.value})} />
          <input style={inputStyle} placeholder="Phone Number" type="tel" value={formData.phone} onChange={e=>setFormData({...formData,phone:e.target.value})} />
          <input style={inputStyle} placeholder="Email Address" type="email" value={formData.email} onChange={e=>setFormData({...formData,email:e.target.value})} />
          <select style={{...inputStyle,cursor:"pointer"}} value={formData.plan} onChange={e=>setFormData({...formData,plan:e.target.value})}>
            {["Which plan interests you?","Leaf Cleaning (Basic)","Premium Cleaning (Recommended)","Deluxe Guard Package","Not sure — need advice","One-time cleaning only"].map((o,i)=><option key={i} value={i===0?"":o}>{o}</option>)}
          </select>
          <button onClick={()=>setSubmitted(true)} style={{width:"100%",padding:"16px",fontFamily:f.h,fontSize:"13px",fontWeight:700,letterSpacing:"1.5px",color:C.white,background:`linear-gradient(135deg,${C.gold},${C.goldLight})`,border:"none",borderRadius:"8px",cursor:"pointer"}}>SCHEDULE MY MAINTENANCE</button>
        </div>}
      </div></section>

      <footer style={{background:C.navyFade,borderTop:`1px solid ${C.navyLight}`,padding:"32px 24px"}}><div style={{maxWidth:"1200px",margin:"0 auto",display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:"12px"}}><div style={{fontFamily:f.h,fontSize:"16px",fontWeight:800,color:C.white}}>JR <span style={{color:C.gold}}>ONE</span></div><p style={{fontFamily:f.b,fontSize:"12px",color:C.muted}}>© 2026 JR One Aluminum LLC.</p></div></footer>
      <div style={{position:"fixed",bottom:0,left:0,right:0,zIndex:999,background:"rgba(11,22,40,0.97)",backdropFilter:"blur(12px)",borderTop:`1px solid ${C.navyLight}`,padding:"12px 16px",display:"flex",gap:"10px"}}><a href="tel:8444443114" style={{flex:1,display:"flex",alignItems:"center",justifyContent:"center",gap:"6px",padding:"14px",fontFamily:f.h,fontSize:"13px",fontWeight:700,color:C.navy,background:`linear-gradient(135deg,${C.gold},${C.goldLight})`,borderRadius:"8px",textDecoration:"none"}}>📞 CALL NOW</a><button onClick={()=>document.getElementById("plan-form")?.scrollIntoView({behavior:"smooth"})} style={{flex:1,padding:"14px",fontFamily:f.h,fontSize:"13px",fontWeight:700,color:C.gold,background:"transparent",border:`2px solid ${C.gold}`,borderRadius:"8px",cursor:"pointer"}}>SCHEDULE</button></div>
      <style>{`*{box-sizing:border-box;margin:0;padding:0}::placeholder{color:#9CA3AF}input:focus,select:focus{border-color:${C.gold}!important}`}</style>
    </div>
  );
}
