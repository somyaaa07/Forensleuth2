"use client";

import { useState, useEffect, useRef } from "react";
import ServicesSection from "../../../components/service/ServiceSection";
import Accordion from "../../../components/service/Accordion";
import Timeline from "../../../components/service/Timeline";
import { HexGrid, SectionHeading, CyberCorners, ForensleuthStyles } from "../../../components/service/ui";

// ─────────────────────────────────────────────────────────────
//  ServiceDetailClient — full service detail page
//  Plain Tailwind compatible (no custom PostCSS required)
//  Images added to hero, overview, features and CTA sections
// ─────────────────────────────────────────────────────────────

// Curated Unsplash images per slug
const SERVICE_IMAGES = {
  "digital-forensics":       "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1400&q=75",
  "cyber-incident-response": "https://images.unsplash.com/photo-1614064641938-3bbee52942c7?w=1400&q=75",
  "mobile-forensics":        "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=1400&q=75",
  "network-forensics":       "https://images.unsplash.com/photo-1545987796-200677ee1011?w=1400&q=75",
  "osint-investigations":    "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=1400&q=75",
  "forensic-training":       "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=1400&q=75",
};

const OVERVIEW_IMAGES = {
  "digital-forensics":       "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=700&q=80",
  "cyber-incident-response": "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=700&q=80",
  "mobile-forensics":        "https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=700&q=80",
  "network-forensics":       "https://images.unsplash.com/photo-1551808525-51a94da548ce?w=700&q=80",
  "osint-investigations":    "https://images.unsplash.com/photo-1551434678-e076c223a692?w=700&q=80",
  "forensic-training":       "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=700&q=80",
};

const DEFAULT_BG   = "https://images.unsplash.com/photo-1510511459019-5dda7724fd87?w=1400&q=70";
const DEFAULT_OV   = "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=700&q=80";

// ── Reveal on scroll ─────────────────────────────────────────
function useReveal(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}

function Reveal({ children, delay = 0 }) {
  const [ref, visible] = useReveal();
  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(28px)",
        transition: `opacity .6s ease ${delay}ms, transform .6s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

// ── Feature card ─────────────────────────────────────────────
function FeatureCard({ text, index, accent }) {
  const [hov, setHov] = useState(false);
  const icons = ["◈", "◉", "◎", "◆", "▸", "⬡", "◐", "◑"];
  return (
    <div
      style={{
        position: "relative",
        background: "#0a0f1c",
        borderRadius: "12px",
        padding: "18px",
        display: "flex",
        gap: "14px",
        alignItems: "flex-start",
        cursor: "default",
        border: `1px solid ${hov ? `${accent}66` : "#1f2937"}`,
        boxShadow: hov ? `0 0 22px ${accent}22` : "none",
        transform: hov ? "translateY(-3px)" : "translateY(0)",
        transition: "all .3s ease",
      }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
    >
      <CyberCorners color={hov ? accent : `${accent}22`} size={12} thick={1} />
      <div
        style={{
          display: "flex", alignItems: "center", justifyContent: "center",
          flexShrink: 0, width: "36px", height: "36px", borderRadius: "8px",
          background: `${accent}18`,
          border: `1px solid ${accent}33`,
          color: accent,
          fontFamily: "'Share Tech Mono', monospace",
          fontSize: "16px",
          boxShadow: hov ? `0 0 12px ${accent}44` : "none",
          transition: "box-shadow .3s ease",
        }}
      >
        {icons[index % icons.length]}
      </div>
      <p
        style={{
          paddingTop: "2px", fontSize: "13px", lineHeight: 1.65,
          color: "#d1d5db",
          fontFamily: "'Rajdhani', sans-serif",
          margin: 0,
        }}
      >
        {text}
      </p>
    </div>
  );
}

// ── Main component ───────────────────────────────────────────
export default function ServiceDetailClient({ service }) {
  const accent  = service.accentColor || "#207eff";
  const isOrange = accent === "#fa5330";
  const heroBg   = SERVICE_IMAGES[service.slug]   || DEFAULT_BG;
  const ovImage  = OVERVIEW_IMAGES[service.slug]  || DEFAULT_OV;

  const allSlugs = [
    "digital-forensics", "cyber-incident-response", "mobile-forensics",
    "network-forensics",  "osint-investigations",    "forensic-training",
  ];
  const currentIdx = allSlugs.indexOf(service.slug);
  const prevSlug   = currentIdx > 0                   ? allSlugs[currentIdx - 1] : null;
  const nextSlug   = currentIdx < allSlugs.length - 1 ? allSlugs[currentIdx + 1] : null;

  return (
    <main
      style={{ minHeight: "100vh", background: "#03060d", color: "#e2e8f0", fontFamily: "'Rajdhani', sans-serif" }}
    >
      <ForensleuthStyles />

      {/* ── HERO ──────────────────────────────────────────── */}
      <ServicesSection
        label="FORENSLEUTH SERVICES"
        title={service.title.toUpperCase()}
        subtitle={service.shortDescription}
        bgImage={heroBg}
        breadcrumbs={[
          { label: "HOME",     href: "/" },
          { label: "SERVICES", href: "/services" },
          { label: service.title.toUpperCase() },
        ]}
        accent={accent}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "12px", marginTop: "24px" }}>
          <div
            style={{
              padding: "5px 16px", borderRadius: "999px",
              border: `1px solid ${accent}55`,
              background: `${accent}15`,
              color: `${accent}cc`,
              fontFamily: "'Share Tech Mono', monospace",
              fontSize: "10px", letterSpacing: ".1em",
            }}
          >
            SVC-{String(service.id).padStart(3, "0")} &nbsp;·&nbsp; {service.category || "FORENSIC SERVICE"}
          </div>
          <div style={{
            width: "8px", height: "8px", borderRadius: "50%",
            background: "#39d353", boxShadow: "0 0 8px #39d35388",
            animation: "fs-nodeFlicker 2s infinite",
          }} />
          <span
            style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: "9px", color: "#4b5563", letterSpacing: ".1em" }}
          >
            ACTIVE SERVICE
          </span>
        </div>
      </ServicesSection>

      {/* ── OVERVIEW ──────────────────────────────────────── */}
      <section style={{ maxWidth: "1280px", margin: "0 auto", padding: "80px 24px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: "48px", alignItems: "start" }}>

          {/* Text side */}
          <Reveal>
            <div>
              <div
                style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: "10px", letterSpacing: ".4em", marginBottom: "12px", color: `${accent}77` }}
              >
                ◆ OVERVIEW
              </div>
              <h2
                style={{ fontFamily: "'Orbitron', monospace", fontSize: "18px", fontWeight: 700, letterSpacing: ".06em", color: "#fff", marginBottom: "16px" }}
              >
                ABOUT THIS SERVICE
              </h2>
              <p style={{ fontSize: "15px", lineHeight: 1.75, color: "#9ca3af", marginBottom: "28px" }}>
                {service.fullDescription}
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
                {["Features", "Breakdown", "Process"].map((label) => (
                  <a
                    key={label}
                    href={`#${label.toLowerCase()}`}
                    style={{
                      padding: "8px 16px", borderRadius: "8px",
                      border: "1px solid #1f2937", color: "#4a6080",
                      fontFamily: "'Share Tech Mono', monospace",
                      fontSize: "10px", letterSpacing: ".12em",
                      textDecoration: "none",
                      transition: "all .3s ease",
                    }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = `${accent}77`; e.currentTarget.style.color = accent; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = "#1f2937";      e.currentTarget.style.color = "#4a6080"; }}
                  >
                    {label.toUpperCase()} ↓
                  </a>
                ))}
              </div>
            </div>
          </Reveal>

          {/* Right panel — image + highlights */}
          <Reveal delay={120}>
            <div
              style={{
                position: "relative", borderRadius: "12px", overflow: "hidden",
                border: `1px solid ${accent}33`,
                boxShadow: `0 0 30px ${accent}18`,
              }}
            >
              {/* Overview image */}
              <div style={{ position: "relative", height: "200px", overflow: "hidden" }}>
                <img
                  src={ovImage}
                  alt={service.title}
                  style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.6 }}
                />
                <div style={{
                  position: "absolute", inset: 0,
                  background: `linear-gradient(to bottom, transparent 30%, #0a0f1c 100%)`,
                }} />
                <div style={{
                  position: "absolute", top: 0, left: 0, right: 0, height: "2px",
                  background: `linear-gradient(90deg,transparent,${accent},transparent)`,
                }} />
              </div>

              <div style={{ background: "#0a0f1c", padding: "20px" }}>
                <div
                  style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: "10px", letterSpacing: ".15em", marginBottom: "14px", color: `${accent}88` }}
                >
                  KEY HIGHLIGHTS
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                  {service.features.map((f, i) => (
                    <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}>
                      <div
                        style={{
                          width: "20px", height: "20px", borderRadius: "4px",
                          display: "flex", alignItems: "center", justifyContent: "center",
                          flexShrink: 0, marginTop: "1px",
                          background: `${accent}22`,
                          border: `1px solid ${accent}44`,
                        }}
                      >
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none">
                          <polyline points="4,12 10,18 20,6" stroke={accent} strokeWidth="3" strokeLinecap="round" />
                        </svg>
                      </div>
                      <span style={{ fontSize: "13px", lineHeight: 1.6, color: "#d1d5db", fontFamily: "'Rajdhani', sans-serif" }}>{f}</span>
                    </div>
                  ))}
                </div>
                <div style={{ display: "flex", gap: "20px", paddingTop: "16px", marginTop: "16px", borderTop: "1px solid #1f2937" }}>
                  <div>
                    <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: "8px", color: "#374151", letterSpacing: ".12em" }}>STATUS</div>
                    <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: "10px", color: "#34d399", marginTop: "2px" }}>OPERATIONAL</div>
                  </div>
                  <div>
                    <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: "8px", color: "#374151", letterSpacing: ".12em" }}>FEATURES</div>
                    <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: "10px", color: accent, marginTop: "2px" }}>{service.features.length} CAPABILITIES</div>
                  </div>
                  <div>
                    <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: "8px", color: "#374151", letterSpacing: ".12em" }}>RESPONSE</div>
                    <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: "10px", color: "#fa5330", marginTop: "2px" }}>24/7 READY</div>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── FEATURES GRID ─────────────────────────────────── */}
      <section
        id="features"
        style={{
          position: "relative", padding: "64px 24px", overflow: "hidden",
          background: "linear-gradient(180deg,#03060d 0%,#060d1a 50%,#03060d 100%)",
        }}
      >
        <HexGrid opacity={0.05} />
        <div style={{ position: "relative", maxWidth: "1280px", margin: "0 auto", zIndex: 2 }}>
          <Reveal><SectionHeading label="CAPABILITIES" title="SERVICE FEATURES" accent={accent} /></Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", gap: "14px" }}>
            {service.features.map((f, i) => (
              <Reveal key={i} delay={i * 60}><FeatureCard text={f} index={i} accent={accent} /></Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── DETAILED BREAKDOWN ────────────────────────────── */}
      <section id="breakdown" style={{ maxWidth: "1280px", margin: "0 auto", padding: "80px 24px" }}>
        <Reveal><SectionHeading label="IN-DEPTH" title="DETAILED BREAKDOWN" accent={accent} /></Reveal>
        <Reveal delay={80}><Accordion sections={service.detailedSections} accent={accent} /></Reveal>
      </section>

    

      {/* ── CTA ───────────────────────────────────────────── */}
      <section style={{ position: "relative", padding: "80px 24px", overflow: "hidden" }}>
        {/* CTA background image */}
        <img
          src={heroBg}
          alt=""
          aria-hidden="true"
          style={{
            position: "absolute", inset: 0,
            width: "100%", height: "100%",
            objectFit: "cover", opacity: 0.05,
            pointerEvents: "none",
          }}
        />
        <div style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          background: "radial-gradient(ellipse 70% 60% at 50% 50%,#0a1530 0%,transparent 70%)",
        }} />

        <div style={{ position: "relative", maxWidth: "1280px", margin: "0 auto", textAlign: "center", zIndex: 2 }}>
          <Reveal>
            <div
              style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: "10px", letterSpacing: ".4em", marginBottom: "12px", color: `${accent}66` }}
            >
              ◆ TAKE ACTION ◆
            </div>
            <h2
              style={{
                fontFamily: "'Orbitron', monospace",
                fontSize: "clamp(22px,4vw,36px)",
                fontWeight: 900,
                color: "#fff",
                textShadow: `0 0 20px ${accent}55`,
                marginBottom: "16px",
              }}
            >
              BEGIN YOUR INVESTIGATION
            </h2>
            <p style={{ maxWidth: "560px", margin: "0 auto 40px", fontSize: "16px", lineHeight: 1.7, color: "#9ca3af" }}>
              Our specialists are ready to assist with {service.title.toLowerCase()} cases.
              Contact us now for a confidential case assessment.
            </p>

            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "14px", marginBottom: "48px" }}>
              <a
                href="/contact"
                className={isOrange ? "fs-glow-pulse-or" : "fs-glow-pulse"}
                style={{
                  padding: "14px 32px", borderRadius: "10px",
                  background: isOrange
                    ? "linear-gradient(135deg,#aa2a10 0%,#7a1a08 100%)"
                    : "linear-gradient(135deg,#1450cc 0%,#0a3080 100%)",
                  border: `1px solid ${accent}88`,
                  color: "#fff",
                  fontFamily: "'Orbitron', monospace",
                  fontSize: "12px", fontWeight: 700, letterSpacing: ".12em",
                  textDecoration: "none",
                }}
              >
                CONTACT US
              </a>
              <a
                href="/contact?type=consultation"
                style={{
                  padding: "14px 32px", borderRadius: "10px",
                  background: "transparent",
                  border: `1px solid ${accent}55`,
                  color: `${accent}cc`,
                  fontFamily: "'Orbitron', monospace",
                  fontSize: "12px", fontWeight: 700, letterSpacing: ".12em",
                  textDecoration: "none",
                  transition: "all .3s ease",
                }}
                onMouseEnter={e => { e.currentTarget.style.boxShadow = `0 0 20px ${accent}33`; e.currentTarget.style.borderColor = accent; e.currentTarget.style.color = accent; }}
                onMouseLeave={e => { e.currentTarget.style.boxShadow = "none";                  e.currentTarget.style.borderColor = `${accent}55`;    e.currentTarget.style.color = `${accent}cc`; }}
              >
                REQUEST CONSULTATION
              </a>
            </div>
          </Reveal>

          {/* Prev / All / Next nav */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "16px", paddingTop: "32px", borderTop: "1px solid #0d1a2d" }}>
            {prevSlug ? (
              <a href={`/services/${prevSlug}`} style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: "10px", color: "#4b5563", letterSpacing: ".12em", textDecoration: "none" }}
                onMouseEnter={e => e.currentTarget.style.color = "#207eff"}
                onMouseLeave={e => e.currentTarget.style.color = "#4b5563"}>← PREV SERVICE</a>
            ) : <span />}
            <a href="/services" style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: "10px", color: "#4b5563", letterSpacing: ".12em", textDecoration: "none" }}
              onMouseEnter={e => e.currentTarget.style.color = "#207eff"}
              onMouseLeave={e => e.currentTarget.style.color = "#4b5563"}>ALL SERVICES</a>
            {nextSlug ? (
              <a href={`/services/${nextSlug}`} style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: "10px", color: "#4b5563", letterSpacing: ".12em", textDecoration: "none" }}
                onMouseEnter={e => e.currentTarget.style.color = "#207eff"}
                onMouseLeave={e => e.currentTarget.style.color = "#4b5563"}>NEXT SERVICE →</a>
            ) : <span />}
          </div>
        </div>
      </section>

      {/* ── FOOTER LINE ───────────────────────────────────── */}
      <div
        style={{
          padding: "20px 24px", textAlign: "center",
          fontFamily: "'Share Tech Mono', monospace",
          fontSize: "10px", color: "#374151", letterSpacing: ".12em",
          borderTop: "1px solid #0d1a2d",
        }}
      >
        © 2025 FORENSLEUTH &nbsp;·&nbsp; ALL EVIDENCE PRESERVED &nbsp;·&nbsp;
        <span style={{ color: "#207eff55" }}>FSL-SYS v4.2.1</span>
      </div>
    </main>
  );
}