import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../services/api";

const savedAuth = JSON.parse(localStorage.getItem("user") || "null");
const savedUser = savedAuth?.user || savedAuth;

// register
export const registerUser = createAsyncThunk("auth/register", async (data) => {
  const res = await api.post("/auth/register", data);
  return res.data;
});

// login
export const loginUser = createAsyncThunk("auth/login", async (data) => {
  const res = await api.post("/auth/login", data);
  return res.data;
});

export const logout = createAsyncThunk(
  "auth/logout",

  async () => {
    try {
      await api.post("/auth/logout");
    } finally {
      localStorage.removeItem("user");
    }
  },
);

const initialState = {
  user: savedUser,
  loading: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        localStorage.setItem("user", JSON.stringify(action.payload.user));
      })
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        localStorage.setItem("user", JSON.stringify(action.payload.user));
      })
      .addCase(registerUser.rejected, (state) => {
        state.loading = false;
      })
      .addCase(
        logout.fulfilled,

        (state) => {
          localStorage.removeItem("user");
          state.user = null;
        },
      )
      .addCase(
        logout.rejected,

        (state) => {
          localStorage.removeItem("user");
          state.user = null;
        },
      );
  },
});

export default authSlice.reducer;
