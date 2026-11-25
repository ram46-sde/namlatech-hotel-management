import { useEffect } from "react";

import { Link, useNavigate, useParams } from "react-router";

import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import HotelForm from "../components/HotelForm/HotelForm";
import PageSEO from "../components/SEO/PageSEO";
import {
  fetchHotelById,
  addHotel,
  updateHotel,
} from "../features/hotels/hotelsSlice";

function HotelFormPage() {
  const { id } = useParams();

  const isEditing = Boolean(id);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { selectedHotel, selectedHotelStatus, mutationStatus, mutationError } =
    useSelector((state) => state.hotels);

  // Fetch existing hotel when editing
  useEffect(() => {
    if (isEditing) {
      dispatch(fetchHotelById(id));
    }
  }, [dispatch, id, isEditing]);

  // Handle form submission
  const handleSubmit = async (hotelData) => {
    try {
      if (isEditing) {
        await dispatch(updateHotel({ id, hotel: hotelData })).unwrap();

        toast.success("Hotel updated successfully!");
      } else {
        await dispatch(addHotel(hotelData)).unwrap();

        toast.success("Hotel added successfully!");
      }

      navigate("/hotels");
    } catch (error) {
      toast.error(error || mutationError || "Unable to save hotel.");
    }
  };

  // Loading state while fetching existing hotel
  if (isEditing && selectedHotelStatus === "loading") {
    return <p className="message">Loading hotel details...</p>;
  }

  // Error state
  if (isEditing && selectedHotelStatus === "failed") {
    return (
      <main className="placeholder-page">
        <h2>Unable to load hotel</h2>
        <p>{mutationError || "Hotel not found or API error."}</p>
        <Link to="/hotels">Back to Hotel Listings</Link>
      </main>
    );
  }

  if (isEditing && selectedHotelStatus !== "succeeded") {
    return <p className="message">Preparing hotel form...</p>;
  }

  return (
    <main className="hotel-form-page">
      <PageSEO
        title={isEditing ? "Edit Hotel" : "Add New Hotel"}
        description={
          isEditing
            ? "Update hotel information, pricing and location details."
            : "Add a new hotel with its image, description, price and location."
        }
        noIndex
      />
      <div className="form-page-header">
        <div>
          <p className="eyebrow">NAMLATECH · HOTEL MANAGEMENT</p>

          <h1>{isEditing ? "Edit Hotel" : "Add New Hotel"}</h1>

          <p>
            {isEditing
              ? "Update the existing hotel information."
              : "Add a new hotel to your collection."}
          </p>
        </div>

        <Link to="/hotels" className="back-button">
          Back to Hotels
        </Link>
      </div>

      <section className="hotel-form-card">
        <HotelForm
          initialValues={isEditing ? selectedHotel : null}
          onSubmit={handleSubmit}
          submitLabel={isEditing ? "Update Hotel" : "Add Hotel"}
          isSubmitting={mutationStatus === "loading"}
        />
      </section>
    </main>
  );
}

export default HotelFormPage;
