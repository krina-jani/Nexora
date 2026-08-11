import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./FinalCTA.css";

gsap.registerPlugin(ScrollTrigger);

const FinalCTA = () => {
  const sectionRef = useRef(null);
  const bgTextRef = useRef(null);
  const ctaBoxRef = useRef(null);
  const ctaContentRef = useRef(null);
  const glowRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const bgText = bgTextRef.current;
    const ctaBox = ctaBoxRef.current;
    const ctaContent = ctaContentRef.current;
    const glow = glowRef.current;

    if (!section || !bgText || !ctaBox || !ctaContent) return;

    const ctx = gsap.context(() => {
      // Pin section and handle horizontal kinetic typography + content entrance on scroll
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=2200",
          scrub: 1,
          pin: true,
          invalidateOnRefresh: true,
        },
      });

      // 1. Oversized background kinetic text movement (RIGHT to LEFT)
      const calculateScrollX = () => {
        const textWidth = bgText.scrollWidth;
        const viewportWidth = window.innerWidth;
        return -(textWidth - viewportWidth + viewportWidth * 0.25);
      };

      tl.to(
        bgText,
        {
          x: calculateScrollX,
          ease: "none",
        },
        0
      );

      // 2. Subtle radial glow movement during scroll
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

      // 3. CTA Box card entrance animation
      tl.fromTo(
        ctaBox,
        {
          scale: 0.88,
          opacity: 0,
          y: 60,
        },
        {
          scale: 1,
          opacity: 1,
          y: 0,
          ease: "power2.out",
          duration: 0.6,
        },
        0.12
      );

      // 4. CTA inner content elegant reveal
      tl.fromTo(
        ctaContent,
        {
          opacity: 0,
          y: 80,
          scale: 0.92,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          ease: "power3.out",
          duration: 0.5,
        },
        0.3
      );
    }, section);

    // Subtle mouse parallax micro-interaction on background text
    const handleMouseMove = (e) => {
      if (!bgText) return;
      const { clientX, clientY } = e;
      const moveX = (clientX / window.innerWidth - 0.5) * -20;
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
      ctx.revert();
    };
  }, []);

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
