import { useEffect, useRef } from "react";
import gsap from "gsap";
import industries from "../data/industries";
import { Link } from "react-router-dom";

const Industries = () => {
  const pageRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero entrance
      gsap.from(".ind-hero-title", {
        y: 60,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out"
      });

      // Cards staggered reveal
      gsap.from(".industry-card", {
        scrollTrigger: {
          trigger: ".industries-grid",
          start: "top 80%"
        },
        y: 40,
        opacity: 0,
        stagger: 0.08,
        duration: 0.8,
        ease: "power2.out"
      });

      // Case studies slide in
      gsap.from(".case-study-card", {
        scrollTrigger: {
          trigger: ".case-studies-section",
          start: "top 75%"
        },
        x: -50,
        opacity: 0,
        stagger: 0.15,
        duration: 0.8,
        ease: "power2.out"
      });
    }, pageRef);

    return () => ctx.revert();
  }, []);

  const caseStudies = [
    {
      title: "Transition to Fintech SDE",
      student: "Arjun Mehta",
      details: "Switched from a traditional chemical engineering role to a Senior Java developer position at a top-tier European fintech firm.",
      package: "€78,000 / Year",
      badge: "Fintech Switch"
    },
    {
      title: "AI Researcher Placement",
      student: "Sara Vance",
      details: "Guided a graduate student through research paper presentation and advanced ML coding mock loops, landing an offer in Silicon Valley.",
      package: "$145,000 / Year",
      badge: "AI & Data Science"
    }
  ];

  return (
    <div ref={pageRef} className="industries-page-wrapper">
      {/* Hero */}
      <section className="industries-hero text-center">
        <div className="container">
          <h1 className="ind-hero-title">
            Global Placement <span className="text-gradient">By Industry</span>
          </h1>
          <p className="ind-hero-sub text-light">
            We support career trajectories across massive global domains. Our mentors specialize in training for specific technical interviews.
          </p>
        </div>
      </section>

      {/* Industry Grid */}
      <section className="industries-grid-section">
        <div className="container">
          <div className="industries-grid">
            {industries.map((ind) => (
              <div key={ind.id} className="industry-card glass">
                <div className="ind-dot-accent"></div>
                <h3>{ind.title}</h3>
                <p>{ind.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Case Studies */}
      <section className="case-studies-section">
        <div className="container">
          <h2 className="text-center section-title">Domain Switch Success Stories</h2>
          <div className="case-studies-grid">
            {caseStudies.map((cs, idx) => (
              <div key={idx} className="case-study-card glass">
                <span className="case-badge">{cs.badge}</span>
                <h3>{cs.title}</h3>
                <p className="case-student">Candidate: <strong>{cs.student}</strong></p>
                <p className="case-text">{cs.details}</p>
                <div className="case-footer">
                  <span className="case-pkg">Compensation: {cs.package}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Global CTA */}
      <section className="ind-cta-section text-center">
        <div className="container ind-cta-box glass">
          <h2>Ready to switch your industry?</h2>
          <p>
            Book a 1-on-1 diagnostic call with our specialists. We'll map your transferable skills and build your personalized transition roadmap.
          </p>
          <Link to="/contact" className="btn-primary">
            Schedule Diagnostic Session
          </Link>
        </div>
      </section>

      {/* Styles */}
      <style>{`
        .industries-hero {
          padding: 80px 0 40px;
        }
        .ind-hero-title {
          font-size: 3.5rem;
          font-weight: 800;
          margin-bottom: 20px;
        }
        .ind-hero-sub {
          font-size: 1.2rem;
          max-width: 600px;
          margin: 0 auto;
        }
        .text-gradient {
          background: linear-gradient(90deg, var(--primary), var(--primary-light));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .industries-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 24px;
          margin-top: 40px;
        }
        .industry-card {
          padding: 30px 24px;
          border-radius: var(--radius-md);
          border: 1px solid var(--border);
          position: relative;
          transition: var(--transition);
        }
        .industry-card:hover {
          border-color: var(--primary);
          transform: translateY(-4px);
          box-shadow: var(--shadow-md);
        }
        .ind-dot-accent {
          width: 8px;
          height: 8px;
          background: var(--primary-light);
          border-radius: 50%;
          margin-bottom: 16px;
        }
        .industry-card h3 {
          font-size: 1.15rem;
          font-weight: 700;
          margin-bottom: 10px;
          color: var(--heading);
        }
        .industry-card p {
          font-size: 0.9rem;
          line-height: 1.5;
          color: var(--text);
        }
        .case-studies-section {
          padding: 100px 0;
          background: var(--bg-soft);
          margin-top: 80px;
        }
        .case-studies-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 40px;
          margin-top: 40px;
        }
        .case-study-card {
          padding: 40px;
          border-radius: var(--radius-lg);
          border: 1px solid var(--border);
          background: var(--white);
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        .case-badge {
          align-self: flex-start;
          background: var(--accent);
          color: var(--primary-dark);
          padding: 4px 12px;
          border-radius: var(--radius-full);
          font-size: 0.8rem;
          font-weight: 600;
        }
        .case-study-card h3 {
          font-size: 1.4rem;
          font-weight: 700;
        }
        .case-student {
          font-size: 0.95rem;
          color: var(--text-light);
        }
        .case-text {
          font-size: 1rem;
          line-height: 1.6;
        }
        .case-footer {
          margin-top: auto;
          padding-top: 20px;
          border-top: 1px solid var(--border);
        }
        .case-pkg {
          font-weight: 700;
          color: var(--primary-dark);
        }
        .ind-cta-section {
          padding: 100px 0;
        }
        .ind-cta-box {
          padding: 60px 40px;
          border-radius: var(--radius-lg);
          border: 1px solid var(--border);
          max-width: 900px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 20px;
        }
        .ind-cta-box h2 {
          font-size: 2rem;
          font-weight: 700;
        }
        .ind-cta-box p {
          max-width: 600px;
          color: var(--text);
          line-height: 1.6;
        }
        @media (max-width: 991px) {
          .industries-grid {
            grid-template-columns: repeat(2, 1fr);
          }
          .case-studies-grid {
            grid-template-columns: 1fr;
          }
        }
        @media (max-width: 576px) {
          .industries-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
};

export default Industries;