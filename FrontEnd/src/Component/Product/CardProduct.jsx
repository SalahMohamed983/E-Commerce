import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import FullscreenExitOutlinedIcon from '@mui/icons-material/FullscreenExitOutlined';
import TransformOutlinedIcon from '@mui/icons-material/TransformOutlined';
import IconButton from '@mui/material/IconButton';
import { useState } from "react";
import { Link } from "react-router-dom";
import ProductPopup from '../Popup/ProductPopup';
import { Rating, CardMedia } from '@mui/material';
import { useDispatch, useSelector } from "react-redux";
import { addToCart, decreaseQuantity } from '../../Featured/CartSlice';
import { AddFavoritProduct, fetchFavoritProduct, RemoveFavoritProduct } from '../../Featured/FavoritProducts';
import "swiper/css/navigation";
import "../../css/HeaderStyle.css"
import "../../css/index.css"
import { useToast } from '../ExtraComponent/ToastContext';

export default function CardProduct({ product }) {
  const [imageIndex, setImageIndex] = useState(0);
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.Users.User || null);

  // ✅ المنتج في الكارت
  const cartItem = useSelector((state) =>
    state.CartProducts.items.find((item) => item.id === product.id)
  );

	const { showHideToast } = useToast();


const favoritProducts = useSelector((state) => state.FavoritProducts.Favoritproduct);
const isFavorited = favoritProducts.some((item) => item.productId === product.id);

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

  const getDiscountedPrice = (price, discount) =>
    (price - (discount / 100) * price).toFixed(2);

  const handleMouseEnter = () => {
    if (product.images.length > 1) {
      setImageIndex(1);
    }
  };

  const handleMouseLeave = () => {
    setImageIndex(0);
  };

  const handleAddToCart = (prod) => {
    dispatch(addToCart({
      id: prod.id,
      quantity: 1,
      name: prod.name,
      price: getDiscountedPrice(prod.price, prod.discount),
      discount: prod.discount,
      image: prod.images[0]?.imageUrl,
      rate: prod.stars,
      desc: prod.description
    }));
  };

  return (
    <div className="card !w-full relative overflow-hidden  bg-white rounded-xl border-gray-200 border-b-[3px] border-[1px] transition-all duration-300">

      {/* Icons */}
      <div className="show-icon-list !space-y-[5px] absolute top-3 right-3 z-20">
       <IconButton
  onClick={handleToggleFavorite}
  aria-label="favorit"
    className={` hover:!bg-secondary hover:!text-white ${isFavorited ? "!bg-secondary !text-white": "!bg-white !text-black"}` }
>
  <FavoriteBorderOutlinedIcon 
    fontSize="small"
  />
</IconButton>
        <IconButton aria-label="fullscreen" className="icon-btn" onClick={() => setOpen(true)}>
          <FullscreenExitOutlinedIcon fontSize="small" />
        </IconButton>
        <IconButton aria-label="transform" className="icon-btn">
          <TransformOutlinedIcon fontSize="small" />
        </IconButton>
      </div>

      {/* Discount badge */}
      {product.discount > 0 && (
        <div className="absolute top-3 text-white z-30 left-3 bg-secondary w-[35px] flex items-center justify-center rounded-lg h-[25px] text-[15px]">
          {product.discount}%
        </div>
      )}

      {/* Image */}
      {product.images && product.images.length > 0 ? (
        <CardMedia
          component="img"
          height="200"
          image={product.images[imageIndex]?.imageUrl || "/fallback.png"}
          alt={product.name}
          className="!w-full !h-52 hover:!scale-105 !transition-transform !duration-300 !object-fill"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        />
      ) : (
        <div className="h-[208px] flex items-center justify-center bg-gray-100 text-gray-400">
          No Image
        </div>
      )}

      {/* Details */}
      <div className="p-4">
        <h6 className="text-[13px] font-[400]">
          <span className="text-gray-600">{product.name}</span>
        </h6>
        <Link to={`/card/${product.id}`}><h3 className="text-[13px] lg:text-[15px] title mt-1 font-[500] mb-1 text-tetra hoverSec">
          {product.description.slice(0,100)}...
        </h3></Link>
        <Rating value={product.stars} readOnly />

        <div className="flex items-center justify-between mt-2">
          <span className="line-through text-gray-500 text-[12px] lg:text-[14px] font-[500]">
            ₹{product.price.toFixed(2)}
          </span>
          <span className="text-[14px] lg:text-[16px] text-secondary font-[700]">
            ₹{getDiscountedPrice(product.price, product.discount)}
          </span>
        </div>
            </div>

        {cartItem ? (
          <div className="flex items-center overflow-hidden justify-between m-3 border-five border  rounded-3xl transition duration-400 gap-3">
            <button
              onClick={() => dispatch(decreaseQuantity(product.id))}
              className="px-3 py-1 bg-[#d9dee3] text-lg font-bold"
            >
              <RemoveIcon />
            </button>
            <span className="text-[16px] font-bold">{cartItem.quantity}</span>
            <button
              onClick={() => handleAddToCart(product)}
              className="px-3 text-white py-1 text-lg font-bold !bg-[#112841]"
            >
              <AddIcon />
            </button>
          </div>
        ) : (
          <div className=' p-3'>
          <button
            onClick={() => handleAddToCart(product)}
            className="w-full border-secondary border
             text-secondary hover:text-white py-2 rounded-md
              hover:bg-secondary transition duration-400 flex items-center justify-center gap-2"
          >
            <ShoppingCartOutlinedIcon />
            Add to Cart
          </button></div>
        )}
      {/* Popup */}
      <ProductPopup isOpen={open} onClose={() => setOpen(false)} product={product} />
    </div>
  );
}
