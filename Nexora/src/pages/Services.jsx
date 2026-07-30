import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import gsap from "gsap";
import services from "../data/services";
import Accordion from "../components/common/Accordion";
import faq from "../data/faq";

const Services = () => {
  const pageRef = useRef(null);
  const location = useLocation();

  // Scroll to hash on mount
  useEffect(() => {
    if (location.hash) {
      setTimeout(() => {
        const id = location.hash.replace('#', '');
        const element = document.getElementById(id);
        if (element) {
          const y = element.getBoundingClientRect().top + window.scrollY - 120;
          window.scrollTo({ top: y, behavior: 'smooth' });
        }
      }, 500); // Wait for GSAP and render
    }
  }, [location.hash]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero entrance
      gsap.from(".services-hero-title", {
        y: 60,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out"
      });

      // Cards reveal as they enter viewport
      gsap.utils.toArray(".detailed-service-content").forEach((content) => {
        gsap.from(content, {
          scrollTrigger: {
            trigger: content,
            start: "top 85%"
          },
          x: -50,
          opacity: 0,
          duration: 0.8,
          ease: "power2.out",
          clearProps: "all"
        });
      });

      gsap.utils.toArray(".detailed-service-image").forEach((img) => {
        gsap.from(img, {
          scrollTrigger: {
            trigger: img,
            start: "top 85%"
          },
          x: 50,
          opacity: 0,
          duration: 0.8,
          ease: "power2.out",
          clearProps: "all"
        });
      });

      // Pricing layout reveal
      gsap.from(".pricing-card", {
        scrollTrigger: {
          trigger: ".pricing-wrapper",
          start: "top 85%"
        },
        y: 50,
        opacity: 0,
        stagger: 0.2,
        duration: 0.8,
        ease: "power3.out"
      });
    }, pageRef);

    return () => ctx.revert();
  }, []);

  const pricingPlans = [
    {
      title: "Basic Review",
      price: "$199",
      period: "One-time",
      features: [
        "ATS Resume Review & Feedback",
        "LinkedIn Profile Audit",
        "1 Mock Interview (60 mins)",
        "30 Days Email Support"
      ],
      popular: false
    },
    {
      title: "Career Placement Pro",
      price: "$599",
      period: "Quarterly",
      features: [
        "Custom ATS Resume Building",
        "Full LinkedIn Profile Makeover",
        "5 Mock Interviews with FAANG Mentors",
        "Direct Referrals to Partner network",
        "Dedicated Career Coach Support"
      ],
      popular: true
    },
    {
      title: "Global Relocation Elite",
      price: "$1,499",
      period: "Until Hired",
      features: [
        "Everything in Placement Pro Plan",
        "Global Job Placement Strategies",
        "Visa & Work Permit Application Help",
        "Direct referrals to EU & USA tech hubs",
        "Unlimited mock interviews"
      ],
      popular: false
    }
  ];

  return (
    <div ref={pageRef} className="services-page-wrapper">
      {/* Hero */}
      <section className="services-hero text-center">
        <div className="container">
          <h1 className="services-hero-title">
            Our Elite <span className="text-gradient">Career Services</span>
          </h1>
          <p className="services-hero-sub text-light">
            Engineered to refine your professional profile, build technical authority, and guide you directly to job offers.
          </p>
        </div>
      </section>

      {/* How It Works / Process Section */}
      <section className="process-section">
        <div className="container">
          <div className="text-center section-header">
            <h2 className="section-title">Our Proven Process</h2>
            <p className="text-light">A strategic, step-by-step approach to elevate your career.</p>
          </div>
          
          <div className="process-grid">
            <div className="process-step">
              <h4>Discovery & Audit</h4>
              <p>We analyze your current profile, skills, and career goals to identify gaps and opportunities.</p>
            </div>
            <div className="process-step">
              <h4>Strategic Planning</h4>
              <p>Our experts craft a personalized roadmap, including resume revamps and upskilling plans.</p>
            </div>
            <div className="process-step">
              <h4>Execution & Prep</h4>
              <p>You undergo rigorous mock interviews, branding exercises, and technical assessments.</p>
            </div>
            <div className="process-step">
              <h4>Placement & Growth</h4>
              <p>We leverage our network to land you interviews and help negotiate your best offer.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="why-choose-us">
        <div className="container">
          <div className="why-grid">
            <div className="why-content">
              <h2 className="section-title">Why Professionals Choose Nexora</h2>
              <p className="text-light">
                We don't just give advice; we partner with you to achieve tangible results. Our data-driven methodologies and exclusive industry connections give you an unfair advantage in the job market.
              </p>
              <ul className="why-list">
                <li>
                  <span className="check-icon">✓</span>
                  <div>
                    <strong>Elite Industry Mentors</strong>
                    <p>Learn directly from professionals at top-tier global companies.</p>
                  </div>
                </li>
                <li>
                  <span className="check-icon">✓</span>
                  <div>
                    <strong>Data-Driven Strategies</strong>
                    <p>We use market analytics to position you exactly where demand is highest.</p>
                  </div>
                </li>
                <li>
                  <span className="check-icon">✓</span>
                  <div>
                    <strong>Global Hiring Network</strong>
                    <p>Direct referrals to fast-growing startups and Fortune 500 enterprises.</p>
                  </div>
                </li>
              </ul>
            </div>
            <div className="why-image-wrapper">
              <div className="glass why-image-card">
                <div className="stat-item">
                  <h3 className="text-gradient">93%</h3>
                  <p>Placement Rate</p>
                </div>
                <div className="stat-item">
                  <h3 className="text-gradient">40%</h3>
                  <p>Average Salary Hike</p>
                </div>
                <div className="stat-item">
                  <h3 className="text-gradient">500+</h3>
                  <p>Hiring Partners</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Detailed Services Sections (Mapped to Dropdown IDs) */}
      <div className="detailed-services-wrapper">
        {services.map((svc, index) => (
          <section key={svc.id} id={svc.id} className={`detailed-service-section ${index % 2 !== 0 ? 'alt-layout' : ''}`}>
            <div className="container">
              <div className="detailed-service-grid">
                
                <div className="detailed-service-content">
                  <div className="service-icon-box">
                    <span className="dot-indicator"></span>
                  </div>
                  <h2 className="service-title">{svc.title}</h2>
                  <p className="service-desc">{svc.description}</p>
                  <ul className="service-benefits-list">
                    <li><span className="check">✓</span> Comprehensive Analysis & Strategy</li>
                    <li><span className="check">✓</span> Dedicated Expert Support</li>
                    <li><span className="check">✓</span> Result-Oriented Execution</li>
                  </ul>
                  <button className="btn-primary mt-4">Get Started</button>
                </div>
                
                <div className="detailed-service-image-col">
                  <div className="detailed-service-image glass">
                    <img src={svc.image} alt={svc.title} className="service-actual-image" />
                  </div>
                </div>

              </div>
            </div>
          </section>
        ))}
      </div>

      {/* Pricing wrapper */}
      <section className="pricing-wrapper">
        <div className="container">
          <h2 className="text-center section-title">Simple, Transparent Pricing</h2>
          <div className="pricing-grid">
            {pricingPlans.map((plan, idx) => (
              <div key={idx} className={`pricing-card glass ${plan.popular ? "popular" : ""}`}>
                {plan.popular && <span className="popular-badge">Most Popular</span>}
                <h3>{plan.title}</h3>
                <div className="price-amount">
                  <span className="amount">{plan.price}</span>
                  <span className="period">/{plan.period}</span>
                </div>
                <ul className="plan-features">
                  {plan.features.map((feat, fIdx) => (
                    <li key={fIdx}>✓ {feat}</li>
                  ))}
                </ul>
                <button className={`btn-primary plan-btn ${!plan.popular ? "btn-secondary" : ""}`}>
                  Choose Plan
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="services-faq-section">
        <div className="container">
          <h2 className="text-center section-title">Frequently Asked Questions</h2>
          <Accordion items={faq} />
        </div>
      </section>

      {/* Styles */}
      <style>{`
        .services-hero {
          padding: 80px 0 40px;
        }
        .services-hero-title {
          font-size: 3.5rem;
          font-weight: 800;
          margin-bottom: 20px;
        }
        .services-hero-sub {
          font-size: 1.2rem;
          max-width: 600px;
          margin: 0 auto;
        }
        .text-gradient {
          background: linear-gradient(90deg, var(--primary), var(--primary-light));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        
        /* Detailed Services Section */
        .detailed-services-wrapper {
          padding: 60px 0;
        }
        
        .detailed-service-section {
          padding: 100px 0;
          border-bottom: 1px solid var(--border);
        }
        
        .detailed-service-section:last-child {
          border-bottom: none;
        }
        
        .detailed-service-section.alt-layout {
          background: var(--bg-soft);
        }
        
        .detailed-service-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 80px;
          align-items: center;
        }
        
        .alt-layout .detailed-service-grid {
          direction: rtl; /* simple trick to swap columns */
        }
        
        .alt-layout .detailed-service-content,
        .alt-layout .detailed-service-image-col {
          direction: ltr;
        }
        
        .process-step h4, .process-step p {
          position: relative;
          z-index: 2;
        }
        
        .process-step h4 {
          font-size: 1.2rem;
          font-weight: 700;
          margin-bottom: 15px;
          color: var(--heading);
        }
        
        .process-step p {
          color: var(--text-light);
          line-height: 1.6;
          font-size: 0.95rem;
        }
        
        .service-title {
          font-size: 2.5rem;
          font-weight: 800;
          margin-bottom: 20px;
          color: var(--heading);
        }
        
        .service-desc {
          font-size: 1.1rem;
          line-height: 1.7;
          color: var(--text-light);
          margin-bottom: 30px;
        }
        
        .service-benefits-list {
          list-style: none;
          margin-bottom: 40px;
          display: flex;
          flex-direction: column;
          gap: 15px;
        }
        
        .service-benefits-list li {
          display: flex;
          align-items: center;
          gap: 12px;
          font-size: 1rem;
          color: var(--text);
          font-weight: 500;
        }
        
        .check {
          color: var(--primary);
          font-weight: bold;
          font-size: 1.2rem;
        }
        
        .detailed-service-image {
          aspect-ratio: 4/3;
          border-radius: var(--radius-lg);
          border: 1px solid var(--border);
          position: relative;
          overflow: hidden;
          background: var(--bg-soft);
        }
        
        .service-actual-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 0.5s ease;
        }
        
        .detailed-service-section:hover .service-actual-image {
          transform: scale(1.05);
        }
        
        .mt-4 {
          margin-top: 2rem;
        }
        .section-header {
          margin-bottom: 50px;
        }
        
        .process-section {
          padding: 100px 0;
          background: var(--bg-soft);
        }
        
        .process-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 30px;
          position: relative;
        }
        
        .process-step {
          --gh-bg: var(--surface-solid);
          --gh-br: var(--radius-lg);
          --gh-border: var(--border);
          --gh-angle: -30deg;
          --gh-duration: 800ms;
          --gh-size: 300%;
          --gh-rgba: rgba(72, 201, 44, 0.25);
          
          background: var(--gh-bg);
          padding: 40px 30px;
          border-radius: var(--gh-br);
          border: 1px solid var(--gh-border);
          position: relative;
          transition: var(--transition);
          overflow: hidden;
          cursor: pointer;
        }
        
        [data-theme='dark'] .process-step {
          --gh-rgba: rgba(255, 255, 255, 0.15);
        }
        
        .process-step::before {
          content: "";
          position: absolute;
          inset: 0;
          background: linear-gradient(
              var(--gh-angle),
              transparent 60%,
              var(--gh-rgba) 70%,
              transparent 80%,
              transparent 100%
          );
          background-size: var(--gh-size) var(--gh-size);
          background-repeat: no-repeat;
          background-position: -100% -100%;
          transition: background-position var(--gh-duration) ease;
          pointer-events: none;
          z-index: 1;
        }

        .process-step:hover::before {
          background-position: 100% 100%;
        }
        
        .process-step:hover {
          transform: translateY(-5px);
          box-shadow: var(--shadow-md);
          border-color: var(--primary);
        }

        
        .process-step h4 {
          font-size: 1.2rem;
          margin-bottom: 15px;
          color: var(--heading);
          position: relative;
          z-index: 2;
        }
        
        .process-step p {
          color: var(--text-light);
          font-size: 0.95rem;
          line-height: 1.6;
          position: relative;
          z-index: 2;
        }
        
        .why-choose-us {
          padding: 100px 0;
        }
        
        .why-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 60px;
          align-items: center;
        }
        
        .why-list {
          list-style: none;
          margin-top: 40px;
          display: flex;
          flex-direction: column;
          gap: 25px;
        }
        
        .why-list li {
          display: flex;
          gap: 20px;
          align-items: flex-start;
        }
        
        .check-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          min-width: 30px;
          height: 30px;
          background: rgba(72, 201, 44, 0.15);
          color: var(--primary);
          border-radius: 50%;
          font-weight: bold;
          font-size: 0.9rem;
        }
        
        .why-list strong {
          display: block;
          font-size: 1.1rem;
          color: var(--heading);
          margin-bottom: 6px;
        }
        
        .why-list p {
          color: var(--text-light);
          font-size: 0.95rem;
          line-height: 1.5;
        }
        
        .why-image-card {
          display: grid;
          grid-template-columns: 1fr;
          gap: 30px;
          padding: 50px;
          border-radius: var(--radius-lg);
          border: 1px solid var(--border);
          text-align: center;
        }
        
        .stat-item h3 {
          font-size: 3rem;
          font-weight: 800;
          margin-bottom: 10px;
        }
        
        .stat-item p {
          color: var(--text);
          font-size: 1.1rem;
          font-weight: 500;
        }

        .pricing-wrapper {
          padding: 100px 0;
          background: var(--bg-soft);
        }
        .pricing-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 30px;
          margin-top: 50px;
        }
        .pricing-card {
          padding: 45px 35px;
          border-radius: var(--radius-lg);
          border: 1px solid var(--border);
          position: relative;
          display: flex;
          flex-direction: column;
          gap: 24px;
          background: var(--white);
        }
        .pricing-card.popular {
          border-color: var(--primary);
          box-shadow: var(--shadow-lg);
          transform: scale(1.03);
        }
        .popular-badge {
          position: absolute;
          top: 15px;
          right: 20px;
          background: var(--primary);
          color: var(--white);
          padding: 4px 12px;
          border-radius: var(--radius-full);
          font-size: 0.75rem;
          font-weight: 600;
        }
        .pricing-card h3 {
          font-size: 1.4rem;
          font-weight: 700;
        }
        .price-amount {
          display: flex;
          align-items: baseline;
        }
        .amount {
          font-size: 2.8rem;
          font-weight: 800;
          color: var(--heading);
        }
        .period {
          font-size: 0.95rem;
          color: var(--text-light);
        }
        .plan-features {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 12px;
          font-size: 0.95rem;
          color: var(--text);
        }
        .plan-btn {
          margin-top: auto;
          width: 100%;
        }
        .btn-secondary {
          background: transparent;
          border: 1.5px solid var(--primary);
          color: var(--primary);
          box-shadow: none;
        }
        .btn-secondary:hover {
          background: var(--primary);
          color: var(--white);
        }
        .services-faq-section {
          padding: 100px 0;
        }
        @media (max-width: 991px) {
          .pricing-grid, .why-grid {
            grid-template-columns: 1fr;
            gap: 40px;
          }
          .process-grid {
            grid-template-columns: 1fr 1fr;
          }
          .detailed-service-grid, .alt-layout .detailed-service-grid {
            grid-template-columns: 1fr;
            gap: 40px;
            direction: ltr; /* Reset swap */
          }
          .service-title {
            font-size: 2rem;
          }
          .detailed-service-section {
            padding: 60px 0;
          }
          .pricing-card.popular {
            transform: none;
          }
          .services-list-grid {
            grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          }
        }
        @media (max-width: 576px) {
          .process-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
};

export default Services;