import { axiosInstance } from './api';

export const login = async (body) => {
  return axiosInstance.post('/auth/login/admin', body);
}
