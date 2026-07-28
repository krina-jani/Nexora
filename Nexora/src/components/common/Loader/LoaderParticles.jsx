    import "./Loader.css";

const PARTICLE_COUNT = 60;

const particles = Array.from({ length: PARTICLE_COUNT }, (_, index) => ({
  id: index,
  size: Math.random() * 6 + 2,
  left: Math.random() * 100,
  delay: Math.random() * 10,
  duration: Math.random() * 18 + 12,
  opacity: Math.random() * 0.5 + 0.15,
}));

const LoaderParticles = () => {
  return (
    <div className="loader__particles">
      {particles.map((particle) => (
        <span
          key={particle.id}
          className="loader__particle"
          style={{
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            left: `${particle.left}%`,
            animationDuration: `${particle.duration}s`,
            animationDelay: `${particle.delay}s`,
            opacity: particle.opacity,
          }}
        />
      ))}
    </div>
  );
};

export default LoaderParticles;