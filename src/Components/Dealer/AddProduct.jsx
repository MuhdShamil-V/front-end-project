import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectToken } from '../../redux/authSlice';
import axios from 'axios';
import toast from 'react-hot-toast';



function Addproduct() {
  const token = useSelector(selectToken);
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [image, setImage] = useState(null); 

  const baseUrl = process.env.REACT_APP_BASE_URL;
  

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('title', title);
    formData.append('category', category);
    formData.append('description', description);
    formData.append('price', price);
    formData.append('img', image);
    try {
      const response = await axios.post(
        `${baseUrl}/products`,
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
        toast.success('Product added Successfully');
        setTitle('');
        setCategory('');
        setDescription('');
        setPrice('');
        setImage(null);
      } else {
        toast.error('Product addition failed.');
      }
    } catch (error) {
      toast.error('NetWork Error');
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
            required
            placeholder="Product Name"
            onChange={(e) => setTitle(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2"
          />
          <input
            type="text"
            name="category"
            id="catogery"
            required
            placeholder="Category"
            onChange={(e) => setCategory(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2"
          />
          <textarea
            name="description"
            id="description"
            required
            placeholder="Product Description"
            onChange={(e) => setDescription(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2"
          ></textarea>
          <input
            type="number"
            name="price"
            id="price"
            required
            placeholder="Product Price"
            onChange={(e) => setPrice(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2"
          />
          <input
            type="file"
            name="img"
            id="img"
           required
            placeholder="img"
            onChange={(e) => setImage(e.target.files[0])}
            className="border border-gray-300 rounded-md px-3 py-2"
          />
          <button
            type="submit"
            className="bg-emerald-300 hover:bg-emerald-500 text-black font-bold py-2 px-4 rounded"
          >
            Add Product
          </button>
        </form>
      </div>
    </div>
  );
}

export default Addproduct;            