import React from 'react'
import {useSelector} from 'react-redux'
import logo from'../logo.png'
import { Modal } from '@mui/material'
import {motion} from 'framer-motion'
import { selectIsLoading } from '../../redux/authSlice'


function Loading() {
  const isLoading=useSelector(selectIsLoading)
  return (
 <>
 <Modal open={isLoading} className="w-full h-screen"  style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundImage: "url('cicon.png')", backgroundRepeat: "repeat", border:"none" }}>
  <div className=" w-full h-full flex-col bg-slate-900  gap-4  flex justify-center items-center">

  <motion.div className='w-20 h-20 ' style={{
    backgroundImage:`url(${logo})`,
        backgroundSize:'cover'}}
        animate={{
          y: [0, 13, 0], // Move the image up and down in a loop
        }}
        transition={{
          duration: 4, // Set the duration of each cycle (in seconds)
          repeat: Infinity, // Repeat the animation infinitely
          ease: "linear", // Set the easing function for smooth animation
        }}
    ></motion.div>
    {/* Additional modal content */}
    <p className="text-xs text-white ml-5 bg-opacity-50 font-thin" >please wait a moment ...</p>
    </div>
  
</Modal>
   </>
  )
}

export default Loading