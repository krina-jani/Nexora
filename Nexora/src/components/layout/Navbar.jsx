import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <header className="navbar">
      <div className="container navbar-container">
        <div className="logo">
          Nexora
        </div>

        <nav>
          <ul className="nav-links">
            <li>
              <NavLink to="/">Home</NavLink>
            </li>

            <li>
              <NavLink to="/about">About</NavLink>
            </li>

            <li>
              <NavLink to="/services">Services</NavLink>
            </li>

            <li>
              <NavLink to="/industries">Industries</NavLink>
            </li>

            {/* <li>
              <NavLink to="/testimonials">Testimonials</NavLink>
            </li> */}

            <li>
              <NavLink to="/contact">Contact</NavLink>
            </li>
          </ul>
        </nav>

        <a href="#" className="btn">
          Get Started
        </a>
      </div>
    </header>
  );
};

export default Navbar;