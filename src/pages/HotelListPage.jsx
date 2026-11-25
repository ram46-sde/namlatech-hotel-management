import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router";

import { fetchHotels } from "../features/hotels/hotelsSlice";
import HotelCard from "../components/HotelCard/HotelCard";
import PriceFilter from "../components/PriceFilter/PriceFilter";
import Pagination from "../components/Pagination/Pagination";
import PageSEO from "../components/SEO/PageSEO";

function HotelListPage() {
  const dispatch = useDispatch();

  // Redux state
  const { items, status, error } = useSelector((state) => state.hotels);

  // Search, price and pagination states
  const [searchTerm, setSearchTerm] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState("default");

  const hotelsPerPage = 6;

  // Fetch hotels from API
  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchHotels());
    }
  }, [dispatch, status]);

  // Filter hotels
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

  // Sort hotels
  const sortedHotels = [...filteredHotels].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return Number(a.price) - Number(b.price);

      case "price-high":
        return Number(b.price) - Number(a.price);

      case "name":
        return a.title.localeCompare(b.title);

      default:
        return 0;
    }
  });

  // Pagination calculations
  const totalPages = Math.ceil(sortedHotels.length / hotelsPerPage);

  const startIndex = (currentPage - 1) * hotelsPerPage;

  const paginatedHotels = sortedHotels.slice(
    startIndex,
    startIndex + hotelsPerPage,
  );

  // Reset pagination when filters or sorting change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, minPrice, maxPrice, sortBy]);

  // Keep current page valid after hotel deletion or filtering
  useEffect(() => {
    const validPage = Math.max(totalPages, 1);

    if (currentPage > validPage) {
      setCurrentPage(validPage);
    }
  }, [currentPage, totalPages]);

  return (
    <main className="app-shell">
      {/* SEO */}
      <PageSEO
        title="Explore Hotels"
        description="Explore and manage hotels with detailed descriptions, images, pricing and location information."
      />

      {/* Page Header */}
      <header className="page-header">
        <div>
          <p className="eyebrow">WELCOME TO Maaligai</p>

          <h1>Discover Hotels</h1>

          <p className="header-description">
            Explore and manage your hotel collection.
          </p>
        </div>
      </header>

      {/* Hotel Listing Section */}
      <section className="list-section" id="hotels">
        {/* Section Heading */}
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

        {/* Two Column Layout */}
        <div className="hotel-list-layout">
          {/* LEFT SIDEBAR */}
          <aside className="hotel-filter-sidebar">
            {/* Price Slider and Manual Inputs */}
            <PriceFilter
              minPrice={minPrice}
              maxPrice={maxPrice}
              minBound={0}
              maxBound={10000}
              onMinChange={setMinPrice}
              onMaxChange={setMaxPrice}
              onReset={() => {
                setMinPrice("");
                setMaxPrice("");
              }}
            />

            {/* Sort By */}
            <div className="sort-sidebar-card">
              <h3>Sort By</h3>

              <label htmlFor="sortBy">Sort hotels</label>

              <select
                id="sortBy"
                value={sortBy}
                onChange={(event) => setSortBy(event.target.value)}
              >
                <option value="default">Recommended</option>

                <option value="price-low">Price: Low to High</option>

                <option value="price-high">Price: High to Low</option>

                <option value="name">Hotel Name</option>
              </select>
            </div>
          </aside>

          {/* RIGHT SIDE HOTEL RESULTS */}
          <div className="hotel-results">
            {/* Search */}
            <div className="results-toolbar">
              <div className="search-container">
                <input
                  type="text"
                  placeholder="Search hotels by name..."
                  aria-label="Search hotels by name"
                  value={searchTerm}
                  onChange={(event) => setSearchTerm(event.target.value)}
                />
              </div>
            </div>

            {/* Loading */}
            {status === "loading" && (
              <p className="message">Loading hotels...</p>
            )}

            {/* Error */}
            {status === "failed" && (
              <p className="error-message">Failed to load hotels: {error}</p>
            )}

            {/* Empty Results */}
            {status === "succeeded" && filteredHotels.length === 0 && (
              <p className="message">No matching hotels found.</p>
            )}

            {/* Hotel Cards */}
            {status === "succeeded" && paginatedHotels.length > 0 && (
              <div className="hotel-grid">
                {paginatedHotels.map((hotel) => (
                  <HotelCard key={hotel.id} hotel={hotel} />
                ))}
              </div>
            )}

            {/* Reusable Pagination */}
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </div>
        </div>
      </section>
    </main>
  );
}

export default HotelListPage;
