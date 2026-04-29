"use client";

// ─────────────────────────────────────────────────────────────
//  FORENSLEUTH — Shared UI Primitives
//  Plain Tailwind compatible (no custom PostCSS required)
//  Fonts loaded inline via <style> @import
// ─────────────────────────────────────────────────────────────

export function ForensleuthStyles() {
  return (
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;600;700;900&family=Rajdhani:wght@400;500;600;700&family=Share+Tech+Mono&display=swap');

      *, *::before, *::after { box-sizing: border-box; }

      .fs-orbitron  { font-family: 'Orbitron', monospace !important; }
      .fs-rajdhani  { font-family: 'Rajdhani', sans-serif !important; }
      .fs-mono      { font-family: 'Share Tech Mono', monospace !important; }

      @keyframes fs-scanline {
        0%   { top: -2px; opacity: 1; }
        90%  { opacity: .9; }
        100% { top: 100%; opacity: 0; }
      }
      @keyframes fs-fadeSlideUp {
        from { opacity: 0; transform: translateY(24px); }
        to   { opacity: 1; transform: translateY(0); }
      }
      @keyframes fs-glowPulse {
        0%,100% { box-shadow: 0 0 10px #207eff44, 0 0 2px #207eff22; }
        50%     { box-shadow: 0 0 24px #207effaa, 0 0 6px #207eff55; }
      }
      @keyframes fs-glowPulseOr {
        0%,100% { box-shadow: 0 0 10px #fa533044, 0 0 2px #fa533022; }
        50%     { box-shadow: 0 0 24px #fa5330aa, 0 0 6px #fa533055; }
      }
      @keyframes fs-nodeFlicker {
        0%,100% { opacity: 1; }
        50%     { opacity: .5; }
      }
      @keyframes fs-blink {
        0%,100% { opacity: 1; }
        50%     { opacity: 0; }
      }

      .fs-fade-slide   { animation: fs-fadeSlideUp .55s ease both; }
      .fs-glow-pulse   { animation: fs-glowPulse 2.4s ease-in-out infinite; }
      .fs-glow-pulse-or{ animation: fs-glowPulseOr 2.4s ease-in-out infinite; }
      .fs-node-flicker { animation: fs-nodeFlicker 2s ease-in-out infinite; }

      .fs-accordion-body {
        overflow: hidden;
        transition: max-height .42s cubic-bezier(.4,0,.2,1), opacity .3s ease;
      }
    `}</style>
  );
}

// ── Hex Grid overlay ─────────────────────────────────────────
export function HexGrid({ opacity = 0.07 }) {
  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ opacity }}
    >
      <defs>
        <pattern id="fs-hex" x="0" y="0" width="56" height="48" patternUnits="userSpaceOnUse">
          <polygon
            points="28,2 52,14 52,34 28,46 4,34 4,14"
            fill="none" stroke="#207eff" strokeWidth="0.8"
          />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#fs-hex)" />
    </svg>
  );
}



// ── Cyber corner brackets ─────────────────────────────────────
export function CyberCorners({ color = "#207eff", size = 18, thick = 1.5 }) {
  const s = `${size}px`, t = `${thick}px`;
  const base = { position: "absolute", width: s, height: s, borderColor: color, borderStyle: "solid" };
  return (
    <>
      <span style={{ ...base, top: 0, left: 0, borderWidth: `${t} 0 0 ${t}` }} />
      <span style={{ ...base, top: 0, right: 0, borderWidth: `${t} ${t} 0 0` }} />
      <span style={{ ...base, bottom: 0, left: 0, borderWidth: `0 0 ${t} ${t}` }} />
      <span style={{ ...base, bottom: 0, right: 0, borderWidth: `0 ${t} ${t} 0` }} />
    </>
  );
}

// ── Section heading ───────────────────────────────────────────
export function SectionHeading({ label, title, accent = "#207eff" }) {
  return (
    <div style={{ marginBottom: "48px", textAlign: "center" }}>
      <div
        className="fs-mono"
        style={{ fontSize: "10px", letterSpacing: ".4em", marginBottom: "8px", color: `${accent}88` }}
      >
        ◆ {label} ◆
      </div>
      <h2
        className="fs-orbitron"
        style={{
          fontSize: "clamp(22px,4vw,36px)",
          fontWeight: 900,
          letterSpacing: ".06em",
          color: "#e8f4ff",
          textShadow: `0 0 18px ${accent}66`,
          margin: 0,
        }}
      >
        {title}
      </h2>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "16px", marginTop: "20px" }}>
        <div style={{ width: "80px", height: "1px", background: `linear-gradient(to right,transparent,${accent}55)` }} />
        <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: accent, boxShadow: `0 0 8px ${accent}` }} />
        <div style={{ width: "80px", height: "1px", background: `linear-gradient(to left,transparent,${accent}55)` }} />
      </div>
    </div>
  );
}

// ── Breadcrumb ────────────────────────────────────────────────
export function Breadcrumb({ crumbs }) {
  return (
    <nav
      className="fs-mono"
      style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "10px", color: "#4b5563", letterSpacing: ".12em", marginBottom: "24px" }}
    >
      {crumbs.map((c, i) => (
        <span key={i} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          {i > 0 && <span style={{ color: "#374151" }}>›</span>}
          {c.href
            ? <a href={c.href} style={{ color: "inherit", textDecoration: "none" }}
                onMouseEnter={e => e.target.style.color = "#207eff"}
                onMouseLeave={e => e.target.style.color = "#4b5563"}>{c.label}</a>
            : <span style={{ color: "#207eff" }}>{c.label}</span>}
        </span>
      ))}
    </nav>
  );
}