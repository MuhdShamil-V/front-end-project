import React from 'react'
import { MDBCarousel, MDBCarouselItem, MDBCarouselCaption } from 'mdb-react-ui-kit';
import Navbar from './Navbar';


function Home() {
  return (
    <div className='h-screen w-full  overflow-hidden flex flex-col justify-start items-center bg-black'>
        <div className='w-full h-auto flex flex-col'>
        <Navbar />

        </div>
        <div className='w-4/6 h-1/2 flex justify-center items-center bg-white overflow-hidden'>
        <MDBCarousel className='w-full h-full flex justify-center items-center' fade>
      <MDBCarouselItem itemId={1}>
        <img src='https://img.freepik.com/free-vector/perfume-promo-background-with-glass-bottle_107791-12305.jpg' className='' />
        
      </MDBCarouselItem>

      <MDBCarouselItem itemId={2}>
        <img src='https://t4.ftcdn.net/jpg/02/35/71/91/360_F_235719181_KGtEZLW1kWE5SaeXJku5namLqvNivuZ5.jpg' alt='...' />
       
      </MDBCarouselItem>

      <MDBCarouselItem itemId={3}>
        <img src='https://mdbootstrap.com/img/Photos/Slides/img%20(23).jpg' alt='...' />
       
      </MDBCarouselItem>
    </MDBCarousel>
        </div>

       
    </div>
       
  )
}

export default Home
