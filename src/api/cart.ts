import { httpPrivate } from "./index"; // ваш налаштований axios instance
import type { AddToCartDto, ICartItem } from "../utils/interfaces";

export const getMyCart = async (): Promise<ICartItem[]> => {
  const response = await httpPrivate.get('/api/cart');
  return response.data;
};

export const addToCart = async (addToCartDto: AddToCartDto): Promise<ICartItem> => {
  const response = await httpPrivate.post('/api/cart/add', addToCartDto);
  return response.data;
};

export const removeFromCart = async (itemId: number | string): Promise<void> => {
  await httpPrivate.delete(`/api/cart/${itemId}`);
};

export const decreaseQuantity = async (itemId: number | string) => {
  return await httpPrivate.patch(`/api/cart/decrease/${itemId}`);
}