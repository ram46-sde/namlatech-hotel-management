import { useState } from "react";
import { Link } from "react-router";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

import { removeHotel } from "../../features/hotels/hotelsSlice";

import "./HotelCard.css";

function HotelCard({ hotel }) {
  const dispatch = useDispatch();

  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${hotel.title}"?`,
    );

    if (!confirmed) return;

    try {
      setIsDeleting(true);

      await dispatch(removeHotel(hotel.id)).unwrap();

      toast.success(`${hotel.title} deleted successfully!`);
    } catch (error) {
      toast.error(
        typeof error === "string"
          ? error
          : "Failed to delete hotel. Please try again.",
      );
    } finally {
      setIsDeleting(false);
    }
  };

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

        <div className="hotel-actions">
          <Link to={`/hotels/${hotel.id}/edit`} className="edit-hotel-button">
            Edit Hotel
          </Link>

          <button
            type="button"
            className="delete-hotel-button"
            onClick={handleDelete}
            disabled={isDeleting}
          >
            {isDeleting ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </article>
  );
}

export default HotelCard;
