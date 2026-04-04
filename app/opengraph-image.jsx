import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "JR One Aluminum LLC — Tampa Bay Gutters, Soffit & Fascia";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

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
          background: "linear-gradient(135deg, #0B1628 0%, #1B2A4A 50%, #0B1628 100%)",
          padding: "60px",
        }}
      >
        {/* Star border accent */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "6px",
            background: "linear-gradient(90deg, #C8952E, #D4A843, #C8952E)",
          }}
        />

        {/* Large star */}
        <div
          style={{
            fontSize: "80px",
            color: "#C8952E",
            marginBottom: "20px",
          }}
        >
          ★
        </div>

        {/* Company name */}
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            gap: "16px",
            marginBottom: "12px",
          }}
        >
          <span
            style={{
              fontSize: "72px",
              fontWeight: 800,
              color: "#FFFFFF",
              letterSpacing: "4px",
            }}
          >
            JR
          </span>
          <span
            style={{
              fontSize: "72px",
              fontWeight: 800,
              color: "#C8952E",
              letterSpacing: "4px",
            }}
          >
            ONE
          </span>
        </div>

        {/* Tagline */}
        <div
          style={{
            fontSize: "24px",
            fontWeight: 600,
            color: "#C8952E",
            letterSpacing: "6px",
            marginBottom: "24px",
          }}
        >
          ALUMINUM LLC
        </div>

        {/* Gold bar */}
        <div
          style={{
            width: "80px",
            height: "3px",
            background: "linear-gradient(90deg, #C8952E, #D4A843)",
            borderRadius: "2px",
            marginBottom: "24px",
          }}
        />

        {/* Description */}
        <div
          style={{
            fontSize: "28px",
            fontWeight: 600,
            color: "#E8E4DC",
            textAlign: "center",
            lineHeight: 1.4,
            maxWidth: "800px",
          }}
        >
          Tampa Bay's Trusted Gutters, Soffit & Fascia Specialists
        </div>

        {/* Stats row */}
        <div
          style={{
            display: "flex",
            gap: "48px",
            marginTop: "36px",
          }}
        >
          {[
            { value: "30+", label: "YEARS" },
            { value: "4.9★", label: "RATING" },
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
              <span
                style={{
                  fontSize: "36px",
                  fontWeight: 800,
                  color: "#C8952E",
                }}
              >
                {stat.value}
              </span>
              <span
                style={{
                  fontSize: "14px",
                  fontWeight: 600,
                  color: "#7A8FA8",
                  letterSpacing: "3px",
                }}
              >
                {stat.label}
              </span>
            </div>
          ))}
        </div>

        {/* Phone number */}
        <div
          style={{
            position: "absolute",
            bottom: "30px",
            fontSize: "20px",
            fontWeight: 700,
            color: "#C8952E",
            letterSpacing: "2px",
          }}
        >
          (844) 444-3114 | jronegutters.com
        </div>

        {/* Bottom border */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "6px",
            background: "linear-gradient(90deg, #C8952E, #D4A843, #C8952E)",
          }}
        />
      </div>
    ),
    {
      ...size,
    }
  );
}
