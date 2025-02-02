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
    }
  }
});

export const {
  addToWishlistStart,
  addToWishlistSuccess,
  addToWishlistFailure,
  removeFromWishlistSuccess,
  setWishlistItems
} = wishlistSlice.actions;

export default wishlistSlice.reducer; 