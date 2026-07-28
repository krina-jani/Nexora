import { Link } from "react-router-dom";
import { FaLinkedinIn, FaTwitter, FaInstagram, FaFacebookF, FaPaperPlane } from "react-icons/fa";
import "./Footer.css";

const Footer = () => {
  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    alert("Subscribed successfully!");
  };

  return (
    <footer className="footer-section">
      <div className="container footer-grid-container">
        {/* Brand Information */}
        <div className="footer-col brand-col">
          <Link to="/" className="footer-logo">
            <span className="logo-accent">N</span>exora <span className="logo-sub">Career</span>
          </Link>
          <p className="brand-description">
            Building global careers beyond borders. We empower builders, innovators, and professionals to secure high-growth career placements globally.
          </p>
          <div className="social-links-wrapper">
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="social-icon-btn">
              <FaLinkedinIn />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer" className="social-icon-btn">
              <FaTwitter />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="social-icon-btn">
              <FaInstagram />
            </a>
            <a href="https://facebook.com" target="_blank" rel="noreferrer" className="social-icon-btn">
              <FaFacebookF />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div className="footer-col">
          <h3 className="footer-title">Company</h3>
          <ul className="footer-links">
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/testimonials">Success Stories</Link></li>
            <li><a href="#careers">Careers</a></li>
            <li><a href="#blog">Blog & Articles</a></li>
          </ul>
        </div>

        {/* Services Links */}
        <div className="footer-col">
          <h3 className="footer-title">Services</h3>
          <ul className="footer-links">
            <li><Link to="/services">Resume Writing</Link></li>
            <li><Link to="/services">Interview Prep</Link></li>
            <li><Link to="/services">LinkedIn Profile Opt</Link></li>
            <li><Link to="/services">Overseas Career Support</Link></li>
          </ul>
        </div>

        {/* Contact/Newsletter */}
        <div className="footer-col newsletter-col">
          <h3 className="footer-title">Stay Updated</h3>
          <p className="newsletter-text">
            Get the latest career tips, industry insights, and remote global job listings sent to your inbox.
          </p>
          <form className="newsletter-form-container" onSubmit={handleNewsletterSubmit}>
            <input
              type="email"
              placeholder="Enter your email"
              required
              className="newsletter-email-input glass"
            />
            <button type="submit" className="newsletter-submit-btn">
              <FaPaperPlane />
            </button>
          </form>
        </div>
      </div>

      {/* Footer Bottom Bar */}
      <div className="footer-bottom-bar">
        <div className="container bottom-inner-container">
          <p className="copyright-text">
            © {new Date().getFullYear()} Nexora Career. All rights reserved.
          </p>
          <div className="bottom-links">
            <a href="#privacy">Privacy Policy</a>
            <a href="#terms">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;