import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 32,
          height: 32,
          background: "#fff8f4",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: 2,
        }}
      >
        <div
          style={{
            width: "100%",
            height: "100%",
            border: "1px solid #A48654",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <span
            style={{
              color: "#A48654",
              fontSize: 20,
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
