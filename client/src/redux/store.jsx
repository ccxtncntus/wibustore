import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./counterSlice";
import testSlice from "./testSlice";

export const store = configureStore({
  reducer: {
    list: counterReducer,
    cate: testSlice,
  },
});
