import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  input: "",
  modalIsOpen: false,
};

export const { reducer, actions } = createSlice({
  name: "filters",
  initialState,
  reducers: {
    changeInput: (state, { payload }) => {
      state.input = payload;
    },
    openModal: (state) => {
      // console.log(state[modalIsOpen])
      state.modalIsOpen = true;
    },
    closeModal: (state) => {
      state[modalIsOpen] = false;
    },
  },
});

export const { changeInput, openModal, closeModal } = actions;
export default reducer;
