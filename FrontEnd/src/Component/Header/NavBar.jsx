import { Link } from "react-router-dom";
import NavDropdown from "./NavDropdown";
import Sidebar from "./Sidebar";
import RocketLaunchOutlinedIcon from '@mui/icons-material/RocketLaunchOutlined';

export default function NavBar()
{

    return(
        <nav className="py-3 flex justify-between items-center  ">
       <div className=" md:block hidden">
        <Sidebar  />

       </div>
           <div className=" md:overflow-visible overflow-y-hidden hide-scrollbar space-x-4 md:space-x-4  flex md:justify-between items-center md:w-1/2">
            <Link to={"/"} ><h3 className="hoverSec text-[16px] font-[500]">Home</h3></Link>
            <NavDropdown num={1} arr={[{id:1, name: "Women"}, {id:2, name: "Men"}]}  Name="Fashion"/>
            <NavDropdown num={2} arr={[{id:3, name: "Phone"},{id:4, name: "LapTop"},{id:15, name: "Watches"}]} Name="Electronics"/>
            <NavDropdown num={3} arr={[{id:5, name: "Women Bags"},{id:6, name: "Men Bags"}]} Name="Bags"/>
            <NavDropdown num={4} arr={[{id:7, name: "Women Footwear"},{id:8, name: "Men Footwear"}]}  Name="Footwear"/>
            <Link to={`/ShowProductsBrand/9`}><h3 className="hoverSec text-[16px] font-[500]">Groceries</h3></Link>
            <Link to={`/ShowProductsBrand/10`}><h3 className="hoverSec text-[16px] font-[500]">Beauty</h3></Link>
            <Link to={`/ShowProductsBrand/13`}><h3 className="hoverSec text-[16px] font-[500]">Jewellery</h3></Link>
           </div>
           <div>
 <h3 className="md:flex items-center hidden"> <RocketLaunchOutlinedIcon className=" text-primary"/> 
  <span className="ml-2"> Free International Delivery </span>
</h3>
           </div>
        </nav>
    );
}