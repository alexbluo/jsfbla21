import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  region: [],
  city: [],
  category: [],
  amenity: [],
  search: [],
};

export const { reducer, actions } = createSlice({
  name: "filters",
  initialState,
  reducers: {
    add: (state, { payload: { category, filter } }) => {
      // don't change anything if a search has already been inputted
      if (state[category].includes(filter)) return state;

      state[category].push(filter);
      // sort so that react-query query keys are consistent
      state[category].sort();
    },
    remove: (state, { payload: { category, filter } }) => {
      state[category] = state[category].filter((e) => e !== filter);
    },
    reset: () => {
      return initialState;
    },
  },
});

export const { add, remove, reset } = actions;
export default reducer;
