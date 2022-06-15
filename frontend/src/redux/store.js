import { configureStore } from "@reduxjs/toolkit";
import filtersReducer from "./filtersSlice";
import searchReducer from "./searchSlice";

const store = configureStore({
  reducer: {
    filters: filtersReducer,
    search: searchReducer,
  },
});

export default store;
