import { useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import GradientWaves from "../../common/GradientWaves";
import testimonials from "../../../data/testimonials";
import "./OurPlacedCandidates.css";

const OurPlacedCandidates = () => {
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  const nextTestimonial = () => {
    setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setActiveTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="success-stories-section" style={{ position: "relative", overflow: "hidden" }}>
      {/* Gradient Waves Background */}
      <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", zIndex: 0 }}>
        <GradientWaves
          horizonColor="#000000ff"
          waveColor="#1e2630ff"
          crestColor="#ffffffff"
          speed={0.3}
          amplitude={2.0}
          waveScale={0.6}
          waveRatio={0.9}
          swell={30}
          turbulence={18}
          tilt={1.11}
          zoom={1.0}
          height={5.5}
          fogDepth={15}
          detail="medium"
          brightness={1.0}
          opacity={1.0}
          mouseInteraction={true}
        />
      </div>

      <div className="container" style={{ position: "relative", zIndex: 2 }}>
        <h1 className="text-center section-title-reveal" style={{ color: "#ffffff" }}>Our Placed Candidates</h1>

        <div className="testimonials-carousel-box testimonials-glass">
          <button className="carousel-nav-btn prev" onClick={prevTestimonial}>
            <FaChevronLeft />
          </button>

          <div className="testimonial-active-content">
            <div className="active-candidate-details">
              <h3 style={{ color: "#ffffff" }}>{testimonials[activeTestimonial].name}</h3>
              <p className="candidate-role-text" style={{ color: "#cccccc" }}>{testimonials[activeTestimonial].role} at {testimonials[activeTestimonial].company}</p>
              <p className="feedback-body" style={{ color: "#dddddd" }}>"{testimonials[activeTestimonial].text}"</p>
            </div>
          </div>

          <button className="carousel-nav-btn next" onClick={nextTestimonial}>
            <FaChevronRight />
          </button>
        </div>
      </div>
    </section>
  );
};

export default OurPlacedCandidates;
