import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  products: [],
  selectedProduct: null,
  loading: false,
  error: null
};

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    fetchProductsStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchProductsSuccess: (state, action) => {
      state.loading = false;
      state.products = action.payload;
    },
    fetchProductsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    setSelectedProduct: (state, action) => {
      state.selectedProduct = action.payload;
    },
    addProduct(state, action) {
      state.products.push(action.payload);
    },
    removeProduct(state, action) {
      state.products = state.products.filter(product => product.id !== action.payload);
    },
  }
});

export const { 
  fetchProductsStart, 
  fetchProductsSuccess, 
  fetchProductsFailure,
  setSelectedProduct,
  addProduct,
  removeProduct
} = productSlice.actions;

export default productSlice.reducer; 