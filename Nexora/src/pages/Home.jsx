import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";
import { FaArrowRight, FaGithub, FaLinkedin, FaEnvelope, FaInstagram } from "react-icons/fa";
import empowermentImg from "../assets/images/empowerment.png";
// Common Components
import Marquee from "../components/common/Marquee";
import GradientWaves from "../components/common/GradientWaves";
import ScrollExpand from "../components/common/ScrollExpand/ScrollExpand";
import Beams from "../components/common/Beams/Beams";

// Sections
import {
  OurSuccessJourney,
  WhyChooseNexora,
  OurCoreServices,
  TargetPlacementsBySector,
  OurPlacedCandidates,
  PlacementWorkflow,
  FAQ,
  KineticTextBanner,
  FinalCTA
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
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const w = window.innerWidth;
      setIsMobile(w <= 480);
      setIsTablet(w > 480 && w <= 991);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
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
    { name: "TCS", domain: "tcs.com" },
    { name: "Infosys", domain: "infosys.com" },
    { name: "Google", domain: "google.com" },
    { name: "IBM", domain: "ibm.com" },
    { name: "microsoft", domain: "microsoft.com" },
    { name: "Meta", domain: "meta.com" },
    { name: "Amazon", domain: "amazon.com" },
    { name: "Wipro", domain: "wipro.com" },
    { name: "Accenture", domain: "accenture.com" },
    { name: "Cognizant", domain: "cognizant.com" },
    { name: "Capgemini", domain: "capgemini.com" },
    { name: "HCLTech", domain: "hcltech.com" },
    { name: "Tech Mahindra", domain: "techmahindra.com" },
    { name: "LTIMindtree", domain: "ltimindtree.com" },
    { name: "Deloitte", domain: "deloitte.com" },
    { name: "Apple", domain: "apple.com" },
    { name: "pepsiCo", domain: "pepsico.com" },
    { name: "Intel", domain: "intel.com" },
    { name: "Tyson Food", domain: "tysonfoods.com" },
    { name: "Walmart", domain: "walmart.com" },
    { name: "Nestlé USA", domain: "nestle.com" },
    { name: "Kellanova", domain: "kellanova.com" }
  ];

  const startWidth = isMobile ? 85 : (isTablet ? 60 : 30);
  const startHeight = isMobile ? 65 : (isTablet ? 50 : 30);
  const mediaZoom = isMobile ? 1.4 : (isTablet ? 2.0 : 4.20);

  return (
    <div ref={homeRef} className="home-container">
      {/* SECTION 1: HERO WITH REACT BITS BEAMS ANIMATION */}
      <section className="home-hero-beams-section">
        {/* Beams Animation Background */}
        <div className="hero-beams-bg">
          <Beams
            beamWidth={0.9}
            beamHeight={30}
            beamNumber={24}
            lightColor="#ffffff"
            speed={7.3}
            noiseIntensity={0}
            scale={0.27}
            rotation={30}
          />
        </div>

        {/* Hero Content Overlay */}
        <div className="container hero-beams-content-wrap">
          <div className="se-overlay-content text-center">
            <span className="hero-badge">Building Pathways to USA Careers</span>
            <h1 className="hero-title text-center">
              Let's Build Your <span className="text-gradient">Career with</span> <br className="hero-br" />
              Nexora Career
            </h1>
            <p className="hero-subtext text-center">
              From resume optimization to interview preparation, Nexora Career builds the bridge between your qualifications and the US job market.
            </p>
            <div className="hero-cta-group">
              <Link to="/services" className="btn-primary-pill">
                Explore Services <FaArrowRight style={{ marginLeft: "8px", fontSize: "14px" }} />
              </Link>
            </div>
          </div>
        </div>
      </section>



      {/* SECTION 2: TRUSTED BY MARQUEE */}
      <section className="marquee-section text-center">
        <p className="marquee-intro">Reframing Profiles for Standard US Hiring Formats</p>
        <Marquee items={companiesList} />
      </section>

      {/* SECTION 3: ABOUT NEXORA */}
      <section className="about-intro-section">
        <div className="container about-intro-grid">
          <div className="about-intro-left">
            <h2 className="section-title-reveal">Bridging Talent with the US Job Market</h2>
            <p>
              Nexora Career is a career support and preparation bridge designed to align your technical experience with the hiring standards of US employers. We clarify the job-search journey and replace ambiguity with structured, practical preparation.
            </p>
            <div className="about-stats-deck">
              <div className="about-stat-item glass">
                <h3>US Market</h3>
                <p>Strategic Focus</p>
              </div>
              <div className="about-stat-item glass">
                <h3>Tailored</h3>
                <p>Profile Optimization</p>
              </div>
            </div>
            <Link to="/about" className="btn-primary learn-more-btn">
              Learn More About Us
            </Link>
          </div>
          <div className="about-intro-right">
            <div className="visual-media-box glass">
              <img src={empowermentImg} alt="US Career Bridge" className="visual-box-image" />
              <div className="overlay-radial"></div>
              <h3>US Career Bridge</h3>
              <p>Positioning your skills for US opportunities.</p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: OUR SUCCESS JOURNEY */}
      <OurSuccessJourney />

      {/* SECTION 5: Why Nexora Career Leads in Career Support & Alignment */}
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

      {/* SECTION 12.5: PINNED KINETIC SCROLL TEXT BANNER */}
      <KineticTextBanner text="BUILD YOUR CAREER • WITH NEXORA CAREER" />

      {/* SECTION 13: FINAL CTA */}
      <FinalCTA 
        heading="Ready to Accelerate Your US Career Journey?"
        subheading="Take the next step in aligning your experience with US hiring standards. Book a consultation with our career advisors today."
        primaryBtnText="Book Free Consultation"
        primaryBtnLink="/contact"
        secondaryBtnText="Explore All Services"
        secondaryBtnLink="/services"
      />

      {/* Inline styles for Home Page elements (Remaining main sections) */}
      <style>{`
        /* 3-Color Alternating Theme Overrides for Home Page (Blue #2D5C9D, Black #000000, White #ffffff) */
        
        /* 1. Marquee Section -> Blue #3a3f46ff */
        .marquee-section {
          background: #1e2630ff !important;
          border-top: 1px solid rgba(255, 255, 255, 0.15) !important;
          border-bottom: 1px solid rgba(255, 255, 255, 0.15) !important;
        }
        .marquee-intro {
          color: #ffffff !important;
        }
        .marquee-item {
          color: #e2e8f0 !important;
        }
        .marquee-item:hover {
          color: #ffffff !important;
        }

        /* 2. About Intro Section -> Black #000000 */
        .about-intro-section {
          background-color: #000000 !important;
          color: #ffffff !important;
        }
        .about-intro-left h2 {
          color: #ffffff !important;
        }
        .about-intro-left p {
          color: #cccccc !important;
        }
        .about-stat-item {
          background: rgba(255, 255, 255, 0.06) !important;
          border: 1px solid rgba(255, 255, 255, 0.12) !important;
          backdrop-filter: blur(16px) !important;
          -webkit-backdrop-filter: blur(16px) !important;
        }
        .about-stat-item h3 {
          color: #DFBD69 !important;
        }
        .about-stat-item p {
          color: #aaaaaa !important;
        }
        .visual-media-box {
          background: rgba(255, 255, 255, 0.04) !important;
          border: 1px solid rgba(255, 255, 255, 0.12) !important;
          backdrop-filter: blur(16px) !important;
          -webkit-backdrop-filter: blur(16px) !important;
        }
        .visual-box-image {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          z-index: 0;
        }
        .visual-media-box h3,
        .visual-media-box p {
          position: relative;
          z-index: 2;
        }
        .overlay-radial {
          background: radial-gradient(circle at center, transparent 30%, rgba(0,0,0,0.8) 100%) !important;
        }
        .learn-more-btn {
          background: #DFBD69 !important;
          color: #000000 !important;
          border: 1px solid #DFBD69 !important;
        }
        .learn-more-btn:hover {
          background: transparent !important;
          color: #DFBD69 !important;
        }

        /* 3. Timeline Section -> Black #000000 with Full WebGL Waves Background */
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
          background: #DFBD69 !important;
          box-shadow: 0 0 10px rgba(223, 189, 105, 0.5) !important;
        }
        .timeline-dot {
          background: #000000 !important;
          border-color: #DFBD69 !important;
          box-shadow: 0 0 0 6px rgba(223, 189, 105, 0.1) !important;
        }
        .timeline-item:hover .timeline-dot {
          background: #DFBD69 !important;
          box-shadow: 0 0 12px rgba(223, 189, 105, 0.6) !important;
        }

        /* Waves container covers the full section background */
        .timeline-waves-container {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: 1;
        }

        /* Timeline Cards (All Glassmorphic on the full dark wave background) */
        .timeline-content {
          background: rgba(255, 255, 255, 0.05) !important;
          border: 1px solid rgba(255, 255, 255, 0.12) !important;
          backdrop-filter: blur(12px) !important;
          -webkit-backdrop-filter: blur(12px) !important;
          color: #ffffff !important;
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

        /* Duplicate class overrides removed for simpler clean structure */
        .timeline-item.left .timeline-content,
        .timeline-item.right .timeline-content {
          background: rgba(255, 255, 255, 0.05) !important;
          border: 1px solid rgba(255, 255, 255, 0.12) !important;
          backdrop-filter: blur(12px) !important;
          -webkit-backdrop-filter: blur(12px) !important;
        }
        .timeline-item.left .timeline-period,
        .timeline-item.right .timeline-period {
          color: #cccccc !important;
        }
        .timeline-item.left .timeline-role,
        .timeline-item.right .timeline-role {
          color: #ffffff !important;
        }
        .timeline-item.left .timeline-company,
        .timeline-item.right .timeline-company {
          color: #aaaaaa !important;
        }
        .timeline-item.left .timeline-desc,
        .timeline-item.right .timeline-desc {
          color: #dddddd !important;
        }

        .section-tag {
          color: #DFBD69 !important;
        }

        /* Responsive timeline overrides for mobile where everything is stacked and uses full waves background */
        @media (max-width: 768px) {
          .timeline-waves-container {
            clip-path: none !important;
          }
          .experience-section {
            background: #000000 !important;
          }
          .experience-title {
            color: #ffffff !important;
          }
          .timeline-item.left .timeline-content,
          .timeline-item.right .timeline-content {
            background: rgba(255, 255, 255, 0.05) !important;
            border: 1px solid rgba(255, 255, 255, 0.12) !important;
            backdrop-filter: blur(12px) !important;
            -webkit-backdrop-filter: blur(12px) !important;
          }
          .timeline-item.left .timeline-period,
          .timeline-item.right .timeline-period {
            color: #cccccc !important;
          }
          .timeline-item.left .timeline-role,
          .timeline-item.right .timeline-role {
            color: #ffffff !important;
          }
          .timeline-item.left .timeline-company,
          .timeline-item.right .timeline-company {
            color: #aaaaaa !important;
          }
          .timeline-item.left .timeline-desc,
          .timeline-item.right .timeline-desc {
            color: #dddddd !important;
          }
        }

        /* 4. Why Choose Nexora -> Slate #1e2630ff */
        .why-choose-parent-section {
          background: #1e2630ff !important;
        }
        .why-choose-title {
          color: #ffffff !important;
        }
        .why-choose-gallery__item {
          border: 1px solid rgba(255, 255, 255, 0.15) !important;
        }
        .why-choose-overlay h3 {
          color: #ffffff !important;
        }

        /* 5. Core Services -> Black #000000 */
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
          color: #DFBD69 !important;
        }
        .service-arrow-link:hover {
          color: #ffffff !important;
        }
        .glare {
          background: linear-gradient(120deg, transparent 35%, rgba(255, 255, 255, 0.15) 50%, transparent 65%) !important;
        }

        /* 6. Target Placements -> Slate #1e2630 */
        .industries-showcase-section {
          background: #1e2630 !important;
        }

        /* 7. Featured Career Pathways -> Slate #1e2630ff */
        .programs-section {
          background: #1e2630ff !important;
        }
        .programs-section .section-title-reveal {
          color: #ffffff !important;
        }
        .program-card {
          background: rgba(255, 255, 255, 0.08) !important;
          border: 1px solid rgba(255, 255, 255, 0.15) !important;
          backdrop-filter: blur(12px) !important;
          -webkit-backdrop-filter: blur(12px) !important;
        }
        .program-card:hover {
          border-color: rgba(255, 255, 255, 0.35) !important;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15) !important;
        }
        .program-card h3 {
          color: #ffffff !important;
        }
        .prog-diff {
          color: #1e2630ff !important;
          background: #ffffff !important;
        }
        .prog-dur {
          color: #e2e8f0 !important;
        }
        .prog-btn {
          background: transparent !important;
          color: #DFBD69 !important;
          border: 1px solid #DFBD69 !important;
        }
        .prog-btn:hover {
          background: #DFBD69 !important;
          color: #000000 !important;
        }

        .success-stories-section {
          background: transparent !important;
        }
        .testimonials-carousel-box {
          background: rgba(255, 255, 255, 0.05) !important;
          border: 1px solid rgba(255, 255, 255, 0.12) !important;
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
          background: #DFBD69 !important;
          color: #000000 !important;
          border: 1px solid #DFBD69 !important;
        }
        .carousel-nav-btn:hover {
          background: transparent !important;
          color: #DFBD69 !important;
        }

        /* 10. Placement Workflow -> Slate #1e2630ff */
        .placement-process-section {
          // background: #1e2630ff !important;
        }
        .timeline-track-bg {
          background: rgba(255, 255, 255, 0.15) !important;
        }
        .timeline-track-progress {
          background: #ffffff !important;
        }
        .workflow-node h4 {
          color: #ffffff !important;
        }
        .workflow-node p {
          color: #e2e8f0 !important;
        }
        .node-dot {
          background: rgba(255, 255, 255, 0.1) !important;
          border-color: rgba(255, 255, 255, 0.25) !important;
          color: #ffffff !important;
        }
        .workflow-node.active .node-dot {
          background: #ffffff !important;
          color: #1e2630ff !important;
          border-color: #ffffff !important;
        }
        .workflow-node.completed .node-dot {
          background: rgba(255, 255, 255, 0.2) !important;
          color: #ffffff !important;
          border-color: rgba(255, 255, 255, 0.3) !important;
        }
        .node-glow-ring {
          border-color: rgba(255, 255, 255, 0.3) !important;
        }

        /* 11. FAQ Section -> Black #000000 */
        .faq-section-box {
          background: #000000 !important;
        }
        .faq-section-box .accordion-item-box {
          background: rgba(255, 255, 255, 0.05) !important;
          border: 1px solid rgba(255, 255, 255, 0.12) !important;
          backdrop-filter: blur(12px) !important;
          -webkit-backdrop-filter: blur(12px) !important;
        }
        .faq-section-box .accordion-item-box.active {
          border-color: rgba(255, 255, 255, 0.3) !important;
          box-shadow: 0 10px 30px rgba(255, 255, 255, 0.05) !important;
        }
        .faq-section-box .accordion-trigger {
          color: #ffffff !important;
        }
        .faq-section-box .accordion-trigger:hover {
          color: #cccccc !important;
        }
        .faq-section-box .accordion-icon {
          color: #ffffff !important;
        }
        .faq-section-box .accordion-item-box.active .accordion-icon {
          color: #ffffff !important;
        }
        .faq-section-box .accordion-content-inner {
          color: #dddddd !important;
        }

        .home-container {
          overflow-x: hidden;
        }
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400..900;1,400..900&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');

        .home-scroll-expand-hero {
          width: 100%;
          height: 100vh;
          position: relative;
        }

        .se-overlay-content {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 18px;
          max-width: 800px;
          margin: 0 auto;
          padding: 120px 24px 0;
          color: #fff;
          z-index: 10;
        }
        .hero-grid {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          position: relative;
          z-index: 2;
        }
        .hero-left {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          max-width: 800px;
          margin: 0 auto;
        }
        .hero-badge {
          display: inline-block;
          font-size: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 2px;
          color: #DFBD69;
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
          background: linear-gradient(134deg, #DFBD69, #f7dfa3);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .hero-subtext {
          font-size: 1.2rem;
          line-height: 1.6;
          color: #cbd5e1;
          margin-bottom: 40px;
          max-width: 680px;
          margin-left: auto;
          margin-right: auto;
        }
        .btn-primary-pill {
          display: inline-flex;
          align-items: center;
          padding: 14px 32px;
          background: #DFBD69;
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
          .home-scroll-expand-hero {
            height: 100vh;
          }
          .se-overlay-content {
            padding: 80px 20px 0;
            gap: 15px;
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
          .about-intro-section {
            padding: 80px 0;
          }
          .about-intro-grid {
            grid-template-columns: 1fr;
            gap: 40px;
          }
          .visual-media-box {
            height: 340px;
            padding: 30px;
          }
          .process-timeline-flex {
            justify-content: center;
          }
        }

        @media (max-width: 768px) {
          .se-overlay-content {
            padding: 60px 16px 0;
            gap: 12px;
          }
          .hero-title {
            font-size: 2.8rem;
          }
          .cta-reveal-layer h2,
          .cta-mask-layer h2 {
            font-size: 2rem;
          }
          .about-intro-section {
            padding: 60px 0;
          }
          .about-intro-grid {
            gap: 30px;
          }
          .about-intro-left h2 {
            font-size: 2rem;
            margin-bottom: 16px;
          }
          .about-stats-deck {
            flex-direction: column;
            gap: 15px;
            margin-bottom: 25px;
          }
          .about-stat-item {
            padding: 20px;
          }
          .about-stat-item h3 {
            font-size: 1.6rem;
          }
          .visual-media-box {
            height: 280px;
            padding: 24px;
          }
        }

        /* Hero Beams Base & Responsive Styles */
        .home-hero-beams-section {
          position: relative;
          width: 100%;
          min-height: 650px;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          background: #000000;
        }
        .hero-beams-bg {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          z-index: 0;
        }
        .hero-beams-content-wrap {
          position: relative;
          z-index: 2;
          padding-top: 130px;
          padding-bottom: 100px;
        }
        .hero-title {
          font-size: 3.8rem;
          font-weight: 800;
          line-height: 1.2;
          color: #ffffff;
          margin-bottom: 20px;
        }
        .hero-subtext {
          font-size: 1.1rem;
          line-height: 1.65;
          color: #dddddd;
          max-width: 720px;
          margin: 0 auto 32px;
        }
        .hero-badge {
          display: inline-block;
          font-size: 0.8rem;
          font-weight: 700;
          letter-spacing: 2px;
          padding: 6px 16px;
          border-radius: 50px;
          background: rgba(223, 189, 105, 0.15);
          color: #DFBD69;
          border: 1px solid rgba(223, 189, 105, 0.3);
          margin-bottom: 16px;
        }
        .hero-cta-group {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 16px;
        }

        @media (max-width: 991px) {
          .home-hero-beams-section {
            min-height: 560px;
          }
          .hero-beams-content-wrap {
            padding-top: 110px;
            padding-bottom: 80px;
          }
          .hero-title {
            font-size: 3.0rem;
          }
          .hero-subtext {
            font-size: 1.05rem;
            max-width: 600px;
          }
        }

        @media (max-width: 768px) {
          .home-hero-beams-section {
            min-height: 500px;
          }
          .hero-beams-content-wrap {
            padding-top: 90px;
            padding-bottom: 60px;
          }
          .hero-title {
            font-size: 2.3rem;
          }
          .hero-subtext {
            font-size: 0.98rem;
            padding: 0 10px;
          }
          .hero-badge {
            font-size: 0.72rem;
            letter-spacing: 1.5px;
          }
        }

        @media (max-width: 480px) {
          .home-hero-beams-section {
            min-height: 460px;
          }
          .hero-beams-content-wrap {
            padding-top: 80px;
            padding-bottom: 50px;
          }
          .hero-title {
            font-size: 1.85rem;
            margin-bottom: 16px;
          }
          .hero-br {
            display: none;
          }
          .hero-subtext {
            font-size: 0.9rem;
            line-height: 1.5;
            margin-bottom: 24px;
          }
          .hero-badge {
            font-size: 0.65rem;
            padding: 4px 12px;
            letter-spacing: 1px;
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
          color: #DFBD69 !important;
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

        /* Hero Gold Overrides */
        .btn-primary-pill {
          background: #DFBD69 !important;
          color: #000000 !important;
          box-shadow: 0 8px 24px rgba(223, 189, 105, 0.3) !important;
        }
        .btn-primary-pill:hover {
          background: #ffffff !important;
          color: #000000 !important;
        }
      `}</style>
    </div>
  );
};

export default Home;