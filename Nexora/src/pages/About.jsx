import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaGraduationCap, FaBriefcase, FaGlobe, FaTrophy, FaGlobeAmericas, FaUserTie, FaHandshake } from "react-icons/fa";
import aboutBgImage from "../assets/images/about.png";
import GradientWaves from "../components/common/GradientWaves";

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

      // Cards staggered fade-in (on page load to ensure visibility)
      gsap.from(".about-card", {
        y: 50,
        // opacity: 0,
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
    }, pageRef);

    return () => ctx.revert();
  }, []);

  const timelineEvents = [
    { year: "2022", title: "Nexora Founded", desc: "Started with a vision to connect local engineering talent with remote global startups." },
    { year: "2023", title: "Scale to 1000+ Placements", desc: "Expanded training pathways and launched our proprietary mock-interview simulator." },
    { year: "2024", title: "Global Relocation Channel", desc: "Partnered with EU and US staffing hubs to assist developers in relocation visas." },
    { year: "2025", title: "AI Learning Integration", desc: "Embedded custom AI-feedback bots to review portfolio projects in real-time." }
  ];

  const team = [
    { name: "Vikram Sen", role: "Founder & CEO", company: "Ex-Google", img: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=300&q=80" },
    { name: "Alisha Roy", role: "Head of Placement", company: "Ex-Deloitte HR", img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80" },
    { name: "Kunal Gupta", role: "Lead Tech Mentor", company: "Ex-Amazon SDE", img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=300&q=80" }
  ];

  return (
    <div ref={pageRef} className="about-page-wrapper overflow-hidden" style={{ background: "#000000" }}>
      <div 
        className="about-hero-story-wrapper"
        style={{ 
          backgroundImage: `url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1920&auto=format&fit=crop')`, 
          backgroundSize: 'cover', 
          backgroundPosition: 'center', 
          backgroundRepeat: 'no-repeat',
          position: 'relative',
          padding: '120px 0'
        }}
      >

        {/* Story & Vision & Hero combined */}
        <section className="about-story-section overflow-hidden" style={{ position: "relative", zIndex: 2 }}>
          <div className="container about-grid-two-column">
            {/* Left Column: Hero Content */}
            <div className="about-hero-content-left">
              <h1 className="about-hero-title">
                <span>Building Excellence </span> <br />
                <span className="sk">Through Innovation</span>
              </h1>
              <p className="about-hero-sub text-light">
                We bridge the gap between skilled individuals and international opportunity hubs.
              </p>
            </div>

            {/* Right Column: Cards */}
            <div className="about-cards-grid-stacked">
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
          </div>
        </section>
      </div>

      {/* Stats/Achievements */}
      <section className="about-achievements overflow-hidden">
        <div className="container">
          <h2 className="text-center section-title">Key Milestones</h2>
          <div className="achievements-row">
            <div className="ach-item glass">
              <FaGraduationCap className="ach-icon" />
              <h3>5000+</h3>
              <p>Graduates Coached</p>
            </div>
            <div className="ach-item glass">
              <FaBriefcase className="ach-icon" />
              <h3>250+</h3>
              <p>Hiring Partners</p>
            </div>
            <div className="ach-item glass">
              <FaGlobe className="ach-icon" />
              <h3>20+</h3>
              <p>Countries Reached</p>
            </div>
            <div className="ach-item glass">
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
            <div className="why-card-item glass">
              <div className="why-icon-wrap">
                <FaGlobeAmericas className="why-icon-svg" />
              </div>
              <h3>US Market Expertise</h3>
              <p>Deep understanding of American hiring practices and cultural expectations.</p>
            </div>
            
            <div className="why-card-item glass">
              <div className="why-icon-wrap">
                <FaUserTie className="why-icon-svg" />
              </div>
              <h3>End-to-End Support</h3>
              <p>From resume to relocation, we handle every step of your career transition.</p>
            </div>
            
            <div className="why-card-item glass">
              <div className="why-icon-wrap">
                <FaHandshake className="why-icon-svg" />
              </div>
              <h3>Success-Based Model</h3>
              <p>We only succeed when you do, with fees based on your placement success.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline 
      <section className="about-timeline-section overflow-hidden">
        <div className="container">
          <h2 className="text-center section-title">Our Growth Timeline</h2>
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
      */}

      {/* Team 
      <section className="about-team-section overflow-hidden">
        <div className="container">
          <h2 className="text-center section-title">Meet The Experts</h2>
          <div className="team-grid">
            {team.map((member, idx) => (
              <div key={idx} className="team-card glass text-center">
                <img src={member.img} alt={member.name} className="team-avatar" />
                <h3>{member.name}</h3>
                <p className="team-role">{member.role}</p>
                <p className="team-company">{member.company}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      */}

      {/* Styles inline helpers for uniqueness */}
      <style>{`
        .about-story-section {
          padding: 60px 0px;
        }
        .about-grid-two-column {
          display: grid;
          grid-template-columns: 1.1fr 0.9fr;
          gap: 50px;
          align-items: center;
        }

        .sk{
          color: #DFBD69;
        }
        .about-hero-content-left {
          text-align: left;
        }
        .about-hero-title {
          font-size: 3.8rem;
          font-weight: 800;
          line-height: 1.2;
          margin-bottom: 20px;
          text-shadow: 0 4px 12px rgba(0, 0, 0, 0.9);
        }
        .about-hero-title span {
          display: inline-block;
          color: #ffffff;
        }
        .about-hero-sub {
          color: #ffffff !important;
          font-weight: 600;
          font-size: 1.25rem;
          max-width: 600px;
          margin: 0;
          text-shadow: 0 2px 8px rgba(0, 0, 0, 0.9);
        }
        .text-gradient {
          background:#DFBD69;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .about-cards-grid-stacked {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 30px;
          margin-top: 0;
        }
        .about-card {
          width: 100%;
          max-width: 650px;
          padding: 35px;
          border-radius: var(--radius-lg);
          border: 1px solid rgba(255, 255, 255, 0.12) !important;
          background: rgba(255, 255, 255, 0.05) !important;
          backdrop-filter: blur(12px) !important;
          -webkit-backdrop-filter: blur(12px) !important;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.25);
        }
        .about-card h2 {
          font-size: 1.8rem;
          margin-bottom: 20px;
          color: #ffffff !important;
        }
        .about-card p {
          color: #cccccc !important;
          line-height: 1.6;
        }
        .about-achievements {
          background: #1e2630ff !important;
          padding: 100px 0;
        }
        .section-title {
          font-size: 2.5rem;
          margin-bottom: 50px;
          color: #ffffff !important;
          font-weight: 700;
        }
        .achievements-row {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 30px;
          text-align: center;
        }
        .ach-item {
          background: rgba(255, 255, 255, 0.05) !important;
          border-radius: var(--radius-md);
          border: 1px solid rgba(255, 255, 255, 0.12) !important;
          padding: 45px 20px;
          overflow: hidden;
          position: relative;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          cursor: pointer;
          backdrop-filter: blur(12px) !important;
          -webkit-backdrop-filter: blur(12px) !important;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
        }
        
        .ach-item::before {
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
        
        .ach-item:hover::before {
          background-position: 100% 100%;
        }

        .ach-icon {
          font-size: 3rem;
          color: #DFBD69 !important;
          margin-bottom: 20px;
          position: relative;
          z-index: 2;
        }
        .ach-item h3 {
          font-size: 2.4rem;
          font-weight: 700;
          margin-bottom: 8px;
          position: relative;
          z-index: 2;
          color: #ffffff !important;
        }
        .ach-item p {
          position: relative;
          z-index: 2;
          color: #cccccc !important;
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
          background: rgba(255, 251, 251, 0);
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
          text-shadow: 0 4px 12px rgba(0, 0, 0, 0.8);
        }

        .why-sub {
          font-size: 1.25rem;
          color: #ffffff;
          margin-bottom: 60px;
          max-width: 800px;
          margin-inline: auto;
          line-height: 1.6;
          text-shadow: 0 2px 8px rgba(0, 0, 0, 0.8);
        }

        .why-cards-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 30px;
        }

        .why-card-item {
          background: rgba(255, 255, 255, 0.05) !important;
          backdrop-filter: blur(12px) !important;
          -webkit-backdrop-filter: blur(12px) !important;
          padding: 50px 30px;
          border-radius: var(--radius-lg);
          border: 1px solid rgba(255, 255, 255, 0.12) !important;
          overflow: hidden;
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
          cursor: pointer;
        }

        .why-card-item:hover {
          transform: translateY(-8px) scale(1.03);
          border-color: #DFBD69 !important;
          box-shadow: 
            0 0 20px rgba(223, 189, 105, 0.15),
            0 0 60px rgba(223, 189, 105, 0.08) !important;
        }

        .why-icon-wrap {
          width: 80px;
          height: 80px;
          background: #DFBD69 !important;
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
          color: #000000 !important;
        }

        .why-card-item h3 {
          font-size: 1.4rem;
          font-weight: 700;
          color: #ffffff;
          margin-bottom: 16px;
        }

        .why-card-item p {
          font-size: 0.95rem;
          color: #cccccc;
          line-height: 1.6;
        }

        .about-timeline-section {
          padding: 100px 0;
          background-color: #000000 !important;
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
          gap: 25px;
          align-items: center;
        }
        .timeline-badge {
          background: #DFBD69 !important;
          color: #000000 !important;
          font-weight: 700;
          padding: 8px 18px;
          border-radius: var(--radius-full);
          font-size: 0.95rem;
          box-shadow: 0 0 15px rgba(223, 189, 105, 0.3);
        }
        .timeline-card {
          flex: 1;
          padding: 28px;
          border-radius: var(--radius-sm);
          border: 1px solid rgba(255, 255, 255, 0.12) !important;
          background: rgba(255, 255, 255, 0.05) !important;
          backdrop-filter: blur(12px) !important;
          -webkit-backdrop-filter: blur(12px) !important;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
        }
        .timeline-card h3 {
          font-size: 1.35rem;
          margin-bottom: 8px;
          color: #ffffff !important;
        }
        .timeline-card p {
          color: #cccccc !important;
        }
        .about-team-section {
          padding: 100px 0;
          background: #1e2630ff !important;
        }
        .team-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 40px;
        }
        .team-card {
          padding: 45px 25px;
          border-radius: var(--radius-lg);
          border: 1px solid rgba(255, 255, 255, 0.12) !important;
          background: rgba(255, 255, 255, 0.05) !important;
          backdrop-filter: blur(12px) !important;
          -webkit-backdrop-filter: blur(12px) !important;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
        }
        .team-card h3 {
          color: #ffffff !important;
          font-size: 1.4rem;
        }
        .team-avatar {
          width: 120px;
          height: 120px;
          border-radius: 50%;
          object-fit: cover;
          margin: 0 auto 20px;
          border: 3px solid #DFBD69 !important;
        }
        .team-role {
          font-weight: 600;
          color: #DFBD69 !important;
          margin-top: 8px;
        }
        .team-company {
          font-size: 0.9rem;
          color: #cccccc !important;
          margin-top: 4px;
        }

        .about-card, .timeline-card, .team-card {
          position: relative;
          overflow: hidden;
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
          cursor: pointer;
        }

        .about-card::after, .timeline-card::after, .team-card::after {
          content: '';
          position: absolute;
          top: -150%;
          left: -150%;
          width: 250%;
          height: 250%;
          background: linear-gradient(
            120deg,
            transparent 35%,
            rgba(255, 255, 255, 0.1) 50%,
            transparent 65%
          );
          transform: rotate(25deg);
          transition: all 1s ease;
          pointer-events: none;
          z-index: 1;
        }

        .about-card:hover::after, .timeline-card:hover::after, .team-card:hover::after {
          left: 100%;
          top: 100%;
        }

        .about-card:hover, .timeline-card:hover, .team-card:hover {
          border-color: #DFBD69 !important;
          box-shadow:
            0 0 20px rgba(223, 189, 105, 0.15),
            0 0 60px rgba(223, 189, 105, 0.08) !important;
          transform: translateY(-8px);
        }

        @media (max-width: 1024px) {
          .achievements-row {
            grid-template-columns: 1fr 1fr;
            row-gap: 40px;
          }
          .team-grid {
            grid-template-columns: 1fr 1fr;
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
          .achievements-row, .team-grid {
            grid-template-columns: 1fr;
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
            padding: 80px 0 40px;
          }
          .about-achievements, .about-timeline-section, .about-team-section {
            padding: 60px 0;
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