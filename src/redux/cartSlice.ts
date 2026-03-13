import { createSlice } from '@reduxjs/toolkit';
import type { ICartItem } from '../utils/interfaces';

interface CartState {
  items: ICartItem[];
}

const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setCartAC: (state, action: { payload: ICartItem[] }) => {
      state.items = action.payload;
    },
  },
});

export const { setCartAC } = cartSlice.actions;
export default cartSlice.reducer;
