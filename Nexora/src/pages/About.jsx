import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { 
  FaGraduationCap, 
  FaBriefcase, 
  FaGlobe, 
  FaTrophy, 
  FaCompass, 
  FaFileSignature, 
  FaSearch, 
  FaLinkedin, 
  FaBullseye, 
  FaCalendarCheck, 
  FaComments, 
  FaCode, 
  FaShieldAlt, 
  FaMapMarkerAlt 
} from "react-icons/fa";
import aboutBgImage from "../assets/images/about.png";

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const pageRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero entrance
      gsap.from(".about-hero-title span", {
        y: 80,
        opacity: 0,
        stagger: 0.15,
        duration: 1,
        ease: "power4.out"
      });

      // Cards staggered fade-in
      gsap.from(".about-card", {
        scrollTrigger: {
          trigger: ".about-cards-grid-stacked",
          start: "top 80%"
        },
        y: 50,
        opacity: 0,
        stagger: 0.15,
        duration: 0.8,
        ease: "power2.out"
      });

      // Timeline items trigger
      gsap.from(".timeline-card", {
        scrollTrigger: {
          trigger: ".timeline-flow",
          start: "top 75%"
        },
        x: (index) => (index % 2 === 0 ? -60 : 60),
        opacity: 0,
        stagger: 0.2,
        duration: 1,
        ease: "power3.out"
      });

      // Support items staggered fade-in
      gsap.from(".support-item", {
        scrollTrigger: {
          trigger: ".support-grid",
          start: "top 85%"
        },
        y: 30,
        opacity: 0,
        stagger: 0.1,
        duration: 0.8,
        ease: "power2.out"
      });
    }, pageRef);

    return () => ctx.revert();
  }, []);

  const timelineEvents = [
    { year: "2022", title: "Nexora Founded", desc: "Started with a vision to connect local engineering talent with remote global startups." },
    { year: "2023", title: "Scale to 1000+ Placements", desc: "Expanded training pathways and launched our proprietary mock-interview simulator." },
    { year: "2024", title: "Global Relocation Channel", desc: "Partnered with EU and US staffing hubs to assist developers in relocation visas." },
    { year: "2025", title: "AI Learning Integration", desc: "Embedded custom AI-feedback bots to review portfolio projects in real-time." }
  ];

  const supportSteps = [
    {
      title: "Career Guidance",
      desc: "We begin with a personal career consultation. Our experts assess your goals, domain, skills, and experience to guide you toward high-demand roles and trending technologies.",
      icon: <FaCompass />,
      color: "#ea580c" // Orange
    },
    {
      title: "Resume Crafting",
      desc: "We don't just update resumes, we rebuild them. Our writers create recruiter-ready, keyword-optimized, and ATS-compliant resumes that showcase your true potential.",
      icon: <FaFileSignature />,
      color: "#2563eb" // Blue
    },
    {
      title: "Resume Understanding",
      desc: "We explain your resume in detail, so when you're in an interview, you know how to present it with clarity and confidence.",
      icon: <FaSearch />,
      color: "#dc2626" // Crimson
    },
    {
      title: "LinkedIn Optimization",
      desc: "Our specialists rework your LinkedIn profile to increase visibility, improve recruiter outreach, and reflect your brand. This includes headlines, summaries, skill sections, and SEO rich keywords.",
      icon: <FaLinkedin />,
      color: "#0077b5" // LinkedIn Blue
    },
    {
      title: "Profile Marketing",
      desc: "We submit and promote your profile to hundreds of recruiters across platforms including Dice, Monster, Indeed, CareerBuilder, and our own proprietary network.",
      icon: <FaBullseye />,
      color: "#ea580c" // Orange
    },
    {
      title: "Interview Scheduling",
      desc: "We actively coordinate interview calls for you ensuring timely follow-ups and minimizing delays in communication between you and clients.",
      icon: <FaCalendarCheck />,
      color: "#2563eb" // Blue
    },
    {
      title: "Interview Preparation and Support",
      desc: "We conduct mock interviews, share relevant Q&A formats, and offer behavioral coaching to boost your readiness and confidence before every interview.",
      icon: <FaComments />,
      color: "#dc2626" // Crimson
    },
    {
      title: "Technical Training",
      desc: "Need to brush up on trending tools or technologies? Our curated training resources help you stay competitive in domains like AWS, Selenium, Java, Python, and more.",
      icon: <FaCode />,
      color: "#2563eb" // Blue
    },
    {
      title: "Compliance, Onboarding & BGV",
      desc: "We assist with end-to-end documentation support including onboarding forms, compliance verification, background checks, and employer coordination.",
      icon: <FaShieldAlt />,
      color: "#ea580c" // Orange
    },
    {
      title: "Post-Placement Support",
      desc: "Our relationship doesn't end at placement. We continue to assist you with onboarding challenges, timesheet submissions, and ongoing career moves.",
      icon: <FaMapMarkerAlt />,
      color: "#2563eb" // Blue
    }
  ];

  return (
    <div ref={pageRef} className="about-page-wrapper overflow-hidden">
      <div 
        className="about-hero-story-wrapper"
        style={{ 
          backgroundImage: `url(${aboutBgImage})`, 
          backgroundSize: 'cover', 
          backgroundPosition: 'center', 
          backgroundRepeat: 'no-repeat',
          position: 'relative'
        }}
      >
        {/* Hero */}
        <section className="about-hero-section overflow-hidden">
          <div className="container hero-content-container">
            <h1 className="about-hero-title">
              <span>Building Excellence </span> <br />
              <span className="text-gradient">Through Innovation</span>
            </h1>
            <p className="about-hero-sub text-light">
              We bridge the gap between skilled individuals and international opportunity hubs.
            </p>
          </div>
        </section>

        {/* Story & Vision */}
        <section className="about-story-section overflow-hidden">
          <div className="container about-cards-grid-stacked">
            <div className="about-card glass">
              <h2>Our Vision & Mission</h2>
              <p>
                Our vision is to build a borderless world where exceptional talent meets limitless opportunity. We are on a mission to empower over 100,000 professionals by 2030, equipping them with the premium skills and global connections needed to land their dream careers, regardless of where they call home.
              </p>
            </div>
            <div className="about-card glass">
              <h2>Our Story</h2>
              <p>
                Born from the collective expertise of industry veterans, Nexora Career was founded on a simple realization: while brilliance is distributed evenly across the globe, opportunity is not. We set out to dismantle these geographic barriers, creating a rigorous, world-class preparation platform that levels the playing field for ambitious candidates everywhere.
              </p>
            </div>
          </div>
        </section>
      </div>

      {/* Stats/Achievements */}
      <section className="about-achievements overflow-hidden">
        <div className="container">
          <h2 className="text-center section-title">Key Milestones</h2>
          <div className="achievements-row">
            <div className="ach-item">
              <FaGraduationCap className="ach-icon" />
              <h3>5000+</h3>
              <p>Graduates Coached</p>
            </div>
            <div className="ach-item">
              <FaBriefcase className="ach-icon" />
              <h3>250+</h3>
              <p>Hiring Partners</p>
            </div>
            <div className="ach-item">
              <FaGlobe className="ach-icon" />
              <h3>20+</h3>
              <p>Countries Reached</p>
            </div>
            <div className="ach-item">
              <FaTrophy className="ach-icon" />
              <h3>98%</h3>
              <p>Placement Success</p>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="about-timeline-section overflow-hidden">
        <div className="container">
          <h2 className="text-center section-title clr-black">Our Growth Timeline</h2>
          <div className="timeline-flow">
            {timelineEvents.map((evt, idx) => (
              <div key={idx} className="timeline-item-row">
                <div className="timeline-badge">{evt.year}</div>
                <div className="timeline-card glass">
                  <h3>{evt.title}</h3>
                  <p>{evt.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Placement Support Section */}
      <section className="about-support-section overflow-hidden">
        <div className="container">
          <h2 className="support-section-title">
            We offer comprehensive, step-by-step support for <br />
            every phase of your <span className="text-red">placement journey:</span>
          </h2>
          <div className="support-grid">
            {supportSteps.map((step, idx) => (
              <div key={idx} className="support-item">
                <div className="support-icon-wrap" style={{ color: step.color }}>
                  {step.icon}
                </div>
                <div className="support-item-info">
                  <h3>{step.title}</h3>
                  <p>{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Styles inline helpers for uniqueness */}
      <style>{`
        .about-story-section{
          padding:60px 0px
        }
        .clr-black{
          color: black!important;
        }
        .about-hero-section {
          padding: 80px 0 40px;
        }
        .about-hero-title {
          font-size: 3.5rem;
          font-weight: 800;
          line-height: 1.2;
          margin-bottom: 20px;
        }
        .about-hero-title span {
          display: inline-block;
          color: black;
        }
        .hero-content-container {
          text-align: right;
        }
        .about-hero-sub {
          color: #252424;
          font-weight: 600;
          font-size: 1.2rem;
          max-width: 600px;
          margin: 0 0 0 auto;
        }
        .text-gradient {
          background: linear-gradient(134deg, #2C5E63, #6B6F4D);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .about-cards-grid-stacked {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 30px;
          margin-top: 40px;
        }
        .about-card {
          width: 100%;
          max-width: 650px;
          padding: 30px;
          border-radius: var(--radius-lg);
          border: 1px solid rgba(255, 255, 255, 0.25);
          background: rgb(255 255 255) !important;
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          box-shadow: var(--shadow-md);
        }
        .about-card h2 {
          font-size: 1.8rem;
          margin-bottom: 20px;
          color: #0f172a !important;
        }
        .about-card p {
          color: #334155 !important;
          line-height: 1.6;
        }
        .about-achievements {
          background: var(--bg-soft);
          padding: 80px 0;
        }
        .section-title {
          font-size: 2.2rem;
          margin-bottom: 50px;
          color: #ffffffff;
        }
        [data-theme='dark'] .section-title {
          color: #f8fafc;
        }
        .achievements-row {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 30px;
          text-align: center;
        }
        .ach-item {
          --gh-bg: var(--white);
          --gh-br: var(--radius-md);
          --gh-border: var(--border);
          --gh-angle: -30deg;
          --gh-duration: 800ms;
          --gh-size: 300%;
          --gh-rgba: rgba(72, 201, 44, 0.25);
          
          background: var(--gh-bg);
          border-radius: var(--gh-br);
          border: 1px solid var(--gh-border);
          padding: 40px 20px;
          overflow: hidden;
          position: relative;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          cursor: pointer;
          box-shadow: var(--shadow-sm);
        }
        
        [data-theme='dark'] .ach-item {
          --gh-bg: var(--bg-soft);
          --gh-rgba: rgba(255,255,255, 0.1);
        }

        .ach-item::before {
          content: "";
          position: absolute;
          inset: 0;
          background: linear-gradient(
              var(--gh-angle),
              transparent 60%,
              var(--gh-rgba) 70%,
              transparent 80%,
              transparent 100%
          );
          background-size: var(--gh-size) var(--gh-size);
          background-repeat: no-repeat;
          background-position: -100% -100%;
          transition: background-position var(--gh-duration) ease;
          pointer-events: none;
          z-index: 1;
        }

        .ach-item:hover::before {
          background-position: 100% 100%;
        }

        .ach-icon {
          font-size: 3rem;
          color: var(--primary);
          margin-bottom: 20px;
          position: relative;
          z-index: 2;
        }
        .ach-item h3 {
          font-size: 2.2rem;
          font-weight: 700;
          margin-bottom: 8px;
          position: relative;
          z-index: 2;
          color: #0f172a !important;
        }
        .ach-item p {
          position: relative;
          z-index: 2;
          color: #475569 !important;
        }
        [data-theme='dark'] .ach-item h3 {
          color: #f8fafc !important;
        }
        [data-theme='dark'] .ach-item p {
          color: #cbd5e1 !important;
        }
        .about-timeline-section {
          padding: 80px 0;
          background-color: #F9C33A;
        }
        .timeline-flow {
          display: flex;
          flex-direction: column;
          gap: 30px;
          max-width: 800px;
          margin: 0 auto;
        }
        .timeline-item-row {
          display: flex;
          gap: 20px;
          align-items: center;
        }
        .timeline-badge {
          background: var(--primary);
          color: var(--white);
          font-weight: 700;
          padding: 8px 16px;
          border-radius: var(--radius-full);
          font-size: 0.9rem;
          box-shadow: var(--glow);
        }
        .timeline-card {
          flex: 1;
          padding: 24px;
          border-radius: var(--radius-sm);
          border: 1px solid rgba(255, 255, 255, 0.25);
          background: rgb(255 255 255) !important;
          box-shadow: var(--shadow-sm);
        }
        .timeline-card h3 {
          font-size: 1.25rem;
          margin-bottom: 8px;
          color: #0f172a !important;
        }
        .timeline-card p {
          color: #475569 !important;
        }
        [data-theme='dark'] .timeline-card h3 {
          color: #f8fafc !important;
        }
        [data-theme='dark'] .timeline-card p {
          color: #cbd5e1 !important;
        }
        /* Placement Support Styles (No cards, matching image) */
        .about-support-section {
          padding: 100px 0;
          background: #ffffff;
        }
        .support-section-title {
          font-family: "Poppins", sans-serif;
          font-size: 2.5rem;
          font-weight: 800;
          line-height: 1.25;
          color: #0e0b03;
          margin-bottom: 60px;
          text-align: left;
        }
        .support-section-title .text-red {
          color: #b91c1c; /* Crimson Red matching placement journey: */
        }
        .support-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 50px 40px;
        }
        .support-item {
          display: flex;
          gap: 20px;
          align-items: flex-start;
          transition: transform 0.3s ease;
        }
        .support-item:hover {
          transform: translateY(-4px);
        }
        .support-icon-wrap {
          flex-shrink: 0;
          font-size: 2.8rem;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 54px;
          height: 54px;
        }
        .support-item-info h3 {
          font-size: 1.2rem;
          font-weight: 700;
          color: #0e0b03;
          margin-bottom: 12px;
          line-height: 1.2;
        }
        .support-item-info p {
          font-size: 0.95rem;
          line-height: 1.6;
          color: #64748b;
          font-weight: 400;
        }

        /* Hover slide effect for timeline/about cards */
        .about-card, .timeline-card {
          position: relative;
          overflow: hidden;
          cursor: pointer;
        }

        .about-card::after, .timeline-card::after {
          content: '';
          position: absolute;
          top: -150%;
          left: -150%;
          width: 250%;
          height: 250%;
          background: linear-gradient(
            120deg,
            transparent 35%,
            rgba(72, 201, 44, 0.15) 50%,
            transparent 65%
          );
          transform: rotate(25deg);
          transition: all 1s ease;
          pointer-events: none;
          z-index: 1;
        }

        .about-card:hover::after, .timeline-card:hover::after {
          left: 100%;
          top: 100%;
        }

        .about-card:hover, .timeline-card:hover {
          border-color: var(--primary) !important;
          box-shadow:
            0 0 20px rgba(72, 201, 44, 0.08),
            0 0 60px rgba(72, 201, 44, 0.05) !important;
          transform: translateY(-8px);
        }

        /* Dark mode overrides */
        [data-theme='dark'] .about-support-section {
          background: var(--bg-dark);
        }
        [data-theme='dark'] .support-section-title {
          color: #f8fafc;
        }
        [data-theme='dark'] .support-item-info h3 {
          color: #e2e8f0;
        }
        [data-theme='dark'] .support-item-info p {
          color: #94a3b8;
        }

        @media (max-width: 1024px) {
          .achievements-row {
            grid-template-columns: 1fr 1fr;
            row-gap: 40px;
          }
          .support-grid {
            grid-template-columns: 1fr 1fr;
            gap: 40px 30px;
          }
          .about-hero-title {
            font-size: 2.8rem;
          }
        }
        
        @media (max-width: 768px) {
          .hero-content-container {
            text-align: center;
          }
          .about-hero-sub {
            margin: 0 auto;
          }
          .about-cards-grid-stacked {
            align-items: center;
          }
          .about-card {
            padding: 20px;
          }
          .about-card h2 {
            font-size: 1.5rem;
          }
          .achievements-row {
            grid-template-columns: 1fr;
          }
          .support-grid {
            grid-template-columns: 1fr;
            gap: 30px;
          }
          .about-hero-title {
            font-size: 2.2rem;
          }
          .timeline-item-row {
            flex-direction: column;
            align-items: flex-start;
            gap: 12px;
          }
          .about-hero-section {
            padding: 60px 0 40px;
          }
          .about-achievements, .about-timeline-section, .about-support-section {
            padding: 60px 0;
          }
          .support-section-title {
            font-size: 1.8rem;
            text-align: center;
            line-height: 1.35;
            margin-bottom: 40px;
          }
          .support-item {
            flex-direction: column;
            align-items: center;
            text-align: center;
          }
        }
      `}</style>
    </div>
  );
};

export default About;