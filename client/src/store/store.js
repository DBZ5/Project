import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import productReducer from './productSlice';
import wishlistReducer from './wishlistSlice';
import cartReducer from './cartSlice';
export const store = configureStore({
  reducer: {
    auth: authReducer,
    product: productReducer,
    wishlist: wishlistReducer,
    cart: cartReducer
  },
}); 