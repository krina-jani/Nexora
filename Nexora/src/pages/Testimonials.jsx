import { useEffect, useRef } from "react";
import gsap from "gsap";
import testimonials from "../data/testimonials";

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
    }, pageRef);

    return () => ctx.revert();
  }, []);

  const stats = [
    { label: "Avg. Salary Hike", val: "68%" },
    { label: "Highest Package", val: "64 LPA" },
    { label: "Placement Rate", val: "98.2%" },
    { label: "Mentors from FAANG", val: "140+" }
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
          <h2 className="text-center section-title">Watch Alumni Video Reviews</h2>
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
          background: linear-gradient(90deg, var(--primary), var(--primary-light));
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
        }
      `}</style>
    </div>
  );
};

export default Testimonials;