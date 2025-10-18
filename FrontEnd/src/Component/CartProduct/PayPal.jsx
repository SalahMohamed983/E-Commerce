import React from "react";
import { PayPalButtons } from "@paypal/react-paypal-js";
import axios from "axios";
export default function PayPal({Amount = "0"}) {
   const createOrder = async (amount) => {
    try {
      const { data } = await axios.post("https://localhost:5187/api/PayPal/create-order", {
        amount : amount, 
      });
      return data.id; 
    } catch (err) {
      console.error(err);
    }
  };

  const onApprove = async (data) => {
    try {
      const res = await axios.post("https://localhost:5187/api/PayPal/capture-order", {
        orderId: data.orderID
      });
      alert("Payment successful ✅");
      console.log("Capture result:", res.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <PayPalButtons
        style={{ layout: "vertical" }}
        createOrder={() =>createOrder(Amount)}
        onApprove={onApprove}
      />
    </div>
  );
}