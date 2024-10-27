import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLogin: false,
  token: "",
  userId: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    login: (state) => {
      state.isLogin = true;
    },
    logout: (state) => {
      state.isLogin = false;
    },
    setAuth: (
      state,
      actions: { payload: { token: string; userId: string } },
    ) => {
      state.token = actions.payload.token;
      state.userId = actions.payload.userId;
      login();
      sessionStorage.setItem("token", actions.payload.token);
    },
  },
});

export const { login, logout, setAuth } = authSlice.actions;
export default authSlice.reducer;
