import React, { useState } from "react";
import axios from "axios";
import '../Dealer/Login.css';
import { useNavigate } from "react-router-dom";
import { BiSolidUser, BiSolidLockAlt } from 'react-icons/bi';
import { useDispatch, useSelector } from 'react-redux';
import { setToken } from "../../redux/authSlice";


function Login() {

  
  const isSignIn = useSelector((state) => state.auth.isSignIn);


  const [state, setState] = useState("");
  const [name, setName] = useState("");
  const dispatch = useDispatch();
  const navigation = useNavigate();
  // const userToken="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkZWFsZXJJZCI6IjY1NDA4ZjRkN2E2NmIyYTQ0MmY0M2ExNiIsImlhdCI6MTY5ODkxODc5MSwiZXhwIjoxNzMwNDU0NzkxfQ.-EK1a98jBLNXpTSxl90Jz4NP8NYdSB98kuD1H0KW4Rs"
  // const tologin=(event)=>{
  //   event.email.value==="@mail.com"?handleLogin(event):loginUser(event)
  // }
  const tologin = (event) => {
    const email = event.target.email.value;
    const password=event.target.password.value;// /  const apiKey=""
    const isAdmin = email === "shamil@mail.com"; // Replace with the actual admin email
    event.preventDefault();
   
   const accessKey="7c63073252c8740d7951"
    if (isAdmin) {
      handleLogin(event);
    } else {
      loginUser(accessKey,email,password);
    }
  };
  
  
  const handleLogin = async (event) => {
    event.preventDefault();
    const email = event.target.email.value;
    console.log(email);
    const password = event.target.password.value;
    console.log(password);
  
    setState([...state, { email: email, password: password }]);
  
    try {
      const response = await axios.post(
        "https://ecommerce-api.bridgeon.in/login",
        {
          email,
          password,
        }
      );
      const { status, message, data } = response.data;
      console.log(response.data, "guyjgjyhbj");
      if (status === "success") {
        const token = data.token;
        console.log("Login successful. Token:", token);
        dispatch(setToken(token)); // Dispatch the token to the Redux store
        navigation("/admin");
      } else {
        console.error("Login failed. Message:", message);
      }
    } catch (error) {
      console.error("Error:", error.message);
    }
  }
    

  
  const loginUser = async (accessKey,email,password) => {
  

    try {
      const response = await axios.post('https://ecommerce-api.bridgeon.in/users/login', {
        accessKey,
        email,
        password,
      }
        );
        const { status, message, data } = response.data;

      if (status === 'success') {
        console.log(data)
        const token = data.token;
        setName(data._id)
        alert(name)

        console.log('Login successful. Token:', token);
        navigation('/')
      } else {
        console.error('Login failed. Message:', message);
      }
    } catch (error) {
      console.error(`token${accessKey}`, error.message);
    }
  };

  return (

    <div className="login-window">
      <div className="L-wrapper">
        <div className="L-inner login">
          <form action="/login" onSubmit={tologin}>
            <h2>LogIn</h2>
            <div className="L-form-wrapper">
              <input
                type="text"
                className="L-form-control"
                id="email"
                name="email" 
                required
                value={state.email}
                
              />
              <label>Email</label>
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
                value={state.password}
                
              />
              <label>Password</label>
              <div className="L-icon">
                <BiSolidLockAlt />
              </div>
            </div>

            <button type="submit" className="L-button">
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;