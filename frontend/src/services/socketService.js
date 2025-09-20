import { io } from "socket.io-client";
import { store } from "../store";
import { setConnected, addNotification, updateBalance } from "../store/slices/socketSlice";


let socket;

export const initSocket = () => {
  socket = io("http://localhost:5000");

  socket.on("connect", () => {
    store.dispatch(setConnected(true));
    console.log("Socket connected");
  });

  socket.on("disconnect", () => {
    store.dispatch(setConnected(false));
    console.log("Socket disconnected");
  });

  socket.on("support_success", (data) => {
    // Jika user adalah creator yang menerima support
    const currentUser = store.getState().auth.user;
    if (currentUser && currentUser.id === data.creator_id) {
      store.dispatch(addNotification(data.message));

      // Update balance jika ada
      if (data.amount) {
        const currentBalance = store.getState().supports.balance;
        store.dispatch(updateBalance(currentBalance + data.amount));
      }
    }
  });

  return socket;
};

export const getSocket = () => socket;

export const disconnectSocket = () => {
  if (socket) socket.disconnect();
};