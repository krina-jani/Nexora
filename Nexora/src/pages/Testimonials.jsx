import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import testimonials from "../data/testimonials";

gsap.registerPlugin(ScrollTrigger);

const Testimonials = () => {
  const pageRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero entrance
      gsap.from(".test-hero-title", {
        y: 60,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out"
      });

      const mm = gsap.matchMedia();

      // Mobile layout animations (screens <= 991px)
      mm.add("(max-width: 991px)", () => {
        // Alternating slide-in animations for testimonial grid cards
        const testimonialCards = gsap.utils.toArray(".testimonial-grid-card");
        testimonialCards.forEach((card, index) => {
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

        // Alternating slide-in animations for video cards
        const videoCards = gsap.utils.toArray(".video-card");
        videoCards.forEach((card, index) => {
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

        // Alternating slide-in animations for honest feedback cards
        const feedbackCards = gsap.utils.toArray(".feedback-card");
        feedbackCards.forEach((card, index) => {
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
        // Stagger testimonial cards
        gsap.from(".testimonial-grid-card", {
          scrollTrigger: {
            trigger: ".testimonials-grid",
            start: "top 80%"
          },
          y: 40,
          opacity: 0,
          stagger: 0.12,
          duration: 0.8,
          ease: "power2.out"
        });

        // Honest Feedback Cards
        gsap.from(".feedback-card", {
          scrollTrigger: {
            trigger: ".feedback-grid",
            start: "top 85%"
          },
          y: 50,
          opacity: 0,
          stagger: 0.2,
          duration: 0.8,
          ease: "power2.out"
        });
      });
    }, pageRef);

    return () => ctx.revert();
  }, []);

  const stats = [
    { label: "Avg. Salary Hike", val: "68%" },
    { label: "Highest Package", val: "64 LPA" },
    { label: "Placement Rate", val: "98.2%" },
    { label: "Mentors from FAANG", val: "140+" }
  ];

  const honestFeedbackData = [
    {
      type: "praise",
      client: "Sarah J., Frontend Dev",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80",
      content: "Nexora's mentorship completely changed my approach. The mock interviews were rigorous and prepared me perfectly for my role at Amazon."
    },
    {
      type: "constructive",
      client: "Michael T., Data Analyst",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
      content: "Initially, I felt the pace of the curriculum was too fast and overwhelming.",
      resolution: "I brought this up with my mentor, and they immediately adjusted my timeline, adding 1-on-1 sessions to help me catch up. The support was incredible!"
    },
    {
      type: "praise",
      client: "Elena R., UX Designer",
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
      content: "The portfolio reviews were brutal but necessary. Thanks to the honest feedback, my case studies now attract recruiters automatically."
    },
    {
      type: "constructive",
      client: "David K., Backend Engineer",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80",
      content: "There was a delay in getting my resume reviewed during the holiday season, which frustrated me.",
      resolution: "Nexora's team apologized and assigned a senior FAANG engineer to do a deep-dive review over the weekend to make up for the lost time. Got an offer 3 weeks later!"
    }
  ];

  return (
    <div ref={pageRef} className="testimonials-page-wrapper">
      {/* Hero */}
      <section className="testimonials-hero text-center">
        <div className="container">
          <h1 className="test-hero-title">
            Student Success <br />
            <span className="text-gradient">Stories & Reviews</span>
          </h1>
          <p className="test-hero-sub text-light">
            Real stories from real graduates who switched domains, negotiated higher salaries, and secured roles in world-class companies.
          </p>
        </div>
      </section>

      {/* Stats row */}
      <section className="testimonials-stats-section">
        <div className="container">
          <div className="test-stats-row">
            {stats.map((st, idx) => (
              <div key={idx} className="test-stat-card glass text-center">
                <h3>{st.val}</h3>
                <p>{st.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews Grid */}
      <section className="testimonials-grid-section">
        <div className="container">
          <div className="testimonials-grid">
            {testimonials.map((test) => (
              <div key={test.id} className="testimonial-grid-card glass">
                <div className="candidate-info-row">
                  <img src={test.image} alt={test.name} className="candidate-photo" />
                  <div>
                    <h3>{test.name}</h3>
                    <p className="candidate-role">{test.role}</p>
                  </div>
                </div>
                <p className="candidate-feedback">"{test.text}"</p>
                <div className="candidate-placement-footer">
                  <span className="placed-at">Placed at: <strong>{test.company}</strong></span>
                  <span className="candidate-pkg">{test.package}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Video review placeholder section */}
      <section className="video-reviews-section">
        <div className="container">
          <h2 className="text-center" style={{ color: "#ffffffff" }}>Watch Alumni Video Reviews </h2>
          <div className="video-grid">
            <div className="video-card glass">
              <div className="video-thumbnail-mock">
                <div className="play-button-accent">▶</div>
              </div>
              <h3>Priya Nair | Landing Microsoft</h3>
              <p>Hear Priya describe her transition from non-technical business developer to UX architect in 12 weeks.</p>
            </div>
            <div className="video-card glass">
              <div className="video-thumbnail-mock">
                <div className="play-button-accent">▶</div>
              </div>
              <h3>Aarav Sharma | Crack Google SDE</h3>
              <p>Aarav details the coding mock loops, technical roadmaps, and behavioral rounds that got him into Google.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Honest Feedback Section */}
      <section className="honest-feedback-section">
        <div className="container">
          <div className="text-center section-header" style={{ marginBottom: "50px" }}>
            <h2 style={{ fontSize: "2.5rem", fontWeight: "800", marginBottom: "15px", color:"#000000ff"}}>Honest Feedback</h2>
            <p className="text-light" style={{ maxWidth: "700px", margin: "0 auto", fontSize: "1.1rem" }}>
              We believe in absolute transparency. Here is what our clients say, including the challenges they faced and how we resolved them together.
            </p>
          </div>
          
          <div className="feedback-grid">
            {honestFeedbackData.map((item, idx) => (
              <div key={idx} className={`feedback-card glass ${item.type}`}>
                <div className="feedback-badge">
                  {item.type === "praise" ? "⭐️ Praise" : "🛠 Constructive"}
                </div>
                <p className="feedback-content">"{item.content}"</p>
                {item.resolution && (
                  <div className="feedback-resolution">
                    <strong>How we improved:</strong> {item.resolution}
                  </div>
                )}
                <div className="feedback-client-info">
                  <span className="feedback-client-name">— {item.client}</span>
                  <img src={item.image} alt={item.client} className="feedback-client-img" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Styles */}
      <style>{`
        .testimonials-hero {
          padding: 80px 0 40px;
        }
        .test-hero-title {
          font-size: 3.5rem;
          font-weight: 800;
          line-height: 1.2;
          margin-bottom: 20px;
        }
        .test-hero-sub {
          font-size: 1.2rem;
          max-width: 600px;
          margin: 0 auto;
        }
        .text-gradient {
          background: linear-gradient(134deg, #2C5E63, #6B6F4D);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .testimonials-stats-section {
          padding: 40px 0;
        }
        .test-stats-row {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 24px;
        }
        .test-stat-card {
          padding: 30px;
          border-radius: var(--radius-md);
          border: 1px solid var(--border);
        }
        .test-stat-card h3 {
          font-size: 2.2rem;
          font-weight: 800;
          color: var(--primary-dark);
          margin-bottom: 8px;
        }
        .test-stat-card p {
          font-size: 0.95rem;
          color: var(--text-light);
        }
        .testimonials-grid-section {
          padding: 80px 0;
        }
        .testimonials-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 40px;
        }
        .testimonial-grid-card {
          padding: 40px;
          border-radius: var(--radius-lg);
          border: 1px solid var(--border);
          display: flex;
          flex-direction: column;
          gap: 20px;
        }
        .candidate-info-row {
          display: flex;
          align-items: center;
          gap: 20px;
        }
        .candidate-photo {
          width: 64px;
          height: 64px;
          border-radius: 50%;
          object-fit: cover;
          border: 2px solid var(--primary-light);
        }
        .candidate-info-row h3 {
          font-size: 1.2rem;
          font-weight: 700;
        }
        .candidate-role {
          font-size: 0.9rem;
          color: var(--primary-dark);
          font-weight: 500;
        }
        .candidate-feedback {
          font-size: 1.05rem;
          line-height: 1.6;
          color: var(--text);
          font-style: italic;
        }
        .candidate-placement-footer {
          margin-top: auto;
          display: flex;
          justify-content: space-between;
          padding-top: 16px;
          border-top: 1px solid var(--border);
          font-size: 0.95rem;
        }
        .candidate-pkg {
          font-weight: 700;
          color: var(--primary-dark);
        }
        .video-reviews-section {
          padding: 80px 0;
          background: var(--bg-soft);
        }
        .video-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 40px;
          margin-top: 40px;
        }
        .video-card {
          padding: 30px;
          border-radius: var(--radius-lg);
          border: 1px solid var(--border);
          background: var(--white);
        }
        .video-thumbnail-mock {
          height: 220px;
          border-radius: var(--radius-md);
          background: linear-gradient(135deg, var(--accent-dark), var(--primary-light));
          position: relative;
          display: grid;
          place-items: center;
          margin-bottom: 20px;
          cursor: pointer;
        }
        .play-button-accent {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          background: var(--white);
          color: var(--primary-dark);
          display: grid;
          place-items: center;
          font-size: 1.5rem;
          box-shadow: var(--shadow-md);
          transition: var(--transition);
        }
        .play-button-accent:hover {
          transform: scale(1.1);
          background: var(--primary-light);
        }
        .video-card h3 {
          font-size: 1.25rem;
          font-weight: 700;
          margin-bottom: 10px;
        }
        .video-card p {
          font-size: 0.95rem;
          color: var(--text);
          line-height: 1.6;
        }


        /* Honest Feedback Styles */
        .honest-feedback-section {
          padding: 80px 0 100px;
        }
        .feedback-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 30px;
          justify-items: center;
        }
        .feedback-card {
          width: 100%;
          max-width: 520px;
          padding: 25px;
          border-radius: var(--radius-lg);
          border: 1px solid var(--border);
          position: relative;
          display: flex;
          flex-direction: column;
          gap: 20px;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .feedback-card:hover {
          transform: translateY(-5px);
          box-shadow: var(--shadow-lg);
        }
        
        .feedback-card.praise {
          background: linear-gradient(145deg, rgba(72, 201, 44, 0.05), rgba(255,255,255,0.01));
          border-left: 4px solid var(--primary);
        }
        .feedback-card.constructive {
          background: linear-gradient(145deg, rgba(255, 165, 0, 0.05), rgba(255,255,255,0.01));
          border-left: 4px solid #FFA500;
        }
        
        [data-theme='dark'] .feedback-card.praise {
          background: linear-gradient(145deg, rgba(72, 201, 44, 0.08), rgba(0,0,0,0.2));
        }
        [data-theme='dark'] .feedback-card.constructive {
          background: linear-gradient(145deg, rgba(255, 165, 0, 0.08), rgba(0,0,0,0.2));
        }

        .feedback-badge {
          display: inline-block;
          padding: 6px 14px;
          border-radius: 20px;
          font-size: 0.85rem;
          font-weight: 700;
          width: fit-content;
        }
        .feedback-card.praise .feedback-badge {
          background: rgba(72, 201, 44, 0.15);
          color: var(--primary-dark);
        }
        .feedback-card.constructive .feedback-badge {
          background: rgba(255, 165, 0, 0.15);
          color: #d98c00;
        }
        
        [data-theme='dark'] .feedback-card.praise .feedback-badge {
          color: var(--primary);
        }
        [data-theme='dark'] .feedback-card.constructive .feedback-badge {
          color: #FFA500;
        }

        .feedback-content {
          font-size: 1.1rem;
          line-height: 1.6;
          color: var(--heading);
          font-style: italic;
        }
        .feedback-resolution {
          background: var(--surface);
          padding: 16px;
          border-radius: var(--radius-sm);
          font-size: 0.95rem;
          color: var(--text);
          border-left: 2px solid var(--primary);
          line-height: 1.5;
        }
        .feedback-client-info {
          margin-top: auto;
          display: flex;
          align-items: center;
          justify-content: flex-end;
          gap: 12px;
        }
        .feedback-client-img {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          object-fit: cover;
          border: 2px solid rgba(0, 0, 0, 0.1);
        }
        [data-theme='dark'] .feedback-client-img {
          border: 2px solid rgba(255, 255, 255, 0.2);
        }
        .feedback-client-name {
          font-weight: 700;
          color: var(--text-light);
          font-size: 0.95rem;
        }

        /* Unified Card visibility override for Testimonials */
        .test-stat-card, .testimonial-grid-card, .video-card, .feedback-card {
          background: #ffffff !important;
          border: 1px solid rgba(255, 255, 255, 0.25) !important;
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          box-shadow: var(--shadow-md);
        }

        /* Text colors inside cards */
        .test-stat-card h3, 
        .candidate-info-row h3, 
        .video-card h3,
        .feedback-content {
          color: #0f172a !important;
        }

        .test-stat-card p,
        .candidate-feedback,
        .placed-at,
        .video-card p,
        .feedback-client-name {
          color: #334155 !important;
        }

        .candidate-role,
        .candidate-pkg {
          color: #1e3a8a !important; /* Rich blue contrast */
        }

        .feedback-resolution {
          background: rgba(0, 0, 0, 0.05) !important;
          color: #1e293b !important;
          border-left: 2px solid var(--primary) !important;
        }

        /* Page titles and text */
        .test-hero-title, .section-title, .honest-feedback-section h2 {
          color: #0f172a !important;
        }
        .test-hero-sub, .honest-feedback-section p {
          color: #334155 !important;
        }

        /* Dark mode overrides */
        [data-theme='dark'] .test-hero-title, 
        [data-theme='dark'] .section-title, 
        [data-theme='dark'] .honest-feedback-section h2 {
          color: #f8fafc !important;
        }
        [data-theme='dark'] .test-hero-sub, 
        [data-theme='dark'] .honest-feedback-section p {
          color: #cbd5e1 !important;
        }

        /* Mobile responsive overrides placed at the end for correct cascading */
        @media (max-width: 991px) {
          .test-stats-row {
            grid-template-columns: 1fr 1fr;
          }
          .testimonials-grid {
            grid-template-columns: 1fr;
          }
          .video-grid {
            grid-template-columns: 1fr;
          }
          .feedback-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
};

export default Testimonials;