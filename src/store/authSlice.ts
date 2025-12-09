import { createSlice } from "@reduxjs/toolkit";

interface AuthState {
  isAdmin: boolean;
}

const initialState: AuthState = {
  isAdmin: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state, action) {
      const { login, password } = action.payload;
      if (login === "admin" && password === "123") {
        state.isAdmin = true;
      }
    },
    logout(state) {
      state.isAdmin = false;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;

