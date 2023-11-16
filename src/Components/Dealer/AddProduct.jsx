import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectToken } from '../../redux/authSlice';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Addproduct() {
  const token = useSelector(selectToken);
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [image, setImage] = useState(null); // Add state for image
  const navigate = useNavigate();

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('title', title);
    formData.append('category', category);
    formData.append('description', description);
    formData.append('price', price);
    formData.append('img', image); // Append image data

    try {
      const response = await axios.post(
        'https://ecommerce-api.bridgeon.in/products',
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      const { status, message, data } = response.data;
      if (status === 'success') {
        // Product added successfully.
        console.log('Product added. Product details:', data);
      
      } else {
        console.error('Product addition failed. Message:', message);
      }
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  return (
    <div className="p-4">
      <div>
        <h2 className="text-2xl font-bold mb-4 text-white">Add Product</h2>
        <form
          onSubmit={handleFormSubmit}
          className="flex flex-col space-y-4 max-w-md"
          encType="multipart/form-data"
        >
          <input
            type="text"
            name="name"
            id="name"
            placeholder="Product Name"
            onChange={(e) => setTitle(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2"
          />
          <input
            type="text"
            name="category"
            id="catogery"
            placeholder="Category"
            onChange={(e) => setCategory(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2"
          />
          <textarea
            name="description"
            id="description"
            placeholder="Product Description"
            onChange={(e) => setDescription(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2"
          ></textarea>
          <input
            type="number"
            name="price"
            id="price"
            placeholder="Product Price"
            onChange={(e) => setPrice(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2"
          />
          <input
            type="file"
            name="img"
            id="img"
            placeholder="img"
            onChange={(e) => setImage(e.target.files[0])} // Set image data
            className="border border-gray-300 rounded-md px-3 py-2"
          />
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Add Product
          </button>
        </form>
      </div>
      <button
        onClick={() => navigate('/getallpro')}
        className="mt-4 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
      >
        View All Products
      </button>
      <button
        onClick={() => navigate('/getallusers')}
        className="mt-4 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
      >
        View All users
      </button>
    </div>
  );
}

export default Addproduct;