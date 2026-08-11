import { useState, useEffect } from "react";
import { FaUserPlus, FaChartLine, FaBookOpen, FaFileAlt, FaCalendarAlt, FaBriefcase } from "react-icons/fa";
import "./PlacementWorkflow.css";

const PlacementWorkflow = () => {
  const [activeStep, setActiveStep] = useState(null);



  const steps = [
    {
      id: 1,
      title: "Profile Review",
      desc: "Understand your experience, career goals, target roles, and US-market readiness.",
      icon: <FaUserPlus />
    },
    {
      id: 2,
      title: "Career Profile Prep",
      desc: "Improve resume, professional positioning, and supporting career materials.",
      icon: <FaFileAlt />
    },
    {
      id: 3,
      title: "Opportunity Alignment",
      desc: "Identify relevant roles and opportunities based on your background and target direction.",
      icon: <FaChartLine />
    },
    {
      id: 4,
      title: "Application & Interview Support",
      desc: "Provide guidance through applications, mock interviews, and technical communication.",
      icon: <FaCalendarAlt />
    },
    {
      id: 5,
      title: "Ongoing Guidance",
      desc: "Provide appropriate guidance and support as you navigate the US hiring process.",
      icon: <FaBriefcase />
    }
  ];

  return (
    <section className="placement-process-section">
      <div className="container">
        <h1 className="text-center section-title-reveal" style={{ color: "white" }}>
          The Candidate Journey
        </h1>

        <div className="workflow-timeline-container">
          {/* Background and Progress Tracks */}
          <div className="timeline-track-bg"></div>
          <div 
            className="timeline-track-progress"
            style={{
              "--progress-width": `${(activeStep / (steps.length - 1)) * 100}%`,
              "--progress-height": `${(activeStep / (steps.length - 1)) * 100}%`,
              "--active-step-val": activeStep ?? 0
            }}
          ></div>

          {/* Nodes */}
          <div className="workflow-nodes-container">
            {steps.map((step, index) => {
              const isActive = index === activeStep;
              const isCompleted = index < activeStep;
              
              return (
                <div 
                  key={step.id} 
                  className={`workflow-node ${isActive ? "active" : ""} ${isCompleted ? "completed" : ""}`}
                  onClick={() => setActiveStep(index)}
                >
                  <div className="node-dot-wrap">
                    <div className="node-dot">
                      {step.icon}
                    </div>
                  </div>
                  <div className="node-text">
                    <h4>{step.title}</h4>
                    <p>{step.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PlacementWorkflow;
