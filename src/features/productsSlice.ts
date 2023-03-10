import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getProducts } from '../api/products';
import { Product } from '../types/Product';
import { UrlParams } from '../types/UrlParams';

type ProductsState = {
  products: Product[];
  isLoading: boolean;
  error: string;
};

const initialState: ProductsState = {
  products: [],
  isLoading: false,
  error: '',
};

export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => ({
        ...state,
        isLoading: true,
      }))
      .addCase(fetchProducts.fulfilled, (state, action) => ({
        ...state,
        products: action.payload,
        isLoading: false,
        error: '',
      }))
      .addCase(fetchProducts.rejected, (state) => ({
        ...state,
        isLoading: false,
        error: 'Products have not been loaded. Try again later.',
      }));
  },
});

export default productsSlice.reducer;

export const fetchProducts = createAsyncThunk<Product[], UrlParams | undefined>(
  'products/fetch',
  (params = {}) => {
    return getProducts(params);
  }
);
