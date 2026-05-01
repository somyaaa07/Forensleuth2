'use client'

import { useState, useRef, useEffect } from 'react'

const contactInfo = [
  {
    svg: (<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>),
    label: 'LOCATION', val: 'Forensleuth ', sub: 'Greater Noida',
  },
  {
    svg: (<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 13a19.79 19.79 0 01-3.07-8.67A2 2 0 012 2.18h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7a2 2 0 011.72 2.02z"/></svg>),
    label: 'COMMS', val: '+91 7840010208',
  },
  {
    svg: (<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>),
    label: 'SECURE MAIL', val: 'forensleuth@gmail.com , info@forensleuth.com', sub: '',
  },
]

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible') }),
      { threshold: 0.1 }
    )
    ref.current?.querySelectorAll('.reveal').forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => { setLoading(false); setSent(true) }, 1600)
  }

  const inputStyle = {
    width: '100%',
    background: '#0a1220',
    border: '1px solid #1a2d47',
    padding: '14px 16px',
    fontFamily: 'Share Tech Mono',
    fontSize: 13,
    color: '#c8d8eb',
    outline: 'none',
    transition: 'border-color 0.3s',
    letterSpacing: 0.5,
    boxSizing: 'border-box',
  }

  return (
    <section id="contact" ref={ref} style={{ padding: 'clamp(60px, 8vw, 120px) 0', background: '#03060d', position: 'relative', overflow: 'hidden' }}>

      <style>{`
        .contact-grid {
          display: grid;
          grid-template-columns: 0.8fr 1.2fr;
          gap: 4px;
        }
        .form-name-email {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
          margin-bottom: 16px;
        }
        @media (max-width: 900px) {
          .contact-grid {
            grid-template-columns: 1fr !important;
          }
        }
        @media (max-width: 540px) {
          .form-name-email {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>

      <div style={{ maxWidth: 1380, margin: '0 auto', padding: '0 clamp(16px, 4vw, 40px)' }}>
        {/* Header */}
        <div className="reveal" style={{ textAlign: 'center', marginBottom: 'clamp(40px, 6vw, 72px)' }}>
          <div className="sys-tag" style={{ marginBottom: 24, display: 'inline-flex' }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#207eff', display: 'inline-block' }} />
            SECURE CONTACT
          </div>
          <h2 style={{ fontFamily: 'Orbitron', fontWeight: 900, fontSize: 'clamp(28px, 4vw, 64px)', color: '#fff', letterSpacing: 2, lineHeight: 1.1 }}>
            INITIATE <span style={{ color: '#207eff', textShadow: '0 0 40px rgba(32,126,255,0.5)' }}>INVESTIGATION</span>
          </h2>
          <p style={{ fontFamily: 'Rajdhani', fontSize: 'clamp(15px, 2vw, 18px)', color: '#8099b8', marginTop: 16, maxWidth: 480, margin: '16px auto 0' }}>
            All communications are encrypted and handled under strict NDA protocols.
          </p>
        </div>

        <div className="contact-grid reveal">
          {/* LEFT: Contact info */}
          <div>
            <div style={{ position: 'relative', marginBottom: 4, overflow: 'hidden', height: 'clamp(160px, 20vw, 220px)' }}>
              <img
                src="12.jpeg"
                alt="Location"
                style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.35) saturate(0.4) contrast(1.1)' }}
              />
              <div className="hex-grid" style={{ position: 'absolute', inset: 0, mixBlendMode: 'overlay' }} />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent, rgba(3,6,13,0.8))' }} />
              <div style={{ position: 'absolute', bottom: 16, left: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
                <div style={{ width: 8, height: 8, background: '#fa5330', boxShadow: '0 0 12px #fa5330', borderRadius: '50%' }} />
                <span style={{ fontFamily: 'Orbitron', fontSize: 9, letterSpacing: 3, color: '#fa5330' }}>Greater Noida</span>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              {contactInfo.map((c) => (
                <div key={c.label} style={{ background: '#0d1626', border: '1px solid #1a2d47', padding: 'clamp(14px, 2vw, 20px) clamp(16px, 2.5vw, 24px)', display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                  <div style={{ width: 40, height: 40, background: 'rgba(32,126,255,0.08)', border: '1px solid #1a2d47', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#207eff', flexShrink: 0 }}>
                    {c.svg}
                  </div>
                  <div style={{ minWidth: 0 }}>
                    <div style={{ fontFamily: 'Share Tech Mono', fontSize: 8, letterSpacing: 3, color: '#207eff', marginBottom: 4, opacity: 0.7 }}>{c.label}</div>
                    <div style={{ fontFamily: 'Orbitron', fontWeight: 600, fontSize: 'clamp(10px, 1.2vw, 12px)', color: '#fff', marginBottom: 3, letterSpacing: 0.5, wordBreak: 'break-word' }}>{c.val}</div>
                    <div style={{ fontFamily: 'Rajdhani', fontSize: 13, color: '#8099b8' }}>{c.sub}</div>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ background: '#0d1626', border: '1px solid rgba(32,126,255,0.2)', padding: '16px 20px', marginTop: 4, display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
              <div className="live-dot" />
              <span style={{ fontFamily: 'Share Tech Mono', fontSize: 10, letterSpacing: 2, color: '#22c55e' }}>SYSTEM ONLINE</span>
              <span style={{ marginLeft: 'auto', fontFamily: 'Share Tech Mono', fontSize: 9, color: '#8099b8', letterSpacing: 1 }}>AVG RESPONSE: 1.8H</span>
            </div>
          </div>

          {/* RIGHT: Form */}
          <div style={{ background: '#0d1626', border: '1px solid #1a2d47' }}>
            {sent ? (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', padding: 'clamp(32px, 5vw, 60px)', textAlign: 'center' }}>
                <div style={{ width: 64, height: 64, background: 'rgba(32,126,255,0.1)', border: '1px solid rgba(32,126,255,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 24, color: '#207eff' }}>
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                </div>
                <div style={{ fontFamily: 'Orbitron', fontWeight: 800, fontSize: 'clamp(16px, 3vw, 22px)', color: '#207eff', letterSpacing: 2, marginBottom: 12 }}>TRANSMISSION RECEIVED</div>
                <p style={{ fontFamily: 'Rajdhani', fontSize: 16, color: '#8099b8', marginBottom: 32 }}>Our team will review your inquiry and respond within 2 business hours.</p>
                <button className="btn-run-border" onClick={() => setSent(false)}><span>New Message</span></button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ padding: 'clamp(20px, 4vw, 40px)' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 32, paddingBottom: 20, borderBottom: '1px solid #1a2d47', flexWrap: 'wrap', gap: 8 }}>
                  <div style={{ fontFamily: 'Orbitron', fontSize: 10, letterSpacing: 3, color: '#207eff' }}>SECURE_TRANSMISSION</div>
                  <div style={{ display: 'flex', gap: 4 }}>
                    <div style={{ width: 8, height: 8, background: '#1a2d47', borderRadius: '50%' }} />
                    <div style={{ width: 8, height: 8, background: '#207eff', borderRadius: '50%' }} />
                    <div style={{ width: 8, height: 8, background: '#1a2d47', borderRadius: '50%' }} />
                  </div>
                </div>

                <div className="form-name-email">
                  <div>
                    <div style={{ fontFamily: 'Share Tech Mono', fontSize: 9, letterSpacing: 3, color: '#8099b8', marginBottom: 8 }}>FULL_NAME *</div>
                    <input
                      style={inputStyle}
                      placeholder="John Doe"
                      value={form.name}
                      onChange={e => setForm({ ...form, name: e.target.value })}
                      required
                      onFocus={e => e.target.style.borderColor = '#207eff'}
                      onBlur={e => e.target.style.borderColor = '#1a2d47'}
                    />
                  </div>
                  <div>
                    <div style={{ fontFamily: 'Share Tech Mono', fontSize: 9, letterSpacing: 3, color: '#8099b8', marginBottom: 8 }}>EMAIL_ADDR *</div>
                    <input
                      style={inputStyle}
                      type="email"
                      placeholder="agent@org.com"
                      value={form.email}
                      onChange={e => setForm({ ...form, email: e.target.value })}
                      required
                      onFocus={e => e.target.style.borderColor = '#207eff'}
                      onBlur={e => e.target.style.borderColor = '#1a2d47'}
                    />
                  </div>
                </div>

                <div style={{ marginBottom: 16 }}>
                  <div style={{ fontFamily: 'Share Tech Mono', fontSize: 9, letterSpacing: 3, color: '#8099b8', marginBottom: 8 }}>SUBJECT_LINE</div>
                  <input
                    style={inputStyle}
                    placeholder="e.g., Incident Response Inquiry"
                    value={form.subject}
                    onChange={e => setForm({ ...form, subject: e.target.value })}
                    onFocus={e => e.target.style.borderColor = '#207eff'}
                    onBlur={e => e.target.style.borderColor = '#1a2d47'}
                  />
                </div>

                <div style={{ marginBottom: 24 }}>
                  <div style={{ fontFamily: 'Share Tech Mono', fontSize: 9, letterSpacing: 3, color: '#8099b8', marginBottom: 8 }}>MESSAGE_BODY *</div>
                  <textarea
                    style={{ ...inputStyle, resize: 'none', height: 140 }}
                    placeholder="Describe your case, incident, or investigation requirements..."
                    value={form.message}
                    onChange={e => setForm({ ...form, message: e.target.value })}
                    required
                    onFocus={e => e.target.style.borderColor = '#207eff'}
                    onBlur={e => e.target.style.borderColor = '#1a2d47'}
                  />
                </div>

                <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12, marginBottom: 28 }}>
                  <input type="checkbox" id="nda" required style={{ marginTop: 2, accentColor: '#207eff', flexShrink: 0 }} />
                  <label htmlFor="nda" style={{ fontFamily: 'Rajdhani', fontSize: 13, color: '#8099b8', lineHeight: 1.5 }}>
                    I acknowledge that all communications are handled under ForensLeuth&apos;s confidentiality protocols and privacy policy.
                  </label>
                </div>

                <button type="submit" className="btn-solid" style={{ width: '100%' }} disabled={loading}>
                  {loading ? (
                    <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10 }}>
                      <svg style={{ animation: 'spin 1s linear infinite' }} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M21 12a9 9 0 11-6.219-8.56"/></svg>
                      TRANSMITTING...
                    </span>
                  ) : (
                    <span>SEND SECURE MESSAGE</span>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}