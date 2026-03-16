import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
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
    // Встановлення всього кошика (наприклад, при завантаженні з сервера)
    setCartAC: (state, action: PayloadAction<ICartItem[]>) => {
      state.items = action.payload;
    },

    // Додавання товару
    addToCartAC: (state, action: PayloadAction<ICartItem>) => {
      const existingItem = state.items.find(item => item.product.id === action.payload.product.id);

      if (existingItem) {
        // Якщо товар вже є, збільшуємо його кількість
        existingItem.quantity += action.payload.quantity;
      } else {
        // Якщо товару немає, додаємо новий об'єкт
        state.items.push(action.payload);
      }
    },

    // Видалення товару за ID продукту
    removeFromCartAC: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter(item => item.product.id !== action.payload);
    },

    // Очищення кошика (наприклад, після виходу з акаунта)
    clearCartAC: (state) => {
      state.items = [];
    }
  },
});

export const { setCartAC, addToCartAC, removeFromCartAC, clearCartAC } = cartSlice.actions;
export default cartSlice.reducer;