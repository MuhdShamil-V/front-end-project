import React from 'react'
import Navbar from './Navbar';
import img from '../bg.png';
import { useSelector } from 'react-redux';
import { selectUserName } from '../../redux/authSlice';
import Categories from './Categories';
import Footer from '../User/Footer';

function Home() {
  const name=useSelector(selectUserName)

  return (
    <>
    <div className=' w-full h-screen overflow-hidden flex flex-col justify-start items-start bg-gradient-to-r from-gray-950 to-slate-500'>
   
        <div className='w-full h-auto flex flex-col'>
          <Navbar />
        </div>
        <div className='w-full h-full flex justify-start p-10 items-center'>

        <div className='w-96 h-96'>
          <img src={img} />
        </div>
        <div className='flex flex-col justify-center items-center gap-4 ml-44'>
        <p className='home-qot'>Discover the Fragrance of Elegance</p>
        <p className='qot-cont'>Discover the beauty of fragrance<><br /></> with our collection of premium perfumes.<br /> Immerse yourself in the aroma of luxury and elevate your<br /> style</p>
        <button className='bg-gradient-to-r from-blue-400 to-green-300 hover:from-blue-500 hover:to-green-400 p-2 rounded'>Shop Now</button>
        </div>
        </div>
    </div>
    <div className=' bg-gradient-to-r from-gray-950 to-slate-600'>

            <Categories />
    </div>
    <div>
      <Footer />
    </div>
    
    </>
  )
}

export default Home
