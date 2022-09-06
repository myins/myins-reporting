import { axiosInstance } from './api';

export const allTimeUsersCount = async () => {
  const a = axiosInstance
  return a.get('/user/reporting/all-time');
}
