"use client";

import { useState, useEffect, useCallback } from "react";
import SiteNav from "../../components/SiteNav";
import SiteFooter from "../../components/SiteFooter";
import MobileCTA from "../../components/MobileCTA";

const injectFonts = () => { if (typeof document==="undefined"||document.querySelector("#jr-fonts")) return; const l=document.createElement("link"); l.id="jr-fonts"; l.rel="stylesheet"; l.href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800&family=Source+Sans+3:wght@300;400;600&display=swap"; document.head.appendChild(l); };
const C = { bg:"#0B1628",navy:"#1B2A4A",navyMid:"#243556",navyLight:"#2C3E5A",navyFade:"#162033",gold:"#C8952E",goldLight:"#D4A843",goldPale:"rgba(200,149,46,0.12)",cream:"#F5F3EF",white:"#FFFFFF",offWhite:"#E8E4DC",muted:"#7A8FA8",charcoal:"#2D2D2D" };
const f = { h:"'Montserrat', sans-serif", b:"'Source Sans 3', sans-serif" };
const Tag = ({children}) => <div style={{display:"inline-block",padding:"6px 16px",background:C.goldPale,borderRadius:"4px",marginBottom:"12px"}}><span style={{fontFamily:f.h,fontSize:"12px",fontWeight:700,color:C.gold,letterSpacing:"3px"}}>{children}</span></div>;
const Stars = () => <span style={{color:C.gold,fontSize:"14px",letterSpacing:"2px"}}>★★★★★</span>;

export default function ProjectsPage() {
  const [filter, setFilter] = useState("all");
  const [photos, setPhotos] = useState([]);
  const [tagLabels, setTagLabels] = useState({});
  const [stats, setStats] = useState({ totalPhotos: 0, totalProjects: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lightbox, setLightbox] = useState(null); // { photo, index }

  useEffect(() => { injectFonts(); }, []);

  useEffect(() => {
    fetch("/api/companycam")
      .then(r => { if (!r.ok) throw new Error("Failed to load"); return r.json(); })
      .then(data => {
        setPhotos(data.photos || []);
        setTagLabels(data.tagLabels || {});
        setStats({ totalPhotos: data.totalPhotos || 0, totalProjects: data.totalProjects || 0 });
        setLoading(false);
      })
      .catch(err => { setError(err.message); setLoading(false); });
  }, []);

  const filtered = filter === "all" ? photos : photos.filter(p => p.tags.includes(filter));
  const filterTabs = [{ key: "all", label: "All" }, ...Object.entries(tagLabels).map(([k, v]) => ({ key: k, label: v }))];

  // Lightbox navigation
  const openLightbox = (photo) => {
    const idx = filtered.indexOf(photo);
    setLightbox({ photo, index: idx });
  };
  const closeLightbox = () => setLightbox(null);
  const navLightbox = useCallback((dir) => {
    if (!lightbox) return;
    const newIdx = lightbox.index + dir;
    if (newIdx < 0 || newIdx >= filtered.length) return;
    setLightbox({ photo: filtered[newIdx], index: newIdx });
  }, [lightbox, filtered]);

  useEffect(() => {
    if (!lightbox) return;
    const handler = (e) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") navLightbox(-1);
      if (e.key === "ArrowRight") navLightbox(1);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [lightbox, navLightbox]);

  return (
    <div style={{background:C.bg,color:C.white,fontFamily:f.b,lineHeight:1.65,minHeight:"100vh"}}>
      <SiteNav />

      {/* HERO */}
      <section className="hero-stars" style={{padding:"60px 24px 20px",maxWidth:"900px",margin:"0 auto",textAlign:"center"}}>
        <Tag>OUR WORK</Tag>
        <h1 style={{fontFamily:f.h,fontSize:"clamp(32px,5vw,48px)",fontWeight:800,lineHeight:1.1,marginBottom:"16px"}}>
          Real Projects.<br/><span style={{color:C.gold}}>Real Homes.</span>
        </h1>
        <p style={{fontFamily:f.b,fontSize:"18px",color:C.muted,maxWidth:"600px",margin:"0 auto"}}>
          Every photo is from an actual JR One job — no stock images, no staged shoots. This is what our craftsmanship looks like across Tampa Bay.
        </p>
      </section>

      {/* STATS BAR */}
      <section style={{padding:"20px 24px 40px"}}>
        <div style={{maxWidth:"800px",margin:"0 auto",display:"flex",justifyContent:"center",gap:"40px",flexWrap:"wrap"}}>
          {[
            {v: stats.totalProjects ? `${stats.totalProjects}+` : "300+", l:"Projects completed"},
            {v:"4.9★",l:"Google rating"},
            {v:"20+",l:"Cities served"},
            {v:"30+",l:"Years experience"},
          ].map((s,i) => (
            <div key={i} style={{textAlign:"center"}}>
              <div style={{fontFamily:f.h,fontSize:"28px",fontWeight:800,color:C.gold}}>{s.v}</div>
              <div style={{fontFamily:f.b,fontSize:"12px",color:C.muted}}>{s.l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* FILTER TABS */}
      <section style={{padding:"0 24px 40px"}}>
        <div style={{maxWidth:"1000px",margin:"0 auto",display:"flex",flexWrap:"wrap",justifyContent:"center",gap:"8px"}}>
          {filterTabs.map((tab) => (
            <button key={tab.key} onClick={()=>setFilter(tab.key)} style={{
              padding:"10px 20px", fontFamily:f.h, fontSize:"13px", fontWeight:600, letterSpacing:"0.5px",
              background: filter===tab.key ? C.gold : C.navyFade,
              color: filter===tab.key ? C.navy : C.muted,
              border: `1px solid ${filter===tab.key ? C.gold : C.navyLight}`,
              borderRadius:"8px", cursor:"pointer", transition:"all 0.2s"
            }}>{tab.label}</button>
          ))}
        </div>
      </section>

      {/* PHOTO GRID */}
      <section style={{padding:"0 24px 80px"}}>
        {loading && (
          <div style={{textAlign:"center",padding:"60px 0"}}>
            <div style={{width:"40px",height:"40px",border:`3px solid ${C.navyLight}`,borderTopColor:C.gold,borderRadius:"50%",animation:"spin 0.8s linear infinite",margin:"0 auto 16px"}} />
            <p style={{fontFamily:f.h,fontSize:"14px",color:C.muted}}>Loading projects from CompanyCam...</p>
          </div>
        )}

        {error && (
          <div style={{textAlign:"center",padding:"60px 0"}}>
            <p style={{fontFamily:f.h,fontSize:"16px",color:"#EF4444"}}>Could not load project photos. Please try again later.</p>
          </div>
        )}

        {!loading && !error && (
          <div style={{maxWidth:"1200px",margin:"0 auto",display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))",gap:"16px"}}>
            {filtered.map((photo) => (
              <div key={photo.id} onClick={() => openLightbox(photo)} style={{
                background:C.navyFade, border:`1px solid ${C.navyLight}`, borderRadius:"12px",
                overflow:"hidden", transition:"border-color 0.3s,transform 0.3s", cursor:"pointer"
              }}
                onMouseOver={e=>{e.currentTarget.style.borderColor=C.gold;e.currentTarget.style.transform="translateY(-4px)";}}
                onMouseOut={e=>{e.currentTarget.style.borderColor=C.navyLight;e.currentTarget.style.transform="none";}}>

                <div style={{aspectRatio:"4/3",position:"relative",overflow:"hidden",background:C.navy}}>
                  <img
                    src={photo.web || photo.thumbnail}
                    alt={`${photo.tags.map(t => tagLabels[t] || t).join(", ")} — ${photo.city || "Tampa Bay"}, ${photo.state || "FL"}`}
                    loading="lazy"
                    style={{width:"100%",height:"100%",objectFit:"cover",display:"block"}}
                  />
                  {/* Tag badge */}
                  <div style={{position:"absolute",top:"10px",left:"10px",display:"flex",gap:"4px",flexWrap:"wrap"}}>
                    {photo.tags.slice(0, 2).map(t => (
                      <span key={t} style={{
                        padding:"3px 10px",background:"rgba(11,22,40,0.85)",borderRadius:"4px",
                        fontFamily:f.h,fontSize:"10px",fontWeight:700,color:C.gold,letterSpacing:"1px",
                        backdropFilter:"blur(4px)"
                      }}>{(tagLabels[t] || t).toUpperCase()}</span>
                    ))}
                  </div>
                </div>

                {/* Location */}
                {photo.city && (
                  <div style={{padding:"12px 16px"}}>
                    <p style={{fontFamily:f.b,fontSize:"13px",color:C.muted}}>{photo.city}, {photo.state}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {!loading && !error && filtered.length === 0 && (
          <div style={{textAlign:"center",padding:"60px 0"}}>
            <p style={{fontFamily:f.h,fontSize:"16px",color:C.muted}}>No photos found for this filter.</p>
          </div>
        )}
      </section>

      {/* CTA */}
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

      {/* REVIEW STRIP */}
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

      <SiteFooter />
      <MobileCTA />

      {/* LIGHTBOX */}
      {lightbox && (
        <div onClick={closeLightbox} style={{
          position:"fixed",inset:0,background:"rgba(0,0,0,0.92)",zIndex:9999,
          display:"flex",alignItems:"center",justifyContent:"center",padding:"20px"
        }}>
          <button onClick={(e)=>{e.stopPropagation();closeLightbox();}} style={{
            position:"absolute",top:"20px",right:"20px",background:"none",border:"none",
            color:C.white,fontSize:"32px",cursor:"pointer",zIndex:10000
          }}>×</button>

          {lightbox.index > 0 && (
            <button onClick={(e)=>{e.stopPropagation();navLightbox(-1);}} style={{
              position:"absolute",left:"20px",top:"50%",transform:"translateY(-50%)",
              background:"rgba(255,255,255,0.1)",border:"none",color:C.white,fontSize:"28px",
              width:"48px",height:"48px",borderRadius:"50%",cursor:"pointer"
            }}>‹</button>
          )}

          {lightbox.index < filtered.length - 1 && (
            <button onClick={(e)=>{e.stopPropagation();navLightbox(1);}} style={{
              position:"absolute",right:"20px",top:"50%",transform:"translateY(-50%)",
              background:"rgba(255,255,255,0.1)",border:"none",color:C.white,fontSize:"28px",
              width:"48px",height:"48px",borderRadius:"50%",cursor:"pointer"
            }}>›</button>
          )}

          <div onClick={(e)=>e.stopPropagation()} style={{maxWidth:"90vw",maxHeight:"85vh",position:"relative"}}>
            <img
              src={lightbox.photo.original || lightbox.photo.web}
              alt={`Project photo — ${lightbox.photo.city || "Tampa Bay"}`}
              style={{maxWidth:"90vw",maxHeight:"80vh",objectFit:"contain",borderRadius:"8px"}}
            />
            <div style={{textAlign:"center",marginTop:"12px"}}>
              <span style={{fontFamily:f.h,fontSize:"13px",color:C.muted}}>
                {lightbox.photo.city && `${lightbox.photo.city}, ${lightbox.photo.state}`}
                {lightbox.photo.tags.length > 0 && ` — ${lightbox.photo.tags.map(t => tagLabels[t] || t).join(", ")}`}
              </span>
              <span style={{fontFamily:f.b,fontSize:"12px",color:C.navyLight,marginLeft:"12px"}}>
                {lightbox.index + 1} / {filtered.length}
              </span>
            </div>
          </div>
        </div>
      )}

      <style>{`
        *{box-sizing:border-box;margin:0;padding:0}
        @keyframes spin{to{transform:rotate(360deg)}}
      `}</style>
    </div>
  );
}
