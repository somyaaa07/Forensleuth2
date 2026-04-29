'use client'

import { useEffect, useRef } from 'react'

const posts = [
  {
    image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=700&q=80',
    cat: 'DIGITAL FORENSICS', catColor: '#207eff',
    title: 'Advanced Volatile Memory Analysis in Modern Threat Hunting',
    excerpt: 'How RAM forensics is exposing sophisticated fileless malware that evades traditional disk-based detection entirely.',
    date: '08 APR 2025', read: '6 MIN',
    tag: 'FEATURED',
  },
  {
    image: 'https://images.unsplash.com/photo-1614064641938-3bbee52942c7?w=700&q=80',
    cat: 'INCIDENT RESPONSE', catColor: '#fa5330',
    title: 'Ransomware Kill Chain: Tracing Initial Access to Full Encryption',
    excerpt: 'A forensic methodology for reconstructing ransomware timelines that build prosecution-grade evidence.',
    date: '22 MAR 2025', read: '8 MIN',
    tag: null,
  },
  {
    image: 'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=700&q=80',
    cat: 'OSINT INTELLIGENCE', catColor: '#207eff',
    title: 'Legal Frameworks for Dark Web Evidence Admissibility in 2025',
    excerpt: 'Navigating jurisdiction, chain of custody, and authentication requirements for OSINT-sourced digital evidence.',
    date: '10 MAR 2025', read: '5 MIN',
    tag: null,
  },
]

export default function Blogs() {
  const ref = useRef(null)

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible') }),
      { threshold: 0.1 }
    )
    ref.current?.querySelectorAll('.reveal').forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  return (
    <section ref={ref} style={{ padding: '120px 0', background: '#03060d', position: 'relative', overflow: 'hidden' }}>

      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 40px' }}>
        {/* Header */}
        <div className="reveal" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 64 }}>
          <div>
            <div className="sys-tag" style={{ marginBottom: 20 }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#207eff', display: 'inline-block' }} />
              INTELLIGENCE BRIEFINGS
            </div>
            <h2 style={{ fontFamily: 'Orbitron', fontWeight: 900, fontSize: 'clamp(32px, 3.5vw, 56px)', color: '#fff', letterSpacing: 2, lineHeight: 1.1 }}>
              FROM THE <span style={{ color: '#207eff', textShadow: '0 0 40px rgba(32,126,255,0.5)' }}>LAB</span>
            </h2>
          </div>
          <button className="btn-run-border" style={{ flexShrink: 0 }}>
            <span>All Reports</span>
          </button>
        </div>

        {/* Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: 2 }}>
          {posts.map((p, i) => (
            <article
              key={p.title}
              className="reveal glow-card"
              style={{ overflow: 'hidden', transitionDelay: `${i * 0.1}s`, cursor: 'pointer' }}
            >
              {/* Image */}
              <div style={{ position: 'relative', overflow: 'hidden', height: 220 }}>
                <img
                  src={p.image}
                  alt={p.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.5) contrast(1.1) saturate(0.6)', transition: 'transform 0.6s ease' }}
                  onMouseEnter={e => e.target.style.transform = 'scale(1.05)'}
                  onMouseLeave={e => e.target.style.transform = 'scale(1)'}
                />
                <div className="hex-grid" style={{ position: 'absolute', inset: 0, mixBlendMode: 'overlay', opacity: 0.5 }} />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent 40%, rgba(3,6,13,0.9))' }} />

                <div style={{ position: 'absolute', top: 16, left: 16, fontFamily: 'Share Tech Mono', fontSize: 9, letterSpacing: 2, color: '#fff', background: p.catColor, padding: '5px 10px' }}>
                  {p.cat}
                </div>

                {p.tag && (
                  <div style={{ position: 'absolute', top: 16, right: 16, fontFamily: 'Orbitron', fontSize: 8, letterSpacing: 2, color: '#03060d', background: '#fa5330', padding: '5px 10px', fontWeight: 700 }}>
                    {p.tag}
                  </div>
                )}
              </div>

              {/* Content */}
              <div style={{ padding: '28px 28px 32px' }}>
                <div style={{ display: 'flex', gap: 16, marginBottom: 16 }}>
                  <span style={{ fontFamily: 'Share Tech Mono', fontSize: 9, letterSpacing: 2, color: '#8099b8' }}>{p.date}</span>
                  <span style={{ fontFamily: 'Share Tech Mono', fontSize: 9, letterSpacing: 2, color: '#8099b8' }}>•</span>
                  <span style={{ fontFamily: 'Share Tech Mono', fontSize: 9, letterSpacing: 2, color: '#8099b8' }}>{p.read} READ</span>
                </div>

                <h3 style={{ fontFamily: 'Orbitron', fontWeight: 700, fontSize: 14, color: '#fff', letterSpacing: 0.5, lineHeight: 1.5, marginBottom: 12, transition: 'color 0.3s' }}>
                  {p.title}
                </h3>

                <p style={{ fontFamily: 'Rajdhani', fontSize: 15, color: '#8099b8', lineHeight: 1.7, marginBottom: 24 }}>{p.excerpt}</p>

                <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontFamily: 'Orbitron', fontSize: 9, color: '#207eff', letterSpacing: 2, fontWeight: 600 }}>
                  ACCESS REPORT
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}