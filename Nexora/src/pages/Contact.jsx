import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import Accordion from "../components/common/Accordion";
import faq from "../data/faq";
import { FaPaperPlane } from "react-icons/fa";

const Contact = () => {
  const pageRef = useRef(null);
  const formContainerRef = useRef(null);
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", company: "", role: "", message: "", agree: false });
  const [submitted, setSubmitted] = useState(false);
  const [submittedName, setSubmittedName] = useState("");

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
    setSubmittedName(formData.name);
    setSubmitted(true);
    setFormData({ name: "", email: "", phone: "", company: "", role: "", message: "", agree: false });
    
    if (formContainerRef.current) {
      setTimeout(() => {
        formContainerRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 50);
    }
  };

  return (
    <div ref={pageRef} className="contact-page-wrapper">
      <div 
        className="contact-hero-form-wrapper"
        style={{ 
          backgroundImage: `url('https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=1920&auto=format&fit=crop')`, 
          backgroundSize: 'cover', 
          backgroundPosition: 'center', 
          backgroundRepeat: 'no-repeat',
          position: 'relative'
        }}
      >
        <div className="contact-hero-overlay"></div>
        <div className="container contact-grid-layout">
          {/* Left Column (Contains Title) */}
          <div className="contact-left-content">
            <h1 className="contact-hero-title">
              Connect With <br />
              <span className="text-gradient">Our Career Advisors</span>
            </h1>
            <p className="contact-hero-desc" style={{ marginTop: "30px", color: "#e2e8f0", fontSize: "1.15rem", lineHeight: "1.7", maxWidth: "480px" }}>
              Whether you need guidance on US resume standards, help with interview preparation, profile optimization, or strategic career consultation, our advisors are here to help.
            </p>
          </div>

          {/* Right Column (Contains Form) */}
          <div className="contact-right-content">

            <div ref={formContainerRef} className="new-contact-form-container glass">
              
              <div className={`contact-success-message text-center ${submitted ? 'active' : ''}`}>
                <div className="success-icon-wrap" style={{ fontSize: "3.5rem", color: "#DFBD69", marginBottom: "20px" }}>
                  ✓
                </div>
                <h2 style={{ color: "#ffffff", marginBottom: "15px" }}>Thank you, {submittedName}!</h2>
                <p style={{ color: "#cccccc", lineHeight: "1.6", marginBottom: "30px" }}>
                  Your message has been submitted successfully. A Nexora Career advisor will contact you soon.
                </p>
                <button 
                  onClick={() => setSubmitted(false)} 
                  className="btn-primary"
                  style={{ margin: "0 auto" }}
                >
                  Send Another Message
                </button>
              </div>

              <div className={`contact-form-inner ${!submitted ? 'active' : ''}`}>
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
                        placeholder="Tell us about your career goals and target roles..."
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
      </div>

      {/* Integrations Section */}
      <section className="integrations-section">
        <div className="container">
          <h2 className="section-title text-white mb-2">Works Seamlessly with Your Existing Stack</h2>
          <p className="section-desc text-light max-w-2xl mx-auto" style={{ maxWidth: '650px', margin: '0 auto 40px auto' }}>
            Connect Nexora with the tools you already use to create a unified hiring workflow.
          </p>
          <div className="integrations-grid">
            {/* Naukri */}
            <div className="integration-box naukri-box">
              <img src="https://upload.wikimedia.org/wikipedia/commons/f/fc/Naukri.png" alt="Naukri" className="integration-logo-img" />
            </div>

            {/* LinkedIn */}
            <div className="integration-box linkedin-box">
              <img src="https://upload.wikimedia.org/wikipedia/commons/b/b1/LinkedIn_Logo_2013_%282%29.svg" alt="LinkedIn" className="integration-logo-img" />
            </div>

            {/* Zoho */}
            <div className="integration-box zoho-box">
              <img src="https://upload.wikimedia.org/wikipedia/commons/3/30/ZOHO_logo_2023.svg" alt="Zoho" className="integration-logo-img" />
            </div>

            {/* Google Meet */}
            <div className="integration-box googlemeet-box">
              <img src="https://upload.wikimedia.org/wikipedia/commons/9/9b/Google_Meet_icon_%282020%29.svg" alt="Google Meet" className="integration-logo-img" style={{ maxHeight: '80px' }} />
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="contact-faq-section">
        <div className="container">
          <h2 className="text-center section-title" style={{ color: "var(--text)" }}>Need Immediate Answers?</h2>
          <Accordion items={faq} />
        </div>
      </section>

      {/* Styles */}
      <style>{`
        .contact-success-message {
          opacity: 0;
          visibility: hidden;
          height: 0;
          overflow: hidden;
          transform: translateY(15px);
          transition: opacity 0.4s ease, transform 0.4s ease, padding 0.4s ease;
          padding: 0 !important;
        }
        .contact-success-message.active {
          opacity: 1;
          visibility: visible;
          height: auto;
          overflow: visible;
          transform: translateY(0);
          padding: 40px 20px !important;
        }
        .contact-form-inner {
          opacity: 0;
          visibility: hidden;
          height: 0;
          overflow: hidden;
          transform: translateY(15px);
          transition: opacity 0.4s ease, transform 0.4s ease;
        }
        .contact-form-inner.active {
          opacity: 1;
          visibility: visible;
          height: auto;
          overflow: visible;
          transform: translateY(0);
        }

        .contact-left-content {
          text-align: left;
          padding-bottom: 150px;
        }
        .contact-hero-form-wrapper {
          position: relative;
          width: 100%;
          min-height: 100vh;
        }
        .contact-hero-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(15, 18, 17, 0.85) 0%, rgba(184, 141, 20, 0.65) 100%);
          z-index: 1;
        }
        .contact-hero-title {
          font-size: 3.5rem;
          font-weight: 800;
          line-height: 1.2;
          color: #ffffff !important;
        }
        .text-gradient {
          background: linear-gradient(134deg, #F9C33A, #fff0c2);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .contact-grid-layout {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 60px;
          padding: 160px 40px 100px;
          align-items: center;
          position: relative;
          z-index: 2;
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
          color: #ffffff !important;
        }
        .contact-header-new p {
          color: #e2e8f0 !important;
          font-size: 1.1rem;
        }

        .new-contact-form-container {
          padding: 50px;
          border-radius: var(--radius-xl);
          border: 1px solid rgba(255, 255, 255, 0.2) !important;
          background: rgba(255, 255, 255, 0.08) !important;
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          box-shadow: 0 30px 60px rgba(0, 0, 0, 0.3);
          margin-left: -7px;
          margin-right: -83px;
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
        .mar-b {
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
          color: #ffffff !important;
        }

        .req-star {
          color: #ff4d4f;
          margin-left: 4px;
        }

        .glass-input-new {
          width: 100%;
          padding: 14px 16px;
          border-radius: var(--radius-sm);
          border: 1px solid rgba(255, 255, 255, 0.2) !important;
          background: rgba(255, 255, 255, 0.06) !important;
          color: #ffffff !important;
          font-family: inherit;
          font-size: 1rem;
          transition: all 0.3s ease;
        }
        
        .glass-input-new::placeholder {
          color: rgba(255, 255, 255, 0.45);
        }

        .glass-input-new:focus {
          outline: none;
          border-color: #DFBD69 !important;
          background: rgba(255, 255, 255, 0.15) !important;
          box-shadow: 0 0 0 4px rgba(223, 189, 105, 0.2);
        }
        
        .select-new {
          appearance: none;
          background-image: url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23fff%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E");
          background-repeat: no-repeat;
          background-position: right 16px center;
          background-size: 10px auto;
        }

        .select-new option {
          background: #181a19;
          color: #ffffff;
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
          color: #e2e8f0 !important;
        }

        .checkbox-label input {
          width: 18px;
          height: 18px;
          accent-color: #DFBD69;
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

        /* Integrations Section */
        .integrations-section {
          padding: 100px 0;
          background: #1e2630ff !important;
          border-top: 1px solid rgba(255, 255, 255, 0.08);
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
          text-align: center;
        }

        .integrations-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 28px;
          max-width: 1100px;
          margin: 40px auto 0 auto;
        }

        @media (max-width: 991px) {
          .integrations-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 20px;
          }
        }
        @media (max-width: 480px) {
          .integrations-grid {
            grid-template-columns: 1fr;
          }
        }

        .integration-box {
          background: rgba(0, 0, 0, 0.45) !important;
          border: 1px solid rgba(255, 255, 255, 0.1) !important;
          border-radius: 24px;
          padding: 70px 40px;
          min-height: 200px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
          cursor: pointer;
          position: relative;
          overflow: hidden;
        }

        /* Default state for logo images (Grey/Muted) */
        .integration-logo-img {
          max-height: 70px;
          max-width: 90%;
          object-fit: contain;
          filter: grayscale(100%) brightness(0.85) opacity(0.65);
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }

        /* Hover states (Colorful transition) */
        .integration-box:hover {
          background: rgba(255, 255, 255, 0.05);
          transform: translateY(-5px);
          box-shadow: 0 12px 30px rgba(0, 0, 0, 0.4);
        }

        .integration-box:hover .integration-logo-img {
          filter: grayscale(0%) brightness(1) opacity(1);
        }

        /* Naukri Hover */
        .integration-box.naukri-box:hover {
          border-color: #4a90e2 !important;
          box-shadow: 0 12px 30px rgba(74, 144, 226, 0.15);
        }

        /* LinkedIn Hover */
        .integration-box.linkedin-box:hover {
          border-color: #0077b5 !important;
          box-shadow: 0 12px 30px rgba(0, 119, 181, 0.15);
        }

        /* Zoho Hover */
        .integration-box.zoho-box:hover {
          border-color: #ffcc00 !important;
          box-shadow: 0 12px 30px rgba(255, 204, 0, 0.15);
        }

        /* Google Meet Hover */
        .integration-box.googlemeet-box:hover {
          border-color: #00ac47 !important;
          box-shadow: 0 12px 30px rgba(0, 172, 71, 0.15);
        }
        .section-title {
          font-size: 2.5rem;
          font-weight: 800;
          color: #ffffff;
        }
        .contact-faq-section {
          padding: 100px 0;
        }

        @media (min-width: 992px) {
          .contact-left-content h1 span.text-gradient {
            white-space: nowrap;
            display: inline-block;
          }
        }

        @media (max-width: 991px) {
          .contact-grid-layout {
            grid-template-columns: 1fr;
            gap: 40px;
            padding: 120px 20px 60px;
          }
          .contact-left-content {
            text-align: center;
            padding-bottom: 20px;
          }
          .contact-hero-title {
            font-size: 2.5rem !important;
          }
          .contact-hero-desc {
            margin: 20px auto 0 !important;
            text-align: center;
          }
          .new-contact-form-container {
            margin-left: 0 !important;
            margin-right: 0 !important;
            padding: 30px 20px;
          }
          .integration-logo-img {
            filter: grayscale(0%) brightness(1) opacity(1) !important;
          }
          .integration-box.naukri-box {
            border-color: rgba(74, 144, 226, 0.45) !important;
            background: rgba(74, 144, 226, 0.08) !important;
          }
          .integration-box.linkedin-box {
            border-color: rgba(0, 119, 181, 0.45) !important;
            background: rgba(0, 119, 181, 0.08) !important;
          }
          .integration-box.zoho-box {
            border-color: rgba(255, 204, 0, 0.45) !important;
            background: rgba(255, 204, 0, 0.08) !important;
          }
          .integration-box.googlemeet-box {
            border-color: rgba(0, 172, 71, 0.45) !important;
            background: rgba(0, 172, 71, 0.08) !important;
          }
        }
        @media (max-width: 768px) {
          .form-row-2col {
            grid-template-columns: 1fr;
            gap: 16px;
          }
          .new-contact-form {
            gap: 16px !important;
          }
          .form-group-new {
            gap: 6px !important;
          }
          .form-group-new label {
            font-size: 0.9rem !important;
          }
          .glass-input-new {
            padding: 11px 14px !important;
            font-size: 0.95rem !important;
          }
          .new-contact-form textarea {
            height: 110px !important;
          }
          .contact-header-new h2 {
            font-size: 1.8rem !important;
          }
          .contact-header-new p {
            font-size: 0.95rem !important;
          }
          .new-contact-form-container {
            padding: 24px 16px !important;
          }
          .form-submit-btn-new {
            padding: 12px !important;
            font-size: 1rem !important;
          }
          .checkbox-label {
            font-size: 0.85rem !important;
          }
        }
      `}</style>
    </div>
  );
};

export default Contact;