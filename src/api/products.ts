import type { ICreateProduct, IUpdateProduct, IProduct, IProductFilters } from "../utils/interfaces";
import { http, httpPrivate } from "./index";

export const getProducts = async (filters?: IProductFilters): Promise<IProduct[]> => {
  const response = await httpPrivate.get('/api/products', {
    params: filters, 
  });
  return response.data;
};

export const searchProducts = async (query: string): Promise<IProduct[]> => {
  const response = await http.get('/api/products/search/items', {
    params: { q: query }
  });
  return response.data;
};

export const getProductById = async (id: string | number): Promise<IProduct> => {
  const response = await http.get(`/api/products/${id}`);
  return response.data;
};

export const createProduct = async (productData: ICreateProduct) => {
  const response = await httpPrivate.post('/api/products', productData);
  return response.data;
};

export const uploadFile = async (file: File): Promise<{ url: string }> => {
  const formData = new FormData();
  formData.append('file', file);

  const response = await http.post('/api/products/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return response.data;
};

export const updateProduct = async (id: string | number, productData: IUpdateProduct): Promise<IProduct> => {
  const response = await httpPrivate.patch(`/api/products/${id}`, productData);
  return response.data;
};

export const deleteProduct = async (id: string | number): Promise<void> => {
  await httpPrivate.delete(`/api/products/${id}`);
};
