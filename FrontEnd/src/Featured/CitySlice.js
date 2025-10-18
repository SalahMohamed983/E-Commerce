import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// ============ Total Nums ============

const getAuthHeader = () => {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const CityData = createAsyncThunk(
  "City/CityData",
  async () => {
    try {
     const response = await axios.get(
        "https://saloshop.runasp.net/api/City"
        ,
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

const CitySlice = createSlice({
  name: "City",
  initialState: {
    City: []
  },
  reducers: {},
  extraReducers(builder) {
    builder
            .addCase(CityData.fulfilled, (state, action) => {
        state.City = action.payload;
      })
          }
});

export default CitySlice.reducer;


