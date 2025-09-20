import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../api/api";

// Async thunk untuk mengambil semua creator
export const fetchCreators = createAsyncThunk(
  "creators/fetchCreators",
  async (_, { rejectWithValue }) => {
    try {
      const response = await API.get("/creators");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Async thunk untuk mengambil posting creator
export const fetchCreatorPosts = createAsyncThunk(
  "creators/fetchCreatorPosts",
  async (creatorId, { rejectWithValue }) => {
    try {
      const response = await API.get(`/creators/${creatorId}/posts`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const initialState = {
  creators: [],
  currentCreator: null,
  posts: [],
  loading: false,
  error: null,
};

const creatorSlice = createSlice({
  name: "creators",
  initialState,
  reducers: {
    setCurrentCreator: (state, action) => {
      state.currentCreator = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch creators cases
      .addCase(fetchCreators.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCreators.fulfilled, (state, action) => {
        state.loading = false;
        state.creators = action.payload.filter(
          (user) => user.role === "creator"
        );
      })
      .addCase(fetchCreators.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch creators";
      })
      // Fetch creator posts cases
      .addCase(fetchCreatorPosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCreatorPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload;
      })
      .addCase(fetchCreatorPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch creator posts";
      });
  },
});

export const { setCurrentCreator } = creatorSlice.actions;
export default creatorSlice.reducer;
