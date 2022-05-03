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
    add: (state, { payload: { category, field } }) => {
      state[category].push(field);
    },
    remove: (state, { payload: { category, field } }) => {
      state[category] = state[category].filter((e) => e !== field);
    },
    reset: (state) => {
      state = initialState;
    },
  },
});

export const { add, remove, reset } = actions;
export default reducer;
