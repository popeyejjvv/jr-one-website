"use client";

import { useState, useEffect } from "react";
import SiteNav from "../../components/SiteNav";
import SiteFooter from "../../components/SiteFooter";
import MobileCTA from "../../components/MobileCTA";

const injectFonts = () => { if (typeof document==="undefined"||document.querySelector("#jr-fonts")) return; const l=document.createElement("link"); l.id="jr-fonts"; l.rel="stylesheet"; l.href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800&family=Source+Sans+3:wght@300;400;600&display=swap"; document.head.appendChild(l); };
const C = { bg:"#0B1628",navy:"#1B2A4A",navyMid:"#243556",navyLight:"#2C3E5A",navyFade:"#162033",gold:"#C8952E",goldLight:"#D4A843",goldPale:"rgba(200,149,46,0.12)",cream:"#F5F3EF",white:"#FFFFFF",offWhite:"#E8E4DC",muted:"#7A8FA8",charcoal:"#2D2D2D" };
const f = { h:"'Montserrat', sans-serif", b:"'Source Sans 3', sans-serif" };
const Tag = ({children}) => <div style={{display:"inline-block",padding:"6px 16px",background:C.goldPale,borderRadius:"4px",marginBottom:"12px"}}><span style={{fontFamily:f.h,fontSize:"12px",fontWeight:700,color:C.gold,letterSpacing:"3px"}}>{children}</span></div>;
const GoldBar = () => <div style={{width:"60px",height:"3px",background:`linear-gradient(90deg,${C.gold},${C.goldLight})`,borderRadius:"2px",margin:"16px auto"}} />;

const CATEGORIES = [
  { name:"General", icon:"🏠", faqs:[
    {q:"What services does JR One offer?",a:"We specialize in seamless aluminum gutters (6\" and 7\"), copper gutters, gutter guards (aluminum, standard, micro mesh, and EZ mesh), soffit and fascia installation, siding, SAGIPER architectural cladding, gutter repair, Peak 301 roof rejuvenation, Govee smart light installation, drainage installation (French drains, catch basins, channel drains), and comprehensive maintenance plans. We're aluminum exterior specialists — that's all we do, and we do it right."},
    {q:"What areas do you serve?",a:"We serve 21 cities across Tampa Bay and Florida's west coast: Bradenton, Brandon, Clearwater, Dunedin, Lakeland, Land O' Lakes, Largo, Lutz, New Port Richey, Palm Harbor, Plant City, Riverview, Ruskin, Sarasota, Spring Hill, St. Petersburg, Sun City Center, Tampa, Tarpon Springs, Temple Terrace, and Wesley Chapel. If you're within an hour of Tampa, call us — we probably cover your area."},
    {q:"Do you use subcontractors?",a:"Never. Every person on your property is a trained, full-time JR One crew member. We run three in-house crews. This is how we maintain quality control and accountability on every job. Many of the complaints homeowners have about other contractors come from subcontracted work — we eliminated that problem entirely."},
    {q:"How long has JR One been in business?",a:"Our roots go back to 1990 when our founder Javier Rivera began installing gutters in Tampa. The business has been serving Tampa Bay for over 30 years across two generations. Many of the gutter and soffit companies operating in the Tampa market today trace their knowledge back to Javier — people who worked for him, worked with him, or learned alongside him."},
    {q:"Do you speak Spanish?",a:"Yes. JR One is a fully bilingual company — English and Spanish. We communicate in whichever language you're most comfortable with from the first call through final walkthrough. All our insurance documents and resources are available in both languages."},
    {q:"Do you offer free estimates?",a:"Yes. We provide free on-site assessments for all services. We'll inspect your home, discuss your needs, and provide a detailed, transparent estimate with no obligation and no pressure. You can also use our online Aerial Estimator tool to measure your roof from satellite imagery and get an instant price range before we even visit."},
    {q:"What makes JR One different from other contractors?",a:"Three things: (1) We only do aluminum exteriors — gutters, soffit, fascia, siding, guards, drainage. No roofing, no painting, no general contracting. This means our crews are specialists, not generalists. (2) All in-house crews — no subcontractors, ever. (3) 30+ years of Tampa Bay experience across two generations. We've installed on some of the same homes twice."},
    {q:"What is the Gold Standard process?",a:"Every JR One project follows four steps: Assess (inspect your home and identify the real problem), Design (custom solution with transparent pricing), Install (our trained crew does the work — no shortcuts), and Protect (final walkthrough, documentation, and warranty). This process applies to every service, every home, no exceptions."},
    {q:"Are you licensed and insured?",a:"Yes. JR One Aluminum LLC is fully licensed and insured in the state of Florida. We carry general liability insurance and workers' compensation coverage. We're happy to provide proof of insurance to any homeowner or property manager who requests it."},
  ]},
  { name:"Gutters", icon:"💧", faqs:[
    {q:"What gutter sizes do you install?",a:"We install 6\" and 7\" seamless aluminum gutters. 6\" handles most residential applications with excellent water capacity. 7\" is our high-capacity option for larger roof areas, steeper pitches, and commercial buildings. We assess your roof and recommend the right size — we don't default to undersized gutters to save a few dollars."},
    {q:"How much do new gutters cost in Tampa?",a:"Seamless aluminum gutter installation in Tampa varies based on gutter size (6\" or 7\"), linear footage, accessibility, number of corners, downspout configuration, and stories. We provide detailed, line-item estimates so you see exactly what you're paying for. Use our Aerial Estimator at jronegutters.com/estimator for an instant ballpark range."},
    {q:"What are seamless gutters and why do they matter?",a:"Seamless gutters are custom-formed on-site from a single continuous piece of aluminum — no seams, no joints, no splice points along the run. Traditional sectional gutters have joints every 10 feet that eventually leak. Seamless gutters eliminate those failure points, which means fewer leaks, less maintenance, and a cleaner look on your home."},
    {q:"How long do seamless gutters last?",a:"With proper maintenance, quality seamless aluminum gutters last 20–30 years in Florida's climate. The aluminum itself doesn't rust or rot. What shortens gutter life is neglect — clogged downspouts, standing water, and debris buildup that causes corrosion. That's why we recommend maintenance plans and gutter guards."},
    {q:"How long does gutter installation take?",a:"Most residential gutter installations are completed in a single day. Homes with complex rooflines, multiple stories, or combined projects (gutters + soffit/fascia + guards) may take 2–3 days. We give you a timeline before we start and stick to it."},
    {q:"What downspout options do you offer?",a:"We install standard rectangular, smooth rectangular, round (two sizes), 4×5 commercial, box commercial downspouts, and decorative rain chains. Downspout size and placement are calculated based on your gutter size and roof square footage to ensure proper water handling — not just aesthetics."},
    {q:"Do you offer copper gutters?",a:"Yes. We install premium copper half-round and K-style gutter systems with matching copper downspouts, leader heads, and rain chains. Copper develops a natural patina over time and lasts 50+ years with zero maintenance. It's a lifetime investment for homeowners who want the best."},
    {q:"Why should I hire a gutter specialist instead of my roofer?",a:"Roofing companies typically subcontract gutter work to the lowest bidder. The result is often incorrect pitch, thin-gauge material, and poor corner work that leads to leaks within a few years. We specialize exclusively in aluminum systems — it's all we do. Every installation is performed by our trained in-house crew using commercial-grade materials."},
    {q:"My gutters are overflowing during heavy rain. What's wrong?",a:"Three common causes: (1) Gutters are clogged with debris — needs cleaning. (2) Gutters are undersized for your roof area — common when builders install undersized gutters on homes that need 6\" or 7\". (3) Gutters are improperly pitched — water pools instead of flowing to the downspouts. We diagnose the exact cause during a free inspection."},
    {q:"Do you handle gutter repair or only full replacement?",a:"Both. We repair sagging sections, fix leaking seams and corners, replace damaged downspouts, re-pitch gutters for proper drainage, and re-secure hangers. If repair makes sense, we'll tell you. If your system is beyond repair, we'll be honest about that too."},
  ]},
  { name:"Gutter Guards", icon:"🛡️", faqs:[
    {q:"Do gutter guards really work?",a:"Yes — guards are highly effective at keeping debris out of your gutters and preventing clogs in downspouts and drainage. They don't eliminate all maintenance, but they dramatically reduce cleaning frequency from 2–4 times per year down to once per year or less. The real value is preventing the damage that clogged gutters cause: foundation erosion, fascia rot, landscape damage, and pest problems."},
    {q:"What types of gutter guards do you install?",a:"We install four types: Aluminum guards (solid with water channels — best for heavy debris), Standard screen guards (cost-effective general protection), Micro Mesh guards (finest filtration — blocks pine needles, shingle grit, and small seeds), and EZ Mesh guards (easy-maintenance option with excellent airflow). We recommend the right type based on your tree coverage and debris type."},
    {q:"Do I still need to clean my gutters after guards are installed?",a:"Yes, but much less often. Guards keep debris from getting inside your gutters — that's where the real damage happens. Surface buildup on top of guards still needs occasional clearing, typically once a year. Compare that to cleaning unprotected gutters 2–4 times per year. We offer maintenance programs to handle this for you."},
    {q:"What's the best gutter guard for pine needles?",a:"Micro mesh guards are the most effective option for pine needles. Standard screen guards have openings large enough for needles to pass through and accumulate inside. Micro mesh blocks everything down to shingle grit while still allowing full water flow. If you have pine trees, oak trees, or palm fronds, micro mesh is what we recommend."},
    {q:"Can guards be installed on my existing gutters?",a:"Yes. We retrofit guards onto existing gutter systems — you don't need new gutters to get guard protection. We inspect your existing gutters first to make sure they're in good condition, properly pitched, and securely attached. If repairs are needed, we handle those before installing guards."},
    {q:"What's the difference between your guards and LeafFilter or other national brands?",a:"National companies like LeafFilter use high-pressure sales, charge premium prices (often 2–3x local rates), and subcontract installation to whoever's available. We're the local team — you deal directly with us, get honest pricing without franchise markup, and our own crew does both consultation and installation. No salespeople in your living room for two hours."},
    {q:"Will gutter guards void my gutter warranty?",a:"No. Our guard installations are designed to work with your existing gutter system without modifying or damaging the gutters themselves. If we installed your gutters, the workmanship warranty remains fully intact."},
    {q:"How long do gutter guards last?",a:"Aluminum and micro mesh guards last 15–20+ years. They're exposed to the same weather as your gutters but don't carry water weight or debris buildup, so they typically outlast the gutters themselves. We use commercial-grade materials — not the thin stuff you find at home improvement stores."},
  ]},
  { name:"Soffit & Fascia", icon:"🏗️", faqs:[
    {q:"What's the difference between soffit and fascia?",a:"Soffit is the horizontal panel underneath your roof overhang — it seals the gap between the roofline and the exterior wall. Fascia is the vertical board along the edge of your roofline where gutters attach. Together they protect the edges of your roof structure from water, pests, and weather. When either fails, moisture gets into your attic and roof framing."},
    {q:"Should I choose aluminum or vinyl soffit?",a:"For Florida, we strongly recommend aluminum. It's more durable in extreme heat (vinyl can warp above 120°F — common in direct Florida sun), handles impact better during storms, doesn't fade as quickly, and lasts significantly longer. Vinyl is a budget option that works for some situations, but aluminum is the better long-term investment in our climate."},
    {q:"Do you repair the wood underneath before installing new soffit?",a:"Yes — and this is the most critical step most contractors skip. We pull back the existing soffit and inspect every inch of wood substrate. Rotted, water-damaged, or termite-compromised wood gets replaced before any new material goes on. Wrapping new aluminum over rotten wood is like putting a bandaid on a broken bone — it looks fine but the problem gets worse underneath."},
    {q:"How do I know if my soffit or fascia needs replacing?",a:"Warning signs: paint peeling or bubbling, visible water staining, sagging or warped panels, holes or cracks, soft spots when you push on the material, pest activity near your roofline (wasps, squirrels, birds getting in), detached pieces after storms, or visible daylight from inside your attic. If your home is 15+ years old with original wood soffit, it's worth a free inspection."},
    {q:"How long does soffit and fascia installation take?",a:"Most residential soffit and fascia jobs take 1–3 days depending on the size of your home, the extent of wood repair needed, and accessibility. We give you a timeline before we start. If we discover hidden damage during installation, we'll communicate immediately and adjust — no surprises on the invoice."},
    {q:"What colors and styles are available?",a:"We offer a full range of aluminum soffit colors and styles including solid, vented, and beaded profiles. Fascia wrap is custom-bent on-site to match your exact trim dimensions. Color options include white, almond, brown, black, and custom-matched colors. We bring samples to your consultation so you can see options against your home."},
    {q:"Can you replace just the fascia without replacing the soffit?",a:"Yes. We can replace fascia independently if your soffit is in good condition. However, we always inspect both during our assessment because they work as a system. Replacing fascia while ignoring damaged soffit just moves the failure point. We'll give you an honest recommendation on what actually needs attention."},
    {q:"Does new soffit improve my home's ventilation?",a:"Yes. Vented soffit panels allow air to flow into your attic space, which is critical in Florida. Proper attic ventilation reduces heat buildup (which shortens shingle life), prevents moisture condensation (which causes mold and wood rot), and lowers your cooling costs. If your existing soffit is solid with no vents, upgrading to vented panels is one of the best investments you can make."},
  ]},
  { name:"Peak 301 & Insurance", icon:"⚠️", faqs:[
    {q:"What is Peak 301?",a:"Peak 301 is an all-natural, soy-based roof rejuvenation sealant manufactured by Colorbiotics (a Sika company). It penetrates into your shingle material and restores the oils that UV exposure and heat have depleted over time. It is not a coating, paint, or spray — it works from the inside of the shingle out, restoring flexibility, waterproofing, and structural integrity at the molecular level."},
    {q:"How much does Peak 301 cost compared to roof replacement?",a:"Peak 301 treatment costs under 15% of what a full roof replacement would cost. For most Tampa Bay homes, that means a few thousand dollars instead of $15,000–$25,000+. The treatment includes application by our crew, warranty documentation, and coordination with an inspector for your Remaining Useful Life (RUL) certification."},
    {q:"Will Peak 301 help me keep my homeowner's insurance?",a:"That's one of its biggest benefits. Florida insurers have increased policy non-renewals by 280% since 2018, primarily targeting roofs over 15 years old. Peak 301 comes with warranty documentation that, combined with a Remaining Useful Life (RUL) certification from an authorized inspector, provides exactly what Florida law (Statute 627.7011) requires carriers to accept for policy renewal."},
    {q:"Is my roof a good candidate for Peak 301?",a:"Most asphalt shingle roofs between 8 and 20 years old are good candidates. Your roof should be structurally sound with no active leaks, no major missing sections, and no severe curling or warping. We inspect every roof honestly before recommending treatment. Not every roof qualifies — and we'd rather tell you the truth than sell a treatment that won't deliver."},
    {q:"Is Peak 301 the same as a roof coating?",a:"No — and this distinction matters. Peak 301 is a penetrating sealant that soaks into your shingles and restores depleted oils from the inside out. Roof coatings create a surface film on top of shingles, which ARMA (the Asphalt Roofing Manufacturers Association) warns against for asphalt shingle roofs. Rejuvenation and coating are two entirely different products."},
    {q:"How long does the treatment last?",a:"Peak 301 adds 6 to 10 years of life to your existing roof, backed by a 6-year warranty guaranteeing a minimum of 6 years added useful life. The exact duration depends on your roof's current condition, age, and shingle type — which we assess before recommending treatment."},
    {q:"What is a Remaining Useful Life (RUL) certification?",a:"An RUL certification is a professional inspection report from a licensed authorized inspector stating that your roof has at least 5 years of remaining useful life. Under Florida Statute 627.7011, insurers cannot refuse to issue or renew your policy solely because of roof age when you provide a valid RUL certification. Peak 301 treatment supports this certification by restoring your shingles to a condition that demonstrates viable remaining life."},
    {q:"What Florida laws protect my roof insurance rights?",a:"Several key laws: Senate Bill 2D (2022) prevents insurers from dropping you solely due to roof age if you have a valid RUL certification. House Bill 1611 (2024) expanded the pool of authorized inspectors to include licensed roofing contractors. Senate Bill 808 and House Bill 815 (both effective July 2026) further expand protections to all property insurance policies and require insurers to base decisions on roof condition, not age. Visit our Insurance Resource Center for the full breakdown."},
    {q:"What should I do if I get a non-renewal notice from my insurer?",a:"Don't panic. Step 1: Request the reason for non-renewal in writing. Step 2: If it's roof age, exercise your right to an inspection under FL Statute 627.7011. Step 3: Get a certified RUL inspection from an authorized inspector. Step 4: Submit the RUL certification with your renewal request. Step 5: If they still refuse, file a complaint with the Florida Office of Insurance Regulation (FLOIR). We walk you through this entire process and provide free document templates at jronegutters.com/insurance-resource-center."},
    {q:"Is Peak 301 safe for my home and landscaping?",a:"Yes. The soy-based formula is non-toxic, biodegradable, and completely safe for your landscaping, pets, and family. No harsh chemicals, no toxic fumes, no environmental concerns. Your landscaping will not be affected by the treatment."},
  ]},
  { name:"Siding & SAGIPER", icon:"🏠", faqs:[
    {q:"What types of siding do you install?",a:"We install vinyl siding, aluminum siding, and SAGIPER premium architectural cladding. Each has different applications — vinyl and aluminum for standard residential siding, SAGIPER for high-end architectural design where aesthetics, durability, and heat performance are critical."},
    {q:"What is SAGIPER and why is it different?",a:"SAGIPER is a premium PVC architectural cladding system from Europe with Solar Shield Technology — the only siding product engineered to handle dark colors in direct Florida sun without warping, fading, or heat damage. Standard vinyl siding is limited to light colors in Florida because dark vinyl absorbs too much heat and distorts. SAGIPER eliminates that limitation while offering modern, design-forward profiles you can't get with standard siding."},
    {q:"Can I use dark-colored siding in Florida?",a:"With standard vinyl siding, no — dark colors absorb too much heat and will warp, buckle, or distort in Florida's sun. With SAGIPER's Solar Shield Technology, yes. SAGIPER is the only product that allows dark exterior cladding in direct Florida sunlight without heat-related failure. This is a major advantage for homeowners and architects who want modern dark exteriors."},
    {q:"How long does siding installation take?",a:"Timeline depends on home size and scope. A standard single-story home typically takes 3–5 days. Larger homes, multi-story work, or projects involving substrate repair may take longer. We provide a specific timeline during your consultation."},
    {q:"Do you repair or replace the wall sheathing underneath?",a:"Yes. Like our soffit work, we inspect the substrate before covering it. If there's moisture damage, rot, or compromised sheathing, we repair it first. Covering bad substrate with new siding creates hidden problems that get worse over time."},
  ]},
  { name:"Warranty & Financing", icon:"📋", faqs:[
    {q:"What warranty do you offer?",a:"We provide a 3-year workmanship warranty from the date of substantial completion. This covers defects in our labor that materially affect system performance under normal residential use. If our work fails because of how we installed it, we come back and fix it at no cost. Product warranties from manufacturers (for gutters, guards, siding, Peak 301, etc.) are separate and vary by product."},
    {q:"Do you offer financing?",a:"Yes. We partner with trusted third-party financing providers so you can protect your home now and pay over time. Quick approval process, flexible terms, and your project pricing stays the same whether you finance or pay in full. Apply through our website or ask about financing during your consultation."},
    {q:"Do I need good credit to qualify for financing?",a:"Our financing partners work with a range of credit profiles. The initial check is typically a soft pull that doesn't affect your credit score. Approval amounts and terms depend on your specific situation. We encourage everyone to apply — you might be surprised."},
    {q:"How do I make a warranty claim?",a:"Call (844) 444-3114 or email info@jronegutters.com. Describe the issue, and we'll schedule an inspection. We don't make warranty claims difficult — we'd rather fix a problem fast than argue about paperwork. If it's our workmanship, we fix it. Period."},
    {q:"Does your warranty cover storm damage?",a:"Our workmanship warranty covers defects in how we installed your system. Storm damage (hurricane, tornado, hail) is covered by your homeowner's insurance, not our warranty. However, if our installation failed in a way that contributed to the damage — for example, hangers that came loose because they were improperly secured — that's on us and we'll make it right."},
    {q:"What's the referral program?",a:"We pay $80 gift cards for qualifying referrals. The referred customer gets 10% off their next service. The qualifying project minimum is $880. All services qualify, and the program is open to everyone — homeowners, insurance agents, roofers, real estate agents, property managers, anyone. No limit on referrals."},
  ]},
  { name:"Maintenance", icon:"🧹", faqs:[
    {q:"How often should I have my gutters cleaned?",a:"In Tampa Bay, at least twice per year — once before hurricane season (May/June) and once after fall leaf drop (November/December). Homes near oak trees, pine trees, or palm trees may need quarterly cleaning. Neglected gutters cause fascia rot, foundation erosion, landscape damage, and pest infestations. Regular cleaning is the cheapest way to prevent expensive repairs."},
    {q:"What's included in your maintenance plans?",a:"We offer three tiers: Basic (blow out gutters, downspouts, and roof line), Premium (everything in Basic plus water wash, flush, full downspout clearing, and miter sealing), and Deluxe (everything in Premium plus full realignment, re-securing of hangers, re-pitching for drainage, and new leaf guard installation). Plans are annual with scheduled visits so you never have to remember to call."},
    {q:"Do you service gutters you didn't install?",a:"Yes. Our maintenance services are available for any gutter system regardless of who installed it. We'll assess the condition of your system during service and let you know if anything needs attention — but there's never pressure to replace or upgrade."},
    {q:"What happens if you find damage during a maintenance visit?",a:"We document everything with photos and communicate immediately. Minor issues (loose hangers, small seal failures) we can often fix on the spot during the service visit. Larger issues (rotted fascia, structural problems, failed sections) we'll provide a separate estimate. You're never obligated — we just want you to know what's going on with your home."},
    {q:"Can I combine gutter cleaning with other services?",a:"Yes. Many homeowners combine gutter cleaning with soffit inspection, guard maintenance, downspout extension checks, and drainage system flushing. Bundling services into one visit saves you time and often costs less than scheduling separately."},
    {q:"Do you offer drainage maintenance?",a:"Yes. If you have French drains, catch basins, underground drainage lines, or pop-up emitters, we can inspect and flush those systems during maintenance visits. Drainage systems accumulate sediment over time and need periodic clearing to maintain flow. A clogged French drain is worse than no drain at all because it traps water against your foundation."},
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
      <SiteNav />

      <section className="hero-stars" style={{padding:"60px 24px 20px",maxWidth:"900px",margin:"0 auto",textAlign:"center"}}>
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
          <a href="mailto:info@jronegutters.com" style={{padding:"16px 32px",fontFamily:f.h,fontSize:"14px",fontWeight:700,letterSpacing:"1.5px",color:C.gold,border:`2px solid ${C.gold}`,borderRadius:"8px",textDecoration:"none"}}>EMAIL US</a>
        </div>
      </section>

      <SiteFooter />
      <MobileCTA />
      <style>{`*{box-sizing:border-box;margin:0;padding:0}`}</style>
    </div>
  );
}
