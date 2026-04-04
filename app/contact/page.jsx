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
const inputStyle = {width:"100%",padding:"14px 16px",fontFamily:f.b,fontSize:"15px",border:`1.5px solid ${C.navyLight}`,borderRadius:"8px",outline:"none",color:C.white,marginBottom:"14px",background:C.navyFade,boxSizing:"border-box"};

const CITIES = ["Tampa","Clearwater","St. Petersburg","Sarasota","Bradenton","Lakeland","Brandon","Wesley Chapel","Palm Harbor","Riverview","New Port Richey","Largo","Spring Hill","Tarpon Springs","Land O' Lakes","Dunedin","Ruskin","Sun City Center","Temple Terrace","Plant City","Lutz","Odessa","Oldsmar","Safety Harbor","Seminole","Pinellas Park"];

export default function ContactPage() {
  const [formData, setFormData] = useState({name:"",phone:"",email:"",zip:"",service:"",message:""});
  const [submitted, setSubmitted] = useState(false);
  useEffect(() => { injectFonts(); }, []);
  const secTitle = {fontFamily:f.h,fontSize:"clamp(24px,4vw,36px)",fontWeight:800,letterSpacing:"2px",textAlign:"center",marginBottom:"8px"};

  return (
    <div style={{background:C.bg,color:C.white,fontFamily:f.b,lineHeight:1.65,minHeight:"100vh"}}>
      <SiteNav />

      {/* ══ HERO ══ */}
      <section className="hero-stars" style={{padding:"60px 24px 40px",maxWidth:"900px",margin:"0 auto",textAlign:"center"}}>
        <Tag>CONTACT US</Tag>
        <h1 style={{fontFamily:f.h,fontSize:"clamp(32px,5vw,48px)",fontWeight:800,lineHeight:1.1,marginBottom:"16px"}}>
          Let's Talk About<br/><span style={{color:C.gold}}>Your Project.</span>
        </h1>
        <p style={{fontFamily:f.b,fontSize:"18px",color:C.muted,maxWidth:"600px",margin:"0 auto"}}>
          Call us, fill out the form, or just tell us what you need. We respond within hours — not days.
        </p>
      </section>

      {/* ══ CONTACT GRID ══ */}
      <section style={{padding:"20px 24px 80px",maxWidth:"1100px",margin:"0 auto",display:"flex",gap:"40px",flexWrap:"wrap"}}>

        {/* LEFT: Form */}
        <div style={{flex:"1 1 480px",minWidth:"320px"}}>
          {submitted ? (
            <div style={{background:C.navyFade,border:`1px solid ${C.success}`,borderRadius:"16px",padding:"48px 32px",textAlign:"center"}}>
              <div style={{fontSize:"48px",marginBottom:"16px"}}>✓</div>
              <h3 style={{fontFamily:f.h,fontSize:"22px",fontWeight:700,color:"#4ADE80",marginBottom:"8px"}}>Message Received!</h3>
              <p style={{fontFamily:f.b,fontSize:"16px",color:C.muted}}>We'll get back to you within hours. If it's urgent, call us directly at <a href="tel:8444443114" style={{color:C.gold,textDecoration:"none",fontWeight:600}}>(844) 444-3114</a>.</p>
            </div>
          ) : (
            <div style={{background:C.navyFade,border:`1px solid ${C.navyLight}`,borderRadius:"16px",padding:"32px"}}>
              <h2 style={{fontFamily:f.h,fontSize:"20px",fontWeight:700,color:C.white,marginBottom:"4px"}}>Send Us a Message</h2>
              <div style={{width:"40px",height:"3px",background:C.gold,borderRadius:"2px",margin:"10px 0 24px"}} />

              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"14px"}}>
                <input style={inputStyle} placeholder="Full Name *" value={formData.name} onChange={e=>setFormData({...formData,name:e.target.value})} />
                <input style={inputStyle} placeholder="Phone Number *" type="tel" value={formData.phone} onChange={e=>setFormData({...formData,phone:e.target.value})} />
              </div>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"14px"}}>
                <input style={inputStyle} placeholder="Email Address *" type="email" value={formData.email} onChange={e=>setFormData({...formData,email:e.target.value})} />
                <input style={inputStyle} placeholder="ZIP Code" value={formData.zip} onChange={e=>setFormData({...formData,zip:e.target.value})} maxLength={5} />
              </div>
              <select style={{...inputStyle,cursor:"pointer",color:formData.service?C.white:C.muted}} value={formData.service} onChange={e=>setFormData({...formData,service:e.target.value})}>
                {["What do you need?","Gutter Installation","Gutter Repair","Gutter Guards","Soffit & Fascia","Siding","Gutter Cleaning","Peak 301 Roof Rejuvenation","Other / Not Sure"].map((opt,i) => <option key={i} value={i===0?"":opt} style={{color:C.charcoal}}>{opt}</option>)}
              </select>
              <textarea style={{...inputStyle,height:"120px",resize:"vertical"}} placeholder="Tell us about your project (optional)" value={formData.message} onChange={e=>setFormData({...formData,message:e.target.value})} />

              <button onClick={()=>setSubmitted(true)} style={{width:"100%",padding:"16px",fontFamily:f.h,fontSize:"14px",fontWeight:700,letterSpacing:"1.5px",color:C.white,background:`linear-gradient(135deg,${C.gold},${C.goldLight})`,border:"none",borderRadius:"8px",cursor:"pointer",boxShadow:"0 4px 16px rgba(200,149,46,0.3)",transition:"transform 0.15s"}}
                onMouseOver={e=>e.target.style.transform="translateY(-2px)"}
                onMouseOut={e=>e.target.style.transform="none"}>
                SEND MESSAGE
              </button>
              <p style={{fontFamily:f.b,fontSize:"12px",color:C.muted,textAlign:"center",marginTop:"12px"}}>No spam. No pressure. We just want to help.</p>
            </div>
          )}
        </div>

        {/* RIGHT: Contact info */}
        <div style={{flex:"1 1 300px",minWidth:"280px"}}>

          {/* Phone */}
          <div style={{background:C.navyFade,border:`1px solid ${C.navyLight}`,borderRadius:"12px",padding:"24px",marginBottom:"16px"}}>
            <div style={{fontFamily:f.h,fontSize:"11px",fontWeight:700,color:C.gold,letterSpacing:"2px",marginBottom:"8px"}}>CALL US</div>
            <a href="tel:8444443114" style={{fontFamily:f.h,fontSize:"24px",fontWeight:700,color:C.white,textDecoration:"none"}}>(844) 444-3114</a>
            <p style={{fontFamily:f.b,fontSize:"14px",color:C.muted,marginTop:"8px"}}>Monday – Saturday, 7:00 AM – 6:00 PM</p>
            <p style={{fontFamily:f.b,fontSize:"14px",color:C.gold,marginTop:"4px"}}>🇭🇳 Hablamos Español</p>
          </div>

          {/* Email */}
          <div style={{background:C.navyFade,border:`1px solid ${C.navyLight}`,borderRadius:"12px",padding:"24px",marginBottom:"16px"}}>
            <div style={{fontFamily:f.h,fontSize:"11px",fontWeight:700,color:C.gold,letterSpacing:"2px",marginBottom:"8px"}}>EMAIL US</div>
            <a href="mailto:info@jronegutters.com" style={{fontFamily:f.b,fontSize:"16px",color:C.white,textDecoration:"none"}}>info@jronegutters.com</a>
            <p style={{fontFamily:f.b,fontSize:"14px",color:C.muted,marginTop:"8px"}}>We respond to emails within the same business day.</p>
          </div>

          {/* Location */}
          <div style={{background:C.navyFade,border:`1px solid ${C.navyLight}`,borderRadius:"12px",padding:"24px",marginBottom:"16px"}}>
            <div style={{fontFamily:f.h,fontSize:"11px",fontWeight:700,color:C.gold,letterSpacing:"2px",marginBottom:"8px"}}>LOCATION</div>
            <p style={{fontFamily:f.b,fontSize:"16px",color:C.white}}>Tampa, Florida</p>
            <p style={{fontFamily:f.b,fontSize:"14px",color:C.muted,marginTop:"8px"}}>Serving Tampa Bay and Florida's west coast — from Spring Hill to Sarasota and everywhere in between.</p>
          </div>

          {/* Financing */}
          <div style={{background:C.goldPale,border:`1px solid ${C.gold}40`,borderRadius:"12px",padding:"24px"}}>
            <div style={{fontFamily:f.h,fontSize:"11px",fontWeight:700,color:C.gold,letterSpacing:"2px",marginBottom:"8px"}}>FINANCING AVAILABLE</div>
            <p style={{fontFamily:f.b,fontSize:"14px",color:C.offWhite,lineHeight:1.55}}>We offer flexible financing options to make quality aluminum services accessible. Ask about current programs when you contact us.</p>
          </div>
        </div>
      </section>

      {/* ══ SERVICE AREA MAP ══ */}
      <section style={{background:C.navy,padding:"80px 24px"}}>
        <div style={{maxWidth:"1000px",margin:"0 auto",textAlign:"center"}}>
          <Tag>SERVICE AREA</Tag>
          <h2 style={{...secTitle,color:C.white}}>WHERE WE WORK</h2>
          <GoldBar />
          <p style={{fontFamily:f.b,fontSize:"17px",color:C.muted,maxWidth:"600px",margin:"0 auto 40px"}}>
            We serve 20+ cities across Tampa Bay and Florida's west coast. If you're in the area, we can help.
          </p>

          {/* Map placeholder */}
          <div style={{borderRadius:"16px",overflow:"hidden",border:`1px solid ${C.navyLight}`,background:C.navyFade,aspectRatio:"16/9",display:"flex",alignItems:"center",justifyContent:"center",marginBottom:"40px"}}>
            <div style={{textAlign:"center",color:C.muted}}><div style={{fontSize:"48px",marginBottom:"8px"}}>🗺️</div><p style={{fontFamily:f.h,fontSize:"12px",letterSpacing:"1px"}}>GOOGLE MAP EMBED</p><p style={{fontFamily:f.b,fontSize:"12px",marginTop:"4px"}}>Service area map with all 20+ cities</p></div>
          </div>

          {/* City grid */}
          <div style={{display:"flex",flexWrap:"wrap",justifyContent:"center",gap:"8px"}}>
            {CITIES.map((city,i) => (
              <span key={i} style={{padding:"8px 16px",background:C.navyFade,border:`1px solid ${C.navyLight}`,borderRadius:"6px",fontFamily:f.h,fontSize:"13px",fontWeight:500,color:C.offWhite,cursor:"pointer",transition:"all 0.2s"}}
                onMouseOver={e=>{e.target.style.borderColor=C.gold;e.target.style.color=C.gold;}}
                onMouseOut={e=>{e.target.style.borderColor=C.navyLight;e.target.style.color=C.offWhite;}}>
                {city}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ══ WHAT TO EXPECT ══ */}
      <section style={{background:C.bg,padding:"80px 24px"}}>
        <div style={{maxWidth:"800px",margin:"0 auto",textAlign:"center"}}>
          <Tag>WHAT HAPPENS NEXT</Tag>
          <h2 style={{...secTitle,color:C.white}}>AFTER YOU REACH OUT</h2>
          <GoldBar />
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))",gap:"24px",marginTop:"48px"}}>
            {[
              {num:"1",title:"We respond",desc:"Within hours of your call or form submission, you'll hear from us. Not a call center — our actual team."},
              {num:"2",title:"We schedule",desc:"We set up a time for your free on-site assessment at your convenience. No surprise visits."},
              {num:"3",title:"We assess",desc:"We inspect your home, listen to your concerns, take photos, and explain what we find — honestly."},
              {num:"4",title:"We estimate",desc:"You receive a detailed, transparent estimate with line items. No vague numbers, no hidden fees."},
            ].map((step,i) => (
              <div key={i} style={{background:C.navyFade,border:`1px solid ${C.navyLight}`,borderRadius:"12px",padding:"24px",textAlign:"center"}}>
                <div style={{fontFamily:f.h,fontSize:"32px",fontWeight:800,color:C.gold,marginBottom:"8px"}}>{step.num}</div>
                <h3 style={{fontFamily:f.h,fontSize:"16px",fontWeight:700,color:C.white,marginBottom:"8px"}}>{step.title}</h3>
                <p style={{fontFamily:f.b,fontSize:"14px",color:C.muted,lineHeight:1.55}}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <SiteFooter />
      <MobileCTA />
      <style>{`*{box-sizing:border-box;margin:0;padding:0}::placeholder{color:${C.muted}}input:focus,select:focus,textarea:focus{border-color:${C.gold}!important}`}</style>
    </div>
  );
}
