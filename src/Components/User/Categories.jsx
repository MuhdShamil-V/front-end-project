import React from 'react';
import { MDBCard, MDBCardImage, MDBRow, MDBCol } from 'mdb-react-ui-kit';
import Men from '../ctgmen.jpeg';
import Women from '../ctgwomen.jpeg';
import Unisex from '../ctgunisex.jpg';
import { Link } from 'react-router-dom';

export default function Categories() {
  return (
    <div className='flex d-flex justify-center'>
      <MDBRow className='row-cols-1 row-cols-md-3 g-1 pt-5 pb-5 ms-5 flex '>
        <Link to='/men'>
          <MDBCol className='mx-8'>
            <MDBCard className='h-100 category_card  bg-black' style={{ width: '300px' }}>
              <MDBCardImage className='hover:opacity-30' style={{ height: '400px' }} src={Men} alt='...' position='top' />
              <div className='category-name absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white font-serif font-bold'>
                  Men
                </div>
            </MDBCard>
          </MDBCol>
        </Link>
        <Link to='/women'>
          <MDBCol className='mx-8'>
            <MDBCard className='h-100 category_card bg-black' style={{ width: '300px' }}>
              <MDBCardImage className='hover:opacity-30' style={{ height: '400px' }} src={Women} alt='...' position='top' />
              <div className='category-name absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white font-serif font-bold'>
                  Women
                </div>
            </MDBCard>
          </MDBCol>
        </Link>
        <Link to='/unisex'>
          <MDBCol className='mx-8'>
            <MDBCard className='h-100 category_card bg-black' style={{ width: '300px' }}>
              <MDBCardImage className='hover:opacity-30' style={{ height: '400px' }} src={Unisex} alt='...' position='top' />
              <div className='category-name absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white font-serif font-bold'>
                  Unisex
                </div>
            </MDBCard>
          </MDBCol>
        </Link>
      </MDBRow>
    </div>
  );
}