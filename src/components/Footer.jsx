'use client'

export default function Footer() {
  const cols = [
    {
      title: 'SERVICES',
      links: [
        { label: 'Digital Forensics',      href: '/services/digital-forensics' },
        { label: 'Mobile Forensics',        href: '/services/mobile-forensics' },
        { label: 'Network Forensics',       href: '/services/network-forensics' },
        { label: 'Cyber Incident Response', href: '/services/cyber-incident-response' },
        { label: 'OSINT Investigations',    href: '/services/osint-investigations' },
        { label: 'Forensic Training',       href: '/services/forensic-training' },
      ],
    },
    {
      title: 'ORGANIZATION',
      links: [
        { label: 'About Us',      href: '/about' },
        { label: 'Our Team',      href: '/about/team' },
        { label: 'Certifications',href: '/about/certifications' },
        { label: 'Case Studies',  href: '/case-studies' },
        { label: 'Press & Media', href: '/press' },
        { label: 'Careers',       href: '/careers' },
      ],
    },
    {
      title: 'RESOURCES',
      links: [
        { label: 'Intelligence Blog', href: '/blog' },
        { label: 'White Papers',      href: '/resources/white-papers' },
        { label: 'Webinars',          href: '/resources/webinars' },
        { label: 'Documentation',     href: '/docs' },
        { label: 'Privacy Policy',    href: '/privacy' },
        { label: 'Terms of Service',  href: '/terms' },
      ],
    },
  ]

  // ✅ Yahan apne real social URLs replace karo
  const socials = [
   
    {
      label: 'IN',
      href: 'https://www.linkedin.com/company/forensleuth/', // ← apna LinkedIn URL
      title: 'Connect on LinkedIn',
    },
    {
      label: 'WEB',
      href: 'https://chat.whatsapp.com/EoYB1SWtEzi0pDLbWgeKDy',       // ← apna GitHub URL
      title: 'View on whatsapp',
    },
    {
      label: 'TL',
      href: 'https://t.me/forensleuth',     // ← apna YouTube URL
      title: 'Watch on Telegram',
    },
     {
      label: 'IN',
      href: 'https://www.instagram.com/forensleuth?igsh=MTFjYzl0djAwb2tkOQ%3D%3D&utm_source=qr',     // ← apna YouTube URL
      title: 'Follow on Instagram',
    },
  ]

  return (
    <footer style={{ background: '#03060d', position: 'relative', overflow: 'hidden', borderTop: '1px solid #1a2d47' }}>
      <style>{`
        .footer-link { color: #8099b8; text-decoration: none; transition: color 0.2s; display: flex; align-items: center; gap: 8px; font-family: 'Rajdhani', sans-serif; font-size: 14px; letter-spacing: 0.5px; }
        .footer-link:hover { color: #207eff; }
        .footer-social { width: 36px; height: 36px; border: 1px solid #1a2d47; display: flex; align-items: center; justify-content: center; font-family: 'Orbitron', sans-serif; font-size: 9px; font-weight: 700; color: #8099b8; text-decoration: none; transition: all 0.2s; flex-shrink: 0; }
        .footer-social:hover { background: #207eff; border-color: #207eff; color: #fff; }
        .footer-bottom-link { font-family: 'Share Tech Mono', monospace; font-size: 9px; letter-spacing: 2px; color: rgba(128,153,184,0.4); text-decoration: none; text-transform: uppercase; transition: color 0.2s; }
        .footer-bottom-link:hover { color: #207eff; }

        .footer-grid {
          display: grid;
          grid-template-columns: 1.5fr 1fr 1fr 1fr;
          gap: 48px;
        }
        @media (max-width: 1024px) {
          .footer-grid { grid-template-columns: 1fr 1fr; gap: 36px; }
        }
        @media (max-width: 640px) {
          .footer-grid { grid-template-columns: 1fr; gap: 28px; }
        }
        .footer-bottom { display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px; }
        .footer-bottom-links { display: flex; gap: 28px; flex-wrap: wrap; }

        /* Logo image styling */
        .brand-logo-img {
          width: 140px;
          height: 140px;
          object-fit: contain;
          flex-shrink: 0;
          margin-top: -20px;
        }

        @keyframes pulseDot {
          0%, 100% { opacity: 1; transform: scale(1); box-shadow: 0 0 6px #22c55e; }
          50%       { opacity: 0.5; transform: scale(0.75); box-shadow: 0 0 2px #22c55e; }
        }
      `}</style>

      <div style={{ position: 'relative', maxWidth: 1280, margin: '0 auto', padding: '60px 24px 0' }}>
        <div className="footer-grid" style={{ paddingBottom: 48, borderBottom: '1px solid #1a2d47' }}>

          {/* ── Brand column ── */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12,  }}>

              

                <img
                  src="/logo.png"        
                  alt="ForensLeuth Logo"
                  className="brand-logo-img"
                />
             


            
            </div>

            <p style={{ fontFamily: 'Rajdhani', fontSize: 15, color: '#8099b8', lineHeight: 1.7, marginBottom: 24, maxWidth: 300 , marginTop: -36}}>
              Premier digital forensics and cyber intelligence — delivering truth through science, technology, and expert analysis since 2009.
            </p>

            {/* Social icons with real links */}
            <div style={{ display: 'flex', gap: 8, marginBottom: 24, flexWrap: 'wrap' }}>
              {socials.map(({ label, href, title }) => (
                <a
                  key={label}
                  href={href}
                  className="footer-social"
                  title={title}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {label}
                </a>
              ))}
            </div>

            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '10px 14px', border: '1px solid #1a2d47', background: 'rgba(32,126,255,0.03)' }}>
              <div style={{ width: 7, height: 7, borderRadius: '50%', background: '#22c55e', flexShrink: 0, animation: 'pulseDot 2s ease-in-out infinite', boxShadow: '0 0 6px #22c55e' }} />
              <span style={{ fontFamily: 'Share Tech Mono', fontSize: 9, letterSpacing: 2, color: '#22c55e' }}>
                ALL SYSTEMS OPERATIONAL
              </span>
            </div>
          </div>

          {/* ── Nav columns ── */}
          {cols.map((col) => (
            <div key={col.title}>
              <div style={{ fontFamily: 'Orbitron', fontSize: 9, fontWeight: 700, letterSpacing: 3, color: '#207eff', marginBottom: 20, paddingBottom: 10, borderBottom: '1px solid #1a2d47' }}>
                {col.title}
              </div>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
                {col.links.map(({ label, href }) => (
                  <li key={label}>
                    <a href={href} className="footer-link">
                      <span style={{ width: 3, height: 3, background: 'rgba(32,126,255,0.4)', display: 'inline-block', flexShrink: 0 }} />
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* ── Bottom bar ── */}
        <div className="footer-bottom" style={{ padding: '20px 0' }}>
          <div style={{ fontFamily: 'Share Tech Mono', fontSize: 9, letterSpacing: 1.5, color: 'rgba(128,153,184,0.4)' }}>
            © 2025 FORENSLEUTH · ALL RIGHTS RESERVED
            <span style={{ color: 'rgba(32,126,255,0.3)' }}> · FSL-SYS v4.2.1</span>
          </div>
       
        </div>
      </div>
    </footer>
  )
}