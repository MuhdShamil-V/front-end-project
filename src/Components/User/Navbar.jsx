import React from 'react'
import { FaSearch, FaRegHeart, FaUser } from "react-icons/fa";
import { MdOutlineLogin, MdOutlineLogout } from "react-icons/md";
import { HiMiniShoppingCart } from "react-icons/hi2";
import { useNavigate } from 'react-router-dom';
import logo from '../logo.png';
import { clearUserId, clearUserToken, clearUsername, selectIslogin, selectUserName, setIslogin } from '../../redux/authSlice';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';


function Navbar() {

  const isLogin = useSelector(selectIslogin);
  const name = useSelector(selectUserName);
  console.log(isLogin)
  const dispatch = useDispatch();
  const logout=()=>{
    dispatch(clearUserId())
    dispatch(clearUserToken())
    dispatch(setIslogin(false))
    dispatch(clearUsername())

    console.log(isLogin)
    
    alert("logouted")

  }
  const navigate = useNavigate();
  return (
    <div className='main-bar'>
        <div className='logo'>
          <img className='h-40' src={logo} />
        </div>
        <div className='flex gap-4 text-black font-thin'>
            <button>About</button>
            <button>Contact</button>
            <button onClick={()=> navigate('/collections')}>Collections</button>
            <button>Men</button>
           
        </div>
        <div className='flex gap-4 text-white font-thin'>


          {
            isLogin?

            <div className='flex justify-center items-center gap-4'>
            <button className='text-black'><MdOutlineLogout onClick={logout} title='logout' /></button>
            <button className='text-black'><FaUser   title={name}/></button>
            </div>
            :
          <button className='text-black'><MdOutlineLogin onClick={()=> navigate('/login')}  title='login'/></button>
          }
            <button className='text-black'><FaSearch /></button>
            <button className='text-black'><HiMiniShoppingCart onClick={()=> navigate('/cart')} /></button>
            <button className='text-black'><FaRegHeart onClick={()=> navigate('/wishlist')} /></button>

        </div>

    </div>
  )
}

export default Navbar