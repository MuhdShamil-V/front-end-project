import React, { useState } from "react";
import axios from '../AxiosInstance/instance';
import '../Dealer/Login.css';
import { Link, useNavigate } from "react-router-dom";
import { BiSolidUser, BiSolidLockAlt } from 'react-icons/bi';
import { useDispatch, useSelector } from 'react-redux';
import { setIsAdmin, setIslogin, setToken, setUserToken ,setUserid, setUsername} from "../../redux/authSlice";
import toast from "react-hot-toast";
import { useFormik } from 'formik';
import { SignupValidation } from "../User/SignupValidation";


const initialValues = {
  username: '',
  email: '',
  password: ''
}

function Login() {
  const {values,handleBlur,handleSubmit,handleChange,errors}=useFormik({
    initialValues:initialValues,
    validationSchema:SignupValidation,
  onSubmit: (values)=>{
      tologin(values)

  }
  })

  const [state, setState] = useState("");
  
  const dispatch = useDispatch();
  const navigation = useNavigate();
  const accessKey = process.env.REACT_APP_ACCESS_KEY;
  
  const tologin = (values) => {
    const {name,email,password}=values
    
    const isAdmin = email === "shamil@mail.com";
    console.log(name)
    dispatch(setUsername(name))
   


    if (isAdmin) {
      handleLogin(email,password);
    } else {
      loginUser(accessKey,email,password);
    }
  };
  
  
  const handleLogin = async (email,password) => {
    
  console.log(email)
  console.log(password)
    setState([...state, { email: email, password: password }]);
  
    try {
      const response = await axios.post(
        '/login',
        {
          email,
          password,
        }
      );
      const { status, message, data } = response.data;
      console.log(response.data);
      if (status === "success") {
        const token = data.token;
        toast.success("Admin logged in successfully")
        dispatch(setToken(token)); 
        dispatch(setIsAdmin(true))
        navigation("/admin");
      } else {
        toast.error("Admin already logged")
      }
    } catch (error) {
      toast.error("Network Error");
    }
  }
    

  
  const loginUser = async (accessKey,email,password) => {
  

    try {
      const response = await axios.post( '/users/login', {
        accessKey,
        email,
        password,
      }
        );
        const { status, message, data } = response.data;

      if (status === 'success') {
        console.log(data)
        const token = data.token;
        dispatch(setUserToken(data.token))
        dispatch(setUserid(data.userId))
        dispatch(setIslogin(true))

        // console.log('Login successful. Token:', token);
        toast.success("User logged in")
        navigation('/home')
      } else {
        toast.error('Login failed.');
      }
    } catch (error) {
      toast.error("Network Error")
    }
  };

  return (

    <div className="login-window">
      <div className="L-wrapper">
        <div className="L-inner login">
          <form action="/login" onSubmit={handleSubmit}>
            <h2>LogIn</h2>
            <div className="L-form-wrapper">
              <input
                type="text"
                className="L-form-control"
                id="email"
                name="email" 
                required
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.email}

                
              />
              <label>Email</label>
              {errors.email && <small className='text-red-600'>{errors.email}</small>}

              <div className="L-icon">
                <BiSolidUser />
              </div>
            </div>
            <div className="L-form-wrapper">
              <input
                type="password"
                className="L-form-control"
                id="password"
                name="password" 
                required
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.password}
                
              />
              <label>Password</label>
              {errors.password && <small className='text-red-600'>{errors.password}</small>}

              <div className="L-icon">
                <BiSolidLockAlt />
              </div>
            </div>
            <div className="L-form-wrapper">
            <input
                type="text"
                className="L-form-control"
                id="name"
                name="name" 
                required
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.name}
                
                
              />
              <label>name</label>
              {errors.name && <small className='text-red-600'>{errors.name}</small>}

              <div className="L-icon">
                <BiSolidLockAlt />
              </div>
            </div>

            <button type="submit" className="L-button">
              Login
            </button>
            <p style={{ textAlign: 'center', marginTop: '10px', color: 'white' }}>
          Don't have an account? <Link to="/">Register here</Link>
        </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
