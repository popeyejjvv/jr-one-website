import { useState, useEffect } from "react";

const injectFonts = () => { if (typeof document==="undefined"||document.querySelector("#jr-fonts")) return; const l=document.createElement("link"); l.id="jr-fonts"; l.rel="stylesheet"; l.href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800&family=Source+Sans+3:wght@300;400;600&display=swap"; document.head.appendChild(l); };
const C = { bg:"#0B1628",navy:"#1B2A4A",navyMid:"#243556",navyLight:"#2C3E5A",navyFade:"#162033",gold:"#C8952E",goldLight:"#D4A843",goldPale:"rgba(200,149,46,0.12)",cream:"#F5F3EF",white:"#FFFFFF",offWhite:"#E8E4DC",muted:"#7A8FA8",charcoal:"#2D2D2D",success:"#2D8B4E",successDim:"rgba(45,139,78,0.15)",alert:"#B11A21",alertDim:"rgba(177,26,33,0.12)" };
const f = { h:"'Montserrat', sans-serif", b:"'Source Sans 3', sans-serif" };
const Tag = ({children}) => <div style={{display:"inline-block",padding:"6px 16px",background:C.goldPale,borderRadius:"4px",marginBottom:"12px"}}><span style={{fontFamily:f.h,fontSize:"12px",fontWeight:700,color:C.gold,letterSpacing:"3px"}}>{children}</span></div>;
const GoldBar = () => <div style={{width:"60px",height:"3px",background:`linear-gradient(90deg,${C.gold},${C.goldLight})`,borderRadius:"2px",margin:"16px auto"}} />;

const PAGE = {
  breadcrumb: ["Home","Referral Program"],
  heroTag: "REFERRAL PROGRAM",
  heroH1: "Send Us a Customer.",
  heroH1Gold: "Earn a Reward.",
  heroP: "Whether you're a homeowner who loved our work, an insurance agent helping clients with aging roofs, a roofer who needs a trusted aluminum partner, or a real estate agent preparing homes for sale — when your referral becomes a customer, you get paid. Simple.",

  stats: [
    { value:"$80", label:"Gift card for every qualifying referral" },
    { value:"10%", label:"Off next service for referred customers" },
    { value:"$880", label:"Minimum project value to qualify" },
    { value:"ALL", label:"Services qualify — gutters, soffit, fascia, Peak 301" },
  ],

  howItWorks: [
    { num:"01", title:"REFER", desc:"Send us a customer — by phone, email, or through our website. Give us their name and contact info, and let them know you're referring them to JR One. That's it." },
    { num:"02", title:"WE SERVE", desc:"We handle everything from there. Your referral gets a professional consultation, transparent pricing, and the same quality service that earned your trust in the first place." },
    { num:"03", title:"THEY SIGN", desc:"When your referral signs a contract and provides a deposit on a qualifying project ($880 minimum), your reward is triggered. No fine print, no waiting months." },
    { num:"04", title:"YOU EARN", desc:"You receive an $80 gift card. Your referral receives 10% off their next service with us — creating a built-in reason for them to come back, which means another potential referral for you." },
  ],

  whoCanRefer: [
    { icon:"🏠", title:"Homeowners", desc:"Had work done with us? Love the results? Tell your neighbors, friends, and family. Every qualifying referral earns you an $80 gift card — and they get 10% off their next service with us." },
    { icon:"📋", title:"Insurance Agents", desc:"Have clients facing non-renewal notices over roof age? Peak 301 roof rejuvenation is a legitimate, legally-backed alternative to full replacement. Refer your client to us, help them keep their coverage, and earn $80 per qualifying referral. We handle the treatment and inspector certification coordination — your client gets the documentation their carrier needs." },
    { icon:"🔨", title:"Roofers & General Contractors", desc:"You do roofs — we do gutters, soffit, fascia, and Peak 301. Instead of subcontracting aluminum work to someone you can't vouch for, refer your clients to a specialist. We make you look good, and you earn $80 per qualifying job." },
    { icon:"🏡", title:"Real Estate Agents", desc:"Preparing a home for sale? Curb appeal matters. Aging gutters, damaged soffit, worn fascia — these are the details buyers notice. Refer your sellers to us for the exterior work that closes deals, and earn $80 per qualifying project." },
    { icon:"🏢", title:"Property Managers", desc:"Managing multiple properties with ongoing exterior maintenance needs? One referral per property, every time there's qualifying work. The $80 adds up fast when you're managing a portfolio." },
    { icon:"🤝", title:"Anyone", desc:"You don't need a title or a business to refer. If you know someone who needs gutters, soffit, fascia, or roof rejuvenation in Tampa Bay, send them our way. If the project qualifies, you earn." },
  ],

  services: [
    { name:"Seamless Gutters", desc:"5\" and 7\" seamless aluminum gutter installation", qualifies:true },
    { name:"Gutter Guards", desc:"Micro mesh and screen gutter protection systems", qualifies:true },
    { name:"Gutter Repair", desc:"Realignment, resealing, downspout repair, and replacement", qualifies:true },
    { name:"Soffit Replacement", desc:"Aluminum soffit panel installation and wood repair", qualifies:true },
    { name:"Fascia Replacement", desc:"Aluminum fascia wrap and wood substrate repair", qualifies:true },
    { name:"Peak 301 Roof Rejuvenation", desc:"Soy-based shingle rejuvenation with warranty documentation", qualifies:true },
    { name:"Siding", desc:"Aluminum siding installation and replacement", qualifies:true },
    { name:"Copper Work", desc:"Custom copper gutter and accent installations", qualifies:true },
    { name:"Govee Permanent Lights", desc:"Smart permanent LED lighting systems", qualifies:true },
    { name:"Maintenance Plans", desc:"Recurring gutter cleaning and maintenance", qualifies:true },
  ],

  insuranceAgentSection: {
    tag: "FOR INSURANCE AGENTS",
    title: "YOUR CLIENTS ARE PANICKING ABOUT ROOF AGE.",
    titleGold: "GIVE THEM A REAL OPTION.",
    desc: "When your client gets a non-renewal notice because their roof is 15+ years old, they have two choices: spend $15,000–$25,000 on a full replacement, or explore roof rejuvenation. Peak 301 treatment costs under 15% of replacement, restores shingle flexibility, and comes with warranty documentation and a Remaining Useful Life certification that Florida law requires carriers to accept.",
    benefits: [
      "Your client keeps their coverage without a $20K roof replacement",
      "You retain the client instead of losing them to a carrier that won't write older roofs",
      "You earn $80 per qualifying referral — with no cap",
      "We handle everything: assessment, treatment, inspector coordination, documentation",
      "We provide your client with a complete insurance toolkit including letter templates and rights summaries",
      "Bilingual service — we serve English and Spanish speaking homeowners"
    ]
  },

  faqs: [
    { q:"How do I submit a referral?", a:"Call us at (844) 444-3114 and let us know you're referring someone, or email info@jronegutters.com with the referral's name and contact info. You can also have your referral mention your name when they contact us. We track every referral by name." },
    { q:"When do I get paid?", a:"Your $80 gift card is issued once your referral signs a contract and provides a deposit or first payment on a qualifying project. We don't make you wait until the project is completed — once the commitment is made, your reward is earned." },
    { q:"What counts as a qualifying project?", a:"Any JR One service with a minimum project value of $880. This includes gutters, guards, soffit, fascia, siding, copper work, Peak 301 roof rejuvenation, Govee lights, and maintenance plans that meet the minimum." },
    { q:"Is there a limit to how many referrals I can send?", a:"No cap. Send one, send fifty. Every qualifying referral earns an $80 gift card. If you're an insurance agent or contractor sending multiple referrals per month, contact us to discuss a partnership tier." },
    { q:"What does the referred customer get?", a:"The person you refer receives 10% off their next service with us. This discount applies to any future qualifying project — not the initial one. It's designed to bring them back as a repeat customer." },
    { q:"Can I refer someone for Peak 301 specifically?", a:"Yes — Peak 301 roof rejuvenation is one of our qualifying services. If you're an insurance agent, this is the most common referral scenario: a homeowner facing insurance pressure over roof age who needs an alternative to full replacement." },
    { q:"Do both parties need to be in your service area?", a:"The referred customer needs to be in our service area (Ruskin north through Tampa, St. Pete, Clearwater, and New Port Richey). You can be located anywhere." },
    { q:"¿El programa está disponible en español?", a:"Sí. Nuestro programa de referidos funciona igual en español. Llámenos al (844) 444-3114 o envíe un correo electrónico a info@jronegutters.com. Somos una empresa bilingüe — atendemos a clientes en inglés y español." },
  ],

  ctaTitle: "START REFERRING TODAY",
  ctaSub: "One phone call. One name. That's all it takes to earn $80 and help someone protect their home.",
};

export default function ReferralPage() {
  const [openFaq, setOpenFaq] = useState(null);
  useEffect(() => { injectFonts(); }, []);
  const sec = {padding:"80px 24px",maxWidth:"1200px",margin:"0 auto"};
  const secTitle = {fontFamily:f.h,fontSize:"clamp(24px,4vw,36px)",fontWeight:800,letterSpacing:"2px",textAlign:"center",marginBottom:"8px"};

  return (
    <div style={{background:C.bg,color:C.white,fontFamily:f.b,lineHeight:1.65,minHeight:"100vh"}}>
      {/* NAV */}
      <nav style={{position:"sticky",top:0,zIndex:1000,padding:"12px 24px",background:"rgba(11,22,40,0.97)",backdropFilter:"blur(12px)",borderBottom:`1px solid ${C.navyLight}`}}><div style={{maxWidth:"1200px",margin:"0 auto",display:"flex",justifyContent:"space-between",alignItems:"center"}}><a href="/" style={{fontFamily:f.h,fontSize:"20px",fontWeight:800,color:C.white,textDecoration:"none"}}>JR <span style={{color:C.gold}}>ONE</span></a><a href="tel:8444443114" style={{fontFamily:f.h,fontSize:"13px",fontWeight:700,color:C.gold,textDecoration:"none"}}>(844) 444-3114</a></div></nav>

      {/* BREADCRUMB */}
      <div style={{padding:"16px 24px 0",maxWidth:"1200px",margin:"0 auto"}}><div style={{fontFamily:f.b,fontSize:"13px",color:C.muted}}>{PAGE.breadcrumb.map((item,i) => <span key={i}>{i>0&&<span style={{margin:"0 8px",opacity:0.5}}>/</span>}<span style={{color:i===PAGE.breadcrumb.length-1?C.gold:C.muted}}>{item}</span></span>)}</div></div>

      {/* HERO */}
      <section style={{padding:"60px 24px 80px",maxWidth:"1200px",margin:"0 auto"}}>
        <div style={{maxWidth:"800px"}}>
          <Tag>{PAGE.heroTag}</Tag>
          <h1 style={{fontFamily:f.h,fontSize:"clamp(32px,5vw,48px)",fontWeight:800,lineHeight:1.1,marginBottom:"20px"}}>{PAGE.heroH1}<br/><span style={{color:C.gold}}>{PAGE.heroH1Gold}</span></h1>
          <p style={{fontFamily:f.b,fontSize:"18px",color:C.offWhite,lineHeight:1.7,marginBottom:"32px",maxWidth:"680px"}}>{PAGE.heroP}</p>
          <div style={{display:"flex",gap:"16px",flexWrap:"wrap"}}>
            <a href="tel:8444443114" style={{padding:"16px 36px",fontFamily:f.h,fontSize:"14px",fontWeight:700,letterSpacing:"1.5px",color:C.white,background:`linear-gradient(135deg,${C.gold},${C.goldLight})`,border:"none",borderRadius:"8px",textDecoration:"none",boxShadow:"0 4px 16px rgba(200,149,46,0.3)"}}>REFER SOMEONE NOW</a>
            <a href="mailto:info@jronegutters.com?subject=Referral" style={{display:"inline-flex",alignItems:"center",padding:"16px 36px",fontFamily:f.h,fontSize:"14px",fontWeight:700,letterSpacing:"1.5px",color:C.gold,border:`2px solid ${C.gold}`,borderRadius:"8px",textDecoration:"none"}}>✉️ EMAIL A REFERRAL</a>
          </div>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))",gap:"20px",marginTop:"56px"}}>
          {PAGE.stats.map((s,i) => <div key={i} style={{background:C.navyFade,border:`1px solid ${C.navyLight}`,borderRadius:"12px",padding:"24px",textAlign:"center"}}>
            <div style={{fontFamily:f.h,fontSize:"clamp(22px,3vw,32px)",fontWeight:800,color:C.gold,marginBottom:"6px"}}>{s.value}</div>
            <div style={{fontFamily:f.b,fontSize:"13px",color:C.muted,lineHeight:1.4}}>{s.label}</div>
          </div>)}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section style={{background:C.navy,padding:"80px 24px"}}>
        <div style={sec}>
          <div style={{textAlign:"center"}}>
            <Tag>HOW IT WORKS</Tag>
            <h2 style={{...secTitle,color:C.white}}>4 STEPS. THAT'S IT.</h2>
            <GoldBar />
          </div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(250px,1fr))",gap:"24px",marginTop:"48px"}}>
            {PAGE.howItWorks.map((step,i) => <div key={i} style={{background:C.navyFade,border:`1px solid ${C.navyLight}`,borderRadius:"12px",padding:"28px",position:"relative"}}>
              <div style={{fontFamily:f.h,fontSize:"36px",fontWeight:800,color:"rgba(200,149,46,0.08)",position:"absolute",top:"16px",right:"20px"}}>{step.num}</div>
              <div style={{fontFamily:f.h,fontSize:"11px",fontWeight:700,color:C.gold,letterSpacing:"3px",marginBottom:"8px"}}>STEP {step.num}</div>
              <h3 style={{fontFamily:f.h,fontSize:"22px",fontWeight:700,color:C.white,marginBottom:"12px"}}>{step.title}</h3>
              <p style={{fontFamily:f.b,fontSize:"15px",color:C.muted,lineHeight:1.6}}>{step.desc}</p>
            </div>)}
          </div>
        </div>
      </section>

      {/* WHO CAN REFER */}
      <section style={{background:C.bg,padding:"80px 24px"}}>
        <div style={sec}>
          <div style={{textAlign:"center"}}>
            <Tag>WHO CAN REFER</Tag>
            <h2 style={{...secTitle,color:C.white}}>EVERYONE EARNS</h2>
            <GoldBar />
          </div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(340px,1fr))",gap:"20px",marginTop:"48px"}}>
            {PAGE.whoCanRefer.map((item,i) => <div key={i} style={{background:C.navyFade,border:`1px solid ${C.navyLight}`,borderRadius:"12px",padding:"28px",transition:"border-color 0.3s"}} onMouseOver={e=>e.currentTarget.style.borderColor=C.gold} onMouseOut={e=>e.currentTarget.style.borderColor=C.navyLight}>
              <div style={{fontSize:"32px",marginBottom:"12px"}}>{item.icon}</div>
              <h3 style={{fontFamily:f.h,fontSize:"17px",fontWeight:700,color:C.white,marginBottom:"10px"}}>{item.title}</h3>
              <p style={{fontFamily:f.b,fontSize:"15px",color:C.muted,lineHeight:1.6}}>{item.desc}</p>
            </div>)}
          </div>
        </div>
      </section>

      {/* INSURANCE AGENT SPOTLIGHT */}
      <section style={{background:`linear-gradient(135deg, #1a1a0a, ${C.navy})`,padding:"80px 24px",borderTop:`2px solid ${C.gold}`,borderBottom:`2px solid ${C.gold}`}}>
        <div style={{maxWidth:"900px",margin:"0 auto"}}>
          <div style={{textAlign:"center"}}>
            <Tag>{PAGE.insuranceAgentSection.tag}</Tag>
            <h2 style={{fontFamily:f.h,fontSize:"clamp(22px,3.5vw,32px)",fontWeight:800,color:C.white,marginBottom:"4px"}}>{PAGE.insuranceAgentSection.title}</h2>
            <h2 style={{fontFamily:f.h,fontSize:"clamp(22px,3.5vw,32px)",fontWeight:800,color:C.gold,marginBottom:"16px"}}>{PAGE.insuranceAgentSection.titleGold}</h2>
            <GoldBar />
            <p style={{fontFamily:f.b,fontSize:"16px",color:C.offWhite,lineHeight:1.7,maxWidth:"700px",margin:"0 auto 40px"}}>{PAGE.insuranceAgentSection.desc}</p>
          </div>
          <div style={{display:"grid",gap:"12px"}}>
            {PAGE.insuranceAgentSection.benefits.map((b,i) => <div key={i} style={{display:"flex",gap:"12px",alignItems:"center",background:C.goldPale,borderRadius:"8px",padding:"16px 20px"}}>
              <span style={{fontFamily:f.h,fontSize:"16px",color:C.gold,flexShrink:0}}>✓</span>
              <p style={{fontFamily:f.b,fontSize:"15px",color:C.white}}>{b}</p>
            </div>)}
          </div>
          <div style={{textAlign:"center",marginTop:"40px"}}>
            <a href="tel:8444443114" style={{padding:"16px 36px",fontFamily:f.h,fontSize:"14px",fontWeight:700,letterSpacing:"1.5px",color:C.white,background:`linear-gradient(135deg,${C.gold},${C.goldLight})`,borderRadius:"8px",textDecoration:"none",boxShadow:"0 4px 16px rgba(200,149,46,0.3)"}}>BECOME A REFERRAL PARTNER</a>
          </div>
        </div>
      </section>

      {/* QUALIFYING SERVICES */}
      <section style={{background:C.navy,padding:"80px 24px"}}>
        <div style={{maxWidth:"800px",margin:"0 auto"}}>
          <div style={{textAlign:"center"}}>
            <Tag>QUALIFYING SERVICES</Tag>
            <h2 style={{...secTitle,color:C.white}}>WHAT COUNTS</h2>
            <GoldBar />
            <p style={{fontFamily:f.b,fontSize:"15px",color:C.muted,marginBottom:"40px"}}>Any of these services with a minimum project value of $880 qualifies for the referral program.</p>
          </div>
          <div style={{display:"grid",gap:"8px"}}>
            {PAGE.services.map((svc,i) => <div key={i} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"16px 20px",background:C.navyFade,borderRadius:"8px",border:`1px solid ${C.navyLight}`}}>
              <div>
                <span style={{fontFamily:f.h,fontSize:"14px",fontWeight:700,color:C.white}}>{svc.name}</span>
                <span style={{fontFamily:f.b,fontSize:"13px",color:C.muted,marginLeft:"12px"}}>{svc.desc}</span>
              </div>
              <span style={{fontFamily:f.h,fontSize:"12px",fontWeight:700,color:C.success,letterSpacing:"1px",flexShrink:0}}>✓ QUALIFIES</span>
            </div>)}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section style={{background:C.bg,padding:"80px 24px"}}>
        <div style={{maxWidth:"800px",margin:"0 auto",textAlign:"center"}}>
          <Tag>FAQ</Tag>
          <h2 style={{...secTitle,color:C.white}}>REFERRAL PROGRAM QUESTIONS</h2>
          <GoldBar />
          <div style={{marginTop:"40px",textAlign:"left"}}>
            {PAGE.faqs.map((faq,i) => <div key={i} style={{borderBottom:`1px solid ${C.navyLight}`}}>
              <button onClick={()=>setOpenFaq(openFaq===i?null:i)} style={{width:"100%",padding:"20px 0",background:"none",border:"none",cursor:"pointer",display:"flex",justifyContent:"space-between",alignItems:"center",gap:"16px"}}>
                <span style={{fontFamily:f.h,fontSize:"15px",fontWeight:600,color:openFaq===i?C.gold:C.white,textAlign:"left",transition:"color 0.2s"}}>{faq.q}</span>
                <span style={{fontFamily:f.h,fontSize:"20px",color:C.gold,transform:openFaq===i?"rotate(45deg)":"none",transition:"transform 0.3s",flexShrink:0}}>+</span>
              </button>
              {openFaq===i&&<div style={{padding:"0 0 20px",fontFamily:f.b,fontSize:"15px",color:C.muted,lineHeight:1.65}}>{faq.a}</div>}
            </div>)}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{background:`linear-gradient(165deg,${C.navyMid},${C.navy})`,padding:"80px 24px"}}>
        <div style={{maxWidth:"700px",margin:"0 auto",textAlign:"center"}}>
          <h2 style={{fontFamily:f.h,fontSize:"clamp(28px,5vw,40px)",fontWeight:800,color:C.white,marginBottom:"12px"}}>{PAGE.ctaTitle}</h2>
          <p style={{fontFamily:f.b,fontSize:"17px",color:C.offWhite,marginBottom:"40px"}}>{PAGE.ctaSub}</p>
          <div style={{display:"flex",gap:"16px",justifyContent:"center",flexWrap:"wrap"}}>
            <a href="tel:8444443114" style={{padding:"16px 36px",fontFamily:f.h,fontSize:"14px",fontWeight:700,letterSpacing:"1.5px",color:C.white,background:`linear-gradient(135deg,${C.gold},${C.goldLight})`,borderRadius:"8px",textDecoration:"none",boxShadow:"0 4px 16px rgba(200,149,46,0.3)"}}>📞 CALL (844) 444-3114</a>
            <a href="mailto:info@jronegutters.com?subject=Referral%20Program" style={{display:"inline-flex",alignItems:"center",padding:"16px 36px",fontFamily:f.h,fontSize:"14px",fontWeight:700,letterSpacing:"1.5px",color:C.gold,border:`2px solid ${C.gold}`,borderRadius:"8px",textDecoration:"none"}}>✉️ EMAIL US</a>
          </div>
          <p style={{fontFamily:f.b,fontSize:"14px",color:C.muted,marginTop:"24px"}}>Programa disponible en español. Llámenos — somos bilingües.</p>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{background:C.navyFade,borderTop:`1px solid ${C.navyLight}`,padding:"32px 24px"}}><div style={{maxWidth:"1200px",margin:"0 auto",display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:"12px"}}><div style={{fontFamily:f.h,fontSize:"16px",fontWeight:800,color:C.white}}>JR <span style={{color:C.gold}}>ONE</span> <span style={{fontWeight:400,fontSize:"13px",color:C.muted,marginLeft:"8px"}}>The Superior Soffit & Gutter Experts</span></div><p style={{fontFamily:f.b,fontSize:"12px",color:C.muted}}>© 2026 JR One Aluminum LLC.</p></div></footer>

      {/* STICKY CTA */}
      <div style={{position:"fixed",bottom:0,left:0,right:0,zIndex:999,background:"rgba(11,22,40,0.97)",backdropFilter:"blur(12px)",borderTop:`1px solid ${C.navyLight}`,padding:"12px 16px",display:"flex",gap:"10px"}}><a href="tel:8444443114" style={{flex:1,display:"flex",alignItems:"center",justifyContent:"center",gap:"6px",padding:"14px",fontFamily:f.h,fontSize:"13px",fontWeight:700,color:C.navy,background:`linear-gradient(135deg,${C.gold},${C.goldLight})`,borderRadius:"8px",textDecoration:"none"}}>📞 REFER NOW</a><a href="mailto:info@jronegutters.com?subject=Referral" style={{flex:1,display:"flex",alignItems:"center",justifyContent:"center",padding:"14px",fontFamily:f.h,fontSize:"13px",fontWeight:700,color:C.gold,background:"transparent",border:`2px solid ${C.gold}`,borderRadius:"8px",textDecoration:"none"}}>✉️ EMAIL REFERRAL</a></div>

      <style>{`*{box-sizing:border-box;margin:0;padding:0}`}</style>
    </div>
  );
}
