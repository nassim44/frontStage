import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {},
  token: "",
};

export const userInfoSlice = createSlice({
  name: "userInfo",
  initialState,
  reducers: {
    setUserInfo: (state, action) => {
      state.user = action.payload;
    },
    setToken: (state, action) => {
      state.token = action.payload;
    },
  },
});
export const { setUserInfo, setToken } = userInfoSlice.actions;

export default userInfoSlice.reducer;
