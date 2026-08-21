import { useState, useEffect, useRef } from "react";
import { useLocation, Link } from "react-router-dom";
import gsap from "gsap";
import services from "../data/services";
import Accordion from "../components/common/Accordion";
import faq from "../data/faq";
import servicesHeroImg from "../assets/images/services-hero.jpg";
import ScrollExpand from "../components/common/ScrollExpand/ScrollExpand";

const Services = () => {
  const pageRef = useRef(null);
  const location = useLocation();
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

  // Scroll to hash on mount
  useEffect(() => {
    if (location.hash) {
      setTimeout(() => {
        const id = location.hash.replace('#', '');
        const element = document.getElementById(id);
        if (element) {
          const y = element.getBoundingClientRect().top + window.scrollY - 120;
          window.scrollTo({ top: y, behavior: 'smooth' });
        }
      }, 500); // Wait for GSAP and render
    }
  }, [location.hash]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero entrance
      gsap.from(".services-hero-title", {
        y: 60,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out"
      });

      // Cards reveal as they enter viewport
      gsap.utils.toArray(".detailed-service-content").forEach((content) => {
        gsap.from(content, {
          scrollTrigger: {
            trigger: content,
            start: "top 85%"
          },
          x: -50,
          opacity: 0,
          duration: 0.8,
          ease: "power2.out",
          clearProps: "all"
        });
      });

      gsap.utils.toArray(".detailed-service-image").forEach((img) => {
        gsap.from(img, {
          scrollTrigger: {
            trigger: img,
            start: "top 85%"
          },
          x: 50,
          opacity: 0,
          duration: 0.8,
          ease: "power2.out",
          clearProps: "all"
        });
      });


    }, pageRef);

    return () => ctx.revert();
  }, []);


  const startWidth = isMobile ? 85 : (isTablet ? 60 : 30);
  const startHeight = isMobile ? 65 : (isTablet ? 50 : 30);
  const mediaZoom = isMobile ? 1.4 : (isTablet ? 2.0 : 4.20);

  return (
    <div ref={pageRef} className="services-page-wrapper" style={{ background: "#000000" }}>

      {/* ── ScrollExpand Hero ── */}
      <div className="services-scroll-expand-hero">
        <ScrollExpand
          src={servicesHeroImg}
          alt="Team of professionals collaborating in a modern office"
          title="Our Elite Career Services"
          useWindowScroll
          reverse
          startWidth={startWidth}
          startHeight={startHeight}
          startRadius={8}
          endRadius={0}
          mediaZoom={mediaZoom}
          scrollDistance={isMobile || isTablet ? 0.75 : 1.65}
          holdDistance={isMobile || isTablet ? 0.15 : 0.25}
          overlayScrim={0.85}
        >
          {/* Overlay content – fades in when fully expanded */}
          <div className="se-overlay-content">
            <p className="se-overlay-eyebrow">Nexora · Career Acceleration</p>
            <h2 className="se-overlay-heading">
              Engineered to elevate <br />
              <span className="se-overlay-accent">every professional</span>
            </h2>
            <p className="se-overlay-sub">
              Refine your profile, build technical authority, and land the
              offers you deserve.
            </p>
            <a href="#services-list" className="se-overlay-cta">
              Explore Services
            </a>
          </div>
        </ScrollExpand>
      </div>

      {/* ── Process Section ── */}
      <div 
        className="services-hero-process-wrapper"
        style={{
          background: '#1e2630ff',
          position: 'relative'
        }}
      >
        {/* How It Works / Process Section */}
        <section className="process-section">
          <div className="container">
            <div className="text-center section-header">
              <h1 className="section-title">Our Proven Process</h1>
              <p className="text-light">A strategic, step-by-step approach to align your career with US standards.</p>
            </div>
            
            <div className="process-grid">
              <div className="process-step">
                <h4>STEP 1: Profile Review</h4>
                <p>Understand your experience, career goals, target roles, and US-market readiness.</p>
              </div>
              <div className="process-step">
                <h4>STEP 2: Career Profile Prep</h4>
                <p>Improve resume, LinkedIn positioning, and supporting career materials to meet US standards.</p>
              </div>
              <div className="process-step">
                <h4>STEP 3: Opportunity Alignment</h4>
                <p>Identify relevant roles and opportunities based on your background and target direction.</p>
              </div>
              <div className="process-step">
                <h4>STEP 4: Application & Interview Support</h4>
                <p>Provide structured guidance through applications, mock interviews, and communication.</p>
              </div>
              <div className="process-step">
                <h4>STEP 5: Ongoing Guidance</h4>
                <p>Provide appropriate coaching and support as you navigate the US hiring process.</p>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Detailed Services Sections (Mapped to Dropdown IDs) */}
      <div className="detailed-services-wrapper" style={{ background: "#000000" }}>
        {services.map((svc, index) => (
          <section key={svc.id} id={svc.id} className={`detailed-service-section ${index % 2 !== 0 ? 'alt-layout' : ''}`}>
            <div className="container">
              <div className="detailed-service-grid">
                
                <div className="detailed-service-content">
                  <div className="service-icon-box">
                    <span className="dot-indicator"></span>
                  </div>
                  <h2 className="service-title txt-white">{svc.title}</h2>
                  <p className="service-desc txt-white">{svc.description}</p>
                  
                  {svc.whatWeHelpWith && (
                    <div style={{ marginBottom: "20px" }}>
                      <h4 className="txt-white" style={{ fontSize: "1.0rem", fontWeight: "700", marginBottom: "10px", color: "#DFBD69" }}>WHAT WE HELP WITH:</h4>
                      <ul className="service-benefits-list" style={{ gap: "10px", marginBottom: "20px" }}>
                        {svc.whatWeHelpWith.map((item, idx) => (
                          <li key={idx} className="txt-white" style={{ fontSize: "0.95rem" }}>
                            <span className="check txt-white">✓</span> {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {svc.whoItsFor && (
                    <p className="txt-white" style={{ fontSize: "0.95rem", marginBottom: "15px", opacity: 0.9 }}>
                      <strong>WHO IT'S FOR:</strong> {svc.whoItsFor}
                    </p>
                  )}

                  {svc.expectedValue && (
                    <p className="txt-white" style={{ fontSize: "0.95rem", marginBottom: "25px", opacity: 0.9 }}>
                      <strong>EXPECTED VALUE:</strong> {svc.expectedValue}
                    </p>
                  )}

                  <Link to="/contact" className="btn-primary mt-2" style={{ display: "inline-block" }}>Get Started &rarr;</Link>
                </div>
                
                <div className="detailed-service-image-col">
                  <div className="detailed-service-image glass">
                    <img src={svc.image} alt={svc.title} className="service-actual-image" />
                  </div>
                </div>

              </div>
            </div>
          </section>
        ))}
      </div>


      {/* FAQ */}
      <section className="services-faq-section">
        <div className="container">
          <h2 className="text-center section-title">Frequently Asked Questions</h2>
          <Accordion items={faq} />
        </div>
      </section>

      {/* Styles */}
      <style>{`
        /* ── ScrollExpand Hero wrapper ── */
        .services-scroll-expand-hero {
          width: 100%;
          height: 100vh;
          position: relative;
          
          
        }

        /* ── Overlay content inside ScrollExpand ── */
        .se-overlay-content {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 18px;
          max-width: 700px;
          margin: 0 auto;
          padding: 100px 24px 0;
          color: #fff;
        }

        .se-overlay-eyebrow {
          font-size: 0.8rem;
          font-weight: 600;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: #F9C33A !important;
          margin: 0;
          text-shadow: 0 2px 10px rgba(0,0,0,0.8) !important;
        }

        .se-overlay-heading {
          font-family: var(--heading-font);
          font-size: clamp(2rem, 5vw, 3.5rem);
          font-weight: 800;
          line-height: 1.1;
          letter-spacing: -0.03em;
          margin: 0;
          color: #fff;
          text-shadow: 0 4px 16px rgba(0,0,0,0.9), 0 2px 4px rgba(0,0,0,0.9) !important;
        }

        .se-overlay-accent {
          color: #F9C33A !important;
          -webkit-text-fill-color: #F9C33A !important;
          background: none !important;
          text-shadow: 0 4px 16px rgba(0,0,0,0.9), 0 2px 4px rgba(0,0,0,0.9) !important;
        }

        .se-overlay-sub {
          font-size: 1.05rem;
          line-height: 1.65;
          color: #ffffff !important;
          margin: 0;
          max-width: 520px;
          text-align: center;
          text-shadow: 0 2px 10px rgba(0,0,0,0.9), 0 1px 3px rgba(0,0,0,0.9) !important;
        }

        .se-overlay-cta {
          display: inline-block;
          margin-top: 8px;
          padding: 14px 36px;
          background: #F9C33A !important;
          color: #000000 !important;
          font-weight: 700;
          font-size: 0.95rem;
          border-radius: 999px;
          text-decoration: none;
          letter-spacing: 0.04em;
          box-shadow: 0 8px 32px rgba(249,195,58,0.25);
          transition: transform 0.25s ease, box-shadow 0.25s ease;
        }

        .se-overlay-cta:hover {
          transform: translateY(-2px);
          background: #ffffff !important;
          color: #000000 !important;
          box-shadow: 0 12px 40px rgba(255,255,255,0.4);
        }

        /* ── end ScrollExpand Hero styles ── */

        .txt-white{
        color: white!important;
        }
        .services-hero {
          padding: 80px 0 40px;
        }
        .services-hero-title {
          font-size: 3.5rem;
          font-weight: 800;
          margin-bottom: 20px;
          color: #0f172a !important;
        }
        .services-hero-sub {
          font-size: 1.2rem;
          max-width: 600px;
          margin: 0 auto;
          color: #334155 !important;
        }
        .text-gradient {
          background: linear-gradient(134deg, #F9C33A, #b88d14);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        
        /* Detailed Services Section */
        .detailed-services-wrapper {
          padding: 60px 0;
        }
        
        .detailed-service-section {
          padding: 100px 0;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08) !important;
          background: #000000 !important;
        }
        
        .detailed-service-section:last-child {
          border-bottom: none;
        }
        
        .detailed-service-section.alt-layout {
          background: #1e2630ff !important;
        }
        
        .detailed-service-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 80px;
          align-items: center;
        }
        .alt-layout .detailed-service-grid {
          direction: rtl; /* simple trick to swap columns */
        }
        
        .alt-layout .detailed-service-content,
        .alt-layout .detailed-service-image-col {
          direction: ltr;
        }
        
        .process-step h4, .process-step p {
          position: relative;
          z-index: 2;
        }
        
        .process-step h4 {
          font-size: 1.2rem;
          font-weight: 700;
          margin-bottom: 15px;
          color: #ffffff !important;
        }
        
        .process-step p {
          color: #cccccc !important;
          line-height: 1.6;
          font-size: 0.95rem;
        }
        .service-title {
          font-size: 2.5rem;
          font-weight: 800;
          margin-bottom: 20px;
          color: #ffffff !important;
        }
        
        .service-desc {
          font-size: 1.1rem;
          line-height: 1.7;
          color: #cccccc !important;
          margin-bottom: 30px;
        }
        
        .service-benefits-list {
          list-style: none;
          margin-bottom: 40px;
          display: flex;
          flex-direction: column;
          gap: 15px;
        }
        
        .service-benefits-list li {
          display: flex;
          align-items: center;
          gap: 12px;
          font-size: 1rem;
          color: #ffffff !important;
          font-weight: 500;
        }
        
        .check {
          color: #DFBD69 !important;
          font-weight: bold;
          font-size: 1.2rem;
        }

        .detailed-service-image {
          aspect-ratio: 4/3;
          border-radius: var(--radius-lg);
          border: 1px solid rgba(255, 255, 255, 0.12) !important;
          position: relative;
          overflow: hidden;
          background: rgba(255, 255, 255, 0.05) !important;
          backdrop-filter: blur(12px) !important;
          -webkit-backdrop-filter: blur(12px) !important;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
        }
        
        .service-actual-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 0.5s ease;
        }
        
        .detailed-service-section:hover .service-actual-image {
          transform: scale(1.05);
        }
        
        .mt-4 {
          margin-top: 2rem;
        }
        .section-header {
          margin-bottom: 50px;
        }
        
        .process-section {
          padding: 100px 0;
          background: transparent !important;
        }
        
        .process-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 30px;
          position: relative;
        }
        
        .process-step {
          background: rgba(255, 255, 255, 0.05) !important;
          backdrop-filter: blur(12px) !important;
          -webkit-backdrop-filter: blur(12px) !important;
          padding: 40px 30px;
          border-radius: var(--radius-lg);
          border: 1px solid rgba(255, 255, 255, 0.12) !important;
          position: relative;
          transition: var(--transition);
          overflow: hidden;
          cursor: pointer;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
        }
        
        .process-step::before {
          content: "";
          position: absolute;
          inset: 0;
          background: linear-gradient(
              -30deg,
              transparent 60%,
              rgba(223, 189, 105, 0.15) 70%,
              transparent 80%,
              transparent 100%
          );
          background-size: 300% 300%;
          background-repeat: no-repeat;
          background-position: -100% -100%;
          transition: background-position 800ms ease;
          pointer-events: none;
          z-index: 1;
        }

        .process-step:hover::before {
          background-position: 100% 100%;
        }
        .process-step:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 30px rgba(223, 189, 105, 0.15);
          border-color: #DFBD69 !important;
        }

        .process-step h4 {
          font-size: 1.2rem;
          margin-bottom: 15px;
          color: #ffffff !important;
          position: relative;
          z-index: 2;
        }
        
        .process-step p {
          color: #cccccc !important;
          font-size: 0.95rem;
          line-height: 1.6;
          position: relative;
          z-index: 2;
        }

        .process-section .section-title {
          color: #ffffff !important;
        }

        .process-section .text-light {
          color: #cbd5e1 !important;
        }
        
        .why-choose-us {
          padding: 100px 0;
          background: linear-gradient(134deg, rgba(223, 131, 13, 0.9), rgba(110, 53, 23, 0.9), rgba(249, 195, 58, 0.9)) !important;
        }
        .why-choose-us .section-title {
          color: #ffffff !important;
        }
        .why-choose-us .text-light {
          color: #f1f5f9 !important;
        }
        
        .why-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 60px;
          align-items: center;
        }
        
        .why-list {
          list-style: none;
          margin-top: 40px;
          display: flex;
          flex-direction: column;
          gap: 25px;
        }
        
        .why-list li {
          display: flex;
          gap: 20px;
          align-items: flex-start;
        }
        
        .check-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          min-width: 30px;
          height: 30px;
          background: rgba(72, 201, 44, 0.15);
          color: var(--primary);
          border-radius: 50%;
          font-weight: bold;
          font-size: 0.9rem;
        }
        
        .why-list strong {
          display: block;
          font-size: 1.1rem;
          color: #ffffff !important;
          margin-bottom: 6px;
        }
        
        .why-list p {
          color: #e2e8f0 !important;
          font-size: 0.95rem;
          line-height: 1.5;
        }
        
        .why-image-card {
          display: grid;
          grid-template-columns: 1fr;
          gap: 30px;
          padding: 50px;
          border-radius: var(--radius-lg);
          border: 1px solid rgba(255, 255, 255, 0.25) !important;
          background: #ffffff !important;
          text-align: center;
          position: relative;
          overflow: hidden;
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
          cursor: pointer;
        }
        
        .why-image-card:hover {
          transform: translateY(-8px);
          box-shadow:
            0 10px 30px rgba(0, 0, 0, 0.1),
            0 0 20px rgba(72, 201, 44, 0.08);
          border-color: var(--primary) !important;
        }

        .why-image-card::after {
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

        .why-image-card:hover::after {
          left: 100%;
          top: 100%;
        }

        [data-theme='dark'] .why-image-card {
          background: rgba(15, 23, 42, 0.95) !important;
          border: 1px solid rgba(255, 255, 255, 0.1) !important;
        }
        
        .stat-item h3 {
          font-size: 3rem;
          font-weight: 800;
          margin-bottom: 10px;
        }
        
        .stat-item p {
          color: #334155 !important;
          font-size: 1.1rem;
          font-weight: 500;
        }
        [data-theme='dark'] .stat-item p {
          color: #cbd5e1 !important;
        }


        .services-faq-section {
          padding: 100px 0;
          background: #000000 !important;
        }
        .services-faq-section .section-title {
          color: #ffffff !important;
        }
        @media (max-width: 991px) {
          .services-scroll-expand-hero {
            height: 75vh !important;
          }
          .why-grid {
            grid-template-columns: 1fr;
            gap: 40px;
          }
          .process-grid {
            grid-template-columns: 1fr 1fr;
          }
          .detailed-service-grid, .alt-layout .detailed-service-grid {
            grid-template-columns: 1fr;
            gap: 40px;
            direction: ltr; /* Reset swap */
          }
          .service-title {
            font-size: 2rem;
          }
          .detailed-service-section {
            padding: 60px 0;
          }
          .services-list-grid {
            grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          }
        }
        @media (max-width: 768px) {
          .services-scroll-expand-hero {
            height: 65vh !important;
          }
          .se-overlay-content {
            padding: 40px 16px 0 !important;
            gap: 10px !important;
          }
          .se-overlay-heading {
            font-size: 1.6rem !important;
            margin-bottom: 4px !important;
          }
          .se-overlay-sub {
            font-size: 0.9rem !important;
            line-height: 1.5 !important;
          }
          .se-overlay-cta {
            padding: 11px 24px !important;
            font-size: 0.85rem !important;
            margin-top: 4px !important;
          }
          .service-title {
            font-size: 1.75rem;
            text-align: center;
          }
          .service-desc {
            font-size: 1rem;
            text-align: center;
          }
          .service-benefits-list {
            align-items: center;
          }
          .detailed-service-content {
            display: flex;
            flex-direction: column;
            align-items: center;
          }
          .process-section {
            padding: 60px 0;
          }
          .detailed-services-wrapper {
            padding: 30px 0;
          }
        }
        @media (max-width: 576px) {
          .process-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
};

export default Services;