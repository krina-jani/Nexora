import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import Accordion from "../components/common/Accordion";
import faq from "../data/faq";
import { FaPaperPlane } from "react-icons/fa";
import contactBg from "../assets/images/contact-backg.png";

const Contact = () => {
  const pageRef = useRef(null);
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", company: "", role: "", message: "", agree: false });

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero entrance
      gsap.from(".contact-hero-title", {
        y: 60,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out"
      });

      // Form entrance
      gsap.from(".new-contact-form-container", {
        y: 50,
        opacity: 0,
        duration: 0.8,
        ease: "power2.out",
        delay: 0.2
      });
    }, pageRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.agree) {
      alert("Please agree to the Privacy Policy before submitting.");
      return;
    }
    alert(`Thank you, ${formData.name}! We will contact you soon.`);
    setFormData({ name: "", email: "", phone: "", company: "", role: "", message: "", agree: false });
  };

  return (
    <div ref={pageRef} className="contact-page-wrapper">
      <div 
        className="contact-hero-form-wrapper"
        style={{ 
          backgroundImage: `url(${contactBg})`, 
          backgroundSize: 'cover', 
          backgroundPosition: 'center', 
          backgroundRepeat: 'no-repeat',
          position: 'relative'
        }}
      >
        <div className="container contact-grid-layout">
          {/* Left Column (Empty to keep background image visible) */}
          <div className="contact-left-spacer"></div>

          {/* Right Column (Contains Title and Form) */}
          <div className="contact-right-content">
            <h1 className="contact-hero-title mar">
              Connect With Our <h3 className="text-gradient ">Career Advisors</h3>
            </h1>

            <div className="new-contact-form-container glass">
              <div className="contact-header-new ">
                <h2>Contact Form</h2>
                <p>For the fastest response, please fill out the form below.</p>
              </div>

              <form onSubmit={handleSubmit} className="new-contact-form">
                
                <div className="form-row-2col">
                  <div className="form-group-new">
                    <label>Full Name <span className="req-star">*</span></label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="John Doe"
                      className="glass-input-new"
                    />
                  </div>
                  <div className="form-group-new">
                    <label>Email Address <span className="req-star">*</span></label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="john@company.com"
                      className="glass-input-new"
                    />
                  </div>
                </div>

                <div className="form-row-2col">
                  <div className="form-group-new">
                    <label>Phone Number</label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+91 7634897546"
                      className="glass-input-new"
                    />
                  </div>
                  <div className="form-group-new">
                    <label>Company/Organization (if applicable)</label>
                    <input
                      type="text"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      placeholder="Your Company"
                      className="glass-input-new"
                    />
                  </div>
                </div>

                <div className="form-row-1col">
                  <div className="form-group-new">
                    <label>I am: <span className="req-star">*</span></label>
                    <select 
                      required
                      value={formData.role}
                      onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                      className="glass-input-new select-new"
                    >
                      <option value="" disabled>Select one</option>
                      <option value="student">Student / Job Seeker</option>
                      <option value="employer">Employer / Hiring Manager</option>
                      <option value="partner">Potential Partner</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>

                <div className="form-row-1col">
                  <div className="form-group-new">
                    <label>Message <span className="req-star">*</span></label>
                    <textarea
                      required
                      rows="5"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Tell us about your recruitment needs or career goals..."
                      className="glass-input-new"
                    />
                  </div>
                </div>

                <div className="form-row-1col checkbox-row">
                  <label className="checkbox-label">
                    <input 
                      type="checkbox" 
                      required 
                      checked={formData.agree}
                      onChange={(e) => setFormData({ ...formData, agree: e.target.checked })}
                    />
                    <span>I have read and agree to the Nexora Privacy Policy and Terms of Service.</span>
                  </label>
                </div>

                <button type="submit" className="btn-primary form-submit-btn-new">
                  <FaPaperPlane className="submit-icon" /> Submit Message &rarr;
                </button>

              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Map Section */}
      <section className="map-placeholder-section">
        <div className="container text-center">
          <h2 className="section-title text-white mb-4 mar-b">Where to Find Us</h2>
          <div className="map-mock-box glass">
            <iframe 
              src="https://maps.google.com/maps?q=Orchard%20Road,%20Singapore&t=&z=13&ie=UTF8&iwloc=&output=embed" 
              width="100%" 
              height="100%" 
              style={{ border: 0, borderRadius: 'inherit' }} 
              allowFullScreen="" 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="contact-faq-section">
        <div className="container">
          <h2 className="text-center section-title" style={{ color: "#000000" }}>Need Immediate Answers?</h2>
          <Accordion items={faq} />
        </div>
      </section>

      {/* Styles */}
      <style>{`
        .mar{
          margin-left: 117px;
        }
        .contact-hero {
          padding: 80px 0 40px;
        }
        .contact-hero-title {
          font-size: 3.5rem;
          font-weight: 800;
          line-height: 1.2;
          color: #0f172a !important;
          
        }
        .text-gradient {
          background: linear-gradient(134deg, #df830d, #6e3517);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .contact-grid-layout {
          display: grid;
          grid-template-columns: 0.8fr 1.2fr;
          gap: 60px;
          padding: 80px 0 100px;
          align-items: flex-start;
        }
        .contact-right-content {
          display: flex;
          flex-direction: column;
          gap: 40px;
        }
        .contact-header-new {
          margin-bottom: 20px;
        }
        .contact-header-new h2 {
          font-size: 2.5rem;
          font-weight: 800;
          margin-bottom: 10px;
          color: #0f172a !important;
        }
        .contact-header-new p {
          color: #334155 !important;
          font-size: 1.1rem;
        }

        .new-contact-form-container {
          padding: 50px;
          border-radius: var(--radius-xl);
          border: 1px solid rgba(255, 255, 255, 0.25) !important;
          background: rgba(255, 255, 255, 0.85) !important;
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          box-shadow: var(--shadow-lg);
          margin-left: 91px;
          margin-right: -105px;
        }

        .new-contact-form {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .form-row-2col {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 24px;
        }
        .mar-b{
          margin-bottom: 22px;
        }
        .form-row-1col {
          display: flex;
          flex-direction: column;
        }

        .form-group-new {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .form-group-new label {
          font-size: 0.95rem;
          font-weight: 600;
          color: #0f172a !important;
        }

        .req-star {
          color: #ff4d4f;
          margin-left: 4px;
        }

        .glass-input-new {
          width: 100%;
          padding: 14px 16px;
          border-radius: var(--radius-sm);
          border: 1px solid rgba(0, 0, 0, 0.15) !important;
          background: rgba(255, 255, 255, 0.9) !important;
          color: #0f172a !important;
          font-family: inherit;
          font-size: 1rem;
          transition: all 0.3s ease;
        }
        
        [data-theme="dark"] .glass-input-new {
          background: rgba(0, 0, 0, 0.2);
        }

        .glass-input-new:focus {
          outline: none;
          border-color: var(--primary);
          background: rgba(255, 255, 255, 0.8);
          box-shadow: 0 0 0 4px rgba(72, 201, 44, 0.1);
        }
        
        [data-theme="dark"] .glass-input-new:focus {
          background: rgba(0, 0, 0, 0.4);
        }
        
        .select-new {
          appearance: none;
          background-image: url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23333%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E");
          background-repeat: no-repeat;
          background-position: right 16px center;
          background-size: 10px auto;
        }
        
        [data-theme="dark"] .select-new {
          background-image: url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23fff%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E");
        }

        .checkbox-row {
          margin: 10px 0;
        }

        .checkbox-label {
          display: flex;
          align-items: center;
          gap: 12px;
          cursor: pointer;
          font-size: 0.95rem;
          color: #334155 !important;
        }

        .checkbox-label input {
          width: 18px;
          height: 18px;
          accent-color: var(--primary);
          cursor: pointer;
        }

        .form-submit-btn-new {
          width: 100%;
          padding: 16px;
          font-size: 1.1rem;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          margin-top: 10px;
        }
        
        .submit-icon {
          font-size: 1rem;
        }

        .map-placeholder-section {
          padding: 100px 0;
          background: linear-gradient(134deg, rgba(223, 131, 13, 0.9), rgba(110, 53, 23, 0.9), rgba(249, 195, 58, 0.9));
        }
        .map-mock-box {
          height: 500px;
          border-radius: var(--radius-lg);
          border: 2px solid rgba(255, 255, 255, 0.2);
          box-shadow: var(--shadow-lg);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          color: var(--text-light);
          padding: 0;
          overflow: hidden;
        }
        .section-title {
          font-size: 2.5rem;
          font-weight: 800;
          color: #ffffff;
        }
        .contact-faq-section {
          padding: 100px 0;
        }
        /* Dark mode overrides */
        [data-theme='dark'] .new-contact-form-container {
          background: rgba(15, 23, 42, 0.85) !important;
          border: 1px solid rgba(255, 255, 255, 0.1) !important;
        }
        [data-theme='dark'] .contact-hero-title,
        [data-theme='dark'] .contact-header-new h2,
        [data-theme='dark'] .form-group-new label {
          color: #f8fafc !important;
        }
        [data-theme='dark'] .contact-header-new p,
        [data-theme='dark'] .checkbox-label {
          color: #cbd5e1 !important;
        }
        [data-theme='dark'] .glass-input-new {
          background: rgba(0, 0, 0, 0.3) !important;
          color: #f8fafc !important;
          border: 1px solid rgba(255, 255, 255, 0.1) !important;
        }

        @media (max-width: 991px) {
          .contact-grid-layout {
            grid-template-columns: 1fr;
            gap: 40px;
            padding: 40px 0;
          }
          .contact-left-spacer {
            display: none;
          }
          .new-contact-form-container {
            margin: 0;
          }
          .mar {
            margin-left: 0;
            text-align: center;
          }
        }
        @media (max-width: 768px) {
          .form-row-2col {
            grid-template-columns: 1fr;
            gap: 20px;
          }
          .new-contact-form-container {
            padding: 30px 20px;
            margin: 0;
          }
          .mar {
            margin-left: 0;
          }
        }
      `}</style>
    </div>
  );
};

export default Contact;