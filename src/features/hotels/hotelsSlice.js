import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getHotels } from "../../services/hotelService";

// Async action: Fetch hotels
export const fetchHotels = createAsyncThunk(
  "hotels/fetchHotels",
  async (_, { rejectWithValue }) => {
    try {
      const hotels = await getHotels();
      return hotels;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  },
);

// Initial Redux state
const initialState = {
  items: [],
  status: "idle",
  error: null,
};

// Create hotel slice
const hotelsSlice = createSlice({
  name: "hotels",
  initialState,

  reducers: {},

  extraReducers: (builder) => {
    builder

      // Request started
      .addCase(fetchHotels.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })

      // Request successful
      .addCase(fetchHotels.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })

      // Request failed
      .addCase(fetchHotels.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Something went wrong";
      });
  },
});

export default hotelsSlice.reducer;
