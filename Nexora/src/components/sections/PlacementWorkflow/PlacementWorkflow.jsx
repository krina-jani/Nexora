import { useState, useEffect } from "react";
import { FaUserPlus, FaChartLine, FaBookOpen, FaFileAlt, FaCalendarAlt, FaBriefcase } from "react-icons/fa";
import "./PlacementWorkflow.css";

const PlacementWorkflow = () => {
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % 6);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const steps = [
    {
      id: 1,
      title: "Registration",
      desc: "Submit your profile and initiate your onboarding consultation.",
      icon: <FaUserPlus />
    },
    {
      id: 2,
      title: "Career Assessment",
      desc: "Define your career goals, target domains, and skill gaps.",
      icon: <FaChartLine />
    },
    {
      id: 3,
      title: "Training",
      desc: "Learn high-demand skills, AWS, Java, Python, and tools.",
      icon: <FaBookOpen />
    },
    {
      id: 4,
      title: "Resume Preparation",
      desc: "Build ATS-compliant, recruiter-ready professional resumes.",
      icon: <FaFileAlt />
    },
    {
      id: 5,
      title: "Interview Scheduling",
      desc: "Connect with hiring managers and schedule direct rounds.",
      icon: <FaCalendarAlt />
    },
    {
      id: 6,
      title: "Placement",
      desc: "Secure your US offer letter and begin your onboarding journey.",
      icon: <FaBriefcase />
    }
  ];

  return (
    <section className="placement-process-section">
      <div className="container">
        <h1 className="text-center section-title-reveal" style={{ color: "white" }}>
          The Placement Workflow
        </h1>

        <div className="workflow-timeline-container">
          {/* Background and Progress Tracks */}
          <div className="timeline-track-bg"></div>
          <div 
            className="timeline-track-progress"
            style={{
              "--progress-width": `${(activeStep / 5) * 100}%`,
              "--progress-height": `${(activeStep / 5) * 100}%`
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
                    {isActive && <div className="node-glow-ring"></div>}
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
