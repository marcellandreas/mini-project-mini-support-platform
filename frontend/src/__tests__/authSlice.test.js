import { configureStore } from "@reduxjs/toolkit";
import reducer, { register, login, fetchAllUsers } from "../store/slices/authSlice";
import API from "../api/api";

jest.mock("../api/api");

describe("authSlice async thunks", () => {
  let store;

  beforeEach(() => {
    store = configureStore({ reducer: { auth: reducer } });
    jest.clearAllMocks();
  });

 it("register success", async () => {
  const userData = { id: 1, name: "Marcell" };
  API.post.mockResolvedValue({ data: userData });

  await store.dispatch(register({ name: "Marcell", role: "fan" }));
  const state = store.getState().auth;

  expect(state.user).toEqual(userData); // sekarang cocok
  expect(state.isAuthenticated).toBe(true);
});


  it("register failure", async () => {
    API.post.mockRejectedValue({ response: { data: "Register failed" } });

    await store.dispatch(register({ name: "", role: "fan" }));
    const state = store.getState().auth;

    expect(state.user).toBeNull();
    expect(state.error).toBe("Register failed");
  });

  it("login success", async () => {
  const userData = { id: 1, name: "Marcell" };
  API.post.mockResolvedValue({ data: userData });

  await store.dispatch(login({ name: "Marcell", role: "fan" }));
  const state = store.getState().auth;

  expect(state.user).toEqual(userData);
  expect(state.isAuthenticated).toBe(true);
});


  it("fetchAllUsers success", async () => {
    const usersData = [{ id: 1, name: "Marcell" }];
    API.get.mockResolvedValue({ data: usersData });

    await store.dispatch(fetchAllUsers());
    const state = store.getState().auth;

    expect(state.users).toEqual(usersData);
  });
});
