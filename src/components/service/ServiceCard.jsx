"use client";

import { useState } from "react";
import { CyberCorners } from "./ui";

// ─────────────────────────────────────────────────────────────
//  ServiceCard — used in /services list page
//  Plain Tailwind compatible + images via service.image prop
//
//  service shape:
//  {
//    id: number,
//    slug: string,
//    title: string,
//    shortDescription: string,
//    features: string[],
//    accentColor?: string,   // default "#207eff"
//    image?: string,         // URL — Unsplash or any CDN
//    category?: string,
//  }
// ─────────────────────────────────────────────────────────────

// Curated Unsplash fallbacks keyed by service slug
const FALLBACK_IMAGES = {
  "digital-forensics":       "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&q=80",
  "cyber-incident-response": "https://images.unsplash.com/photo-1614064641938-3bbee52942c7?w=600&q=80",
  "mobile-forensics":        "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600&q=80",
  "network-forensics":       "https://images.unsplash.com/photo-1545987796-200677ee1011?w=600&q=80",
  "osint-investigations":    "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=600&q=80",
  "forensic-training":       "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=600&q=80",
};

const DEFAULT_IMAGE = "https://images.unsplash.com/photo-1510511459019-5dda7724fd87?w=600&q=80";

export default function ServiceCard({ service, delay = 0 }) {
  const [hovered, setHovered] = useState(false);
  const accent = service.accentColor || "#207eff";
  const isOrange = accent === "#fa5330";
  const image = service.image || FALLBACK_IMAGES[service.slug] || DEFAULT_IMAGE;

  return (
    <div
      className="fs-fade-slide"
      style={{
        animationDelay: `${delay}ms`,
        position: "relative",
        background: "#0a0f1c",
        border: `1px solid ${hovered ? `${accent}77` : "#1f2937"}`,
        borderRadius: "12px",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        transition: "transform .32s ease, box-shadow .32s ease, border-color .32s ease",
        transform: hovered ? "translateY(-6px) scale(1.015)" : "translateY(0) scale(1)",
        boxShadow: hovered
          ? `0 0 36px ${accent}44, 0 0 8px ${accent}22, 0 16px 40px #00000099`
          : "0 4px 24px #00000066",
        cursor: "pointer",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <CyberCorners color={hovered ? accent : `${accent}33`} size={16} thick={1.5} />

      {/* ── Hero Image ── */}
      <div style={{ position: "relative", height: "160px", overflow: "hidden" }}>
        <img
          src={image}
          alt={service.title}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            opacity: hovered ? 0.75 : 0.55,
            transition: "opacity .4s ease, transform .4s ease",
            transform: hovered ? "scale(1.06)" : "scale(1)",
          }}
        />
        {/* Gradient overlay */}
        <div style={{
          position: "absolute", inset: 0,
          background: `linear-gradient(to bottom, ${accent}11 0%, #0a0f1c 100%)`,
        }} />
        {/* Top accent bar */}
        <div style={{
          position: "absolute", top: 0, left: 0, right: 0, height: "2px",
          background: `linear-gradient(90deg, transparent 0%, ${accent} 50%, transparent 100%)`,
          opacity: hovered ? 1 : 0.3,
          transition: "opacity .3s ease",
        }} />
        {/* SVC badge */}
        <div
          className="fs-mono"
          style={{
            position: "absolute", top: "10px", right: "10px",
            padding: "3px 8px",
            background: `${accent}22`,
            border: `1px solid ${accent}44`,
            borderRadius: "4px",
            fontSize: "9px",
            color: `${accent}cc`,
            letterSpacing: ".1em",
          }}
        >
          SVC-{String(service.id).padStart(3, "0")}
        </div>
      </div>

      {/* ── Card Body ── */}
      <div style={{ display: "flex", flexDirection: "column", gap: "16px", padding: "20px", flex: 1 }}>

        {/* Icon + Title */}
        <div style={{ display: "flex", alignItems: "flex-start", gap: "14px" }}>
          <div
            style={{
              display: "flex", alignItems: "center", justifyContent: "center",
              flexShrink: 0, width: "44px", height: "44px",
              fontSize: "20px", borderRadius: "8px",
              background: `${accent}15`,
              border: `1px solid ${accent}33`,
              boxShadow: hovered ? `0 0 16px ${accent}44` : "none",
              transition: "box-shadow .3s ease",
            }}
          >
            {service.icon}
          </div>
          <div>
            <div
              className="fs-mono"
              style={{ fontSize: "9px", letterSpacing: ".15em", marginBottom: "4px", color: `${accent}88` }}
            >
              {service.category || "FORENSIC SERVICE"}
            </div>
            <h3
              className="fs-orbitron"
              style={{ fontSize: "13px", fontWeight: 700, lineHeight: 1.3, color: "#fff", letterSpacing: ".06em", margin: 0 }}
            >
              {service.title}
            </h3>
          </div>
        </div>

        {/* Short description */}
        <p
          className="fs-rajdhani"
          style={{ flex: 1, fontSize: "13px", lineHeight: 1.65, color: "#9ca3af", margin: 0 }}
        >
          {service.shortDescription}
        </p>

        {/* Features preview */}
        <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
          {service.features.slice(0, 3).map((f, i) => (
            <div
              key={i}
              className="fs-mono"
              style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "10px", color: "#6b7280", letterSpacing: ".05em" }}
            >
              <span style={{ color: accent, fontSize: "8px" }}>▸</span>
              {f}
            </div>
          ))}
          {service.features.length > 3 && (
            <div
              className="fs-mono"
              style={{ fontSize: "10px", color: "#4b5563", letterSpacing: ".12em" }}
            >
              +{service.features.length - 3} more capabilities
            </div>
          )}
        </div>

        {/* CTA */}
        <a
          href={`/services/${service.slug}`}
          className={isOrange ? "fs-glow-pulse-or" : "fs-glow-pulse"}
          style={{
            marginTop: "auto",
            display: "flex", alignItems: "center", justifyContent: "center", gap: "8px",
            padding: "12px",
            borderRadius: "8px",
            background: hovered ? `linear-gradient(135deg, ${accent}33 0%, ${accent}15 100%)` : "transparent",
            border: `1px solid ${hovered ? `${accent}bb` : `${accent}44`}`,
            color: hovered ? accent : `${accent}aa`,
            fontFamily: "'Orbitron', monospace",
            fontSize: "10px",
            fontWeight: 700,
            letterSpacing: ".12em",
            textDecoration: "none",
            transition: "all .3s ease",
          }}
        >
          VIEW DETAILS
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
            <line x1="5" y1="12" x2="19" y2="12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            <polyline points="13,6 19,12 13,18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </a>
      </div>
    </div>
  );
}