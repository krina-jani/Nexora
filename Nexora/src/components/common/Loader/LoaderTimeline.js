import gsap from "gsap";

const initLoaderTimeline = ({
  loader,
  background,
  overlay,
  logo,
  subtitle,
  progressWrapper,
  progressBar,
  percentage,
  revealCircle,
  onComplete,
}) => {
  // Kill existing tweens
  gsap.killTweensOf("*");

  // Set initial states
  gsap.set(loader.current, {
    autoAlpha: 1,
  });

  gsap.set(background.current, {
    scale: 1.25,
    rotate: -8,
  });

  gsap.set(logo.current, {
    opacity: 0,
    y: 80,
    scale: 0.85,
  });

  gsap.set(subtitle.current, {
    opacity: 0,
    y: 25,
  });

  gsap.set(progressWrapper.current, {
    opacity: 0,
    y: 20,
  });

  gsap.set(percentage.current, {
    opacity: 0,
    y: 15,
  });

  gsap.set(progressBar.current, {
    width: "0%",
  });

  gsap.set(revealCircle.current, {
    scale: 0,
    opacity: 0,
  });

  const counter = { value: 0 };

  const tl = gsap.timeline({
    defaults: {
      ease: "power3.out",
    },
    onComplete: () => {
      if (onComplete) onComplete();
    },
  });

  /*
  ----------------------------------------
  Background
  ----------------------------------------
  */

  tl.to(background.current, {
    scale: 1,
    rotate: 0,
    duration: 2.4,
    ease: "expo.out",
  });

  /*
  ----------------------------------------
  Logo
  ----------------------------------------
  */

  tl.to(
    logo.current,
    {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 1.2,
    },
    "-=1.8"
  );

  /*
  ----------------------------------------
  Subtitle
  ----------------------------------------
  */

  tl.to(
    subtitle.current,
    {
      opacity: 1,
      y: 0,
      duration: 0.8,
    },
    "-=0.8"
  );

  /*
  ----------------------------------------
  Progress
  ----------------------------------------
  */

  tl.to(
    progressWrapper.current,
    {
      opacity: 1,
      y: 0,
      duration: 0.8,
    },
    "-=0.6"
  );

  tl.to(
    percentage.current,
    {
      opacity: 1,
      y: 0,
      duration: 0.8,
    },
    "<"
  );

  /*
  ----------------------------------------
  Loading Counter
  ----------------------------------------
  */

  tl.to(counter, {
    value: 100,
    duration: 3.2,
    ease: "power2.inOut",

    onUpdate() {
      const value = Math.floor(counter.value);

      percentage.current.textContent = `${value}%`;

      gsap.set(progressBar.current, {
        width: `${value}%`,
      });
    },
  });

  /*
  ----------------------------------------
  Small Hold
  ----------------------------------------
  */

  tl.to({}, { duration: 0.25 });

  /*
  ----------------------------------------
  Reveal Circle
  ----------------------------------------
  */

  tl.to(
    revealCircle.current,
    {
      opacity: 1,
      scale: 40,
      duration: 1,
      ease: "expo.inOut",
    },
    "-=0.15"
  );

  /*
  ----------------------------------------
  Fade Loader
  ----------------------------------------
  */

  tl.to(
    loader.current,
    {
      opacity: 0,
      duration: 0.4,
      pointerEvents: "none",
    },
    "-=0.3"
  );

  return tl;
};

export default initLoaderTimeline;