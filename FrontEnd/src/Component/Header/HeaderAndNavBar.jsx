import BottomHeader from "./BottomHeader"
import NavBar from "./NavBar"

export default function HeaderAndNavbar()
{
    
    return(
        <>
        <hr className="hidden md:block text-tertiary" />
                <div className=" bg-white container px-2 xl:px-[30px] mx-auto">
 <BottomHeader />
        <hr className="text-tertiary" />
                <div className="container xl:px-[30px] px-2 mx-auto">
        <NavBar />
        </div>
        </div>
        </>
    );
}