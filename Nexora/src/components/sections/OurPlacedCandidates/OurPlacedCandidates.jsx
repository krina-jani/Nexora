import { useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
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
    <section className="success-stories-section">
      <div className="container">
        <h2 className="text-center section-title-reveal">Our Placed Candidates</h2>
        
        <div className="testimonials-carousel-box glass">
          <button className="carousel-nav-btn prev" onClick={prevTestimonial}>
            <FaChevronLeft />
          </button>

          <div className="testimonial-active-content">
            <div className="candidate-photo-wrapper">
              <img 
                src={testimonials[activeTestimonial].image} 
                alt={testimonials[activeTestimonial].name} 
                className="active-candidate-img"
              />
            </div>
            <div className="active-candidate-details">
              <span className="package-tag">{testimonials[activeTestimonial].package}</span>
              <h3>{testimonials[activeTestimonial].name}</h3>
              <p className="candidate-role-text">{testimonials[activeTestimonial].role} at {testimonials[activeTestimonial].company}</p>
              <p className="feedback-body">"{testimonials[activeTestimonial].text}"</p>
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
