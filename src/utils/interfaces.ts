export interface ICreateProduct {
  title: string;
  description?: string;
  price: number;
  oldPrice?: number;
  rating?: number;
  imageUrl?: string;
  categoryId?: number;
}

export interface IUpdateProduct {
  title?: string;
  description?: string;
  price?: number;
  oldPrice?: number;
  rating?: number;
  imageUrl?: string;
  categoryId?: number;
}

export interface IProduct {
  id: number;
  title: string;
  description: string | null;
  price: number;
  oldPrice: number | null;
  rating: number;
  imageUrl: string | null;
  category: string;
  createdAt: Date;
}

export interface IProductFilters {
  category?: string;
  rating?: number;
}

export interface IUser {
  id?: number;
  email: string;
  password?: string;
  fullName: string | null;
  role: UserRole;
  resetToken?: string | null;
  resetTokenExpires?: Date | null;
}

export type UserRole = 'user' | 'admin';

export interface ICartItem {
  id: number;
  quantity: number;
  user: IUser;
  product: IProduct;
}
