'use client'

import { useEffect, useRef, useState } from 'react'

const testimonials = [
  {
    name: 'Priya Sharma',
    role: 'Forensic Science Student',
    org: 'STUDENT',
    text: "The training sessions were highly informative and practical. Forensleuth helped me understand real-world forensic applications beyond textbooks.",
    initials: 'PS', color: '#207eff', stars: 5,
  },
  {
    name: 'Aman Verma',
    role: 'Research Intern',
    org: 'INTERN',
    text: "One of the best platforms for forensic learning and research guidance. The mentorship and support were exceptional.",
    initials: 'AV', color: '#fa5330', stars: 5,
  },
  {
    name: 'Riya Singh',
    role: 'Cyber Forensics Trainee',
    org: 'TRAINEE',
    text: "The workshop on digital forensics was engaging, well-structured, and industry-oriented. Highly recommended for students.",
    initials: 'RS', color: '#207eff', stars: 5,
  },
  {
    name: 'Neha Gupta',
    role: 'Research Scholar',
    org: 'ACADEMIA',
    text: "Forensleuth provided excellent guidance during my research work and publication process. The team was professional and supportive throughout.",
    initials: 'NG', color: '#fa5330', stars: 5,
  },
  {
    name: 'Abhishek Kumar',
    role: 'Postgraduate Student',
    org: 'STUDENT',
    text: "Their academic consultancy services helped me improve the quality and presentation of my thesis significantly.",
    initials: 'AK', color: '#207eff', stars: 5,
  },
  {
    name: 'Rajeev Mishra',
    role: 'Legal Consultant',
    org: 'LEGAL',
    text: "Professional approach, quality service, and timely delivery made working with Forensleuth a great experience.",
    initials: 'RM', color: '#fa5330', stars: 5,
  },
  {
    name: 'Corporate Client',
    role: 'Investigation Services',
    org: 'CORPORATE',
    text: "The investigation insights and forensic consultation provided by the team were detailed, accurate, and highly reliable.",
    initials: 'CC', color: '#207eff', stars: 5,
  },
  {
    name: 'Academic Collaborator',
    role: 'Forensic Science & Research',
    org: 'ACADEMIA',
    text: "Forensleuth stands out for its commitment to quality, innovation, and professional excellence in forensic science and research services.",
    initials: 'AC', color: '#fa5330', stars: 5,
  },
]

const CARDS_PER_PAGE = 4
const TOTAL_PAGES = Math.ceil(testimonials.length / CARDS_PER_PAGE)

export default function Testimonials() {
  const [active, setActive] = useState(0)
  const [page, setPage] = useState(0)
  const [animating, setAnimating] = useState(false)
  const [direction, setDirection] = useState(1) // 1 = forward, -1 = backward
  const ref = useRef(null)

  const visibleCards = testimonials.slice(page * CARDS_PER_PAGE, page * CARDS_PER_PAGE + CARDS_PER_PAGE)

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible') }),
      { threshold: 0.1 }
    )
    ref.current?.querySelectorAll('.reveal').forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  // Auto-advance active card within current page
  useEffect(() => {
    const t = setInterval(() => {
      setActive(p => {
        const nextLocal = (p + 1) % CARDS_PER_PAGE
        if (nextLocal === 0) {
          // Move to next page
          goToPage((page + 1) % TOTAL_PAGES, 1)
        }
        return nextLocal
      })
    }, 4000)
    return () => clearInterval(t)
  }, [page])

  const goToPage = (newPage, dir) => {
    if (animating || newPage === page) return
    setDirection(dir)
    setAnimating(true)
    setTimeout(() => {
      setPage(newPage)
      setActive(0)
      setAnimating(false)
    }, 350)
  }

  const handlePrev = () => goToPage((page - 1 + TOTAL_PAGES) % TOTAL_PAGES, -1)
  const handleNext = () => goToPage((page + 1) % TOTAL_PAGES, 1)

  return (
    <section
      ref={ref}
      style={{
        position: 'relative',
        width: '100%',
        background: '#080f1a',
        paddingTop: 'clamp(64px, 10vw, 120px)',
        paddingBottom: 'clamp(64px, 10vw, 120px)',
        overflow: 'hidden',
      }}
    >
      <style>{`
        .t-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(min(100%, 460px), 1fr));
          gap: 2px;
          transition: opacity 0.35s ease, transform 0.35s ease;
        }
        .t-grid.slide-out-left  { opacity: 0; transform: translateX(-40px); }
        .t-grid.slide-out-right { opacity: 0; transform: translateX(40px); }
        .t-grid.slide-in        { opacity: 1; transform: translateX(0); }

        .t-nav-btn {
          width: 40px; height: 40px;
          border: 1px solid rgba(32,126,255,0.25);
          background: rgba(32,126,255,0.06);
          color: #207eff;
          cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          transition: background 0.25s, border-color 0.25s;
          flex-shrink: 0;
        }
        .t-nav-btn:hover {
          background: rgba(32,126,255,0.15);
          border-color: rgba(32,126,255,0.5);
        }
        .t-nav-btn:disabled {
          opacity: 0.3; cursor: default;
        }
        .t-card {
          padding: clamp(24px, 3vw, 36px) clamp(20px, 3vw, 32px);
          cursor: pointer;
          transition: all 0.4s ease;
        }
        .t-card:hover { opacity: 1 !important; }

        .reveal { opacity: 0; transform: translateY(24px); transition: opacity 0.7s ease, transform 0.7s ease; }
        .reveal.visible { opacity: 1; transform: translateY(0); }
      `}</style>

      <div style={{
        position: 'relative', zIndex: 1,
        maxWidth: 1380,
        margin: '0 auto',
        paddingLeft: 'clamp(16px, 5vw, 80px)',
        paddingRight: 'clamp(16px, 5vw, 80px)',
      }}>

        {/* Header */}
        <div className="reveal" style={{ textAlign: 'center', marginBottom: 'clamp(40px, 6vw, 72px)' }}>
          <div className="sys-tag" style={{ marginBottom: 24, display: 'inline-flex' }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#207eff', display: 'inline-block' }} />
            CLIENT REPORTS
          </div>
          <h2 style={{
            fontFamily: 'Orbitron', fontWeight: 900,
            fontSize: 'clamp(28px, 4vw, 60px)',
            color: '#fff', letterSpacing: 2, lineHeight: 1.1, margin: 0,
          }}>
            FIELD <span style={{ color: '#207eff', textShadow: '0 0 40px rgba(32,126,255,0.5)' }}>INTELLIGENCE</span>
          </h2>
        </div>

        {/* Cards */}
        <div className="reveal">
          <div
            className={`t-grid ${animating ? (direction === 1 ? 'slide-out-left' : 'slide-out-right') : 'slide-in'}`}
          >
            {visibleCards.map((t, i) => {
              const globalIdx = page * CARDS_PER_PAGE + i
              return (
                <div
                  key={t.name}
                  className="t-card"
                  style={{
                    borderLeft: `3px solid ${i === active ? t.color : '#1a2d47'}`,
                    background: i === active
                      ? 'linear-gradient(145deg, #101c2e, #0d1828)'
                      : 'linear-gradient(145deg, #0a1220, #080f1a)',
                    opacity: i === active ? 1 : 0.7,
                  }}
                  onClick={() => setActive(i)}
                >
                  {/* top row */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
                    <div style={{ fontFamily: 'Share Tech Mono', fontSize: 8, letterSpacing: 3, color: t.color, opacity: 0.7 }}>{t.org}</div>
                    <div style={{ display: 'flex', gap: 2 }}>
                      {[...Array(t.stars)].map((_, si) => (
                        <svg key={si} width="12" height="12" viewBox="0 0 24 24" fill="#f59e0b" stroke="none">
                          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                        </svg>
                      ))}
                    </div>
                  </div>

                  <div style={{
                    fontFamily: 'Orbitron', fontSize: 48, lineHeight: 0.8, marginBottom: 16, opacity: 0.4,
                    color: i === active ? t.color : '#1a2d47', transition: 'color 0.4s',
                  }}>&ldquo;</div>

                  <p style={{
                    fontFamily: 'Rajdhani', fontSize: 'clamp(14px, 1.5vw, 16px)',
                    color: i === active ? '#c8d8eb' : '#8099b8',
                    lineHeight: 1.75, marginBottom: 24, transition: 'color 0.4s',
                  }}>
                    {t.text}
                  </p>

                  <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                    <div style={{
                      width: 44, height: 44, flexShrink: 0,
                      background: `linear-gradient(135deg, ${t.color}, ${t.color}80)`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontFamily: 'Orbitron', fontWeight: 700, fontSize: 13, color: '#fff',
                    }}>
                      {t.initials}
                    </div>
                    <div>
                      <div style={{ fontFamily: 'Orbitron', fontWeight: 600, fontSize: 12, color: '#fff', letterSpacing: 1 }}>{t.name}</div>
                      <div style={{ fontFamily: 'Share Tech Mono', fontSize: 10, color: '#8099b8', marginTop: 3 }}>{t.role}</div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Navigation row */}
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 16, marginTop: 40 }}>
          {/* Prev */}
          <button className="t-nav-btn" onClick={handlePrev} aria-label="Previous">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M10 3L5 8L10 13" stroke="#207eff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>

          {/* Page dots */}
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            {Array.from({ length: TOTAL_PAGES }).map((_, i) => (
              <button
                key={i}
                onClick={() => goToPage(i, i > page ? 1 : -1)}
                style={{
                  height: 3, border: 'none', cursor: 'pointer', borderRadius: 2,
                  background: i === page ? '#207eff' : '#1a2d47',
                  boxShadow: i === page ? '0 0 10px #207eff' : 'none',
                  transition: 'all 0.4s',
                  width: i === page ? 32 : 12,
                  padding: 0,
                }}
              />
            ))}
          </div>

          {/* Next */}
          <button className="t-nav-btn" onClick={handleNext} aria-label="Next">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M6 3L11 8L6 13" stroke="#207eff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>

        {/* Page count label */}
        <div style={{ textAlign: 'center', marginTop: 16, fontFamily: 'Share Tech Mono', fontSize: 10, letterSpacing: 3, color: 'rgba(32,126,255,0.4)' }}>
          PAGE_{String(page + 1).padStart(2, '0')} / {String(TOTAL_PAGES).padStart(2, '0')}
        </div>

      </div>
    </section>
  )
}