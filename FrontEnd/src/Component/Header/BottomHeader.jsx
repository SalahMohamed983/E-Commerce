import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { Avatar, Button, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useEffect, useState } from 'react';
import CartProduct from '../CartProduct/CartProduct';
import { Link, useNavigate } from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";
import { fetchProduct } from '../../Featured/ProductSlice';
import Badge from '@mui/material/Badge';
import { fetchFavoritProduct } from '../../Featured/FavoritProducts';
import Sidebar from './Sidebar';


export default function BottomHeader()
{
    const [searchValue, setSearchValue] = useState()
  
  const [cartOpen, setCartOpen] = useState(false);
  const nav = useNavigate();
    
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.Users.User || null);

  let user = false;
  if(userData != false || userData != true || userData != null)
    user = userData; 
        else
    user = false; 


const FavoritProduct = useSelector((state) => state.FavoritProducts.Favoritproduct || []);


  const cartItems = useSelector((state) => state.CartProducts.items || []);

  return(
  <div className="flex items-center justify-between py-2 px-2 md:px-6">
    <div className="block md:hidden">
            <Sidebar  />
    
           </div>
   <div className="mx-auto md:mx-0">
   <Link to={"/"}>
    <img  src="/images/file_0000000075fc61f6b3f3242d0edc5d05.png" className="w-[130px] md:w-[170px]" alt="Logo"/>
   </Link>
  </div>
  <div className="hidden md:flex items-center bg-gray-100 rounded-md px-2"> <input 
      value={searchValue}
      onChange={(e) => setSearchValue(e.target.value)} 
      type="search" 
      placeholder="Search for Products..." 
      className="rounded-md w-[550px] bg-gray-100 py-3 pr-1"
      />  <IconButton onClick={() =>{
    
        dispatch(fetchProduct({
          page: 1,  
          productPerPage: 100,
          search: searchValue,
        }));
        
        nav("/ShowProducts");
      }}>
        <SearchIcon />
      </IconButton>
 </div>
 <div className='flex  items-center'>
 {!user?
  (
       <div className="hidden md:flex gap-2">
  <Link to="/Login"><span className='hoverSec'>Login</span> </Link>
  <span>|</span>
  <Link to='/Register'>
  <span className='hoverSec'> 
     Register</span></Link>
  </div>
  ): 
 <>
 <Link to={"/ProfileAndDashboard"} className="hidden md:flex items-center gap-2">
    <Button className='transition duration-300 hover:bg-[#1f457122] py-1 px-2 cursor-pointer gap-4 flex justify-between items-center'>
    <Avatar
            src={user.avterImage}
            sx={{ width: 45, height: 45}}
            className=' !border-2 border-tertiary'
            />
    <div className=' -space-y-1' >
<p className=' text-start text-gray-600 font-[600]'>{user.fullName}</p>
<p className=' text-gray-400 '>{user.email}</p>

    </div>
    </Button></Link>
 
    <Link className=' hidden md:block' to='/ProfileAndDashboardNamePage'>
      <Badge badgeContent={FavoritProduct.length} 
        sx={{
    "& .MuiBadge-badge": {
      backgroundColor: "#ff5252", 
            color: "white",       
    },
  }}>
    <FavoriteBorderIcon/>
  </Badge>
    </Link>
 </>
    }


 <Badge badgeContent={cartItems.length} 
        sx={{
    "& .MuiBadge-badge": {
      backgroundColor: "#ff5252", 
            color: "white",       
    },
}}
className=' !ml-3 !cursor-pointer'
  onClick={() => setCartOpen(true)}
>
 <ShoppingCartOutlinedIcon />
  </Badge>
  </div>

      <CartProduct open={cartOpen} onClose={() => setCartOpen(false)} />
  </div>
    );
}