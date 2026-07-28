import { Link } from "react-router-dom";
import programs from "../../../data/programs";
import "./FeaturedCareerPathways.css";

const FeaturedCareerPathways = () => {
  return (
    <section className="programs-section">
      <div className="container">
        <h2 className="text-center section-title-reveal">Featured Career Pathways</h2>
        <div className="programs-grid">
          {programs.slice(0, 4).map((prog) => (
            <div key={prog.id} className="program-card glass">
              {/* Premium Glare Layer */}
              <div className="glare"></div>

              <div className="program-card-content">
                <span className="prog-diff">{prog.difficulty}</span>
                <h3>{prog.title}</h3>
                <p className="prog-dur">Duration: {prog.duration}</p>
                <Link to="/services" className="btn-primary prog-btn">
                  Explore Roadmap
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedCareerPathways;
