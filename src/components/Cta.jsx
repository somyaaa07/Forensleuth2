'use client'

export default function CTASection() {
  return (
    <section style={{ position: 'relative', padding: '120px 0', background: '#03060d', overflow: 'hidden' }}>
      {/* Full image BG */}
      <div style={{ position: 'absolute', inset: 0 }}>
        <img
          src="https://images.unsplash.com/photo-1510511459019-5dda7724fd87?w=1920&q=80"
          alt=""
          style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.18) saturate(0.4)' }}
        />
      </div>

      {/* Overlays */}
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(3,6,13,0.97) 0%, rgba(8,15,26,0.85) 50%, rgba(3,6,13,0.92) 100%)' }} />

      {/* Glow */}

  
      <div style={{ position: 'relative', zIndex: 10, maxWidth: 1300, margin: '0 auto', padding: '0 40px', textAlign: 'center' }}>
        {/* Status */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, marginBottom: 32 }}>
          <div style={{ height: 1, width: 48, background: 'linear-gradient(90deg, transparent, #207eff)' }} />
          <div className="live-dot" />
          <span style={{ fontFamily: 'Orbitron', fontSize: 9, letterSpacing: 4, color: '#207eff' }}>SYSTEMS ONLINE :: READY TO ENGAGE</span>
          <div className="live-dot" />
          <div style={{ height: 1, width: 48, background: 'linear-gradient(90deg, #207eff, transparent)' }} />
        </div>

        <h2 style={{ fontFamily: 'Orbitron', fontWeight: 900, fontSize: 'clamp(40px, 6vw, 88px)', color: '#fff', letterSpacing: 2, lineHeight: 1.0, marginBottom: 28 }}>
          EVIDENCE<br />
          <span style={{ color: '#207eff', textShadow: '0 0 60px rgba(32,126,255,0.7)' }}>DOESN&apos;T LIE.</span><br />
          WE FIND IT.
        </h2>

        {/* Decorative line */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16, marginBottom: 28 }}>
          <div style={{ height: 1, width: 80, background: 'linear-gradient(90deg, transparent, #1a2d47)' }} />
          <div style={{ width: 6, height: 6, background: '#fa5330', transform: 'rotate(45deg)', boxShadow: '0 0 10px #fa5330' }} />
          <div style={{ height: 1, width: 80, background: 'linear-gradient(90deg, #1a2d47, transparent)' }} />
        </div>

        <p style={{ fontFamily: 'Rajdhani', fontSize: 20, color: '#8099b8', maxWidth: 640, margin: '0 auto 52px', lineHeight: 1.7 }}>
          Whether you&apos;re facing a cyber incident, legal dispute, or compliance audit — ForensLeuth delivers answers with the precision that courts and corporations demand.
        </p>

        <div style={{ display: 'flex', gap: 20, justifyContent: 'center', flexWrap: 'wrap' }}>
          <button className="btn-solid" onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}>
            <span>Initiate Investigation</span>
          </button>
          <button className="btn-run-border" onClick={() => document.querySelector('#services')?.scrollIntoView({ behavior: 'smooth' })}>
            <span>View All Services</span>
          </button>
        </div>

        {/* Trust row */}
        <div style={{ marginTop: 72, paddingTop: 48, borderTop: '1px solid #1a2d47', display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '12px 48px' }}>
          {['ISO 17025 Accredited', 'SWGDE Compliant', 'DOJ Certified', 'INTERPOL Partner', 'ISO 27001 Secure'].map((b) => (
            <div key={b} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#207eff" strokeWidth="2.5">
                <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
              </svg>
              <span style={{ fontFamily: 'Share Tech Mono', fontSize: 10, letterSpacing: 1.5, color: '#8099b8' }}>{b}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}