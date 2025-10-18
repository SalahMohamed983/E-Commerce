import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


const getAuthHeader = () => {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
};


export const AddOrder = createAsyncThunk(
  "User/AddOrder",
  async (body) => {
    try {
      const response = await axios.post(
        "https://saloshop.runasp.net/api/Order",
body,
 {
        headers: getAuthHeader(),
      }
    );
      return  response.data;
    } catch (error) {
      console.log(error);
      return  "";
    }
  }
);

export const FetchOrder = createAsyncThunk(
  "User/FetchOrder",
  async (id) => {
    try {
      const response = await axios.get(
        `https://saloshop.runasp.net/api/Order/${id}`,
         {
        headers: getAuthHeader(),
      }
    );
      return  response.data;
    } catch (error) {
      console.log(error);
      return  "";
    }
  }
);

const OrderSlice = createSlice({
  name: "Order",
  initialState: {
    Order: [],
    isLoading: false,
  },
  reducers: {},
  
  extraReducers(builder) {
    builder
      // categorySearch
      .addCase(AddOrder.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(AddOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.Order = action.payload;
      })
      .addCase(AddOrder.rejected, (state) => {
        state.isLoading = false;
      })
      // FetchOrder
      .addCase(FetchOrder.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(FetchOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.Order = action.payload;
      })
      .addCase(FetchOrder.rejected, (state) => {
        state.isLoading = false;
      })
    }
});

export default OrderSlice.reducer;


