import Blog from '../Blog/Blog';
import PopularProduct from '../Product/PopularProduct';
import PopularProductSwipper from '../Product/PopularProductSwipper';
import SwipperSection from '../SwipperSection/SwipperSection';
import SwiperSection3 from '../SwipperSection/SwipperSection3';
import SwipperSection2 from '../SwipperSection/SwipperSection2';
import Section from "../Sections/Section";
import SwiperImage from "../Header/SwipperImage";
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';

export default function Home() {

  return (
<>
       <div className=" py-3 md:py-10 bg-five overflow-hidden">
        <SwiperImage />
        <Section />
      </div>
      
      <div className=" px-2 container mx-auto xl:px-[30px] my-[30px]">
        <div className="my-10">
          <PopularProduct />
        </div>  

        <SwipperSection />

<div className=" w-full md:w-3/4 flex items-center mx-auto justify-between border-2 border-secondary rounded-md px-6 py-5 text-gray-800 my-6">
      {/* Left side - Icon + Text */}
      <div className="flex items-center gap-2 font-semibold text-lg">
        <LocalShippingOutlinedIcon className="!w-10 !h-10 !text-gray-800" />
        FREE SHIPPING
      </div>

      {/* Center text */}
      <div className="text-md text-gray-600">
        Free Delivery Now On Your First Order and over $200
      </div>

      {/* Right side - Price */}
      <div className="font-bold text-lg text-gray-900">- Only $200*</div>
    </div>
        <div className="my-10">
          <SwiperSection3 />
        </div>
  
        <div className="my-10">
          <PopularProductSwipper category="Rating" Name="Highest Rating Products" />
        </div>
         
        <div className="my-10">
          <PopularProductSwipper category="Sales" Name="Highest Sales Products" />
        </div>
        <div>

        <SwipperSection2 />
        </div>
        <div className="my-10">
          <PopularProductSwipper category={2} Name="Electronics" />
        </div>
        <div className="my-10">
          <PopularProductSwipper category={6} Name="Beauty" />
        </div>
        <div className="my-10">
          <PopularProductSwipper category={4} Name="Footwear" />
        </div>

        <div className="my-10 mb-[50px]">
          <Blog />
        </div>
        
     
      </div>
    </>
  );
}

