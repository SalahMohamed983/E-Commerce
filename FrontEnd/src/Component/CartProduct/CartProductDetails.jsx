import { Button, IconButton, Rating } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ProductSummaryDetails from './ProductSummaryDetails';
import {useSelector} from "react-redux";
import { Link } from 'react-router-dom';



export default function CartProductDetails() {

  const productCart = useSelector((state) => state.CartProducts.items);
  
  const subtotal = productCart.reduce((acc, product) => acc + (product.price - ((product.discount/100) * product.price)) * product.quantity, 0);

  return (
    <div className="bg-[#faf5f5] !relative container min-h-screen  py-8 px-5 md:px-[100px] sm:px-[150px]">
      <h2 className="text-2xl font-semibold mb-2">Your Cart</h2>
      <p className="mb-6 text-gray-600">
        There are <span className="text-secondary font-bold">{productCart.length}</span> products in your cart
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Cart Items */}
  <div className="md:col-span-2 space-y-4">
 {productCart.map((item) => (
 <ProductSummaryDetails key={item.id} product={item} />
))}
</div>

        {/* Cart Summary */}
        <div className=" !sticky !top-[160px] leading-7 bg-white p-4 rounded shadow h-fit">
          <h3 className="text-lg font-semibold mb-4">Cart Totals</h3>
                <hr className=' pb-4 text-tertiary '/>
          <div className="flex justify-between mb-2">
            <span>Subtotal</span>
            <span className="font-semibold text-secondary">₹{subtotal.toLocaleString()}</span>
          </div>
          <div className="flex justify-between mb-2">
            <span>Shipping</span>
            <span className="text-green-600 font-medium">Free</span>
          </div>
          <div className="flex justify-between mb-2">
            <span>Estimate for</span>
            <span>ti</span> {/* Placeholder */}
          </div>

          <div className="flex justify-between mt-4 text-lg font-semibold">
            <span>Total</span>
            <span className="text-secondary">₹{subtotal.toLocaleString()}</span>
          </div>
           <Link to={'/Checkout'}>
          <Button
            variant="contained"
            color="error"
            fullWidth
            className="hover:!bg-black  transition-all !duration-100 !text-white !mt-5 !font-semibold !bg-secondary"
            >
            CHECKOUT
          </Button>
            </Link>
        </div>
      </div>
    </div>
  );
}