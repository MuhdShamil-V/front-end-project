import React, { useState, useEffect } from 'react';
import axios from '../AxiosInstance/instance';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectProducts,
  selectToken,
  setProducts as setProductsAction,
} from '../../redux/authSlice';
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';

function GetAllproduct() {
  const token = useSelector(selectToken);
  const products = useSelector(selectProducts);
  const dispatch = useDispatch();
  const [isEdit, setIsEdit] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [updatedProductData, setUpdatedProductData] = useState(null);

  const dealerToken = token;

  const accessKey = process.env.REACT_APP_ACCESS_KEY;

  useEffect(() => {
    getAllProducts(dealerToken);
  }, [dealerToken]);

  const getAllProducts = async (token) => {
    try {
      const response = await axios.get(`/products?accessKey=${accessKey}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const { status, message, data } = response.data;
      if (status === 'success') {
        dispatch(setProductsAction(data));
        console.log('Fetched products:', data);
      } else {
        console.error('Product retrieval failed. Message:', message);
      }
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  const handleProductClick = (product) => {
    setSelectedProduct(product);
  };

  const deleteProduct = async (productId, token) => {
    try {
      const response = await axios.delete(`/products/${productId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const { status, message } = response.data;
      if (status === 'success') {
        toast.success('Product deleted.');
        getAllProducts(token);
      } else {
        toast.error('Product deletion failed.');
      }
    } catch (error) {
      toast.error('Network Error');
    }
  };

  const handleDelete = (productId) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You won\'t be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        deleteProduct(productId, dealerToken);
      }
    });
  };

  const handleEdit = (productId) => {
    const productToEdit = products.find((product) => product._id === productId);
    if (productToEdit) {
      setSelectedProduct(productToEdit);
      setIsEdit(true);
    }
  };

  const handleUpdateProduct = async (productId, updatedProductData, token) => {
    try {
      const response = await axios.patch(`/products/${productId}`, updatedProductData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const { status, message, data } = response.data;
      if (status === 'success') {
        getAllProducts(token);
        setIsEdit(false);
        toast.success(`Successfully updated ${updatedProductData.title}`);
      } else {
        toast.error('Product updation failed.');
      }
    } catch (error) {
      toast.error('Network Error');
      setIsEdit(false);
    }
  };

  return (
    <div className='p-4 w-full h-full'>
      <div className="overflow-x-auto">
        <table className='w-full table-auto'>
          <thead>
            <tr className="bg-gray-800 text-white">
              <th className="py-2 px-4 w-1/12 sm:w-1/6">ID</th>
              <th className="py-2 px-4 w-1/6 sm:w-1/3">Title</th>
              <th className="py-2 px-4 w-1/6 sm:w-1/3">Price</th>
              <th className="py-2 px-4 w-1/6 sm:w-1/6">Category</th>
              <th className="py-2 px-4 w-1/6 sm:w-1/6">Image</th>
              <th className="py-2 px-4 w-1/6 sm:w-1/6">Edit</th>
              <th className="py-2 px-4 w-1/6 sm:w-1/6">Delete</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr key={product._id} className='bg-gray-900 text-white' onClick={() => handleProductClick(product)}>
                <td className="py-2 px-4 w-1/12 sm:w-1/6">{index + 1}</td>
                <td className="py-2 px-4 w-1/6 sm:w-1/3">{product.title}</td>
                <td className="py-2 px-4 w-1/6 sm:w-1/3">₹ {product.price}</td>
                <td className="py-2 px-4 w-1/6 sm:w-1/6">{product.category}</td>
                <td className="py-2 px-4 w-1/6 sm:w-1/6">
                  <img src={product.image} alt={product.title} className="w-20 h-20" />
                </td>
                <td className="py-2 px-4 w-1/6 sm:w-1/6">
                  <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => handleEdit(product._id)}>
                    Edit
                  </button>
                </td>
                <td className="py-2 px-4 w-1/6 sm:w-1/6">
                  <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={() => handleDelete(product._id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedProduct && (
        <div className='bg-gray-100 p-4 rounded-md mb-4'>
          <h2 className='text-2xl font-bold mb-2'>{selectedProduct.title}</h2>
          <p className='text-lg'>Price: {selectedProduct.price}</p>
          <p className='text-lg'>Description: {selectedProduct.description}</p>
        </div>
      )}

      {isEdit && (
        <div className='bg-gray-800 text-white w-full p-4 rounded-md mb-4'>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setUpdatedProductData({
                title: e.target.title.value,
                price: e.target.price.value,
                description: e.target.description.value,
                category: e.target.category.value,
              });
              handleUpdateProduct(selectedProduct._id, updatedProductData, token);
            }}
          >
            <input
              type='text'
              name='title'
              placeholder='Title'
              defaultValue={selectedProduct.title}
              className='bg-gray-700 text-white rounded-md px-3 py-2 mb-2'
            />
            <input
              type='number'
              name='price'
              placeholder='Price'
              defaultValue={selectedProduct.price}
              className='bg-gray-700 text-white rounded-md px-3 py-2 mb-2'
            />
            <input
              type='text'
              name='category'
              placeholder='Category'
              defaultValue={selectedProduct.category}
              className='bg-gray-700 text-white rounded-md px-3 py-2 mb-2'
            />
            <textarea
              name='description'
              placeholder='Description'
              defaultValue={selectedProduct.description}
              className='bg-gray-700 text-white rounded-md px-3 py-2 mb-2'
            />
            <button type='submit' className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
              Update Product
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default GetAllproduct;
