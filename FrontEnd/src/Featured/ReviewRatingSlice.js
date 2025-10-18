import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const getAuthHeader = () => {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const fetchReviews = createAsyncThunk(
  "Review/fetchReviews",
  async (params) => {
    try {
      const response = await axios.get(
        "https://saloshop.runasp.net/api/RatingAndReview",
{
    params: {
     productId: params.productId,
       section: params.section,
 reviewsPerSection: params.reviewsPerSection
    }
}
    );
      return  response.data;
    } catch (error) {
      console.log(error);
      return  [];
    }
  }
);


export const AddReviews = createAsyncThunk(
  "Review/AddReviews",
  async (body) => {
    try {
      const response = await axios.post(
        "https://saloshop.runasp.net/api/RatingAndReview",
body,
 {
        headers: getAuthHeader(),
      }

      );
      return  response.data;
    } catch (error) {
      console.log(error);
      return  [];
    }
  }
);


const ReviewSlice = createSlice({
  name: "Review",
  initialState: {
    Reviews: [], // هنا بنخزن كل category لوحده
    isLoading: false,
  },
  reducers: {},
  extraReducers(builder) {
    builder
      // get 
      .addCase(fetchReviews.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchReviews.fulfilled, (state, action) => {
        state.isLoading = false;
        // const { data } = action.payload;
        state.Reviews = action.payload;
      })
      .addCase(fetchReviews.rejected, (state) => {
        state.isLoading = false;
      })
      // add
      .addCase(AddReviews.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(AddReviews.fulfilled, (state, action) => {
        state.isLoading = false;
        state.Reviews.push(action.payload);
      })
      .addCase(AddReviews.rejected, (state) => {
        state.isLoading = false;
      })
    }
});

export default ReviewSlice.reducer;


