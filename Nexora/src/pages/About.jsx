import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaGraduationCap, FaBriefcase, FaGlobe, FaTrophy } from "react-icons/fa";
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
    <div ref={pageRef} className="about-page-wrapper overflow-hidden">
      <div 
        className="about-hero-story-wrapper"
        style={{ 
          backgroundImage: `url(${aboutBgImage})`, 
          backgroundSize: '100% 100%', 
          backgroundPosition: 'center', 
          backgroundRepeat: 'no-repeat',
          position: 'relative'
        }}
      >
        {/* Hero */}
        <section className="about-hero-section overflow-hidden">
          <div className="container" style={{ textAlign: 'right' }}>
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

      {/* Team */}
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
        .about-hero-sub {
        color: #252424;
        font-weight: 600;
          font-size: 1.2rem;
          max-width: 600px;
          margin: 0 0 0 auto;
        }
        .text-gradient {
          // background: linear-gradient(90deg, var(--primary), var(--primary-light));
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
        .about-team-section {
          padding: 80px 0;
          background: linear-gradient(134deg, rgba(223, 131, 13, 0.9), rgba(110, 53, 23, 0.9), rgba(249, 195, 58, 0.9));
        }
        .team-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 40px;
        }
        .team-card {
          padding: 40px 20px;
          border-radius: var(--radius-lg);
          border: 1px solid rgba(255, 255, 255, 0.25);
          background: rgba(255, 255, 255, 1) !important;
          box-shadow: var(--shadow-sm);
        }
        .team-card h3 {
          color: #0f172a !important;
        }
        [data-theme='dark'] .team-card h3 {
          color: #f8fafc !important;
        }
        .team-avatar {
          width: 120px;
          height: 120px;
          border-radius: 50%;
          object-fit: cover;
          margin: 0 auto 20px;
          border: 3px solid var(--primary-light);
        }
        .team-role {
          font-weight: 600;
          color: #1e3a8a !important; /* Rich blue for contrast */
          margin-top: 8px;
        }
        .team-company {
          font-size: 0.9rem;
          color: #475569 !important;
        }
        [data-theme='dark'] .team-role {
          color: var(--primary-light) !important;
        }
        [data-theme='dark'] .team-company {
          color: #cbd5e1 !important;
        }

        .about-card, .timeline-card, .team-card {
          position: relative;
          overflow: hidden;
          // transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
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
            rgba(72, 201, 44, 0.15) 50%,
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
          .team-grid {
            grid-template-columns: 1fr 1fr;
          }
          .about-hero-title {
            font-size: 2.8rem;
          }
        }
        
        @media (max-width: 768px) {
          .about-cards-grid-stacked {
            align-items: center;
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
            padding: 40px 0;
          }
          .about-achievements, .about-timeline-section, .about-team-section {
            padding: 60px 0;
            background-color: #F9C33A;
            
          }
        }
      `}</style>
    </div>
  );
};

export default About;