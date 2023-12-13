import React from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { Provider, useSelector } from 'react-redux';
import './App.css';
import store from './redux/store';
import UserRegister from './Components/User/UserRegister';
import Home from './Components/User/Home';
import Admin from './Components/Dealer/Admin';
import Cart from './Components/User/Cart';
import ShowProduct from './Components/User/ShowProduct';
import Wishlist from './Components/User/Wishlist';
import Slider from './Components/User/slider';
import Men from './Components/User/Men';
import Women from './Components/User/Women';
import UniSex from './Components/User/UniSex';
import { Toaster } from 'react-hot-toast';
import Categories from './Components/User/Categories';
import Login from './Components/Dealer/Login';

const ProtectedRoute = ({ element, path, adminRequired }) => {
  const isUserAuthenticated = useSelector((state) => state.auth.isLogin);
  const isAdmin = useSelector((state) => state.auth.isAdmin);

  console.log("isAdmin:", isAdmin);

  if (adminRequired && !isAdmin) {
    console.log("Redirecting to /login because admin is required but not logged in as admin");
    return <Navigate to="/login" />;
  }

  return isUserAuthenticated ? element : <Navigate to="/login" />;
};

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Toaster position='bottom-center' />

        <Routes>
          <Route path="/" element={<UserRegister />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Home />} />

          {/* Use the ProtectedRoute for admin-related routes */}
          <Route
            path="/admin/*"
            element={<ProtectedRoute element={<Admin />} path="/admin" adminRequired />}
          />

          <Route path="/collections" element={<Slider />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/showproduct/:id" element={<ShowProduct />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/men" element={<Men />} />
          <Route path="/women" element={<Women />} />
          <Route path="/unisex" element={<UniSex />} />
          <Route path="/categories" element={<Categories />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
