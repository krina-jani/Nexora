import { useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import "./FinalCTA.css";

gsap.registerPlugin(ScrollTrigger);

const FinalCTA = () => {
  const sectionRef = useRef(null);
  const bgLine1Ref = useRef(null);
  const bgLine2Ref = useRef(null);
  const ctaBoxRef = useRef(null);
  const ctaContentRef = useRef(null);
  const glowRef = useRef(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      const bgLine1 = bgLine1Ref.current;
      const bgLine2 = bgLine2Ref.current;
      const ctaBox = ctaBoxRef.current;
      const ctaContent = ctaContentRef.current;
      const glow = glowRef.current;

      if (!section || !bgLine1 || !bgLine2 || !ctaBox || !ctaContent) return;

      const getScrollX1 = () => {
        const textWidth = bgLine1.scrollWidth;
        const viewportWidth = window.innerWidth;
        return -(textWidth - viewportWidth + viewportWidth * 0.15);
      };

      const getScrollX2 = () => {
        const textWidth = bgLine2.scrollWidth;
        const viewportWidth = window.innerWidth;
        return (textWidth - viewportWidth + viewportWidth * 0.15);
      };

      // Explicitly set initial states before ScrollTrigger initializes
      gsap.set(ctaBox, { scale: 0.88, opacity: 0, y: 60 });
      gsap.set(ctaContent, { opacity: 0, y: 80, scale: 0.92 });
      gsap.set(bgLine1, { x: window.innerWidth, y: 0 });
      gsap.set(bgLine2, { x: -window.innerWidth, y: 0 });

      // Master ScrollTrigger timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${Math.max(window.innerHeight * 2.2, bgLine1.scrollWidth + 400)}`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      // 1. Line 1: Right -> Left + Zig-Zag Wave Y & Rotation
      tl.to(
        bgLine1,
        {
          x: getScrollX1,
          ease: "none",
        },
        0
      );
      tl.to(
        bgLine1,
        {
          keyframes: [
            { y: -75, rotation: -5, duration: 1 },
            { y: 65, rotation: 4, duration: 1 },
            { y: -80, rotation: -4, duration: 1 },
            { y: 60, rotation: 3, duration: 1 },
            { y: -45, rotation: -2, duration: 1 },
            { y: 0, rotation: 0, duration: 1 }
          ],
          ease: "sine.inOut"
        },
        0
      );

      // 2. Line 2: Left -> Right + Inverted Zig-Zag Wave Y & Rotation
      tl.to(
        bgLine2,
        {
          x: getScrollX2,
          ease: "none",
        },
        0
      );
      tl.to(
        bgLine2,
        {
          keyframes: [
            { y: 75, rotation: 5, duration: 1 },
            { y: -65, rotation: -4, duration: 1 },
            { y: 80, rotation: 4, duration: 1 },
            { y: -60, rotation: -3, duration: 1 },
            { y: 45, rotation: 2, duration: 1 },
            { y: 0, rotation: 0, duration: 1 }
          ],
          ease: "sine.inOut"
        },
        0
      );

      // 3. Radial Glow movement
      if (glow) {
        tl.to(
          glow,
          {
            scale: 1.4,
            opacity: 0.85,
            x: "25%",
            ease: "power1.inOut",
          },
          0
        );
      }

      // 4. CTA Box card entrance
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

      // 5. CTA Content inner reveal
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

      // Subtle mouse parallax
      const handleMouseMove = (e) => {
        if (!bgLine1 || !bgLine2) return;
        const { clientY } = e;
        const moveY = (clientY / window.innerHeight - 0.5) * -14;
        gsap.to([bgLine1, bgLine2], {
          y: (i) => (i === 0 ? moveY : -moveY),
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

      {/* Oversized Kinetic Background Typography (Dual Zig-Zag Lines) */}
      <div className="kinetic-bg-typography-wrapper">
        <div ref={bgLine1Ref} className="kinetic-bg-typography line-top">
          SO, ARE YOU READY
        </div>
        <div ref={bgLine2Ref} className="kinetic-bg-typography line-bottom">
          TO STAND OUT?
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
