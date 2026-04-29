"use client";

import { useState, useRef } from "react";
import { Upload, Send, X, CheckCircle } from "lucide-react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

const ROLES = [
  "Executive",
  "Volunteer",
  "Forensic Expert",
  "Intern",
  "Developer",
  "Designer",
  "PR & Marketing",
  "Content Creator",
  "Research Associate",
  "Management",
  "Other",
];

const QUALIFICATIONS = [
  "Under Graduate",
  "Graduate",
  "Post Graduate",
  "PhD",
  "Other",
];

const WORK_TYPES = [
  "Voluntary",
  "Internship",
  "Part-Time",
  "Full-Time",
  "Freelance",
  "Other",
];

const inputStyle = {
  width: "100%",
  background: "#0d1929",
  border: "1px solid #1e3a5f",
  borderRadius: "10px",
  padding: "12px 16px",
  color: "#e8edf5",
  fontFamily: "'Rajdhani', sans-serif",
  fontSize: "15px",
  outline: "none",
  transition: "border-color 0.2s, box-shadow 0.2s",
  boxSizing: "border-box",
};

const labelStyle = {
  fontFamily: "'Share Tech Mono', monospace",
  fontSize: "11px",
  letterSpacing: "0.15em",
  textTransform: "uppercase",
  color: "#207eff",
  marginBottom: "8px",
  display: "block",
};

const requiredStar = {
  color: "#fa5330",
  marginLeft: "3px",
};

function InputField({ label, type = "text", value, onChange, placeholder }) {
  const [focused, setFocused] = useState(false);
  return (
    <div style={{ marginBottom: "1.5rem" }}>
      <label style={labelStyle}>
        {label}
        <span style={requiredStar}>*</span>
      </label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder || "Your answer"}
        onFocus={(e) => {
          setFocused(true);
          e.target.style.borderColor = "#207eff";
          e.target.style.boxShadow = "0 0 0 3px #207eff18";
        }}
        onBlur={(e) => {
          setFocused(false);
          e.target.style.borderColor = "#1e3a5f";
          e.target.style.boxShadow = "none";
        }}
        style={inputStyle}
      />
    </div>
  );
}

function TextAreaField({ label, value, onChange, placeholder }) {
  return (
    <div style={{ marginBottom: "1.5rem" }}>
      <label style={labelStyle}>
        {label}
        <span style={requiredStar}>*</span>
      </label>
      <textarea
        value={value}
        onChange={onChange}
        placeholder={placeholder || "Your answer"}
        rows={4}
        onFocus={(e) => {
          e.target.style.borderColor = "#207eff";
          e.target.style.boxShadow = "0 0 0 3px #207eff18";
        }}
        onBlur={(e) => {
          e.target.style.borderColor = "#1e3a5f";
          e.target.style.boxShadow = "none";
        }}
        style={{
          ...inputStyle,
          resize: "vertical",
          minHeight: "100px",
        }}
      />
    </div>
  );
}

function RadioGroup({ label, options, value, onChange }) {
  return (
    <div style={{ marginBottom: "1.5rem" }}>
      <label style={labelStyle}>
        {label}
        <span style={requiredStar}>*</span>
      </label>
      <div
        style={{
          background: "#0d1929",
          border: "1px solid #1e3a5f",
          borderRadius: "10px",
          padding: "12px 16px",
          display: "flex",
          flexDirection: "column",
          gap: "10px",
        }}
      >
        {options.map((opt) => (
          <label
            key={opt}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              cursor: "pointer",
              fontFamily: "'Rajdhani', sans-serif",
              fontSize: "15px",
              color: value === opt ? "#e8edf5" : "#4d6080",
              transition: "color 0.15s",
            }}
          >
            <div
              onClick={() => onChange(opt)}
              style={{
                width: "18px",
                height: "18px",
                borderRadius: "50%",
                border: `2px solid ${value === opt ? "#207eff" : "#1e3a5f"}`,
                background: value === opt ? "#207eff22" : "transparent",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
                transition: "all 0.15s",
                cursor: "pointer",
              }}
            >
              {value === opt && (
                <div
                  style={{
                    width: "8px",
                    height: "8px",
                    borderRadius: "50%",
                    background: "#207eff",
                  }}
                />
              )}
            </div>
            <span onClick={() => onChange(opt)}>{opt}</span>
          </label>
        ))}
      </div>
    </div>
  );
}

function FileUpload({ label, file, onChange }) {
  const ref = useRef();
  return (
    <div style={{ marginBottom: "1.5rem" }}>
      <label style={labelStyle}>
        {label}
        <span style={requiredStar}>*</span>
      </label>
      <div
        onClick={() => ref.current.click()}
        style={{
          background: "#0d1929",
          border: `1px dashed ${file ? "#207eff66" : "#1e3a5f"}`,
          borderRadius: "10px",
          padding: "20px 16px",
          display: "flex",
          alignItems: "center",
          gap: "12px",
          cursor: "pointer",
          transition: "border-color 0.2s, background 0.2s",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = "#207eff08";
          e.currentTarget.style.borderColor = "#207eff66";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = "#0d1929";
          e.currentTarget.style.borderColor = file ? "#207eff66" : "#1e3a5f";
        }}
      >
        <div
          style={{
            width: "36px",
            height: "36px",
            borderRadius: "8px",
            background: "#207eff18",
            border: "1px solid #207eff44",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          <Upload size={16} color="#207eff" />
        </div>
        <div>
          <p
            style={{
              fontFamily: "'Rajdhani', sans-serif",
              fontSize: "14px",
              color: file ? "#e8edf5" : "#4d6080",
              margin: 0,
            }}
          >
            {file ? file.name : "Click to add file"}
          </p>
          <p
            style={{
              fontFamily: "'Share Tech Mono', monospace",
              fontSize: "10px",
              color: "#2a3a55",
              margin: "2px 0 0",
              letterSpacing: "0.1em",
            }}
          >
            PDF, DOC, DOCX — MAX 10MB
          </p>
        </div>
        {file && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onChange(null);
            }}
            style={{
              marginLeft: "auto",
              background: "transparent",
              border: "none",
              cursor: "pointer",
              color: "#4d6080",
              padding: 0,
            }}
          >
            <X size={16} />
          </button>
        )}
      </div>
      <input
        ref={ref}
        type="file"
        accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
        style={{ display: "none" }}
        onChange={(e) => onChange(e.target.files[0] || null)}
      />
    </div>
  );
}

export default function CareerPage() {
  const [form, setForm] = useState({
    name: "",
    dob: "",
    email: "",
    phone: "",
    location: "",
    qualification: "",
    fieldOfStudy: "",
    role: "",
    keySkills: "",
    workType: "",
    experience: "",
    photo: null,
    resume: null,
    declaration: false,
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const set = (key) => (e) =>
    setForm((f) => ({
      ...f,
      [key]: e.target ? e.target.value : e,
    }));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.declaration) {
      alert("Please confirm the declaration before submitting.");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1800);
  };

  if (submitted) {
    return (
      <div>
        <Navbar />
        <div
          style={{
            minHeight: "100vh",
            backgroundColor: "#080f1a",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "2rem",
            marginTop: "4rem",
          }}
        >
          <div style={{ textAlign: "center", maxWidth: "480px" }}>
            <div
              style={{
                width: "72px",
                height: "72px",
                borderRadius: "50%",
                background: "#207eff18",
                border: "1px solid #207eff44",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 1.5rem",
              }}
            >
              <CheckCircle size={32} color="#207eff" />
            </div>
            <h1
              style={{
                fontFamily: "'Orbitron', sans-serif",
                fontSize: "1.8rem",
                fontWeight: 900,
                color: "#e8edf5",
                marginBottom: "1rem",
              }}
            >
              Application Submitted!
            </h1>
            <p
              style={{
                fontFamily: "'Rajdhani', sans-serif",
                fontSize: "16px",
                color: "#6b7fa3",
                lineHeight: 1.7,
                marginBottom: "2rem",
              }}
            >
              Thank you for applying to ForenSleuth. We will review your
              application and get back to you shortly.
            </p>
            <button
              onClick={() => {
                setSubmitted(false);
                setForm({
                  name: "", dob: "", email: "", phone: "", location: "",
                  qualification: "", fieldOfStudy: "", role: "", keySkills: "",
                  workType: "", experience: "", photo: null, resume: null, declaration: false,
                });
              }}
              style={{
                fontFamily: "'Rajdhani', sans-serif",
                fontSize: "13px",
                fontWeight: 600,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "#207eff",
                background: "transparent",
                border: "1px solid #207eff55",
                borderRadius: "10px",
                padding: "12px 28px",
                cursor: "pointer",
              }}
            >
              Submit Another
            </button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <main
        style={{
          minHeight: "100vh",
          backgroundColor: "#080f1a",
          fontFamily: "'Rajdhani', sans-serif",
          marginTop: "4rem",
        }}
      >
        {/* Hero */}
        <div
          style={{
            padding: "5rem 1.5rem 3rem",
            borderBottom: "1px solid #ffffff0d",
          }}
        >
          <div className="mx-auto max-w-7xl" style={{ paddingLeft: "9rem", paddingRight: "2rem" }}>
            <p
              style={{
                fontFamily: "'Share Tech Mono', monospace",
                fontSize: "11px",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "#207eff",
                marginBottom: "0.75rem",
              }}
            >
              // join_our_team
            </p>
            <h1
              style={{
                fontFamily: "'Orbitron', sans-serif",
                fontSize: "clamp(2rem, 5vw, 3.2rem)",
                fontWeight: 900,
                lineHeight: 1.1,
                marginBottom: "1rem",
                color: "#e8edf5",
                textShadow: "0 0 30px rgba(32, 126, 255, 0.3)",
                letterSpacing: "0.02em",
                maxWidth: "80rem",
              }}
            >
              ForenSleuth Careers & <span style={{ color: "#207eff" }}>Opportunities</span>
            </h1>
            <p
              style={{
                fontFamily: "'Rajdhani', sans-serif",
                fontSize: "16px",
                color: "#6b7fa3",
                maxWidth: "1260px",
                lineHeight: 1.7,
                marginBottom: "1.5rem",
              }}
            >
              Explore opportunities to work with us across forensic science, tech, content, and more.
              Choose your role and contribute on a voluntary, temporary, or permanent basis.
            </p>
              <p
              style={{
                fontFamily: "'Rajdhani', sans-serif",
                fontSize: "16px",
                color: "#6b7fa3",
                maxWidth: "1260px",
                lineHeight: 1.7,
                marginBottom: "1.5rem",
              }}
            >
             At Forensleuth, we believe in empowering talent, encouraging innovation, and creating opportunities for future forensic professionals. Whether you are a student, researcher, or experienced professional, we provide a platform to grow, learn, and make an impact.
            </p>
            <hr
              style={{
                width: "40px",
                height: "2px",
                background: "linear-gradient(90deg, #207eff, #fa5330)",
                border: "none",
              }}
            />
          </div>
        </div>

        {/* Form */}
        <div style={{ padding: "1rem 1.5rem" }}>
          <div
            className="mx-auto max-w-7xl"
            style={{ display: "grid", gridTemplateColumns: "1fr min(600px, 100%)", gap: "4rem", alignItems: "start" }}
          >
            {/* Left info panel */}
            <div style={{ display: "none" }} className="lg-info-panel" />

            {/* Form card */}
            <div
              style={{
                gridColumn: "1 / -1",
           maxWidth: "950px",
                margin: "0 auto",
                width: "100%",
              }}
            >
              <div
                style={{
                  background: "#0a1628",
                  border: "1px solid #1e3a5f",
                  borderRadius: "20px",
                  padding: "2.5rem",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                {/* Top accent line */}
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    left: "10%",
                    right: "10%",
                    height: "1px",
                    background: "linear-gradient(90deg, transparent, #207eff88, transparent)",
                  }}
                />

                <h2
                  style={{
                    fontFamily: "'Orbitron', sans-serif",
                    fontSize: "1.1rem",
                    fontWeight: 700,
                    color: "#e8edf5",
                    letterSpacing: "0.05em",
                    marginBottom: "0.4rem",
                  }}
                >
                  Application Form
                </h2>
                <p
                  style={{
                    fontFamily: "'Rajdhani', sans-serif",
                    fontSize: "13px",
                    color: "#4d6080",
                    marginBottom: "2rem",
                  }}
                >
                  Fields marked with <span style={{ color: "#fa5330" }}>*</span> are required.
                </p>

                <form onSubmit={handleSubmit}>
                  {/* Name */}
                  <InputField
                    label="Name"
                    value={form.name}
                    onChange={set("name")}
                    placeholder="Full name"
                  />

                  {/* Date of Birth */}
                  <div style={{ marginBottom: "1.5rem" }}>
                    <label style={labelStyle}>
                      Date of Birth<span style={requiredStar}>*</span>
                    </label>
                    <input
                      type="date"
                      value={form.dob}
                      onChange={set("dob")}
                      onFocus={(e) => {
                        e.target.style.borderColor = "#207eff";
                        e.target.style.boxShadow = "0 0 0 3px #207eff18";
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = "#1e3a5f";
                        e.target.style.boxShadow = "none";
                      }}
                      style={{
                        ...inputStyle,
                        colorScheme: "dark",
                      }}
                    />
                  </div>

                  {/* Email */}
                  <InputField
                    label="Email"
                    type="email"
                    value={form.email}
                    onChange={set("email")}
                    placeholder="your@email.com"
                  />

                  {/* Phone */}
                  <InputField
                    label="Phone Number"
                    type="tel"
                    value={form.phone}
                    onChange={set("phone")}
                    placeholder="+91 XXXXX XXXXX"
                  />

                  {/* Current Location */}
                  <InputField
                    label="Current Location"
                    value={form.location}
                    onChange={set("location")}
                    placeholder="City, State"
                  />

                  {/* Qualification */}
                  <RadioGroup
                    label="Qualification"
                    options={QUALIFICATIONS}
                    value={form.qualification}
                    onChange={(v) => setForm((f) => ({ ...f, qualification: v }))}
                  />

                  {/* Field of Study */}
                  <InputField
                    label="Field of Study"
                    value={form.fieldOfStudy}
                    onChange={set("fieldOfStudy")}
                    placeholder="e.g. Computer Science, Law, etc."
                  />

                  {/* Role */}
                  <RadioGroup
                    label="Which Role are you interested in?"
                    options={ROLES}
                    value={form.role}
                    onChange={(v) => setForm((f) => ({ ...f, role: v }))}
                  />

                  {/* Key Skills */}
                  <TextAreaField
                    label="Key Skills (Mention your relevant skills)"
                    value={form.keySkills}
                    onChange={set("keySkills")}
                    placeholder="e.g. Python, OSINT, Digital Forensics, React..."
                  />

                  {/* Preferred Work Type */}
                  <RadioGroup
                    label="Preferred Work Type"
                    options={WORK_TYPES}
                    value={form.workType}
                    onChange={(v) => setForm((f) => ({ ...f, workType: v }))}
                  />

                  {/* Experience */}
                  <TextAreaField
                    label="Experience (If any)"
                    value={form.experience}
                    onChange={set("experience")}
                    placeholder="Briefly describe your relevant experience..."
                  />

                  {/* Photo Upload */}
                  <FileUpload
                    label="Photo"
                    file={form.photo}
                    onChange={(f) => setForm((prev) => ({ ...prev, photo: f }))}
                  />

                  {/* Resume Upload */}
                  <FileUpload
                    label="Resume"
                    file={form.resume}
                    onChange={(f) => setForm((prev) => ({ ...prev, resume: f }))}
                  />

                  {/* Declaration */}
                  <div style={{ marginBottom: "2rem" }}>
                    <label
                      style={{
                        display: "flex",
                        alignItems: "flex-start",
                        gap: "12px",
                        cursor: "pointer",
                      }}
                    >
                      <div
                        onClick={() =>
                          setForm((f) => ({ ...f, declaration: !f.declaration }))
                        }
                        style={{
                          width: "20px",
                          height: "20px",
                          borderRadius: "5px",
                          border: `2px solid ${form.declaration ? "#207eff" : "#1e3a5f"}`,
                          background: form.declaration ? "#207eff22" : "transparent",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexShrink: 0,
                          marginTop: "2px",
                          transition: "all 0.15s",
                          cursor: "pointer",
                        }}
                      >
                        {form.declaration && (
                          <svg width="11" height="9" viewBox="0 0 11 9" fill="none">
                            <path
                              d="M1 4L4 7L10 1"
                              stroke="#207eff"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        )}
                      </div>
                      <span
                        style={{
                          fontFamily: "'Rajdhani', sans-serif",
                          fontSize: "14px",
                          color: "#6b7fa3",
                          lineHeight: 1.6,
                        }}
                      >
                        I confirm that the information provided is accurate and I am willing to contribute
                        as per the selected role.
                      </span>
                    </label>
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={loading}
                    style={{
                      width: "100%",
                      padding: "14px 0",
                      borderRadius: "10px",
                      border: "1px solid #207eff55",
                      background: loading ? "#207eff18" : "transparent",
                      color: "#207eff",
                      fontFamily: "'Rajdhani', sans-serif",
                      fontSize: "14px",
                      fontWeight: 700,
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                      cursor: loading ? "not-allowed" : "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "10px",
                      transition: "background 0.15s, transform 0.1s",
                    }}
                    onMouseEnter={(e) => {
                      if (!loading) e.currentTarget.style.background = "#207eff18";
                    }}
                    onMouseLeave={(e) => {
                      if (!loading) e.currentTarget.style.background = "transparent";
                    }}
                    onMouseDown={(e) => {
                      if (!loading) e.currentTarget.style.transform = "scale(0.98)";
                    }}
                    onMouseUp={(e) => {
                      e.currentTarget.style.transform = "scale(1)";
                    }}
                  >
                    {loading ? (
                      <>
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="#207eff"
                          strokeWidth="2"
                          style={{
                            animation: "spin 1s linear infinite",
                          }}
                        >
                          <circle cx="12" cy="12" r="10" strokeOpacity="0.3" />
                          <path d="M12 2a10 10 0 0 1 10 10" />
                        </svg>
                        Submitting...
                      </>
                    ) : (
                      <>
                        <Send size={15} />
                        Submit Application
                      </>
                    )}
                  </button>

                  <p
                    style={{
                      fontFamily: "'Share Tech Mono', monospace",
                      fontSize: "10px",
                      color: "#2a3a55",
                      textAlign: "center",
                      marginTop: "1.25rem",
                      letterSpacing: "0.1em",
                    }}
                  >
                    YOUR_DATA_IS_SAFE &nbsp;•&nbsp; NO_SPAM &nbsp;•&nbsp; FORENSLEUTH_CAREERS
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </main>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        input[type="date"]::-webkit-calendar-picker-indicator {
          filter: invert(0.4) sepia(1) saturate(5) hue-rotate(190deg);
          cursor: pointer;
        }
      `}</style>

      <Footer />
    </div>
  );
}