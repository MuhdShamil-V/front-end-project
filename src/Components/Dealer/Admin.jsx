import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import AllProducts from './AllProducts';
import AddProduct from './AddProduct';
import UserList from './UserList';
import { motion } from 'framer-motion';

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
  const isProducts = location.pathname.includes('/admin/allproducts');
  const isAdd = location.pathname.includes('/admin/addproducts');
  const isUser = location.pathname.includes('/admin/userslist');

  return (
    <div className="h-screen w-full bg-sky-950 flex gap-20 justify-center">
      <div className="bg-sky-950 text-white w-1/6 border-r-8 border-emerald-200 h-full fixed top-0 left-0 overflow-x-hidden pt-20">
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
              onClick={() => nav('/')}
              className="block text-white no-underline w-full py-2 px-4 transition duration-300 hover:bg-emerald-300 rounded"
            >
              Home
            </button>
          </motion.li>
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
