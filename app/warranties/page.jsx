"use client";

import { useState, useEffect } from "react";
import SiteNav from "../../components/SiteNav";
import SiteFooter from "../../components/SiteFooter";
import MobileCTA from "../../components/MobileCTA";

const injectFonts = () => { if (typeof document==="undefined"||document.querySelector("#jr-fonts")) return; const l=document.createElement("link"); l.id="jr-fonts"; l.rel="stylesheet"; l.href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800&family=Source+Sans+3:wght@300;400;600&display=swap"; document.head.appendChild(l); };
const C = { bg:"#0B1628",navy:"#1B2A4A",navyMid:"#243556",navyLight:"#2C3E5A",navyFade:"#162033",gold:"#C8952E",goldLight:"#D4A843",goldPale:"rgba(200,149,46,0.12)",cream:"#F5F3EF",white:"#FFFFFF",offWhite:"#E8E4DC",muted:"#7A8FA8",charcoal:"#2D2D2D",success:"#2D8B4E",successDim:"rgba(45,139,78,0.15)" };
const f = { h:"'Montserrat', sans-serif", b:"'Source Sans 3', sans-serif" };
const Tag = ({children}) => <div style={{display:"inline-block",padding:"6px 16px",background:C.goldPale,borderRadius:"4px",marginBottom:"12px"}}><span style={{fontFamily:f.h,fontSize:"12px",fontWeight:700,color:C.gold,letterSpacing:"3px"}}>{children}</span></div>;
const GoldBar = () => <div style={{width:"60px",height:"3px",background:`linear-gradient(90deg,${C.gold},${C.goldLight})`,borderRadius:"2px",margin:"16px auto"}} />;

export default function WarrantyPage() {
  const [openFaq, setOpenFaq] = useState(null);
  useEffect(() => { injectFonts(); }, []);
  const secTitle = {fontFamily:f.h,fontSize:"clamp(24px,4vw,36px)",fontWeight:800,letterSpacing:"2px",textAlign:"center",marginBottom:"8px"};

  const faqs = [
    { q:"What does the 3-year workmanship warranty cover?", a:"Our warranty covers defects in our labor that materially affect how your gutter, soffit, fascia, or siding system performs under normal residential use. If something we installed fails because of how we installed it — not because of weather damage, impact, or wear — we come back and fix it at no cost." },
    { q:"When does the warranty period start?", a:"The 3-year warranty begins on the date of Substantial Completion — meaning the day your system is fully installed and functioning as intended, even if minor punch-list items remain." },
    { q:"What's NOT covered by the warranty?", a:"Normal wear and tear, damage from severe weather events (hurricanes, tornadoes, hail), damage caused by third parties (painters, roofers, tree trimmers), alterations made by anyone other than JR One, and damage resulting from failure to maintain the system (e.g., never cleaning gutters that don't have guards)." },
    { q:"What about material warranties?", a:"Material warranties are provided by the material manufacturers, not JR One. Aluminum coil, copper, vinyl, and guard products each carry their own manufacturer warranties. We'll provide you with all relevant manufacturer warranty documentation at project completion." },
    { q:"How do I make a warranty claim?", a:"Call us at (844) 444-3114 or email info@jronegutters.com. Describe the issue, and we'll schedule an inspection. If the issue falls within warranty coverage, we schedule the repair — no charge, no hassle. We don't make warranty claims difficult because we'd rather fix a problem fast than argue about it." },
    { q:"Is the warranty transferable if I sell my home?", a:"Contact us to discuss transferability for your specific project. We handle these on a case-by-case basis." },
    { q:"Do you offer extended warranties?", a:"Our standard warranty is 3 years for workmanship. For extended coverage beyond that, ask about our maintenance plans — regular professional maintenance extends the life of your system and catches issues before they become problems." },
  ];

  return (
    <div style={{background:C.bg,color:C.white,fontFamily:f.b,lineHeight:1.65,minHeight:"100vh"}}>
      <SiteNav />

      {/* HERO */}
      <section className="hero-stars" style={{padding:"60px 24px 40px",maxWidth:"900px",margin:"0 auto",textAlign:"center"}}>
        <Tag>WARRANTIES</Tag>
        <h1 style={{fontFamily:f.h,fontSize:"clamp(32px,5vw,44px)",fontWeight:800,lineHeight:1.1,marginBottom:"16px"}}>We Stand Behind<br/><span style={{color:C.gold}}>Every Installation.</span></h1>
        <p style={{fontFamily:f.b,fontSize:"18px",color:C.muted,maxWidth:"650px",margin:"0 auto"}}>Our 3-year workmanship warranty isn't fine print designed to protect us — it's a commitment designed to protect you. If our work fails, we fix it. Period.</p>
      </section>

      {/* WARRANTY CARD */}
      <section style={{padding:"20px 24px 80px"}}>
        <div style={{maxWidth:"800px",margin:"0 auto"}}>
          <div style={{background:C.navyFade,border:`2px solid ${C.gold}`,borderRadius:"16px",padding:"40px 32px",textAlign:"center"}}>
            <div style={{fontFamily:f.h,fontSize:"64px",fontWeight:800,color:C.gold,lineHeight:1}}>3</div>
            <div style={{fontFamily:f.h,fontSize:"18px",fontWeight:700,color:C.gold,letterSpacing:"3px",marginTop:"8px"}}>YEAR WORKMANSHIP WARRANTY</div>
            <div style={{width:"60px",height:"2px",background:C.gold,margin:"20px auto"}} />
            <p style={{fontFamily:f.b,fontSize:"16px",color:C.offWhite,maxWidth:"550px",margin:"0 auto",lineHeight:1.7}}>
              Covers defects in our labor that materially affect how your system performs under normal residential use. From the date of substantial completion, if something we installed isn't working because of how we installed it — we come back and make it right.
            </p>
          </div>
        </div>
      </section>

      {/* WHAT'S COVERED */}
      <section style={{background:C.navy,padding:"80px 24px"}}>
        <div style={{maxWidth:"900px",margin:"0 auto",display:"grid",gridTemplateColumns:"1fr 1fr",gap:"32px"}}>
          <div>
            <h2 style={{fontFamily:f.h,fontSize:"20px",fontWeight:700,color:C.gold,marginBottom:"20px"}}>✓ WHAT'S COVERED</h2>
            {["Gutter seam or joint failures due to installation","Soffit or fascia panels detaching from improper fastening","Gutter pitch errors causing improper drainage","Hanger failures from incorrect installation","Downspout connection failures","Any defect in our labor that affects system performance"].map((item,i) =>
              <div key={i} style={{display:"flex",gap:"12px",marginBottom:"14px",alignItems:"flex-start"}}>
                <span style={{color:"#4ADE80",fontSize:"16px",flexShrink:0,marginTop:"2px"}}>✓</span>
                <p style={{fontFamily:f.b,fontSize:"15px",color:C.offWhite}}>{item}</p>
              </div>
            )}
          </div>
          <div>
            <h2 style={{fontFamily:f.h,fontSize:"20px",fontWeight:700,color:C.muted,marginBottom:"20px"}}>✗ WHAT'S NOT COVERED</h2>
            {["Normal wear and tear over time","Hurricane, tornado, or severe storm damage","Damage caused by third parties (roofers, painters, etc.)","Alterations made by anyone other than JR One","Failure to maintain the system (e.g., never cleaning gutters)","Cosmetic changes (oxidation, color fading from UV)"].map((item,i) =>
              <div key={i} style={{display:"flex",gap:"12px",marginBottom:"14px",alignItems:"flex-start"}}>
                <span style={{color:C.muted,fontSize:"16px",flexShrink:0,marginTop:"2px"}}>✗</span>
                <p style={{fontFamily:f.b,fontSize:"15px",color:C.muted}}>{item}</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* MANUFACTURER WARRANTIES */}
      <section style={{background:C.bg,padding:"80px 24px"}}>
        <div style={{maxWidth:"800px",margin:"0 auto",textAlign:"center"}}>
          <Tag>MATERIALS</Tag>
          <h2 style={{...secTitle,color:C.white}}>MANUFACTURER WARRANTIES</h2>
          <GoldBar />
          <p style={{fontFamily:f.b,fontSize:"16px",color:C.muted,maxWidth:"600px",margin:"0 auto 40px"}}>
            In addition to our workmanship warranty, the materials we install carry their own manufacturer warranties. We provide all relevant documentation at project completion.
          </p>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(220px,1fr))",gap:"16px",textAlign:"left"}}>
            {[
              {title:"Aluminum Coil",desc:"Manufacturer paint finish warranties vary by brand and color. Typically 20-40 years on finish."},
              {title:"Copper",desc:"Copper carries no traditional warranty because it doesn't fail. The material itself outlasts any warranty period."},
              {title:"Vinyl Soffit/Siding",desc:"Manufacturer warranties vary by brand. Typically limited lifetime warranties covering defects in material."},
              {title:"Gutter Guards",desc:"Guard manufacturer warranties vary by product type. Documentation provided at installation."},
            ].map((item,i) =>
              <div key={i} style={{background:C.navyFade,border:`1px solid ${C.navyLight}`,borderRadius:"12px",padding:"20px"}}>
                <h3 style={{fontFamily:f.h,fontSize:"14px",fontWeight:700,color:C.gold,marginBottom:"8px"}}>{item.title}</h3>
                <p style={{fontFamily:f.b,fontSize:"14px",color:C.muted,lineHeight:1.55}}>{item.desc}</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section style={{background:C.navy,padding:"80px 24px"}}>
        <div style={{maxWidth:"800px",margin:"0 auto",textAlign:"center"}}>
          <Tag>FAQ</Tag>
          <h2 style={{...secTitle,color:C.white}}>WARRANTY QUESTIONS</h2>
          <GoldBar />
          <div style={{marginTop:"40px",textAlign:"left"}}>{faqs.map((faq,i) => <div key={i} style={{borderBottom:`1px solid ${C.navyLight}`}}><button onClick={()=>setOpenFaq(openFaq===i?null:i)} style={{width:"100%",padding:"20px 0",background:"none",border:"none",cursor:"pointer",display:"flex",justifyContent:"space-between",alignItems:"center",gap:"16px"}}><span style={{fontFamily:f.h,fontSize:"15px",fontWeight:600,color:openFaq===i?C.gold:C.white,textAlign:"left"}}>{faq.q}</span><span style={{fontFamily:f.h,fontSize:"20px",color:C.gold,transform:openFaq===i?"rotate(45deg)":"none",transition:"transform 0.3s",flexShrink:0}}>+</span></button>{openFaq===i&&<div style={{padding:"0 0 20px",fontFamily:f.b,fontSize:"15px",color:C.muted,lineHeight:1.65}}>{faq.a}</div>}</div>)}</div>
        </div>
      </section>

      {/* CTA */}
      <section style={{background:C.bg,padding:"60px 24px",textAlign:"center"}}>
        <h2 style={{fontFamily:f.h,fontSize:"28px",fontWeight:800,color:C.white,marginBottom:"12px"}}>QUESTIONS ABOUT YOUR WARRANTY?</h2>
        <p style={{fontFamily:f.b,fontSize:"16px",color:C.muted,marginBottom:"24px"}}>Call us. We don't make warranty claims difficult.</p>
        <a href="tel:8444443114" style={{display:"inline-flex",alignItems:"center",gap:"8px",padding:"16px 32px",fontFamily:f.h,fontSize:"14px",fontWeight:700,letterSpacing:"1.5px",color:C.navy,background:`linear-gradient(135deg,${C.gold},${C.goldLight})`,borderRadius:"8px",textDecoration:"none"}}>📞 (844) 444-3114</a>
      </section>

      <SiteFooter />
      <MobileCTA />
      <style>{`*{box-sizing:border-box;margin:0;padding:0}`}</style>
    </div>
  );
}
