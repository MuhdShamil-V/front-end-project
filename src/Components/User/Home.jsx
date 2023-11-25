import React from 'react'
import { MDBCarousel, MDBCarouselItem } from 'mdb-react-ui-kit';
import Navbar from './Navbar';
import Slider from './slider';


function Home() {
  return (
    <>
    <div className=' w-full  overflow-hidden flex flex-col justify-start items-center bg-white' style={{height: '550px'}}>
        <div className='w-full h-auto flex flex-col'>
          <Navbar />
        </div>
        <div className='w-4/6 h-1/2 flex justify-center items-center bg-white overflow-hidden'>
          <MDBCarousel className='w-full h-full flex justify-center items-center' fade>
              <MDBCarouselItem itemId={1}>
              <img src='https://logan.nnnow.com/content/dam/nnnow-project/27-sep-2021/FragranceDesktop.jpg' alt='...' />
            
            </MDBCarouselItem>

            <MDBCarouselItem itemId={2}>
              <img src='https://logan.nnnow.com/content/dam/nnnow-project/27-sep-2021/FragranceDesktop.jpg' alt='...' />
          
            </MDBCarouselItem>

            <MDBCarouselItem itemId={3}>
              <img src='https://logan.nnnow.com/content/dam/nnnow-project/27-sep-2021/FragranceDesktop.jpg' alt='...' />
          
            </MDBCarouselItem>
          </MDBCarousel>
        </div>
    </div>
    <div className='bg-orange-200'>

            <Slider />
    </div>
    </>
  )
}

export default Home
