import { createSlice } from "@reduxjs/toolkit";

// قراءة البيانات من localStorage لو موجودة
const savedCart = JSON.parse(localStorage.getItem("cart")) || [];

const CartProductSlice = createSlice({
  name: "cart",
  initialState: {
    items: savedCart, // نبدأ باللي متخزن
  },

  reducers: {
    addToCart: (state, action) => {
      const product = action.payload;
      const exist = state.items.find((item) => item.id === product.id);

      
    
  if (exist) {
    // لو المستخدم اختار كمية يدوية
    if (product?.qty) {
      exist.quantity = Number(product.qty);
    } else {
      exist.quantity += 1;
    }}
      else {
    if (product?.qty) 
      state.items.push({ ...product, quantity: Number(product.qty) });
  else   
    state.items.push({ ...product, quantity: 1 });
      }

      localStorage.setItem("cart", JSON.stringify(state.items)); // تحديث localStorage
    },

    removeFromCart: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
      localStorage.setItem("cart", JSON.stringify(state.items));
    },

    decreaseQuantity: (state, action) => {
      const item = state.items.find((i) => i.id === action.payload);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
      } else {
        state.items = state.items.filter((i) => i.id !== action.payload);
      }
      localStorage.setItem("cart", JSON.stringify(state.items));
    },

    clearCart: (state) => {
      state.items = [];
      localStorage.setItem("cart", JSON.stringify(state.items));
    },
  },
});

export const { addToCart, removeFromCart, decreaseQuantity, clearCart } = CartProductSlice.actions;
export default CartProductSlice.reducer;

