import { Drawer, IconButton, Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import CloseIcon from '@mui/icons-material/Close';
import { Link } from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";
import { addToCart, clearCart, decreaseQuantity, removeFromCart } from '../../Featured/CartSlice';
import ArrowUpwardIcon  from '@mui/icons-material/ArrowUpward';
import ArrowDownIcon  from '@mui/icons-material/ArrowDownward';



export default function CartProduct({ open, onClose }) {
 
 
  const cartItems = useSelector((state) => state.CartProducts.items || []);
 const dispatch = useDispatch();

  const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  
  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      <div className="w-[360px] sm:w-[400px] p-4 flex flex-col h-full justify-between">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Shopping Cart ({cartItems.length})</h2>
          <IconButton onClick={onClose}  >
            <CloseIcon />
          </IconButton>
        </div>

        {/* Items */}
        <div className="space-y-3 overflow-y-auto flex-1">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between border-transparent border-b-tertiary border-1 p-2"
            >
              <img loading="lazy"
                src={item.image}
                alt={item.name}
                className="w-16 h-16 object-cover rounded"
              />
              <div className="flex-1 mx-2">
                <Link to={`/card/${item.id}`} onClick= {onClose}>
                <h4 className=" hover:text-secondary text-sm font-medium"> {item.name}</h4>
                </Link>
                <div className="text-sm text-gray-600 flex items-center gap-2 ">
                  <IconButton className='hover:!text-white  !size-[30px] hover:!bg-secondary !text-secondary' onClick={() => dispatch(decreaseQuantity(item.id))}>
                   <ArrowDownIcon />
                   </IconButton>Qty: {item.quantity}
                <IconButton className=' hover:!text-white !size-[30px] hover:!bg-secondary !text-secondary' onClick={() => dispatch(addToCart({id: item.id}))}>
                   <ArrowUpwardIcon /></IconButton></div>
                <p className="text-secondary font-semibold">{(item.price).toLocaleString()}</p>
              </div>
              <IconButton onClick={() => dispatch(removeFromCart(item.id))}>
                <DeleteIcon className="text-gray-500 hover:text-secondary" />
              </IconButton>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="pt-4 border-t border-t-gray-400 mt-4">
          <div className="flex justify-between text-base font-medium mb-2">
            <span>{cartItems.length} item</span>
            <span className="text-secondary text-lg font-bold ">₹{totalPrice.toLocaleString()}</span>
          </div>
          <div className="flex justify-between text-sm text-gray-600 mb-4">
            <Button variant="outlined" onClick={() => dispatch(clearCart())} fullWidth className='hover:!bg-red-700 hover:!text-white  transition-all !duration-100 !font-semibold  !border-red-700 !text-red-700'>Clear</Button>
          </div>
          <div className="flex gap-2">
            <Link to='/CartProductDetails' className=' !w-full'>
            <Button  fullWidth variant="contained" onClick={onClose} className='hover:!bg-black  transition-all !duration-100 !font-semibold  !bg-secondary !text-white'>
            View Cart
            </Button>
            </Link> 
           <Link to={'/Checkout'} className=' !w-full'>
            <Button  fullWidth variant="outlined" onClick={onClose} className='hover:!bg-black  transition-all !duration-100 !font-semibold  hover:!text-white hover:!border-black !border-secondary !text-secondary'>
              Checkout
            </Button>
           </Link>
          </div>
        </div>
      </div>
    </Drawer>
  );
}