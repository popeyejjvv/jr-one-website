import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = { width: 32, height: 32 };
export const contentType = "image/png";

// Browser-tab + search-result favicon. Brand-matched gold star on navy,
// designed to read at 16x16 (browser tab) and 32x32 (Google search result).
// White-on-navy was unreadable at small sizes; this is filled-gold-on-navy
// with a thin gold hairline so it reads as a framed "badge."
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          height: "100%",
          background: "#1B2A4A",
          border: "1px solid #D4AF37",
          borderRadius: "4px",
        }}
      >
        <svg
          width="26"
          height="26"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 2L14.85 8.63L22 9.24L16.54 13.97L18.18 21L12 17.27L5.82 21L7.46 13.97L2 9.24L9.15 8.63L12 2Z"
            fill="#D4AF37"
          />
        </svg>
      </div>
    ),
    { ...size }
  );
}
