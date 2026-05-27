import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "JR One Aluminum LLC, Tampa Bay Specialty Trade, Tampa Bay";
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
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          height: "100%",
          background:
            "linear-gradient(135deg, #0B1628 0%, #1B2A4A 55%, #0B1628 100%)",
          padding: "56px 72px",
          position: "relative",
        }}
      >
        {/* Top gold bar */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "8px",
            background:
              "linear-gradient(90deg, #D4AF37 0%, #F2CD69 50%, #D4AF37 100%)",
          }}
        />

        {/* Brand star */}
        <div
          style={{
            display: "flex",
            marginBottom: "28px",
          }}
        >
          <StarSVG size={84} color="#D4AF37" />
        </div>

        {/* Company name */}
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            gap: "18px",
            marginBottom: "10px",
          }}
        >
          <span
            style={{
              fontSize: "104px",
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
              fontSize: "104px",
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
            letterSpacing: "10px",
            marginBottom: "22px",
          }}
        >
          ALUMINUM LLC
        </div>

        {/* Gold divider */}
        <div
          style={{
            display: "flex",
            width: "120px",
            height: "3px",
            background:
              "linear-gradient(90deg, transparent 0%, #D4AF37 50%, transparent 100%)",
            marginBottom: "22px",
          }}
        />

        {/* Tagline */}
        <div
          style={{
            fontSize: "30px",
            fontWeight: 600,
            color: "#E8E4DC",
            textAlign: "center",
            lineHeight: 1.3,
            maxWidth: "900px",
            marginBottom: "32px",
          }}
        >
          Tampa Bay Specialty Trade, Tampa Bay
        </div>

        {/* Stats row */}
        <div
          style={{
            display: "flex",
            gap: "56px",
            alignItems: "center",
          }}
        >
          {[
            { value: "30+", label: "YEARS" },
            { value: "4.9/5", label: "RATING", withStar: true },
            { value: "3", label: "CREWS" },
          ].map((stat) => (
            <div
              key={stat.label}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                <span
                  style={{
                    fontSize: "40px",
                    fontWeight: 800,
                    color: "#D4AF37",
                    lineHeight: 1,
                  }}
                >
                  {stat.value}
                </span>
                {stat.withStar && <StarSVG size={30} color="#D4AF37" />}
              </div>
              <span
                style={{
                  fontSize: "14px",
                  fontWeight: 600,
                  color: "#7A8FA8",
                  letterSpacing: "3px",
                  marginTop: "6px",
                }}
              >
                {stat.label}
              </span>
            </div>
          ))}
        </div>

        {/* Phone + domain */}
        <div
          style={{
            position: "absolute",
            bottom: "34px",
            left: 0,
            right: 0,
            display: "flex",
            justifyContent: "center",
            fontSize: "22px",
            fontWeight: 700,
            color: "#D4AF37",
            letterSpacing: "2px",
          }}
        >
          (844) 444-3114  ·  jronegutters.com
        </div>

        {/* Bottom gold bar */}
        <div
          style={{
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
