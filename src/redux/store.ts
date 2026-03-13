import { configureStore } from '@reduxjs/toolkit';
import alertSlice from './alertSlice';
import cartSlice from './cartSlice';

export const store = configureStore({
  reducer: {
    alert: alertSlice,
    cart: cartSlice,
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;