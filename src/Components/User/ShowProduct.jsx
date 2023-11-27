import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectToken, selectProducts, selectUserToken, selectUserid,  } from '../../redux/authSlice';
import { MDBRow, MDBCol, MDBBtn } from "mdb-react-ui-kit";

function ShowProduct() {
  const { id } = useParams();
  const [productDetails, setProductDetails] = useState({});
  const token = useSelector(selectToken);
  const allProducts = useSelector(selectProducts);
  const userid = useSelector(selectUserid);
  const userToken = useSelector(selectUserToken);


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
        const response = await axios.get(`https://ecommerce-api.bridgeon.in/products/${id}?accessKey=7c63073252c8740d7951`, {
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
      console.log("User ID:", userid);
      console.log("User Token:", userToken);
  
      const response = await axios.post(
        `https://ecommerce-api.bridgeon.in/users/${userid}/cart/${productId}`,
        null, // Assuming no data payload, pass null if not needed
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      );
  
  // Log the response from the server
  
      if (response.data.status === 'success') {
        console.log('Product added to cart.');
        alert.success("product added to cart  succussfully")
      } else {
        console.error('Product addition to cart failed. Message:', response.data.message);
      }
    } catch (error) {
      console.error('Error:', error.message);
    }
  };


  return (
    <div>
      <div className='w-screen h-screen justify-center items-center'>
        <MDBRow className="g-0 bg-amber-100 position-relative">
          <MDBCol md="6" className="mb-md-0 p-md-4 mt-5">
            <img
              src={productDetails.image}
              className="img-fluid"
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
                  <span role="img" aria-label="star">
                    ⭐️⭐️⭐️⭐️⭐️ (156+ user Ratings)
                  </span>
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