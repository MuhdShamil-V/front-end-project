import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectUserToken, selectUserid } from '../../redux/authSlice';
import axios from 'axios';

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
        const products = data.products || [];
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
      <ul>
        {wishlist.map((item) => (
          <li key={item._id}>
            {item.title} - {item.productPrice}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Wishlist;
