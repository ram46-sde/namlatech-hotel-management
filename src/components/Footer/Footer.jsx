import { Link } from "react-router";

import maaligaiLogo from "../../assets/maaligai-logo.jpg";
import "./Footer.css";

// DEMO DATA: replace before production
const DEMO_CONTACT = {
  email: "hello@maaligai.example.com",
  phoneDisplay: "+91 55555 66666",
  phoneHref: "+91 1234567890",
  location: "Pondicherry, India",
};

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

            <ul className="site-footer-contact-list">
              <li className="site-footer-contact-item">
                <a
                  href={`mailto:${DEMO_CONTACT.email}`}
                  className="site-footer-contact-link"
                >
                  <svg
                    className="site-footer-contact-icon"
                    viewBox="0 0 24 24"
                    width="16"
                    height="16"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <rect x="2" y="4" width="20" height="16" rx="2" />
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                  </svg>
                  <span>{DEMO_CONTACT.email}</span>
                </a>
              </li>

              <li className="site-footer-contact-item">
                <a
                  href={`tel:${DEMO_CONTACT.phoneHref}`}
                  className="site-footer-contact-link"
                >
                  <svg
                    className="site-footer-contact-icon"
                    viewBox="0 0 24 24"
                    width="16"
                    height="16"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                  <span>{DEMO_CONTACT.phoneDisplay}</span>
                </a>
              </li>

              <li className="site-footer-contact-item site-footer-contact-location">
                <svg
                  className="site-footer-contact-icon"
                  viewBox="0 0 24 24"
                  width="16"
                  height="16"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                <span>{DEMO_CONTACT.location}</span>
              </li>
            </ul>
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
