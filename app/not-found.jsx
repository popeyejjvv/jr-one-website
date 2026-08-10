import Link from "next/link";

export const metadata = {
  title: "Page Not Found | JR One Aluminum",
  robots: { index: false, follow: false },
};

const C = { bg:"#0B1628",navy:"#1B2A4A",gold:"#D4AF37",goldLight:"#F2CD69",goldPale:"rgba(200,149,46,0.12)",cream:"#F5F3EF",white:"#FFFFFF",muted:"#7A8FA8" };

export default function NotFound() {
  return (
    <div style={{ minHeight:"100vh", background:C.bg, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", fontFamily:"'Montserrat', sans-serif", padding:"40px 20px", textAlign:"center" }}>
      <div style={{ display:"inline-block", padding:"6px 16px", background:C.goldPale, borderRadius:"4px", marginBottom:"16px" }}>
        <span style={{ fontSize:"12px", fontWeight:700, color:C.gold, letterSpacing:"3px" }}>404</span>
      </div>

      <h1 style={{ fontSize:"clamp(28px,5vw,48px)", fontWeight:800, color:C.white, margin:"0 0 16px", lineHeight:1.2 }}>
        Page Not Found
      </h1>

      <p style={{ fontSize:"18px", color:C.muted, maxWidth:"520px", lineHeight:1.6, margin:"0 0 12px", fontFamily:"'Source Sans 3', sans-serif" }}>
        Our site was recently updated. If you followed an old link or bookmark, the page may have moved.
      </p>

      <p style={{ fontSize:"20px", fontWeight:700, color:C.gold, margin:"0 0 10px" }}>
        <a href="tel:8444443114" style={{ color:C.gold, textDecoration:"none" }}>(844) 444-3114</a>
      </p>

      {/* This page does not render SiteFooter, so the NAP is carried here. */}
      <address style={{ fontSize:"15px", fontStyle:"normal", color:C.muted, lineHeight:1.6, margin:"0 0 32px", fontFamily:"'Source Sans 3', sans-serif" }}>
        JR One Aluminum LLC<br />
        3420 W Cherry St, Tampa, FL 33607
      </address>

      <div style={{ display:"flex", gap:"16px", flexWrap:"wrap", justifyContent:"center" }}>
        <Link href="/" style={{ display:"inline-block", padding:"14px 32px", background:`linear-gradient(135deg,${C.gold},${C.goldLight})`, color:C.bg, fontWeight:700, fontSize:"14px", letterSpacing:"1px", borderRadius:"6px", textDecoration:"none" }}>
          HOME
        </Link>
        <Link href="/seamless-aluminum-gutters" style={{ display:"inline-block", padding:"14px 32px", border:`2px solid ${C.gold}`, color:C.gold, fontWeight:700, fontSize:"14px", letterSpacing:"1px", borderRadius:"6px", textDecoration:"none", background:"transparent" }}>
          SERVICES
        </Link>
        <Link href="/contact" style={{ display:"inline-block", padding:"14px 32px", border:`2px solid ${C.gold}`, color:C.gold, fontWeight:700, fontSize:"14px", letterSpacing:"1px", borderRadius:"6px", textDecoration:"none", background:"transparent" }}>
          CONTACT
        </Link>
        <Link href="/estimator" style={{ display:"inline-block", padding:"14px 32px", border:`2px solid ${C.gold}`, color:C.gold, fontWeight:700, fontSize:"14px", letterSpacing:"1px", borderRadius:"6px", textDecoration:"none", background:"transparent" }}>
          FREE ESTIMATE
        </Link>
      </div>
    </div>
  );
}
