import { Link } from "react-router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchHotels } from "../features/hotels/hotelsSlice";
import HotelCard from "../components/HotelCard/HotelCard";
import PageSEO from "../components/SEO/PageSEO";
//import { Link } from "react-router";
//import "../App.css";

function HotelListPage() {
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const hotelsPerPage = 6;

  const { items, status, error } = useSelector((state) => state.hotels);
  const filteredHotels = items.filter((hotel) => {
    const matchesSearch = hotel.title
      .toLowerCase()
      .includes(searchTerm.trim().toLowerCase());

    const matchesMinPrice =
      minPrice === "" || Number(hotel.price) >= Number(minPrice);

    const matchesMaxPrice =
      maxPrice === "" || Number(hotel.price) <= Number(maxPrice);

    return matchesSearch && matchesMinPrice && matchesMaxPrice;
  });
  const totalPages = Math.ceil(filteredHotels.length / hotelsPerPage);
  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(Math.max(totalPages, 1));
    }
  }, [currentPage, totalPages]);

  const startIndex = (currentPage - 1) * hotelsPerPage;

  const paginatedHotels = filteredHotels.slice(
    startIndex,
    startIndex + hotelsPerPage,
  );
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, minPrice, maxPrice]);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchHotels());
    }
  }, [dispatch, status]);

  return (
    <main className="app-shell">
      <PageSEO
        title="Explore Hotels"
        description="Explore and manage hotels with detailed descriptions, images, pricing and location information."
      />
      <header className="page-header">
        <div>
          <p className="eyebrow">WELCOME TO Maaligai</p>
          <h1>Discover Hotels</h1>
          <p className="header-description">
            Explore and manage your hotel collection.
          </p>
        </div>
      </header>

      <section className="list-section" id="hotels">
        <div className="section-heading">
          <div>
            <h2>Hotel Listings</h2>
            <p>Browse available properties</p>
          </div>

          <div className="section-actions">
            {status === "succeeded" && (
              <span className="count-badge">
                {filteredHotels.length} Hotels
              </span>
            )}

            <Link to="/hotels/new" className="add-hotel-button">
              + Add Hotel
            </Link>
          </div>
        </div>

        <div className="search-container">
          <input
            type="text"
            placeholder="Search hotels by name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="price-filter-container">
          <div>
            <label htmlFor="minPrice">Minimum Price</label>
            <input
              id="minPrice"
              type="number"
              min="0"
              placeholder="Min price"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="maxPrice">Maximum Price</label>
            <input
              id="maxPrice"
              type="number"
              min="0"
              placeholder="Max price"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
            />
          </div>
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
            {paginatedHotels.map((hotel) => (
              <HotelCard key={hotel.id} hotel={hotel} />
            ))}
          </div>
        )}

        {totalPages > 1 && (
          <nav className="pagination" aria-label="Hotel pages">
            <button
              type="button"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((prev) => prev - 1)}
            >
              Previous
            </button>

            {Array.from({ length: totalPages }, (_, index) => index + 1).map(
              (page) => (
                <button
                  type="button"
                  key={page}
                  className={currentPage === page ? "active" : ""}
                  aria-current={currentPage === page ? "page" : undefined}
                  onClick={() => setCurrentPage(page)}
                >
                  {page}
                </button>
              ),
            )}

            <button
              type="button"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((prev) => prev + 1)}
            >
              Next
            </button>
          </nav>
        )}

        {status === "succeeded" && filteredHotels.length === 0 && (
          <p className="message">No matching hotels found.</p>
        )}
      </section>
    </main>
  );
}

export default HotelListPage;
