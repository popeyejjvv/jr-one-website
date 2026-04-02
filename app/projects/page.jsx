"use client";

import { useState, useEffect } from "react";

const injectFonts = () => { if (typeof document==="undefined"||document.querySelector("#jr-fonts")) return; const l=document.createElement("link"); l.id="jr-fonts"; l.rel="stylesheet"; l.href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800&family=Source+Sans+3:wght@300;400;600&display=swap"; document.head.appendChild(l); };
const C = { bg:"#0B1628",navy:"#1B2A4A",navyMid:"#243556",navyLight:"#2C3E5A",navyFade:"#162033",gold:"#C8952E",goldLight:"#D4A843",goldPale:"rgba(200,149,46,0.12)",cream:"#F5F3EF",white:"#FFFFFF",offWhite:"#E8E4DC",muted:"#7A8FA8",charcoal:"#2D2D2D" };
const f = { h:"'Montserrat', sans-serif", b:"'Source Sans 3', sans-serif" };
const Tag = ({children}) => <div style={{display:"inline-block",padding:"6px 16px",background:C.goldPale,borderRadius:"4px",marginBottom:"12px"}}><span style={{fontFamily:f.h,fontSize:"12px",fontWeight:700,color:C.gold,letterSpacing:"3px"}}>{children}</span></div>;
const GoldBar = () => <div style={{width:"60px",height:"3px",background:`linear-gradient(90deg,${C.gold},${C.goldLight})`,borderRadius:"2px",margin:"16px auto"}} />;
const Stars = () => <span style={{color:C.gold,fontSize:"14px",letterSpacing:"2px"}}>★★★★★</span>;

const FILTERS = ["All","Gutters","Soffit & Fascia","Gutter Guards","Siding","Storm Damage","Commercial"];

const PROJECTS = [
  {id:1, category:"Gutters", title:"7\" Seamless Aluminum Gutters", location:"Tampa, FL", desc:"Full house gutter replacement with 7\" high-capacity system, bronze finish, hidden hangers every 24\".", photos:3},
  {id:2, category:"Soffit & Fascia", title:"Complete Soffit & Fascia Replacement", location:"Clearwater, FL", desc:"Removed rotted wood soffit, repaired substrate, installed new aluminum soffit and fascia wrap.", photos:5},
  {id:3, category:"Storm Damage", title:"Post-Hurricane Milton Repairs", location:"Riverview, FL", desc:"Emergency soffit replacement after Hurricane Milton. Four soffits blown out on 2-story home, repaired in one day.", photos:4},
  {id:4, category:"Gutter Guards", title:"Micro Mesh Guard Installation", location:"St. Petersburg, FL", desc:"Retrofitted micro mesh guards on existing 6\" gutter system. Heavy oak tree coverage — guards prevent debris clogging.", photos:3},
  {id:5, category:"Gutters", title:"160 LF White Seamless Gutters", location:"Sarasota, FL", desc:"New construction gutter install — 160 linear feet of 6\" white seamless aluminum with 4x5 downspouts.", photos:4},
  {id:6, category:"Soffit & Fascia", title:"Aluminum Fascia Wrap + Soffit", location:"Brandon, FL", desc:"Wrapped existing fascia boards with aluminum, replaced damaged soffit panels, restored attic ventilation.", photos:3},
  {id:7, category:"Siding", title:"Vinyl Siding Replacement", location:"Tampa, FL", desc:"Full house re-side with vinyl siding. Repaired moisture barrier, installed new siding with hurricane-rated fastening.", photos:6},
  {id:8, category:"Commercial", title:"Commercial Gutter System", location:"Bradenton, FL", desc:"Large commercial building — 7\" gutters with oversized downspouts for maximum water handling capacity.", photos:3},
  {id:9, category:"Storm Damage", title:"Gutter & Downspout Repair", location:"Wesley Chapel, FL", desc:"Post-storm gutter realignment, crushed downspout replacement, and re-pitching for proper drainage.", photos:2},
  {id:10, category:"Gutters", title:"Copper Accent Gutters", location:"South Tampa, FL", desc:"Decorative copper half-round gutters on front facade. Custom downspout chains and leader heads.", photos:4},
  {id:11, category:"Soffit & Fascia", title:"Termite Damage Restoration", location:"Tampa, FL", desc:"Full soffit removal revealed extensive termite damage. Replaced all substrate wood and installed new aluminum soffit.", photos:5},
  {id:12, category:"Gutter Guards", title:"Guards + Gutter Cleaning", location:"Palm Harbor, FL", desc:"Cleaned existing gutters, repaired two sagging sections, installed screen guards on full perimeter.", photos:3},
];

export default function ProjectsPage() {
  const [filter, setFilter] = useState("All");
  useEffect(() => { injectFonts(); }, []);
  const secTitle = {fontFamily:f.h,fontSize:"clamp(24px,4vw,36px)",fontWeight:800,letterSpacing:"2px",textAlign:"center",marginBottom:"8px"};
  const filtered = filter === "All" ? PROJECTS : PROJECTS.filter(p => p.category === filter);

  return (
    <div style={{background:C.bg,color:C.white,fontFamily:f.b,lineHeight:1.65,minHeight:"100vh"}}>
      <div style={{background:`linear-gradient(90deg,${C.gold},${C.goldLight})`,padding:"10px 24px",textAlign:"center",fontFamily:f.h,fontSize:"13px",fontWeight:600,color:C.navy}}>🏠 FREE Gutter Guards with Full House Gutter Installation — Call (844) 444-3114</div>
      <nav style={{position:"sticky",top:0,zIndex:1000,padding:"12px 24px",background:"rgba(11,22,40,0.97)",backdropFilter:"blur(12px)",borderBottom:`1px solid ${C.navyLight}`}}><div style={{maxWidth:"1200px",margin:"0 auto",display:"flex",justifyContent:"space-between",alignItems:"center"}}><a href="/" style={{fontFamily:f.h,fontSize:"20px",fontWeight:800,color:C.white,textDecoration:"none"}}>JR <span style={{color:C.gold}}>ONE</span></a><a href="tel:8444443114" style={{fontFamily:f.h,fontSize:"13px",fontWeight:700,color:C.gold,textDecoration:"none"}}>(844) 444-3114</a></div></nav>

      {/* ══ HERO ══ */}
      <section style={{padding:"60px 24px 20px",maxWidth:"900px",margin:"0 auto",textAlign:"center"}}>
        <Tag>OUR WORK</Tag>
        <h1 style={{fontFamily:f.h,fontSize:"clamp(32px,5vw,48px)",fontWeight:800,lineHeight:1.1,marginBottom:"16px"}}>
          Real Projects.<br/><span style={{color:C.gold}}>Real Homes.</span>
        </h1>
        <p style={{fontFamily:f.b,fontSize:"18px",color:C.muted,maxWidth:"600px",margin:"0 auto"}}>
          Every photo is from an actual JR One job — no stock images, no staged shoots. This is what our craftsmanship looks like across Tampa Bay.
        </p>
      </section>

      {/* ══ STATS BAR ══ */}
      <section style={{padding:"20px 24px 40px"}}>
        <div style={{maxWidth:"800px",margin:"0 auto",display:"flex",justifyContent:"center",gap:"40px",flexWrap:"wrap"}}>
          {[{v:"300+",l:"Projects completed"},{v:"4.9★",l:"Google rating"},{v:"20+",l:"Cities served"},{v:"30+",l:"Years experience"}].map((s,i) => (
            <div key={i} style={{textAlign:"center"}}>
              <div style={{fontFamily:f.h,fontSize:"28px",fontWeight:800,color:C.gold}}>{s.v}</div>
              <div style={{fontFamily:f.b,fontSize:"12px",color:C.muted}}>{s.l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ══ FILTER TABS ══ */}
      <section style={{padding:"0 24px 40px"}}>
        <div style={{maxWidth:"900px",margin:"0 auto",display:"flex",flexWrap:"wrap",justifyContent:"center",gap:"8px"}}>
          {FILTERS.map((tab,i) => (
            <button key={i} onClick={()=>setFilter(tab)} style={{
              padding:"10px 20px", fontFamily:f.h, fontSize:"13px", fontWeight:600, letterSpacing:"0.5px",
              background: filter===tab ? C.gold : C.navyFade,
              color: filter===tab ? C.navy : C.muted,
              border: `1px solid ${filter===tab ? C.gold : C.navyLight}`,
              borderRadius:"8px", cursor:"pointer", transition:"all 0.2s"
            }}>{tab}</button>
          ))}
        </div>
      </section>

      {/* ══ PROJECT GRID ══ */}
      <section style={{padding:"0 24px 80px"}}>
        <div style={{maxWidth:"1200px",margin:"0 auto",display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(320px,1fr))",gap:"20px"}}>
          {filtered.map((project) => (
            <div key={project.id} style={{background:C.navyFade,border:`1px solid ${C.navyLight}`,borderRadius:"12px",overflow:"hidden",transition:"border-color 0.3s,transform 0.3s",cursor:"pointer"}}
              onMouseOver={e=>{e.currentTarget.style.borderColor=C.gold;e.currentTarget.style.transform="translateY(-4px)";}}
              onMouseOut={e=>{e.currentTarget.style.borderColor=C.navyLight;e.currentTarget.style.transform="none";}}>

              {/* Photo placeholder */}
              <div style={{aspectRatio:"16/10",background:`linear-gradient(135deg,${C.navy},${C.navyMid})`,display:"flex",alignItems:"center",justifyContent:"center",position:"relative"}}>
                <span style={{fontSize:"36px"}}>📸</span>
                <div style={{position:"absolute",top:"12px",left:"12px",padding:"4px 12px",background:C.navy,borderRadius:"4px",border:`1px solid ${C.navyLight}`}}>
                  <span style={{fontFamily:f.h,fontSize:"10px",fontWeight:700,color:C.gold,letterSpacing:"1px"}}>{project.category.toUpperCase()}</span>
                </div>
                <div style={{position:"absolute",bottom:"12px",right:"12px",padding:"4px 10px",background:"rgba(0,0,0,0.6)",borderRadius:"4px"}}>
                  <span style={{fontFamily:f.b,fontSize:"11px",color:C.white}}>{project.photos} photos</span>
                </div>
              </div>

              {/* Info */}
              <div style={{padding:"20px"}}>
                <h3 style={{fontFamily:f.h,fontSize:"16px",fontWeight:700,color:C.white,marginBottom:"4px"}}>{project.title}</h3>
                <p style={{fontFamily:f.b,fontSize:"13px",color:C.gold,marginBottom:"10px"}}>{project.location}</p>
                <p style={{fontFamily:f.b,fontSize:"14px",color:C.muted,lineHeight:1.5}}>{project.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div style={{textAlign:"center",padding:"60px 0"}}>
            <p style={{fontFamily:f.h,fontSize:"16px",color:C.muted}}>No projects found for this filter. Check back soon — we add new projects regularly.</p>
          </div>
        )}
      </section>

      {/* ══ CTA ══ */}
      <section style={{background:C.navy,padding:"80px 24px",textAlign:"center"}}>
        <div style={{maxWidth:"700px",margin:"0 auto"}}>
          <h2 style={{fontFamily:f.h,fontSize:"clamp(28px,5vw,36px)",fontWeight:800,color:C.white,marginBottom:"16px"}}>YOUR HOME COULD BE NEXT</h2>
          <p style={{fontFamily:f.b,fontSize:"17px",color:C.offWhite,marginBottom:"36px"}}>Every project in this gallery started with a phone call or a form submission. Ready to see what JR One can do for your home?</p>
          <div style={{display:"flex",gap:"16px",justifyContent:"center",flexWrap:"wrap"}}>
            <a href="tel:8444443114" style={{display:"inline-flex",alignItems:"center",gap:"8px",padding:"16px 32px",fontFamily:f.h,fontSize:"14px",fontWeight:700,letterSpacing:"1.5px",color:C.navy,background:`linear-gradient(135deg,${C.gold},${C.goldLight})`,borderRadius:"8px",textDecoration:"none"}}>📞 CALL (844) 444-3114</a>
            <a href="/contact" style={{padding:"16px 32px",fontFamily:f.h,fontSize:"14px",fontWeight:700,letterSpacing:"1.5px",color:C.gold,border:`2px solid ${C.gold}`,borderRadius:"8px",textDecoration:"none"}}>REQUEST A QUOTE</a>
          </div>
        </div>
      </section>

      {/* ══ REVIEW STRIP ══ */}
      <section style={{background:C.bg,padding:"60px 24px"}}>
        <div style={{maxWidth:"900px",margin:"0 auto",display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))",gap:"20px"}}>
          {[
            {text:"Work was done exactly to the quote and mock-up images. Not one detail missed.",name:"Jaclyn G."},
            {text:"Amazing work and so respectful. Their work was beautiful and had it all done in one day.",name:"Jessica L."},
            {text:"They took pictures of each step showing me what was transpiring. The workmanship was outstanding.",name:"Lois G."},
          ].map((rev,i) => (
            <div key={i} style={{background:C.navyFade,border:`1px solid ${C.navyLight}`,borderRadius:"12px",padding:"24px"}}>
              <Stars />
              <p style={{fontFamily:f.b,fontSize:"14px",color:C.offWhite,lineHeight:1.6,margin:"12px 0",fontStyle:"italic"}}>"{rev.text}"</p>
              <span style={{fontFamily:f.h,fontSize:"13px",fontWeight:600,color:C.white}}>{rev.name}</span>
            </div>
          ))}
        </div>
      </section>

      <footer style={{background:C.navyFade,borderTop:`1px solid ${C.navyLight}`,padding:"32px 24px"}}><div style={{maxWidth:"1200px",margin:"0 auto",display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:"12px"}}><div style={{fontFamily:f.h,fontSize:"16px",fontWeight:800,color:C.white}}>JR <span style={{color:C.gold}}>ONE</span> <span style={{fontWeight:400,fontSize:"13px",color:C.muted,marginLeft:"8px"}}>The Superior Soffit & Gutter Experts</span></div><p style={{fontFamily:f.b,fontSize:"12px",color:C.muted}}>© 2026 JR One Aluminum LLC.</p></div></footer>
      <div style={{position:"fixed",bottom:0,left:0,right:0,zIndex:999,background:"rgba(11,22,40,0.97)",backdropFilter:"blur(12px)",borderTop:`1px solid ${C.navyLight}`,padding:"12px 16px",display:"flex",gap:"10px"}}><a href="tel:8444443114" style={{flex:1,display:"flex",alignItems:"center",justifyContent:"center",gap:"6px",padding:"14px",fontFamily:f.h,fontSize:"13px",fontWeight:700,color:C.navy,background:`linear-gradient(135deg,${C.gold},${C.goldLight})`,borderRadius:"8px",textDecoration:"none"}}>📞 CALL NOW</a><a href="/contact" style={{flex:1,display:"flex",alignItems:"center",justifyContent:"center",padding:"14px",fontFamily:f.h,fontSize:"13px",fontWeight:700,color:C.gold,background:"transparent",border:`2px solid ${C.gold}`,borderRadius:"8px",textDecoration:"none"}}>GET QUOTE</a></div>
      <style>{`*{box-sizing:border-box;margin:0;padding:0}`}</style>
    </div>
  );
}
