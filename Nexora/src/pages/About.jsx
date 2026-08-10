import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaGraduationCap, FaBriefcase, FaGlobe, FaTrophy, FaGlobeAmericas, FaUserTie, FaHandshake } from "react-icons/fa";
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
          trigger: ".about-cards-grid",
          start: "top 80%"
        },
        y: 50,
        opacity: 0,
        stagger: 0.15,
        duration: 0.8,
        ease: "power2.out"
      });

      // Why choose cards staggered reveal
      gsap.from(".why-card-item", {
        scrollTrigger: {
          trigger: ".why-cards-grid",
          start: "top 85%"
        },
        y: 40,
        opacity: 0,
        stagger: 0.2,
        duration: 0.8,
        ease: "power3.out"
      });
    }, pageRef);

    return () => ctx.revert();
  }, []);



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

      {/* Why Choose Section */}
      <section className="about-why-section">
        <div className="about-why-overlay"></div>
        <div className="container why-content-wrap">
          <h2 className="why-title">Why Choose Nexora Career?</h2>
          <p className="why-sub">
            We bridge the gap between talent and American opportunities with personalized career solutions that get results.
          </p>
          <div className="why-cards-grid">
            <div className="why-card-item">
              <div className="why-icon-wrap">
                <FaGlobeAmericas className="why-icon-svg" />
              </div>
              <h3>US Market Expertise</h3>
              <p>Deep understanding of American hiring practices and cultural expectations.</p>
            </div>
            
            <div className="why-card-item">
              <div className="why-icon-wrap">
                <FaUserTie className="why-icon-svg" />
              </div>
              <h3>End-to-End Support</h3>
              <p>From resume to relocation, we handle every step of your career transition.</p>
            </div>
            
            <div className="why-card-item">
              <div className="why-icon-wrap">
                <FaHandshake className="why-icon-svg" />
              </div>
              <h3>Success-Based Model</h3>
              <p>We only succeed when you do, with fees based on your placement success.</p>
            </div>
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
          background: linear-gradient(134deg, #df830d, #6e3517);
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
          // margin: 60px 0;
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
        /* Why Choose Section */
        .about-why-section {
          position: relative;
          padding: 120px 0;
          background-image: url('https://images.unsplash.com/photo-1550439062-609e1531270e?q=80&w=1470&auto=format&fit=crop');
          background-size: cover;
          background-position: center;
          background-attachment: fixed;
          overflow: hidden;
          z-index: 1;
        }

        .about-why-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(15, 18, 17, 0.93) 0%, rgba(223, 131, 13, 0.65) 100%);
          z-index: 2;
        }

        .why-content-wrap {
          position: relative;
          z-index: 10;
          text-align: center;
        }

        .why-title {
          font-size: 3rem;
          font-weight: 800;
          color: #ffffff;
          margin-bottom: 24px;
        }

        .why-sub {
          font-size: 1.25rem;
          color: #cbd5e1;
          margin-bottom: 60px;
          max-width: 800px;
          margin-inline: auto;
          line-height: 1.6;
        }

        .why-cards-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 30px;
        }

        .why-card-item {
          background: rgba(255, 255, 255, 0.08);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          padding: 50px 30px;
          border-radius: var(--radius-lg);
          border: 1px solid rgba(255, 255, 255, 0.15);
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
          cursor: pointer;
        }

        .why-card-item:hover {
          transform: translateY(-8px) scale(1.03);
          background: rgba(255, 255, 255, 0.15);
          border-color: rgba(255, 255, 255, 0.3);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
        }

        .why-icon-wrap {
          width: 80px;
          height: 80px;
          background: var(--primary);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 30px;
          transition: transform 0.4s ease;
        }

        .why-card-item:hover .why-icon-wrap {
          transform: rotate(12deg);
        }

        .why-icon-svg {
          font-size: 2rem;
          color: #0f1211;
        }

        .why-card-item h3 {
          font-size: 1.4rem;
          font-weight: 700;
          color: #ffffff;
          margin-bottom: 16px;
        }

        .why-card-item p {
          font-size: 0.95rem;
          color: #e2e8f0;
          line-height: 1.6;
        }

        .about-card {
          position: relative;
          overflow: hidden;
          cursor: pointer;
        }

        .about-card::after {
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

        .about-card:hover::after {
          left: 100%;
          top: 100%;
        }

        .about-card:hover {
          border-color: var(--primary) !important;
          box-shadow:
            0 0 20px rgba(72, 201, 44, 0.08),
            0 0 60px rgba(72, 201, 44, 0.05) !important;
          transform: translateY(-8px);
        }

        @media (max-width: 1024px) {
          .achievements-row {
            grid-template-columns: 1fr 1fr;
            row-gap: 40px;
          }
          .about-hero-title {
            font-size: 2.8rem;
          }
          .why-cards-grid {
            grid-template-columns: 1fr;
            gap: 24px;
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
          .about-hero-title {
            font-size: 2.2rem;
          }
          .about-hero-section {
            padding: 60px 0 40px;
          }
          .about-achievements {
            padding: 60px 0;
            background-color: #F9C33A;
          }
          .about-why-section {
            padding: 80px 0;
            background-attachment: scroll;
          }
          .why-title {
            font-size: 2.3rem;
          }
        }
      `}</style>
    </div>
  );
};

export default About;