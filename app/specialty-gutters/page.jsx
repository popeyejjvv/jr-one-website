"use client";

import { useState, useEffect } from "react";
import SiteNav from "../../components/SiteNav";
import SiteFooter from "../../components/SiteFooter";
import MobileCTA from "../../components/MobileCTA";

/* ═══════════════════════════════════════════════════════════
   JR ONE ALUMINUM — SPECIALTY / CUSTOM GUTTERS PAGE
   ═══════════════════════════════════════════════════════════ */

const injectFonts = () => {
  if (typeof document === "undefined" || document.querySelector("#jr-fonts")) return;
  const l = document.createElement("link");
  l.id = "jr-fonts"; l.rel = "stylesheet";
  l.href = "https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800&family=Source+Sans+3:wght@300;400;600&display=swap";
  document.head.appendChild(l);
};

const C = {
  bg: "#0B1628", navy: "#1B2A4A", navyMid: "#243556", navyLight: "#2C3E5A",
  navyFade: "#162033", gold: "#C8952E", goldLight: "#D4A843",
  goldPale: "rgba(200,149,46,0.12)", cream: "#F5F3EF", white: "#FFFFFF",
  offWhite: "#E8E4DC", muted: "#7A8FA8", charcoal: "#2D2D2D",
  success: "#2D8B4E", successDim: "rgba(45,139,78,0.15)",
  accent: "#3A3A3A", accentLight: "#555555", accentPale: "rgba(58,58,58,0.12)",
};
const f = { h: "'Montserrat', sans-serif", b: "'Source Sans 3', sans-serif" };

// ── Reusable pieces ───────────────────────────────────────
const Tag = ({ children }) => (
  <div style={{ display: "inline-block", padding: "6px 16px", background: C.accentPale, borderRadius: "4px", marginBottom: "12px" }}>
    <span style={{ fontFamily: f.h, fontSize: "12px", fontWeight: 700, color: C.accent, letterSpacing: "3px" }}>{children}</span>
  </div>
);
const GoldBar = () => <div style={{ width: "60px", height: "3px", background: `linear-gradient(90deg,${C.accent},${C.accentLight})`, borderRadius: "2px", margin: "16px auto" }} />;
const Stars = ({ n = 5 }) => <span style={{ color: C.gold, fontSize: "14px", letterSpacing: "2px" }}>{"★".repeat(n)}</span>;

const BtnPrimary = ({ children, onClick }) => (
  <button onClick={onClick} style={{ padding: "16px 36px", fontFamily: f.h, fontSize: "14px", fontWeight: 700, letterSpacing: "1.5px", color: C.white, background: `linear-gradient(135deg,${C.accent},${C.accentLight})`, border: "none", borderRadius: "8px", cursor: "pointer", boxShadow: "0 4px 16px rgba(58,58,58,0.3)", transition: "transform 0.15s" }}
    onMouseOver={e => e.target.style.transform = "translateY(-2px)"}
    onMouseOut={e => e.target.style.transform = "none"}>
    {children}
  </button>
);

const BtnOutline = ({ children, href }) => (
  <a href={href} style={{ display: "inline-flex", alignItems: "center", padding: "16px 36px", fontFamily: f.h, fontSize: "14px", fontWeight: 700, letterSpacing: "1.5px", color: C.accent, background: "transparent", border: `2px solid ${C.accent}`, borderRadius: "8px", textDecoration: "none", cursor: "pointer" }}>
    {children}
  </a>
);

const inputStyle = { width: "100%", padding: "13px 16px", fontFamily: f.b, fontSize: "15px", border: "1.5px solid #D1D5DB", borderRadius: "8px", outline: "none", color: C.charcoal, marginBottom: "12px", background: "#FAFAFA", boxSizing: "border-box" };

// ── Page content ──────────────────────────────────────────
const PAGE = {
  breadcrumb: ["Home", "Services", "Specialty Gutters"],
  heroTag: "CUSTOM & SPECIALTY GUTTER SYSTEMS",
  heroH1: "Beyond Standard.",
  heroH1Accent: "Built for Your Home.",
  heroP: "Half-round, box, D-style, super gutter, commercial, and more. When standard gutters won't do, our specialty systems deliver the precision, capacity, and aesthetics your home demands.",

  gutterTypes: [
    { icon: "\u{1F3DB}\u{FE0F}", title: "Half-Round Gutters", desc: "The classic semicircular profile. Elegant, smooth interior reduces debris buildup. Available in multiple sizes for different applications. Pairs perfectly with Mediterranean, Spanish Colonial, and barrel tile roofs \u2014 Tampa Bay's most popular architectural styles.", spec: "Profile: Classic semicircular" },
    { icon: "\u26A1", title: "Super Gutter", desc: "The maximum-capacity residential gutter system. Oversized profile engineered to handle Florida's most extreme rainfall without overflow. When standard gutters can't keep up with your roof's water volume, the Super Gutter delivers the performance you need \u2014 no compromises.", spec: "Grade: Maximum capacity" },
    { icon: "\u{1F3E0}", title: "D-Style Gutters", desc: "A smooth, single-curve profile that sits flush against the fascia for a clean, streamlined appearance. Popular across Florida residential homes for its simple aesthetic and reliable water handling. A versatile option that works with virtually any architectural style.", spec: "Profile: Smooth single-curve" },
    { icon: "\u{1F4E6}", title: "Box Style Gutters", desc: "Rectangular profile with maximum water capacity. Built into roof structures or hung externally. Custom-fabricated on a brake for exact dimensions. Ideal for commercial buildings, modern homes, and flat-roof drainage.", spec: "Profile: Rectangular / custom" },
    { icon: "\u{1F3E2}", title: "Commercial Gutters", desc: "Oversized, heavy-duty systems in .032\u2013.050 gauge aluminum. 6\" to 8\" K-style or box profile with 3x4 or 4x5 downspouts. Closer hanger spacing for hurricane-grade wind resistance. Built for large roof areas.", spec: "Grade: Heavy-duty commercial" },
    { icon: "\u{1F527}", title: "Rollform / Seamless", desc: "Every gutter we install is rollformed on-site from continuous aluminum coil \u2014 custom-cut to the exact length your home needs. No seams means no leaks. Up to 100+ feet in a single piece. The professional standard.", spec: "Method: On-site fabrication" },
  ],

  whySpecialty: [
    { title: "Right gutter for the right home", desc: "Cookie-cutter doesn't cut it. Your architecture, roof style, and water volume determine the right system." },
    { title: "Florida rainfall demands capacity", desc: "46–52 inches per year, 2–4 inches per hour in storms. Undersized gutters overflow — we size every system for Florida's demands." },
    { title: "Architectural integrity", desc: "Half-round on a barrel tile roof. Box on a modern build. The right gutter completes the design." },
    { title: "Hurricane-grade construction", desc: "Heavier gauge, closer hanger spacing, and proper sizing for Florida's demanding conditions." },
  ],

  stats: [
    { value: "6+", label: "Specialty gutter profiles" },
    { value: "8\"", label: "Max half-round size" },
    { value: "100+", label: "Ft seamless runs" },
    { value: ".050", label: "Gauge max thickness" },
  ],

  problems: [
    { icon: "\u{1F30A}", title: "Standard gutters overflow in Florida storms", desc: "Undersized gutters can't handle 2–4 inches of rain per hour. Your foundation, landscaping, and fascia pay the price every summer." },
    { icon: "\u{1F3E0}", title: "Wrong gutter style ruins architectural look", desc: "K-style on a Mediterranean home. Half-round on a modern build. The wrong profile cheapens your entire exterior." },
    { icon: "\u{1F32A}\u{FE0F}", title: "Light-gauge gutters fail in hurricane winds", desc: "Cheap .019 gauge aluminum bends, pulls away from fascia, and rips off in high winds. Florida demands heavier materials." },
  ],

  goldSteps: [
    { num: "01", title: "ASSESS", desc: "We inspect your roofline, measure water concentration points, evaluate architectural style, and recommend the right specialty system." },
    { num: "02", title: "DESIGN", desc: "Material selection, size calculation, color matching, and downspout placement. You see the plan before we cut metal." },
    { num: "03", title: "INSTALL", desc: "On-site fabrication and precision installation by our trained in-house crew. No subcontractors, no shortcuts." },
    { num: "04", title: "PROTECT", desc: "Final walkthrough, gutter performance testing, and our craftsmanship warranty." },
  ],

  reviews: [
    { text: "After Milton I called a dozen companies \u2014 only JR One called back. The team showed up and did a perfect job. Do not call anyone else.", name: "Matt D.", context: "Storm Damage Repair" },
    { text: "Six guys on site with a crew manager. They removed old wood soffit, replaced everything with aluminum, fixed all termite damage \u2014 done in days. Best company for the money.", name: "Tampa Homeowner", context: "Full Soffit & Fascia" },
    { text: "From the very beginning, they worked to ensure I received a fair quote. There was no high pressure selling. The workmanship was outstanding.", name: "Lois G.", context: "Gutters & Soffits" },
  ],

  faqs: [
    { q: "What size gutters do I need in Tampa?", a: "For most Florida homes, 6\" gutters with 3x4 downspouts should be the baseline — and we recommend 7\" for larger roof areas or heavy tree coverage. We size every system based on your roof area, pitch, and local rainfall intensity." },
    { q: "Are half-round gutters more expensive?", a: "Yes, typically 20\u201330% more than K-style due to the profile and specialized mounting brackets. But on Mediterranean, Spanish, and barrel-tile homes, they're the architecturally correct choice." },
    { q: "Do you install copper specialty gutters?", a: "Yes. Copper half-round, European half-round, and copper box gutters. See our dedicated copper gutters page for details." },
    { q: "What gauge aluminum do you use?", a: ".027 minimum for residential, .032 recommended for Florida conditions, up to .050 for commercial and high-wind applications. We never use cheap .019 gauge." },
    { q: "Do you do commercial gutter work?", a: "Yes. We install 6\"\u20138\" commercial gutter systems with oversized downspouts on offices, retail, churches, schools, and multi-family buildings throughout Tampa Bay." },
  ],

  ctaTitle: "NEED A GUTTER SYSTEM THAT GOES BEYOND STANDARD?",
  ctaSub: "Get your free specialty gutter consultation. We'll assess your home, recommend the right system, and give you a transparent estimate.",
};

// ── Main Component ────────────────────────────────────────
export default function SpecialtyGuttersPage() {
  const [formData, setFormData] = useState({ name: "", phone: "", email: "", zip: "" });
  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);

  useEffect(() => { injectFonts(); }, []);

  const sec = { padding: "80px 24px", maxWidth: "1200px", margin: "0 auto" };
  const secTitle = { fontFamily: f.h, fontSize: "clamp(24px,4vw,36px)", fontWeight: 800, letterSpacing: "2px", textAlign: "center", marginBottom: "8px" };

  return (
    <div style={{ background: C.bg, color: C.white, fontFamily: f.b, lineHeight: 1.65, minHeight: "100vh" }}>

      <SiteNav />

      {/* ══ BREADCRUMB ══ */}
      <div style={{ padding: "16px 24px 0", maxWidth: "1200px", margin: "0 auto" }}>
        <div style={{ fontFamily: f.b, fontSize: "13px", color: C.muted }}>
          {PAGE.breadcrumb.map((item, i) => (
            <span key={i}>
              {i > 0 && <span style={{ margin: "0 8px", opacity: 0.5 }}>/</span>}
              <span style={{ color: i === PAGE.breadcrumb.length - 1 ? C.accent : C.muted, cursor: i < PAGE.breadcrumb.length - 1 ? "pointer" : "default" }}>{item}</span>
            </span>
          ))}
        </div>
      </div>

      {/* ══ HERO ══ */}
      <section className="hero-stars" style={{ padding: "60px 24px 80px", maxWidth: "1200px", margin: "0 auto", display: "flex", gap: "48px", alignItems: "center", flexWrap: "wrap" }}>
        <div style={{ flex: "1 1 500px", minWidth: "300px" }}>
          <Tag>{PAGE.heroTag}</Tag>
          <h1 style={{ fontFamily: f.h, fontSize: "clamp(32px,5vw,48px)", fontWeight: 800, lineHeight: 1.1, marginBottom: "20px" }}>
            {PAGE.heroH1}<br />
            <span style={{ color: C.accent }}>{PAGE.heroH1Accent}</span>
          </h1>
          <p style={{ fontFamily: f.b, fontSize: "18px", color: C.offWhite, lineHeight: 1.7, marginBottom: "32px", maxWidth: "560px" }}>{PAGE.heroP}</p>
          <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
            <BtnPrimary onClick={() => document.getElementById("quote-form")?.scrollIntoView({ behavior: "smooth" })}>
              GET YOUR FREE ESTIMATE
            </BtnPrimary>
            <BtnOutline href="tel:8444443114">📞 CALL (844) 444-3114</BtnOutline>
          </div>
          <div style={{ display: "flex", gap: "24px", marginTop: "32px", flexWrap: "wrap" }}>
            {PAGE.stats.map((s, i) => (
              <div key={i} style={{ textAlign: "center" }}>
                <div style={{ fontFamily: f.h, fontSize: "28px", fontWeight: 800, color: C.accent }}>{s.value}</div>
                <div style={{ fontFamily: f.b, fontSize: "12px", color: C.muted, maxWidth: "100px" }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ THE PROBLEM ══ */}
      <section style={{ background: C.navy, padding: "80px 24px" }}>
        <div style={{ ...sec, padding: 0 }}>
          <div style={{ textAlign: "center" }}>
            <Tag>THE PROBLEM</Tag>
            <h2 style={{ ...secTitle, color: C.white }}>WHY STANDARD GUTTERS FALL SHORT IN FLORIDA</h2>
            <GoldBar />
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(250px,1fr))", gap: "24px", marginTop: "48px" }}>
            {PAGE.problems.map((p, i) => (
              <div key={i} style={{ background: C.navyFade, border: `1px solid ${C.navyLight}`, borderRadius: "12px", padding: "28px", borderLeft: `4px solid ${C.accent}` }}>
                <div style={{ fontSize: "28px", marginBottom: "12px" }}>{p.icon}</div>
                <h3 style={{ fontFamily: f.h, fontSize: "17px", fontWeight: 700, color: C.white, marginBottom: "8px" }}>{p.title}</h3>
                <p style={{ fontFamily: f.b, fontSize: "15px", color: C.muted, lineHeight: 1.55 }}>{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ SPECIALTY GUTTER TYPES ══ */}
      <section style={{ background: C.bg, padding: "80px 24px" }}>
        <div style={sec}>
          <div style={{ textAlign: "center" }}>
            <Tag>THE JR ONE DIFFERENCE</Tag>
            <h2 style={{ ...secTitle, color: C.white }}>SPECIALTY GUTTER SYSTEMS</h2>
            <GoldBar />
            <p style={{ fontFamily: f.b, fontSize: "17px", color: C.muted, maxWidth: "600px", margin: "0 auto 48px" }}>
              Six specialty profiles — each engineered for a specific purpose, architecture, and performance requirement.
            </p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(340px,1fr))", gap: "20px" }}>
            {PAGE.gutterTypes.map((g, i) => (
              <div key={i} style={{ background: C.navyFade, border: `1px solid ${C.navyLight}`, borderRadius: "12px", padding: "28px", transition: "border-color 0.3s" }}
                onMouseOver={e => e.currentTarget.style.borderColor = C.accent}
                onMouseOut={e => e.currentTarget.style.borderColor = C.navyLight}>
                <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "12px" }}>
                  <span style={{ fontSize: "28px" }}>{g.icon}</span>
                  <div style={{ fontFamily: f.h, fontSize: "11px", fontWeight: 700, color: C.accent, letterSpacing: "2px" }}>0{i + 1}</div>
                </div>
                <h3 style={{ fontFamily: f.h, fontSize: "17px", fontWeight: 700, color: C.white, marginBottom: "10px" }}>{g.title}</h3>
                <p style={{ fontFamily: f.b, fontSize: "15px", color: C.muted, lineHeight: 1.6, marginBottom: "12px" }}>{g.desc}</p>
                <div style={{ fontFamily: f.h, fontSize: "12px", fontWeight: 600, color: C.accent, letterSpacing: "1px", padding: "6px 12px", background: C.accentPale, borderRadius: "4px", display: "inline-block" }}>{g.spec}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ WHY SPECIALTY ══ */}
      <section style={{ background: C.navy, padding: "80px 24px" }}>
        <div style={{ ...sec, padding: 0 }}>
          <div style={{ textAlign: "center" }}>
            <Tag>WHY SPECIALTY</Tag>
            <h2 style={{ ...secTitle, color: C.white }}>WHY THE RIGHT GUTTER MATTERS</h2>
            <GoldBar />
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(250px,1fr))", gap: "24px", marginTop: "48px" }}>
            {PAGE.whySpecialty.map((w, i) => (
              <div key={i} style={{ background: C.navyFade, border: `1px solid ${C.navyLight}`, borderRadius: "12px", padding: "28px", borderLeft: `4px solid ${C.accent}` }}>
                <h3 style={{ fontFamily: f.h, fontSize: "17px", fontWeight: 700, color: C.white, marginBottom: "8px" }}>{w.title}</h3>
                <p style={{ fontFamily: f.b, fontSize: "15px", color: C.muted, lineHeight: 1.55 }}>{w.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ PEAK 301 CALLOUT ══ */}
      <section style={{background:"linear-gradient(135deg, rgba(177,26,33,0.08), rgba(15,30,54,0.97))",padding:"28px 24px",borderTop:"2px solid #B11A21",borderBottom:"2px solid #B11A21"}}>
        <div style={{maxWidth:"1000px",margin:"0 auto",display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:"20px"}}>
          <div style={{flex:"1 1 500px"}}>
            <div style={{display:"flex",alignItems:"center",gap:"8px",marginBottom:"8px"}}><span style={{fontSize:"16px"}}>⚠️</span><span style={{fontFamily:"'Montserrat', sans-serif",fontSize:"11px",fontWeight:700,color:"#B11A21",letterSpacing:"2px"}}>FLORIDA INSURANCE ALERT</span></div>
            <p style={{fontFamily:"'Montserrat', sans-serif",fontSize:"clamp(16px,2.5vw,20px)",fontWeight:800,color:"#FFFFFF",lineHeight:1.3,marginBottom:"6px"}}>280% Increase in Non-Renewals — Roof Over 15 Years Old?</p>
            <p style={{fontFamily:"'Source Sans 3', sans-serif",fontSize:"14px",color:"#7A8FA8",lineHeight:1.5}}><strong style={{color:"#E8E4DC"}}>Peak 301</strong> restores shingles from the inside out — adds 6–10 years at under 15% of replacement cost, with warranty docs your insurer must accept under FL law.</p>
          </div>
          <div style={{display:"flex",flexDirection:"column",gap:"8px",flexShrink:0}}>
            <a href="/peak-301" style={{padding:"12px 24px",fontFamily:"'Montserrat', sans-serif",fontSize:"12px",fontWeight:700,letterSpacing:"1px",color:"#FFFFFF",background:"linear-gradient(135deg, #B11A21, #D42A2A)",borderRadius:"6px",textDecoration:"none",textAlign:"center",boxShadow:"0 4px 12px rgba(177,26,33,0.3)"}}>PEAK 301 INFO →</a>
            <a href="/insurance-resource-center" style={{padding:"12px 24px",fontFamily:"'Montserrat', sans-serif",fontSize:"12px",fontWeight:700,letterSpacing:"1px",color:"#B11A21",border:"1.5px solid #B11A21",borderRadius:"6px",textDecoration:"none",textAlign:"center"}}>YOUR RIGHTS →</a>
          </div>
        </div>
      </section>

      {/* ══ THE GOLD STANDARD ══ */}
      <section style={{ background: C.navy, padding: "80px 24px" }}>
        <div style={sec}>
          <div style={{ textAlign: "center" }}>
            <Tag>THE GOLD STANDARD</Tag>
            <h2 style={{ ...secTitle, color: C.white }}>OUR SPECIALTY GUTTER PROCESS</h2>
            <GoldBar />
            <p style={{ fontFamily: f.b, fontSize: "17px", color: C.offWhite, fontStyle: "italic", maxWidth: "500px", margin: "0 auto 48px" }}>
              Every home. Every time. No exceptions.
            </p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(250px,1fr))", gap: "24px" }}>
            {PAGE.goldSteps.map((step, i) => (
              <div key={i} style={{ background: C.navyFade, border: `1px solid ${C.navyLight}`, borderRadius: "12px", padding: "28px", position: "relative" }}>
                <div style={{ fontFamily: f.h, fontSize: "36px", fontWeight: 800, color: "rgba(58,58,58,0.08)", position: "absolute", top: "16px", right: "20px" }}>{step.num}</div>
                <div style={{ fontFamily: f.h, fontSize: "11px", fontWeight: 700, color: C.accent, letterSpacing: "3px", marginBottom: "8px" }}>STEP {step.num}</div>
                <h3 style={{ fontFamily: f.h, fontSize: "22px", fontWeight: 700, color: C.white, marginBottom: "12px" }}>{step.title}</h3>
                <p style={{ fontFamily: f.b, fontSize: "15px", color: C.muted, lineHeight: 1.6 }}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ REVIEWS ══ */}
      <section style={{ background: C.bg, padding: "80px 24px" }}>
        <div style={sec}>
          <div style={{ textAlign: "center" }}>
            <Tag>CUSTOMER REVIEWS</Tag>
            <h2 style={{ ...secTitle, color: C.white }}>WHAT OUR CUSTOMERS SAY</h2>
            <GoldBar />
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: "20px", marginTop: "48px" }}>
            {PAGE.reviews.map((rev, i) => (
              <div key={i} style={{ background: C.navyFade, border: `1px solid ${C.navyLight}`, borderRadius: "12px", padding: "28px" }}>
                <Stars />
                <p style={{ fontFamily: f.b, fontSize: "15px", color: C.offWhite, lineHeight: 1.65, margin: "16px 0", fontStyle: "italic" }}>"{rev.text}"</p>
                <div style={{ borderTop: `1px solid ${C.navyLight}`, paddingTop: "12px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontFamily: f.h, fontSize: "14px", fontWeight: 600, color: C.white }}>{rev.name}</span>
                  <span style={{ fontFamily: f.b, fontSize: "12px", color: C.muted }}>{rev.context}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ FAQ ══ */}
      <section style={{ background: C.bg, padding: "80px 24px" }}>
        <div style={{ maxWidth: "800px", margin: "0 auto", textAlign: "center" }}>
          <Tag>FAQ</Tag>
          <h2 style={{ ...secTitle, color: C.white }}>SPECIALTY GUTTER QUESTIONS</h2>
          <GoldBar />
          <div style={{ marginTop: "40px", textAlign: "left" }}>
            {PAGE.faqs.map((faq, i) => (
              <div key={i} style={{ borderBottom: `1px solid ${C.navyLight}` }}>
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)} style={{ width: "100%", padding: "20px 0", background: "none", border: "none", cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center", gap: "16px" }}>
                  <span style={{ fontFamily: f.h, fontSize: "15px", fontWeight: 600, color: openFaq === i ? C.accent : C.white, textAlign: "left", transition: "color 0.2s" }}>{faq.q}</span>
                  <span style={{ fontFamily: f.h, fontSize: "20px", color: C.accent, transform: openFaq === i ? "rotate(45deg)" : "none", transition: "transform 0.3s", flexShrink: 0 }}>+</span>
                </button>
                {openFaq === i && (
                  <div style={{ padding: "0 0 20px", fontFamily: f.b, fontSize: "15px", color: C.muted, lineHeight: 1.65 }}>{faq.a}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ QUOTE FORM CTA ══ */}
      <section id="quote-form" style={{ background: `linear-gradient(165deg,${C.navy},${C.navyMid})`, padding: "80px 24px" }}>
        <div style={{ maxWidth: "600px", margin: "0 auto", textAlign: "center" }}>
          <h2 style={{ fontFamily: f.h, fontSize: "clamp(28px,5vw,40px)", fontWeight: 800, color: C.white, marginBottom: "12px" }}>{PAGE.ctaTitle}</h2>
          <p style={{ fontFamily: f.b, fontSize: "17px", color: C.offWhite, marginBottom: "40px" }}>{PAGE.ctaSub}</p>

          {submitted ? (
            <div style={{ background: C.successDim, border: `1px solid ${C.success}`, borderRadius: "12px", padding: "32px" }}>
              <div style={{ fontSize: "48px", marginBottom: "12px" }}>✓</div>
              <h3 style={{ fontFamily: f.h, fontSize: "20px", fontWeight: 700, color: "#4ADE80" }}>Quote Request Received!</h3>
              <p style={{ fontFamily: f.b, fontSize: "15px", color: C.muted, marginTop: "8px" }}>We'll get back to you within hours.</p>
            </div>
          ) : (
            <div style={{ background: C.white, borderRadius: "16px", padding: "32px", boxShadow: "0 24px 80px rgba(0,0,0,0.4)", textAlign: "left" }}>
              <h3 style={{ fontFamily: f.h, fontSize: "18px", fontWeight: 700, color: C.navy, textAlign: "center", marginBottom: "4px" }}>Get Your Free Specialty Gutter Estimate</h3>
              <div style={{ width: "40px", height: "3px", background: C.accent, borderRadius: "2px", margin: "10px auto 20px" }} />
              <input style={inputStyle} placeholder="Full Name" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} />
              <input style={inputStyle} placeholder="Phone Number" type="tel" value={formData.phone} onChange={e => setFormData({ ...formData, phone: e.target.value })} />
              <input style={inputStyle} placeholder="Email Address" type="email" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} />
              <input style={inputStyle} placeholder="ZIP Code" value={formData.zip} onChange={e => setFormData({ ...formData, zip: e.target.value })} maxLength={5} />
              <button onClick={() => setSubmitted(true)} style={{ width: "100%", padding: "16px", fontFamily: f.h, fontSize: "14px", fontWeight: 700, letterSpacing: "1.5px", color: C.white, background: `linear-gradient(135deg,${C.accent},${C.accentLight})`, border: "none", borderRadius: "8px", cursor: "pointer", boxShadow: "0 4px 16px rgba(58,58,58,0.3)" }}>
                REQUEST MY FREE ESTIMATE
              </button>
              <p style={{ fontFamily: f.b, fontSize: "12px", color: "#9CA3AF", textAlign: "center", marginTop: "12px" }}>No spam. No pressure. Just honest expert advice.</p>
            </div>
          )}

          <div style={{ marginTop: "32px" }}>
            <p style={{ fontFamily: f.b, fontSize: "15px", color: C.muted, marginBottom: "8px" }}>Prefer to talk?</p>
            <a href="tel:8444443114" style={{ fontFamily: f.h, fontSize: "18px", fontWeight: 700, color: C.gold, textDecoration: "none" }}>📞 (844) 444-3114</a>
          </div>
        </div>
      </section>

      <SiteFooter />

      <MobileCTA scrollTarget="quote-form" />

      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::placeholder { color: #9CA3AF; }
        input:focus { border-color: ${C.accent} !important; }
      `}</style>
    </div>
  );
}
