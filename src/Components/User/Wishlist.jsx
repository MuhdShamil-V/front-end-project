import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectUserToken, selectUserid } from '../../redux/authSlice';
import axios from 'axios';
import { Card, Button, Row } from 'react-bootstrap';

function Wishlist() {
  const userToken = useSelector(selectUserToken);
  const userId = useSelector(selectUserid);

  const [wishlist, setWishlist] = useState([]);

  const yourWishlist = async (userId, token) => {
    try {
      const response = await axios.get(`https://ecommerce-api.bridgeon.in/users/${userId}/wishlist`, {
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

  useEffect(() => {
    yourWishlist(userId, userToken);
  }, [userId, userToken]);

  return (
    <div>
      <h2>My Wishlist</h2>
      <Row xs={1} md={2} lg={3} xl={4} className="g-4">
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

              <Button variant="outline-primary">Buy Product</Button>

              <Button
                // onClick={() => remove(item.Id)} 
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
  );
}

export default Wishlist;
