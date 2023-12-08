import React from 'react';
import axios from '../AxiosInstance/instance';
import '../User/Register.css';
import { setUserToken, setUserid } from '../../redux/authSlice';
import { useDispatch } from 'react-redux';
import { BiSolidUser, BiSolidLockAlt } from 'react-icons/bi';
import { MdAlternateEmail } from "react-icons/md";
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useFormik } from 'formik';
import { SignupValidation } from './SignupValidation';


const initialValues = {
  name: '',
  email: '',
  password: ''
}


function Signup() {
  
    const navigate = useNavigate();
    const dispatch = useDispatch();

  
    const { values, handleBlur, handleChange, handleSubmit, errors } = useFormik({
    initialValues: initialValues,
    validationSchema: SignupValidation,
    onSubmit: async (values) => {
      console.log(values);
      const { name, email, password } = values;
  
      const accessKey = process.env.REACT_APP_ACCESS_KEY;
  
      try {
        const response = await axios.post('/users/register', {
          accessKey,
          username:name,
          email,
          password,
        });
        const { status, data } = response.data;
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
    }
  });

  return (
    <div className="register-window">
      <div className="R-wrapper">
        <div className="R-inner signup">
          <form 
          // onSubmit={handleRegistration}
          onSubmit={handleSubmit}>

            <h2>Registration</h2>
            <div className="R-form-wrapper">
            <input
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.username}  // Update to use "username" instead of "name"
              type="text"
              className="R-form-control"
              name="name"
              id="name"
              required
            />
              <label>Username</label>
              {errors.name && <small className='text-red-600'>{errors.name}</small>}
              <div className="R-icon">
                <BiSolidUser />
              </div>
            </div>
            <div className="R-form-wrapper">
              <input
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.email}
                type="email"
                className="R-form-control"
                name="email"
                id="email"
                required
                
              />
              <label>Email</label>
              {errors.email && <small className='text-red-600'>{errors.email}</small>}

              <div className="R-icon">
              <MdAlternateEmail />
              </div>
            </div>
            <div className="R-form-wrapper">
              <input
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.password}
                type="password"
                className="R-form-control"
                name="password"
                id="password"
                required
                
              />
              <label>Password</label>
              {errors.password && <small className='text-red-600'>{errors.password}</small>}
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
