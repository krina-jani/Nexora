import { useEffect, useState } from "react";
import logo from "../../../assets/icons/nexoralogo.png";
import "./Loader.css";

const Loader = ({ onComplete }) => {
  const [typedText, setTypedText] = useState("");
  const [isExiting, setIsExiting] = useState(false);
  const targetText = "Nexora Career";

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      if (index < targetText.length) {
        setTypedText(targetText.slice(0, index + 1));
        index++;
      } else {
        clearInterval(interval);
        // Start exit animation after typing finishes
        const exitTimeout = setTimeout(() => {
          setIsExiting(true);
        }, 800);
        return () => clearTimeout(exitTimeout);
      }
    }, 100);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (isExiting) {
      const timer = setTimeout(() => {
        onComplete();
      }, 800); // Matches CSS exit transition duration
      return () => clearTimeout(timer);
    }
  }, [isExiting, onComplete]);

  return (
    <div className={`preloader-container ${isExiting ? "exit" : ""}`}>
      <div className="preloader-content-wrap">
        <div className="logo-circle-container">
          <img
            src={logo}
            alt="Nexora Career Logo"
            className="loader-logo animate-logo-sway"
          />
          {/* Dotted rotating circle */}
          <svg className="loading-dash" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="45"></circle>
          </svg>
        </div>
        <h1 className="typed-text">{typedText}</h1>
      </div>
    </div>
  );
};

export default Loader;