"use client";

/* ═══════════════════════════════════════════════════════════
   JR ONE — SHARED FOOTER COMPONENT
   Full 4-column footer + copyright + privacy/terms
   Used on every page for consistency
   ═══════════════════════════════════════════════════════════ */

const C = {
  bg: "#0B1628", navy: "#1B2A4A", navyLight: "#2C3E5A", navyFade: "#162033",
  gold: "#C8952E", goldLight: "#D4A843",
  white: "#FFFFFF", muted: "#7A8FA8",
};
const f = { h: "'Montserrat', sans-serif", b: "'Source Sans 3', sans-serif" };

const SERVICES = [
  { name: "Seamless Gutters", href: "/seamless-aluminum-gutters" },
  { name: "Gutter Guards", href: "/gutter-guards" },
  { name: "Soffit & Fascia", href: "/soffit-and-fascia" },
  { name: "Gutter Repair", href: "/gutter-repair" },
  { name: "Siding", href: "/siding" },
  { name: "Specialty Gutters", href: "/specialty-gutters" },
  { name: "Copper Gutters", href: "/copper-gutters" },
  { name: "SAGIPER", href: "/sagiper" },
  { name: "Peak 301", href: "/peak-301" },
  { name: "Service Plans", href: "/service-plans" },
  { name: "Drainage Installation", href: "/drainage-assessment" },
];

const CITIES = [
  { name: "Tampa", slug: "tampa" }, { name: "Clearwater", slug: "clearwater" }, { name: "St. Petersburg", slug: "st-petersburg" },
  { name: "Sarasota", slug: "sarasota" }, { name: "Bradenton", slug: "bradenton" }, { name: "Lakeland", slug: "lakeland" },
  { name: "Brandon", slug: "brandon" }, { name: "Wesley Chapel", slug: "wesley-chapel" }, { name: "Palm Harbor", slug: "palm-harbor" },
  { name: "Riverview", slug: "riverview" }, { name: "New Port Richey", slug: "new-port-richey" }, { name: "Largo", slug: "largo" },
  { name: "Spring Hill", slug: "spring-hill" }, { name: "Tarpon Springs", slug: "tarpon-springs" }, { name: "Land O' Lakes", slug: "land-o-lakes" },
  { name: "Dunedin", slug: "dunedin" }, { name: "Ruskin", slug: "ruskin" }, { name: "Sun City Center", slug: "sun-city-center" },
  { name: "Temple Terrace", slug: "temple-terrace" }, { name: "Plant City", slug: "plant-city" }, { name: "Lutz", slug: "lutz" },
];

export default function SiteFooter() {
  return (
    <>
      <footer style={{ background: C.navyFade, borderTop: `1px solid ${C.navyLight}`, padding: "60px 24px 100px" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "40px" }}>
          {/* Company */}
          <div>
            <div style={{ fontFamily: f.h, fontSize: "24px", fontWeight: 800, color: C.white, marginBottom: "4px" }}>
              JR <span style={{ color: C.gold }}>ONE</span> <span style={{ color: C.white, fontSize: "18px" }}>★</span>
            </div>
            <p style={{ fontFamily: f.h, fontSize: "14px", fontWeight: 600, color: C.gold, fontStyle: "italic", marginBottom: "12px" }}>The Superior Soffit & Gutter Experts</p>
            <p style={{ fontFamily: f.b, fontSize: "14px", color: C.muted, lineHeight: 1.55 }}>Family-owned and operated for 30+ years. Tampa Bay's trusted aluminum specialists.</p>
          </div>

          {/* Services */}
          <div>
            <h4 style={{ fontFamily: f.h, fontSize: "13px", fontWeight: 700, color: C.white, letterSpacing: "2px", marginBottom: "16px" }}>SERVICES</h4>
            {SERVICES.map((svc, i) => (
              <a key={i} href={svc.href} style={{ display: "block", fontFamily: f.b, fontSize: "14px", color: C.muted, marginBottom: "8px", textDecoration: "none" }}
                onMouseOver={e => e.target.style.color = C.gold}
                onMouseOut={e => e.target.style.color = C.muted}>
                {svc.name}
              </a>
            ))}
          </div>

          {/* Service Areas */}
          <div>
            <h4 style={{ fontFamily: f.h, fontSize: "13px", fontWeight: 700, color: C.white, letterSpacing: "2px", marginBottom: "16px" }}>SERVICE AREAS</h4>
            {CITIES.map((city, i) => (
              <a key={i} href={`/areas/${city.slug}`} style={{ display: "block", fontFamily: f.b, fontSize: "14px", color: C.muted, marginBottom: "8px", textDecoration: "none" }}
                onMouseOver={e => e.target.style.color = C.gold}
                onMouseOut={e => e.target.style.color = C.muted}>
                {city.name}
              </a>
            ))}
          </div>

          {/* Contact */}
          <div>
            <h4 style={{ fontFamily: f.h, fontSize: "13px", fontWeight: 700, color: C.white, letterSpacing: "2px", marginBottom: "16px" }}>CONTACT</h4>
            <a href="tel:8444443114" style={{ display: "block", fontFamily: f.b, fontSize: "14px", color: C.gold, marginBottom: "8px", fontWeight: 600, textDecoration: "none" }}>(844) 444-3114</a>
            <a href="mailto:info@jronegutters.com" style={{ display: "block", fontFamily: f.b, fontSize: "14px", color: C.muted, marginBottom: "8px", textDecoration: "none" }}>info@jronegutters.com</a>
            <p style={{ fontFamily: f.b, fontSize: "14px", color: C.muted, marginBottom: "16px" }}>Tampa, FL</p>
            <div style={{ display: "flex", gap: "12px" }}>
              <a href="https://www.facebook.com/jronealuminum" target="_blank" rel="noopener noreferrer" style={{ fontFamily: f.h, fontSize: "11px", fontWeight: 600, color: C.muted, padding: "6px 10px", border: `1px solid ${C.navyLight}`, borderRadius: "4px", textDecoration: "none" }}>Facebook</a>
              <a href="https://www.instagram.com/jronegutters" target="_blank" rel="noopener noreferrer" style={{ fontFamily: f.h, fontSize: "11px", fontWeight: 600, color: C.muted, padding: "6px 10px", border: `1px solid ${C.navyLight}`, borderRadius: "4px", textDecoration: "none" }}>Instagram</a>
              <a href="https://g.co/kgs/jronealuminum" target="_blank" rel="noopener noreferrer" style={{ fontFamily: f.h, fontSize: "11px", fontWeight: 600, color: C.muted, padding: "6px 10px", border: `1px solid ${C.navyLight}`, borderRadius: "4px", textDecoration: "none" }}>Google</a>
            </div>
          </div>
        </div>

        {/* Copyright + Legal */}
        <div style={{ maxWidth: "1200px", margin: "40px auto 0", paddingTop: "24px", borderTop: `1px solid ${C.navyLight}`, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "12px" }}>
          <p style={{ fontFamily: f.b, fontSize: "12px", color: C.muted }}>
            © 2026 JR One Aluminum LLC. All rights reserved.
          </p>
          <div style={{ display: "flex", gap: "20px" }}>
            <a href="/privacy-policy" style={{ fontFamily: f.b, fontSize: "12px", color: C.muted, textDecoration: "none" }}>Privacy Policy</a>
            <a href="/terms-of-service" style={{ fontFamily: f.b, fontSize: "12px", color: C.muted, textDecoration: "none" }}>Terms of Service</a>
          </div>
        </div>
      </footer>
    </>
  );
}
