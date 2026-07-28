import { useEffect, useState, useRef } from "react";
import { FaSun, FaMoon } from "react-icons/fa";
import "./Loader.css";

const Loader = ({ onComplete }) => {
  const [percent, setPercent] = useState(0);
  const [exitClassCounter, setExitClassCounter] = useState("");
  const [exitClassLogo, setExitClassLogo] = useState("");
  const [exitClassBg, setExitClassBg] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(true); // Default to dark mode
  const clippedLogoRef = useRef(null);

  // Sync theme with body class
  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add("dark");
      document.body.classList.remove("light");
    } else {
      document.body.classList.add("light");
      document.body.classList.remove("dark");
    }
  }, [isDarkMode]);

  useEffect(() => {
    // Session check to immediately bypass preloader
    if (sessionStorage.getItem("dzinr-preloader-shown")) {
      onComplete();
      return;
    }

    const duration = 3000;
    const startTime = performance.now();
    let animationFrameId;

    const updatePreloader = (timestamp) => {
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);

      const easedProgress =
        progress < 0.5
          ? 2 * progress * progress
          : 1 - Math.pow(-2 * progress + 2, 2) / 2;

      const clipValue = 100 - easedProgress * 100;
      if (clippedLogoRef.current) {
        clippedLogoRef.current.style.clipPath = `inset(${clipValue}% 0px 0px 0px)`;
      }

      const currentPercent = Math.floor(progress * 100);
      setPercent(currentPercent);

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(updatePreloader);
      } else {
        setPercent(100);
        onAnimationFinished();
      }
    };

    const onAnimationFinished = () => {
      setTimeout(() => {
        setExitClassCounter("exit");
      }, 200);

      setTimeout(() => {
        setExitClassLogo("exit");
      }, 800);

      setTimeout(() => {
        setExitClassBg("exit");
      }, 1200);

      setTimeout(() => {
        sessionStorage.setItem("dzinr-preloader-shown", "true");
        onComplete();
      }, 1800);
    };

    animationFrameId = requestAnimationFrame(updatePreloader);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [onComplete]);

  return (
    <div className={`preloader-container ${isDarkMode ? "theme-dark" : "theme-light"}`}>
      {/* Background overlay */}
      <div className={`preloader-bg ${exitClassBg}`} />

      {/* Animated Logo */}
      <div className={`preloader-logo-wrap ${exitClassLogo}`}>
        <svg
          width="76"
          height="343"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="logo-svg"
          ref={clippedLogoRef}
          style={{ clipPath: "inset(100% 0px 0px 0px)" }}
        >
          <path
            d="M75.1094 280.561H0V342.453H75.1094V280.561Z"
            fill="currentColor"
          />
          <path
            d="M19.4107 251.481L4.34375 106.642V0H70.8032V106.642L55.7362 251.481H19.4107Z"
            fill="currentColor"
          />
        </svg>

        <svg
          width="76"
          height="343"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="logo-svg logo-svg-bg"
        >
          <path
            d="M75.1094 280.561H0V342.453H75.1094V280.561Z"
            fill="currentColor"
          />
          <path
            d="M19.4107 251.481L4.34375 106.642V0H70.8032V106.642L55.7362 251.481H19.4107Z"
            fill="currentColor"
          />
        </svg>
      </div>

      {/* Percent Counter */}
      <div className={`preloader-counter ${exitClassCounter}`}>
        <div className="counter-text">{percent}</div>
      </div>

      {/* Interactive Controls (Bottom Right) */}
      <div className="preloader-controls">
        {/* Visualizer/Wave indicator (5 vertical lines) */}
        <div className="preloader-waves-btn clickable">
          <span className="wave-bar"></span>
          <span className="wave-bar"></span>
          <span className="wave-bar"></span>
          <span className="wave-bar"></span>
          <span className="wave-bar"></span>
        </div>

        {/* Theme Mode Toggle Button */}
        <button
          className="preloader-theme-btn clickable"
          onClick={() => setIsDarkMode(!isDarkMode)}
          title="Toggle Light/Dark Theme"
        >
          {isDarkMode ? <FaSun /> : <FaMoon />}
        </button>
      </div>
    </div>
  );
};

export default Loader;