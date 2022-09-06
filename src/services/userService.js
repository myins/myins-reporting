import { axiosInstance } from './api';

export const allTimeUsersCount = async () => {
  return axiosInstance.get('/user/reporting/all-time');
}
