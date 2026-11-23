import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchHotels } from "./features/hotels/hotelsSlice";
import "./App.css";

function App() {
  const dispatch = useDispatch();

  const { items, status, error } = useSelector((state) => state.hotels);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchHotels());
    }
  }, [dispatch, status]);

  return (
    <main className="app-shell">
      <header className="page-header">
        <div className="brand-mark">N</div>

        <div>
          <p className="eyebrow">NAMLATECH · HOTEL MANAGEMENT</p>
          <h1>Discover Hotels</h1>
          <p className="header-description">
            Explore and manage your hotel collection.
          </p>
        </div>
      </header>

      <section className="list-section">
        <div className="section-heading">
          <div>
            <h2>Hotel Listings</h2>
            <p>Browse available properties</p>
          </div>

          {status === "succeeded" && (
            <span className="count-badge">{items.length} Hotels</span>
          )}
        </div>

        {status === "loading" && <p className="message">Loading hotels...</p>}

        {status === "failed" && (
          <p className="error-message">Failed to load hotels: {error}</p>
        )}

        {status === "succeeded" && items.length === 0 && (
          <p className="message">No hotels available.</p>
        )}

        {status === "succeeded" && items.length > 0 && (
          <div className="hotel-grid">
            {items.map((hotel) => (
              <article className="hotel-card" key={hotel.id}>
                <div className="hotel-image-wrapper">
                  <img
                    src={hotel.image}
                    alt={hotel.title}
                    className="hotel-image"
                    loading="lazy"
                  />
                </div>

                <div className="hotel-content">
                  <h3>{hotel.title}</h3>

                  <p className="hotel-description">{hotel.description}</p>

                  <div className="hotel-footer">
                    <strong>
                      ₹{Number(hotel.price).toLocaleString("en-IN")}
                      <span> / night</span>
                    </strong>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}

export default App;
