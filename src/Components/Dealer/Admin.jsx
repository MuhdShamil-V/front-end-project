import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import AllProducts from './AllProducts'
import Addproduct from './AddProduct';

function Admin() {
  const location = useLocation();

  return (
    <div className="h-screen w-full bg-sky-950 flex">
      <div className="bg-sky-950 text-white w-1/6 border-r-8 border-emerald-200 h-full fixed top-0 left-0 overflow-x-hidden pt-20">
        <ul className="list-none p-0 mt-20">
          <li className="mb-10">
            <Link
              to="/admin/allproducts"
              className="block text-white no-underline py-2 px-4 transition duration-300 hover:bg-emerald-300 rounded"
            >
              Products
            </Link>
          </li>
          <li className="mb-10">
            <Link
              to="/admin/addproduct"
              className="block text-white no-underline py-2 px-4 transition duration-300 hover:bg-emerald-300 rounded"
            >
              Add Product
            </Link>
          </li>
          <li className="mb-10">
            <Link
              to="/userslist"
              className="block text-white no-underline py-2 px-4 transition duration-300 hover:bg-emerald-300 rounded"
            >
              Users
            </Link>
          </li>
          <li className="mb-10">
            <Link
              to="/"
              className="block text-white no-underline py-2 px-4 transition duration-300 hover.bg-emerald-300 rounded"
            >
              Home
            </Link>
          </li>
        </ul>
      </div>
      <div className="w-full h-full p-8"> 
        {location.pathname === '/admin/allproducts' && <AllProducts />}
        {location.pathname === '/admin/addproduct' && <Addproduct />}
      </div>
    </div>
  );
}

export default Admin;
