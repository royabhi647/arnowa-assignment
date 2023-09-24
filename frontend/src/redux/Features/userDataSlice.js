import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  userDetails: {},
  allUsersDetails: {},
};

const userData = createSlice({
  name: "user",
  initialState,
  reducers: {
    currentUser: (state, action) => {
      state.userDetails = action.payload;
    },
    allUsersData: (state, action) => {
      // console.log("state", action.payload);
      state.allUsersDetails = action.payload;
    },
  },
});

export const { currentUser, allUsersData } = userData.actions;
export default userData.reducer;
