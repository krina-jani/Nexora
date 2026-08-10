import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
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
      role: "Connect With Us",
      company: "Discovery Call",
      desc: "Start with a discovery call. Our career counselors review your background, career goals, and target roles to shape your plan."
    },
    {
      period: "Step 02",
      role: "Resume Enhancement",
      company: "Profile Makeover",
      desc: "Our certified professional resume writers rebuild your resume with ATS optimization, clean formatting, and a matching cover letter."
    },
    {
      period: "Step 03",
      role: "Strategic Applications",
      company: "Network Outreach",
      desc: "We apply to relevant companies on your behalf, using our recruiter network and real hiring market insight."
    },
    {
      period: "Step 04",
      role: "Interview & Success",
      company: "Offer Negotiation",
      desc: "We prepare you with mock interviews, negotiation coaching, and support until you accept the right offer."
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
    <section className="experience-section" ref={containerRef} id="experience">
      <div className="experience-container container">
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
