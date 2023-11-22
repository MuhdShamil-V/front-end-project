import React from 'react'
import { FaSearch, FaRegHeart } from "react-icons/fa";
import { HiMiniShoppingCart } from "react-icons/hi2";


function Navbar() {
  return (
    <div className='main-bar'>
        <div className='logo'>sdfghj</div>
        <div className='flex gap-4 text-white font-thin'>
            <button>About</button>
            <button>Contact</button>
            <button>Collections</button>
            <button>Men</button>
        </div>
        <div className='flex gap-4 text-white font-thin'>
            <FaSearch />
            <HiMiniShoppingCart />
            <FaRegHeart />

        </div>

    </div>
  )
}

export default Navbar