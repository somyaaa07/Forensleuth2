'use client'

import { useEffect, useRef, useState } from 'react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

const GLOBAL_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@700;900&family=Rajdhani:wght@400;600&family=Share+Tech+Mono&display=swap');
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html { scroll-behavior: smooth; }
  body { background: #03060d; color: #c8d8eb; font-family: 'Rajdhani', sans-serif; overflow-x: hidden; }
  .font-orbitron { font-family: 'Orbitron', sans-serif; }
  .font-rajdhani { font-family: 'Rajdhani', sans-serif; }
  .font-mono-fl  { font-family: 'Share Tech Mono', monospace; }
  .hex-grid { background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='56' height='100'%3E%3Cpath d='M28 66L0 50V17L28 0l28 17v33L28 66zm0-2l26-15V19L28 2 2 19v30L28 64z' fill='%23207eff' fill-opacity='0.035'/%3E%3C/svg%3E"); background-size: 56px 100px; }
  .hex-grid-bright { background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='56' height='100'%3E%3Cpath d='M28 66L0 50V17L28 0l28 17v33L28 66zm0-2l26-15V19L28 2 2 19v30L28 64z' fill='%23207eff' fill-opacity='0.065'/%3E%3C/svg%3E"); background-size: 56px 100px; }
  .dot-grid { background-image: radial-gradient(circle, #1a2d47 1px, transparent 1px); background-size: 24px 24px; }

  @keyframes scanMove { 0%{top:-4px;opacity:1} 95%{opacity:1} 100%{top:100%;opacity:0} }
  .scan-line { position:absolute;left:0;right:0;height:2px;pointer-events:none;background:linear-gradient(90deg,transparent,rgba(32,126,255,0.12) 40%,rgba(32,126,255,0.18) 50%,rgba(32,126,255,0.12) 60%,transparent);animation:scanMove 7s linear infinite; }

  @keyframes pulseDot { 0%,100%{opacity:1;transform:scale(1);box-shadow:0 0 6px #22c55e} 50%{opacity:.5;transform:scale(.75);box-shadow:0 0 2px #22c55e} }
  .live-dot { width:7px;height:7px;border-radius:50%;background:#22c55e;display:inline-block;flex-shrink:0;animation:pulseDot 2s ease-in-out infinite;box-shadow:0 0 6px #22c55e; }

  @keyframes glowPulse { 0%,100%{box-shadow:0 0 12px rgba(32,126,255,.4),0 0 24px rgba(32,126,255,.15)} 50%{box-shadow:0 0 22px rgba(32,126,255,.65),0 0 44px rgba(32,126,255,.25)} }
  .btn-glow { animation:glowPulse 3s ease-in-out infinite; }

  .reveal { opacity:0;transform:translateY(28px);transition:opacity .65s cubic-bezier(.22,1,.36,1),transform .65s cubic-bezier(.22,1,.36,1); }
  .reveal.visible { opacity:1;transform:translateY(0); }

  .info-card { background:#060d18;border:1px solid #1a2d47;transition:transform .28s ease,border-color .28s ease,box-shadow .28s ease;cursor:default; }
  .info-card:hover { transform:translateY(-4px);border-color:rgba(32,126,255,.45);box-shadow:0 8px 32px rgba(32,126,255,.12); }
  .info-card-orange:hover { border-color:rgba(250,83,48,.45) !important;box-shadow:0 8px 32px rgba(250,83,48,.1) !important; }

  .fl-input { width:100%;background:rgba(6,13,24,0.8);border:1px solid #1e3352;color:#c8d8eb;font-family:'Rajdhani',sans-serif;font-size:15px;padding:12px 16px;border-radius:6px;outline:none;transition:border-color .2s,box-shadow .2s; }
  .fl-input::placeholder { color:#4a6080; }
  .fl-input:focus { border-color:#207eff;box-shadow:0 0 0 3px rgba(32,126,255,.15); }

  .btn-primary { background:#207eff;color:#fff;font-family:'Orbitron',sans-serif;font-size:11px;letter-spacing:3px;padding:14px 36px;border:none;border-radius:4px;cursor:pointer;text-transform:uppercase;transition:background .2s,box-shadow .2s,transform .15s;display:inline-flex;align-items:center;gap:10px; }
  .btn-primary:hover { background:#1a6ae0;transform:translateY(-1px);box-shadow:0 6px 24px rgba(32,126,255,.4); }
  .btn-outline-fl { background:transparent;color:#207eff;font-family:'Orbitron',sans-serif;font-size:11px;letter-spacing:3px;padding:13px 36px;border:1px solid #207eff;border-radius:4px;cursor:pointer;text-transform:uppercase;transition:background .2s,box-shadow .2s,transform .15s;display:inline-flex;align-items:center;gap:10px; }
  .btn-outline-fl:hover { background:rgba(32,126,255,.1);transform:translateY(-1px); }

  /* Responsive grids */
  .cards-grid { display:grid;grid-template-columns:repeat(4,1fr);gap:1px;background:#1a2d47; }
  @media(max-width:1024px) { .cards-grid { grid-template-columns:repeat(2,1fr); } }
  @media(max-width:480px)  { .cards-grid { grid-template-columns:1fr; } }

  .form-layout { display:grid;grid-template-columns:1fr 360px;gap:1px;background:#1a2d47; }
  @media(max-width:900px)  { .form-layout { grid-template-columns:1fr; } }

  .form-row { display:grid;grid-template-columns:1fr 1fr;gap:20px; }
  @media(max-width:600px)  { .form-row { grid-template-columns:1fr; } }

  .cta-btns { display:flex;align-items:center;justify-content:center;gap:16px;flex-wrap:wrap; }
  @media(max-width:480px) { .cta-btns { flex-direction:column; } }

  @keyframes spin { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
`

function useReveal() {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible') }), { threshold: 0.07 })
    el.querySelectorAll('.reveal').forEach(node => obs.observe(node))
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

function CornerBrackets({ size=24, blue='#207eff', orange='#fa5330' }) {
  return (
    <>
      <div style={{ position:'absolute', top:0, left:0, width:size, height:size, borderTop:`1px solid ${blue}`, borderLeft:`1px solid ${blue}` }} />
      <div style={{ position:'absolute', top:0, right:0, width:size, height:size, borderTop:`1px solid ${orange}`, borderRight:`1px solid ${orange}` }} />
      <div style={{ position:'absolute', bottom:0, left:0, width:size, height:size, borderBottom:`1px solid ${orange}`, borderLeft:`1px solid ${orange}` }} />
      <div style={{ position:'absolute', bottom:0, right:0, width:size, height:size, borderBottom:`1px solid ${blue}`, borderRight:`1px solid ${blue}` }} />
    </>
  )
}

const INFO_CARDS = [
  { label: 'Our Location', tag: 'HQ::INDIA', value: 'Greater Noida', accent: '#207eff', variant: '',
    icon: <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg> },
  { label: 'Email Address', tag: 'SECURE::CHANNEL', value: ' forensleuth@gmail.com , info@forensleuth.com', accent: '#fa5330', variant: 'info-card-orange',
    icon: <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg> },
  { label: 'Phone / WhatsApp', tag: 'DIRECT::LINE', value: '+91 7840010208', subvalue: '+91 9818194316', accent: '#207eff', variant: '',
    icon: <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 01.07 1.18 2 2 0 012.03 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.92v2z"/></svg> },
  { label: 'Working Hours', tag: 'SCHEDULE::OPS', value: '24*7', subvalue: 'Emergency: 24 × 7', accent: '#fa5330', variant: 'info-card-orange',
    icon: <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg> },
]

function InfoCards() {
  const ref = useReveal()
  return (
    <section ref={ref} style={{ position:'relative', padding:'clamp(48px,6vw,80px) 0 clamp(40px,4vw,60px)', background:'#03060d', overflow:'hidden' }}>
      <div className="hex-grid" style={{ position:'absolute', inset:0, opacity:0.7 }} />
      <div style={{ position:'relative', maxWidth:1280, margin:'0 auto', padding:'0 16px' }}>
        <div className="reveal" style={{ marginBottom:40 }}>
          <SysTag>Get In Touch</SysTag>
          <h2 className="font-orbitron" style={{ fontWeight:900, color:'#fff', fontSize:'clamp(22px,4vw,44px)', letterSpacing:'0.08em' }}>
            CONTACT <span style={{ color:'#207eff', textShadow:'0 0 30px rgba(32,126,255,.45)' }}>CHANNELS</span>
          </h2>
        </div>
        <div className="cards-grid">
          {INFO_CARDS.map((card, i) => (
            <div key={card.label} className={`reveal info-card ${card.variant}`} style={{ padding:'clamp(20px,3vw,28px)', position:'relative', transitionDelay:`${i * 0.08}s` }}>
              <div style={{ position:'absolute', top:0, left:0, right:0, height:2, background:`linear-gradient(90deg,${card.accent},transparent)` }} />
              <div className="font-mono-fl" style={{ fontSize:8, letterSpacing:'3px', color:card.accent, opacity:0.6, marginBottom:16, textTransform:'uppercase' }}>{card.tag}</div>
              <div style={{ width:48, height:48, display:'flex', alignItems:'center', justifyContent:'center', border:`1px solid ${card.accent}33`, background:`${card.accent}0d`, color:card.accent, marginBottom:16 }}>{card.icon}</div>
              <div className="font-orbitron" style={{ fontWeight:700, color:'#c8d8eb', fontSize:11, letterSpacing:'0.12em', marginBottom:8 }}>{card.label}</div>
              <div className="font-rajdhani" style={{ fontSize:14, color:'#8099b8', lineHeight:1.6 }}>{card.value}</div>
              {card.subvalue && <div className="font-rajdhani" style={{ fontSize:13, color:card.accent, marginTop:4, opacity:0.8 }}>{card.subvalue}</div>}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

const SUBJECTS = ['Digital Forensics Investigation', 'Cyber Crime Incident Response', 'Document & Handwriting Analysis', 'Legal Expert Witness Services', 'Academic / Training Inquiry', 'Media & Press Inquiry', 'Other']

function ContactForm() {
  const ref = useReveal()
  const [form, setForm] = useState({ name:'', email:'', phone:'', subject:'', message:'' })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleChange = e => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  const handleSubmit = e => { e.preventDefault(); setLoading(true); setTimeout(() => { setLoading(false); setSubmitted(true) }, 1600) }
  const InputLabel = ({ children }) => <label className="font-mono-fl" style={{ fontSize:9, letterSpacing:'3px', textTransform:'uppercase', color:'#4a7ab5', display:'block', marginBottom:8 }}>{children}</label>

  return (
    <section ref={ref} style={{ position:'relative', padding:'clamp(48px,6vw,80px) 0', background:'#080f1a', overflow:'hidden' }}>
      <div className="dot-grid" style={{ position:'absolute', inset:0, opacity:0.35 }} />
      <div style={{ position:'relative', maxWidth:1280, margin:'0 auto', padding:'0 16px' }}>
        <div className="reveal" style={{ marginBottom:40 }}>
          <SysTag>Secure Communication</SysTag>
          <h2 className="font-orbitron" style={{ fontWeight:900, color:'#fff', fontSize:'clamp(22px,4vw,44px)', letterSpacing:'0.08em' }}>
            SEND A <span style={{ color:'#207eff', textShadow:'0 0 30px rgba(32,126,255,.45)' }}>SECURE MESSAGE</span>
          </h2>
        </div>

        <div className="form-layout">
          {/* Form */}
          <div className="reveal" style={{ background:'#080f1a', padding:'clamp(24px,4vw,48px) clamp(20px,4vw,40px)', position:'relative' }}>
            <CornerBrackets size={18} blue="rgba(32,126,255,.35)" orange="rgba(250,83,48,.25)" />
            {submitted ? (
              <div style={{ display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', minHeight:400, textAlign:'center', gap:20 }}>
                <div style={{ width:64, height:64, border:'2px solid #22c55e', display:'flex', alignItems:'center', justifyContent:'center', color:'#22c55e' }}>
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg>
                </div>
                <h3 className="font-orbitron" style={{ fontWeight:900, color:'#fff', fontSize:20, letterSpacing:'0.1em' }}>MESSAGE TRANSMITTED</h3>
                <p className="font-rajdhani" style={{ fontSize:15, color:'#8099b8', maxWidth:340, lineHeight:1.6 }}>Your inquiry has been securely received. A forensic investigator will respond within 24 hours.</p>
                <div style={{ display:'flex', alignItems:'center', gap:8 }}>
                  <div className="live-dot" />
                  <span className="font-mono-fl" style={{ fontSize:9, letterSpacing:'3px', color:'#22c55e', textTransform:'uppercase' }}>Case ID: FL-{Date.now().toString(36).toUpperCase()}</span>
                </div>
                <button className="btn-outline-fl" onClick={() => { setSubmitted(false); setForm({ name:'',email:'',phone:'',subject:'',message:'' }) }}>New Inquiry</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="form-row" style={{ marginBottom:20 }}>
                  <div><InputLabel>Full Name *</InputLabel><input className="fl-input" type="text" name="name" placeholder="Your full name" value={form.name} onChange={handleChange} required /></div>
                  <div><InputLabel>Email Address *</InputLabel><input className="fl-input" type="email" name="email" placeholder="your@email.com" value={form.email} onChange={handleChange} required /></div>
                </div>
                <div className="form-row" style={{ marginBottom:20 }}>
                  <div><InputLabel>Phone Number</InputLabel><input className="fl-input" type="tel" name="phone" placeholder="+91 XXXXX XXXXX" value={form.phone} onChange={handleChange} /></div>
                  <div><InputLabel>Subject *</InputLabel>
                    <select className="fl-input" name="subject" value={form.subject} onChange={handleChange} required style={{ appearance:'none', cursor:'pointer' }}>
                      <option value="" disabled style={{ background:'#060d18' }}>Select inquiry type</option>
                      {SUBJECTS.map(s => <option key={s} value={s} style={{ background:'#060d18' }}>{s}</option>)}
                    </select>
                  </div>
                </div>
                <div style={{ marginBottom:24 }}>
                  <InputLabel>Case Details / Message *</InputLabel>
                  <textarea className="fl-input" name="message" rows={5} placeholder="Describe your case or inquiry in detail…" value={form.message} onChange={handleChange} required style={{ resize:'vertical', minHeight:120 }} />
                </div>
                <div style={{ display:'flex', alignItems:'center', gap:10, padding:'12px 16px', border:'1px solid rgba(32,126,255,.2)', background:'rgba(32,126,255,.04)', marginBottom:24 }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#207eff" strokeWidth="1.5" style={{ flexShrink:0 }}><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>
                  <span className="font-mono-fl" style={{ fontSize:9, letterSpacing:'2px', color:'#4a7ab5' }}>Your information is encrypted and kept confidential.</span>
                </div>
                <button className="btn-primary btn-glow" type="submit" disabled={loading} style={{ width:'100%', justifyContent:'center' }}>
                  {loading ? (
                    <><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ animation:'spin 1s linear infinite' }}><polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 11-2.12-9.36L23 10"/></svg>Transmitting…</>
                  ) : (
                    <><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>Send Secure Message</>
                  )}
                </button>
              </form>
            )}
          </div>

          {/* Side panel */}
          <div className="reveal" style={{ background:'#060d18', padding:'clamp(24px,4vw,48px) clamp(20px,3vw,32px)', position:'relative', transitionDelay:'0.15s' }}>
            <div style={{ position:'absolute', top:0, left:0, right:0, height:2, background:'linear-gradient(90deg,#207eff,#fa5330)' }} />
            <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:24 }}>
              <div className="live-dot" />
              <span className="font-mono-fl" style={{ fontSize:9, letterSpacing:'3px', color:'#22c55e', textTransform:'uppercase' }}>Experts Online</span>
            </div>
            <SysTag accent="#fa5330">Response Protocol</SysTag>
            <h3 className="font-orbitron" style={{ fontWeight:900, color:'#fff', fontSize:'clamp(15px,2.5vw,18px)', letterSpacing:'0.1em', marginBottom:12, lineHeight:1.3 }}>
              WE RESPOND <span style={{ color:'#fa5330' }}>WITHIN 24H</span>
            </h3>
            <p className="font-rajdhani" style={{ fontSize:14, color:'#8099b8', lineHeight:1.7, marginBottom:24 }}>
              Our forensic experts review every inquiry personally. Emergency cyber incidents receive priority triage within 2 hours.
            </p>
            <div style={{ display:'flex', alignItems:'flex-start', gap:14, padding:'14px 0', borderBottom:'1px solid #0f1f35', marginBottom:24 }}>
              <div style={{ width:36, height:36, flexShrink:0, display:'flex', alignItems:'center', justifyContent:'center', border:'1px solid rgba(32,126,255,.33)', background:'rgba(32,126,255,.08)', fontSize:16 }}>🔒</div>
              <div>
                <div className="font-orbitron" style={{ fontWeight:700, color:'#c8d8eb', fontSize:10, letterSpacing:'0.1em', marginBottom:3 }}>Confidential Case Handling</div>
                <div className="font-rajdhani" style={{ fontSize:13, color:'#8099b8' }}>Need expert support in forensic science</div>
              </div>
            </div>
            <div style={{ padding:'16px', border:'1px solid #1a2d47', background:'rgba(32,126,255,.03)', position:'relative' }}>
              <CornerBrackets size={10} blue="#207eff" orange="#fa5330" />
              <div className="font-mono-fl" style={{ fontSize:8, letterSpacing:'3px', color:'#207eff', textTransform:'uppercase', marginBottom:8 }}>Emergency::Triage</div>
              <p className="font-rajdhani" style={{ fontSize:13, color:'#8099b8', marginBottom:14, lineHeight:1.6 }}>From academic guidance to forensic investigation, Forensleuth delivers expert-driven solutions tailored to your needs.</p>
              <button className="btn-outline-fl" style={{ fontSize:9, padding:'10px 20px', letterSpacing:'2px', width:'100%', justifyContent:'center' }}>Emergency Escalation</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function HeroSection() {
  return (
    <section style={{ position:'relative', minHeight:'clamp(400px, 50vw, 600px)', display:'flex', alignItems:'center', justifyContent:'center', overflow:'hidden', paddingTop: 80 }}>
      <div style={{ position:'absolute', inset:0, background:'linear-gradient(135deg,#03060d 0%,#060f1e 40%,#04080f 70%,#03060d 100%)' }} />
      <div className="hex-grid-bright" style={{ position:'absolute', inset:0, opacity:0.9 }} />
      <div style={{ position:'absolute', top:'50%', left:'50%', transform:'translate(-50%,-50%)', width:'min(700px,90vw)', height:320, borderRadius:'50%', pointerEvents:'none', background:'radial-gradient(ellipse,rgba(32,126,255,.08) 0%,transparent 70%)' }} />
      <div style={{ position:'relative', zIndex:10, textAlign:'center', padding:'clamp(48px,6vw,80px) 24px clamp(40px,5vw,64px)' }}>
        <div style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:8, marginBottom:24 }}>
          <span className="font-mono-fl" style={{ fontSize:10, letterSpacing:'3px', textTransform:'uppercase', color:'#8099b8' }}>Home</span>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#207eff" strokeWidth="2"><path d="M9 18l6-6-6-6"/></svg>
          <span className="font-mono-fl" style={{ fontSize:10, letterSpacing:'3px', textTransform:'uppercase', color:'#207eff' }}>Contact</span>
        </div>
        <div style={{ display:'inline-flex', alignItems:'center', gap:8, border:'1px solid #1a2d47', padding:'6px 14px', marginBottom:24, background:'rgba(32,126,255,.04)' }}>
          <div className="live-dot" />
          <span className="font-mono-fl" style={{ fontSize:9, letterSpacing:'3px', textTransform:'uppercase', color:'#22c55e' }}>Response Active · 24/7 Availability</span>
        </div>
        <h1 className="font-orbitron" style={{ fontWeight:900, color:'#fff', fontSize:'clamp(28px,6vw,68px)', letterSpacing:'0.06em', lineHeight:1.05, margin:'0 0 16px' }}>
          CONTACT <span style={{ color:'#207eff', textShadow:'0 0 48px rgba(32,126,255,.55)' }}>FORENSIC</span><br/>
          <span style={{ color:'#fa5330', textShadow:'0 0 32px rgba(250,83,48,.4)' }}>EXPERTS</span>
        </h1>
        <p className="font-rajdhani" style={{ fontSize:'clamp(14px,2.5vw,17px)', color:'#8099b8', maxWidth:520, margin:'0 auto', lineHeight:1.6 }}>
          Our certified forensic investigators are ready to assist. All communications are encrypted and handled with strict confidentiality.
        </p>
      </div>
      <div style={{ position:'absolute', bottom:0, left:0, right:0, height:80, background:'linear-gradient(to top,#03060d,transparent)' }} />
    </section>
  )
}

function CtaSection() {
  const ref = useReveal()
  return (
    <section ref={ref} style={{ position:'relative', padding:'clamp(60px,8vw,100px) 24px', overflow:'hidden', background:'linear-gradient(135deg,#060d18 0%,#0a1628 40%,#060d18 100%)', borderTop:'1px solid #1a2d47' }}>
      <div className="hex-grid-bright" style={{ position:'absolute', inset:0, opacity:0.6 }} />
      <div style={{ position:'relative', zIndex:10, maxWidth:900, margin:'0 auto', textAlign:'center' }}>
        <div className="reveal" style={{ display:'inline-flex', alignItems:'center', gap:12, marginBottom:24 }}>
          <div style={{ height:1, width:40, background:'linear-gradient(90deg,transparent,#207eff)' }} />
          <div className="live-dot" />
          <span className="font-mono-fl" style={{ fontSize:9, letterSpacing:'4px', color:'#207eff', textTransform:'uppercase' }}>Priority Response</span>
          <div className="live-dot" />
          <div style={{ height:1, width:40, background:'linear-gradient(270deg,transparent,#207eff)' }} />
        </div>
        <h2 className="reveal font-orbitron" style={{ fontWeight:900, color:'#fff', fontSize:'clamp(26px,5vw,64px)', letterSpacing:'0.06em', lineHeight:1.05, marginBottom:16, transitionDelay:'0.08s' }}>
          NEED IMMEDIATE <span style={{ color:'#207eff', textShadow:'0 0 50px rgba(32,126,255,.6)' }}>ASSISTANCE?</span>
        </h2>
        <p className="reveal font-rajdhani" style={{ fontSize:'clamp(14px,2vw,18px)', color:'#8099b8', maxWidth:560, margin:'0 auto 40px', lineHeight:1.65, transitionDelay:'0.15s' }}>
          Whether it's an active cyber incident, a pending legal case, or an urgent forensic matter — our team is ready to mobilise immediately.
        </p>
        <div className="reveal cta-btns" style={{ transitionDelay:'0.22s', marginBottom:48 }}>
          <button className="btn-primary btn-glow" style={{ fontSize:11, padding:'14px 36px' }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 01.07 1.18 2 2 0 012.03 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.92v2z"/></svg>
            Contact Now
          </button>
          <button className="btn-outline-fl" style={{ fontSize:11, padding:'13px 36px' }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
            Request Consultation
          </button>
        </div>
        <div className="reveal" style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:'clamp(16px,4vw,32px)', flexWrap:'wrap', transitionDelay:'0.3s' }}>
          {[['ISO 17025','Accredited Lab'],['CERT-In','Empanelled'],['Court','Recognised'],['NDA','Protected']].map(([top,bot]) => (
            <div key={top} style={{ textAlign:'center' }}>
              <div className="font-orbitron" style={{ fontWeight:900, color:'#207eff', fontSize:'clamp(11px,1.5vw,13px)', letterSpacing:'0.08em' }}>{top}</div>
              <div className="font-mono-fl" style={{ fontSize:8, letterSpacing:'2px', color:'#4a6080', textTransform:'uppercase', marginTop:3 }}>{bot}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default function ContactPage() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: GLOBAL_CSS }} />
      <main style={{ background:'#03060d', color:'#c8d8eb', minHeight:'100vh' }}>
        <Navbar/>
        <HeroSection />
        <InfoCards />
        <ContactForm />
        {/* <CtaSection /> */}
        <Footer/>
      </main>
    </>
  )
}