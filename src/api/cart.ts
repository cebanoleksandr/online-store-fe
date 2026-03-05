import { httpPrivate } from "./index"; // ваш налаштований axios instance
import type { ICartItem } from "../utils/interfaces";

export const getMyCart = async (): Promise<ICartItem[]> => {
  const response = await httpPrivate.get('/api/cart');
  return response.data;
};

export const addToCart = async (productId: number, quantity: number): Promise<ICartItem> => {
  const response = await httpPrivate.post('/api/cart/add', {
    productId,
    quantity,
  });
  return response.data;
};

export const removeFromCart = async (itemId: number | string): Promise<void> => {
  await httpPrivate.delete(`/api/cart/${itemId}`);
};