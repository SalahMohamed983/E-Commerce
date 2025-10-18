import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const AddUsers = createAsyncThunk(
  "User/AddUsers",
  async (body) => {
    try {
      const response = await axios.post(
        "https://saloshop.runasp.net/api/User",
body
    );
      return  response.data;
    } catch (error) {
      console.log(error);
      return  "";
    }
  }
);
export const UpdateUsers = createAsyncThunk(
  "User/UpdateUsers",
  async (body) => {
    try {
      const token = localStorage.getItem("token");
      
      const response = await axios.put(
        "https://saloshop.runasp.net/api/User",
body,
{headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    );
      return  response.data;
    } catch (error) {
      console.log(error);
      return  "";
    }
  }
);

export const fetchLoginUsers = createAsyncThunk(
  "User/fetchLoginUsers",
  async (params) => {
    try {
      const response = await axios.get(
        "https://saloshop.runasp.net/api/User",
{
  params:
  {
   password: params.password,
   email: params.email
  }
} 
 );
      if (response.data?.accessToken) 
        localStorage.setItem("token", response.data.accessToken);

 return  response.data;
    } catch (error) {
      console.log(error);
      return  "";
    }
  }
);

const savedUser = JSON.parse(localStorage.getItem("User")) || null;

const UserSlice = createSlice({
  name: "User",
  initialState: {
    User: savedUser,
    isLoading: false,
  },
  reducers: {
    addUser: (state, action) => {
      state.User = action.payload;
      localStorage.setItem("User", JSON.stringify(action.payload));
    },
    ChangeUser: (state, action) => {
      state.User = action.payload;
      localStorage.setItem("User", JSON.stringify(action.payload));
    },
    removeUser: (state) => {
      state.User = null;
      localStorage.removeItem("User");
    },
  },
  
  extraReducers(builder) {
    builder
      // categorySearch
      .addCase(AddUsers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(AddUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        // const { data } = action.payload;
        state.User = action.payload;
      })
      .addCase(AddUsers.rejected, (state) => {
        state.isLoading = false;
      })
      //Login
      .addCase(fetchLoginUsers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchLoginUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        // const { data } = action.payload;
        state.User = action.payload;
      })
      .addCase(fetchLoginUsers.rejected, (state) => {
        state.isLoading = false;
      })//Update User
      .addCase(UpdateUsers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(UpdateUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.User = action.payload;
      })
      .addCase(UpdateUsers.rejected, (state) => {
        state.isLoading = false;
      })
    }
});

export const {addUser,removeUser, ChangeUser} = UserSlice.actions; 
export default UserSlice.reducer;


