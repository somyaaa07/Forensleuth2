'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
const certs = [
  { label: 'EnCE Certified', val: 'Encase' },
  { label: 'GCFE', val: 'GIAC' },
  { label: 'CFCE', val: 'IACIS' },
  { label: 'ISO 17025', val: 'Accredited' },
]

export default function Welcome() {
  const ref = useRef(null)

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible') }),
      { threshold: 0.12 }
    )
    ref.current?.querySelectorAll('.reveal').forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  return (
    <section
      id="welcome"
      ref={ref}
      style={{
        position: 'relative',
        width: '100%',
        background: '#080f1a',
        paddingTop: 'clamp(48px, 8vw, 120px)',
        paddingBottom: 'clamp(48px, 8vw, 120px)',
      }}
    >
      {/* Decorative glow blob */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute', top: '20%', left: 0,
          width: 400, height: 400,
          background: 'radial-gradient(circle, rgba(32,126,255,0.06) 0%, transparent 70%)',
          borderRadius: '50%', pointerEvents: 'none', zIndex: 0,
          transform: 'translateX(-25%)',
        }}
      />

      {/* ── Universal centred container ── */}
      <div className="welcome-container">

        {/* Responsive two-col grid */}
        <div className="welcome-grid">

          {/* ── LEFT: image stack ── */}
          <div className="reveal welcome-image-col">

            {/* Primary image */}
            <div style={{ position: 'relative', overflow: 'hidden', border: '1px solid #1a2d47' }}>
              <img
                src="https://i.pinimg.com/736x/35/48/f2/3548f2f1937384820012aa053295cce7.jpg"
                alt="ForensLeuth Lab"
                className="img-forensic welcome-img"
                style={{
                  width: '100%',
                  objectFit: 'cover',
                  display: 'block',
                  filter: 'brightness(0.6) contrast(1.15) saturate(0.8)',
                }}
              />
              <div className="hex-grid" style={{ position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none', mixBlendMode: 'overlay' }} />
              {/* corner brackets */}
              <div style={{ position: 'absolute', top: 16, left: 16, width: 20, height: 20, borderTop: '2px solid #207eff', borderLeft: '2px solid #207eff', zIndex: 3 }} />
              <div style={{ position: 'absolute', bottom: 16, right: 16, width: 20, height: 20, borderBottom: '2px solid #fa5330', borderRight: '2px solid #fa5330', zIndex: 3 }} />
              {/* live dot */}
              <div style={{ position: 'absolute', bottom: 24, left: 24, zIndex: 4, display: 'flex', alignItems: 'center', gap: 10 }}>
                <div className="live-dot" />
                <span style={{ fontFamily: 'Orbitron', fontSize: 9, letterSpacing: 3, color: '#22c55e' }}>LAB::ONLINE</span>
              </div>
            </div>

            {/* "15+ yrs" badge */}
            <div className="years-badge">
              <div style={{ fontFamily: 'Orbitron', fontWeight: 800, fontSize: 28, color: '#207eff', textShadow: '0 0 20px rgba(32,126,255,0.5)', lineHeight: 1 }}>15+</div>
              <div style={{ fontFamily: 'Share Tech Mono', fontSize: 9, letterSpacing: 2, color: '#8099b8', marginTop: 4 }}>YRS OPERATIONAL</div>
            </div>

            {/* Secondary thumbnail — hidden on mobile, shown md+ */}
            <div className="welcome-thumb">
              <img
                src="https://i.pinimg.com/736x/4e/a4/18/4ea4186a1a50838f12b7721c71a73d8a.jpg"
                alt="Analysis"
                style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.55) saturate(0.7)' }}
              />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(32,126,255,0.15), transparent)' }} />
            </div>

          </div>

          {/* ── RIGHT: text content ── */}
          <div className="reveal welcome-text-col" style={{ transitionDelay: '0.2s' }}>

            <div className="sys-tag" style={{ marginBottom: 24 }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#207eff', display: 'inline-block' }} />
              ABOUT FORENSLEUTH
            </div>

            <h2 className="welcome-heading">
              WHERE SCIENCE<br />
              MEETS <span style={{ color: '#207eff', textShadow: '0 0 30px rgba(32,126,255,0.5)' }}>INVESTIGATION</span>
            </h2>

            <p style={{ fontFamily: 'Rajdhani', fontSize: 17, color: '#8099b8', lineHeight: 1.8, marginBottom: 16, maxWidth: '55ch' }}>
              At Forensleuth, we believe that truth is uncovered through Science, Dedication, and Integrity. Our goal is to bridge the gap between forensic expertise and real-world application, ensuring that every investigation is guided by accuracy and ethics.
            </p>
            <p style={{ fontFamily: 'Rajdhani', fontSize: 16, color: 'rgba(128,153,184,0.7)', lineHeight: 1.8, marginBottom: 40, maxWidth: '55ch' }}>
We are committed to building a platform where knowledge meets purpose ~ empowering professionals, students, and organizations to rely on science as the voice of justice.            </p>

            {/* Feature list */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 44 }}>
              {[
                'ISO: 9001:2015  GST No.: 09GNHPP7365D1ZI',
                'Court-Admitted Expert Witnesses — 100% Admissibility',
                // 'End-to-End Chain of Custody with Cryptographic Verification',
                // 'Real-Time Threat Intelligence & Dark Web Monitoring',
              ].map((item) => (
                <div key={item} style={{ display: 'flex', alignItems: 'flex-start', gap: 14 }}>
                  <div style={{
                    width: 20, height: 20, flexShrink: 0, marginTop: 2,
                    border: '1px solid rgba(32,126,255,0.4)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    background: 'rgba(32,126,255,0.06)',
                  }}>
                    <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
                      <path d="M2 6l3 3 5-5" stroke="#207eff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <span style={{ fontFamily: 'Rajdhani', fontSize: 15, color: '#8099b8', lineHeight: 1.5 }}>{item}</span>
                </div>
              ))}
            </div>

            {/* Cert badges */}
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 40 }}>
              {certs.map((c) => (
                <div key={c.label} style={{ padding: '8px 14px', border: '1px solid #1a2d47', background: 'rgba(32,126,255,0.04)' }}>
                  <div style={{ fontFamily: 'Orbitron', fontSize: 11, color: '#207eff', fontWeight: 600 }}>{c.val}</div>
                  <div style={{ fontFamily: 'Share Tech Mono', fontSize: 9, color: '#8099b8', letterSpacing: 1 }}>{c.label}</div>
                </div>
              ))}
            </div>

<Link href="/services" >
            <button
              className="btn-solid"
              onClick={() => document.querySelector('#services')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <span>View Services</span>
            </button>
            </Link>
          </div>

        </div>
      </div>

      <style>{`
        /* ── Container ── */
        .welcome-container {
          position: relative;
          z-index: 1;
          max-width: 1380px;
          margin: 0 auto;
          padding-left: clamp(16px, 5vw, 80px);
          padding-right: clamp(16px, 5vw, 80px);
        }

        /* ── Two-column grid ── */
        .welcome-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: clamp(32px, 5vw, 80px);
          align-items: center;
        }

        /* ── Image column ── */
        .welcome-image-col {
          position: relative;
        }

        /* ── Primary image height ── */
        .welcome-img {
          height: clamp(220px, 52vw, 500px);
        }

        /* ── Heading ── */
        .welcome-heading {
          font-family: 'Orbitron', sans-serif;
          font-weight: 900;
          font-size: clamp(22px, 5vw, 52px);
          color: #fff;
          line-height: 1.1;
          letter-spacing: 1px;
          margin-bottom: 24px;
        }

        /* ── Years badge ── */
        .years-badge {
          position: absolute;
          top: -16px;
          right: -12px;
          background: #0d1626;
          border: 1px solid #1a2d47;
          padding: 12px 16px;
          box-shadow: 0 12px 40px rgba(0,0,0,0.6);
          z-index: 10;
        }

        /* ── Thumb image: hidden by default ── */
        .welcome-thumb {
          display: none;
        }

        /* ────────────────────────────────────────
           TABLET  480px – 767px
        ──────────────────────────────────────── */
        @media (min-width: 480px) {
          .welcome-img {
            height: clamp(280px, 68vw, 420px);
          }

          .years-badge {
            top: -18px;
            right: -14px;
            padding: 14px 18px;
          }
        }

        /* ────────────────────────────────────────
           TABLET LANDSCAPE  768px – 1023px
        ──────────────────────────────────────── */
        @media (min-width: 768px) {
          .welcome-grid {
            grid-template-columns: 1fr 1fr;
            gap: clamp(40px, 5vw, 64px);
          }

          .welcome-img {
            height: clamp(520px, 132vw, 900px);
          }

          .years-badge {
            top: -20px;
            right: -20px;
            padding: 16px 20px;
          }

          /* Secondary thumbnail */
          .welcome-thumb {
            display: block;
            position: absolute;
            bottom: -24px;
            right: -24px;
            width: clamp(140px, 18vw, 200px);
            height: clamp(110px, 14vw, 160px);
            overflow: hidden;
            border: 1px solid #1a2d47;
            box-shadow: 0 20px 60px rgba(0,0,0,0.8);
            z-index: 5;
          }
        }

        /* ────────────────────────────────────────
           DESKTOP  1024px+  (matches 1440px)
        ──────────────────────────────────────── */
        @media (min-width: 1024px) {
          .welcome-grid {
            grid-template-columns: 1fr 1fr;
            gap: clamp(48px, 5vw, 80px);
            align-items: center;
          }

          .welcome-img {
            height: clamp(420px, 80vw, 780px);
          }

          .years-badge {
            top: -20px;
            right: -20px;
          }

          .welcome-thumb {
            width: clamp(160px, 14vw, 200px);
            height: clamp(120px, 15vw, 160px);
            bottom: -28px;
            right: -28px;
          }
        }

        /* ────────────────────────────────────────
           WIDE  1280px+
        ──────────────────────────────────────── */
        @media (min-width: 1280px) {
          .welcome-img {
            height: clamp(520px, 82vw, 780px);
          }
        }
      `}</style>
    </section>
  )
}