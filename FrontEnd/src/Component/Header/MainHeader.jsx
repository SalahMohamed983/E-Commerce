import TopHeader from "./TopHeader";
import Header from "./Header";
export default function MainHeader()
{
return(
<>
<div className=" container py-2 xl:px-[30px] mx-auto">
                         <TopHeader />
             </div>
     <div className='!sticky shadow-sm shadow-gray-200  top-0 z-50 bg-five '>
     <Header/>
       </div> 
</>
);
}