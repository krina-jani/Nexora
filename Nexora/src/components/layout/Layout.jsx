import { Outlet } from "react-router-dom";
import Loader from "../common/Loader/Loader";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import Background from "../Background/Background";
import CustomCursor from "../common/CustomCursor";
import { useState, useEffect } from "react";
import Lenis from "lenis";

const Layout = () => {
  const [loading, setLoading] = useState(true);

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

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <>
      <CustomCursor />
      
      {loading && (
        <Loader onComplete={() => setLoading(false)} />
      )}

      <Background />

      <Navbar />

      <main style={{ minHeight: "80vh", paddingTop: "120px" }}>
        <Outlet />
      </main>

      <Footer />
    </>
  );
};

export default Layout;