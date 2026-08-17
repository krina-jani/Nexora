import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import industries from "../data/industries";
import { Link, useLocation } from "react-router-dom";
import LineWaves from "../components/common/LineWaves/LineWaves";
import industriesHeroBg from "../assets/images/industries-hero.jpg";
import { FinalCTA, KineticTextBanner } from "../components";
import { 
  FaLaptopCode, 
  FaBrain, 
  FaCloud, 
  FaShieldAlt, 
  FaHeartbeat, 
  FaShoppingCart, 
  FaIndustry, 
  FaGlobe, 
  FaBullhorn,
  FaUtensils 
} from "react-icons/fa";

gsap.registerPlugin(ScrollTrigger);

const iconMap = {
  "software-engineering": <FaLaptopCode />,
  "data-ai": <FaBrain />,
  "cloud-devops": <FaCloud />,
  cybersecurity: <FaShieldAlt />,
  "it-infrastructure": <FaLaptopCode />,
  "qa-testing": <FaLaptopCode />,
  "business-ops": <FaIndustry />,
  "finance-accounting": <FaGlobe />,
  "hr-talent": <FaGlobe />,
  "sales-bd": <FaBullhorn />,
  "food-beverage": <FaUtensils />,
  "healthcare-admin": <FaHeartbeat />,
  "supply-chain": <FaIndustry />
};

const imageMap = {
  "software-engineering": "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=300&q=80",
  "data-ai": "https://images.unsplash.com/photo-1677442136019-21780efad99a?auto=format&fit=crop&w=300&q=80",
  "cloud-devops": "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=300&q=80",
  cybersecurity: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=300&q=80",
  "it-infrastructure": "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=300&q=80",
  "qa-testing": "https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&w=300&q=80",
  "business-ops": "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=300&q=80",
  "finance-accounting": "https://images.unsplash.com/photo-1501167786227-4cba60f6d58f?w=800&auto=format&fit=crop&q=80",
  "hr-talent": "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=300&q=80",
  "sales-bd": "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=300&q=80",
  "food-beverage": "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=300&q=80",
  "healthcare-admin": "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=300&q=80",
  "supply-chain": "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800&auto=format&fit=crop&q=80"
};

const Typewriter = ({ texts, typingSpeed = 75, deletingSpeed = 50, pauseDuration = 1500 }) => {
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);

  useEffect(() => {
    let timer;
    const i = loopNum % texts.length;
    const fullText = texts[i];

    const handleTyping = () => {
      setText(
        isDeleting
          ? fullText.substring(0, text.length - 1)
          : fullText.substring(0, text.length + 1)
      );

      let typeSpeed = isDeleting ? deletingSpeed : typingSpeed;

      if (!isDeleting && text === fullText) {
        typeSpeed = pauseDuration;
        setIsDeleting(true);
      } else if (isDeleting && text === "") {
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
        typeSpeed = 500;
      }

      timer = setTimeout(handleTyping, typeSpeed);
    };

    timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [text, isDeleting, loopNum, texts, typingSpeed, deletingSpeed, pauseDuration]);

  return (
    <span className="text-type">
      {text}
      <span className="cursor">_</span>
    </span>
  );
};

const Industries = () => {
  const pageRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace("#", "");
      const timer = setTimeout(() => {
        const el = document.getElementById(id);
        if (el) {
          const y = el.getBoundingClientRect().top + window.scrollY - 100;
          window.scrollTo({ top: y, behavior: "smooth" });
        }
      }, 350);
      return () => clearTimeout(timer);
    }
  }, [location.hash, location.pathname]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero entrance
      gsap.fromTo(".ind-hero-title", 
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
      );

      const mm = gsap.matchMedia();

      // Mobile layout animations (screens <= 991px)
      mm.add("(max-width: 991px)", () => {
        const industryCards = gsap.utils.toArray(".industry-card");
        industryCards.forEach((card, index) => {
          const isLeft = index % 2 === 0;
          gsap.from(card, {
            scrollTrigger: {
              trigger: card,
              start: "top 88%",
              toggleActions: "play none none none"
            },
            x: isLeft ? -80 : 80,
            opacity: 0,
            duration: 1.0,
            ease: "power2.out"
          });
        });
      });

      // Desktop layout animations (screens > 991px)
      mm.add("(min-width: 992px)", () => {
        gsap.fromTo(".industry-card", 
          { y: 40, opacity: 0 },
          {
            scrollTrigger: {
              trigger: ".industries-grid-section",
              start: "top 80%"
            },
            y: 0,
            opacity: 1,
            stagger: 0.05,
            duration: 0.8,
            ease: "power2.out"
          }
        );
      });
    }, pageRef);

    return () => ctx.revert();
  }, []);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const techIndustries = industries.filter(ind => ind.category === "tech");
  const nonTechIndustries = industries.filter(ind => ind.category === "non-tech");

  return (
    <div ref={pageRef} className="industries-page-wrapper" style={{ background: "#000000" }}>
      {/* Hero */}
      <section 
        className="industries-hero text-center" 
        style={{ 
          position: "relative", 
          overflow: "hidden",
          backgroundImage: `url(${industriesHeroBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <div className="container" style={{ position: "relative", zIndex: 1 }}>
          <h1 className="ind-hero-title">
            Career Opportunities <span className="text-gradient">Across Tech Careers, Professional & Business Careers</span>
          </h1>
          <p className="ind-hero-sub text-light">
            Nexora Career supports qualified professionals targeting opportunities in the US job market across technology, business, and other professional functions.
          </p>
        </div>
      </section>

      {/* Category Index Selector */}
      <section className="category-selector-section">
        <div className="container">
          <div className="category-cards-grid">
            <div className="cat-select-card glass" onClick={() => scrollToSection("tech-careers")}>
              <div className="cat-icon-wrap"><FaLaptopCode /></div>
              <h2>Technology Careers</h2>
              <p>Prepare for software engineering, data, cloud, cybersecurity, IT, and QA/testing roles.</p>
              <span className="cat-arrow">Explore Tech Paths &darr;</span>
            </div>
            <div className="cat-select-card glass" onClick={() => scrollToSection("non-tech-careers")}>
              <div className="cat-icon-wrap"><FaIndustry /></div>
              <h2>Professional Careers</h2>
              <p>Explore business, finance, accounting, HR, marketing, operations, and logistics paths.</p>
              <span className="cat-arrow">Explore Non-Tech Paths &darr;</span>
            </div>
          </div>
        </div>
      </section>

      {/* Technology Section */}
      <section id="tech-careers" className="industries-grid-section" style={{ position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, zIndex: 0, opacity: 0.15 }}>
          <LineWaves
            speed={0.15}
            innerLineCount={36}
            outerLineCount={40}
            warpIntensity={0.6}
            rotation={45}
            edgeFadeWidth={0.1}
            colorCycleSpeed={0.3}
            brightness={0.1}
            color1="#ffffff"
            color2="#DFBD69"
            color3="#ffffff"
            enableMouseInteraction={true}
            mouseInfluence={1.0}
          />
        </div>
        <div className="container" style={{ position: "relative", zIndex: 1 }}>
          <div className="section-header-wrap">
            <h2 className="section-title">Technology Careers</h2>
            <p className="section-desc text-light">
              Technology careers span software engineering, data, cloud, cybersecurity, IT infrastructure, and QA testing. Nexora Career helps professionals prepare and position their experience for relevant opportunities in the US job market.
            </p>
          </div>
          
          <div className="industries-grid">
            {techIndustries.map((ind) => (
              <div key={ind.id} className="industry-card glass">
                <div 
                  className="card-bg-image" 
                  style={{ backgroundImage: `url(${imageMap[ind.id]})` }}
                ></div>
                
                <div className="card-top-row">
                  <div className="ind-icon-box">
                    {iconMap[ind.id]}
                  </div>
                  <div className="ind-dot-accent"></div>
                </div>

                <h3>{ind.title}</h3>
                <p className="ind-desc">{ind.description}</p>
                
                <div className="ind-details">
                  <div className="ind-roles">
                    <h4>{ind.rolesLabel || "Example Career Paths"}</h4>
                    <ul>
                      {ind.roles?.map((role, i) => (
                        <li key={i}>{role}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="ind-skills">
                    <div className="skill-tags">
                      {ind.skills?.map((skill, i) => (
                        <span key={i} className="skill-tag">{skill}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Non-Tech Section */}
      <section id="non-tech-careers" className="industries-grid-section" style={{ position: "relative", overflow: "hidden", borderTop: "1px solid rgba(255, 255, 255, 0.08)" }}>
        <div className="container" style={{ position: "relative", zIndex: 1 }}>
          <div className="section-header-wrap">
            <h2 className="section-title">Professional & Business Careers Across Tech </h2>
            <p className="section-desc text-light">
              US employers hire professionals across business, finance, operations, marketing, HR, healthcare administration, and supply chain functions. Nexora Career helps candidates present their experience clearly and prepare for relevant opportunities.
            </p>
          </div>
          
          <div className="industries-grid">
            {nonTechIndustries.map((ind) => (
              <div key={ind.id} className="industry-card glass">
                <div 
                  className="card-bg-image" 
                  style={{ backgroundImage: `url(${imageMap[ind.id]})` }}
                ></div>
                
                <div className="card-top-row">
                  <div className="ind-icon-box">
                    {iconMap[ind.id]}
                  </div>
                  <div className="ind-dot-accent"></div>
                </div>

                <h3>{ind.title}</h3>
                <p className="ind-desc">{ind.description}</p>
                
                <div className="ind-details">
                  <div className="ind-roles">
                    <h4>{ind.rolesLabel || "Example Career Paths"}</h4>
                    <ul>
                      {ind.roles?.map((role, i) => (
                        <li key={i}>{role}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="ind-skills">
                    <div className="skill-tags">
                      {ind.skills?.map((skill, i) => (
                        <span key={i} className="skill-tag">{skill}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pinned Kinetic Scroll Banner */}
      <KineticTextBanner text="DISCOVER OPPORTUNITIES • WITH NEXORA CAREER" />

      {/* Global CTA */}
      <FinalCTA 
        heading="Ready to Explore Your Next Career Move?"
        subheading="Discuss your experience, target roles, and goals with a Nexora Career specialist. We'll help you understand the next steps for pursuing relevant opportunities in the US job market."
        primaryBtnText="Schedule Career Consultation"
        primaryBtnLink="/contact"
        secondaryBtnText="Explore Services"
        secondaryBtnLink="/services"
      />

      {/* Styles */}
      <style>{`
        .ind-cta-heading {
          min-height: 80px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 15px;
        }

        .text-type {
          white-space: pre-wrap;
        }

        .cursor {
          display: inline-block;
          margin-left: 5px;
          animation: blink 0.75s infinite;
          color: var(--primary);
        }

        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        .industries-hero {
          padding: 160px 0 60px;
          background: linear-gradient(rgba(255, 255, 255, 0), rgba(251, 253, 255, 0.14)), url(${industriesHeroBg}) center/cover no-repeat !important;
        }
        .industries-grid-section {
          background: #000000 !important;
          padding: 80px 0 100px;
        }
        .ind-hero-title {
          font-size: 3.5rem;
          font-weight: 800;
          margin-bottom: 20px;
          color: #ffffff !important;
        }
         
        .ind-hero-sub {
          font-size: 1.25rem;
          max-width: 750px;
          margin: 0 auto;
          color: #cccccc !important;
          line-height: 1.6;
        }
        .text-gradient {
          background: linear-gradient(134deg, #df830d, #f59e0b);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        
        /* Category index styling */
        .category-selector-section {
          background: #000000;
          padding: 40px 0;
        }
        .category-cards-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 30px;
          max-width: 900px;
          margin: 0 auto;
        }
        .cat-select-card {
          padding: 30px;
          border-radius: var(--radius-md);
          border: 1px solid rgba(255, 255, 255, 0.12) !important;
          background: rgba(255, 255, 255, 0.05) !important;
          backdrop-filter: blur(12px) !important;
          cursor: pointer;
          transition: all 0.35s ease;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
        }
        .cat-select-card:hover {
          border-color: #DFBD69 !important;
          transform: translateY(-5px);
          box-shadow: 0 10px 30px rgba(223, 189, 105, 0.15);
        }
        .cat-icon-wrap {
          font-size: 2.2rem;
          color: #DFBD69;
          margin-bottom: 15px;
        }
        .cat-select-card h2 {
          font-size: 1.5rem;
          color: #ffffff;
          margin-bottom: 10px;
          font-weight: 700;
        }
        .cat-select-card p {
          color: #cccccc;
          font-size: 0.95rem;
          line-height: 1.5;
          margin-bottom: 20px;
        }
        .cat-arrow {
          font-weight: 600;
          color: #DFBD69;
          font-size: 0.9rem;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .section-header-wrap {
          max-width: 800px;
          margin: 0 auto 50px auto;
          text-align: center;
        }
        .section-title {
          font-size: 2.5rem;
          font-weight: 700;
          color: #ffffff;
          margin-bottom: 15px;
        }
        .section-desc {
          font-size: 1.1rem;
          line-height: 1.6;
          color: #cccccc !important;
        }

        .industries-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          gap: 30px;
        }
        .industry-card {
          padding: 35px 24px;
          border-radius: var(--radius-md);
          border: 1px solid rgba(255, 255, 255, 0.12) !important;
          background: rgba(255, 255, 255, 0.05) !important;
          backdrop-filter: blur(12px) !important;
          -webkit-backdrop-filter: blur(12px) !important;
          position: relative;
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
          display: flex;
          flex-direction: column;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.25);
        }
        .industry-card:hover {
          border-color: #DFBD69 !important;
          transform: translateY(-8px);
          box-shadow:
            0 0 20px rgba(223, 189, 105, 0.15),
            0 0 60px rgba(223, 189, 105, 0.08) !important;
        }
        .ind-dot-accent {
          width: 8px;
          height: 8px;
          background: #DFBD69 !important;
          border-radius: 50%;
        }
        .industry-card h3 {
          font-size: 1.35rem;
          font-weight: 700;
          margin-bottom: 12px;
          color: #ffffff !important;
          position: relative;
          z-index: 2;
        }
        .industry-card .ind-desc {
          font-size: 0.95rem;
          line-height: 1.65;
          color: #cccccc !important;
          margin-bottom: 24px;
          position: relative;
          z-index: 2;
        }
        .ind-details {
          display: flex;
          flex-direction: column;
          gap: 20px;
          padding-top: 20px;
          border-top: 1px solid rgba(255, 255, 255, 0.08) !important;
          position: relative;
          z-index: 2;
          flex-grow: 1;
        }
        .ind-skills {
          margin-top: auto;
        }
        .ind-roles h4, .ind-skills h4 {
          font-size: 0.9rem;
          font-weight: 600;
          color: #ffffff !important;
          margin-bottom: 10px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        .ind-roles ul {
          list-style: none;
          padding: 0;
          margin: 0;
        }
        .ind-roles li {
          font-size: 0.9rem;
          color: #cccccc !important;
          margin-bottom: 6px;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .ind-roles li::before {
          content: '•';
          color: #DFBD69 !important;
          font-weight: bold;
        }
        .skill-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }
        .skill-tag {
          font-size: 0.8rem;
          background: rgba(255, 255, 255, 0.08) !important;
          color: #ffffff !important;
          padding: 4px 10px;
          border-radius: 4px;
          border: 1px solid rgba(255, 255, 255, 0.15) !important;
          font-weight: 500;
        }
        .card-top-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
          position: relative;
          z-index: 2;
        }
 
        .ind-icon-box {
          font-size: 1.8rem;
          color: #DFBD69 !important;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(255, 255, 255, 0.05);
          padding: 10px;
          border-radius: 12px;
          width: fit-content;
        }
 
        .card-bg-image {
          position: absolute;
          bottom: 0;
          right: 0;
          width: 160px;
          height: 160px;
          background-size: cover;
          background-repeat: no-repeat;
          background-position: center;
          opacity: 0.08;
          pointer-events: none;
          z-index: 1;
          border-bottom-right-radius: var(--radius-md);
          mask-image: linear-gradient(to top left, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 80%);
          -webkit-mask-image: linear-gradient(to top left, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 80%);
        }
 
        @media (max-width: 991px) {
          .industries-grid {
            grid-template-columns: repeat(2, 1fr);
          }
          .ind-hero-title {
            font-size: 2.8rem;
          }
          .category-cards-grid {
            gap: 20px;
            padding: 0 20px;
          }
        }
        @media (max-width: 768px) {
          .category-cards-grid {
            grid-template-columns: 1fr;
            max-width: 480px;
          }
          .section-title {
            font-size: 2rem;
          }
        }
        @media (max-width: 576px) {
          .industries-grid {
            grid-template-columns: 1fr;
          }
          .ind-hero-title {
            font-size: 2.2rem !important;
          }
          .ind-hero-sub {
            font-size: 1.05rem !important;
          }
        }
      `}</style>
    </div>
  );
};

export default Industries;