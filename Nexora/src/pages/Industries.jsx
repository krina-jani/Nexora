import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import industries from "../data/industries";
import { Link } from "react-router-dom";
import LineWaves from "../components/common/LineWaves/LineWaves";
import industriesHeroBg from "../assets/images/industries-hero.jpg";
import { 
  FaLaptopCode, 
  FaBrain, 
  FaCloud, 
  FaShieldAlt, 
  FaHeartbeat, 
  FaShoppingCart, 
  FaIndustry, 
  FaGlobe, 
  FaBullhorn 
} from "react-icons/fa";

gsap.registerPlugin(ScrollTrigger);

const iconMap = {
  it: <FaLaptopCode />,
  ai: <FaBrain />,
  cloud: <FaCloud />,
  cyber: <FaShieldAlt />,
  health: <FaHeartbeat />,
  ecommerce: <FaShoppingCart />,
  manufacturing: <FaIndustry />,
  gcc: <FaGlobe />,
  "digital-marketing": <FaBullhorn />
};

const imageMap = {
  it: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=300&q=80",
  ai: "https://images.unsplash.com/photo-1677442136019-21780efad99a?auto=format&fit=crop&w=300&q=80",
  cloud: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=300&q=80",
  cyber: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=300&q=80",
  health: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=300&q=80",
  ecommerce: "https://images.unsplash.com/photo-1557821314-4b9644db218e?auto=format&fit=crop&w=300&q=80",
  manufacturing: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=300&q=80",
  gcc: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=300&q=80",
  "digital-marketing": "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=300&q=80"
};

const Typewriter = ({ texts, typingSpeed = 75, deletingSpeed = 50, pauseDuration = 1500, loop = true }) => {
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
        // Alternating slide-in animations for industry cards
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

        // Alternating slide-in animations for case study cards
        const caseStudyCards = gsap.utils.toArray(".case-study-card");
        caseStudyCards.forEach((card, index) => {
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

        // Alternating slide-in animation for CTA box
        gsap.from(".ind-cta-box", {
          scrollTrigger: {
            trigger: ".ind-cta-box",
            start: "top 88%",
            toggleActions: "play none none none"
          },
          x: -80,
          opacity: 0,
          duration: 1.0,
          ease: "power2.out"
        });
      });

      // Desktop layout animations (screens > 991px)
      mm.add("(min-width: 992px)", () => {
        // Cards staggered reveal
        gsap.fromTo(".industry-card", 
          { y: 40, opacity: 0 },
          {
            scrollTrigger: {
              trigger: ".industries-grid",
              start: "top 80%"
            },
            y: 0,
            opacity: 1,
            stagger: 0.08,
            duration: 0.8,
            ease: "power2.out"
          }
        );

        // Case studies slide in
        gsap.fromTo(".case-study-card", 
          { x: -50, opacity: 0 },
          {
            scrollTrigger: {
              trigger: ".case-studies-section",
              start: "top 75%"
            },
            x: 0,
            opacity: 1,
            stagger: 0.15,
            duration: 0.8,
            ease: "power2.out"
          }
        );

        // CTA Box slide up
        gsap.from(".ind-cta-box", {
          scrollTrigger: {
            trigger: ".ind-cta-box",
            start: "top 85%"
          },
          y: 40,
          opacity: 0,
          duration: 0.8,
          ease: "power2.out"
        });
      });
    }, pageRef);

    return () => ctx.revert();
  }, []);

  const caseStudies = [
    {
      title: "Transition to Fintech SDE",
      student: "Arjun Mehta",
      details: "Switched from a traditional chemical engineering role to a Senior Java developer position at a top-tier European fintech firm.",
      package: "€78,000 / Year",
      badge: "Fintech Switch"
    },
    {
      title: "AI Researcher Placement",
      student: "Sara Vance",
      details: "Guided a graduate student through research paper presentation and advanced ML coding mock loops, landing an offer in Silicon Valley.",
      package: "$145,000 / Year",
      badge: "AI & Data Science"
    }
  ];

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
            Global Placement <span className="text-gradient">By Industry</span>
          </h1>
          <p className="ind-hero-sub text-light">
            We support career trajectories across massive global domains. Our mentors specialize in training for specific technical interviews.
          </p>
        </div>
      </section>

      {/* Industry Grid */}
      <section className="industries-grid-section" style={{ position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, zIndex: 0, opacity: 0.2 }}>
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
          <div className="industries-grid">
            {industries.map((ind) => (
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
                    <h4>Popular Roles</h4>
                    <ul>
                      {ind.roles?.map((role, i) => (
                        <li key={i}>{role}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="ind-skills">
                    {/* <h4>Skills</h4> */}
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

      {/* Case Studies */}
      <section className="case-studies-section">
        <div className="container">
          <h2 className="text-center section-title txt-white">Domain Switch Success Stories</h2>
          <div className="case-studies-grid">
            {caseStudies.map((cs, idx) => (
              <div key={idx} className="case-study-card glass">
                <span className="case-badge">{cs.badge}</span>
                <h3>{cs.title}</h3>
                <p className="case-student">Candidate: <strong>{cs.student}</strong></p>
                <p className="case-text">{cs.details}</p>
                <div className="case-footer">
                  <span className="case-pkg">Compensation: {cs.package}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Global CTA */}
      <section className="ind-cta-section text-center">
        <div className="container ind-cta-box glass">
          <h2 className="ind-cta-heading">
            <Typewriter 
              texts={[
                "Ready to switch your industry?",
                "Explore new career horizons.",
              ]} 
            />
          </h2>
          <p>
            Book a 1-on-1 diagnostic call with our specialists. We'll map your transferable skills and build your personalized transition roadmap.
          </p>
          <Link to="/contact" className="btn-primary">
            Schedule Diagnostic Session
          </Link>
        </div>
      </section>

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

        .txt-white{
          color: white !important;
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
          padding: 60px 0 100px;
        }
        .ind-hero-title {
          font-size: 3.8rem;
          font-weight: 800;
          margin-bottom: 20px;
          color: #ffffff !important;
        }
         
        .ind-hero-sub {
          font-size: 1.25rem;
          max-width: 650px;
          margin: 0 auto;
          color: #cccccc !important;
        }
        .text-gradient {
          background: linear-gradient(134deg, #df830d, #f59e0b);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .industries-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          gap: 30px;
          margin-top: 40px;
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
          margin-top: auto;
          display: flex;
          flex-direction: column;
          gap: 20px;
          padding-top: 20px;
          border-top: 1px solid rgba(255, 255, 255, 0.08) !important;
          position: relative;
          z-index: 2;
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
        .case-studies-section {
          padding: 100px 0;
          background: #1e2630ff !important;
        }
        .case-studies-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 40px;
          margin-top: 40px;
        }
        .case-study-card {
          padding: 40px;
          border-radius: var(--radius-lg);
          border: 1px solid rgba(255, 255, 255, 0.12) !important;
          background: rgba(255, 255, 255, 0.05) !important;
          backdrop-filter: blur(12px) !important;
          -webkit-backdrop-filter: blur(12px) !important;
          display: flex;
          flex-direction: column;
          gap: 16px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
          cursor: pointer;
        }
        .case-study-card:hover {
          transform: translateY(-8px);
          border-color: #DFBD69 !important;
          box-shadow:
            0 0 20px rgba(223, 189, 105, 0.15),
            0 0 60px rgba(223, 189, 105, 0.08) !important;
        }
        .case-badge {
          align-self: flex-start;
          background: #DFBD69 !important;
          color: #000000 !important;
          padding: 4px 12px;
          border-radius: var(--radius-full);
          font-size: 0.8rem;
          font-weight: 600;
          box-shadow: 0 0 10px rgba(223, 189, 105, 0.2);
        }
        .case-study-card h3 {
          font-size: 1.4rem;
          font-weight: 700;
          color: #ffffff !important;
        }
        .case-student {
          font-size: 0.95rem;
          color: #cccccc !important;
        }
        .case-student strong {
          color: #ffffff !important;
        }
        .case-text {
          font-size: 1rem;
          line-height: 1.6;
          color: #cccccc !important;
        }
        .case-footer {
          margin-top: auto;
          padding-top: 20px;
          border-top: 1px solid rgba(255, 255, 255, 0.08) !important;
        }
        .case-pkg {
          font-weight: 700;
          color: #DFBD69 !important;
        }
        .ind-cta-section {
          padding: 100px 0;
          background: #000000 !important;
        }
        .ind-cta-box {
          padding: 60px 40px;
          border-radius: var(--radius-lg);
          border: 1px solid rgba(255, 255, 255, 0.12) !important;
          background: rgba(255, 255, 255, 0.05) !important;
          backdrop-filter: blur(12px) !important;
          -webkit-backdrop-filter: blur(12px) !important;
          max-width: 900px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 20px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.25);
        }
        .ind-cta-box h2 {
          font-size: 2.2rem;
          font-weight: 700;
          color: #ffffff !important;
        }
        .ind-cta-box p {
          max-width: 600px;
          color: #cccccc !important;
          line-height: 1.6;
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
          opacity: 0.08; /* Subtle background image integration */
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
          .case-studies-grid {
            grid-template-columns: 1fr;
          }
        }
        @media (max-width: 576px) {
          .industries-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
};

export default Industries;