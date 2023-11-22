import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectToken } from '../../redux/authSlice';

function UserList() {
  const [users, setUsers] = useState([]);
  const [isdelete, setIsdelete] = useState([]);
  const token = useSelector(selectToken);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('https://ecommerce-api.bridgeon.in/users', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const { status, message, data } = response.data;
      if (status === 'success') {
        setUsers(data);
      } else {
        console.error('User retrieval failed. Message:', message);
      }
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [token]);

  const deleteUser = async (userId, token) => {
    try {
      const response = await axios.delete(`https://ecommerce-api.bridgeon.in/users/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const { status, message } = response.data;
      if (status === 'success') {
        console.log('User deleted.');
        setIsdelete([...isdelete, 'User deleted.']);
        fetchUsers();
      } else {
        console.error('User deletion failed. Message:', message);
      }
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  const handleRemove = (id) => {
    deleteUser(id, token);
  }

  const showUserInfo = (userId) => {
    console.log(`Show user info for user with ID: ${userId}`);
  };
  return (
    <div>
      {users ? (
        <table className="min-w-full border border-black text-white">
          <thead>
            <tr className="bg-emerald-300">
              <th className="border border-emerald-300 py-2 px-4 text-black">ID</th>
              <th className="border border-emerald-300 py-2 px-4 text-black">Username</th>
              <th className="border border-emerald-300 py-2 px-4 text-black">Email</th>
              <th className="border border-emerald-300 py-2 px-4 text-black">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user._id} className={index % 2 === 0 ? 'bg-sky-950' : 'bg-sky-800 text-black'}>
                <td className="border border-emerald-300 py-2 px-4">{index + 1}</td>
                <td className="border border-emerald-300 py-2 px-4">{user.username}</td>
                <td className="border border-emerald-300 py-2 px-4">{user.email}</td>
                <td className="border border-emerald-300 py-2 px-4">
                  <button
                    className="bg-blue-600 hover:bg-blue-800 text-white py-1 px-2 rounded mr-2"
                    onClick={() => showUserInfo(user._id)}
                  >
                    Show
                  </button>
                  <button
                    className="bg-red-600 hover:bg-red-800 text-white py-1 px-2 rounded"
                    onClick={() => handleRemove(user._id)}
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>Loading users...</p>
      )}
    </div>
  );
}

export default UserList;
