import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaInstagram, FaLinkedin, FaFacebook, FaGithub } from "react-icons/fa";
import "./Footer.css";

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const footerRef = useRef(null);
  const bgTextRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Background Text Parallax
      gsap.fromTo(
        bgTextRef.current,
        { y: -50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top bottom",
            end: "bottom bottom",
            scrub: 1,
          },
        }
      );

      // Content Fade In
      gsap.fromTo(
        ".footer-content-element",
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top 90%",
          },
        }
      );
    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer ref={footerRef} className="premium-footer">
      <div className="footer-bg-text-wrapper">
        <h1 ref={bgTextRef} className="footer-bg-text">NEXORA</h1>
      </div>

      <div ref={contentRef} className="container premium-footer-container">
        
        {/* Left Section */}
        <div className="premium-footer-left footer-content-element">
          <div className="footer-stars">
            ⭐⭐⭐⭐⭐
          </div>
          <p className="footer-testimonial">
            "Building intelligent digital experiences with creativity and precision."
            <br />
            <span className="footer-author">— Team Nexora</span>
          </p>
          <div className="footer-socials">
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"><FaLinkedin /></a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><FaFacebook /></a>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer"><FaGithub /></a>
          </div>
        </div>

        {/* Center Section */}
        <div className="premium-footer-center footer-content-element">
          <p className="footer-tagline">
            Transforming Ideas into Smart Digital Solutions.
          </p>
        </div>

        {/* Right Section */}
        <div className="premium-footer-right footer-content-element">
          <p className="footer-copyright">
            © 2026 NEXORA. ALL RIGHTS RESERVED.
          </p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;