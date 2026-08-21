import React from "react";
import "./EVerifyBadge.css";

const EVerifyBadge = () => {
  return (
    <a
      href="https://www.e-verify.gov/e-verify-employer-search"
      target="_blank"
      rel="noopener noreferrer"
      className="everify-badge"
      aria-label="Open official E-Verify website"
    >
      <div className="everify-top-bar"></div>
      <div className="everify-logo-row">
        <span className="everify-logo">
          <span className="everify-mark">
            <span></span>
            <span></span>
            <span></span>
          </span>
          E-Verify
        </span>
        <div className="everify-status-dot-container">
          <span className="everify-status-dot-ping"></span>
          <span className="everify-status-dot"></span>
        </div>
      </div>
      <span className="everify-badge-text">
        We E-Verify<br />Employment
      </span>
    </a>
  );
};

export default EVerifyBadge;
