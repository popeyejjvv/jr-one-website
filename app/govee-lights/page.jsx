"use client";

import { useState, useEffect } from "react";
import SiteNav from "../../components/SiteNav";
import SiteFooter from "../../components/SiteFooter";
import MobileCTA from "../../components/MobileCTA";

const injectFonts = () => { if (typeof document==="undefined"||document.querySelector("#jr-fonts")) return; const l=document.createElement("link"); l.id="jr-fonts"; l.rel="stylesheet"; l.href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800&family=Source+Sans+3:wght@300;400;600&display=swap"; document.head.appendChild(l); };
const C = { bg:"#0B1628",navy:"#1B2A4A",navyMid:"#243556",navyLight:"#2C3E5A",navyFade:"#162033",gold:"#C8952E",goldLight:"#D4A843",goldPale:"rgba(200,149,46,0.12)",cream:"#F5F3EF",white:"#FFFFFF",offWhite:"#E8E4DC",muted:"#7A8FA8",charcoal:"#2D2D2D",accent:"#9333EA",accentLight:"#A855F7",accentPale:"rgba(147,51,234,0.12)" };
const f = { h:"'Montserrat', sans-serif", b:"'Source Sans 3', sans-serif" };
const Tag = ({children}) => <div style={{display:"inline-block",padding:"6px 16px",background:C.accentPale,borderRadius:"4px",marginBottom:"12px"}}><span style={{fontFamily:f.h,fontSize:"12px",fontWeight:700,color:C.accent,letterSpacing:"3px"}}>{children}</span></div>;
const GoldBar = () => <div style={{width:"60px",height:"3px",background:`linear-gradient(90deg,${C.accent},${C.accentLight})`,borderRadius:"2px",margin:"16px auto"}} />;
const inputStyle = {width:"100%",padding:"13px 16px",fontFamily:f.b,fontSize:"15px",border:"1.5px solid #D1D5DB",borderRadius:"8px",outline:"none",color:C.charcoal,marginBottom:"12px",background:"#FAFAFA",boxSizing:"border-box"};

export default function GoveeLightsPage() {
  const [formData, setFormData] = useState({name:"",phone:"",email:""});
  const [submitted, setSubmitted] = useState(false);
  useEffect(() => { injectFonts(); }, []);
  const secTitle = {fontFamily:f.h,fontSize:"clamp(24px,4vw,36px)",fontWeight:800,letterSpacing:"2px",textAlign:"center",marginBottom:"8px"};

  return (
    <div style={{background:C.bg,color:C.white,fontFamily:f.b,lineHeight:1.65,minHeight:"100vh"}}>
      <SiteNav />

      <section style={{padding:"60px 24px 40px",maxWidth:"900px",margin:"0 auto",textAlign:"center"}}>
        <Tag>SMART HOME</Tag>
        <h1 style={{fontFamily:f.h,fontSize:"clamp(32px,5vw,44px)",fontWeight:800,lineHeight:1.1,marginBottom:"16px"}}>Govee Smart Lights,<br/><span style={{color:C.accent}}>Professionally Installed.</span></h1>
        <p style={{fontFamily:f.b,fontSize:"18px",color:C.muted,maxWidth:"650px",margin:"0 auto"}}>You buy the Govee LED strip lights. We mount them cleanly, securely, and discreetly along your roofline or exterior — with the same precision we bring to every aluminum installation. No DIY ladder risks. No sloppy mounting. Just clean, professional results.</p>
      </section>

      {/* HOW IT WORKS */}
      <section style={{padding:"20px 24px 80px"}}>
        <div style={{maxWidth:"900px",margin:"0 auto"}}>
          <div style={{textAlign:"center",marginBottom:"48px"}}><h2 style={{...secTitle,color:C.white}}>HOW IT WORKS</h2><GoldBar /></div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(250px,1fr))",gap:"24px"}}>
            {[
              {num:"1",title:"You buy the lights",desc:"Purchase your Govee smart LED strip lights, controller, and any accessories. You pick the exact product and color options you want."},
              {num:"2",title:"We install them",desc:"Our crew mounts the LED strips along your roofline or designated exterior areas with clean, discreet mounting. Secured properly — no adhesive-only installs that fall off in Florida heat."},
              {num:"3",title:"We connect them",desc:"Basic setup and connectivity to your mobile device included. We make sure the lights power on, connect to your app, and the zones are working before we leave."},
              {num:"4",title:"You enjoy them",desc:"Control your lights from your phone — holidays, parties, everyday ambiance, or security lighting. Change colors, set schedules, sync to music."},
            ].map((step,i) =>
              <div key={i} style={{background:C.navyFade,border:`1px solid ${C.navyLight}`,borderRadius:"12px",padding:"28px",textAlign:"center"}}>
                <div style={{fontFamily:f.h,fontSize:"36px",fontWeight:800,color:C.accent}}>{step.num}</div>
                <h3 style={{fontFamily:f.h,fontSize:"17px",fontWeight:700,color:C.white,margin:"8px 0"}}>{step.title}</h3>
                <p style={{fontFamily:f.b,fontSize:"15px",color:C.muted,lineHeight:1.55}}>{step.desc}</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* WHAT'S INCLUDED */}
      <section style={{background:C.navy,padding:"80px 24px"}}>
        <div style={{maxWidth:"600px",margin:"0 auto",textAlign:"center"}}>
          <Tag>WHAT'S INCLUDED</Tag>
          <h2 style={{...secTitle,color:C.white}}>PROFESSIONAL INSTALLATION</h2>
          <GoldBar />
          <div style={{background:C.navyFade,border:`2px solid ${C.accent}`,borderRadius:"16px",padding:"40px",marginTop:"40px"}}>
            <div style={{fontFamily:f.h,fontSize:"20px",fontWeight:700,color:C.accent,marginBottom:"20px"}}>EVERY INSTALLATION INCLUDES</div>
            <div style={{textAlign:"left",maxWidth:"400px",margin:"0 auto"}}>
              {["Professional mounting to roofline or exterior","Clean, discreet hardware placement","Secure fastening built for Florida weather","Basic setup and app connectivity","Multi-story homes available","All materials provided by homeowner"].map((item,i) =>
                <div key={i} style={{display:"flex",gap:"10px",marginBottom:"10px"}}>
                  <span style={{color:C.accent,flexShrink:0}}>✓</span>
                  <span style={{fontFamily:f.b,fontSize:"15px",color:C.offWhite}}>{item}</span>
                </div>
              )}
            </div>
            <div style={{background:C.accentPale,borderRadius:"8px",padding:"14px",marginTop:"20px"}}>
              <p style={{fontFamily:f.b,fontSize:"14px",color:C.accent}}>Pricing is based on your home's specific measurements and accessibility. Call us for a quick quote — most estimates take under 5 minutes.</p>
            </div>
          </div>
        </div>
      </section>

      {/* WHY US */}
      <section style={{background:C.bg,padding:"80px 24px"}}>
        <div style={{maxWidth:"800px",margin:"0 auto",textAlign:"center"}}>
          <Tag>WHY JR ONE</Tag>
          <h2 style={{...secTitle,color:C.white}}>WHY HIRE A PRO FOR LED INSTALLATION?</h2>
          <GoldBar />
          <div style={{marginTop:"40px",textAlign:"left"}}>
            {[
              {title:"We're already on your roofline",desc:"We install gutters, soffit, and fascia every day. Running LED strips along a roofline is a natural extension of what we already do — with the equipment, safety gear, and expertise already on the truck."},
              {title:"Adhesive alone won't survive Florida",desc:"Tampa's heat softens adhesive-only LED mounting within months. We mechanically secure strips so they stay put through 95-degree summers, thunderstorms, and hurricane-force winds."},
              {title:"No DIY ladder risks",desc:"Roofline LED installation means working at height on ladders — the same height that sends thousands of homeowners to the ER every year. Let our crew handle it safely."},
              {title:"Clean, invisible mounting",desc:"The whole point of accent lighting is the effect, not the hardware. We mount strips discreetly so you see the light, not the installation."},
            ].map((item,i) =>
              <div key={i} style={{display:"flex",gap:"20px",marginBottom:"28px"}}>
                <div style={{width:"40px",height:"40px",borderRadius:"10px",background:C.accentPale,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}><span style={{fontFamily:f.h,fontSize:"16px",fontWeight:800,color:C.accent}}>{i+1}</span></div>
                <div><h3 style={{fontFamily:f.h,fontSize:"17px",fontWeight:700,color:C.white,marginBottom:"4px"}}>{item.title}</h3><p style={{fontFamily:f.b,fontSize:"15px",color:C.muted,lineHeight:1.6}}>{item.desc}</p></div>
              </div>
            )}
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

      {/* CTA */}
      <section id="lights-form" style={{background:C.navy,padding:"80px 24px"}}><div style={{maxWidth:"500px",margin:"0 auto",textAlign:"center"}}>
        <h2 style={{fontFamily:f.h,fontSize:"28px",fontWeight:800,color:C.white,marginBottom:"12px"}}>READY TO LIGHT UP YOUR HOME?</h2>
        <p style={{fontFamily:f.b,fontSize:"16px",color:C.offWhite,marginBottom:"32px"}}>Tell us about your project and we'll schedule your installation.</p>
        {submitted ? <div style={{background:"rgba(45,139,78,0.15)",border:`1px solid #2D8B4E`,borderRadius:"12px",padding:"32px"}}><div style={{fontSize:"40px",marginBottom:"8px"}}>✓</div><h3 style={{fontFamily:f.h,fontSize:"18px",fontWeight:700,color:"#4ADE80"}}>Request Received!</h3></div> : <div style={{background:C.white,borderRadius:"16px",padding:"28px",textAlign:"left"}}>
          <input style={inputStyle} placeholder="Full Name" value={formData.name} onChange={e=>setFormData({...formData,name:e.target.value})} />
          <input style={inputStyle} placeholder="Phone Number" type="tel" value={formData.phone} onChange={e=>setFormData({...formData,phone:e.target.value})} />
          <input style={inputStyle} placeholder="Email Address" type="email" value={formData.email} onChange={e=>setFormData({...formData,email:e.target.value})} />
          <button onClick={()=>setSubmitted(true)} style={{width:"100%",padding:"16px",fontFamily:f.h,fontSize:"13px",fontWeight:700,letterSpacing:"1.5px",color:C.white,background:`linear-gradient(135deg,${C.accent},${C.accentLight})`,border:"none",borderRadius:"8px",cursor:"pointer"}}>SCHEDULE MY INSTALLATION</button>
        </div>}
      </div></section>

      <SiteFooter />
      <MobileCTA />
      <style>{`*{box-sizing:border-box;margin:0;padding:0}::placeholder{color:#9CA3AF}input:focus{border-color:${C.accent}!important}`}</style>
    </div>
  );
}
