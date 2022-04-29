import { configureStore } from "@reduxjs/toolkit";
import filtersReducer from "../redux/filtersSlice"

export const store = configureStore({
  reducer: {
    filters: filtersReducer,
  },
});
