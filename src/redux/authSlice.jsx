import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: localStorage.getItem("token") || null,
    products: [],
    userToken: localStorage.getItem('userToken') || null,
    isSignIn: true,
    isCart: false,
    userId: localStorage.getItem('userId') || null,
    isLogin: localStorage.getItem('login') || false,
    userName: localStorage.getItem('userName') || "",
    isLoading: true,
    isAdmin: localStorage.getItem('isAdmin') || false, // New state variable for admin status
  },
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
      localStorage.setItem('token', action.payload);
    },
    setUsername: (state, action) => {
      state.userName = action.payload;
      localStorage.setItem('userName', action.payload);
    },
    setUserToken: (state, action) => {
      state.userToken = action.payload;
      localStorage.setItem('userToken', action.payload);
    },
    setSignIn: (state, action) => {
      state.isSignIn = action.payload;
    },
    setProducts: (state, action) => {
      state.products = action.payload;
    },
    setUserid: (state, action) => {
      state.userId = action.payload;
      localStorage.setItem('userId', action.payload);
    },
    setIscart: (state, action) => {
      state.isCart = action.payload;
    },
    clearUserToken: (state) => {
      state.userToken = null;
      localStorage.removeItem('userToken');
    },
    clearUsername: (state) => {
      state.userName = "";
      localStorage.removeItem('userName');
    },
    clearUserId: (state) => {
      state.userId = null;
      localStorage.removeItem('userId');
    },
    setIslogin: (state, action) => {
      state.isLogin = action.payload;
      localStorage.setItem('login', action.payload);
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    // New reducer to set admin status
    setIsAdmin: (state, action) => {
      state.isAdmin = action.payload;
      localStorage.setItem('isAdmin', action.payload);
    },
    clearToken: (state) => {
      state.token = null;
      localStorage.removeItem('token')
    },
    clearIsAdmin: (state) => {
      state.isAdmin = false;
      // localStorage.setItem('isAdmin', false);
      localStorage.removeItem('isAdmin');
    }
  },
});

export const {
  setToken,
  setUserToken,
  setProducts,
  setSignIn,
  clearUsername,
  setUsername,
  setUserid,
  setIScart,
  clearUserToken,
  clearUserId,
  setIslogin,
  setIsLoading,
  setIsAdmin, 
  clearToken,
  clearIsAdmin,
} = authSlice.actions;

export const selectToken = (state) => state.auth.token;
export const selectUserToken = (state) => state.auth.userToken;
export const selectProducts = (state) => state.auth.products;
export const selectUserid = (state) => state.auth.userId;
export const selectSignin = (state) => state.auth.isSignIn;
export const selectIscart = (state) => state.auth.isCart;
export const selectIslogin = (state) => state.auth.isLogin;
export const selectUserName = (state) => state.auth.userName;
export const selectIsLoading = (state) => state.auth.isLoading;
export const selectIsAdmin = (state) => state.auth.isAdmin; // New selector for admin status

export default authSlice.reducer;
