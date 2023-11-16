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
        setIsdelete([...isdelete, "User deleted."]);
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
  };


  return (
    <div>
      {users ? (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Username</th>
              <th>Email</th>
              <th>Action</th>
              {/* Add more table headers as needed */}
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user._id}>
                <td>{index+1}</td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>
                  <button onClick={() => handleRemove(user._id)}>Remove</button>
                </td>
                {/* Add more table cells as needed */}
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
