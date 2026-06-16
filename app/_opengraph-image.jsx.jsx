import { ImageResponse } from "next/og";

export const runtime = "edge";

// Hero photo served as a static public asset at a clean www-subdomain URL
// (no apex->www redirect to confuse the edge fetch, no data-URI embedding
// to fight Satori's image decoder).
const HERO_URL = "https://www.jronegutters.com/og/hero.jpg";
export const alt = "JR One Aluminum LLC. Tampa Bay seamless gutters, soffit, fascia, drainage, Peak 301 roof rejuvenation. Family-owned, 30+ years.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const StarSVG = ({ size: s = 72, color = "#D4AF37" }) => (
  <svg
    width={s}
    height={s}
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12 2L14.85 8.63L22 9.24L16.54 13.97L18.18 21L12 17.27L5.82 21L7.46 13.97L2 9.24L9.15 8.63L12 2Z"
      fill={color}
    />
  </svg>
);

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "100%",
          position: "relative",
          backgroundColor: "#0B1628",
        }}
      >
        {/* Hero photo, pre-cropped to exactly 1200x630 so we don't need
            objectFit (unsupported in next/og's CSS subset). Loaded from
            the www subdomain so the apex 307 redirect doesn't interfere
            with the edge function's fetch. */}
        <img
          src={HERO_URL}
          width="1200"
          height="630"
          style={{ position: "absolute", top: 0, left: 0 }}
        />

        {/* Navy gradient overlay for text legibility */}
        <div
          style={{
            display: "flex",
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background:
              "linear-gradient(135deg, rgba(11,22,51,0.82) 0%, rgba(27,42,74,0.86) 55%, rgba(11,22,51,0.92) 100%)",
          }}
        />

        {/* Top gold bar */}
        <div
          style={{
            display: "flex",
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "8px",
            background:
              "linear-gradient(90deg, #D4AF37 0%, #F2CD69 50%, #D4AF37 100%)",
          }}
        />

        {/* Content stack */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            height: "100%",
            position: "relative",
            padding: "60px 72px",
          }}
        >
          {/* Brand star */}
          <div style={{ display: "flex", marginBottom: "20px" }}>
            <StarSVG size={68} color="#D4AF37" />
          </div>

          {/* Company name */}
          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              gap: "20px",
              marginBottom: "8px",
            }}
          >
            <span
              style={{
                fontSize: "112px",
                fontWeight: 800,
                color: "#FFFFFF",
                letterSpacing: "6px",
                lineHeight: 1,
              }}
            >
              JR
            </span>
            <span
              style={{
                fontSize: "112px",
                fontWeight: 800,
                color: "#D4AF37",
                letterSpacing: "6px",
                lineHeight: 1,
              }}
            >
              ONE
            </span>
          </div>

          {/* Aluminum LLC */}
          <div
            style={{
              fontSize: "22px",
              fontWeight: 600,
              color: "#D4AF37",
              letterSpacing: "12px",
              marginBottom: "30px",
            }}
          >
            ALUMINUM LLC
          </div>

          {/* Gold divider */}
          <div
            style={{
              display: "flex",
              width: "140px",
              height: "2px",
              background:
                "linear-gradient(90deg, transparent 0%, #D4AF37 50%, transparent 100%)",
              marginBottom: "26px",
            }}
          />

          {/* Tagline (single confident line, not the doubled-Tampa-Bay version) */}
          <div
            style={{
              fontSize: "32px",
              fontWeight: 700,
              color: "#FFFFFF",
              textAlign: "center",
              lineHeight: 1.25,
              maxWidth: "900px",
              marginBottom: "16px",
              display: "flex",
            }}
          >
            Tampa Bay's Family-Owned Specialty Trade
          </div>

          {/* Proof line */}
          <div
            style={{
              fontSize: "24px",
              fontWeight: 500,
              color: "#E8E4DC",
              textAlign: "center",
              lineHeight: 1.4,
              maxWidth: "900px",
              display: "flex",
            }}
          >
            Seamless gutters. Soffit. Fascia. Drainage. Peak 301.
          </div>
        </div>

        {/* Bottom phone + URL band */}
        <div
          style={{
            display: "flex",
            position: "absolute",
            bottom: "26px",
            left: 0,
            right: 0,
            justifyContent: "center",
            alignItems: "center",
            gap: "24px",
            fontSize: "24px",
            fontWeight: 700,
            color: "#D4AF37",
            letterSpacing: "2px",
          }}
        >
          <span style={{ display: "flex" }}>(844) 444-3114</span>
          <span style={{ display: "flex", color: "#7A8FA8" }}>|</span>
          <span style={{ display: "flex" }}>jronegutters.com</span>
        </div>

        {/* Bottom gold bar */}
        <div
          style={{
            display: "flex",
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "8px",
            background:
              "linear-gradient(90deg, #D4AF37 0%, #F2CD69 50%, #D4AF37 100%)",
          }}
        />
      </div>
    ),
    { ...size }
  );
}
