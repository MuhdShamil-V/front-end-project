import React, { useEffect, useState } from 'react';
import axios from '../AxiosInstance/instance';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectToken, selectProducts, selectUserToken, selectUserid,  } from '../../redux/authSlice';
import { MDBRow, MDBCol, MDBBtn } from "mdb-react-ui-kit";
import HeartIcon from './HeartIcon';
import toast from 'react-hot-toast';


function ShowProduct() {

  const { id } = useParams();
  const [productDetails, setProductDetails] = useState({});
  const token = useSelector(selectToken);
  const allProducts = useSelector(selectProducts);
  const userId = useSelector(selectUserid);
  const userToken = useSelector(selectUserToken);

  const accessKey = process.env.REACT_APP_ACCESS_KEY;

  useEffect(() => {
    getProductById(id, token, allProducts);
  }, [id, token, allProducts]);

  const getProductById = async (id, token, allProducts) => {
    const product = allProducts.find((product) => product._id === id);

    if (product) {
      // If the product is found in the Redux store, set the details
      setProductDetails(product);
    } else {
      // If the product is not found in the Redux store, make an API call to get it
      try {
        const response = await axios.get(`/products/${id}?accessKey=${accessKey}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const { status, message, data } = response.data;
        if (status === 'success') {
          // Successfully fetched the product.
          console.log('Fetched product details:', data);
          setProductDetails(data);
        } else {
          console.error('Product retrieval failed. Message:', message);
        }
      } catch (error) {
        console.error('Error:', error.message);
      }
    }
  };

  const handleAddToCart = async (productId) => {
    try {
      console.log("Adding product to cart...");
      console.log("Product ID:", productId);
      console.log("User ID:", userId);
      console.log("User Token:", userToken);
  
      const response = await axios.post(
        `/users/${userId}/cart/${productId}`,
        null, // Assuming no data payload, pass null if not needed
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      );
  
  // Log the response from the server
  
      if (response.data.status === 'success') {
        toast.success("product added to cart  succussfully")
      } else {
        toast.error('Product addition to cart failed.');
      }
    } catch (error) {
      toast.error('Network Error');
    }
  };

  const handleWishlist = async (productId) => {
    try{
      console.log("adding product to wishlist...");
      console.log("productId:", productId);
      console.log("userID", userId);
      console.log("userToken", userToken);

      const response = await axios.post(`/users/${userId}/wishlist/${productId}`, null,
      {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      });

      if (response.data.status === "success") {
        console.log("product added to wishlist");
        toast.success("product added to wishlist successfully")
      } else {
        toast.error('product addition to wishlist failed.')
      }
    } catch(error) {
      toast.error('Network Error');
    }
  };


  return (
    <div className='w-full h-screen bg-white'>
      <div className='w-screen h-screen justify-center items-center'>
        <MDBRow className="g-0 position-relative">
          <MDBCol md="4" className="mb-md-0 p-md-4 mt-5">
            <img
              src={productDetails.image}
              className="img-fluid"
              style={{height: '20rem', width: '18rem'}}
              alt="okdaa"
            />
          </MDBCol>

          <MDBCol
            md="5"
            className="p-6 ps-md-6 d-flex align-items-center justify-content-center"
            id="view-right"
          >
            <div className="viewright-down">
              <h1 className="mt-0">{productDetails.title} </h1>
              <h6>{productDetails.category}</h6>
              <h2 className='text-black text-left'>{productDetails.price}</h2>

              <div className="contu">
                <div>
                  <MDBBtn
                    className="me-1"
                    style={{ backgroundColor: "black" }}
                    onClick={()=>handleAddToCart(productDetails._id)}
                  >
                    Add to cart
                  </MDBBtn>
                  <MDBBtn
                    className="me-4"
                    style={{ backgroundColor: "black" }}
                    onClick={() => {}}
                  >
                    Buynow
                  </MDBBtn>
                </div>
                <br />

                <div>
                 <div className='flex d-flex justify-start items-center gap-2'>
                  <span role="img" aria-label="star">
                    ⭐️⭐️⭐️⭐️⭐️ (156+ user Ratings)
                  </span>
                  <div onClick={() => handleWishlist(productDetails._id)}>
                 <HeartIcon />
                 </div>
                 </div>
                  <hr />
                  <p>
                    {productDetails.description}
                  </p>
                </div>
                <hr />
                <MDBCol
                  lg="4"
                  md="6"
                  className="md-6 d-inline-flex"
                ></MDBCol>
              </div>
            </div>
          </MDBCol>
        </MDBRow>
      </div>
    </div>
  );
}

export default ShowProduct;
