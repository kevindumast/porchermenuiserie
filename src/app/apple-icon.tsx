import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 180,
          height: 180,
          background: "#fff8f4",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: 14,
        }}
      >
        <div
          style={{
            width: "100%",
            height: "100%",
            border: "4px solid #A48654",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <span
            style={{
              color: "#A48654",
              fontSize: 108,
              fontFamily: "serif",
              lineHeight: 1,
            }}
          >
            P
          </span>
        </div>
      </div>
    ),
    { ...size }
  );
}
