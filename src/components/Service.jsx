'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'

const services = [
  {
    svg: (
      <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/>
        <circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/>
      </svg>
    ),
    title: 'Consultancy',
    sub: 'ACADEMIC & RESEARCH SUPPORT',
    href: '/consultancy',
    stat: '500+', statLabel: 'Projects Guided',
    desc: "At Forensleuth, we extend our expertise to support students, researchers, and academic institutions through specialized consultancy services. Whether you are pursuing a Bachelor's, Master's, or Ph.D., we're here to guide you at every stage of your academic journey.",
    points: [
      'Dissertation & Thesis Assistance',
      'Research Paper Writing Support',
      'Data Analysis & Interpretation',
      'Literature Review & Referencing Help',
      'Plagiarism Check & Technical Editing',
    ],
    cta: 'Connect with our team today to schedule a personalized consultation.',
  },
  {
    svg: (
      <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
        <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
        <path d="M6 12v5c3 3 9 3 12 0v-5"/>
      </svg>
    ),
    title: 'Academic Services',
    sub: 'FORENSIC EDUCATION PROGRAMS',
    href: '/academic-services',
    stat: '50+', statLabel: 'Programs Offered',
    desc: 'Forensleuth is dedicated to advancing forensic education through structured and skill-based academic offerings. Our programs blend theoretical knowledge with practical application, making forensic science accessible, engaging, and career-oriented.',
    points: [
      'Short-Term Certification Courses (Online/Offline)',
      'Workshops & Hands-on Training Modules',
      'Webinars & Expert Lectures',
      'Curriculum Support for Colleges & Schools',
      'Internship & Project-Based Learning Opportunities',
    ],
    cta: 'Want to join our upcoming programs or collaborate with us academically?',
  },
  {
    svg: (
      <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
        <path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/>
        <polyline points="3.27 6.96 12 12.01 20.73 6.96"/>
        <line x1="12" y1="22.08" x2="12" y2="12"/>
      </svg>
    ),
    title: 'Kits & Educational Tools',
    sub: 'HANDS-ON FORENSIC LEARNING',
    href: '/kits-and-educational-tools',
    stat: '20+', statLabel: 'Kit Variants',
    desc: 'As part of our commitment to hands-on learning and scientific empowerment, Forensleuth offers specially curated forensic kits designed for students, educators, enthusiasts, and institutions — making forensic science interactive, practical, and accessible.',
    points: [
      'DIY Forensic Science Kits for school & college learners',
      'Customized Kits for Workshops & Training Programs',
      'Thematic Kits (fingerprinting, crime scene simulation)',
      'Instrumentation Kits for advanced forensic techniques',
      'Institutional Bulk Orders for NGOs & institutes',
    ],
    cta: 'Looking to integrate forensic kits into your curriculum, event, or training session?',
  },
]

const styles = `
  .services-section {
    padding: clamp(60px, 10vw, 120px) 0;
    background: #03060d;
    position: relative;
    overflow: hidden;
  }

  .services-bg {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: min(900px, 100vw);
    height: min(900px, 100vw);
    background: radial-gradient(circle, rgba(32,126,255,0.05) 0%, transparent 65%);
    pointer-events: none;
  }

  .services-container {
    max-width: 1280px;
    margin: 0 auto;
    padding: 0 clamp(16px, 5vw, 40px);
  }

  .services-header {
    text-align: center;
    margin-bottom: clamp(40px, 6vw, 80px);
  }

  .services-tag {
    margin-bottom: 24px;
    display: inline-flex;
    align-items: center;
    gap: 8px;
    font-family: 'Share Tech Mono', monospace;
    font-size: clamp(9px, 1.5vw, 11px);
    letter-spacing: 3px;
    color: rgba(32,126,255,0.7);
    border: 1px solid rgba(32,126,255,0.2);
    padding: 6px 14px;
    text-transform: uppercase;
  }

  .services-title {
    font-family: 'Orbitron', sans-serif;
    font-weight: 900;
    font-size: clamp(28px, 5vw, 64px);
    color: #fff;
    letter-spacing: 2px;
    line-height: 1.05;
    margin-bottom: 20px;
  }

  .services-title-accent {
    color: #207eff;
    text-shadow: 0 0 40px rgba(32,126,255,0.5);
  }

  .services-subtitle {
    font-family: 'Rajdhani', sans-serif;
    font-size: clamp(15px, 2vw, 18px);
    color: #8099b8;
    max-width: 560px;
    margin: 0 auto;
    line-height: 1.7;
  }

  .services-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 2px;
  }

  @media (max-width: 1023px) {
    .services-grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  @media (max-width: 639px) {
    .services-grid {
      grid-template-columns: 1fr;
    }
  }

  .service-card {
    padding: clamp(24px, 4vw, 36px) clamp(20px, 3.5vw, 32px) clamp(28px, 4vw, 40px);
    cursor: default;
    position: relative;
    display: flex;
    flex-direction: column;
    border: 1px solid #1a2d47;
    background: transparent;
    transition: border-color 0.3s;
  }

  .service-card:hover {
    border-color: rgba(32,126,255,0.4);
  }

  .card-top-row {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: clamp(16px, 3vw, 24px);
  }

  .card-icon {
    width: clamp(48px, 6vw, 58px);
    height: clamp(48px, 6vw, 58px);
    border: 1px solid #1a2d47;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #8099b8;
    background: rgba(16,28,46,0.5);
    transition: all 0.3s;
    position: relative;
    flex-shrink: 0;
  }

  .service-card:hover .card-icon {
    border-color: #207eff;
    color: #207eff;
    background: rgba(32,126,255,0.1);
  }

  .card-icon-ring {
    display: none;
    position: absolute;
    inset: -4px;
    border: 1px solid rgba(32,126,255,0.2);
  }

  .service-card:hover .card-icon-ring {
    display: block;
  }

  .card-stat {
    text-align: right;
  }

  .card-stat-num {
    font-family: 'Orbitron', sans-serif;
    font-weight: 800;
    font-size: clamp(18px, 2.5vw, 22px);
    color: rgba(32,126,255,0.4);
    line-height: 1;
    transition: color 0.3s;
  }

  .service-card:hover .card-stat-num {
    color: #207eff;
  }

  .card-stat-label {
    font-family: 'Share Tech Mono', monospace;
    font-size: clamp(7px, 1vw, 8px);
    letter-spacing: 1.5px;
    color: #8099b8;
    margin-top: 3px;
  }

  .card-sub {
    font-family: 'Share Tech Mono', monospace;
    font-size: clamp(8px, 1.2vw, 9px);
    letter-spacing: 3px;
    color: rgba(32,126,255,0.5);
    margin-bottom: 8px;
    text-transform: uppercase;
  }

  .card-title {
    font-family: 'Orbitron', sans-serif;
    font-weight: 700;
    font-size: clamp(13px, 1.8vw, 16px);
    color: rgba(220,235,255,0.9);
    letter-spacing: 1px;
    margin-bottom: 14px;
    transition: color 0.3s;
  }

  .service-card:hover .card-title {
    color: #fff;
  }

  .card-desc {
    font-family: 'Rajdhani', sans-serif;
    font-size: clamp(13px, 1.8vw, 15px);
    color: #8099b8;
    line-height: 1.7;
    margin-bottom: 20px;
  }

  .card-points {
    margin: 0 0 20px 0;
    padding: 0;
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .card-point {
    display: flex;
    align-items: flex-start;
    gap: 10px;
    font-family: 'Rajdhani', sans-serif;
    font-size: clamp(12px, 1.6vw, 14px);
    color: rgba(160,185,215,0.85);
    line-height: 1.5;
  }

  .card-point-dot {
    color: #207eff;
    flex-shrink: 0;
    margin-top: 1px;
    font-size: 10px;
  }

  .card-cta {
    font-family: 'Rajdhani', sans-serif;
    font-size: clamp(11px, 1.5vw, 13px);
    color: rgba(32,126,255,0.6);
    line-height: 1.6;
    margin-bottom: 24px;
    font-style: italic;
    margin-top: auto;
  }

  .card-link {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    font-family: 'Orbitron', sans-serif;
    font-size: clamp(8px, 1.2vw, 9px);
    font-weight: 700;
    letter-spacing: 2.5px;
    text-transform: uppercase;
    text-decoration: none;
    color: rgba(32,126,255,0.75);
    transition: color 0.3s;
    padding-top: 4px;
  }

  .service-card:hover .card-link {
    color: #fff;
  }

  .card-bottom-line {
    position: absolute;
    bottom: 0;
    left: 0;
    height: 2px;
    width: 0%;
    background: linear-gradient(90deg, #207eff, #fa5330);
    transition: width 0.4s ease;
  }

  .service-card:hover .card-bottom-line {
    width: 100%;
  }

  /* Reveal animation */
  .reveal {
    opacity: 0;
    transform: translateY(24px);
    transition: opacity 0.6s ease, transform 0.6s ease;
  }

  .reveal.visible {
    opacity: 1;
    transform: translateY(0);
  }

  .sys-tag {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    font-family: 'Share Tech Mono', monospace;
    font-size: clamp(9px, 1.5vw, 11px);
    letter-spacing: 3px;
    color: rgba(32,126,255,0.7);
    border: 1px solid rgba(32,126,255,0.2);
    padding: 6px 14px;
    text-transform: uppercase;
  }

  /* On mobile, make last card in 2-col grid full width */
  @media (min-width: 640px) and (max-width: 1023px) {
    .service-card:last-child:nth-child(odd) {
      grid-column: 1 / -1;
      max-width: 60%;
      margin: 0 auto;
      width: 100%;
    }
  }
`

export default function Services() {
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
    <>
      <style>{styles}</style>
      <section id="services" ref={ref} className="services-section">
        {/* BG */}
        <div className="services-bg" />

        <div className="services-container">
          {/* Header */}
          <div className="reveal services-header">
            <div className="sys-tag" style={{ marginBottom: 24 }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#207eff', display: 'inline-block' }} />
              FORENSIC CAPABILITIES
            </div>
            <h2 className="services-title">
              SPECIALIZED <span className="services-title-accent">SERVICES</span>
            </h2>
            <p className="services-subtitle">
              Every service engineered for scientific precision and legal admissibility. No compromises.
            </p>
          </div>

          {/* Grid */}
          <div className="services-grid">
            {services.map((s, i) => (
              <div
                key={s.title}
                className="reveal service-card"
                style={{ transitionDelay: `${i * 0.08}s` }}
              >
                {/* Top row: icon + stat */}
                <div className="card-top-row">
                  <div className="card-icon">
                    {s.svg}
                    <div className="card-icon-ring" />
                  </div>
                  <div className="card-stat">
                    <div className="card-stat-num">{s.stat}</div>
                    <div className="card-stat-label">{s.statLabel}</div>
                  </div>
                </div>

                {/* Sub tag */}
                <div className="card-sub">{s.sub}</div>

                {/* Title */}
                <h3 className="card-title">{s.title}</h3>

                {/* Desc */}
                <p className="card-desc">{s.desc}</p>

                {/* Bullet points */}
                <ul className="card-points">
                  {s.points.map((point, pi) => (
                    <li key={pi} className="card-point">
                      <span className="card-point-dot">◈</span>
                      {point}
                    </li>
                  ))}
                </ul>

                {/* CTA line */}
                <p className="card-cta">{s.cta}</p>

                {/* View More button */}
                <Link href={s.href} className="card-link">
                  <span>View More</span>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="5" y1="12" x2="19" y2="12"/>
                    <polyline points="12 5 19 12 12 19"/>
                  </svg>
                </Link>

                {/* Bottom accent line */}
                <div className="card-bottom-line" />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}