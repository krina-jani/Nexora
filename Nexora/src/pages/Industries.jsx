import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import industries from "../data/industries";
import { Link } from "react-router-dom";

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

const Industries = () => {
  const pageRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero entrance
      gsap.fromTo(".ind-hero-title", 
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
      );

      // Cards staggered reveal
      gsap.fromTo(".industry-card", 
        { y: 40, opacity: 0 },
        {
          scrollTrigger: {
            trigger: ".industries-grid",
            start: "top 80%"
          },
          y: 0,
          opacity: 1,
          stagger: 0.08,
          duration: 0.8,
          ease: "power2.out"
        }
      );

      // Case studies slide in
      gsap.fromTo(".case-study-card", 
        { x: -50, opacity: 0 },
        {
          scrollTrigger: {
            trigger: ".case-studies-section",
            start: "top 75%"
          },
          x: 0,
          opacity: 1,
          stagger: 0.15,
          duration: 0.8,
          ease: "power2.out"
        }
      );
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
                <p className="ind-desc">{ind.description}</p>
                
                <div className="ind-details">
                  <div className="ind-roles">
                    <h4>Popular Roles</h4>
                    <ul>
                      {ind.roles?.map((role, i) => (
                        <li key={i}>{role}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="ind-skills">
                    <h4>Skills</h4>
                    <div className="skill-tags">
                      {ind.skills?.map((skill, i) => (
                        <span key={i} className="skill-tag">{skill}</span>
                      ))}
                    </div>
                  </div>
                </div>
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
          <h2 className="ind-cta-heading">
            <Typewriter 
              texts={[
                "Ready to switch your industry?",
                "Explore new career horizons.",
              ]} 
            />
          </h2>
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
        .ind-cta-heading {
          min-height: 80px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 15px;
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

        .industries-hero {
          padding: 80px 0 40px;
        }
          .industries-grid-section{
          margin-top:-138px;
          margin-bottom: -139px;
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
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          gap: 30px;
          margin-top: 40px;
        }
        .industry-card {
          padding: 30px 24px;
          border-radius: var(--radius-md);
          border: 1px solid var(--border);
          position: relative;
          transition: var(--transition);
          display: flex;
          flex-direction: column;
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
          font-size: 1.25rem;
          font-weight: 700;
          margin-bottom: 12px;
          color: var(--heading);
        }
        .industry-card .ind-desc {
          font-size: 0.95rem;
          line-height: 1.6;
          color: var(--text);
          margin-bottom: 24px;
        }
        .ind-details {
          margin-top: auto;
          display: flex;
          flex-direction: column;
          gap: 20px;
          padding-top: 20px;
          border-top: 1px solid var(--border);
        }
        .ind-roles h4, .ind-skills h4 {
          font-size: 0.9rem;
          font-weight: 600;
          color: var(--heading);
          margin-bottom: 10px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        .ind-roles ul {
          list-style: none;
          padding: 0;
          margin: 0;
        }
        .ind-roles li {
          font-size: 0.9rem;
          color: var(--text);
          margin-bottom: 6px;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .ind-roles li::before {
          content: '•';
          color: var(--primary);
          font-weight: bold;
        }
        .skill-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }
        .skill-tag {
          font-size: 0.8rem;
          background: var(--bg-soft);
          color: var(--text);
          padding: 4px 10px;
          border-radius: 4px;
          border: 1px solid var(--border);
          font-weight: 500;
        }
        .case-studies-section {
          padding: 100px 0;
          background: var(--bg-soft);
          background-color: #c7ffd6;
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