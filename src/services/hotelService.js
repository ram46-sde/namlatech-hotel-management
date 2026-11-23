import api from "./api";

// Fetch all hotels
export const getHotels = async () => {
  const response = await api.get("/hotels");
  return response.data;
};

// Add a new hotel
export const createHotel = async (hotel) => {
  const response = await api.post("/hotels", hotel);
  return response.data;
};

// Update an existing hotel
export const updateHotel = async (id, hotel) => {
  const response = await api.put(`/hotels/${id}`, hotel);
  return response.data;
};

// Delete a hotel
export const deleteHotel = async (id) => {
  const response = await api.delete(`/hotels/${id}`);
  return response.data;
};