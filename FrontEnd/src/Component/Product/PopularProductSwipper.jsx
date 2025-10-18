import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/virtual";
import CardProduct from "./CardProduct";
import { Navigation } from "swiper/modules";
import { Button, Skeleton, Box } from "@mui/material";
import { ArrowRightIcon } from "@heroicons/react/16/solid";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchProduct, fetchProductSalesRating } from "../../Featured/ProductSlice";
import "swiper/css/navigation";
import "../../css/HeaderStyle.css"

export default function  PopularProductSwipper({ children = null, Name, category = "default" }) {
  const dispatch = useDispatch();

  const { productsByCategory, isLoading } = useSelector((state) => state.Products);

  let products;

  if(Name == "Related Products")
    products = productsByCategory[`Brand-${category}`] || [];
 else
  products = productsByCategory[category] || [];

  function Loading() {
   
    switch(category)
    {
   case  "Rating" : {
      dispatch(
        fetchProductSalesRating({
          Page: 1,
          ProPerPage: 20,
          rating: true,
          sales: false,
          category,

        })
      );
    }
    break;
     case  "Sales":
       {
      dispatch(
        fetchProductSalesRating({
          Page: 1,
          ProPerPage: 20,
          rating: false,
          sales: true,
          category,
        })
      );
    }
    break;
    default: {
   if(Name === "Related Products") {
      dispatch(fetchProduct({
        category: null,       // force false
        brand: category,   // use brandId as the key
        page: 1,
        productPerPage: 20,
        search: "",
      }));
    } else {
      dispatch(fetchProduct({
        category,
        page: 1,
        productPerPage: 20,
        brand: null, 
        search: "",
      }))
    }  }}}

  useEffect(() => {
    Loading();
  }, [category, Name]);

  return (
    <>
      {children != null ? (
        children
      ) :(
        <h2 className="text-xl font-bold">{Name}</h2>
      )}

      <div className="my-[30px]">
        {isLoading ? (
          // Skeleton Loading
          <Swiper modules={[Navigation]} navigation  slidesPerView={5} 
  breakpoints={{
    0: {
      slidesPerView: 2, 
    },
    768: {
      slidesPerView: 3, 
    },
    1024: {
      slidesPerView: 4,
    },
    1124: {
      slidesPerView: 5,
    }
  }} spaceBetween={10}>
            {Array.from(new Array(5)).map((_, index) => (
              <SwiperSlide  key={index}>
                <Box sx={{ pt: 0.5 }} className="!w-[190px] md:!w-[280px]">
                  <Skeleton className="!rounded-xl" variant="rectangular"  height={218} />
                  <Skeleton width="80%" />
                  <Skeleton width="30%" />
                  <Skeleton width="60%" />
                  <Skeleton width="90%" height={50} />
                </Box>
              </SwiperSlide>
            ))}
          </Swiper>
        ) : products.length > 0 ? (
          // Render Products
          <Swiper modules={[Navigation]}   
        
 navigation
     slidesPerView={5} 
  breakpoints={{
    0: {
      slidesPerView: 2, 
    },
    768: {
      slidesPerView: 3, 
    },
    1024: {
      slidesPerView: 4,
    },
    1124: {
      slidesPerView: 5,
    }
  }}  spaceBetween={10}>
            {products.map((item) => (
              <SwiperSlide key={item.id}>
                <CardProduct product={item} />
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          // No products found
          <div className="mx-auto w-fit font-bold text-3xl">No Products Found!</div>
        )}
      </div>
    </>
  );
}