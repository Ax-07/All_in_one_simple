import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
// import '../styles/Navbar.scss';

const Navbar: React.FC = () => {
  const location = useLocation();
  const [activeLink, setActiveLink] = useState(
    location.pathname + location.hash
  );

  useEffect(() => {
    setActiveLink(location.pathname + location.hash);
  }, [location]);

  const Links = [
    { name: "features", href: "#features" },
    { name: "testimonials", href: "#testimonials" },
    { name: "pricing", href: "#pricing" },
    { name: "Contact", href: "#contact" },
  ];

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <nav className="navbar">
      <div className="logo">
        <Link to="/" onClick={scrollToTop}>RéservApp</Link>
      </div>
      <ul className="nav-links">
        {Links.map((link, index) => (
          <li key={index} className="nav-section__item">
            <Link
              to={link.href}
              className={`nav-section__link ${
                activeLink === link.href ? "nav-section__link--active" : ""
              }`}
            >
              {link.name}
            </Link>
          </li>
        ))}
      </ul>
      <div className="auth-buttons">
        <button
          className="login-btn"
          onClick={() => (window.location.href = "/login")}
        >
          Connexion
        </button>
        <button
          className="signup-btn"
          onClick={() => (window.location.href = "/signup")}
        >
          Inscription
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
