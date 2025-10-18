import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// ============ Fetch By Category / Brand ============
const getAuthHeader = () => {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const fetchProduct = createAsyncThunk(
  "Product/fetchProduct",
  async (body) => {
    try {
      const response = await axios.put(
        "https://saloshop.runasp.net/api/Products/Search",
        body
      );

      let key;
      if (body.search && body.search.trim() !== "") {
        key = "search";   // مفتاح خاص بالبحث
      }
      else if(body.brand !== null){
        key =  `Brand-${body.brand}`;
      }
       else
         key = body.category; 
       
      return { data: response.data, category: key };
    } catch (error) {
      console.log(error);
      return { data: [], category: "default" };
    }
  }
);// ============ delete ============
export const deleteProduct = createAsyncThunk(
  "Product/deleteProduct",
  async (id) => {
    try {
     const response = await axios.delete(
        `https://saloshop.runasp.net/api/Products/${id}`,
        {
          headers: getAuthHeader()
        }
            );

      return response.data;
    } catch (error) {
      console.log(error);
      return { data: []};
    }
  }
);
// ============ Filter By Category / stars ============
export const filterProduct = createAsyncThunk(
  "Product/filterProduct",
  async (body) => {
    try {
      const response = await axios.put(
        "https://saloshop.runasp.net/api/Products/Filter",
        body.body
      );
      // استخدم ?? عشان 0 ما يعتبرش falsy

      return { data: response.data, category: body.categoryPara };
    } catch (error) {
      console.log(error);
      // لو حصل خطأ، برضه استخدم نفس المنطق (ولو الاتنين فاضيين حط default)
      return { data: [], category: 2 };
    }
  }
);
// ============ Fetch Rating / Sales ============
export const fetchProductSalesRating = createAsyncThunk(
  "Product/fetchProductSalesRating",
  async (params) => {
    try {
      const response = await axios.get(
        "https://saloshop.runasp.net/api/Products/MostRatingSales",
        {
          params: {
            Page: params.Page,
            ProPerPage: params.ProPerPage,
            rating: params.rating,
            sales: params.sales,
          },
        }
      );
      return { data: response.data, category: params.category };
    } catch (error) {
      console.log(error);
      return { data: [], category: params.category };
    }
  }
);

// ============ Fetch By ID ============
export const fetchProductById = createAsyncThunk(
  "Product/fetchProductById",
  async (id) => {
    try {
      const response = await axios.get(`https://saloshop.runasp.net/api/Products/${id}`, {
        params: { id }});
      return { data: response.data, category: `id-${id}` };
    } catch (error) {
      console.log(error);
      return { data: [], category: `id-${id}` };
    }
  }
);
 // ============ Add By ID ============
export const AddProducts = createAsyncThunk(
  "Product/AddProduct",
  async (body) => {
    try {
      const res = await axios.post(`https://saloshop.runasp.net/api/Products`, body.body,
        {
          headers: getAuthHeader()
        }
      );
      const productId = res.data; // int

      if (body.images && body.images.length > 0) {
        const formData = new FormData();
        body.images.forEach((img) => formData.append("files", img));

        await axios.post(
          `https://saloshop.runasp.net/api/Products/${productId}/upload-images`,
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );
      }

      return { data: res.data, category: "success" };
    } catch (error) {
      console.log(error.response?.data || error.message);
      return { data: [], category: `id-error` };
    }
  }
);
const initialState = {
  productsByCategory: {},
  isLoading: false,
  categoryPara: null,
  filter: {
    SortProduct: 0,
    Category: [],
    Star: 0,
    MaxPrice: 0,
    MinPrice: 0,
    Page: 1,
    ProductPerPage: 111,
    Search: "",
  },
};

const ProductSlice = createSlice({
  name: "Product",
  initialState,
  reducers: {
    GetParaGategory: (state, action) =>
    {
      state.categoryPara = action.payload;
    },
     setFilter: (state, action) => {
      state.filter = { ...state.filter, ...action.payload };
    },
    resetFilter: (state) => {
      state.filter = initialState.filter;
    },
  },
  extraReducers(builder) {
    builder
      // category/brand search
      .addCase(fetchProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        const { category, data } = action.payload;
        state.productsByCategory[category] = data;
      })
      .addCase(fetchProduct.rejected, (state) => {
        state.isLoading = false;
      })

      // rating/sales
      .addCase(fetchProductSalesRating.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchProductSalesRating.fulfilled, (state, action) => {
        state.isLoading = false;
        const { category, data } = action.payload;
        state.productsByCategory[category] = data;
      })
      .addCase(fetchProductSalesRating.rejected, (state) => {
        state.isLoading = false;
      })

      // by id
      .addCase(fetchProductById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.isLoading = false;
        const { category, data } = action.payload;
        state.productsByCategory[category] = data;
      })
      .addCase(fetchProductById.rejected, (state) => {
        state.isLoading = false;
      })
     // by filter
      .addCase(filterProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(filterProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        const { category, data } = action.payload;
        state.productsByCategory[category] = data;
      })
      .addCase(filterProduct.rejected, (state) => {
        state.isLoading = false;
      })
      // ......................///
      .addCase(AddProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(AddProducts.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(AddProducts.rejected, (state) => {
        state.isLoading = false;
      })
        // ......................///
      .addCase(deleteProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(deleteProduct.rejected, (state) => {
        state.isLoading = false;
      });
    },
});

export default ProductSlice.reducer;
export const {GetParaGategory, setFilter, resetFilter } = ProductSlice.actions;