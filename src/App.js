import { BrowserRouter, Route, Routes } from 'react-router-dom'; 
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './Components/Dealer/Login';
import { Provider } from 'react-redux';
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



function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
      <Toaster position='bottom-center' />

        <Routes>
          <Route path="/" element={<UserRegister />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path='/admin' element={<Admin/>} />
          <Route path="/admin/allproducts" element={<Admin />} />
          <Route path="/admin/addproducts" element={<Admin />} />
          <Route path="/admin/userslist" element={<Admin />} />
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