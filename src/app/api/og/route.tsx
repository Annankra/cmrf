import { ImageResponse } from "next/og";

export const runtime = "edge";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const title = searchParams.get("title") || "CMRF — Christian Medical Missions Resource Foundation";
    const badge = searchParams.get("badge") || "MISSION UPDATE";
    const date = searchParams.get("date") || "Accra, Ghana";
    const description = searchParams.get("description") || "Mobilizing medical professionals and resources to bring free healthcare across Ghana.";

    return new ImageResponse(
      (
        <div
          style={{
            height: "100%",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            justifyContent: "space-between",
            backgroundColor: "#111115",
            padding: "60px 80px",
            fontFamily: "sans-serif",
            position: "relative",
          }}
        >
          {/* Top Decorative Border */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: "8px",
              background: "linear-gradient(90deg, #CC5833 0%, #2E4036 100%)",
            }}
          />

          {/* Top Meta Header */}
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <div
              style={{
                backgroundColor: "rgba(204, 88, 51, 0.15)",
                border: "1px solid rgba(204, 88, 51, 0.4)",
                color: "#CC5833",
                padding: "8px 18px",
                borderRadius: "999px",
                fontSize: "14px",
                fontWeight: "bold",
                letterSpacing: "2px",
                textTransform: "uppercase",
              }}
            >
              {badge}
            </div>
            <span style={{ color: "rgba(255, 255, 255, 0.5)", fontSize: "16px" }}>
              {date}
            </span>
          </div>

          {/* Main Title & Narrative */}
          <div style={{ display: "flex", flexDirection: "column", gap: "16px", maxWidth: "1000px" }}>
            <h1
              style={{
                fontSize: "52px",
                fontWeight: "bold",
                color: "#FFFFFF",
                lineHeight: 1.15,
                margin: 0,
                letterSpacing: "-0.02em",
              }}
            >
              {title}
            </h1>
            <p
              style={{
                fontSize: "22px",
                color: "rgba(255, 255, 255, 0.75)",
                lineHeight: 1.4,
                margin: 0,
              }}
            >
              {description}
            </p>
          </div>

          {/* Footer Logo & Brand */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              width: "100%",
              borderTop: "1px solid rgba(255, 255, 255, 0.1)",
              paddingTop: "24px",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <span
                style={{
                  fontSize: "28px",
                  fontWeight: "900",
                  color: "#FAF9F6",
                  letterSpacing: "-0.04em",
                }}
              >
                CMRF
              </span>
              <span
                style={{
                  width: "8px",
                  height: "8px",
                  borderRadius: "50%",
                  backgroundColor: "#CC5833",
                }}
              />
              <span style={{ color: "rgba(255, 255, 255, 0.4)", fontSize: "16px" }}>
                Christian Medical Missions Resource Foundation
              </span>
            </div>
            <span
              style={{
                fontSize: "16px",
                fontWeight: "bold",
                color: "#CC5833",
                letterSpacing: "1px",
              }}
            >
              WWW.CMRFGH.COM
            </span>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (e: unknown) {
    const errorMsg = e instanceof Error ? e.message : "Failed to generate OG image";
    return new Response(errorMsg, { status: 500 });
  }
}
