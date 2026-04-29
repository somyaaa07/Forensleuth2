'use client'
import Link from 'next/link';

export default function Footer() {

  const cols = [
    {
      title: 'SERVICES',
      links: [
        { label: 'Empowerment Initiatives', href: '/services/empowerment-initiatives' },
        { label: 'Kits & Educational Tools', href: '/services/kits-and-educational-tools' },
        { label: 'Investigation Services', href: '/services/investigation-services' },
        { label: 'Academic Services', href: '/services/academic-services' },
        { label: 'Consultancy', href: '/services/consultancy' },
      ],
    },
    {
      title: 'ORGANIZATION RELATED',
      links: [
        { label: 'About Us', href: '/about' },
        { label: 'Our Team', href: '/about' },
        { label: 'Careers', href: '/careers' },
      ],
    },
    {
      title: 'USEFUL LINKS',
      links: [
          {label:'Services', href:'/services'},
        { label: 'Gallery', href: '/gallery' },
        { label: 'Contact', href: '/contact' },
        {label: 'Broucher', href: '/broucher' },
      
      ],
    },
  ];

  const socials = [
    {
      id: 'linkedin',
      label: 'LI',
      href: 'https://www.linkedin.com/company/forensleuth/',
      title: 'Connect on LinkedIn',
    },
    {
      id: 'whatsapp',
      label: 'WA',
      href: 'https://chat.whatsapp.com/EoYB1SWtEzi0pDLbWgeKDy',
      title: 'Join on WhatsApp',
    },
    {
      id: 'telegram',
      label: 'TG',
      href: 'https://t.me/forensleuth',
      title: 'Join on Telegram',
    },
    {
      id: 'instagram',
      label: 'IG',
      href: 'https://www.instagram.com/forensleuth',
      title: 'Follow on Instagram',
    },
  ];

  return (
    <footer style={{ background: '#03060d', position: 'relative', overflow: 'hidden', borderTop: '1px solid #1a2d47' }}>

      <style>{`
        .footer-link {
          color: #8099b8;
          text-decoration: none;
          transition: color 0.2s;
          display: flex;
          align-items: center;
          gap: 8px;
          font-family: 'Rajdhani', sans-serif;
          font-size: 14px;
          letter-spacing: 0.5px;
        }
        .footer-link:hover { color: #207eff; }

        .footer-social {
          width: 36px;
          height: 36px;
          border: 1px solid #1a2d47;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'Orbitron', sans-serif;
          font-size: 9px;
          font-weight: 700;
          color: #8099b8;
          text-decoration: none;
          transition: all 0.2s;
          flex-shrink: 0;
        }
        .footer-social:hover {
          background: #207eff;
          border-color: #207eff;
          color: #fff;
        }

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

        .footer-bottom {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 12px;
        }

        .brand-logo-img {
          width: 140px;
          height: 140px;
          object-fit: contain;
          margin-top: -20px;
        }
      `}</style>

      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '60px 24px 0' }}>

        <div className="footer-grid" style={{ paddingBottom: 48, borderBottom: '1px solid #1a2d47' }}>

          {/* Brand */}
          <div>
            <img src="/logo.png" alt="ForensLeuth Logo" className="brand-logo-img" />

            <p style={{
              fontFamily: 'Rajdhani',
              fontSize: 15,
              color: '#8099b8',
              lineHeight: 1.7,
              marginBottom: 24,
              maxWidth: 300,
              marginTop: -36
            }}>
              Established in 2024, Forensleuth stands at the forefront of forensic science innovation. 
              Our commitment to excellence drives us to evolve continuously and adapt to the changing 
              landscape of forensic investigation and education.
            </p>

            {/* Socials */}
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {socials.map((item) => (
                item.href && (
                  <Link
                    key={item.id}
                    href={item.href}
                    className="footer-social"
                    title={item.title}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {item.label}
                  </Link>
                )
              ))}
            </div>
          </div>

          {/* Columns */}
          {cols.map((col) => (
            <div key={col.title}>
              <div style={{
                fontFamily: 'Orbitron',
                fontSize: 9,
                fontWeight: 700,
                letterSpacing: 3,
                color: '#207eff',
                marginBottom: 20,
                paddingBottom: 10,
                borderBottom: '1px solid #1a2d47'
              }}>
                {col.title}
              </div>

              <ul style={{
                listStyle: 'none',
                padding: 0,
                margin: 0,
                display: 'flex',
                flexDirection: 'column',
                gap: 10
              }}>
                {col.links.map((link) => (
                  link.href && (
                    <li key={link.label}>
                      <Link href={link.href} className="footer-link">
                        <span style={{
                          width: 3,
                          height: 3,
                          background: 'rgba(32,126,255,0.4)'
                        }} />
                        {link.label}
                      </Link>
                    </li>
                  )
                ))}
              </ul>
            </div>
          ))}

        </div>

        {/* Bottom */}
        <div className="footer-bottom" style={{ padding: '20px 0' }}>
          <div style={{
            fontFamily: 'Share Tech Mono',
            fontSize: 9,
            letterSpacing: 1.5,
            color: 'rgba(128,153,184,0.4)'
          }}>
            © 2024 FORENSLEUTH · ALL RIGHTS RESERVED
          </div>
        </div>

      </div>
    </footer>
  );
}