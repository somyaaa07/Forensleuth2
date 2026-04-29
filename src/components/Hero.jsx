'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'

const slides = [
  {
    image: 'https://i.pinimg.com/736x/78/93/41/789341167391b48950a058ebec57f8be.jpg',
    tag: 'DIGITAL FORENSICS',
    headline: ['DIGITAL EVIDENCE', 'DECODED.'],
    sub: 'Advanced forensic intelligence platform for cyber investigators, law enforcement, and legal professionals.',
    accent: '#207eff',
  },
  {
    image: 'https://i.pinimg.com/1200x/ca/b0/5f/cab05fca369f5dfd89e96e12eb9da1c4.jpg',
    tag: 'INCIDENT RESPONSE',
    headline: ['TRACE EVERY', 'BYTE.'],
    sub: 'Rapid-response cyber analysis uncovering hidden trails across networks, devices, and encrypted systems.',
    accent: '#fa5330',
  },
  {
    image: 'https://i.pinimg.com/1200x/10/06/23/100623f85425928c26997eb0961837dd.jpg',
    tag: 'OSINT INTELLIGENCE',
    headline: ['TRUTH IN THE', 'DATA.'],
    sub: 'From network intrusions to mobile forensics — we find what others miss, with zero room for error.',
    accent: '#207eff',
  },
]

const stats = [
  { num: '500+', label: 'Cases Solved' },
  { num: '99.8%', label: 'Accuracy' },
  { num: '24/7', label: 'Response' },
  { num: '15+', label: 'Years' },
]

export default function Hero() {
  const [cur, setCur] = useState(0)
  const [transitioning, setTransitioning] = useState(false)

  const goTo = (i) => {
    if (i === cur) return
    setTransitioning(true)
    setTimeout(() => { setCur(i); setTransitioning(false) }, 650)
  }

  useEffect(() => {
    const t = setInterval(() => goTo((cur + 1) % slides.length), 6500)
    return () => clearInterval(t)
  }, [cur])

  const slide = slides[cur]

  return (
    <section
      id="home"
      style={{ position: 'relative', minHeight: '100vh', overflow: 'hidden', display: 'flex', alignItems: 'center' }}
    >
      {/* BG images */}
      {slides.map((s, i) => (
        <motion.div
          key={i}
          animate={{ opacity: i === cur && !transitioning ? 1 : 0, scale: i === cur && !transitioning ? 1 : 1.04 }}
          transition={{ duration: 0.9, ease: 'easeInOut' }}
          style={{ position: 'absolute', inset: 0 }}
        >
          <img src={s.image} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', filter: 'brightness(0.3) contrast(1.15) saturate(0.9)' }} />
        </motion.div>
      ))}

      {/* Overlays */}
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(125deg, rgba(3,6,13,0.97) 0%, rgba(8,15,26,0.72) 45%, rgba(3,6,13,0.45) 100%)' }} />
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 60% 80% at 50% 50%, rgba(32,126,255,0.07) 0%, transparent 60%)' }} />

      {/* Big BG slide number — hidden on mobile */}
      <AnimatePresence mode="wait">
        <motion.div
          key={cur}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.6 }}
          style={{
            position: 'absolute', right: 44, bottom: '12%',
            fontFamily: 'Orbitron', fontWeight: 900, fontSize: 'clamp(80px, 14vw, 180px)',
            color: 'rgba(32,126,255,0.035)', lineHeight: 1,
            pointerEvents: 'none', userSelect: 'none',
          }}
        >
          0{cur + 1}
        </motion.div>
      </AnimatePresence>

      {/* Main Content */}
      <div style={{
        position: 'relative', zIndex: 10, width: '100%',
        maxWidth: 1400, margin: '0 auto',
        padding: '100px 16px 60px', /* top padding accounts for fixed navbar */
      }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={cur}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            style={{ maxWidth: 1220, textAlign: 'center', width: '100%', margin: '0 auto' }}
          >
            {/* Tag */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1, duration: 0.5 }}
              style={{ display: 'inline-flex', alignItems: 'center', gap: 10, marginBottom: 16, justifyContent: 'center' }}
            >
              <motion.div
                animate={{ opacity: [0.5, 1, 0.5], scale: [1, 1.3, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                style={{ width: 7, height: 7, borderRadius: '50%', background: slide.accent, boxShadow: `0 0 14px ${slide.accent}` }}
              />
              <span style={{ fontFamily: 'Share Tech Mono', fontSize: 'clamp(9px, 2vw, 11px)', letterSpacing: 3.5, color: slide.accent }}>
                SYS::{slide.tag}
              </span>
              <motion.div
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 1.2, repeat: Infinity }}
                style={{ width: 8, height: 14, background: slide.accent, opacity: 0.8 }}
              />
            </motion.div>

            {/* Headline */}
            <div style={{ marginBottom: 16 }}>
              {slide.headline.map((line, li) => (
                <motion.div
                  key={li}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.15 + li * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  style={{
                    fontFamily: 'Orbitron', fontWeight: 900, lineHeight: 1.05,
                    fontSize: 'clamp(36px, 8vw, 100px)',
                    color: li === 1 ? '#207eff' : '#ffffff',
                    letterSpacing: 1,
                  }}
                >
                  {line}
                </motion.div>
              ))}
            </div>

            {/* Divider */}
            <motion.div
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 20, transformOrigin: 'center', justifyContent: 'center' }}
            >
              <div style={{ height: 1, width: 'clamp(30px,5vw,70px)', background: 'linear-gradient(90deg, transparent, #207eff)' }} />
              <motion.div animate={{ rotate: 360 }} transition={{ duration: 6, repeat: Infinity, ease: 'linear' }} style={{ width: 5, height: 5, background: '#fa5330', transform: 'rotate(45deg)' }} />
              <div style={{ height: 1, width: 'clamp(30px,5vw,70px)', background: 'linear-gradient(90deg, #207eff, transparent)' }} />
            </motion.div>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55, duration: 0.5 }}
              style={{
                fontFamily: 'Rajdhani', fontSize: 'clamp(14px, 2.5vw, 16px)', fontWeight: 400,
                color: 'rgba(180,200,220,0.8)', lineHeight: 1.75, marginBottom: 36,
                maxWidth: 540, margin: '0 auto 36px',
              }}
            >
              {slide.sub}
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.65, duration: 0.5 }}
              style={{ display: 'flex', gap: 16, alignItems: 'center', flexWrap: 'wrap', marginBottom: 48, justifyContent: 'center' }}
            >
              <Link href="/services">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => document.querySelector('#services')?.scrollIntoView({ behavior: 'smooth' })}
                style={{ fontFamily: 'Orbitron', fontWeight: 700, fontSize: 'clamp(9px, 2vw, 10px)', letterSpacing: 2.5, textTransform: 'uppercase', color: '#fff', cursor: 'pointer', background: 'linear-gradient(135deg, #207eff 0%, #1260d8 100%)', border: 'none', padding: 'clamp(12px, 2vw, 14px) clamp(20px, 4vw, 32px)', position: 'relative', overflow: 'hidden' }}
              >
                <span style={{ position: 'relative', zIndex: 1 }}>Explore Services</span>
              </motion.button>

              </Link>

<Link href="/contact">
              <motion.button
                whileHover={{ scale: 1.05, borderColor: 'rgba(32,126,255,0.8)', color: '#fff' }}
                whileTap={{ scale: 0.97 }}
                onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
                style={{ fontFamily: 'Orbitron', fontWeight: 600, fontSize: 'clamp(9px, 2vw, 10px)', letterSpacing: 2.5, textTransform: 'uppercase', cursor: 'pointer', background: 'transparent', border: '1px solid rgba(32,126,255,0.4)', color: 'rgba(180,200,220,0.85)', padding: 'clamp(11px, 2vw, 13px) clamp(18px, 4vw, 30px)', transition: 'all 0.3s' }}
              >
                Contact Us
              </motion.button>
              </Link>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.5 }}
              style={{ display: 'flex', gap: 'clamp(20px, 5vw, 48px)', paddingTop: 24, borderTop: '1px solid rgba(26,45,71,0.9)', justifyContent: 'center', flexWrap: 'wrap' }}
            >
              {stats.map(({ num, label }, i) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.85 + i * 0.08 }}
                  whileHover={{ y: -2 }}
                  style={{ cursor: 'default', textAlign: 'center', minWidth: 'clamp(60px, 12vw, 80px)' }}
                >
                  <div style={{ fontFamily: 'Orbitron', fontWeight: 800, fontSize: 'clamp(20px, 4vw, 28px)', color: '#207eff', textShadow: '0 0 24px rgba(32,126,255,0.55)', lineHeight: 1 }}>{num}</div>
                  <div style={{ fontFamily: 'Share Tech Mono', fontSize: 'clamp(8px, 1.5vw, 10px)', letterSpacing: 2.5, color: 'rgba(128,153,184,0.65)', marginTop: 5, textTransform: 'uppercase' }}>{label}</div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Slide dots */}
      <div style={{ position: 'absolute', bottom: 24, left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: 8, zIndex: 20 }}>
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            style={{ height: 3, border: 'none', cursor: 'pointer', borderRadius: 2, background: i === cur ? '#207eff' : 'rgba(32,126,255,0.25)', width: i === cur ? 28 : 10, transition: 'all 0.4s', boxShadow: i === cur ? '0 0 8px #207eff' : 'none' }}
          />
        ))}
      </div>

      {/* Progress bar */}
      <motion.div
        key={cur}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 6.5, ease: 'linear' }}
        style={{ position: 'absolute', bottom: 0, left: 0, height: 2, width: '100%', transformOrigin: 'left', background: 'linear-gradient(90deg, #207eff, #fa5330)', opacity: 0.6, zIndex: 20 }}
      />
    </section>
  )
}