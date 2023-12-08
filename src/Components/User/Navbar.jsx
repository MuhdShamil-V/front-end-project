import React, { useState ,useEffect} from 'react'
import { FaSearch, FaRegHeart, FaUser } from "react-icons/fa";
import { MdOutlineLogin, MdOutlineLogout } from "react-icons/md";
import { HiMiniShoppingCart } from "react-icons/hi2";
import { useNavigate } from 'react-router-dom';
import logo from '../logo.png';
import { clearUserId, clearUserToken, clearUsername, selectIslogin, selectProducts, selectToken, selectUserName, setIslogin, setProducts } from '../../redux/authSlice';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';
import { Modal } from '@mui/material';
import axios from '../AxiosInstance/instance';

function Navbar() {
  const [isSearch,setIsSearch]=useState(false)
  const isLogin = useSelector(selectIslogin);
  const token=useSelector(selectToken)
  const products=useSelector(selectProducts)

  const dealerToken=token
  const name = useSelector(selectUserName);
  console.log(isLogin)
  const dispatch = useDispatch();
  const nav=useNavigate()
  const [searchdata, setSearchdata] = useState([]);
  const handleSearch = (e) => {
    e.preventDefault()
    const text=e.target.value
    const text1=text.trim().toLowerCase()
    const results = products.filter((product) => product.title.toLowerCase().includes(text1));
    console.log(results);
    setSearchdata(results);
    
  };

  const accessKey=process.env.REACT_APP_ACCESS_KEY;

  const logout = () =>  {

    Swal.fire({
      title: 'Are you sure?',
      text: 'You will be logged out!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, logout!',
    }).then((result) => {
      if (result.isConfirmed) {
        
        dispatch(clearUserId());
        dispatch(clearUserToken());
        dispatch(setIslogin(false));
        dispatch(clearUsername());

       
        toast.success('Logged Out');
      }
    });
  };

  const navigate = useNavigate();
  
  const getAllProducts = async (token) => {
    try {
      const response = await axios.get(
        `/products?accessKey=${accessKey}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const { status, message, data } = response.data;
      if (status === "success") {
        // Successfully fetched products.
        dispatch(setProducts(data)); // Use setProductsAction instead of setProducts
        console.log("Fetched products:", data);
      } else {
        console.error("Product retrieval failed. Message:", message);
      }
    } catch (error) {
      console.error("Error:", error.message);
    }
  };
  useEffect(() => {
    getAllProducts(dealerToken);
  }, []);
  return (
    <div className='main-bar'>
        <div className='logo'>
          <img className='h-40' src={logo} />
        </div>
        <div className='flex gap-4 font-thin'>
            <button className='text-gray-950 hover:text-white'>About</button>
            <button className='text-gray-950 hover:text-white'>Contact</button>
            <button className='text-gray-950 hover:text-white' onClick={()=> navigate('/collections')}>Collections</button>
            <button className='text-gray-950 hover:text-white' onClick={()=> navigate('/men')}>Men</button>
            <button className='text-gray-950 hover:text-white' onClick={()=> navigate('/women')}>women</button>
           
        </div>
        <div className='flex gap-4 text-white font-thin'>


          {
            isLogin?

            <div className='flex justify-center items-center gap-4'>
            <button className='text-black'><MdOutlineLogout onClick={logout} title='logout' /></button>
            <button className='text-black'><FaUser   title={name}/></button>
            </div>
            :
          <button className='text-black'><MdOutlineLogin onClick={()=> navigate('/login')}  title='login'/></button>
          }
            <button className='text-gray-950 hover:text-white'><FaSearch onClick={()=>setIsSearch(true)}/></button>
            <button className='text-gray-950 hover:text-white'><HiMiniShoppingCart onClick={()=> navigate('/cart')} /></button>
            <button className='text-gray-950 hover:text-white'><FaRegHeart onClick={()=> navigate('/wishlist')} /></button>

        </div>
        {isSearch && (
        <Modal
          open={isSearch}
          onClose={() => setIsSearch(false)}
          style={{ display: 'flex', alignItems: 'start', justifyContent: 'center', marginTop: '100px' }}
        >
          <div className="p-8  flex flex-col  justify-center items-center gap-2 w-1/2 rounded-xl">
            <input
              type="text"
              className="bg-stone-500 text-black w-3/4 h-14 rounded-3xl pl-4 overflow-hidden shadow-md"
              style={{ opacity: 1, y: 0 }}
              onChange={handleSearch}
            />
            <div className="bg-black opacity-60 h-auto w-3/4 rounded-lg">
              <ul >
             
  {searchdata.length>0?
 (   searchdata.map((value,index)=>{
      return(

      <p key={index} className=' font-mono rounded-lg text-gray-300' onDoubleClick={()=>nav(`/showproduct/${value._id}`)} >
        {index+1}:
{value.title}
      </p>
    )})):<div>plsss enter something</div>
  }
              </ul>
            </div>
          </div>
        </Modal>
      )}


    </div>
  )
}

export default Navbar