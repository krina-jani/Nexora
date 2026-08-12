import { useState, useEffect } from "react";
import { NavLink, Link, useLocation, useNavigate } from "react-router-dom";
import { FaBars, FaTimes, FaSun, FaMoon } from "react-icons/fa";
import { LuChevronDown } from "react-icons/lu";
import logo from "../../assets/icons/nexoralogo.png";
import "./Navbar.css";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const [industriesDropdownOpen, setIndustriesDropdownOpen] = useState(false);
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "dark";
  });

  const location = useLocation();
  const navigate = useNavigate();

  const handleServicesDropdownClick = (e, hash) => {
    setServicesDropdownOpen(false);
    setMenuOpen(false);
    
    if (location.pathname === "/services") {
      e.preventDefault();
      window.history.pushState(null, '', `/services${hash}`);
      const el = document.getElementById(hash.replace('#', ''));
      if (el) {
        const y = el.getBoundingClientRect().top + window.scrollY - 120;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    }
  };

  const handleIndustriesDropdownClick = (e, hash) => {
    setIndustriesDropdownOpen(false);
    setMenuOpen(false);

    if (location.pathname === "/industries") {
      e.preventDefault();
      window.history.pushState(null, '', `/industries${hash}`);
      const el = document.getElementById(hash.replace('#', ''));
      if (el) {
        const y = el.getBoundingClientRect().top + window.scrollY - 120;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    } else {
      navigate(`/industries${hash}`);
    }
  };

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
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

  // Lock scroll when mobile menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <header className={`navbar-header ${scrolled ? "scrolled" : ""} ${menuOpen ? "menu-open" : ""}`}>
      <div className="navbar-glass-container">
        <NavLink to="/" className="navbar-logo">
          <img src={logo} alt="Nexora Logo" className="logo-image" />
          <span className="logo-main">Nexora</span>
          <span className="logo-sub">Career</span>
        </NavLink>

        <nav className={`navbar-nav ${menuOpen ? "open" : ""}`}>
          <ul className="navbar-links">
            {/* 1. Home */}
            <li>
              <NavLink to="/" end className={({ isActive }) => (isActive ? "active" : "")}>
                Home
              </NavLink>
            </li>

            {/* 2. About */}
            <li>
              <NavLink to="/about" className={({ isActive }) => (isActive ? "active" : "")}>
                About
              </NavLink>
            </li>

            {/* 3. Industries Dropdown */}
            <li 
              className="navbar-item-dropdown"
              onMouseEnter={() => setIndustriesDropdownOpen(true)}
              onMouseLeave={() => setIndustriesDropdownOpen(false)}
            >
              <NavLink 
                to="/industries"
                className={`dropdown-trigger ${location.pathname === "/industries" ? "active" : ""}`}
                onClick={() => {
                  setIndustriesDropdownOpen(false);
                  setMenuOpen(false);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
              >
                Industries <LuChevronDown className={`chevron ${industriesDropdownOpen ? "open" : ""}`} />
              </NavLink>
              
              <ul className={`simple-dropdown ${industriesDropdownOpen ? "show" : ""}`}>
                <li>
                  <Link to="/industries#tech-careers" onClick={(e) => handleIndustriesDropdownClick(e, '#tech-careers')}>
                    Tech
                  </Link>
                </li>
                <li>
                  <Link to="/industries#non-tech-careers" onClick={(e) => handleIndustriesDropdownClick(e, '#non-tech-careers')}>
                    Non-Tech
                  </Link>
                </li>
              </ul>
            </li>

            {/* 4. Services Dropdown */}
            <li 
              className="navbar-item-dropdown"
              onMouseEnter={() => setServicesDropdownOpen(true)}
              onMouseLeave={() => setServicesDropdownOpen(false)}
            >
              <NavLink 
                to="/services"
                className={`dropdown-trigger ${location.pathname === "/services" ? "active" : ""}`}
                onClick={() => {
                  setServicesDropdownOpen(false);
                  setMenuOpen(false);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
              >
                Services <LuChevronDown className={`chevron ${servicesDropdownOpen ? "open" : ""}`} />
              </NavLink>
              
              <ul className={`simple-dropdown ${servicesDropdownOpen ? "show" : ""}`}>
                <li>
                  <Link to="/services#rpo" onClick={(e) => handleServicesDropdownClick(e, '#rpo')}>
                    Profile & Resume <span className="hide-on-mobile">Optimization</span>
                  </Link>
                </li>
                <li>
                  <Link to="/services#career-support" onClick={(e) => handleServicesDropdownClick(e, '#career-support')}>
                    Career Support Services
                  </Link>
                </li>
                <li>
                  <Link to="/services#career-growth" onClick={(e) => handleServicesDropdownClick(e, '#career-growth')}>
                    Career Growth Packages
                  </Link>
                </li>
                <li>
                  <Link to="/services#pro-services" onClick={(e) => handleServicesDropdownClick(e, '#pro-services')}>
                    Pro Services
                  </Link>
                </li>
                <li>
                  <Link to="/services#custom-services" onClick={(e) => handleServicesDropdownClick(e, '#custom-services')}>
                    Custom Services
                  </Link>
                </li>
              </ul>
            </li>

            {/* 5. Contact */}
            <li>
              <NavLink to="/contact" className={({ isActive }) => (isActive ? "active" : "")}>
                Contact
              </NavLink>
            </li>
            <li className="mobile-cta-item">
              <NavLink to="/contact" className="btn-primary mobile-nav-cta">
                Book Free Consultation
              </NavLink>
            </li>
          </ul>
        </nav>

        <div className="navbar-actions">
          <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle Theme">
            {theme === "dark" ? <FaSun /> : <FaMoon />}
          </button>

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