import { useEffect, useRef } from "react";
import gsap from "gsap";
import services from "../data/services";
import Accordion from "../components/common/Accordion";
import faq from "../data/faq";

const Services = () => {
  const pageRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero entrance
      gsap.from(".services-hero-title", {
        y: 60,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out"
      });

      // Cards staggered reveal
      gsap.from(".service-list-card", {
        scrollTrigger: {
          trigger: ".services-list-grid",
          start: "top 80%"
        },
        y: 40,
        opacity: 0,
        stagger: 0.1,
        duration: 0.8,
        ease: "power2.out"
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

      {/* Services List Grid */}
      <section className="services-list-section">
        <div className="container">
          <div className="services-list-grid">
            {services.map((svc) => (
              <div key={svc.id} className="service-list-card glass">
                <div className="service-icon-box">
                  <span className="dot-indicator"></span>
                </div>
                <h3>{svc.title}</h3>
                <p>{svc.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

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
        .services-list-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 30px;
          margin-top: 40px;
        }
        .service-list-card {
          padding: 30px;
          border-radius: var(--radius-md);
          border: 1px solid var(--border);
          transition: var(--transition);
        }
        .service-list-card:hover {
          border-color: var(--primary);
          transform: translateY(-5px);
          box-shadow: var(--shadow-md);
        }
        .service-icon-box {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background: var(--bg-soft);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 20px;
        }
        .dot-indicator {
          width: 10px;
          height: 10px;
          background: var(--primary);
          border-radius: 50%;
          box-shadow: var(--glow);
        }
        .service-list-card h3 {
          font-size: 1.3rem;
          margin-bottom: 12px;
          color: var(--heading);
        }
        .service-list-card p {
          color: var(--text);
          font-size: 0.95rem;
          line-height: 1.6;
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
          .pricing-grid {
            grid-template-columns: 1fr;
            gap: 40px;
          }
          .pricing-card.popular {
            transform: none;
          }
          .services-list-grid {
            grid-template-columns: 1fr 1fr;
          }
        }
        @media (max-width: 576px) {
          .services-list-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
};

export default Services;