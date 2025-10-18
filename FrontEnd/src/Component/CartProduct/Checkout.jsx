import React, { useEffect, useState } from "react";
import { Button, Card, CardContent, Typography } from "@mui/material";
import { Radio } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { fetchAddress } from "../../Featured/AddressSlice";
import Address from "../ProfileAndDetails/Address";
import { Link } from "react-router-dom";
import { AddOrder } from "../../Featured/OrderSlice";
import PayPal from "./PayPal";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import { useToast } from "../ExtraComponent/ToastContext";



export default function Checkout() {
  
  const products = useSelector((state) => state.CartProducts.items || []);

  const dispatch = useDispatch();
  const userData = useSelector((state) => state.Users.User || null);
  
    const { showHideToast } = useToast();
  

  useEffect(() => {
    
   dispatch(fetchAddress(Number(userData?.id)))
   
  }, [])
  

const productsCheckout = products.map((ele) =>{
return {productId: ele.id, buyQuantity: ele.quantity, priceOfPice: ele.price}
})


  const subtotal = products.
  reduce((acc, product) => acc + (product.price - ((product.discount/100) * product.price)) * product.quantity, 0).toFixed();


  const addresses = useSelector((state) => {
    return state.Addresses.Address || [];
  });

  const [selectedAddress, setSelectedAddress] = useState(addresses[0]?.id || 0);
  const [cartOpen, setCartOpen] = useState(false);

function OrderHandle()
{
  if (!userData)
      showHideToast("You Must Login First")
    else
      {
        dispatch(AddOrder({
          userId: userData?.id,
          paymentId: null,
          orderDateandTime: "2025-09-13T10:01:54.287Z",
          addressId: selectedAddress,
          products: productsCheckout
        }))
        
        showHideToast("Order Added Successfully")
  }      
}

  return (
    <div className="bg-[#faf5f5] !relative container py-8 md:px-[100px] sm:px-[150px]">
   <div className="flex flex-col md:flex-row gap-4 p-6 ">
      {/* Addresses */}
      <div className=" h-fit bg-white rounded-lg shadow p-4 w-full md:w-[87%]">
        <div className="flex justify-between items-center mt-3 mb-8">
          <h2 className="font-bold text-lg">Select Delivery Address</h2>
          <Button variant="outlined" size="small" onClick={() => {(!userData) ?
    showHideToast("You Must Login First") : setCartOpen("Add")}}>+ ADD NEW ADDRESS</Button>
        </div>
            <Address open={cartOpen} address={cartOpen != "Add"&& addresses.find((ele) => ele.id == selectedAddress)} onClose={() => setCartOpen(false)} />
            
      
        <div className="space-y-4">
          {addresses.map((address) => (
            <Card
              onClick={() => setSelectedAddress(address.id)}
              key={address.id}
              className={` cursor-pointer border ${selectedAddress === address.id ? "!border-red-400 !bg-red-50" : "border-0"}`}
            >
              <CardContent  className="flex items-start gap-3">
                <Radio
                  checked={selectedAddress === address.id}
                  color="error"
                />
                <div className="flex-1">
                  <span className="bg-gray-100 text-xs px-2 py-1 rounded">{address.addressType? "Home" :"Oficee"}</span>
                  <Typography variant="subtitle1" fontWeight="bold">{address.fullName}</Typography>
                  <Typography variant="body2">{address.street}</Typography>
                  <Typography variant="body2" className="text-gray-600">{address.phoneNum}</Typography>
                </div>
                <Button size="small" onClick={() => setCartOpen(true)}>EDIT</Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Order Summary */}
      <div className="  !sticky !top-[160px] bg-white rounded-lg shadow p-4 w-full md:w-1/2">
        <h2 className="font-bold text-lg my-2">Your Order</h2>
        <hr className=" text-tertiary" />
        <div className=" flex justify-between items-center">
        <h2 className="font-bold text-lg my-2">Your Product</h2>
         <div className=" text-secondary  text-lg font-semibold">
            ₹{subtotal.toLocaleString()}
          </div>
        </div>
        <hr className=" text-tertiary mb-5" />

        <div className="max-h-64 overflow-y-auto pr-2">
          {products.map((product) => (
            <div key={product.id} className="flex justify-between items-center mb-3">
              <div className="flex items-center gap-2">
                <img loading="lazy" src={product.image} alt={product.name} className="w-10 h-10 object-cover" />
                <div>
                 <Link to={`/card/${product.id}`}> <Typography variant="body2" className=" hoverSec font-medium">{product.name}</Typography>
                 </Link> <Typography variant="body2" className="text-gray-500">Qty: {product.quantity}</Typography>
                </div>
              </div>
              <Typography variant="body2">₹{product.price}</Typography>
            </div>
          ))}
        </div>

        {/* Buttons */}
        <div className="!mt-6 !space-y-3">
   {userData&&
     <PayPalScriptProvider options={{ "client-id": "ATtglIiaUpILT01r95oMxGr0sbxBLb0xwe1gpMy_-E-oUqslEvBZgVF-zDn0zW09zNozqDNIFeeZvGRP" }}> 
    <PayPal Amount={subtotal.toString()}/>
           </PayPalScriptProvider> 
       }
          <Button
            className="!py-2"

            fullWidth
            variant="contained"
            style={{ backgroundColor: "#1f1f1f", color: "#fff" }}
          onClick={OrderHandle}
         >
            CASH ON DELIVERY
          </Button>
        </div>
      </div>
    </div>
    </div>
  );
}