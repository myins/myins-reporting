import { axiosInstance } from './api';

export const getAllTimeUsersCount = async () => {
  return axiosInstance.get('/user/reporting/all-time');
}
