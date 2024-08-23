import { configureStore } from "@reduxjs/toolkit";
import {  loginReducer, themeReducer } from "./todoSlice";

export const store = configureStore({
  reducer: {
    loginReducer,
    themeReducer,
  },
});
