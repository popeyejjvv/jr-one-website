import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

// iOS home-screen icon. iOS auto-rounds the corners, so the underlying
// canvas is square but we still inset the gold border so it survives the mask.
export default function Icon() {
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
          borderRadius: "36px",
          border: "4px solid #D4AF37",
        }}
      >
        <svg
          width="108"
          height="108"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 2L14.85 8.63L22 9.24L16.54 13.97L18.18 21L12 17.27L5.82 21L7.46 13.97L2 9.24L9.15 8.63L12 2Z"
            fill="#D4AF37"
          />
        </svg>
        <div
          style={{
            fontSize: "18px",
            fontWeight: 800,
            color: "#FFFFFF",
            letterSpacing: "3px",
            marginTop: "8px",
            display: "flex",
          }}
        >
          JR<span style={{ color: "#D4AF37", marginLeft: "4px" }}>ONE</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
