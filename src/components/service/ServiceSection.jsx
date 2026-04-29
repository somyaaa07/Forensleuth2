"use client";

import { HexGrid, Breadcrumb } from "./ui";

// ─────────────────────────────────────────────────────────────
//  ServicesSection — reusable hero / banner section
//  Plain Tailwind compatible (no custom PostCSS required)
//  Accepts an optional `bgImage` prop for a background photo
//
//  Curated Unsplash fallback is used when no bgImage is passed.
// ─────────────────────────────────────────────────────────────

const DEFAULT_BG = "https://images.unsplash.com/photo-1510511459019-5dda7724fd87?w=1400&q=70";

export default function ServicesSection({
  label = "FORENSLEUTH",
  title,
  subtitle,
  breadcrumbs = [],
  accent = "#207eff",
  bgImage,
  children,
}) {
  const bg = bgImage || DEFAULT_BG;

  return (
    <section
      style={{
        position: "relative",
        overflow: "hidden",
        background: "linear-gradient(160deg,#060e1f 0%,#03060d 45%,#0a0508 100%)",
        minHeight: "360px",
      }}
    >
      {/* Background photo with very low opacity */}
      <img
        src={bg}
        alt=""
        aria-hidden="true"
        style={{
          position: "absolute", inset: 0,
          width: "100%", height: "100%",
          objectFit: "cover",
          opacity: 0.09,
          pointerEvents: "none",
        }}
      />

      <HexGrid opacity={0.07} />

      {/* Glow orbs */}
      <div style={{
        position: "absolute", pointerEvents: "none",
        top: "-80px", left: "10%", width: "500px", height: "500px",
        background: `radial-gradient(circle,${accent}18 0%,transparent 70%)`,
      }} />
      <div style={{
        position: "absolute", pointerEvents: "none",
        bottom: "-100px", right: "8%", width: "350px", height: "350px",
        background: "radial-gradient(circle,#fa533014 0%,transparent 70%)",
      }} />

      <div
        style={{
          position: "relative", zIndex: 2,
          display: "flex", flexDirection: "column", alignItems: "center",
          justifyContent: "center", padding: "96px 24px",
          textAlign: "center",
        }}
      >
        {breadcrumbs.length > 0 && <Breadcrumb crumbs={breadcrumbs} />}

        <div
          style={{
            fontFamily: "'Share Tech Mono', monospace",
            fontSize: "10px", letterSpacing: ".4em", marginBottom: "12px",
            color: `${accent}77`,
          }}
        >
          ◆ {label} ◆
        </div>

        <h1
          style={{
            fontFamily: "'Orbitron', monospace",
            fontSize: "clamp(28px,6vw,54px)",
            fontWeight: 900,
            letterSpacing: ".08em",
            color: "#e8f4ff",
            textShadow: `0 0 20px ${accent}66`,
            margin: "0 0 16px",
          }}
        >
          {title}
        </h1>

        {subtitle && (
          <p
            style={{
              fontFamily: "'Rajdhani', sans-serif",
              maxWidth: "560px",
              fontSize: "clamp(14px,2vw,17px)",
              lineHeight: 1.65,
              letterSpacing: ".04em",
              color: "#9ca3af",
              margin: 0,
            }}
          >
            {subtitle}
          </p>
        )}

        {children}
      </div>
    </section>
  );
}