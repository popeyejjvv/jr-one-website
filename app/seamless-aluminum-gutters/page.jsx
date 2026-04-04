"use client";

import { useState, useEffect } from "react";
import SiteNav from "../../components/SiteNav";
import SiteFooter from "../../components/SiteFooter";
import MobileCTA from "../../components/MobileCTA";

/* ═══════════════════════════════════════════════════════════
   JR ONE ALUMINUM — SEAMLESS GUTTERS SERVICE PAGE
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
  accent: "#4A90D9", accentLight: "#6BA3E3", accentPale: "rgba(74,144,217,0.12)",
};
const f = { h: "'Montserrat', sans-serif", b: "'Source Sans 3', sans-serif" };

// ── Reusable pieces ───────────────────────────────────────
const Tag = ({ children }) => (
  <div style={{ display: "inline-block", padding: "6px 16px", background: C.goldPale, borderRadius: "4px", marginBottom: "12px" }}>
    <span style={{ fontFamily: f.h, fontSize: "12px", fontWeight: 700, color: C.gold, letterSpacing: "3px" }}>{children}</span>
  </div>
);
const GoldBar = () => <div style={{ width: "60px", height: "3px", background: `linear-gradient(90deg,${C.gold},${C.goldLight})`, borderRadius: "2px", margin: "16px auto" }} />;
const Stars = ({ n = 5 }) => <span style={{ color: C.gold, fontSize: "14px", letterSpacing: "2px" }}>{"★".repeat(n)}</span>;

const BtnPrimary = ({ children, onClick }) => (
  <button onClick={onClick} style={{ padding: "16px 36px", fontFamily: f.h, fontSize: "14px", fontWeight: 700, letterSpacing: "1.5px", color: C.white, background: `linear-gradient(135deg,${C.gold},${C.goldLight})`, border: "none", borderRadius: "8px", cursor: "pointer", boxShadow: "0 4px 16px rgba(200,149,46,0.3)", transition: "transform 0.15s" }}
    onMouseOver={e => e.target.style.transform = "translateY(-2px)"}
    onMouseOut={e => e.target.style.transform = "none"}>
    {children}
  </button>
);

const BtnOutline = ({ children, href }) => (
  <a href={href} style={{ display: "inline-flex", alignItems: "center", padding: "16px 36px", fontFamily: f.h, fontSize: "14px", fontWeight: 700, letterSpacing: "1.5px", color: C.gold, background: "transparent", border: `2px solid ${C.gold}`, borderRadius: "8px", textDecoration: "none", cursor: "pointer" }}>
    {children}
  </a>
);

const inputStyle = { width: "100%", padding: "13px 16px", fontFamily: f.b, fontSize: "15px", border: "1.5px solid #D1D5DB", borderRadius: "8px", outline: "none", color: C.charcoal, marginBottom: "12px", background: "#FAFAFA", boxSizing: "border-box" };

// ── Page content ──────────────────────────────────────────
const PAGE = {
  breadcrumb: ["Home", "Services", "Seamless Aluminum Gutters"],
  heroTag: "SEAMLESS GUTTER INSTALLATION",
  heroH1: "Tampa Bay's Premier",
  heroH1Gold: "Seamless Gutter Systems",
  heroP: "Custom-fabricated on-site for a watertight, perfect fit. Our in-house crews install 6\" and 7\" seamless aluminum gutters that protect your home from Florida's relentless rain — for decades, not seasons.",
  
  problemTitle: "WHY GUTTERS MATTER MORE THAN YOU THINK",
  problems: [
    { icon: "🌊", title: "Foundation damage", desc: "Without gutters, rainwater pools around your foundation causing cracks, settling, and costly structural repairs averaging $4,000–$12,000." },
    { icon: "🪵", title: "Fascia and soffit rot", desc: "Uncontrolled water flow saturates your fascia boards and soffit panels, creating rot that spreads behind your walls." },
    { icon: "🌿", title: "Landscape erosion", desc: "Florida's heavy downpours carve trenches through mulch beds, wash away soil, and damage plantings you've invested in." },
    { icon: "🦟", title: "Mosquito breeding", desc: "Standing water from failed or missing gutters creates the perfect breeding ground for mosquitoes — a year-round Florida problem." },
  ],

  solutionTitle: "HOW JR ONE DOES GUTTERS DIFFERENTLY",
  solutions: [
    { title: "Custom-fabricated on your property", desc: "We bring our gutter machine to your home and fabricate each run on-site to the exact measurements. No factory pre-cuts, no splices, no seams that leak. Every piece fits your roofline perfectly." },
    { title: "Two sizes for every situation", desc: "6\" high-capacity systems for homes with standard to large roof areas. 7\" commercial-grade gutters for maximum water handling during Florida storms. We recommend 6\" as the baseline for every Florida home — standard 5\" gutters overflow during summer storms." },
    { title: "Multiple gauge options to fit your needs", desc: "We carry a range of aluminum gauges from standard .027 up to heavy-duty .032, and we help you choose the right one for your home, budget, and weather exposure. Thicker gauges resist denting and last longer — but we'll never upsell you on what you don't need." },
    { title: "Hidden hanger system", desc: "Internal hangers every 24 inches for maximum strength. No ugly spike-and-ferrule showing on the face of your gutters. Cleaner look, stronger hold, longer lifespan." },
    { title: "Precision-pitched for Florida rain", desc: "Every gutter run is pitched at the correct slope for optimal water flow. Incorrect pitch is the #1 cause of gutter overflow and standing water — and it's the mistake subcontracted gutter installers make most often." },
    { title: "40+ color options", desc: "Match your gutters to your trim, fascia, roof, or siding. We carry the full aluminum coil color spectrum so your gutters look intentional, not afterthought." },
  ],

  statsTitle: "BY THE NUMBERS",
  stats: [
    { value: "3,000+", label: "Gutter installations completed" },
    { value: "20+", label: "Year lifespan on our systems" },
    { value: "40+", label: "Color options available" },
    { value: "24\"", label: "Hidden hanger spacing" },
  ],

  goldSteps: [
    { num: "01", title: "ASSESS", desc: "We inspect your roofline, measure every run, check your fascia condition, and evaluate your drainage needs." },
    { num: "02", title: "DESIGN", desc: "Custom gutter plan with sizes, downspout placement, color selection, and a transparent line-item estimate." },
    { num: "03", title: "INSTALL", desc: "Our crew fabricates and installs your gutters on-site — typically completed in a single day for most homes." },
    { num: "04", title: "PROTECT", desc: "Final walkthrough, water flow test, cleanup, and our craftsmanship warranty for lasting peace of mind." },
  ],

  reviews: [
    { text: "Chris and his team replaced the gutters on my home with 7\" gutters, changed downspouts to address standing water issues, then installed leaf guards. Very satisfied with the quality of work done and the entire team was very easy to work with.", name: "David K.", context: "7\" Gutter Upgrade + Guards" },
    { text: "Within just a couple of hours, the new gutters were in place. Their attention to detail was impressive. Chris also provided valuable tips on drainage and maintenance around the downspouts.", name: "Arif K.", context: "Full Gutter Installation" },
    { text: "From the very beginning, they worked to ensure I received a fair quote. There was no high pressure selling. They told me exactly what could be salvaged. The workmanship was outstanding.", name: "Lois G.", context: "Gutters & Soffits" },
  ],

  faqs: [
    { q: "How much do seamless gutters cost in Tampa?", a: "Seamless aluminum gutter installation in Tampa typically ranges from $11–$20 per linear foot, depending on gutter size (6\" or 7\"), accessibility, number of corners, and downspout configuration. Our estimates are detailed and transparent — you see every line item before any work begins." },
    { q: "What's the difference between 6\" and 7\" gutters?", a: "The number refers to the width of the gutter opening. 6\" is our standard recommendation for Florida homes — it handles typical residential water flow plus the extra capacity needed for our heavy rain. 7\" is commercial-grade capacity for maximum water handling during intense storms, large roof areas, or steep pitches. We assess your home and recommend the right size." },
    { q: "How long does gutter installation take?", a: "Most residential gutter installations are completed in a single day. Homes with complex rooflines, multiple stories, or combined gutter and soffit/fascia projects may take 2–3 days. We give you a specific timeline before work begins." },
    { q: "Do seamless gutters really not leak?", a: "Seamless gutters eliminate the horizontal seams where sectional gutters typically fail. The only joints in a seamless system are at corners and downspout connections — and those are sealed with professional-grade sealant. The result is dramatically fewer leak points compared to pre-formed sectional gutters." },
    { q: "What colors are available for seamless gutters?", a: "We offer 40+ color options in our aluminum coil inventory. The most popular choices in Tampa Bay are white, almond, clay, bronze, dark bronze, and black — but we can match virtually any trim or fascia color on your home." },
    { q: "Why not just have my roofer install gutters?", a: "Roofing companies typically subcontract gutter work to the lowest bidder. The result is often incorrect pitch angles, thin-gauge aluminum, visible spike hangers, and poor corner work. We specialize exclusively in aluminum systems — gutters, soffit, fascia — and every installation is performed by our trained in-house crew." },
    { q: "Do you remove old gutters?", a: "Yes. Our installation includes removal of your existing gutter system, inspection of the fascia board underneath, and cleanup of all old materials. If we find damaged fascia during removal, we'll discuss repair options with you before proceeding." },
  ],

  ctaTitle: "READY FOR GUTTERS THAT ACTUALLY LAST?",
  ctaSub: "Get your free, no-pressure gutter assessment. We'll inspect your home, recommend the right system, and give you a transparent estimate — typically within 48 hours.",
};

// ── Main Component ────────────────────────────────────────
export default function SeamlessGuttersPage() {
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
              <span style={{ color: i === PAGE.breadcrumb.length - 1 ? C.gold : C.muted, cursor: i < PAGE.breadcrumb.length - 1 ? "pointer" : "default" }}>{item}</span>
            </span>
          ))}
        </div>
      </div>

      {/* ══ HERO ══ */}
      <section style={{ padding: "60px 24px 80px", maxWidth: "1200px", margin: "0 auto", display: "flex", gap: "48px", alignItems: "center", flexWrap: "wrap" }}>
        <div style={{ flex: "1 1 500px", minWidth: "300px" }}>
          <Tag>{PAGE.heroTag}</Tag>
          <h1 style={{ fontFamily: f.h, fontSize: "clamp(32px,5vw,48px)", fontWeight: 800, lineHeight: 1.1, marginBottom: "20px" }}>
            {PAGE.heroH1}<br />
            <span style={{ color: C.gold }}>{PAGE.heroH1Gold}</span>
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
                <div style={{ fontFamily: f.h, fontSize: "28px", fontWeight: 800, color: C.gold }}>{s.value}</div>
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
            <h2 style={{ ...secTitle, color: C.white }}>{PAGE.problemTitle}</h2>
            <GoldBar />
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(250px,1fr))", gap: "24px", marginTop: "48px" }}>
            {PAGE.problems.map((p, i) => (
              <div key={i} style={{ background: C.navyFade, border: `1px solid ${C.navyLight}`, borderRadius: "12px", padding: "28px", borderLeft: `4px solid ${C.gold}` }}>
                <div style={{ fontSize: "28px", marginBottom: "12px" }}>{p.icon}</div>
                <h3 style={{ fontFamily: f.h, fontSize: "17px", fontWeight: 700, color: C.white, marginBottom: "8px" }}>{p.title}</h3>
                <p style={{ fontFamily: f.b, fontSize: "15px", color: C.muted, lineHeight: 1.55 }}>{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ THE SOLUTION ══ */}
      <section style={{ background: C.bg, padding: "80px 24px" }}>
        <div style={sec}>
          <div style={{ textAlign: "center" }}>
            <Tag>THE JR ONE DIFFERENCE</Tag>
            <h2 style={{ ...secTitle, color: C.white }}>{PAGE.solutionTitle}</h2>
            <GoldBar />
            <p style={{ fontFamily: f.b, fontSize: "17px", color: C.muted, maxWidth: "600px", margin: "0 auto 48px" }}>
              Six things we do that most gutter companies don't — or won't.
            </p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(340px,1fr))", gap: "20px" }}>
            {PAGE.solutions.map((s, i) => (
              <div key={i} style={{ background: C.navyFade, border: `1px solid ${C.navyLight}`, borderRadius: "12px", padding: "28px", transition: "border-color 0.3s" }}
                onMouseOver={e => e.currentTarget.style.borderColor = C.gold}
                onMouseOut={e => e.currentTarget.style.borderColor = C.navyLight}>
                <div style={{ fontFamily: f.h, fontSize: "11px", fontWeight: 700, color: C.gold, letterSpacing: "2px", marginBottom: "8px" }}>0{i + 1}</div>
                <h3 style={{ fontFamily: f.h, fontSize: "17px", fontWeight: 700, color: C.white, marginBottom: "10px" }}>{s.title}</h3>
                <p style={{ fontFamily: f.b, fontSize: "15px", color: C.muted, lineHeight: 1.6 }}>{s.desc}</p>
              </div>
            ))}
          </div>
          {/* Downspout Styles Callout */}
          <div style={{ marginTop: "40px", background: `linear-gradient(135deg, ${C.navyFade}, ${C.navy})`, border: `2px solid ${C.gold}`, borderRadius: "16px", padding: "32px", position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", top: "-20px", right: "-20px", fontSize: "120px", opacity: 0.04, transform: "rotate(-15deg)" }}>↓</div>
            <div style={{ display: "flex", alignItems: "flex-start", gap: "16px", marginBottom: "20px" }}>
              <span style={{ fontSize: "28px" }}>💡</span>
              <div>
                <h3 style={{ fontFamily: f.h, fontSize: "18px", fontWeight: 700, color: C.gold, marginBottom: "4px" }}>YOUR DOWNSPOUTS, YOUR STYLE</h3>
                <p style={{ fontFamily: f.b, fontSize: "15px", color: C.offWhite, lineHeight: 1.6 }}>Most homeowners don't realize they have options beyond the standard rectangular downspout. We install multiple downspout styles to match your home's look and drainage needs:</p>
              </div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "12px", marginLeft: "44px" }}>
              {[
                { name: "Standard Rectangular", desc: "The classic — reliable and cost-effective" },
                { name: "Smooth Rectangular", desc: "Sleek, modern look with a flat finish" },
                { name: "Round Downspouts", desc: "Available in 2 sizes — elegant and distinctive" },
                { name: "4×5 Rectangular", desc: "Oversized for maximum water volume" },
                { name: "Box Style Commercial", desc: "Heavy-duty for high-capacity systems" },
                { name: "Rain Chains", desc: "Decorative alternative — visible water flow as a design feature" },
              ].map((ds, i) => (
                <div key={i} style={{ background: "rgba(200,149,46,0.08)", borderRadius: "8px", padding: "12px 16px" }}>
                  <div style={{ fontFamily: f.h, fontSize: "13px", fontWeight: 700, color: C.gold, marginBottom: "4px" }}>{ds.name}</div>
                  <div style={{ fontFamily: f.b, fontSize: "13px", color: C.muted }}>{ds.desc}</div>
                </div>
              ))}
            </div>
            <p style={{ fontFamily: f.b, fontSize: "14px", color: C.muted, fontStyle: "italic", marginTop: "16px", marginLeft: "44px" }}>Ask us about downspout options during your free estimate — the right choice can transform your home's curb appeal.</p>
          </div>
        </div>
      </section>

      {/* ══ SPECIALTY GUTTERS CALLOUT ══ */}
      <section style={{ background: C.navyFade, padding: "48px 24px", borderTop: `1px solid ${C.navyLight}`, borderBottom: `1px solid ${C.navyLight}` }}>
        <div style={{ maxWidth: "800px", margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "24px" }}>
          <div style={{ flex: "1 1 400px" }}>
            <h3 style={{ fontFamily: f.h, fontSize: "20px", fontWeight: 700, color: C.white, marginBottom: "8px" }}>Looking for Something Beyond Standard?</h3>
            <p style={{ fontFamily: f.b, fontSize: "16px", color: C.muted, lineHeight: 1.6 }}>We also install half-round, D-style, box, super gutter, and commercial specialty systems. If your home's architecture or water volume demands more than standard seamless gutters, we've got you covered.</p>
          </div>
          <a href="/specialty-gutters" style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "14px 28px", fontFamily: f.h, fontSize: "13px", fontWeight: 700, letterSpacing: "1px", color: C.gold, border: `2px solid ${C.gold}`, borderRadius: "8px", textDecoration: "none", whiteSpace: "nowrap" }}>VIEW SPECIALTY GUTTERS →</a>
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

      {/* ══ THE GOLD STANDARD ══ */}
      <section style={{ background: C.navy, padding: "80px 24px" }}>
        <div style={sec}>
          <div style={{ textAlign: "center" }}>
            <Tag>THE GOLD STANDARD</Tag>
            <h2 style={{ ...secTitle, color: C.white }}>OUR GUTTER INSTALLATION PROCESS</h2>
            <GoldBar />
            <p style={{ fontFamily: f.b, fontSize: "17px", color: C.offWhite, fontStyle: "italic", maxWidth: "500px", margin: "0 auto 48px" }}>
              Every home. Every time. No exceptions.
            </p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(250px,1fr))", gap: "24px" }}>
            {PAGE.goldSteps.map((step, i) => (
              <div key={i} style={{ background: C.navyFade, border: `1px solid ${C.navyLight}`, borderRadius: "12px", padding: "28px", position: "relative" }}>
                <div style={{ fontFamily: f.h, fontSize: "36px", fontWeight: 800, color: "rgba(200,149,46,0.08)", position: "absolute", top: "16px", right: "20px" }}>{step.num}</div>
                <div style={{ fontFamily: f.h, fontSize: "11px", fontWeight: 700, color: C.gold, letterSpacing: "3px", marginBottom: "8px" }}>STEP {step.num}</div>
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
            <h2 style={{ ...secTitle, color: C.white }}>WHAT GUTTER CUSTOMERS SAY</h2>
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

      {/* ══ PROJECT GALLERY ══ */}
      <section style={{ background: C.navy, padding: "80px 24px" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", textAlign: "center" }}>
          <Tag>OUR WORK</Tag>
          <h2 style={{ ...secTitle, color: C.white }}>RECENT GUTTER PROJECTS</h2>
          <GoldBar />
          <p style={{ fontFamily: f.b, fontSize: "17px", color: C.muted, maxWidth: "600px", margin: "0 auto 40px" }}>
            Real projects. Real homes. Swipe to see our craftsmanship across Tampa Bay.
          </p>
        </div>
        <div style={{ maxWidth: "1200px", margin: "0 auto", overflowX: "auto", WebkitOverflowScrolling: "touch", scrollbarWidth: "thin" }}>
          <div style={{ display: "flex", gap: "16px", paddingBottom: "16px", minWidth: "max-content" }}>
            {[
              { label: "7\" seamless aluminum — bronze finish, Tampa", tag: "FULL INSTALL" },
              { label: "Downspout reroute — corrected drainage, Clearwater", tag: "REPAIR" },
              { label: "160 LF white gutters + hidden hangers, Sarasota", tag: "FULL INSTALL" },
              { label: "Post-hurricane gutter replacement, Riverview", tag: "STORM DAMAGE" },
              { label: "6\" gutters + leaf guards, St. Petersburg", tag: "INSTALL + GUARDS" },
              { label: "Custom copper accent gutters, South Tampa", tag: "SPECIALTY" },
              { label: "Commercial gutter system, Bradenton", tag: "COMMERCIAL" },
              { label: "Gutter + soffit + fascia combo, Wesley Chapel", tag: "FULL PACKAGE" },
            ].map((photo, i) => (
              <div key={i} style={{ width: "280px", flexShrink: 0, borderRadius: "12px", overflow: "hidden", border: `1px solid ${C.navyLight}`, background: C.navyFade }}>
                <div style={{ width: "280px", height: "200px", background: `linear-gradient(135deg, ${i % 2 === 0 ? C.navyFade : C.navyLight}, ${i % 2 === 0 ? C.navyLight : C.navyMid})`, display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
                  <span style={{ fontFamily: f.h, fontSize: "32px" }}>📸</span>
                  <div style={{ position: "absolute", top: "10px", left: "10px", padding: "4px 10px", background: C.navy, borderRadius: "4px" }}>
                    <span style={{ fontFamily: f.h, fontSize: "10px", fontWeight: 700, color: C.gold, letterSpacing: "1px" }}>{photo.tag}</span>
                  </div>
                </div>
                <div style={{ padding: "14px 16px" }}>
                  <p style={{ fontFamily: f.b, fontSize: "13px", color: C.muted, lineHeight: 1.4 }}>{photo.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div style={{ textAlign: "center", marginTop: "24px" }}>
          <span style={{ fontFamily: f.h, fontSize: "13px", fontWeight: 600, color: C.gold, letterSpacing: "1px", cursor: "pointer" }}>VIEW ALL PROJECTS →</span>
        </div>
      </section>

      {/* ══ FAQ ══ */}
      <section style={{ background: C.bg, padding: "80px 24px" }}>
        <div style={{ maxWidth: "800px", margin: "0 auto", textAlign: "center" }}>
          <Tag>FAQ</Tag>
          <h2 style={{ ...secTitle, color: C.white }}>SEAMLESS GUTTER QUESTIONS</h2>
          <GoldBar />
          <div style={{ marginTop: "40px", textAlign: "left" }}>
            {PAGE.faqs.map((faq, i) => (
              <div key={i} style={{ borderBottom: `1px solid ${C.navyLight}` }}>
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)} style={{ width: "100%", padding: "20px 0", background: "none", border: "none", cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center", gap: "16px" }}>
                  <span style={{ fontFamily: f.h, fontSize: "15px", fontWeight: 600, color: openFaq === i ? C.gold : C.white, textAlign: "left", transition: "color 0.2s" }}>{faq.q}</span>
                  <span style={{ fontFamily: f.h, fontSize: "20px", color: C.gold, transform: openFaq === i ? "rotate(45deg)" : "none", transition: "transform 0.3s", flexShrink: 0 }}>+</span>
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
              <h3 style={{ fontFamily: f.h, fontSize: "18px", fontWeight: 700, color: C.navy, textAlign: "center", marginBottom: "4px" }}>Get Your Free Gutter Estimate</h3>
              <div style={{ width: "40px", height: "3px", background: C.gold, borderRadius: "2px", margin: "10px auto 20px" }} />
              <input style={inputStyle} placeholder="Full Name" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} />
              <input style={inputStyle} placeholder="Phone Number" type="tel" value={formData.phone} onChange={e => setFormData({ ...formData, phone: e.target.value })} />
              <input style={inputStyle} placeholder="Email Address" type="email" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} />
              <input style={inputStyle} placeholder="ZIP Code" value={formData.zip} onChange={e => setFormData({ ...formData, zip: e.target.value })} maxLength={5} />
              <button onClick={() => setSubmitted(true)} style={{ width: "100%", padding: "16px", fontFamily: f.h, fontSize: "14px", fontWeight: 700, letterSpacing: "1.5px", color: C.white, background: `linear-gradient(135deg,${C.gold},${C.goldLight})`, border: "none", borderRadius: "8px", cursor: "pointer", boxShadow: "0 4px 16px rgba(200,149,46,0.3)" }}>
                REQUEST MY FREE GUTTER ESTIMATE
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
        input:focus { border-color: ${C.gold} !important; }
      `}</style>
    </div>
  );
}
