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
const Stars = () => <span style={{color:C.gold,fontSize:"14px",letterSpacing:"2px"}}>★★★★★</span>;
const inputStyle = {width:"100%",padding:"13px 16px",fontFamily:f.b,fontSize:"15px",border:"1.5px solid #D1D5DB",borderRadius:"8px",outline:"none",color:C.charcoal,marginBottom:"12px",background:"#FAFAFA",boxSizing:"border-box"};

export default function AboutUsPage() {
  const [formData, setFormData] = useState({name:"",phone:"",email:"",zip:""});
  const [submitted, setSubmitted] = useState(false);
  useEffect(() => { injectFonts(); }, []);
  const secTitle = {fontFamily:f.h,fontSize:"clamp(24px,4vw,36px)",fontWeight:800,letterSpacing:"2px",textAlign:"center",marginBottom:"8px"};

  return (
    <div style={{background:C.bg,color:C.white,fontFamily:f.b,lineHeight:1.65,minHeight:"100vh"}}>
      <SiteNav />
      <div style={{padding:"16px 24px 0",maxWidth:"1200px",margin:"0 auto"}}><div style={{fontFamily:f.b,fontSize:"13px",color:C.muted}}>
        <span style={{color:C.muted,cursor:"pointer"}}>Home</span><span style={{margin:"0 8px",opacity:0.5}}>/</span><span style={{color:C.gold}}>About Us</span>
      </div></div>

      {/* ══ JAVIER PHOTO ══ */}
      <section className="hero-stars" style={{padding:"60px 24px 20px",maxWidth:"900px",margin:"0 auto",textAlign:"center"}}>
        <div style={{maxWidth:"500px",margin:"0 auto",borderRadius:"16px",overflow:"hidden",border:`2px solid ${C.gold}`,boxShadow:"0 8px 32px rgba(200,149,46,0.15)"}}>
          <img src="/images/javier-rivera.jpg" alt="Javier Rivera — Founder of JR One Aluminum" style={{width:"100%",height:"auto",display:"block"}} />
        </div>
      </section>

      {/* ══ HERO ══ */}
      <section style={{padding:"40px 24px 40px",maxWidth:"900px",margin:"0 auto",textAlign:"center"}}>
        <Tag>OUR STORY</Tag>
        <h1 style={{fontFamily:f.h,fontSize:"clamp(32px,5vw,48px)",fontWeight:800,lineHeight:1.1,marginBottom:"20px"}}>
          Three Decades. One Family.<br/>
          <span style={{color:C.gold}}>One Standard.</span>
        </h1>
        <p style={{fontFamily:f.b,fontSize:"18px",color:C.muted,maxWidth:"700px",margin:"0 auto"}}>
          JR One didn't start in a boardroom. It started on a rooftop in Tampa in 1990, with a man from Honduras, a gutter machine, and a belief that honest work builds an honest life. This is how we got here.
        </p>
      </section>

      {/* ══ THE STORY ══ */}
      <section style={{padding:"40px 24px 80px"}}>
        <div style={{maxWidth:"760px",margin:"0 auto"}}>

          {/* Chapter 1: Honduras to Tampa */}
          <div style={{marginBottom:"56px"}}>
            <div style={{fontFamily:f.h,fontSize:"12px",fontWeight:700,color:C.gold,letterSpacing:"3px",marginBottom:"12px"}}>1990</div>
            <h2 style={{fontFamily:f.h,fontSize:"24px",fontWeight:700,color:C.white,marginBottom:"16px"}}>From Honduras to Tampa Bay</h2>
            <div style={{borderLeft:`3px solid ${C.gold}`,paddingLeft:"24px"}}>
              <p style={{fontFamily:f.b,fontSize:"17px",color:C.offWhite,lineHeight:1.75,marginBottom:"16px"}}>
                In 1990, Javier Rivera immigrated to Tampa from Honduras and started doing what he knew — working with his hands. He began installing gutters, learning the trade from the ground up, and building a reputation one house at a time.
              </p>
              <p style={{fontFamily:f.b,fontSize:"17px",color:C.offWhite,lineHeight:1.75}}>
                For the next decade, Javier installed gutters himself across Tampa Bay. He wasn't building a brand or running marketing campaigns. He was on rooftops, bending aluminum, teaching anyone willing to learn. Many of the gutter and soffit companies operating in the Tampa market today trace their knowledge back to Javier — people who worked for him, worked with him, or learned alongside him.
              </p>
            </div>
          </div>

          {/* Photo placeholder removed — Javier's photo is at the top of the page */}

          {/* Chapter 2: The Accident */}
          <div style={{marginBottom:"56px"}}>
            <div style={{fontFamily:f.h,fontSize:"12px",fontWeight:700,color:C.gold,letterSpacing:"3px",marginBottom:"12px"}}>2001</div>
            <h2 style={{fontFamily:f.h,fontSize:"24px",fontWeight:700,color:C.white,marginBottom:"16px"}}>What Shaped Us</h2>
            <div style={{borderLeft:`3px solid ${C.gold}`,paddingLeft:"24px"}}>
              <p style={{fontFamily:f.b,fontSize:"17px",color:C.offWhite,lineHeight:1.75,marginBottom:"16px"}}>
                In 2001, Javier was injured in a fall while doing gutter work — the result of an incorrectly placed powerline on the job site. The accident left him paralyzed. He's been in a wheelchair ever since.
              </p>
              <p style={{fontFamily:f.b,fontSize:"17px",color:C.offWhite,lineHeight:1.75}}>
                It was a preventable accident. And it's the reason this company operates the way it does. When you've watched something like that happen to your own father over something that should have been caught, you don't take shortcuts. You don't rush. You check everything twice. That's not a philosophy we adopted — it's something we carry.
              </p>
            </div>
          </div>

          {/* Chapter 3: Christopher Takes Over */}
          <div style={{marginBottom:"56px"}}>
            <div style={{fontFamily:f.h,fontSize:"12px",fontWeight:700,color:C.gold,letterSpacing:"3px",marginBottom:"12px"}}>THE NEXT GENERATION</div>
            <h2 style={{fontFamily:f.h,fontSize:"24px",fontWeight:700,color:C.white,marginBottom:"16px"}}>Growing Up in the Trade</h2>
            <div style={{borderLeft:`3px solid ${C.gold}`,paddingLeft:"24px"}}>
              <p style={{fontFamily:f.b,fontSize:"17px",color:C.offWhite,lineHeight:1.75,marginBottom:"16px"}}>
                Christopher Rivera had been doing estimates with his father since he was nine years old. While other kids were playing, he was learning how to read a roofline, measure a gutter run, and talk to homeowners about protecting their property.
              </p>
              <p style={{fontFamily:f.b,fontSize:"17px",color:C.offWhite,lineHeight:1.75,marginBottom:"16px"}}>
                After Javier's accident, Christopher stepped up. Not because it was a career opportunity — because his family needed him and the work his father started needed to continue. The knowledge Javier spent a decade building couldn't end on that rooftop.
              </p>
              <p style={{fontFamily:f.b,fontSize:"17px",color:C.offWhite,lineHeight:1.75}}>
                Today, JR One Aluminum operates three in-house crews serving Tampa Bay and Florida's west coast. Some of the homes we work on are the same homes Javier installed gutters on 30 years ago. We've gone back and redone his original work — which is both humbling and a reminder that this trade is in our blood.
              </p>
            </div>
          </div>

          {/* Crew photo placeholder removed */}

          {/* Chapter 4: Why It Matters */}
          <div style={{marginBottom:"56px"}}>
            <div style={{fontFamily:f.h,fontSize:"12px",fontWeight:700,color:C.gold,letterSpacing:"3px",marginBottom:"12px"}}>WHY THIS MATTERS TO YOU</div>
            <h2 style={{fontFamily:f.h,fontSize:"24px",fontWeight:700,color:C.white,marginBottom:"16px"}}>Why We're Thorough About Everything</h2>
            <div style={{borderLeft:`3px solid ${C.gold}`,paddingLeft:"24px"}}>
              <p style={{fontFamily:f.b,fontSize:"17px",color:C.offWhite,lineHeight:1.75,marginBottom:"16px"}}>
                When people work with JR One, they sometimes notice that we're more detailed than other contractors. Our estimates are longer. Our inspections are more thorough. Our communication is more frequent. Our cleanup is more meticulous.
              </p>
              <p style={{fontFamily:f.b,fontSize:"17px",color:C.offWhite,lineHeight:1.75,marginBottom:"16px"}}>
                That's not a sales tactic. That's what happens when you build a company on the belief that a mistake can cost someone everything.
              </p>
              <p style={{fontFamily:f.b,fontSize:"17px",color:C.offWhite,lineHeight:1.75,marginBottom:"16px"}}>
                We don't cut corners because we've seen what cutting corners costs. We don't use subcontractors because we need to know that every person on your property meets our standard. We don't rush because speed without precision is how people get hurt and homes get damaged.
              </p>
              <p style={{fontFamily:f.b,fontSize:"17px",color:C.offWhite,lineHeight:1.75}}>
                Our price reflects all of this. When you hire JR One, you're paying for the peace of mind that comes from knowing the job was done right, done safely, and done by people who understand that the details aren't optional.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ══ THE GOLD STANDARD (Condensed) ══ */}
      <section style={{background:C.navy,padding:"80px 24px"}}>
        <div style={{maxWidth:"900px",margin:"0 auto",textAlign:"center"}}>
          <Tag>THE GOLD STANDARD</Tag>
          <h2 style={{...secTitle,color:C.white}}>HOW WE WORK</h2>
          <GoldBar />
          <p style={{fontFamily:f.b,fontSize:"17px",color:C.offWhite,fontStyle:"italic",maxWidth:"600px",margin:"0 auto 48px"}}>
            Every home. Every time. No exceptions. This isn't a marketing slogan — it's a promise born from knowing what happens when standards slip.
          </p>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))",gap:"20px",textAlign:"center"}}>
            {[
              {num:"01",title:"ASSESS",desc:"Thorough inspection. No shortcuts."},
              {num:"02",title:"DESIGN",desc:"Transparent estimate. No surprises."},
              {num:"03",title:"INSTALL",desc:"Our crew. Precision work. No subs."},
              {num:"04",title:"PROTECT",desc:"Warranty. Follow-up. No excuses."},
            ].map((step,i) => (
              <div key={i} style={{background:C.navyFade,border:`1px solid ${C.navyLight}`,borderRadius:"12px",padding:"24px"}}>
                <div style={{fontFamily:f.h,fontSize:"32px",fontWeight:800,color:C.gold,marginBottom:"8px"}}>{step.num}</div>
                <h3 style={{fontFamily:f.h,fontSize:"16px",fontWeight:700,color:C.white,marginBottom:"8px"}}>{step.title}</h3>
                <p style={{fontFamily:f.b,fontSize:"14px",color:C.muted}}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ BY THE NUMBERS ══ */}
      <section style={{background:C.bg,padding:"80px 24px"}}>
        <div style={{maxWidth:"900px",margin:"0 auto",textAlign:"center"}}>
          <Tag>JR ONE TODAY</Tag>
          <h2 style={{...secTitle,color:C.white}}>BY THE NUMBERS</h2>
          <GoldBar />
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))",gap:"24px",marginTop:"48px"}}>
            {[
              {value:"1990",label:"Year founded by Javier Rivera"},
              {value:"30+",label:"Years serving Tampa Bay"},
              {value:"3",label:"In-house installation crews"},
              {value:"4.9★",label:"Google rating from 55+ reviews"},
              {value:"0",label:"Subcontractors used — ever"},
              {value:"20+",label:"Cities served across Florida's west coast"},
            ].map((stat,i) => (
              <div key={i} style={{background:C.navyFade,border:`1px solid ${C.navyLight}`,borderRadius:"12px",padding:"24px",textAlign:"center"}}>
                <div style={{fontFamily:f.h,fontSize:"32px",fontWeight:800,color:C.gold}}>{stat.value}</div>
                <div style={{fontFamily:f.b,fontSize:"14px",color:C.muted,marginTop:"8px"}}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ WHAT WE DO ══ */}
      <section style={{background:C.navy,padding:"80px 24px"}}>
        <div style={{maxWidth:"900px",margin:"0 auto",textAlign:"center"}}>
          <Tag>OUR SERVICES</Tag>
          <h2 style={{...secTitle,color:C.white}}>WHAT WE SPECIALIZE IN</h2>
          <GoldBar />
          <p style={{fontFamily:f.b,fontSize:"17px",color:C.muted,maxWidth:"600px",margin:"0 auto 48px"}}>
            We do one thing and we do it exceptionally — aluminum exterior systems. Gutters, soffit, fascia, siding, gutter guards, and roof rejuvenation. No roofing. No painting. No general contracting. Just aluminum, done right.
          </p>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(250px,1fr))",gap:"16px",textAlign:"left"}}>
            {[
              {title:"Seamless Aluminum Gutters",desc:"5\", 6\", and 7\" systems custom-fabricated on your property."},
              {title:"Gutter Guards",desc:"Multiple guard types to keep debris out and make maintenance easier."},
              {title:"Soffit & Fascia",desc:"Aluminum and vinyl installations that protect your roof edge."},
              {title:"Siding",desc:"Vinyl and aluminum siding for Florida weather protection."},
              {title:"Gutter Repair & Maintenance",desc:"Fix it right the first time. Seasonal programs available."},
              {title:"Peak 301 Roof Rejuvenation",desc:"Soy-based sealant that extends roof life 6-10 years."},
            ].map((svc,i) => (
              <div key={i} style={{background:C.navyFade,borderRadius:"8px",padding:"20px",borderLeft:`3px solid ${C.gold}`,border:`1px solid ${C.navyLight}`,cursor:"pointer"}}>
                <h3 style={{fontFamily:f.h,fontSize:"15px",fontWeight:700,color:C.white,marginBottom:"4px"}}>{svc.title}</h3>
                <p style={{fontFamily:f.b,fontSize:"14px",color:C.muted}}>{svc.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ BILINGUAL ══ */}
      <section style={{background:C.navy,padding:"60px 24px"}}>
        <div style={{maxWidth:"800px",margin:"0 auto",textAlign:"center"}}>
          <h2 style={{fontFamily:f.h,fontSize:"28px",fontWeight:800,color:C.white,marginBottom:"12px"}}>
            🇭🇳 Hablamos Español
          </h2>
          <p style={{fontFamily:f.b,fontSize:"17px",color:C.offWhite,maxWidth:"600px",margin:"0 auto"}}>
            Our roots are Honduran. Our team is bilingual. Whether you're more comfortable in English or Spanish, we'll communicate clearly in the language you prefer — from the first estimate to the final walkthrough.
          </p>
        </div>
      </section>

      {/* ══ REVIEWS ══ */}
      <section style={{background:C.bg,padding:"80px 24px"}}>
        <div style={{maxWidth:"1000px",margin:"0 auto",textAlign:"center"}}>
          <Tag>WHAT PEOPLE SAY</Tag>
          <h2 style={{...secTitle,color:C.white}}>OUR REPUTATION SPEAKS FOR ITSELF</h2>
          <GoldBar />
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(300px,1fr))",gap:"20px",marginTop:"48px",textAlign:"left"}}>
            {[
              {text:"From the very beginning, they worked to ensure I received a fair quote. There was no high pressure selling. The workmanship was outstanding, and they took pictures of each step showing me what was transpiring.",name:"Lois G.",ctx:"Gutters & Soffits"},
              {text:"We referred a customer to JR One and they could not stop praising his workmanship and professionalism. They will be the go-to for all our gutter and soffit requests from customers.",name:"Adam E.",ctx:"Contractor Referral"},
              {text:"After Milton I called a dozen companies — only JR One called back. The team showed up and did a perfect job. Do not call anyone else.",name:"Matt D.",ctx:"Storm Damage"},
            ].map((rev,i) => (
              <div key={i} style={{background:C.navyFade,border:`1px solid ${C.navyLight}`,borderRadius:"12px",padding:"28px"}}>
                <Stars />
                <p style={{fontFamily:f.b,fontSize:"15px",color:C.offWhite,lineHeight:1.65,margin:"16px 0",fontStyle:"italic"}}>"{rev.text}"</p>
                <div style={{borderTop:`1px solid ${C.navyLight}`,paddingTop:"12px",display:"flex",justifyContent:"space-between"}}>
                  <span style={{fontFamily:f.h,fontSize:"14px",fontWeight:600,color:C.white}}>{rev.name}</span>
                  <span style={{fontFamily:f.b,fontSize:"12px",color:C.muted}}>{rev.ctx}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ CTA ══ */}
      <section id="quote-form" style={{background:`linear-gradient(165deg,${C.navyMid},${C.navy})`,padding:"80px 24px"}}><div style={{maxWidth:"600px",margin:"0 auto",textAlign:"center"}}>
        <h2 style={{fontFamily:f.h,fontSize:"clamp(28px,5vw,40px)",fontWeight:800,color:C.white,marginBottom:"12px"}}>READY TO WORK WITH US?</h2>
        <p style={{fontFamily:f.b,fontSize:"17px",color:C.offWhite,marginBottom:"40px"}}>Get your free, no-pressure quote. We respond within hours — and we'll explain everything as thoroughly as you'd expect from us.</p>
        {submitted ? <div style={{background:C.successDim,border:`1px solid ${C.success}`,borderRadius:"12px",padding:"32px"}}><div style={{fontSize:"48px",marginBottom:"12px"}}>✓</div><h3 style={{fontFamily:f.h,fontSize:"20px",fontWeight:700,color:"#4ADE80"}}>Request Received!</h3><p style={{fontFamily:f.b,fontSize:"15px",color:C.muted,marginTop:"8px"}}>We'll be in touch soon.</p></div> : <div style={{background:C.white,borderRadius:"16px",padding:"32px",boxShadow:"0 24px 80px rgba(0,0,0,0.4)",textAlign:"left"}}>
          <h3 style={{fontFamily:f.h,fontSize:"18px",fontWeight:700,color:C.navy,textAlign:"center",marginBottom:"4px"}}>Get Your Free Quote</h3>
          <div style={{width:"40px",height:"3px",background:C.gold,borderRadius:"2px",margin:"10px auto 20px"}} />
          <input style={inputStyle} placeholder="Full Name" value={formData.name} onChange={e=>setFormData({...formData,name:e.target.value})} />
          <input style={inputStyle} placeholder="Phone Number" type="tel" value={formData.phone} onChange={e=>setFormData({...formData,phone:e.target.value})} />
          <input style={inputStyle} placeholder="Email Address" type="email" value={formData.email} onChange={e=>setFormData({...formData,email:e.target.value})} />
          <input style={inputStyle} placeholder="ZIP Code" value={formData.zip} onChange={e=>setFormData({...formData,zip:e.target.value})} maxLength={5} />
          <button onClick={()=>setSubmitted(true)} style={{width:"100%",padding:"16px",fontFamily:f.h,fontSize:"14px",fontWeight:700,letterSpacing:"1.5px",color:C.white,background:`linear-gradient(135deg,${C.gold},${C.goldLight})`,border:"none",borderRadius:"8px",cursor:"pointer",boxShadow:"0 4px 16px rgba(200,149,46,0.3)"}}>REQUEST MY FREE QUOTE</button>
          <p style={{fontFamily:f.b,fontSize:"12px",color:"#9CA3AF",textAlign:"center",marginTop:"12px"}}>No spam. No pressure. Just honest expert advice.</p>
        </div>}
        <div style={{marginTop:"32px"}}><a href="tel:8444443114" style={{fontFamily:f.h,fontSize:"18px",fontWeight:700,color:C.gold,textDecoration:"none"}}>📞 (844) 444-3114</a></div>
      </div></section>

      <SiteFooter />
      <MobileCTA scrollTarget="quote-form" />
      <style>{`*{box-sizing:border-box;margin:0;padding:0}::placeholder{color:#9CA3AF}input:focus{border-color:${C.gold}!important;}`}</style>
    </div>
  );
}
