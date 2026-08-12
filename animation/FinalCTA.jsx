import { useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import "./FinalCTA.css";

gsap.registerPlugin(ScrollTrigger);

const FinalCTA = ({
  scrollText = "So, are you ready to stand out?",
  subheading = "Join ambitious professionals who have optimized their profiles and navigated the US hiring process with our support.",
  primaryBtnText = "Start Career Consultation",
  primaryBtnLink = "/contact",
  secondaryBtnText = "Explore Services",
  secondaryBtnLink = "/services"
}) => {
  const sectionRef = useRef(null);
  const textTrackRef = useRef(null);
  const actionsRef = useRef(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      const textTrack = textTrackRef.current;
      const actions = actionsRef.current;

      if (!section || !textTrack || !actions) return;

      // Master Pinned ScrollTrigger Timeline matching DZ!NR
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=160%",
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          refreshPriority: 1,
          invalidateOnRefresh: true,
        },
      });

      // 1. Text track glides from 100% off-screen right to -100% off-screen left
      tl.fromTo(
        textTrack,
        { xPercent: 100 },
        {
          xPercent: -100,
          ease: "none",
          duration: 1,
        },
        0
      );

      // 2. Action buttons & subtitle fade up smoothly in the middle of the scroll reveal
      tl.fromTo(
        actions,
        { opacity: 0, y: 40, scale: 0.92 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          ease: "power2.out",
          duration: 0.45,
        },
        0.4
      );
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} className="kinetic-cta-section">
      {/* Background Radial Glow */}
      <div className="kinetic-cta-glow"></div>

      {/* Oversized Horizontal Scroll Text Reveal (Single Continuous Line like DZ!NR) */}
      <div className="kinetic-text-wrapper">
        <div ref={textTrackRef} className="kinetic-text-track">
          <h2 className="kinetic-text">{scrollText}</h2>
        </div>
      </div>

      {/* Action Buttons & Subheading (Reveals cleanly during scroll) */}
      <div ref={actionsRef} className="kinetic-actions-container">
        <p className="kinetic-actions-sub">{subheading}</p>
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
