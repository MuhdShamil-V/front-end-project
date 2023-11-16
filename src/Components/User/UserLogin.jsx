// import React from 'react';
// import axios from 'axios';
// import { setUserToken } from '../../redux/authSlice';
// import { useDispatch } from 'react-redux';
// import { BiSolidUser, BiSolidLockAlt } from 'react-icons/bi';

// function UserLogin() {

//   const dispatch = useDispatch();
//   const handleLogin = (event) => {
//     event.preventDefault();
//     const email = event.target.email.value;
//     const password = event.target.password.value;
//     const accesskey = "7c63073252c8740d7951";
//     loginUser(accesskey, email, password);
//   };

//   const loginUser = async (accesskey, email, password) => {
//     try {
//       const response = await axios.post('https://ecommerce-api.bridgeon.in/users/login', {
//         accesskey,
//         email,
//         password,
//       });
//       const { status, message, data } = response.data;
//       if (status === 'success') {
//         const token = data.token;
//         console.log('Login successful. Token:', data.token);
//       } else {
//         console.error('Login failed. Message:', message);
//       }
//     } catch (error) {
//       console.error('Error:', error.message);
//     }
//   };



//   return (
//     <div className="login-window">
//       <div className="L-wrapper">
//         <div className="L-inner login">
//           <form onSubmit={handleLogin}>
//             <h2>Login</h2>
//             <div className="L-form-wrapper">
//               <input
//                 type="email"
//                 className="L-form-control"
//                 name="email"
//                 id="email"
//                 required
//               />
//               <label>Email</label>
//               <div className="L-icon">
//                 <BiSolidUser />
//               </div>
//             </div>
//             <div className="L-form-wrapper">
//               <input
//                 type="password"
//                 className="L-form-control"
//                 name="password"
//                 id="password"
//                 required
//               />
//               <label>Password</label>
//               <div className="L-icon">
//                 <BiSolidLockAlt />
//               </div>
//             </div>
//             <button type="submit" className="L-button">
//               Login
//             </button>
//           </form>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default UserLogin;
