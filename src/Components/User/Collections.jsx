import React, { useEffect } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { selectProducts, setProducts, setUserToken } from '../../redux/authSlice';
import { MDBCard, MDBCardImage, MDBCardBody, MDBCardTitle } from 'mdb-react-ui-kit';

function Collections() {
  const dispatch = useDispatch();
  const products = useSelector(selectProducts);
  const userToken = useSelector(setUserToken);

  const getAllProducts = async (token) => {
    try {
      const response = await axios.get('https://ecommerce-api.bridgeon.in/products?accessKey=7c63073252c8740d7951', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const { status, message, data } = response.data;
      if (status === 'success') {
        dispatch(setProducts(data));
        console.log('Fetched products:', data);
      } else {
        console.error('Product retrieval failed. Message:', message);
      }
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  useEffect(() => {
    console.count('home useeffect');
    getAllProducts(userToken);
  }, []);

  return (
    <div className="container">
      <div className="row justify-content-center">
        {products.map((product) => (
          <div key={product._id} className='col-md-4 mb-4'>
            <MDBCard style={{ width: '18rem', height: '25rem' }}>
              <MDBCardImage position='top' alt={product.title} src={product.image} />
              <MDBCardBody>
                <MDBCardTitle>{product.title}</MDBCardTitle>
                <h5>Price: ₹{product.price}</h5>
              </MDBCardBody>
            </MDBCard>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Collections;
