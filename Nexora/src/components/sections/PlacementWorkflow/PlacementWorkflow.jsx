import "./PlacementWorkflow.css";

const PlacementWorkflow = () => {
  return (
    <section className="placement-process-section">
      <div className="container">
        <h2 className="text-center section-title-reveal">The Placement Workflow</h2>
        <div className="process-timeline-flex">
          <div className="process-node">
            <span className="process-dot">1</span>
            <h4>Registration</h4>
          </div>
          <div className="process-line"></div>
          <div className="process-node">
            <span className="process-dot">2</span>
            <h4>Career Assessment</h4>
          </div>
          <div className="process-line"></div>
          <div className="process-node">
            <span className="process-dot">3</span>
            <h4>Training</h4>
          </div>
          <div className="process-line"></div>
          <div className="process-node">
            <span className="process-dot">4</span>
            <h4>Resume Preparation</h4>
          </div>
          <div className="process-line"></div>
          <div className="process-node">
            <span className="process-dot">5</span>
            <h4>Interview Scheduling</h4>
          </div>
          <div className="process-line"></div>
          <div className="process-node">
            <span className="process-dot">6</span>
            <h4>Placement</h4>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PlacementWorkflow;
