import { httpPrivate } from "./index";

export const getUserProfile = async () => {
  const response = await httpPrivate.get('/api/users/profile');
  return response.data;
};
