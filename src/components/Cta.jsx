'use client'
import Link from 'next/link'
export default function CTASection() {
  return (
    <section style={{ position: 'relative', padding: '120px 0', background: '#03060d', overflow: 'hidden' }}>
      {/* Full image BG */}
      <div style={{ position: 'absolute', inset: 0 }}>
        <img
          src="https://i.pinimg.com/736x/ca/91/86/ca918609ee373629ddac7483de1b3c06.jpg"
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
          <Link href="/contact" >
          <button className="btn-solid" onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}>
            <span>Initiate Investigation</span>
          </button>
          </Link>
          <Link href="/services" >
          <button className="btn-run-border" onClick={() => document.querySelector('#services')?.scrollIntoView({ behavior: 'smooth' })}>
            <span>View All Services</span>
          </button>
          </Link>
        </div>

      
      </div>
    </section>
  )
}