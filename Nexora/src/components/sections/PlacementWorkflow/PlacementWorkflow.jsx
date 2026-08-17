import { useEffect, useRef } from "react";
import { FaUserPlus, FaFileAlt, FaChartLine, FaCalendarAlt, FaBriefcase, FaHandshake } from "react-icons/fa";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./PlacementWorkflow.css";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const PlacementWorkflow = () => {
  const sectionRef = useRef(null);
  const centerCardRef = useRef(null);

  useEffect(() => {
    // Add a short delay to ensure DOM is fully painted and heights are correct
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 150);

    const ctx = gsap.context(() => {
      let mm = gsap.matchMedia();
      
      mm.add("(min-width: 992px)", () => {
        // Center Column: slides DOWN (moves down relative to section)
        if (centerCardRef.current) {
          gsap.fromTo(centerCardRef.current, 
            { y: -200 },
            {
              y: 200,
              ease: "none",
              scrollTrigger: {
                trigger: sectionRef.current,
                start: "top bottom",
                end: "bottom top",
                scrub: 1.0, // Smooth interpolation with scroll velocity
              }
            }
          );
        }
      });
    }, sectionRef);

    return () => {
      clearTimeout(timer);
      ctx.revert();
    };
  }, []);

  const leftSteps = [
    {
      id: 1,
      number: "01",
      title: "Profile Review",
      desc: "Understand your experience, career goals, target roles, and US-market readiness.",
      icon: <FaUserPlus />
    },
    {
      id: 2,
      number: "02",
      title: "Career Profile Prep",
      desc: "Improve resume, professional positioning, and supporting career materials.",
      icon: <FaFileAlt />
    },
    {
      id: 3,
      number: "03",
      title: "Opportunity Alignment",
      desc: "Identify relevant roles and opportunities based on your background and target direction.",
      icon: <FaChartLine />
    }
  ];

  const rightSteps = [
    {
      id: 4,
      number: "04",
      title: "Application & Interview Support",
      desc: "Provide guidance through applications, mock interviews, and technical communication.",
      icon: <FaCalendarAlt />
    },
    {
      id: 5,
      number: "05",
      title: "Ongoing Guidance",
      desc: "Provide appropriate guidance and support as you navigate the US hiring process.",
      icon: <FaBriefcase />
    },
    {
      id: 6,
      number: "06",
      title: "Offer & Integration",
      desc: "Secure the best compensation package and transition smoothly into your new US role.",
      icon: <FaHandshake />
    }
  ];

  return (
    <section className="placement-process-section" ref={sectionRef}>
      <div className="container">
        <div className="section-header text-center mb-5">
          <span className="section-badge">BRIDGE TIMELINE</span>
          <h1 className="section-title text-white">The Candidate Journey</h1>
          <p className="section-subtitle text-light">
            Our structured preparation and bridge program designed to align your experience with US hiring standards.
          </p>
        </div>

        <div className="journey-grid-container">
          {/* Left Column */}
          <div className="journey-column left-column">
            {leftSteps.map((step) => (
              <div key={step.id} className="journey-card glass">
                <div className="journey-card-top">
                  <span className="step-number">{step.number}</span>
                  <span className="journey-card-icon">{step.icon}</span>
                </div>
                <h3>{step.title}</h3>
                <p>{step.desc}</p>
              </div>
            ))}
          </div>

          {/* Center Column: Scrolled Nexora Card */}
          <div className="journey-column center-column">
            <div className="journey-center-card" ref={centerCardRef}>
              <div className="sticky-glow"></div>
              <div className="sticky-card-badge">CORE PROGRAM</div>
              <h2>Nexora Career Bridge</h2>
              <p className="sticky-card-sub">Structured US Job Market Preparation</p>
              
              <ul className="sticky-card-features">
                <li>
                  <span className="check-icon">✓</span>
                  <div className="feature-text">
                    <strong>US Market Ready</strong>
                    <span>Fluency, tone, and professional presentation alignment.</span>
                  </div>
                </li>
                <li>
                  <span className="check-icon">✓</span>
                  <div className="feature-text">
                    <strong>ATS Aligned</strong>
                    <span>Resume optimized for automated screening filters.</span>
                  </div>
                </li>
                <li>
                  <span className="check-icon">✓</span>
                  <div className="feature-text">
                    <strong>STAR Interview Trained</strong>
                    <span>Structured behavioral mock prep and technical review.</span>
                  </div>
                </li>
                <li>
                  <span className="check-icon">✓</span>
                  <div className="feature-text">
                    <strong>Ongoing Mentorship</strong>
                    <span>Continuous placement support and guidance.</span>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          {/* Right Column */}
          <div className="journey-column right-column">
            {rightSteps.map((step) => (
              <div key={step.id} className="journey-card glass">
                <div className="journey-card-top">
                  <span className="step-number">{step.number}</span>
                  <span className="journey-card-icon">{step.icon}</span>
                </div>
                <h3>{step.title}</h3>
                <p>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PlacementWorkflow;
