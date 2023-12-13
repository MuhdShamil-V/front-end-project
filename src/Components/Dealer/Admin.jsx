import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import AllProducts from './AllProducts';
import AddProduct from './AddProduct';
import UserList from './UserList';
import { motion } from 'framer-motion';
import { Avatar } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { clearIsAdmin, clearToken, selectIsAdmin, selectToken, setIsAdmin } from '../../redux/authSlice';


const container = {
  hidden: { opacity: 1, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.2,
    },
  },
};

const item = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
  },
};

function Admin() {
  const nav = useNavigate();
  const location = useLocation();

  const dipatch = useDispatch();
  const token = useSelector(selectToken);
  const isAdmin = useSelector(selectIsAdmin);

  console.log(isAdmin);

  const isProducts = location.pathname.includes('/admin/allproducts');
  const isAdd = location.pathname.includes('/admin/addproducts');
  const isUser = location.pathname.includes('/admin/userslist');

  const Logout = ()=> {
    dipatch(clearToken());
    dipatch(clearIsAdmin())
    nav("/home")
  }

  return (
    <div className="h-screen w-full bg-sky-950 flex gap-20 justify-center">
      <div className="bg-sky-950 text-white w-1/6 border-r-8 border-emerald-200 h-full fixed top-0 left-0 overflow-x-hidden pt-20">
      <div className='ms-5'>
            <Avatar sx={{width: 150, height: 150}} src="/broken-image.jpg" />
            <h3>Admin</h3>
            </div>
        <motion.ul variants={container} initial="hidden" animate="visible" className="list-none p-0 mt-20">
          <motion.li variants={item} className="mb-4">
          
            <button
              onClick={() => nav('/admin/allproducts')}
              className={`block text-white no-underline w-full py-2 px-4 transition duration-300 ${
                isProducts ? 'bg-emerald-300' : 'hover:bg-emerald-300'
              } rounded`}
            >
              Products
            </button>
          </motion.li>
          <motion.li variants={item} className="mb-4">
            <button
              onClick={() => nav('/admin/addproducts')}
              className={`block text-white no-underline w-full py-2 px-4 transition duration-300 ${
                isAdd ? 'bg-emerald-300' : 'hover:bg-emerald-300'
              } rounded`}
            >
              Add Product
            </button>
          </motion.li>
          <motion.li variants={item} className="mb-4">
            <button
              onClick={() => nav('/admin/userslist')}
              className={`block text-white no-underline w-full py-2 px-4 transition duration-300 ${
                isUser ? 'bg-emerald-300' : 'hover:bg-emerald-300'
              } rounded`}
            >
              Users
            </button>
          </motion.li>
          <motion.li variants={item} className="mb-4">
            <button
              onClick={() => nav('/home')}
              className="block text-white no-underline w-full py-2 px-4 transition duration-300 hover:bg-emerald-300 rounded"
            >
              Home
            </button>
          </motion.li>
          <button
              onClick={Logout}
              className="block text-white no-underline w-full py-2 px-4 transition duration-300 hover:bg-emerald-300 rounded"
            >
              Logout
            </button>
        </motion.ul>
      </div>
      <motion.div variants={container} initial="hidden" animate="visible" className="w-full ml-48 flex justify-center h-full p-8">
        {isProducts && <AllProducts />}
        {isAdd && <AddProduct />}
        {isUser && <UserList />}
      </motion.div>
    </div>
  );
}

export default Admin;
