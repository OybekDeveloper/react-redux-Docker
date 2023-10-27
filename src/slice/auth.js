import { createSlice } from "@reduxjs/toolkit";
import { setItem } from "../helpers/persistence-storage";
export const initialState = {
  isLoading: false,
  loggedIn: false,
  error: null,
  user: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    signUserStart: (state) => {
      state.isLoading = true;
    },
    signUserSuccess: (state, action) => {
      state.loggedIn = true;
      state.isLoading = false;
      state.user = action.payload;
      setItem("token", action.payload.token);
    },
    signUserFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    logOutUser: (state) => {
      state.user = null;
      state.loggedIn = false;
    },
    authProfileStart:(state)=>{
      state.isLoading=true;
    },
    authProfileSuccess:(state,action)=>{
      state.isLoading=false;
      state.user=action.payload;
    },
    authProfileFeature:(state,action)=>{
      state.isLoading=false;
      state.error=action.payload
    }
  },
});

export const { signUserStart, signUserSuccess, signUserFailure, logOutUser,authProfileStart,authProfileSuccess,authProfileFeature } =
  authSlice.actions;
export default authSlice.reducer;
