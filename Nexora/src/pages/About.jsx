import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaGraduationCap, FaBriefcase, FaGlobe, FaTrophy } from "react-icons/fa";

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
    <div ref={pageRef} className="about-page-wrapper">
      {/* Hero */}
      <section className="about-hero-section text-center">
        <div className="container">
          <h1 className="about-hero-title">
            <span>Redefining Global</span> <br />
            <span className="text-gradient">Career Navigation</span>
          </h1>
          <p className="about-hero-sub text-light">
            We bridge the gap between skilled individuals and international opportunity hubs.
          </p>
        </div>
      </section>

      {/* Story & Vision */}
      <section className="about-story-section">
        <div className="container about-cards-grid">
          <div className="about-card glass">
            <h2>Our Story</h2>
            <p>
              Nexora Career was established by a group of industry professionals who recognized that talent is distributed globally, but opportunities are often localized. We set out to level the playing field by preparing candidates for rigorous international standards.
            </p>
          </div>
          <div className="about-card glass">
            <h2>Our Vision & Mission</h2>
            <p>
              To create a borderless ecosystem where top talent can land their dream careers regardless of geographic coordinates. We aim to equip 100,000+ professionals with premium career skills by 2030.
            </p>
          </div>
        </div>
      </section>

      {/* Stats/Achievements */}
      <section className="about-achievements">
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

      {/* Team */}
      <section className="about-team-section">
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
        }
        .about-hero-sub {
          font-size: 1.2rem;
          max-width: 600px;
          margin: 0 auto;
        }
        .text-gradient {
          background: linear-gradient(90deg, var(--primary), var(--primary-light));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .about-cards-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 40px;
          margin-top: 40px;
        }
        .about-card {
          padding: 40px;
          border-radius: var(--radius-lg);
          border: 1px solid var(--border);
        }
        .about-card h2 {
          font-size: 1.8rem;
          margin-bottom: 20px;
          color: var(--heading);
        }
        .about-card p {
          color: var(--text);
          line-height: 1.6;
        }
        .about-achievements {
          background: var(--bg-soft);
          padding: 80px 0;
          margin: 60px 0;
        }
        .section-title {
          font-size: 2.2rem;
          margin-bottom: 50px;
        }
        .achievements-row {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 30px;
          text-align: center;
        }
        .ach-icon {
          font-size: 2.5rem;
          color: var(--primary);
          margin-bottom: 15px;
        }
        .ach-item h3 {
          font-size: 2rem;
          font-weight: 700;
          margin-bottom: 8px;
        }
        .about-timeline-section {
          padding: 80px 0;
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
          border: 1px solid var(--border);
        }
        .timeline-card h3 {
          font-size: 1.25rem;
          margin-bottom: 8px;
        }
        .about-team-section {
          padding: 80px 0;
        }
        .team-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 40px;
        }
        .team-card {
          padding: 40px 20px;
          border-radius: var(--radius-lg);
          border: 1px solid var(--border);
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
          color: var(--primary-dark);
          margin-top: 8px;
        }
        .team-company {
          font-size: 0.9rem;
          color: var(--text-light);
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
          .about-cards-grid, .achievements-row, .team-grid {
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
          }
        }
      `}</style>
    </div>
  );
};

export default About;