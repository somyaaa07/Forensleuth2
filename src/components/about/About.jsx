"use client";
import { useEffect, useRef, useState } from "react";
import {
  Search, GraduationCap, BookOpen, FlaskConical, Globe,
  Microscope, Zap, Target, Shield, ArrowRight, Menu, X,
  Award, Users, Mail, MapPin, Phone, Star,
  CheckCircle2, Quote, ChevronRight, Fingerprint, Brain, Cpu,
  Activity,
} from "lucide-react";

/* ── Google Fonts ─────────────────────────────────────────── */
function FontLoader() {
  useEffect(() => {
    const l = document.createElement("link");
    l.rel = "stylesheet";
    l.href =
      "https://fonts.googleapis.com/css2?family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap";
    document.head.appendChild(l);
    return () => { try { document.head.removeChild(l); } catch (_) {} };
  }, []);
  return null;
}

/* ── Intersection fade hook ───────────────────────────────── */
function useFade(threshold = 0.1) {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const o = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVis(true); o.disconnect(); } },
      { threshold }
    );
    if (ref.current) o.observe(ref.current);
    return () => o.disconnect();
  }, [threshold]);
  return [ref, vis];
}

/* ── Animated counter ─────────────────────────────────────── */
function Counter({ end, suffix = "" }) {
  const [n, setN] = useState(0);
  const ref = useRef(null);
  useEffect(() => {
    const o = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        let v = 0;
        const step = Math.max(1, Math.ceil(end / 55));
        const t = setInterval(() => {
          v += step;
          if (v >= end) { setN(end); clearInterval(t); }
          else setN(v);
        }, 22);
        o.disconnect();
      }
    }, { threshold: 0.4 });
    if (ref.current) o.observe(ref.current);
    return () => o.disconnect();
  }, [end]);
  return <span ref={ref}>{n}{suffix}</span>;
}

/* ── Service Data ─────────────────────────────────────────── */
const serviceData = [
  {
    Icon: Search,
    tag: "Core Service",
    number: "01",
    title: "Investigation Services",
    tagline: "Forensic truth, legally delivered",
    desc: "Scientific and cyber-forensic investigation services for individuals, legal professionals, corporates, and institutions.",
    items: [
      "Handwriting & Signature Verification",
      "Questioned Document Examination",
      "Digital Forensics & Device Analysis",
      "CSIRT – Cyber Security Incident Response",
      "Cyber Forensic Reports for Legal Use",
    ],
    accent: "#207eff",
    lightBg: "#EBF3FF",
    img: "https://images.unsplash.com/photo-1614064641938-3bbee52942c7?w=700&q=75",
  },
  {
    Icon: GraduationCap,
    tag: "Consultancy",
    number: "02",
    title: "Academic Consultancy",
    tagline: "Guiding research from start to submission",
    desc: "Expert guidance for students, researchers, and academic institutions at every stage of their academic journey.",
    items: [
      "Dissertation & Thesis Assistance",
      "Research Paper Writing Support",
      "Data Analysis (SPSS, Excel, Qualitative)",
      "Literature Review & Referencing Help",
      "Plagiarism Check & Technical Editing",
    ],
    accent: "#1a6fe0",
    lightBg: "#E3EFFF",
    img: "https://images.unsplash.com/photo-1543269865-cbf427effbad?w=700&q=75",
  },
  {
    Icon: BookOpen,
    tag: "Academics",
    number: "03",
    title: "Academic Services",
    tagline: "Theory meets hands-on practice",
    desc: "Structured, skill-based academic offerings blending theory with practical application for forensic education.",
    items: [
      "Short-Term Certification Courses",
      "Workshops & Hands-on Training",
      "Webinars & Expert Lectures",
      "Curriculum Support for Institutions",
      "Internship & Project-Based Learning",
    ],
    accent: "#207eff",
    lightBg: "#EBF3FF",
    img: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=700&q=75",
  },
  {
    Icon: FlaskConical,
    tag: "Kits & Tools",
    number: "04",
    title: "Kits & Educational Tools",
    tagline: "Make forensics tangible and interactive",
    desc: "Specially curated forensic kits making forensic science interactive, practical, and accessible for all learners.",
    items: [
      "DIY Forensic Science Kits",
      "Customized Workshop Kits",
      "Thematic Kits (Fingerprinting, Crime Scene)",
      "Institutional Bulk Orders",
    ],
    accent: "#1a6fe0",
    lightBg: "#E3EFFF",
    img: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=700&q=75",
  },
  {
    Icon: Globe,
    tag: "Outreach",
    number: "05",
    title: "Empowerment Initiatives",
    tagline: "Forensic awareness for every community",
    desc: "Spreading forensic awareness through inclusive learning, community programs, and educational outreach.",
    items: [
      "School & College Outreach Programs",
      "NGO & Community Collaborations",
      "Forensic Awareness Campaigns",
      "Workshops for Underserved Groups",
    ],
    accent: "#207eff",
    lightBg: "#EBF3FF",
    img: "https://images.unsplash.com/photo-1529390079861-591de354faf5?w=700&q=75",
  },
];

/* ── Service Card ─────────────────────────────────────────── */
function ServiceCard({ service, delay = 0, featured = false }) {
  const { Icon, tag, number, title, tagline, desc, items, accent, lightBg, img } = service;
  const [ref, vis] = useFade();
  const [hov, setHov] = useState(false);

  if (featured) {
    return (
      <div
        ref={ref}
        onMouseEnter={() => setHov(true)}
        onMouseLeave={() => setHov(false)}
        style={{
          opacity: vis ? 1 : 0,
          transform: vis ? "translateY(0)" : "translateY(28px)",
          transition: `all .5s ease ${delay}ms`,
          gridColumn: "1 / -1",
          background: "#FFFFFF",
          borderRadius: 20,
          border: `1.5px solid ${hov ? accent : "rgba(32,126,255,.15)"}`,
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          overflow: "hidden",
          boxShadow: hov ? `0 20px 48px rgba(32,126,255,.14)` : "0 4px 20px rgba(0,0,0,.05)",
          cursor: "default",
        }}
      >
        <div style={{ position: "relative", overflow: "hidden", minHeight: 320 }}>
          <img
            src={img}
            alt={title}
            style={{
              width: "100%", height: "100%", objectFit: "cover",
              transform: hov ? "scale(1.05)" : "scale(1)",
              transition: "transform .65s cubic-bezier(.4,0,.2,1)",
            }}
          />
          <div style={{
            position: "absolute", inset: 0,
            background: `linear-gradient(135deg, rgba(32,126,255,.7) 0%, rgba(26,111,224,.5) 100%)`,
            mixBlendMode: "multiply",
          }} />
          <div style={{ position: "absolute", inset: 0, padding: "2rem", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <span style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: ".6rem", letterSpacing: ".18em", textTransform: "uppercase",
                color: "rgba(255,255,255,.75)", background: "rgba(255,255,255,.12)",
                border: "1px solid rgba(255,255,255,.2)",
                borderRadius: 6, padding: "5px 12px",
              }}>{tag}</span>
              <span style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "3rem", fontWeight: 500,
                color: "rgba(255,255,255,.15)", lineHeight: 1,
              }}>{number}</span>
            </div>
            <div>
              <div style={{
                width: 48, height: 48, borderRadius: 14,
                background: "rgba(255,255,255,.15)", backdropFilter: "blur(8px)",
                border: "1px solid rgba(255,255,255,.25)",
                display: "flex", alignItems: "center", justifyContent: "center",
                marginBottom: "1rem",
              }}>
                <Icon size={22} color="#fff" strokeWidth={1.6} />
              </div>
              <h3 style={{
                fontFamily: "'Libre Baskerville', serif",
                fontSize: "1.7rem", fontWeight: 700,
                color: "#ffffff", lineHeight: 1.2, margin: "0 0 .4rem",
              }}>{title}</h3>
              <p style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: ".82rem", color: "rgba(255,255,255,.7)", margin: 0,
              }}>{tagline}</p>
            </div>
          </div>
        </div>
        <div style={{ padding: "2.2rem 2.2rem 2rem", display: "flex", flexDirection: "column", gap: "1.2rem" }}>
          <p style={{
            fontFamily: "'Inter', sans-serif", fontWeight: 300,
            fontSize: ".9rem", color: "#555", lineHeight: 1.8, margin: 0,
          }}>{desc}</p>
          <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: ".55rem" }}>
            {items.map((item, i) => (
              <li key={i} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{
                  width: 22, height: 22, borderRadius: 6,
                  background: lightBg, border: `1px solid rgba(32,126,255,.2)`,
                  display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
                }}>
                  <CheckCircle2 size={11} color={accent} strokeWidth={2.5} />
                </div>
                <span style={{ fontFamily: "'Inter', sans-serif", fontSize: ".83rem", color: "#444", lineHeight: 1.5 }}>
                  {item}
                </span>
              </li>
            ))}
          </ul>
          <div style={{ marginTop: "auto", paddingTop: ".8rem" }}>
            <button
              style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                fontFamily: "'Inter', sans-serif",
                fontSize: ".82rem", fontWeight: 600,
                color: "#fff", background: accent,
                border: "none", borderRadius: 10,
                padding: "11px 22px", cursor: "pointer",
                transition: "all .3s",
                boxShadow: `0 4px 16px rgba(32,126,255,.35)`,
              }}
              onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-1px)"; e.currentTarget.style.boxShadow = `0 8px 24px rgba(32,126,255,.45)`; }}
              onMouseLeave={e => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = `0 4px 16px rgba(32,126,255,.35)`; }}
            >
              Learn More <ArrowRight size={14} strokeWidth={2.5} />
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        opacity: vis ? 1 : 0,
        transform: vis ? "translateY(0)" : "translateY(28px)",
        transition: `all .5s ease ${delay}ms`,
        background: "#FFFFFF",
        borderRadius: 20,
        border: `1.5px solid ${hov ? accent : "rgba(32,126,255,.1)"}`,
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        boxShadow: hov ? `0 16px 40px rgba(32,126,255,.12)` : "0 2px 12px rgba(0,0,0,.04)",
        cursor: "default",
      }}
    >
      <div style={{
        padding: "1.3rem 1.6rem .9rem",
        borderBottom: "1px solid rgba(32,126,255,.07)",
        display: "flex", justifyContent: "space-between", alignItems: "center",
      }}>
        <span style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: ".58rem", letterSpacing: ".15em", textTransform: "uppercase",
          color: accent, background: lightBg,
          border: `1px solid rgba(32,126,255,.18)`,
          borderRadius: 6, padding: "4px 10px",
        }}>{tag}</span>
        <span style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: "1.5rem", fontWeight: 500, color: "rgba(32,126,255,.12)",
        }}>{number}</span>
      </div>
      <div style={{ position: "relative", height: 170, overflow: "hidden", flexShrink: 0 }}>
        <img
          src={img}
          alt={title}
          style={{
            width: "100%", height: "100%", objectFit: "cover",
            transform: hov ? "scale(1.06)" : "scale(1)",
            transition: "transform .65s cubic-bezier(.4,0,.2,1)",
            filter: "brightness(.96)",
          }}
        />
        <div style={{
          position: "absolute", inset: 0,
          background: hov
            ? `linear-gradient(to bottom, transparent 0%, rgba(32,126,255,.18) 100%)`
            : `linear-gradient(to bottom, transparent 40%, rgba(0,0,0,.25) 100%)`,
          transition: "all .5s",
        }} />
        <div style={{
          position: "absolute", bottom: -20, left: 20,
          width: 44, height: 44, borderRadius: 12,
          background: hov ? accent : "#fff",
          border: `1.5px solid ${hov ? "transparent" : "rgba(32,126,255,.2)"}`,
          display: "flex", alignItems: "center", justifyContent: "center",
          boxShadow: `0 4px 16px rgba(32,126,255,.2)`,
          transition: "all .4s", zIndex: 2,
        }}>
          <Icon size={18} color={hov ? "#fff" : accent} strokeWidth={1.7} />
        </div>
      </div>
      <div style={{
        padding: "2rem 1.6rem 1.6rem",
        flex: 1, display: "flex", flexDirection: "column", gap: ".85rem",
      }}>
        <div>
          <h3 style={{
            fontFamily: "'Libre Baskerville', serif",
            fontSize: "1.05rem", fontWeight: 700,
            color: "#111", lineHeight: 1.25, margin: "0 0 .3rem",
          }}>{title}</h3>
          <p style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: ".75rem", fontWeight: 500, color: accent, margin: 0,
          }}>{tagline}</p>
        </div>
        <p style={{
          fontFamily: "'Inter', sans-serif", fontWeight: 300,
          fontSize: ".82rem", color: "#666", lineHeight: 1.75, margin: 0,
        }}>{desc}</p>
        <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: ".4rem" }}>
          {items.map((item, i) => (
            <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: 8 }}>
              <div style={{
                width: 18, height: 18, borderRadius: 5,
                background: lightBg, flexShrink: 0, marginTop: 1,
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <CheckCircle2 size={10} color={accent} strokeWidth={2.5} />
              </div>
              <span style={{ fontFamily: "'Inter', sans-serif", fontSize: ".78rem", color: "#555", lineHeight: 1.5 }}>
                {item}
              </span>
            </li>
          ))}
        </ul>
        <div style={{ marginTop: "auto", paddingTop: ".5rem" }}>
          <button
            style={{
              display: "inline-flex", alignItems: "center", gap: 6,
              fontFamily: "'Inter', sans-serif",
              fontSize: ".78rem", fontWeight: 600,
              color: accent, background: lightBg,
              border: `1px solid rgba(32,126,255,.25)`,
              borderRadius: 8, padding: "9px 18px",
              cursor: "pointer", transition: "all .3s",
            }}
            onMouseEnter={e => { e.currentTarget.style.background = accent; e.currentTarget.style.color = "#fff"; e.currentTarget.style.borderColor = accent; }}
            onMouseLeave={e => { e.currentTarget.style.background = lightBg; e.currentTarget.style.color = accent; e.currentTarget.style.borderColor = "rgba(32,126,255,.25)"; }}
          >
            Learn More <ArrowRight size={12} strokeWidth={2.5} />
          </button>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════ */
/* ── MAIN PAGE ────────────────────────────────────────────── */
/* ═══════════════════════════════════════════════════════════ */
export default function AboutPage() {
  const [scrollY, setScrollY] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const h = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);

  const [missionRef, missionVis] = useFade();
  const [whyRef, whyVis] = useFade();
  const [ctaRef, ctaVis] = useFade();

  const BLUE = "#207eff";
  const BLUE_DARK = "#1a6fe0";
  const BLUE_LIGHT = "#EBF3FF";

  return (
    <>
      <FontLoader />

      <style>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }

        html, body, #__next, [data-nextjs-scroll-focus-boundary], main {
          background: #ffffff !important;
        }

        body { color: #111; overflow-x: hidden; min-height: 100vh; }

        ::-webkit-scrollbar { width: 5px; }
        ::-webkit-scrollbar-track  { background: #f0f4ff; }
        ::-webkit-scrollbar-thumb  { background: #207eff; border-radius: 10px; }

        @keyframes fadeUp    { from { opacity:0; transform:translateY(32px); } to { opacity:1; transform:translateY(0); } }
        @keyframes shimmerB  { 0%{ background-position:-300% center; } 100%{ background-position:300% center; } }
        @keyframes floatOrb  { 0%,100%{ transform:translateY(0); } 50%{ transform:translateY(-14px); } }
        @keyframes floatOrb2 { 0%,100%{ transform:translateY(0); } 50%{ transform:translateY(-10px); } }
        @keyframes pulse     { 0%,100%{ opacity:.6; transform:scale(1); } 50%{ opacity:1; transform:scale(1.04); } }
        @keyframes slideDown { from{ opacity:0; transform:translateY(-8px); } to{ opacity:1; transform:translateY(0); } }

        .h-badge { animation: fadeUp .9s ease .1s  both; }
        .h-line1 { animation: fadeUp .9s ease .25s both; }
        .h-line2 { animation: fadeUp .9s ease .4s  both; }
        .h-sub   { animation: fadeUp .9s ease .55s both; }
        .h-btns  { animation: fadeUp .9s ease .7s  both; }
        .h-strip { animation: fadeUp .9s ease .85s both; }
        .h-card  { animation: slideDown .9s ease 1s both; }

        .eyebrow {
          font-family: 'JetBrains Mono', monospace;
          font-size: .6rem; letter-spacing: .2em; text-transform: uppercase;
          color: #207eff; display: inline-flex; align-items: center; gap: 10px;
        }
        .eyebrow::before, .eyebrow::after {
          content:''; display:block; width:24px; height:1.5px; background:#207eff;
          border-radius:2px;
        }

        .eyebrow-light {
          font-family: 'JetBrains Mono', monospace;
          font-size: .6rem; letter-spacing: .2em; text-transform: uppercase;
          color: rgba(255,255,255,.65); display: inline-flex; align-items: center; gap: 10px;
        }
        .eyebrow-light::before, .eyebrow-light::after {
          content:''; display:block; width:20px; height:1.5px; background:rgba(255,255,255,.4);
          border-radius:2px;
        }

        .btn-blue {
          font-family:'Inter',sans-serif; font-size:.9rem; font-weight:600;
          background:#207eff; color:#ffffff;
          border:none; border-radius:10px; padding:13px 28px;
          cursor:pointer; transition:all .3s; letter-spacing:.02em;
          display:inline-flex; align-items:center; gap:8px;
          box-shadow: 0 4px 18px rgba(32,126,255,.35);
        }
        .btn-blue:hover { background:#1a6fe0; transform:translateY(-2px); box-shadow:0 10px 28px rgba(32,126,255,.45); }

        .btn-ghost {
          font-family:'Inter',sans-serif; font-size:.9rem; font-weight:500;
          background:transparent; color:#207eff;
          border:1.5px solid rgba(32,126,255,.35); border-radius:10px; padding:13px 28px;
          cursor:pointer; transition:all .3s; letter-spacing:.02em;
          display:inline-flex; align-items:center; gap:8px;
        }
        .btn-ghost:hover { border-color:#207eff; background:#EBF3FF; transform:translateY(-2px); }

        .btn-hero-primary {
          font-family:'Inter',sans-serif; font-size:.85rem; font-weight:600;
          background:#207eff; color:#ffffff;
          border:none; border-radius:10px; padding:13px 26px;
          cursor:pointer; transition:all .3s; letter-spacing:.02em;
          display:inline-flex; align-items:center; gap:8px;
          box-shadow: 0 4px 20px rgba(32,126,255,.4);
        }
        .btn-hero-primary:hover { background:#1a6fe0; transform:translateY(-2px); box-shadow:0 10px 30px rgba(32,126,255,.5); }

        .btn-hero-ghost {
          font-family:'Inter',sans-serif; font-size:.85rem; font-weight:500;
          background:rgba(255,255,255,.08); color:#fff;
          border:1.5px solid rgba(255,255,255,.28); border-radius:10px; padding:13px 26px;
          cursor:pointer; transition:all .3s; letter-spacing:.02em;
          display:inline-flex; align-items:center; gap:8px;
          backdrop-filter: blur(8px);
        }
        .btn-hero-ghost:hover { background:rgba(255,255,255,.16); border-color:rgba(255,255,255,.55); transform:translateY(-2px); }

        .nl {
          font-family:'Inter',sans-serif; font-size:.78rem; font-weight:400;
          color:rgba(0,0,0,.45); text-decoration:none;
          letter-spacing:.06em; text-transform:uppercase; transition:color .3s;
        }
        .nl:hover { color:#207eff; }
        .nl.act   { color:#207eff; font-weight:600; }

        @media(max-width:1024px){
          .mis-grid  { grid-template-columns:1fr !important; }
          .sv-grid   { grid-template-columns:repeat(2,1fr) !important; }
          .why-grid  { grid-template-columns:repeat(2,1fr) !important; }
        }
        @media(max-width:768px){
          .sv-grid         { grid-template-columns:1fr !important; }
          .why-grid        { grid-template-columns:1fr !important; }
          .cta-inner       { grid-template-columns:1fr !important; gap:2.5rem !important; }
          .hero-strip      { flex-wrap:wrap !important; }
          .hero-float-card { display:none !important; }
          .featured-inner  { grid-template-columns:1fr !important; }
          .hero-scroll-hint{ display:none !important; }
        }
        @media(max-width:520px){
          .btns-row { flex-direction:column !important; align-items:flex-start; }
        }
      `}</style>

      <div style={{ background: "#ffffff", minHeight: "100vh", color: "#111" }}>

     
        <style>{`@media(max-width:768px){.mob-btn{display:flex!important;align-items:center;}}`}</style>

        {menuOpen && (
          <div style={{
            position: "fixed", top: 68, left: 0, right: 0, zIndex: 999,
            background: "rgba(255,255,255,.98)", backdropFilter: "blur(20px)",
            padding: "2rem max(1.5rem,5%)",
            display: "flex", flexDirection: "column", gap: "1.4rem",
            borderBottom: "1px solid rgba(32,126,255,.1)",
          }}>
            {navLinks.map(l => (
              <a key={l} href="#" className={`nl${l === "About" ? " act" : ""}`}
                onClick={() => setMenuOpen(false)}
                style={{ fontSize: "1rem" }}>{l}</a>
            ))}
            <button className="btn-blue" style={{ width: "fit-content", marginTop: ".5rem" }}>
              Get In Touch <ArrowRight size={14} />
            </button>
          </div>
        )}

        {/* ══ HERO — full-bleed image ════════════════════════════ */}
        <section style={{
          position: "relative",
          width: "100%",
          height: "100vh",
          minHeight: 640,
          overflow: "hidden",
        }}>
          {/* Full-bleed background image */}
          <img
            src="https://images.unsplash.com/photo-1614064641938-3bbee52942c7?w=1800&q=85"
            alt="Forensic laboratory"
            style={{
              position: "absolute", inset: 0,
              width: "100%", height: "100%",
              objectFit: "cover", objectPosition: "center",
            }}
          />

          {/* Dark gradient overlay — heavy on left for legibility */}
          <div style={{
            position: "absolute", inset: 0,
            background: "linear-gradient(105deg, rgba(4,8,20,.92) 0%, rgba(4,8,20,.75) 42%, rgba(4,8,20,.32) 72%, rgba(4,8,20,.08) 100%)",
          }} />

          {/* Blue brand tint */}
          <div style={{
            position: "absolute", inset: 0,
            background: "linear-gradient(135deg, rgba(32,126,255,.2) 0%, transparent 55%)",
          }} />

          {/* Dot grid texture */}
          <div style={{
            position: "absolute", inset: 0,
            backgroundImage: "radial-gradient(rgba(255,255,255,.055) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }} />

          {/* Floating orbs */}
          <div style={{
            position: "absolute", top: "8%", right: "10%",
            width: 420, height: 420, borderRadius: "50%",
            background: "radial-gradient(circle, rgba(32,126,255,.14) 0%, transparent 70%)",
            animation: "floatOrb 14s ease-in-out infinite",
            pointerEvents: "none",
          }} />
          <div style={{
            position: "absolute", bottom: "12%", right: "4%",
            width: 240, height: 240, borderRadius: "50%",
            background: "radial-gradient(circle, rgba(32,126,255,.09) 0%, transparent 70%)",
            animation: "floatOrb2 10s ease-in-out 2.5s infinite",
            pointerEvents: "none",
          }} />

          {/* Vertical accent line */}
          <div style={{
            position: "absolute", top: 0, left: "max(1.5rem, 8%)",
            width: 1, height: "100%",
            background: "linear-gradient(to bottom, transparent, rgba(32,126,255,.4) 28%, rgba(32,126,255,.4) 72%, transparent)",
            opacity: .5,
          }} />

          {/* ── Hero content ── */}
          <div style={{
            position: "relative", zIndex: 2,
            height: "100%",
            display: "flex", flexDirection: "column", justifyContent: "center",
            padding: "0 max(2rem, 8%)",
            paddingTop: 68,
          }}>

            {/* Eyebrow */}
            <div className="h-badge" style={{ marginBottom: "1.7rem" }}>
              <span className="eyebrow-light">About Forensleuth</span>
            </div>

            {/* Headline */}
            <h1 className="h-line1" style={{
              fontFamily: "'Libre Baskerville', serif",
              fontSize: "clamp(3rem, 9vw, 7rem)",
              fontWeight: 400, lineHeight: .95,
              color: "#fff", letterSpacing: "-.025em", margin: "0 0 .1em",
            }}>
              Where{" "}
              <em style={{
                fontStyle: "italic", fontWeight: 400,
                background: "linear-gradient(120deg, #5fa8ff, #207eff, #a0c8ff)",
                backgroundSize: "200% auto",
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                animation: "shimmerB 5s linear infinite",
              }}>Science</em>
            </h1>
            <h1 className="h-line2" style={{
              fontFamily: "'Libre Baskerville', serif",
              fontSize: "clamp(3rem, 9vw, 7rem)",
              fontWeight: 400, lineHeight: .95,
              color: "rgba(255,255,255,.16)", letterSpacing: "-.025em",
              marginBottom: "2.4rem",
            }}>
              Meets Justice.
            </h1>

            {/* Subtext */}
            <p className="h-sub" style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "clamp(.9rem, 1.6vw, 1.05rem)", fontWeight: 300,
              color: "rgba(255,255,255,.58)", lineHeight: 1.9,
              maxWidth: 500, marginBottom: "2.6rem",
            }}>
              A multidisciplinary forensic science organisation delivering investigation services, academic programs, consultancy, and community empowerment — building a scientifically informed society.
            </p>

            {/* CTAs */}
            <div className="h-btns btns-row" style={{ display: "flex", gap: "1rem", flexWrap: "wrap", marginBottom: "3.8rem" }}>
              <button className="btn-hero-primary">
                Explore Our Work <ArrowRight size={15} strokeWidth={2.5} />
              </button>
              <button className="btn-hero-ghost">Contact Us</button>
            </div>

            {/* Stat strip */}
            <div className="h-strip hero-strip" style={{
              display: "flex",
              borderTop: "1px solid rgba(255,255,255,.1)",
              paddingTop: "2rem",
              maxWidth: 580,
            }}>
              {[
                { n: 500, sfx: "+", label: "Students Mentored" },
                { n: 50,  sfx: "+", label: "Research Projects" },
                { n: 200, sfx: "+", label: "Cases Consulted" },
                { n: 12,  sfx: "+", label: "Forensic Programs" },
              ].map((s, i) => (
                <div key={i} style={{
                  flex: "1 1 100px",
                  paddingRight: i < 3 ? "1.6rem" : 0,
                  paddingLeft: i > 0 ? "1.6rem" : 0,
                  borderRight: i < 3 ? "1px solid rgba(255,255,255,.1)" : "none",
                }}>
                  <div style={{
                    fontFamily: "'Libre Baskerville', serif",
                    fontSize: "clamp(1.6rem, 3vw, 2.4rem)",
                    fontWeight: 700, color: "#5fa8ff", lineHeight: 1,
                  }}>
                    <Counter end={s.n} suffix={s.sfx} />
                  </div>
                  <div style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: ".62rem", letterSpacing: ".1em", textTransform: "uppercase",
                    color: "rgba(255,255,255,.35)", marginTop: 5,
                  }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* ── Floating info card — bottom right ── */}
          <div className="h-card hero-float-card" style={{
            position: "absolute", bottom: "2.5rem", right: "max(2rem, 5%)", zIndex: 4,
            background: "rgba(255,255,255,.07)",
            border: "1px solid rgba(255,255,255,.14)",
            borderRadius: 18, padding: "1.3rem 1.5rem",
            backdropFilter: "blur(20px)",
            maxWidth: 250,
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: ".9rem" }}>
              <div style={{
                width: 38, height: 38, borderRadius: 10,
                background: `linear-gradient(135deg, ${BLUE}, ${BLUE_DARK})`,
                display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
              }}>
                <Activity size={16} color="#fff" strokeWidth={1.8} />
              </div>
              <div>
                <div style={{ fontFamily: "'Libre Baskerville', serif", fontSize: ".88rem", fontWeight: 700, color: "#fff" }}>
                  CSIRT Active
                </div>
                <div style={{ fontFamily: "'Inter', sans-serif", fontSize: ".65rem", color: "rgba(255,255,255,.42)", marginTop: 1 }}>
                  24/7 cyber incident response
                </div>
              </div>
            </div>
            <div style={{ height: 1, background: "rgba(255,255,255,.1)", marginBottom: ".9rem" }} />
            <div style={{ display: "flex", gap: 5, flexWrap: "wrap" }}>
              {["Forensic", "Cyber", "Education", "Research"].map(t => (
                <span key={t} style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: ".55rem", letterSpacing: ".06em",
                  color: "#5fa8ff", background: "rgba(32,126,255,.15)",
                  border: "1px solid rgba(32,126,255,.3)",
                  borderRadius: 5, padding: "3px 8px",
                }}>{t}</span>
              ))}
            </div>
          </div>

          {/* Scroll hint */}
          <div className="hero-scroll-hint" style={{
            position: "absolute", bottom: "2.5rem", left: "max(2rem, 8%)", zIndex: 4,
            display: "flex", alignItems: "center", gap: 10,
          }}>
            <div style={{
              width: 1, height: 44,
              background: "linear-gradient(to bottom, rgba(255,255,255,.5), transparent)",
            }} />
            <span style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: ".55rem", letterSpacing: ".15em", textTransform: "uppercase",
              color: "rgba(255,255,255,.28)", writingMode: "vertical-rl",
            }}>Scroll to explore</span>
          </div>

          {/* Bottom vignette into white */}
          <div style={{
            position: "absolute", bottom: 0, left: 0, right: 0, height: 100,
            background: "linear-gradient(transparent, rgba(255,255,255,.05))",
            pointerEvents: "none",
          }} />
        </section>

        {/* ══ MISSION ════════════════════════════════════════════ */}
        <section
          ref={missionRef}
          style={{
            padding: "9rem max(1.5rem, calc((100% - 1280px) / 2))",
            maxWidth: 1344, margin: "0 auto",
          }}
        >
          <div className="mis-grid" style={{
            display: "grid", gridTemplateColumns: "1fr 1fr",
            gap: "5rem", alignItems: "center",
          }}>
            <div style={{
              opacity: missionVis ? 1 : 0,
              transform: missionVis ? "translateX(0)" : "translateX(-34px)",
              transition: "all .9s cubic-bezier(.4,0,.2,1)",
            }}>
              <div style={{ marginBottom: "1.4rem" }}>
                <span className="eyebrow">Our Mission</span>
              </div>
              <h2 style={{
                fontFamily: "'Libre Baskerville', serif",
                fontSize: "clamp(2rem, 4.5vw, 3.2rem)",
                fontWeight: 400, color: "#111", lineHeight: 1.1, marginBottom: "1.8rem",
              }}>
                Advancing Forensic<br />
                Science.{" "}
                <em style={{ fontStyle: "italic", color: BLUE }}>Empowering Minds.</em>
              </h2>
              <p style={{
                fontFamily: "'Inter', sans-serif", fontWeight: 300,
                fontSize: ".95rem", color: "rgba(0,0,0,.55)", lineHeight: 1.9, marginBottom: "1.2rem",
              }}>
                Forensleuth was founded on the belief that forensic science should be accessible, rigorous, and impactful — not just in laboratories and courtrooms, but in classrooms and communities.
              </p>
              <p style={{
                fontFamily: "'Inter', sans-serif", fontWeight: 300,
                fontSize: ".95rem", color: "rgba(0,0,0,.55)", lineHeight: 1.9,
              }}>
                From investigating digital breaches to mentoring Ph.D. scholars, from crafting forensic kits to running community outreach — every service is rooted in scientific integrity and a commitment to justice.
              </p>
              <div style={{
                display: "flex", marginTop: "2.8rem",
                paddingTop: "2rem", borderTop: "1px solid rgba(32,126,255,.1)",
              }}>
                {["Scientific Integrity", "Ethical Practice", "Academic Excellence"].map((v, i) => (
                  <div key={v} style={{
                    flex: 1,
                    paddingRight: i < 2 ? "1.3rem" : 0,
                    paddingLeft: i > 0 ? "1.3rem" : 0,
                    borderRight: i < 2 ? "1px solid rgba(32,126,255,.1)" : "none",
                  }}>
                    <CheckCircle2 size={14} color={BLUE} strokeWidth={2.2} style={{ marginBottom: 7 }} />
                    <span style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: ".76rem", color: "rgba(0,0,0,.55)",
                      letterSpacing: ".03em", lineHeight: 1.5, display: "block",
                    }}>{v}</span>
                  </div>
                ))}
              </div>
            </div>

            <div style={{
              opacity: missionVis ? 1 : 0,
              transform: missionVis ? "translateX(0)" : "translateX(34px)",
              transition: "all .9s cubic-bezier(.4,0,.2,1) .18s",
              position: "relative",
            }}>
              <div style={{ borderRadius: 22, overflow: "hidden", boxShadow: "0 24px 60px rgba(32,126,255,.15)", height: 430 }}>
                <img
                  src="https://images.unsplash.com/photo-1614064641938-3bbee52942c7?w=900&q=75"
                  alt="Forensic laboratory"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
                <div style={{
                  position: "absolute", inset: 0,
                  background: "linear-gradient(135deg, rgba(32,126,255,.08) 0%, transparent 60%)",
                }} />
              </div>
              <div style={{
                position: "absolute", bottom: -22, left: -22,
                background: "#fff",
                border: "1.5px solid rgba(32,126,255,.15)",
                borderRadius: 16, padding: "1.2rem 1.4rem",
                boxShadow: "0 14px 42px rgba(32,126,255,.12)",
                display: "flex", alignItems: "center", gap: 12,
                maxWidth: 240,
              }}>
                <div style={{
                  width: 46, height: 46, borderRadius: 12,
                  background: `linear-gradient(135deg, ${BLUE}, ${BLUE_DARK})`,
                  display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
                }}>
                  <Award size={20} color="#fff" strokeWidth={1.6} />
                </div>
                <div>
                  <div style={{ fontFamily: "'Libre Baskerville', serif", fontSize: ".95rem", fontWeight: 700, color: "#111" }}>
                    Certified
                  </div>
                  <div style={{ fontFamily: "'Inter', sans-serif", fontSize: ".68rem", color: "rgba(0,0,0,.45)", lineHeight: 1.4 }}>
                    Expert-led forensic programs
                  </div>
                </div>
              </div>
              <div style={{
                position: "absolute", top: -16, right: -16,
                background: "#111", borderRadius: 14,
                padding: "1rem 1.2rem",
                boxShadow: "0 8px 30px rgba(0,0,0,.2)",
                minWidth: 160,
              }}>
                <div style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: ".55rem", letterSpacing: ".14em", textTransform: "uppercase",
                  color: "rgba(255,255,255,.4)", marginBottom: 8,
                }}>Domains</div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
                  {["Forensic", "Cyber", "Education", "Research"].map(t => (
                    <span key={t} style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: ".55rem", letterSpacing: ".05em",
                      color: "#5fa8ff", background: "rgba(32,126,255,.12)",
                      border: "1px solid rgba(32,126,255,.25)",
                      borderRadius: 5, padding: "3px 8px",
                    }}>{t}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ══ SERVICES ══════════════════════════════════════════ */}
        <section style={{
          background: "#F5F8FF",
          borderTop: "1px solid rgba(32,126,255,.08)",
          borderBottom: "1px solid rgba(32,126,255,.08)",
          padding: "8rem max(1.5rem, calc((100% - 1280px) / 2))",
        }}>
          <div style={{ maxWidth: 1344, margin: "0 auto" }}>
            <div style={{
              display: "flex", justifyContent: "space-between",
              alignItems: "flex-end", marginBottom: "4rem",
              flexWrap: "wrap", gap: "1.5rem",
            }}>
              <div>
                <div style={{ marginBottom: "1rem" }}>
                  <span className="eyebrow">What We Do</span>
                </div>
                <h2 style={{
                  fontFamily: "'Libre Baskerville', serif",
                  fontSize: "clamp(2rem, 5vw, 3.8rem)",
                  fontWeight: 400, color: "#111", lineHeight: 1.08,
                }}>
                  Our Services &{" "}
                  <em style={{ fontStyle: "italic", color: BLUE }}>Expertise</em>
                </h2>
              </div>
              <p style={{
                fontFamily: "'Inter', sans-serif", fontWeight: 300,
                fontSize: ".9rem", color: "rgba(0,0,0,.45)",
                maxWidth: 300, lineHeight: 1.8,
              }}>
                Five core domains of forensic expertise, each designed to make a measurable impact in your field.
              </p>
            </div>
            <div style={{ display: "grid", gap: "1.4rem" }}>
              <ServiceCard service={serviceData[0]} delay={0} featured={true} />
              <div className="sv-grid" style={{
                display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: "1.4rem",
              }}>
                {serviceData.slice(1).map((s, i) => (
                  <ServiceCard key={i} service={s} delay={100 + i * 80} />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ══ WHY US ════════════════════════════════════════════ */}
        <section
          ref={whyRef}
          style={{
            padding: "8rem max(1.5rem, calc((100% - 1280px) / 2))",
            maxWidth: 1344, margin: "0 auto",
          }}
        >
          <div style={{ textAlign: "center", marginBottom: "4.5rem" }}>
            <div style={{ marginBottom: "1rem" }}>
              <span className="eyebrow">Why Choose Us</span>
            </div>
            <h2 style={{
              fontFamily: "'Libre Baskerville', serif",
              fontSize: "clamp(1.9rem, 4vw, 3rem)",
              fontWeight: 400, color: "#111",
            }}>
              The{" "}
              <em style={{ fontStyle: "italic", color: BLUE }}>Forensleuth</em>
              {" "}Difference
            </h2>
          </div>
          <div className="why-grid" style={{
            display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "1.2rem",
          }}>
            {[
              { Icon: Microscope, title: "Expert-Led", desc: "All programs and investigations are led by certified forensic and cybersecurity experts with decades of real-world experience." },
              { Icon: Zap,        title: "Rapid Response", desc: "Our CSIRT team operates with swift protocols to minimise damage from cyber incidents and ensure business continuity." },
              { Icon: Target,     title: "Tailored Approach", desc: "Every consultation and program is customised to meet your specific needs, objectives, and institutional context." },
              { Icon: Shield,     title: "Legally Compliant", desc: "All reports and investigations are prepared to meet the highest legal, academic, and professional standards." },
            ].map(({ Icon: WI, title, desc }, i) => (
              <div
                key={i}
                style={{
                  opacity: whyVis ? 1 : 0,
                  transform: whyVis ? "translateY(0)" : "translateY(28px)",
                  transition: `all .65s ease ${i * 90}ms`,
                  background: "#fff",
                  border: "1.5px solid rgba(32,126,255,.1)",
                  borderRadius: 18, padding: "2rem 1.6rem",
                  boxShadow: "0 2px 12px rgba(0,0,0,.04)",
                  cursor: "default",
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.boxShadow = "0 16px 40px rgba(32,126,255,.12)";
                  e.currentTarget.style.borderColor = "rgba(32,126,255,.3)";
                  e.currentTarget.style.transform = "translateY(-3px)";
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.boxShadow = "0 2px 12px rgba(0,0,0,.04)";
                  e.currentTarget.style.borderColor = "rgba(32,126,255,.1)";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                <div style={{
                  width: 52, height: 52, borderRadius: 14,
                  background: BLUE_LIGHT,
                  border: "1.5px solid rgba(32,126,255,.18)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  marginBottom: "1.3rem",
                }}>
                  <WI size={22} color={BLUE} strokeWidth={1.7} />
                </div>
                <h4 style={{
                  fontFamily: "'Libre Baskerville', serif",
                  fontSize: "1.02rem", fontWeight: 700,
                  color: "#111", marginBottom: ".7rem",
                }}>{title}</h4>
                <p style={{
                  fontFamily: "'Inter', sans-serif", fontWeight: 300,
                  fontSize: ".82rem", color: "rgba(0,0,0,.5)", lineHeight: 1.75,
                }}>{desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ══ TESTIMONIAL ══════════════════════════════════════ */}
        <section style={{
          background: "#111", position: "relative", overflow: "hidden",
          padding: "6rem max(1.5rem, calc((100% - 1280px) / 2))",
        }}>
          <div style={{
            position: "absolute", inset: 0,
            backgroundImage: `radial-gradient(rgba(32,126,255,.12) 1px, transparent 1px)`,
            backgroundSize: "30px 30px", opacity: .5,
          }} />
          <div style={{
            position: "absolute", top: "50%", left: "50%",
            transform: "translate(-50%,-50%)",
            width: 500, height: 200,
            background: "radial-gradient(ellipse, rgba(32,126,255,.1) 0%, transparent 70%)",
          }} />
          <div style={{ position: "relative", zIndex: 2, maxWidth: 1344, margin: "0 auto", textAlign: "center" }}>
            <Quote size={32} color={BLUE} strokeWidth={1} style={{ marginBottom: "1.4rem", opacity: .6 }} />
            <blockquote style={{
              fontFamily: "'Libre Baskerville', serif",
              fontSize: "clamp(1.15rem, 2.8vw, 1.85rem)",
              fontWeight: 400, fontStyle: "italic",
              color: "#fff", lineHeight: 1.6,
              maxWidth: 820, margin: "0 auto 2rem",
            }}>
              "Forensleuth didn't just provide a service — they empowered our institution with the tools, knowledge, and confidence to apply forensic science meaningfully."
            </blockquote>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 14 }}>
              <div style={{
                width: 46, height: 46, borderRadius: "50%", overflow: "hidden",
                border: `2px solid rgba(32,126,255,.5)`, flexShrink: 0,
              }}>
                <img
                  src="https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&q=80"
                  alt="Testimonial"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </div>
              <div style={{ textAlign: "left" }}>
                <div style={{ fontFamily: "'Inter', sans-serif", fontSize: ".85rem", fontWeight: 500, color: "#fff" }}>
                  Dr. Priya Sharma
                </div>
                <div style={{ fontFamily: "'Inter', sans-serif", fontSize: ".68rem", color: "rgba(255,255,255,.38)", letterSpacing: ".08em", textTransform: "uppercase" }}>
                  Head of Forensics, Delhi University
                </div>
              </div>
              <div style={{ display: "flex", gap: 2 }}>
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={13} color={BLUE} fill={BLUE} strokeWidth={0} />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ══ CTA ══════════════════════════════════════════════ */}
        <section
          ref={ctaRef}
          style={{ padding: "8rem max(1.5rem, calc((100% - 1280px) / 2))", maxWidth: 1344, margin: "0 auto" }}
        >
          <div
            className="cta-inner"
            style={{
              display: "grid", gridTemplateColumns: "1fr 1fr",
              gap: "4rem", alignItems: "center",
              background: "#fff",
              border: "1.5px solid rgba(32,126,255,.12)",
              borderRadius: 24, padding: "4rem",
              boxShadow: "0 20px 60px rgba(32,126,255,.07)",
              position: "relative", overflow: "hidden",
              opacity: ctaVis ? 1 : 0,
              transform: ctaVis ? "translateY(0)" : "translateY(28px)",
              transition: "all .85s cubic-bezier(.4,0,.2,1)",
            }}
          >
            <div style={{
              position: "absolute", bottom: 0, right: 0,
              width: 250, height: 250,
              background: "radial-gradient(circle at 80% 80%, rgba(32,126,255,.07) 0%, transparent 70%)",
            }} />
            <div style={{ position: "relative", zIndex: 2 }}>
              <div style={{ marginBottom: "1.3rem" }}>
                <span className="eyebrow">Get Started</span>
              </div>
              <h2 style={{
                fontFamily: "'Libre Baskerville', serif",
                fontSize: "clamp(1.7rem, 3.5vw, 2.8rem)",
                fontWeight: 400, color: "#111", lineHeight: 1.15, marginBottom: "1rem",
              }}>
                Ready to work with{" "}
                <em style={{ fontStyle: "italic", color: BLUE }}>Forensleuth?</em>
              </h2>
              <p style={{
                fontFamily: "'Inter', sans-serif", fontWeight: 300,
                fontSize: ".94rem", color: "rgba(0,0,0,.5)", lineHeight: 1.82,
                marginBottom: "2rem",
              }}>
                Whether it's a forensic investigation, academic consultation, or educational partnership — our team is ready to support your goals.
              </p>
              <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
                <button className="btn-blue">
                  Schedule a Consultation <ArrowRight size={14} strokeWidth={2.5} />
                </button>
                <button className="btn-ghost">View All Services</button>
              </div>
            </div>
            <div style={{ position: "relative", zIndex: 2, display: "flex", flexDirection: "column", gap: "1rem" }}>
              {[
                { Icon: Mail,   text: "forensleuth@email.com", label: "Email Us" },
                { Icon: Phone,  text: "+91 98765 43210",        label: "Call Us" },
                { Icon: MapPin, text: "New Delhi, India",       label: "Visit Us" },
              ].map(({ Icon: CI, text, label }, i) => (
                <div key={i} style={{
                  display: "flex", alignItems: "center", gap: 14,
                  padding: "1rem 1.2rem",
                  background: "#F5F8FF",
                  border: "1.5px solid rgba(32,126,255,.1)",
                  borderRadius: 14, transition: "border-color .3s",
                }}
                  onMouseEnter={e => e.currentTarget.style.borderColor = "rgba(32,126,255,.35)"}
                  onMouseLeave={e => e.currentTarget.style.borderColor = "rgba(32,126,255,.1)"}
                >
                  <div style={{
                    width: 40, height: 40, borderRadius: 10,
                    background: BLUE_LIGHT,
                    border: "1px solid rgba(32,126,255,.2)",
                    display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
                  }}>
                    <CI size={16} color={BLUE} strokeWidth={1.8} />
                  </div>
                  <div>
                    <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: ".58rem", letterSpacing: ".1em", textTransform: "uppercase", color: "rgba(0,0,0,.35)", marginBottom: 2 }}>{label}</div>
                    <div style={{ fontFamily: "'Inter', sans-serif", fontSize: ".88rem", color: "rgba(0,0,0,.7)", fontWeight: 500 }}>{text}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══ FOOTER ══════════════════════════════════════════ */}
        <footer style={{
          background: "#111",
          borderTop: "1px solid rgba(32,126,255,.15)",
          padding: "2.8rem max(1.5rem, calc((100% - 1280px) / 2))",
        }}>
          <div style={{
            maxWidth: 1344, margin: "0 auto",
            display: "flex", justifyContent: "space-between",
            alignItems: "center", flexWrap: "wrap", gap: "1rem",
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{
                width: 30, height: 30, borderRadius: 8,
                background: `linear-gradient(135deg, ${BLUE}, ${BLUE_DARK})`,
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <Microscope size={14} color="#fff" strokeWidth={1.8} />
              </div>
              <span style={{
                fontFamily: "'Libre Baskerville', serif",
                fontSize: ".88rem", fontWeight: 700, color: "#fff", letterSpacing: ".07em",
              }}>FORENSLEUTH</span>
            </div>
            <p style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: ".72rem", color: "rgba(255,255,255,.28)", letterSpacing: ".06em",
            }}>
              © {new Date().getFullYear()} Forensleuth. All rights reserved.
            </p>
            <div style={{ display: "flex", gap: "1.5rem" }}>
              {["Privacy", "Terms", "Contact"].map(l => (
                <a key={l} href="#" style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: ".72rem", color: "rgba(255,255,255,.3)",
                  textDecoration: "none", letterSpacing: ".07em",
                  textTransform: "uppercase", transition: "color .3s",
                }}
                  onMouseEnter={e => e.currentTarget.style.color = BLUE}
                  onMouseLeave={e => e.currentTarget.style.color = "rgba(255,255,255,.3)"}
                >{l}</a>
              ))}
            </div>
          </div>
        </footer>

      </div>
    </>
  );
}