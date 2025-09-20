import { configureStore } from "@reduxjs/toolkit";
import supportReducer, {
  sendSupport,
  fetchSupportByFanId,
  fetchSupportHistory,
  fetchBalance,
  updateBalance,
  setCurrentSupport,
} from "../store/slices/supportSlice";
import API from "../api/api";

jest.mock("../api/api"); // mock axios/API calls

describe("supportSlice async thunks", () => {
  let store;

  beforeEach(() => {
    store = configureStore({
      reducer: { supports: supportReducer },
    });
    jest.clearAllMocks();
  });

  test("sendSupport success", async () => {
    const mockData = { id: 1, name: "Marcell", amount: 1000 };
    API.post.mockResolvedValue({ data: mockData });

    await store.dispatch(
      sendSupport({ name: "Marcell", amount: 1000, creator_id: 1, fan_id: 2 })
    );

    const state = store.getState().supports;
    expect(state.currentSupport).toEqual(mockData);
    expect(state.error).toBeNull();
    expect(state.loading).toBe(false);
  });

  test("sendSupport failure", async () => {
    API.post.mockRejectedValue({ response: { data: "Failed to send support" } });

    await store.dispatch(
      sendSupport({ name: "Marcell", amount: 1000, creator_id: 1, fan_id: 2 })
    );

    const state = store.getState().supports;
    expect(state.currentSupport).toBeNull();
    expect(state.error).toBe("Failed to send support");
    expect(state.loading).toBe(false);
  });

  test("fetchBalance success", async () => {
    API.get.mockResolvedValue({ data: { amount: 5000 } });

    await store.dispatch(fetchBalance(2));

    const state = store.getState().supports;
    expect(state.balance).toBe(5000);
    expect(state.error).toBeNull();
  });

  test("updateBalance reducer", () => {
    store.dispatch(updateBalance(10000));
    const state = store.getState().supports;
    expect(state.balance).toBe(10000);
  });
});
