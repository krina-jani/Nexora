import "./Loader.css";

const LoaderNoise = () => {
  return (
    <>
      {/* Film Grain */}
      <div className="loader__noise"></div>

      {/* Scan Lines */}
      <div className="loader__scanlines"></div>

      {/* Vignette */}
      <div className="loader__vignette"></div>
    </>
  );
};

export default LoaderNoise;