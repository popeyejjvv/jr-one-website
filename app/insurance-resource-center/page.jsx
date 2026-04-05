"use client";
import { useState, useEffect } from "react";
import SiteNav from "../../components/SiteNav";
import SiteFooter from "../../components/SiteFooter";

const injectFonts = () => { if (typeof document==="undefined"||document.querySelector("#jr-fonts")) return; const l=document.createElement("link"); l.id="jr-fonts"; l.rel="stylesheet"; l.href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800&family=Source+Sans+3:wght@300;400;600&display=swap"; document.head.appendChild(l); };
const C = { bg:"#0B1628",navy:"#1B2A4A",navyMid:"#243556",navyLight:"#2C3E5A",navyFade:"#162033",gold:"#B11A21",goldLight:"#D42A2A",goldPale:"rgba(177,26,33,0.12)",cream:"#F5F3EF",white:"#FFFFFF",offWhite:"#E8E4DC",muted:"#7A8FA8",charcoal:"#2D2D2D",success:"#2D8B4E",successDim:"rgba(45,139,78,0.15)",alert:"#B11A21",alertDim:"rgba(177,26,33,0.12)" };
const f = { h:"'Montserrat', sans-serif", b:"'Source Sans 3', sans-serif" };
const Tag = ({children}) => <div style={{display:"inline-block",padding:"6px 16px",background:C.goldPale,borderRadius:"4px",marginBottom:"12px"}}><span style={{fontFamily:f.h,fontSize:"12px",fontWeight:700,color:C.gold,letterSpacing:"3px"}}>{children}</span></div>;
const AlertTag = ({children}) => <div style={{display:"inline-block",padding:"6px 16px",background:C.alertDim,borderRadius:"4px",marginBottom:"12px"}}><span style={{fontFamily:f.h,fontSize:"12px",fontWeight:700,color:C.alert,letterSpacing:"3px"}}>{children}</span></div>;
const GoldBar = () => <div style={{width:"60px",height:"3px",background:`linear-gradient(90deg,${C.gold},${C.goldLight})`,borderRadius:"2px",margin:"16px auto"}} />;

const PAGE = {
  breadcrumb: ["Home","Peak 301","Insurance Resource Center"],

  heroTag: "INSURANCE RESOURCE CENTER",
  heroH1: "Your Roof. Your Rights.",
  heroH1Gold: "Your Insurance Guide.",
  heroP: "Florida law protects homeowners from losing insurance solely because of roof age. This resource center gives you everything you need — the laws, the carrier types, the documentation templates, and the steps to protect your coverage. Whether you're facing a non-renewal notice or want to get ahead of one, start here.",

  stats: [
    { value:"280%", label:"Increase in FL policy non-renewals since 2018" },
    { value:"$3,285–$5,100", label:"Average Tampa Bay annual premium" },
    { value:"90,000", label:"Policies dropped in Tampa Bay (Citizens alone)" },
    { value:"5 Years", label:"Remaining useful life threshold under FL law" },
  ],

  lawTitle: "FLORIDA LAW IS ON YOUR SIDE",
  laws: [
    {
      tag: "SENATE BILL 2D (2022)",
      title: "The Foundation — Condition Over Age",
      points: [
        "Insurers cannot refuse to issue or renew a homeowner's policy solely because of roof age if the roof is under 15 years old.",
        "For roofs 15 years or older, insurers must allow you to get a roof inspection before requiring replacement as a condition of coverage.",
        "If that inspection shows your roof has at least 5 years of remaining useful life, the insurer cannot deny or non-renew your policy based on roof age alone.",
        "A roof's age is calculated from the last date 100% of the roof surface was built or replaced per building code at that time."
      ]
    },
    {
      tag: "HOUSE BILL 1611 (2024)",
      title: "Expanded Inspector Access",
      points: [
        "Licensed roofing contractors are now included as authorized inspectors who can certify your roof's remaining useful life.",
        "This expands homeowner options beyond just engineers and home inspectors for getting the certification carriers must accept."
      ]
    },
    {
      tag: "SENATE BILL 808 (EFFECTIVE JULY 2026)",
      title: "Even Broader Inspector Pool & Roof Type Distinctions",
      points: [
        "Further expands authorized inspectors to include home inspectors, building code inspectors, general/building/residential contractors, roofing contractors, professional engineers, and architects.",
        "Requires insurers to differentiate between low-slope roofs (2-inch pitch or less) and steep-slope roofs (more than 2-inch pitch) when evaluating coverage.",
        "For steep-slope roofs, carriers cannot deny coverage if an inspector certifies 5+ years of remaining useful life."
      ]
    },
    {
      tag: "HOUSE BILL 815 (EFFECTIVE JULY 2026)",
      title: "Strengthened Protections",
      points: [
        "Prohibits insurers from refusing policy renewals based solely on roof age for property insurance policies — expanding protections beyond just homeowner policies.",
        "Reinforces the condition-based standard over arbitrary age cutoffs."
      ]
    }
  ],

  carrierTypes: [
    {
      type: "Condition-Based Carriers",
      icon: "✅",
      color: C.success,
      colorDim: C.successDim,
      desc: "These carriers evaluate your roof based on its actual condition, not just its birthday. If a licensed inspector certifies your roof has 5+ years of remaining useful life, they will issue or renew your policy regardless of roof age.",
      whatItMeans: "This is where Peak 301 + a certified inspection is most powerful. You treat the roof, get the certification, and the carrier must accept it under Florida law.",
      lookFor: "Ask your insurance agent: 'Does your carrier accept a certified roof inspection showing remaining useful life for roofs over 15 years old?' If yes, you're working with a condition-based carrier."
    },
    {
      type: "Age-Cutoff Carriers",
      icon: "⛔",
      color: C.alert,
      colorDim: C.alertDim,
      desc: "These carriers set a hard age limit — typically 20 years for asphalt shingles — and will not write policies for roofs beyond that age, regardless of condition or inspection results.",
      whatItMeans: "If your roof is already past their hard cutoff, Peak 301 may not help with this specific carrier. However, it can help you stay insurable with condition-based carriers. If your roof is approaching their cutoff (say, 12-15 years old), Peak 301 can extend your roof's life to keep you under the limit longer.",
      lookFor: "Ask your agent: 'What is the maximum roof age your carrier will accept for a new or renewed policy?' If they give you a hard number with no inspection option, that's an age-cutoff carrier."
    },
    {
      type: "Material-Based Carriers",
      icon: "🔍",
      color: C.gold,
      colorDim: C.goldPale,
      desc: "These carriers accept different roof ages depending on the material. Metal roofs may be accepted up to 40 years, tile up to 30-50 years, but asphalt shingles are restricted to 15-20 years. Within their asphalt limits, they may still accept inspections.",
      whatItMeans: "For asphalt shingle homeowners, these carriers function like a hybrid — they have a general age preference but may accept inspection certifications within their material-specific guidelines.",
      lookFor: "Ask your agent: 'Does your carrier have different age requirements for different roof materials, and do they accept certified inspections for asphalt shingles over 15 years?'"
    },
    {
      type: "Citizens Property Insurance",
      icon: "🏛️",
      color: C.muted,
      colorDim: "rgba(122,143,168,0.12)",
      desc: "Florida's state-backed insurer of last resort. Citizens considers asphalt shingle roofs 'old' at 25 years. They accept certified inspections but cap coverage extensions at 5 years maximum, regardless of how much remaining life the inspection shows.",
      whatItMeans: "Citizens is actively depopulating — moving policies to private carriers. If you're on Citizens, you may be transferred to a private carrier who has different (possibly stricter) roof age requirements. Peak 301 can help you qualify with private carriers when that transition happens.",
      lookFor: "If you're currently with Citizens, ask your agent about upcoming depopulation and what private carrier options are available for your property."
    }
  ],

  steps: [
    { num:"01", title:"CHECK YOUR ROOF AGE", desc:"Find out when your roof was last fully replaced. Check your closing documents, permit records (available through your county property appraiser), or previous inspection reports. This date determines where you stand with your carrier." },
    { num:"02", title:"REVIEW YOUR POLICY", desc:"Read your current homeowner's insurance policy. Look for language about roof age requirements, coverage type (Replacement Cost vs. Actual Cash Value), and any upcoming renewal dates. Know what you're working with before you act." },
    { num:"03", title:"CALL YOUR INSURANCE AGENT", desc:"Ask your agent the three key questions: What is the carrier's roof age threshold? Do they accept certified roof inspections? What documentation do they need to renew your policy? Write down the answers." },
    { num:"04", title:"GET A ROOF ASSESSMENT", desc:"Contact JR One for a professional roof assessment. We'll inspect your roof's condition, determine if it's a candidate for Peak 301 rejuvenation, and give you a clear, honest recommendation — including telling you if your roof needs replacement instead." },
    { num:"05", title:"PEAK 301 TREATMENT", desc:"If your roof qualifies, our trained crew applies Peak 301 in a single day. The soy-based sealant penetrates your shingles and begins restoring flexibility and waterproofing immediately. No demolition, no debris, no multi-day disruption." },
    { num:"06", title:"GET YOUR CERTIFICATION", desc:"After treatment, a licensed authorized inspector evaluates your roof and issues a Remaining Useful Life (RUL) certification — the documentation Florida law requires carriers to accept. We coordinate this entire step for you." },
    { num:"07", title:"SUBMIT TO YOUR INSURER", desc:"Provide the RUL certification to your insurance agent or carrier. Under Florida law, they cannot refuse to issue or renew your policy solely because of roof age when this documentation shows 5+ years of remaining life." }
  ],

  documents: [
    { title:"Letter to Your Insurance Company", desc:"A professional template you fill in with your name, policy number, and attach your RUL certification. Formatted to clearly cite Florida Statute 627.7011 and request continued coverage.", file:"JR_One_Insurance_Letter_Template.pdf", icon:"📄" },
    { title:"Florida Homeowner Roof Insurance Rights", desc:"A one-page summary of your legal rights under SB 2D, HB 1611, SB 808, and HB 815. Written in plain language — not legal jargon. Includes the exact statute references so your agent can verify.", file:"JR_One_FL_Roof_Insurance_Rights.pdf", icon:"⚖️" },
    { title:"What to Expect After Peak 301 Treatment", desc:"A clear, step-by-step guide covering what happens during application, what your roof will look like afterward, the timeline for full penetration, and the warranty documentation you'll receive.", file:"JR_One_Peak301_What_To_Expect.pdf", icon:"📋" },
    { title:"Peak 301 Treatment Certificate", desc:"The official JR One treatment certificate documenting your roof has been professionally rejuvenated. Includes treatment date, product details, warranty terms, and your property information. Designed to be submitted alongside your RUL certification.", file:"JR_One_Peak301_Treatment_Certificate.pdf", icon:"🏆" }
  ],

  questionsForAgent: [
    { q: "What is the maximum roof age your carrier will insure for asphalt shingles?", why: "This tells you whether you're dealing with a condition-based or age-cutoff carrier — and whether your roof is currently within their window." },
    { q: "Does your carrier accept a certified roof inspection showing 5+ years of remaining useful life for roofs over 15 years old?", why: "Florida law requires them to, but knowing whether they comply willingly or resist helps you plan." },
    { q: "What type of inspection report does your carrier require — a 4-Point Inspection, a standalone Roof Inspection, or both?", why: "Different carriers have different documentation requirements. Getting the right report the first time saves you time and money." },
    { q: "Who qualifies as an authorized inspector in your carrier's underwriting guidelines?", why: "Under SB 808 (effective July 2026), the authorized inspector pool is expanded. But some carriers may have additional requirements." },
    { q: "If my roof passes inspection, will my policy be Replacement Cost Value or Actual Cash Value?", why: "Some carriers accept older roofs but switch you to ACV coverage, which pays significantly less in a claim. Know this before you commit." },
    { q: "Are there any secondary requirements beyond roof age — such as secondary water resistance, wind mitigation features, or specific shingle types?", why: "Some carriers have added extra underwriting criteria beyond roof age. Knowing these upfront prevents surprises after you've already invested in treatment." }
  ],

  faqs: [
    { q:"Does Peak 301 guarantee my insurance will be renewed?", a:"No — and anyone who tells you that is not being honest. What Peak 301 does is restore your roof to a condition that supports a licensed inspector certifying 5+ years of remaining useful life. That certification is what Florida law requires carriers to accept. The treatment makes the certification possible; the law makes the carrier comply." },
    { q:"What if my carrier still refuses to renew after I submit the certification?", a:"If your carrier refuses to renew solely because of roof age after you've provided a valid RUL certification from an authorized inspector, they may be in violation of Florida Statute 627.7011. Your first step is to request the reason for non-renewal in writing. Then contact the Florida Office of Insurance Regulation (FLOIR) to file a complaint. You can also work with your insurance agent to shop other carriers — many condition-based carriers will accept the same certification." },
    { q:"Is roof rejuvenation the same as a roof coating?", a:"No. This distinction matters. Peak 301 is a penetrating soy-based sealant that soaks into your shingles and restores the depleted oils from the inside out. It does not create a surface film or coating. Roof coatings create a layer on top of the shingles — which ARMA (the Asphalt Roofing Manufacturers Association) warns against for asphalt shingles. Rejuvenation and coating are two entirely different products with different mechanisms." },
    { q:"Will Peak 301 void my shingle manufacturer warranty?", a:"On a roof that's 15+ years old — which is the primary audience for this treatment — most manufacturer warranties have already expired or offer only prorated material coverage with no labor coverage. For roofs with active manufacturer warranties, we recommend checking with your manufacturer before treatment. In practice, the warranty value on a 15+ year old roof is minimal compared to the value of maintaining insurance coverage." },
    { q:"How do I know if my roof is a good candidate?", a:"Most asphalt shingle roofs between 8 and 20 years old are candidates. Your roof should be structurally sound with no active leaks, no major missing sections, and no severe curling or warping. We inspect every roof before recommending treatment, and we will tell you honestly if your roof needs replacement instead of rejuvenation. Not every roof qualifies — and we'd rather earn your trust by being straight with you than sell a treatment that won't deliver." },
    { q:"What does the treatment actually cost?", a:"Peak 301 treatment costs under 15% of what a full roof replacement would cost. For most Tampa Bay homes, that means a few thousand dollars instead of $15,000–$25,000+. We provide exact pricing after inspecting your specific roof. The treatment includes application, warranty documentation, and coordination with the inspector for your RUL certification." },
    { q:"Can I do this in Spanish? / ¿Puedo hacer esto en español?", a:"Yes. JR One is a bilingual company. We provide consultations, documentation, and customer service in both English and Spanish. All downloadable documents on this page are available in both languages. / Sí. JR One es una empresa bilingüe. Ofrecemos consultas, documentación y servicio al cliente en inglés y español. Todos los documentos descargables en esta página están disponibles en ambos idiomas." }
  ],

  ctaTitle: "PROTECT YOUR ROOF AND YOUR INSURANCE",
  ctaSub: "Don't wait for a non-renewal letter. Call us today for a professional roof assessment and find out if Peak 301 can save your coverage — and save you thousands.",
};

export default function InsuranceResourceCenter() {
  const [openFaq, setOpenFaq] = useState(null);
  const [openQ, setOpenQ] = useState(null);
  const [activeTab, setActiveTab] = useState(0);
  useEffect(() => { injectFonts(); }, []);
  const sec = {padding:"80px 24px",maxWidth:"1200px",margin:"0 auto"};
  const secTitle = {fontFamily:f.h,fontSize:"clamp(24px,4vw,36px)",fontWeight:800,letterSpacing:"2px",textAlign:"center",marginBottom:"8px"};

  return (
    <div style={{background:C.bg,color:C.white,fontFamily:f.b,lineHeight:1.65,minHeight:"100vh"}}>
      {/* NAV */}
      <SiteNav promoBanner="⚠️ Florida Insurance Dropping Your Coverage? Peak 301 Can Help — Call (844) 444-3114" />

      {/* BREADCRUMB */}
      <div style={{padding:"16px 24px 0",maxWidth:"1200px",margin:"0 auto"}}><div style={{fontFamily:f.b,fontSize:"13px",color:C.muted}}>{PAGE.breadcrumb.map((item,i) => <span key={i}>{i>0&&<span style={{margin:"0 8px",opacity:0.5}}>/</span>}{i===PAGE.breadcrumb.length-1?<span style={{color:C.gold}}>{item}</span>:item==="Home"?<a href="/" style={{color:C.muted,textDecoration:"none"}}>{item}</a>:item==="Peak 301"?<a href="/peak-301" style={{color:C.muted,textDecoration:"none"}}>{item}</a>:<span style={{color:C.muted}}>{item}</span>}</span>)}</div></div>

      {/* HERO */}
      <section className="hero-stars" style={{padding:"60px 24px 80px",maxWidth:"1200px",margin:"0 auto"}}>
        <div style={{maxWidth:"800px"}}>
          <Tag>{PAGE.heroTag}</Tag>
          <h1 style={{fontFamily:f.h,fontSize:"clamp(32px,5vw,48px)",fontWeight:800,lineHeight:1.1,marginBottom:"20px"}}>{PAGE.heroH1}<br/><span style={{color:C.gold}}>{PAGE.heroH1Gold}</span></h1>
          <p style={{fontFamily:f.b,fontSize:"18px",color:C.offWhite,lineHeight:1.7,marginBottom:"32px",maxWidth:"680px"}}>{PAGE.heroP}</p>
          <div style={{display:"flex",gap:"16px",flexWrap:"wrap"}}>
            <a href="/peak-301/" style={{padding:"16px 36px",fontFamily:f.h,fontSize:"14px",fontWeight:700,letterSpacing:"1.5px",color:C.white,background:`linear-gradient(135deg,${C.gold},${C.goldLight})`,border:"none",borderRadius:"8px",textDecoration:"none",boxShadow:"0 4px 16px rgba(200,149,46,0.3)"}}>LEARN ABOUT PEAK 301</a>
            <a href="tel:8444443114" style={{display:"inline-flex",alignItems:"center",padding:"16px 36px",fontFamily:f.h,fontSize:"14px",fontWeight:700,letterSpacing:"1.5px",color:C.gold,border:`2px solid ${C.gold}`,borderRadius:"8px",textDecoration:"none"}}>📞 CALL (844) 444-3114</a>
          </div>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))",gap:"20px",marginTop:"56px"}}>
          {PAGE.stats.map((s,i) => <div key={i} style={{background:C.navyFade,border:`1px solid ${C.navyLight}`,borderRadius:"12px",padding:"24px",textAlign:"center"}}>
            <div style={{fontFamily:f.h,fontSize:"clamp(22px,3vw,32px)",fontWeight:800,color:C.gold,marginBottom:"6px"}}>{s.value}</div>
            <div style={{fontFamily:f.b,fontSize:"13px",color:C.muted,lineHeight:1.4}}>{s.label}</div>
          </div>)}
        </div>
      </section>

      {/* FLORIDA LAW SECTION */}
      <section style={{background:C.navy,padding:"80px 24px"}}>
        <div style={sec}>
          <div style={{textAlign:"center"}}>
            <AlertTag>KNOW YOUR RIGHTS</AlertTag>
            <h2 style={{...secTitle,color:C.white}}>{PAGE.lawTitle}</h2>
            <GoldBar />
            <p style={{fontFamily:f.b,fontSize:"17px",color:C.offWhite,fontStyle:"italic",maxWidth:"600px",margin:"0 auto 48px"}}>Florida has passed multiple laws protecting homeowners from losing insurance solely because of roof age. Here's exactly what each one does.</p>
          </div>
          <div style={{display:"grid",gap:"24px"}}>
            {PAGE.laws.map((law,i) => <div key={i} style={{background:C.navyFade,border:`1px solid ${C.navyLight}`,borderRadius:"12px",padding:"32px",position:"relative",overflow:"hidden"}}>
              <div style={{fontFamily:f.h,fontSize:"80px",fontWeight:800,color:"rgba(200,149,46,0.04)",position:"absolute",top:"-10px",right:"20px",lineHeight:1}}>§</div>
              <Tag>{law.tag}</Tag>
              <h3 style={{fontFamily:f.h,fontSize:"20px",fontWeight:700,color:C.white,marginBottom:"16px",marginTop:"8px"}}>{law.title}</h3>
              {law.points.map((point,j) => <div key={j} style={{display:"flex",gap:"12px",marginBottom:"12px",alignItems:"flex-start"}}>
                <span style={{fontFamily:f.h,fontSize:"14px",color:C.gold,marginTop:"2px",flexShrink:0}}>→</span>
                <p style={{fontFamily:f.b,fontSize:"15px",color:C.muted,lineHeight:1.6}}>{point}</p>
              </div>)}
            </div>)}
          </div>
          <div style={{background:C.goldPale,border:`1px solid ${C.gold}`,borderRadius:"12px",padding:"24px",marginTop:"32px",textAlign:"center"}}>
            <p style={{fontFamily:f.h,fontSize:"14px",fontWeight:700,color:C.gold,letterSpacing:"1px",marginBottom:"8px"}}>BOTTOM LINE</p>
            <p style={{fontFamily:f.b,fontSize:"16px",color:C.white,maxWidth:"700px",margin:"0 auto"}}>Florida law has shifted from age-based to condition-based roof evaluation. Your roof's actual condition — not its birthday — is what determines whether you keep your insurance. Peak 301 restores your roof to a condition that supports the certification these laws require.</p>
          </div>
        </div>
      </section>

      {/* CARRIER TYPES */}
      <section style={{background:C.bg,padding:"80px 24px"}}>
        <div style={sec}>
          <div style={{textAlign:"center"}}>
            <Tag>CARRIER GUIDE</Tag>
            <h2 style={{...secTitle,color:C.white}}>UNDERSTAND YOUR INSURANCE CARRIER</h2>
            <GoldBar />
            <p style={{fontFamily:f.b,fontSize:"17px",color:C.offWhite,fontStyle:"italic",maxWidth:"600px",margin:"0 auto 16px"}}>Not all insurance carriers handle roof age the same way. Knowing which type you're dealing with determines your best strategy.</p>
          </div>
          {/* Tabs */}
          <div style={{display:"flex",gap:"8px",justifyContent:"center",flexWrap:"wrap",marginTop:"32px",marginBottom:"32px"}}>
            {PAGE.carrierTypes.map((ct,i) => <button key={i} onClick={()=>setActiveTab(i)} style={{padding:"12px 20px",fontFamily:f.h,fontSize:"12px",fontWeight:700,letterSpacing:"1px",color:activeTab===i?C.white:C.muted,background:activeTab===i?C.navyLight:"transparent",border:`1px solid ${activeTab===i?C.gold:C.navyLight}`,borderRadius:"8px",cursor:"pointer",transition:"all 0.2s"}}>{ct.icon} {ct.type.toUpperCase()}</button>)}
          </div>
          {/* Active tab content */}
          {PAGE.carrierTypes.map((ct,i) => activeTab===i && <div key={i} style={{background:C.navyFade,border:`1px solid ${C.navyLight}`,borderRadius:"16px",padding:"36px",maxWidth:"800px",margin:"0 auto"}}>
            <div style={{display:"flex",alignItems:"center",gap:"16px",marginBottom:"20px"}}>
              <div style={{fontSize:"36px"}}>{ct.icon}</div>
              <h3 style={{fontFamily:f.h,fontSize:"22px",fontWeight:700,color:C.white}}>{ct.type}</h3>
            </div>
            <p style={{fontFamily:f.b,fontSize:"16px",color:C.offWhite,lineHeight:1.7,marginBottom:"24px"}}>{ct.desc}</p>
            <div style={{background:ct.colorDim,border:`1px solid ${ct.color}`,borderRadius:"8px",padding:"20px",marginBottom:"16px"}}>
              <p style={{fontFamily:f.h,fontSize:"12px",fontWeight:700,color:ct.color,letterSpacing:"2px",marginBottom:"8px"}}>WHAT THIS MEANS FOR YOU</p>
              <p style={{fontFamily:f.b,fontSize:"15px",color:C.white,lineHeight:1.6}}>{ct.whatItMeans}</p>
            </div>
            <div style={{background:"rgba(255,255,255,0.03)",borderRadius:"8px",padding:"20px"}}>
              <p style={{fontFamily:f.h,fontSize:"12px",fontWeight:700,color:C.gold,letterSpacing:"2px",marginBottom:"8px"}}>HOW TO IDENTIFY THIS CARRIER TYPE</p>
              <p style={{fontFamily:f.b,fontSize:"15px",color:C.muted,lineHeight:1.6}}>{ct.lookFor}</p>
            </div>
          </div>)}
        </div>
      </section>

      {/* YOUR ACTION PLAN */}
      <section style={{background:C.navy,padding:"80px 24px"}}>
        <div style={sec}>
          <div style={{textAlign:"center"}}>
            <Tag>YOUR ACTION PLAN</Tag>
            <h2 style={{...secTitle,color:C.white}}>7 STEPS TO PROTECT YOUR COVERAGE</h2>
            <GoldBar />
            <p style={{fontFamily:f.b,fontSize:"17px",color:C.offWhite,fontStyle:"italic",maxWidth:"500px",margin:"0 auto 48px"}}>Follow these steps in order. Each one builds on the last.</p>
          </div>
          <div style={{display:"grid",gap:"16px",maxWidth:"800px",margin:"0 auto"}}>
            {PAGE.steps.map((step,i) => <div key={i} style={{background:C.navyFade,border:`1px solid ${C.navyLight}`,borderRadius:"12px",padding:"24px",display:"flex",gap:"20px",alignItems:"flex-start",position:"relative"}}>
              <div style={{fontFamily:f.h,fontSize:"13px",fontWeight:800,color:C.navy,background:`linear-gradient(135deg,${C.gold},${C.goldLight})`,borderRadius:"50%",width:"40px",height:"40px",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>{step.num}</div>
              <div>
                <h3 style={{fontFamily:f.h,fontSize:"16px",fontWeight:700,color:C.white,marginBottom:"8px"}}>{step.title}</h3>
                <p style={{fontFamily:f.b,fontSize:"15px",color:C.muted,lineHeight:1.6}}>{step.desc}</p>
              </div>
            </div>)}
          </div>
        </div>
      </section>

      {/* DOWNLOADABLE DOCUMENTS */}
      <section style={{background:C.bg,padding:"80px 24px"}}>
        <div style={sec}>
          <div style={{textAlign:"center"}}>
            <Tag>DOWNLOAD CENTER</Tag>
            <h2 style={{...secTitle,color:C.white}}>YOUR INSURANCE TOOLKIT</h2>
            <GoldBar />
            <p style={{fontFamily:f.b,fontSize:"17px",color:C.offWhite,fontStyle:"italic",maxWidth:"600px",margin:"0 auto 48px"}}>Free documents you can download, print, fill in, and use immediately. Available in English and Spanish.</p>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))",gap:"20px"}}>
            {PAGE.documents.map((doc,i) => <div key={i} style={{background:C.navyFade,border:`1px solid ${C.navyLight}`,borderRadius:"12px",padding:"28px",transition:"border-color 0.3s",display:"flex",flexDirection:"column"}} onMouseOver={e=>e.currentTarget.style.borderColor=C.gold} onMouseOut={e=>e.currentTarget.style.borderColor=C.navyLight}>
              <div style={{fontSize:"36px",marginBottom:"16px"}}>{doc.icon}</div>
              <h3 style={{fontFamily:f.h,fontSize:"16px",fontWeight:700,color:C.white,marginBottom:"10px"}}>{doc.title}</h3>
              <p style={{fontFamily:f.b,fontSize:"14px",color:C.muted,lineHeight:1.6,flex:1,marginBottom:"20px"}}>{doc.desc}</p>
              <div style={{display:"flex",gap:"8px"}}>
                <a href={`/documents/${doc.file}`} style={{flex:1,padding:"12px",fontFamily:f.h,fontSize:"11px",fontWeight:700,letterSpacing:"1px",color:C.white,background:`linear-gradient(135deg,${C.gold},${C.goldLight})`,borderRadius:"6px",textDecoration:"none",textAlign:"center"}}>ENGLISH PDF</a>
                <a href={`/documents/es-${doc.file}`} style={{flex:1,padding:"12px",fontFamily:f.h,fontSize:"11px",fontWeight:700,letterSpacing:"1px",color:C.gold,border:`1.5px solid ${C.gold}`,borderRadius:"6px",textDecoration:"none",textAlign:"center"}}>ESPAÑOL PDF</a>
              </div>
            </div>)}
          </div>
        </div>
      </section>

      {/* QUESTIONS FOR YOUR AGENT */}
      <section style={{background:C.navy,padding:"80px 24px"}}>
        <div style={{maxWidth:"800px",margin:"0 auto"}}>
          <div style={{textAlign:"center"}}>
            <Tag>BE PREPARED</Tag>
            <h2 style={{...secTitle,color:C.white}}>QUESTIONS TO ASK YOUR INSURANCE AGENT</h2>
            <GoldBar />
            <p style={{fontFamily:f.b,fontSize:"17px",color:C.offWhite,fontStyle:"italic",maxWidth:"500px",margin:"0 auto 48px"}}>Print this list. Call your agent. Write down the answers. Knowledge is your best defense.</p>
          </div>
          <div style={{display:"grid",gap:"12px"}}>
            {PAGE.questionsForAgent.map((item,i) => <div key={i} style={{borderBottom:`1px solid ${C.navyLight}`}}>
              <button onClick={()=>setOpenQ(openQ===i?null:i)} style={{width:"100%",padding:"20px 0",background:"none",border:"none",cursor:"pointer",display:"flex",justifyContent:"space-between",alignItems:"center",gap:"16px"}}>
                <div style={{display:"flex",gap:"12px",alignItems:"flex-start",textAlign:"left"}}>
                  <span style={{fontFamily:f.h,fontSize:"14px",fontWeight:800,color:C.gold,flexShrink:0}}>Q{i+1}</span>
                  <span style={{fontFamily:f.h,fontSize:"15px",fontWeight:600,color:openQ===i?C.gold:C.white,transition:"color 0.2s"}}>{item.q}</span>
                </div>
                <span style={{fontFamily:f.h,fontSize:"20px",color:C.gold,transform:openQ===i?"rotate(45deg)":"none",transition:"transform 0.3s",flexShrink:0}}>+</span>
              </button>
              {openQ===i&&<div style={{padding:"0 0 20px 36px"}}>
                <p style={{fontFamily:f.h,fontSize:"11px",fontWeight:700,color:C.gold,letterSpacing:"2px",marginBottom:"6px"}}>WHY THIS MATTERS</p>
                <p style={{fontFamily:f.b,fontSize:"15px",color:C.muted,lineHeight:1.65}}>{item.why}</p>
              </div>}
            </div>)}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section style={{background:C.bg,padding:"80px 24px"}}>
        <div style={{maxWidth:"800px",margin:"0 auto",textAlign:"center"}}>
          <Tag>FAQ</Tag>
          <h2 style={{...secTitle,color:C.white}}>INSURANCE & PEAK 301 QUESTIONS</h2>
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
            <a href="/peak-301/" style={{padding:"16px 36px",fontFamily:f.h,fontSize:"14px",fontWeight:700,letterSpacing:"1.5px",color:C.white,background:`linear-gradient(135deg,${C.gold},${C.goldLight})`,border:"none",borderRadius:"8px",textDecoration:"none",boxShadow:"0 4px 16px rgba(200,149,46,0.3)"}}>GET YOUR FREE ROOF ASSESSMENT</a>
            <a href="tel:8444443114" style={{display:"inline-flex",alignItems:"center",padding:"16px 36px",fontFamily:f.h,fontSize:"14px",fontWeight:700,letterSpacing:"1.5px",color:C.gold,border:`2px solid ${C.gold}`,borderRadius:"8px",textDecoration:"none"}}>📞 CALL (844) 444-3114</a>
          </div>
          <p style={{fontFamily:f.b,fontSize:"14px",color:C.muted,marginTop:"24px"}}>Habla español? Llámenos — somos una empresa bilingüe.</p>
        </div>
      </section>

      {/* DISCLAIMER */}
      <section style={{background:C.navyFade,padding:"32px 24px",borderTop:`1px solid ${C.navyLight}`}}>
        <div style={{maxWidth:"800px",margin:"0 auto"}}>
          <p style={{fontFamily:f.b,fontSize:"12px",color:C.muted,lineHeight:1.6,textAlign:"center"}}>
            <strong style={{color:C.offWhite}}>Disclaimer:</strong> The information on this page is provided for educational purposes and is not legal advice. While we cite Florida statutes accurately, insurance coverage decisions involve many factors beyond roof age. We recommend consulting with a licensed insurance agent and/or attorney for guidance specific to your policy and situation. JR One Aluminum LLC is a Peak 301 authorized applicator — we are not an insurance company, insurance agent, or legal firm. Statute references are current as of 2026 and may be subject to legislative changes.
          </p>
        </div>
      </section>

      {/* FOOTER */}
      <SiteFooter />

      {/* MOBILE CTA */}
      <div style={{position:"fixed",bottom:0,left:0,right:0,zIndex:999,background:"rgba(11,22,40,0.97)",backdropFilter:"blur(12px)",borderTop:`1px solid ${C.navyLight}`,padding:"12px 16px",display:"flex",gap:"10px"}}><a href="tel:8444443114" style={{flex:1,display:"flex",alignItems:"center",justifyContent:"center",gap:"6px",padding:"14px",fontFamily:f.h,fontSize:"13px",fontWeight:700,color:C.navy,background:`linear-gradient(135deg,${C.gold},${C.goldLight})`,borderRadius:"8px",textDecoration:"none"}}>📞 CALL NOW</a><a href="/peak-301/" style={{flex:1,display:"flex",alignItems:"center",justifyContent:"center",padding:"14px",fontFamily:f.h,fontSize:"13px",fontWeight:700,color:C.gold,background:"transparent",border:`2px solid ${C.gold}`,borderRadius:"8px",textDecoration:"none"}}>PEAK 301 INFO</a></div>

      <style>{`*{box-sizing:border-box;margin:0;padding:0}`}</style>
    </div>
  );
}
