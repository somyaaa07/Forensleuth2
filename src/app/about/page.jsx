'use client'

import { useEffect, useRef, useState } from 'react'
import Navbar from '../../components/Navbar'
import Footer from '@/components/Footer'
import Link from 'next/link'
const GLOBAL_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@700;900&family=Rajdhani:wght@400;600&family=Share+Tech+Mono&display=swap');
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  body { background: #03060d; color: #c8d8eb; overflow-x: hidden; }
  .font-orbitron { font-family: 'Orbitron', sans-serif; }
  .font-rajdhani { font-family: 'Rajdhani', sans-serif; }
  .font-mono-fl  { font-family: 'Share Tech Mono', monospace; }
  .hex-grid { background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='56' height='100'%3E%3Cpath d='M28 66L0 50V17L28 0l28 17v33L28 66zm0-2l26-15V19L28 2 2 19v30L28 64z' fill='%23207eff' fill-opacity='0.04'/%3E%3C/svg%3E"); background-size: 56px 100px; }
  .hex-grid-bright { background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='56' height='100'%3E%3Cpath d='M28 66L0 50V17L28 0l28 17v33L28 66zm0-2l26-15V19L28 2 2 19v30L28 64z' fill='%23207eff' fill-opacity='0.07'/%3E%3C/svg%3E"); background-size: 56px 100px; }
  .dot-grid { background-image: radial-gradient(circle, #1a2d47 1px, transparent 1px); background-size: 24px 24px; }
  @keyframes scanMove { 0%{top:-4px;} 100%{top:100%;} }
  .scan-line { position:absolute;left:0;right:0;height:2px;background:linear-gradient(90deg,transparent,rgba(32,126,255,0.08),transparent);animation:scanMove 6s linear infinite;pointer-events:none; }
  @keyframes pulseDot { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.5;transform:scale(.8)} }
  .live-dot { width:6px;height:6px;border-radius:50%;background:#22c55e;display:inline-block;flex-shrink:0;animation:pulseDot 2s ease-in-out infinite;box-shadow:0 0 6px #22c55e; }
  .reveal { opacity:0;transform:translateY(24px);transition:opacity .6s ease,transform .6s ease; }
  .reveal.visible { opacity:1;transform:translateY(0); }
  .glow-card { background:#03060d;transition:background .3s; }
  .glow-card:hover { background:#060d18; }
  .hover-line { height:1px;width:0;transition:width .5s ease; }
  .glow-card:hover .hover-line { width:100%; }
  .icon-accent { transition:transform .3s ease; }
  .glow-card:hover .icon-accent { transform:scale(1.1); }
  .card-title { transition:color .3s ease; }
  .glow-card:hover .card-title { color:#207eff; }
  .btn-solid { background:#207eff;color:#fff;font-family:'Orbitron',sans-serif;font-size:11px;letter-spacing:3px;padding:14px 32px;border:none;cursor:pointer;text-transform:uppercase;transition:opacity .2s;display:inline-block; }
  .btn-solid:hover { opacity:.85; }
  .btn-outline { background:transparent;color:#207eff;font-family:'Orbitron',sans-serif;font-size:11px;letter-spacing:3px;padding:13px 32px;border:1px solid #207eff;cursor:pointer;text-transform:uppercase;transition:background .2s;display:inline-block; }
  .btn-outline:hover { background:rgba(32,126,255,.1); }

  /* Responsive layout classes */
  .two-col-about { display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,320px),1fr));gap:clamp(32px,5vw,64px);align-items:center; }
  .why-grid { display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,260px),1fr));gap:1px;background:#1a2d47; }
  .leaders-grid { display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,360px),1fr));gap:32px;background:transparent; }
  .advisors-grid { display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,220px),1fr));gap:1px;background:#1a2d47; }
  .mission-grid { display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,300px),1fr));gap:1px;background:#1a2d47; }
  .stats-row { display:grid;grid-template-columns:repeat(3,1fr);gap:16px;padding-top:20px;border-top:1px solid #1a2d47; }
  .goal-stats { display:grid;grid-template-columns:repeat(4,1fr);gap:1px;background:#1a2d47;max-width:720px;margin:0 auto 48px; }
  @media(max-width:640px) {
    .goal-stats { grid-template-columns:repeat(2,1fr); }
    .stats-row { grid-template-columns:repeat(3,1fr); }
  }

  /* Enhanced Leadership Card Styles */
  .leader-card {
    position: relative;
    overflow: hidden;
    // background: linear-gradient(135deg, rgba(32, 126, 255, 0.05) 0%, rgba(250, 83, 48, 0.05) 100%);
    border: 1px solid #1a2d47;
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    cursor: pointer;
  }
  
  .leader-card:hover {
    border-color: #207eff;
    box-shadow: 0 0 30px rgba(32, 126, 255, 0.2), inset 0 0 30px rgba(32, 126, 255, 0.05);
    transform: translateY(-8px);
  }
  
  .leader-image {
    position: relative;
    overflow: hidden;
    height: 280px;
    background: linear-gradient(135deg, #101c2e, #0d1626);
  }
  
  .leader-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
    filter: brightness(0.9) contrast(1.1) saturate(1.2);
  }
  
  .leader-card:hover .leader-image img {
    transform: scale(1.08) rotate(1deg);
  }
  
  .leader-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(180deg, transparent 0%, rgba(3, 6, 13, 0.8) 70%, #03060d 100%);
    pointer-events: none;
  }
  
  .leader-badge {
    position: absolute;
    top: 16px;
    left: 16px;
    background: rgba(32, 126, 255, 0.15);
    border: 1px solid #207eff;
    padding: 6px 12px;
    border-radius: 2px;
    backdrop-filter: blur(10px);
    z-index: 10;
  }
  
  .leader-info {
    padding: clamp(28px, 4vw, 40px);
    background: #03060d;
  }
  
  .leader-name {
    font-size: clamp(18px, 3vw, 22px);
    font-weight: 900;
    color: #fff;
    margin-bottom: 6px;
    letter-spacing: 1px;
  }
  
  .leader-title {
    font-size: 13px;
    color: #207eff;
    font-weight: 600;
    margin-bottom: 16px;
    letter-spacing: 2px;
    text-transform: uppercase;
  }
  
  .leader-bio {
    font-size: 14px;
    line-height: 1.7;
    color: #8099b8;
    margin-bottom: 20px;
  }
  
  .leader-skills {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }
  
  .skill-badge {
    font-size: 11px;
    padding: 6px 12px;
    background: rgba(32, 126, 255, 0.1);
    border: 1px solid rgba(32, 126, 255, 0.3);
    color: #207eff;
    letter-spacing: 1px;
    transition: all 0.3s ease;
  }
  
  .leader-card:hover .skill-badge {
    background: rgba(32, 126, 255, 0.2);
    border-color: #207eff;
  }

  /* Enhanced Service Card Styles */
  .service-card-enhanced {
    position: relative;
    overflow: hidden;
    background: #03060d;
    border: 1px solid #1a2d47;
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    display: flex;
    flex-direction: column;
    height: 100%;
    cursor: pointer;
  }
  
  .service-card-enhanced:hover {
    border-color: #207eff;
    box-shadow: 0 0 20px rgba(32, 126, 255, 0.15);
  }
  
  .service-image-wrapper {
    position: relative;
    height: 280px;
    overflow: hidden;
    background: linear-gradient(135deg, #101c2e, #0d1626);
  }
  
  .service-image-wrapper img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    filter: brightness(0.7) contrast(1.15) saturate(0.95);
    transition: transform 0.5s ease;
  }
  
  .service-card-enhanced:hover .service-image-wrapper img {
    transform: scale(1.1);
  }
  
  .service-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(180deg, transparent 0%, rgba(3, 6, 13, 0.6) 60%, #03060d 100%);
  }
  
  .service-icon-badge {
    position: absolute;
    bottom: 16px;
    right: 16px;
    width: 60px;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(32, 126, 255, 0.15);
    border: 2px solid #207eff;
    color: #207eff;
    z-index: 5;
    transition: all 0.3s ease;
    font-size: 28px;
  }
  
  .service-card-enhanced:hover .service-icon-badge {
    background: rgba(32, 126, 255, 0.25);
    transform: scale(1.1) rotate(-5deg);
  }
  
  .service-content {
    padding: clamp(24px, 3.5vw, 32px);
    flex: 1;
    display: flex;
    flex-direction: column;
  }
  
  .service-label {
    font-size: 10px;
    letter-spacing: 3px;
    color: #207eff;
    margin-bottom: 12px;
    opacity: 0.7;
    text-transform: uppercase;
  }
  
  .service-title {
    font-size: clamp(16px, 2.5vw, 20px);
    font-weight: 900;
    color: #fff;
    margin-bottom: 8px;
    letter-spacing: 1px;
  }
  
  .service-description {
    font-size: 14px;
    line-height: 1.6;
    color: #8099b8;
    margin-bottom: 20px;
    flex: 1;
  }
  
  .service-features {
    border-top: 1px solid #1a2d47;
    padding-top: 16px;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  
  .feature-item {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 12px;
    color: #8099b8;
  }
  
  .feature-dot {
    width: 4px;
    height: 4px;
    background: #207eff;
    border-radius: 50%;
    flex-shrink: 0;
    box-shadow: 0 0 4px #207eff;
  }
  
  .expand-btn {
    margin-top: 16px;
    padding: 10px 16px;
    background: transparent;
    border: 1px solid #207eff;
    color: #207eff;
    cursor: pointer;
    font-size: 11px;
    letter-spacing: 2px;
    font-family: 'Share Tech Mono', monospace;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
  }
  
  .expand-btn:hover {
    background: rgba(32, 126, 255, 0.1);
  }
  
  .expand-icon {
    transition: transform 0.3s ease;
  }
  
  .expand-btn.expanded .expand-icon {
    transform: rotate(180deg);
  }
  
  .details-dropdown {
    max-height: 0;
    overflow: hidden;
    transition: max-height 0.4s ease;
  }
  
  .details-dropdown.open {
    max-height: 300px;
  }
  
  .details-list {
    padding: 16px 0;
    display: flex;
    flex-direction: column;
    gap: 12px;
  }
  
  .detail-item {
    display: flex;
    align-items: flex-start;
    gap: 10px;
    font-size: 13px;
    color: #8099b8;
    line-height: 1.5;
  }
  
  .detail-check {
    color: #fa5330;
    flex-shrink: 0;
    margin-top: 2px;
    font-weight: bold;
  }

  .sys-tag {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 24px;
  }
  
  .sys-tag-dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: #207eff;
    flex-shrink: 0;
  }
  
  .sys-tag-text {
    font-size: 9px;
    letter-spacing: 3px;
    text-transform: uppercase;
    color: #207eff;
    font-family: 'Share Tech Mono', monospace;
  }
  
  .section-title {
    font-size: clamp(26px, 4vw, 56px);
    font-weight: 900;
    color: #fff;
    letter-spacing: 2px;
    margin-bottom: 20px;
  }
  
  .section-title span {
    color: #207eff;
    text-shadow: 0 0 40px rgba(32, 126, 255, 0.5);
  }

  @media(max-width: 640px) {
    .leader-image { height: 300px; }
    .service-image-wrapper { height: 220px; }
  }
`

// ===== UTILITY HOOKS =====
function useReveal() {
  const ref = useRef(null)
  useEffect(() => {
    const obs = new IntersectionObserver(entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible') }), { threshold: 0.08 })
    ref.current?.querySelectorAll('.reveal').forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])
  return ref
}

// ===== HELPER COMPONENTS =====
function SysTag({ children }) {
  return (
    <div className="sys-tag">
      <span className="sys-tag-dot" />
      <span className="sys-tag-text">{children}</span>
    </div>
  )
}

function BracketBox({ children }) {
  return (
    <div style={{ position:'relative' }}>
      <div style={{ position:'absolute', top:0, left:0, width:16, height:16, borderTop:'1px solid #207eff', borderLeft:'1px solid #207eff' }} />
      <div style={{ position:'absolute', top:0, right:0, width:16, height:16, borderTop:'1px solid #fa5330', borderRight:'1px solid #fa5330' }} />
      <div style={{ position:'absolute', bottom:0, left:0, width:16, height:16, borderBottom:'1px solid #fa5330', borderLeft:'1px solid #fa5330' }} />
      <div style={{ position:'absolute', bottom:0, right:0, width:16, height:16, borderBottom:'1px solid #207eff', borderRight:'1px solid #207eff' }} />
      {children}
    </div>
  )
}

// ===== SECTION 1: BANNER =====
function BannerSection() {
  return (
    <section style={{ position:'relative', minHeight:'clamp(380px,45vw,520px)', display:'flex', alignItems:'center', justifyContent:'center', overflow:'hidden', paddingTop:80 }}>
      <div style={{ position:'absolute', inset:0 }}>
        <img src="https://i.pinimg.com/736x/78/93/41/789341167391b48950a058ebec57f8be.jpg" alt="Banner" style={{ width:'100%', height:'100%', objectFit:'cover', filter:'brightness(0.2) saturate(0.4) contrast(1.1)' }} />
      </div>
      <div style={{ position:'absolute', inset:0, background:'linear-gradient(90deg,rgba(3,6,13,.95),rgba(8,15,26,.8),rgba(3,6,13,.9))' }} />
      <div className="hex-grid-bright" style={{ position:'absolute', inset:0, opacity:0.7 }} />
      <div style={{ position:'absolute', top:'50%', left:'50%', transform:'translate(-50%,-50%)', width:'min(600px,90vw)', height:300, borderRadius:'50%', pointerEvents:'none', background:'radial-gradient(ellipse,rgba(32,126,255,.07) 0%,transparent 70%)' }} />

      <div style={{ position:'relative', zIndex:10, textAlign:'center', padding:'clamp(40px,6vw,64px) 24px' }}>
        <div style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:8, marginBottom:20 }}>
          <span className="font-mono-fl" style={{ fontSize:10, letterSpacing:'3px', textTransform:'uppercase', color:'#8099b8' }}>Home</span>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#207eff" strokeWidth="2"><path d="M9 18l6-6-6-6"/></svg>
          <span className="font-mono-fl" style={{ fontSize:10, letterSpacing:'3px', textTransform:'uppercase', color:'#207eff' }}>About</span>
        </div>
        <div style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:16, marginBottom:20 }}>
          <div style={{ height:1, width:'clamp(32px,5vw,64px)', background:'linear-gradient(90deg,transparent,#207eff)' }} />
          <div style={{ width:6, height:6, transform:'rotate(45deg)', background:'#fa5330', boxShadow:'0 0 10px #fa5330' }} />
          <div style={{ height:1, width:'clamp(32px,5vw,64px)', background:'linear-gradient(270deg,transparent,#207eff)' }} />
        </div>
        <h1 className="font-orbitron" style={{ fontWeight:900, color:'#fff', fontSize:'clamp(32px,6vw,72px)', letterSpacing:4, marginBottom:12 }}>
          ABOUT <span style={{ color:'#207eff', textShadow:'0 0 40px rgba(32,126,255,.6)' }}>FORENSLEUTH</span>
        </h1>
        <p className="font-rajdhani" style={{ fontSize:'clamp(14px,2.5vw,18px)', letterSpacing:'0.2em', color:'#8099b8', maxWidth:480, margin:'0 auto' }}>
         Innovatio Research and Education 
        </p>
      
      </div>
      <div style={{ position:'absolute', bottom:0, left:0, right:0, height:96, background:'linear-gradient(to top,#03060d,transparent)' }} />
    </section>
  )
}

// ===== SECTION 2: ABOUT COMPANY =====
function AboutCompany() {
  const ref = useReveal()
  return (
    <section ref={ref} style={{ position:'relative', padding:'clamp(60px,7vw,96px) 0', background:'#03060d', overflow:'hidden' }}>
      <div className="hex-grid" style={{ position:'absolute', inset:0, opacity:0.6 }} />
      <div style={{ position:'relative', maxWidth:1280, margin:'0 auto', padding:'0 16px' }}>
        <div className="two-col-about">
          <div className="reveal">
            <SysTag>Who We Are</SysTag>
            <h2 className="font-orbitron" style={{ fontWeight:900, color:'#fff', fontSize:'clamp(26px,4vw,48px)', letterSpacing:2, marginBottom:20 }}>
              FORENSIC SCIENCE FOR A <span style={{ color:'#207eff', textShadow:'0 0 30px rgba(32,126,255,.5)' }}>JUST WORLD</span>
            </h2>
            <div style={{ marginBottom:28 }}>
              {[
                <><span style={{ color:'#c8d8eb', fontWeight:600 }}>Forensleuth</span> is a premier forensic science organization dedicated to advancing the science of truth-finding. We bridge the gap between scientific knowledge and societal justice.</>,
                'Our mission is to spread forensic awareness across communities, equip the next generation of investigators, and deliver expert forensic services to individuals, corporations, and legal professionals.',
                'From digital forensics to crime scene reconstruction, from academic mentorship to cyber incident response — Forensleuth operates at the intersection of science, law, and technology.',
              ].map((t, i) => (
                <p key={i} className="font-rajdhani" style={{ fontSize:'clamp(15px,2vw,18px)', lineHeight:1.7, color:'#8099b8', marginBottom:14 }}>{t}</p>
              ))}
            </div>
            <div className="stats-row">
              {[['500+','Cases Handled'],['8+','Service Areas']].map(([n,l]) => (
                <div key={l}>
                  <div className="font-orbitron" style={{ fontWeight:900, fontSize:'clamp(24px,3.5vw,30px)', color:'#207eff', textShadow:'0 0 20px rgba(32,126,255,.5)', lineHeight:1 }}>{n}</div>
                  <div className="font-mono-fl" style={{ fontSize:9, letterSpacing:'2px', color:'#8099b8', marginTop:4, textTransform:'uppercase' }}>{l}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="reveal" style={{ transitionDelay:'.2s' }}>
            <BracketBox>
              <div style={{ position:'relative', overflow:'hidden', border:'1px solid #1a2d47' }}>
                {/* <div className="scan-line" style={{ zIndex:10 }} /> */}
                <img src="/11.jpeg" alt="Lab operations" style={{ width:'100%', height:'clamp(360px,55vw,520px)', objectFit:'cover', filter:'brightness(.55) contrast(1.1) saturate(.7)', display:'block' }} />
                <div className="hex-grid" style={{ position:'absolute', inset:0, mixBlendMode:'overlay', opacity:0.4 }} />
                <div style={{ position:'absolute', inset:0, background:'linear-gradient(to top,rgba(3,6,13,.6),transparent)' }} />
                <div style={{ position:'absolute', bottom:16, left:16, display:'flex', alignItems:'center', gap:8 }}>
                  <div className="live-dot" />
                  <span className="font-mono-fl" style={{ fontSize:9, letterSpacing:'3px', color:'#22c55e' }}>FORENSLEUTH::ACTIVE</span>
                </div>
              </div>
            </BracketBox>
          </div>
        </div>
      </div>
    </section>
  )
}
//  title: 'Quality You Can Trust',
//     desc: 'Ensuring Excellence through Quality , Reliability and Precision in Every Analysis.',

// ===== SECTION 3: WHY CHOOSE US =====
const WHY_CARDS = [
  { icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>, title:'Scientific Accuracy', desc:'All findings follow peer-reviewed forensic methodologies. Zero compromise on evidentiary integrity.', accent:'#207eff' },
  { icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>, title:'Quality You Can Trust', desc:'Ensuring Excellence through Quality , Reliability and Precision in Every Analysis.', accent:'#fa5330' },
  { icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/></svg>, title:'Expert Team', desc:'Certified forensic scientists, digital investigators, and legal consultants with decades of combined experience.', accent:'#207eff' },
  { icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="2" y="3" width="20" height="14" rx="1"/><path d="M8 21h8M12 17v4M7 8h10M7 11h6"/></svg>, title:'Modern Tools & Tech', desc:'Proprietary digital forensic suites, AI-assisted evidence analysis, and state-of-the-art lab infrastructure.', accent:'#fa5330' },
]

function WhyChooseUs() {
  const ref = useReveal()
  return (
    <section ref={ref} style={{ position:'relative', padding:'clamp(60px,7vw,96px) 0', background:'#080f1a', overflow:'hidden' }}>
      <div className="hex-grid" style={{ position:'absolute', inset:0, opacity:0.5 }} />
      <div style={{ position:'relative', maxWidth:1280, margin:'0 auto', padding:'0 16px' }}>
        <div className="reveal" style={{ marginBottom:48 }}>
          <SysTag>Why Choose Us</SysTag>
          <h2 className="font-orbitron" style={{ fontWeight:900, color:'#fff', fontSize:'clamp(26px,4vw,56px)', letterSpacing:2 }}>
            THE FORENSLEUTH <span style={{ color:'#207eff' }}>ADVANTAGE</span>
          </h2>
        </div>
        <div className="why-grid">
          {WHY_CARDS.map((c, i) => (
            <div key={c.title} className="reveal glow-card" style={{ padding:'clamp(20px,3vw,32px)', transitionDelay:`${i * 0.07}s` }}>
              <div className="font-mono-fl" style={{ fontSize:9, letterSpacing:'3px', marginBottom:16, opacity:0.4, color:c.accent }}>{String(i+1).padStart(2,'0')} ——</div>
              <div className="icon-accent" style={{ color:c.accent, marginBottom:16 }}>{c.icon}</div>
              <h3 className="font-orbitron card-title" style={{ fontWeight:700, color:'#fff', fontSize:13, letterSpacing:'0.15em', marginBottom:10 }}>{c.title}</h3>
              <p className="font-rajdhani" style={{ fontSize:'clamp(13px,1.8vw,15px)', lineHeight:1.7, color:'#8099b8' }}>{c.desc}</p>
              <div className="hover-line" style={{ marginTop:20, background:`linear-gradient(90deg,${c.accent},transparent)` }} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ===== SECTION 4: ENHANCED CAPABILITIES =====
const ENHANCED_SERVICES = [
  {
    id: 'empowerment',
    title: 'Educational Outreach',
    subtitle: 'OUTREACH · EDUCATION · COMMUNITY',
    image: 'https://i.pinimg.com/736x/0a/f4/60/0af4600aeaeb53abaf86ddc90ed7cf10.jpg',
    shortDesc: 'Spreading forensic awareness through inclusive educational programs and community initiatives.',
    features: ['School & college outreach', 'Hands-on workshops', 'Community campaigns', 'NGO collaborations', 'Next-gen mentorship'],
    icon: '📚'
  },
  {
    id: 'kits',
    title: 'Forensic Tool Kits',
    subtitle: 'LEARNING · HANDS-ON · INTERACTIVE',
    image: '/1.jpeg',
    shortDesc: 'Interactive forensic kits designed for students, educators, and research institutions.',
    features: ['DIY learning kits', 'Student Tool kits', 'Professional Tool Kits', ],
    icon: '🔬'
  },
  {
    id: 'investigation',
    title: 'Expert Investigations',
    subtitle: 'FORENSIC · CYBER · LEGAL',
    image: '/11.jpeg',
    shortDesc: 'Professional forensic and cyber investigation services for corporate and legal clients.',
    features: ['Digital forensics', 'Document & FingerPrint examination', 'Cyber incident response', 'Crime reconstruction', 'Expert testimony'],
    icon: '🔍'
  },

]

function ServiceCardEnhanced({ service, isOpen, onToggle }) {
  return (
    <div className="service-card-enhanced">
      <div className="service-image-wrapper">
        <img src={service.image} alt={service.title} />
        {/* <div className="scan-line" style={{ zIndex: 10 }} /> */}
        <div className="service-overlay" />
      </div>
      
      <div className="service-content">
        <div className="service-label font-mono-fl">{service.subtitle}</div>
        <h3 className="service-title font-orbitron">{service.title}</h3>
        <p className="service-description font-rajdhani">{service.shortDesc}</p>
        
        <div className="service-features">
          {service.features.slice(0, 3).map(feature => (
            <div key={feature} className="feature-item font-rajdhani">
              <span className="feature-dot" />
              {feature}
            </div>
          ))}
        </div>
     
        
        <div className={`details-dropdown ${isOpen ? 'open' : ''}`}>
          <div className="details-list">
            {service.features.map(feature => (
              <div key={feature} className="detail-item font-rajdhani">
                <span className="detail-check">✓</span>
                <span>{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function EnhancedCapabilitiesSection() {
  const [expandedId, setExpandedId] = useState(null)
  const ref = useReveal()

  return (
    <section ref={ref} style={{ position:'relative', padding:'clamp(60px,7vw,96px) 0', background:'#03060d', overflow:'hidden' }}>
      <div className="hex-grid-bright" style={{ position:'absolute', inset:0, opacity:0.5 }} />
      
      <div style={{ position:'relative', maxWidth:1280, margin:'0 auto', padding:'0 16px' }}>
        <div className="reveal" style={{ marginBottom:48 }}>
          <SysTag>Our Capabilities</SysTag>
          <h2 className="section-title font-orbitron">
            WHAT WE <span>PROVIDE</span>
          </h2>
          {/* <p className="font-rajdhani" style={{ fontSize:'clamp(14px,2vw,18px)', color:'#8099b8' }}>Click any card to expand full service details</p> */}
        </div>
        
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(min(100%, 300px), 1fr))', gap:24 }}>
          {ENHANCED_SERVICES.map((service, i) => (
            <div 
              key={service.id}
              className="reveal"
              style={{ background:'#03060d', transitionDelay:`${i * 0.08}s` }}
            >
              <ServiceCardEnhanced 
                service={service}
                isOpen={expandedId === service.id}
                onToggle={() => setExpandedId(expandedId === service.id ? null : service.id)}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ===== SECTION 5: ENHANCED LEADERSHIP =====
const ENHANCED_LEADERS = [
  {
    role: 'FOUNDER ',
    name: 'Animesh Pandey',
    title: 'Cheif Ecxecutive Officer',
    image: '/animesh1.jpeg',
    bio: 'As the CEO of Forensleuth, Animesh is committed to building a trusted platform for forensic investigation, research consultancy, and professional education while maintaining the highest standards of quality and integrity.',
    expertise: ['Forensic Ballistics', 'FingerPrint and questioned document', 'Digital Forensics', 'Crime Scene investigation'],
    highlights: ['12+ Years Experience', '200+ Court Cases', '500+ Students Trained']
  },
  {
    role: 'CO-FOUNDER ',
    name: 'Gunjan Saxena',
    title: 'Cheif Operating Officer',
    image: '/gunjan1.jpeg',
    bio: 'With a strong commitment to operational efficiency and organizational growth, Gunjan plays a key role in strengthening Forensleuth’s vision of delivering trusted forensic and research solutions.',
    expertise: ['Forensic Toxicology', 'FingerPrint and questioned document', 'Forensic Chemistry', 'Cyber Forensics'],
    highlights: ['', 'Cyber Expert', 'Operations Lead']
  },
]

function LeaderCard({ leader }) {
  return (
    <div className="leader-card reveal">
      <div className="leader-image">
        <img src={leader.image} alt={leader.name} />
        {/* <div className="scan-line" style={{ zIndex: 10 }} /> */}
        {/* <div className="leader-overlay" /> */}
        <div className="leader-badge">
          <span style={{ fontSize: '10px', letterSpacing: '2px', color: '#207eff', textTransform: 'uppercase' }}>
            {leader.role}
          </span>
        </div>
      </div>
      
      <div className="leader-info">
        <div className="leader-name font-orbitron">{leader.name}</div>
        <div className="leader-title font-mono-fl">{leader.title}</div>
        <p className="leader-bio font-rajdhani">{leader.bio}</p>
        
        <div style={{ marginBottom: '16px' }}>
          <div style={{ fontSize: '11px', color: '#8099b8', letterSpacing: '2px', marginBottom: '10px', textTransform: 'uppercase' }}>Core Expertise:</div>
          <div className="leader-skills">
            {leader.expertise.map(skill => (
              <span key={skill} className="skill-badge font-mono-fl">{skill}</span>
            ))}
          </div>
        </div>
        
        {/* <div style={{ display: 'flex', gap: '8px', paddingTop: '16px', borderTop: '1px solid #1a2d47' }}>
          {leader.highlights.map(h => (
            <div key={h} style={{ fontSize: '10px', padding: '6px 10px', background: 'rgba(250, 83, 48, 0.1)', border: '1px solid rgba(250, 83, 48, 0.3)', color: '#fa5330', letterSpacing: '0.5px' }} className="font-mono-fl">
              {h}
            </div>
          ))}
        </div> */}
      </div>
    </div>
  )
}

function EnhancedLeadershipSection() {
  const ref = useReveal()

  return (
    <section ref={ref} style={{ position:'relative', padding:'clamp(60px,7vw,96px) 0', background:'#080f1a', overflow:'hidden' }}>
      <div className="hex-grid-bright" style={{ position:'absolute', inset:0, opacity:0.5 }} />
      
      <div style={{ position:'relative', maxWidth:1280, margin:'0 auto', padding:'0 16px' }}>
        <div className="reveal" style={{ marginBottom:48 }}>
          <SysTag>Leadership Team</SysTag>
          <h2 className="section-title font-orbitron">
            THE MINDS <span>BEHIND FORENSLEUTH</span>
          </h2>
          <p className="font-rajdhani" style={{ fontSize:'clamp(14px,2vw,18px)', color:'#8099b8', maxWidth:600 }}>
            Leading experts in forensic science, cyber intelligence, and digital investigation with decades of combined experience.
          </p>
        </div>
        
        <div className="leaders-grid">
          {ENHANCED_LEADERS.map((leader, i) => (
            <div key={leader.name} style={{ transitionDelay:`${i * 0.15}s` }}>
              <LeaderCard leader={leader} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ===== SECTION 6: MISSION & VISION =====
const MISSION_PANELS = [
  { tag:'MISSION_STATEMENT', label:'OUR', word:'MISSION', accent:'#207eff', icon:<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4"><circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/></svg>, p1:' Our mission is to empower students with knowledge and skills to navigate the digital world safely, ensuring they are well-equipped to identify, prevent, and respond to cyber threats. Through education, awareness, and hands-on support, we aim to foster a responsible and secure digital culture among young minds.', p2:'We are committed to upholding scientific integrity, promoting justice, and bridging the gap between forensic science and everyday society.', bullets:['Accessible forensic education for all','Scientific integrity in every engagement','Community-first approach to justice'] },
  { tag:'VISION_DIRECTIVE', label:'OUR', word:'VISION', accent:'#fa5330', icon:<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>, p1:" We envision a future where every student is digitally literate, cyber-aware, and tech-confident, making informed decisions in an increasingly digital world. Our goal is to build a community of responsible digital citizens who can protect themselves and others from online threats while harnessing technology for innovation and growth. ", p2:"We envision a world where forensic science is a tool of empowerment for the many — where truth is always accessible and justice scientifically grounded.", bullets:["India's leading forensic institution",'Forensic science as a public tool for justice',' human-centred investigations'] },
]

function MissionVision() {
  const ref = useReveal()
  return (
    <section ref={ref} style={{ position:'relative', padding:'clamp(60px,7vw,96px) 0', background:'#080f1a', overflow:'hidden' }}>
      <div className="hex-grid-bright" style={{ position:'absolute', inset:0, opacity:0.5 }} />
      <div style={{ position:'relative', maxWidth:1280, margin:'0 auto', padding:'0 16px' }}>
        <div className="reveal" style={{ marginBottom:48 }}>
          <SysTag>Core Directives</SysTag>
          <h2 className="section-title font-orbitron">
            MISSION & <span>VISION</span>
          </h2>
        </div>
        <div className="mission-grid">
          {MISSION_PANELS.map((p, i) => (
            <div key={p.word} className="reveal" style={{ background:'#080f1a', transitionDelay:`${i * 0.2}s` }}>
              <div className="glow-card" style={{ padding:'clamp(24px,3.5vw,40px)', height:'100%', borderLeft:`3px solid ${p.accent}` }}>
                <div style={{ width:60, height:60, display:'flex', alignItems:'center', justifyContent:'center', border:`1px solid ${p.accent}4d`, background:`${p.accent}14`, color:p.accent, marginBottom:24 }}>{p.icon}</div>
                <div className="font-mono-fl" style={{ fontSize:9, letterSpacing:'4px', color:p.accent, marginBottom:10, opacity:0.7 }}>{p.tag}</div>
                <h3 className="font-orbitron" style={{ fontWeight:900, color:'#fff', fontSize:'clamp(18px,3vw,24px)', letterSpacing:'0.15em', marginBottom:20 }}>
                  {p.label} <span style={{ color:p.accent }}>{p.word}</span>
                </h3>
                <p className="font-rajdhani" style={{ fontSize:'clamp(14px,2vw,18px)', lineHeight:1.7, color:'#8099b8', marginBottom:20 }}>{p.p1}</p>
                <p className="font-rajdhani" style={{ fontSize:'clamp(13px,1.8vw,15px)', lineHeight:1.7, color:'#8099b8', marginBottom:24 }}>{p.p2}</p>
                <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
                  {p.bullets.map(b => (
                    <div key={b} style={{ display:'flex', alignItems:'center', gap:10 }}>
                      <div style={{ width:6, height:6, background:p.accent, flexShrink:0, boxShadow:`0 0 8px ${p.accent}` }} />
                      <span className="font-rajdhani" style={{ fontSize:14, color:'#8099b8' }}>{b}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ===== SECTION 7: OUR GOAL =====
function OurGoal() {
  const ref = useReveal()
  return (
    <section ref={ref} style={{ position:'relative', padding:'clamp(72px,8vw,128px) 0', background:'#03060d', overflow:'hidden' }}>
      <div style={{ position:'absolute', inset:0 }}>
        <img src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=1920&q=80" alt="" style={{ width:'100%', height:'100%', objectFit:'cover', filter:'brightness(.12) saturate(.3) contrast(1.1)' }} />
      </div>
      <div style={{ position:'absolute', inset:0, background:'linear-gradient(90deg,rgba(3,6,13,.98),rgba(8,15,26,.85),rgba(3,6,13,.95))' }} />
      <div className="hex-grid-bright" style={{ position:'absolute', inset:0, opacity:0.8 }} />

      <div style={{ position:'relative', zIndex:10, maxWidth:1000, margin:'0 auto', padding:'0 16px', textAlign:'center' }}>
        <div className="reveal" style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:12, marginBottom:24 }}>
          <div style={{ height:1, width:48, background:'linear-gradient(90deg,transparent,#207eff)' }} />
          <div className="live-dot" />
          <span className="font-mono-fl" style={{ fontSize:9, letterSpacing:'4px', color:'#207eff', textTransform:'uppercase' }}>Forensleuth :: Core Objective</span>
          <div className="live-dot" />
          <div style={{ height:1, width:48, background:'linear-gradient(270deg,transparent,#207eff)' }} />
        </div>

        <h2 className="reveal font-orbitron" style={{ fontWeight:900, color:'#fff', fontSize:'clamp(48px,8vw,88px)', letterSpacing:3, lineHeight:1, marginBottom:24, transitionDelay:'.1s' }}>
          OUR <span style={{ color:'#207eff', textShadow:'0 0 60px rgba(32,126,255,.7)' }}>GOAL</span>
        </h2>

        <div className="reveal" style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:16, marginBottom:32, transitionDelay:'.15s' }}>
          <div style={{ height:1, width:80, background:'linear-gradient(90deg,transparent,#1a2d47)' }} />
          <div style={{ width:8, height:8, transform:'rotate(45deg)', background:'#fa5330', boxShadow:'0 0 12px #fa5330' }} />
          <div style={{ height:1, width:80, background:'linear-gradient(270deg,transparent,#1a2d47)' }} />
        </div>

        <p className="reveal font-rajdhani" style={{ fontSize:'clamp(15px,2.5vw,20px)', lineHeight:1.7, color:'#c8d8eb', maxWidth:720, margin:'0 auto 20px', transitionDelay:'.2s' }}>
          At Forensleuth, our ultimate goal is to build a society where <span style={{ color:'#207eff', fontWeight:600 }}>forensic science serves justice</span>, where communities are empowered with scientific knowledge, and where no individual is denied access to expert forensic expertise.
        </p>

        <p className="reveal font-rajdhani" style={{ fontSize:'clamp(13px,2vw,18px)', lineHeight:1.7, color:'#8099b8', maxWidth:600, margin:'0 auto 40px', transitionDelay:'.25s' }}>
          We are building the infrastructure for a forensically literate India — through education, investigation, innovation, and scientific integrity.
        </p>

        <div className="reveal goal-stats" style={{ transitionDelay:'.3s' }}>
          {[['1000+','Students Trained'],['25+','Partner Institutions'],['500+','Cases Resolved'],['8','States Served']].map(([n,l]) => (
            <div key={l} style={{ background:'#03060d', padding:'clamp(16px,2.5vw,24px) 12px', textAlign:'center' }}>
              <div className="font-orbitron" style={{ fontWeight:900, fontSize:'clamp(22px,3vw,28px)', color:'#207eff', textShadow:'0 0 20px rgba(32,126,255,.5)', lineHeight:1, marginBottom:6 }}>{n}</div>
              <div className="font-mono-fl" style={{ fontSize:8, letterSpacing:'2px', color:'#8099b8' }}>{l}</div>
            </div>
          ))}
        </div>

        <div className="reveal" style={{ display:'flex', flexWrap:'wrap', gap:14, justifyContent:'center', transitionDelay:'.35s' }}>
      
      <Link href="contact">  <button className="btn-solid">Start Investigation</button></Link>  
        <Link href="/seervices">  <button className="btn-outline">Learn More</button></Link>  
        </div>
      </div>
    </section>
  )
}

// ===== MAIN PAGE =====
export default function AboutPage() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: GLOBAL_CSS }} />
      <main style={{ background:'#03060d', color:'#c8d8eb', minHeight:'100vh' }}>
        <Navbar/>
        <BannerSection />
        <AboutCompany />
        <WhyChooseUs />
        <EnhancedCapabilitiesSection />
        <EnhancedLeadershipSection />
        <MissionVision />
        <OurGoal />
        <Footer/>
      </main>
    </>
  )
}