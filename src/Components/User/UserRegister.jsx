import React from 'react';
import axios from 'axios';
import '../User/Register.css';
import { setUserToken, setUserid } from '../../redux/authSlice';
import { useDispatch } from 'react-redux';
import { BiSolidUser, BiSolidLockAlt } from 'react-icons/bi';
import { MdAlternateEmail } from "react-icons/md";
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';


function Signup() {

  const navigate = useNavigate();

    const dispatch=useDispatch()

    const baseUrl = process.env.REACT_APP_BASE_URL;
    const accessKey = process.env.REACT_APP_ACCESS_KEY;

  
    const registerUser = async (accessKey, username, email, password) => {
      try {
        const response = await axios.post(`${baseUrl}/users/register`, {
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
          toast.success('Registration successful.');
        } else {
          toast.error('Registration failed.');
        }
  
    } catch (error) {
      toast.error('Network Error');
     
      
    }
  };

  const handleRegistration = (event) => {
    event.preventDefault()
    const username = event.target.username.value;
    const email = event.target.email.value;
    const password = event.target.password.value;

    registerUser(`${accessKey}`, username, email, password);

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
            <p className='text-white'>
              Aleady registered?
              <Link to={"/login"}>Click Here</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  )
}


export default Signup;
