"use client";

import { useState, useEffect } from "react";
import SiteNav from "./SiteNav";
import SiteFooter from "./SiteFooter";
import MobileCTA from "./MobileCTA";

const injectFonts = () => { if (typeof document==="undefined"||document.querySelector("#jr-fonts")) return; const l=document.createElement("link"); l.id="jr-fonts"; l.rel="stylesheet"; l.href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800&family=Source+Sans+3:wght@300;400;600&display=swap"; document.head.appendChild(l); };
const C = { bg:"#0B1628",navy:"#1B2A4A",navyMid:"#243556",navyLight:"#2C3E5A",navyFade:"#162033",gold:"#C8952E",goldLight:"#D4A843",goldPale:"rgba(200,149,46,0.12)",cream:"#F5F3EF",white:"#FFFFFF",offWhite:"#E8E4DC",muted:"#7A8FA8",charcoal:"#2D2D2D",success:"#2D8B4E",successDim:"rgba(45,139,78,0.15)" };
const f = { h:"'Montserrat', sans-serif", b:"'Source Sans 3', sans-serif" };
const Tag = ({children}) => <div style={{display:"inline-block",padding:"6px 16px",background:C.goldPale,borderRadius:"4px",marginBottom:"12px"}}><span style={{fontFamily:f.h,fontSize:"12px",fontWeight:700,color:C.gold,letterSpacing:"3px"}}>{children}</span></div>;
const GoldBar = () => <div style={{width:"60px",height:"3px",background:`linear-gradient(90deg,${C.gold},${C.goldLight})`,borderRadius:"2px",margin:"16px auto"}} />;
const Stars = () => <span style={{color:C.gold,fontSize:"14px",letterSpacing:"2px"}}>★★★★★</span>;
const inputStyle = {width:"100%",padding:"13px 16px",fontFamily:f.b,fontSize:"15px",border:"1.5px solid #D1D5DB",borderRadius:"8px",outline:"none",color:C.charcoal,marginBottom:"12px",background:"#FAFAFA",boxSizing:"border-box"};

// ══════════════════════════════════════════════════════════
// CITY DATA — Unique content for each city
// ══════════════════════════════════════════════════════════
const CITIES = {
  tampa: {
    name: "Tampa", county: "Hillsborough County", slug: "tampa",
    heroH1: "Tampa's Trusted", heroH1Gold: "Gutter & Aluminum Specialists",
    localP: "Tampa homeowners face a unique combination of challenges — intense summer thunderstorms, hurricane season, year-round humidity, and aging housing stock across neighborhoods from South Tampa to New Tampa. Your gutters, soffit, and fascia take the worst of it. JR One has been protecting Tampa homes for over 30 years, and many of the homes we service today are ones our founder Javier originally worked on in the 1990s.",
    weatherNote: "Tampa averages 51 inches of rain per year — significantly above the national average. That volume of water needs to go somewhere, and if your gutter system isn't handling it properly, your foundation, fascia, and landscaping pay the price.",
    neighborhoods: ["South Tampa","Westchase","Carrollwood","New Tampa","Seminole Heights","Hyde Park","Davis Islands","Palma Ceia","Channelside","Ybor City","Town 'N Country","Northdale"],
    nearbyText: "We also serve Clearwater, St. Petersburg, Brandon, Temple Terrace, and surrounding communities.",
  },
  clearwater: {
    name: "Clearwater", county: "Pinellas County", slug: "clearwater",
    heroH1: "Clearwater's Premier", heroH1Gold: "Gutter & Soffit Experts",
    localP: "Clearwater's coastal location means your home's exterior takes a beating from salt air, tropical storms, and intense UV exposure year-round. Aluminum gutters, soffit, and fascia are ideal for Clearwater's conditions because they resist corrosion from salt air that deteriorates lesser materials. JR One serves Clearwater and all of Pinellas County with the same precision and thoroughness we bring to every Tampa Bay community.",
    weatherNote: "Clearwater's coastal proximity adds salt air corrosion to the standard Florida challenges of heavy rain, UV, and humidity. Aluminum is the material of choice here because it handles all of these without degrading.",
    neighborhoods: ["Clearwater Beach","Countryside","East Clearwater","Clearwater Mall Area","Skycrest","Harbor Oaks","Old Clearwater Bay"],
    nearbyText: "We also serve Palm Harbor, Dunedin, Safety Harbor, Largo, and all of Pinellas County.",
  },
  "st-petersburg": {
    name: "St. Petersburg", county: "Pinellas County", slug: "st-petersburg",
    heroH1: "St. Petersburg's Trusted", heroH1Gold: "Aluminum Specialists",
    localP: "St. Petersburg's mix of historic homes, mid-century neighborhoods, and newer construction means every gutter and soffit job is different. Many older St. Pete homes still have original wood soffit and fascia that's been deteriorating for decades in Florida's humidity. JR One specializes in replacing these aging systems with durable aluminum that protects your home and enhances its curb appeal.",
    weatherNote: "St. Pete holds the Guinness record for consecutive days of sunshine — 768 days. That UV exposure degrades wood soffit and fascia faster than most homeowners realize.",
    neighborhoods: ["Downtown St. Pete","Old Northeast","Snell Isle","Shore Acres","Kenwood","Jungle Terrace","Pasadena","Pinellas Point","Tyrone"],
    nearbyText: "We also serve Gulfport, Pinellas Park, Seminole, Largo, and all of Pinellas County.",
  },
  sarasota: {
    name: "Sarasota", county: "Sarasota County", slug: "sarasota",
    heroH1: "Sarasota's Choice for", heroH1Gold: "Premium Gutter Systems",
    localP: "Sarasota homeowners invest in their properties — and expect contractors who match that standard. JR One serves Sarasota with the same meticulous attention to detail that the community demands. From waterfront homes on the keys to established neighborhoods like Palmer Ranch and Lakewood Ranch, we install precision aluminum systems that perform and look the part.",
    weatherNote: "Sarasota's coastal storms drive rain sideways, testing gutters and soffit in ways inland homes rarely experience. Proper installation pitch and fastening aren't optional here — they're essential.",
    neighborhoods: ["Siesta Key","Lido Key","Palmer Ranch","Lakewood Ranch","Gulf Gate","Bee Ridge","Southgate","Indian Beach","Sapphire Shores"],
    nearbyText: "We also serve Bradenton, Venice, Osprey, North Port, and surrounding communities.",
  },
  bradenton: {
    name: "Bradenton", county: "Manatee County", slug: "bradenton",
    heroH1: "Bradenton's Reliable", heroH1Gold: "Gutter & Fascia Team",
    localP: "Bradenton sits at the intersection of coastal weather and suburban growth, with neighborhoods ranging from historic downtown to newer developments in Lakewood Ranch and Parrish. Whether you're maintaining an older home or outfitting new construction, JR One provides the same Gold Standard service across all of Manatee County.",
    weatherNote: "Bradenton's position on the Manatee River and Tampa Bay means homes here face both coastal storm surges and inland flooding. Properly functioning gutters aren't just aesthetic — they're structural protection.",
    neighborhoods: ["Downtown Bradenton","Palma Sola","West Bradenton","Bayshore Gardens","Trailer Estates","Parrish","Ellenton","Palmetto"],
    nearbyText: "We also serve Sarasota, Lakewood Ranch, Anna Maria Island, and surrounding areas.",
  },
  lakeland: {
    name: "Lakeland", county: "Polk County", slug: "lakeland",
    heroH1: "Lakeland's Trusted", heroH1Gold: "Gutter Installation Experts",
    localP: "Lakeland's inland location means you get all of Central Florida's intense afternoon thunderstorms without the coastal breeze to dry things out. Heavy rain and persistent humidity make quality gutter systems essential for protecting your home's foundation and exterior. JR One brings Tampa Bay-caliber craftsmanship to every Lakeland project.",
    weatherNote: "Lakeland sits in Florida's 'Lightning Alley' — one of the most storm-active regions in the country. Those afternoon thunderstorms dump massive amounts of water in short periods, and your gutters need to handle it.",
    neighborhoods: ["South Lakeland","North Lakeland","Dixieland","Lake Hollingsworth","Lake Morton","Crystal Lake","Grasslands"],
    nearbyText: "We also serve Plant City, Brandon, Winter Haven, and surrounding Polk County communities.",
  },
  brandon: {
    name: "Brandon", county: "Hillsborough County", slug: "brandon",
    heroH1: "Brandon's Go-To", heroH1Gold: "Gutter & Soffit Company",
    localP: "Brandon's rapid growth over the past two decades means a mix of housing ages — from established 1980s developments to brand-new construction. Both need reliable gutter and soffit systems, but for different reasons. Older homes often have failing wood soffit and outdated gutter systems, while new builds need quality installation from day one. JR One handles both across the Brandon community.",
    weatherNote: "Brandon gets the same intense thunderstorm activity as Tampa but with more suburban tree coverage — meaning more leaves, pine needles, and debris in your gutters.",
    neighborhoods: ["Bloomingdale","Riverglen","Providence","FishHawk","Valrico","Lithia","Durant"],
    nearbyText: "We also serve Riverview, Tampa, Plant City, and surrounding Hillsborough County.",
  },
  "wesley-chapel": { name:"Wesley Chapel", county:"Pasco County", slug:"wesley-chapel", heroH1:"Wesley Chapel's Preferred", heroH1Gold:"Aluminum Contractor", localP:"Wesley Chapel is one of Tampa Bay's fastest-growing communities, with new construction and established neighborhoods side by side. JR One serves Wesley Chapel homeowners who want their gutter, soffit, and fascia work done right — not by the lowest bidder the builder could find, but by a specialist team with 30+ years of experience.", weatherNote:"Pasco County's flat terrain means drainage is critical. Without properly pitched gutters, water pools around your foundation instead of being directed away.", neighborhoods:["Meadow Pointe","Seven Oaks","Wiregrass","Cypress Creek","Chapel Pines","Watergrass"], nearbyText:"We also serve Land O' Lakes, Lutz, New Tampa, and surrounding Pasco County." },
  "palm-harbor": { name:"Palm Harbor", county:"Pinellas County", slug:"palm-harbor", heroH1:"Palm Harbor's Trusted", heroH1Gold:"Gutter Specialists", localP:"Palm Harbor's established neighborhoods and tree-lined streets are part of what makes it beautiful — and part of why gutter maintenance matters here. Oak and pine canopies drop debris year-round, and Palm Harbor's proximity to the Gulf means salt air is always a factor. JR One provides aluminum solutions built for exactly these conditions.", weatherNote:"Palm Harbor's mature tree canopy means more gutter debris than most Pinellas County communities. Guards and regular maintenance are especially important here.", neighborhoods:["Ozona","Crystal Beach","East Lake","Lansbrook","Palm Harbor Proper"], nearbyText:"We also serve Tarpon Springs, Dunedin, Clearwater, and surrounding areas." },
  riverview: { name:"Riverview", county:"Hillsborough County", slug:"riverview", heroH1:"Riverview's Reliable", heroH1Gold:"Gutter & Fascia Contractor", localP:"Riverview's explosive growth has brought thousands of new homes — many built quickly by volume builders. If your gutters were installed as part of a fast-paced new construction process, they may not have received the attention to pitch, hanger spacing, and material quality that a specialist provides. JR One fixes what builders cut corners on and installs new systems built to last.", weatherNote:"Riverview's position along the Alafia River means proper drainage is critical for preventing foundation issues and yard erosion.", neighborhoods:["FishHawk","Riverview Hills","Boyette","Summerfield","Pavilion"], nearbyText:"We also serve Brandon, Sun City Center, Ruskin, and surrounding Hillsborough County." },
  "new-port-richey": { name:"New Port Richey", county:"Pasco County", slug:"new-port-richey", heroH1:"New Port Richey's", heroH1Gold:"Aluminum Experts", localP:"New Port Richey's mix of waterfront properties and established inland neighborhoods requires gutter and soffit systems that can handle everything from coastal storms to tree debris. JR One serves New Port Richey and western Pasco County with the same Gold Standard approach we bring to every community across Tampa Bay.", weatherNote:"Gulf-facing properties in New Port Richey take direct impact from tropical systems. Hurricane-rated fastening and proper gutter sizing aren't optional here.", neighborhoods:["Gulf Harbors","Beacon Square","Seven Springs","Elfers","Port Richey"], nearbyText:"We also serve Spring Hill, Trinity, Tarpon Springs, and surrounding areas." },
  largo: { name:"Largo", county:"Pinellas County", slug:"largo", heroH1:"Largo's Trusted", heroH1Gold:"Gutter & Soffit Company", localP:"Largo sits in the heart of Pinellas County — close enough to the Gulf for salt air exposure, dense enough with tree canopy for constant gutter debris, and established enough that many homes have soffit and fascia systems that are well past their lifespan. JR One brings specialist-level aluminum work to Largo homeowners who want the job done right.", weatherNote:"Largo's central Pinellas location means you get both coastal weather and suburban tree coverage — a combination that accelerates gutter and soffit wear.", neighborhoods:["Largo Central","Belcher","Seminole","Ridgecrest","Oakhurst"], nearbyText:"We also serve Clearwater, Pinellas Park, Seminole, St. Petersburg, and surrounding areas." },
  "spring-hill": { name:"Spring Hill", county:"Hernando County", slug:"spring-hill", heroH1:"Spring Hill's Choice for", heroH1Gold:"Quality Gutter Work", localP:"Spring Hill's affordable housing and growing community make it an area where quality contractor work is in high demand but not always easy to find. JR One extends our Tampa Bay service area to Spring Hill because homeowners here deserve the same Gold Standard craftsmanship as any other community we serve.", weatherNote:"Spring Hill's inland position means intense thunderstorms and heavy seasonal rain without coastal wind relief. Gutters here work hard year-round.", neighborhoods:["Spring Hill Proper","Timber Pines","Weeki Wachee","Brooksville"], nearbyText:"We also serve New Port Richey, Land O' Lakes, and surrounding Hernando County." },
  "tarpon-springs": { name:"Tarpon Springs", county:"Pinellas County", slug:"tarpon-springs", heroH1:"Tarpon Springs' Trusted", heroH1Gold:"Gutter & Aluminum Specialists", localP:"Tarpon Springs is famous for its Greek heritage and historic Sponge Docks, with homes ranging from charming waterfront cottages to newer inland developments. Salt air from the Gulf and heavy summer storms put constant stress on gutters, soffit, and fascia — making quality aluminum work essential for preserving both the beauty and structure of Tarpon Springs homes.", weatherNote:"Tarpon Springs' direct Gulf exposure means salt-laden winds and driving rain during tropical systems. Corrosion-resistant aluminum and proper fastening are non-negotiable here.", neighborhoods:["Downtown Tarpon Springs","Sunset Hills","Anclote","Whitcomb Bayou"], nearbyText:"We also serve Palm Harbor, Dunedin, and New Port Richey." },
  "land-o-lakes": { name:"Land O' Lakes", county:"Pasco County", slug:"land-o-lakes", heroH1:"Land O' Lakes' Preferred", heroH1Gold:"Gutter & Soffit Experts", localP:"Land O' Lakes is one of Pasco County's fastest-growing areas, with newer construction communities popping up alongside established neighborhoods. Many of these homes were built quickly by volume builders, and the gutter and soffit installations often reflect that pace. JR One brings specialist-level precision to Land O' Lakes homeowners who want their aluminum work done right the first time.", weatherNote:"Pasco County's flat terrain and Land O' Lakes' numerous lakes and wetlands mean drainage is everything. Without properly pitched and sized gutters, water pools around foundations instead of being directed away.", neighborhoods:["Connerton","Lakeshore Ranch","Wilderness Lake","Dupree Lakes","Lake Padgett"], nearbyText:"We also serve Lutz, Wesley Chapel, and New Tampa." },
  dunedin: { name:"Dunedin", county:"Pinellas County", slug:"dunedin", heroH1:"Dunedin's Premier", heroH1Gold:"Aluminum & Gutter Team", localP:"Dunedin's historic downtown, coastal charm, and tree-lined streets make it one of Pinellas County's most desirable communities. Many homes here have character and age — which also means aging soffit, fascia, and gutter systems that need professional replacement. JR One serves Dunedin with the care these homes deserve, upgrading wood systems to durable aluminum that handles Gulf Coast weather.", weatherNote:"Dunedin's position between the Gulf and St. Joseph Sound means constant salt air exposure and direct impact from coastal storms. Quality materials and hurricane-rated fastening protect your investment.", neighborhoods:["Downtown Dunedin","Skinner Boulevard","Curlew Creek","Caladesi"], nearbyText:"We also serve Clearwater, Palm Harbor, and Tarpon Springs." },
  ruskin: { name:"Ruskin", county:"Hillsborough County", slug:"ruskin", heroH1:"Ruskin's Reliable", heroH1Gold:"Gutter & Fascia Contractor", localP:"Ruskin sits in southern Hillsborough County where agricultural roots meet rapid residential growth. From waterfront properties along Tampa Bay to newer inland developments, homes here need gutter and soffit systems built for Florida's toughest conditions. JR One brings the same Gold Standard craftsmanship to Ruskin that we deliver across all of Tampa Bay.", weatherNote:"Ruskin's low-lying terrain along Tampa Bay makes proper water management critical. Heavy seasonal rains combined with high water tables mean your gutters are the first line of defense against foundation and landscape damage.", neighborhoods:["Bahia Beach","Ruskin Colony","Sun City Center area","Apollo Beach"], nearbyText:"We also serve Sun City Center, Riverview, and Brandon." },
  "sun-city-center": { name:"Sun City Center", county:"Hillsborough County", slug:"sun-city-center", heroH1:"Sun City Center's Trusted", heroH1Gold:"Gutter Installation Experts", localP:"Sun City Center is one of Florida's premier active retirement communities, where homeowners take pride in well-maintained properties. Aging gutter systems, deteriorating soffit, and worn fascia don't just look bad — they compromise your home's protection. JR One understands the standards Sun City Center residents expect, and we deliver precise aluminum work that keeps homes protected and looking sharp.", weatherNote:"Sun City Center's southern Hillsborough location gets the full force of summer thunderstorms and tropical systems. Reliable gutters aren't optional — they're essential for protecting the home you've invested in.", neighborhoods:["Kings Point","Freedom Plaza","Sun City Center proper"], nearbyText:"We also serve Ruskin, Riverview, and Brandon." },
  "temple-terrace": { name:"Temple Terrace", county:"Hillsborough County", slug:"temple-terrace", heroH1:"Temple Terrace's Go-To", heroH1Gold:"Gutter & Soffit Specialists", localP:"Temple Terrace is one of Tampa's most established communities, with mature tree canopy and neighborhoods that have been here for decades. That age means many homes are running on original wood soffit and outdated gutter systems that Florida's weather has been punishing for years. JR One replaces failing systems with durable aluminum built to handle what Temple Terrace's climate throws at it.", weatherNote:"Temple Terrace's dense tree coverage means constant gutter debris from oaks and pines, while the Hillsborough River corridor adds humidity and drainage challenges that demand properly functioning gutter systems.", neighborhoods:["Temple Crest","Terrace Walk","Temple Terrace Golf","Riverhills"], nearbyText:"We also serve Tampa, Brandon, and Lutz." },
  "plant-city": { name:"Plant City", county:"Hillsborough County", slug:"plant-city", heroH1:"Plant City's Choice for", heroH1Gold:"Quality Gutter Systems", localP:"Plant City — the Strawberry Capital of the World — sits in eastern Hillsborough County where suburban living meets agricultural heritage. Homes here face the same intense Florida weather as the rest of Tampa Bay, and quality gutter and soffit work is essential for protecting your property. JR One extends our Gold Standard service to Plant City because every homeowner deserves specialist-level aluminum work.", weatherNote:"Plant City's inland position puts it squarely in Florida's thunderstorm corridor. Intense afternoon downpours dump massive amounts of water in short bursts, and your gutter system needs to handle the volume without overflow or backup.", neighborhoods:["Walden Lake","Plantation Oaks","Downtown Plant City"], nearbyText:"We also serve Brandon, Lakeland, and Tampa." },
  lutz: { name:"Lutz", county:"Hillsborough/Pasco County", slug:"lutz", heroH1:"Lutz's Trusted", heroH1Gold:"Aluminum & Gutter Specialists", localP:"Lutz straddles the Hillsborough-Pasco county line, offering a suburban feel with heavy tree canopy and established neighborhoods alongside newer developments. That tree coverage is beautiful but means constant gutter debris, and many older Lutz homes are overdue for soffit and fascia upgrades. JR One serves Lutz with the same precision and thoroughness we bring to every Tampa Bay community.", weatherNote:"Lutz's signature oak and pine canopy drops debris year-round, making gutter maintenance and guards especially important. Combined with Florida's heavy seasonal rains, clogged gutters here lead to fascia rot and foundation issues fast.", neighborhoods:["Heritage Isles","Calusa Trace","Cheval","Lake Park"], nearbyText:"We also serve Land O' Lakes, Wesley Chapel, and Tampa." },
};


const SERVICES = [
  {title:"Seamless Gutter Installation",desc:"Custom-fabricated on-site for a perfect, leak-free fit.",link:"/seamless-aluminum-gutters"},
  {title:"Gutter Guards",desc:"Keep debris out and make maintenance easier.",link:"/gutter-guards"},
  {title:"Soffit & Fascia",desc:"Aluminum and vinyl protection for your roof edge.",link:"/soffit-and-fascia"},
  {title:"Gutter Repair",desc:"Fix leaks, sagging, and overflow — done right the first time.",link:"/gutter-repair"},
  {title:"Siding",desc:"Vinyl and aluminum siding built for Florida weather.",link:"/siding"},
  {title:"Peak 301 Roof Rejuvenation",desc:"Extend your roof's life 6-10 years with this soy-based sealant.",link:"/peak-301"},
];

// ══ CITY PAGE COMPONENT ══════════════════════════════════
// Pass citySlug as prop — defaults to "tampa" for preview
export default function CityLandingPage({ citySlug = "tampa" }) {
  const city = CITIES[citySlug];
  const [formData, setFormData] = useState({name:"",phone:"",email:"",zip:"",service:""});
  const [submitted, setSubmitted] = useState(false);
  useEffect(() => { injectFonts(); }, []);
  const secTitle = {fontFamily:f.h,fontSize:"clamp(24px,4vw,36px)",fontWeight:800,letterSpacing:"2px",textAlign:"center",marginBottom:"8px"};

  if (!city) return <div style={{padding:"100px 24px",textAlign:"center",fontFamily:f.h,color:C.white,background:C.bg}}>City page not found. Available: {Object.keys(CITIES).join(", ")}</div>;

  return (
    <div style={{background:C.bg,color:C.white,fontFamily:f.b,lineHeight:1.65,minHeight:"100vh"}}>
      <SiteNav promoBanner={"🏠 Serving " + city.name + " — Call (844) 444-3114 for Your Free Quote"} />
      <div style={{padding:"16px 24px 0",maxWidth:"1200px",margin:"0 auto"}}><div style={{fontFamily:f.b,fontSize:"13px",color:C.muted}}><a href="/" style={{color:C.muted,textDecoration:"none"}}>Home</a><span style={{margin:"0 8px",opacity:0.5}}>/</span><span>Service Areas</span><span style={{margin:"0 8px",opacity:0.5}}>/</span><span style={{color:C.gold}}>{city.name}</span></div></div>

      {/* HERO */}
      <section className="hero-stars" style={{padding:"60px 24px 80px",maxWidth:"1200px",margin:"0 auto",display:"flex",gap:"48px",alignItems:"center",flexWrap:"wrap"}}>
        <div style={{flex:"1 1 520px",minWidth:"300px"}}>
          <Tag>{city.name.toUpperCase()}, FL</Tag>
          <h1 style={{fontFamily:f.h,fontSize:"clamp(32px,5vw,48px)",fontWeight:800,lineHeight:1.1,marginBottom:"20px"}}>{city.heroH1}<br/><span style={{color:C.gold}}>{city.heroH1Gold}</span></h1>
          <p style={{fontFamily:f.b,fontSize:"18px",color:C.offWhite,lineHeight:1.7,marginBottom:"24px",maxWidth:"560px"}}>{city.localP}</p>
          <div style={{display:"flex",flexWrap:"wrap",gap:"12px",marginBottom:"24px"}}>
            {[
              { label: "30+ Years", icon: "⏱", color: "#60A5FA", bg: "rgba(59,130,246,0.15)", border: "rgba(59,130,246,0.25)" },
              { label: "4.9★ Google", icon: "⭐", color: "#D4A843", bg: "rgba(212,168,67,0.15)", border: "rgba(212,168,67,0.25)" },
              { label: "In-House Crews", icon: "👷", color: "#F97316", bg: "rgba(249,115,22,0.15)", border: "rgba(249,115,22,0.25)" },
              { label: "Fully Insured", icon: "✓", color: "#4ADE80", bg: "rgba(45,139,78,0.15)", border: "rgba(45,139,78,0.25)" },
            ].map((badge, i) => (
              <span key={i} style={{ display: "inline-flex", alignItems: "center", gap: "6px", padding: "6px 14px", background: badge.bg, border: `1px solid ${badge.border}`, borderRadius: "6px", fontFamily: f.h, fontSize: "12px", fontWeight: 600, color: badge.color }}><span>{badge.icon}</span>{badge.label}</span>
            ))}
          </div>
          <div style={{display:"flex",gap:"16px",flexWrap:"wrap"}}>
            <button onClick={()=>document.getElementById("city-form")?.scrollIntoView({behavior:"smooth"})} style={{padding:"16px 32px",fontFamily:f.h,fontSize:"14px",fontWeight:700,letterSpacing:"1.5px",color:C.white,background:`linear-gradient(135deg,${C.gold},${C.goldLight})`,border:"none",borderRadius:"8px",cursor:"pointer",boxShadow:"0 4px 16px rgba(200,149,46,0.3)"}}>GET YOUR FREE QUOTE</button>
            <a href="tel:8444443114" style={{display:"inline-flex",alignItems:"center",padding:"16px 32px",fontFamily:f.h,fontSize:"14px",fontWeight:700,letterSpacing:"1.5px",color:C.gold,border:`2px solid ${C.gold}`,borderRadius:"8px",textDecoration:"none"}}>📞 (844) 444-3114</a>
          </div>
        </div>
        <div style={{flex:"1 1 380px",minWidth:"300px",maxWidth:"440px"}}>
          <div style={{background:C.white,borderRadius:"16px",padding:"28px",boxShadow:"0 24px 80px rgba(0,0,0,0.4)"}}>
            <h2 style={{fontFamily:f.h,fontSize:"18px",fontWeight:700,color:C.navy,textAlign:"center",marginBottom:"4px"}}>Free Quote for {city.name} Homeowners</h2>
            <div style={{width:"40px",height:"3px",background:C.gold,borderRadius:"2px",margin:"10px auto 20px"}} />
            {submitted ? <div style={{textAlign:"center",padding:"20px 0"}}><div style={{fontSize:"40px",marginBottom:"8px"}}>✓</div><h3 style={{fontFamily:f.h,fontSize:"18px",fontWeight:700,color:C.navy}}>Request Received!</h3><p style={{fontFamily:f.b,fontSize:"14px",color:"#6B7280",marginTop:"6px"}}>We'll be in touch within hours.</p></div> : <>
              <input style={inputStyle} placeholder="Full Name" value={formData.name} onChange={e=>setFormData({...formData,name:e.target.value})} />
              <input style={inputStyle} placeholder="Phone Number" type="tel" value={formData.phone} onChange={e=>setFormData({...formData,phone:e.target.value})} />
              <input style={inputStyle} placeholder="Email Address" type="email" value={formData.email} onChange={e=>setFormData({...formData,email:e.target.value})} />
              <select style={{...inputStyle,cursor:"pointer"}} value={formData.service} onChange={e=>setFormData({...formData,service:e.target.value})}>
                {["What do you need?","Gutter Installation","Gutter Repair","Gutter Guards","Soffit & Fascia","Siding","Peak 301 Roof Rejuvenation","Other"].map((o,i)=><option key={i} value={i===0?"":o}>{o}</option>)}
              </select>
              <button onClick={()=>setSubmitted(true)} style={{width:"100%",padding:"16px",fontFamily:f.h,fontSize:"13px",fontWeight:700,letterSpacing:"1.5px",color:C.white,background:`linear-gradient(135deg,${C.gold},${C.goldLight})`,border:"none",borderRadius:"8px",cursor:"pointer"}}>REQUEST MY FREE QUOTE</button>
              <p style={{fontFamily:f.b,fontSize:"11px",color:"#9CA3AF",textAlign:"center",marginTop:"10px"}}>No spam. No pressure.</p>
            </>}
          </div>
        </div>
      </section>

      {/* WEATHER NOTE */}
      <section style={{background:C.navy,padding:"48px 24px"}}>
        <div style={{maxWidth:"800px",margin:"0 auto",display:"flex",gap:"20px",alignItems:"flex-start"}}>
          <div style={{fontSize:"28px",flexShrink:0,marginTop:"4px"}}>🌧️</div>
          <div>
            <h3 style={{fontFamily:f.h,fontSize:"16px",fontWeight:700,color:C.gold,marginBottom:"8px"}}>Why Gutters Matter in {city.name}</h3>
            <p style={{fontFamily:f.b,fontSize:"16px",color:C.offWhite,lineHeight:1.65}}>{city.weatherNote}</p>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section style={{background:C.bg,padding:"80px 24px"}}>
        <div style={{maxWidth:"1200px",margin:"0 auto",textAlign:"center"}}>
          <Tag>SERVICES IN {city.name.toUpperCase()}</Tag>
          <h2 style={{...secTitle,color:C.white}}>WHAT WE DO IN {city.name.toUpperCase()}</h2>
          <GoldBar />
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(300px,1fr))",gap:"20px",marginTop:"48px",textAlign:"left"}}>
            {SERVICES.map((svc,i) => (
              <a key={i} href={svc.link} style={{textDecoration:"none",background:C.navyFade,border:`1px solid ${C.navyLight}`,borderRadius:"12px",padding:"24px",cursor:"pointer",transition:"border-color 0.3s",display:"block"}} onMouseOver={e=>e.currentTarget.style.borderColor=C.gold} onMouseOut={e=>e.currentTarget.style.borderColor=C.navyLight}>
                <h3 style={{fontFamily:f.h,fontSize:"16px",fontWeight:700,color:C.white,marginBottom:"6px"}}>{svc.title}</h3>
                <p style={{fontFamily:f.b,fontSize:"14px",color:C.muted,marginBottom:"12px"}}>{svc.desc}</p>
                <span style={{fontFamily:f.h,fontSize:"12px",fontWeight:700,color:C.gold,letterSpacing:"1px"}}>LEARN MORE →</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* GOLD STANDARD */}
      <section style={{background:C.cream,padding:"80px 24px"}}>
        <div style={{maxWidth:"900px",margin:"0 auto",textAlign:"center"}}>
          <Tag>THE GOLD STANDARD</Tag>
          <h2 style={{...secTitle,color:C.navy}}>HOW WE WORK IN {city.name.toUpperCase()}</h2>
          <GoldBar />
          <p style={{fontFamily:f.b,fontSize:"17px",color:"#4B5563",fontStyle:"italic",maxWidth:"500px",margin:"0 auto 48px"}}>Every home. Every time. No exceptions.</p>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))",gap:"20px"}}>
            {[{n:"01",t:"Assess",d:"Free on-site inspection"},{n:"02",t:"Design",d:"Transparent custom estimate"},{n:"03",t:"Install",d:"Our in-house crew, precision work"},{n:"04",t:"Protect",d:"Warranty and follow-up"}].map((s,i) => (
              <div key={i} style={{background:C.white,borderRadius:"12px",padding:"24px",textAlign:"center",borderTop:`3px solid ${C.gold}`}}>
                <div style={{fontFamily:f.h,fontSize:"28px",fontWeight:800,color:C.gold}}>{s.n}</div>
                <h3 style={{fontFamily:f.h,fontSize:"16px",fontWeight:700,color:C.navy,margin:"8px 0 4px"}}>{s.t}</h3>
                <p style={{fontFamily:f.b,fontSize:"14px",color:"#6B7280"}}>{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* NEIGHBORHOODS */}
      <section style={{background:C.bg,padding:"60px 24px"}}>
        <div style={{maxWidth:"900px",margin:"0 auto",textAlign:"center"}}>
          <h3 style={{fontFamily:f.h,fontSize:"18px",fontWeight:700,color:C.white,marginBottom:"20px"}}>{city.name} Neighborhoods We Serve</h3>
          <div style={{display:"flex",flexWrap:"wrap",justifyContent:"center",gap:"8px"}}>
            {city.neighborhoods.map((n,i) => (
              <span key={i} style={{padding:"8px 16px",background:C.navyFade,border:`1px solid ${C.navyLight}`,borderRadius:"6px",fontFamily:f.b,fontSize:"14px",color:C.offWhite}}>{n}</span>
            ))}
          </div>
          <p style={{fontFamily:f.b,fontSize:"14px",color:C.muted,marginTop:"20px"}}>{city.nearbyText}</p>
        </div>
      </section>

      {/* REVIEWS */}
      <section style={{background:C.navy,padding:"80px 24px"}}>
        <div style={{maxWidth:"900px",margin:"0 auto",textAlign:"center"}}>
          <Tag>REVIEWS</Tag>
          <h2 style={{...secTitle,color:C.white}}>TRUSTED ACROSS TAMPA BAY</h2>
          <GoldBar />
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))",gap:"20px",marginTop:"48px",textAlign:"left"}}>
            {[
              {text:"From the very beginning, they worked to ensure I received a fair quote. No high pressure selling. The workmanship was outstanding.",name:"Lois G.",loc:"Tampa"},
              {text:"After Milton I called a dozen companies — only JR One called back. The team showed up and did a perfect job.",name:"Matt D.",loc:"Tampa Bay"},
              {text:"Six guys on site with a crew manager. Replaced all soffit and fascia with aluminum, fixed all termite damage — done in days.",name:"Tampa Homeowner",loc:city.county},
            ].map((rev,i) => (
              <div key={i} style={{background:C.navyFade,border:`1px solid ${C.navyLight}`,borderRadius:"12px",padding:"24px"}}>
                <Stars />
                <p style={{fontFamily:f.b,fontSize:"14px",color:C.offWhite,lineHeight:1.6,margin:"12px 0",fontStyle:"italic"}}>"{rev.text}"</p>
                <div style={{display:"flex",justifyContent:"space-between"}}><span style={{fontFamily:f.h,fontSize:"13px",fontWeight:600,color:C.white}}>{rev.name}</span><span style={{fontFamily:f.b,fontSize:"12px",color:C.muted}}>{rev.loc}</span></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA FORM */}
      <section id="city-form" style={{background:`linear-gradient(165deg,${C.navyMid},${C.navy})`,padding:"80px 24px"}}><div style={{maxWidth:"600px",margin:"0 auto",textAlign:"center"}}>
        <h2 style={{fontFamily:f.h,fontSize:"clamp(28px,5vw,36px)",fontWeight:800,color:C.white,marginBottom:"12px"}}>{city.name} HOMEOWNER? LET'S TALK.</h2>
        <p style={{fontFamily:f.b,fontSize:"17px",color:C.offWhite,marginBottom:"32px"}}>Get your free, no-pressure quote from Tampa Bay's trusted aluminum specialists. We respond within hours.</p>
        <div style={{display:"flex",gap:"16px",justifyContent:"center",flexWrap:"wrap"}}>
          <a href="tel:8444443114" style={{display:"inline-flex",alignItems:"center",gap:"8px",padding:"16px 32px",fontFamily:f.h,fontSize:"14px",fontWeight:700,letterSpacing:"1.5px",color:C.navy,background:`linear-gradient(135deg,${C.gold},${C.goldLight})`,borderRadius:"8px",textDecoration:"none"}}>📞 CALL (844) 444-3114</a>
          <button onClick={()=>window.scrollTo({top:0,behavior:"smooth"})} style={{padding:"16px 32px",fontFamily:f.h,fontSize:"14px",fontWeight:700,letterSpacing:"1.5px",color:C.gold,background:"transparent",border:`2px solid ${C.gold}`,borderRadius:"8px",cursor:"pointer"}}>SCROLL TO FORM</button>
        </div>
      </div></section>

      <SiteFooter />
      <MobileCTA scrollTarget="city-form" />
      <style>{`*{box-sizing:border-box;margin:0;padding:0}::placeholder{color:#9CA3AF}input:focus,select:focus{border-color:${C.gold}!important}`}</style>
    </div>
  );
}
