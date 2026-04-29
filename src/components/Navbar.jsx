'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Services', href: '/services', hasDropdown: true },
  { label: 'Contact', href: '/contact' },
]

const servicesDropdown = [
  { label: 'Empowerment Initiatives', href: '/services/empowerment-initiatives', icon: '◈' },
  { label: 'Consultancy', href: '/services/consultancy', icon: '◎' },
  { label: 'Academic Services', href: '/services/academic-services', icon: '◫' },
  { label: 'Investigation Services', href: '/services/investigation-services', icon: '◷' },
  { label: 'Kits & Educational Tools', href: '/services/kits-and-educational-tools', icon: '◉' },
]

const burgerLinks = [
  { label: 'Broucher', href: '/broucher', icon: '◈' },
  { label: 'Gallery', href: '/gallery', icon: '◫' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeLink, setActiveLink] = useState('Home')
  const [servicesOpen, setServicesOpen] = useState(false)
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false)
  const dropdownRef = useRef(null)
  const burgerRef = useRef(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) setServicesOpen(false)
      if (burgerRef.current && !burgerRef.current.contains(e.target)) setMenuOpen(false)
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  const handleHashScroll = (href, label) => {
    setMenuOpen(false)
    setMobileOpen(false)
    setServicesOpen(false)
    setMobileServicesOpen(false)
    if (label) setActiveLink(label)
    const hash = href.includes('#') ? href.split('#')[1] : null
    if (hash) {
      const el = document.getElementById(hash)
      if (el) el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <>
      <style>{`
        /* ── Reset ── */
        *, *::before, *::after { box-sizing: border-box; }

        /* ── Desktop nav items: hidden on mobile by default ── */
        .nav-desktop { display: none !important; }
        .nav-mobile-btn { display: flex !important; }

        /* Desktop 1024px+ */
        @media (min-width: 1024px) {
          .nav-desktop { display: flex !important; }
          .nav-mobile-btn { display: none !important; }
        }

        /* ── Navbar inner wrapper ── */
        .nav-inner {
          max-width: 1320px;
          margin: 0 auto;
          padding: 0 16px;
          height: 80px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        @media (min-width: 768px) {
          .nav-inner { height: 68px; padding: 0 24px; }
        }
        @media (min-width: 1024px) {
          .nav-inner { height: 72px; padding: 0 32px; }
        }

        /* ── Logo ── */
        .nav-logo-wrap {
          position: relative;
          width: 160px;
          height: 160px;
          flex-shrink: 0;
        }
        @media (min-width: 768px) {
          .nav-logo-wrap { width: 170px; height: 170px; margin-top: 12px; }
        }
        @media (min-width: 1024px) {
          .nav-logo-wrap { width: 200px; height: 200px; margin-top: 12px; }
        }

        /* ── Mobile hamburger button ── */
        .mobile-hamburger {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          gap: 5px;
          width: 40px;
          height: 40px;
          padding: 0;
          background: transparent;
          border: 1px solid rgba(32, 126, 255, 0.3);
          cursor: pointer;
          transition: background 0.3s;
          flex-shrink: 0;
        }
        .mobile-hamburger:hover,
        .mobile-hamburger.is-open {
          background: rgba(32, 126, 255, 0.1);
        }
        .mobile-hamburger .bar {
          display: block;
          width: 20px;
          height: 2px;
          border-radius: 1px;
          transition: transform 0.28s ease, opacity 0.28s ease, background 0.28s ease;
          transform-origin: center;
        }
        .mobile-hamburger .bar-1 { background: #207eff; }
        .mobile-hamburger .bar-2 { background: #fa5330; width: 14px; }
        .mobile-hamburger .bar-3 { background: #207eff; }

        .mobile-hamburger.is-open .bar-1 { transform: rotate(45deg) translate(0, 7px); }
        .mobile-hamburger.is-open .bar-2 { opacity: 0; transform: scaleX(0); }
        .mobile-hamburger.is-open .bar-3 { transform: rotate(-45deg) translate(0, -7px); }

        /* ── Tablet CTA ── */
        .tablet-cta { display: none !important; }
        @media (min-width: 600px) and (max-width: 1023px) {
          .tablet-cta { display: inline-block !important; }
        }

        /* ── Dropdown hover ── */
        .nav-link-item:hover { color: #207eff !important; }
        .dropdown-item:hover { background: rgba(32, 126, 255, 0.08); transform: translateX(4px); }

        /* ── Desktop burger (more) ── */
        .desktop-burger {
          display: flex;
          flex-direction: column;
          gap: 5px;
          padding: 9px 10px;
          background: transparent;
          border: 1px solid rgba(32, 126, 255, 0.22);
          cursor: pointer;
          transition: background 0.3s;
        }
        .desktop-burger:hover,
        .desktop-burger.is-open {
          background: rgba(32, 126, 255, 0.1);
        }

        /* ── Mobile menu overlay ── */
        .mobile-menu-overlay {
          position: fixed;
          inset: 0;
          z-index: 99;
          background: rgba(3, 6, 13, 0.98);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          display: flex;
          flex-direction: column;
          overflow-y: auto;
        }
        .mobile-menu-body {
          flex: 1;
          padding: 80px 24px 40px;
          display: flex;
          flex-direction: column;
        }
        @media (min-width: 480px) {
          .mobile-menu-body { padding: 88px 32px 48px; }
        }
        @media (min-width: 768px) {
          .mobile-menu-body { padding: 96px 48px 56px; }
        }

        /* ── Mobile link sizes ── */
        .mobile-nav-link {
          font-family: 'Orbitron', sans-serif;
          font-size: 13px;
          letter-spacing: 2.5px;
          text-transform: uppercase;
          padding: 16px 0;
          border-bottom: 1px solid rgba(32, 126, 255, 0.1);
          display: block;
          text-decoration: none;
          transition: color 0.2s;
        }
        @media (min-width: 480px) {
          .mobile-nav-link { font-size: 15px; letter-spacing: 3px; padding: 18px 0; }
        }
        @media (min-width: 768px) {
          .mobile-nav-link { font-size: 17px; letter-spacing: 3.5px; padding: 20px 0; }
        }

        /* ── Mobile CTA button ── */
        .mobile-cta-btn {
          display: block;
          text-align: center;
          text-decoration: none;
          font-family: 'Orbitron', sans-serif;
          font-weight: 700;
          font-size: 12px;
          letter-spacing: 3px;
          text-transform: uppercase;
          color: #fff;
          background: linear-gradient(135deg, #207eff 0%, #1260d8 100%);
          padding: 16px 32px;
          box-shadow: 0 0 32px rgba(32, 126, 255, 0.4);
          transition: opacity 0.2s;
        }
        @media (min-width: 480px) {
          .mobile-cta-btn { font-size: 13px; padding: 18px 40px; }
        }

        /* ── Desktop nav gap ── */
        @media (min-width: 1280px) {
          .nav-desktop { gap: 32px !important; }
        }
      `}</style>

      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        style={{
          position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
          overflow: 'visible',
          transition: 'background 0.5s ease, border-color 0.5s ease, box-shadow 0.5s ease',
          background: scrolled ? 'rgba(3,6,13,0.97)' : 'rgba(3,6,13,0.85)',
          backdropFilter: 'blur(32px) saturate(1.4)',
          WebkitBackdropFilter: 'blur(32px) saturate(1.4)',
          borderBottom: scrolled ? '1px solid rgba(32,126,255,0.14)' : '1px solid rgba(32,126,255,0.06)',
          boxShadow: scrolled ? '0 4px 60px rgba(0,0,0,0.7), inset 0 -1px 0 rgba(32,126,255,0.08)' : 'none',
        }}
      >
        {/* Slim accent line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.8, duration: 1, ease: 'easeOut' }}
          style={{
            position: 'absolute', top: 0, left: 0, right: 0, height: 1,
            background: 'linear-gradient(90deg, transparent 0%, #207eff 30%, #fa5330 70%, transparent 100%)',
            opacity: 0.6, transformOrigin: 'left',
          }}
        />

        <div className="nav-inner">

          {/* ── Logo ── */}
          <Link href="/" onClick={() => setActiveLink('Home')} style={{ textDecoration: 'none', flexShrink: 0 }}>
            <motion.div
              whileHover={{ scale: 1.04 }}
              transition={{ type: 'spring', stiffness: 400, damping: 20 }}
              className="nav-logo-wrap"
            >
              <Image src="/logo.png" alt="ForensIQ Logo" fill style={{ objectFit: 'contain' }} priority />
            </motion.div>
          </Link>

          {/* ── DESKTOP NAV (1024px+) ── */}
          <div
            className="nav-desktop"
            style={{ alignItems: 'center', gap: 24, flexShrink: 0 }}
          >
            {navLinks.map((link, i) =>
              link.hasDropdown ? (
                <div key={link.label} style={{ position: 'relative' }} ref={dropdownRef}>
                  <motion.button
                    onClick={() => { setServicesOpen(!servicesOpen); setMenuOpen(false) }}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * i + 0.3, duration: 0.5 }}
                    style={{
                      fontFamily: 'Orbitron', fontSize: 10, fontWeight: 500,
                      letterSpacing: 2.5, textTransform: 'uppercase',
                      color: activeLink === link.label ? '#207eff' : 'rgba(180,200,220,0.75)',
                      background: 'none', border: 'none', cursor: 'pointer',
                      padding: '6px 0', position: 'relative',
                      display: 'flex', alignItems: 'center', gap: 6,
                      transition: 'color 0.3s',
                    }}
                  >
                    {link.label}
                    <motion.svg
                      animate={{ rotate: servicesOpen ? 180 : 0 }}
                      transition={{ duration: 0.25 }}
                      width="10" height="10" viewBox="0 0 10 10" fill="none"
                    >
                      <path d="M2 3.5L5 6.5L8 3.5" stroke={activeLink === link.label ? '#207eff' : 'rgba(180,200,220,0.75)'} strokeWidth="1.5" strokeLinecap="round" />
                    </motion.svg>
                    {activeLink === link.label && (
                      <motion.div
                        layoutId="nav-underline"
                        style={{ position: 'absolute', bottom: -1, left: 0, right: 0, height: 1, background: 'linear-gradient(90deg, #207eff, transparent)' }}
                        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                      />
                    )}
                  </motion.button>

                  <AnimatePresence>
                    {servicesOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -8, scale: 0.97 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -8, scale: 0.97 }}
                        transition={{ duration: 0.22, ease: 'easeOut' }}
                        style={{
                          position: 'absolute', left: '50%', transform: 'translateX(-50%)',
                          top: 48,
                          background: 'linear-gradient(160deg, #0d1626 0%, #080f1a 100%)',
                          border: '1px solid rgba(32,126,255,0.15)',
                          minWidth: 240, zIndex: 200,
                          boxShadow: '0 24px 80px rgba(0,0,0,0.85)',
                          overflow: 'hidden',
                        }}
                      >
                        <div style={{ padding: '10px 18px 8px', fontFamily: 'Orbitron', fontSize: 9, letterSpacing: 3, color: 'rgba(32,126,255,0.45)', borderBottom: '1px solid rgba(32,126,255,0.08)' }}>OUR_SERVICES</div>
                        {servicesDropdown.map((item, idx) => (
                          <Link key={item.label} href={item.href} onClick={() => { setServicesOpen(false); setActiveLink('Services') }} style={{ textDecoration: 'none' }}>
                            <motion.div
                              className="dropdown-item"
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: idx * 0.06 }}
                              style={{
                                display: 'flex', alignItems: 'center', gap: 14,
                                padding: '13px 18px',
                                fontFamily: 'Orbitron', fontSize: 10, letterSpacing: 2,
                                color: 'rgba(180,200,220,0.7)', textTransform: 'uppercase',
                                borderBottom: '1px solid rgba(26,45,71,0.4)',
                                transition: 'all 0.2s',
                              }}
                            >
                              <span style={{ color: '#207eff', fontSize: 15 }}>{item.icon}</span>
                              {item.label}
                            </motion.div>
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <Link key={link.label} href={link.href} onClick={() => handleHashScroll(link.href, link.label)} style={{ textDecoration: 'none' }}>
                  <motion.span
                    className="nav-link-item"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * i + 0.3, duration: 0.5 }}
                    style={{
                      fontFamily: 'Orbitron', fontSize: 10, fontWeight: 500,
                      letterSpacing: 2.5, textTransform: 'uppercase',
                      color: activeLink === link.label ? '#207eff' : 'rgba(180,200,220,0.75)',
                      textDecoration: 'none', position: 'relative', padding: '6px 0',
                      display: 'block', transition: 'color 0.3s', cursor: 'pointer',
                    }}
                  >
                    {link.label}
                    {activeLink === link.label && (
                      <motion.div
                        layoutId="nav-underline"
                        style={{ position: 'absolute', bottom: -1, left: 0, right: 0, height: 1, background: 'linear-gradient(90deg, #207eff, transparent)' }}
                        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                      />
                    )}
                  </motion.span>
                </Link>
              )
            )}

            {/* Desktop "More" burger dropdown */}
            <div style={{ position: 'relative' }} ref={burgerRef}>
              <button
                className={`desktop-burger${menuOpen ? ' is-open' : ''}`}
                onClick={() => { setMenuOpen(!menuOpen); setServicesOpen(false) }}
                aria-label="More sections"
              >
                {[0, 1, 2].map((i) => (
                  <motion.span
                    key={i}
                    animate={{
                      rotate: menuOpen && i === 0 ? 45 : menuOpen && i === 2 ? -45 : 0,
                      y: menuOpen && i === 0 ? 6.5 : menuOpen && i === 2 ? -6.5 : 0,
                      opacity: menuOpen && i === 1 ? 0 : 1,
                      width: i === 1 ? (menuOpen ? 22 : 14) : 22,
                    }}
                    transition={{ duration: 0.25 }}
                    style={{ display: 'block', height: 1.5, background: i === 1 ? '#fa5330' : '#207eff', transformOrigin: 'center' }}
                  />
                ))}
              </button>

              <AnimatePresence>
                {menuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -8, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -8, scale: 0.97 }}
                    transition={{ duration: 0.22, ease: 'easeOut' }}
                    style={{
                      position: 'absolute', right: 0, top: 52,
                      background: 'linear-gradient(160deg, #0d1626 0%, #080f1a 100%)',
                      border: '1px solid rgba(32,126,255,0.15)',
                      minWidth: 210, zIndex: 200,
                      boxShadow: '0 24px 80px rgba(0,0,0,0.85)',
                      overflow: 'hidden',
                    }}
                  >
                    <div style={{ padding: '10px 18px 8px', fontFamily: 'Orbitron', fontSize: 9, letterSpacing: 3, color: 'rgba(32,126,255,0.45)', borderBottom: '1px solid rgba(32,126,255,0.08)' }}>MORE_SECTIONS</div>
                    {burgerLinks.map((link, i) => (
                      <Link key={link.label} href={link.href} onClick={() => handleHashScroll(link.href, link.label)} style={{ textDecoration: 'none' }}>
                        <motion.div
                          className="dropdown-item"
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.06 }}
                          style={{
                            display: 'flex', alignItems: 'center', gap: 14,
                            padding: '13px 18px',
                            fontFamily: 'Orbitron', fontSize: 10, letterSpacing: 2,
                            color: 'rgba(180,200,220,0.7)', textTransform: 'uppercase',
                            borderBottom: '1px solid rgba(26,45,71,0.4)',
                            transition: 'all 0.2s',
                          }}
                        >
                          <span style={{ color: '#207eff', fontSize: 15 }}>{link.icon}</span>
                          {link.label}
                        </motion.div>
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Desktop CTA */}
            <Link href="/carrier" onClick={() => handleHashScroll('/contact', 'Contact')} style={{ textDecoration: 'none' }}>
              <motion.button
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6 }}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                style={{
                  fontFamily: 'Orbitron', fontWeight: 700, fontSize: 10,
                  letterSpacing: 2.5, textTransform: 'uppercase', color: '#fff',
                  cursor: 'pointer',
                  background: 'linear-gradient(135deg, #207eff 0%, #1260d8 100%)',
                  border: 'none', padding: '11px 20px',
                  boxShadow: '0 0 24px rgba(32,126,255,0.35)',
                  position: 'relative', overflow: 'hidden', whiteSpace: 'nowrap',
                }}
              >
                <span style={{ position: 'relative', zIndex: 1 }}>Carrier</span>
              </motion.button>
            </Link>
          </div>

          {/* ── MOBILE / TABLET RIGHT SIDE (<1024px) ── */}
          <div className="nav-mobile-btn" style={{ alignItems: 'center', gap: 10, flexShrink: 0 }}>
            {/* Tablet-only CTA */}
            <Link
              href="/#contact"
              onClick={() => setMobileOpen(false)}
              className="tablet-cta"
              style={{
                textDecoration: 'none',
                fontFamily: 'Orbitron', fontWeight: 700, fontSize: 9,
                letterSpacing: 2, textTransform: 'uppercase', color: '#fff',
                background: 'linear-gradient(135deg, #207eff 0%, #1260d8 100%)',
                padding: '8px 14px',
                boxShadow: '0 0 16px rgba(32,126,255,0.3)',
                whiteSpace: 'nowrap',
              }}
            >
              Initiate
            </Link>

            {/* Hamburger — fixed 40×40 touch target */}
            <button
              className={`mobile-hamburger${mobileOpen ? ' is-open' : ''}`}
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
              aria-expanded={mobileOpen}
            >
              <span className="bar bar-1" />
              <span className="bar bar-2" />
              <span className="bar bar-3" />
            </button>
          </div>
        </div>
      </motion.nav>

      {/* ── MOBILE MENU OVERLAY ── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="mobile-menu-overlay"
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            {/* Accent bar */}
            <div style={{ height: 2, background: 'linear-gradient(90deg, #207eff, #fa5330)', flexShrink: 0 }} />

            <div className="mobile-menu-body">
              <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.label}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.07 + 0.1 }}
                  >
                    {link.hasDropdown ? (
                      <>
                        <button
                          onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                          style={{
                            width: '100%', textAlign: 'left',
                            background: 'none', border: 'none', cursor: 'pointer',
                            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                          }}
                          className="mobile-nav-link"
                        >
                          <span style={{ color: 'rgba(180,200,220,0.85)' }}>{link.label}</span>
                          <motion.span
                            animate={{ rotate: mobileServicesOpen ? 90 : 0 }}
                            transition={{ duration: 0.25 }}
                            style={{ color: '#207eff', fontSize: 20, lineHeight: 1, display: 'inline-block' }}
                          >›</motion.span>
                        </button>

                        <AnimatePresence>
                          {mobileServicesOpen && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.25 }}
                              style={{ overflow: 'hidden' }}
                            >
                              <div style={{ paddingLeft: 16, paddingBottom: 8, paddingTop: 4 }}>
                                {servicesDropdown.map((item, idx) => (
                                  <motion.div
                                    key={item.label}
                                    initial={{ opacity: 0, x: -8 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: idx * 0.05 }}
                                  >
                                    <Link
                                      href={item.href}
                                      onClick={() => { setMobileOpen(false); setMobileServicesOpen(false) }}
                                      style={{
                                        textDecoration: 'none', display: 'flex',
                                        alignItems: 'center', gap: 12,
                                        padding: '13px 0',
                                        fontFamily: 'Orbitron', fontSize: 11, letterSpacing: 2,
                                        color: 'rgba(140,170,210,0.7)', textTransform: 'uppercase',
                                        borderBottom: '1px solid rgba(26,45,71,0.3)',
                                      }}
                                    >
                                      <span style={{ color: '#207eff', fontSize: 14 }}>{item.icon}</span>
                                      {item.label}
                                    </Link>
                                  </motion.div>
                                ))}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </>
                    ) : (
                      <Link
                        href={link.href}
                        onClick={() => handleHashScroll(link.href, link.label)}
                        className="mobile-nav-link"
                        style={{ color: activeLink === link.label ? '#207eff' : 'rgba(180,200,220,0.85)' }}
                      >
                        {link.label}
                      </Link>
                    )}
                  </motion.div>
                ))}

                {/* Extra burger links */}
                {burgerLinks.map((link, i) => (
                  <motion.div
                    key={link.label}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: (navLinks.length + i) * 0.07 + 0.1 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => handleHashScroll(link.href, link.label)}
                      style={{
                        textDecoration: 'none', display: 'flex',
                        alignItems: 'center', gap: 12,
                        fontFamily: 'Orbitron', fontSize: 12, letterSpacing: 2.5,
                        textTransform: 'uppercase',
                        color: 'rgba(140,170,210,0.7)',
                        padding: '16px 0',
                        borderBottom: '1px solid rgba(26,45,71,0.3)',
                      }}
                    >
                      <span style={{ color: '#207eff', fontSize: 14 }}>{link.icon}</span>
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
              </div>

              {/* Mobile CTA */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                style={{ marginTop: 'auto', paddingTop: 40 }}
              >
                <Link
                  href="/#contact"
                  onClick={() => setMobileOpen(false)}
                  className="mobile-cta-btn"
                >
                  Initiate Investigation
                </Link>
                <div style={{ marginTop: 24, height: 1, background: 'linear-gradient(90deg, transparent, rgba(32,126,255,0.3), transparent)' }} />
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}