import { Outlet, useLocation } from "react-router-dom";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Loader from "../common/Loader/Loader";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import Background from "../Background/Background";
import CustomCursor from "../common/CustomCursor";
import { useState, useEffect, useRef } from "react";
import Lenis from "lenis";

const Layout = () => {
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const lenisRef = useRef(null);

  useEffect(() => {
    // Scroll to top and refresh GSAP ScrollTrigger on route change
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo(0, 0);
    }
    const timer1 = setTimeout(() => ScrollTrigger.refresh(), 100);
    const timer2 = setTimeout(() => ScrollTrigger.refresh(), 500);
    
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [location.pathname]);

  useEffect(() => {
    // Initialize Lenis Smooth Scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });
    lenisRef.current = lenis;

    if (loading) {
      lenis.stop();
    }

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (loading) {
      document.body.style.overflow = "hidden";
      if (lenisRef.current) lenisRef.current.stop();
    } else {
      document.body.style.overflow = "";
      if (lenisRef.current) lenisRef.current.start();
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [loading]);

  return (
    <>
      <CustomCursor />
      
      {loading && (
        <Loader onComplete={() => setLoading(false)} />
      )}

      <Background />

      <Navbar />

      <main style={{ minHeight: "80vh", paddingTop: (location.pathname === "/services" || location.pathname === "/contact" || location.pathname === "/industries") ? "0px" : "120px" }}>
        <Outlet />
      </main>

      <Footer />
    </>
  );
};

export default Layout;