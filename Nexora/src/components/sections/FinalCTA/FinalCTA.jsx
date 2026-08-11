import { useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import "./FinalCTA.css";

gsap.registerPlugin(ScrollTrigger);

const FinalCTA = () => {
  const sectionRef = useRef(null);
  const bgTextRef = useRef(null);
  const ctaBoxRef = useRef(null);
  const ctaContentRef = useRef(null);
  const glowRef = useRef(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      const bgText = bgTextRef.current;
      const ctaBox = ctaBoxRef.current;
      const ctaContent = ctaContentRef.current;
      const glow = glowRef.current;

      if (!section || !bgText || !ctaBox || !ctaContent) return;

      // Calculate dynamic horizontal translation distance for kinetic typography
      const calculateScrollX = () => {
        const textWidth = bgText.scrollWidth;
        const viewportWidth = window.innerWidth;
        return -(textWidth - viewportWidth + viewportWidth * 0.15);
      };

      // 1. Explicitly set initial hidden states BEFORE ScrollTrigger initializes
      // to prevent pre-render flash or duplicate rendering appearance
      gsap.set(ctaBox, { scale: 0.88, opacity: 0, y: 60 });
      gsap.set(ctaContent, { opacity: 0, y: 80, scale: 0.92 });
      gsap.set(bgText, { x: window.innerWidth });

      // 2. Create ONE master timeline with single ScrollTrigger pinning instance
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${Math.max(window.innerHeight * 2, bgText.scrollWidth - window.innerWidth + 300)}`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      // Oversized Kinetic Typography horizontal movement (Right -> Left)
      tl.to(
        bgText,
        {
          x: calculateScrollX,
          ease: "none",
        },
        0
      );

      // Background Glow movement
      if (glow) {
        tl.to(
          glow,
          {
            scale: 1.35,
            opacity: 0.85,
            x: "20%",
            ease: "power1.inOut",
          },
          0
        );
      }

      // CTA Box card entrance
      tl.to(
        ctaBox,
        {
          scale: 1,
          opacity: 1,
          y: 0,
          ease: "power2.out",
          duration: 0.5,
        },
        0.1
      );

      // CTA Content inner reveal
      tl.to(
        ctaContent,
        {
          opacity: 1,
          y: 0,
          scale: 1,
          ease: "power3.out",
          duration: 0.5,
        },
        0.25
      );

      // Subtle mouse movement / parallax on background text
      const handleMouseMove = (e) => {
        if (!bgText) return;
        const { clientY } = e;
        const moveY = (clientY / window.innerHeight - 0.5) * -12;
        gsap.to(bgText, {
          y: moveY,
          duration: 1.2,
          ease: "power2.out",
          overwrite: "auto",
        });
      };

      window.addEventListener("mousemove", handleMouseMove);
      return () => {
        window.removeEventListener("mousemove", handleMouseMove);
      };
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} className="kinetic-cta-section">
      {/* Background Radial Glow */}
      <div ref={glowRef} className="kinetic-cta-glow"></div>

      {/* Oversized Kinetic Background Typography */}
      <div className="kinetic-bg-typography-wrapper">
        <div ref={bgTextRef} className="kinetic-bg-typography">
          SO, ARE YOU READY TO STAND OUT?
        </div>
      </div>

      {/* Main CTA Content Container Card */}
      <div className="container kinetic-cta-container">
        <div ref={ctaBoxRef} className="cta-box glass text-center">
          <div ref={ctaContentRef} className="cta-content-inner">
            <h2 className="cta-heading">Ready to —</h2>
            <p className="cta-subheading">
              Join ambitious professionals who have optimized their profiles and
              navigated the US hiring process with our support.
            </p>
            <div className="cta-buttons">
              <Link to="/contact" className="btn-primary cta-btn-main">
                Start Career Consultation
              </Link>
              <Link to="/services" className="btn-primary cta-btn-outline">
                Explore Services
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FinalCTA;
