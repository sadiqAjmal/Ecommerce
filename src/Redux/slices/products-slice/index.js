import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
export const updateProduct = createAsyncThunk(
  "product/update",
  async ({ formData, API_URL, token }) => {
    try {
      const response = await axios.put(API_URL, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);
export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async ({ sortBy, skip, limit,find }, { dispatch, rejectWithValue }) => {
    try {
      const response = await axios.get('http://localhost:5000/v1/prod/', {
        params: {
          sortBy,
          skip,
          limit,
          find,
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
const initialState = {
    sortBy: { createdAt: -1 }, 
    products: [],
    count:0,
    find:"",
    success:false,
    failed:false,
    pending:false,
    updatePending:false,
    updateFailed:false,
    updateSuccess:false,
};
export const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setFind:(state,action)=>{
      state.find=action.payload;
    },
    resetFind:(state)=>
    {
      state.find="";
    },
    updateProducts: (state, action) => {
      state.products = action.payload;
    },
    updateSort: (state, action) => {
      state.sortBy = action.payload;
    },
    updateCount:(state,action)=>{
      state.count=action.payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.products = action.payload.products;
      state.count=action.payload.count;
      state.pending=false;
      state.success=true;
      state.failed=false;
    });
    builder.addCase(fetchProducts.rejected, (state) => {
      state.pending=false;
      state.success=false;
      state.failed=true;
    });
    builder.addCase(fetchProducts.pending, (state) => {
      state.pending=true;
      state.success=false;
      state.failed=false;
    })
    builder.addCase(updateProduct.pending, (state) => {
      state.updatePending = true;
      state.updateFailed = false;
      state.updateSuccess=false;
    })
    builder.addCase(updateProduct.fulfilled, (state) => {
      state.updatePending= false;
      state.updateFailed = false;
      state.updateSuccess=true;
    })
    builder.addCase(updateProduct.rejected, (state, action) => {
      state.updatePending = false;
      state.updateFailed = true;
      state.updateSuccess=false;
    });
  },
});
export const { updateProducts, updateSort,updateCount,setFind,resetFind,setIsSearching, resetSearchCount,resetSearchProducts} = productSlice.actions;
export default productSlice.reducer;
