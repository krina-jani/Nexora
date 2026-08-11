import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import GradientWaves from "../../common/GradientWaves";
import "./OurSuccessJourney.css";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const OurSuccessJourney = () => {
  const containerRef = useRef(null);
  const lineRef = useRef(null);
  const cardsRef = useRef([]);

  const journeyList = [
    {
      period: "Step 01",
      role: "Profile Review",
      company: "Discovery Call",
      desc: "Start with a diagnostic consultation. Our career advisors review your background, career goals, and US-market readiness to shape your plan."
    },
    {
      period: "Step 02",
      role: "Resume Optimization",
      company: "Profile Refinement",
      desc: "We optimize your resume and professional profiles for ATS systems, clean formatting, and US industry standards."
    },
    {
      period: "Step 03",
      role: "Opportunity Alignment",
      company: "Targeted Search",
      desc: "We help identify relevant roles and open opportunities in the US job market that match your background."
    },
    {
      period: "Step 04",
      role: "Interview & Offer Support",
      company: "Prep & Negotiation",
      desc: "We prepare you with technical and behavioral mock interviews, communication feedback, and negotiation strategies."
    }
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Animate the vertical progress line fill on scroll
      gsap.fromTo(
        lineRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          transformOrigin: "top center",
          scrollTrigger: {
            trigger: ".timeline-wrap",
            start: "top 60%",
            end: "bottom 80%",
            scrub: true
          }
        }
      );

      // 2. Animate each timeline card step-by-step as it enters viewport
      cardsRef.current.forEach((card, index) => {
        if (!card) return;

        const isLeft = index % 2 === 0;

        gsap.fromTo(
          card,
          {
            opacity: 0,
            x: isLeft ? -80 : 80,
            scale: 0.9
          },
          {
            opacity: 1,
            x: 0,
            scale: 1,
            duration: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: card,
              start: "top 80%",
              end: "top 55%",
              scrub: 1
            }
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="experience-section" ref={containerRef} id="experience" style={{ position: "relative", overflow: "hidden" }}>
      <div className="timeline-waves-container">
        <GradientWaves
          horizonColor="#000000ff"
          waveColor="#1e2630ff"
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
        />
      </div>
      <div className="experience-container container" style={{ position: "relative", zIndex: 2 }}>
        <div className="experience-intro text-center">
          <span className="section-tag">SUCCESS ROADMAP</span>
          <h2 className="experience-title">YOUR SUCCESS JOURNEY</h2>
        </div>

        <div className="timeline-wrap">
          {/* Vertical timeline line */}
          <div className="timeline-line-track">
            <div className="timeline-line-fill" ref={lineRef}></div>
          </div>

          <div className="timeline-items">
            {journeyList.map((exp, index) => (
              <div
                key={index}
                className={`timeline-item ${index % 2 === 0 ? "left" : "right"}`}
                ref={(el) => (cardsRef.current[index] = el)}
              >
                <div className="timeline-dot"></div>
                <div className="timeline-content glass">
                  <span className="timeline-period">{exp.period}</span>
                  <h3 className="timeline-role">{exp.role}</h3>
                  <h4 className="timeline-company">{exp.company}</h4>
                  <p className="timeline-desc">{exp.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurSuccessJourney;
