import {
  createSlice,
  createAsyncThunk
} from "@reduxjs/toolkit";

import api from "../../services/api";


// GET TUTORS
export const fetchTutors =
  createAsyncThunk(

    "booking/fetchTutors",

    async () => {

      const res = await api.get(
        "/users/tutors"
      );

      return res.data;
    }
  );



// CREATE BOOKING
export const createBooking =
  createAsyncThunk(

    "booking/createBooking",

    async (bookingData) => {

      const res = await api.post(
        "/bookings",
        bookingData
      );

      return res.data;
    }
  );



const bookingSlice = createSlice({
  name: "booking",

  initialState: {
    tutors: []
  },

  reducers: {},

  extraReducers: (builder) => {

    builder

      .addCase(
        fetchTutors.fulfilled,

        (state, action) => {

          state.tutors =
            action.payload;
        }
      );
  }
});

export default bookingSlice.reducer;