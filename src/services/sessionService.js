import { axiosInstance } from './api';

export const getSessionDetails = async (type, startDate, endDate) => {
  return axiosInstance.get('/session', {
    params: { 
      type,
      startDate,
      endDate
    }
  });
}
