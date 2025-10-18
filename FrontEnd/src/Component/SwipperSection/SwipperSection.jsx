import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import { Link } from 'react-router-dom';

export default function SwipperSection({ IsALL = true }) {
  let content;

  if (IsALL) {
    content = (
      <>
        <SwiperSlide className="!w-[360px] !h-[220px]">
          <div className="rounded-xl overflow-hidden hoverSix relative">
            <img loading="lazy"
              src="/images/1751598649861_1737020916820_New_Project_52.jpg"
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
             <Link to={`/card/1045`}>
              <div className="underline text-[16px] hoverSec font-[600]">
                SHOP NOW
              </div>
             </Link>
            </div>
          </div>
        </SwiperSlide>
{/*  */}
    
    {/*  */}
        <SwiperSlide className="!w-[360px] !h-[220px]">
          <div className="rounded-xl overflow-hidden hoverSix relative">
            <img loading="lazy"
              src="/images/1741664496923_1737020250515_New_Project_47.jpg"
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
             <Link to={`/card/30`}>
              <div className="underline text-[16px] hoverSec font-[600]">
                SHOP NOW
              </div></Link>
            </div>
          </div>
        </SwiperSlide>

        <SwiperSlide className="!w-[360px] !h-[220px]">
          <div className="rounded-xl overflow-hidden hoverSix relative">
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
        </SwiperSlide>

        <SwiperSlide className="!w-[360px] !h-[220px]">
          <div className="rounded-xl overflow-hidden hoverSix relative">
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
        </SwiperSlide>
      </>
    );
  } else {
    content = (
      <>
        <SwiperSlide className="!w-[360px] !block md:!hidden   !h-[220px]">
          <div className="rounded-xl overflow-hidden hoverSix relative">
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
              </div>
             </Link>
            </div>
          </div>
        </SwiperSlide>

        <SwiperSlide className="!w-[360px] !h-[220px] !block md:!hidden">
          <div className="rounded-xl overflow-hidden hoverSix relative">
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
              </div>
             </Link>
            </div>
          </div>
        </SwiperSlide>
      </>
    );
  }

  return (
    <div className="my-[30px]">
      <Swiper
        modules={[Navigation]}
        spaceBetween={10}
        navigation
        breakpoints={{
          0: {
            slidesPerView: 1, // موبايل شاشة صغيرة
          },
          640: {
            slidesPerView: 2, // تابلت
          },
          1024: {
            slidesPerView: 3, // لابتوب
          },
          1280: {
            slidesPerView: 4, // شاشات كبيرة
          },
        }}
      >
        {content}
      </Swiper>
    </div>
  );
}
