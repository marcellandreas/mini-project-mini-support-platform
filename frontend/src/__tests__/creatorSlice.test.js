import { configureStore } from "@reduxjs/toolkit";
import reducer, { fetchCreators, fetchCreatorPosts, setCurrentCreator } from "../store/slices/creatorSlice";
import API from "../api/api";

jest.mock("../api/api");

describe("creatorSlice async thunks", () => {
  let store;

  beforeEach(() => {
    store = configureStore({ reducer: { creators: reducer } });
    jest.clearAllMocks();
  });

  const creatorsData = [
    { id: 1, name: "Creator1", role: "creator" },
    { id: 2, name: "Fan1", role: "fan" },
    { id: 3, name: "Creator2", role: "creator" },
  ];

  const postsData = [
    { id: 1, content: "Post 1" },
    { id: 2, content: "Post 2" },
  ];

  it("fetchCreators success", async () => {
    API.get.mockResolvedValue({ data: creatorsData });

    await store.dispatch(fetchCreators());
    const state = store.getState().creators;

    expect(state.creators).toEqual(creatorsData.filter(u => u.role === "creator"));
    expect(state.loading).toBe(false);
  });

  it("fetchCreators failure", async () => {
    API.get.mockRejectedValue({ response: { data: "Error fetching" } });

    await store.dispatch(fetchCreators());
    const state = store.getState().creators;

    expect(state.error).toBe("Error fetching");
    expect(state.loading).toBe(false);
  });

  it("fetchCreatorPosts success", async () => {
    API.get.mockResolvedValue({ data: postsData });

    await store.dispatch(fetchCreatorPosts(1));
    const state = store.getState().creators;

    expect(state.posts).toEqual(postsData);
    expect(state.loading).toBe(false);
  });

  it("fetchCreatorPosts failure", async () => {
    API.get.mockRejectedValue({ response: { data: "Error posts" } });

    await store.dispatch(fetchCreatorPosts(1));
    const state = store.getState().creators;

    expect(state.error).toBe("Error posts");
    expect(state.loading).toBe(false);
  });
});

describe("creatorSlice reducers", () => {
  it("setCurrentCreator sets the current creator", () => {
    const initialState = { creators: [], currentCreator: null, posts: [], loading: false, error: null };
    const state = reducer(initialState, setCurrentCreator({ id: 1, name: "Creator1" }));
    expect(state.currentCreator).toEqual({ id: 1, name: "Creator1" });
  });
});
