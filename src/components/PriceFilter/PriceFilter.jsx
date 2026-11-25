import "./PriceFilter.css";

function PriceFilter({
  minPrice,
  maxPrice,
  minBound = 0,
  maxBound = 10000,
  onMinChange,
  onMaxChange,
  onReset,
}) {
  const step = 100;

  const lowerValue = minPrice === "" ? minBound : Number(minPrice);

  const upperValue = maxPrice === "" ? maxBound : Number(maxPrice);

  const getPercentage = (value) =>
    ((value - minBound) / (maxBound - minBound)) * 100;

  const minPercentage = getPercentage(lowerValue);
  const maxPercentage = getPercentage(upperValue);

  return (
    <section className="price-filter-card">
      <div className="price-filter-heading">
        <h3>Price Range</h3>

        <button type="button" onClick={onReset}>
          Reset
        </button>
      </div>

      <div className="price-range-values">
        <strong>₹{lowerValue.toLocaleString("en-IN")}</strong>

        <span>to</span>

        <strong>₹{upperValue.toLocaleString("en-IN")}</strong>
      </div>

      <div className="dual-range-slider">
        <div className="range-track" />

        <div
          className="range-selected"
          style={{
            left: `${minPercentage}%`,
            right: `${100 - maxPercentage}%`,
          }}
        />

        <input
          type="range"
          className="range-input range-min"
          aria-label="Minimum hotel price"
          min={minBound}
          max={maxBound}
          step={step}
          value={lowerValue}
          onChange={(event) => {
            onMinChange(
              Math.min(Number(event.target.value), upperValue - step),
            );
          }}
        />

        <input
          type="range"
          className="range-input range-max"
          aria-label="Maximum hotel price"
          min={minBound}
          max={maxBound}
          step={step}
          value={upperValue}
          onChange={(event) => {
            onMaxChange(
              Math.max(Number(event.target.value), lowerValue + step),
            );
          }}
        />
      </div>

      <div className="manual-price-inputs">
        <div className="manual-price-field">
          <label htmlFor="sidebar-min-price">Minimum Price</label>

          <input
            id="sidebar-min-price"
            type="number"
            min={minBound}
            max={maxBound}
            placeholder="Min price"
            value={minPrice}
            onChange={(event) => onMinChange(event.target.value)}
          />
        </div>

        <div className="manual-price-field">
          <label htmlFor="sidebar-max-price">Maximum Price</label>

          <input
            id="sidebar-max-price"
            type="number"
            min={minBound}
            max={maxBound}
            placeholder="Max price"
            value={maxPrice}
            onChange={(event) => onMaxChange(event.target.value)}
          />
        </div>
      </div>

      <div className="price-range-boundaries">
        <span>₹{minBound.toLocaleString("en-IN")}</span>
        <span>₹{maxBound.toLocaleString("en-IN")}</span>
      </div>
    </section>
  );
}

export default PriceFilter;
