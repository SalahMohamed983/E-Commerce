import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useState } from 'react';
import { XMarkIcon } from '@heroicons/react/24/solid';
import ZoomImage from '../ExtraComponent/ZoomImage';
import { Rating } from '@mui/material';
import { useDispatch, useSelector} from "react-redux";
import { addToCart } from '../../Featured/CartSlice';
import { Link } from 'react-router-dom';

export default function ProductPopup({ isOpen, onClose, product }) {

  const thumbnails = product.images;
  const dispatch = useDispatch();

  const [CartButton, setCartButton ] = useState(false);
const [mainImage, setMainImage] = useState(thumbnails[0]?.imageUrl);

// const dispatch = useDispatch();
  
const FavoritProduct = useSelector((state) => state.FavoritProducts.Favoritproduct);

  const getDiscountedPrice = (price, discount) =>
    (price - (discount / 100) * price).toFixed(2);

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <div className="fixed inset-0 bg-black  opacity-60 " />

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <Dialog.Panel className="w-full max-w-[1000px] transform rounded-lg bg-white p-6 text-left align-middle shadow-xl transition-all">
              {/* Close button */}
              <div className="flex justify-end">
                <button onClick={onClose}>
                  <XMarkIcon className="h-6 w-6 text-gray-500 hover:text-red-500" />
                </button>
              </div>

              {/* Content */}
              <div className="grid grid-cols-1 md:h-[450px] md:grid-cols-2 gap-6">
                {/* Images */}
                <div className=" flex flex-col items-center ">
                  <div className='w-full h-[200px] md:h-full '>
                  <ZoomImage src={mainImage} alt="product" />
                  </div>
                <div className="flex space-x-2 mt-3">
  {thumbnails.map((img, idx) => (
    <img 
      key={idx}
      src={img.imageUrl}
      onClick={() => setMainImage(img.imageUrl)}
      className={`w-14 h-14 rounded border border-gray-400 cursor-pointer transition duration-200 hover:scale-110 ${
        img.imageUrl === mainImage ? 'ring-2 border-0 !ring-secondary' : ''
      }`}
    />
  ))}
</div>
                </div>

                {/* Info */}
                <div className=' flex flex-col gap-y-4'>
                 <Link to={`/card/${product.id}`}> <h2 className="hoverSec text-xl font-bold mb-2">{product.name}</h2>
</Link>
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="line-through text-gray-400">₹{product.price.toFixed(2)}</span>
                    <span className="text-secondary text-lg font-semibold">₹{(product.price - ((product.discount/100) * product.price)).toFixed(2)}</span>
                    <span className="text-green-600 text-sm">
                      TotalSales: {product.totalSales} Once
                    </span>
                  </div>

                  <p className="text-sm text-gray-700 mb-2">{product.description}</p>
                    <Rating value={product.stars} readOnly />
                  <p className="text-sm text-gray-500">
                    Free Shipping (Est. Delivery Time 2-3 Days)
                  </p>

                  <div className="mt-4 flex gap-3 flex-wrap">
                    <button onClick={() =>{setCartButton(true)
                       dispatch(addToCart({
      id: product.id,
      quantity: 1,
      name: product.name,
      price: getDiscountedPrice(product.price, product.discount),
      discount: product.discount,
      image: product.images[0]?.imageUrl,
      rate: product.stars,
      desc: product.description
    }))                    }} className={`${CartButton ? 
                      'bg-black text-white': 'bg-secondary text-white hover:bg-black duration-300' } rounded px-4 py-2`}>
                      ADD TO CART
                    </button>
                    <button className="border px-4 py-2 rounded hover:bg-gray-100">
                      Add to Wishlist
                    </button>
                    <button className="border px-4 py-2 rounded hover:bg-gray-100">
                      Add to Compare
                    </button>
                  </div>
                </div>
              </div>
            </Dialog.Panel>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}