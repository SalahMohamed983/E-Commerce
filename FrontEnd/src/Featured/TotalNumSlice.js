import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// ============ Total Nums ============
const getAuthHeader = () => {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const TotalNumsData = createAsyncThunk(
  "Num/TotalNums",
  async () => {
    try {
     const response = await axios.get(
        "https://saloshop.runasp.net/api/Products/TotalNum",
         {
        headers: getAuthHeader(),
      }

            );

      return response.data;
    } catch (error) {
      console.log(error);
      return { data: []};
    }
  }
);

const TotalNumSlice = createSlice({
  name: "TotalNum",
  initialState: {
    Num: {}
  },
  reducers: {},
  extraReducers(builder) {
    builder
            .addCase(TotalNumsData.fulfilled, (state, action) => {
        state.Num = action.payload;
      })
          }
});

export default TotalNumSlice.reducer;


