import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const getAuthHeader = () => {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
};


export const fetchAddress = createAsyncThunk(
  "Address/fetchAddress",
  async (id) => {
    try {
      const response = await axios.get(
        `https://saloshop.runasp.net/api/Address/${id}`,
    {
        params: {
            id
          },
          headers: getAuthHeader(),
    });

      return  response.data;
    } catch (error) {
      console.log(error);
      return  [];
    }
  }
);


export const AddAddress = createAsyncThunk(
  "Address/AddAddress",
  async (body) => {
    try {
      const response = await axios.post(
        "https://saloshop.runasp.net/api/Address",
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


export const UpdateAddress = createAsyncThunk(
  "Address/UpdateAddress",
  async (body) => {
    try {
      const response = await axios.put(
        "https://saloshop.runasp.net/api/Address",
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

export const DeleteAddress = createAsyncThunk(
  "Address/DeleteAddress",
  async (id) => {
    try {
      const response = await axios.delete(
        `https://saloshop.runasp.net/api/Address/${id}`,
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


const AddressSlice = createSlice({
  name: "Address",
  initialState: {
    Address: [], // هنا بنخزن كل category لوحده
    isLoading: false,
  },
  reducers: {},
  extraReducers(builder) {
    builder
      // get 
      .addCase(fetchAddress.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAddress.fulfilled, (state, action) => {
        state.isLoading = false;
        state.Address = action.payload;
      })
      .addCase(fetchAddress.rejected, (state) => {
        state.isLoading = false;
      })
      // add
      .addCase(AddAddress.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(AddAddress.fulfilled, (state, action) => {
        state.isLoading = false;
        state.Address.push(action.payload);
      })
      .addCase(AddAddress.rejected, (state) => {
        state.isLoading = false;
      })
      //update
      .addCase(UpdateAddress.pending, (state) => {
          state.isLoading = true;
        })
        .addCase(UpdateAddress.fulfilled, (state, action) => {
            // let address = state.Address.find(addr => addr.id !== action.meta.arg.body.id);
            // address = action.meta.arg.body;
           
            state.isLoading = false;
            state.Address = action.payload;
})
      .addCase(UpdateAddress.rejected, (state) => {
        state.isLoading = false;
      })
      // delete
      .addCase(DeleteAddress.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(DeleteAddress.fulfilled, (state, action) => {
  state.isLoading = false;
  state.Address = state.Address.filter(addr => addr.id !== action.meta.arg);
})
      .addCase(DeleteAddress.rejected, (state) => {
        state.isLoading = false;
      })
    }
});

export default AddressSlice.reducer;


