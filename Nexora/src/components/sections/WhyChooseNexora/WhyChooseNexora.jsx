import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Flip } from "gsap/Flip";
import "./WhyChooseNexora.css";

// Import local image assets
import industryFocusImg from "../../../assets/images/industry-focus.png";
import atsResumeImg from "../../../assets/images/ats-resume.jpg";
import mockInterviewsImg from "../../../assets/images/mock-interviews.jpg";
import careerRoadmapImg from "../../../assets/images/career-roadmap.png";
import profileAlignmentImg from "../../../assets/images/profile-alignment.png";

// Register plugins
gsap.registerPlugin(ScrollTrigger, Flip);

const WhyChooseNexora = () => {
  const containerRef = useRef(null);
  const galleryRef = useRef(null);

  const features = [
    {
      title: "Career Advisors",
      desc: "Coaching by experienced tech leaders and industry experts.",
      img: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=600&q=80"
    },
    {
      title: "Personal Mentorship",
      desc: "Dedicated weekly 1-on-1 milestone reviews.",
      img: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&w=600&q=80"
    },
    {
      title: "Industry Focus",
      desc: "Support and advice tailored to US market standards.",
      img: industryFocusImg
    },
    {
      title: "ATS Friendly Resume",
      desc: "ATS-optimized layouts focused on recruiter readability.",
      img: atsResumeImg
    },
    {
      title: "Mock Interviews",
      desc: "Practice loops matching modern technical assessments.",
      img: mockInterviewsImg
    },
    {
      title: "Profile Alignment",
      desc: "Mapping your skills to active US role listings.",
      img: profileAlignmentImg
    },
    {
      title: "Career Roadmap",
      desc: "Personalized milestone trackers structured for US roles.",
      img: careerRoadmapImg
    },
    {
      title: "Sponsorship Guidance",
      desc: "Support on how to present your profile to sponsor firms.",
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
      <h2 className="why-choose-title text-center">Why Nexora Career Leads in Career Support & Alignment</h2>
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
