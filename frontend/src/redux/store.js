import { configureStore } from "@reduxjs/toolkit";
import userDataSlice from "./Features/userDataSlice";

export const store = configureStore({
  reducer: {
    userDataDetails: userDataSlice,
  },
});

export default store;
