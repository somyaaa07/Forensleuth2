"use client";

import { useState } from "react";

// ─────────────────────────────────────────────────────────────
//  Accordion — expandable detail sections
//  Plain Tailwind compatible (no custom PostCSS required)
//
//  sections shape: { title: string, content: string }[]
// ─────────────────────────────────────────────────────────────

export default function Accordion({ sections, accent = "#207eff" }) {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
      {sections.map((section, i) => {
        const isOpen = openIndex === i;
        return (
          <div
            key={i}
            style={{
              position: "relative",
              background: "#0a0f1c",
              borderRadius: "12px",
              overflow: "hidden",
              border: `1px solid ${isOpen ? `${accent}66` : "#1f2937"}`,
              boxShadow: isOpen ? `0 0 20px ${accent}22` : "none",
              transition: "border-color .3s ease, box-shadow .3s ease",
            }}
          >
            {/* Left accent stripe when open */}
            {isOpen && (
              <div style={{
                position: "absolute", top: 0, left: 0, bottom: 0, width: "3px",
                background: `linear-gradient(to bottom, transparent, ${accent}, transparent)`,
              }} />
            )}

            {/* Header button */}
            <button
              style={{
                display: "flex", alignItems: "center", justifyContent: "space-between",
                width: "100%", gap: "14px", padding: "14px 18px",
                textAlign: "left", background: "none", border: "none", cursor: "pointer",
              }}
              onClick={() => setOpenIndex(isOpen ? -1 : i)}
            >
              <div style={{ display: "flex", alignItems: "center", flex: 1, gap: "12px" }}>
                {/* Step number */}
                <div
                  style={{
                    width: "28px", height: "28px", borderRadius: "6px",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    flexShrink: 0,
                    background: isOpen ? `${accent}22` : "#0d1524",
                    border: `1px solid ${isOpen ? accent : "#2a3a50"}`,
                    color: isOpen ? accent : "#4a6080",
                    fontFamily: "'Share Tech Mono', monospace",
                    fontSize: "10px",
                    transition: "all .3s ease",
                  }}
                >
                  {String(i + 1).padStart(2, "0")}
                </div>
                <span
                  style={{
                    fontFamily: "'Rajdhani', sans-serif",
                    fontSize: "14px",
                    fontWeight: 600,
                    letterSpacing: ".04em",
                    color: isOpen ? "#ffffff" : "#9ca3af",
                    transition: "color .3s ease",
                  }}
                >
                  {section.title}
                </span>
              </div>

              {/* Chevron */}
              <svg
                width="16" height="16" viewBox="0 0 24 24" fill="none"
                style={{
                  flexShrink: 0,
                  color: isOpen ? accent : "#4a6080",
                  transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                  transition: "transform .35s ease, color .3s ease",
                }}
              >
                <polyline points="6,9 12,15 18,9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>

            {/* Body */}
            <div
              className="fs-accordion-body"
              style={{
                maxHeight: isOpen ? "400px" : "0px",
                opacity: isOpen ? 1 : 0,
              }}
            >
              <div style={{ padding: "0 18px 18px 58px" }}>
                <div style={{ width: "100%", height: "1px", background: `${accent}22`, marginBottom: "12px" }} />
                <p
                  style={{
                    fontFamily: "'Rajdhani', sans-serif",
                    fontSize: "13px",
                    lineHeight: 1.7,
                    color: "#9ca3af",
                    margin: 0,
                  }}
                >
                  {section.content}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}