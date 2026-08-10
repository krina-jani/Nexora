import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaInstagram, FaLinkedin, FaFacebook, FaGithub, FaVideo } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import logo from "../../assets/icons/nexoralogo.png";
import "./Footer.css";

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const footerRef = useRef(null);
  const contentRef = useRef(null);
  const [activeLoc, setActiveLoc] = useState("singapore");

  const locations = [
    {
      id: "singapore",
      name: "SINGAPORE",
      address: "Level 30, Marina Bay Financial Centre, 10 Marina Blvd, Singapore 018983",
      phone: "+65 6789 0123",
      hours: "Monday to Friday: 9:00 am to 6:00 pm"
    },
    {
      id: "bangalore",
      name: "BENGALURU",
      address: "8th Floor, WeWork Galaxy, 43 Residency Rd, Ashok Nagar, Bengaluru 560025",
      phone: "+91 80 4995 5747",
      hours: "Monday to Saturday: 10:00 am to 7:00 pm"
    },
    {
      id: "san-francisco",
      name: "SAN FRANCISCO",
      address: "Suite 400, 535 Mission St, San Francisco, CA 94105, United States",
      phone: "+1 415 555 0199",
      hours: "Monday to Friday: 9:00 am to 5:00 pm"
    },
    {
      id: "london",
      name: "LONDON",
      address: "30 St Mary Axe (The Gherkin), London EC3A 8EP, United Kingdom",
      phone: "+44 20 7946 0958",
      hours: "Monday to Friday: 9:00 am to 5:30 pm"
    }
  ];

  const currentLocData = locations.find((l) => l.id === activeLoc) || locations[0];

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
      <div ref={contentRef} className="container premium-footer-container">
        
        {/* Left Column: Navigation Links */}
        <div className="footer-column-nav footer-content-element">
          <div className="nav-block">
            <h4 className="footer-col-title">NAVIGATION</h4>
            <ul className="footer-links-list">
              <li><NavLink to="/">Home</NavLink></li>
              <li><NavLink to="/about">Why Choose Us</NavLink></li>
              <li><NavLink to="/services">Our Services</NavLink></li>
              <li><NavLink to="/industries">Industries</NavLink></li>
              <li><NavLink to="/contact">Contact</NavLink></li>
            </ul>
          </div>
          
          <div className="nav-block">
            <h4 className="footer-col-title">CANDIDATES</h4>
            <ul className="footer-links-list">
              <li><NavLink to="/about">Success Stories</NavLink></li>
              <li><NavLink to="/services">Career Coaching</NavLink></li>
              <li><NavLink to="/services">RPO Solutions</NavLink></li>
              <li><NavLink to="/contact">Book Consultation</NavLink></li>
            </ul>
          </div>
        </div>

        {/* Center/Right Combined Section */}
        <div className="footer-main-details footer-content-element">
          
          {/* Logo & Description */}
          <div className="footer-brand-header">
            <NavLink to="/" className="footer-logo-wrap">
              <img src={logo} alt="Nexora Logo" className="footer-favicon" />
              <div className="footer-logo-text">
                <span className="logo-title-main">NEXORA CAREER</span>
                <span className="logo-title-sub">Recruitment Process Outsourcing & Career Coaching</span>
              </div>
            </NavLink>
            <p className="footer-description">
              Nexora Career is a revolutionary name when people think about recruitment process outsourcing and career coaching. A prestigious partner guiding you directly to global opportunities.
            </p>
          </div>

          {/* Locations Tab Section */}
          <div className="footer-tabs-wrapper">
            <div className="footer-tabs-header">
              {locations.map((loc) => (
                <button
                  key={loc.id}
                  onClick={() => setActiveLoc(loc.id)}
                  className={`footer-tab-btn ${activeLoc === loc.id ? "active" : ""}`}
                >
                  {loc.name}
                </button>
              ))}
            </div>
            
            <div className="footer-tab-panel">
              <div className="panel-grid">
                <div className="panel-item">
                  <h5>Get in Touch</h5>
                  <p>{currentLocData.address}</p>
                </div>
                <div className="panel-item">
                  <h5>Call For Consultation</h5>
                  <p>{currentLocData.phone}</p>
                </div>
                <div className="panel-item">
                  <h5>Opening Hours</h5>
                  <p>{currentLocData.hours}</p>
                </div>
                <div className="panel-item virtual-tour">
                  <div className="tour-badge">
                    <FaVideo className="tour-icon" />
                    <span>Video Consultation Active</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Social media icons below the locations tab section */}
          <div className="footer-socials-colorful-wrap">
            <div className="footer-socials-colorful">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="social-fb" aria-label="Facebook"><FaFacebook /></a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="social-li" aria-label="LinkedIn"><FaLinkedin /></a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-ig" aria-label="Instagram"><FaInstagram /></a>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="social-gh" aria-label="GitHub"><FaGithub /></a>
            </div>
          </div>

        </div>

      </div>

      <div className="footer-bottom-bar container footer-content-element">
        
        <div className="footer-bottom-meta">
          <p className="footer-copy-text">
            NEXORA CAREER © 2026 | All Rights Reserved
          </p>
          <div className="footer-legal-links">
            <NavLink to="/about">Terms of Use</NavLink>
            <span className="divider">|</span>
            <NavLink to="/contact">Privacy Policy</NavLink>
            <span className="divider">|</span>
            <NavLink to="/about">Disclaimer</NavLink>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;