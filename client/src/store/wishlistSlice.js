import { createSlice } from '@reduxjs/toolkit';

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState: {
    items: [],
    loading: false,
    error: null
  },
  reducers: {
    addToWishlistStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    addToWishlistSuccess: (state, action) => {
      state.loading = false;
      state.items.push(action.payload);
    },
    addToWishlistFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    removeFromWishlistSuccess: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload);
    },
    setWishlistItems: (state, action) => {
      state.items = action.payload;
    },
    setWishlistLoading: (state, action) => {
      state.loading = action.payload;
    },
    setWishlistError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    }
  }
});

export const {
  addToWishlistStart,
  addToWishlistSuccess,
  addToWishlistFailure,
  removeFromWishlistSuccess,
  setWishlistItems,
  setWishlistLoading,
  setWishlistError
} = wishlistSlice.actions;

export default wishlistSlice.reducer; 