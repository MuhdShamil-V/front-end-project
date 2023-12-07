import React from "react";
import { CDBBtn, CDBIcon, CDBContainer } from 'cdbreact';
import {
  MDBFooter,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBIcon,
} from "mdb-react-ui-kit";


const  Footer=()=>{

  return (
    <div className="w-full" >
       <MDBFooter className='text-center text-lg-start text-white bg-gray-900'>
       <section className='d-flex justify-content-center justify-content-center items-center p-4'>

       <CDBContainer className="d-flex justify-content-center " style={{gap:'10px  '}} > 
          
          <CDBBtn color="secondary">
          <CDBIcon fab icon="facebook" />
          
        </CDBBtn>
        <CDBBtn color="success">
          <CDBIcon fab icon="reddit" />
  
        </CDBBtn>
        <CDBBtn color="danger">
          <CDBIcon fab icon="twitter" />
      
        </CDBBtn>
        <CDBBtn color="dark">
          <CDBIcon fab icon="instagram" />
     
        </CDBBtn>
        <CDBBtn color="warning">
          <CDBIcon fab icon="google" />
      
        </CDBBtn>
  
  
        </CDBContainer>
       </section>

      <section className=''>
        <MDBContainer className='text-center text-md-start mt-5'>
          <MDBRow className='mt-3'>
            <MDBCol md='3' lg='4' xl='3' className='mx-auto mb-4 text-center'>
              <h6 className='text-uppercase font-serif fw-bold mb-4'>
                <MDBIcon color='secondary' className='me-3' />
                Majestic Mingles
              </h6>
              <p>
              Discover the beauty of fragrance with our collection of premium perfumes.
              Immerse yourself in the aroma of luxury and elevate your
              style
              </p>
            </MDBCol>

            <MDBCol md='2' lg='2' xl='2' className='mx-auto mb-4'>
              <h6 className='text-uppercase fw-bold mb-4'>Products</h6>
              <p>
                <a href='#!' className='text-reset'>
                  Men
                </a>
              </p>
              <p>
                <a href='#!' className='text-reset'>
                  Women
                </a>
              </p>
              <p>
                <a href='#!' className='text-reset'>
                  Unisex
                </a>
              </p>
              
            </MDBCol>

            <MDBCol md='3' lg='2' xl='2' className='mx-auto mb-4'>
              <h6 className='text-uppercase fw-bold mb-4'>Customer Service</h6>
              <p>
                <a href='#!' className='text-reset'>
                  Contact Us
                </a>
              </p>
              <p>
                <a href='#!' className='text-reset'>
                Help & FAQs
                </a>
              </p>
              <p>
                <a href='#!' className='text-reset'>
                Payment Method
                </a>
              </p>
              <p>
                <a href='#!' className='text-reset'>
                Delivery Information
                </a>
              </p>
            </MDBCol>

            <MDBCol md='4' lg='3' xl='3' className='mx-auto mb-md-0 mb-4'>
              <h6 className='text-uppercase fw-bold mb-4'>Contact</h6>
              <p>
                <MDBIcon color='secondary' icon='home' className='me-2' />
                New York, NY 10012, US
              </p>
              <p>
                <MDBIcon color='secondary' icon='envelope' className='me-3' />
                info@example.com
              </p>
              <p>
                <MDBIcon color='secondary' icon='phone' className='me-3' /> + 01 234 567 88
              </p>
              <p>
                <MDBIcon color='secondary' icon='print' className='me-3' /> + 01 234 567 89
              </p>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </section>

      <div className="text-center p-2" style={{ backgroundColor: "rgba(0, 0, 0, 0.05)",color:'white' }}> 
       <div>  © 2023 Copyright:</div> 
          <a className="text-reset fw-bold" href="https://mdbootstrap.com/"> <br></br>
              Premium Perfumes | Powered by Majestic Mingles
          </a>
        </div>
    </MDBFooter>
   </div>
   );
}

export default Footer;