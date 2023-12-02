import React, { useEffect, useState } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";
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
import { selectProducts, selectToken, setProducts } from "../../redux/authSlice";
import '../User/slider.css'


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

const Slider = () => {
  const token = useSelector(selectToken);
  const dispatch=useDispatch()
  const products = useSelector(selectProducts);
  const [isEdit, setIsedit] = useState(false);
  const [updatedProductData, setUpdatedProductData] = useState(null);

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
        dispatch(setProducts(data)); // Use setProductsAction instead of setProducts
        console.log("Fetched products:", data);
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
 
  return (
    <div className="parent bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90%`">
      <h1>Our Collections</h1>
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
        {products.map((product) => (
          <div className="bigcard" key={product._id} style={{ height: '500px' }}>
            {/* Set a fixed height for the cards (adjust the height as needed) */}
            <Link to={`/showproduct/${product._id}`}>
              <MDBContainer fluid className="my-5">
            <MDBRow className="justify-content-center">
                <MDBCol md="8" className="h-3">
                <MDBCard className="text-black">
                  <div className="h-70">
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
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default Slider;