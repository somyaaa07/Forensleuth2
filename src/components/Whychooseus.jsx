'use client'

import { useEffect, useRef, useState } from 'react'

const pillars = [
  {
    num: '01',
    svg: (
      <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
        <circle cx="12" cy="12" r="10"/>
        <polyline points="12 6 12 12 16 14"/>
      </svg>
    ),
    title: 'Rapid Turnaround',
    desc: 'Emergency analysis available 24/7. Industry-leading response times without compromising evidence integrity.',
    metric: '< 48h', metricLabel: 'Report Delivery',
    color: '#207eff',
  },
  {
    num: '02',
    svg: (
      <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      </svg>
    ),
    title: 'Court-Ready Evidence',
    desc: 'Every report adheres to legal standards ensuring your evidence is admissible and defensible in any jurisdiction.',
    metric: '100%', metricLabel: 'Admissibility Rate',
    color: '#fa5330',
  },
  {
    num: '03',
    svg: (
      <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/>
      </svg>
    ),
    title: 'Certified Experts',
    desc: 'Top-tier certifications: CFCE, EnCE, GCFE, CCE — decades of combined investigative and courtroom experience.',
    metric: '35+', metricLabel: 'Certified Analysts',
    color: '#207eff',
  },
  {
    num: '04',
    svg: (
      <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
        <rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/>
      </svg>
    ),
    title: 'Quality You Can Trust',
    desc: 'Ensuring Excellence through Quality , Reliability and Precision in Every Analysis.',
    metric: 'AES-256', metricLabel: 'Encryption Standard',
    color: '#fa5330',
  },
]

const skills = [
  { label: 'Incident Response & Threat Hunting', val: 93 },
  { label: 'Log Analysis & SIEM (Splunk/ELK)', val: 92 },
  { label: 'Email & Phishing Forensics', val: 90 },
  { label: 'Cloud Forensics (AWS/Azure)', val: 88 },
  { label: 'File System Analysis (NTFS, FAT, EXT)', val: 94 },
  { label: 'Timeline Analysis & Event Correlation', val: 91 },
  { label: 'Digital Evidence Handling & Chain of Custody', val: 95 },


]

export default function WhyChooseUs() {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach(e => {
          if (e.isIntersecting) { e.target.classList.add('visible'); setVisible(true) }
        })
      },
      { threshold: 0.1 }
    )
    ref.current?.querySelectorAll('.reveal').forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  return (
    /*
     * LAYOUT RULES:
     * - <section> = full-width background canvas only. No overflow-hidden here.
     * - inner .fl-container = max-width + centred + horizontal padding
     * - decorative blobs use position:absolute with pointer-events:none and z-index:0
     * - all real content sits at z-index:1 inside .fl-container
     */
    <section
      ref={ref}
      style={{
        position: 'relative',
        width: '100%',
        background: '#080f1a',
        paddingTop: 'clamp(64px, 10vw, 120px)',
        paddingBottom: 'clamp(64px, 10vw, 120px)',
      }}
    >
      {/* Decorative glow — z0, never clips content */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute', bottom: 0, right: 0,
          width: 500, height: 500, pointerEvents: 'none', zIndex: 0,
          background: 'radial-gradient(circle, rgba(250,83,48,0.04) 0%, transparent 60%)',
        }}
      />

      {/* ── Universal centred container ── */}
      <div style={{
        position: 'relative', zIndex: 1,
        maxWidth: 1380,
        margin: '0 auto',
        paddingLeft: 'clamp(16px, 5vw, 80px)',
        paddingRight: 'clamp(16px, 5vw, 80px)',
      }}>

        {/* Section header */}
        <div className="reveal" style={{ marginBottom: 'clamp(40px, 6vw, 72px)' }}>
          <div className="sys-tag" style={{ marginBottom: 24 }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#207eff', display: 'inline-block' }} />
            WHY FORENSLEUTH
          </div>
          <h2 style={{
            fontFamily: 'Orbitron', fontWeight: 900,
            fontSize: 'clamp(28px, 4vw, 60px)',
            color: '#fff', letterSpacing: 2, lineHeight: 1.1, margin: 0,
          }}>
            PRECISION. TRUST.<br />
            <span style={{ color: '#207eff', textShadow: '0 0 40px rgba(32,126,255,0.5)' }}>RESULTS.</span>
          </h2>
        </div>

        {/* Two-column: pillars + skills.
            Collapses to single column on narrow screens via auto-fit. */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 420px), 1fr))',
          gap: 'clamp(32px, 5vw, 80px)',
          alignItems: 'start',
        }}>

          {/* LEFT – 2×2 pillar grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 200px), 1fr))',
            gap: 2,
          }}>
            {pillars.map((p, i) => (
              <div
                key={p.title}
                className="reveal glow-card"
                style={{
                  padding: 'clamp(18px, 2.5vw, 28px) clamp(14px, 2vw, 24px)',
                  transitionDelay: `${i * 0.08}s`,
                }}
              >
                <div style={{ fontFamily: 'Orbitron', fontSize: 10, letterSpacing: 3, color: p.color, marginBottom: 14, opacity: 0.6 }}>
                  {p.num}
                </div>
                <div style={{ color: p.color, marginBottom: 14 }}>{p.svg}</div>
                <h3 style={{ fontFamily: 'Orbitron', fontWeight: 700, fontSize: 13, color: '#fff', letterSpacing: 1, marginBottom: 10, lineHeight: 1.3 }}>
                  {p.title}
                </h3>
                <p style={{ fontFamily: 'Rajdhani', fontSize: 14, color: '#8099b8', lineHeight: 1.65, marginBottom: 16, margin: '0 0 16px' }}>
                  {p.desc}
                </p>
                <div>
                  <div style={{ fontFamily: 'Orbitron', fontWeight: 800, fontSize: 20, color: p.color }}>{p.metric}</div>
                  <div style={{ fontFamily: 'Share Tech Mono', fontSize: 9, letterSpacing: 2, color: '#8099b8' }}>{p.metricLabel}</div>
                </div>
              </div>
            ))}
          </div>

          {/* RIGHT – image + skill bars */}
          <div className="reveal" style={{ transitionDelay: '0.3s' }}>

            {/* image */}
            <div style={{ position: 'relative', overflow: 'hidden', border: '1px solid #1a2d47', marginBottom: 32 }}>
              <img
                src="https://i.pinimg.com/1200x/4e/82/39/4e823991ec36f8a7a8de75468dac146b.jpg"
                alt="Forensic Analysis"
                style={{
                  width: '100%',
                  height: 'clamp(180px, 22vw, 240px)',
                  objectFit: 'cover', display: 'block',
                  filter: 'brightness(0.45) contrast(1.1) saturate(0.7)',
                }}
              />
              <div className="hex-grid" style={{ position: 'absolute', inset: 0, mixBlendMode: 'overlay' }} />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent 40%, #080f1a)' }} />
              <div style={{ position: 'absolute', bottom: 20, left: 20 }}>
                <div style={{ fontFamily: 'Orbitron', fontWeight: 800, fontSize: 32, color: '#207eff', textShadow: '0 0 20px rgba(32,126,255,0.6)', lineHeight: 1 }}>99.8%</div>
                <div style={{ fontFamily: 'Share Tech Mono', fontSize: 10, letterSpacing: 2, color: '#8099b8' }}>EVIDENCE ACCURACY</div>
              </div>
            </div>

            {/* skill bars */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
              {skills.map((sk) => (
                <div key={sk.label}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                    <span style={{ fontFamily: 'Rajdhani', fontSize: 13, color: '#8099b8', letterSpacing: 1, fontWeight: 500 }}>{sk.label}</span>
                    <span style={{ fontFamily: 'Orbitron', fontSize: 10, color: '#207eff', fontWeight: 600 }}>{sk.val}%</span>
                  </div>
                  <div style={{ height: 2, background: '#1a2d47', position: 'relative', overflow: 'hidden' }}>
                    <div className="skill-bar-inner" style={{ width: visible ? `${sk.val}%` : '0%' }} />
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}