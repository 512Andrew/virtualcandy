import { ImageResponse } from "next/og";
export const dynamic = "force-static";
export const alt =
  "Virtual Candy Studio — Good ideas. Made useful. Websites, content and practical automation.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export default function Image() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        background: "#142018",
        color: "#f7f8f3",
        padding: 64,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 28 }}>
        <span style={{ fontSize: 74, color: "#c5e952" }}>vc*</span>
        <span style={{ fontSize: 28 }}>VIRTUAL CANDY STUDIO</span>
      </div>
      <div style={{ display: "flex", flexDirection: "column", fontSize: 78, lineHeight: 1.1 }}>
        <span>Good ideas.</span>
        <span style={{ color: "#c5e952" }}>Made useful.</span>
      </div>
      <div style={{ display: "flex", fontSize: 26 }}>Websites · Content · Practical automation</div>
    </div>,
    size
  );
}
