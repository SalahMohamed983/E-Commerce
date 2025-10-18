import { Navigation, Scrollbar, A11y, Autoplay } from 'swiper/modules';

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import '/src/css/HeaderStyle.css'

export default function SwiperImage()
 {
  return (
    <Swiper  
    className=' !select-none h-[250px] md:h-[450px]'
      // install Swiper modules
      loop={true}
      modules={[Autoplay, Navigation, Scrollbar, A11y]}
      
      autoplay={{
        delay: 2500,
        disableOnInteraction: false,
      }}
      spaceBetween={40}
      slidesPerView={1}
      navigation
      onSwiper={(swiper) => console.log(swiper)}
      // onSlideChange={() => console.log('slide change')}
    >
      <SwiperSlide><img   className=' rounded-[20px]  md:rounded-[60px] w-[92%] h-full mx-auto' src="/images/slideBanner1.jpg" alt=""/></SwiperSlide> 
       <SwiperSlide><img  className=' rounded-[20px]  md:rounded-[60px] w-[92%] h-full mx-auto' src="/images/slideBanner2.jpg" alt=""/></SwiperSlide>
       <SwiperSlide><img  className=' rounded-[20px]  md:rounded-[60px] w-[92%] h-full mx-auto' src="/images/1751685144346_NewProject(11).jpg" alt=""/></SwiperSlide>
       <SwiperSlide><img  className=' rounded-[20px]  md:rounded-[60px] w-[92%] h-full mx-auto' src="/images/slideBanner2.jpg" alt=""/></SwiperSlide>
       <SwiperSlide><img  className=' rounded-[20px]  md:rounded-[60px] w-[92%] h-full mx-auto' src="/images/1751685130717_NewProject(8).jpg" alt=""/></SwiperSlide>
       <SwiperSlide><img  className=' rounded-[20px]  md:rounded-[60px] w-[92%] h-full mx-auto' src="/images/1755503364377_1721277298204_banner.jpg" alt=""/></SwiperSlide>
    </Swiper>
  );
};