import axios from 'axios';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { BsCart4 } from 'react-icons/bs';
import { Button, Table } from 'react-bootstrap';
import { selectToken, selectUserid } from '../../redux/authSlice';
import toast from 'react-hot-toast';

function Cart() {
  const userId = useSelector(selectUserid);
  const userToken = useSelector(selectToken);
  const [cartItems, setCartItems] = useState([]);

  const baseUrl = process.env.REACT_APP_BASE_URL;

  const viewCart = async (userId, token) => {
    try {
      const response = await axios.get(`${baseUrl}/users/${userId}/cart`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const { status, message, data } = response.data;
      if (status === 'success') {
        const products = data.products[0].cart.map((item) => ({ ...item, qty: 1 }));
        console.log('Cart items:', products);
        setCartItems(products);
      } else {
        console.error('Cart item retrieval failed. Message');
      }
    } catch (error) {
      console.error('Error');
    }
  };

  useEffect(() => {
    viewCart(userId, userToken);
  }, []);

  const removeFromCart = (id) => {
    deletePro(userId, id, userToken);
  };

  const deletePro = async (userId, productId, userToken) => {
    try {
      const response = await axios.delete(
        `${baseUrl}/users/${userId}/cart/${productId}`,
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      );
      const { status, message } = response.data;
      if (status === 'success') {
        toast.success('Product removed from cart.');
        viewCart(userId, userToken);
      } else {
        toast.error('Product removal from cart failed.');
      }
    } catch (error) {
      toast.error('Network Error');
    }
  };

  const increaseQty = (itemId) => {
    setCartItems((prevCartItems) =>
      prevCartItems.map((item) =>
        item._id === itemId ? { ...item, qty: item.qty + 1 } : item
      )
    );
  };

  const decreaseQty = (itemId) => {
    setCartItems((prevCartItems) =>
      prevCartItems.map((item) =>
        item._id === itemId && item.qty > 1 ? { ...item, qty: item.qty - 1 } : item
      )
    );
  };

  const calculateItemTotal = (item) => {
    return item.qty * item.price;
  };

  const calculateCartTotal = () => {
    return cartItems.reduce((total, item) => total + calculateItemTotal(item), 0);
  };

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <div>
      <div>
        <div>
        <h2 style={{ fontStyle: 'italic' }}>
          <BsCart4 /> Your Cart
        </h2>
        </div>
        <br />

        <div className="d-flex-col container">
          {cartItems.length > 0 ? (
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Title</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Total</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item) => (
                  <tr key={item._id}>
                    <td>
                      <img src={item.image} alt={item.title} style={{ width: '50px' }} />
                    </td>
                    <td>{item.title}</td>
                    <td>{item.category}</td>
                    <td>{item.price}</td>
                    <td>
                      <Button
                        className="m-1"
                        variant="outline-primary"
                        onClick={() => decreaseQty(item._id)}
                      >
                        -
                      </Button>
                      {item.qty}
                      <Button
                        onClick={() => increaseQty(item._id)}
                        className="m-1"
                        variant="outline-primary"
                      >
                        +
                      </Button>
                    </td>
                    <td>{calculateItemTotal(item)}</td>
                    <td>
                      <Button
                        onClick={() => removeFromCart(item._id)}
                        className="ms-3"
                        variant="outline-danger"
                      >
                        Remove
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : (
            <div className="empty_img text-center">
              <img
                src="https://schoolville.com/assets/img/empty-cart-illustration.gif"
                alt=""
                style={{ width: '400px' }}
              />
              <h3>Cart is empty</h3>
            </div>
          )}
          {cartItems.length > 0 && (
            <div className="d-flex justify-content-between align-items-center">
              <p className="fw-bold">Cart Total: ₹ {calculateCartTotal()}</p>
              <div>
                <Button variant="outline-primary">Buy All</Button>
                <Button onClick={clearCart} className="ms-3" variant="outline-danger">
                  Clear Cart
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Cart;
