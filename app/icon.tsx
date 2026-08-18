import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#F4EFE8",
          color: "#B85C38",
          fontSize: 20,
          fontFamily: "Georgia, serif",
        }}
      >
        I
      </div>
    ),
    size,
  );
}
