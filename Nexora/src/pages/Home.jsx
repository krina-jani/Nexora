import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";
import { FaArrowRight, FaGithub, FaLinkedin, FaEnvelope, FaInstagram } from "react-icons/fa";
import heroBgImage from "../assets/images/perfect-hero.png";
// Common Components
import Marquee from "../components/common/Marquee";
import GradientWaves from "../components/common/GradientWaves";

// Sections
import {
  OurSuccessJourney,
  WhyChooseNexora,
  OurCoreServices,
  TargetPlacementsBySector,
  OurPlacedCandidates,
  PlacementWorkflow,
  FAQ
} from "../components";

gsap.registerPlugin(ScrollTrigger);

const Typewriter = ({ texts, typingSpeed = 75, deletingSpeed = 50, pauseDuration = 1500, loop = true }) => {
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);

  useEffect(() => {
    let timer;
    const i = loopNum % texts.length;
    const fullText = texts[i];

    const handleTyping = () => {
      setText(
        isDeleting
          ? fullText.substring(0, text.length - 1)
          : fullText.substring(0, text.length + 1)
      );

      let typeSpeed = isDeleting ? deletingSpeed : typingSpeed;

      if (!isDeleting && text === fullText) {
        typeSpeed = pauseDuration;
        setIsDeleting(true);
      } else if (isDeleting && text === "") {
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
        typeSpeed = 500;
      }

      timer = setTimeout(handleTyping, typeSpeed);
    };

    timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [text, isDeleting, loopNum, texts, typingSpeed, deletingSpeed, pauseDuration]);

  return (
    <span className="text-type">
      {text}
      <span className="cursor">_</span>
    </span>
  );
};

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

    }, homeRef);

    return () => {
      ctx.revert();
    };
  }, []);

  const companiesList = [
    "Google", "Amazon", "Infosys", "TCS", "IBM", "Deloitte", "Microsoft", "Accenture", "Oracle", "Adobe"
  ];

  return (
    <div ref={homeRef} className="home-container">
      {/* SECTION 1: HERO */}
      <section className="hero-section" >
        <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", zIndex: 1 }}>
          <GradientWaves
            horizonColor="#000000ff"
            waveColor="#2D5C9D"
            crestColor="#ffffffff"
            speed={0.4}

            amplitude={2.5}
            waveScale={0.6}
            waveRatio={0.9}
            swell={35}
            turbulence={20}
            tilt={1.11}
            zoom={1.0}
            height={5.5}
            fogDepth={15}
            detail="medium"
            brightness={1.0}
            opacity={1.0}
            mouseInteraction={true}
            parallaxStrength={0.5}
            grain={true}
            grainIntensity={0.05}
          />
        </div>
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
              From resume writing to recruitment process outsourcing, Nexora Career builds the bridge between your skills and the world's top hiring teams.
            </p>
            <div className="hero-cta-group">
              <Link to="/contact" className="btn-primary-pill">
                Explore Careers <FaArrowRight style={{ marginLeft: "8px", fontSize: "14px" }} />
              </Link>
            </div>
          </div>

          {/* Right Column */}
          <div className="hero-right">
            <div className="hero-glass-card hero-stat-card">
              <h2>5,000+</h2>
              <p>Candidates placed at leading tech companies worldwide.</p>
            </div>

            <div className="hero-glass-card hero-testimonial-card">
              <div className="testimonial-header">
                <span className="testimonial-company-icon">G</span>
                <span className="testimonial-company-name">Google</span>
              </div>
              <p className="testimonial-quote">
                "Nexora Career's vetted talent pipeline made hiring faster and more reliable for our team."
              </p>
              <div className="testimonial-user">
                <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=80&auto=format&fit=crop&q=80" alt="Sarah Jenkins" className="testimonial-avatar" />
                <div className="testimonial-user-info">
                  <h4>Sarah Jenkins</h4>
                  <p>FAANG Recruiter & Advisor</p>
                </div>
              </div>
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
      <section className="marquee-section text-center">
        <p className="marquee-intro">Nexora Graduates Placed at Global Leaders</p>
        <Marquee items={companiesList} />
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

      {/* SECTION 5: Why Nexora Career Leads in RPO & Career Coaching*/}
      <WhyChooseNexora />

      {/* SECTION 6: SERVICES */}
      <OurCoreServices />

      {/* SECTION 7: INDUSTRIES */}
      <TargetPlacementsBySector />

      {/* SECTION 10: SUCCESS STORIES */}
      <OurPlacedCandidates />

      {/* SECTION 11: PLACEMENT PROCESS */}
      <PlacementWorkflow />

      {/* SECTION 12: FAQ */}
      <FAQ />

      {/* SECTION 13: FINAL CTA */}
      <section className="final-cta-section">
        <div className="container">
          <div className="cta-box glass text-center">
            <h2 className="cta-heading">
              <Typewriter
                texts={[
                  "Are you ready to launch your career in Nexora ?",
                  "Join the world's most innovative teams.",
                ]}
              />
            </h2>
            <p className="cta-subheading">
              Join thousands of professionals who have transformed their careers with our global placement engine.
            </p>
            <div className="cta-buttons">
              <Link to="/contact" className="btn-primary cta-btn-main">
                Book Free Consultation
              </Link>
              <Link to="/services" className="btn-primary cta-btn-outline">
                Explore Services
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Inline styles for Home Page elements (Remaining main sections) */}
      <style>{`
        .final-cta-section {
          padding: 80px 0 120px 0;
          position: relative;
          background: #ffffff !important;
        }

        /* Swapped Monochromatic Black-and-White Theme Overrides for Home Page (Hero Section Untouched) */
        .marquee-section {
          background: #000000 !important;
          border-top: 1px solid rgba(255, 255, 255, 0.1) !important;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1) !important;
        }
        .marquee-intro {
          color: #ffffff !important;
        }
        .marquee-item {
          color: #cccccc !important;
        }
        .marquee-item:hover {
          color: #ffffff !important;
        }

        .about-intro-section {
          background-color: #ffffff !important;
          color: #000000 !important;
        }
        .about-intro-left h2 {
          color: #000000 !important;
        }
        .about-intro-left p {
          color: #444444 !important;
        }
        .about-stat-item {
          background: #ffffff !important;
          border: 1px solid #e2e8f0 !important;
          backdrop-filter: none !important;
          -webkit-backdrop-filter: none !important;
        }
        .about-stat-item h3 {
          color: #000000 !important;
        }
        .about-stat-item p {
          color: #555555 !important;
        }
        .visual-media-box {
          background: #f8fafc !important;
          border: 1px solid #e2e8f0 !important;
          backdrop-filter: none !important;
          -webkit-backdrop-filter: none !important;
        }
        .overlay-radial {
          background: radial-gradient(circle at center, transparent 30%, rgba(255,255,255,0.8) 100%) !important;
        }
        .learn-more-btn {
          background: #000000 !important;
          color: #ffffff !important;
          border: 1px solid #000000 !important;
        }
        .learn-more-btn:hover {
          background: #ffffff !important;
          color: #000000 !important;
        }

        .experience-section {
          background: #000000 !important;
        }
        .experience-title {
          color: #ffffff !important;
        }
        .timeline-line-track {
          background: rgba(255, 255, 255, 0.15) !important;
        }
        .timeline-line-fill {
          background: #ffffff !important;
          box-shadow: 0 0 10px rgba(255, 255, 255, 0.5) !important;
        }
        .timeline-dot {
          background: #000000 !important;
          border-color: #ffffff !important;
          box-shadow: 0 0 0 6px rgba(255, 255, 255, 0.08) !important;
        }
        .timeline-item:hover .timeline-dot {
          background: #ffffff !important;
          box-shadow: 0 0 12px rgba(255, 255, 255, 0.5) !important;
        }
        .timeline-content {
          background: rgba(255, 255, 255, 0.05) !important;
          border: 1px solid rgba(255, 255, 255, 0.12) !important;
          backdrop-filter: blur(12px) !important;
          -webkit-backdrop-filter: blur(12px) !important;
        }
        .timeline-item:hover .timeline-content {
          border-color: rgba(255, 255, 255, 0.3) !important;
          box-shadow: 0 10px 30px rgba(255, 255, 255, 0.05) !important;
        }
        .timeline-period {
          color: #cccccc !important;
        }
        .timeline-role {
          color: #ffffff !important;
        }
        .timeline-company {
          color: #aaaaaa !important;
        }
        .timeline-desc {
          color: #dddddd !important;
        }
        .section-tag {
          color: #ffffff !important;
        }

        .why-choose-parent-section {
          background: #ffffff !important;
        }
        .why-choose-title {
          color: #000000 !important;
        }
        .why-choose-gallery__item {
          border: 1px solid #e2e8f0 !important;
        }
        .why-choose-overlay h3 {
          color: #ffffff !important;
        }

        .services-showcase-section {
          background: #000000 !important;
        }
        .services-showcase-section .section-title-reveal {
          color: #ffffff !important;
        }
        .service-card {
          background: rgba(255, 255, 255, 0.05) !important;
          border: 1px solid rgba(255, 255, 255, 0.12) !important;
          backdrop-filter: blur(12px) !important;
          -webkit-backdrop-filter: blur(12px) !important;
        }
        .service-card:hover {
          border-color: rgba(255, 255, 255, 0.3) !important;
          box-shadow: 0 10px 30px rgba(255, 255, 255, 0.05) !important;
        }
        .service-card h3 {
          color: #ffffff !important;
        }
        .service-card p {
          color: #cccccc !important;
        }
        .service-arrow-link {
          color: #ffffff !important;
        }
        .service-arrow-link:hover {
          color: #aaaaaa !important;
        }
        .glare {
          background: linear-gradient(120deg, transparent 35%, rgba(255, 255, 255, 0.15) 50%, transparent 65%) !important;
        }

        .industries-showcase-section {
          background: #ffffff !important;
        }

        .programs-section {
          background: #000000 !important;
        }
        .programs-section .section-title-reveal {
          color: #ffffff !important;
        }
        .program-card {
          background: rgba(255, 255, 255, 0.05) !important;
          border: 1px solid rgba(255, 255, 255, 0.12) !important;
          backdrop-filter: blur(12px) !important;
          -webkit-backdrop-filter: blur(12px) !important;
        }
        .program-card:hover {
          border-color: rgba(255, 255, 255, 0.3) !important;
          box-shadow: 0 10px 30px rgba(255, 255, 255, 0.05) !important;
        }
        .program-card h3 {
          color: #ffffff !important;
        }
        .prog-diff {
          color: #000000 !important;
          background: #ffffff !important;
        }
        .prog-dur {
          color: #cccccc !important;
        }
        .prog-btn {
          background: #ffffff !important;
          color: #000000 !important;
          border: 1px solid #ffffff !important;
        }
        .prog-btn:hover {
          background: #000000 !important;
          color: #ffffff !important;
        }

        .success-stories-section {
          background: #000000 !important;
        }
        .testimonials-carousel-box {
          background: rgba(255, 255, 255, 0.05) !important;
          border: 1px solid rgba(255, 255, 255, 0.12) !important;
          backdrop-filter: blur(12px) !important;
          -webkit-backdrop-filter: blur(12px) !important;
        }
        .testimonial-active-content h3 {
          color: #ffffff !important;
        }
        .candidate-role-text {
          color: #cccccc !important;
        }
        .feedback-body {
          color: #dddddd !important;
        }
        .carousel-nav-btn {
          background: #ffffff !important;
          color: #000000 !important;
          border: 1px solid #ffffff !important;
        }
        .carousel-nav-btn:hover {
          background: #000000 !important;
          color: #ffffff !important;
        }

        .placement-process-section {
          background: #ffffff !important;
        }
        .timeline-track-bg {
          background: rgba(0, 0, 0, 0.1) !important;
        }
        .timeline-track-progress {
          background: #000000 !important;
        }
        .workflow-node h4 {
          color: #000000 !important;
        }
        .workflow-node p {
          color: #555555 !important;
        }
        .node-dot {
          background: #ffffff !important;
          border-color: #cccccc !important;
          color: #000000 !important;
        }
        .workflow-node.active .node-dot {
          background: #000000 !important;
          color: #ffffff !important;
          border-color: #000000 !important;
        }
        .workflow-node.completed .node-dot {
          background: #e2e8f0 !important;
          color: #000000 !important;
          border-color: #cbd5e1 !important;
        }
        .node-glow-ring {
          border-color: rgba(0, 0, 0, 0.15) !important;
        }

        .faq-section-box {
          background: #000000 !important;
        }
        .accordion-item-box {
          background: rgba(255, 255, 255, 0.05) !important;
          border: 1px solid rgba(255, 255, 255, 0.12) !important;
          backdrop-filter: blur(12px) !important;
          -webkit-backdrop-filter: blur(12px) !important;
        }
        .accordion-item-box.active {
          border-color: rgba(255, 255, 255, 0.3) !important;
          box-shadow: 0 10px 30px rgba(255, 255, 255, 0.05) !important;
        }
        .accordion-trigger {
          color: #ffffff !important;
        }
        .accordion-trigger:hover {
          color: #cccccc !important;
        }
        .accordion-icon {
          color: #ffffff !important;
        }
        .accordion-item-box.active .accordion-icon {
          color: #ffffff !important;
        }
        .accordion-content-inner {
          color: #dddddd !important;
        }
        
        .cta-box {
          padding: 80px 60px;
          border-radius: var(--radius-xl);
          max-width: 1100px;
          margin: 0 auto;
          border: 1px solid var(--border);
          position: relative;
          overflow: hidden;
          background: #ffffff !important;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .cta-box:hover {
          border-color: var(--primary);
          box-shadow:
            0 0 20px rgba(72, 201, 44, 0.08),
            0 0 60px rgba(72, 201, 44, 0.05);
          transform: translateY(-8px);
        }

        .cta-box::after {
          content: "";
          position: absolute;
          top: -150%;
          left: -150%;
          width: 250%;
          height: 250%;
          background: linear-gradient(
            120deg,
            transparent 35%,
            rgba(72, 201, 44, 0.25) 50%,
            transparent 65%
          );
          transform: rotate(25deg);
          transition: all 1s ease;
          pointer-events: none;
          z-index: 1;
        }

        .cta-box:hover::after {
          left: 100%;
          top: 100%;
        }

        .cta-box::before {
          content: "";
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: radial-gradient(circle at center, rgba(72, 201, 44, 0.05), transparent 70%);
          z-index: 0;
          pointer-events: none;
        }

        .cta-heading {
          font-size: clamp(2.5rem, 5vw, 3.5rem);
          font-weight: 800;
          margin-bottom: 24px;
          color: #111;
          position: relative;
          z-index: 2;
          min-height: 120px; /* Prevent layout shift during typing */
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .text-type {
          white-space: pre-wrap;
        }

        .cursor {
          display: inline-block;
          margin-left: 5px;
          animation: blink 0.75s infinite;
          color: var(--primary);
        }

        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }

        .cta-subheading {
          font-size: 1.1rem;
          color: #333;
          margin: 0 auto 40px;
          max-width: 600px;
          position: relative;
          z-index: 2;
        }

        .cta-buttons {
          display: flex;
          gap: 20px;
          justify-content: center;
          position: relative;
          z-index: 2;
        }
        
        .cta-btn-main {
          padding: 16px 32px !important;
          font-size: 1.1rem !important;
        }

        .cta-btn-outline {
          padding: 16px 32px !important;
          font-size: 1.1rem !important;
          border: 2px solid #111 !important;
          background: transparent !important;
          color: #111 !important;
          transition: all 0.3s ease !important;
        }

        .cta-btn-outline:hover {
          background: #111 !important;
          color: #ffffff !important;
        }

        @media (max-width: 1024px) {
          .cta-box {
            padding: 60px 40px;
          }
          .cta-heading {
            font-size: 2.8rem;
            min-height: 110px;
          }
        }

        @media (max-width: 768px) {
          .final-cta-section {
            padding: 60px 0 80px 0;
          }
          .cta-box {
            padding: 40px 24px;
            border-radius: var(--radius-lg);
          }
          .cta-heading {
            font-size: 2.2rem;
            min-height: 120px;
          }
          .cta-subheading {
            font-size: 1rem;
            margin-bottom: 30px;
          }
          .cta-buttons {
            flex-direction: column;
            gap: 16px;
          }
        }

        @media (max-width: 480px) {
          .cta-heading {
            font-size: 1.8rem;
            min-height: 100px;
          }
        }

        .home-container {
          overflow-x: hidden;
        }
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400..900;1,400..900&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');

        .hero-section {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          justify-content: center;
          position: relative;
          padding: 80px 0;
          background: #000000;
          
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
          color: #48C92C;
          font-weight: 700;
          margin-bottom: 24px;
        }
        .hero-title {
          font-family: 'Playfair Display', serif;
          font-size: 5.2rem;
          font-weight: 800;
          line-height: 1.05;
          letter-spacing: -2px;
          color: #ffffff;
          margin-bottom: 30px;
        }
        .text-gradient {
          background: linear-gradient(134deg, #df830d, #f59e0b);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .hero-subtext {
          font-size: 1.2rem;
          line-height: 1.6;
          color: #cbd5e1;
          margin-bottom: 40px;
          max-width: 540px;
        }
        .btn-primary-pill {
          display: inline-flex;
          align-items: center;
          padding: 14px 32px;
          background: #df830d;
          color: #111b15;
          font-weight: 700;
          border-radius: 50px;
          border: none;
          box-shadow: 0 8px 24px rgba(133, 232, 185, 0.3);
          transition: background 0.3s, transform 0.2s;
          cursor: pointer;
        }
        .btn-primary-pill:hover {
          background: #000000ff;
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
          position: absolute;
          bottom: 40px;
          right: 40px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 16px;
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
          background-color: #F9C33A;
          color: #000000;
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
          color: #000000;
        }
        .about-intro-left p {
          color: #000000;
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
          color: #333333;
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
        @media (max-width: 1024px) {
          .hero-section {
            min-height: auto;
            padding: 140px 0 80px;
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

        @media (max-width: 480px) {
          .hero-title {
            font-size: 2.2rem;
          }
          .hero-badge {
            font-size: 0.65rem;
          }
          .hero-subtext {
            font-size: 1rem;
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

        /* Glass Cards in Hero Section */
        .hero-right {
          display: flex !important;
          flex-direction: row !important;
          align-items: flex-end !important;
          justify-content: flex-end !important;
          gap: 24px !important;
          height: 100% !important;
          padding-right: 0 !important;
          padding-bottom: 40px !important;
        }
        @media (max-width: 1024px) {
          .hero-right {
            flex-direction: column !important;
            align-items: center !important;
            justify-content: center !important;
            padding-bottom: 0 !important;
          }
        }
        .hero-glass-card {
          width: 300px;
          height: 240px;
          padding: 20px 20px;
          border-radius: 24px;
          background: rgba(255, 255, 255, 0.05) !important;
          border: 1px solid rgba(255, 255, 255, 0.12) !important;
          backdrop-filter: blur(20px) !important;
          -webkit-backdrop-filter: blur(20px) !important;
          color: #ffffff !important;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.3) !important;
          transition: transform 0.3s ease, box-shadow 0.3s ease !important;
          text-align: left;
        }
        .hero-glass-card:hover {
          transform: translateY(-8px) !important;
          border-color: rgba(255, 255, 255, 0.25) !important;
          box-shadow: 0 30px 60px rgba(0, 0, 0, 0.4) !important;
        }
        .hero-stat-card h2 {
          font-family: 'Press Start 2P', monospace !important;
          font-size: 2.0rem !important;
          font-weight: 400 !important;
          letter-spacing: -1px;
          color: #ffffff !important;
          margin: 0;
          margin-bottom: 6px;
        }
        .hero-stat-card p {
          font-size: 0.95rem;
          line-height: 1.5;
          color: rgba(255, 255, 255, 0.7) !important;
          margin: 0;
        }
        .hero-testimonial-card {
          gap: 10px;
        }
        .testimonial-header {
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .testimonial-company-icon {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 28px;
          height: 28px;
          border-radius: 6px;
          background: #ffffff !important;
          color: #000000 !important;
          font-weight: 900;
          font-size: 0.95rem;
        }
        .testimonial-company-name {
          font-weight: 700;
          font-size: 1.1rem;
          letter-spacing: 0.5px;
          color: #ffffff !important;
        }
        .testimonial-quote {
          font-size: 0.95rem;
          line-height: 1.5;
          color: rgba(255, 255, 255, 0.75) !important;
          margin: 0;
          font-style: italic;
        }
        .testimonial-user {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .testimonial-avatar {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          object-fit: cover;
          border: 1.5px solid rgba(255, 255, 255, 0.5);
        }
        .testimonial-user-info h4 {
          margin: 0;
          font-size: 0.95rem;
          font-weight: 700;
          color: #ffffff !important;
        }
        .testimonial-user-info p {
          margin: 0;
          font-size: 0.8rem;
          color: rgba(255, 255, 255, 0.5) !important;
        }
      `}</style>
    </div>
  );
};

export default Home;