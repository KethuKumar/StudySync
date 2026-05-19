import {
  createSlice,
  createAsyncThunk
} from "@reduxjs/toolkit";

import api from "../../services/api";


// ✅ GET GROUP FILES
export const fetchResources = createAsyncThunk(
  "resources/fetchResources",

  async (groupId) => {
    const res = await api.get(`/resources/${groupId}`);
    return res.data;
  }
);


// ✅ UPLOAD FILE
export const uploadResource = createAsyncThunk(
  "resources/uploadResource",

  async ({ file, groupId }) => {

    const formData = new FormData();

    formData.append("file", file);

    formData.append("groupId", groupId);

    const res = await api.post(
      "/resources",
      formData
    );

    return res.data;
  }
);

const resourceSlice = createSlice({
  name: "resources",

  initialState: {
    resources: [],
    loading: false,
  },

  reducers: {},

  extraReducers: (builder) => {

    builder

      // fetch
      .addCase(fetchResources.fulfilled, (state, action) => {
        state.resources = action.payload.resources || [];
      })

      // upload
      .addCase(uploadResource.fulfilled, (state, action) => {
        state.resources.unshift(action.payload.resource);
      });
  }
});

export default resourceSlice.reducer;
