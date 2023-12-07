import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsLoading, selectProducts, selectToken, setIsLoading, setProducts } from '../../redux/authSlice';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Carousel from "react-multi-carousel";
import '../User/slider.css'
import "react-multi-carousel/lib/styles.css";
import {
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBCard,
    MDBCardBody,
    MDBCardImage,
    MDBCardTitle,
    MDBIcon,
  } from "mdb-react-ui-kit";
import Loading from './Loading';

  
const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
      slidesToSlide: 1, // optional, default to 1.
    },
    tablet: {
      breakpoint: { max: 1024, min: 768 },
      items: 3,
      slidesToSlide: 1, // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 767, min: 464 },
      items: 2,
      slidesToSlide: 1, // optional, default to 1.
    },
  };

const Men = () => {
    const token = useSelector(selectToken);
    const dispatch=useDispatch()
    const products = useSelector(selectProducts);
    const [updatedProductData, setUpdatedProductData] = useState(null);
    const isLoading = useSelector(selectIsLoading)
  
    const accessKey = process.env.REACT_APP_ACCESS_KEY;
    const baseUrl = process.env.REACT_APP_BASE_URL;
  
    console.log("key",token)
  
    const dealerToken = token;
  
    const getAllProducts = async (token) => {
      try {
        const response = await axios.get(
          `${baseUrl}/products?accessKey=${accessKey}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const { status, message, data } = response.data;
        if (status === "success") {
          // Successfully fetched products.
          console.log("Fetched products:", data);
          setTimeout( ()=> {
            dispatch(setIsLoading(false))
          }, 4000);
          dispatch(setProducts(data)); // Use setProductsAction instead of setProducts
        } else {
          console.error("Product retrieval failed. Message:", message);
        }
      } catch (error) {
        console.error("Error:", error.message);
      }
    };
    useEffect(() => {
      getAllProducts(dealerToken);
    }, [updatedProductData]);
  // Filter products based on the category "Men"
  const menProducts = products.filter((product) => product.category === 'Men');

  return (
    <div className=' w-full h-screen bg-gradient-to-r from-black to-white'>

    <div className='h-auto w-full'>
      <h1 className='text-white font-serif'>Men's Collection</h1>
      <Carousel
        responsive={responsive}
        autoPlay={true}
        swipeable={true}
        draggable={true}
        showDots={false}
        infinite={true}
        partialVisible={true}
        dotListClass="custom-dot-list-style"
        itemClass="carousel-item-padding"
        customTransition="transform 300ms ease-in"
       

      >
        {menProducts.map((product) => (
           <Link to={`/showproduct/${product._id}`}>
           <MDBContainer fluid className="my-5">
         <MDBRow className="justify-content-center">
             <MDBCol md="8">
             <MDBCard >
               <div >
                 <MDBCardImage
                 src={product.image}
                 position="top"
                 alt="..."
                 />
                 </div>
                 <MDBCardBody>
                 <div className="text-center">
                     <MDBCardTitle>{product.title}</MDBCardTitle>
                 </div>
                 <div>
                     <div className="d-flex justify-content-between">
                     <span>Type:</span>
                     <h6>{product.category}</h6>
                     </div>
                 </div>
                 <div className="d-flex justify-content-between total font-weight-bold mt-4">
                     <span>Price:</span>
                     <span>₹{product.price}</span>
                 </div>
                     <div className="d-flex justify-content-between" style={{color:'green'}}>
                     <span>*Free Delevery</span>
                     </div>
                 </MDBCardBody>
             </MDBCard>
             </MDBCol>
         </MDBRow>
         </MDBContainer>
         </Link>
        ))}
      </Carousel>
    </div>
    {
      isLoading && <Loading />
    }
                 </div>
  );
};

export default Men;
