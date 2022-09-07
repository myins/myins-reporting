import { axiosInstance } from './api';

export const getAllTimeUsersCount = async () => {
  return axiosInstance.get('/user/reporting/all-time');
}

export const getNewAccounts = async (type, startDate, endDate) => {
  const a = axiosInstance
  return a.get('/user/reporting/new-accounts', { 
    params: { 
      type,
      startDate,
      endDate 
    }
  });
}
