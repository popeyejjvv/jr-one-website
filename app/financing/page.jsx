"use client";

import { useState, useEffect } from "react";
import SiteNav from "../../components/SiteNav";
import SiteFooter from "../../components/SiteFooter";
import MobileCTA from "../../components/MobileCTA";

const injectFonts = () => { if (typeof document==="undefined"||document.querySelector("#jr-fonts")) return; const l=document.createElement("link"); l.id="jr-fonts"; l.rel="stylesheet"; l.href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800&family=Source+Sans+3:wght@300;400;600&display=swap"; document.head.appendChild(l); };
const C = { bg:"#0B1628",navy:"#1B2A4A",navyMid:"#243556",navyLight:"#2C3E5A",navyFade:"#162033",gold:"#C8952E",goldLight:"#D4A843",goldPale:"rgba(200,149,46,0.12)",cream:"#F5F3EF",white:"#FFFFFF",offWhite:"#E8E4DC",muted:"#7A8FA8",charcoal:"#2D2D2D",success:"#2D8B4E" };
const f = { h:"'Montserrat', sans-serif", b:"'Source Sans 3', sans-serif" };
const Tag = ({children}) => <div style={{display:"inline-block",padding:"6px 16px",background:C.goldPale,borderRadius:"4px",marginBottom:"12px"}}><span style={{fontFamily:f.h,fontSize:"12px",fontWeight:700,color:C.gold,letterSpacing:"3px"}}>{children}</span></div>;
const GoldBar = () => <div style={{width:"60px",height:"3px",background:`linear-gradient(90deg,${C.gold},${C.goldLight})`,borderRadius:"2px",margin:"16px auto"}} />;

export default function FinancingPage() {
  const [openFaq, setOpenFaq] = useState(null);
  useEffect(() => { injectFonts(); }, []);
  const secTitle = {fontFamily:f.h,fontSize:"clamp(24px,4vw,36px)",fontWeight:800,letterSpacing:"2px",textAlign:"center",marginBottom:"8px"};

  const faqs = [
    { q:"Do I need perfect credit to qualify?", a:"No. Our financing partners work with a range of credit profiles. The best way to find out what you qualify for is to apply — the initial check is typically a soft pull that doesn't affect your credit score." },
    { q:"How long does approval take?", a:"Most financing decisions come back within minutes. You'll know before your estimate appointment is over whether you're approved and what your terms are." },
    { q:"Are there 0% interest options?", a:"Promotional 0% APR periods are sometimes available depending on the financing partner and current offers. Ask us about current promotions when you schedule your estimate." },
    { q:"Can I pay off early without penalties?", a:"Most of our financing options allow early payoff without prepayment penalties. We'll confirm the specific terms for your plan before you sign." },
    { q:"What's the minimum project size for financing?", a:"Financing is available for most project sizes. Whether it's a gutter repair or a full house soffit and fascia replacement, we can discuss payment options that work for your budget." },
    { q:"Does financing affect my estimate price?", a:"No. The price of your project is the same whether you pay upfront or finance. Financing is a payment method — it doesn't change the scope or cost of the work." },
  ];

  return (
    <div style={{background:C.bg,color:C.white,fontFamily:f.b,lineHeight:1.65,minHeight:"100vh"}}>
      <SiteNav />

      <section style={{padding:"60px 24px 40px",maxWidth:"900px",margin:"0 auto",textAlign:"center"}}>
        <Tag>FINANCING</Tag>
        <h1 style={{fontFamily:f.h,fontSize:"clamp(32px,5vw,44px)",fontWeight:800,lineHeight:1.1,marginBottom:"16px"}}>Quality Work Shouldn't<br/><span style={{color:C.gold}}>Break the Bank.</span></h1>
        <p style={{fontFamily:f.b,fontSize:"18px",color:C.muted,maxWidth:"650px",margin:"0 auto"}}>We partner with trusted third-party financing providers so you can protect your home now and pay over time. Flexible terms, quick approval, and no impact on your project pricing.</p>
      </section>

      {/* HOW IT WORKS */}
      <section style={{padding:"20px 24px 80px"}}>
        <div style={{maxWidth:"900px",margin:"0 auto"}}>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(250px,1fr))",gap:"24px"}}>
            {[
              {num:"1",title:"Get your estimate",desc:"We provide a detailed, transparent estimate for your project. Same price whether you pay upfront or finance — no markup."},
              {num:"2",title:"Choose your plan",desc:"We walk you through available financing options including monthly payment amounts, terms, and any promotional rates currently available."},
              {num:"3",title:"Quick approval",desc:"Apply through our financing partner — most decisions come back in minutes. The initial check is typically a soft credit pull."},
              {num:"4",title:"Work begins",desc:"Once financing is confirmed, we schedule your project. You get professional installation now and manageable payments that fit your budget."},
            ].map((step,i) =>
              <div key={i} style={{background:C.navyFade,border:`1px solid ${C.navyLight}`,borderRadius:"12px",padding:"28px",textAlign:"center"}}>
                <div style={{fontFamily:f.h,fontSize:"36px",fontWeight:800,color:C.gold}}>{step.num}</div>
                <h3 style={{fontFamily:f.h,fontSize:"17px",fontWeight:700,color:C.white,margin:"8px 0"}}>{step.title}</h3>
                <p style={{fontFamily:f.b,fontSize:"15px",color:C.muted,lineHeight:1.55}}>{step.desc}</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* WHY FINANCE */}
      <section style={{background:C.navy,padding:"80px 24px"}}>
        <div style={{maxWidth:"800px",margin:"0 auto",textAlign:"center"}}>
          <Tag>WHY FINANCE</Tag>
          <h2 style={{...secTitle,color:C.white}}>PROTECTING YOUR HOME IS AN INVESTMENT</h2>
          <GoldBar />
          <div style={{marginTop:"48px",textAlign:"left"}}>
            {[
              {title:"Prevent expensive damage now",desc:"Waiting on gutter or soffit repairs because of budget concerns lets water damage compound. A $3,000 installation financed today prevents a $10,000+ foundation repair next year."},
              {title:"Manageable monthly payments",desc:"Spread the cost of your project over months instead of paying everything upfront. Keep your savings intact for emergencies while your home gets the protection it needs."},
              {title:"No price difference",desc:"Your estimate is your estimate. Financing doesn't add to the project cost — it's simply a payment method. You get the same materials, the same crew, the same Gold Standard service."},
              {title:"Senior and military discounts available",desc:"We offer additional discounts for seniors and military families. Combine with financing for the most affordable path to protecting your home."},
            ].map((item,i) =>
              <div key={i} style={{display:"flex",gap:"20px",marginBottom:"28px",alignItems:"flex-start"}}>
                <div style={{width:"40px",height:"40px",borderRadius:"10px",background:C.goldPale,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,border:`1px solid ${C.gold}30`}}>
                  <span style={{fontFamily:f.h,fontSize:"16px",fontWeight:800,color:C.gold}}>{i+1}</span>
                </div>
                <div>
                  <h3 style={{fontFamily:f.h,fontSize:"17px",fontWeight:700,color:C.white,marginBottom:"4px"}}>{item.title}</h3>
                  <p style={{fontFamily:f.b,fontSize:"15px",color:C.muted,lineHeight:1.6}}>{item.desc}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section style={{background:C.bg,padding:"80px 24px"}}>
        <div style={{maxWidth:"800px",margin:"0 auto",textAlign:"center"}}>
          <Tag>FAQ</Tag><h2 style={{...secTitle,color:C.white}}>FINANCING QUESTIONS</h2><GoldBar />
          <div style={{marginTop:"40px",textAlign:"left"}}>{faqs.map((faq,i) => <div key={i} style={{borderBottom:`1px solid ${C.navyLight}`}}><button onClick={()=>setOpenFaq(openFaq===i?null:i)} style={{width:"100%",padding:"20px 0",background:"none",border:"none",cursor:"pointer",display:"flex",justifyContent:"space-between",alignItems:"center",gap:"16px"}}><span style={{fontFamily:f.h,fontSize:"15px",fontWeight:600,color:openFaq===i?C.gold:C.white,textAlign:"left"}}>{faq.q}</span><span style={{fontFamily:f.h,fontSize:"20px",color:C.gold,transform:openFaq===i?"rotate(45deg)":"none",transition:"transform 0.3s",flexShrink:0}}>+</span></button>{openFaq===i&&<div style={{padding:"0 0 20px",fontFamily:f.b,fontSize:"15px",color:C.muted,lineHeight:1.65}}>{faq.a}</div>}</div>)}</div>
        </div>
      </section>

      <section style={{background:C.navy,padding:"60px 24px",textAlign:"center"}}>
        <h2 style={{fontFamily:f.h,fontSize:"28px",fontWeight:800,color:C.white,marginBottom:"12px"}}>READY TO DISCUSS FINANCING?</h2>
        <p style={{fontFamily:f.b,fontSize:"16px",color:C.offWhite,marginBottom:"24px"}}>Call us and we'll walk you through your options — no obligation, no pressure.</p>
        <a href="tel:8444443114" style={{display:"inline-flex",alignItems:"center",gap:"8px",padding:"16px 32px",fontFamily:f.h,fontSize:"14px",fontWeight:700,letterSpacing:"1.5px",color:C.navy,background:`linear-gradient(135deg,${C.gold},${C.goldLight})`,borderRadius:"8px",textDecoration:"none"}}>📞 (844) 444-3114</a>
      </section>

      <SiteFooter />
      <MobileCTA />
      <style>{`*{box-sizing:border-box;margin:0;padding:0}`}</style>
    </div>
  );
}
