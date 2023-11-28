import React from 'react'
import { FaSearch, FaRegHeart } from "react-icons/fa";
import { HiMiniShoppingCart } from "react-icons/hi2";
import { useNavigate } from 'react-router-dom';
import logo from '../logo.png';


function Navbar() {

  const navigate = useNavigate();
  return (
    <div className='main-bar'>
        <div className='logo'>
          <img className='h-40' src={logo} />
        </div>
        <div className='flex gap-4 text-black font-thin'>
            <button>About</button>
            <button>Contact</button>
            <button>Collections</button>
            <button>Men</button>
        </div>
        <div className='flex gap-4 text-white font-thin'>
            <button><FaSearch /></button>
            <button><HiMiniShoppingCart onClick={()=> navigate('/cart')} /></button>
            <button><FaRegHeart onClick={() => navigate('/wishlist')} /></button>

        </div>

    </div>
  )
}

export default Navbar