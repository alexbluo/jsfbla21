import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  filterSearchInput: "",
  mapSearchInput: "",
};

export const { reducer, actions } = createSlice({
  name: "search",
  initialState,
  reducers: {
    changeFilterSearchInput: (state, { payload }) => {
      state.filterSearchInput = payload;
    },
    changeMapSearchInput: (state, { payload }) => {
      state.mapSearchInput = payload;
    },
  },
});

export const { changeFilterSearchInput, changeMapSearchInput } = actions;
export default reducer;
