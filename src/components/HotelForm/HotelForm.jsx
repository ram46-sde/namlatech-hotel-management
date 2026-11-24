import { useEffect, useState } from "react";
import "./HotelForm.css";


function HotelForm({
  initialValues,
  onSubmit,
  submitLabel = "Save Hotel",
  isSubmitting = false,
}) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    latitude: "",
    longitude: "",
    price: "",
    image: "",
  });

  const [imagePreview, setImagePreview] = useState("");
  const [errors, setErrors] = useState({});

  // Populate the form when editing an existing hotel
  useEffect(() => {
    if (initialValues) {
      setFormData({
        title: initialValues.title ?? "",
        description: initialValues.description ?? "",
        latitude: String(initialValues.latitude ?? ""),
        longitude: String(initialValues.longitude ?? ""),
        price: String(initialValues.price ?? ""),
        image: initialValues.image ?? "",
      });

      setImagePreview(initialValues.image ?? "");
    } else {
      setFormData({
        title: "",
        description: "",
        latitude: "",
        longitude: "",
        price: "",
        image: "",
      });

      setImagePreview("");
    }

    setErrors({});
  }, [initialValues]);

  // Handle text and number inputs
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    setErrors((previous) => ({
      ...previous,
      [name]: "",
    }));
  };

  // Handle image upload and preview
  const handleImageChange = (event) => {
    const file = event.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setErrors((previous) => ({
        ...previous,
        image: "Please select a valid image.",
      }));
      event.target.value = "";
      return;
    }

    if (file.size > 1024 * 1024) {
      setErrors((previous) => ({
        ...previous,
        image: "Image size must be less than 1 MB.",
      }));
      event.target.value = "";
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      const imageData = reader.result;

      setFormData((previous) => ({
        ...previous,
        image: imageData,
      }));

      setImagePreview(imageData);

      setErrors((previous) => ({
        ...previous,
        image: "",
      }));
    };

    reader.onerror = () => {
      setErrors((previous) => ({
        ...previous,
        image: "Unable to read the selected image.",
      }));
    };

    reader.readAsDataURL(file);
  };

  // Validate all form fields
  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = "Hotel name is required.";
    }

    if (!formData.description.trim()) {
      newErrors.description = "Description is required.";
    }

    const latitude = Number(formData.latitude);
    const longitude = Number(formData.longitude);
    const price = Number(formData.price);

    if (
      formData.latitude === "" ||
      !Number.isFinite(latitude) ||
      latitude < -90 ||
      latitude > 90
    ) {
      newErrors.latitude = "Enter a valid latitude between -90 and 90.";
    }

    if (
      formData.longitude === "" ||
      !Number.isFinite(longitude) ||
      longitude < -180 ||
      longitude > 180
    ) {
      newErrors.longitude = "Enter a valid longitude between -180 and 180.";
    }

    if (formData.price === "" || !Number.isFinite(price) || price <= 0) {
      newErrors.price = "Price must be greater than zero.";
    }

    if (!formData.image) {
      newErrors.image = "Please upload a hotel image.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();

    if (!validateForm()) return;

    const hotelData = {
      title: formData.title.trim(),
      description: formData.description.trim(),
      latitude: Number(formData.latitude),
      longitude: Number(formData.longitude),
      price: Number(formData.price),
      image: formData.image,
    };

    onSubmit(hotelData);
  };

  return (
    <form className="hotel-form" onSubmit={handleSubmit}>
      {/* Hotel Image */}
      <div className="form-field">
        <label htmlFor="image">Hotel Image</label>

        <input
          id="image"
          type="file"
          accept="image/*"
          onChange={handleImageChange}
        />

        {errors.image && <p className="form-error">{errors.image}</p>}

        {imagePreview && (
          <div className="image-preview-container">
            <img
              src={imagePreview}
              alt="Hotel preview"
              className="form-image-preview"
            />
          </div>
        )}
      </div>

      {/* Hotel Title */}
      <div className="form-field">
        <label htmlFor="title">Hotel Name</label>

        <input
          id="title"
          name="title"
          type="text"
          placeholder="Enter hotel name"
          value={formData.title}
          onChange={handleChange}
        />

        {errors.title && <p className="form-error">{errors.title}</p>}
      </div>

      {/* Description */}
      <div className="form-field">
        <label htmlFor="description">Description</label>

        <textarea
          id="description"
          name="description"
          rows="4"
          placeholder="Enter hotel description"
          value={formData.description}
          onChange={handleChange}
        />

        {errors.description && (
          <p className="form-error">{errors.description}</p>
        )}
      </div>

      {/* Latitude and Longitude */}
      <div className="form-row">
        <div className="form-field">
          <label htmlFor="latitude">Latitude</label>

          <input
            id="latitude"
            name="latitude"
            type="number"
            step="any"
            placeholder="Enter latitude"
            value={formData.latitude}
            onChange={handleChange}
          />

          {errors.latitude && <p className="form-error">{errors.latitude}</p>}
        </div>

        <div className="form-field">
          <label htmlFor="longitude">Longitude</label>

          <input
            id="longitude"
            name="longitude"
            type="number"
            step="any"
            placeholder="Enter longitude"
            value={formData.longitude}
            onChange={handleChange}
          />

          {errors.longitude && <p className="form-error">{errors.longitude}</p>}
        </div>
      </div>

      {/* Price */}
      <div className="form-field">
        <label htmlFor="price">Price per Night (₹)</label>

        <input
          id="price"
          name="price"
          type="number"
          min="0"
          step="any"
          placeholder="Enter hotel price"
          value={formData.price}
          onChange={handleChange}
        />

        {errors.price && <p className="form-error">{errors.price}</p>}
      </div>

      {/* Submit */}
      <button
        type="submit"
        className="form-submit-button"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Saving..." : submitLabel}
      </button>
    </form>
  );
}

export default HotelForm;
