import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsLoading, selectUserToken, selectUserid, setIsLoading } from '../../redux/authSlice';
import axios from '../AxiosInstance/instance';
import { Card, Button, Row } from 'react-bootstrap';
import toast from 'react-hot-toast';
import Loading from './Loading';

function Wishlist() {
  const userToken = useSelector(selectUserToken);
  const userId = useSelector(selectUserid);
  console.log(userToken);
  console.log(userId);


  const [wishlist, setWishlist] = useState([]);
  const isLoading = useSelector(selectIsLoading);
  const dispatch = useDispatch();

  const yourWishlist = async (userId, token) => {
    try {
      const response = await axios.get(`/users/${userId}/wishlist`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const { status, message, data } = response.data;

      if (status === 'success') {
        const products = data.products[0].wishlist;
        console.log(products);
        setWishlist(products);
      } else {
        console.log('Failed to fetch wishlist. Message:', message);
      }
    } catch (error) {
      console.error('Error', error.message);
    }
  };

  setTimeout( ()=> {
    dispatch(setIsLoading(false))
  }, 2000)
  useEffect(() => {
    dispatch(setIsLoading(true))
    
    yourWishlist(userId, userToken);
  }, [userId, userToken]);

  const removeFromWish = (id) => {
    deletePro(userId, id, userToken);
  };

  const deletePro = async (userId, productId, userToken) => {
    try {
      const response = await axios.delete(
        `/users/${userId}/wishlist/${productId}`,
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      );
      const { status, message } = response.data;
      if (status === 'success') {
        toast.success('Product removed from wishlist.');
        yourWishlist(userId, userToken);
      } else {
        toast.error('Product removal from wishlist failed.');
      }
    } catch (error) {
      toast.error('Network Error');
    }
  };

  return (
    <div className='w-full h-screen pt-4 overflow-x-hidden overflow-y-auto bg-gradient-to-r from-gray-950 to-slate-500'>
      <h2 className='font-serif'>Your Wishlist</h2>
      <div className='w-full' >
      <Row xs={1} md={2} lg={3} xl={4} className="gap-4 p-4 flex flex-wrap justify-center ">
        {wishlist.map((item) => (
          <Card
            className="shadow p-3 mb-5 bg-body-tertiary rounded"
            style={{ width: '18rem', height: '28rem' }}
            key={item.Id}
          >
            <Card.Img variant="top" src={item.image} />
            <Card.Body style={{ textAlign: 'center' }}>
              <Card.Title>{item.title}</Card.Title>
              <h6>Gender: {item.category}</h6>
              <h6>Price: ₹ {item.price}</h6>

              <Button variant="outline-primary">Buy Now</Button>

              <Button
                onClick={() => removeFromWish(item._id)} 
                className="ms-3"
                variant="outline-danger"
              >
                Remove
              </Button>
            </Card.Body>
          </Card>
        ))}
      </Row>
      </div>
      {
        isLoading && <Loading />
      }
    </div>
  );
}

export default Wishlist;
