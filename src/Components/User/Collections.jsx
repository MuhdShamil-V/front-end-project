// import React, { useEffect } from 'react';
// import axios from 'axios';
// import { useDispatch, useSelector } from 'react-redux';
// import { selectProducts, setProducts, setUserToken } from '../../redux/authSlice';
// import { MDBCard, MDBCardImage, MDBCardBody, MDBCardTitle, MDBRipple } from 'mdb-react-ui-kit';
// import { motion } from 'framer-motion';
// import { FaCartPlus, FaHeart } from 'react-icons/fa';
// import Slider from './slider';
// // import '../User/Collection.css'; 


// function Collections() {
//   const dispatch = useDispatch();
//   const products = useSelector(selectProducts);
//   const userToken = useSelector(setUserToken);

//   const getAllProducts = async (token) => {
//     try {
//       const response = await axios.get('https://ecommerce-api.bridgeon.in/products?accessKey=7c63073252c8740d7951', {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       const { status, message, data } = response.data;
//       if (status === 'success') {
//         dispatch(setProducts(data));
//         console.log('Fetched products:', data);
//       } else {
//         console.error('Product retrieval failed. Message:', message);
//       }
//     } catch (error) {
//       console.error('Error:', error.message);
//     }
//   };

//   useEffect(() => {
//     console.count('home useeffect');
//     getAllProducts(userToken);
//   }, []);

//   return (
//     <div className="container">
//       <div className="flex p-8 flex-wrap justify-start gap-10">
//         {products.map((value) => (
//            <div className='h-80 w-48 flex flex-col rounded-lg justify-center gap-2 items-start overflow-hidden'>
           
//             <motion.div
//             initial={{scale:1,opacity:1}}
//             whileHover={{scale:1.1,opacity:0.6}}
           
//             className="h-5/6 w-full "   style={{
//              backgroundImage: `url("${value.image}")`,
//              backgroundSize: 'cover',
//              backgroundRepeat: 'no-repeat',
//              overflow:"hidden",
//              borderTopRightRadius:"8px",
//              borderTopLeftRadius:"8px",
//              backgroundPosition: 'center',
//              // Transition for box shadow
//            }}>
//             </motion.div>
//                   <div className='font-thin text-yellow-600 w-full p-1 bg-stone-800 text-opacity-60 flex justify-center items-start gap-4 overflow-hidden'>
//                     <span className='text-2xl flex items-center justify-around '> <FaCartPlus /> </span >
                   
                 
//                   </div>

//           </div>
//         ))}
//       </div>
//     <Slider />  
//     </div>

//   );
// }

// export default Collections;
