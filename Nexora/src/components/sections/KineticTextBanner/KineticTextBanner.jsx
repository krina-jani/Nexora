import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import "./KineticTextBanner.css";

gsap.registerPlugin(ScrollTrigger);

const KineticTextBanner = ({
  text = "BUILD YOUR CAREER • WITH NEXORA CAREER • US HIRING STANDARDS • PROFILE OPTIMIZATION"
}) => {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      const track = trackRef.current;

      if (!section || !track) return;

      // Smooth unpinned fluid horizontal movement as user scrolls past the banner
      gsap.fromTo(
        track,
        { xPercent: 10 },
        {
          xPercent: -40,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top 95%",
            end: "bottom 5%",
            scrub: 1,
          },
        }
      );
    },
    { scope: sectionRef, dependencies: [text] }
  );

  return (
    <section ref={sectionRef} className="normal-kinetic-banner">
      <div className="kinetic-banner-line-top"></div>
      <div className="kinetic-banner-glow"></div>
      <div className="kinetic-banner-track-wrapper">
        <div ref={trackRef} className="kinetic-banner-track">
          <span className="kinetic-banner-text">{text}</span>
          <span className="kinetic-banner-text">{text}</span>
        </div>
      </div>
      <div className="kinetic-banner-line-bottom"></div>
    </section>
  );
};

export default KineticTextBanner;
