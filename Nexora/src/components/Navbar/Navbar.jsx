import { useState, useEffect } from "react";
import { NavLink, Link, useLocation } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import { LuChevronDown } from "react-icons/lu";
import logo from "../../assets/icons/nexoralogo.png";
import "./Navbar.css";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const location = useLocation();

  const handleDropdownClick = (e, hash) => {
    setDropdownOpen(false);
    setMenuOpen(false); // close mobile menu too just in case
    
    if (location.pathname === "/services") {
      e.preventDefault();
      // change URL hash without jumping instantly
      window.history.pushState(null, '', `/services${hash}`);
      const el = document.getElementById(hash.replace('#', ''));
      if (el) {
        const y = el.getBoundingClientRect().top + window.scrollY - 120;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [location]);

  return (
    <header className={`navbar-header ${scrolled ? "scrolled" : ""}`}>
      <div className="navbar-glass-container">
        <NavLink to="/" className="navbar-logo">
          <img src={logo} alt="Nexora Logo" className="logo-image" />
           <span className="logo-main">Nexora</span>
          <span className="logo-sub">Career</span>
        </NavLink>

        <nav className={`navbar-nav ${menuOpen ? "open" : ""}`}>
          <ul className="navbar-links">
            <li>
              <NavLink to="/" end className={({ isActive }) => (isActive ? "active" : "")}>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/about" className={({ isActive }) => (isActive ? "active" : "")}>
                About
              </NavLink>
            </li>
            <li 
              className="navbar-item-dropdown"
              onMouseEnter={() => setDropdownOpen(true)}
              onMouseLeave={() => setDropdownOpen(false)}
            >
              <button 
                className={`dropdown-trigger ${location.pathname === "/services" ? "active" : ""}`}
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                Services <LuChevronDown className={`chevron ${dropdownOpen ? "open" : ""}`} />
              </button>
              
              <ul className={`simple-dropdown ${dropdownOpen ? "show" : ""}`}>
                <li>
                  <Link to="/services#rpo" onClick={(e) => handleDropdownClick(e, '#rpo')}>
                    Recruitment Process Outsourcing
                  </Link>
                </li>
                <li>
                  <Link to="/services#career-support" onClick={(e) => handleDropdownClick(e, '#career-support')}>
                    Career Support Services
                  </Link>
                </li>
                <li>
                  <Link to="/services#career-growth" onClick={(e) => handleDropdownClick(e, '#career-growth')}>
                    Career Growth Packages
                  </Link>
                </li>
                <li>
                  <Link to="/services#pro-services" onClick={(e) => handleDropdownClick(e, '#pro-services')}>
                    Pro Services
                  </Link>
                </li>
                <li>
                  <Link to="/services#custom-services" onClick={(e) => handleDropdownClick(e, '#custom-services')}>
                    Custom Services
                  </Link>
                </li>
              </ul>
            </li>
            <li>
              <NavLink to="/industries" className={({ isActive }) => (isActive ? "active" : "")}>
                Industries
              </NavLink>
            </li>
            <li>
              <NavLink to="/testimonials" className={({ isActive }) => (isActive ? "active" : "")}>
                Success Stories
              </NavLink>
            </li>
            <li>
              <NavLink to="/contact" className={({ isActive }) => (isActive ? "active" : "")}>
                Contact
              </NavLink>
            </li>
          </ul>
        </nav>

        <div className="navbar-actions">
          <NavLink to="/contact" className="btn-primary navbar-cta">
            Book Free Consultation
          </NavLink>

          <button className="mobile-toggle" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;