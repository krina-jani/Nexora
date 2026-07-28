import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";
import { FaArrowRight, FaGithub, FaLinkedin, FaEnvelope, FaInstagram } from "react-icons/fa";
// Common Components
import Marquee from "../components/common/Marquee";

// Sections
import {
  OurSuccessJourney,
  WhyChooseNexora,
  OurCoreServices,
  TargetPlacementsBySector,
  FeaturedCareerPathways,
  OurPlacedCandidates,
  PlacementWorkflow,
  FAQ
} from "../components";

gsap.registerPlugin(ScrollTrigger);

const Home = () => {
  const homeRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      const x = (e.clientX - window.innerWidth / 2) / 30;
      const y = (e.clientY - window.innerHeight / 2) / 30;
      setMousePos({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Hero Animations
      gsap.from(".hero-title span", {
        y: 100,
        opacity: 0,
        stagger: 0.15,
        duration: 1.2,
        ease: "power4.out"
      });

      gsap.from(".hero-cta-group, .hero-scroll-indicator", {
        y: 40,
        opacity: 0,
        duration: 1,
        delay: 0.5,
        ease: "power3.out"
      });

      gsap.from(".floating-card", {
        scale: 0.8,
        opacity: 0,
        stagger: 0.2,
        duration: 1.4,
        delay: 0.3,
        ease: "elastic.out(1, 0.75)"
      });

      // 2. Section Title Reveals
      gsap.utils.toArray(".section-title-reveal").forEach((title) => {
        gsap.from(title, {
          scrollTrigger: {
            trigger: title,
            start: "top 85%"
          },
          y: 40,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out"
        });
      });

      // 3. Horizontal Scroll Animation
      const textElement = document.querySelector('.Horizontal__text');
      const container = document.querySelector('.Horizontal__container');
      
      if (textElement && container) {
        // We attach splitInstance to textElement so we can clean it up
        textElement.splitInstance = new SplitType(textElement, { types: 'chars,words' });
        
        const wrapper = document.querySelector('.Horizontal');
        
        const scrollTween = gsap.to(container, {
          x: () => -(container.scrollWidth - window.innerWidth + window.innerWidth * 0.1),
          ease: "none",
          scrollTrigger: {
            trigger: wrapper,
            pin: true,
            end: "+=5000px",
            scrub: true,
          }
        });

        textElement.splitInstance.chars.forEach((char) => {
          gsap.from(char, {
            yPercent: gsap.utils.random(-200, 200),
            opacity: 0,
            rotation: gsap.utils.random(-20, 20),
            scale: 0.5,
            ease: "back.out(1.2)",
            scrollTrigger: {
              trigger: char,
              containerAnimation: scrollTween,
              start: "left 90%",
              end: "left 20%",
              scrub: 1,
            }
          });
        });
      }
    }, homeRef);

    return () => {
      ctx.revert();
      const textElement = document.querySelector('.Horizontal__text');
      if (textElement && textElement.splitInstance) {
        textElement.splitInstance.revert();
      }
    };
  }, []);

  const companiesList = [
    "Google", "Amazon", "Infosys", "TCS", "IBM", "Deloitte", "Microsoft", "Accenture", "Oracle", "Adobe"
  ];

  return (
    <div ref={homeRef} className="home-container">
      {/* SECTION 1: HERO */}
      <section className="hero-section">
        <div className="hero-bg-glow"></div>
        <div className="container hero-grid">
          {/* Left Column */}
          <div className="hero-left">
            <span className="hero-badge">GLOBAL PLACEMENT ENGINE</span>
            <h1 className="hero-title">
              Hello, We're <span className="text-gradient">Nexora</span> <br />
              Global Careers <br />
              & Placements
            </h1>
            <p className="hero-subtext">
              Connect with top global companies, build high-converting ATS portfolios, and refine your technical interview loops.
            </p>
            <div className="hero-cta-group">
              <Link to="/contact" className="btn-primary-pill">
                Explore Careers <FaArrowRight style={{ marginLeft: "8px", fontSize: "14px" }} />
              </Link>
            </div>
          </div>

          {/* Right Column */}
          <div className="hero-right">
            {/* Dark Profile Card */}
            <div className="profile-card">
              <div className="profile-avatar">
                <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80" alt="Advisor" />
              </div>
              <div className="profile-info">
                <h4>Sarah Jenkins</h4>
                <p>FAANG Tech Recruiter</p>
                <Link to="/contact" className="profile-link">Get in Touch</Link>
              </div>
            </div>

            {/* Resume Card */}
            <div className="resume-card-box">
              <div className="resume-meta">
                <span className="meta-badge">RESUME</span>
                <span className="meta-size">PDF • 2.4 MB</span>
              </div>
              <h3>ATS Diagnostic CV</h3>
              <p>Optimize your resume with our global advisors and get selected for top loops.</p>
              <Link to="/services" className="btn-cv">
                Check Resume
              </Link>
            </div>

            {/* Vertical Socials */}
            <div className="vertical-socials">
              <a href="https://github.com" target="_blank" rel="noopener noreferrer"><FaGithub /></a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"><FaLinkedin /></a>
              <a href="mailto:info@nexora.com"><FaEnvelope /></a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        {/* <div className="hero-scroll-indicator-new">
          <span>SCROLL</span>
          <div className="scroll-line"></div>
        </div> */}
      </section>

      {/* SECTION 2: TRUSTED BY MARQUEE */}
      <section className="marquee-section">
        <div className="container text-center">
          <p className="marquee-intro">Nexora Graduates Placed at Global Leaders</p>
          <Marquee items={companiesList} />
        </div>
      </section>

      {/* SECTION 3: ABOUT NEXORA */}
      <section className="about-intro-section">
        <div className="container about-intro-grid">
          <div className="about-intro-left">
            <h2 className="section-title-reveal">Bridging Talent with Borderless Careers</h2>
            <p>
              Nexora Career is a career preparation hub designed to align your technical capacities with the standards of the world's most innovative teams. We strip away the ambiguity of tech application pipelines and replace it with structured mentorship.
            </p>
            <div className="about-stats-deck">
              <div className="about-stat-item glass">
                <h3>5,000+</h3>
                <p>Grads Coached</p>
              </div>
              <div className="about-stat-item glass">
                <h3>20+</h3>
                <p>Global Countries</p>
              </div>
            </div>
            <Link to="/about" className="btn-primary learn-more-btn">
              Learn More About Us
            </Link>
          </div>
          <div className="about-intro-right">
            <div className="visual-media-box glass">
              <div className="overlay-radial"></div>
              <h3>Empowering Placements</h3>
              <p>98% Successful domain migrations.</p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: OUR SUCCESS JOURNEY */}
      <OurSuccessJourney />

      {/* SECTION 5: WHY CHOOSE NEXORA */}
      <WhyChooseNexora />

      {/* SECTION 6: SERVICES */}
      <OurCoreServices />

      {/* SECTION 7: INDUSTRIES */}
      <TargetPlacementsBySector />

      {/* SECTION 8: FEATURED PROGRAMS */}
      <FeaturedCareerPathways />

      {/* SECTION 9: STATISTICS */}
      <section className="stats-counters-section">
        <div className="container stats-flex-grid">
          <div className="stat-counter-box text-center">
            <h3>5000+</h3>
            <p>Students Placed</p>
          </div>
          <div className="stat-counter-box text-center">
            <h3>250+</h3>
            <p>Hiring Partners</p>
          </div>
          <div className="stat-counter-box text-center">
            <h3>98%</h3>
            <p>Placement Rate</p>
          </div>
          <div className="stat-counter-box text-center">
            <h3>20+</h3>
            <p>Global Countries</p>
          </div>
        </div>
      </section>

      {/* SECTION 10: SUCCESS STORIES */}
      <OurPlacedCandidates />

      {/* SECTION 11: PLACEMENT PROCESS */}
      <PlacementWorkflow />

      {/* SECTION 12: FAQ */}
      <FAQ />

      {/* SECTION 13: HORIZONTAL SCROLL CTA */}
      <section className="Horizontal">
        <div className="Horizontal__container">
          <h3 className="Horizontal__text">
            READY TO LAUNCH YOUR CAREER? THE WORLD'S MOST INNOVATIVE TEAMS ARE WAITING FOR YOU.
          </h3>
        </div>
        
        <div className="Horizontal__fixed-cta">
          <Link to="/contact" className="btn-primary" style={{ background: '#ffffff', color: '#0f172a', borderColor: '#ffffff', fontSize: 'clamp(0.9rem, 1.5vw, 1.1rem)', padding: '12px 24px', borderRadius: '50px', whiteSpace: 'nowrap' }}>
            Book Free Consultation
          </Link>
          <Link to="/services" className="btn-primary btn-secondary" style={{ background: 'transparent', color: '#ffffff', border: '1.5px solid #ffffff', fontSize: 'clamp(0.9rem, 1.5vw, 1.1rem)', padding: '12px 24px', borderRadius: '50px', whiteSpace: 'nowrap' }}>
            Explore Services
          </Link>
        </div>
      </section>

      {/* Inline styles for Home Page elements (Remaining main sections) */}
      <style>{`
        .Horizontal {
          overflow: hidden;
          height: 100vh;
          display: flex;
          align-items: center;
          padding: 2rem;
          background: #0f172a;
          color: #f8fafc;
          position: relative;
        }
        
        .Horizontal__container {
          width: max-content;
          display: flex;
          align-items: center;
          gap: clamp(40px, 8vw, 100px);
          will-change: transform;
        }

        .Horizontal__text {
          display: inline-block;
          width: max-content;
          white-space: nowrap;
          font-size: clamp(3rem, 12vw, 10rem);
          font-weight: 700;
          letter-spacing: -0.02em;
          line-height: 1.1;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
        }

        .Horizontal__text .char {
          display: inline-block;
          will-change: transform, opacity;
        }

        .Horizontal__fixed-cta {
          position: absolute;
          bottom: 2rem;
          right: 2rem;
          display: flex;
          gap: 16px;
          z-index: 10;
        }

        @media (max-width: 768px) {
          .Horizontal__fixed-cta {
            bottom: 1.5rem;
            right: 1.5rem;
            flex-direction: column;
            gap: 12px;
          }
        }

        .home-container {
          overflow-x: hidden;
        }
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400..900;1,400..900&display=swap');

        .hero-section {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          justify-content: center;
          position: relative;
          padding: 80px 0;
          background: radial-gradient(circle at 10% 20%, #ffffffff 0%, #c7ffd6 40%, #c7ffd6 100%);
          overflow: hidden;
        }
        .hero-bg-glow {
          position: absolute;
          width: 500px;
          height: 500px;
          background: radial-gradient(circle, rgba(72, 201, 44, 0.05) 0%, transparent 70%);
          top: 10%;
          left: -10%;
          pointer-events: none;
        }
        .hero-grid {
          display: grid;
          grid-template-columns: 1.1fr 0.9fr;
          gap: 60px;
          align-items: center;
          position: relative;
          z-index: 2;
        }
        .hero-badge {
          display: inline-block;
          font-size: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 2px;
          color: #2F8E1C;
          font-weight: 700;
          margin-bottom: 24px;
        }
        .hero-title {
          font-family: 'Playfair Display', serif;
          font-size: 5.2rem;
          font-weight: 800;
          line-height: 1.05;
          letter-spacing: -2px;
          color: #111b15;
          margin-bottom: 30px;
        }
        .text-gradient {
          background: linear-gradient(135deg, #48C92C, #2E8E1B);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .hero-subtext {
          font-size: 1.2rem;
          line-height: 1.6;
          color: #475569;
          margin-bottom: 40px;
          max-width: 540px;
        }
        .btn-primary-pill {
          display: inline-flex;
          align-items: center;
          padding: 14px 32px;
          background: #48C92C;
          color: #111b15;
          font-weight: 700;
          border-radius: 50px;
          border: none;
          box-shadow: 0 8px 24px rgba(133, 232, 185, 0.3);
          transition: background 0.3s, transform 0.2s;
          cursor: pointer;
        }
        .btn-primary-pill:hover {
          background: #53D131;
          transform: translateY(-2px);
        }
        
        .hero-right {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          justify-content: center;
          gap: 24px;
          height: 100%;
          padding-right: 12%;
        }
        
        /* Dark Profile Card */
        .profile-card {
          width: 340px;
          padding: 20px;
          border-radius: 24px;
          background: #4A5A51;
          border: 1px solid rgba(255, 255, 255, 0.1);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
          color: #ffffff;
          display: flex;
          align-items: center;
          gap: 16px;
          transition: transform 0.3s;
          z-index: 5;
        }
        .profile-card:hover {
          transform: translateY(-2px);
        }
        .profile-avatar {
          width: 60px;
          height: 60px;
          border-radius: 18px;
          overflow: hidden;
        }
        .profile-avatar img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .profile-info h4 {
          margin: 0 0 4px 0;
          font-size: 1.1rem;
          font-weight: 700;
        }
        .profile-info p {
          margin: 0 0 8px 0;
          font-size: 0.85rem;
          color: #cbd5e1;
        }
        .profile-link {
          font-size: 0.85rem;
          color: #48C92C;
          text-decoration: none;
          font-weight: 600;
          border-bottom: 1px solid transparent;
          transition: border-color 0.2s;
        }
        .profile-link:hover {
          border-color: #85E8B9;
        }

        /* Resume Card Box */
        .resume-card-box {
          width: 340px;
          padding: 24px;
          border-radius: 24px;
          background: #ffffff;
          border: 1px solid rgba(75, 90, 81, 0.08);
          box-shadow: 0 15px 35px rgba(0, 0, 0, 0.05);
          transition: transform 0.3s;
          z-index: 4;
        }
        .resume-card-box:hover {
          transform: translateY(-2px);
        }
        .resume-meta {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 16px;
        }
        .meta-badge {
          font-size: 0.75rem;
          font-weight: 700;
          color: #2F8E1C;
          background: #EBF8F2;
          padding: 4px 10px;
          border-radius: 8px;
        }
        .meta-size {
          font-size: 0.75rem;
          color: #94a3b8;
        }
        .resume-card-box h3 {
          font-family: 'Playfair Display', serif;
          font-size: 1.5rem;
          font-weight: 700;
          color: #0f172a;
          margin: 0 0 8px 0;
        }
        .resume-card-box p {
          font-size: 0.85rem;
          color: #64748b;
          margin: 0 0 20px 0;
          line-height: 1.5;
        }
        .btn-cv {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 10px 24px;
          background: #48C92C;
          color: #111b15;
          font-weight: 700;
          font-size: 0.85rem;
          border-radius: 50px;
          text-decoration: none;
          transition: background 0.3s;
        }
        .btn-cv:hover {
          background: #6cdba6;
        }

        /* Vertical Socials */
        .vertical-socials {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 16px;
          margin-right: 16px;
          z-index: 10;
        }
        .vertical-socials a {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background: #ffffff;
          color: #0f172a;
          border: 1px solid rgba(0, 0, 0, 0.05);
          box-shadow: 0 4px 12px rgba(0,0,0,0.03);
          font-size: 1.1rem;
          transition: transform 0.2s, background 0.2s, color 0.2s;
        }
        .vertical-socials a:hover {
          transform: translateY(-3px);
          background: #3E4D44;
          color: #ffffff;
        }

        // /* Scroll Indicator */
        .hero-scroll-indicator-new {
          position: absolute;
          bottom: 3%;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 10px;
          color: #94a3b8;
          font-size: 0.75rem;
          letter-spacing: 2px;
          font-weight: 600;
        }
        .scroll-line {
          width: 1px;
          height: 50px;
          background: linear-gradient(to bottom, #94a3b8, transparent);
        }

        /* Trusted By */
        .marquee-section {
          padding: 40px 0;
          background: var(--bg-soft);
          border-top: 1px solid var(--border);
          border-bottom: 1px solid var(--border);
        }
        .marquee-intro {
          font-size: 0.9rem;
          text-transform: uppercase;
          letter-spacing: 2px;
          color: var(--text-light);
          margin-bottom: 20px;
          font-weight: 600;
        }

        /* About Intro */
        .about-intro-section {
          padding: 100px 0;
        }
        .about-intro-grid {
          display: grid;
          grid-template-columns: 1.2fr 1fr;
          gap: 60px;
          align-items: center;
        }
        .about-intro-left h2 {
          font-size: 2.5rem;
          font-weight: 800;
          line-height: 1.2;
          margin-bottom: 24px;
        }
        .about-intro-left p {
          color: var(--text);
          line-height: 1.6;
          margin-bottom: 30px;
        }
        .about-stats-deck {
          display: flex;
          gap: 20px;
          margin-bottom: 35px;
        }
        .about-stat-item {
          flex: 1;
          padding: 24px;
          border-radius: var(--radius-sm);
          border: 1px solid var(--border);
        }
        .about-stat-item h3 {
          font-size: 2rem;
          font-weight: 800;
          color: var(--primary);
          margin-bottom: 8px;
        }
        .about-stat-item p {
          margin: 0;
          font-size: 0.95rem;
          color: var(--text-light);
        }
        .visual-media-box {
          height: 380px;
          border-radius: var(--radius-lg);
          border: 1px solid var(--border);
          background: linear-gradient(135deg, var(--bg-soft), var(--accent));
          position: relative;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          padding: 40px;
        }
        .overlay-radial {
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at center, transparent 30%, rgba(255,255,255,0.8) 100%);
        }

        /* Stats Counters */
        .stats-counters-section {
          padding: 80px 0;
          background: var(--primary);
          color: var(--white);
        }
        .stats-flex-grid {
          display: flex;
          justify-content: space-around;
          flex-wrap: wrap;
          gap: 40px;
        }
        .stat-counter-box h3 {
          font-size: 3rem;
          font-weight: 800;
          margin-bottom: 8px;
          text-shadow: 0 0 15px rgba(255,255,255,0.3);
        }
        .stat-counter-box p {
          margin: 0;
          font-size: 1.1rem;
          opacity: 0.9;
        }

        /* CTA Mask Effect */
        .global-cta-section {
          position: relative;
          width: 100%;
          height: 450px;
          overflow: hidden;
          background: #ffffff;
          cursor: crosshair;
        }
        .cta-reveal-layer {
          position: absolute;
          inset: 0;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          background: #ffffff;
          color: #0f172a;
          text-align: center;
          padding: 40px;
        }
        .cta-reveal-layer h2 {
          font-size: 2.8rem;
          font-weight: 800;
          color: #0f172a;
          margin-bottom: 16px;
        }
        .cta-reveal-layer p {
          max-width: 600px;
          font-size: 1.1rem;
          color: #475569;
          line-height: 1.6;
          margin-bottom: 24px;
        }
        .cta-mask-layer {
          position: absolute;
          inset: 0;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          background: #090d16;
          color: #ffffff;
          text-align: center;
          padding: 40px;
        }
        .cta-mask-layer h2 {
          font-size: 2.8rem;
          font-weight: 800;
          color: #ffffff;
          margin-bottom: 16px;
        }
        .cta-mask-layer p {
          max-width: 600px;
          font-size: 1.1rem;
          color: #94a3b8;
          line-height: 1.6;
          margin-bottom: 24px;
        }
        .cta-mask-layer .text-gradient-mask {
          background: linear-gradient(90deg, #48C92C, #00d2ff);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .cta-buttons-wrapper {
          display: flex;
          gap: 20px;
          z-index: 10;
        }
        .btn-secondary {
          background: transparent !important;
          border: 1.5px solid var(--primary) !important;
          color: var(--primary) !important;
          box-shadow: none !important;
        }
        .btn-secondary:hover {
          background: var(--primary) !important;
          color: var(--white) !important;
        }

        /* Responsive Breakpoints */
        @media (max-width: 991px) {
          .hero-section {
            min-height: auto;
            padding: 120px 0 60px;
          }
          .hero-grid {
            grid-template-columns: 1fr;
            text-align: center;
            gap: 40px;
          }
          .hero-title {
            font-size: 3.5rem;
          }
          .hero-subtext {
            margin-inline: auto;
          }
          .hero-cta-group {
            justify-content: center;
          }
          .hero-right {
            height: auto;
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 24px;
            padding: 20px 0;
          }
          .profile-card, .resume-card-box {
            position: relative;
            top: auto;
            left: auto;
            right: auto;
            bottom: auto;
            transform: none !important;
            width: 100%;
            max-width: 340px;
          }
          .vertical-socials {
            position: relative;
            right: auto;
            bottom: auto;
            flex-direction: row;
            justify-content: center;
            margin-top: 20px;
          }
          .about-intro-grid {
            grid-template-columns: 1fr;
          }
          .process-timeline-flex {
            justify-content: center;
          }
        }

        @media (max-width: 768px) {
          .hero-title {
            font-size: 2.8rem;
          }
          .cta-reveal-layer h2,
          .cta-mask-layer h2 {
            font-size: 2rem;
          }
        }

        @media (max-width: 576px) {
          .global-cta-section {
            height: 400px;
          }
          .cta-reveal-layer h2,
          .cta-mask-layer h2 {
            font-size: 1.7rem;
            margin-bottom: 12px;
          }
          .cta-reveal-layer p,
          .cta-mask-layer p {
            font-size: 0.95rem;
            margin-bottom: 20px;
            padding: 0 10px;
          }
          .cta-buttons-wrapper {
            flex-direction: column;
            width: 100%;
            gap: 12px;
            align-items: center;
          }
          .cta-buttons-wrapper a {
            width: 80%;
            max-width: 280px;
            text-align: center;
            justify-content: center;
          }
        }

        @media (max-width: 480px) {
          .hero-title {
            font-size: 2.2rem;
          }
          .hero-subtext {
            font-size: 1rem;
          }
        }
      `}</style>
    </div>
  );
};

export default Home;