"use client";

import { BookOpen, Briefcase, Settings, Download, Search } from "lucide-react";
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'

const kits = [
  {
    id: "student",
    title: "Student Kits",
    tag: "Students",
    desc: "Specially designed resources for students — notes, guides, and study material.",
    file: "/Student.pdf",
    icon: BookOpen,
    accent: "#207eff",
  },
  {
    id: "professional",
    title: "Professional Kits",
    tag: "Professionals",
    desc: "Complete toolkit for professionals — premium resources and career tools.",
    file: "/Professional.pdf",
    icon: Briefcase,
    accent: "#fa5330",
  },
  {
    id: "customize",
    title: "Customize Kits",
    tag: "Custom",
    desc: "Customize as you wish — personalized kits tailored to your specific needs.",
    file: "/diy.pdf",
    icon: Settings,
    accent: "#207eff",
  },
  {
    id: "forensleuth",
    title: "ForenSleuth Brochure",
    tag: "ForenSleuth",
    desc: "Explore the ForenSleuth platform — features, capabilities, and how it empowers investigations.",
    file: "/all.pdf",
    icon: Search,
    accent: "#a259ff",
  },
];

const styles = {
  page: {
    minHeight: "100vh",
    backgroundColor: "#080f1a",
    padding: "4rem 1.5rem",
    fontFamily: "'Rajdhani', sans-serif",
    marginTop: "4rem",
  },
  inner: {
    maxWidth: "1260px",
    margin: "0 auto",
  },
  eyebrow: {
    fontFamily: "'Share Tech Mono', monospace",
    fontSize: "11px",
    letterSpacing: "0.2em",
    textTransform: "uppercase",
    color: "#207eff",
    marginBottom: "0.75rem",
  },
  heading: {
    fontFamily: "'Orbitron', sans-serif",
    fontSize: "clamp(2rem, 5vw, 3rem)",
    fontWeight: 900,
    color: "#ffffff",
    lineHeight: 1.1,
    marginBottom: "0.75rem",
    background: "linear-gradient(90deg, #ffffff 40%, #207eff 100%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
  },
  sub: {
    fontFamily: "'Rajdhani', sans-serif",
    fontSize: "16px",
    fontWeight: 400,
    color: "#6b7fa3",
    marginBottom: "3rem",
    maxWidth: "480px",
    lineHeight: 1.7,
  },
  divider: {
    width: "40px",
    height: "2px",
    background: "linear-gradient(90deg, #207eff, #fa5330)",
    marginBottom: "3rem",
    border: "none",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
    gap: "20px",
  },
  footer: {
    fontFamily: "'Share Tech Mono', monospace",
    fontSize: "11px",
    color: "#2a3a55",
    textAlign: "center",
    marginTop: "3rem",
    letterSpacing: "0.1em",
  },
};

function KitCard({ title, tag, desc, file, icon: Icon, accent }) {
  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = file;
    link.download = file.split("/").pop();
    link.click();
  };

  return (
    <div
      style={{
        background: "#0d1929",
        border: `1px solid ${accent}22`,
        borderRadius: "16px",
        padding: "1.75rem 1.5rem",
        display: "flex",
        flexDirection: "column",
        gap: "14px",
        transition: "border-color 0.2s, box-shadow 0.2s",
        position: "relative",
        overflow: "hidden",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = accent + "66";
        e.currentTarget.style.boxShadow = `0 0 24px ${accent}18`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = accent + "22";
        e.currentTarget.style.boxShadow = "none";
      }}
    >
      {/* Top glow line */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: "20%",
          right: "20%",
          height: "1px",
          background: `linear-gradient(90deg, transparent, ${accent}88, transparent)`,
        }}
      />

      {/* Icon */}
      <div
        style={{
          width: "44px",
          height: "44px",
          borderRadius: "10px",
          background: accent + "18",
          border: `1px solid ${accent}44`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Icon size={20} color={accent} />
      </div>

      {/* Tag */}
      <span
        style={{
          fontFamily: "'Share Tech Mono', monospace",
          fontSize: "10px",
          letterSpacing: "0.15em",
          textTransform: "uppercase",
          color: accent,
          background: accent + "15",
          border: `1px solid ${accent}33`,
          padding: "3px 10px",
          borderRadius: "99px",
          width: "fit-content",
        }}
      >
        {tag}
      </span>

      {/* Title */}
      <h2
        style={{
          fontFamily: "'Orbitron', sans-serif",
          fontSize: "1rem",
          fontWeight: 700,
          color: "#e8edf5",
          letterSpacing: "0.05em",
          margin: 0,
        }}
      >
        {title}
      </h2>

      {/* Desc */}
      <p
        style={{
          fontFamily: "'Rajdhani', sans-serif",
          fontSize: "14px",
          color: "#4d6080",
          lineHeight: 1.7,
          fontWeight: 400,
          flex: 1,
          margin: 0,
        }}
      >
        {desc}
      </p>

      {/* Download Button */}
      <button
        onClick={handleDownload}
        style={{
          marginTop: "4px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "8px",
          width: "100%",
          padding: "11px 0",
          borderRadius: "10px",
          border: `1px solid ${accent}55`,
          background: "transparent",
          color: accent,
          fontFamily: "'Rajdhani', sans-serif",
          fontSize: "13px",
          fontWeight: 600,
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          cursor: "pointer",
          transition: "background 0.15s, transform 0.1s",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = accent + "18";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = "transparent";
        }}
        onMouseDown={(e) => {
          e.currentTarget.style.transform = "scale(0.97)";
        }}
        onMouseUp={(e) => {
          e.currentTarget.style.transform = "scale(1)";
        }}
      >
        <Download size={14} />
        Download Brochure
      </button>
    </div>
  );
}

export default function BrochurePage() {
  return (
    <div>
      <Navbar />
      <main style={styles.page}>
        <div style={styles.inner}>
          <p style={styles.eyebrow}>// our_resources</p>
          <h1 style={styles.heading}>Download Our Kits</h1>
          <p style={styles.sub}>
            Download the brochure that fits your needs — Student, Professional,
            Custom, or ForenSleuth.
          </p>
          <hr style={styles.divider} />

          <div style={styles.grid}>
            {kits.map((kit) => (
              <KitCard key={kit.id} {...kit} />
            ))}
          </div>

          <p style={styles.footer}>
            PDF_FILES &nbsp;•&nbsp; FREE_DOWNLOAD &nbsp;•&nbsp; NO_SIGNUP_REQUIRED
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}