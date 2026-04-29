'use client'

import { useEffect, useRef, useState } from 'react'

const testimonials = [
  {
    name: 'Sarah Mitchell',
    role: 'Lead Attorney — Mitchell & Associates',
    org: 'LAW FIRM',
    text: "ForensLeuth's digital forensics report was absolutely critical in our cybercrime case. Their findings were presented with such technical clarity that the jury immediately understood the complexity. Exceptional work.",
    initials: 'SM', color: '#207eff', stars: 5,
  },
  {
    name: 'Det. James Harlow',
    role: 'Cyber Crimes Unit, Metropolitan Police',
    org: 'LAW ENFORCEMENT',
    text: "We've partnered with ForensLeuth on over 40 investigations. Turnaround is unmatched and evidence integrity is always bulletproof. Their analysts think like investigators — not just technicians.",
    initials: 'JH', color: '#fa5330', stars: 5,
  },
  {
    name: 'Dr. Priya Nair',
    role: 'CISO — NexGen Technologies',
    org: 'ENTERPRISE',
    text: "After ransomware paralyzed our operations, ForensLeuth had us back in 72 hours. They identified the breach vector in hours. The attribution report was thorough enough to support criminal prosecution.",
    initials: 'PN', color: '#207eff', stars: 5,
  },
  {
    name: 'Mark Stevenson',
    role: 'VP Legal — Continental Holdings',
    org: 'CORPORATE',
    text: "The OSINT intelligence report ForensLeuth delivered gave us a complete picture of the fraud network. Their work saved us millions and was instrumental in the prosecution. World-class professionalism.",
    initials: 'MS', color: '#fa5330', stars: 5,
  },
]

export default function Testimonials() {
  const [active, setActive] = useState(0)
  const ref = useRef(null)

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible') }),
      { threshold: 0.1 }
    )
    ref.current?.querySelectorAll('.reveal').forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  useEffect(() => {
    const t = setInterval(() => setActive(p => (p + 1) % testimonials.length), 5000)
    return () => clearInterval(t)
  }, [])

  return (
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
      {/* ── Universal centred container ── */}
      <div style={{
        position: 'relative', zIndex: 1,
        maxWidth: 1380,
        margin: '0 auto',
        paddingLeft: 'clamp(16px, 5vw, 80px)',
        paddingRight: 'clamp(16px, 5vw, 80px)',
      }}>

        {/* Header */}
        <div className="reveal" style={{ textAlign: 'center', marginBottom: 'clamp(40px, 6vw, 72px)' }}>
          <div className="sys-tag" style={{ marginBottom: 24, display: 'inline-flex' }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#207eff', display: 'inline-block' }} />
            CLIENT REPORTS
          </div>
          <h2 style={{
            fontFamily: 'Orbitron', fontWeight: 900,
            fontSize: 'clamp(28px, 4vw, 60px)',
            color: '#fff', letterSpacing: 2, lineHeight: 1.1, margin: 0,
          }}>
            FIELD <span style={{ color: '#207eff', textShadow: '0 0 40px rgba(32,126,255,0.5)' }}>INTELLIGENCE</span>
          </h2>
        </div>

        {/* Cards grid: 1 col → 2 col */}
        <div
          className="reveal"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 460px), 1fr))',
            gap: 2,
          }}
        >
          {testimonials.map((t, i) => (
            <div
              key={t.name}
              className="glow-card"
              style={{
                padding: 'clamp(24px, 3vw, 36px) clamp(20px, 3vw, 32px)',
                cursor: 'pointer',
                borderLeft: `3px solid ${i === active ? t.color : '#1a2d47'}`,
                borderColor: i === active ? t.color : '#1a2d47',
                background: i === active
                  ? 'linear-gradient(145deg, #101c2e, #0d1828)'
                  : 'linear-gradient(145deg, #0a1220, #080f1a)',
                opacity: i === active ? 1 : 0.7,
                transition: 'all 0.4s ease',
              }}
              onClick={() => setActive(i)}
            >
              {/* top row */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
                <div style={{ fontFamily: 'Share Tech Mono', fontSize: 8, letterSpacing: 3, color: t.color, opacity: 0.7 }}>{t.org}</div>
                <div style={{ display: 'flex', gap: 2 }}>
                  {[...Array(t.stars)].map((_, si) => (
                    <svg key={si} width="12" height="12" viewBox="0 0 24 24" fill="#f59e0b" stroke="none">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                    </svg>
                  ))}
                </div>
              </div>

              <div style={{
                fontFamily: 'Orbitron', fontSize: 48, lineHeight: 0.8, marginBottom: 16, opacity: 0.4,
                color: i === active ? t.color : '#1a2d47', transition: 'color 0.4s',
              }}>&ldquo;</div>

              <p style={{
                fontFamily: 'Rajdhani', fontSize: 'clamp(14px, 1.5vw, 16px)',
                color: i === active ? '#c8d8eb' : '#8099b8',
                lineHeight: 1.75, marginBottom: 24, transition: 'color 0.4s',
              }}>
                {t.text}
              </p>

              <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                <div style={{
                  width: 44, height: 44, flexShrink: 0,
                  background: `linear-gradient(135deg, ${t.color}, ${t.color}80)`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontFamily: 'Orbitron', fontWeight: 700, fontSize: 13, color: '#fff',
                }}>
                  {t.initials}
                </div>
                <div>
                  <div style={{ fontFamily: 'Orbitron', fontWeight: 600, fontSize: 12, color: '#fff', letterSpacing: 1 }}>{t.name}</div>
                  <div style={{ fontFamily: 'Share Tech Mono', fontSize: 10, color: '#8099b8', marginTop: 3 }}>{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Indicator dots */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginTop: 40 }}>
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              style={{
                height: 3, border: 'none', cursor: 'pointer', borderRadius: 2,
                background: i === active ? '#207eff' : '#1a2d47',
                boxShadow: i === active ? '0 0 10px #207eff' : 'none',
                transition: 'all 0.4s',
                width: i === active ? 32 : 12,
              }}
            />
          ))}
        </div>

      </div>
    </section>
  )
}