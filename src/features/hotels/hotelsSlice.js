import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import {
  getHotels,
  getHotelById as getHotelByIdRequest,
  createHotel as createHotelRequest,
  updateHotel as updateHotelRequest,
  deleteHotel as deleteHotelRequest,
} from "../../services/hotelService";

// Fetch all hotels
export const fetchHotels = createAsyncThunk(
  "hotels/fetchHotels",
  async (_, { rejectWithValue }) => {
    try {
      return await getHotels();
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  },
);

// Fetch one hotel
export const fetchHotelById = createAsyncThunk(
  "hotels/fetchHotelById",
  async (id, { rejectWithValue }) => {
    try {
      return await getHotelByIdRequest(id);
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  },
);

// Add hotel
export const addHotel = createAsyncThunk(
  "hotels/addHotel",
  async (hotel, { rejectWithValue }) => {
    try {
      return await createHotelRequest(hotel);
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  },
);

// Update hotel
export const updateHotel = createAsyncThunk(
  "hotels/updateHotel",
  async ({ id, hotel }, { rejectWithValue }) => {
    try {
      return await updateHotelRequest(id, hotel);
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  },
);

// Delete hotel
export const removeHotel = createAsyncThunk(
  "hotels/removeHotel",
  async (id, { rejectWithValue }) => {
    try {
      await deleteHotelRequest(id);
      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  },
);

// Initial state
const initialState = {
  items: [],
  selectedHotel: null,

  status: "idle",
  selectedHotelStatus: "idle",
  mutationStatus: "idle",

  error: null,
  mutationError: null,
};

// Create Redux slice
const hotelsSlice = createSlice({
  name: "hotels",
  initialState,
  reducers: {
    resetMutationStatus: (state) => {
      state.mutationStatus = "idle";
      state.mutationError = null;
    },
  },

  extraReducers: (builder) => {
    builder

      // Fetch all hotels
      .addCase(fetchHotels.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchHotels.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchHotels.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Failed to fetch hotels";
      })

      // Fetch one hotel
      .addCase(fetchHotelById.pending, (state) => {
        state.selectedHotelStatus = "loading";
        state.selectedHotel = null;
      })
      .addCase(fetchHotelById.fulfilled, (state, action) => {
        state.selectedHotelStatus = "succeeded";
        state.selectedHotel = action.payload;
      })
      .addCase(fetchHotelById.rejected, (state, action) => {
        state.selectedHotelStatus = "failed";
        state.selectedHotel = null;
        state.error = action.payload || "Hotel not found";
      })

      // Add hotel
      .addCase(addHotel.pending, (state) => {
        state.mutationStatus = "loading";
        state.mutationError = null;
      })
      .addCase(addHotel.fulfilled, (state, action) => {
        state.mutationStatus = "succeeded";
        state.items.push(action.payload);
      })
      .addCase(addHotel.rejected, (state, action) => {
        state.mutationStatus = "failed";
        state.mutationError = action.payload;
      })

      // Update hotel
      .addCase(updateHotel.pending, (state) => {
        state.mutationStatus = "loading";
        state.mutationError = null;
      })
      .addCase(updateHotel.fulfilled, (state, action) => {
        state.mutationStatus = "succeeded";

        const index = state.items.findIndex(
          (hotel) => String(hotel.id) === String(action.payload.id),
        );

        if (index !== -1) {
          state.items[index] = action.payload;
        }

        state.selectedHotel = action.payload;
      })
      .addCase(updateHotel.rejected, (state, action) => {
        state.mutationStatus = "failed";
        state.mutationError = action.payload;
      })

      // Delete hotel
      .addCase(removeHotel.pending, (state) => {
        state.mutationStatus = "loading";
        state.mutationError = null;
      })
      .addCase(removeHotel.fulfilled, (state, action) => {
        state.mutationStatus = "succeeded";

        state.items = state.items.filter(
          (hotel) => String(hotel.id) !== String(action.payload),
        );
      })
      .addCase(removeHotel.rejected, (state, action) => {
        state.mutationStatus = "failed";
        state.mutationError = action.payload;
      });
  },
});

export const { resetMutationStatus } = hotelsSlice.actions;

export default hotelsSlice.reducer;
