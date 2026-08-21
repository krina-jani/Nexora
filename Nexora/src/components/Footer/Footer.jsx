import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { 
  FaFacebookF, 
  FaTwitter, 
  FaLinkedinIn, 
  FaInstagram, 
  FaMapMarkerAlt, 
  FaEnvelope, 
  FaPhoneAlt 
} from "react-icons/fa";
import { NavLink } from "react-router-dom";
import logo from "../../assets/icons/nexoralogo.png";
import "./Footer.css";

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const footerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
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
      <div className="footer-watermark">NEXORA</div>
      <div className="container mx-auto footer-content-element">
        <div className="grid-container">
          
          {/* Company Info */}
          <div className="company-info-col">
            <NavLink to="/" className="footer-logo-link group">
              <div className="footer-logo-container transition-all duration-500 group-hover:rotate-12">
                <img src={logo} alt="Nexora Career" className="hover:scale-110 transition-transform duration-300 footer-logo-img" />
              </div>
              <span className="logo-text">
                Nexora <span className="logo-text-highlight">Career</span>
              </span>
            </NavLink>
            
            <p className="footer-desc-text">
              Connecting talent with US career opportunities through professional career support services.
            </p>
            
            <div className="social-links-container">
              {/* <a href="https://www.facebook.com/nexoracareer"
                 target="_blank"
                 rel="noopener noreferrer"
                 className="social-icon-btn facebook-btn"
                 aria-label="Facebook">
                <FaFacebookF className="icon" />
              </a>
              <a href="https://x.com/nexoracareer"
                 target="_blank"
                 rel="noopener noreferrer"
                 className="social-icon-btn twitter-btn"
                 aria-label="Twitter">
                <FaTwitter className="icon" />
              </a> */}
              <a href="https://www.linkedin.com/company/nexora-career/"
                 target="_blank"
                 rel="noopener noreferrer"
                 className="social-icon-btn linkedin-btn"
                 aria-label="LinkedIn">
                <FaLinkedinIn className="icon" />
              </a>
              <a href="https://www.instagram.com/nexoracareer?igsh=OG0zN3k5NGV2c3h1"
                 target="_blank"
                 rel="noopener noreferrer"
                 className="social-icon-btn instagram-btn"
                 aria-label="Instagram">
                <FaInstagram className="icon" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="links-col">
            <h3 className="section-title">
              Quick Links
            </h3>
            <ul className="links-list">
              <li>
                <NavLink to="/" className="link-item group">
                  <span className="bullet-dot group-hover:opacity-100 group-hover:translate-x-0"></span>
                  <span className="link-text-label group-hover:translate-x-2">Home</span>
                </NavLink>
              </li>
              <li>
                <NavLink to="/about" className="link-item group">
                  <span className="bullet-dot group-hover:opacity-100 group-hover:translate-x-0"></span>
                  <span className="link-text-label group-hover:translate-x-2">About Us</span>
                </NavLink>
              </li>
              <li>
                <NavLink to="/services" className="link-item group">
                  <span className="bullet-dot group-hover:opacity-100 group-hover:translate-x-0"></span>
                  <span className="link-text-label group-hover:translate-x-2">Services</span>
                </NavLink>
              </li>
              <li>
                <NavLink to="/industries" className="link-item group">
                  <span className="bullet-dot group-hover:opacity-100 group-hover:translate-x-0"></span>
                  <span className="link-text-label group-hover:translate-x-2">Industries</span>
                </NavLink>
              </li>
              {/* <li>
                <NavLink to="/about" className="link-item group">
                  <span className="bullet-dot group-hover:opacity-100 group-hover:translate-x-0"></span>
                  <span className="link-text-label group-hover:translate-x-2">Blog</span>
                </NavLink>
              </li> */}
              <li>
                <NavLink to="/contact" className="link-item group">
                  <span className="bullet-dot group-hover:opacity-100 group-hover:translate-x-0"></span>
                  <span className="link-text-label group-hover:translate-x-2">Contact</span>
                </NavLink>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div className="links-col">
            <h3 className="section-title">
              Services
            </h3>
            <ul className="links-list">
              <li>
                <NavLink to="/services#rpo" className="link-item group">
                  <span className="bullet-dot group-hover:opacity-100 group-hover:translate-x-0"></span>
                  <span className="link-text-label group-hover:translate-x-2">Profile & Resume Optimization</span>
                </NavLink>
              </li>
              <li>
                <NavLink to="/services#career-support" className="link-item group">
                  <span className="bullet-dot group-hover:opacity-100 group-hover:translate-x-0"></span>
                  <span className="link-text-label group-hover:translate-x-2">Career Support Services</span>
                </NavLink>
              </li>
              <li>
                <NavLink to="/services#career-growth" className="link-item group">
                  <span className="bullet-dot group-hover:opacity-100 group-hover:translate-x-0"></span>
                  <span className="link-text-label group-hover:translate-x-2">Career Growth Packages</span>
                </NavLink>
              </li>
              <li>
                <NavLink to="/services#pro-services" className="link-item group">
                  <span className="bullet-dot group-hover:opacity-100 group-hover:translate-x-0"></span>
                  <span className="link-text-label group-hover:translate-x-2">Pro Services</span>
                </NavLink>
              </li>
              <li>
                <NavLink to="/services#custom-services" className="link-item group">
                  <span className="bullet-dot group-hover:opacity-100 group-hover:translate-x-0"></span>
                  <span className="link-text-label group-hover:translate-x-2">Custom Services</span>
                </NavLink>
              </li>
            </ul>
          </div>

          {/* Contact Us */}
          <div className="contact-col">
            <h3 className="section-title">
              Contact Us
            </h3>
            <ul className="contact-info-list">
              <li className="contact-info-item group">
                <FaMapMarkerAlt className="contact-icon text-primary group-hover:scale-110" />
                <span className="contact-text">
                  8 The Green, STE R, Dover, DE 19901, USA
                </span>
              </li>
              <li className="contact-info-item group">
                <FaMapMarkerAlt className="contact-icon text-primary group-hover:scale-110" />
                <span className="contact-text">
                  B/709, 7th Floor, Mondeal Square, Nr.Prahladnagar Cross Road, Ahmedabad, Gujarat, India
                </span>
              </li>
              <li className="contact-info-item group">
                <FaEnvelope className="contact-icon text-primary group-hover:scale-110" />
                <a href="mailto:Info@nexoracareer.com" className="contact-text-link">
                  Info@nexoracareer.com
                </a>
              </li>
              <li className="contact-info-item group">
                <FaPhoneAlt className="contact-icon text-primary group-hover:scale-110" />
                <a href="tel:+13023642356" className="contact-text-link">
                  +1 (302) 364- 2356
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom copyright bar */}
        <div className="footer-bottom-bar">
          <p className="copyright-text">
            &copy; 2025 Nexora Career. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;