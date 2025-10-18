import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation"; 
import { Link } from "react-router-dom";

export default function SwipperSection2() {
  return (
    <div className="my-[30px]">
      <Swiper
        spaceBetween={10}
        breakpoints={{
          320: { slidesPerView: 1 }, 
                   640: { slidesPerView: 2 }, 
          1024: { slidesPerView: 3 },
                   1280: { slidesPerView: 4 },
        }}
        className="!mx-0 w-full"
      >
        <SwiperSlide className="!rounded-xl !overflow-hidden !relative !w-[360px] !h-[220px]">
          <Link to={`/card/26`}>
            <img loading="lazy"
              src="/images/1742453755529_1741669087880_banner6.webp"
              className="h-[100%] w-[100%] cursor-pointer transition !hoverSeven duration-300 hover:scale-[1.06] hover:rotate-2"
              alt=""
            />
          </Link>
        </SwiperSlide>

        <SwiperSlide className="!rounded-xl !overflow-hidden !relative !w-[360px] !h-[220px]">
          <Link to={`/ShowProducts/1`}>
            <img loading="lazy"
              src="/images/1741669037986_banner2.webp"
              className="h-[100%] w-[100%] cursor-pointer transition duration-300 !hoverSeven hover:scale-[1.06] hover:rotate-2"
              alt=""
            />
          </Link>
        </SwiperSlide>

        <SwiperSlide className="!rounded-xl !overflow-hidden !relative !w-[360px] !h-[220px]">
          <Link to={`/ShowProducts/5`}>
            <img loading="lazy"
              src="/images/1741669057847_banner5.webp"
              className="h-[100%] w-[100%] cursor-pointer transition duration-300 !hoverSeven hover:scale-[1.06] hover:rotate-2"
              alt=""
            />
          </Link>
        </SwiperSlide>

        <SwiperSlide className="!rounded-xl !overflow-hidden !relative !w-[360px] !h-[220px]">
          <Link to={`/card/33`}>
            <img loading="lazy"
              src="/images/1741669012402_banner1.webp"
              className="h-[100%] w-[100%] cursor-pointer transition duration-300 !hoverSeven hover:scale-[1.06] hover:rotate-2"
              alt=""
            />
          </Link>
        </SwiperSlide>
      </Swiper>
    </div>
  );
}
