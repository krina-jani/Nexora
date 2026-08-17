import "./KineticTextBanner.css";

const KineticTextBanner = ({
  text = "BUILD YOUR CAREER • WITH NEXORA CAREER • US HIRING STANDARDS • PROFILE OPTIMIZATION"
}) => {
  // Format text to ensure a separator at the end so it loops seamlessly
  const formattedText = text.trim().endsWith("•") ? `${text} ` : `${text} • `;

  return (
    <section className="normal-kinetic-banner">
      <div className="kinetic-banner-line-top"></div>
      <div className="kinetic-banner-glow"></div>
      <div className="kinetic-banner-track-wrapper">
        <div className="kinetic-banner-track">
          <span className="kinetic-banner-text">{formattedText}</span>
          <span className="kinetic-banner-text">{formattedText}</span>
        </div>
      </div>
      <div className="kinetic-banner-line-bottom"></div>
    </section>
  );
};

export default KineticTextBanner;
