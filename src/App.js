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

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/collections" element={<Collections />} />
          <Route path="/login" element={<Login />} />
          <Route path='/admin' element={<Admin/>} />
          <Route path="/admin/allproducts" element={<Admin />} />
          <Route path="/admin/addproducts" element={<Admin />} />
          <Route path="/registration" element={<UserRegister />} />
          <Route path="/admin/userslist" element={<Admin />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;                                   