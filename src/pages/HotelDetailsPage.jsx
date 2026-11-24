import { useEffect } from "react";
import { Link, useParams } from "react-router";

import { useDispatch, useSelector } from "react-redux";

import { fetchHotelById } from "../features/hotels/hotelsSlice";
import HotelMap from "../components/HotelMap/HotelMap";

import "./HotelDetailsPage.css";

function HotelDetailsPage() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { selectedHotel, selectedHotelStatus, error } = useSelector(
    (state) => state.hotels,
  );

  // Fetch the selected hotel
  useEffect(() => {
    dispatch(fetchHotelById(id));
  }, [dispatch, id]);

  // Loading state
  if (selectedHotelStatus === "loading") {
    return (
      <main className="details-message">
        <p>Loading hotel details...</p>
      </main>
    );
  }

  // Error state
  if (selectedHotelStatus === "failed") {
    return (
      <main className="details-message">
        <h2>Hotel not found</h2>
        <p>{error || "Unable to load hotel details."}</p>
        <Link to="/">Back to Hotels</Link>
      </main>
    );
  }

  if (!selectedHotel) {
    return (
      <main className="details-message">
        <p>Preparing hotel details...</p>
      </main>
    );
  }

  const hotel = selectedHotel;

  return (
    <main className="hotel-details-page">
      {/* Page navigation */}
      <div className="details-navigation">
        <Link to="/" className="back-button">
          ← Back to Hotels
        </Link>

        <Link to={`/hotels/${hotel.id}/edit`} className="details-edit-button">
          Edit Hotel
        </Link>
      </div>

      {/* Hotel information */}
      <section className="hotel-details-card">
        <div className="details-image-wrapper">
          <img src={hotel.image} alt={hotel.title} className="details-image" />
        </div>

        <div className="details-content">
          <p className="eyebrow">HOTEL INFORMATION</p>

          <h1>{hotel.title}</h1>

          <div className="details-price">
            ₹{Number(hotel.price).toLocaleString("en-IN")}
            <span> / night</span>
          </div>

          <div className="details-description">
            <h2>About this Hotel</h2>
            <p>{hotel.description}</p>
          </div>

          <div className="coordinates-section">
            <h2>Location Coordinates</h2>

            <div className="coordinate-grid">
              <div>
                <span>Latitude</span>
                <strong>{hotel.latitude}</strong>
              </div>

              <div>
                <span>Longitude</span>
                <strong>{hotel.longitude}</strong>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Hotel location map */}
      <section className="details-map-section">
        <h2>Hotel Location</h2>

        <p>Explore the hotel's location using its geographic coordinates.</p>

        <HotelMap
          latitude={hotel.latitude}
          longitude={hotel.longitude}
          title={hotel.title}
        />
      </section>
    </main>
  );
}

export default HotelDetailsPage;
