import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  input: "",
};

// !! need redux so previewlist can query all from one component instead of being split between previewlist and search (BAD!)
export const { reducer, actions } = createSlice({
  name: "search",
  initialState,
  reducers: {
    // can use this for clear as well dispatch(changeInput(""))
    // TODO: make sure multiple different searches override the last one
    changeInput: (state, { payload }) => {
      state.input = payload;
    },
  },
});

export const { changeInput } = actions;
export default reducer;
