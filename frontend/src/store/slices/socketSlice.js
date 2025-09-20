import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  connected: false,
  notifications: [],
  balance: 0,
};

const socketSlice = createSlice({
  name: "socket",
  initialState,
  reducers: {
    setConnected: (state, action) => {
      state.connected = action.payload;
    },
    addNotification: (state, action) => {
      state.notifications.push(action.payload);
    },
    clearNotifications: (state) => {
      state.notifications = [];
    },
    updateBalance: (state, action) => {
      state.balance = action.payload;
    },
  },
});

export const {
  setConnected,
  addNotification,
  clearNotifications,
  updateBalance,
} = socketSlice.actions;

export default socketSlice.reducer;
