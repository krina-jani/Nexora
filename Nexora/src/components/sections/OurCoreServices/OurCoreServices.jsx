import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import services from "../../../data/services";
import "./OurCoreServices.css";

const OurCoreServices = () => {
  return (
    <section className="services-showcase-section">
      <div className="container">
        <h1 className="text-center section-title-reveal" style={{color: "white"}}>Our Core Services</h1>
        <div className="services-grid">
          {services.slice(0, 6).map((svc) => (
            <div key={svc.id} className="service-card glass">
              {/* Premium Glare Layer */}
              <div className="glare"></div>
              
              <div className="service-card-content">
                <h3>{svc.title}</h3>
                <p>{svc.description}</p>
                <Link to="/services" className="service-arrow-link">
                  Learn more <FaArrowRight />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurCoreServices;
