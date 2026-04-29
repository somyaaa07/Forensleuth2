'use client'

import { useEffect, useRef, useState } from 'react'

const gallery = [
  { src: '/1.jpeg',  size: 'large' },
  { src: '/6.jpeg',  size: 'small' },
  { src: '/16.PNG', size: 'small' },
  { src: '/17.jpeg', size: 'small' },
  { src: '/15.jpeg', size: 'small' },
  { src: '/19.jpeg', size: 'large' },
]

const events = [
  {
    dateNum: '14', dateMonth: 'MAY', year: '2025',
    title: 'Annual Cyber Forensics Summit 2025',
    desc: 'Join industry leaders for a full-day summit on emerging threats and forensic methodologies.',
    loc: 'New Delhi Convention Centre',
    type: 'SUMMIT', color: '#207eff', colorBg: 'rgba(32,126,255,0.08)', colorBorder: 'rgba(32,126,255,0.25)',
  },
  {
    dateNum: '03', dateMonth: 'JUN', year: '2025',
    title: 'Mobile Forensics Masterclass — Advanced Module',
    desc: 'Hands-on workshop covering advanced extraction and analysis of mobile device evidence.',
    loc: 'Mumbai, Maharashtra',
    type: 'WORKSHOP', color: '#fa5330', colorBg: 'rgba(250,83,48,0.08)', colorBorder: 'rgba(250,83,48,0.25)',
  },
  {
    dateNum: '20', dateMonth: 'JUL', year: '2025',
    title: 'Digital Evidence Law Symposium',
    desc: 'A symposium bridging legal frameworks and technical practices in digital evidence handling.',
    loc: 'Bangalore, Karnataka',
    type: 'SYMPOSIUM', color: '#207eff', colorBg: 'rgba(32,126,255,0.08)', colorBorder: 'rgba(32,126,255,0.25)',
  },
]

export default function Gallery() {
  const [hov, setHov] = useState(null)
  const ref = useRef(null)

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible') }),
      { threshold: 0.08 }
    )
    ref.current?.querySelectorAll('.reveal').forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  return (
    <section
      id="gallery"
      ref={ref}
      style={{ padding: 'clamp(60px, 8vw, 120px) 0', background: '#080f1a', position: 'relative', overflow: 'hidden' }}
    >
      <style>{`
        /* Gallery grid — 3 breakpoints */
        .gallery-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          grid-template-rows: 260px 260px;
          gap: 6px;
        }
        .gallery-tile-span2 { grid-column: span 2; }

        /* Tablet: 2 equal cols, each tile takes 1 col, large tiles span 2 */
        @media (max-width: 900px) {
          .gallery-grid {
            grid-template-columns: repeat(2, 1fr);
            grid-template-rows: repeat(4, 200px);
          }
        }

        /* Mobile: single column, all tiles equal height */
        @media (max-width: 540px) {
          .gallery-grid {
            grid-template-columns: 1fr;
            grid-template-rows: repeat(6, 180px);
          }
          .gallery-tile-span2 {
            grid-column: span 1 !important;
          }
        }

        /* Event card layout */
        .event-card-inner {
          display: grid;
          grid-template-columns: auto 1fr auto;
          align-items: center;
          gap: 28px;
        }
        @media (max-width: 700px) {
          .event-card-inner {
            grid-template-columns: auto 1fr;
            gap: 16px;
          }
          .event-cta { display: none; }
        }
        @media (max-width: 480px) {
          .event-card-inner {
            grid-template-columns: 1fr;
            gap: 12px;
          }
          .event-date-block { display: flex !important; flex-direction: row !important; align-items: center; gap: 10px; width: auto !important; height: auto !important; padding: 8px 12px !important; }
        }

        /* Events header */
        .events-header {
          display: flex;
          align-items: center;
          gap: 20px;
          margin-bottom: 36px;
          flex-wrap: wrap;
        }
      `}</style>

      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 clamp(16px, 4vw, 40px)', position: 'relative' }}>

        {/* ── Section Header ── */}
        <div className="reveal" style={{ textAlign: 'center', marginBottom: 'clamp(40px, 6vw, 72px)' }}>
          <div className="sys-tag" style={{ marginBottom: 20, display: 'inline-flex' }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#207eff', display: 'inline-block' }} />
            GALLERY & EVENTS
          </div>
          <h2 style={{
            fontFamily: 'Orbitron', fontWeight: 900,
            fontSize: 'clamp(26px, 4vw, 56px)',
            color: '#fff', letterSpacing: 2, margin: 0,
          }}>
            INSIDE <span style={{ color: '#207eff', textShadow: '0 0 40px rgba(32,126,255,0.4)' }}>FORENSLEUTH</span>
          </h2>
          <p style={{ fontFamily: 'Rajdhani', fontSize: 'clamp(14px, 2vw, 16px)', color: '#5a7a9a', marginTop: 12, letterSpacing: 0.5 }}>
            A glimpse into our labs, operations, and community events
          </p>
        </div>

        {/* ── Gallery Grid ── */}
        <div className="reveal" style={{ marginBottom: 'clamp(48px, 8vw, 96px)' }}>
          <div className="gallery-grid">
            {/* Row 1 */}
            <GalleryTile item={gallery[0]} i={0} hov={hov} setHov={setHov} extraClass="gallery-tile-span2" />
            <GalleryTile item={gallery[1]} i={1} hov={hov} setHov={setHov} />
            <GalleryTile item={gallery[2]} i={2} hov={hov} setHov={setHov} />

            {/* Row 2 */}
            <GalleryTile item={gallery[3]} i={3} hov={hov} setHov={setHov} />
            <GalleryTile item={gallery[4]} i={4} hov={hov} setHov={setHov} />
            <GalleryTile item={gallery[5]} i={5} hov={hov} setHov={setHov} extraClass="gallery-tile-span2" />
          </div>
        </div>

   

      </div>
    </section>
  )
}

/* ── Gallery Tile sub-component ── */
function GalleryTile({ item, i, hov, setHov, extraClass = '' }) {
  const isHovered = hov === i
  return (
    <div
      className={extraClass}
      style={{
        position: 'relative', overflow: 'hidden', cursor: 'pointer',
      }}
      onMouseEnter={() => setHov(i)}
      onMouseLeave={() => setHov(null)}
    >
      <img
        src={item.src}
        alt={item.label}
        style={{
          width: '100%', height: '100%', objectFit: 'cover', display: 'block',
          filter: `brightness(${isHovered ? 0.65 : 0.38}) contrast(1.1) saturate(${isHovered ? 1 : 0.4})`,
          transform: isHovered ? 'scale(1.07)' : 'scale(1)',
          transition: 'all 0.55s ease',
        }}
      />

      {/* Corner brackets on hover */}
      <div style={{
        position: 'absolute', top: 10, left: 10, width: 18, height: 18,
        borderTop: '2px solid #207eff', borderLeft: '2px solid #207eff',
        opacity: isHovered ? 1 : 0, transition: 'opacity 0.3s',
      }} />
      <div style={{
        position: 'absolute', bottom: 10, right: 10, width: 18, height: 18,
        borderBottom: '2px solid #fa5330', borderRight: '2px solid #fa5330',
        opacity: isHovered ? 1 : 0, transition: 'opacity 0.3s',
      }} />

      {/* Index number top-right */}
      <div style={{
        position: 'absolute', top: 10, right: 14,
        fontFamily: 'Share Tech Mono', fontSize: 10, letterSpacing: 2,
        color: 'rgba(32,126,255,0.5)', opacity: isHovered ? 0 : 0.6,
        transition: 'opacity 0.3s',
      }}>
        {String(i + 1).padStart(2, '0')}
      </div>

      {/* Label overlay */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0,
        padding: '32px 16px 16px',
        background: 'linear-gradient(to top, rgba(3,6,13,0.92) 0%, transparent 100%)',
        transform: isHovered ? 'translateY(0)' : 'translateY(100%)',
        transition: 'transform 0.4s ease',
      }}>
        <span style={{
          fontFamily: 'Orbitron', fontSize: 10, letterSpacing: 2.5,
          color: '#fff', fontWeight: 600, textTransform: 'uppercase',
        }}>
          {item.label}
        </span>
      </div>
    </div>
  )
}