import React from 'react';
import axios from 'axios';
import '../User/Register.css';
import { setUserToken, setUserid } from '../../redux/authSlice';
import { useDispatch } from 'react-redux';
import { BiSolidUser, BiSolidLockAlt } from 'react-icons/bi';
import { MdAlternateEmail } from "react-icons/md";
import { useNavigate } from 'react-router-dom';


function Signup() {

  const navigate = useNavigate();

    const dispatch=useDispatch()

  
    const registerUser = async (accessKey, username, email, password) => {
      try {
        const response = await axios.post('https://ecommerce-api.bridgeon.in/users/register', {
          accessKey,
          username,
          email,
          password,
        });
        const { status, message, data } = response.data;
        if (status === 'success') {
          console.log("id",data.userId)
          dispatch(setUserToken(data.token))
          dispatch(setUserid(data.userId))

          navigate('/login')
          console.log('Registration successful. Token:', data.token);
        } else {
          console.error('Registration failed. Message:', message);
        }
  
    } catch (error) {
      console.error('Error:', error.message);
     
      
    }
  };

  const handleRegistration = (event) => {
    event.preventDefault()
    const username = event.target.username.value;
    const email = event.target.email.value;
    const password = event.target.password.value;


    registerUser("7c63073252c8740d7951", username, email, password);

  };


  return (
    <div className="register-window">
      <div className="R-wrapper">
        <div className="R-inner signup">
          <form 
          onSubmit={handleRegistration}>
            <h2>Registration</h2>
            <div className="R-form-wrapper">
              <input
                type="text"
                className="R-form-control"
                name="username"
                id="username"
                required
                
              />
              <label>Username</label>
              <div className="R-icon">
                <BiSolidUser />
              </div>
            </div>
            <div className="R-form-wrapper">
              <input
                type="email"
                className="R-form-control"
                name="email"
                id="email"
                required
                
              />
              <label>Email</label>
              <div className="R-icon">
              <MdAlternateEmail />
              </div>
            </div>
            <div className="R-form-wrapper">
              <input
                type="password"
                className="R-form-control"
                name="password"
                id="password"
                required
                
              />
              <label>Password</label>
              <div className="R-icon">
                <BiSolidLockAlt />
              </div>
            </div>

            <button type="submit" className="R-button">
              Signup
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}


export default Signup;
