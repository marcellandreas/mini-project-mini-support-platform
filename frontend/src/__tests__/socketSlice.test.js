import reducer, {
  setConnected,
  addNotification,
  clearNotifications,
  updateBalance,
} from "../store/slices/socketSlice";

describe("socketSlice reducers", () => {
  let initialState;

  beforeEach(() => {
    initialState = {
      connected: false,
      notifications: [],
      balance: 0,
    };
  });

  it("should handle setConnected", () => {
    const state = reducer(initialState, setConnected(true));
    expect(state.connected).toBe(true);

    const state2 = reducer(state, setConnected(false));
    expect(state2.connected).toBe(false);
  });

  it("should handle addNotification", () => {
    const notification = { id: 1, message: "New support received" };
    const state = reducer(initialState, addNotification(notification));
    expect(state.notifications).toHaveLength(1);
    expect(state.notifications[0]).toEqual(notification);
  });

  it("should handle clearNotifications", () => {
    const stateWithNotifications = {
      ...initialState,
      notifications: [{ id: 1, message: "Test" }],
    };
    const state = reducer(stateWithNotifications, clearNotifications());
    expect(state.notifications).toHaveLength(0);
  });

  it("should handle updateBalance", () => {
    const state = reducer(initialState, updateBalance(100));
    expect(state.balance).toBe(100);
  });
});
