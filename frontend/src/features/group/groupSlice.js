import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../services/api";

// get my groups
export const fetchGroups = createAsyncThunk("groups/fetchGroups", async () => {
  const res = await api.get("/groups");
  return res.data;
});

// create groups
export const createGroup = createAsyncThunk(
  "groups/createGroup",
  async (groupData) => {
    const res = await api.post("/groups", groupData);
    return res.data;
  },
);

// join group
export const joinGroup = createAsyncThunk(
  "group/joinGroup",
  async (inviteCode) => {
    const res = await api.post(`/groups/join/${inviteCode}`);
    return res.data;
  },
);

const initialState = {
  groups: [],
  loading: false,
};

const groupSlice = createSlice({
  name: "groups",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      // fetch groups
      .addCase(fetchGroups.pending, (state) => {
        state.loading = true;
      })

      .addCase(fetchGroups.fulfilled, (state, action) => {
        state.loading = false;
        state.groups = action.payload.groups;
      })

      // create group
      .addCase(createGroup.fulfilled, (state, action) => {
        state.groups.push(action.payload.group);
      })

      .addCase(joinGroup.fulfilled, (state, action) => {
        state.groups.push(action.payload.group);
      });
  },
});

export default groupSlice.reducer;
