import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  region: [],
  city: [],
  category: [],
  amenity: [],
  // search: []
};

export const { reducer, actions } = createSlice({
  name: "filters",
  initialState,
  reducers: {
    add: (state, { payload: { category, filter } }) => {
      state[category].push(filter);
    },
    remove: (state, { payload: { category, filter } }) => {
      state[category] = state[category].filter((e) => e !== filter);
    },
    reset: (state) => {
      state = initialState;
    },
  },
});

export const { add, remove, reset } = actions;
export default reducer;
