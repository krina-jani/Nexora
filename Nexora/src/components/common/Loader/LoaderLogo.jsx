import "./Loader.css";

const LoaderLogo = () => {
  return (
    <svg
      className="loader-logo-svg"
      width="180"
      height="180"
      viewBox="0 0 180 180"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>

        <linearGradient id="logoGradient">

          <stop offset="0%" stopColor="#2563EB" />

          <stop offset="50%" stopColor="#38BDF8" />

          <stop offset="100%" stopColor="#06B6D4" />

        </linearGradient>

        <filter id="logoGlow">

          <feGaussianBlur stdDeviation="5" result="coloredBlur"/>

          <feMerge>

            <feMergeNode in="coloredBlur"/>

            <feMergeNode in="SourceGraphic"/>

          </feMerge>

        </filter>

      </defs>

      {/* Left Stroke */}

      <path

        className="logo-path"

        d="M40 140
           L40 40
           L95 110
           L95 40"

        stroke="url(#logoGradient)"
        strokeWidth="12"
        strokeLinecap="round"
        strokeLinejoin="round"
        filter="url(#logoGlow)"
      />

      {/* Right Stroke */}

      <path

        className="logo-path"

        d="M95 110
           L140 40
           L140 140"

        stroke="url(#logoGradient)"
        strokeWidth="12"
        strokeLinecap="round"
        strokeLinejoin="round"
        filter="url(#logoGlow)"
      />

    </svg>
  );
};

export default LoaderLogo;