import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

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
          background: "#0B1628",
          borderRadius: "36px",
        }}
      >
        <span style={{ fontSize: "100px", color: "#C8952E" }}>★</span>
      </div>
    ),
    { ...size }
  );
}
