import CloseIcon from '@mui/icons-material/Close';
import { Button, IconButton, Rating } from '@mui/material';
import { Link } from 'react-router-dom';
import {  useDispatch } from "react-redux";
import { removeFromCart } from '../../Featured/CartSlice';
import { RemoveFavoritProduct } from '../../Featured/FavoritProducts';


 export default function ProductSummaryDetails({product, IsCart = true})
 {

  const dispatch = useDispatch();

    return(
              
            <div key={product.id} className="flex  items-start bg-white p-4 rounded shadow relative">
              <img loading="lazy" src={IsCart? product?.image :product?.images[0]?.imageUrl} alt={product.name} className="w-30 h-33 object-cover rounded" />
              <div className="ml-4 flex-1">
               <Link to={`/card/${IsCart? product.id: product.productId}`}> <p className=" hoverSec text-lg font-semibold">{product.name}</p>
</Link>
                <div className="flex items-center gap-2 mt-1">
                  <Rating value={IsCart? product.rate || 0 : product.stars || 0} readOnly size="medium" />
                </div>

                <div className="mt-2 text-sm">
                  <span className="font-medium">Qty:</span>
                  <span className="ml-1"> {product.quantity}</span>

                <div className="mt-2">
                  <span className="font-bold text-base text-secondary">₹{product.price}</span>
                  <span className="line-through ml-2 text-gray-500 text-sm">₹{product.price}</span>
                  <span className="ml-2 text-sm text-orange-500">{product.discount}% OFF</span>
                </div>
                </div>
              </div>

              <IconButton className="absolute top-2 right-2" onClick={() => IsCart? dispatch(removeFromCart(product.id)): dispatch(RemoveFavoritProduct(product.id))}>
                <CloseIcon />
              </IconButton>
            </div>


    );
 }