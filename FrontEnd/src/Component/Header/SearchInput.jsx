import {useDispatch} from "react-redux";
import { fetchProduct } from "../../Featured/ProductSlice";
import { useNavigate } from "react-router-dom";
import { IconButton } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import { useState } from "react";


 export default function SearchInput()
 {
      const nav = useNavigate();
    const [searchValue, setSearchValue] = useState()
  const dispatch = useDispatch();
 return(
    <div className=" h-100 bg-white ">

      <div className="flex items-center mt-5 bg-gray-100 rounded-md px-2">  <input 
      value={searchValue}
      onChange={(e) => setSearchValue(e.target.value)} 
      type="search" 
      placeholder="Search for Products..." 
      className="rounded-md w-[550px] bg-gray-100 py-5 pr-1"
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
        </div>
 );
 }