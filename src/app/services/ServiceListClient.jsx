"use client";

import { useState } from "react";
import ServiceCard from "../../components/service/ServiceCard";
import { HexGrid, SectionHeading, ForensleuthStyles } from "../../components/service/ui";

// ─────────────────────────────────────────────────────────────
//  ServicesListClient — renders the /services list page
//  Accepts `services` array from the server component
// ─────────────────────────────────────────────────────────────

export default function ServicesListClient({ services = [] }) {
  const [filter, setFilter] = useState("ALL");

  const categories = ["ALL", ...Array.from(new Set(services.map((s) => s.category || "FORENSIC SERVICE")))];
  const filtered = filter === "ALL" ? services : services.filter((s) => (s.category || "FORENSIC SERVICE") === filter);

  return (
    <main style={{ minHeight: "100vh", background: "#03060d", color: "#e2e8f0" }}>
      <ForensleuthStyles />

      {/* ── HERO ──────────────────────────────────────────── */}
      <section
        style={{
          position: "relative", overflow: "hidden",
          background: "linear-gradient(160deg,#060e1f 0%,#03060d 45%,#0a0508 100%)",
          minHeight: "550px",
        }}
      >
        <HexGrid opacity={0.08} />

        {/* Glow orbs */}
        <div style={{ position: "absolute", pointerEvents: "none", top: "-80px", left: "10%", width: "500px", height: "500px", background: "radial-gradient(circle,#207eff18 0%,transparent 70%)" }} />
        <div style={{ position: "absolute", pointerEvents: "none", bottom: "-80px", right: "8%",  width: "350px", height: "350px", background: "radial-gradient(circle,#fa533014 0%,transparent 70%)" }} />

        <div style={{ position: "relative", zIndex: 2, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "80px 24px", textAlign: "center", marginTop: "40px" }}>

          {/* Breadcrumb */}
          <nav style={{ display: "flex", alignItems: "center", gap: "8px", fontFamily: "'Share Tech Mono', monospace", fontSize: "10px", color: "#4b5563", letterSpacing: ".12em", marginBottom: "24px" }}>
            <a href="/" style={{ color: "inherit", textDecoration: "none" }}
              onMouseEnter={e => e.target.style.color = "#207eff"}
              onMouseLeave={e => e.target.style.color = "#4b5563"}>HOME</a>
            <span style={{ color: "#374151" }}>›</span>
            <span style={{ color: "#207eff" }}>SERVICES</span>
          </nav>

          <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: "10px", letterSpacing: ".4em", marginBottom: "12px", color: "#207eff77" }}>
            ◆ FORENSLEUTH ◆
          </div>
          <h1 style={{ fontFamily: "'Orbitron', monospace", fontSize: "clamp(28px,6vw,50px)", fontWeight: 900, letterSpacing: ".08em", color: "#e8f4ff", textShadow: "0 0 20px #207eff66", margin: "0 0 14px" }}>
            OUR SERVICES
          </h1>
          <p style={{ fontFamily: "'Rajdhani', sans-serif", maxWidth: "520px", fontSize: "clamp(14px,2vw,17px)", lineHeight: 1.65, color: "#9ca3af", margin: 0 }}>
            Industry-leading forensic and cyber investigation services backed by certified specialists and proven methodology.
          </p>

          {/* Stats row */}
          <div style={{ display: "flex", gap: "32px", marginTop: "32px", flexWrap: "wrap", justifyContent: "center" }}>
            {[
              { label: "SERVICES",    value: services.length },
              { label: "SPECIALISTS", value: "24+" },
              { label: "CASES SOLVED",value: "500+" },
              { label: "AVAILABILITY",value: "24/7" },
            ].map(({ label, value }) => (
              <div key={label} style={{ textAlign: "center" }}>
                <div style={{ fontFamily: "'Orbitron', monospace", fontSize: "20px", fontWeight: 700, color: "#207eff", textShadow: "0 0 12px #207eff66" }}>{value}</div>
                <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: "9px", color: "#4b5563", letterSpacing: ".15em", marginTop: "4px" }}>{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FILTER BAR ────────────────────────────────────── */}
      {categories.length > 2 && (
        <div style={{ display: "flex", justifyContent: "center", gap: "8px", flexWrap: "wrap", padding: "32px 24px 0" }}>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              style={{
                padding: "7px 18px", borderRadius: "999px",
                fontFamily: "'Share Tech Mono', monospace",
                fontSize: "10px", letterSpacing: ".1em",
                cursor: "pointer",
                background: filter === cat ? "#207eff22" : "transparent",
                border: `1px solid ${filter === cat ? "#207eff88" : "#1f2937"}`,
                color: filter === cat ? "#207eff" : "#4b5563",
                transition: "all .25s ease",
              }}
              onMouseEnter={e => { if (filter !== cat) { e.currentTarget.style.borderColor = "#207eff44"; e.currentTarget.style.color = "#6b9eff"; } }}
              onMouseLeave={e => { if (filter !== cat) { e.currentTarget.style.borderColor = "#1f2937";   e.currentTarget.style.color = "#4b5563"; } }}
            >
              {cat}
            </button>
          ))}
        </div>
      )}

      {/* ── SERVICE GRID ──────────────────────────────────── */}
      <section style={{ position: "relative", padding: "48px 24px 80px", overflow: "hidden" }}>
        <HexGrid opacity={0.04} />
        <div style={{ position: "relative", zIndex: 2, maxWidth: "1200px", margin: "0 auto" }}>

          <SectionHeading label="CAPABILITIES" title="WHAT WE OFFER" accent="#207eff" />

          {filtered.length === 0 ? (
            <div style={{ textAlign: "center", padding: "60px 0", fontFamily: "'Share Tech Mono', monospace", fontSize: "11px", color: "#374151", letterSpacing: ".15em" }}>
              NO SERVICES FOUND
            </div>
          ) : (
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
              gap: "20px",
            }}>
              {filtered.map((service, i) => (
                <ServiceCard key={service.slug} service={service} delay={i * 80} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── CTA STRIP ─────────────────────────────────────── */}
      <section style={{ borderTop: "1px solid #0d1a2d", padding: "48px 24px", textAlign: "center" }}>
        <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: "10px", letterSpacing: ".4em", color: "#207eff55", marginBottom: "12px" }}>◆ READY TO PROCEED ◆</div>
        <h2 style={{ fontFamily: "'Orbitron', monospace", fontSize: "clamp(18px,3vw,28px)", fontWeight: 900, color: "#fff", textShadow: "0 0 16px #207eff44", marginBottom: "14px" }}>
          NEED A CUSTOM INVESTIGATION PLAN?
        </h2>
        <p style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: "15px", color: "#9ca3af", maxWidth: "480px", margin: "0 auto 28px", lineHeight: 1.65 }}>
          Our team will assess your case and recommend the right combination of services.
        </p>
        <a
          href="/contact"
          className="fs-glow-pulse"
          style={{
            display: "inline-flex", alignItems: "center", gap: "8px",
            padding: "13px 32px", borderRadius: "10px",
            background: "linear-gradient(135deg,#1450cc 0%,#0a3080 100%)",
            border: "1px solid #207eff88",
            color: "#fff",
            fontFamily: "'Orbitron', monospace",
            fontSize: "11px", fontWeight: 700, letterSpacing: ".12em",
            textDecoration: "none",
          }}
        >
          CONTACT US
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
            <line x1="5" y1="12" x2="19" y2="12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            <polyline points="13,6 19,12 13,18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </a>
      </section>

      {/* ── FOOTER LINE ───────────────────────────────────── */}
      <div style={{ padding: "18px 24px", textAlign: "center", fontFamily: "'Share Tech Mono', monospace", fontSize: "10px", color: "#374151", letterSpacing: ".12em", borderTop: "1px solid #0d1a2d" }}>
        © 2025 FORENSLEUTH &nbsp;·&nbsp; ALL EVIDENCE PRESERVED &nbsp;·&nbsp;
        <span style={{ color: "#207eff55" }}>FSL-SYS v4.2.1</span>
      </div>
    </main>
  );
}