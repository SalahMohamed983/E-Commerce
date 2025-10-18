// import BasicRating from "./BasicRating";
import { Button, Rating, IconButton } from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import { Avatar, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import ZoomImage from '../ExtraComponent/ZoomImage';
// import PopularProductSwipper from './PopularProductSwipper';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { fetchProductById } from '../../Featured/ProductSlice';
import { AddReviews, fetchReviews } from '../../Featured/ReviewRatingSlice';
import { addToCart } from '../../Featured/CartSlice';
import PopularProductSwipper from './PopularProductSwipper';
import { AddFavoritProduct, fetchFavoritProduct, RemoveFavoritProduct } from '../../Featured/FavoritProducts';
import { useToast } from '../ExtraComponent/ToastContext';

const CardDetails = () => {
  
  const [ReviewRating, setNewReview] = useState({
    review: '',
    rating: 0
  });
  
  const { id } = useParams();
  const dispatch = useDispatch();


  const product = useSelector((state) => {
    return state.Products.productsByCategory[`id-${id}`] || [];
  });

  const Reviews = useSelector((state) => {
    return state.ReviewsRatings.Reviews || [];
  });


useEffect(() => {

  dispatch(fetchProductById(id));

const params = {
  productId:  id,
  section: 1,
  reviewsPerSection: 111
}
dispatch(fetchReviews(params));

}, [])

  const userData = useSelector((state) => state.Users.User || null);

const thumbnails = product.images ?? [];

const favoritProducts = useSelector((state) => state.FavoritProducts.Favoritproduct);
const isFavorited = favoritProducts.some((item) => item.productId === product.id);

  const { showHideToast } = useToast();

const handleToggleFavorite = async () => {
 if(!userData)
  showHideToast("You Must Login First");
else
{
  if (isFavorited) {
    const favItem = favoritProducts.find((item) => item.productId === product.id);
    if (favItem) {
      await dispatch(RemoveFavoritProduct(favItem.id)); 
      await dispatch(fetchFavoritProduct(userData?.id));
    }
  } else {
    await dispatch(AddFavoritProduct({
      userId: userData?.id,
      productId: product.id,
    }));
    await dispatch(fetchFavoritProduct(userData?.id)); 
  }
}
};
const [mainImage, setMainImage] = useState(thumbnails[0]?.imageUrl);

const [numVal, setNumVal] = useState(1);
useEffect(() => {
  if (thumbnails.length > 0) {
    setMainImage(thumbnails[0].imageUrl);
  }
}, [thumbnails]);

    return (
        <div className=' container px-2 mx-auto xl:px-[30px] my-[30px]'>
    <div className="mx-auto flex md:flex-row flex-col py-4 md:gap-20">
      {/* Left: Images */}
      <div className=" w-full md:w-[40%] pt-2 flex md:flex-row flex-col-reverse ">
           <div className="flex md:flex-col space-y-5 mt-4 flex-row justify-center md:gap-0 gap-x-4 md:items-center ">
              {thumbnails.length != 0 && thumbnails.map((img, idx) => (
               <img 
               key={idx}
                 src={img.imageUrl}
                 onClick={() => setMainImage(img.imageUrl)}
                 className={` w-14 h-14 rounded border border-gray-400 cursor-pointer transition duration-200 hover:scale-110 ${
                   img.imageUrl === mainImage ? 'ring-2 border-0 !ring-secondary' : ''
                 }`}
               />
             ))}
                           </div>
        <div className=' w-[100%] h-[410px]' >
 {mainImage && <ZoomImage src={mainImage} alt="product" />}
        </div>

      </div>

      {/* Right: Product Info */}
      <div className="flex-1 space-y-4">
        <h1 className="text-3xl font-semibold">{product.name}</h1>

        <p className="text-sm text-gray-600">Brand: <strong>{product.brandName}</strong></p>
        <p className="text-sm text-gray-600">
          <span className='mr-6'>Is Avaliable: {product.isAvaliable ?<strong className=' text-green-700'> "Yes"</strong>
          :<strong className=' text-red-600'> "Fales"</strong>}</span>
          <span>

  discount: <strong>{product.discount}%</strong>
          </span>
          </p>
 <div className=' flex items-center'>
<Rating value={product.stars || 0} readOnly />
<span className=' ml-5'>Total Sales:<span className=' ml-2 text-lg font-bold text-gray-600 '>{product.totalSales} Once</span> </span>
 </div>
 
        <div className="flex items-center space-x-3">
          <div className=" text-gray-600 text-sm">(16 Reviews)</div>
          <span className="line-through text-gray-400 text-lg">₹{product.price}</span>
          <span className="text-secondary text-2xl font-bold">{(product.price - ((product.discount/100) * product.price)).toLocaleString()}</span>
        </div>

        <p className="text-green-600 font-medium">Available In Stock: {product.quntity} Items</p>

        <p className="text-sm text-gray-700">{product.description}</p>

        <p className="text-sm text-gray-500">
          Free Shipping (Est. Delivery Time 2-3 Days)
        </p>

        {/* Quantity + Button */}
        <div className="flex items-center gap-4">
          <input type="number" min={1} value={numVal} onChange={(e) => setNumVal(Number(e.target.value))}
           defaultValue={1} className="w-16 px-2 py-1 border rounded text-center" /> <Button variant="contained" 
            onClick={() => dispatch(addToCart({qty:numVal, id: product.id, quantity: 1, name: product.name, 
    price: product.price - ((product.discount/100) * product.price),discount: product.discount, image:  product.images[0]?.imageUrl, 
    rate: product.stars, desc: product.description}))}
          className='hover:!bg-black transition-all !duration-100 !font-semibold  !bg-secondary !text-white'>
            ADD TO CART
          </Button>
        </div>

        {/* Wishlist + Compare */}
<div className="flex items-center gap-6 text-sm text-gray-600">
  {/* Wishlist */}
  <div 
    onClick={handleToggleFavorite} 
    className={`flex items-center gap-1 px-3 py-1 rounded-lg cursor-pointer transition`}
  >
    <FavoriteBorderIcon
    className={` 
      ${isFavorited ? "!text-secondary" : " !text-gray-600 hover:!text-secondary "}`}
 fontSize="small" />
    <span>Add to Wishlist</span>
  </div>

  {/* Compare */}
  <div 
    className="flex items-center gap-1 px-3 py-1 rounded-lg cursor-pointer transition 
      hover:text-secondary"
  >
    <CompareArrowsIcon fontSize="small" />
    <span>Add to Compare</span>
  </div>
</div>      </div>

    </div>
            <div className="my-10 w-full md:w-[75%] p-6 shadow-lg shadow-tertiary  rounded-xl">
        <h2 class="text-[16px] lg:text-[20px] font-semibold">Customer questions &amp; answers</h2>
      {/* عرض المراجعات */}
     {Reviews.length !== 0 &&
      <div className="space-y-6 my-10 h-[390px] overflow-auto">
        {Reviews.map((review, index) => (
            <div key={index} className="border-b pb-4 flex justify-between items-start">
            <div className="flex items-start gap-3">
        <Avatar src={review.avterImage}>
  {review.fullName?.charAt(0).toUpperCase()}
</Avatar>

              <div>
                <p className="font-semibold">{review.fullName}</p>
                <p className="text-gray-500 text-sm">{review.dateTime}</p>
              <p className="mt-1 text-sm w-full break-all">{review.reviewText}</p>
              </div>
            </div>
            <Rating value={review.ratingScore || 0} readOnly />
          </div>
        ))}
      </div>}
      {/* إضافة مراجعة جديدة */}
       <div className=' bg-gray-50 my-6 p-5'>

        <h3 className=" text-lg font-semibold mb-5">Add a review</h3>
        <TextField
          fullWidth
          multiline
          label="Write a review..."
          rows={6}
          variant="outlined"
          value={ReviewRating.review}
          onChange={(e) => setNewReview({...ReviewRating, review: e.target.value})}
          className=""
          />
        <div className="flex items-center justify-between mt-3">
       <Rating
  value={ReviewRating.rating}
  onChange={(e, newValue) => setNewReview({...ReviewRating, rating: newValue})}
/>
          <Button
            variant="contained" className=' hover:!bg-black md:!px-16 !px-10 transition-all !duration-100 !font-semibold  !bg-secondary !text-white'          
            disabled={!ReviewRating.rating|| !ReviewRating.review}
            onClick={() => {(!userData)?
  showHideToast("You Must Login First"):
dispatch(AddReviews({reviewText:ReviewRating.review, ratingScore:ReviewRating.rating, userId: userData.id, id:0, productId: product.id, dateTime:  new Date().toISOString()}))
.unwrap()
  .then(() => {
    dispatch(fetchReviews({ productId: product.id, section: 1, reviewsPerSection: 111 }));
  });
  setNewReview({
    review: '',
    rating: 0
  });   
  
}}
            >
            Submit
          </Button>
            </div>
        </div>
      </div>
        <div className="my-10">

{product?.brandId != null && (
  <PopularProductSwipper Name="Related Products" category={product.brandId} />
)}
</div>
</div>
  );
};

export default CardDetails;