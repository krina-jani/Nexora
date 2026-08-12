import { useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import "./FinalCTA.css";

gsap.registerPlugin(ScrollTrigger);

const FinalCTA = ({
  heading = "Ready to Explore Your Next Career Move?",
  subheading = "Join ambitious professionals who have optimized their profiles and navigated the US hiring process with our support.",
  primaryBtnText = "Start Career Consultation",
  primaryBtnLink = "/contact",
  secondaryBtnText = "Explore Services",
  secondaryBtnLink = "/services"
}) => {
  const sectionRef = useRef(null);
  const containerRef = useRef(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      const container = containerRef.current;

      if (!section || !container) return;

      gsap.fromTo(
        container,
        { opacity: 0, y: 35, scale: 0.96 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 85%",
          },
        }
      );
    },
    { scope: sectionRef, dependencies: [heading, subheading] }
  );

  return (
    <section ref={sectionRef} className="final-cta-section">
      <div className="final-cta-glow"></div>
      <div ref={containerRef} className="final-cta-container">
        <span className="final-cta-badge">CAREER TRANSITION BRIDGE</span>
        {heading && <h2 className="final-cta-heading">{heading}</h2>}
        {subheading && <p className="final-cta-subheading">{subheading}</p>}
        <div className="final-cta-buttons">
          {primaryBtnText && primaryBtnLink && (
            <Link to={primaryBtnLink} className="cta-btn-gold">
              {primaryBtnText}
            </Link>
          )}
          {secondaryBtnText && secondaryBtnLink && (
            <Link to={secondaryBtnLink} className="cta-btn-glass">
              {secondaryBtnText}
            </Link>
          )}
        </div>
      </div>
    </section>
  );
};

export default FinalCTA;





