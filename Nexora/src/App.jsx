import { Routes, Route } from "react-router-dom";

import Layout from "./components/layout/Layout";

import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import Industries from "./pages/Industries";
import Testimonials from "./pages/Testimonials";
import Contact from "./pages/Contact";


function App() {
  return (
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
  );
}

export default App;