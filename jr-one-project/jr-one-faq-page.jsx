import { useState, useEffect } from "react";

const injectFonts = () => { if (typeof document==="undefined"||document.querySelector("#jr-fonts")) return; const l=document.createElement("link"); l.id="jr-fonts"; l.rel="stylesheet"; l.href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800&family=Source+Sans+3:wght@300;400;600&display=swap"; document.head.appendChild(l); };
const C = { bg:"#0B1628",navy:"#1B2A4A",navyMid:"#243556",navyLight:"#2C3E5A",navyFade:"#162033",gold:"#C8952E",goldLight:"#D4A843",goldPale:"rgba(200,149,46,0.12)",cream:"#F5F3EF",white:"#FFFFFF",offWhite:"#E8E4DC",muted:"#7A8FA8",charcoal:"#2D2D2D" };
const f = { h:"'Montserrat', sans-serif", b:"'Source Sans 3', sans-serif" };
const Tag = ({children}) => <div style={{display:"inline-block",padding:"6px 16px",background:C.goldPale,borderRadius:"4px",marginBottom:"12px"}}><span style={{fontFamily:f.h,fontSize:"12px",fontWeight:700,color:C.gold,letterSpacing:"3px"}}>{children}</span></div>;
const GoldBar = () => <div style={{width:"60px",height:"3px",background:`linear-gradient(90deg,${C.gold},${C.goldLight})`,borderRadius:"2px",margin:"16px auto"}} />;

const CATEGORIES = [
  { name:"General", icon:"🏠", faqs:[
    {q:"What services does JR One offer?",a:"We specialize in seamless aluminum gutters (5\", 6\", 7\"), copper gutters, gutter guards, soffit and fascia installation, siding, gutter repair and cleaning, Peak 301 roof rejuvenation, Govee smart light installation, and comprehensive maintenance plans. We're aluminum exterior specialists — that's all we do, and we do it right."},
    {q:"What areas do you serve?",a:"We serve 20+ cities across Tampa Bay and Florida's west coast including Tampa, Clearwater, St. Petersburg, Sarasota, Bradenton, Lakeland, Brandon, Wesley Chapel, Palm Harbor, Riverview, New Port Richey, Largo, Spring Hill, and surrounding communities."},
    {q:"Do you use subcontractors?",a:"Never. Every person on your property is a trained, full-time JR One crew member. This is how we maintain quality control and accountability on every job. Many of the complaints homeowners have about other contractors come from subcontracted work — we eliminated that problem entirely."},
    {q:"How long has JR One been in business?",a:"Our roots go back to 1990 when our founder Javier Rivera began installing gutters in Tampa. The business has been serving Tampa Bay for over 30 years across two generations."},
    {q:"Do you speak Spanish?",a:"Yes. Our team is fully bilingual — English and Spanish. We communicate in whichever language you're most comfortable with from the first call through final walkthrough."},
    {q:"Do you offer free estimates?",a:"Yes. We provide free on-site assessments for all services. We'll inspect your home, discuss your needs, and provide a detailed, transparent estimate with no obligation and no pressure."},
  ]},
  { name:"Gutters", icon:"💧", faqs:[
    {q:"How much do new gutters cost in Tampa?",a:"Seamless aluminum gutter installation in Tampa typically ranges from $11–$20 per linear foot depending on gutter size (5\", 6\", or 7\"), accessibility, number of corners, and downspout configuration. We provide detailed, line-item estimates so you see exactly what you're paying for."},
    {q:"What's the difference between 5\", 6\", and 7\" gutters?",a:"The number refers to the width of the gutter opening. 5\" handles standard residential water flow. 6\" handles larger roof areas and steeper pitches. 7\" is commercial-grade capacity for maximum water handling. We assess your home and recommend the right size — we don't default to the cheapest option."},
    {q:"How long do seamless gutters last?",a:"With proper maintenance, quality seamless aluminum gutters last 20+ years in Florida's climate. Factors like tree coverage, maintenance frequency, and weather exposure affect the exact lifespan."},
    {q:"How long does gutter installation take?",a:"Most residential gutter installations are completed in a single day. Homes with complex rooflines or combined projects (gutters + soffit/fascia) may take 2-3 days."},
    {q:"Do you offer copper gutters?",a:"Yes. We install premium copper half-round and K-style gutter systems with matching copper downspouts, leader heads, and rain chains. Copper is a lifetime investment — 50+ years of maintenance-free performance. Call us for a copper consultation."},
    {q:"Why should I hire a gutter specialist instead of my roofer?",a:"Roofing companies typically subcontract gutter work to the lowest bidder. The result is often incorrect pitch, thin-gauge material, and poor corner work. We specialize exclusively in aluminum systems and every installation is performed by our trained in-house crew."},
  ]},
  { name:"Gutter Guards", icon:"🛡️", faqs:[
    {q:"Do gutter guards really work?",a:"Yes — guards are highly effective at keeping debris out of your gutters and preventing clogs in downspouts and drainage. They don't eliminate all maintenance, but they dramatically reduce how often you need to clean and make the cleanings much easier when you do."},
    {q:"Do I still need to clean my gutters after guards are installed?",a:"Yes, but much less often. Guards keep debris from getting inside your gutters — that's the real damage-causing problem. Surface buildup on top of guards still needs occasional clearing. We offer maintenance programs to handle this for you."},
    {q:"What's the best gutter guard for pine needles?",a:"Micro mesh guards are the most effective option for pine needles. Standard screen guards have openings large enough for needles to pass through."},
    {q:"What's the difference between your guards and LeafFilter?",a:"National companies like LeafFilter use high-pressure sales, charge premium prices, and subcontract installation. We're the local team — you deal directly with us, get honest pricing without franchise markup, and our crew does both consultation and install."},
  ]},
  { name:"Soffit & Fascia", icon:"🏗️", faqs:[
    {q:"What's the difference between soffit and fascia?",a:"Soffit is the horizontal panel underneath your roof overhang. Fascia is the vertical board along the edge of your roofline where gutters attach. Together they seal and protect the edges of your roof structure."},
    {q:"Should I choose aluminum or vinyl soffit?",a:"For Florida, we generally recommend aluminum — it's more durable in extreme heat, handles impact better during storms, and lasts longer. Vinyl is a solid budget option. We assess your situation and give an honest recommendation."},
    {q:"Do you repair the wood underneath?",a:"Yes — and this is critical. We inspect and replace any rotted wood substrate before installing new material. Some companies skip this and wrap new soffit over rotten wood. We fix the problem first."},
    {q:"How do I know if my soffit or fascia needs replacing?",a:"Look for paint peeling, visible staining, sagging panels, holes or cracks, soft spots, pest activity near your roofline, or detached pieces. If your home is 15+ years old with original wood soffit, it's worth an inspection."},
  ]},
  { name:"Peak 301", icon:"🏠", faqs:[
    {q:"What is Peak 301?",a:"Peak 301 is an all-natural, soy-based roof rejuvenation sealant that penetrates into your shingle material and restores the oils that UV and heat have depleted. It is not a coating, paint, or spray — it works from the inside of the shingle out. It adds 6-10 years of life to your existing roof."},
    {q:"Will Peak 301 help me keep my homeowner's insurance?",a:"That's one of its biggest benefits. Florida insurers are dropping coverage on roofs over 15 years old. Peak 301 comes with warranty documentation demonstrating your roof has been professionally rejuvenated — the documentation insurers need to see."},
    {q:"How much does Peak 301 cost vs. roof replacement?",a:"Peak 301 treatment costs under 15% of what a full roof replacement would cost. For most Tampa homes, that's thousands instead of $15,000-$25,000+."},
  ]},
  { name:"Warranty & Financing", icon:"📋", faqs:[
    {q:"What warranty do you offer?",a:"We provide a 3-year workmanship warranty from the date of substantial completion. This covers defects in our labor that materially affect system performance under normal residential use. If our work fails because of how we installed it, we come back and fix it at no cost."},
    {q:"Do you offer financing?",a:"Yes. We partner with trusted third-party financing providers so you can protect your home now and pay over time. Quick approval, flexible terms, and no impact on your project pricing."},
    {q:"Do I need good credit to qualify for financing?",a:"Our financing partners work with a range of credit profiles. The initial check is typically a soft pull that doesn't affect your credit score."},
    {q:"How do I make a warranty claim?",a:"Call (844) 444-3114 or email jrone.business@gmail.com. We don't make warranty claims difficult — we'd rather fix a problem fast than argue about it."},
  ]},
  { name:"Maintenance", icon:"🧹", faqs:[
    {q:"How often should I have my gutters cleaned?",a:"In Tampa Bay, at least twice per year — once before hurricane season (May/June) and once after fall leaf drop (November/December). Homes with heavy tree coverage may need quarterly cleaning."},
    {q:"What's included in your maintenance plans?",a:"We offer three tiers: Basic (blow out gutters, downspouts, and roof line), Premium (everything in basic plus water wash, flush, and miter sealing), and Deluxe (everything in premium plus full realignment, resecuring, and new leaf guard installation). Call for details and pricing."},
    {q:"Do you service gutters you didn't install?",a:"Yes. Our maintenance services are available for any gutter system regardless of who installed it."},
  ]},
];

export default function FAQPage() {
  const [activeCategory, setActiveCategory] = useState("General");
  const [openFaq, setOpenFaq] = useState(null);
  useEffect(() => { injectFonts(); }, []);
  const secTitle = {fontFamily:f.h,fontSize:"clamp(24px,4vw,36px)",fontWeight:800,letterSpacing:"2px",textAlign:"center",marginBottom:"8px"};
  const activeCat = CATEGORIES.find(c => c.name === activeCategory);

  return (
    <div style={{background:C.bg,color:C.white,fontFamily:f.b,lineHeight:1.65,minHeight:"100vh"}}>
      <div style={{background:`linear-gradient(90deg,${C.gold},${C.goldLight})`,padding:"10px 24px",textAlign:"center",fontFamily:f.h,fontSize:"13px",fontWeight:600,color:C.navy}}>🏠 FREE Gutter Guards with Full House Gutter Installation — Call (844) 444-3114</div>
      <nav style={{position:"sticky",top:0,zIndex:1000,padding:"12px 24px",background:"rgba(11,22,40,0.97)",backdropFilter:"blur(12px)",borderBottom:`1px solid ${C.navyLight}`}}><div style={{maxWidth:"1200px",margin:"0 auto",display:"flex",justifyContent:"space-between",alignItems:"center"}}><a href="/" style={{fontFamily:f.h,fontSize:"20px",fontWeight:800,color:C.white,textDecoration:"none"}}>JR <span style={{color:C.gold}}>ONE</span></a><a href="tel:8444443114" style={{fontFamily:f.h,fontSize:"13px",fontWeight:700,color:C.gold,textDecoration:"none"}}>(844) 444-3114</a></div></nav>

      <section style={{padding:"60px 24px 20px",maxWidth:"900px",margin:"0 auto",textAlign:"center"}}>
        <Tag>FAQ</Tag>
        <h1 style={{fontFamily:f.h,fontSize:"clamp(32px,5vw,44px)",fontWeight:800,lineHeight:1.1,marginBottom:"16px"}}>Frequently Asked<br/><span style={{color:C.gold}}>Questions</span></h1>
        <p style={{fontFamily:f.b,fontSize:"18px",color:C.muted,maxWidth:"600px",margin:"0 auto"}}>Everything homeowners ask us — answered honestly. Can't find your question? Call (844) 444-3114 and we'll answer it directly.</p>
      </section>

      {/* CATEGORY TABS */}
      <section style={{padding:"20px 24px 0"}}>
        <div style={{maxWidth:"900px",margin:"0 auto",display:"flex",flexWrap:"wrap",justifyContent:"center",gap:"8px"}}>
          {CATEGORIES.map((cat,i) => (
            <button key={i} onClick={()=>{setActiveCategory(cat.name);setOpenFaq(null);}} style={{
              padding:"10px 18px",fontFamily:f.h,fontSize:"13px",fontWeight:600,
              background:activeCategory===cat.name?C.gold:C.navyFade,
              color:activeCategory===cat.name?C.navy:C.muted,
              border:`1px solid ${activeCategory===cat.name?C.gold:C.navyLight}`,
              borderRadius:"8px",cursor:"pointer",transition:"all 0.2s"
            }}>{cat.icon} {cat.name}</button>
          ))}
        </div>
      </section>

      {/* FAQ LIST */}
      <section style={{padding:"40px 24px 80px"}}>
        <div style={{maxWidth:"800px",margin:"0 auto"}}>
          <h2 style={{fontFamily:f.h,fontSize:"20px",fontWeight:700,color:C.gold,marginBottom:"24px"}}>{activeCat?.icon} {activeCat?.name}</h2>
          {activeCat?.faqs.map((faq,i) => (
            <div key={i} style={{borderBottom:`1px solid ${C.navyLight}`}}>
              <button onClick={()=>setOpenFaq(openFaq===i?null:i)} style={{width:"100%",padding:"20px 0",background:"none",border:"none",cursor:"pointer",display:"flex",justifyContent:"space-between",alignItems:"center",gap:"16px"}}>
                <span style={{fontFamily:f.h,fontSize:"15px",fontWeight:600,color:openFaq===i?C.gold:C.white,textAlign:"left",transition:"color 0.2s"}}>{faq.q}</span>
                <span style={{fontFamily:f.h,fontSize:"20px",color:C.gold,transform:openFaq===i?"rotate(45deg)":"none",transition:"transform 0.3s",flexShrink:0}}>+</span>
              </button>
              {openFaq===i && <div style={{padding:"0 0 20px",fontFamily:f.b,fontSize:"15px",color:C.muted,lineHeight:1.65}}>{faq.a}</div>}
            </div>
          ))}
        </div>
      </section>

      {/* STILL HAVE QUESTIONS */}
      <section style={{background:C.navy,padding:"60px 24px",textAlign:"center"}}>
        <h2 style={{fontFamily:f.h,fontSize:"28px",fontWeight:800,color:C.white,marginBottom:"12px"}}>STILL HAVE QUESTIONS?</h2>
        <p style={{fontFamily:f.b,fontSize:"16px",color:C.offWhite,marginBottom:"24px",maxWidth:"500px",margin:"0 auto 24px"}}>We'd rather answer your question directly than have you guess. Call or text us — we respond fast.</p>
        <div style={{display:"flex",gap:"16px",justifyContent:"center",flexWrap:"wrap"}}>
          <a href="tel:8444443114" style={{display:"inline-flex",alignItems:"center",gap:"8px",padding:"16px 32px",fontFamily:f.h,fontSize:"14px",fontWeight:700,letterSpacing:"1.5px",color:C.navy,background:`linear-gradient(135deg,${C.gold},${C.goldLight})`,borderRadius:"8px",textDecoration:"none"}}>📞 (844) 444-3114</a>
          <a href="mailto:jrone.business@gmail.com" style={{padding:"16px 32px",fontFamily:f.h,fontSize:"14px",fontWeight:700,letterSpacing:"1.5px",color:C.gold,border:`2px solid ${C.gold}`,borderRadius:"8px",textDecoration:"none"}}>EMAIL US</a>
        </div>
      </section>

      <footer style={{background:C.navyFade,borderTop:`1px solid ${C.navyLight}`,padding:"32px 24px"}}><div style={{maxWidth:"1200px",margin:"0 auto",display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:"12px"}}><div style={{fontFamily:f.h,fontSize:"16px",fontWeight:800,color:C.white}}>JR <span style={{color:C.gold}}>ONE</span></div><p style={{fontFamily:f.b,fontSize:"12px",color:C.muted}}>© 2026 JR One Aluminum LLC.</p></div></footer>
      <style>{`*{box-sizing:border-box;margin:0;padding:0}`}</style>
    </div>
  );
}
