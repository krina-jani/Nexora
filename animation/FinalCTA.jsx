import { useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import "./FinalCTA.css";

gsap.registerPlugin(ScrollTrigger);

const FinalCTA = ({
  heading = "Ready to Explore Your Next Career Move?",
  scrollText,
  bgTextLine1,
  bgTextLine2,
  subheading = "Join ambitious professionals who have optimized their profiles and navigated the US hiring process with our support.",
  primaryBtnText = "Start Career Consultation",
  primaryBtnLink = "/contact",
  secondaryBtnText = "Explore Services",
  secondaryBtnLink = "/services"
}) => {
  const sectionRef = useRef(null);
  const textTrackRef = useRef(null);
  const contentRef = useRef(null);

  // Compute display kinetic text
  const displayScrollText =
    scrollText ||
    (bgTextLine1 && bgTextLine2 ? `${bgTextLine1} • ${bgTextLine2}` : null) ||
    bgTextLine1 ||
    bgTextLine2 ||
    "DISCOVER OPPORTUNITIES • STAND OUT WITH NEXORA CAREER";

  useGSAP(
    () => {
      const section = sectionRef.current;
      const textTrack = textTrackRef.current;
      const content = contentRef.current;

      if (!section || !textTrack || !content) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=140%",
          pin: true,
          pinSpacing: true,
          scrub: 0.8,
          anticipatePin: 1,
          refreshPriority: 1,
          invalidateOnRefresh: true,
        },
      });

      // 1. Horizontal text track glides smoothly from right (75%) to left (-75%) during scroll pin
      tl.fromTo(
        textTrack,
        { xPercent: 75 },
        {
          xPercent: -75,
          ease: "none",
          duration: 1,
        },
        0
      );

      // 2. Foreground content illuminates cleanly into focus
      tl.fromTo(
        content,
        { opacity: 0.5, y: 30, scale: 0.96 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          ease: "power2.out",
          duration: 0.4,
        },
        0.1
      );
    },
    { scope: sectionRef, dependencies: [displayScrollText, heading] }
  );

  return (
    <section ref={sectionRef} className="kinetic-cta-section">
      {/* Top flow connector line */}
      <div className="kinetic-top-line"></div>

      {/* Ambient Radial Glow */}
      <div className="kinetic-cta-glow"></div>

      {/* Oversized Pinned Horizontal Scroll Motion Text */}
      <div className="kinetic-text-wrapper">
        <div ref={textTrackRef} className="kinetic-text-track">
          <h2 className="kinetic-text">{displayScrollText}</h2>
        </div>
      </div>

      {/* Single Cohesive Foreground Content Container */}
      <div ref={contentRef} className="kinetic-content-box">
        <span className="kinetic-badge">CAREER TRANSITION BRIDGE</span>
        {heading && <h2 className="kinetic-heading">{heading}</h2>}
        {subheading && <p className="kinetic-actions-sub">{subheading}</p>}
        <div className="kinetic-actions-buttons">
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




