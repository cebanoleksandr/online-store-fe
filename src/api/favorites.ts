import { httpPrivate } from "./index";
import type { IProduct } from "../utils/interfaces";

export const getMyFavorites = async (): Promise<IProduct[]> => {
  const response = await httpPrivate.get('/api/favorites');
  return response.data;
};

export const toggleFavorite = async (productId: number | string): Promise<{ added: boolean; message: string }> => {
  const response = await httpPrivate.post(`/api/favorites/${productId}`);
  return response.data;
};
