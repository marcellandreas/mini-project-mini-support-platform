import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../api/api";

// Async thunk untuk mengirim support
export const sendSupport = createAsyncThunk(
  "supports/sendSupport",
  async ({ name, amount, creator_id, fan_id }, { rejectWithValue }) => {
    try {
      const response = await API.post("/supports", {
        name,
        amount,
        creator_id,
        fan_id,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Async thunk untuk mengambil history support berdasarkan fan_id
export const fetchSupportByFanId = createAsyncThunk(
  "supports/fetchSupportByFanId",
  async (fanId, { rejectWithValue }) => {
    try {
      const response = await API.get(`/supports/${fanId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to fetch support by fanId"
      );
    }
  }
);

// Async thunk untuk mengambil history support
export const fetchSupportHistory = createAsyncThunk(
  "supports/fetchSupportHistory",
  async (_, { rejectWithValue }) => {
    try {
      const response = await API.get("/supports");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Async thunk untuk mengambil balance user sendiri
export const fetchBalance = createAsyncThunk(
  "supports/fetchBalance",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await API.get(`/balance/${userId}`);
      return response.data.amount; // hanya ambil jumlah balance
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to fetch balance");
    }
  }
);

const initialState = {
  supportHistory: [],
  supportFinId: [],
  currentSupport: null,
  loading: false,
  error: null,
  balance: 0,
};

const supportSlice = createSlice({
  name: "supports",
  initialState,
  reducers: {
    updateBalance: (state, action) => {
      state.balance = action.payload;
    },
    setCurrentSupport: (state, action) => {
      state.currentSupport = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Send support cases
      .addCase(sendSupport.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(sendSupport.fulfilled, (state, action) => {
        state.loading = false;
        state.currentSupport = action.payload;
      })
      .addCase(sendSupport.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to send support";
      })
      // Fetch support history cases
      .addCase(fetchSupportHistory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSupportHistory.fulfilled, (state, action) => {
        state.loading = false;
        state.supportHistory = action.payload;
      })
      .addCase(fetchSupportHistory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch support history";
      })
      // Fetch balance cases
      .addCase(fetchBalance.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBalance.fulfilled, (state, action) => {
        state.loading = false;
        state.balance = action.payload;
      })
      .addCase(fetchBalance.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch balance";
      }) // Fetch support by fanId cases
      .addCase(fetchSupportByFanId.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSupportByFanId.fulfilled, (state, action) => {
        state.loading = false;
        state.supportHistory = action.payload; // update supportHistory sesuai fan_id
      })
      .addCase(fetchSupportByFanId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch support by fanId";
      });
  },
});

export const { updateBalance, setCurrentSupport } = supportSlice.actions;
export default supportSlice.reducer;
