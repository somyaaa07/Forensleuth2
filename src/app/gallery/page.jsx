'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import Link from 'next/link'

const GLOBAL_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@700;900&family=Rajdhani:wght@400;600&family=Share+Tech+Mono&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html { scroll-behavior: smooth; }
  body { background: #03060d; color: #c8d8eb; font-family: 'Rajdhani', sans-serif; overflow-x: hidden; }

  .font-orbitron { font-family: 'Orbitron', sans-serif; }
  .font-rajdhani { font-family: 'Rajdhani', sans-serif; }
  .font-mono-fl  { font-family: 'Share Tech Mono', monospace; }

  .hex-grid {
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='56' height='100'%3E%3Cpath d='M28 66L0 50V17L28 0l28 17v33L28 66zm0-2l26-15V19L28 2 2 19v30L28 64z' fill='%23207eff' fill-opacity='0.035'/%3E%3C/svg%3E");
    background-size: 56px 100px;
  }
  .hex-grid-bright {
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='56' height='100'%3E%3Cpath d='M28 66L0 50V17L28 0l28 17v33L28 66zm0-2l26-15V19L28 2 2 19v30L28 64z' fill='%23207eff' fill-opacity='0.065'/%3E%3C/svg%3E");
    background-size: 56px 100px;
  }
  .dot-grid {
    background-image: radial-gradient(circle, #1a2d47 1px, transparent 1px);
    background-size: 24px 24px;
  }

  @keyframes scanMove { 0%{top:-4px;opacity:1} 95%{opacity:1} 100%{top:100%;opacity:0} }
  .scan-line {
    position:absolute; left:0; right:0; height:2px; pointer-events:none;
    background:linear-gradient(90deg,transparent,rgba(32,126,255,0.14) 40%,rgba(32,126,255,0.22) 50%,rgba(32,126,255,0.14) 60%,transparent);
    animation:scanMove 7s linear infinite;
  }

  @keyframes pulseDot { 0%,100%{opacity:1;transform:scale(1);box-shadow:0 0 6px #22c55e} 50%{opacity:.5;transform:scale(.75);box-shadow:0 0 2px #22c55e} }
  .live-dot {
    width:7px;height:7px;border-radius:50%;background:#22c55e;
    display:inline-block;flex-shrink:0;
    animation:pulseDot 2s ease-in-out infinite;
    box-shadow:0 0 6px #22c55e;
  }

  .reveal { opacity:0;transform:translateY(28px);transition:opacity .65s cubic-bezier(.22,1,.36,1),transform .65s cubic-bezier(.22,1,.36,1); }
  .reveal.visible { opacity:1;transform:translateY(0); }

  @keyframes glowPulse { 0%,100%{box-shadow:0 0 12px rgba(32,126,255,.4),0 0 24px rgba(32,126,255,.15)} 50%{box-shadow:0 0 22px rgba(32,126,255,.65),0 0 44px rgba(32,126,255,.25)} }
  .btn-glow { animation:glowPulse 3s ease-in-out infinite; }

  .btn-primary {
    background:#207eff;color:#fff;
    font-family:'Orbitron',sans-serif;font-size:11px;letter-spacing:3px;
    padding:14px 36px;border:none;border-radius:4px;cursor:pointer;
    text-transform:uppercase;
    transition:background .2s,box-shadow .2s,transform .15s;
    display:inline-flex;align-items:center;gap:10px;
  }
  .btn-primary:hover { background:#1a6ae0;transform:translateY(-2px);box-shadow:0 6px 24px rgba(32,126,255,.4); }

  .btn-outline-fl {
    background:transparent;color:#207eff;
    font-family:'Orbitron',sans-serif;font-size:11px;letter-spacing:3px;
    padding:13px 36px;border:1px solid #207eff;border-radius:4px;cursor:pointer;
    text-transform:uppercase;
    transition:background .2s,box-shadow .2s,transform .15s;
    display:inline-flex;align-items:center;gap:10px;
  }
  .btn-outline-fl:hover { background:rgba(32,126,255,.1);transform:translateY(-2px); }

  .filter-pill {
    font-family:'Share Tech Mono',monospace;font-size:10px;letter-spacing:2px;
    text-transform:uppercase;padding:8px 16px;border-radius:20px;cursor:pointer;
    border:1px solid #1e3352;background:rgba(6,13,24,.7);color:#4a7ab5;
    transition:all .22s ease;white-space:nowrap;
  }
  .filter-pill:hover { border-color:rgba(32,126,255,.5);color:#7fb3ff;background:rgba(32,126,255,.06); }
  .filter-pill.active {
    border-color:#207eff;color:#fff;background:rgba(32,126,255,.12);
    box-shadow:0 0 14px rgba(32,126,255,.3);
  }

  .pin-card {
    position:relative;overflow:hidden;cursor:pointer;border-radius:12px;
    background:#0a0f1c;border:1px solid #1a2d47;
    transition:all .3s cubic-bezier(.22,1,.36,1);
    box-shadow:0 4px 12px rgba(0,0,0,0.3);
    break-inside:avoid;margin-bottom:20px;
  }
  .pin-card:hover { border-color:rgba(32,126,255,.6);box-shadow:0 8px 28px rgba(32,126,255,.15),0 12px 40px rgba(0,0,0,.4);transform:translateY(-4px); }
  .pin-img { width:100%;display:block;object-fit:cover;transition:transform .4s cubic-bezier(.22,1,.36,1),filter .3s ease; }
  .pin-card:hover .pin-img { transform:scale(1.05);filter:brightness(0.95); }
  .pin-content { padding:14px 12px;background:#060d18;border-top:1px solid #1a2d47; }
  .pin-title { font-family:'Orbitron',sans-serif;font-weight:700;color:#fff;font-size:12px;letter-spacing:0.05em;line-height:1.35;margin-bottom:8px;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden; }
  .pin-overlay { position:absolute;inset:0;background:rgba(3,6,13,0.7);display:flex;align-items:center;justify-content:center;opacity:0;transition:opacity .3s ease;backdrop-filter:blur(4px); }
  .pin-card:hover .pin-overlay { opacity:1; }
  .pin-action { width:52px;height:52px;border:2px solid #207eff;background:rgba(32,126,255,0.15);border-radius:50%;display:flex;align-items:center;justify-content:center;color:#207eff;transition:all .2s; }

  /* Masonry — CHANGE 1: column-gap badha, mobile gap bhi */
  .masonry-container { column-count:4;column-gap:20px; }
  @media(max-width:1280px) { .masonry-container { column-count:3; } }
  @media(max-width:768px)  { .masonry-container { column-count:2;column-gap:14px; } .pin-card { margin-bottom:14px; } }
  @media(max-width:480px)  { .masonry-container { column-count:1; } }

  .cat-badge { font-family:'Share Tech Mono',monospace;font-size:8px;letter-spacing:2px;text-transform:uppercase;padding:4px 10px;border-radius:2px;display:inline-block; }

  @keyframes modalIn { from{opacity:0;transform:scale(.93)} to{opacity:1;transform:scale(1)} }
  @keyframes backdropIn { from{opacity:0} to{opacity:1} }
  .lightbox-backdrop { position:fixed;inset:0;z-index:999;background:rgba(1,3,8,.92);backdrop-filter:blur(10px);animation:backdropIn .25s ease;display:flex;align-items:center;justify-content:center;padding:16px; }
  .lightbox-panel { position:relative;max-width:1100px;width:100%;background:#060d18;border:1px solid #1e3352;animation:modalIn .28s cubic-bezier(.22,1,.36,1);max-height:90vh;overflow:hidden;display:flex;flex-direction:column;border-radius:12px; }

  /* Lightbox layout responsive */
  .lightbox-body { display:flex;flex:1;overflow:hidden;max-height:calc(90vh - 60px); }
  .lightbox-img-pane { position:relative;flex:1 1 60%;background:#030609;display:flex;align-items:center;justify-content:center;min-height:220px; }
  .lightbox-info-pane { flex:0 0 300px;padding:24px;border-left:1px solid #1a2d47;background:#060d18;overflow-y:auto;display:flex;flex-direction:column;gap:16px; }
  @media(max-width:640px) {
    .lightbox-body { flex-direction:column; }
    .lightbox-info-pane { flex:none;border-left:none;border-top:1px solid #1a2d47;max-height:220px; }
    .lightbox-img-pane { min-height:200px; }
  }

  .nav-arrow { width:44px;height:44px;border:1px solid #1e3352;background:rgba(6,13,24,.8);color:#8099b8;cursor:pointer;display:flex;align-items:center;justify-content:center;transition:all .2s;flex-shrink:0;border-radius:6px; }
  .nav-arrow:hover { border-color:#207eff;color:#207eff;background:rgba(32,126,255,.1); }
  .nav-arrow:disabled { opacity:.25;cursor:not-allowed; }

  /* CHANGE 2: featured-card img height 220px → 340px */
  .featured-card { position:relative;overflow:hidden;cursor:pointer;border:1px solid #1a2d47;background:#0a0f1c;border-radius:12px;transition:border-color .3s,box-shadow .3s,transform .3s; }
  .featured-card:hover { border-color:rgba(250,83,48,.5);box-shadow:0 0 28px rgba(250,83,48,.12),0 12px 40px rgba(0,0,0,.5);transform:translateY(-5px); }
  .featured-card img { width:100%;height:340px;object-fit:cover;display:block;transition:transform .5s cubic-bezier(.22,1,.36,1); }
  .featured-card:hover img { transform:scale(1.06); }

  .cta-strip { background:linear-gradient(135deg,#060d18 0%,#0a1628 40%,#060d18 100%);border-top:1px solid #1a2d47;border-bottom:1px solid #1a2d47; }

  /* Filter scroll on mobile */
  .filter-row { display:flex;align-items:center;justify-content:center;gap:8px;flex-wrap:wrap; }
  @media(max-width:540px) { .filter-row { flex-wrap:nowrap;overflow-x:auto;justify-content:flex-start;padding-bottom:8px;-webkit-overflow-scrolling:touch; } }

  .cta-btns { display:flex;align-items:center;justify-content:center;gap:16px;flex-wrap:wrap; }
  @media(max-width:540px) { .cta-btns { flex-direction:column;align-items:center; } }
`

const GALLERY_ITEMS = [
  { id: 1,          image: '/1.jpeg', description: 'Students learning advanced fingerprint lifting and comparison techniques using real forensic equipment in a controlled lab setting.' },
  { id: 2,          image: '/2.jpeg', description: 'Certified investigators performing mobile forensics and data recovery from seized digital devices using Cellebrite and FTK.' },
  { id: 3,   image: '/3.jpeg', description: 'Live demonstration of our Forensleuth DIY Crime Scene Kit.' },
  { id: 4,              image: '/4.jpeg', description: 'Intensive 3-day CSIRT training program covering incident triage, log analysis, malware sandboxing, and network forensics.' },
  { id: 5,             image: '/5.jpeg', description: 'National-level seminar bringing together 200+ forensic professionals and academic researchers.' },
  { id: 6,          image: '/6.jpeg', description: 'Questioned document examiners analysing suspected forged signatures using ESDA, VSC, and infrared spectroscopy.' },
  { id: 7,              image: '/8.jpeg', description: 'Forensleuth experts visiting secondary schools to introduce students to forensic science.' },
  { id: 8,               image: '/9.jpeg', description: 'Post-graduate trainees performing STR analysis under expert supervision.' },
  { id: 9,        image: '/16.PNG', description: 'New institutional kit bundle.' },
  { id: 10,                image: '/15.jpeg', description: 'Two-day summit with keynotes from CERT-In officials and hands-on CTF challenges.' },
  { id: 11,         image: '/17.jpeg', description: '3D photogrammetric mapping of a mock crime scene.' },
  { id: 12,         image: '/19.jpeg', description: 'Learning scale-accurate forensic photography techniques.' },
  { id: 13,        image: '/20.jpeg', description: 'New institutional kit bundle.' },
  { id: 10,                image: '/22.jpeg', description: 'Two-day summit with keynotes from CERT-In officials and hands-on CTF challenges.' },
  { id: 11,         image: '/23.jpeg', description: '3D photogrammetric mapping of a mock crime scene.' },
  { id: 12,         image: '/24.jpeg', description: 'Learning scale-accurate forensic photography techniques.' },
  { id: 9,        image: '/25.jpeg', description: 'New institutional kit bundle.' },
  { id: 10,                image: '/26.jpeg', description: 'Two-day summit with keynotes from CERT-In officials and hands-on CTF challenges.' },
  { id: 11,         image: '/27.jpeg', description: '3D photogrammetric mapping of a mock crime scene.' },
  { id: 12,         image: '/28.jpeg', description: 'Learning scale-accurate forensic photography techniques.' },
  { id: 9,        image: '/29.jpeg', description: 'New institutional kit bundle.' },
  { id: 10,                image: '/30.jpeg', description: 'Two-day summit with keynotes from CERT-In officials and hands-on CTF challenges.' },
  { id: 11,         image: '/31.jpeg', description: '3D photogrammetric mapping of a mock crime scene.' },
  { id: 12,         image: '/32.jpeg', description: 'Learning scale-accurate forensic photography techniques.' },
  { id: 9,        image: '/33.jpeg', description: 'New institutional kit bundle.' },
  { id: 10,                image: '/34.jpeg', description: 'Two-day summit with keynotes from CERT-In officials and hands-on CTF challenges.' },
  { id: 11,         image: '/35.jpeg', description: '3D photogrammetric mapping of a mock crime scene.' },
  { id: 12,         image: '/36.jpeg', description: 'Learning scale-accurate forensic photography techniques.' },
]

const FEATURED_ITEMS = [
  { id: 'f1', tag: 'CASE STUDY · CYBER', accent: '#207eff', image: '/21.jpeg' },
  { id: 'f2', tag: 'CASE STUDY · DOCUMENTS', accent: '#fa5330', image: '/25.jpeg' },
  { id: 'f3', tag: 'INITIATIVE · TRAINING', accent: '#207eff', image: '/26.jpeg' },
]

const CATEGORIES = ['All', 'Workshops', 'Investigation', 'Training', 'Kits & Tools', 'Events']

const CAT_COLORS = {
  'Workshops':    { bg: 'rgba(32,126,255,0.12)',  border: 'rgba(32,126,255,0.4)',  text: '#7fb3ff' },
  'Investigation':{ bg: 'rgba(250,83,48,0.12)',   border: 'rgba(250,83,48,0.4)',   text: '#ff9070' },
  'Training':     { bg: 'rgba(34,197,94,0.1)',    border: 'rgba(34,197,94,0.4)',   text: '#4ade80' },
  'Kits & Tools': { bg: 'rgba(168,85,247,0.1)',   border: 'rgba(168,85,247,0.4)',  text: '#c084fc' },
  'Events':       { bg: 'rgba(251,191,36,0.1)',   border: 'rgba(251,191,36,0.4)',  text: '#fbbf24' },
}

function useReveal() {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible') }),
      { threshold: 0.05 }
    )
    el.querySelectorAll('.reveal').forEach(n => obs.observe(n))
    return () => obs.disconnect()
  }, [])
  return ref
}

function SysTag({ children, accent = '#207eff' }) {
  return (
    <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:16 }}>
      <span style={{ width:6, height:6, borderRadius:'50%', background:accent, display:'inline-block', flexShrink:0 }} />
      <span className="font-mono-fl" style={{ fontSize:9, letterSpacing:'3px', textTransform:'uppercase', color:accent }}>{children}</span>
    </div>
  )
}

function CatBadge({ category }) {
  const c = CAT_COLORS[category] || { bg:'rgba(32,126,255,.1)', border:'rgba(32,126,255,.3)', text:'#7fb3ff' }
  return (
    <span className="cat-badge" style={{ background:c.bg, border:`1px solid ${c.border}`, color:c.text, marginBottom:6, display:'inline-block' }}>{category}</span>
  )
}

function HeroSection() {
  return (
    <section style={{ position:'relative', minHeight:'clamp(320px, 40vw, 520px)', display:'flex', alignItems:'center', justifyContent:'center', overflow:'hidden', paddingTop: 80 }}>
      <div style={{ position:'absolute', inset:0, background:'linear-gradient(135deg,#03060d 0%,#060f1e 40%,#04080f 70%,#03060d 100%)' }} />
      <div className="hex-grid-bright" style={{ position:'absolute', inset:0, opacity:0.85 }} />
      <div style={{ position:'absolute', top:'50%', left:'50%', transform:'translate(-50%,-50%)', width:'min(700px, 90vw)', height:320, borderRadius:'50%', pointerEvents:'none', background:'radial-gradient(ellipse,rgba(32,126,255,0.09) 0%,transparent 70%)' }} />

      <div style={{ position:'relative', zIndex:10, textAlign:'center', padding:'clamp(40px,6vw,60px) 24px clamp(32px,4vw,40px)' }}>
        <div style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:8, marginBottom:16 }}>
          <span className="font-mono-fl" style={{ fontSize:10, letterSpacing:'3px', textTransform:'uppercase', color:'#8099b8' }}>Home</span>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#207eff" strokeWidth="2"><path d="M9 18l6-6-6-6"/></svg>
          <span className="font-mono-fl" style={{ fontSize:10, letterSpacing:'3px', textTransform:'uppercase', color:'#207eff' }}>Gallery</span>
        </div>

        <h1 className="font-orbitron" style={{ fontWeight:900, color:'#fff', fontSize:'clamp(28px,6vw,60px)', letterSpacing:'0.06em', lineHeight:1.1, marginBottom:12 }}>
          FORENSIC <span style={{ color:'#207eff', textShadow:'0 0 48px rgba(32,126,255,0.55)' }}>PINS</span>
        </h1>
        <p className="font-rajdhani" style={{ fontSize:'clamp(14px,2vw,16px)', color:'#8099b8', maxWidth:500, margin:'0 auto', lineHeight:1.6 }}>
          Explore our investigative work, training, and forensic documentation.
        </p>
      </div>
    </section>
  )
}

function FilterBar({ active, onChange, counts }) {
  return (
    <section style={{ position:'relative', padding:'24px 0', background:'#080f1a', borderBottom:'1px solid #1a2d47', overflow:'hidden' }}>
      <div className="dot-grid" style={{ position:'absolute', inset:0, opacity:0.3 }} />
      <div style={{ position:'relative', maxWidth:1280, margin:'0 auto', padding:'0 16px' }}>
        <div className="filter-row">
          {CATEGORIES.map(cat => {
            const count = cat === 'All' ? GALLERY_ITEMS.length : counts[cat] || 0
            return (
              <button key={cat} className={`filter-pill${active === cat ? ' active' : ''}`} onClick={() => onChange(cat)}>
                {cat}<span style={{ marginLeft:6, opacity:0.6, fontSize:9 }}>({count})</span>
              </button>
            )
          })}
        </div>
      </div>
    </section>
  )
}

function MasonryGallery({ items, onOpen }) {
  const ref = useReveal()
  if (items.length === 0) {
    return <section style={{ padding:'80px 24px', textAlign:'center' }}><div style={{ color:'#4a6080', fontSize:14 }} className="font-mono-fl">NO RECORDS MATCH THIS FILTER</div></section>
  }

  return (
    <section ref={ref} style={{ position:'relative', padding:'40px 0', background:'#03060d', overflow:'hidden' }}>
      <div className="hex-grid" style={{ position:'absolute', inset:0, opacity:0.4 }} />
      <div style={{ position:'relative', maxWidth:1280, margin:'0 auto', padding:'0 16px' }}>
        <div className="masonry-container">
          {items.map((item, i) => (
            <div key={item.id} className="reveal pin-card" style={{ transitionDelay:`${(i % 8) * 0.05}s` }} onClick={() => onOpen(item)}>
              {/* CHANGE 3: minHeight 160 → 260 */}
              <div style={{ position:'relative', overflow:'hidden', background:'#000', minHeight:260 }}>
                <img src={item.image} alt={item.title} loading="lazy" className="pin-img" style={{ width:'100%', height:'auto', display:'block' }} />
                <div className="pin-overlay">
                  <div className="pin-action">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                  </div>
                </div>
              </div>
              <div className="pin-content">
                {/* <CatBadge category={item.category} /> */}
                {/* <div className="pin-title">{item.title}</div> */}
                <div className="font-mono-fl" style={{ fontSize:7, color:'rgba(32,126,255,0.5)', letterSpacing:'2px', textTransform:'uppercase' }}>FL-{String(item.id).padStart(3,'0')}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Lightbox({ item, items, onClose, onNav }) {
  const idx = items.findIndex(i => i.id === item.id)
  const hasPrev = idx > 0
  const hasNext = idx < items.length - 1

  useEffect(() => {
    const handler = e => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft' && hasPrev) onNav(items[idx - 1])
      if (e.key === 'ArrowRight' && hasNext) onNav(items[idx + 1])
    }
    window.addEventListener('keydown', handler)
    document.body.style.overflow = 'hidden'
    return () => { window.removeEventListener('keydown', handler); document.body.style.overflow = '' }
  }, [idx, hasPrev, hasNext, items, onClose, onNav])

  return (
    <div className="lightbox-backdrop" onClick={e => { if (e.target === e.currentTarget) onClose() }}>
      <div className="lightbox-panel">
        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'12px 16px', borderBottom:'1px solid #1a2d47', background:'#04080f', flexShrink:0 }}>
          <div style={{ display:'flex', alignItems:'center', gap:8 }}>
            <div className="live-dot" />
            <span className="font-mono-fl" style={{ fontSize:9, letterSpacing:'3px', color:'#22c55e', textTransform:'uppercase' }}>FL-{String(item.id).padStart(3,'0')}</span>
          </div>
          <div style={{ display:'flex', alignItems:'center', gap:8 }}>
            <span className="font-mono-fl" style={{ fontSize:8, letterSpacing:'2px', color:'#4a6080' }}>{idx + 1} / {items.length}</span>
            <button onClick={onClose} style={{ width:32, height:32, border:'1px solid #1e3352', background:'rgba(250,83,48,0.08)', color:'#fa5330', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', borderRadius:'6px' }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            </button>
          </div>
        </div>

        <div className="lightbox-body">
          <div className="lightbox-img-pane">
            <img src={item.image} alt={item.title} style={{ maxWidth:'100%', maxHeight:'100%', objectFit:'contain', display:'block' }} />
            <button className="nav-arrow" onClick={() => hasPrev && onNav(items[idx - 1])} disabled={!hasPrev} style={{ position:'absolute', left:8, top:'50%', transform:'translateY(-50%)' }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6"/></svg>
            </button>
            <button className="nav-arrow" onClick={() => hasNext && onNav(items[idx + 1])} disabled={!hasNext} style={{ position:'absolute', right:8, top:'50%', transform:'translateY(-50%)' }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6"/></svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

function FeaturedSection({ onOpen }) {
  const ref = useReveal()
  return (
    <section ref={ref} style={{ position:'relative', padding:'clamp(48px,6vw,80px) 0', background:'#080f1a', overflow:'hidden' }}>
      <div className="hex-grid-bright" style={{ position:'absolute', inset:0, opacity:0.5 }} />
      <div style={{ position:'relative', maxWidth:1280, margin:'0 auto', padding:'0 16px' }}>
        <div className="reveal" style={{ marginBottom:40 }}>
          <SysTag accent="#fa5330">Featured Cases</SysTag>
          <h2 className="font-orbitron" style={{ fontWeight:900, color:'#fff', fontSize:'clamp(22px,4vw,44px)', letterSpacing:'0.08em' }}>
            LANDMARK <span style={{ color:'#fa5330', textShadow:'0 0 30px rgba(250,83,48,0.45)' }}>CASES</span>
          </h2>
        </div>

        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(min(100%,280px),1fr))', gap:20 }}>
          {FEATURED_ITEMS.map((item, i) => (
            <div key={item.id} className="reveal featured-card" style={{ transitionDelay:`${i * 0.12}s`, cursor:'pointer' }} onClick={() => onOpen({ ...item, id:item.id, category: item.tag.split(' · ')[1] || 'Investigation' })}>
              <div style={{ height:3, background:`linear-gradient(90deg,${item.accent},transparent)` }} />
              <div style={{ overflow:'hidden', position:'relative' }}>
                <img src={item.image} alt={item.title} loading="lazy" style={{ width:'100%', height:340, objectFit:'cover', display:'block' }} />
                <div style={{ position:'absolute', inset:0, background:'linear-gradient(to top,rgba(3,6,13,.85) 0%,rgba(3,6,13,.3) 60%,transparent 100%)' }} />
                <div style={{ position:'absolute', top:12, left:12 }}>
                  {/* <span className="font-mono-fl" style={{ fontSize:8, letterSpacing:'2px', padding:'4px 10px', border:`1px solid ${item.accent}66`, background:`${item.accent}18`, color:item.accent, textTransform:'uppercase' }}>{item.tag}</span> */}
                </div>
              </div>
              <div>
                {/* <h3 className="font-orbitron" style={{ fontWeight:900, color:'#fff', fontSize:14, letterSpacing:'0.08em', marginBottom:8, lineHeight:1.3 }}>{item.title}</h3> */}
                {/* <p className="font-rajdhani" style={{ fontSize:13, color:'#8099b8', lineHeight:1.6 }}>{item.description.substring(0, 100)}...</p> */}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function CtaSection() {
  const ref = useReveal()
  return (
    <section ref={ref} className="cta-strip" style={{ position:'relative', padding:'clamp(60px,8vw,100px) 24px', overflow:'hidden' }}>
      <div className="hex-grid-bright" style={{ position:'absolute', inset:0, opacity:0.65 }} />
      <div style={{ position:'relative', zIndex:10, maxWidth:800, margin:'0 auto', textAlign:'center' }}>
        <div className="reveal" style={{ display:'inline-flex', alignItems:'center', gap:12, marginBottom:24 }}>
          <div style={{ height:1, width:40, background:'linear-gradient(90deg,transparent,#207eff)' }} />
          <div className="live-dot" />
          <span className="font-mono-fl" style={{ fontSize:9, letterSpacing:'4px', color:'#207eff', textTransform:'uppercase' }}>Join Community</span>
          <div className="live-dot" />
          <div style={{ height:1, width:40, background:'linear-gradient(270deg,transparent,#207eff)' }} />
        </div>

        <h2 className="reveal font-orbitron" style={{ fontWeight:900, color:'#fff', fontSize:'clamp(24px,5vw,56px)', letterSpacing:'0.06em', lineHeight:1.05, marginBottom:16, transitionDelay:'0.08s' }}>
          BE PART OF OUR <span style={{ color:'#207eff', textShadow:'0 0 50px rgba(32,126,255,0.6)' }}>COMMUNITY</span>
        </h2>

        <p className="reveal font-rajdhani" style={{ fontSize:'clamp(14px,2vw,16px)', color:'#8099b8', maxWidth:560, margin:'0 auto 32px', lineHeight:1.65, transitionDelay:'0.15s' }}>
          Join workshops, collaborate with experts, and contribute to forensic excellence.
        </p>

        <div className="reveal cta-btns" style={{ transitionDelay:'0.25s' }}>
          <Link href="/careers">
          <button className="btn-primary btn-glow">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/></svg>
            Join Workshop
          </button></Link>
          <Link href="/contact">
          <button className="btn-outline-fl">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
            Contact Us
          </button>
          </Link>
        </div>
      </div>
    </section>
  )
}

export default function GalleryPage() {
  const [activeFilter, setActiveFilter] = useState('All')
  const [lightboxItem, setLightboxItem] = useState(null)

  const counts = GALLERY_ITEMS.reduce((acc, item) => {
    acc[item.category] = (acc[item.category] || 0) + 1
    return acc
  }, {})

  const filtered = activeFilter === 'All' ? GALLERY_ITEMS : GALLERY_ITEMS.filter(i => i.category === activeFilter)

  const openLightbox = useCallback(item => setLightboxItem(item), [])
  const closeLightbox = useCallback(() => setLightboxItem(null), [])
  const navLightbox = useCallback(item => setLightboxItem(item), [])
  const openFeatured = useCallback(item => setLightboxItem({ id: item.id, title: item.title, category: item.category, image: item.image, description: item.description }), [])

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: GLOBAL_CSS }} />
      <main style={{ background:'#03060d', color:'#c8d8eb', minHeight:'100vh' }}>
        <Navbar/>
        <HeroSection />
        <FilterBar active={activeFilter} onChange={setActiveFilter} counts={counts} />
        <MasonryGallery items={filtered} onOpen={openLightbox} />
        <FeaturedSection onOpen={openFeatured} />
        <CtaSection />
        <Footer/>
      </main>

      {lightboxItem && (
        <Lightbox item={lightboxItem} items={GALLERY_ITEMS} onClose={closeLightbox} onNav={navLightbox} />
      )}
    </>
  )
}  