import type { IUser } from "../utils/interfaces";
import { http } from "./index";

export const login = async (email: string, password: string): Promise<{ access_token: string, user: IUser }> => {
  const response = await http.post('/api/auth/login', { email, password });
  return response.data;
};

export const register = async (email: string, password: string, fullName: string): Promise<{ access_token: string, user: IUser }> => {
  const response = await http.post('/api/auth/register', { email, password, fullName });
  return response.data;
};

export const forgotPassword = async (email: string) => {
  const response = await http.post('/api/auth/forgot-password', { email });
  return response.data;
};

export const resetPassword = async (token: string, newPassword: string) => {
  const response = await http.post('/api/auth/reset-password', { token, newPassword });
  return response.data;
};
