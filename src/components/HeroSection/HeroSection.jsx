import { Link } from "react-router";

import maaligaiLogo from "../../assets/maaligai-logo.jpg";
import "./HeroSection.css";

function HeroSection() {
  return (
    <section className="hero-section" aria-labelledby="hero-heading">
      <div className="hero-overlay" aria-hidden="true" />

      <div className="hero-container">
        <div className="hero-content">
          <div className="hero-crest-row">
            <img
              src={maaligaiLogo}
              alt=""
              aria-hidden="true"
              className="hero-crest"
              width="56"
              height="56"
            />
            <span className="hero-eyebrow">Maaligai Hospitality</span>
          </div>

          <h1 id="hero-heading" className="hero-title">
            Timeless Hospitality, Thoughtfully Curated
          </h1>

          <p className="hero-subtitle">
            Explore distinctive properties, compare nightly rates, view
            interactive location maps, and manage your hotel collection from one
            unified space.
          </p>

          <div className="hero-actions">
            <Link to="/hotels" className="hero-cta-primary">
              Explore Hotels
            </Link>

            <Link to="/hotels/new" className="hero-cta-secondary">
              Add Your Hotel
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;

