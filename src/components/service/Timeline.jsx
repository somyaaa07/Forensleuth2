"use client";

import { useState } from "react";

// ─────────────────────────────────────────────────────────────
//  Timeline — process steps with connecting glow line
//  Plain Tailwind compatible (no custom PostCSS required)
//
//  steps shape: { step: string, title: string, description: string }[]
// ─────────────────────────────────────────────────────────────

export default function Timeline({ steps, accent = "#207eff" }) {
  return (
    <div style={{ position: "relative" }}>
      {/* Vertical connecting line */}
      <div style={{
        position: "absolute",
        left: "27px",
        top: "32px",
        bottom: "32px",
        width: "1px",
        background: `linear-gradient(to bottom, transparent 0%, ${accent}66 15%, ${accent}66 85%, transparent 100%)`,
      }} />

      <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        {steps.map((s, i) => (
          <TimelineStep key={i} step={s} index={i} accent={accent} />
        ))}
      </div>
    </div>
  );
}

function TimelineStep({ step, index, accent }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div style={{ display: "flex", alignItems: "flex-start", gap: "18px" }}>
      {/* Node */}
      <div style={{ position: "relative", zIndex: 10, flexShrink: 0 }}>
        <div
          className="fs-node-flicker"
          style={{
            display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
            width: "56px", height: "56px", borderRadius: "50%",
            background: `radial-gradient(circle, ${accent}22 0%, #0a0f1c 100%)`,
            border: `2px solid ${accent}88`,
            boxShadow: `0 0 18px ${accent}44, 0 0 4px ${accent}22`,
            animationDelay: `${index * 0.4}s`,
          }}
        >
          <div
            style={{
              fontFamily: "'Share Tech Mono', monospace",
              fontSize: "9px",
              letterSpacing: ".08em",
              color: `${accent}aa`,
            }}
          >
            {step.step}
          </div>
        </div>
      </div>

      {/* Content card */}
      <div
        style={{
          flex: 1,
          background: "#0a0f1c",
          borderRadius: "12px",
          padding: "16px 18px",
          border: `1px solid ${hovered ? `${accent}66` : "#1f2937"}`,
          boxShadow: hovered ? `0 0 20px ${accent}22` : "none",
          transition: "border-color .3s ease, box-shadow .3s ease, transform .3s ease",
          transform: hovered ? "translateX(4px)" : "translateX(0)",
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "8px" }}>
          <h4
            style={{
              fontFamily: "'Orbitron', monospace",
              fontSize: "11px",
              fontWeight: 700,
              letterSpacing: ".08em",
              color: "#fff",
              margin: 0,
            }}
          >
            {step.title}
          </h4>
          <div style={{ flex: 1, height: "1px", background: `${accent}22` }} />
        </div>
        <p
          style={{
            fontFamily: "'Rajdhani', sans-serif",
            fontSize: "13px",
            lineHeight: 1.65,
            color: "#9ca3af",
            margin: 0,
          }}
        >
          {step.description}
        </p>
      </div>
    </div>
  );
}