import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router";

import maaligaiLogo from "../../assets/maaligai-logo.jpg";
import "./Navbar.css";

function Navbar() {
  const [menuOpenPath, setMenuOpenPath] = useState(null);
  const location = useLocation();
  const toggleButtonRef = useRef(null);

  const isMenuOpen = menuOpenPath === location.pathname;

  const closeMenu = () => {
    setMenuOpenPath(null);
  };

  // Close mobile menu on Escape and return focus to toggle button
  useEffect(() => {
    if (!isMenuOpen) return;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setMenuOpenPath(null);
        toggleButtonRef.current?.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isMenuOpen]);

  const handleContactClick = (event) => {
    event.preventDefault();
    closeMenu();

    const contactSection = document.getElementById("contact");
    if (!contactSection) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    contactSection.scrollIntoView({
      behavior: prefersReducedMotion ? "auto" : "smooth",
      block: "start",
    });
  };

  return (
    <header className="nav-header">
      <div className="nav-container">
        <Link to="/" className="nav-brand" onClick={closeMenu}>
          <img
            src={maaligaiLogo}
            alt="Maaligai logo"
            className="nav-logo"
            width="44"
            height="44"
          />
          <span className="nav-brand-text">
            <span className="nav-brand-title">Maaligai</span>
            <span className="nav-brand-subtitle">Hotel Management</span>
          </span>
        </Link>

        <button
          ref={toggleButtonRef}
          type="button"
          className="nav-toggle"
          aria-expanded={isMenuOpen}
          aria-controls="primary-navigation"
          aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
          onClick={() =>
            setMenuOpenPath((prev) =>
              prev === location.pathname ? null : location.pathname,
            )
          }
        >
          <span className="nav-toggle-bar" />
          <span className="nav-toggle-bar" />
          <span className="nav-toggle-bar" />
        </button>

        <nav
          id="primary-navigation"
          aria-label="Primary navigation"
          className={`nav-menu ${isMenuOpen ? "nav-menu-open" : ""}`}
        >
          <ul className="nav-links">
            <li>
              <NavLink
                to="/"
                end
                className={({ isActive }) =>
                  `nav-link ${isActive ? "nav-link-active" : ""}`
                }
                onClick={closeMenu}
              >
                Home
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/hotels"
                className={({ isActive }) =>
                  `nav-link ${isActive ? "nav-link-active" : ""}`
                }
                onClick={closeMenu}
              >
                Hotels
              </NavLink>
            </li>

            <li>
              <a
                href="#contact"
                className="nav-link nav-contact-link"
                onClick={handleContactClick}
              >
                Contact
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
