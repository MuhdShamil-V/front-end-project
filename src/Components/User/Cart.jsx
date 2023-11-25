import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectToken, selectUserid } from '../../redux/authSlice';

function Cart() {
  const userId = useSelector(selectUserid);
  const userToken = useSelector(selectToken);
  const [cartItem, setCartItem] = useState([]);

  const viewCart = async (userId, token) => {
    try {
      const response = await axios.get(`https://ecommerce-api.bridgeon.in/users/${userId}/cart`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const { status, message, data } = response.data;
      if (status === 'success') {
        // Successfully fetched cart items.
        const products = data.products[0].cart;
        console.log('Cart items:', products);
        setCartItem(products);
      } else {
        console.error('Cart item retrieval failed. Message:', message);
      }
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  useEffect(() => {
    viewCart(userId, userToken);
  }, []);

  const removeFromCart = async (userId, productId, token) => {
    try {
      const response = await axios.delete(`https://ecommerce-api.bridgeon.in/users/${userId}/cart`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: {
          productId,
        },
      });
      const { status, message } = response.data;
      if (status === 'success') {
        // Product removed from cart successfully.
        console.log('Product removed from cart.');
        // After removing the product, you might want to refresh the cart.
        viewCart(userId, userToken);
      } else {
        console.error('Product removal from cart failed. Message:', message);
      }
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  return (
    <div>
      <h2>Your Cart</h2>
      {cartItem.map((product) => (
        <div key={product.productId}>
          <p>{product.productName}</p>
          <p>Quantity: {product.quantity}</p>
          <p>Price: ₹{product.price}</p>
          <button onClick={() => removeFromCart(userId, product.productId, userToken)}>
            Remove from Cart
          </button>
          <hr />
        </div>
      ))}
    </div>
  );
}

export default Cart;
