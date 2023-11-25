import { createSlice } from "@reduxjs/toolkit";


export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: localStorage.getItem("token") || null,
    products: [],
    userToken: localStorage.getItem('userToken') || null,
    isSignIn: true,
    isCart: false,
  },
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
      localStorage.setItem('token', action.payload);
    },
    setUserToken: (state, action) => {
      state.userToken = action.payload; // Corrected line
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
    }
  },
});

export const { setToken, setUserToken, setProducts ,setSignIn, setUserid, setIScart} = authSlice.actions;

export const selectToken = (state) => state.auth.token;
export const selectUserToken = (state) => state.auth.userToken;
export const selectProducts = (state) => state.auth.products;
export const selectUserid = (state) => state.auth.userId;
export const selectSignin = (state) => state.auth.isSignIn;
export const selectIscart = (state) => state.auth.isCart;

export default authSlice.reducer;