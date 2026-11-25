import { Link } from "react-router";

import maaligaiLogo from "../../assets/maaligai-logo.jpg";
import "./Footer.css";

function Footer() {
  const currentYear = new Date().getFullYear();

  const handleContactScroll = (event) => {
    event.preventDefault();

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
    <footer className="site-footer">
      <div className="site-footer-container">
        <div className="site-footer-grid">
          {/* Brand Column */}
          <div className="site-footer-col site-footer-brand">
            <Link to="/" className="site-footer-brand-link">
              <img
                src={maaligaiLogo}
                alt="Maaligai logo"
                className="site-footer-logo"
                width="48"
                height="48"
              />
              <span className="site-footer-brand-name">Maaligai</span>
            </Link>

            <p className="site-footer-description">
              A hospitality listing and hotel management application built to
              browse stays, explore locations, and maintain property records.
            </p>
          </div>

          {/* Quick Navigation Column */}
          <div className="site-footer-col">
            <h2 className="site-footer-heading">Quick Links</h2>
            <ul className="site-footer-list">
              <li>
                <Link to="/" className="site-footer-link">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/hotels" className="site-footer-link">
                  Hotels
                </Link>
              </li>
              <li>
                <Link to="/hotels/new" className="site-footer-link">
                  Add Hotel
                </Link>
              </li>
              <li>
                <a
                  href="#contact"
                  className="site-footer-link"
                  onClick={handleContactScroll}
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Platform Features Column */}
          <div className="site-footer-col">
            <h2 className="site-footer-heading">Platform Features</h2>
            <ul className="site-footer-list">
              <li className="site-footer-feature">Hotel Listings</li>
              <li className="site-footer-feature">Search &amp; Filters</li>
              <li className="site-footer-feature">Hotel Management</li>
              <li className="site-footer-feature">Location Maps</li>
            </ul>
          </div>

          {/* Contact Column */}
          <div id="contact" className="site-footer-col site-footer-contact">
            <h2 className="site-footer-heading">Contact</h2>
            <p className="site-footer-contact-text">
              Maaligai is developed as part of the NamlaTech Hotel Management.
            </p>
          </div>
        </div>

        <div className="site-footer-bottom">
          <p className="site-footer-copy">
            &copy; {currentYear} Maaligai. Developed for NamlaTech Hotel
            Management.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

