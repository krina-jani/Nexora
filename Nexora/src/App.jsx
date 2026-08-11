import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";

const Home = lazy(() => import("./pages/Home"));
const About = lazy(() => import("./pages/About"));
const Services = lazy(() => import("./pages/Services"));
const Industries = lazy(() => import("./pages/Industries"));
const Testimonials = lazy(() => import("./pages/Testimonials"));
const Contact = lazy(() => import("./pages/Contact"));

const LoadingFallback = () => (
  <div
    style={{
      height: "100vh",
      display: "grid",
      placeItems: "center",
      background: "#000000",
      color: "#DFBD69",
      fontSize: "1.2rem",
    }}
  >
    Loading...
  </div>
);

function App() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/industries" element={<Industries />} />
          <Route path="/testimonials" element={<Testimonials />} />
          <Route path="/contact" element={<Contact />} />
        </Route>

        <Route
          path="*"
          element={
            <div
              style={{
                height: "100vh",
                display: "grid",
                placeItems: "center",
                fontSize: "3rem",
                fontWeight: "700",
              }}
            >
              404 | Page Not Found
            </div>
          }
        />
      </Routes>
    </Suspense>
  );
}

export default App;