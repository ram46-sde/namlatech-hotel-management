import "./HotelCard.css";

function HotelCard({ hotel }) {
  return (
    <article className="hotel-card">
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
  );
}

export default HotelCard;
