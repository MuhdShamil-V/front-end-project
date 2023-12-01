import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './Components/Dealer/Login';
import { Provider } from 'react-redux';
import store from './redux/store';
import UserRegister from './Components/User/UserRegister';
import Home from './Components/User/Home';
import Admin from './Components/Dealer/Admin';
import Collections from './Components/User/Collections';
import Cart from './Components/User/Cart';
import ShowProduct from './Components/User/ShowProduct';
import Wishlist from './Components/User/Wishlist';
import Slider from './Components/User/slider';



function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<UserRegister />} />
          <Route path="/collections" element={<Collections />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path='/admin' element={<Admin/>} />
          <Route path="/admin/allproducts" element={<Admin />} />
          <Route path="/admin/addproducts" element={<Admin />} />
          <Route path="/registration" element={<UserRegister />} />
          <Route path="/admin/userslist" element={<Admin />} />
          <Route path="/collections" element={<Slider />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/showproduct/:id" element={<ShowProduct />} />
          <Route path="/wishlist" element={<Wishlist />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;                                   