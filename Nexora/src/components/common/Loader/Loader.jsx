import { useEffect, useState } from "react";
import logo from "../../../assets/icons/nexoralogo.png";
import "./Loader.css";

const Loader = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);
  const [splashes, setSplashes] = useState([]);

  useEffect(() => {
    const startTime = performance.now();
    const duration = 2000; // 2 seconds to fill

    let rafId;
    const updateProgress = (now) => {
      const elapsed = now - startTime;
      const pct = Math.min((elapsed / duration) * 100, 100);
      setProgress(pct);

      if (pct < 100) {
        rafId = requestAnimationFrame(updateProgress);
      } else {
        const exitTimeout = setTimeout(() => {
          setIsExiting(true);
        }, 400);
        return () => clearTimeout(exitTimeout);
      }
    };

    rafId = requestAnimationFrame(updateProgress);
    return () => cancelAnimationFrame(rafId);
  }, []);

  useEffect(() => {
    if (progress <= 0 || progress >= 100) return;

    // Spawn splashes more frequently with corner offsets
    const interval = setInterval(() => {
      const colors = ["#F9C33A", "#F9C33A", "#b88d14", "#e0ac1b", "#ffffff"];
      const newDrops = [
        // Middle splashes
        {
          id: Math.random(),
          x: Math.random() * 50 + 25, // 25% to 75%
          y: progress,
          size: Math.random() * 5 + 3,
          color: colors[Math.floor(Math.random() * colors.length)]
        },
        // Left corner splashes (pushed slightly higher)
        {
          id: Math.random(),
          x: Math.random() * 20 + 5, // 5% to 25% (left side)
          y: progress + 3, // slightly pushed up
          size: Math.random() * 7 + 3,
          color: colors[Math.floor(Math.random() * colors.length)]
        },
        // Right corner splashes (pushed slightly higher)
        {
          id: Math.random(),
          x: Math.random() * 20 + 75, // 75% to 95% (right side)
          y: progress + 3, // slightly pushed up
          size: Math.random() * 7 + 3,
          color: colors[Math.floor(Math.random() * colors.length)]
        }
      ];
      
      setSplashes((prev) => [...prev.slice(-45), ...newDrops]); // Keep max 45 drops
    }, 45);

    return () => clearInterval(interval);
  }, [progress]);

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
        <div className="logo-fill-wrapper">
          {/* Grayscale Background Logo */}
          <img
            src={logo}
            alt="Nexora Career Logo Background"
            className="loader-logo-bg"
          />
          {/* Wave 1: Semi-transparent back wave (moves slower/opposite) */}
          <div className="loader-logo-fg-clip wave-back" style={{ height: `${progress * 1.08}%` }}>
            <img
              src={logo}
              alt="Nexora Career Logo Back Wave"
              className="loader-logo-fg"
              style={{ opacity: 0.5 }}
            />
          </div>
          {/* Wave 2: Main foreground wave (moves faster) */}
          <div className="loader-logo-fg-clip wave-front" style={{ height: `${progress * 1.08}%` }}>
            <img
              src={logo}
              alt="Nexora Career Logo Front Wave"
              className="loader-logo-fg"
            />
          </div>

          {/* Splashing color drops */}
          {splashes.map((drop) => (
            <div
              key={drop.id}
              className="fluid-drop"
              style={{
                left: `${drop.x}%`,
                bottom: `${drop.y * 1.08}%`,
                width: `${drop.size}px`,
                height: `${drop.size}px`,
                backgroundColor: drop.color,
                boxShadow: `0 0 8px ${drop.color}`
              }}
            />
          ))}
        </div>
        <h1 className="typed-text">Nexora Career</h1>
        <div className="loader-progress-text" style={{ fontSize: "0.95rem", color: "#888888", marginTop: "12px", fontFamily: "monospace", letterSpacing: "1px" }}>
          {Math.round(progress)}%
        </div>
      </div>
    </div>
  );
};

export default Loader;