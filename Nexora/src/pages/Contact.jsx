import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import Accordion from "../components/common/Accordion";
import faq from "../data/faq";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaClock } from "react-icons/fa";

const Contact = () => {
  const pageRef = useRef(null);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero entrance
      gsap.from(".contact-hero-title", {
        y: 60,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out"
      });

      // Form & Info panels
      gsap.from(".contact-box-left", {
        x: -50,
        opacity: 0,
        duration: 0.8,
        ease: "power2.out"
      });

      gsap.from(".contact-form-glass", {
        x: 50,
        opacity: 0,
        duration: 0.8,
        ease: "power2.out"
      });
    }, pageRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Thank you, ${formData.name}! We will contact you soon.`);
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div ref={pageRef} className="contact-page-wrapper">
      {/* Hero */}
      <section className="contact-hero text-center">
        <div className="container">
          <h1 className="contact-hero-title">
            Connect With Our <span className="text-gradient">Career Advisors</span>
          </h1>
          <p className="contact-hero-sub text-light">
            Have questions about placement tracks, program costs, or corporate partnerships? Get in touch with us today.
          </p>
        </div>
      </section>

      {/* Main Form & details */}
      <section className="contact-main-section">
        <div className="container contact-grid">
          
          {/* Info Side */}
          <div className="contact-box-left">
            <h2>Office Information</h2>
            <p className="contact-intro">
              Whether you want to visit our offices or hop on a video consultation, our team is always ready to guide you.
            </p>
            <div className="contact-info-list">
              <div className="info-item">
                <FaMapMarkerAlt className="info-icon" />
                <div>
                  <h4>Global HQ</h4>
                  <p>180 Orchard Road, Suite 400, Singapore</p>
                </div>
              </div>
              <div className="info-item">
                <FaPhoneAlt className="info-icon" />
                <div>
                  <h4>Phone Support</h4>
                  <p>+65 6789 0123</p>
                </div>
              </div>
              <div className="info-item">
                <FaEnvelope className="info-icon" />
                <div>
                  <h4>Email Support</h4>
                  <p>admissions@nexoracareer.com</p>
                </div>
              </div>
              <div className="info-item">
                <FaClock className="info-icon" />
                <div>
                  <h4>Business Hours</h4>
                  <p>Monday - Friday: 9:00 AM - 6:00 PM (SGT)</p>
                </div>
              </div>
            </div>
          </div>

          {/* Form Side */}
          <form className="contact-form-glass glass" onSubmit={handleSubmit}>
            <h3>Send Us a Message</h3>
            <div className="form-group">
              <label>Full Name</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="John Doe"
                className="glass-input"
              />
            </div>
            <div className="form-group">
              <label>Email Address</label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="john@example.com"
                className="glass-input"
              />
            </div>
            <div className="form-group">
              <label>Tell us about your career goals</label>
              <textarea
                required
                rows="5"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="I want to transition from marketing to full stack..."
                className="glass-input"
              />
            </div>
            <button type="submit" className="btn-primary form-submit-btn">
              Submit Inquiry
            </button>
          </form>

        </div>
      </section>

      {/* Map placeholder */}
      <section className="map-placeholder-section">
        <div className="container text-center">
          <h2 className="section-title">Where to Find Us</h2>
          <div className="map-mock-box glass">
            <h3>Google Maps Integration</h3>
            <p>Orchard Rd, Singapore (Map display placeholder)</p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="contact-faq-section">
        <div className="container">
          <h2 className="text-center section-title">Need Immediate Answers?</h2>
          <Accordion items={faq} />
        </div>
      </section>

      {/* Styles */}
      <style>{`
        .contact-hero {
          padding: 80px 0 40px;
        }
        .contact-hero-title {
          font-size: 3.5rem;
          font-weight: 800;
          margin-bottom: 20px;
        }
        .contact-hero-sub {
          font-size: 1.2rem;
          max-width: 600px;
          margin: 0 auto;
        }
        .text-gradient {
          background: linear-gradient(90deg, var(--primary), var(--primary-light));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .contact-grid {
          display: grid;
          grid-template-columns: 1fr 1.2fr;
          gap: 60px;
          margin-top: 40px;
        }
        .contact-box-left h2 {
          font-size: 1.8rem;
          margin-bottom: 16px;
          color: var(--heading);
        }
        .contact-intro {
          font-size: 1.05rem;
          line-height: 1.6;
          margin-bottom: 30px;
        }
        .contact-info-list {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }
        .info-item {
          display: flex;
          gap: 16px;
          align-items: flex-start;
        }
        .info-icon {
          font-size: 1.3rem;
          color: var(--primary);
          margin-top: 4px;
        }
        .info-item h4 {
          font-size: 1.05rem;
          font-weight: 700;
          margin-bottom: 4px;
        }
        .info-item p {
          color: var(--text-light);
          font-size: 0.95rem;
        }
        .contact-form-glass {
          padding: 40px;
          border-radius: var(--radius-lg);
          border: 1px solid var(--border);
          display: flex;
          flex-direction: column;
          gap: 20px;
        }
        .contact-form-glass h3 {
          font-size: 1.4rem;
          font-weight: 700;
          margin-bottom: 10px;
        }
        .form-group {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .form-group label {
          font-size: 0.9rem;
          font-weight: 600;
          color: var(--heading);
        }
        .glass-input {
          background: rgba(255, 255, 255, 0.4);
          border: 1px solid var(--border);
          border-radius: var(--radius-xs);
          padding: 12px 16px;
          font-size: 0.95rem;
          outline: none;
          transition: var(--transition);
        }
        .glass-input:focus {
          border-color: var(--primary);
          background: var(--white);
        }
        .form-submit-btn {
          width: 100%;
          padding: 14px;
        }
        .map-placeholder-section {
          padding: 80px 0;
          background: var(--bg-soft);
          margin-top: 80px;
        }
        .map-mock-box {
          height: 350px;
          border-radius: var(--radius-lg);
          border: 1px solid var(--border);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          color: var(--text-light);
        }
        .contact-faq-section {
          padding: 100px 0;
        }
        @media (max-width: 768px) {
          .contact-grid {
            grid-template-columns: 1fr;
            gap: 40px;
          }
        }
      `}</style>
    </div>
  );
};

export default Contact;