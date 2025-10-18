import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const getAuthHeader = () => {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

// ============ Fetch By Category / Brand ============
export const fetchFavoritProduct = createAsyncThunk(
  "FavoritProduct/fetchFavoritProduct",
  async (id) => {
    try {
      const response = await axios.get(
        `https://saloshop.runasp.net/api/FavoritProduct/${id}`,
        {
            params:{
                UserId: id
            },
        headers: getAuthHeader(),
        }
      );

      return response.data ;
    } catch (error) {
      console.log(error);
      return  [];
    }
  }
);

export const AddFavoritProduct = createAsyncThunk(
  "FavoritProduct/AddFavoritProduct",
  async (body) => {
    try {
      const response = await axios.post(
        "https://saloshop.runasp.net/api/FavoritProduct",
      
            body,
             {
        headers: getAuthHeader(),
      }

          
      );

      return response.data ;
    } catch (error) {
      console.log(error);
      return  [];
    }
  }
);


export const RemoveFavoritProduct = createAsyncThunk(
  "FavoritProduct/RemoveFavoritProduct",
  async (Id) => {
    try {
      await axios.delete(
        `https://saloshop.runasp.net/api/FavoritProduct/${Id}`,
         {
        headers: getAuthHeader(),
      }

      );

      return Id ;
    } catch (error) {
      console.log(error);
      return  [];
    }
  }
);


const FavoritProductSlice = createSlice({
  name: "FavoritProduct",
  initialState: {
    Favoritproduct: [],
    isLoading: false,
  },
  reducers: {},
  extraReducers(builder) {
    builder
      // category/brand search
      .addCase(fetchFavoritProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchFavoritProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.Favoritproduct = action.payload;
      })
      .addCase(fetchFavoritProduct.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(AddFavoritProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(AddFavoritProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        console.log(action.payload);
      })
      .addCase(AddFavoritProduct.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(RemoveFavoritProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(RemoveFavoritProduct.fulfilled, (state, action) => {
        state.isLoading = false;
       state.Favoritproduct = state.Favoritproduct.filter((item) => item.id !== action.payload);
      })
      .addCase(RemoveFavoritProduct.rejected, (state) => {
        state.isLoading = false;
      })
    }});


export default FavoritProductSlice.reducer;
