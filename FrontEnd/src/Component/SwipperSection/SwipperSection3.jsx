import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from 'swiper/modules';

import { Swiper, SwiperSlide } from 'swiper/react';
import { motion } from "framer-motion";

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import '/src/css/HeaderStyle.css'
import SwipperSection from './SwipperSection';
import { Link } from 'react-router-dom';
import "../../css/HeaderStyle.css"
export default function SwiperSection3()
 {
  return (
   <div className=' flex md:flex-row  flex-col items-center justify-between'>

    <Swiper  
    className=' !select-none custom-swiper !mx-0 w-full md:w-[70%] mt-2 md:h-[460px] h-60'
      // install Swiper modules
      loop={true}
      modules={[Autoplay, Navigation, Scrollbar, A11y, Pagination]}
      
      autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
    
      spaceBetween={0}
      slidesPerView={1}
      navigation
      pagination
    //   onSwiper={(swiper) => console.log(swiper)}
      // onSlideChange={() => console.log('slide change')}
    > 
    {["/images/1742439896581_1737036773579_sample-1.jpg", "/images/1742441193376_1737037654953_New_Project_45.jpg"].map((ele, idx) => (  <SwiperSlide key={idx}> 
          <div className="relative w-full h-[500px]">
          
          <img loading="lazy"
               className=' rounded-xl w-[100%]  h-full mx-auto' src={ele} alt="" />
            <div className="absolute md:top-20 top-7 md:right-10 right-4 w-1/2 flex flex-col justify-center items-start px-10 text-white">
                      
            <motion.div initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    viewport={{ once: false }}
                    className="">
                  <h2  className=" text-secondary md:text-3xl text-sm font-bold mb-2"
              >
           Buy New Trend Women Black Cotton Blend Top | top for women
              </h2>
          <span className="line-through text-gray-400 md:text-xl mr-4">₹{333}</span>
          <span className="text-secondary md:text-2xl font-bold">₹{(255)}</span>
        </motion.div>

              <motion.p
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                viewport={{ once: false }}
                className=" text-primary max-w-lg mb-4 md:text-lg md:block hidden"
              >For girl's seeking a ethnic set that melds classic charm with a contemporary twist, Trilok Fab flared ethnic gown is a perfect choice. It is designed with both comfort and style in mind.</motion.p>

           <Link to={idx == 1? "/card/26": "/card/1041"}>   <motion.button
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.9 }}
                viewport={{ once: false }}
                className="bg-secondary hover:bg-red-500 px-4 py-1 mt-5 md:mt-auto md:py-2 rounded-lg  md:font-semibold"
              >
                SHOP NOW
              </motion.button></Link>
        </div>
        </div>
        </SwiperSlide> ))}
    </Swiper>
      <div className='w-full md:w-[25%]'>
          <div className='md:block hidden '>

          <div className="!w-[360px] !h-[220px] mb-3  rounded-xl overflow-hidden hoverSix relative">
            <img loading="lazy"
              src="/images/1741663408792_1737020756772_New_Project_1.png"
              className="h-full w-full"
              alt=""
              />
            <div className="absolute leading-8 left-[20px] top-[40px]">
              <h2 className="text-[14px] md:text-[18px] font-[600]">
                Buy women productss
              </h2>
              <span className="text-[20px] text-secondary font-[600] ">
                ₹999
              </span>
     <Link to={`/card/1076`}>
              <div className="underline text-[16px] hoverSec font-[600]">
                SHOP NOW
              </div></Link>
                  </div>
          </div>

          <div className="rounded-xl overflow-hidden hoverSix !w-[360px] !h-[220px]  relative">
            <img loading="lazy"
              src="/images/1741664665391_1741497254110_New_Project_50.jpg"
              className="h-full w-full"
              alt=""
              />
            <div className="absolute leading-8 right-[20px] top-[40px]">
              <h2 className="text-[14px] md:text-[18px] font-[600]">
                Buy women productss
              </h2>
              <span className="text-[20px] text-secondary font-[600] ">
                ₹999
              </span>
<Link to={`/card/1097`}>
              <div className="underline text-[16px] hoverSec font-[600]">
                SHOP NOW
              </div></Link>
            </div>
          </div>
              </div>
   <div className=' md:hidden block'>

   <SwipperSection IsALL= {false} />
   </div>
   
    </div>
          </div>
  );
};