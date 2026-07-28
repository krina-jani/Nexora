import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Flip } from "gsap/Flip";
import "./WhyChooseNexora.css";

// Register plugins
gsap.registerPlugin(ScrollTrigger, Flip);

const WhyChooseNexora = () => {
  const containerRef = useRef(null);
  const galleryRef = useRef(null);

  const features = [
    {
      title: "Career Experts",
      desc: "Coaching by FAANG SDEs and tech leaders.",
      img: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=600&q=80"
    },
    {
      title: "Personal Mentorship",
      desc: "Dedicated weekly 1-on-1 milestone reviews.",
      img: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&w=600&q=80"
    },
    {
      title: "Industry Connections",
      desc: "Direct referrals to 250+ global hiring teams.",
      img: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=600&q=80"
    },
    {
      title: "ATS Friendly Resume",
      desc: "AI-enhanced parsing templates to double callbacks.",
      img: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&w=600&q=80"
    },
    {
      title: "Mock Interviews",
      desc: "Live practice matching real tech board loops.",
      img: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=600&q=80"
    },
    {
      title: "Placement Cell",
      desc: "Aggressive outreach support until you sign.",
      img: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=600&q=80"
    },
    {
      title: "Career Roadmap",
      desc: "Personalized trackers structured for major roles.",
      img: "https://images.unsplash.com/photo-1507537297725-24a1c029d3ca?auto=format&fit=crop&w=600&q=80"
    },
    {
      title: "Global Reach",
      desc: "Avenue pipelines targeting visa sponsor firms.",
      img: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=600&q=80"
    }
  ];

  useEffect(() => {
    const galleryElement = galleryRef.current;
    const galleryItems = galleryElement.querySelectorAll(".why-choose-gallery__item");
    let mm = gsap.matchMedia();
    let timer;

    mm.add("(min-width: 768px)", () => {
      timer = setTimeout(() => {
        // Capture initial state
        const state = Flip.getState(galleryItems);

        // Add class to switch to final full-screen styles
        galleryElement.classList.add("gallery--final");

        // Create Flip animation
        const flip = Flip.to(state, {
          simple: true,
          ease: "none"
        });

        // Bind Flip to ScrollTrigger pinning
        gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: "center center",
            end: "+=120%",
            scrub: true,
            pin: true,
            anticipatePin: 1
          }
        }).add(flip);
      }, 100);

      return () => {
        clearTimeout(timer);
        galleryElement.classList.remove("gallery--final");
      };
    });

    return () => {
      mm.revert();
    };
  }, []);

  return (
    <section className="why-choose-parent-section" ref={containerRef}>
      <h2 className="why-choose-title text-center">Why Choose Nexora</h2>
      <div className="why-choose-gallery-wrap">
        <div className="why-choose-gallery gallery--bento" ref={galleryRef}>
          {features.map((feat, index) => (
            <div key={index} className="why-choose-gallery__item glass">
              <img src={feat.img} alt={feat.title} className="why-choose-img" />
              <div className="why-choose-overlay">
                <h3>{feat.title}</h3>
                <p>{feat.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseNexora;
